/**
 * agriculture.ts
 * Agricultural Science diagram templates for FINNISH
 *
 * Contains comprehensive templates for agricultural sciences including:
 * - Crop and plant diagrams
 * - Research methodology flowcharts
 * - Classification systems
 * - Agricultural process flows
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// NATURAL PHENOMENA
// =============================================================================

/**
 * Plant Growth Cycle template
 */
export const plantGrowthCycle: DiagramTemplate = {
  id: 'agri-plant-growth-cycle',
  name: 'Plant Growth Cycle',
  description: 'Complete lifecycle of crop plants from seed to harvest',
  domain: 'biology',
  promptTemplate: `Create a plant growth cycle diagram showing:
- Germination stage: {{germinationStage}}
- Vegetative growth: {{vegetativeGrowth}}
- Reproductive stage: {{reproductiveStage}}
- Maturation: {{maturation}}
- Environmental factors: {{environmentalFactors}}
- Growth duration: {{growthDuration}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'germinationStage',
    'vegetativeGrowth',
    'reproductiveStage',
    'maturation',
    'environmentalFactors',
    'growthDuration',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    SEED["Seed"] --> GERM["Germination"]
    GERM --> SEEDLING["Seedling"]
    SEEDLING --> VEG["Vegetative Growth"]
    VEG --> FLOWER["Flowering"]
    FLOWER --> FRUIT["Fruit Development"]
    FRUIT --> MATURE["Maturation"]
    MATURE --> HARVEST["Harvest"]
    style SEED fill:#8B4513
    style HARVEST fill:#228B22`,
};

/**
 * Photosynthesis Process template
 */
export const photosynthesisProcess: DiagramTemplate = {
  id: 'agri-photosynthesis',
  name: 'Photosynthesis Process',
  description: 'Light and dark reactions of photosynthesis in crops',
  domain: 'biology',
  promptTemplate: `Create a photosynthesis process diagram:
- Light reactions: {{lightReactions}}
- Calvin cycle: {{calvinCycle}}
- Chloroplast structure: {{chloroplastStructure}}
- Input requirements: {{inputRequirements}}
- Output products: {{outputProducts}}
- Limiting factors: {{limitingFactors}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'lightReactions',
    'calvinCycle',
    'chloroplastStructure',
    'inputRequirements',
    'outputProducts',
    'limitingFactors',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    LIGHT["Sunlight"] --> CHLOR["Chloroplast"]
    CO2["CO₂"] --> CHLOR
    H2O["H₂O"] --> CHLOR
    CHLOR --> LRXN["Light Reactions"]
    LRXN --> ATP["ATP + NADPH"]
    ATP --> CALVIN["Calvin Cycle"]
    CO2 --> CALVIN
    CALVIN --> SUGAR["Glucose"]
    LRXN --> O2["O₂ Release"]
    style LIGHT fill:#FFD700
    style SUGAR fill:#228B22`,
};

/**
 * Soil Nutrient Cycle template
 */
export const soilNutrientCycle: DiagramTemplate = {
  id: 'agri-nutrient-cycle',
  name: 'Soil Nutrient Cycle',
  description: 'Nutrient cycling in agricultural soils',
  domain: 'biology',
  promptTemplate: `Create a soil nutrient cycle diagram:
- Organic matter decomposition: {{organicMatterDecomposition}}
- Nutrient mineralization: {{nutrientMineralization}}
- Plant uptake: {{plantUptake}}
- Nutrient losses: {{nutrientLosses}}
- Fertilizer inputs: {{fertilizerInputs}}
- Soil organisms: {{soilOrganisms}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'organicMatterDecomposition',
    'nutrientMineralization',
    'plantUptake',
    'nutrientLosses',
    'fertilizerInputs',
    'soilOrganisms',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    ORG["Organic Matter"] --> DEC["Decomposition"]
    DEC --> NUTR["Available Nutrients"]
    FERT["Fertilizer"] --> NUTR
    NUTR --> PLANT["Plant Uptake"]
    NUTR --> LEACH["Leaching Loss"]
    PLANT --> RES["Crop Residues"]
    RES --> ORG
    style ORG fill:#8B4513
    style PLANT fill:#228B22`,
};

/**
 * Pollination Process template
 */
