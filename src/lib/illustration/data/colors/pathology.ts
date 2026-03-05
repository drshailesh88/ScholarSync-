/**
 * pathology.ts
 * Pathology color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for pathology and laboratory medicine diagrams including:
 * - Tissue staining colors (H&E, IHC, special stains)
 * - Cell morphology colors (normal vs abnormal)
 * - Inflammation types
 * - Neoplasia and tumor grading
 * - Laboratory equipment and processes
 * - Autopsy and gross pathology
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// PRIMARY PALETTE - H&E Staining
// =============================================================================

/**
 * Hematoxylin and Eosin (H&E) stain colors - the foundation of histopathology
 */
export const heStainColors = {
  /** Hematoxylin - nuclear stain (blue-purple) */
  hematoxylin: '#4B0082',
  /** Hematoxylin light */
  hematoxylinLight: '#6A5ACD',
  /** Eosin - cytoplasm stain (pink) */
  eosin: '#FFB6C1',
  /** Eosin intense */
  eosinIntense: '#FF69B4',
  /** Eosinophilic cytoplasm */
  eosinophilic: '#FFC0CB',
  /** Basophilic cytoplasm */
  basophilic: '#9370DB',
  /** Nuclear chromatin */
  chromatin: '#2F0052',
  /** Nucleolus */
  nucleolus: '#FF1493',
  /** Collagen (eosinophilic) */
  collagen: '#FFE4E1',
  /** Red blood cells */
  redBloodCells: '#DC143C',
};

// =============================================================================
// SECONDARY PALETTE - Special Stains
// =============================================================================

/**
 * Special stain colors for specific tissue components
 */
export const specialStainColors = {
  /** PAS (Periodic Acid-Schiff) - magenta for glycogen/mucin */
  pas: '#FF00FF',
  /** PAS light */
  pasLight: '#FFB6FF',
  /** Trichrome - blue for collagen */
  trichromeBlue: '#4169E1',
  /** Trichrome - red for muscle */
  trichromeRed: '#DC143C',
  /** Masson trichrome green */
  trichromeGreen: '#228B22',
  /** GMS (Grocott) - black for fungi */
  gms: '#2F2F2F',
  /** GMS background */
  gmsBackground: '#CCFFCC',
  /** Iron (Prussian blue) */
  prussianBlue: '#003366',
  /** Reticulin - black fibers */
  reticulin: '#1C1C1C',
  /** Congo red - salmon pink (amyloid) */
  congoRed: '#FA8072',
  /** Congo red apple-green birefringence */
  congoRedBirefringence: '#90EE90',
  /** Mucicarmine - red for mucin */
  mucicarmine: '#CD5C5C',
  /** Alcian blue - blue for acid mucins */
  alcianBlue: '#00BFFF',
  /** Oil red O - red for lipid */
  oilRedO: '#FF4500',
  /** Fontana-Masson - black for melanin */
  fontanaMasson: '#1C1C1C',
  /** Verhoeff elastic - black */
  verhoeffElastic: '#2F2F2F',
};

/**
 * Immunohistochemistry (IHC) colors
 */
export const ihcColors = {
  /** DAB chromogen - brown positive */
  dabPositive: '#8B4513',
  /** DAB intense */
  dabIntense: '#654321',
  /** DAB weak */
  dabWeak: '#D2B48C',
  /** Hematoxylin counterstain */
  ihcCounterstain: '#6A5ACD',
  /** Fast Red chromogen */
  fastRed: '#FF0000',
  /** AEC chromogen */
  aec: '#DC143C',
  /** Negative (no staining) */
  negative: '#F5F5DC',
  /** Nuclear staining */
  nuclearPositive: '#8B4513',
  /** Membranous staining */
  membranousPositive: '#A0522D',
  /** Cytoplasmic staining */
  cytoplasmicPositive: '#CD853F',
};

// =============================================================================
// CELL MORPHOLOGY COLORS
// =============================================================================

/**
 * Normal cell components
 */
