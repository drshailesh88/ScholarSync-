/**
 * anesthesiology.ts
 * Anesthesiology color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for anesthesiology and perioperative medicine including:
 * - Airway anatomy and devices (blue/teal spectrum)
 * - Monitoring waveforms (vital signs, capnography, BIS)
 * - Anesthetic agents (induction, volatiles, muscle relaxants)
 * - Regional anesthesia (spinal, epidural, nerve blocks)
 * - Pain management and clinical severity
 * - Vascular access and hemodynamic monitoring
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// PRIMARY PALETTE - Airway and Respiratory
// =============================================================================

/**
 * Airway anatomy and device colors
 */
export const airwayColors = {
  /** Upper airway mucosa */
  upperAirwayMucosa: '#FFB6C1',
  /** Tracheal rings */
  trachealRings: '#E8DCD0',
  /** Vocal cords */
  vocalCords: '#F5DEB3',
  /** Epiglottis */
  epiglottis: '#DEB887',
  /** Laryngeal structures */
  laryngealStructures: '#D2B48C',
  /** Bronchial tree */
  bronchialTree: '#87CEEB',
  /** Alveoli */
  alveoli: '#ADD8E6',
  /** ETT tube */
  ettTube: '#4169E1',
  /** ETT cuff */
  ettCuff: '#6495ED',
  /** LMA device */
  lmaDevice: '#5F9EA0',
  /** Laryngoscope blade */
  laryngoscopeBlade: '#708090',
  /** Video screen */
  videoScreen: '#2F4F4F',
};

// =============================================================================
// SECONDARY PALETTE - Monitoring and Waveforms
// =============================================================================

/**
 * Vital signs monitoring colors
 */
export const monitoringColors = {
  /** ECG waveform */
  ecgWaveform: '#00FF00',
  /** SpO2 waveform */
  spo2Waveform: '#00BFFF',
  /** Arterial line waveform */
  arterialWaveform: '#FF4500',
  /** CVP waveform */
  cvpWaveform: '#9370DB',
  /** Capnography (ETCO2) */
  capnography: '#FFD700',
  /** BIS/Sedation depth */
  bisWaveform: '#FF69B4',
  /** Temperature */
  temperature: '#FFA07A',
  /** Neuromuscular (TOF) */
  tofWaveform: '#20B2AA',
  /** Cardiac output */
  cardiacOutput: '#DC143C',
  /** Blood pressure systolic */
  bpSystolic: '#FF0000',
  /** Blood pressure diastolic */
  bpDiastolic: '#8B0000',
  /** MAP */
  meanArterialPressure: '#CD5C5C',
};

// =============================================================================
// ACCENT PALETTE - Anesthetic Agents
// =============================================================================

/**
 * Anesthetic drug class colors
 */
export const anestheticAgentColors = {
  /** Propofol (white emulsion) */
  propofol: '#FFFAF0',
  /** Etomidate */
  etomidate: '#F0E68C',
  /** Ketamine */
  ketamine: '#DDA0DD',
  /** Thiopental */
  thiopental: '#FFE4B5',
  /** Sevoflurane (volatile) */
  sevoflurane: '#B0E0E6',
  /** Desflurane (volatile) */
  desflurane: '#AFEEEE',
  /** Isoflurane (volatile) */
  isoflurane: '#E0FFFF',
  /** Nitrous oxide */
  nitrousOxide: '#87CEFA',
  /** Fentanyl (opioid) */
  fentanyl: '#98FB98',
  /** Remifentanil */
  remifentanil: '#90EE90',
  /** Morphine */
  morphine: '#8FBC8F',
  /** Succinylcholine (depolarizing NMB) */
  succinylcholine: '#FF6B6B',
  /** Rocuronium (non-depolarizing NMB) */
  rocuronium: '#FF7F50',
  /** Cisatracurium */
  cisatracurium: '#FFA500',
  /** Sugammadex (reversal) */
  sugammadex: '#32CD32',
  /** Neostigmine (reversal) */
  neostigmine: '#3CB371',
};

// =============================================================================
// REGIONAL ANESTHESIA PALETTE
// =============================================================================

/**
 * Regional and neuraxial anesthesia colors
 */
