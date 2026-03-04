/**
 * biology.ts
 * Biology diagram templates for FINNISH
 *
 * Contains templates for biological pathways, cellular processes,
 * molecular biology, genetics, ecology, evolution, and life sciences diagrams.
 *
 * Ralph Loop Iteration 2 - COMPLETE checkpoint
 * Expanded from 21 to 26 templates covering:
 * - Cellular & Molecular (5)
 * - Evolution & Phylogenetics (4)
 * - Ecology (5)
 * - Genetics (4)
 * - Plant Biology (2)
 * - Cell Structure (3)
 * - Organism & Taxonomy (3)
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// CELLULAR & MOLECULAR TEMPLATES
// =============================================================================

/**
 * Cell Signaling Pathway template
 */
export const cellSignalingPathway: DiagramTemplate = {
  id: 'bio-cell-signaling',
  name: 'Cell Signaling Pathway',
  description:
    'Signal transduction pathway showing receptors, messengers, and downstream effects',
  domain: 'biology',
  promptTemplate: `Create a cell signaling pathway diagram:
- Signaling molecule/ligand: {{ligand}}
- Receptor type: {{receptorType}}
- Second messengers: {{secondMessengers}}
- Kinase cascade: {{kinaseCascade}}
- Transcription factors: {{transcriptionFactors}}
- Target genes: {{targetGenes}}
- Cellular responses: {{cellularResponses}}
- Feedback mechanisms: {{feedbackMechanisms}}
{{#inhibitors}}Known inhibitors: {{inhibitors}}{{/inhibitors}}`,
  placeholders: [
    'ligand',
    'receptorType',
    'secondMessengers',
    'kinaseCascade',
    'transcriptionFactors',
    'targetGenes',
    'cellularResponses',
    'feedbackMechanisms',
    'inhibitors',
  ],
  mermaidExample: `flowchart TB
    subgraph extracellular["Extracellular Space"]
        ligand["Growth Factor"]
    end

    subgraph membrane["Cell Membrane"]
        receptor["Receptor Tyrosine Kinase"]
    end

    subgraph cytoplasm["Cytoplasm"]
        ras["Ras-GTP"]
        raf["Raf"]
        mek["MEK"]
        erk["ERK"]
    end

    subgraph nucleus["Nucleus"]
        tf["Transcription Factors<br/>(Elk-1, c-Fos)"]
        genes["Target Gene Expression"]
    end

    ligand -->|binds| receptor
    receptor -->|activates| ras
    ras -->|recruits| raf
    raf -->|phosphorylates| mek
    mek -->|phosphorylates| erk
    erk -->|translocates| tf
    tf -->|activates| genes

    genes -.->|negative feedback| receptor

    classDef extracell fill:#e0f2fe,stroke:#0284c7
    classDef membrane fill:#fef3c7,stroke:#d97706
    classDef cyto fill:#f3e8ff,stroke:#9333ea
    classDef nuc fill:#dcfce7,stroke:#16a34a

    class ligand extracell
    class receptor membrane
    class ras,raf,mek,erk cyto
    class tf,genes nuc`,
};

/**
 * Metabolic Pathway template
 */
export const metabolicPathway: DiagramTemplate = {
  id: 'bio-metabolic-pathway',
  name: 'Metabolic Pathway',
  description:
    'Biochemical pathway showing metabolites, enzymes, and energy flow',
  domain: 'biology',
  promptTemplate: `Create a metabolic pathway diagram:
- Pathway name: {{pathwayName}}
- Initial substrate: {{initialSubstrate}}
- Intermediate metabolites: {{intermediates}}
- Enzymes: {{enzymes}}
- Cofactors required: {{cofactors}}
- ATP/NADH production or consumption: {{energetics}}
- Regulatory points: {{regulatoryPoints}}
- Final products: {{finalProducts}}
- Connections to other pathways: {{connections}}`,
  placeholders: [
    'pathwayName',
    'initialSubstrate',
    'intermediates',
    'enzymes',
    'cofactors',
    'energetics',
    'regulatoryPoints',
    'finalProducts',
    'connections',
  ],
  mermaidExample: `flowchart TB
    subgraph glycolysis["Glycolysis"]
        glucose["Glucose"]
        g6p["Glucose-6-P"]
        f6p["Fructose-6-P"]
        fbp["Fructose-1,6-BP"]
        gap["G3P"]
        pyruvate["Pyruvate"]
    end

    subgraph enzymes["Key Enzymes"]
        e1["Hexokinase"]
        e2["PFK-1"]
        e3["Pyruvate Kinase"]
    end

    subgraph energy["Energy"]
        atp["ATP"]
        nadh["NADH"]
    end

    glucose -->|"Hexokinase<br/>-1 ATP"| g6p
    g6p --> f6p
    f6p -->|"PFK-1<br/>-1 ATP"| fbp
    fbp --> gap
    gap -->|"+2 NADH"| pyruvate
    pyruvate -->|"Pyruvate Kinase<br/>+2 ATP"| atp

    classDef substrate fill:#dbeafe,stroke:#2563eb
    classDef product fill:#dcfce7,stroke:#16a34a
    classDef enzyme fill:#fef3c7,stroke:#d97706

    class glucose,g6p,f6p,fbp,gap substrate
    class pyruvate product
    class e1,e2,e3 enzyme`,
};

/**
 * Gene Expression template
 */
export const geneExpression: DiagramTemplate = {
  id: 'bio-gene-expression',
  name: 'Gene Expression',
  description:
    'Central dogma diagram showing transcription, processing, and translation',
  domain: 'biology',
  promptTemplate: `Create a gene expression diagram:
- Gene name: {{geneName}}
- Promoter elements: {{promoterElements}}
- Transcription factors: {{transcriptionFactors}}
- RNA processing steps: {{rnaProcessing}}
- Regulatory elements (enhancers/silencers): {{regulatoryElements}}
- Translation initiation: {{translationInitiation}}
- Post-translational modifications: {{postTranslational}}
- Protein localization: {{proteinLocalization}}`,
  placeholders: [
    'geneName',
    'promoterElements',
    'transcriptionFactors',
    'rnaProcessing',
    'regulatoryElements',
    'translationInitiation',
    'postTranslational',
    'proteinLocalization',
  ],
  mermaidExample: `flowchart TB
    subgraph nucleus["Nucleus"]
        dna["DNA<br/>Gene Sequence"]
        premrna["Pre-mRNA"]
        mrna["Mature mRNA"]
    end

    subgraph cytoplasm["Cytoplasm"]
        ribosome["Ribosome"]
        protein["Protein"]
        modified["Modified Protein"]
    end

    subgraph destination["Destination"]
        membrane["Membrane"]
        secreted["Secreted"]
        cytosolic["Cytosolic"]
    end

    dna -->|"Transcription<br/>RNA Polymerase II"| premrna
    premrna -->|"Splicing<br/>5' Cap, 3' Poly-A"| mrna
    mrna -->|"Export"| ribosome
    ribosome -->|"Translation"| protein
    protein -->|"Post-translational<br/>modification"| modified
    modified --> membrane
    modified --> secreted
    modified --> cytosolic

    classDef dna fill:#dbeafe,stroke:#2563eb
    classDef rna fill:#fce7f3,stroke:#db2777
    classDef protein fill:#dcfce7,stroke:#16a34a`,
};

