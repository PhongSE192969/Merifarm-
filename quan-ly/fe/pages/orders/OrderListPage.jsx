import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Truck, PackageCheck, AlertTriangle, XCircle, AlertOctagon, Undo2, ChevronRight } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import StatCard from '../../components/common/StatCard'
import StatusBadge from '../../components/common/StatusBadge'
import { listOrders } from '../../../../src/services/ordersService'
import { formatPrice } from '../../../../src/utils/format'

const STATUS_FILTERS = [
  { id: '', label: 'Tất cả' },
  { id: 'pending', label: 'Chờ xử lý' },
  { id: 'confirmed', label: 'Đã xác nhận' },
  { id: 'shipped', label: 'Đang giao' },
  { id: 'done', label: 'Hoàn tất' },
  { id: 'cancelled', label: 'Đã hủy' },
]

const DELIVERY_LABELS = { delivery: 'Giao hàng tận nơi', pickup: 'Nhận tại kho', consult: 'Cần tư vấn' }

// Con số KPI tính từ dữ liệu đơn hàng thật, không lưu riêng:
// - "Vận chuyển 24h" / "Quá hạn vận chuyển" so theo mốc 24h kể từ lúc đơn được XÁC NHẬN
//   (đọc từ status_history) mà vẫn chưa chuyển sang "Đang giao".
function computeKpis(allOrders) {
  const HOUR_MS = 3600 * 1000
  const now = Date.now()
  let ship24h = 0, overdue = 0, shipping = 0, cancelled = 0, issues = 0, returns = 0

  for (const o of allOrders) {
    if (o.status === 'cancelled') cancelled++
    if (o.status === 'shipped') shipping++
    if (o.hasIssue) issues++
    if (o.returnRequested) returns++
    if (o.status === 'confirmed') {
      const confirmedEntry = [...o.statusHistory].reverse().find((h) => h.status === 'confirmed')
      const hoursSince = confirmedEntry ? (now - new Date(confirmedEntry.at).getTime()) / HOUR_MS : 0
      if (hoursSince >= 24) overdue++
      else ship24h++
    }
  }
  return { ship24h, shipping, overdue, cancelled, issues, returns }
}

function itemsSummary(items) {
  if (!items.length) return '—'
  const first = items[0].name
  return items.length > 1 ? `${first} +${items.length - 1} sản phẩm khác` : first
}

export default function OrderListPage() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [allOrders, setAllOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')

  // Danh sách đầy đủ (không lọc) chỉ để tính KPI phía trên — độc lập với bộ lọc/tìm kiếm của bảng.
  useEffect(() => {
    listOrders({}).then(setAllOrders)
  }, [])

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => {
      listOrders({ status: status || undefined, search: search || undefined })
        .then(setOrders)
        .finally(() => setLoading(false))
    }, 250)
    return () => clearTimeout(t)
  }, [status, search])

  const kpis = computeKpis(allOrders)

  return (
    <div>
      <PageHeader title="Đơn hàng" description={`${orders.length} đơn phù hợp với bộ lọc hiện tại`} />

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard tone="primary" icon={Truck} label="Đơn vận chuyển 24h" value={kpis.ship24h} />
        <StatCard tone="blue" icon={PackageCheck} label="Đơn hàng đang giao" value={kpis.shipping} />
        <StatCard tone="accent" icon={AlertTriangle} label="Quá hạn vận chuyển" value={kpis.overdue} />
        <StatCard tone="rose" icon={XCircle} label="Đơn hàng hủy" value={kpis.cancelled} />
        <StatCard tone="rose" icon={AlertOctagon} label="Đơn hàng bị vấn đề" value={kpis.issues} />
        <StatCard tone="accent" icon={Undo2} label="Yêu cầu hoàn hàng" value={kpis.returns} />
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo mã đơn, tên, SĐT..."
            className="w-64 rounded-full border border-soft bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setStatus(f.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                status === f.id ? 'border-primary bg-soft-green text-primary-dark' : 'border-soft text-secondary hover:border-primary/50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <DataTable
        loading={loading}
        rows={orders}
        rowKey="code"
        onRowClick={(o) => navigate(`/quan-ly/don-hang/${o.code}`)}
        emptyMessage="Không có đơn hàng nào."
        columns={[
          { key: 'code', label: 'Đơn hàng', render: (o) => <span className="font-semibold text-ink">{o.code}</span> },
          { key: 'customer', label: 'Khách hàng', render: (o) => <div><p className="text-ink">{o.form.name}</p><p className="text-xs text-faint">{o.form.phone}</p></div> },
          { key: 'items', label: 'Mặt hàng', render: (o) => <span className="text-secondary">{itemsSummary(o.items)}</span> },
          {
            key: 'status', label: 'Trạng thái đơn hàng',
            render: (o) => (
              <div className="flex flex-wrap items-center gap-1.5">
                <StatusBadge status={o.status} />
                {o.hasIssue && (
                  <span
                    title={o.issueNote ? `Vấn đề: ${o.issueNote}` : 'Đơn hàng có vấn đề — bấm để xem chi tiết'}
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white"
                  >
                    !
                  </span>
                )}
                {o.returnRequested && <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent-dark">Hoàn hàng</span>}
              </div>
            ),
          },
          { key: 'delivery', label: 'Phương thức vận chuyển', render: (o) => DELIVERY_LABELS[o.form.deliveryMethod] || o.form.deliveryMethod },
          { key: 'submittedAt', label: 'Ngày đặt', render: (o) => new Date(o.submittedAt).toLocaleString('vi-VN') },
          { key: 'total', label: 'Tổng tiền', render: (o) => <span className="font-semibold text-primary-dark">{formatPrice(o.total)}</span> },
          { key: 'view', label: '', className: 'text-right', render: () => <ChevronRight size={16} className="ml-auto text-faint" /> },
        ]}
      />
    </div>
  )
}
