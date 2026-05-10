// ============================================
// HOMEPAGE HERO — full-bleed background image + left text overlay
// ============================================
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

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
      className="relative w-full overflow-hidden"
      style={{ minHeight: 'calc(100vh - 96px)' }}
    >
      {/* Full-bleed background image */}
      <img
        src="/assets/hero-product.jpg"
        alt="Oscar Probiotic Chews — multiple jars"
        onError={e => { e.currentTarget.src = '/assets/jar-front.jpg' }}
        draggable={false}
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: 'cover',
          objectPosition: 'center right',
          zIndex: 0,
        }}
      />

      {/* Left text overlay */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="absolute"
        style={{
          top: '50%',
          left: 'clamp(24px, 7vw, 128px)',
          transform: 'translateY(-50%)',
          maxWidth: 480,
          zIndex: 10,
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

        {/* Cert badges */}
        <motion.div variants={fadeUp} className="flex items-center gap-4" style={{ marginBottom: 48 }}>
          {BADGES.map(b => <CertBadge key={b.topArc} {...b} />)}
        </motion.div>

        {/* Ingredient list */}
        <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              fontWeight: 400,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 12,
            }}
          >
            RESEARCH-BACKED INGREDIENTS
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {['Probiotics Blend', 'Prebiotics Blend', 'Postbiotics Yeast Blend'].map(name => (
              <li
                key={name}
                style={{
                  fontFamily: "'Libre Baskerville', Georgia, serif",
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(15px, 1.4vw, 18px)',
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.9,
                }}
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
    </section>
  )
}
