// ============================================
// SHOPIFY SECTION: PRODUCT FEATURE
// Copy everything between these comments into
// a new Shopify custom section
// ============================================
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle2, FlaskConical, Leaf, Award } from 'lucide-react'

const benefits = [
  { icon: FlaskConical, label: 'Scientifically Formulated', desc: 'Every strain and compound backed by peer-reviewed studies.' },
  { icon: Leaf,         label: 'Healthy Ingredients',       desc: 'Real Lamb Liver & Pumpkin — no artificial fillers.' },
  { icon: Award,        label: "Malaysia's 1st Premium Chew", desc: 'First of its kind in the Malaysian pet supplement market.' },
]

const stats = [
  { value: '3 Billion CFU', sub: 'per Chew' },
  { value: 'Lamb & Pumpkin', sub: 'Premium Ingredients' },
  { value: 'S/M Breeds', sub: 'Lab Formulated For' },
]

const badges = [
  '1ST Malaysian Premium Chew',
  '94% Positive Customer Ratings',
  'HACCP Certified',
  'GMP Practice',
  'ISO Certified',
]

export default function ProductFeature() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="oscar-section section-ivory py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — product image */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden bg-white border border-[#EFE0C0] aspect-square max-w-md mx-auto shadow-lg">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#EFE0C0]">
                <div className="w-48 h-48 rounded-2xl bg-[#1C2B4A] flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-antapani text-white text-2xl">oscar</p>
                    <p className="font-montserrat font-black text-[#C8812E] text-xs tracking-widest mt-1">PROBIOTIC BLEND</p>
                  </div>
                </div>
                <p className="font-montserrat font-light text-xs tracking-widest mt-6 text-[#D4A843]">Product Image</p>
              </div>
            </div>

            {/* Tags */}
            <div className="absolute -top-4 -right-4 flex flex-col gap-2">
              {['Scientifically Formulated', 'Premium Ingredients'].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, x: 16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                  className="bg-[#1C2B4A] text-white font-montserrat font-semibold text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full shadow"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right — benefits */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="font-montserrat font-semibold text-xs tracking-[0.25em] text-[#C8812E] uppercase mb-3"
            >
              Product Spotlight
            </motion.p>
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="font-baskerville font-bold text-4xl lg:text-5xl text-[#1C2B4A] leading-tight mb-4"
            >
              Probiotic Blend Chewables
            </motion.h2>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="font-baskerville italic text-xl text-[#6B6258] mb-8"
            >
              Lamb Liver & Pumpkin Mix
            </motion.p>

            <div className="space-y-5 mb-10">
              {benefits.map(({ icon: Icon, label, desc }) => (
                <motion.div
                  key={label}
                  variants={{ hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C8812E]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={18} className="text-[#C8812E]" />
                  </div>
                  <div>
                    <p className="font-montserrat font-bold text-sm text-[#1A1610]">{label}</p>
                    <p className="font-montserrat font-light text-sm text-[#6B6258] mt-0.5">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="grid grid-cols-3 gap-3 mb-8"
            >
              {stats.map(({ value, sub }) => (
                <div key={value} className="bg-[#1A1610] rounded-xl px-4 py-4 text-center">
                  <p className="font-montserrat font-black text-sm text-white leading-tight">{value}</p>
                  <p className="font-montserrat font-light text-[10px] text-white/50 mt-1 leading-tight">{sub}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            >
              <Link to="/product/probiotic-blend">
                <motion.button
                  whileHover={{ scale: 1.02, filter: 'brightness(1.08)' }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#C8812E] text-[#1C2B4A] font-montserrat font-black text-sm uppercase tracking-widest px-10 py-4 rounded-lg"
                >
                  View Product
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-3"
        >
          {badges.map(badge => (
            <span
              key={badge}
              className="border border-[#EFE0C0] bg-white font-montserrat font-semibold text-xs text-[#1C2B4A] tracking-wider px-5 py-2.5 rounded-full uppercase"
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
// ============================================
// END SHOPIFY SECTION: PRODUCT FEATURE
// ============================================
