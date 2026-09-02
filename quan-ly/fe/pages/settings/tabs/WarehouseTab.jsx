import { useEffect, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { getWarehouseSettings, updateWarehouseSettings } from '../../../../../src/services/settingsService'
import { useAdminAuth } from '../../../context/AdminAuthContext'

const CARRIERS = ['Tự giao hàng', 'Giao Hàng Nhanh (GHN)', 'Giao Hàng Tiết Kiệm (GHTK)', 'Viettel Post', 'J&T Express', 'Ninja Van']

export default function WarehouseTab() {
  const { user } = useAdminAuth()
  const [form, setForm] = useState({ address: '', ward: '', province: '', contactName: '', phone1: '', phone2: '', carrier: CARRIERS[0] })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    getWarehouseSettings().then((s) => { if (s) setForm((f) => ({ ...f, ...s, carrier: s.carrier || CARRIERS[0] })) }).finally(() => setLoading(false))
  }, [])

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    try {
      await updateWarehouseSettings(form, user?.email)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-sm text-faint">Đang tải...</p>

  const inputCls = 'w-full rounded-xl border border-soft px-3.5 py-2.5 text-sm outline-none focus:border-primary'

  return (
    <div>
      <p className="mb-4 text-sm text-secondary">
        Địa chỉ và số điện thoại này hiển thị cho khách khi chọn "Nhận tại kho / cửa hàng" ở giỏ hàng,
        và là nơi đơn vị vận chuyển đến lấy hàng.
      </p>
      <form onSubmit={handleSave} className="max-w-lg space-y-4 admin-glass rounded-2xl p-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Địa chỉ (số nhà, đường, phường/xã)</label>
          <input value={form.address || ''} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Phường / Xã</label>
            <input value={form.ward || ''} onChange={(e) => setForm((f) => ({ ...f, ward: e.target.value }))} className={inputCls} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Tỉnh / Thành phố</label>
            <input value={form.province || ''} onChange={(e) => setForm((f) => ({ ...f, province: e.target.value }))} className={inputCls} />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Người chịu trách nhiệm</label>
          <input
            value={form.contactName || ''}
            onChange={(e) => setForm((f) => ({ ...f, contactName: e.target.value }))}
            placeholder="VD: Nguyễn Ngọc Phương Vy"
            className={inputCls}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Số điện thoại 1</label>
            <input value={form.phone1 || ''} onChange={(e) => setForm((f) => ({ ...f, phone1: e.target.value }))} className={inputCls} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Số điện thoại 2 (tùy chọn)</label>
            <input value={form.phone2 || ''} onChange={(e) => setForm((f) => ({ ...f, phone2: e.target.value }))} className={inputCls} />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Đơn vị vận chuyển đang dùng</label>
          <select value={form.carrier} onChange={(e) => setForm((f) => ({ ...f, carrier: e.target.value }))} className={inputCls}>
            {CARRIERS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <p className="mt-1.5 text-xs text-faint">Chỉ để ghi nhớ nội bộ, web chưa kết nối trực tiếp API của đơn vị vận chuyển.</p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={saving} className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-dark disabled:opacity-60">
            {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
              <CheckCircle2 size={15} /> Đã lưu
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
