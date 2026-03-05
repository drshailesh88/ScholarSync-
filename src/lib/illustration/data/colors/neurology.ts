/**
 * neurology.ts
 * Neurology color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for neurological medicine diagrams including:
 * - Brain tissue and neural structures (gray/pink spectrum)
 * - Neural pathways (motor red, sensory blue, mixed purple)
 * - Pathological conditions (stroke red, demyelination orange)
 * - Diagnostic categories and clinical severity
 * - EEG waveforms and neuroimaging
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// PRIMARY PALETTE - Brain Tissue (Gray/Pink)
// =============================================================================

/**
 * Brain anatomy colors for cortex, white matter, and deep structures
 */
export const brainTissueColors = {
  /** Gray matter - cerebral cortex */
  grayMatter: '#B8A8A0',
  /** White matter - axon tracts */
  whiteMatter: '#F5E6E0',
  /** Cortical surface */
  corticalSurface: '#D4C4BC',
  /** Subcortical gray */
  subcorticalGray: '#9E8E86',
  /** Basal ganglia */
  basalGanglia: '#C4A898',
  /** Thalamus */
  thalamus: '#D4B4A4',
  /** Hypothalamus */
  hypothalamus: '#E4C4B4',
  /** Hippocampus */
  hippocampus: '#CABA9A',
  /** Amygdala */
  amygdala: '#DACA8A',
  /** Brainstem */
  brainstem: '#A49484',
  /** Cerebellum cortex */
  cerebellumCortex: '#C4B4A4',
  /** Cerebellum white */
  cerebellumWhite: '#E4D4C4',
};

// =============================================================================
// SECONDARY PALETTE - Neural Pathways
// =============================================================================

/**
 * Neural pathway colors for motor, sensory, and mixed tracts
 */
export const neuralPathwayColors = {
  /** Motor pathways (corticospinal, corticobulbar) */
  motorPathway: '#DC143C',
  /** Sensory pathways (spinothalamic, dorsal columns) */
  sensoryPathway: '#4169E1',
  /** Mixed pathways */
  mixedPathway: '#9932CC',
  /** Autonomic sympathetic */
  sympathetic: '#FF6B6B',
  /** Autonomic parasympathetic */
  parasympathetic: '#4ECDC4',
  /** Ascending tract */
  ascendingTract: '#3498DB',
  /** Descending tract */
  descendingTract: '#E74C3C',
  /** Interneuron */
  interneuron: '#95A5A6',
  /** Commissural fibers */
  commissural: '#9B59B6',
  /** Projection fibers */
  projection: '#E67E22',
  /** Association fibers */
  association: '#1ABC9C',
};

// =============================================================================
// ACCENT PALETTE - Neurons & Synapses
// =============================================================================

/**
 * Neuron and synapse component colors
 */
export const neuronColors = {
  /** Cell body (soma) */
  soma: '#FFD93D',
  /** Dendrites */
  dendrite: '#6BCB77',
  /** Axon */
  axon: '#4D96FF',
  /** Myelin sheath */
  myelinSheath: '#F7F7F7',
  /** Node of Ranvier */
  nodeOfRanvier: '#FF6B6B',
  /** Synaptic terminal */
  synapticTerminal: '#FF9F43',
  /** Synaptic vesicle */
  synapticVesicle: '#A8E6CF',
  /** Neurotransmitter */
  neurotransmitter: '#FF6B9D',
  /** Receptor */
  receptor: '#C3AED6',
  /** Action potential */
  actionPotential: '#FFE66D',
  /** Resting potential */
  restingPotential: '#95E1D3',
};

// =============================================================================
// PATHOLOGY PALETTE - Disease States
// =============================================================================

/**
 * Neurological pathology colors
 */
export const neuroPathologyColors = {
  /** Ischemic stroke / infarct */
  ischemicStroke: '#8B0000',
  /** Hemorrhagic stroke */
  hemorrhagicStroke: '#DC143C',
  /** Penumbra (at-risk tissue) */
  penumbra: '#FF6347',
  /** Brain tumor */
  brainTumor: '#8E44AD',
  /** Glioma */
  glioma: '#9B59B6',
  /** Meningioma */
  meningioma: '#C39BD3',
  /** Metastasis */
  metastasis: '#7D3C98',
  /** Demyelination / MS plaque */
  demyelination: '#FF8C00',
  /** Edema */
  edema: '#74B9FF',
  /** Inflammation */
  inflammation: '#FF6B6B',
  /** Necrosis */
  necrosis: '#2C3E50',
  /** Gliosis */
  gliosis: '#BDC3C7',
  /** Atrophy */
  atrophy: '#95A5A6',
  /** Hydrocephalus / CSF */
  hydrocephalus: '#00CED1',
  /** Aneurysm */
  aneurysm: '#E74C3C',
  /** AVM */
  avm: '#C0392B',
};

