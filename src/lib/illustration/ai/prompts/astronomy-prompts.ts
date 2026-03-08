/**
 * astronomy-prompts.ts
 * Astronomy-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for astronomical science including:
 * - Stellar evolution (main sequence, giants, supernovae)
 * - Planetary science (formation, atmospheres, orbits)
 * - Cosmology (Big Bang, expansion, dark matter)
 * - Galaxies (morphology, structure, interactions)
 * - Observational astronomy (telescopes, spectra, surveys)
 * - Solar system (Sun, planets, small bodies)
 *
 * Total: 18 specialized prompts
 *
 * Ralph Loop - COMPLETE checkpoint
 */

import type { FewShotExample } from './index';

// =============================================================================
// ASTRONOMY DOMAIN PROMPT
// =============================================================================

/**
 * Base astronomy domain prompt for astronomical diagrams
 */
export const ASTRONOMY_DOMAIN_PROMPT = `
Astronomy diagram requirements:
- Use standard astronomical units (AU, parsec, light-year, solar masses)
- Include scale indicators for vastly different size scales
- Follow IAU naming conventions for celestial objects
- Show coordinate systems where relevant (equatorial, galactic, ecliptic)
- Use color coding based on temperature: Blue (hot) > White > Yellow > Orange > Red (cool)
- Include magnitude scales (apparent and absolute) where applicable
- Mark distances with appropriate uncertainty
- Show proper motion and radial velocity vectors
- Include spectral classification (OBAFGKM) for stars
- Mark time scales (seconds to billions of years) appropriately`;

// =============================================================================
// ASTRONOMY-SPECIFIC PROMPTS
// =============================================================================

