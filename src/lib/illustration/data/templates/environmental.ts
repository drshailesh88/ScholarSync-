/**
 * environmental.ts
 * Environmental Science diagram templates for FINNISH
 *
 * Contains comprehensive templates for environmental sciences including:
 * - Climate and ecosystem diagrams
 * - Research methodology flowcharts
 * - Classification systems
 * - Environmental process flows
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// NATURAL PHENOMENA
// =============================================================================

/**
 * Global Carbon Cycle template
 */
export const globalCarbonCycle: DiagramTemplate = {
  id: 'env-carbon-cycle',
  name: 'Global Carbon Cycle Diagram',
  description: 'Comprehensive diagram of carbon reservoirs and fluxes in the Earth system',
  domain: 'biology',
  promptTemplate: `Create a global carbon cycle diagram showing:
- Carbon reservoirs: {{carbonReservoirs}}
- Atmospheric CO2 levels: {{atmosphericCO2}}
- Ocean-atmosphere exchange: {{oceanAtmosphere}}
- Terrestrial processes: {{terrestrialProcesses}}
- Anthropogenic impacts: {{anthropogenicImpacts}}
- Feedback mechanisms: {{feedbackMechanisms}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'carbonReservoirs',
    'atmosphericCO2',
    'oceanAtmosphere',
    'terrestrialProcesses',
    'anthropogenicImpacts',
    'feedbackMechanisms',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    ATM["Atmosphere"] <-->|"Photosynthesis/Respiration"| VEG["Vegetation"]
    ATM <-->|"Gas Exchange"| OCE["Ocean"]
    VEG --> SOIL["Soil Carbon"]
    SOIL --> ATM
    OCE --> DEEP["Deep Ocean"]
    FOSSIL["Fossil Fuels"] -->|"Combustion"| ATM
    style ATM fill:#87CEEB
    style FOSSIL fill:#000000,color:#fff`,
};

/**
 * Water Cycle Diagram template
 */
export const waterCycleDiagram: DiagramTemplate = {
  id: 'env-water-cycle',
  name: 'Hydrological Cycle Diagram',
  description: 'Complete water cycle showing evaporation, precipitation, and runoff processes',
  domain: 'biology',
  promptTemplate: `Create a water cycle diagram showing:
- Evaporation sources: {{evaporationSources}}
- Precipitation types: {{precipitationTypes}}
- Runoff pathways: {{runoffPathways}}
- Groundwater flow: {{groundwaterFlow}}
- Human modifications: {{humanModifications}}
- Residence times: {{residenceTimes}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'evaporationSources',
    'precipitationTypes',
    'runoffPathways',
    'groundwaterFlow',
    'humanModifications',
    'residenceTimes',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    OCE["Ocean"] -->|"Evaporation"| ATM["Atmosphere"]
    ATM -->|"Precipitation"| LAND["Land"]
    LAND -->|"Runoff"| RIV["Rivers"]
    LAND -->|"Infiltration"| GW["Groundwater"]
    RIV --> OCE
    GW --> OCE
    VEG["Vegetation"] -->|"Transpiration"| ATM
    style OCE fill:#4169E1
    style ATM fill:#87CEEB`,
};

/**
 * Greenhouse Effect Diagram template
 */
export const greenhouseEffectDiagram: DiagramTemplate = {
  id: 'env-greenhouse-effect',
  name: 'Greenhouse Effect Diagram',
  description: 'Radiation balance and greenhouse gas impacts on climate',
  domain: 'biology',
  promptTemplate: `Create a greenhouse effect diagram:
- Solar radiation: {{solarRadiation}}
- Greenhouse gases: {{greenhouseGases}}
- Radiation absorption: {{radiationAbsorption}}
- Re-emission process: {{reemissionProcess}}
- Temperature effects: {{temperatureEffects}}
- Natural vs enhanced: {{naturalVsEnhanced}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'solarRadiation',
    'greenhouseGases',
    'radiationAbsorption',
    'reemissionProcess',
    'temperatureEffects',
    'naturalVsEnhanced',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    SUN["Sun"] -->|"Solar Radiation"| ATM["Atmosphere"]
    ATM -->|"Transmitted"| SURF["Earth Surface"]
    SURF -->|"Absorbed"| HEAT["Surface Heating"]
    HEAT -->|"IR Radiation"| GHG["Greenhouse Gases"]
    GHG -->|"Re-emission"| SURF
    GHG -->|"Escape"| SPACE["Space"]
    style SUN fill:#FFD700
    style GHG fill:#DC143C`,
};

