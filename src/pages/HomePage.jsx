import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import Hero               from '../components/sections/Hero'
import IngredientsScroll  from '../components/sections/IngredientsScroll'
import Footer             from '../components/sections/Footer'

const ease = [0.22, 1, 0.36, 1]

/* -------------------------------------------------------------------------- */
/*  SECTION 2 — EDITORIAL TWO-COLUMN  (contained)                              */
/* -------------------------------------------------------------------------- */
function EditorialCard({ delay, eyebrow, image, alt, imageStyle, title, body, ctaLabel, ctaTo, fallback }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, delay, ease }}
      className="flex flex-col"
    >
      {/* Square image card with eyebrow + headline overlaid */}
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: '1 / 1', background: '#0a0a0a', borderRadius: 0 }}
      >
        <img
          src={image}
          alt={alt}
          className="block w-full h-full object-cover"
          style={{ objectPosition: 'center', ...imageStyle }}
          draggable={false}
          onError={fallback ? (e => { e.currentTarget.onerror = null; e.currentTarget.src = fallback }) : undefined}
        />

        {/* Bottom dark gradient for headline legibility */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 bottom-0 pointer-events-none"
          style={{
            height: '60%',
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)',
            zIndex: 1,
          }}
        />

        {/* Eyebrow overlay — top-left */}
        <div
          className="absolute flex items-center"
          style={{
            top:  'clamp(24px, 3vw, 40px)',
            left: 'clamp(24px, 3vw, 40px)',
            gap: 10,
            zIndex: 2,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block', width: 8, height: 8,
              background: '#ffffff', borderRadius: '50%',
            }}
          />
          <span
            className="font-mono uppercase"
            style={{ fontSize: 11, fontWeight: 400, letterSpacing: '0.22em', color: '#ffffff' }}
          >
            {eyebrow}
          </span>
        </div>

        {/* Headline overlay — bottom-left */}
        <h3
          className="font-serif absolute"
          style={{
            bottom: 'clamp(28px, 4vw, 48px)',
            left:   'clamp(28px, 4vw, 48px)',
            right:  'clamp(28px, 4vw, 48px)',
            zIndex: 2,
            fontSize:   'clamp(28px, 2.8vw, 44px)',
            fontWeight: 400,
            lineHeight: 1.15,
            color: '#ffffff',
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>

      {/* Body — below image, flush-left */}
      <p
        className="font-display"
        style={{
          fontSize: 15,
          fontWeight: 400,
          color: '#6b6b6b',
          lineHeight: 1.65,
          maxWidth: '52ch',
          marginTop: 'clamp(20px, 2.5vw, 32px)',
        }}
      >
        {body}
      </p>

      {/* Bordered CTA — below body */}
      <Link
        to={ctaTo}
        className="inline-flex items-center self-start cursor-pointer transition-colors"
        style={{
          gap: 10,
          marginTop: 'clamp(20px, 2.5vw, 28px)',
          padding: '16px 24px',
          border: '1px solid #0a0a0a',
          borderRadius: 0,
          background: 'transparent',
          color: '#0a0a0a',
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          fontWeight: 400,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          textDecoration: 'none',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#0a0a0a'; e.currentTarget.style.color = '#ffffff' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0a0a0a' }}
      >
        {ctaLabel}
        <span aria-hidden="true">→</span>
      </Link>
    </motion.div>
  )
}

function EditorialTwoCol() {
  return (
    <section style={{ background: '#ffffff' }}>
      <div
        className="mx-auto"
        style={{
          /* +20% from previous: max-width 1512 -> 1814; padding scaled 1.2×; gap scaled 0.7× (-30%) */
          maxWidth: 1814,
          paddingTop:    'clamp(82px, 9.6vh, 151px)',
          paddingBottom: 'clamp(82px, 9.6vh, 151px)',
          paddingLeft:   'clamp(34px, 5vw, 101px)',
          paddingRight:  'clamp(34px, 5vw, 101px)',
        }}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-2 mx-auto"
          style={{ gap: 'clamp(10px, 1.3vw, 20px)' }}
        >
          <EditorialCard
            delay={0}
            eyebrow="OUR MISSION"
            image="/assets/jar-front.jpg"
            alt="Oscar Probiotic Chews"
            imageStyle={{ objectPosition: 'center 70%', transform: 'scale(1.12)' }}
            title={<>Built for one outcome.<br />A healthier gut.</>}
            body="Our science-first approach means every ingredient earns its place — backed by peer-reviewed research and sourced from audited suppliers."
            ctaLabel="Learn more"
            ctaTo="/about"
          />
          <EditorialCard
            delay={0.1}
            eyebrow="FOR PET OWNERS"
            image="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&h=1200&fit=crop"
            alt="Dog enjoying the outdoors"
            fallback="/assets/hero-product.png"
            title={<>Your dog can't tell you.<br />But the gut can.</>}
            body="Loose stools, dull coat, low energy — most of what shows on the outside starts in the microbiome. Oscar addresses the root, not the symptom."
            ctaLabel="Start your journey"
            ctaTo="/product"
          />
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  SECTION 3 — CERTIFICATION BANNER  (banner-card with bg image + overlay)    */
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
      className="relative w-full overflow-hidden"
      style={{
        /* Slightly taller so 'cover' crops more of the wide image's sides, keeping the center framed */
        minHeight: 'clamp(620px, 70vw, 960px)',
        background: '#0a0a0a',
        borderRadius: 0,
      }}
    >
      {/* Background image as <img> — full-bleed, centered, scaled to crop sides */}
      <img
        src="/assets/cert-banner.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          transform: 'scale(1.15)',   /* zoom the center, sides clip naturally via overflow-hidden */
          transformOrigin: 'center',
          zIndex: 0,
        }}
        draggable={false}
        onError={e => {
          e.currentTarget.onerror = null
          e.currentTarget.src = '/assets/hero-product.png'
        }}
      />
      {/* Soft dark vignette — the source image is already dark, so a lighter overlay keeps it visible */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)',
          zIndex: 1,
        }}
      />

      {/* Centered content */}
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

        <div
          className="flex flex-wrap justify-center items-center"
          style={{ gap: 'clamp(24px, 4vw, 56px)', marginTop: 64 }}
        >
          {CERTS.map(c => (
            <div
              key={c.l1}
              className="flex flex-col items-center justify-center"
              style={{
                width: 84, height: 84,
                border: '1.5px solid rgba(255,255,255,0.45)',
                background: 'rgba(0,0,0,0.2)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                borderRadius: '50%',
              }}
            >
              <span style={{ fontSize: 16, color: '#ffffff', lineHeight: 1, marginBottom: 4 }}>
                {c.icon}
              </span>
              <span
                className="font-mono uppercase text-center"
                style={{ fontSize: 9, letterSpacing: '0.16em', color: '#ffffff', lineHeight: 1.4 }}
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
/*  SECTION 5 — LIFESTYLE PHOTO GRID  (edge-to-edge, intentionally NOT contained) */
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
        background: '#ffffff',
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
/*  SECTION 6 — CUSTOMER REVIEWS  (contained)                                  */
/* -------------------------------------------------------------------------- */
const REVIEWS = [
  { name: 'Sarah T.', date: 'March 2026',    title: 'Life-changing for my Shih Tzu',     body: 'After 6 weeks her digestion is noticeably better. Less gas, firmer stools, and she absolutely loves the taste — finally a chew she actually wants.' },
  { name: 'Reza M.',  date: 'February 2026', title: 'Vet recommended, dog approved',     body: 'Finally a Malaysian brand that delivers. Science-backed, my vet approved it. The ambient-stable claim is huge for our climate.' },
  { name: 'Li Ying',  date: 'January 2026',  title: 'Worth the premium positioning.',    body: 'Took about 2 weeks to see real changes — coat is shinier and she stopped scratching her ears. Subscription pricing makes it sustainable.' },
]

function ReviewsHome() {
  return (
    <section style={{ background: '#ffffff' }}>
      <div className="container-contained py-20 lg:py-28">
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
            <p className="font-display" style={{ fontSize: 14.5, color: '#6b6b6b', lineHeight: 1.7 }}>
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
                background: '#ffffff',
                border: '1px solid var(--color-rule)',
                borderRadius: 0,
                padding: 32,
              }}
            >
              <div style={{ fontSize: 14, color: '#0a0a0a' }}>★★★★★</div>
              <p className="font-display" style={{ fontSize: 15, fontWeight: 600, color: '#0a0a0a', marginTop: 12 }}>
                {r.title}
              </p>
              <p className="font-display" style={{ fontSize: 14, color: '#6b6b6b', lineHeight: 1.7, marginTop: 8 }}>
                {r.body}
              </p>
              <p className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: '0.14em', color: '#9a9a96', marginTop: 20 }}>
                {r.name} · {r.date}
              </p>
              <p className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: '0.14em', color: '#0a0a0a', marginTop: 4 }}>
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
/*  SECTION 7 — AS SEEN IN  (contained)                                        */
/* -------------------------------------------------------------------------- */
const PRESS = ['THE EDGE MALAYSIA', 'THE STAR', 'BUSINESSTODAY', 'FORBES']

