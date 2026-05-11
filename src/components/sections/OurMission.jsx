// ============================================
// SHOPIFY SECTION: OUR MISSION
// ============================================
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const sectionVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}
const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
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
      className="oscar-section py-28 lg:py-36"
      style={{ background: '#ffffff' }}
    >
      <div className="container-edge mx-auto">

        <div className="grid lg:grid-cols-12 lg:gap-x-12 gap-y-8 mb-14 items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-6" style={{ color: '#6b6b6b' }}>
              05 — WHY OSCAR
            </p>
            <h2
              className="font-serif text-[#0a0a0a]"
              style={{ fontSize: 'clamp(40px, 5.6vw, 80px)', fontWeight: 700, lineHeight: 1.04, letterSpacing: '-0.01em' }}
            >
              A laboratory you'd be <em className="italic">proud</em> to feed your dog from.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pb-3">
            <p className="font-display max-w-md" style={{ fontSize: 15.5, fontWeight: 400, color: '#6b6b6b', lineHeight: 1.7 }}>
              Three commitments that guide every formulation, every sourcing decision, every chew.
            </p>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-3 gap-0"
          style={{ borderTop: '1px solid var(--color-rule)', borderLeft: '1px solid var(--color-rule)' }}
        >
          {cards.map(card => (
            <motion.div
              key={card.num}
              variants={cardVariants}
              whileHover={{ background: '#ffffff' }}
              className="bg-white p-8 lg:p-10 flex flex-col h-full"
              style={{ borderRight: '1px solid var(--color-rule)', borderBottom: '1px solid var(--color-rule)' }}
            >
              <p
                className="font-mono num-mono mb-6"
                style={{ fontSize: 'clamp(48px, 5.4vw, 72px)', fontWeight: 700, color: '#0a0a0a', lineHeight: 1, letterSpacing: '-0.02em' }}
              >
                {card.num}
              </p>
              <h3
                className="font-serif text-[#0a0a0a] mb-4"
                style={{ fontSize: 'clamp(20px, 1.8vw, 26px)', fontWeight: 700, lineHeight: 1.15 }}
              >
                {card.title}
              </h3>
              <p className="font-display flex-1" style={{ fontSize: 14.5, fontWeight: 400, color: '#6b6b6b', lineHeight: 1.7 }}>
                {card.body}
              </p>
              <Link to={card.href} className="mt-8 inline-flex items-center gap-1.5">
                <span className="font-mono" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0a0a0a', borderBottom: '1px solid #0a0a0a', paddingBottom: 2 }}>
                  Read More →
                </span>
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
