/**
 * oceanography.ts
 * Oceanography diagram templates for FINNISH
 *
 * Contains comprehensive templates for oceanographic sciences including:
 * - Ocean phenomena diagrams
 * - Research methodology flowcharts
 * - Classification systems
 * - Marine process flows
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// NATURAL PHENOMENA
// =============================================================================

/**
 * Ocean Circulation Diagram template
 */
export const oceanCirculationDiagram: DiagramTemplate = {
  id: 'ocean-circulation',
  name: 'Ocean Circulation Diagram',
  description: 'Global thermohaline circulation and surface currents',
  domain: 'biology',
  promptTemplate: `Create an ocean circulation diagram showing:
- Surface currents: {{surfaceCurrents}}
- Deep water formation: {{deepWaterFormation}}
- Upwelling zones: {{upwellingZones}}
- Gyre systems: {{gyreSystems}}
- Heat transport: {{heatTransport}}
- Climate connections: {{climateConnections}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'surfaceCurrents',
    'deepWaterFormation',
    'upwellingZones',
    'gyreSystems',
    'heatTransport',
    'climateConnections',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    SURF["Surface Currents"] --> GYRE["Subtropical Gyres"]
    POLAR["Polar Regions"] --> SINK["Deep Water Formation"]
    SINK --> DEEP["Deep Ocean Currents"]
    DEEP --> UPWELL["Upwelling"]
    UPWELL --> SURF
    GYRE --> HEAT["Heat Transport"]
    style SINK fill:#4169E1
    style UPWELL fill:#228B22`,
};

/**
 * Tidal Dynamics template
 */
export const tidalDynamics: DiagramTemplate = {
  id: 'ocean-tidal-dynamics',
  name: 'Tidal Dynamics Diagram',
  description: 'Gravitational forces and tidal patterns',
  domain: 'biology',
  promptTemplate: `Create a tidal dynamics diagram:
- Gravitational forces: {{gravitationalForces}}
- Tidal bulges: {{tidalBulges}}
- Spring and neap tides: {{springNeapTides}}
- Tidal range: {{tidalRange}}
- Tidal currents: {{tidalCurrents}}
- Amphidromic points: {{amphidromicPoints}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'gravitationalForces',
    'tidalBulges',
    'springNeapTides',
    'tidalRange',
    'tidalCurrents',
    'amphidromicPoints',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    MOON["Lunar Gravity"] --> BULGE["Tidal Bulge"]
    SUN["Solar Gravity"] --> BULGE
    BULGE --> HIGH["High Tide"]
    BULGE --> LOW["Low Tide"]
    MOON & SUN -->|"Aligned"| SPRING["Spring Tide"]
    MOON & SUN -->|"Perpendicular"| NEAP["Neap Tide"]
    style SPRING fill:#DC143C
    style NEAP fill:#87CEEB`,
};

/**
 * Wave Dynamics template
 */
export const waveDynamics: DiagramTemplate = {
  id: 'ocean-wave-dynamics',
  name: 'Ocean Wave Dynamics',
  description: 'Wave generation, propagation, and breaking processes',
  domain: 'biology',
  promptTemplate: `Create an ocean wave dynamics diagram:
- Wave generation: {{waveGeneration}}
- Wave parameters: {{waveParameters}}
- Wave propagation: {{wavePropagation}}
- Shoaling effects: {{shoalingEffects}}
- Wave breaking: {{waveBreaking}}
- Coastal impacts: {{coastalImpacts}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'waveGeneration',
    'waveParameters',
    'wavePropagation',
    'shoalingEffects',
    'waveBreaking',
    'coastalImpacts',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    WIND["Wind"] --> GEN["Wave Generation"]
    GEN --> SWELL["Swell Formation"]
    SWELL --> PROP["Propagation"]
    PROP --> SHOAL["Shoaling"]
    SHOAL --> BREAK["Breaking"]
    BREAK --> SURF["Surf Zone"]
    style WIND fill:#87CEEB
    style BREAK fill:#DC143C`,
};

/**
 * Coral Reef Ecosystem template
 */
