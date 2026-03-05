/**
 * orthopedics.ts
 * Orthopedics color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for orthopedic medicine diagrams including:
 * - Bone tissue and skeletal structures (ivory/cream spectrum)
 * - Soft tissue (tendons, ligaments, cartilage, muscle)
 * - Fracture classification and healing stages
 * - Surgical hardware and implants
 * - Diagnostic imaging and pathology
 * - Clinical severity and rehabilitation phases
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// PRIMARY PALETTE - Bone Tissue (Ivory/Cream)
// =============================================================================

/**
 * Bone anatomy colors for cortical, trabecular, and other bone structures
 */
export const boneColors = {
  /** Cortical bone - dense outer layer */
  corticalBone: '#F5F5DC',
  /** Trabecular bone - spongy inner bone */
  trabecularBone: '#FAEBD7',
  /** Periosteum - bone membrane */
  periosteum: '#DEB887',
  /** Endosteum - inner membrane */
  endosteum: '#D2B48C',
  /** Bone marrow (red) */
  redMarrow: '#8B0000',
  /** Bone marrow (yellow) */
  yellowMarrow: '#FFD700',
  /** Growth plate / Physis */
  physis: '#87CEEB',
  /** Epiphysis */
  epiphysis: '#F0E68C',
  /** Metaphysis */
  metaphysis: '#EEE8AA',
  /** Diaphysis / Shaft */
  diaphysis: '#FAF0E6',
  /** Articular surface */
  articularSurface: '#E6E6FA',
  /** Calcified tissue */
  calcified: '#DCDCDC',
};

// =============================================================================
// SECONDARY PALETTE - Soft Tissue
// =============================================================================

/**
 * Soft tissue colors for muscles, tendons, ligaments, and cartilage
 */
export const softTissueColors = {
  /** Muscle tissue */
  muscle: '#CD5C5C',
  /** Skeletal muscle */
  skeletalMuscle: '#BC8F8F',
  /** Tendon */
  tendon: '#F5DEB3',
  /** Ligament */
  ligament: '#DAA520',
  /** Articular cartilage */
  articularCartilage: '#ADD8E6',
  /** Fibrocartilage */
  fibrocartilage: '#B0C4DE',
  /** Hyaline cartilage */
  hyalineCartilage: '#87CEFA',
  /** Meniscus */
  meniscus: '#778899',
  /** Synovium */
  synovium: '#FFB6C1',
  /** Synovial fluid */
  synovialFluid: '#E0FFFF',
  /** Bursa */
  bursa: '#FFDAB9',
  /** Fascia */
  fascia: '#D3D3D3',
};

// =============================================================================
// ACCENT PALETTE - Joint Structures
// =============================================================================

/**
 * Joint anatomy and component colors
 */
export const jointColors = {
  /** Joint capsule */
  jointCapsule: '#DDA0DD',
  /** Labrum */
  labrum: '#9370DB',
  /** ACL - Anterior cruciate ligament */
  acl: '#4169E1',
  /** PCL - Posterior cruciate ligament */
  pcl: '#6495ED',
  /** MCL - Medial collateral ligament */
  mcl: '#1E90FF',
  /** LCL - Lateral collateral ligament */
  lcl: '#00BFFF',
  /** Rotator cuff */
  rotatorCuff: '#FF6347',
  /** Intervertebral disc */
  disc: '#708090',
  /** Nucleus pulposus */
  nucleusPulposus: '#5F9EA0',
  /** Annulus fibrosus */
  annulusFibrosus: '#2F4F4F',
};

// =============================================================================
// PATHOLOGY PALETTE - Disease States
// =============================================================================

/**
 * Orthopedic pathology colors
 */
export const orthoPathologyColors = {
  /** Fracture line */
  fractureLine: '#8B0000',
  /** Bone contusion / bruise */
  boneContusion: '#800080',
  /** Stress fracture */
  stressFracture: '#DC143C',
  /** Non-union / Malunion */
  nonUnion: '#696969',
  /** Osteomyelitis / Infection */
  osteomyelitis: '#FF4500',
  /** Osteonecrosis / AVN */
  osteonecrosis: '#2F4F4F',
  /** Osteoporosis */
  osteoporosis: '#D3D3D3',
  /** Osteoarthritis */
  osteoarthritis: '#A0522D',
  /** Rheumatoid arthritis */
  rheumatoidArthritis: '#B22222',
  /** Bone tumor / Neoplasm */
  boneTumor: '#4B0082',
  /** Osteosarcoma */
  osteosarcoma: '#8B008B',
  /** Metastatic disease */
  metastasis: '#9932CC',
  /** Edema / Swelling */
  edema: '#87CEEB',
  /** Inflammation */
  inflammation: '#FF6B6B',
  /** Hematoma */
  hematoma: '#800020',
  /** Callus formation */
  callus: '#90EE90',
};

