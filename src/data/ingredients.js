// Reliable seeded placeholder photos — every URL always resolves.
// Each ingredient gets a deterministic image; swap to real photography later.
const placeholder = (seed) => `https://picsum.photos/seed/${seed}/300/300`;

export const ingredients = [
  {
    id: "probiotic-blend",
    name: "Probiotic Blend",
    image: placeholder("oscar-probiotic"),
    foundIn: "Lactobacillus and Bifidobacterium strains cultured in our partner facility under cGMP conditions.",
    function:
      "Live beneficial bacteria that colonize the gut to support digestion, nutrient uptake and a balanced microbiome.",
    benefits: [
      "Supports a balanced gut microbiome",
      "Helps regular, well-formed stool",
      "Reinforces digestive resilience after stress, travel or diet change",
    ],
    metric: "3B CFU",
    metricLabel: "per chew",
  },
  {
    id: "pumpkin-fibers",
    name: "Pumpkin Fibers",
    image: placeholder("oscar-pumpkin"),
    foundIn: "Whole pumpkin (Cucurbita pepo) milled and dried into a soluble + insoluble fiber blend.",
    function:
      "Soluble fiber feeds beneficial bacteria; insoluble fiber adds bulk to support normal motility.",
    benefits: [
      "Adds gentle bulk to stool",
      "Soothes occasional digestive upset",
      "Supplies prebiotic fuel for probiotic strains",
    ],
    metric: "100mg",
    metricLabel: "fiber per chew",
  },
  {
    id: "lamb-liver",
    name: "Lamb Liver",
    image: placeholder("oscar-lamb-liver"),
    foundIn: "Free-range New Zealand lamb liver, freeze-dried to preserve native nutrients.",
    function:
      "Nutrient-dense protein source rich in B-vitamins, iron and natural taurine — and a flavor dogs reliably accept.",
    benefits: [
      "Highly palatable, drives consistent intake",
      "Supplies bioavailable iron and B12",
      "No synthetic flavoring required",
    ],
    metric: "Single-source",
    metricLabel: "freeze-dried",
  },
  {
    id: "coconut-oil",
    name: "Coconut Oil",
    image: placeholder("oscar-coconut"),
    foundIn: "Cold-pressed virgin coconut oil from Southeast Asian smallholder cooperatives.",
    function:
      "Source of medium-chain triglycerides (MCTs) — an efficient energy substrate the body can metabolize quickly.",
    benefits: [
      "Supports skin and coat condition",
      "Provides quick-access energy via MCTs",
      "Acts as a natural carrier for fat-soluble nutrients",
    ],
    metric: "Cold-pressed",
    metricLabel: "virgin grade",
  },
  {
    id: "fos",
    name: "Fructooligosaccharides",
    short: "FOS",
    image: placeholder("oscar-fos"),
    foundIn: "Plant-derived short-chain fructans isolated from chicory root.",
    function:
      "A prebiotic carbohydrate that beneficial gut bacteria selectively ferment into short-chain fatty acids.",
    benefits: [
      "Selectively feeds Bifidobacteria",
      "Supports short-chain fatty acid production",
      "Reinforces intestinal barrier function",
    ],
    metric: "Prebiotic",
    metricLabel: "selective fermentation",
  },
  {
    id: "gos",
    name: "Galactooligosaccharide",
    short: "GOS",
    image: placeholder("oscar-gos"),
    foundIn: "Enzymatically derived from lactose under controlled lab conditions.",
    function:
      "A second-generation prebiotic that complements FOS by feeding a broader spectrum of beneficial bacteria.",
    benefits: [
      "Broad-spectrum prebiotic action",
      "Supports immune-modulating gut flora",
      "Synergizes with FOS for full-tract coverage",
    ],
    metric: "Prebiotic",
    metricLabel: "broad-spectrum",
  },
  {
    id: "postbiotic-yeast",
    name: "Postbiotic Yeast Blend",
    short: "Postbiotic Yeast",
    image: placeholder("oscar-postbiotic"),
    foundIn: "Saccharomyces cerevisiae fermentation product, heat-inactivated and standardized.",
    function:
      "Bioactive metabolites and cell-wall components that support immune signaling without requiring live cultures.",
    benefits: [
      "Shelf-stable immune support",
      "Beta-glucans for immune modulation",
      "Works alongside live probiotics",
    ],
    metric: "Heat-stable",
    metricLabel: "no refrigeration",
  },
  {
    id: "sunflower-oil",
    name: "Sunflower Oil",
    image: placeholder("oscar-sunflower"),
    foundIn: "High-oleic sunflower oil, expeller-pressed and refined to food grade.",
    function:
      "Stable carrier oil rich in oleic acid and vitamin E — supports nutrient delivery and chew structure.",
    benefits: [
      "Delivers fat-soluble vitamin E",
      "Stable across shelf life — no rancidity",
      "Carrier for fat-soluble actives",
    ],
    metric: "High-oleic",
    metricLabel: "expeller-pressed",
  },
];

export const heroRotationA = ["probiotic-blend", "pumpkin-fibers", "lamb-liver", "coconut-oil"];
export const heroRotationB = ["fos", "gos", "postbiotic-yeast", "sunflower-oil"];

export const ingredientById = Object.fromEntries(ingredients.map((i) => [i.id, i]));
