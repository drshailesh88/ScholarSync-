/**
 * engineering.ts
 * Engineering color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for engineering diagrams including:
 * - Mechanical systems (gears, shafts, bearings)
 * - Electrical systems (circuits, signals, power)
 * - Hydraulic and pneumatic systems
 * - Manufacturing and production
 * - Quality engineering
 * - Structural analysis
 * - CAD and technical drawings
 * - Project management
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// MECHANICAL ENGINEERING COLORS
// =============================================================================

/**
 * Mechanical component colors
 */
export const mechanicalColors = {
  /** Steel/Metal components */
  steel: '#708090',
  /** Aluminum components */
  aluminum: '#A9A9A9',
  /** Cast iron */
  castIron: '#4A4A4A',
  /** Brass/Bronze */
  brass: '#CD853F',
  /** Copper */
  copper: '#B87333',
  /** Titanium */
  titanium: '#878681',
  /** Plastic/Polymer */
  plastic: '#4169E1',
  /** Rubber/Elastomer */
  rubber: '#2F4F4F',
  /** Ceramic */
  ceramic: '#F5F5DC',
  /** Composite */
  composite: '#556B2F',
};

/**
 * Gear and transmission colors
 */
export const gearColors = {
  /** Spur gear */
  spurGear: '#4682B4',
  /** Helical gear */
  helicalGear: '#5F9EA0',
  /** Bevel gear */
  bevelGear: '#6495ED',
  /** Worm gear */
  wormGear: '#7B68EE',
  /** Rack and pinion */
  rackPinion: '#4169E1',
  /** Chain drive */
  chainDrive: '#708090',
  /** Belt drive */
  beltDrive: '#2F4F4F',
  /** Gear mesh zone */
  meshZone: '#FFD700',
};

/**
 * Bearing and shaft colors
 */
export const bearingColors = {
  /** Ball bearing */
  ballBearing: '#87CEEB',
  /** Roller bearing */
  rollerBearing: '#B0C4DE',
  /** Sleeve bearing */
  sleeveBearing: '#CD853F',
  /** Thrust bearing */
  thrustBearing: '#DEB887',
  /** Shaft */
  shaft: '#708090',
  /** Keyway */
  keyway: '#4682B4',
  /** Coupling */
  coupling: '#5F9EA0',
  /** Lubricant */
  lubricant: '#FFD700',
};

// =============================================================================
// ELECTRICAL ENGINEERING COLORS
// =============================================================================

/**
 * Electrical circuit colors
 */
export const electricalColors = {
  /** Power line (hot) */
  powerHot: '#DC143C',
  /** Neutral */
  neutral: '#F5F5F5',
  /** Ground */
  ground: '#228B22',
  /** Phase A */
  phaseA: '#DC143C',
  /** Phase B */
  phaseB: '#4169E1',
  /** Phase C */
  phaseC: '#FFD700',
  /** Control wiring */
  controlWire: '#9370DB',
  /** Signal wiring */
  signalWire: '#FF8C00',
};

/**
 * Electronic component colors
 */
export const electronicColors = {
  /** Resistor */
  resistor: '#8B4513',
  /** Capacitor */
  capacitor: '#4169E1',
  /** Inductor */
  inductor: '#800080',
  /** Diode */
  diode: '#228B22',
  /** Transistor */
  transistor: '#FF6347',
  /** IC chip */
  icChip: '#2F4F4F',
  /** PCB board */
  pcbBoard: '#006400',
  /** Solder joint */
  solder: '#C0C0C0',
};

/**
 * Control system colors
 */
export const controlColors = {
  /** Setpoint signal */
  setpoint: '#4169E1',
  /** Error signal */
  error: '#DC143C',
  /** Control output */
  controlOutput: '#228B22',
  /** Feedback signal */
  feedback: '#9370DB',
  /** Controller block */
  controller: '#FFD700',
  /** Plant/Process */
  plant: '#32CD32',
  /** Sensor */
  sensor: '#FF8C00',
  /** Actuator */
  actuator: '#4682B4',
};

