import { useState } from 'react'
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom'
import {
  Minus, Plus, ShoppingCart, Wallet, ChevronRight, ChevronLeft, ChevronDown,
  Leaf, Sun, Sprout, Shield, Zap, Droplets, AlertCircle,
  FlaskConical, MapPin, Package, TestTube2, Thermometer, Phone, MessageSquare,
  CheckCircle2, Info,
} from 'lucide-react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import ProductCard from '../components/product/ProductCard'
import PriceTag from '../components/product/PriceTag'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import categories from '../data/categories.json'
import allProducts from '../data/products.json'
import productDetails, { CROP_LABELS, FORM_LABELS, CATEGORY_LABELS } from '../data/productDetails'
import { useCartStore } from '../store/cartStore'

const ICON_MAP = { Leaf, Sun, Sprout, Shield, Zap, Droplets, AlertCircle }

const TABS = [
  { id: 'tong-quan', label: 'Tổng quan' },
  { id: 'thanh-phan', label: 'Thành phần' },
  { id: 'cong-dung', label: 'Công dụng' },
  { id: 'cay-phu-hop', label: 'Cây phù hợp' },
  { id: 'cach-su-dung', label: 'Cách sử dụng' },
  { id: 'bao-quan', label: 'Bảo quản' },
  { id: 'luu-y', label: 'Lưu ý' },
]

const QUICK_INFO_DEFS = [
  { key: 'thanhPhan', label: 'Thành phần chính', Icon: FlaskConical },
  { key: 'xuatXu', label: 'Xuất xứ', Icon: MapPin },
  { key: 'quyCach', label: 'Quy cách', Icon: Package },
  { key: 'dang', label: 'Dạng sản phẩm', Icon: TestTube2 },
  { key: 'congDung', label: 'Công dụng chính', Icon: Zap },
  { key: 'baoQuan', label: 'Bảo quản', Icon: Thermometer },
]

function DynamicIcon({ name, ...props }) {
  const Comp = ICON_MAP[name] || Leaf
  return <Comp {...props} />
}