export const ASTRONOMY_PROMPTS = {
  // Stellar Evolution
  hrDiagram: `
Hertzsprung-Russell Diagram requirements:
- Show temperature/spectral class on x-axis (hot to cool, left to right)
- Include luminosity/absolute magnitude on y-axis
- Mark main sequence diagonal band
- Show giant and supergiant branches
- Include white dwarf region (lower left)
- Mark stellar mass along main sequence
- Show evolutionary tracks for different masses
- Include instability strip (Cepheids, RR Lyrae)`,

  stellarLifeCycle: `
Stellar Life Cycle requirements:
- Show molecular cloud and star formation
- Include protostar and T Tauri phase
- Mark main sequence lifetime vs mass
- Show red giant branch evolution
- Include planetary nebula (low mass) or supernova (high mass)
- Mark white dwarf, neutron star, or black hole endpoints
- Show mass loss processes
- Include timescales for each phase`,

  supernovaTypes: `
Supernova Classification requirements:
- Show Type Ia (white dwarf thermonuclear)
- Include Type II (core collapse, hydrogen lines)
- Mark Type Ib/Ic (core collapse, stripped envelope)
- Show light curve differences
- Include peak luminosity comparisons
- Mark progenitor systems for each type
- Show nucleosynthesis products
- Include remnant types (neutron star vs black hole)`,

  stellarNucleosynthesis: `
Stellar Nucleosynthesis requirements:
- Show hydrogen burning (pp chain, CNO cycle)
- Include helium burning (triple-alpha)
- Mark advanced burning stages (C, Ne, O, Si)
- Show s-process nucleosynthesis in AGB stars
- Include r-process in supernovae/mergers
- Mark iron peak and binding energy curve
- Show element production by stellar mass
- Include cosmic abundance patterns`,

  // Planetary Science
  planetaryFormation: `
Planetary Formation requirements:
- Show protoplanetary disk structure
- Include dust settling and grain growth
- Mark planetesimal formation (streaming instability)
- Show oligarchic growth to protoplanets
- Include giant planet core accretion
- Mark gas disk dispersal timescale
- Show migration and orbital evolution
- Include Nice model dynamics`,

  exoplanetDetection: `
Exoplanet Detection Methods requirements:
- Show radial velocity (Doppler) method
- Include transit photometry and light curves
- Mark direct imaging challenges and solutions
- Show gravitational microlensing geometry
- Include astrometric detection
- Mark detection bias for each method (mass, period)
- Show habitable zone definition
- Include atmospheric characterization techniques`,

  planetaryAtmospheres: `
Planetary Atmosphere requirements:
- Show atmospheric layers (troposphere, stratosphere, etc.)
- Include temperature-pressure profiles
- Mark composition differences (rocky vs gas giant)
- Show atmospheric escape mechanisms
- Include greenhouse effect calculations
- Mark cloud and haze layers
- Show circulation patterns (Hadley cells, jets)
- Include atmospheric spectra features`,

  // Cosmology
  bigBangTimeline: `
Big Bang Timeline requirements:
- Show Planck epoch and quantum gravity era
- Include grand unification and electroweak epochs
- Mark quark-hadron transition
- Show nucleosynthesis era (first 3 minutes)
- Include recombination and CMB formation (380,000 years)
- Mark dark ages and first stars
- Show reionization epoch
- Include galaxy formation and cosmic web`,

  cosmicExpansion: `
Cosmic Expansion requirements:
- Show Hubble law and redshift-distance relation
- Include expansion history (deceleration then acceleration)
- Mark dark energy equation of state
- Show scale factor evolution
- Include critical density and Omega parameters
- Mark cosmic microwave background anisotropies
- Show observable universe size
- Include horizon problem and inflation solution`,

  darkMatterEvidence: `
Dark Matter Evidence requirements:
- Show galaxy rotation curves (flat vs Keplerian)
- Include gravitational lensing (strong and weak)
- Mark galaxy cluster dynamics (virial theorem)
- Show CMB power spectrum constraints
- Include large-scale structure formation
- Mark bullet cluster separation of mass and gas
- Show WIMP and axion detection experiments
- Include modified gravity alternatives`,

  // Galaxies
  galaxyMorphology: `
Galaxy Classification requirements:
- Show Hubble tuning fork diagram
- Include elliptical sequence (E0-E7)
- Mark spiral types (Sa-Sd, barred SBa-SBd)
- Show lenticular (S0) transition class
- Include irregular galaxy types
- Mark bulge-to-disk ratios
- Show color-magnitude relation
- Include morphology-density relation`,

  galaxyStructure: `
Galaxy Structure (Milky Way) requirements:
- Show disk, bulge, and halo components
- Include spiral arm structure and pattern speed
- Mark central supermassive black hole
- Show stellar populations (thin disk, thick disk, halo)
- Include dark matter halo extent
- Mark Sun's position and orbit
- Show globular cluster distribution
- Include satellite galaxy positions`,

  galaxyInteractions: `
Galaxy Interactions requirements:
- Show tidal tail formation
- Include merger sequence (approach, first pass, merger)
- Mark starburst triggering
- Show AGN activation during mergers
- Include dynamical friction timescales
- Mark stellar stream formation
- Show morphological transformation
- Include hierarchical assembly history`,

  // Observational Astronomy
  telescopeTypes: `
Telescope Types requirements:
- Show refracting vs reflecting designs
- Include optical configurations (Newtonian, Cassegrain, etc.)
- Mark radio telescope (dish, interferometer)
- Show space-based advantages
- Include adaptive optics systems
- Mark collecting area and resolution relationship
- Show multi-wavelength coverage
- Include next-generation facilities`,

  spectralAnalysis: `
Spectral Analysis requirements:
- Show continuous, emission, and absorption spectra
- Include Kirchhoff's laws application
- Mark spectral line identification
- Show Doppler shift measurement
- Include line broadening mechanisms
- Mark equivalent width and curve of growth
- Show chemical abundance determination
- Include spectral classification scheme`,

  // Solar System
  solarStructure: `
Solar Structure requirements:
- Show core (nuclear fusion zone)
- Include radiative zone (photon diffusion)
- Mark convective zone (granulation)
- Show photosphere (visible surface)
- Include chromosphere and corona
- Mark sunspot structure (umbra, penumbra)
- Show solar wind and heliosphere
- Include solar cycle (11 year) and Maunder minimum`,

  solarSystemFormation: `
Solar System Formation requirements:
- Show solar nebula collapse and angular momentum
- Include T Tauri phase and disk structure
- Mark snow line position and composition change
- Show giant planet migration scenarios
- Include Late Heavy Bombardment
- Mark asteroid belt sculpting by Jupiter
- Show Kuiper Belt and Oort Cloud formation
- Include Nice model orbital rearrangement`,

  smallBodies: `
Small Solar System Bodies requirements:
- Show asteroid classification (C, S, M types)
- Include comet structure (nucleus, coma, tails)
- Mark Kuiper Belt and scattered disk objects
- Show meteor shower radiant geometry
- Include impact crater formation
- Mark orbital resonances with planets
- Show Trojan asteroid positions
- Include potentially hazardous asteroids`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

export const ASTRONOMY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a Hertzsprung-Russell diagram showing stellar populations',
    output: `flowchart TB
    subgraph hr["Hertzsprung-Russell Diagram"]
        subgraph luminosity["Luminosity (L_sun)"]
            high["10^6"]
            med["1"]
            low["10^-4"]
        end

        subgraph regions["Stellar Regions"]
            supergiants["Supergiants<br/>Betelgeuse, Rigel<br/>M > 10 M_sun"]
            giants["Giants<br/>Aldebaran, Arcturus<br/>Evolved stars"]
            mainseq["Main Sequence<br/>Sun, Sirius, Proxima<br/>Core H burning"]
            whitedwarf["White Dwarfs<br/>Sirius B<br/>Stellar remnants"]
        end

        subgraph temp["Temperature (K)"]
            hot["30,000 (O,B)"]
            medium["6,000 (G)"]
            cool["3,000 (M)"]
        end
    end

    subgraph spectral["Spectral Classes"]
        classes["O - B - A - F - G - K - M<br/>Hot ← → Cool<br/>Blue ← → Red"]
    end

    note["Main sequence: L ~ M^3.5<br/>Lifetime ~ M^-2.5<br/>Sun: 10 billion years"]

    classDef hot fill:#dbeafe,stroke:#2563eb
    classDef medium fill:#fef3c7,stroke:#d97706
    classDef cool fill:#fecaca,stroke:#dc2626
    classDef dwarf fill:#e5e7eb,stroke:#6b7280

    class supergiants,hot hot
    class giants medium
    class mainseq medium
    class whitedwarf dwarf`,
    reasoning: 'Shows the H-R diagram with major stellar populations and their characteristics',
  },
  {
    prompt: 'Create a Big Bang timeline diagram',
    output: `flowchart LR
    subgraph early["Early Universe"]
        planck["Planck Epoch<br/>t < 10^-43 s<br/>Quantum gravity"]
        inflation["Inflation<br/>10^-36 s<br/>Exponential expansion"]
        quarks["Quark Epoch<br/>10^-12 s<br/>Quark-gluon plasma"]
        hadrons["Hadron Epoch<br/>10^-6 s<br/>Protons, neutrons form"]
    end

    subgraph nucleosynthesis["Nucleosynthesis"]
        bbn["Big Bang Nucleosynthesis<br/>3 minutes<br/>H, He, Li formed"]
    end

    subgraph matter["Matter Era"]
        recomb["Recombination<br/>380,000 years<br/>CMB released"]
        dark["Dark Ages<br/>No stars yet"]
        first["First Stars<br/>200 million years<br/>Population III"]
    end

    subgraph structure["Structure Formation"]
        reion["Reionization<br/>500 Myr - 1 Gyr"]
        galaxies["Galaxy Formation<br/>1-3 billion years"]
        today["Today<br/>13.8 billion years"]
    end

    planck --> inflation
    inflation --> quarks
    quarks --> hadrons
    hadrons --> bbn
    bbn --> recomb
    recomb --> dark
    dark --> first
    first --> reion
    reion --> galaxies
    galaxies --> today

    classDef quantum fill:#ddd6fe,stroke:#7c3aed
    classDef hot fill:#fecaca,stroke:#dc2626
    classDef cold fill:#dbeafe,stroke:#2563eb
    classDef structure fill:#dcfce7,stroke:#16a34a

    class planck,inflation quantum
    class quarks,hadrons,bbn hot
    class recomb,dark cold
    class first,reion,galaxies,today structure`,
    reasoning: 'Shows the timeline of the universe from the Big Bang to present day',
  },
  {
    prompt: 'Create a stellar life cycle diagram for different mass stars',
    output: `flowchart TB
    subgraph formation["Star Formation"]
        cloud["Molecular Cloud<br/>Collapse"]
        protostar["Protostar<br/>T Tauri phase"]
    end

    subgraph lowmass["Low Mass (< 8 M_sun)"]
        ms_low["Main Sequence<br/>H burning"]
        rgb["Red Giant<br/>He flash"]
        agb["AGB Star<br/>Thermal pulses"]
        pn["Planetary Nebula"]
        wd["White Dwarf<br/>C/O core"]
    end

    subgraph highmass["High Mass (> 8 M_sun)"]
        ms_high["Main Sequence<br/>Short lifetime"]
        supergiant["Supergiant<br/>Advanced burning"]
        sn["Supernova<br/>Type II"]
        ns["Neutron Star<br/>or Black Hole"]
    end

    cloud --> protostar
    protostar -->|"< 8 M_sun"| ms_low
    protostar -->|"> 8 M_sun"| ms_high

    ms_low --> rgb
    rgb --> agb
    agb --> pn
    pn --> wd

    ms_high --> supergiant
    supergiant --> sn
    sn --> ns

    note["Main sequence lifetime:<br/>Sun (1 M_sun): 10 Gyr<br/>O star (30 M_sun): 6 Myr"]

    classDef formation fill:#fef3c7,stroke:#d97706
    classDef main fill:#dbeafe,stroke:#2563eb
    classDef evolved fill:#fecaca,stroke:#dc2626
    classDef remnant fill:#e5e7eb,stroke:#6b7280

    class cloud,protostar formation
    class ms_low,ms_high main
    class rgb,agb,supergiant,sn evolved
    class pn,wd,ns remnant`,
    reasoning: 'Shows the different evolutionary paths for low and high mass stars',
  },
];

