/**
 * thermodynamics.ts
 * Thermodynamics diagram templates for FINNISH
 *
 * Contains comprehensive templates for thermodynamics including:
 * - Heat engine cycles
 * - PV and TS diagrams
 * - Phase diagrams
 * - Heat transfer systems
 * - Statistical mechanics
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// HEAT ENGINE TEMPLATES
// =============================================================================

/**
 * Carnot Cycle template
 */
export const carnotCycle: DiagramTemplate = {
  id: 'thermo-carnot-cycle',
  name: 'Carnot Cycle',
  description: 'Ideal reversible heat engine cycle with maximum efficiency',
  domain: 'physics',
  promptTemplate: `Create a Carnot cycle diagram:
- Hot reservoir temperature: {{hotTemp}}
- Cold reservoir temperature: {{coldTemp}}
- Working substance: {{workingSubstance}}
- Efficiency calculation: {{efficiency}}
- Work output: {{workOutput}}
- Heat transferred: {{heatTransferred}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'hotTemp',
    'coldTemp',
    'workingSubstance',
    'efficiency',
    'workOutput',
    'heatTransferred',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Cycle["Carnot Cycle"]
        A["1: Isothermal Expansion"]
        B["2: Adiabatic Expansion"]
        C["3: Isothermal Compression"]
        D["4: Adiabatic Compression"]
    end
    A -->|"Q_H absorbed"| B
    B -->|"T drops"| C
    C -->|"Q_C released"| D
    D -->|"T rises"| A
    style A fill:#EF4444
    style C fill:#3B82F6`,
};

/**
 * Otto Cycle template
 */
export const ottoCycle: DiagramTemplate = {
  id: 'thermo-otto-cycle',
  name: 'Otto Cycle',
  description: 'Spark-ignition internal combustion engine cycle',
  domain: 'physics',
  promptTemplate: `Create an Otto cycle diagram:
- Compression ratio: {{compressionRatio}}
- Heat addition: {{heatAddition}}
- Working fluid: {{workingFluid}}
- Thermal efficiency: {{thermalEfficiency}}
- Power stroke: {{powerStroke}}
- Exhaust stroke: {{exhaustStroke}}
{{#additionalNotes}}Engine specs: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'compressionRatio',
    'heatAddition',
    'workingFluid',
    'thermalEfficiency',
    'powerStroke',
    'exhaustStroke',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Otto["Otto Cycle"]
        A["1→2: Adiabatic Compression"]
        B["2→3: Isochoric Heat Addition"]
        C["3→4: Adiabatic Expansion"]
        D["4→1: Isochoric Heat Rejection"]
    end
    A --> B --> C --> D --> A`,
};

/**
 * Refrigeration Cycle template
 */
export const refrigerationCycle: DiagramTemplate = {
  id: 'thermo-refrigeration',
  name: 'Refrigeration Cycle',
  description: 'Vapor-compression refrigeration with COP analysis',
  domain: 'physics',
  promptTemplate: `Create a refrigeration cycle diagram:
- Refrigerant type: {{refrigerantType}}
- Evaporator temperature: {{evaporatorTemp}}
- Condenser temperature: {{condenserTemp}}
- Coefficient of performance: {{cop}}
- Compressor work: {{compressorWork}}
- Cooling capacity: {{coolingCapacity}}
{{#additionalNotes}}System details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'refrigerantType',
    'evaporatorTemp',
    'condenserTemp',
    'cop',
    'compressorWork',
    'coolingCapacity',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Components["Refrigeration Cycle"]
        E["Evaporator"]
        C["Compressor"]
        CO["Condenser"]
        V["Expansion Valve"]
    end
    E -->|"Low P vapor"| C
    C -->|"High P vapor"| CO
    CO -->|"High P liquid"| V
    V -->|"Low P liquid"| E`,
};

// =============================================================================
// PV AND TS DIAGRAM TEMPLATES
// =============================================================================

/**
 * PV Diagram template
 */
