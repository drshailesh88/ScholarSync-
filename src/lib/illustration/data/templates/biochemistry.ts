/**
 * biochemistry.ts
 * Biochemistry diagram templates
 *
 * Contains comprehensive templates for biochemistry including:
 * - Metabolic pathways (glycolysis, TCA, oxidative phosphorylation)
 * - Enzyme kinetics and regulation
 * - Signal transduction
 * - Protein structure and function
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// METABOLIC PATHWAYS
// =============================================================================

/**
 * Glycolysis Pathway template
 */
export const glycolysisPathway: DiagramTemplate = {
  id: 'biochem-glycolysis',
  name: 'Glycolysis Pathway',
  description: 'Complete glycolytic pathway with enzymes and regulation',
  domain: 'chemistry',
  promptTemplate: `Create a glycolysis pathway diagram:
- Starting substrate: {{startingSubstrate}}
- Key intermediates: {{intermediates}}
- ATP investment phase: {{atpInvestment}}
- ATP payoff phase: {{atpPayoff}}
- Regulatory enzymes: {{regulatoryEnzymes}}
- Net yield: {{netYield}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'startingSubstrate',
    'intermediates',
    'atpInvestment',
    'atpPayoff',
    'regulatoryEnzymes',
    'netYield',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Glucose"] -->|"Hexokinase -ATP"| B["G6P"]
    B --> C["F6P"]
    C -->|"PFK-1 -ATP"| D["F1,6BP"]
    D --> E["GAP + DHAP"]
    E --> F["Pyruvate"]
    subgraph Yield["Net Yield"]
        G["2 ATP, 2 NADH, 2 Pyruvate"]
    end
    style C fill:#ff6b6b`,
};

/**
 * TCA Cycle template
 */
export const tcaCycle: DiagramTemplate = {
  id: 'biochem-tca-cycle',
  name: 'TCA/Krebs Cycle',
  description: 'Citric acid cycle with intermediates and products',
  domain: 'chemistry',
  promptTemplate: `Create a TCA cycle diagram:
- Entry point: {{entryPoint}}
- Cycle intermediates: {{intermediates}}
- NADH production: {{nadhProduction}}
- FADH2 production: {{fadh2Production}}
- GTP production: {{gtpProduction}}
- Regulatory points: {{regulation}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'entryPoint',
    'intermediates',
    'nadhProduction',
    'fadh2Production',
    'gtpProduction',
    'regulation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Acetyl-CoA"] --> B["Citrate"]
    B --> C["Isocitrate"]
    C -->|"NADH"| D["α-KG"]
    D -->|"NADH"| E["Succinyl-CoA"]
    E -->|"GTP"| F["Succinate"]
    F -->|"FADH2"| G["Fumarate"]
    G --> H["Malate"]
    H -->|"NADH"| I["OAA"]
    I --> A
    style A fill:#4ecdc4`,
};

/**
 * Electron Transport Chain template
 */
export const electronTransportChain: DiagramTemplate = {
  id: 'biochem-etc',
  name: 'Electron Transport Chain',
  description: 'Oxidative phosphorylation and ATP synthesis',
  domain: 'chemistry',
  promptTemplate: `Create an electron transport chain diagram:
- Complex I function: {{complexI}}
- Complex II function: {{complexII}}
- Complex III function: {{complexIII}}
- Complex IV function: {{complexIV}}
- ATP synthase: {{atpSynthase}}
- Proton gradient: {{protonGradient}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'complexI',
    'complexII',
    'complexIII',
    'complexIV',
    'atpSynthase',
    'protonGradient',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    A["NADH"] --> B["Complex I"]
    B -->|"e-"| C["CoQ"]
    C --> D["Complex III"]
    D -->|"e-"| E["Cyt c"]
    E --> F["Complex IV"]
    F --> G["O2 → H2O"]
    subgraph Proton["H+ Gradient"]
        H["Drives ATP Synthase"]
    end`,
};

/**
 * Beta Oxidation template
 */
