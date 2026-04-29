import { motion } from 'framer-motion'
import { TIMELINE_MONTHS } from '../../data/product'

/**
 * SECTION 06 — WHAT TO EXPECT
 * ─────────────────────────────────────────────────────────
 * Off-white section.
 * • Centered head: eyebrow + divider + "What to expect" + 89% headline + caption
 * • 3-month timeline cards, gap-1, side-by-side. First card has rounded-l-3xl,
 *   last has rounded-r-3xl. Each card turns off-black on hover, with the giant
 *   number fading to 20% opacity for visual contrast.
 */
export default function WhatToExpect() {
  return (
    <>
      <span id="expect" className="block relative -top-32 invisible" />
      <section className="bg-[#FAFAF7] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-montserrat font-bold text-[10px] tracking-[0.25em] uppercase text-[#06C265]">The Journey</p>
            <div className="w-9 h-0.5 bg-[#1A1A18] my-4 mx-auto" />
            <h2 className="font-baskerville font-bold text-3xl md:text-4xl lg:text-[42px] leading-[1.1] text-[#1A1A18] tracking-tight">
              What to expect
            </h2>
            <p className="font-baskerville font-bold text-5xl md:text-6xl text-[#06C265] leading-none tracking-tight mt-6 mb-2">89%</p>
            <p className="font-montserrat text-base text-[#6B6B6B]">of customers see real results within 90 days of consistent use.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-1 mt-12">
            {TIMELINE_MONTHS.map((m, i) => (
              <motion.div
                key={m.n}
                initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ backgroundColor: '#1A1A18' }}
                className={`group bg-white p-8 md:p-10 transition-colors cursor-default ${
                  i === 0 ? 'rounded-l-3xl rounded-r-md' :
                  i === 2 ? 'rounded-r-3xl rounded-l-md' :
                            'rounded-md'
                }`}
              >
                <p className="font-baskerville font-bold text-6xl text-[#EFEFED] group-hover:text-white/20 leading-none tracking-tight mb-4 transition-colors">
                  {m.n}
                </p>
                <p className="font-montserrat font-bold text-base text-[#1A1A18] group-hover:text-white mb-2 transition-colors">{m.t}</p>
                <p className="font-montserrat text-sm text-[#6B6B6B] group-hover:text-white/70 leading-relaxed transition-colors">{m.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
