import { Link } from 'react-router-dom'
import {
  Leaf, Sprout, ShieldCheck, Truck, Headset, HeartHandshake,
  Store, Building2, Home, ArrowRight, CheckCircle2,
  Target, Eye, Heart, Tag, Handshake, FlaskConical, Flower2,
  ClipboardList, Lightbulb, ClipboardCheck, PackageCheck,
} from 'lucide-react'
import Button from '../components/ui/Button'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'

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

const PRODUCTS_CAT = [
  {
    icon: FlaskConical,
    id: 'npk',
    title: 'Phân bón NPK',
    image: 'https://images.unsplash.com/photo-1757670919588-1fe3b3df3dfa?w=600&q=80&auto=format&fit=crop',
    text: 'Bổ sung dinh dưỡng đa lượng, hỗ trợ cây phát triển cân đối.',
  },
  {
    icon: Sprout,
    id: 'huu-co',
    title: 'Phân hữu cơ vi sinh',
    image: 'https://images.unsplash.com/photo-1492496913980-501348b61469?w=600&q=80&auto=format&fit=crop',
    text: 'Góp phần cải tạo đất, tăng hệ vi sinh có lợi và hỗ trợ canh tác bền vững.',
  },
  {
    icon: Flower2,
    id: 'phan-bon-la',
    title: 'Phân bón lá',
    image: 'https://images.unsplash.com/photo-1589876568181-a1508b8ef473?w=600&q=80&auto=format&fit=crop',
    text: 'Hỗ trợ bổ sung dinh dưỡng nhanh qua lá, phù hợp trong nhiều giai đoạn sinh trưởng.',
  },
  {
    icon: Leaf,
    id: 'phan-bon-re',
    title: 'Phân bón rễ',
    image: 'https://images.unsplash.com/photo-1621256257758-276a90549f80?w=600&q=80&auto=format&fit=crop',
    text: 'Hỗ trợ bộ rễ khỏe, tăng khả năng hấp thu dinh dưỡng và phục hồi cây.',
  },
  {
    icon: HeartHandshake,
    id: 'trun-que',
    title: 'Phân trùn quế',
    image: 'https://images.unsplash.com/photo-1708191225887-0642eb28f6ac?w=600&q=80&auto=format&fit=crop',
    text: 'Giải pháp hữu cơ thân thiện, phù hợp cải tạo đất và chăm sóc cây trồng.',
  },
]

const COMMITMENTS = [
  {
    icon: ShieldCheck,
    title: 'Sản phẩm rõ nguồn gốc',
    text: 'Thông tin sản phẩm, quy cách và công dụng được trình bày minh bạch.',
  },
  {
    icon: Headset,
    title: 'Tư vấn đúng nhu cầu',
    text: 'Hỗ trợ lựa chọn sản phẩm theo loại cây, tình trạng cây và giai đoạn canh tác.',
  },
  {
    icon: Tag,
    title: 'Giá bán minh bạch',
    text: 'Thông tin giá rõ ràng, phù hợp cho cả khách lẻ và nhu cầu đại lý.',
  },
  {
    icon: Truck,
    title: 'Giao hàng linh hoạt',
    text: 'Hỗ trợ giao hàng theo đơn, theo khu vực và nhu cầu thực tế.',
  },
  {
    icon: HeartHandshake,
    title: 'Đồng hành sau mua',
    text: 'Hỗ trợ hướng dẫn sử dụng và giải đáp trong quá trình chăm sóc cây trồng.',
  },
  {
    icon: Handshake,
    title: 'Hợp tác đại lý rõ ràng',
    text: 'Mở rộng cơ hội hợp tác cho cửa hàng vật tư nông nghiệp và đơn vị phân phối.',
  },
]

const STEPS = [
  {
    icon: ClipboardList,
    title: 'Gửi thông tin cây trồng',
    text: 'Chia sẻ loại cây, diện tích, tình trạng vườn hoặc nhu cầu sử dụng.',
  },
  {
    icon: Lightbulb,
    title: 'Nhận tư vấn sản phẩm',
    text: 'Merifarm gợi ý dòng phân bón phù hợp với mục tiêu chăm sóc cây.',
  },
  {
    icon: ClipboardCheck,
    title: 'Xác nhận đơn hàng',
    text: 'Kiểm tra số lượng, quy cách, giá bán và thông tin giao hàng.',
  },
  {
    icon: PackageCheck,
    title: 'Giao hàng & hỗ trợ',
    text: 'Theo dõi quá trình sử dụng và hỗ trợ thêm khi khách hàng cần.',
  },
]

const DEALER_BENEFITS = [
  'Danh mục sản phẩm đa dạng',
  'Chính sách hợp tác rõ ràng',
  'Hỗ trợ tư vấn kỹ thuật',
  'Đồng hành phát triển thị trường',
]

const TRUST_BADGES = ['Phân bón chất lượng', 'Tư vấn tận tâm', 'Giao hàng linh hoạt']