/**
 * Food Web Diagram template
 */
export const foodWebDiagram: DiagramTemplate = {
  id: 'env-food-web',
  name: 'Ecosystem Food Web',
  description: 'Trophic relationships and energy flow in ecosystems',
  domain: 'biology',
  promptTemplate: `Create a food web diagram:
- Primary producers: {{primaryProducers}}
- Primary consumers: {{primaryConsumers}}
- Secondary consumers: {{secondaryConsumers}}
- Tertiary consumers: {{tertiaryConsumers}}
- Decomposers: {{decomposers}}
- Energy transfer efficiency: {{energyTransfer}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'primaryProducers',
    'primaryConsumers',
    'secondaryConsumers',
    'tertiaryConsumers',
    'decomposers',
    'energyTransfer',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    SUN["Solar Energy"] --> PROD["Producers"]
    PROD --> HERB["Herbivores"]
    HERB --> CARN1["Primary Carnivores"]
    CARN1 --> CARN2["Apex Predators"]
    PROD & HERB & CARN1 & CARN2 --> DEC["Decomposers"]
    DEC --> NUT["Nutrients"]
    NUT --> PROD
    style PROD fill:#228B22
    style CARN2 fill:#DC143C`,
};

// =============================================================================
// RESEARCH METHODOLOGIES
// =============================================================================

/**
 * Environmental Impact Assessment template
 */
export const environmentalImpactAssessment: DiagramTemplate = {
  id: 'env-impact-assessment',
  name: 'Environmental Impact Assessment',
  description: 'EIA process workflow from screening to monitoring',
  domain: 'biology',
  promptTemplate: `Create an EIA workflow diagram:
- Project description: {{projectDescription}}
- Screening criteria: {{screeningCriteria}}
- Scoping process: {{scopingProcess}}
- Impact prediction: {{impactPrediction}}
- Mitigation measures: {{mitigationMeasures}}
- Monitoring plan: {{monitoringPlan}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'projectDescription',
    'screeningCriteria',
    'scopingProcess',
    'impactPrediction',
    'mitigationMeasures',
    'monitoringPlan',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    PROJ["Project Proposal"] --> SCREEN["Screening"]
    SCREEN --> SCOPE["Scoping"]
    SCOPE --> BASE["Baseline Studies"]
    BASE --> PRED["Impact Prediction"]
    PRED --> MIT["Mitigation Design"]
    MIT --> REV["Public Review"]
    REV --> DEC["Decision"]
    DEC --> MON["Monitoring"]
    style PROJ fill:#4169E1
    style DEC fill:#228B22`,
};

/**
 * Water Quality Monitoring template
 */
export const waterQualityMonitoring: DiagramTemplate = {
  id: 'env-water-quality-monitoring',
  name: 'Water Quality Monitoring Protocol',
  description: 'Systematic water quality sampling and analysis workflow',
  domain: 'biology',
  promptTemplate: `Create a water quality monitoring workflow:
- Monitoring objectives: {{monitoringObjectives}}
- Sampling locations: {{samplingLocations}}
- Parameters measured: {{parametersMeasured}}
- Sampling frequency: {{samplingFrequency}}
- Analysis methods: {{analysisMethods}}
- Data management: {{dataManagement}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'monitoringObjectives',
    'samplingLocations',
    'parametersMeasured',
    'samplingFrequency',
    'analysisMethods',
    'dataManagement',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    PLAN["Monitoring Plan"] --> SITE["Site Selection"]
    SITE --> SAMP["Sample Collection"]
    SAMP --> FIELD["Field Measurements"]
    SAMP --> LAB["Laboratory Analysis"]
    FIELD & LAB --> DATA["Data Entry"]
    DATA --> QC["Quality Control"]
    QC --> REPORT["Reporting"]
    style PLAN fill:#4169E1
    style REPORT fill:#228B22`,
};

/**
 * Biodiversity Survey template
 */
