import { useState } from 'react'
import { Link } from 'react-router-dom'
import HorizontalDeck from '../HorizontalDeck'
import IngredientStudyModal from '../IngredientStudyModal'
import { INGREDIENT_STUDIES, ingredientFallback } from '../../data/ingredient-studies'

/* PDP ingredient slider — visually identical to the /science (LAB) deck:
   fixed-by-viewport card width, portrait 3/4 image, hairline right border,
   STUDY MORE → opens the shared IngredientStudyModal. */

const CARD_WIDTH = 'calc((100vw - clamp(64px, 10vw, 192px)) / 3.5)'

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

function Card({ ing, onOpen }) {
  const [hovered, setHovered] = useState(false)
  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: CARD_WIDTH,
        minWidth: CARD_WIDTH,
        maxWidth: CARD_WIDTH,
        flexShrink: 0,
        background: hovered ? '#f6f5f1' : '#ffffff',
        borderRight: '1px solid var(--color-rule)',
        borderRadius: 0,
        padding: 0,
        cursor: 'default',
        transition: 'background 200ms',
      }}
    >
      <p
        className="font-display"
        style={{ padding: '16px 20px 10px', fontSize: 14, fontWeight: 600, color: '#0a0a0a' }}
      >
        {ing.name}
      </p>

      <div style={{ width: '100%', aspectRatio: '3 / 4', overflow: 'hidden' }}>
        <img
          src={INGREDIENT_IMAGES[ing.name] || ing.image}
          alt={ing.name}
          loading="lazy"
          draggable={false}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: 0,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
          onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = ingredientFallback(ing.name) }}
        />
      </div>

      <div style={{ padding: '14px 20px 22px' }}>
        <p
          className="font-mono uppercase"
          style={{ fontSize: 10, letterSpacing: '0.18em', color: '#6b6b6b' }}
        >
          {ing.metric}
        </p>
        <p
          className="font-display"
          style={{ fontSize: 13, color: '#6b6b6b', lineHeight: 1.6, marginTop: 8 }}
        >
          {ing.short}
        </p>
        <button
          onClick={onOpen}
          className="font-mono uppercase"
          style={{
            display: 'inline-block',
            marginTop: 14,
            fontSize: 11,
            letterSpacing: '0.22em',
            color: '#0a0a0a',
            background: 'transparent',
            border: 0,
            borderBottom: '1px solid #0a0a0a',
            padding: '0 0 2px 0',
            cursor: 'pointer',
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
        width: CARD_WIDTH,
        minWidth: CARD_WIDTH,
        maxWidth: CARD_WIDTH,
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
        <HorizontalDeck gap={0}>
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