/**
 * Protein Structure template
 */
export const proteinStructure: DiagramTemplate = {
  id: 'bio-protein-structure',
  name: 'Protein Structure',
  description:
    'Hierarchical protein structure showing primary through quaternary organization',
  domain: 'biology',
  promptTemplate: `Create a protein structure diagram:
- Protein name: {{proteinName}}
- Primary sequence features: {{primaryFeatures}}
- Secondary structures: {{secondaryStructures}}
- Domains: {{domains}}
- Active sites: {{activeSites}}
- Binding sites: {{bindingSites}}
- Quaternary organization: {{quaternary}}
- Post-translational modifications: {{modifications}}`,
  placeholders: [
    'proteinName',
    'primaryFeatures',
    'secondaryStructures',
    'domains',
    'activeSites',
    'bindingSites',
    'quaternary',
    'modifications',
  ],
  mermaidExample: `flowchart TB
    subgraph primary["Primary Structure"]
        seq["N-terminus --- Amino Acid Sequence --- C-terminus"]
    end

    subgraph secondary["Secondary Structure"]
        helix["Alpha Helices"]
        sheet["Beta Sheets"]
        loop["Loops/Turns"]
    end

    subgraph tertiary["Tertiary Structure"]
        domain1["Catalytic Domain"]
        domain2["Regulatory Domain"]
        domain3["Binding Domain"]
    end

    subgraph quaternary["Quaternary Structure"]
        tetramer["Tetramer Assembly<br/>(4 subunits)"]
    end

    seq --> helix
    seq --> sheet
    seq --> loop
    helix --> domain1
    sheet --> domain2
    loop --> domain3
    domain1 --> tetramer
    domain2 --> tetramer
    domain3 --> tetramer`,
};

/**
 * Cell Cycle template
 */
export const cellCycle: DiagramTemplate = {
  id: 'bio-cell-cycle',
  name: 'Cell Cycle',
  description:
    'Cell division cycle showing phases, checkpoints, and regulatory proteins',
  domain: 'biology',
  promptTemplate: `Create a cell cycle diagram:
- Cell type: {{cellType}}
- G1 phase details: {{g1Phase}}
- S phase details: {{sPhase}}
- G2 phase details: {{g2Phase}}
- M phase (mitosis) stages: {{mPhase}}
- Checkpoints: {{checkpoints}}
- Cyclin-CDK complexes: {{cyclinCDK}}
- Regulatory proteins: {{regulatoryProteins}}
- Duration estimates: {{duration}}`,
  placeholders: [
    'cellType',
    'g1Phase',
    'sPhase',
    'g2Phase',
    'mPhase',
    'checkpoints',
    'cyclinCDK',
    'regulatoryProteins',
    'duration',
  ],
  mermaidExample: `flowchart TB
    subgraph interphase["Interphase"]
        g1["G1 Phase<br/>Cell Growth<br/>(Cyclin D-CDK4/6)"]
        s["S Phase<br/>DNA Replication<br/>(Cyclin E/A-CDK2)"]
        g2["G2 Phase<br/>Preparation<br/>(Cyclin A-CDK2)"]
    end

    subgraph mitosis["M Phase"]
        prophase["Prophase"]
        metaphase["Metaphase"]
        anaphase["Anaphase"]
        telophase["Telophase"]
        cytokinesis["Cytokinesis"]
    end

    check1{"G1/S<br/>Checkpoint"}
    check2{"G2/M<br/>Checkpoint"}
    check3{"Spindle<br/>Checkpoint"}

    g1 --> check1
    check1 -->|Pass| s
    s --> g2
    g2 --> check2
    check2 -->|Pass| prophase
    prophase --> metaphase
    metaphase --> check3
    check3 -->|Pass| anaphase
    anaphase --> telophase
    telophase --> cytokinesis
    cytokinesis --> g1

    classDef phase fill:#dbeafe,stroke:#2563eb
    classDef checkpoint fill:#fee2e2,stroke:#dc2626
    classDef mitotic fill:#dcfce7,stroke:#16a34a

    class g1,s,g2 phase
    class check1,check2,check3 checkpoint
    class prophase,metaphase,anaphase,telophase,cytokinesis mitotic`,
};

// =============================================================================
// EVOLUTION & PHYLOGENETICS TEMPLATES
// =============================================================================

/**
 * Phylogenetic Tree template
 */
export const phylogeneticTree: DiagramTemplate = {
  id: 'bio-phylogenetic-tree',
  name: 'Phylogenetic Tree',
  description:
    'Evolutionary tree showing ancestral relationships between species or genes',
  domain: 'biology',
  promptTemplate: `Create a phylogenetic tree:
- Taxa/species to include: {{taxa}}
- Outgroup: {{outgroup}}
- Branch lengths (if applicable): {{branchLengths}}
- Bootstrap values: {{bootstrapValues}}
- Key evolutionary events: {{evolutionaryEvents}}
- Time scale: {{timeScale}}
- Tree style: {{treeStyle}}
{{#annotations}}Annotations: {{annotations}}{{/annotations}}`,
  placeholders: [
    'taxa',
    'outgroup',
    'branchLengths',
    'bootstrapValues',
    'evolutionaryEvents',
    'timeScale',
    'treeStyle',
    'annotations',
  ],
  mermaidExample: `flowchart TB
    ancestor["Common Ancestor"]

    node1["Node 1<br/>(95%)"]
    node2["Node 2<br/>(87%)"]
    node3["Node 3<br/>(99%)"]

    sp1["Species A<br/><i>Homo sapiens</i>"]
    sp2["Species B<br/><i>Pan troglodytes</i>"]
    sp3["Species C<br/><i>Gorilla gorilla</i>"]
    sp4["Species D<br/><i>Pongo pygmaeus</i>"]
    sp5["Outgroup<br/><i>Macaca mulatta</i>"]

    ancestor --> node1
    ancestor --> sp5
    node1 --> node2
    node1 --> sp4
    node2 --> node3
    node2 --> sp3
    node3 --> sp1
    node3 --> sp2

    classDef ancestor fill:#f3e8ff,stroke:#9333ea
    classDef node fill:#fef3c7,stroke:#d97706
    classDef species fill:#dcfce7,stroke:#16a34a
    classDef outgroup fill:#fee2e2,stroke:#dc2626

    class ancestor ancestor
    class node1,node2,node3 node
    class sp1,sp2,sp3,sp4 species
    class sp5 outgroup`,
};

/**
 * Cladogram template
 */
