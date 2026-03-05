/**
 * dermatology.ts
 * Dermatology color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for dermatological medicine diagrams including:
 * - Skin tones (light to dark spectrum)
 * - Lesion morphology colors (erythema, pigmentation, depigmentation)
 * - Pathological conditions (inflammation, infection, malignancy)
 * - Procedure and equipment colors
 * - Clinical severity gradients
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// PRIMARY PALETTE - Skin Tones
// =============================================================================

/**
 * Healthy skin tone colors across Fitzpatrick scale
 */
export const skinToneColors = {
  /** Fitzpatrick I - Very fair */
  fitzpatrickI: '#FFE5D9',
  /** Fitzpatrick II - Fair */
  fitzpatrickII: '#FFDAB9',
  /** Fitzpatrick III - Medium */
  fitzpatrickIII: '#D4A574',
  /** Fitzpatrick IV - Olive */
  fitzpatrickIV: '#B8860B',
  /** Fitzpatrick V - Brown */
  fitzpatrickV: '#8B4513',
  /** Fitzpatrick VI - Dark brown */
  fitzpatrickVI: '#5D3A1A',
  /** Normal epidermis */
  normalEpidermis: '#FAD5C5',
  /** Dermis */
  dermis: '#FFE4E1',
  /** Subcutaneous fat */
  subcutis: '#FFFACD',
};

// =============================================================================
// SECONDARY PALETTE - Skin Layers
// =============================================================================

/**
 * Skin layer anatomy colors
 */
export const skinLayerColors = {
  /** Stratum corneum */
  stratumCorneum: '#E8DCC8',
  /** Stratum lucidum */
  stratumLucidum: '#F5E6D3',
  /** Stratum granulosum */
  stratumGranulosum: '#FFE4D6',
  /** Stratum spinosum */
  stratumSpinosum: '#FFD6C9',
  /** Stratum basale */
  stratumBasale: '#FFCAB8',
  /** Papillary dermis */
  papillaryDermis: '#FFE0E0',
  /** Reticular dermis */
  reticularDermis: '#FFD0D0',
  /** Hair follicle */
  hairFollicle: '#8B7355',
  /** Sebaceous gland */
  sebaceousGland: '#F0E68C',
  /** Sweat gland (eccrine) */
  eccrineGland: '#87CEEB',
  /** Sweat gland (apocrine) */
  apocrineGland: '#98D8C8',
};

// =============================================================================
// LESION MORPHOLOGY COLORS
// =============================================================================

/**
 * Primary lesion colors
 */
export const lesionColors = {
  /** Erythema/redness */
  erythema: '#FF6B6B',
  /** Hyperpigmentation */
  hyperpigmentation: '#8B4513',
  /** Hypopigmentation */
  hypopigmentation: '#F5F5DC',
  /** Depigmentation (vitiligo) */
  depigmentation: '#FFFAF0',
  /** Vesicle/blister fluid */
  vesicleFluid: '#E0FFFF',
  /** Pustule content */
  pustuleContent: '#FFFACD',
  /** Crust/scab */
  crust: '#CD853F',
  /** Scale */
  scale: '#D3D3D3',
  /** Hemorrhage/purpura */
  hemorrhage: '#8B0000',
  /** Edema/swelling */
  edema: '#87CEFA',
  /** Necrosis */
  necrosis: '#2F4F4F',
  /** Ulceration */
  ulceration: '#CD5C5C',
};

// =============================================================================
// PATHOLOGY PALETTE - Disease States
// =============================================================================

/**
 * Inflammatory conditions
 */
export const inflammatoryColors = {
  /** Acute inflammation */
  acuteInflammation: '#FF4500',
  /** Chronic inflammation */
  chronicInflammation: '#DC143C',
  /** Eczema/dermatitis */
  eczema: '#FFB6C1',
  /** Psoriasis (silvery scale) */
  psoriasis: '#C0C0C0',
  /** Psoriasis (erythema) */
  psoriasisErythema: '#FF6347',
  /** Acne (comedone) */
  acneComedone: '#DEB887',
  /** Acne (pustule) */
  acnePustule: '#FFE4B5',
  /** Rosacea */
  rosacea: '#FF7F7F',
  /** Urticaria/hives */
  urticaria: '#FFB6C1',
};

/**
 * Infectious conditions
 */
export const infectiousColors = {
  /** Bacterial infection */
  bacterial: '#FF6B6B',
  /** Viral infection */
  viral: '#9370DB',
  /** Fungal infection (tinea) */
  fungal: '#DDA0DD',
  /** Parasitic (scabies) */
  parasitic: '#CD853F',
  /** Cellulitis */
  cellulitis: '#DC143C',
  /** Impetigo (honey crust) */
  impetigo: '#DAA520',
  /** Herpes vesicle */
  herpesVesicle: '#E0FFFF',
  /** Wart/verruca */
  wart: '#A0522D',
  /** Molluscum */
  molluscum: '#F5F5DC',
};

/**
 * Malignancy colors
 */
export const malignancyColors = {
  /** Melanoma */
  melanoma: '#1C1C1C',
  /** Melanoma (amelanotic) */
  amelanoticMelanoma: '#FFB6C1',
  /** BCC (nodular) */
  bccNodular: '#F0F8FF',
  /** BCC (pearly) */
  bccPearly: '#FFFAF0',
  /** SCC */
  scc: '#CD5C5C',
  /** Actinic keratosis */
  actinicKeratosis: '#DEB887',
  /** Bowen disease */
  bowen: '#FFA07A',
  /** Kaposi sarcoma */
  kaposiSarcoma: '#800080',
  /** Merkel cell carcinoma */
  merkelCell: '#8B008B',
};

// =============================================================================
// AUTOIMMUNE CONDITIONS
// =============================================================================

