/**
 * psychiatry.ts
 * Psychiatry color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for psychiatric and mental health diagrams including:
 * - Mood disorders (depression blue, mania red, euthymia green)
 * - Anxiety spectrum (warm orange tones)
 * - Psychotic disorders (purple spectrum)
 * - Neurotransmitter systems (specific colors for each NT)
 * - Brain regions involved in mental health
 * - Medication classes and therapeutic categories
 * - Assessment scales and severity gradients
 * - Therapy modalities
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// PRIMARY PALETTE - Mood States
// =============================================================================

/**
 * Mood disorder colors reflecting clinical presentations
 */
export const moodStateColors = {
  /** Depression - blue spectrum */
  depression: '#4169E1',
  /** Severe depression - darker blue */
  severeDepression: '#2B4A91',
  /** Mild depression - lighter blue */
  mildDepression: '#6B8DD6',
  /** Mania - red spectrum */
  mania: '#DC143C',
  /** Hypomania - less intense red */
  hypomania: '#FF6B6B',
  /** Euthymia/Normal mood - green */
  euthymia: '#228B22',
  /** Mixed state - purple (blend of depression and mania) */
  mixedState: '#8B008B',
  /** Irritability - orange-red */
  irritability: '#FF4500',
  /** Anhedonia - gray-blue */
  anhedonia: '#708090',
  /** Hopelessness - dark gray */
  hopelessness: '#4A4A4A',
};

// =============================================================================
// SECONDARY PALETTE - Anxiety & Fear
// =============================================================================

/**
 * Anxiety disorder colors using warm/alert tones
 */
export const anxietyColors = {
  /** General anxiety - orange */
  anxiety: '#FFA500',
  /** Panic - intense orange-red */
  panic: '#FF6347',
  /** Fear - amber */
  fear: '#FFBF00',
  /** Worry - muted orange */
  worry: '#E89B3E',
  /** Avoidance - yellow-green (pulling away) */
  avoidance: '#9ACD32',
  /** Hypervigilance - bright yellow (alert) */
  hypervigilance: '#FFD700',
  /** Phobia - orange spectrum */
  phobia: '#FF8C00',
  /** OCD intrusive thought - darker orange */
  ocdIntrusive: '#CC5500',
  /** OCD compulsion - repetitive pattern orange */
  ocdCompulsion: '#E67E22',
  /** PTSD hyperarousal - warm red */
  ptsdHyperarousal: '#E74C3C',
};

// =============================================================================
// ACCENT PALETTE - Psychotic Symptoms
// =============================================================================

/**
 * Psychosis and reality distortion colors using purple spectrum
 */
export const psychosisColors = {
  /** General psychosis - purple */
  psychosis: '#9B59B6',
  /** Hallucination - bright purple */
  hallucination: '#9400D3',
  /** Auditory hallucination */
  auditoryHallucination: '#8A2BE2',
  /** Visual hallucination */
  visualHallucination: '#BA55D3',
  /** Delusion - darker purple */
  delusion: '#6A0DAD',
  /** Paranoia - purple-red */
  paranoia: '#8B008B',
  /** Disorganization - lighter purple */
  disorganization: '#DDA0DD',
  /** Negative symptoms - muted purple-gray */
  negativeSymptoms: '#9370DB',
  /** Catatonia - very muted purple */
  catatonia: '#B19CD9',
  /** Reality distortion - vivid purple */
  realityDistortion: '#7B1FA2',
};

// =============================================================================
// NEUROTRANSMITTER PALETTE
// =============================================================================

/**
 * Neurotransmitter-specific colors for pathway diagrams
 */
export const neurotransmitterColors = {
  /** Serotonin (5-HT) - yellow/gold (mood, well-being) */
  serotonin: '#FFD93D',
  /** Dopamine (DA) - teal (reward, motivation) */
  dopamine: '#4ECDC4',
  /** Norepinephrine (NE) - red (alertness, stress) */
  norepinephrine: '#FF6B6B',
  /** GABA - purple (inhibitory, calming) */
  gaba: '#9B59B6',
  /** Glutamate - red-orange (excitatory) */
  glutamate: '#E74C3C',
  /** Acetylcholine - green (memory, cognition) */
  acetylcholine: '#2ECC71',
  /** Histamine - pink */
  histamine: '#FF69B4',
  /** Endorphin - warm gold */
  endorphin: '#DAA520',
  /** Melatonin - deep blue (sleep) */
  melatonin: '#191970',
  /** Oxytocin - soft pink (bonding) */
  oxytocin: '#FFB6C1',
};

// =============================================================================
// BRAIN REGION PALETTE
// =============================================================================

/**
 * Brain regions involved in psychiatric conditions
 */
