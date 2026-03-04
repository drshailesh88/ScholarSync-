/**
 * chemical.ts
 * Chemical Engineering diagram templates for FINNISH
 *
 * Contains comprehensive templates for chemical engineering including:
 * - Process flow and design
 * - Reaction engineering
 * - Separation processes
 * - Heat transfer systems
 * - Process control
 * - Safety and hazard analysis
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// PROCESS FLOW DESIGN
// =============================================================================

/**
 * Process Flow Diagram template
 */
export const processFlowDiagram: DiagramTemplate = {
  id: 'chem-process-flow',
  name: 'Process Flow Diagram (PFD)',
  description: 'High-level process flow diagram with major equipment and streams',
  domain: 'engineering',
  promptTemplate: `Create a process flow diagram:
- Process name: {{processName}}
- Feed streams: {{feedStreams}}
- Product streams: {{productStreams}}
- Major equipment: {{majorEquipment}}
- Operating conditions: {{operatingConditions}}
- Material balance: {{materialBalance}}
- Energy streams: {{energyStreams}}
{{#additionalNotes}}Process notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'processName',
    'feedStreams',
    'productStreams',
    'majorEquipment',
    'operatingConditions',
    'materialBalance',
    'energyStreams',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Feed["Feed Section"]
        F1["Raw Material\\n100 kg/h"]
    end
    subgraph Reaction["Reaction"]
        R1["Reactor\\n150°C, 5 bar"]
    end
    subgraph Separation["Separation"]
        D1["Distillation\\nColumn"]
    end
    subgraph Products["Products"]
        P1["Product A\\n80 kg/h"]
        P2["Recycle\\n20 kg/h"]
    end
    F1 --> R1 --> D1
    D1 --> P1
    D1 --> P2 --> R1
    style R1 fill:#dc2626,color:#fff
    style D1 fill:#3b82f6,color:#fff`,
};

/**
 * Piping and Instrumentation Diagram template
 */
export const pipingInstrumentationDiagram: DiagramTemplate = {
  id: 'chem-p-and-id',
  name: 'Piping and Instrumentation Diagram (P&ID)',
  description: 'Detailed P&ID with instruments, valves, and control loops',
  domain: 'engineering',
  promptTemplate: `Create a P&ID diagram:
- Equipment list: {{equipment}}
- Piping specifications: {{pipingSpecs}}
- Instrumentation: {{instruments}}
- Control loops: {{controlLoops}}
- Safety systems: {{safetySystems}}
- Valve types: {{valves}}
- Utility connections: {{utilities}}
{{#additionalNotes}}Design standards: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'equipment',
    'pipingSpecs',
    'instruments',
    'controlLoops',
    'safetySystems',
    'valves',
    'utilities',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Vessel["V-101"]
        TK["Storage\\nTank"]
        LT["LT-101\\nLevel"]
        TT["TT-101\\nTemp"]
    end
    subgraph Control["Control"]
        LIC["LIC-101"]
        TIC["TIC-101"]
    end
    subgraph Valves["Valves"]
        CV1["LV-101"]
        CV2["TV-101"]
    end
    TK --> LT --> LIC --> CV1
    TK --> TT --> TIC --> CV2
    style TK fill:#6b7280,color:#fff
    style LIC fill:#10b981,color:#fff
    style TIC fill:#10b981,color:#fff`,
};

/**
 * Block Flow Diagram template
 */
