import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, SlidersHorizontal, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import Footer from '../components/sections/Footer'

const ALL_PRODUCTS = [
  { id: 'probiotic-blend', name: 'Probiotic Blend Chewables', subtitle: 'Lamb Liver & Pumpkin Mix', price: 89, rating: 4.9, reviews: 128, breedSize: 'Small/Medium', healthGoal: 'Gut Health',   slug: 'probiotic-blend' },
  { id: 'immunity-boost',  name: 'Immunity Boost Chewables',  subtitle: 'Chicken & Sweet Potato',  price: 95, rating: 4.7, reviews: 64,  breedSize: 'All Sizes',    healthGoal: 'Immunity',    slug: 'immunity-boost'  },
  { id: 'joint-support',   name: 'Joint Support Chewables',   subtitle: 'Salmon & Turmeric',        price: 99, rating: 4.8, reviews: 47,  breedSize: 'Large',        healthGoal: 'Mobility',    slug: 'joint-support'   },
  { id: 'skin-coat',       name: 'Skin & Coat Chewables',     subtitle: 'Sardine & Biotin',         price: 92, rating: 4.6, reviews: 83,  breedSize: 'All Sizes',    healthGoal: 'Coat Health', slug: 'skin-coat'        },
]

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5 items-center">
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={12} className={s <= Math.round(rating) ? 'fill-[#06C265] text-[#06C265]' : 'text-[#EFEFED]'} />
      ))}
      <span className="font-montserrat font-medium text-xs text-[#6B6B6B] ml-1">{rating}</span>
    </div>
  )
}

function FilterPanel({ breedSizes, healthGoals, activeBreed, setActiveBreed, activeGoal, setActiveGoal }) {
  return (
    <div className="space-y-7">
      <div>
        <p className="font-montserrat font-black text-xs uppercase tracking-widest text-[#1A1A18] mb-3">Breed Size</p>
        <div className="space-y-2">
          {breedSizes.map(s => (
            <button key={s} onClick={() => setActiveBreed(s)}
              className={`block w-full text-left font-montserrat font-medium text-sm px-3 py-2 rounded-lg transition-colors ${activeBreed === s ? 'bg-[#1A1A18] text-white' : 'text-[#6B6B6B] hover:bg-[#FAFAF7]'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="font-montserrat font-black text-xs uppercase tracking-widest text-[#1A1A18] mb-3">Health Goal</p>
        <div className="space-y-2">
          {healthGoals.map(g => (
            <button key={g} onClick={() => setActiveGoal(g)}
              className={`block w-full text-left font-montserrat font-medium text-sm px-3 py-2 rounded-lg transition-colors ${activeGoal === g ? 'bg-[#1A1A18] text-white' : 'text-[#6B6B6B] hover:bg-[#FAFAF7]'}`}>
              {g}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product }) {
  const { addItem } = useCart()
  return (
    <motion.div layout
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(26,26,24,0.12)' }}
      className="bg-white rounded-3xl border border-[#EFEFED] overflow-hidden group">
      <Link to={`/product/${product.slug}`}>
        <div className="h-56 bg-[#FAFAF7] flex items-center justify-center relative overflow-hidden">
          <div className="w-24 h-24 rounded-2xl bg-[#1A1A18] flex items-center justify-center">
            <span className="font-antapani text-2xl text-white">O</span>
          </div>
          <span className="absolute top-4 left-4 bg-[#06C265] text-white font-montserrat font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
            {product.healthGoal}
          </span>
        </div>
      </Link>
      <div className="p-5">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-montserrat font-bold text-sm text-[#1A1A18] group-hover:text-[#1A1A18] transition-colors mb-0.5">
            {product.name}
          </h3>
        </Link>
        <p className="font-montserrat font-light text-xs text-[#6B6B6B] mb-3">{product.subtitle}</p>
        <StarRating rating={product.rating} />
        <p className="font-montserrat font-light text-xs text-[#6B6B6B] mt-0.5">{product.reviews} reviews</p>
        <div className="flex items-center justify-between mt-4">
          <span className="font-montserrat font-black text-lg text-[#1A1A18]">RM {product.price}.00</span>
          <motion.button
            whileHover={{ scale: 1.05, filter: 'brightness(1.08)' }} whileTap={{ scale: 0.95 }}
            onClick={() => addItem({ id: product.id, name: product.name, price: product.price })}
            className="bg-[#06C265] text-[#1A1A18] font-montserrat font-black text-xs uppercase tracking-widest px-4 py-2.5 rounded-xl">
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default function ShopPage() {
  const [filterOpen,  setFilterOpen]  = useState(false)
  const [activeBreed, setActiveBreed] = useState('All')
  const [activeGoal,  setActiveGoal]  = useState('All')
  const [sort,        setSort]        = useState('popular')

  const breedSizes  = ['All', 'Small/Medium', 'Large', 'All Sizes']
  const healthGoals = ['All', 'Gut Health', 'Immunity', 'Mobility', 'Coat Health']

  let filtered = ALL_PRODUCTS
    .filter(p => activeBreed === 'All' || p.breedSize === activeBreed)
    .filter(p => activeGoal  === 'All' || p.healthGoal === activeGoal)

  if (sort === 'price-asc')  filtered = [...filtered].sort((a,b) => a.price - b.price)
  if (sort === 'price-desc') filtered = [...filtered].sort((a,b) => b.price - a.price)
  if (sort === 'rating')     filtered = [...filtered].sort((a,b) => b.rating - a.rating)

  return (
    <>
      <main className="min-h-screen pt-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <p className="font-montserrat font-semibold text-xs tracking-[0.25em] text-[#06C265] uppercase mb-2">All Products</p>
            <h1 className="font-baskerville font-bold text-4xl lg:text-5xl text-[#1A1A18]">Shop Oscar Pets</h1>
          </motion.div>

          <div className="flex gap-8">
            <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="hidden lg:block w-56 flex-shrink-0">
              <FilterPanel breedSizes={breedSizes} healthGoals={healthGoals}
                activeBreed={activeBreed} setActiveBreed={setActiveBreed}
                activeGoal={activeGoal}   setActiveGoal={setActiveGoal} />
            </motion.aside>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="font-montserrat font-medium text-sm text-[#6B6B6B]">{filtered.length} products</p>
                <div className="flex items-center gap-3">
                  <button onClick={() => setFilterOpen(true)}
                    className="lg:hidden flex items-center gap-2 border border-[#EFEFED] font-montserrat font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full text-[#1A1A18]">
                    <SlidersHorizontal size={14} /> Filter
                  </button>
                  <select value={sort} onChange={e => setSort(e.target.value)}
                    className="border border-[#EFEFED] font-montserrat font-medium text-xs text-[#1A1A18] px-4 py-2 rounded-full bg-white">
                    <option value="popular">Most Popular</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
              <motion.div layout className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                <AnimatePresence mode="popLayout">
                  {filtered.map(p => <ProductCard key={p.id} product={p} />)}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={() => setFilterOpen(false)} />
            <motion.aside
              className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}>
              <div className="flex justify-between items-center mb-6">
                <span className="font-montserrat font-black text-base text-[#1A1A18] uppercase tracking-wider">Filters</span>
                <button onClick={() => setFilterOpen(false)}><X size={20} /></button>
              </div>
              <FilterPanel breedSizes={breedSizes} healthGoals={healthGoals}
                activeBreed={activeBreed} setActiveBreed={v => { setActiveBreed(v); setFilterOpen(false) }}
                activeGoal={activeGoal}   setActiveGoal={v => { setActiveGoal(v);   setFilterOpen(false) }} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      <Footer />
    </>
  )
}
