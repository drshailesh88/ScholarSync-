/**
 * geology.ts
 * Geology diagram templates for FINNISH
 *
 * Contains comprehensive templates for geological sciences including:
 * - Natural phenomena diagrams
 * - Research methodology flowcharts
 * - Classification systems
 * - Process flow illustrations
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// NATURAL PHENOMENA
// =============================================================================

/**
 * Rock Cycle Diagram template
 */
export const rockCycleDiagram: DiagramTemplate = {
  id: 'geo-rock-cycle',
  name: 'Rock Cycle Diagram',
  description: 'Comprehensive rock cycle showing transformations between igneous, sedimentary, and metamorphic rocks',
  domain: 'physics',
  promptTemplate: `Create a rock cycle diagram showing:
- Igneous rock types: {{igneousTypes}}
- Sedimentary rock types: {{sedimentaryTypes}}
- Metamorphic rock types: {{metamorphicTypes}}
- Weathering processes: {{weatheringProcesses}}
- Heat and pressure conditions: {{heatPressure}}
- Melting and cooling: {{meltingCooling}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'igneousTypes',
    'sedimentaryTypes',
    'metamorphicTypes',
    'weatheringProcesses',
    'heatPressure',
    'meltingCooling',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Surface["Surface Processes"]
        W["Weathering & Erosion"]
        S["Sedimentation"]
    end
    subgraph RockTypes["Rock Types"]
        IG["Igneous Rock"]
        SED["Sedimentary Rock"]
        MET["Metamorphic Rock"]
        MAG["Magma"]
    end
    IG -->|"Weathering"| W
    W -->|"Transport"| S
    S -->|"Compaction"| SED
    SED -->|"Heat & Pressure"| MET
    MET -->|"Melting"| MAG
    MAG -->|"Cooling"| IG
    style IG fill:#DC143C
    style SED fill:#DAA520
    style MET fill:#4169E1`,
};

/**
 * Plate Tectonics Diagram template
 */
export const plateTectonicsDiagram: DiagramTemplate = {
  id: 'geo-plate-tectonics',
  name: 'Plate Tectonics Diagram',
  description: 'Plate boundary interactions and tectonic processes',
  domain: 'physics',
  promptTemplate: `Create a plate tectonics diagram showing:
- Plate boundary type: {{boundaryType}}
- Plates involved: {{platesInvolved}}
- Movement direction: {{movementDirection}}
- Rate of movement: {{movementRate}}
- Associated features: {{associatedFeatures}}
- Geological hazards: {{hazards}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'boundaryType',
    'platesInvolved',
    'movementDirection',
    'movementRate',
    'associatedFeatures',
    'hazards',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Convergent["Convergent Boundary"]
        OP["Oceanic Plate"] -->|"Subduction"| TR["Trench"]
        TR --> VOL["Volcanic Arc"]
        CP["Continental Plate"] --> MTN["Mountain Range"]
    end
    subgraph Divergent["Divergent Boundary"]
        MOR["Mid-Ocean Ridge"]
        P1["Plate 1"] <-->|"Spreading"| P2["Plate 2"]
    end
    style TR fill:#4169E1
    style VOL fill:#DC143C`,
};

/**
 * Volcanic Eruption Process template
 */
export const volcanicEruptionProcess: DiagramTemplate = {
  id: 'geo-volcanic-eruption',
  name: 'Volcanic Eruption Process',
  description: 'Stages and mechanisms of volcanic eruptions',
  domain: 'physics',
  promptTemplate: `Create a volcanic eruption process diagram:
- Volcano type: {{volcanoType}}
- Magma composition: {{magmaComposition}}
- Eruption style: {{eruptionStyle}}
- Volcanic products: {{volcanicProducts}}
- Hazard zones: {{hazardZones}}
- Warning signs: {{warningSigns}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'volcanoType',
    'magmaComposition',
    'eruptionStyle',
    'volcanicProducts',
    'hazardZones',
    'warningSigns',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    MC["Magma Chamber"] --> C["Conduit"]
    C --> V["Vent"]
    V --> E["Eruption"]
    E --> ASH["Ash Cloud"]
    E --> LAVA["Lava Flow"]
    E --> PY["Pyroclastic Flow"]
    subgraph Hazards["Hazard Zones"]
        Z1["Proximal Zone"]
        Z2["Medial Zone"]
        Z3["Distal Zone"]
    end
    style E fill:#DC143C
    style PY fill:#FF4500`,
};

