/**
 * mechanical.ts
 * Mechanical Engineering diagram templates for FINNISH
 *
 * Contains comprehensive templates for mechanical engineering including:
 * - Machine design and mechanisms
 * - Stress analysis and FEA
 * - Thermodynamics and heat transfer
 * - Fluid mechanics
 * - Manufacturing processes
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// MACHINE DESIGN
// =============================================================================

/**
 * Gear Train Design template
 */
export const gearTrainDesign: DiagramTemplate = {
  id: 'mech-gear-train',
  name: 'Gear Train Design',
  description: 'Gear train layout with speed and torque calculations',
  domain: 'engineering',
  promptTemplate: `Create a gear train design diagram:
- Number of stages: {{numStages}}
- Input speed: {{inputSpeed}}
- Output speed: {{outputSpeed}}
- Gear ratios: {{gearRatios}}
- Gear types: {{gearTypes}}
- Module/pitch: {{modulePitch}}
- Material: {{material}}
{{#additionalNotes}}Design requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'numStages',
    'inputSpeed',
    'outputSpeed',
    'gearRatios',
    'gearTypes',
    'modulePitch',
    'material',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Stage1["Stage 1"]
        G1["Driver\\n20 teeth"]
        G2["Driven\\n60 teeth"]
    end
    subgraph Stage2["Stage 2"]
        G3["Driver\\n18 teeth"]
        G4["Driven\\n54 teeth"]
    end
    INPUT["Motor\\n1800 RPM"] --> G1
    G1 --> G2
    G2 --> G3
    G3 --> G4
    G4 --> OUTPUT["Output\\n200 RPM"]
    style INPUT fill:#22c55e
    style OUTPUT fill:#3b82f6`,
};

/**
 * Bearing Selection template
 */
export const bearingSelection: DiagramTemplate = {
  id: 'mech-bearing-selection',
  name: 'Bearing Selection',
  description: 'Bearing selection process with load and life calculations',
  domain: 'engineering',
  promptTemplate: `Create a bearing selection diagram:
- Load type: {{loadType}}
- Radial load: {{radialLoad}}
- Axial load: {{axialLoad}}
- Operating speed: {{operatingSpeed}}
- Required life: {{requiredLife}}
- Bearing type: {{bearingType}}
- Lubrication: {{lubrication}}
{{#additionalNotes}}Selection criteria: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'loadType',
    'radialLoad',
    'axialLoad',
    'operatingSpeed',
    'requiredLife',
    'bearingType',
    'lubrication',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    START["Load Requirements"] --> CALC["Calculate\\nEquivalent Load"]
    CALC --> TYPE{"Load Type?"}
    TYPE -->|"Radial"| BALL["Deep Groove\\nBall Bearing"]
    TYPE -->|"Combined"| ANGULAR["Angular Contact\\nBall Bearing"]
    TYPE -->|"Heavy"| ROLLER["Roller\\nBearing"]
    BALL & ANGULAR & ROLLER --> LIFE["Calculate\\nL10 Life"]
    LIFE --> SELECT["Select Size\\nfrom Catalog"]`,
};

/**
 * Shaft Design template
 */
export const shaftDesign: DiagramTemplate = {
  id: 'mech-shaft-design',
  name: 'Shaft Design',
  description: 'Shaft design with stress analysis and fatigue considerations',
  domain: 'engineering',
  promptTemplate: `Create a shaft design diagram:
- Shaft length: {{shaftLength}}
- Support configuration: {{supportConfiguration}}
- Applied loads: {{appliedLoads}}
- Torque: {{torque}}
- Material: {{material}}
- Safety factor: {{safetyFactor}}
- Keyway specifications: {{keywaySpecs}}
{{#additionalNotes}}Design considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'shaftLength',
    'supportConfiguration',
    'appliedLoads',
    'torque',
    'material',
    'safetyFactor',
    'keywaySpecs',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Shaft["Shaft Layout"]
        A["Bearing A"]
        G["Gear"]
        P["Pulley"]
        B["Bearing B"]
    end
    A --- G --- P --- B
    subgraph Loads["Loading"]
        F1["Gear Force"]
        F2["Belt Force"]
        T["Torque"]
    end
    F1 --> G
    F2 --> P
    T --> G`,
};

/**
 * Mechanism Kinematics template
 */
