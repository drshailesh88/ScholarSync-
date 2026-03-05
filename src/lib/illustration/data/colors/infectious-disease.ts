/**
 * infectious-disease.ts
 * Infectious Disease color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for infectious disease diagrams including:
 * - Bacteria (greens for gram negative, purples for gram positive)
 * - Viruses (blues and teals)
 * - Fungi (browns and oranges)
 * - Parasites (grays and muted colors)
 * - Antibiotics (by mechanism of action)
 * - Infection control and hazard warnings
 * - Clinical severity and urgency gradients
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// PRIMARY PALETTE - Bacteria (Greens/Purples based on Gram stain)
// =============================================================================

/**
 * Bacterial pathogen colors based on Gram staining characteristics
 */
export const bacteriaColors = {
  /** Gram positive - purple/violet (crystal violet retention) */
  gramPositive: '#8B5CF6',
  /** Gram positive dark */
  gramPositiveDark: '#6D28D9',
  /** Gram positive light */
  gramPositiveLight: '#A78BFA',
  /** Gram negative - pink/red (safranin counterstain) */
  gramNegative: '#EC4899',
  /** Gram negative dark */
  gramNegativeDark: '#BE185D',
  /** Gram negative light */
  gramNegativeLight: '#F472B6',
  /** Mycobacteria - acid fast red */
  acidFast: '#DC2626',
  /** Mycobacteria light */
  acidFastLight: '#F87171',
  /** Spirochete - neutral */
  spirochete: '#6B7280',
  /** Anaerobe - gray/dark */
  anaerobe: '#374151',
  /** Biofilm - slimy green */
  biofilm: '#84CC16',
  /** Spore - dark resistant */
  spore: '#1F2937',
};

// =============================================================================
// SECONDARY PALETTE - Viruses (Blues/Teals)
// =============================================================================

/**
 * Viral pathogen colors
 */
export const virusColors = {
  /** DNA virus - deep blue */
  dnaVirus: '#2563EB',
  /** DNA virus light */
  dnaVirusLight: '#60A5FA',
  /** RNA virus - teal/cyan */
  rnaVirus: '#0891B2',
  /** RNA virus light */
  rnaVirusLight: '#22D3EE',
  /** Retrovirus - distinct purple-blue */
  retrovirus: '#7C3AED',
  /** Envelope - lipid bilayer */
  viralEnvelope: '#FCD34D',
  /** Capsid - protein coat */
  viralCapsid: '#3B82F6',
  /** Spike protein */
  spikeProtein: '#EF4444',
  /** Viral genome */
  viralGenome: '#10B981',
  /** Emerging pathogen - warning */
  emergingVirus: '#F97316',
};

// =============================================================================
// TERTIARY PALETTE - Fungi (Browns/Oranges)
// =============================================================================

/**
 * Fungal pathogen colors
 */
export const fungiColors = {
  /** Yeast - cream/tan */
  yeast: '#F5DEB3',
  /** Yeast budding */
  yeastBudding: '#D4A574',
  /** Mold/Hyphae - gray-green */
  mold: '#6B8E23',
  /** Mold light */
  moldLight: '#9ACD32',
  /** Dimorphic fungi */
  dimorphic: '#CD853F',
  /** Fungal spore */
  fungalSpore: '#8B4513',
  /** Candida - common yeast */
  candida: '#FFDAB9',
  /** Aspergillus - septate hyphae */
  aspergillus: '#556B2F',
  /** Mucor - ribbon-like hyphae */
  mucor: '#2F4F4F',
  /** Dermatophyte - skin fungi */
  dermatophyte: '#DEB887',
};

// =============================================================================
// QUATERNARY PALETTE - Parasites (Grays/Muted)
// =============================================================================

/**
 * Parasitic pathogen colors
 */
export const parasiteColors = {
  /** Protozoa - neutral blue-gray */
  protozoa: '#64748B',
  /** Protozoa nucleus */
  protozoaNucleus: '#1E3A5F',
  /** Helminth - worm brown */
  helminth: '#8B7355',
  /** Helminth egg */
  helminthEgg: '#F5F5DC',
  /** Ectoparasite - insect brown */
  ectoparasite: '#5D4E37',
  /** Malaria - red blood cell context */
  malaria: '#B22222',
  /** Malaria ring form */
  malariaRing: '#E6E6FA',
  /** Giardia - teardrop */
  giardia: '#87CEEB',
  /** Cryptosporidium - small round */
  cryptosporidium: '#ADD8E6',
  /** Toxoplasma - crescent */
  toxoplasma: '#9370DB',
};

