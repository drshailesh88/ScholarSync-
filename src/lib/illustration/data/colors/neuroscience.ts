/**
 * neuroscience.ts
 * Neuroscience Research color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for neuroscience research diagrams including:
 * - Brain regions and structures
 * - Neural activity (excitatory/inhibitory)
 * - Neuroimaging modalities
 * - Electrophysiology signals
 * - Optogenetics wavelengths
 * - Connectomics networks
 * - Behavioral paradigm elements
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// PRIMARY PALETTE - Neural Activity
// =============================================================================

/**
 * Neural activity and signaling colors
 */
export const neuralActivityColors = {
  /** Excitatory neuron/activity - green */
  excitatory: '#27AE60',
  /** Inhibitory neuron/activity - red */
  inhibitory: '#E74C3C',
  /** Modulatory neuron (neuromodulation) - blue */
  modulatory: '#3498DB',
  /** Glutamatergic */
  glutamate: '#27AE60',
  /** GABAergic */
  gaba: '#E74C3C',
  /** Dopaminergic */
  dopamine: '#9B59B6',
  /** Serotonergic */
  serotonin: '#F39C12',
  /** Cholinergic */
  acetylcholine: '#3498DB',
  /** Noradrenergic */
  norepinephrine: '#E74C3C',
  /** Active/firing */
  active: '#27AE60',
  /** Inactive/silent */
  inactive: '#95A5A6',
};

// =============================================================================
// BRAIN REGION COLORS
// =============================================================================

/**
 * Major brain region colors
 */
export const brainRegionColors = {
  /** Prefrontal cortex */
  prefrontal: '#9B59B6',
  /** Motor cortex */
  motor: '#E74C3C',
  /** Somatosensory cortex */
  somatosensory: '#3498DB',
  /** Visual cortex */
  visual: '#27AE60',
  /** Auditory cortex */
  auditory: '#F39C12',
  /** Temporal lobe */
  temporal: '#E67E22',
  /** Parietal lobe */
  parietal: '#1ABC9C',
  /** Occipital lobe */
  occipital: '#27AE60',
  /** Frontal lobe */
  frontal: '#9B59B6',
  /** Hippocampus */
  hippocampus: '#16A085',
  /** Amygdala */
  amygdala: '#E74C3C',
  /** Thalamus */
  thalamus: '#F39C12',
  /** Hypothalamus */
  hypothalamus: '#E67E22',
  /** Basal ganglia */
  basalGanglia: '#8E44AD',
  /** Striatum */
  striatum: '#9B59B6',
  /** Cerebellum */
  cerebellum: '#3498DB',
  /** Brainstem */
  brainstem: '#2C3E50',
  /** Spinal cord */
  spinalCord: '#7F8C8D',
};

// =============================================================================
// NEUROIMAGING COLORS
// =============================================================================

/**
 * Neuroimaging modality colors
 */
export const neuroimagingColors = {
  /** fMRI BOLD signal positive */
  boldPositive: '#E74C3C',
  /** fMRI BOLD signal negative */
  boldNegative: '#3498DB',
  /** T1-weighted MRI */
  t1Weighted: '#95A5A6',
  /** T2-weighted MRI */
  t2Weighted: '#BDC3C7',
  /** DTI/DWI */
  diffusion: '#27AE60',
  /** PET high uptake */
  petHigh: '#E74C3C',
  /** PET low uptake */
  petLow: '#3498DB',
  /** CT bone */
  ctBone: '#ECF0F1',
  /** CT soft tissue */
  ctTissue: '#95A5A6',
  /** Activation map hot */
  activationHot: '#E74C3C',
  /** Activation map cold */
  activationCold: '#3498DB',
};

// =============================================================================
// ELECTROPHYSIOLOGY COLORS
// =============================================================================

/**
 * Electrophysiology signal colors
 */