export const biodiversitySurvey: DiagramTemplate = {
  id: 'env-biodiversity-survey',
  name: 'Biodiversity Survey Methodology',
  description: 'Species inventory and biodiversity assessment workflow',
  domain: 'biology',
  promptTemplate: `Create a biodiversity survey workflow:
- Survey objectives: {{surveyObjectives}}
- Target taxa: {{targetTaxa}}
- Sampling methods: {{samplingMethods}}
- Survey effort: {{surveyEffort}}
- Species identification: {{speciesIdentification}}
- Diversity metrics: {{diversityMetrics}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'surveyObjectives',
    'targetTaxa',
    'samplingMethods',
    'surveyEffort',
    'speciesIdentification',
    'diversityMetrics',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    DESIGN["Survey Design"] --> FIELD["Field Sampling"]
    FIELD --> COLL["Specimen Collection"]
    COLL --> ID["Species ID"]
    ID --> DATA["Data Recording"]
    DATA --> ANAL["Statistical Analysis"]
    ANAL --> DIV["Diversity Indices"]
    DIV --> ASSESS["Conservation Assessment"]
    style DESIGN fill:#228B22
    style ASSESS fill:#4169E1`,
};

// =============================================================================
// CLASSIFICATION SYSTEMS
// =============================================================================

/**
 * Biome Classification template
 */
export const biomeClassification: DiagramTemplate = {
  id: 'env-biome-classification',
  name: 'Biome Classification System',
  description: 'Global biome types based on climate and vegetation',
  domain: 'biology',
  promptTemplate: `Create a biome classification diagram:
- Climate parameters: {{climateParameters}}
- Biome types: {{biomeTypes}}
- Vegetation characteristics: {{vegetationCharacteristics}}
- Geographic distribution: {{geographicDistribution}}
- Fauna associations: {{faunaAssociations}}
- Climate change impacts: {{climateChangeImpacts}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'climateParameters',
    'biomeTypes',
    'vegetationCharacteristics',
    'geographicDistribution',
    'faunaAssociations',
    'climateChangeImpacts',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    BIOME["Terrestrial Biomes"] --> TROP["Tropical"]
    BIOME --> TEMP["Temperate"]
    BIOME --> BORE["Boreal"]
    BIOME --> TUND["Tundra"]
    TROP --> RF["Rainforest"]
    TROP --> SAV["Savanna"]
    TEMP --> DEC["Deciduous Forest"]
    TEMP --> GRASS["Grassland"]
    style RF fill:#228B22
    style TUND fill:#87CEEB`,
};

/**
 * Pollution Classification template
 */
export const pollutionClassification: DiagramTemplate = {
  id: 'env-pollution-classification',
  name: 'Pollution Classification System',
  description: 'Types of environmental pollution and their sources',
  domain: 'biology',
  promptTemplate: `Create a pollution classification diagram:
- Pollution categories: {{pollutionCategories}}
- Source types: {{sourceTypes}}
- Transport pathways: {{transportPathways}}
- Affected media: {{affectedMedia}}
- Health effects: {{healthEffects}}
- Regulatory standards: {{regulatoryStandards}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'pollutionCategories',
    'sourceTypes',
    'transportPathways',
    'affectedMedia',
    'healthEffects',
    'regulatoryStandards',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    POL["Pollution"] --> AIR["Air Pollution"]
    POL --> WAT["Water Pollution"]
    POL --> SOIL["Soil Pollution"]
    POL --> NOISE["Noise Pollution"]
    AIR --> PART["Particulates"]
    AIR --> GAS["Gases"]
    WAT --> ORG["Organic"]
    WAT --> INORG["Inorganic"]
    style POL fill:#DC143C
    style AIR fill:#808080`,
};

/**
 * IUCN Conservation Status template
 */
export const iucnConservationStatus: DiagramTemplate = {
  id: 'env-iucn-status',
  name: 'IUCN Conservation Status',
  description: 'IUCN Red List categories and criteria for species assessment',
  domain: 'biology',
  promptTemplate: `Create an IUCN status diagram:
- Assessment criteria: {{assessmentCriteria}}
- Status categories: {{statusCategories}}
- Population thresholds: {{populationThresholds}}
- Geographic range: {{geographicRange}}
- Decline rates: {{declineRates}}
- Conservation actions: {{conservationActions}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'assessmentCriteria',
    'statusCategories',
    'populationThresholds',
    'geographicRange',
    'declineRates',
    'conservationActions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    NE["Not Evaluated"] --> DD["Data Deficient"]
    DD --> LC["Least Concern"]
    LC --> NT["Near Threatened"]
    NT --> VU["Vulnerable"]
    VU --> EN["Endangered"]
    EN --> CR["Critically Endangered"]
    CR --> EW["Extinct in Wild"]
    EW --> EX["Extinct"]
    style LC fill:#228B22
    style CR fill:#DC143C
    style EX fill:#000000,color:#fff`,
};

