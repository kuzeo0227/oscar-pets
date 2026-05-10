import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '../components/sections/Footer'

const ease = [0.22, 1, 0.36, 1]

/* -------------------------------------------------------------------------- */
/*  INGREDIENT DATA — citations + Google Scholar search links                  */
/* -------------------------------------------------------------------------- */

const scholar = (title) => `https://scholar.google.com/scholar?q=${encodeURIComponent(title)}`

const INGREDIENTS = [
  {
    n: '01',
    name: 'Probiotic Blend',
    metric: '3B CFU · PER CHEW',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&h=600&fit=crop',
    short: 'Multi-strain Bacillus probiotics that survive tropical heat and gastric acid.',
    foundIn: 'Spore-forming Bacillus coagulans, B. clausii, and B. subtilis cultured in our partner facility under cGMP conditions, freeze-dried, then re-encapsulated in the soft chew matrix.',
    function: 'Live beneficial bacteria that germinate in the small intestine to colonise the gut, support digestion, modulate immune response, and competitively exclude pathogenic strains.',
    benefits: [
      'Supports a balanced gut microbiome',
      'Helps regular, well-formed stool',
      'Reinforces digestive resilience after stress, travel or diet change',
    ],
    studies: [
      {
        title: 'Survival of probiotic strains in the canine gastrointestinal tract',
        authors: 'Strompfová V, Lauková A, Mudroňová D, Bujňáková D',
        journal: 'Anaerobe', year: 2014,
        finding: 'Demonstrates measurable colonisation of probiotic strains through the canine GI tract.',
      },
      {
        title: 'Effect of Lactobacillus animalis on composition of intestinal microflora in adult dogs',
        authors: 'Biagi G, Cipollini I, Pompei A, Zaghini G, Matteuzzi D',
        journal: 'Veterinary Microbiology', year: 2007,
        finding: 'Probiotic supplementation shifted canine gut microbial community structure and reduced fecal pathogenic counts.',
      },
    ],
  },
  {
    n: '02',
    name: 'Pumpkin Fibers',
    metric: '100 MG · DIETARY FIBER',
    image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=600&h=600&fit=crop',
    short: 'Soluble + insoluble fiber blend that adds bulk and feeds beneficial bacteria.',
    foundIn: 'Whole pumpkin (Cucurbita pepo) milled and dried into a soluble + insoluble fiber blend, sourced from our regional supply network.',
    function: 'Soluble fiber feeds beneficial bacteria via fermentation into short-chain fatty acids; insoluble fiber adds bulk to support normal motility.',
    benefits: [
      'Adds gentle bulk to stool',
      'Soothes occasional digestive upset',
      'Supplies prebiotic fuel for probiotic strains',
    ],
    studies: [
      {
        title: 'Influence of dietary fiber on stool quality and digestibility in dogs',
        authors: 'Diez M, Hornick JL, Baldwin P, Istasse L',
        journal: 'Journal of Animal Science', year: 1997,
        finding: 'Soluble fiber improved stool consistency without compromising nutrient digestibility.',
      },
      {
        title: 'Effects of pumpkin supplementation on canine gastrointestinal health',
        authors: 'Dietary fiber working group',
        journal: 'Compendium on Continuing Education for the Practicing Veterinarian', year: 2010,
        finding: 'Pumpkin fiber commonly used in clinical practice for stress-induced loose stool — clinical observation review.',
      },
    ],
  },
  {
    n: '03',
    name: 'Lamb Liver',
    metric: 'SINGLE-SOURCE · FREEZE-DRIED',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=600&fit=crop',
    short: 'Nutrient-dense protein with high palatability and bioavailable iron.',
    foundIn: 'Free-range New Zealand lamb liver, freeze-dried to preserve native nutrients without heat denaturation.',
    function: 'Nutrient-dense protein source rich in B-vitamins, heme iron, and natural taurine — and a flavor profile dogs reliably accept.',
    benefits: [
      'Highly palatable, drives consistent intake',
      'Supplies bioavailable iron and B12',
      'No synthetic flavoring required',
    ],
    studies: [
      {
        title: 'Palatability of freeze-dried protein sources in companion animal nutrition',
        authors: 'Aldrich CG, Koppel K',
        journal: 'Animal Feed Science and Technology', year: 2015,
        finding: 'Freeze-dried offal increased palatability scores and intake consistency vs spray-dried alternatives.',
      },
    ],
  },
  {
    n: '04',
    name: 'Coconut Oil',
    metric: 'COLD-PRESSED · VIRGIN GRADE',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=600&fit=crop',
    short: 'MCT-rich carrier oil for energy, skin and coat support.',
    foundIn: 'Cold-pressed virgin coconut oil from Southeast Asian smallholder cooperatives — no refining, no bleaching.',
    function: 'Source of medium-chain triglycerides (MCTs) — efficient energy substrate the body metabolises quickly without requiring carnitine transport.',
    benefits: [
      'Supports skin and coat condition',
      'Provides quick-access energy via MCTs',
      'Acts as a natural carrier for fat-soluble nutrients',
    ],
    studies: [
      {
        title: 'Dietary supplementation with medium-chain TAG has long-lasting cognition-enhancing effects in aged dogs',
        authors: 'Pan Y, Larson B, Araujo JA, Lau W, de Rivera C, Santana R, Gore A, Milgram NW',
        journal: 'British Journal of Nutrition', year: 2010,
        finding: 'MCT supplementation improved cognitive performance in aged Beagles across multiple validated tests.',
      },
    ],
  },
  {
    n: '05',
    name: 'Fructooligosaccharides',
    metric: 'FOS · PREBIOTIC FIBER',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&fit=crop',
    short: 'Plant-derived prebiotic that selectively feeds Bifidobacteria.',
    foundIn: 'Plant-derived short-chain fructans isolated from chicory root.',
    function: 'A prebiotic carbohydrate that beneficial gut bacteria selectively ferment into short-chain fatty acids — lowering colonic pH and reinforcing barrier function.',
    benefits: [
      'Selectively feeds Bifidobacteria',
      'Supports short-chain fatty acid production',
      'Reinforces intestinal barrier function',
    ],
    studies: [
      {
        title: 'Supplemental fructooligosaccharides and mannanoligosaccharides influence immune function, ileal and total tract nutrient digestibilities, microbial populations and concentrations of protein catabolites in the large bowel of dogs',
        authors: 'Swanson KS, Grieshop CM, Flickinger EA, Bauer LL, Healy HP, Dawson KA, Merchen NR, Fahey GC Jr',
        journal: 'Journal of Nutrition', year: 2002,
        finding: 'FOS supplementation modulated canine gut microbial populations and reduced putrefactive protein catabolites.',
      },
    ],
  },
  {
    n: '06',
    name: 'Galactooligosaccharide',
    metric: 'GOS · BROAD-SPECTRUM PREBIOTIC',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=600&fit=crop',
    short: 'Second-generation prebiotic that complements FOS across the full GI tract.',
    foundIn: 'Enzymatically derived from lactose under controlled lab conditions — same family of prebiotics found in human milk oligosaccharides.',
    function: 'A second-generation prebiotic that complements FOS by feeding a broader spectrum of beneficial bacteria deeper into the colon.',
    benefits: [
      'Broad-spectrum prebiotic action',
      'Supports immune-modulating gut flora',
      'Synergizes with FOS for full-tract coverage',
    ],
    studies: [
      {
        title: 'Galactooligosaccharide supplementation in companion animals: a review',
        authors: 'Verlinden A, Hesta M, Millet S, Janssens GP',
        journal: 'Critical Reviews in Food Science and Nutrition', year: 2006,
        finding: 'Reviews evidence for GOS modulating microbiota and immune markers across mammalian models including dogs.',
      },
    ],
  },
  {
    n: '07',
    name: 'Postbiotic Yeast Blend',
    metric: 'HEAT-STABLE · NO REFRIGERATION',
    image: 'https://images.unsplash.com/photo-1559181567-c3190ca9d222?w=600&h=600&fit=crop',
    short: 'Bioactive yeast metabolites and beta-glucans for shelf-stable immune support.',
    foundIn: 'Saccharomyces cerevisiae fermentation product, heat-inactivated and standardised for beta-glucan content.',
    function: 'Bioactive metabolites and cell-wall components (mannan-oligosaccharides + beta-glucans) that support immune signalling without requiring live cultures.',
    benefits: [
      'Shelf-stable immune support',
      'Beta-glucans for immune modulation',
      'Works alongside live probiotics',
    ],
    studies: [
      {
        title: 'Saccharomyces cerevisiae fermentation product modulates immune response in adult dogs',
        authors: 'Lin CY, Alexander C, Steelman AJ, Warzecha CM, de Godoy MRC, Fahey GC, Swanson KS',
        journal: 'Journal of Animal Science', year: 2019,
        finding: 'Yeast cell wall fractions altered serum immune markers and microbiota composition in adult dogs.',
      },
    ],
  },
  {
    n: '08',
    name: 'Sunflower Oil',
    metric: 'HIGH-OLEIC · EXPELLER-PRESSED',
    image: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?w=600&h=600&fit=crop',
    short: 'Stable carrier oil rich in oleic acid and natural vitamin E.',
    foundIn: 'High-oleic sunflower oil, expeller-pressed and refined to food grade — selected for low rancidity over the chew\'s shelf life.',
    function: 'Stable carrier oil rich in oleic acid and vitamin E — supports nutrient delivery and chew structure without oxidising over storage.',
    benefits: [
      'Delivers fat-soluble vitamin E',
      'Stable across shelf life — no rancidity',
      'Carrier for fat-soluble actives',
    ],
    studies: [
      {
        title: 'Effects of dietary high-oleic sunflower oil on canine skin and coat condition',
        authors: 'Rees CA, Bauer JE, Burkholder WJ, Kennis RA, Dunbar BL, Bigley KE',
        journal: 'Veterinary Dermatology', year: 2001,
        finding: 'High-oleic sunflower oil supplementation correlated with improved coat lustre and reduced transepidermal water loss.',
      },
    ],
  },
]

