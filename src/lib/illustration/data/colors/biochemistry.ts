/**
 * Biochemistry Color Scheme
 * Domain-specific colors for biochemistry illustrations
 *
 * Color categories:
 * - Molecule types (proteins, nucleic acids, carbohydrates, lipids)
 * - Metabolic pathways
 * - Enzyme kinetics
 * - Lab techniques
 * - Cell signaling
 */

// =============================================================================
// MOLECULE TYPE COLORS
// =============================================================================

/**
 * Amino acid and protein colors
 */
export const proteinColors = {
  primary: '#8B5CF6',      // Purple - primary structure
  secondary: '#A78BFA',    // Light purple - secondary structure
  tertiary: '#7C3AED',     // Deep purple - tertiary structure
  quaternary: '#6D28D9',   // Dark purple - quaternary structure
  alphaHelix: '#EC4899',   // Pink - alpha helix
  betaSheet: '#10B981',    // Green - beta sheet
  disulfide: '#EAB308',    // Yellow - disulfide bonds
  activesite: '#EF4444',   // Red - active site
  allosteric: '#F97316',   // Orange - allosteric site
  hydrophobic: '#78716C',  // Gray - hydrophobic residues
  hydrophilic: '#06B6D4',  // Cyan - hydrophilic residues
  charged: '#3B82F6',      // Blue - charged residues
};

/**
 * Nucleic acid colors
 */
export const nucleicAcidColors = {
  dna: '#3B82F6',          // Blue - DNA
  rna: '#F97316',          // Orange - RNA
  adenine: '#22C55E',      // Green - Adenine
  thymine: '#EF4444',      // Red - Thymine
  guanine: '#EAB308',      // Yellow - Guanine
  cytosine: '#8B5CF6',     // Purple - Cytosine
  uracil: '#F97316',       // Orange - Uracil
  phosphate: '#DC2626',    // Dark red - Phosphate
  ribose: '#60A5FA',       // Light blue - Ribose
  deoxyribose: '#3B82F6',  // Blue - Deoxyribose
  hBond: '#94A3B8',        // Gray - Hydrogen bonds
  backbone: '#1E40AF',     // Dark blue - Backbone
};

/**
 * Carbohydrate colors
 */
export const carbohydrateColors = {
  monosaccharide: '#06B6D4', // Cyan - Monosaccharides
  glucose: '#22D3EE',        // Light cyan - Glucose
  fructose: '#F472B6',       // Pink - Fructose
  galactose: '#A78BFA',      // Light purple - Galactose
  disaccharide: '#14B8A6',   // Teal - Disaccharides
  polysaccharide: '#0D9488', // Dark teal - Polysaccharides
  glycogen: '#6366F1',       // Indigo - Glycogen
  starch: '#84CC16',         // Lime - Starch
  cellulose: '#22C55E',      // Green - Cellulose
  glycosidic: '#F59E0B',     // Amber - Glycosidic bonds
};

/**
 * Lipid colors
 */
export const lipidColors = {
  fattyAcid: '#F97316',    // Orange - Fatty acids
  saturated: '#EA580C',    // Dark orange - Saturated
  unsaturated: '#FB923C',  // Light orange - Unsaturated
  phospholipid: '#3B82F6', // Blue - Phospholipids
  headGroup: '#60A5FA',    // Light blue - Head group
  tail: '#FDE047',         // Yellow - Tail
  cholesterol: '#EAB308',  // Yellow - Cholesterol
  triglyceride: '#FBBF24', // Amber - Triglycerides
  membrane: '#1E3A8A',     // Dark blue - Membrane
  bilayer: '#2563EB',      // Blue - Bilayer
};

// =============================================================================
// METABOLIC PATHWAY COLORS
// =============================================================================

/**
 * Central metabolism colors
 */
