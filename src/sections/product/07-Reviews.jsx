import { motion } from 'framer-motion'
import { Star, Check } from 'lucide-react'
import { PRODUCT, REVIEWS, RATING_DIST } from '../../data/product'
import SectionHead from './_shared/SectionHead'

/**
 * SECTION 07 — REVIEWS
 * ─────────────────────────────────────────────────────────
 * • Header: "Real results from real pet parents" + outlined "Write a Review" CTA
 * • Summary card (off-white): big 4.9 score + stars + bar chart (animated scaleX)
 * • 3 review cards: avatar initials + name/date + stars + bold title + body + verified
 */
const fadeUp = {
  hidden:  { opacity: 0, y: 26 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
}

export default function Reviews() {
  return (
    <>
      <span id="reviews" className="block relative -top-32 invisible" />
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <SectionHead align="left" label="Customer Reviews" title="Real results from real pet parents" />
            </div>
            <button className="self-start font-montserrat font-bold text-[11px] tracking-[0.1em] uppercase border-2 border-[#1A1A18] text-[#1A1A18] hover:bg-[#1A1A18] hover:text-white transition-colors px-5 py-2.5 rounded-full">
              Write a Review
            </button>
          </div>

          {/* Summary card */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeUp}
            className="bg-[#FAFAF7] rounded-2xl p-6 md:p-7 grid md:grid-cols-[auto,1fr] gap-6 md:gap-10 items-center mb-10"
          >
            <div className="flex items-center gap-5">
              <p className="font-baskerville font-bold text-5xl md:text-6xl text-[#1A1A18] leading-none tracking-tight">{PRODUCT.rating}</p>
              <div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="#1A1A18" stroke="#1A1A18" />)}
                </div>
                <p className="font-montserrat text-xs text-[#6B6B6B] mt-1">Based on {PRODUCT.reviewCount.toLocaleString()} verified reviews</p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              {RATING_DIST.map((row, i) => (
                <div key={row.stars} className="flex items-center gap-3">
                  <span className="font-montserrat font-bold text-[10px] text-[#6B6B6B] w-7">{row.stars} ★</span>
                  <div className="flex-1 h-1.5 bg-[#EFEFED] rounded overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      style={{ width: `${row.pct}%`, transformOrigin: 'left' }}
                      className="h-full bg-[#1A1A18] rounded"
                    />
                  </div>
                  <span className="font-montserrat text-[10px] text-[#6B6B6B] w-8 text-right">{row.pct}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Review cards */}
          <div className="grid md:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={r.name}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp} custom={i}
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.08)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-[#FAFAF7] border border-[#EFEFED] rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#1A1A18] text-white font-montserrat font-bold text-xs flex items-center justify-center">
                    {r.name.split(' ').map(s => s[0]).join('')}
                  </div>
                  <div>
                    <p className="font-montserrat font-bold text-sm text-[#1A1A18]">{r.name}</p>
                    <p className="font-montserrat text-xs text-[#6B6B6B]">{r.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="#1A1A18" stroke="#1A1A18" />)}
                </div>
                <p className="font-baskerville font-bold text-base text-[#1A1A18] leading-snug mb-2">{r.title}</p>
                <p className="font-montserrat text-[13px] text-[#6B6B6B] leading-relaxed">{r.body}</p>
                <p className="mt-3 inline-flex items-center gap-1 font-montserrat font-bold text-[10px] tracking-[0.08em] uppercase text-[#06C265]">
                  <Check size={12} /> Verified Purchase
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
