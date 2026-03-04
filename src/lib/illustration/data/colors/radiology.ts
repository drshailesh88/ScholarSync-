/**
 * radiology.ts
 * Radiology color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for diagnostic radiology diagrams including:
 * - Imaging modality identification (X-ray, CT, MRI, US, NM)
 * - Tissue density and signal characteristics
 * - Pathology visualization (masses, hemorrhage, edema)
 * - Contrast enhancement phases
 * - Radiation safety and dose levels
 * - Anatomical structures on imaging
 * - Workflow and PACS status indicators
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// PRIMARY PALETTE - Imaging Modalities
// =============================================================================

/**
 * Color coding for different imaging modalities
 */
export const modalityColors = {
  /** X-ray / Radiography */
  xray: '#4A90D9',
  /** Computed Tomography */
  ct: '#5B9BD5',
  /** Magnetic Resonance Imaging */
  mri: '#9B59B6',
  /** Ultrasound / Sonography */
  ultrasound: '#27AE60',
  /** Nuclear Medicine / Scintigraphy */
  nuclearMedicine: '#F39C12',
  /** PET/CT */
  petCt: '#E74C3C',
  /** SPECT */
  spect: '#E67E22',
  /** Fluoroscopy */
  fluoroscopy: '#3498DB',
  /** Mammography */
  mammography: '#FF69B4',
  /** Angiography / DSA */
  angiography: '#C0392B',
  /** DEXA / Bone Densitometry */
  dexa: '#8E44AD',
};

// =============================================================================
// SECONDARY PALETTE - CT Hounsfield Units
// =============================================================================

/**
 * CT density colors based on Hounsfield Units
 */
export const ctDensityColors = {
  /** Air (-1000 HU) */
  air: '#000000',
  /** Fat (-100 to -50 HU) */
  fat: '#2C3E50',
  /** Water (0 HU) */
  water: '#3498DB',
  /** Soft tissue (40-80 HU) */
  softTissue: '#95A5A6',
  /** Blood (30-45 HU) */
  blood: '#C0392B',
  /** Muscle (35-55 HU) */
  muscle: '#8E44AD',
  /** Liver (40-60 HU) */
  liver: '#A0522D',
  /** Calcium/Bone (400-1000+ HU) */
  bone: '#FFFFFF',
  /** Metal artifact (>1000 HU) */
  metal: '#BDC3C7',
  /** Contrast enhanced (100-300 HU) */
  contrastEnhanced: '#E74C3C',
  /** Hemorrhage acute (60-90 HU) */
  acuteHemorrhage: '#E74C3C',
  /** Hemorrhage subacute (40-60 HU) */
  subacuteHemorrhage: '#9B59B6',
};

// =============================================================================
// ACCENT PALETTE - MRI Signal Characteristics
// =============================================================================

/**
 * MRI signal intensity colors
 */
export const mriSignalColors = {
  /** T1 hyperintense (fat, blood products, melanin) */
  t1Bright: '#F5F5DC',
  /** T1 hypointense (fluid, calcium, fibrosis) */
  t1Dark: '#2C3E50',
  /** T2 hyperintense (fluid, edema, cysts) */
  t2Bright: '#E0FFFF',
  /** T2 hypointense (calcium, hemosiderin, fibrosis) */
  t2Dark: '#1C1C1C',
  /** FLAIR hyperintense (MS plaques, gliosis) */
  flairBright: '#FFD700',
  /** FLAIR suppressed fluid */
  flairDark: '#000000',
  /** DWI restricted diffusion (acute stroke) */
  dwiRestricted: '#FFFF00',
  /** ADC low (restricted diffusion) */
  adcLow: '#FF4500',
  /** Contrast enhancement (T1 post-Gd) */
  gadoliniumEnhancement: '#FF69B4',
  /** Susceptibility artifact (SWI/GRE) */
  susceptibility: '#000000',
};

// =============================================================================
// PATHOLOGY PALETTE - Radiologic Findings
// =============================================================================

/**
 * Pathology visualization colors
 */
export const pathologyColors = {
  /** Mass/Tumor */
  mass: '#8B0000',
  /** Nodule */
  nodule: '#FF8C00',
  /** Infiltrate/Consolidation */
  infiltrate: '#A0522D',
  /** Edema */
  edema: '#87CEEB',
  /** Hemorrhage */
  hemorrhage: '#DC143C',
  /** Infarct/Ischemia */
  infarct: '#FFD700',
  /** Calcification */
  calcification: '#FFFFFF',
  /** Cyst */
  cyst: '#00CED1',
  /** Abscess */
  abscess: '#8B4513',
  /** Effusion */
  effusion: '#4169E1',
  /** Pneumothorax */
  pneumothorax: '#000000',
  /** Fracture line */
  fracture: '#FF0000',
  /** Stenosis */
  stenosis: '#FF4500',
  /** Aneurysm */
  aneurysm: '#9400D3',
  /** Thrombus */
  thrombus: '#800000',
  /** Metastasis */
  metastasis: '#4B0082',
};

