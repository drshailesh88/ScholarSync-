/**
 * astronomy.ts
 * Astronomy diagram templates for FINNISH
 *
 * Contains comprehensive templates for astronomical sciences including:
 * - Celestial phenomena diagrams
 * - Research methodology flowcharts
 * - Classification systems
 * - Orbital and process illustrations
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// NATURAL PHENOMENA
// =============================================================================

/**
 * Solar System Diagram template
 */
export const solarSystemDiagram: DiagramTemplate = {
  id: 'astro-solar-system',
  name: 'Solar System Diagram',
  description: 'Comprehensive diagram of the solar system with planetary orbits and characteristics',
  domain: 'physics',
  promptTemplate: `Create a solar system diagram showing:
- Planets to include: {{planetsIncluded}}
- Orbital parameters: {{orbitalParameters}}
- Scale representation: {{scaleRepresentation}}
- Asteroid belt features: {{asteroidBelt}}
- Kuiper belt and beyond: {{kuiperBelt}}
- Notable moons: {{notableMoons}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'planetsIncluded',
    'orbitalParameters',
    'scaleRepresentation',
    'asteroidBelt',
    'kuiperBelt',
    'notableMoons',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    SUN["☀️ Sun"] --> MER["Mercury"]
    MER --> VEN["Venus"]
    VEN --> EAR["Earth"]
    EAR --> MAR["Mars"]
    MAR --> AST["Asteroid Belt"]
    AST --> JUP["Jupiter"]
    JUP --> SAT["Saturn"]
    SAT --> URA["Uranus"]
    URA --> NEP["Neptune"]
    style SUN fill:#FFD700
    style EAR fill:#228B22`,
};

/**
 * Stellar Evolution Diagram template
 */
export const stellarEvolutionDiagram: DiagramTemplate = {
  id: 'astro-stellar-evolution',
  name: 'Stellar Evolution Diagram',
  description: 'Life cycle of stars from birth to death based on initial mass',
  domain: 'physics',
  promptTemplate: `Create a stellar evolution diagram:
- Initial stellar mass: {{initialMass}}
- Main sequence duration: {{mainSequence}}
- Post-main sequence phases: {{postMainSequence}}
- Final remnant type: {{remnantType}}
- Nuclear fusion stages: {{fusionStages}}
- Key observables: {{keyObservables}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'initialMass',
    'mainSequence',
    'postMainSequence',
    'remnantType',
    'fusionStages',
    'keyObservables',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    NEB["Nebula"] --> PS["Protostar"]
    PS --> MS["Main Sequence"]
    MS --> RG["Red Giant"]
    RG -->|"Low Mass"| PN["Planetary Nebula"]
    RG -->|"High Mass"| SN["Supernova"]
    PN --> WD["White Dwarf"]
    SN --> NS["Neutron Star"]
    SN --> BH["Black Hole"]
    style NEB fill:#9370DB
    style BH fill:#000000,color:#fff`,
};

/**
 * Eclipse Geometry template
 */
export const eclipseGeometry: DiagramTemplate = {
  id: 'astro-eclipse-geometry',
  name: 'Eclipse Geometry Diagram',
  description: 'Solar and lunar eclipse mechanics and shadow geometry',
  domain: 'physics',
  promptTemplate: `Create an eclipse geometry diagram:
- Eclipse type: {{eclipseType}}
- Celestial bodies involved: {{celestialBodies}}
- Shadow components: {{shadowComponents}}
- Eclipse path: {{eclipsePath}}
- Duration factors: {{durationFactors}}
- Observation zones: {{observationZones}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'eclipseType',
    'celestialBodies',
    'shadowComponents',
    'eclipsePath',
    'durationFactors',
    'observationZones',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    SUN["Sun"] --> UMB["Umbra"]
    SUN --> PEN["Penumbra"]
    UMB --> TOT["Total Eclipse Zone"]
    PEN --> PAR["Partial Eclipse Zone"]
    subgraph Bodies["Alignment"]
        S["Sun"] --> M["Moon"] --> E["Earth"]
    end
    style SUN fill:#FFD700
    style UMB fill:#000000,color:#fff`,
};

/**
 * Galaxy Structure template
 */
