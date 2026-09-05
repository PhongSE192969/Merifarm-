import { Link } from 'react-router-dom'
import PriceTag from './PriceTag'

export default function ProductCard({ product }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-card border border-primary/15 bg-soft-green/35 backdrop-blur-xl transition-all duration-300 before:pointer-events-none before:absolute before:inset-x-4 before:top-0 before:z-20 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent hover:-translate-y-1 hover:border-primary/25 hover:bg-soft-green/45">
      <Link to={`/san-pham/${product.slug}`} className="relative block aspect-square overflow-hidden bg-white p-4">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full bg-white px-4 py-1 text-sm font-semibold">Hết hàng</span>
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 border-t border-primary/15 bg-gradient-to-br from-soft-green/65 via-soft-green/45 to-white/55 p-4 backdrop-blur-xl">
        <p className="text-xs font-medium uppercase tracking-wide text-faint">{product.packageUnit}</p>
        <Link to={`/san-pham/${product.slug}`}>
          <h3 className="font-semibold leading-snug text-ink hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-secondary line-clamp-2">{product.shortDescription}</p>
        <div className="mt-auto pt-2">
          <PriceTag size="sm" />
        </div>
      </div>
    </div>
  )
}
