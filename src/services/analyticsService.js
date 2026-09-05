// Đọc số liệu Vercel Web Analytics qua serverless function /api/analytics-summary —
// token của Vercel chỉ nằm ở biến môi trường phía server (xem api/analytics-summary.js),
// không bao giờ lộ ra trình duyệt.
export async function getAnalyticsSummary(days = 7) {
  const res = await fetch(`/api/analytics-summary?days=${days}`)
  const data = await res.json().catch(() => null)
  if (!res.ok || !data) {
    throw new Error(data?.error || 'Không lấy được số liệu Vercel Analytics.')
  }
  return data
}