export const cladogram: DiagramTemplate = {
  id: 'bio-cladogram',
  name: 'Cladogram',
  description:
    'Branching diagram showing shared derived characteristics (synapomorphies)',
  domain: 'biology',
  promptTemplate: `Create a cladogram:
- Taxa to include: {{taxa}}
- Shared derived traits (synapomorphies): {{synapomorphies}}
- Outgroup: {{outgroup}}
- Monophyletic groups: {{monophyleticGroups}}
- Key character transitions: {{characterTransitions}}
- Classification level: {{classificationLevel}}
{{#annotations}}Additional annotations: {{annotations}}{{/annotations}}`,
  placeholders: [
    'taxa',
    'synapomorphies',
    'outgroup',
    'monophyleticGroups',
    'characterTransitions',
    'classificationLevel',
    'annotations',
  ],
  mermaidExample: `flowchart LR
    subgraph traits["Character Traits"]
        t1["Vertebral column"]
        t2["Jaws"]
        t3["Four limbs"]
        t4["Amniotic egg"]
        t5["Hair/Mammary glands"]
    end

    root["Ancestor"] --> lamprey["Lamprey"]
    root --> n1["Node"]
    n1 --> shark["Shark"]
    n1 --> n2["Node"]
    n2 --> salamander["Salamander"]
    n2 --> n3["Node"]
    n3 --> lizard["Lizard"]
    n3 --> n4["Node"]
    n4 --> cat["Cat"]
    n4 --> human["Human"]

    t1 -.-> root
    t2 -.-> n1
    t3 -.-> n2
    t4 -.-> n3
    t5 -.-> n4`,
};

/**
 * Natural Selection Process template
 */
export const naturalSelectionProcess: DiagramTemplate = {
  id: 'bio-natural-selection',
  name: 'Natural Selection Process',
  description:
    'Diagram showing the mechanism of natural selection and adaptation',
  domain: 'biology',
  promptTemplate: `Create a natural selection diagram:
- Initial population variation: {{populationVariation}}
- Environmental pressure: {{environmentalPressure}}
- Selected trait: {{selectedTrait}}
- Fitness advantage: {{fitnessAdvantage}}
- Differential reproduction: {{differentialReproduction}}
- Generations shown: {{generations}}
- Final population composition: {{finalPopulation}}
{{#examples}}Real-world examples: {{examples}}{{/examples}}`,
  placeholders: [
    'populationVariation',
    'environmentalPressure',
    'selectedTrait',
    'fitnessAdvantage',
    'differentialReproduction',
    'generations',
    'finalPopulation',
    'examples',
  ],
  mermaidExample: `flowchart TB
    subgraph gen1["Generation 1"]
        p1["Population with<br/>trait variation"]
    end

    subgraph pressure["Selection Pressure"]
        env["Environmental<br/>Challenge"]
    end

    subgraph selection["Differential Survival"]
        fit["Fit individuals<br/>survive & reproduce"]
        unfit["Less fit individuals<br/>reduced reproduction"]
    end

    subgraph gen2["Generation 2"]
        p2["Increased frequency<br/>of favorable trait"]
    end

    subgraph gen3["Generation N"]
        p3["Trait becomes<br/>common in population"]
    end

    p1 --> env
    env --> fit
    env --> unfit
    fit --> p2
    p2 --> p3

    classDef initial fill:#e0f2fe,stroke:#0284c7
    classDef pressure fill:#fef3c7,stroke:#d97706
    classDef outcome fill:#dcfce7,stroke:#16a34a

    class p1 initial
    class env,unfit pressure
    class fit,p2,p3 outcome`,
};

// =============================================================================
// ECOLOGY TEMPLATES
// =============================================================================

/**
 * Food Web template
 */
export const foodWeb: DiagramTemplate = {
  id: 'bio-food-web',
  name: 'Food Web',
  description:
    'Ecological food web showing trophic relationships between organisms',
  domain: 'biology',
  promptTemplate: `Create a food web diagram:
- Ecosystem type: {{ecosystemType}}
- Primary producers: {{producers}}
- Primary consumers (herbivores): {{primaryConsumers}}
- Secondary consumers: {{secondaryConsumers}}
- Tertiary consumers: {{tertiaryConsumers}}
- Apex predators: {{apexPredators}}
- Decomposers: {{decomposers}}
- Energy flow direction: {{energyFlow}}`,
  placeholders: [
    'ecosystemType',
    'producers',
    'primaryConsumers',
    'secondaryConsumers',
    'tertiaryConsumers',
    'apexPredators',
    'decomposers',
    'energyFlow',
  ],
  mermaidExample: `flowchart TB
    subgraph producers["Primary Producers"]
        grass["Grass"]
        algae["Algae"]
        trees["Trees"]
    end

    subgraph primary["Primary Consumers"]
        rabbit["Rabbit"]
        deer["Deer"]
        insects["Insects"]
    end

    subgraph secondary["Secondary Consumers"]
        fox["Fox"]
        snake["Snake"]
        frog["Frog"]
    end

    subgraph tertiary["Tertiary Consumers"]
        hawk["Hawk"]
        owl["Owl"]
    end

    subgraph decomp["Decomposers"]
        bacteria["Bacteria"]
        fungi["Fungi"]
    end

    grass --> rabbit
    grass --> deer
    grass --> insects
    trees --> insects
    algae --> insects

    rabbit --> fox
    rabbit --> hawk
    deer --> fox
    insects --> frog
    insects --> snake

    frog --> snake
    frog --> owl
    snake --> hawk
    fox --> hawk

    hawk -.-> decomp
    decomp -.-> producers`,
};

/**
 * Ecosystem Energy Flow template
 */
export const ecosystemEnergyFlow: DiagramTemplate = {
  id: 'bio-ecosystem-energy',
  name: 'Ecosystem Energy Flow',
  description:
    'Diagram showing energy transfer through trophic levels with efficiency losses',
  domain: 'biology',
  promptTemplate: `Create an ecosystem energy flow diagram:
- Ecosystem name: {{ecosystemName}}
- Solar energy input: {{solarInput}}
- Primary productivity: {{primaryProductivity}}
- Trophic levels: {{trophicLevels}}
- Energy transfer efficiency: {{transferEfficiency}}
- Heat loss at each level: {{heatLoss}}
- Biomass pyramid: {{biomassPyramid}}
{{#humanImpact}}Human impact: {{humanImpact}}{{/humanImpact}}`,
  placeholders: [
    'ecosystemName',
    'solarInput',
    'primaryProductivity',
    'trophicLevels',
    'transferEfficiency',
    'heatLoss',
    'biomassPyramid',
    'humanImpact',
  ],
  mermaidExample: `flowchart TB
    subgraph sun["Solar Energy"]
        solar["1,000,000 kcal"]
    end

    subgraph producers["Producers (1%)"]
        plants["10,000 kcal"]
    end

    subgraph primary["Primary Consumers (10%)"]
        herbivores["1,000 kcal"]
    end

    subgraph secondary["Secondary Consumers (10%)"]
        carnivores["100 kcal"]
    end

    subgraph tertiary["Tertiary Consumers (10%)"]
        apex["10 kcal"]
    end

    solar -->|"1% captured"| plants
    plants -->|"90% lost as heat"| herbivores
    herbivores -->|"90% lost as heat"| carnivores
    carnivores -->|"90% lost as heat"| apex

    classDef energy fill:#fef3c7,stroke:#d97706
    classDef producer fill:#dcfce7,stroke:#16a34a
    classDef consumer fill:#dbeafe,stroke:#2563eb`,
};