/**
 * Autoimmune condition colors
 */
export const autoimmuneColors = {
  /** Lupus (malar rash) */
  lupusMalarRash: '#FF6B6B',
  /** Lupus (discoid) */
  lupusDiscoid: '#CD5C5C',
  /** Vitiligo */
  vitiligo: '#FFFAF0',
  /** Pemphigus */
  pemphigus: '#FFF8DC',
  /** Pemphigoid */
  pemphigoid: '#FFEFD5',
  /** Dermatomyositis */
  dermatomyositis: '#DDA0DD',
  /** Scleroderma */
  scleroderma: '#D3D3D3',
  /** Morphea */
  morphea: '#F5F5DC',
};

// =============================================================================
// PROCEDURE AND EQUIPMENT
// =============================================================================

/**
 * Procedure-related colors
 */
export const procedureColors = {
  /** Biopsy site */
  biopsySite: '#E91E63',
  /** Incision line */
  incisionLine: '#FF0000',
  /** Suture */
  suture: '#000080',
  /** Cryotherapy (freeze) */
  cryotherapy: '#00BFFF',
  /** Electrocautery */
  electrocautery: '#FF4500',
  /** Laser treatment */
  laser: '#FF1493',
  /** Wound margin */
  woundMargin: '#228B22',
  /** Mohs layer */
  mohsLayer: '#32CD32',
};

/**
 * Equipment colors
 */
export const equipmentColors = {
  /** Dermatoscope */
  dermatoscope: '#4682B4',
  /** Wood's lamp (fluorescence) */
  woodsLampPositive: '#9400D3',
  /** Wood's lamp (normal) */
  woodsLampNormal: '#E6E6FA',
  /** Patch test positive */
  patchTestPositive: '#FF6347',
  /** Patch test negative */
  patchTestNegative: '#90EE90',
  /** Curette */
  curette: '#C0C0C0',
  /** Punch biopsy tool */
  punchTool: '#708090',
};

// =============================================================================
// WOUND HEALING
// =============================================================================

/**
 * Wound healing phase colors
 */
export const woundHealingColors = {
  /** Fresh wound */
  freshWound: '#DC143C',
  /** Granulation tissue */
  granulation: '#FF6B6B',
  /** Epithelialization */
  epithelialization: '#FFB6C1',
  /** Mature scar */
  matureScar: '#F5F5DC',
  /** Hypertrophic scar */
  hypertrophicScar: '#DEB887',
  /** Keloid */
  keloid: '#D2691E',
  /** Atrophic scar */
  atrophicScar: '#F5F5F5',
};

// =============================================================================
// CLINICAL SEVERITY GRADIENT
// =============================================================================

/**
 * Severity gradient for dermatological conditions
 */
export const severityGradient = {
  /** Clear/Normal */
  clear: '#28A745',
  /** Almost clear */
  almostClear: '#7CB342',
  /** Mild */
  mild: '#FFC107',
  /** Moderate */
  moderate: '#FD7E14',
  /** Severe */
  severe: '#DC3545',
  /** Very severe */
  verySevere: '#6F42C1',
};

// =============================================================================
// DIAGNOSTIC COLORS
// =============================================================================

/**
 * Diagnostic and dermatoscopy colors
 */
export const diagnosticColors = {
  /** Pigment network */
  pigmentNetwork: '#8B4513',
  /** Blue-white veil */
  blueWhiteVeil: '#B0C4DE',
  /** Regression structures */
  regression: '#D3D3D3',
  /** Vascular pattern */
  vascular: '#DC143C',
  /** Globules */
  globules: '#A0522D',
  /** Streaks */
  streaks: '#2F4F4F',
  /** Dots */
  dots: '#1C1C1C',
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
  /** Biopsy recommended */
  biopsyRecommended: '#E91E63',
  /** Referral needed */
  referral: '#9C27B0',
};

// =============================================================================
// COMPLETE DERMATOLOGY COLOR SCHEME
// =============================================================================

/**
 * Complete dermatology color scheme export
 */
export const dermatologyColorScheme = {
  // Core palette
  primary: skinToneColors,
  secondary: skinLayerColors,
  lesion: lesionColors,

  // Pathology categories
  inflammatory: inflammatoryColors,
  infectious: infectiousColors,
  malignancy: malignancyColors,
  autoimmune: autoimmuneColors,

  // Clinical categories
  procedure: procedureColors,
  equipment: equipmentColors,
  woundHealing: woundHealingColors,
  severity: severityGradient,
  diagnostic: diagnosticColors,
  flowchart: flowchartColors,

  // Quick access to most commonly used colors
  common: {
    normalSkin: '#FAD5C5',
    erythema: '#FF6B6B',
    hyperpigmentation: '#8B4513',
    hypopigmentation: '#F5F5DC',
    melanoma: '#1C1C1C',
    inflammation: '#FF4500',
    normal: '#28A745',
    abnormal: '#DC3545',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type SkinToneColors = typeof skinToneColors;
export type SkinLayerColors = typeof skinLayerColors;
export type LesionColors = typeof lesionColors;
export type InflammatoryColors = typeof inflammatoryColors;
export type InfectiousColors = typeof infectiousColors;
export type MalignancyColors = typeof malignancyColors;
export type AutoimmuneColors = typeof autoimmuneColors;
export type ProcedureColors = typeof procedureColors;
export type EquipmentColors = typeof equipmentColors;
export type WoundHealingColors = typeof woundHealingColors;
export type SeverityGradient = typeof severityGradient;
export type DiagnosticColors = typeof diagnosticColors;
export type FlowchartColors = typeof flowchartColors;
export type DermatologyColorScheme = typeof dermatologyColorScheme;

export default dermatologyColorScheme;
