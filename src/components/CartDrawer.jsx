import { AnimatePresence, motion } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartDrawer() {
  const { items, count, total, drawerOpen, setDrawer, removeItem, updateQty } = useCart()
  const navigate = useNavigate()

  function handleCheckout() {
    setDrawer(false)
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setDrawer(false)}
          />
          <motion.aside
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col"
            style={{ boxShadow: '-30px 0 80px rgba(0,0,0,0.18)' }}
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-7 py-5"
              style={{ borderBottom: '1px solid var(--color-rule)' }}
            >
              <span
                className="font-mono uppercase"
                style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', color: '#0a0a0a' }}
              >
                Cart{count > 0 && ` (${count})`}
              </span>
              <button
                onClick={() => setDrawer(false)}
                className="cursor-pointer transition-colors"
                style={{ color: '#0a0a0a', background: 'transparent', border: 0 }}
                aria-label="Close cart"
              >
                <X size={20} strokeWidth={1.75} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-7 py-2">
              {items.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center h-full gap-4"
                  style={{ color: '#6b6b6b' }}
                >
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p
                    className="font-mono uppercase"
                    style={{ fontSize: 11, letterSpacing: '0.18em' }}
                  >
                    Your cart is empty
                  </p>
                </div>
              ) : (
                items.map(item => (
                  <div
                    key={item.id}
                    className="flex gap-4 items-start py-5"
                    style={{ borderBottom: '1px solid var(--color-rule)' }}
                  >
                    {/* Thumbnail */}
                    <div
                      className="flex-shrink-0 overflow-hidden"
                      style={{ width: 64, height: 64, background: 'var(--color-paper-soft)' }}
                    >
                      <img
                        src={item.image || '/assets/jar-front.jpg'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 78%', transform: 'scale(1.18)' }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-display"
                        style={{ fontSize: 14, fontWeight: 600, color: '#0a0a0a', lineHeight: 1.3 }}
                      >
                        {item.name}
                      </p>
                      <p
                        className="font-mono mt-1"
                        style={{ fontSize: 11, letterSpacing: '0.1em', color: '#6b6b6b' }}
                      >
                        RM {item.price.toFixed(2)}
                      </p>
                      {/* Qty stepper */}
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="cursor-pointer transition-colors flex items-center justify-center"
                          style={{
                            width: 24, height: 24,
                            border: '1px solid var(--color-rule)',
                            background: 'transparent', color: '#0a0a0a', borderRadius: 0,
                          }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} strokeWidth={1.75} />
                        </button>
                        <span
                          className="font-mono num-mono text-center"
                          style={{ fontSize: 13, fontWeight: 700, color: '#0a0a0a', minWidth: 24 }}
                        >
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="cursor-pointer transition-colors flex items-center justify-center"
                          style={{
                            width: 24, height: 24,
                            border: '1px solid var(--color-rule)',
                            background: 'transparent', color: '#0a0a0a', borderRadius: 0,
                          }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} strokeWidth={1.75} />
                        </button>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="cursor-pointer transition-colors"
                      style={{ color: '#9a9a96', background: 'transparent', border: 0, marginTop: 4 }}
                      aria-label="Remove item"
                    >
                      <X size={16} strokeWidth={1.75} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="px-7 py-6"
                style={{ borderTop: '1px solid var(--color-rule)' }}
              >
                <div className="flex items-baseline justify-between mb-5">
                  <span
                    className="font-mono uppercase"
                    style={{ fontSize: 11, letterSpacing: '0.18em', color: '#6b6b6b' }}
                  >
                    Total
                  </span>
                  <span
                    className="num-mono"
                    style={{ fontFamily: "'Space Mono', monospace", fontSize: 22, fontWeight: 700, color: '#0a0a0a' }}
                  >
                    RM {total.toFixed(2)}
                  </span>
                </div>
                <motion.button
                  onClick={handleCheckout}
                  whileTap={{ scale: 0.98 }}
                  className="w-full cursor-pointer font-mono uppercase transition-colors"
                  style={{
                    background: '#0a0a0a',
                    color: '#ffffff',
                    fontSize: 12, fontWeight: 700, letterSpacing: '0.22em',
                    padding: '18px 0',
                    border: 0, borderRadius: 0,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#2a2a2a')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#0a0a0a')}
                >
                  Checkout →
                </motion.button>
                <p
                  className="font-mono uppercase text-center mt-4"
                  style={{ fontSize: 10, letterSpacing: '0.16em', color: '#9a9a96' }}
                >
                  30-day money-back · Free shipping over RM150
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