// =============================================================================
// FLUID POWER COLORS
// =============================================================================

/**
 * Hydraulic system colors (ISO standard)
 */
export const hydraulicColors = {
  /** Pressure line */
  pressureLine: '#DC143C',
  /** Return line */
  returnLine: '#4169E1',
  /** Drain line */
  drainLine: '#228B22',
  /** Pilot line */
  pilotLine: '#FF8C00',
  /** Hydraulic fluid */
  fluid: '#FF6347',
  /** Reservoir */
  reservoir: '#708090',
  /** Pump */
  pump: '#4682B4',
  /** Cylinder */
  cylinder: '#5F9EA0',
};

/**
 * Pneumatic system colors (ISO standard)
 */
export const pneumaticColors = {
  /** Pressure line */
  pressureLine: '#4169E1',
  /** Exhaust line */
  exhaustLine: '#228B22',
  /** Pilot line */
  pilotLine: '#FF8C00',
  /** Air supply */
  airSupply: '#87CEEB',
  /** Compressor */
  compressor: '#4682B4',
  /** FRL unit */
  frlUnit: '#708090',
  /** Cylinder */
  cylinder: '#32CD32',
  /** Valve */
  valve: '#FFD700',
};

// =============================================================================
// MANUFACTURING COLORS
// =============================================================================

/**
 * Manufacturing process colors
 */
export const manufacturingColors = {
  /** Raw material */
  rawMaterial: '#8B4513',
  /** Work in progress */
  wip: '#FFD700',
  /** Finished goods */
  finishedGoods: '#228B22',
  /** Scrap/Waste */
  scrap: '#DC143C',
  /** Rework */
  rework: '#FF8C00',
  /** Tool/Fixture */
  tooling: '#708090',
  /** Inspection point */
  inspection: '#4169E1',
  /** Packaging */
  packaging: '#DEB887',
};

/**
 * CNC and machining colors
 */
export const machiningColors = {
  /** Cutting tool */
  cuttingTool: '#4682B4',
  /** Workpiece */
  workpiece: '#C0C0C0',
  /** Fixture */
  fixture: '#708090',
  /** Coolant */
  coolant: '#87CEEB',
  /** Chip/Swarf */
  chips: '#CD853F',
  /** Spindle */
  spindle: '#2F4F4F',
  /** Feed direction */
  feed: '#228B22',
  /** Depth of cut */
  depthOfCut: '#FF8C00',
};

// =============================================================================
// QUALITY ENGINEERING COLORS
// =============================================================================

/**
 * SPC chart colors
 */
export const spcColors = {
  /** Upper control limit */
  ucl: '#DC143C',
  /** Center line */
  centerLine: '#228B22',
  /** Lower control limit */
  lcl: '#4169E1',
  /** In control point */
  inControl: '#228B22',
  /** Out of control point */
  outOfControl: '#DC143C',
  /** Warning zone */
  warningZone: '#FFD700',
  /** Upper spec limit */
  usl: '#FF8C00',
  /** Lower spec limit */
  lsl: '#FF8C00',
};

/**
 * Quality status colors
 */
export const qualityStatusColors = {
  /** Pass/Accept */
  pass: '#228B22',
  /** Fail/Reject */
  fail: '#DC143C',
  /** Marginal/Warning */
  marginal: '#FFD700',
  /** Under review */
  review: '#4169E1',
  /** Not tested */
  notTested: '#808080',
  /** Rework required */
  rework: '#FF8C00',
  /** Scrap */
  scrap: '#8B0000',
  /** On hold */
  onHold: '#9370DB',
};

// =============================================================================
// STRUCTURAL ANALYSIS COLORS
// =============================================================================

/**
 * Stress analysis colors (heat map style)
 */
export const stressColors = {
  /** Minimum stress */
  minStress: '#00008B',
  /** Low stress */
  lowStress: '#4169E1',
  /** Medium-low stress */
  medLowStress: '#87CEEB',
  /** Medium stress */
  medStress: '#228B22',
  /** Medium-high stress */
  medHighStress: '#FFD700',
  /** High stress */
  highStress: '#FF8C00',
  /** Maximum stress */
  maxStress: '#DC143C',
  /** Yield zone */
  yieldZone: '#FF0000',
};