export const mechanismKinematics: DiagramTemplate = {
  id: 'mech-kinematics',
  name: 'Mechanism Kinematics',
  description: 'Kinematic analysis of linkage mechanisms',
  domain: 'engineering',
  promptTemplate: `Create a mechanism kinematics diagram:
- Mechanism type: {{mechanismType}}
- Number of links: {{numLinks}}
- Degrees of freedom: {{dof}}
- Input motion: {{inputMotion}}
- Output motion: {{outputMotion}}
- Velocity analysis: {{velocityAnalysis}}
- Acceleration analysis: {{accelerationAnalysis}}
{{#additionalNotes}}Kinematic requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'mechanismType',
    'numLinks',
    'dof',
    'inputMotion',
    'outputMotion',
    'velocityAnalysis',
    'accelerationAnalysis',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph FourBar["Four-Bar Linkage"]
        O2["Ground\\nPivot O2"]
        A["Crank\\nPoint A"]
        B["Coupler\\nPoint B"]
        O4["Ground\\nPivot O4"]
    end
    O2 --> A --> B --> O4
    O4 --> O2
    subgraph Analysis["DOF = 1"]
        IN["Input: Crank"]
        OUT["Output: Rocker"]
    end`,
};

// =============================================================================
// STRESS ANALYSIS
// =============================================================================

/**
 * Stress-Strain Analysis template
 */
export const stressStrainAnalysis: DiagramTemplate = {
  id: 'mech-stress-strain',
  name: 'Stress-Strain Analysis',
  description: 'Material stress-strain relationship and failure analysis',
  domain: 'engineering',
  promptTemplate: `Create a stress-strain analysis diagram:
- Material type: {{materialType}}
- Loading condition: {{loadingCondition}}
- Yield strength: {{yieldStrength}}
- Ultimate strength: {{ultimateStrength}}
- Elastic modulus: {{elasticModulus}}
- Failure criteria: {{failureCriteria}}
{{#additionalNotes}}Analysis notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'materialType',
    'loadingCondition',
    'yieldStrength',
    'ultimateStrength',
    'elasticModulus',
    'failureCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Curve["Stress-Strain Curve"]
        E["Elastic Region"]
        Y["Yield Point"]
        P["Plastic Region"]
        U["Ultimate Strength"]
        F["Fracture"]
    end
    E --> Y --> P --> U --> F
    subgraph Properties["Material Properties"]
        SY["Sy = 250 MPa"]
        SU["Su = 400 MPa"]
        EL["E = 200 GPa"]
    end`,
};

/**
 * FEA Results template
 */
export const feaResults: DiagramTemplate = {
  id: 'mech-fea-results',
  name: 'FEA Results Visualization',
  description: 'Finite element analysis results presentation',
  domain: 'engineering',
  promptTemplate: `Create an FEA results diagram:
- Analysis type: {{analysisType}}
- Mesh details: {{meshDetails}}
- Boundary conditions: {{boundaryConditions}}
- Maximum stress: {{maxStress}}
- Maximum displacement: {{maxDisplacement}}
- Safety factor: {{safetyFactor}}
- Critical locations: {{criticalLocations}}
{{#additionalNotes}}Analysis conclusions: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'analysisType',
    'meshDetails',
    'boundaryConditions',
    'maxStress',
    'maxDisplacement',
    'safetyFactor',
    'criticalLocations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Model["FEA Model"]
        GEOM["Geometry"]
        MESH["Mesh\\n10,000 elements"]
        BC["Boundary\\nConditions"]
    end
    subgraph Results["Results"]
        STRESS["Von Mises\\nStress"]
        DISP["Displacement"]
        SF["Safety Factor"]
    end
    GEOM --> MESH --> BC --> STRESS & DISP
    STRESS & DISP --> SF
    style STRESS fill:#dc2626,color:#fff`,
};

/**
 * Fatigue Analysis template
 */
export const fatigueAnalysis: DiagramTemplate = {
  id: 'mech-fatigue',
  name: 'Fatigue Analysis',
  description: 'Fatigue life prediction and S-N curve analysis',
  domain: 'engineering',
  promptTemplate: `Create a fatigue analysis diagram:
- Loading type: {{loadingType}}
- Stress amplitude: {{stressAmplitude}}
- Mean stress: {{meanStress}}
- Endurance limit: {{enduranceLimit}}
- Fatigue life: {{fatigueLife}}
- Modification factors: {{modificationFactors}}
- Failure criterion: {{failureCriterion}}
{{#additionalNotes}}Fatigue considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'loadingType',
    'stressAmplitude',
    'meanStress',
    'enduranceLimit',
    'fatigueLife',
    'modificationFactors',
    'failureCriterion',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph SN["S-N Curve"]
        HCF["High Cycle\\nFatigue"]
        LCF["Low Cycle\\nFatigue"]
        END["Endurance\\nLimit"]
    end
    subgraph Factors["Modification Factors"]
        KA["Surface ka"]
        KB["Size kb"]
        KC["Load kc"]
    end
    SN --> Factors --> LIFE["Fatigue Life\\nNf cycles"]`,
};

