/**
 * aerospace.ts
 * Aerospace Engineering diagram templates for FINNISH
 *
 * Contains comprehensive templates for aerospace engineering including:
 * - Aircraft design and aerodynamics
 * - Propulsion systems
 * - Flight dynamics and control
 * - Spacecraft and orbital mechanics
 * - Structural analysis
 * - Avionics systems
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// AIRCRAFT DESIGN
// =============================================================================

/**
 * Aircraft Configuration template
 */
export const aircraftConfiguration: DiagramTemplate = {
  id: 'aero-aircraft-config',
  name: 'Aircraft Configuration Diagram',
  description: 'Overall aircraft layout with major components and dimensions',
  domain: 'engineering',
  promptTemplate: `Create an aircraft configuration diagram:
- Aircraft type: {{aircraftType}}
- Wing configuration: {{wingConfiguration}}
- Empennage type: {{empennage}}
- Powerplant: {{powerplant}}
- Landing gear: {{landingGear}}
- Fuselage layout: {{fuselageLayout}}
- Key dimensions: {{dimensions}}
{{#additionalNotes}}Design notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'aircraftType',
    'wingConfiguration',
    'empennage',
    'powerplant',
    'landingGear',
    'fuselageLayout',
    'dimensions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Aircraft["Aircraft Configuration"]
        FU["Fuselage"]
        WG["Wing\\nLow Swept"]
        HT["Horizontal\\nTail"]
        VT["Vertical\\nTail"]
        EG["Engines\\n2x Turbofan"]
        LG["Landing Gear\\nTricycle"]
    end
    FU --> WG
    FU --> HT
    FU --> VT
    WG --> EG
    FU --> LG
    style FU fill:#6b7280,color:#fff
    style WG fill:#3b82f6,color:#fff
    style EG fill:#dc2626,color:#fff`,
};

/**
 * Wing Design template
 */
export const wingDesign: DiagramTemplate = {
  id: 'aero-wing-design',
  name: 'Wing Design Diagram',
  description: 'Wing planform and cross-section design with control surfaces',
  domain: 'engineering',
  promptTemplate: `Create a wing design diagram:
- Planform shape: {{planform}}
- Aspect ratio: {{aspectRatio}}
- Sweep angle: {{sweepAngle}}
- Taper ratio: {{taperRatio}}
- Airfoil sections: {{airfoils}}
- High-lift devices: {{highLiftDevices}}
- Control surfaces: {{controlSurfaces}}
{{#additionalNotes}}Aerodynamic considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'planform',
    'aspectRatio',
    'sweepAngle',
    'taperRatio',
    'airfoils',
    'highLiftDevices',
    'controlSurfaces',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Wing["Wing Planform"]
        RT["Root\\nChord 5m"]
        TP["Tip\\nChord 2m"]
        LE["Leading\\nEdge Slat"]
        FL["Flaps"]
        AL["Ailerons"]
        SP["Spoilers"]
    end
    RT --> LE
    RT --> FL
    RT --> AL
    TP --> SP
    style RT fill:#3b82f6,color:#fff
    style FL fill:#10b981,color:#fff
    style AL fill:#f59e0b,color:#fff`,
};

/**
 * Empennage Design template
 */
export const empennageDesign: DiagramTemplate = {
  id: 'aero-empennage',
  name: 'Empennage Design Diagram',
  description: 'Tail configuration with horizontal and vertical stabilizers',
  domain: 'engineering',
  promptTemplate: `Create an empennage design diagram:
- Configuration type: {{configurationType}}
- Horizontal tail area: {{horizontalTailArea}}
- Vertical tail area: {{verticalTailArea}}
- Tail arm: {{tailArm}}
- Elevator design: {{elevator}}
- Rudder design: {{rudder}}
- Stability margins: {{stabilityMargins}}
{{#additionalNotes}}Stability considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'configurationType',
    'horizontalTailArea',
    'verticalTailArea',
    'tailArm',
    'elevator',
    'rudder',
    'stabilityMargins',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Empennage["Empennage Layout"]
        VT["Vertical\\nStabilizer"]
        HT["Horizontal\\nStabilizer"]
        RD["Rudder"]
        EL["Elevator"]
    end
    subgraph Dimensions["Sizing"]
        SV["Sv = 15 m²"]
        SH["Sh = 25 m²"]
    end
    VT --> RD
    HT --> EL
    VT --> SV
    HT --> SH
    style VT fill:#3b82f6,color:#fff
    style HT fill:#3b82f6,color:#fff
    style RD fill:#f59e0b,color:#fff
    style EL fill:#f59e0b,color:#fff`,
};