export const pollinationProcess: DiagramTemplate = {
  id: 'agri-pollination',
  name: 'Pollination Process',
  description: 'Plant pollination mechanisms and agricultural importance',
  domain: 'biology',
  promptTemplate: `Create a pollination process diagram:
- Pollinator types: {{pollinatorTypes}}
- Self vs cross pollination: {{selfVsCross}}
- Flower structure: {{flowerStructure}}
- Pollen transfer: {{pollenTransfer}}
- Fertilization: {{fertilization}}
- Crop dependence: {{cropDependence}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'pollinatorTypes',
    'selfVsCross',
    'flowerStructure',
    'pollenTransfer',
    'fertilization',
    'cropDependence',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    FLOWER["Flower"] --> POLLEN["Pollen Production"]
    POLLEN --> BEES["Bee Pollination"]
    POLLEN --> WIND["Wind Pollination"]
    POLLEN --> SELF["Self Pollination"]
    BEES & WIND & SELF --> STIGMA["Stigma Reception"]
    STIGMA --> TUBE["Pollen Tube Growth"]
    TUBE --> FERT["Fertilization"]
    FERT --> SEED["Seed Development"]
    style BEES fill:#FFD700
    style SEED fill:#228B22`,
};

// =============================================================================
// RESEARCH METHODOLOGIES
// =============================================================================

/**
 * Field Trial Design template
 */
export const fieldTrialDesign: DiagramTemplate = {
  id: 'agri-field-trial',
  name: 'Field Trial Design',
  description: 'Experimental design for agricultural field trials',
  domain: 'biology',
  promptTemplate: `Create a field trial design diagram:
- Experimental design: {{experimentalDesign}}
- Treatment factors: {{treatmentFactors}}
- Replication: {{replication}}
- Plot layout: {{plotLayout}}
- Data collection: {{dataCollection}}
- Statistical analysis: {{statisticalAnalysis}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'experimentalDesign',
    'treatmentFactors',
    'replication',
    'plotLayout',
    'dataCollection',
    'statisticalAnalysis',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    OBJ["Research Objectives"] --> DESIGN["Experimental Design"]
    DESIGN --> RCB["Randomized Block"]
    DESIGN --> SPLIT["Split Plot"]
    DESIGN --> FACT["Factorial"]
    RCB & SPLIT & FACT --> LAYOUT["Field Layout"]
    LAYOUT --> PLANT["Planting"]
    PLANT --> MANAGE["Management"]
    MANAGE --> DATA["Data Collection"]
    DATA --> ANAL["Statistical Analysis"]
    style OBJ fill:#4169E1
    style ANAL fill:#228B22`,
};

/**
 * Soil Testing Protocol template
 */
export const soilTestingProtocol: DiagramTemplate = {
  id: 'agri-soil-testing',
  name: 'Soil Testing Protocol',
  description: 'Systematic soil sampling and analysis workflow',
  domain: 'biology',
  promptTemplate: `Create a soil testing protocol diagram:
- Sampling strategy: {{samplingStrategy}}
- Sample collection: {{sampleCollection}}
- Sample preparation: {{samplePreparation}}
- Laboratory analysis: {{laboratoryAnalysis}}
- Result interpretation: {{resultInterpretation}}
- Recommendations: {{recommendations}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'samplingStrategy',
    'sampleCollection',
    'samplePreparation',
    'laboratoryAnalysis',
    'resultInterpretation',
    'recommendations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    PLAN["Sampling Plan"] --> GRID["Grid Sampling"]
    PLAN --> ZONE["Zone Sampling"]
    GRID & ZONE --> COLL["Sample Collection"]
    COLL --> PREP["Sample Preparation"]
    PREP --> LAB["Laboratory Analysis"]
    LAB --> PH["pH"]
    LAB --> NUTR["Nutrients"]
    LAB --> OM["Organic Matter"]
    PH & NUTR & OM --> REC["Fertilizer Recommendations"]
    style PLAN fill:#8B4513
    style REC fill:#228B22`,
};

/**
 * Crop Monitoring System template
 */
