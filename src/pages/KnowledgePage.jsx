import { BookOpen } from 'lucide-react'

export default function KnowledgePage() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-soft-green text-primary">
          <BookOpen size={26} />
        </div>
        <p className="mt-5 text-sm font-bold uppercase tracking-widest text-accent-dark">
          Đồng hành cùng nhà nông
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-primary-dark md:text-5xl">
          Kiến thức nhà nông
        </h1>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-secondary">
          Chia sẻ kiến thức chăm sóc cây trồng, sử dụng phân bón và kinh nghiệm canh tác hiệu quả.
        </p>
      </div>
    </section>
  )
}
