/**
 * geology-prompts.ts
 * Geology-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for geological science including:
 * - Plate tectonics (boundaries, subduction, rifting)
 * - Rock cycle (igneous, sedimentary, metamorphic)
 * - Stratigraphy (layers, correlation, dating)
 * - Structural geology (folds, faults, stress)
 * - Mineralogy (crystal systems, identification)
 * - Geologic hazards (earthquakes, volcanoes, landslides)
 *
 * Total: 18 specialized prompts
 *
 * Ralph Loop - COMPLETE checkpoint
 */

import type { FewShotExample } from './index';

// =============================================================================
// GEOLOGY DOMAIN PROMPT
// =============================================================================

/**
 * Base geology domain prompt for geological diagrams
 */
export const GEOLOGY_DOMAIN_PROMPT = `
Geology diagram requirements:
- Use standard geologic symbols and patterns (FGDC standards)
- Include scale bars with appropriate units (m, km, Ma)
- Show stratigraphic columns with proper formation notation
- Use geologic time abbreviations (Ma, Ga, Ky)
- Include compass directions and strike/dip symbols
- Color coding: Igneous (red/pink), Sedimentary (yellow/tan), Metamorphic (purple/green)
- Mark unconformities with wavy lines
- Show fold axes and fault traces with standard symbols
- Include cross-section orientation labels
- Mark mineral identification features (cleavage, fracture, luster)`;

// =============================================================================
// GEOLOGY-SPECIFIC PROMPTS
// =============================================================================

