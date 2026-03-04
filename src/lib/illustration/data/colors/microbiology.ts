/**
 * microbiology.ts
 * Microbiology color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for microbiology diagrams including:
 * - Gram stain colors (positive/negative)
 * - Bacterial morphology colors
 * - Viral structure colors
 * - Fungal colors
 * - Parasitology colors
 * - Laboratory technique colors
 * - Culture media colors
 * - Antimicrobial susceptibility colors
 * - Biosafety level colors
 * - Staining technique colors
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// GRAM STAIN COLORS
// =============================================================================

/**
 * Gram stain result colors (standard microbiological convention)
 */
export const gramStainColors = {
  /** Gram positive - purple/violet (crystal violet retained) */
  gramPositive: '#7C3AED',
  /** Gram negative - pink/red (safranin counterstain) */
  gramNegative: '#EC4899',
  /** Gram variable - mixed purple/pink */
  gramVariable: '#A78BFA',
  /** Crystal violet stain */
  crystalViolet: '#5B21B6',
  /** Iodine mordant */
  iodine: '#92400E',
  /** Safranin counterstain */
  safranin: '#F43F5E',
  /** Decolorizer (alcohol/acetone) */
  decolorizer: '#E0E7FF',
};

// =============================================================================
// BACTERIAL MORPHOLOGY COLORS
// =============================================================================

/**
 * Colors for bacterial cell structures
 */
export const bacterialStructureColors = {
  /** Cell wall - dark gray */
  cellWall: '#374151',
  /** Peptidoglycan - tan */
  peptidoglycan: '#D4A574',
  /** Outer membrane (Gram negative) - orange */
  outerMembrane: '#F97316',
  /** Plasma membrane - blue */
  plasmaMembrane: '#3B82F6',
  /** Cytoplasm - light blue */
  cytoplasm: '#BFDBFE',
  /** Nucleoid/DNA - dark blue */
  nucleoid: '#1E40AF',
  /** Plasmid - green */
  plasmid: '#22C55E',
  /** Ribosomes - purple */
  ribosomes: '#8B5CF6',
  /** Capsule - light purple */
  capsule: '#C4B5FD',
  /** Flagella - teal */
  flagella: '#14B8A6',
  /** Pili/Fimbriae - pink */
  pili: '#F472B6',
  /** Endospore - brown */
  endospore: '#92400E',
  /** Lipopolysaccharide (LPS) - red */
  lps: '#EF4444',
  /** Teichoic acid - light green */
  teichoicAcid: '#86EFAC',
};

/**
 * Colors for bacterial shapes
 */
export const bacterialShapeColors = {
  /** Cocci (spherical) - purple */
  cocci: '#7C3AED',
  /** Bacilli (rod) - blue */
  bacilli: '#3B82F6',
  /** Spirilla (spiral) - teal */
  spirilla: '#0D9488',
  /** Vibrio (comma) - green */
  vibrio: '#22C55E',
  /** Spirochete - orange */
  spirochete: '#F59E0B',
  /** Coccobacilli - blue-purple */
  coccobacilli: '#4F46E5',
  /** Filamentous - brown */
  filamentous: '#A16207',
};

// =============================================================================
// VIRAL COLORS
// =============================================================================

/**
 * Colors for viral structures
 */
export const viralStructureColors = {
  /** Capsid - purple */
  capsid: '#8B5CF6',
  /** Envelope - orange */
  envelope: '#F97316',
  /** Spike proteins - red */
  spikeProteins: '#EF4444',
  /** Viral DNA - dark blue */
  viralDNA: '#1E40AF',
  /** Viral RNA - teal */
  viralRNA: '#0D9488',
  /** Matrix proteins - yellow */
  matrixProteins: '#EAB308',
  /** Reverse transcriptase - green */
  reverseTranscriptase: '#22C55E',
  /** Integrase - pink */
  integrase: '#EC4899',
  /** Protease - brown */
  protease: '#92400E',
};

/**
 * Colors for viral classification (Baltimore)
 */
export const baltimoreClassColors = {
  /** Class I: dsDNA - dark blue */
  classI_dsDNA: '#1E40AF',
  /** Class II: ssDNA - light blue */
  classII_ssDNA: '#3B82F6',
  /** Class III: dsRNA - dark green */
  classIII_dsRNA: '#166534',
  /** Class IV: +ssRNA - green */
  classIV_plusRNA: '#22C55E',
  /** Class V: -ssRNA - yellow */
  classV_minusRNA: '#EAB308',
  /** Class VI: ssRNA-RT - orange */
  classVI_RT: '#F97316',
  /** Class VII: dsDNA-RT - red */
  classVII_dsDNA_RT: '#EF4444',
};

// =============================================================================
// FUNGAL COLORS
// =============================================================================

/**
 * Colors for fungal structures
 */