export const betaOxidation: DiagramTemplate = {
  id: 'biochem-beta-oxidation',
  name: 'Fatty Acid Beta Oxidation',
  description: 'Fatty acid catabolism in mitochondria',
  domain: 'chemistry',
  promptTemplate: `Create a beta oxidation diagram:
- Fatty acid activation: {{activation}}
- Transport (carnitine shuttle): {{transport}}
- Oxidation steps: {{oxidationSteps}}
- Products per cycle: {{productsPerCycle}}
- Total ATP yield: {{atpYield}}
- Regulation: {{regulation}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'activation',
    'transport',
    'oxidationSteps',
    'productsPerCycle',
    'atpYield',
    'regulation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["FA-CoA"] --> B["Acyl-CoA Dehydrogenase"]
    B -->|"FADH2"| C["Enoyl-CoA"]
    C --> D["Hydratase"]
    D --> E["β-Hydroxyacyl-CoA"]
    E -->|"NADH"| F["β-Ketoacyl-CoA"]
    F --> G["Thiolase"]
    G --> H["Acetyl-CoA + Shortened FA"]`,
};

// =============================================================================
// ENZYME KINETICS
// =============================================================================

/**
 * Michaelis-Menten Kinetics template
 */
export const michaelisMenten: DiagramTemplate = {
  id: 'biochem-michaelis-menten',
  name: 'Michaelis-Menten Kinetics',
  description: 'Enzyme kinetics analysis with Km and Vmax',
  domain: 'chemistry',
  promptTemplate: `Create a Michaelis-Menten kinetics diagram:
- Enzyme: {{enzyme}}
- Substrate: {{substrate}}
- Km value: {{kmValue}}
- Vmax value: {{vmaxValue}}
- Catalytic efficiency: {{catalyticEfficiency}}
- Kinetic mechanism: {{mechanism}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'enzyme',
    'substrate',
    'kmValue',
    'vmaxValue',
    'catalyticEfficiency',
    'mechanism',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Equation["Michaelis-Menten"]
        A["v = Vmax[S]/(Km + [S])"]
    end
    subgraph Parameters
        B["Km = [S] at v = Vmax/2"]
        C["kcat = Vmax/[E]T"]
        D["kcat/Km = Catalytic efficiency"]
    end`,
};

/**
 * Enzyme Inhibition template
 */
export const enzymeInhibition: DiagramTemplate = {
  id: 'biochem-enzyme-inhibition',
  name: 'Enzyme Inhibition',
  description: 'Competitive, noncompetitive, and uncompetitive inhibition',
  domain: 'chemistry',
  promptTemplate: `Create an enzyme inhibition diagram:
- Inhibition type: {{inhibitionType}}
- Inhibitor: {{inhibitor}}
- Effect on Km: {{kmEffect}}
- Effect on Vmax: {{vmaxEffect}}
- Ki value: {{kiValue}}
- Lineweaver-Burk pattern: {{lbPattern}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'inhibitionType',
    'inhibitor',
    'kmEffect',
    'vmaxEffect',
    'kiValue',
    'lbPattern',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Competitive["Competitive"]
        A["Km increases, Vmax same"]
    end
    subgraph NonComp["Noncompetitive"]
        B["Km same, Vmax decreases"]
    end
    subgraph UnComp["Uncompetitive"]
        C["Both Km and Vmax decrease"]
    end`,
};

/**
 * Allosteric Regulation template
 */
export const allostericRegulation: DiagramTemplate = {
  id: 'biochem-allosteric',
  name: 'Allosteric Enzyme Regulation',
  description: 'Cooperativity and allosteric effectors',
  domain: 'chemistry',
  promptTemplate: `Create an allosteric regulation diagram:
- Enzyme: {{enzyme}}
- Allosteric effector: {{effector}}
- Effect type: {{effectType}}
- Hill coefficient: {{hillCoefficient}}
- T and R states: {{tAndRStates}}
- Physiological significance: {{significance}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'enzyme',
    'effector',
    'effectType',
    'hillCoefficient',
    'tAndRStates',
    'significance',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    A["T State (Tense)"] <-->|"Equilibrium"| B["R State (Relaxed)"]
    C["Activator"] -->|"Stabilizes"| B
    D["Inhibitor"] -->|"Stabilizes"| A
    style A fill:#ff6b6b
    style B fill:#4ecdc4`,
};

