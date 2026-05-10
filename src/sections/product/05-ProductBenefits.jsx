import { motion } from 'framer-motion'
import { PRODUCT_BENEFITS } from '../../data/product'

/**
 * SECTION 05 — PRODUCT BENEFITS
 * ─────────────────────────────────────────────────────────
 * Two columns:
 *  • LEFT  : heading w/ italic emphasis ("the next level") + 5 benefit rows
 *           Each row = circular 56px photo + bold title + description, divided by hairline.
 *  • RIGHT : large lifestyle image (man + dog outdoors), 4:5, with brand mark stamp top-left.
 */
export default function ProductBenefits() {
  return (
    <>
      <span id="benefits" className="block relative -top-32 invisible" />
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: heading + 5 circular-photo benefits */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-baskerville font-bold text-3xl md:text-4xl lg:text-[44px] leading-[1.15] text-[#1A1A18] tracking-tight"
            >
              Take your dog's gut health & comfort to{' '}
              <em className="font-baskerville italic font-bold">the next level</em>
            </motion.h2>

            <ul className="mt-10 divide-y divide-[#EFEFED]">
              {PRODUCT_BENEFITS.map((b, i) => (
                <motion.li
                  key={b.title}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-5 py-6 first:pt-0 last:pb-0"
                >
                  <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-[#FAFAF7]">
                    <img src={b.img} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-montserrat font-bold text-[16px] text-[#1A1A18] leading-snug">{b.title}</p>
                    <p className="font-montserrat text-[14px] text-[#6B6B6B] mt-1.5 leading-relaxed">{b.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* RIGHT: large lifestyle image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-[4/5]  overflow-hidden bg-[#FAFAF7] relative"
          >
            <img
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1000&q=80"
              alt="Owner giving probiotic chew to dog outdoors"
              className="w-full h-full object-cover"
            />
            {/* Brand mark */}
            <div className="absolute top-4 left-4 w-9 h-9 bg-[#1A1A18]  flex items-center justify-center">
              <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
                <polygon points="16,4 28,12 28,24 16,28 4,24 4,12" fill="#0a0a0a"/>
                <polygon points="16,9 22,15 16,22 10,15" fill="white"/>
              </svg>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
