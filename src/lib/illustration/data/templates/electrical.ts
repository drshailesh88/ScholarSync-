/**
 * electrical.ts
 * Electrical Engineering diagram templates for FINNISH
 *
 * Contains comprehensive templates for electrical engineering including:
 * - Circuit analysis and design
 * - Power systems
 * - Signal processing
 * - Control systems
 * - Electronics design
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// CIRCUIT ANALYSIS
// =============================================================================

/**
 * Circuit Schematic template
 */
export const circuitSchematic: DiagramTemplate = {
  id: 'elec-circuit-schematic',
  name: 'Circuit Schematic Diagram',
  description: 'Electronic circuit schematic with components and connections',
  domain: 'engineering',
  promptTemplate: `Create a circuit schematic diagram:
- Circuit type: {{circuitType}}
- Components: {{components}}
- Power supply: {{powerSupply}}
- Input signals: {{inputs}}
- Output signals: {{outputs}}
- Ground connections: {{grounds}}
- Component values: {{componentValues}}
{{#additionalNotes}}Additional specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'circuitType',
    'components',
    'powerSupply',
    'inputs',
    'outputs',
    'grounds',
    'componentValues',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Power["Power Supply"]
        VCC["+5V"]
        GND["GND"]
    end
    subgraph Input["Input Stage"]
        R1["R1\\n10k"]
        C1["C1\\n100nF"]
    end
    subgraph Amplifier["Amplification"]
        U1["Op-Amp\\nLM741"]
        R2["R2\\n100k"]
    end
    subgraph Output["Output"]
        Vout["Vout"]
    end
    VCC --> U1
    GND --> U1
    R1 --> C1 --> U1
    U1 --> R2 --> Vout
    style VCC fill:#dc2626,color:#fff
    style GND fill:#000,color:#fff`,
};

/**
 * Power Supply Design template
 */
export const powerSupplyDesign: DiagramTemplate = {
  id: 'elec-power-supply',
  name: 'Power Supply Design',
  description: 'DC power supply design with rectification, filtering, and regulation',
  domain: 'engineering',
  promptTemplate: `Create a power supply design diagram:
- Input voltage: {{inputVoltage}}
- Output voltage: {{outputVoltage}}
- Output current: {{outputCurrent}}
- Rectifier type: {{rectifierType}}
- Filter design: {{filterDesign}}
- Regulation method: {{regulation}}
- Protection circuits: {{protection}}
{{#additionalNotes}}Design requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'inputVoltage',
    'outputVoltage',
    'outputCurrent',
    'rectifierType',
    'filterDesign',
    'regulation',
    'protection',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    AC["AC Input\\n120V"] --> TR["Transformer"]
    TR --> BR["Bridge\\nRectifier"]
    BR --> FC["Filter\\nCapacitor"]
    FC --> REG["Voltage\\nRegulator"]
    REG --> OUT["DC Output\\n5V"]
    subgraph Protection
        F["Fuse"]
        TVS["TVS Diode"]
    end
    style AC fill:#fbbf24,color:#000
    style OUT fill:#22c55e,color:#fff`,
};

/**
 * Op-Amp Circuit Analysis template
 */
export const opAmpAnalysis: DiagramTemplate = {
  id: 'elec-opamp-analysis',
  name: 'Op-Amp Circuit Analysis',
  description: 'Operational amplifier circuit configurations and analysis',
  domain: 'engineering',
  promptTemplate: `Create an op-amp circuit analysis:
- Configuration: {{configuration}}
- Gain calculation: {{gainCalculation}}
- Input impedance: {{inputImpedance}}
- Output impedance: {{outputImpedance}}
- Bandwidth: {{bandwidth}}
- Slew rate: {{slewRate}}
- DC offset: {{dcOffset}}
{{#additionalNotes}}Analysis notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'configuration',
    'gainCalculation',
    'inputImpedance',
    'outputImpedance',
    'bandwidth',
    'slewRate',
    'dcOffset',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Config["Inverting Amplifier"]
        Vin["Vin"] --> R1["Rf"]
        R1 --> NEG["-"]
        NEG --> AMP["Op-Amp"]
        AMP --> Vout["Vout"]
        Vout --> R2["Ri"]
        R2 --> NEG
        GND["GND"] --> POS["+"]
        POS --> AMP
    end
    subgraph Equations["Gain = -Rf/Ri"]
        EQ["Av = -Rf/Ri"]
    end`,
};

