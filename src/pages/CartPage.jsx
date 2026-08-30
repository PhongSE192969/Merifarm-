import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Minus, Plus, Trash2, ShoppingBag, ChevronRight, Truck, Store, PhoneCall,
  CreditCard, Banknote, UserCheck, AlertCircle, Package, MapPin, CheckSquare,
  ChevronDown, Search, X, PenLine, CheckCircle2, Copy, Loader2,
} from 'lucide-react'
import Button from '../components/ui/Button'
import { useCartStore } from '../store/cartStore'
import { formatPrice } from '../utils/format'
import { VIETNAM_PROVINCES_2025, getWardOptionsByProvince } from '../data/vietnam-address-2025'

const ESTIMATED_SHIPPING = 30000

const COUPONS = {
  QUOCANH: { type: 'fixed', value: 50000 },
  DUYPHONG: { type: 'fixed', value: 50000 },
  MERIFARM: { type: 'percent', value: 5 },
}

const DELIVERY_OPTIONS = [
  {
    value: 'delivery', icon: Truck, label: 'Giao hàng tận nơi',
    sublabel: 'Merifarm sẽ xác nhận phí vận chuyển theo địa chỉ thực tế.',
  },
  {
    value: 'pickup', icon: Store, label: 'Nhận tại kho / cửa hàng',
    sublabel: 'Số 5-7, Đường số 32, Phường Bình Phú, TP. Hồ Chí Minh.',
  },
  {
    value: 'consult', icon: PhoneCall, label: 'Cần Merifarm tư vấn trước khi giao',
    sublabel: 'Nhân viên sẽ liên hệ tư vấn và thống nhất lịch giao hàng.',
  },
]

const BANK_INFO = {
  company: 'CÔNG TY TNHH CÔNG NGHỆ DVP-DEDITECH',
  bank: 'Ngân hàng MB Bank - Ngân hàng Thương mại cổ phần Quân đội',
  accountNumber: '952076868',
  accountHolder: 'CONG TY TNHH CONG NGHE DVP-DEDITECH',
  qrImage: '/payment/qr-mbbank.png',
}

const PAYMENT_OPTIONS = [
  {
    value: 'cod', icon: CreditCard, label: 'Thanh toán khi nhận hàng (COD)',
    sublabel: 'Trả tiền mặt hoặc chuyển khoản khi nhận được hàng.',
  },
  {
    value: 'transfer', icon: Banknote, label: 'Thanh Toán Trực tuyến (Ngân hàng/MoMo)',
    sublabel: 'Thanh toán trực tuyến',
  },
]

// ─── Inline sub-components ───────────────────────────────────────────────────

function FormField({ label, required, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  )
}

function inputCls(error) {
  return `w-full rounded-xl border px-3.5 py-2.5 text-sm text-ink outline-none transition-colors duration-150
    ${error ? 'border-red-400 focus:border-red-500' : 'border-soft focus:border-primary'}
    placeholder:text-faint disabled:bg-[#F3F3F3] disabled:cursor-not-allowed`
}

// ─── SearchableSelect ────────────────────────────────────────────────────────
// options: string[] — list of known option names
// value: string — current value (known option OR custom text)
// onChange: (val: string) => void
// "Khác" mode activates when value is non-empty and not in options list

