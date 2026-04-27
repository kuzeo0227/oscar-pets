import { useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Star, Minus, Plus, ChevronLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'
import Footer from '../components/sections/Footer'

const PRODUCTS = {
  'probiotic-blend': {
    name: 'Probiotic Blend Chewables',
    subtitle: 'Lamb Liver & Pumpkin Mix',
    price: 89,
    rating: 4.9,
    reviews: 128,
    images: ['#1C2B4A', '#C8812E', '#D4A843'],
    description: `Oscar Pets Probiotic Blend Chewables are Malaysia's first premium probiotic supplement for dogs, formulated specifically for the tropical climate. Each chew delivers 3 Billion CFU of spore-forming Bacillus strains — proven to survive the Malaysian heat and reach the gut alive.\n\nUnlike conventional probiotics, our Bacillus-based formula is ambient-stable, meaning no refrigeration required. Combined with prebiotic GOS and FOS, postbiotic yeast extract, and real Lamb Liver for palatability, this is a complete gut-health solution your dog will actually love.`,
    ingredientsList: 'Lamb Liver (40%), Pumpkin (15%), Probiotic Blend [B. coagulans, B. clausii, B. subtilis] (5%), GOS (4%), FOS (3%), Postbiotic Yeast Blend (3%), Coconut Oil (2%), Apple Cider Vinegar (1%), Sunflower Lecithin (1%), Rosemary Extract (0.5%), Tapioca Starch, Natural Flavour.',
    howToUse: [
      { weight: '< 5 kg',    dose: '½ chew daily' },
      { weight: '5 – 10 kg', dose: '1 chew daily' },
      { weight: '11 – 20 kg',dose: '1½ chews daily' },
      { weight: '21 – 30 kg',dose: '2 chews daily' },
      { weight: '> 30 kg',   dose: '2½ chews daily' },
    ],
    reviews: [
      { author: 'Sarah T.', rating: 5, body: 'My Shih Tzu has been on this for 6 weeks and her digestion is noticeably better. Less gas, firmer stools, and she absolutely loves the taste!' },
      { author: 'Reza M.',  rating: 5, body: 'Finally a Malaysian brand that actually delivers. Science-backed and my vet approved it too. Will repurchase.' },
      { author: 'Li Ying',  rating: 4, body: 'Good product. Took about 2 weeks to see results but worth it. Packaging is premium.' },
    ],
  },
}

const TABS = ['Description', 'Ingredients', 'How to Use', 'Reviews']

function StarRating({ rating, size = 16 }) {
  return (
    <div className="flex gap-1 items-center">
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={size} className={s <= Math.round(rating) ? 'fill-[#D4A843] text-[#D4A843]' : 'text-[#EFE0C0]'} />
      ))}
    </div>
  )
}