export const regionalColors = {
  /** Spinal needle */
  spinalNeedle: '#C0C0C0',
  /** Epidural catheter */
  epiduralCatheter: '#FFD700',
  /** CSF (cerebrospinal fluid) */
  csf: '#87CEEB',
  /** Epidural space */
  epiduralSpace: '#F0E68C',
  /** Dura mater */
  duraMater: '#D2B48C',
  /** Ligamentum flavum */
  ligamentumFlavum: '#DAA520',
  /** Local anesthetic spread */
  localAnestheticSpread: '#7B68EE',
  /** Nerve root */
  nerveRoot: '#FFD700',
  /** Peripheral nerve */
  peripheralNerve: '#FAFAD2',
  /** Ultrasound cone */
  ultrasoundCone: '#4682B4',
  /** Block target zone */
  blockTargetZone: '#00CED1',
  /** Brachial plexus */
  brachialPlexus: '#DDA0DD',
  /** Sciatic nerve */
  sciaticNerve: '#F0E68C',
  /** Femoral nerve */
  femoralNerve: '#FFE4B5',
};

// =============================================================================
// VASCULAR ACCESS PALETTE
// =============================================================================

/**
 * Vascular access and IV colors
 */
export const vascularAccessColors = {
  /** Arterial blood */
  arterialBlood: '#DC143C',
  /** Venous blood */
  venousBlood: '#8B0000',
  /** IV catheter */
  ivCatheter: '#4169E1',
  /** Central line */
  centralLine: '#6A5ACD',
  /** Arterial line */
  arterialLine: '#FF4500',
  /** Guidewire */
  guidewire: '#C0C0C0',
  /** IV tubing */
  ivTubing: '#87CEEB',
  /** Syringe */
  syringe: '#F5F5F5',
  /** Blood bag */
  bloodBag: '#B22222',
  /** Crystalloid */
  crystalloid: '#E0FFFF',
  /** Colloid */
  colloid: '#FFFACD',
  /** Vasopressor infusion */
  vasopressorInfusion: '#FF6347',
};

// =============================================================================
// PAIN MANAGEMENT PALETTE
// =============================================================================

/**
 * Pain assessment and management colors
 */
export const painManagementColors = {
  /** No pain (0) */
  noPain: '#228B22',
  /** Mild pain (1-3) */
  mildPain: '#9ACD32',
  /** Moderate pain (4-6) */
  moderatePain: '#FFD700',
  /** Severe pain (7-9) */
  severePain: '#FF8C00',
  /** Worst pain (10) */
  worstPain: '#DC143C',
  /** PCA pump */
  pcaPump: '#4682B4',
  /** Epidural pump */
  epiduralPump: '#9370DB',
  /** Nerve block catheter */
  nerveBlockCatheter: '#20B2AA',
  /** Multimodal therapy */
  multimodalTherapy: '#6B8E23',
};

// =============================================================================
// CLINICAL SEVERITY AND STATUS
// =============================================================================

/**
 * ASA physical status classification colors
 */
export const asaStatusColors = {
  /** ASA I - Healthy */
  asaI: '#228B22',
  /** ASA II - Mild systemic disease */
  asaII: '#9ACD32',
  /** ASA III - Severe systemic disease */
  asaIII: '#FFD700',
  /** ASA IV - Life-threatening */
  asaIV: '#FF8C00',
  /** ASA V - Moribund */
  asaV: '#DC143C',
  /** ASA VI - Brain dead donor */
  asaVI: '#2F4F4F',
  /** Emergency modifier */
  emergencyModifier: '#8B0000',
};

/**
 * Mallampati classification colors
 */
export const mallampatiColors = {
  /** Class I - Full visibility */
  classI: '#228B22',
  /** Class II - Partial uvula */
  classII: '#9ACD32',
  /** Class III - Soft palate only */
  classIII: '#FFD700',
  /** Class IV - Hard palate only */
  classIV: '#DC143C',
};

/**
 * Sedation depth colors (RASS/Ramsay)
 */
export const sedationDepthColors = {
  /** Agitated */
  agitated: '#FF4500',
  /** Alert and calm */
  alertCalm: '#228B22',
  /** Light sedation */
  lightSedation: '#9ACD32',
  /** Moderate sedation */
  moderateSedation: '#FFD700',
  /** Deep sedation */
  deepSedation: '#FF8C00',
  /** Unarousable */
  unarousable: '#DC143C',
};

