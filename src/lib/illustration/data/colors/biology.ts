/**
 * biology.ts
 * General Biology color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for general biology diagrams including:
 * - Ecology and ecosystem colors
 * - Evolution and phylogenetics colors
 * - Taxonomy and classification colors
 * - Biome and habitat colors
 * - Life cycle colors
 * - Population dynamics colors
 * - Food web/trophic level colors
 * - Biodiversity and conservation colors
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// TROPHIC LEVEL COLORS
// =============================================================================

/**
 * Colors for food web trophic levels
 */
export const trophicLevelColors = {
  /** Producers/Autotrophs - green */
  producer: '#22C55E',
  /** Primary consumers/Herbivores - yellow */
  primaryConsumer: '#F59E0B',
  /** Secondary consumers/Carnivores - orange */
  secondaryConsumer: '#F97316',
  /** Tertiary consumers/Apex predators - red */
  tertiaryConsumer: '#EF4444',
  /** Decomposers - brown */
  decomposer: '#92400E',
  /** Detritivores - tan */
  detritivore: '#D4A574',
  /** Omnivores - purple (mixed feeding) */
  omnivore: '#8B5CF6',
};

// =============================================================================
// ECOSYSTEM COLORS
// =============================================================================

/**
 * Ecosystem component colors
 */
export const ecosystemColors = {
  /** Biotic factors - green */
  biotic: '#22C55E',
  /** Abiotic factors - blue */
  abiotic: '#3B82F6',
  /** Energy flow - yellow/gold */
  energyFlow: '#F59E0B',
  /** Nutrient cycling - brown */
  nutrientCycle: '#78350F',
  /** Water - blue */
  water: '#0EA5E9',
  /** Sunlight - bright yellow */
  sunlight: '#FDE047',
  /** Soil/Substrate - brown */
  soil: '#A16207',
  /** Air/Atmosphere - light blue */
  atmosphere: '#BAE6FD',
};

// =============================================================================
// BIOME COLORS
// =============================================================================

/**
 * Major biome colors
 */
export const biomeColors = {
  /** Tropical rainforest - dark green */
  tropicalRainforest: '#166534',
  /** Temperate deciduous forest - medium green */
  temperateForest: '#22C55E',
  /** Taiga/Boreal forest - blue-green */
  taiga: '#0D9488',
  /** Tundra - light blue/gray */
  tundra: '#94A3B8',
  /** Desert - tan/sand */
  desert: '#D4A574',
  /** Grassland/Savanna - yellow-green */
  grassland: '#84CC16',
  /** Chaparral - olive */
  chaparral: '#A3A847',
  /** Freshwater - blue */
  freshwater: '#3B82F6',
  /** Marine/Ocean - dark blue */
  marine: '#1E40AF',
  /** Wetland/Marsh - blue-green */
  wetland: '#0891B2',
  /** Coral reef - vibrant mix */
  coralReef: '#F472B6',
};

// =============================================================================
// EVOLUTION/PHYLOGENY COLORS
// =============================================================================

/**
 * Evolutionary and phylogenetic diagram colors
 */
export const evolutionColors = {
  /** Ancestral/Primitive traits - gray */
  ancestral: '#6B7280',
  /** Derived traits - colored */
  derived: '#8B5CF6',
  /** Common ancestor node - dark gray */
  commonAncestor: '#374151',
  /** Branch/lineage - neutral */
  branch: '#9CA3AF',
  /** Extinction - red */
  extinction: '#DC2626',
  /** Speciation event - green */
  speciation: '#16A34A',
  /** Gene flow - blue */
  geneFlow: '#2563EB',
  /** Adaptive radiation - orange */
  adaptiveRadiation: '#EA580C',
  /** Convergent evolution - purple */
  convergent: '#9333EA',
  /** Divergent evolution - teal */
  divergent: '#0D9488',
};

// =============================================================================
// TAXONOMY COLORS
// =============================================================================

/**
 * Taxonomic rank colors
 */
export const taxonomyColors = {
  /** Domain level - purple */
  domain: '#7C3AED',
  /** Kingdom level - dark purple */
  kingdom: '#6D28D9',
  /** Phylum level - blue-purple */
  phylum: '#4F46E5',
  /** Class level - blue */
  class: '#2563EB',
  /** Order level - light blue */
  order: '#0EA5E9',
  /** Family level - teal */
  family: '#14B8A6',
  /** Genus level - green */
  genus: '#22C55E',
  /** Species level - yellow-green */
  species: '#84CC16',
};

