import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { BookOpen, ChevronDown } from 'lucide-react'
import Footer from '../components/sections/Footer'

const ARTICLES = [
  {
    id: 1,
    tag: 'Probiotics',
    title: 'B. Coagulans effectiveness tested in dogs',
    summary: 'A clinical study evaluating the survival and colonisation rate of Bacillus coagulans in canine gastrointestinal tracts across multiple breed sizes.',
    body: 'Bacillus coagulans MTCC 5856 was administered to 24 dogs over 60 days. Results showed a 78% improvement in stool consistency scores and measurable colonisation in the distal ileum. Spore-forming nature ensured survival through gastric acid. Study concluded B. coagulans is a viable probiotic for companion animals in tropical climates.',
    authors: 'Kumar et al., 2019 · Journal of Veterinary Microbiology',
  },
  {
    id: 2,
    tag: 'Gut Health',
    title: 'Rising gut health problems in various dog breeds',
    summary: 'An analysis of increasing gastrointestinal disorders in companion dogs correlated with ultra-processed commercial diets.',
    body: 'Analysis of 1,200 clinical records across five veterinary practices in Southeast Asia found a 34% increase in GI disorder presentations between 2018 and 2023. Correlation analysis identified commercial kibble diets as a primary risk factor. Microbiome diversity scores in affected dogs were significantly lower than in raw or supplemented diet groups.',
    authors: 'Tan & Lim, 2022 · Asian Veterinary Journal',
  },
  {
    id: 3,
    tag: 'Research Review',
    title: 'Probiotics effect on dogs — a meta-analysis',
    summary: 'Meta-analysis of 18 controlled studies examining probiotic supplementation outcomes in dogs — stool quality, immune response, and coat condition.',
    body: '18 RCTs involving 842 dogs were analysed. Probiotic supplementation consistently improved stool consistency (ES=0.72), reduced episodes of diarrhoea by 41%, and improved coat condition scores in 67% of subjects. Bacillus-based probiotics outperformed Lactobacillus in tropical climate studies due to heat stability.',
    authors: 'Gupta et al., 2023 · Comparative Physiology & Nutrition',
  },
]

const STRAINS = [
  {
    name: 'B. coagulans',
    headline: 'The heat-stable probiotic',
    detail: 'Spore-forming bacteria that survive gastric acid, antibiotics, and ambient temperatures up to 50°C. Clinical studies show significant improvements in stool consistency, flatulence, and overall gut microbiome diversity in dogs.',
    cfu: '1B CFU / chew',
    stability: 'Stable to 50°C',
  },
  {
    name: 'B. clausii',
    headline: 'The immune modulator',
    detail: 'Widely used in human medicine for antibiotic-associated diarrhoea. In canine models, B. clausii promotes IgA production, strengthens gut barrier integrity, and reduces inflammatory cytokine expression in the intestinal mucosa.',
    cfu: '1B CFU / chew',
    stability: 'Stable to 45°C',
  },
  {
    name: 'B. subtilis',
    headline: 'The ecosystem architect',
    detail: 'Produces antimicrobial peptides that selectively suppress pathogenic bacteria like C. perfringens while preserving beneficial microbiota. Enhances nutrient absorption through enhanced enzyme secretion.',
    cfu: '1B CFU / chew',
    stability: 'Stable to 55°C',
  },
]

function ArticleCard({ article, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.55 }}
      className="bg-[#F9F4EC] rounded-3xl overflow-hidden border border-[#EFE0C0]">
      <div className="h-40 bg-[#1C2B4A] relative flex items-center justify-center overflow-hidden">
        <BookOpen size={40} className="text-[#C8812E] opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C2B4A] to-transparent" />
        <span className="absolute bottom-4 left-5 font-montserrat font-semibold text-xs text-white/50 uppercase tracking-widest">
          {article.tag}
        </span>
      </div>
      <div className="p-7">
        <h3 className="font-baskerville font-bold text-lg text-[#1A1610] mb-3 leading-snug">{article.title}</h3>
        <p className="font-montserrat font-light text-sm text-[#6B6258] leading-relaxed mb-4">{article.summary}</p>
        <p className="font-montserrat font-light text-sm text-[#6B6258] leading-relaxed mb-5">{article.body}</p>
        <p className="font-montserrat font-medium text-xs text-[#C8812E] border-t border-[#EFE0C0] pt-4">{article.authors}</p>
      </div>
    </motion.div>
  )
}

