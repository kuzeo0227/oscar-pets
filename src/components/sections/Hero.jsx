// ============================================
// HOMEPAGE HERO — full-viewport 5/7 split
//   LEFT (5/12): pure black, copy + badges + CTA
//   RIGHT (7/12): full-bleed product image
// ============================================
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

/* Stagger children by 0.1s */
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}

/* Three brand-appropriate certification badges */
const BADGES = [
  { topArc: 'HALAL · COMPLIANT',  center: 'HALAL' },
  { topArc: '3RD · PARTY TESTED', center: '✓'     },
  { topArc: 'GMP · PRACTICE',     center: 'GMP'   },
]

/**
 * Circular cert badge with curved top text + icon at center.
 * 72×72 ring, transparent bg, white border at 35% opacity.
 */
function CertBadge({ topArc, center }) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: 72, height: 72,
        border: '1.5px solid rgba(255,255,255,0.35)',
        borderRadius: '50%',
        background: 'transparent',
      }}
      aria-label={topArc.replace(/ · /g, ' ')}
    >
      {/* Curved arc text */}
      <svg viewBox="0 0 72 72" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          <path id={`arc-${topArc}`} d="M 10 36 A 26 26 0 0 1 62 36" fill="none" />
        </defs>
        <text
          fill="#ffffff"
          style={{ fontFamily: "'Space Mono', monospace", fontSize: 7.2, letterSpacing: '0.16em', textTransform: 'uppercase' }}
        >
          <textPath href={`#arc-${topArc}`} startOffset="50%" textAnchor="middle">
            {topArc}
          </textPath>
        </text>
      </svg>
      {/* Center label */}
      <span
        className="font-mono uppercase"
        style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', color: '#ffffff', lineHeight: 1.2 }}
      >
        {center}
      </span>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      className="relative grid grid-cols-1 lg:grid-cols-12"
      style={{ minHeight: 'calc(100vh - 96px)' }}
    >
      {/* LEFT — black copy column (5/12) */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="lg:col-span-5 flex flex-col justify-center"
        style={{
          background: '#0a0a0a',
          paddingLeft:  'clamp(24px, 7vw, 128px)',
          paddingRight: 'clamp(24px, 4vw, 64px)',
          paddingTop:    'clamp(80px, 10vh, 120px)',
          paddingBottom: 'clamp(80px, 10vh, 120px)',
        }}
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          className="font-mono uppercase"
          style={{ fontSize: 11, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.55)', marginBottom: 32 }}
        >
          THE PETS SUPPLEMENT LABORATORY
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-serif text-white"
          style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', fontWeight: 700, lineHeight: 1.15, marginBottom: 36 }}
        >
          Malaysia's 1st premium chewables,<br />
          formulated with <em className="italic">science</em>.
        </motion.h1>

        {/* Certification badges */}
        <motion.div variants={fadeUp} className="flex items-center gap-4" style={{ marginBottom: 48 }}>
          {BADGES.map(b => <CertBadge key={b.topArc} {...b} />)}
        </motion.div>

        {/* Ingredient list */}
        <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
          <p
            className="font-mono uppercase"
            style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}
          >
            RESEARCH-BACKED INGREDIENTS
          </p>
          <ul className="font-serif italic" style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.9 }}>
            {['Probiotics Blend', 'Prebiotics Blend', 'Postbiotics Yeast Blend'].map(name => (
              <li
                key={name}
                style={{ fontWeight: 400, fontSize: 'clamp(15px, 1.4vw, 18px)' }}
              >
                {name}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CFU metric */}
        <motion.div variants={fadeUp} className="flex items-baseline gap-2" style={{ marginBottom: 40 }}>
          <span
            className="font-mono num-mono text-white"
            style={{ fontSize: 'clamp(24px, 2.4vw, 34px)', fontWeight: 700 }}
          >
            3 Billion
          </span>
          <span
            className="font-mono uppercase"
            style={{ fontSize: 12, fontWeight: 400, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.55)' }}
          >
            CFU
          </span>
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeUp} className="self-start">
          <Link to="/product">
            <button
              className="font-mono uppercase cursor-pointer transition-colors"
              style={{
                background: '#ffffff', color: '#0a0a0a',
                fontSize: 12, fontWeight: 700, letterSpacing: '0.22em',
                padding: '16px 32px',
                border: 0, borderRadius: 0,
                transitionDuration: '200ms',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.85)')}
              onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}
            >
              Shop now →
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* RIGHT — full-bleed product image (7/12) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease, delay: 0.2 }}
        className="lg:col-span-7 relative overflow-hidden"
        style={{ minHeight: '50vh', background: '#0a0a0a' }}
      >
        {/*
          TODO: save the attached reference image to /public/assets/hero-product.jpg
          For now, /assets/jar-front.jpg renders as a working fallback.
        */}
        <img
          src="/assets/hero-product.jpg"
          alt="Oscar Probiotic Chews — multiple jars"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: 'center' }}
          onError={e => { e.currentTarget.src = '/assets/jar-front.jpg' }}
          draggable={false}
        />
      </motion.div>
    </section>
  )
}
