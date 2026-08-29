import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Leaf, ShoppingCart } from 'lucide-react'
import products from '../../data/products.json'
import { useCartStore } from '../../store/cartStore'
import { formatPrice } from '../../utils/format'

export default function FeaturedProductsSection() {
  const featured = products.filter((product) => product.tags?.includes('ban-chay'))
  const [activeIndex, setActiveIndex] = useState(1)
  const addItem = useCartStore((state) => state.addItem)
  const navigate = useNavigate()

  const handleAdd = (product) => {
    addItem(product, 1)
    navigate('/gio-hang')
  }

  useEffect(() => {
    if (featured.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % featured.length)
    }, 2500)

    return () => window.clearInterval(intervalId)
  }, [featured.length])

  if (!featured.length) return null

  const primaryProduct = featured[activeIndex % featured.length]
  const secondaryProducts = Array.from({ length: Math.min(4, featured.length - 1) }, (_, index) => (
    featured[(activeIndex + index + 1) % featured.length]
  ))

  const move = (direction) => {
    setActiveIndex((current) => (current + direction + featured.length) % featured.length)
  }

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-16">
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-widest text-primary">
            <span className="h-px w-10 bg-primary/35" />
            <span>Sản phẩm được ưa chuộng</span>
            <Leaf size={17} />
            <span className="h-px w-10 bg-primary/35" />
          </div>
          <h2 className="mt-3 text-4xl font-extrabold text-primary-dark md:text-5xl">
            Sản phẩm nổi bật
          </h2>
          <p className="mt-3 text-base text-secondary md:text-lg">
            Giải pháp dinh dưỡng được lựa chọn cho từng giai đoạn cây trồng
          </p>
        </div>

        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Xem nhóm sản phẩm trước"
          className="absolute left-3 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-primary/20 bg-white text-primary shadow-sm transition-all hover:border-primary hover:bg-soft-green lg:flex"
        >
          <ArrowLeft size={22} />
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Xem nhóm sản phẩm tiếp theo"
          className="absolute right-3 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-primary/20 bg-white text-primary shadow-sm transition-all hover:border-primary hover:bg-soft-green lg:flex"
        >
          <ArrowRight size={22} />
        </button>

        <div key={activeIndex} className="grid gap-5 lg:grid-cols-[1.08fr_1fr]">
          <article className="animate-featured-promote flex min-h-[520px] flex-col overflow-hidden rounded-[22px] border border-primary/20 bg-gradient-to-br from-white via-soft-green/35 to-gold-soft/35 p-6 md:p-8">
            <Link
              to={`/san-pham/${primaryProduct.slug}`}
              className="flex min-h-0 flex-1 items-center justify-center"
            >
              <img
                key={primaryProduct.id}
                src={primaryProduct.image}
                alt={primaryProduct.name}
                className="h-72 w-full object-contain transition-transform duration-500 hover:scale-105 md:h-80"
              />
            </Link>

            <div className="mt-5 border-t border-primary/10 pt-5">
              <p className="text-xs font-bold uppercase tracking-wide text-faint">
                {primaryProduct.packageUnit}
              </p>
              <Link to={`/san-pham/${primaryProduct.slug}`}>
                <h3 className="mt-2 text-2xl font-extrabold text-ink transition-colors hover:text-primary md:text-3xl">
                  {primaryProduct.name}
                </h3>
              </Link>
              <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-secondary md:text-base">
                <Leaf size={17} className="mt-0.5 shrink-0 text-primary" />
                <span>{primaryProduct.shortDescription}</span>
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <span className="text-3xl font-extrabold text-primary">
                  {formatPrice(primaryProduct.price)}
                </span>
                <div className="flex items-center gap-3">
                  <Link
                    to={`/san-pham/${primaryProduct.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
                  >
                    Xem chi tiết <ArrowRight size={17} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleAdd(primaryProduct)}
                    aria-label={`Thêm ${primaryProduct.name} vào giỏ`}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-primary bg-white text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    <ShoppingCart size={21} />
                  </button>
                </div>
              </div>
            </div>
          </article>

          <div className="animate-featured-secondary-refresh grid grid-cols-2 gap-4">
            {secondaryProducts.map((product) => (
              <article
                key={product.id}
                className="flex min-h-[250px] flex-col overflow-hidden rounded-[18px] border border-primary/15 bg-white transition-colors hover:border-primary/35"
              >
                <Link
                  to={`/san-pham/${product.slug}`}
                  className="flex min-h-0 flex-1 items-center justify-center bg-gradient-to-b from-white to-soft-green/20 p-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-28 w-full object-contain transition-transform duration-300 hover:scale-105 md:h-32"
                  />
                </Link>
                <div className="border-t border-primary/10 bg-white p-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-faint">
                    {product.packageUnit}
                  </p>
                  <Link to={`/san-pham/${product.slug}`}>
                    <h3 className="mt-1 line-clamp-1 font-bold text-ink hover:text-primary">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="text-xl font-extrabold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAdd(product)}
                      aria-label={`Thêm ${product.name} vào giỏ`}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/70 bg-white text-primary transition-colors hover:bg-primary hover:text-white"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/san-pham"
            className="inline-flex items-center gap-3 rounded-xl border border-primary px-8 py-3 font-bold text-primary transition-all hover:bg-primary hover:text-white"
          >
            Xem tất cả sản phẩm <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