// =============================================================================
// COMPLICATIONS AND EMERGENCIES
// =============================================================================

/**
 * Anesthetic complication colors
 */
export const complicationColors = {
  /** Malignant hyperthermia */
  malignantHyperthermia: '#FF0000',
  /** Anaphylaxis */
  anaphylaxis: '#FF4500',
  /** Difficult airway */
  difficultAirway: '#FFD700',
  /** Aspiration */
  aspiration: '#8B4513',
  /** Hypotension */
  hypotension: '#4169E1',
  /** Hypertension */
  hypertension: '#DC143C',
  /** Bradycardia */
  bradycardia: '#6495ED',
  /** Tachycardia */
  tachycardia: '#FF6347',
  /** Hypoxia */
  hypoxia: '#483D8B',
  /** Hypercarbia */
  hypercarbia: '#FFD700',
  /** Local anesthetic toxicity (LAST) */
  lastToxicity: '#800080',
  /** Awareness under anesthesia */
  awareness: '#FF69B4',
  /** Post-dural puncture headache */
  pdph: '#9370DB',
};

// =============================================================================
// EQUIPMENT COLORS
// =============================================================================

/**
 * Anesthesia equipment colors
 */
export const equipmentColors = {
  /** Anesthesia machine */
  anesthesiaMachine: '#696969',
  /** Ventilator */
  ventilator: '#708090',
  /** Monitor screen */
  monitorScreen: '#2F4F4F',
  /** Infusion pump */
  infusionPump: '#778899',
  /** Warming device */
  warmingDevice: '#FFA07A',
  /** Defibrillator */
  defibrillator: '#DC143C',
  /** Ultrasound machine */
  ultrasoundMachine: '#4682B4',
  /** Fiber optic scope */
  fiberopticScope: '#C0C0C0',
  /** Oxygen tank */
  oxygenTank: '#228B22',
  /** Nitrous tank */
  nitrousTank: '#4169E1',
  /** Suction */
  suction: '#FFD700',
};

// =============================================================================
// FLOWCHART DECISION COLORS
// =============================================================================

/**
 * Decision flowchart node colors for anesthesiology algorithms
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
  /** CICO emergency */
  cico: '#8B0000',
};

// =============================================================================
// COMPLETE ANESTHESIOLOGY COLOR SCHEME
// =============================================================================

/**
 * Complete anesthesiology color scheme export
 */
export const anesthesiologyColorScheme = {
  // Core palette
  primary: airwayColors,
  secondary: monitoringColors,
  accent: anestheticAgentColors,

  // Specialized categories
  regional: regionalColors,
  vascularAccess: vascularAccessColors,
  painManagement: painManagementColors,

  // Clinical assessment
  asaStatus: asaStatusColors,
  mallampati: mallampatiColors,
  sedationDepth: sedationDepthColors,

  // Complications and equipment
  complications: complicationColors,
  equipment: equipmentColors,

  // Flowchart
  flowchart: flowchartColors,

  // Quick access to most commonly used colors
  common: {
    airway: '#87CEEB',
    monitoring: '#00FF00',
    oxygenation: '#00BFFF',
    circulation: '#DC143C',
    sedation: '#B0E0E6',
    pain: '#FFD700',
    emergency: '#FF0000',
    normal: '#228B22',
    abnormal: '#DC143C',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type AirwayColors = typeof airwayColors;
export type MonitoringColors = typeof monitoringColors;
export type AnestheticAgentColors = typeof anestheticAgentColors;
export type RegionalColors = typeof regionalColors;
export type VascularAccessColors = typeof vascularAccessColors;
export type PainManagementColors = typeof painManagementColors;
export type ASAStatusColors = typeof asaStatusColors;
export type MallampatiColors = typeof mallampatiColors;
export type SedationDepthColors = typeof sedationDepthColors;
export type ComplicationColors = typeof complicationColors;
export type EquipmentColors = typeof equipmentColors;
export type FlowchartColors = typeof flowchartColors;
export type AnesthesiologyColorScheme = typeof anesthesiologyColorScheme;

export default anesthesiologyColorScheme;
