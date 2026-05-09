/**
 * Eyebrow + divider + heading + optional subtitle.
 * Re-used at the top of most PDP sections.
 *
 *   <SectionHead label="WHAT'S INSIDE" title="Research-backed active ingredients" />
 */
export default function SectionHead({ label, title, sub, align = 'center' }) {
  const alignCls = align === 'center' ? 'text-center max-w-2xl mx-auto' : ''
  return (
    <div className={alignCls}>
      <p className="font-montserrat font-bold text-[10px] tracking-[0.25em] uppercase text-[#0a0a0a]">{label}</p>
      <div className={`w-9 h-0.5 bg-[#1A1A18] my-4 ${align === 'center' ? 'mx-auto' : ''}`} />
      <h2 className="font-baskerville font-bold text-3xl md:text-4xl lg:text-[42px] leading-[1.1] text-[#1A1A18] tracking-tight">
        {title}
      </h2>
      {sub && <p className="font-montserrat text-base text-[#6B6B6B] mt-4 leading-relaxed">{sub}</p>}
    </div>
  )
}