// =============================================================================
// SIGNAL TRANSDUCTION
// =============================================================================

/**
 * GPCR Signaling template
 */
export const gpcrSignaling: DiagramTemplate = {
  id: 'biochem-gpcr-signaling',
  name: 'GPCR Signal Transduction',
  description: 'G protein-coupled receptor signaling cascade',
  domain: 'chemistry',
  promptTemplate: `Create a GPCR signaling diagram:
- Receptor: {{receptor}}
- Ligand: {{ligand}}
- G protein type: {{gProtein}}
- Second messenger: {{secondMessenger}}
- Effector enzyme: {{effectorEnzyme}}
- Cellular response: {{cellularResponse}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'receptor',
    'ligand',
    'gProtein',
    'secondMessenger',
    'effectorEnzyme',
    'cellularResponse',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Ligand"] --> B["GPCR"]
    B --> C["G protein activation"]
    C --> D["Adenylyl Cyclase"]
    D --> E["cAMP"]
    E --> F["PKA"]
    F --> G["Cellular Response"]
    style E fill:#ffd93d`,
};

/**
 * Receptor Tyrosine Kinase template
 */
export const rtkSignaling: DiagramTemplate = {
  id: 'biochem-rtk-signaling',
  name: 'RTK Signaling Pathway',
  description: 'Receptor tyrosine kinase and MAPK cascade',
  domain: 'chemistry',
  promptTemplate: `Create an RTK signaling diagram:
- Growth factor: {{growthFactor}}
- Receptor: {{receptor}}
- Adaptor proteins: {{adaptors}}
- Ras activation: {{rasActivation}}
- MAPK cascade: {{mapkCascade}}
- Transcription factors: {{transcriptionFactors}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'growthFactor',
    'receptor',
    'adaptors',
    'rasActivation',
    'mapkCascade',
    'transcriptionFactors',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Growth Factor"] --> B["RTK Dimerization"]
    B --> C["Autophosphorylation"]
    C --> D["Grb2-SOS"]
    D --> E["Ras-GTP"]
    E --> F["Raf → MEK → ERK"]
    F --> G["Gene Expression"]`,
};

// =============================================================================
// PROTEIN STRUCTURE
// =============================================================================

/**
 * Protein Folding template
 */
export const proteinFolding: DiagramTemplate = {
  id: 'biochem-protein-folding',
  name: 'Protein Folding Pathway',
  description: 'Protein folding from primary to quaternary structure',
  domain: 'chemistry',
  promptTemplate: `Create a protein folding diagram:
- Primary sequence: {{primarySequence}}
- Secondary structures: {{secondaryStructures}}
- Tertiary folding: {{tertiaryFolding}}
- Quaternary assembly: {{quaternaryAssembly}}
- Chaperones involved: {{chaperones}}
- Misfolding diseases: {{misfoldingDiseases}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'primarySequence',
    'secondaryStructures',
    'tertiaryFolding',
    'quaternaryAssembly',
    'chaperones',
    'misfoldingDiseases',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Primary (sequence)"] --> B["Secondary (α-helix, β-sheet)"]
    B --> C["Tertiary (3D fold)"]
    C --> D["Quaternary (subunits)"]
    E["Chaperones"] -.-> B
    E -.-> C
    style D fill:#4ecdc4`,
};

/**
 * Enzyme Mechanism template
 */
