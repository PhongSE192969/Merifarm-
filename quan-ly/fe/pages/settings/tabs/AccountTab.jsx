import { useState } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { useAdminAuth } from '../../../context/AdminAuthContext'

export default function AccountTab() {
  const { user, updatePassword } = useAdminAuth()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  const inputCls = 'w-full rounded-xl border border-soft px-3.5 py-2.5 text-sm outline-none focus:border-primary'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSaved(false)
    if (newPassword.length < 6) {
      setError('Mật khẩu mới cần ít nhất 6 ký tự.')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp.')
      return
    }
    setSaving(true)
    try {
      await updatePassword(newPassword)
      setSaved(true)
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setSaved(false), 2500)
    } catch (err) {
      setError(err?.message || 'Không thể đổi mật khẩu, vui lòng thử lại.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <p className="mb-4 text-sm text-secondary">Thông tin tài khoản quản trị viên đang đăng nhập.</p>

      <div className="max-w-lg space-y-4 admin-glass rounded-2xl p-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Email đăng nhập</label>
          <div className={inputCls + ' bg-[#F8F5F0] text-secondary'}>{user?.email}</div>
        </div>

        <div className="border-t border-soft pt-4">
          <p className="mb-3 text-sm font-semibold text-ink">Đổi mật khẩu</p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Mật khẩu mới</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={inputCls} placeholder="Ít nhất 6 ký tự" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Nhập lại mật khẩu mới</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputCls} />
            </div>
            {error && (
              <p className="flex items-center gap-1.5 text-xs text-red-500">
                <AlertCircle size={12} />{error}
              </p>
            )}
            <div className="flex items-center gap-3 pt-1">
              <button type="submit" disabled={saving} className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-dark disabled:opacity-60">
                {saving ? 'Đang lưu...' : 'Đổi mật khẩu'}
              </button>
              {saved && (
                <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
                  <CheckCircle2 size={15} /> Đã đổi mật khẩu
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
