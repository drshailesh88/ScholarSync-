/**
 * molecular.ts
 * Molecular Biology diagram templates for FINNISH
 *
 * Contains comprehensive templates for molecular biology including:
 * - DNA/RNA processes
 * - Protein synthesis and structure
 * - Gene expression and regulation
 * - Laboratory techniques
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// DNA & RNA PROCESSES
// =============================================================================

export const dnaReplicationTemplate: DiagramTemplate = {
  id: 'mol-dna-replication',
  name: 'DNA Replication Diagram',
  description: 'Detailed diagram showing the DNA replication fork with all key enzymes and processes',
  domain: 'biology',
  promptTemplate: `Create a DNA replication diagram showing:
- Replication fork direction: {{forkDirection}}
- Leading strand synthesis: {{leadingStrand}}
- Lagging strand with Okazaki fragments: {{laggingStrand}}
- Key enzymes: {{enzymes}}
- Primer placement: {{primers}}
- 5' to 3' directionality: {{directionality}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['forkDirection', 'leadingStrand', 'laggingStrand', 'enzymes', 'primers', 'directionality', 'additionalNotes'],
  mermaidExample: `flowchart LR
    subgraph Fork["Replication Fork"]
        A["Helicase"] --> B["SSB Proteins"]
        B --> C["Leading Strand"]
        B --> D["Lagging Strand"]
    end
    subgraph Leading["Continuous"]
        C --> E["DNA Pol III"]
    end
    subgraph Lagging["Discontinuous"]
        D --> F["Primase"]
        F --> G["Okazaki Fragments"]
        G --> H["DNA Ligase"]
    end`
};

export const transcriptionTemplate: DiagramTemplate = {
  id: 'mol-transcription',
  name: 'Transcription Process',
  description: 'Diagram showing transcription from DNA to mRNA with all stages',
  domain: 'biology',
  promptTemplate: `Create a transcription diagram showing:
- Promoter region: {{promoter}}
- RNA polymerase binding: {{rnaPolBinding}}
- Template vs coding strand: {{strands}}
- Elongation process: {{elongation}}
- Termination signals: {{termination}}
- mRNA processing: {{processing}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['promoter', 'rnaPolBinding', 'strands', 'elongation', 'termination', 'processing', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Init["Initiation"]
        A["Promoter -35, -10"] --> B["RNAP Binding"]
        B --> C["Open Complex"]
    end
    subgraph Elong["Elongation"]
        C --> D["5' to 3' Synthesis"]
        D --> E["mRNA Chain"]
    end
    subgraph Term["Termination"]
        E --> F["Terminator Sequence"]
        F --> G["Release"]
    end`
};

export const translationTemplate: DiagramTemplate = {
  id: 'mol-translation',
  name: 'Translation Process',
  description: 'Protein synthesis on ribosomes from mRNA to polypeptide',
  domain: 'biology',
  promptTemplate: `Create a translation diagram showing:
- Ribosome structure: {{ribosomeStructure}}
- mRNA with codons: {{mrnaSequence}}
- tRNA with anticodons: {{trnaStructure}}
- A, P, E sites: {{ribosomeSites}}
- Peptide bond formation: {{peptideBond}}
- Elongation cycle: {{elongation}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['ribosomeStructure', 'mrnaSequence', 'trnaStructure', 'ribosomeSites', 'peptideBond', 'elongation', 'additionalNotes'],
  mermaidExample: `flowchart LR
    subgraph Ribosome["Ribosome"]
        E["E Site"] --> P["P Site"] --> A["A Site"]
    end
    mRNA["mRNA 5'...AUG-UUU-GGC...3'"] --> Ribosome
    tRNA["tRNA-AA"] --> A
    P --> Peptide["Growing Polypeptide"]`
};

export const splicingTemplate: DiagramTemplate = {
  id: 'mol-rna-splicing',
  name: 'RNA Splicing Diagram',
  description: 'Pre-mRNA processing showing intron removal and exon joining',
  domain: 'biology',
  promptTemplate: `Create an RNA splicing diagram showing:
- Pre-mRNA structure: {{preMrna}}
- Exons and introns: {{exonsIntrons}}
- Spliceosome assembly: {{spliceosome}}
- Branch point: {{branchPoint}}
- Lariat formation: {{lariat}}
- Mature mRNA: {{matureMrna}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['preMrna', 'exonsIntrons', 'spliceosome', 'branchPoint', 'lariat', 'matureMrna', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Pre-mRNA: E1-I1-E2-I2-E3"] --> B["Spliceosome Assembly"]
    B --> C["Branch Point Attack"]
    C --> D["Lariat Formation"]
    D --> E["Exon Ligation"]
    E --> F["Mature mRNA: E1-E2-E3"]`
};

// =============================================================================
// PROTEIN STRUCTURE
// =============================================================================

export const proteinStructureTemplate: DiagramTemplate = {
  id: 'mol-protein-structure',
  name: 'Protein Structure Levels',
  description: 'Four levels of protein structure from primary to quaternary',
  domain: 'biology',
  promptTemplate: `Create a protein structure diagram showing:
- Primary structure: {{primaryStructure}}
- Secondary structures: {{secondaryStructure}}
- Tertiary folding: {{tertiaryStructure}}
- Quaternary assembly: {{quaternaryStructure}}
- Stabilizing forces: {{stabilizingForces}}
- Example protein: {{exampleProtein}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['primaryStructure', 'secondaryStructure', 'tertiaryStructure', 'quaternaryStructure', 'stabilizingForces', 'exampleProtein', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Primary: AA Sequence"] --> B["Secondary: Alpha Helix, Beta Sheet"]
    B --> C["Tertiary: 3D Folding"]
    C --> D["Quaternary: Multiple Subunits"]
    style A fill:#FF6B6B
    style B fill:#4ECDC4
    style C fill:#45B7D1
    style D fill:#96CEB4`
};

export const enzymeMechanismTemplate: DiagramTemplate = {
  id: 'mol-enzyme-mechanism',
  name: 'Enzyme Mechanism Diagram',
  description: 'Enzyme catalysis showing substrate binding and product release',
  domain: 'biology',
  promptTemplate: `Create an enzyme mechanism diagram showing:
- Enzyme structure: {{enzymeStructure}}
- Active site: {{activeSite}}
- Substrate binding: {{substrateBinding}}
- Transition state: {{transitionState}}
- Product release: {{productRelease}}
- Kinetics (Km, Vmax): {{kinetics}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['enzymeStructure', 'activeSite', 'substrateBinding', 'transitionState', 'productRelease', 'kinetics', 'additionalNotes'],
  mermaidExample: `flowchart LR
    E["E (Enzyme)"] --> ES["E-S Complex"]
    S["S (Substrate)"] --> ES
    ES --> EP["E-P Complex"]
    EP --> E
    EP --> P["P (Product)"]`
};

// =============================================================================
// GENE EXPRESSION & REGULATION
// =============================================================================

export const operonTemplate: DiagramTemplate = {
  id: 'mol-operon-regulation',
  name: 'Operon Regulation Diagram',
  description: 'Bacterial gene regulation showing operon structure and control',
  domain: 'biology',
  promptTemplate: `Create an operon regulation diagram showing:
- Operon type: {{operonType}}
- Promoter and operator: {{promoterOperator}}
- Structural genes: {{structuralGenes}}
- Repressor protein: {{repressor}}
- Inducer/corepressor: {{regulator}}
- Expression states: {{expressionStates}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['operonType', 'promoterOperator', 'structuralGenes', 'repressor', 'regulator', 'expressionStates', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph LacOperon["Lac Operon"]
        P["Promoter"] --> O["Operator"]
        O --> Z["lacZ"]
        Z --> Y["lacY"]
        Y --> A["lacA"]
    end
    R["Repressor"] -->|"No Lactose"| O
    L["Lactose"] -->|"Binds"| R
    style O fill:#FF6B6B`
};

export const crisprTemplate: DiagramTemplate = {
  id: 'mol-crispr-mechanism',
  name: 'CRISPR-Cas9 Mechanism',
  description: 'Gene editing mechanism showing guide RNA and DNA cleavage',
  domain: 'biology',
  promptTemplate: `Create a CRISPR-Cas9 diagram showing:
- Guide RNA design: {{guideRna}}
- PAM sequence: {{pamSequence}}
- Cas9 protein: {{cas9Structure}}
- DNA target: {{dnaTarget}}
- Double-strand break: {{dsBreak}}
- Repair pathways: {{repairPathways}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['guideRna', 'pamSequence', 'cas9Structure', 'dnaTarget', 'dsBreak', 'repairPathways', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["sgRNA + Cas9"] --> B["Target Recognition"]
    B --> C["PAM Binding (NGG)"]
    C --> D["DNA Unwinding"]
    D --> E["Double-Strand Break"]
    E --> F["NHEJ (Knockout)"]
    E --> G["HDR (Knock-in)"]`
};

export const epigeneticsTemplate: DiagramTemplate = {
  id: 'mol-epigenetics',
  name: 'Epigenetic Modifications',
  description: 'Diagram showing DNA methylation and histone modifications',
  domain: 'biology',
  promptTemplate: `Create an epigenetics diagram showing:
- DNA methylation: {{dnaMethylation}}
- Histone modifications: {{histoneModifications}}
- Chromatin states: {{chromatinStates}}
- Writers/erasers/readers: {{modifyingEnzymes}}
- Gene expression effects: {{expressionEffects}}
- Inheritance patterns: {{inheritance}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['dnaMethylation', 'histoneModifications', 'chromatinStates', 'modifyingEnzymes', 'expressionEffects', 'inheritance', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Active["Euchromatin"]
        A["H3K4me3"] --> B["Active Transcription"]
        C["Acetylation"] --> B
    end
    subgraph Inactive["Heterochromatin"]
        D["H3K27me3"] --> E["Silenced"]
        F["DNA Methylation"] --> E
    end`
};

// =============================================================================
// LABORATORY TECHNIQUES
// =============================================================================

export const pcrTemplate: DiagramTemplate = {
  id: 'mol-pcr-process',
  name: 'PCR Amplification',
  description: 'Polymerase chain reaction showing thermal cycling steps',
  domain: 'biology',
  promptTemplate: `Create a PCR diagram showing:
- Initial DNA template: {{template}}
- Primer design: {{primers}}
- Denaturation step: {{denaturation}}
- Annealing step: {{annealing}}
- Extension step: {{extension}}
- Amplification curve: {{amplification}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['template', 'primers', 'denaturation', 'annealing', 'extension', 'amplification', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["1. Denaturation 95C"] --> B["2. Annealing 55C"]
    B --> C["3. Extension 72C"]
    C --> D{"Cycle Complete?"}
    D -->|"No"| A
    D -->|"Yes"| E["2^n Copies"]`
};

export const gelElectrophoresisTemplate: DiagramTemplate = {
  id: 'mol-gel-electrophoresis',
  name: 'Gel Electrophoresis',
  description: 'DNA/protein separation by size using gel matrix',
  domain: 'biology',
  promptTemplate: `Create a gel electrophoresis diagram showing:
- Gel type: {{gelType}}
- Sample loading: {{sampleLoading}}
- Molecular weight ladder: {{ladder}}
- Band migration: {{bandMigration}}
- Detection method: {{detection}}
- Result interpretation: {{interpretation}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['gelType', 'sampleLoading', 'ladder', 'bandMigration', 'detection', 'interpretation', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Gel["Agarose Gel"]
        W1["Well 1: Ladder"]
        W2["Well 2: Sample A"]
        W3["Well 3: Sample B"]
    end
    A["(-) Cathode"] --> Gel
    Gel --> B["(+) Anode"]
    style A fill:#E74C3C
    style B fill:#27AE60`
};

export const westernBlotTemplate: DiagramTemplate = {
  id: 'mol-western-blot',
  name: 'Western Blot Protocol',
  description: 'Protein detection workflow from gel to membrane',
  domain: 'biology',
  promptTemplate: `Create a Western blot diagram showing:
- Sample preparation: {{samplePrep}}
- SDS-PAGE separation: {{sdsPage}}
- Transfer to membrane: {{transfer}}
- Blocking step: {{blocking}}
- Primary antibody: {{primaryAb}}
- Secondary antibody: {{secondaryAb}}
- Detection: {{detection}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['samplePrep', 'sdsPage', 'transfer', 'blocking', 'primaryAb', 'secondaryAb', 'detection', 'additionalNotes'],
  mermaidExample: `flowchart LR
    A["SDS-PAGE"] --> B["Transfer"]
    B --> C["Block"]
    C --> D["1 Ab"]
    D --> E["2 Ab-HRP"]
    E --> F["ECL Detection"]`
};

export const sequencingTemplate: DiagramTemplate = {
  id: 'mol-dna-sequencing',
  name: 'DNA Sequencing Methods',
  description: 'Comparison of Sanger and next-generation sequencing',
  domain: 'biology',
  promptTemplate: `Create a DNA sequencing diagram showing:
- Sequencing method: {{method}}
- Template preparation: {{templatePrep}}
- Sequencing chemistry: {{chemistry}}
- Signal detection: {{detection}}
- Data output: {{dataOutput}}
- Applications: {{applications}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['method', 'templatePrep', 'chemistry', 'detection', 'dataOutput', 'applications', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Sanger["Sanger Sequencing"]
        A["ddNTPs"] --> B["Chain Termination"]
        B --> C["Capillary Electrophoresis"]
    end
    subgraph NGS["Next-Gen Sequencing"]
        D["Library Prep"] --> E["Cluster Generation"]
        E --> F["Sequencing by Synthesis"]
    end`
};

export const cloningTemplate: DiagramTemplate = {
  id: 'mol-molecular-cloning',
  name: 'Molecular Cloning Workflow',
  description: 'Gene cloning from insert preparation to transformation',
  domain: 'biology',
  promptTemplate: `Create a molecular cloning diagram showing:
- Insert preparation: {{insertPrep}}
- Vector selection: {{vector}}
- Restriction digestion: {{restriction}}
- Ligation reaction: {{ligation}}
- Transformation: {{transformation}}
- Colony screening: {{screening}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['insertPrep', 'vector', 'restriction', 'ligation', 'transformation', 'screening', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["PCR Insert"] --> B["Digest"]
    C["Vector"] --> B
    B --> D["Ligate"]
    D --> E["Transform E. coli"]
    E --> F["Select on Amp"]
    F --> G["Screen Colonies"]`
};

// =============================================================================
// CENTRAL DOGMA & PATHWAYS
// =============================================================================

export const centralDogmaTemplate: DiagramTemplate = {
  id: 'mol-central-dogma',
  name: 'Central Dogma of Biology',
  description: 'Flow of genetic information from DNA to RNA to protein',
  domain: 'biology',
  promptTemplate: `Create a central dogma diagram showing:
- DNA replication: {{replication}}
- Transcription: {{transcription}}
- Translation: {{translation}}
- Reverse transcription: {{reverseTranscription}}
- RNA replication: {{rnaReplication}}
- Exceptions: {{exceptions}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['replication', 'transcription', 'translation', 'reverseTranscription', 'rnaReplication', 'exceptions', 'additionalNotes'],
  mermaidExample: `flowchart LR
    DNA -->|"Replication"| DNA
    DNA -->|"Transcription"| RNA
    RNA -->|"Translation"| Protein
    RNA -.->|"Reverse Transcription"| DNA
    RNA -.->|"RNA Replication"| RNA`
};

export const signalTransductionTemplate: DiagramTemplate = {
  id: 'mol-signal-transduction',
  name: 'Signal Transduction Pathway',
  description: 'Cellular signaling cascade from receptor to gene expression',
  domain: 'biology',
  promptTemplate: `Create a signal transduction diagram showing:
- Ligand/receptor: {{ligandReceptor}}
- Second messengers: {{secondMessengers}}
- Kinase cascade: {{kinaseCascade}}
- Transcription factors: {{transcriptionFactors}}
- Target genes: {{targetGenes}}
- Feedback loops: {{feedback}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['ligandReceptor', 'secondMessengers', 'kinaseCascade', 'transcriptionFactors', 'targetGenes', 'feedback', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Growth Factor"] --> B["RTK"]
    B --> C["Ras-GTP"]
    C --> D["RAF"]
    D --> E["MEK"]
    E --> F["ERK"]
    F --> G["Transcription Factors"]
    G --> H["Gene Expression"]`
};

export const cellCycleRegulationTemplate: DiagramTemplate = {
  id: 'mol-cell-cycle-regulation',
  name: 'Cell Cycle Regulation',
  description: 'Molecular control of cell cycle by cyclins and CDKs',
  domain: 'biology',
  promptTemplate: `Create a cell cycle regulation diagram showing:
- Cell cycle phases: {{phases}}
- Cyclin-CDK complexes: {{cyclinCdk}}
- Checkpoints: {{checkpoints}}
- Tumor suppressors: {{tumorSuppressors}}
- Oncogenes: {{oncogenes}}
- Apoptosis triggers: {{apoptosis}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['phases', 'cyclinCdk', 'checkpoints', 'tumorSuppressors', 'oncogenes', 'apoptosis', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph G1["G1 Phase"]
        A["Cyclin D-CDK4/6"]
    end
    subgraph S["S Phase"]
        B["Cyclin E/A-CDK2"]
    end
    subgraph G2["G2 Phase"]
        C["Cyclin A-CDK1"]
    end
    subgraph M["M Phase"]
        D["Cyclin B-CDK1"]
    end
    A --> B --> C --> D --> A
    E["p53"] -.->|"Arrest"| A`
};

export const apoptosisPathwayTemplate: DiagramTemplate = {
  id: 'mol-apoptosis-pathway',
  name: 'Apoptosis Signaling',
  description: 'Programmed cell death pathways - intrinsic and extrinsic',
  domain: 'biology',
  promptTemplate: `Create an apoptosis diagram showing:
- Intrinsic pathway: {{intrinsicPathway}}
- Extrinsic pathway: {{extrinsicPathway}}
- Bcl-2 family: {{bcl2Family}}
- Caspase cascade: {{caspaseCascade}}
- Death receptors: {{deathReceptors}}
- Execution phase: {{execution}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['intrinsicPathway', 'extrinsicPathway', 'bcl2Family', 'caspaseCascade', 'deathReceptors', 'execution', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Extrinsic["Extrinsic"]
        A["FasL"] --> B["Fas"]
        B --> C["Caspase-8"]
    end
    subgraph Intrinsic["Intrinsic"]
        D["DNA Damage"] --> E["Bax/Bak"]
        E --> F["Cytochrome c"]
        F --> G["Caspase-9"]
    end
    C --> H["Caspase-3"]
    G --> H
    H --> I["Apoptosis"]`
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

// =============================================================================
// ADDITIONAL TEMPLATES - CRISPR & GENE EDITING
// =============================================================================

export const baseEditingTemplate: DiagramTemplate = {
  id: 'mol-base-editing',
  name: 'Base Editing Mechanism',
  description: 'Diagram showing cytosine or adenine base editing without double-strand breaks',
  domain: 'biology',
  promptTemplate: `Create a base editing diagram showing:
- Base editor type: {{editorType}}
- Dead Cas9 or nickase: {{cas9Variant}}
- Deaminase domain: {{deaminase}}
- Target base conversion: {{conversion}}
- UGI (if CBE): {{ugi}}
- Edit window: {{editWindow}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['editorType', 'cas9Variant', 'deaminase', 'conversion', 'ugi', 'editWindow', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph BE["Base Editor"]
        A["dCas9/nCas9"] --> B["Deaminase"]
        B --> C["UGI (if CBE)"]
    end
    D["sgRNA"] --> BE
    BE --> E["Target DNA"]
    E --> F["C to T conversion"]
    E --> G["A to G conversion"]
    style BE fill:#9B59B6,color:#fff
    style F fill:#27AE60
    style G fill:#3498DB`
};

export const primeEditingTemplate: DiagramTemplate = {
  id: 'mol-prime-editing',
  name: 'Prime Editing Mechanism',
  description: 'Diagram showing search-and-replace genome editing with pegRNA',
  domain: 'biology',
  promptTemplate: `Create a prime editing diagram showing:
- PE enzyme variant: {{peVariant}}
- pegRNA structure: {{pegRnaStructure}}
- PBS sequence: {{pbs}}
- RT template: {{rtTemplate}}
- Nick and edit mechanism: {{mechanism}}
- Flap resolution: {{flapResolution}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['peVariant', 'pegRnaStructure', 'pbs', 'rtTemplate', 'mechanism', 'flapResolution', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph PE["Prime Editor"]
        A["Cas9 nickase (H840A)"] --> B["RT domain"]
    end
    C["pegRNA"] --> |"spacer"| D["Target DNA"]
    C --> |"PBS"| E["3' flap"]
    C --> |"RT template"| F["New sequence"]
    E --> G["Flap equilibration"]
    G --> H["5' flap cleavage"]
    H --> I["Ligation"]
    style PE fill:#9B59B6,color:#fff
    style I fill:#27AE60`
};

// =============================================================================
// ADDITIONAL TEMPLATES - EPIGENETICS
// =============================================================================

export const chromatinRemodelingTemplate: DiagramTemplate = {
  id: 'mol-chromatin-remodeling',
  name: 'Chromatin Remodeling',
  description: 'Diagram showing ATP-dependent chromatin remodeling complexes',
  domain: 'biology',
  promptTemplate: `Create a chromatin remodeling diagram showing:
- Remodeler family: {{remodelerFamily}}
- ATPase subunit: {{atpaseSubunit}}
- Nucleosome substrate: {{nucleosome}}
- Remodeling outcome: {{outcome}}
- Histone modifications: {{histoneMods}}
- Gene expression effect: {{expressionEffect}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['remodelerFamily', 'atpaseSubunit', 'nucleosome', 'outcome', 'histoneMods', 'expressionEffect', 'additionalNotes'],
  mermaidExample: `flowchart LR
    subgraph Closed["Closed Chromatin"]
        A["Nucleosome array"]
    end
    B["SWI/SNF Complex"] --> |"ATP"| Closed
    subgraph Open["Open Chromatin"]
        C["Sliding"]
        D["Ejection"]
        E["Histone exchange"]
    end
    Closed --> Open
    Open --> F["TF Access"]
    F --> G["Transcription"]
    style B fill:#E74C3C
    style Open fill:#27AE60,color:#fff`
};

export const dnaMethylationTemplate: DiagramTemplate = {
  id: 'mol-dna-methylation',
  name: 'DNA Methylation Landscape',
  description: 'Diagram showing DNA methylation patterns and their effects on gene expression',
  domain: 'biology',
  promptTemplate: `Create a DNA methylation diagram showing:
- CpG island location: {{cpgIsland}}
- Methylation status: {{methylationStatus}}
- DNMT enzymes: {{dnmtEnzymes}}
- TET enzymes: {{tetEnzymes}}
- Methyl-binding proteins: {{mbdProteins}}
- Gene expression state: {{expressionState}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['cpgIsland', 'methylationStatus', 'dnmtEnzymes', 'tetEnzymes', 'mbdProteins', 'expressionState', 'additionalNotes'],
  mermaidExample: `flowchart TB
    subgraph Unmethylated["Unmethylated Promoter"]
        A["CpG Island"] --> B["TF Binding"]
        B --> C["Active Transcription"]
    end
    subgraph Methylated["Methylated Promoter"]
        D["5mC"] --> E["MBD Recruitment"]
        E --> F["HDAC Recruitment"]
        F --> G["Gene Silencing"]
    end
    DNMT["DNMT3A/3B"] --> |"de novo"| D
    DNMT1["DNMT1"] --> |"maintenance"| D
    TET["TET1/2/3"] --> |"oxidation"| A
    style C fill:#27AE60
    style G fill:#E74C3C`
};

// =============================================================================
// ADDITIONAL TEMPLATES - RNA BIOLOGY
// =============================================================================

export const rnaiPathwayTemplate: DiagramTemplate = {
  id: 'mol-rnai-pathway',
  name: 'RNAi Pathway',
  description: 'Diagram showing RNA interference mechanism from dsRNA to gene silencing',
  domain: 'biology',
  promptTemplate: `Create an RNAi pathway diagram showing:
- dsRNA source: {{dsRnaSource}}
- Dicer processing: {{dicerProcessing}}
- siRNA/miRNA structure: {{smallRna}}
- RISC assembly: {{riscAssembly}}
- Argonaute protein: {{argonaute}}
- Target silencing mechanism: {{silencingMechanism}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['dsRnaSource', 'dicerProcessing', 'smallRna', 'riscAssembly', 'argonaute', 'silencingMechanism', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["dsRNA/pre-miRNA"] --> B["Dicer"]
    B --> C["siRNA/miRNA duplex"]
    C --> D["RISC Loading"]
    D --> E["Guide strand selection"]
    E --> F["Ago2 + guide strand"]
    F --> G{"Target match?"}
    G --> |"Perfect"| H["mRNA cleavage"]
    G --> |"Partial"| I["Translation repression"]
    style B fill:#E74C3C
    style F fill:#9B59B6
    style H fill:#27AE60`
};

export const mirnaProcessingTemplate: DiagramTemplate = {
  id: 'mol-mirna-processing',
  name: 'miRNA Biogenesis',
  description: 'Diagram showing microRNA processing from pri-miRNA to mature miRNA',
  domain: 'biology',
  promptTemplate: `Create a miRNA biogenesis diagram showing:
- Pri-miRNA transcription: {{priMirna}}
- Drosha/DGCR8 processing: {{droshaProcessing}}
- Pre-miRNA export: {{export}}
- Dicer processing: {{dicerProcessing}}
- Strand selection: {{strandSelection}}
- Target recognition: {{targetRecognition}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['priMirna', 'droshaProcessing', 'export', 'dicerProcessing', 'strandSelection', 'targetRecognition', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Nucleus["Nucleus"]
        A["miRNA gene"] --> |"Pol II"| B["pri-miRNA"]
        B --> C["Drosha/DGCR8"]
        C --> D["pre-miRNA ~70nt"]
    end
    D --> |"Exportin-5"| E["Cytoplasm"]
    subgraph Cytoplasm["Cytoplasm"]
        E --> F["Dicer"]
        F --> G["miRNA duplex"]
        G --> H["RISC"]
        H --> I["Mature miRNA"]
    end
    I --> J["Target mRNA 3'UTR"]
    style C fill:#E74C3C
    style F fill:#F39C12
    style I fill:#27AE60`
};

// =============================================================================
// ADDITIONAL TEMPLATES - LAB TECHNIQUES
// =============================================================================

export const crisprScreenTemplate: DiagramTemplate = {
  id: 'mol-crispr-screen',
  name: 'CRISPR Screen Workflow',
  description: 'Diagram showing pooled CRISPR screening methodology',
  domain: 'biology',
  promptTemplate: `Create a CRISPR screen diagram showing:
- sgRNA library: {{sgrnaLibrary}}
- Cell transduction: {{transduction}}
- Selection pressure: {{selection}}
- Sample collection: {{sampling}}
- NGS analysis: {{ngsAnalysis}}
- Hit identification: {{hitIdentification}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['sgrnaLibrary', 'transduction', 'selection', 'sampling', 'ngsAnalysis', 'hitIdentification', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["sgRNA Library"] --> B["Lentiviral packaging"]
    B --> C["Transduce cells (MOI 0.3)"]
    C --> D["Selection (puromycin)"]
    D --> E{"Screen type"}
    E --> |"Positive"| F["Drug treatment"]
    E --> |"Negative"| G["Essential genes"]
    F --> H["Surviving cells"]
    G --> H
    H --> I["Genomic DNA extraction"]
    I --> J["PCR amplify sgRNAs"]
    J --> K["NGS sequencing"]
    K --> L["MAGeCK analysis"]
    L --> M["Enriched/Depleted genes"]
    style A fill:#9B59B6
    style M fill:#27AE60`
};

export const chipSeqTemplate: DiagramTemplate = {
  id: 'mol-chip-seq-workflow',
  name: 'ChIP-seq Workflow',
  description: 'Diagram showing chromatin immunoprecipitation sequencing workflow',
  domain: 'biology',
  promptTemplate: `Create a ChIP-seq diagram showing:
- Crosslinking: {{crosslinking}}
- Chromatin fragmentation: {{fragmentation}}
- Immunoprecipitation: {{ip}}
- DNA purification: {{purification}}
- Library preparation: {{libraryPrep}}
- Peak calling: {{peakCalling}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['crosslinking', 'fragmentation', 'ip', 'purification', 'libraryPrep', 'peakCalling', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Cells"] --> B["Crosslink (formaldehyde)"]
    B --> C["Lyse cells"]
    C --> D["Sonicate chromatin"]
    D --> E["Add antibody"]
    E --> F["Immunoprecipitate"]
    F --> G["Wash and elute"]
    G --> H["Reverse crosslinks"]
    H --> I["Purify DNA"]
    I --> J["Library prep"]
    J --> K["Sequence (PE150)"]
    K --> L["Align reads"]
    L --> M["Call peaks (MACS2)"]
    style E fill:#E74C3C
    style M fill:#27AE60`
};

export const rnaSeqTemplate: DiagramTemplate = {
  id: 'mol-rna-seq-workflow',
  name: 'RNA-seq Workflow',
  description: 'Diagram showing RNA sequencing from sample to differential expression',
  domain: 'biology',
  promptTemplate: `Create an RNA-seq diagram showing:
- RNA extraction: {{rnaExtraction}}
- Library preparation: {{libraryPrep}}
- Sequencing platform: {{sequencing}}
- Read alignment: {{alignment}}
- Quantification: {{quantification}}
- Differential expression: {{de}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['rnaExtraction', 'libraryPrep', 'sequencing', 'alignment', 'quantification', 'de', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Samples"] --> B["RNA extraction"]
    B --> C["QC (RIN > 7)"]
    C --> D{"Library type"}
    D --> |"polyA"| E["Oligo-dT selection"]
    D --> |"total"| F["rRNA depletion"]
    E --> G["Fragmentation"]
    F --> G
    G --> H["cDNA synthesis"]
    H --> I["Adapter ligation"]
    I --> J["Amplification"]
    J --> K["Sequencing"]
    K --> L["FASTQ"]
    L --> M["STAR alignment"]
    M --> N["featureCounts"]
    N --> O["DESeq2/edgeR"]
    O --> P["DE genes"]
    style K fill:#3498DB
    style P fill:#27AE60`
};

export const molecularTemplates: DiagramTemplate[] = [
  dnaReplicationTemplate,
  transcriptionTemplate,
  translationTemplate,
  splicingTemplate,
  proteinStructureTemplate,
  enzymeMechanismTemplate,
  operonTemplate,
  crisprTemplate,
  epigeneticsTemplate,
  pcrTemplate,
  gelElectrophoresisTemplate,
  westernBlotTemplate,
  sequencingTemplate,
  cloningTemplate,
  centralDogmaTemplate,
  signalTransductionTemplate,
  cellCycleRegulationTemplate,
  apoptosisPathwayTemplate,
  // New templates
  baseEditingTemplate,
  primeEditingTemplate,
  chromatinRemodelingTemplate,
  dnaMethylationTemplate,
  rnaiPathwayTemplate,
  mirnaProcessingTemplate,
  crisprScreenTemplate,
  chipSeqTemplate,
  rnaSeqTemplate,
];

export default molecularTemplates;