/**
 * Biogeochemical Cycle template
 */
export const biogeochemicalCycle: DiagramTemplate = {
  id: 'bio-biogeochemical-cycle',
  name: 'Biogeochemical Cycle',
  description:
    'Cycle diagram showing element movement through biotic and abiotic components',
  domain: 'biology',
  promptTemplate: `Create a biogeochemical cycle diagram:
- Element/compound: {{element}}
- Atmospheric reservoir: {{atmosphericReservoir}}
- Terrestrial reservoir: {{terrestrialReservoir}}
- Aquatic reservoir: {{aquaticReservoir}}
- Biological processes: {{biologicalProcesses}}
- Geological processes: {{geologicalProcesses}}
- Human impacts: {{humanImpacts}}
- Time scales: {{timeScales}}`,
  placeholders: [
    'element',
    'atmosphericReservoir',
    'terrestrialReservoir',
    'aquaticReservoir',
    'biologicalProcesses',
    'geologicalProcesses',
    'humanImpacts',
    'timeScales',
  ],
  mermaidExample: `flowchart TB
    subgraph atmosphere["Atmosphere"]
        co2["CO2 in Air"]
    end

    subgraph biosphere["Biosphere"]
        plants["Plants<br/>(Photosynthesis)"]
        animals["Animals<br/>(Respiration)"]
        decomp["Decomposers"]
    end

    subgraph lithosphere["Lithosphere"]
        fossil["Fossil Fuels"]
        sediment["Sediments"]
    end

    subgraph hydrosphere["Hydrosphere"]
        ocean["Ocean CO2"]
        marine["Marine Organisms"]
    end

    co2 -->|"Photosynthesis"| plants
    plants -->|"Consumption"| animals
    animals -->|"Respiration"| co2
    animals -->|"Death"| decomp
    decomp -->|"Decomposition"| co2
    decomp -->|"Burial"| sediment
    sediment -->|"Millions of years"| fossil
    fossil -->|"Combustion"| co2
    co2 <-->|"Gas exchange"| ocean
    ocean --> marine`,
};

/**
 * Population Dynamics template
 */
export const populationDynamics: DiagramTemplate = {
  id: 'bio-population-dynamics',
  name: 'Population Dynamics',
  description:
    'Diagram showing population growth patterns and limiting factors',
  domain: 'biology',
  promptTemplate: `Create a population dynamics diagram:
- Species: {{species}}
- Initial population size: {{initialPopulation}}
- Growth model: {{growthModel}}
- Birth rate: {{birthRate}}
- Death rate: {{deathRate}}
- Carrying capacity: {{carryingCapacity}}
- Limiting factors: {{limitingFactors}}
- Time period: {{timePeriod}}
{{#predatorPrey}}Predator-prey dynamics: {{predatorPrey}}{{/predatorPrey}}`,
  placeholders: [
    'species',
    'initialPopulation',
    'growthModel',
    'birthRate',
    'deathRate',
    'carryingCapacity',
    'limitingFactors',
    'timePeriod',
    'predatorPrey',
  ],
  mermaidExample: `flowchart TB
    subgraph factors["Growth Factors"]
        birth["Birth Rate"]
        immig["Immigration"]
    end

    subgraph population["Population Size (N)"]
        pop["Current<br/>Population"]
    end

    subgraph decline["Decline Factors"]
        death["Death Rate"]
        emig["Emigration"]
    end

    subgraph limit["Limiting Factors"]
        food["Food Availability"]
        space["Space/Territory"]
        disease["Disease"]
        predation["Predation"]
    end

    subgraph capacity["Carrying Capacity (K)"]
        k["Maximum<br/>Sustainable<br/>Population"]
    end

    birth --> pop
    immig --> pop
    pop --> death
    pop --> emig
    limit --> k
    k -.->|"Limits growth"| pop`,
};

// =============================================================================
// GENETICS TEMPLATES
// =============================================================================

/**
 * Mendelian Inheritance template
 */
export const mendelianInheritance: DiagramTemplate = {
  id: 'bio-mendelian-inheritance',
  name: 'Mendelian Inheritance',
  description:
    'Punnett square and inheritance pattern diagram for genetic crosses',
  domain: 'biology',
  promptTemplate: `Create a Mendelian inheritance diagram:
- Trait being studied: {{trait}}
- Parent 1 genotype: {{parent1Genotype}}
- Parent 2 genotype: {{parent2Genotype}}
- Dominant allele: {{dominantAllele}}
- Recessive allele: {{recessiveAllele}}
- Expected genotype ratios: {{genotypeRatios}}
- Expected phenotype ratios: {{phenotypeRatios}}
- Type of cross: {{crossType}}
{{#testCross}}Test cross results: {{testCross}}{{/testCross}}`,
  placeholders: [
    'trait',
    'parent1Genotype',
    'parent2Genotype',
    'dominantAllele',
    'recessiveAllele',
    'genotypeRatios',
    'phenotypeRatios',
    'crossType',
    'testCross',
  ],
  mermaidExample: `flowchart TB
    subgraph parents["Parents (P Generation)"]
        p1["Parent 1<br/>Aa (Heterozygous)"]
        p2["Parent 2<br/>Aa (Heterozygous)"]
    end

    subgraph gametes["Gametes"]
        g1["A or a"]
        g2["A or a"]
    end

    subgraph punnett["Punnett Square"]
        f1["AA<br/>(25%)"]
        f2["Aa<br/>(25%)"]
        f3["Aa<br/>(25%)"]
        f4["aa<br/>(25%)"]
    end

    subgraph ratios["Offspring Ratios"]
        geno["Genotype: 1:2:1"]
        pheno["Phenotype: 3:1"]
    end

    p1 --> g1
    p2 --> g2
    g1 --> punnett
    g2 --> punnett
    punnett --> ratios

    classDef dominant fill:#dcfce7,stroke:#16a34a
    classDef recessive fill:#fee2e2,stroke:#dc2626
    classDef hetero fill:#fef3c7,stroke:#d97706

    class f1 dominant
    class f4 recessive
    class f2,f3 hetero`,
};

/**
 * DNA Replication Mechanism template
 */
