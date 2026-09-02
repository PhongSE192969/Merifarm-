import { Navigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'

const AUTH_CHECK_DISABLED = false

export default function RequireAdminAuth({ children }) {
  const { user, loading } = useAdminAuth()
  const location = useLocation()

  if (AUTH_CHECK_DISABLED) {
    return children
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-sm text-faint">
        Đang kiểm tra đăng nhập...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/quan-ly/dang-nhap" state={{ from: location }} replace />
  }

  return children
}
