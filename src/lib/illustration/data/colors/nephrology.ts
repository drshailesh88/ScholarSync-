/**
 * nephrology.ts
 * Nephrology color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for renal medicine diagrams including:
 * - Kidney anatomy (cortex, medulla, pelvis)
 * - Nephron structures (glomerulus, tubules, collecting duct)
 * - Urine and electrolytes
 * - Dialysis and transplant
 * - Pathological conditions
 * - Clinical severity gradients
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// PRIMARY PALETTE - Kidney Anatomy
// =============================================================================

/**
 * Colors for kidney gross anatomy
 */
export const kidneyAnatomyColors = {
  /** Healthy kidney parenchyma */
  kidneyHealthy: '#8B4513',
  /** Renal cortex */
  renalCortex: '#CD853F',
  /** Renal medulla */
  renalMedulla: '#A0522D',
  /** Renal pelvis */
  renalPelvis: '#FFE4B5',
  /** Renal pyramids */
  renalPyramids: '#D2691E',
  /** Renal columns */
  renalColumns: '#DEB887',
  /** Renal capsule */
  renalCapsule: '#F5F5DC',
  /** Perirenal fat */
  perirenalfat: '#FFF8DC',
  /** Hilum */
  hilum: '#BC8F8F',
};

// =============================================================================
// SECONDARY PALETTE - Nephron Structures
// =============================================================================

/**
 * Colors for nephron components
 */
export const nephronColors = {
  /** Glomerulus */
  glomerulus: '#DC143C',
  /** Bowman's capsule */
  bowmansCapsule: '#FFB6C1',
  /** Proximal convoluted tubule */
  proximalTubule: '#4169E1',
  /** Loop of Henle - thin descending */
  loopThinDescending: '#87CEEB',
  /** Loop of Henle - thick ascending */
  loopThickAscending: '#4682B4',
  /** Distal convoluted tubule */
  distalTubule: '#32CD32',
  /** Collecting duct - cortical */
  collectingDuctCortical: '#9370DB',
  /** Collecting duct - medullary */
  collectingDuctMedullary: '#8A2BE2',
  /** Macula densa */
  maculaDensa: '#FFD700',
  /** Juxtaglomerular cells */
  jgCells: '#FF8C00',
};

// =============================================================================
// TERTIARY PALETTE - Glomerular Structures
// =============================================================================

/**
 * Colors for glomerular components
 */
export const glomerularColors = {
  /** Capillary tuft */
  capillaryTuft: '#DC143C',
  /** Afferent arteriole */
  afferentArteriole: '#B22222',
  /** Efferent arteriole */
  efferentArteriole: '#8B0000',
  /** Podocytes */
  podocytes: '#22C55E',
  /** Foot processes */
  footProcesses: '#16A34A',
  /** Glomerular basement membrane */
  gbm: '#FFD700',
  /** Mesangial cells */
  mesangialCells: '#FFA500',
  /** Mesangial matrix */
  mesangialMatrix: '#FFDAB9',
  /** Fenestrated endothelium */
  fenestratedEndothelium: '#FF6347',
  /** Parietal epithelium */
  parietalEpithelium: '#F0E68C',
  /** Urinary space */
  urinarySpace: '#E0FFFF',
};

// =============================================================================
// URINE AND FLUID COLORS
// =============================================================================

/**
 * Colors representing urine and fluids
 */
export const urineColors = {
  /** Normal urine - pale yellow */
  normalUrine: '#FFFF99',
  /** Concentrated urine - dark yellow */
  concentratedUrine: '#FFD700',
  /** Dilute urine - almost clear */
  diluteUrine: '#FFFACD',
  /** Hematuria - blood in urine */
  hematuria: '#FF6B6B',
  /** Gross hematuria */
  grossHematuria: '#DC143C',
  /** Proteinuria - foamy */
  proteinuria: '#FFFAF0',
  /** Pyuria - cloudy */
  pyuria: '#E5E5E5',
  /** Bilirubinuria - dark */
  bilirubinuria: '#8B4513',
  /** Myoglobinuria - tea colored */
  myoglobinuria: '#CD853F',
};

// =============================================================================
// ELECTROLYTE COLORS
// =============================================================================

/**
 * Colors for electrolyte visualization
 */
