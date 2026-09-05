import { useEffect, useState } from 'react'
import { Eye, Users, FileText } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import StatCard from '../common/StatCard'
import BreakdownPanel, { countryFlag, countryLabel } from './BreakdownPanel'
import { getAnalyticsTimeseries } from '../../../../src/services/analyticsService'

const GRANULARITY_OPTIONS = [
  { id: 'day', label: 'Ngày' },
  { id: 'week', label: 'Tuần' },
  { id: 'month', label: 'Tháng' },
]

const METRIC_OPTIONS = [
  { id: 'pageviews', label: 'Lượt xem trang', color: '#0284c7' },
  { id: 'visitors', label: 'Khách truy cập', color: '#C58D25' },
]

const DEVICE_LABELS = { desktop: 'Máy tính', mobile: 'Điện thoại', tablet: 'Máy tính bảng' }

function formatDateLabel(iso, granularity) {
  const d = new Date(iso)
  if (granularity === 'month') return d.toLocaleDateString('vi-VN', { month: '2-digit', year: '2-digit' })
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
}

export default function WebAnalyticsSection() {
  const [granularity, setGranularity] = useState('day')
  const [metric, setMetric] = useState('pageviews')
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    getAnalyticsTimeseries(granularity)
      .then((res) => { if (!cancelled) setData(res) })
      .catch((err) => { if (!cancelled) setError(err.message || 'Không lấy được số liệu truy cập.') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [granularity])

  const activeMetric = METRIC_OPTIONS.find((m) => m.id === metric)
  const chartData = (data?.points || []).map((p) => ({ ...p, label: formatDateLabel(p.date, granularity) }))
  const na = loading ? '—' : 'Chưa có dữ liệu'

  return (
    <div className="mt-4">
      <h2 className="mb-4 font-semibold text-ink">Thống kê truy cập website</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          tone="blue"
          icon={Eye}
          label="Lượt xem trang"
          value={loading || error ? na : data.totals.pageviews.toLocaleString('vi-VN')}
          hint={error || undefined}
        />
        <StatCard
          tone="accent"
          icon={Users}
          label="Khách truy cập"
          value={loading || error ? na : data.totals.visitors.toLocaleString('vi-VN')}
          hint={error || undefined}
        />
        <StatCard
          tone="rose"
          icon={FileText}
          label="Trang được xem nhiều nhất"
          value={loading || error ? na : data.topPage ? data.topPage.path : 'Chưa có dữ liệu'}
          hint={!loading && !error && data.topPage ? `${data.topPage.pageviews.toLocaleString('vi-VN')} lượt xem` : error}
        />
      </div>

      <div className="mt-4 admin-glass rounded-2xl p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          {/* Metric slicer */}
          <div className="flex items-center gap-1 rounded-full border border-soft bg-white p-1">
            {METRIC_OPTIONS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMetric(m.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  metric === m.id ? 'bg-primary text-white' : 'text-secondary hover:bg-soft-green'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Granularity slicer — nút nhỏ góc trên bên phải */}
          <div className="flex items-center gap-1 rounded-full border border-soft bg-white p-1">
            {GRANULARITY_OPTIONS.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setGranularity(g.id)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  granularity === g.id ? 'bg-primary text-white' : 'text-secondary hover:bg-soft-green'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="flex h-64 items-center justify-center text-sm text-faint">Đang tải...</p>
        ) : error ? (
          <p className="flex h-64 items-center justify-center text-sm text-faint">{error}</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E9E2D6" />
              <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#7A8A80' }} axisLine={{ stroke: '#E9E2D6' }} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#7A8A80' }} axisLine={false} tickLine={false} width={32} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #E9E2D6', fontSize: 12 }}
                labelStyle={{ fontWeight: 600, color: '#16301F' }}
                formatter={(value) => [Number(value).toLocaleString('vi-VN'), activeMetric.label]}
              />
              <Line type="monotone" dataKey={metric} stroke={activeMetric.color} strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {!loading && !error && (
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <BreakdownPanel
            title="Quốc gia"
            rows={data.countries}
            renderLabel={(code) => (
              <>
                <span>{countryFlag(code)}</span> {countryLabel(code)}
              </>
            )}
          />
          <BreakdownPanel
            tabs={[
              {
                id: 'devices',
                label: 'Thiết bị',
                rows: data.devices.map((r) => ({ ...r, label: DEVICE_LABELS[r.label] || (r.label === 'Others' ? 'Khác' : r.label) })),
              },
              {
                id: 'browsers',
                label: 'Trình duyệt',
                rows: data.browsers.map((r) => ({ ...r, label: r.label === 'Others' ? 'Khác' : r.label })),
              },
            ]}
          />
          <BreakdownPanel
            title="Hệ điều hành"
            rows={data.operatingSystems.map((r) => ({ ...r, label: r.label === 'Others' ? 'Khác' : r.label }))}
          />
        </div>
      )}
    </div>
  )
}