export const dnaReplicationMechanism: DiagramTemplate = {
  id: 'bio-dna-replication-mechanism',
  name: 'DNA Replication Mechanism',
  description:
    'Diagram showing the molecular mechanism of DNA replication',
  domain: 'biology',
  promptTemplate: `Create a DNA replication diagram:
- Origin of replication: {{origin}}
- Helicase activity: {{helicase}}
- Leading strand synthesis: {{leadingStrand}}
- Lagging strand synthesis: {{laggingStrand}}
- Primase function: {{primase}}
- DNA polymerase: {{polymerase}}
- Okazaki fragments: {{okazakiFragments}}
- DNA ligase: {{ligase}}
{{#proofreading}}Proofreading mechanism: {{proofreading}}{{/proofreading}}`,
  placeholders: [
    'origin',
    'helicase',
    'leadingStrand',
    'laggingStrand',
    'primase',
    'polymerase',
    'okazakiFragments',
    'ligase',
    'proofreading',
  ],
  mermaidExample: `flowchart LR
    subgraph origin["Origin"]
        ori["Replication<br/>Origin"]
    end

    subgraph fork["Replication Fork"]
        helicase["Helicase<br/>(Unwinds DNA)"]
        ssb["SSB Proteins"]
    end

    subgraph leading["Leading Strand (5' to 3')"]
        lead["Continuous<br/>Synthesis"]
        pol3a["DNA Pol III"]
    end

    subgraph lagging["Lagging Strand (3' to 5')"]
        primase["Primase<br/>(RNA primers)"]
        okazaki["Okazaki<br/>Fragments"]
        pol3b["DNA Pol III"]
        pol1["DNA Pol I<br/>(Removes primers)"]
        ligase["DNA Ligase<br/>(Joins fragments)"]
    end

    ori --> helicase
    helicase --> ssb
    ssb --> lead
    ssb --> primase
    primase --> okazaki
    okazaki --> pol1
    pol1 --> ligase`,
};

/**
 * Transcription Process template
 */
export const transcriptionProcess: DiagramTemplate = {
  id: 'bio-transcription',
  name: 'Transcription Process',
  description:
    'Diagram showing the steps of gene transcription from DNA to mRNA',
  domain: 'biology',
  promptTemplate: `Create a transcription diagram:
- Gene being transcribed: {{gene}}
- Promoter sequence: {{promoter}}
- Transcription factors: {{transcriptionFactors}}
- RNA polymerase: {{rnaPolymerase}}
- Template strand: {{templateStrand}}
- Coding strand: {{codingStrand}}
- Termination signal: {{terminationSignal}}
- Post-transcriptional modifications: {{modifications}}`,
  placeholders: [
    'gene',
    'promoter',
    'transcriptionFactors',
    'rnaPolymerase',
    'templateStrand',
    'codingStrand',
    'terminationSignal',
    'modifications',
  ],
  mermaidExample: `flowchart TB
    subgraph initiation["Initiation"]
        promoter["Promoter<br/>(TATA box)"]
        tf["Transcription<br/>Factors Bind"]
        rnap["RNA Polymerase<br/>Recruitment"]
    end

    subgraph elongation["Elongation"]
        unwind["DNA Unwinding"]
        synth["mRNA Synthesis<br/>(5' to 3')"]
        rewind["DNA Rewinding"]
    end

    subgraph termination["Termination"]
        term["Termination<br/>Signal"]
        release["mRNA Release"]
    end

    subgraph processing["Post-transcriptional Processing"]
        cap["5' Cap Added"]
        splice["Introns Spliced"]
        polya["3' Poly-A Tail"]
        mature["Mature mRNA"]
    end

    promoter --> tf
    tf --> rnap
    rnap --> unwind
    unwind --> synth
    synth --> rewind
    rewind --> term
    term --> release
    release --> cap
    cap --> splice
    splice --> polya
    polya --> mature`,
};

/**
 * Translation Process template
 */
export const translationProcess: DiagramTemplate = {
  id: 'bio-translation',
  name: 'Translation Process',
  description:
    'Diagram showing protein synthesis from mRNA by ribosomes',
  domain: 'biology',
  promptTemplate: `Create a translation diagram:
- mRNA sequence: {{mrnaSequence}}
- Start codon: {{startCodon}}
- Stop codons: {{stopCodons}}
- Ribosome structure: {{ribosomeStructure}}
- tRNA and aminoacyl-tRNA synthetases: {{tRNA}}
- Initiation factors: {{initiationFactors}}
- Elongation cycle: {{elongationCycle}}
- Termination: {{termination}}`,
  placeholders: [
    'mrnaSequence',
    'startCodon',
    'stopCodons',
    'ribosomeStructure',
    'tRNA',
    'initiationFactors',
    'elongationCycle',
    'termination',
  ],
  mermaidExample: `flowchart TB
    subgraph initiation["Initiation"]
        mrna["mRNA + Small<br/>Ribosomal Subunit"]
        start["AUG (Start Codon)"]
        met["Met-tRNA Binds"]
        large["Large Subunit<br/>Joins"]
    end

    subgraph elongation["Elongation Cycle"]
        asite["A Site:<br/>New tRNA Enters"]
        peptide["Peptide Bond<br/>Formation"]
        trans["Translocation"]
    end

    subgraph termination["Termination"]
        stop["Stop Codon<br/>(UAA, UAG, UGA)"]
        release["Release Factors"]
        dissoc["Ribosome<br/>Dissociates"]
        protein["Complete<br/>Polypeptide"]
    end

    mrna --> start
    start --> met
    met --> large
    large --> asite
    asite --> peptide
    peptide --> trans
    trans -->|"Repeat"| asite
    trans --> stop
    stop --> release
    release --> dissoc
    dissoc --> protein`,
};

// =============================================================================
// PLANT BIOLOGY TEMPLATES
// =============================================================================

/**
 * Light and Dark Reactions template (Photosynthesis Detailed)
 */
export const lightDarkReactions: DiagramTemplate = {
  id: 'bio-light-dark-reactions',
  name: 'Light and Dark Reactions',
  description:
    'Comprehensive diagram of light and dark reactions in photosynthesis',
  domain: 'biology',
  promptTemplate: `Create a photosynthesis diagram:
- Chloroplast structure: {{chloroplastStructure}}
- Light reactions location: {{lightReactionsLocation}}
- Photosystem II: {{photosystemII}}
- Photosystem I: {{photosystemI}}
- Electron transport chain: {{electronTransport}}
- ATP synthase: {{atpSynthase}}
- Calvin cycle steps: {{calvinCycle}}
- Products: {{products}}`,
  placeholders: [
    'chloroplastStructure',
    'lightReactionsLocation',
    'photosystemII',
    'photosystemI',
    'electronTransport',
    'atpSynthase',
    'calvinCycle',
    'products',
  ],
  mermaidExample: `flowchart TB
    subgraph thylakoid["Thylakoid Membrane (Light Reactions)"]
        ps2["Photosystem II"]
        etc["Electron<br/>Transport Chain"]
        ps1["Photosystem I"]
        atpsynth["ATP Synthase"]
    end

    subgraph inputs["Inputs"]
        light["Light Energy"]
        water["H2O"]
    end

    subgraph outputs1["Light Reaction Products"]
        atp["ATP"]
        nadph["NADPH"]
        o2["O2"]
    end

    subgraph stroma["Stroma (Calvin Cycle)"]
        fix["CO2 Fixation"]
        reduce["Reduction"]
        regen["RuBP Regeneration"]
    end

    subgraph outputs2["Final Products"]
        g3p["G3P"]
        glucose["Glucose"]
    end

    light --> ps2
    water --> ps2
    ps2 -->|"Electrons"| etc
    ps2 --> o2
    etc --> ps1
    etc --> atpsynth
    atpsynth --> atp
    ps1 --> nadph
    atp --> fix
    nadph --> reduce
    fix --> reduce
    reduce --> regen
    reduce --> g3p
    g3p --> glucose`,
};