/**
 * Filter Design template
 */
export const filterDesign: DiagramTemplate = {
  id: 'elec-filter-design',
  name: 'Filter Design',
  description: 'Active and passive filter design with frequency response',
  domain: 'engineering',
  promptTemplate: `Create a filter design diagram:
- Filter type: {{filterType}}
- Cutoff frequency: {{cutoffFrequency}}
- Order: {{order}}
- Topology: {{topology}}
- Component values: {{componentValues}}
- Frequency response: {{frequencyResponse}}
- Phase response: {{phaseResponse}}
{{#additionalNotes}}Design specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'filterType',
    'cutoffFrequency',
    'order',
    'topology',
    'componentValues',
    'frequencyResponse',
    'phaseResponse',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Input
        Vin["Vin"]
    end
    subgraph LPF["Low-Pass Filter"]
        R1["R = 1k"]
        C1["C = 159nF"]
    end
    subgraph Output
        Vout["Vout"]
    end
    Vin --> R1 --> C1 --> GND["GND"]
    R1 --> Vout
    subgraph Response["fc = 1kHz"]
        FR["-3dB @ fc"]
    end`,
};

// =============================================================================
// POWER SYSTEMS
// =============================================================================

/**
 * Three-Phase Power System template
 */
export const threePhaseSystem: DiagramTemplate = {
  id: 'elec-three-phase',
  name: 'Three-Phase Power System',
  description: 'Three-phase electrical power distribution system diagram',
  domain: 'engineering',
  promptTemplate: `Create a three-phase power system diagram:
- Configuration: {{configuration}}
- Voltage levels: {{voltageLevels}}
- Load type: {{loadType}}
- Transformer connections: {{transformerConnections}}
- Power factor: {{powerFactor}}
- Protection devices: {{protection}}
- Metering: {{metering}}
{{#additionalNotes}}System requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'configuration',
    'voltageLevels',
    'loadType',
    'transformerConnections',
    'powerFactor',
    'protection',
    'metering',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Source["Generation"]
        GEN["Generator\\n13.8kV"]
    end
    subgraph Transmission["Transmission"]
        TR1["Step-up\\nTransformer"]
        LINE["Transmission\\nLine 138kV"]
        TR2["Step-down\\nTransformer"]
    end
    subgraph Distribution["Distribution"]
        BUS["Distribution\\nBus 13.8kV"]
        L1["Load 1"]
        L2["Load 2"]
        L3["Load 3"]
    end
    GEN --> TR1 --> LINE --> TR2 --> BUS
    BUS --> L1 & L2 & L3`,
};

/**
 * Motor Control Circuit template
 */
export const motorControlCircuit: DiagramTemplate = {
  id: 'elec-motor-control',
  name: 'Motor Control Circuit',
  description: 'Electric motor control circuit with protection and starting methods',
  domain: 'engineering',
  promptTemplate: `Create a motor control circuit:
- Motor type: {{motorType}}
- Starting method: {{startingMethod}}
- Protection devices: {{protection}}
- Control logic: {{controlLogic}}
- Interlocks: {{interlocks}}
- Indicators: {{indicators}}
- Emergency stop: {{emergencyStop}}
{{#additionalNotes}}Control requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'motorType',
    'startingMethod',
    'protection',
    'controlLogic',
    'interlocks',
    'indicators',
    'emergencyStop',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Power["Power Circuit"]
        L1["L1"] & L2["L2"] & L3["L3"]
        CB["Circuit\\nBreaker"]
        OL["Overload\\nRelay"]
        M["Motor"]
    end
    subgraph Control["Control Circuit"]
        START["Start\\nButton"]
        STOP["Stop\\nButton"]
        K1["Contactor\\nK1"]
    end
    L1 & L2 & L3 --> CB --> OL --> M
    START --> K1
    STOP --> K1
    K1 --> CB`,
};

