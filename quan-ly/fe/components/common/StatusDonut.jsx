import { STATUS_MAP } from './StatusBadge'

const COLORS = {
  pending: '#C58D25',
  confirmed: '#0F6B34',
  shipped: '#0284c7',
  done: '#10b981',
  cancelled: '#ef4444',
}

const ORDER = ['pending', 'confirmed', 'shipped', 'done', 'cancelled']

// Biểu đồ tròn tỉ lệ trạng thái đơn hàng, vẽ bằng conic-gradient thuần CSS (không cần thư viện).
export default function StatusDonut({ byStatus, total }) {
  const entries = ORDER.filter((key) => byStatus[key] > 0)

  if (!total) {
    return <p className="flex h-40 items-center justify-center text-sm text-faint">Chưa có đơn hàng nào.</p>
  }

  let cursor = 0
  const stops = entries.map((key) => {
    const pct = (byStatus[key] / total) * 100
    const stop = `${COLORS[key]} ${cursor}% ${cursor + pct}%`
    cursor += pct
    return stop
  })

  return (
    <div className="flex items-center gap-5">
      <div
        className="relative h-32 w-32 shrink-0 rounded-full"
        style={{ background: `conic-gradient(${stops.join(', ')})` }}
      >
        <div className="absolute inset-3 flex flex-col items-center justify-center rounded-full bg-white/90 backdrop-blur">
          <span className="text-xl font-bold text-ink">{total}</span>
          <span className="text-[10px] text-faint">đơn hàng</span>
        </div>
      </div>
      <ul className="space-y-1.5">
        {entries.map((key) => (
          <li key={key} className="flex items-center gap-2 text-xs text-secondary">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[key] }} />
            {STATUS_MAP[key]?.label || key}
            <span className="font-semibold text-ink">{byStatus[key]}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
