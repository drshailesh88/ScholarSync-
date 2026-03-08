/**
 * molecular-biology-prompts.ts
 * Molecular Biology-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for molecular biology including:
 * - DNA/RNA structure and replication
 * - Transcription and translation
 * - Gene regulation and expression
 * - Protein structure and function
 * - Laboratory techniques (PCR, sequencing, cloning)
 * - CRISPR and gene editing
 * - Epigenetics and chromatin
 * - Molecular pathways
 *
 * Total: 25 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// MOLECULAR BIOLOGY DOMAIN PROMPT
// =============================================================================

/**
 * Base molecular biology domain prompt for molecular diagrams
 */
export const MOLECULAR_BIOLOGY_DOMAIN_PROMPT = `
Molecular Biology diagram requirements:
- Use standard molecular biology terminology
- Follow established conventions for DNA/RNA representation (5' to 3')
- Include scale references where appropriate (bp, kb, Mb)
- Use consistent color coding for nucleotides (A, T, G, C, U)
- Show directionality correctly (5' cap, 3' poly-A tail)
- Include enzyme names and their functions
- Reference established databases (GenBank, UniProt, KEGG)
- Use standard protein/gene nomenclature (italics for genes)
- Color coding: DNA (blue), RNA (red), Proteins (green), Enzymes (orange)
- Include molecular weights and sizes where relevant`;

// =============================================================================
// MOLECULAR BIOLOGY-SPECIFIC PROMPTS
// =============================================================================

