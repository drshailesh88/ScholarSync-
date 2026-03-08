/**
 * ecology-prompts.ts
 * Ecology-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for ecology topics including:
 * - Ecosystem structure and function
 * - Community ecology and interactions
 * - Population dynamics and modeling
 * - Biogeochemical cycles
 * - Biomes and habitat ecology
 * - Conservation biology
 * - Landscape ecology
 * - Succession and disturbance
 * - Climate and environmental change
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// ECOLOGY DOMAIN PROMPT
// =============================================================================

/**
 * Base ecology domain prompt for ecological diagrams
 */
export const ECOLOGY_DOMAIN_PROMPT = `
Ecology diagram requirements:
- Use standard ecological terminology and nomenclature
- Follow established conventions for ecological diagrams and models
- Include spatial and temporal scales where appropriate
- Use consistent color coding for trophic levels and ecological roles
- Show directional arrows for energy flow, nutrient cycling, and interactions
- Reference established ecological frameworks (ecosystem ecology, landscape ecology)
- Include legend/key for complex diagrams
- Color coding: Producers (green), Primary consumers (light green/yellow), Secondary consumers (orange), Tertiary consumers (red), Decomposers (brown)
- Abiotic factors: Water (blue), Soil (brown), Light (yellow), Temperature (gradient)`;

// =============================================================================
// ECOLOGY-SPECIFIC PROMPTS
// =============================================================================

