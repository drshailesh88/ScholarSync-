/**
 * quantum.ts
 * Quantum Physics diagram templates for FINNISH
 *
 * Contains comprehensive templates for quantum mechanics including:
 * - Wavefunction visualizations
 * - Quantum state diagrams
 * - Energy level diagrams
 * - Operator representations
 * - Experimental setups
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// WAVEFUNCTION TEMPLATES
// =============================================================================

/**
 * Particle in a Box template
 */
export const particleInBox: DiagramTemplate = {
  id: 'quantum-particle-box',
  name: 'Particle in a Box',
  description: 'Infinite square well potential with quantized energy levels and wavefunctions',
  domain: 'physics',
  promptTemplate: `Create a particle in a box diagram showing:
- Box width: {{boxWidth}}
- Energy levels shown: {{energyLevels}}
- Wavefunction nodes: {{wavefunctionNodes}}
- Probability density: {{probabilityDensity}}
- Boundary conditions: {{boundaryConditions}}
- Quantum numbers: {{quantumNumbers}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'boxWidth',
    'energyLevels',
    'wavefunctionNodes',
    'probabilityDensity',
    'boundaryConditions',
    'quantumNumbers',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Box["Infinite Square Well"]
        E3["n=3: E = 9E₁"]
        E2["n=2: E = 4E₁"]
        E1["n=1: E = E₁"]
    end
    subgraph Wave["Wavefunctions"]
        W3["ψ₃: 2 nodes"]
        W2["ψ₂: 1 node"]
        W1["ψ₁: 0 nodes"]
    end
    E3 --> W3
    E2 --> W2
    E1 --> W1`,
};

/**
 * Harmonic Oscillator template
 */
export const harmonicOscillator: DiagramTemplate = {
  id: 'quantum-harmonic-oscillator',
  name: 'Quantum Harmonic Oscillator',
  description: 'Quantum harmonic oscillator with ladder operators and energy spectrum',
  domain: 'physics',
  promptTemplate: `Create a quantum harmonic oscillator diagram:
- Oscillator frequency: {{frequency}}
- Energy levels: {{energyLevels}}
- Zero-point energy: {{zeroPointEnergy}}
- Ladder operators: {{ladderOperators}}
- Hermite polynomials: {{hermitePolynomials}}
- Classical turning points: {{turningPoints}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'frequency',
    'energyLevels',
    'zeroPointEnergy',
    'ladderOperators',
    'hermitePolynomials',
    'turningPoints',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Energy["Energy Levels"]
        E0["n=0: E = ½ℏω"]
        E1["n=1: E = 3/2ℏω"]
        E2["n=2: E = 5/2ℏω"]
    end
    subgraph Operators["Ladder Operators"]
        A["a: lowering"]
        AD["a†: raising"]
    end
    AD -->|"+ℏω"| E1
    A -->|"-ℏω"| E0`,
};

/**
 * Hydrogen Atom Orbitals template
 */
export const hydrogenOrbitals: DiagramTemplate = {
  id: 'quantum-hydrogen-orbitals',
  name: 'Hydrogen Atom Orbitals',
  description: 'Atomic orbital shapes and quantum numbers for hydrogen-like atoms',
  domain: 'physics',
  promptTemplate: `Create a hydrogen atom orbital diagram:
- Principal quantum number n: {{principalNumber}}
- Angular quantum number l: {{angularNumber}}
- Magnetic quantum number m: {{magneticNumber}}
- Orbital shapes: {{orbitalShapes}}
- Radial probability: {{radialProbability}}
- Energy formula: {{energyFormula}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'principalNumber',
    'angularNumber',
    'magneticNumber',
    'orbitalShapes',
    'radialProbability',
    'energyFormula',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Shell["n = 2"]
        S["2s (l=0)"]
        P["2p (l=1)"]
    end
    subgraph Magnetic["m values"]
        P --> M1["m = -1"]
        P --> M0["m = 0"]
        P --> MP1["m = +1"]
    end`,
};

// =============================================================================
// QUANTUM STATE TEMPLATES
// =============================================================================

/**
 * Spin States template
 */