// =============================================================================
// ANTIBIOTIC COLORS - By Mechanism
// =============================================================================

/**
 * Antibiotic class colors by mechanism of action
 */
export const antibioticColors = {
  /** Cell wall synthesis inhibitors (Beta-lactams) */
  cellWallInhibitor: '#10B981',
  /** Protein synthesis 30S inhibitors (Aminoglycosides) */
  protein30SInhibitor: '#3B82F6',
  /** Protein synthesis 50S inhibitors (Macrolides) */
  protein50SInhibitor: '#8B5CF6',
  /** DNA synthesis inhibitors (Fluoroquinolones) */
  dnaSynthesisInhibitor: '#F59E0B',
  /** RNA synthesis inhibitors (Rifamycins) */
  rnaSynthesisInhibitor: '#EF4444',
  /** Folate pathway inhibitors (TMP-SMX) */
  folateInhibitor: '#EC4899',
  /** Cell membrane disruptors (Polymyxins) */
  membraneDisruptor: '#06B6D4',
  /** Narrow spectrum */
  narrowSpectrum: '#22C55E',
  /** Broad spectrum */
  broadSpectrum: '#F97316',
  /** Reserved/Last line */
  reservedAntibiotic: '#DC2626',
};

// =============================================================================
// ANTIVIRAL COLORS
// =============================================================================

/**
 * Antiviral class colors
 */
export const antiviralColors = {
  /** Nucleoside/nucleotide analogs */
  nucleosideAnalog: '#6366F1',
  /** Protease inhibitors */
  proteaseInhibitor: '#8B5CF6',
  /** Integrase inhibitors */
  integraseInhibitor: '#14B8A6',
  /** Entry inhibitors */
  entryInhibitor: '#F97316',
  /** Neuraminidase inhibitors */
  neuraminidaseInhibitor: '#EC4899',
  /** Polymerase inhibitors */
  polymeraseInhibitor: '#3B82F6',
  /** Combination therapy */
  combinationTherapy: '#10B981',
};

// =============================================================================
// INFECTION CONTROL COLORS
// =============================================================================

/**
 * Infection control and isolation colors
 */
export const infectionControlColors = {
  /** Standard precautions */
  standardPrecautions: '#3B82F6',
  /** Contact precautions */
  contactPrecautions: '#F59E0B',
  /** Droplet precautions */
  dropletPrecautions: '#8B5CF6',
  /** Airborne precautions */
  airbornePrecautions: '#EF4444',
  /** Protective isolation */
  protectiveIsolation: '#22C55E',
  /** PPE indicator */
  ppeRequired: '#F97316',
  /** Hand hygiene */
  handHygiene: '#06B6D4',
  /** Sterilization */
  sterilization: '#10B981',
  /** Contaminated */
  contaminated: '#DC2626',
  /** Clean/Sterile */
  cleanSterile: '#22C55E',
};

// =============================================================================
// CLINICAL SEVERITY GRADIENT
// =============================================================================

/**
 * Severity gradient for infectious conditions
 */
export const severityGradient = {
  /** Colonization only */
  colonization: '#94A3B8',
  /** Mild infection */
  mild: '#22C55E',
  /** Moderate infection */
  moderate: '#F59E0B',
  /** Severe infection */
  severe: '#EF4444',
  /** Sepsis */
  sepsis: '#DC2626',
  /** Septic shock */
  septicShock: '#7F1D1D',
  /** Multi-organ failure */
  multiOrganFailure: '#450A0A',
};

// =============================================================================
// RESISTANCE PATTERNS
// =============================================================================

/**
 * Antimicrobial resistance visualization colors
 */
export const resistanceColors = {
  /** Susceptible */
  susceptible: '#22C55E',
  /** Intermediate */
  intermediate: '#F59E0B',
  /** Resistant */
  resistant: '#EF4444',
  /** MDR - Multi-drug resistant */
  mdr: '#DC2626',
  /** XDR - Extensively drug resistant */
  xdr: '#B91C1C',
  /** PDR - Pan-drug resistant */
  pdr: '#7F1D1D',
  /** ESBL producer */
  esbl: '#F97316',
  /** Carbapenemase producer */
  carbapenemase: '#BE185D',
  /** MRSA */
  mrsa: '#9333EA',
  /** VRE */
  vre: '#7C3AED',
};