export const enzymeMechanism: DiagramTemplate = {
  id: 'biochem-enzyme-mechanism',
  name: 'Enzyme Catalytic Mechanism',
  description: 'Step-by-step enzyme catalysis mechanism',
  domain: 'chemistry',
  promptTemplate: `Create an enzyme mechanism diagram:
- Enzyme: {{enzyme}}
- Active site residues: {{activeSiteResidues}}
- Substrate binding: {{substrateBinding}}
- Catalytic steps: {{catalyticSteps}}
- Transition state: {{transitionState}}
- Product release: {{productRelease}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'enzyme',
    'activeSiteResidues',
    'substrateBinding',
    'catalyticSteps',
    'transitionState',
    'productRelease',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["E + S"] --> B["ES Complex"]
    B --> C["ES‡ Transition State"]
    C --> D["EP Complex"]
    D --> E["E + P"]
    subgraph Catalysis
        F["Acid-base catalysis"]
        G["Covalent catalysis"]
        H["Metal ion catalysis"]
    end`,
};

// =============================================================================
// NUCLEIC ACIDS
// =============================================================================

/**
 * DNA Replication template
 */
export const dnaReplication: DiagramTemplate = {
  id: 'biochem-dna-replication',
  name: 'DNA Replication',
  description: 'Semiconservative DNA replication mechanism',
  domain: 'chemistry',
  promptTemplate: `Create a DNA replication diagram:
- Origin of replication: {{origin}}
- Helicase function: {{helicase}}
- Leading strand synthesis: {{leadingStrand}}
- Lagging strand synthesis: {{laggingStrand}}
- Okazaki fragments: {{okazakiFragments}}
- Proofreading: {{proofreading}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'origin',
    'helicase',
    'leadingStrand',
    'laggingStrand',
    'okazakiFragments',
    'proofreading',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Origin Recognition"] --> B["Helicase Unwinding"]
    B --> C["Leading Strand (continuous)"]
    B --> D["Lagging Strand (Okazaki)"]
    C --> E["DNA Pol III"]
    D --> F["Primase + DNA Pol III"]
    F --> G["Ligase joins fragments"]`,
};

/**
 * Transcription template
 */
export const transcription: DiagramTemplate = {
  id: 'biochem-transcription',
  name: 'Transcription Process',
  description: 'Gene expression from DNA to mRNA',
  domain: 'chemistry',
  promptTemplate: `Create a transcription diagram:
- Promoter elements: {{promoterElements}}
- Transcription factors: {{transcriptionFactors}}
- RNA polymerase: {{rnaPolymerase}}
- Initiation: {{initiation}}
- Elongation: {{elongation}}
- Termination: {{termination}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'promoterElements',
    'transcriptionFactors',
    'rnaPolymerase',
    'initiation',
    'elongation',
    'termination',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Promoter (TATA box)"] --> B["TF Binding"]
    B --> C["RNA Pol II Recruitment"]
    C --> D["Initiation"]
    D --> E["Elongation (5'→3')"]
    E --> F["Termination"]
    F --> G["pre-mRNA"]`,
};

// =============================================================================
// ADDITIONAL METABOLIC PATHWAYS
// =============================================================================

/**
 * Gluconeogenesis template
 */
export const gluconeogenesis: DiagramTemplate = {
  id: 'biochem-gluconeogenesis',
  name: 'Gluconeogenesis Pathway',
  description: 'Glucose synthesis from non-carbohydrate precursors',
  domain: 'chemistry',
  promptTemplate: `Create a gluconeogenesis diagram:
- Precursors: {{precursors}}
- Bypass enzymes: {{bypassEnzymes}}
- Pyruvate carboxylase: {{pyruvateCarboxylase}}
- PEPCK reaction: {{pepckReaction}}
- Energy cost: {{energyCost}}
- Regulation: {{regulation}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'precursors',
    'bypassEnzymes',
    'pyruvateCarboxylase',
    'pepckReaction',
    'energyCost',
    'regulation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Pyruvate"] -->|"PC (biotin)"| B["OAA"]
    B -->|"PEPCK"| C["PEP"]
    C --> D["2-PG"]
    D --> E["F1,6BP"]
    E -->|"F1,6BPase"| F["F6P"]
    F --> G["G6P"]
    G -->|"G6Pase"| H["Glucose"]
    style A fill:#ff6b6b
    style H fill:#4ecdc4`,
};

