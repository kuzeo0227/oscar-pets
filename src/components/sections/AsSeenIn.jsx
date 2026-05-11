const PRESS = ['THE EDGE MALAYSIA', 'THE STAR', 'BUSINESSTODAY', 'FORBES']

export default function AsSeenIn() {
  return (
    <section style={{
      background: '#ffffff',
      borderTop: '1px solid var(--color-rule)',
      borderBottom: '1px solid var(--color-rule)',
    }}>
      <div className="section-container text-center" style={{ padding: '64px 0' }}>
        <div className="section-container text-center">
          <p className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: '0.18em', color: '#6b6b6b', marginBottom: 28 }}>
            AS SEEN IN
          </p>
          <div className="flex flex-wrap justify-center items-center" style={{ gap: 'clamp(32px, 6vw, 80px)' }}>
            {PRESS.map(name => (
              <span key={name} className="font-display uppercase"
                style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', color: '#0a0a0a', opacity: 0.7 }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
