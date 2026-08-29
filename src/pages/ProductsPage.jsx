import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '../components/product/ProductCard'
import SectionHeading from '../components/ui/SectionHeading'
import categories from '../data/categories.json'
import cropTypes from '../data/cropTypes.json'
import usageNeeds from '../data/usageNeeds.json'
import productForms from '../data/productForms.json'
import allProducts from '../data/products.json'

const PAGE_SIZE = 9

const SORT_OPTIONS = [
  { id: 'default', label: 'Mới nhất' },
  { id: 'name-asc', label: 'Tên A-Z' },
  { id: 'price-asc', label: 'Giá thấp đến cao' },
  { id: 'price-desc', label: 'Giá cao đến thấp' },
]

function FilterGroup({ title, options, activeId, onSelect, getLabel = (o) => o.name }) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-faint">{title}</h4>
      <ul className="space-y-1">
        <li>
          <button
            type="button"
            onClick={() => onSelect('')}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
              !activeId ? 'bg-white text-primary ring-1 ring-primary font-semibold' : 'hover:bg-primary/10'
            }`}
          >
            Tất cả
          </button>
        </li>
        {options.map((o) => (
          <li key={o.id}>
            <button
              type="button"
              onClick={() => onSelect(o.id)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                activeId === o.id ? 'bg-white text-primary ring-1 ring-primary font-semibold' : 'hover:bg-primary/10'
              }`}
            >
              {getLabel(o)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || ''
  const activeCrop = searchParams.get('crop') || ''
  const activeNeed = searchParams.get('need') || ''
  const [activeForm, setActiveForm] = useState('')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')
  const [page, setPage] = useState(1)
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => { setPage(1) }, [activeCategory, activeCrop, activeNeed, activeForm, search, sort])

  // Prevent body scroll when sheet open
  useEffect(() => {
    document.body.style.overflow = sheetOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [sheetOpen])

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  const filtered = useMemo(() => {
    let list = allProducts.filter((p) => {
      if (activeCategory && p.category !== activeCategory) return false
      if (activeCrop && !p.cropTypes.includes(activeCrop)) return false
      if (activeNeed && !p.usageNeeds?.includes(activeNeed)) return false
      if (activeForm && p.form !== activeForm) return false
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
    if (sort === 'name-asc') list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'vi'))
    else if (sort === 'price-asc' || sort === 'price-desc') {
      const dir = sort === 'price-asc' ? 1 : -1
      list = [...list].sort((a, b) => {
        if (a.price === null && b.price === null) return 0
        if (a.price === null) return 1
        if (b.price === null) return -1
        return (a.price - b.price) * dir
      })
    }
    return list
  }, [activeCategory, activeCrop, activeNeed, activeForm, search, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const hasFilters = activeCategory || activeCrop || activeNeed || activeForm || search
  const activeFilterCount = [activeCategory, activeCrop, activeNeed, activeForm].filter(Boolean).length

  const clearFilters = () => {
    setSearchParams({})
    setActiveForm('')
    setSearch('')
  }

  const filterContent = (
    <div className="space-y-6">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm sản phẩm..."
          className="w-full rounded-full border border-soft bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
        />
      </div>
      <FilterGroup title="Danh mục" options={categories} activeId={activeCategory} onSelect={(id) => setParam('category', id)} />
      <FilterGroup title="Loại cây trồng" options={cropTypes} activeId={activeCrop} onSelect={(id) => setParam('crop', id)} />
      <FilterGroup title="Nhu cầu sử dụng" options={usageNeeds} activeId={activeNeed} onSelect={(id) => setParam('need', id)} />
      <FilterGroup title="Dạng sản phẩm" options={productForms} activeId={activeForm} onSelect={setActiveForm} />
      {hasFilters && (
        <button type="button" onClick={clearFilters} className="flex items-center gap-1 text-sm font-medium text-accent-dark hover:underline">
          <X size={14} /> Xóa bộ lọc
        </button>
      )}
    </div>
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <SectionHeading eyebrow="Catalog" title="Sản phẩm phân bón" />

      {/* Mobile toolbar */}
      <div className="mb-4 flex gap-2 md:hidden">
        {/* Search bar */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm sản phẩm..."
            className="w-full rounded-full border border-soft bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary"
          />
        </div>
        {/* Filter button */}
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="relative flex items-center gap-1.5 rounded-full border border-soft bg-white px-4 py-2.5 text-sm font-semibold text-ink shadow-sm"
        >
          <SlidersHorizontal size={15} />
          Lọc
          {activeFilterCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-primary bg-white text-xs font-bold text-primary">
              {activeFilterCount}
            </span>
          )}
        </button>
        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-full border border-soft bg-white px-3 py-2.5 text-sm font-medium text-ink outline-none focus:border-primary"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden md:block">{filterContent}</aside>

        <div>
          {/* Desktop toolbar */}
          <div className="mb-4 hidden flex-wrap items-center justify-between gap-3 md:flex">
            <p className="text-sm text-secondary">{filtered.length} sản phẩm</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full border border-soft bg-white px-4 py-2 text-sm font-medium text-ink outline-none focus:border-primary"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
          </div>
          {/* Mobile count */}
          <p className="mb-3 text-sm text-secondary md:hidden">{filtered.length} sản phẩm</p>

          {paginated.length === 0 ? (
            <div className="rounded-card bg-white p-10 text-center text-secondary shadow-sm">
              <p className="font-semibold text-ink">Không tìm thấy sản phẩm phù hợp.</p>
              <p className="mt-1 text-sm">Hãy thử xóa bớt bộ lọc hoặc tìm kiếm với từ khóa khác.</p>
              {hasFilters && (
                <button type="button" onClick={clearFilters} className="mt-4 text-sm font-semibold text-primary hover:underline">
                  Xóa toàn bộ bộ lọc
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
              {paginated.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-secondary shadow-sm disabled:opacity-40"
                aria-label="Trang trước"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={`h-10 w-10 rounded-full text-sm font-semibold transition-colors ${
                    page === n ? 'bg-white text-primary ring-1 ring-primary' : 'bg-white text-secondary hover:bg-primary/10'
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-secondary shadow-sm disabled:opacity-40"
                aria-label="Trang sau"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile filter bottom sheet ────────────────────────────────────── */}
      {sheetOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setSheetOpen(false)}
            aria-hidden="true"
          />
          {/* Sheet */}
          <div className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col rounded-t-2xl bg-white shadow-2xl md:hidden">
            {/* Handle */}
            <div className="flex shrink-0 items-center justify-between border-b border-soft px-4 py-3">
              <h2 className="font-bold text-ink">Bộ lọc sản phẩm</h2>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-faint hover:bg-soft-green"
                aria-label="Đóng bộ lọc"
              >
                <X size={18} />
              </button>
            </div>
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {filterContent}
            </div>
            {/* Footer */}
            <div className="shrink-0 border-t border-soft px-4 py-3">
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="w-full rounded-full border-2 border-primary bg-white py-3 text-sm font-bold text-primary hover:bg-primary hover:text-white transition-colors"
              >
                Áp dụng ({filtered.length} sản phẩm)
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
