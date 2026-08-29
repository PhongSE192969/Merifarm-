import { useLocation, Link } from 'react-router-dom'
import {
  CheckCircle2, Package, Truck, ClipboardCheck, Handshake, MapPin,
  ArrowRight, Phone, ChevronRight, User, CreditCard, FileText,
} from 'lucide-react'
import { formatPrice } from '../utils/format'
import Button from '../components/ui/Button'

const STEPS = [
  { icon: ClipboardCheck, label: 'Yêu cầu đã ghi nhận' },
  { icon: Handshake,      label: 'Merifarm xác nhận đơn' },
  { icon: Package,        label: 'Chuẩn bị hàng' },
  { icon: Truck,          label: 'Bàn giao vận chuyển' },
  { icon: MapPin,         label: 'Đang giao hàng' },
  { icon: CheckCircle2,   label: 'Giao hàng thành công' },
]

const PAYMENT_LABELS = {
  cod: 'Thanh toán khi nhận hàng (COD)',
  transfer: 'Chuyển khoản sau khi Merifarm xác nhận',
  consult: 'Nhân viên tư vấn phương thức thanh toán',
}

const DELIVERY_LABELS = {
  delivery: 'Giao hàng tận nơi',
  pickup: 'Nhận tại kho / cửa hàng Merifarm',
  consult: 'Merifarm tư vấn và thống nhất lịch giao',
}

function InfoRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex gap-3">
      <span className="w-32 shrink-0 text-xs text-faint">{label}</span>
      <span className="flex-1 text-sm font-medium text-ink">{value}</span>
    </div>
  )
}

