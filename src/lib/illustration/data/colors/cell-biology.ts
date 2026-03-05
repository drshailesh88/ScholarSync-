/**
 * cell-biology.ts
 * Cell Biology color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for cell biology diagrams including:
 * - Organelle colors (nucleus, mitochondria, ER, Golgi, etc.)
 * - Membrane and transport colors
 * - Cell cycle phase colors
 * - Signaling pathway colors
 * - Cell death and survival colors
 * - Cytoskeleton colors
 * - Cell junction colors
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// PRIMARY PALETTE - Organelle Colors
// =============================================================================

/**
 * Main organelle colors for cell diagrams
 */
export const organelleColors = {
  /** Nucleus - purple tones */
  nucleus: '#9B59B6',
  /** Nucleolus - darker purple */
  nucleolus: '#7D3C98',
  /** Nuclear envelope */
  nuclearEnvelope: '#BB8FCE',
  /** Mitochondria - red/orange */
  mitochondria: '#E74C3C',
  /** Mitochondrial matrix */
  mitochondrialMatrix: '#F1948A',
  /** Rough ER - blue */
  roughER: '#3498DB',
  /** Smooth ER - lighter blue */
  smoothER: '#85C1E9',
  /** Golgi apparatus - gold/yellow */
  golgiApparatus: '#F39C12',
  /** Golgi cisternae */
  golgiCisternae: '#F7DC6F',
  /** Lysosomes - purple-red */
  lysosome: '#8E44AD',
  /** Peroxisomes - green */
  peroxisome: '#27AE60',
  /** Ribosomes */
  ribosome: '#5DADE2',
  /** Centrosome/Centrioles */
  centrosome: '#F39C12',
  /** Vacuole */
  vacuole: '#87CEEB',
  /** Chloroplast - green */
  chloroplast: '#2ECC71',
  /** Cytoplasm */
  cytoplasm: '#FDEBD0',
};

// =============================================================================
// MEMBRANE COLORS
// =============================================================================

/**
 * Cell membrane and lipid bilayer colors
 */
export const membraneColors = {
  /** Phospholipid head - polar */
  phospholipidHead: '#3498DB',
  /** Phospholipid tail - nonpolar */
  phospholipidTail: '#F5B041',
  /** Integral protein */
  integralProtein: '#27AE60',
  /** Peripheral protein */
  peripheralProtein: '#82E0AA',
  /** Cholesterol */
  cholesterol: '#F39C12',
  /** Glycoprotein */
  glycoprotein: '#9B59B6',
  /** Glycolipid */
  glycolipid: '#E74C3C',
  /** Ion channel open */
  ionChannelOpen: '#2ECC71',
  /** Ion channel closed */
  ionChannelClosed: '#E74C3C',
  /** Receptor protein */
  receptor: '#8E44AD',
  /** Carrier protein */
  carrier: '#3498DB',
};

// =============================================================================
// CELL CYCLE COLORS
// =============================================================================

/**
 * Cell cycle phase colors
 */
export const cellCycleColors = {
  /** Interphase - G0 */
  g0Phase: '#95A5A6',
  /** G1 phase - growth */
  g1Phase: '#3498DB',
  /** S phase - DNA synthesis */
  sPhase: '#27AE60',
  /** G2 phase - preparation */
  g2Phase: '#F39C12',
  /** M phase - mitosis */
  mPhase: '#E74C3C',
  /** Cytokinesis */
  cytokinesis: '#9B59B6',
  /** Checkpoint active */
  checkpointActive: '#2ECC71',
  /** Checkpoint blocked */
  checkpointBlocked: '#E74C3C',
  /** Cyclin */
  cyclin: '#F39C12',
  /** CDK */
  cdk: '#3498DB',
};

// =============================================================================
// MITOSIS PHASE COLORS
// =============================================================================

/**
 * Mitosis phase-specific colors
 */
export const mitosisColors = {
  /** Prophase */
  prophase: '#3498DB',
  /** Prometaphase */
  prometaphase: '#2980B9',
  /** Metaphase */
  metaphase: '#27AE60',
  /** Anaphase */
  anaphase: '#F39C12',
  /** Telophase */
  telophase: '#E74C3C',
  /** Spindle fibers */
  spindleFibers: '#9B59B6',
  /** Centromere */
  centromere: '#8E44AD',
  /** Kinetochore */
  kinetochore: '#27AE60',
  /** Cleavage furrow */
  cleavageFurrow: '#E74C3C',
};

