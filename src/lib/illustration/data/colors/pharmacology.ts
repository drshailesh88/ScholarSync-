/**
 * pharmacology.ts
 * Pharmacology color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for pharmacology diagrams including:
 * - Drug classes (distinct colors for major therapeutic categories)
 * - Pharmacokinetics (ADME pathway visualization)
 * - Drug interactions (warning and severity colors)
 * - Receptor pharmacology (agonist/antagonist effects)
 * - Therapeutic monitoring (therapeutic window visualization)
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// PRIMARY PALETTE - Drug Classes
// =============================================================================

/**
 * Major drug class colors for therapeutic categories
 */
export const drugClassColors = {
  /** Antibiotics/Antimicrobials - Green (healing/life) */
  antibiotic: '#22c55e',
  /** Antiviral agents - Teal */
  antiviral: '#14b8a6',
  /** Antifungal agents - Olive */
  antifungal: '#84cc16',
  /** Analgesics/Pain - Blue (calming) */
  analgesic: '#3b82f6',
  /** Opioids - Deep blue */
  opioid: '#1e40af',
  /** NSAIDs - Sky blue */
  nsaid: '#0ea5e9',
  /** Cardiovascular - Red (heart) */
  cardiovascular: '#ef4444',
  /** Antihypertensives - Rose */
  antihypertensive: '#f43f5e',
  /** Anticoagulants - Crimson */
  anticoagulant: '#dc2626',
  /** CNS/Psychotropics - Purple (brain) */
  cns: '#a855f7',
  /** Antidepressants - Violet */
  antidepressant: '#8b5cf6',
  /** Antipsychotics - Indigo */
  antipsychotic: '#6366f1',
  /** Anticonvulsants - Purple-blue */
  anticonvulsant: '#7c3aed',
  /** Sedatives/Hypnotics - Lavender */
  sedative: '#c4b5fd',
  /** Endocrine/Hormones - Yellow/Gold */
  endocrine: '#eab308',
  /** Diabetes medications - Amber */
  diabetes: '#f59e0b',
  /** Insulin - Orange */
  insulin: '#f97316',
  /** Corticosteroids - Gold */
  corticosteroid: '#fbbf24',
  /** GI medications - Orange/Brown */
  gastrointestinal: '#ea580c',
  /** Respiratory - Cyan */
  respiratory: '#06b6d4',
  /** Immunosuppressants - Gray-blue */
  immunosuppressant: '#64748b',
  /** Chemotherapy/Oncology - Magenta */
  chemotherapy: '#ec4899',
  /** Biologics - Pink */
  biologic: '#f472b6',
};

// =============================================================================
// SECONDARY PALETTE - Pharmacokinetics (ADME)
// =============================================================================

/**
 * ADME process colors
 */
export const admeColors = {
  /** Absorption - Light green (entry) */
  absorption: '#4ade80',
  /** Distribution - Blue (spreading) */
  distribution: '#60a5fa',
  /** Metabolism - Orange (transformation) */
  metabolism: '#fb923c',
  /** Excretion - Brown (exit) */
  excretion: '#a16207',

  // Specific processes
  /** Oral absorption */
  oralAbsorption: '#22c55e',
  /** IV administration (direct) */
  ivAdministration: '#3b82f6',
  /** First-pass metabolism */
  firstPass: '#f97316',
  /** Hepatic metabolism */
  hepaticMetabolism: '#ea580c',
  /** Renal excretion */
  renalExcretion: '#b45309',
  /** Biliary excretion */
  biliaryExcretion: '#92400e',
  /** Plasma protein binding */
  proteinBound: '#9333ea',
  /** Free drug */
  freeDrug: '#22d3ee',
  /** Active metabolite */
  activeMetabolite: '#84cc16',
  /** Inactive metabolite */
  inactiveMetabolite: '#9ca3af',
};

// =============================================================================
// ACCENT PALETTE - Receptor Pharmacology
// =============================================================================

/**
 * Receptor interaction colors
 */
export const receptorColors = {
  /** Receptor (neutral) */
  receptor: '#6b7280',
  /** Agonist effect (activation) */
  agonist: '#22c55e',
  /** Partial agonist */
  partialAgonist: '#84cc16',
  /** Antagonist effect (blocking) */
  antagonist: '#ef4444',
  /** Inverse agonist */
  inverseAgonist: '#dc2626',
  /** Allosteric modulator positive */
  positiveModulator: '#10b981',
  /** Allosteric modulator negative */
  negativeModulator: '#f87171',
  /** Competitive binding */
  competitive: '#f59e0b',
  /** Non-competitive binding */
  nonCompetitive: '#8b5cf6',
  /** Irreversible binding */
  irreversible: '#7f1d1d',
};