/**
 * Plant Vascular System template
 */
export const plantVascularSystem: DiagramTemplate = {
  id: 'bio-plant-vascular',
  name: 'Plant Vascular System',
  description:
    'Diagram of xylem and phloem transport in plants',
  domain: 'biology',
  promptTemplate: `Create a plant vascular system diagram:
- Xylem structure: {{xylemStructure}}
- Phloem structure: {{phloemStructure}}
- Water transport mechanism: {{waterTransport}}
- Sugar transport mechanism: {{sugarTransport}}
- Root uptake: {{rootUptake}}
- Transpiration: {{transpiration}}
- Source-sink relationship: {{sourceSink}}
{{#cavitation}}Cavitation and repair: {{cavitation}}{{/cavitation}}`,
  placeholders: [
    'xylemStructure',
    'phloemStructure',
    'waterTransport',
    'sugarTransport',
    'rootUptake',
    'transpiration',
    'sourceSink',
    'cavitation',
  ],
  mermaidExample: `flowchart TB
    subgraph root["Root"]
        rootHair["Root Hairs"]
        rootXylem["Root Xylem"]
        rootPhloem["Root Phloem"]
    end

    subgraph stem["Stem"]
        stemXylem["Stem Xylem"]
        stemPhloem["Stem Phloem"]
    end

    subgraph leaf["Leaf"]
        stomata["Stomata"]
        mesophyll["Mesophyll<br/>(Photosynthesis)"]
        leafXylem["Leaf Xylem"]
        leafPhloem["Leaf Phloem"]
    end

    subgraph external["External"]
        soil["Soil Water"]
        atmosphere["Atmosphere"]
    end

    soil -->|"Osmosis"| rootHair
    rootHair --> rootXylem
    rootXylem -->|"Cohesion-Tension"| stemXylem
    stemXylem --> leafXylem
    leafXylem --> mesophyll
    mesophyll -->|"Transpiration"| stomata
    stomata --> atmosphere
    mesophyll -->|"Sugars"| leafPhloem
    leafPhloem -->|"Pressure Flow"| stemPhloem
    stemPhloem --> rootPhloem
    rootPhloem -->|"Growth/Storage"| root`,
};

// =============================================================================
// CELL STRUCTURE TEMPLATES
// =============================================================================

/**
 * Animal Cell Structure template
 */
export const animalCellStructure: DiagramTemplate = {
  id: 'bio-animal-cell',
  name: 'Animal Cell Structure',
  description:
    'Detailed diagram of animal cell with all major organelles',
  domain: 'biology',
  promptTemplate: `Create an animal cell diagram:
- Cell membrane: {{cellMembrane}}
- Nucleus and nucleolus: {{nucleus}}
- Mitochondria: {{mitochondria}}
- Endoplasmic reticulum (rough and smooth): {{er}}
- Golgi apparatus: {{golgi}}
- Lysosomes: {{lysosomes}}
- Cytoskeleton: {{cytoskeleton}}
- Centrosomes: {{centrosomes}}
{{#specializedFeatures}}Specialized features: {{specializedFeatures}}{{/specializedFeatures}}`,
  placeholders: [
    'cellMembrane',
    'nucleus',
    'mitochondria',
    'er',
    'golgi',
    'lysosomes',
    'cytoskeleton',
    'centrosomes',
    'specializedFeatures',
  ],
  mermaidExample: `flowchart TB
    subgraph cell["Animal Cell"]
        membrane["Cell Membrane"]

        subgraph nucleus["Nucleus"]
            nucleolus["Nucleolus"]
            chromatin["Chromatin"]
        end

        mito["Mitochondria"]
        rer["Rough ER"]
        ser["Smooth ER"]
        golgi["Golgi Apparatus"]
        lyso["Lysosomes"]
        centro["Centrosomes"]
        cyto["Cytoplasm"]
    end

    membrane --> cyto
    cyto --> nucleus
    cyto --> mito
    cyto --> rer
    cyto --> ser
    rer --> golgi
    golgi --> lyso
    centro -.-> nucleus`,
};

/**
 * Plant Cell Structure template
 */
export const plantCellStructure: DiagramTemplate = {
  id: 'bio-plant-cell',
  name: 'Plant Cell Structure',
  description:
    'Detailed diagram of plant cell with all major organelles including chloroplasts',
  domain: 'biology',
  promptTemplate: `Create a plant cell diagram:
- Cell wall: {{cellWall}}
- Cell membrane: {{cellMembrane}}
- Nucleus: {{nucleus}}
- Chloroplasts: {{chloroplasts}}
- Central vacuole: {{centralVacuole}}
- Mitochondria: {{mitochondria}}
- Endoplasmic reticulum: {{er}}
- Golgi apparatus: {{golgi}}
- Plasmodesmata: {{plasmodesmata}}`,
  placeholders: [
    'cellWall',
    'cellMembrane',
    'nucleus',
    'chloroplasts',
    'centralVacuole',
    'mitochondria',
    'er',
    'golgi',
    'plasmodesmata',
  ],
  mermaidExample: `flowchart TB
    subgraph cell["Plant Cell"]
        wall["Cell Wall"]
        membrane["Cell Membrane"]

        subgraph nucleus["Nucleus"]
            nucleolus["Nucleolus"]
        end

        chloro["Chloroplasts"]
        vacuole["Central Vacuole<br/>(Large)"]
        mito["Mitochondria"]
        rer["Rough ER"]
        golgi["Golgi Apparatus"]
        plasmo["Plasmodesmata"]
    end

    wall --> membrane
    membrane --> vacuole
    vacuole --> nucleus
    chloro --> vacuole
    mito --> vacuole
    rer --> golgi
    plasmo -.-> wall`,
};

/**
 * Mitosis Stages template
 */
export const mitosisStages: DiagramTemplate = {
  id: 'bio-mitosis-stages',
  name: 'Mitosis Stages',
  description:
    'Step-by-step diagram of mitotic cell division stages',
  domain: 'biology',
  promptTemplate: `Create a mitosis stages diagram:
- Interphase preparation: {{interphase}}
- Prophase events: {{prophase}}
- Prometaphase events: {{prometaphase}}
- Metaphase alignment: {{metaphase}}
- Anaphase separation: {{anaphase}}
- Telophase reformation: {{telophase}}
- Cytokinesis: {{cytokinesis}}
- Resulting cells: {{resultingCells}}`,
  placeholders: [
    'interphase',
    'prophase',
    'prometaphase',
    'metaphase',
    'anaphase',
    'telophase',
    'cytokinesis',
    'resultingCells',
  ],
  mermaidExample: `flowchart LR
    subgraph interphase["Interphase"]
        i1["DNA Replication<br/>Cell Growth"]
    end

    subgraph prophase["Prophase"]
        p1["Chromosomes Condense<br/>Nuclear Envelope<br/>Begins to Break"]
    end

    subgraph metaphase["Metaphase"]
        m1["Chromosomes Align<br/>at Metaphase Plate"]
    end

    subgraph anaphase["Anaphase"]
        a1["Sister Chromatids<br/>Separate"]
    end

    subgraph telophase["Telophase"]
        t1["Nuclear Envelopes<br/>Reform"]
    end

    subgraph cytokinesis["Cytokinesis"]
        c1["Cell Divides<br/>into Two"]
    end

    i1 --> p1
    p1 --> m1
    m1 --> a1
    a1 --> t1
    t1 --> c1

    classDef phase fill:#dbeafe,stroke:#2563eb`,
};

