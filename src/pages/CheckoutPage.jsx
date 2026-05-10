import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import Footer from '../components/sections/Footer'

const ease = [0.22, 1, 0.36, 1]

/**
 * /checkout — minimal one-page checkout. Pure UI demo (no payment processor).
 * LEFT (7/12)  — contact + shipping form
 * RIGHT (5/12) — order summary card with line items + totals + Pay Now button
 */
export default function CheckoutPage() {
  const { items, total, removeItem } = useCart()
  const navigate = useNavigate()

  function handlePay(e) {
    e.preventDefault()
    // Stub — clears cart, sends user back home with a flag.
    items.forEach(i => removeItem(i.id))
    navigate('/')
  }

  return (
    <>
      <main style={{ background: 'var(--color-paper)', minHeight: 'calc(100vh - 96px)' }}>
        <div className="container-edge mx-auto py-16 lg:py-24">

          {/* Page header */}
          <p className="eyebrow" style={{ color: '#6b6b6b', marginBottom: 16 }}>CHECKOUT</p>
          <h1
            className="font-serif text-[#0a0a0a]"
            style={{ fontSize: 'clamp(36px, 4.4vw, 56px)', fontWeight: 700, lineHeight: 1.05 }}
          >
            Almost <em className="italic">there</em>.
          </h1>
          <p
            className="font-display mt-4"
            style={{ fontSize: 15, color: '#6b6b6b', lineHeight: 1.7, maxWidth: '52ch' }}
          >
            Confirm your details and we'll send your jar within two business days.
          </p>

          {items.length === 0 ? (
            <EmptyState />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="mt-12 grid grid-cols-1 lg:grid-cols-12 lg:gap-x-16 gap-y-12"
            >
              {/* LEFT — form */}
              <form onSubmit={handlePay} className="lg:col-span-7 flex flex-col gap-10">
                <FormSection title="01 — CONTACT">
                  <Field label="Email"        type="email" name="email" required />
                  <Field label="Phone number" type="tel"   name="phone" required />
                </FormSection>

                <FormSection title="02 — SHIPPING">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
                    <Field label="First name"  name="firstName" required />
                    <Field label="Last name"   name="lastName"  required />
                  </div>
                  <Field label="Address"  name="address" required />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 gap-y-5">
                    <Field label="City"     name="city" required />
                    <Field label="State"    name="state" required />
                    <Field label="Postcode" name="postcode" required />
                  </div>
                </FormSection>

                <FormSection title="03 — PAYMENT">
                  <Field label="Card number"     name="card" required />
                  <div className="grid grid-cols-2 gap-x-5 gap-y-5">
                    <Field label="MM / YY"       name="exp" required />
                    <Field label="CVC"           name="cvc" required />
                  </div>
                </FormSection>

                {/* Pay button — bottom of form on mobile, hidden on desktop (uses summary's button instead) */}
                <button
                  type="submit"
                  className="lg:hidden cursor-pointer font-mono uppercase transition-colors"
                  style={{
                    background: '#0a0a0a', color: '#ffffff',
                    fontSize: 12, fontWeight: 700, letterSpacing: '0.22em',
                    padding: '18px 36px',
                    border: 0, borderRadius: 0,
                  }}
                >
                  Pay RM {total.toFixed(2)} →
                </button>
              </form>

              {/* RIGHT — order summary */}
              <aside className="lg:col-span-5">
                <div
                  className="lg:sticky"
                  style={{
                    top: 120,
                    background: 'var(--color-paper-soft)',
                    padding: '32px 28px',
                  }}
                >
                  <p className="eyebrow" style={{ color: '#6b6b6b', marginBottom: 24 }}>
                    YOUR ORDER
                  </p>

                  {items.map(item => (
                    <div
                      key={item.id}
                      className="flex gap-4 py-4"
                      style={{ borderBottom: '1px solid var(--color-rule)' }}
                    >
                      <div
                        className="flex-shrink-0 overflow-hidden"
                        style={{ width: 64, height: 64, background: '#ffffff' }}
                      >
                        <img
                          src="/assets/jar-front.jpg"
                          alt={item.name}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: 'center 78%', transform: 'scale(1.18)' }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-display" style={{ fontSize: 14, fontWeight: 600, color: '#0a0a0a' }}>
                          {item.name}
                        </p>
                        {item.meta && (
                          <p className="font-mono uppercase mt-1" style={{ fontSize: 10, letterSpacing: '0.16em', color: '#6b6b6b' }}>
                            {item.meta}
                          </p>
                        )}
                        <p className="font-mono mt-2" style={{ fontSize: 11, letterSpacing: '0.1em', color: '#6b6b6b' }}>
                          Qty {item.qty} · RM {(item.price * item.qty).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Totals */}
                  <div className="pt-5 mt-2 flex flex-col gap-3" >
                    <Row label="Subtotal" value={`RM ${total.toFixed(2)}`} />
                    <Row label="Shipping" value="FREE" />
                    <div style={{ borderTop: '1px solid var(--color-rule)' }} className="pt-4 mt-2">
                      <Row label="Total" value={`RM ${total.toFixed(2)}`} bold />
                    </div>
                  </div>

                  <button
                    type="submit"
                    onClick={handlePay}
                    className="hidden lg:block w-full mt-7 cursor-pointer font-mono uppercase transition-colors"
                    style={{
                      background: '#0a0a0a', color: '#ffffff',
                      fontSize: 12, fontWeight: 700, letterSpacing: '0.22em',
                      padding: '18px 0',
                      border: 0, borderRadius: 0,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#2a2a2a')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#0a0a0a')}
                  >
                    Pay RM {total.toFixed(2)} →
                  </button>

                  <p
                    className="font-mono uppercase text-center mt-4"
                    style={{ fontSize: 10, letterSpacing: '0.16em', color: '#9a9a96' }}
                  >
                    30-day money-back · Secure SSL
                  </p>
                </div>
              </aside>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

function EmptyState() {
  return (
    <div className="mt-16 text-center" style={{ padding: '64px 0' }}>
      <p className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: '0.18em', color: '#6b6b6b' }}>
        Your cart is empty
      </p>
      <p
        className="font-serif italic mt-4"
        style={{ fontSize: 22, color: '#0a0a0a' }}
      >
        Nothing to check out yet.
      </p>
      <Link to="/product" className="inline-block mt-8">
        <button
          className="font-mono uppercase cursor-pointer transition-colors"
          style={{
            background: '#0a0a0a', color: '#ffffff',
            fontSize: 12, fontWeight: 700, letterSpacing: '0.22em',
            padding: '18px 36px',
            border: 0, borderRadius: 0,
          }}
        >
          Shop now →
        </button>
      </Link>
    </div>
  )
}

function FormSection({ title, children }) {
  return (
    <div>
      <p
        className="font-mono uppercase pb-4 mb-6"
        style={{ fontSize: 11, letterSpacing: '0.18em', color: '#6b6b6b', borderBottom: '1px solid var(--color-rule)' }}
      >
        {title}
      </p>
      <div className="flex flex-col gap-5">
        {children}
      </div>
    </div>
  )
}

function Field({ label, type = 'text', name, required }) {
  return (
    <label className="block">
      <span
        className="font-mono uppercase block"
        style={{ fontSize: 10, letterSpacing: '0.18em', color: '#6b6b6b', marginBottom: 8 }}
      >
        {label} {required && <span style={{ color: '#0a0a0a' }}>*</span>}
      </span>
      <input
        type={type} name={name} required={required}
        className="w-full font-display"
        style={{
          fontSize: 15, color: '#0a0a0a', background: 'transparent',
          border: 0, borderBottom: '1px solid var(--color-rule)',
          padding: '10px 0', outline: 'none', borderRadius: 0,
        }}
        onFocus={e => (e.currentTarget.style.borderBottomColor = '#0a0a0a')}
        onBlur={e => (e.currentTarget.style.borderBottomColor = 'var(--color-rule)')}
      />
    </label>
  )
}

function Row({ label, value, bold }) {
  return (
    <div className="flex justify-between items-baseline">
      <span
        className="font-mono uppercase"
        style={{ fontSize: 11, letterSpacing: '0.18em', color: bold ? '#0a0a0a' : '#6b6b6b' }}
      >
        {label}
      </span>
      <span
        className="num-mono"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: bold ? 18 : 14,
          fontWeight: 700,
          color: '#0a0a0a',
        }}
      >
        {value}
      </span>
    </div>
  )
}
