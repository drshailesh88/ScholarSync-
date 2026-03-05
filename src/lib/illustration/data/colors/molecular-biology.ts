/**
 * molecular-biology.ts
 * Molecular Biology color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for molecular biology diagrams including:
 * - Nucleic acid colors (DNA, RNA, nucleotides)
 * - Protein and enzyme colors
 * - Gene expression and regulation colors
 * - Laboratory technique colors
 * - CRISPR and gene editing colors
 * - Epigenetic modification colors
 * - Molecular pathway colors
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// PRIMARY PALETTE - Nucleic Acid Colors
// =============================================================================

/**
 * DNA structure and nucleotide colors
 */
export const dnaColors = {
  /** DNA backbone - blue */
  backbone: '#3498DB',
  /** Sugar-phosphate backbone */
  sugarPhosphate: '#5DADE2',
  /** Double helix */
  doubleHelix: '#2980B9',
  /** Major groove */
  majorGroove: '#85C1E9',
  /** Minor groove */
  minorGroove: '#AED6F1',
  /** Template strand */
  templateStrand: '#1A5276',
  /** Coding strand */
  codingStrand: '#2E86C1',
  /** Newly synthesized strand */
  newStrand: '#58D68D',
};

/**
 * Nucleotide base colors (standard convention)
 */
export const nucleotideColors = {
  /** Adenine - green */
  adenine: '#27AE60',
  /** Thymine - red */
  thymine: '#E74C3C',
  /** Guanine - yellow/gold */
  guanine: '#F39C12',
  /** Cytosine - blue */
  cytosine: '#3498DB',
  /** Uracil (RNA) - purple */
  uracil: '#9B59B6',
  /** Base pair A-T */
  atPair: '#2ECC71',
  /** Base pair G-C */
  gcPair: '#F1C40F',
  /** Hydrogen bond */
  hydrogenBond: '#95A5A6',
};

/**
 * RNA structure colors
 */
export const rnaColors = {
  /** mRNA - red */
  mRNA: '#E74C3C',
  /** tRNA - orange */
  tRNA: '#E67E22',
  /** rRNA - purple */
  rRNA: '#9B59B6',
  /** miRNA - pink */
  miRNA: '#E91E63',
  /** siRNA - magenta */
  siRNA: '#C2185B',
  /** snRNA - teal */
  snRNA: '#00ACC1',
  /** lncRNA - brown */
  lncRNA: '#795548',
  /** 5' cap */
  fivePrimeCap: '#F39C12',
  /** Poly-A tail */
  polyATail: '#27AE60',
  /** Exon */
  exon: '#3498DB',
  /** Intron */
  intron: '#BDC3C7',
};

// =============================================================================
// PROTEIN COLORS
// =============================================================================

/**
 * Protein structure colors
 */
export const proteinColors = {
  /** Primary structure - amino acid chain */
  primaryStructure: '#27AE60',
  /** Alpha helix */
  alphaHelix: '#E74C3C',
  /** Beta sheet */
  betaSheet: '#F39C12',
  /** Random coil/loop */
  randomCoil: '#95A5A6',
  /** Turn */
  turn: '#9B59B6',
  /** Disulfide bond */
  disulfideBond: '#F1C40F',
  /** N-terminus */
  nTerminus: '#2ECC71',
  /** C-terminus */
  cTerminus: '#E74C3C',
  /** Active site */
  activeSite: '#8E44AD',
  /** Binding pocket */
  bindingPocket: '#16A085',
};

/**
 * Amino acid property colors
 */
export const aminoAcidColors = {
  /** Nonpolar/hydrophobic */
  nonpolar: '#F39C12',
  /** Polar uncharged */
  polarUncharged: '#27AE60',
  /** Positively charged (basic) */
  positivelyCharged: '#3498DB',
  /** Negatively charged (acidic) */
  negativelyCharged: '#E74C3C',
  /** Special (Gly, Pro, Cys) */
  special: '#9B59B6',
};

/**
 * Enzyme and catalysis colors
 */
export const enzymeColors = {
  /** Enzyme body */
  enzyme: '#2ECC71',
  /** Active enzyme */
  activeEnzyme: '#27AE60',
  /** Inactive enzyme */
  inactiveEnzyme: '#95A5A6',
  /** Substrate */
  substrate: '#3498DB',
  /** Product */
  product: '#E74C3C',
  /** Transition state */
  transitionState: '#F39C12',
  /** Cofactor */
  cofactor: '#9B59B6',
  /** Coenzyme */
  coenzyme: '#E67E22',
  /** Inhibitor */
  inhibitor: '#C0392B',
  /** Allosteric site */
  allostericSite: '#8E44AD',
};