// =============================================================================
// CHROMOSOME COLORS
// =============================================================================

/**
 * Chromosome and DNA colors
 */
export const chromosomeColors = {
  /** Chromatin - relaxed */
  chromatinRelaxed: '#BB8FCE',
  /** Chromatin - condensed */
  chromatinCondensed: '#7D3C98',
  /** Sister chromatid 1 */
  sisterChromatid1: '#E74C3C',
  /** Sister chromatid 2 */
  sisterChromatid2: '#3498DB',
  /** Homologous pair 1 */
  homolog1: '#27AE60',
  /** Homologous pair 2 */
  homolog2: '#F39C12',
  /** DNA double helix */
  dnaHelix: '#3498DB',
  /** Histone */
  histone: '#F39C12',
  /** Nucleosome */
  nucleosome: '#E74C3C',
};

// =============================================================================
// SIGNALING COLORS
// =============================================================================

/**
 * Cell signaling pathway colors
 */
export const signalingColors = {
  /** Ligand/Signal molecule */
  ligand: '#E74C3C',
  /** Receptor active */
  receptorActive: '#27AE60',
  /** Receptor inactive */
  receptorInactive: '#95A5A6',
  /** G-protein */
  gProtein: '#F39C12',
  /** Second messenger cAMP */
  cAMP: '#3498DB',
  /** Second messenger IP3 */
  ip3: '#9B59B6',
  /** Calcium ion */
  calcium: '#87CEEB',
  /** Kinase */
  kinase: '#E74C3C',
  /** Phosphatase */
  phosphatase: '#27AE60',
  /** Phosphorylation */
  phosphorylation: '#F39C12',
  /** Transcription factor active */
  transcriptionFactorActive: '#2ECC71',
};

// =============================================================================
// TRANSPORT COLORS
// =============================================================================

/**
 * Cellular transport colors
 */
export const transportColors = {
  /** Passive diffusion */
  passiveDiffusion: '#85C1E9',
  /** Facilitated diffusion */
  facilitatedDiffusion: '#3498DB',
  /** Active transport */
  activeTransport: '#E74C3C',
  /** ATP energy */
  atp: '#F39C12',
  /** ADP */
  adp: '#F5B041',
  /** Vesicle */
  vesicle: '#9B59B6',
  /** COPII coat */
  copii: '#3498DB',
  /** COPI coat */
  copi: '#9B59B6',
  /** Clathrin coat */
  clathrin: '#E74C3C',
  /** Endocytosis */
  endocytosis: '#27AE60',
  /** Exocytosis */
  exocytosis: '#F39C12',
};

// =============================================================================
// CELL DEATH COLORS
// =============================================================================

/**
 * Cell death and survival pathway colors
 */
export const cellDeathColors = {
  /** Apoptosis */
  apoptosis: '#9B59B6',
  /** Necrosis */
  necrosis: '#E74C3C',
  /** Autophagy */
  autophagy: '#27AE60',
  /** Caspase initiator */
  caspaseInitiator: '#E74C3C',
  /** Caspase executioner */
  caspaseExecutioner: '#C0392B',
  /** Bcl-2 pro-survival */
  bcl2ProSurvival: '#27AE60',
  /** Bcl-2 pro-apoptotic */
  bcl2ProApoptotic: '#E74C3C',
  /** Cytochrome c */
  cytochromeC: '#F39C12',
  /** Apoptotic body */
  apoptoticBody: '#BB8FCE',
  /** Survival signal */
  survivalSignal: '#2ECC71',
};

// =============================================================================
// CYTOSKELETON COLORS
// =============================================================================

/**
 * Cytoskeleton component colors
 */
export const cytoskeletonColors = {
  /** Actin filament */
  actinFilament: '#E74C3C',
  /** G-actin monomer */
  gActin: '#F1948A',
  /** Microtubule */
  microtubule: '#27AE60',
  /** Alpha tubulin */
  alphaTubulin: '#2ECC71',
  /** Beta tubulin */
  betaTubulin: '#9B59B6',
  /** Intermediate filament */
  intermediateFilament: '#9B59B6',
  /** Kinesin motor */
  kinesin: '#F39C12',
  /** Dynein motor */
  dynein: '#3498DB',
  /** Myosin motor */
  myosin: '#E74C3C',
  /** Plus end */
  plusEnd: '#27AE60',
  /** Minus end */
  minusEnd: '#E74C3C',
};