export const GEOLOGY_PROMPTS = {
  // Plate Tectonics
  plateBoundaries: `
Plate Boundary Types requirements:
- Show divergent boundary (mid-ocean ridge, continental rift)
- Include convergent boundary (oceanic-oceanic, oceanic-continental, continental-continental)
- Mark transform boundary (strike-slip motion)
- Show relative plate motion arrows
- Include associated features (trenches, mountain ranges, volcanic arcs)
- Mark earthquake depth patterns at each boundary type
- Show magma generation zones
- Include plate names and velocities`,

  subductionZone: `
Subduction Zone requirements:
- Show descending oceanic plate (angle and depth)
- Include accretionary wedge formation
- Mark Benioff zone earthquake locations
- Show volcanic arc position relative to trench
- Include back-arc basin (if applicable)
- Mark mantle wedge and magma generation
- Show sediment fate (subducted vs accreted)
- Include metamorphic facies zones`,

  midOceanRidge: `
Mid-Ocean Ridge requirements:
- Show rift valley and axial magma chamber
- Include new oceanic crust formation
- Mark hydrothermal vent locations
- Show magnetic striping pattern
- Include pillow basalts and sheeted dikes
- Mark transform fault offsets
- Show spreading rate indicators
- Include age of crust vs distance`,

  // Rock Cycle
  rockCycleComplete: `
Complete Rock Cycle requirements:
- Show three rock types (igneous, sedimentary, metamorphic)
- Include all transformation pathways between types
- Mark processes (melting, crystallization, weathering, erosion)
- Show deposition, lithification, burial
- Include metamorphism (heat and pressure)
- Mark uplift and exposure
- Show magma/lava as central component
- Include examples of each rock type`,

  igneousClassification: `
Igneous Rock Classification requirements:
- Show composition axis (felsic to mafic to ultramafic)
- Include texture axis (intrusive/coarse vs extrusive/fine)
- Mark mineral content at each composition
- Show color index correlation
- Include crystal size indicators
- Mark common rock names in matrix (granite, basalt, etc.)
- Show silica percentage ranges
- Include volcanic equivalents of plutonic rocks`,

  sedimentaryEnvironments: `
Sedimentary Depositional Environments requirements:
- Show continental environments (fluvial, lacustrine, aeolian)
- Include transitional environments (delta, beach, tidal flat)
- Mark marine environments (shelf, slope, deep sea)
- Show characteristic sediment types and structures
- Include grain size distributions
- Mark fossil assemblages typical of each
- Show stratigraphic facies relationships
- Include Walther's Law application`,

  metamorphicFacies: `
Metamorphic Facies requirements:
- Show P-T diagram with facies fields
- Include greenschist, amphibolite, granulite facies
- Mark blueschist and eclogite for subduction
- Show index minerals for each facies
- Include geothermal gradients for different settings
- Mark protolith to metamorphic rock relationships
- Show foliation development
- Include contact vs regional metamorphism`,

  // Stratigraphy
  stratigraphicColumn: `
Stratigraphic Column requirements:
- Show vertical sequence of formations
- Include thickness and lithology for each unit
- Mark formation boundaries and contacts
- Show unconformities (angular, disconformity, nonconformity)
- Include age dates and fossil zones
- Mark depositional environments interpretation
- Show correlation to standard geologic time scale
- Include formation names and members`,

  sequenceStratigraphy: `
Sequence Stratigraphy requirements:
- Show systems tracts (lowstand, transgressive, highstand)
- Include sequence boundaries (erosional unconformity)
- Mark maximum flooding surface
- Show parasequences and stacking patterns
- Include accommodation space concept
- Mark sediment supply effects
- Show Wheeler diagram correlation
- Include seismic reflection patterns`,

  geologicTimeScale: `
Geologic Time Scale requirements:
- Show eons (Hadean, Archean, Proterozoic, Phanerozoic)
- Include eras within Phanerozoic
- Mark periods and epochs
- Show absolute ages at boundaries
- Include major extinction events
- Mark first appearances of major groups
- Show relative duration of intervals
- Include ICS color coding standard`,

  // Structural Geology
  foldTypes: `
Fold Types requirements:
- Show anticline (oldest rocks in core)
- Include syncline (youngest rocks in core)
- Mark fold axis and axial plane
- Show plunging folds with plunge direction
- Include symmetrical vs asymmetrical folds
- Mark overturned and recumbent folds
- Show limb dips and fold wavelength
- Include dome and basin structures`,

  faultTypes: `
Fault Types requirements:
- Show normal fault (extensional, hanging wall down)
- Include reverse/thrust fault (compressional, hanging wall up)
- Mark strike-slip fault (lateral motion)
- Show fault plane, hanging wall, footwall
- Include offset markers and slip direction
- Mark fault breccia and gouge zones
- Show associated structures (drag folds, rollover)
- Include stress orientation for each type`,

  stressStrainRelationships: `
Stress and Strain requirements:
- Show principal stress axes (sigma 1, 2, 3)
- Include stress ellipsoid representation
- Mark brittle vs ductile deformation zones
- Show strain ellipse and finite strain
- Include Mohr circle for failure criteria
- Mark conjugate fracture patterns
- Show relationship of structures to stress
- Include rheology effects (temperature, rate)`,

  // Mineralogy
  crystalSystems: `
Crystal Systems requirements:
- Show all seven crystal systems with examples
- Include cubic (isometric) - halite, pyrite
- Mark tetragonal - zircon, rutile
- Show orthorhombic - olivine, sulfur
- Include hexagonal - quartz, beryl
- Mark monoclinic - orthoclase, gypsum
- Show triclinic - plagioclase, kyanite
- Include trigonal as hexagonal subdivision`,

  mineralIdentification: `
Mineral Identification Flowchart requirements:
- Show hardness testing sequence (Mohs scale)
- Include luster categories (metallic, vitreous, etc.)
- Mark streak color determination
- Show cleavage vs fracture patterns
- Include specific gravity ranges
- Mark crystal habit descriptions
- Show acid reaction (carbonates)
- Include special properties (magnetism, fluorescence)`,

  // Geologic Hazards
  earthquakeMechanics: `
Earthquake Mechanics requirements:
- Show fault rupture and elastic rebound
- Include P-wave and S-wave propagation
- Mark epicenter vs hypocenter
- Show seismic wave attenuation
- Include liquefaction susceptibility
- Mark surface rupture and ground motion
- Show intensity vs magnitude relationship
- Include aftershock sequences`,

  volcanicProcesses: `
Volcanic Processes requirements:
- Show magma chamber and conduit system
- Include effusive vs explosive eruption styles
- Mark tephra classification (ash, lapilli, bombs)
- Show pyroclastic flow generation
- Include lahar hazard zones
- Mark volcanic gas compositions
- Show caldera formation sequence
- Include volcanic hazard mapping`,

  massMoement: `
Mass Movement Types requirements:
- Show falls (rockfall, debris fall)
- Include slides (rotational, translational)
- Mark flows (debris flow, mudflow, creep)
- Show triggering factors (water, earthquakes)
- Include velocity classification
- Mark head scarp and toe features
- Show factor of safety concept
- Include mitigation measures`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

export const GEOLOGY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a rock cycle diagram showing all three rock types',
    output: `flowchart TB
    subgraph rocks["The Rock Cycle"]
        igneous["IGNEOUS ROCK<br/>Granite, Basalt<br/>From cooling magma"]
        sed["SEDIMENTARY ROCK<br/>Sandstone, Limestone<br/>From deposited sediments"]
        meta["METAMORPHIC ROCK<br/>Marble, Slate<br/>From heat & pressure"]
        magma["MAGMA/LAVA<br/>Molten rock"]
    end

    subgraph processes["Processes"]
        weather["Weathering & Erosion"]
        deposit["Deposition & Lithification"]
        metamorph["Heat & Pressure"]
        melt["Melting"]
        crystal["Crystallization"]
        uplift["Uplift & Exposure"]
    end

    igneous -->|"Weathering"| weather
    weather -->|"Transport"| deposit
    deposit --> sed
    sed -->|"Burial"| metamorph
    metamorph --> meta
    meta -->|"Deep burial"| melt
    melt --> magma
    magma -->|"Cooling"| crystal
    crystal --> igneous

    igneous -->|"Direct"| metamorph
    sed -->|"Direct"| melt
    meta -->|"Uplift"| weather

    classDef igneous fill:#fecaca,stroke:#dc2626
    classDef sed fill:#fef3c7,stroke:#d97706
    classDef meta fill:#ddd6fe,stroke:#7c3aed
    classDef magma fill:#fca5a5,stroke:#b91c1c

    class igneous igneous
    class sed sed
    class meta meta
    class magma magma`,
    reasoning: 'Shows the complete rock cycle with all transformation pathways between rock types',
  },
  {
    prompt: 'Create a subduction zone cross-section diagram',
    output: `flowchart LR
    subgraph ocean["Oceanic Plate"]
        oceanic_crust["Oceanic Crust<br/>7 km thick"]
        ocean_litho["Oceanic Lithosphere"]
    end

    subgraph trench["Trench"]
        deep["Deep Sea Trench<br/>8-11 km depth"]
        wedge["Accretionary Wedge"]
    end

    subgraph continent["Continental Plate"]
        cont_crust["Continental Crust<br/>35 km thick"]
        arc["Volcanic Arc<br/>100-200 km from trench"]
        backarc["Back-arc Region"]
    end

    subgraph mantle["Mantle"]
        mantle_wedge["Mantle Wedge<br/>Partial melting zone"]
        benioff["Benioff Zone<br/>Earthquake foci"]
    end

    ocean_litho -->|"Subducts"| deep
    deep --> wedge
    wedge --> cont_crust
    mantle_wedge -->|"Magma rises"| arc

    note["Benioff Zone earthquakes:<br/>Shallow (0-70km): Near trench<br/>Intermediate (70-300km): Under arc<br/>Deep (300-700km): Mantle"]

    classDef oceanic fill:#dbeafe,stroke:#2563eb
    classDef continental fill:#fed7aa,stroke:#ea580c
    classDef volcanic fill:#fecaca,stroke:#dc2626
    classDef mantle fill:#dcfce7,stroke:#16a34a

    class oceanic_crust,ocean_litho oceanic
    class cont_crust,backarc continental
    class arc,mantle_wedge volcanic
    class deep,wedge,benioff mantle`,
    reasoning: 'Illustrates the structure and processes at a subduction zone plate boundary',
  },
  {
    prompt: 'Create a geologic time scale diagram',
    output: `flowchart TB
    subgraph timescale["Geologic Time Scale"]
        subgraph phanerozoic["Phanerozoic Eon (541 Ma - Present)"]
            cenozoic["Cenozoic Era<br/>66 Ma - Present<br/>Age of Mammals"]
            mesozoic["Mesozoic Era<br/>252-66 Ma<br/>Age of Dinosaurs"]
            paleozoic["Paleozoic Era<br/>541-252 Ma<br/>Early complex life"]
        end

        subgraph precambrian["Precambrian (4,600-541 Ma)"]
            proterozoic["Proterozoic Eon<br/>2,500-541 Ma<br/>First eukaryotes"]
            archean["Archean Eon<br/>4,000-2,500 Ma<br/>First prokaryotes"]
            hadean["Hadean Eon<br/>4,600-4,000 Ma<br/>Formation of Earth"]
        end
    end

    subgraph events["Major Events"]
        kt["K-Pg Extinction<br/>66 Ma"]
        pt["P-T Extinction<br/>252 Ma"]
        cambrian["Cambrian Explosion<br/>541 Ma"]
        goe["Great Oxidation<br/>2,400 Ma"]
    end

    cenozoic --> mesozoic
    mesozoic --> paleozoic
    paleozoic --> proterozoic
    proterozoic --> archean
    archean --> hadean

    classDef cenozoic fill:#fef3c7,stroke:#d97706
    classDef mesozoic fill:#dcfce7,stroke:#16a34a
    classDef paleozoic fill:#dbeafe,stroke:#2563eb
    classDef precambrian fill:#e5e7eb,stroke:#6b7280

    class cenozoic cenozoic
    class mesozoic mesozoic
    class paleozoic paleozoic
    class proterozoic,archean,hadean precambrian`,
    reasoning: 'Shows the major divisions of geologic time with key events',
  },
];

