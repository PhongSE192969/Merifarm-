import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

// Compact select-style trigger that expands into a list of icon/label/sublabel
// options (used for delivery method & payment method, instead of a full stacked
// radio-card list).
export default function OptionPicker({ options, value, onChange, placeholder, error }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    if (!open) return
    function close(e) {
      if (!containerRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  const borderCls = error
    ? 'border-red-400 focus-within:border-red-500'
    : 'border-soft focus-within:border-primary'

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-colors duration-150 bg-white hover:border-primary/60 ${borderCls}`}
      >
        {selected?.icon && <selected.icon size={16} className="shrink-0 text-primary" />}
        <span className={`flex-1 truncate text-sm font-medium ${selected ? 'text-ink' : 'text-faint font-normal'}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={15}
          className={`shrink-0 text-faint transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {selected?.sublabel && !open && (
        <p className="mt-1.5 text-xs text-secondary">{selected.sublabel}</p>
      )}

      {open && (
        <div className="absolute z-30 mt-1.5 w-full overflow-hidden rounded-xl border border-soft bg-white shadow-lg">
          {options.map((opt) => {
            const checked = opt.value === value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => { onChange(opt.value); setOpen(false) }}
                className={`flex w-full items-start gap-3 border-b border-soft px-4 py-3 text-left transition-colors last:border-b-0
                  ${checked ? 'bg-soft-green/50' : 'hover:bg-[#F8F5F0]'}`}
              >
                {opt.icon && (
                  <opt.icon size={16} className={`mt-0.5 shrink-0 ${checked ? 'text-primary' : 'text-faint'}`} />
                )}
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${checked ? 'text-primary-dark' : 'text-ink'}`}>{opt.label}</p>
                  {opt.sublabel && <p className="mt-0.5 text-xs text-secondary">{opt.sublabel}</p>}
                </div>
                {checked && <span className="mt-0.5 shrink-0 text-primary">✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
