// ============================================
// HOMEPAGE HERO — full-bleed photo with centered wordmark lockup,
// play button, sub-copy, and two pill CTAs. Matches the reference comp.
// ============================================
import { useState } from 'react'
import { Link } from 'react-router-dom'

const MONO = "'Space Mono', monospace"

export default function Hero() {
  const [hovShop, setHovShop] = useState(false)
  const [hovLearn, setHovLearn] = useState(false)
  const [hovPlay, setHovPlay] = useState(false)

  return (
    <section
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Full-bleed background photo */}
      <img
        src="/assets/oscar-homepage.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          display: 'block',
        }}
        onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/assets/hero-product.png' }}
      />
      {/* Soft scrim for text legibility against bright sky */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.18) 100%)' }} />

      {/* Centered lockup */}
      <div
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center',
          paddingInline: 'clamp(24px, 6vw, 96px)',
        }}
      >
        {/* Wordmark */}
        <h1
          style={{
            fontFamily: "'Montserrat', system-ui, sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(44px, 8vw, 112px)',
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
            color: '#ffffff',
            margin: 0,
            textShadow: '0 2px 24px rgba(0,0,0,0.25)',
          }}
        >
          oscar pets lab.
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontFamily: MONO,
            fontSize: 'clamp(11px, 1.4vw, 18px)',
            letterSpacing: '0.34em',
            textTransform: 'uppercase',
            color: '#ffffff',
            marginTop: 'clamp(12px, 1.6vw, 22px)',
            textShadow: '0 1px 12px rgba(0,0,0,0.3)',
          }}
        >
          The Pets Supplement Laboratory
        </p>

        {/* Play button */}
        <button
          aria-label="Play intro"
          onMouseEnter={() => setHovPlay(true)}
          onMouseLeave={() => setHovPlay(false)}
          style={{
            marginTop: 'clamp(28px, 3.5vw, 48px)',
            width: 'clamp(56px, 5vw, 72px)',
            height: 'clamp(56px, 5vw, 72px)',
            borderRadius: '50%',
            border: 0,
            background: hovPlay ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.42)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 200ms cubic-bezier(0.22,1,0.36,1)',
            backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)',
          }}
        >
          <span style={{
            display: 'block',
            width: 0, height: 0,
            borderTop: '9px solid transparent',
            borderBottom: '9px solid transparent',
            borderLeft: '15px solid #ffffff',
            marginLeft: 4,
          }} />
        </button>

        {/* Sub-copy */}
        <p
          style={{
            fontFamily: "'Montserrat', system-ui, sans-serif",
            fontSize: 'clamp(14px, 1.5vw, 18px)',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.92)',
            lineHeight: 1.5,
            maxWidth: '40ch',
            marginTop: 'clamp(40px, 6vw, 88px)',
            textShadow: '0 1px 14px rgba(0,0,0,0.35)',
          }}
        >
          We make pet supplements that are entirely formulated by science and research.
        </p>

        {/* Pill CTAs */}
        <div style={{ display: 'flex', gap: 'clamp(12px, 1.4vw, 20px)', marginTop: 'clamp(20px, 2.4vw, 32px)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            to="/product"
            onMouseEnter={() => setHovShop(true)}
            onMouseLeave={() => setHovShop(false)}
            style={{
              fontFamily: "'Montserrat', system-ui, sans-serif",
              fontSize: 'clamp(14px, 1.3vw, 16px)',
              fontWeight: 500,
              color: '#ffffff',
              textDecoration: 'none',
              background: hovShop ? 'rgba(255,255,255,0.30)' : 'rgba(255,255,255,0.18)',
              border: '1px solid rgba(255,255,255,0.35)',
              borderRadius: 9999,
              padding: 'clamp(11px, 1.1vw, 14px) clamp(26px, 2.4vw, 36px)',
              backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
              transition: 'background 200ms cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            Shop Now
          </Link>
          <Link
            to="/about"
            onMouseEnter={() => setHovLearn(true)}
            onMouseLeave={() => setHovLearn(false)}
            style={{
              fontFamily: "'Montserrat', system-ui, sans-serif",
              fontSize: 'clamp(14px, 1.3vw, 16px)',
              fontWeight: 500,
              color: '#ffffff',
              textDecoration: 'none',
              background: hovLearn ? 'rgba(255,255,255,0.30)' : 'rgba(255,255,255,0.18)',
              border: '1px solid rgba(255,255,255,0.35)',
              borderRadius: 9999,
              padding: 'clamp(11px, 1.1vw, 14px) clamp(26px, 2.4vw, 36px)',
              backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
              transition: 'background 200ms cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}