// =============================================================================
// PROCESS FLOWS
// =============================================================================

/**
 * Nitrogen Cycle template
 */
export const nitrogenCycleDiagram: DiagramTemplate = {
  id: 'env-nitrogen-cycle',
  name: 'Nitrogen Cycle Diagram',
  description: 'Biogeochemical nitrogen cycle with microbial processes',
  domain: 'biology',
  promptTemplate: `Create a nitrogen cycle diagram:
- Nitrogen fixation: {{nitrogenFixation}}
- Nitrification process: {{nitrificationProcess}}
- Denitrification: {{denitrification}}
- Assimilation: {{assimilation}}
- Ammonification: {{ammonification}}
- Human inputs: {{humanInputs}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'nitrogenFixation',
    'nitrificationProcess',
    'denitrification',
    'assimilation',
    'ammonification',
    'humanInputs',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    N2["Atmospheric N₂"] -->|"Fixation"| NH4["Ammonium"]
    NH4 -->|"Nitrification"| NO3["Nitrate"]
    NO3 -->|"Assimilation"| ORG["Organic N"]
    ORG -->|"Ammonification"| NH4
    NO3 -->|"Denitrification"| N2
    FERT["Fertilizers"] --> NO3
    style N2 fill:#87CEEB
    style FERT fill:#DC143C`,
};

/**
 * Ecological Succession template
 */
export const ecologicalSuccession: DiagramTemplate = {
  id: 'env-ecological-succession',
  name: 'Ecological Succession',
  description: 'Primary and secondary succession stages in ecosystems',
  domain: 'biology',
  promptTemplate: `Create an ecological succession diagram:
- Succession type: {{successionType}}
- Pioneer species: {{pioneerSpecies}}
- Intermediate stages: {{intermediateStages}}
- Climax community: {{climaxCommunity}}
- Time scales: {{timeScales}}
- Disturbance factors: {{disturbanceFactors}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'successionType',
    'pioneerSpecies',
    'intermediateStages',
    'climaxCommunity',
    'timeScales',
    'disturbanceFactors',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    BARE["Bare Ground"] --> PION["Pioneer Species"]
    PION --> HERB["Herbaceous Stage"]
    HERB --> SHRUB["Shrub Stage"]
    SHRUB --> TREE["Young Forest"]
    TREE --> CLIMAX["Climax Forest"]
    DIST["Disturbance"] --> BARE
    style BARE fill:#8B4513
    style CLIMAX fill:#228B22`,
};

/**
 * Waste Management Hierarchy template
 */
export const wasteManagementHierarchy: DiagramTemplate = {
  id: 'env-waste-hierarchy',
  name: 'Waste Management Hierarchy',
  description: 'Preferred waste management strategies from prevention to disposal',
  domain: 'biology',
  promptTemplate: `Create a waste management hierarchy diagram:
- Prevention strategies: {{preventionStrategies}}
- Reuse options: {{reuseOptions}}
- Recycling methods: {{recyclingMethods}}
- Recovery processes: {{recoveryProcesses}}
- Disposal methods: {{disposalMethods}}
- Policy frameworks: {{policyFrameworks}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'preventionStrategies',
    'reuseOptions',
    'recyclingMethods',
    'recoveryProcesses',
    'disposalMethods',
    'policyFrameworks',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Hierarchy["Waste Hierarchy"]
        PREV["Prevention"] --> REUSE["Reuse"]
        REUSE --> REC["Recycling"]
        REC --> REC2["Recovery"]
        REC2 --> DISP["Disposal"]
    end
    style PREV fill:#228B22
    style DISP fill:#DC143C`,
};

/**
 * Climate Change Impacts template
 */
