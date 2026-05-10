/**
 * Sticky section-anchor nav for the /product page.
 * Pure CSS sticky — no scroll listener, no JS, no animation on top value.
 * Sits 96px below the viewport top to clear the global NavHeader.
 *
 * Performance notes:
 *  - will-change: transform + transform: translateZ(0) promote to its own
 *    composite layer so scrolling doesn't trigger paint of surrounding content.
 *  - backface-visibility: hidden eliminates flicker on Safari.
 *  - z-index: 40 (below NavHeader's 50, above section content).
 */
const SECTIONS = [
  { id: 'hero',        label: 'Product Info' },
  { id: 'vet',         label: 'Vet Reviewed' },
  { id: 'ingredients', label: 'Key Ingredients' },
  { id: 'directions',  label: 'Directions For Use' },
  { id: 'benefits',    label: 'Product Benefits' },
  { id: 'expect',      label: 'What To Expect' },
  { id: 'faq',         label: 'FAQ' },
]

export default function PdpTopNav() {
  return (
    <div
      className="bg-white"
      style={{
        position: 'sticky',
        top: 96,                          // matches NavHeader height
        zIndex: 40,                       // below NavHeader (50), above content
        borderBottom: '1px solid var(--color-rule)',
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <nav
        className="container-edge mx-auto py-3 flex items-center justify-center gap-x-8 lg:gap-x-12 overflow-x-auto"
        style={{ scrollbarWidth: 'none' }}
        aria-label="Section navigation"
      >
        {SECTIONS.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="font-mono uppercase whitespace-nowrap"
            style={{
              fontSize: 11, fontWeight: 400, letterSpacing: '0.18em',
              color: '#6b6b6b',
              paddingBottom: 4,
              borderBottom: '2px solid transparent',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#0a0a0a'; e.currentTarget.style.borderBottomColor = '#0a0a0a' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6b6b6b'; e.currentTarget.style.borderBottomColor = 'transparent' }}
          >
            {s.label}
          </a>
        ))}
      </nav>
    </div>
  )
}
