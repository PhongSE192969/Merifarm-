import { LogOut, Search, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'
import NotificationsMenu from './NotificationsMenu'

export default function AdminTopbar() {
  const { user, signOut } = useAdminAuth()
  const navigate = useNavigate()
  const initial = (user?.email || 'A').charAt(0).toUpperCase()

  async function handleSignOut() {
    await signOut()
    navigate('/quan-ly/dang-nhap', { replace: true })
  }

  return (
    <header className="admin-glass sticky top-3 z-30 flex items-center gap-3 rounded-3xl px-4 py-3">
      <div className="font-bold text-ink md:hidden">Merifarm</div>

      <div className="relative hidden max-w-xs flex-1 md:block">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
        <input
          placeholder="Tìm sản phẩm, đơn hàng..."
          className="w-full rounded-full border border-white/70 bg-white/70 py-2 pl-9 pr-3 text-sm text-ink outline-none placeholder:text-faint focus:border-primary/40"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <NotificationsMenu />
        <button
          type="button"
          onClick={() => navigate('/quan-ly/cai-dat')}
          className="hidden h-9 w-9 items-center justify-center rounded-full text-secondary transition-colors hover:bg-white/70 hover:text-primary sm:flex"
          aria-label="Cài đặt"
        >
          <Settings size={16} />
        </button>

        <div className="mx-1 hidden h-6 w-px bg-soft sm:block" />

        <div className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-1.5 sm:bg-white/60 sm:pr-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-sm font-bold text-white">
            {initial}
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="max-w-[140px] truncate text-xs font-semibold text-ink">{user?.email || 'Chưa đăng nhập'}</p>
            <p className="text-[10px] text-faint">Quản trị viên</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          title="Đăng xuất"
          className="flex h-9 w-9 items-center justify-center rounded-full text-secondary transition-colors hover:bg-red-50 hover:text-red-500"
        >
          <LogOut size={15} />
        </button>
      </div>
    </header>
  )
}
