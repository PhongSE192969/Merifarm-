import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null
  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-soft text-secondary disabled:opacity-40"
        aria-label="Trang trước"
      >
        <ChevronLeft size={15} />
      </button>
      <span className="px-2 text-sm text-secondary">Trang {page} / {totalPages}</span>
      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-soft text-secondary disabled:opacity-40"
        aria-label="Trang sau"
      >
        <ChevronRight size={15} />
      </button>
    </div>
  )
}
