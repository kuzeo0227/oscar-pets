const CERTS = [
  { icon: '✓', l1: 'HALAL',     l2: 'COMPLIANT' },
  { icon: '◎', l1: '3RD PARTY', l2: 'TESTED'    },
  { icon: '⬡', l1: 'GMP',       l2: 'PRACTICE'  },
  { icon: '◈', l1: 'HACCP',     l2: 'CERTIFIED' },
]

/**
 * CertBanner — full-bleed dark banner with bg image, gradient overlay,
 * centered headline + 4 cert badges. Intentionally NOT contained — image
 * fills viewport edge-to-edge.
 */
export default function CertBanner() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: 'clamp(620px, 70vw, 960px)', background: '#0a0a0a' }}
    >
      <img
        src="/assets/cert-banner.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          transform: 'scale(1.18)',
          transformOrigin: 'center',
          zIndex: 0,
        }}
        draggable={false}
        onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/assets/hero-product.png' }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)',
          zIndex: 1,
        }}
      />
      <div
        className="relative flex flex-col items-center justify-center text-center"
        style={{
          zIndex: 2,
          minHeight: 'clamp(620px, 70vw, 960px)',
          padding: 'clamp(64px, 10vh, 128px) clamp(24px, 6vw, 96px)',
        }}
      >
        <h2
          className="font-serif"
          style={{
            fontSize: 'clamp(28px, 3.6vw, 52px)',
            fontWeight: 700, color: '#ffffff', lineHeight: 1.2,
            maxWidth: 720, margin: '0 auto',
          }}
        >
          Internationally certified with<br />
          the <em className="italic">highest standards</em>
        </h2>
        <div className="flex flex-wrap justify-center items-center" style={{ gap: 'clamp(24px, 4vw, 56px)', marginTop: 64 }}>
          {CERTS.map(c => (
            <div key={c.l1} className="flex flex-col items-center justify-center"
              style={{
                width: 84, height: 84,
                border: '1.5px solid rgba(255,255,255,0.45)',
                background: 'rgba(0,0,0,0.2)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                borderRadius: '50%',
              }}
            >
              <span style={{ fontSize: 16, color: '#ffffff', lineHeight: 1, marginBottom: 4 }}>{c.icon}</span>
              <span className="font-mono uppercase text-center"
                style={{ fontSize: 9, letterSpacing: '0.16em', color: '#ffffff', lineHeight: 1.4 }}>
                {c.l1}<br />{c.l2}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