export const blockFlowDiagram: DiagramTemplate = {
  id: 'chem-block-flow',
  name: 'Block Flow Diagram (BFD)',
  description: 'Simplified block diagram showing major process sections',
  domain: 'engineering',
  promptTemplate: `Create a block flow diagram:
- Process sections: {{sections}}
- Input streams: {{inputs}}
- Output streams: {{outputs}}
- Interconnections: {{interconnections}}
- Recycle streams: {{recycles}}
- Utility requirements: {{utilities}}
- Capacity: {{capacity}}
{{#additionalNotes}}Process overview: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'sections',
    'inputs',
    'outputs',
    'interconnections',
    'recycles',
    'utilities',
    'capacity',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    RM["Raw\\nMaterials"] --> PREP["Feed\\nPreparation"]
    PREP --> RXN["Reaction\\nSection"]
    RXN --> SEP["Separation\\nSection"]
    SEP --> PURE["Purification"]
    PURE --> PROD["Product\\nStorage"]
    SEP -.-> RXN
    style RXN fill:#dc2626,color:#fff
    style SEP fill:#3b82f6,color:#fff
    style PURE fill:#10b981,color:#fff`,
};

// =============================================================================
// REACTION ENGINEERING
// =============================================================================

/**
 * Reactor Design template
 */
export const reactorDesign: DiagramTemplate = {
  id: 'chem-reactor-design',
  name: 'Reactor Design Diagram',
  description: 'Chemical reactor design with reaction conditions and internals',
  domain: 'engineering',
  promptTemplate: `Create a reactor design diagram:
- Reactor type: {{reactorType}}
- Reaction chemistry: {{reactionChemistry}}
- Operating conditions: {{operatingConditions}}
- Catalyst system: {{catalyst}}
- Heat transfer: {{heatTransfer}}
- Mixing requirements: {{mixing}}
- Residence time: {{residenceTime}}
{{#additionalNotes}}Design considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'reactorType',
    'reactionChemistry',
    'operatingConditions',
    'catalyst',
    'heatTransfer',
    'mixing',
    'residenceTime',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Reactor["CSTR Reactor"]
        AG["Agitator\\n200 RPM"]
        JK["Cooling\\nJacket"]
        CT["Catalyst\\nBed"]
    end
    subgraph Conditions["Operating Conditions"]
        T["T = 85°C"]
        P["P = 3 bar"]
        RT["τ = 2 hr"]
    end
    F["Feed"] --> Reactor --> PROD["Product"]
    JK --> CW["Cooling Water"]
    style Reactor fill:#dc2626,color:#fff
    style AG fill:#6b7280,color:#fff`,
};

/**
 * Reaction Kinetics template
 */
export const reactionKinetics: DiagramTemplate = {
  id: 'chem-reaction-kinetics',
  name: 'Reaction Kinetics Diagram',
  description: 'Reaction mechanism and kinetic parameter visualization',
  domain: 'engineering',
  promptTemplate: `Create a reaction kinetics diagram:
- Reaction mechanism: {{mechanism}}
- Rate expressions: {{rateExpressions}}
- Activation energy: {{activationEnergy}}
- Rate constants: {{rateConstants}}
- Temperature dependence: {{temperatureDependence}}
- Catalyst effects: {{catalystEffects}}
- Equilibrium: {{equilibrium}}
{{#additionalNotes}}Kinetic model: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'mechanism',
    'rateExpressions',
    'activationEnergy',
    'rateConstants',
    'temperatureDependence',
    'catalystEffects',
    'equilibrium',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Step1["Step 1 (Fast)"]
        A["A"] --> |"k1"| B["B*"]
    end
    subgraph Step2["Step 2 (Slow - RDS)"]
        B --> |"k2"| C["C"]
    end
    subgraph Step3["Step 3 (Fast)"]
        C --> |"k3"| D["D (Product)"]
    end
    style B fill:#f59e0b,color:#fff
    style D fill:#10b981,color:#fff`,
};

// =============================================================================
// SEPARATION PROCESSES
// =============================================================================

/**
 * Distillation Column Design template
 */