// =============================================================================
// PROMPT CATEGORIES
// =============================================================================

/**
 * Organized geology prompt categories for UI grouping
 */
export const GEOLOGY_PROMPT_CATEGORIES = {
  plateTectonics: {
    name: 'Plate Tectonics',
    prompts: ['plateBoundaries', 'subductionZone', 'midOceanRidge'],
  },
  rockCycle: {
    name: 'Rock Cycle & Petrology',
    prompts: ['rockCycleComplete', 'igneousClassification', 'sedimentaryEnvironments', 'metamorphicFacies'],
  },
  stratigraphy: {
    name: 'Stratigraphy',
    prompts: ['stratigraphicColumn', 'sequenceStratigraphy', 'geologicTimeScale'],
  },
  structuralGeology: {
    name: 'Structural Geology',
    prompts: ['foldTypes', 'faultTypes', 'stressStrainRelationships'],
  },
  mineralogy: {
    name: 'Mineralogy',
    prompts: ['crystalSystems', 'mineralIdentification'],
  },
  hazards: {
    name: 'Geologic Hazards',
    prompts: ['earthquakeMechanics', 'volcanicProcesses', 'massMoement'],
  },
};

/**
 * Get a specific geology prompt by key
 */
export function getGeologyPrompt(key: keyof typeof GEOLOGY_PROMPTS): string {
  return GEOLOGY_PROMPTS[key];
}

/**
 * Get all geology prompts as an array
 */
export function getAllGeologyPrompts(): { key: string; prompt: string }[] {
  return Object.entries(GEOLOGY_PROMPTS).map(([key, prompt]) => ({
    key,
    prompt,
  }));
}

/**
 * Get prompts by category
 */
export function getGeologyPromptsByCategory(category: keyof typeof GEOLOGY_PROMPT_CATEGORIES): string[] {
  const categoryData = GEOLOGY_PROMPT_CATEGORIES[category];
  return categoryData.prompts.map((key) => GEOLOGY_PROMPTS[key as keyof typeof GEOLOGY_PROMPTS]);
}

const geologyPrompts = {
  GEOLOGY_DOMAIN_PROMPT,
  GEOLOGY_PROMPTS,
  GEOLOGY_FEW_SHOT_EXAMPLES,
  GEOLOGY_PROMPT_CATEGORIES,
  getGeologyPrompt,
  getAllGeologyPrompts,
  getGeologyPromptsByCategory,
};

export default geologyPrompts;