// =============================================================================
// VACCINE COLORS
// =============================================================================

/**
 * Vaccine and immunization colors
 */
export const vaccineColors = {
  /** Live attenuated */
  liveAttenuated: '#10B981',
  /** Inactivated */
  inactivated: '#6B7280',
  /** Subunit/protein */
  subunit: '#3B82F6',
  /** mRNA */
  mrna: '#8B5CF6',
  /** Viral vector */
  viralVector: '#F59E0B',
  /** Toxoid */
  toxoid: '#EC4899',
  /** Conjugate */
  conjugate: '#14B8A6',
  /** Immunized/Protected */
  protected: '#22C55E',
  /** Not immunized */
  notImmunized: '#EF4444',
};

// =============================================================================
// FLOWCHART DECISION COLORS
// =============================================================================

/**
 * Decision flowchart node colors for infectious disease algorithms
 */
export const flowchartColors = {
  /** Start/End nodes */
  terminal: '#6B7280',
  /** Decision nodes */
  decision: '#F59E0B',
  /** Process nodes */
  process: '#3B82F6',
  /** Action required */
  action: '#EF4444',
  /** Treatment success */
  success: '#22C55E',
  /** Treatment failure */
  failure: '#DC2626',
  /** Warning/Caution */
  warning: '#F97316',
  /** Information */
  info: '#06B6D4',
  /** Empiric therapy */
  empiric: '#8B5CF6',
  /** Targeted therapy */
  targeted: '#10B981',
};

// =============================================================================
// DIAGNOSTIC COLORS
// =============================================================================

/**
 * Diagnostic test and result colors
 */
export const diagnosticColors = {
  /** Positive result */
  positive: '#EF4444',
  /** Negative result */
  negative: '#22C55E',
  /** Indeterminate */
  indeterminate: '#F59E0B',
  /** Pending */
  pending: '#6B7280',
  /** Culture growth */
  culturePositive: '#DC2626',
  /** No growth */
  cultureNegative: '#22C55E',
  /** PCR detected */
  pcrPositive: '#3B82F6',
  /** Serology reactive */
  serologyReactive: '#8B5CF6',
};

// =============================================================================
// COMPLETE INFECTIOUS DISEASE COLOR SCHEME
// =============================================================================

/**
 * Complete infectious disease color scheme export
 */
export const infectiousDiseaseColorScheme = {
  // Core pathogen palettes
  bacteria: bacteriaColors,
  virus: virusColors,
  fungi: fungiColors,
  parasite: parasiteColors,

  // Treatment palettes
  antibiotic: antibioticColors,
  antiviral: antiviralColors,
  vaccine: vaccineColors,

  // Clinical palettes
  severity: severityGradient,
  resistance: resistanceColors,
  infectionControl: infectionControlColors,
  diagnostic: diagnosticColors,
  flowchart: flowchartColors,

  // Quick access to most commonly used colors
  common: {
    gramPositive: '#8B5CF6',
    gramNegative: '#EC4899',
    virus: '#0891B2',
    fungus: '#CD853F',
    parasite: '#64748B',
    susceptible: '#22C55E',
    resistant: '#EF4444',
    sepsis: '#DC2626',
    isolation: '#F59E0B',
    sterile: '#22C55E',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type BacteriaColors = typeof bacteriaColors;
export type VirusColors = typeof virusColors;
export type FungiColors = typeof fungiColors;
export type ParasiteColors = typeof parasiteColors;
export type AntibioticColors = typeof antibioticColors;
export type AntiviralColors = typeof antiviralColors;
export type InfectionControlColors = typeof infectionControlColors;
export type SeverityGradient = typeof severityGradient;
export type ResistanceColors = typeof resistanceColors;
export type VaccineColors = typeof vaccineColors;
export type FlowchartColors = typeof flowchartColors;
export type DiagnosticColors = typeof diagnosticColors;
export type InfectiousDiseaseColorScheme = typeof infectiousDiseaseColorScheme;

export default infectiousDiseaseColorScheme;
