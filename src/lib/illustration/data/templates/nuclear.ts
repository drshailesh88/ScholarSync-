/**
 * nuclear.ts
 * Nuclear Physics diagram templates for FINNISH
 *
 * Contains comprehensive templates for nuclear physics including:
 * - Radioactive decay diagrams
 * - Nuclear reactions
 * - Reactor systems
 * - Particle physics
 * - Nuclear structure
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// RADIOACTIVE DECAY TEMPLATES
// =============================================================================

/**
 * Decay Chain template
 */
export const decayChain: DiagramTemplate = {
  id: 'nuclear-decay-chain',
  name: 'Radioactive Decay Chain',
  description: 'Sequential radioactive decay series',
  domain: 'physics',
  promptTemplate: `Create a decay chain diagram:
- Parent nucleus: {{parentNucleus}}
- Decay types: {{decayTypes}}
- Daughter products: {{daughterProducts}}
- Half-lives: {{halfLives}}
- Stable end product: {{stableEndProduct}}
- Branching ratios: {{branchingRatios}}
{{#additionalNotes}}Decay series notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'parentNucleus',
    'decayTypes',
    'daughterProducts',
    'halfLives',
    'stableEndProduct',
    'branchingRatios',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Chain["Uranium-238 Decay Chain"]
        U238["²³⁸U"]
        TH234["²³⁴Th"]
        PA234["²³⁴Pa"]
        PB206["²⁰⁶Pb (stable)"]
    end
    U238 -->|"α decay"| TH234
    TH234 -->|"β decay"| PA234
    PA234 -->|"..."| PB206`,
};

/**
 * Alpha Decay template
 */
export const alphaDecay: DiagramTemplate = {
  id: 'nuclear-alpha-decay',
  name: 'Alpha Decay',
  description: 'Alpha particle emission from heavy nuclei',
  domain: 'physics',
  promptTemplate: `Create an alpha decay diagram:
- Parent nucleus: {{parentNucleus}}
- Daughter nucleus: {{daughterNucleus}}
- Alpha particle energy: {{alphaEnergy}}
- Q-value: {{qValue}}
- Tunneling probability: {{tunnelingProbability}}
- Half-life: {{halfLife}}
{{#additionalNotes}}Decay mechanism: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'parentNucleus',
    'daughterNucleus',
    'alphaEnergy',
    'qValue',
    'tunnelingProbability',
    'halfLife',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Parent["Parent (Z,A)"]
        P["²³⁸U"]
    end
    subgraph Products["Products"]
        D["²³⁴Th (Z-2, A-4)"]
        A["⁴He (alpha)"]
    end
    Parent -->|"Q = 4.27 MeV"| Products`,
};

/**
 * Beta Decay template
 */
export const betaDecay: DiagramTemplate = {
  id: 'nuclear-beta-decay',
  name: 'Beta Decay',
  description: 'Beta minus and beta plus decay processes',
  domain: 'physics',
  promptTemplate: `Create a beta decay diagram:
- Decay type: {{decayType}}
- Parent nucleus: {{parentNucleus}}
- Daughter nucleus: {{daughterNucleus}}
- Electron/positron: {{lepton}}
- Neutrino: {{neutrino}}
- Energy spectrum: {{energySpectrum}}
{{#additionalNotes}}Weak interaction: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'decayType',
    'parentNucleus',
    'daughterNucleus',
    'lepton',
    'neutrino',
    'energySpectrum',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Parent["Parent"]
        N["n → p"]
    end
    subgraph Products["β⁻ Decay"]
        P["Daughter (Z+1)"]
        E["e⁻"]
        NU["ν̄ₑ"]
    end
    Parent --> Products`,
};

/**
 * Decay Statistics template
 */
