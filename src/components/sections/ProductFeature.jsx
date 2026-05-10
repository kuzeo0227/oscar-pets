// ============================================
// SHOPIFY SECTION: PRODUCT FEATURE
// ============================================
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const benefits = [
  { label: 'Scientifically Formulated', desc: 'Every strain and compound backed by peer-reviewed studies.' },
  { label: 'Healthy Ingredients',       desc: 'Real Lamb Liver & Pumpkin — no artificial fillers.' },
  { label: "Malaysia's 1st Premium Chew", desc: 'First of its kind in the Malaysian pet supplement market.' },
]

const stats = [
  { value: '3 BILLION CFU',  sub: 'PER CHEW' },
  { value: 'LAMB & PUMPKIN', sub: 'PREMIUM INGREDIENTS' },
  { value: 'S/M BREEDS',     sub: 'LAB-FORMULATED' },
]

const badges = [
  '1ST MALAYSIAN PREMIUM CHEW',
  '94% POSITIVE RATINGS',
  'HACCP CERTIFIED',
  'GMP PRACTICE',
  'ISO CERTIFIED',
]

const ease = [0.22, 1, 0.36, 1]

export default function ProductFeature() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="oscar-section py-24 lg:py-32" style={{ background: 'var(--color-paper-soft)' }}>
      <div className="container-edge mx-auto">
        <div className="grid lg:grid-cols-2 lg:gap-x-12 gap-y-14 items-center">

          {/* LEFT — product image */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="relative"
          >
            <div className="relative overflow-hidden aspect-square max-w-md mx-auto" style={{ background: 'var(--color-paper-soft)' }}>
              <img
                src="/assets/jar-front.jpg"
                alt="Oscar Probiotic Blend Chewables — 60 chews jar"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: 'center 78%', transform: 'scale(1.18)' }}
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[14%]" style={{ background: 'var(--color-paper-soft)' }} />
            </div>
          </motion.div>

          {/* RIGHT — info column */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* Eyebrow */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="eyebrow mb-6"
              style={{ color: '#6b6b6b' }}
            >
              01 — PRODUCT SPOTLIGHT
            </motion.p>

            {/* H2 — Libre Baskerville with italic <em> */}
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
              className="font-serif text-[#0a0a0a]"
              style={{ fontSize: 'clamp(36px, 4.4vw, 56px)', fontWeight: 700, lineHeight: 1.05 }}
            >
              Probiotic Blend Chewables, <em className="italic">made right</em>.
            </motion.h2>

            {/* Sub-label */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="font-serif italic mt-3"
              style={{ fontSize: 16, color: '#6b6b6b' }}
            >
              Lamb Liver & Pumpkin Mix
            </motion.p>

            {/* Feature rows */}
            <div className="mt-10 flex flex-col" style={{ borderTop: '1px solid var(--color-rule)' }}>
              {benefits.map(({ label, desc }) => (
                <motion.div
                  key={label}
                  variants={{ hidden: { opacity: 0, x: 16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}
                  className="grid grid-cols-[3rem_1fr] gap-4 items-baseline py-5"
                  style={{ borderBottom: '1px solid var(--color-rule)' }}
                >
                  <span className="font-mono num-mono text-[#0a0a0a]" style={{ fontSize: 13, fontWeight: 700 }}>·</span>
                  <div>
                    <p className="font-display text-[#0a0a0a]" style={{ fontSize: 14, fontWeight: 600 }}>{label}</p>
                    <p className="font-display mt-1" style={{ fontSize: 13, fontWeight: 400, color: '#6b6b6b', lineHeight: 1.65 }}>{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Metric pills — Space Mono, no rounded */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="grid grid-cols-3 gap-2 mt-8"
            >
              {stats.map(({ value, sub }) => (
                <div key={value} className="px-4 py-3 text-center" style={{ background: '#0a0a0a' }}>
                  <p className="font-mono text-white" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em' }}>{value}</p>
                  <p className="font-mono mt-1" style={{ fontSize: 9, fontWeight: 400, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.55)' }}>{sub}</p>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="mt-8"
            >
              <Link to="/product">
                <motion.button
                  whileHover={{ background: '#2a2a2a' }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center font-mono uppercase"
                  style={{
                    background: '#0a0a0a', color: '#ffffff',
                    fontSize: 12, fontWeight: 700, letterSpacing: '0.22em',
                    padding: '14px 32px', borderRadius: 0,
                  }}
                >
                  View Product
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3"
        >
          {badges.map(badge => (
            <span
              key={badge}
              className="font-mono"
              style={{ fontSize: 11, fontWeight: 400, letterSpacing: '0.18em', color: '#6b6b6b' }}
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
// ============================================
// END SHOPIFY SECTION: PRODUCT FEATURE
// ============================================
