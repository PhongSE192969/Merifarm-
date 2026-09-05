import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { to: '/', label: 'Trang chủ' },
  { to: '/gioi-thieu', label: 'Giới thiệu' },
  { to: '/san-pham', label: 'Sản phẩm' },
  { to: '/kien-thuc-nha-nong', label: 'Kiến thức nhà nông' },
  { to: '/lien-he', label: 'Liên hệ' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = ['/', '/gioi-thieu'].includes(location.pathname)

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
      isHome
        ? isActive
          ? 'text-white after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-accent-light'
          : 'text-white/90 hover:text-white'
        : isActive
          ? 'text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-primary'
          : 'text-[#1C1C1C] hover:text-primary'
    }`

  return (
    <>
      <header
        className={`top-0 z-50 w-full transition-colors ${
          isHome
            ? 'absolute border-b border-white/15 bg-black/10 backdrop-blur-[2px]'
            : 'sticky border-b border-black/5 bg-white/95 backdrop-blur'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2" aria-label="Merifarm trang chủ">
            <img src="/logo.png" alt="Phân Bón Merifarm" className="h-10 w-auto object-contain md:h-11" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center justify-center gap-6 md:flex lg:gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={desktopLinkClass} end={link.to === '/'}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Hamburger */}
            <button
              type="button"
              className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden ${
                isHome ? 'text-white hover:bg-white/15' : 'text-primary-dark hover:bg-primary/10'
              }`}
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
            className="flex w-full items-center justify-center rounded-full border border-primary bg-white py-2.5 text-sm font-bold text-primary hover:bg-primary hover:text-white transition-colors"
            onClick={() => setOpen(false)}
          >
            Gửi yêu cầu tư vấn
          </Link>
        </div>
      </div>
    </>
  )
}
