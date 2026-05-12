import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import Hero               from '../components/sections/Hero'
import IngredientsScroll  from '../components/sections/IngredientsScroll'
import CertBanner         from '../components/sections/CertBanner'
import LifestyleGrid      from '../components/sections/LifestyleGrid'
import ReviewsSection     from '../components/ReviewsSection'
import AsSeenIn           from '../components/sections/AsSeenIn'
import FaqHome            from '../components/sections/FaqHome'
import Footer             from '../components/sections/Footer'

const ease = [0.22, 1, 0.36, 1]

/* -------------------------------------------------------------------------- */
/*  SECTION 2 — EDITORIAL TWO-COLUMN  (overlaid eyebrow + headline)            */
/* -------------------------------------------------------------------------- */
function EditorialCard({ delay, eyebrow, image, alt, imageStyle, title, body, ctaLabel, ctaTo, fallback }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, delay, ease }}
      className="flex flex-col"
    >
      <div className="relative w-full overflow-hidden"
        style={{ aspectRatio: '1 / 1', background: '#0a0a0a', borderRadius: 16 }}>
        <img src={image} alt={alt}
          className="block w-full h-full object-cover"
          style={{ objectPosition: 'center', ...imageStyle }}
          draggable={false}
          onError={fallback ? (e => { e.currentTarget.onerror = null; e.currentTarget.src = fallback }) : undefined}
        />
        <div aria-hidden="true" className="absolute left-0 right-0 bottom-0 pointer-events-none"
          style={{
            height: '60%',
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)',
            zIndex: 1,
          }} />
        <div className="absolute flex items-center"
          style={{ top: 'clamp(24px, 3vw, 40px)', left: 'clamp(24px, 3vw, 40px)', gap: 10, zIndex: 2 }}>
          <span aria-hidden="true"
            style={{ display: 'inline-block', width: 8, height: 8, background: '#ffffff', borderRadius: '50%' }} />
          <span className="font-mono uppercase"
            style={{ fontSize: 11, fontWeight: 400, letterSpacing: '0.22em', color: '#ffffff' }}>
            {eyebrow}
          </span>
        </div>
        <h3 className="font-serif absolute"
          style={{
            bottom: 'clamp(28px, 4vw, 48px)', left: 'clamp(28px, 4vw, 48px)', right: 'clamp(28px, 4vw, 48px)',
            zIndex: 2,
            fontSize: 'clamp(28px, 2.8vw, 44px)', fontWeight: 400, lineHeight: 1.15,
            color: '#ffffff', margin: 0,
          }}>
          {title}
        </h3>
      </div>

      <p className="font-display"
        style={{
          fontSize: 15, fontWeight: 400, color: '#6b6b6b', lineHeight: 1.65,
          maxWidth: '52ch', marginTop: 'clamp(20px, 2.5vw, 32px)',
        }}>
        {body}
      </p>

      <Link to={ctaTo}
        className="inline-flex items-center self-start cursor-pointer transition-colors"
        style={{
          gap: 10, marginTop: 'clamp(20px, 2.5vw, 28px)',
          padding: '16px 24px',
          border: '1px solid #0a0a0a', borderRadius: 0,
          background: 'transparent', color: '#0a0a0a',
          fontFamily: "'Space Mono', monospace",
          fontSize: 11, fontWeight: 400, letterSpacing: '0.22em',
          textTransform: 'uppercase', textDecoration: 'none',
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
      <div className="section-container"
        style={{
          paddingTop:    'clamp(82px, 9.6vh, 151px)',
          paddingBottom: 'clamp(82px, 9.6vh, 151px)',
        }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto"
          style={{ gap: 'clamp(10px, 1.3vw, 20px)' }}>
          <EditorialCard
            delay={0}
            eyebrow="OUR MISSION"
            image="/assets/oscar-flatlay.png"
            alt="Oscar Probiotic Chews packaging flat-lay"
            imageStyle={{ objectPosition: 'center' }}
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
/*  SECTION 8 — FINAL CTA  (white outer + black contained card, left-aligned)  */
/* -------------------------------------------------------------------------- */
function ProductCTA() {
  return (
    <section style={{ background: '#ffffff' }}>
      <div className="section-container py-20 lg:py-28">
        <div className="relative w-full flex items-center"
          style={{
            background: '#0a0a0a',
            minHeight: 'clamp(400px, 50vh, 560px)',
            borderRadius: 0,
            padding: 'clamp(48px, 6vw, 96px) clamp(40px, 6vw, 88px)',
          }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease }}
            style={{ maxWidth: 560 }}
          >
            <h2 className="font-serif"
              style={{
                fontSize: 'clamp(32px, 4vw, 56px)',
                fontWeight: 700, color: '#ffffff', lineHeight: 1.1, marginBottom: 0,
              }}>
              One jar. <em className="italic">Sixty chews.</em><br />30 days to decide.
            </h2>
            <p className="font-display"
              style={{
                fontSize: 15, fontWeight: 400, color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.7, maxWidth: '44ch', marginTop: 24,
              }}>
              Formulated by science. Backed by a 30-day money-back guarantee.
            </p>
            <Link to="/product" className="inline-block" style={{ marginTop: 40 }}>
              <button className="font-mono uppercase cursor-pointer transition-colors"
                style={{
                  fontSize: 12, fontWeight: 700, letterSpacing: '0.22em',
                  background: '#ffffff', color: '#0a0a0a',
                  padding: '18px 36px',
                  border: 0, borderRadius: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.85)')}
                onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}>
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
        <ReviewsSection />
        <AsSeenIn />
        <ProductCTA />
        <FaqHome />
        <Footer />
      </div>
    </main>
  )
}