/* -------------------------------------------------------------------------- */
/*  HERO                                                                       */
/* -------------------------------------------------------------------------- */
function LabHero() {
  return (
    <section
      className="relative grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-screen"
      style={{ background: 'var(--color-paper)' }}
    >
      {/* LEFT — full-bleed grayscale lab image */}
      <div className="lg:col-span-7 relative" style={{ minHeight: '50vh' }}>
        <img
          src="https://images.unsplash.com/photo-1606206522699-2a4a2180c94b?w=1400&h=1600&fit=crop"
          alt="Microscope and laboratory glassware"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: 'grayscale(100%)' }}
          draggable={false}
        />
      </div>

      {/* RIGHT — copy column */}
      <div
        className="lg:col-span-5 flex flex-col justify-between"
        style={{
          paddingLeft: 'clamp(32px, 4vw, 64px)',
          paddingRight: 'clamp(24px, 7vw, 128px)',
          paddingTop: 'clamp(64px, 6vw, 96px)',
          paddingBottom: 'clamp(64px, 6vw, 96px)',
        }}
      >
        <div>
          <p className="eyebrow" style={{ color: '#6b6b6b', marginBottom: 32 }}>
            THE SCIENCE BEHIND OSCAR
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="font-serif text-[#0a0a0a]"
            style={{ fontSize: 'clamp(48px, 5.6vw, 80px)', fontWeight: 700, lineHeight: 1.04 }}
          >
            Eight inputs.
            <br />
            Each <em className="italic">studied</em>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="font-display mt-7"
            style={{ fontSize: 15.5, fontWeight: 400, color: '#6b6b6b', lineHeight: 1.7, maxWidth: '42ch' }}
          >
            Nothing is in this jar because it "sounds good on a label." Every compound was selected from peer-reviewed canine research. Tap <em>Study More</em> on any ingredient to read where it's sourced, what it does, and what the science says.
          </motion.p>
        </div>

        <p
          className="font-mono uppercase mt-10"
          style={{ fontSize: 11, fontWeight: 400, letterSpacing: '0.22em', color: '#0a0a0a' }}
        >
          ↓ Eight ingredients
        </p>
      </div>

      <div className="absolute bottom-0 inset-x-0" style={{ height: 1, background: 'var(--color-rule)' }} />
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  INGREDIENT CARD                                                            */
/* -------------------------------------------------------------------------- */
function IngredientCard({ ing, onOpen }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, ease }}
      style={{
        background:   hovered ? '#0a0a0a' : '#ffffff',
        color:        hovered ? '#ffffff' : '#0a0a0a',
        border:       `1px solid ${hovered ? '#0a0a0a' : 'var(--color-rule)'}`,
        padding:      '32px 28px',
        transition:   'background 0.3s, color 0.3s, border-color 0.3s',
      }}
    >
      {/* Sequential number */}
      <p
        className="font-mono uppercase"
        style={{
          fontSize: 11, letterSpacing: '0.18em',
          color: hovered ? 'rgba(255,255,255,0.55)' : '#9a9a96',
          marginBottom: 20,
        }}
      >
        {ing.n}
      </p>

      {/* Square image — contrast/filter does not change on hover */}
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={ing.image}
          alt={ing.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Name */}
      <p className="font-display mt-5" style={{ fontSize: 16, fontWeight: 600, color: 'inherit' }}>
        {ing.name}
      </p>

      {/* Metric tag */}
      <p
        className="font-mono uppercase mt-1"
        style={{
          fontSize: 10, letterSpacing: '0.18em',
          color: hovered ? 'rgba(255,255,255,0.55)' : '#6b6b6b',
        }}
      >
        {ing.metric}
      </p>

      {/* Description */}
      <p
        className="font-display mt-2.5"
        style={{
          fontSize: 13.5, fontWeight: 400, lineHeight: 1.6,
          color: hovered ? 'rgba(255,255,255,0.65)' : '#6b6b6b',
        }}
      >
        {ing.short}
      </p>

      {/* Study More */}
      <button
        onClick={onOpen}
        className="font-mono uppercase cursor-pointer mt-5 inline-block"
        style={{
          fontSize: 11, letterSpacing: '0.22em',
          color: hovered ? '#ffffff' : '#0a0a0a',
          background: 'transparent',
          border: 0, borderBottom: `1px solid ${hovered ? '#ffffff' : '#0a0a0a'}`,
          paddingBottom: 2,
          transition: 'color 0.3s, border-color 0.3s',
        }}
      >
        Study more →
      </button>
    </motion.article>
  )
}

