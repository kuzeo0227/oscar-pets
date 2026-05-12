import { useState } from 'react'
import { Link } from 'react-router-dom'
import HorizontalDeck from '../HorizontalDeck'
import IngredientStudyModal from '../IngredientStudyModal'
import { INGREDIENT_STUDIES, ingredientFallback } from '../../data/ingredient-studies'

/* PDP ingredient slider — uses the shared INGREDIENT_STUDIES catalog so each
   card can open the same Study More modal used on /science (LAB). Image sits
   inside card padding (not edge-bleed), and a STUDY MORE → CTA opens the
   detailed peer-reviewed breakdown. */

function Card({ ing, onOpen }) {
  return (
    <article
      style={{
        width: 'clamp(220px, 22vw, 300px)',
        flexShrink: 0,
        background: '#ffffff',
        border: '1px solid var(--color-rule)',
        borderRadius: 0,
        padding: '20px 20px 0 20px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image sits inside padding — does not bleed to card edge */}
      <div
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          borderRadius: 0,
          background: '#f6f5f1',
        }}
      >
        <img
          src={ing.image}
          alt={ing.name}
          loading="lazy"
          draggable={false}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = ingredientFallback(ing.name) }}
        />
      </div>

      {/* Content area — padding at bottom completes the inner gutter */}
      <div style={{ padding: '16px 0 20px 0' }}>
        <p className="font-display" style={{ fontSize: 15, fontWeight: 600, color: '#0a0a0a' }}>
          {ing.name}
        </p>
        <p className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: '0.16em', color: '#6b6b6b', marginTop: 4 }}>
          {ing.metric}
        </p>
        <p className="font-display" style={{ fontSize: 13, color: '#6b6b6b', lineHeight: 1.6, marginTop: 8 }}>
          {ing.short}
        </p>

        <button
          onClick={onOpen}
          className="font-mono uppercase cursor-pointer"
          style={{
            display: 'inline-block',
            marginTop: 16,
            fontSize: 11,
            letterSpacing: '0.22em',
            color: '#0a0a0a',
            background: 'transparent',
            border: 0,
            borderBottom: '1px solid #0a0a0a',
            paddingBottom: 2,
            padding: '0 0 2px 0',
          }}
        >
          Study more →
        </button>
      </div>
    </article>
  )
}

function ShowMoreCard() {
  return (
    <Link
      to="/science"
      style={{
        width: 'clamp(220px, 22vw, 300px)',
        flexShrink: 0,
        background: '#0a0a0a',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 32, textDecoration: 'none',
        transition: 'background 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = '#1a1a1a')}
      onMouseLeave={e => (e.currentTarget.style.background = '#0a0a0a')}
    >
      <span className="font-mono uppercase text-center" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', color: '#ffffff' }}>
        Explore all<br />ingredients →
      </span>
      <span className="font-display text-center" style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 12 }}>
        Full breakdown on the Lab page
      </span>
    </Link>
  )
}

export default function IngredientsScroll() {
  const [openIngredient, setOpenIngredient] = useState(null)

  return (
    <section style={{ background: '#ffffff' }}>
      <div className="section-container py-20 lg:py-28">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-12 gap-y-6 mb-10">
          <div className="lg:col-span-6">
            <p className="eyebrow" style={{ color: '#6b6b6b', marginBottom: 16 }}>
              03 — ACTIVE INGREDIENTS
            </p>
            <h2 className="font-serif text-[#0a0a0a]"
              style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', fontWeight: 700, lineHeight: 1.1 }}>
              Research-backed <em className="italic">active ingredients.</em>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="font-display" style={{ fontSize: 14.5, color: '#6b6b6b', lineHeight: 1.7 }}>
              We believe there are no shortcuts in supplement formulation. Every active compound is selected from peer-reviewed canine studies — no fillers, no padding, no ingredients that can't justify their presence.
            </p>
          </div>
        </div>

        {/* Bounded deck with momentum drag */}
        <HorizontalDeck gap={16}>
          {INGREDIENT_STUDIES.map(ing => (
            <Card key={ing.name} ing={ing} onOpen={() => setOpenIngredient(ing)} />
          ))}
          <ShowMoreCard />
        </HorizontalDeck>
      </div>

      <IngredientStudyModal
        ingredient={openIngredient}
        onClose={() => setOpenIngredient(null)}
      />
    </section>
  )
}