export const fungalColors = {
  /** Chitin cell wall - brown */
  chitinWall: '#78350F',
  /** Hyphae - light brown */
  hyphae: '#A16207',
  /** Septae - dark gray */
  septae: '#4B5563',
  /** Yeast cells - cream/tan */
  yeastCells: '#FEF3C7',
  /** Conidia - green */
  conidia: '#22C55E',
  /** Spores - purple */
  spores: '#8B5CF6',
  /** Fruiting body - orange */
  fruitingBody: '#F97316',
  /** Mycelium - tan */
  mycelium: '#D4A574',
  /** Ascus - blue */
  ascus: '#3B82F6',
  /** Basidium - pink */
  basidium: '#F472B6',
};

// =============================================================================
// PARASITOLOGY COLORS
// =============================================================================

/**
 * Colors for parasitic organisms
 */
export const parasiteColors = {
  /** Protozoa - teal */
  protozoa: '#0D9488',
  /** Helminths (worms) - brown */
  helminths: '#92400E',
  /** Nematodes (roundworms) - tan */
  nematodes: '#D4A574',
  /** Cestodes (tapeworms) - gray */
  cestodes: '#6B7280',
  /** Trematodes (flukes) - dark brown */
  trematodes: '#78350F',
  /** Amoeba - light teal */
  amoeba: '#5EEAD4',
  /** Flagellates - green */
  flagellates: '#22C55E',
  /** Ciliates - blue */
  ciliates: '#3B82F6',
  /** Sporozoans - purple */
  sporozoans: '#8B5CF6',
  /** Eggs/Ova - cream */
  eggs: '#FEFCE8',
  /** Cysts - light gray */
  cysts: '#E5E7EB',
};

// =============================================================================
// LABORATORY TECHNIQUE COLORS
// =============================================================================

/**
 * Colors for culture media
 */
export const cultureMediaColors = {
  /** Blood agar - red */
  bloodAgar: '#DC2626',
  /** MacConkey agar - pink/purple */
  macConkey: '#DB2777',
  /** Chocolate agar - brown */
  chocolateAgar: '#78350F',
  /** Mueller-Hinton - tan */
  muellerHinton: '#D4A574',
  /** Sabouraud agar - yellow */
  sabouraudAgar: '#FDE047',
  /** Selective media - green */
  selectiveMedia: '#22C55E',
  /** Enrichment broth - amber */
  enrichmentBroth: '#F59E0B',
  /** Differential media - orange */
  differentialMedia: '#EA580C',
};

/**
 * Colors for hemolysis patterns
 */
export const hemolysisColors = {
  /** Alpha hemolysis - green/brown */
  alphaHemolysis: '#84CC16',
  /** Beta hemolysis - clear/yellow */
  betaHemolysis: '#FEF9C3',
  /** Gamma hemolysis - no change (red) */
  gammaHemolysis: '#DC2626',
};

/**
 * Colors for special stains
 */
export const specialStainColors = {
  /** Acid-fast positive - red */
  acidFastPositive: '#DC2626',
  /** Acid-fast negative - blue (methylene blue) */
  acidFastNegative: '#2563EB',
  /** Endospore stain positive - green */
  sporeStainPositive: '#16A34A',
  /** Vegetative cells (spore stain) - pink */
  vegetativeCells: '#F472B6',
  /** India ink (capsule) - black background */
  indiaInkBackground: '#1F2937',
  /** Capsule (negative stain) - clear */
  capsuleNegative: '#FAFAFA',
  /** Giemsa - purple */
  giemsa: '#7C3AED',
  /** Acridine orange - orange fluorescence */
  acridineOrange: '#FB923C',
};

// =============================================================================
// ANTIMICROBIAL SUSCEPTIBILITY COLORS
// =============================================================================

/**
 * Colors for susceptibility results
 */
export const susceptibilityColors = {
  /** Susceptible - green */
  susceptible: '#22C55E',
  /** Intermediate - yellow */
  intermediate: '#EAB308',
  /** Resistant - red */
  resistant: '#EF4444',
  /** Zone of inhibition - clear */
  zoneOfInhibition: '#FAFAFA',
  /** Bacterial lawn - tan */
  bacterialLawn: '#D4A574',
  /** Antibiotic disk - white */
  antibioticDisk: '#F8FAFC',
};

/**
 * Colors for resistance mechanisms
 */
export const resistanceMechanismColors = {
  /** Beta-lactamase - red */
  betaLactamase: '#DC2626',
  /** Efflux pump - orange */
  effluxPump: '#F97316',
  /** Target modification - purple */
  targetModification: '#8B5CF6',
  /** Reduced permeability - gray */
  reducedPermeability: '#6B7280',
  /** MRSA - dark red */
  mrsa: '#991B1B',
  /** ESBL - orange */
  esbl: '#EA580C',
  /** CRE - dark purple */
  cre: '#5B21B6',
  /** VRE - pink */
  vre: '#DB2777',
};

// =============================================================================
// BIOSAFETY LEVEL COLORS
// =============================================================================

/**
 * Colors for biosafety levels
 */