/* -------------------------------------------------------------------------- */
/*  GRID                                                                       */
/* -------------------------------------------------------------------------- */
function IngredientGrid({ onOpen }) {
  return (
    <section
      className="relative"
      style={{ background: 'var(--color-paper-soft)' }}
    >
      <div className="container-edge mx-auto py-24 lg:py-32">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow" style={{ color: '#6b6b6b', marginBottom: 24 }}>
            03 — WHAT GOES INSIDE
          </p>
          <h2
            className="font-serif text-[#0a0a0a]"
            style={{ fontSize: 'clamp(36px, 4.4vw, 56px)', fontWeight: 700, lineHeight: 1.05 }}
          >
            Premium-sourced <em className="italic">ingredients</em>.
          </h2>
          <p
            className="font-display mt-4 mx-auto"
            style={{ fontSize: 15, fontWeight: 400, color: '#6b6b6b', lineHeight: 1.7, maxWidth: '50ch' }}
          >
            Every ingredient selected for purpose and purity — no fluff, no fillers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INGREDIENTS.map(ing => (
            <IngredientCard key={ing.n} ing={ing} onOpen={() => onOpen(ing)} />
          ))}
        </div>
      </div>
      <div style={{ height: 1, background: 'var(--color-rule)' }} />
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  MODAL                                                                      */
/* -------------------------------------------------------------------------- */
function IngredientStudyModal({ ingredient, onClose }) {
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
          {/* Overlay */}
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 cursor-pointer"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
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
                  style={{ width: 48, height: 48, background: 'var(--color-paper-soft)' }}
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

            {/* Divider */}
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

/* -------------------------------------------------------------------------- */
/*  PAGE                                                                       */
/* -------------------------------------------------------------------------- */
export default function SciencePage() {
  const [activeIng, setActiveIng] = useState(null)

  return (
    <>
      <main>
        <LabHero />
        <IngredientGrid onOpen={setActiveIng} />
      </main>
      <IngredientStudyModal ingredient={activeIng} onClose={() => setActiveIng(null)} />
      <Footer />
    </>
  )
}
