import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, PackagePlus, AlertOctagon, Undo2 } from 'lucide-react'
import { listOrders } from '../../../../src/services/ordersService'
import { formatPrice } from '../../../../src/utils/format'

const TYPE_META = {
  new: { icon: PackagePlus, color: 'text-primary bg-primary/10', label: (o) => `Đơn hàng mới: ${o.code}` },
  issue: { icon: AlertOctagon, color: 'text-red-500 bg-red-50', label: (o) => `Đơn hàng có vấn đề: ${o.code}` },
  return: { icon: Undo2, color: 'text-accent-dark bg-accent/15', label: (o) => `Yêu cầu hoàn hàng: ${o.code}` },
}

// Không có bảng "thông báo" riêng — mỗi lần mở, tự tính từ đơn hàng thật: đơn mới
// (chờ xử lý), đơn có vấn đề, đơn yêu cầu hoàn hàng. Không lưu trạng thái đã đọc.
function buildNotifications(orders) {
  const items = []
  for (const o of orders) {
    if (o.status === 'pending') items.push({ type: 'new', order: o, at: o.submittedAt })
    if (o.hasIssue) items.push({ type: 'issue', order: o, at: o.submittedAt })
    if (o.returnRequested) items.push({ type: 'return', order: o, at: o.submittedAt })
  }
  return items.sort((a, b) => new Date(b.at) - new Date(a.at)).slice(0, 8)
}

export default function NotificationsMenu() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [orders, setOrders] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    listOrders({}).then((data) => { setOrders(data); setLoaded(true) }).catch(() => setLoaded(true))
  }, [])

  const notifications = buildNotifications(orders)
  const count = notifications.length

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative flex h-9 w-9 items-center justify-center rounded-full text-secondary transition-colors hover:bg-white/70 hover:text-primary"
        aria-label="Thông báo"
      >
        <Bell size={16} />
        {count > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
            {count > 9 ? '9+' : count}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="admin-glass absolute right-0 z-20 mt-2 w-80 overflow-hidden rounded-2xl !bg-white/95">
            <div className="border-b border-soft px-4 py-3">
              <h3 className="text-sm font-semibold text-ink">Thông báo</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {!loaded ? (
                <p className="px-4 py-6 text-center text-sm text-faint">Đang tải...</p>
              ) : notifications.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-faint">Không có thông báo mới.</p>
              ) : (
                notifications.map((n, i) => {
                  const meta = TYPE_META[n.type]
                  const Icon = meta.icon
                  return (
                    <button
                      key={`${n.type}-${n.order.code}-${i}`}
                      type="button"
                      onClick={() => { setOpen(false); navigate(`/quan-ly/don-hang/${n.order.code}`) }}
                      className="flex w-full items-start gap-3 border-b border-soft px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-[#F8F5F0]"
                    >
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${meta.color}`}>
                        <Icon size={15} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-ink">{meta.label(n.order)}</p>
                        <p className="mt-0.5 truncate text-xs text-faint">{n.order.form.name} · {formatPrice(n.order.total)}</p>
                        <p className="mt-0.5 text-[10px] text-faint">{new Date(n.at).toLocaleString('vi-VN')}</p>
                      </div>
                    </button>
                  )
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