// =============================================================================
// THERMODYNAMICS
// =============================================================================

/**
 * Thermodynamic Cycle template
 */
export const thermodynamicCycle: DiagramTemplate = {
  id: 'mech-thermo-cycle',
  name: 'Thermodynamic Cycle',
  description: 'P-V and T-S diagrams for thermodynamic cycles',
  domain: 'engineering',
  promptTemplate: `Create a thermodynamic cycle diagram:
- Cycle type: {{cycleType}}
- Working fluid: {{workingFluid}}
- State points: {{statePoints}}
- Heat input: {{heatInput}}
- Work output: {{workOutput}}
- Efficiency: {{efficiency}}
- Irreversibilities: {{irreversibilities}}
{{#additionalNotes}}Cycle analysis: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'cycleType',
    'workingFluid',
    'statePoints',
    'heatInput',
    'workOutput',
    'efficiency',
    'irreversibilities',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Carnot["Carnot Cycle P-V"]
        S1["1: Isothermal\\nExpansion"]
        S2["2: Adiabatic\\nExpansion"]
        S3["3: Isothermal\\nCompression"]
        S4["4: Adiabatic\\nCompression"]
    end
    S1 --> S2 --> S3 --> S4 --> S1
    subgraph Efficiency
        ETA["η = 1 - Tc/Th"]
    end`,
};

/**
 * Heat Exchanger Design template
 */
export const heatExchangerDesign: DiagramTemplate = {
  id: 'mech-heat-exchanger',
  name: 'Heat Exchanger Design',
  description: 'Heat exchanger sizing and performance analysis',
  domain: 'engineering',
  promptTemplate: `Create a heat exchanger design diagram:
- HX type: {{hxType}}
- Hot fluid: {{hotFluid}}
- Cold fluid: {{coldFluid}}
- Flow arrangement: {{flowArrangement}}
- Heat duty: {{heatDuty}}
- LMTD: {{lmtd}}
- Overall U: {{overallU}}
{{#additionalNotes}}Design specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'hxType',
    'hotFluid',
    'coldFluid',
    'flowArrangement',
    'heatDuty',
    'lmtd',
    'overallU',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph HX["Shell & Tube HX"]
        HOT_IN["Hot In\\n150°C"]
        HOT_OUT["Hot Out\\n80°C"]
        COLD_IN["Cold In\\n20°C"]
        COLD_OUT["Cold Out\\n60°C"]
    end
    HOT_IN --> HOT_OUT
    COLD_IN --> COLD_OUT
    subgraph Calc["Q = UA × LMTD"]
        DUTY["Q = 500 kW"]
    end`,
};

/**
 * Refrigeration Cycle template
 */
export const refrigerationCycle: DiagramTemplate = {
  id: 'mech-refrigeration',
  name: 'Refrigeration Cycle',
  description: 'Vapor compression refrigeration cycle analysis',
  domain: 'engineering',
  promptTemplate: `Create a refrigeration cycle diagram:
- Refrigerant: {{refrigerant}}
- Evaporator temperature: {{evaporatorTemp}}
- Condenser temperature: {{condenserTemp}}
- Cooling capacity: {{coolingCapacity}}
- Compressor work: {{compressorWork}}
- COP: {{cop}}
- Superheat/subcooling: {{superheatSubcooling}}
{{#additionalNotes}}Cycle specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'refrigerant',
    'evaporatorTemp',
    'condenserTemp',
    'coolingCapacity',
    'compressorWork',
    'cop',
    'superheatSubcooling',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    COMP["Compressor"] --> COND["Condenser"]
    COND --> EXP["Expansion\\nValve"]
    EXP --> EVAP["Evaporator"]
    EVAP --> COMP
    subgraph Performance
        QE["Qe = 10 kW"]
        W["W = 3 kW"]
        COP["COP = 3.3"]
    end
    style EVAP fill:#3b82f6,color:#fff
    style COND fill:#dc2626,color:#fff`,
};

// =============================================================================
// FLUID MECHANICS
// =============================================================================

/**
 * Pipe Network Analysis template
 */
