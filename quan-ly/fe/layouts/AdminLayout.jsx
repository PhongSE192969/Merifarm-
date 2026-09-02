import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, Package, Ticket, ClipboardList, Settings } from 'lucide-react'
import AdminBackground from '../components/layout/AdminBackground'
import AdminSidebar from '../components/layout/AdminSidebar'
import AdminTopbar from '../components/layout/AdminTopbar'

const COLLAPSE_KEY = 'merifarm-admin-sidebar-collapsed'

const MOBILE_NAV = [
  { to: '/quan-ly', end: true, icon: LayoutDashboard, label: 'Tổng quan' },
  { to: '/quan-ly/san-pham', icon: Package, label: 'Sản phẩm' },
  { to: '/quan-ly/ma-giam-gia', icon: Ticket, label: 'Mã giảm giá' },
  { to: '/quan-ly/don-hang', icon: ClipboardList, label: 'Đơn hàng' },
  { to: '/quan-ly/cai-dat', icon: Settings, label: 'Cài đặt' },
]

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem(COLLAPSE_KEY) === '1' } catch { return false }
  })

  function toggleCollapsed() {
    setCollapsed((c) => {
      const next = !c
      try { localStorage.setItem(COLLAPSE_KEY, next ? '1' : '0') } catch {}
      return next
    })
  }

  return (
    <div className="min-h-screen">
      <AdminBackground />
      <AdminSidebar collapsed={collapsed} onToggle={toggleCollapsed} />
      <div className={`flex gap-3 p-3 transition-[padding-left] duration-200 ${collapsed ? 'admin-content-shift-collapsed' : 'admin-content-shift'}`}>
        <div className="mx-auto flex min-w-0 max-w-[1200px] flex-1 flex-col gap-3">
          <AdminTopbar />
          <nav className="admin-glass flex gap-1 overflow-x-auto rounded-2xl p-2 md:hidden">
            {MOBILE_NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    isActive ? 'bg-primary text-white' : 'text-secondary'
                  }`
                }
              >
                <item.icon size={14} />
                {item.label}
              </NavLink>
            ))}
          </nav>
          <main className="min-h-[calc(100vh-6rem)] flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