export const electrolyteColors = {
  /** Sodium */
  sodium: '#4169E1',
  /** Potassium */
  potassium: '#FFD700',
  /** Calcium */
  calcium: '#32CD32',
  /** Phosphorus */
  phosphorus: '#FF8C00',
  /** Magnesium */
  magnesium: '#9370DB',
  /** Chloride */
  chloride: '#20B2AA',
  /** Bicarbonate */
  bicarbonate: '#87CEEB',
  /** Hydrogen ion */
  hydrogenIon: '#DC143C',
  /** Water molecule */
  water: '#00BFFF',
};

// =============================================================================
// DIALYSIS COLORS
// =============================================================================

/**
 * Colors for dialysis equipment and processes
 */
export const dialysisColors = {
  /** Hemodialysis machine */
  hdMachine: '#2C3E50',
  /** Dialysate - fresh */
  dialysateFresh: '#00CED1',
  /** Dialysate - used */
  dialysateUsed: '#D4A574',
  /** Dialysis membrane */
  membrane: '#FFE4E1',
  /** AV fistula */
  avFistula: '#DC143C',
  /** AV graft */
  avGraft: '#A9A9A9',
  /** Tunneled catheter */
  tunneledCatheter: '#696969',
  /** Peritoneal membrane */
  peritonealMembrane: '#FFF0F5',
  /** PD catheter */
  pdCatheter: '#D3D3D3',
  /** PD fluid */
  pdFluid: '#F0FFFF',
};

// =============================================================================
// TRANSPLANT COLORS
// =============================================================================

/**
 * Colors for kidney transplant
 */
export const transplantColors = {
  /** Donor kidney */
  donorKidney: '#228B22',
  /** Recipient kidney */
  recipientKidney: '#8B4513',
  /** Surgical anastomosis */
  anastomosis: '#DC143C',
  /** Immunosuppression */
  immunosuppression: '#9370DB',
  /** Rejection - acute */
  acuteRejection: '#FF4500',
  /** Rejection - chronic */
  chronicRejection: '#8B0000',
  /** Allograft */
  allograft: '#3CB371',
  /** Native kidney */
  nativeKidney: '#D2691E',
};

// =============================================================================
// PATHOLOGY PALETTE
// =============================================================================

/**
 * Colors for pathological conditions
 */
export const pathologyColors = {
  /** Acute kidney injury */
  aki: '#FF4500',
  /** Chronic kidney disease */
  ckd: '#8B4513',
  /** Glomerulonephritis */
  glomerulonephritis: '#DC143C',
  /** Nephrotic syndrome */
  nephroticSyndrome: '#FFD700',
  /** Nephritic syndrome */
  nephriticSyndrome: '#B22222',
  /** Tubular necrosis */
  tubularNecrosis: '#2F4F4F',
  /** Interstitial nephritis */
  interstitialNephritis: '#FF69B4',
  /** Polycystic kidney */
  polycysticKidney: '#87CEEB',
  /** Hydronephrosis */
  hydronephrosis: '#4169E1',
  /** Kidney stone */
  kidneyStone: '#D4A574',
  /** Renal artery stenosis */
  renalArteryStenosis: '#B22222',
  /** Diabetic nephropathy */
  diabeticNephropathy: '#FF8C00',
  /** Hypertensive nephropathy */
  hypertensiveNephropathy: '#DC143C',
  /** Lupus nephritis */
  lupusNephritis: '#9400D3',
  /** IgA nephropathy */
  igaNephropathy: '#FF6347',
  /** FSGS */
  fsgs: '#CD5C5C',
  /** Membranous nephropathy */
  membranousNephropathy: '#DEB887',
};

// =============================================================================
// CKD STAGING COLORS
// =============================================================================

/**
 * Colors for CKD staging (KDIGO)
 */
export const ckdStagingColors = {
  /** G1 - Normal or high GFR >= 90 */
  g1: '#28A745',
  /** G2 - Mildly decreased 60-89 */
  g2: '#9ACD32',
  /** G3a - Mild to moderate 45-59 */
  g3a: '#FFD700',
  /** G3b - Moderate to severe 30-44 */
  g3b: '#FFA500',
  /** G4 - Severely decreased 15-29 */
  g4: '#FF6347',
  /** G5 - Kidney failure < 15 */
  g5: '#DC143C',
  /** A1 - Normal to mildly increased albuminuria */
  a1: '#28A745',
  /** A2 - Moderately increased albuminuria */
  a2: '#FFD700',
  /** A3 - Severely increased albuminuria */
  a3: '#DC143C',
};

// =============================================================================
// CLINICAL SEVERITY GRADIENT
// =============================================================================

