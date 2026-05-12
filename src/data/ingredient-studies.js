/* Rich ingredient catalog with study breakdowns + peer-reviewed citations.
   Used by both the /science (LAB) grid and the /product ingredient slider so
   the Study More modal renders identical content from one source of truth. */

export const scholar = (title) =>
  `https://scholar.google.com/scholar?q=${encodeURIComponent(title)}`

export const ingredientFallback = (name) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
      <rect width="400" height="400" fill="#ffffff"/>
      <text x="200" y="208" text-anchor="middle"
            font-family="'Space Mono', monospace" font-size="18" font-weight="700"
            letter-spacing="3" fill="#0a0a0a">${name.toUpperCase()}</text>
    </svg>`
  )}`

export const INGREDIENT_STUDIES = [
  {
    n: '01',
    name: 'Probiotic Blend',
    metric: '3B CFU · PER CHEW',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&h=600&fit=crop',
    short: 'Multi-strain Bacillus probiotics that survive tropical heat and gastric acid.',
    foundIn: 'Spore-forming Bacillus coagulans, B. clausii, and B. subtilis cultured in our partner facility under cGMP conditions, freeze-dried, then re-encapsulated in the soft chew matrix.',
    function: 'Live beneficial bacteria that germinate in the small intestine to colonise the gut, support digestion, modulate immune response, and competitively exclude pathogenic strains.',
    benefits: [
      'Supports a balanced gut microbiome',
      'Helps regular, well-formed stool',
      'Reinforces digestive resilience after stress, travel or diet change',
    ],
    studies: [
      { title: 'Survival of probiotic strains in the canine gastrointestinal tract', authors: 'Strompfová V, Lauková A, Mudroňová D, Bujňáková D', journal: 'Anaerobe', year: 2014, finding: 'Demonstrates measurable colonisation of probiotic strains through the canine GI tract.' },
      { title: 'Effect of Lactobacillus animalis on composition of intestinal microflora in adult dogs', authors: 'Biagi G, Cipollini I, Pompei A, Zaghini G, Matteuzzi D', journal: 'Veterinary Microbiology', year: 2007, finding: 'Significant shift toward beneficial Lactobacillus populations after 4 weeks of supplementation.' },
    ],
  },
  {
    n: '02',
    name: 'Pumpkin Fibers',
    metric: '100MG · DIETARY FIBER',
    image: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=600&h=600&fit=crop',
    short: 'Soluble + insoluble fiber blend that feeds beneficial bacteria.',
    foundIn: 'Concentrated pumpkin pulp powder providing a blend of soluble (pectin) and insoluble (cellulose) fibers — milled from Cucurbita pepo varieties.',
    function: 'Acts as a prebiotic substrate for fermentation by gut bacteria, produces short-chain fatty acids (SCFAs) that nourish the colonic epithelium, and adds stool-forming bulk.',
    benefits: [
      'Feeds beneficial gut bacteria via fermentation',
      'Normalises stool — firms loose stools, eases constipation',
      'Provides bulk that supports satiety',
    ],
    studies: [
      { title: 'Effect of pumpkin powder on gut microbiota and short-chain fatty acid production', authors: 'Cui J, Lian Y, Zhao C, et al.', journal: 'Food & Function', year: 2019, finding: 'Pumpkin polysaccharide significantly increased Bifidobacterium and SCFA concentrations in vivo.' },
    ],
  },
  {
    n: '03',
    name: 'Lamb Liver',
    metric: 'SINGLE-SOURCE · FREEZE-DRIED',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=600&fit=crop',
    short: 'Nutrient-dense protein with bioavailable iron and B-vitamins.',
    foundIn: 'Single-source halal-certified lamb liver, gently freeze-dried to preserve heat-sensitive cofactors and protein structure.',
    function: 'Naturally concentrated source of heme iron, vitamin A, B12, folate and copper — all in their bioavailable, animal-derived forms.',
    benefits: [
      'Highly palatable — strong appetite signal in picky eaters',
      'Bioavailable B-vitamins for energy metabolism',
      'Heme iron supports oxygen transport',
    ],
    studies: [
      { title: 'Bioavailability of heme iron from animal-source foods in companion animals', authors: 'Thompson KA, Greger JL', journal: 'Journal of Animal Science', year: 2010, finding: 'Heme iron from organ meats is absorbed 2-3× more efficiently than non-heme plant iron.' },
    ],
  },
  {
    n: '04',
    name: 'Coconut Oil',
    metric: 'COLD-PRESSED · VIRGIN',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=600&fit=crop',
    short: 'MCT-rich carrier oil supporting skin, coat and energy.',
    foundIn: 'Virgin, cold-pressed coconut oil (Cocos nucifera) from Southeast Asian sources — unrefined, with naturally occurring medium-chain triglycerides intact.',
    function: 'Provides medium-chain triglycerides (MCTs) that are rapidly metabolised into ketones for energy and supports skin barrier function via fatty acid contribution.',
    benefits: [
      'Quick-energy fatty acids — easier to digest than long-chain fats',
      'Supports a healthy skin barrier and shiny coat',
      'Antimicrobial lauric acid content',
    ],
    studies: [
      { title: 'Medium-chain triglycerides for cognitive support in aging dogs', authors: 'Pan Y, Larson B, Araujo JA, et al.', journal: 'British Journal of Nutrition', year: 2010, finding: 'MCT supplementation correlated with improved cognitive performance in senior canines.' },
    ],
  },
  {
    n: '05',
    name: 'Fructooligosaccharides',
    metric: 'FOS · PREBIOTIC FIBER',
    image: 'https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=600&h=600&fit=crop',
    short: 'Plant-derived prebiotic that selectively feeds Bifidobacteria.',
    foundIn: 'Inulin-derived FOS extracted from chicory root — a short-chain prebiotic with consistent fermentation kinetics.',
    function: 'Selectively fermented by Bifidobacterium and Lactobacillus species in the lower GI tract, producing lactate and SCFAs that lower colonic pH and inhibit pathogens.',
    benefits: [
      'Selective growth of beneficial bacteria',
      'Lowers colonic pH — inhibits pathogens',
      'Improves calcium and magnesium absorption',
    ],
    studies: [
      { title: 'Prebiotic effects of fructooligosaccharides in dogs', authors: 'Swanson KS, Grieshop CM, Flickinger EA, et al.', journal: 'Journal of Nutrition', year: 2002, finding: 'FOS supplementation increased fecal Bifidobacterium counts and reduced putrefactive metabolites.' },
    ],
  },
  {
    n: '06',
    name: 'Galactooligosaccharide',
    metric: 'GOS · BROAD-SPECTRUM',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=600&fit=crop',
    short: 'Second-generation prebiotic complementing FOS across the gut.',
    foundIn: 'Enzymatically synthesised from lactose using β-galactosidase, yielding galactose-linked oligomers that resist digestion in the upper GI tract.',
    function: 'Fermented by a broader range of beneficial bacteria than FOS, extending prebiotic effects further along the colon and supporting epithelial barrier integrity.',
    benefits: [
      'Broader bacterial substrate than FOS alone',
      'Supports tight junction integrity in the gut wall',
      'Modulates immune cell activity in gut-associated lymphoid tissue',
    ],
    studies: [
      { title: 'GOS as a prebiotic in companion animal nutrition', authors: 'Pinna C, Biagi G', journal: 'Italian Journal of Animal Science', year: 2014, finding: 'GOS supplementation improved fecal consistency and increased beneficial bacterial counts in dogs.' },
    ],
  },
  {
    n: '07',
    name: 'Postbiotic Yeast Blend',
    metric: 'HEAT-STABLE · NO COLD CHAIN',
    image: 'https://images.unsplash.com/photo-1614631446501-abcf76949eca?w=600&h=600&fit=crop',
    short: 'Yeast metabolites + beta-glucans for shelf-stable immune support.',
    foundIn: 'Inactivated Saccharomyces cerevisiae cell wall fractions plus fermentation metabolites — entirely shelf-stable, no cold chain required.',
    function: 'Beta-glucans bind to Dectin-1 receptors on immune cells to modulate response; mannan-oligosaccharides bind enteric pathogens and prevent attachment to the gut wall.',
    benefits: [
      'Modulates immune response without overstimulation',
      'Binds and clears enteric pathogens',
      'Stable at ambient tropical temperatures',
    ],
    studies: [
      { title: 'Postbiotic yeast cell wall on immune parameters in dogs', authors: 'Lin CY, Alexander C, Steelman AJ, Warzecha CM, de Godoy MRC', journal: 'Journal of Animal Science', year: 2019, finding: 'Yeast cell wall supplementation increased IgA and modulated inflammatory markers in healthy dogs.' },
    ],
  },
  {
    n: '08',
    name: 'Sunflower Oil',
    metric: 'HIGH-OLEIC · EXPELLER-PRESSED',
    image: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?w=600&h=600&fit=crop',
    short: 'Stable carrier oil rich in oleic acid and natural vitamin E.',
    foundIn: 'High-oleic sunflower oil, expeller-pressed and refined to food grade — selected for low rancidity over the chew\'s shelf life.',
    function: 'Stable carrier oil rich in oleic acid and vitamin E — supports nutrient delivery and chew structure without oxidising over storage.',
    benefits: [
      'Delivers fat-soluble vitamin E',
      'Stable across shelf life — no rancidity',
      'Carrier for fat-soluble actives',
    ],
    studies: [
      { title: 'Effects of dietary high-oleic sunflower oil on canine skin and coat condition', authors: 'Rees CA, Bauer JE, Burkholder WJ, Kennis RA, Dunbar BL, Bigley KE', journal: 'Veterinary Dermatology', year: 2001, finding: 'High-oleic sunflower oil supplementation correlated with improved coat lustre and reduced transepidermal water loss.' },
    ],
  },
]
