/**
 * genetics.ts
 * Genetics diagram templates for FINNISH
 *
 * Contains comprehensive templates for genetics including:
 * - Inheritance patterns and crosses
 * - Chromosomal analysis
 * - Mutation types
 * - Population genetics
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// INHERITANCE PATTERNS
// =============================================================================

export const punnettSquareTemplate: DiagramTemplate = {
  id: 'gen-punnett-square',
  name: 'Punnett Square',
  description: 'Genetic cross diagram showing offspring genotype probabilities',
  domain: 'biology',
  promptTemplate: `Create a Punnett square showing:
- Parent 1 genotype: {{parent1Genotype}}
- Parent 2 genotype: {{parent2Genotype}}
- Trait being crossed: {{trait}}
- Gamete combinations: {{gametes}}
- Offspring ratios: {{offspringRatios}}
- Phenotype predictions: {{phenotypes}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['parent1Genotype', 'parent2Genotype', 'trait', 'gametes', 'offspringRatios', 'phenotypes', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph PS["Punnett Square Aa x Aa"]
        A["  | A | a"]
        B["A | AA | Aa"]
        C["a | Aa | aa"]
    end
    D["Ratio: 1 AA : 2 Aa : 1 aa"]
    E["Phenotype: 3 Dominant : 1 Recessive"]`
};

export const dihybridCrossTemplate: DiagramTemplate = {
  id: 'gen-dihybrid-cross',
  name: 'Dihybrid Cross',
  description: 'Two-trait genetic cross showing independent assortment',
  domain: 'biology',
  promptTemplate: `Create a dihybrid cross diagram showing:
- Parent genotypes: {{parentGenotypes}}
- Traits involved: {{traits}}
- Gamete types: {{gameteTypes}}
- F2 phenotype ratios: {{phenotypeRatios}}
- Expected 9:3:3:1 ratio: {{expectedRatio}}
- Deviations and explanations: {{deviations}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['parentGenotypes', 'traits', 'gameteTypes', 'phenotypeRatios', 'expectedRatio', 'deviations', 'additionalNotes'],
  mermaidExample: `flowchart TD
    P["AaBb x AaBb"] --> F1["Gametes: AB, Ab, aB, ab"]
    F1 --> F2["16 Combinations"]
    F2 --> R1["9 A_B_ (Both dominant)"]
    F2 --> R2["3 A_bb (A dominant)"]
    F2 --> R3["3 aaB_ (B dominant)"]
    F2 --> R4["1 aabb (Both recessive)"]`
};

export const pedigreeTemplate: DiagramTemplate = {
  id: 'gen-pedigree-analysis',
  name: 'Pedigree Analysis',
  description: 'Family inheritance chart showing trait transmission',
  domain: 'biology',
  promptTemplate: `Create a pedigree diagram showing:
- Inheritance pattern: {{inheritancePattern}}
- Number of generations: {{generations}}
- Affected individuals: {{affectedIndividuals}}
- Carrier status: {{carriers}}
- Key to symbols: {{symbolKey}}
- Probability calculations: {{probabilities}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['inheritancePattern', 'generations', 'affectedIndividuals', 'carriers', 'symbolKey', 'probabilities', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Gen1["Generation I"]
        A["Male (Affected)"] --- B["Female (Carrier)"]
    end
    subgraph Gen2["Generation II"]
        C["Male (Normal)"]
        D["Female (Carrier)"]
        E["Male (Affected)"]
    end
    A & B --> C & D & E`
};

export const xLinkedInheritanceTemplate: DiagramTemplate = {
  id: 'gen-x-linked',
  name: 'X-Linked Inheritance',
  description: 'Sex-linked trait inheritance pattern',
  domain: 'biology',
  promptTemplate: `Create an X-linked inheritance diagram showing:
- Trait type: {{traitType}}
- Carrier mother genotype: {{motherGenotype}}
- Father genotype: {{fatherGenotype}}
- Offspring probabilities: {{offspringProbabilities}}
- Male vs female expression: {{sexExpression}}
- Example disorders: {{examples}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['traitType', 'motherGenotype', 'fatherGenotype', 'offspringProbabilities', 'sexExpression', 'examples', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Cross["X-Linked Recessive"]
        M["XH Xh (Carrier)"] --- F["XH Y (Normal)"]
    end
    M & F --> D1["XH XH (Normal F)"]
    M & F --> D2["XH Xh (Carrier F)"]
    M & F --> S1["XH Y (Normal M)"]
    M & F --> S2["Xh Y (Affected M)"]`
};

export const codominanceTemplate: DiagramTemplate = {
  id: 'gen-codominance',
  name: 'Codominance Pattern',
  description: 'Inheritance where both alleles are fully expressed',
  domain: 'biology',
  promptTemplate: `Create a codominance diagram showing:
- Alleles involved: {{alleles}}
- Phenotype expressions: {{phenotypes}}
- Classic example: {{example}}
- Cross results: {{crossResults}}
- Comparison to dominance: {{comparison}}
- Medical relevance: {{medicalRelevance}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['alleles', 'phenotypes', 'example', 'crossResults', 'comparison', 'medicalRelevance', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph ABO["ABO Blood Type"]
        IA["IA (Type A)"]
        IB["IB (Type B)"]
    end
    IA --- IB --> AB["IA IB (Type AB)"]
    style AB fill:#DDA0DD`
};

// =============================================================================
// CHROMOSOMAL ANALYSIS
// =============================================================================

export const karyotypeTemplate: DiagramTemplate = {
  id: 'gen-karyotype',
  name: 'Karyotype Analysis',
  description: 'Chromosomal arrangement for genetic diagnosis',
  domain: 'biology',
  promptTemplate: `Create a karyotype diagram showing:
- Chromosome count: {{chromosomeCount}}
- Sex chromosomes: {{sexChromosomes}}
- Banding pattern: {{bandingPattern}}
- Abnormalities detected: {{abnormalities}}
- Diagnosis: {{diagnosis}}
- Clinical significance: {{clinicalSignificance}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['chromosomeCount', 'sexChromosomes', 'bandingPattern', 'abnormalities', 'diagnosis', 'clinicalSignificance', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Karyotype["46,XX or 46,XY"]
        G1["Group A: 1-3"]
        G2["Group B: 4-5"]
        G3["Group C: 6-12 + X"]
        G4["Group D: 13-15"]
        G5["Group E: 16-18"]
        G6["Group F: 19-20"]
        G7["Group G: 21-22 + Y"]
    end`
};

export const chromosomalAbnormalityTemplate: DiagramTemplate = {
  id: 'gen-chromosomal-abnormality',
  name: 'Chromosomal Abnormalities',
  description: 'Types of chromosomal mutations and their effects',
  domain: 'biology',
  promptTemplate: `Create a chromosomal abnormality diagram showing:
- Abnormality type: {{abnormalityType}}
- Mechanism of origin: {{mechanism}}
- Chromosomes affected: {{chromosomesAffected}}
- Phenotypic effects: {{phenotypicEffects}}
- Syndrome name: {{syndromeName}}
- Detection methods: {{detection}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['abnormalityType', 'mechanism', 'chromosomesAffected', 'phenotypicEffects', 'syndromeName', 'detection', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Numerical["Numerical"]
        A["Trisomy 21"] --> B["Down Syndrome"]
        C["Monosomy X"] --> D["Turner Syndrome"]
    end
    subgraph Structural["Structural"]
        E["Deletion"] --> F["Cri-du-chat"]
        G["Translocation"] --> H["CML t(9;22)"]
    end`
};

export const meiosisTemplate: DiagramTemplate = {
  id: 'gen-meiosis-stages',
  name: 'Meiosis Stages',
  description: 'Cell division producing haploid gametes',
  domain: 'biology',
  promptTemplate: `Create a meiosis diagram showing:
- Starting cell: {{startingCell}}
- Meiosis I stages: {{meiosisI}}
- Crossing over: {{crossingOver}}
- Meiosis II stages: {{meiosisII}}
- Final products: {{finalProducts}}
- Genetic variation: {{geneticVariation}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['startingCell', 'meiosisI', 'crossingOver', 'meiosisII', 'finalProducts', 'geneticVariation', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["2n Diploid"] --> B["Prophase I - Crossing Over"]
    B --> C["Metaphase I - Homologs Align"]
    C --> D["Anaphase I - Homologs Separate"]
    D --> E["2 Cells (n)"]
    E --> F["Meiosis II"]
    F --> G["4 Haploid Gametes (n)"]`
};

export const nondisjunctionTemplate: DiagramTemplate = {
  id: 'gen-nondisjunction',
  name: 'Nondisjunction Events',
  description: 'Chromosome segregation errors in cell division',
  domain: 'biology',
  promptTemplate: `Create a nondisjunction diagram showing:
- Division stage: {{divisionStage}}
- Normal segregation: {{normalSegregation}}
- Nondisjunction event: {{nondisjunctionEvent}}
- Resulting gametes: {{resultingGametes}}
- Possible outcomes: {{outcomes}}
- Associated disorders: {{disorders}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['divisionStage', 'normalSegregation', 'nondisjunctionEvent', 'resultingGametes', 'outcomes', 'disorders', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["2n Cell"] --> B{"Meiosis I"}
    B -->|"Normal"| C["n, n"]
    B -->|"Nondisjunction"| D["n+1, n-1"]
    D --> E["Trisomy/Monosomy"]`
};

// =============================================================================
// MUTATION TYPES
// =============================================================================

export const pointMutationTemplate: DiagramTemplate = {
  id: 'gen-point-mutation',
  name: 'Point Mutations',
  description: 'Single nucleotide changes and their effects',
  domain: 'biology',
  promptTemplate: `Create a point mutation diagram showing:
- Original sequence: {{originalSequence}}
- Mutation type: {{mutationType}}
- Changed nucleotide: {{changedNucleotide}}
- Effect on protein: {{proteinEffect}}
- Classification: {{classification}}
- Disease example: {{diseaseExample}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['originalSequence', 'mutationType', 'changedNucleotide', 'proteinEffect', 'classification', 'diseaseExample', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Types["Point Mutation Types"]
        A["Silent: No AA change"]
        B["Missense: Different AA"]
        C["Nonsense: Stop codon"]
    end
    D["GAG to GTG"] --> E["Glu to Val"]
    E --> F["Sickle Cell Disease"]`
};

export const frameshiftMutationTemplate: DiagramTemplate = {
  id: 'gen-frameshift-mutation',
  name: 'Frameshift Mutations',
  description: 'Insertions and deletions altering reading frame',
  domain: 'biology',
  promptTemplate: `Create a frameshift mutation diagram showing:
- Original reading frame: {{originalFrame}}
- Insertion/deletion: {{indel}}
- Shifted reading frame: {{shiftedFrame}}
- Resulting protein: {{resultingProtein}}
- Severity of effect: {{severity}}
- Clinical example: {{clinicalExample}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['originalFrame', 'indel', 'shiftedFrame', 'resultingProtein', 'severity', 'clinicalExample', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["ATG-GCA-TTA-GCT"] --> B["Met-Ala-Leu-Ala"]
    C["+1 Insertion"] --> D["ATG-AGC-ATT-AGC-T"]
    D --> E["Met-Ser-Ile-Ser..."]
    style C fill:#FF6B6B`
};

export const chromosomalMutationTemplate: DiagramTemplate = {
  id: 'gen-chromosomal-mutation',
  name: 'Chromosomal Mutations',
  description: 'Large-scale chromosomal rearrangements',
  domain: 'biology',
  promptTemplate: `Create a chromosomal mutation diagram showing:
- Mutation type: {{mutationType}}
- Original chromosome: {{originalChromosome}}
- Resulting structure: {{resultingStructure}}
- Breakpoints: {{breakpoints}}
- Genetic consequences: {{consequences}}
- Clinical significance: {{clinicalSignificance}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['mutationType', 'originalChromosome', 'resultingStructure', 'breakpoints', 'consequences', 'clinicalSignificance', 'additionalNotes'],
  mermaidExample: `flowchart LR
    subgraph Types["Structural Changes"]
        A["Deletion: A-B-C-D to A-D"]
        B["Duplication: A-B-C to A-B-B-C"]
        C["Inversion: A-B-C-D to A-C-B-D"]
        D["Translocation: Exchange between chr"]
    end`
};

// =============================================================================
// POPULATION GENETICS
// =============================================================================

export const hardyWeinbergTemplate: DiagramTemplate = {
  id: 'gen-hardy-weinberg',
  name: 'Hardy-Weinberg Equilibrium',
  description: 'Population genetics equilibrium calculations',
  domain: 'biology',
  promptTemplate: `Create a Hardy-Weinberg diagram showing:
- Allele frequencies: {{alleleFrequencies}}
- Genotype frequencies: {{genotypeFrequencies}}
- Equilibrium conditions: {{equilibriumConditions}}
- Deviations and causes: {{deviations}}
- Chi-square test: {{chiSquare}}
- Applications: {{applications}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['alleleFrequencies', 'genotypeFrequencies', 'equilibriumConditions', 'deviations', 'chiSquare', 'applications', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["p + q = 1"] --> B["p² + 2pq + q² = 1"]
    B --> C["AA = p²"]
    B --> D["Aa = 2pq"]
    B --> E["aa = q²"]
    F["Conditions: No selection, mutation, migration, drift"]`
};

export const geneticDriftTemplate: DiagramTemplate = {
  id: 'gen-genetic-drift',
  name: 'Genetic Drift',
  description: 'Random changes in allele frequency in small populations',
  domain: 'biology',
  promptTemplate: `Create a genetic drift diagram showing:
- Population size: {{populationSize}}
- Starting frequencies: {{startingFrequencies}}
- Generations shown: {{generations}}
- Drift pattern: {{driftPattern}}
- Bottleneck effect: {{bottleneck}}
- Founder effect: {{founderEffect}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['populationSize', 'startingFrequencies', 'generations', 'driftPattern', 'bottleneck', 'founderEffect', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Large Population"] -->|"Bottleneck"| B["Small Population"]
    B --> C["Random Sampling"]
    C --> D["Changed Allele Freq"]
    E["Founder"] --> F["New Population"]
    F --> G["Limited Diversity"]`
};

export const naturalSelectionTemplate: DiagramTemplate = {
  id: 'gen-natural-selection',
  name: 'Natural Selection Types',
  description: 'Modes of natural selection on trait distributions',
  domain: 'biology',
  promptTemplate: `Create a natural selection diagram showing:
- Selection type: {{selectionType}}
- Original distribution: {{originalDistribution}}
- Selective pressure: {{selectivePressure}}
- Resulting distribution: {{resultingDistribution}}
- Fitness effects: {{fitnessEffects}}
- Examples: {{examples}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['selectionType', 'originalDistribution', 'selectivePressure', 'resultingDistribution', 'fitnessEffects', 'examples', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Types["Selection Types"]
        A["Directional: Shift toward extreme"]
        B["Stabilizing: Favor intermediate"]
        C["Disruptive: Favor both extremes"]
    end`
};

export const linkageMapTemplate: DiagramTemplate = {
  id: 'gen-linkage-map',
  name: 'Genetic Linkage Map',
  description: 'Chromosome mapping using recombination frequencies',
  domain: 'biology',
  promptTemplate: `Create a linkage map showing:
- Chromosome: {{chromosome}}
- Markers/genes: {{markers}}
- Map distances (cM): {{mapDistances}}
- Recombination frequencies: {{recombinationFreq}}
- Mapping method: {{mappingMethod}}
- LOD scores: {{lodScores}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['chromosome', 'markers', 'mapDistances', 'recombinationFreq', 'mappingMethod', 'lodScores', 'additionalNotes'],
  mermaidExample: `flowchart LR
    A["Gene A (0 cM)"] --- B["Gene B (15 cM)"]
    B --- C["Gene C (28 cM)"]
    C --- D["Gene D (45 cM)"]
    E["Recomb. freq = Map distance"]`
};

// =============================================================================
// GENETIC TESTING & COUNSELING
// =============================================================================

export const geneticTestingTemplate: DiagramTemplate = {
  id: 'gen-genetic-testing',
  name: 'Genetic Testing Workflow',
  description: 'Diagnostic genetic testing process and interpretation',
  domain: 'biology',
  promptTemplate: `Create a genetic testing workflow showing:
- Test indication: {{testIndication}}
- Sample collection: {{sampleCollection}}
- Testing method: {{testingMethod}}
- Result types: {{resultTypes}}
- Interpretation: {{interpretation}}
- Follow-up actions: {{followUp}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['testIndication', 'sampleCollection', 'testingMethod', 'resultTypes', 'interpretation', 'followUp', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Indication"] --> B["Sample Collection"]
    B --> C["DNA Extraction"]
    C --> D{"Test Type"}
    D --> E["Single Gene"]
    D --> F["Panel"]
    D --> G["Exome/Genome"]
    E & F & G --> H["Result Interpretation"]`
};

export const carrierScreeningTemplate: DiagramTemplate = {
  id: 'gen-carrier-screening',
  name: 'Carrier Screening',
  description: 'Screening for recessive disease carriers',
  domain: 'biology',
  promptTemplate: `Create a carrier screening diagram showing:
- Diseases screened: {{diseasesScreened}}
- Inheritance pattern: {{inheritancePattern}}
- Carrier detection: {{carrierDetection}}
- Risk calculation: {{riskCalculation}}
- Reproductive options: {{reproductiveOptions}}
- Counseling points: {{counselingPoints}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['diseasesScreened', 'inheritancePattern', 'carrierDetection', 'riskCalculation', 'reproductiveOptions', 'counselingPoints', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Both Partners Screened"] --> B{"Both Carriers?"}
    B -->|"Yes"| C["25% Risk per Pregnancy"]
    B -->|"No"| D["Low Risk"]
    C --> E["Options: PGD, Prenatal, etc."]`
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

export const geneticsTemplates: DiagramTemplate[] = [
  punnettSquareTemplate,
  dihybridCrossTemplate,
  pedigreeTemplate,
  xLinkedInheritanceTemplate,
  codominanceTemplate,
  karyotypeTemplate,
  chromosomalAbnormalityTemplate,
  meiosisTemplate,
  nondisjunctionTemplate,
  pointMutationTemplate,
  frameshiftMutationTemplate,
  chromosomalMutationTemplate,
  hardyWeinbergTemplate,
  geneticDriftTemplate,
  naturalSelectionTemplate,
  linkageMapTemplate,
  geneticTestingTemplate,
  carrierScreeningTemplate,
];

export default geneticsTemplates;