export const electrophysiologyColors = {
  /** Action potential */
  actionPotential: '#E74C3C',
  /** Resting potential */
  restingPotential: '#3498DB',
  /** EPSP */
  epsp: '#27AE60',
  /** IPSP */
  ipsp: '#E74C3C',
  /** LFP signal */
  lfp: '#9B59B6',
  /** Spike waveform */
  spikeWaveform: '#2C3E50',
  /** Delta band (0.5-4 Hz) */
  deltaBand: '#3498DB',
  /** Theta band (4-8 Hz) */
  thetaBand: '#27AE60',
  /** Alpha band (8-12 Hz) */
  alphaBand: '#F39C12',
  /** Beta band (12-30 Hz) */
  betaBand: '#E74C3C',
  /** Gamma band (30-100 Hz) */
  gammaBand: '#9B59B6',
  /** High gamma (100+ Hz) */
  highGamma: '#8E44AD',
};

// =============================================================================
// OPTOGENETICS COLORS
// =============================================================================

/**
 * Optogenetics light wavelength colors
 */
export const optogeneticsColors = {
  /** Blue light (470nm) - ChR2 activation */
  blueLight: '#3498DB',
  /** Yellow/Amber light (590nm) - NpHR inhibition */
  yellowLight: '#F39C12',
  /** Red light (630nm) - ReaChR, Chrimson */
  redLight: '#E74C3C',
  /** Green light (530nm) */
  greenLight: '#27AE60',
  /** ChR2 expressing */
  chr2: '#3498DB',
  /** NpHR/eNpHR expressing */
  nphr: '#F39C12',
  /** hM3Dq DREADD */
  hm3dq: '#E74C3C',
  /** hM4Di DREADD */
  hm4di: '#3498DB',
  /** Viral expression */
  viralExpression: '#27AE60',
  /** Fiber optic */
  fiberOptic: '#9B59B6',
};

// =============================================================================
// CONNECTOMICS COLORS
// =============================================================================

/**
 * Connectomics and network colors
 */
export const connectomicsColors = {
  /** Strong connection */
  strongConnection: '#E74C3C',
  /** Medium connection */
  mediumConnection: '#F39C12',
  /** Weak connection */
  weakConnection: '#3498DB',
  /** Hub node */
  hubNode: '#9B59B6',
  /** Module 1 */
  module1: '#E74C3C',
  /** Module 2 */
  module2: '#3498DB',
  /** Module 3 */
  module3: '#27AE60',
  /** Module 4 */
  module4: '#F39C12',
  /** Module 5 */
  module5: '#9B59B6',
  /** Structural connection */
  structural: '#2C3E50',
  /** Functional connection */
  functional: '#27AE60',
  /** Effective connection */
  effective: '#E74C3C',
};

// =============================================================================
// BEHAVIORAL PARADIGM COLORS
// =============================================================================

/**
 * Behavioral paradigm element colors
 */
export const behavioralColors = {
  /** Stimulus presentation */
  stimulus: '#27AE60',
  /** Response period */
  response: '#3498DB',
  /** Feedback positive */
  feedbackPositive: '#27AE60',
  /** Feedback negative */
  feedbackNegative: '#E74C3C',
  /** Cue */
  cue: '#F39C12',
  /** Target */
  target: '#3498DB',
  /** Distractor */
  distractor: '#E74C3C',
  /** Fixation */
  fixation: '#95A5A6',
  /** Delay period */
  delay: '#BDC3C7',
  /** Reward */
  reward: '#27AE60',
  /** Punishment */
  punishment: '#E74C3C',
  /** Baseline */
  baseline: '#95A5A6',
};

// =============================================================================
// PLASTICITY COLORS
// =============================================================================

/**
 * Synaptic plasticity colors
 */
export const plasticityColors = {
  /** LTP (potentiation) */
  ltp: '#27AE60',
  /** LTD (depression) */
  ltd: '#E74C3C',
  /** Spine growth */
  spineGrowth: '#27AE60',
  /** Spine elimination */
  spineElimination: '#E74C3C',
  /** Synaptic strengthening */
  strengthening: '#27AE60',
  /** Synaptic weakening */
  weakening: '#E74C3C',
  /** Hebbian plasticity */
  hebbian: '#9B59B6',
  /** Homeostatic plasticity */
  homeostatic: '#3498DB',
  /** Structural plasticity */
  structural: '#F39C12',
};

