// ============================================
// SHOPIFY SECTION: INGREDIENTS SHOWCASE
// Copy everything between these comments into
// a new Shopify custom section
// ============================================
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FILTERS = ['ALL', 'Science-backed', 'Premium Sourced', 'Probiotics', 'Others']

const INGREDIENTS = [
  { id: 1,  name: 'Probiotic Blend',         desc: 'Multi-strain live cultures for gut health',     category: 'Probiotics',      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400' },
  { id: 2,  name: 'GOS',                     desc: 'Galactooligosaccharide — prebiotic fiber',     category: 'Science-backed',  image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400' },
  { id: 3,  name: 'FOS',                     desc: 'Fructooligosaccharides — prebiotic support',   category: 'Science-backed',  image: 'https://images.unsplash.com/photo-1559181567-c3190ca9d222?w=400' },
  { id: 4,  name: 'Postbiotic Yeast Blend',  desc: 'Immune-modulating yeast cell wall fractions',  category: 'Science-backed',  image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?w=400' },
  { id: 5,  name: 'Lamb Liver',              desc: 'High-palatability protein & nutrient source',  category: 'Premium Sourced', image: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=400' },
  { id: 6,  name: 'Pumpkin',                 desc: 'Digestive fiber & natural beta-carotene',      category: 'Premium Sourced', image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=400' },
  { id: 7,  name: 'Coconut Oil',             desc: 'MCT fats for coat health & energy',            category: 'Premium Sourced', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400' },
  { id: 8,  name: 'Apple Cider Vinegar',     desc: 'pH-balancing gut support',                     category: 'Others',          image: 'https://images.unsplash.com/photo-1576834872011-c7b0509b1cca?w=400' },
  { id: 9,  name: 'Sunflower Lecithin',      desc: 'Emulsifier & choline source for cognition',    category: 'Others',          image: 'https://images.unsplash.com/photo-1490885578174-acda8905c2c6?w=400' },
  { id: 10, name: 'Rosemary Extract',        desc: 'Natural antioxidant & preservative',           category: 'Others',          image: 'https://images.unsplash.com/photo-1515586838455-8b5ae2d9c0e6?w=400' },
]

const CATEGORY_STYLES = {
  'Probiotics':       { bg: '#1C2B4A', text: '#FFFFFF' },
  'Science-backed':   { bg: '#C8812E', text: '#FFFFFF' },
  'Premium Sourced':  { bg: '#D4A843', text: '#1A1610' },
  'Others':           { bg: '#E5E5E5', text: '#6B6258' },
}

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
  const style = CATEGORY_STYLES[item.category]
  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, scale: 0.94 }}
      whileHover={{ y: -6, boxShadow: '0 12px 32px rgba(0,0,0,0.12)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white rounded-2xl overflow-hidden flex flex-col"
      style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
    >
      <div className="relative h-[200px] w-full overflow-hidden bg-[#F9F4EC]">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-montserrat font-bold text-[15px] text-[#1A1610] leading-snug">{item.name}</h3>
        <p className="font-montserrat font-light text-[13px] text-[#6B6258] mt-1.5 leading-relaxed line-clamp-2 flex-1">
          {item.desc}
        </p>
        <span
          className="self-start mt-4 font-montserrat font-bold text-[10px] uppercase px-2.5 py-1 rounded-full"
          style={{ backgroundColor: style.bg, color: style.text, letterSpacing: '0.1em' }}
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
      className="oscar-section bg-white py-16 md:py-24 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-4">
          <p className="font-montserrat font-bold text-[11px] tracking-[0.25em] uppercase text-[#C8812E]">
            What Goes Inside
          </p>
        </div>
        <h2 className="font-baskerville font-bold text-4xl lg:text-5xl text-[#1C2B4A] text-center mb-4">
          Premium-sourced ingredients
        </h2>
        <p className="font-montserrat font-normal text-base text-[#6B6258] max-w-xl mx-auto text-center mb-12">
          Every ingredient selected for purpose and purity — no fluff, no fillers.
        </p>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {FILTERS.map(f => {
            const isActive = active === f
            return (
              <motion.button
                key={f}
                onClick={() => setActive(f)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`font-montserrat font-bold text-[11px] uppercase px-5 py-2.5 rounded-full border transition-colors duration-200 ${
                  isActive
                    ? 'bg-[#1C2B4A] text-white border-[#1C2B4A]'
                    : 'bg-white text-[#1C2B4A] border-[#1C2B4A]'
                }`}
                style={{ letterSpacing: '0.15em' }}
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