export default function AboutPage() {
  return (
    <>
      {/* ── 1. HERO ── */}
      <section
        className="relative bg-fixed bg-cover bg-center py-16 md:py-36"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80&auto=format&fit=crop)',
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative mx-auto max-w-6xl px-4">
          <Reveal>
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-accent-light">
              VỀ MERIFARM
            </p>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Đồng hành cùng nhà nông trong từng mùa vụ
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
              Merifarm là thương hiệu phân bón thuộc{' '}
              <span className="font-semibold text-white">
                CÔNG TY TRÁCH NHIỆM HỮU HẠN PHÁT TRIỂN KỸ THUẬT TÂM PHÚC
              </span>
              , cung cấp các sản phẩm phân bón chất lượng và giải pháp dinh dưỡng phù hợp cho
              cây trồng, nông hộ, nhà vườn, đại lý và cửa hàng vật tư nông nghiệp.
            </p>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/20 pt-5">
              {TRUST_BADGES.map((b) => (
                <div key={b} className="flex items-center gap-1.5 text-sm text-white/80">
                  <CheckCircle2 size={15} className="shrink-0 text-accent-light" />
                  {b}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button as={Link} to="/san-pham" variant="accent">
                Xem sản phẩm <ArrowRight size={18} />
              </Button>
              <Link
                to="/lien-he"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white px-6 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-primary-dark active:translate-y-0"
              >
                Liên hệ tư vấn
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. BRAND STORY ── */}
      <section className="py-16">
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
      <section className="bg-soft-green py-16">
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

      {/* ── 5. PRODUCT STRENGTH — photo-top cards ── */}
      <section className="bg-soft-green py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <SectionHeading
              eyebrow="SẢN PHẨM CHỦ LỰC"
              title="Danh mục phân bón Merifarm cung cấp"
              description="Từ phân bón NPK, hữu cơ vi sinh đến phân bón lá và phân bón rễ, Merifarm mang đến nhiều lựa chọn phù hợp cho từng nhu cầu canh tác."
              center
            />
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4">
            {PRODUCTS_CAT.map((item, i) => (
              <Reveal key={item.id} delay={i * 80}>
                <Link
                  to={`/san-pham?category=${item.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-card border border-soft bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md"
                >
                  {/* Photo */}
                  <div className="relative h-28 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary-dark/35" />
                    <div className="absolute bottom-2 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/25 text-white ring-1 ring-white/30 backdrop-blur-sm transition-colors duration-300 group-hover:bg-accent group-hover:ring-accent">
                      <item.icon size={17} />
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1.5 flex-1 text-xs leading-relaxed text-secondary">{item.text}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors duration-200 group-hover:text-accent-dark">
                      Xem sản phẩm <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center" delay={200}>
            <Button as={Link} to="/san-pham" variant="accent">
              Xem tất cả sản phẩm <ArrowRight size={18} />
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ── 6. COMMITMENTS — subtle field background ── */}
      <section className="relative py-16">
        {/* Very light field background */}
        <img
          src="https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=1600&q=80&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-white/93" />

        <div className="relative mx-auto max-w-6xl px-4">
          <Reveal>
            <SectionHeading eyebrow="CAM KẾT" title="Cam kết của Merifarm" center />
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMMITMENTS.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="flex h-full items-start gap-4 rounded-card border border-soft bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-soft text-accent-dark">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-secondary">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. PROCESS — with step-connecting line ── */}
      <section className="bg-soft-green py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <SectionHeading eyebrow="QUY TRÌNH" title="Quy trình tư vấn và mua hàng" center />
          </Reveal>

          <div className="relative">
            {/* Connecting line (desktop only) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[44px] hidden h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent lg:block"
            />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, i) => (
                <Reveal key={step.title} delay={i * 80}>
                  <div className="relative z-10 h-full rounded-card border border-white/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    {/* Gold step number */}
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-sm">
                      {i + 1}
                    </div>
                    {/* Icon on soft green */}
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-soft-green text-primary">
                      <step.icon size={22} />
                    </div>
                    <h3 className="font-semibold text-ink">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-secondary">{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. DEALER PARTNERSHIP ── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="grid overflow-hidden rounded-card bg-primary-dark md:grid-cols-2">
              {/* Left: content */}
              <div className="p-8 text-white md:p-10">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent-light">
                  HỢP TÁC
                </p>
                <h2 className="text-2xl font-bold md:text-3xl">Hợp tác cùng Merifarm</h2>
                <p className="mt-4 leading-relaxed text-white/80">
                  Merifarm chào đón cửa hàng vật tư nông nghiệp, đại lý phân bón và đơn vị phân
                  phối mong muốn phát triển danh mục sản phẩm chất lượng, dễ tư vấn và phù hợp
                  với nhu cầu canh tác thực tế.
                </p>
                <ul className="mt-5 space-y-3">
                  {DEALER_BENEFITS.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-white/90">
                      <CheckCircle2 size={16} className="shrink-0 text-accent-light" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <Button as={Link} to="/lien-he" variant="accent">
                    Liên hệ hợp tác đại lý <ArrowRight size={18} />
                  </Button>
                </div>
              </div>

              {/* Right: image */}
              <div className="relative hidden min-h-[300px] md:block">
                <img
                  src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=900&q=80&auto=format&fit=crop"
                  alt="Hợp tác đại lý Merifarm"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 9. FINAL CTA — field image background ── */}
      <section className="relative py-20 text-white">
        <img
          src="https://images.unsplash.com/photo-1609412058473-c199497c3c5d?w=1600&q=80&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-primary-dark/88" />

        <div className="relative mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
              <div className="md:max-w-xl">
                <div className="mb-3 flex items-center justify-center gap-2 text-accent-light md:justify-start">
                  <Leaf size={20} />
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    Tư vấn miễn phí
                  </span>
                </div>
                <h2 className="text-2xl font-bold md:text-3xl">
                  Bạn cần tư vấn sản phẩm phù hợp cho cây trồng?
                </h2>
                <p className="mt-3 text-white/80">
                  Gửi thông tin về loại cây, tình trạng vườn hoặc nhu cầu sử dụng. Merifarm sẽ
                  hỗ trợ bạn lựa chọn sản phẩm phù hợp.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap justify-center gap-3 md:justify-start">
                <Button as={Link} to="/lien-he" variant="accent">
                  Liên hệ tư vấn <ArrowRight size={18} />
                </Button>
                <Button
                  as={Link}
                  to="/san-pham"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary-dark"
                >
                  Xem sản phẩm
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
