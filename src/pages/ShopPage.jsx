import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import Footer from '../components/sections/Footer'

/**
 * SHOP PAGE — single product (Probiotic Blend Chewables).
 * No filter sidebar, no listing grid — there is only one SKU.
 */
const PRODUCT = {
  id:             'probiotic-blend',
  slug:           'probiotic-blend',
  name:           'Probiotic Blend Chewables',
  subtitle:       'Lamb Liver & Pumpkin Mix',
  oneTimePrice:   89,
  subscribePrice: 71,
  rating:         4.9,
  reviewCount:    2847,
  image:          '/assets/jar-front.jpg',
  tags: [
    'Scientifically Formulated',
    'Halal-compliant',
    "Malaysia's 1st Premium Chew",
  ],
}

const ease = [0.22, 1, 0.36, 1]

export default function ShopPage() {
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
    <div className="bg-white text-ink min-h-screen">
      {/* Page header */}
      <div className="container-edge mx-auto pt-14 pb-10 hairline-bottom">
        <p className="eyebrow text-ink">The Shop</p>
        <h1 className="mt-3 font-display tracking-[-0.025em] text-ink leading-[0.95]"
          style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', fontWeight: 800 }}>
          One product.<br />Built right.
        </h1>
        <p className="mt-5 font-body text-[#6b6b6b] max-w-md leading-relaxed">
          We make a single, science-backed chewable. No upsells, no filler line — just one formula we'd put our name on.
        </p>
      </div>

      {/* Single product feature */}
      <section className="container-edge mx-auto py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="relative aspect-[4/5] overflow-hidden"
            style={{ background: 'var(--color-paper-soft)' }}
          >
            <img
              src={PRODUCT.image}
              alt={PRODUCT.name}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: 'center 78%', transform: 'scale(1.18)' }}
              draggable={false}
            />
            {/* mask the FRONT VIEW caption baked into the source image */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[14%]"
              style={{ background: 'var(--color-paper-soft)' }}
            />
          </motion.div>

          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#0a0a0a" stroke="#0a0a0a" />)}
              </div>
              <span className="font-mono text-xs text-[#6b6b6b]">
                {PRODUCT.rating} · {PRODUCT.reviewCount.toLocaleString()} reviews
              </span>
            </div>

            <h2 className="font-display text-ink leading-[1.05] tracking-[-0.025em]"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800 }}>
              {PRODUCT.name}
            </h2>
            <p className="font-serif italic text-lg text-[#6b6b6b] mt-2">
              {PRODUCT.subtitle}
            </p>

            {/* Tags */}
            <ul className="mt-6 flex flex-wrap gap-2">
              {PRODUCT.tags.map(t => (
                <li key={t} className="font-mono text-[11px] tracking-[0.04em] uppercase text-ink border px-3 py-1.5"
                  style={{ borderColor: 'var(--color-rule)' }}>
                  {t}
                </li>
              ))}
            </ul>

            {/* Pricing */}
            <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
              <div className="border p-4" style={{ borderColor: 'var(--color-rule)' }}>
                <p className="eyebrow text-[#6b6b6b] mb-1.5">One-Time</p>
                <p className="font-display font-bold text-2xl text-ink">RM {PRODUCT.oneTimePrice}</p>
                <p className="font-mono text-[11px] text-[#6b6b6b] mt-0.5">/ jar</p>
              </div>
              <div className="border-2 p-4 relative" style={{ borderColor: '#0a0a0a' }}>
                <span className="absolute -top-2.5 left-3 bg-[#0a0a0a] text-white font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-0.5">
                  Save 20%
                </span>
                <p className="eyebrow text-ink mb-1.5">Subscribe</p>
                <p className="font-display font-bold text-2xl text-ink">RM {PRODUCT.subscribePrice}</p>
                <p className="font-mono text-[11px] text-[#6b6b6b] mt-0.5">/ jar</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md">
              <Link to={`/product/${PRODUCT.slug}`} className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: '#2a2a2a' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0a0a0a] text-white font-display font-semibold text-sm tracking-[0.12em] uppercase px-7 py-4"
                >
                  View Product <ArrowRight size={16} />
                </motion.button>
              </Link>
              <button
                onClick={handleAdd}
                className="flex-1 inline-flex items-center justify-center gap-2 border-2 font-display font-semibold text-sm tracking-[0.12em] uppercase px-7 py-4 text-ink bg-transparent transition-colors hover:bg-[#0a0a0a] hover:text-white"
                style={{ borderColor: '#0a0a0a' }}
              >
                Add to Cart
              </button>
            </div>

            <p className="mt-5 font-mono text-[11px] tracking-[0.06em] text-[#6b6b6b]">
              30-day money-back guarantee · Free shipping on subscriptions
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
