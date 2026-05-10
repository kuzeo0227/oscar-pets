// ============================================
// HOMEPAGE HERO — single full-bleed image + one SHOP NOW button.
// All copy lives inside the image itself.
// ============================================
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
      <img
        src="/assets/hero-product.png?v=2"
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
          bottom: 'clamp(96px, 14vh, 168px)',
          left:   'clamp(24px, 7vw, 128px)',
        }}
      >
        <button
          className="cursor-pointer transition-colors"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 15,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            background: '#0a0a0a',
            color: '#ffffff',
            borderRadius: 0,
            padding: '20px 40px',
            border: 'none',
            transitionDuration: '200ms',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#2a2a2a')}
          onMouseLeave={e => (e.currentTarget.style.background = '#0a0a0a')}
        >
          Shop now →
        </button>
      </Link>
    </section>
  )
}