export const cropMonitoringSystem: DiagramTemplate = {
  id: 'agri-crop-monitoring',
  name: 'Crop Monitoring System',
  description: 'Remote sensing and field-based crop monitoring workflow',
  domain: 'biology',
  promptTemplate: `Create a crop monitoring system diagram:
- Remote sensing: {{remoteSensing}}
- Field scouting: {{fieldScouting}}
- Sensor networks: {{sensorNetworks}}
- Data integration: {{dataIntegration}}
- Decision support: {{decisionSupport}}
- Management actions: {{managementActions}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'remoteSensing',
    'fieldScouting',
    'sensorNetworks',
    'dataIntegration',
    'decisionSupport',
    'managementActions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    SAT["Satellite Imagery"] --> NDVI["NDVI Analysis"]
    DRONE["Drone Survey"] --> MAP["Field Mapping"]
    SCOUT["Field Scouting"] --> OBS["Observations"]
    NDVI & MAP & OBS --> DATA["Data Platform"]
    DATA --> DSS["Decision Support"]
    DSS --> FERT["Fertilization"]
    DSS --> PEST["Pest Control"]
    DSS --> IRR["Irrigation"]
    style SAT fill:#4169E1
    style DSS fill:#228B22`,
};

// =============================================================================
// CLASSIFICATION SYSTEMS
// =============================================================================

/**
 * Crop Classification template
 */
export const cropClassification: DiagramTemplate = {
  id: 'agri-crop-classification',
  name: 'Crop Classification System',
  description: 'Classification of crops by botanical and agronomic characteristics',
  domain: 'biology',
  promptTemplate: `Create a crop classification diagram:
- Botanical classification: {{botanicalClassification}}
- Growth habit: {{growthHabit}}
- Use categories: {{useCategories}}
- Season of growth: {{seasonOfGrowth}}
- Life cycle: {{lifeCycle}}
- Climate requirements: {{climateRequirements}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'botanicalClassification',
    'growthHabit',
    'useCategories',
    'seasonOfGrowth',
    'lifeCycle',
    'climateRequirements',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    CROPS["Crops"] --> CEREAL["Cereals"]
    CROPS --> LEGUME["Legumes"]
    CROPS --> OIL["Oilseeds"]
    CROPS --> FIBER["Fiber Crops"]
    CROPS --> VEG["Vegetables"]
    CEREAL --> WHEAT["Wheat"]
    CEREAL --> RICE["Rice"]
    CEREAL --> CORN["Corn"]
    LEGUME --> SOY["Soybean"]
    LEGUME --> BEAN["Beans"]
    style CEREAL fill:#DAA520
    style LEGUME fill:#228B22`,
};

/**
 * Pest Classification template
 */
export const pestClassification: DiagramTemplate = {
  id: 'agri-pest-classification',
  name: 'Agricultural Pest Classification',
  description: 'Classification of agricultural pests and their management',
  domain: 'biology',
  promptTemplate: `Create a pest classification diagram:
- Insect pests: {{insectPests}}
- Disease pathogens: {{diseasePathogens}}
- Weed types: {{weedTypes}}
- Vertebrate pests: {{vertebratePests}}
- Damage types: {{damageTypes}}
- Control methods: {{controlMethods}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'insectPests',
    'diseasePathogens',
    'weedTypes',
    'vertebratePests',
    'damageTypes',
    'controlMethods',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    PEST["Agricultural Pests"] --> INS["Insects"]
    PEST --> DIS["Diseases"]
    PEST --> WEED["Weeds"]
    PEST --> VERT["Vertebrates"]
    INS --> CHEW["Chewing Insects"]
    INS --> SUCK["Sucking Insects"]
    DIS --> FUNG["Fungi"]
    DIS --> BACT["Bacteria"]
    DIS --> VIRUS["Viruses"]
    style PEST fill:#DC143C
    style INS fill:#FF4500`,
};

/**
 * Soil Classification template
 */
export const soilClassification: DiagramTemplate = {
  id: 'agri-soil-classification',
  name: 'Soil Classification System',
  description: 'USDA soil taxonomy and agricultural soil types',
  domain: 'biology',
  promptTemplate: `Create a soil classification diagram:
- Soil orders: {{soilOrders}}
- Texture classes: {{textureClasses}}
- Structure types: {{structureTypes}}
- Drainage classes: {{drainageClasses}}
- Fertility levels: {{fertilityLevels}}
- Land capability: {{landCapability}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'soilOrders',
    'textureClasses',
    'structureTypes',
    'drainageClasses',
    'fertilityLevels',
    'landCapability',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    SOIL["Soil Classification"] --> TEXT["By Texture"]
    SOIL --> ORDER["By Order"]
    TEXT --> SAND["Sandy"]
    TEXT --> LOAM["Loamy"]
    TEXT --> CLAY["Clayey"]
    ORDER --> MOLL["Mollisols"]
    ORDER --> ALF["Alfisols"]
    ORDER --> VERT["Vertisols"]
    style LOAM fill:#8B4513
    style MOLL fill:#228B22`,
};

