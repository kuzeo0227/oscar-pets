import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import Hero               from '../components/sections/Hero'
import IngredientsScroll  from '../components/sections/IngredientsScroll'
import Footer             from '../components/sections/Footer'

const ease = [0.22, 1, 0.36, 1]

/* -------------------------------------------------------------------------- */
/*  SECTION 2 — EDITORIAL TWO-COLUMN                                           */
/* -------------------------------------------------------------------------- */
function EditorialTwoCol() {
  return (
    <section style={{ background: 'var(--color-paper-soft)' }}>
      <div className="container-edge mx-auto py-20 lg:py-28">
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ columnGap: 'clamp(32px, 5vw, 80px)', rowGap: 'clamp(48px, 6vw, 80px)' }}
        >
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease }}
            style={{ borderRight: undefined }}
            className="lg:pr-10"
          >
            <div style={{ aspectRatio: '4 / 3', overflow: 'hidden', background: '#f6f5f1' }}>
              <img
                src="/assets/jar-front.jpg"
                alt="Oscar Probiotic Chews"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 78%', transform: 'scale(1.18)' }}
                draggable={false}
              />
            </div>
            <div className="mt-6">
              <p className="eyebrow" style={{ color: '#6b6b6b', marginBottom: 16 }}>
                OUR MISSION
              </p>
              <h3
                className="font-serif text-[#0a0a0a]"
                style={{ fontSize: 'clamp(22px, 2.2vw, 32px)', fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}
              >
                Built for one outcome. <em className="italic">A healthier gut.</em>
              </h3>
              <p
                className="font-display"
                style={{ fontSize: 14, color: '#6b6b6b', lineHeight: 1.7 }}
              >
                Our science-first approach means every ingredient earns its place — backed by peer-reviewed research and sourced from audited suppliers.
              </p>
              <Link
                to="/about"
                className="font-mono uppercase inline-block"
                style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.22em',
                  color: '#0a0a0a',
                  borderBottom: '1px solid #0a0a0a',
                  paddingBottom: 2,
                  marginTop: 24,
                  borderRadius: 0,
                }}
              >
                Learn more →
              </Link>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="lg:pl-10"
            style={{ borderLeft: '1px solid var(--color-rule)' }}
          >
            <div style={{ aspectRatio: '4 / 3', overflow: 'hidden', background: '#f6f5f1' }}>
              <img
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&h=675&fit=crop"
                alt="Dog enjoying the outdoors"
                className="w-full h-full object-cover"
                onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/assets/jar-front.jpg' }}
              />
            </div>
            <div className="mt-6">
              <p className="eyebrow" style={{ color: '#6b6b6b', marginBottom: 16 }}>
                FOR PET OWNERS
              </p>
              <h3
                className="font-serif text-[#0a0a0a]"
                style={{ fontSize: 'clamp(22px, 2.2vw, 32px)', fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}
              >
                Your dog can't tell you. <em className="italic">But the gut can.</em>
              </h3>
              <p
                className="font-display"
                style={{ fontSize: 14, color: '#6b6b6b', lineHeight: 1.7 }}
              >
                Loose stools, dull coat, low energy — most of what shows on the outside starts in the microbiome. Oscar addresses the root, not the symptom.
              </p>
              <Link to="/product" className="inline-block" style={{ marginTop: 24 }}>
                <button
                  className="font-mono uppercase cursor-pointer transition-colors"
                  style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: '0.22em',
                    color: '#ffffff', background: '#0a0a0a',
                    padding: '14px 28px',
                    border: 0, borderRadius: 0,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#2a2a2a')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#0a0a0a')}
                >
                  Shop now →
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  SECTION 3 — CERTIFICATION BANNER                                           */
/* -------------------------------------------------------------------------- */
const CERTS = [
  { icon: '✓', l1: 'HALAL',     l2: 'COMPLIANT' },
  { icon: '◎', l1: '3RD PARTY', l2: 'TESTED'    },
  { icon: '⬡', l1: 'GMP',       l2: 'PRACTICE'  },
  { icon: '◈', l1: 'HACCP',     l2: 'CERTIFIED' },
]

function CertBanner() {
  return (
    <section
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid rgba(255,255,255,0.12)',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
        padding: '64px 0',
      }}
    >
      <div className="container-edge mx-auto text-center">
        <h2
          className="font-serif"
          style={{
            fontSize: 'clamp(24px, 2.8vw, 40px)',
            fontWeight: 700, color: '#ffffff', lineHeight: 1.2,
            marginBottom: 32,
          }}
        >
          Internationally certified with<br />
          the <em className="italic">highest standards</em>
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6">
          {CERTS.map(c => (
            <div
              key={c.l1}
              className="flex flex-col items-center justify-center"
              style={{
                width: 80, height: 80,
                border: '1.5px solid rgba(255,255,255,0.4)',
                borderRadius: '50%',
                background: 'transparent',
              }}
            >
              <span style={{ fontSize: 16, color: '#ffffff', lineHeight: 1, marginBottom: 4 }}>
                {c.icon}
              </span>
              <span
                className="font-mono uppercase text-center"
                style={{ fontSize: 9, letterSpacing: '0.14em', color: '#ffffff', lineHeight: 1.4 }}
              >
                {c.l1}<br />{c.l2}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  SECTION 5 — LIFESTYLE PHOTO GRID                                           */
/* -------------------------------------------------------------------------- */
const LIFESTYLE = [
  'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&h=720&fit=crop',
  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=900&h=720&fit=crop',
  'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=900&h=720&fit=crop',
]

function LifestyleGrid() {
  return (
    <section
      style={{
        background: 'var(--color-paper-soft)',
        borderTop: '1px solid var(--color-rule)',
      }}
    >
      <div className="grid grid-cols-3" style={{ gap: 0 }}>
        {LIFESTYLE.map((src, i) => (
          <div
            key={i}
            style={{
              width: '33.333vw',
              height: 'clamp(280px, 35vw, 480px)',
              overflow: 'hidden',
              background: '#0a0a0a',
            }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center' }}
              loading="lazy"
              onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/assets/jar-front.jpg' }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  SECTION 6 — CUSTOMER REVIEWS                                               */
/* -------------------------------------------------------------------------- */
const REVIEWS = [
  {
    name: 'Sarah T.', date: 'March 2026',
    title: 'Life-changing for my Shih Tzu',
    body:  'After 6 weeks her digestion is noticeably better. Less gas, firmer stools, and she absolutely loves the taste — finally a chew she actually wants.',
  },
  {
    name: 'Reza M.',  date: 'February 2026',
    title: 'Vet recommended, dog approved',
    body:  'Finally a Malaysian brand that delivers. Science-backed, my vet approved it. The ambient-stable claim is huge for our climate.',
  },
  {
    name: 'Li Ying',  date: 'January 2026',
    title: 'Worth the premium positioning.',
    body:  'Took about 2 weeks to see real changes — coat is shinier and she stopped scratching her ears. Subscription pricing makes it sustainable.',
  },
]

function ReviewsHome() {
  return (
    <section style={{ background: '#ffffff' }}>
      <div className="container-edge mx-auto py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-12 gap-y-6 mb-12">
          <div className="lg:col-span-5">
            <h2
              className="font-serif text-[#0a0a0a]"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, lineHeight: 1.05 }}
            >
              Customer <em className="italic">reviews.</em>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p
              className="font-display"
              style={{ fontSize: 14.5, color: '#6b6b6b', lineHeight: 1.7 }}
            >
              Real results from real pet parents across Malaysia. Every review is from a verified purchase.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              style={{
                background: 'var(--color-paper-soft)',
                border: '1px solid var(--color-rule)',
                borderRadius: 0,
                padding: 32,
              }}
            >
              <div style={{ fontSize: 14, color: '#0a0a0a' }}>★★★★★</div>
              <p
                className="font-display"
                style={{ fontSize: 15, fontWeight: 600, color: '#0a0a0a', marginTop: 12 }}
              >
                {r.title}
              </p>
              <p
                className="font-display"
                style={{ fontSize: 14, color: '#6b6b6b', lineHeight: 1.7, marginTop: 8 }}
              >
                {r.body}
              </p>
              <p
                className="font-mono uppercase"
                style={{ fontSize: 11, letterSpacing: '0.14em', color: '#9a9a96', marginTop: 20 }}
              >
                {r.name} · {r.date}
              </p>
              <p
                className="font-mono uppercase"
                style={{ fontSize: 10, letterSpacing: '0.14em', color: '#0a0a0a', marginTop: 4 }}
              >
                ✓ Verified Purchase
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  SECTION 7 — AS SEEN IN                                                     */
/* -------------------------------------------------------------------------- */
const PRESS = ['THE EDGE MALAYSIA', 'THE STAR', 'BUSINESSTODAY', 'FORBES']

function AsSeenIn() {
  return (
    <section
      style={{
        background: 'var(--color-paper-soft)',
        borderTop: '1px solid var(--color-rule)',
        borderBottom: '1px solid var(--color-rule)',
        padding: '64px 0',
      }}
    >
      <div className="container-edge mx-auto text-center">
        <p
          className="font-mono uppercase"
          style={{ fontSize: 11, letterSpacing: '0.18em', color: '#6b6b6b', marginBottom: 28 }}
        >
          AS SEEN IN
        </p>
        <div
          className="flex flex-wrap justify-center items-center"
          style={{ gap: 'clamp(32px, 6vw, 80px)' }}
        >
          {PRESS.map(name => (
            <span
              key={name}
              className="font-display uppercase"
              style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', color: '#0a0a0a', opacity: 0.7 }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  SECTION 8 — PRODUCT CTA                                                    */
/* -------------------------------------------------------------------------- */
function ProductCTA() {
  return (
    <section style={{ background: '#0a0a0a' }}>
      <div className="container-edge mx-auto py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 lg:gap-x-16 items-center">
          {/* LEFT — copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease }}
          >
            <p
              className="font-mono uppercase"
              style={{ fontSize: 11, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.55)', marginBottom: 24 }}
            >
              10 — TRY OSCAR
            </p>
            <h2
              className="font-serif"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: '#ffffff', lineHeight: 1.1 }}
            >
              One jar. <em className="italic">Sixty chews.</em> 30 days to decide.
            </h2>
            <p
              className="font-display"
              style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: '44ch', marginTop: 20 }}
            >
              Formulated by science. Backed by a 30-day money-back guarantee.
            </p>
            <Link to="/product" className="inline-block" style={{ marginTop: 36 }}>
              <button
                className="font-mono uppercase cursor-pointer transition-colors"
                style={{
                  fontSize: 12, fontWeight: 700, letterSpacing: '0.22em',
                  background: '#ffffff', color: '#0a0a0a',
                  padding: '18px 36px',
                  border: 0, borderRadius: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.85)')}
                onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}
              >
                Shop now →
              </button>
            </Link>
          </motion.div>

          {/* RIGHT — two jars stacked / angled */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, ease }}
            className="relative"
            style={{ minHeight: 'clamp(300px, 40vw, 480px)' }}
          >
            <img
              src="/assets/jar-front.jpg"
              alt=""
              draggable={false}
              style={{
                position: 'absolute', top: '8%', left: '0%',
                width: '55%', height: 'auto',
                transform: 'rotate(-8deg)',
                filter: 'drop-shadow(0 24px 64px rgba(0,0,0,0.5))',
                borderRadius: 0,
              }}
            />
            <img
              src="/assets/jar-front.jpg"
              alt=""
              draggable={false}
              style={{
                position: 'absolute', top: '4%', right: '0%',
                width: '55%', height: 'auto',
                transform: 'rotate(4deg)',
                filter: 'drop-shadow(0 24px 64px rgba(0,0,0,0.5))',
                borderRadius: 0,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  SECTION 9 — FAQ                                                            */
/* -------------------------------------------------------------------------- */
const FAQS = [
  {
    q: 'What makes Oscar different from other dog supplements?',
    a: "Every ingredient in Oscar was selected from peer-reviewed canine research — not marketing briefs. We use a tri-biotic system (prebiotics, probiotics, postbiotics) with Bacillus strains that survive Malaysia's tropical ambient temperatures without refrigeration.",
  },
  {
    q: 'How long before I see results?',
    a: 'Most pet parents notice changes in stool consistency and energy within 2–3 weeks. Coat and skin improvements typically appear around 4–6 weeks of consistent daily use.',
  },
  {
    q: 'Is Oscar safe for all dog breeds?',
    a: 'Yes. The formula is designed for small and medium breeds but is safe across all sizes. Dosage adjusts by weight — refer to the feeding guide on the product page.',
  },
  {
    q: 'Is Oscar halal-compliant?',
    a: 'Yes. Oscar uses zero porcine inputs. Lamb liver is sourced from halal-certified suppliers. No alcohol-based carriers or ambiguous derivatives are used.',
  },
  {
    q: 'Can I give Oscar alongside other medications?',
    a: 'We recommend consulting your vet if your dog is on prescription medication. For healthy dogs on standard diets, Oscar is designed as a standalone daily supplement.',
  },
]

function FaqHome() {
  const [open, setOpen] = useState(0)
  return (
    <section style={{ background: 'var(--color-paper-soft)' }}>
      <div className="container-edge mx-auto py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-12 gap-y-8 items-start">
          <div className="lg:col-span-5">
            <h2
              className="font-serif text-[#0a0a0a]"
              style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', fontWeight: 700, lineHeight: 1.1 }}
            >
              Frequently asked <em className="italic">questions.</em>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {FAQS.map((f, i) => {
              const isOpen = open === i
              return (
                <div
                  key={i}
                  style={{
                    borderTop: '1px solid var(--color-rule)',
                    borderBottom: i === FAQS.length - 1 ? '1px solid var(--color-rule)' : 'none',
                  }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full text-left flex items-center justify-between cursor-pointer transition-colors"
                    style={{
                      background: 'transparent', border: 0,
                      padding: '20px 0',
                      color: '#0a0a0a',
                    }}
                  >
                    <span
                      className="font-display"
                      style={{ fontSize: 15, fontWeight: 600, color: '#0a0a0a' }}
                    >
                      {f.q}
                    </span>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: 18, color: '#0a0a0a',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    style={{
                      overflow: 'hidden',
                      maxHeight: isOpen ? 320 : 0,
                      transition: 'max-height 0.35s ease, padding 0.25s ease',
                      paddingBottom: isOpen ? 20 : 0,
                    }}
                  >
                    <p
                      className="font-display"
                      style={{ fontSize: 14, color: '#6b6b6b', lineHeight: 1.7, paddingRight: '10%' }}
                    >
                      {f.a}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  PAGE                                                                       */
/* -------------------------------------------------------------------------- */
export default function HomePage() {
  return (
    <main>
      {/* STICKY HERO — pinned at top:0, z-index:0, height:100vh */}
      <Hero />

      {/* COVER STACK — slides over hero on scroll */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <EditorialTwoCol />
        <CertBanner />
        <IngredientsScroll />
        <LifestyleGrid />
        <ReviewsHome />
        <AsSeenIn />
        <ProductCTA />
        <FaqHome />
        <Footer />
      </div>
    </main>
  )
}
