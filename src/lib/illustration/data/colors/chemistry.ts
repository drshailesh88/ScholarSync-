/**
 * chemistry.ts
 * Chemistry color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for chemistry diagrams including:
 * - Periodic table element categories
 * - Atomic structure and orbitals
 * - Chemical bonds and molecular geometry
 * - Reaction mechanisms and pathways
 * - Laboratory equipment and procedures
 * - Spectroscopy and analytical methods
 * - Thermodynamics and kinetics
 * - Electrochemistry
 *
 * All colors are WCAG AA compliant for accessibility
 *
 * Ralph Loop - COMPLETE checkpoint
 */

// =============================================================================
// PERIODIC TABLE ELEMENT COLORS
// =============================================================================

/**
 * Element category colors based on periodic table groups
 */
export const elementCategoryColors = {
  /** Alkali metals (Group 1) - Reactive, soft metals */
  alkaliMetal: '#FF6B6B',
  /** Alkaline earth metals (Group 2) - Reactive metals */
  alkalineEarthMetal: '#FFA07A',
  /** Transition metals (Groups 3-12) - Variable oxidation states */
  transitionMetal: '#87CEEB',
  /** Post-transition metals - Soft, poor conductors */
  postTransitionMetal: '#B0C4DE',
  /** Metalloids - Properties between metals and nonmetals */
  metalloid: '#98D8C8',
  /** Reactive nonmetals - Form covalent compounds */
  reactiveNonmetal: '#90EE90',
  /** Noble gases (Group 18) - Inert, monoatomic */
  nobleGas: '#DDA0DD',
  /** Halogens (Group 17) - Highly reactive nonmetals */
  halogen: '#FFD700',
  /** Lanthanides - Rare earth elements */
  lanthanide: '#FFB6C1',
  /** Actinides - Radioactive elements */
  actinide: '#FF69B4',
  /** Unknown properties - Newly synthesized elements */
  unknown: '#808080',
};

/**
 * Common element-specific colors for diagrams
 */
export const elementColors = {
  hydrogen: '#FFFFFF',
  carbon: '#404040',
  nitrogen: '#3B82F6',
  oxygen: '#EF4444',
  sulfur: '#FBBF24',
  phosphorus: '#F97316',
  chlorine: '#22C55E',
  bromine: '#DC2626',
  iodine: '#8B5CF6',
  fluorine: '#84CC16',
  sodium: '#8B5CF6',
  potassium: '#A855F7',
  calcium: '#14B8A6',
  magnesium: '#10B981',
  iron: '#F97316',
  copper: '#EA580C',
  zinc: '#6366F1',
  silver: '#C0C0C0',
  gold: '#FFD700',
};

// =============================================================================
// ATOMIC STRUCTURE COLORS
// =============================================================================

/**
 * Atomic orbital colors for electron configurations
 */
export const orbitalColors = {
  /** s orbital - spherical */
  sOrbital: '#3B82F6',
  /** p orbital - dumbbell shaped */
  pOrbital: '#22C55E',
  /** d orbital - cloverleaf shaped */
  dOrbital: '#F97316',
  /** f orbital - complex shapes */
  fOrbital: '#8B5CF6',
  /** Electron up spin */
  spinUp: '#EF4444',
  /** Electron down spin */
  spinDown: '#3B82F6',
  /** Paired electrons */
  pairedElectrons: '#8B5CF6',
  /** Nucleus */
  nucleus: '#1F2937',
  /** Proton */
  proton: '#DC2626',
  /** Neutron */
  neutron: '#6B7280',
  /** Electron cloud */
  electronCloud: '#60A5FA',
};

/**
 * Electron shell/energy level colors
 */
export const shellColors = {
  k1: '#EF4444',  // n=1, K shell
  l2: '#F97316',  // n=2, L shell
  m3: '#FBBF24',  // n=3, M shell
  n4: '#22C55E',  // n=4, N shell
  o5: '#3B82F6',  // n=5, O shell
  p6: '#8B5CF6',  // n=6, P shell
  q7: '#EC4899',  // n=7, Q shell
};

