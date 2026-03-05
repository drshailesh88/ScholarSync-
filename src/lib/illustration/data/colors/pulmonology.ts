/**
 * pulmonology.ts
 * Pulmonology color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for respiratory medicine diagrams including:
 * - Airways and bronchial structures (light blue)
 * - Lung parenchyma and tissue (pink/coral)
 * - Oxygenation states (teal/cyan)
 * - Pathological conditions (red/purple spectrum)
 * - Clinical categories and severity gradients
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// PRIMARY PALETTE - Airways (Light Blue)
// =============================================================================

/**
 * Airway colors for trachea, bronchi, and bronchioles
 */
export const airwayColors = {
  /** Trachea - main airway */
  trachea: '#87CEEB',
  /** Main bronchi */
  mainBronchus: '#6BB3D9',
  /** Lobar bronchi */
  lobarBronchus: '#4FA3D1',
  /** Segmental bronchi */
  segmentalBronchus: '#3B94C6',
  /** Terminal bronchioles */
  terminalBronchiole: '#2A80B5',
  /** Respiratory bronchioles */
  respiratoryBronchiole: '#1E6DA0',
  /** Airway lumen highlight */
  airwayLumen: '#B8E2F7',
  /** Airway wall */
  airwayWall: '#5BA0C9',
};

// =============================================================================
// SECONDARY PALETTE - Lung Tissue (Pink/Coral)
// =============================================================================

/**
 * Lung parenchyma and alveolar colors
 */
export const lungTissueColors = {
  /** Healthy lung parenchyma */
  healthyLung: '#FFB6C1',
  /** Alveolar space */
  alveolarSpace: '#FFC1CC',
  /** Alveolar wall */
  alveolarWall: '#FF9BAA',
  /** Type I pneumocytes */
  typeIPneumocyte: '#FFA5B4',
  /** Type II pneumocytes */
  typeIIPneumocyte: '#FF8FA0',
  /** Surfactant layer */
  surfactant: '#FFE4E9',
  /** Interstitium */
  interstitium: '#FFCCD5',
  /** Pleura */
  pleura: '#F5A5B5',
};

// =============================================================================
// ACCENT PALETTE - Oxygenation (Teal/Cyan)
// =============================================================================

/**
 * Oxygenation state colors
 */
export const oxygenationColors = {
  /** High oxygen saturation (>95%) */
  highO2: '#00CED1',
  /** Normal oxygen saturation (90-95%) */
  normalO2: '#20B2AA',
  /** Mild hypoxemia (85-90%) */
  mildHypoxemia: '#5F9EA0',
  /** Moderate hypoxemia (80-85%) */
  moderateHypoxemia: '#4682B4',
  /** Severe hypoxemia (<80%) */
  severeHypoxemia: '#483D8B',
  /** Oxygenated blood */
  oxygenatedBlood: '#DC143C',
  /** Deoxygenated blood */
  deoxygenatedBlood: '#8B0000',
  /** CO2 representation */
  carbonDioxide: '#708090',
};

// =============================================================================
// PATHOLOGY PALETTE - Disease States (Red/Purple Spectrum)
// =============================================================================

/**
 * Pathological condition colors
 */
export const pathologyColors = {
  /** Inflammation */
  inflammation: '#FF6B6B',
  /** Infection/Pneumonia */
  infection: '#FF4757',
  /** Fibrosis */
  fibrosis: '#9B59B6',
  /** Malignancy */
  malignancy: '#8E44AD',
  /** Edema */
  edema: '#74B9FF',
  /** Hemorrhage */
  hemorrhage: '#C0392B',
  /** Necrosis */
  necrosis: '#2C3E50',
  /** Consolidation */
  consolidation: '#E74C3C',
  /** Ground glass opacity */
  groundGlass: '#D5DBDB',
  /** Emphysema */
  emphysema: '#BDC3C7',
  /** Atelectasis */
  atelectasis: '#7F8C8D',
  /** Pleural effusion */
  pleuralEffusion: '#3498DB',
  /** Pneumothorax */
  pneumothorax: '#1ABC9C',
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
  /** Critical */
  critical: '#6F42C1',
};

