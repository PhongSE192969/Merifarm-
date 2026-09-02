import { useEffect, useState } from 'react'
import { Upload, Loader2, CheckCircle2, Lock } from 'lucide-react'
import { getPaymentSettings, updatePaymentSettings, uploadImage } from '../../../../../src/services/settingsService'
import { useAdminAuth } from '../../../context/AdminAuthContext'

export default function PaymentTab() {
  const { user, isAdmin } = useAdminAuth()
  const [form, setForm] = useState({ bankName: '', accountNumber: '', accountHolder: '', qrImage: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    getPaymentSettings().then((s) => { if (s) setForm(s) }).finally(() => setLoading(false))
  }, [])

  async function handleQrUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadImage(file, 'settings')
      setForm((f) => ({ ...f, qrImage: url }))
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    try {
      await updatePaymentSettings(form, user?.email)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-sm text-faint">Đang tải...</p>

  const inputCls = `w-full rounded-xl border border-soft px-3.5 py-2.5 text-sm outline-none focus:border-primary ${
    isAdmin ? '' : 'bg-[#F8F5F0] text-secondary'
  }`

  return (
    <div>
      <p className="mb-4 flex items-center gap-1.5 text-sm text-secondary">
        Thông tin này hiển thị cho khách khi chọn chuyển khoản / MoMo ở giỏ hàng.
        {!isAdmin && (
          <span className="flex items-center gap-1 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent-dark">
            <Lock size={11} /> Chỉ xem
          </span>
        )}
      </p>
      <form onSubmit={handleSave} className="max-w-lg space-y-4 admin-glass rounded-2xl p-5">
        <fieldset disabled={!isAdmin} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Tên ngân hàng</label>
            <input value={form.bankName || ''} onChange={(e) => setForm((f) => ({ ...f, bankName: e.target.value }))} className={inputCls} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Số tài khoản</label>
            <input value={form.accountNumber || ''} onChange={(e) => setForm((f) => ({ ...f, accountNumber: e.target.value }))} className={inputCls} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Chủ tài khoản</label>
            <input value={form.accountHolder || ''} onChange={(e) => setForm((f) => ({ ...f, accountHolder: e.target.value }))} className={inputCls} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-ink">Mã QR thanh toán</label>
            <div className="flex items-start gap-3">
              <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-xl border border-soft bg-white">
                {form.qrImage ? (
                  <img src={form.qrImage} alt="QR hiện tại" className="h-full w-full object-contain p-2" />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 text-faint">
                    <Upload size={20} />
                    <span className="text-xs font-medium">Chưa có ảnh QR</span>
                  </div>
                )}
              </div>
              {isAdmin && (
                <div>
                  <label className="flex w-fit cursor-pointer items-center gap-1.5 rounded-full border border-soft px-4 py-2 text-sm font-semibold text-primary hover:border-primary">
                    {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                    {uploading ? 'Đang tải lên...' : form.qrImage ? 'Thay ảnh QR khác' : 'Tải ảnh QR lên'}
                    <input type="file" accept="image/*" hidden onChange={handleQrUpload} disabled={uploading} />
                  </label>
                  <p className="mt-2 max-w-xs text-xs text-faint">Ảnh này sẽ hiện cho khách quét khi chọn thanh toán chuyển khoản / MoMo ở giỏ hàng.</p>
                </div>
              )}
            </div>
          </div>
        </fieldset>

        {isAdmin && (
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
        )}
        {!isAdmin && (
          <p className="pt-1 text-xs text-faint">Chỉ quản trị viên mới chỉnh được mục này.</p>
        )}
      </form>
    </div>
  )
}
