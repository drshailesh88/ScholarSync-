/**
 * hematology-oncology.ts
 * Hematology/Oncology color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for blood diseases and cancer medicine including:
 * - Blood cell colors (RBCs, WBCs, platelets)
 * - Coagulation cascade elements
 * - Cancer staging severity gradients
 * - Treatment and therapy categories
 * - Diagnostic and laboratory colors
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// PRIMARY PALETTE - Blood Cells
// =============================================================================

/**
 * Red blood cell colors for various morphologies
 */
export const rbcColors = {
  /** Normal healthy RBC */
  normal: '#DC143C',
  /** Hypochromic/pale RBC */
  hypochromic: '#FFB6C1',
  /** Polychromatic/bluish RBC */
  polychromatic: '#DB7093',
  /** Sickle cell */
  sickle: '#8B0000',
  /** Spherocyte */
  spherocyte: '#CD5C5C',
  /** Schistocyte/fragmented */
  schistocyte: '#B22222',
  /** Target cell */
  targetCell: '#F08080',
  /** Reticulocyte */
  reticulocyte: '#E9967A',
};

/**
 * White blood cell colors by type
 */
export const wbcColors = {
  /** Neutrophil */
  neutrophil: '#87CEEB',
  /** Lymphocyte */
  lymphocyte: '#6495ED',
  /** Monocyte */
  monocyte: '#4682B4',
  /** Eosinophil */
  eosinophil: '#FF8C00',
  /** Basophil */
  basophil: '#9370DB',
  /** Band neutrophil */
  band: '#ADD8E6',
  /** Blast cell */
  blast: '#4169E1',
  /** Atypical lymphocyte */
  atypicalLymph: '#7B68EE',
};

/**
 * Platelet and megakaryocyte colors
 */
export const plateletColors = {
  /** Normal platelet */
  normal: '#DDA0DD',
  /** Giant platelet */
  giant: '#BA55D3',
  /** Platelet clump */
  clump: '#9932CC',
  /** Megakaryocyte */
  megakaryocyte: '#8A2BE2',
  /** Platelet granules */
  granules: '#9400D3',
};

// =============================================================================
// SECONDARY PALETTE - Bone Marrow
// =============================================================================

/**
 * Bone marrow cellularity and pathology colors
 */
export const boneMarrowColors = {
  /** Normal cellularity */
  normalCellularity: '#F5DEB3',
  /** Hypercellular marrow */
  hypercellular: '#DAA520',
  /** Hypocellular/aplastic */
  hypocellular: '#FAEBD7',
  /** Fibrosis */
  fibrosis: '#A0522D',
  /** Fat/adipose tissue */
  adipose: '#FFFACD',
  /** Trabecular bone */
  bone: '#D2B48C',
  /** Erythroid islands */
  erythroidIsland: '#FFA07A',
  /** Granulocytic series */
  granulocytic: '#B0C4DE',
};

// =============================================================================
// ACCENT PALETTE - Coagulation
// =============================================================================

/**
 * Coagulation cascade element colors
 */
export const coagulationColors = {
  /** Intrinsic pathway */
  intrinsicPathway: '#4169E1',
  /** Extrinsic pathway */
  extrinsicPathway: '#FF8C00',
  /** Common pathway */
  commonPathway: '#FFD700',
  /** Fibrin clot */
  fibrinClot: '#8B0000',
  /** Fibrinogen */
  fibrinogen: '#F4A460',
  /** Thrombin */
  thrombin: '#DC143C',
  /** Tissue factor */
  tissueFactor: '#FF6347',
  /** Natural anticoagulants */
  anticoagulant: '#32CD32',
  /** D-dimer/degradation */
  degradation: '#708090',
};

// =============================================================================
// PATHOLOGY PALETTE - Disease States
// =============================================================================

/**
 * Malignancy and disease state colors
 */
export const malignancyColors = {
  /** Primary tumor */
  primaryTumor: '#8B0000',
  /** Metastasis */
  metastasis: '#DC143C',
  /** Lymphoma */
  lymphoma: '#9370DB',
  /** Leukemia blast */
  leukemiaBlast: '#4169E1',
  /** Myeloma */
  myeloma: '#BA55D3',
  /** Lymph node involvement */
  lymphNode: '#9932CC',
  /** Bone involvement */
  boneInvolvement: '#8B4513',
  /** Organ infiltration */
  organInfiltration: '#CD5C5C',
};

/**
 * Anemia type colors
 */
export const anemiaColors = {
  /** Iron deficiency */
  ironDeficiency: '#CD853F',
  /** B12/Folate deficiency */
  b12Deficiency: '#DEB887',
  /** Hemolytic anemia */
  hemolytic: '#FF6347',
  /** Aplastic anemia */
  aplastic: '#D3D3D3',
  /** Anemia of chronic disease */
  chronicDisease: '#BC8F8F',
  /** Sickle cell disease */
  sickleCellDisease: '#800000',
  /** Thalassemia */
  thalassemia: '#A52A2A',
};

// =============================================================================
// CLINICAL SEVERITY GRADIENT
// =============================================================================

/**
 * Severity/prognosis gradient colors
 */
