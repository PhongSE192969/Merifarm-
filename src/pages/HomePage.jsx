import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Leaf,
  ShieldCheck,
  Headset,
  ArrowRight,
  Sprout,
  Flower2,
  Citrus,
  Shovel,
  Wheat,
  Carrot,
  Apple,
} from 'lucide-react'
import FeaturedProductsSection from '../components/product/FeaturedProductsSection'
import WhyChooseSection from '../components/home/WhyChooseSection'
import ProcessSection from '../components/home/ProcessSection'
import SplitCtaSection from '../components/home/SplitCtaSection'
import Reveal from '../components/ui/Reveal'

const NEEDS = [
  {
    icon: Leaf,
    title: 'Cây vàng lá, chậm lớn',
    description: 'Gợi ý sản phẩm giúp bổ sung dinh dưỡng và hỗ trợ cây phục hồi.',
    need: 'phuc-hoi-cay-yeu',
    image: 'https://images.unsplash.com/photo-1613301942134-c0a9715bffe6?w=600&q=80&auto=format&fit=crop',
  },
  {
    icon: Sprout,
    title: 'Cây yếu rễ, khó phát triển',
    description: 'Ưu tiên các dòng phân bón rễ, humic và hữu cơ cải tạo đất.',
    need: 'ra-re',
    image: 'https://images.unsplash.com/photo-1715766911065-83723bc00d2f?w=600&q=80&auto=format&fit=crop',
  },
  {
    icon: Flower2,
    title: 'Cây chuẩn bị ra hoa',
    description: 'Hỗ trợ phân hóa mầm hoa và tăng khả năng đậu trái.',
    need: 'ra-hoa',
    image: 'https://images.unsplash.com/photo-1523169054-66018b90af5e?w=600&q=80&auto=format&fit=crop',
  },
  {
    icon: Citrus,
    title: 'Cây đang nuôi trái',
    description: 'Bổ sung dinh dưỡng giúp trái lớn đều, chắc trái và đẹp màu.',
    need: 'nuoi-trai',
    image: 'https://images.unsplash.com/photo-1676043966787-1813f1f5ec22?w=600&q=80&auto=format&fit=crop',
  },
  {
    icon: Shovel,
    title: 'Đất chai, bạc màu',
    description: 'Cải thiện đất bằng phân hữu cơ, vi sinh và humic.',
    need: 'cai-tao-dat',
    image: 'https://images.unsplash.com/photo-1582288916603-4698cf723bf6?w=600&q=80&auto=format&fit=crop',
  },
]

const CROP_ARC = [
  'md:rotate-[-9deg] md:translate-y-8',
  'md:rotate-[-3deg] md:translate-y-1',
  'md:rotate-[3deg] md:translate-y-1',
  'md:rotate-[9deg] md:translate-y-8',
]

const CROP_SOLUTIONS = [
  {
    icon: Wheat,
    title: 'Lúa',
    description: 'Hỗ trợ cây khỏe, đẻ nhánh tốt, nuôi hạt chắc và nâng cao năng suất.',
    crop: 'lua',
    image: 'https://images.unsplash.com/photo-1609412058473-c199497c3c5d?w=800&q=80&auto=format&fit=crop',
  },
  {
    icon: Carrot,
    title: 'Rau màu',
    description: 'Giúp cây phát triển đồng đều, xanh lá và tăng sức chống chịu.',
    crop: 'rau-mau',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80&auto=format&fit=crop',
  },
  {
    icon: Apple,
    title: 'Cây ăn trái',
    description: 'Hỗ trợ ra hoa, đậu trái, nuôi trái và cải thiện chất lượng nông sản.',
    crop: 'cay-an-trai',
    image: 'https://images.unsplash.com/photo-1622955658214-d05c1c6fcf84?w=800&q=80&auto=format&fit=crop',
  },
  {
    icon: Flower2,
    title: 'Hoa kiểng',
    description: 'Giúp cây xanh tốt, bộ rễ khỏe, hoa bền màu và phát triển ổn định.',
    crop: 'hoa-kieng',
    image: 'https://images.unsplash.com/photo-1595672049786-43da1581214c?w=800&q=80&auto=format&fit=crop',
  },
]

