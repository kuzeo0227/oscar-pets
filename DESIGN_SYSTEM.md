# Oscar Pets — Design System

**Last updated:** 2026-04-28
**Live URL:** https://oscar-pets.vercel.app
**Repo:** https://github.com/kuzeo0227/oscar-pets

This is the single source of truth for the Oscar Pets brand. Every section file should follow these rules. If you're handing this off to another AI agent or designer, this is the doc to read first.

---

## 1 · Brand Tone

- **Premium, science-backed, Gen Z native.**
- "Trusted but not boring" — clean & monochrome with a single bright-green accent.
- Inspired by [thepetlabco.com](https://thepetlabco.com) layout system.
- Always specific over vague: "3 Billion CFU per chew" beats "high quality."

---

## 2 · Color Palette

Use these exact hex codes. Do **not** introduce new colors without updating this doc first.

| Token | Hex | Tailwind class | Use |
|---|---|---|---|
| **Off-black** | `#1A1A18` | `text-[#1A1A18]` `bg-[#1A1A18]` | Primary text, dark sections, borders, icons |
| **Bright Green** | `#06C265` | `text-[#06C265]` `bg-[#06C265]` | **CTAs, prices, "Save X%" badges, eyebrow labels, accents** |
| **Off-white** | `#FAFAF7` | `bg-[#FAFAF7]` | Alternating section backgrounds, soft surfaces |
| **White** | `#FFFFFF` | `bg-white` | Default page background, cards |
| **Light gray (line)** | `#EFEFED` | `border-[#EFEFED]` | Borders, dividers between rows |
| **Mid gray** | `#6B6B6B` | `text-[#6B6B6B]` | Body text, captions, sub-labels |
| **Mid-light gray** | `#C8C6C2` | `text-[#C8C6C2]` | Strikethrough prices, deselected radios |

### Rules

- **Never use Tailwind defaults** like `text-gray-500` — always the hex codes above.
- **Bright Green is reserved** for: primary CTAs, the deal/savings price, eyebrow labels, "Verified Purchase" check, "Save 20%" badges, success states. Don't use it for body text or large headings.
- **Section backgrounds alternate** white → off-white → white → off-white. Never two same-color sections in a row.
- **Dark sections** (Vet Reviewed) use off-black `#1A1A18` background with white `#FFFFFF` text and green `#06C265` accents.

---

## 3 · Typography

Two fonts, loaded from Google Fonts in `index.html`.

| Font | Use | Tailwind class |
|---|---|---|
| **Libre Baskerville Bold** | Section headings (`<h1>`, `<h2>`, `<h3>`), display, italic emphasis | `font-baskerville` |
| **Montserrat** | Body, UI, eyebrow labels, buttons, navigation, footer, captions | `font-montserrat` |

### Type scale

```
Hero H1:        text-5xl sm:text-6xl lg:text-[64px]   font-baskerville font-bold
Section H2:     text-3xl md:text-4xl lg:text-[44px]   font-baskerville font-bold
Card title:     text-base / text-lg                   font-baskerville font-bold
Body:           text-sm / text-base                   font-montserrat font-normal
Eyebrow:        text-[10px] / text-[11px]             font-montserrat font-bold tracking-[0.25em] uppercase
Caption:        text-xs / text-[11px]                 font-montserrat font-normal
CTA button:     text-sm                               font-montserrat font-black tracking-wider uppercase
```

### Italic emphasis

For "the next level" / "optimal" style emphasis inside a heading, use:
```jsx
<em className="font-baskerville italic font-bold">the next level</em>
```

---

## 4 · Spacing System

Always max-width and centered.

```
Section padding:       py-20 md:py-24      (sometimes py-28 for hero-equivalents)
Container:             max-w-7xl mx-auto px-6
Heading → content gap: mt-10 / mt-12
Inter-section gap:     handled by section padding, no extra spacing
```

### Common motifs

- **2-column splits**: `grid lg:grid-cols-2 gap-12 lg:gap-20 items-center`
- **Card border**: `border border-[#EFEFED] rounded-2xl`
- **Card hover**: `whileHover={{ y: -6, boxShadow: '0 12px 32px rgba(0,0,0,0.10)' }}`

---

## 5 · Components

### CTA Button (primary)

```jsx
<motion.button
  whileHover={{ scale: 1.03, filter: 'brightness(1.08)' }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
  className="bg-[#06C265] text-white font-montserrat font-black text-sm tracking-wider uppercase px-8 py-4 rounded-full"
>
  Add to Cart
</motion.button>
```

### CTA Button (secondary / ghost)

```jsx
<button className="border-2 border-[#1A1A18] text-[#1A1A18] font-montserrat font-black text-sm tracking-wider uppercase px-8 py-4 rounded-full bg-transparent hover:bg-[#1A1A18] hover:text-white transition-colors">
  Our Science
</button>
```

### Eyebrow + heading + divider pattern

```jsx
<p className="font-montserrat font-bold text-[10px] tracking-[0.25em] uppercase text-[#06C265]">What's Inside</p>
<div className="w-9 h-0.5 bg-[#1A1A18] my-4 mx-auto" />
<h2 className="font-baskerville font-bold text-3xl md:text-4xl lg:text-[42px] leading-[1.1] text-[#1A1A18] tracking-tight">Section heading</h2>
```

### Section anchor (sticky-nav-aware)

```jsx
<span id="section-id" className="block relative -top-32 invisible" />
<section>...</section>
```

---

## 6 · Animation System

All animations use **Framer Motion**.

### Default scroll-reveal (use everywhere)

```jsx
const fadeUp = {
  hidden:  { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-80px' }}
  variants={fadeUp}
>
```

### Stagger lists

```jsx
{items.map((item, i) => (
  <motion.li
    key={item.id}
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
  >
))}
```

### Card hover (lift + shadow)

```jsx
whileHover={{ y: -6, boxShadow: '0 12px 32px rgba(0,0,0,0.10)' }}
transition={{ type: 'spring', stiffness: 300, damping: 20 }}
```

### Custom easing curve

`[0.22, 1, 0.36, 1]` — a soft bouncy ease-out, used throughout. Don't use `easeOut` or `linear` unless specifically needed.

---

## 7 · Imagery

- **Source:** Unsplash placeholder URLs at `?w=400|600|800|1000&q=80`. Replace with real product photography on launch.
- **Aspect ratios:**
  - Hero / lifestyle splits: `aspect-[4/5]` rounded `rounded-3xl`
  - Ingredient cards: `aspect-[3/4]` rounded `rounded-2xl`
  - Product hero: `aspect-square` rounded `rounded-3xl`
- **Background fill** while loading: always `bg-[#FAFAF7]` (off-white) so transitions feel intentional.

---

## 8 · Section anatomy templates

### Two-column "feature with image" (used in Quality block, Product Benefits, Directions)

```
┌─────────────────────────┬─────────────────────────┐
│ EYEBROW                 │                         │
│ Big Heading             │                         │
│ Optional subhead.       │   [   Lifestyle Image   │
│                         │     4:5, rounded-3xl    │
│ ✓ Item 1                │     bg-[#FAFAF7]      ] │
│ ✓ Item 2                │                         │
│ ✓ Item 3                │                         │
│ ✓ Item 4                │                         │
└─────────────────────────┴─────────────────────────┘
```

### Numbered timeline (What To Expect)

```
┌──────────┬──────────┬──────────┐
│ 01       │ 02       │ 03       │
│ Title    │ Title    │ Title    │
│ Body…    │ Body…    │ Body…    │
└──────────┴──────────┴──────────┘
  rounded-l-3xl  middle  rounded-r-3xl
  hover:bg-[#1A1A18] turns navy-on-hover
```

### Reviews summary card

```
┌──────────────────────────────────────────────────────┐
│ 4.9    ★★★★★                  ────────  91%          │
│        2,847 verified reviews ────────  6%           │
│                               ────────  2%           │
│                               ────────  1%           │
│                               ────────  0%           │
└──────────────────────────────────────────────────────┘
  bg-[#FAFAF7] rounded-2xl, animated bar fills (Framer)
```

---

## 9 · File Structure (after refactor)

```
oscar-pets/
├── DESIGN_SYSTEM.md             ← you are here
├── HANDOVER.md                  ← page → section file map
│
├── src/
│   ├── data/
│   │   └── product.js           ← all product data (price, sizes, dosing, ingredients, reviews, FAQs)
│   │
│   ├── sections/
│   │   └── product/             ← Product Detail Page sections, in scroll order
│   │       ├── PdpTopNav.jsx              · Sticky section-anchor nav
│   │       ├── 01-PdpHero.jsx             · Image gallery + purchase box
│   │       ├── 02-VetReviewed.jsx         · Dark section with quote + 4 stat tiles
│   │       ├── 03-KeyIngredients.jsx      · 4-card ingredient grid + Quality block
│   │       ├── 04-DirectionsForUse.jsx    · Lifestyle photo + dose table
│   │       ├── 05-ProductBenefits.jsx     · 5 circular-photo benefit items + lifestyle image
│   │       ├── 06-WhatToExpect.jsx        · 89% headline + 3-month timeline
│   │       ├── 07-Reviews.jsx             · Score + bar chart + 3 review cards
│   │       ├── 08-ProductFAQ.jsx          · Accordion FAQ
│   │       └── _shared/
│   │           ├── SectionHead.jsx        · Eyebrow + divider + heading
│   │           ├── PurchaseOption.jsx     · Subscribe vs One-time radio button
│   │           └── IngredientCard.jsx     · Hover-reveal ingredient card
│   │
│   ├── components/
│   │   ├── Nav.jsx              · Site-wide top nav
│   │   ├── CartDrawer.jsx       · Slide-in cart
│   │   ├── PageTransition.jsx   · Route fade animation
│   │   └── sections/            · Home page sections (existing, untouched)
│   │       ├── Hero.jsx
│   │       ├── ProductFeature.jsx
│   │       ├── OurMission.jsx
│   │       ├── IngredientsShowcase.jsx
│   │       ├── SciencePreview.jsx
│   │       └── Footer.jsx
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ShopPage.jsx
│   │   ├── ProductDetailPage.jsx   · Thin shell that imports product sections
│   │   ├── AboutPage.jsx
│   │   └── SciencePage.jsx
│   │
│   ├── context/
│   │   └── CartContext.jsx
│   ├── lib/
│   │   └── utils.js             · Animation variants
│   ├── App.jsx                  · Routes
│   ├── main.jsx                 · Entry
│   └── index.css                · Tailwind + brand tokens + Google Fonts
│
├── shopify-sections/            · Standalone .liquid files for Shopify Admin
└── package.json
```

---

## 10 · Editing rules

1. **One section per file.** Don't add multiple sections into one component.
2. **Data lives in `src/data/`.** Don't hardcode strings inside section JSX — import from data files so non-coders can edit content.
3. **Anchor IDs match nav.** If you add `<a href="#new">` to `PdpTopNav`, your section file must include `<span id="new" …>` immediately before the `<section>`.
4. **Keep sections self-contained.** Each section file should run independently with no cross-section imports (other than `_shared/`).
5. **Section order = filename prefix.** `01-…`, `02-…`, etc. So scroll order is obvious from the file tree.
6. **Always wrap in `motion.div` with `whileInView`** for scroll reveals — see Animation System above.

---

## 11 · Quick reference: hex codes (cheat sheet)

```
Off-black     #1A1A18
Bright Green  #06C265
Off-white     #FAFAF7
Pure white    #FFFFFF
Border line   #EFEFED
Body gray     #6B6B6B
Strikethrough #C8C6C2
```

If you see any other hex code in the codebase, it's a bug. Replace it with one of the above.
