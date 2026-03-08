/**
 * agriculture-prompts.ts
 * Agriculture-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for agricultural science including:
 * - Crop science (plant growth, phenology, breeding)
 * - Soil science (profiles, nutrients, amendments)
 * - Irrigation systems (drip, sprinkler, flood)
 * - Pest management (IPM, biological control, pesticides)
 * - Livestock systems (nutrition, housing, breeding)
 * - Precision agriculture (sensors, GPS, variable rate)
 *
 * Total: 18 specialized prompts
 *
 * Ralph Loop - COMPLETE checkpoint
 */

import type { FewShotExample } from './index';

// =============================================================================
// AGRICULTURE DOMAIN PROMPT
// =============================================================================

/**
 * Base agriculture domain prompt for agricultural diagrams
 */
export const AGRICULTURE_DOMAIN_PROMPT = `
Agriculture diagram requirements:
- Use standard agricultural terminology and units (hectares, bushels, kg/ha)
- Follow crop growth stage conventions (BBCH scale, Feekes scale)
- Include proper soil horizon notation (O, A, B, C, R horizons)
- Show nutrient cycles with element symbols (N, P, K, Ca, Mg)
- Use color coding: Healthy plants (green), Stressed (yellow), Diseased (brown)
- Include scale bars for field and plant diagrams
- Mark cardinal directions for field layouts
- Show water movement with blue arrows, nutrient flow with colored arrows
- Include seasonal timing information where relevant
- Mark economic thresholds for pest management decisions`;

// =============================================================================
// AGRICULTURE-SPECIFIC PROMPTS
// =============================================================================