/**
 * Earthquake Mechanism template
 */
export const earthquakeMechanism: DiagramTemplate = {
  id: 'geo-earthquake-mechanism',
  name: 'Earthquake Mechanism',
  description: 'Fault mechanics and seismic wave propagation',
  domain: 'physics',
  promptTemplate: `Create an earthquake mechanism diagram:
- Fault type: {{faultType}}
- Focus depth: {{focusDepth}}
- Epicenter location: {{epicenterLocation}}
- Wave types: {{waveTypes}}
- Magnitude scale: {{magnitudeScale}}
- Intensity effects: {{intensityEffects}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'faultType',
    'focusDepth',
    'epicenterLocation',
    'waveTypes',
    'magnitudeScale',
    'intensityEffects',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Source["Earthquake Source"]
        F["Focus/Hypocenter"]
        E["Epicenter"]
    end
    F --> PW["P-Waves"]
    F --> SW["S-Waves"]
    PW & SW --> SUR["Surface"]
    SUR --> LW["Love Waves"]
    SUR --> RW["Rayleigh Waves"]
    E -->|"Distance"| IS["Intensity Zones"]
    style F fill:#DC143C
    style E fill:#FFA500`,
};

// =============================================================================
// RESEARCH METHODOLOGIES
// =============================================================================

/**
 * Geological Mapping Workflow template
 */
export const geologicalMappingWorkflow: DiagramTemplate = {
  id: 'geo-mapping-workflow',
  name: 'Geological Mapping Workflow',
  description: 'Field mapping methodology and data collection process',
  domain: 'physics',
  promptTemplate: `Create a geological mapping workflow:
- Study area: {{studyArea}}
- Base map type: {{baseMapType}}
- Field observations: {{fieldObservations}}
- Sampling strategy: {{samplingStrategy}}
- Analytical methods: {{analyticalMethods}}
- Map products: {{mapProducts}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'studyArea',
    'baseMapType',
    'fieldObservations',
    'samplingStrategy',
    'analyticalMethods',
    'mapProducts',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Desktop Study"] --> B["Field Reconnaissance"]
    B --> C["Systematic Mapping"]
    C --> D["Sample Collection"]
    D --> E["Laboratory Analysis"]
    E --> F["Data Integration"]
    F --> G["Map Compilation"]
    G --> H["Report Generation"]
    style A fill:#4169E1
    style G fill:#228B22`,
};

/**
 * Geochronology Dating Methods template
 */
export const geochronologyMethods: DiagramTemplate = {
  id: 'geo-dating-methods',
  name: 'Geochronology Dating Methods',
  description: 'Radiometric and relative dating technique selection',
  domain: 'physics',
  promptTemplate: `Create a geochronology methods flowchart:
- Sample type: {{sampleType}}
- Age range expected: {{ageRange}}
- Dating methods available: {{datingMethods}}
- Isotope systems: {{isotopeSystems}}
- Precision requirements: {{precisionRequirements}}
- Validation approach: {{validationApproach}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'sampleType',
    'ageRange',
    'datingMethods',
    'isotopeSystems',
    'precisionRequirements',
    'validationApproach',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    S["Sample"] --> A{"Age Range?"}
    A -->|"<50 ka"| C14["Carbon-14"]
    A -->|"50 ka - 1 Ma"| AR["Ar-Ar Dating"]
    A -->|">1 Ma"| UPB["U-Pb Dating"]
    A -->|"Relative"| REL["Stratigraphy"]
    C14 & AR & UPB --> VAL["Cross-Validation"]
    style S fill:#DAA520
    style VAL fill:#228B22`,
};

/**
 * Seismic Survey Methodology template
 */