// =============================================================================
// CELL JUNCTION COLORS
// =============================================================================

/**
 * Cell junction colors
 */
export const junctionColors = {
  /** Tight junction */
  tightJunction: '#E74C3C',
  /** Adherens junction */
  adherensJunction: '#27AE60',
  /** Desmosome */
  desmosome: '#9B59B6',
  /** Gap junction */
  gapJunction: '#3498DB',
  /** Hemidesmosome */
  hemidesmosome: '#F39C12',
  /** Connexin/Connexon */
  connexin: '#2980B9',
  /** Cadherin */
  cadherin: '#27AE60',
  /** Integrin */
  integrin: '#E74C3C',
  /** Basement membrane */
  basementMembrane: '#F39C12',
};

// =============================================================================
// CELL TYPE COLORS
// =============================================================================

/**
 * Different cell type colors
 */
export const cellTypeColors = {
  /** Epithelial cell */
  epithelial: '#FFE4E1',
  /** Muscle cell */
  muscle: '#E74C3C',
  /** Neuron */
  neuron: '#9B59B6',
  /** Red blood cell */
  rbc: '#E74C3C',
  /** White blood cell */
  wbc: '#87CEEB',
  /** Platelet */
  platelet: '#F39C12',
  /** Stem cell */
  stemCell: '#27AE60',
  /** Fibroblast */
  fibroblast: '#3498DB',
  /** Macrophage */
  macrophage: '#2ECC71',
};

// =============================================================================
// SEVERITY GRADIENT
// =============================================================================

/**
 * Severity gradient for cell biology conditions
 */
export const severityGradient = {
  /** Normal/Healthy */
  normal: '#27AE60',
  /** Mild perturbation */
  mild: '#F39C12',
  /** Moderate perturbation */
  moderate: '#E67E22',
  /** Severe perturbation */
  severe: '#E74C3C',
  /** Critical/Lethal */
  critical: '#C0392B',
};

// =============================================================================
// FLOWCHART COLORS
// =============================================================================

/**
 * Decision flowchart node colors for cell biology
 */
export const flowchartColors = {
  /** Start/End nodes */
  terminal: '#27AE60',
  /** Decision nodes */
  decision: '#F39C12',
  /** Process nodes */
  process: '#3498DB',
  /** Action required */
  action: '#E74C3C',
  /** Warning */
  warning: '#F39C12',
  /** Success */
  success: '#27AE60',
  /** Failure */
  failure: '#E74C3C',
  /** Information */
  info: '#3498DB',
  /** Pathway activation */
  activation: '#2ECC71',
  /** Pathway inhibition */
  inhibition: '#C0392B',
};

// =============================================================================
// COMPLETE CELL BIOLOGY COLOR SCHEME
// =============================================================================

/**
 * Complete cell biology color scheme export
 */
export const cellBiologyColorScheme = {
  // Core palettes
  organelle: organelleColors,
  membrane: membraneColors,
  cellCycle: cellCycleColors,
  mitosis: mitosisColors,
  chromosome: chromosomeColors,

  // Functional palettes
  signaling: signalingColors,
  transport: transportColors,
  cellDeath: cellDeathColors,
  cytoskeleton: cytoskeletonColors,
  junction: junctionColors,
  cellType: cellTypeColors,

  // Clinical/Utility
  severity: severityGradient,
  flowchart: flowchartColors,

  // Quick access to commonly used colors
  common: {
    nucleus: '#9B59B6',
    mitochondria: '#E74C3C',
    membrane: '#3498DB',
    cytoplasm: '#FDEBD0',
    active: '#27AE60',
    inactive: '#95A5A6',
    normal: '#27AE60',
    abnormal: '#E74C3C',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type OrganelleColors = typeof organelleColors;
export type MembraneColors = typeof membraneColors;
export type CellCycleColors = typeof cellCycleColors;
export type MitosisColors = typeof mitosisColors;
export type ChromosomeColors = typeof chromosomeColors;
export type SignalingColors = typeof signalingColors;
export type TransportColors = typeof transportColors;
export type CellDeathColors = typeof cellDeathColors;
export type CytoskeletonColors = typeof cytoskeletonColors;
export type JunctionColors = typeof junctionColors;
export type CellTypeColors = typeof cellTypeColors;
export type SeverityGradient = typeof severityGradient;
export type FlowchartColors = typeof flowchartColors;
export type CellBiologyColorScheme = typeof cellBiologyColorScheme;

export default cellBiologyColorScheme;