// =============================================================================
// REPLICATION AND TRANSCRIPTION COLORS
// =============================================================================

/**
 * DNA replication colors
 */
export const replicationColors = {
  /** Helicase */
  helicase: '#E74C3C',
  /** DNA polymerase */
  dnaPolymerase: '#27AE60',
  /** Primase */
  primase: '#F39C12',
  /** Primer */
  primer: '#E67E22',
  /** Ligase */
  ligase: '#9B59B6',
  /** SSB proteins */
  ssbProteins: '#3498DB',
  /** Topoisomerase */
  topoisomerase: '#1ABC9C',
  /** Sliding clamp (PCNA) */
  slidingClamp: '#8E44AD',
  /** Okazaki fragment */
  okazakiFragment: '#F1C40F',
  /** Leading strand */
  leadingStrand: '#2ECC71',
  /** Lagging strand */
  laggingStrand: '#E74C3C',
  /** Replication fork */
  replicationFork: '#3498DB',
};

/**
 * Transcription colors
 */
export const transcriptionColors = {
  /** RNA polymerase */
  rnaPolymerase: '#9B59B6',
  /** RNA polymerase II */
  rnaPolII: '#8E44AD',
  /** General transcription factors */
  gtfs: '#27AE60',
  /** TATA box */
  tataBox: '#E74C3C',
  /** Promoter */
  promoter: '#F39C12',
  /** Enhancer */
  enhancer: '#2ECC71',
  /** Silencer */
  silencer: '#C0392B',
  /** Transcription bubble */
  transcriptionBubble: '#85C1E9',
  /** Nascent RNA */
  nascentRNA: '#E74C3C',
  /** Terminator */
  terminator: '#95A5A6',
};

// =============================================================================
// TRANSLATION COLORS
// =============================================================================

/**
 * Translation and ribosome colors
 */
export const translationColors = {
  /** Small ribosomal subunit (40S) */
  smallSubunit: '#87CEEB',
  /** Large ribosomal subunit (60S) */
  largeSubunit: '#DDA0DD',
  /** A site */
  aSite: '#E74C3C',
  /** P site */
  pSite: '#27AE60',
  /** E site */
  eSite: '#F39C12',
  /** Start codon (AUG) */
  startCodon: '#2ECC71',
  /** Stop codon */
  stopCodon: '#C0392B',
  /** Initiation factors */
  initiationFactors: '#3498DB',
  /** Elongation factors */
  elongationFactors: '#9B59B6',
  /** Release factors */
  releaseFactors: '#E67E22',
  /** Peptide bond */
  peptideBond: '#F1C40F',
  /** Growing polypeptide */
  polypeptide: '#27AE60',
  /** Anticodon */
  anticodon: '#E74C3C',
};

// =============================================================================
// GENE REGULATION COLORS
// =============================================================================

/**
 * Gene regulation and expression colors
 */
export const regulationColors = {
  /** Activator */
  activator: '#27AE60',
  /** Repressor */
  repressor: '#E74C3C',
  /** Operator */
  operator: '#F39C12',
  /** Inducer */
  inducer: '#2ECC71',
  /** Corepressor */
  corepressor: '#C0392B',
  /** CAP binding site */
  capSite: '#3498DB',
  /** cAMP */
  cAMP: '#9B59B6',
  /** Lac operon ON */
  operonOn: '#2ECC71',
  /** Lac operon OFF */
  operonOff: '#E74C3C',
  /** Positive regulation */
  positiveRegulation: '#27AE60',
  /** Negative regulation */
  negativeRegulation: '#E74C3C',
};

// =============================================================================
// CRISPR AND GENE EDITING COLORS
// =============================================================================

/**
 * CRISPR-Cas9 colors
 */