// =============================================================================
// SPINAL CORD COLORS
// =============================================================================

/**
 * Spinal cord anatomy colors
 */
export const spinalCordColors = {
  /** Spinal gray matter */
  spinalGray: '#A89890',
  /** Spinal white matter */
  spinalWhite: '#E8DCD8',
  /** Dorsal horn */
  dorsalHorn: '#B8A8A0',
  /** Ventral horn */
  ventralHorn: '#C8B8B0',
  /** Central canal */
  centralCanal: '#87CEEB',
  /** Dorsal root */
  dorsalRoot: '#4169E1',
  /** Ventral root */
  ventralRoot: '#DC143C',
  /** Dorsal root ganglion */
  dorsalRootGanglion: '#FFD700',
  /** Lateral corticospinal */
  lateralCorticospinal: '#E74C3C',
  /** Dorsal columns */
  dorsalColumns: '#3498DB',
  /** Spinothalamic */
  spinothalamic: '#2980B9',
};

// =============================================================================
// CRANIAL NERVE COLORS
// =============================================================================

/**
 * Cranial nerve colors for individual nerves
 */
export const cranialNerveColors = {
  /** CN I - Olfactory */
  cnI: '#9B59B6',
  /** CN II - Optic */
  cnII: '#3498DB',
  /** CN III - Oculomotor */
  cnIII: '#E74C3C',
  /** CN IV - Trochlear */
  cnIV: '#E67E22',
  /** CN V - Trigeminal */
  cnV: '#F1C40F',
  /** CN VI - Abducens */
  cnVI: '#1ABC9C',
  /** CN VII - Facial */
  cnVII: '#2ECC71',
  /** CN VIII - Vestibulocochlear */
  cnVIII: '#16A085',
  /** CN IX - Glossopharyngeal */
  cnIX: '#27AE60',
  /** CN X - Vagus */
  cnX: '#2980B9',
  /** CN XI - Accessory */
  cnXI: '#8E44AD',
  /** CN XII - Hypoglossal */
  cnXII: '#C0392B',
};

// =============================================================================
// EEG WAVEFORM COLORS
// =============================================================================

/**
 * EEG and neurophysiology waveform colors
 */
export const eegColors = {
  /** Alpha rhythm (8-13 Hz) */
  alphaRhythm: '#2ECC71',
  /** Beta rhythm (13-30 Hz) */
  betaRhythm: '#3498DB',
  /** Theta rhythm (4-8 Hz) */
  thetaRhythm: '#F39C12',
  /** Delta rhythm (<4 Hz) */
  deltaRhythm: '#E74C3C',
  /** Gamma rhythm (>30 Hz) */
  gammaRhythm: '#9B59B6',
  /** Spike wave */
  spikeWave: '#C0392B',
  /** Sharp wave */
  sharpWave: '#E67E22',
  /** Epileptiform discharge */
  epileptiformDischarge: '#DC143C',
  /** Burst suppression */
  burstSuppression: '#7F8C8D',
  /** Isoelectric */
  isoelectric: '#BDC3C7',
  /** Normal background */
  normalBackground: '#27AE60',
  /** Artifact */
  artifact: '#95A5A6',
};

// =============================================================================
// NEUROIMAGING COLORS
// =============================================================================

/**
 * Neuroimaging color coding
 */
export const neuroimagingColors = {
  /** DWI bright (acute stroke) */
  dwiBright: '#FFFFFF',
  /** ADC dark */
  adcDark: '#2C3E50',
  /** FLAIR hyperintense */
  flairHyperintense: '#E8E8E8',
  /** T1 hyperintense (blood) */
  t1Hyperintense: '#D4D4D4',
  /** T2 hyperintense (edema) */
  t2Hyperintense: '#C0C0C0',
  /** Contrast enhancement */
  contrastEnhancement: '#F5F5F5',
  /** GRE blooming (blood) */
  greBlooming: '#1A1A1A',
  /** Normal brain CT */
  normalBrainCT: '#808080',
  /** Acute blood CT */
  acuteBloodCT: '#FFFFFF',
  /** Old blood CT */
  oldBloodCT: '#404040',
  /** CSF on CT */
  csfCT: '#2C2C2C',
};

// =============================================================================
// CLINICAL SEVERITY GRADIENT
// =============================================================================

/**
 * Severity gradient for neurological conditions
 */
