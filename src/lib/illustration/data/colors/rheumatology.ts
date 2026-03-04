/**
 * rheumatology.ts
 * Rheumatology color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for rheumatologic conditions including:
 * - Joint anatomy (cartilage, synovium, bone colors)
 * - Inflammatory conditions (warm reds/oranges for inflammation)
 * - Autoimmune markers (blues/purples for immune components)
 * - Crystal deposits (yellows for urate, blues for CPPD)
 * - Disease activity (severity gradients)
 * - Treatment pathways (medication color coding)
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// PRIMARY PALETTE - Joint Anatomy
// =============================================================================

/**
 * Joint structure anatomical colors
 */
export const jointAnatomyColors = {
  /** Articular cartilage - blue-tinged white */
  cartilage: '#B8D4E8',
  /** Healthy hyaline cartilage */
  hyalineCartilage: '#A8C8DC',
  /** Fibrocartilage (meniscus) */
  fibrocartilage: '#8BB0C8',
  /** Damaged cartilage */
  damagedCartilage: '#D4A574',
  /** Synovial membrane - pink */
  synovium: '#FFB6C1',
  /** Inflamed synovium */
  inflamedSynovium: '#DC143C',
  /** Synovial fluid - straw colored */
  synovialFluid: '#F5DEB3',
  /** Inflammatory synovial fluid */
  inflammatorySynovialFluid: '#FFD700',
  /** Joint capsule */
  jointCapsule: '#DEB887',
  /** Bone - ivory */
  bone: '#FFFFF0',
  /** Subchondral bone */
  subchondralBone: '#F5F5DC',
  /** Cortical bone */
  corticalBone: '#E8E4C9',
  /** Bone marrow */
  boneMarrow: '#FFE4E1',
  /** Ligament - greenish */
  ligament: '#8FBC8F',
  /** Tendon */
  tendon: '#DEB887',
  /** Bursa */
  bursa: '#87CEEB',
  /** Enthesis */
  enthesis: '#DAA520',
};

// =============================================================================
// SECONDARY PALETTE - Inflammatory Arthritis
// =============================================================================

/**
 * Inflammatory process colors
 */
export const inflammatoryColors = {
  /** Acute inflammation - bright red */
  acuteInflammation: '#FF4500',
  /** Chronic inflammation */
  chronicInflammation: '#DC143C',
  /** Pannus tissue */
  pannus: '#8B0000',
  /** Synovial hypertrophy */
  synovialHypertrophy: '#CD5C5C',
  /** Erosion - dark red */
  erosion: '#B22222',
  /** Bone edema */
  boneEdema: '#FF6B6B',
  /** Active synovitis */
  activeSynovitis: '#FF0000',
  /** Mild synovitis */
  mildSynovitis: '#FFA07A',
  /** Power Doppler signal */
  powerDoppler: '#FF4500',
  /** Tenosynovitis */
  tenosynovitis: '#E9967A',
  /** Enthesitis */
  enthesitis: '#FF6347',
  /** Dactylitis */
  dactylitis: '#FF7F50',
};

// =============================================================================
// ACCENT PALETTE - Autoimmune/Immunology
// =============================================================================

/**
 * Autoimmune and immunologic markers
 */
export const autoimmuneColors = {
  /** Antibodies - general */
  antibody: '#4169E1',
  /** ANA positive */
  anaPositive: '#90EE90',
  /** Anti-CCP antibody */
  antiCCP: '#FFD700',
  /** Rheumatoid factor */
  rheumatoidFactor: '#9370DB',
  /** Anti-dsDNA */
  antiDsDNA: '#FF69B4',
  /** Complement activation */
  complementActivation: '#00CED1',
  /** Low complement */
  lowComplement: '#4682B4',
  /** T-cells */
  tCell: '#32CD32',
  /** B-cells */
  bCell: '#1E90FF',
  /** Macrophages */
  macrophage: '#FF8C00',
  /** Neutrophils */
  neutrophil: '#9ACD32',
  /** Cytokines - TNF */
  tnf: '#DC143C',
  /** Cytokines - IL-6 */
  il6: '#FF6347',
  /** Cytokines - IL-17 */
  il17: '#FFA500',
  /** Cytokines - IL-1 */
  il1: '#FF4500',
};

// =============================================================================
// CRYSTAL ARTHROPATHY PALETTE
// =============================================================================

/**
 * Crystal-related colors
 */
export const crystalColors = {
  /** Monosodium urate (gout) - yellow/gold */
  urateNeedles: '#FFD700',
  /** Tophus */
  tophus: '#FFFACD',
  /** Acute gout flare */
  acuteGout: '#FF4500',
  /** CPPD crystals - blue/rhomboid */
  cppdCrystals: '#87CEEB',
  /** Chondrocalcinosis */
  chondrocalcinosis: '#ADD8E6',
  /** Hydroxyapatite */
  hydroxyapatite: '#F5F5F5',
  /** Basic calcium phosphate */
  bcp: '#E0E0E0',
};

