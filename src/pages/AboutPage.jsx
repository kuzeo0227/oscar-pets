import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import Footer from '../components/sections/Footer'

const MILESTONES = [
  { year: '2021', title: 'The Idea',        body: 'Two brothers from Penang, frustrated by the lack of science-backed pet supplements in Malaysia, begin researching probiotic formulations.' },
  { year: '2022', title: 'R&D Phase',        body: 'Partnered with food scientists and veterinary nutritionists to develop a tropical-stable Bacillus probiotic formula suited for Malaysian dogs.' },
  { year: '2023', title: 'Lab Validation',   body: 'Formula achieves 3 Billion CFU survivability at ambient temperature — a breakthrough for hot-climate markets. HACCP and GMP certifications secured.' },
  { year: '2024', title: 'Oscar Pets Launch', body: 'First batch ships. Within 6 months: 94% positive reviews, DVS registration, and recognition from The Star and Forbes Malaysia.' },
]

const WHY_CARDS = [
  { title: 'Halal Compliant',           body: 'Every ingredient is halal-certified. We believe all Malaysian pet owners deserve a product they can trust without compromise.' },
  { title: 'Tropical-Stable Probiotics', body: 'Our Bacillus strains are spore-forming — they survive heat above 40°C without refrigeration. Built for Malaysia.' },
  { title: 'Clean Label Positioning',    body: 'No artificial colours, flavours, or preservatives. What you see on the label is exactly what goes into every chew.' },
]

const MISSIONS = [
  {
    id: 'mission-1',
    num: '01',
    title: 'Science-backed formulas',
    body: `All formulas are rigorously researched and tested before they ever reach a dog. We work with veterinary nutritionists, food scientists, and microbiologists to validate every strain, dose, and delivery mechanism.\n\nNo trend-chasing. No marketing fluff. Only compounds that have demonstrated efficacy in peer-reviewed studies — with doses that actually work.`,
  },
  {
    id: 'mission-2',
    num: '02',
    title: 'Premium-sourced ingredients',
    body: `We trace every ingredient back to its source. Our Lamb Liver is sourced from halal-certified suppliers. Our Pumpkin is food-grade, not feed-grade. Our probiotic strains are pharmaceutical-quality Bacillus cultures with documented CFU counts.\n\nIngredient integrity is non-negotiable. We believe what goes into your pet reflects how much you value them.`,
  },
  {
    id: 'mission-3',
    num: '03',
    title: 'Every pet wants to be loved',
    body: `Oscar — the dog who inspired this brand — was a Spitz mix who suffered from chronic gut issues for two years. His owners, our founders, spent thousands on vet visits and processed supplements with no lasting results.\n\nThat frustration became a mission: give every dog in Malaysia access to the kind of precision nutrition that was previously only available to pets in the US or Europe. Every product we make is built in memory of Oscar.`,
  },
]

function Section({ children, ivory = false }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.section ref={ref}
      initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
      className={`oscar-section py-20 lg:py-28 ${ivory ? 'section-ivory' : 'bg-white'}`}>
      {children}
    </motion.section>
  )
}

