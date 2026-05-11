import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { INGREDIENTS, QUALITY_ITEMS } from '../../data/product'
import SectionHead from './_shared/SectionHead'
import IngredientCard from './_shared/IngredientCard'

/**
 * SECTION 03 — KEY INGREDIENTS (with embedded Quality block)
 * ─────────────────────────────────────────────────────────
 * Two stacked sub-blocks under one anchor:
 *   1) Ingredient grid: 4 hover-reveal cards (Probiotic, GOS, FOS, Postbiotic)
 *   2) "Cutting-edge science, unmatched quality" — heading + 4 checkmark items + product image
 *
 * Spacing between blocks: mt-20 lg:mt-28
 */
export default function KeyIngredients() {
  return (
    <>
      <span id="ingredients" className="block relative -top-32 invisible" />
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">

          {/* ─── Block 1: Ingredient grid ─── */}
          <SectionHead
            label="What's Inside"
            title="Research-backed active ingredients"
            sub="Every ingredient chosen for a purpose. Hover each card to see exactly how it works."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {INGREDIENTS.map((ing, i) => (
              <IngredientCard key={ing.name} ing={ing} delay={i * 0.08} />
            ))}
          </div>

          {/* ─── Block 2: Quality assurance ─── */}
          <div className="mt-20 lg:mt-28 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-baskerville font-bold text-3xl md:text-4xl lg:text-[42px] leading-[1.1] text-[#1A1A18] tracking-tight"
              >
                Cutting-edge science,<br />unmatched quality
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-montserrat text-base text-[#6B6B6B] mt-5 max-w-md leading-relaxed"
              >
                We stay at the forefront of pet health by combining the latest scientific research with expert insights. Every formula is carefully crafted to deliver the highest-quality ingredients for optimal pet well-being.
              </motion.p>

              <ul className="mt-10 divide-y divide-[#EFEFED]">
                {QUALITY_ITEMS.map((b, i) => (
                  <motion.li
                    key={b.title}
                    initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-start gap-4 py-5 first:pt-0 last:pb-0"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#1A1A18] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={13} className="text-white" strokeWidth={3} />
                    </span>
                    <div>
                      <p className="font-montserrat font-bold text-[15px] text-[#1A1A18] leading-snug">{b.title}</p>
                      <p className="font-montserrat text-[13px] text-[#6B6B6B] mt-1 leading-relaxed">{b.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 1.04 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-[4/5] rounded-3xl overflow-hidden bg-white"
            >
              <img
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&h=700&fit=crop"
                alt="Dog running outdoors"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
