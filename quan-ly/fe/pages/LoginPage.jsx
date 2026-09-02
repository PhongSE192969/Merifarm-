import { useState } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import { useAdminAuth } from '../context/AdminAuthContext'

export default function LoginPage() {
  const { user, loading, signIn } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) {
    const to = location.state?.from?.pathname || '/quan-ly'
    return <Navigate to={to} replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await signIn(email.trim(), password)
      navigate(location.state?.from?.pathname || '/quan-ly', { replace: true })
    } catch {
      setError('Email hoặc mật khẩu không đúng.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-lg font-bold text-ink">Đăng nhập quản lý</h1>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-soft px-3.5 py-2.5 text-sm outline-none focus:border-primary"
          placeholder="admin@merifarm.vn"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Mật khẩu</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-soft px-3.5 py-2.5 text-sm outline-none focus:border-primary"
          placeholder="••••••••"
        />
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle size={12} />{error}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-primary py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
      >
        {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>
    </form>
  )
}
