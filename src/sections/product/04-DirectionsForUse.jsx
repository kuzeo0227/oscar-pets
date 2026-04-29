import { motion } from 'framer-motion'
import { DOSING } from '../../data/product'

/**
 * SECTION 04 — DIRECTIONS FOR USE
 * ─────────────────────────────────────────────────────────
 * Two columns:
 *  • LEFT  : lifestyle photo (4:5)
 *  • RIGHT : "Daily directions for use for *optimal* results" + clean dose table
 *
 * Table: Dog Size column | Dot indicators + dose text column
 *        Thin #EFEFED dividers between rows.
 */
export default function DirectionsForUse() {
  return (
    <>
      <span id="directions" className="block relative -top-32 invisible" />
      <section className="bg-[#FAFAF7] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: lifestyle image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-[4/5] rounded-3xl overflow-hidden bg-white order-2 lg:order-1"
          >
            <img
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1000&q=80"
              alt="Owner giving chew to dog"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* RIGHT: heading + table */}
          <div className="order-1 lg:order-2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-baskerville font-bold text-3xl md:text-4xl lg:text-[44px] leading-[1.1] text-[#1A1A18] tracking-tight"
            >
              Daily directions for use for{' '}
              <em className="font-baskerville italic font-bold">optimal</em> results
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10"
            >
              {/* Header row */}
              <div className="grid grid-cols-2 pb-3 border-b border-[#EFEFED]">
                <p className="font-montserrat font-medium text-sm text-[#6B6B6B]">Dog Size</p>
                <p className="font-montserrat font-medium text-sm text-[#6B6B6B]">Daily</p>
              </div>

              {DOSING.map((row, i) => (
                <motion.div
                  key={row.size}
                  initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, delay: 0.25 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-2 items-center py-5 border-b border-[#EFEFED]"
                >
                  <div>
                    <p className="font-montserrat font-bold text-base text-[#1A1A18]">{row.size}</p>
                    <p className="font-montserrat font-normal text-sm text-[#6B6B6B] mt-0.5">{row.weight}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      {Array.from({ length: row.dots }).map((_, di) => (
                        <span key={di} className="w-2 h-2 rounded-full bg-[#1A1A18]" />
                      ))}
                    </div>
                    <p className="font-montserrat font-bold text-sm text-[#1A1A18] ml-1">{row.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <p className="mt-6 text-xs font-montserrat text-[#6B6B6B] leading-relaxed">
              ⚠ Consult your veterinarian if your dog is pregnant, nursing, or on medication. Store in a cool, dry place — no refrigeration required.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