export const galaxyStructure: DiagramTemplate = {
  id: 'astro-galaxy-structure',
  name: 'Galaxy Structure Diagram',
  description: 'Structural components of galaxies including spiral arms, bulge, and halo',
  domain: 'physics',
  promptTemplate: `Create a galaxy structure diagram:
- Galaxy type: {{galaxyType}}
- Core/bulge properties: {{coreProperties}}
- Disk characteristics: {{diskCharacteristics}}
- Spiral arm features: {{spiralArms}}
- Halo components: {{haloComponents}}
- Dark matter distribution: {{darkMatter}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'galaxyType',
    'coreProperties',
    'diskCharacteristics',
    'spiralArms',
    'haloComponents',
    'darkMatter',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Galaxy["Spiral Galaxy"]
        CORE["Central Bulge"]
        DISK["Galactic Disk"]
        ARMS["Spiral Arms"]
        HALO["Dark Matter Halo"]
    end
    CORE --> SMBH["Supermassive Black Hole"]
    DISK --> STARS["Star Forming Regions"]
    ARMS --> GAS["Gas & Dust"]
    style CORE fill:#FFD700
    style SMBH fill:#000000,color:#fff`,
};

// =============================================================================
// RESEARCH METHODOLOGIES
// =============================================================================

/**
 * Spectroscopic Analysis Workflow template
 */
export const spectroscopicAnalysis: DiagramTemplate = {
  id: 'astro-spectroscopy-workflow',
  name: 'Spectroscopic Analysis Workflow',
  description: 'Astronomical spectroscopy data collection and analysis process',
  domain: 'physics',
  promptTemplate: `Create a spectroscopic analysis workflow:
- Target object type: {{targetType}}
- Spectral range: {{spectralRange}}
- Instrument configuration: {{instrumentConfig}}
- Calibration procedures: {{calibration}}
- Analysis techniques: {{analysisTechniques}}
- Derived parameters: {{derivedParameters}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'targetType',
    'spectralRange',
    'instrumentConfig',
    'calibration',
    'analysisTechniques',
    'derivedParameters',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    OBS["Observation"] --> RAW["Raw Spectra"]
    RAW --> CAL["Wavelength Calibration"]
    CAL --> FLUX["Flux Calibration"]
    FLUX --> NORM["Continuum Normalization"]
    NORM --> LINE["Line Identification"]
    LINE --> PARAM["Physical Parameters"]
    PARAM --> RV["Radial Velocity"]
    PARAM --> COMP["Composition"]
    style OBS fill:#4169E1
    style PARAM fill:#228B22`,
};

/**
 * Exoplanet Detection Methods template
 */
export const exoplanetDetection: DiagramTemplate = {
  id: 'astro-exoplanet-detection',
  name: 'Exoplanet Detection Methods',
  description: 'Flowchart of various exoplanet detection techniques and their applications',
  domain: 'physics',
  promptTemplate: `Create an exoplanet detection methods diagram:
- Detection method: {{detectionMethod}}
- Sensitivity range: {{sensitivityRange}}
- Orbital parameters detected: {{orbitalParameters}}
- Planet types detectable: {{planetTypes}}
- Confirmation techniques: {{confirmationTechniques}}
- Key missions: {{keyMissions}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'detectionMethod',
    'sensitivityRange',
    'orbitalParameters',
    'planetTypes',
    'confirmationTechniques',
    'keyMissions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    DET["Detection Methods"] --> RV["Radial Velocity"]
    DET --> TR["Transit Photometry"]
    DET --> DI["Direct Imaging"]
    DET --> ML["Microlensing"]
    TR --> KEPLER["Kepler/TESS"]
    RV --> HARPS["HARPS/ESPRESSO"]
    DI --> JWST["JWST/ELT"]
    style DET fill:#4169E1
    style TR fill:#228B22`,
};

/**
 * Radio Astronomy Observation template
 */
