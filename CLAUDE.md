# CLAUDE.md — Oscar Pets Website

Premium dog probiotic chew storefront (Malaysia). **Live:** https://oscar-pets.vercel.app

---

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.
- Check `public/assets/` and any design-system docs before designing. If real assets exist, use them — never substitute placeholders for available brand assets.

## Tech Stack (do not swap without being asked)
- **React 19 + Vite 8** (ESM, JSX). Pure client-side SPA, no SSR.
- **Tailwind CSS v4** via `@tailwindcss/vite` + custom CSS tokens in `src/index.css`.
- **Routing:** `react-router-dom` v7 · **Animation:** `framer-motion` v12 · **Icons:** `lucide-react`
- **State:** React Context (`CartContext`)
- This is NOT a single-file / Tailwind-CDN project. New UI goes in `src/components/` or `src/pages/` as JSX components, not `index.html`.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color **exactly**. Do not improve or add to the design. Swap in real Oscar assets where available, otherwise generic placeholder content.
- If no reference: design from scratch with high craft (see guardrails), staying inside the brand tokens below.
- Verify your output against the reference, fix mismatches, re-verify. At least 2 comparison rounds. Stop only when no visible differences remain or the user says so.

## Local Preview & Verification
- **Dev server:** `npm run dev` → http://localhost:5173 (Vite). Reuse a running instance — don't start a second.
- Prefer the **Claude Preview tool** (`preview_start` with the `oscar-pets` launch config, then `preview_eval` / `preview_screenshot` / `preview_console_logs`) to inspect rendered DOM, computed styles, and console errors.
- When comparing to a reference, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px". Check spacing/padding, font size/weight/line-height, exact hex colors, alignment, border-radius, shadows, image sizing.
- Note: the preview environment sometimes reports `window.innerWidth` ≈ 0/1, which collapses `vw`/`calc()`-based widths. When that happens, verify the live deploy instead of trusting on-screen dims.

## Deployment Rule (MANDATORY after every code change)
GitHub auto-deploy is **NOT** connected, so pushing alone does nothing to the live site. Run all four, in order:
```
git add .
git commit -m "..."
git push origin main
npx vercel --prod --yes      # ← this is what actually publishes oscar-pets.vercel.app
```
- The task is not complete until `npx vercel --prod --yes` succeeds and the alias updates to oscar-pets.vercel.app.
- Use the **live site** as the primary preview — never report a localhost URL as the deliverable.
- On Windows, if the chained `git push && npx vercel` fails under the Bash tool (exit 128), run the same commands via PowerShell.

---

## Brand Design System (current / live)

### Colors — monochrome only, NO accent color
| Token | Hex | Use |
|---|---|---|
| `--color-ink` | `#0a0a0a` | Primary black: text, buttons, dark sections |
| `--color-ink-soft` | `#1a1a18` | Ink hover |
| `--color-paper` | `#ffffff` | Background |
| `--color-rule` | `#e6e5e0` | Hairlines, borders, dividers |
| `--color-mute` | `#6b6b6b` | Secondary text |
| `--color-mute-soft` | `#9a9a96` | Tertiary text, captions |
| `--color-go-deep` | `#2a2a2a` | CTA hover |
| (image bg) | `#f6f5f1` | Image container background only |

Allowed colors are exactly the set above. Do not introduce new brand colors (product packaging navy/orange are product-photo-only, never UI tokens).

### Typography
- **Montserrat** — body, paragraphs, button labels (`--font-display` / `--font-body`)
- **Libre Baskerville** — H1/H2/H3, always with `<em className="italic">` on the emphasized word (`--font-serif`)
- **Space Mono** — eyebrows, CTAs, metrics, ALL UPPERCASE LABELS (`--font-mono`)
- `.eyebrow` = Space Mono 11px, `0.18em` tracking, uppercase, weight 400

### Layout & radius
- `.section-container` — `max-width: 1814px`, `padding-inline: clamp(34px, 5vw, 101px)`. Use for every contained section.
- Sticky `NavHeader` is **96px** tall; sticky elements sit at `top: 96`.
- **Border radius: 0 by default** (sharp brutalist). The only `16px` exceptions are specific image containers (StudyStats stat photos, BenefitsDeck images, IngredientsScroll card images, homepage EditorialTwoCol cards, the rounded ProductCTA banner). Never round buttons, accordions, or other cards.
- Signature easing: `cubic-bezier(0.22, 1, 0.36, 1)`.

### Reusable building blocks
- `HorizontalDeck` — draggable momentum slider (friction 0.92) with 2px synced scrollbar + drag-click suppression. Images inside need `draggable={false}` + `pointerEvents: 'none'`.
- `IngredientStudyModal` — fullscreen ingredient detail; data from `src/data/ingredient-studies.js` (single source of truth).

---

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Stay within the Oscar tokens above.
- **Shadows:** Avoid flat `shadow-md`. The brand is near shadow-free; if depth is needed, use layered, low-opacity tinted shadows.
- **Typography:** Never use one font for both headings and body — pair Libre Baskerville (display) with Montserrat (body). Tight tracking on large headings, line-height ~1.6–1.7 on body.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use the signature easing, calm — never bouncy/spring.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states.
- **Images:** Use `object-cover`; add gradient scrims where text overlays a photo for legibility.
- **Spacing & depth:** Intentional, consistent spacing tokens. Maintain a clear layering system (base → elevated → floating), not everything on one z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference.
- Do not "improve" a reference design — match it.
- Do not stop after one verification pass — do at least 2 comparison rounds.
- Do not use `transition-all`.
- Do not use default Tailwind blue/indigo, or any color outside the Oscar token set.
- Do not consider a task done until the full deploy sequence (`git push` + `npx vercel --prod --yes`) has succeeded.