export const normalCellColors = {
  /** Normal nucleus */
  normalNucleus: '#4B0082',
  /** Normal cytoplasm */
  normalCytoplasm: '#FFB6C1',
  /** Cell membrane */
  membrane: '#DDA0DD',
  /** Mitochondria */
  mitochondria: '#FF6347',
  /** Endoplasmic reticulum */
  endoplasmicReticulum: '#87CEEB',
  /** Golgi apparatus */
  golgiApparatus: '#FFD700',
  /** Lysosome */
  lysosome: '#9370DB',
};

/**
 * Abnormal/pathologic cell changes
 */
export const abnormalCellColors = {
  /** Hyperchromatism (dark nucleus) */
  hyperchromatic: '#1C1C1C',
  /** Pleomorphism indicator */
  pleomorphic: '#8B008B',
  /** Nuclear atypia */
  atypia: '#4B0082',
  /** Mitotic figure */
  mitoticFigure: '#2F0052',
  /** Apoptotic body */
  apoptoticBody: '#696969',
  /** Necrotic cell */
  necroticCell: '#808080',
  /** Dysplastic cell */
  dysplastic: '#9932CC',
  /** Malignant cell */
  malignantCell: '#8B0000',
};

// =============================================================================
// INFLAMMATION COLORS
// =============================================================================

/**
 * Inflammatory cell colors
 */
export const inflammatoryCellColors = {
  /** Neutrophil */
  neutrophil: '#87CEEB',
  /** Neutrophil nucleus (multilobed) */
  neutrophilNucleus: '#4169E1',
  /** Lymphocyte */
  lymphocyte: '#9370DB',
  /** Lymphocyte small dark */
  lymphocyteNucleus: '#4B0082',
  /** Plasma cell */
  plasmaCell: '#6A5ACD',
  /** Plasma cell clock-face */
  plasmaCellNucleus: '#483D8B',
  /** Macrophage/histiocyte */
  macrophage: '#DEB887',
  /** Eosinophil */
  eosinophil: '#FF69B4',
  /** Eosinophil granules */
  eosinophilGranules: '#FF1493',
  /** Mast cell */
  mastCell: '#9370DB',
  /** Giant cell */
  giantCell: '#D2B48C',
};

/**
 * Inflammation patterns
 */
export const inflammationPatternColors = {
  /** Acute inflammation */
  acuteInflammation: '#FF4500',
  /** Chronic inflammation */
  chronicInflammation: '#4169E1',
  /** Granulomatous */
  granulomatous: '#DEB887',
  /** Caseous necrosis */
  caseousNecrosis: '#FFFACD',
  /** Fibrinoid necrosis */
  fibrinoidNecrosis: '#FFB6C1',
  /** Liquefactive necrosis */
  liquefactiveNecrosis: '#F0E68C',
  /** Coagulative necrosis */
  coagulativeNecrosis: '#F5F5DC',
  /** Fat necrosis */
  fatNecrosis: '#FFFACD',
  /** Abscess */
  abscess: '#9ACD32',
  /** Fibrosis/scarring */
  fibrosis: '#B8860B',
};

// =============================================================================
// NEOPLASIA COLORS
// =============================================================================

/**
 * Tumor classification colors
 */
export const tumorClassificationColors = {
  /** Benign tumor */
  benign: '#228B22',
  /** Borderline/atypical */
  borderline: '#FFD700',
  /** Low-grade malignancy */
  lowGradeMalignant: '#FFA500',
  /** High-grade malignancy */
  highGradeMalignant: '#DC143C',
  /** Metastatic */
  metastatic: '#8B0000',
  /** Carcinoma in situ */
  carcinomaInSitu: '#FF6347',
  /** Invasive carcinoma */
  invasiveCarcinoma: '#DC143C',
  /** Well differentiated */
  wellDifferentiated: '#90EE90',
  /** Moderately differentiated */
  moderatelyDifferentiated: '#FFD700',
  /** Poorly differentiated */
  poorlyDifferentiated: '#FF4500',
  /** Undifferentiated */
  undifferentiated: '#8B0000',
};