// =============================================================================
// AERODYNAMICS
// =============================================================================

/**
 * Airfoil Analysis template
 */
export const airfoilAnalysis: DiagramTemplate = {
  id: 'aero-airfoil-analysis',
  name: 'Airfoil Analysis Diagram',
  description: 'Airfoil characteristics with pressure distribution and coefficients',
  domain: 'engineering',
  promptTemplate: `Create an airfoil analysis diagram:
- Airfoil designation: {{airfoilDesignation}}
- Thickness ratio: {{thicknessRatio}}
- Camber: {{camber}}
- Lift coefficient: {{liftCoefficient}}
- Drag polar: {{dragPolar}}
- Pressure distribution: {{pressureDistribution}}
- Stall characteristics: {{stallCharacteristics}}
{{#additionalNotes}}Aerodynamic data: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'airfoilDesignation',
    'thicknessRatio',
    'camber',
    'liftCoefficient',
    'dragPolar',
    'pressureDistribution',
    'stallCharacteristics',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Airfoil["NACA 2412"]
        LE["Leading\\nEdge"]
        UC["Upper\\nCamber"]
        LC["Lower\\nCamber"]
        TE["Trailing\\nEdge"]
    end
    subgraph Performance["Performance"]
        CL["Cl_max = 1.6"]
        CD["Cd_min = 0.006"]
        AO["α_stall = 16°"]
    end
    LE --> UC --> TE
    LE --> LC --> TE
    Airfoil --> Performance
    style UC fill:#dc2626,color:#fff
    style LC fill:#3b82f6,color:#fff`,
};

/**
 * Drag Breakdown template
 */
export const dragBreakdown: DiagramTemplate = {
  id: 'aero-drag-breakdown',
  name: 'Drag Breakdown Diagram',
  description: 'Aircraft drag components analysis',
  domain: 'engineering',
  promptTemplate: `Create a drag breakdown diagram:
- Parasite drag: {{parasiteDrag}}
- Induced drag: {{inducedDrag}}
- Wave drag: {{waveDrag}}
- Interference drag: {{interferenceDrag}}
- Trim drag: {{trimDrag}}
- Component contributions: {{componentContributions}}
- Total drag coefficient: {{totalDrag}}
{{#additionalNotes}}Drag reduction strategies: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'parasiteDrag',
    'inducedDrag',
    'waveDrag',
    'interferenceDrag',
    'trimDrag',
    'componentContributions',
    'totalDrag',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Drag["Drag Components"]
        PD["Parasite\\n45%"]
        ID["Induced\\n35%"]
        WD["Wave\\n15%"]
        OD["Other\\n5%"]
    end
    subgraph Total["Total Drag"]
        TD["CD = 0.025"]
    end
    PD --> TD
    ID --> TD
    WD --> TD
    OD --> TD
    style PD fill:#dc2626,color:#fff
    style ID fill:#3b82f6,color:#fff
    style WD fill:#f59e0b,color:#fff`,
};

// =============================================================================
// PROPULSION SYSTEMS
// =============================================================================

/**
 * Turbofan Engine template
 */