export const coralReefEcosystem: DiagramTemplate = {
  id: 'ocean-coral-ecosystem',
  name: 'Coral Reef Ecosystem',
  description: 'Structure and function of coral reef ecosystems',
  domain: 'biology',
  promptTemplate: `Create a coral reef ecosystem diagram:
- Reef structure zones: {{reefZones}}
- Symbiotic relationships: {{symbioticRelationships}}
- Food web: {{foodWeb}}
- Nutrient cycling: {{nutrientCycling}}
- Biodiversity: {{biodiversity}}
- Threats and stressors: {{threats}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'reefZones',
    'symbioticRelationships',
    'foodWeb',
    'nutrientCycling',
    'biodiversity',
    'threats',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    CORAL["Coral Polyps"] <-->|"Symbiosis"| ZOO["Zooxanthellae"]
    ZOO --> O2["Oxygen + Sugar"]
    CORAL --> STRUCT["Reef Structure"]
    STRUCT --> FISH["Reef Fish"]
    STRUCT --> INV["Invertebrates"]
    FISH & INV --> PRED["Predators"]
    style CORAL fill:#FF69B4
    style ZOO fill:#228B22`,
};

// =============================================================================
// RESEARCH METHODOLOGIES
// =============================================================================

/**
 * CTD Profiling Workflow template
 */
export const ctdProfilingWorkflow: DiagramTemplate = {
  id: 'ocean-ctd-workflow',
  name: 'CTD Profiling Workflow',
  description: 'Conductivity-Temperature-Depth profiling methodology',
  domain: 'biology',
  promptTemplate: `Create a CTD profiling workflow:
- Deployment procedure: {{deploymentProcedure}}
- Sensor calibration: {{sensorCalibration}}
- Data collection: {{dataCollection}}
- Quality control: {{qualityControl}}
- Data processing: {{dataProcessing}}
- Derived parameters: {{derivedParameters}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'deploymentProcedure',
    'sensorCalibration',
    'dataCollection',
    'qualityControl',
    'dataProcessing',
    'derivedParameters',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    PREP["Sensor Prep"] --> CAL["Calibration"]
    CAL --> DEPLOY["Deployment"]
    DEPLOY --> DESC["Downcast"]
    DESC --> UPC["Upcast"]
    UPC --> RECOV["Recovery"]
    RECOV --> QC["Quality Control"]
    QC --> PROC["Data Processing"]
    PROC --> PROD["Data Products"]
    style DEPLOY fill:#4169E1
    style PROD fill:#228B22`,
};

/**
 * Marine Sediment Coring template
 */
export const marineSedimentCoring: DiagramTemplate = {
  id: 'ocean-sediment-coring',
  name: 'Marine Sediment Coring',
  description: 'Sediment core collection and analysis workflow',
  domain: 'biology',
  promptTemplate: `Create a sediment coring workflow:
- Coring equipment: {{coringEquipment}}
- Site selection: {{siteSelection}}
- Core recovery: {{coreRecovery}}
- Core processing: {{coreProcessing}}
- Analytical methods: {{analyticalMethods}}
- Proxy interpretation: {{proxyInterpretation}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'coringEquipment',
    'siteSelection',
    'coreRecovery',
    'coreProcessing',
    'analyticalMethods',
    'proxyInterpretation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    SITE["Site Survey"] --> CORE["Core Collection"]
    CORE --> GRAV["Gravity Corer"]
    CORE --> PIST["Piston Corer"]
    GRAV & PIST --> RECOV["Core Recovery"]
    RECOV --> SPLIT["Core Splitting"]
    SPLIT --> DESC["Description"]
    SPLIT --> SAMP["Subsampling"]
    SAMP --> ANAL["Analysis"]
    style SITE fill:#4169E1
    style ANAL fill:#228B22`,
};

/**
 * Acoustic Survey Methods template
 */
export const acousticSurveyMethods: DiagramTemplate = {
  id: 'ocean-acoustic-survey',
  name: 'Acoustic Survey Methods',
  description: 'Sonar and acoustic profiling techniques for ocean mapping',
  domain: 'biology',
  promptTemplate: `Create an acoustic survey methods diagram:
- Survey equipment: {{surveyEquipment}}
- Frequency selection: {{frequencySelection}}
- Survey design: {{surveyDesign}}
- Data acquisition: {{dataAcquisition}}
- Processing workflow: {{processingWorkflow}}
- Product generation: {{productGeneration}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'surveyEquipment',
    'frequencySelection',
    'surveyDesign',
    'dataAcquisition',
    'processingWorkflow',
    'productGeneration',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    PLAN["Survey Planning"] --> EQUIP["Equipment Setup"]
    EQUIP --> MBES["Multibeam"]
    EQUIP --> SBP["Sub-bottom Profiler"]
    EQUIP --> ADCP["ADCP"]
    MBES & SBP & ADCP --> DATA["Data Logging"]
    DATA --> PROC["Processing"]
    PROC --> BATHY["Bathymetry"]
    PROC --> SEDI["Sediment Map"]
    style PLAN fill:#4169E1
    style BATHY fill:#228B22`,
};