export const seismicSurveyMethod: DiagramTemplate = {
  id: 'geo-seismic-survey',
  name: 'Seismic Survey Methodology',
  description: 'Seismic data acquisition and processing workflow',
  domain: 'physics',
  promptTemplate: `Create a seismic survey methodology diagram:
- Survey type: {{surveyType}}
- Source configuration: {{sourceConfiguration}}
- Receiver layout: {{receiverLayout}}
- Processing steps: {{processingSteps}}
- Interpretation approach: {{interpretationApproach}}
- Deliverables: {{deliverables}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'surveyType',
    'sourceConfiguration',
    'receiverLayout',
    'processingSteps',
    'interpretationApproach',
    'deliverables',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    ACQ["Data Acquisition"] --> QC["Quality Control"]
    QC --> PRE["Pre-processing"]
    PRE --> MIG["Migration"]
    MIG --> STK["Stacking"]
    STK --> INT["Interpretation"]
    INT --> MOD["3D Model"]
    style ACQ fill:#4169E1
    style MOD fill:#228B22`,
};

// =============================================================================
// CLASSIFICATION SYSTEMS
// =============================================================================

/**
 * Rock Classification Scheme template
 */
export const rockClassification: DiagramTemplate = {
  id: 'geo-rock-classification',
  name: 'Rock Classification Scheme',
  description: 'Systematic classification of rock types based on origin and composition',
  domain: 'physics',
  promptTemplate: `Create a rock classification diagram:
- Rock category: {{rockCategory}}
- Classification criteria: {{classificationCriteria}}
- Texture descriptions: {{textureDescriptions}}
- Mineral composition: {{mineralComposition}}
- Formation environment: {{formationEnvironment}}
- Examples: {{examples}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'rockCategory',
    'classificationCriteria',
    'textureDescriptions',
    'mineralComposition',
    'formationEnvironment',
    'examples',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    R["Rocks"] --> IG["Igneous"]
    R --> SED["Sedimentary"]
    R --> MET["Metamorphic"]
    IG --> INT["Intrusive"]
    IG --> EXT["Extrusive"]
    SED --> CLAS["Clastic"]
    SED --> CHEM["Chemical"]
    MET --> FOL["Foliated"]
    MET --> NFOL["Non-foliated"]
    style IG fill:#DC143C
    style SED fill:#DAA520
    style MET fill:#4169E1`,
};

/**
 * Mineral Identification Key template
 */
export const mineralIdentificationKey: DiagramTemplate = {
  id: 'geo-mineral-id-key',
  name: 'Mineral Identification Key',
  description: 'Dichotomous key for mineral identification based on physical properties',
  domain: 'physics',
  promptTemplate: `Create a mineral identification key:
- Target mineral group: {{mineralGroup}}
- Physical properties: {{physicalProperties}}
- Hardness range: {{hardnessRange}}
- Luster types: {{lusterTypes}}
- Crystal systems: {{crystalSystems}}
- Diagnostic features: {{diagnosticFeatures}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'mineralGroup',
    'physicalProperties',
    'hardnessRange',
    'lusterTypes',
    'crystalSystems',
    'diagnosticFeatures',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    M["Unknown Mineral"] --> H{"Hardness?"}
    H -->|"<2.5"| SOFT["Soft Minerals"]
    H -->|"2.5-5.5"| MED["Medium Hardness"]
    H -->|">5.5"| HARD["Hard Minerals"]
    SOFT --> L1{"Luster?"}
    L1 -->|"Metallic"| GAL["Galena?"]
    L1 -->|"Non-metallic"| GYP["Gypsum?"]
    style M fill:#DAA520
    style GAL fill:#808080`,
};

/**
 * Fossil Classification template
 */
export const fossilClassification: DiagramTemplate = {
  id: 'geo-fossil-classification',
  name: 'Fossil Classification System',
  description: 'Taxonomic classification of fossils by phylum and preservation type',
  domain: 'physics',
  promptTemplate: `Create a fossil classification diagram:
- Fossil group: {{fossilGroup}}
- Preservation type: {{preservationType}}
- Geological period: {{geologicalPeriod}}
- Taxonomic hierarchy: {{taxonomicHierarchy}}
- Index fossil criteria: {{indexFossilCriteria}}
- Paleoenvironment indicators: {{paleoenvironmentIndicators}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'fossilGroup',
    'preservationType',
    'geologicalPeriod',
    'taxonomicHierarchy',
    'indexFossilCriteria',
    'paleoenvironmentIndicators',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    F["Fossils"] --> INV["Invertebrates"]
    F --> VER["Vertebrates"]
    F --> PL["Plants"]
    F --> TR["Trace Fossils"]
    INV --> TRI["Trilobites"]
    INV --> AMM["Ammonites"]
    INV --> BRA["Brachiopods"]
    style F fill:#DAA520
    style TRI fill:#8B4513`,
};