export const spinStates: DiagramTemplate = {
  id: 'quantum-spin-states',
  name: 'Spin State Diagram',
  description: 'Electron spin states and Stern-Gerlach measurement outcomes',
  domain: 'physics',
  promptTemplate: `Create a spin state diagram:
- Spin particle: {{spinParticle}}
- Measurement axis: {{measurementAxis}}
- Spin up probability: {{spinUpProb}}
- Spin down probability: {{spinDownProb}}
- Bloch sphere representation: {{blochSphere}}
- Superposition state: {{superposition}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'spinParticle',
    'measurementAxis',
    'spinUpProb',
    'spinDownProb',
    'blochSphere',
    'superposition',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Input["Initial State"]
        PSI["|ψ⟩ = α|↑⟩ + β|↓⟩"]
    end
    subgraph SG["Stern-Gerlach"]
        B["B field"]
    end
    subgraph Output["Outcomes"]
        UP["|↑⟩: |α|²"]
        DOWN["|↓⟩: |β|²"]
    end
    PSI --> SG --> UP
    SG --> DOWN`,
};

/**
 * Entanglement template
 */
export const entanglementDiagram: DiagramTemplate = {
  id: 'quantum-entanglement',
  name: 'Quantum Entanglement Diagram',
  description: 'Bell state entanglement and EPR correlations',
  domain: 'physics',
  promptTemplate: `Create a quantum entanglement diagram:
- Entangled state: {{entangledState}}
- Bell state type: {{bellState}}
- Measurement bases: {{measurementBases}}
- Correlation type: {{correlationType}}
- Bell inequality: {{bellInequality}}
- Classical vs quantum: {{classicalVsQuantum}}
{{#additionalNotes}}EPR paradox notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'entangledState',
    'bellState',
    'measurementBases',
    'correlationType',
    'bellInequality',
    'classicalVsQuantum',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Source["Entangled Pair"]
        S["Φ⁺ = (|00⟩+|11⟩)/√2"]
    end
    subgraph Alice["Alice"]
        A["Measure Z"]
    end
    subgraph Bob["Bob"]
        B["Measure Z"]
    end
    S -->|"qubit 1"| A
    S -->|"qubit 2"| B
    A -.->|"100% correlated"| B`,
};

/**
 * Superposition template
 */
export const superpositionState: DiagramTemplate = {
  id: 'quantum-superposition',
  name: 'Quantum Superposition',
  description: 'Superposition principle and measurement collapse',
  domain: 'physics',
  promptTemplate: `Create a quantum superposition diagram:
- Basis states: {{basisStates}}
- Superposition coefficients: {{coefficients}}
- Measurement observable: {{observable}}
- Collapse outcomes: {{collapseOutcomes}}
- Probability amplitudes: {{probAmplitudes}}
- Interference effects: {{interference}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'basisStates',
    'coefficients',
    'observable',
    'collapseOutcomes',
    'probAmplitudes',
    'interference',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Before["Before Measurement"]
        S["|ψ⟩ = c₁|1⟩ + c₂|2⟩"]
    end
    subgraph Measure["Measurement"]
        M["Observable A"]
    end
    subgraph After["After Collapse"]
        O1["|1⟩ with P = |c₁|²"]
        O2["|2⟩ with P = |c₂|²"]
    end
    S --> M
    M --> O1
    M --> O2`,
};

// =============================================================================
// EXPERIMENTAL SETUP TEMPLATES
// =============================================================================

/**
 * Double Slit Experiment template
 */
export const doubleSlit: DiagramTemplate = {
  id: 'quantum-double-slit',
  name: 'Double Slit Experiment',
  description: 'Wave-particle duality demonstration with interference pattern',
  domain: 'physics',
  promptTemplate: `Create a double slit experiment diagram:
- Particle type: {{particleType}}
- Slit separation: {{slitSeparation}}
- Screen distance: {{screenDistance}}
- Interference pattern: {{interferencePattern}}
- Which-way detection: {{whichWayDetection}}
- Complementarity: {{complementarity}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'particleType',
    'slitSeparation',
    'screenDistance',
    'interferencePattern',
    'whichWayDetection',
    'complementarity',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Source["Source"]
        E["Electron gun"]
    end
    subgraph Slits["Double Slit"]
        S1["Slit 1"]
        S2["Slit 2"]
    end
    subgraph Screen["Detection"]
        P["Interference Pattern"]
    end
    E --> S1 --> P
    E --> S2 --> P`,
};

/**
 * Stern-Gerlach Experiment template
 */