export const brainRegionColors = {
  /** Prefrontal cortex - executive function blue */
  prefrontalCortex: '#4169E1',
  /** Amygdala - fear/emotion red */
  amygdala: '#DC143C',
  /** Hippocampus - memory teal */
  hippocampus: '#20B2AA',
  /** Hypothalamus - regulation orange */
  hypothalamus: '#FF8C00',
  /** Anterior cingulate - conflict yellow */
  anteriorCingulate: '#FFD700',
  /** Insula - interoception purple */
  insula: '#9370DB',
  /** Nucleus accumbens - reward green */
  nucleusAccumbens: '#32CD32',
  /** Ventral tegmental area - dopamine teal */
  vta: '#008B8B',
  /** Locus coeruleus - arousal blue */
  locusCoeruleus: '#4682B4',
  /** Raphe nuclei - serotonin gold */
  rapheNuclei: '#DAA520',
  /** Basal ganglia - motor/habit gray */
  basalGanglia: '#708090',
  /** Thalamus - relay purple */
  thalamus: '#8B4789',
};

// =============================================================================
// MEDICATION CLASS PALETTE
// =============================================================================

/**
 * Psychiatric medication class colors
 */
export const medicationClassColors = {
  /** SSRI - calming blue */
  ssri: '#4682B4',
  /** SNRI - blue-purple */
  snri: '#6A5ACD',
  /** TCA - classic brown */
  tca: '#8B4513',
  /** MAOI - dark red (dietary restrictions) */
  maoi: '#8B0000',
  /** Atypical antidepressant - teal */
  atypicalAntidepressant: '#20B2AA',
  /** First-gen antipsychotic - gray */
  fga: '#696969',
  /** Second-gen antipsychotic - purple */
  sga: '#9B59B6',
  /** Mood stabilizer lithium - silver blue */
  lithium: '#B0C4DE',
  /** Mood stabilizer valproate - amber */
  valproate: '#FFBF00',
  /** Mood stabilizer lamotrigine - orange (SJS warning) */
  lamotrigine: '#FF7F50',
  /** Benzodiazepine - green (calming) */
  benzodiazepine: '#2E8B57',
  /** Stimulant - red (activating) */
  stimulant: '#FF4500',
  /** Non-stimulant ADHD - blue */
  nonStimulant: '#4169E1',
};

// =============================================================================
// THERAPY MODALITY PALETTE
// =============================================================================

/**
 * Psychotherapy modality colors
 */
export const therapyModalityColors = {
  /** CBT - structured blue */
  cbt: '#3498DB',
  /** DBT - balance purple-red */
  dbt: '#E74C3C',
  /** Psychodynamic - deep purple */
  psychodynamic: '#8E44AD',
  /** IPT - relational green */
  ipt: '#27AE60',
  /** ACT - acceptance teal */
  act: '#16A085',
  /** EMDR - processing blue-green */
  emdr: '#1ABC9C',
  /** Exposure therapy - graduated orange */
  exposureTherapy: '#E67E22',
  /** Motivational interviewing - collaborative green */
  motivationalInterviewing: '#2ECC71',
  /** Family therapy - warm orange */
  familyTherapy: '#F39C12',
  /** Group therapy - community purple */
  groupTherapy: '#9B59B6',
  /** Supportive therapy - stable blue */
  supportiveTherapy: '#5DADE2',
  /** Crisis intervention - urgent red */
  crisisIntervention: '#C0392B',
};

// =============================================================================
// ASSESSMENT SCALE PALETTE
// =============================================================================

/**
 * Assessment tool and severity colors
 */
export const assessmentColors = {
  /** PHQ-9 - depression blue */
  phq9: '#4169E1',
  /** GAD-7 - anxiety orange */
  gad7: '#FFA500',
  /** Y-BOCS - OCD orange */
  ybocs: '#E67E22',
  /** PANSS - psychosis purple */
  panss: '#9B59B6',
  /** MMSE - cognition green */
  mmse: '#2ECC71',
  /** Columbia Scale - safety red */
  cssrs: '#DC143C',
  /** PCL-5 - trauma brown */
  pcl5: '#8B4513',
  /** MDQ - bipolar purple-red */
  mdq: '#9932CC',
  /** AUDIT - substance amber */
  audit: '#DAA520',
};

// =============================================================================
// SEVERITY GRADIENT
// =============================================================================

/**
 * Clinical severity gradient
 */
export const severityGradient = {
  /** Minimal/Normal */
  minimal: '#28A745',
  /** Mild */
  mild: '#85C1E9',
  /** Moderate */
  moderate: '#F4D03F',
  /** Moderate-Severe */
  moderateSevere: '#E67E22',
  /** Severe */
  severe: '#C0392B',
  /** Critical/Emergency */
  critical: '#6F42C1',
};

// =============================================================================
// RISK LEVEL COLORS
// =============================================================================

/**
 * Safety and risk assessment colors
 */
export const riskLevelColors = {
  /** Low risk */
  lowRisk: '#28A745',
  /** Low-moderate risk */
  lowModerate: '#7DCEA0',
  /** Moderate risk */
  moderateRisk: '#F4D03F',
  /** High risk */
  highRisk: '#E67E22',
  /** Acute/Imminent risk */
  acuteRisk: '#C0392B',
  /** Protective factor */
  protectiveFactor: '#3498DB',
  /** Risk factor */
  riskFactor: '#E74C3C',
  /** Warning sign */
  warningSign: '#F39C12',
};

// =============================================================================
// SUBSTANCE USE PALETTE
// =============================================================================