export const decayStatistics: DiagramTemplate = {
  id: 'nuclear-decay-statistics',
  name: 'Decay Statistics',
  description: 'Exponential decay law and activity',
  domain: 'physics',
  promptTemplate: `Create a decay statistics diagram:
- Initial nuclei: {{initialNuclei}}
- Decay constant: {{decayConstant}}
- Half-life: {{halfLife}}
- Activity vs time: {{activityCurve}}
- Mean lifetime: {{meanLifetime}}
- Remaining fraction: {{remainingFraction}}
{{#additionalNotes}}Statistical notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'initialNuclei',
    'decayConstant',
    'halfLife',
    'activityCurve',
    'meanLifetime',
    'remainingFraction',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Law["Decay Law"]
        N["N(t) = N₀e^(-λt)"]
    end
    subgraph Relations["Key Relations"]
        HL["t₁/₂ = ln2/λ"]
        TAU["τ = 1/λ"]
        A["A = λN"]
    end
    Law --> Relations`,
};

// =============================================================================
// NUCLEAR REACTION TEMPLATES
// =============================================================================

/**
 * Nuclear Fission template
 */
export const nuclearFission: DiagramTemplate = {
  id: 'nuclear-fission',
  name: 'Nuclear Fission',
  description: 'Heavy nucleus fission and energy release',
  domain: 'physics',
  promptTemplate: `Create a nuclear fission diagram:
- Fissile nucleus: {{fissileNucleus}}
- Fission products: {{fissionProducts}}
- Neutrons released: {{neutronsReleased}}
- Energy release: {{energyRelease}}
- Cross section: {{crossSection}}
- Chain reaction: {{chainReaction}}
{{#additionalNotes}}Fission notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'fissileNucleus',
    'fissionProducts',
    'neutronsReleased',
    'energyRelease',
    'crossSection',
    'chainReaction',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Input["Fission Input"]
        N["n (thermal)"]
        U["²³⁵U"]
    end
    subgraph Products["Fission Products"]
        FP1["Fragment 1"]
        FP2["Fragment 2"]
        NP["2-3 neutrons"]
        E["~200 MeV"]
    end
    Input --> Products`,
};

/**
 * Nuclear Fusion template
 */
export const nuclearFusion: DiagramTemplate = {
  id: 'nuclear-fusion',
  name: 'Nuclear Fusion',
  description: 'Light nuclei fusion reactions',
  domain: 'physics',
  promptTemplate: `Create a nuclear fusion diagram:
- Reactants: {{reactants}}
- Products: {{products}}
- Energy release: {{energyRelease}}
- Coulomb barrier: {{coulombBarrier}}
- Temperature required: {{temperatureRequired}}
- Reaction rate: {{reactionRate}}
{{#additionalNotes}}Fusion conditions: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'reactants',
    'products',
    'energyRelease',
    'coulombBarrier',
    'temperatureRequired',
    'reactionRate',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph DT["D-T Fusion"]
        D["²H (D)"]
        T["³H (T)"]
    end
    subgraph Products["Products"]
        HE["⁴He (3.5 MeV)"]
        N["n (14.1 MeV)"]
    end
    DT -->|"17.6 MeV total"| Products`,
};

/**
 * Binding Energy template
 */
export const bindingEnergy: DiagramTemplate = {
  id: 'nuclear-binding-energy',
  name: 'Nuclear Binding Energy',
  description: 'Binding energy per nucleon and stability',
  domain: 'physics',
  promptTemplate: `Create a binding energy diagram:
- Nucleus: {{nucleus}}
- Mass defect: {{massDefect}}
- Binding energy: {{bindingEnergy}}
- B/A value: {{bindingPerNucleon}}
- Semi-empirical formula: {{semiEmpirical}}
- Stability region: {{stabilityRegion}}
{{#additionalNotes}}Nuclear stability: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'nucleus',
    'massDefect',
    'bindingEnergy',
    'bindingPerNucleon',
    'semiEmpirical',
    'stabilityRegion',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph BECurve["B/A vs A"]
        MAX["Maximum at Fe-56"]
        LIGHT["Light: fusion releases E"]
        HEAVY["Heavy: fission releases E"]
    end
    LIGHT --> MAX --> HEAVY`,
};