export const metabolismColors = {
  glycolysis: '#EF4444',       // Red - Glycolysis
  gluconeogenesis: '#22C55E',  // Green - Gluconeogenesis
  tcaCycle: '#F97316',         // Orange - TCA cycle
  etc: '#8B5CF6',              // Purple - Electron transport
  betaOxidation: '#EAB308',    // Yellow - Beta oxidation
  fattyAcidSynthesis: '#06B6D4', // Cyan - FA synthesis
  pentosePhosphate: '#EC4899', // Pink - PPP
  ureaCycle: '#3B82F6',        // Blue - Urea cycle
  anabolic: '#22C55E',         // Green - Anabolic
  catabolic: '#EF4444',        // Red - Catabolic
  atp: '#F59E0B',              // Amber - ATP
  nadh: '#6366F1',             // Indigo - NADH
  fadh2: '#FDE047',            // Yellow - FADH2
};

/**
 * Pathway arrow and flow colors
 */
export const pathwayFlowColors = {
  forward: '#22C55E',        // Green - Forward reaction
  reverse: '#EF4444',        // Red - Reverse reaction
  regulated: '#8B5CF6',      // Purple - Regulated step
  rateLimit: '#F97316',      // Orange - Rate-limiting
  branch: '#3B82F6',         // Blue - Branch point
  cycle: '#06B6D4',          // Cyan - Cycle
  shuttle: '#EC4899',        // Pink - Shuttle
};

// =============================================================================
// ENZYME KINETICS COLORS
// =============================================================================

/**
 * Enzyme kinetics visualization colors
 */
export const enzymeKineticsColors = {
  enzyme: '#3B82F6',          // Blue - Enzyme
  substrate: '#22C55E',       // Green - Substrate
  product: '#EF4444',         // Red - Product
  inhibitor: '#DC2626',       // Dark red - Inhibitor
  activator: '#16A34A',       // Dark green - Activator
  esComplex: '#8B5CF6',       // Purple - ES complex
  km: '#F97316',              // Orange - Km
  vmax: '#EAB308',            // Yellow - Vmax
  competitive: '#F43F5E',     // Rose - Competitive inhibition
  noncompetitive: '#8B5CF6',  // Purple - Noncompetitive
  uncompetitive: '#06B6D4',   // Cyan - Uncompetitive
  allosteric: '#EC4899',      // Pink - Allosteric
};

/**
 * Graph and chart colors for kinetics
 */
export const kineticsGraphColors = {
  curve: '#3B82F6',           // Blue - Main curve
  curveInhibited: '#EF4444',  // Red - Inhibited curve
  asymptote: '#9CA3AF',       // Gray - Asymptote
  halfVmax: '#F97316',        // Orange - Half Vmax line
  kmLine: '#22C55E',          // Green - Km line
  axis: '#1F2937',            // Dark gray - Axes
  gridLine: '#E5E7EB',        // Light gray - Grid
};

// =============================================================================
// COFACTOR AND COENZYME COLORS
// =============================================================================

/**
 * Cofactor colors
 */
export const cofactorColors = {
  nad: '#6366F1',        // Indigo - NAD+
  nadh: '#818CF8',       // Light indigo - NADH
  nadp: '#8B5CF6',       // Purple - NADP+
  nadph: '#A78BFA',      // Light purple - NADPH
  fad: '#EAB308',        // Yellow - FAD
  fadh2: '#FDE047',      // Light yellow - FADH2
  atp: '#F59E0B',        // Amber - ATP
  adp: '#D97706',        // Dark amber - ADP
  amp: '#B45309',        // Brown - AMP
  coA: '#22C55E',        // Green - Coenzyme A
  biotin: '#F97316',     // Orange - Biotin
  thiamine: '#FBBF24',   // Yellow - Thiamine/TPP
  pyridoxal: '#EC4899',  // Pink - PLP
  folate: '#10B981',     // Emerald - Folate
  b12: '#DC2626',        // Red - Vitamin B12
};

// =============================================================================
// CELL SIGNALING COLORS
// =============================================================================

/**
 * Cell signaling pathway colors
 */
export const signalingColors = {
  receptor: '#8B5CF6',      // Purple - Receptor
  gProtein: '#3B82F6',      // Blue - G protein
  kinase: '#EF4444',        // Red - Kinase
  phosphatase: '#22C55E',   // Green - Phosphatase
  secondMessenger: '#F97316', // Orange - Second messenger
  camp: '#FBBF24',          // Yellow - cAMP
  cgmp: '#84CC16',          // Lime - cGMP
  ip3: '#EC4899',           // Pink - IP3
  dag: '#F59E0B',           // Amber - DAG
  calcium: '#06B6D4',       // Cyan - Calcium
  mapk: '#EF4444',          // Red - MAPK cascade
  transcription: '#8B5CF6', // Purple - Transcription factor
  phosphorylation: '#EAB308', // Yellow - Phosphorylation
};