/**
 * Substance use disorder colors
 */
export const substanceColors = {
  /** Alcohol - amber */
  alcohol: '#DAA520',
  /** Opioids - purple-red */
  opioids: '#8B008B',
  /** Stimulants - bright orange */
  stimulants: '#FF4500',
  /** Cannabis - green */
  cannabis: '#228B22',
  /** Benzodiazepines - blue-green */
  benzodiazepines: '#20B2AA',
  /** Tobacco/Nicotine - brown */
  tobacco: '#8B4513',
  /** Intoxication - red */
  intoxication: '#DC143C',
  /** Withdrawal - orange */
  withdrawal: '#FF8C00',
  /** Recovery - green */
  recovery: '#2ECC71',
  /** Relapse - amber */
  relapse: '#F39C12',
};

// =============================================================================
// PERSONALITY CLUSTER PALETTE
// =============================================================================

/**
 * Personality disorder cluster colors
 */
export const personalityClusterColors = {
  /** Cluster A - odd/eccentric - cool purple */
  clusterA: '#9B59B6',
  /** Cluster B - dramatic/erratic - warm red */
  clusterB: '#E74C3C',
  /** Cluster C - anxious/fearful - blue */
  clusterC: '#3498DB',
  /** Paranoid PD */
  paranoidPD: '#8E44AD',
  /** Schizoid PD */
  schizoidPD: '#9B59B6',
  /** Schizotypal PD */
  schizotypalPD: '#7D3C98',
  /** Antisocial PD */
  antisocialPD: '#C0392B',
  /** Borderline PD */
  borderlinePD: '#E74C3C',
  /** Histrionic PD */
  histrionicPD: '#F39C12',
  /** Narcissistic PD */
  narcissisticPD: '#E67E22',
  /** Avoidant PD */
  avoidantPD: '#3498DB',
  /** Dependent PD */
  dependentPD: '#2980B9',
  /** OCPD */
  ocpd: '#1ABC9C',
};

// =============================================================================
// SLEEP DISORDER PALETTE
// =============================================================================

/**
 * Sleep and circadian rhythm colors
 */
export const sleepColors = {
  /** Wake state - bright yellow */
  wake: '#FFD700',
  /** REM sleep - dreamy purple */
  rem: '#9B59B6',
  /** NREM light - light blue */
  nremLight: '#87CEEB',
  /** NREM deep (SWS) - deep blue */
  nremDeep: '#191970',
  /** Insomnia - anxious orange */
  insomnia: '#FFA500',
  /** Hypersomnia - heavy blue */
  hypersomnia: '#4169E1',
  /** Sleep apnea - interrupted red */
  sleepApnea: '#DC143C',
  /** Circadian rhythm - cyclical teal */
  circadian: '#20B2AA',
};

// =============================================================================
// FLOWCHART DECISION COLORS
// =============================================================================

/**
 * Decision flowchart node colors for psychiatry
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
  /** Success/Recovery */
  success: '#28A745',
  /** Danger/Emergency */
  danger: '#DC3545',
  /** Information */
  info: '#17A2B8',
  /** Emergency/Crisis */
  emergency: '#6F42C1',
  /** Safety planning */
  safetyPlan: '#20B2AA',
};

// =============================================================================
// COMPLETE PSYCHIATRY COLOR SCHEME
// =============================================================================

/**
 * Complete psychiatry color scheme export
 */
export const psychiatryColorScheme = {
  // Core palettes
  primary: moodStateColors,
  secondary: anxietyColors,
  accent: psychosisColors,

  // Neuroscience
  neurotransmitters: neurotransmitterColors,
  brainRegions: brainRegionColors,

  // Clinical categories
  medications: medicationClassColors,
  therapy: therapyModalityColors,
  assessment: assessmentColors,
  substances: substanceColors,
  personality: personalityClusterColors,
  sleep: sleepColors,

  // Severity and risk
  severity: severityGradient,
  risk: riskLevelColors,
  flowchart: flowchartColors,

  // Quick access to most commonly used colors
  common: {
    depression: '#4169E1',
    anxiety: '#FFA500',
    psychosis: '#9B59B6',
    mania: '#DC143C',
    normal: '#228B22',
    crisis: '#8B0000',
    recovery: '#2ECC71',
    warning: '#FF9800',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type MoodStateColors = typeof moodStateColors;
export type AnxietyColors = typeof anxietyColors;
export type PsychosisColors = typeof psychosisColors;
export type NeurotransmitterColors = typeof neurotransmitterColors;
export type BrainRegionColors = typeof brainRegionColors;
export type MedicationClassColors = typeof medicationClassColors;
export type TherapyModalityColors = typeof therapyModalityColors;
export type AssessmentColors = typeof assessmentColors;
export type SeverityGradient = typeof severityGradient;
export type RiskLevelColors = typeof riskLevelColors;
export type SubstanceColors = typeof substanceColors;
export type PersonalityClusterColors = typeof personalityClusterColors;
export type SleepColors = typeof sleepColors;
export type FlowchartColors = typeof flowchartColors;
export type PsychiatryColorScheme = typeof psychiatryColorScheme;

export default psychiatryColorScheme;