export default function HomePage() {
  const [activeNeed, setActiveNeed] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNeed((prev) => (prev + 1) % NEEDS.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [activeNeed])

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative flex min-h-screen min-h-[100dvh] items-center justify-center overflow-hidden bg-cover bg-center py-20 md:py-28"
        style={{ backgroundImage: "url('/hero-merifarm.png')" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-black/35" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/25" />

        <div className="relative z-10 mx-auto w-full max-w-4xl -translate-y-8 px-4 text-center md:-translate-y-10">
          <Reveal>
            <img
              src="/logo.png"
              alt="Logo Merifarm"
              className="mx-auto h-auto w-28 drop-shadow-lg md:w-36"
            />
            <p className="mt-5 text-2xl font-extrabold tracking-[0.18em] text-white drop-shadow-md md:text-3xl">
              MERIFARM
            </p>
            <h1 className="mx-auto mt-4 text-2xl font-extrabold leading-tight text-white drop-shadow-md md:whitespace-nowrap md:text-4xl">
              Dinh dưỡng cho cây - Vụ mùa bội thu
            </h1>
            <p className="mx-auto mt-5 text-base leading-relaxed text-white/85 md:whitespace-nowrap md:text-lg">
              Giải pháp dinh dưỡng phù hợp cho từng loại cây trồng, đồng hành cùng nhà nông trong mỗi mùa vụ
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/san-pham"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-accent-light/90 bg-accent/15 px-6 py-3 font-bold text-white shadow-[0_0_24px_rgba(217,164,65,0.28)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-light hover:bg-accent/35 hover:shadow-[0_0_32px_rgba(217,164,65,0.48)]"
              >
                Xem sản phẩm <ArrowRight size={18} />
              </Link>
              <Link
                to="/lien-he"
                className="inline-flex items-center justify-center rounded-full border border-white bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-primary-dark"
              >
                Liên hệ tư vấn
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="overflow-hidden bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                <Leaf size={14} /> Theo cây trồng
              </span>
              <h2
                className="mt-5 whitespace-nowrap font-extrabold leading-[1.1] tracking-tight text-primary-dark"
                style={{ fontSize: 'clamp(1rem, calc(5.2vw - 1.7px), 2.9rem)' }}
              >
                Dinh dưỡng đúng cây mùa vụ thêm xanh
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-secondary md:text-lg">
                Khám phá giải pháp phân bón phù hợp cho từng nhóm cây trồng và từng giai đoạn phát triển
              </p>
            </div>
          </Reveal>

          {/* Mobile: flat 2x2 grid */}
          <div className="grid grid-cols-2 gap-3 pb-4 md:hidden">
            {CROP_SOLUTIONS.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <Link
                  to={`/san-pham?crop=${item.crop}`}
                  className="group relative block h-64 overflow-hidden rounded-2xl shadow-lg"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/10 to-black/5" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-white/40 backdrop-blur-sm">
                      <item.icon size={18} />
                    </div>
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/80">{item.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Desktop: 4 separate cards, individually tilted + offset to form one shared arc */}
          <div className="mt-10 hidden md:grid md:grid-cols-4 md:gap-4 md:pb-10">
            {CROP_SOLUTIONS.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <Link
                  to={`/san-pham?crop=${item.crop}`}
                  className={`group relative block h-[300px] overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 hover:z-10 hover:-translate-y-2 ${CROP_ARC[i]}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/10 to-black/5" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-white/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <item.icon size={18} />
                    </div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/80">{item.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={180}>
            <div className="mt-7 text-center">
              <p className="text-xl font-bold text-primary-dark md:text-2xl">
                Giải pháp phù hợp cho mọi vườn cây
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-secondary">
                <span className="inline-flex items-center gap-2"><ShieldCheck size={16} className="text-primary" /> Dinh dưỡng phù hợp</span>
                <span className="inline-flex items-center gap-2"><Leaf size={16} className="text-primary" /> Canh tác hiệu quả</span>
                <span className="inline-flex items-center gap-2"><Headset size={16} className="text-primary" /> Tư vấn tận tâm</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FeaturedProductsSection />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 text-sm font-bold uppercase tracking-widest text-accent-dark">Tư vấn nhanh</p>
                <h2 className="text-3xl font-extrabold text-primary-dark md:text-4xl">
                  Cây trồng của bạn đang cần điều gì?
                </h2>
              </div>
              <div className="flex items-center justify-between gap-6 md:justify-end">
                <p className="max-w-xs text-sm text-secondary">
                  Chọn đúng tình trạng để nhận gợi ý sản phẩm phù hợp.
                </p>
                <Link
                  to="/san-pham"
                  className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-semibold text-primary-dark underline underline-offset-4 hover:text-primary"
                >
                  Xem tất cả <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-10 flex h-[440px] gap-2 overflow-hidden rounded-3xl md:h-[520px] md:gap-3">
              {NEEDS.map((item, i) => {
                const active = i === activeNeed
                return (
                  <div
                    key={item.title}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveNeed(i)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveNeed(i)}
                    aria-pressed={active}
                    className={`group relative h-full cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-out ${
                      active ? 'flex-[6]' : 'min-w-[36px] flex-1 md:min-w-[100px]'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className={`absolute inset-0 transition-colors duration-500 ${
                        active
                          ? 'bg-gradient-to-r from-primary-dark/95 via-primary-dark/45 to-transparent'
                          : 'bg-primary-dark/55 group-hover:bg-primary-dark/40'
                      }`}
                    />

                    {!active && (
                      <div className="absolute inset-0 hidden flex-col justify-between p-3 sm:flex md:p-4">
                        <span className="text-xs font-bold text-white/70 md:text-sm">0{i + 1}</span>
                        <div>
                          <item.icon size={18} className="mb-2 text-accent-light" />
                          <p className="text-xs font-semibold leading-snug text-white md:text-sm">{item.title}</p>
                        </div>
                      </div>
                    )}

                    {active && (
                      <>
                        <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5 md:p-10">
                          <span className="inline-flex w-fit items-center rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white sm:px-3 sm:text-[11px]">
                            Đang khám phá
                          </span>

                          <div className="max-w-md">
                            <p className="mb-1.5 hidden text-sm font-bold uppercase tracking-wide text-accent-light sm:block md:mb-2">
                              0{i + 1} — Tư vấn nhanh
                            </p>
                            <h3 className="text-lg font-extrabold leading-tight text-white sm:text-2xl md:text-3xl">
                              {item.title}
                            </h3>
                            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-white/85 sm:mt-3 sm:text-sm md:text-base">
                              {item.description}
                            </p>
                            <Link
                              to={`/san-pham?need=${item.need}`}
                              onClick={(e) => e.stopPropagation()}
                              className="mt-3 inline-flex items-center gap-2 rounded-full border border-white bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-primary-dark sm:mt-5 sm:px-5 sm:py-2.5 sm:text-sm"
                            >
                              Khám phá giải pháp <ArrowRight size={16} />
                            </Link>
                          </div>
                        </div>
                        <span className="pointer-events-none absolute -right-3 bottom-2 hidden select-none text-[110px] font-extrabold leading-none text-white/10 sm:block md:text-[160px]">
                          0{i + 1}
                        </span>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </Reveal>

          <div className="mt-6 flex items-center justify-center gap-2">
            {NEEDS.map((item, i) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveNeed(i)}
                aria-label={`Xem ${item.title}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeNeed ? 'w-10 bg-accent' : 'w-6 bg-soft'
                }`}
              />
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-faint">
            Di chuyển hoặc chọn một nhu cầu để khám phá
          </p>
        </div>
      </section>

      <WhyChooseSection />

      <ProcessSection />

      <SplitCtaSection />
    </>
  )
}
