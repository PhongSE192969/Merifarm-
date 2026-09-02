import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import DataTable from '../../components/common/DataTable'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import CouponModal from '../../components/coupons/CouponModal'
import { listCoupons, createCoupon, updateCoupon, deleteCoupon, getUsageCount } from '../../../../src/services/couponsService'
import { formatPrice } from '../../../../src/utils/format'
import { useAdminAuth } from '../../context/AdminAuthContext'

export default function CouponListPage() {
  const { user } = useAdminAuth()
  const [coupons, setCoupons] = useState([])
  const [usage, setUsage] = useState({})
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toDelete, setToDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  async function reload() {
    setLoading(true)
    const list = await listCoupons()
    setCoupons(list)
    const counts = {}
    await Promise.all(list.map(async (c) => { counts[c.code] = await getUsageCount(c.code) }))
    setUsage(counts)
    setLoading(false)
  }

  useEffect(() => { reload() }, [])

  function openCreate() { setEditing(null); setModalOpen(true) }
  function openEdit(c) { setEditing(c); setModalOpen(true) }

  async function handleSave(data) {
    setSaving(true)
    try {
      if (editing) await updateCoupon(editing.code, data, user?.email)
      else await createCoupon(data, user?.email)
      setModalOpen(false)
      reload()
    } finally {
      setSaving(false)
    }
  }

  async function confirmDelete() {
    setDeleting(true)
    try {
      await deleteCoupon(toDelete.code)
      setToDelete(null)
      reload()
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Mã giảm giá"
        description={`${coupons.length} mã hiện có`}
        actions={
          <button type="button" onClick={openCreate} className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark">
            <Plus size={15} /> Thêm mã
          </button>
        }
      />

      <DataTable
        loading={loading}
        rows={coupons}
        rowKey="code"
        emptyMessage="Chưa có mã giảm giá nào."
        columns={[
          { key: 'code', label: 'Mã', render: (c) => <span className="font-bold text-ink">{c.code}</span> },
          { key: 'value', label: 'Giá trị', render: (c) => c.type === 'percent' ? `${c.value}%` : formatPrice(c.value) },
          { key: 'expiresAt', label: 'Hạn dùng', render: (c) => c.expiresAt || 'Không giới hạn' },
          { key: 'usage', label: 'Đã dùng', render: (c) => `${usage[c.code] ?? '—'}${c.maxUses != null ? ` / ${c.maxUses}` : ''}` },
          {
            key: 'active', label: 'Trạng thái',
            render: (c) => (
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${c.active ? 'bg-soft-green text-primary-dark' : 'bg-red-50 text-red-500'}`}>
                {c.active ? 'Đang bật' : 'Đã tắt'}
              </span>
            ),
          },
          {
            key: 'actions', label: '', className: 'text-right',
            render: (c) => (
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => openEdit(c)} className="text-xs font-semibold text-primary hover:underline">Sửa</button>
                <button type="button" onClick={() => setToDelete(c)} className="text-xs font-semibold text-red-500 hover:underline">Xóa</button>
              </div>
            ),
          },
        ]}
      />

      <CouponModal open={modalOpen} coupon={editing} saving={saving} onClose={() => setModalOpen(false)} onSave={handleSave} />

      <ConfirmDialog
        open={!!toDelete}
        title="Xóa mã giảm giá"
        message={`Xóa mã "${toDelete?.code}"? Khách sẽ không áp dụng được mã này nữa.`}
        confirmLabel="Xóa"
        danger
        loading={deleting}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