export const turbofanEngine: DiagramTemplate = {
  id: 'aero-turbofan',
  name: 'Turbofan Engine Diagram',
  description: 'Turbofan engine layout with components and flow paths',
  domain: 'engineering',
  promptTemplate: `Create a turbofan engine diagram:
- Bypass ratio: {{bypassRatio}}
- Fan diameter: {{fanDiameter}}
- Compressor stages: {{compressorStages}}
- Turbine stages: {{turbineStages}}
- Combustor type: {{combustorType}}
- Thrust rating: {{thrustRating}}
- SFC: {{specificFuelConsumption}}
{{#additionalNotes}}Engine specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'bypassRatio',
    'fanDiameter',
    'compressorStages',
    'turbineStages',
    'combustorType',
    'thrustRating',
    'specificFuelConsumption',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Core["Core Engine"]
        FN["Fan"]
        LPC["LPC"]
        HPC["HPC"]
        CC["Combustor"]
        HPT["HPT"]
        LPT["LPT"]
    end
    subgraph Bypass["Bypass Flow"]
        BP["Bypass\\nDuct"]
    end
    FN --> LPC --> HPC --> CC --> HPT --> LPT
    FN --> BP
    BP --> NZ["Nozzle"]
    LPT --> NZ
    style CC fill:#dc2626,color:#fff
    style FN fill:#3b82f6,color:#fff`,
};

/**
 * Rocket Propulsion template
 */
export const rocketPropulsion: DiagramTemplate = {
  id: 'aero-rocket-propulsion',
  name: 'Rocket Propulsion System',
  description: 'Rocket engine and propellant system layout',
  domain: 'engineering',
  promptTemplate: `Create a rocket propulsion system diagram:
- Engine type: {{engineType}}
- Propellant combination: {{propellants}}
- Thrust level: {{thrustLevel}}
- Chamber pressure: {{chamberPressure}}
- Expansion ratio: {{expansionRatio}}
- Feed system: {{feedSystem}}
- Cooling method: {{cooling}}
{{#additionalNotes}}Propulsion specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'engineType',
    'propellants',
    'thrustLevel',
    'chamberPressure',
    'expansionRatio',
    'feedSystem',
    'cooling',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Tanks["Propellant Tanks"]
        OX["LOX Tank"]
        FU["RP-1 Tank"]
    end
    subgraph Engine["Engine"]
        TP["Turbopump"]
        CC["Combustion\\nChamber"]
        NZ["Nozzle"]
    end
    OX --> TP
    FU --> TP
    TP --> CC --> NZ
    style CC fill:#dc2626,color:#fff
    style OX fill:#0891b2,color:#fff
    style FU fill:#f59e0b,color:#fff`,
};

/**
 * Propeller Analysis template
 */
export const propellerAnalysis: DiagramTemplate = {
  id: 'aero-propeller',
  name: 'Propeller Analysis Diagram',
  description: 'Propeller design and performance analysis',
  domain: 'engineering',
  promptTemplate: `Create a propeller analysis diagram:
- Number of blades: {{bladeCount}}
- Diameter: {{diameter}}
- Pitch distribution: {{pitchDistribution}}
- Blade sections: {{bladeSections}}
- Efficiency curve: {{efficiency}}
- Power coefficient: {{powerCoefficient}}
- Advance ratio: {{advanceRatio}}
{{#additionalNotes}}Propeller specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'bladeCount',
    'diameter',
    'pitchDistribution',
    'bladeSections',
    'efficiency',
    'powerCoefficient',
    'advanceRatio',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Propeller["Propeller Design"]
        HB["Hub"]
        B1["Blade 1"]
        B2["Blade 2"]
        B3["Blade 3"]
    end
    subgraph Performance["Performance"]
        EF["η = 0.85"]
        CP["Cp = 0.05"]
        CT["Ct = 0.08"]
    end
    HB --> B1 & B2 & B3
    Propeller --> Performance
    style HB fill:#6b7280,color:#fff
    style B1 fill:#3b82f6,color:#fff`,
};

// =============================================================================
// FLIGHT DYNAMICS AND CONTROL
// =============================================================================

