import { useState } from 'react'
import {
  Phone, Mail, MapPin, Clock, CheckCircle2, Send,
  ChevronRight, Headphones, Users, Sprout, ArrowRight,
} from 'lucide-react'
import Button from '../components/ui/Button'
import Reveal from '../components/ui/Reveal'

// ─── Static data ──────────────────────────────────────────────────────────────

const CONTACT_CARDS = [
  {
    Icon: Phone,
    title: 'Hotline tư vấn',
    main: '0981 798 065 - 0782 861 873',
    sub: 'Hỗ trợ nhanh chóng trong giờ làm việc',
    href: 'tel:0981798065',
  },
  {
    Icon: Mail,
    title: 'Email liên hệ',
    main: 'contact.merifarm@gmail.com',
    sub: 'Gửi yêu cầu hợp tác hoặc báo giá',
    href: 'mailto:contact.merifarm@gmail.com',
  },
  {
    Icon: MapPin,
    title: 'Địa chỉ văn phòng / kho hàng',
    main: 'Công ty TNHH Công Nghệ DVP-Deditech',
    sub: 'Số 5-7, Đường số 32, Phường Bình Phú, TP. Hồ Chí Minh, Việt Nam',
    href: 'https://maps.google.com/?q=Đường+số+32+Bình+Phú+Hồ+Chí+Minh',
    linkLabel: 'Hướng dẫn đường đi',
  },
  {
    Icon: Clock,
    title: 'Giờ làm việc',
    main: 'Thứ 2 - Thứ 7, 7:30 - 17:30',
    sub: 'Chủ nhật và ngày lễ nghỉ',
  },
]

const PARTNERSHIP_CARDS = [
  {
    img: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&q=80&auto=format&fit=crop',
    badge: 'Đại lý',
    title: 'Đại lý phân phối',
    desc: 'Chính sách chiết khấu hấp dẫn, hỗ trợ bán hàng, tư vấn kỹ thuật chuyên sâu.',
    cta: 'Đăng ký hợp tác',
    accent: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80&auto=format&fit=crop',
    badge: 'KOL / KOC',
    title: 'KOL / KOC nông nghiệp',
    desc: 'Review sản phẩm, chia sẻ trải nghiệm, đồng hành nội dung truyền thông cùng Merifarm.',
    cta: 'Đăng ký hợp tác',
    accent: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1509099381441-ea3c0cf98b94?w=600&q=80&auto=format&fit=crop',
    badge: 'Nông trại',
    title: 'Đối tác nông trại / dự án',
    desc: 'Hợp tác mô hình, dùng thử sản phẩm, giải pháp dinh dưỡng theo nhu cầu thực tế.',
    cta: 'Tìm hiểu thêm',
    accent: false,
  },
]

