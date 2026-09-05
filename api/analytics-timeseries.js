// Vercel Serverless Function — dữ liệu cho biểu đồ đường "Thống kê truy cập
// website" trong Tổng quan. Cùng cơ chế xác thực server-only như
// api/analytics-summary.js (xem file đó để biết các biến môi trường cần cấu hình).
const BUCKETS = { day: 14, week: 8, month: 6 }

export default async function handler(req, res) {
  const token = process.env.VERCEL_ANALYTICS_TOKEN
  const projectId = process.env.VERCEL_PROJECT_ID
  const teamId = process.env.VERCEL_TEAM_ID

  if (!token || !projectId) {
    res.status(500).json({ error: 'Chưa cấu hình VERCEL_ANALYTICS_TOKEN / VERCEL_PROJECT_ID trên server.' })
    return
  }

  const granularity = ['day', 'week', 'month'].includes(req.query.granularity) ? req.query.granularity : 'day'
  const bucketCount = BUCKETS[granularity]

  const now = new Date()
  // Đẩy "until" lên đầu ngày mai (UTC) để không bị làm tròn xuống, cắt mất dữ liệu hôm nay.
  const until = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1))
  const since = new Date(until)
  if (granularity === 'day') since.setUTCDate(since.getUTCDate() - bucketCount)
  else if (granularity === 'week') since.setUTCDate(since.getUTCDate() - bucketCount * 7)
  else since.setUTCMonth(since.getUTCMonth() - bucketCount)

  const baseParams = { projectId, since: since.toISOString(), until: until.toISOString() }
  if (teamId) baseParams.teamId = teamId

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } }
  const query = (path, extra) => fetch(`https://api.vercel.com${path}?${new URLSearchParams({ ...baseParams, ...extra })}`, authHeaders)

  try {
    const [seriesRes, totalsRes, topPageRes, topReferrerRes, topDeviceRes] = await Promise.all([
      query('/v1/query/web-analytics/visits/aggregate', { by: granularity }),
      query('/v1/query/web-analytics/visits/count', {}),
      query('/v1/query/web-analytics/visits/aggregate', { by: 'requestPath', limit: '1' }),
      query('/v1/query/web-analytics/visits/aggregate', { by: 'referrerHostname', limit: '1' }),
      query('/v1/query/web-analytics/visits/aggregate', { by: 'deviceType', limit: '1' }),
    ])
    const responses = { seriesRes, totalsRes, topPageRes, topReferrerRes, topDeviceRes }
    const payloads = Object.fromEntries(
      await Promise.all(Object.entries(responses).map(async ([key, r]) => [key, await r.json()]))
    )

    const failed = Object.entries(responses).find(([, r]) => !r.ok)
    if (failed) {
      const [key] = failed
      res.status(responses[key].status).json({
        error: payloads[key]?.error?.message || 'Vercel Analytics API từ chối yêu cầu (có thể cần nâng cấp gói Pro).',
      })
      return
    }

    const topPageRow = payloads.topPageRes.data?.[0]
    const topReferrerRow = payloads.topReferrerRes.data?.[0]
    const topDeviceRow = payloads.topDeviceRes.data?.[0]
    const totalPageviews = payloads.totalsRes?.data?.pageviews ?? 0

    res.status(200).json({
      granularity,
      points: (payloads.seriesRes.data || []).map((row) => ({
        date: row.timestamp,
        pageviews: row.pageviews ?? 0,
        visitors: row.visitors ?? 0,
      })),
      totals: {
        pageviews: totalPageviews,
        visitors: payloads.totalsRes?.data?.visitors ?? 0,
      },
      topPage: topPageRow ? { path: topPageRow.requestPath, pageviews: topPageRow.pageviews } : null,
      topReferrer: topReferrerRow
        ? { hostname: topReferrerRow.referrerHostname || null, pageviews: topReferrerRow.pageviews }
        : null,
      topDevice: topDeviceRow
        ? {
            deviceType: topDeviceRow.deviceType,
            pageviews: topDeviceRow.pageviews,
            share: totalPageviews ? Math.round((topDeviceRow.pageviews / totalPageviews) * 100) : 0,
          }
        : null,
    })
  } catch {
    res.status(502).json({ error: 'Không kết nối được tới Vercel Analytics.' })
  }
}