// =============================================================================
// PROCESS FLOWS
// =============================================================================

/**
 * Integrated Pest Management template
 */
export const integratedPestManagement: DiagramTemplate = {
  id: 'agri-ipm',
  name: 'Integrated Pest Management',
  description: 'IPM decision-making and intervention hierarchy',
  domain: 'biology',
  promptTemplate: `Create an IPM flowchart:
- Monitoring methods: {{monitoringMethods}}
- Threshold determination: {{thresholdDetermination}}
- Cultural controls: {{culturalControls}}
- Biological controls: {{biologicalControls}}
- Chemical controls: {{chemicalControls}}
- Evaluation: {{evaluation}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'monitoringMethods',
    'thresholdDetermination',
    'culturalControls',
    'biologicalControls',
    'chemicalControls',
    'evaluation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    MON["Pest Monitoring"] --> ID["Pest Identification"]
    ID --> THRESH{"Above Threshold?"}
    THRESH -->|"No"| MON
    THRESH -->|"Yes"| CULT["Cultural Control"]
    CULT --> BIO["Biological Control"]
    BIO --> CHEM["Chemical Control"]
    CHEM --> EVAL["Evaluate Effectiveness"]
    EVAL --> MON
    style MON fill:#4169E1
    style CHEM fill:#DC143C`,
};

/**
 * Irrigation Scheduling template
 */
export const irrigationScheduling: DiagramTemplate = {
  id: 'agri-irrigation-scheduling',
  name: 'Irrigation Scheduling',
  description: 'Water management decision process for crop irrigation',
  domain: 'biology',
  promptTemplate: `Create an irrigation scheduling diagram:
- Soil moisture monitoring: {{soilMoistureMonitoring}}
- Crop water requirements: {{cropWaterRequirements}}
- Weather data: {{weatherData}}
- Irrigation system: {{irrigationSystem}}
- Application timing: {{applicationTiming}}
- Water use efficiency: {{waterUseEfficiency}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'soilMoistureMonitoring',
    'cropWaterRequirements',
    'weatherData',
    'irrigationSystem',
    'applicationTiming',
    'waterUseEfficiency',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    SOIL["Soil Moisture Sensors"] --> DATA["Data Collection"]
    WEATHER["Weather Station"] --> DATA
    CROP["Crop Stage"] --> ET["ET Calculation"]
    DATA & ET --> DSS["Decision Support"]
    DSS --> SCHED["Irrigation Schedule"]
    SCHED --> APPLY["Water Application"]
    APPLY --> MONITOR["Monitor Response"]
    MONITOR --> SOIL
    style DSS fill:#4169E1
    style APPLY fill:#228B22`,
};

/**
 * Crop Rotation System template
 */
export const cropRotationSystem: DiagramTemplate = {
  id: 'agri-crop-rotation',
  name: 'Crop Rotation System',
  description: 'Planned sequence of crops for sustainable production',
  domain: 'biology',
  promptTemplate: `Create a crop rotation system diagram:
- Rotation sequence: {{rotationSequence}}
- Crop families: {{cropFamilies}}
- Nutrient management: {{nutrientManagement}}
- Disease break: {{diseaseBreak}}
- Soil health benefits: {{soilHealthBenefits}}
- Economic considerations: {{economicConsiderations}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'rotationSequence',
    'cropFamilies',
    'nutrientManagement',
    'diseaseBreak',
    'soilHealthBenefits',
    'economicConsiderations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    Y1["Year 1: Corn"] --> Y2["Year 2: Soybean"]
    Y2 --> Y3["Year 3: Wheat"]
    Y3 --> Y4["Year 4: Cover Crop"]
    Y4 --> Y1
    Y2 -->|"N Fixation"| SOIL["Soil Health"]
    Y4 -->|"Organic Matter"| SOIL
    style Y1 fill:#DAA520
    style Y2 fill:#228B22`,
};

/**
 * Harvest and Post-Harvest template
 */