const INITIAL_FORM = {
  fullName: '', phone: '', email: '',
  detailMessage: '',
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldLabel({ children, required }) {
  return (
    <p className="mb-2 text-sm font-semibold text-ink">
      {children}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </p>
  )
}

function TextInput({ name, value, onChange, placeholder, type = 'text', required }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full rounded-xl border border-soft px-4 py-2.5 text-sm text-ink placeholder:text-faint outline-none transition-colors duration-150 focus:border-primary"
    />
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-white">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-14 text-center">
        {/* Decorative leaf shapes */}
        <svg className="pointer-events-none absolute left-0 top-0 h-full w-40 opacity-[0.12]" viewBox="0 0 160 400" fill="none">
          <path d="M-20 60 Q40 100 10 180 Q-20 260 50 320" stroke="#0F6B34" strokeWidth="3" fill="none"/>
          <ellipse cx="20" cy="100" rx="35" ry="55" fill="#0F6B34" transform="rotate(-30 20 100)"/>
          <ellipse cx="5" cy="200" rx="28" ry="45" fill="#0F6B34" transform="rotate(20 5 200)"/>
          <ellipse cx="40" cy="290" rx="32" ry="50" fill="#0F6B34" transform="rotate(-10 40 290)"/>
        </svg>
        <svg className="pointer-events-none absolute right-0 top-0 h-full w-40 opacity-[0.12]" viewBox="0 0 160 400" fill="none">
          <path d="M180 60 Q120 100 150 180 Q180 260 110 320" stroke="#0F6B34" strokeWidth="3" fill="none"/>
          <ellipse cx="140" cy="100" rx="35" ry="55" fill="#0F6B34" transform="rotate(30 140 100)"/>
          <ellipse cx="155" cy="200" rx="28" ry="45" fill="#0F6B34" transform="rotate(-20 155 200)"/>
          <ellipse cx="120" cy="290" rx="32" ry="50" fill="#0F6B34" transform="rotate(10 120 290)"/>
        </svg>

        <div className="relative mx-auto max-w-2xl px-6">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Liên hệ</span>
            <h1 className="mt-3 text-3xl font-bold text-ink md:text-4xl">
              Cần tư vấn loại phân bón phù hợp?
            </h1>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              Gửi thông tin cây trồng, tình trạng vườn hoặc nhu cầu sử dụng. Đội ngũ Merifarm sẽ hỗ trợ tư vấn sản phẩm phù hợp và cách dùng tham khảo.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Main 2-col layout ─────────────────────────────────────────────────── */}
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-5">

            {/* ── Left column ─────────────────────────────────── */}
            <div className="space-y-4 md:col-span-2">

              {/* Contact cards */}
              {CONTACT_CARDS.map((card, i) => (
                <Reveal key={card.title} delay={i * 70}>
                  <div className="flex items-start gap-4 rounded-card border border-soft bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-soft bg-white text-primary">
                      <card.Icon size={19} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-secondary">
                        {card.title}
                      </p>
                      {card.href
                        ? (card.Icon === Phone || card.Icon === Mail)
                          ? (
                            <a href={card.href} className="block font-bold text-ink hover:text-primary transition-colors">
                              {card.main}
                            </a>
                          ) : (
                            <p className="font-bold text-ink">{card.main}</p>
                          )
                        : <p className="font-bold text-ink">{card.main}</p>
                      }
                      <p className="mt-0.5 text-sm text-secondary">{card.sub}</p>
                      {card.linkLabel && (
                        <a
                          href={card.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1.5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        >
                          {card.linkLabel}
                          <ChevronRight size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}

              {/* Team illustration box */}
              <Reveal delay={320}>
                <div className="relative overflow-hidden rounded-card shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1682691503311-839fdb6ac50c?w=700&q=80&auto=format&fit=crop"
                    alt="Đội ngũ tư vấn kỹ thuật Merifarm"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/40 to-transparent" />
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="mb-3 flex gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <Headphones size={17} className="text-white" />
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <Sprout size={17} className="text-white" />
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <Users size={17} className="text-white" />
                      </div>
                    </div>
                    <p className="text-base font-bold text-white">Đội ngũ Merifarm</p>
                    <p className="mt-0.5 text-sm text-white/80">
                      Luôn sẵn sàng đồng hành cùng nhà nông
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ── Right column — Form ──────────────────────────── */}
            <Reveal delay={100} className="md:col-span-3">
              <div className="rounded-card border border-soft bg-white shadow-sm">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center px-8 py-20 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary bg-white">
                      <CheckCircle2 size={34} className="text-primary" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-primary-dark">
                      Đã gửi yêu cầu tư vấn!
                    </h3>
                    <p className="mt-2 max-w-xs text-sm text-secondary">
                      Merifarm sẽ liên hệ lại trong thời gian sớm nhất để hỗ trợ tư vấn phù hợp với nhu cầu thực tế.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6"
                      onClick={() => setSubmitted(false)}
                    >
                      Gửi yêu cầu khác
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 p-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <FieldLabel required>Họ và tên</FieldLabel>
                        <TextInput
                          name="fullName" value={form.fullName} onChange={handleChange}
                          placeholder="Nhập họ và tên của bạn" required
                        />
                      </div>
                      <div>
                        <FieldLabel required>Số điện thoại</FieldLabel>
                        <TextInput
                          name="phone" type="tel" value={form.phone} onChange={handleChange}
                          placeholder="Nhập số điện thoại" required
                        />
                      </div>
                    </div>
                    <div>
                      <FieldLabel>Email (nếu có)</FieldLabel>
                      <TextInput
                        name="email" type="email" value={form.email} onChange={handleChange}
                        placeholder="Nhập email của bạn"
                      />
                    </div>
                    <div>
                      <FieldLabel>Nội dung chi tiết (mô tả thêm về vườn / nhu cầu)</FieldLabel>
                      <textarea
                        name="detailMessage"
                        rows={4}
                        value={form.detailMessage}
                        onChange={handleChange}
                        placeholder="Mô tả chi tiết hơn về vườn, hiện trạng cây, mục tiêu và câu hỏi của bạn..."
                        className="w-full resize-none rounded-xl border border-soft px-4 py-2.5 text-sm text-ink placeholder:text-faint outline-none transition-colors duration-150 focus:border-primary"
                      />
                    </div>

                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-150 hover:bg-primary-dark hover:border-primary-dark hover:shadow-md active:scale-[0.99]"
                    >
                      <Send size={16} />
                      Gửi yêu cầu tư vấn
                    </button>

                    <p className="text-center text-xs text-faint">
                      Merifarm sẽ liên hệ lại trong thời gian sớm nhất để hỗ trợ tư vấn phù hợp với nhu cầu thực tế.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── Partnership section ──────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-ink md:text-3xl">
                Hợp tác cùng Merifarm
              </h2>
              <p className="mt-2 text-secondary">
                Đồng hành phát triển thị trường, truyền thông và cộng đồng nông nghiệp
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-3">
            {PARTNERSHIP_CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 80}>
                <div className="flex h-full flex-col overflow-hidden rounded-card border border-soft bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-bold
                      ${card.accent ? 'bg-white border border-accent-dark text-accent-dark' : 'bg-white border border-soft text-primary-dark'}`}>
                      {card.badge}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-2 font-bold text-ink">{card.title}</h3>
                    <p className="flex-1 text-sm leading-relaxed text-secondary">{card.desc}</p>
                    <button
                      className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-150
                        ${card.accent
                          ? 'border-accent-dark text-accent-dark hover:bg-accent hover:text-white'
                          : 'border-primary text-primary hover:bg-primary hover:text-white'}`}
                    >
                      {card.cta}
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
