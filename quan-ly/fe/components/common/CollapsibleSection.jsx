import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

// Khối gấp/mở dùng cho các form dài — giúp người dùng không bị choáng ngợp bởi
// quá nhiều trường cùng lúc, và cho biết trước phần này sẽ hiện ở đâu trên web.
export default function CollapsibleSection({ title, hint, count, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="overflow-hidden rounded-xl border border-soft">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 bg-[#FAFAF8] px-4 py-3 text-left"
      >
        <div>
          <p className="text-sm font-semibold text-ink">
            {title}
            {typeof count === 'number' && count > 0 && (
              <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary-dark">{count}</span>
            )}
          </p>
          {hint && <p className="mt-0.5 text-xs text-faint">{hint}</p>}
        </div>
        <ChevronDown size={16} className={`shrink-0 text-faint transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="space-y-4 border-t border-soft p-4">{children}</div>}
    </div>
  )
}