export const pvDiagram: DiagramTemplate = {
  id: 'thermo-pv-diagram',
  name: 'Pressure-Volume Diagram',
  description: 'PV diagram showing thermodynamic processes and work',
  domain: 'physics',
  promptTemplate: `Create a PV diagram:
- Process type: {{processType}}
- Initial state: {{initialState}}
- Final state: {{finalState}}
- Work done: {{workDone}}
- Isotherms shown: {{isotherms}}
- Adiabats shown: {{adiabats}}
{{#additionalNotes}}Process details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'processType',
    'initialState',
    'finalState',
    'workDone',
    'isotherms',
    'adiabats',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph PV["P-V Diagram"]
        A["State A (P₁, V₁)"]
        B["State B (P₂, V₂)"]
    end
    subgraph Work["Work = ∫PdV"]
        W["Area under curve"]
    end
    A -->|"Process"| B
    B --> W`,
};

/**
 * TS Diagram template
 */
export const tsDiagram: DiagramTemplate = {
  id: 'thermo-ts-diagram',
  name: 'Temperature-Entropy Diagram',
  description: 'TS diagram showing heat transfer and entropy changes',
  domain: 'physics',
  promptTemplate: `Create a TS diagram:
- Cycle type: {{cycleType}}
- Heat input: {{heatInput}}
- Heat rejection: {{heatRejection}}
- Entropy production: {{entropyProduction}}
- Reversibility: {{reversibility}}
- Work from cycle: {{workFromCycle}}
{{#additionalNotes}}Thermodynamic notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'cycleType',
    'heatInput',
    'heatRejection',
    'entropyProduction',
    'reversibility',
    'workFromCycle',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph TS["T-S Diagram"]
        H["High T isotherm"]
        L["Low T isotherm"]
    end
    subgraph Heat["Q = ∫TdS"]
        Q["Area = Net Heat"]
    end
    H --> Q --> L`,
};

/**
 * Process Comparison template
 */
export const processComparison: DiagramTemplate = {
  id: 'thermo-process-comparison',
  name: 'Thermodynamic Process Comparison',
  description: 'Compare isothermal, adiabatic, isobaric, and isochoric processes',
  domain: 'physics',
  promptTemplate: `Create a process comparison diagram:
- Processes to compare: {{processesToCompare}}
- Same initial state: {{initialState}}
- Work comparison: {{workComparison}}
- Heat comparison: {{heatComparison}}
- Final states: {{finalStates}}
- Equations of state: {{equationsOfState}}
{{#additionalNotes}}Comparison notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'processesToCompare',
    'initialState',
    'workComparison',
    'heatComparison',
    'finalStates',
    'equationsOfState',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Start["Initial (P₁,V₁,T₁)"]
        I["State 1"]
    end
    subgraph Paths["Processes"]
        ISO["Isothermal: PV=const"]
        AD["Adiabatic: PVᵞ=const"]
        IB["Isobaric: P=const"]
        IC["Isochoric: V=const"]
    end
    I --> ISO
    I --> AD
    I --> IB
    I --> IC`,
};

// =============================================================================
// PHASE DIAGRAM TEMPLATES
// =============================================================================

/**
 * Phase Diagram template
 */
export const phaseDiagram: DiagramTemplate = {
  id: 'thermo-phase-diagram',
  name: 'Phase Diagram',
  description: 'PT phase diagram with triple point and critical point',
  domain: 'physics',
  promptTemplate: `Create a phase diagram:
- Substance: {{substance}}
- Triple point: {{triplePoint}}
- Critical point: {{criticalPoint}}
- Phase boundaries: {{phaseBoundaries}}
- Sublimation curve: {{sublimationCurve}}
- Vaporization curve: {{vaporizationCurve}}
{{#additionalNotes}}Phase behavior notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'substance',
    'triplePoint',
    'criticalPoint',
    'phaseBoundaries',
    'sublimationCurve',
    'vaporizationCurve',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph PT["P-T Phase Diagram"]
        S["Solid"]
        L["Liquid"]
        G["Gas"]
        TP["Triple Point"]
        CP["Critical Point"]
    end
    S -->|"Melting"| L
    L -->|"Vaporization"| G
    S -->|"Sublimation"| G
    TP --- S & L & G
    L --- CP --- G`,
};

/**
 * Van der Waals Isotherm template
 */