export const distillationColumnDesign: DiagramTemplate = {
  id: 'chem-distillation',
  name: 'Distillation Column Design',
  description: 'Distillation column design with trays/packing and condenser/reboiler',
  domain: 'engineering',
  promptTemplate: `Create a distillation column design diagram:
- Column type: {{columnType}}
- Number of stages: {{stages}}
- Feed location: {{feedLocation}}
- Reflux ratio: {{refluxRatio}}
- Condenser type: {{condenser}}
- Reboiler type: {{reboiler}}
- Key components: {{keyComponents}}
{{#additionalNotes}}Separation specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'columnType',
    'stages',
    'feedLocation',
    'refluxRatio',
    'condenser',
    'reboiler',
    'keyComponents',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Column["Distillation Column"]
        CD["Condenser"]
        RD["Reflux Drum"]
        TS["Trays\\n30 stages"]
        RB["Reboiler"]
    end
    F["Feed\\nStage 15"] --> TS
    CD --> RD
    RD --> |"Reflux"| TS
    RD --> DIST["Distillate"]
    TS --> RB
    RB --> |"Vapor"| TS
    RB --> BOT["Bottoms"]
    style TS fill:#3b82f6,color:#fff
    style CD fill:#0891b2,color:#fff
    style RB fill:#dc2626,color:#fff`,
};

/**
 * Absorption Column template
 */
export const absorptionColumn: DiagramTemplate = {
  id: 'chem-absorption',
  name: 'Absorption Column Design',
  description: 'Gas absorption column with solvent regeneration',
  domain: 'engineering',
  promptTemplate: `Create an absorption column design diagram:
- Solute gas: {{soluteGas}}
- Absorbent: {{absorbent}}
- Column internals: {{columnInternals}}
- Operating conditions: {{operatingConditions}}
- Mass transfer: {{massTransfer}}
- Regeneration: {{regeneration}}
- Efficiency: {{efficiency}}
{{#additionalNotes}}Design parameters: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'soluteGas',
    'absorbent',
    'columnInternals',
    'operatingConditions',
    'massTransfer',
    'regeneration',
    'efficiency',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Absorber["Absorber Column"]
        PK["Packing\\nRaschig Rings"]
    end
    GI["Gas In\\n(CO2 rich)"] --> PK
    PK --> GO["Gas Out\\n(Clean)"]
    SI["Lean\\nSolvent"] --> PK
    PK --> SO["Rich\\nSolvent"]
    SO --> REG["Regenerator"] --> SI
    style PK fill:#3b82f6,color:#fff
    style REG fill:#dc2626,color:#fff`,
};

/**
 * Extraction Process template
 */
export const extractionProcess: DiagramTemplate = {
  id: 'chem-extraction',
  name: 'Liquid-Liquid Extraction',
  description: 'Solvent extraction process with multiple stages',
  domain: 'engineering',
  promptTemplate: `Create a liquid-liquid extraction diagram:
- Feed composition: {{feedComposition}}
- Solvent: {{solvent}}
- Extract: {{extract}}
- Raffinate: {{raffinate}}
- Number of stages: {{stages}}
- Extraction efficiency: {{efficiency}}
- Solvent recovery: {{solventRecovery}}
{{#additionalNotes}}Extraction details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'feedComposition',
    'solvent',
    'extract',
    'raffinate',
    'stages',
    'efficiency',
    'solventRecovery',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Extraction["Extraction Column"]
        S1["Stage 1"]
        S2["Stage 2"]
        S3["Stage 3"]
    end
    FD["Feed"] --> S1
    SV["Fresh\\nSolvent"] --> S3
    S1 --> S2 --> S3
    S1 --> RF["Raffinate"]
    S3 --> EX["Extract"]
    EX --> SR["Solvent\\nRecovery"] --> SV
    style S1 fill:#3b82f6,color:#fff
    style S2 fill:#3b82f6,color:#fff
    style S3 fill:#3b82f6,color:#fff`,
};

/**
 * Filtration System template
 */