// =============================================================================
// CONNECTIVE TISSUE DISEASE PALETTE
// =============================================================================

/**
 * Connective tissue disease-specific colors
 */
export const ctdColors = {
  /** Lupus - butterfly rash */
  lupusRash: '#FF69B4',
  /** Discoid lupus */
  discoidLupus: '#DB7093',
  /** Scleroderma - skin tightening */
  scleroderma: '#D2B48C',
  /** Calcinosis */
  calcinosis: '#F5F5DC',
  /** Raynaud's white phase */
  raynaudWhite: '#FFFFFF',
  /** Raynaud's blue phase */
  raynaudBlue: '#4169E1',
  /** Raynaud's red phase */
  raynaudRed: '#DC143C',
  /** Dermatomyositis - heliotrope */
  heliotrope: '#9370DB',
  /** Gottron's papules */
  gottronPapules: '#DDA0DD',
  /** Vasculitis - purpura */
  purpura: '#8B008B',
  /** Livedo reticularis */
  livedoReticularis: '#9932CC',
};

// =============================================================================
// OSTEOARTHRITIS PALETTE
// =============================================================================

/**
 * Degenerative joint disease colors
 */
export const osteoarthritisColors = {
  /** Normal cartilage */
  normalCartilage: '#B8D4E8',
  /** Cartilage fibrillation */
  cartilageFilbrillation: '#A9C4D8',
  /** Cartilage erosion */
  cartilageErosion: '#C4A484',
  /** Exposed bone */
  exposedBone: '#F5DEB3',
  /** Osteophyte */
  osteophyte: '#DAA520',
  /** Subchondral sclerosis */
  subchondralSclerosis: '#D3D3D3',
  /** Subchondral cyst */
  subchondralCyst: '#FFFFFF',
  /** Bone marrow lesion */
  boneMarrowLesion: '#FFE4E1',
  /** Joint space narrowing */
  jointSpaceNarrowing: '#A0522D',
  /** Heberden nodes */
  heberdenNodes: '#DEB887',
  /** Bouchard nodes */
  bouchardNodes: '#D2B48C',
};

// =============================================================================
// DISEASE ACTIVITY / SEVERITY GRADIENT
// =============================================================================

/**
 * Disease activity severity levels
 */
export const diseaseActivityColors = {
  /** Remission (DAS28 <2.6) */
  remission: '#228B22',
  /** Low disease activity (DAS28 2.6-3.2) */
  lowActivity: '#90EE90',
  /** Moderate disease activity (DAS28 3.2-5.1) */
  moderateActivity: '#FFA500',
  /** High disease activity (DAS28 >5.1) */
  highActivity: '#DC143C',
  /** Very high activity / Flare */
  flare: '#8B0000',
};

/**
 * General severity gradient
 */
export const severityGradient = {
  /** Normal / Healthy */
  normal: '#228B22',
  /** Mild */
  mild: '#90EE90',
  /** Moderate */
  moderate: '#FFA500',
  /** Severe */
  severe: '#DC143C',
  /** Critical */
  critical: '#8B0000',
};

// =============================================================================
// TREATMENT / MEDICATION PALETTE
// =============================================================================

/**
 * Treatment and medication colors
 */
export const treatmentColors = {
  /** csDMARDs - conventional synthetic */
  csDmard: '#4169E1',
  /** Methotrexate */
  methotrexate: '#4169E1',
  /** Hydroxychloroquine */
  hydroxychloroquine: '#32CD32',
  /** Sulfasalazine */
  sulfasalazine: '#FFD700',
  /** Leflunomide */
  leflunomide: '#9370DB',
  /** bDMARDs - biologic */
  bDmard: '#FF69B4',
  /** TNF inhibitors */
  tnfInhibitor: '#DC143C',
  /** IL-6 inhibitors */
  il6Inhibitor: '#FF6347',
  /** JAK inhibitors */
  jakInhibitor: '#00CED1',
  /** Rituximab / anti-CD20 */
  rituximab: '#1E90FF',
  /** Abatacept */
  abatacept: '#9ACD32',
  /** Steroids - corticosteroids */
  steroids: '#FFA500',
  /** NSAIDs */
  nsaids: '#87CEEB',
  /** Colchicine */
  colchicine: '#DDA0DD',
  /** Allopurinol */
  allopurinol: '#F0E68C',
  /** Febuxostat */
  febuxostat: '#F5DEB3',
};

// =============================================================================
// IMAGING COLORS
// =============================================================================

/**
 * Imaging modality and finding colors
 */
