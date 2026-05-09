// ============================================
// SHOPIFY SECTION: OUR MISSION
// Copy everything between these comments into
// a new Shopify custom section
// ============================================
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const sectionVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const cards = [
  {
    num: '01',
    title: 'Science-backed formulas',
    body: 'All formulas are rigorously researched and tested. No unwanted fillers, only 100% concentrated beneficial compounds.',
    href: '/about#mission-1',
  },
  {
    num: '02',
    title: 'Premium-sourced ingredients',
    body: 'We believe our pets should only deserve the best. We prioritize ingredient origin and integrity in every product.',
    href: '/about#mission-2',
  },
  {
    num: '03',
    title: 'Every pet wants to be loved',
    body: "Pets can't talk, but they want to be loved also. Read our journey and the story behind Oscar Pets.",
    href: '/about#mission-3',
  },
]

export default function OurMission() {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="oscar-section grain-bg py-16 md:py-24 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-12 gap-10 mb-12 lg:mb-16 items-end">
          <div className="lg:col-span-7">
            <p className="font-montserrat font-bold text-[11px] tracking-[0.25em] uppercase text-[#0a0a0a] mb-4">
              Who We Are
            </p>
            <h2
              className="font-montserrat font-black text-5xl md:text-7xl lg:text-[96px] text-[#1A1A18] uppercase leading-[0.95]"
              style={{ letterSpacing: '-2px' }}
            >
              Our<br />Mission
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-4">
            <p className="font-baskerville italic text-lg lg:text-xl text-[#6B6B6B] leading-relaxed max-w-md">
              Three commitments that guide every formulation, every sourcing decision, every chew.
            </p>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-3 gap-5 lg:gap-6"
        >
          {cards.map(card => (
            <motion.div
              key={card.num}
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: '0 12px 32px rgba(0,0,0,0.10)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white rounded-2xl border border-[#EFEFED] p-8 flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-7">
                <div className="w-12 h-12 rounded-full border-2 border-[#0a0a0a] flex items-center justify-center">
                  <span className="font-montserrat font-black text-sm text-[#0a0a0a]">{card.num}</span>
                </div>
              </div>
              <h3 className="font-baskerville font-bold text-xl text-[#1A1A18] mb-4 leading-snug">
                {card.title}
              </h3>
              <p
                className="font-montserrat font-normal text-sm text-[#6B6B6B] flex-1"
                style={{ lineHeight: 1.7 }}
              >
                {card.body}
              </p>
              <Link to={card.href} className="mt-7 inline-flex items-center gap-1.5 group/link">
                <span className="font-montserrat font-bold text-[11px] uppercase text-[#0a0a0a] group-hover/link:underline" style={{ letterSpacing: '1.5px' }}>
                  Read More
                </span>
                <ArrowUpRight size={14} className="text-[#0a0a0a] transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}
// ============================================
// END SHOPIFY SECTION: OUR MISSION
// ============================================
