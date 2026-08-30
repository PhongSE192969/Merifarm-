import { formatPrice } from '../../utils/format'

export default function PriceTag({ price, originalPrice, className = 'text-lg font-bold', color = 'text-primary' }) {
  const hasDiscount = typeof originalPrice === 'number' && typeof price === 'number' && originalPrice > price

  if (!hasDiscount) {
    return <span className={`${className} ${color}`}>{formatPrice(price)}</span>
  }

  const percent = Math.round((1 - price / originalPrice) * 100)

  return (
    <span className="inline-flex flex-col items-start gap-1">
      <span className="w-fit rounded-full bg-red-50 px-1.5 py-0.5 text-[11px] font-bold text-red-600 ring-1 ring-red-200">
        -{percent}%
      </span>
      <span className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className={`${className} text-red-600`}>{formatPrice(price)}</span>
        <span className="text-sm font-medium text-red-400 line-through">{formatPrice(originalPrice)}</span>
      </span>
    </span>
  )
}