/**
 * Transformer Design template
 */
export const transformerDesign: DiagramTemplate = {
  id: 'elec-transformer-design',
  name: 'Transformer Design',
  description: 'Power transformer design with specifications and connections',
  domain: 'engineering',
  promptTemplate: `Create a transformer design diagram:
- Rated power: {{ratedPower}}
- Primary voltage: {{primaryVoltage}}
- Secondary voltage: {{secondaryVoltage}}
- Connection type: {{connectionType}}
- Cooling method: {{coolingMethod}}
- Impedance: {{impedance}}
- Efficiency: {{efficiency}}
{{#additionalNotes}}Design considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ratedPower',
    'primaryVoltage',
    'secondaryVoltage',
    'connectionType',
    'coolingMethod',
    'impedance',
    'efficiency',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Primary["Primary Side"]
        H1["H1"] & H2["H2"] & H3["H3"]
        PW["Primary\\nWinding"]
    end
    subgraph Core["Iron Core"]
        CORE["Laminated\\nCore"]
    end
    subgraph Secondary["Secondary Side"]
        SW["Secondary\\nWinding"]
        X1["X1"] & X2["X2"] & X3["X3"]
    end
    H1 & H2 & H3 --> PW --> CORE --> SW --> X1 & X2 & X3`,
};

// =============================================================================
// SIGNAL PROCESSING
// =============================================================================

/**
 * Signal Flow Diagram template
 */
export const signalFlowDiagram: DiagramTemplate = {
  id: 'elec-signal-flow',
  name: 'Signal Flow Diagram',
  description: 'Signal processing chain with transformations and operations',
  domain: 'engineering',
  promptTemplate: `Create a signal flow diagram:
- Input signal: {{inputSignal}}
- Processing stages: {{processingStages}}
- Transformations: {{transformations}}
- Sampling rate: {{samplingRate}}
- Bit depth: {{bitDepth}}
- Output signal: {{outputSignal}}
{{#additionalNotes}}Signal specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'inputSignal',
    'processingStages',
    'transformations',
    'samplingRate',
    'bitDepth',
    'outputSignal',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    IN["Analog\\nInput"] --> AAF["Anti-Alias\\nFilter"]
    AAF --> ADC["ADC\\n16-bit"]
    ADC --> DSP["DSP\\nProcessing"]
    DSP --> DAC["DAC"]
    DAC --> LPF["Reconstruction\\nFilter"]
    LPF --> OUT["Analog\\nOutput"]
    style DSP fill:#3b82f6,color:#fff`,
};

/**
 * ADC/DAC System template
 */
export const adcDacSystem: DiagramTemplate = {
  id: 'elec-adc-dac',
  name: 'ADC/DAC System Design',
  description: 'Analog-to-digital and digital-to-analog conversion system',
  domain: 'engineering',
  promptTemplate: `Create an ADC/DAC system diagram:
- ADC type: {{adcType}}
- Resolution: {{resolution}}
- Sampling rate: {{samplingRate}}
- Reference voltage: {{referenceVoltage}}
- Input range: {{inputRange}}
- Output interface: {{outputInterface}}
- Clock source: {{clockSource}}
{{#additionalNotes}}System requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'adcType',
    'resolution',
    'samplingRate',
    'referenceVoltage',
    'inputRange',
    'outputInterface',
    'clockSource',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Analog["Analog Front-End"]
        AIN["Analog In"]
        BUF["Buffer"]
        PGA["PGA"]
        SHA["S/H"]
    end
    subgraph Conversion["ADC Core"]
        ADC["SAR ADC\\n12-bit"]
        REF["Voltage\\nReference"]
        CLK["Clock\\nGenerator"]
    end
    subgraph Digital["Digital Interface"]
        REG["Output\\nRegister"]
        SPI["SPI\\nInterface"]
    end
    AIN --> BUF --> PGA --> SHA --> ADC
    REF --> ADC
    CLK --> ADC --> REG --> SPI`,
};