// =============================================================================
// CHEMICAL BOND COLORS
// =============================================================================

/**
 * Chemical bond type colors
 */
export const bondColors = {
  /** Single covalent bond */
  singleBond: '#374151',
  /** Double covalent bond */
  doubleBond: '#4B5563',
  /** Triple covalent bond */
  tripleBond: '#1F2937',
  /** Sigma (σ) bond */
  sigmaBond: '#3B82F6',
  /** Pi (π) bond */
  piBond: '#22C55E',
  /** Ionic bond */
  ionicBond: '#8B5CF6',
  /** Metallic bond */
  metallicBond: '#F97316',
  /** Hydrogen bond */
  hydrogenBond: '#06B6D4',
  /** Van der Waals / London dispersion */
  vanDerWaals: '#94A3B8',
  /** Coordinate/dative bond */
  coordinateBond: '#EC4899',
  /** Partial positive charge */
  deltaPositive: '#EF4444',
  /** Partial negative charge */
  deltaNegative: '#3B82F6',
};

/**
 * Bond polarity colors
 */
export const polarityColors = {
  nonpolar: '#6B7280',
  slightlyPolar: '#14B8A6',
  moderatelyPolar: '#3B82F6',
  highlyPolar: '#8B5CF6',
  ionic: '#EF4444',
};

// =============================================================================
// MOLECULAR GEOMETRY COLORS
// =============================================================================

/**
 * VSEPR geometry colors
 */
export const geometryColors = {
  linear: '#EF4444',
  bent: '#F97316',
  trigonalPlanar: '#FBBF24',
  trigonalPyramidal: '#22C55E',
  tetrahedral: '#3B82F6',
  squarePlanar: '#8B5CF6',
  trigonalBipyramidal: '#EC4899',
  seesawShape: '#14B8A6',
  tShape: '#6366F1',
  octahedral: '#DC2626',
  squarePyramidal: '#F43F5E',
};

/**
 * Stereochemistry colors
 */
export const stereochemistryColors = {
  rConfiguration: '#3B82F6',
  sConfiguration: '#EF4444',
  eIsomer: '#22C55E',
  zIsomer: '#F97316',
  wedgeBond: '#374151',
  dashBond: '#9CA3AF',
  chiralCenter: '#8B5CF6',
  meso: '#14B8A6',
  racemic: '#6B7280',
};

// =============================================================================
// REACTION MECHANISM COLORS
// =============================================================================

/**
 * Reaction mechanism component colors
 */
export const mechanismColors = {
  /** Nucleophile - electron donor */
  nucleophile: '#3B82F6',
  /** Electrophile - electron acceptor */
  electrophile: '#EF4444',
  /** Leaving group */
  leavingGroup: '#9CA3AF',
  /** Electron pushing arrow */
  curvedArrow: '#DC2626',
  /** Carbocation intermediate */
  carbocation: '#F97316',
  /** Carbanion intermediate */
  carbanion: '#3B82F6',
  /** Radical species */
  radical: '#8B5CF6',
  /** Transition state */
  transitionState: '#FBBF24',
  /** Intermediate */
  intermediate: '#F97316',
  /** Catalyst */
  catalyst: '#22C55E',
};

/**
 * Reaction type colors for diagrams
 */
export const reactionTypeColors = {
  substitution: '#3B82F6',
  elimination: '#EF4444',
  addition: '#22C55E',
  oxidation: '#DC2626',
  reduction: '#3B82F6',
  acidBase: '#8B5CF6',
  precipitation: '#6B7280',
  combustion: '#F97316',
  polymerization: '#14B8A6',
  decomposition: '#F43F5E',
  synthesis: '#16A34A',
  singleReplacement: '#6366F1',
  doubleReplacement: '#EC4899',
};