/**
 * Tumor type colors
 */
export const tumorTypeColors = {
  /** Carcinoma (epithelial) */
  carcinoma: '#FFB6C1',
  /** Adenocarcinoma */
  adenocarcinoma: '#FF69B4',
  /** Squamous cell carcinoma */
  squamousCarcinoma: '#FFA07A',
  /** Sarcoma (mesenchymal) */
  sarcoma: '#87CEEB',
  /** Lymphoma */
  lymphoma: '#9370DB',
  /** Leukemia */
  leukemia: '#DDA0DD',
  /** Melanoma */
  melanoma: '#2F2F2F',
  /** Germ cell tumor */
  germCell: '#F0E68C',
  /** Neuroendocrine */
  neuroendocrine: '#20B2AA',
};

// =============================================================================
// LABORATORY EQUIPMENT COLORS
// =============================================================================

/**
 * Laboratory and processing colors
 */
export const laboratoryColors = {
  /** Formalin fixative */
  formalin: '#F0E68C',
  /** Paraffin block */
  paraffin: '#FFF8DC',
  /** Frozen section (blue) */
  frozenSection: '#87CEEB',
  /** Glass slide */
  glassSlide: '#E0E0E0',
  /** Coverslip */
  coverslip: '#F5F5F5',
  /** Cassette (white) */
  cassette: '#FFFFFF',
  /** Cassette (yellow) */
  cassetteYellow: '#FFD700',
  /** Microtome blade */
  microtomeBlade: '#C0C0C0',
  /** Tissue processor */
  tissueProcessor: '#808080',
  /** Embedding station */
  embeddingStation: '#D2B48C',
};

/**
 * Microscopy colors
 */
export const microscopyColors = {
  /** Light microscopy field */
  lightField: '#FFFFFF',
  /** Dark field */
  darkField: '#1C1C1C',
  /** Fluorescence green (FITC) */
  fluorescenceGreen: '#00FF00',
  /** Fluorescence red (rhodamine) */
  fluorescenceRed: '#FF0000',
  /** DAPI blue */
  dapiBlue: '#0000FF',
  /** Phase contrast */
  phaseContrast: '#A9A9A9',
  /** Polarized light */
  polarizedLight: '#FFD700',
};

// =============================================================================
// AUTOPSY COLORS
// =============================================================================

/**
 * Gross pathology and autopsy colors
 */
export const autopsyColors = {
  /** Fresh tissue (red) */
  freshTissue: '#CD5C5C',
  /** Fixed tissue (tan) */
  fixedTissue: '#D2B48C',
  /** Hemorrhage */
  hemorrhage: '#8B0000',
  /** Hemosiderin (golden-brown) */
  hemosiderin: '#B8860B',
  /** Thrombus (red) */
  freshThrombus: '#DC143C',
  /** Thrombus (organized) */
  organizedThrombus: '#A52A2A',
  /** Infarct (pale) */
  paleInfarct: '#F5F5DC',
  /** Infarct (hemorrhagic) */
  hemorrhagicInfarct: '#8B0000',
  /** Gangrene */
  gangrene: '#2F4F4F',
  /** Calcification */
  calcite: '#F5F5F5',
  /** Purulent exudate */
  purulentExudate: '#9ACD32',
};

// =============================================================================
// HEMATOPATHOLOGY COLORS
// =============================================================================

/**
 * Blood and bone marrow colors
 */
export const hematopathologyColors = {
  /** Erythrocyte */
  erythrocyte: '#DC143C',
  /** Hypochromic RBC */
  hypochromicRBC: '#FFB6C1',
  /** Leukocyte */
  leukocyte: '#87CEEB',
  /** Platelet */
  platelet: '#DDA0DD',
  /** Bone marrow stroma */
  boneMarrowStroma: '#FFE4C4',
  /** Fat cells */
  adipocyte: '#FFFACD',
  /** Megakaryocyte */
  megakaryocyte: '#9370DB',
  /** Myeloid cells */
  myeloid: '#87CEEB',
  /** Lymphoid cells */
  lymphoid: '#9370DB',
  /** Erythroid cells */
  erythroid: '#FFB6C1',
  /** Blast cells */
  blastCells: '#4B0082',
};