export const ECOLOGY_PROMPTS = {
  // Ecosystem Ecology
  ecosystemEnergyFlow: `
Ecosystem Energy Flow requirements:
- Show solar energy input (kcal/m2/year)
- Include gross and net primary productivity
- Show energy transfer between trophic levels (10% rule)
- Indicate respiration losses at each level
- Include detritus pathway
- Show export/import of energy
- Label all energy values quantitatively
- Reference Lindeman's efficiency concept`,

  nutrientCycling: `
Nutrient Cycling Diagram requirements:
- Show all major nutrient pools (living, dead, soil, atmospheric)
- Include mineralization and immobilization processes
- Show uptake by producers
- Include decomposition pathways
- Indicate leaching and erosion losses
- Show atmospheric inputs (deposition, fixation)
- Reference specific nutrient (N, P, C, S)
- Include residence times in each pool`,

  ecosystemServices: `
Ecosystem Services Diagram requirements:
- Categorize into provisioning, regulating, cultural, supporting
- Show specific examples for each category
- Include beneficiaries (human populations)
- Indicate economic values where possible
- Show interconnections between services
- Include ecosystem functions underlying services
- Reference MEA framework
- Show trade-offs between services`,

  detritusPathway: `
Detritus Food Web requirements:
- Show dead organic matter sources
- Include microbial decomposers (bacteria, fungi)
- Show detritivores and their roles
- Include soil food web structure
- Show nutrient release to soil
- Indicate decomposition rates
- Include environmental factors affecting decomposition
- Reference the brown food web concept`,

  // Community Ecology
  communityStructure: `
Community Structure Diagram requirements:
- Show species richness and diversity
- Include abundance distributions
- Show vertical and horizontal stratification
- Include guild structure
- Indicate dominant and rare species
- Show niche partitioning
- Reference diversity indices (Shannon, Simpson)
- Include evenness and dominance patterns`,

  speciesInteractions: `
Species Interactions Network requirements:
- Show all interaction types (+/0/- notation)
- Include mutualism, competition, predation, parasitism
- Show interaction strengths where known
- Indicate direct and indirect effects
- Include keystone interactions
- Show facilitation networks
- Reference interaction modification
- Include competitive exclusion examples`,

  ecologicalSuccession: `
Ecological Succession Diagram requirements:
- Show primary vs secondary succession stages
- Include pioneer species characteristics
- Show intermediate seral stages
- Indicate climax community features
- Include facilitation, inhibition, tolerance models
- Show changes in species composition over time
- Include disturbance regime effects
- Reference chronosequence approach`,

  nicheTheory: `
Ecological Niche Diagram requirements:
- Show fundamental vs realized niche
- Include niche dimensions (axes)
- Show competitive exclusion zones
- Indicate resource partitioning
- Include niche breadth and overlap
- Show environmental gradients
- Reference Hutchinson's n-dimensional hypervolume
- Include character displacement examples`,

  // Population Ecology
  metapopulationDynamics: `
Metapopulation Dynamics requirements:
- Show habitat patches and matrix
- Include colonization and extinction rates
- Show connectivity between patches
- Indicate source and sink populations
- Include patch quality variation
- Show rescue effect
- Reference Levins model
- Include spatially explicit structure`,

  lifeHistoryStrategies: `
Life History Strategies requirements:
- Compare r-selected vs K-selected traits
- Include age-specific survival and fecundity
- Show trade-off curves
- Indicate reproductive allocation
- Include iteroparity vs semelparity
- Show bet-hedging strategies
- Reference life tables and Leslie matrices
- Include survival curves (Type I, II, III)`,

  populationRegulation: `
Population Regulation Diagram requirements:
- Show density-dependent factors
- Include density-independent factors
- Indicate carrying capacity fluctuations
- Show feedback mechanisms
- Include time lag effects
- Show stable vs unstable equilibria
- Reference regulation vs limitation debate
- Include ceiling and floor models`,

  // Landscape Ecology
  landscapeStructure: `
Landscape Structure Diagram requirements:
- Show patches, corridors, and matrix
- Include patch size and shape metrics
- Show edge effects and core area
- Indicate connectivity measures
- Include fragmentation patterns
- Show landscape heterogeneity
- Reference FRAGSTATS metrics
- Include scale-dependent patterns`,

  habitatFragmentation: `
Habitat Fragmentation Diagram requirements:
- Show original vs fragmented habitat
- Include island biogeography effects
- Show edge-to-interior ratios
- Indicate extinction debt
- Include corridor connectivity
- Show genetic effects of isolation
- Reference SLOSS debate
- Include matrix permeability concept`,

  ecotones: `
Ecotone Diagram requirements:
- Show transition zones between ecosystems
- Include edge species vs interior species
- Show environmental gradients across ecotone
- Indicate ecotone width and sharpness
- Include boundary dynamics
- Show species turnover (beta diversity)
- Reference tension zone concept
- Include climate change effects on ecotones`,

  // Biogeochemical Cycles
  nitrogenCycle: `
Nitrogen Cycle Diagram requirements:
- Show atmospheric N2 reservoir
- Include nitrogen fixation (biological, industrial)
- Show nitrification (NH4+ to NO3-)
- Include denitrification pathway
- Show assimilation by organisms
- Indicate human impacts (fertilizers)
- Include anammox process
- Reference global N budget values`,

  phosphorusCycle: `
Phosphorus Cycle Diagram requirements:
- Show geological reservoirs (rock phosphate)
- Include weathering and erosion inputs
- Show biological uptake and cycling
- Indicate sedimentation and burial
- Include phosphorus limitation concept
- Show human impacts (mining, fertilizers)
- Reference Redfield ratio
- Include eutrophication pathway`,

  // Conservation and Global Change
  conservationPrioritization: `
Conservation Prioritization Diagram requirements:
- Show biodiversity hotspots criteria
- Include endemism and threat levels
- Show complementarity approach
- Indicate irreplaceability indices
- Include cost-effectiveness analysis
- Show systematic conservation planning
- Reference Marxan or similar tools
- Include gap analysis concept`,

  climateChangeImpacts: `
Climate Change Ecological Impacts requirements:
- Show species range shifts
- Include phenological changes
- Show community disassembly
- Indicate trophic mismatches
- Include biome shifts
- Show extinction risk changes
- Reference climate velocity concept
- Include refugia identification`,

  invasiveSpeciesDynamics: `
Invasive Species Dynamics requirements:
- Show invasion stages (transport, establishment, spread)
- Include enemy release hypothesis
- Show biotic resistance
- Indicate lag times and invasion debt
- Include propagule pressure
- Show impacts on native communities
- Reference invasional meltdown
- Include control strategies`,

  urbanEcology: `
Urban Ecology Diagram requirements:
- Show urban heat island effect
- Include urban biodiversity patterns
- Show impervious surface effects
- Indicate urban-wildland interface
- Include ecosystem services in cities
- Show green infrastructure
- Reference urban stream syndrome
- Include reconciliation ecology concepts`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Ecology-specific few-shot examples
 */
export const ECOLOGY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a diagram showing the nitrogen cycle in a terrestrial ecosystem',
    output: `flowchart TB
    subgraph atmosphere["Atmosphere"]
        n2["Atmospheric N2<br/>(78% of atmosphere)"]
    end

    subgraph terrestrial["Terrestrial Ecosystem"]
        plants["Plants"]
        animals["Animals"]
        soil_org["Soil Organic Matter"]
    end

    subgraph soil["Soil Processes"]
        nh4["Ammonium<br/>(NH4+)"]
        no3["Nitrate<br/>(NO3-)"]
        fixers["N-fixing bacteria<br/>(Rhizobium, Azotobacter)"]
        nitrifiers["Nitrifying bacteria<br/>(Nitrosomonas, Nitrobacter)"]
        denitrifiers["Denitrifying bacteria"]
        decomposers["Decomposers"]
    end

    subgraph human["Human Inputs"]
        fertilizer["Synthetic Fertilizers<br/>(Haber-Bosch)"]
        combustion["Fossil Fuel<br/>Combustion"]
    end

    n2 -->|"Biological<br/>N Fixation"| fixers
    fixers --> nh4
    n2 -->|"Lightning"| no3
    nh4 -->|"Nitrification"| nitrifiers
    nitrifiers --> no3
    no3 -->|"Plant uptake"| plants
    nh4 -->|"Plant uptake"| plants
    plants --> animals
    plants --> soil_org
    animals --> soil_org
    soil_org -->|"Ammonification"| decomposers
    decomposers --> nh4
    no3 -->|"Denitrification"| denitrifiers
    denitrifiers --> n2
    fertilizer --> no3
    fertilizer --> nh4
    combustion -->|"NOx deposition"| no3

    classDef atm fill:#e0f2fe,stroke:#0284c7
    classDef bio fill:#dcfce7,stroke:#16a34a
    classDef soil fill:#fef3c7,stroke:#d97706
    classDef microbe fill:#f3e8ff,stroke:#9333ea
    classDef human fill:#fee2e2,stroke:#dc2626

    class n2 atm
    class plants,animals,soil_org bio
    class nh4,no3 soil
    class fixers,nitrifiers,denitrifiers,decomposers microbe
    class fertilizer,combustion human`,
  },
  {
    prompt: 'Create a diagram showing metapopulation dynamics',
    output: `flowchart TB
    subgraph landscape["Fragmented Landscape"]
        subgraph patch1["Patch A (Large)"]
            pop1["Population<br/>N = 500<br/>Source"]
        end

        subgraph patch2["Patch B (Medium)"]
            pop2["Population<br/>N = 150<br/>Stable"]
        end

        subgraph patch3["Patch C (Small)"]
            pop3["Population<br/>N = 30<br/>Sink"]
        end

        subgraph patch4["Patch D (Vacant)"]
            empty["Empty<br/>(Local extinction)"]
        end

        subgraph patch5["Patch E (Small)"]
            pop5["Population<br/>N = 45<br/>Sink"]
        end
    end

    subgraph processes["Metapopulation Processes"]
        colon["Colonization<br/>(c)"]
        extinct["Local Extinction<br/>(e)"]
        rescue["Rescue Effect"]
    end

    subgraph dynamics["Population Dynamics"]
        eq["Equilibrium: p* = 1 - e/c"]
        persist["Regional Persistence"]
    end

    pop1 -->|"Dispersal"| pop2
    pop1 -->|"Dispersal"| pop3
    pop1 -->|"Colonization"| empty
    pop2 -->|"Dispersal"| pop5
    pop3 -.->|"High extinction risk"| extinct
    extinct -.-> empty
    pop1 -->|"Rescue effect"| pop3
    colon --> persist
    rescue --> persist

    classDef source fill:#dcfce7,stroke:#16a34a
    classDef stable fill:#dbeafe,stroke:#2563eb
    classDef sink fill:#fef3c7,stroke:#d97706
    classDef empty fill:#f3f4f6,stroke:#9ca3af
    classDef process fill:#f3e8ff,stroke:#9333ea

    class pop1 source
    class pop2 stable
    class pop3,pop5 sink
    class empty empty
    class colon,extinct,rescue,eq,persist process`,
  },
  {
    prompt: 'Create a diagram showing ecological succession stages',
    output: `flowchart LR
    subgraph primary["Primary Succession"]
        bare["Bare Rock<br/>(Glacier retreat,<br/>lava flow)"]
        lichen["Lichens &<br/>Mosses"]
        herb["Herbaceous<br/>Plants"]
        shrub["Shrubs"]
        early_tree["Early Trees<br/>(Pioneer species)"]
        climax["Climax<br/>Community"]
    end

    subgraph secondary["Secondary Succession"]
        disturb["Disturbance<br/>(Fire, logging)"]
        annual["Annual<br/>Weeds"]
        perennial["Perennial<br/>Herbs & Grasses"]
        shrub2["Shrubs &<br/>Seedlings"]
        mid_forest["Mid-successional<br/>Forest"]
        late_forest["Late-successional<br/>Forest"]
    end

    subgraph mechanisms["Facilitation Model"]
        soil_dev["Soil Development"]
        shade["Shade Tolerance"]
        nutrients["Nutrient Accumulation"]
    end

    subgraph trends["Successional Trends"]
        t1["Biomass: Increases"]
        t2["Diversity: Increases then stabilizes"]
        t3["NPP: Peak at mid-succession"]
        t4["Nutrient cycling: Tightens"]
    end

    bare --> lichen
    lichen -->|"100+ years"| herb
    herb --> shrub
    shrub --> early_tree
    early_tree -->|"Centuries"| climax

    disturb --> annual
    annual -->|"1-2 years"| perennial
    perennial -->|"3-20 years"| shrub2
    shrub2 -->|"20-50 years"| mid_forest
    mid_forest -->|"50-200 years"| late_forest

    lichen -.-> soil_dev
    soil_dev -.-> nutrients
    nutrients -.-> shade

    classDef bare fill:#d4d4d4,stroke:#737373
    classDef pioneer fill:#fef3c7,stroke:#d97706
    classDef mid fill:#bbf7d0,stroke:#16a34a
    classDef climax fill:#166534,stroke:#14532d,color:#fff
    classDef disturb fill:#fee2e2,stroke:#dc2626
    classDef trend fill:#dbeafe,stroke:#2563eb

    class bare,disturb bare
    class lichen,annual,herb,perennial pioneer
    class shrub,shrub2,early_tree,mid_forest mid
    class climax,late_forest climax
    class t1,t2,t3,t4 trend`,
  },
  {
    prompt: 'Create a diagram showing trophic cascade in an ecosystem',
    output: `flowchart TB
    subgraph cascade["Trophic Cascade"]
        subgraph top["Top Predator"]
            wolves["Wolves<br/>(Apex predator)"]
        end

        subgraph meso["Mesopredators/Herbivores"]
            elk["Elk<br/>(Herbivore)"]
        end

        subgraph primary_prod["Primary Producers"]
            willow["Willows & Aspens"]
            grass["Riparian Vegetation"]
        end

        subgraph ecosystem["Ecosystem Effects"]
            streams["Stream Stability"]
            birds["Songbird Habitat"]
            beaver["Beaver Populations"]
        end
    end

    subgraph effects["Direct & Indirect Effects"]
        direct["Direct: Predation"]
        indirect["Indirect: Behavior Change<br/>(Landscape of Fear)"]
        tertiary["Tertiary: Ecosystem Engineering"]
    end

    wolves -->|"Predation<br/>(Consumptive)"| elk
    wolves -.->|"Fear Effect<br/>(Non-consumptive)"| elk
    elk -->|"Reduced<br/>overgrazing"| willow
    elk -->|"Reduced<br/>browsing"| grass
    willow --> beaver
    willow --> birds
    grass --> streams
    beaver --> streams

    direct --> cascade
    indirect --> cascade
    tertiary --> cascade

    note1["Yellowstone Wolf<br/>Reintroduction Example"]

    classDef apex fill:#dc2626,stroke:#991b1b,color:#fff
    classDef herb fill:#fbbf24,stroke:#d97706
    classDef prod fill:#22c55e,stroke:#16a34a
    classDef eco fill:#3b82f6,stroke:#2563eb,color:#fff
    classDef effect fill:#f3e8ff,stroke:#9333ea

    class wolves apex
    class elk herb
    class willow,grass prod
    class streams,birds,beaver eco
    class direct,indirect,tertiary effect`,
  },
  {
    prompt: 'Create a landscape ecology diagram showing habitat fragmentation',
    output: `flowchart TB
    subgraph original["Original Continuous Habitat"]
        orig_hab["Intact Forest<br/>10,000 ha<br/>High connectivity"]
    end

    subgraph fragmented["Fragmented Landscape"]
        subgraph patches["Habitat Patches"]
            p1["Patch 1<br/>500 ha<br/>Core: 350 ha"]
            p2["Patch 2<br/>200 ha<br/>Core: 80 ha"]
            p3["Patch 3<br/>50 ha<br/>Core: 10 ha"]
            p4["Patch 4<br/>20 ha<br/>No core"]
        end

        subgraph matrix["Matrix"]
            ag["Agriculture"]
            urban["Urban"]
            roads["Roads"]
        end

        subgraph corridors["Corridors"]
            rip["Riparian<br/>Corridor"]
            hedge["Hedgerows"]
        end
    end

    subgraph effects["Fragmentation Effects"]
        edge["Increased Edge:<br/>Altered microclimate,<br/>Invasive species"]
        isolation["Genetic Isolation:<br/>Reduced gene flow,<br/>Inbreeding"]
        area["Area Effects:<br/>Fewer species,<br/>Smaller populations"]
        extinct["Extinction Debt:<br/>Time-lagged<br/>species loss"]
    end

    subgraph metrics["Landscape Metrics"]
        m1["Total Area: 770 ha<br/>(92% loss)"]
        m2["Patches: 4<br/>(vs 1 original)"]
        m3["Edge density: High"]
        m4["Connectivity: Low"]
    end

    orig_hab -->|"Deforestation<br/>& Development"| fragmented
    p1 <-.->|"Limited dispersal"| p2
    p2 <-.->|"Corridor"| p3
    rip --> p2
    rip --> p3
    hedge --> p1
    hedge --> p4

    fragmented --> edge
    fragmented --> isolation
    fragmented --> area
    fragmented --> extinct

    classDef intact fill:#166534,stroke:#14532d,color:#fff
    classDef large fill:#22c55e,stroke:#16a34a
    classDef medium fill:#86efac,stroke:#22c55e
    classDef small fill:#fef3c7,stroke:#d97706
    classDef matrix fill:#ef4444,stroke:#dc2626
    classDef corridor fill:#3b82f6,stroke:#2563eb,color:#fff
    classDef effect fill:#f3e8ff,stroke:#9333ea

    class orig_hab intact
    class p1 large
    class p2 medium
    class p3,p4 small
    class ag,urban,roads matrix
    class rip,hedge corridor
    class edge,isolation,area,extinct effect`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

const ecologyPrompts = {
  ECOLOGY_DOMAIN_PROMPT,
  ECOLOGY_PROMPTS,
  ECOLOGY_FEW_SHOT_EXAMPLES,
};

export default ecologyPrompts;