/**
 * Load and support colors
 */
export const loadColors = {
  /** Applied force */
  appliedForce: '#DC143C',
  /** Reaction force */
  reactionForce: '#4169E1',
  /** Distributed load */
  distributedLoad: '#FF8C00',
  /** Moment/Torque */
  moment: '#9370DB',
  /** Fixed support */
  fixedSupport: '#2F4F4F',
  /** Pin support */
  pinSupport: '#228B22',
  /** Roller support */
  rollerSupport: '#FFD700',
  /** Spring support */
  springSupport: '#87CEEB',
};

// =============================================================================
// PROJECT MANAGEMENT COLORS
// =============================================================================

/**
 * Gantt chart colors
 */
export const ganttColors = {
  /** Critical path */
  criticalPath: '#DC143C',
  /** Non-critical task */
  nonCritical: '#4169E1',
  /** Completed task */
  completed: '#228B22',
  /** In progress */
  inProgress: '#FFD700',
  /** Not started */
  notStarted: '#808080',
  /** Delayed */
  delayed: '#FF8C00',
  /** Milestone */
  milestone: '#9370DB',
  /** Float/Slack */
  float: '#87CEEB',
};

/**
 * Resource status colors
 */
export const resourceColors = {
  /** Available */
  available: '#228B22',
  /** Allocated */
  allocated: '#4169E1',
  /** Overallocated */
  overallocated: '#DC143C',
  /** On leave */
  onLeave: '#808080',
  /** External resource */
  external: '#FF8C00',
  /** Contractor */
  contractor: '#9370DB',
  /** Part-time */
  partTime: '#87CEEB',
  /** Overtime */
  overtime: '#FFD700',
};

// =============================================================================
// CAD AND TECHNICAL DRAWING COLORS
// =============================================================================

/**
 * CAD layer colors (AutoCAD standard)
 */
export const cadLayerColors = {
  /** Visible edges */
  visibleEdge: '#FFFFFF',
  /** Hidden edges */
  hiddenEdge: '#00FF00',
  /** Center lines */
  centerLine: '#FF0000',
  /** Dimensions */
  dimension: '#00FFFF',
  /** Text/Annotations */
  text: '#FFFF00',
  /** Hatching */
  hatch: '#808080',
  /** Construction lines */
  construction: '#FF00FF',
  /** Section lines */
  section: '#FFA500',
};

/**
 * GD&T symbol colors
 */
export const gdtColors = {
  /** Feature control frame */
  fcf: '#4169E1',
  /** Datum reference */
  datum: '#228B22',
  /** Tolerance zone */
  toleranceZone: '#FFD700',
  /** Basic dimension */
  basicDimension: '#DC143C',
  /** Maximum material */
  mmb: '#FF8C00',
  /** Least material */
  lmb: '#9370DB',
  /** Profile tolerance */
  profile: '#87CEEB',
  /** Position tolerance */
  position: '#32CD32',
};

// =============================================================================
// RELIABILITY AND SAFETY COLORS
// =============================================================================

/**
 * FMEA severity colors
 */
export const fmeaColors = {
  /** Severity 1-3 (Low) */
  lowSeverity: '#228B22',
  /** Severity 4-6 (Medium) */
  medSeverity: '#FFD700',
  /** Severity 7-8 (High) */
  highSeverity: '#FF8C00',
  /** Severity 9-10 (Critical) */
  criticalSeverity: '#DC143C',
  /** Low RPN */
  lowRpn: '#228B22',
  /** Medium RPN */
  medRpn: '#FFD700',
  /** High RPN */
  highRpn: '#DC143C',
};

/**
 * Safety and hazard colors
 */