// =============================================================================
// REACTOR TEMPLATES
// =============================================================================

/**
 * Reactor Core template
 */
export const reactorCore: DiagramTemplate = {
  id: 'nuclear-reactor-core',
  name: 'Nuclear Reactor Core',
  description: 'Reactor core components and neutron cycle',
  domain: 'physics',
  promptTemplate: `Create a reactor core diagram:
- Fuel type: {{fuelType}}
- Moderator: {{moderator}}
- Control rods: {{controlRods}}
- Coolant: {{coolant}}
- Criticality: {{criticality}}
- Power level: {{powerLevel}}
{{#additionalNotes}}Reactor design: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'fuelType',
    'moderator',
    'controlRods',
    'coolant',
    'criticality',
    'powerLevel',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Core["Reactor Core"]
        F["Fuel rods (UO₂)"]
        M["Moderator (H₂O)"]
        C["Control rods (B₄C)"]
    end
    subgraph Cycle["Neutron Cycle"]
        N["Fast n → Moderate → Absorb → Fission"]
    end
    Core --> Cycle`,
};

/**
 * Chain Reaction template
 */
export const chainReaction: DiagramTemplate = {
  id: 'nuclear-chain-reaction',
  name: 'Nuclear Chain Reaction',
  description: 'Multiplication factor and criticality',
  domain: 'physics',
  promptTemplate: `Create a chain reaction diagram:
- Multiplication factor k: {{multiplicationFactor}}
- Subcritical state: {{subcritical}}
- Critical state: {{critical}}
- Supercritical state: {{supercritical}}
- Neutron generations: {{neutronGenerations}}
- Control mechanisms: {{controlMechanisms}}
{{#additionalNotes}}Criticality notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'multiplicationFactor',
    'subcritical',
    'critical',
    'supercritical',
    'neutronGenerations',
    'controlMechanisms',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph States["Criticality States"]
        SUB["k < 1: Subcritical"]
        CRIT["k = 1: Critical"]
        SUP["k > 1: Supercritical"]
    end
    subgraph Result["Result"]
        D["Decreasing power"]
        S["Steady power"]
        I["Increasing power"]
    end
    SUB --> D
    CRIT --> S
    SUP --> I`,
};

/**
 * Power Plant template
 */
export const nuclearPowerPlant: DiagramTemplate = {
  id: 'nuclear-power-plant',
  name: 'Nuclear Power Plant',
  description: 'Complete nuclear power plant system',
  domain: 'physics',
  promptTemplate: `Create a nuclear power plant diagram:
- Reactor type: {{reactorType}}
- Primary loop: {{primaryLoop}}
- Secondary loop: {{secondaryLoop}}
- Steam generator: {{steamGenerator}}
- Turbine: {{turbine}}
- Containment: {{containment}}
{{#additionalNotes}}Plant design: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'reactorType',
    'primaryLoop',
    'secondaryLoop',
    'steamGenerator',
    'turbine',
    'containment',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Primary["Primary Loop"]
        R["Reactor"]
        SG["Steam Generator"]
    end
    subgraph Secondary["Secondary Loop"]
        T["Turbine"]
        G["Generator"]
        C["Condenser"]
    end
    R -->|"Hot coolant"| SG -->|"Steam"| T --> G
    T --> C`,
};

// =============================================================================
// PARTICLE PHYSICS TEMPLATES
// =============================================================================

/**
 * Standard Model template
 */
export const standardModel: DiagramTemplate = {
  id: 'nuclear-standard-model',
  name: 'Standard Model',
  description: 'Fundamental particles and forces',
  domain: 'physics',
  promptTemplate: `Create a Standard Model diagram:
- Quarks: {{quarks}}
- Leptons: {{leptons}}
- Gauge bosons: {{gaugeBosons}}
- Higgs boson: {{higgsBoson}}
- Generations: {{generations}}
- Forces: {{forces}}
{{#additionalNotes}}Particle notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'quarks',
    'leptons',
    'gaugeBosons',
    'higgsBoson',
    'generations',
    'forces',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Fermions["Fermions"]
        Q["Quarks: u,d,c,s,t,b"]
        L["Leptons: e,μ,τ + neutrinos"]
    end
    subgraph Bosons["Bosons"]
        G["γ: EM"]
        W["W,Z: Weak"]
        GL["g: Strong"]
        H["H: Higgs"]
    end`,
};