/**
 * Pentose Phosphate Pathway template
 */
export const pentosePhosphatePathway: DiagramTemplate = {
  id: 'biochem-ppp',
  name: 'Pentose Phosphate Pathway',
  description: 'NADPH and ribose-5-phosphate production',
  domain: 'chemistry',
  promptTemplate: `Create a pentose phosphate pathway diagram:
- Oxidative phase: {{oxidativePhase}}
- Non-oxidative phase: {{nonOxidativePhase}}
- NADPH production: {{nadphProduction}}
- Ribose-5-P uses: {{riboseUses}}
- Regulatory enzyme: {{regulatoryEnzyme}}
- Connection to glycolysis: {{glycolysisConnection}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'oxidativePhase',
    'nonOxidativePhase',
    'nadphProduction',
    'riboseUses',
    'regulatoryEnzyme',
    'glycolysisConnection',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["G6P"] -->|"G6P DH"| B["6-PGL"]
    B -->|"NADPH"| C["6-PG"]
    C -->|"6-PG DH<br/>NADPH + CO2"| D["Ru5P"]
    D --> E["R5P (nucleotides)"]
    D --> F["Xu5P"]
    F --> G["Glycolytic intermediates"]
    style D fill:#ffd93d`,
};

/**
 * Urea Cycle template
 */
export const ureaCycle: DiagramTemplate = {
  id: 'biochem-urea-cycle',
  name: 'Urea Cycle',
  description: 'Nitrogen disposal and ammonia detoxification',
  domain: 'chemistry',
  promptTemplate: `Create a urea cycle diagram:
- Ammonia entry: {{ammoniaEntry}}
- Cycle intermediates: {{intermediates}}
- Ornithine regeneration: {{ornithineRegeneration}}
- Urea production: {{ureaProduction}}
- Energy cost: {{energyCost}}
- Regulation: {{regulation}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ammoniaEntry',
    'intermediates',
    'ornithineRegeneration',
    'ureaProduction',
    'energyCost',
    'regulation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Ornithine"] -->|"CPS-I + OTC"| B["Citrulline"]
    B -->|"ASS"| C["Argininosuccinate"]
    C -->|"ASL"| D["Arginine"]
    D -->|"Arginase"| E["Urea + Ornithine"]
    E --> A
    subgraph Mito["Mitochondria"]
        A
        B
    end
    style E fill:#4ecdc4`,
};

/**
 * Fatty Acid Synthesis template
 */
export const fattyAcidSynthesis: DiagramTemplate = {
  id: 'biochem-fa-synthesis',
  name: 'Fatty Acid Synthesis',
  description: 'De novo lipogenesis pathway',
  domain: 'chemistry',
  promptTemplate: `Create a fatty acid synthesis diagram:
- Acetyl-CoA source: {{acetylCoASource}}
- ACC reaction: {{accReaction}}
- FAS complex: {{fasComplex}}
- NADPH requirement: {{nadphRequirement}}
- Product: {{product}}
- Regulation: {{regulation}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'acetylCoASource',
    'accReaction',
    'fasComplex',
    'nadphRequirement',
    'product',
    'regulation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Acetyl-CoA"] -->|"ACC"| B["Malonyl-CoA"]
    B --> C["FAS Complex"]
    C -->|"7 cycles"| D["Palmitate (C16)"]
    E["NADPH"] --> C
    subgraph Regulation
        F["Insulin activates ACC"]
        G["Glucagon inhibits ACC"]
    end
    style D fill:#ffd93d`,
};

/**
 * Cholesterol Synthesis template
 */
