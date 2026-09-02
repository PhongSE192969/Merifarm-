import { useEffect, useState } from 'react'
import Modal from '../common/Modal'

const EMPTY = { code: '', type: 'fixed', value: '', expiresAt: '', maxUses: '', active: true }

export default function CouponModal({ open, coupon, onClose, onSave, saving }) {
  const [form, setForm] = useState(EMPTY)
  const isEdit = !!coupon

  useEffect(() => {
    if (open) {
      setForm(coupon ? {
        code: coupon.code, type: coupon.type, value: coupon.value,
        expiresAt: coupon.expiresAt || '', maxUses: coupon.maxUses ?? '', active: coupon.active,
      } : EMPTY)
    }
  }, [open, coupon])

  function submit(e) {
    e.preventDefault()
    onSave({
      code: form.code.trim().toUpperCase(),
      type: form.type,
      value: Number(form.value),
      expiresAt: form.expiresAt || null,
      maxUses: form.maxUses === '' ? null : Number(form.maxUses),
      active: form.active,
    })
  }

  const inputCls = 'w-full rounded-xl border border-soft px-3.5 py-2.5 text-sm outline-none focus:border-primary'

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? `Sửa mã ${coupon.code}` : 'Thêm mã giảm giá'}>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Mã</label>
          <input
            value={form.code}
            onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))}
            disabled={isEdit}
            required
            className={inputCls + ' disabled:bg-[#F3F3F3]'}
            placeholder="VD: MERIFARM10"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Loại giảm</label>
            <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} className={inputCls}>
              <option value="fixed">Giảm số tiền cố định</option>
              <option value="percent">Giảm phần trăm</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Giá trị</label>
            <input
              type="number" required value={form.value}
              onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
              className={inputCls} placeholder={form.type === 'percent' ? 'VD: 5' : 'VD: 50000'}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Hạn dùng (tùy chọn)</label>
            <input type="date" value={form.expiresAt} onChange={(e) => setForm((f) => ({ ...f, expiresAt: e.target.value }))} className={inputCls} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Giới hạn lượt dùng (tùy chọn)</label>
            <input type="number" value={form.maxUses} onChange={(e) => setForm((f) => ({ ...f, maxUses: e.target.value }))} className={inputCls} placeholder="Không giới hạn" />
          </div>
        </div>
        <label className="flex items-center gap-2.5">
          <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} className="h-4 w-4" />
          <span className="text-sm font-medium text-ink">Đang bật (khách áp mã được)</span>
        </label>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-full border border-soft px-5 py-2.5 text-sm font-semibold text-ink hover:bg-[#F8F5F0]">Hủy</button>
          <button type="submit" disabled={saving} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60">
            {saving ? 'Đang lưu...' : 'Lưu'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
