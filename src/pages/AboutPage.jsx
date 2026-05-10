import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/sections/Footer'

const ease = [0.22, 1, 0.36, 1]

/* -------------------------------------------------------------------------- */
/*  SECTION 1 — HERO (Mission.jsx layout, black background)                    */
/* -------------------------------------------------------------------------- */

const PILLARS = [
  {
    num:  '01',
    title:'A gap worth filling',
    body: 'As Southeast Asian pet ownership grew, so did the supplement aisle — but the science behind many products hadn\'t kept pace. Industry research shows that conventional supplements routinely include binders, fillers, and palatability agents that serve the product\'s shelf life more than the dog consuming it. We saw an opportunity to do something quieter and more deliberate: a single formula where every ingredient earns its place through evidence, not marketing.',
    proof:['Evidence-led', 'Zero fillers', 'Every ingredient justified'],
  },
  {
    num:  '02',
    title:'One product. Done properly.',
    body: 'Most supplement lines grow through addition — more SKUs, more claims, more complexity. We deliberately stayed focused. One formula, one outcome: a quieter, healthier gut for your dog. When we get that right, everything else follows.',
    proof:['Single SKU', 'Halal-compliant', 'DVS Registered'],
  },
]

function Hero() {
  return (
    <section className="relative" style={{ background: '#0a0a0a' }}>
      <div className="container-edge mx-auto py-28 lg:py-36 text-white">
        <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.6)' }}>
          OUR STORY
        </p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease }}
          className="mt-8 font-serif leading-[1.04] max-w-[18ch] text-white"
          style={{ fontSize: 'clamp(40px, 5.6vw, 80px)', fontWeight: 700 }}
        >
          Built like a
          <br />
          <em className="italic">lab brief</em>,
          <br />
          not a label.
        </motion.h1>

        <p
          className="mt-8 max-w-2xl font-display"
          style={{ fontSize: 16, fontWeight: 400, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', maxWidth: '52ch' }}
        >
          The supplement industry moves fast. We moved carefully — cross-referencing studies, auditing suppliers, and cutting every ingredient that couldn't justify its presence. What's left is Oscar.
        </p>

        <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, ease, delay: 0.1 + i * 0.12 }}
              className="relative pl-8 lg:pl-10"
              style={{ borderLeft: '1px solid rgba(255,255,255,0.18)' }}
            >
              <div
                className="num-mono"
                style={{ fontSize: 12, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.55)' }}
              >
                {p.num}
              </div>
              <h2
                className="mt-5 font-serif text-white leading-[1.12]"
                style={{ fontSize: 'clamp(28px, 2.6vw, 38px)', fontWeight: 700 }}
              >
                {p.title}
              </h2>
              <p
                className="mt-5 font-display"
                style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)' }}
              >
                {p.body}
              </p>
              <ul
                className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-6 pt-5"
                style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}
              >
                {p.proof.map(proof => (
                  <li
                    key={proof}
                    className="font-mono uppercase"
                    style={{ fontSize: 11, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.85)' }}
                  >
                    {proof}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  SECTION 2 — THE MARKET CONTEXT                                             */
/* -------------------------------------------------------------------------- */

const STATS = [
  { v: '8.1%',  l: 'CAGR — SEA pet supplements 2026–2033' },
  { v: '63%',   l: 'Of pet supplement buyers check ingredients' },
  { v: '69.8%', l: 'Of supplements sold are chewables' },
  { v: '#1',    l: 'Probiotic is the fastest-growing category' },
]

function MarketContext() {
  return (
    <section className="relative" style={{ background: 'var(--color-paper-soft)' }}>
      <div className="container-edge mx-auto py-24 lg:py-32">
        <p className="eyebrow" style={{ color: '#6b6b6b', marginBottom: 24 }}>
          01 — THE CONTEXT
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-start">
          {/* LEFT — H2 + body */}
          <div className="lg:col-span-6">
            <motion.h2
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, ease }}
              className="font-serif text-[#0a0a0a]"
              style={{ fontSize: 'clamp(36px, 4.4vw, 56px)', fontWeight: 700, lineHeight: 1.05 }}
            >
              Southeast Asia's pets deserve <em className="italic">better science</em>.
            </motion.h2>

            <div className="mt-8 font-display space-y-5" style={{ fontSize: 15.5, lineHeight: 1.7, color: '#6b6b6b' }}>
              <p>
                Pet ownership across Southeast Asia is growing at over 8% annually — but the standards applied to supplement formulation haven't always kept pace with that growth. Consumer research consistently shows that pet owners here are becoming more ingredient-aware: examining labels, seeking veterinary input, and choosing products backed by transparent sourcing.
              </p>
              <p>
                Oscar was built for that shift. Not because the market demanded it yet — but because your dog didn't need to wait for the market to catch up.
              </p>
            </div>
          </div>

          {/* RIGHT — 2x2 stat grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="lg:col-span-5 lg:col-start-8 grid grid-cols-2"
          >
            {STATS.map((s, i) => {
              const isTopRow = i < 2
              return (
                <div
                  key={s.v}
                  className="p-6 lg:p-8"
                  style={{
                    borderRight:  i % 2 === 0 ? '1px solid var(--color-rule)' : 'none',
                    borderBottom: isTopRow      ? '1px solid var(--color-rule)' : 'none',
                  }}
                >
                  <p
                    className="num-mono text-[#0a0a0a]"
                    style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em' }}
                  >
                    {s.v}
                  </p>
                  <p
                    className="font-mono uppercase mt-2"
                    style={{ fontSize: 11, letterSpacing: '0.18em', color: '#6b6b6b', lineHeight: 1.5 }}
                  >
                    {s.l}
                  </p>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
      <div style={{ height: 1, background: 'var(--color-rule)' }} />
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  SECTION 3 — HOW WE BUILD                                                   */
/* -------------------------------------------------------------------------- */

const COMMITMENTS = [
  {
    n:    '01',
    h:    'Science first',
    body: 'Every ingredient in Oscar was selected from peer-reviewed canine research. If a published study didn\'t support its inclusion at the dose used, it didn\'t make the formula. We keep a live reference library — readable on the Lab page — so you can follow the same logic we did.',
  },
  {
    n:    '02',
    h:    'Clean sourcing',
    body: 'Lamb liver is freeze-dried at source. Probiotic strains are cultured under cGMP conditions. Coconut oil is cold-pressed from named cooperatives. Every supplier was audited for traceability and consistency before a single batch was produced.',
  },
  {
    n:    '03',
    h:    'Halal by design',
    body: 'Halal compliance isn\'t a marketing checkbox for us — it shaped every sourcing decision from the start. No porcine inputs, no alcohol-based carriers, no ambiguous derivatives. Oscar is formulated to work for every dog, regardless of household.',
  },
]

const PROOF_ROW = ['cGMP MANUFACTURED', 'THIRD-PARTY TESTED', 'DVS REGISTERED', '30-DAY MONEY-BACK GUARANTEE']

function HowWeBuild() {
  return (
    <section className="relative" style={{ background: '#ffffff' }}>
      <div className="container-edge mx-auto py-24 lg:py-32">
        <p className="eyebrow" style={{ color: '#6b6b6b', marginBottom: 24 }}>
          02 — HOW WE BUILD
        </p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease }}
          className="font-serif text-[#0a0a0a] text-center mx-auto"
          style={{ fontSize: 'clamp(36px, 4.4vw, 56px)', fontWeight: 700, lineHeight: 1.05, marginBottom: 64, maxWidth: '20ch' }}
        >
          Three commitments. <em className="italic">No exceptions.</em>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-14">
          {COMMITMENTS.map((c, i) => (
            <motion.div
              key={c.n}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
              className="pt-6"
              style={{ borderTop: '2px solid #0a0a0a' }}
            >
              <p
                className="font-mono num-mono"
                style={{ fontSize: 11, letterSpacing: '0.18em', color: '#9a9a96' }}
              >
                {c.n}
              </p>
              <h3
                className="font-serif text-[#0a0a0a] mt-3"
                style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2 }}
              >
                {c.h}
              </h3>
              <p
                className="font-display mt-4"
                style={{ fontSize: 14.5, fontWeight: 400, lineHeight: 1.7, color: '#6b6b6b' }}
              >
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Proof row */}
        <ul
          className="mt-10 pt-6 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3"
          style={{ borderTop: '1px solid var(--color-rule)' }}
        >
          {PROOF_ROW.map(p => (
            <li
              key={p}
              className="font-mono uppercase text-center sm:text-left"
              style={{ fontSize: 11, letterSpacing: '0.18em', color: '#0a0a0a' }}
            >
              · {p}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ height: 1, background: 'var(--color-rule)' }} />
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  SECTION 4 — THE FORMULA                                                    */
/* -------------------------------------------------------------------------- */

const INGREDIENT_NAMES = [
  'Probiotic Blend', 'Pumpkin Fibers', 'Lamb Liver', 'Coconut Oil',
  'FOS', 'GOS', 'Postbiotic Yeast', 'Sunflower Oil',
]

function TheFormula() {
  return (
    <section className="relative" style={{ background: '#0a0a0a' }}>
      <div className="container-edge mx-auto py-24 lg:py-32 text-white">
        <p className="eyebrow" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>
          03 — THE FORMULA
        </p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease }}
          className="font-serif text-white"
          style={{ fontSize: 'clamp(36px, 4.4vw, 56px)', fontWeight: 700, lineHeight: 1.05, maxWidth: '20ch' }}
        >
          Eight ingredients. <em className="italic">Each studied.</em>
        </motion.h2>

        <p
          className="mt-6 font-display"
          style={{ fontSize: 15.5, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', maxWidth: '56ch' }}
        >
          Nothing is in this jar because it sounds good on a label. Every compound was selected for a specific mechanism — prebiotic, probiotic, or postbiotic — validated in published canine research. The Lab page has the full breakdown, including the studies.
        </p>

        <Link to="/science" className="inline-block mt-10">
          <motion.button
            whileTap={{ scale: 0.98 }}
            className="font-mono uppercase cursor-pointer transition-colors"
            style={{
              background: '#ffffff', color: '#0a0a0a',
              fontSize: 12, fontWeight: 700, letterSpacing: '0.22em',
              padding: '18px 36px',
              borderRadius: 0, border: 0,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.85)')}
            onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}
          >
            Explore the science →
          </motion.button>
        </Link>

        {/* Eight-item horizontal ingredient list */}
        <div
          className="mt-12 flex flex-wrap items-center gap-x-2 gap-y-3 overflow-x-auto"
          style={{ scrollbarWidth: 'none' }}
        >
          {INGREDIENT_NAMES.map((name, i) => (
            <span key={name} className="flex items-center gap-2 whitespace-nowrap">
              <span
                className="font-mono uppercase"
                style={{ fontSize: 11, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.55)' }}
              >
                {name}
              </span>
              {i < INGREDIENT_NAMES.length - 1 && (
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  SECTION 5 — TRANSPARENCY PLEDGE                                            */
/* -------------------------------------------------------------------------- */

function TransparencyPledge() {
  return (
    <section className="relative" style={{ background: 'var(--color-paper-soft)' }}>
      <div className="container-edge mx-auto py-24 lg:py-32 text-center">
        <p className="eyebrow" style={{ color: '#6b6b6b', marginBottom: 24 }}>
          04 — OUR PLEDGE
        </p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease }}
          className="font-serif text-[#0a0a0a] mx-auto"
          style={{ fontSize: 'clamp(36px, 4.4vw, 56px)', fontWeight: 700, lineHeight: 1.05, maxWidth: '20ch' }}
        >
          If we can't explain it, <em className="italic">it's not in it.</em>
        </motion.h2>

        <p
          className="mt-6 font-display mx-auto"
          style={{ fontSize: 16, fontWeight: 400, lineHeight: 1.7, color: '#6b6b6b', maxWidth: '56ch' }}
        >
          Oscar publishes every ingredient, every source, and every study on this site. If a label claim can't be traced to published research, we don't make it. That's the standard we hold ourselves to — and the one your dog deserves.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/science">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="font-mono uppercase cursor-pointer transition-colors"
              style={{
                background: '#0a0a0a', color: '#ffffff',
                fontSize: 12, fontWeight: 700, letterSpacing: '0.22em',
                padding: '18px 36px',
                borderRadius: 0, border: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#2a2a2a')}
              onMouseLeave={e => (e.currentTarget.style.background = '#0a0a0a')}
            >
              Explore the lab →
            </motion.button>
          </Link>

          <Link to="/product">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="font-mono uppercase cursor-pointer transition-colors"
              style={{
                background: 'transparent', color: '#0a0a0a',
                border: '1px solid #0a0a0a',
                fontSize: 12, fontWeight: 700, letterSpacing: '0.22em',
                padding: '17px 36px',
                borderRadius: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0a0a0a'; e.currentTarget.style.color = '#ffffff' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0a0a0a' }}
            >
              Shop now →
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function AboutPage() {
  return (
    <>
      <main>
        <Hero />
        <MarketContext />
        <HowWeBuild />
        <TheFormula />
        <TransparencyPledge />
      </main>
      <Footer />
    </>
  )
}