export const AGRICULTURE_PROMPTS = {
  // Crop Science
  plantGrowthStages: `
Plant Growth Stages requirements:
- Show vegetative stages (germination, emergence, leaf development)
- Include reproductive stages (flowering, pollination, grain fill)
- Mark critical growth periods for yield determination
- Show root development progression
- Include biomass accumulation curve
- Mark heat unit (GDD) requirements per stage
- Show photoperiod sensitivity windows
- Include typical duration for each stage`,

  cropRotation: `
Crop Rotation System requirements:
- Show multi-year rotation sequence (e.g., corn-soybean-wheat)
- Include nutrient cycling benefits (N fixation by legumes)
- Mark pest and disease break cycles
- Show soil health improvements over rotation
- Include cover crop integration points
- Mark tillage system compatibility
- Show economic considerations per crop
- Include water use efficiency comparisons`,

  plantBreeding: `
Plant Breeding Process requirements:
- Show crossing scheme (parent selection, hybridization)
- Include Punnett square for trait inheritance
- Mark selection criteria and screening methods
- Show generation advancement (F1, F2, etc.)
- Include backcross breeding for trait introgression
- Mark heterosis/hybrid vigor in F1
- Show variety development timeline
- Include molecular marker assisted selection`,

  photosynthesisEfficiency: `
Crop Photosynthesis requirements:
- Show C3 vs C4 photosynthetic pathways
- Include light response curves (saturation points)
- Mark CO2 compensation points
- Show leaf anatomy differences (bundle sheath)
- Include photorespiration in C3 plants
- Mark temperature optima for each type
- Show water use efficiency comparison
- Include CAM metabolism for arid crops`,

  // Soil Science
  soilProfile: `
Soil Profile requirements:
- Show distinct horizons (O-organic, A-topsoil, B-subsoil, C-parent, R-bedite)
- Include horizon depths and thickness ranges
- Mark color variations using Munsell notation
- Show root penetration depth limits
- Include texture and structure descriptions
- Mark water table position if present
- Show diagnostic horizons for classification
- Include organic matter distribution`,

  nutrientCycling: `
Soil Nutrient Cycling requirements:
- Show nitrogen cycle (fixation, mineralization, nitrification, denitrification)
- Include phosphorus cycle (weathering, uptake, fixation)
- Mark potassium dynamics (exchange, fixation)
- Show organic matter decomposition pathway
- Include microbial biomass role
- Mark plant uptake mechanisms
- Show losses (leaching, volatilization, erosion)
- Include fertilizer input points`,

  soilWaterRelations: `
Soil Water Relations requirements:
- Show soil water content ranges (saturation, field capacity, wilting point)
- Include plant available water calculation
- Mark capillary rise and gravitational drainage
- Show infiltration vs runoff dynamics
- Include soil texture effects on water holding
- Mark evapotranspiration components
- Show root water uptake patterns
- Include soil water characteristic curve`,

  // Irrigation Systems
  irrigationMethods: `
Irrigation Methods Comparison requirements:
- Show surface irrigation (flood, furrow, border)
- Include pressurized systems (sprinkler, drip)
- Mark application efficiency percentages
- Show water distribution uniformity
- Include energy requirements comparison
- Mark suitable terrain and crop conditions
- Show labor requirements
- Include initial and operating costs`,

  dripIrrigationDesign: `
Drip Irrigation System requirements:
- Show mainline, submains, and laterals layout
- Include emitter spacing and flow rates
- Mark pressure regulators and filters
- Show fertigation injection points
- Include wetting pattern cross-section
- Mark system pressure requirements
- Show zone control valves
- Include automation and scheduling controls`,

  // Pest Management
  ipmPyramid: `
Integrated Pest Management requirements:
- Show IPM pyramid (prevention, cultural, biological, chemical)
- Include monitoring and scouting protocols
- Mark economic threshold decision points
- Show beneficial insect conservation
- Include cultural control practices
- Mark biological control agents
- Show pesticide selection criteria
- Include resistance management rotation`,

  pestLifeCycle: `
Pest Life Cycle requirements:
- Show complete metamorphosis stages (egg, larva, pupa, adult)
- Include timing relative to crop stages
- Mark vulnerable stages for control
- Show overwintering locations
- Include degree day accumulation model
- Mark generation timing per season
- Show damage potential per stage
- Include natural enemy life cycle overlay`,

  diseaseTriangle: `
Disease Triangle requirements:
- Show three components (host, pathogen, environment)
- Include disease development conditions
- Mark susceptible growth stages
- Show pathogen reproduction cycle
- Include environmental modifiers
- Mark management intervention points
- Show resistance mechanisms
- Include epidemiological spread patterns`,

  // Livestock Systems
  animalNutrition: `
Livestock Nutrition requirements:
- Show digestive system anatomy (ruminant vs monogastric)
- Include nutrient requirements by production stage
- Mark feed ingredient compositions
- Show ration formulation balance
- Include feed conversion efficiency
- Mark metabolic pathways for energy
- Show protein degradation (rumen) vs bypass
- Include mineral and vitamin requirements`,

  livestockHousing: `
Livestock Housing Design requirements:
- Show building layout and animal flow
- Include ventilation system design
- Mark space requirements per animal
- Show feeding and watering systems
- Include waste management systems
- Mark environmental control zones
- Show biosecurity entry points
- Include worker safety considerations`,

  // Precision Agriculture
  precisionAgTechnology: `
Precision Agriculture Systems requirements:
- Show GPS/GNSS guidance components
- Include yield monitor data collection
- Mark variable rate application zones
- Show sensor technologies (NDVI, soil EC)
- Include data management platform
- Mark prescription map generation
- Show machine-to-machine communication
- Include ROI analysis metrics`,

  yieldMapping: `
Yield Mapping requirements:
- Show combine yield monitor components
- Include GPS position correlation
- Mark data cleaning procedures
- Show spatial interpolation methods
- Include zone delineation from yield data
- Mark year-over-year comparison
- Show agronomic interpretation
- Include decision support outputs`,

  variableRateApplication: `
Variable Rate Application requirements:
- Show prescription map creation workflow
- Include application equipment controllers
- Mark rate change response time
- Show overlap management
- Include as-applied map generation
- Mark prescription vs applied comparison
- Show economic analysis per zone
- Include environmental benefit assessment`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

export const AGRICULTURE_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a soil profile diagram showing major horizons',
    output: `flowchart TB
    subgraph profile["Soil Profile"]
        O["O Horizon<br/>0-5 cm<br/>Organic layer<br/>Decomposing litter"]
        A["A Horizon<br/>5-30 cm<br/>Topsoil<br/>Dark, organic-rich"]
        B["B Horizon<br/>30-80 cm<br/>Subsoil<br/>Clay accumulation"]
        C["C Horizon<br/>80-150 cm<br/>Parent material<br/>Weathered rock"]
        R["R Horizon<br/>150+ cm<br/>Bedrock<br/>Unweathered"]
    end

    subgraph features["Key Features"]
        roots["Root Zone<br/>0-100 cm depth"]
        water["Water Table<br/>Variable depth"]
        bio["Biological Activity<br/>Highest in A horizon"]
    end

    O --> A
    A --> B
    B --> C
    C --> R

    classDef organic fill:#8b4513,stroke:#5d2e0c,color:#fff
    classDef topsoil fill:#654321,stroke:#3d2817,color:#fff
    classDef subsoil fill:#d2691e,stroke:#8b4513
    classDef parent fill:#deb887,stroke:#d2691e
    classDef bedrock fill:#808080,stroke:#555

    class O organic
    class A topsoil
    class B subsoil
    class C parent
    class R bedrock`,
    reasoning: 'Shows standard soil profile with USDA horizon designations and characteristics',
  },
  {
    prompt: 'Create an IPM pyramid showing management hierarchy',
    output: `flowchart TB
    subgraph ipm["Integrated Pest Management Pyramid"]
        chem["Chemical Control<br/>Last resort<br/>Targeted applications"]
        bio["Biological Control<br/>Natural enemies<br/>Parasitoids, predators"]
        cultural["Cultural Control<br/>Crop rotation, sanitation<br/>Resistant varieties"]
        prev["Prevention<br/>Foundation of IPM<br/>Healthy crops, monitoring"]
    end

    subgraph actions["Management Actions"]
        scout["Scout & Monitor<br/>Weekly field checks"]
        threshold["Economic Threshold<br/>Treatment decision point"]
        record["Record Keeping<br/>Track pest history"]
    end

    prev -->|"First line"| cultural
    cultural -->|"If needed"| bio
    bio -->|"If threshold exceeded"| chem

    note["Goal: Minimize pesticide use<br/>Maximize natural control<br/>Protect beneficial insects"]

    classDef prevention fill:#dcfce7,stroke:#16a34a
    classDef cultural fill:#dbeafe,stroke:#2563eb
    classDef biological fill:#fef3c7,stroke:#d97706
    classDef chemical fill:#fecaca,stroke:#dc2626

    class prev prevention
    class cultural cultural
    class bio biological
    class chem chemical`,
    reasoning: 'Illustrates the hierarchical approach to pest management with prevention as foundation',
  },
  {
    prompt: 'Create a crop rotation diagram for corn-soybean-wheat system',
    output: `flowchart LR
    subgraph year1["Year 1"]
        corn["Corn<br/>High N demand<br/>Heavy feeder"]
    end

    subgraph year2["Year 2"]
        soy["Soybean<br/>N fixation<br/>Disease break"]
    end

    subgraph year3["Year 3"]
        wheat["Wheat<br/>Different root depth<br/>Fall seeding"]
        cover["Cover Crop<br/>After wheat harvest"]
    end

    corn -->|"Residual N<br/>utilized"| soy
    soy -->|"N credit<br/>40-60 lb/ac"| wheat
    wheat --> cover
    cover -->|"Soil health<br/>improved"| corn

    subgraph benefits["Rotation Benefits"]
        pest["Pest cycle break"]
        soil["Soil health"]
        econ["Risk diversification"]
        fert["Nutrient efficiency"]
    end

    classDef corn fill:#fef3c7,stroke:#d97706
    classDef soy fill:#dcfce7,stroke:#16a34a
    classDef wheat fill:#fed7aa,stroke:#ea580c
    classDef cover fill:#dbeafe,stroke:#2563eb

    class corn corn
    class soy soy
    class wheat wheat
    class cover cover`,
    reasoning: 'Shows the nutrient and pest management benefits of a typical Midwest rotation',
  },
];