export const sternGerlach: DiagramTemplate = {
  id: 'quantum-stern-gerlach',
  name: 'Stern-Gerlach Experiment',
  description: 'Spin quantization measurement with inhomogeneous magnetic field',
  domain: 'physics',
  promptTemplate: `Create a Stern-Gerlach experiment diagram:
- Atom type: {{atomType}}
- Magnetic field gradient: {{fieldGradient}}
- Beam splitting: {{beamSplitting}}
- Spin states: {{spinStates}}
- Sequential measurements: {{sequentialMeasurements}}
- Quantum number: {{quantumNumber}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'atomType',
    'fieldGradient',
    'beamSplitting',
    'spinStates',
    'sequentialMeasurements',
    'quantumNumber',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Source["Oven"]
        A["Ag atoms"]
    end
    subgraph Magnet["Inhomogeneous B"]
        B["dB/dz ≠ 0"]
    end
    subgraph Screen["Detector"]
        UP["Spin up"]
        DOWN["Spin down"]
    end
    A --> B --> UP
    B --> DOWN`,
};

/**
 * Mach-Zehnder Interferometer template
 */
export const machZehnder: DiagramTemplate = {
  id: 'quantum-mach-zehnder',
  name: 'Mach-Zehnder Interferometer',
  description: 'Quantum interferometry with beam splitters and path interference',
  domain: 'physics',
  promptTemplate: `Create a Mach-Zehnder interferometer diagram:
- Input state: {{inputState}}
- Beam splitter ratios: {{beamSplitterRatios}}
- Path length difference: {{pathDifference}}
- Phase shifter: {{phaseShifter}}
- Output ports: {{outputPorts}}
- Interference visibility: {{visibility}}
{{#additionalNotes}}Quantum eraser notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'inputState',
    'beamSplitterRatios',
    'pathDifference',
    'phaseShifter',
    'outputPorts',
    'visibility',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Input["Source"]
        S["Single photon"]
    end
    subgraph MZ["Interferometer"]
        BS1["50:50 BS"]
        M1["Mirror"]
        M2["Mirror"]
        BS2["50:50 BS"]
    end
    subgraph Output["Detectors"]
        D1["D1"]
        D2["D2"]
    end
    S --> BS1 --> M1 --> BS2 --> D1
    BS1 --> M2 --> BS2 --> D2`,
};

// =============================================================================
// ENERGY LEVEL TEMPLATES
// =============================================================================

/**
 * Energy Level Diagram template
 */
export const energyLevelDiagram: DiagramTemplate = {
  id: 'quantum-energy-levels',
  name: 'Energy Level Diagram',
  description: 'Discrete energy levels with transitions and selection rules',
  domain: 'physics',
  promptTemplate: `Create an energy level diagram:
- System type: {{systemType}}
- Energy levels: {{energyLevels}}
- Allowed transitions: {{allowedTransitions}}
- Selection rules: {{selectionRules}}
- Photon energies: {{photonEnergies}}
- Degeneracies: {{degeneracies}}
{{#additionalNotes}}Spectroscopy notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'systemType',
    'energyLevels',
    'allowedTransitions',
    'selectionRules',
    'photonEnergies',
    'degeneracies',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Levels["Energy Levels"]
        E3["n=3"]
        E2["n=2"]
        E1["n=1 (ground)"]
    end
    E3 -->|"Lyman-β"| E1
    E3 -->|"Balmer-α"| E2
    E2 -->|"Lyman-α"| E1`,
};

/**
 * Perturbation Theory template
 */
export const perturbationTheory: DiagramTemplate = {
  id: 'quantum-perturbation',
  name: 'Perturbation Theory',
  description: 'Energy level corrections from perturbative interactions',
  domain: 'physics',
  promptTemplate: `Create a perturbation theory diagram:
- Unperturbed system: {{unperturbedSystem}}
- Perturbation type: {{perturbationType}}
- First-order correction: {{firstOrderCorrection}}
- Second-order correction: {{secondOrderCorrection}}
- Degeneracy lifting: {{degeneracyLifting}}
- Matrix elements: {{matrixElements}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'unperturbedSystem',
    'perturbationType',
    'firstOrderCorrection',
    'secondOrderCorrection',
    'degeneracyLifting',
    'matrixElements',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph H0["Unperturbed H₀"]
        E0["E⁽⁰⁾"]
    end
    subgraph Pert["+ λH'"]
        E1["E⁽⁰⁾ + λE⁽¹⁾"]
    end
    subgraph Full["Full"]
        EF["E⁽⁰⁾ + λE⁽¹⁾ + λ²E⁽²⁾"]
    end
    H0 --> Pert --> Full`,
};

/**
 * Zeeman Effect template
 */
