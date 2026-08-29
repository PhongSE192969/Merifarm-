import {
  Sprout, Store, Building2, Home,
  Target, Eye, Heart, Handshake,
} from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'

function LeafSprig({ className = '', flip = false }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`${flip ? 'scale-x-[-1]' : ''} ${className}`}
    >
      <path d="M10,90 Q35,60 55,35 Q70,15 90,10" strokeLinecap="round" />
      <path d="M30,68 Q40,50 60,48 Q75,47 82,35" fill="currentColor" opacity="0.5" />
      <path d="M45,50 Q55,32 76,28 Q90,26 95,15" fill="currentColor" opacity="0.5" />
      <path d="M58,32 Q66,18 85,15" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

const MVV = [
  {
    icon: Target,
    title: 'Sứ mệnh',
    image: 'https://images.unsplash.com/photo-1633410195091-bd66114cef5f?w=700&q=80&auto=format&fit=crop',
    text: 'Cung cấp các sản phẩm phân bón chất lượng, hỗ trợ canh tác hiệu quả và góp phần nâng cao năng suất mùa vụ.',
  },
  {
    icon: Eye,
    title: 'Tầm nhìn',
    image: 'https://images.unsplash.com/photo-1781032480530-5809498d868b?w=700&q=80&auto=format&fit=crop',
    text: 'Trở thành thương hiệu phân bón đáng tin cậy, đồng hành cùng nông dân, nhà vườn và đại lý trên toàn quốc.',
  },
  {
    icon: Heart,
    title: 'Giá trị cốt lõi',
    image: 'https://images.unsplash.com/photo-1757283588694-9ff82d409b4d?w=700&q=80&auto=format&fit=crop',
    text: 'Chất lượng, minh bạch, tận tâm và đồng hành lâu dài cùng khách hàng trong quá trình chăm sóc cây trồng.',
  },
]

const AUDIENCES = [
  {
    icon: Sprout,
    title: 'Nông dân & nhà vườn',
    image: 'https://images.unsplash.com/photo-1682691503311-839fdb6ac50c?w=600&q=80&auto=format&fit=crop',
    text: 'Hỗ trợ lựa chọn phân bón phù hợp theo loại cây, tình trạng đất và từng giai đoạn sinh trưởng.',
  },
  {
    icon: Store,
    title: 'Cửa hàng vật tư nông nghiệp',
    image: 'https://images.unsplash.com/photo-1722893960889-5f2d88ce6524?w=600&q=80&auto=format&fit=crop',
    text: 'Cung cấp danh mục sản phẩm dễ tư vấn, phù hợp với nhu cầu thực tế của khách hàng địa phương.',
  },
  {
    icon: Handshake,
    title: 'Đại lý phân phối',
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&q=80&auto=format&fit=crop',
    text: 'Đồng hành với chính sách hợp tác rõ ràng, sản phẩm ổn định và hỗ trợ tư vấn kỹ thuật.',
  },
  {
    icon: Building2,
    title: 'Trang trại & hợp tác xã',
    image: 'https://images.unsplash.com/photo-1509099381441-ea3c0cf98b94?w=600&q=80&auto=format&fit=crop',
    text: 'Hỗ trợ nhu cầu sử dụng số lượng lớn, tư vấn theo mùa vụ và nhóm cây trồng.',
  },
  {
    icon: Home,
    title: 'Người trồng cây tại nhà',
    image: 'https://images.unsplash.com/photo-1530968464165-7a1861cbaf9f?w=600&q=80&auto=format&fit=crop',
    text: 'Gợi ý sản phẩm phù hợp cho rau sạch, hoa kiểng, cây cảnh và cây trồng trong chậu.',
  },
]

const COMMITMENTS = [
  {
    number: '01',
    title: 'Chất lượng rõ ràng',
    text: 'Sản phẩm chất lượng cao, hiệu quả được kiểm chứng.',
    pos: 'top',
    left: 8,
  },
  {
    number: '02',
    title: 'Thông tin minh bạch',
    text: 'Cung cấp đầy đủ, rõ ràng, không làm sai lệch.',
    pos: 'top',
    left: 27,
  },
  {
    number: '03',
    title: 'Tư vấn phù hợp',
    text: 'Hiểu đúng cây trồng, đất đai để tư vấn đúng giải pháp.',
    pos: 'bottom',
    left: 41,
  },
  {
    number: '04',
    title: 'Đồng hành thực tế',
    text: 'Luôn có mặt khi bà con cần, hỗ trợ tận nơi.',
    pos: 'bottom',
    left: 59,
  },
  {
    number: '05',
    title: 'Giao hàng cẩn thận',
    text: 'Đúng hẹn, đúng sản phẩm, đóng gói kỹ lưỡng.',
    pos: 'top',
    left: 76,
  },
  {
    number: '06',
    title: 'Hợp tác lâu dài',
    text: 'Xây dựng mối quan hệ bền vững, cùng phát triển.',
    pos: 'bottom',
    left: 92,
  },
]

