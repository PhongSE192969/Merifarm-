import { useState } from 'react'
import { Leaf, Sun, Sprout, Shield, Zap, Droplets, AlertCircle, ChevronDown } from 'lucide-react'

// Đúng 7 icon mà trang chi tiết sản phẩm hỗ trợ hiển thị thật (ICON_MAP trong
// ProductDetailPage.jsx) — gõ tên khác sẽ tự rơi về icon Lá trên web mà không báo lỗi,
// nên ở đây bắt chọn từ danh sách này thay vì gõ tay để không bao giờ chọn nhầm.
const ICONS = [
  { name: 'Leaf', label: 'Lá cây', Icon: Leaf },
  { name: 'Sun', label: 'Mặt trời', Icon: Sun },
  { name: 'Sprout', label: 'Mầm non', Icon: Sprout },
  { name: 'Shield', label: 'Bảo vệ', Icon: Shield },
  { name: 'Zap', label: 'Kích thích', Icon: Zap },
  { name: 'Droplets', label: 'Giọt nước', Icon: Droplets },
  { name: 'AlertCircle', label: 'Lưu ý', Icon: AlertCircle },
]

export default function IconPicker({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const current = ICONS.find((i) => i.name === value) || ICONS[0]

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-[42px] w-[42px] shrink-0 items-center justify-center gap-1 rounded-xl border border-soft bg-white text-primary hover:border-primary"
        title={current.label}
      >
        <current.Icon size={17} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="admin-glass absolute left-0 z-20 mt-1.5 grid w-48 grid-cols-4 gap-1.5 !bg-white/95 p-2">
            {ICONS.map((i) => (
              <button
                key={i.name}
                type="button"
                title={i.label}
                onClick={() => { onChange(i.name); setOpen(false) }}
                className={`flex h-9 items-center justify-center rounded-lg border transition-colors ${
                  i.name === value ? 'border-primary bg-soft-green text-primary-dark' : 'border-soft text-secondary hover:border-primary/50'
                }`}
              >
                <i.Icon size={16} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