export const crisprColors = {
  /** Cas9 protein */
  cas9: '#9B59B6',
  /** Guide RNA (sgRNA) */
  guideRNA: '#E74C3C',
  /** PAM sequence */
  pam: '#F39C12',
  /** Target DNA */
  targetDNA: '#3498DB',
  /** HNH domain */
  hnhDomain: '#E74C3C',
  /** RuvC domain */
  ruvcDomain: '#27AE60',
  /** Double-strand break */
  dsBreak: '#C0392B',
  /** NHEJ repair */
  nhej: '#95A5A6',
  /** HDR repair */
  hdr: '#2ECC71',
  /** Donor template */
  donorTemplate: '#3498DB',
  /** Indel */
  indel: '#E67E22',
  /** Gene knockout */
  knockout: '#C0392B',
  /** Gene knock-in */
  knockin: '#27AE60',
};

// =============================================================================
// EPIGENETICS COLORS
// =============================================================================

/**
 * Epigenetic modification colors
 */
export const epigeneticsColors = {
  /** DNA methylation */
  methylation: '#E74C3C',
  /** 5-methylcytosine */
  fiveMethylC: '#C0392B',
  /** CpG island */
  cpgIsland: '#3498DB',
  /** Unmethylated */
  unmethylated: '#27AE60',
  /** Histone acetylation */
  acetylation: '#27AE60',
  /** Histone methylation (activating) */
  h3k4me3: '#2ECC71',
  /** Histone methylation (repressing) */
  h3k27me3: '#E74C3C',
  /** Euchromatin */
  euchromatin: '#85C1E9',
  /** Heterochromatin */
  heterochromatin: '#7D3C98',
  /** Writer enzyme */
  writer: '#27AE60',
  /** Eraser enzyme */
  eraser: '#E74C3C',
  /** Reader protein */
  reader: '#3498DB',
};

/**
 * Histone colors
 */
export const histoneColors = {
  /** Histone H2A */
  h2a: '#3498DB',
  /** Histone H2B */
  h2b: '#2ECC71',
  /** Histone H3 */
  h3: '#E74C3C',
  /** Histone H4 */
  h4: '#F39C12',
  /** Histone H1 (linker) */
  h1: '#9B59B6',
  /** Nucleosome */
  nucleosome: '#85C1E9',
  /** Histone tail */
  histoneTail: '#F5B041',
  /** Octamer core */
  octamerCore: '#5DADE2',
};

// =============================================================================
// LABORATORY TECHNIQUE COLORS
// =============================================================================

/**
 * PCR and gel electrophoresis colors
 */
export const labTechniqueColors = {
  /** PCR primer */
  primer: '#E74C3C',
  /** Taq polymerase */
  taqPolymerase: '#27AE60',
  /** dNTPs */
  dntps: '#3498DB',
  /** Agarose gel */
  agaroseGel: '#F5F5DC',
  /** DNA band */
  dnaBand: '#27AE60',
  /** Ladder/marker */
  ladder: '#9B59B6',
  /** Loading dye */
  loadingDye: '#3498DB',
  /** Ethidium bromide stain */
  ethidiumBromide: '#FF6B6B',
  /** Restriction enzyme */
  restrictionEnzyme: '#E74C3C',
  /** Ligation */
  ligation: '#27AE60',
  /** Plasmid vector */
  plasmidVector: '#3498DB',
  /** Insert */
  insert: '#F39C12',
};

/**
 * Sequencing colors
 */
export const sequencingColors = {
  /** ddATP - green */
  ddATP: '#27AE60',
  /** ddCTP - blue */
  ddCTP: '#3498DB',
  /** ddGTP - yellow */
  ddGTP: '#F1C40F',
  /** ddTTP - red */
  ddTTP: '#E74C3C',
  /** Chromatogram peak A */
  peakA: '#27AE60',
  /** Chromatogram peak C */
  peakC: '#3498DB',
  /** Chromatogram peak G */
  peakG: '#F1C40F',
  /** Chromatogram peak T */
  peakT: '#E74C3C',
  /** Sequencing read */
  sequencingRead: '#9B59B6',
  /** Quality score high */
  qualityHigh: '#27AE60',
  /** Quality score low */
  qualityLow: '#E74C3C',
};

/**
 * Blotting technique colors
 */
export const blottingColors = {
  /** SDS-PAGE gel */
  sdsPage: '#F5F5DC',
  /** Protein band */
  proteinBand: '#3498DB',
  /** Transfer membrane */
  membrane: '#FFFFFF',
  /** Primary antibody */
  primaryAb: '#27AE60',
  /** Secondary antibody */
  secondaryAb: '#E74C3C',
  /** HRP conjugate */
  hrp: '#F39C12',
  /** ECL detection */
  ecl: '#F1C40F',
  /** Loading control */
  loadingControl: '#9B59B6',
};