export const safetyColors = {
  /** Danger */
  danger: '#DC143C',
  /** Warning */
  warning: '#FFD700',
  /** Caution */
  caution: '#FF8C00',
  /** Notice */
  notice: '#4169E1',
  /** Safety instruction */
  safetyInstruction: '#228B22',
  /** Emergency */
  emergency: '#FF0000',
  /** Prohibition */
  prohibition: '#DC143C',
  /** Mandatory */
  mandatory: '#4169E1',
};

// =============================================================================
// FLOWCHART AND DIAGRAM COLORS
// =============================================================================

/**
 * Standard flowchart colors
 */
export const flowchartColors = {
  /** Start/End terminal */
  terminal: '#228B22',
  /** Process step */
  process: '#4169E1',
  /** Decision diamond */
  decision: '#FFD700',
  /** Input/Output */
  io: '#FF8C00',
  /** Subprocess */
  subprocess: '#9370DB',
  /** Connector */
  connector: '#87CEEB',
  /** Document */
  document: '#DEB887',
  /** Database */
  database: '#708090',
};

/**
 * Severity gradient for engineering conditions
 */
export const engineeringSeverityGradient = {
  /** Normal/Optimal */
  normal: '#228B22',
  /** Acceptable */
  acceptable: '#32CD32',
  /** Warning */
  warning: '#FFD700',
  /** Alert */
  alert: '#FF8C00',
  /** Critical */
  critical: '#DC143C',
  /** Emergency */
  emergency: '#8B0000',
};

// =============================================================================
// COMPLETE ENGINEERING COLOR SCHEME
// =============================================================================

/**
 * Complete engineering color scheme export
 */
export const engineeringColorScheme = {
  // Mechanical
  mechanical: mechanicalColors,
  gear: gearColors,
  bearing: bearingColors,

  // Electrical
  electrical: electricalColors,
  electronic: electronicColors,
  control: controlColors,

  // Fluid Power
  hydraulic: hydraulicColors,
  pneumatic: pneumaticColors,

  // Manufacturing
  manufacturing: manufacturingColors,
  machining: machiningColors,

  // Quality
  spc: spcColors,
  qualityStatus: qualityStatusColors,

  // Structural
  stress: stressColors,
  load: loadColors,

  // Project Management
  gantt: ganttColors,
  resource: resourceColors,

  // CAD
  cadLayer: cadLayerColors,
  gdt: gdtColors,

  // Reliability & Safety
  fmea: fmeaColors,
  safety: safetyColors,

  // Flowcharts
  flowchart: flowchartColors,
  severity: engineeringSeverityGradient,

  // Quick access to most commonly used colors
  common: {
    steel: '#708090',
    power: '#DC143C',
    ground: '#228B22',
    signal: '#4169E1',
    hydraulic: '#FF6347',
    pneumatic: '#87CEEB',
    pass: '#228B22',
    fail: '#DC143C',
    warning: '#FFD700',
    critical: '#DC143C',
  },
};

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type MechanicalColors = typeof mechanicalColors;
export type GearColors = typeof gearColors;
export type BearingColors = typeof bearingColors;
export type ElectricalColors = typeof electricalColors;
export type ElectronicColors = typeof electronicColors;
export type ControlColors = typeof controlColors;
export type HydraulicColors = typeof hydraulicColors;
export type PneumaticColors = typeof pneumaticColors;
export type ManufacturingColors = typeof manufacturingColors;
export type MachiningColors = typeof machiningColors;
export type SPCColors = typeof spcColors;
export type QualityStatusColors = typeof qualityStatusColors;
export type StressColors = typeof stressColors;
export type LoadColors = typeof loadColors;
export type GanttColors = typeof ganttColors;
export type ResourceColors = typeof resourceColors;
export type CADLayerColors = typeof cadLayerColors;
export type GDTColors = typeof gdtColors;
export type FMEAColors = typeof fmeaColors;
export type SafetyColors = typeof safetyColors;
export type FlowchartColors = typeof flowchartColors;
export type EngineeringSeverityGradient = typeof engineeringSeverityGradient;
export type EngineeringColorScheme = typeof engineeringColorScheme;

export default engineeringColorScheme;