/**
 * Feynman Diagram template
 */
export const feynmanDiagram: DiagramTemplate = {
  id: 'nuclear-feynman-diagram',
  name: 'Feynman Diagram',
  description: 'Particle interaction diagrams',
  domain: 'physics',
  promptTemplate: `Create a Feynman diagram:
- Process: {{process}}
- Initial particles: {{initialParticles}}
- Final particles: {{finalParticles}}
- Virtual particles: {{virtualParticles}}
- Vertices: {{vertices}}
- Conservation laws: {{conservationLaws}}
{{#additionalNotes}}Diagram rules: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'process',
    'initialParticles',
    'finalParticles',
    'virtualParticles',
    'vertices',
    'conservationLaws',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph In["Initial"]
        E1["e⁻"]
        E2["e⁺"]
    end
    subgraph Exchange["Virtual"]
        V["γ"]
    end
    subgraph Out["Final"]
        M1["μ⁻"]
        M2["μ⁺"]
    end
    E1 --> V --> M1
    E2 --> V --> M2`,
};

/**
 * Quark Model template
 */
export const quarkModel: DiagramTemplate = {
  id: 'nuclear-quark-model',
  name: 'Quark Model',
  description: 'Hadron structure from quarks',
  domain: 'physics',
  promptTemplate: `Create a quark model diagram:
- Hadron type: {{hadronType}}
- Quark content: {{quarkContent}}
- Color charge: {{colorCharge}}
- Spin: {{spin}}
- Electric charge: {{electricCharge}}
- Mass: {{mass}}
{{#additionalNotes}}QCD notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'hadronType',
    'quarkContent',
    'colorCharge',
    'spin',
    'electricCharge',
    'mass',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Proton["Proton (uud)"]
        U1["u (+2/3)"]
        U2["u (+2/3)"]
        D["d (-1/3)"]
    end
    subgraph Props["Properties"]
        Q["Charge = +1"]
        S["Spin = 1/2"]
    end
    Proton --> Props`,
};

// =============================================================================
// NUCLEAR STRUCTURE TEMPLATES
// =============================================================================

/**
 * Nuclear Shell Model template
 */
export const nuclearShellModel: DiagramTemplate = {
  id: 'nuclear-shell-model',
  name: 'Nuclear Shell Model',
  description: 'Magic numbers and nuclear stability',
  domain: 'physics',
  promptTemplate: `Create a nuclear shell model diagram:
- Energy levels: {{energyLevels}}
- Magic numbers: {{magicNumbers}}
- Spin-orbit coupling: {{spinOrbitCoupling}}
- Filled shells: {{filledShells}}
- Ground state: {{groundState}}
- Nuclear spin: {{nuclearSpin}}
{{#additionalNotes}}Shell model notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'energyLevels',
    'magicNumbers',
    'spinOrbitCoupling',
    'filledShells',
    'groundState',
    'nuclearSpin',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Shells["Nuclear Shells"]
        S1["1s₁/₂ (2)"]
        S2["1p₃/₂ (4)"]
        S3["1p₁/₂ (2) → Magic 8"]
    end
    subgraph Magic["Magic Numbers"]
        M["2, 8, 20, 28, 50, 82, 126"]
    end
    Shells --> Magic`,
};

/**
 * Liquid Drop Model template
 */
