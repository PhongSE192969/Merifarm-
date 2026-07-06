import { NavLink, Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCartStore } from '../../store/cartStore'

const NAV_LINKS = [
  { to: '/', label: 'Trang chủ' },
  { to: '/san-pham', label: 'Sản phẩm' },
  { to: '/gioi-thieu', label: 'Giới thiệu' },
  { to: '/lien-he', label: 'Liên hệ' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const totalItems = useCartStore((s) => s.totalItems())
  const location = useLocation()

  // Close menu on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const linkClass = ({ isActive }) =>
    `block py-3 text-base font-semibold transition-colors ${
      isActive ? 'text-primary' : 'text-ink hover:text-primary'
    }`

  const desktopLinkClass = ({ isActive }) =>
    `relative text-sm font-semibold transition-colors ${
      isActive
        ? 'text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-primary after:rounded-full'
        : 'text-[#1C1C1C] hover:text-primary'
    }`

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
          <Link to="/" className="flex items-center gap-2" aria-label="Merifarm trang chủ">
            <img src="/logo.png" alt="Merifarm" className="h-10 w-auto object-contain md:h-11" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={desktopLinkClass} end={link.to === '/'}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Cart icon */}
            <Link
              to="/gio-hang"
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-cream text-primary-dark hover:bg-primary/10 transition-colors"
              aria-label={`Giỏ hàng${totalItems > 0 ? ` (${totalItems} sản phẩm)` : ''}`}
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-white leading-none">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-primary-dark transition-colors hover:bg-primary/10 md:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={open}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        </div>
      )}

      {/* Mobile menu drawer */}
      <div
        className={`fixed left-0 right-0 top-[57px] z-40 transform bg-white shadow-xl transition-all duration-300 md:hidden
          ${open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'}`}
      >
        <nav className="divide-y divide-soft px-4">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClass}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-soft px-4 py-3">
          <Link
            to="/lien-he"
            className="flex w-full items-center justify-center rounded-full bg-primary py-2.5 text-sm font-bold text-white"
            onClick={() => setOpen(false)}
          >
            Gửi yêu cầu tư vấn
          </Link>
        </div>
      </div>
    </>
  )
}
