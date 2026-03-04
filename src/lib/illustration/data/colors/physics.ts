/**
 * physics.ts
 * Physics color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for physics diagrams including:
 * - Mechanics (forces, motion, energy)
 * - Electromagnetism (fields, charges, waves)
 * - Thermodynamics (heat, entropy)
 * - Quantum mechanics and modern physics
 * - Waves and optics
 * - Particle physics
 * - Astrophysics
 * - Laboratory and experimental physics
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// PRIMARY PALETTE - Mechanics
// =============================================================================

/**
 * Classical mechanics colors for forces, motion, and energy
 */
export const mechanicsColors = {
  /** Force vectors */
  force: '#DC2626',
  /** Velocity vectors */
  velocity: '#2563EB',
  /** Acceleration vectors */
  acceleration: '#16A34A',
  /** Momentum vectors */
  momentum: '#7C3AED',
  /** Kinetic energy */
  kineticEnergy: '#EA580C',
  /** Potential energy */
  potentialEnergy: '#0891B2',
  /** Mechanical energy (total) */
  mechanicalEnergy: '#9333EA',
  /** Friction force */
  friction: '#B45309',
  /** Normal force */
  normalForce: '#4B5563',
  /** Tension */
  tension: '#059669',
  /** Weight/gravity */
  weight: '#7C2D12',
  /** Spring force */
  springForce: '#0D9488',
};

// =============================================================================
// SECONDARY PALETTE - Electromagnetism
// =============================================================================

/**
 * Electromagnetism colors for fields, charges, and circuits
 */
export const electromagnetismColors = {
  /** Positive charge */
  positiveCharge: '#DC2626',
  /** Negative charge */
  negativeCharge: '#2563EB',
  /** Electric field */
  electricField: '#F97316',
  /** Magnetic field */
  magneticField: '#8B5CF6',
  /** Electromagnetic wave */
  emWave: '#06B6D4',
  /** Current flow */
  current: '#FBBF24',
  /** Voltage/potential */
  voltage: '#10B981',
  /** Resistance */
  resistance: '#6B7280',
  /** Capacitance */
  capacitance: '#3B82F6',
  /** Inductance */
  inductance: '#A855F7',
  /** Electric potential lines */
  equipotential: '#14B8A6',
  /** Lorentz force */
  lorentzForce: '#F43F5E',
};

// =============================================================================
// ACCENT PALETTE - Thermodynamics
// =============================================================================

/**
 * Thermodynamics colors for heat, temperature, and entropy
 */
export const thermodynamicsColors = {
  /** Hot temperature */
  hotTemperature: '#DC2626',
  /** Cold temperature */
  coldTemperature: '#2563EB',
  /** Heat flow */
  heatFlow: '#F97316',
  /** Work done */
  work: '#16A34A',
  /** Entropy increase */
  entropyIncrease: '#9333EA',
  /** Isothermal process */
  isothermal: '#0EA5E9',
  /** Adiabatic process */
  adiabatic: '#84CC16',
  /** Isobaric process */
  isobaric: '#F59E0B',
  /** Isochoric process */
  isochoric: '#EC4899',
  /** Phase transition */
  phaseTransition: '#06B6D4',
  /** Thermal equilibrium */
  thermalEquilibrium: '#6366F1',
  /** Carnot efficiency */
  carnotEfficiency: '#22C55E',
};

// =============================================================================
// WAVES & OPTICS PALETTE
// =============================================================================

/**
 * Waves and optics colors
 */
export const wavesOpticsColors = {
  /** Wave crest */
  waveCrest: '#2563EB',
  /** Wave trough */
  waveTrough: '#DC2626',
  /** Amplitude */
  amplitude: '#7C3AED',
  /** Wavelength marker */
  wavelength: '#059669',
  /** Frequency indicator */
  frequency: '#F97316',
  /** Constructive interference */
  constructive: '#22C55E',
  /** Destructive interference */
  destructive: '#EF4444',
  /** Standing wave node */
  node: '#6B7280',
  /** Standing wave antinode */
  antinode: '#FBBF24',
  /** Incident ray */
  incidentRay: '#3B82F6',
  /** Reflected ray */
  reflectedRay: '#10B981',
  /** Refracted ray */
  refractedRay: '#F59E0B',
  /** Diffraction pattern */
  diffraction: '#8B5CF6',
};