// =============================================================================
// DRUG INTERACTION COLORS
// =============================================================================

/**
 * Drug interaction severity and type
 */
export const interactionColors = {
  /** No interaction */
  noInteraction: '#22c55e',
  /** Minor interaction */
  minor: '#84cc16',
  /** Moderate interaction - use caution */
  moderate: '#f59e0b',
  /** Major interaction - generally avoid */
  major: '#ef4444',
  /** Contraindicated - do not use together */
  contraindicated: '#7f1d1d',

  // Interaction types
  /** Synergistic effect */
  synergy: '#22c55e',
  /** Additive effect */
  additive: '#3b82f6',
  /** Antagonistic effect */
  antagonism: '#ef4444',
  /** Potentiation */
  potentiation: '#10b981',
  /** Inhibition */
  inhibition: '#dc2626',
  /** Induction */
  induction: '#f97316',
};

// =============================================================================
// CYP450 ENZYME COLORS
// =============================================================================

/**
 * CYP450 enzyme family colors
 */
export const cyp450Colors = {
  /** CYP3A4 - Most common */
  cyp3a4: '#ef4444',
  /** CYP2D6 */
  cyp2d6: '#3b82f6',
  /** CYP2C9 */
  cyp2c9: '#22c55e',
  /** CYP2C19 */
  cyp2c19: '#a855f7',
  /** CYP1A2 */
  cyp1a2: '#f59e0b',
  /** CYP2B6 */
  cyp2b6: '#06b6d4',
  /** CYP2E1 */
  cyp2e1: '#ec4899',

  // States
  /** Normal metabolism */
  normalMetabolizer: '#22c55e',
  /** Poor metabolizer */
  poorMetabolizer: '#ef4444',
  /** Intermediate metabolizer */
  intermediateMetabolizer: '#f59e0b',
  /** Ultra-rapid metabolizer */
  ultraRapidMetabolizer: '#3b82f6',
};

// =============================================================================
// THERAPEUTIC DRUG MONITORING
// =============================================================================

/**
 * TDM and therapeutic window colors
 */
export const tdmColors = {
  /** Subtherapeutic level */
  subtherapeutic: '#3b82f6',
  /** Therapeutic level (in range) */
  therapeutic: '#22c55e',
  /** Above therapeutic */
  supratherapeutic: '#f59e0b',
  /** Toxic level */
  toxic: '#ef4444',

  // Specific levels
  /** Trough level */
  trough: '#60a5fa',
  /** Peak level */
  peak: '#f87171',
  /** Steady state */
  steadyState: '#10b981',
  /** Loading dose */
  loadingDose: '#8b5cf6',

  // Therapeutic window
  /** Lower limit of therapeutic range */
  lowerLimit: '#93c5fd',
  /** Upper limit of therapeutic range */
  upperLimit: '#fca5a5',
  /** Target range */
  targetRange: '#86efac',
};

// =============================================================================
// ADVERSE DRUG REACTION COLORS
// =============================================================================

/**
 * ADR severity and type colors
 */
export const adrColors = {
  /** Mild ADR */
  mild: '#84cc16',
  /** Moderate ADR */
  moderate: '#f59e0b',
  /** Severe ADR */
  severe: '#ef4444',
  /** Life-threatening */
  lifeThreatening: '#7f1d1d',
  /** Death */
  death: '#000000',

  // ADR types
  /** Type A - Augmented (predictable) */
  typeA: '#f59e0b',
  /** Type B - Bizarre (unpredictable) */
  typeB: '#ef4444',
  /** Allergic reaction */
  allergic: '#ec4899',
  /** Idiosyncratic */
  idiosyncratic: '#8b5cf6',
  /** Drug fever */
  drugFever: '#f97316',
  /** Hepatotoxicity */
  hepatotoxicity: '#b45309',
  /** Nephrotoxicity */
  nephrotoxicity: '#854d0e',
  /** Cardiotoxicity */
  cardiotoxicity: '#dc2626',
  /** Neurotoxicity */
  neurotoxicity: '#7c3aed',
};

// =============================================================================
// DOSE-RESPONSE COLORS
// =============================================================================

/**
 * Dose-response visualization colors
 */