/**
 * Flight Control System template
 */
export const flightControlSystem: DiagramTemplate = {
  id: 'aero-flight-control',
  name: 'Flight Control System Diagram',
  description: 'Fly-by-wire flight control system architecture',
  domain: 'engineering',
  promptTemplate: `Create a flight control system diagram:
- Control system type: {{controlType}}
- Primary controls: {{primaryControls}}
- Secondary controls: {{secondaryControls}}
- Sensors: {{sensors}}
- Flight computers: {{computers}}
- Actuators: {{actuators}}
- Redundancy: {{redundancy}}
{{#additionalNotes}}Control laws: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'controlType',
    'primaryControls',
    'secondaryControls',
    'sensors',
    'computers',
    'actuators',
    'redundancy',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Inputs["Pilot Inputs"]
        SS["Side Stick"]
        RD["Rudder Pedals"]
        TH["Throttle"]
    end
    subgraph Computers["Flight Computers"]
        FC1["FCC 1"]
        FC2["FCC 2"]
        FC3["FCC 3"]
    end
    subgraph Actuators["Control Surfaces"]
        EL["Elevator"]
        AL["Ailerons"]
        RU["Rudder"]
    end
    SS --> FC1 & FC2
    RD --> FC2 & FC3
    FC1 --> EL
    FC2 --> AL
    FC3 --> RU
    style FC1 fill:#10b981,color:#fff
    style FC2 fill:#10b981,color:#fff
    style FC3 fill:#10b981,color:#fff`,
};

/**
 * Autopilot System template
 */
export const autopilotSystem: DiagramTemplate = {
  id: 'aero-autopilot',
  name: 'Autopilot System Diagram',
  description: 'Autopilot modes and control architecture',
  domain: 'engineering',
  promptTemplate: `Create an autopilot system diagram:
- Autopilot modes: {{autopilotModes}}
- Guidance modes: {{guidanceModes}}
- Navigation inputs: {{navigationInputs}}
- Feedback loops: {{feedbackLoops}}
- Mode logic: {{modeLogic}}
- Engagement criteria: {{engagementCriteria}}
- Monitoring: {{monitoring}}
{{#additionalNotes}}Autopilot logic: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'autopilotModes',
    'guidanceModes',
    'navigationInputs',
    'feedbackLoops',
    'modeLogic',
    'engagementCriteria',
    'monitoring',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Modes["Autopilot Modes"]
        HDG["Heading Hold"]
        ALT["Altitude Hold"]
        NAV["Navigation"]
        APR["Approach"]
    end
    subgraph Guidance["Guidance"]
        LAT["Lateral\\nGuidance"]
        VER["Vertical\\nGuidance"]
    end
    subgraph Control["Control"]
        FCC["Flight\\nComputer"]
        SRV["Servos"]
    end
    HDG --> LAT
    ALT --> VER
    NAV --> LAT & VER
    APR --> LAT & VER
    LAT --> FCC
    VER --> FCC
    FCC --> SRV
    style FCC fill:#10b981,color:#fff
    style NAV fill:#3b82f6,color:#fff`,
};

/**
 * Stability Analysis template
 */
export const stabilityAnalysis: DiagramTemplate = {
  id: 'aero-stability',
  name: 'Stability Analysis Diagram',
  description: 'Aircraft static and dynamic stability analysis',
  domain: 'engineering',
  promptTemplate: `Create a stability analysis diagram:
- Longitudinal stability: {{longitudinalStability}}
- Lateral stability: {{lateralStability}}
- Directional stability: {{directionalStability}}
- CG range: {{cgRange}}
- Neutral point: {{neutralPoint}}
- Mode characteristics: {{modeCharacteristics}}
- Handling qualities: {{handlingQualities}}
{{#additionalNotes}}Stability derivatives: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'longitudinalStability',
    'lateralStability',
    'directionalStability',
    'cgRange',
    'neutralPoint',
    'modeCharacteristics',
    'handlingQualities',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Static["Static Stability"]
        LS["Longitudinal\\nCm_α < 0"]
        DS["Directional\\nCn_β > 0"]
        RS["Lateral\\nCl_β < 0"]
    end
    subgraph Dynamic["Dynamic Modes"]
        SP["Short Period\\n1.5 Hz"]
        PH["Phugoid\\n0.1 Hz"]
        DR["Dutch Roll\\n0.8 Hz"]
    end
    LS --> SP & PH
    DS --> DR
    RS --> DR
    style LS fill:#10b981,color:#fff
    style SP fill:#3b82f6,color:#fff`,
};

