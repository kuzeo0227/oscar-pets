import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

import HorizontalDeck from '../components/HorizontalDeck'
import IngredientsScroll from '../components/sections/IngredientsScroll'
import CertBanner from '../components/sections/CertBanner'
import LifestyleGrid from '../components/sections/LifestyleGrid'
import ReviewsHome from '../components/sections/ReviewsHome'
import AsSeenIn from '../components/sections/AsSeenIn'
import FaqHome from '../components/sections/FaqHome'
import Footer from '../components/sections/Footer'

const ease = [0.22, 1, 0.36, 1]

/* ============================================================================
   1. SUB-NAV
   ============================================================================ */
const NAV_LINKS = [
  { id: 'product-info',     label: 'Product Info'        },
  { id: 'vet-reviewed',     label: 'Vet Reviewed'        },
  { id: 'key-ingredients',  label: 'Key Ingredients'     },
  { id: 'directions',       label: 'Directions For Use'  },
  { id: 'product-benefits', label: 'Product Benefits'    },
  { id: 'what-to-expect',   label: 'What To Expect'      },
  { id: 'reviews',          label: 'Reviews'             },
  { id: 'faq',              label: 'FAQ'                 },
]

function SubNav() {
  return (
    <div
      className="bg-white"
      style={{
        position: 'sticky',
        top: 96,
        zIndex: 40,
        borderBottom: '1px solid var(--color-rule)',
        height: 56,
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
    >
      <nav
        className="section-container flex items-center overflow-x-auto h-full"
        style={{ scrollbarWidth: 'none', gap: 'clamp(20px, 2.5vw, 40px)' }}
        aria-label="Section navigation"
      >
        {NAV_LINKS.map(l => (
          <a key={l.id} href={`#${l.id}`}
            className="font-mono uppercase whitespace-nowrap"
            style={{
              fontSize: 11, fontWeight: 400, letterSpacing: '0.18em',
              color: '#6b6b6b',
              paddingBottom: 4,
              borderBottom: '2px solid transparent',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#0a0a0a'; e.currentTarget.style.borderBottomColor = '#0a0a0a' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6b6b6b'; e.currentTarget.style.borderBottomColor = 'transparent' }}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </div>
  )
}

/* ============================================================================
   2. PRODUCT HERO
   ============================================================================ */
const THUMBS = [
  { src: '/assets/jar-front.jpg',     style: { objectPosition: 'center 78%', transform: 'scale(1.18)' } },
  { src: '/assets/oscar-flatlay.png', style: { objectPosition: 'center',     transform: 'none'        } },
  { src: '/assets/oscar-product3.png', style: { objectPosition: 'center',    transform: 'none'        } },
]

const ACCORDIONS = [
  { label: 'PRODUCT DESCRIPTION', body: 'A tri-biotic chew combining prebiotics, probiotics, and postbiotics — formulated for daily gut and immune support in dogs.' },
  { label: 'INGREDIENTS',         body: 'Probiotic Blend (Bacillus coagulans, B. clausii, B. subtilis), GOS, FOS, Postbiotic Yeast, Pumpkin Fibers, Lamb Liver, Coconut Oil, Sunflower Oil.' },
  { label: 'RECOMMENDED USE',     body: '1 chew per 5–10 kg body weight, once daily, with or without food. Adjust for larger breeds — see the Directions section.' },
  { label: 'KEEP IN CLOSE',       body: 'Store in a cool, dry place away from direct sunlight. No refrigeration required. Best within 18 months of manufacture.' },
  { label: 'MONEY-BACK GUARANTEE',body: '30-day money-back guarantee. If your dog doesn\'t respond, email us and we\'ll refund — keep the jar.' },
]

function ProductHero() {
  const { addItem } = useCart()
  const [mainIdx, setMainIdx] = useState(0)
  const [openAcc, setOpenAcc] = useState(-1)

  function handleAdd() {
    addItem({
      id: 'gut-immune-triobiotics',
      name: 'Gut & Immune Triobiotics Complex',
      price: 129,
      meta: '150g · 60 chewables',
    })
  }
  function handleBuyNow() {
    handleAdd()
    // could navigate('/checkout') here
  }

  return (
    <>
      <span id="product-info" />
      <section style={{ background: '#ffffff' }}>
        <div className="section-container py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2"
            style={{ gap: 'clamp(40px, 5vw, 80px)' }}>

            {/* LEFT — gallery */}
            <div>
              <div className="aspect-square w-full overflow-hidden"
                style={{ background: '#ffffff', borderRadius: 0 }}>
                <img
                  src={THUMBS[mainIdx].src}
                  alt="Oscar Probiotic Chews"
                  className="w-full h-full object-cover"
                  style={THUMBS[mainIdx].style}
                  draggable={false}
                />
              </div>

              {/* Thumbnails */}
              <div style={{ position: 'relative', marginTop: 12 }}>
                <button aria-label="Previous"
                  className="font-mono"
                  style={{
                    position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)',
                    background: 'transparent', border: 0, color: '#0a0a0a', cursor: 'pointer',
                    fontSize: 14, zIndex: 1, padding: 0,
                  }}
                  onClick={() => setMainIdx((mainIdx - 1 + THUMBS.length) % THUMBS.length)}>
                  ←
                </button>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, width: '100%' }}>
                  {THUMBS.map((t, i) => (
                    <button key={i}
                      onClick={() => setMainIdx(i)}
                      className="overflow-hidden"
                      style={{
                        width: '100%', aspectRatio: '1 / 1',
                        background: '#ffffff',
                        border: i === mainIdx ? '1.5px solid #0a0a0a' : '1px solid transparent',
                        borderRadius: 0, cursor: 'pointer', padding: 0,
                        transition: 'border-color 200ms',
                      }}>
                      <img src={t.src} alt="" className="w-full h-full object-cover"
                        style={t.style} draggable={false} />
                    </button>
                  ))}
                </div>
                <button aria-label="Next"
                  className="font-mono"
                  style={{
                    position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)',
                    background: 'transparent', border: 0, color: '#0a0a0a', cursor: 'pointer',
                    fontSize: 14, zIndex: 1, padding: 0,
                  }}
                  onClick={() => setMainIdx((mainIdx + 1) % THUMBS.length)}>
                  →
                </button>
              </div>
            </div>

            {/* RIGHT — purchase panel */}
            <div>
              <h1 className="font-serif text-[#0a0a0a]"
                style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, lineHeight: 1.15 }}>
                Gut &amp; Immune Triobiotics Complex
              </h1>
              <p className="font-mono uppercase"
                style={{ fontSize: 11, letterSpacing: '0.18em', color: '#6b6b6b', marginTop: 8 }}>
                150g | 60 chewables
              </p>
              <p className="font-display"
                style={{ fontSize: 14.5, color: '#6b6b6b', lineHeight: 1.7, marginTop: 16 }}>
                Our probiotics for dogs offer big benefits in a tasty soft chew. Support dog gut health while targeting occasional loose stools and seasonal allergies.
              </p>

              <p
                className="num-mono"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 'clamp(24px, 2.4vw, 32px)', fontWeight: 700, color: '#0a0a0a',
                  marginTop: 24,
                }}>
                RM129.00
              </p>

              {/* CTAs */}
              <div className="flex gap-3 mt-4">
                <button onClick={handleBuyNow}
                  className="font-mono uppercase cursor-pointer transition-colors"
                  style={{
                    background: '#0a0a0a', color: '#ffffff',
                    fontSize: 12, fontWeight: 700, letterSpacing: '0.22em',
                    padding: '16px 32px', border: 0, borderRadius: 0,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#2a2a2a')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#0a0a0a')}>
                  Buy Now
                </button>
                <button onClick={handleAdd}
                  className="font-mono uppercase cursor-pointer transition-colors"
                  style={{
                    background: 'transparent', color: '#0a0a0a',
                    border: '1px solid #0a0a0a',
                    fontSize: 12, fontWeight: 700, letterSpacing: '0.22em',
                    padding: '16px 32px', borderRadius: 0,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#0a0a0a'; e.currentTarget.style.color = '#ffffff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0a0a0a' }}>
                  Add to Cart
                </button>
              </div>

              {/* Reassurance */}
              <p className="font-mono uppercase"
                style={{ fontSize: 11, letterSpacing: '0.16em', color: '#6b6b6b', marginTop: 16 }}>
                ✓ 30-day money-back guarantee &nbsp;·&nbsp; Shipping info
              </p>

              {/* 3-icon feature row */}
              <div className="grid grid-cols-3 gap-6 mt-6">
                {[
                  { icon: '⬡', label: 'Premium chew'    },
                  { icon: '✓', label: 'Vet-formulated'  },
                  { icon: '◎', label: 'Halal-compliant' },
                ].map(f => (
                  <div key={f.label} className="flex flex-col items-start">
                    <span style={{ fontSize: 16, color: '#0a0a0a', lineHeight: 1, marginBottom: 6 }}>{f.icon}</span>
                    <span className="font-display"
                      style={{ fontSize: 11, fontWeight: 600, color: '#0a0a0a' }}>
                      {f.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Accordion */}
              <div style={{ marginTop: 32 }}>
                {ACCORDIONS.map((a, i) => {
                  const isOpen = openAcc === i
                  return (
                    <div key={i} style={{
                      borderTop: i === 0 ? '1px solid var(--color-rule)' : 'none',
                      borderBottom: '1px solid var(--color-rule)',
                    }}>
                      <button onClick={() => setOpenAcc(isOpen ? -1 : i)}
                        className="w-full flex items-center justify-between cursor-pointer"
                        style={{ background: 'transparent', border: 0, padding: '18px 0' }}>
                        <span className="font-mono uppercase"
                          style={{ fontSize: 12, letterSpacing: '0.18em', color: '#0a0a0a' }}>
                          {a.label}
                        </span>
                        <span className="font-mono" style={{
                          fontSize: 16, color: '#0a0a0a',
                          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                          transition: 'transform 0.25s ease',
                        }}>+</span>
                      </button>
                      <div style={{
                        overflow: 'hidden',
                        maxHeight: isOpen ? 320 : 0,
                        transition: 'max-height 0.35s ease, padding 0.25s ease',
                        paddingBottom: isOpen ? 18 : 0,
                      }}>
                        <p className="font-display"
                          style={{ fontSize: 13, color: '#6b6b6b', lineHeight: 1.7 }}>
                          {a.body}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/* ============================================================================
   3. STUDY / STATS
   ============================================================================ */
function StudyStats() {
  return (
    <>
      <span id="vet-reviewed" />
      <section style={{ background: '#ffffff' }}>
        <div className="section-container py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-12 gap-y-10 items-stretch">
            <div className="lg:col-span-4 flex flex-col" style={{ justifyContent: 'space-between' }}>
              <div>
                <div className="flex items-center" style={{ gap: 10 }}>
                  <span aria-hidden="true" style={{ display: 'inline-block', width: 8, height: 8, background: '#0a0a0a', borderRadius: '50%' }} />
                  <p className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: '0.22em', color: '#6b6b6b' }}>STUDY</p>
                </div>
                <h3 className="font-serif text-[#0a0a0a]"
                  style={{ fontSize: 'clamp(22px, 2.2vw, 32px)', fontWeight: 400, lineHeight: 1.25, marginTop: 16 }}>
                  In a study, users reported positive effects on energy, mood, and mental performance.
                </h3>
              </div>
              <p className="font-display"
                style={{ fontSize: 12, fontWeight: 400, color: '#9a9a96', lineHeight: 1.6, maxWidth: '44ch', marginTop: 48 }}>
                <sup>a</sup>In an ongoing observational study based on customer feedback from verified purchases over 3 months of use. Results updated regularly. <sup>b</sup>Repurchase rate calculated from customer base excluding orders within 30 days. Bacillus coagulans, FOS, and GOS contribute to normal gut flora balance and digestive comfort.
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { src: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=800&fit=crop', stat: '86%', caption: 'of participants reported improved digestion following 8 weeks of daily supplementation.ᵃ' },
                { src: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=800&fit=crop',     stat: '78%', caption: 'of dogs showed visible coat and energy improvements after 6 weeks of consistent use.ᵇ' },
              ].map(s => (
                <div key={s.stat} className="relative overflow-hidden"
                  style={{ aspectRatio: '3 / 4', background: '#0a0a0a', borderRadius: 16 }}>
                  <img src={s.src} alt="" className="absolute inset-0 w-full h-full object-cover"
                    onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/assets/jar-front.jpg' }} />
                  <div aria-hidden="true"
                    style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '65%', background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 100%)', zIndex: 1, pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', bottom: 'clamp(24px, 3vw, 36px)', left: 'clamp(24px, 3vw, 36px)', right: 'clamp(24px, 3vw, 36px)', zIndex: 2, textAlign: 'left' }}>
                    <span className="font-serif"
                      style={{ display: 'block', fontSize: 'clamp(64px, 8vw, 108px)', fontWeight: 400, color: '#ffffff', lineHeight: 0.9 }}>
                      {s.stat}
                    </span>
                    <p className="font-display"
                      style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, maxWidth: '26ch', marginTop: 10 }}>
                      {s.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/* ============================================================================
   4. COMPREHENSIVE FUNCTIONAL BENEFITS (DECK)
   ============================================================================ */
const BENEFITS = [
  { title: 'Gut Health',         desc: 'Tri-biotic formulation supports balanced gut flora and consistent digestion.', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop' },
  { title: 'Immune Support',     desc: 'Postbiotics modulate immune signalling, helping dogs handle seasonal stressors.', image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop' },
  { title: 'Skin & Coat',        desc: 'Omega-rich oils and B-vitamins support a shinier coat and calmer skin.',         image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400&h=400&fit=crop' },
  { title: 'Energy & Vitality',  desc: 'MCT-rich carriers and nutrient-dense protein fuel sustained daily energy.',       image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop' },
]

function BenefitsDeck() {
  return (
    <>
      <span id="product-benefits" />
      <section style={{ background: '#ffffff' }}>
        <div className="section-container py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-12 gap-y-6 mb-10">
            <div className="lg:col-span-6">
              <h2 className="font-serif text-[#0a0a0a]"
                style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', fontWeight: 700, lineHeight: 1.1 }}>
                Comprehensive <em className="italic">functional</em> benefits.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="font-display" style={{ fontSize: 14.5, color: '#6b6b6b', lineHeight: 1.7 }}>
                We believe each ingredient must serve a purpose. We only deliver the best.
              </p>
            </div>
          </div>

          <HorizontalDeck gap={16}>
            {BENEFITS.map(b => (
              <article key={b.title}
                style={{
                  width: 'clamp(220px, 22vw, 300px)',
                  flexShrink: 0,
                  background: '#ffffff',
                  border: '1px solid var(--color-rule)',
                  borderRadius: 0,
                }}>
                <div style={{ aspectRatio: '1 / 1', overflow: 'hidden', background: '#ffffff', borderRadius: 16 }}>
                  <img src={b.image} alt={b.title} className="w-full h-full object-cover"
                    loading="lazy" draggable={false}
                    style={{ pointerEvents: 'none', userSelect: 'none', filter: 'grayscale(100%)' }}
                    onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/assets/jar-front.jpg' }} />
                </div>
                <div style={{ padding: 24 }}>
                  <p className="font-display" style={{ fontSize: 16, fontWeight: 600, color: '#0a0a0a' }}>
                    {b.title}
                  </p>
                  <p className="font-display" style={{ fontSize: 13, color: '#6b6b6b', lineHeight: 1.6, marginTop: 8 }}>
                    {b.desc}
                  </p>
                </div>
              </article>
            ))}
          </HorizontalDeck>
        </div>
      </section>
    </>
  )
}

/* ============================================================================
   5. CARING FOR YOUR DOG, MADE SIMPLE
   ============================================================================ */
const FEATURES = [
  { title: "A taste they'll love",    desc: "Savory beef and goat milk that even the pickiest eaters can't resist." },
  { title: "Easy to serve",           desc: "No mixing, no measuring, no mess — just one chew, once a day." },
  { title: "Daily routine",           desc: "Supports digestion, skin, mobility, immunity, and overall health." },
  { title: "No fillers, no fluff",    desc: "Clean, vet-developed formula — nothing extra, nothing unnecessary." },
]

function CaringForDog() {
  return (
    <>
      <span id="what-to-expect" />
      <section style={{ background: '#ffffff' }}>
        {/* Full-bleed grid — image flush-left to viewport, content padded right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
          {/* LEFT — square product image, no left margin, fills its column */}
          <div className="overflow-hidden"
            style={{ aspectRatio: '1 / 1', background: '#ffffff', borderRadius: 0, width: '100%' }}>
            <img src="/assets/oscar-product2.png" alt="Oscar Probiotic Chews"
              className="w-full h-full object-cover" draggable={false}
              style={{ objectPosition: '80% center' }}
              onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = '/assets/jar-front.jpg' }} />
          </div>

          {/* RIGHT — feature list, vertically centered, right-side padding matches section-container */}
          <div
            className="flex flex-col justify-center"
            style={{
              paddingTop:    'clamp(48px, 6vw, 96px)',
              paddingBottom: 'clamp(48px, 6vw, 96px)',
              paddingLeft:   'clamp(32px, 5vw, 80px)',
              paddingRight:  'clamp(34px, 5vw, 101px)',
            }}
          >
            <div>
              <div className="flex items-center" style={{ gap: 10 }}>
                <span aria-hidden="true" style={{ display: 'inline-block', width: 8, height: 8, background: '#0a0a0a', borderRadius: '50%' }} />
                <p className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: '0.22em', color: '#6b6b6b' }}>PRODUCT FEATURES</p>
              </div>
              <h2 className="font-serif text-[#0a0a0a]"
                style={{ fontSize: 'clamp(32px, 3.4vw, 52px)', fontWeight: 700, lineHeight: 1.08, marginTop: 20, maxWidth: '14ch' }}>
                Caring for your dog, <em className="italic">made simple.</em>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 'clamp(24px, 3vw, 40px)', marginTop: 'clamp(40px, 5vw, 64px)' }}>
                {FEATURES.map(f => (
                  <div key={f.title}>
                    <span style={{ fontSize: 20, color: '#0a0a0a', lineHeight: 1 }}>✦</span>
                    <p className="font-display" style={{ fontSize: 15, fontWeight: 600, color: '#0a0a0a', marginTop: 10 }}>
                      {f.title}
                    </p>
                    <p className="font-display" style={{ fontSize: 13.5, color: '#6b6b6b', lineHeight: 1.7, marginTop: 6 }}>
                      {f.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/* ============================================================================
   11. FORMULATED BY SCIENCE CTA CARD
   ============================================================================ */
function FormulatedByScience() {
  return (
    <section style={{ background: '#ffffff' }}>
      <div className="section-container py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center"
          style={{
            background: '#ffffff',
            border: '1px solid var(--color-rule)',
            borderRadius: 0,
            padding: 'clamp(40px, 5vw, 64px)',
            gap: 48,
          }}>
          {/* LEFT */}
          <div>
            <h3 className="font-serif text-[#0a0a0a]"
              style={{ fontSize: 'clamp(24px, 2.6vw, 36px)', fontWeight: 700, lineHeight: 1.15 }}>
              Formulated by science.
            </h3>
            <p className="font-display"
              style={{ fontSize: 14, color: '#6b6b6b', lineHeight: 1.7, marginTop: 16 }}>
              We believe that pet supplements should be transparent and backed by research that people can trust.
            </p>
            <Link to="/product" className="inline-block" style={{ marginTop: 24 }}>
              <button className="font-mono uppercase cursor-pointer transition-colors"
                style={{
                  background: '#0a0a0a', color: '#ffffff',
                  fontSize: 12, fontWeight: 700, letterSpacing: '0.22em',
                  padding: '14px 28px', border: 0, borderRadius: 0,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#2a2a2a')}
                onMouseLeave={e => (e.currentTarget.style.background = '#0a0a0a')}>
                Shop now →
              </button>
            </Link>
          </div>

          {/* RIGHT — two jars */}
          <div className="flex justify-center items-center relative" style={{ minHeight: 240 }}>
            <img src="/assets/jar-front.jpg" alt="" draggable={false}
              style={{
                position: 'relative', zIndex: 1,
                width: '45%', aspectRatio: '3/4', objectFit: 'cover',
                borderRadius: 0, marginRight: -24,
                filter: 'drop-shadow(0 24px 64px rgba(0,0,0,0.15))',
              }} />
            <img src="/assets/jar-front.jpg" alt="" draggable={false}
              style={{
                position: 'relative', zIndex: 0,
                width: '45%', aspectRatio: '3/4', objectFit: 'cover',
                borderRadius: 0,
                filter: 'drop-shadow(0 24px 64px rgba(0,0,0,0.15))',
                transform: 'translateY(-12px)',
              }} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================================
   PAGE
   ============================================================================ */
export default function ProductPage() {
  return (
    <div className="bg-white text-[#0a0a0a]">
      <SubNav />
      <ProductHero />
      <StudyStats />
      <BenefitsDeck />
      <CaringForDog />
      <div id="key-ingredients" />
      <IngredientsScroll />
      <CertBanner />
      <LifestyleGrid />
      <ReviewsHome />
      <AsSeenIn />
      <FormulatedByScience />
      <FaqHome />
      <Footer />
    </div>
  )
}