export const filtrationSystem: DiagramTemplate = {
  id: 'chem-filtration',
  name: 'Filtration System Design',
  description: 'Solid-liquid separation filtration system',
  domain: 'engineering',
  promptTemplate: `Create a filtration system diagram:
- Filter type: {{filterType}}
- Feed characteristics: {{feedCharacteristics}}
- Filtrate quality: {{filtrateQuality}}
- Cake properties: {{cakeProperties}}
- Operating mode: {{operatingMode}}
- Cycle time: {{cycleTime}}
- Washing requirements: {{washing}}
{{#additionalNotes}}Filtration parameters: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'filterType',
    'feedCharacteristics',
    'filtrateQuality',
    'cakeProperties',
    'operatingMode',
    'cycleTime',
    'washing',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Filter["Rotary Vacuum Filter"]
        DR["Drum"]
        FM["Filter Media"]
        VB["Vacuum Box"]
    end
    SL["Slurry\\nFeed"] --> DR
    DR --> FM --> VB
    VB --> FT["Filtrate"]
    DR --> CK["Filter\\nCake"]
    WS["Wash\\nWater"] --> DR
    style DR fill:#6b7280,color:#fff
    style FT fill:#0891b2,color:#fff`,
};

// =============================================================================
// HEAT TRANSFER
// =============================================================================

/**
 * Heat Exchanger Design template
 */
export const heatExchangerDesign: DiagramTemplate = {
  id: 'chem-heat-exchanger',
  name: 'Heat Exchanger Design',
  description: 'Shell and tube heat exchanger design with thermal analysis',
  domain: 'engineering',
  promptTemplate: `Create a heat exchanger design diagram:
- Exchanger type: {{exchangerType}}
- Hot fluid: {{hotFluid}}
- Cold fluid: {{coldFluid}}
- Duty: {{duty}}
- LMTD: {{lmtd}}
- Overall coefficient: {{overallCoefficient}}
- Tube specifications: {{tubeSpecs}}
{{#additionalNotes}}Design specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'exchangerType',
    'hotFluid',
    'coldFluid',
    'duty',
    'lmtd',
    'overallCoefficient',
    'tubeSpecs',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph HX["Shell & Tube HX"]
        SH["Shell Side\\n(Hot)"]
        TB["Tube Side\\n(Cold)"]
    end
    HI["Hot In\\n150°C"] --> SH --> HO["Hot Out\\n80°C"]
    CI["Cold In\\n25°C"] --> TB --> CO["Cold Out\\n70°C"]
    style SH fill:#dc2626,color:#fff
    style TB fill:#3b82f6,color:#fff`,
};

/**
 * Fired Heater Design template
 */
export const firedHeaterDesign: DiagramTemplate = {
  id: 'chem-fired-heater',
  name: 'Fired Heater Design',
  description: 'Process fired heater with radiant and convection sections',
  domain: 'engineering',
  promptTemplate: `Create a fired heater design diagram:
- Heater type: {{heaterType}}
- Process fluid: {{processFluid}}
- Heat duty: {{heatDuty}}
- Fuel type: {{fuelType}}
- Radiant section: {{radiantSection}}
- Convection section: {{convectionSection}}
- Efficiency: {{efficiency}}
{{#additionalNotes}}Heater specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'heaterType',
    'processFluid',
    'heatDuty',
    'fuelType',
    'radiantSection',
    'convectionSection',
    'efficiency',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Heater["Fired Heater"]
        CV["Convection\\nSection"]
        RD["Radiant\\nSection"]
        BR["Burners"]
    end
    FI["Feed In"] --> CV --> RD --> FO["Product Out"]
    FU["Fuel Gas"] --> BR --> RD
    CV --> ST["Stack\\nGases"]
    style RD fill:#dc2626,color:#fff
    style CV fill:#f59e0b,color:#fff`,
};

/**
 * Cooling Tower Design template
 */