export const cholesterolSynthesis: DiagramTemplate = {
  id: 'biochem-cholesterol',
  name: 'Cholesterol Synthesis',
  description: 'Mevalonate pathway and steroid biosynthesis',
  domain: 'chemistry',
  promptTemplate: `Create a cholesterol synthesis diagram:
- Starting material: {{startingMaterial}}
- HMG-CoA reductase: {{hmgCoAReductase}}
- Mevalonate pathway: {{mevalonatePathway}}
- Squalene synthesis: {{squaleneSynthesis}}
- Cholesterol uses: {{cholesterolUses}}
- Statin target: {{statinTarget}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'startingMaterial',
    'hmgCoAReductase',
    'mevalonatePathway',
    'squaleneSynthesis',
    'cholesterolUses',
    'statinTarget',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Acetyl-CoA"] --> B["HMG-CoA"]
    B -->|"HMG-CoA Reductase<br/>(Statin target)"| C["Mevalonate"]
    C --> D["Isoprene units"]
    D --> E["Squalene"]
    E --> F["Cholesterol"]
    F --> G["Bile acids, Steroids, Membranes"]
    style B fill:#ff6b6b`,
};

// =============================================================================
// PROTEIN SYNTHESIS
// =============================================================================

/**
 * Translation template
 */
export const translation: DiagramTemplate = {
  id: 'biochem-translation',
  name: 'Translation Process',
  description: 'mRNA to protein synthesis on ribosomes',
  domain: 'chemistry',
  promptTemplate: `Create a translation diagram:
- Initiation: {{initiation}}
- Elongation steps: {{elongation}}
- Termination: {{termination}}
- tRNA function: {{trnaFunction}}
- Ribosome structure: {{ribosomeStructure}}
- Energy requirement: {{energyRequirement}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'initiation',
    'elongation',
    'termination',
    'trnaFunction',
    'ribosomeStructure',
    'energyRequirement',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["mRNA + 40S subunit"] --> B["Met-tRNA binding"]
    B --> C["60S joins - 80S"]
    C --> D["Elongation cycle"]
    D --> E["AA-tRNA delivery (EF-Tu)"]
    E --> F["Peptide bond (peptidyl transferase)"]
    F --> G["Translocation (EF-G)"]
    G --> D
    D -->|"Stop codon"| H["Release factors"]
    H --> I["Polypeptide release"]`,
};

/**
 * Post-translational Modifications template
 */
export const postTranslationalMod: DiagramTemplate = {
  id: 'biochem-ptm',
  name: 'Post-Translational Modifications',
  description: 'Common protein modifications after translation',
  domain: 'chemistry',
  promptTemplate: `Create a PTM diagram:
- Phosphorylation: {{phosphorylation}}
- Glycosylation: {{glycosylation}}
- Ubiquitination: {{ubiquitination}}
- Acetylation: {{acetylation}}
- Methylation: {{methylation}}
- Proteolytic cleavage: {{proteolyticCleavage}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'phosphorylation',
    'glycosylation',
    'ubiquitination',
    'acetylation',
    'methylation',
    'proteolyticCleavage',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Nascent Polypeptide"] --> B["Phosphorylation (Ser/Thr/Tyr)"]
    A --> C["Glycosylation (N/O-linked)"]
    A --> D["Ubiquitination (Lys)"]
    A --> E["Acetylation (Lys)"]
    A --> F["Methylation (Arg/Lys)"]
    A --> G["Signal peptide cleavage"]
    style B fill:#ffd93d
    style D fill:#ff6b6b`,
};

// =============================================================================
// CELL SIGNALING (ADDITIONAL)
// =============================================================================

/**
 * MAPK Cascade template
 */