// =============================================================================
// SPACECRAFT SYSTEMS
// =============================================================================

/**
 * Spacecraft Configuration template
 */
export const spacecraftConfiguration: DiagramTemplate = {
  id: 'aero-spacecraft-config',
  name: 'Spacecraft Configuration',
  description: 'Spacecraft subsystem layout and configuration',
  domain: 'engineering',
  promptTemplate: `Create a spacecraft configuration diagram:
- Mission type: {{missionType}}
- Bus architecture: {{busArchitecture}}
- Propulsion subsystem: {{propulsion}}
- Power subsystem: {{power}}
- Thermal control: {{thermal}}
- Communications: {{communications}}
- Payload: {{payload}}
{{#additionalNotes}}Spacecraft specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'missionType',
    'busArchitecture',
    'propulsion',
    'power',
    'thermal',
    'communications',
    'payload',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Spacecraft["Spacecraft Bus"]
        ST["Structure"]
        PR["Propulsion"]
        PW["Power System"]
        TH["Thermal"]
        CM["Comms"]
        ADCS["ADCS"]
    end
    subgraph Payload["Payload"]
        IM["Imager"]
        SP["Spectrometer"]
    end
    ST --> PR & PW & TH & CM & ADCS
    ST --> IM & SP
    style ST fill:#6b7280,color:#fff
    style PW fill:#f59e0b,color:#fff
    style CM fill:#3b82f6,color:#fff`,
};

/**
 * Orbital Mechanics template
 */
export const orbitalMechanics: DiagramTemplate = {
  id: 'aero-orbital-mechanics',
  name: 'Orbital Mechanics Diagram',
  description: 'Orbital parameters and maneuver planning',
  domain: 'engineering',
  promptTemplate: `Create an orbital mechanics diagram:
- Orbit type: {{orbitType}}
- Orbital elements: {{orbitalElements}}
- Altitude: {{altitude}}
- Inclination: {{inclination}}
- Period: {{period}}
- Delta-V budget: {{deltaVBudget}}
- Maneuvers: {{maneuvers}}
{{#additionalNotes}}Mission constraints: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'orbitType',
    'orbitalElements',
    'altitude',
    'inclination',
    'period',
    'deltaVBudget',
    'maneuvers',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Orbit["Orbit Parameters"]
        AP["Apogee\\n400 km"]
        PE["Perigee\\n350 km"]
        IN["Inclination\\n51.6°"]
        PR["Period\\n92 min"]
    end
    subgraph Maneuvers["Maneuvers"]
        M1["Hohmann\\nTransfer"]
        M2["Plane\\nChange"]
        M3["Deorbit\\nBurn"]
    end
    AP --> M1
    PE --> M2
    M1 --> M3
    style AP fill:#3b82f6,color:#fff
    style M1 fill:#dc2626,color:#fff`,
};

/**
 * Attitude Control System template
 */