// =============================================================================
// CLASSIFICATION SYSTEMS
// =============================================================================

/**
 * Ocean Zone Classification template
 */
export const oceanZoneClassification: DiagramTemplate = {
  id: 'ocean-zone-classification',
  name: 'Ocean Zone Classification',
  description: 'Vertical and horizontal zonation of the ocean',
  domain: 'biology',
  promptTemplate: `Create an ocean zone classification diagram:
- Pelagic zones: {{pelagicZones}}
- Benthic zones: {{benthicZones}}
- Light penetration: {{lightPenetration}}
- Temperature profiles: {{temperatureProfiles}}
- Pressure regimes: {{pressureRegimes}}
- Characteristic fauna: {{characteristicFauna}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'pelagicZones',
    'benthicZones',
    'lightPenetration',
    'temperatureProfiles',
    'pressureRegimes',
    'characteristicFauna',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Pelagic["Pelagic Zones"]
        EPI["Epipelagic 0-200m"]
        MESO["Mesopelagic 200-1000m"]
        BATHY["Bathypelagic 1000-4000m"]
        ABYS["Abyssopelagic 4000-6000m"]
        HADAL["Hadal >6000m"]
    end
    EPI --> MESO --> BATHY --> ABYS --> HADAL
    style EPI fill:#87CEEB
    style HADAL fill:#000080,color:#fff`,
};

/**
 * Marine Organism Classification template
 */
export const marineOrganismClassification: DiagramTemplate = {
  id: 'ocean-organism-classification',
  name: 'Marine Organism Classification',
  description: 'Classification of marine life by habitat and lifestyle',
  domain: 'biology',
  promptTemplate: `Create a marine organism classification diagram:
- Plankton types: {{planktonTypes}}
- Nekton groups: {{nektonGroups}}
- Benthos categories: {{benthosCategories}}
- Trophic levels: {{trophicLevels}}
- Size classes: {{sizeClasses}}
- Ecological roles: {{ecologicalRoles}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'planktonTypes',
    'nektonGroups',
    'benthosCategories',
    'trophicLevels',
    'sizeClasses',
    'ecologicalRoles',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    MARINE["Marine Organisms"] --> PLANK["Plankton"]
    MARINE --> NEKT["Nekton"]
    MARINE --> BENTH["Benthos"]
    PLANK --> PHYTO["Phytoplankton"]
    PLANK --> ZOO["Zooplankton"]
    NEKT --> FISH["Fish"]
    NEKT --> MAMM["Marine Mammals"]
    BENTH --> INFAUNA["Infauna"]
    BENTH --> EPIFAUNA["Epifauna"]
    style PHYTO fill:#228B22
    style FISH fill:#4169E1`,
};

/**
 * Seafloor Feature Classification template
 */
export const seafloorFeatureClassification: DiagramTemplate = {
  id: 'ocean-seafloor-classification',
  name: 'Seafloor Feature Classification',
  description: 'Morphological classification of submarine features',
  domain: 'biology',
  promptTemplate: `Create a seafloor feature classification diagram:
- Continental margin features: {{continentalMarginFeatures}}
- Abyssal plain features: {{abyssalPlainFeatures}}
- Mid-ocean ridge features: {{midOceanRidgeFeatures}}
- Subduction zone features: {{subductionZoneFeatures}}
- Volcanic features: {{volcanicFeatures}}
- Sedimentary features: {{sedimentaryFeatures}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'continentalMarginFeatures',
    'abyssalPlainFeatures',
    'midOceanRidgeFeatures',
    'subductionZoneFeatures',
    'volcanicFeatures',
    'sedimentaryFeatures',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    FLOOR["Seafloor Features"] --> MARGIN["Continental Margin"]
    FLOOR --> RIDGE["Mid-Ocean Ridge"]
    FLOOR --> TRENCH["Trenches"]
    MARGIN --> SHELF["Shelf"]
    MARGIN --> SLOPE["Slope"]
    MARGIN --> RISE["Rise"]
    RIDGE --> RIFT["Rift Valley"]
    RIDGE --> SEAMOUNT["Seamounts"]
    style RIDGE fill:#DC143C
    style TRENCH fill:#4169E1`,
};

