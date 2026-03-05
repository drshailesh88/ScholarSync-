/**
 * pediatrics.ts
 * Pediatrics color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for pediatric medicine diagrams including:
 * - Growth and development (warm, friendly tones)
 * - Age-group specific colors (newborn through adolescent)
 * - Childhood conditions (respiratory, infectious, GI)
 * - NICU/critical care
 * - Vaccination and wellness
 * - Congenital conditions
 *
 * All colors are WCAG AA compliant for accessibility
 * Designed to be warm and friendly for pediatric context
 */

// =============================================================================
// PRIMARY PALETTE - Age Groups
// =============================================================================

/**
 * Age group colors - warm and friendly
 */
export const ageGroupColors = {
  /** Newborn (0-28 days) - soft pink */
  newborn: '#FFCCCC',
  /** Infant (1-12 months) - light coral */
  infant: '#FFB6B6',
  /** Toddler (1-3 years) - peach */
  toddler: '#FFDAB9',
  /** Preschool (3-5 years) - light orange */
  preschool: '#FFD699',
  /** School-age (6-12 years) - warm yellow */
  schoolAge: '#FFF2CC',
  /** Adolescent (13-18 years) - light teal */
  adolescent: '#B8E6E6',
  /** NICU patient */
  nicuPatient: '#E6D9FF',
  /** Premature infant */
  premature: '#F0E6FF',
};

// =============================================================================
// GROWTH AND DEVELOPMENT
// =============================================================================

/**
 * Growth chart and development colors
 */
export const growthColors = {
  /** Weight percentile line */
  weightLine: '#3B82F6',
  /** Height/length percentile line */
  heightLine: '#22C55E',
  /** Head circumference percentile line */
  headCircumference: '#F59E0B',
  /** BMI line */
  bmiLine: '#8B5CF6',
  /** 97th percentile zone */
  percentile97: '#FEE2E2',
  /** 50th percentile zone */
  percentile50: '#FEF3C7',
  /** 3rd percentile zone */
  percentile3: '#DBEAFE',
  /** Normal growth zone */
  normalZone: '#D1FAE5',
  /** Concern zone */
  concernZone: '#FEF3C7',
  /** Failure to thrive zone */
  fttZone: '#FEE2E2',
};

/**
 * Developmental milestone colors
 */
export const developmentColors = {
  /** Gross motor */
  grossMotor: '#3B82F6',
  /** Fine motor */
  fineMotor: '#8B5CF6',
  /** Language/communication */
  language: '#22C55E',
  /** Social/emotional */
  social: '#F59E0B',
  /** Cognitive */
  cognitive: '#EC4899',
  /** Adaptive/self-care */
  adaptive: '#06B6D4',
  /** Milestone achieved */
  achieved: '#22C55E',
  /** Milestone delayed */
  delayed: '#EF4444',
  /** Milestone emerging */
  emerging: '#F59E0B',
};

// =============================================================================
// PEDIATRIC ANATOMY
// =============================================================================

/**
 * Pediatric-specific anatomy colors
 */
export const anatomyColors = {
  /** Fontanelle (anterior) */
  anteriorFontanelle: '#93C5FD',
  /** Fontanelle (posterior) */
  posteriorFontanelle: '#86EFAC',
  /** Pediatric airway */
  airway: '#FCA5A5',
  /** Growth plate */
  growthPlate: '#FDE047',
  /** Umbilical cord */
  umbilicalCord: '#A78BFA',
  /** Fetal circulation */
  fetalCirculation: '#F472B6',
  /** Pediatric bone */
  pediatricBone: '#FEF3C7',
  /** Cartilage */
  cartilage: '#BFDBFE',
};

// =============================================================================
// PEDIATRIC CONDITIONS
// =============================================================================

/**
 * Common pediatric respiratory conditions
 */
export const respiratoryColors = {
  /** Croup (barking cough) */
  croup: '#F87171',
  /** RSV/bronchiolitis */
  rsv: '#FB923C',
  /** Pediatric asthma */
  asthma: '#60A5FA',
  /** Pneumonia */
  pneumonia: '#EF4444',
  /** Cystic fibrosis */
  cysticFibrosis: '#8B5CF6',
  /** Epiglottitis */
  epiglottitis: '#DC2626',
  /** Foreign body aspiration */
  foreignBody: '#FCD34D',
  /** Apnea */
  apnea: '#9CA3AF',
};

/**
 * Pediatric infectious disease colors
 */
export const infectiousColors = {
  /** Viral exanthem */
  viralExanthem: '#F472B6',
  /** Hand-foot-mouth disease */
  hfmd: '#FB923C',
  /** Chickenpox/varicella */
  varicella: '#FCA5A5',
  /** Measles */
  measles: '#EF4444',
  /** Roseola */
  roseola: '#F9A8D4',
  /** Fifth disease */
  fifthDisease: '#FDA4AF',
  /** Scarlet fever */
  scarletFever: '#F87171',
  /** Kawasaki disease */
  kawasaki: '#DC2626',
  /** Meningitis */
  meningitis: '#7C3AED',
};