export const attitudeControlSystem: DiagramTemplate = {
  id: 'aero-attitude-control',
  name: 'Attitude Control System',
  description: 'Spacecraft attitude determination and control system',
  domain: 'engineering',
  promptTemplate: `Create an attitude control system diagram:
- Determination sensors: {{sensors}}
- Control actuators: {{actuators}}
- Control modes: {{controlModes}}
- Pointing accuracy: {{pointingAccuracy}}
- Slew rate: {{slewRate}}
- Momentum management: {{momentumManagement}}
- Fault tolerance: {{faultTolerance}}
{{#additionalNotes}}ADCS requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'sensors',
    'actuators',
    'controlModes',
    'pointingAccuracy',
    'slewRate',
    'momentumManagement',
    'faultTolerance',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Sensors["Attitude Sensors"]
        ST["Star\\nTrackers"]
        SU["Sun\\nSensors"]
        GY["Gyros"]
    end
    subgraph Computer["ADCS Computer"]
        AD["Attitude\\nDetermination"]
        AC["Attitude\\nControl"]
    end
    subgraph Actuators["Actuators"]
        RW["Reaction\\nWheels"]
        TH["Thrusters"]
        MT["Magnetorquers"]
    end
    ST --> AD
    SU --> AD
    GY --> AD
    AD --> AC
    AC --> RW & TH & MT
    style AD fill:#10b981,color:#fff
    style AC fill:#3b82f6,color:#fff`,
};

// =============================================================================
// STRUCTURES AND TESTING
// =============================================================================

/**
 * Structural Load Path template
 */
export const structuralLoadPath: DiagramTemplate = {
  id: 'aero-load-path',
  name: 'Structural Load Path Diagram',
  description: 'Aircraft structural load path analysis',
  domain: 'engineering',
  promptTemplate: `Create a structural load path diagram:
- Load type: {{loadType}}
- Primary structure: {{primaryStructure}}
- Load transfer: {{loadTransfer}}
- Joints: {{joints}}
- Materials: {{materials}}
- Safety factors: {{safetyFactors}}
- Critical sections: {{criticalSections}}
{{#additionalNotes}}Structural analysis: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'loadType',
    'primaryStructure',
    'loadTransfer',
    'joints',
    'materials',
    'safetyFactors',
    'criticalSections',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Wing["Wing Structure"]
        SK["Skin"]
        SP["Spars"]
        RB["Ribs"]
    end
    subgraph Fuselage["Fuselage"]
        FR["Frames"]
        ST["Stringers"]
        WB["Wing Box"]
    end
    subgraph Loads["Loads"]
        LF["Lift"]
        WT["Weight"]
    end
    LF --> SK --> SP
    SP --> WB
    RB --> SP
    WT --> FR --> WB
    style SP fill:#dc2626,color:#fff
    style WB fill:#f59e0b,color:#fff`,
};

/**
 * Fatigue Analysis template
 */
export const fatigueAnalysis: DiagramTemplate = {
  id: 'aero-fatigue',
  name: 'Fatigue Analysis Diagram',
  description: 'Structural fatigue life and damage tolerance analysis',
  domain: 'engineering',
  promptTemplate: `Create a fatigue analysis diagram:
- Load spectrum: {{loadSpectrum}}
- Critical locations: {{criticalLocations}}
- S-N data: {{snData}}
- Damage accumulation: {{damageAccumulation}}
- Inspection intervals: {{inspectionIntervals}}
- Crack growth: {{crackGrowth}}
- Residual strength: {{residualStrength}}
{{#additionalNotes}}Fatigue methodology: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'loadSpectrum',
    'criticalLocations',
    'snData',
    'damageAccumulation',
    'inspectionIntervals',
    'crackGrowth',
    'residualStrength',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Loading["Load Spectrum"]
        FL["Flight\\nLoads"]
        GR["Ground\\nLoads"]
    end
    subgraph Analysis["Fatigue Analysis"]
        SN["S-N\\nApproach"]
        DT["Damage\\nTolerance"]
    end
    subgraph Life["Life Prediction"]
        SF["Safe Life\\n60,000 hr"]
        IN["Inspection\\n3,000 hr"]
    end
    FL --> SN
    GR --> SN
    SN --> SF
    DT --> IN
    style SN fill:#3b82f6,color:#fff
    style DT fill:#dc2626,color:#fff`,
};

