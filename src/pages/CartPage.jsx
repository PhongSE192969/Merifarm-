import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Minus, Plus, Trash2, ShoppingBag, ChevronRight, Truck, Store, PhoneCall,
  CreditCard, Banknote, UserCheck, AlertCircle, Package, MapPin, CheckSquare,
  ChevronDown, Search, X, PenLine,
} from 'lucide-react'
import Button from '../components/ui/Button'
import { useCartStore } from '../store/cartStore'
import { formatPrice } from '../utils/format'
import { VIETNAM_PROVINCES_2025, getWardOptionsByProvince } from '../data/vietnam-address-2025'

const ESTIMATED_SHIPPING = 30000

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

function RadioCard({ value, current, onChange, icon: Icon, label, sublabel }) {
  const checked = value === current
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all duration-150
        ${checked ? 'border-primary bg-soft-green' : 'border-soft bg-white hover:border-primary/40'}`}
    >
      <input type="radio" className="sr-only" value={value} checked={checked} onChange={() => onChange(value)} />
      <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors
        ${checked ? 'border-primary bg-primary' : 'border-soft'}`}>
        {checked && <span className="h-2 w-2 rounded-full bg-white" />}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={15} className={checked ? 'text-primary' : 'text-faint'} />}
          <span className={`text-sm font-semibold ${checked ? 'text-primary-dark' : 'text-ink'}`}>{label}</span>
        </div>
        {sublabel && <p className="mt-0.5 text-xs text-secondary">{sublabel}</p>}
      </div>
    </label>
  )
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
                      ? 'bg-soft-green font-semibold text-primary-dark'
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
    note: '',
  })
  const [errors, setErrors] = useState({})
  const [agreed, setAgreed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef(null)

  const shipping = items.length === 0 ? 0 : ESTIMATED_SHIPPING
  const estimated = totalPrice + shipping

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
    return e
  }

  function handleRemove(id) {
    setRemoving(id)
    setTimeout(() => {
      removeItem(id)
      setRemoving(null)
    }, 280)
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

    setSubmitting(true)
    const orderCode = `MF-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`

    const orderData = {
      code: orderCode,
      items: items.map((i) => ({ ...i })),
      form: { ...form, provinceName: form.province },
      subtotal: totalPrice,
      shipping,
      total: estimated,
      hasQuotePending,
      submittedAt: new Date().toISOString(),
    }

    setTimeout(() => {
      clearCart()
      navigate('/dat-hang-thanh-cong', { state: { order: orderData } })
    }, 1200)
  }

  // ── Empty state ─────────────────────────────────────────────────────────────
  if (items.length === 0 && !submitting) {
    return (
      <div className="bg-cream min-h-[60vh]">
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-soft-green">
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
    <div className="bg-cream min-h-screen">
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
              <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
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
                          className="h-20 w-20 rounded-xl object-cover ring-1 ring-soft"
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

              {/* Order note */}
              <div className="rounded-2xl bg-white p-5 shadow-sm">
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

              {/* Order form */}
              <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
                <div className="border-b border-soft px-5 py-4">
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
                          {...field('phone')}
                          type="tel"
                          placeholder="0901 234 567"
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
                    <div className="space-y-2">
                      <RadioCard
                        value="delivery" current={form.deliveryMethod}
                        onChange={(v) => setForm((f) => ({ ...f, deliveryMethod: v }))}
                        icon={Truck} label="Giao hàng tận nơi"
                        sublabel="Merifarm sẽ xác nhận phí vận chuyển theo địa chỉ thực tế."
                      />
                      <RadioCard
                        value="pickup" current={form.deliveryMethod}
                        onChange={(v) => setForm((f) => ({ ...f, deliveryMethod: v }))}
                        icon={Store} label="Nhận tại kho / cửa hàng"
                        sublabel="Số 5-7 Đường số 32, Phường Bình Phú, TP. Hồ Chí Minh."
                      />
                      <RadioCard
                        value="consult" current={form.deliveryMethod}
                        onChange={(v) => setForm((f) => ({ ...f, deliveryMethod: v }))}
                        icon={PhoneCall} label="Cần Merifarm tư vấn trước khi giao"
                        sublabel="Nhân viên sẽ liên hệ tư vấn và thống nhất lịch giao hàng."
                      />
                    </div>

                    {/* Pickup address notice */}
                    {form.deliveryMethod === 'pickup' && (
                      <div className="mt-3 flex items-start gap-2.5 rounded-xl bg-gold-soft px-4 py-3 text-sm text-ink">
                        <MapPin size={16} className="mt-0.5 shrink-0 text-accent-dark" />
                        <div>
                          <p className="font-semibold">Địa chỉ kho / cửa hàng Merifarm</p>
                          <p className="mt-0.5 text-secondary">Số 5-7 Đường số 32, Phường Bình Phú, TP. Hồ Chí Minh</p>
                          <p className="text-secondary">Hotline: <a href="tel:0982969781" className="font-medium text-primary">0982 969 781</a></p>
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
                            placeholder="Ví dụ: Số 5-7 Đường số 32"
                            className={inputCls(errors.street)}
                          />
                        </FormField>
                      </div>
                    </div>
                  )}

                  {/* D. Phương thức thanh toán */}
                  <div>
                    <h3 className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">
                      {form.deliveryMethod === 'delivery' ? 'D.' : 'C.'} Phương thức thanh toán
                    </h3>
                    {errors.paymentMethod && (
                      <p className="mb-2 flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle size={12} />{errors.paymentMethod}
                      </p>
                    )}
                    <div className="mt-3 space-y-2">
                      <RadioCard
                        value="cod" current={form.paymentMethod}
                        onChange={(v) => { setForm((f) => ({ ...f, paymentMethod: v })); setErrors((e) => ({ ...e, paymentMethod: undefined })) }}
                        icon={CreditCard} label="Thanh toán khi nhận hàng (COD)"
                        sublabel="Trả tiền mặt hoặc chuyển khoản khi nhận được hàng."
                      />
                      <RadioCard
                        value="transfer" current={form.paymentMethod}
                        onChange={(v) => { setForm((f) => ({ ...f, paymentMethod: v })); setErrors((e) => ({ ...e, paymentMethod: undefined })) }}
                        icon={Banknote} label="Chuyển khoản sau khi Merifarm xác nhận đơn"
                        sublabel="Merifarm sẽ gửi thông tin tài khoản sau khi xác nhận."
                      />
                      <RadioCard
                        value="consult" current={form.paymentMethod}
                        onChange={(v) => { setForm((f) => ({ ...f, paymentMethod: v })); setErrors((e) => ({ ...e, paymentMethod: undefined })) }}
                        icon={UserCheck} label="Cần nhân viên liên hệ tư vấn"
                        sublabel="Nhân viên Merifarm sẽ trao đổi và hướng dẫn thanh toán."
                      />
                    </div>
                    <p className="mt-3 flex items-start gap-2 rounded-xl bg-gold-soft px-4 py-3 text-xs text-secondary">
                      <AlertCircle size={13} className="mt-0.5 shrink-0 text-accent-dark" />
                      Đơn hàng chưa phải là giao dịch thanh toán hoàn tất. Merifarm sẽ liên hệ xác nhận sản phẩm, phí vận chuyển và phương thức thanh toán trước khi giao hàng.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">

              {/* Order summary */}
              <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
                <div className="border-b border-soft px-5 py-4">
                  <h2 className="font-semibold text-ink">Tóm tắt đơn hàng</h2>
                </div>
                <div className="p-5 space-y-3">
                  {/* Item lines */}
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-2 text-sm">
                      <span className="flex-1 text-secondary line-clamp-1">
                        {item.name} <span className="text-faint">×{item.qty}</span>
                      </span>
                      <span className="shrink-0 font-medium text-ink">
                        {item.price ? formatPrice(item.price * item.qty) : 'Báo giá'}
                      </span>
                    </div>
                  ))}
                  <div className="border-t border-soft pt-3 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-secondary">Tiền sản phẩm</span>
                      <span className="font-medium text-ink">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-secondary">Phí vận chuyển tạm tính</span>
                      <span className="font-medium text-ink">{formatPrice(shipping)}</span>
                    </div>
                  </div>
                  <div className="border-t border-soft pt-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-ink">Tổng thanh toán dự kiến</span>
                      <span className="text-xl font-bold text-primary-dark">{formatPrice(estimated)}</span>
                    </div>
                    {hasQuotePending && (
                      <p className="mt-1.5 text-xs text-accent-dark">
                        Một số sản phẩm chưa có giá niêm yết — chưa tính vào tổng.
                      </p>
                    )}
                    <p className="mt-2 text-xs text-faint">
                      Phí vận chuyển là mức tạm tính. Merifarm sẽ xác nhận lại phí giao hàng chính xác theo địa chỉ, khối lượng và khu vực trước khi xử lý đơn.
                    </p>
                  </div>
                </div>
              </div>

              {/* Policy consent + submit */}
              <div className="rounded-2xl bg-white p-5 shadow-sm space-y-4">
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
                    Bằng việc gửi yêu cầu đặt hàng, tôi xác nhận đã kiểm tra thông tin đơn hàng và đồng ý với{' '}
                    <Link to="/chinh-sach/huong-dan-mua-hang" className="text-primary underline-offset-2 hover:underline" target="_blank">Chính sách mua hàng</Link>,{' '}
                    <Link to="/chinh-sach/chinh-sach-giao-hang" className="text-primary underline-offset-2 hover:underline" target="_blank">Chính sách giao hàng</Link>,{' '}
                    <Link to="/chinh-sach/chinh-sach-doi-tra-hoan-tien" className="text-primary underline-offset-2 hover:underline" target="_blank">Chính sách đổi trả</Link> và{' '}
                    <Link to="/chinh-sach/chinh-sach-bao-mat-thong-tin-ca-nhan" className="text-primary underline-offset-2 hover:underline" target="_blank">Chính sách bảo mật</Link> của Merifarm.
                  </p>
                </label>

                <button
                  type="submit"
                  disabled={!agreed || submitting}
                  className={`flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold transition-all duration-200
                    ${agreed && !submitting
                      ? 'bg-primary text-white hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-md cursor-pointer'
                      : 'bg-soft text-faint cursor-not-allowed'}`}
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
        </form>

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
              className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-bold transition-all duration-200
                ${agreed && !submitting
                  ? 'bg-primary text-white hover:bg-primary-dark cursor-pointer'
                  : 'bg-soft text-faint cursor-not-allowed'}`}
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
