import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Shield } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { PRODUCT, SIZES } from '../../data/product'
import PurchaseOption from './_shared/PurchaseOption'

/**
 * SECTION 01 — PDP HERO
 * ─────────────────────────────────────────────────────────
 * • LEFT  : sticky image gallery + 4 thumbnail strip
 * • RIGHT : rating + title + subtitle + vet trust chip + purchase box
 *
 * Purchase box = subscribe/onetime toggle, dog size selector, ATC + secondary CTA.
 * Selected purchase plan controls price.
 */
const fadeUp = {
  hidden:  { opacity: 0, y: 26 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
}

export default function PdpHero() {
  const { addItem } = useCart()
  const [mainIdx,  setMainIdx]  = useState(0)
  const [purchase, setPurchase] = useState('subscribe')   // 'subscribe' | 'onetime'
  const [size,     setSize]     = useState('medium')

  const price = purchase === 'subscribe' ? PRODUCT.subscribePrice : PRODUCT.oneTimePrice

  function handleAdd() {
    addItem({
      id:    `${PRODUCT.slug}-${size}-${purchase}`,
      name:  PRODUCT.name,
      price,
      meta:  `${size} · ${purchase === 'subscribe' ? 'Subscribe' : 'One-time'}`,
    })
  }

  return (
    <>
      <span id="hero" className="block relative -top-32 invisible" />
      <section className="bg-[#FAFAF7] py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* IMAGE COLUMN — sticky on desktop */}
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp}
            className="lg:sticky lg:top-32"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#EFEFED]">
              <span className="absolute top-4 left-4 z-10 bg-[#1A1A18] text-white font-montserrat font-bold text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full">
                {PRODUCT.badge}
              </span>
              <AnimatePresence mode="wait">
                <motion.img
                  key={mainIdx}
                  src={PRODUCT.thumbs[mainIdx]}
                  alt={PRODUCT.name}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {PRODUCT.thumbs.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setMainIdx(i)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-colors ${
                    i === mainIdx ? 'border-[#1A1A18]' : 'border-[#EFEFED] hover:border-[#06C265]'
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* INFO COLUMN */}
          <div>
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0.5}
              className="flex items-center gap-2 mb-3"
            >
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#1A1A18" stroke="#1A1A18" />)}
              </div>
              <span className="font-montserrat font-semibold text-xs text-[#6B6B6B]">
                {PRODUCT.rating} · {PRODUCT.reviewCount.toLocaleString()} Reviews
              </span>
            </motion.div>

            <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1}
              className="font-baskerville font-bold text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-[#1A1A18] tracking-tight"
            >
              {PRODUCT.name}
            </motion.h1>
            <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
              className="font-montserrat text-base text-[#6B6B6B] mt-4 leading-relaxed"
            >
              {PRODUCT.subtitle}
            </motion.p>

            {/* VET TRUST CHIP — full vet section is below */}
            <motion.a href="#vet" initial="hidden" animate="visible" variants={fadeUp} custom={3}
              className="mt-7 inline-flex items-center gap-3 bg-white border border-[#EFEFED] rounded-full pl-2 pr-4 py-2 hover:border-[#1A1A18] transition-colors group"
            >
              <span className="w-8 h-8 rounded-full bg-[#1A1A18] text-white font-montserrat font-bold text-[11px] flex items-center justify-center flex-shrink-0">DR</span>
              <span className="font-montserrat font-bold text-[11px] tracking-[0.1em] uppercase text-[#1A1A18]">Vet Reviewed &amp; Approved</span>
              <span className="font-montserrat text-[11px] text-[#06C265] group-hover:translate-x-0.5 transition-transform">→</span>
            </motion.a>

            {/* PURCHASE BOX */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}
              className="mt-6 bg-white border border-[#EFEFED] rounded-2xl p-6 shadow-[0_4px_24px_rgba(26,26,24,0.06)]"
            >
              {/* Plan options */}
              <div className="flex flex-col gap-3 mb-6">
                <PurchaseOption
                  selected={purchase === 'subscribe'}
                  onClick={() => setPurchase('subscribe')}
                  badge="Save 20%"
                  title="Subscribe & Save"
                  sub="Free shipping · Cancel anytime"
                  price={PRODUCT.subscribePrice}
                  oldPrice={PRODUCT.oneTimePrice}
                />
                <PurchaseOption
                  selected={purchase === 'onetime'}
                  onClick={() => setPurchase('onetime')}
                  title="One-Time Purchase"
                  sub="Standard shipping applies"
                  price={PRODUCT.oneTimePrice}
                />
              </div>

              {/* Dog size */}
              <p className="font-montserrat font-bold text-[11px] tracking-[0.15em] uppercase text-[#1A1A18] mb-3">Dog Size</p>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {SIZES.map(s => (
                  <motion.button
                    key={s.id}
                    onClick={() => setSize(s.id)}
                    whileTap={{ scale: 0.97 }}
                    className={`py-3 px-2 rounded-lg border-2 transition-all text-center ${
                      size === s.id
                        ? 'bg-[#1A1A18] text-white border-[#1A1A18]'
                        : 'bg-transparent text-[#1A1A18] border-[#EFEFED] hover:border-[#1A1A18]'
                    }`}
                  >
                    <p className="font-montserrat font-bold text-xs">{s.label}</p>
                    <p className="font-montserrat font-normal text-[10px] mt-0.5 opacity-80">{s.weight}</p>
                  </motion.button>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-2.5">
                <motion.button
                  onClick={handleAdd}
                  whileHover={{ scale: 1.02, filter: 'brightness(1.08)' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="w-full bg-[#06C265] text-white font-montserrat font-black text-sm tracking-wider uppercase py-4 rounded-full"
                >
                  Add to Cart — RM {price}.00
                </motion.button>
                <button
                  onClick={() => { setPurchase('subscribe'); handleAdd() }}
                  className="w-full bg-transparent text-[#1A1A18] border-2 border-[#1A1A18] font-montserrat font-black text-sm tracking-wider uppercase py-3.5 rounded-full hover:bg-[#1A1A18] hover:text-white transition-colors"
                >
                  Subscribe & Save 20%
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-1.5 font-montserrat text-xs text-[#6B6B6B]">
                <Shield size={13} className="stroke-[1.75]" />
                30-Day Money-Back Guarantee
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
