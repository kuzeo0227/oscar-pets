import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

/**
 * Sticky section-anchor nav at the top of the PDP, just under the global header.
 * Links smooth-scroll to anchor IDs that match the `<span id>` in each section file.
 */
const SECTIONS = [
  { id: 'hero',        label: 'Product Info' },
  { id: 'vet',         label: 'Vet Reviewed' },
  { id: 'ingredients', label: 'Key Ingredients' },
  { id: 'directions',  label: 'Directions For Use' },
  { id: 'benefits',    label: 'Product Benefits' },
  { id: 'expect',      label: 'What To Expect' },
  { id: 'faq',         label: 'FAQ' },
]

export default function PdpTopNav() {
  return (
    <div className="border-b bg-white sticky top-[96px] z-20" style={{ borderColor: 'var(--color-rule)' }}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/product" className="inline-flex items-center gap-1.5 text-sm font-montserrat font-medium text-[#6B6B6B] hover:text-[#1A1A18] transition-colors">
          <ChevronLeft size={16} />
          <span>Back to shop</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-5 text-[11px] font-montserrat font-bold tracking-[0.12em] uppercase text-[#6B6B6B]">
          {SECTIONS.map(s => (
            <a key={s.id} href={`#${s.id}`} className="hover:text-[#1A1A18] transition-colors">
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