export const vanDerWaals: DiagramTemplate = {
  id: 'thermo-van-der-waals',
  name: 'Van der Waals Isotherms',
  description: 'Real gas behavior with liquid-vapor coexistence',
  domain: 'physics',
  promptTemplate: `Create a Van der Waals isotherm diagram:
- Temperature range: {{temperatureRange}}
- Critical isotherm: {{criticalIsotherm}}
- Maxwell construction: {{maxwellConstruction}}
- Coexistence region: {{coexistenceRegion}}
- VdW parameters: {{vdwParameters}}
- Compressibility factor: {{compressibilityFactor}}
{{#additionalNotes}}Real gas notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'temperatureRange',
    'criticalIsotherm',
    'maxwellConstruction',
    'coexistenceRegion',
    'vdwParameters',
    'compressibilityFactor',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph PV["P-V Diagram"]
        TC["T > Tc: monotonic"]
        TCC["T = Tc: inflection"]
        TL["T < Tc: loop"]
    end
    subgraph Maxwell["Maxwell Construction"]
        M["Equal areas"]
    end
    TL --> M`,
};

/**
 * Clausius-Clapeyron template
 */
export const clausiusClapeyron: DiagramTemplate = {
  id: 'thermo-clausius-clapeyron',
  name: 'Clausius-Clapeyron Relation',
  description: 'Phase boundary slope and latent heat relationship',
  domain: 'physics',
  promptTemplate: `Create a Clausius-Clapeyron diagram:
- Phase transition: {{phaseTransition}}
- Latent heat: {{latentHeat}}
- Volume change: {{volumeChange}}
- Slope dP/dT: {{slope}}
- Temperature range: {{temperatureRange}}
- Vapor pressure equation: {{vaporPressure}}
{{#additionalNotes}}Derivation notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'phaseTransition',
    'latentHeat',
    'volumeChange',
    'slope',
    'temperatureRange',
    'vaporPressure',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Equation["dP/dT = L/(TΔV)"]
        L["Latent Heat L"]
        DV["Volume Change ΔV"]
    end
    subgraph Curve["Phase Boundary"]
        C["P(T) curve"]
    end
    L --> C
    DV --> C`,
};

// =============================================================================
// HEAT TRANSFER TEMPLATES
// =============================================================================

/**
 * Heat Conduction template
 */
export const heatConduction: DiagramTemplate = {
  id: 'thermo-heat-conduction',
  name: 'Heat Conduction',
  description: 'Fourier law heat conduction through materials',
  domain: 'physics',
  promptTemplate: `Create a heat conduction diagram:
- Material layers: {{materialLayers}}
- Thermal conductivities: {{thermalConductivities}}
- Temperature gradient: {{temperatureGradient}}
- Heat flux: {{heatFlux}}
- Thermal resistance: {{thermalResistance}}
- Boundary conditions: {{boundaryConditions}}
{{#additionalNotes}}Steady state notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'materialLayers',
    'thermalConductivities',
    'temperatureGradient',
    'heatFlux',
    'thermalResistance',
    'boundaryConditions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Hot["T_hot"]
        H["Heat Source"]
    end
    subgraph Wall["Conducting Wall"]
        W["k, thickness L"]
    end
    subgraph Cold["T_cold"]
        C["Heat Sink"]
    end
    H -->|"Q = kA(dT/dx)"| W --> C`,
};

/**
 * Heat Exchanger template
 */
export const heatExchanger: DiagramTemplate = {
  id: 'thermo-heat-exchanger',
  name: 'Heat Exchanger Analysis',
  description: 'Counter-flow and parallel-flow heat exchanger design',
  domain: 'physics',
  promptTemplate: `Create a heat exchanger diagram:
- Flow arrangement: {{flowArrangement}}
- Hot fluid inlet/outlet: {{hotFluidTemps}}
- Cold fluid inlet/outlet: {{coldFluidTemps}}
- LMTD: {{lmtd}}
- Overall heat transfer coefficient: {{overallU}}
- Effectiveness: {{effectiveness}}
{{#additionalNotes}}Design notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'flowArrangement',
    'hotFluidTemps',
    'coldFluidTemps',
    'lmtd',
    'overallU',
    'effectiveness',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Counter["Counter-Flow"]
        HI["Hot In"]
        HO["Hot Out"]
        CI["Cold In"]
        CO["Cold Out"]
    end
    HI -->|"T decreases"| HO
    CI -->|"T increases"| CO`,
};

