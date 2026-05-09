// ============================================
// SHOPIFY SECTION: INGREDIENTS SHOWCASE
// ============================================
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FILTERS = ['ALL', 'SCIENCE-BACKED', 'PREMIUM SOURCED', 'PROBIOTICS', 'OTHERS']

const img = (seed) => `https://picsum.photos/seed/${seed}/400/400`

const INGREDIENTS = [
  { id: 1,  name: 'Probiotic Blend',         desc: 'Multi-strain live cultures for gut health',     category: 'PROBIOTICS',      image: img('oscar-probiotic')  },
  { id: 2,  name: 'GOS',                     desc: 'Galactooligosaccharide — prebiotic fiber',     category: 'SCIENCE-BACKED',  image: img('oscar-gos')        },
  { id: 3,  name: 'FOS',                     desc: 'Fructooligosaccharides — prebiotic support',   category: 'SCIENCE-BACKED',  image: img('oscar-fos')        },
  { id: 4,  name: 'Postbiotic Yeast Blend',  desc: 'Immune-modulating yeast cell wall fractions',  category: 'SCIENCE-BACKED',  image: img('oscar-postbiotic') },
  { id: 5,  name: 'Lamb Liver',              desc: 'High-palatability protein & nutrient source',  category: 'PREMIUM SOURCED', image: img('oscar-lamb-liver') },
  { id: 6,  name: 'Pumpkin',                 desc: 'Digestive fiber & natural beta-carotene',      category: 'PREMIUM SOURCED', image: img('oscar-pumpkin')    },
  { id: 7,  name: 'Coconut Oil',             desc: 'MCT fats for coat health & energy',            category: 'PREMIUM SOURCED', image: img('oscar-coconut')    },
  { id: 8,  name: 'Apple Cider Vinegar',     desc: 'pH-balancing gut support',                     category: 'OTHERS',          image: img('oscar-acv')        },
  { id: 9,  name: 'Sunflower Lecithin',      desc: 'Emulsifier & choline source for cognition',    category: 'OTHERS',          image: img('oscar-sunflower')  },
  { id: 10, name: 'Rosemary Extract',        desc: 'Natural antioxidant & preservative',           category: 'OTHERS',          image: img('oscar-rosemary')   },
]

const sectionVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}
const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

function IngredientCard({ item }) {
  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -6, boxShadow: '0 12px 32px rgba(0,0,0,0.10)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="bg-white overflow-hidden flex flex-col"
      style={{ border: '1px solid var(--color-rule)', borderRadius: 0 }}
    >
      <div className="relative h-[200px] w-full overflow-hidden" style={{ background: 'var(--color-paper-soft)' }}>
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display" style={{ fontSize: 15, fontWeight: 700, color: '#0a0a0a', lineHeight: 1.25 }}>
          {item.name}
        </h3>
        <p className="font-display mt-2 flex-1" style={{ fontSize: 13, fontWeight: 400, color: '#6b6b6b', lineHeight: 1.55 }}>
          {item.desc}
        </p>
        <span
          className="font-mono self-start mt-4"
          style={{
            fontSize: 10, fontWeight: 400, letterSpacing: '0.18em',
            background: '#0a0a0a', color: '#ffffff',
            padding: '4px 10px', borderRadius: 0,
          }}
        >
          {item.category}
        </span>
      </div>
    </motion.div>
  )
}

export default function IngredientsShowcase() {
  const [active, setActive] = useState('ALL')

  const visible = active === 'ALL'
    ? INGREDIENTS
    : INGREDIENTS.filter(i => i.category === active)

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="oscar-section bg-white py-24 lg:py-32"
    >
      <div className="container-edge mx-auto">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow mb-6" style={{ color: '#6b6b6b' }}>
            03 — WHAT GOES INSIDE
          </p>
          <h2
            className="font-serif text-[#0a0a0a]"
            style={{ fontSize: 'clamp(36px, 4.4vw, 56px)', fontWeight: 700, lineHeight: 1.05 }}
          >
            Premium-sourced <em className="italic">ingredients</em>.
          </h2>
          <p className="font-display mt-5 mx-auto max-w-md" style={{ fontSize: 15.5, fontWeight: 400, color: '#6b6b6b', lineHeight: 1.65 }}>
            Every ingredient selected for purpose and purity — no fluff, no fillers.
          </p>
        </div>

        {/* Filter pills — flat, square */}
        <div className="flex flex-wrap gap-0 justify-center mb-12" style={{ border: '1px solid var(--color-rule)' }}>
          {FILTERS.map((f, i) => {
            const isActive = active === f
            return (
              <motion.button
                key={f}
                onClick={() => setActive(f)}
                whileTap={{ scale: 0.98 }}
                className="font-mono"
                style={{
                  fontSize: 11, fontWeight: 400, letterSpacing: '0.18em',
                  padding: '12px 22px',
                  background: isActive ? '#0a0a0a' : 'transparent',
                  color: isActive ? '#ffffff' : '#0a0a0a',
                  borderLeft: i === 0 ? 'none' : '1px solid var(--color-rule)',
                  transition: 'background 0.2s, color 0.2s',
                  borderRadius: 0,
                }}
              >
                {f}
              </motion.button>
            )
          })}
        </div>

        {/* Grid */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {visible.map(item => <IngredientCard key={item.id} item={item} />)}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  )
}
// ============================================
// END SHOPIFY SECTION: INGREDIENTS SHOWCASE
// ============================================