function SearchableSelect({ options, value, onChange, placeholder, disabled, error }) {
  const isOther = Boolean(value && !options.includes(value))
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const containerRef = useRef(null)
  const searchRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return
    function close(e) {
      if (!containerRef.current?.contains(e.target)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  // Auto-focus search input when dropdown opens
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50)
  }, [open])

  const filtered = query
    ? options.filter((o) => o.toLowerCase().includes(query.toLowerCase()))
    : options

  const borderCls = error
    ? 'border-red-400 focus-within:border-red-500'
    : 'border-soft focus-within:border-primary'

  // ── "Khác" mode: text input ────────────────────────────────────────────────
  if (isOther) {
    return (
      <div className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 transition-colors ${borderCls} bg-white`}>
        <PenLine size={14} className="shrink-0 text-primary" />
        <input
          autoFocus
          value={value === '__other__' ? '' : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Nhập tên địa phương..."
          className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-faint"
        />
        <button
          type="button"
          title="Quay lại danh sách"
          onClick={() => onChange('')}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-faint transition-colors hover:bg-soft-green hover:text-primary"
        >
          <X size={13} />
        </button>
      </div>
    )
  }

  // ── Normal mode: dropdown trigger + panel ─────────────────────────────────
  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        className={`flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-left transition-colors duration-150
          ${borderCls} ${disabled ? 'bg-[#F3F3F3] cursor-not-allowed' : 'bg-white hover:border-primary/60 cursor-pointer'}
          ${!value ? 'text-faint' : 'text-ink'}`}
      >
        <span className="flex-1 truncate text-sm">{value || placeholder}</span>
        <ChevronDown
          size={15}
          className={`ml-2 shrink-0 text-faint transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute z-30 mt-1.5 w-full rounded-xl border border-soft bg-white shadow-lg">
          {/* Search */}
          <div className="flex items-center gap-2 border-b border-soft px-3 py-2.5">
            <Search size={14} className="shrink-0 text-faint" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm..."
              className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-faint"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} className="text-faint hover:text-ink">
                <X size={13} />
              </button>
            )}
          </div>

          {/* Options */}
          <ul className="max-h-52 overflow-y-auto py-1">
            {filtered.length > 0 ? (
              filtered.map((opt) => (
                <li
                  key={opt}
                  onMouseDown={(e) => { e.preventDefault(); onChange(opt); setOpen(false); setQuery('') }}
                  className={`flex cursor-pointer items-center px-4 py-2.5 text-sm transition-colors
                    ${value === opt
                      ? 'bg-white font-semibold text-primary-dark'
                      : 'text-ink hover:bg-[#F8F5F0]'}`}
                >
                  {value === opt && <span className="mr-2 text-primary">✓</span>}
                  {opt}
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-sm text-faint">Không tìm thấy kết quả.</li>
            )}
          </ul>

          {/* Khác option */}
          <div className="border-t border-soft p-2">
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault()
                onChange('__other__') // triggers isOther mode with a non-empty, non-option value
                setOpen(false)
                setQuery('')
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-secondary transition-colors hover:bg-gold-soft hover:text-accent-dark"
            >
              <PenLine size={14} />
              Khác — tự nhập tên địa phương
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── OptionPicker ────────────────────────────────────────────────────────────
// Compact select-style trigger that expands into a list of icon/label/sublabel
// options (used for delivery method & payment method, instead of a full stacked
// radio-card list).

function OptionPicker({ options, value, onChange, placeholder, error }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    if (!open) return
    function close(e) {
      if (!containerRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  const borderCls = error
    ? 'border-red-400 focus-within:border-red-500'
    : 'border-soft focus-within:border-primary'

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-colors duration-150 bg-white hover:border-primary/60 ${borderCls}`}
      >
        {selected?.icon && <selected.icon size={16} className="shrink-0 text-primary" />}
        <span className={`flex-1 truncate text-sm font-medium ${selected ? 'text-ink' : 'text-faint font-normal'}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={15}
          className={`shrink-0 text-faint transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {selected?.sublabel && !open && (
        <p className="mt-1.5 text-xs text-secondary">{selected.sublabel}</p>
      )}

      {open && (
        <div className="absolute z-30 mt-1.5 w-full overflow-hidden rounded-xl border border-soft bg-white shadow-lg">
          {options.map((opt) => {
            const checked = opt.value === value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false) }}
                className={`flex w-full items-start gap-3 border-b border-soft px-4 py-3 text-left transition-colors last:border-b-0
                  ${checked ? 'bg-soft-green/50' : 'hover:bg-[#F8F5F0]'}`}
              >
                {opt.icon && (
                  <opt.icon size={16} className={`mt-0.5 shrink-0 ${checked ? 'text-primary' : 'text-faint'}`} />
                )}
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${checked ? 'text-primary-dark' : 'text-ink'}`}>{opt.label}</p>
                  {opt.sublabel && <p className="mt-0.5 text-xs text-secondary">{opt.sublabel}</p>}
                </div>
                {checked && <span className="mt-0.5 shrink-0 text-primary">✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CartPage() {
  const items    = useCartStore((s) => s.items)
  const updateQty = useCartStore((s) => s.updateQty)
  const removeItem = useCartStore((s) => s.removeItem)
  const clearCart  = useCartStore((s) => s.clearCart)
  const totalPrice = useCartStore((s) => s.totalPrice())
  const hasQuotePending = useCartStore((s) => s.hasQuotePendingItems())
  const navigate = useNavigate()

  const [removing, setRemoving] = useState(null)
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    deliveryMethod: 'delivery',
    street: '', province: '', ward: '', country: 'Việt Nam',
    paymentMethod: '',
    couponCode: '',
    eInvoice: false,
    invoiceType: 'company',
    invoiceName: '', invoiceAddress: '', invoiceTaxCode: '', invoiceEmail: '',
    note: '',
  })
  const [errors, setErrors] = useState({})
  const [invoiceErrors, setInvoiceErrors] = useState({})
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [coupon, setCoupon] = useState(null)
  const [couponError, setCouponError] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showTransferModal, setShowTransferModal] = useState(false)
  const [transferStatus, setTransferStatus] = useState('idle') // idle | checking | success
  const formRef = useRef(null)
  const pollAttemptsRef = useRef(0)

  // Demo-only stand-in for the backend payment webhook/poll endpoint — remove
  // once real payment gateway integration is wired up.
  async function pollTransferPaymentStatus() {
    pollAttemptsRef.current += 1
    return pollAttemptsRef.current >= 3
  }

  const originalSubtotal = items.reduce((sum, i) => sum + (i.originalPrice ?? i.price ?? 0) * i.qty, 0)
  const productDiscount = Math.max(originalSubtotal - totalPrice, 0)

  const shipping = items.length === 0 ? 0 : ESTIMATED_SHIPPING
  const discount = coupon
    ? (coupon.type === 'fixed' ? coupon.value : Math.round((totalPrice * coupon.value) / 100))
    : 0
  const estimated = Math.max(totalPrice + shipping - discount, 0)

  function applyCoupon() {
    const code = form.couponCode.trim().toUpperCase()
    const found = COUPONS[code]
    if (!found) {
      setCoupon(null)
      setCouponError('Mã ưu đãi không hợp lệ.')
      return
    }
    setCoupon({ code, ...found })
    setCouponError('')
    setFormField('couponCode', code)
  }

  function removeCoupon() {
    setCoupon(null)
    setCouponError('')
    setFormField('couponCode', '')
  }

  const provinceOptions = VIETNAM_PROVINCES_2025
  const availableWards = form.province ? getWardOptionsByProvince(form.province) : []
  const wardDataMissing = Boolean(form.province && availableWards.length === 0)

  function field(name) {
    return {
      value: form[name],
      onChange: (e) => {
        const val = e.target.value
        setForm((f) => {
          const next = { ...f, [name]: val }
          if (name === 'province') next.ward = ''
          return next
        })
        if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }))
      },
    }
  }

  function setFormField(name, val) {
    setForm((f) => {
      const next = { ...f, [name]: val }
      if (name === 'province') next.ward = ''
      return next
    })
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }))
  }

  function validateInvoiceFields() {
    const e = {}
    if (!form.invoiceName.trim()) {
      e.invoiceName = form.invoiceType === 'company' ? 'Vui lòng nhập tên công ty.' : 'Vui lòng nhập tên đầy đủ.'
    }
    if (!form.invoiceAddress.trim()) e.invoiceAddress = 'Vui lòng nhập địa chỉ.'
    if (!form.invoiceTaxCode.trim()) {
      e.invoiceTaxCode = form.invoiceType === 'company' ? 'Vui lòng nhập mã số thuế.' : 'Vui lòng nhập mã số thuế / căn cước công dân.'
    }
    if (!form.invoiceEmail.trim()) e.invoiceEmail = 'Vui lòng nhập email nhận hóa đơn.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.invoiceEmail.trim())) e.invoiceEmail = 'Email không hợp lệ.'
    return e
  }

  function confirmInvoice() {
    const errs = validateInvoiceFields()
    if (Object.keys(errs).length > 0) {
      setInvoiceErrors(errs)
      return
    }
    setFormField('eInvoice', true)
    setInvoiceErrors({})
    setShowInvoiceModal(false)
  }

  function cancelInvoice() {
    setInvoiceErrors({})
    setShowInvoiceModal(false)
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Vui lòng nhập họ và tên.'
    const phone = form.phone.replace(/[\s-]/g, '')
    if (!phone) e.phone = 'Vui lòng nhập số điện thoại hợp lệ.'
    else if (!/^0[3-9]\d{8}$/.test(phone)) e.phone = 'Vui lòng nhập số điện thoại hợp lệ (VD: 0901234567).'
    if (!form.paymentMethod) e.paymentMethod = 'Vui lòng chọn phương thức thanh toán.'
    if (form.deliveryMethod === 'delivery') {
      if (!form.street.trim()) e.street = 'Vui lòng nhập số nhà, tên đường.'
      if (!form.province) e.province = 'Vui lòng chọn Tỉnh / Thành phố.'
      if (!form.ward && availableWards.length > 0) e.ward = 'Vui lòng chọn Phường / Xã / Đặc khu.'
    }
    if (form.eInvoice) Object.assign(e, validateInvoiceFields())
    return e
  }

  function handleRemove(id) {
    setRemoving(id)
    setTimeout(() => {
      removeItem(id)
      setRemoving(null)
    }, 280)
  }

  function buildOrderData() {
    const orderCode = `MF-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`
    return {
      code: orderCode,
      items: items.map((i) => ({ ...i })),
      form: { ...form, provinceName: form.province },
      subtotal: totalPrice,
      shipping,
      coupon: coupon ? { code: coupon.code, discount } : null,
      total: estimated,
      hasQuotePending,
      submittedAt: new Date().toISOString(),
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      const first = formRef.current?.querySelector('[data-error="true"]')
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    if (form.paymentMethod === 'transfer') {
      pollAttemptsRef.current = 0
      setTransferStatus('idle')
      setShowTransferModal(true)
      return
    }

    setSubmitting(true)
    const orderData = buildOrderData()

    setTimeout(() => {
      clearCart()
      navigate('/dat-hang-thanh-cong', { state: { order: orderData } })
    }, 1200)
  }

  function finalizeTransferPayment() {
    const errs = validate()
    if (Object.keys(errs).length > 0 || !agreed) {
      // Payment was received, but the order details aren't complete yet —
      // surface the form so the customer can finish it before we create the order.
      setErrors(errs)
      setShowTransferModal(false)
      setTimeout(() => {
        const first = formRef.current?.querySelector('[data-error="true"]')
        first?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 50)
      return
    }

    const orderData = buildOrderData()
    clearCart()
    setShowTransferModal(false)
    navigate('/dat-hang-thanh-cong', { state: { order: orderData } })
  }

  // Poll the backend for payment confirmation while the transfer modal is open.
  // TODO(backend): replace pollTransferPaymentStatus() with a real request, e.g.
  //   const res = await fetch(`/api/payments/${orderCodeRef.current}/status`)
  //   const { paid } = await res.json()
  //   return paid
  useEffect(() => {
    if (!showTransferModal || transferStatus !== 'idle') return
    let cancelled = false

    const interval = setInterval(async () => {
      const paid = await pollTransferPaymentStatus()
      if (cancelled || !paid) return
      setTransferStatus('checking')
      setTimeout(() => {
        if (cancelled) return
        setTransferStatus('success')
        setTimeout(() => { if (!cancelled) finalizeTransferPayment() }, 1300)
      }, 1200)
    }, 3000)

    return () => { cancelled = true; clearInterval(interval) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showTransferModal, transferStatus])

  // ── Empty state ─────────────────────────────────────────────────────────────
  if (items.length === 0 && !submitting) {
    return (
      <div className="bg-white min-h-[60vh]">
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-primary bg-white">
            <ShoppingBag size={38} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-primary-dark">Giỏ hàng đang trống</h1>
          <p className="mt-3 text-secondary">Hãy khám phá các sản phẩm phân bón chất lượng của Merifarm.</p>
          <Button as={Link} to="/san-pham" className="mt-7">Xem sản phẩm</Button>
        </div>
      </div>
    )
  }

  // ── Main page ───────────────────────────────────────────────────────────────
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-10">

        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-faint">
          <Link to="/" className="hover:text-primary">Trang chủ</Link>
          <ChevronRight size={13} />
          <span className="font-medium text-ink">Giỏ hàng</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">GIỎ HÀNG</p>
          <h1 className="mt-1 text-2xl font-bold text-primary-dark md:text-3xl">Giỏ hàng của bạn</h1>
          <p className="mt-2 text-sm text-secondary">
            Kiểm tra sản phẩm, nhập thông tin giao hàng và gửi yêu cầu đặt hàng để Merifarm xác nhận.
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

            {/* ── LEFT COLUMN ── */}
            <div className="space-y-6">

              {/* Cart items */}
              <div className="rounded-2xl bg-white shadow-soft overflow-hidden">
                <div className="border-b border-soft px-5 py-4">
                  <h2 className="font-semibold text-ink">Sản phẩm ({items.length})</h2>
                </div>
                <div className="divide-y divide-soft">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className={`flex gap-4 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm
                        ${removing === item.id ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}
                    >
                      <Link to={`/san-pham/${item.slug}`} className="shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 rounded-xl bg-white object-contain p-1.5 ring-1 ring-soft"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col gap-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link
                              to={`/san-pham/${item.slug}`}
                              className="font-semibold text-ink transition-colors hover:text-primary"
                            >
                              {item.name}
                            </Link>
                            <p className="text-xs text-faint">{item.packageUnit}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemove(item.id)}
                            aria-label="Xóa sản phẩm"
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-faint transition-colors hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center rounded-full border border-soft bg-[#F8F5F0]">
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, item.qty - 1)}
                              aria-label="Giảm"
                              className="flex h-8 w-8 items-center justify-center rounded-full text-primary-dark transition-colors hover:bg-soft-green"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-ink">{item.qty}</span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, item.qty + 1)}
                              aria-label="Tăng"
                              className="flex h-8 w-8 items-center justify-center rounded-full text-primary-dark transition-colors hover:bg-soft-green"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-faint">{item.price ? `${formatPrice(item.price)} / sp` : ''}</p>
                            <p className="font-bold text-primary-dark">
                              {item.price ? formatPrice(item.price * item.qty) : 'Liên hệ báo giá'}
                            </p>
                          </div>
                        </div>
                        <Link
                          to={`/san-pham/${item.slug}`}
                          className="self-start text-xs text-primary underline-offset-2 hover:underline"
                        >
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order form */}
              <div className="rounded-2xl bg-white shadow-soft">
                <div className="rounded-t-2xl border-b border-soft px-5 py-4">
                  <h2 className="font-semibold text-ink">Thông tin đặt hàng</h2>
                </div>
                <div className="space-y-6 p-5">

                  {/* A. Người nhận */}
                  <div>
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-primary">A. Thông tin người nhận</h3>
                    <div className="space-y-3">
                      <FormField label="Họ và tên" required error={errors.name}>
                        <input
                          data-error={!!errors.name}
                          {...field('name')}
                          placeholder="Nguyễn Văn A"
                          className={inputCls(errors.name)}
                        />
                      </FormField>
                      <FormField label="Số điện thoại" required error={errors.phone}>
                        <input
                          data-error={!!errors.phone}
                          value={form.phone}
                          onChange={(e) => {
                            const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 15)
                            setFormField('phone', digitsOnly)
                          }}
                          type="tel"
                          inputMode="numeric"
                          maxLength={15}
                          placeholder="0901234567"
                          className={inputCls(errors.phone)}
                        />
                      </FormField>
                      <FormField label="Email" error={errors.email}>
                        <input
                          {...field('email')}
                          type="email"
                          placeholder="email@example.com (không bắt buộc)"
                          className={inputCls(errors.email)}
                        />
                      </FormField>
                    </div>
                  </div>

                  {/* B. Phương thức nhận hàng */}
                  <div>
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-primary">B. Phương thức nhận hàng</h3>
                    <OptionPicker
                      options={DELIVERY_OPTIONS}
                      value={form.deliveryMethod}
                      onChange={(v) => setForm((f) => ({ ...f, deliveryMethod: v }))}
                      placeholder="— Chọn phương thức nhận hàng —"
                    />

                    {/* Pickup address notice */}
                    {form.deliveryMethod === 'pickup' && (
                      <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-accent-dark/30 bg-white px-4 py-3 text-sm text-ink">
                        <MapPin size={16} className="mt-0.5 shrink-0 text-accent-dark" />
                        <div>
                          <p className="font-semibold">Địa chỉ kho / cửa hàng Merifarm</p>
                          <p className="mt-0.5 text-secondary">Số 5-7, Đường số 32, Phường Bình Phú, TP. Hồ Chí Minh</p>
                          <p className="text-secondary">
                            Hotline: <a href="tel:0981798065" className="font-medium text-primary">0981 798 065</a>
                            {' - '}
                            <a href="tel:0782861873" className="font-medium text-primary">0782 861 873</a>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* C. Địa chỉ giao hàng (conditional) */}
                  {form.deliveryMethod === 'delivery' && (
                    <div>
                      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-primary">C. Địa chỉ giao hàng</h3>
                      <div className="space-y-3">
                        <FormField label="Quốc gia" required>
                          <input value={form.country} readOnly className={inputCls(false) + ' bg-[#F8F5F0]'} />
                        </FormField>
                        <FormField label="Tỉnh / Thành phố" required error={errors.province}>
                          <div data-error={!!errors.province}>
                            <SearchableSelect
                              options={provinceOptions}
                              value={form.province}
                              onChange={(val) => setFormField('province', val)}
                              placeholder="— Chọn Tỉnh / Thành phố —"
                              error={errors.province}
                            />
                          </div>
                        </FormField>
                        <FormField label="Phường / Xã / Đặc khu" required={!wardDataMissing} error={errors.ward}>
                          <div data-error={!!errors.ward}>
                            <SearchableSelect
                              options={availableWards}
                              value={form.ward}
                              onChange={(val) => setFormField('ward', val)}
                              placeholder={
                                !form.province
                                  ? 'Vui lòng chọn Tỉnh / Thành phố trước.'
                                  : wardDataMissing
                                    ? '— Nhập hoặc chọn Khác —'
                                    : '— Chọn Phường / Xã / Đặc khu —'
                              }
                              disabled={!form.province}
                              error={errors.ward}
                            />
                          </div>
                          {wardDataMissing && (
                            <p className="mt-1.5 flex items-start gap-1.5 text-xs text-secondary">
                              <AlertCircle size={12} className="mt-0.5 shrink-0 text-accent-dark" />
                              Dữ liệu Phường / Xã / Đặc khu của khu vực này đang được cập nhật. Vui lòng nhập địa chỉ chi tiết trong phần ghi chú hoặc liên hệ Merifarm để xác nhận.
                            </p>
                          )}
                        </FormField>
                        <FormField label="Số nhà, tên đường" required error={errors.street}>
                          <input
                            data-error={!!errors.street}
                            {...field('street')}
                            placeholder="Ví dụ: Số 5-7, Đường số 32"
                            className={inputCls(errors.street)}
                          />
                        </FormField>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Order note */}
              <div className="rounded-2xl bg-white p-5 shadow-soft">
                <label className="mb-2 block text-sm font-semibold text-ink">
                  Ghi chú thêm <span className="font-normal text-faint">(tùy chọn)</span>
                </label>
                <textarea
                  {...field('note')}
                  rows={3}
                  placeholder="Ví dụ: thời gian nhận hàng phù hợp, tình trạng cây trồng cần tư vấn, yêu cầu xuất hóa đơn, hoặc ghi chú giao hàng."
                  className={inputCls(false) + ' resize-none'}
                />
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">

              {/* Order summary + Payment method + Consent/submit — merged into one card */}
              <div className="rounded-2xl bg-white shadow-soft">

                {/* Order summary */}
                <div className="rounded-t-2xl border-b border-soft px-5 py-4">
                  <h2 className="font-semibold text-ink">Tóm tắt đơn hàng</h2>
                </div>
                <div className="p-5 space-y-3">
                  {/* Item lines — always shown at the original (pre-discount) price */}
                  {items.map((item) => {
                    const lineOriginalPrice = item.originalPrice ?? item.price
                    return (
                      <div key={item.id} className="flex items-center justify-between gap-2 text-sm">
                        <span className="flex-1 text-secondary line-clamp-1">
                          {item.name} <span className="text-faint">×{item.qty}</span>
                        </span>
                        <span className="shrink-0 font-medium text-ink">
                          {lineOriginalPrice ? formatPrice(lineOriginalPrice * item.qty) : 'Báo giá'}
                        </span>
                      </div>
                    )
                  })}
                  <div className="border-t border-soft pt-3 space-y-2">
                    {productDiscount > 0 && (
                      <>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-secondary">Giá gốc sản phẩm</span>
                          <span className="font-medium text-faint line-through">{formatPrice(originalSubtotal)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-secondary">Khuyến mãi</span>
                          <span className="font-medium text-red-600">−{formatPrice(productDiscount)}</span>
                        </div>
                      </>
                    )}
                    {coupon && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-secondary">Ưu đãi ({coupon.code})</span>
                        <span className="font-medium text-primary">−{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-secondary">Tiền sản phẩm</span>
                      <span className="font-medium text-ink">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-secondary">Phí vận chuyển</span>
                      <span className="font-medium text-ink">{formatPrice(shipping)}</span>
                    </div>
                  </div>
                  <div className="border-t border-soft pt-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-ink">Tổng thanh toán</span>
                      <span className="text-xl font-bold text-primary-dark">{formatPrice(estimated)}</span>
                    </div>
                    {hasQuotePending && (
                      <p className="mt-1.5 text-xs text-accent-dark">
                        Một số sản phẩm chưa có giá niêm yết — chưa tính vào tổng.
                      </p>
                    )}
                    <p className="mt-2 text-xs text-faint">
                      Phí vận chuyển là mức tạm tính. Merifarm sẽ thông báo nếu có phát sinh thêm trước khi giao hàng.
                    </p>
                  </div>
                </div>

                {/* Mã ưu đãi (Coupon) */}
                <div className="border-t border-soft px-5 py-4">
                  <h2 className="font-semibold text-ink">Mã ưu đãi (Coupon)</h2>
                </div>
                <div className="p-5">
                  {!coupon ? (
                    <>
                      <div className="flex gap-2">
                        <input
                          value={form.couponCode}
                          onChange={(e) => {
                            setFormField('couponCode', e.target.value)
                            if (couponError) setCouponError('')
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') { e.preventDefault(); applyCoupon() }
                          }}
                          placeholder="Nhập mã ưu đãi (nếu có)"
                          className={inputCls(couponError) + ' flex-1'}
                        />
                        <button
                          type="button"
                          disabled={!form.couponCode.trim()}
                          onClick={applyCoupon}
                          className={`shrink-0 rounded-xl border px-4 text-sm font-semibold transition-colors
                            ${form.couponCode.trim()
                              ? 'border-primary text-primary hover:bg-primary hover:text-white cursor-pointer'
                              : 'border-soft text-faint cursor-not-allowed'}`}
                        >
                          Áp dụng
                        </button>
                      </div>
                      {couponError && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle size={12} />{couponError}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-primary/30 bg-soft-green/40 px-4 py-2.5">
                      <span className="text-sm font-medium text-primary-dark">
                        Đã áp dụng mã <span className="font-bold">{coupon.code}</span> — giảm{' '}
                        {coupon.type === 'fixed' ? formatPrice(coupon.value) : `${coupon.value}%`}
                      </span>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="shrink-0 text-faint transition-colors hover:text-ink"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Phương thức thanh toán */}
                <div className="border-t border-soft px-5 py-4">
                  <h2 className="font-semibold text-ink">Phương thức thanh toán</h2>
                </div>
                <div className="p-5">
                  {errors.paymentMethod && (
                    <p className="mb-2 flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle size={12} />{errors.paymentMethod}
                    </p>
                  )}
                  <div data-error={!!errors.paymentMethod}>
                    <OptionPicker
                      options={PAYMENT_OPTIONS}
                      value={form.paymentMethod}
                      onChange={(v) => {
                        setForm((f) => ({ ...f, paymentMethod: v }))
                        setErrors((e) => ({ ...e, paymentMethod: undefined }))
                      }}
                      placeholder="— Chọn phương thức thanh toán —"
                      error={errors.paymentMethod}
                    />
                  </div>

                  <div className="mt-3.5 flex items-center justify-between gap-3 border-t border-soft pt-3.5">
                    <div>
                      <p className="text-sm font-medium text-ink">Hóa đơn điện tử</p>
                      <p className="mt-0.5 text-xs text-secondary">Xuất hóa đơn VAT cho đơn hàng này.</p>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={form.eInvoice}
                      onClick={() => {
                        if (form.eInvoice) setFormField('eInvoice', false)
                        else setShowInvoiceModal(true)
                      }}
                      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200
                        ${form.eInvoice ? 'bg-primary' : 'bg-soft'}`}
                    >
                      <span
                        className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200"
                        style={{ transform: form.eInvoice ? 'translateX(22px)' : 'translateX(0)' }}
                      />
                    </button>
                  </div>

                  {/* Invoice summary (once confirmed via modal) */}
                  {form.eInvoice && (
                    <div className="mt-3.5 flex items-center justify-between gap-3 rounded-xl border border-soft bg-[#F8F5F0] px-4 py-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ink">
                          {form.invoiceType === 'company' ? 'Xuất hóa đơn công ty' : 'Xuất hóa đơn cá nhân'}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-secondary">
                          {form.invoiceName} · {form.invoiceEmail}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowInvoiceModal(true)}
                        className="shrink-0 text-xs font-semibold text-primary hover:underline"
                      >
                        Chỉnh sửa
                      </button>
                    </div>
                  )}
                </div>

                {/* Policy consent + submit */}
                <div className="space-y-4 rounded-b-2xl border-t border-soft p-5">
                  <label className="flex cursor-pointer items-start gap-3">
                    <div className="relative mt-0.5 shrink-0">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                      />
                      <div className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-all duration-150
                        ${agreed ? 'border-primary bg-primary' : 'border-soft bg-white'}`}>
                        {agreed && <CheckSquare size={12} className="text-white" />}
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed text-secondary">
                      Tôi đồng ý với{' '}
                      <Link to="/chinh-sach/huong-dan-mua-hang" className="text-primary underline-offset-2 hover:underline" target="_blank">điều khoản &amp; chính sách</Link>
                      <span className="ml-0.5 text-red-500">*</span>
                    </p>
                  </label>

                  <button
                    type="submit"
                    disabled={!agreed || submitting}
                    className={`flex w-full items-center justify-center gap-2 rounded-full border-2 border-primary bg-primary py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-primary-dark hover:border-primary-dark
                      ${agreed && !submitting ? 'hover:-translate-y-0.5 hover:shadow-md cursor-pointer' : 'cursor-not-allowed'}`}
                  >
                    {submitting ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Đang gửi yêu cầu...
                      </>
                    ) : (
                      <>
                        <Package size={16} />
                        Gửi yêu cầu đặt hàng
                      </>
                    )}
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-faint">
                    <span className="flex items-center gap-1"><Package size={12} /> Xác nhận trước khi giao</span>
                    <span className="flex items-center gap-1"><Truck size={12} /> Giao hàng toàn quốc</span>
                    <span className="flex items-center gap-1"><UserCheck size={12} /> Hỗ trợ tư vấn kỹ thuật</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </form>

        {/* ── Invoice modal ─────────────────────────────────────────── */}
        {showInvoiceModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={cancelInvoice}
          >
            <div
              className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="border-b border-soft pb-4 text-lg font-bold text-ink">Thông tin hóa đơn</h3>

              <div className="mt-4 space-y-4">
                <FormField label="Loại hóa đơn" required>
                  <div className="flex items-center gap-6">
                    {[
                      { value: 'company', label: 'Công ty' },
                      { value: 'personal', label: 'Cá nhân' },
                    ].map((opt) => (
                      <label key={opt.value} className="flex cursor-pointer items-center gap-2">
                        <input
                          type="radio"
                          className="sr-only"
                          checked={form.invoiceType === opt.value}
                          onChange={() => setFormField('invoiceType', opt.value)}
                        />
                        <span className={`flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 transition-colors
                          ${form.invoiceType === opt.value ? 'border-primary' : 'border-soft'}`}>
                          {form.invoiceType === opt.value && <span className="h-2 w-2 rounded-full bg-primary" />}
                        </span>
                        <span className="text-sm text-ink">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </FormField>

                <FormField
                  label={form.invoiceType === 'company' ? 'Tên công ty' : 'Tên đầy đủ'}
                  required
                  error={invoiceErrors.invoiceName}
                >
                  <input
                    data-error={!!invoiceErrors.invoiceName}
                    {...field('invoiceName')}
                    placeholder={form.invoiceType === 'company' ? 'Công ty TNHH...' : 'Nguyễn Văn A'}
                    className={inputCls(invoiceErrors.invoiceName)}
                  />
                </FormField>

                <FormField label="Địa chỉ" required error={invoiceErrors.invoiceAddress}>
                  <input
                    data-error={!!invoiceErrors.invoiceAddress}
                    {...field('invoiceAddress')}
                    placeholder="Địa chỉ xuất hóa đơn"
                    className={inputCls(invoiceErrors.invoiceAddress)}
                  />
                </FormField>

                <FormField
                  label={form.invoiceType === 'company' ? 'Mã số thuế' : 'Mã số thuế / Căn cước công dân'}
                  required
                  error={invoiceErrors.invoiceTaxCode}
                >
                  <input
                    data-error={!!invoiceErrors.invoiceTaxCode}
                    {...field('invoiceTaxCode')}
                    placeholder={form.invoiceType === 'company' ? 'VD: 0312345678' : 'VD: 079xxxxxxxxx'}
                    className={inputCls(invoiceErrors.invoiceTaxCode)}
                  />
                  {form.invoiceType === 'personal' && (
                    <p className="mt-1.5 text-xs text-faint">
                      Nhập CCCD nếu đã tích hợp mã số thuế, hoặc mã số thuế cũ nếu chưa tích hợp.
                    </p>
                  )}
                </FormField>

                <FormField label="Email" required error={invoiceErrors.invoiceEmail}>
                  <input
                    data-error={!!invoiceErrors.invoiceEmail}
                    {...field('invoiceEmail')}
                    type="email"
                    placeholder="email@example.com"
                    className={inputCls(invoiceErrors.invoiceEmail)}
                  />
                </FormField>

                <p className="text-xs text-faint">
                  Hóa đơn sẽ được gửi qua email trong vòng 24h kể từ khi hoàn tất đơn hàng.
                </p>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={cancelInvoice}
                  className="rounded-full border border-soft px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-[#F8F5F0]"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={confirmInvoice}
                  className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Bank transfer / MOMO QR modal ─────────────────────────── */}
        {showTransferModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => transferStatus === 'idle' && setShowTransferModal(false)}
          >
            <div
              className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-soft px-6 py-4">
                <h3 className="text-lg font-bold text-ink">Thanh Toán Trực tuyến (Ngân hàng/MoMo)</h3>
                {transferStatus === 'idle' && (
                  <button
                    type="button"
                    onClick={() => setShowTransferModal(false)}
                    className="text-faint transition-colors hover:text-ink"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {transferStatus === 'success' ? (
                <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
                  <CheckCircle2 size={52} className="text-primary" />
                  <p className="text-lg font-bold text-ink">Thanh toán thành công!</p>
                  <p className="text-sm text-secondary">Đang chuyển đến trang xác nhận đơn hàng...</p>
                </div>
              ) : (
                <div className="grid gap-6 p-6 sm:grid-cols-2">
                  {/* Left: bank details */}
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-xs text-faint">Công ty</p>
                      <p className="font-semibold text-ink">{BANK_INFO.company}</p>
                    </div>
                    <div>
                      <p className="text-xs text-faint">Ngân hàng</p>
                      <p className="font-semibold text-ink">{BANK_INFO.bank}</p>
                    </div>
                    <div>
                      <p className="text-xs text-faint">Số tài khoản</p>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-primary-dark">{BANK_INFO.accountNumber}</p>
                        <button
                          type="button"
                          onClick={() => navigator.clipboard?.writeText(BANK_INFO.accountNumber)}
                          title="Sao chép số tài khoản"
                          className="text-faint transition-colors hover:text-primary"
                        >
                          <Copy size={13} />
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-faint">Chủ tài khoản</p>
                      <p className="font-semibold text-ink">{BANK_INFO.accountHolder}</p>
                    </div>
                    <div className="border-t border-soft pt-3">
                      <p className="text-xs text-faint">Số tiền cần chuyển</p>
                      <p className="text-xl font-bold text-primary-dark">{formatPrice(estimated)}</p>
                    </div>
                  </div>

                  {/* Right: QR with scanning effect */}
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="relative h-[190px] w-[190px] overflow-hidden rounded-xl border border-soft">
                      <img
                        src={BANK_INFO.qrImage}
                        alt="Mã QR thanh toán MB Bank"
                        className="h-full w-full object-contain p-2"
                      />
                      {transferStatus === 'idle' && (
                        <span className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-qr-scan" />
                      )}
                      {transferStatus === 'checking' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                          <Loader2 size={28} className="animate-spin text-primary" />
                        </div>
                      )}
                    </div>
                    <p className="text-center text-xs text-faint">Quét mã bằng app ngân hàng hoặc MOMO để thanh toán</p>
                  </div>
                </div>
              )}

              {transferStatus !== 'success' && (
                <div className="border-t border-soft px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm font-semibold text-ink">
                    <Loader2 size={16} className="animate-spin text-primary" />
                    {transferStatus === 'checking' ? 'Đang xác nhận giao dịch...' : 'Đang chờ xác nhận thanh toán...'}
                  </div>
                  <p className="mt-2 text-xs text-faint">
                    Hệ thống sẽ tự động xác nhận ngay khi Merifarm nhận được thanh toán của bạn.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowTransferModal(false)}
                    className="mt-3 text-xs font-semibold text-faint transition-colors hover:text-primary"
                  >
                    ← Quay lại
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Mobile sticky bottom bar ─────────────────────────────── */}
        <div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-soft bg-white px-4 py-3 shadow-xl lg:hidden"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-secondary">Tổng dự kiến</p>
              <p className="text-lg font-bold text-primary-dark">{formatPrice(estimated)}</p>
            </div>
            <button
              type="button"
              onClick={() => formRef.current?.requestSubmit()}
              disabled={!agreed || submitting}
              className={`flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-primary bg-primary py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-primary-dark hover:border-primary-dark
                ${agreed && !submitting ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            >
              <Package size={15} />
              {submitting ? 'Đang gửi...' : 'Gửi đơn hàng'}
            </button>
          </div>
        </div>
        {/* Spacer so content isn't hidden by sticky bar */}
        <div className="h-20 lg:hidden" />
      </div>
    </div>
  )
}
