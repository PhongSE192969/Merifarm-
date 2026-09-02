import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Package, Ticket, ClipboardList, Settings, Leaf, ChevronLeft, ChevronRight } from 'lucide-react'

const NAV = [
  { to: '/quan-ly', end: true, icon: LayoutDashboard, label: 'Tổng quan' },
  { to: '/quan-ly/san-pham', icon: Package, label: 'Sản phẩm' },
  { to: '/quan-ly/ma-giam-gia', icon: Ticket, label: 'Mã giảm giá' },
  { to: '/quan-ly/don-hang', icon: ClipboardList, label: 'Đơn hàng' },
  { to: '/quan-ly/cai-dat', icon: Settings, label: 'Cài đặt' },
]

export default function AdminSidebar({ collapsed, onToggle }) {
  return (
    <aside
      style={{
        background: 'linear-gradient(160deg, rgba(15,107,52,0.16), rgba(15,107,52,0.06))',
        top: 12, bottom: 12, left: 12,
      }}
      className={`fixed hidden flex-col rounded-3xl border border-primary/15 shadow-[0_10px_36px_-10px_rgba(15,107,52,0.28)] backdrop-blur-xl transition-[width] duration-200 md:flex ${
        collapsed ? 'w-[76px]' : 'w-56'
      }`}
    >
      <div className={`flex items-center gap-2.5 px-5 py-6 ${collapsed ? 'justify-center px-0' : ''}`}>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15">
          <Leaf size={18} className="text-primary" />
        </div>
        {!collapsed && (
          <div className="leading-tight">
            <p className="font-bold text-ink">Merifarm</p>
            <p className="text-[11px] font-medium text-faint">Khu quản lý</p>
          </div>
        )}
      </div>
      <nav className="flex-1 space-y-1.5 px-3">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            title={collapsed ? item.label : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                collapsed ? 'justify-center px-0' : ''
              } ${
                isActive
                  ? 'bg-primary text-white shadow-[0_8px_20px_-6px_rgba(15,107,52,0.55)]'
                  : 'text-secondary hover:bg-white/70 hover:text-primary-dark'
              }`
            }
          >
            <item.icon size={17} />
            {!collapsed && item.label}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={onToggle}
        title={collapsed ? 'Mở rộng' : 'Thu gọn'}
        className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full border border-primary/20 bg-white text-primary shadow-[0_4px_14px_-2px_rgba(15,107,52,0.35)] transition-colors hover:bg-soft-green"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </aside>
  )
}