export const liquidDropModel: DiagramTemplate = {
  id: 'nuclear-liquid-drop',
  name: 'Liquid Drop Model',
  description: 'Semi-empirical mass formula',
  domain: 'physics',
  promptTemplate: `Create a liquid drop model diagram:
- Volume term: {{volumeTerm}}
- Surface term: {{surfaceTerm}}
- Coulomb term: {{coulombTerm}}
- Asymmetry term: {{asymmetryTerm}}
- Pairing term: {{pairingTerm}}
- Mass formula: {{massFormula}}
{{#additionalNotes}}Model notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'volumeTerm',
    'surfaceTerm',
    'coulombTerm',
    'asymmetryTerm',
    'pairingTerm',
    'massFormula',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph SEMF["Semi-Empirical Mass Formula"]
        V["Volume: a_v*A"]
        S["Surface: -a_s*A^(2/3)"]
        C["Coulomb: -a_c*Z²/A^(1/3)"]
        A["Asymmetry: -a_a*(N-Z)²/A"]
        P["Pairing: ±δ"]
    end
    V --> B["B = sum"]
    S --> B
    C --> B
    A --> B
    P --> B`,
};

// =============================================================================
// ADDITIONAL NUCLEAR PHYSICS TEMPLATES
// =============================================================================

/**
 * Gamma Decay template
 */
export const gammaDecay: DiagramTemplate = {
  id: 'nuclear-gamma-decay',
  name: 'Gamma Decay',
  description: 'Nuclear de-excitation via gamma emission',
  domain: 'physics',
  promptTemplate: `Create a gamma decay diagram:
- Excited nucleus: {{excitedNucleus}}
- Energy levels: {{energyLevels}}
- Gamma ray energy: {{gammaEnergy}}
- Transition types: {{transitionTypes}}
- Internal conversion: {{internalConversion}}
- Selection rules: {{selectionRules}}
{{#additionalNotes}}Isomeric states: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'excitedNucleus',
    'energyLevels',
    'gammaEnergy',
    'transitionTypes',
    'internalConversion',
    'selectionRules',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Levels["Nuclear Energy Levels"]
        E2["Excited State 2"]
        E1["Excited State 1"]
        G["Ground State"]
    end
    E2 -->|"γ₁"| E1
    E1 -->|"γ₂"| G
    subgraph Types
        T["E1, E2, M1 transitions"]
    end`,
};

/**
 * Neutron Cross Section template
 */
export const neutronCrossSection: DiagramTemplate = {
  id: 'nuclear-cross-section',
  name: 'Neutron Cross Section',
  description: 'Reaction probability as function of neutron energy',
  domain: 'physics',
  promptTemplate: `Create a neutron cross section diagram:
- Target nucleus: {{targetNucleus}}
- Reaction type: {{reactionType}}
- 1/v region: {{oneOverVRegion}}
- Resonance peaks: {{resonancePeaks}}
- Thermal cross section: {{thermalCrossSection}}
- Doppler broadening: {{dopplerBroadening}}
{{#additionalNotes}}Breit-Wigner formula: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'targetNucleus',
    'reactionType',
    'oneOverVRegion',
    'resonancePeaks',
    'thermalCrossSection',
    'dopplerBroadening',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph CrossSection["σ vs Energy"]
        A["1/v region (thermal)"]
        B["Resonance region"]
        C["Unresolved resonances"]
    end
    subgraph Values
        D["U-235 thermal: 584 b"]
        E["U-238 thermal: 2.7 b"]
    end`,
};

/**
 * Nuclear Reactions Q-Value template
 */
export const nuclearQValue: DiagramTemplate = {
  id: 'nuclear-q-value',
  name: 'Nuclear Reaction Q-Value',
  description: 'Energy release or absorption in nuclear reactions',
  domain: 'physics',
  promptTemplate: `Create a nuclear Q-value diagram:
- Reaction: {{reaction}}
- Initial masses: {{initialMasses}}
- Final masses: {{finalMasses}}
- Q-value calculation: {{qValueCalc}}
- Exothermic vs endothermic: {{exoEndo}}
- Threshold energy: {{thresholdEnergy}}
{{#additionalNotes}}Mass-energy conversion: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'reaction',
    'initialMasses',
    'finalMasses',
    'qValueCalc',
    'exoEndo',
    'thresholdEnergy',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Qvalue["Q-Value Calculation"]
        A["Q = (m_initial - m_final)c²"]
        B["Q > 0: Exothermic"]
        C["Q < 0: Endothermic"]
    end
    subgraph Threshold
        D["E_threshold = -Q(1 + m_a/m_A)"]
    end`,
};

