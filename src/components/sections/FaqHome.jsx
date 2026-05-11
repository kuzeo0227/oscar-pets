import { useState } from 'react'

const FAQS = [
  { q: 'What makes Oscar different from other dog supplements?', a: "Every ingredient in Oscar was selected from peer-reviewed canine research — not marketing briefs. We use a tri-biotic system (prebiotics, probiotics, postbiotics) with Bacillus strains that survive Malaysia's tropical ambient temperatures without refrigeration." },
  { q: 'How long before I see results?',                          a: 'Most pet parents notice changes in stool consistency and energy within 2–3 weeks. Coat and skin improvements typically appear around 4–6 weeks of consistent daily use.' },
  { q: 'Is Oscar safe for all dog breeds?',                       a: 'Yes. The formula is designed for small and medium breeds but is safe across all sizes. Dosage adjusts by weight — refer to the feeding guide on the product page.' },
  { q: 'Is Oscar halal-compliant?',                               a: 'Yes. Oscar uses zero porcine inputs. Lamb liver is sourced from halal-certified suppliers. No alcohol-based carriers or ambiguous derivatives are used.' },
  { q: 'Can I give Oscar alongside other medications?',           a: 'We recommend consulting your vet if your dog is on prescription medication. For healthy dogs on standard diets, Oscar is designed as a standalone daily supplement.' },
]

export default function FaqHome() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" style={{ background: '#ffffff' }}>
      <div className="section-container py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-12 gap-y-8 items-start">
          <div className="lg:col-span-5">
            <h2 className="font-serif text-[#0a0a0a]"
              style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', fontWeight: 700, lineHeight: 1.1 }}>
              Frequently asked <em className="italic">questions.</em>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            {FAQS.map((f, i) => {
              const isOpen = open === i
              return (
                <div key={i} style={{
                  borderTop: '1px solid var(--color-rule)',
                  borderBottom: i === FAQS.length - 1 ? '1px solid var(--color-rule)' : 'none',
                }}>
                  <button onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full text-left flex items-center justify-between cursor-pointer transition-colors"
                    style={{ background: 'transparent', border: 0, padding: '20px 0', color: '#0a0a0a' }}>
                    <span className="font-display" style={{ fontSize: 15, fontWeight: 600, color: '#0a0a0a' }}>{f.q}</span>
                    <span className="font-mono" style={{
                      fontSize: 18, color: '#0a0a0a',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                    }}>+</span>
                  </button>
                  <div style={{
                    overflow: 'hidden',
                    maxHeight: isOpen ? 320 : 0,
                    transition: 'max-height 0.35s ease, padding 0.25s ease',
                    paddingBottom: isOpen ? 20 : 0,
                  }}>
                    <p className="font-display" style={{ fontSize: 14, color: '#6b6b6b', lineHeight: 1.7, paddingRight: '10%' }}>
                      {f.a}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