// =============================================================================
// DIAGNOSTIC CATEGORIES
// =============================================================================

/**
 * Diagnostic and procedure colors
 */
export const diagnosticColors = {
  /** PFT - Obstructive pattern */
  obstructive: '#FF9800',
  /** PFT - Restrictive pattern */
  restrictive: '#2196F3',
  /** PFT - Mixed pattern */
  mixed: '#9C27B0',
  /** Positive finding */
  positive: '#F44336',
  /** Negative finding */
  negative: '#4CAF50',
  /** Indeterminate */
  indeterminate: '#9E9E9E',
  /** Bronchoscopy landmarks */
  bronchoscopyLandmark: '#00BCD4',
  /** Biopsy site */
  biopsySite: '#E91E63',
};

// =============================================================================
// VENTILATOR AND MONITORING
// =============================================================================

/**
 * Ventilator waveform and monitoring colors
 */
export const ventilatorColors = {
  /** Pressure waveform */
  pressureWave: '#2196F3',
  /** Flow waveform */
  flowWave: '#4CAF50',
  /** Volume waveform */
  volumeWave: '#FF9800',
  /** Inspiratory phase */
  inspiration: '#03A9F4',
  /** Expiratory phase */
  expiration: '#8BC34A',
  /** Alarm state */
  alarm: '#F44336',
  /** Target/Goal */
  target: '#9C27B0',
  /** PEEP indicator */
  peep: '#00BCD4',
};

// =============================================================================
// SLEEP MEDICINE
// =============================================================================

/**
 * Sleep study and polysomnography colors
 */
export const sleepStudyColors = {
  /** Awake state */
  awake: '#FFEB3B',
  /** N1 sleep */
  n1Sleep: '#03A9F4',
  /** N2 sleep */
  n2Sleep: '#2196F3',
  /** N3 sleep (deep sleep) */
  n3Sleep: '#1565C0',
  /** REM sleep */
  remSleep: '#E91E63',
  /** Apnea event */
  apneaEvent: '#F44336',
  /** Hypopnea event */
  hypopneaEvent: '#FF9800',
  /** Oxygen desaturation */
  desaturation: '#9C27B0',
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
};

// =============================================================================
// COMPLETE PULMONOLOGY COLOR SCHEME
// =============================================================================

/**
 * Complete pulmonology color scheme export
 */
export const pulmonologyColorScheme = {
  // Core palette
  primary: airwayColors,
  secondary: lungTissueColors,
  accent: oxygenationColors,
  pathology: pathologyColors,

  // Clinical categories
  severity: severityGradient,
  diagnostic: diagnosticColors,
  ventilator: ventilatorColors,
  sleepStudy: sleepStudyColors,
  flowchart: flowchartColors,

  // Quick access to most commonly used colors
  common: {
    airway: '#87CEEB',
    lung: '#FFB6C1',
    oxygen: '#00CED1',
    inflammation: '#FF6B6B',
    fibrosis: '#9B59B6',
    normal: '#28A745',
    abnormal: '#DC3545',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type AirwayColors = typeof airwayColors;
export type LungTissueColors = typeof lungTissueColors;
export type OxygenationColors = typeof oxygenationColors;
export type PathologyColors = typeof pathologyColors;
export type SeverityGradient = typeof severityGradient;
export type DiagnosticColors = typeof diagnosticColors;
export type VentilatorColors = typeof ventilatorColors;
export type SleepStudyColors = typeof sleepStudyColors;
export type FlowchartColors = typeof flowchartColors;
export type PulmonologyColorScheme = typeof pulmonologyColorScheme;

export default pulmonologyColorScheme;
