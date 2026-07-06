import { Link } from 'react-router-dom'
import {
  Leaf,
  Truck,
  Headset,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  Sprout,
  Flower2,
  FlaskConical,
  Citrus,
  Shovel,
  Wheat,
  Carrot,
  Apple,
  ClipboardList,
  Lightbulb,
  ClipboardCheck,
  PackageCheck,
  Handshake,
} from 'lucide-react'
import Button from '../components/ui/Button'
import SectionHeading from '../components/ui/SectionHeading'
import ProductCard from '../components/product/ProductCard'
import Reveal from '../components/ui/Reveal'
import categories from '../data/categories.json'
import products from '../data/products.json'

const CATEGORY_VISUALS = {
  npk: {
    icon: FlaskConical,
    image: 'https://images.unsplash.com/photo-1757670919588-1fe3b3df3dfa?w=600&q=80&auto=format&fit=crop',
  },
  'huu-co': {
    icon: Sprout,
    image: 'https://images.unsplash.com/photo-1492496913980-501348b61469?w=600&q=80&auto=format&fit=crop',
  },
  'phan-bon-la': {
    icon: Flower2,
    image: 'https://images.unsplash.com/photo-1589876568181-a1508b8ef473?w=600&q=80&auto=format&fit=crop',
  },
  'phan-bon-re': {
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1621256257758-276a90549f80?w=600&q=80&auto=format&fit=crop',
  },
  'trun-que': {
    icon: HeartHandshake,
    image: 'https://images.unsplash.com/photo-1708191225887-0642eb28f6ac?w=600&q=80&auto=format&fit=crop',
  },
}

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

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Chất lượng đảm bảo',
    description: 'Sản phẩm được chọn lọc kỹ, thông tin rõ ràng, phù hợp cho nhu cầu canh tác thực tế.',
  },
  {
    icon: Headset,
    title: 'Tư vấn đúng nhu cầu',
    description: 'Hỗ trợ lựa chọn phân bón theo loại cây, tình trạng đất và giai đoạn sinh trưởng.',
  },
  {
    icon: Truck,
    title: 'Giao hàng tận nơi',
    description: 'Phục vụ nông hộ, cửa hàng vật tư và đại lý phân phối trên nhiều khu vực.',
  },
  {
    icon: HeartHandshake,
    title: 'Đồng hành sau mua',
    description: 'Hỗ trợ hướng dẫn sử dụng và tư vấn thêm trong quá trình chăm sóc cây trồng.',
  },
]

const STEPS = [
  {
    icon: ClipboardList,
    title: 'Gửi thông tin cây trồng',
    description: 'Chia sẻ loại cây, diện tích, tình trạng vườn hoặc hình ảnh cây cần tư vấn.',
  },
  {
    icon: Lightbulb,
    title: 'Nhận gợi ý sản phẩm',
    description: 'Merifarm đề xuất dòng phân phù hợp với nhu cầu sử dụng.',
  },
  {
    icon: ClipboardCheck,
    title: 'Xác nhận đơn hàng',
    description: 'Kiểm tra quy cách, số lượng, giá bán và thông tin giao hàng.',
  },
  {
    icon: PackageCheck,
    title: 'Giao hàng & hỗ trợ',
    description: 'Theo dõi quá trình sử dụng và hỗ trợ thêm khi cần.',
  },
]