/**
 * PLL Design template
 */
export const pllDesign: DiagramTemplate = {
  id: 'elec-pll-design',
  name: 'PLL Design',
  description: 'Phase-locked loop circuit design and analysis',
  domain: 'engineering',
  promptTemplate: `Create a PLL design diagram:
- Reference frequency: {{referenceFrequency}}
- Output frequency: {{outputFrequency}}
- Loop bandwidth: {{loopBandwidth}}
- Phase detector type: {{phaseDetector}}
- VCO specifications: {{vcoSpecs}}
- Loop filter: {{loopFilter}}
- Lock time: {{lockTime}}
{{#additionalNotes}}Design parameters: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'referenceFrequency',
    'outputFrequency',
    'loopBandwidth',
    'phaseDetector',
    'vcoSpecs',
    'loopFilter',
    'lockTime',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    REF["Reference\\nClock"] --> PFD["Phase\\nFrequency\\nDetector"]
    PFD --> CP["Charge\\nPump"]
    CP --> LF["Loop\\nFilter"]
    LF --> VCO["VCO"]
    VCO --> OUT["Output\\nClock"]
    VCO --> DIV["Frequency\\nDivider"]
    DIV --> PFD
    style VCO fill:#22c55e,color:#fff`,
};

// =============================================================================
// CONTROL SYSTEMS
// =============================================================================

/**
 * Control System Block Diagram template
 */
export const controlSystemBlock: DiagramTemplate = {
  id: 'elec-control-block',
  name: 'Control System Block Diagram',
  description: 'Feedback control system with transfer functions',
  domain: 'engineering',
  promptTemplate: `Create a control system block diagram:
- Controller type: {{controllerType}}
- Plant model: {{plantModel}}
- Feedback sensor: {{feedbackSensor}}
- Reference input: {{referenceInput}}
- Disturbances: {{disturbances}}
- Transfer functions: {{transferFunctions}}
- Stability criteria: {{stabilityCriteria}}
{{#additionalNotes}}Control requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'controllerType',
    'plantModel',
    'feedbackSensor',
    'referenceInput',
    'disturbances',
    'transferFunctions',
    'stabilityCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    R["R(s)\\nReference"] --> SUM(("+"))
    SUM --> C["G(s)\\nController"]
    C --> P["H(s)\\nPlant"]
    P --> Y["Y(s)\\nOutput"]
    Y --> F["F(s)\\nSensor"]
    F --> SUM
    D["D(s)\\nDisturbance"] --> P
    style SUM fill:#fbbf24,color:#000`,
};

/**
 * PID Controller Tuning template
 */
export const pidTuning: DiagramTemplate = {
  id: 'elec-pid-tuning',
  name: 'PID Controller Tuning',
  description: 'PID controller design with tuning parameters',
  domain: 'engineering',
  promptTemplate: `Create a PID tuning diagram:
- Process characteristics: {{processCharacteristics}}
- Kp (proportional gain): {{kp}}
- Ki (integral gain): {{ki}}
- Kd (derivative gain): {{kd}}
- Tuning method: {{tuningMethod}}
- Response criteria: {{responseCriteria}}
- Anti-windup: {{antiWindup}}
{{#additionalNotes}}Tuning considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'processCharacteristics',
    'kp',
    'ki',
    'kd',
    'tuningMethod',
    'responseCriteria',
    'antiWindup',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph PID["PID Controller"]
        E["Error\\ne(t)"]
        P["Kp"]
        I["Ki/s"]
        D["Kd*s"]
        SUM(("+"))
    end
    E --> P --> SUM
    E --> I --> SUM
    E --> D --> SUM
    SUM --> U["Control\\nOutput u(t)"]
    subgraph Response["Step Response"]
        SR["Rise Time, Overshoot,\\nSettling Time"]
    end`,
};

