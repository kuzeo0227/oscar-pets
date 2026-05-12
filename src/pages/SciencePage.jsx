import { useState } from 'react'
import Footer from '../components/sections/Footer'
import HorizontalDeck from '../components/HorizontalDeck'
import IngredientStudyModal from '../components/IngredientStudyModal'
import { INGREDIENT_STUDIES as INGREDIENTS, ingredientFallback } from '../data/ingredient-studies'

const PAD_X = 'clamp(32px, 5vw, 96px)'

const INGREDIENT_IMAGES = {
  'Probiotic Blend':  'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&h=450&fit=crop',
  'Pumpkin Fibers':   'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=600&h=450&fit=crop',
  'Lamb Liver':       'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=450&fit=crop',
  'Coconut Oil':      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=450&fit=crop',
  'FOS':              'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=450&fit=crop',
  'GOS':              'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=450&fit=crop',
  'Postbiotic Yeast': 'https://images.unsplash.com/photo-1559181567-c3190ca9d222?w=600&h=450&fit=crop',
  'Sunflower Oil':    'https://images.unsplash.com/photo-1543257580-7269da773bf5?w=600&h=450&fit=crop',
}

const FORMULA_CARDS = [
  {
    eyebrow: 'GUT HEALTH',
    title:   'Balanced flora, every day.',
    body:    'Bacillus spore strains + FOS/GOS prebiotics maintain a balanced gut microbiome in tropical ambient conditions.',
    image:   'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=400&fit=crop',
  },
  {
    eyebrow: 'IMMUNE SUPPORT',
    title:   'Defences that hold.',
    body:    'S. cerevisiae postbiotic fractions modulate immune signalling — supporting seasonal resilience and allergy tolerance.',
    image:   'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop',
  },
  {
    eyebrow: 'SKIN & COAT',
    title:   'Visibly better coat.',
    body:    'Freeze-dried lamb liver and sunflower oil deliver B-vitamins and high-oleic fatty acids for coat shine and calmer skin.',
    image:   'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&h=400&fit=crop',
  },
  {
    eyebrow: 'TROPICAL STABILITY',
    title:   'Stable without refrigeration.',
    body:    "Spore-forming Bacillus strains survive Malaysia's heat and humidity without cold chain or microencapsulation.",
    image:   'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop',
  },
]

/* -------------------------------------------------------------------------- */
/*  SECTION 1 — HERO                                                           */
/* -------------------------------------------------------------------------- */
function LabHero() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(340px, 45vh, 520px)',
        overflow: 'hidden',
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1600&h=900&fit=crop"
        alt=""
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          filter: 'brightness(0.55)',
        }}
        draggable={false}
      />
      <div
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center',
          paddingInline: 'clamp(24px, 8vw, 120px)',
        }}
      >
        <h1
          className="font-serif"
          style={{
            fontWeight: 700,
            fontSize: 'clamp(32px, 4.5vw, 64px)',
            color: '#ffffff',
            lineHeight: 1.1,
          }}
        >
          Research-backed
          <br />
          <em className="italic">active</em> ingredients.
        </h1>
        <p
          className="font-display"
          style={{
            fontSize: 15,
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.6,
            marginTop: 16,
            maxWidth: '44ch',
          }}
        >
          We believe that each ingredient must serve a purpose. We only deliver the best.
        </p>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  SECTION 2 — RESEARCH-BACKED ACTIVE INGREDIENTS                             */
/* -------------------------------------------------------------------------- */
function IngredientCard({ ing, onOpen }) {
  const [hovered, setHovered] = useState(false)
  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
      style={{
        width: 'clamp(280px, 30vw, 420px)',
        flexShrink: 0,
        borderRight: '1px solid var(--color-rule)',
        background: hovered ? '#f6f5f1' : '#ffffff',
        cursor: 'pointer',
        padding: 0,
        transition: 'background 200ms',
      }}
    >
      <p
        className="font-display"
        style={{
          padding: '20px 20px 12px',
          fontSize: 14, fontWeight: 600, color: '#0a0a0a',
        }}
      >
        {ing.name}
      </p>

      <div style={{ width: '100%', aspectRatio: '4 / 3', overflow: 'hidden' }}>
        <img
          src={INGREDIENT_IMAGES[ing.name] || ing.image}
          alt={ing.name}
          draggable={false}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            borderRadius: 0,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          loading="lazy"
          onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = ingredientFallback(ing.name) }}
        />
      </div>

      <div style={{ padding: '16px 20px 24px' }}>
        <p
          className="font-mono uppercase"
          style={{
            fontSize: 10, letterSpacing: '0.18em',
            color: '#6b6b6b', marginBottom: 8,
          }}
        >
          {ing.metric}
        </p>
        <p
          className="font-display"
          style={{ fontSize: 13, color: '#6b6b6b', lineHeight: 1.6 }}
        >
          {ing.short}
        </p>
        <button
          onClick={e => { e.stopPropagation(); onOpen() }}
          className="font-mono uppercase"
          style={{
            fontSize: 11, letterSpacing: '0.22em',
            color: '#0a0a0a',
            borderBottom: '1px solid #0a0a0a',
            background: 'transparent',
            border: 0,
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
            borderBottomColor: '#0a0a0a',
            paddingBottom: 2,
            marginTop: 14,
            cursor: 'pointer',
            display: 'inline-block',
          }}
        >
          Study more →
        </button>
      </div>
    </article>
  )
}

