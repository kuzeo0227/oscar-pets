import { useState } from 'react'
import { motion } from 'framer-motion'
import Footer from '../components/sections/Footer'
import IngredientStudyModal from '../components/IngredientStudyModal'
import { INGREDIENT_STUDIES as INGREDIENTS, ingredientFallback } from '../data/ingredient-studies'

const ease = [0.22, 1, 0.36, 1]

/* -------------------------------------------------------------------------- */
/*  HERO                                                                       */
/* -------------------------------------------------------------------------- */
function LabHero() {
  return (
    <section
      className="relative grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-screen"
      style={{ background: 'var(--color-paper)' }}
    >
      {/* LEFT — full-bleed grayscale lab image */}
      <div className="lg:col-span-7 relative" style={{ minHeight: '50vh', background: '#0a0a0a' }}>
        <img
          src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1400&h=1600&fit=crop"
          alt="Laboratory glassware and equipment"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: 'grayscale(100%)' }}
          draggable={false}
          onError={e => {
            e.currentTarget.onerror = null
            e.currentTarget.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 1600">
                <rect width="1400" height="1600" fill="#0a0a0a"/>
                <g stroke="#ffffff" stroke-width="2" fill="none" opacity="0.3">
                  <circle cx="700" cy="600" r="180"/>
                  <circle cx="700" cy="600" r="120"/>
                  <circle cx="700" cy="600" r="60"/>
                  <line x1="700" y1="780" x2="700" y2="1100"/>
                  <line x1="600" y1="1100" x2="800" y2="1100"/>
                  <path d="M 580 1100 L 580 1300 L 820 1300 L 820 1100 Z"/>
                </g>
                <text x="700" y="1480" text-anchor="middle"
                      font-family="'Space Mono', monospace" font-size="20" letter-spacing="6"
                      fill="#ffffff" opacity="0.6">THE LABORATORY</text>
              </svg>`
            )}`
          }}
        />
      </div>

      {/* RIGHT — copy column */}
      <div
        className="lg:col-span-5 flex flex-col justify-between"
        style={{
          paddingLeft: 'clamp(32px, 4vw, 64px)',
          paddingRight: 'clamp(24px, 7vw, 128px)',
          paddingTop: 'clamp(64px, 6vw, 96px)',
          paddingBottom: 'clamp(64px, 6vw, 96px)',
        }}
      >
        <div>
          <p className="eyebrow" style={{ color: '#6b6b6b', marginBottom: 32 }}>
            THE SCIENCE BEHIND OSCAR
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="font-serif text-[#0a0a0a]"
            style={{ fontSize: 'clamp(48px, 5.6vw, 80px)', fontWeight: 700, lineHeight: 1.04 }}
          >
            Eight inputs.
            <br />
            Each <em className="italic">studied</em>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="font-display mt-7"
            style={{ fontSize: 15.5, fontWeight: 400, color: '#6b6b6b', lineHeight: 1.7, maxWidth: '42ch' }}
          >
            Nothing is in this jar because it "sounds good on a label." Every compound was selected from peer-reviewed canine research. Tap <em>Study More</em> on any ingredient to read where it's sourced, what it does, and what the science says.
          </motion.p>
        </div>

        <p
          className="font-mono uppercase mt-10"
          style={{ fontSize: 11, fontWeight: 400, letterSpacing: '0.22em', color: '#0a0a0a' }}
        >
          ↓ Eight ingredients
        </p>
      </div>

      <div className="absolute bottom-0 inset-x-0" style={{ height: 1, background: 'var(--color-rule)' }} />
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  INGREDIENT CARD                                                            */
/* -------------------------------------------------------------------------- */
function IngredientCard({ ing, onOpen }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, ease }}
      style={{
        background:   hovered ? '#0a0a0a' : '#ffffff',
        color:        hovered ? '#ffffff' : '#0a0a0a',
        border:       `1px solid ${hovered ? '#0a0a0a' : 'var(--color-rule)'}`,
        padding:      '32px 28px',
        transition:   'background 0.3s, color 0.3s, border-color 0.3s',
      }}
    >
      {/* Sequential number */}
      <p
        className="font-mono uppercase"
        style={{
          fontSize: 11, letterSpacing: '0.18em',
          color: hovered ? 'rgba(255,255,255,0.55)' : '#9a9a96',
          marginBottom: 20,
        }}
      >
        {ing.n}
      </p>

      {/* Square image — contrast/filter does not change on hover */}
      <div className="aspect-square w-full overflow-hidden" style={{ background: '#ffffff' }}>
        <img
          src={ing.image}
          alt={ing.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={e => { e.currentTarget.src = ingredientFallback(ing.name) }}
        />
      </div>

      {/* Name */}
      <p className="font-display mt-5" style={{ fontSize: 16, fontWeight: 600, color: 'inherit' }}>
        {ing.name}
      </p>

      {/* Metric tag */}
      <p
        className="font-mono uppercase mt-1"
        style={{
          fontSize: 10, letterSpacing: '0.18em',
          color: hovered ? 'rgba(255,255,255,0.55)' : '#6b6b6b',
        }}
      >
        {ing.metric}
      </p>

      {/* Description */}
      <p
        className="font-display mt-2.5"
        style={{
          fontSize: 13.5, fontWeight: 400, lineHeight: 1.6,
          color: hovered ? 'rgba(255,255,255,0.65)' : '#6b6b6b',
        }}
      >
        {ing.short}
      </p>

      {/* Study More */}
      <button
        onClick={onOpen}
        className="font-mono uppercase cursor-pointer mt-5 inline-block"
        style={{
          fontSize: 11, letterSpacing: '0.22em',
          color: hovered ? '#ffffff' : '#0a0a0a',
          background: 'transparent',
          border: 0, borderBottom: `1px solid ${hovered ? '#ffffff' : '#0a0a0a'}`,
          paddingBottom: 2,
          transition: 'color 0.3s, border-color 0.3s',
        }}
      >
        Study more →
      </button>
    </motion.article>
  )
}

/* -------------------------------------------------------------------------- */
/*  GRID                                                                       */
/* -------------------------------------------------------------------------- */
function IngredientGrid({ onOpen }) {
  return (
    <section
      className="relative"
      style={{ background: '#ffffff' }}
    >
      <div className="container-edge mx-auto py-24 lg:py-32">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2
            className="font-serif text-[#0a0a0a]"
            style={{ fontSize: 'clamp(36px, 4.4vw, 56px)', fontWeight: 700, lineHeight: 1.05 }}
          >
            Premium-sourced <em className="italic">ingredients</em>.
          </h2>
          <p
            className="font-display mt-4 mx-auto"
            style={{ fontSize: 15, fontWeight: 400, color: '#6b6b6b', lineHeight: 1.7, maxWidth: '50ch' }}
          >
            Every ingredient selected for purpose and purity — no fluff, no fillers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INGREDIENTS.map(ing => (
            <IngredientCard key={ing.n} ing={ing} onOpen={() => onOpen(ing)} />
          ))}
        </div>
      </div>
      <div style={{ height: 1, background: 'var(--color-rule)' }} />
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  PAGE                                                                       */
/* -------------------------------------------------------------------------- */
export default function SciencePage() {
  const [activeIng, setActiveIng] = useState(null)

  return (
    <>
      <main>
        <LabHero />
        <IngredientGrid onOpen={setActiveIng} />
      </main>
      <IngredientStudyModal ingredient={activeIng} onClose={() => setActiveIng(null)} />
      <Footer />
    </>
  )
}