// =============================================================================
// ORGANISM LIFE CYCLES & TAXONOMY TEMPLATES
// =============================================================================

/**
 * Life Cycle template
 */
export const lifeCycleTemplate: DiagramTemplate = {
  id: 'bio-life-cycle',
  name: 'Organism Life Cycle',
  description:
    'Circular diagram showing stages of an organism life cycle including metamorphosis',
  domain: 'biology',
  promptTemplate: `Create a life cycle diagram:
- Organism type: {{organismType}}
- Life stages: {{lifeStages}}
- Metamorphosis type: {{metamorphosisType}}
- Duration of each stage: {{stageDuration}}
- Environmental factors: {{environmentalFactors}}
- Reproductive strategy: {{reproductiveStrategy}}
- Key transformations: {{keyTransformations}}
{{#habitat}}Habitat requirements: {{habitat}}{{/habitat}}`,
  placeholders: [
    'organismType',
    'lifeStages',
    'metamorphosisType',
    'stageDuration',
    'environmentalFactors',
    'reproductiveStrategy',
    'keyTransformations',
    'habitat',
  ],
  mermaidExample: `flowchart TB
    subgraph lifecycle["Complete Metamorphosis"]
        egg["Egg<br/>(1-2 weeks)"]
        larva["Larva/Caterpillar<br/>(2-4 weeks)"]
        pupa["Pupa/Chrysalis<br/>(1-2 weeks)"]
        adult["Adult Butterfly<br/>(2-4 weeks)"]
    end

    egg -->|"Hatching"| larva
    larva -->|"Molts 4-5x"| pupa
    pupa -->|"Emergence"| adult
    adult -->|"Oviposition"| egg

    subgraph factors["Environmental Factors"]
        temp["Temperature"]
        light["Photoperiod"]
        food["Host Plant"]
    end

    factors -.-> lifecycle

    classDef early fill:#dcfce7,stroke:#16a34a
    classDef growth fill:#fef3c7,stroke:#d97706
    classDef transform fill:#f3e8ff,stroke:#9333ea
    classDef mature fill:#dbeafe,stroke:#2563eb

    class egg early
    class larva growth
    class pupa transform
    class adult mature`,
};

/**
 * Biome Classification template
 */
export const biomeClassification: DiagramTemplate = {
  id: 'bio-biome-classification',
  name: 'Biome Classification',
  description:
    'Diagram showing major biomes organized by climate factors',
  domain: 'biology',
  promptTemplate: `Create a biome classification diagram:
- Biomes to include: {{biomes}}
- Climate factors: {{climateFactors}}
- Temperature ranges: {{temperatureRanges}}
- Precipitation levels: {{precipitationLevels}}
- Characteristic vegetation: {{vegetation}}
- Representative animals: {{animals}}
- Geographic distribution: {{distribution}}
{{#humanImpact}}Human impact: {{humanImpact}}{{/humanImpact}}`,
  placeholders: [
    'biomes',
    'climateFactors',
    'temperatureRanges',
    'precipitationLevels',
    'vegetation',
    'animals',
    'distribution',
    'humanImpact',
  ],
  mermaidExample: `flowchart TB
    subgraph terrestrial["Terrestrial Biomes"]
        subgraph cold["Cold Biomes"]
            tundra["Tundra<br/>-34 to 12°C"]
            taiga["Taiga/Boreal<br/>-54 to 21°C"]
        end

        subgraph temperate["Temperate Biomes"]
            deciduous["Deciduous Forest<br/>-30 to 30°C"]
            grassland["Grassland<br/>-20 to 30°C"]
        end

        subgraph tropical["Tropical Biomes"]
            rainforest["Tropical Rainforest<br/>20 to 34°C"]
            savanna["Savanna<br/>20 to 30°C"]
        end

        subgraph arid["Arid Biomes"]
            desert["Desert<br/>-18 to 49°C"]
        end
    end

    subgraph aquatic["Aquatic Biomes"]
        marine["Marine"]
        freshwater["Freshwater"]
    end

    classDef cold fill:#e0f2fe,stroke:#0284c7
    classDef temp fill:#dcfce7,stroke:#16a34a
    classDef trop fill:#fef3c7,stroke:#d97706
    classDef arid fill:#fee2e2,stroke:#dc2626
    classDef water fill:#dbeafe,stroke:#2563eb

    class tundra,taiga cold
    class deciduous,grassland temp
    class rainforest,savanna trop
    class desert arid
    class marine,freshwater water`,
};

/**
 * Taxonomic Classification template
 */
export const taxonomicClassification: DiagramTemplate = {
  id: 'bio-taxonomy',
  name: 'Taxonomic Classification',
  description:
    'Hierarchical diagram showing taxonomic ranks from Kingdom to Species',
  domain: 'biology',
  promptTemplate: `Create a taxonomic classification diagram:
- Organism: {{organism}}
- Kingdom: {{kingdom}}
- Phylum/Division: {{phylum}}
- Class: {{class}}
- Order: {{order}}
- Family: {{family}}
- Genus: {{genus}}
- Species: {{species}}
- Key characteristics at each level: {{characteristics}}
{{#relatedSpecies}}Related species: {{relatedSpecies}}{{/relatedSpecies}}`,
  placeholders: [
    'organism',
    'kingdom',
    'phylum',
    'class',
    'order',
    'family',
    'genus',
    'species',
    'characteristics',
    'relatedSpecies',
  ],
  mermaidExample: `flowchart TB
    subgraph taxonomy["Taxonomic Hierarchy"]
        domain["Domain<br/>Eukarya"]
        kingdom["Kingdom<br/>Animalia"]
        phylum["Phylum<br/>Chordata"]
        class["Class<br/>Mammalia"]
        order["Order<br/>Primates"]
        family["Family<br/>Hominidae"]
        genus["Genus<br/><i>Homo</i>"]
        species["Species<br/><i>Homo sapiens</i>"]
    end

    domain --> kingdom
    kingdom --> phylum
    phylum --> class
    class --> order
    order --> family
    family --> genus
    genus --> species

    subgraph traits["Defining Characteristics"]
        t1["Eukaryotic cells"]
        t2["Multicellular, heterotroph"]
        t3["Notochord, dorsal nerve"]
        t4["Hair, mammary glands"]
        t5["Forward-facing eyes"]
        t6["Bipedal, large brain"]
    end

    kingdom -.-> t2
    phylum -.-> t3
    class -.-> t4
    order -.-> t5
    family -.-> t6

    classDef high fill:#f3e8ff,stroke:#9333ea
    classDef mid fill:#dbeafe,stroke:#2563eb
    classDef low fill:#dcfce7,stroke:#16a34a

    class domain,kingdom high
    class phylum,class,order mid
    class family,genus,species low`,
};

