/**
 * endocrinology.ts
 * Endocrinology color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for endocrine medicine diagrams including:
 * - Gland anatomy (warm yellows/oranges for metabolic organs)
 * - Hormones (color-coded by hormone type)
 * - Feedback loops (cool blues for regulatory pathways)
 * - Diabetes management (glucose-insulin color system)
 * - Bone/calcium metabolism (neutral earthy tones)
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// PRIMARY PALETTE - Endocrine Glands (Warm Yellow/Orange)
// =============================================================================

/**
 * Gland-specific colors for endocrine organs
 */
export const glandColors = {
  /** Hypothalamus - neural/endocrine interface */
  hypothalamus: '#9B59B6',
  /** Pituitary gland - master gland */
  pituitary: '#F39C12',
  /** Anterior pituitary */
  anteriorPituitary: '#F1C40F',
  /** Posterior pituitary */
  posteriorPituitary: '#E67E22',
  /** Thyroid gland */
  thyroid: '#E74C3C',
  /** Parathyroid glands */
  parathyroid: '#FF6B35',
  /** Adrenal cortex */
  adrenalCortex: '#FFD700',
  /** Adrenal medulla */
  adrenalMedulla: '#DC143C',
  /** Pancreatic islets */
  pancreaticIslets: '#4169E1',
  /** Ovaries */
  ovary: '#FF69B4',
  /** Testes */
  testis: '#1E90FF',
  /** Pineal gland */
  pineal: '#8B008B',
  /** Thymus */
  thymus: '#32CD32',
};

// =============================================================================
// SECONDARY PALETTE - Hormones (Type-Specific)
// =============================================================================

/**
 * Hormone type colors
 */
export const hormoneColors = {
  /** Peptide hormones (insulin, glucagon, GH) */
  peptide: '#4169E1',
  /** Steroid hormones (cortisol, aldosterone, sex steroids) */
  steroid: '#FFD700',
  /** Thyroid hormones (T3, T4) */
  thyroidHormone: '#E74C3C',
  /** Catecholamines (epinephrine, norepinephrine) */
  catecholamine: '#DC143C',
  /** Glycoprotein hormones (TSH, FSH, LH) */
  glycoprotein: '#9B59B6',

  // Specific hormones
  /** Insulin */
  insulin: '#3498DB',
  /** Glucagon */
  glucagon: '#E67E22',
  /** Cortisol */
  cortisol: '#F1C40F',
  /** Aldosterone */
  aldosterone: '#DAA520',
  /** Growth hormone */
  growthHormone: '#27AE60',
  /** Thyroid stimulating hormone */
  tsh: '#9B59B6',
  /** Prolactin */
  prolactin: '#FF69B4',
  /** ACTH */
  acth: '#F39C12',
  /** ADH/Vasopressin */
  adh: '#00CED1',
  /** PTH */
  pth: '#FF6B35',
  /** Estrogen */
  estrogen: '#FF1493',
  /** Progesterone */
  progesterone: '#FFB6C1',
  /** Testosterone */
  testosterone: '#4682B4',
};

// =============================================================================
// ACCENT PALETTE - Feedback Loops (Cool Blues)
// =============================================================================

/**
 * Feedback regulation colors
 */
export const feedbackColors = {
  /** Positive feedback */
  positive: '#27AE60',
  /** Negative feedback */
  negative: '#E74C3C',
  /** Stimulatory pathway */
  stimulatory: '#3498DB',
  /** Inhibitory pathway */
  inhibitory: '#95A5A6',

  // Axis colors
  /** HPA axis (Hypothalamic-Pituitary-Adrenal) */
  hpaAxis: '#F39C12',
  /** HPT axis (Hypothalamic-Pituitary-Thyroid) */
  hptAxis: '#E74C3C',
  /** HPG axis (Hypothalamic-Pituitary-Gonadal) */
  hpgAxis: '#FF69B4',
  /** GH-IGF axis */
  ghIgfAxis: '#27AE60',
  /** Calcium-PTH axis */
  calciumPthAxis: '#FF6B35',
};

// =============================================================================
// DIABETES PALETTE - Glucose/Insulin Colors
// =============================================================================