// =============================================================================
// QUANTUM MECHANICS PALETTE
// =============================================================================

/**
 * Quantum mechanics and modern physics colors
 */
export const quantumColors = {
  /** Wave function psi */
  waveFunction: '#8B5CF6',
  /** Probability density */
  probabilityDensity: '#EC4899',
  /** Ground state */
  groundState: '#2563EB',
  /** Excited state */
  excitedState: '#DC2626',
  /** Energy level */
  energyLevel: '#059669',
  /** Photon emission */
  photonEmission: '#F97316',
  /** Photon absorption */
  photonAbsorption: '#06B6D4',
  /** Tunneling */
  tunneling: '#A855F7',
  /** Superposition */
  superposition: '#14B8A6',
  /** Entanglement */
  entanglement: '#F43F5E',
  /** Spin up */
  spinUp: '#22C55E',
  /** Spin down */
  spinDown: '#EF4444',
};

// =============================================================================
// PARTICLE PHYSICS PALETTE
// =============================================================================

/**
 * Particle physics colors for Standard Model
 */
export const particleColors = {
  /** Electron/lepton */
  electron: '#3B82F6',
  /** Positron/antilepton */
  positron: '#F97316',
  /** Quark (up-type) */
  upQuark: '#DC2626',
  /** Quark (down-type) */
  downQuark: '#2563EB',
  /** Gluon */
  gluon: '#22C55E',
  /** Photon */
  photon: '#FBBF24',
  /** W boson */
  wBoson: '#8B5CF6',
  /** Z boson */
  zBoson: '#EC4899',
  /** Higgs boson */
  higgsBoson: '#06B6D4',
  /** Neutrino */
  neutrino: '#94A3B8',
  /** Muon */
  muon: '#10B981',
  /** Tau */
  tau: '#F43F5E',
};

// =============================================================================
// ASTROPHYSICS PALETTE
// =============================================================================

/**
 * Astrophysics and cosmology colors
 */
export const astrophysicsColors = {
  /** Main sequence star */
  mainSequence: '#FBBF24',
  /** Red giant */
  redGiant: '#DC2626',
  /** White dwarf */
  whiteDwarf: '#E5E7EB',
  /** Neutron star */
  neutronStar: '#8B5CF6',
  /** Black hole */
  blackHole: '#1F2937',
  /** Supernova */
  supernova: '#F97316',
  /** Nebula */
  nebula: '#A855F7',
  /** Galaxy */
  galaxy: '#6366F1',
  /** Dark matter */
  darkMatter: '#374151',
  /** Dark energy */
  darkEnergy: '#581C87',
  /** Cosmic microwave background */
  cmb: '#FDE68A',
  /** Redshift */
  redshift: '#EF4444',
  /** Blueshift */
  blueshift: '#3B82F6',
};

// =============================================================================
// SOLID STATE PHYSICS PALETTE
// =============================================================================

/**
 * Solid state and condensed matter physics colors
 */
export const solidStateColors = {
  /** Conduction band */
  conductionBand: '#3B82F6',
  /** Valence band */
  valenceBand: '#22C55E',
  /** Band gap */
  bandGap: '#F3F4F6',
  /** Fermi level */
  fermiLevel: '#DC2626',
  /** Electron in band */
  electronBand: '#2563EB',
  /** Hole in band */
  holeBand: '#F97316',
  /** n-type semiconductor */
  nType: '#3B82F6',
  /** p-type semiconductor */
  pType: '#EC4899',
  /** Crystal lattice */
  lattice: '#6B7280',
  /** Phonon */
  phonon: '#10B981',
  /** Superconductor */
  superconductor: '#06B6D4',
  /** Cooper pair */
  cooperPair: '#8B5CF6',
};

