/**
 * cell-biology-prompts.ts
 * Cell Biology-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for cell biology including:
 * - Cell structure and organelles
 * - Cell division and cycle
 * - Membrane transport
 * - Cell signaling pathways
 * - Gene expression
 * - Cell death mechanisms
 * - Cytoskeleton dynamics
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// CELL BIOLOGY DOMAIN PROMPT
// =============================================================================

/**
 * Base cell biology domain prompt for cellular diagrams
 */
export const CELL_BIOLOGY_DOMAIN_PROMPT = `
Cell Biology diagram requirements:
- Use standard cell biology terminology
- Follow established conventions for organelle representation
- Include scale references where appropriate (nm, um)
- Use consistent color coding for organelles
- Show membrane orientations correctly (cytoplasmic vs extracellular)
- Include directional arrows for transport and signaling
- Reference established pathways (e.g., KEGG, Reactome)
- Use standard protein/gene nomenclature
- Color coding: Nucleus (purple), Mitochondria (red), ER (blue), Golgi (gold)
- Include ATP/energy requirements where relevant`;

// =============================================================================
// CELL BIOLOGY-SPECIFIC PROMPTS
// =============================================================================

export const CELL_BIOLOGY_PROMPTS = {
  // Cell Structure and Organization
  cellStructure: `
Cell Structure Diagram requirements:
- Show all major organelles in correct relative positions
- Include size scale references
- Label membrane-bound vs non-membrane-bound organelles
- Show endomembrane system connections
- Include cytoskeleton elements
- Differentiate between plant and animal cells if relevant
- Show nucleus with nucleolus and chromatin
- Include ribosomes (free and bound)`,

  organelleFunction: `
Organelle Function requirements:
- Map specific functions to each organelle
- Show protein/lipid trafficking pathways
- Include energy production locations
- Show storage compartments
- Indicate pH differences between compartments
- Include relevant enzymes and their locations
- Show membrane composition differences
- Reference metabolic pathway localizations`,

  // Cell Division
  mitosisPhases: `
Mitosis Phase Diagram requirements:
- Show all phases in sequence: Prophase, Prometaphase, Metaphase, Anaphase, Telophase
- Include chromosome condensation progression
- Show spindle apparatus formation and function
- Indicate centrosome duplication and separation
- Show nuclear envelope breakdown and reformation
- Include sister chromatid cohesion and separation
- Show cytokinesis mechanism
- Indicate checkpoint locations (spindle assembly checkpoint)`,

  meiosisRecombination: `
Meiosis and Genetic Recombination requirements:
- Compare Meiosis I and Meiosis II
- Show homologous chromosome pairing (synapsis)
- Illustrate crossing over and recombination
- Include synaptonemal complex
- Show chiasmata formation
- Demonstrate independent assortment
- Calculate chromosome number changes (2n to n)
- Show genetic variation outcomes`,

  cellCycleRegulation: `
Cell Cycle Regulation requirements:
- Show G1, S, G2, and M phases
- Include all checkpoints (G1/S, G2/M, spindle)
- Show cyclin-CDK complexes for each phase
- Include regulatory proteins (p53, Rb, p21)
- Illustrate ubiquitin-proteasome degradation
- Show growth factor signaling input
- Include DNA damage response pathway
- Demonstrate cell cycle arrest mechanisms`,

  // Membrane Transport
  membraneTransport: `
Membrane Transport Diagram requirements:
- Compare passive vs active transport
- Show concentration gradient direction
- Include ATP requirement for active transport
- Illustrate facilitated diffusion channels and carriers
- Show Na+/K+ ATPase mechanism
- Include cotransport/symport/antiport
- Demonstrate electrochemical gradient
- Show vesicular transport mechanisms`,

  endocytosisExocytosis: `
Vesicular Transport requirements:
- Show receptor-mediated endocytosis
- Include clathrin-coated pit formation
- Illustrate early and late endosome maturation
- Show lysosomal degradation pathway
- Include recycling endosome pathway
- Demonstrate exocytosis (constitutive vs regulated)
- Show SNARE-mediated membrane fusion
- Include Rab GTPase regulation`,

  // Cell Signaling
  signalTransduction: `
Signal Transduction Pathway requirements:
- Show ligand-receptor binding
- Include receptor activation mechanism
- Illustrate signal amplification cascade
- Show second messenger generation
- Include kinase cascades (MAPK, PI3K-Akt)
- Demonstrate transcription factor activation
- Show nuclear translocation
- Include feedback loops (positive and negative)`,

  gpcrSignaling: `
GPCR Signaling requirements:
- Show seven-transmembrane receptor structure
- Illustrate G-protein cycle (GDP/GTP exchange)
- Include Gs, Gi, and Gq pathways
- Show adenylyl cyclase activation
- Demonstrate cAMP-PKA pathway
- Include PLC-IP3-Ca2+ pathway
- Show DAG-PKC activation
- Include receptor desensitization (arrestin)`,

  rtkSignaling: `
Receptor Tyrosine Kinase Signaling requirements:
- Show ligand-induced dimerization
- Illustrate autophosphorylation
- Include adaptor protein recruitment (Grb2-SOS)
- Show Ras-MAPK cascade
- Demonstrate PI3K-Akt pathway
- Include transcription factor targets
- Show crosstalk between pathways
- Include negative regulation mechanisms`,

  // Gene Expression
  transcriptionRegulation: `
Transcription Regulation requirements:
- Show promoter elements (TATA box, enhancers)
- Include transcription factor binding
- Illustrate RNA polymerase II recruitment
- Show general transcription factor assembly
- Include chromatin remodeling
- Demonstrate histone modifications
- Show enhancer-promoter looping
- Include transcription elongation and termination`,

  mrnaProcessing: `
mRNA Processing requirements:
- Show 5' capping mechanism
- Illustrate splicing (intron removal)
- Include alternative splicing examples
- Show 3' polyadenylation
- Demonstrate spliceosome assembly
- Include exon junction complex
- Show mRNA export through nuclear pore
- Include mRNA quality control (NMD)`,

  proteinSynthesis: `
Protein Synthesis requirements:
- Show ribosome structure (40S + 60S)
- Illustrate initiation (start codon recognition)
- Include tRNA aminoacylation
- Show elongation cycle
- Demonstrate peptide bond formation
- Include translocation mechanism
- Show termination (stop codon recognition)
- Include cotranslational modifications`,

  // Cell Death and Survival
  apoptosisPathways: `
Apoptosis Pathway requirements:
- Compare intrinsic (mitochondrial) and extrinsic pathways
- Show death receptor signaling (Fas, TNF)
- Include DISC formation and caspase-8 activation
- Demonstrate mitochondrial outer membrane permeabilization
- Show cytochrome c release and apoptosome
- Include Bcl-2 family protein interactions
- Demonstrate caspase cascade (initiators to executioners)
- Show cellular changes (blebbing, DNA fragmentation)`,

  autophagyMechanism: `
Autophagy Mechanism requirements:
- Show mTOR regulation of autophagy
- Include ULK1 complex activation
- Illustrate phagophore formation
- Show LC3 lipidation and conjugation
- Demonstrate cargo recognition (p62/SQSTM1)
- Include autophagosome maturation
- Show lysosome fusion
- Demonstrate selective autophagy types (mitophagy, ER-phagy)`,

  // Cytoskeleton
  cytoskeletonDynamics: `
Cytoskeleton Dynamics requirements:
- Compare microfilaments, intermediate filaments, microtubules
- Show actin polymerization (ATP-dependent)
- Include treadmilling mechanism
- Demonstrate microtubule dynamic instability
- Show nucleation sites (MTOC, actin nucleators)
- Include motor protein movement
- Demonstrate cell shape and motility roles
- Show regulation by signaling (Rho GTPases)`,

  motorProteins: `
Motor Protein Function requirements:
- Compare kinesin, dynein, and myosin
- Show ATP hydrolysis cycle
- Illustrate processivity and step size
- Include cargo attachment mechanisms
- Demonstrate plus-end and minus-end motors
- Show intracellular transport examples
- Include cell division roles (spindle motors)
- Demonstrate regulation by phosphorylation`,

  // Specialized Topics
  cellJunctions: `
Cell Junction Diagram requirements:
- Show tight junction structure and function
- Include adherens junction components (E-cadherin)
- Illustrate desmosome structure
- Demonstrate gap junction communication
- Show hemidesmosome-ECM attachment
- Include barrier function measurement
- Show junction assembly and disassembly
- Demonstrate tissue-specific junction patterns`,

  stemCellBiology: `
Stem Cell Biology requirements:
- Define potency levels (totipotent to unipotent)
- Show self-renewal mechanisms
- Include asymmetric vs symmetric division
- Demonstrate lineage commitment
- Show niche signaling (Wnt, Notch, BMP)
- Include epigenetic regulation
- Demonstrate induced pluripotency (Yamanaka factors)
- Show therapeutic applications`,

  cellularStress: `
Cellular Stress Response requirements:
- Show heat shock response (HSF1, Hsp70/90)
- Include unfolded protein response (UPR)
- Demonstrate oxidative stress response (Nrf2)
- Show DNA damage response (ATM/ATR)
- Include hypoxia response (HIF pathway)
- Demonstrate ER stress and ERAD
- Show stress granule formation
- Include autophagy activation by stress`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Cell biology-specific few-shot examples
 */
export const CELL_BIOLOGY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a flowchart showing the stages of the cell cycle with checkpoints',
    output: `flowchart TB
    subgraph CellCycle["Cell Cycle"]
        G0[G0 - Quiescence] --> |Growth signals| G1
        G1[G1 Phase - Growth] --> |Restriction Point| CHECK1{"G1/S\\nCheckpoint"}
        CHECK1 --> |DNA OK| S[S Phase - DNA Synthesis]
        CHECK1 --> |DNA damage| ARREST1[Cell Cycle Arrest]
        S --> G2[G2 Phase - Preparation]
        G2 --> CHECK2{"G2/M\\nCheckpoint"}
        CHECK2 --> |Ready| M[M Phase - Mitosis]
        CHECK2 --> |Not ready| ARREST2[Delay]
        M --> CHECK3{"Spindle\\nCheckpoint"}
        CHECK3 --> |Aligned| CYTO[Cytokinesis]
        CHECK3 --> |Not aligned| WAIT[Wait for Alignment]
        CYTO --> G1
    end

    subgraph Regulation["Key Regulators"]
        CYCLIN[Cyclins] --> CDK[CDKs]
        CDK --> PROG[Progression]
        P53[p53] --> |Inhibits| CDK
        RB[Rb] --> |Inhibits| E2F[E2F]
    end

    style G1 fill:#3498DB
    style S fill:#27AE60
    style G2 fill:#F39C12
    style M fill:#E74C3C
    style CHECK1 fill:#FFC107
    style CHECK2 fill:#FFC107
    style CHECK3 fill:#FFC107`,
  },
  {
    prompt: 'Create a diagram of the endomembrane system and protein trafficking',
    output: `flowchart LR
    subgraph Trafficking["Endomembrane System"]
        NUC[Nucleus] --> |mRNA| RIBO[Ribosome]
        RIBO --> |Signal sequence| RER[Rough ER]
        RIBO --> |No signal| CYTO[Cytosolic protein]

        subgraph ER["Endoplasmic Reticulum"]
            RER --> |Folding QC| ERAD{Quality\\nControl}
            ERAD --> |Pass| EXIT[ER Exit Sites]
            ERAD --> |Fail| DEGRAD[Degradation]
        end

        EXIT --> |COPII vesicles| CGN[cis-Golgi]

        subgraph Golgi["Golgi Apparatus"]
            CGN --> MGN[medial-Golgi]
            MGN --> TGN[trans-Golgi]
        end

        TGN --> |Clathrin| PM[Plasma Membrane]
        TGN --> |M6P tag| LYS[Lysosome]
        TGN --> |Secretory| SEC[Secretory Vesicle]

        CGN --> |COPI retrograde| RER
    end

    style RER fill:#3498DB
    style Golgi fill:#F39C12
    style LYS fill:#9B59B6
    style PM fill:#27AE60`,
  },
  {
    prompt: 'Create a diagram showing receptor tyrosine kinase signaling cascade',
    output: `flowchart TB
    subgraph RTK["RTK Signaling"]
        GF[Growth Factor] --> |Binding| RTK1[RTK Monomer]
        GF --> RTK2[RTK Monomer]
        RTK1 --> |Dimerization| DIM[RTK Dimer]
        RTK2 --> DIM

        DIM --> |Autophosphorylation| pRTK[p-RTK]

        pRTK --> GRB2[Grb2 Recruitment]
        GRB2 --> SOS[SOS - GEF]

        subgraph RasMAPK["Ras-MAPK Pathway"]
            SOS --> RAS[Ras-GTP]
            RAS --> RAF[Raf]
            RAF --> MEK[MEK]
            MEK --> ERK[ERK]
            ERK --> TF1[Transcription Factors]
        end

        pRTK --> PI3K[PI3K]

        subgraph PI3KAkt["PI3K-Akt Pathway"]
            PI3K --> PIP3[PIP3]
            PIP3 --> AKT[Akt/PKB]
            AKT --> MTOR[mTOR]
            AKT --> TF2[Survival Signals]
        end
    end

    TF1 --> GENE[Gene Expression]
    TF2 --> GENE

    style GF fill:#E74C3C
    style pRTK fill:#27AE60
    style ERK fill:#3498DB
    style AKT fill:#9B59B6`,
  },
  {
    prompt: 'Create a diagram comparing intrinsic and extrinsic apoptosis pathways',
    output: `flowchart TB
    subgraph Apoptosis["Apoptosis Pathways"]
        subgraph Extrinsic["Extrinsic Pathway"]
            DEATH[Death Ligand\\nFasL, TNF] --> RECEP[Death Receptor\\nFas, TNFR]
            RECEP --> DISC[DISC Formation]
            DISC --> CASP8[Caspase-8\\nInitiator]
        end

        subgraph Intrinsic["Intrinsic Pathway"]
            STRESS[Cell Stress\\nDNA Damage] --> P53[p53 Activation]
            P53 --> BAX[Bax/Bak\\nPro-apoptotic]
            BCL2[Bcl-2/Bcl-xL] --> |Inhibits| BAX
            BAX --> MOMP[MOMP\\nMitochondrial Permeabilization]
            MOMP --> CYTC[Cytochrome c\\nRelease]
            CYTC --> APAF[Apaf-1]
            APAF --> APOP[Apoptosome]
            APOP --> CASP9[Caspase-9\\nInitiator]
        end

        CASP8 --> CASP3[Caspase-3/7\\nExecutioner]
        CASP9 --> CASP3

        CASP8 --> |Bid cleavage| tBID[tBid]
        tBID --> MOMP

        CASP3 --> DNA[DNA Fragmentation]
        CASP3 --> BLEB[Membrane Blebbing]
        CASP3 --> BODY[Apoptotic Bodies]
    end

    style DEATH fill:#E74C3C
    style STRESS fill:#F39C12
    style CASP3 fill:#9B59B6
    style BODY fill:#BB8FCE`,
  },
  {
    prompt: 'Create a diagram of mitotic spindle assembly and chromosome segregation',
    output: `flowchart TB
    subgraph Mitosis["Mitotic Spindle & Segregation"]
        subgraph Prophase["Prophase"]
            DUP[Centrosome Duplication] --> SEP[Centrosome Separation]
            CHROM[Chromosome Condensation] --> SISTER[Sister Chromatids]
        end

        subgraph Prometaphase["Prometaphase"]
            SEP --> MT[Microtubule Nucleation]
            NEB[Nuclear Envelope Breakdown]
            MT --> SEARCH[Search & Capture]
            SEARCH --> ATTACH[Kinetochore Attachment]
        end

        subgraph Metaphase["Metaphase"]
            ATTACH --> ALIGN[Chromosome Alignment]
            ALIGN --> PLATE[Metaphase Plate]
            PLATE --> SAC{Spindle Assembly\\nCheckpoint}
        end

        subgraph Anaphase["Anaphase"]
            SAC --> |All attached| SEPAR[Cohesin Cleavage]
            SAC --> |Not attached| WAIT[Wait Signal]
            SEPAR --> MOVE[Chromatid Movement]
            MOVE --> POLES[Opposite Poles]
        end

        subgraph Telophase["Telophase"]
            POLES --> DECOND[Decondensation]
            POLES --> REFORM[Nuclear Envelope Reform]
            REFORM --> CYTO[Cytokinesis]
        end
    end

    style SAC fill:#FFC107
    style SEPAR fill:#E74C3C
    style CYTO fill:#27AE60`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

export default {
  CELL_BIOLOGY_DOMAIN_PROMPT,
  CELL_BIOLOGY_PROMPTS,
  CELL_BIOLOGY_FEW_SHOT_EXAMPLES,
};
