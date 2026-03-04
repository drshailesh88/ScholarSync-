/**
 * ent.ts
 * ENT (Otolaryngology) color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for ear, nose, and throat medicine including:
 * - Ear structures (tympanic membrane, ossicles, cochlea)
 * - Nasal/sinus anatomy (mucosa, turbinates, sinuses)
 * - Throat/larynx (vocal cords, pharynx, epiglottis)
 * - Pathological conditions (inflammation, infection, tumors)
 * - Clinical categories and severity gradients
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// PRIMARY PALETTE - Ear (Warm Beige/Tan)
// =============================================================================

/**
 * Ear anatomy colors
 */
export const earColors = {
  /** External ear/pinna */
  pinna: '#E8D4C4',
  /** Ear canal */
  earCanal: '#D4B8A0',
  /** Tympanic membrane - normal */
  tympanicMembraneNormal: '#F5E6D3',
  /** Tympanic membrane - inflamed */
  tympanicMembraneInflamed: '#E57373',
  /** Malleus */
  malleus: '#D7CCC8',
  /** Incus */
  incus: '#BCAAA4',
  /** Stapes */
  stapes: '#A1887F',
  /** Ossicular chain highlight */
  ossicleHighlight: '#C4B0A0',
  /** Middle ear space */
  middleEarSpace: '#FFF8E1',
  /** Eustachian tube */
  eustachianTube: '#FFCCBC',
};

// =============================================================================
// SECONDARY PALETTE - Inner Ear (Blue/Teal)
// =============================================================================

/**
 * Inner ear and vestibular colors
 */
export const innerEarColors = {
  /** Cochlea */
  cochlea: '#4DB6AC',
  /** Cochlear duct */
  cochlearDuct: '#26A69A',
  /** Organ of Corti */
  organOfCorti: '#009688',
  /** Hair cells */
  hairCells: '#00897B',
  /** Vestibule */
  vestibule: '#80DEEA',
  /** Semicircular canals */
  semicircularCanals: '#4DD0E1',
  /** Endolymph */
  endolymph: '#B2EBF2',
  /** Perilymph */
  perilymph: '#E0F7FA',
  /** Auditory nerve */
  auditoryNerve: '#FFCA28',
  /** Vestibular nerve */
  vestibularNerve: '#FFC107',
};

// =============================================================================
// TERTIARY PALETTE - Nose/Sinus (Pink/Coral)
// =============================================================================

/**
 * Nasal and sinus anatomy colors
 */
export const nasalColors = {
  /** Nasal mucosa - normal */
  nasalMucosaNormal: '#FFCDD2',
  /** Nasal mucosa - inflamed */
  nasalMucosaInflamed: '#EF5350',
  /** Nasal septum */
  nasalSeptum: '#F8BBD9',
  /** Inferior turbinate */
  inferiorTurbinate: '#F48FB1',
  /** Middle turbinate */
  middleTurbinate: '#EC407A',
  /** Superior turbinate */
  superiorTurbinate: '#D81B60',
  /** Frontal sinus */
  frontalSinus: '#E1BEE7',
  /** Maxillary sinus */
  maxillarySinus: '#CE93D8',
  /** Ethmoid sinus */
  ethmoidSinus: '#BA68C8',
  /** Sphenoid sinus */
  sphenoidSinus: '#AB47BC',
  /** Olfactory epithelium */
  olfactoryEpithelium: '#FFF59D',
  /** Sinus lining */
  sinusLining: '#F3E5F5',
};

// =============================================================================
// QUATERNARY PALETTE - Throat/Larynx (Red/Orange)
// =============================================================================

/**
 * Throat and larynx colors
 */