const VALUE_CARDS = [
  {
    number: '01',
    label: 'Kiểm soát chất lượng',
    image: '/about-kiem-tra-chat-luong.png',
  },
  {
    number: '02',
    label: 'Hiểu đúng nhu cầu',
    image: '/process-step2-tuvan.png',
  },
  {
    number: '03',
    label: 'Đồng hành xuyên suốt',
    image: '/about-dong-hanh.png',
    focus: '72% 58%',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ── 1. HERO — full-bleed photo banner, header floats on top ── */}
      <section
        className="relative flex min-h-[560px] items-center overflow-hidden bg-cover bg-center py-28 md:min-h-[640px] md:py-36"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80&auto=format&fit=crop')",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-black/55" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 text-center">
          <Reveal>
            <div className="mx-auto max-w-2xl">
              <p className="mb-4 text-base font-bold uppercase tracking-widest text-accent-light">
                Về Merifarm
              </p>
              <h1 className="text-4xl font-extrabold leading-tight text-white drop-shadow-md md:text-5xl">
                Đồng hành cùng nhà nông
                <br /> qua từng mùa vụ
              </h1>
              <p className="mx-auto mt-5 whitespace-nowrap text-lg leading-relaxed text-white/85">
                Giải pháp dinh dưỡng phù hợp, gắn với nhu cầu thực tế của từng vườn cây
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 1b. VALUES — text + bento image cards ── */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
            <Reveal>
              <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent-dark">
                <span className="h-0.5 w-6 bg-accent-dark" /> Giá trị Merifarm theo đuổi
              </div>
              <h2 className="text-3xl font-extrabold leading-tight text-primary-dark md:text-4xl">
                Từ chất lượng sản phẩm
                <br /> đến hiệu quả canh tác
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-secondary">
                Mỗi giải pháp được xây dựng từ nhu cầu thực tế, quy trình kiểm soát và sự đồng
                hành trong suốt mùa vụ.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="grid h-[380px] grid-cols-2 grid-rows-2 gap-4 sm:h-[420px]">
                {VALUE_CARDS.map((card, i) => (
                  <div
                    key={card.number}
                    className={`group relative overflow-hidden rounded-2xl shadow-soft ${
                      i === 0 ? 'row-span-2' : ''
                    }`}
                  >
                    <img
                      src={card.image}
                      alt={card.label}
                      style={card.focus ? { objectPosition: card.focus } : undefined}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/85 via-primary-dark/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 overflow-hidden rounded-xl border border-white/35 bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(0,0,0,0.25)] backdrop-blur-xl [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]">
                      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent" />
                      <span className="relative text-accent-light">{card.number}</span>
                      <span className="relative h-3.5 w-px bg-white/40" />
                      <span className="relative">{card.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 2. BRAND STORY ── */}
      <section id="cau-chuyen" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <SectionHeading
              eyebrow="CÂU CHUYỆN"
              title="Merifarm được xây dựng từ nhu cầu thực tế của nhà nông"
            />
          </Reveal>
          <div className="grid items-start gap-10 md:grid-cols-2">
            {/* Left: text */}
            <Reveal>
              <div className="space-y-5 text-base leading-relaxed text-secondary">
                <p>
                  Trong canh tác, mỗi loại cây trồng, mỗi vùng đất và mỗi giai đoạn sinh trưởng
                  đều cần một chế độ dinh dưỡng khác nhau. Merifarm ra đời với mong muốn giúp nông
                  dân và nhà vườn tiếp cận các dòng phân bón phù hợp, dễ lựa chọn và có tính ứng
                  dụng thực tế.
                </p>
                <p>
                  Chúng tôi không chỉ cung cấp sản phẩm, mà còn hướng đến việc đồng hành trong
                  quá trình tư vấn, lựa chọn phân bón và hỗ trợ khách hàng sử dụng sản phẩm đúng
                  nhu cầu.
                </p>
              </div>
            </Reveal>

            {/* Right: image */}
            <Reveal delay={130}>
              <div className="overflow-hidden rounded-card shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1609412058473-c199497c3c5d?w=800&q=80&auto=format&fit=crop"
                  alt="Canh tác lúa – Merifarm"
                  className="aspect-video w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 3. MISSION / VISION / VALUES — image-strip cards ── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <SectionHeading
              eyebrow="ĐỊNH HƯỚNG"
              title="Sứ mệnh, tầm nhìn và giá trị cốt lõi"
              center
            />
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {MVV.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="group h-full overflow-hidden rounded-card border border-soft bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  {/* Image strip */}
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary-dark/50" />
                    <div className="absolute bottom-3 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-white/40 backdrop-blur-sm">
                      <item.icon size={22} />
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-secondary">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. AUDIENCE — thumbnail-image cards ── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <SectionHeading
              eyebrow="ĐỐI TƯỢNG PHỤC VỤ"
              title="Merifarm đồng hành cùng ai?"
              description="Chúng tôi phục vụ nhiều nhóm khách hàng trong lĩnh vực nông nghiệp, từ nông hộ nhỏ đến đại lý phân phối và cửa hàng vật tư nông nghiệp."
              center
            />
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4">
            {AUDIENCES.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="group h-full overflow-hidden rounded-card border border-soft bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md">
                  {/* Thumbnail */}
                  <div className="relative h-28 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary-dark/40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-white/40 backdrop-blur-sm">
                        <item.icon size={19} />
                      </div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-secondary">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. COMMITMENTS — wave timeline with blob photo ── */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <LeafSprig className="pointer-events-none absolute -right-6 top-6 hidden h-28 w-28 text-primary/15 lg:block" />

        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-primary">
              Niềm tin từ những điều thật
            </p>
            <h2 className="max-w-2xl text-4xl font-extrabold leading-tight text-ink md:text-5xl">
              Cam kết của Merifarm
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-secondary">
              Merifarm cam kết mang đến giải pháp dinh dưỡng cây trồng hiệu quả, minh bạch và bền
              vững từ chất lượng đến đồng hành.
            </p>
          </Reveal>

          {/* Desktop: wave timeline */}
          <div className="relative mt-28 hidden h-[280px] lg:block">
            <svg
              viewBox="0 0 1200 100"
              preserveAspectRatio="none"
              className="absolute inset-x-0 top-1/2 h-28 w-full -translate-y-1/2"
            >
              <defs>
                <linearGradient id="commitWave" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0F6B34" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="#0F6B34" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0F6B34" stopOpacity="0.15" />
                </linearGradient>
              </defs>
              <path
                d="M-30,48 C20,18 65,14 96,26 C170,50 250,6 324,26
                   C400,46 445,68 492,78 C560,88 640,88 708,78
                   C775,68 850,36 912,26 C978,14 1040,44 1104,72
                   C1150,90 1185,60 1230,50"
                fill="none"
                stroke="url(#commitWave)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>

            <LeafSprig className="pointer-events-none absolute -left-8 bottom-6 h-14 w-14 text-primary/40" />
            <LeafSprig flip className="pointer-events-none absolute -right-8 bottom-2 h-14 w-14 text-primary/40" />

            {COMMITMENTS.map((item) => (
              <span
                key={item.number}
                className="absolute z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-4 ring-white"
                style={{ left: `${item.left}%`, top: item.pos === 'top' ? '31%' : '69%' }}
              />
            ))}

            {COMMITMENTS.map((item, i) => (
              <div
                key={item.number}
                className={`absolute z-10 -translate-x-1/2 text-center ${
                  item.pos === 'top' ? 'bottom-[73%]' : 'top-[73%]'
                }`}
                style={{ left: `${item.left}%` }}
              >
                <Reveal delay={i * 80} className="relative">
                  <span
                    className="absolute left-1/2 h-[22px] w-px -translate-x-1/2 border-l border-dashed border-primary/40"
                    style={item.pos === 'top' ? { bottom: '-22px' } : { top: '-22px' }}
                  />
                  <span className="text-3xl font-extrabold text-accent">{item.number}</span>
                  <h3 className="mt-1 whitespace-nowrap font-bold text-ink">{item.title}</h3>
                  <p className="mx-auto mt-1 w-36 text-xs leading-relaxed text-secondary">{item.text}</p>
                </Reveal>
              </div>
            ))}
          </div>

          {/* Mobile / tablet: simple grid fallback */}
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:hidden">
            {COMMITMENTS.map((item, i) => (
              <Reveal key={item.number} delay={i * 70}>
                <div className="text-center sm:text-left">
                  <span className="text-2xl font-extrabold text-accent">{item.number}</span>
                  <h3 className="mt-1 font-bold text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-secondary">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
