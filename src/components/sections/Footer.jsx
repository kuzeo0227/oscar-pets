// ============================================
// SHOPIFY SECTION: FOOTER
// Copy everything between these comments into
// a new Shopify custom section
// ============================================
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Share2, Heart, Play } from 'lucide-react'

const cols = [
  {
    heading: 'Shop',
    links: [
      { label: 'Probiotic Blend Chewables', to: '/product/probiotic-blend' },
      { label: 'All Products',              to: '/shop' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us',  to: '/about' },
      { label: 'Our Science', to: '/science' },
      { label: 'Blog',      to: '/science' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy',    to: '/' },
      { label: 'Terms of Service',  to: '/' },
      { label: 'Refund Policy',     to: '/' },
    ],
  },
]

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <footer ref={ref} className="oscar-section section-ink text-white">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-[#0a0a0a] rounded-sm flex items-center justify-center">
                <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
                  <polygon points="16,4 28,12 28,24 16,28 4,24 4,12" fill="white" />
                  <polygon points="16,8 22,14 16,22 10,14" fill="#1A1A18" />
                </svg>
              </div>
              <span className="font-antapani text-xl text-white tracking-tight">oscar pets</span>
            </Link>
            <p className="font-montserrat font-light text-sm text-white/60 leading-relaxed max-w-xs mb-6">
              Malaysia's 1st premium probiotic chewable for dogs. Science-backed. Halal compliant. Tropical-stable.
            </p>
            <div className="flex gap-4">
              {[Share2, Heart, Play].map((Icon, i) => (
                <motion.a
                  key={i} href="#"
                  whileHover={{ scale: 1.1, color: '#0a0a0a' }}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-[#0a0a0a] hover:border-[#0a0a0a] transition-colors"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {cols.map(col => (
            <div key={col.heading}>
              <p className="font-montserrat font-black text-xs uppercase tracking-[0.2em] text-[#0a0a0a] mb-5">
                {col.heading}
              </p>
              <ul className="space-y-3">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="font-montserrat font-light text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-montserrat font-light text-xs text-white/40 text-center md:text-left">
            Â© 2025 Oscar Pets. All rights reserved. DVS Registered. Halal Compliant.
          </p>
          <div className="flex gap-4">
            <span className="font-montserrat font-semibold text-xs text-[#0a0a0a] border border-[#0a0a0a]/40 px-3 py-1 rounded-full">HACCP</span>
            <span className="font-montserrat font-semibold text-xs text-[#0a0a0a] border border-[#0a0a0a]/40 px-3 py-1 rounded-full">GMP</span>
            <span className="font-montserrat font-semibold text-xs text-[#0a0a0a] border border-[#0a0a0a]/40 px-3 py-1 rounded-full">ISO</span>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
// ============================================
// END SHOPIFY SECTION: FOOTER
// ============================================
