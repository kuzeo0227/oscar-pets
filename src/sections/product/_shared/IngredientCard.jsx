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
      className="group relative rounded-2xl overflow-hidden bg-[#FAFAF7] border border-[#EFEFED] cursor-pointer aspect-[3/4]"
    >
      {/* Default face */}
      <div className="h-[55%] overflow-hidden">
        <img src={ing.img} alt={ing.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="font-montserrat font-bold text-sm text-[#1A1A18] tracking-tight">{ing.name}</p>
        <span className="inline-block font-montserrat font-bold text-[10px] tracking-[0.1em] uppercase text-[#1A1A18] bg-[#EFEFED] px-2 py-0.5 rounded-full mt-2 mb-2">
          {ing.dose}
        </span>
        <p className="font-montserrat text-xs text-[#6B6B6B] leading-relaxed">{ing.short}</p>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-[#1A1A18] text-white p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="font-baskerville font-bold text-lg leading-tight mb-3">{ing.name}</p>
        <ul className="flex flex-col gap-2">
          {ing.benefits.map(b => (
            <li key={b} className="font-montserrat text-xs text-white/80 flex gap-2 leading-snug">
              <span className="text-[#06C265]">→</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
