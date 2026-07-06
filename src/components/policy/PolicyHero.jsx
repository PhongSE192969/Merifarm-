import { Calendar } from 'lucide-react'

export default function PolicyHero({ title, description }) {
  return (
    <section className="border-b border-soft bg-soft-green py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-accent-dark">
          Chính sách Merifarm
        </p>
        <h1 className="text-3xl font-bold text-primary-dark md:text-4xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-secondary">{description}</p>
        <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1.5 text-xs text-faint ring-1 ring-soft">
          <Calendar size={12} />
          Cập nhật lần cuối: 2026
        </div>
      </div>
    </section>
  )
}
