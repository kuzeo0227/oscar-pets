import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scholar } from '../data/ingredient-studies'

const ease = [0.22, 1, 0.36, 1]

/**
 * IngredientStudyModal — fullscreen modal showing FOUND IN / FUNCTION /
 * BENEFITS + peer-reviewed studies for a single ingredient.
 *
 * Closes on:
 *   • ESC key
 *   • Click on the dimmed overlay
 *   • Click on the × button
 *
 * Used by /science (LAB) grid and /product ingredient slider.
 */
export default function IngredientStudyModal({ ingredient, onClose }) {
  useEffect(() => {
    if (!ingredient) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [ingredient, onClose])

  return (
    <AnimatePresence>
      {ingredient && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center px-4"
          style={{ zIndex: 100 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease }}
          aria-modal="true" role="dialog"
        >
          {/* Overlay — click to close */}
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 cursor-pointer"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', border: 0 }}
          />

          {/* Panel */}
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease }}
            className="relative bg-white"
            style={{
              width: 'min(860px, 92vw)',
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: 'clamp(24px, 4vw, 48px)',
              borderRadius: 0,
            }}
          >
            {/* Top bar */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-5">
                <div
                  className="overflow-hidden rounded-full flex-shrink-0"
                  style={{ width: 48, height: 48, background: '#ffffff' }}
                >
                  <img src={ingredient.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: '0.2em', color: '#6b6b6b' }}>
                    Ingredient Study
                  </p>
                  <h3
                    className="font-serif text-[#0a0a0a] mt-1"
                    style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.15 }}
                  >
                    {ingredient.name}
                  </h3>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="font-mono cursor-pointer"
                style={{ fontSize: 14, color: '#0a0a0a', background: 'transparent', border: 0 }}
              >
                ×
              </button>
            </div>

            <div style={{ height: 1, background: 'var(--color-rule)', margin: '24px 0' }} />

            {/* 3-column breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderLeft: '1px solid var(--color-rule)' }}>
              <Block title="FOUND IN" body={ingredient.foundIn} />
              <Block title="FUNCTION" body={ingredient.function} />
              <Block title="BENEFITS" body={
                <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {ingredient.benefits.map((b, i) => (
                    <li key={i} className="grid grid-cols-[1.5rem_1fr] gap-1 mb-3">
                      <span className="font-mono num-mono" style={{ fontSize: 11, color: '#9a9a96', paddingTop: 2 }}>0{i + 1}</span>
                      <span className="font-display" style={{ fontSize: 14, color: '#0a0a0a', lineHeight: 1.55 }}>{b}</span>
                    </li>
                  ))}
                </ol>
              } />
            </div>

            {/* Research section */}
            <div className="mt-10">
              <p className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: '0.2em', color: '#6b6b6b', marginBottom: 16 }}>
                Peer-reviewed research
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {ingredient.studies.map((s, i) => (
                  <li
                    key={i}
                    className="py-5"
                    style={{ borderBottom: i === ingredient.studies.length - 1 ? 'none' : '1px solid var(--color-rule)' }}
                  >
                    <p className="font-display" style={{ fontSize: 13, fontWeight: 600, color: '#0a0a0a', lineHeight: 1.45 }}>
                      {s.title}
                    </p>
                    <p className="font-display mt-1" style={{ fontSize: 12, color: '#6b6b6b' }}>
                      {s.authors} · {s.journal} · {s.year}
                    </p>
                    <p className="font-display italic mt-2" style={{ fontSize: 13, color: '#6b6b6b', lineHeight: 1.6 }}>
                      {s.finding}
                    </p>
                    <a
                      href={scholar(s.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono uppercase mt-2 inline-block"
                      style={{ fontSize: 11, letterSpacing: '0.18em', color: '#0a0a0a', borderBottom: '1px solid #0a0a0a', paddingBottom: 1 }}
                    >
                      Find on Scholar →
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom bar */}
            <div
              className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
              style={{ borderTop: '1px solid var(--color-rule)', paddingTop: 20 }}
            >
              <p className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: '0.16em', color: '#6b6b6b' }}>
                {ingredient.metric}
              </p>
              <p className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: '0.16em', color: '#9a9a96' }}>
                Press ESC to close
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Block({ title, body }) {
  return (
    <div
      className="p-6 lg:p-7"
      style={{ borderRight: '1px solid var(--color-rule)', borderBottom: '1px solid var(--color-rule)' }}
    >
      <p className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: '0.2em', color: '#6b6b6b' }}>
        {title}
      </p>
      <div className="font-display mt-3" style={{ fontSize: 14, color: '#0a0a0a', lineHeight: 1.7 }}>
        {typeof body === 'string' ? <p>{body}</p> : body}
      </div>
    </div>
  )
}
