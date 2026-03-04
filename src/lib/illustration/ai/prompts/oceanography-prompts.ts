/**
 * oceanography-prompts.ts
 * Oceanography-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for oceanography topics including:
 * - Ocean structure and zones
 * - Ocean circulation and currents
 * - Waves and tides
 * - Marine ecosystems and food webs
 * - Chemical oceanography
 * - Geological oceanography
 * - Coastal processes
 * - Climate and ocean interactions
 * - Deep sea environments
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// OCEANOGRAPHY DOMAIN PROMPT
// =============================================================================

/**
 * Base oceanography domain prompt for marine science diagrams
 */
export const OCEANOGRAPHY_DOMAIN_PROMPT = `
Oceanography diagram requirements:
- Use standard oceanographic terminology and notation
- Follow established conventions for ocean diagrams and profiles
- Include appropriate depth scales (meters) and geographic references
- Use consistent color coding for temperature, salinity, and depth zones
- Show directional arrows for currents, water mass movement, and circulation
- Reference standard oceanographic measurements (psu, degrees C, m/s)
- Include legend/key for complex diagrams
- Color coding: Warm water (red/orange), Cold water (blue), Surface (light blue), Deep (dark blue)
- Zones: Epipelagic (light), Mesopelagic (medium), Bathypelagic (dark), Abyssopelagic (darkest)`;

// =============================================================================
// OCEANOGRAPHY-SPECIFIC PROMPTS
// =============================================================================

