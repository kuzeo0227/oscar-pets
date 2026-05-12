const LIFESTYLE = [
  '/assets/oscar-product6.png',
  '/assets/oscar-product7.png',
  '/assets/oscar-product5.png',
]

/**
 * LifestyleGrid — 3 edge-to-edge lifestyle photos. Intentionally NOT contained.
 */
export default function LifestyleGrid() {
  return (
    <section style={{ background: '#ffffff', borderTop: '1px solid var(--color-rule)' }}>
      <div className="grid grid-cols-3" style={{ gap: 0 }}>
        {LIFESTYLE.map((src, i) => (
          <div key={i} style={{ width: '33.333vw', aspectRatio: '1 / 1', overflow: 'hidden', background: '#0a0a0a' }}>
            <img src={src} alt="" className="w-full h-full object-cover" style={{ objectPosition: 'center' }}
              loading="lazy" draggable={false}
              onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/assets/jar-front.jpg' }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