// =============================================================================
// CONTRAST ENHANCEMENT PHASES
// =============================================================================

/**
 * Contrast phase timing colors
 */
export const contrastPhaseColors = {
  /** Non-contrast / Pre-contrast */
  nonContrast: '#808080',
  /** Early arterial phase (15-20s) */
  earlyArterial: '#FF4500',
  /** Late arterial phase (25-35s) */
  lateArterial: '#FF6347',
  /** Portal venous phase (60-70s) */
  portalVenous: '#4169E1',
  /** Nephrographic phase (90-120s) */
  nephrographic: '#9370DB',
  /** Delayed phase (5-15min) */
  delayed: '#32CD32',
  /** Hepatobiliary phase (20-30min) */
  hepatobiliary: '#228B22',
  /** Excretory/Urographic phase */
  excretory: '#FFD700',
};

// =============================================================================
// RADIATION SAFETY COLORS
// =============================================================================

/**
 * Radiation dose and safety colors
 */
export const radiationColors = {
  /** No radiation (US, MRI) */
  noRadiation: '#228B22',
  /** Low dose (CXR, extremity) */
  lowDose: '#32CD32',
  /** Moderate dose (CT head, spine) */
  moderateDose: '#FFD700',
  /** High dose (CT CAP, CTA) */
  highDose: '#FF8C00',
  /** Very high dose (interventional) */
  veryHighDose: '#FF4500',
  /** Shielding indicator */
  shielding: '#4169E1',
  /** Radioactive material */
  radioactive: '#FFD700',
  /** Radiation warning */
  radiationWarning: '#FF0000',
};

// =============================================================================
// NUCLEAR MEDICINE COLORS
// =============================================================================

/**
 * Nuclear medicine and PET imaging colors
 */
export const nuclearColors = {
  /** Hot spot / Increased uptake */
  hotSpot: '#FF0000',
  /** Cold spot / Decreased uptake */
  coldSpot: '#000080',
  /** Normal physiologic uptake */
  physiologic: '#FFA500',
  /** SUV low (0-2.5) */
  suvLow: '#00FF00',
  /** SUV intermediate (2.5-5) */
  suvIntermediate: '#FFFF00',
  /** SUV high (>5) */
  suvHigh: '#FF0000',
  /** Background activity */
  background: '#228B22',
  /** Target lesion */
  targetLesion: '#DC143C',
};

// =============================================================================
// ULTRASOUND ECHOTEXTURE
// =============================================================================

/**
 * Ultrasound echogenicity colors
 */
export const ultrasoundColors = {
  /** Anechoic (simple fluid) */
  anechoic: '#000000',
  /** Hypoechoic */
  hypoechoic: '#2F4F4F',
  /** Isoechoic */
  isoechoic: '#696969',
  /** Hyperechoic */
  hyperechoic: '#D3D3D3',
  /** Highly echogenic (calcification) */
  echogenic: '#FFFFFF',
  /** Posterior acoustic shadowing */
  shadowing: '#000000',
  /** Posterior acoustic enhancement */
  enhancement: '#E0E0E0',
  /** Color Doppler - Flow toward */
  dopplerToward: '#FF0000',
  /** Color Doppler - Flow away */
  dopplerAway: '#0000FF',
};

// =============================================================================
// ANATOMICAL STRUCTURES ON IMAGING
// =============================================================================

/**
 * Anatomical structure colors for imaging
 */
export const anatomyColors = {
  /** Arterial blood vessel */
  artery: '#DC143C',
  /** Venous blood vessel */
  vein: '#4169E1',
  /** Nerve */
  nerve: '#FFD700',
  /** Lymph node */
  lymphNode: '#98FB98',
  /** Bone cortex */
  corticalBone: '#F5F5F5',
  /** Bone marrow */
  boneMarrow: '#FAEBD7',
  /** Cartilage */
  cartilage: '#87CEEB',
  /** Muscle */
  muscle: '#BC8F8F',
  /** Fat */
  fat: '#2F4F4F',
  /** Liver parenchyma */
  liver: '#8B4513',
  /** Spleen */
  spleen: '#800080',
  /** Kidney cortex */
  kidneyCortex: '#CD853F',
  /** Kidney medulla */
  kidneyMedulla: '#8B4513',
  /** Brain gray matter */
  grayMatter: '#708090',
  /** Brain white matter */
  whiteMatter: '#D3D3D3',
  /** CSF */
  csf: '#E0FFFF',
  /** Bowel */
  bowel: '#DEB887',
};

// =============================================================================
// WORKFLOW AND STATUS COLORS
// =============================================================================

/**
 * PACS and workflow status colors
 */