export const zeemanEffect: DiagramTemplate = {
  id: 'quantum-zeeman',
  name: 'Zeeman Effect',
  description: 'Magnetic field splitting of spectral lines',
  domain: 'physics',
  promptTemplate: `Create a Zeeman effect diagram:
- Atom/transition: {{atomTransition}}
- Magnetic field strength: {{fieldStrength}}
- Normal vs anomalous: {{zeemanType}}
- m_l splitting: {{mlSplitting}}
- Selection rules: {{selectionRules}}
- Spectral pattern: {{spectralPattern}}
{{#additionalNotes}}Polarization notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'atomTransition',
    'fieldStrength',
    'zeemanType',
    'mlSplitting',
    'selectionRules',
    'spectralPattern',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph NoField["B = 0"]
        E0["Single line"]
    end
    subgraph Field["B ≠ 0"]
        EM1["m = -1"]
        E00["m = 0"]
        EP1["m = +1"]
    end
    E0 -->|"Apply B"| EM1
    E0 --> E00
    E0 --> EP1`,
};

// =============================================================================
// OPERATOR TEMPLATES
// =============================================================================

/**
 * Commutator Relations template
 */
export const commutatorRelations: DiagramTemplate = {
  id: 'quantum-commutators',
  name: 'Commutator Relations',
  description: 'Fundamental commutation relations and uncertainty principle',
  domain: 'physics',
  promptTemplate: `Create a commutator relations diagram:
- Operators involved: {{operators}}
- Commutation relation: {{commutationRelation}}
- Uncertainty relation: {{uncertaintyRelation}}
- Compatible observables: {{compatibleObservables}}
- Simultaneous eigenstates: {{simultaneousEigenstates}}
- Physical interpretation: {{physicalInterpretation}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'operators',
    'commutationRelation',
    'uncertaintyRelation',
    'compatibleObservables',
    'simultaneousEigenstates',
    'physicalInterpretation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Canonical["Canonical"]
        XP["[x, p] = iℏ"]
    end
    subgraph Angular["Angular Momentum"]
        JJ["[Jᵢ, Jⱼ] = iℏεᵢⱼₖJₖ"]
    end
    subgraph Uncertainty["Uncertainty"]
        U["ΔxΔp ≥ ℏ/2"]
    end
    XP --> U`,
};

/**
 * Density Matrix template
 */
export const densityMatrix: DiagramTemplate = {
  id: 'quantum-density-matrix',
  name: 'Density Matrix Formalism',
  description: 'Mixed states and statistical quantum mechanics',
  domain: 'physics',
  promptTemplate: `Create a density matrix diagram:
- Pure vs mixed state: {{pureVsMixed}}
- Density operator: {{densityOperator}}
- Trace properties: {{traceProperties}}
- Purity measure: {{purityMeasure}}
- Entanglement entropy: {{entanglementEntropy}}
- Decoherence: {{decoherence}}
{{#additionalNotes}}Open system notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'pureVsMixed',
    'densityOperator',
    'traceProperties',
    'purityMeasure',
    'entanglementEntropy',
    'decoherence',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Pure["Pure State"]
        P["ρ = |ψ⟩⟨ψ|"]
        P1["Tr(ρ²) = 1"]
    end
    subgraph Mixed["Mixed State"]
        M["ρ = Σpᵢ|ψᵢ⟩⟨ψᵢ|"]
        M1["Tr(ρ²) < 1"]
    end
    P -->|"Decoherence"| M`,
};

// =============================================================================
// QUANTUM COMPUTING TEMPLATES
// =============================================================================

/**
 * Quantum Circuit template
 */
export const quantumCircuit: DiagramTemplate = {
  id: 'quantum-circuit',
  name: 'Quantum Circuit',
  description: 'Quantum gate operations and qubit manipulations',
  domain: 'physics',
  promptTemplate: `Create a quantum circuit diagram:
- Number of qubits: {{numQubits}}
- Initial state: {{initialState}}
- Gate sequence: {{gateSequence}}
- Measurement basis: {{measurementBasis}}
- Entangling gates: {{entanglingGates}}
- Output state: {{outputState}}
{{#additionalNotes}}Algorithm notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'numQubits',
    'initialState',
    'gateSequence',
    'measurementBasis',
    'entanglingGates',
    'outputState',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Init["Initialize"]
        Q1["|0⟩"]
        Q2["|0⟩"]
    end
    subgraph Gates["Gates"]
        H["H gate"]
        CNOT["CNOT"]
    end
    subgraph Measure["Measure"]
        M1["⟨Z⟩"]
        M2["⟨Z⟩"]
    end
    Q1 --> H --> CNOT --> M1
    Q2 --> CNOT --> M2`,
};