export const throatColors = {
  /** Pharyngeal mucosa */
  pharyngealMucosa: '#FFAB91',
  /** Nasopharynx */
  nasopharynx: '#FF8A65',
  /** Oropharynx */
  oropharynx: '#FF7043',
  /** Hypopharynx */
  hypopharynx: '#FF5722',
  /** Tonsils - normal */
  tonsilsNormal: '#F48FB1',
  /** Tonsils - inflamed */
  tonsilsInflamed: '#E53935',
  /** Adenoids */
  adenoids: '#EC407A',
  /** Uvula */
  uvula: '#E57373',
  /** Laryngeal cartilage */
  laryngealCartilage: '#90CAF9',
  /** Epiglottis */
  epiglottis: '#64B5F6',
  /** Vocal cords - normal */
  vocalCordsNormal: '#E8F5E9',
  /** Vocal cords - edematous */
  vocalCordsEdematous: '#EF9A9A',
  /** Glottis opening */
  glottisOpening: '#1A237E',
  /** Trachea */
  trachea: '#81D4FA',
};

// =============================================================================
// PATHOLOGY PALETTE - Disease States
// =============================================================================

/**
 * ENT pathological condition colors
 */
export const entPathologyColors = {
  /** Acute inflammation */
  acuteInflammation: '#F44336',
  /** Chronic inflammation */
  chronicInflammation: '#D32F2F',
  /** Infection/Purulence */
  infection: '#FF9800',
  /** Pus/Exudate */
  exudate: '#FFE082',
  /** Effusion */
  effusion: '#FFD54F',
  /** Edema */
  edema: '#64B5F6',
  /** Hemorrhage */
  hemorrhage: '#C62828',
  /** Cholesteatoma */
  cholesteatoma: '#9575CD',
  /** Polyps */
  polyps: '#7E57C2',
  /** Tumor/Malignancy */
  tumor: '#6A1B9A',
  /** Granulation tissue */
  granulationTissue: '#E91E63',
  /** Necrosis */
  necrosis: '#37474F',
  /** Perforation */
  perforation: '#263238',
  /** Scar tissue */
  scarTissue: '#78909C',
};

// =============================================================================
// CLINICAL SEVERITY GRADIENT
// =============================================================================

/**
 * Severity gradient for ENT conditions
 */
export const entSeverityGradient = {
  /** Normal/Healthy */
  normal: '#4CAF50',
  /** Mild */
  mild: '#8BC34A',
  /** Moderate */
  moderate: '#FFC107',
  /** Moderately Severe */
  moderatelySevere: '#FF9800',
  /** Severe */
  severe: '#FF5722',
  /** Critical/Emergency */
  critical: '#D32F2F',
};

// =============================================================================
// HEARING LOSS CLASSIFICATION
// =============================================================================

/**
 * Audiogram and hearing loss colors
 */
export const hearingColors = {
  /** Normal hearing (0-25 dB) */
  normalHearing: '#4CAF50',
  /** Mild loss (26-40 dB) */
  mildLoss: '#8BC34A',
  /** Moderate loss (41-55 dB) */
  moderateLoss: '#FFEB3B',
  /** Moderately severe loss (56-70 dB) */
  moderatelySevereLoss: '#FF9800',
  /** Severe loss (71-90 dB) */
  severeLoss: '#FF5722',
  /** Profound loss (>90 dB) */
  profoundLoss: '#E91E63',
  /** Conductive hearing loss */
  conductiveLoss: '#2196F3',
  /** Sensorineural hearing loss */
  sensorineuralLoss: '#9C27B0',
  /** Mixed hearing loss */
  mixedLoss: '#00BCD4',
  /** Air conduction line (O/X) */
  airConduction: '#F44336',
  /** Bone conduction line ([/]) */
  boneConduction: '#2196F3',
};

// =============================================================================
// DIAGNOSTIC EQUIPMENT
// =============================================================================

/**
 * ENT equipment and procedure colors
 */
export const equipmentColors = {
  /** Otoscope light */
  otoscopeLight: '#FFEB3B',
  /** Endoscope view */
  endoscopeView: '#4FC3F7',
  /** Audiometer screen */
  audiometerScreen: '#81C784',
  /** Hearing aid */
  hearingAid: '#90A4AE',
  /** Cochlear implant */
  cochlearImplant: '#78909C',
  /** Tympanostomy tube */
  tympanostomyTube: '#B0BEC5',
  /** Nasal packing */
  nasalPacking: '#ECEFF1',
  /** Surgical instruments */
  surgicalInstrument: '#607D8B',
  /** Cautery */
  cautery: '#FF7043',
};

// =============================================================================
// FLOWCHART AND DECISION NODES
// =============================================================================

