// ============================================
// SHOPIFY SECTION: HERO
// Copy everything between these comments into
// a new Shopify custom section
// ============================================
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80'

const PRESS = ['THE EDGE', 'THE STAR', 'BUSINESS TODAY', 'FORBES', 'FMT']

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section className="oscar-section relative bg-white pt-[72px]">
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-72px)]">

        {/* Left — text */}
        <div className="flex items-center px-6 sm:px-10 lg:px-16 py-16 lg:py-0">
          <motion.div
            variants={stagger} initial="hidden" animate="visible"
            className="max-w-xl w-full"
          >
            <motion.p
              variants={fadeUp}
              className="font-montserrat font-bold text-[11px] tracking-[0.25em] uppercase text-[#C8812E] mb-6"
            >
              Malaysia's #1 Pet Supplement
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-baskerville font-bold text-5xl sm:text-6xl lg:text-[64px] text-[#1A1610] leading-[1.05]"
            >
              Premium Care<br />
              Your Dog<br />
              Deserves.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-montserrat font-normal text-base lg:text-lg text-[#6B6258] mt-7 max-w-[440px] leading-relaxed"
            >
              Formulated by experts. Backed by science. Made for pets who deserve better — Malaysia's first premium chewable for dogs.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mt-9">
              <Link to="/shop">
                <motion.button
                  whileHover={{ scale: 1.03, filter: 'brightness(1.08)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="inline-flex items-center gap-2 bg-[#C8812E] text-white font-montserrat font-black text-sm tracking-wider uppercase px-8 py-4 rounded-full"
                >
                  Shop Now <ArrowRight size={16} />
                </motion.button>
              </Link>
              <Link to="/science">
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: '#1C2B4A', color: '#FFFFFF' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="border-2 border-[#1C2B4A] text-[#1C2B4A] font-montserrat font-black text-sm tracking-wider uppercase px-8 py-4 rounded-full bg-transparent"
                >
                  Our Science
                </motion.button>
              </Link>
            </motion.div>

            {/* Stat strip */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#EFE0C0]">
              {[
                { v: '3B', s: 'CFU per chew' },
                { v: '94%', s: 'Customer rating' },
                { v: '#1', s: 'In Malaysia' },
              ].map(stat => (
                <div key={stat.s}>
                  <p className="font-baskerville font-bold text-3xl text-[#1C2B4A]">{stat.v}</p>
                  <p className="font-montserrat font-normal text-xs text-[#6B6258] mt-1">{stat.s}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right — image */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[60vh] lg:min-h-full overflow-hidden bg-[#F9F4EC]"
        >
          <img
            src={HERO_IMAGE}
            alt="Dog with owner"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1C2B4A]/30 via-transparent to-transparent" />

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-8 left-8 bg-white rounded-2xl shadow-xl px-5 py-3.5 max-w-[200px]"
          >
            <p className="font-montserrat font-black text-xs tracking-widest text-[#C8812E] uppercase">Vet-Approved</p>
            <p className="font-baskerville font-bold text-lg text-[#1C2B4A] leading-tight mt-0.5">Probiotic Blend</p>
            <p className="font-montserrat font-normal text-xs text-[#6B6258] mt-0.5">Lamb Liver & Pumpkin</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="absolute top-8 right-8 bg-[#1C2B4A] rounded-full px-4 py-2 shadow-xl"
          >
            <p className="font-montserrat font-black text-[11px] tracking-widest text-[#C8812E] uppercase">DVS Registered</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="hidden lg:flex absolute bottom-28 left-[25%] -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-montserrat font-medium text-[10px] tracking-[0.3em] uppercase text-[#6B6258]">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
          <ChevronDown size={16} className="text-[#C8812E]" />
        </motion.div>
      </motion.div>

      {/* Press bar */}
      <div className="border-t border-[#EFE0C0] py-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-5">
          <p className="font-montserrat font-medium text-[10px] tracking-[0.3em] uppercase text-[#6B6258] text-center">As Seen In</p>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex marquee-track gap-16 px-8">
            {[...PRESS, ...PRESS, ...PRESS].map((logo, i) => (
              <span
                key={i}
                className="font-montserrat font-black text-sm tracking-[0.2em] text-[#1C2B4A]/40 whitespace-nowrap"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
// ============================================
// END SHOPIFY SECTION: HERO
// ============================================