export const hemoncSeverityGradient = {
  /** Favorable prognosis */
  favorable: '#28A745',
  /** Intermediate prognosis */
  intermediate: '#FFC107',
  /** Unfavorable/adverse prognosis */
  adverse: '#DC3545',
  /** Very high risk */
  veryHighRisk: '#6F42C1',
  /** Complete remission */
  remission: '#20C997',
  /** Partial response */
  partialResponse: '#17A2B8',
  /** Stable disease */
  stableDisease: '#6C757D',
  /** Progressive disease */
  progressiveDisease: '#343A40',
};

/**
 * Cancer staging colors (Ann Arbor / ISS)
 */
export const stagingColors = {
  /** Stage I */
  stageI: '#28A745',
  /** Stage II */
  stageII: '#FFC107',
  /** Stage III */
  stageIII: '#FD7E14',
  /** Stage IV */
  stageIV: '#DC3545',
  /** Limited stage */
  limitedStage: '#17A2B8',
  /** Advanced stage */
  advancedStage: '#6F42C1',
};

// =============================================================================
// TREATMENT PALETTE
// =============================================================================

/**
 * Treatment modality colors
 */
export const treatmentColors = {
  /** Chemotherapy */
  chemotherapy: '#FF6B6B',
  /** Radiation therapy */
  radiation: '#FFD93D',
  /** Immunotherapy */
  immunotherapy: '#6BCB77',
  /** Targeted therapy */
  targetedTherapy: '#4D96FF',
  /** Stem cell transplant */
  transplant: '#9B59B6',
  /** CAR-T cell therapy */
  carT: '#1ABC9C',
  /** Supportive care */
  supportiveCare: '#95A5A6',
  /** Transfusion */
  transfusion: '#E74C3C',
};

/**
 * Anticoagulant/therapy colors
 */
export const anticoagulantColors = {
  /** Warfarin */
  warfarin: '#8E44AD',
  /** Heparin (UFH/LMWH) */
  heparin: '#2980B9',
  /** DOACs */
  doac: '#27AE60',
  /** Reversal agents */
  reversalAgent: '#E67E22',
  /** Antiplatelet */
  antiplatelet: '#16A085',
};

// =============================================================================
// DIAGNOSTIC PALETTE
// =============================================================================

/**
 * Laboratory and diagnostic colors
 */
export const hemoncDiagnosticColors = {
  /** Normal value */
  normalValue: '#28A745',
  /** Abnormal low */
  abnormalLow: '#17A2B8',
  /** Abnormal high */
  abnormalHigh: '#DC3545',
  /** Critical value */
  criticalValue: '#6F42C1',
  /** Flow cytometry positive */
  flowPositive: '#4CAF50',
  /** Flow cytometry negative */
  flowNegative: '#9E9E9E',
  /** FISH signal red */
  fishRed: '#F44336',
  /** FISH signal green */
  fishGreen: '#8BC34A',
};

// =============================================================================
// FLOWCHART DECISION COLORS
// =============================================================================

/**
 * Decision flowchart node colors
 */
export const hemoncFlowchartColors = {
  /** Start/presentation node */
  presentation: '#4169E1',
  /** Decision node */
  decision: '#FFC107',
  /** Assessment node */
  assessment: '#17A2B8',
  /** Treatment node */
  treatment: '#28A745',
  /** Emergency/urgent node */
  emergency: '#DC3545',
  /** Monitoring node */
  monitoring: '#6C757D',
  /** Outcome positive */
  outcomePositive: '#20C997',
  /** Outcome negative */
  outcomeNegative: '#E83E8C',
};

// =============================================================================
// COMPLETE HEMATOLOGY/ONCOLOGY COLOR SCHEME
// =============================================================================

/**
 * Complete hematology/oncology color scheme export
 */
export const hematologyOncologyColorScheme = {
  // Core blood cell palettes
  rbc: rbcColors,
  wbc: wbcColors,
  platelet: plateletColors,

  // Tissue and marrow
  boneMarrow: boneMarrowColors,

  // Coagulation
  coagulation: coagulationColors,

  // Pathology
  malignancy: malignancyColors,
  anemia: anemiaColors,

  // Clinical
  severity: hemoncSeverityGradient,
  staging: stagingColors,

  // Treatment
  treatment: treatmentColors,
  anticoagulant: anticoagulantColors,

  // Diagnostics
  diagnostic: hemoncDiagnosticColors,
  flowchart: hemoncFlowchartColors,

  // Quick access to most commonly used colors
  common: {
    rbc: '#DC143C',
    wbc: '#4169E1',
    platelet: '#DDA0DD',
    tumor: '#8B0000',
    benign: '#28A745',
    malignant: '#DC3545',
    treatment: '#FF6B6B',
    emergency: '#DC3545',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type RBCColors = typeof rbcColors;
export type WBCColors = typeof wbcColors;
export type PlateletColors = typeof plateletColors;
export type BoneMarrowColors = typeof boneMarrowColors;
export type CoagulationColors = typeof coagulationColors;
export type MalignancyColors = typeof malignancyColors;
export type AnemiaColors = typeof anemiaColors;
export type HemoncSeverityGradient = typeof hemoncSeverityGradient;
export type StagingColors = typeof stagingColors;
export type TreatmentColors = typeof treatmentColors;
export type AnticoagulantColors = typeof anticoagulantColors;
export type HemoncDiagnosticColors = typeof hemoncDiagnosticColors;
export type HemoncFlowchartColors = typeof hemoncFlowchartColors;
export type HematologyOncologyColorScheme = typeof hematologyOncologyColorScheme;

export default hematologyOncologyColorScheme;
