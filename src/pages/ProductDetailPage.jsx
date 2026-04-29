/**
 * PRODUCT DETAIL PAGE — thin shell that imports each section in order.
 * ───────────────────────────────────────────────────────────────────
 * Each section lives in its own file under src/sections/product/.
 * To rearrange the page, just change the order of the components below.
 * To edit content, see src/data/product.js.
 * To change brand colors / fonts / spacing, see DESIGN_SYSTEM.md.
 */
import Footer from '../components/sections/Footer'

import PdpTopNav         from '../sections/product/PdpTopNav'
import PdpHero           from '../sections/product/01-PdpHero'
import VetReviewed       from '../sections/product/02-VetReviewed'
import KeyIngredients    from '../sections/product/03-KeyIngredients'
import DirectionsForUse  from '../sections/product/04-DirectionsForUse'
import ProductBenefits   from '../sections/product/05-ProductBenefits'
import WhatToExpect      from '../sections/product/06-WhatToExpect'
import Reviews           from '../sections/product/07-Reviews'
import ProductFAQ        from '../sections/product/08-ProductFAQ'

export default function ProductDetailPage() {
  return (
    <div className="bg-white text-[#1A1A18]">
      <PdpTopNav />
      <PdpHero />
      <VetReviewed />
      <KeyIngredients />
      <DirectionsForUse />
      <ProductBenefits />
      <WhatToExpect />
      <Reviews />
      <ProductFAQ />
      <Footer />
    </div>
  )
}