export const pipeNetworkAnalysis: DiagramTemplate = {
  id: 'mech-pipe-network',
  name: 'Pipe Network Analysis',
  description: 'Fluid flow analysis in pipe networks',
  domain: 'engineering',
  promptTemplate: `Create a pipe network analysis diagram:
- Fluid: {{fluid}}
- Pipe material: {{pipeMaterial}}
- Flow rates: {{flowRates}}
- Pressure heads: {{pressureHeads}}
- Pipe diameters: {{pipeDiameters}}
- Friction losses: {{frictionLosses}}
- Pumps/valves: {{pumpsValves}}
{{#additionalNotes}}Network specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'fluid',
    'pipeMaterial',
    'flowRates',
    'pressureHeads',
    'pipeDiameters',
    'frictionLosses',
    'pumpsValves',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    RES["Reservoir\\nH = 50m"]
    PUMP["Pump\\nΔH = 30m"]
    J1["Junction 1"]
    J2["Junction 2"]
    OUT1["Outlet 1\\nQ = 0.05 m³/s"]
    OUT2["Outlet 2\\nQ = 0.03 m³/s"]
    RES --> PUMP --> J1
    J1 --> J2
    J1 --> OUT1
    J2 --> OUT2`,
};

/**
 * Pump Selection template
 */
export const pumpSelection: DiagramTemplate = {
  id: 'mech-pump-selection',
  name: 'Pump Selection',
  description: 'Pump selection with system curve analysis',
  domain: 'engineering',
  promptTemplate: `Create a pump selection diagram:
- Pump type: {{pumpType}}
- Flow rate: {{flowRate}}
- Total head: {{totalHead}}
- NPSH available: {{npshAvailable}}
- System curve: {{systemCurve}}
- Pump curve: {{pumpCurve}}
- Operating point: {{operatingPoint}}
{{#additionalNotes}}Selection criteria: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'pumpType',
    'flowRate',
    'totalHead',
    'npshAvailable',
    'systemCurve',
    'pumpCurve',
    'operatingPoint',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Curves["Head vs Flow"]
        PUMP_C["Pump Curve"]
        SYS_C["System Curve"]
        OP["Operating Point"]
    end
    subgraph Selection["Selection"]
        Q["Q = 100 L/min"]
        H["H = 25 m"]
        EFF["η = 75%"]
    end
    PUMP_C --> OP
    SYS_C --> OP
    OP --> Q & H & EFF`,
};

/**
 * CFD Analysis template
 */
export const cfdAnalysis: DiagramTemplate = {
  id: 'mech-cfd-analysis',
  name: 'CFD Analysis',
  description: 'Computational fluid dynamics analysis workflow',
  domain: 'engineering',
  promptTemplate: `Create a CFD analysis diagram:
- Geometry: {{geometry}}
- Mesh type: {{meshType}}
- Turbulence model: {{turbulenceModel}}
- Boundary conditions: {{boundaryConditions}}
- Solver settings: {{solverSettings}}
- Results: {{results}}
{{#additionalNotes}}Analysis notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'geometry',
    'meshType',
    'turbulenceModel',
    'boundaryConditions',
    'solverSettings',
    'results',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    GEOM["Geometry"] --> MESH["Mesh\\n1M cells"]
    MESH --> SETUP["Physics Setup\\nk-ε model"]
    SETUP --> SOLVE["Solver\\n1000 iterations"]
    SOLVE --> POST["Post-processing"]
    subgraph Results
        VEL["Velocity Field"]
        PRES["Pressure"]
        STREAM["Streamlines"]
    end
    POST --> VEL & PRES & STREAM`,
};

// =============================================================================
// MANUFACTURING
// =============================================================================

/**
 * Machining Process template
 */
export const machiningProcess: DiagramTemplate = {
  id: 'mech-machining',
  name: 'Machining Process Plan',
  description: 'Machining operations sequence and parameters',
  domain: 'engineering',
  promptTemplate: `Create a machining process plan:
- Part material: {{partMaterial}}
- Operations sequence: {{operationsSequence}}
- Machine tools: {{machineTools}}
- Cutting parameters: {{cuttingParameters}}
- Tooling: {{tooling}}
- Tolerances: {{tolerances}}
- Surface finish: {{surfaceFinish}}
{{#additionalNotes}}Process notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'partMaterial',
    'operationsSequence',
    'machineTools',
    'cuttingParameters',
    'tooling',
    'tolerances',
    'surfaceFinish',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    RAW["Raw Stock\\nØ50 × 100mm"]
    OP1["Op 10: Face\\nTurning"]
    OP2["Op 20: Rough\\nTurning"]
    OP3["Op 30: Finish\\nTurning"]
    OP4["Op 40: Drill\\nCenter"]
    OP5["Op 50: Thread\\nM30×2"]
    QC["Quality\\nCheck"]
    RAW --> OP1 --> OP2 --> OP3 --> OP4 --> OP5 --> QC`,
};