export const biosafetyColors = {
  /** BSL-1 (minimal risk) - green */
  bsl1: '#22C55E',
  /** BSL-2 (moderate risk) - yellow */
  bsl2: '#EAB308',
  /** BSL-3 (serious/lethal) - orange */
  bsl3: '#F97316',
  /** BSL-4 (life-threatening, no treatment) - red */
  bsl4: '#DC2626',
  /** Biohazard symbol - orange */
  biohazardSymbol: '#F97316',
};

// =============================================================================
// MOLECULAR TECHNIQUE COLORS
// =============================================================================

/**
 * Colors for PCR and molecular techniques
 */
export const molecularColors = {
  /** DNA template - dark blue */
  dnaTemplate: '#1E40AF',
  /** Primers - green */
  primers: '#22C55E',
  /** Taq polymerase - red */
  taqPolymerase: '#EF4444',
  /** dNTPs - purple */
  dntps: '#8B5CF6',
  /** Amplified product - orange */
  amplifiedProduct: '#F97316',
  /** Gel bands - dark gray */
  gelBands: '#374151',
  /** DNA ladder - blue */
  dnaLadder: '#3B82F6',
  /** Loading dye - blue/purple */
  loadingDye: '#4F46E5',
  /** Ethidium bromide glow - green */
  ethidiumGlow: '#4ADE80',
};

/**
 * Colors for ELISA components
 */
export const elisaColors = {
  /** Capture antibody - blue */
  captureAntibody: '#3B82F6',
  /** Detection antibody - red */
  detectionAntibody: '#EF4444',
  /** Antigen - purple */
  antigen: '#8B5CF6',
  /** Enzyme conjugate - green */
  enzymeConjugate: '#22C55E',
  /** Substrate - clear */
  substrate: '#F8FAFC',
  /** Positive color (TMB) - blue */
  positiveReaction: '#2563EB',
  /** Positive color (after stop) - yellow */
  stoppedReaction: '#FDE047',
};

// =============================================================================
// FLOWCHART/DIAGRAM COLORS
// =============================================================================

/**
 * General utility colors for microbiology diagrams
 */
export const microbiologyFlowchartColors = {
  /** Terminal/start/end - green */
  terminal: '#22C55E',
  /** Decision point - yellow */
  decision: '#F59E0B',
  /** Process - blue */
  process: '#3B82F6',
  /** Pathogen/danger - red */
  pathogen: '#EF4444',
  /** Warning - orange */
  warning: '#F97316',
  /** Normal flora - teal */
  normalFlora: '#14B8A6',
  /** Sterile - white */
  sterile: '#FAFAFA',
  /** Contamination - brown */
  contamination: '#92400E',
  /** Connection - gray */
  connection: '#6B7280',
};

// =============================================================================
// COMPLETE MICROBIOLOGY COLOR SCHEME
// =============================================================================

/**
 * Complete microbiology color scheme export
 */
export const microbiologyColorScheme = {
  // Gram staining
  gramStain: gramStainColors,

  // Bacterial structures and morphology
  bacterialStructure: bacterialStructureColors,
  bacterialShape: bacterialShapeColors,

  // Virology
  viralStructure: viralStructureColors,
  baltimoreClass: baltimoreClassColors,

  // Mycology
  fungal: fungalColors,

  // Parasitology
  parasite: parasiteColors,

  // Laboratory
  cultureMedia: cultureMediaColors,
  hemolysis: hemolysisColors,
  specialStain: specialStainColors,

  // Antimicrobials
  susceptibility: susceptibilityColors,
  resistance: resistanceMechanismColors,

  // Safety
  biosafety: biosafetyColors,

  // Molecular
  molecular: molecularColors,
  elisa: elisaColors,

  // Utility
  flowchart: microbiologyFlowchartColors,

  // Quick access to commonly used colors
  common: {
    gramPositive: '#7C3AED',
    gramNegative: '#EC4899',
    susceptible: '#22C55E',
    resistant: '#EF4444',
    virus: '#8B5CF6',
    bacteria: '#3B82F6',
    fungus: '#A16207',
    parasite: '#0D9488',
    sterile: '#FAFAFA',
    contaminated: '#92400E',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type GramStainColors = typeof gramStainColors;
export type BacterialStructureColors = typeof bacterialStructureColors;
export type BacterialShapeColors = typeof bacterialShapeColors;
export type ViralStructureColors = typeof viralStructureColors;
export type BaltimoreClassColors = typeof baltimoreClassColors;
export type FungalColors = typeof fungalColors;
export type ParasiteColors = typeof parasiteColors;
export type CultureMediaColors = typeof cultureMediaColors;
export type HemolysisColors = typeof hemolysisColors;
export type SpecialStainColors = typeof specialStainColors;
export type SusceptibilityColors = typeof susceptibilityColors;
export type ResistanceMechanismColors = typeof resistanceMechanismColors;
export type BiosafetyColors = typeof biosafetyColors;
export type MolecularColors = typeof molecularColors;
export type ElisaColors = typeof elisaColors;
export type MicrobiologyFlowchartColors = typeof microbiologyFlowchartColors;
export type MicrobiologyColorScheme = typeof microbiologyColorScheme;

export default microbiologyColorScheme;