// =============================================================================
// PROMPT CATEGORIES
// =============================================================================

/**
 * Organized astronomy prompt categories for UI grouping
 */
export const ASTRONOMY_PROMPT_CATEGORIES = {
  stellarEvolution: {
    name: 'Stellar Evolution',
    prompts: ['hrDiagram', 'stellarLifeCycle', 'supernovaTypes', 'stellarNucleosynthesis'],
  },
  planetaryScience: {
    name: 'Planetary Science',
    prompts: ['planetaryFormation', 'exoplanetDetection', 'planetaryAtmospheres'],
  },
  cosmology: {
    name: 'Cosmology',
    prompts: ['bigBangTimeline', 'cosmicExpansion', 'darkMatterEvidence'],
  },
  galaxies: {
    name: 'Galaxies',
    prompts: ['galaxyMorphology', 'galaxyStructure', 'galaxyInteractions'],
  },
  observational: {
    name: 'Observational Astronomy',
    prompts: ['telescopeTypes', 'spectralAnalysis'],
  },
  solarSystem: {
    name: 'Solar System',
    prompts: ['solarStructure', 'solarSystemFormation', 'smallBodies'],
  },
};

/**
 * Get a specific astronomy prompt by key
 */
export function getAstronomyPrompt(key: keyof typeof ASTRONOMY_PROMPTS): string {
  return ASTRONOMY_PROMPTS[key];
}

/**
 * Get all astronomy prompts as an array
 */
export function getAllAstronomyPrompts(): { key: string; prompt: string }[] {
  return Object.entries(ASTRONOMY_PROMPTS).map(([key, prompt]) => ({
    key,
    prompt,
  }));
}

/**
 * Get prompts by category
 */
export function getAstronomyPromptsByCategory(category: keyof typeof ASTRONOMY_PROMPT_CATEGORIES): string[] {
  const categoryData = ASTRONOMY_PROMPT_CATEGORIES[category];
  return categoryData.prompts.map((key) => ASTRONOMY_PROMPTS[key as keyof typeof ASTRONOMY_PROMPTS]);
}

const astronomyPrompts = {
  ASTRONOMY_DOMAIN_PROMPT,
  ASTRONOMY_PROMPTS,
  ASTRONOMY_FEW_SHOT_EXAMPLES,
  ASTRONOMY_PROMPT_CATEGORIES,
  getAstronomyPrompt,
  getAllAstronomyPrompts,
  getAstronomyPromptsByCategory,
};
export default astronomyPrompts;
