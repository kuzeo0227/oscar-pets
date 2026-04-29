/**
 * Product Detail Page — single source of truth for all PDP content.
 * Edit copy / images / reviews here. Section components import from this file.
 */

export const PRODUCT = {
  slug:           'probiotic-blend',
  name:           'Probiotic Blend Chewables',
  subtitle:       'Lamb Liver & Pumpkin Mix — Vet-Reviewed Gut Health for Dogs',
  oneTimePrice:   89,                              // RM
  subscribePrice: 71,                              // RM (~20% off)
  rating:         4.9,
  reviewCount:    2847,
  badge:          'Bestseller',
  thumbs: [
    'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=300&q=80',
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&q=80',
    'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&q=80',
    'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=300&q=80',
  ],
}

export const VET = {
  initials: 'DR',
  name:     'Dr. Tan Wei Lin',
  title:    'DVM · Veterinary Consultant to Oscar Pets',
  quote:    "An excellent tool to help balance your dog's gut for healthy digestion and skin comfort — and a smart fit for the Malaysian climate.",
  stats: [
    { n: '3B',   t: 'CFU per chew from spore-forming Bacillus strains' },
    { n: '29',   t: 'Day clinical study confirming formula effectiveness' },
    { n: '89%',  t: 'Of customers seeing results after 90 days of use' },
    { n: '4.9★', t: 'Average rating from verified customers nationwide' },
  ],
}

export const SIZES = [
  { id: 'small',  label: 'Small',  weight: 'Under 10 kg' },
  { id: 'medium', label: 'Medium', weight: '10 – 25 kg'  },
  { id: 'large',  label: 'Large',  weight: 'Over 25 kg'  },
]

export const DOSING = [
  { size: 'Small',  weight: 'Under 10 kg', dots: 1, text: '1 soft chew'  },
  { size: 'Medium', weight: '10 – 25 kg',   dots: 2, text: '2 soft chews' },
  { size: 'Large',  weight: 'Over 25 kg',   dots: 3, text: '3 soft chews' },
]

export const INGREDIENTS = [
  {
    name:     'Probiotic Blend',
    dose:     '3 Billion CFU',
    img:      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80',
    short:    'Spore-forming probiotics that support digestion, gut balance, and immunity.',
    benefits: ['Maintains healthy balance of gut flora', 'Supports bowel regularity', 'Strengthens immune response'],
  },
  {
    name:     'GOS (Galactooligosaccharide)',
    dose:     '100 mg · Prebiotic',
    img:      'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=500&q=80',
    short:    'Prebiotic that feeds beneficial bacteria and supports digestive regularity.',
    benefits: ['Encourages beneficial bacteria growth', 'Supports gut barrier integrity', 'Helps with seasonal stress'],
  },
  {
    name:     'FOS (Fructooligosaccharide)',
    dose:     '100 mg · Prebiotic',
    img:      'https://images.unsplash.com/photo-1559181567-c3190ca9d222?w=500&q=80',
    short:    'Prebiotic fiber that supports digestion, postbiotic production, and immunity.',
    benefits: ['Promotes healthy gut flora', 'Improves stool consistency', 'Supports immune function'],
  },
  {
    name:     'Postbiotic Yeast Blend',
    dose:     '75 mg · Synergistic',
    img:      'https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?w=500&q=80',
    short:    'Triple-strain postbiotic blend for gut balance and immune support.',
    benefits: ['Supports microflora balance', 'Promotes immune response', 'Maintains digestive health'],
  },
]

export const QUALITY_ITEMS = [
  { title: 'Clinically Studied¹',              desc: 'Backed by a clinical study to demonstrate effectiveness.' },
  { title: 'Reviewed by Vets',                 desc: 'Formulated with nutritionists and registered DVM consultants.' },
  { title: 'Third-Party Tested',               desc: 'Rigorously tested for quality, potency, and CFU survival.' },
  { title: 'Halal Compliant & DVS Registered', desc: "Certified halal, no porcine inputs. Registered with Malaysia's DVS." },
]