// =============================================================================
// SEVERITY AND STATUS GRADIENTS
// =============================================================================

/**
 * Expression level gradient
 */
export const expressionGradient = {
  /** No expression */
  none: '#FFFFFF',
  /** Low expression */
  low: '#AED6F1',
  /** Medium expression */
  medium: '#5DADE2',
  /** High expression */
  high: '#2980B9',
  /** Very high expression */
  veryHigh: '#1A5276',
};

/**
 * Activity gradient
 */
export const activityGradient = {
  /** Inactive */
  inactive: '#BDC3C7',
  /** Low activity */
  low: '#F9E79F',
  /** Medium activity */
  medium: '#F7DC6F',
  /** High activity */
  high: '#F1C40F',
  /** Maximum activity */
  maximum: '#D4AC0D',
};

/**
 * Severity gradient for mutations/effects
 */
export const severityGradient = {
  /** Benign */
  benign: '#27AE60',
  /** Likely benign */
  likelyBenign: '#82E0AA',
  /** Uncertain significance */
  uncertain: '#F39C12',
  /** Likely pathogenic */
  likelyPathogenic: '#E67E22',
  /** Pathogenic */
  pathogenic: '#E74C3C',
};

// =============================================================================
// FLOWCHART COLORS
// =============================================================================

/**
 * Decision flowchart node colors for molecular biology
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
  /** DNA-related */
  dnaNode: '#2980B9',
  /** RNA-related */
  rnaNode: '#E74C3C',
  /** Protein-related */
  proteinNode: '#27AE60',
  /** Enzyme activity */
  enzymeNode: '#F39C12',
};

// =============================================================================
// COMPLETE MOLECULAR BIOLOGY COLOR SCHEME
// =============================================================================

/**
 * Complete molecular biology color scheme export
 */
export const molecularBiologyColorScheme = {
  // Nucleic acids
  dna: dnaColors,
  nucleotide: nucleotideColors,
  rna: rnaColors,

  // Proteins
  protein: proteinColors,
  aminoAcid: aminoAcidColors,
  enzyme: enzymeColors,

  // Central dogma processes
  replication: replicationColors,
  transcription: transcriptionColors,
  translation: translationColors,

  // Regulation
  regulation: regulationColors,
  crispr: crisprColors,
  epigenetics: epigeneticsColors,
  histone: histoneColors,

  // Laboratory
  labTechnique: labTechniqueColors,
  sequencing: sequencingColors,
  blotting: blottingColors,

  // Gradients
  expression: expressionGradient,
  activity: activityGradient,
  severity: severityGradient,
  flowchart: flowchartColors,

  // Quick access to commonly used colors
  common: {
    dna: '#3498DB',
    rna: '#E74C3C',
    protein: '#27AE60',
    enzyme: '#F39C12',
    active: '#27AE60',
    inactive: '#95A5A6',
    adenine: '#27AE60',
    thymine: '#E74C3C',
    guanine: '#F39C12',
    cytosine: '#3498DB',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type DNAColors = typeof dnaColors;
export type NucleotideColors = typeof nucleotideColors;
export type RNAColors = typeof rnaColors;
export type ProteinColors = typeof proteinColors;
export type AminoAcidColors = typeof aminoAcidColors;
export type EnzymeColors = typeof enzymeColors;
export type ReplicationColors = typeof replicationColors;
export type TranscriptionColors = typeof transcriptionColors;
export type TranslationColors = typeof translationColors;
export type RegulationColors = typeof regulationColors;
export type CRISPRColors = typeof crisprColors;
export type EpigeneticsColors = typeof epigeneticsColors;
export type HistoneColors = typeof histoneColors;
export type LabTechniqueColors = typeof labTechniqueColors;
export type SequencingColors = typeof sequencingColors;
export type BlottingColors = typeof blottingColors;
export type ExpressionGradient = typeof expressionGradient;
export type ActivityGradient = typeof activityGradient;
export type SeverityGradient = typeof severityGradient;
export type FlowchartColors = typeof flowchartColors;
export type MolecularBiologyColorScheme = typeof molecularBiologyColorScheme;

export default molecularBiologyColorScheme;