export const MOLECULAR_BIOLOGY_PROMPTS = {
  // DNA Structure and Replication
  dnaStructure: `
DNA Structure Diagram requirements:
- Show double helix with major and minor grooves
- Include base pairing (A-T with 2 H-bonds, G-C with 3 H-bonds)
- Label sugar-phosphate backbone
- Show 5' and 3' ends on both strands
- Include nucleotide components (base, sugar, phosphate)
- Demonstrate anti-parallel orientation
- Show B-DNA, A-DNA, or Z-DNA forms if relevant
- Include measurements (3.4 nm per turn, 10 bp per turn)`,

  dnaReplication: `
DNA Replication Diagram requirements:
- Show replication fork with leading and lagging strands
- Include origin of replication (ORC, licensing)
- Label helicase unwinding and topoisomerase relief
- Show primase and primer synthesis
- Include DNA polymerase III for elongation
- Show Okazaki fragments on lagging strand
- Include DNA ligase for fragment joining
- Demonstrate proofreading (3' to 5' exonuclease)
- Show sliding clamp (PCNA) and clamp loader`,

  // Transcription
  transcription: `
Transcription Diagram requirements:
- Show promoter elements (TATA box, -10, -35 boxes)
- Include RNA polymerase (II for eukaryotes)
- Label template and coding strands
- Show transcription bubble
- Include general transcription factors (TFIIA-H)
- Demonstrate elongation with nascent RNA
- Show termination signals (poly-A signal, Rho-dependent)
- Include CTD phosphorylation for Pol II`,

  rnaProcessing: `
RNA Processing Diagram requirements:
- Show 5' capping (7-methylguanosine)
- Include splicing mechanism (spliceosome U1-U6)
- Demonstrate intron removal and exon ligation
- Show branch point adenosine
- Include alternative splicing patterns
- Show 3' polyadenylation (CPSF, PAP)
- Include mRNA export through nuclear pore
- Demonstrate quality control (NMD, exosome)`,

  // Translation
  translation: `
Translation Diagram requirements:
- Show ribosome structure (40S + 60S for eukaryotes)
- Include initiation factors (eIF1, eIF2, eIF4)
- Label A, P, E sites
- Show tRNA with anticodon and amino acid
- Demonstrate peptidyl transferase reaction
- Include elongation factors (eEF1, eEF2)
- Show translocation mechanism
- Include release factors and termination
- Demonstrate polysome structure`,

  geneticCode: `
Genetic Code Diagram requirements:
- Show codon table (64 codons)
- Include start codon (AUG = Met)
- Label stop codons (UAA, UAG, UGA)
- Show wobble base pairing at position 3
- Include amino acid properties (polar, nonpolar, charged)
- Demonstrate reading frame concept
- Show degeneracy of genetic code
- Include tRNA charging (aminoacyl-tRNA synthetases)`,

  // Gene Regulation
  geneRegulation: `
Gene Regulation Diagram requirements:
- Show cis-regulatory elements (promoters, enhancers, silencers)
- Include transcription factors (activators, repressors)
- Demonstrate enhancer-promoter looping
- Show chromatin accessibility
- Include Mediator complex
- Demonstrate combinatorial control
- Show negative and positive feedback
- Include post-transcriptional regulation (miRNA, RBPs)`,

  operonRegulation: `
Operon Regulation Diagram requirements:
- Show operon structure (promoter, operator, genes)
- Include regulatory gene (repressor/activator)
- Demonstrate inducible vs repressible systems
- Show lac operon as example (lacZ, Y, A)
- Include CAP-cAMP positive control
- Demonstrate allosteric regulation of repressor
- Show trp operon attenuation
- Include polycistronic mRNA concept`,

  // Protein Structure
  proteinStructure: `
Protein Structure Diagram requirements:
- Show all four levels (primary, secondary, tertiary, quaternary)
- Include alpha helix hydrogen bonding pattern
- Show beta sheet parallel and antiparallel
- Demonstrate disulfide bonds
- Include hydrophobic core concept
- Show domains and motifs
- Demonstrate allosteric conformational changes
- Include chaperone-assisted folding (Hsp70, Hsp90)`,

  enzymeCatalysis: `
Enzyme Catalysis Diagram requirements:
- Show active site structure
- Include induced fit model
- Demonstrate transition state stabilization
- Show Michaelis-Menten kinetics (Km, Vmax)
- Include competitive and non-competitive inhibition
- Demonstrate allosteric regulation
- Show enzyme mechanisms (acid-base, covalent)
- Include cofactor/coenzyme requirements`,

  // CRISPR and Gene Editing
  crisprMechanism: `
CRISPR-Cas9 Diagram requirements:
- Show guide RNA structure (crRNA + tracrRNA or sgRNA)
- Include PAM sequence recognition (NGG for SpCas9)
- Demonstrate DNA unwinding and R-loop formation
- Show HNH and RuvC nuclease domains
- Include double-strand break formation
- Demonstrate NHEJ repair (indels)
- Show HDR pathway with template
- Include base editing and prime editing variants`,

  geneEditing: `
Gene Editing Technology Diagram requirements:
- Compare CRISPR, TALENs, ZFNs
- Show DNA binding domain specificity
- Include nuclease domain (FokI for TALENs/ZFNs)
- Demonstrate delivery methods (plasmid, RNP, viral)
- Show screening strategies
- Include off-target considerations
- Demonstrate knock-out vs knock-in strategies
- Show therapeutic applications`,

  // Laboratory Techniques
  pcrAmplification: `
PCR Amplification Diagram requirements:
- Show thermal cycling steps (denaturation, annealing, extension)
- Include primer design (Tm, GC content)
- Demonstrate exponential amplification
- Show Taq polymerase and thermostable variants
- Include hot-start PCR modifications
- Demonstrate qPCR/RT-PCR principles
- Show gel electrophoresis verification
- Include troubleshooting (primer dimers, non-specific)`,

  dnaSequencing: `
DNA Sequencing Diagram requirements:
- Compare Sanger and NGS methods
- Show chain termination with ddNTPs
- Include fluorescent labeling
- Demonstrate capillary electrophoresis
- Show Illumina sequencing by synthesis
- Include bridge amplification
- Demonstrate nanopore sequencing
- Show bioinformatics pipeline (alignment, variant calling)`,

  molecularCloning: `
Molecular Cloning Diagram requirements:
- Show restriction enzyme digestion (type II endonucleases)
- Include sticky ends and blunt ends
- Demonstrate ligation (T4 DNA ligase)
- Show vector elements (ori, selectable marker, MCS)
- Include transformation/transfection
- Demonstrate blue-white screening
- Show colony PCR verification
- Include expression vector elements (promoter, RBS, tag)`,

  westernBlotting: `
Western Blot Diagram requirements:
- Show sample preparation (lysis, denaturation)
- Include SDS-PAGE separation
- Demonstrate transfer to membrane
- Show blocking and antibody incubation
- Include primary and secondary antibody
- Demonstrate detection (HRP, fluorescence)
- Show molecular weight ladder
- Include loading controls and normalization`,

  // Epigenetics
  epigeneticsMethylation: `
DNA Methylation Diagram requirements:
- Show CpG islands and dinucleotides
- Include DNMT enzymes (DNMT1, 3A, 3B)
- Demonstrate maintenance vs de novo methylation
- Show TET enzymes and demethylation
- Include 5mC, 5hmC, 5fC, 5caC
- Demonstrate gene silencing mechanism
- Show imprinting and X-inactivation
- Include bisulfite sequencing method`,

  histoneModifications: `
Histone Modification Diagram requirements:
- Show nucleosome structure (H2A, H2B, H3, H4)
- Include histone tail modifications
- Demonstrate acetylation (HATs, HDACs)
- Show methylation (HMTs, KDMs)
- Include phosphorylation and ubiquitination
- Demonstrate histone code hypothesis
- Show writers, erasers, and readers
- Include chromatin states (eu- vs heterochromatin)`,

  // Molecular Pathways
  signalTransduction: `
Signal Transduction Diagram requirements:
- Show receptor-ligand binding
- Include signal amplification cascade
- Demonstrate second messengers (cAMP, Ca2+, DAG, IP3)
- Show kinase cascades (MAPK, PI3K-Akt)
- Include transcription factor activation
- Demonstrate nuclear translocation
- Show target gene activation
- Include feedback mechanisms`,

  apoptosisPathway: `
Apoptosis Pathway Diagram requirements:
- Show intrinsic and extrinsic pathways
- Include death receptors (Fas, TNFR)
- Demonstrate DISC formation
- Show mitochondrial outer membrane permeabilization
- Include Bcl-2 family members
- Demonstrate cytochrome c release
- Show caspase cascade (8, 9, 3, 7)
- Include execution phase markers`,

  // Advanced Techniques
  rnaiMechanism: `
RNAi Mechanism Diagram requirements:
- Show siRNA and shRNA structure
- Include Dicer processing
- Demonstrate RISC complex assembly
- Show Argonaute protein
- Include guide strand selection
- Demonstrate target mRNA cleavage
- Show miRNA vs siRNA differences
- Include therapeutic applications`,

  massSpectrometry: `
Mass Spectrometry Diagram requirements:
- Show protein sample preparation
- Include ionization methods (ESI, MALDI)
- Demonstrate mass analyzer types (TOF, Orbitrap)
- Show MS/MS fragmentation
- Include peptide identification
- Demonstrate database searching
- Show quantitation methods (label-free, TMT, SILAC)
- Include proteomics workflow`,

  // Structural Biology
  xrayCrystallography: `
X-ray Crystallography Diagram requirements:
- Show protein crystallization
- Include diffraction pattern
- Demonstrate Bragg's law
- Show electron density map
- Include phasing methods (MIR, MAD, MR)
- Demonstrate model building
- Show refinement process
- Include resolution and R-factors`,

  cryoEM: `
Cryo-EM Diagram requirements:
- Show sample vitrification
- Include electron microscopy imaging
- Demonstrate single particle analysis
- Show 2D class averages
- Include 3D reconstruction
- Demonstrate resolution determination
- Show atomic model fitting
- Include advantages over X-ray crystallography`,

  // Genome Organization
  chromatinStructure: `
Chromatin Structure Diagram requirements:
- Show nucleosome (147 bp DNA, histone octamer)
- Include linker DNA and H1 histone
- Demonstrate 10 nm and 30 nm fibers
- Show chromosome territories
- Include TADs and loop domains
- Demonstrate CTCF and cohesin
- Show lamina-associated domains
- Include nuclear organization`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Molecular biology-specific few-shot examples
 */
export const MOLECULAR_BIOLOGY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a flowchart showing the central dogma of molecular biology',
    output: `flowchart LR
    subgraph CentralDogma["Central Dogma of Molecular Biology"]
        DNA[DNA] -->|Replication\\nDNA Polymerase| DNA
        DNA -->|Transcription\\nRNA Polymerase| RNA[RNA]
        RNA -->|Translation\\nRibosome| PROTEIN[Protein]

        RNA -.->|Reverse Transcription\\nReverse Transcriptase| DNA
        RNA -.->|RNA Replication\\nRNA Replicase| RNA
    end

    subgraph Legend[""]
        SOLID[Solid = Common]
        DASHED[Dashed = Special cases]
    end

    style DNA fill:#3498DB
    style RNA fill:#E74C3C
    style PROTEIN fill:#27AE60`,
  },
  {
    prompt: 'Create a diagram showing the DNA replication fork with all enzymes',
    output: `flowchart TB
    subgraph ReplicationFork["DNA Replication Fork"]
        subgraph Unwinding["DNA Unwinding"]
            ORI[Origin of Replication] --> HELI[Helicase]
            HELI --> SSB[SSB Proteins]
            TOPO[Topoisomerase] -.-> |Relieves tension| HELI
        end

        subgraph Leading["Leading Strand 5' to 3'"]
            HELI --> SLIDE1[Sliding Clamp]
            SLIDE1 --> POL3A[DNA Pol III]
            POL3A --> |Continuous synthesis| LEAD[New DNA]
        end

        subgraph Lagging["Lagging Strand 5' to 3'"]
            HELI --> PRIM[Primase]
            PRIM --> |RNA primer| POL3B[DNA Pol III]
            POL3B --> OKA[Okazaki Fragment]
            OKA --> POL1[DNA Pol I]
            POL1 --> |Remove primers| LIG[DNA Ligase]
            LIG --> LAG[New DNA]
        end
    end

    style HELI fill:#E74C3C
    style POL3A fill:#27AE60
    style POL3B fill:#27AE60
    style PRIM fill:#F39C12
    style LIG fill:#9B59B6`,
  },
  {
    prompt: 'Create a diagram showing mRNA processing in eukaryotes',
    output: `flowchart TB
    subgraph mRNAProcessing["Eukaryotic mRNA Processing"]
        PRE[Pre-mRNA] --> CAP["5' Capping"]
        CAP --> |7-methylguanosine| CAPPED[Capped pre-mRNA]

        CAPPED --> SPLICE[Splicing]
        subgraph SplicingDetail["Spliceosome"]
            EXON1[Exon 1] --> INTRON[Intron]
            INTRON --> EXON2[Exon 2]
            U1[U1 snRNP] --> INTRON
            U2[U2 snRNP] --> BRANCH[Branch Point A]
            LARIAT[Lariat Intron] --> DEGRADE[Degraded]
        end

        SPLICE --> POLYA["3' Polyadenylation"]
        POLYA --> |AAUAAA signal| TAIL[Poly-A Tail ~200 A's]

        TAIL --> EXPORT[Nuclear Export]
        EXPORT --> |NPC| CYTO[Cytoplasm]
        CYTO --> RIBO[Ribosome]
    end

    style PRE fill:#E74C3C
    style CAP fill:#F39C12
    style SPLICE fill:#3498DB
    style POLYA fill:#27AE60
    style EXPORT fill:#9B59B6`,
  },
  {
    prompt: 'Create a diagram showing CRISPR-Cas9 gene editing mechanism',
    output: `flowchart TB
    subgraph CRISPR["CRISPR-Cas9 Gene Editing"]
        subgraph Recognition["Target Recognition"]
            sgRNA[sgRNA] --> |20 nt spacer| TARGET[Target DNA]
            PAM[PAM: NGG] --> |Required for binding| TARGET
        end

        subgraph Cleavage["DNA Cleavage"]
            CAS9[Cas9 Protein] --> TARGET
            HNH[HNH Domain] --> |Cuts complementary| COMP[Strand]
            RUVC[RuvC Domain] --> |Cuts non-complementary| NONCOMP[Strand]
            DSB[Double-Strand Break]
        end

        subgraph Repair["DNA Repair"]
            DSB --> NHEJ[NHEJ Pathway]
            DSB --> HDR[HDR Pathway]

            NHEJ --> INDEL[Insertions/Deletions]
            INDEL --> KO[Gene Knockout]

            HDR --> TEMPLATE[Donor Template]
            TEMPLATE --> PRECISE[Precise Edit]
            PRECISE --> KI[Gene Knock-in]
        end
    end

    style sgRNA fill:#E74C3C
    style CAS9 fill:#9B59B6
    style DSB fill:#F39C12
    style KO fill:#95A5A6
    style KI fill:#27AE60`,
  },
  {
    prompt: 'Create a diagram showing the lac operon regulation',
    output: `flowchart TB
    subgraph LacOperon["Lac Operon Regulation"]
        subgraph Structure["Operon Structure"]
            PROMO[Promoter] --> OPER[Operator]
            OPER --> LACZ[lacZ\\nbeta-galactosidase]
            LACZ --> LACY[lacY\\npermease]
            LACY --> LACA[lacA\\ntransacetylase]
            LACI[lacI] --> |Constitutive| REP[Repressor]
        end

        subgraph NoLactose["No Lactose: OFF"]
            REP --> |Binds| OPER
            BLOCK[Transcription Blocked]
        end

        subgraph WithLactose["With Lactose: ON"]
            ALLO[Allolactose] --> |Binds| REP2[Repressor]
            REP2 --> |Conformational change| RELEASE[Releases Operator]
            TRANS[Transcription Proceeds]
        end

        subgraph CataboliteRepression["Catabolite Repression"]
            CAMP[Low Glucose = High cAMP]
            CAMP --> CAP[CAP-cAMP]
            CAP --> |Binds upstream| PROMO
            ENHANCE[Enhanced Transcription]
        end
    end

    style REP fill:#E74C3C
    style ALLO fill:#27AE60
    style CAP fill:#F39C12
    style LACZ fill:#3498DB`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

const molecularBiologyPrompts = {
  MOLECULAR_BIOLOGY_DOMAIN_PROMPT,
  MOLECULAR_BIOLOGY_PROMPTS,
  MOLECULAR_BIOLOGY_FEW_SHOT_EXAMPLES,
};

export default molecularBiologyPrompts;
