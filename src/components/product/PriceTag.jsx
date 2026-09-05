import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'

const SIZES = {
  sm: { pad: 'px-3 py-1', text: 'text-xs', icon: 12 },
  md: { pad: 'px-4 py-1.5', text: 'text-sm', icon: 14 },
  lg: { pad: 'px-5 py-2', text: 'text-base', icon: 16 },
}

// Giá sản phẩm không còn hiển thị công khai trên web — thay bằng nút "Liên hệ"
// dẫn đến trang liên hệ để khách được báo giá trực tiếp.
export default function PriceTag({ size = 'md' }) {
  const s = SIZES[size] || SIZES.md
  return (
    <Link
      to="/lien-he"
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border-2 border-primary bg-primary font-bold text-white transition-colors hover:bg-primary-dark hover:border-primary-dark ${s.pad} ${s.text}`}
    >
      <Phone size={s.icon} />
      Liên hệ
    </Link>
  )
}