/**
 * GI and nutrition colors
 */
export const giNutritionColors = {
  /** Jaundice/hyperbilirubinemia */
  jaundice: '#FCD34D',
  /** Dehydration */
  dehydration: '#FDE68A',
  /** Gastroenteritis */
  gastroenteritis: '#FDBA74',
  /** Intussusception */
  intussusception: '#F87171',
  /** Pyloric stenosis */
  pyloricStenosis: '#FB923C',
  /** GERD */
  gerd: '#FCA5A5',
  /** Failure to thrive */
  failureToThrive: '#FBBF24',
  /** Celiac disease */
  celiac: '#D4A373',
};

/**
 * Congenital conditions colors
 */
export const congenitalColors = {
  /** VSD */
  vsd: '#F87171',
  /** ASD */
  asd: '#60A5FA',
  /** Tetralogy of Fallot */
  tof: '#7C3AED',
  /** Transposition of great arteries */
  tga: '#8B5CF6',
  /** Coarctation */
  coarctation: '#EC4899',
  /** Patent ductus arteriosus */
  pda: '#F472B6',
  /** Cleft lip/palate */
  cleftLipPalate: '#FCA5A5',
  /** Neural tube defect */
  neuralTubeDefect: '#A78BFA',
  /** Tracheoesophageal fistula */
  tef: '#FB923C',
  /** Hirschsprung disease */
  hirschsprung: '#FDBA74',
};

// =============================================================================
// NICU AND CRITICAL CARE
// =============================================================================

/**
 * NICU-specific colors
 */
export const nicuColors = {
  /** Incubator */
  incubator: '#DDD6FE',
  /** Phototherapy lights */
  phototherapy: '#93C5FD',
  /** Ventilator */
  ventilator: '#6EE7B7',
  /** IV/TPN */
  ivTpn: '#FDE047',
  /** CPAP */
  cpap: '#A5B4FC',
  /** Feeding tube */
  feedingTube: '#FDBA74',
  /** Umbilical line */
  umbilicalLine: '#F9A8D4',
  /** Surfactant */
  surfactant: '#67E8F9',
  /** Apnea monitor */
  apneaMonitor: '#D1D5DB',
};

/**
 * Neonatal conditions
 */
export const neonatalConditionColors = {
  /** Respiratory distress syndrome */
  rds: '#60A5FA',
  /** Necrotizing enterocolitis */
  nec: '#EF4444',
  /** Intraventricular hemorrhage */
  ivh: '#DC2626',
  /** Retinopathy of prematurity */
  rop: '#8B5CF6',
  /** Bronchopulmonary dysplasia */
  bpd: '#F59E0B',
  /** Hyperbilirubinemia */
  hyperbilirubinemia: '#FCD34D',
  /** Sepsis */
  sepsis: '#B91C1C',
  /** Hypoglycemia */
  hypoglycemia: '#FBBF24',
};

// =============================================================================
// VACCINATION AND WELLNESS
// =============================================================================

/**
 * Vaccination colors
 */
export const vaccinationColors = {
  /** Vaccine administered */
  administered: '#22C55E',
  /** Vaccine due */
  due: '#F59E0B',
  /** Vaccine overdue */
  overdue: '#EF4444',
  /** Catch-up needed */
  catchUp: '#3B82F6',
  /** Contraindicated */
  contraindicated: '#9CA3AF',
  /** DTaP series */
  dtap: '#60A5FA',
  /** MMR */
  mmr: '#F472B6',
  /** IPV */
  ipv: '#22C55E',
  /** Hib */
  hib: '#8B5CF6',
  /** PCV */
  pcv: '#FB923C',
  /** Rotavirus */
  rotavirus: '#14B8A6',
  /** Hepatitis B */
  hepB: '#FCD34D',
  /** Varicella */
  varVaccine: '#FCA5A5',
  /** Influenza */
  influenza: '#06B6D4',
};

/**
 * Well-child visit colors
 */
export const wellChildColors = {
  /** Screening completed */
  screeningComplete: '#22C55E',
  /** Screening due */
  screeningDue: '#F59E0B',
  /** Abnormal finding */
  abnormalFinding: '#EF4444',
  /** Normal finding */
  normalFinding: '#22C55E',
  /** Follow-up needed */
  followUpNeeded: '#3B82F6',
  /** Anticipatory guidance */
  anticipatoryGuidance: '#8B5CF6',
};

// =============================================================================
// PEDIATRIC EMERGENCY
// =============================================================================

/**
 * Pediatric emergency colors
 */
