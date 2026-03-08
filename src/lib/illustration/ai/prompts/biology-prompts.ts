/**
 * biology-prompts.ts
 * General Biology-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for general biology topics including:
 * - Ecology and ecosystems
 * - Evolution and natural selection
 * - Biodiversity and conservation
 * - Life cycles and reproduction
 * - Taxonomy and classification
 * - Biomes and habitats
 * - Food webs and energy flow
 * - Population dynamics
 * - Symbiosis and ecological relationships
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// BIOLOGY DOMAIN PROMPT
// =============================================================================

/**
 * Base biology domain prompt for general biology diagrams
 */
export const BIOLOGY_DOMAIN_PROMPT = `
General Biology diagram requirements:
- Use standard biological nomenclature (scientific names in italics)
- Follow established conventions for ecological and evolutionary diagrams
- Include proper scale and time references where appropriate
- Use consistent color coding for different organisms/groups
- Show directional arrows for energy flow and evolutionary relationships
- Reference established classification systems (Linnaean, phylogenetic)
- Include legend/key for complex diagrams
- Color coding: Producers (green), Primary consumers (yellow), Secondary consumers (orange), Decomposers (brown)
- Evolution: Ancestral (gray), Derived (colored by clade)`;

// =============================================================================
// BIOLOGY-SPECIFIC PROMPTS
// =============================================================================