/**
 * Bode Plot Analysis template
 */
export const bodePlotAnalysis: DiagramTemplate = {
  id: 'elec-bode-plot',
  name: 'Bode Plot Analysis',
  description: 'Frequency response analysis with Bode magnitude and phase plots',
  domain: 'engineering',
  promptTemplate: `Create a Bode plot analysis:
- Transfer function: {{transferFunction}}
- Frequency range: {{frequencyRange}}
- Gain margin: {{gainMargin}}
- Phase margin: {{phaseMargin}}
- Crossover frequencies: {{crossoverFrequencies}}
- Poles and zeros: {{polesZeros}}
{{#additionalNotes}}Analysis notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'transferFunction',
    'frequencyRange',
    'gainMargin',
    'phaseMargin',
    'crossoverFrequencies',
    'polesZeros',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Magnitude["Magnitude Plot"]
        M1["0dB line"]
        M2["Gain curve"]
        M3["Crossover: wgc"]
    end
    subgraph Phase["Phase Plot"]
        P1["-180° line"]
        P2["Phase curve"]
        P3["Phase margin"]
    end
    subgraph Stability["Stability"]
        S1["GM > 6dB"]
        S2["PM > 45°"]
    end`,
};

// =============================================================================
// DIGITAL ELECTRONICS
// =============================================================================

/**
 * Digital Logic Circuit template
 */
export const digitalLogicCircuit: DiagramTemplate = {
  id: 'elec-digital-logic',
  name: 'Digital Logic Circuit',
  description: 'Combinational and sequential digital logic circuit design',
  domain: 'engineering',
  promptTemplate: `Create a digital logic circuit:
- Function: {{function}}
- Logic family: {{logicFamily}}
- Gates used: {{gates}}
- Truth table: {{truthTable}}
- Timing diagrams: {{timingDiagrams}}
- Propagation delay: {{propagationDelay}}
{{#additionalNotes}}Design constraints: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'function',
    'logicFamily',
    'gates',
    'truthTable',
    'timingDiagrams',
    'propagationDelay',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    A["A"] --> AND1["AND"]
    B["B"] --> AND1
    AND1 --> OR1["OR"]
    C["C"] --> NOT1["NOT"]
    NOT1 --> AND2["AND"]
    B --> AND2
    AND2 --> OR1
    OR1 --> Y["Y"]
    subgraph Equation
        EQ["Y = AB + B'C"]
    end`,
};

/**
 * State Machine Design template
 */