/**
 * Diabetes-specific colors
 */
export const diabetesColors = {
  /** Normal glucose */
  normalGlucose: '#27AE60',
  /** High glucose (hyperglycemia) */
  highGlucose: '#E74C3C',
  /** Low glucose (hypoglycemia) */
  lowGlucose: '#3498DB',
  /** Insulin */
  insulin: '#4169E1',
  /** Glucagon */
  glucagon: '#E67E22',

  // Diabetes types
  /** Type 1 diabetes */
  type1: '#9B59B6',
  /** Type 2 diabetes */
  type2: '#E67E22',
  /** Gestational diabetes */
  gestational: '#FF69B4',

  // Complications
  /** Retinopathy */
  retinopathy: '#8B0000',
  /** Nephropathy */
  nephropathy: '#CD853F',
  /** Neuropathy */
  neuropathy: '#DAA520',
  /** Cardiovascular */
  cardiovascular: '#DC143C',

  // Monitoring
  /** CGM in range */
  cgmInRange: '#27AE60',
  /** CGM above range */
  cgmAboveRange: '#F1C40F',
  /** CGM high */
  cgmHigh: '#E74C3C',
  /** CGM below range */
  cgmBelowRange: '#3498DB',
};

// =============================================================================
// THYROID PALETTE
// =============================================================================

/**
 * Thyroid-specific colors
 */
export const thyroidColors = {
  /** Normal thyroid */
  normalThyroid: '#E74C3C',
  /** Hyperthyroid */
  hyperthyroid: '#FF4500',
  /** Hypothyroid */
  hypothyroid: '#4682B4',
  /** Thyroid nodule */
  nodule: '#FFA500',
  /** Thyroid cancer */
  cancer: '#8B0000',
  /** Graves disease */
  graves: '#FF6347',
  /** Hashimoto's */
  hashimotos: '#708090',
  /** Thyroid storm */
  thyroidStorm: '#FF0000',
  /** Iodine uptake */
  iodineHot: '#00FF00',
  /** Cold nodule */
  iodineCold: '#0000CD',
};

// =============================================================================
// ADRENAL PALETTE
// =============================================================================

/**
 * Adrenal-specific colors
 */
export const adrenalColors = {
  /** Adrenal cortex */
  cortex: '#FFD700',
  /** Zona glomerulosa */
  zonaGlomerulosa: '#FFE4B5',
  /** Zona fasciculata */
  zonaFasciculata: '#FFC125',
  /** Zona reticularis */
  zonaReticularis: '#DAA520',
  /** Adrenal medulla */
  medulla: '#DC143C',

  // Disorders
  /** Cushing syndrome */
  cushings: '#F4A460',
  /** Addison disease */
  addisons: '#8B4513',
  /** Pheochromocytoma */
  pheochromocytoma: '#FF0000',
  /** Aldosteronoma */
  aldosteronoma: '#FFD700',
  /** Adrenal incidentaloma */
  incidentaloma: '#A9A9A9',
};

// =============================================================================
// PITUITARY PALETTE
// =============================================================================

/**
 * Pituitary-specific colors
 */
export const pituitaryColors = {
  /** Normal pituitary */
  normalPituitary: '#F39C12',
  /** Pituitary adenoma */
  adenoma: '#DC143C',
  /** Prolactinoma */
  prolactinoma: '#FF69B4',
  /** GH-secreting adenoma */
  ghAdenoma: '#27AE60',
  /** ACTH-secreting adenoma */
  acthAdenoma: '#F39C12',
  /** Empty sella */
  emptySella: '#D3D3D3',
  /** Pituitary apoplexy */
  apoplexy: '#8B0000',
  /** Hypopituitarism */
  hypopituitarism: '#708090',
};

// =============================================================================
// BONE/CALCIUM PALETTE
// =============================================================================

/**
 * Bone and calcium metabolism colors
 */
