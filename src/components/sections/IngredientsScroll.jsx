import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const INGREDIENTS = [
  { name: 'Probiotic Blend',         metric: '3B CFU · PER CHEW',         short: 'Spore-forming probiotics that survive heat and gastric acid.', image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=300&h=400&fit=crop' },
  { name: 'Pumpkin Fibers',          metric: '100MG · DIETARY FIBER',     short: 'Soluble + insoluble fiber blend that feeds beneficial bacteria.', image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=300&h=400&fit=crop' },
  { name: 'Lamb Liver',              metric: 'SINGLE-SOURCE · FREEZE-DRIED', short: 'Nutrient-dense protein with bioavailable iron and B-vitamins.', image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300&h=400&fit=crop' },
  { name: 'Coconut Oil',             metric: 'COLD-PRESSED · VIRGIN',     short: 'MCT-rich carrier oil supporting skin, coat and energy.', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=400&fit=crop' },
  { name: 'Fructooligosaccharides',  metric: 'FOS · PREBIOTIC FIBER',     short: 'Plant-derived prebiotic that selectively feeds Bifidobacteria.', image: 'https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=300&h=400&fit=crop' },
  { name: 'Galactooligosaccharide',  metric: 'GOS · BROAD-SPECTRUM',      short: 'Second-generation prebiotic complementing FOS across the gut.', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=400&fit=crop' },
  { name: 'Postbiotic Yeast Blend',  metric: 'HEAT-STABLE · NO COLD CHAIN', short: 'Yeast metabolites + beta-glucans for shelf-stable immune support.', image: 'https://images.unsplash.com/photo-1614631446501-abcf76949eca?w=300&h=400&fit=crop' },
  { name: 'Sunflower Oil',           metric: 'HIGH-OLEIC · EXPELLER-PRESSED', short: 'Stable carrier oil rich in oleic acid and natural vitamin E.', image: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?w=300&h=400&fit=crop' },
]

/* Inline SVG fallback for any image that fails to load */
const fallback = (name) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400">
      <rect width="300" height="400" fill="#f6f5f1"/>
      <text x="150" y="208" text-anchor="middle"
            font-family="'Space Mono', monospace" font-size="14" font-weight="700"
            letter-spacing="3" fill="#0a0a0a">${name.toUpperCase()}</text>
    </svg>`
  )}`

export default function IngredientsScroll() {
  const trackRef     = useRef(null)
  const scrollbarRef = useRef(null)
  const [thumb, setThumb] = useState({ left: 0, width: 20 })

  // Sync scrollbar thumb to track scroll position
  function onScroll() {
    const el = trackRef.current
    if (!el) return
    const scrollable = el.scrollWidth - el.clientWidth
    if (scrollable <= 0) return
    const pct = el.scrollLeft / scrollable
    const visiblePct = (el.clientWidth / el.scrollWidth) * 100
    const thumbW = Math.max(visiblePct, 10)
    const leftPct = pct * (100 - thumbW)
    setThumb({ left: leftPct, width: thumbW })
  }

  useEffect(() => {
    onScroll()
    const ro = new ResizeObserver(onScroll)
    if (trackRef.current) ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [])

  // Click on scrollbar track scrolls proportionally
  function onBarClick(e) {
    const bar = scrollbarRef.current
    const track = trackRef.current
    if (!bar || !track) return
    const rect = bar.getBoundingClientRect()
    const clickPct = (e.clientX - rect.left) / rect.width
    const max = track.scrollWidth - track.clientWidth
    track.scrollTo({ left: clickPct * max, behavior: 'smooth' })
  }

  return (
    <section style={{ background: '#ffffff' }}>
      <div className="container-edge mx-auto pt-20 lg:pt-28">
        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-12 gap-y-6 mb-10">
          <div className="lg:col-span-6">
            <p className="eyebrow" style={{ color: '#6b6b6b', marginBottom: 16 }}>
              03 — ACTIVE INGREDIENTS
            </p>
            <h2
              className="font-serif text-[#0a0a0a]"
              style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', fontWeight: 700, lineHeight: 1.1 }}
            >
              Research-backed <em className="italic">active ingredients.</em>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p
              className="font-display"
              style={{ fontSize: 14.5, fontWeight: 400, color: '#6b6b6b', lineHeight: 1.7 }}
            >
              We believe there are no shortcuts in supplement formulation. Every active compound is selected from peer-reviewed canine studies — no fillers, no padding, no ingredients that can't justify their presence.
            </p>
          </div>
        </div>
      </div>

      {/* Edge-to-edge horizontal scroll */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="overflow-x-auto"
        style={{
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <style>{`.ingredients-track::-webkit-scrollbar { display: none; }`}</style>
        <div
          className="flex flex-row"
          style={{
            width: 'max-content',
            paddingLeft:  'clamp(24px, 7vw, 128px)',
            paddingRight: 'clamp(24px, 7vw, 128px)',
          }}
        >
          {INGREDIENTS.map(ing => (
            <article
              key={ing.name}
              style={{
                width: 'clamp(220px, 22vw, 300px)',
                flexShrink: 0,
                background: '#ffffff',
                borderRight: '1px solid var(--color-rule)',
              }}
            >
              <div style={{ aspectRatio: '3 / 4', overflow: 'hidden', background: '#f6f5f1' }}>
                <img
                  src={ing.image}
                  alt={ing.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = fallback(ing.name) }}
                />
              </div>
              <div style={{ padding: 20 }}>
                <p className="font-display" style={{ fontSize: 15, fontWeight: 600, color: '#0a0a0a' }}>
                  {ing.name}
                </p>
                <p
                  className="font-mono uppercase"
                  style={{ fontSize: 10, letterSpacing: '0.16em', color: '#6b6b6b', marginTop: 4 }}
                >
                  {ing.metric}
                </p>
                <p
                  className="font-display"
                  style={{ fontSize: 13, color: '#6b6b6b', lineHeight: 1.6, marginTop: 8 }}
                >
                  {ing.short}
                </p>
              </div>
            </article>
          ))}

          {/* Show more card */}
          <Link
            to="/science"
            style={{
              width: 'clamp(220px, 22vw, 300px)',
              flexShrink: 0,
              background: '#0a0a0a',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 32,
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1a1a1a')}
            onMouseLeave={e => (e.currentTarget.style.background = '#0a0a0a')}
          >
            <span
              className="font-mono uppercase text-center"
              style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', color: '#ffffff' }}
            >
              Explore all<br />ingredients →
            </span>
            <span
              className="font-display text-center"
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 12 }}
            >
              Full breakdown on the Lab page
            </span>
          </Link>
        </div>
      </div>

      {/* Custom scrollbar */}
      <div className="container-edge mx-auto pb-20 lg:pb-28">
        <div
          ref={scrollbarRef}
          onClick={onBarClick}
          style={{
            marginTop: 24,
            height: 2,
            background: 'var(--color-rule)',
            width: '100%',
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              height: 2,
              background: '#0a0a0a',
              width: `${thumb.width}%`,
              position: 'absolute',
              left: `${thumb.left}%`,
              transition: 'left 0.1s linear',
            }}
          />
        </div>
      </div>
    </section>
  )
}
