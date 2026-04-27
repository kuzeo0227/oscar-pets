import { AnimatePresence, motion } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const { items, count, total, drawerOpen, setDrawer, removeItem, updateQty } = useCart()

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setDrawer(false)}
          />
          <motion.aside
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#EFE0C0]">
              <span className="font-montserrat font-black text-lg text-[#1C2B4A] uppercase tracking-widest">
                Cart {count > 0 && <span className="text-[#C8812E]">({count})</span>}
              </span>
              <button onClick={() => setDrawer(false)} className="p-2 hover:text-[#C8812E] transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-[#6B6258] gap-3">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="font-montserrat font-medium text-sm">Your cart is empty</p>
                </div>
              ) : items.map(item => (
                <div key={item.id} className="flex gap-4 items-start py-4 border-b border-[#EFE0C0]">
                  <div className="w-16 h-16 rounded-lg bg-[#F9F4EC] flex-shrink-0 overflow-hidden">
                    {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-montserrat font-bold text-sm text-[#1A1610] truncate">{item.name}</p>
                    <p className="font-montserrat text-xs text-[#6B6258] mt-0.5">RM {item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-6 h-6 flex items-center justify-center border border-[#EFE0C0] rounded text-[#1C2B4A] hover:border-[#C8812E] transition-colors">
                        <Minus size={12} />
                      </button>
                      <span className="font-montserrat font-medium text-sm w-6 text-center">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-6 h-6 flex items-center justify-center border border-[#EFE0C0] rounded text-[#1C2B4A] hover:border-[#C8812E] transition-colors">
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-[#6B6258] hover:text-[#C8812E] transition-colors mt-1">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-[#EFE0C0]">
                <div className="flex justify-between mb-4 font-montserrat">
                  <span className="font-medium text-[#6B6258]">Total</span>
                  <span className="font-black text-[#1C2B4A] text-lg">RM {total.toFixed(2)}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02, brightness: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#C8812E] text-[#1C2B4A] font-montserrat font-black uppercase tracking-widest py-4 rounded-lg text-sm"
                >
                  Checkout
                </motion.button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