export const radioAstronomyObs: DiagramTemplate = {
  id: 'astro-radio-observation',
  name: 'Radio Astronomy Observation',
  description: 'Radio telescope observation and data processing pipeline',
  domain: 'physics',
  promptTemplate: `Create a radio astronomy observation flowchart:
- Observation target: {{observationTarget}}
- Frequency band: {{frequencyBand}}
- Array configuration: {{arrayConfiguration}}
- Correlation process: {{correlationProcess}}
- Imaging techniques: {{imagingTechniques}}
- Scientific products: {{scientificProducts}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'observationTarget',
    'frequencyBand',
    'arrayConfiguration',
    'correlationProcess',
    'imagingTechniques',
    'scientificProducts',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    ANT["Antenna Array"] --> CORR["Correlator"]
    CORR --> VIS["Visibility Data"]
    VIS --> CAL["Calibration"]
    CAL --> IMG["Imaging"]
    IMG --> CLN["CLEAN Deconvolution"]
    CLN --> MAP["Final Map"]
    style ANT fill:#4169E1
    style MAP fill:#228B22`,
};

// =============================================================================
// CLASSIFICATION SYSTEMS
// =============================================================================

/**
 * Stellar Classification template
 */
export const stellarClassification: DiagramTemplate = {
  id: 'astro-stellar-classification',
  name: 'Stellar Classification System',
  description: 'Morgan-Keenan spectral classification and Hertzsprung-Russell diagram',
  domain: 'physics',
  promptTemplate: `Create a stellar classification diagram:
- Spectral types: {{spectralTypes}}
- Luminosity classes: {{luminosityClasses}}
- Temperature range: {{temperatureRange}}
- HR diagram position: {{hrPosition}}
- Stellar properties: {{stellarProperties}}
- Example stars: {{exampleStars}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'spectralTypes',
    'luminosityClasses',
    'temperatureRange',
    'hrPosition',
    'stellarProperties',
    'exampleStars',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    SPEC["Spectral Classification"] --> O["O - Hot Blue"]
    SPEC --> B["B - Blue"]
    SPEC --> A["A - White"]
    SPEC --> F["F - Yellow-White"]
    SPEC --> G["G - Yellow (Sun)"]
    SPEC --> K["K - Orange"]
    SPEC --> M["M - Red"]
    style O fill:#0000FF,color:#fff
    style G fill:#FFD700
    style M fill:#DC143C`,
};

/**
 * Galaxy Classification template
 */
export const galaxyClassification: DiagramTemplate = {
  id: 'astro-galaxy-classification',
  name: 'Galaxy Classification System',
  description: 'Hubble tuning fork galaxy morphological classification',
  domain: 'physics',
  promptTemplate: `Create a galaxy classification diagram:
- Morphological types: {{morphologicalTypes}}
- Elliptical sequence: {{ellipticalSequence}}
- Spiral subtypes: {{spiralSubtypes}}
- Barred vs unbarred: {{barredVsUnbarred}}
- Irregular galaxies: {{irregularGalaxies}}
- Physical correlations: {{physicalCorrelations}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'morphologicalTypes',
    'ellipticalSequence',
    'spiralSubtypes',
    'barredVsUnbarred',
    'irregularGalaxies',
    'physicalCorrelations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    E["Elliptical"] --> E0["E0"]
    E --> E7["E7"]
    E7 --> S0["S0 Lenticular"]
    S0 --> SA["Sa Spiral"]
    S0 --> SB["SBa Barred"]
    SA --> SB_["Sb"] --> SC["Sc"]
    SB --> SBB["SBb"] --> SBC["SBc"]
    style E fill:#FFD700
    style SA fill:#4169E1`,
};

/**
 * Asteroid Classification template
 */
export const asteroidClassification: DiagramTemplate = {
  id: 'astro-asteroid-classification',
  name: 'Asteroid Classification System',
  description: 'Taxonomic classification of asteroids based on spectral properties',
  domain: 'physics',
  promptTemplate: `Create an asteroid classification diagram:
- Spectral classes: {{spectralClasses}}
- Composition indicators: {{compositionIndicators}}
- Albedo ranges: {{albedoRanges}}
- Orbital families: {{orbitalFamilies}}
- Size distribution: {{sizeDistribution}}
- Notable examples: {{notableExamples}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'spectralClasses',
    'compositionIndicators',
    'albedoRanges',
    'orbitalFamilies',
    'sizeDistribution',
    'notableExamples',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    AST["Asteroids"] --> C["C-type (Carbonaceous)"]
    AST --> S["S-type (Silicaceous)"]
    AST --> M["M-type (Metallic)"]
    C --> CB["75% of population"]
    S --> SB["17% of population"]
    M --> MB["8% of population"]
    style C fill:#8B4513
    style S fill:#DAA520
    style M fill:#C0C0C0`,
};