function AsSeenIn() {
  return (
    <section
      style={{
        background: '#ffffff',
        borderTop: '1px solid var(--color-rule)',
        borderBottom: '1px solid var(--color-rule)',
      }}
    >
      <div className="container-contained text-center" style={{ padding: '64px 0' }}>
        <div className="container-contained text-center">
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
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  SECTION 8 — FINAL CTA  (white outer + black contained card, left-aligned)  */
/* -------------------------------------------------------------------------- */
function ProductCTA() {
  return (
    <section style={{ background: '#ffffff' }}>
      <div className="container-contained py-20 lg:py-28">
        <div
          className="relative w-full flex items-center"
          style={{
            background: '#0a0a0a',
            minHeight: 'clamp(400px, 50vh, 560px)',
            borderRadius: 0,
            padding: 'clamp(48px, 6vw, 96px) clamp(40px, 6vw, 88px)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease }}
            style={{ maxWidth: 560 }}
          >
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(32px, 4vw, 56px)',
                fontWeight: 700, color: '#ffffff', lineHeight: 1.1, marginBottom: 0,
              }}
            >
              One jar. <em className="italic">Sixty chews.</em>
              <br />
              30 days to decide.
            </h2>
            <p
              className="font-display"
              style={{
                fontSize: 15, fontWeight: 400, color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.7, maxWidth: '44ch', marginTop: 24,
              }}
            >
              Formulated by science. Backed by a 30-day money-back guarantee.
            </p>
            <Link to="/product" className="inline-block" style={{ marginTop: 40 }}>
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
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  SECTION 9 — FAQ  (contained)                                               */
/* -------------------------------------------------------------------------- */
const FAQS = [
  { q: 'What makes Oscar different from other dog supplements?', a: "Every ingredient in Oscar was selected from peer-reviewed canine research — not marketing briefs. We use a tri-biotic system (prebiotics, probiotics, postbiotics) with Bacillus strains that survive Malaysia's tropical ambient temperatures without refrigeration." },
  { q: 'How long before I see results?',                          a: 'Most pet parents notice changes in stool consistency and energy within 2–3 weeks. Coat and skin improvements typically appear around 4–6 weeks of consistent daily use.' },
  { q: 'Is Oscar safe for all dog breeds?',                       a: 'Yes. The formula is designed for small and medium breeds but is safe across all sizes. Dosage adjusts by weight — refer to the feeding guide on the product page.' },
  { q: 'Is Oscar halal-compliant?',                               a: 'Yes. Oscar uses zero porcine inputs. Lamb liver is sourced from halal-certified suppliers. No alcohol-based carriers or ambiguous derivatives are used.' },
  { q: 'Can I give Oscar alongside other medications?',           a: 'We recommend consulting your vet if your dog is on prescription medication. For healthy dogs on standard diets, Oscar is designed as a standalone daily supplement.' },
]

function FaqHome() {
  const [open, setOpen] = useState(0)
  return (
    <section style={{ background: '#ffffff' }}>
      <div className="container-contained py-20 lg:py-28">
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
                    style={{ background: 'transparent', border: 0, padding: '20px 0', color: '#0a0a0a' }}
                  >
                    <span className="font-display" style={{ fontSize: 15, fontWeight: 600, color: '#0a0a0a' }}>
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
                    <p className="font-display" style={{ fontSize: 14, color: '#6b6b6b', lineHeight: 1.7, paddingRight: '10%' }}>
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