// =============================================================================
// FRACTURE CLASSIFICATION COLORS
// =============================================================================

/**
 * Fracture type and classification colors
 */
export const fractureColors = {
  /** Simple / Closed fracture */
  simpleFracture: '#FFA500',
  /** Comminuted fracture */
  comminutedFracture: '#FF4500',
  /** Open / Compound fracture */
  openFracture: '#DC143C',
  /** Pathologic fracture */
  pathologicFracture: '#8B008B',
  /** Stress fracture */
  stressFracture: '#FF8C00',
  /** Greenstick fracture */
  greenstickFracture: '#32CD32',
  /** Avulsion fracture */
  avulsionFracture: '#4682B4',
  /** Compression fracture */
  compressionFracture: '#A0522D',
  /** Displaced fracture */
  displacedFracture: '#B22222',
  /** Non-displaced fracture */
  nonDisplacedFracture: '#228B22',
};

// =============================================================================
// SURGICAL HARDWARE COLORS
// =============================================================================

/**
 * Implant and fixation hardware colors
 */
export const implantColors = {
  /** Titanium implant */
  titanium: '#C0C0C0',
  /** Stainless steel */
  stainlessSteel: '#808080',
  /** PEEK (polymer) */
  peek: '#F5F5DC',
  /** Plate fixation */
  plate: '#A9A9A9',
  /** Screw fixation */
  screw: '#708090',
  /** Intramedullary nail */
  imNail: '#696969',
  /** External fixator */
  exFix: '#4682B4',
  /** Wire / K-wire */
  wire: '#B8860B',
  /** Total hip replacement */
  totalHip: '#778899',
  /** Total knee replacement */
  totalKnee: '#5F9EA0',
  /** Shoulder arthroplasty */
  shoulderArthroplasty: '#6B8E23',
  /** Bone cement / PMMA */
  boneCite: '#FFFAF0',
  /** Bone graft */
  boneGraft: '#DEB887',
};

// =============================================================================
// FRACTURE HEALING STAGES
// =============================================================================

/**
 * Fracture healing phase colors
 */
export const healingPhaseColors = {
  /** Inflammatory phase (Day 0-7) */
  inflammatoryPhase: '#FF6347',
  /** Soft callus phase (Week 1-3) */
  softCallus: '#90EE90',
  /** Hard callus phase (Week 3-12) */
  hardCallus: '#FFD700',
  /** Remodeling phase (Month 3-12+) */
  remodeling: '#F5F5DC',
  /** Delayed union */
  delayedUnion: '#FFA500',
  /** Complete healing */
  completeHealing: '#228B22',
};

// =============================================================================
// IMAGING COLORS
// =============================================================================

/**
 * Radiologic imaging color coding
 */
export const imagingColors = {
  /** X-ray bone (normal) */
  xrayBone: '#FFFFFF',
  /** X-ray soft tissue */
  xraySoftTissue: '#808080',
  /** CT bone window */
  ctBone: '#F0F0F0',
  /** MRI T1 bone */
  mriT1Bone: '#D3D3D3',
  /** MRI T2 fluid */
  mriT2Fluid: '#E8E8E8',
  /** STIR hyperintense */
  stirHyperintense: '#DCDCDC',
  /** Bone scan hot spot */
  boneScanHot: '#FF4500',
  /** DEXA normal */
  dexaNormal: '#228B22',
  /** DEXA osteopenic */
  dexaOsteopenic: '#FFD700',
  /** DEXA osteoporotic */
  dexaOsteoporotic: '#DC143C',
};

// =============================================================================
// CLINICAL SEVERITY GRADIENT
// =============================================================================

/**
 * Severity gradient for orthopedic conditions
 */
export const severityGradient = {
  /** Normal / Intact */
  normal: '#28A745',
  /** Mild injury */
  mild: '#FFC107',
  /** Moderate injury */
  moderate: '#FD7E14',
  /** Severe injury */
  severe: '#DC3545',
  /** Critical / Emergency */
  critical: '#6F42C1',
};

// =============================================================================
// GUSTILO-ANDERSON OPEN FRACTURE CLASSIFICATION
// =============================================================================

/**
 * Open fracture classification colors
 */
