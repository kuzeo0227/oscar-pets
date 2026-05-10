// Contextually-relevant Unsplash imagery for hero ingredient rotation.
// Every URL uses ?w=300&h=300&fit=crop for consistent square crops.

export const ingredients = [
  {
    id: "probiotic-blend",
    name: "Probiotic Blend",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=300&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=300&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=300&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=300&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1614631446501-abcf76949eca?w=300&h=300&fit=crop",
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
    image: "https://images.unsplash.com/photo-1543257580-7269da773bf5?w=300&h=300&fit=crop",
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