// =============================================================================
// PROCESS FLOWS
// =============================================================================

/**
 * Sedimentary Basin Evolution template
 */
export const sedimentaryBasinEvolution: DiagramTemplate = {
  id: 'geo-basin-evolution',
  name: 'Sedimentary Basin Evolution',
  description: 'Stages of sedimentary basin formation and fill',
  domain: 'physics',
  promptTemplate: `Create a sedimentary basin evolution diagram:
- Basin type: {{basinType}}
- Tectonic setting: {{tectonicSetting}}
- Subsidence mechanism: {{subsidenceMechanism}}
- Depositional environments: {{depositionalEnvironments}}
- Stratigraphic sequences: {{stratigraphicSequences}}
- Petroleum potential: {{petroleumPotential}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'basinType',
    'tectonicSetting',
    'subsidenceMechanism',
    'depositionalEnvironments',
    'stratigraphicSequences',
    'petroleumPotential',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    RIFT["Rift Initiation"] --> SUB["Thermal Subsidence"]
    SUB --> FILL["Basin Fill"]
    FILL --> SED1["Syn-rift Sediments"]
    FILL --> SED2["Post-rift Sediments"]
    SED1 & SED2 --> MAT["Maturation"]
    MAT --> HC["Hydrocarbon Generation"]
    style RIFT fill:#DC143C
    style HC fill:#228B22`,
};

/**
 * Ore Deposit Formation template
 */
export const oreDepositFormation: DiagramTemplate = {
  id: 'geo-ore-formation',
  name: 'Ore Deposit Formation Process',
  description: 'Genetic processes leading to ore deposit formation',
  domain: 'physics',
  promptTemplate: `Create an ore deposit formation diagram:
- Deposit type: {{depositType}}
- Metal commodities: {{metalCommodities}}
- Source of metals: {{metalSource}}
- Transport mechanism: {{transportMechanism}}
- Precipitation triggers: {{precipitationTriggers}}
- Host rock associations: {{hostRockAssociations}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'depositType',
    'metalCommodities',
    'metalSource',
    'transportMechanism',
    'precipitationTriggers',
    'hostRockAssociations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    MAG["Magmatic Source"] --> HYD["Hydrothermal Fluids"]
    HYD --> TRAN["Fluid Transport"]
    TRAN --> TRAP["Structural Trap"]
    TRAP --> PRECIP["Metal Precipitation"]
    PRECIP --> ORE["Ore Body"]
    style MAG fill:#DC143C
    style ORE fill:#FFD700`,
};

/**
 * Glacial Process Diagram template
 */
export const glacialProcessDiagram: DiagramTemplate = {
  id: 'geo-glacial-process',
  name: 'Glacial Process Diagram',
  description: 'Glacial erosion, transport, and deposition processes',
  domain: 'physics',
  promptTemplate: `Create a glacial process diagram:
- Glacier type: {{glacierType}}
- Erosion features: {{erosionFeatures}}
- Transport mechanisms: {{transportMechanisms}}
- Depositional landforms: {{depositionalLandforms}}
- Meltwater features: {{meltwaterFeatures}}
- Climatic controls: {{climaticControls}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'glacierType',
    'erosionFeatures',
    'transportMechanisms',
    'depositionalLandforms',
    'meltwaterFeatures',
    'climaticControls',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    ACC["Accumulation Zone"] --> FLOW["Ice Flow"]
    FLOW --> ABL["Ablation Zone"]
    FLOW --> ER["Erosion"]
    ER --> CIR["Cirques"]
    ER --> UV["U-Valleys"]
    ABL --> DEP["Deposition"]
    DEP --> MOR["Moraines"]
    DEP --> TILL["Till"]
    style ACC fill:#4169E1
    style ABL fill:#87CEEB`,
};

