import { useState } from 'react'

const regionNames = typeof Intl !== 'undefined' && Intl.DisplayNames
  ? new Intl.DisplayNames(['vi'], { type: 'region' })
  : null

function countryFlag(code) {
  if (!code || code.length !== 2) return '🏳️'
  return String.fromCodePoint(...[...code.toUpperCase()].map((c) => 127397 + c.charCodeAt(0)))
}

export function countryLabel(code) {
  if (!code || code === 'Others') return 'Khác'
  try {
    return regionNames?.of(code) || code
  } catch {
    return code
  }
}

function Row({ label, share }) {
  return (
    <div className="relative flex items-center justify-between overflow-hidden rounded-lg px-3 py-2 text-sm">
      <div
        className="absolute inset-y-0 left-0 bg-soft-green/70"
        style={{ width: `${Math.min(share, 100)}%` }}
      />
      <span className="relative z-10 flex items-center gap-2 text-ink">{label}</span>
      <span className="relative z-10 font-semibold text-ink">{share}%</span>
    </div>
  )
}

// Panel kiểu Vercel Analytics: tiêu đề (+ tab tuỳ chọn) và danh sách xếp hạng
// theo % khách truy cập, có thanh nền thể hiện tỉ lệ tương đối.
export default function BreakdownPanel({ title, tabs, rows, renderLabel }) {
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.id)
  const activeRows = tabs ? tabs.find((t) => t.id === activeTab)?.rows || [] : rows || []

  return (
    <div className="admin-glass rounded-2xl p-5">
      <div className="mb-3 flex items-center justify-between border-b border-white/70 pb-3">
        <div className="flex items-center gap-4">
          {tabs ? (
            tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`text-sm font-semibold transition-colors ${
                  activeTab === tab.id ? 'text-ink' : 'text-faint hover:text-secondary'
                }`}
              >
                {tab.label}
              </button>
            ))
          ) : (
            <h3 className="text-sm font-semibold text-ink">{title}</h3>
          )}
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wide text-faint">Khách truy cập</span>
      </div>

      {activeRows.length === 0 ? (
        <p className="py-6 text-center text-sm text-faint">Chưa có dữ liệu.</p>
      ) : (
        <div className="space-y-1">
          {activeRows.map((row) => (
            <Row key={row.label} label={renderLabel ? renderLabel(row.label) : row.label} share={row.share} />
          ))}
        </div>
      )}
    </div>
  )
}