/**
 * ENT clinical decision flowchart colors
 */
export const entFlowchartColors = {
  /** Start/Presenting symptom */
  start: '#4169E1',
  /** Decision point */
  decision: '#FFA500',
  /** Diagnostic test */
  diagnostic: '#20B2AA',
  /** Treatment option */
  treatment: '#32CD32',
  /** Emergency/Urgent */
  emergency: '#DC143C',
  /** Referral */
  referral: '#8B5CF6',
  /** Follow-up */
  followUp: '#3B82F6',
  /** Resolution/Outcome */
  resolution: '#22C55E',
  /** Complication */
  complication: '#EF4444',
};

// =============================================================================
// VESTIBULAR AND BALANCE
// =============================================================================

/**
 * Vestibular system and balance disorder colors
 */
export const vestibularColors = {
  /** Normal vestibular function */
  normalVestibular: '#4CAF50',
  /** BPPV */
  bppv: '#FF9800',
  /** Meniere's disease */
  menieres: '#2196F3',
  /** Vestibular neuritis */
  vestibularNeuritis: '#9C27B0',
  /** Central vertigo */
  centralVertigo: '#F44336',
  /** Peripheral vertigo */
  peripheralVertigo: '#FF5722',
  /** Nystagmus indicator */
  nystagmus: '#E91E63',
  /** Balance normal */
  balanceNormal: '#81C784',
  /** Balance impaired */
  balanceImpaired: '#EF5350',
};

// =============================================================================
// SLEEP APNEA
// =============================================================================

/**
 * Sleep apnea and airway colors
 */
export const sleepApneaColors = {
  /** Patent airway */
  patentAirway: '#4CAF50',
  /** Partial obstruction */
  partialObstruction: '#FF9800',
  /** Complete obstruction */
  completeObstruction: '#F44336',
  /** Soft palate collapse */
  softPalatecollapse: '#E57373',
  /** Tongue base obstruction */
  tongueBaseObstruction: '#EF5350',
  /** Apnea event */
  apneaEvent: '#C62828',
  /** Hypopnea event */
  hypopneaEvent: '#FF8A65',
  /** Normal AHI (<5) */
  normalAHI: '#4CAF50',
  /** Mild OSA (5-15) */
  mildOSA: '#8BC34A',
  /** Moderate OSA (15-30) */
  moderateOSA: '#FFC107',
  /** Severe OSA (>30) */
  severeOSA: '#F44336',
};

// =============================================================================
// COMPLETE ENT COLOR SCHEME
// =============================================================================

/**
 * Complete ENT color scheme export
 */
export const entColorScheme = {
  // Anatomical palettes
  ear: earColors,
  innerEar: innerEarColors,
  nasal: nasalColors,
  throat: throatColors,

  // Clinical categories
  pathology: entPathologyColors,
  severity: entSeverityGradient,
  hearing: hearingColors,
  vestibular: vestibularColors,
  sleepApnea: sleepApneaColors,

  // Diagnostic and procedural
  equipment: equipmentColors,
  flowchart: entFlowchartColors,

  // Quick access to most commonly used colors
  common: {
    ear: '#E8D4C4',
    cochlea: '#4DB6AC',
    nose: '#FFCDD2',
    throat: '#FFAB91',
    vocalCords: '#E8F5E9',
    inflammation: '#F44336',
    infection: '#FF9800',
    tumor: '#6A1B9A',
    normal: '#4CAF50',
    abnormal: '#DC3545',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type EarColors = typeof earColors;
export type InnerEarColors = typeof innerEarColors;
export type NasalColors = typeof nasalColors;
export type ThroatColors = typeof throatColors;
export type ENTPathologyColors = typeof entPathologyColors;
export type ENTSeverityGradient = typeof entSeverityGradient;
export type HearingColors = typeof hearingColors;
export type VestibularColors = typeof vestibularColors;
export type SleepApneaColors = typeof sleepApneaColors;
export type EquipmentColors = typeof equipmentColors;
export type ENTFlowchartColors = typeof entFlowchartColors;
export type ENTColorScheme = typeof entColorScheme;

export default entColorScheme;