// =============================================================================
// PROCESS FLOWS
// =============================================================================

/**
 * Orbital Mechanics template
 */
export const orbitalMechanics: DiagramTemplate = {
  id: 'astro-orbital-mechanics',
  name: 'Orbital Mechanics Diagram',
  description: 'Kepler orbital elements and orbital maneuvers',
  domain: 'physics',
  promptTemplate: `Create an orbital mechanics diagram:
- Orbital elements: {{orbitalElements}}
- Orbit type: {{orbitType}}
- Perturbations: {{perturbations}}
- Maneuver types: {{maneuverTypes}}
- Delta-V requirements: {{deltaVRequirements}}
- Mission phases: {{missionPhases}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'orbitalElements',
    'orbitType',
    'perturbations',
    'maneuverTypes',
    'deltaVRequirements',
    'missionPhases',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    LAUNCH["Launch"] --> LEO["Low Earth Orbit"]
    LEO --> TLI["Trans-Lunar Injection"]
    TLI --> COAST["Coast Phase"]
    COAST --> LOI["Lunar Orbit Insertion"]
    LOI --> LLO["Low Lunar Orbit"]
    LLO --> DESC["Descent"]
    style LAUNCH fill:#DC143C
    style LLO fill:#C0C0C0`,
};

/**
 * Planetary Formation template
 */
export const planetaryFormation: DiagramTemplate = {
  id: 'astro-planetary-formation',
  name: 'Planetary Formation Process',
  description: 'Stages of planet formation from protoplanetary disk to mature system',
  domain: 'physics',
  promptTemplate: `Create a planetary formation diagram:
- Disk properties: {{diskProperties}}
- Dust coagulation: {{dustCoagulation}}
- Planetesimal formation: {{planetesimalFormation}}
- Core accretion: {{coreAccretion}}
- Gas capture: {{gasCapture}}
- System evolution: {{systemEvolution}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'diskProperties',
    'dustCoagulation',
    'planetesimalFormation',
    'coreAccretion',
    'gasCapture',
    'systemEvolution',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    CLOUD["Molecular Cloud"] --> DISK["Protoplanetary Disk"]
    DISK --> DUST["Dust Grains"]
    DUST --> PEBB["Pebbles"]
    PEBB --> PLAN["Planetesimals"]
    PLAN --> EMB["Planetary Embryos"]
    EMB --> TER["Terrestrial Planets"]
    EMB --> GAS["Gas Giants"]
    style CLOUD fill:#9370DB
    style TER fill:#228B22`,
};

/**
 * Supernova Explosion template
 */
export const supernovaExplosion: DiagramTemplate = {
  id: 'astro-supernova-explosion',
  name: 'Supernova Explosion Process',
  description: 'Core-collapse and Type Ia supernova mechanisms',
  domain: 'physics',
  promptTemplate: `Create a supernova explosion diagram:
- Supernova type: {{supernovaType}}
- Progenitor star: {{progenitorStar}}
- Core collapse mechanism: {{collapseNeChanism}}
- Explosion energy: {{explosionEnergy}}
- Nucleosynthesis products: {{nucleosynthesis}}
- Remnant type: {{remnantType}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'supernovaType',
    'progenitorStar',
    'collapseMechanism',
    'explosionEnergy',
    'nucleosynthesis',
    'remnantType',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    STAR["Massive Star"] --> CORE["Iron Core"]
    CORE --> COLLAPSE["Core Collapse"]
    COLLAPSE --> BOUNCE["Bounce"]
    BOUNCE --> SHOCK["Shock Wave"]
    SHOCK --> EXPLOSION["Supernova Explosion"]
    EXPLOSION --> REM["Neutron Star/Black Hole"]
    EXPLOSION --> NEB["Supernova Remnant"]
    style EXPLOSION fill:#DC143C
    style REM fill:#000000,color:#fff`,
};

/**
 * Cosmic Distance Ladder template
 */