export const climateChangeImpacts: DiagramTemplate = {
  id: 'env-climate-impacts',
  name: 'Climate Change Impacts Flowchart',
  description: 'Cascading impacts of climate change across systems',
  domain: 'biology',
  promptTemplate: `Create a climate change impacts diagram:
- Temperature changes: {{temperatureChanges}}
- Precipitation changes: {{precipitationChanges}}
- Sea level rise: {{seaLevelRise}}
- Ecosystem impacts: {{ecosystemImpacts}}
- Human system impacts: {{humanImpacts}}
- Adaptation options: {{adaptationOptions}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'temperatureChanges',
    'precipitationChanges',
    'seaLevelRise',
    'ecosystemImpacts',
    'humanImpacts',
    'adaptationOptions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    GHG["GHG Emissions"] --> TEMP["Temperature Rise"]
    TEMP --> ICE["Ice Melt"]
    TEMP --> EXT["Extreme Events"]
    ICE --> SLR["Sea Level Rise"]
    SLR --> COAST["Coastal Flooding"]
    EXT --> AGRI["Agriculture Impacts"]
    EXT --> HLTH["Health Impacts"]
    style GHG fill:#DC143C
    style TEMP fill:#FF4500`,
};

/**
 * Life Cycle Assessment template
 */
export const lifeCycleAssessment: DiagramTemplate = {
  id: 'env-life-cycle-assessment',
  name: 'Life Cycle Assessment',
  description: 'LCA methodology for product environmental footprint',
  domain: 'biology',
  promptTemplate: `Create a life cycle assessment diagram:
- Goal and scope: {{goalAndScope}}
- Inventory analysis: {{inventoryAnalysis}}
- Impact categories: {{impactCategories}}
- Interpretation: {{interpretation}}
- System boundaries: {{systemBoundaries}}
- Functional unit: {{functionalUnit}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'goalAndScope',
    'inventoryAnalysis',
    'impactCategories',
    'interpretation',
    'systemBoundaries',
    'functionalUnit',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    RAW["Raw Materials"] --> PROD["Production"]
    PROD --> DIST["Distribution"]
    DIST --> USE["Use Phase"]
    USE --> EOL["End of Life"]
    EOL --> REC["Recycling"]
    EOL --> DISP["Disposal"]
    REC --> RAW
    style RAW fill:#228B22
    style DISP fill:#DC143C`,
};

/**
 * Renewable Energy Systems template
 */
export const renewableEnergySystems: DiagramTemplate = {
  id: 'env-renewable-energy',
  name: 'Renewable Energy Systems',
  description: 'Overview of renewable energy technologies and integration',
  domain: 'biology',
  promptTemplate: `Create a renewable energy systems diagram:
- Energy sources: {{energySources}}
- Conversion technologies: {{conversionTechnologies}}
- Storage options: {{storageOptions}}
- Grid integration: {{gridIntegration}}
- Capacity factors: {{capacityFactors}}
- Environmental benefits: {{environmentalBenefits}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'energySources',
    'conversionTechnologies',
    'storageOptions',
    'gridIntegration',
    'capacityFactors',
    'environmentalBenefits',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    SUN["Solar"] --> PV["Photovoltaic"]
    SUN --> CSP["Concentrated Solar"]
    WIND["Wind"] --> WT["Wind Turbines"]
    HYDRO["Hydro"] --> DAM["Hydroelectric"]
    PV & CSP & WT & DAM --> GRID["Power Grid"]
    GRID --> STOR["Energy Storage"]
    GRID --> LOAD["Consumers"]
    style SUN fill:#FFD700
    style WIND fill:#87CEEB`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All environmental templates
 */
export const environmentalTemplates: DiagramTemplate[] = [
  // Natural Phenomena
  globalCarbonCycle,
  waterCycleDiagram,
  greenhouseEffectDiagram,
  foodWebDiagram,
  // Research Methodologies
  environmentalImpactAssessment,
  waterQualityMonitoring,
  biodiversitySurvey,
  // Classification Systems
  biomeClassification,
  pollutionClassification,
  iucnConservationStatus,
  // Process Flows
  nitrogenCycleDiagram,
  ecologicalSuccession,
  wasteManagementHierarchy,
  climateChangeImpacts,
  lifeCycleAssessment,
  renewableEnergySystems,
];

export default environmentalTemplates;