// =============================================================================
// LAB TECHNIQUE COLORS
// =============================================================================

/**
 * Laboratory technique visualization colors
 */
export const labTechniqueColors = {
  gel: '#E0F2FE',           // Light blue - Gel background
  band: '#1E40AF',          // Dark blue - Gel bands
  ladder: '#6B7280',        // Gray - Molecular ladder
  positive: '#22C55E',      // Green - Positive result
  negative: '#EF4444',      // Red - Negative result
  sample: '#3B82F6',        // Blue - Sample
  buffer: '#93C5FD',        // Light blue - Buffer
  stain: '#8B5CF6',         // Purple - Staining
  fluorescent: '#84CC16',   // Lime - Fluorescent
  absorbance: '#F97316',    // Orange - Absorbance
  emission: '#22D3EE',      // Cyan - Emission
  chromatography: '#A855F7', // Violet - Chromatography
};

// =============================================================================
// SEVERITY AND STATUS GRADIENTS
// =============================================================================

/**
 * Concentration gradient
 */
export const concentrationGradient = {
  low: '#DCFCE7',      // Light green
  medium: '#86EFAC',   // Medium green
  high: '#22C55E',     // Green
  veryHigh: '#15803D', // Dark green
};

/**
 * Activity level gradient
 */
export const activityGradient = {
  inactive: '#E5E7EB',   // Gray
  low: '#FEF3C7',        // Light yellow
  moderate: '#FDE047',   // Yellow
  high: '#F59E0B',       // Amber
  maximum: '#DC2626',    // Red
};

/**
 * pH gradient colors
 */
export const phGradient = {
  acidic: '#EF4444',     // Red - Acidic
  slightlyAcidic: '#F97316', // Orange
  neutral: '#22C55E',    // Green - Neutral
  slightlyBasic: '#3B82F6', // Blue
  basic: '#8B5CF6',      // Purple - Basic
};

// =============================================================================
// FLOWCHART COLORS
// =============================================================================

/**
 * Flowchart node colors for biochemistry diagrams
 */
export const flowchartColors = {
  start: '#22C55E',        // Green - Start
  end: '#EF4444',          // Red - End
  process: '#3B82F6',      // Blue - Process
  decision: '#F59E0B',     // Amber - Decision
  input: '#8B5CF6',        // Purple - Input
  output: '#EC4899',       // Pink - Output
  enzyme: '#06B6D4',       // Cyan - Enzyme
  substrate: '#84CC16',    // Lime - Substrate
  product: '#F97316',      // Orange - Product
  regulation: '#EAB308',   // Yellow - Regulation
  background: '#F8FAFC',   // Light gray - Background
  border: '#CBD5E1',       // Gray - Border
  text: '#1E293B',         // Dark - Text
  arrow: '#64748B',        // Slate - Arrow
};

// =============================================================================
// COMPLETE COLOR SCHEME EXPORT
// =============================================================================

/**
 * Complete biochemistry color scheme
 */
export const biochemistryColorScheme = {
  // Molecule types
  proteins: proteinColors,
  nucleicAcids: nucleicAcidColors,
  carbohydrates: carbohydrateColors,
  lipids: lipidColors,

  // Metabolism
  metabolism: metabolismColors,
  pathwayFlow: pathwayFlowColors,

  // Enzymes
  enzymeKinetics: enzymeKineticsColors,
  kineticsGraph: kineticsGraphColors,
  cofactors: cofactorColors,

  // Signaling
  signaling: signalingColors,

  // Lab
  labTechniques: labTechniqueColors,

  // Gradients
  concentration: concentrationGradient,
  activity: activityGradient,
  ph: phGradient,

  // Flowchart
  flowchart: flowchartColors,
};

export type BiochemistryColorScheme = typeof biochemistryColorScheme;

export default biochemistryColorScheme;