// =============================================================================
// PROCESS FLOWS
// =============================================================================

/**
 * Ocean Carbon Pump template
 */
export const oceanCarbonPump: DiagramTemplate = {
  id: 'ocean-carbon-pump',
  name: 'Ocean Carbon Pump',
  description: 'Biological and physical carbon sequestration in the ocean',
  domain: 'biology',
  promptTemplate: `Create an ocean carbon pump diagram:
- Biological pump: {{biologicalPump}}
- Physical pump: {{physicalPump}}
- Carbonate pump: {{carbonatePump}}
- Export production: {{exportProduction}}
- Deep ocean storage: {{deepOceanStorage}}
- Climate feedbacks: {{climateFeedbacks}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'biologicalPump',
    'physicalPump',
    'carbonatePump',
    'exportProduction',
    'deepOceanStorage',
    'climateFeedbacks',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    ATM["Atmospheric CO₂"] --> SURF["Surface Ocean"]
    SURF --> PHYTO["Phytoplankton"]
    PHYTO --> POM["Particulate Organic Matter"]
    POM --> SINK["Sinking Particles"]
    SINK --> DEEP["Deep Ocean"]
    DEEP --> SED["Sediment Burial"]
    style ATM fill:#87CEEB
    style SED fill:#8B4513`,
};

/**
 * Upwelling Process template
 */
export const upwellingProcess: DiagramTemplate = {
  id: 'ocean-upwelling-process',
  name: 'Upwelling Process',
  description: 'Coastal and equatorial upwelling mechanisms',
  domain: 'biology',
  promptTemplate: `Create an upwelling process diagram:
- Wind forcing: {{windForcing}}
- Ekman transport: {{ekmanTransport}}
- Nutrient supply: {{nutrientSupply}}
- Primary production: {{primaryProduction}}
- Fisheries productivity: {{fisheriesProductivity}}
- Climate variability: {{climateVariability}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'windForcing',
    'ekmanTransport',
    'nutrientSupply',
    'primaryProduction',
    'fisheriesProductivity',
    'climateVariability',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    WIND["Alongshore Winds"] --> EKMAN["Ekman Transport"]
    EKMAN --> OFFSHORE["Offshore Surface Flow"]
    OFFSHORE --> UPWELL["Upwelling"]
    UPWELL --> NUTR["Nutrient-Rich Water"]
    NUTR --> BLOOM["Phytoplankton Bloom"]
    BLOOM --> FISH["Fishery Production"]
    style UPWELL fill:#4169E1
    style FISH fill:#228B22`,
};

/**
 * Hydrothermal Vent System template
 */
export const hydrothermalVentSystem: DiagramTemplate = {
  id: 'ocean-hydrothermal-vent',
  name: 'Hydrothermal Vent System',
  description: 'Deep-sea vent formation and chemosynthetic ecosystems',
  domain: 'biology',
  promptTemplate: `Create a hydrothermal vent system diagram:
- Vent formation: {{ventFormation}}
- Fluid chemistry: {{fluidChemistry}}
- Temperature gradients: {{temperatureGradients}}
- Mineral deposits: {{mineralDeposits}}
- Chemosynthetic organisms: {{chemosynthesis}}
- Energy flow: {{energyFlow}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ventFormation',
    'fluidChemistry',
    'temperatureGradients',
    'mineralDeposits',
    'chemosynthesis',
    'energyFlow',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    MAGMA["Magma Chamber"] --> HEAT["Heat Source"]
    HEAT --> CIRC["Seawater Circulation"]
    CIRC --> HOT["Hot Fluid"]
    HOT --> PLUME["Black Smoker Plume"]
    PLUME --> MINERALS["Sulfide Deposits"]
    HOT --> BACT["Chemosynthetic Bacteria"]
    BACT --> TUBE["Tube Worms"]
    BACT --> SHRIMP["Vent Shrimp"]
    style PLUME fill:#000000,color:#fff
    style BACT fill:#228B22`,
};

/**
 * Ocean Acidification template
 */
