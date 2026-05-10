/**
 * /product — single merged page.
 *   Shop intro (was /shop)  +  full PDP content (was /product/probiotic-blend)
 *   Reviews section is intentionally removed.
 *
 * Section order: ShopIntro → PdpTopNav → PdpHero → VetReviewed →
 *                KeyIngredients → DirectionsForUse → ProductBenefits →
 *                WhatToExpect → ProductFAQ → Footer
 */
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'

import PdpTopNav        from '../sections/product/PdpTopNav'
import VetReviewed      from '../sections/product/02-VetReviewed'
import KeyIngredients   from '../sections/product/03-KeyIngredients'
import DirectionsForUse from '../sections/product/04-DirectionsForUse'
import ProductBenefits  from '../sections/product/05-ProductBenefits'
import WhatToExpect     from '../sections/product/06-WhatToExpect'
import ProductFAQ       from '../sections/product/08-ProductFAQ'
import Footer           from '../components/sections/Footer'

const ease = [0.22, 1, 0.36, 1]

const PRODUCT = {
  slug:           'probiotic-blend',
  name:           'Probiotic Blend Chewables',
  subtitle:       'Lamb Liver & Pumpkin Mix',
  oneTimePrice:   89,
  subscribePrice: 71,
  image:          '/assets/jar-front.jpg',
  tags: [
    'Scientifically Formulated',
    'Halal-compliant',
    "Malaysia's 1st Premium Chew",
  ],
}

