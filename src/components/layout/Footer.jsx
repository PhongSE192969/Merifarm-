import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ChevronDown } from 'lucide-react'
import categories from '../../data/categories.json'

const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://www.facebook.com/phanbonmerifarm', icon: '/icons/facebook.svg' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@merifarm26?_r=1&_t=ZS-99IAILSeNcb', icon: '/icons/tiktok.svg' },
  { name: 'Zalo', href: 'https://zalo.me/0981798065', icon: '/icons/zalo.svg' },
  { name: 'Shopee', href: 'https://vn.shp.ee/yu2W5fWR', icon: '/icons/shopee.svg' },
]

function SocialLinks({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {SOCIAL_LINKS.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-white p-1 shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
        >
          <img src={s.icon} alt="" className="h-full w-full object-contain" />
        </a>
      ))}
    </div>
  )
}

const SUPPORT_LINKS = [
  { to: '/gioi-thieu', label: 'Về Merifarm' },
  { to: '/chinh-sach/huong-dan-mua-hang', label: 'Hướng dẫn mua hàng' },
  { to: '/chinh-sach/chinh-sach-thanh-toan', label: 'Chính sách thanh toán' },
  { to: '/chinh-sach/chinh-sach-giao-hang', label: 'Chính sách giao hàng' },
  { to: '/chinh-sach/chinh-sach-doi-tra-hoan-tien', label: 'Chính sách đổi trả / hoàn tiền' },
  { to: '/chinh-sach/chinh-sach-bao-mat-thong-tin-ca-nhan', label: 'Chính sách bảo mật thông tin cá nhân' },
  { to: '/lien-he', label: 'Tư vấn phân bón' },
  { to: '/lien-he', label: 'Hợp tác đại lý' },
]

function AccordionGroup({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-t border-white/10 md:border-0">
      <button
        type="button"
        className="flex w-full items-center justify-between py-3 font-semibold tracking-wide text-white md:cursor-default md:py-0"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {title}
        <ChevronDown
          size={16}
          className={`shrink-0 text-white/50 transition-transform duration-200 md:hidden ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 md:block md:!max-h-none md:opacity-100
        ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="pb-3 md:pb-0 md:pt-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-b from-primary-dark via-footer to-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="grid gap-0 md:grid-cols-[1.1fr_0.75fr_1.35fr_1.1fr] md:gap-10">

          {/* Col 1: Brand — always visible */}
          <div className="mb-6 md:-ml-6 md:mb-0">
            <img src="/logo.png" alt="Phân Bón Merifarm" className="-ml-6 h-16 w-auto object-contain" />
            <p className="mt-3 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-accent-light">
              Công ty TNHH Công Nghệ DVP-Deditech
            </p>
            <p className="mt-1 font-bold text-white">Phân Bón Merifarm</p>
            <p className="mt-1 text-sm leading-relaxed text-white/65">
              Cung cấp các sản phẩm phân bón chất lượng cao, đồng hành cùng nông dân và đại lý trên toàn quốc.
            </p>
            {/* Mobile: contact info below brand */}
            <div className="mt-4 space-y-2.5 text-sm text-white/65 md:hidden">
              <div className="flex items-center gap-2">
                <Phone size={14} className="shrink-0 text-accent-light" />
                <a href="tel:0981798065" className="hover:text-white">0981 798 065</a>
                <span>-</span>
                <a href="tel:0782861873" className="hover:text-white">0782 861 873</a>
              </div>
              <a href="mailto:contact.merifarm@gmail.com" className="flex items-center gap-2 hover:text-white">
                <Mail size={14} className="shrink-0 text-accent-light" />
                contact.merifarm@gmail.com
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-accent-light" />
                <span>Số 5-7, Đường số 32, Phường Bình Phú, TP. Hồ Chí Minh</span>
              </div>
              <SocialLinks className="pt-1" />
            </div>
          </div>

          {/* Col 2: Danh mục — accordion on mobile */}
          <AccordionGroup title="Danh mục sản phẩm">
            <ul className="space-y-2 text-sm text-white/65">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link to={`/san-pham?category=${c.id}`} className="transition-colors hover:text-white">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionGroup>

          {/* Col 3: Hỗ trợ — accordion on mobile */}
          <AccordionGroup title="Hỗ trợ">
            <ul className="space-y-2 whitespace-nowrap text-sm text-white/65">
              {SUPPORT_LINKS.map((l, i) => (
                <li key={i}>
                  <Link to={l.to} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionGroup>

          {/* Col 4: Contact — hidden on mobile (shown above in brand col) */}
          <div className="hidden md:block">
            <h4 className="mb-4 font-semibold tracking-wide text-white">Liên hệ</h4>
            <ul className="space-y-3 text-sm text-white/65">
              <li className="flex items-center gap-2 whitespace-nowrap">
                <Phone size={15} className="shrink-0 text-accent-light" />
                <a href="tel:0981798065" className="hover:text-white transition-colors">0981 798 065</a>
                <span>-</span>
                <a href="tel:0782861873" className="hover:text-white transition-colors">0782 861 873</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="shrink-0 text-accent-light" />
                <a href="mailto:contact.merifarm@gmail.com" className="hover:text-white transition-colors">contact.merifarm@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-accent-light" />
                Số 5-7, Đường số 32, Phường Bình Phú, TP. Hồ Chí Minh, Việt Nam
              </li>
            </ul>
            <SocialLinks className="mt-4" />
          </div>

        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © 2026 Merifarm — Công ty TNHH Công Nghệ DVP-Deditech. All rights reserved.
      </div>
    </footer>
  )
}