export const emergencyColors = {
  /** Choking/airway obstruction */
  choking: '#DC2626',
  /** Febrile seizure */
  febrileSeizure: '#F59E0B',
  /** Anaphylaxis */
  anaphylaxis: '#EF4444',
  /** Status epilepticus */
  statusEpilepticus: '#7C3AED',
  /** Severe dehydration */
  severeDehydration: '#FBBF24',
  /** Shock */
  shock: '#B91C1C',
  /** Trauma */
  trauma: '#DC2626',
  /** Poisoning/ingestion */
  poisoning: '#8B5CF6',
  /** NAT/abuse concern */
  abuseConcern: '#9F1239',
};

// =============================================================================
// SEVERITY GRADIENTS
// =============================================================================

/**
 * Clinical severity gradient
 */
export const severityGradient = {
  /** Well/healthy */
  well: '#22C55E',
  /** Mild illness */
  mild: '#84CC16',
  /** Moderate illness */
  moderate: '#F59E0B',
  /** Severe illness */
  severe: '#EF4444',
  /** Critical */
  critical: '#B91C1C',
};

/**
 * Dehydration severity
 */
export const dehydrationGradient = {
  /** None */
  none: '#22C55E',
  /** Mild (<5%) */
  mild: '#84CC16',
  /** Moderate (5-10%) */
  moderate: '#F59E0B',
  /** Severe (>10%) */
  severe: '#EF4444',
};

/**
 * APGAR score colors
 */
export const apgarColors = {
  /** Score 7-10: Normal */
  normal: '#22C55E',
  /** Score 4-6: Moderately depressed */
  moderatelyDepressed: '#F59E0B',
  /** Score 0-3: Severely depressed */
  severelyDepressed: '#EF4444',
};

// =============================================================================
// FLOWCHART DECISION COLORS
// =============================================================================

/**
 * Decision flowchart node colors - warm pediatric theme
 */
export const flowchartColors = {
  /** Start/End nodes */
  terminal: '#22C55E',
  /** Decision nodes */
  decision: '#F59E0B',
  /** Process nodes */
  process: '#60A5FA',
  /** Action required */
  action: '#F472B6',
  /** Warning/Caution */
  warning: '#FB923C',
  /** Success/Positive outcome */
  success: '#22C55E',
  /** Failure/Negative outcome */
  failure: '#EF4444',
  /** Information */
  info: '#06B6D4',
  /** Refer to specialist */
  referral: '#8B5CF6',
  /** Admit */
  admit: '#DC2626',
  /** Discharge */
  discharge: '#22C55E',
};

// =============================================================================
// COMPLETE PEDIATRICS COLOR SCHEME
// =============================================================================

/**
 * Complete pediatrics color scheme export
 */
export const pediatricsColorScheme = {
  // Core palettes
  ageGroups: ageGroupColors,
  growth: growthColors,
  development: developmentColors,
  anatomy: anatomyColors,

  // Conditions
  respiratory: respiratoryColors,
  infectious: infectiousColors,
  giNutrition: giNutritionColors,
  congenital: congenitalColors,

  // NICU
  nicu: nicuColors,
  neonatal: neonatalConditionColors,

  // Wellness
  vaccination: vaccinationColors,
  wellChild: wellChildColors,

  // Emergency
  emergency: emergencyColors,

  // Clinical
  severity: severityGradient,
  dehydration: dehydrationGradient,
  apgar: apgarColors,
  flowchart: flowchartColors,

  // Quick access to most commonly used colors
  common: {
    healthy: '#22C55E',
    concerning: '#F59E0B',
    urgent: '#EF4444',
    critical: '#B91C1C',
    infant: '#FFB6B6',
    child: '#FFF2CC',
    vaccination: '#22C55E',
    growth: '#3B82F6',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type AgeGroupColors = typeof ageGroupColors;
export type GrowthColors = typeof growthColors;
export type DevelopmentColors = typeof developmentColors;
export type AnatomyColors = typeof anatomyColors;
export type RespiratoryColors = typeof respiratoryColors;
export type InfectiousColors = typeof infectiousColors;
export type GINutritionColors = typeof giNutritionColors;
export type CongenitalColors = typeof congenitalColors;
export type NICUColors = typeof nicuColors;
export type NeonatalConditionColors = typeof neonatalConditionColors;
export type VaccinationColors = typeof vaccinationColors;
export type WellChildColors = typeof wellChildColors;
export type EmergencyColors = typeof emergencyColors;
export type SeverityGradient = typeof severityGradient;
export type DehydrationGradient = typeof dehydrationGradient;
export type APGARColors = typeof apgarColors;
export type FlowchartColors = typeof flowchartColors;
export type PediatricsColorScheme = typeof pediatricsColorScheme;

export default pediatricsColorScheme;