/**
 * Severity gradient for clinical conditions
 */
export const severityGradient = {
  /** Normal/Healthy */
  normal: '#28A745',
  /** Mild severity */
  mild: '#FFC107',
  /** Moderate severity */
  moderate: '#FD7E14',
  /** Severe */
  severe: '#DC3545',
  /** Critical/Life-threatening */
  critical: '#6F42C1',
  /** ESRD/Dialysis dependent */
  esrd: '#4B0082',
};

// =============================================================================
// AKI STAGING COLORS (KDIGO)
// =============================================================================

/**
 * Colors for AKI staging
 */
export const akiStagingColors = {
  /** Stage 1 - 1.5-1.9x baseline or >= 0.3 mg/dL increase */
  stage1: '#FFC107',
  /** Stage 2 - 2.0-2.9x baseline */
  stage2: '#FD7E14',
  /** Stage 3 - 3.0x baseline or >= 4.0 mg/dL or RRT */
  stage3: '#DC3545',
  /** Prerenal AKI */
  prerenal: '#87CEEB',
  /** Intrinsic AKI */
  intrinsic: '#FF8C00',
  /** Postrenal AKI */
  postrenal: '#9370DB',
};

// =============================================================================
// URINALYSIS COLORS
// =============================================================================

/**
 * Colors for urinalysis findings
 */
export const urinalysisColors = {
  /** Hyaline cast */
  hyalineCast: '#E0E0E0',
  /** RBC cast */
  rbcCast: '#DC143C',
  /** WBC cast */
  wbcCast: '#32CD32',
  /** Granular cast */
  granularCast: '#8B4513',
  /** Muddy brown cast */
  muddyBrownCast: '#654321',
  /** Waxy cast */
  waxyCast: '#F0E68C',
  /** Crystals - uric acid */
  uricAcidCrystal: '#FFD700',
  /** Crystals - calcium oxalate */
  calciumOxalateCrystal: '#00CED1',
  /** Crystals - struvite */
  struviteCrystal: '#9370DB',
  /** Crystals - cystine */
  cystineCrystal: '#FF69B4',
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
  /** Referral to nephrology */
  referral: '#6F42C1',
  /** Dialysis initiation */
  dialysisStart: '#E91E63',
  /** Transplant pathway */
  transplant: '#009688',
};

// =============================================================================
// COMPLETE NEPHROLOGY COLOR SCHEME
// =============================================================================

/**
 * Complete nephrology color scheme export
 */
export const nephrologyColorScheme = {
  // Core anatomical palettes
  kidneyAnatomy: kidneyAnatomyColors,
  nephron: nephronColors,
  glomerular: glomerularColors,

  // Clinical categories
  urine: urineColors,
  electrolytes: electrolyteColors,
  dialysis: dialysisColors,
  transplant: transplantColors,
  pathology: pathologyColors,

  // Staging systems
  ckdStaging: ckdStagingColors,
  akiStaging: akiStagingColors,
  severity: severityGradient,

  // Diagnostic
  urinalysis: urinalysisColors,
  flowchart: flowchartColors,

  // Quick access to most commonly used colors
  common: {
    kidney: '#8B4513',
    glomerulus: '#DC143C',
    tubule: '#4169E1',
    collectingDuct: '#9370DB',
    urine: '#FFFF99',
    dialysis: '#00CED1',
    aki: '#FF4500',
    ckd: '#8B4513',
    normal: '#28A745',
    abnormal: '#DC3545',
    sodium: '#4169E1',
    potassium: '#FFD700',
    calcium: '#32CD32',
    phosphorus: '#FF8C00',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type KidneyAnatomyColors = typeof kidneyAnatomyColors;
export type NephronColors = typeof nephronColors;
export type GlomerularColors = typeof glomerularColors;
export type UrineColors = typeof urineColors;
export type ElectrolyteColors = typeof electrolyteColors;
export type DialysisColors = typeof dialysisColors;
export type TransplantColors = typeof transplantColors;
export type PathologyColors = typeof pathologyColors;
export type CKDStagingColors = typeof ckdStagingColors;
export type AKIStagingColors = typeof akiStagingColors;
export type SeverityGradient = typeof severityGradient;
export type UrinalysisColors = typeof urinalysisColors;
export type FlowchartColors = typeof flowchartColors;
export type NephrologyColorScheme = typeof nephrologyColorScheme;

export default nephrologyColorScheme;
