// ============================================
// HOMEPAGE HERO — single full-bleed image + one SHOP NOW button.
// All copy lives inside the image itself.
// ============================================
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      <img
        src="/assets/hero-product.jpg"
        alt="Oscar Pets — Malaysia's 1st premium chewables"
        style={{
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
        }}
      />

      <Link
        to="/product"
        style={{
          position: 'absolute',
          bottom: 'clamp(40px, 6vh, 72px)',
          left:   'clamp(24px, 7vw, 128px)',
        }}
      >
        <button
          className="cursor-pointer transition-colors"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 12,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            background: '#ffffff',
            color: '#0a0a0a',
            borderRadius: 0,
            padding: '16px 32px',
            border: 'none',
            transitionDuration: '200ms',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.85)')}
          onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}
        >
          Shop now →
        </button>
      </Link>
    </section>
  )
}
