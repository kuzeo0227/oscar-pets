// ============================================
// SHOPIFY SECTION: PRODUCT FEATURE (homepage spotlight)
// FinalCTA-style two-column layout: jar left (5/12) + spotlight right (6/12).
// ============================================
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const FEATURES = [
  { label: 'Scientifically Formulated',   desc: 'Every strain and compound backed by peer-reviewed studies.' },
  { label: 'Healthy Ingredients',         desc: 'Real Lamb Liver & Pumpkin — no artificial fillers.' },
  { label: "Malaysia's 1st Premium Chew", desc: 'First of its kind in the Malaysian pet supplement market.' },
]

const METRICS = [
  { value: '3 BILLION CFU',  sub: 'PER CHEW' },
  { value: 'LAMB & PUMPKIN', sub: 'PREMIUM INGREDIENTS' },
  { value: 'S/M BREEDS',     sub: 'LAB-FORMULATED' },
]

export default function ProductFeature() {
  return (
    <section
      className="relative"
      style={{ background: 'var(--color-paper)' }}
    >
      <div className="container-edge mx-auto py-24 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-y-16 lg:grid-cols-12 lg:gap-x-16">

          {/* LEFT — jar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, ease }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden">
              <img
                src="/assets/jar-front.jpg"
                alt="Oscar Probiotic Chews — 60 chews"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: 'center 78%', transform: 'scale(1.18)' }}
                draggable={false}
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0"
                style={{ height: '14%', background: 'var(--color-paper)' }}
              />
            </div>
          </motion.div>

          {/* RIGHT — product spotlight panel */}
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow" style={{ color: '#6b6b6b', marginBottom: 24 }}>
              01 — PRODUCT SPOTLIGHT
            </p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, ease }}
              className="font-serif text-[#0a0a0a]"
              style={{ fontSize: 'clamp(36px, 4.4vw, 56px)', fontWeight: 700, lineHeight: 1.05 }}
            >
              Probiotic Blend Chewables, <em className="italic">made right</em>.
            </motion.h2>

            <p className="font-serif italic mt-2" style={{ fontSize: 16, color: '#6b6b6b' }}>
              Lamb Liver & Pumpkin Mix
            </p>

            {/* Feature rows */}
            <div className="mt-10 flex flex-col" style={{ borderTop: '1px solid var(--color-rule)' }}>
              {FEATURES.map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease }}
                  className="grid grid-cols-[2rem_1fr] gap-3 items-baseline py-5"
                  style={{ borderBottom: '1px solid var(--color-rule)' }}
                >
                  <span className="font-mono num-mono" style={{ fontSize: 16, fontWeight: 700, color: '#0a0a0a' }}>·</span>
                  <div>
                    <p className="font-display text-[#0a0a0a]" style={{ fontSize: 14, fontWeight: 600 }}>
                      {row.label}
                    </p>
                    <p className="font-display mt-1" style={{ fontSize: 13, fontWeight: 400, color: '#6b6b6b', lineHeight: 1.65 }}>
                      {row.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Metric pills */}
            <div className="grid grid-cols-3 gap-2 mt-8">
              {METRICS.map(m => (
                <div
                  key={m.value}
                  className="text-center"
                  style={{ background: '#0a0a0a', borderRadius: 0, padding: '12px 8px' }}
                >
                  <p className="font-mono uppercase" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#ffffff' }}>
                    {m.value}
                  </p>
                  <p className="font-mono mt-1 uppercase" style={{ fontSize: 9, fontWeight: 400, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.55)' }}>
                    {m.sub}
                  </p>
                </div>
              ))}
            </div>

            {/* VIEW PRODUCT button */}
            <div className="mt-10">
              <Link to="/product">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-3 font-mono uppercase text-white transition-colors duration-300"
                  style={{
                    background: '#0a0a0a',
                    fontSize: 12, letterSpacing: '0.22em', fontWeight: 700,
                    padding: '16px 32px',
                    borderRadius: 0,
                    border: 0,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#2a2a2a')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#0a0a0a')}
                >
                  View Product
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </motion.button>
              </Link>
            </div>

            {/* Assurance line */}
            <p
              className="mt-6 font-mono uppercase"
              style={{ fontSize: 11, letterSpacing: '0.14em', color: '#6b6b6b' }}
            >
              30-day money-back guarantee · Free shipping on subscriptions
            </p>
          </div>
        </div>
      </div>
      <div style={{ height: 1, background: 'var(--color-rule)' }} />
    </section>
  )
}
// ============================================
// END SHOPIFY SECTION: PRODUCT FEATURE
// ============================================