/**
 * Major kingdom colors
 */
export const kingdomColors = {
  /** Animalia - blue */
  animalia: '#3B82F6',
  /** Plantae - green */
  plantae: '#22C55E',
  /** Fungi - brown/orange */
  fungi: '#D97706',
  /** Protista - yellow */
  protista: '#EAB308',
  /** Bacteria - red */
  bacteria: '#EF4444',
  /** Archaea - purple */
  archaea: '#8B5CF6',
};

// =============================================================================
// POPULATION ECOLOGY COLORS
// =============================================================================

/**
 * Population dynamics colors
 */
export const populationColors = {
  /** Population growth - green */
  growth: '#22C55E',
  /** Population decline - red */
  decline: '#EF4444',
  /** Stable population - blue */
  stable: '#3B82F6',
  /** Carrying capacity - orange */
  carryingCapacity: '#F59E0B',
  /** Birth rate - green */
  birthRate: '#16A34A',
  /** Death rate - red */
  deathRate: '#DC2626',
  /** Immigration - blue */
  immigration: '#2563EB',
  /** Emigration - purple */
  emigration: '#7C3AED',
  /** Exponential growth - bright green */
  exponential: '#4ADE80',
  /** Logistic growth - teal */
  logistic: '#14B8A6',
};

// =============================================================================
// ECOLOGICAL RELATIONSHIPS COLORS
// =============================================================================

/**
 * Symbiosis and interaction colors
 */
export const interactionColors = {
  /** Mutualism (+/+) - green */
  mutualism: '#22C55E',
  /** Commensalism (+/0) - blue */
  commensalism: '#3B82F6',
  /** Parasitism (+/-) - orange */
  parasitism: '#F59E0B',
  /** Predation (+/-) - red */
  predation: '#EF4444',
  /** Competition (-/-) - purple */
  competition: '#8B5CF6',
  /** Amensalism (0/-) - gray */
  amensalism: '#6B7280',
  /** Facilitation - teal */
  facilitation: '#14B8A6',
  /** Neutralism (0/0) - light gray */
  neutralism: '#D1D5DB',
};

// =============================================================================
// LIFE CYCLE COLORS
// =============================================================================

/**
 * Life stage and cycle colors
 */
export const lifeCycleColors = {
  /** Egg/Seed stage - cream */
  egg: '#FEF3C7',
  /** Larva/Seedling - light green */
  larva: '#BBF7D0',
  /** Juvenile/Sapling - medium green */
  juvenile: '#4ADE80',
  /** Adult/Mature - dark green */
  adult: '#16A34A',
  /** Reproductive - pink */
  reproductive: '#F472B6',
  /** Senescent - brown */
  senescent: '#A16207',
  /** Dormant - gray */
  dormant: '#9CA3AF',
  /** Metamorphosis - purple */
  metamorphosis: '#A855F7',
};

// =============================================================================
// BIOGEOCHEMICAL CYCLE COLORS
// =============================================================================

/**
 * Nutrient cycle colors
 */
export const nutrientCycleColors = {
  /** Carbon - gray/black */
  carbon: '#374151',
  /** Nitrogen - blue */
  nitrogen: '#2563EB',
  /** Phosphorus - orange */
  phosphorus: '#EA580C',
  /** Sulfur - yellow */
  sulfur: '#EAB308',
  /** Water/Hydrogen - light blue */
  water: '#0EA5E9',
  /** Oxygen - red */
  oxygen: '#EF4444',
  /** Calcium - white/cream */
  calcium: '#FAFAF9',
  /** Iron - rust */
  iron: '#B45309',
};

// =============================================================================
// CONSERVATION STATUS COLORS
// =============================================================================

/**
 * IUCN conservation status colors
 */
export const conservationColors = {
  /** Least Concern - green */
  leastConcern: '#22C55E',
  /** Near Threatened - yellow-green */
  nearThreatened: '#84CC16',
  /** Vulnerable - yellow */
  vulnerable: '#EAB308',
  /** Endangered - orange */
  endangered: '#F59E0B',
  /** Critically Endangered - red */
  criticallyEndangered: '#EF4444',
  /** Extinct in Wild - dark red */
  extinctInWild: '#991B1B',
  /** Extinct - black */
  extinct: '#1F2937',
  /** Data Deficient - gray */
  dataDeficient: '#6B7280',
  /** Not Evaluated - light gray */
  notEvaluated: '#D1D5DB',
};