export const coolingTowerDesign: DiagramTemplate = {
  id: 'chem-cooling-tower',
  name: 'Cooling Tower Design',
  description: 'Evaporative cooling tower with water treatment system',
  domain: 'engineering',
  promptTemplate: `Create a cooling tower design diagram:
- Tower type: {{towerType}}
- Cooling capacity: {{coolingCapacity}}
- Water circulation rate: {{circulationRate}}
- Approach temperature: {{approachTemp}}
- Range: {{range}}
- Makeup water: {{makeupWater}}
- Blowdown: {{blowdown}}
{{#additionalNotes}}Design parameters: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'towerType',
    'coolingCapacity',
    'circulationRate',
    'approachTemp',
    'range',
    'makeupWater',
    'blowdown',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Tower["Cooling Tower"]
        FL["Fill Media"]
        FN["Fans"]
        BS["Basin"]
    end
    HW["Hot Water\\n45°C"] --> FL
    FL --> BS
    BS --> CW["Cold Water\\n30°C"]
    FN --> |"Air"| FL
    MU["Makeup\\nWater"] --> BS
    BS --> BD["Blowdown"]
    style FL fill:#0891b2,color:#fff
    style HW fill:#dc2626,color:#fff
    style CW fill:#3b82f6,color:#fff`,
};

// =============================================================================
// PROCESS CONTROL
// =============================================================================

/**
 * Control Loop Design template
 */
export const controlLoopDesign: DiagramTemplate = {
  id: 'chem-control-loop',
  name: 'Control Loop Design',
  description: 'Process control loop with feedback and feedforward elements',
  domain: 'engineering',
  promptTemplate: `Create a control loop design diagram:
- Controlled variable: {{controlledVariable}}
- Manipulated variable: {{manipulatedVariable}}
- Controller type: {{controllerType}}
- Setpoint: {{setpoint}}
- Disturbances: {{disturbances}}
- Tuning parameters: {{tuningParameters}}
- Control strategy: {{controlStrategy}}
{{#additionalNotes}}Control requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'controlledVariable',
    'manipulatedVariable',
    'controllerType',
    'setpoint',
    'disturbances',
    'tuningParameters',
    'controlStrategy',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Controller["PID Controller"]
        SP["Setpoint"]
        PID["TIC-101\\nPID"]
        OP["Output"]
    end
    subgraph Process["Process"]
        VL["Control\\nValve"]
        PR["Process"]
        TT["TT-101"]
    end
    SP --> PID
    TT --> |"PV"| PID
    PID --> OP --> VL --> PR
    PR --> TT
    style PID fill:#10b981,color:#fff
    style VL fill:#6b7280,color:#fff`,
};

/**
 * Cascade Control template
 */
export const cascadeControl: DiagramTemplate = {
  id: 'chem-cascade-control',
  name: 'Cascade Control System',
  description: 'Cascade control configuration with primary and secondary loops',
  domain: 'engineering',
  promptTemplate: `Create a cascade control system diagram:
- Primary loop: {{primaryLoop}}
- Secondary loop: {{secondaryLoop}}
- Primary controller: {{primaryController}}
- Secondary controller: {{secondaryController}}
- Process interaction: {{processInteraction}}
- Tuning approach: {{tuningApproach}}
- Performance criteria: {{performance}}
{{#additionalNotes}}Control philosophy: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'primaryLoop',
    'secondaryLoop',
    'primaryController',
    'secondaryController',
    'processInteraction',
    'tuningApproach',
    'performance',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Primary["Primary Loop"]
        SP1["Setpoint"]
        TC["TC-101\\nMaster"]
    end
    subgraph Secondary["Secondary Loop"]
        FC["FC-101\\nSlave"]
        FT["FT-101"]
    end
    subgraph Process["Process"]
        CV["Control\\nValve"]
        HX["Heat\\nExchanger"]
        TT["TT-101"]
    end
    SP1 --> TC --> FC
    FT --> FC --> CV --> HX
    HX --> TT --> TC
    CV --> FT
    style TC fill:#10b981,color:#fff
    style FC fill:#3b82f6,color:#fff`,
};

// =============================================================================
// SAFETY AND HAZARD ANALYSIS
// =============================================================================

/**
 * HAZOP Analysis template
 */
