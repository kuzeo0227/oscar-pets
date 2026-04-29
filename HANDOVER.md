# Oscar Pets — Handover Doc

This doc explains **where each part of the website lives** so you can edit a specific section without touching anything else.

> 📖 **First-timer? Read [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) first.** It defines colors, fonts, spacing, and component patterns. Don't deviate from it.

**Live URL:** https://oscar-pets.vercel.app
**Repo:** https://github.com/kuzeo0227/oscar-pets

---

## TL;DR — common edit recipes

| You want to… | Edit this file |
|---|---|
| Change product name / price / rating | `src/data/product.js` |
| Add or edit a customer review | `src/data/product.js` → `REVIEWS` |
| Add or edit an FAQ | `src/data/product.js` → `FAQS` |
| Edit dosing chart values | `src/data/product.js` → `DOSING` |
| Swap a product image | URL field inside `src/data/product.js` |
| Change Hero headline copy | `src/components/sections/Hero.jsx` |
| Change PDP "Vet Reviewed" quote | `src/data/product.js` → `VET.quote` |
| Reorder PDP sections | `src/pages/ProductDetailPage.jsx` |
| Change brand colors | `DESIGN_SYSTEM.md` + `src/index.css` (do both!) |
| Change site nav links (Home, Shop, About, Science) | `src/components/Nav.jsx` |
| Change footer | `src/components/sections/Footer.jsx` |

---

## File map by page

### 🏠 Home page (`/`)

`src/pages/HomePage.jsx` imports these sections in order:

| # | Section | File |
|---|---|---|
| 1 | Hero (split, lifestyle photo) | [src/components/sections/Hero.jsx](./src/components/sections/Hero.jsx) |
| 2 | Product Feature spotlight | [src/components/sections/ProductFeature.jsx](./src/components/sections/ProductFeature.jsx) |
| 3 | Our Mission (3 numbered cards) | [src/components/sections/OurMission.jsx](./src/components/sections/OurMission.jsx) |
| 4 | Ingredients showcase (filter pills + grid) | [src/components/sections/IngredientsShowcase.jsx](./src/components/sections/IngredientsShowcase.jsx) |
| 5 | Science preview (3 article cards) | [src/components/sections/SciencePreview.jsx](./src/components/sections/SciencePreview.jsx) |
| 6 | Footer | [src/components/sections/Footer.jsx](./src/components/sections/Footer.jsx) |

### 🛒 Shop page (`/shop`)

| Section | File |
|---|---|
| Product listing grid + filters | [src/pages/ShopPage.jsx](./src/pages/ShopPage.jsx) |

### 🐾 Product Detail page (`/product/probiotic-blend`) — sectioned

This is the most-edited page. Each section is its own file:

| # | Section | File |
|---|---|---|
| 0 | Sticky section nav (anchors) | [src/sections/product/PdpTopNav.jsx](./src/sections/product/PdpTopNav.jsx) |
| 1 | Product Info (image gallery + purchase box) | [src/sections/product/01-PdpHero.jsx](./src/sections/product/01-PdpHero.jsx) |
| 2 | Vet Reviewed (dark, quote + 4 stat tiles) | [src/sections/product/02-VetReviewed.jsx](./src/sections/product/02-VetReviewed.jsx) |
| 3 | Key Ingredients (4 hover-reveal cards + Quality block) | [src/sections/product/03-KeyIngredients.jsx](./src/sections/product/03-KeyIngredients.jsx) |
| 4 | Directions For Use (lifestyle photo + dose table) | [src/sections/product/04-DirectionsForUse.jsx](./src/sections/product/04-DirectionsForUse.jsx) |
| 5 | Product Benefits (5 circular-photo items + lifestyle image) | [src/sections/product/05-ProductBenefits.jsx](./src/sections/product/05-ProductBenefits.jsx) |
| 6 | What To Expect (89% headline + 3-month timeline) | [src/sections/product/06-WhatToExpect.jsx](./src/sections/product/06-WhatToExpect.jsx) |
| 7 | Reviews (score + bar chart + 3 cards) | [src/sections/product/07-Reviews.jsx](./src/sections/product/07-Reviews.jsx) |
| 8 | Product FAQ (accordion) | [src/sections/product/08-ProductFAQ.jsx](./src/sections/product/08-ProductFAQ.jsx) |

