/**
 * microbiology-prompts.ts
 * Microbiology-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for microbiology including:
 * - Bacterial identification and classification
 * - Staining techniques and interpretation
 * - Culture methods and media selection
 * - Viral structure and replication
 * - Fungal identification
 * - Parasitology
 * - Molecular techniques (PCR, ELISA)
 * - Antimicrobial susceptibility
 * - Biofilm formation
 * - Sterilization and disinfection
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// MICROBIOLOGY DOMAIN PROMPT
// =============================================================================

/**
 * Base microbiology domain prompt for laboratory and research diagrams
 */
export const MICROBIOLOGY_DOMAIN_PROMPT = `
Microbiology diagram requirements:
- Use proper taxonomic nomenclature (italicize genus and species)
- Follow CLSI guidelines for susceptibility testing
- Include Gram stain results and morphology descriptions
- Reference standard culture conditions (temperature, atmosphere)
- Use appropriate biosafety level indicators (BSL-1 to BSL-4)
- Include colony morphology characteristics when relevant
- Reference American Society for Microbiology (ASM) standards
- Use color coding: Purple for Gram positive, Pink for Gram negative
- Include scale bars and magnification for microscopy images
- Reference CDC/WHO guidelines for pathogen classification`;

// =============================================================================
// MICROBIOLOGY-SPECIFIC PROMPTS
// =============================================================================

