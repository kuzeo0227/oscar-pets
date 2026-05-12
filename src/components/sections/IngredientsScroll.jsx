import { useState } from 'react'
import HorizontalDeck from '../HorizontalDeck'
import IngredientStudyModal from '../IngredientStudyModal'
import { INGREDIENT_STUDIES, ingredientFallback } from '../../data/ingredient-studies'

/* Shared ingredient deck — pixel-identical to the /science (LAB) deck so the
   homepage, PDP, and lab page all render the same component. */

const PAD_X = 'clamp(32px, 5vw, 96px)'
const CARD_WIDTH = 'calc((100vw - clamp(64px, 10vw, 192px)) / 4.2)'

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

export default function IngredientsScroll() {
  const [openIngredient, setOpenIngredient] = useState(null)

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
          {INGREDIENT_STUDIES.map(ing => (
            <Card key={ing.name} ing={ing} onOpen={() => setOpenIngredient(ing)} />
          ))}
        </HorizontalDeck>
      </div>

      <IngredientStudyModal
        ingredient={openIngredient}
        onClose={() => setOpenIngredient(null)}
      />
    </section>
  )
}