export const severityGradient = {
  /** Normal/Intact */
  normal: '#28A745',
  /** Mild impairment */
  mild: '#FFC107',
  /** Moderate impairment */
  moderate: '#FD7E14',
  /** Severe impairment */
  severe: '#DC3545',
  /** Critical/Emergency */
  critical: '#6F42C1',
};

// =============================================================================
// NIHSS SCORE COLORS
// =============================================================================

/**
 * NIH Stroke Scale severity coloring
 */
export const nihssColors = {
  /** No stroke (0) */
  noStroke: '#28A745',
  /** Minor stroke (1-4) */
  minorStroke: '#85C1E9',
  /** Moderate stroke (5-15) */
  moderateStroke: '#F4D03F',
  /** Moderate-severe (16-20) */
  moderateSevere: '#E67E22',
  /** Severe stroke (21-42) */
  severeStroke: '#C0392B',
};

// =============================================================================
// GLASGOW COMA SCALE COLORS
// =============================================================================

/**
 * GCS severity coloring
 */
export const gcsColors = {
  /** Mild TBI (13-15) */
  mildTBI: '#2ECC71',
  /** Moderate TBI (9-12) */
  moderateTBI: '#F39C12',
  /** Severe TBI (3-8) */
  severeTBI: '#E74C3C',
};

// =============================================================================
// MOVEMENT DISORDER COLORS
// =============================================================================

/**
 * Movement disorder related colors
 */
export const movementDisorderColors = {
  /** Parkinson's / bradykinesia */
  parkinson: '#3498DB',
  /** Tremor */
  tremor: '#E67E22',
  /** Dystonia */
  dystonia: '#9B59B6',
  /** Chorea */
  chorea: '#E74C3C',
  /** Ataxia */
  ataxia: '#1ABC9C',
  /** Myoclonus */
  myoclonus: '#F1C40F',
  /** Tics */
  tics: '#27AE60',
  /** Rigidity */
  rigidity: '#7F8C8D',
  /** Spasticity */
  spasticity: '#C0392B',
};

// =============================================================================
// FLOWCHART DECISION COLORS
// =============================================================================

/**
 * Decision flowchart node colors
 */
export const flowchartColors = {
  /** Start/End nodes */
  terminal: '#4CAF50',
  /** Decision nodes */
  decision: '#FFC107',
  /** Process nodes */
  process: '#2196F3',
  /** Action required */
  action: '#FF5722',
  /** Warning/Caution */
  warning: '#FF9800',
  /** Success/Positive outcome */
  success: '#28A745',
  /** Failure/Negative outcome */
  failure: '#DC3545',
  /** Information */
  info: '#17A2B8',
  /** Emergency/Urgent */
  emergency: '#6F42C1',
};

// =============================================================================
// COMPLETE NEUROLOGY COLOR SCHEME
// =============================================================================

/**
 * Complete neurology color scheme export
 */
export const neurologyColorScheme = {
  // Core palette
  primary: brainTissueColors,
  secondary: neuralPathwayColors,
  accent: neuronColors,
  pathology: neuroPathologyColors,

  // Anatomical structures
  spinalCord: spinalCordColors,
  cranialNerves: cranialNerveColors,

  // Diagnostic categories
  eeg: eegColors,
  neuroimaging: neuroimagingColors,
  nihss: nihssColors,
  gcs: gcsColors,
  movementDisorder: movementDisorderColors,

  // Clinical categories
  severity: severityGradient,
  flowchart: flowchartColors,

  // Quick access to most commonly used colors
  common: {
    grayMatter: '#B8A8A0',
    whiteMatter: '#F5E6E0',
    motor: '#DC143C',
    sensory: '#4169E1',
    stroke: '#8B0000',
    demyelination: '#FF8C00',
    tumor: '#8E44AD',
    normal: '#28A745',
    abnormal: '#DC3545',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type BrainTissueColors = typeof brainTissueColors;
export type NeuralPathwayColors = typeof neuralPathwayColors;
export type NeuronColors = typeof neuronColors;
export type NeuroPathologyColors = typeof neuroPathologyColors;
export type SpinalCordColors = typeof spinalCordColors;
export type CranialNerveColors = typeof cranialNerveColors;
export type EEGColors = typeof eegColors;
export type NeuroimagingColors = typeof neuroimagingColors;
export type NIHSSColors = typeof nihssColors;
export type GCSColors = typeof gcsColors;
export type MovementDisorderColors = typeof movementDisorderColors;
export type SeverityGradient = typeof severityGradient;
export type FlowchartColors = typeof flowchartColors;
export type NeurologyColorScheme = typeof neurologyColorScheme;

export default neurologyColorScheme;