// =============================================================================
// AVIONICS SYSTEMS
// =============================================================================

/**
 * Avionics Architecture template
 */
export const avionicsArchitecture: DiagramTemplate = {
  id: 'aero-avionics',
  name: 'Avionics Architecture Diagram',
  description: 'Integrated avionics system architecture',
  domain: 'engineering',
  promptTemplate: `Create an avionics architecture diagram:
- Architecture type: {{architectureType}}
- Data buses: {{dataBuses}}
- Display systems: {{displays}}
- Navigation systems: {{navigation}}
- Communication systems: {{communications}}
- Mission systems: {{missionSystems}}
- Power distribution: {{power}}
{{#additionalNotes}}Avionics requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'architectureType',
    'dataBuses',
    'displays',
    'navigation',
    'communications',
    'missionSystems',
    'power',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Cockpit["Cockpit"]
        PFD["Primary Flight\\nDisplay"]
        MFD["Multi-Function\\nDisplay"]
        CDU["Control\\nDisplay Unit"]
    end
    subgraph Core["Core Systems"]
        FMS["Flight Management\\nSystem"]
        AHRS["AHRS"]
        ADC["Air Data\\nComputer"]
    end
    subgraph Comms["Communications"]
        VHF["VHF Radio"]
        SAT["SATCOM"]
        XPDR["Transponder"]
    end
    PFD <--> FMS
    MFD <--> FMS
    AHRS --> FMS
    ADC --> FMS
    FMS <--> VHF & SAT
    style FMS fill:#10b981,color:#fff
    style PFD fill:#3b82f6,color:#fff`,
};

/**
 * Navigation System template
 */
export const navigationSystem: DiagramTemplate = {
  id: 'aero-navigation',
  name: 'Navigation System Diagram',
  description: 'Aircraft navigation system integration',
  domain: 'engineering',
  promptTemplate: `Create a navigation system diagram:
- Primary navigation: {{primaryNavigation}}
- Secondary navigation: {{secondaryNavigation}}
- Inertial system: {{inertialSystem}}
- Radio navigation: {{radioNavigation}}
- GPS integration: {{gpsIntegration}}
- Flight planning: {{flightPlanning}}
- Terrain awareness: {{terrainAwareness}}
{{#additionalNotes}}Navigation accuracy: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'primaryNavigation',
    'secondaryNavigation',
    'inertialSystem',
    'radioNavigation',
    'gpsIntegration',
    'flightPlanning',
    'terrainAwareness',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Sensors["Navigation Sensors"]
        GPS["GPS\\nReceiver"]
        INS["Inertial\\nNav System"]
        VOR["VOR/DME"]
        ILS["ILS"]
    end
    subgraph Processing["Navigation Computer"]
        NC["Nav\\nComputer"]
        FMS["FMS"]
    end
    subgraph Output["Outputs"]
        ND["Nav\\nDisplay"]
        AP["Autopilot"]
    end
    GPS --> NC
    INS --> NC
    VOR --> NC
    ILS --> NC
    NC --> FMS --> ND & AP
    style NC fill:#10b981,color:#fff
    style GPS fill:#3b82f6,color:#fff`,
};

// =============================================================================
// Export all templates
// =============================================================================

export const aerospaceTemplates: DiagramTemplate[] = [
  // Aircraft Design
  aircraftConfiguration,
  wingDesign,
  empennageDesign,
  // Aerodynamics
  airfoilAnalysis,
  dragBreakdown,
  // Propulsion Systems
  turbofanEngine,
  rocketPropulsion,
  propellerAnalysis,
  // Flight Dynamics and Control
  flightControlSystem,
  autopilotSystem,
  stabilityAnalysis,
  // Spacecraft Systems
  spacecraftConfiguration,
  orbitalMechanics,
  attitudeControlSystem,
  // Structures and Testing
  structuralLoadPath,
  fatigueAnalysis,
  // Avionics Systems
  avionicsArchitecture,
  navigationSystem,
];