export const OCEANOGRAPHY_PROMPTS = {
  // Ocean Structure
  oceanZones: `
Ocean Zones Diagram requirements:
- Show vertical zonation (epipelagic to hadopelagic)
- Include depth ranges for each zone
- Show light penetration (photic vs aphotic)
- Indicate temperature changes with depth
- Include pressure increases
- Show benthic vs pelagic zones
- Reference characteristic organisms
- Include thermocline and pycnocline`,

  waterColumnStructure: `
Water Column Structure requirements:
- Show surface mixed layer
- Include seasonal thermocline
- Show permanent thermocline
- Indicate halocline and pycnocline
- Include deep water characteristics
- Show oxygen minimum zone
- Reference T-S diagrams
- Include water mass identification`,

  oceanFloorTopography: `
Ocean Floor Topography requirements:
- Show continental shelf, slope, rise
- Include abyssal plains
- Show mid-ocean ridges
- Indicate trenches and subduction zones
- Include seamounts and guyots
- Show submarine canyons
- Reference plate tectonics
- Include depth profiles`,

  // Ocean Circulation
  surfaceCurrents: `
Surface Ocean Currents requirements:
- Show major ocean gyres
- Include western boundary currents
- Show eastern boundary currents
- Indicate equatorial currents
- Include wind-driven circulation
- Show Ekman transport
- Reference Coriolis effect
- Include upwelling/downwelling zones`,

  thermohalineCCirculation: `
Thermohaline Circulation requirements:
- Show global conveyor belt pattern
- Include deep water formation areas
- Show NADW and AABW pathways
- Indicate upwelling regions
- Include surface return flow
- Show mixing zones
- Reference water mass properties
- Include circulation timescales (~1000 years)`,

  upwellingDownwelling: `
Upwelling and Downwelling requirements:
- Show coastal upwelling mechanism
- Include Ekman transport direction
- Show equatorial upwelling
- Indicate downwelling zones
- Include nutrient distribution
- Show productivity effects
- Reference wind-driven processes
- Include temperature anomalies`,

  // Waves and Tides
  waveFormation: `
Ocean Wave Diagram requirements:
- Show wave anatomy (crest, trough, wavelength)
- Include wave height and period
- Show deep water vs shallow water waves
- Indicate wave breaking types
- Include fetch and wind effects
- Show wave energy propagation
- Reference wave equations
- Include tsunami characteristics`,

  tidalPatterns: `
Tidal Patterns requirements:
- Show diurnal, semidiurnal, mixed tides
- Include spring and neap tides
- Show lunar and solar influences
- Indicate tidal range variations
- Include tidal bulge mechanism
- Show amphidromic points
- Reference tidal constituents
- Include tidal current patterns`,

  coastalProcesses: `
Coastal Processes Diagram requirements:
- Show longshore drift
- Include wave refraction and diffraction
- Show erosion and deposition patterns
- Indicate beach profile changes
- Include barrier island formation
- Show estuary dynamics
- Reference sediment transport
- Include sea level change effects`,

  // Marine Ecosystems
  marineFoodWeb: `
Marine Food Web requirements:
- Show phytoplankton (primary producers)
- Include zooplankton (primary consumers)
- Show fish at multiple trophic levels
- Indicate marine mammals and seabirds
- Include microbial loop
- Show detritus pathway
- Reference biological pump
- Include benthic-pelagic coupling`,

  coralReefEcosystem: `
Coral Reef Ecosystem requirements:
- Show reef zonation (fore reef, reef crest, back reef)
- Include coral-algae symbiosis
- Show trophic structure
- Indicate biodiversity hotspot
- Include calcium carbonate production
- Show reef threats (bleaching, acidification)
- Reference reef types (fringing, barrier, atoll)
- Include associated habitats`,

  deepSeaEcosystems: `
Deep Sea Ecosystem requirements:
- Show hydrothermal vent communities
- Include cold seep ecosystems
- Show chemosynthesis process
- Indicate unique adaptations
- Include bioluminescence
- Show food fall communities
- Reference pressure and temperature extremes
- Include deep sea biodiversity`,

  // Chemical Oceanography
  carboncycle: `
Ocean Carbon Cycle requirements:
- Show air-sea CO2 exchange
- Include biological pump
- Show solubility pump
- Indicate organic carbon export
- Include carbonate chemistry
- Show deep ocean carbon storage
- Reference anthropogenic CO2 uptake
- Include acidification effects`,

  nutrientCycles: `
Marine Nutrient Cycles requirements:
- Show nitrogen cycle in ocean
- Include phosphorus cycling
- Show silica cycle (diatoms)
- Indicate limiting nutrients
- Include Redfield ratio
- Show nutrient regeneration
- Reference oligotrophic vs eutrophic
- Include iron limitation`,

  oceanAcidification: `
Ocean Acidification Diagram requirements:
- Show CO2 dissolution process
- Include carbonate chemistry equations
- Show pH decrease trends
- Indicate effects on calcifying organisms
- Include aragonite saturation state
- Show geographic vulnerability
- Reference historical vs future projections
- Include biological impacts`,

  // Ocean-Climate Interactions
  oceanHeatContent: `
Ocean Heat Content requirements:
- Show heat absorption by depth
- Include mixed layer warming
- Show deep ocean heat uptake
- Indicate geographic distribution
- Include historical trends
- Show ocean heat transport
- Reference climate implications
- Include measurement methods (Argo)`,

  seaIceDynamics: `
Sea Ice Dynamics requirements:
- Show ice formation process
- Include ice types (first-year, multi-year)
- Show ice extent trends
- Indicate albedo feedback
- Include brine rejection
- Show ice-ocean interactions
- Reference Arctic vs Antarctic
- Include ecosystem implications`,

  sealevelChange: `
Sea Level Change Diagram requirements:
- Show thermal expansion component
- Include glacier and ice sheet melt
- Show regional sea level variations
- Indicate isostatic adjustments
- Include historical records
- Show future projections
- Reference IPCC scenarios
- Include coastal impacts`,

  // Geological Oceanography
  plateTectonicsOcean: `
Plate Tectonics and Oceans requirements:
- Show mid-ocean ridge spreading
- Include subduction zones
- Show transform faults
- Indicate ocean basin formation
- Include magnetic striping
- Show hydrothermal activity
- Reference Wilson cycle
- Include hotspot volcanism`,

  marinesediments: `
Marine Sediments requirements:
- Show sediment types (terrigenous, biogenic, authigenic)
- Include distribution patterns
- Show CCD (carbonate compensation depth)
- Indicate siliceous vs calcareous ooze
- Include sedimentation rates
- Show sediment cores
- Reference paleoceanography
- Include continental margin deposits`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Oceanography-specific few-shot examples
 */
export const OCEANOGRAPHY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a diagram showing ocean depth zones',
    output: `flowchart TB
    subgraph zones["Ocean Depth Zones"]
        subgraph epipelagic["Epipelagic Zone<br/>(Sunlight Zone)"]
            ep["0-200m<br/>Photosynthesis occurs<br/>Most marine life<br/>Warm, well-lit"]
        end

        subgraph mesopelagic["Mesopelagic Zone<br/>(Twilight Zone)"]
            mp["200-1000m<br/>Dim light<br/>Vertical migrators<br/>Bioluminescence common"]
        end

        subgraph bathypelagic["Bathypelagic Zone<br/>(Midnight Zone)"]
            bp["1000-4000m<br/>No sunlight<br/>Cold (~4C)<br/>High pressure"]
        end

        subgraph abyssopelagic["Abyssopelagic Zone<br/>(Abyssal Zone)"]
            ap["4000-6000m<br/>Near freezing<br/>Sparse life<br/>Abyssal plains"]
        end

        subgraph hadopelagic["Hadopelagic Zone<br/>(Hadal Zone)"]
            hp["6000-11000m<br/>Ocean trenches<br/>Extreme pressure<br/>Unique organisms"]
        end
    end

    subgraph features["Key Features"]
        photic["Photic Zone<br/>(0-200m)<br/>Light penetrates"]
        aphotic["Aphotic Zone<br/>(200m+)<br/>No light"]
        thermocline["Thermocline<br/>(200-1000m)<br/>Rapid temp change"]
    end

    subgraph benthic["Benthic Zones"]
        continental["Continental shelf<br/>(0-200m)"]
        slope["Continental slope<br/>(200-4000m)"]
        abyssal["Abyssal plain<br/>(4000-6000m)"]
        trench["Hadal trench<br/>(6000m+)"]
    end

    ep --> mp
    mp --> bp
    bp --> ap
    ap --> hp

    ep --- photic
    mp --- thermocline
    bp --- aphotic

    classDef sunlight fill:#87CEEB,stroke:#4682B4
    classDef twilight fill:#4169E1,stroke:#000080,color:#fff
    classDef midnight fill:#191970,stroke:#000,color:#fff
    classDef abyss fill:#0a0a23,stroke:#000,color:#fff
    classDef hadal fill:#000,stroke:#333,color:#fff
    classDef feature fill:#fef3c7,stroke:#d97706

    class ep sunlight
    class mp twilight
    class bp midnight
    class ap abyss
    class hp hadal
    class photic,aphotic,thermocline feature`,
  },
  {
    prompt: 'Create a diagram showing the thermohaline circulation',
    output: `flowchart TB
    subgraph atlantic["Atlantic Ocean"]
        subgraph north_atl["North Atlantic"]
            nadw_form["NADW Formation<br/>(Nordic Seas)<br/>Cold, salty water sinks"]
            gulf["Gulf Stream<br/>(Warm surface current)"]
        end

        subgraph south_atl["South Atlantic"]
            nadw_flow["NADW flows south<br/>(Deep water)"]
        end
    end

    subgraph southern["Southern Ocean"]
        aabw_form["AABW Formation<br/>(Antarctic shelf)<br/>Coldest, densest water"]
        acc["Antarctic Circumpolar<br/>Current"]
        upwell_s["Upwelling zone"]
    end

    subgraph pacific["Pacific & Indian Oceans"]
        deep_pacific["Deep water<br/>flows north"]
        upwell_p["Gradual upwelling<br/>(diffuse)"]
        surface_return["Warm surface<br/>return flow"]
    end

    subgraph properties["Water Mass Properties"]
        nadw_prop["NADW: 2-4C, 34.9 psu"]
        aabw_prop["AABW: -0.4C, 34.7 psu"]
    end

    subgraph timescale["Circulation Time"]
        time["Complete circuit:<br/>~1000 years"]
    end

    nadw_form -->|"Sinks to<br/>2000-4000m"| nadw_flow
    gulf -->|"Heat transport<br/>northward"| nadw_form
    nadw_flow --> southern
    aabw_form -->|"Sinks to<br/>bottom"| acc
    acc --> deep_pacific
    deep_pacific --> upwell_p
    upwell_p --> surface_return
    surface_return --> gulf
    upwell_s --> surface_return

    classDef warm fill:#ef4444,stroke:#dc2626,color:#fff
    classDef cold fill:#3b82f6,stroke:#1d4ed8,color:#fff
    classDef deep fill:#1e3a5f,stroke:#0f172a,color:#fff
    classDef upwell fill:#22c55e,stroke:#16a34a
    classDef info fill:#f3f4f6,stroke:#6b7280

    class gulf,surface_return warm
    class nadw_form,aabw_form cold
    class nadw_flow,deep_pacific,acc deep
    class upwell_s,upwell_p upwell
    class nadw_prop,aabw_prop,time info`,
  },
  {
    prompt: 'Create a diagram showing a marine food web',
    output: `flowchart TB
    subgraph producers["Primary Producers"]
        phyto["Phytoplankton<br/>(Diatoms, dinoflagellates)"]
        macro["Macroalgae<br/>(Kelp, seaweed)"]
        seagrass["Seagrass"]
    end

    subgraph primary["Primary Consumers"]
        zoop["Zooplankton<br/>(Copepods, krill)"]
        herb_fish["Herbivorous fish<br/>(Anchovies, sardines)"]
        filter["Filter feeders<br/>(Mussels, oysters)"]
        urchin["Sea urchins"]
    end

    subgraph secondary["Secondary Consumers"]
        small_pred["Small predators<br/>(Squid, mackerel)"]
        crab["Crabs"]
        starfish["Sea stars"]
    end

    subgraph tertiary["Tertiary Consumers"]
        large_fish["Large fish<br/>(Tuna, salmon)"]
        seal["Seals"]
        seabird["Seabirds"]
    end

    subgraph apex["Apex Predators"]
        shark["Sharks"]
        orca["Orcas"]
    end

    subgraph microbial["Microbial Loop"]
        bacteria["Bacteria"]
        virus["Viruses"]
        dom["Dissolved organic<br/>matter (DOM)"]
    end

    subgraph detrital["Detrital Pathway"]
        detritus["Marine snow<br/>(Detritus)"]
        decomp["Decomposers"]
        benthos["Benthic organisms"]
    end

    phyto --> zoop
    phyto --> herb_fish
    macro --> urchin
    macro --> herb_fish
    seagrass --> urchin

    zoop --> small_pred
    zoop --> filter
    herb_fish --> large_fish
    herb_fish --> seabird
    filter --> starfish
    urchin --> crab

    small_pred --> large_fish
    small_pred --> seal
    crab --> seabird

    large_fish --> shark
    seal --> orca
    seal --> shark
    seabird --> shark

    phyto -.-> dom
    dom --> bacteria
    bacteria --> zoop
    virus -.-> bacteria

    producers -.-> detritus
    primary -.-> detritus
    detritus --> decomp
    decomp --> benthos
    benthos --> crab

    classDef producer fill:#22c55e,stroke:#16a34a
    classDef primary fill:#84cc16,stroke:#65a30d
    classDef secondary fill:#f97316,stroke:#ea580c
    classDef tertiary fill:#ef4444,stroke:#dc2626
    classDef apex fill:#7c2d12,stroke:#451a03,color:#fff
    classDef microbial fill:#8b5cf6,stroke:#7c3aed,color:#fff
    classDef detrital fill:#78716c,stroke:#57534e

    class phyto,macro,seagrass producer
    class zoop,herb_fish,filter,urchin primary
    class small_pred,crab,starfish secondary
    class large_fish,seal,seabird tertiary
    class shark,orca apex
    class bacteria,virus,dom microbial
    class detritus,decomp,benthos detrital`,
  },
  {
    prompt: 'Create a diagram showing ocean acidification process',
    output: `flowchart TB
    subgraph atmosphere["Atmosphere"]
        co2_atm["Atmospheric CO2<br/>~420 ppm<br/>(increasing ~2 ppm/yr)"]
    end

    subgraph ocean_surface["Ocean Surface"]
        co2_aq["Dissolved CO2<br/>(CO2(aq))"]
        h2co3["Carbonic Acid<br/>(H2CO3)"]
        hco3["Bicarbonate<br/>(HCO3-)"]
        co3["Carbonate<br/>(CO3 2-)"]
        h_ion["Hydrogen ions<br/>(H+)"]
    end

    subgraph chemistry["Chemical Equations"]
        eq1["CO2 + H2O ↔ H2CO3"]
        eq2["H2CO3 ↔ H+ + HCO3-"]
        eq3["HCO3- ↔ H+ + CO3 2-"]
    end

    subgraph impacts["pH Changes"]
        ph_historic["Pre-industrial pH: 8.2"]
        ph_current["Current pH: 8.1"]
        ph_future["Projected 2100: 7.8"]
        change["30% more acidic<br/>since 1800s"]
    end

    subgraph biological["Biological Impacts"]
        subgraph calcifiers["Calcifying Organisms"]
            coral["Corals<br/>(Reef building)"]
            shell["Shellfish<br/>(Oysters, mussels)"]
            plankton["Pteropods &<br/>Foraminifera"]
            urchin["Sea urchins"]
        end

        subgraph effects["Effects"]
            dissolve["Shell dissolution"]
            growth["Reduced calcification"]
            behavior["Altered behavior"]
            death["Population decline"]
        end
    end

    subgraph saturation["Aragonite Saturation"]
        sat_high["Ω > 3: Favorable"]
        sat_low["Ω < 1: Dissolution"]
        polar["Polar regions<br/>most vulnerable"]
    end

    co2_atm -->|"Gas exchange"| co2_aq
    co2_aq --> h2co3
    h2co3 --> hco3
    h2co3 --> h_ion
    hco3 --> co3
    hco3 --> h_ion

    h_ion -->|"Decreases pH"| impacts
    h_ion -->|"Consumes"| co3
    co3 -->|"Less available"| calcifiers
    calcifiers --> effects

    classDef atm fill:#94a3b8,stroke:#64748b
    classDef chem fill:#dbeafe,stroke:#3b82f6
    classDef acid fill:#fecaca,stroke:#ef4444
    classDef impact fill:#fee2e2,stroke:#dc2626
    classDef org fill:#dcfce7,stroke:#22c55e
    classDef bad fill:#7f1d1d,stroke:#450a0a,color:#fff

    class co2_atm atm
    class co2_aq,h2co3,hco3,co3 chem
    class h_ion,change acid
    class ph_historic,ph_current,ph_future impact
    class coral,shell,plankton,urchin org
    class dissolve,growth,behavior,death bad`,
  },
  {
    prompt: 'Create a diagram showing coastal upwelling',
    output: `flowchart TB
    subgraph coastal["Coastal Upwelling System"]
        subgraph atmosphere_layer["Atmosphere"]
            wind["Alongshore Wind<br/>(Equatorward)"]
        end

        subgraph surface_layer["Surface Layer (0-50m)"]
            surface_water["Surface water<br/>(Warm, nutrient-poor)"]
            ekman["Ekman Transport<br/>(90 to right of wind<br/>in Northern Hemisphere)"]
        end

        subgraph deep_layer["Deep Layer (50-200m)"]
            deep_water["Deep water<br/>(Cold, nutrient-rich)"]
            upwell["Upwelling<br/>Replaces surface water"]
        end

        subgraph coast["Coastline"]
            shore["Coast"]
        end
    end

    subgraph productivity["Biological Response"]
        nutrients["Nutrients brought<br/>to surface<br/>(N, P, Si, Fe)"]
        phyto["Phytoplankton<br/>bloom"]
        zoo["Zooplankton<br/>increase"]
        fish["Fish populations<br/>(Anchovies, sardines)"]
        birds["Seabirds &<br/>marine mammals"]
    end

    subgraph regions["Major Upwelling Regions"]
        california["California Current"]
        peru["Peru/Humboldt Current"]
        benguela["Benguela Current"]
        canary["Canary Current"]
    end

    subgraph climate["Climate Effects"]
        cool["Cooler coastal<br/>temperatures"]
        fog["Coastal fog<br/>formation"]
        low_rain["Reduced rainfall<br/>(cold water)"]
    end

    wind -->|"Causes"| ekman
    ekman -->|"Moves water<br/>offshore"| surface_water
    surface_water -->|"Replaced by"| upwell
    deep_water --> upwell
    upwell --> nutrients
    nutrients --> phyto
    phyto --> zoo
    zoo --> fish
    fish --> birds

    upwell --> cool
    cool --> fog

    classDef wind fill:#e0f2fe,stroke:#0284c7
    classDef warm fill:#fecaca,stroke:#ef4444
    classDef cold fill:#bfdbfe,stroke:#3b82f6
    classDef coast fill:#d4d4d4,stroke:#737373
    classDef bio fill:#dcfce7,stroke:#22c55e
    classDef region fill:#fef3c7,stroke:#d97706
    classDef climate fill:#f3e8ff,stroke:#9333ea

    class wind,ekman wind
    class surface_water warm
    class deep_water,upwell cold
    class shore coast
    class nutrients,phyto,zoo,fish,birds bio
    class california,peru,benguela,canary region
    class cool,fog,low_rain climate`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

export default {
  OCEANOGRAPHY_DOMAIN_PROMPT,
  OCEANOGRAPHY_PROMPTS,
  OCEANOGRAPHY_FEW_SHOT_EXAMPLES,
};