/** Shop intro hero — was the body of the old /shop page. */
function ShopIntro() {
  const { addItem } = useCart()

  function handleAdd() {
    addItem({
      id:    `${PRODUCT.slug}-medium-onetime`,
      name:  PRODUCT.name,
      price: PRODUCT.oneTimePrice,
      meta:  'Medium · One-time',
    })
  }

  return (
    <div className="bg-white text-ink">
      {/* Anchor for PdpTopNav 'Product Info' link */}
      <span id="hero" className="block relative -top-32 invisible" aria-hidden="true" />

      <section
        className="container-edge mx-auto"
        style={{ paddingTop: 'clamp(80px, 8vw, 120px)', paddingBottom: 'clamp(80px, 8vw, 120px)' }}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-12 items-center"
          style={{ columnGap: 'clamp(40px, 5vw, 80px)', rowGap: 'clamp(48px, 6vw, 96px)' }}
        >
          {/* LEFT — copy + CTAs (5/12) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="lg:col-span-5"
          >
            <p className="eyebrow" style={{ color: '#6b6b6b', marginBottom: 24 }}>
              THE SHOP
            </p>
            <h1
              className="font-serif text-[#0a0a0a]"
              style={{ fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.01em' }}
            >
              One product. <em className="italic">Built right.</em>
            </h1>
            <p
              className="font-display mt-7"
              style={{ fontSize: 15, fontWeight: 400, color: '#6b6b6b', lineHeight: 1.7, maxWidth: '38ch' }}
            >
              We make a single, science-backed chewable. No upsells, no filler line — just one formula we'd put our name on.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md">
              <a href="#vet" className="flex-1">
                <motion.button
                  whileHover={{ backgroundColor: '#2a2a2a' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex items-center justify-center gap-2 font-mono uppercase"
                  style={{
                    background: '#0a0a0a', color: '#ffffff',
                    fontSize: 12, fontWeight: 700, letterSpacing: '0.22em',
                    padding: '14px 32px', borderRadius: 0,
                  }}
                >
                  View Product <ArrowRight size={14} />
                </motion.button>
              </a>
              <button
                onClick={handleAdd}
                className="flex-1 inline-flex items-center justify-center gap-2 font-mono uppercase transition-colors"
                style={{
                  border: '2px solid #0a0a0a', color: '#0a0a0a', background: 'transparent',
                  fontSize: 12, fontWeight: 700, letterSpacing: '0.22em',
                  padding: '12px 32px', borderRadius: 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0a0a0a'; e.currentTarget.style.color = '#ffffff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0a0a0a' }}
              >
                Add to Cart
              </button>
            </div>

            <p className="mt-6 font-mono uppercase" style={{ fontSize: 10, fontWeight: 400, letterSpacing: '0.18em', color: '#6b6b6b' }}>
              30-day money-back guarantee · Free shipping on subscriptions
            </p>
          </motion.div>

          {/* RIGHT — jar image + product showcase (7/12) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="lg:col-span-7"
          >
            {/* Jar image with FRONT VIEW caption mask */}
            <div
              className="relative aspect-[4/3] overflow-hidden w-full"
              style={{ background: 'var(--color-paper-soft)' }}
            >
              <img
                src={PRODUCT.image}
                alt={PRODUCT.name}
                className="absolute inset-0 h-full w-full object-contain"
                draggable={false}
              />
              {/* Mask the FRONT VIEW caption baked into top of image */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0"
                style={{ height: '14%', background: 'var(--color-paper-soft)' }}
              />
            </div>

            {/* Product showcase card — name, subtitle, tags, feature rows, metric pills */}
            <div
              className="mt-8 p-7 lg:p-8"
              style={{ border: '1px solid var(--color-rule)', borderRadius: 0 }}
            >
              <h2
                className="font-serif text-[#0a0a0a]"
                style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', fontWeight: 700, lineHeight: 1.1 }}
              >
                {PRODUCT.name}
              </h2>
              <p className="font-serif italic mt-2" style={{ fontSize: 16, color: '#6b6b6b' }}>
                {PRODUCT.subtitle}
              </p>

              {/* Tags */}
              <ul className="mt-5 flex flex-wrap gap-2">
                {PRODUCT.tags.map(t => (
                  <li
                    key={t}
                    className="font-mono uppercase"
                    style={{
                      fontSize: 10, fontWeight: 400, letterSpacing: '0.18em',
                      color: '#0a0a0a',
                      border: '1px solid #0a0a0a',
                      padding: '5px 12px', borderRadius: 0,
                    }}
                  >
                    {t}
                  </li>
                ))}
              </ul>

              {/* Feature rows */}
              <div className="mt-6 flex flex-col" style={{ borderTop: '1px solid var(--color-rule)' }}>
                {[
                  { label: 'Scientifically Formulated', desc: 'Every strain and compound backed by peer-reviewed studies.' },
                  { label: 'Premium Ingredients',       desc: 'Real Lamb Liver & Pumpkin — no artificial fillers.' },
                  { label: '3 Billion CFU per Chew',    desc: 'Spore-forming Bacillus strains stable at tropical ambient temperature.' },
                ].map(row => (
                  <div key={row.label} className="grid grid-cols-[2rem_1fr] gap-3 items-baseline py-4"
                    style={{ borderBottom: '1px solid var(--color-rule)' }}>
                    <span className="font-mono num-mono text-[#0a0a0a]" style={{ fontSize: 13, fontWeight: 700 }}>·</span>
                    <div>
                      <p className="font-display text-[#0a0a0a]" style={{ fontSize: 14, fontWeight: 600 }}>{row.label}</p>
                      <p className="font-display mt-1" style={{ fontSize: 13, fontWeight: 400, color: '#6b6b6b', lineHeight: 1.65 }}>{row.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Metric pills */}
              <div className="grid grid-cols-3 gap-2 mt-6">
                {[
                  { value: '3 BILLION CFU',  sub: 'PER CHEW' },
                  { value: 'LAMB & PUMPKIN', sub: 'PREMIUM' },
                  { value: 'S/M BREEDS',     sub: 'LAB-FORMULATED' },
                ].map(m => (
                  <div key={m.value} className="px-3 py-3 text-center" style={{ background: '#0a0a0a', borderRadius: 0 }}>
                    <p className="font-mono text-white" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em' }}>{m.value}</p>
                    <p className="font-mono mt-1" style={{ fontSize: 9, fontWeight: 400, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.55)' }}>{m.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
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