export default function HomePage() {
  const featured = products.filter((p) => p.tags?.includes('ban-chay')).slice(0, 6)

  return (
    <>
      <section
        className="relative isolate text-white bg-fixed bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=1600&auto=format&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary-dark/75 to-primary-dark/40" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-32">
          <div className="max-w-xl">
            <p className="mb-3 inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-semibold backdrop-blur-sm">
              Đồng hành cùng nhà nông
            </p>
            <h1 className="text-4xl font-extrabold leading-tight drop-shadow-md md:text-5xl">
              Phân bón chất lượng cho mùa vụ bội thu
            </h1>
            <p className="mt-4 text-white/90 drop-shadow-sm md:text-lg">
              Cung cấp đa dạng phân bón NPK, hữu cơ vi sinh, phân bón lá, phân bón rễ và giải pháp
              dinh dưỡng phù hợp cho từng loại cây trồng.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button as={Link} to="/san-pham" variant="accent">
                Xem sản phẩm <ArrowRight size={18} />
              </Button>
              <Button
                as={Link}
                to="/lien-he"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary-dark"
              >
                Liên hệ tư vấn
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative py-16 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=1600&q=80&auto=format&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-primary-dark/82" />
        <div className="relative mx-auto max-w-6xl px-4">
          <Reveal>
            <SectionHeading eyebrow="Tư vấn nhanh" title="Chọn phân bón theo nhu cầu cây trồng" center dark />
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4">
            {NEEDS.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <Link
                  to={`/san-pham?need=${item.need}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/35 to-black/10" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-white/30 backdrop-blur-sm">
                      <item.icon size={17} />
                    </div>
                    <h3 className="font-bold leading-snug text-white">{item.title}</h3>
                    <p className="mt-1 text-xs text-white/80">{item.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center" delay={200}>
            <Button as={Link} to="/lien-he" variant="accent">
              Nhận tư vấn sản phẩm phù hợp <ArrowRight size={18} />
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Danh mục"
            title="Nhóm sản phẩm phân bón"
            description="Lựa chọn sản phẩm phù hợp theo nhu cầu chăm sóc cây trồng, cải tạo đất và nâng cao năng suất mùa vụ."
            center
          />
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4">
          {categories.map((cat, i) => {
            const visual = CATEGORY_VISUALS[cat.id]
            const IconComp = visual?.icon
            return (
              <Reveal key={cat.id} delay={i * 80}>
                <Link
                  to={`/san-pham?category=${cat.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-card border border-soft bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md"
                >
                  {/* Photo strip */}
                  <div className="relative h-28 overflow-hidden">
                    <img
                      src={visual?.image}
                      alt={cat.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary-dark/35" />
                    <div className="absolute bottom-2 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/25 text-white ring-1 ring-white/30 backdrop-blur-sm transition-colors duration-300 group-hover:bg-accent group-hover:ring-accent">
                      {IconComp && <IconComp size={17} />}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-semibold text-ink">{cat.name}</h3>
                    <p className="mt-1.5 flex-1 text-xs leading-relaxed text-secondary">{cat.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors duration-200 group-hover:text-accent-dark">
                      Xem sản phẩm <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section
        className="relative py-16 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=1600&q=80&auto=format&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-primary-dark/80" />
        <div className="relative mx-auto max-w-6xl px-4">
          <Reveal>
            <SectionHeading
              eyebrow="Bán chạy"
              title="Sản phẩm được nhà nông tin dùng"
              description="Những dòng phân bón được lựa chọn nhiều cho canh tác lúa, rau màu, cây ăn trái và hoa kiểng."
              center
              dark
            />
          </Reveal>
          <div className="flex gap-4 overflow-x-auto pb-3 -mb-3 scroll-smooth [&::-webkit-scrollbar]:hidden">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 60} className="w-52 shrink-0 flex flex-col">
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center" delay={200}>
            <Button as={Link} to="/san-pham" variant="outline-white">
              Xem tất cả sản phẩm <ArrowRight size={18} />
            </Button>
          </Reveal>
        </div>
      </section>

      <section
        className="relative py-16 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=1600&q=80&auto=format&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-primary-dark/80" />
        <div className="relative mx-auto max-w-6xl px-4">
          <Reveal>
            <SectionHeading eyebrow="Theo cây trồng" title="Giải pháp phân bón theo từng nhóm cây" center dark />
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
            {CROP_SOLUTIONS.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <Link
                  to={`/san-pham?crop=${item.crop}`}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <item.icon size={20} />
                    </div>
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-white/80 line-clamp-2">{item.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative py-16 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=1600&q=80&auto=format&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-primary-dark/80" />
        <div className="relative mx-auto max-w-6xl px-4">
          <Reveal>
            <SectionHeading eyebrow="Cam kết" title="Vì sao chọn Merifarm?" center dark />
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="h-full rounded-card bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft text-accent-dark">
                    <f.icon size={22} />
                  </div>
                  <h3 className="font-semibold text-ink">{f.title}</h3>
                  <p className="mt-2 text-sm text-secondary">{f.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative py-16 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=1600&q=80&auto=format&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-primary-dark/82" />
        <div className="relative mx-auto max-w-6xl px-4">
          <Reveal>
            <SectionHeading eyebrow="Quy trình" title="Quy trình tư vấn & mua hàng" center dark />
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 80}>
                <div className="relative h-full rounded-card border border-white/60 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-soft-green text-primary shadow-sm">
                    <step.icon size={22} />
                  </div>
                  <h3 className="font-semibold text-ink">{step.title}</h3>
                  <p className="mt-1 text-sm text-secondary">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <Reveal>
          <div className="flex flex-col items-center gap-6 rounded-card bg-primary px-6 py-12 text-center text-white md:flex-row md:justify-between md:text-left">
            <div className="md:max-w-xl">
              <div className="mb-3 flex items-center justify-center gap-2 text-accent md:justify-start">
                <Handshake size={22} />
                <span className="text-sm font-semibold uppercase tracking-wide">Hợp tác đại lý</span>
              </div>
              <h2 className="text-2xl font-bold md:text-3xl">Hợp tác đại lý phân phối</h2>
              <p className="mt-3 text-white/85">
                Merifarm đồng hành cùng cửa hàng vật tư nông nghiệp, đại lý phân bón và đơn vị phân
                phối trên toàn quốc với danh mục sản phẩm ổn định, chính sách giá rõ ràng và hỗ trợ
                tư vấn kỹ thuật.
              </p>
            </div>
            <Button as={Link} to="/lien-he" variant="accent" className="shrink-0">
              Đăng ký làm đại lý <ArrowRight size={18} />
            </Button>
          </div>
        </Reveal>
      </section>

      <section
        className="relative py-14 text-white bg-fixed bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=1600&q=80&auto=format&fit=crop)' }}
      >
        <div className="absolute inset-0 bg-primary-dark/88" />
        <Reveal className="relative mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Cần tư vấn loại phân bón phù hợp?</h2>
          <p className="max-w-xl text-white/85">
            Gửi thông tin cây trồng, tình trạng vườn hoặc nhu cầu sử dụng. Đội ngũ Merifarm sẽ hỗ
            trợ bạn lựa chọn sản phẩm phù hợp.
          </p>
          <Button as={Link} to="/lien-he" variant="accent">
            Liên hệ ngay <ArrowRight size={18} />
          </Button>
        </Reveal>
      </section>
    </>
  )
}