export const MICROBIOLOGY_PROMPTS = {
  // Bacterial Identification
  bacterialIdentification: `
Bacterial Identification Algorithm requirements:
- Start with Gram stain and morphology
- Include catalase and oxidase tests
- Reference coagulase testing for Staphylococci
- Show biochemical test pathways (IMViC, TSI)
- Include hemolysis patterns (alpha, beta, gamma)
- Reference MALDI-TOF as rapid identification
- Include 16S rRNA sequencing for definitive ID`,

  gramStainInterpretation: `
Gram Stain Interpretation requirements:
- Show crystal violet and iodine fixation
- Include decolorization step timing
- Reference safranin counterstain
- Show cell wall structure comparison
- Include common Gram-positive organisms
- Include common Gram-negative organisms
- Reference Gram-variable organisms (Mycobacteria)`,

  bacterialMorphology: `
Bacterial Morphology Classification requirements:
- Include coccal arrangements (clusters, chains, pairs)
- Show bacillary forms (rods, coccobacilli)
- Reference spiral forms (spirilla, spirochetes, vibrios)
- Include pleomorphic organisms
- Show spore formation and locations (terminal, central)
- Reference cell size comparisons
- Include flagella arrangement patterns`,

  // Culture Techniques
  cultureTechniques: `
Culture Technique Selection requirements:
- Show primary isolation media choices
- Include enrichment vs selective media
- Reference differential media interpretation
- Include aerobic vs anaerobic culture conditions
- Show temperature requirements (35-37C standard)
- Reference fastidious organism requirements
- Include culture duration guidelines`,

  mediaSelection: `
Culture Media Selection requirements:
- Include blood agar (BAP) for general isolation
- Show MacConkey for Gram-negative selection
- Reference chocolate agar for fastidious organisms
- Include anaerobic media (KVLB, BBE)
- Show chromogenic media for rapid ID
- Reference enrichment broths (thioglycollate)
- Include specialized media (Lowenstein-Jensen for TB)`,

  colonyMorphology: `
Colony Morphology Description requirements:
- Include size (pinpoint to large)
- Show pigmentation patterns
- Reference hemolysis patterns on blood agar
- Include texture (smooth, rough, mucoid)
- Show elevation (flat, raised, convex)
- Reference margin characteristics (entire, undulate)
- Include odor when distinctive`,

  // Staining Techniques
  specialStains: `
Special Staining Techniques requirements:
- Include acid-fast staining (Ziehl-Neelsen, Kinyoun)
- Show endospore staining (Schaeffer-Fulton)
- Reference capsule staining (India ink, nigrosin)
- Include flagella staining
- Show metachromatic granules (Albert stain)
- Reference fluorescent stains (acridine orange)
- Include Giemsa for intracellular organisms`,

  // Virology
  viralClassification: `
Viral Classification Diagram requirements:
- Include Baltimore classification (I-VII)
- Show genome types (DNA/RNA, ss/ds, +/-)
- Reference capsid symmetry (icosahedral, helical)
- Include envelope presence/absence
- Show size comparisons
- Reference host range specificity
- Include clinical disease associations`,

  viralReplication: `
Viral Replication Cycle requirements:
- Include attachment and receptor binding
- Show entry mechanisms (fusion, endocytosis)
- Reference uncoating process
- Include genome replication strategies
- Show assembly and maturation
- Reference release mechanisms (lysis, budding)
- Include latency establishment for relevant viruses`,

  // Mycology
  fungalIdentification: `
Fungal Identification Algorithm requirements:
- Include macroscopic colony examination
- Show microscopic mount preparation (LPCB)
- Reference yeast vs mold differentiation
- Include dimorphic fungal considerations
- Show conidial morphology and arrangement
- Reference germ tube test for Candida albicans
- Include MALDI-TOF and sequencing`,

  antifungalSusceptibility: `
Antifungal Susceptibility Testing requirements:
- Include CLSI broth microdilution method
- Show Etest methodology
- Reference MIC breakpoint interpretation
- Include intrinsic resistance patterns
- Show azole resistance mechanisms
- Reference echinocandin resistance (FKS mutations)
- Include disk diffusion for yeasts`,

  // Parasitology
  parasiteIdentification: `
Parasite Identification requirements:
- Include stool examination techniques (O&P)
- Show concentration methods (formalin-ethyl acetate)
- Reference permanent stains (trichrome, iron hematoxylin)
- Include size measurements with micrometer
- Show life cycle stages identification
- Reference blood smear examination (thick and thin)
- Include molecular detection methods`,

  // Molecular Techniques
  pcrDiagnostics: `
PCR Diagnostic Workflow requirements:
- Include specimen collection and processing
- Show DNA/RNA extraction methods
- Reference primer design considerations
- Include thermal cycling parameters
- Show gel electrophoresis interpretation
- Reference real-time PCR (qPCR) quantification
- Include contamination prevention measures`,

  elisaWorkflow: `
ELISA Workflow requirements:
- Include ELISA format types (direct, indirect, sandwich)
- Show plate coating and blocking
- Reference washing step importance
- Include conjugate selection
- Show substrate reaction and color development
- Reference cut-off value determination
- Include quality control measures`,

  // Antimicrobial Testing
  susceptibilityTesting: `
Antimicrobial Susceptibility Testing requirements:
- Include disk diffusion (Kirby-Bauer) method
- Show broth microdilution for MIC
- Reference Etest methodology
- Include zone diameter interpretation
- Show CLSI breakpoint categories (S/I/R)
- Reference automated systems (VITEK, Phoenix)
- Include quality control strains`,

  resistanceMechanisms: `
Antimicrobial Resistance Mechanisms requirements:
- Include enzymatic inactivation (beta-lactamases)
- Show target site modification
- Reference efflux pump mechanisms
- Include reduced permeability (porins)
- Show horizontal gene transfer methods
- Reference biofilm-mediated resistance
- Include specific resistance genes (mecA, vanA, CTX-M)`,

  // Biofilms and Sterilization
  biofilmAnalysis: `
Biofilm Formation and Analysis requirements:
- Include stages of biofilm development
- Show EPS matrix composition
- Reference crystal violet quantification assay
- Include confocal microscopy visualization
- Show antimicrobial penetration challenges
- Reference quorum sensing involvement
- Include clinical biofilm implications`,

  sterilizationMethods: `
Sterilization Methods requirements:
- Include moist heat (autoclave: 121C, 15 psi, 15 min)
- Show dry heat sterilization parameters
- Reference chemical sterilization (EtO, H2O2 plasma)
- Include filtration for heat-labile solutions
- Show radiation sterilization (gamma, UV)
- Reference biological indicators for validation
- Include sterilization monitoring methods`,

  // Quality Control
  laboratoryQC: `
Microbiology Laboratory QC requirements:
- Include media QC with reference strains
- Show equipment calibration schedules
- Reference proficiency testing programs
- Include control organism selection (ATCC strains)
- Show Levey-Jennings charts for trending
- Reference corrective action protocols
- Include documentation requirements`,

  biosafety: `
Biosafety and Containment requirements:
- Include BSL classification criteria (1-4)
- Show PPE requirements by level
- Reference primary containment (BSC types)
- Include secondary containment features
- Show decontamination procedures
- Reference spill response protocols
- Include risk assessment process`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Microbiology-specific few-shot examples
 */
export const MICROBIOLOGY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a bacterial identification flowchart starting from Gram stain',
    output: `flowchart TD
    A[("Unknown\\nOrganism")] --> B["Gram Stain"]

    B -->|"Purple"| C["Gram Positive"]
    B -->|"Pink"| D["Gram Negative"]

    C --> E{"Shape?"}
    E -->|"Cocci"| F{"Catalase?"}
    E -->|"Bacilli"| G{"Spore\\nForming?"}

    F -->|"+"| H["Staphylococcus"]
    F -->|"-"| I["Streptococcus/\\nEnterococcus"]

    H --> J{"Coagulase?"}
    J -->|"+"| K["S. aureus"]
    J -->|"-"| L["CoNS"]

    I --> M{"Hemolysis?"}
    M -->|"Beta"| N["Group A/B Strep"]
    M -->|"Alpha"| O["S. pneumoniae/\\nViridans"]
    M -->|"Gamma"| P["Enterococcus"]

    G -->|"Yes"| Q["Bacillus/\\nClostridium"]
    G -->|"No"| R["Listeria/\\nCorynebacterium"]

    D --> S{"Shape?"}
    S -->|"Cocci"| T["Neisseria/\\nMoraxella"]
    S -->|"Bacilli"| U{"Lactose\\nFermenter?"}

    U -->|"+"| V["E. coli/\\nKlebsiella"]
    U -->|"-"| W["Pseudomonas/\\nSalmonella"]

    style C fill:#9333EA,color:#fff
    style D fill:#EC4899,color:#fff
    style K fill:#DC143C,color:#fff`,
  },
  {
    prompt: 'Create a PCR workflow diagram for pathogen detection',
    output: `flowchart TD
    A["Clinical Specimen"] --> B["DNA/RNA Extraction"]

    B --> C["Quality Check\\n(A260/280 ratio)"]
    C --> D["PCR Master Mix\\nPreparation"]

    subgraph Mix["Master Mix Components"]
        D --> D1["Buffer"]
        D --> D2["dNTPs"]
        D --> D3["Primers (F+R)"]
        D --> D4["Taq Polymerase"]
        D --> D5["Template DNA"]
    end

    D --> E["Thermal Cycling"]

    subgraph Cycling["PCR Cycles (25-40x)"]
        E --> E1["Denaturation\\n94-98C, 30s"]
        E1 --> E2["Annealing\\n50-65C, 30s"]
        E2 --> E3["Extension\\n72C, 1min/kb"]
        E3 --> E1
    end

    E --> F["Final Extension\\n72C, 10min"]
    F --> G["Gel Electrophoresis"]

    G --> H{"Band at\\nExpected Size?"}
    H -->|"Yes"| I["Positive"]
    H -->|"No"| J["Negative"]

    I --> K["Sequencing\\nConfirmation"]

    style I fill:#22C55E,color:#fff
    style J fill:#EF4444,color:#fff
    style E fill:#3B82F6,color:#fff`,
  },
  {
    prompt: 'Create a viral replication cycle diagram',
    output: `flowchart TD
    A["Free Virion"] --> B["1. Attachment"]
    B --> C["Receptor Binding\\n(Specific Host)"]

    C --> D["2. Entry"]
    D --> D1["Membrane Fusion"]
    D --> D2["Endocytosis"]

    D1 & D2 --> E["3. Uncoating"]
    E --> F["Genome Release\\nto Cytoplasm"]

    F --> G["4. Replication"]

    subgraph Replication["Genome Strategy"]
        G --> G1["DNA Viruses:\\nNucleus"]
        G --> G2["RNA Viruses:\\nCytoplasm"]
        G --> G3["Retroviruses:\\nReverse Transcription"]
    end

    G --> H["5. Protein\\nSynthesis"]
    H --> I["Structural\\nProteins"]
    H --> J["Non-structural\\nProteins"]

    I & J --> K["6. Assembly"]
    K --> L["Nucleocapsid\\nFormation"]

    L --> M["7. Release"]
    M --> M1["Lysis\\n(Non-enveloped)"]
    M --> M2["Budding\\n(Enveloped)"]

    M1 & M2 --> N["New Virions\\n(100-10,000/cell)"]

    style A fill:#8B5CF6,color:#fff
    style N fill:#8B5CF6,color:#fff
    style K fill:#F59E0B,color:#000`,
  },
  {
    prompt: 'Create an antibiotic susceptibility testing interpretation flowchart',
    output: `flowchart TD
    A["Isolated\\nOrganism"] --> B["Select Method"]

    B --> C["Disk Diffusion\\n(Kirby-Bauer)"]
    B --> D["Broth Microdilution\\n(MIC)"]
    B --> E["Automated\\n(VITEK/Phoenix)"]

    C --> F["Measure Zone\\nDiameters (mm)"]
    D --> G["Determine MIC\\n(ug/mL)"]
    E --> H["System\\nInterpretation"]

    F --> I["Compare to\\nCLSI Breakpoints"]
    G --> I
    H --> I

    I --> J{"Result?"}

    J -->|">= Susceptible"| K["SUSCEPTIBLE (S)"]
    J -->|"Between"| L["INTERMEDIATE (I)"]
    J -->|"<= Resistant"| M["RESISTANT (R)"]

    K --> N["Standard\\nDosing Effective"]
    L --> O["Higher Doses\\nMay Be Needed"]
    M --> P["Treatment\\nLikely to Fail"]

    subgraph QC["Quality Control"]
        Q["E. coli ATCC 25922"]
        R["S. aureus ATCC 25923"]
        S["P. aeruginosa ATCC 27853"]
    end

    style K fill:#22C55E,color:#fff
    style L fill:#F59E0B,color:#000
    style M fill:#EF4444,color:#fff`,
  },
  {
    prompt: 'Create a biofilm formation stages diagram',
    output: `flowchart LR
    subgraph Stage1["Stage 1: Initial Attachment"]
        A["Planktonic\\nBacteria"]
        B["Surface Contact\\n(Reversible)"]
    end

    subgraph Stage2["Stage 2: Irreversible Attachment"]
        C["Adhesin\\nProduction"]
        D["Flagella Loss"]
    end

    subgraph Stage3["Stage 3: Early Biofilm"]
        E["Microcolony\\nFormation"]
        F["EPS Production\\nBegins"]
    end

    subgraph Stage4["Stage 4: Mature Biofilm"]
        G["3D Architecture"]
        H["Water Channels"]
        I["Quorum Sensing\\nActive"]
    end

    subgraph Stage5["Stage 5: Dispersal"]
        J["Cell Release"]
        K["New Site\\nColonization"]
    end

    A --> B --> C --> D --> E --> F --> G --> H --> I --> J --> K
    K --> A

    subgraph Challenges["Clinical Challenges"]
        L["1000x Antibiotic\\nResistance"]
        M["Immune Evasion"]
        N["Chronic Infections"]
    end

    Stage4 --> Challenges

    style Stage4 fill:#DC143C,color:#fff
    style L fill:#991B1B,color:#fff`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

const microbiologyPrompts = {
  MICROBIOLOGY_DOMAIN_PROMPT,
  MICROBIOLOGY_PROMPTS,
  MICROBIOLOGY_FEW_SHOT_EXAMPLES,
};

export default microbiologyPrompts;