export const stateMachineDesign: DiagramTemplate = {
  id: 'elec-state-machine',
  name: 'Finite State Machine Design',
  description: 'FSM design with states, transitions, and outputs',
  domain: 'engineering',
  promptTemplate: `Create a state machine design:
- FSM type: {{fsmType}}
- States: {{states}}
- Inputs: {{inputs}}
- Outputs: {{outputs}}
- State encoding: {{stateEncoding}}
- Transitions: {{transitions}}
- Reset behavior: {{resetBehavior}}
{{#additionalNotes}}Design requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'fsmType',
    'states',
    'inputs',
    'outputs',
    'stateEncoding',
    'transitions',
    'resetBehavior',
    'additionalNotes',
  ],
  mermaidExample: `stateDiagram-v2
    [*] --> IDLE
    IDLE --> RUNNING : start
    RUNNING --> PAUSED : pause
    PAUSED --> RUNNING : resume
    RUNNING --> IDLE : stop
    PAUSED --> IDLE : stop
    RUNNING --> ERROR : fault
    ERROR --> IDLE : reset`,
};

/**
 * Timing Diagram template
 */
export const timingDiagram: DiagramTemplate = {
  id: 'elec-timing-diagram',
  name: 'Timing Diagram',
  description: 'Digital signal timing diagram with setup and hold times',
  domain: 'engineering',
  promptTemplate: `Create a timing diagram:
- Clock signal: {{clockSignal}}
- Data signals: {{dataSignals}}
- Setup time: {{setupTime}}
- Hold time: {{holdTime}}
- Propagation delay: {{propagationDelay}}
- Timing constraints: {{timingConstraints}}
{{#additionalNotes}}Timing analysis: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'clockSignal',
    'dataSignals',
    'setupTime',
    'holdTime',
    'propagationDelay',
    'timingConstraints',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Timing["Signal Timing"]
        CLK["CLK: Rising edge trigger"]
        D["D: Data input"]
        Q["Q: Output"]
    end
    subgraph Constraints["Timing Constraints"]
        TSU["tsu: Setup time"]
        TH["th: Hold time"]
        TCQ["tcq: Clock-to-Q delay"]
    end`,
};

// =============================================================================
// PCB DESIGN
// =============================================================================

/**
 * PCB Layer Stack template
 */
export const pcbLayerStack: DiagramTemplate = {
  id: 'elec-pcb-stack',
  name: 'PCB Layer Stack',
  description: 'Printed circuit board layer stackup design',
  domain: 'engineering',
  promptTemplate: `Create a PCB layer stack diagram:
- Number of layers: {{numLayers}}
- Layer functions: {{layerFunctions}}
- Material: {{material}}
- Thickness: {{thickness}}
- Copper weight: {{copperWeight}}
- Impedance control: {{impedanceControl}}
{{#additionalNotes}}Stack requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'numLayers',
    'layerFunctions',
    'material',
    'thickness',
    'copperWeight',
    'impedanceControl',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    L1["L1: Top Signal"]
    L2["L2: Ground Plane"]
    L3["L3: Power Plane"]
    L4["L4: Bottom Signal"]
    L1 --> D1["Prepreg"]
    D1 --> L2
    L2 --> C1["Core"]
    C1 --> L3
    L3 --> D2["Prepreg"]
    D2 --> L4
    style L2 fill:#22c55e,color:#fff
    style L3 fill:#dc2626,color:#fff`,
};

/**
 * EMC Design template
 */
export const emcDesign: DiagramTemplate = {
  id: 'elec-emc-design',
  name: 'EMC Design Guidelines',
  description: 'Electromagnetic compatibility design and shielding',
  domain: 'engineering',
  promptTemplate: `Create an EMC design diagram:
- EMI sources: {{emiSources}}
- Susceptible circuits: {{susceptibleCircuits}}
- Shielding: {{shielding}}
- Filtering: {{filtering}}
- Grounding: {{grounding}}
- PCB layout: {{pcbLayout}}
{{#additionalNotes}}EMC requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'emiSources',
    'susceptibleCircuits',
    'shielding',
    'filtering',
    'grounding',
    'pcbLayout',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Source["EMI Source"]
        SW["Switching\\nCircuit"]
    end
    subgraph Protection["EMC Protection"]
        FILT["EMI\\nFilter"]
        SHIELD["Shield"]
        GND["Ground\\nPlane"]
    end
    subgraph Sensitive["Sensitive Circuit"]
        AMP["Low-noise\\nAmplifier"]
    end
    SW --> FILT --> SHIELD --> AMP
    GND --> SHIELD
    style SHIELD fill:#6b7280,color:#fff`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All electrical engineering templates
 */
export const electricalTemplates: DiagramTemplate[] = [
  // Circuit Analysis
  circuitSchematic,
  powerSupplyDesign,
  opAmpAnalysis,
  filterDesign,
  // Power Systems
  threePhaseSystem,
  motorControlCircuit,
  transformerDesign,
  // Signal Processing
  signalFlowDiagram,
  adcDacSystem,
  pllDesign,
  // Control Systems
  controlSystemBlock,
  pidTuning,
  bodePlotAnalysis,
  // Digital Electronics
  digitalLogicCircuit,
  stateMachineDesign,
  timingDiagram,
  // PCB Design
  pcbLayerStack,
  emcDesign,
];

export default electricalTemplates;