export default function ProductDetailPage() {
  const { slug }            = useParams()
  const product             = PRODUCTS[slug] || PRODUCTS['probiotic-blend']
  const [activeImg,  setActiveImg]  = useState(0)
  const [activeTab,  setActiveTab]  = useState('Description')
  const [qty,        setQty]        = useState(1)
  const { addItem }                 = useCart()
  const reviewsRef                  = useRef(null)
  const reviewsInView               = useInView(reviewsRef, { once: true, margin: '-100px' })

  return (
    <>
      <main className="pt-20 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
            <Link to="/shop" className="inline-flex items-center gap-1 font-montserrat font-medium text-sm text-[#6B6258] hover:text-[#C8812E] transition-colors">
              <ChevronLeft size={16} /> Back to Shop
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* Left — image gallery */}
            <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="relative rounded-3xl overflow-hidden bg-[#F9F4EC] aspect-square mb-4 border border-[#EFE0C0]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImg}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: product.images[activeImg] + '22' }}
                  >
                    <div className="w-40 h-40 rounded-3xl flex items-center justify-center" style={{ backgroundColor: product.images[activeImg] }}>
                      <span className="font-antapani text-4xl text-white">O</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex gap-3">
                {product.images.map((color, i) => (
                  <motion.button
                    key={i} onClick={() => setActiveImg(i)}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className={`w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center border-2 transition-colors ${activeImg === i ? 'border-[#C8812E]' : 'border-[#EFE0C0]'}`}
                    style={{ backgroundColor: color + '22' }}
                  >
                    <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: color }} />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Right — product info */}
            <motion.div
              initial="hidden" animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.p variants={{ hidden: { opacity:0, y:12 }, visible: { opacity:1, y:0 } }}
                className="font-montserrat font-semibold text-xs tracking-[0.25em] text-[#C8812E] uppercase mb-2">
                Oscar Pets
              </motion.p>
              <motion.h1 variants={{ hidden: { opacity:0, y:12 }, visible: { opacity:1, y:0 } }}
                className="font-baskerville font-bold text-4xl text-[#1C2B4A] leading-tight mb-1">
                {product.name}
              </motion.h1>
              <motion.p variants={{ hidden: { opacity:0, y:12 }, visible: { opacity:1, y:0 } }}
                className="font-baskerville italic text-xl text-[#6B6258] mb-4">
                {product.subtitle}
              </motion.p>

              <motion.div variants={{ hidden: { opacity:0, y:12 }, visible: { opacity:1, y:0 } }}
                className="flex items-center gap-3 mb-6">
                <StarRating rating={4.9} />
                <span className="font-montserrat font-medium text-sm text-[#6B6258]">4.9 · 128 reviews</span>
              </motion.div>

              <motion.p variants={{ hidden: { opacity:0, y:12 }, visible: { opacity:1, y:0 } }}
                className="font-montserrat font-black text-4xl text-[#1C2B4A] mb-6">
                RM 89.00
              </motion.p>

              {/* Qty + Add to Cart */}
              <motion.div variants={{ hidden: { opacity:0, y:12 }, visible: { opacity:1, y:0 } }}
                className="flex items-center gap-4 mb-8">
                <div className="flex items-center border border-[#EFE0C0] rounded-xl overflow-hidden">
                  <button onClick={() => setQty(q => Math.max(1, q-1))}
                    className="w-11 h-12 flex items-center justify-center text-[#1C2B4A] hover:bg-[#F9F4EC] transition-colors">
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-montserrat font-black text-base text-[#1C2B4A]">{qty}</span>
                  <button onClick={() => setQty(q => q+1)}
                    className="w-11 h-12 flex items-center justify-center text-[#1C2B4A] hover:bg-[#F9F4EC] transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02, filter: 'brightness(1.08)' }} whileTap={{ scale: 0.97 }}
                  onClick={() => { for (let i=0; i<qty; i++) addItem({ id: slug, name: product.name, price: 89 }) }}
                  className="flex-1 bg-[#C8812E] text-[#1C2B4A] font-montserrat font-black text-sm uppercase tracking-widest py-4 rounded-xl">
                  Add to Cart
                </motion.button>
              </motion.div>

              {/* Trust badges */}
              <motion.div variants={{ hidden: { opacity:0, y:12 }, visible: { opacity:1, y:0 } }}
                className="flex flex-wrap gap-2 mb-8">
                {['HACCP Certified', 'GMP Practice', 'ISO Certified', 'Halal Compliant'].map(b => (
                  <span key={b} className="border border-[#EFE0C0] font-montserrat font-semibold text-[10px] text-[#1C2B4A] uppercase tracking-widest px-3 py-1.5 rounded-full">
                    {b}
                  </span>
                ))}
              </motion.div>

              {/* Tabs */}
              <motion.div variants={{ hidden: { opacity:0 }, visible: { opacity:1 } }}>
                <div className="flex border-b border-[#EFE0C0] mb-6">
                  {TABS.map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`font-montserrat font-semibold text-xs uppercase tracking-wider px-4 py-3 border-b-2 transition-colors ${activeTab === tab ? 'border-[#C8812E] text-[#1C2B4A]' : 'border-transparent text-[#6B6258] hover:text-[#1C2B4A]'}`}>
                      {tab}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={activeTab}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}>
                    {activeTab === 'Description' && (
                      <div className="space-y-4">
                        {product.description.split('\n\n').map((para, i) => (
                          <p key={i} className="font-montserrat font-light text-sm text-[#6B6258] leading-relaxed">{para}</p>
                        ))}
                      </div>
                    )}
                    {activeTab === 'Ingredients' && (
                      <p className="font-montserrat font-light text-sm text-[#6B6258] leading-relaxed">{product.ingredientsList}</p>
                    )}
                    {activeTab === 'How to Use' && (
                      <div className="space-y-3">
                        <p className="font-montserrat font-medium text-sm text-[#1A1610] mb-4">Recommended daily serving based on body weight:</p>
                        {product.howToUse.map(row => (
                          <div key={row.weight} className="flex items-center justify-between bg-[#F9F4EC] rounded-xl px-5 py-3 border border-[#EFE0C0]">
                            <span className="font-montserrat font-bold text-sm text-[#1C2B4A]">{row.weight}</span>
                            <span className="font-montserrat font-medium text-sm text-[#6B6258]">{row.dose}</span>
                          </div>
                        ))}
                        <p className="font-montserrat font-light text-xs text-[#6B6258] mt-4 leading-relaxed">
                          Best served as a treat or crumbled over food. Fresh water should always be available. Introduce gradually over 7 days.
                        </p>
                      </div>
                    )}
                    {activeTab === 'Reviews' && (
                      <div ref={reviewsRef} className="space-y-5">
                        {product.reviews && product.reviews.map((r, i) => (
                          <motion.div key={i}
                            initial={{ opacity: 0, y: 16 }}
                            animate={reviewsInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                            className="bg-[#F9F4EC] rounded-2xl p-5 border border-[#EFE0C0]">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-montserrat font-bold text-sm text-[#1A1610]">{r.author}</span>
                              <StarRating rating={r.rating} size={12} />
                            </div>
                            <p className="font-montserrat font-light text-sm text-[#6B6258] leading-relaxed">{r.body}</p>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
