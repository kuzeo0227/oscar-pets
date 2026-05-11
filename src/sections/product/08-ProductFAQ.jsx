import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FAQS } from '../../data/product'
import SectionHead from './_shared/SectionHead'

/**
 * SECTION 08 — PRODUCT FAQ
 * ─────────────────────────────────────────────────────────
 * Off-white section, max-w-3xl centered.
 * Each question is a button — clicking expands the answer (animated max-height).
 * The plus icon rotates 45° → × and inverts to white-on-black when open.
 * First item starts open by default.
 */
export default function ProductFAQ() {
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <>
      <span id="faq" className="block relative -top-32 invisible" />
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHead label="Got Questions?" title="Frequently asked" />

          <div className="mt-10 border-t border-[#EFEFED]">
            {FAQS.map((f, i) => {
              const open = openFaq === i
              return (
                <div key={i} className="border-b border-[#EFEFED]">
                  <button
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                  >
                    <span className="font-montserrat font-bold text-sm md:text-base text-[#1A1A18] group-hover:text-[#0a0a0a] transition-colors">
                      {f.q}
                    </span>
                    <motion.span
                      animate={{
                        rotate:          open ? 45 : 0,
                        backgroundColor: open ? '#1A1A18' : 'transparent',
                        color:           open ? '#FFFFFF' : '#6B6B6B',
                      }}
                      className="w-6 h-6 rounded-full border-2 border-[#1A1A18]/40 flex items-center justify-center flex-shrink-0"
                    >
                      <Plus size={14} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="font-montserrat text-sm text-[#6B6B6B] leading-relaxed pb-5 pr-10">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
