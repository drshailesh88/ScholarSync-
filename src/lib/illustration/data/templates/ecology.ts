/**
 * ecology.ts
 * Ecology diagram templates for FINNISH
 *
 * Contains comprehensive templates for ecology including:
 * - Ecosystem structure and function
 * - Food webs and energy flow
 * - Population dynamics
 * - Biodiversity and conservation
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// ECOSYSTEM STRUCTURE
// =============================================================================

export const ecosystemComponentsTemplate: DiagramTemplate = {
  id: 'eco-ecosystem-components',
  name: 'Ecosystem Components',
  description: 'Diagram showing biotic and abiotic ecosystem components',
  domain: 'biology',
  promptTemplate: `Create an ecosystem components diagram showing:
- Ecosystem type: {{ecosystemType}}
- Biotic factors: {{bioticFactors}}
- Abiotic factors: {{abioticFactors}}
- Producers: {{producers}}
- Consumers: {{consumers}}
- Decomposers: {{decomposers}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['ecosystemType', 'bioticFactors', 'abioticFactors', 'producers', 'consumers', 'decomposers', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Abiotic["Abiotic Factors"]
        A["Sunlight"] & B["Water"] & C["Temperature"]
    end
    subgraph Biotic["Biotic Factors"]
        D["Producers"] --> E["Consumers"]
        E --> F["Decomposers"]
        F --> D
    end`
};

export const biomeCharacteristicsTemplate: DiagramTemplate = {
  id: 'eco-biome-characteristics',
  name: 'Biome Characteristics',
  description: 'Comparison of major terrestrial biomes',
  domain: 'biology',
  promptTemplate: `Create a biome characteristics diagram showing:
- Biome name: {{biomeName}}
- Climate data: {{climateData}}
- Vegetation type: {{vegetationType}}
- Animal adaptations: {{animalAdaptations}}
- Geographic distribution: {{distribution}}
- Human impact: {{humanImpact}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['biomeName', 'climateData', 'vegetationType', 'animalAdaptations', 'distribution', 'humanImpact', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Biomes["Major Biomes"]
        A["Tropical Rainforest"]
        B["Desert"]
        C["Temperate Forest"]
        D["Grassland"]
        E["Tundra"]
    end
    F["Temperature"] --> Biomes
    G["Precipitation"] --> Biomes`
};

export const aquaticZonesTemplate: DiagramTemplate = {
  id: 'eco-aquatic-zones',
  name: 'Aquatic Ecosystem Zones',
  description: 'Vertical and horizontal zones in aquatic ecosystems',
  domain: 'biology',
  promptTemplate: `Create an aquatic zones diagram showing:
- Ecosystem type: {{ecosystemType}}
- Horizontal zones: {{horizontalZones}}
- Vertical zones: {{verticalZones}}
- Light penetration: {{lightPenetration}}
- Organisms in each zone: {{organisms}}
- Physical parameters: {{physicalParameters}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['ecosystemType', 'horizontalZones', 'verticalZones', 'lightPenetration', 'organisms', 'physicalParameters', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Zones["Ocean Zones"]
        A["Epipelagic (0-200m)"]
        B["Mesopelagic (200-1000m)"]
        C["Bathypelagic (1000-4000m)"]
        D["Abyssopelagic (4000m+)"]
    end
    L["Light"] --> A
    A --> B --> C --> D`
};

// =============================================================================
// FOOD WEBS & ENERGY FLOW
// =============================================================================

export const foodWebTemplate: DiagramTemplate = {
  id: 'eco-food-web',
  name: 'Food Web Diagram',
  description: 'Complex feeding relationships in an ecosystem',
  domain: 'biology',
  promptTemplate: `Create a food web diagram showing:
- Ecosystem: {{ecosystem}}
- Primary producers: {{producers}}
- Primary consumers: {{primaryConsumers}}
- Secondary consumers: {{secondaryConsumers}}
- Tertiary consumers: {{tertiaryConsumers}}
- Decomposers: {{decomposers}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['ecosystem', 'producers', 'primaryConsumers', 'secondaryConsumers', 'tertiaryConsumers', 'decomposers', 'additionalNotes'],
  mermaidExample: `flowchart BT
    P["Plants"] --> H1["Rabbit"]
    P --> H2["Mouse"]
    P --> H3["Grasshopper"]
    H1 --> C1["Fox"]
    H2 --> C1
    H2 --> C2["Snake"]
    H3 --> C3["Frog"]
    C2 --> T["Hawk"]
    C3 --> C2`
};

export const energyPyramidTemplate: DiagramTemplate = {
  id: 'eco-energy-pyramid',
  name: 'Ecological Pyramid',
  description: 'Energy, biomass, or numbers pyramid',
  domain: 'biology',
  promptTemplate: `Create an ecological pyramid showing:
- Pyramid type: {{pyramidType}}
- Trophic levels: {{trophicLevels}}
- Energy values: {{energyValues}}
- Efficiency transfer: {{efficiency}}
- Biomass data: {{biomassData}}
- Interpretation: {{interpretation}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['pyramidType', 'trophicLevels', 'energyValues', 'efficiency', 'biomassData', 'interpretation', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Pyramid["Energy Pyramid"]
        T4["Tertiary (10 kcal)"]
        T3["Secondary (100 kcal)"]
        T2["Primary (1000 kcal)"]
        T1["Producers (10000 kcal)"]
    end
    T1 --> T2 --> T3 --> T4
    E["10% Rule"]`
};

export const carbonCycleTemplate: DiagramTemplate = {
  id: 'eco-carbon-cycle',
  name: 'Carbon Cycle',
  description: 'Global carbon cycling through reservoirs',
  domain: 'biology',
  promptTemplate: `Create a carbon cycle diagram showing:
- Atmospheric carbon: {{atmosphericCarbon}}
- Photosynthesis: {{photosynthesis}}
- Respiration: {{respiration}}
- Decomposition: {{decomposition}}
- Fossil fuels: {{fossilFuels}}
- Ocean absorption: {{oceanAbsorption}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['atmosphericCarbon', 'photosynthesis', 'respiration', 'decomposition', 'fossilFuels', 'oceanAbsorption', 'additionalNotes'],
  mermaidExample: `flowchart TD
    ATM["Atmosphere CO2"] -->|"Photosynthesis"| P["Plants"]
    P -->|"Respiration"| ATM
    P --> C["Consumers"]
    C -->|"Respiration"| ATM
    P & C --> D["Decomposers"]
    D -->|"Respiration"| ATM
    FF["Fossil Fuels"] -->|"Combustion"| ATM`
};

export const nitrogenCycleTemplate: DiagramTemplate = {
  id: 'eco-nitrogen-cycle',
  name: 'Nitrogen Cycle',
  description: 'Nitrogen cycling through ecosystem components',
  domain: 'biology',
  promptTemplate: `Create a nitrogen cycle diagram showing:
- Atmospheric nitrogen: {{atmosphericN2}}
- Nitrogen fixation: {{fixation}}
- Nitrification: {{nitrification}}
- Assimilation: {{assimilation}}
- Ammonification: {{ammonification}}
- Denitrification: {{denitrification}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['atmosphericN2', 'fixation', 'nitrification', 'assimilation', 'ammonification', 'denitrification', 'additionalNotes'],
  mermaidExample: `flowchart TD
    N2["N2 Atmosphere"] -->|"Fixation"| NH4["NH4+"]
    NH4 -->|"Nitrification"| NO3["NO3-"]
    NO3 -->|"Assimilation"| ORG["Organic N"]
    ORG -->|"Ammonification"| NH4
    NO3 -->|"Denitrification"| N2`
};

// =============================================================================
// POPULATION DYNAMICS
// =============================================================================

export const populationGrowthTemplate: DiagramTemplate = {
  id: 'eco-population-growth',
  name: 'Population Growth Models',
  description: 'Exponential and logistic growth curves',
  domain: 'biology',
  promptTemplate: `Create a population growth diagram showing:
- Species: {{species}}
- Growth model: {{growthModel}}
- Birth rate: {{birthRate}}
- Death rate: {{deathRate}}
- Carrying capacity: {{carryingCapacity}}
- r and K values: {{rKValues}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['species', 'growthModel', 'birthRate', 'deathRate', 'carryingCapacity', 'rKValues', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Exponential["Exponential (J-curve)"]
        A["dN/dt = rN"]
    end
    subgraph Logistic["Logistic (S-curve)"]
        B["dN/dt = rN(K-N)/K"]
    end
    C["K = Carrying Capacity"]`
};

export const predatorPreyTemplate: DiagramTemplate = {
  id: 'eco-predator-prey',
  name: 'Predator-Prey Dynamics',
  description: 'Lotka-Volterra population oscillations',
  domain: 'biology',
  promptTemplate: `Create a predator-prey diagram showing:
- Prey species: {{preySpecies}}
- Predator species: {{predatorSpecies}}
- Population cycles: {{populationCycles}}
- Time lag: {{timeLag}}
- Equilibrium points: {{equilibrium}}
- Real-world example: {{example}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['preySpecies', 'predatorSpecies', 'populationCycles', 'timeLag', 'equilibrium', 'example', 'additionalNotes'],
  mermaidExample: `flowchart LR
    subgraph Cycle["Population Cycle"]
        A["Prey Increase"] --> B["Predator Increase"]
        B --> C["Prey Decrease"]
        C --> D["Predator Decrease"]
        D --> A
    end`
};

export const competitionTemplate: DiagramTemplate = {
  id: 'eco-competition',
  name: 'Species Competition',
  description: 'Interspecific and intraspecific competition',
  domain: 'biology',
  promptTemplate: `Create a competition diagram showing:
- Competing species: {{competingSpecies}}
- Competition type: {{competitionType}}
- Resource competed for: {{resource}}
- Niche overlap: {{nicheOverlap}}
- Competitive exclusion: {{exclusion}}
- Character displacement: {{displacement}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['competingSpecies', 'competitionType', 'resource', 'nicheOverlap', 'exclusion', 'displacement', 'additionalNotes'],
  mermaidExample: `flowchart TD
    R["Limited Resource"] --> A["Species A"]
    R --> B["Species B"]
    A & B --> C{"Outcome"}
    C --> D["Exclusion"]
    C --> E["Niche Partitioning"]
    C --> F["Coexistence"]`
};

export const symbiosisTemplate: DiagramTemplate = {
  id: 'eco-symbiosis',
  name: 'Symbiotic Relationships',
  description: 'Types of symbiosis between species',
  domain: 'biology',
  promptTemplate: `Create a symbiosis diagram showing:
- Symbiosis type: {{symbiosisType}}
- Species involved: {{speciesInvolved}}
- Benefit/harm to each: {{benefitHarm}}
- Mechanism of interaction: {{mechanism}}
- Evolutionary significance: {{evolution}}
- Examples: {{examples}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['symbiosisType', 'speciesInvolved', 'benefitHarm', 'mechanism', 'evolution', 'examples', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Types["Symbiosis Types"]
        M["Mutualism (+/+)"]
        C["Commensalism (+/0)"]
        P["Parasitism (+/-)"]
    end
    M --> E1["Bee-Flower"]
    C --> E2["Remora-Shark"]
    P --> E3["Tick-Deer"]`
};

// =============================================================================
// ECOLOGICAL SUCCESSION
// =============================================================================

export const successionTemplate: DiagramTemplate = {
  id: 'eco-succession',
  name: 'Ecological Succession',
  description: 'Primary and secondary succession stages',
  domain: 'biology',
  promptTemplate: `Create a succession diagram showing:
- Succession type: {{successionType}}
- Starting conditions: {{startingConditions}}
- Pioneer species: {{pioneerSpecies}}
- Intermediate stages: {{intermediateStages}}
- Climax community: {{climaxCommunity}}
- Timeline: {{timeline}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['successionType', 'startingConditions', 'pioneerSpecies', 'intermediateStages', 'climaxCommunity', 'timeline', 'additionalNotes'],
  mermaidExample: `flowchart LR
    A["Bare Rock"] --> B["Lichens"]
    B --> C["Mosses"]
    C --> D["Grasses"]
    D --> E["Shrubs"]
    E --> F["Trees"]
    F --> G["Climax Forest"]`
};

// =============================================================================
// BIODIVERSITY & CONSERVATION
// =============================================================================

export const biodiversityTemplate: DiagramTemplate = {
  id: 'eco-biodiversity',
  name: 'Biodiversity Levels',
  description: 'Genetic, species, and ecosystem diversity',
  domain: 'biology',
  promptTemplate: `Create a biodiversity diagram showing:
- Diversity level: {{diversityLevel}}
- Measurement metrics: {{metrics}}
- Species richness: {{speciesRichness}}
- Species evenness: {{speciesEvenness}}
- Shannon index: {{shannonIndex}}
- Conservation status: {{conservationStatus}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['diversityLevel', 'metrics', 'speciesRichness', 'speciesEvenness', 'shannonIndex', 'conservationStatus', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Levels["Biodiversity Levels"]
        A["Genetic Diversity"]
        B["Species Diversity"]
        C["Ecosystem Diversity"]
    end
    D["Richness + Evenness = Diversity Index"]`
};

export const conservationTemplate: DiagramTemplate = {
  id: 'eco-conservation-strategies',
  name: 'Conservation Strategies',
  description: 'Approaches to biodiversity conservation',
  domain: 'biology',
  promptTemplate: `Create a conservation strategies diagram showing:
- Conservation approach: {{approach}}
- Target species/habitat: {{target}}
- In-situ methods: {{inSitu}}
- Ex-situ methods: {{exSitu}}
- Success metrics: {{metrics}}
- Challenges: {{challenges}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['approach', 'target', 'inSitu', 'exSitu', 'metrics', 'challenges', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph InSitu["In-Situ Conservation"]
        A["Protected Areas"]
        B["Wildlife Corridors"]
        C["Habitat Restoration"]
    end
    subgraph ExSitu["Ex-Situ Conservation"]
        D["Zoos/Aquaria"]
        E["Seed Banks"]
        F["Captive Breeding"]
    end`
};

export const speciesAreaTemplate: DiagramTemplate = {
  id: 'eco-species-area',
  name: 'Species-Area Relationship',
  description: 'Island biogeography and habitat fragmentation',
  domain: 'biology',
  promptTemplate: `Create a species-area relationship diagram showing:
- Study system: {{studySystem}}
- Area measurements: {{areaMeasurements}}
- Species counts: {{speciesCounts}}
- Curve equation: {{equation}}
- z value interpretation: {{zValue}}
- Conservation implications: {{implications}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['studySystem', 'areaMeasurements', 'speciesCounts', 'equation', 'zValue', 'implications', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["S = cA^z"] --> B["S = Species number"]
    A --> C["A = Area"]
    A --> D["c = constant"]
    A --> E["z = slope (0.2-0.4)"]
    F["Larger area = More species"]`
};

export const invasiveSpeciesTemplate: DiagramTemplate = {
  id: 'eco-invasive-species',
  name: 'Invasive Species Impact',
  description: 'Effects of invasive species on ecosystems',
  domain: 'biology',
  promptTemplate: `Create an invasive species diagram showing:
- Invasive species: {{invasiveSpecies}}
- Origin and introduction: {{originIntroduction}}
- Spread pattern: {{spreadPattern}}
- Native species affected: {{nativeSpeciesAffected}}
- Ecosystem impacts: {{ecosystemImpacts}}
- Control methods: {{controlMethods}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['invasiveSpecies', 'originIntroduction', 'spreadPattern', 'nativeSpeciesAffected', 'ecosystemImpacts', 'controlMethods', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Introduction"] --> B["Establishment"]
    B --> C["Spread"]
    C --> D["Impact"]
    D --> E["Native Displacement"]
    D --> F["Ecosystem Alteration"]
    D --> G["Economic Damage"]`
};

export const climateChangeImpactTemplate: DiagramTemplate = {
  id: 'eco-climate-change',
  name: 'Climate Change Ecological Impacts',
  description: 'Effects of climate change on ecosystems',
  domain: 'biology',
  promptTemplate: `Create a climate change impact diagram showing:
- Climate factors: {{climateFactors}}
- Temperature changes: {{temperatureChanges}}
- Species responses: {{speciesResponses}}
- Range shifts: {{rangeShifts}}
- Phenology changes: {{phenologyChanges}}
- Ecosystem effects: {{ecosystemEffects}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['climateFactors', 'temperatureChanges', 'speciesResponses', 'rangeShifts', 'phenologyChanges', 'ecosystemEffects', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Climate Change"] --> B["Temperature Rise"]
    A --> C["Precipitation Change"]
    B & C --> D["Species Responses"]
    D --> E["Range Shifts"]
    D --> F["Phenology Changes"]
    D --> G["Extinction Risk"]`
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

export const ecologyTemplates: DiagramTemplate[] = [
  ecosystemComponentsTemplate,
  biomeCharacteristicsTemplate,
  aquaticZonesTemplate,
  foodWebTemplate,
  energyPyramidTemplate,
  carbonCycleTemplate,
  nitrogenCycleTemplate,
  populationGrowthTemplate,
  predatorPreyTemplate,
  competitionTemplate,
  symbiosisTemplate,
  successionTemplate,
  biodiversityTemplate,
  conservationTemplate,
  speciesAreaTemplate,
  invasiveSpeciesTemplate,
  climateChangeImpactTemplate,
];

export default ecologyTemplates;
