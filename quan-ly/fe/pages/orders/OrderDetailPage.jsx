import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, Phone, Mail, CreditCard, Truck } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import StatusBadge from '../../components/common/StatusBadge'
import OrderStatusStepper, { STEPS } from '../../components/orders/OrderStatusStepper'
import InvoiceInfoCard from '../../components/orders/InvoiceInfoCard'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import { getOrder, updateOrderStatus, updateOrderFlags } from '../../../../src/services/ordersService'
import { formatPrice } from '../../../../src/utils/format'

const DELIVERY_LABELS = { delivery: 'Giao hàng tận nơi', pickup: 'Nhận tại kho / cửa hàng', consult: 'Cần tư vấn trước khi giao' }
const PAYMENT_LABELS = { cod: 'Thanh toán khi nhận hàng (COD)', transfer: 'Chuyển khoản / MoMo', lien_he: 'Chưa chọn — cần liên hệ báo giá' }

export default function OrderDetailPage() {
  const { code } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [confirmCancel, setConfirmCancel] = useState(false)
  const [issueNoteDraft, setIssueNoteDraft] = useState('')
  const [savingFlags, setSavingFlags] = useState(false)

  function reload() {
    setLoading(true)
    getOrder(code).then((o) => { setOrder(o); setIssueNoteDraft(o?.issueNote || '') }).finally(() => setLoading(false))
  }

  useEffect(() => { reload() }, [code])

  async function changeStatus(next) {
    setUpdating(true)
    try {
      await updateOrderStatus(code, next)
      reload()
    } finally {
      setUpdating(false)
      setConfirmCancel(false)
    }
  }

  async function toggleHasIssue() {
    setSavingFlags(true)
    try {
      const updated = await updateOrderFlags(code, {
        hasIssue: !order.hasIssue,
        issueNote: order.hasIssue ? null : issueNoteDraft,
        returnRequested: order.returnRequested,
      })
      setOrder(updated)
    } finally {
      setSavingFlags(false)
    }
  }

  async function saveIssueNote() {
    setSavingFlags(true)
    try {
      const updated = await updateOrderFlags(code, { hasIssue: order.hasIssue, issueNote: issueNoteDraft, returnRequested: order.returnRequested })
      setOrder(updated)
    } finally {
      setSavingFlags(false)
    }
  }

  async function toggleReturnRequested() {
    setSavingFlags(true)
    try {
      const updated = await updateOrderFlags(code, { hasIssue: order.hasIssue, issueNote: order.issueNote, returnRequested: !order.returnRequested })
      setOrder(updated)
    } finally {
      setSavingFlags(false)
    }
  }

  if (loading) return <p className="text-sm text-faint">Đang tải...</p>
  if (!order) return <p className="text-sm text-faint">Không tìm thấy đơn hàng.</p>

  const currentIndex = STEPS.findIndex((s) => s.id === order.status)
  const nextStep = order.status !== 'cancelled' ? STEPS[currentIndex + 1] : null
  const canCancel = order.status === 'pending' || order.status === 'confirmed'

  return (
    <div>
      <button type="button" onClick={() => navigate('/quan-ly/don-hang')} className="mb-3 flex items-center gap-1.5 text-sm text-secondary hover:text-primary">
        <ArrowLeft size={15} /> Quay lại danh sách
      </button>
      <PageHeader
        title={`Đơn hàng ${order.code}`}
        description={new Date(order.submittedAt).toLocaleString('vi-VN')}
        actions={
          <div className="flex items-center gap-2">
            {order.hasIssue && (
              <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-500">Có vấn đề</span>
            )}
            {order.returnRequested && (
              <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent-dark">Yêu cầu hoàn hàng</span>
            )}
            <StatusBadge status={order.status} />
          </div>
        }
      />

      <div className="admin-glass rounded-2xl p-5">
        <OrderStatusStepper status={order.status} />
        <div className="mt-5 flex flex-wrap gap-3 border-t border-soft pt-5">
          {nextStep && (
            <button
              type="button"
              disabled={updating}
              onClick={() => changeStatus(nextStep.id)}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
            >
              Chuyển sang "{nextStep.label}"
            </button>
          )}
          {canCancel && (
            <button
              type="button"
              disabled={updating}
              onClick={() => setConfirmCancel(true)}
              className="rounded-full border border-red-300 px-5 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 disabled:opacity-60"
            >
              Hủy đơn
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 admin-glass rounded-2xl p-5">
        <h2 className="mb-3 font-semibold text-ink">Đánh dấu xử lý</h2>
        <div className="space-y-4">
          <label className="flex items-center justify-between gap-3">
            <div>
              <span className="text-sm font-medium text-ink">Đơn hàng có vấn đề</span>
              <p className="text-xs text-faint">VD: giao thiếu, sai sản phẩm, khách phản ánh...</p>
            </div>
            <button
              type="button" role="switch" aria-checked={order.hasIssue} disabled={savingFlags}
              onClick={toggleHasIssue}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 disabled:opacity-60 ${order.hasIssue ? 'bg-red-500' : 'bg-soft'}`}
            >
              <span className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200" style={{ transform: order.hasIssue ? 'translateX(20px)' : 'translateX(0)' }} />
            </button>
          </label>

          {order.hasIssue && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-ink">Ghi chú vấn đề</label>
              <div className="flex gap-2">
                <textarea
                  rows={2} value={issueNoteDraft} onChange={(e) => setIssueNoteDraft(e.target.value)}
                  placeholder="Mô tả ngắn gọn vấn đề của đơn này"
                  className="w-full rounded-xl border border-soft px-3.5 py-2.5 text-sm outline-none focus:border-primary"
                />
                <button
                  type="button" disabled={savingFlags} onClick={saveIssueNote}
                  className="shrink-0 self-start rounded-full border border-primary px-3.5 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-white disabled:opacity-60"
                >
                  Lưu
                </button>
              </div>
            </div>
          )}

          <label className="flex items-center justify-between gap-3 border-t border-soft pt-4">
            <span className="text-sm font-medium text-ink">Khách yêu cầu hoàn hàng</span>
            <button
              type="button" role="switch" aria-checked={order.returnRequested} disabled={savingFlags}
              onClick={toggleReturnRequested}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 disabled:opacity-60 ${order.returnRequested ? 'bg-accent-dark' : 'bg-soft'}`}
            >
              <span className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200" style={{ transform: order.returnRequested ? 'translateX(20px)' : 'translateX(0)' }} />
            </button>
          </label>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="admin-glass rounded-2xl p-5">
          <h2 className="mb-3 font-semibold text-ink">Thông tin khách hàng</h2>
          <div className="space-y-2 text-sm text-secondary">
            <p className="font-semibold text-ink">{order.form.name}</p>
            <p className="flex items-center gap-2"><Phone size={14} /> {order.form.phone}</p>
            {order.form.email && <p className="flex items-center gap-2"><Mail size={14} /> {order.form.email}</p>}
            <p className="flex items-center gap-2"><Truck size={14} /> {DELIVERY_LABELS[order.form.deliveryMethod] || order.form.deliveryMethod}</p>
            {order.form.deliveryMethod === 'delivery' && (
              <p className="flex items-start gap-2"><MapPin size={14} className="mt-0.5 shrink-0" /> {order.form.street}, {order.form.ward ? `${order.form.ward}, ` : ''}{order.form.provinceName}</p>
            )}
            <p className="flex items-center gap-2"><CreditCard size={14} /> {PAYMENT_LABELS[order.form.paymentMethod] || order.form.paymentMethod}</p>
            {order.form.note && <p className="mt-2 rounded-xl bg-[#F8F5F0] p-3 text-xs">Ghi chú: {order.form.note}</p>}
          </div>
        </div>

        <div className="admin-glass rounded-2xl p-5">
          <h2 className="mb-3 font-semibold text-ink">Hóa đơn điện tử</h2>
          <InvoiceInfoCard form={order.form} />
        </div>
      </div>

      <div className="mt-4 admin-glass rounded-2xl p-5">
        <h2 className="mb-3 font-semibold text-ink">Món đã đặt</h2>
        <div className="divide-y divide-soft">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-3 py-2.5 text-sm">
              <span className="flex-1 text-ink">{item.name} <span className="text-faint">×{item.qty}</span></span>
              <span className="font-semibold text-ink">{formatPrice(item.price * item.qty)}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 space-y-1.5 border-t border-soft pt-3 text-sm">
          <div className="flex justify-between text-secondary"><span>Tiền sản phẩm</span><span>{formatPrice(order.subtotal)}</span></div>
          <div className="flex justify-between text-secondary"><span>Phí vận chuyển</span><span>{formatPrice(order.shipping)}</span></div>
          {order.coupon && (
            <div className="flex justify-between text-secondary"><span>Ưu đãi ({order.coupon.code})</span><span>−{formatPrice(order.coupon.discount)}</span></div>
          )}
          <div className="flex justify-between border-t border-soft pt-1.5 font-bold text-primary-dark"><span>Tổng thanh toán</span><span>{formatPrice(order.total)}</span></div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmCancel}
        title="Hủy đơn hàng"
        message={`Hủy đơn ${order.code}? Đơn hàng đã hủy sẽ không được tính vào doanh thu và số lượng đã bán.`}
        confirmLabel="Hủy đơn"
        danger
        loading={updating}
        onCancel={() => setConfirmCancel(false)}
        onConfirm={() => changeStatus('cancelled')}
      />
    </div>
  )
}
