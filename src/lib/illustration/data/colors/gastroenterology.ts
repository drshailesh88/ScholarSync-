/**
 * gastroenterology.ts
 * Gastroenterology color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for gastrointestinal medicine diagrams including:
 * - GI tract organs (esophagus, stomach, intestines)
 * - Hepatobiliary structures (liver, gallbladder, bile ducts)
 * - Mucosal tissue and layers
 * - Pathological conditions (inflammation, bleeding, neoplasm)
 * - Clinical categories and severity gradients
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// PRIMARY PALETTE - GI Tract Organs
// =============================================================================

/**
 * Colors for GI tract organs from esophagus to rectum
 */
export const giTractColors = {
  /** Esophagus */
  esophagus: '#F5B7B1',
  /** Stomach */
  stomach: '#FADBD8',
  /** Gastric mucosa */
  gastricMucosa: '#F1948A',
  /** Duodenum */
  duodenum: '#ABEBC6',
  /** Jejunum */
  jejunum: '#82E0AA',
  /** Ileum */
  ileum: '#58D68D',
  /** Cecum and appendix */
  cecum: '#D5F5E3',
  /** Ascending colon */
  ascendingColon: '#A9DFBF',
  /** Transverse colon */
  transverseColon: '#7DCEA0',
  /** Descending colon */
  descendingColon: '#52BE80',
  /** Sigmoid colon */
  sigmoidColon: '#27AE60',
  /** Rectum */
  rectum: '#1E8449',
  /** Anal canal */
  analCanal: '#196F3D',
};

// =============================================================================
// SECONDARY PALETTE - Hepatobiliary System
// =============================================================================

/**
 * Colors for liver, gallbladder, and biliary tree
 */
export const hepatobiliaryColors = {
  /** Healthy liver parenchyma */
  liverHealthy: '#A0522D',
  /** Liver left lobe */
  liverLeftLobe: '#8B4513',
  /** Liver right lobe */
  liverRightLobe: '#CD853F',
  /** Cirrhotic liver */
  liverCirrhotic: '#696969',
  /** Fatty liver */
  liverFatty: '#F0E68C',
  /** Gallbladder */
  gallbladder: '#90EE90',
  /** Bile */
  bile: '#9ACD32',
  /** Common bile duct */
  commonBileDuct: '#FFD700',
  /** Cystic duct */
  cysticDuct: '#DAA520',
  /** Hepatic ducts */
  hepaticDuct: '#B8860B',
  /** Portal vein */
  portalVein: '#4169E1',
  /** Hepatic artery */
  hepaticArtery: '#DC143C',
  /** Hepatic vein */
  hepaticVein: '#6495ED',
};

// =============================================================================
// TERTIARY PALETTE - Pancreas
// =============================================================================

/**
 * Colors for pancreatic structures
 */
export const pancreaticColors = {
  /** Healthy pancreas */
  pancreasHealthy: '#FFE4B5',
  /** Pancreatic head */
  pancreaticHead: '#FFDAB9',
  /** Pancreatic body */
  pancreaticBody: '#FFD39B',
  /** Pancreatic tail */
  pancreaticTail: '#FFCC80',
  /** Main pancreatic duct */
  pancreaticDuct: '#FFA500',
  /** Ampulla of Vater */
  ampullaOfVater: '#FF8C00',
  /** Acute pancreatitis */
  acutePancreatitis: '#FF6347',
  /** Necrosis */
  pancreaticNecrosis: '#2F4F4F',
  /** Pseudocyst */
  pseudocyst: '#B0E0E6',
};

// =============================================================================
// MUCOSAL TISSUE COLORS
// =============================================================================

/**
 * Colors representing mucosal layers and conditions
 */
export const mucosalColors = {
  /** Normal mucosa */
  normalMucosa: '#FFB6C1',
  /** Hyperemic mucosa */
  hyperemicMucosa: '#FF6B6B',
  /** Atrophic mucosa */
  atrophicMucosa: '#D3D3D3',
  /** Metaplastic mucosa (Barrett's) */
  metaplasticMucosa: '#FF8C69',
  /** Submucosa */
  submucosa: '#FAFAD2',
  /** Muscularis */
  muscularis: '#DEB887',
  /** Serosa */
  serosa: '#F5F5DC',
  /** Villous lining */
  villous: '#98FB98',
  /** Crypt epithelium */
  cryptEpithelium: '#90EE90',
};

// =============================================================================
// PATHOLOGY PALETTE - Disease States
// =============================================================================

/**
 * Colors for pathological conditions
 */
export const pathologyColors = {
  /** Active inflammation */
  inflammation: '#FF4500',
  /** Chronic inflammation */
  chronicInflammation: '#CD5C5C',
  /** Ulceration */
  ulceration: '#8B0000',
  /** Active bleeding */
  activeBleeding: '#DC143C',
  /** Old blood/melena */
  oldBlood: '#4A0000',
  /** Edema */
  edema: '#87CEEB',
  /** Neoplasm/Malignancy */
  malignancy: '#8B008B',
  /** Polyp */
  polyp: '#FF69B4',
  /** Adenoma */
  adenoma: '#DB7093',
  /** Fibrosis */
  fibrosis: '#9B59B6',
  /** Stricture */
  stricture: '#6A5ACD',
  /** Fistula tract */
  fistula: '#4B0082',
  /** Perforation */
  perforation: '#2C3E50',
  /** Ischemia */
  ischemia: '#708090',
  /** Varices */
  varices: '#1E90FF',
  /** Abscess */
  abscess: '#BDB76B',
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
};

