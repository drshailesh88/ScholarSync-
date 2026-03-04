/**
 * microbiology.ts
 * Microbiology diagram templates for FINNISH
 *
 * Contains comprehensive templates for microbiology including:
 * - Bacterial structure and classification
 * - Viral structure and replication
 * - Fungal biology
 * - Laboratory techniques
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// BACTERIAL BIOLOGY
// =============================================================================

export const bacterialStructureTemplate: DiagramTemplate = {
  id: 'micro-bacterial-structure',
  name: 'Bacterial Cell Structure',
  description: 'Detailed bacterial cell anatomy diagram',
  domain: 'biology',
  promptTemplate: `Create a bacterial structure diagram showing:
- Cell shape: {{cellShape}}
- Cell wall type: {{cellWallType}}
- Membrane structures: {{membraneStructures}}
- Cytoplasmic components: {{cytoplasmicComponents}}
- External structures: {{externalStructures}}
- Genetic material: {{geneticMaterial}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['cellShape', 'cellWallType', 'membraneStructures', 'cytoplasmicComponents', 'externalStructures', 'geneticMaterial', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Cell["Bacterial Cell"]
        CW["Cell Wall"]
        PM["Plasma Membrane"]
        CY["Cytoplasm"]
        NU["Nucleoid"]
        RI["Ribosomes"]
        PL["Plasmids"]
    end
    FL["Flagella"] --> Cell
    PI["Pili"] --> Cell
    CA["Capsule"] --> CW`
};

export const gramStainTemplate: DiagramTemplate = {
  id: 'micro-gram-stain',
  name: 'Gram Stain Comparison',
  description: 'Comparison of Gram-positive and Gram-negative bacteria',
  domain: 'biology',
  promptTemplate: `Create a Gram stain comparison diagram showing:
- Staining procedure: {{stainingProcedure}}
- Gram-positive structure: {{gramPositive}}
- Gram-negative structure: {{gramNegative}}
- Color differences: {{colorDifferences}}
- Clinical significance: {{clinicalSignificance}}
- Example organisms: {{examples}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['stainingProcedure', 'gramPositive', 'gramNegative', 'colorDifferences', 'clinicalSignificance', 'examples', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph GramPos["Gram Positive"]
        A["Thick Peptidoglycan"]
        B["Teichoic Acids"]
        C["Purple Color"]
    end
    subgraph GramNeg["Gram Negative"]
        D["Thin Peptidoglycan"]
        E["Outer Membrane"]
        F["LPS"]
        G["Pink Color"]
    end`
};

export const bacterialGrowthTemplate: DiagramTemplate = {
  id: 'micro-bacterial-growth',
  name: 'Bacterial Growth Curve',
  description: 'Phases of bacterial population growth',
  domain: 'biology',
  promptTemplate: `Create a bacterial growth curve showing:
- Lag phase: {{lagPhase}}
- Log phase: {{logPhase}}
- Stationary phase: {{stationaryPhase}}
- Death phase: {{deathPhase}}
- Growth conditions: {{growthConditions}}
- Generation time: {{generationTime}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['lagPhase', 'logPhase', 'stationaryPhase', 'deathPhase', 'growthConditions', 'generationTime', 'additionalNotes'],
  mermaidExample: `flowchart LR
    A["Lag Phase"] --> B["Log Phase"]
    B --> C["Stationary Phase"]
    C --> D["Death Phase"]
    E["Adaptation"] --> A
    F["Exponential Growth"] --> B
    G["Equilibrium"] --> C`
};

export const bacterialMetabolismTemplate: DiagramTemplate = {
  id: 'micro-bacterial-metabolism',
  name: 'Bacterial Metabolism Types',
  description: 'Classification of bacterial metabolic strategies',
  domain: 'biology',
  promptTemplate: `Create a bacterial metabolism diagram showing:
- Energy source: {{energySource}}
- Carbon source: {{carbonSource}}
- Electron acceptor: {{electronAcceptor}}
- Metabolic type: {{metabolicType}}
- Key pathways: {{keyPathways}}
- Examples: {{examples}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['energySource', 'carbonSource', 'electronAcceptor', 'metabolicType', 'keyPathways', 'examples', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Energy["Energy Source"]
        A["Phototroph - Light"]
        B["Chemotroph - Chemical"]
    end
    subgraph Carbon["Carbon Source"]
        C["Autotroph - CO2"]
        D["Heterotroph - Organic"]
    end
    A & B --> E["Metabolism Type"]
    C & D --> E`
};

// =============================================================================
// VIRAL BIOLOGY
// =============================================================================

export const viralStructureTemplate: DiagramTemplate = {
  id: 'micro-viral-structure',
  name: 'Viral Structure',
  description: 'Viral particle architecture diagram',
  domain: 'biology',
  promptTemplate: `Create a viral structure diagram showing:
- Virus type: {{virusType}}
- Capsid structure: {{capsidStructure}}
- Genetic material: {{geneticMaterial}}
- Envelope: {{envelope}}
- Surface proteins: {{surfaceProteins}}
- Size comparison: {{sizeComparison}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['virusType', 'capsidStructure', 'geneticMaterial', 'envelope', 'surfaceProteins', 'sizeComparison', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Virus["Viral Particle"]
        E["Envelope"]
        SP["Spike Proteins"]
        C["Capsid"]
        G["Genome (DNA/RNA)"]
    end
    SP --> E --> C --> G`
};

export const lyticCycleTemplate: DiagramTemplate = {
  id: 'micro-lytic-cycle',
  name: 'Lytic Viral Cycle',
  description: 'Viral replication ending in cell lysis',
  domain: 'biology',
  promptTemplate: `Create a lytic cycle diagram showing:
- Attachment: {{attachment}}
- Entry/penetration: {{entry}}
- Replication: {{replication}}
- Assembly: {{assembly}}
- Release/lysis: {{release}}
- Timeline: {{timeline}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['attachment', 'entry', 'replication', 'assembly', 'release', 'timeline', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["1. Attachment"] --> B["2. Entry"]
    B --> C["3. Replication"]
    C --> D["4. Assembly"]
    D --> E["5. Lysis & Release"]
    E --> F["New Virions Infect"]`
};

export const lysogenicCycleTemplate: DiagramTemplate = {
  id: 'micro-lysogenic-cycle',
  name: 'Lysogenic Viral Cycle',
  description: 'Viral integration into host genome',
  domain: 'biology',
  promptTemplate: `Create a lysogenic cycle diagram showing:
- Viral integration: {{integration}}
- Prophage state: {{prophageState}}
- Cell division: {{cellDivision}}
- Induction triggers: {{inductionTriggers}}
- Switch to lytic: {{lyticSwitch}}
- Clinical relevance: {{clinicalRelevance}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['integration', 'prophageState', 'cellDivision', 'inductionTriggers', 'lyticSwitch', 'clinicalRelevance', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Viral DNA Entry"] --> B{"Integration?"}
    B -->|"Yes"| C["Prophage"]
    C --> D["Cell Division"]
    D --> E["Daughter Prophages"]
    B -->|"No"| F["Lytic Cycle"]
    C -->|"Induction"| F`
};

export const viralClassificationTemplate: DiagramTemplate = {
  id: 'micro-viral-classification',
  name: 'Viral Classification (Baltimore)',
  description: 'Baltimore classification system for viruses',
  domain: 'biology',
  promptTemplate: `Create a viral classification diagram showing:
- Classification system: {{classificationSystem}}
- Genome types: {{genomeTypes}}
- Replication strategies: {{replicationStrategies}}
- mRNA production: {{mrnaProduction}}
- Example viruses: {{exampleViruses}}
- Disease associations: {{diseases}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['classificationSystem', 'genomeTypes', 'replicationStrategies', 'mrnaProduction', 'exampleViruses', 'diseases', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Baltimore["Baltimore Classes"]
        I["I: dsDNA"]
        II["II: ssDNA"]
        III["III: dsRNA"]
        IV["IV: +ssRNA"]
        V["V: -ssRNA"]
        VI["VI: RNA-RT"]
        VII["VII: DNA-RT"]
    end
    ALL --> mRNA["mRNA Production"]`
};

// =============================================================================
// FUNGAL BIOLOGY
// =============================================================================

export const fungalStructureTemplate: DiagramTemplate = {
  id: 'micro-fungal-structure',
  name: 'Fungal Cell Structure',
  description: 'Fungal cell and hyphal anatomy',
  domain: 'biology',
  promptTemplate: `Create a fungal structure diagram showing:
- Cell wall composition: {{cellWall}}
- Membrane features: {{membrane}}
- Hyphal structure: {{hyphalStructure}}
- Septate vs coenocytic: {{septation}}
- Organelles: {{organelles}}
- Reproductive structures: {{reproductiveStructures}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['cellWall', 'membrane', 'hyphalStructure', 'septation', 'organelles', 'reproductiveStructures', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Fungal["Fungal Cell"]
        CW["Chitin Cell Wall"]
        PM["Plasma Membrane"]
        N["Nucleus"]
        V["Vacuole"]
        M["Mitochondria"]
    end
    H["Hypha"] --> S["Septate"]
    H --> C["Coenocytic"]`
};

export const fungalReproductionTemplate: DiagramTemplate = {
  id: 'micro-fungal-reproduction',
  name: 'Fungal Reproduction',
  description: 'Asexual and sexual fungal life cycles',
  domain: 'biology',
  promptTemplate: `Create a fungal reproduction diagram showing:
- Asexual reproduction: {{asexualReproduction}}
- Sexual reproduction: {{sexualReproduction}}
- Spore types: {{sporeTypes}}
- Fruiting body: {{fruitingBody}}
- Mating types: {{matingTypes}}
- Life cycle stage: {{lifeCycleStage}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['asexualReproduction', 'sexualReproduction', 'sporeTypes', 'fruitingBody', 'matingTypes', 'lifeCycleStage', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Asexual["Asexual"]
        A["Budding"]
        B["Fragmentation"]
        C["Conidiospores"]
    end
    subgraph Sexual["Sexual"]
        D["Plasmogamy"]
        E["Karyogamy"]
        F["Meiosis"]
    end
    D --> E --> F --> G["Spores"]`
};

// =============================================================================
// LABORATORY TECHNIQUES
// =============================================================================

export const asepticTechniqueTemplate: DiagramTemplate = {
  id: 'micro-aseptic-technique',
  name: 'Aseptic Technique',
  description: 'Sterile laboratory procedures',
  domain: 'biology',
  promptTemplate: `Create an aseptic technique diagram showing:
- Work area preparation: {{workAreaPrep}}
- Flame sterilization: {{flameSterilization}}
- Inoculating loop technique: {{loopTechnique}}
- Transfer procedure: {{transferProcedure}}
- Common errors: {{commonErrors}}
- Quality control: {{qualityControl}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['workAreaPrep', 'flameSterilization', 'loopTechnique', 'transferProcedure', 'commonErrors', 'qualityControl', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Prepare Work Area"] --> B["Flame Loop"]
    B --> C["Open Tube at Angle"]
    C --> D["Flame Tube Mouth"]
    D --> E["Collect/Deposit Sample"]
    E --> F["Flame Again"]
    F --> G["Incubate"]`
};

export const streakPlateTemplate: DiagramTemplate = {
  id: 'micro-streak-plate',
  name: 'Streak Plate Method',
  description: 'Isolation technique for pure cultures',
  domain: 'biology',
  promptTemplate: `Create a streak plate diagram showing:
- Plate preparation: {{platePreparation}}
- Quadrant streaking: {{quadrantStreaking}}
- Isolation pattern: {{isolationPattern}}
- Colony formation: {{colonyFormation}}
- Pure culture identification: {{pureCulture}}
- Troubleshooting: {{troubleshooting}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['platePreparation', 'quadrantStreaking', 'isolationPattern', 'colonyFormation', 'pureCulture', 'troubleshooting', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Plate["Streak Plate"]
        Q1["Quadrant 1: Heavy"]
        Q2["Quadrant 2: Medium"]
        Q3["Quadrant 3: Light"]
        Q4["Quadrant 4: Isolated"]
    end
    Q1 --> Q2 --> Q3 --> Q4
    Q4 --> IC["Isolated Colonies"]`
};

export const antibioticSensitivityTemplate: DiagramTemplate = {
  id: 'micro-antibiotic-sensitivity',
  name: 'Antibiotic Sensitivity Testing',
  description: 'Kirby-Bauer disk diffusion method',
  domain: 'biology',
  promptTemplate: `Create an antibiotic sensitivity test diagram showing:
- Plate inoculation: {{plateInoculation}}
- Disk placement: {{diskPlacement}}
- Zone of inhibition: {{zoneOfInhibition}}
- Interpretation criteria: {{interpretationCriteria}}
- Resistant vs sensitive: {{resistancePattern}}
- Clinical application: {{clinicalApplication}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['plateInoculation', 'diskPlacement', 'zoneOfInhibition', 'interpretationCriteria', 'resistancePattern', 'clinicalApplication', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Lawn Inoculation"] --> B["Place Antibiotic Disks"]
    B --> C["Incubate 18-24h"]
    C --> D["Measure Zone Diameter"]
    D --> E{"Compare to Standards"}
    E --> F["Sensitive"]
    E --> G["Intermediate"]
    E --> H["Resistant"]`
};

export const sterilizationMethodsTemplate: DiagramTemplate = {
  id: 'micro-sterilization',
  name: 'Sterilization Methods',
  description: 'Physical and chemical sterilization techniques',
  domain: 'biology',
  promptTemplate: `Create a sterilization methods diagram showing:
- Physical methods: {{physicalMethods}}
- Chemical methods: {{chemicalMethods}}
- Autoclave parameters: {{autoclaveParams}}
- Filtration: {{filtration}}
- Radiation: {{radiation}}
- Validation indicators: {{validationIndicators}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['physicalMethods', 'chemicalMethods', 'autoclaveParams', 'filtration', 'radiation', 'validationIndicators', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Physical["Physical Methods"]
        A["Autoclave 121C 15psi"]
        B["Dry Heat 160-180C"]
        C["Filtration 0.22um"]
    end
    subgraph Chemical["Chemical Methods"]
        D["Ethylene Oxide"]
        E["Formaldehyde"]
        F["Alcohol"]
    end`
};

export const microscopeTechniqueTemplate: DiagramTemplate = {
  id: 'micro-microscopy',
  name: 'Microscopy Techniques',
  description: 'Types of microscopy for microbial observation',
  domain: 'biology',
  promptTemplate: `Create a microscopy techniques diagram showing:
- Microscope types: {{microscopeTypes}}
- Resolution limits: {{resolutionLimits}}
- Staining methods: {{stainingMethods}}
- Sample preparation: {{samplePreparation}}
- Applications: {{applications}}
- Image examples: {{imageExamples}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['microscopeTypes', 'resolutionLimits', 'stainingMethods', 'samplePreparation', 'applications', 'imageExamples', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Types["Microscope Types"]
        A["Light Microscope"]
        B["Phase Contrast"]
        C["Fluorescence"]
        D["Electron (SEM/TEM)"]
    end
    A --> E["0.2um Resolution"]
    D --> F["0.2nm Resolution"]`
};

// =============================================================================
// INFECTIOUS DISEASE
// =============================================================================

export const pathogenesisTemplate: DiagramTemplate = {
  id: 'micro-pathogenesis',
  name: 'Microbial Pathogenesis',
  description: 'Steps of infection and disease development',
  domain: 'biology',
  promptTemplate: `Create a pathogenesis diagram showing:
- Pathogen entry: {{pathogenEntry}}
- Colonization: {{colonization}}
- Invasion: {{invasion}}
- Virulence factors: {{virulenceFactors}}
- Host response: {{hostResponse}}
- Disease outcome: {{diseaseOutcome}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['pathogenEntry', 'colonization', 'invasion', 'virulenceFactors', 'hostResponse', 'diseaseOutcome', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Entry"] --> B["Adherence"]
    B --> C["Colonization"]
    C --> D["Invasion"]
    D --> E["Toxin Production"]
    E --> F["Tissue Damage"]
    F --> G["Disease Symptoms"]`
};

export const antibioticMechanismTemplate: DiagramTemplate = {
  id: 'micro-antibiotic-mechanism',
  name: 'Antibiotic Mechanisms',
  description: 'Targets of antimicrobial drugs',
  domain: 'biology',
  promptTemplate: `Create an antibiotic mechanism diagram showing:
- Drug classes: {{drugClasses}}
- Cellular targets: {{cellularTargets}}
- Mechanism of action: {{mechanismOfAction}}
- Resistance mechanisms: {{resistanceMechanisms}}
- Spectrum of activity: {{spectrum}}
- Clinical use: {{clinicalUse}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['drugClasses', 'cellularTargets', 'mechanismOfAction', 'resistanceMechanisms', 'spectrum', 'clinicalUse', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Targets["Antibiotic Targets"]
        A["Cell Wall: Beta-lactams"]
        B["Protein Synthesis: Aminoglycosides"]
        C["DNA/RNA: Quinolones"]
        D["Membrane: Polymyxins"]
        E["Metabolic: Sulfonamides"]
    end`
};

// =============================================================================
// MOLECULAR TECHNIQUES
// =============================================================================

export const pcrWorkflowTemplate: DiagramTemplate = {
  id: 'micro-pcr-workflow',
  name: 'PCR Workflow',
  description: 'Polymerase chain reaction procedure and applications',
  domain: 'biology',
  promptTemplate: `Create a PCR workflow diagram showing:
- Sample preparation: {{samplePreparation}}
- Denaturation step: {{denaturation}}
- Annealing step: {{annealing}}
- Extension step: {{extension}}
- Cycle parameters: {{cycleParameters}}
- Detection method: {{detectionMethod}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['samplePreparation', 'denaturation', 'annealing', 'extension', 'cycleParameters', 'detectionMethod', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Cycle["PCR Cycle (25-40x)"]
        A["Denaturation 94-98°C"]
        B["Annealing 50-65°C"]
        C["Extension 72°C"]
    end
    D["Template DNA"] --> A
    A --> B --> C --> A
    C --> E["Amplified Product"]
    E --> F["Gel Electrophoresis"]`
};

export const elisaProcedureTemplate: DiagramTemplate = {
  id: 'micro-elisa-procedure',
  name: 'ELISA Procedure',
  description: 'Enzyme-linked immunosorbent assay workflow',
  domain: 'biology',
  promptTemplate: `Create an ELISA procedure diagram showing:
- ELISA type: {{elisaType}}
- Coating/capture: {{coating}}
- Blocking step: {{blocking}}
- Sample incubation: {{sampleIncubation}}
- Detection antibody: {{detectionAntibody}}
- Substrate reaction: {{substrateReaction}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['elisaType', 'coating', 'blocking', 'sampleIncubation', 'detectionAntibody', 'substrateReaction', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Coat Well with Capture Ab"] --> B["Block Non-specific Sites"]
    B --> C["Add Sample/Antigen"]
    C --> D["Add Detection Antibody"]
    D --> E["Add Enzyme Conjugate"]
    E --> F["Add Substrate"]
    F --> G["Color Development"]
    G --> H["Read Absorbance"]`
};

// =============================================================================
// BIOFILM & RESISTANCE
// =============================================================================

export const biofilmFormationTemplate: DiagramTemplate = {
  id: 'micro-biofilm-formation',
  name: 'Biofilm Formation',
  description: 'Stages of bacterial biofilm development',
  domain: 'biology',
  promptTemplate: `Create a biofilm formation diagram showing:
- Initial attachment: {{initialAttachment}}
- Irreversible attachment: {{irreversibleAttachment}}
- Maturation stages: {{maturationStages}}
- EPS matrix: {{epsMatrix}}
- Dispersal: {{dispersal}}
- Clinical significance: {{clinicalSignificance}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['initialAttachment', 'irreversibleAttachment', 'maturationStages', 'epsMatrix', 'dispersal', 'clinicalSignificance', 'additionalNotes'],
  mermaidExample: `flowchart LR
    A["1. Initial Attachment"] --> B["2. Irreversible Attachment"]
    B --> C["3. Microcolony Formation"]
    C --> D["4. Biofilm Maturation"]
    D --> E["5. Dispersal"]
    subgraph Matrix["EPS Matrix"]
        D
    end
    E --> F["Planktonic Cells"]
    F --> A`
};

export const antimicrobialResistanceTemplate: DiagramTemplate = {
  id: 'micro-amr-mechanism',
  name: 'Antimicrobial Resistance Mechanisms',
  description: 'Bacterial resistance strategies and mechanisms',
  domain: 'biology',
  promptTemplate: `Create an antimicrobial resistance diagram showing:
- Resistance type: {{resistanceType}}
- Target modification: {{targetModification}}
- Drug inactivation: {{drugInactivation}}
- Efflux pumps: {{effluxPumps}}
- Reduced permeability: {{reducedPermeability}}
- Horizontal gene transfer: {{horizontalGeneTransfer}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['resistanceType', 'targetModification', 'drugInactivation', 'effluxPumps', 'reducedPermeability', 'horizontalGeneTransfer', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Mechanisms["Resistance Mechanisms"]
        A["Target Modification"]
        B["Drug Inactivation (β-lactamase)"]
        C["Efflux Pumps"]
        D["Reduced Permeability"]
    end
    subgraph Transfer["Gene Transfer"]
        E["Conjugation"]
        F["Transformation"]
        G["Transduction"]
    end
    Transfer --> H["Resistance Spread"]`
};

// =============================================================================
// INFECTION & IMMUNITY
// =============================================================================

export const chainOfInfectionTemplate: DiagramTemplate = {
  id: 'micro-chain-infection',
  name: 'Chain of Infection',
  description: 'Links in disease transmission cycle',
  domain: 'biology',
  promptTemplate: `Create a chain of infection diagram showing:
- Infectious agent: {{infectiousAgent}}
- Reservoir: {{reservoir}}
- Portal of exit: {{portalOfExit}}
- Mode of transmission: {{modeOfTransmission}}
- Portal of entry: {{portalOfEntry}}
- Susceptible host: {{susceptibleHost}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['infectiousAgent', 'reservoir', 'portalOfExit', 'modeOfTransmission', 'portalOfEntry', 'susceptibleHost', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Infectious Agent"] --> B["Reservoir"]
    B --> C["Portal of Exit"]
    C --> D["Mode of Transmission"]
    D --> E["Portal of Entry"]
    E --> F["Susceptible Host"]
    F --> A
    style A fill:#ef4444
    style F fill:#3b82f6`
};

export const vaccineMechanismTemplate: DiagramTemplate = {
  id: 'micro-vaccine-mechanism',
  name: 'Vaccine Mechanism',
  description: 'How vaccines induce protective immunity',
  domain: 'biology',
  promptTemplate: `Create a vaccine mechanism diagram showing:
- Vaccine type: {{vaccineType}}
- Antigen presentation: {{antigenPresentation}}
- B cell response: {{bCellResponse}}
- T cell response: {{tCellResponse}}
- Memory formation: {{memoryFormation}}
- Protection outcome: {{protectionOutcome}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['vaccineType', 'antigenPresentation', 'bCellResponse', 'tCellResponse', 'memoryFormation', 'protectionOutcome', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Vaccine Administration"] --> B["Antigen Recognition"]
    B --> C["APC Processing"]
    C --> D["T Helper Activation"]
    D --> E["B Cell Activation"]
    E --> F["Antibody Production"]
    D --> G["CTL Activation"]
    F --> H["Memory B Cells"]
    G --> I["Memory T Cells"]
    H & I --> J["Long-term Protection"]`
};

// =============================================================================
// PARASITOLOGY
// =============================================================================

export const parasiticLifeCycleTemplate: DiagramTemplate = {
  id: 'micro-parasitic-lifecycle',
  name: 'Parasitic Life Cycle',
  description: 'Complex life cycles of parasitic organisms',
  domain: 'biology',
  promptTemplate: `Create a parasitic life cycle diagram showing:
- Parasite species: {{parasiteSpecies}}
- Definitive host: {{definitiveHost}}
- Intermediate host: {{intermediateHost}}
- Life stages: {{lifeStages}}
- Transmission route: {{transmissionRoute}}
- Geographic distribution: {{geographicDistribution}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['parasiteSpecies', 'definitiveHost', 'intermediateHost', 'lifeStages', 'transmissionRoute', 'geographicDistribution', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Definitive["Definitive Host (Human)"]
        A["Adult Worm"]
        B["Eggs Released"]
    end
    subgraph Environment["Environment"]
        C["Egg Development"]
        D["Larval Stage"]
    end
    subgraph Intermediate["Intermediate Host"]
        E["Larval Development"]
        F["Infective Stage"]
    end
    A --> B --> C --> D --> E --> F
    F --> A`
};

// =============================================================================
// MICROBIOME
// =============================================================================

export const microbiomeDysbiosisTemplate: DiagramTemplate = {
  id: 'micro-microbiome-dysbiosis',
  name: 'Microbiome & Dysbiosis',
  description: 'Normal microbiome vs dysbiosis states',
  domain: 'biology',
  promptTemplate: `Create a microbiome/dysbiosis diagram showing:
- Body site: {{bodySite}}
- Normal flora composition: {{normalFlora}}
- Dysbiosis triggers: {{dysbiosisTriggers}}
- Altered composition: {{alteredComposition}}
- Health consequences: {{healthConsequences}}
- Restoration strategies: {{restorationStrategies}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['bodySite', 'normalFlora', 'dysbiosisTriggers', 'alteredComposition', 'healthConsequences', 'restorationStrategies', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Healthy["Healthy Microbiome"]
        A["Diverse Community"]
        B["Beneficial Species"]
        C["Immune Homeostasis"]
    end
    subgraph Triggers["Dysbiosis Triggers"]
        D["Antibiotics"]
        E["Diet Changes"]
        F["Stress"]
    end
    subgraph Dysbiosis["Dysbiosis State"]
        G["Reduced Diversity"]
        H["Pathogen Overgrowth"]
        I["Inflammation"]
    end
    Healthy --> Triggers --> Dysbiosis
    J["Probiotics/Diet"] --> Healthy`
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

export const microbiologyTemplates: DiagramTemplate[] = [
  // Bacterial biology
  bacterialStructureTemplate,
  gramStainTemplate,
  bacterialGrowthTemplate,
  bacterialMetabolismTemplate,
  // Viral biology
  viralStructureTemplate,
  lyticCycleTemplate,
  lysogenicCycleTemplate,
  viralClassificationTemplate,
  // Fungal biology
  fungalStructureTemplate,
  fungalReproductionTemplate,
  // Laboratory techniques
  asepticTechniqueTemplate,
  streakPlateTemplate,
  antibioticSensitivityTemplate,
  sterilizationMethodsTemplate,
  microscopeTechniqueTemplate,
  // Infectious disease
  pathogenesisTemplate,
  antibioticMechanismTemplate,
  // Molecular techniques
  pcrWorkflowTemplate,
  elisaProcedureTemplate,
  // Biofilm & resistance
  biofilmFormationTemplate,
  antimicrobialResistanceTemplate,
  // Infection & immunity
  chainOfInfectionTemplate,
  vaccineMechanismTemplate,
  // Parasitology
  parasiticLifeCycleTemplate,
  // Microbiome
  microbiomeDysbiosisTemplate,
];

export default microbiologyTemplates;