// =============================================================================
// CELL TYPE COLORS
// =============================================================================

/**
 * Neural cell type colors
 */
export const cellTypeColors = {
  /** Pyramidal neuron */
  pyramidal: '#9B59B6',
  /** Interneuron */
  interneuron: '#E74C3C',
  /** PV interneuron */
  pvInterneuron: '#E74C3C',
  /** SOM interneuron */
  somInterneuron: '#F39C12',
  /** VIP interneuron */
  vipInterneuron: '#3498DB',
  /** Granule cell */
  granuleCell: '#27AE60',
  /** Purkinje cell */
  purkinjeCell: '#9B59B6',
  /** Astrocyte */
  astrocyte: '#3498DB',
  /** Microglia */
  microglia: '#27AE60',
  /** Oligodendrocyte */
  oligodendrocyte: '#F39C12',
};

// =============================================================================
// SEVERITY/SIGNIFICANCE GRADIENT
// =============================================================================

/**
 * Statistical significance gradient
 */
export const significanceGradient = {
  /** Highly significant p<0.001 */
  highlySignificant: '#E74C3C',
  /** Significant p<0.01 */
  significant: '#F39C12',
  /** Marginally significant p<0.05 */
  marginal: '#F1C40F',
  /** Trending p<0.1 */
  trending: '#BDC3C7',
  /** Not significant */
  notSignificant: '#95A5A6',
};

// =============================================================================
// FLOWCHART COLORS
// =============================================================================

/**
 * Decision flowchart node colors for neuroscience
 */
export const flowchartColors = {
  /** Start/End nodes */
  terminal: '#27AE60',
  /** Decision nodes */
  decision: '#F39C12',
  /** Process nodes */
  process: '#3498DB',
  /** Data/Recording */
  data: '#9B59B6',
  /** Analysis step */
  analysis: '#E74C3C',
  /** Output/Result */
  output: '#27AE60',
  /** Equipment/Hardware */
  equipment: '#2C3E50',
  /** Software/Algorithm */
  software: '#8E44AD',
};

// =============================================================================
// COMPLETE NEUROSCIENCE COLOR SCHEME
// =============================================================================

/**
 * Complete neuroscience research color scheme export
 */
export const neuroscienceColorScheme = {
  // Core palettes
  neuralActivity: neuralActivityColors,
  brainRegion: brainRegionColors,
  neuroimaging: neuroimagingColors,
  electrophysiology: electrophysiologyColors,
  optogenetics: optogeneticsColors,
  connectomics: connectomicsColors,
  behavioral: behavioralColors,
  plasticity: plasticityColors,
  cellType: cellTypeColors,

  // Utility palettes
  significance: significanceGradient,
  flowchart: flowchartColors,

  // Quick access to commonly used colors
  common: {
    excitatory: '#27AE60',
    inhibitory: '#E74C3C',
    active: '#27AE60',
    inactive: '#95A5A6',
    significant: '#E74C3C',
    notSignificant: '#95A5A6',
    stimulus: '#27AE60',
    response: '#3498DB',
    highlight: '#F39C12',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type NeuralActivityColors = typeof neuralActivityColors;
export type BrainRegionColors = typeof brainRegionColors;
export type NeuroimagingColors = typeof neuroimagingColors;
export type ElectrophysiologyColors = typeof electrophysiologyColors;
export type OptogeneticsColors = typeof optogeneticsColors;
export type ConnectomicsColors = typeof connectomicsColors;
export type BehavioralColors = typeof behavioralColors;
export type PlasticityColors = typeof plasticityColors;
export type CellTypeColors = typeof cellTypeColors;
export type SignificanceGradient = typeof significanceGradient;
export type FlowchartColors = typeof flowchartColors;
export type NeuroscienceColorScheme = typeof neuroscienceColorScheme;

export default neuroscienceColorScheme;