export const cosmicDistanceLadder: DiagramTemplate = {
  id: 'astro-distance-ladder',
  name: 'Cosmic Distance Ladder',
  description: 'Hierarchical methods for measuring astronomical distances',
  domain: 'physics',
  promptTemplate: `Create a cosmic distance ladder diagram:
- Distance methods: {{distanceMethods}}
- Applicable ranges: {{applicableRanges}}
- Standard candles: {{standardCandles}}
- Calibration steps: {{calibrationSteps}}
- Uncertainties: {{uncertainties}}
- Key results: {{keyResults}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'distanceMethods',
    'applicableRanges',
    'standardCandles',
    'calibrationSteps',
    'uncertainties',
    'keyResults',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    PAR["Parallax"] -->|"<100 pc"| MAIN["Main Sequence Fitting"]
    MAIN -->|"<10 kpc"| CEPH["Cepheid Variables"]
    CEPH -->|"<30 Mpc"| TRGB["Tip of RGB"]
    TRGB -->|"<100 Mpc"| SNIa["Type Ia Supernovae"]
    SNIa -->|">100 Mpc"| HUBBLE["Hubble Law"]
    style PAR fill:#4169E1
    style SNIa fill:#DC143C`,
};

/**
 * Black Hole Anatomy template
 */
export const blackHoleAnatomy: DiagramTemplate = {
  id: 'astro-black-hole-anatomy',
  name: 'Black Hole Anatomy',
  description: 'Structural components and physics of black holes',
  domain: 'physics',
  promptTemplate: `Create a black hole anatomy diagram:
- Black hole type: {{blackHoleType}}
- Event horizon: {{eventHorizon}}
- Accretion disk: {{accretionDisk}}
- Jets and outflows: {{jetsOutflows}}
- Ergosphere: {{ergosphere}}
- Observable signatures: {{observableSignatures}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'blackHoleType',
    'eventHorizon',
    'accretionDisk',
    'jetsOutflows',
    'ergosphere',
    'observableSignatures',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph BH["Black Hole Structure"]
        SING["Singularity"]
        EH["Event Horizon"]
        ERGO["Ergosphere"]
        DISK["Accretion Disk"]
        JET["Relativistic Jets"]
    end
    DISK --> XRAY["X-ray Emission"]
    JET --> RADIO["Radio Emission"]
    style SING fill:#000000,color:#fff
    style JET fill:#DC143C`,
};

/**
 * Hubble Deep Field Analysis template
 */
export const hubbleDeepField: DiagramTemplate = {
  id: 'astro-deep-field-analysis',
  name: 'Deep Field Analysis Workflow',
  description: 'Analysis pipeline for deep field imaging surveys',
  domain: 'physics',
  promptTemplate: `Create a deep field analysis workflow:
- Survey parameters: {{surveyParameters}}
- Exposure strategy: {{exposureStrategy}}
- Source detection: {{sourceDetection}}
- Photometric redshifts: {{photometricRedshifts}}
- Galaxy properties: {{galaxyProperties}}
- Scientific goals: {{scientificGoals}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'surveyParameters',
    'exposureStrategy',
    'sourceDetection',
    'photometricRedshifts',
    'galaxyProperties',
    'scientificGoals',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    IMG["Deep Images"] --> STACK["Image Stacking"]
    STACK --> DET["Source Detection"]
    DET --> PHOT["Photometry"]
    PHOT --> SED["SED Fitting"]
    SED --> Z["Redshift Estimation"]
    Z --> CAT["Galaxy Catalog"]
    CAT --> STATS["Statistical Analysis"]
    style IMG fill:#4169E1
    style CAT fill:#228B22`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All astronomy templates
 */
export const astronomyTemplates: DiagramTemplate[] = [
  // Natural Phenomena
  solarSystemDiagram,
  stellarEvolutionDiagram,
  eclipseGeometry,
  galaxyStructure,
  // Research Methodologies
  spectroscopicAnalysis,
  exoplanetDetection,
  radioAstronomyObs,
  // Classification Systems
  stellarClassification,
  galaxyClassification,
  asteroidClassification,
  // Process Flows
  orbitalMechanics,
  planetaryFormation,
  supernovaExplosion,
  cosmicDistanceLadder,
  blackHoleAnatomy,
  hubbleDeepField,
];

export default astronomyTemplates;