export const doseResponseColors = {
  /** Dose axis */
  doseAxis: '#6b7280',
  /** Effect axis */
  effectAxis: '#6b7280',
  /** Dose-response curve */
  curve: '#3b82f6',
  /** EC50 marker */
  ec50: '#f59e0b',
  /** Emax line */
  emax: '#22c55e',
  /** ED50 (therapeutic) */
  ed50: '#22c55e',
  /** TD50 (toxic) */
  td50: '#ef4444',
  /** Therapeutic window fill */
  therapeuticWindow: '#86efac',
  /** Potency comparison */
  potencyHigh: '#22c55e',
  /** Lower potency */
  potencyLow: '#60a5fa',
};

// =============================================================================
// CLINICAL SEVERITY GRADIENT
// =============================================================================

/**
 * Severity gradient for clinical assessments
 */
export const severityGradient = {
  /** Normal/Safe */
  normal: '#22c55e',
  /** Mild concern */
  mild: '#84cc16',
  /** Moderate concern */
  moderate: '#f59e0b',
  /** Severe/High risk */
  severe: '#ef4444',
  /** Critical/Emergency */
  critical: '#7f1d1d',
};

// =============================================================================
// FLOWCHART DECISION COLORS
// =============================================================================

/**
 * Decision flowchart node colors
 */
export const flowchartColors = {
  /** Start/End nodes */
  terminal: '#22c55e',
  /** Decision nodes */
  decision: '#f59e0b',
  /** Process nodes */
  process: '#3b82f6',
  /** Action required */
  action: '#8b5cf6',
  /** Warning/Caution */
  warning: '#f97316',
  /** Success/Safe outcome */
  success: '#22c55e',
  /** Failure/Avoid */
  failure: '#ef4444',
  /** Information */
  info: '#06b6d4',
  /** Medication/Drug */
  medication: '#a855f7',
  /** Lab/Monitoring */
  labTest: '#10b981',
};

// =============================================================================
// DELIVERY ROUTE COLORS
// =============================================================================

/**
 * Drug delivery route colors
 */
export const deliveryRouteColors = {
  /** Oral (PO) */
  oral: '#22c55e',
  /** Intravenous (IV) */
  intravenous: '#3b82f6',
  /** Intramuscular (IM) */
  intramuscular: '#8b5cf6',
  /** Subcutaneous (SC) */
  subcutaneous: '#06b6d4',
  /** Transdermal */
  transdermal: '#f59e0b',
  /** Inhalation */
  inhalation: '#60a5fa',
  /** Topical */
  topical: '#84cc16',
  /** Rectal */
  rectal: '#a16207',
  /** Ophthalmic */
  ophthalmic: '#14b8a6',
  /** Intranasal */
  intranasal: '#ec4899',
  /** Sublingual */
  sublingual: '#f472b6',
};

// =============================================================================
// COMPLETE PHARMACOLOGY COLOR SCHEME
// =============================================================================

/**
 * Complete pharmacology color scheme export
 */
export const pharmacologyColorScheme = {
  // Core palettes
  primary: drugClassColors,
  secondary: admeColors,
  accent: receptorColors,

  // Specialty categories
  drugClasses: drugClassColors,
  adme: admeColors,
  receptor: receptorColors,
  interactions: interactionColors,
  cyp450: cyp450Colors,
  tdm: tdmColors,
  adr: adrColors,
  doseResponse: doseResponseColors,
  deliveryRoute: deliveryRouteColors,

  // Clinical categories
  severity: severityGradient,
  flowchart: flowchartColors,

  // Quick access to most commonly used colors
  common: {
    drug: '#a855f7',
    tablet: '#8b5cf6',
    capsule: '#7c3aed',
    injection: '#3b82f6',
    therapeutic: '#22c55e',
    toxic: '#ef4444',
    warning: '#f59e0b',
    interaction: '#f97316',
    agonist: '#22c55e',
    antagonist: '#ef4444',
    metabolism: '#fb923c',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type DrugClassColors = typeof drugClassColors;
export type AdmeColors = typeof admeColors;
export type ReceptorColors = typeof receptorColors;
export type InteractionColors = typeof interactionColors;
export type Cyp450Colors = typeof cyp450Colors;
export type TdmColors = typeof tdmColors;
export type AdrColors = typeof adrColors;
export type DoseResponseColors = typeof doseResponseColors;
export type DeliveryRouteColors = typeof deliveryRouteColors;
export type SeverityGradient = typeof severityGradient;
export type FlowchartColors = typeof flowchartColors;
export type PharmacologyColorScheme = typeof pharmacologyColorScheme;

export default pharmacologyColorScheme;