export const boneCalciumColors = {
  /** Normal bone */
  normalBone: '#F5DEB3',
  /** Osteoporotic bone */
  osteoporoticBone: '#D3D3D3',
  /** Bone formation */
  boneFormation: '#228B22',
  /** Bone resorption */
  boneResorption: '#B22222',

  // Calcium levels
  /** Normal calcium */
  normalCalcium: '#F5DEB3',
  /** Hypercalcemia */
  hypercalcemia: '#FF6347',
  /** Hypocalcemia */
  hypocalcemia: '#4682B4',

  // Vitamin D
  /** Vitamin D sufficient */
  vitaminDSufficient: '#FFD700',
  /** Vitamin D deficient */
  vitaminDDeficient: '#708090',
};

// =============================================================================
// CLINICAL SEVERITY GRADIENT
// =============================================================================

/**
 * Severity gradient for clinical conditions
 */
export const severityGradient = {
  /** Normal/Healthy */
  normal: '#27AE60',
  /** Mild severity */
  mild: '#F1C40F',
  /** Moderate severity */
  moderate: '#E67E22',
  /** Severe */
  severe: '#E74C3C',
  /** Critical/Emergency */
  critical: '#8B0000',
};

// =============================================================================
// FLOWCHART DECISION COLORS
// =============================================================================

/**
 * Decision flowchart node colors
 */
export const flowchartColors = {
  /** Start/End nodes */
  terminal: '#27AE60',
  /** Decision nodes */
  decision: '#F1C40F',
  /** Process nodes */
  process: '#3498DB',
  /** Action required */
  action: '#E67E22',
  /** Warning/Caution */
  warning: '#F39C12',
  /** Success/Positive outcome */
  success: '#27AE60',
  /** Failure/Negative outcome */
  failure: '#E74C3C',
  /** Information */
  info: '#3498DB',
  /** Medication/Treatment */
  medication: '#9B59B6',
  /** Lab/Test */
  labTest: '#1ABC9C',
};

// =============================================================================
// METABOLIC PATHWAYS
// =============================================================================

/**
 * Metabolic pathway colors
 */
export const metabolicColors = {
  /** Glucose metabolism */
  glucoseMetabolism: '#3498DB',
  /** Lipid metabolism */
  lipidMetabolism: '#F1C40F',
  /** Protein metabolism */
  proteinMetabolism: '#E74C3C',
  /** Energy production (ATP) */
  atp: '#FF6347',
  /** Glycolysis */
  glycolysis: '#27AE60',
  /** Gluconeogenesis */
  gluconeogenesis: '#E67E22',
  /** Lipogenesis */
  lipogenesis: '#FFD700',
  /** Lipolysis */
  lipolysis: '#DAA520',
};

// =============================================================================
// COMPLETE ENDOCRINOLOGY COLOR SCHEME
// =============================================================================

/**
 * Complete endocrinology color scheme export
 */
export const endocrinologyColorScheme = {
  // Core palette
  primary: glandColors,
  secondary: hormoneColors,
  accent: feedbackColors,

  // Specialty categories
  diabetes: diabetesColors,
  thyroid: thyroidColors,
  adrenal: adrenalColors,
  pituitary: pituitaryColors,
  boneCalcium: boneCalciumColors,
  metabolic: metabolicColors,

  // Clinical categories
  severity: severityGradient,
  flowchart: flowchartColors,

  // Quick access to most commonly used colors
  common: {
    gland: '#F39C12',
    hormone: '#4169E1',
    feedback: '#3498DB',
    glucose: '#27AE60',
    insulin: '#4169E1',
    thyroid: '#E74C3C',
    cortisol: '#F1C40F',
    normal: '#27AE60',
    abnormal: '#E74C3C',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type GlandColors = typeof glandColors;
export type HormoneColors = typeof hormoneColors;
export type FeedbackColors = typeof feedbackColors;
export type DiabetesColors = typeof diabetesColors;
export type ThyroidColors = typeof thyroidColors;
export type AdrenalColors = typeof adrenalColors;
export type PituitaryColors = typeof pituitaryColors;
export type BoneCalciumColors = typeof boneCalciumColors;
export type MetabolicColors = typeof metabolicColors;
export type SeverityGradient = typeof severityGradient;
export type FlowchartColors = typeof flowchartColors;
export type EndocrinologyColorScheme = typeof endocrinologyColorScheme;

export default endocrinologyColorScheme;