function IngredientsSection({ onOpen }) {
  return (
    <section
      style={{
        background: '#ffffff',
        paddingTop: 'clamp(56px, 6vw, 96px)',
        paddingBottom: 'clamp(56px, 6vw, 96px)',
        borderBottom: '1px solid var(--color-rule)',
      }}
    >
      <div
        style={{
          paddingInline: PAD_X,
          display: 'grid',
          gridTemplateColumns: '5fr 4fr',
          gap: 'clamp(32px, 5vw, 80px)',
          alignItems: 'end',
          marginBottom: 40,
        }}
      >
        <h2
          className="font-serif"
          style={{
            fontWeight: 700,
            fontSize: 'clamp(28px, 3.2vw, 44px)',
            color: '#0a0a0a',
            lineHeight: 1.1,
          }}
        >
          Research-backed <em className="italic">active</em> ingredients.
        </h2>
        <p
          className="font-display"
          style={{ fontSize: 14, color: '#6b6b6b', lineHeight: 1.7 }}
        >
          We believe that each ingredient must serve a purpose. We only deliver the best.
        </p>
      </div>

      <div style={{ paddingInline: PAD_X }}>
        <HorizontalDeck gap={0}>
          {INGREDIENTS.map(ing => (
            <IngredientCard key={ing.n} ing={ing} onOpen={() => onOpen(ing)} />
          ))}
        </HorizontalDeck>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  SECTION 3 — INTERNATIONALLY CERTIFIED                                      */
/* -------------------------------------------------------------------------- */
function CertifiedSection() {
  const badges = [
    { icon: '★', label: 'MADE IN USA' },
    { icon: '◎', label: '3RD PARTY TESTED' },
    { icon: '⬡', label: 'GMP PRACTICE' },
  ]
  return (
    <section
      style={{
        background: '#ffffff',
        padding: 'clamp(48px, 5vh, 72px) clamp(32px, 5vw, 96px)',
        borderTop: '1px solid var(--color-rule)',
        borderBottom: '1px solid var(--color-rule)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 32,
        }}
      >
        <h2
          className="font-serif"
          style={{
            fontWeight: 700,
            fontSize: 'clamp(22px, 2.4vw, 32px)',
            color: '#0a0a0a',
            lineHeight: 1.15,
          }}
        >
          Internationally certified with
        </h2>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 32 }}>
          {badges.map(b => (
            <div
              key={b.label}
              style={{
                width: 80, height: 80,
                border: '1.5px solid #0a0a0a',
                background: 'transparent',
                borderRadius: '50%',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: 6,
              }}
            >
              <span style={{ fontSize: 16, color: '#0a0a0a', lineHeight: 1 }}>{b.icon}</span>
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: 9, letterSpacing: '0.14em',
                  color: '#0a0a0a', textAlign: 'center',
                  lineHeight: 1.4, marginTop: 4,
                }}
              >
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  SECTION 4 — SCIENCE-BACKED FORMULAS                                        */
/* -------------------------------------------------------------------------- */
function FormulaCard({ card }) {
  return (
    <article
      style={{
        width: 'clamp(300px, 32vw, 460px)',
        flexShrink: 0,
        background: '#f6f5f1',
        borderRadius: 0,
        overflow: 'hidden',
        border: '1px solid var(--color-rule)',
      }}
    >
      <div style={{ width: '100%', aspectRatio: '3 / 2', overflow: 'hidden' }}>
        <img
          src={card.image}
          alt={card.title}
          draggable={false}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            borderRadius: 0,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          loading="lazy"
        />
      </div>
      <div style={{ padding: 24 }}>
        <p
          className="font-mono uppercase"
          style={{ fontSize: 10, letterSpacing: '0.18em', color: '#6b6b6b' }}
        >
          {card.eyebrow}
        </p>
        <h3
          className="font-serif"
          style={{ fontWeight: 700, fontSize: 18, color: '#0a0a0a', marginTop: 8, lineHeight: 1.25 }}
        >
          {card.title}
        </h3>
        <p
          className="font-display"
          style={{ fontSize: 13, color: '#6b6b6b', lineHeight: 1.6, marginTop: 10 }}
        >
          {card.body}
        </p>
      </div>
    </article>
  )
}

function FormulasSection() {
  return (
    <section
      style={{
        background: '#ffffff',
        paddingTop: 'clamp(56px, 6vw, 96px)',
        paddingBottom: 'clamp(56px, 6vw, 96px)',
        borderBottom: '1px solid var(--color-rule)',
      }}
    >
      <div
        style={{
          paddingInline: PAD_X,
          display: 'grid',
          gridTemplateColumns: '5fr 4fr',
          gap: 'clamp(32px, 5vw, 80px)',
          alignItems: 'end',
          marginBottom: 40,
        }}
      >
        <h2
          className="font-serif"
          style={{
            fontWeight: 700,
            fontSize: 'clamp(28px, 3.2vw, 44px)',
            color: '#0a0a0a',
            lineHeight: 1.1,
          }}
        >
          Science-backed <em className="italic">formulas.</em>
        </h2>
        <p
          className="font-display"
          style={{ fontSize: 14, color: '#6b6b6b', lineHeight: 1.7 }}
        >
          Every formula is validated against published canine research. If a study didn't support it at the dose used, it didn't make the product.
        </p>
      </div>

      <div style={{ paddingInline: PAD_X }}>
        <HorizontalDeck gap={16}>
          {FORMULA_CARDS.map(c => (
            <FormulaCard key={c.eyebrow} card={c} />
          ))}
        </HorizontalDeck>
      </div>
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
        <IngredientsSection onOpen={setActiveIng} />
        <CertifiedSection />
        <FormulasSection />
      </main>
      <IngredientStudyModal ingredient={activeIng} onClose={() => setActiveIng(null)} />
      <Footer />
    </>
  )
}