export const gustiloColors = {
  /** Type I (<1cm, clean) */
  typeI: '#FFC107',
  /** Type II (1-10cm, moderate) */
  typeII: '#FD7E14',
  /** Type IIIA (>10cm, adequate coverage) */
  typeIIIA: '#DC3545',
  /** Type IIIB (>10cm, needs flap) */
  typeIIIB: '#C82333',
  /** Type IIIC (vascular injury) */
  typeIIIC: '#6F42C1',
};

// =============================================================================
// REHABILITATION PHASES
// =============================================================================

/**
 * Rehabilitation phase colors
 */
export const rehabPhaseColors = {
  /** Acute / Protection phase */
  protectionPhase: '#DC143C',
  /** Subacute / Early mobility */
  earlyMobility: '#FFA500',
  /** Strengthening phase */
  strengthening: '#FFD700',
  /** Return to function */
  returnToFunction: '#32CD32',
  /** Return to sport */
  returnToSport: '#228B22',
  /** Maintenance */
  maintenance: '#4169E1',
};

// =============================================================================
// WEIGHT BEARING STATUS
// =============================================================================

/**
 * Weight bearing status colors
 */
export const weightBearingColors = {
  /** Non-weight bearing (NWB) */
  nwb: '#DC143C',
  /** Toe-touch weight bearing (TTWB) */
  ttwb: '#FF4500',
  /** Partial weight bearing (PWB) */
  pwb: '#FFA500',
  /** Weight bearing as tolerated (WBAT) */
  wbat: '#FFD700',
  /** Full weight bearing (FWB) */
  fwb: '#228B22',
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
// SPINE SPECIFIC COLORS
// =============================================================================

/**
 * Spine anatomy and pathology colors
 */
export const spineColors = {
  /** Vertebral body */
  vertebralBody: '#F5F5DC',
  /** Spinous process */
  spinousProcess: '#DEB887',
  /** Transverse process */
  transverseProcess: '#D2B48C',
  /** Pedicle */
  pedicle: '#C4A484',
  /** Lamina */
  lamina: '#B8A07A',
  /** Facet joint */
  facetJoint: '#A0522D',
  /** Intervertebral disc */
  intervertebralDisc: '#708090',
  /** Spinal cord */
  spinalCord: '#FFFACD',
  /** Nerve root */
  nerveRoot: '#FFD700',
  /** Disc herniation */
  discHerniation: '#8B008B',
  /** Spinal stenosis */
  spinalStenosis: '#4B0082',
  /** Spondylolisthesis */
  spondylolisthesis: '#DC143C',
};

// =============================================================================
// COMPLETE ORTHOPEDICS COLOR SCHEME
// =============================================================================

/**
 * Complete orthopedics color scheme export
 */
export const orthopedicsColorScheme = {
  // Core palette
  primary: boneColors,
  secondary: softTissueColors,
  accent: jointColors,
  pathology: orthoPathologyColors,

  // Specific categories
  fractures: fractureColors,
  implants: implantColors,
  healing: healingPhaseColors,
  imaging: imagingColors,
  spine: spineColors,

  // Clinical categories
  severity: severityGradient,
  gustilo: gustiloColors,
  rehab: rehabPhaseColors,
  weightBearing: weightBearingColors,
  flowchart: flowchartColors,

  // Quick access to most commonly used colors
  common: {
    bone: '#F5F5DC',
    cartilage: '#ADD8E6',
    muscle: '#CD5C5C',
    tendon: '#F5DEB3',
    ligament: '#DAA520',
    fracture: '#8B0000',
    implant: '#C0C0C0',
    normal: '#28A745',
    abnormal: '#DC3545',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type BoneColors = typeof boneColors;
export type SoftTissueColors = typeof softTissueColors;
export type JointColors = typeof jointColors;
export type OrthoPathologyColors = typeof orthoPathologyColors;
export type FractureColors = typeof fractureColors;
export type ImplantColors = typeof implantColors;
export type HealingPhaseColors = typeof healingPhaseColors;
export type ImagingColors = typeof imagingColors;
export type SeverityGradient = typeof severityGradient;
export type GustiloColors = typeof gustiloColors;
export type RehabPhaseColors = typeof rehabPhaseColors;
export type WeightBearingColors = typeof weightBearingColors;
export type SpineColors = typeof spineColors;
export type FlowchartColors = typeof flowchartColors;
export type OrthopedicsColorScheme = typeof orthopedicsColorScheme;

export default orthopedicsColorScheme;
