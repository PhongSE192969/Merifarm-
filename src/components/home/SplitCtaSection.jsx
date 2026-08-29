import { Link } from 'react-router-dom'
import { ArrowRight, Handshake, Sprout } from 'lucide-react'
import Reveal from '../ui/Reveal'

const PANELS = [
  {
    image: '/process-step4-giaohang.png',
    badge: 'Dành cho đại lý',
    badgeIcon: Handshake,
    title: 'Cùng Merifarm phát triển\nThị trường',
    description: 'Danh mục ổn định, chính sách rõ ràng và hỗ trợ kỹ thuật đồng hành cùng đại lý.',
    cta: 'Đăng ký làm đại lý',
    to: '/lien-he',
  },
  {
    image: '/process-step1-order.png',
    badge: 'Dành cho nhà vườn',
    badgeIcon: Sprout,
    title: 'Chọn đúng giải pháp\nCho cây trồng',
    description: 'Gửi tình trạng cây trồng để đội ngũ Merifarm tư vấn sản phẩm phù hợp.',
    cta: 'Liên hệ tư vấn',
    to: '/lien-he',
  },
]

export default function SplitCtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
      <Reveal>
        <div className="grid overflow-hidden rounded-3xl shadow-softLg md:grid-cols-2">
          {PANELS.map((panel) => (
            <Link
              key={panel.title}
              to={panel.to}
              className="group relative flex h-[420px] flex-col justify-end overflow-hidden bg-primary-dark p-8 sm:h-[480px] md:h-[560px] md:p-12"
            >
              <img
                src={panel.image}
                alt={panel.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-accent-light/70 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-accent-light backdrop-blur-md">
                  <panel.badgeIcon size={14} /> {panel.badge}
                </span>
                <h3 className="mt-5 whitespace-pre-line text-2xl font-extrabold leading-tight text-white md:text-3xl">
                  {panel.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80 md:text-base">
                  {panel.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-white group-hover:text-primary-dark">
                  {panel.cta} <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