export default function AboutPage() {
  return (
    <>
      <main className="pt-16">

        {/* Hero */}
        <section className="min-h-[60vh] bg-[#1C2B4A] flex items-center justify-center px-6 py-24">
          <motion.div initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}
            className="text-center max-w-3xl">
            <p className="font-montserrat font-semibold text-xs tracking-[0.25em] text-[#C8812E] uppercase mb-5">Our Story</p>
            <h1 className="font-baskerville italic font-bold text-5xl lg:text-7xl text-white leading-tight">
              Two brothers from Penang,<br />one mission.
            </h1>
            <p className="font-montserrat font-medium text-base text-white/60 mt-6 max-w-xl mx-auto leading-relaxed">
              Born out of frustration. Built with science. Dedicated to every dog who deserves better.
            </p>
          </motion.div>
        </section>

        {/* Timeline */}
        <Section ivory>
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <p className="font-montserrat font-semibold text-xs tracking-[0.25em] text-[#C8812E] uppercase mb-3 text-center">How We Got Here</p>
            <h2 className="font-baskerville font-bold text-4xl text-[#1C2B4A] text-center mb-14">The Oscar Pets Journey</h2>
            <div className="relative">
              <div className="absolute left-[22px] top-0 bottom-0 w-px bg-[#EFE0C0]" />
              <div className="space-y-10">
                {MILESTONES.map((m, i) => {
                  const ref = useRef(null)
                  const inView = useInView(ref, { once: true, margin: '-80px' })
                  return (
                    <motion.div key={m.year} ref={ref}
                      initial={{ opacity:0, x:-24 }} animate={inView ? { opacity:1, x:0 } : {}}
                      transition={{ delay: i*0.1, duration:0.55 }}
                      className="flex gap-8 items-start">
                      <div className="w-11 h-11 rounded-full bg-[#1C2B4A] flex items-center justify-center flex-shrink-0 relative z-10">
                        <span className="font-montserrat font-black text-[10px] text-[#C8812E]">{m.year}</span>
                      </div>
                      <div className="pt-2">
                        <h3 className="font-montserrat font-black text-base text-[#1A1610] mb-1">{m.title}</h3>
                        <p className="font-montserrat font-light text-sm text-[#6B6258] leading-relaxed">{m.body}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </Section>

        {/* Mission pillars */}
        <Section>
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <p className="font-montserrat font-semibold text-xs tracking-[0.25em] text-[#C8812E] uppercase mb-3 text-center">What Drives Us</p>
            <h2 className="font-baskerville font-bold text-4xl text-[#1C2B4A] text-center mb-14">Our Three Pillars</h2>
            <div className="space-y-16">
              {MISSIONS.map((m, i) => {
                const ref = useRef(null)
                const inView = useInView(ref, { once: true, margin: '-80px' })
                return (
                  <motion.div key={m.id} id={m.id} ref={ref}
                    initial={{ opacity:0, y:28 }} animate={inView ? { opacity:1, y:0 } : {}}
                    transition={{ duration:0.6 }}
                    className="grid md:grid-cols-[80px_1fr] gap-6 items-start">
                    <div className="w-16 h-16 rounded-2xl bg-[#1C2B4A] flex items-center justify-center flex-shrink-0">
                      <span className="font-montserrat font-black text-lg text-[#C8812E]">{m.num}</span>
                    </div>
                    <div>
                      <h3 className="font-baskerville font-bold text-2xl text-[#1A1610] mb-4">{m.title}</h3>
                      {m.body.split('\n\n').map((para, pi) => (
                        <p key={pi} className="font-montserrat font-light text-sm text-[#6B6258] leading-relaxed mb-3">{para}</p>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </Section>

        {/* Why Oscar Pets */}
        <Section ivory>
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <p className="font-montserrat font-semibold text-xs tracking-[0.25em] text-[#C8812E] uppercase mb-3 text-center">The Difference</p>
            <h2 className="font-baskerville font-bold text-4xl text-[#1C2B4A] text-center mb-14">Why Oscar Pets?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {WHY_CARDS.map((card, i) => {
                const ref = useRef(null)
                const inView = useInView(ref, { once: true, margin: '-80px' })
                return (
                  <motion.div key={card.title} ref={ref}
                    initial={{ opacity:0, y:24 }} animate={inView ? { opacity:1, y:0 } : {}}
                    transition={{ delay: i*0.12, duration:0.55 }}
                    whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(28,43,74,0.10)' }}
                    className="bg-white rounded-3xl p-7 border border-[#EFE0C0]">
                    <h3 className="font-montserrat font-black text-base text-[#1C2B4A] mb-3">{card.title}</h3>
                    <p className="font-montserrat font-light text-sm text-[#6B6258] leading-relaxed">{card.body}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </Section>

        {/* CTA */}
        <section className="bg-[#1C2B4A] py-20 px-6 text-center">
          <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            transition={{ duration:0.6 }}>
            <h2 className="font-baskerville font-bold text-4xl text-white mb-4">Ready to start?</h2>
            <p className="font-montserrat font-medium text-base text-white/60 mb-8">Give your dog the premium nutrition they deserve.</p>
            <Link to="/shop">
              <motion.button whileHover={{ scale:1.03, filter:'brightness(1.08)' }} whileTap={{ scale:0.97 }}
                className="bg-[#C8812E] text-[#1C2B4A] font-montserrat font-black text-sm uppercase tracking-widest px-10 py-4 rounded-xl">
                Shop Now
              </motion.button>
            </Link>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  )
}