/**
 * Radiation Heat Transfer template
 */
export const radiationTransfer: DiagramTemplate = {
  id: 'thermo-radiation',
  name: 'Thermal Radiation',
  description: 'Stefan-Boltzmann and blackbody radiation',
  domain: 'physics',
  promptTemplate: `Create a thermal radiation diagram:
- Surface temperature: {{surfaceTemperature}}
- Emissivity: {{emissivity}}
- View factors: {{viewFactors}}
- Radiative heat flux: {{radiativeFlux}}
- Wien displacement: {{wienDisplacement}}
- Planck spectrum: {{planckSpectrum}}
{{#additionalNotes}}Blackbody notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'surfaceTemperature',
    'emissivity',
    'viewFactors',
    'radiativeFlux',
    'wienDisplacement',
    'planckSpectrum',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Body["Hot Body T"]
        E["Emitted: εσT⁴"]
    end
    subgraph Surr["Surroundings T₀"]
        A["Absorbed: ασT₀⁴"]
    end
    subgraph Net["Net Radiation"]
        Q["Q = εσA(T⁴-T₀⁴)"]
    end
    E --> Q
    A --> Q`,
};

// =============================================================================
// STATISTICAL MECHANICS TEMPLATES
// =============================================================================

/**
 * Boltzmann Distribution template
 */
export const boltzmannDistribution: DiagramTemplate = {
  id: 'thermo-boltzmann',
  name: 'Boltzmann Distribution',
  description: 'Maxwell-Boltzmann energy distribution and partition function',
  domain: 'physics',
  promptTemplate: `Create a Boltzmann distribution diagram:
- Temperature: {{temperature}}
- Energy levels: {{energyLevels}}
- Partition function: {{partitionFunction}}
- Population ratios: {{populationRatios}}
- Average energy: {{averageEnergy}}
- Degeneracies: {{degeneracies}}
{{#additionalNotes}}Statistical notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'temperature',
    'energyLevels',
    'partitionFunction',
    'populationRatios',
    'averageEnergy',
    'degeneracies',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Energy["Energy Levels"]
        E2["E₂: n₂ ∝ e^(-E₂/kT)"]
        E1["E₁: n₁ ∝ e^(-E₁/kT)"]
        E0["E₀: n₀ (most populated)"]
    end
    E2 --> E1 --> E0`,
};

/**
 * Entropy and Microstates template
 */
export const entropyMicrostates: DiagramTemplate = {
  id: 'thermo-entropy-microstates',
  name: 'Entropy and Microstates',
  description: 'Boltzmann entropy formula and statistical interpretation',
  domain: 'physics',
  promptTemplate: `Create an entropy-microstates diagram:
- System description: {{systemDescription}}
- Macrostate: {{macrostate}}
- Number of microstates: {{microstates}}
- Boltzmann entropy: {{boltzmannEntropy}}
- Probability: {{probability}}
- Second law interpretation: {{secondLaw}}
{{#additionalNotes}}Statistical mechanics notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'systemDescription',
    'macrostate',
    'microstates',
    'boltzmannEntropy',
    'probability',
    'secondLaw',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Macro["Macrostate"]
        M["Observable properties"]
    end
    subgraph Micro["Microstates"]
        W["Ω arrangements"]
    end
    subgraph Entropy["S = k ln Ω"]
        S["Entropy"]
    end
    Macro --> Micro --> S`,
};

/**
 * Free Energy template
 */
export const freeEnergy: DiagramTemplate = {
  id: 'thermo-free-energy',
  name: 'Free Energy Diagrams',
  description: 'Gibbs and Helmholtz free energy and spontaneity',
  domain: 'physics',
  promptTemplate: `Create a free energy diagram:
- Free energy type: {{freeEnergyType}}
- Reaction/process: {{reactionProcess}}
- Enthalpy change: {{enthalpyChange}}
- Entropy change: {{entropyChange}}
- Temperature dependence: {{temperatureDependence}}
- Spontaneity criterion: {{spontaneity}}
{{#additionalNotes}}Equilibrium notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'freeEnergyType',
    'reactionProcess',
    'enthalpyChange',
    'entropyChange',
    'temperatureDependence',
    'spontaneity',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Gibbs["G = H - TS"]
        DG["ΔG = ΔH - TΔS"]
    end
    subgraph Spontaneous["Spontaneity"]
        NEG["ΔG < 0: Spontaneous"]
        ZERO["ΔG = 0: Equilibrium"]
        POS["ΔG > 0: Non-spontaneous"]
    end
    DG --> NEG
    DG --> ZERO
    DG --> POS`,
};

