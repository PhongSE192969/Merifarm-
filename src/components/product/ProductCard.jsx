import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import Badge from '../ui/Badge'
import { formatPrice } from '../../utils/format'
import { useCartStore } from '../../store/cartStore'

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem)
  const [bounce, setBounce] = useState(false)

  const handleAdd = () => {
    addItem(product, 1)
    setBounce(true)
  }

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-card bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <Link to={`/san-pham/${product.slug}`} className="relative block aspect-square overflow-hidden bg-soft-green">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.tags?.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-col gap-1">
            {product.tags.map((tag) => (
              <Badge key={tag} tag={tag} />
            ))}
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full bg-white px-4 py-1 text-sm font-semibold">Hết hàng</span>
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-faint">{product.packageUnit}</p>
        <Link to={`/san-pham/${product.slug}`}>
          <h3 className="font-semibold leading-snug text-ink hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-secondary line-clamp-2">{product.shortDescription}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
          <button
            type="button"
            title="Thêm vào giỏ"
            disabled={!product.inStock}
            onClick={handleAdd}
            onAnimationEnd={() => setBounce(false)}
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-gray-300 ${
              bounce ? 'animate-cart-bounce' : ''
            }`}
            aria-label="Thêm vào giỏ hàng"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