export const oceanAcidification: DiagramTemplate = {
  id: 'ocean-acidification',
  name: 'Ocean Acidification Process',
  description: 'CO2 absorption and carbonate chemistry impacts',
  domain: 'biology',
  promptTemplate: `Create an ocean acidification diagram:
- CO2 absorption: {{co2Absorption}}
- Carbonate chemistry: {{carbonateChemistry}}
- pH changes: {{phChanges}}
- Saturation states: {{saturationStates}}
- Biological impacts: {{biologicalImpacts}}
- Mitigation strategies: {{mitigationStrategies}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'co2Absorption',
    'carbonateChemistry',
    'phChanges',
    'saturationStates',
    'biologicalImpacts',
    'mitigationStrategies',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    ATM["Atmospheric CO₂↑"] --> OCEAN["Ocean Uptake"]
    OCEAN --> ACID["CO₂ + H₂O → H₂CO₃"]
    ACID --> PH["pH Decrease"]
    ACID --> CARB["CO₃²⁻ Decrease"]
    PH --> CORAL["Coral Stress"]
    CARB --> SHELL["Shell Formation↓"]
    SHELL --> CALC["Calcifiers at Risk"]
    style ATM fill:#DC143C
    style CALC fill:#FF4500`,
};

/**
 * Coastal Erosion Process template
 */
export const coastalErosionProcess: DiagramTemplate = {
  id: 'ocean-coastal-erosion',
  name: 'Coastal Erosion Process',
  description: 'Wave action and sediment transport in coastal systems',
  domain: 'biology',
  promptTemplate: `Create a coastal erosion process diagram:
- Wave energy: {{waveEnergy}}
- Erosion mechanisms: {{erosionMechanisms}}
- Sediment transport: {{sedimentTransport}}
- Coastal landforms: {{coastalLandforms}}
- Sea level impacts: {{seaLevelImpacts}}
- Management options: {{managementOptions}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'waveEnergy',
    'erosionMechanisms',
    'sedimentTransport',
    'coastalLandforms',
    'seaLevelImpacts',
    'managementOptions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    WAVE["Wave Action"] --> ERODE["Erosion"]
    ERODE --> HYDR["Hydraulic Action"]
    ERODE --> ABRA["Abrasion"]
    ERODE --> CORR["Corrosion"]
    HYDR & ABRA & CORR --> SED["Sediment"]
    SED --> LONG["Longshore Drift"]
    LONG --> DEP["Deposition"]
    DEP --> BEACH["Beach/Spit"]
    style WAVE fill:#4169E1
    style BEACH fill:#DAA520`,
};

/**
 * Marine Food Web template
 */
export const marineFoodWeb: DiagramTemplate = {
  id: 'ocean-marine-food-web',
  name: 'Marine Food Web',
  description: 'Trophic relationships in marine ecosystems',
  domain: 'biology',
  promptTemplate: `Create a marine food web diagram:
- Primary producers: {{primaryProducers}}
- Zooplankton: {{zooplankton}}
- Forage fish: {{forageFish}}
- Predatory fish: {{predatoryFish}}
- Marine mammals: {{marineMammals}}
- Decomposers: {{decomposers}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'primaryProducers',
    'zooplankton',
    'forageFish',
    'predatoryFish',
    'marineMammals',
    'decomposers',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    SUN["Solar Energy"] --> PHYTO["Phytoplankton"]
    PHYTO --> ZOO["Zooplankton"]
    ZOO --> SMALL["Small Fish"]
    SMALL --> LARGE["Large Fish"]
    LARGE --> APEX["Apex Predators"]
    PHYTO & ZOO & SMALL & LARGE --> DET["Detritus"]
    DET --> BACT["Bacteria"]
    BACT --> NUTR["Nutrients"]
    NUTR --> PHYTO
    style PHYTO fill:#228B22
    style APEX fill:#DC143C`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All oceanography templates
 */
export const oceanographyTemplates: DiagramTemplate[] = [
  // Natural Phenomena
  oceanCirculationDiagram,
  tidalDynamics,
  waveDynamics,
  coralReefEcosystem,
  // Research Methodologies
  ctdProfilingWorkflow,
  marineSedimentCoring,
  acousticSurveyMethods,
  // Classification Systems
  oceanZoneClassification,
  marineOrganismClassification,
  seafloorFeatureClassification,
  // Process Flows
  oceanCarbonPump,
  upwellingProcess,
  hydrothermalVentSystem,
  oceanAcidification,
  coastalErosionProcess,
  marineFoodWeb,
];

export default oceanographyTemplates;
