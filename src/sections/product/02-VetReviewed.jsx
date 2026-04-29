import { motion } from 'framer-motion'
import { VET } from '../../data/product'

/**
 * SECTION 02 — VET REVIEWED
 * ─────────────────────────────────────────────────────────
 * Dark off-black section with two columns:
 *  • LEFT  : large italic Baskerville quote + DR avatar + name + title
 *  • RIGHT : 2×2 stat grid (3B / 29 / 89% / 4.9★)
 * Decorative copper-green border rings in the corners.
 */
export default function VetReviewed() {
  return (
    <>
      <span id="vet" className="block relative -top-32 invisible" />
      <section className="relative bg-[#1A1A18] text-white py-20 md:py-24 overflow-hidden">
        {/* Decorative rings */}
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full border-[56px] border-white/[0.04] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full border-[40px] border-[#06C265]/[0.06] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative">
          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-montserrat font-bold text-[10px] tracking-[0.25em] uppercase text-white/45 mb-4">
              Vet Reviewed
            </p>
            <blockquote className="relative font-baskerville italic text-2xl md:text-3xl lg:text-[34px] font-normal leading-[1.4] text-white">
              <span className="absolute -left-4 -top-2 text-[80px] leading-none text-[#06C265]/20 not-italic font-bold">"</span>
              {VET.quote}
            </blockquote>
            <div className="mt-7 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/10 border-2 border-white/15 flex items-center justify-center font-montserrat font-bold text-base text-white/70">
                {VET.initials}
              </div>
              <div>
                <p className="font-montserrat font-bold text-sm text-white">{VET.name}</p>
                <p className="font-montserrat text-xs text-white/50 mt-1">{VET.title}</p>
              </div>
            </div>
          </motion.div>

          {/* Stat grid */}
          <motion.div
            initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-0.5"
          >
            {VET.stats.map((s, i) => (
              <motion.div
                key={s.n}
                whileHover={{ backgroundColor: 'rgba(6,194,101,0.12)' }}
                className={`bg-white/[0.05] p-7 ${
                  i === 0 ? 'rounded-tl-2xl' :
                  i === 1 ? 'rounded-tr-2xl' :
                  i === 2 ? 'rounded-bl-2xl' :
                            'rounded-br-2xl'
                }`}
              >
                <p className="font-baskerville font-bold text-4xl md:text-[38px] leading-none tracking-tight text-white mb-2">{s.n}</p>
                <p className="font-montserrat text-xs text-white/50 leading-relaxed">{s.t}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