/**
 * Groundwater Flow System template
 */
export const groundwaterFlowSystem: DiagramTemplate = {
  id: 'geo-groundwater-flow',
  name: 'Groundwater Flow System',
  description: 'Aquifer systems and groundwater movement patterns',
  domain: 'physics',
  promptTemplate: `Create a groundwater flow system diagram:
- Aquifer type: {{aquiferType}}
- Recharge zones: {{rechargeZones}}
- Flow paths: {{flowPaths}}
- Discharge areas: {{dischargeAreas}}
- Confining layers: {{confiningLayers}}
- Contamination risks: {{contaminationRisks}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'aquiferType',
    'rechargeZones',
    'flowPaths',
    'dischargeAreas',
    'confiningLayers',
    'contaminationRisks',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    PREC["Precipitation"] --> RECH["Recharge Zone"]
    RECH --> WT["Water Table"]
    WT --> AQ["Aquifer"]
    AQ --> FLOW["Groundwater Flow"]
    FLOW --> DIS["Discharge"]
    DIS --> SPR["Springs"]
    DIS --> WEL["Wells"]
    style RECH fill:#4169E1
    style DIS fill:#228B22`,
};

/**
 * Stratigraphic Column template
 */
export const stratigraphicColumn: DiagramTemplate = {
  id: 'geo-strat-column',
  name: 'Stratigraphic Column',
  description: 'Vertical representation of rock units and geological time',
  domain: 'physics',
  promptTemplate: `Create a stratigraphic column:
- Formation names: {{formationNames}}
- Rock types: {{rockTypes}}
- Thicknesses: {{thicknesses}}
- Age constraints: {{ageConstraints}}
- Fossil content: {{fossilContent}}
- Depositional environments: {{depositionalEnvironments}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'formationNames',
    'rockTypes',
    'thicknesses',
    'ageConstraints',
    'fossilContent',
    'depositionalEnvironments',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Column["Stratigraphic Column"]
        Q["Quaternary - Alluvium"]
        T["Tertiary - Sandstone"]
        K["Cretaceous - Limestone"]
        J["Jurassic - Shale"]
        TR["Triassic - Red Beds"]
    end
    Q --> T --> K --> J --> TR
    style Q fill:#FFFFE0
    style K fill:#87CEEB`,
};

/**
 * Weathering Process template
 */
export const weatheringProcess: DiagramTemplate = {
  id: 'geo-weathering-process',
  name: 'Weathering Process Diagram',
  description: 'Physical, chemical, and biological weathering mechanisms',
  domain: 'physics',
  promptTemplate: `Create a weathering process diagram:
- Weathering type: {{weatheringType}}
- Rock type affected: {{rockTypeAffected}}
- Climatic factors: {{climaticFactors}}
- Products formed: {{productsFormed}}
- Rate controlling factors: {{rateFactors}}
- Soil development: {{soilDevelopment}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'weatheringType',
    'rockTypeAffected',
    'climaticFactors',
    'productsFormed',
    'rateFactors',
    'soilDevelopment',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    R["Parent Rock"] --> W["Weathering"]
    W --> PH["Physical"]
    W --> CH["Chemical"]
    W --> BI["Biological"]
    PH --> FRAG["Fragmentation"]
    CH --> DIS["Dissolution"]
    BI --> ROOT["Root Action"]
    FRAG & DIS & ROOT --> SOIL["Soil Formation"]
    style R fill:#808080
    style SOIL fill:#8B4513`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All geology templates
 */
export const geologyTemplates: DiagramTemplate[] = [
  // Natural Phenomena
  rockCycleDiagram,
  plateTectonicsDiagram,
  volcanicEruptionProcess,
  earthquakeMechanism,
  // Research Methodologies
  geologicalMappingWorkflow,
  geochronologyMethods,
  seismicSurveyMethod,
  // Classification Systems
  rockClassification,
  mineralIdentificationKey,
  fossilClassification,
  // Process Flows
  sedimentaryBasinEvolution,
  oreDepositFormation,
  glacialProcessDiagram,
  groundwaterFlowSystem,
  stratigraphicColumn,
  weatheringProcess,
];

export default geologyTemplates;
