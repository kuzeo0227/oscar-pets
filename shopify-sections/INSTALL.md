# Oscar Pets — Shopify Sections Install

7 self-contained Shopify sections. Each one pastes as a single `.liquid` file into your theme. No external CSS or JS files required — every section bundles its own styles, animations, and scripts.

## Files

| File | Section editor name | Purpose |
|---|---|---|
| `oscar-header.liquid` | Oscar Header | Sticky nav with logo, links, search/account/cart icons, mobile drawer |
| `oscar-hero.liquid` | Oscar Hero | Split hero: editorial heading + lifestyle photo + press marquee |
| `oscar-product-feature.liquid` | Oscar Product Feature | Product spotlight with stats, benefits, trust badges |
| `oscar-our-mission.liquid` | Oscar Mission | Oversized "OUR MISSION" heading + 3 numbered cards |
| `oscar-ingredients-showcase.liquid` | Oscar Ingredients | Filterable ingredient grid with category pills |
| `oscar-science-preview.liquid` | Oscar Science Preview | Research article cards |
| `oscar-footer.liquid` | Oscar Footer | Dark footer with brand, link columns, socials, certs |

## Install steps

### 1. Add each section to your theme

In Shopify Admin:

1. **Online Store > Themes**
2. On your active theme, click **⋯ > Edit code**
3. In the **Sections** folder click **Add a new section**
4. Name it (e.g. `oscar-hero`) and paste the contents of `oscar-hero.liquid`
5. Repeat for all 7 files

### 2. Wire the header & footer into the layout

Open `layout/theme.liquid` and add:

```liquid
{% comment %} Just inside <body> {% endcomment %}
{% section 'oscar-header' %}

{% comment %} Right before </body> {% endcomment %}
{% section 'oscar-footer' %}
```

(Remove or comment out the theme's existing `{% section 'header' %}` / `{% section 'footer' %}` calls.)

### 3. Add the home-page sections via the editor

1. **Online Store > Themes > Customize**
2. On the **Home page** template, click **Add section**
3. You'll see all five Oscar sections in the picker — add them in this order:
   - Oscar Hero
   - Oscar Product Feature
   - Oscar Mission
   - Oscar Ingredients
   - Oscar Science Preview
4. Each section comes pre-populated via `presets` — you can edit copy, swap images, add/remove cards directly in the Shopify editor without touching code.

### 4. Cart links

The header uses `{{ routes.cart_url }}` so the cart icon takes users to Shopify's standard cart page. If you want a slide-out drawer instead, that's a separate piece of work (Shopify's Dawn theme already provides one — let me know if you want me to wire it in).

## What works as-is

- Fonts load from Google Fonts (added by `oscar-header.liquid`)
- Scroll-triggered fade-up reveals (vanilla `IntersectionObserver`)
- Press marquee, hover lifts, filter pill toggles, mobile drawer slide-in (vanilla JS)
- All merchant copy / images / links are editable in the theme editor
- Mobile responsive (375 / 768 / 1024 breakpoints)

## What's different from the React build

| React | Shopify |
|---|---|
| Framer Motion | CSS `transition` + small IntersectionObserver script |
| React Router | Native Shopify URLs (`/products/...`, `/collections/...`, `/pages/...`) |
| `CartContext` | Shopify's native cart (`{{ cart.item_count }}`, `/cart/add`) |
| Hard-coded data | Editable in theme editor via `{% schema %}` |

## Brand tokens (hardcoded inline so each section is portable)

```
Midnight Navy  #1C2B4A
Copper Gold    #C8812E
Grain Black    #1A1610
Ivory Cream    #F9F4EC
Champagne      #EFE0C0
Warm Gold      #D4A843
Warm Stone     #6B6258
```

If you want these centralized, you can move them to `assets/oscar-tokens.css` and reference once in `theme.liquid`.

## Tips

- **Reordering**: drag sections in the theme editor — they're independent
- **Multiple instances**: add more than one Hero or Product Feature (e.g. one per landing page)
- **Press logos / mission cards / ingredients** are all section blocks — add/remove from the editor, no code changes needed
