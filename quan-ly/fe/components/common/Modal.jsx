import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, maxWidth = 'max-w-lg' }) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className={`max-h-[90vh] w-full ${maxWidth} overflow-y-auto rounded-3xl border border-white/80 bg-white/90 shadow-2xl backdrop-blur-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-soft px-6 py-4">
          <h3 className="text-base font-bold text-ink">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-faint transition-colors hover:bg-soft-green hover:text-primary"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
