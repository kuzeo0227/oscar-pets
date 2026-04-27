// ============================================
// SHOPIFY SECTION: NAVIGATION
// Copy everything between these comments into
// a new Shopify custom section
// ============================================
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

const links = [
  { label: 'Home',    to: '/' },
  { label: 'Shop',    to: '/shop' },
  { label: 'About',   to: '/about' },
  { label: 'Science', to: '/science' },
]

export default function Nav() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const { count, setDrawer }          = useCart()
  const location                      = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-30 h-[72px] flex items-center transition-all duration-300 border-b border-[#EFE0C0] ${
          scrolled ? 'bg-white/85 backdrop-blur-md shadow-[0_2px_20px_rgba(28,43,74,0.06)]' : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex items-center justify-between gap-8">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 bg-[#1C2B4A] rounded-md flex items-center justify-center">
              <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
                <polygon points="16,4 28,12 28,24 16,28 4,24 4,12" fill="#C8812E" />
                <polygon points="16,9 22,15 16,22 10,15" fill="white" />
              </svg>
            </div>
            <span className="font-logo text-xl text-[#1C2B4A]">oscar pets</span>
          </Link>

          {/* Centered links — desktop */}
          <ul className="hidden md:flex items-center gap-9 mx-auto">
            {links.map(link => {
              const active = link.to === '/' ? location.pathname === '/' : location.pathname.startsWith(link.to)
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`relative font-montserrat font-medium text-sm transition-colors ${
                      active ? 'text-[#1C2B4A]' : 'text-[#6B6258] hover:text-[#1C2B4A]'
                    } group inline-block py-2`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 right-0 h-[3px] rounded-full bg-[#C8812E] origin-left transition-transform duration-300 ${
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Right icons */}
          <div className="flex items-center gap-5 flex-shrink-0">
            <button className="hidden md:flex text-[#1C2B4A] hover:text-[#C8812E] transition-colors">
              <Search size={20} strokeWidth={1.75} />
            </button>
            <button className="hidden md:flex text-[#1C2B4A] hover:text-[#C8812E] transition-colors">
              <User size={20} strokeWidth={1.75} />
            </button>
            <button
              onClick={() => setDrawer(true)}
              className="relative text-[#1C2B4A] hover:text-[#C8812E] transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart size={20} strokeWidth={1.75} />
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  className="absolute -top-2 -right-2 min-w-[16px] h-4 px-1 bg-[#C8812E] text-white text-[10px] font-montserrat font-black rounded-full flex items-center justify-center"
                >
                  {count}
                </motion.span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-[#1C2B4A] hover:text-[#C8812E] transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-[#1C2B4A]/40 z-40"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed top-0 left-0 h-full w-[80%] max-w-xs bg-white z-50 flex flex-col shadow-2xl"
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            >
              <div className="flex items-center justify-between px-6 h-[72px] border-b border-[#EFE0C0]">
                <span className="font-logo text-xl text-[#1C2B4A]">oscar pets</span>
                <button onClick={() => setMobileOpen(false)} className="text-[#1C2B4A]">
                  <X size={22} />
                </button>
              </div>
              <nav className="flex flex-col px-6 pt-6 gap-1">
                {links.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                  >
                    <Link
                      to={link.to}
                      className="block font-baskerville font-bold text-2xl text-[#1A1610] py-4 border-b border-[#EFE0C0] hover:text-[#C8812E] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
// ============================================
// END SHOPIFY SECTION: NAVIGATION
// ============================================