export const workflowColors = {
  /** Study scheduled */
  scheduled: '#4169E1',
  /** Study in progress */
  inProgress: '#FFA500',
  /** Study completed */
  completed: '#228B22',
  /** Preliminary report */
  preliminary: '#FFD700',
  /** Final report */
  final: '#228B22',
  /** Addendum added */
  addendum: '#9370DB',
  /** Critical finding */
  critical: '#DC143C',
  /** Stat priority */
  stat: '#FF0000',
  /** Routine priority */
  routine: '#228B22',
  /** Pending review */
  pendingReview: '#FFA500',
  /** Verified/Signed */
  verified: '#228B22',
};

// =============================================================================
// REPORTING SYSTEM COLORS (BIRADS, LIRADS, etc.)
// =============================================================================

/**
 * Standardized reporting category colors
 */
export const reportingColors = {
  /** Category 0 - Incomplete */
  category0: '#808080',
  /** Category 1 - Negative */
  category1: '#228B22',
  /** Category 2 - Benign */
  category2: '#32CD32',
  /** Category 3 - Probably benign */
  category3: '#FFD700',
  /** Category 4a - Low suspicion */
  category4a: '#FFA500',
  /** Category 4b - Moderate suspicion */
  category4b: '#FF8C00',
  /** Category 4c - High suspicion */
  category4c: '#FF4500',
  /** Category 5 - Highly suggestive of malignancy */
  category5: '#DC143C',
  /** Category 6 - Known malignancy */
  category6: '#8B0000',
};

// =============================================================================
// INTERVENTIONAL RADIOLOGY
// =============================================================================

/**
 * Interventional radiology procedure colors
 */
export const interventionalColors = {
  /** Target lesion */
  target: '#DC143C',
  /** Access site */
  access: '#4169E1',
  /** Catheter/Wire */
  catheter: '#C0C0C0',
  /** Stent */
  stent: '#708090',
  /** Coil embolization */
  coil: '#B8860B',
  /** Particle embolization */
  particles: '#FF6347',
  /** Ablation zone */
  ablation: '#FF4500',
  /** Drainage catheter */
  drain: '#32CD32',
  /** Biopsy needle */
  biopsyNeedle: '#A9A9A9',
  /** Contrast extravasation */
  extravasation: '#FF0000',
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
  /** Imaging action */
  imaging: '#4169E1',
  /** Intervention action */
  intervention: '#DC143C',
  /** Follow-up recommendation */
  followUp: '#32CD32',
  /** Warning/Caution */
  warning: '#FF9800',
  /** Critical finding */
  critical: '#DC143C',
  /** Normal finding */
  normal: '#228B22',
  /** Abnormal finding */
  abnormal: '#FF4500',
};

// =============================================================================
// SEVERITY GRADIENT
// =============================================================================

/**
 * Severity gradient for radiologic findings
 */
export const severityGradient = {
  /** Normal */
  normal: '#28A745',
  /** Mild/Minor */
  mild: '#FFC107',
  /** Moderate */
  moderate: '#FD7E14',
  /** Severe */
  severe: '#DC3545',
  /** Critical/Emergent */
  critical: '#6F42C1',
};

// =============================================================================
// COMPLETE RADIOLOGY COLOR SCHEME
// =============================================================================

/**
 * Complete radiology color scheme export
 */
export const radiologyColorScheme = {
  // Core palette
  primary: modalityColors,
  secondary: ctDensityColors,
  accent: mriSignalColors,
  pathology: pathologyColors,

  // Specific categories
  contrastPhases: contrastPhaseColors,
  radiation: radiationColors,
  nuclear: nuclearColors,
  ultrasound: ultrasoundColors,
  anatomy: anatomyColors,
  interventional: interventionalColors,

  // Clinical categories
  workflow: workflowColors,
  reporting: reportingColors,
  severity: severityGradient,
  flowchart: flowchartColors,

  // Quick access to most commonly used colors
  common: {
    xray: '#4A90D9',
    ct: '#5B9BD5',
    mri: '#9B59B6',
    ultrasound: '#27AE60',
    pet: '#E74C3C',
    normal: '#28A745',
    abnormal: '#DC3545',
    critical: '#6F42C1',
    mass: '#8B0000',
    hemorrhage: '#DC143C',
    enhancement: '#FF69B4',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type ModalityColors = typeof modalityColors;
export type CtDensityColors = typeof ctDensityColors;
export type MriSignalColors = typeof mriSignalColors;
export type PathologyColors = typeof pathologyColors;
export type ContrastPhaseColors = typeof contrastPhaseColors;
export type RadiationColors = typeof radiationColors;
export type NuclearColors = typeof nuclearColors;
export type UltrasoundColors = typeof ultrasoundColors;
export type AnatomyColors = typeof anatomyColors;
export type WorkflowColors = typeof workflowColors;
export type ReportingColors = typeof reportingColors;
export type InterventionalColors = typeof interventionalColors;
export type SeverityGradient = typeof severityGradient;
export type FlowchartColors = typeof flowchartColors;
export type RadiologyColorScheme = typeof radiologyColorScheme;

export default radiologyColorScheme;
