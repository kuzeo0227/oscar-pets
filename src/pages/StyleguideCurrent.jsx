import { Link } from 'react-router-dom'

/* ============================================================================
   STYLEGUIDE — CURRENT (applied) design system
   Self-contained: all tokens inlined so the page renders in its own system
   regardless of global CSS.
   ============================================================================ */

const T = {
  ink: '#0a0a0a',
  inkSoft: '#1a1a18',
  paper: '#ffffff',
  canvas: '#f6f5f1',
  rule: '#e6e5e0',
  mute: '#6b6b6b',
  muteSoft: '#9a9a96',
  goDeep: '#2a2a2a',
  serif: "'Libre Baskerville', Georgia, serif",
  sans: "'Montserrat', system-ui, sans-serif",
  mono: "'Space Mono', monospace",
}

function SubNav() {
  return (
    <div style={{ position: 'sticky', top: 96, zIndex: 20, background: T.paper, borderBottom: `1px solid ${T.rule}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '14px clamp(24px, 5vw, 48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.ink }}>
          OSCAR STYLEGUIDE — CURRENT (LIVE)
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link to="/styleguide" style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: T.ink, textDecoration: 'none', border: `1px solid ${T.rule}`, padding: '8px 14px' }}>Overview</Link>
          <Link to="/styleguide/new" style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: T.paper, background: T.ink, textDecoration: 'none', padding: '8px 14px' }}>View New →</Link>
        </div>
      </div>
    </div>
  )
}

function Block({ n, title, children }) {
  return (
    <section style={{ borderTop: `1px solid ${T.rule}`, padding: '56px 0' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 32 }}>
        <span style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: '0.18em', color: T.muteSoft }}>{n}</span>
        <h2 style={{ fontFamily: T.serif, fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 700, color: T.ink, letterSpacing: '-0.01em', margin: 0 }}>{title}</h2>
      </div>
      {children}
    </section>
  )
}

function Swatch({ name, hex, border }) {
  return (
    <div>
      <div style={{ height: 88, background: hex, border: border ? `1px solid ${T.rule}` : 'none', borderRadius: 0 }} />
      <p style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: T.ink, marginTop: 10 }}>{name}</p>
      <p style={{ fontFamily: T.mono, fontSize: 11, color: T.mute, marginTop: 2 }}>{hex}</p>
    </div>
  )
}

export default function StyleguideCurrent() {
  return (
    <main style={{ background: T.paper, color: T.ink, paddingTop: 96 }}>
      <SubNav />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(24px, 5vw, 48px) 96px' }}>
        {/* HERO */}
        <header style={{ padding: '72px 0 8px' }}>
          <p style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.mute }}>OSCAR PETS — STYLE GUIDE — CURRENT</p>
          <h1 style={{ fontFamily: T.serif, fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.01em', marginTop: 20 }}>
            The system as <em style={{ fontStyle: 'italic' }}>shipped today</em>.
          </h1>
          <p style={{ fontFamily: T.sans, fontSize: 16, color: T.mute, lineHeight: 1.7, maxWidth: '54ch', marginTop: 20 }}>
            Sharp-edged brutalist editorial. Near-black ink, light-grey hairlines, no accent colour, and serif headlines throughout. This is what oscar-pets.vercel.app currently renders.
          </p>
        </header>

        {/* COLOURS */}
        <Block n="01" title="Colour palette">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 20 }}>
            <Swatch name="Ink" hex="#0a0a0a" />
            <Swatch name="Ink Soft" hex="#1a1a18" />
            <Swatch name="Paper" hex="#ffffff" border />
            <Swatch name="Canvas (img bg)" hex="#f6f5f1" border />
            <Swatch name="Rule" hex="#e6e5e0" border />
            <Swatch name="Mute" hex="#6b6b6b" />
            <Swatch name="Mute Soft" hex="#9a9a96" />
            <Swatch name="CTA Deep" hex="#2a2a2a" />
          </div>
          <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.mute, lineHeight: 1.7, marginTop: 24, maxWidth: '60ch' }}>
            Monochrome only — no accent colour. Hairlines are a soft light grey (#e6e5e0), which keeps dividers quiet.
          </p>
        </Block>

        {/* TYPE */}
        <Block n="02" title="Typography">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{ fontFamily: T.serif, fontSize: 64, fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.05, margin: 0 }}>Display <em style={{ fontStyle: 'italic' }}>serif</em></p>
            <p style={{ fontFamily: T.serif, fontSize: 40, fontWeight: 700, letterSpacing: '-0.01em', margin: '14px 0 0' }}>Section heading</p>
            <p style={{ fontFamily: T.serif, fontSize: 28, fontWeight: 700, margin: '14px 0 0' }}>Sub heading</p>
            <p style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.mute, margin: '24px 0 0' }}>03 — EYEBROW · SPACE MONO 11PX · 0.18EM</p>
            <p style={{ fontFamily: T.sans, fontSize: 16, color: T.mute, lineHeight: 1.7, maxWidth: '60ch', margin: '16px 0 0' }}>
              Body copy is Montserrat at 13–16px, colour #6b6b6b, line-height 1.7. Headings are always Libre Baskerville (serif), with an italic span on the emphasised word.
            </p>
            <p className="num-mono" style={{ fontFamily: T.mono, fontSize: 22, fontWeight: 700, color: T.ink, margin: '20px 0 0' }}>RM129.00 · 150g | 60 chewables</p>
          </div>
        </Block>

        {/* BUTTONS */}
        <Block n="03" title="Buttons & links">
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              style={{ fontFamily: T.mono, fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', background: T.ink, color: T.paper, border: '1px solid transparent', borderRadius: 0, padding: '16px 32px', cursor: 'pointer', transition: 'background 180ms cubic-bezier(0.22,1,0.36,1)' }}
              onMouseEnter={e => (e.currentTarget.style.background = T.goDeep)}
              onMouseLeave={e => (e.currentTarget.style.background = T.ink)}
            >Buy now</button>
            <button
              style={{ fontFamily: T.mono, fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', background: 'transparent', color: T.ink, border: `1px solid ${T.ink}`, borderRadius: 0, padding: '16px 32px', cursor: 'pointer', transition: 'background 180ms cubic-bezier(0.22,1,0.36,1), color 180ms cubic-bezier(0.22,1,0.36,1)' }}
              onMouseEnter={e => { e.currentTarget.style.background = T.ink; e.currentTarget.style.color = T.paper }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = T.ink }}
            >Add to cart</button>
            <span style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase', color: T.ink, borderBottom: `1px solid ${T.ink}`, paddingBottom: 2, cursor: 'pointer' }}>Study more →</span>
          </div>
          <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.mute, lineHeight: 1.7, marginTop: 24, maxWidth: '60ch' }}>
            Square corners (radius 0). Space Mono uppercase with wide 0.22em tracking. No accent colour on arrows.
          </p>
        </Block>

        {/* RADIUS */}
        <Block n="04" title="Radius">
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 80, background: T.ink, borderRadius: 0 }} />
              <p style={{ fontFamily: T.mono, fontSize: 11, color: T.mute, marginTop: 8 }}>0 · default</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 80, background: T.canvas, border: `1px solid ${T.rule}`, borderRadius: 16 }} />
              <p style={{ fontFamily: T.mono, fontSize: 11, color: T.mute, marginTop: 8 }}>16px · images only</p>
            </div>
          </div>
        </Block>

        {/* PRODUCT CARD */}
        <Block n="05" title="Product card">
          <div style={{ maxWidth: 340 }}>
            <div style={{ aspectRatio: '1 / 1', overflow: 'hidden', background: T.canvas, borderRadius: 0, border: `1px solid ${T.rule}` }}>
              <img src="/assets/oscar-product2.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '80% center' }} />
            </div>
            <p style={{ fontFamily: T.serif, fontSize: 20, fontWeight: 700, color: T.ink, marginTop: 16 }}>Gut &amp; Immune Tribiotics</p>
            <p style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: T.mute, marginTop: 6 }}>150g | 60 chewables</p>
            <p className="num-mono" style={{ fontFamily: T.mono, fontSize: 22, fontWeight: 700, color: T.ink, marginTop: 12 }}>RM129.00</p>
            <button style={{ fontFamily: T.mono, fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', background: T.ink, color: T.paper, border: 0, borderRadius: 0, padding: '14px 28px', marginTop: 16, cursor: 'pointer' }}>Add to cart</button>
          </div>
        </Block>

        {/* EDITORIAL FEATURE CARD */}
        <Block n="06" title="Editorial feature card">
          <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden', background: T.ink, borderRadius: 0, maxWidth: 620 }}>
            <img src="/assets/oscar-product1.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.6) 100%)' }} />
            <div style={{ position: 'absolute', top: 28, left: 28, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 8, height: 8, background: T.paper, borderRadius: '50%' }} />
              <span style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: T.paper }}>OUR MISSION</span>
            </div>
            <h3 style={{ position: 'absolute', left: 28, right: 28, bottom: 28, fontFamily: T.serif, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, color: T.paper, lineHeight: 1.15, margin: 0 }}>
              Built for one outcome.<br />A healthier <em style={{ fontStyle: 'italic' }}>gut</em>.
            </h3>
          </div>
        </Block>

        {/* SECTION PREVIEW */}
        <Block n="07" title="Section preview — everything together">
          <div style={{ border: `1px solid ${T.rule}`, padding: 'clamp(32px, 5vw, 64px)', background: T.paper }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'clamp(24px, 4vw, 64px)', alignItems: 'end', marginBottom: 40 }}>
              <h2 style={{ fontFamily: T.serif, fontSize: 'clamp(26px, 3.2vw, 44px)', fontWeight: 700, color: T.ink, lineHeight: 1.1, letterSpacing: '-0.01em', margin: 0 }}>
                Research-backed <em style={{ fontStyle: 'italic' }}>active</em> ingredients.
              </h2>
              <p style={{ fontFamily: T.sans, fontSize: 14, color: T.mute, lineHeight: 1.7, margin: 0 }}>
                We believe that each ingredient must serve a purpose. We only deliver the best.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { img: '/assets/oscar-product5.png', name: 'Probiotic Blend', meta: '3B CFU · PER CHEW' },
                { img: '/assets/oscar-product6.png', name: 'Pumpkin Fibers', meta: '100MG · FIBER' },
                { img: '/assets/oscar-product7.png', name: 'Lamb Liver', meta: 'FREEZE-DRIED' },
              ].map(c => (
                <div key={c.name} style={{ border: `1px solid ${T.rule}` }}>
                  <div style={{ aspectRatio: '3 / 4', overflow: 'hidden' }}>
                    <img src={c.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '14px 16px 20px' }}>
                    <p style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 600, color: T.ink, margin: 0 }}>{c.name}</p>
                    <p style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: T.mute, marginTop: 6 }}>{c.meta}</p>
                    <span style={{ display: 'inline-block', fontFamily: T.mono, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: T.ink, borderBottom: `1px solid ${T.ink}`, paddingBottom: 2, marginTop: 14 }}>Study more →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Block>
      </div>
    </main>
  )
}