/**
 * Ecological Relationships template
 */
export const ecologicalRelationships: DiagramTemplate = {
  id: 'bio-ecological-relationships',
  name: 'Ecological Relationships',
  description:
    'Diagram showing symbiotic and other ecological relationships between species',
  domain: 'biology',
  promptTemplate: `Create an ecological relationships diagram:
- Relationship types: {{relationshipTypes}}
- Species involved: {{species}}
- Mutualistic examples: {{mutualismExamples}}
- Parasitic examples: {{parasitismExamples}}
- Commensal examples: {{commensalismExamples}}
- Predator-prey examples: {{predatorPreyExamples}}
- Competition examples: {{competitionExamples}}
- Benefits/costs for each species: {{benefitsCosts}}`,
  placeholders: [
    'relationshipTypes',
    'species',
    'mutualismExamples',
    'parasitismExamples',
    'commensalismExamples',
    'predatorPreyExamples',
    'competitionExamples',
    'benefitsCosts',
  ],
  mermaidExample: `flowchart TB
    subgraph mutualism["Mutualism (+/+)"]
        m1["Bee"] <-->|"Pollination"| m2["Flower"]
        m3["Clownfish"] <-->|"Protection"| m4["Sea Anemone"]
    end

    subgraph parasitism["Parasitism (+/-)"]
        p1["Tapeworm"] -->|"Nutrients"| p2["Host Animal"]
        p3["Tick"] -->|"Blood"| p4["Mammal"]
    end

    subgraph commensalism["Commensalism (+/0)"]
        c1["Barnacle"] -->|"Transport"| c2["Whale"]
        c3["Remora"] -->|"Food scraps"| c4["Shark"]
    end

    subgraph predation["Predation (+/-)"]
        pr1["Lion"] -->|"Consumption"| pr2["Zebra"]
    end

    subgraph competition["Competition (-/-)"]
        co1["Species A"] <-.->|"Same niche"| co2["Species B"]
    end

    classDef positive fill:#dcfce7,stroke:#16a34a
    classDef negative fill:#fee2e2,stroke:#dc2626
    classDef neutral fill:#f3f4f6,stroke:#6b7280

    class m1,m2,m3,m4 positive
    class p1,pr1 positive
    class p2,p4,pr2 negative`,
};

/**
 * Geological Time Scale / Evolution Timeline template
 */
export const geologicalTimeScale: DiagramTemplate = {
  id: 'bio-geological-time',
  name: 'Geological Time Scale',
  description:
    'Timeline showing major eras, periods, and evolutionary events',
  domain: 'biology',
  promptTemplate: `Create a geological time scale diagram:
- Time range: {{timeRange}}
- Eras to include: {{eras}}
- Periods to highlight: {{periods}}
- Major extinction events: {{extinctionEvents}}
- Key evolutionary milestones: {{evolutionaryMilestones}}
- First appearances of major groups: {{firstAppearances}}
- Time markers (mya): {{timeMarkers}}
{{#climateEvents}}Climate events: {{climateEvents}}{{/climateEvents}}`,
  placeholders: [
    'timeRange',
    'eras',
    'periods',
    'extinctionEvents',
    'evolutionaryMilestones',
    'firstAppearances',
    'timeMarkers',
    'climateEvents',
  ],
  mermaidExample: `flowchart LR
    subgraph precambrian["Precambrian (4600-541 mya)"]
        hadean["Hadean<br/>4600-4000"]
        archean["Archean<br/>4000-2500"]
        proterozoic["Proterozoic<br/>2500-541"]
    end

    subgraph paleozoic["Paleozoic (541-252 mya)"]
        cambrian["Cambrian<br/>541-485"]
        ordovician["Ordovician<br/>485-444"]
        silurian["Silurian<br/>444-419"]
        devonian["Devonian<br/>419-359"]
        carboniferous["Carboniferous<br/>359-299"]
        permian["Permian<br/>299-252"]
    end

    subgraph mesozoic["Mesozoic (252-66 mya)"]
        triassic["Triassic<br/>252-201"]
        jurassic["Jurassic<br/>201-145"]
        cretaceous["Cretaceous<br/>145-66"]
    end

    subgraph cenozoic["Cenozoic (66-0 mya)"]
        paleogene["Paleogene<br/>66-23"]
        neogene["Neogene<br/>23-2.6"]
        quaternary["Quaternary<br/>2.6-present"]
    end

    hadean --> archean --> proterozoic
    proterozoic -->|"Cambrian Explosion"| cambrian
    permian -->|"Great Dying (96%)"| triassic
    cretaceous -->|"K-Pg Extinction"| paleogene

    e1["First Life<br/>~3800 mya"] -.-> archean
    e2["First Animals<br/>~600 mya"] -.-> proterozoic
    e3["Fish<br/>~530 mya"] -.-> cambrian
    e4["Land Plants<br/>~470 mya"] -.-> ordovician
    e5["Dinosaurs<br/>~230 mya"] -.-> triassic
    e6["Mammals Rise<br/>~66 mya"] -.-> paleogene

    classDef ancient fill:#94a3b8,stroke:#475569
    classDef paleo fill:#dbeafe,stroke:#2563eb
    classDef meso fill:#dcfce7,stroke:#16a34a
    classDef ceno fill:#fef3c7,stroke:#d97706
    classDef extinction fill:#fee2e2,stroke:#dc2626

    class hadean,archean,proterozoic ancient
    class cambrian,ordovician,silurian,devonian,carboniferous,permian paleo
    class triassic,jurassic,cretaceous meso
    class paleogene,neogene,quaternary ceno`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All biology templates exported as an array
 *
 * Ralph Loop Iteration 2 - COMPLETE checkpoint
 * Expanded from 21 to 26 templates
 */
export const biologyTemplates: DiagramTemplate[] = [
  // Cellular & Molecular
  cellSignalingPathway,
  metabolicPathway,
  geneExpression,
  proteinStructure,
  cellCycle,
  // Evolution & Phylogenetics
  phylogeneticTree,
  cladogram,
  naturalSelectionProcess,
  geologicalTimeScale,
  // Ecology
  foodWeb,
  ecosystemEnergyFlow,
  biogeochemicalCycle,
  populationDynamics,
  biomeClassification,
  ecologicalRelationships,
  // Genetics
  mendelianInheritance,
  dnaReplicationMechanism,
  transcriptionProcess,
  translationProcess,
  // Plant Biology
  lightDarkReactions,
  plantVascularSystem,
  // Cell Structure
  animalCellStructure,
  plantCellStructure,
  mitosisStages,
  // Organism & Taxonomy
  lifeCycleTemplate,
  taxonomicClassification,
];

export default biologyTemplates;