/**
 * Welding Procedure template
 */
export const weldingProcedure: DiagramTemplate = {
  id: 'mech-welding',
  name: 'Welding Procedure Specification',
  description: 'Welding process specification and joint design',
  domain: 'engineering',
  promptTemplate: `Create a welding procedure diagram:
- Welding process: {{weldingProcess}}
- Joint type: {{jointType}}
- Base material: {{baseMaterial}}
- Filler material: {{fillerMaterial}}
- Welding parameters: {{weldingParameters}}
- Preheat/PWHT: {{heatTreatment}}
- Inspection: {{inspection}}
{{#additionalNotes}}WPS details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'weldingProcess',
    'jointType',
    'baseMaterial',
    'fillerMaterial',
    'weldingParameters',
    'heatTreatment',
    'inspection',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Joint["V-Groove Butt Joint"]
        PREP["Joint Prep\\n60° included"]
        ROOT["Root Pass"]
        FILL["Fill Passes"]
        CAP["Cap Pass"]
    end
    subgraph WPS["Parameters"]
        PROC["GMAW"]
        WIRE["ER70S-6"]
        AMP["200-250A"]
    end
    PREP --> ROOT --> FILL --> CAP
    WPS --> Joint`,
};

/**
 * GD&T Drawing template
 */
export const gdtDrawing: DiagramTemplate = {
  id: 'mech-gdt',
  name: 'GD&T Drawing Interpretation',
  description: 'Geometric dimensioning and tolerancing interpretation',
  domain: 'engineering',
  promptTemplate: `Create a GD&T interpretation diagram:
- Feature type: {{featureType}}
- Datum reference frame: {{datumFrame}}
- Geometric tolerances: {{geometricTolerances}}
- Material condition: {{materialCondition}}
- Bonus tolerance: {{bonusTolerance}}
- Inspection method: {{inspectionMethod}}
{{#additionalNotes}}GD&T notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'featureType',
    'datumFrame',
    'geometricTolerances',
    'materialCondition',
    'bonusTolerance',
    'inspectionMethod',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph FCF["Feature Control Frame"]
        SYM["⌖ Position"]
        TOL["Ø0.25 M"]
        DAT["A B C"]
    end
    subgraph Datum["Datum Reference Frame"]
        A["Datum A\\nPrimary"]
        B["Datum B\\nSecondary"]
        C["Datum C\\nTertiary"]
    end
    FCF --> Datum`,
};

// =============================================================================
// VIBRATION ANALYSIS
// =============================================================================

/**
 * Vibration Analysis template
 */
export const vibrationAnalysis: DiagramTemplate = {
  id: 'mech-vibration',
  name: 'Vibration Analysis',
  description: 'Mechanical vibration analysis and modal analysis',
  domain: 'engineering',
  promptTemplate: `Create a vibration analysis diagram:
- System type: {{systemType}}
- Degrees of freedom: {{dof}}
- Natural frequencies: {{naturalFrequencies}}
- Mode shapes: {{modeShapes}}
- Damping: {{damping}}
- Excitation: {{excitation}}
- Isolation: {{isolation}}
{{#additionalNotes}}Analysis notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'systemType',
    'dof',
    'naturalFrequencies',
    'modeShapes',
    'damping',
    'excitation',
    'isolation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph SDOF["Single DOF System"]
        M["Mass m"]
        K["Spring k"]
        C["Damper c"]
    end
    subgraph Analysis["Modal Analysis"]
        WN["ωn = √(k/m)"]
        ZETA["ζ = c/(2√km)"]
        FN["fn = ωn/2π"]
    end
    SDOF --> Analysis`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All mechanical engineering templates
 */
export const mechanicalTemplates: DiagramTemplate[] = [
  // Machine Design
  gearTrainDesign,
  bearingSelection,
  shaftDesign,
  mechanismKinematics,
  // Stress Analysis
  stressStrainAnalysis,
  feaResults,
  fatigueAnalysis,
  // Thermodynamics
  thermodynamicCycle,
  heatExchangerDesign,
  refrigerationCycle,
  // Fluid Mechanics
  pipeNetworkAnalysis,
  pumpSelection,
  cfdAnalysis,
  // Manufacturing
  machiningProcess,
  weldingProcedure,
  gdtDrawing,
  // Vibration
  vibrationAnalysis,
];

export default mechanicalTemplates;