// =============================================================================
// LAWS OF THERMODYNAMICS
// =============================================================================

/**
 * First Law template
 */
export const firstLaw: DiagramTemplate = {
  id: 'thermo-first-law',
  name: 'First Law of Thermodynamics',
  description: 'Energy conservation and internal energy changes',
  domain: 'physics',
  promptTemplate: `Create a first law diagram:
- System type: {{systemType}}
- Heat input: {{heatInput}}
- Work done: {{workDone}}
- Internal energy change: {{internalEnergyChange}}
- Sign convention: {{signConvention}}
- Process path: {{processPath}}
{{#additionalNotes}}Energy balance notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'systemType',
    'heatInput',
    'workDone',
    'internalEnergyChange',
    'signConvention',
    'processPath',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Input["Energy In"]
        Q["Heat Q"]
    end
    subgraph System["System"]
        U["ΔU = Q - W"]
    end
    subgraph Output["Energy Out"]
        W["Work W"]
    end
    Q --> System --> W`,
};

/**
 * Second Law template
 */
export const secondLaw: DiagramTemplate = {
  id: 'thermo-second-law',
  name: 'Second Law of Thermodynamics',
  description: 'Entropy increase and irreversibility',
  domain: 'physics',
  promptTemplate: `Create a second law diagram:
- Statement form: {{statementForm}}
- Entropy change universe: {{entropyUniverse}}
- Reversibility: {{reversibility}}
- Heat engine constraints: {{heatEngineConstraints}}
- Kelvin-Planck: {{kelvinPlanck}}
- Clausius statement: {{clausiusStatement}}
{{#additionalNotes}}Irreversibility notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'statementForm',
    'entropyUniverse',
    'reversibility',
    'heatEngineConstraints',
    'kelvinPlanck',
    'clausiusStatement',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Second["Second Law"]
        S["ΔS_universe ≥ 0"]
    end
    subgraph Cases["Cases"]
        REV["= 0: Reversible"]
        IRR["> 0: Irreversible"]
    end
    S --> REV
    S --> IRR`,
};

/**
 * Third Law template
 */
export const thirdLaw: DiagramTemplate = {
  id: 'thermo-third-law',
  name: 'Third Law of Thermodynamics',
  description: 'Absolute zero and entropy at T=0',
  domain: 'physics',
  promptTemplate: `Create a third law diagram:
- Statement: {{statement}}
- Entropy at T=0: {{entropyAtZero}}
- Perfect crystal: {{perfectCrystal}}
- Residual entropy: {{residualEntropy}}
- Approaching absolute zero: {{approachingZero}}
- Heat capacity behavior: {{heatCapacity}}
{{#additionalNotes}}Low temperature notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'statement',
    'entropyAtZero',
    'perfectCrystal',
    'residualEntropy',
    'approachingZero',
    'heatCapacity',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Third["Third Law"]
        L["As T → 0, S → 0"]
    end
    subgraph Crystal["Perfect Crystal"]
        PC["S(0) = 0"]
    end
    subgraph Imperfect["Real Substance"]
        RS["S(0) = S_residual"]
    end
    L --> PC
    L --> RS`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All thermodynamics templates
 */
export const thermodynamicsTemplates: DiagramTemplate[] = [
  // Heat Engines
  carnotCycle,
  ottoCycle,
  refrigerationCycle,
  // PV and TS Diagrams
  pvDiagram,
  tsDiagram,
  processComparison,
  // Phase Diagrams
  phaseDiagram,
  vanDerWaals,
  clausiusClapeyron,
  // Heat Transfer
  heatConduction,
  heatExchanger,
  radiationTransfer,
  // Statistical Mechanics
  boltzmannDistribution,
  entropyMicrostates,
  freeEnergy,
  // Laws
  firstLaw,
  secondLaw,
  thirdLaw,
];

export default thermodynamicsTemplates;
