import { motion } from 'framer-motion'

/**
 * Hover-reveal ingredient card.
 * Default face shows image + name + dose pill + short blurb.
 * On hover, an off-black overlay slides in showing benefits as bullet arrows.
 */
const fadeUp = {
  hidden:  { opacity: 0, y: 26 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
}

export default function IngredientCard({ ing, delay }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp} custom={delay * 12}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative overflow-hidden bg-white border border-[#EFEFED] cursor-pointer aspect-[3/4]"
    >
      {/* Default face */}
      <div className="h-[55%] overflow-hidden">
        <img src={ing.img} alt={ing.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="font-display tracking-tight text-[#0a0a0a]" style={{ fontSize: 14, fontWeight: 700 }}>{ing.name}</p>
        <span
          className="inline-block font-mono uppercase mt-2 mb-2"
          style={{ fontSize: 10, fontWeight: 400, letterSpacing: '0.18em', color: '#0a0a0a', border: '1px solid #0a0a0a', padding: '3px 8px', borderRadius: 0 }}
        >
          {ing.dose}
        </span>
        <p className="font-display" style={{ fontSize: 12.5, fontWeight: 400, color: '#6b6b6b', lineHeight: 1.55 }}>{ing.short}</p>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-[#0a0a0a] text-white p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="font-serif leading-tight mb-3" style={{ fontSize: 18, fontWeight: 700 }}>{ing.name}</p>
        <ul className="flex flex-col gap-2">
          {ing.benefits.map(b => (
            <li key={b} className="font-display flex gap-2 leading-snug" style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
              <span style={{ color: '#ffffff' }}>→</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
