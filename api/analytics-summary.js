// Vercel Serverless Function — proxy gọi Vercel Web Analytics API bằng
// VERCEL_ANALYTICS_TOKEN (biến môi trường phía server, KHÔNG có tiền tố VITE_ nên
// không bao giờ bị Vite nhúng vào bundle phía trình duyệt).
//
// Cấu hình cần thêm trong Vercel Project Settings → Environment Variables:
//   VERCEL_ANALYTICS_TOKEN  — tạo tại https://vercel.com/account/tokens
//   VERCEL_PROJECT_ID       — Project Settings → General → Project ID
//   VERCEL_TEAM_ID          — chỉ cần nếu project nằm trong 1 Team (không phải tài khoản cá nhân)
export default async function handler(req, res) {
  const token = process.env.VERCEL_ANALYTICS_TOKEN
  const projectId = process.env.VERCEL_PROJECT_ID
  const teamId = process.env.VERCEL_TEAM_ID

  if (!token || !projectId) {
    res.status(500).json({ error: 'Chưa cấu hình VERCEL_ANALYTICS_TOKEN / VERCEL_PROJECT_ID trên server.' })
    return
  }

  const days = Math.min(Math.max(Number(req.query.days) || 7, 1), 90)
  const until = new Date()
  const since = new Date(until.getTime() - days * 24 * 60 * 60 * 1000)

  const params = new URLSearchParams({
    projectId,
    since: since.toISOString(),
    until: until.toISOString(),
  })
  if (teamId) params.set('teamId', teamId)

  try {
    const response = await fetch(`https://api.vercel.com/v1/query/web-analytics/visits/count?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const payload = await response.json()

    if (!response.ok) {
      res.status(response.status).json({
        error: payload?.error?.message || 'Vercel Analytics API từ chối yêu cầu (có thể cần nâng cấp gói Pro).',
      })
      return
    }

    res.status(200).json({
      days,
      visitors: payload?.data?.visitors ?? 0,
      pageviews: payload?.data?.pageviews ?? 0,
    })
  } catch {
    res.status(502).json({ error: 'Không kết nối được tới Vercel Analytics.' })
  }
}
