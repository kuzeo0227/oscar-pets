// ============================================
// SHOPIFY SECTION: FOOTER
// ============================================
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const cols = [
  {
    heading: 'SHOP',
    links: [
      { label: 'Probiotic Blend Chewables', to: '/product' },
      { label: 'All Products',              to: '/product' },
    ],
  },
  {
    heading: 'COMPANY',
    links: [
      { label: 'About Us',    to: '/about'   },
      { label: 'Our Science', to: '/science' },
      { label: 'Blog',        to: '/science' },
    ],
  },
  {
    heading: 'LEGAL',
    links: [
      { label: 'Privacy Policy',   to: '/' },
      { label: 'Terms of Service', to: '/' },
      { label: 'Refund Policy',    to: '/' },
    ],
  },
]

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <footer
      ref={ref}
      className="oscar-section text-white"
      style={{ background: '#0a0a0a' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="container-edge mx-auto pt-20 pb-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-5">
              <img
                src="/assets/oscar-wordmark.png"
                alt="Oscar"
                className="h-9 w-auto select-none"
                draggable={false}
                style={{ filter: 'invert(1)' }}
              />
            </Link>
            <p className="font-display max-w-xs mb-7" style={{ fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>
              Malaysia's 1st premium probiotic chewable for dogs. Science-backed. Halal compliant. Tropical-stable.
            </p>
            <div className="flex gap-3">
              {['IG', 'FB', 'YT'].map((label) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ background: '#ffffff', color: '#0a0a0a' }}
                  className="font-mono inline-flex items-center justify-center"
                  style={{
                    width: 36, height: 36,
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.18em',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {cols.map(col => (
            <div key={col.heading}>
              <p className="font-mono mb-5" style={{ fontSize: 11, fontWeight: 400, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.55)' }}>
                {col.heading}
              </p>
              <ul className="space-y-3">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="font-display"
                      style={{ fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,0.7)', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider + bottom strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="font-mono text-center md:text-left" style={{ fontSize: 11, fontWeight: 400, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.4)' }}>
            © 2025 OSCAR PETS. ALL RIGHTS RESERVED. DVS REGISTERED. HALAL COMPLIANT.
          </p>
          <div className="flex gap-3">
            {['HACCP', 'GMP', 'ISO'].map(cert => (
              <span
                key={cert}
                className="font-mono"
                style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.22em',
                  color: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '5px 12px',
                }}
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
// ============================================
// END SHOPIFY SECTION: FOOTER
// ============================================
