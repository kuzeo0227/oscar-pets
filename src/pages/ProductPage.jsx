/**
 * /product — single merged page.
 *   Hero  (FinalCTA-style layout)  +  full PDP content
 *   Reviews section is intentionally removed.
 *
 * Section order: ShopIntro (FinalCTA-style hero) → PdpTopNav → VetReviewed →
 *                KeyIngredients → DirectionsForUse → ProductBenefits →
 *                WhatToExpect → ProductFAQ → Footer
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

import PdpTopNav        from '../sections/product/PdpTopNav'
import VetReviewed      from '../sections/product/02-VetReviewed'
import KeyIngredients   from '../sections/product/03-KeyIngredients'
import DirectionsForUse from '../sections/product/04-DirectionsForUse'
import ProductBenefits  from '../sections/product/05-ProductBenefits'
import WhatToExpect     from '../sections/product/06-WhatToExpect'
import ProductFAQ       from '../sections/product/08-ProductFAQ'
import Footer           from '../components/sections/Footer'

const ease       = [0.22, 1, 0.36, 1]
const PRICE_ONE  = 89
const PRICE_SUB  = 71
const CURRENCY   = 'RM'

/**
 * /product HERO
 * ─────────────────────────────────────────────────────────
 * Two-column FinalCTA-style layout. No eyebrow.
 * LEFT  (5/12): jar image with FRONT VIEW caption mask
 * RIGHT (6/12, col-start-7): H2 + plan toggle + price + ATC + assurance row
 */
function ShopIntro() {
  const { addItem }   = useCart()
  const [plan, setPlan] = useState('subscribe') // 'subscribe' | 'one-time'

  const price   = plan === 'subscribe' ? PRICE_SUB : PRICE_ONE
  const savings = Math.round(((PRICE_ONE - PRICE_SUB) / PRICE_ONE) * 100)

  function handleAdd() {
    addItem({
      id:    `probiotic-blend-${plan}`,
      name:  'Probiotic Blend Chewables',
      price,
      meta:  plan === 'subscribe' ? 'Subscribe & Save' : 'One-time',
    })
  }

  return (
    <section
      id="hero"
      className="relative"
      style={{ background: 'var(--color-paper-soft)' }}
    >
      <div className="container-edge mx-auto py-28 lg:py-36">
        <div className="grid grid-cols-1 items-center gap-y-16 lg:grid-cols-12 lg:gap-x-16">

          {/* LEFT — jar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, ease }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden">
              <img
                src="/assets/jar-front.jpg"
                alt="Oscar Probiotic Chews — 60 chews"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: 'center 78%', transform: 'scale(1.18)' }}
                draggable={false}
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0"
                style={{ height: '14%', background: 'var(--color-paper-soft)' }}
              />
            </div>
          </motion.div>

          {/* RIGHT — order panel */}
          <div className="lg:col-span-6 lg:col-start-7">
            {/* No eyebrow on hero */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, ease }}
              className="font-serif text-[#0a0a0a]"
              style={{ fontSize: 'clamp(36px, 4.4vw, 56px)', fontWeight: 700, lineHeight: 1.05 }}
            >
              One jar.
              <br />
              <em className="italic">Sixty chews</em>.
              <br />
              30 days to decide.
            </motion.h2>

            {/* Plan toggle */}
            <div
              className="mt-10 inline-grid grid-cols-2 border"
              style={{ borderColor: 'var(--color-rule)', borderRadius: 0 }}
            >
              {[
                { id: 'subscribe', label: 'Subscribe & save', note: `Save ${savings}%` },
                { id: 'one-time',  label: 'One-time',         note: 'No commitment'    },
              ].map(p => {
                const active = plan === p.id
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlan(p.id)}
                    className="flex cursor-pointer flex-col items-start gap-1 px-7 py-4 transition-colors duration-200"
                    style={{
                      background:   active ? '#0a0a0a' : 'transparent',
                      color:        active ? '#ffffff' : '#0a0a0a',
                      borderRadius: 0,
                    }}
                  >
                    <span className="font-display uppercase" style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.04em' }}>
                      {p.label}
                    </span>
                    <span
                      className="font-mono uppercase"
                      style={{ fontSize: 10.5, letterSpacing: '0.16em', color: active ? 'rgba(255,255,255,0.7)' : '#6b6b6b' }}
                    >
                      {p.note}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Price + Add to Cart */}
            <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: 13, letterSpacing: '0.18em', color: '#6b6b6b' }}
                  >
                    {CURRENCY}
                  </span>
                  <motion.span
                    key={price}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="num-mono text-[#0a0a0a]"
                    style={{ fontSize: 'clamp(48px, 5.4vw, 72px)', fontWeight: 700, lineHeight: 1 }}
                  >
                    {price}
                  </motion.span>
                  {plan === 'subscribe' && (
                    <span
                      className="font-mono line-through"
                      style={{ fontSize: 12, color: '#9a9a96' }}
                    >
                      {CURRENCY}{PRICE_ONE}
                    </span>
                  )}
                </div>
                <p
                  className="mt-2 font-mono uppercase"
                  style={{ fontSize: 11, letterSpacing: '0.16em', color: '#6b6b6b' }}
                >
                  60 chews · 1 month supply · cancel anytime
                </p>
              </div>

              <button
                onClick={handleAdd}
                className="group inline-flex cursor-pointer items-center gap-3 font-mono uppercase text-white transition-colors duration-300"
                style={{
                  background: '#0a0a0a',
                  fontSize: 12, letterSpacing: '0.22em',
                  padding: '20px 36px',
                  borderRadius: 0,
                  border: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#2a2a2a')}
                onMouseLeave={e => (e.currentTarget.style.background = '#0a0a0a')}
              >
                Add to cart
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
            </div>

            {/* Assurance row */}
            <ul
              className="mt-10 grid grid-cols-2 gap-y-3 gap-x-6 border-t pt-6 font-mono uppercase sm:grid-cols-4"
              style={{ borderColor: 'var(--color-rule)', color: '#0a0a0a', fontSize: 11, letterSpacing: '0.16em' }}
            >
              <li>· 30-day money-back</li>
              <li>· Vet-formulated</li>
              <li>· cGMP made</li>
              <li>· Free shipping over RM150</li>
            </ul>
          </div>
        </div>
      </div>
      <div style={{ height: 1, background: 'var(--color-rule)' }} />
    </section>
  )
}

export default function ProductPage() {
  return (
    <div className="bg-white text-[#0a0a0a]">
      <PdpTopNav />
      <ShopIntro />
      <VetReviewed />
      <KeyIngredients />
      <DirectionsForUse />
      <ProductBenefits />
      <WhatToExpect />
      <ProductFAQ />
      <Footer />
    </div>
  )
}