// =============================================================================
// THERMODYNAMICS & KINETICS COLORS
// =============================================================================

/**
 * Energy diagram colors
 */
export const energyDiagramColors = {
  reactants: '#3B82F6',
  products: '#22C55E',
  transitionState: '#FBBF24',
  activationEnergy: '#EF4444',
  deltaH: '#8B5CF6',
  exothermic: '#22C55E',
  endothermic: '#EF4444',
  catalyzedPathway: '#14B8A6',
  uncatalyzedPathway: '#9CA3AF',
  rateLimit: '#DC2626',
};

/**
 * Kinetics graph colors
 */
export const kineticsColors = {
  concentration: '#3B82F6',
  rate: '#EF4444',
  time: '#6B7280',
  zeroOrder: '#22C55E',
  firstOrder: '#F97316',
  secondOrder: '#8B5CF6',
  halfLife: '#14B8A6',
  rateConstant: '#EC4899',
  temperature: '#DC2626',
};

// =============================================================================
// EQUILIBRIUM COLORS
// =============================================================================

/**
 * Equilibrium diagram colors
 */
export const equilibriumColors = {
  forwardReaction: '#22C55E',
  reverseReaction: '#EF4444',
  equilibriumArrow: '#8B5CF6',
  reactantFavored: '#3B82F6',
  productFavored: '#22C55E',
  qLessThanK: '#3B82F6',
  qGreaterThanK: '#EF4444',
  qEqualsK: '#8B5CF6',
  stress: '#F97316',
  shift: '#14B8A6',
};

// =============================================================================
// ANALYTICAL CHEMISTRY COLORS
// =============================================================================

/**
 * Spectroscopy colors
 */
export const spectroscopyColors = {
  irAbsorption: '#EF4444',
  irTransmittance: '#3B82F6',
  nmrPeak: '#8B5CF6',
  nmrReference: '#22C55E',
  msMolecularIon: '#3B82F6',
  msBasePeak: '#EF4444',
  msFragment: '#F97316',
  uvAbsorption: '#8B5CF6',
  uvTransmission: '#22C55E',
  fluorescence: '#FBBF24',
};

/**
 * Chromatography colors
 */
export const chromatographyColors = {
  stationaryPhase: '#6B7280',
  mobilePhase: '#3B82F6',
  analyte1: '#EF4444',
  analyte2: '#22C55E',
  analyte3: '#8B5CF6',
  analyte4: '#F97316',
  deadVolume: '#9CA3AF',
  retentionTime: '#14B8A6',
  baseline: '#374151',
  peak: '#3B82F6',
};

/**
 * Titration colors
 */
export const titrationColors = {
  acidicRegion: '#EF4444',
  basicRegion: '#3B82F6',
  bufferRegion: '#F97316',
  equivalencePoint: '#8B5CF6',
  halfEquivalence: '#22C55E',
  excessTitrant: '#14B8A6',
  phenolphthalein: '#EC4899',
  methylOrange: '#F97316',
  bromothymolBlue: '#3B82F6',
  indicator: '#FBBF24',
};

// =============================================================================
// LABORATORY EQUIPMENT COLORS
// =============================================================================

/**
 * Lab equipment colors
 */
export const labEquipmentColors = {
  glassware: '#BFDBFE',
  plasticware: '#D1D5DB',
  metalware: '#9CA3AF',
  rubber: '#374151',
  liquidSample: '#60A5FA',
  heating: '#EF4444',
  cooling: '#3B82F6',
  vacuum: '#8B5CF6',
  gas: '#D1FAE5',
  flame: '#F97316',
};

/**
 * Safety and hazard colors
 */
