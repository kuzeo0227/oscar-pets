/**
 * Subscribe vs One-time radio button row inside the purchase box.
 *
 *   <PurchaseOption
 *      selected={purchase === 'subscribe'}
 *      onClick={...} title="Subscribe & Save"
 *      sub="Free shipping" badge="Save 20%"
 *      price={71} oldPrice={89}
 *   />
 */
export default function PurchaseOption({ selected, onClick, badge, title, sub, price, oldPrice }) {
  const isDeal = !!oldPrice
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-between gap-3 p-4 rounded-xl border-2 text-left transition-all ${
        selected ? 'border-[#1A1A18] bg-[#FAFAF7]' : 'border-[#EFEFED] bg-white hover:border-[#1A1A18]/40'
      }`}
    >
      {badge && (
        <span className="absolute -top-2.5 right-4 bg-[#06C265] text-white font-montserrat font-bold text-[9px] tracking-[0.1em] uppercase px-2.5 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      <div className="flex items-center gap-3">
        <span className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
          selected ? 'border-[#1A1A18] bg-[#1A1A18]' : 'border-[#C8C6C2]'
        }`}>
          {selected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
        </span>
        <div>
          <p className="font-montserrat font-bold text-sm text-[#1A1A18]">{title}</p>
          <p className="font-montserrat font-normal text-[11px] text-[#6B6B6B] mt-0.5">{sub}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-baskerville font-bold text-base ${isDeal ? 'text-[#06C265]' : 'text-[#1A1A18]'}`}>RM {price}</p>
        {oldPrice && <p className="font-montserrat text-[11px] text-[#C8C6C2] line-through">RM {oldPrice}</p>}
      </div>
    </button>
  )
}