export const hazopAnalysis: DiagramTemplate = {
  id: 'chem-hazop',
  name: 'HAZOP Analysis Diagram',
  description: 'Hazard and Operability study node analysis',
  domain: 'engineering',
  promptTemplate: `Create a HAZOP analysis diagram:
- Study node: {{studyNode}}
- Process parameters: {{parameters}}
- Guide words: {{guideWords}}
- Deviations: {{deviations}}
- Causes: {{causes}}
- Consequences: {{consequences}}
- Safeguards: {{safeguards}}
{{#additionalNotes}}Action items: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'studyNode',
    'parameters',
    'guideWords',
    'deviations',
    'causes',
    'consequences',
    'safeguards',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Node["Node: Reactor Feed"]
        PM["Parameter:\\nFlow"]
        GW["Guideword:\\nNO"]
    end
    subgraph Analysis["Analysis"]
        DV["Deviation:\\nNo Flow"]
        CA["Cause:\\nPump Failure"]
        CS["Consequence:\\nReactor Overheat"]
    end
    subgraph Protection["Safeguards"]
        SG["Low Flow Alarm"]
        SD["High Temp Trip"]
    end
    PM --> GW --> DV
    DV --> CA --> CS
    CS --> SG & SD
    style CS fill:#dc2626,color:#fff
    style SG fill:#10b981,color:#fff`,
};

/**
 * Relief System Design template
 */
export const reliefSystemDesign: DiagramTemplate = {
  id: 'chem-relief-system',
  name: 'Relief System Design',
  description: 'Pressure relief system with relief valves and flare',
  domain: 'engineering',
  promptTemplate: `Create a relief system design diagram:
- Protected equipment: {{protectedEquipment}}
- Relief scenarios: {{reliefScenarios}}
- Relief device type: {{reliefDevice}}
- Set pressure: {{setPressure}}
- Relief rate: {{reliefRate}}
- Disposal system: {{disposalSystem}}
- Flare system: {{flareSystem}}
{{#additionalNotes}}Relief calculations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'protectedEquipment',
    'reliefScenarios',
    'reliefDevice',
    'setPressure',
    'reliefRate',
    'disposalSystem',
    'flareSystem',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Protected["Protected Equipment"]
        VL["Vessel\\nMWP: 10 bar"]
        PSV["PSV-101\\nSet: 9.5 bar"]
    end
    subgraph Header["Relief Header"]
        RH["Relief\\nHeader"]
        KOD["KO Drum"]
    end
    subgraph Disposal["Disposal"]
        FL["Flare\\nStack"]
    end
    VL --> PSV --> RH --> KOD --> FL
    style PSV fill:#dc2626,color:#fff
    style FL fill:#f59e0b,color:#fff`,
};

/**
 * Layer of Protection Analysis template
 */
export const lopaAnalysis: DiagramTemplate = {
  id: 'chem-lopa',
  name: 'LOPA Analysis Diagram',
  description: 'Layer of Protection Analysis for safety system design',
  domain: 'engineering',
  promptTemplate: `Create a LOPA analysis diagram:
- Initiating event: {{initiatingEvent}}
- Initiating event frequency: {{eventFrequency}}
- Protection layers: {{protectionLayers}}
- PFD values: {{pfdValues}}
- Target frequency: {{targetFrequency}}
- SIL requirement: {{silRequirement}}
- Gap analysis: {{gapAnalysis}}
{{#additionalNotes}}Risk reduction: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'initiatingEvent',
    'eventFrequency',
    'protectionLayers',
    'pfdValues',
    'targetFrequency',
    'silRequirement',
    'gapAnalysis',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Event["Initiating Event"]
        IE["Pump Seal Failure\\n0.1/year"]
    end
    subgraph Layers["Protection Layers"]
        L1["BPCS Alarm\\nPFD = 0.1"]
        L2["Operator Response\\nPFD = 0.1"]
        L3["SIS Trip\\nPFD = 0.01"]
        L4["Relief Valve\\nPFD = 0.01"]
    end
    subgraph Result["Mitigated Frequency"]
        MF["1E-6/year"]
    end
    IE --> L1 --> L2 --> L3 --> L4 --> MF
    style L3 fill:#10b981,color:#fff
    style L4 fill:#3b82f6,color:#fff`,
};