export const mapkCascade: DiagramTemplate = {
  id: 'biochem-mapk',
  name: 'MAPK Signaling Cascade',
  description: 'Three-tiered kinase cascade for cell proliferation',
  domain: 'chemistry',
  promptTemplate: `Create a MAPK cascade diagram:
- Stimulus: {{stimulus}}
- MAPKKK level: {{mapkkk}}
- MAPKK level: {{mapkk}}
- MAPK level: {{mapk}}
- Downstream targets: {{downstreamTargets}}
- Scaffold proteins: {{scaffoldProteins}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'stimulus',
    'mapkkk',
    'mapkk',
    'mapk',
    'downstreamTargets',
    'scaffoldProteins',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Growth Factor"] --> B["RTK activation"]
    B --> C["Ras-GTP"]
    C --> D["Raf (MAPKKK)"]
    D --> E["MEK (MAPKK)"]
    E --> F["ERK (MAPK)"]
    F --> G["Transcription factors"]
    G --> H["Cell proliferation genes"]
    style F fill:#ff6b6b`,
};

/**
 * Insulin Signaling template
 */
export const insulinSignaling: DiagramTemplate = {
  id: 'biochem-insulin',
  name: 'Insulin Signaling Pathway',
  description: 'Metabolic effects of insulin receptor activation',
  domain: 'chemistry',
  promptTemplate: `Create an insulin signaling diagram:
- Receptor activation: {{receptorActivation}}
- IRS proteins: {{irsProteins}}
- PI3K pathway: {{pi3kPathway}}
- Akt targets: {{aktTargets}}
- GLUT4 translocation: {{glut4Translocation}}
- Metabolic effects: {{metabolicEffects}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'receptorActivation',
    'irsProteins',
    'pi3kPathway',
    'aktTargets',
    'glut4Translocation',
    'metabolicEffects',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Insulin"] --> B["Insulin Receptor"]
    B -->|"Autophosphorylation"| C["IRS-1"]
    C --> D["PI3K"]
    D --> E["PIP3"]
    E --> F["Akt/PKB"]
    F --> G["GLUT4 translocation"]
    F --> H["Glycogen synthesis"]
    F --> I["Lipogenesis"]
    style G fill:#4ecdc4`,
};

/**
 * Calcium Signaling template
 */
export const calciumSignaling: DiagramTemplate = {
  id: 'biochem-calcium',
  name: 'Calcium Signaling',
  description: 'IP3 and calcium as second messengers',
  domain: 'chemistry',
  promptTemplate: `Create a calcium signaling diagram:
- Receptor activation: {{receptorActivation}}
- PLC activation: {{plcActivation}}
- IP3 production: {{ip3Production}}
- ER calcium release: {{erCalciumRelease}}
- Calmodulin activation: {{calmodulinActivation}}
- Downstream effects: {{downstreamEffects}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'receptorActivation',
    'plcActivation',
    'ip3Production',
    'erCalciumRelease',
    'calmodulinActivation',
    'downstreamEffects',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["GPCR activation"] --> B["PLC"]
    B --> C["PIP2 → IP3 + DAG"]
    C --> D["IP3 → ER"]
    D --> E["Ca2+ release"]
    E --> F["Calmodulin"]
    F --> G["CaM kinases"]
    G --> H["Cellular responses"]
    style E fill:#06B6D4`,
};

// =============================================================================
// LABORATORY TECHNIQUES
// =============================================================================

/**
 * PCR Technique template
 */
export const pcrTechnique: DiagramTemplate = {
  id: 'biochem-pcr',
  name: 'PCR Amplification',
  description: 'Polymerase chain reaction for DNA amplification',
  domain: 'chemistry',
  promptTemplate: `Create a PCR diagram:
- Template DNA: {{templateDna}}
- Primer design: {{primerDesign}}
- Denaturation step: {{denaturation}}
- Annealing step: {{annealing}}
- Extension step: {{extension}}
- Cycle number: {{cycleNumber}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'templateDna',
    'primerDesign',
    'denaturation',
    'annealing',
    'extension',
    'cycleNumber',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["dsDNA template"] -->|"95°C Denature"| B["ssDNA"]
    B -->|"55°C Anneal"| C["Primers bound"]
    C -->|"72°C Extend"| D["New dsDNA"]
    D --> A
    E["After n cycles: 2^n copies"]
    style D fill:#4ecdc4`,
};