export default function OrderSuccessPage() {
  const { state } = useLocation()
  const order = state?.order

  // Graceful fallback if navigated directly without state
  if (!order) {
    return (
      <div className="bg-white min-h-screen">
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <CheckCircle2 size={52} className="mx-auto text-primary" />
          <h1 className="mt-4 text-2xl font-bold text-primary-dark">Yêu cầu đã được ghi nhận</h1>
          <p className="mt-3 text-secondary">Merifarm sẽ liên hệ xác nhận đơn hàng trong thời gian sớm nhất.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button as={Link} to="/san-pham">Tiếp tục xem sản phẩm</Button>
            <Button as={Link} to="/lien-he" variant="outline">Liên hệ Merifarm</Button>
          </div>
        </div>
      </div>
    )
  }

  const { code, items, form, subtotal, shipping, total, hasQuotePending } = order
  const activeStep = 0

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-10">

        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-faint">
          <Link to="/" className="hover:text-primary">Trang chủ</Link>
          <ChevronRight size={13} />
          <Link to="/gio-hang" className="hover:text-primary">Giỏ hàng</Link>
          <ChevronRight size={13} />
          <span className="font-medium text-ink">Xác nhận đơn hàng</span>
        </nav>

        {/* Success hero */}
        <div className="mb-8 rounded-2xl bg-white px-6 py-8 text-center shadow-soft">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-primary bg-white animate-[scale-in_0.4s_ease-out]">
            <CheckCircle2 size={34} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-primary-dark">Yêu cầu đặt hàng thành công</h1>
          <p className="mt-2 text-sm text-secondary max-w-md mx-auto">
            Cảm ơn bạn đã ủng hộ sản phẩm của Merifarm. Đội ngũ Merifarm sẽ liên hệ bạn nếu có vấn đề phát sinh.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent-dark bg-white px-5 py-2 text-sm font-bold text-accent-dark">
            <FileText size={15} />
            Mã yêu cầu: {code}
          </div>
        </div>

        {/* Progress timeline */}
        <div className="mb-6 rounded-2xl bg-white px-6 py-6 shadow-soft">
          <h2 className="mb-5 text-sm font-semibold text-ink">Tiến trình đơn hàng</h2>

          {/* Desktop horizontal */}
          <div className="hidden md:flex items-start">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              const done = i < activeStep
              const active = i === activeStep
              const last = i === STEPS.length - 1
              return (
                <div key={step.label} className="flex flex-1 flex-col items-center">
                  <div className="flex w-full items-center">
                    {i > 0 && (
                      <div className={`h-0.5 flex-1 transition-all duration-700 ${done ? 'bg-primary' : 'bg-soft'}`} />
                    )}
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 bg-white transition-all duration-300
                      ${active ? 'border-primary shadow-md' : done ? 'border-primary' : 'border-soft'}`}>
                      <Icon size={16} className={active || done ? 'text-primary' : 'text-faint'} />
                    </div>
                    {!last && (
                      <div className={`h-0.5 flex-1 ${done ? 'bg-primary' : 'bg-soft'}`} />
                    )}
                  </div>
                  <p className={`mt-2 text-center text-[11px] leading-snug font-medium px-1
                    ${active ? 'text-primary-dark' : done ? 'text-primary' : 'text-faint'}`}>
                    {step.label}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Mobile vertical */}
          <div className="flex flex-col gap-0 md:hidden">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              const done = i < activeStep
              const active = i === activeStep
              const last = i === STEPS.length - 1
              return (
                <div key={step.label} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-white transition-colors
                      ${active ? 'border-primary' : done ? 'border-primary' : 'border-soft'}`}>
                      <Icon size={14} className={active || done ? 'text-primary' : 'text-faint'} />
                    </div>
                    {!last && <div className={`w-0.5 flex-1 mt-1 mb-1 min-h-[20px] ${done ? 'bg-primary' : 'bg-soft'}`} />}
                  </div>
                  <p className={`pt-1 pb-4 text-sm font-medium ${active ? 'text-primary-dark' : done ? 'text-primary' : 'text-faint'}`}>
                    {step.label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          {/* Products summary */}
          <div className="rounded-2xl bg-white shadow-soft overflow-hidden">
            <div className="border-b border-soft px-5 py-4 flex items-center gap-2">
              <Package size={16} className="text-primary" />
              <h2 className="font-semibold text-ink text-sm">Sản phẩm đã đặt</h2>
            </div>
            <div className="divide-y divide-soft">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 p-4">
                  <img src={item.image} alt={item.name} className="h-14 w-14 shrink-0 rounded-lg bg-white object-contain p-1 ring-1 ring-soft" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{item.name}</p>
                    <p className="text-xs text-faint">{item.packageUnit} &bull; ×{item.qty}</p>
                    <p className="mt-0.5 text-sm font-bold text-primary-dark">
                      {item.price ? formatPrice(item.price * item.qty) : 'Liên hệ báo giá'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Receiver info */}
          <div className="rounded-2xl bg-white shadow-soft overflow-hidden">
            <div className="border-b border-soft px-5 py-4 flex items-center gap-2">
              <User size={16} className="text-primary" />
              <h2 className="font-semibold text-ink text-sm">Thông tin nhận hàng</h2>
            </div>
            <div className="space-y-2.5 p-5">
              <InfoRow label="Người nhận" value={form.name} />
              <InfoRow label="Số điện thoại" value={form.phone} />
              {form.email && <InfoRow label="Email" value={form.email} />}
              <InfoRow label="Phương thức nhận" value={DELIVERY_LABELS[form.deliveryMethod]} />
              {form.deliveryMethod === 'delivery' && (
                <InfoRow
                  label="Địa chỉ giao"
                  value={[form.street, form.ward, form.province, form.country].filter(Boolean).join(', ')}
                />
              )}
              {form.note && <InfoRow label="Ghi chú" value={form.note} />}
              <InfoRow label="Thanh toán" value={PAYMENT_LABELS[form.paymentMethod]} />
            </div>
          </div>

          {/* Cost summary */}
          <div className="rounded-2xl bg-white shadow-soft overflow-hidden">
            <div className="border-b border-soft px-5 py-4 flex items-center gap-2">
              <CreditCard size={16} className="text-primary" />
              <h2 className="font-semibold text-ink text-sm">Chi phí dự kiến</h2>
            </div>
            <div className="p-5 space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-secondary">Tiền sản phẩm</span>
                <span className="font-medium text-ink">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary">Phí vận chuyển tạm tính</span>
                <span className="font-medium text-ink">{formatPrice(shipping)}</span>
              </div>
              <div className="border-t border-soft pt-2.5 flex justify-between">
                <span className="font-semibold text-ink">Tổng thanh toán dự kiến</span>
                <span className="text-lg font-bold text-primary-dark">{formatPrice(total)}</span>
              </div>
              {hasQuotePending && (
                <p className="text-xs text-accent-dark">Một số sản phẩm chưa có giá niêm yết — chưa tính vào tổng.</p>
              )}
              <p className="text-xs text-faint leading-relaxed">
                Tổng thanh toán dự kiến có thể thay đổi sau khi Merifarm xác nhận phí vận chuyển thực tế theo địa chỉ và khối lượng đơn hàng.
              </p>
            </div>
          </div>

          {/* Next steps */}
          <div className="rounded-2xl bg-white shadow-soft overflow-hidden">
            <div className="border-b border-soft px-5 py-4 flex items-center gap-2">
              <Handshake size={16} className="text-primary" />
              <h2 className="font-semibold text-ink text-sm">Merifarm sẽ làm gì tiếp theo?</h2>
            </div>
            <ul className="divide-y divide-soft">
              {[
                'Kiểm tra tồn kho và thông tin sản phẩm.',
                'Thông báo phí vận chuyển chính xác nếu có thay đổi.',
                'Tiến hành chuẩn bị đơn hàng.',
                'Bàn giao vận chuyển.',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 px-5 py-3.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary bg-white text-[11px] font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-sm text-secondary">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button as={Link} to="/san-pham" variant="primary">
            Tiếp tục xem sản phẩm <ArrowRight size={16} />
          </Button>
          <Button as={Link} to="/lien-he" variant="outline">
            <Phone size={15} />
            Liên hệ Merifarm
          </Button>
        </div>

      </div>
    </div>
  )
}