// =============================================================================
// MATERIAL HANDLING
// =============================================================================

/**
 * Pump System Design template
 */
export const pumpSystemDesign: DiagramTemplate = {
  id: 'chem-pump-system',
  name: 'Pump System Design',
  description: 'Centrifugal or positive displacement pump system design',
  domain: 'engineering',
  promptTemplate: `Create a pump system design diagram:
- Pump type: {{pumpType}}
- Flow rate: {{flowRate}}
- Total head: {{totalHead}}
- NPSH available: {{npshAvailable}}
- Fluid properties: {{fluidProperties}}
- Driver type: {{driverType}}
- Control scheme: {{controlScheme}}
{{#additionalNotes}}Pump specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'pumpType',
    'flowRate',
    'totalHead',
    'npshAvailable',
    'fluidProperties',
    'driverType',
    'controlScheme',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Suction["Suction Side"]
        TK["Suction\\nTank"]
        SV["Suction\\nValve"]
        ST["Strainer"]
    end
    subgraph Pump["Pump Station"]
        PP["Centrifugal\\nPump"]
        MT["Motor"]
    end
    subgraph Discharge["Discharge Side"]
        CV["Check\\nValve"]
        DV["Discharge\\nValve"]
    end
    TK --> SV --> ST --> PP
    MT --> PP
    PP --> CV --> DV
    style PP fill:#3b82f6,color:#fff
    style MT fill:#6b7280,color:#fff`,
};

/**
 * Compressor System template
 */
export const compressorSystem: DiagramTemplate = {
  id: 'chem-compressor',
  name: 'Compressor System Design',
  description: 'Gas compressor system with auxiliaries',
  domain: 'engineering',
  promptTemplate: `Create a compressor system design diagram:
- Compressor type: {{compressorType}}
- Gas composition: {{gasComposition}}
- Suction conditions: {{suctionConditions}}
- Discharge conditions: {{dischargeConditions}}
- Number of stages: {{stages}}
- Intercooling: {{intercooling}}
- Anti-surge system: {{antiSurge}}
{{#additionalNotes}}Compressor specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'compressorType',
    'gasComposition',
    'suctionConditions',
    'dischargeConditions',
    'stages',
    'intercooling',
    'antiSurge',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Stage1["Stage 1"]
        S1["Suction\\nDrum"]
        C1["1st Stage\\nCompressor"]
        IC1["Intercooler"]
    end
    subgraph Stage2["Stage 2"]
        S2["Interstage\\nDrum"]
        C2["2nd Stage\\nCompressor"]
        AC["Aftercooler"]
    end
    SI["Suction\\n1 bar"] --> S1 --> C1 --> IC1 --> S2 --> C2 --> AC --> DO["Discharge\\n10 bar"]
    style C1 fill:#3b82f6,color:#fff
    style C2 fill:#3b82f6,color:#fff
    style IC1 fill:#0891b2,color:#fff`,
};

// =============================================================================
// Export all templates
// =============================================================================

export const chemicalTemplates: DiagramTemplate[] = [
  // Process Flow Design
  processFlowDiagram,
  pipingInstrumentationDiagram,
  blockFlowDiagram,
  // Reaction Engineering
  reactorDesign,
  reactionKinetics,
  // Separation Processes
  distillationColumnDesign,
  absorptionColumn,
  extractionProcess,
  filtrationSystem,
  // Heat Transfer
  heatExchangerDesign,
  firedHeaterDesign,
  coolingTowerDesign,
  // Process Control
  controlLoopDesign,
  cascadeControl,
  // Safety and Hazard Analysis
  hazopAnalysis,
  reliefSystemDesign,
  lopaAnalysis,
  // Material Handling
  pumpSystemDesign,
  compressorSystem,
];
