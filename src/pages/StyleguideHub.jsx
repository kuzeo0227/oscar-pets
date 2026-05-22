import { Link } from 'react-router-dom'

/* ============================================================================
   STYLEGUIDE HUB — side-by-side comparison + entry to both full pages
   ============================================================================ */

const mono = "'Space Mono', monospace"
const serif = "'Libre Baskerville', Georgia, serif"
const sans = "'Montserrat', system-ui, sans-serif"

const ROWS = [
  ['Ink', '#0a0a0a (near-black)', '#141414 (softer)'],
  ['Contrast band', '#ffffff / #f6f5f1', '#FAF9F5 warm cream'],
  ['Hairline', '#e6e5e0 light grey', '#141414 full ink (strong)'],
  ['Accent colour', 'none (monochrome)', '#3B82FF blue — bullets + arrows only'],
  ['Headings', 'Libre Baskerville everywhere', 'Montserrat = categorical · Libre = editorial'],
  ['Eyebrow', 'Mono 11px · 0.18em · "—" sep', 'Mono 13px · 0.05em · "|" sep'],
  ['Buttons', 'square (0) · tracking 0.22em', '8px radius · tracking 0.05em · blue arrow'],
  ['Radius', '0 default · 16px on images', '8 btn / 16 card / 24 feature / full pill'],
  ['Container', 'max 1814px', 'max 1320px'],
  ['Bullets', 'plain dots', 'blue ● 15px bold'],
]

function Card({ to, tag, title, desc, dark }) {
  return (
    <Link to={to} style={{
      display: 'block', textDecoration: 'none',
      background: dark ? '#141414' : '#ffffff',
      color: dark ? '#ffffff' : '#0a0a0a',
      border: `1px solid ${dark ? '#141414' : '#e6e5e0'}`,
      borderRadius: dark ? 16 : 0,
      padding: 'clamp(32px, 4vw, 56px)',
      transition: 'transform 200ms cubic-bezier(0.22,1,0.36,1)',
    }}>
      <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: dark ? 'rgba(255,255,255,0.6)' : '#6b6b6b' }}>{tag}</span>
      <h2 style={{ fontFamily: serif, fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: dark ? 400 : 700, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '16px 0 0' }}>{title}</h2>
      <p style={{ fontFamily: sans, fontSize: 15, color: dark ? 'rgba(255,255,255,0.7)' : '#6b6b6b', lineHeight: 1.7, marginTop: 16, maxWidth: '40ch' }}>{desc}</p>
      <span style={{ display: 'inline-block', fontFamily: mono, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', marginTop: 28, borderBottom: `1px solid ${dark ? '#ffffff' : '#0a0a0a'}`, paddingBottom: 3 }}>
        Open page →
      </span>
    </Link>
  )
}

export default function StyleguideHub() {
  return (
    <main style={{ background: '#ffffff', color: '#0a0a0a', paddingTop: 96 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '72px clamp(24px, 5vw, 48px) 96px' }}>
        <p style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6b6b6b' }}>OSCAR PETS — DESIGN SYSTEM REVIEW</p>
        <h1 style={{ fontFamily: serif, fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.01em', marginTop: 20, maxWidth: '16ch' }}>
          Current vs. <em style={{ fontStyle: 'italic' }}>proposed</em>.
        </h1>
        <p style={{ fontFamily: sans, fontSize: 16, color: '#6b6b6b', lineHeight: 1.7, maxWidth: '58ch', marginTop: 20 }}>
          Two renderings of the Oscar Pets design language. The left is what ships today; the right applies the new DESIGN_SYSTEM.md spec. Open either for the full token set, components, product + editorial cards, and a composed section preview.
        </p>

        {/* Entry cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginTop: 48 }}>
          <Card to="/styleguide/current" tag="LIVE TODAY" title={<>The current <em style={{ fontStyle: 'italic' }}>system</em>.</>} desc="Sharp brutalist editorial — near-black ink, light hairlines, no accent, serif headlines throughout." />
          <Card to="/styleguide/new" dark tag="PROPOSED" title={<>The new <em style={{ fontStyle: 'italic' }}>system</em>.</>} desc="Lifeseeds-inspired wellness — softer ink, warm canvas, strong hairlines, a quiet blue signal, Montserrat for categories." />
        </div>

        {/* Comparison table */}
        <h2 style={{ fontFamily: serif, fontSize: 'clamp(24px, 2.8vw, 34px)', fontWeight: 700, letterSpacing: '-0.01em', margin: '72px 0 0' }}>
          Key <em style={{ fontStyle: 'italic' }}>differences</em>.
        </h2>
        <div style={{ marginTop: 28, border: '1px solid #e6e5e0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1.4fr', background: '#0a0a0a', color: '#ffffff' }}>
            {['Aspect', 'Current (live)', 'New (proposed)'].map(h => (
              <div key={h} style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '14px 18px' }}>{h}</div>
            ))}
          </div>
          {ROWS.map((r, i) => (
            <div key={r[0]} style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1.4fr', borderTop: '1px solid #e6e5e0', background: i % 2 ? '#faf9f5' : '#ffffff' }}>
              <div style={{ fontFamily: mono, fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#0a0a0a', padding: '16px 18px' }}>{r[0]}</div>
              <div style={{ fontFamily: sans, fontSize: 14, color: '#6b6b6b', lineHeight: 1.5, padding: '16px 18px' }}>{r[1]}</div>
              <div style={{ fontFamily: sans, fontSize: 14, color: '#141414', lineHeight: 1.5, padding: '16px 18px' }}>{r[2]}</div>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: sans, fontSize: 13.5, color: '#9a9a96', lineHeight: 1.7, marginTop: 24, maxWidth: '64ch' }}>
          Both styleguides are isolated previews — they render with their own inlined tokens and do not change any live page. Navigate at <code style={{ fontFamily: mono }}>/styleguide/current</code> and <code style={{ fontFamily: mono }}>/styleguide/new</code>.
        </p>
      </div>
    </main>
  )
}