export const PRODUCT_BENEFITS = [
  {
    title: 'Gut Health',
    desc:  'A powerful blend of probiotics, prebiotics, and postbiotics helps maintain balanced gut flora, support digestive function, and keep stools firm and healthy.',
    img:   'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&q=80',
  },
  {
    title: 'Intermittent Itchiness',
    desc:  'Supports normal yeast levels and skin health, helping to reduce occasional itching, paw licking, and discomfort.',
    img:   'https://images.unsplash.com/photo-1588269845464-8993565cac3b?w=200&q=80',
  },
  {
    title: 'Skin & Coat Comfort',
    desc:  'Promotes a healthy skin barrier and supports the coat from within, so your pup looks as good as they feel.',
    img:   'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=200&q=80',
  },
  {
    title: 'Seasonal Allergies',
    desc:  'A healthy gut supports a balanced immune response, which may help with seasonal sensitivities like head shaking and paw chewing.',
    img:   'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&q=80',
  },
  {
    title: 'Immune System',
    desc:  '80% of the immune system lives in the gut. Probiotics work to strengthen natural defenses and keep your pup feeling their best.',
    img:   'https://images.unsplash.com/photo-1546238232-20216dec9f72?w=200&q=80',
  },
]

export const TIMELINE_MONTHS = [
  { n: '01', t: 'Good Bacteria Get to Work',     d: 'Probiotics, prebiotics, and postbiotics start supporting healthy gut flora and normal digestion. Early changes are subtle but real.' },
  { n: '02', t: 'More Comfortable Digestion',    d: 'Healthier stool consistency, less occasional bloating, and better immune balance. Your dog seems more comfortable day to day.' },
  { n: '03', t: 'See Real Results',              d: 'Healthy yeast levels and a stronger gut mean less paw licking, less itching, and a visibly happier, healthier dog.' },
]

export const REVIEWS = [
  { name: 'Sarah T.', date: 'March 2026',    title: 'Life-changing for my Shih Tzu!',  body: 'After 6 weeks her digestion is noticeably better. Less gas, firmer stools, and she absolutely loves the taste — finally a chew she actually wants.' },
  { name: 'Reza M.',  date: 'February 2026', title: 'Vet recommended, dog approved!',   body: 'Finally a Malaysian brand that delivers. Science-backed, my vet approved it. The ambient-stable claim is huge for our climate. Will repurchase.' },
  { name: 'Li Ying',  date: 'January 2026',  title: 'Worth the premium positioning.',   body: 'Took about 2 weeks to see real changes — coat is shinier and she stopped scratching her ears. Subscription pricing makes it sustainable.' },
]

export const RATING_DIST = [
  { stars: 5, pct: 91 },
  { stars: 4, pct: 6  },
  { stars: 3, pct: 2  },
  { stars: 2, pct: 1  },
  { stars: 1, pct: 0  },
]

export const FAQS = [
  { q: 'What do probiotics do for dogs?',                       a: 'Probiotics are live strains of beneficial bacteria that help dogs maintain normal digestive function and support overall gut and immune health. Daily probiotic supplements may normalise bowel movements, support occasional loose stools, and even help with seasonal allergy discomfort.' },
  { q: 'How long does it take for probiotics to work in dogs?', a: 'It depends on age, breed, and overall health. We generally recommend 60–90 days of consistent use. In our internal survey, 89% of pet parents saw expected results after 3 months of daily use.' },
  { q: 'Can puppies have these probiotic chews?',               a: 'Yes — these chews are suitable for puppies 12 weeks and older, and dogs of all sizes. Just follow the size-based dosing on the label.' },
  { q: 'Do they need refrigeration?',                            a: "No. We use spore-forming Bacillus strains that are shelf-stable in tropical climates — that's why this is Malaysia's first premium chewable. No fridge, no fuss." },
  { q: 'Is this halal compliant?',                              a: 'Yes. Oscar Pets is halal-compliant and DVS registered. We do not use any porcine-derived ingredients.' },
  { q: 'Can I cancel my subscription?',                          a: "Anytime. You're in full control — pause, modify, or cancel from your account. No phone calls required." },
]