/**
 * Western Blot template
 */
export const westernBlot: DiagramTemplate = {
  id: 'biochem-western',
  name: 'Western Blot Analysis',
  description: 'Protein detection using antibodies',
  domain: 'chemistry',
  promptTemplate: `Create a Western blot diagram:
- Sample preparation: {{samplePrep}}
- SDS-PAGE separation: {{sdsPage}}
- Transfer to membrane: {{transfer}}
- Blocking: {{blocking}}
- Primary antibody: {{primaryAb}}
- Detection: {{detection}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'samplePrep',
    'sdsPage',
    'transfer',
    'blocking',
    'primaryAb',
    'detection',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Protein sample"] --> B["SDS-PAGE"]
    B --> C["Transfer to PVDF"]
    C --> D["Block (BSA/milk)"]
    D --> E["Primary antibody"]
    E --> F["Secondary antibody-HRP"]
    F --> G["Chemiluminescent detection"]
    style G fill:#ffd93d`,
};

/**
 * Gel Electrophoresis template
 */
export const gelElectrophoresis: DiagramTemplate = {
  id: 'biochem-gel',
  name: 'Gel Electrophoresis',
  description: 'DNA, RNA, or protein separation by size',
  domain: 'chemistry',
  promptTemplate: `Create a gel electrophoresis diagram:
- Sample type: {{sampleType}}
- Gel matrix: {{gelMatrix}}
- Running buffer: {{runningBuffer}}
- Molecular markers: {{markers}}
- Detection method: {{detectionMethod}}
- Applications: {{applications}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'sampleType',
    'gelMatrix',
    'runningBuffer',
    'markers',
    'detectionMethod',
    'applications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Load samples in wells"] --> B["Apply electric field"]
    B --> C["(-) Cathode to (+) Anode"]
    C --> D["Small molecules migrate faster"]
    D --> E["Stain gel (EtBr, Coomassie)"]
    E --> F["Visualize bands"]
    style F fill:#3B82F6`,
};

/**
 * Chromatography template
 */
export const chromatography: DiagramTemplate = {
  id: 'biochem-chromatography',
  name: 'Column Chromatography',
  description: 'Protein purification techniques',
  domain: 'chemistry',
  promptTemplate: `Create a chromatography diagram:
- Separation principle: {{separationPrinciple}}
- Column type: {{columnType}}
- Mobile phase: {{mobilePhase}}
- Stationary phase: {{stationaryPhase}}
- Elution method: {{elutionMethod}}
- Detection: {{detection}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'separationPrinciple',
    'columnType',
    'mobilePhase',
    'stationaryPhase',
    'elutionMethod',
    'detection',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Types["Chromatography Types"]
        A["Size Exclusion: by size"]
        B["Ion Exchange: by charge"]
        C["Affinity: by binding"]
        D["HPLC: high resolution"]
    end
    E["Protein mixture"] --> Types
    Types --> F["Purified fractions"]
    style C fill:#8B5CF6`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All biochemistry templates
 */
export const biochemistryTemplates: DiagramTemplate[] = [
  // Metabolic Pathways
  glycolysisPathway,
  tcaCycle,
  electronTransportChain,
  betaOxidation,
  gluconeogenesis,
  pentosePhosphatePathway,
  ureaCycle,
  fattyAcidSynthesis,
  cholesterolSynthesis,
  // Enzyme Kinetics
  michaelisMenten,
  enzymeInhibition,
  allostericRegulation,
  // Signal Transduction
  gpcrSignaling,
  rtkSignaling,
  mapkCascade,
  insulinSignaling,
  calciumSignaling,
  // Protein Structure
  proteinFolding,
  enzymeMechanism,
  translation,
  postTranslationalMod,
  // Nucleic Acids
  dnaReplication,
  transcription,
  // Lab Techniques
  pcrTechnique,
  westernBlot,
  gelElectrophoresis,
  chromatography,
];

export default biochemistryTemplates;