// =============================================================================
// ENDOSCOPY FINDINGS
// =============================================================================

/**
 * Colors for endoscopic findings and classifications
 */
export const endoscopyColors = {
  /** LA Grade A esophagitis */
  laGradeA: '#98FB98',
  /** LA Grade B esophagitis */
  laGradeB: '#FFD700',
  /** LA Grade C esophagitis */
  laGradeC: '#FFA500',
  /** LA Grade D esophagitis */
  laGradeD: '#FF4500',
  /** Forrest Ia (spurting) */
  forrestIa: '#DC143C',
  /** Forrest Ib (oozing) */
  forrestIb: '#FF6347',
  /** Forrest IIa (visible vessel) */
  forrestIIa: '#FF8C00',
  /** Forrest IIb (adherent clot) */
  forrestIIb: '#FFD700',
  /** Forrest IIc (flat spot) */
  forrestIIc: '#BDB76B',
  /** Forrest III (clean base) */
  forrestIII: '#98FB98',
  /** Barrett's segment */
  barrettsSegment: '#FF8C69',
  /** Dysplasia */
  dysplasia: '#FF1493',
};

// =============================================================================
// SCORING SYSTEMS
// =============================================================================

/**
 * Colors for scoring systems (Child-Pugh, MELD)
 */
export const scoringColors = {
  /** Child-Pugh A */
  childPughA: '#28A745',
  /** Child-Pugh B */
  childPughB: '#FFC107',
  /** Child-Pugh C */
  childPughC: '#DC3545',
  /** MELD low (<10) */
  meldLow: '#28A745',
  /** MELD moderate (10-19) */
  meldModerate: '#FFC107',
  /** MELD high (20-29) */
  meldHigh: '#FD7E14',
  /** MELD very high (>=30) */
  meldVeryHigh: '#DC3545',
  /** Mayo score remission */
  mayoRemission: '#28A745',
  /** Mayo score mild */
  mayoMild: '#FFC107',
  /** Mayo score moderate */
  mayoModerate: '#FD7E14',
  /** Mayo score severe */
  mayoSevere: '#DC3545',
};

// =============================================================================
// PROCEDURE COLORS
// =============================================================================

/**
 * Colors for endoscopic procedures and equipment
 */
export const procedureColors = {
  /** Endoscope */
  endoscope: '#2C3E50',
  /** Biopsy forceps */
  biopsyForceps: '#7F8C8D',
  /** Hemostatic clip */
  hemostaticClip: '#C0C0C0',
  /** Snare */
  snare: '#A0A0A0',
  /** Argon plasma */
  argonPlasma: '#00BFFF',
  /** Injection needle */
  injectionNeedle: '#708090',
  /** Stent */
  stent: '#D4AF37',
  /** Balloon dilator */
  balloonDilator: '#FFC0CB',
  /** Hemospray */
  hemospray: '#F0E68C',
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
  /** Referral */
  referral: '#6F42C1',
};

// =============================================================================
// COMPLETE GASTROENTEROLOGY COLOR SCHEME
// =============================================================================

/**
 * Complete gastroenterology color scheme export
 */
export const gastroenterologyColorScheme = {
  // Core palette
  primary: giTractColors,
  secondary: hepatobiliaryColors,
  tertiary: pancreaticColors,
  mucosal: mucosalColors,
  pathology: pathologyColors,

  // Clinical categories
  severity: severityGradient,
  endoscopy: endoscopyColors,
  scoring: scoringColors,
  procedure: procedureColors,
  flowchart: flowchartColors,

  // Quick access to most commonly used colors
  common: {
    stomach: '#FADBD8',
    liver: '#A0522D',
    bile: '#9ACD32',
    intestine: '#82E0AA',
    colon: '#52BE80',
    pancreas: '#FFE4B5',
    inflammation: '#FF4500',
    bleeding: '#DC143C',
    malignancy: '#8B008B',
    normal: '#28A745',
    abnormal: '#DC3545',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type GITractColors = typeof giTractColors;
export type HepatobiliaryColors = typeof hepatobiliaryColors;
export type PancreaticColors = typeof pancreaticColors;
export type MucosalColors = typeof mucosalColors;
export type PathologyColors = typeof pathologyColors;
export type SeverityGradient = typeof severityGradient;
export type EndoscopyColors = typeof endoscopyColors;
export type ScoringColors = typeof scoringColors;
export type ProcedureColors = typeof procedureColors;
export type FlowchartColors = typeof flowchartColors;
export type GastroenterologyColorScheme = typeof gastroenterologyColorScheme;

export default gastroenterologyColorScheme;