export const imagingColors = {
  /** X-ray bone */
  xrayBone: '#FFFFFF',
  /** X-ray soft tissue */
  xraySoftTissue: '#808080',
  /** MRI bone marrow edema */
  mriBoneEdema: '#FFFFFF',
  /** MRI synovitis */
  mriSynovitis: '#87CEEB',
  /** MRI cartilage */
  mriCartilage: '#696969',
  /** Ultrasound synovitis */
  usSynovitis: '#000000',
  /** Ultrasound effusion */
  usEffusion: '#1C1C1C',
  /** Power Doppler */
  powerDopplerSignal: '#FF4500',
  /** Bone scan uptake */
  boneScanUptake: '#00FF00',
  /** PET uptake */
  petUptake: '#FFFF00',
};

// =============================================================================
// AUTOANTIBODY PATTERNS
// =============================================================================

/**
 * ANA pattern colors for immunofluorescence
 */
export const anaPatternColors = {
  /** Homogeneous pattern */
  homogeneous: '#90EE90',
  /** Speckled pattern */
  speckled: '#98FB98',
  /** Nucleolar pattern */
  nucleolar: '#7CFC00',
  /** Centromere pattern */
  centromere: '#32CD32',
  /** Cytoplasmic pattern */
  cytoplasmic: '#00FA9A',
  /** Background (negative) */
  negative: '#2F4F4F',
};

// =============================================================================
// FLOWCHART DECISION COLORS
// =============================================================================

/**
 * Decision flowchart node colors
 */
export const flowchartColors = {
  /** Start/End nodes */
  terminal: '#228B22',
  /** Decision nodes */
  decision: '#FFD700',
  /** Process nodes */
  process: '#4169E1',
  /** Action required */
  action: '#FFA500',
  /** Warning/Caution */
  warning: '#FF6347',
  /** Success/Positive outcome */
  success: '#228B22',
  /** Failure/Negative outcome */
  failure: '#DC143C',
  /** Information */
  info: '#87CEEB',
  /** Medication/Treatment */
  medication: '#9370DB',
  /** Lab/Test */
  labTest: '#00CED1',
  /** Diagnosis */
  diagnosis: '#FF69B4',
  /** Referral */
  referral: '#DDA0DD',
};

// =============================================================================
// VASCULITIS COLORS
// =============================================================================

/**
 * Vasculitis-specific colors
 */
export const vasculitisColors = {
  /** Large vessel vasculitis */
  largeVessel: '#DC143C',
  /** Medium vessel vasculitis */
  mediumVessel: '#FF6347',
  /** Small vessel vasculitis */
  smallVessel: '#FF69B4',
  /** ANCA-associated */
  ancaAssociated: '#4169E1',
  /** GPA (Wegener's) */
  gpa: '#1E90FF',
  /** MPA */
  mpa: '#00BFFF',
  /** EGPA (Churg-Strauss) */
  egpa: '#87CEEB',
  /** Giant cell arteritis */
  gca: '#B22222',
  /** Takayasu arteritis */
  takayasu: '#CD5C5C',
  /** Leukocytoclastic */
  leukocytoclastic: '#DDA0DD',
  /** IgA vasculitis */
  igaVasculitis: '#9370DB',
};

// =============================================================================
// COMPLETE RHEUMATOLOGY COLOR SCHEME
// =============================================================================

/**
 * Complete rheumatology color scheme export
 */
export const rheumatologyColorScheme = {
  // Core anatomy
  jointAnatomy: jointAnatomyColors,
  inflammatory: inflammatoryColors,
  autoimmune: autoimmuneColors,

  // Disease-specific
  crystal: crystalColors,
  ctd: ctdColors,
  osteoarthritis: osteoarthritisColors,
  vasculitis: vasculitisColors,

  // Clinical categories
  diseaseActivity: diseaseActivityColors,
  severity: severityGradient,
  treatment: treatmentColors,
  imaging: imagingColors,
  anaPatterns: anaPatternColors,
  flowchart: flowchartColors,

  // Quick access to most commonly used colors
  common: {
    joint: '#B8D4E8',
    inflammation: '#DC143C',
    antibody: '#4169E1',
    crystal: '#FFD700',
    remission: '#228B22',
    flare: '#8B0000',
    treatment: '#9370DB',
    bone: '#FFFFF0',
    cartilage: '#B8D4E8',
    synovium: '#FFB6C1',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type JointAnatomyColors = typeof jointAnatomyColors;
export type InflammatoryColors = typeof inflammatoryColors;
export type AutoimmuneColors = typeof autoimmuneColors;
export type CrystalColors = typeof crystalColors;
export type CTDColors = typeof ctdColors;
export type OsteoarthritisColors = typeof osteoarthritisColors;
export type DiseaseActivityColors = typeof diseaseActivityColors;
export type SeverityGradient = typeof severityGradient;
export type TreatmentColors = typeof treatmentColors;
export type ImagingColors = typeof imagingColors;
export type ANAPatternColors = typeof anaPatternColors;
export type FlowchartColors = typeof flowchartColors;
export type VasculitisColors = typeof vasculitisColors;
export type RheumatologyColorScheme = typeof rheumatologyColorScheme;

export default rheumatologyColorScheme;