export const harvestPostHarvest: DiagramTemplate = {
  id: 'agri-harvest-postharvest',
  name: 'Harvest and Post-Harvest',
  description: 'Crop harvesting and post-harvest handling workflow',
  domain: 'biology',
  promptTemplate: `Create a harvest and post-harvest diagram:
- Harvest timing: {{harvestTiming}}
- Harvest methods: {{harvestMethods}}
- Field handling: {{fieldHandling}}
- Drying and curing: {{dryingCuring}}
- Storage conditions: {{storageConditions}}
- Quality control: {{qualityControl}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'harvestTiming',
    'harvestMethods',
    'fieldHandling',
    'dryingCuring',
    'storageConditions',
    'qualityControl',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    MAT["Crop Maturity"] --> HARV["Harvest"]
    HARV --> TRANS["Field Transport"]
    TRANS --> CLEAN["Cleaning"]
    CLEAN --> DRY["Drying"]
    DRY --> GRADE["Grading"]
    GRADE --> STORE["Storage"]
    STORE --> MARKET["Market"]
    style MAT fill:#DAA520
    style MARKET fill:#228B22`,
};

/**
 * Precision Agriculture Workflow template
 */
export const precisionAgricultureWorkflow: DiagramTemplate = {
  id: 'agri-precision-agriculture',
  name: 'Precision Agriculture Workflow',
  description: 'Technology-driven site-specific crop management',
  domain: 'biology',
  promptTemplate: `Create a precision agriculture workflow:
- Data collection: {{dataCollection}}
- Spatial analysis: {{spatialAnalysis}}
- Variable rate technology: {{variableRateTechnology}}
- GPS guidance: {{gpsGuidance}}
- Yield mapping: {{yieldMapping}}
- Economic analysis: {{economicAnalysis}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'dataCollection',
    'spatialAnalysis',
    'variableRateTechnology',
    'gpsGuidance',
    'yieldMapping',
    'economicAnalysis',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    SENSE["Sensors/Imagery"] --> DATA["Data Collection"]
    GPS["GPS/GNSS"] --> DATA
    DATA --> GIS["GIS Analysis"]
    GIS --> ZONES["Management Zones"]
    ZONES --> VRT["Variable Rate Rx"]
    VRT --> APPLY["Precision Application"]
    APPLY --> YIELD["Yield Monitor"]
    YIELD --> ANAL["Economic Analysis"]
    style SENSE fill:#4169E1
    style APPLY fill:#228B22`,
};

/**
 * Sustainable Agriculture Practices template
 */
export const sustainableAgriculturePractices: DiagramTemplate = {
  id: 'agri-sustainable-practices',
  name: 'Sustainable Agriculture Practices',
  description: 'Environmentally sound agricultural production systems',
  domain: 'biology',
  promptTemplate: `Create a sustainable agriculture practices diagram:
- Conservation tillage: {{conservationTillage}}
- Cover cropping: {{coverCropping}}
- Nutrient management: {{nutrientManagement}}
- Water conservation: {{waterConservation}}
- Biodiversity enhancement: {{biodiversityEnhancement}}
- Carbon sequestration: {{carbonSequestration}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'conservationTillage',
    'coverCropping',
    'nutrientManagement',
    'waterConservation',
    'biodiversityEnhancement',
    'carbonSequestration',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    SUST["Sustainable Agriculture"] --> SOIL["Soil Health"]
    SUST --> WATER["Water Quality"]
    SUST --> BIO["Biodiversity"]
    SOIL --> NOTILL["No-Till"]
    SOIL --> COVER["Cover Crops"]
    WATER --> BUFF["Buffer Strips"]
    WATER --> IRR["Efficient Irrigation"]
    BIO --> HEDGE["Hedgerows"]
    BIO --> HABIT["Habitat Areas"]
    style SUST fill:#228B22
    style SOIL fill:#8B4513`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All agriculture templates
 */
export const agricultureTemplates: DiagramTemplate[] = [
  // Natural Phenomena
  plantGrowthCycle,
  photosynthesisProcess,
  soilNutrientCycle,
  pollinationProcess,
  // Research Methodologies
  fieldTrialDesign,
  soilTestingProtocol,
  cropMonitoringSystem,
  // Classification Systems
  cropClassification,
  pestClassification,
  soilClassification,
  // Process Flows
  integratedPestManagement,
  irrigationScheduling,
  cropRotationSystem,
  harvestPostHarvest,
  precisionAgricultureWorkflow,
  sustainableAgriculturePractices,
];

export default agricultureTemplates;