function TabContent({ tabId, product, detail }) {
  const crops = product.cropTypes || []

  if (tabId === 'tong-quan') {
    return (
      <div className="prose prose-sm max-w-none text-secondary">
        {(detail.overview || product.shortDescription).split('\n\n').map((p, i) => (
          <p key={i} className="mb-4 leading-relaxed last:mb-0">{p}</p>
        ))}
      </div>
    )
  }

  if (tabId === 'thanh-phan') {
    return (
      <div>
        {detail.ingredientItems?.length ? (
          <div className="overflow-hidden rounded-xl border border-soft">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-soft bg-white">
                  <th className="py-3 pl-4 pr-2 text-left font-semibold text-primary-dark">Thành phần</th>
                  <th className="py-3 pl-2 pr-4 text-right font-semibold text-primary-dark">Hàm lượng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soft">
                {detail.ingredientItems.map((item, i) => (
                  <tr key={i}>
                    <td className="py-2.5 pl-4 pr-2 text-ink">{item.label}</td>
                    <td className="py-2.5 pl-2 pr-4 text-right font-semibold text-primary-dark">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-faint">Thành phần đang được cập nhật theo thông tin trên bao bì sản phẩm.</p>
        )}
        {detail.ingredientNote && (
          <p className="mt-3 text-xs text-faint">{detail.ingredientNote}</p>
        )}
      </div>
    )
  }

  if (tabId === 'cong-dung') {
    return (
      <ul className="space-y-2.5">
        {(detail.benefitItems || [product.shortDescription]).map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-primary" />
            <span className="text-sm leading-relaxed text-secondary">{item}</span>
          </li>
        ))}
      </ul>
    )
  }

  if (tabId === 'cay-phu-hop') {
    return (
      <div>
        <div className="flex flex-wrap gap-2">
          {crops.map((c) => (
            <span
              key={c}
              className="rounded-full border border-primary/40 bg-white px-4 py-1.5 text-sm font-semibold text-primary-dark"
            >
              {CROP_LABELS[c] || c}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-secondary">
          Có thể sử dụng cho nhiều loại cây trồng khác nhau tùy theo tình trạng đất, giai đoạn sinh
          trưởng và hướng dẫn sử dụng thực tế. Liên hệ Merifarm để được tư vấn loại cây cụ thể.
        </p>
      </div>
    )
  }

  if (tabId === 'cach-su-dung') {
    return (
      <div className="space-y-5">
        <ol className="space-y-3">
          {(detail.usageSteps || []).map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary bg-white text-xs font-bold text-primary">
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed text-secondary pt-0.5">{step}</span>
            </li>
          ))}
        </ol>

        {detail.dosageTable?.length ? (
          <div>
            <h4 className="mb-2 text-sm font-semibold text-ink">Bảng liều lượng tham khảo</h4>
            <div className="overflow-hidden rounded-xl border border-soft">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-soft bg-white">
                    <th className="py-2.5 pl-4 pr-2 text-left font-semibold text-accent-dark">Loại cây / Giai đoạn</th>
                    <th className="py-2.5 pl-2 pr-4 text-left font-semibold text-accent-dark">Liều lượng</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-soft">
                  {detail.dosageTable.map((row, i) => (
                    <tr key={i}>
                      <td className="py-2.5 pl-4 pr-2 text-ink">{row.crop}</td>
                      <td className="py-2.5 pl-2 pr-4 text-secondary">{row.dosage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-faint">
              Vui lòng sử dụng theo đúng hướng dẫn trên bao bì sản phẩm.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-accent-dark/30 bg-white p-4">
            <p className="text-sm text-secondary">
              Liều lượng sử dụng vui lòng tham khảo trực tiếp trên bao bì sản phẩm hoặc liên hệ
              Merifarm để được tư vấn theo loại cây trồng, diện tích và tình trạng đất thực tế.
            </p>
          </div>
        )}
      </div>
    )
  }

  if (tabId === 'bao-quan') {
    return (
      <ul className="space-y-2.5">
        {(detail.storageItems || []).map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-accent" />
            <span className="text-sm leading-relaxed text-secondary">{item}</span>
          </li>
        ))}
      </ul>
    )
  }

  if (tabId === 'luu-y') {
    return (
      <div className="space-y-3">
        <div className="flex gap-3 rounded-xl border border-accent-dark/30 bg-white p-4">
          <Info size={18} className="mt-0.5 shrink-0 text-accent-dark" />
          <div className="space-y-2 text-sm leading-relaxed text-secondary">
            {(detail.warningNote || '').split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <p className="text-xs text-faint">
          Để được tư vấn sử dụng phù hợp với loại cây và điều kiện canh tác thực tế, vui lòng liên
          hệ đội ngũ kỹ thuật Merifarm.
        </p>
      </div>
    )
  }

  return null
}

export default function ProductDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [activeTab, setActiveTab] = useState('tong-quan')
  const [openAccordions, setOpenAccordions] = useState(() => new Set(['tong-quan']))

  const product = allProducts.find((p) => p.slug === slug)
  if (!product) return <Navigate to="/san-pham" replace />

  const detail = productDetails[slug] || {}
  const images = product.images?.length ? product.images : [product.image]
  const category = categories.find((c) => c.id === product.category)
  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const prev = () => setActiveImg((i) => (i - 1 + images.length) % images.length)
  const next = () => setActiveImg((i) => (i + 1) % images.length)

  const handleAddToCart = () => {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBuyNow = () => {
    addItem(product, qty)
    navigate('/gio-hang')
  }

  const toggleAccordion = (id) => {
    setOpenAccordions((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const qiValues = {
    thanhPhan: detail.quickInfo?.thanhPhan || product.ingredients?.split(';')[0] || 'Đang cập nhật',
    xuatXu: detail.quickInfo?.xuatXu || detail.specification?.xuatXu || 'Đang cập nhật',
    quyCach: product.packageUnit || 'Đang cập nhật',
    dang: detail.quickInfo?.dang || FORM_LABELS[product.form] || 'Đang cập nhật',
    congDung: detail.quickInfo?.congDung || 'Đang cập nhật',
    baoQuan: detail.quickInfo?.baoQuan || 'Nơi khô ráo, thoáng mát',
  }

  const consultUrl = `/lien-he?product=${encodeURIComponent(product.name)}`

  return (
    <div className="bg-white pb-24 md:pb-0">
      {/* ── Breadcrumb ── */}
      <div className="mx-auto max-w-6xl px-4 pt-6 pb-2">
        <div className="flex items-center gap-1 text-sm text-faint">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <ChevronRight size={14} />
          <Link to="/san-pham" className="hover:text-primary transition-colors">Sản phẩm</Link>
          <ChevronRight size={14} />
          <span className="text-ink">{product.name}</span>
        </div>
      </div>

      {/* ── Hero: 2-column ── */}
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">

          {/* Left — Image Gallery */}
          <div>
            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm">
              <img
                key={activeImg}
                src={images[activeImg]}
                alt={`${product.name} – ảnh ${activeImg + 1}`}
                className="aspect-square w-full object-cover transition-all duration-500 group-hover:scale-105"
              />
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Ảnh trước"
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary-dark shadow-sm opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-white hover:-translate-x-0.5"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Ảnh tiếp"
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary-dark shadow-sm opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-white hover:translate-x-0.5"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <div className="absolute bottom-3 right-3 rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white">
                    {activeImg + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    aria-label={`Xem ảnh ${i + 1}`}
                    className={`shrink-0 h-16 w-16 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                      i === activeImg
                        ? 'border-primary shadow-sm scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100 hover:border-soft'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — Sticky Purchase Sidebar */}
          <div className="sticky top-24 self-start space-y-5">
            {/* Category + Title + Badges */}
            <div>
              {category && (
                <Link
                  to={`/san-pham?category=${category.id}`}
                  className="mb-2 inline-block rounded-full border border-primary/40 bg-white px-3 py-0.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  {category.name}
                </Link>
              )}
              <h1 className="text-2xl font-extrabold leading-tight text-ink md:text-3xl">
                {product.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {product.tags?.map((tag) => <Badge key={tag} tag={tag} />)}
                <span className="rounded-full border border-soft bg-white px-3 py-0.5 text-xs font-medium text-secondary">
                  {product.packageUnit}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-3">
              <PriceTag
                price={product.price}
                originalPrice={product.originalPrice}
                className="text-3xl font-extrabold"
                color="text-primary-dark"
              />
              <span className="text-sm text-faint">/ {product.packageUnit}</span>
            </div>

            {/* Short description */}
            <p className="text-sm leading-relaxed text-secondary border-l-2 border-primary/30 pl-3">
              {product.shortDescription}
            </p>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {QUICK_INFO_DEFS.map(({ key, label, Icon }) => (
                <div
                  key={key}
                  className="group rounded-xl border border-soft bg-white p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
                >
                  <div className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-lg border border-soft transition-colors group-hover:bg-primary/10">
                    <Icon size={14} className="text-primary" />
                  </div>
                  <p className="text-[10px] uppercase tracking-wide text-faint">{label}</p>
                  <p className="mt-0.5 text-xs font-semibold leading-snug text-ink">{qiValues[key]}</p>
                </div>
              ))}
            </div>

            {/* Separator */}
            <div className="border-t border-soft" />

            {/* Qty + Cart */}
            {product.inStock ? (
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-full border border-soft bg-white">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="flex h-10 w-10 items-center justify-center rounded-full text-primary-dark hover:bg-soft-green transition-colors"
                      aria-label="Giảm số lượng"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center font-bold text-ink">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty((q) => q + 1)}
                      className="flex h-10 w-10 items-center justify-center rounded-full text-primary-dark hover:bg-soft-green transition-colors"
                      aria-label="Tăng số lượng"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="flex flex-1 gap-2">
                    <Button
                      onClick={handleAddToCart}
                      variant={added ? 'solidPrimary' : 'solidAccent'}
                      className="flex-1 transition-all duration-300"
                    >
                      <ShoppingCart size={18} />
                      {added ? 'Đã thêm!' : 'Thêm vào giỏ'}
                    </Button>
                    <Button
                      onClick={handleBuyNow}
                      variant="solidPrimary"
                      className="flex-1"
                    >
                      <Wallet size={18} />
                      Mua ngay
                    </Button>
                  </div>
                </div>

                <Link
                  to={consultUrl}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-primary/40 bg-white py-2.5 text-sm font-semibold text-primary transition-all duration-200 hover:border-primary hover:bg-soft-green"
                >
                  <MessageSquare size={15} />
                  Tư vấn sản phẩm này
                </Link>
              </div>
            ) : (
              <p className="inline-block rounded-full bg-gray-100 px-5 py-2 text-sm font-semibold text-gray-500">
                Sản phẩm tạm hết hàng
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Tabs (desktop) / Accordion (mobile) ── */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Reveal>
          {/* Desktop Tabs */}
          <div className="hidden md:block">
            <div className="flex gap-1 border-b border-soft overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 rounded-t-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'border-b-2 border-primary bg-white text-primary'
                      : 'text-secondary hover:text-primary hover:bg-white/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="rounded-b-2xl rounded-tr-2xl bg-white p-6 shadow-sm">
              <TabContent tabId={activeTab} product={product} detail={detail} />
            </div>
          </div>

          {/* Mobile Accordion */}
          <div className="space-y-2 md:hidden">
            {TABS.map((tab) => {
              const isOpen = openAccordions.has(tab.id)
              return (
                <div key={tab.id} className="overflow-hidden rounded-xl border border-soft bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => toggleAccordion(tab.id)}
                    className="flex w-full items-center justify-between px-4 py-3.5 text-left"
                  >
                    <span className={`text-sm font-semibold ${isOpen ? 'text-primary' : 'text-ink'}`}>
                      {tab.label}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`shrink-0 text-faint transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`}
                    />
                  </button>
                  <div
                    style={{ maxHeight: isOpen ? '800px' : '0' }}
                    className="overflow-hidden transition-all duration-300"
                  >
                    <div className="border-t border-soft/60 px-4 py-4">
                      <TabContent tabId={tab.id} product={product} detail={detail} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>

      {/* ── Benefits Section ── */}
      {detail.benefits?.length > 0 && (
        <div className="bg-white py-14">
          <div className="mx-auto max-w-6xl px-4">
            <Reveal>
              <SectionHeading eyebrow="NỔI BẬT" title="Lợi ích của sản phẩm" />
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {detail.benefits.map((b, i) => (
                  <Reveal key={i} delay={i * 80}>
                    <div className="group flex flex-col rounded-2xl border border-soft bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-soft transition-colors group-hover:bg-primary/10">
                        <DynamicIcon name={b.icon} size={22} className="text-primary" />
                      </div>
                      <h3 className="mb-1.5 font-bold text-ink">{b.title}</h3>
                      <p className="text-sm leading-relaxed text-secondary">{b.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      )}

      {/* ── Suitable When Section ── */}
      {detail.suitableWhen?.length > 0 && (
        <div className="mx-auto max-w-6xl px-4 py-14">
          <Reveal>
            <SectionHeading eyebrow="GỢI Ý" title="Sản phẩm phù hợp khi cây có dấu hiệu" />
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {detail.suitableWhen.map((w, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="group flex flex-col gap-2 rounded-xl border border-soft bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-soft group-hover:bg-primary/10 transition-colors">
                      <DynamicIcon name={w.icon} size={17} className="text-primary" />
                    </div>
                    <h4 className="text-sm font-bold text-ink">{w.title}</h4>
                    <p className="text-xs leading-relaxed text-secondary">{w.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      )}

      {/* ── Product Specification ── */}
      <div className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <SectionHeading eyebrow="CHI TIẾT" title="Thông tin sản phẩm" />
            <div className="mt-6 overflow-hidden rounded-2xl border border-soft">
              {[
                ['Thương hiệu', 'Merifarm'],
                ['Tên sản phẩm', product.name],
                ['Nhóm sản phẩm', detail.specification?.nhomSanPham || CATEGORY_LABELS[product.category] || category?.name || 'Đang cập nhật'],
                ['Quy cách', detail.specification?.quyCach || product.packageUnit || 'Đang cập nhật'],
                ['Dạng sản phẩm', detail.specification?.dangSanPham || FORM_LABELS[product.form] || 'Đang cập nhật'],
                ['Xuất xứ', detail.specification?.xuatXu || 'Đang cập nhật'],
                ['Đơn vị phân phối', 'CÔNG TY TNHH CÔNG NGHỆ DVP-DEDITECH'],
              ].map(([label, value], i) => (
                <div
                  key={label}
                  className={`flex items-start gap-4 px-5 py-3 text-sm bg-white ${
                    i > 0 ? 'border-t border-soft' : ''
                  }`}
                >
                  <span className="w-44 shrink-0 font-semibold text-ink">{label}</span>
                  <span className="text-secondary">{value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Consultation CTA ── */}
      <div className="border-t border-soft bg-white py-14">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Reveal>
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-accent-dark">
              TƯ VẤN MIỄN PHÍ
            </p>
            <h2 className="text-2xl font-extrabold text-primary-dark md:text-3xl">
              Bạn chưa chắc sản phẩm này phù hợp<br className="hidden sm:block" /> với cây trồng của mình?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-secondary">
              Gửi thông tin loại cây, tình trạng đất hoặc hình ảnh vườn. Đội ngũ kỹ thuật
              Merifarm sẽ hỗ trợ tư vấn sản phẩm và cách sử dụng phù hợp nhất.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <Button as={Link} to={consultUrl} variant="accent">
                <MessageSquare size={17} />
                Tư vấn sản phẩm này
              </Button>
              <a
                href="tel:0981798065"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-white"
              >
                <Phone size={17} />
                Gọi 0981 798 065
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Related Products ── */}
      {related.length > 0 && (
        <div className="mx-auto max-w-6xl px-4 py-14">
          <Reveal>
            <SectionHeading eyebrow="GỢI Ý" title="Sản phẩm liên quan" />
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Reveal>
        </div>
      )}

      {/* ── Mobile Sticky Cart Bar ── */}
      {product.inStock && (
        <div className="fixed inset-x-0 bottom-0 z-50 border-t border-soft bg-white px-4 py-3 shadow-lg md:hidden">
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <p className="text-[10px] uppercase tracking-wide text-faint">Đơn giá</p>
              <PriceTag
                price={product.price}
                originalPrice={product.originalPrice}
                className="text-lg font-extrabold"
                color="text-primary-dark"
              />
            </div>
            <div className="flex shrink-0 items-center rounded-full border border-soft">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-8 w-8 items-center justify-center text-primary-dark"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm font-bold">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="flex h-8 w-8 items-center justify-center text-primary-dark"
              >
                <Plus size={14} />
              </button>
            </div>
            <Button onClick={handleAddToCart} variant={added ? 'solidPrimary' : 'solidAccent'} className="flex-1 py-2.5 text-sm">
              <ShoppingCart size={16} />
              {added ? 'Đã thêm!' : 'Thêm vào giỏ'}
            </Button>
            <Button onClick={handleBuyNow} variant="solidPrimary" className="flex-1 py-2.5 text-sm">
              <Wallet size={16} />
              Mua ngay
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
