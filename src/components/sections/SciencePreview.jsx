// ============================================
// SHOPIFY SECTION: SCIENCE PREVIEW
// ============================================
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const articles = [
  {
    id: 1,
    title: 'B. Coagulans effectiveness tested in dogs',
    excerpt: 'A clinical study evaluating the survival and colonisation rate of Bacillus coagulans in canine gastrointestinal tracts across multiple breed sizes.',
    tag: 'PROBIOTICS',
    readTime: '5 MIN READ',
  },
  {
    id: 2,
    title: 'Rising gut health problems in various dog breeds',
    excerpt: 'An analysis of increasing gastrointestinal disorders in companion dogs correlated with ultra-processed commercial diets and reduced microbiome diversity.',
    tag: 'GUT HEALTH',
    readTime: '7 MIN READ',
  },
  {
    id: 3,
    title: 'Probiotics effect on dogs',
    excerpt: 'Meta-analysis of 18 controlled studies examining probiotic supplementation outcomes in dogs — stool quality, immune response, and coat condition.',
    tag: 'RESEARCH',
    readTime: '6 MIN READ',
  },
]

const ease = [0.22, 1, 0.36, 1]

export default function SciencePreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="oscar-section bg-white py-24 lg:py-32">
      <div className="container-edge mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="grid lg:grid-cols-2 lg:gap-x-12 gap-y-6 items-end mb-14"
        >
          <div>
            <p className="eyebrow mb-6" style={{ color: '#6b6b6b' }}>
              04 — THE SCIENCE
            </p>
            <h2
              className="font-serif text-[#0a0a0a]"
              style={{ fontSize: 'clamp(36px, 4.4vw, 56px)', fontWeight: 700, lineHeight: 1.05 }}
            >
              Science-backed <em className="italic">formulas</em>.
            </h2>
            <p className="font-display mt-5 max-w-md" style={{ fontSize: 15.5, fontWeight: 400, color: '#6b6b6b', lineHeight: 1.7 }}>
              We develop our brand and products based on peer-reviewed research and clinical evidence — not marketing claims.
            </p>
          </div>
          <div className="lg:justify-self-end">
            <Link to="/science">
              <motion.span
                whileHover={{ x: 4 }}
                className="inline-flex items-center gap-2 font-mono"
                style={{
                  fontSize: 12, fontWeight: 700, letterSpacing: '0.22em',
                  textTransform: 'uppercase', color: '#0a0a0a',
                  paddingBottom: 4, borderBottom: '1px solid #0a0a0a',
                }}
              >
                View All Research →
              </motion.span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid md:grid-cols-3 gap-0"
          style={{ borderTop: '1px solid var(--color-rule)', borderLeft: '1px solid var(--color-rule)' }}
        >
          {articles.map(article => (
            <Link key={article.id} to="/science">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 32 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } }
                }}
                whileHover={{ background: '#ffffff' }}
                className="group h-full p-7 lg:p-8 cursor-pointer"
                style={{ borderRight: '1px solid var(--color-rule)', borderBottom: '1px solid var(--color-rule)' }}
              >
                {/* Tag */}
                <p className="font-mono mb-6" style={{ fontSize: 11, fontWeight: 400, letterSpacing: '0.18em', color: '#6b6b6b' }}>
                  {article.tag}
                </p>
                {/* Title */}
                <h3
                  className="font-serif text-[#0a0a0a]"
                  style={{ fontSize: 'clamp(20px, 1.8vw, 26px)', fontWeight: 700, lineHeight: 1.15 }}
                >
                  {article.title}
                </h3>
                {/* Excerpt */}
                <p className="font-display mt-4" style={{ fontSize: 14.5, fontWeight: 400, color: '#6b6b6b', lineHeight: 1.65 }}>
                  {article.excerpt}
                </p>
                {/* Footer row */}
                <div className="flex items-center justify-between mt-8">
                  <span className="font-mono" style={{ fontSize: 11, fontWeight: 400, letterSpacing: '0.18em', color: '#6b6b6b' }}>
                    {article.readTime}
                  </span>
                  <span
                    className="font-mono group-hover:translate-x-0.5 transition-transform"
                    style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', color: '#0a0a0a' }}
                  >
                    READ →
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
// ============================================
// END SHOPIFY SECTION: SCIENCE PREVIEW
// ============================================