// =============================================================================
// PROMPT CATEGORIES
// =============================================================================

/**
 * Organized agriculture prompt categories for UI grouping
 */
export const AGRICULTURE_PROMPT_CATEGORIES = {
  cropScience: {
    name: 'Crop Science',
    prompts: ['plantGrowthStages', 'cropRotation', 'plantBreeding', 'photosynthesisEfficiency'],
  },
  soilScience: {
    name: 'Soil Science',
    prompts: ['soilProfile', 'nutrientCycling', 'soilWaterRelations'],
  },
  irrigation: {
    name: 'Irrigation Systems',
    prompts: ['irrigationMethods', 'dripIrrigationDesign'],
  },
  pestManagement: {
    name: 'Pest Management',
    prompts: ['ipmPyramid', 'pestLifeCycle', 'diseaseTriangle'],
  },
  livestock: {
    name: 'Livestock Systems',
    prompts: ['animalNutrition', 'livestockHousing'],
  },
  precisionAg: {
    name: 'Precision Agriculture',
    prompts: ['precisionAgTechnology', 'yieldMapping', 'variableRateApplication'],
  },
};

/**
 * Get a specific agriculture prompt by key
 */
export function getAgriculturePrompt(key: keyof typeof AGRICULTURE_PROMPTS): string {
  return AGRICULTURE_PROMPTS[key];
}

/**
 * Get all agriculture prompts as an array
 */
export function getAllAgriculturePrompts(): { key: string; prompt: string }[] {
  return Object.entries(AGRICULTURE_PROMPTS).map(([key, prompt]) => ({
    key,
    prompt,
  }));
}

/**
 * Get prompts by category
 */
export function getAgriculturePromptsByCategory(category: keyof typeof AGRICULTURE_PROMPT_CATEGORIES): string[] {
  const categoryData = AGRICULTURE_PROMPT_CATEGORIES[category];
  return categoryData.prompts.map((key) => AGRICULTURE_PROMPTS[key as keyof typeof AGRICULTURE_PROMPTS]);
}

const agriculturePrompts = {
  AGRICULTURE_DOMAIN_PROMPT,
  AGRICULTURE_PROMPTS,
  AGRICULTURE_FEW_SHOT_EXAMPLES,
  AGRICULTURE_PROMPT_CATEGORIES,
  getAgriculturePrompt,
  getAllAgriculturePrompts,
  getAgriculturePromptsByCategory,
};
export default agriculturePrompts;