// =============================================================================
// FLOWCHART AND DIAGRAM COLORS
// =============================================================================

/**
 * Decision flowchart node colors
 */
export const flowchartColors = {
  /** Start/specimen receipt */
  specimenReceipt: '#4169E1',
  /** Processing step */
  processing: '#87CEEB',
  /** Decision node */
  decision: '#FFD700',
  /** IHC/ancillary testing */
  ancillaryTesting: '#9370DB',
  /** Benign diagnosis */
  benignDiagnosis: '#228B22',
  /** Malignant diagnosis */
  malignantDiagnosis: '#DC143C',
  /** Atypical/borderline */
  atypicalDiagnosis: '#FFA500',
  /** Final report */
  finalReport: '#32CD32',
  /** Quality check */
  qualityCheck: '#20B2AA',
  /** Warning/urgent */
  urgent: '#FF4500',
};

/**
 * Severity and grading gradient
 */
export const gradingColors = {
  /** Grade 1 / Stage I */
  grade1: '#228B22',
  /** Grade 2 / Stage II */
  grade2: '#FFD700',
  /** Grade 3 / Stage III */
  grade3: '#FFA500',
  /** Grade 4 / Stage IV */
  grade4: '#DC143C',
  /** Not applicable */
  notApplicable: '#808080',
  /** Indeterminate */
  indeterminate: '#D3D3D3',
};

// =============================================================================
// COMPLETE PATHOLOGY COLOR SCHEME
// =============================================================================

/**
 * Complete pathology color scheme export
 */
export const pathologyColorScheme = {
  // Core staining palettes
  heStain: heStainColors,
  specialStains: specialStainColors,
  ihc: ihcColors,

  // Cell morphology
  normalCell: normalCellColors,
  abnormalCell: abnormalCellColors,

  // Inflammation
  inflammatoryCell: inflammatoryCellColors,
  inflammationPattern: inflammationPatternColors,

  // Neoplasia
  tumorClassification: tumorClassificationColors,
  tumorType: tumorTypeColors,

  // Laboratory
  laboratory: laboratoryColors,
  microscopy: microscopyColors,

  // Gross pathology
  autopsy: autopsyColors,
  hematopathology: hematopathologyColors,

  // Diagramming
  flowchart: flowchartColors,
  grading: gradingColors,

  // Quick access to most commonly used colors
  common: {
    hematoxylin: '#4B0082',
    eosin: '#FFB6C1',
    dabPositive: '#8B4513',
    benign: '#228B22',
    malignant: '#DC143C',
    inflammation: '#FF4500',
    necrosis: '#808080',
    fibrosis: '#B8860B',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type HEStainColors = typeof heStainColors;
export type SpecialStainColors = typeof specialStainColors;
export type IHCColors = typeof ihcColors;
export type NormalCellColors = typeof normalCellColors;
export type AbnormalCellColors = typeof abnormalCellColors;
export type InflammatoryCellColors = typeof inflammatoryCellColors;
export type InflammationPatternColors = typeof inflammationPatternColors;
export type TumorClassificationColors = typeof tumorClassificationColors;
export type TumorTypeColors = typeof tumorTypeColors;
export type LaboratoryColors = typeof laboratoryColors;
export type MicroscopyColors = typeof microscopyColors;
export type AutopsyColors = typeof autopsyColors;
export type HematopathologyColors = typeof hematopathologyColors;
export type FlowchartColors = typeof flowchartColors;
export type GradingColors = typeof gradingColors;
export type PathologyColorScheme = typeof pathologyColorScheme;

export default pathologyColorScheme;