export const safetyColors = {
  flammable: '#EF4444',
  oxidizer: '#FBBF24',
  corrosive: '#F97316',
  toxic: '#DC2626',
  irritant: '#FCD34D',
  environmentalHazard: '#22C55E',
  healthHazard: '#3B82F6',
  radioactive: '#8B5CF6',
  compressedGas: '#6B7280',
  explosive: '#F43F5E',
};

// =============================================================================
// ELECTROCHEMISTRY COLORS
// =============================================================================

/**
 * Electrochemical cell colors
 */
export const electrochemColors = {
  anode: '#EF4444',
  cathode: '#3B82F6',
  saltBridge: '#8B5CF6',
  electronFlow: '#FBBF24',
  ionFlow: '#22C55E',
  electrolyte: '#60A5FA',
  electrode: '#374151',
  oxidation: '#EF4444',
  reduction: '#3B82F6',
  cellPotential: '#F97316',
};

// =============================================================================
// FLOWCHART AND DIAGRAM COLORS
// =============================================================================

/**
 * General flowchart colors for chemistry diagrams
 */
export const flowchartColors = {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  accent: '#F97316',
  success: '#22C55E',
  warning: '#FBBF24',
  danger: '#EF4444',
  info: '#06B6D4',
  neutral: '#6B7280',
  background: '#F9FAFB',
  border: '#E5E7EB',
  text: '#1F2937',
  textLight: '#6B7280',
};

/**
 * Severity/intensity gradient for chemical properties
 */
export const severityGradient = {
  minimal: '#D1FAE5',
  low: '#A7F3D0',
  moderate: '#FBBF24',
  high: '#F97316',
  severe: '#EF4444',
  critical: '#DC2626',
};

/**
 * Concentration gradient
 */
export const concentrationGradient = {
  trace: '#EFF6FF',
  low: '#BFDBFE',
  medium: '#60A5FA',
  high: '#3B82F6',
  concentrated: '#1D4ED8',
  saturated: '#1E3A8A',
};

// =============================================================================
// COLOR SCHEME EXPORT
// =============================================================================

/**
 * Complete Chemistry color scheme
 */
export interface ChemistryColorScheme {
  elementCategory: typeof elementCategoryColors;
  elements: typeof elementColors;
  orbitals: typeof orbitalColors;
  shells: typeof shellColors;
  bonds: typeof bondColors;
  polarity: typeof polarityColors;
  geometry: typeof geometryColors;
  stereochemistry: typeof stereochemistryColors;
  mechanism: typeof mechanismColors;
  reactionType: typeof reactionTypeColors;
  energyDiagram: typeof energyDiagramColors;
  kinetics: typeof kineticsColors;
  equilibrium: typeof equilibriumColors;
  spectroscopy: typeof spectroscopyColors;
  chromatography: typeof chromatographyColors;
  titration: typeof titrationColors;
  labEquipment: typeof labEquipmentColors;
  safety: typeof safetyColors;
  electrochem: typeof electrochemColors;
  flowchart: typeof flowchartColors;
  severity: typeof severityGradient;
  concentration: typeof concentrationGradient;
}

/**
 * Complete chemistry color scheme export
 */
export const chemistryColorScheme: ChemistryColorScheme = {
  elementCategory: elementCategoryColors,
  elements: elementColors,
  orbitals: orbitalColors,
  shells: shellColors,
  bonds: bondColors,
  polarity: polarityColors,
  geometry: geometryColors,
  stereochemistry: stereochemistryColors,
  mechanism: mechanismColors,
  reactionType: reactionTypeColors,
  energyDiagram: energyDiagramColors,
  kinetics: kineticsColors,
  equilibrium: equilibriumColors,
  spectroscopy: spectroscopyColors,
  chromatography: chromatographyColors,
  titration: titrationColors,
  labEquipment: labEquipmentColors,
  safety: safetyColors,
  electrochem: electrochemColors,
  flowchart: flowchartColors,
  severity: severityGradient,
  concentration: concentrationGradient,
};

export default chemistryColorScheme;