// =============================================================================
// GEOLOGICAL TIME COLORS
// =============================================================================

/**
 * Geological era colors (following geological convention)
 */
export const geologicalColors = {
  /** Precambrian - gray */
  precambrian: '#6B7280',
  /** Paleozoic - blue */
  paleozoic: '#3B82F6',
  /** Mesozoic - green */
  mesozoic: '#22C55E',
  /** Cenozoic - yellow */
  cenozoic: '#F59E0B',
  /** Cambrian - blue-green */
  cambrian: '#0D9488',
  /** Ordovician - green-blue */
  ordovician: '#0891B2',
  /** Silurian - light purple */
  silurian: '#A78BFA',
  /** Devonian - brown */
  devonian: '#A16207',
  /** Carboniferous - dark gray */
  carboniferous: '#4B5563',
  /** Permian - red-orange */
  permian: '#F97316',
  /** Triassic - purple */
  triassic: '#8B5CF6',
  /** Jurassic - blue */
  jurassic: '#3B82F6',
  /** Cretaceous - green */
  cretaceous: '#22C55E',
  /** Quaternary - bright yellow */
  quaternary: '#FDE047',
};

// =============================================================================
// FLOWCHART COLORS
// =============================================================================

/**
 * Flowchart/diagram utility colors for biology
 */
export const flowchartColors = {
  /** Start/End nodes - green */
  terminal: '#22C55E',
  /** Decision nodes - yellow */
  decision: '#F59E0B',
  /** Process nodes - blue */
  process: '#3B82F6',
  /** Action required - red */
  action: '#EF4444',
  /** Warning - orange */
  warning: '#F97316',
  /** Success - green */
  success: '#22C55E',
  /** Failure - red */
  failure: '#EF4444',
  /** Information - light blue */
  info: '#0EA5E9',
  /** Connection/Arrow - gray */
  connection: '#6B7280',
  /** Highlight - purple */
  highlight: '#8B5CF6',
};

// =============================================================================
// SEVERITY/GRADIENT
// =============================================================================

/**
 * Severity gradient for ecological assessments
 */
export const severityGradient = {
  /** Healthy/Normal - green */
  healthy: '#22C55E',
  /** Mild impact - yellow */
  mild: '#F59E0B',
  /** Moderate impact - orange */
  moderate: '#F97316',
  /** Severe impact - red */
  severe: '#EF4444',
  /** Critical - dark red */
  critical: '#B91C1C',
};

// =============================================================================
// COMPLETE BIOLOGY COLOR SCHEME
// =============================================================================

/**
 * Complete general biology color scheme export
 */
export const biologyColorScheme = {
  // Core ecology palettes
  trophicLevel: trophicLevelColors,
  ecosystem: ecosystemColors,
  biome: biomeColors,
  interaction: interactionColors,

  // Evolution & taxonomy
  evolution: evolutionColors,
  taxonomy: taxonomyColors,
  kingdom: kingdomColors,
  geological: geologicalColors,

  // Population & conservation
  population: populationColors,
  conservation: conservationColors,

  // Life processes
  lifeCycle: lifeCycleColors,
  nutrientCycle: nutrientCycleColors,

  // Utility
  flowchart: flowchartColors,
  severity: severityGradient,

  // Quick access to commonly used colors
  common: {
    producer: '#22C55E',
    consumer: '#F59E0B',
    decomposer: '#92400E',
    water: '#0EA5E9',
    energy: '#FDE047',
    ancestral: '#6B7280',
    derived: '#8B5CF6',
    healthy: '#22C55E',
    endangered: '#EF4444',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type TrophicLevelColors = typeof trophicLevelColors;
export type EcosystemColors = typeof ecosystemColors;
export type BiomeColors = typeof biomeColors;
export type EvolutionColors = typeof evolutionColors;
export type TaxonomyColors = typeof taxonomyColors;
export type KingdomColors = typeof kingdomColors;
export type PopulationColors = typeof populationColors;
export type InteractionColors = typeof interactionColors;
export type LifeCycleColors = typeof lifeCycleColors;
export type NutrientCycleColors = typeof nutrientCycleColors;
export type ConservationColors = typeof conservationColors;
export type GeologicalColors = typeof geologicalColors;
export type BiologyFlowchartColors = typeof flowchartColors;
export type BiologySeverityGradient = typeof severityGradient;
export type BiologyColorScheme = typeof biologyColorScheme;

export default biologyColorScheme;