/**
 * Quantum Teleportation template
 */
export const quantumTeleportation: DiagramTemplate = {
  id: 'quantum-teleportation',
  name: 'Quantum Teleportation Protocol',
  description: 'Quantum state transfer using entanglement and classical communication',
  domain: 'physics',
  promptTemplate: `Create a quantum teleportation protocol diagram:
- Initial state to teleport: {{initialState}}
- Entangled resource: {{entangledResource}}
- Bell measurement: {{bellMeasurement}}
- Classical bits: {{classicalBits}}
- Correction operations: {{correctionOperations}}
- Final state: {{finalState}}
{{#additionalNotes}}Fidelity notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'initialState',
    'entangledResource',
    'bellMeasurement',
    'classicalBits',
    'correctionOperations',
    'finalState',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Alice["Alice"]
        PSI["|ψ⟩"]
        BM["Bell Meas."]
    end
    subgraph EPR["Shared EPR"]
        E["Φ⁺"]
    end
    subgraph Bob["Bob"]
        U["U(bits)"]
        OUT["|ψ⟩"]
    end
    PSI --> BM
    E --> BM
    E --> U
    BM -->|"2 bits"| U --> OUT`,
};

// =============================================================================
// ADVANCED TOPICS
// =============================================================================

/**
 * Path Integral template
 */
export const pathIntegral: DiagramTemplate = {
  id: 'quantum-path-integral',
  name: 'Path Integral Formulation',
  description: 'Feynman path integral and sum over histories',
  domain: 'physics',
  promptTemplate: `Create a path integral diagram:
- Initial point: {{initialPoint}}
- Final point: {{finalPoint}}
- Classical path: {{classicalPath}}
- Quantum paths: {{quantumPaths}}
- Action functional: {{actionFunctional}}
- Propagator: {{propagator}}
{{#additionalNotes}}Semiclassical notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'initialPoint',
    'finalPoint',
    'classicalPath',
    'quantumPaths',
    'actionFunctional',
    'propagator',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Start["(xᵢ, tᵢ)"]
        A["A"]
    end
    subgraph Paths["All Paths"]
        P1["Path 1: e^(iS₁/ℏ)"]
        P2["Path 2: e^(iS₂/ℏ)"]
        P3["Path 3: e^(iS₃/ℏ)"]
    end
    subgraph End["(xf, tf)"]
        B["B"]
    end
    A --> P1 --> B
    A --> P2 --> B
    A --> P3 --> B`,
};

/**
 * Scattering Theory template
 */
export const scatteringTheory: DiagramTemplate = {
  id: 'quantum-scattering',
  name: 'Quantum Scattering',
  description: 'Scattering cross sections and partial wave analysis',
  domain: 'physics',
  promptTemplate: `Create a quantum scattering diagram:
- Incident particle: {{incidentParticle}}
- Target potential: {{targetPotential}}
- Scattering amplitude: {{scatteringAmplitude}}
- Differential cross section: {{differentialCrossSection}}
- Partial waves: {{partialWaves}}
- Phase shifts: {{phaseShifts}}
{{#additionalNotes}}Resonance notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'incidentParticle',
    'targetPotential',
    'scatteringAmplitude',
    'differentialCrossSection',
    'partialWaves',
    'phaseShifts',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Inc["Incident"]
        I["e^(ikz)"]
    end
    subgraph Target["V(r)"]
        T["Potential"]
    end
    subgraph Scat["Scattered"]
        S["f(θ)e^(ikr)/r"]
    end
    I --> T --> S`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All quantum physics templates
 */
export const quantumTemplates: DiagramTemplate[] = [
  // Wavefunctions
  particleInBox,
  harmonicOscillator,
  hydrogenOrbitals,
  // Quantum States
  spinStates,
  entanglementDiagram,
  superpositionState,
  // Experimental Setups
  doubleSlit,
  sternGerlach,
  machZehnder,
  // Energy Levels
  energyLevelDiagram,
  perturbationTheory,
  zeemanEffect,
  // Operators
  commutatorRelations,
  densityMatrix,
  // Quantum Computing
  quantumCircuit,
  quantumTeleportation,
  // Advanced
  pathIntegral,
  scatteringTheory,
];

export default quantumTemplates;
