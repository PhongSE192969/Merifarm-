import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Pencil, MoreHorizontal, Trash2, HelpCircle, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import { listProducts, deleteProduct, updateProduct, getSoldQuantities } from '../../../../src/services/productsService'
import { formatPrice } from '../../../../src/utils/format'
import { useAdminAuth } from '../../context/AdminAuthContext'

function SortHeader({ label, sortKey, sort, onSort, help }) {
  const active = sort.key === sortKey
  const Icon = active ? (sort.dir === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown
  return (
    <button
      type="button"
      onClick={() => onSort(sortKey)}
      className={`flex items-center gap-1 transition-colors ${active ? 'text-primary-dark' : 'text-ink hover:text-primary'}`}
    >
      {label}
      {help && <HelpCircle size={12} className="text-faint" title={help} />}
      <Icon size={12} className={active ? 'text-primary' : 'text-faint'} />
    </button>
  )
}

// Menu "..." từng dòng: Sửa / Đổi trạng thái / Xóa.
function RowMenu({ product, onToggleStock, onDelete }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative inline-block text-left" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-secondary transition-colors hover:bg-white/70 hover:text-primary"
      >
        <MoreHorizontal size={16} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="admin-glass absolute right-0 z-20 mt-1 w-48 overflow-hidden rounded-xl !bg-white/95 py-1">
            <button
              type="button"
              onClick={() => { onToggleStock(product); setOpen(false) }}
              className="block w-full px-4 py-2 text-left text-sm text-ink hover:bg-white/80"
            >
              {product.inStock ? 'Đánh dấu hết hàng' : 'Đánh dấu còn hàng'}
            </button>
            <button
              type="button"
              onClick={() => { onDelete(product); setOpen(false) }}
              className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50"
            >
              Xóa sản phẩm
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default function ProductListPage() {
  const navigate = useNavigate()
  const { user } = useAdminAuth()
  const [products, setProducts] = useState([])
  const [soldMap, setSoldMap] = useState({})
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ key: null, dir: 'asc' })
  const [selected, setSelected] = useState(new Set())
  const [toDelete, setToDelete] = useState(null)
  const [bulkDeleting, setBulkDeleting] = useState(false)
  const [deleting, setDeleting] = useState(false)

  function reload() {
    setLoading(true)
    Promise.all([listProducts(), getSoldQuantities()])
      .then(([p, sold]) => { setProducts(p); setSoldMap(sold) })
      .finally(() => setLoading(false))
  }

  useEffect(() => { reload() }, [])

  function handleSort(key) {
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'desc' }))
  }

  let rows = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
  if (sort.key) {
    const dir = sort.dir === 'asc' ? 1 : -1
    rows = [...rows].sort((a, b) => {
      let av, bv
      if (sort.key === 'sold') { av = soldMap[a.id] || 0; bv = soldMap[b.id] || 0 }
      else if (sort.key === 'inStock') { av = a.inStock ? 1 : 0; bv = b.inStock ? 1 : 0 }
      else if (sort.key === 'price') { av = a.originalPrice ?? a.price ?? 0; bv = b.originalPrice ?? b.price ?? 0 }
      return (av - bv) * dir
    })
  }

  const allSelected = rows.length > 0 && rows.every((p) => selected.has(p.id))

  function toggleSelectAll() {
    setSelected((s) => {
      if (allSelected) return new Set()
      return new Set(rows.map((p) => p.id))
    })
  }

  function toggleSelect(id) {
    setSelected((s) => {
      const next = new Set(s)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function toggleStock(p) {
    await updateProduct(p.id, { ...p, inStock: !p.inStock }, user?.email)
    reload()
  }

  async function confirmDelete() {
    setDeleting(true)
    try {
      await deleteProduct(toDelete.id)
      setToDelete(null)
      reload()
    } finally {
      setDeleting(false)
    }
  }

  async function handleBulkDelete() {
    setBulkDeleting(true)
    try {
      await Promise.all([...selected].map((id) => deleteProduct(id)))
      setSelected(new Set())
      reload()
    } finally {
      setBulkDeleting(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Sản phẩm"
        description={`${products.length} sản phẩm hiện có trên web`}
        actions={
          <button
            type="button"
            onClick={() => navigate('/quan-ly/san-pham/moi')}
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            <Plus size={15} /> Thêm sản phẩm
          </button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative max-w-xs flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm sản phẩm..."
            className="w-full rounded-full border border-soft bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
          />
        </div>
        {selected.size > 0 && (
          <button
            type="button"
            disabled={bulkDeleting}
            onClick={handleBulkDelete}
            className="flex items-center gap-1.5 rounded-full border border-red-300 px-3.5 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 disabled:opacity-60"
          >
            <Trash2 size={13} /> {bulkDeleting ? 'Đang xóa...' : `Xóa đã chọn (${selected.size})`}
          </button>
        )}
      </div>

      <DataTable
        loading={loading}
        rows={rows}
        onRowClick={(p) => navigate(`/quan-ly/san-pham/${p.id}`)}
        emptyMessage="Chưa có sản phẩm nào."
        columns={[
          {
            key: 'select', headerClassName: 'w-10',
            label: (
              <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} onClick={(e) => e.stopPropagation()} className="h-4 w-4" />
            ),
            render: (p) => (
              <input
                type="checkbox"
                checked={selected.has(p.id)}
                onChange={() => toggleSelect(p.id)}
                onClick={(e) => e.stopPropagation()}
                className="h-4 w-4"
              />
            ),
          },
          {
            key: 'name', label: 'Sản phẩm',
            render: (p) => (
              <div className="flex items-center gap-3">
                <img src={p.image} alt="" className="h-11 w-11 shrink-0 rounded-lg border border-soft bg-white object-contain p-1" />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-ink">{p.name}</p>
                  <p className="text-xs text-faint">{p.sku ? `SKU: ${p.sku}` : `Mã: ${p.slug}`}</p>
                </div>
              </div>
            ),
          },
          {
            key: 'sold',
            label: <SortHeader label="Đã bán" sortKey="sold" sort={sort} onSort={handleSort} help="Cộng số lượng trong các đơn hàng chưa hủy" />,
            render: (p) => {
              const qty = soldMap[p.id] || 0
              return (
                <div>
                  <p className="font-semibold text-ink">{qty} món</p>
                  <p className="text-xs text-faint">{qty === 0 ? 'Chưa có đơn' : 'Từ đơn chưa hủy'}</p>
                </div>
              )
            },
          },
          {
            key: 'inStock',
            label: <SortHeader label="Trạng thái" sortKey="inStock" sort={sort} onSort={handleSort} />,
            render: (p) => (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); toggleStock(p) }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-ink"
                title="Bấm để đổi trạng thái"
              >
                <span className={`h-2 w-2 rounded-full ${p.inStock ? 'bg-emerald-500' : 'bg-faint'}`} />
                {p.inStock ? 'Còn hàng' : 'Hết hàng'}
              </button>
            ),
          },
          {
            key: 'price',
            label: <SortHeader label="Giá bán lẻ" sortKey="price" sort={sort} onSort={handleSort} />,
            render: (p) => (
              <div>
                <p className="font-semibold text-ink">{formatPrice(p.originalPrice ?? p.price ?? 0)}</p>
                {p.originalPrice && p.price && p.originalPrice !== p.price && (
                  <p className="text-xs text-accent-dark">Khuyến mãi: {formatPrice(p.price)}</p>
                )}
                {!p.price && !p.originalPrice && <p className="text-xs text-faint">Liên hệ báo giá</p>}
              </div>
            ),
          },
          {
            key: 'actions', label: 'Hành động', className: 'text-right', headerClassName: 'text-right',
            render: (p) => (
              <div className="flex items-center justify-end gap-1">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); navigate(`/quan-ly/san-pham/${p.id}`) }}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-secondary transition-colors hover:bg-white/70 hover:text-primary"
                  title="Sửa sản phẩm"
                >
                  <Pencil size={14} />
                </button>
                <RowMenu product={p} onToggleStock={toggleStock} onDelete={setToDelete} />
              </div>
            ),
          },
        ]}
      />

      <ConfirmDialog
        open={!!toDelete}
        title="Xóa sản phẩm"
        message={`Xóa sản phẩm "${toDelete?.name}"? Hành động này không thể hoàn tác.`}
        confirmLabel="Xóa"
        danger
        loading={deleting}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
