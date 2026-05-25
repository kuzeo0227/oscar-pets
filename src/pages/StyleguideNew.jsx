import { Link } from 'react-router-dom'

/* ============================================================================
   STYLEGUIDE — NEW (proposed) design system
   From DESIGN_SYSTEM.md. Self-contained: all tokens inlined so the page
   renders in the proposed system regardless of global CSS.
   ============================================================================ */

const T = {
  white: '#ffffff',
  canvas: '#faf9f5',
  ink: '#141414',
  inkMuted: '#6b6b6b',
  blue: '#3b82ff',
  hairline: '#141414',
  sans: "'Montserrat', system-ui, sans-serif",
  serif: "'Libre Baskerville', Georgia, serif",
  mono: "'Space Mono', monospace",
}

function SubNav() {
  return (
    <div style={{ position: 'sticky', top: 96, zIndex: 20, background: T.white, borderBottom: `1px solid ${T.hairline}` }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '14px clamp(24px, 4vw, 48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: T.mono, fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase', color: T.ink }}>
          OSCAR STYLEGUIDE | NEW (PROPOSED)
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to="/styleguide" style={{ fontFamily: T.mono, fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase', color: T.ink, textDecoration: 'none', border: `1px solid ${T.ink}`, borderRadius: 8, padding: '8px 16px' }}>Overview</Link>
          <Link to="/styleguide/current" style={{ fontFamily: T.mono, fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase', color: T.white, background: T.ink, textDecoration: 'none', borderRadius: 8, padding: '8px 16px' }}>View Current →</Link>
        </div>
      </div>
    </div>
  )
}

function Block({ n, title, children, bg }) {
  return (
    <section style={{ borderTop: `1px solid ${T.hairline}`, padding: '64px 0', background: bg || 'transparent' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 36 }}>
        <span style={{ fontFamily: T.mono, fontSize: 13, letterSpacing: '0.05em', color: T.inkMuted }}>{n}</span>
        <h2 style={{ fontFamily: T.serif, fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 400, color: T.ink, letterSpacing: '-0.03em', margin: 0 }}>{title}</h2>
      </div>
      {children}
    </section>
  )
}

function Swatch({ name, hex, border }) {
  return (
    <div>
      <div style={{ height: 88, background: hex, border: border ? `1px solid ${T.hairline}` : 'none', borderRadius: 16 }} />
      <p style={{ fontFamily: T.mono, fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase', color: T.ink, marginTop: 10 }}>{name}</p>
      <p style={{ fontFamily: T.mono, fontSize: 12, color: T.inkMuted, marginTop: 2 }}>{hex}</p>
    </div>
  )
}

function Btn({ children, variant = 'primary', arrow }) {
  const base = {
    fontFamily: T.mono, fontSize: 13, fontWeight: 400, letterSpacing: '0.05em',
    textTransform: 'uppercase', borderRadius: 8, padding: '0 28px', height: 44,
    display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer',
    transition: 'background 180ms cubic-bezier(0.22,1,0.36,1), color 180ms cubic-bezier(0.22,1,0.36,1)',
  }

  // Resting palette per variant
  const rest = {
    primary:   { background: T.ink,        color: T.white, border: '1px solid transparent' },
    secondary: { background: 'transparent', color: T.ink,   border: `1px solid ${T.ink}` },
    ghost:     { background: 'transparent', color: T.ink,   border: `1px solid ${T.ink}` },
  }[variant]

  function onEnter(e) {
    if (variant === 'primary') {
      e.currentTarget.style.background = '#2a2a2a'      // black lifts slightly
    } else {
      e.currentTarget.style.background = T.ink          // white/outlined → fills black
      e.currentTarget.style.color = T.white
    }
  }
  function onLeave(e) {
    e.currentTarget.style.background = rest.background
    e.currentTarget.style.color = rest.color
  }

  return (
    <button style={{ ...base, ...rest }} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {children}
      {arrow && <span style={{ color: T.blue, fontWeight: 700 }}>→</span>}
    </button>
  )
}

export default function StyleguideNew() {
  return (
    <main style={{ background: T.white, color: T.ink, paddingTop: 96 }}>
      <SubNav />

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px, 4vw, 48px) 96px' }}>
        {/* HERO */}
        <header style={{ padding: '80px 0 8px' }}>
          <p style={{ fontFamily: T.mono, fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase', color: T.inkMuted }}>OSCAR PETS LAB | STYLE GUIDE V0.4</p>
          <h1 style={{ fontFamily: T.serif, fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 400, lineHeight: 1.06, letterSpacing: '-0.04em', marginTop: 24 }}>
            Pets deserve some <em style={{ fontStyle: 'italic' }}>love</em> too.
          </h1>
          <p style={{ fontFamily: T.sans, fontSize: 18, color: T.inkMuted, lineHeight: 1.6, letterSpacing: '-0.03em', maxWidth: '54ch', marginTop: 24 }}>
            Editorial wellness, lifeseeds-inspired. Softer ink, warm canvas bands, strong ink hairlines, and a single quiet blue accent reserved for bullets and arrows.
          </p>
        </header>

        {/* COLOURS */}
        <Block n="01" title="Colour palette">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 20 }}>
            <Swatch name="White" hex="#FFFFFF" border />
            <Swatch name="Canvas" hex="#FAF9F5" border />
            <Swatch name="Ink" hex="#141414" />
            <Swatch name="Ink Muted" hex="#6B6B6B" />
            <Swatch name="Blue (signal)" hex="#3B82FF" />
            <Swatch name="Hairline = Ink" hex="#141414" />
          </div>
          <p style={{ fontFamily: T.sans, fontSize: 16, color: T.inkMuted, lineHeight: 1.65, letterSpacing: '-0.025em', marginTop: 24, maxWidth: '64ch' }}>
            White is ~80% of every page. Canvas appears once or twice max. Blue is <em style={{ fontStyle: 'italic' }}>never</em> used for text, headings, or blocks — bullets and arrow icons only. Product navy/orange stay product-only.
          </p>
        </Block>

        {/* TYPE */}
        <Block n="02" title="Typography — three families, strict roles">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <p style={{ fontFamily: T.mono, fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase', color: T.inkMuted, marginBottom: 8 }}>MONTSERRAT | CATEGORICAL</p>
              <p style={{ fontFamily: T.sans, fontSize: 64, fontWeight: 500, letterSpacing: '-0.08em', lineHeight: 1.02, margin: 0 }}>Products</p>
            </div>
            <div>
              <p style={{ fontFamily: T.mono, fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase', color: T.inkMuted, marginBottom: 8 }}>LIBRE BASKERVILLE | EDITORIAL</p>
              <p style={{ fontFamily: T.serif, fontSize: 48, fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.06, margin: 0 }}>Comprehensive <em style={{ fontStyle: 'italic' }}>functional</em> benefits.</p>
            </div>
            <div>
              <p style={{ fontFamily: T.mono, fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase', color: T.inkMuted, marginBottom: 8 }}>SPACE MONO | UTILITY</p>
              <p style={{ fontFamily: T.mono, fontSize: 22, fontWeight: 700, color: T.ink, margin: 0 }}>RM129.00 | 150g | 60 chewables</p>
            </div>
            <p style={{ fontFamily: T.sans, fontSize: 16, color: T.inkMuted, lineHeight: 1.65, letterSpacing: '-0.025em', maxWidth: '64ch', margin: '8px 0 0' }}>
              Never mix two families in one heading. Italic emphasis inside a Libre Baskerville heading is still Libre Baskerville (italic axis). Eyebrows use ` | ` as the separator.
            </p>
          </div>
        </Block>

        {/* BUTTONS */}
        <Block n="03" title="Buttons & links">
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <Btn variant="primary" arrow>Buy now</Btn>
            <Btn variant="secondary">Add to cart</Btn>
            <Btn variant="ghost" arrow>Study more</Btn>
          </div>
          <p style={{ fontFamily: T.sans, fontSize: 16, color: T.inkMuted, lineHeight: 1.65, letterSpacing: '-0.025em', marginTop: 24, maxWidth: '64ch' }}>
            8px radius. Space Mono uppercase with tight 0.05em tracking. Arrows stay blue. On hover, outlined buttons fill solid ink (text inverts white); the solid button lifts to #2a2a2a.
          </p>
        </Block>

        {/* BULLETS */}
        <Block n="04" title="Bullets">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14, maxWidth: '60ch' }}>
            {['Supports a balanced gut microbiome and regular, well-formed stool.', 'Reinforces digestive resilience after stress, travel, or diet change.', 'Backed by peer-reviewed canine research — no fillers, no padding.'].map((t, i) => (
              <li key={i} style={{ display: 'flex', gap: 18 }}>
                <span style={{ color: T.blue, fontSize: 15, lineHeight: 1, marginTop: 6, marginBottom: 5, flexShrink: 0, fontWeight: 700 }}>●</span>
                <span style={{ fontFamily: T.sans, fontSize: 16, color: T.ink, lineHeight: 1.65, letterSpacing: '-0.025em' }}>{t}</span>
              </li>
            ))}
          </ul>
        </Block>

        {/* RADIUS */}
        <Block n="05" title="Radius scale">
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[
              { v: 0, l: 'none · hero' },
              { v: 8, l: 'md · buttons' },
              { v: 16, l: 'lg · cards' },
              { v: 24, l: '2xl · feature' },
              { v: 9999, l: 'full · pills' },
            ].map(r => (
              <div key={r.l} style={{ textAlign: 'center' }}>
                <div style={{ width: 120, height: 80, background: T.canvas, border: `1px solid ${T.hairline}`, borderRadius: r.v }} />
                <p style={{ fontFamily: T.mono, fontSize: 12, color: T.inkMuted, marginTop: 8 }}>{r.l}</p>
              </div>
            ))}
          </div>
        </Block>

        {/* PRODUCT CARD */}
        <Block n="06" title="Product card">
          <div style={{ maxWidth: 340, background: T.canvas, borderRadius: 16, overflow: 'hidden', border: `1px solid ${T.hairline}` }}>
            <div style={{ aspectRatio: '1 / 1', overflow: 'hidden', background: T.white }}>
              <img src="/assets/oscar-product2.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '80% center' }} />
            </div>
            <div style={{ padding: 24 }}>
              <p style={{ fontFamily: T.serif, fontSize: 22, fontWeight: 400, color: T.ink, letterSpacing: '-0.03em', margin: 0 }}>Gut &amp; Immune Tribiotics</p>
              <p style={{ fontFamily: T.mono, fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase', color: T.inkMuted, marginTop: 8 }}>150g | 60 chewables</p>
              <p style={{ fontFamily: T.mono, fontSize: 22, fontWeight: 700, color: T.ink, marginTop: 12 }}>RM129.00</p>
              <div style={{ marginTop: 18 }}><Btn variant="primary" arrow>Add to cart</Btn></div>
            </div>
          </div>
        </Block>

        {/* EDITORIAL FEATURE CARD */}
        <Block n="07" title="Editorial feature card">
          <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden', background: T.ink, borderRadius: 24, maxWidth: 620 }}>
            <img src="/assets/oscar-product1.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 100%)' }} />
            <div style={{ position: 'absolute', top: 28, left: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color: T.blue, fontSize: 15, fontWeight: 700, lineHeight: 1 }}>●</span>
              <span style={{ fontFamily: T.mono, fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase', color: T.white }}>OUR MISSION | 2025</span>
            </div>
            <h3 style={{ position: 'absolute', left: 28, right: 28, bottom: 28, fontFamily: T.serif, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, color: T.white, lineHeight: 1.1, letterSpacing: '-0.035em', margin: 0 }}>
              Built for the pets we <em style={{ fontStyle: 'italic' }}>love</em>.
            </h3>
          </div>
        </Block>

        {/* SECTION PREVIEW */}
        <Block n="08" title="Section preview — everything together">
          <div style={{ background: T.canvas, borderRadius: 24, padding: 'clamp(32px, 5vw, 72px)' }}>
            <p style={{ fontFamily: T.mono, fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase', color: T.inkMuted, marginBottom: 24 }}>KEY INGREDIENTS | STUDIED</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'clamp(24px, 5vw, 80px)', alignItems: 'start', marginBottom: 56 }}>
              <h2 style={{ fontFamily: T.serif, fontSize: 'clamp(28px, 3.6vw, 48px)', fontWeight: 400, color: T.ink, lineHeight: 1.12, letterSpacing: '-0.04em', margin: 0, maxWidth: '14ch' }}>
                Research-backed <em style={{ fontStyle: 'italic' }}>active</em> ingredients.
              </h2>
              <p style={{ fontFamily: T.sans, fontSize: 18, color: T.inkMuted, lineHeight: 1.6, letterSpacing: '-0.03em', maxWidth: '32ch', marginLeft: 'auto', textAlign: 'right' }}>
                We believe that each ingredient must serve a purpose. We only deliver the best.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {[
                { img: '/assets/oscar-product5.png', name: 'Probiotic Blend', meta: '3B CFU | PER CHEW' },
                { img: '/assets/oscar-product6.png', name: 'Pumpkin Fibers', meta: '100MG | FIBER' },
                { img: '/assets/oscar-product7.png', name: 'Lamb Liver', meta: 'FREEZE-DRIED' },
              ].map(c => (
                <div key={c.name} style={{ background: T.white, borderRadius: 16, overflow: 'hidden', border: `1px solid ${T.hairline}` }}>
                  <div style={{ aspectRatio: '4 / 5', overflow: 'hidden' }}>
                    <img src={c.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: 20 }}>
                    <p style={{ fontFamily: T.serif, fontSize: 18, fontWeight: 400, color: T.ink, letterSpacing: '-0.03em', margin: 0 }}>{c.name}</p>
                    <p style={{ fontFamily: T.mono, fontSize: 13, letterSpacing: '0.05em', textTransform: 'uppercase', color: T.inkMuted, marginTop: 8 }}>{c.meta}</p>
                    <div style={{ marginTop: 14 }}><Btn variant="ghost" arrow>Study more</Btn></div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 48 }}><Btn variant="primary" arrow>Shop the range</Btn></div>
          </div>
        </Block>
      </div>
    </main>
  )
}