/**
 * Radiocarbon Dating template
 */
export const radiocarbonDating: DiagramTemplate = {
  id: 'nuclear-radiocarbon',
  name: 'Radiocarbon Dating',
  description: 'C-14 dating methodology',
  domain: 'physics',
  promptTemplate: `Create a radiocarbon dating diagram:
- C-14 production: {{c14Production}}
- Half-life: {{halfLife}}
- Activity measurement: {{activityMeasurement}}
- Age calculation: {{ageCalculation}}
- Calibration: {{calibration}}
- Limitations: {{limitations}}
{{#additionalNotes}}AMS technique: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'c14Production',
    'halfLife',
    'activityMeasurement',
    'ageCalculation',
    'calibration',
    'limitations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Production
        A["¹⁴N + n → ¹⁴C + p"]
        B["Cosmic ray neutrons"]
    end
    subgraph Dating
        C["t₁/₂ = 5730 years"]
        D["t = -t₁/₂ ln(A/A₀)/ln2"]
    end
    subgraph Limits
        E["~50,000 year limit"]
    end`,
};

/**
 * Radiation Detection template
 */
export const radiationDetection: DiagramTemplate = {
  id: 'nuclear-radiation-detection',
  name: 'Radiation Detection Methods',
  description: 'Detectors for alpha, beta, gamma, and neutrons',
  domain: 'physics',
  promptTemplate: `Create a radiation detection diagram:
- Radiation type: {{radiationType}}
- Detector type: {{detectorType}}
- Detection principle: {{detectionPrinciple}}
- Energy resolution: {{energyResolution}}
- Efficiency: {{efficiency}}
- Applications: {{applications}}
{{#additionalNotes}}Spectrum analysis: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'radiationType',
    'detectorType',
    'detectionPrinciple',
    'energyResolution',
    'efficiency',
    'applications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Detectors["Detector Types"]
        A["GM Tube: counting"]
        B["Scintillator: γ spectroscopy"]
        C["HPGe: high resolution"]
        D["Proportional: neutrons"]
    end
    subgraph Matching
        G["γ → NaI, HPGe"]
        N["n → ³He, BF₃"]
    end`,
};

/**
 * Dose and Dosimetry template
 */
export const doseDosimetry: DiagramTemplate = {
  id: 'nuclear-dosimetry',
  name: 'Radiation Dose and Dosimetry',
  description: 'Radiation dose quantities and measurement',
  domain: 'physics',
  promptTemplate: `Create a dosimetry diagram:
- Absorbed dose: {{absorbedDose}}
- Equivalent dose: {{equivalentDose}}
- Effective dose: {{effectiveDose}}
- Quality factors: {{qualityFactors}}
- Dose limits: {{doseLimits}}
- Dosimeters: {{dosimeters}}
{{#additionalNotes}}ALARA principle: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'absorbedDose',
    'equivalentDose',
    'effectiveDose',
    'qualityFactors',
    'doseLimits',
    'dosimeters',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Quantities
        D["D (Gy): Energy/mass"]
        H["H (Sv): D × w_R"]
        E["E (Sv): Σ w_T × H_T"]
    end
    subgraph Limits
        OCC["Occupational: 50 mSv/yr"]
        PUB["Public: 1 mSv/yr"]
    end`,
};

/**
 * Nuclear Medicine template
 */