export const BIOLOGY_PROMPTS = {
  // Ecology and Ecosystems
  ecosystemStructure: `
Ecosystem Structure Diagram requirements:
- Show all trophic levels (producers, consumers, decomposers)
- Include abiotic factors (sunlight, water, temperature)
- Show energy flow direction (arrows)
- Include nutrient cycling connections
- Label biomass/energy at each level
- Show interconnections between species
- Include ecosystem boundaries
- Reference 10% energy transfer rule`,

  foodWeb: `
Food Web Diagram requirements:
- Show all organisms with proper names
- Use arrows to indicate energy flow (prey to predator)
- Group organisms by trophic level
- Include decomposer connections
- Show omnivores with multiple connections
- Indicate keystone species if present
- Include producers at the base
- Show primary, secondary, and tertiary consumers`,

  energyPyramid: `
Energy Pyramid requirements:
- Show decreasing energy at each trophic level
- Include specific energy values (kcal/m2/year)
- Label each trophic level
- Show 10% energy transfer between levels
- Indicate energy lost as heat at each level
- Include biomass comparisons
- Show productivity values where relevant
- Contrast with biomass and numbers pyramids if needed`,

  biogeochemicalCycle: `
Biogeochemical Cycle requirements:
- Show all major reservoirs (atmospheric, terrestrial, aquatic)
- Include biological processes (photosynthesis, respiration, decomposition)
- Show geological processes (weathering, sedimentation)
- Indicate human impacts on the cycle
- Include flux rates between reservoirs
- Show time scales for different processes
- Include relevant chemical formulas
- Label short-term and long-term storage`,

  // Evolution and Natural Selection
  naturalSelection: `
Natural Selection Diagram requirements:
- Show initial population variation
- Indicate selective pressure/environmental challenge
- Show differential survival and reproduction
- Illustrate change in trait frequency over generations
- Include fitness concepts where relevant
- Show genetic variation basis
- Indicate time scale of selection
- Include real-world examples if applicable`,

  phylogeneticTree: `
Phylogenetic Tree requirements:
- Use proper cladogram or phylogram format
- Include branch lengths if showing time/divergence
- Label all terminal taxa with scientific names
- Show internal nodes (common ancestors)
- Include bootstrap/support values if applicable
- Mark synapomorphies (shared derived characters)
- Indicate outgroup clearly
- Use consistent time scale if chronogram`,

  adaptiveRadiation: `
Adaptive Radiation Diagram requirements:
- Show ancestral form
- Illustrate divergence into multiple ecological niches
- Label key adaptations for each lineage
- Include time scale of radiation
- Show geographic distribution if relevant
- Indicate ecological roles of each form
- Include examples (Darwin's finches, Hawaiian honeycreepers)
- Show character divergence patterns`,

  speciationProcess: `
Speciation Process requirements:
- Show initial population
- Indicate isolating mechanism (geographic, reproductive, ecological)
- Show divergence over time
- Include gene flow barriers
- Distinguish allopatric vs sympatric modes
- Show reproductive isolation development
- Include prezygotic and postzygotic barriers
- Indicate hybrid zones if relevant`,

  // Biodiversity and Conservation
  biodiversityLevels: `
Biodiversity Levels requirements:
- Show genetic diversity (within species variation)
- Show species diversity (number and evenness)
- Show ecosystem diversity (habitat types)
- Include measurement indices (Shannon, Simpson)
- Show relationships between levels
- Include examples at each level
- Indicate conservation implications
- Reference global biodiversity patterns`,

  conservationStatus: `
Conservation Status Diagram requirements:
- Use IUCN Red List categories
- Show population trends (increasing, stable, declining)
- Include threat factors
- Show geographic range
- Indicate conservation actions
- Include success stories if relevant
- Show temporal changes in status
- Reference extinction risk factors`,

  // Life Cycles and Reproduction
  lifeCycle: `
Life Cycle Diagram requirements:
- Show all life stages in sequence
- Indicate transformation/metamorphosis events
- Include time duration at each stage
- Show reproductive events
- Distinguish haploid and diploid stages if relevant
- Include environmental triggers
- Show alternation of generations if applicable
- Label key developmental milestones`,

  reproductiveStrategies: `
Reproductive Strategies requirements:
- Compare r-selection vs K-selection
- Show offspring number vs parental investment
- Include life history trade-offs
- Show survivorship curves
- Indicate habitat associations
- Include examples for each strategy
- Show age at reproduction
- Reference carrying capacity concepts`,

  // Taxonomy and Classification
  taxonomicClassification: `
Taxonomic Classification requirements:
- Show complete hierarchy (Domain to Species)
- Use proper nomenclature formatting
- Include defining characteristics at each level
- Show related taxa for comparison
- Include phylogenetic context
- Reference three-domain system
- Show binomial nomenclature correctly
- Include common names where helpful`,

  cladistics: `
Cladistics Diagram requirements:
- Show character matrix if relevant
- Identify synapomorphies for each clade
- Distinguish monophyletic, paraphyletic, polyphyletic
- Include outgroup rooting
- Show most parsimonious tree
- Indicate character state changes
- Label clades with proper names
- Include bootstrap support values`,

  // Biomes and Habitats
  biomeCharacteristics: `
Biome Characteristics requirements:
- Show climate parameters (temperature, precipitation)
- Include characteristic vegetation types
- List representative fauna
- Show geographic distribution
- Indicate soil characteristics
- Include seasonal variations
- Show productivity levels
- Reference Whittaker biome classification`,

  habitatStructure: `
Habitat Structure requirements:
- Show vertical stratification (layers/zones)
- Include microhabitat diversity
- Show substrate characteristics
- Indicate light availability gradients
- Include moisture gradients
- Show spatial heterogeneity
- Reference ecological niches
- Include edge effects if relevant`,

  // Population Ecology
  populationDynamics: `
Population Dynamics requirements:
- Show exponential vs logistic growth models
- Include carrying capacity concept
- Indicate birth and death rates
- Show immigration/emigration effects
- Include density-dependent factors
- Show population fluctuations
- Reference Lotka-Volterra equations if relevant
- Include life tables or age structure`,

  predatorPreyDynamics: `
Predator-Prey Dynamics requirements:
- Show cyclic population fluctuations
- Include time lag effects
- Indicate functional and numerical responses
- Show Lotka-Volterra oscillations
- Include stabilizing mechanisms
- Reference real-world examples (lynx-hare)
- Show phase portraits if appropriate
- Include density-dependent effects`,

  // Symbiosis and Interactions
  symbioticRelationships: `
Symbiotic Relationships requirements:
- Distinguish mutualism, commensalism, parasitism
- Show costs/benefits for each partner (+/0/-)
- Include obligate vs facultative relationships
- Provide specific examples
- Show coevolution patterns
- Include microbiome examples
- Reference lichen, mycorrhizae, etc.
- Show spectrum of interactions`,

  communityInteractions: `
Community Interactions requirements:
- Show competition (intra- and interspecific)
- Include competitive exclusion principle
- Show resource partitioning
- Include facilitation interactions
- Show trophic cascades
- Include keystone species effects
- Reference community assembly
- Show succession patterns`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Biology-specific few-shot examples
 */
export const BIOLOGY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a food web diagram for a temperate forest ecosystem',
    output: `flowchart TB
    subgraph producers["Producers"]
        trees["Oak & Maple Trees"]
        shrubs["Shrubs & Bushes"]
        herbs["Herbs & Grasses"]
    end

    subgraph primary["Primary Consumers"]
        deer["Deer"]
        rabbit["Rabbits"]
        squirrel["Squirrels"]
        insects["Insects"]
        songbird["Songbirds"]
    end

    subgraph secondary["Secondary Consumers"]
        fox["Fox"]
        snake["Snakes"]
        owl["Owl"]
    end

    subgraph tertiary["Tertiary Consumers"]
        hawk["Red-tailed Hawk"]
        wolf["Gray Wolf"]
    end

    subgraph decomposers["Decomposers"]
        fungi["Fungi"]
        bacteria["Bacteria"]
        earthworm["Earthworms"]
    end

    trees --> deer
    trees --> squirrel
    shrubs --> rabbit
    shrubs --> deer
    herbs --> rabbit
    herbs --> insects
    trees --> insects

    insects --> songbird
    insects --> snake
    squirrel --> fox
    squirrel --> hawk
    rabbit --> fox
    rabbit --> owl
    deer --> wolf
    songbird --> owl
    songbird --> hawk
    snake --> hawk
    fox --> wolf

    producers -.-> decomposers
    primary -.-> decomposers
    secondary -.-> decomposers
    decomposers -.->|"Nutrients"| producers

    classDef prod fill:#22c55e,stroke:#15803d
    classDef herb fill:#fef08a,stroke:#ca8a04
    classDef carn fill:#fb923c,stroke:#c2410c
    classDef apex fill:#ef4444,stroke:#b91c1c
    classDef dec fill:#a16207,stroke:#78350f

    class trees,shrubs,herbs prod
    class deer,rabbit,squirrel,insects,songbird herb
    class fox,snake,owl carn
    class hawk,wolf apex
    class fungi,bacteria,earthworm dec`,
  },
  {
    prompt: 'Create a diagram showing the process of natural selection',
    output: `flowchart TB
    subgraph gen1["Generation 1: Initial Population"]
        pop1["Population with<br/>phenotypic variation<br/>(light & dark moths)"]
    end

    subgraph selection["Selection Pressure"]
        env["Environmental Change<br/>(Industrial pollution<br/>darkens tree bark)"]
    end

    subgraph survival["Differential Survival"]
        fit["Dark moths:<br/>Better camouflage<br/>Higher survival"]
        unfit["Light moths:<br/>Poor camouflage<br/>Lower survival"]
    end

    subgraph reproduction["Differential Reproduction"]
        repr["Dark moths<br/>reproduce more<br/>successfully"]
    end

    subgraph gen2["Generation 2+: Changed Population"]
        pop2["Increased frequency<br/>of dark allele"]
    end

    subgraph outcome["Evolutionary Outcome"]
        adapt["Population adapted<br/>to new environment"]
    end

    pop1 --> env
    env --> fit
    env --> unfit
    fit --> repr
    unfit -.->|"Reduced"| repr
    repr --> pop2
    pop2 --> adapt

    note1["Key: Heritable variation +<br/>Selection pressure =<br/>Evolution"]

    classDef initial fill:#dbeafe,stroke:#2563eb
    classDef pressure fill:#fef3c7,stroke:#d97706
    classDef positive fill:#dcfce7,stroke:#16a34a
    classDef negative fill:#fee2e2,stroke:#dc2626
    classDef outcome fill:#f3e8ff,stroke:#9333ea

    class pop1 initial
    class env pressure
    class fit,repr positive
    class unfit negative
    class pop2,adapt outcome`,
  },
  {
    prompt: 'Create a phylogenetic tree showing vertebrate evolution',
    output: `flowchart TB
    subgraph phylogeny["Vertebrate Phylogeny"]
        ancestor["Common<br/>Ancestor<br/>(~530 mya)"]

        fish["Fish<br/>(Osteichthyes)"]
        amphibians["Amphibians"]
        reptiles["Reptiles"]
        birds["Birds"]
        mammals["Mammals"]

        node1["Gnathostomes<br/>(jawed)"]
        node2["Tetrapods<br/>(four limbs)"]
        node3["Amniotes<br/>(amniotic egg)"]
        node4["Archosaurs"]
    end

    subgraph traits["Key Synapomorphies"]
        t1["Vertebral column"]
        t2["Jaws"]
        t3["Limbs with digits"]
        t4["Amniotic egg"]
        t5["Feathers"]
        t6["Hair, mammary glands"]
    end

    ancestor --> t1
    t1 --> node1
    node1 --> fish
    node1 --> t2
    t2 --> node2
    node2 --> amphibians
    node2 --> t3
    t3 --> node3
    node3 --> t4
    t4 --> reptiles
    t4 --> node4
    node4 --> t5
    t5 --> birds
    node3 --> t6
    t6 --> mammals

    classDef ancestor fill:#94a3b8,stroke:#475569
    classDef node fill:#fef3c7,stroke:#d97706
    classDef taxon fill:#dcfce7,stroke:#16a34a
    classDef trait fill:#dbeafe,stroke:#2563eb

    class ancestor ancestor
    class node1,node2,node3,node4 node
    class fish,amphibians,reptiles,birds,mammals taxon
    class t1,t2,t3,t4,t5,t6 trait`,
  },
  {
    prompt: 'Create a diagram showing the carbon cycle',
    output: `flowchart TB
    subgraph atmosphere["Atmosphere"]
        atm_co2["Atmospheric CO2<br/>(~420 ppm)"]
    end

    subgraph terrestrial["Terrestrial"]
        plants["Plants<br/>(Photosynthesis)"]
        animals["Animals<br/>(Respiration)"]
        soil["Soil Organic Carbon"]
        decomp["Decomposers"]
    end

    subgraph aquatic["Aquatic"]
        ocean_co2["Dissolved CO2"]
        phyto["Phytoplankton"]
        marine["Marine Organisms"]
        sediments["Marine Sediments"]
    end

    subgraph geological["Geological Reservoirs"]
        fossil["Fossil Fuels"]
        limestone["Limestone/Shells"]
    end

    subgraph human["Human Activities"]
        combustion["Fossil Fuel<br/>Combustion"]
        deforest["Deforestation"]
    end

    atm_co2 -->|"Photosynthesis<br/>120 Gt/yr"| plants
    plants -->|"Respiration<br/>60 Gt/yr"| atm_co2
    plants --> animals
    animals -->|"Respiration"| atm_co2
    plants --> soil
    animals --> decomp
    decomp -->|"Decomposition"| atm_co2
    decomp --> soil
    soil -->|"Soil respiration<br/>60 Gt/yr"| atm_co2

    atm_co2 <-->|"Gas exchange<br/>90 Gt/yr"| ocean_co2
    ocean_co2 --> phyto
    phyto --> marine
    marine --> sediments
    sediments -->|"Millions of years"| fossil
    sediments --> limestone

    fossil --> combustion
    combustion -->|"~10 Gt/yr"| atm_co2
    deforest -->|"~1 Gt/yr"| atm_co2

    classDef atm fill:#e0f2fe,stroke:#0284c7
    classDef bio fill:#dcfce7,stroke:#16a34a
    classDef aqua fill:#dbeafe,stroke:#2563eb
    classDef geo fill:#fef3c7,stroke:#d97706
    classDef human fill:#fee2e2,stroke:#dc2626

    class atm_co2 atm
    class plants,animals,soil,decomp bio
    class ocean_co2,phyto,marine,sediments aqua
    class fossil,limestone geo
    class combustion,deforest human`,
  },
  {
    prompt: 'Create a diagram showing population growth models',
    output: `flowchart TB
    subgraph models["Population Growth Models"]
        subgraph exponential["Exponential Growth"]
            exp_eq["dN/dt = rN"]
            exp_desc["Unlimited resources<br/>J-shaped curve"]
            exp_ex["Bacteria in lab<br/>Invasive species"]
        end

        subgraph logistic["Logistic Growth"]
            log_eq["dN/dt = rN(K-N)/K"]
            log_desc["Limited resources<br/>S-shaped curve"]
            log_ex["Most natural<br/>populations"]
        end
    end

    subgraph factors["Influencing Factors"]
        subgraph increase["Increase (N+)"]
            birth["Birth rate (b)"]
            immig["Immigration (i)"]
        end

        subgraph decrease["Decrease (N-)"]
            death["Death rate (d)"]
            emig["Emigration (e)"]
        end
    end

    subgraph regulation["Density-Dependent Factors"]
        competition["Competition"]
        predation["Predation"]
        disease["Disease"]
        resources["Resource limitation"]
    end

    subgraph capacity["Carrying Capacity (K)"]
        k_def["Maximum sustainable<br/>population size"]
    end

    exp_eq --> exp_desc
    exp_desc --> exp_ex
    log_eq --> log_desc
    log_desc --> log_ex

    increase --> exponential
    decrease --> exponential
    increase --> logistic
    decrease --> logistic

    regulation --> capacity
    capacity --> logistic

    classDef model fill:#f3e8ff,stroke:#9333ea
    classDef pos fill:#dcfce7,stroke:#16a34a
    classDef neg fill:#fee2e2,stroke:#dc2626
    classDef reg fill:#fef3c7,stroke:#d97706
    classDef cap fill:#dbeafe,stroke:#2563eb

    class exp_eq,exp_desc,exp_ex,log_eq,log_desc,log_ex model
    class birth,immig pos
    class death,emig neg
    class competition,predation,disease,resources reg
    class k_def cap`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

const biologyPrompts = {
  BIOLOGY_DOMAIN_PROMPT,
  BIOLOGY_PROMPTS,
  BIOLOGY_FEW_SHOT_EXAMPLES,
};

export default biologyPrompts;