**Shared sub-components used by PDP sections:**

| File | What it is |
|---|---|
| [src/sections/product/_shared/SectionHead.jsx](./src/sections/product/_shared/SectionHead.jsx) | Eyebrow + divider + heading + subtitle pattern |
| [src/sections/product/_shared/PurchaseOption.jsx](./src/sections/product/_shared/PurchaseOption.jsx) | Subscribe/One-time radio button row |
| [src/sections/product/_shared/IngredientCard.jsx](./src/sections/product/_shared/IngredientCard.jsx) | Hover-reveal ingredient card |

### 📖 About page (`/about`)

| File |
|---|
| [src/pages/AboutPage.jsx](./src/pages/AboutPage.jsx) |

### 🔬 Science page (`/science`)

| File |
|---|
| [src/pages/SciencePage.jsx](./src/pages/SciencePage.jsx) |

---

## Site-wide files

| File | Purpose |
|---|---|
| [src/components/Nav.jsx](./src/components/Nav.jsx) | Site-wide top nav (logo, links, search/account/cart icons, mobile drawer) |
| [src/components/CartDrawer.jsx](./src/components/CartDrawer.jsx) | Slide-in cart |
| [src/components/PageTransition.jsx](./src/components/PageTransition.jsx) | Fade between routes |
| [src/components/sections/Footer.jsx](./src/components/sections/Footer.jsx) | Site footer (used on all pages) |
| [src/context/CartContext.jsx](./src/context/CartContext.jsx) | Cart state — items, count, drawer open/close |
| [src/lib/utils.js](./src/lib/utils.js) | Reusable `motion.div` variants |
| [src/index.css](./src/index.css) | Tailwind + brand color tokens + Google Fonts import |
| [src/App.jsx](./src/App.jsx) | Routes |

---

## How to add a new PDP section

1. Create `src/sections/product/09-MyNewSection.jsx`
2. Wrap it like every other section file:
   ```jsx
   import { motion } from 'framer-motion'

   export default function MyNewSection() {
     return (
       <>
         <span id="mynew" className="block relative -top-32 invisible" />
         <section className="bg-white py-20 md:py-24">
           {/* your content */}
         </section>
       </>
     )
   }
   ```
3. Import + place it in `src/pages/ProductDetailPage.jsx` where you want it in scroll order
4. Add `{ id: 'mynew', label: 'My New Section' }` to the `SECTIONS` array in `PdpTopNav.jsx` if you want it in the sticky nav

---

## How to remove a PDP section

1. Open `src/pages/ProductDetailPage.jsx`
2. Comment out (or delete) the line `<MyNewSection />` and the matching `import` at the top
3. Remove the matching entry from `SECTIONS` in `PdpTopNav.jsx`

The section file itself can stay in the repo — it just won't render.

---

## How to change brand colors

Brand colors are in two places — keep both in sync:

1. **`src/index.css`** — defines CSS variables and theme tokens
2. **`DESIGN_SYSTEM.md`** — the human-readable reference

Then run a global find-replace across `src/`:
```bash
cd src && find . -type f -name "*.jsx" -print0 | xargs -0 sed -i 's/#OLD_HEX/#NEW_HEX/g'
```

---

## How to develop locally

```bash
cd oscar-pets
npm install
npm run dev          # → http://localhost:5173
```

To build for production:
```bash
npm run build
```

To deploy:
```bash
npx vercel --prod    # already configured
```

---

## Design references

- **Layout system inspiration:** [thepetlabco.com/products/probiotic-chews-dogs](https://thepetlabco.com/products/probiotic-chews-dogs)
- **Brand voice:** Premium, science-backed, Gen Z native — "trusted but not boring"
- **Typography:** Libre Baskerville Bold (headings) + Montserrat (everything else)
- **Color signature:** Off-black + white/off-white + bright green accent

For full guidelines see [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).

---

## Shopify export

The `shopify-sections/` folder contains 7 standalone `.liquid` files that mirror the home page sections. They're for pasting directly into a Shopify Admin → Edit Code → Sections folder. See [shopify-sections/INSTALL.md](./shopify-sections/INSTALL.md) for install steps.

> ⚠ The PDP sections (under `src/sections/product/`) have **not** been ported to Liquid yet. If you need them in Shopify, that's a separate conversion task.
