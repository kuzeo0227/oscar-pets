import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const REVIEWS = [
  { name: 'Sarah T.', date: 'March 2026',    title: 'Life-changing for my Shih Tzu',     body: 'After 6 weeks her digestion is noticeably better. Less gas, firmer stools, and she absolutely loves the taste — finally a chew she actually wants.' },
  { name: 'Reza M.',  date: 'February 2026', title: 'Vet recommended, dog approved',     body: 'Finally a Malaysian brand that delivers. Science-backed, my vet approved it. The ambient-stable claim is huge for our climate.' },
  { name: 'Li Ying',  date: 'January 2026',  title: 'Worth the premium positioning.',    body: 'Took about 2 weeks to see real changes — coat is shinier and she stopped scratching her ears. Subscription pricing makes it sustainable.' },
]

export default function ReviewsHome() {
  return (
    <section id="reviews" style={{ background: '#ffffff' }}>
      <div className="section-container py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-12 gap-y-6 mb-12">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-[#0a0a0a]"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, lineHeight: 1.05 }}>
              Customer <em className="italic">reviews.</em>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="font-display" style={{ fontSize: 14.5, color: '#6b6b6b', lineHeight: 1.7 }}>
              Real results from real pet parents across Malaysia. Every review is from a verified purchase.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              style={{
                background: '#ffffff',
                border: '1px solid var(--color-rule)',
                borderRadius: 0,
                padding: 32,
              }}
            >
              <div style={{ fontSize: 14, color: '#0a0a0a' }}>★★★★★</div>
              <p className="font-display" style={{ fontSize: 15, fontWeight: 600, color: '#0a0a0a', marginTop: 12 }}>{r.title}</p>
              <p className="font-display" style={{ fontSize: 14, color: '#6b6b6b', lineHeight: 1.7, marginTop: 8 }}>{r.body}</p>
              <p className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: '0.14em', color: '#9a9a96', marginTop: 20 }}>
                {r.name} · {r.date}
              </p>
              <p className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: '0.14em', color: '#0a0a0a', marginTop: 4 }}>
                ✓ Verified Purchase
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