export const nuclearMedicine: DiagramTemplate = {
  id: 'nuclear-medicine',
  name: 'Nuclear Medicine Applications',
  description: 'Diagnostic and therapeutic nuclear medicine',
  domain: 'physics',
  promptTemplate: `Create a nuclear medicine diagram:
- Radiopharmaceutical: {{radiopharmaceutical}}
- Imaging modality: {{imagingModality}}
- Half-life considerations: {{halfLifeConsiderations}}
- Target organ: {{targetOrgan}}
- Therapeutic applications: {{therapeuticApps}}
- Dosimetry: {{dosimetry}}
{{#additionalNotes}}PET vs SPECT: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'radiopharmaceutical',
    'imagingModality',
    'halfLifeConsiderations',
    'targetOrgan',
    'therapeuticApps',
    'dosimetry',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Diagnostic
        A["⁹⁹ᵐTc: SPECT"]
        B["¹⁸F-FDG: PET"]
    end
    subgraph Therapeutic
        C["¹³¹I: Thyroid"]
        D["¹⁷⁷Lu: PRRT"]
    end
    subgraph Properties
        E["Short t₁/₂ for imaging"]
        F["β⁻ emitters for therapy"]
    end`,
};

/**
 * Particle Accelerator template
 */
export const particleAccelerator: DiagramTemplate = {
  id: 'nuclear-accelerator',
  name: 'Particle Accelerator',
  description: 'Types and principles of particle accelerators',
  domain: 'physics',
  promptTemplate: `Create a particle accelerator diagram:
- Accelerator type: {{acceleratorType}}
- Accelerating mechanism: {{acceleratingMechanism}}
- Maximum energy: {{maximumEnergy}}
- Particle type: {{particleType}}
- Applications: {{applications}}
- Beam characteristics: {{beamCharacteristics}}
{{#additionalNotes}}Synchrotron radiation: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'acceleratorType',
    'acceleratingMechanism',
    'maximumEnergy',
    'particleType',
    'applications',
    'beamCharacteristics',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Linear
        A["Linac: RF cavities"]
    end
    subgraph Circular
        B["Cyclotron: fixed B, spiral"]
        C["Synchrotron: varying B"]
    end
    subgraph Energy
        D["LHC: 13 TeV"]
    end`,
};

/**
 * Neutrino Physics template
 */
export const neutrinoPhysics: DiagramTemplate = {
  id: 'nuclear-neutrino',
  name: 'Neutrino Physics',
  description: 'Neutrino properties and oscillations',
  domain: 'physics',
  promptTemplate: `Create a neutrino physics diagram:
- Neutrino flavors: {{neutrinoFlavors}}
- Mass eigenstates: {{massEigenstates}}
- Oscillation parameters: {{oscillationParameters}}
- Detection methods: {{detectionMethods}}
- Solar neutrino problem: {{solarNeutrinoProblem}}
- Current experiments: {{currentExperiments}}
{{#additionalNotes}}Majorana vs Dirac: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'neutrinoFlavors',
    'massEigenstates',
    'oscillationParameters',
    'detectionMethods',
    'solarNeutrinoProblem',
    'currentExperiments',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Flavors
        A["νₑ, νμ, ντ"]
    end
    subgraph Oscillation
        B["Flavor ↔ Mass mixing"]
        C["P(νₑ→νμ) = sin²2θ sin²(Δm²L/4E)"]
    end
    subgraph Detection
        D["Super-K: Cherenkov"]
        E["SNO: D₂O"]
    end`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All nuclear physics templates
 */
export const nuclearTemplates: DiagramTemplate[] = [
  // Radioactive Decay
  decayChain,
  alphaDecay,
  betaDecay,
  gammaDecay,
  decayStatistics,
  // Nuclear Reactions
  nuclearFission,
  nuclearFusion,
  bindingEnergy,
  neutronCrossSection,
  nuclearQValue,
  // Reactors
  reactorCore,
  chainReaction,
  nuclearPowerPlant,
  // Particle Physics
  standardModel,
  feynmanDiagram,
  quarkModel,
  neutrinoPhysics,
  // Nuclear Structure
  nuclearShellModel,
  liquidDropModel,
  // Applications
  radiocarbonDating,
  radiationDetection,
  doseDosimetry,
  nuclearMedicine,
  particleAccelerator,
];

export default nuclearTemplates;
