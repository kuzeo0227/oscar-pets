// ============================================
// SHOPIFY SECTION: SCIENCE PREVIEW
// Copy everything between these comments into
// a new Shopify custom section
// ============================================
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, BookOpen } from 'lucide-react'

const articles = [
  {
    id: 1,
    title: 'B. Coagulans effectiveness tested in dogs',
    excerpt: 'A clinical study evaluating the survival and colonisation rate of Bacillus coagulans in canine gastrointestinal tracts across multiple breed sizes.',
    tag: 'Probiotics',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Rising gut health problems in various dog breeds',
    excerpt: 'An analysis of increasing gastrointestinal disorders in companion dogs correlated with ultra-processed commercial diets and reduced microbiome diversity.',
    tag: 'Gut Health',
    readTime: '7 min read',
  },
  {
    id: 3,
    title: 'Probiotics effect on dogs',
    excerpt: 'Meta-analysis of 18 controlled studies examining probiotic supplementation outcomes in dogs — stool quality, immune response, and coat condition.',
    tag: 'Research',
    readTime: '6 min read',
  },
]

export default function SciencePreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="oscar-section bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6"
        >
          <div>
            <p className="font-montserrat font-semibold text-xs tracking-[0.25em] text-[#06C265] uppercase mb-3">
              Evidence-Based
            </p>
            <h2 className="font-baskerville font-bold text-4xl lg:text-5xl text-[#1A1A18] mb-3">
              Science-backed formulas
            </h2>
            <p className="font-baskerville italic text-lg text-[#6B6B6B] max-w-lg">
              We develop our brand and products based on research done on articles and peer-reviewed research.
            </p>
          </div>
          <Link to="/science">
            <motion.span
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-2 font-montserrat font-bold text-sm text-[#1A1A18] uppercase tracking-widest border-b-2 border-[#06C265] pb-0.5"
            >
              View All Research <ArrowRight size={14} />
            </motion.span>
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid md:grid-cols-3 gap-6"
        >
          {articles.map(article => (
            <Link key={article.id} to="/science">
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 32 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
                }}
                whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(26,26,24,0.10)' }}
                className="bg-[#FAFAF7] rounded-3xl overflow-hidden border border-[#EFEFED] group h-full"
              >
                {/* Thumbnail */}
                <div className="h-44 bg-[#1A1A18] flex items-center justify-center relative overflow-hidden">
                  <BookOpen size={48} className="text-[#06C265] opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18] to-transparent" />
                  <span className="absolute bottom-4 left-5 font-montserrat font-semibold text-xs text-white/60 uppercase tracking-widest">
                    {article.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-baskerville font-bold text-lg text-[#1A1A18] leading-snug mb-3 group-hover:text-[#1A1A18] transition-colors">
                    {article.title}
                  </h3>
                  <p className="font-montserrat font-light text-sm text-[#6B6B6B] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-5">
                    <span className="font-montserrat font-light text-xs text-[#6B6B6B]">{article.readTime}</span>
                    <motion.span
                      whileHover={{ x: 3 }}
                      className="font-montserrat font-bold text-xs text-[#06C265] uppercase tracking-widest"
                    >
                      Read →
                    </motion.span>
                  </div>
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