// =============================================================================
// LABORATORY COLORS
// =============================================================================

/**
 * Laboratory and experimental physics colors
 */
export const laboratoryColors = {
  /** Measured data points */
  dataPoints: '#2563EB',
  /** Theoretical curve */
  theoryCurve: '#DC2626',
  /** Error bars */
  errorBars: '#6B7280',
  /** Best fit line */
  bestFit: '#059669',
  /** Equipment outline */
  equipment: '#374151',
  /** Beam path */
  beamPath: '#F97316',
  /** Detector */
  detector: '#8B5CF6',
  /** Source */
  source: '#FBBF24',
  /** Shield/barrier */
  shield: '#4B5563',
  /** Vacuum region */
  vacuum: '#F3F4F6',
};

// =============================================================================
// SEVERITY/MAGNITUDE GRADIENT
// =============================================================================

/**
 * Magnitude gradient for physical quantities
 */
export const magnitudeGradient = {
  /** Very low */
  veryLow: '#DBEAFE',
  /** Low */
  low: '#93C5FD',
  /** Medium */
  medium: '#3B82F6',
  /** High */
  high: '#1D4ED8',
  /** Very high */
  veryHigh: '#1E3A8A',
};

// =============================================================================
// FLOWCHART COLORS
// =============================================================================

/**
 * Decision flowchart node colors
 */
export const flowchartColors = {
  /** Start/End nodes */
  terminal: '#22C55E',
  /** Decision nodes */
  decision: '#FBBF24',
  /** Process nodes */
  process: '#3B82F6',
  /** Input/Output */
  io: '#F97316',
  /** Calculation */
  calculation: '#8B5CF6',
  /** Measurement */
  measurement: '#06B6D4',
  /** Success outcome */
  success: '#22C55E',
  /** Failure outcome */
  failure: '#EF4444',
  /** Information */
  info: '#0EA5E9',
  /** Warning */
  warning: '#F59E0B',
};

// =============================================================================
// COMPLETE PHYSICS COLOR SCHEME
// =============================================================================

/**
 * Complete physics color scheme export
 */
export const physicsColorScheme = {
  // Core palettes
  mechanics: mechanicsColors,
  electromagnetism: electromagnetismColors,
  thermodynamics: thermodynamicsColors,
  wavesOptics: wavesOpticsColors,
  quantum: quantumColors,
  particles: particleColors,
  astrophysics: astrophysicsColors,
  solidState: solidStateColors,
  laboratory: laboratoryColors,

  // Utility palettes
  magnitude: magnitudeGradient,
  flowchart: flowchartColors,

  // Quick access to most commonly used colors
  common: {
    force: '#DC2626',
    velocity: '#2563EB',
    acceleration: '#16A34A',
    energy: '#F97316',
    electricField: '#F97316',
    magneticField: '#8B5CF6',
    hot: '#DC2626',
    cold: '#2563EB',
    positive: '#DC2626',
    negative: '#2563EB',
    waveFunction: '#8B5CF6',
    photon: '#FBBF24',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type MechanicsColors = typeof mechanicsColors;
export type ElectromagnetismColors = typeof electromagnetismColors;
export type ThermodynamicsColors = typeof thermodynamicsColors;
export type WavesOpticsColors = typeof wavesOpticsColors;
export type QuantumColors = typeof quantumColors;
export type ParticleColors = typeof particleColors;
export type AstrophysicsColors = typeof astrophysicsColors;
export type SolidStateColors = typeof solidStateColors;
export type LaboratoryColors = typeof laboratoryColors;
export type MagnitudeGradient = typeof magnitudeGradient;
export type FlowchartColors = typeof flowchartColors;
export type PhysicsColorScheme = typeof physicsColorScheme;

export default physicsColorScheme;
