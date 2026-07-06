import { useState } from 'react'
import { ChevronDown, List } from 'lucide-react'

export default function PolicyLayout({ toc, children }) {
  const [tocOpen, setTocOpen] = useState(false)

  return (
    <div className="bg-cream py-8 md:py-10">
      <div className="mx-auto max-w-6xl px-4">

        {/* Mobile TOC — collapsible */}
        <div className="mb-6 overflow-hidden rounded-card border border-soft bg-white shadow-sm lg:hidden">
          <button
            type="button"
            onClick={() => setTocOpen((o) => !o)}
            className="flex w-full items-center justify-between px-5 py-3.5"
            aria-expanded={tocOpen}
          >
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent-dark">
              <List size={15} />
              Mục lục ({toc.length} mục)
            </div>
            <ChevronDown
              size={16}
              className={`shrink-0 text-faint transition-transform duration-200 ${tocOpen ? 'rotate-180' : ''}`}
            />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${tocOpen ? 'max-h-[600px]' : 'max-h-0'}`}>
            <nav className="space-y-0.5 px-3 pb-3">
              {toc.map((item, i) => (
                <a
                  key={i}
                  href={`#section-${i + 1}`}
                  onClick={() => setTocOpen(false)}
                  className="flex items-start gap-2 rounded-lg px-3 py-2 text-sm text-secondary transition-colors hover:bg-soft-green hover:text-primary-dark"
                >
                  <span className="mt-0.5 shrink-0 text-xs font-bold text-faint">
                    {String(i + 1).padStart(2, '0')}.
                  </span>
                  <span>{item}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex items-start gap-10 lg:gap-14">
          {/* Sticky desktop TOC */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-24">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-accent-dark">Mục lục</p>
              <nav className="space-y-0.5">
                {toc.map((item, i) => (
                  <a
                    key={i}
                    href={`#section-${i + 1}`}
                    className="flex items-start gap-2 rounded-lg px-3 py-2 text-sm text-secondary transition-all hover:bg-white hover:text-primary-dark hover:shadow-sm"
                  >
                    <span className="mt-0.5 shrink-0 text-xs font-bold text-faint">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="leading-snug">{item}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="min-w-0 flex-1 space-y-4">{children}</main>
        </div>
      </div>
    </div>
  )
}