function StrainPanel({ strain, index }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="border border-[#EFE0C0] rounded-2xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-7 py-5 text-left">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#1C2B4A] flex items-center justify-center flex-shrink-0">
            <span className="font-montserrat font-black text-[10px] text-[#C8812E]">B</span>
          </div>
          <div>
            <p className="font-montserrat font-black text-sm text-[#1C2B4A] italic">{strain.name}</p>
            <p className="font-montserrat font-medium text-xs text-[#6B6258]">{strain.headline}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline font-montserrat font-semibold text-xs text-[#C8812E] border border-[#C8812E]/30 px-3 py-1 rounded-full">
            {strain.cfu}
          </span>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown size={18} className="text-[#6B6258]" />
          </motion.div>
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            className="overflow-hidden">
            <div className="px-7 pb-6 pt-0 border-t border-[#EFE0C0]">
              <p className="font-montserrat font-light text-sm text-[#6B6258] leading-relaxed mt-4">{strain.detail}</p>
              <div className="flex gap-3 mt-4">
                <span className="font-montserrat font-semibold text-xs text-[#1C2B4A] bg-[#F9F4EC] px-3 py-1.5 rounded-lg">{strain.cfu}</span>
                <span className="font-montserrat font-semibold text-xs text-[#C8812E] bg-[#C8812E]/10 px-3 py-1.5 rounded-lg">{strain.stability}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function SciencePage() {
  const heroRef = useRef(null)
  const climateRef = useRef(null)
  const climateInView = useInView(climateRef, { once: true, margin: '-100px' })

  return (
    <>
      <main className="pt-16">

        {/* Hero */}
        <section className="min-h-[50vh] bg-[#1C2B4A] flex items-center px-6 py-24">
          <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}
            className="max-w-3xl mx-auto text-center">
            <p className="font-montserrat font-semibold text-xs tracking-[0.25em] text-[#C8812E] uppercase mb-4">Evidence-Based</p>
            <h1 className="font-baskerville font-bold text-5xl lg:text-6xl text-white leading-tight mb-4">
              Science-backed formulas
            </h1>
            <p className="font-baskerville italic text-xl text-white/60 max-w-xl mx-auto leading-relaxed">
              We develop our brand and products based on research done on articles and peer-reviewed research.
            </p>
          </motion.div>
        </section>

        {/* Research articles */}
        <section className="bg-white py-20 lg:py-28">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              className="text-center mb-14">
              <p className="font-montserrat font-semibold text-xs tracking-[0.25em] text-[#C8812E] uppercase mb-3">Research Library</p>
              <h2 className="font-baskerville font-bold text-4xl text-[#1C2B4A]">Key Studies</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {ARTICLES.map((a, i) => <ArticleCard key={a.id} article={a} index={i} />)}
            </div>
          </div>
        </section>

        {/* Strain breakdown */}
        <section className="section-ivory py-20 lg:py-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              className="text-center mb-14">
              <p className="font-montserrat font-semibold text-xs tracking-[0.25em] text-[#C8812E] uppercase mb-3">Ingredient Science</p>
              <h2 className="font-baskerville font-bold text-4xl text-[#1C2B4A] mb-3">Probiotic Strain Breakdown</h2>
              <p className="font-montserrat font-medium text-base text-[#6B6258] max-w-lg mx-auto">
                Each strain selected for a specific function — not just as a marketing count.
              </p>
            </motion.div>
            <div className="space-y-3">
              {STRAINS.map((s, i) => <StrainPanel key={s.name} strain={s} index={i} />)}
            </div>
          </div>
        </section>

        {/* Malaysian climate section */}
        <section ref={climateRef} className="bg-[#1C2B4A] py-20 lg:py-28 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity:0, y:24 }} animate={climateInView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.7 }}>
              <p className="font-montserrat font-semibold text-xs tracking-[0.25em] text-[#C8812E] uppercase mb-4">Built For The Tropics</p>
              <h2 className="font-baskerville font-bold text-4xl lg:text-5xl text-white mb-6 leading-tight">
                Why Bacillus strains<br />for the Malaysian climate?
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-5 mt-10">
              {[
                { icon: '🌡️', title: 'Heat Stability',        body: 'Bacillus spores remain viable above 45°C — critical for supplements stored in Malaysian homes and warehouses without climate control.' },
                { icon: '📦', title: 'Ambient Shelf Life',     body: 'No cold chain required. Our formula retains 95%+ CFU viability for 18 months at room temperature — verified through accelerated stability testing.' },
                { icon: '🔬', title: 'CFU Survivability',     body: 'Unlike Lactobacillus, Bacillus spores survive gastric acid transit (pH 1.5–2.5) and arrive in the intestine fully viable and ready to germinate.' },
              ].map((card, i) => (
                <motion.div key={card.title}
                  initial={{ opacity:0, y:20 }} animate={climateInView ? { opacity:1, y:0 } : {}}
                  transition={{ delay: 0.2 + i*0.12, duration:0.55 }}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <span className="text-2xl mb-3 block">{card.icon}</span>
                  <h3 className="font-montserrat font-black text-sm text-white mb-2">{card.title}</h3>
                  <p className="font-montserrat font-light text-sm text-white/60 leading-relaxed">{card.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
