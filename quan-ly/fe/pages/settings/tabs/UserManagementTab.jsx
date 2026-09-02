import { useEffect, useState } from 'react'
import { Plus, Mail, CheckCircle2, AlertCircle } from 'lucide-react'
import Modal from '../../../components/common/Modal'
import { listProfiles, updateProfileRole, requestPasswordReset, createUserAccount } from '../../../../../src/services/profilesService'
import { useAdminAuth } from '../../../context/AdminAuthContext'

const ROLE_LABELS = { admin: 'Quản trị viên', user: 'Nhân viên' }

function RoleBadge({ role }) {
  const isAdminRole = role === 'admin'
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${isAdminRole ? 'bg-primary/12 text-primary-dark' : 'bg-soft text-secondary'}`}>
      {ROLE_LABELS[role] || role}
    </span>
  )
}

export default function UserManagementTab() {
  const { user: currentUser } = useAdminAuth()
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState(null)
  const [resetSentId, setResetSentId] = useState(null)
  const [addOpen, setAddOpen] = useState(false)

  function reload() {
    setLoading(true)
    listProfiles().then(setProfiles).finally(() => setLoading(false))
  }

  useEffect(() => { reload() }, [])

  async function handleRoleChange(id, role) {
    setSavingId(id)
    try {
      await updateProfileRole(id, role)
      reload()
    } catch (err) {
      alert(err?.message || 'Không thể đổi vai trò.')
    } finally {
      setSavingId(null)
    }
  }

  async function handleResetPassword(email, id) {
    setSavingId(id)
    try {
      await requestPasswordReset(email)
      setResetSentId(id)
      setTimeout(() => setResetSentId(null), 3000)
    } catch (err) {
      alert(err?.message || 'Không thể gửi email.')
    } finally {
      setSavingId(null)
    }
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-secondary">{profiles.length} tài khoản đang có quyền vào khu quản lý.</p>
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          <Plus size={15} /> Thêm người dùng
        </button>
      </div>

      <div className="admin-glass overflow-x-auto rounded-2xl">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-white/70 bg-white/40">
              <th className="px-4 py-3 text-left font-semibold text-ink">Email</th>
              <th className="px-4 py-3 text-left font-semibold text-ink">Tên hiển thị</th>
              <th className="px-4 py-3 text-left font-semibold text-ink">Vai trò</th>
              <th className="px-4 py-3 text-left font-semibold text-ink">Ngày tạo</th>
              <th className="px-4 py-3 text-right font-semibold text-ink">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/60">
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-faint">Đang tải...</td></tr>
            ) : profiles.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-faint">Chưa có tài khoản nào.</td></tr>
            ) : (
              profiles.map((p) => {
                const isSelf = p.id === currentUser?.id
                return (
                  <tr key={p.id}>
                    <td className="px-4 py-3 text-ink">{p.email}{isSelf && <span className="ml-1.5 text-xs text-faint">(bạn)</span>}</td>
                    <td className="px-4 py-3 text-secondary">{p.displayName || '—'}</td>
                    <td className="px-4 py-3">
                      <select
                        value={p.role}
                        disabled={savingId === p.id}
                        onChange={(e) => handleRoleChange(p.id, e.target.value)}
                        className="rounded-lg border border-soft bg-white px-2.5 py-1.5 text-xs font-semibold outline-none focus:border-primary disabled:opacity-60"
                      >
                        <option value="user">Nhân viên</option>
                        <option value="admin">Quản trị viên</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-secondary">{new Date(p.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        disabled={savingId === p.id}
                        onClick={() => handleResetPassword(p.email, p.id)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-soft px-3 py-1.5 text-xs font-semibold text-secondary transition-colors hover:border-primary hover:text-primary disabled:opacity-60"
                      >
                        {resetSentId === p.id ? <CheckCircle2 size={13} className="text-primary" /> : <Mail size={13} />}
                        {resetSentId === p.id ? 'Đã gửi' : 'Gửi email đặt lại mật khẩu'}
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <AddUserModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  )
}

function AddUserModal({ open, onClose }) {
  const [form, setForm] = useState({ email: '', displayName: '', role: 'user', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await createUserAccount(form)
      onClose()
    } catch (err) {
      setError(err?.message || 'Không thể tạo tài khoản.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputCls = 'w-full rounded-xl border border-soft px-3.5 py-2.5 text-sm outline-none focus:border-primary'

  return (
    <Modal open={open} onClose={onClose} title="Thêm người dùng">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Email</label>
          <input type="email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={inputCls} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Tên hiển thị</label>
          <input value={form.displayName} onChange={(e) => setForm((f) => ({ ...f, displayName: e.target.value }))} className={inputCls} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Vai trò</label>
          <select value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} className={inputCls}>
            <option value="user">Nhân viên</option>
            <option value="admin">Quản trị viên</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Mật khẩu tạm thời</label>
          <input type="password" required minLength={6} value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} className={inputCls} placeholder="Ít nhất 6 ký tự" />
        </div>
        {error && (
          <p className="flex items-start gap-1.5 text-xs text-red-500">
            <AlertCircle size={13} className="mt-0.5 shrink-0" />{error}
          </p>
        )}
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="rounded-full border border-soft px-5 py-2.5 text-sm font-semibold text-ink hover:bg-[#F8F5F0]">Hủy</button>
          <button type="submit" disabled={submitting} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60">
            {submitting ? 'Đang gửi...' : 'Tạo tài khoản'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
