// Cell Biology diagram templates for scientific illustration
import type { DiagramTemplate } from './index';

export const cellMembraneStructureTemplate: DiagramTemplate = {
  id: 'cell-membrane-structure',
  name: 'Cell Membrane Fluid Mosaic Model',
  description: 'Detailed diagram of phospholipid bilayer with embedded proteins',
  domain: 'biology',
  promptTemplate: `Create a cell membrane diagram showing:
- Phospholipid bilayer: {{phospholipidBilayer}}
- Integral proteins: {{integralProteins}}
- Peripheral proteins: {{peripheralProteins}}
- Cholesterol: {{cholesterol}}
- Glycocalyx: {{glycocalyx}}

Show fluid mosaic model with all membrane components.`,
  placeholders: ['phospholipidBilayer', 'integralProteins', 'peripheralProteins', 'cholesterol', 'glycocalyx'],
  mermaidExample: `flowchart TB
    subgraph Membrane["Cell Membrane Structure"]
        subgraph Bilayer["Phospholipid Bilayer"]
            HEAD1[Hydrophilic Heads - Outer]
            TAIL[Hydrophobic Tails]
            HEAD2[Hydrophilic Heads - Inner]
        end
        subgraph Proteins["Membrane Proteins"]
            INT[Integral Proteins]
            PER[Peripheral Proteins]
            CHAN[Channel Proteins]
            RECEP[Receptor Proteins]
        end
        CHOL[Cholesterol] --> Bilayer
        GLYCO[Glycocalyx] --> HEAD1
    end`
};

export const mitosisTemplate: DiagramTemplate = {
  id: 'cell-mitosis',
  name: 'Mitosis Cell Division',
  description: 'Diagram showing all phases of mitotic cell division',
  domain: 'biology',
  promptTemplate: `Create a mitosis diagram showing:
- Interphase preparation: {{interphase}}
- Prophase events: {{prophase}}
- Metaphase alignment: {{metaphase}}
- Anaphase separation: {{anaphase}}
- Telophase/Cytokinesis: {{telophase}}

Include chromosome behavior and spindle apparatus.`,
  placeholders: ['interphase', 'prophase', 'metaphase', 'anaphase', 'telophase'],
  mermaidExample: `flowchart LR
    subgraph Mitosis["Mitosis Phases"]
        INT[Interphase - DNA Replication] --> PRO[Prophase]
        PRO --> |Chromosome condensation| META[Metaphase]
        META --> |Alignment at plate| ANA[Anaphase]
        ANA --> |Sister chromatid separation| TELO[Telophase]
        TELO --> CYTO[Cytokinesis]
        CYTO --> DAUGH[2 Daughter Cells 2n]
    end`
};

export const meiosisTemplate: DiagramTemplate = {
  id: 'cell-meiosis',
  name: 'Meiosis Cell Division',
  description: 'Diagram showing both meiotic divisions with genetic variation',
  domain: 'biology',
  promptTemplate: `Create a meiosis diagram showing:
- Meiosis I events: {{meiosisI}}
- Crossing over: {{crossingOver}}
- Meiosis II events: {{meiosisII}}
- Chromosome reduction: {{reduction}}
- Gamete formation: {{gameteFormation}}

Show homologous chromosome pairing and recombination.`,
  placeholders: ['meiosisI', 'crossingOver', 'meiosisII', 'reduction', 'gameteFormation'],
  mermaidExample: `flowchart TB
    subgraph Meiosis["Meiosis Overview"]
        START[Parent Cell 2n] --> PI[Prophase I - Crossing Over]
        PI --> MI[Metaphase I - Homolog Pairing]
        MI --> AI[Anaphase I - Homolog Separation]
        AI --> TI[Telophase I]
        TI --> |Meiosis I Complete| TWO[2 Cells n]
        TWO --> PII[Prophase II]
        PII --> MII[Metaphase II]
        MII --> AII[Anaphase II]
        AII --> TII[Telophase II]
        TII --> FOUR[4 Gametes n]
    end`
};

export const endomembraneSystemTemplate: DiagramTemplate = {
  id: 'cell-endomembrane',
  name: 'Endomembrane System',
  description: 'Diagram showing protein trafficking through endomembrane system',
  domain: 'biology',
  promptTemplate: `Create an endomembrane system diagram showing:
- Rough ER function: {{roughER}}
- Smooth ER function: {{smoothER}}
- Golgi apparatus: {{golgiApparatus}}
- Vesicle trafficking: {{vesicleTrafficking}}
- Secretory pathway: {{secretoryPathway}}

Show protein synthesis, modification, and secretion.`,
  placeholders: ['roughER', 'smoothER', 'golgiApparatus', 'vesicleTrafficking', 'secretoryPathway'],
  mermaidExample: `flowchart LR
    subgraph Endomembrane["Endomembrane System"]
        NUC[Nucleus] --> RER[Rough ER]
        RER --> |Vesicle| CGN[cis-Golgi]
        CGN --> MGN[medial-Golgi]
        MGN --> TGN[trans-Golgi]
        TGN --> SEC[Secretory Vesicles]
        TGN --> LYS[Lysosomes]
        SEC --> PM[Plasma Membrane]
        SER[Smooth ER] --> |Lipid synthesis| PM
    end`
};

export const mitochondriaStructureTemplate: DiagramTemplate = {
  id: 'cell-mitochondria',
  name: 'Mitochondrial Structure and Function',
  description: 'Detailed diagram of mitochondria and oxidative phosphorylation',
  domain: 'biology',
  promptTemplate: `Create a mitochondria diagram showing:
- Outer membrane: {{outerMembrane}}
- Inner membrane cristae: {{cristae}}
- Matrix: {{matrix}}
- Electron transport chain: {{etc}}
- ATP synthase: {{atpSynthase}}

Include TCA cycle location and proton gradient.`,
  placeholders: ['outerMembrane', 'cristae', 'matrix', 'etc', 'atpSynthase'],
  mermaidExample: `flowchart TB
    subgraph Mitochondria["Mitochondrial Structure"]
        OUTER[Outer Membrane] --> IMS[Intermembrane Space]
        IMS --> INNER[Inner Membrane/Cristae]
        INNER --> MAT[Matrix]
        subgraph Matrix["Matrix"]
            TCA[TCA Cycle]
            MTDNA[mtDNA]
        end
        subgraph Cristae["Inner Membrane"]
            CI[Complex I] --> CII[Complex II]
            CII --> CIII[Complex III]
            CIII --> CIV[Complex IV]
            CIV --> ATP[ATP Synthase]
        end
    end`
};

export const chloroplastStructureTemplate: DiagramTemplate = {
  id: 'cell-chloroplast',
  name: 'Chloroplast Structure and Function',
  description: 'Detailed diagram of chloroplast and photosynthesis locations',
  domain: 'biology',
  promptTemplate: `Create a chloroplast diagram showing:
- Double membrane: {{doubleMembrane}}
- Thylakoid structure: {{thylakoid}}
- Grana stacks: {{grana}}
- Stroma: {{stroma}}
- Photosystem locations: {{photosystems}}

Show light reaction and Calvin cycle locations.`,
  placeholders: ['doubleMembrane', 'thylakoid', 'grana', 'stroma', 'photosystems'],
  mermaidExample: `flowchart TB
    subgraph Chloroplast["Chloroplast Structure"]
        OUTER[Outer Membrane] --> INNER[Inner Membrane]
        INNER --> STROMA[Stroma - Calvin Cycle]
        STROMA --> GRANA[Grana Stacks]
        subgraph Thylakoid["Thylakoid Membrane"]
            PSII[Photosystem II]
            ETC[Electron Transport]
            PSI[Photosystem I]
            ATPS[ATP Synthase]
        end
        GRANA --> Thylakoid
    end`
};

export const cellSignalingTemplate: DiagramTemplate = {
  id: 'cell-signaling-pathway',
  name: 'Cell Signaling Pathway',
  description: 'Diagram showing signal transduction from receptor to response',
  domain: 'biology',
  promptTemplate: `Create a cell signaling diagram showing:
- Signal molecule: {{signalMolecule}}
- Receptor type: {{receptorType}}
- Second messengers: {{secondMessengers}}
- Signal cascade: {{signalCascade}}
- Cellular response: {{cellularResponse}}

Include receptor activation and downstream effects.`,
  placeholders: ['signalMolecule', 'receptorType', 'secondMessengers', 'signalCascade', 'cellularResponse'],
  mermaidExample: `flowchart TB
    subgraph Signaling["Signal Transduction"]
        LIGAND[Ligand/Signal] --> RECEP[Receptor]
        RECEP --> GPROTEIN[G-Protein Activation]
        GPROTEIN --> ADENYL[Adenylyl Cyclase]
        ADENYL --> CAMP[cAMP Second Messenger]
        CAMP --> PKA[Protein Kinase A]
        PKA --> PHOS[Protein Phosphorylation]
        PHOS --> RESP[Cellular Response]
    end`
};

export const cellCycleRegulationTemplate: DiagramTemplate = {
  id: 'cell-cycle-regulation',
  name: 'Cell Cycle Checkpoints',
  description: 'Diagram showing cell cycle phases and checkpoint regulation',
  domain: 'biology',
  promptTemplate: `Create a cell cycle diagram showing:
- G1 phase: {{g1Phase}}
- S phase: {{sPhase}}
- G2 phase: {{g2Phase}}
- M phase: {{mPhase}}
- Checkpoints: {{checkpoints}}
- Cyclins and CDKs: {{cyclinsCDKs}}

Show checkpoint control and regulatory proteins.`,
  placeholders: ['g1Phase', 'sPhase', 'g2Phase', 'mPhase', 'checkpoints', 'cyclinsCDKs'],
  mermaidExample: `flowchart TB
    subgraph CellCycle["Cell Cycle"]
        G1[G1 Phase - Growth] --> |G1 Checkpoint| S[S Phase - DNA Replication]
        S --> G2[G2 Phase - Preparation]
        G2 --> |G2 Checkpoint| M[M Phase - Mitosis]
        M --> |Spindle Checkpoint| G1
        subgraph Regulation["Regulation"]
            CDK[CDK + Cyclin] --> |Activate| PROG[Progression]
            P53[p53] --> |Inhibit| CDK
        end
    end`
};

export const membraneTransportTemplate: DiagramTemplate = {
  id: 'cell-membrane-transport',
  name: 'Membrane Transport Mechanisms',
  description: 'Diagram comparing passive and active transport across membranes',
  domain: 'biology',
  promptTemplate: `Create a membrane transport diagram showing:
- Simple diffusion: {{simpleDiffusion}}
- Facilitated diffusion: {{facilitatedDiffusion}}
- Primary active transport: {{primaryActive}}
- Secondary active transport: {{secondaryActive}}
- Vesicular transport: {{vesicularTransport}}

Show ATP requirement and concentration gradients.`,
  placeholders: ['simpleDiffusion', 'facilitatedDiffusion', 'primaryActive', 'secondaryActive', 'vesicularTransport'],
  mermaidExample: `flowchart TB
    subgraph Transport["Membrane Transport"]
        subgraph Passive["Passive Transport"]
            DIFF[Simple Diffusion]
            FACIL[Facilitated Diffusion]
            OSM[Osmosis]
        end
        subgraph Active["Active Transport"]
            PUMP[Ion Pumps - Primary]
            COTRANS[Cotransport - Secondary]
        end
        subgraph Vesicular["Vesicular Transport"]
            ENDO[Endocytosis]
            EXO[Exocytosis]
        end
    end`
};

export const cytoskeletonTemplate: DiagramTemplate = {
  id: 'cell-cytoskeleton',
  name: 'Cytoskeleton Components',
  description: 'Diagram showing microfilaments, intermediate filaments, and microtubules',
  domain: 'biology',
  promptTemplate: `Create a cytoskeleton diagram showing:
- Microfilaments: {{microfilaments}}
- Intermediate filaments: {{intermediateFilaments}}
- Microtubules: {{microtubules}}
- Motor proteins: {{motorProteins}}
- Functions: {{functions}}

Show diameter, composition, and cellular roles.`,
  placeholders: ['microfilaments', 'intermediateFilaments', 'microtubules', 'motorProteins', 'functions'],
  mermaidExample: `flowchart TB
    subgraph Cytoskeleton["Cytoskeleton"]
        subgraph Micro["Microfilaments - 7nm"]
            ACTIN[Actin Filaments]
            MYOSIN[Myosin Motors]
            FUNC1[Cell Movement/Shape]
        end
        subgraph Inter["Intermediate Filaments - 10nm"]
            KERAT[Keratin]
            VIMEN[Vimentin]
            FUNC2[Mechanical Support]
        end
        subgraph Tubu["Microtubules - 25nm"]
            TUBULIN[Tubulin Dimers]
            DYNEIN[Dynein/Kinesin Motors]
            FUNC3[Intracellular Transport]
        end
    end`
};

export const apoptosisPathwayTemplate: DiagramTemplate = {
  id: 'cell-apoptosis',
  name: 'Apoptosis Pathway',
  description: 'Diagram showing intrinsic and extrinsic apoptotic pathways',
  domain: 'biology',
  promptTemplate: `Create an apoptosis diagram showing:
- Extrinsic pathway: {{extrinsicPathway}}
- Intrinsic pathway: {{intrinsicPathway}}
- Caspase cascade: {{caspaseCascade}}
- Bcl-2 family: {{bcl2Family}}
- Apoptotic features: {{apoptoticFeatures}}

Show both pathways converging on executioner caspases.`,
  placeholders: ['extrinsicPathway', 'intrinsicPathway', 'caspaseCascade', 'bcl2Family', 'apoptoticFeatures'],
  mermaidExample: `flowchart TB
    subgraph Apoptosis["Apoptosis Pathways"]
        subgraph Extrinsic["Extrinsic Pathway"]
            DEATH[Death Ligand] --> RECEP[Death Receptor]
            RECEP --> CASP8[Caspase-8]
        end
        subgraph Intrinsic["Intrinsic Pathway"]
            STRESS[Cell Stress] --> MITO[Mitochondria]
            MITO --> CYTC[Cytochrome c Release]
            CYTC --> CASP9[Caspase-9]
        end
        CASP8 --> CASP3[Caspase-3/7]
        CASP9 --> CASP3
        CASP3 --> APOP[Apoptosis]
    end`
};

export const autophagyTemplate: DiagramTemplate = {
  id: 'cell-autophagy',
  name: 'Autophagy Process',
  description: 'Diagram showing autophagosome formation and lysosomal degradation',
  domain: 'biology',
  promptTemplate: `Create an autophagy diagram showing:
- Initiation signals: {{initiationSignals}}
- Phagophore formation: {{phagophore}}
- Autophagosome: {{autophagosome}}
- Lysosome fusion: {{lysosomeFusion}}
- Cargo degradation: {{cargoDegradation}}

Include mTOR regulation and ATG proteins.`,
  placeholders: ['initiationSignals', 'phagophore', 'autophagosome', 'lysosomeFusion', 'cargoDegradation'],
  mermaidExample: `flowchart LR
    subgraph Autophagy["Autophagy Process"]
        MTOR[mTOR Inhibition] --> INIT[Initiation Complex]
        INIT --> PHAGO[Phagophore Formation]
        PHAGO --> |Engulf cargo| AUTO[Autophagosome]
        AUTO --> |Fusion| AUTOLYS[Autolysosome]
        LYS[Lysosome] --> AUTOLYS
        AUTOLYS --> DEG[Degradation & Recycling]
    end`
};

export const proteinSortingTemplate: DiagramTemplate = {
  id: 'cell-protein-sorting',
  name: 'Protein Targeting and Sorting',
  description: 'Diagram showing how proteins are directed to different cellular compartments',
  domain: 'biology',
  promptTemplate: `Create a protein sorting diagram showing:
- Signal sequences: {{signalSequences}}
- ER targeting: {{erTargeting}}
- Mitochondrial targeting: {{mitoTargeting}}
- Nuclear targeting: {{nuclearTargeting}}
- Vesicle sorting: {{vesicleSorting}}

Show signal recognition and receptor binding.`,
  placeholders: ['signalSequences', 'erTargeting', 'mitoTargeting', 'nuclearTargeting', 'vesicleSorting'],
  mermaidExample: `flowchart TB
    subgraph Sorting["Protein Sorting"]
        RIBO[Ribosome] --> |Signal Sequence| SRP[Signal Recognition Particle]
        SRP --> ER[Endoplasmic Reticulum]
        RIBO --> |MTS| MITO[Mitochondria]
        RIBO --> |NLS| NUC[Nucleus via Nuclear Pore]
        ER --> |Sorting signals| GOLGI[Golgi]
        GOLGI --> PM[Plasma Membrane]
        GOLGI --> LYS[Lysosomes]
        GOLGI --> SEC[Secretory Vesicles]
    end`
};

export const cellJunctionsTemplate: DiagramTemplate = {
  id: 'cell-junctions',
  name: 'Cell Junction Types',
  description: 'Diagram showing different types of cell-cell junctions',
  domain: 'biology',
  promptTemplate: `Create a cell junction diagram showing:
- Tight junctions: {{tightJunctions}}
- Adherens junctions: {{adherensJunctions}}
- Desmosomes: {{desmosomes}}
- Gap junctions: {{gapJunctions}}
- Hemidesmosomes: {{hemidesmosomes}}

Show protein components and functions.`,
  placeholders: ['tightJunctions', 'adherensJunctions', 'desmosomes', 'gapJunctions', 'hemidesmosomes'],
  mermaidExample: `flowchart TB
    subgraph Junctions["Cell Junctions"]
        subgraph Occluding["Occluding"]
            TIGHT[Tight Junctions - Claudins/Occludin]
        end
        subgraph Anchoring["Anchoring"]
            ADHER[Adherens - Cadherins]
            DESMO[Desmosomes - Cadherins]
            HEMI[Hemidesmosomes - Integrins]
        end
        subgraph Communicating["Communicating"]
            GAP[Gap Junctions - Connexins]
        end
    end`
};

export const nuclearEnvelopeTemplate: DiagramTemplate = {
  id: 'cell-nuclear-envelope',
  name: 'Nuclear Envelope and Transport',
  description: 'Diagram showing nuclear pore complex and nucleocytoplasmic transport',
  domain: 'biology',
  promptTemplate: `Create a nuclear envelope diagram showing:
- Double membrane: {{doubleMembrane}}
- Nuclear pore complex: {{nuclearPore}}
- Nuclear lamina: {{nuclearLamina}}
- Import signals: {{importSignals}}
- Export signals: {{exportSignals}}

Show Ran GTPase cycle and transport mechanisms.`,
  placeholders: ['doubleMembrane', 'nuclearPore', 'nuclearLamina', 'importSignals', 'exportSignals'],
  mermaidExample: `flowchart TB
    subgraph Nuclear["Nuclear Envelope"]
        ONM[Outer Nuclear Membrane] --> PNS[Perinuclear Space]
        PNS --> INM[Inner Nuclear Membrane]
        INM --> LAM[Nuclear Lamina]
        subgraph NPC["Nuclear Pore Complex"]
            IMPORT[Importin + NLS Cargo]
            EXPORT[Exportin + NES Cargo]
            RAN[Ran GTPase Cycle]
        end
    end`
};

export const ribosomeStructureTemplate: DiagramTemplate = {
  id: 'cell-ribosome',
  name: 'Ribosome Structure and Translation',
  description: 'Diagram showing ribosomal subunits and protein synthesis',
  domain: 'biology',
  promptTemplate: `Create a ribosome diagram showing:
- Small subunit: {{smallSubunit}}
- Large subunit: {{largeSubunit}}
- A, P, E sites: {{trnaSites}}
- mRNA binding: {{mrnaBinding}}
- Translation steps: {{translationSteps}}

Show initiation, elongation, and termination.`,
  placeholders: ['smallSubunit', 'largeSubunit', 'trnaSites', 'mrnaBinding', 'translationSteps'],
  mermaidExample: `flowchart LR
    subgraph Ribosome["Ribosome and Translation"]
        subgraph Structure["Ribosome Structure"]
            SMALL[Small Subunit 40S/30S]
            LARGE[Large Subunit 60S/50S]
            SITES[A-P-E Sites]
        end
        INIT[Initiation - Start Codon] --> ELONG[Elongation]
        ELONG --> |tRNA binding| PEPBOND[Peptide Bond Formation]
        PEPBOND --> TRANS[Translocation]
        TRANS --> TERM[Termination - Stop Codon]
    end`
};

export const lysosomeTemplate: DiagramTemplate = {
  id: 'cell-lysosome',
  name: 'Lysosome Function and Pathways',
  description: 'Diagram showing lysosomal degradation pathways',
  domain: 'biology',
  promptTemplate: `Create a lysosome diagram showing:
- Lysosomal enzymes: {{lysosomalEnzymes}}
- Phagocytosis pathway: {{phagocytosis}}
- Endocytosis pathway: {{endocytosis}}
- Autophagy pathway: {{autophagy}}
- pH maintenance: {{pHMaintenance}}

Show convergence of degradation pathways.`,
  placeholders: ['lysosomalEnzymes', 'phagocytosis', 'endocytosis', 'autophagy', 'pHMaintenance'],
  mermaidExample: `flowchart TB
    subgraph Lysosome["Lysosomal Pathways"]
        PHAGO[Phagocytosis] --> PHAGOSOME[Phagosome]
        ENDO[Endocytosis] --> ENDOSOME[Endosome]
        AUTO[Autophagy] --> AUTOSOME[Autophagosome]
        PHAGOSOME --> LYS[Lysosome pH 4.5-5]
        ENDOSOME --> LYS
        AUTOSOME --> LYS
        LYS --> |Hydrolytic enzymes| DEG[Degradation]
        DEG --> REC[Nutrient Recycling]
    end`
};

export const dnaReplicationTemplate: DiagramTemplate = {
  id: 'cell-dna-replication',
  name: 'DNA Replication Fork',
  description: 'Diagram showing replication fork with leading and lagging strands',
  domain: 'biology',
  promptTemplate: `Create a DNA replication diagram showing:
- Origin of replication: {{origin}}
- Leading strand synthesis: {{leadingStrand}}
- Lagging strand (Okazaki): {{laggingStrand}}
- Replication enzymes: {{enzymes}}
- Proofreading: {{proofreading}}

Show helicase, primase, DNA polymerase, and ligase.`,
  placeholders: ['origin', 'leadingStrand', 'laggingStrand', 'enzymes', 'proofreading'],
  mermaidExample: `flowchart LR
    subgraph Replication["DNA Replication Fork"]
        ORI[Origin of Replication] --> HELICASE[Helicase - Unwind]
        HELICASE --> SSB[SSB Proteins]
        subgraph Leading["Leading Strand"]
            LEAD[5' to 3' Continuous]
        end
        subgraph Lagging["Lagging Strand"]
            PRIM[Primase - RNA Primer]
            OKAZAKI[Okazaki Fragments]
            LIGASE[DNA Ligase]
        end
        POLIII[DNA Polymerase III] --> Leading
        POLIII --> Lagging
    end`
};

export const transcriptionTemplate: DiagramTemplate = {
  id: 'cell-transcription',
  name: 'Transcription Process',
  description: 'Diagram showing RNA synthesis from DNA template',
  domain: 'biology',
  promptTemplate: `Create a transcription diagram showing:
- Promoter recognition: {{promoter}}
- RNA polymerase: {{rnaPolymerase}}
- Elongation: {{elongation}}
- Termination: {{termination}}
- mRNA processing: {{mrnaProcessing}}

Show eukaryotic modifications (cap, poly-A).`,
  placeholders: ['promoter', 'rnaPolymerase', 'elongation', 'termination', 'mrnaProcessing'],
  mermaidExample: `flowchart LR
    subgraph Transcription["Transcription"]
        TATA[TATA Box/Promoter] --> TF[Transcription Factors]
        TF --> RNAP[RNA Polymerase II]
        RNAP --> INIT[Initiation]
        INIT --> ELONG[Elongation]
        ELONG --> TERM[Termination]
        subgraph Processing["mRNA Processing"]
            CAP[5' Cap]
            SPLICE[Splicing]
            POLYA[3' Poly-A Tail]
        end
        TERM --> Processing
    end`
};

export const proteinFoldingTemplate: DiagramTemplate = {
  id: 'cell-protein-folding',
  name: 'Protein Folding and Chaperones',
  description: 'Diagram showing protein folding pathway and quality control',
  domain: 'biology',
  promptTemplate: `Create a protein folding diagram showing:
- Nascent polypeptide: {{nascentPolypeptide}}
- Chaperone assistance: {{chaperones}}
- Folding intermediates: {{foldingIntermediates}}
- ER quality control: {{erQualityControl}}
- Misfolding consequences: {{misfolding}}

Show Hsp70, Hsp90, and chaperonins.`,
  placeholders: ['nascentPolypeptide', 'chaperones', 'foldingIntermediates', 'erQualityControl', 'misfolding'],
  mermaidExample: `flowchart TB
    subgraph Folding["Protein Folding"]
        NASCENT[Nascent Polypeptide] --> HSP70[Hsp70 Binding]
        HSP70 --> |Correct folding| NATIVE[Native Protein]
        HSP70 --> |Complex proteins| CHAP[Chaperonin GroEL/TriC]
        CHAP --> NATIVE
        subgraph QC["Quality Control"]
            MISF[Misfolded] --> ERAD[ER-Associated Degradation]
            ERAD --> PROTEASOME[Proteasome]
            MISF --> AGG[Aggregation - Disease]
        end
    end`
};

export const vesicleTraffickingTemplate: DiagramTemplate = {
  id: 'cell-vesicle-trafficking',
  name: 'Vesicle Coat Proteins and Targeting',
  description: 'Diagram showing COPI, COPII, and clathrin-mediated transport',
  domain: 'biology',
  promptTemplate: `Create a vesicle trafficking diagram showing:
- COPII (ER to Golgi): {{copii}}
- COPI (retrograde): {{copi}}
- Clathrin (PM/TGN): {{clathrin}}
- SNARE-mediated fusion: {{snares}}
- Rab GTPases: {{rabGTPases}}

Show vesicle budding, transport, and fusion.`,
  placeholders: ['copii', 'copi', 'clathrin', 'snares', 'rabGTPases'],
  mermaidExample: `flowchart TB
    subgraph Trafficking["Vesicle Trafficking"]
        ER[ER] --> |COPII| CGN[cis-Golgi]
        CGN --> |COPI retrograde| ER
        TGN[trans-Golgi] --> |Clathrin| PM[Plasma Membrane]
        PM --> |Clathrin endocytosis| ENDO[Endosome]
        subgraph Fusion["Membrane Fusion"]
            VSNARE[v-SNARE]
            TSNARE[t-SNARE]
            RAB[Rab GTPases]
        end
    end`
};

export const ecmInteractionsTemplate: DiagramTemplate = {
  id: 'cell-ecm-interactions',
  name: 'Cell-ECM Interactions',
  description: 'Diagram showing integrin signaling and focal adhesions',
  domain: 'biology',
  promptTemplate: `Create a cell-ECM interaction diagram showing:
- ECM components: {{ecmComponents}}
- Integrin receptors: {{integrins}}
- Focal adhesion complex: {{focalAdhesion}}
- Signal transduction: {{signaling}}
- Cytoskeletal connections: {{cytoskeleton}}

Show inside-out and outside-in signaling.`,
  placeholders: ['ecmComponents', 'integrins', 'focalAdhesion', 'signaling', 'cytoskeleton'],
  mermaidExample: `flowchart TB
    subgraph ECM["Cell-ECM Interactions"]
        subgraph Matrix["Extracellular Matrix"]
            COLL[Collagen]
            FN[Fibronectin]
            LAM[Laminin]
        end
        Matrix --> INTEGRIN[Integrin α/β]
        subgraph FA["Focal Adhesion"]
            TAL[Talin]
            VIN[Vinculin]
            FAK[FAK Kinase]
        end
        INTEGRIN --> FA
        FA --> ACTIN[Actin Cytoskeleton]
        FAK --> |Signaling| MAPK[MAPK/PI3K]
    end`
};

export const rtkSignalingTemplate: DiagramTemplate = {
  id: 'cell-rtk-signaling',
  name: 'Receptor Tyrosine Kinase Signaling',
  description: 'Diagram showing RTK dimerization and downstream pathways',
  domain: 'biology',
  promptTemplate: `Create an RTK signaling diagram showing:
- Ligand binding: {{ligandBinding}}
- Receptor dimerization: {{dimerization}}
- Autophosphorylation: {{autophosphorylation}}
- Adaptor proteins: {{adaptorProteins}}
- Downstream pathways: {{downstreamPathways}}

Show Ras-MAPK and PI3K-Akt activation.`,
  placeholders: ['ligandBinding', 'dimerization', 'autophosphorylation', 'adaptorProteins', 'downstreamPathways'],
  mermaidExample: `flowchart TB
    subgraph RTK["RTK Signaling"]
        GF[Growth Factor] --> RTK1[RTK Monomer]
        RTK1 --> |Dimerization| RTK2[RTK Dimer]
        RTK2 --> |Autophosphorylation| pRTK[p-RTK]
        pRTK --> GRB2[Grb2-SOS]
        GRB2 --> RAS[Ras Activation]
        RAS --> RAF[Raf-MEK-ERK]
        pRTK --> PI3K[PI3K]
        PI3K --> AKT[Akt/PKB]
    end`
};

export const gProteinSignalingTemplate: DiagramTemplate = {
  id: 'cell-gprotein-signaling',
  name: 'G-Protein Coupled Receptor Signaling',
  description: 'Diagram showing GPCR activation and second messenger systems',
  domain: 'biology',
  promptTemplate: `Create a GPCR signaling diagram showing:
- Receptor structure: {{receptorStructure}}
- G-protein cycle: {{gProteinCycle}}
- Adenylyl cyclase: {{adenylylCyclase}}
- Phospholipase C: {{plc}}
- Second messengers: {{secondMessengers}}

Show cAMP and calcium/IP3 pathways.`,
  placeholders: ['receptorStructure', 'gProteinCycle', 'adenylylCyclase', 'plc', 'secondMessengers'],
  mermaidExample: `flowchart TB
    subgraph GPCR["GPCR Signaling"]
        LIGAND[Ligand] --> GPCR1[GPCR - 7TM]
        GPCR1 --> |GDP-GTP exchange| GALPHA[Gα Activation]
        subgraph Gs["Gs Pathway"]
            GALPHA --> AC[Adenylyl Cyclase]
            AC --> CAMP[cAMP]
            CAMP --> PKA[PKA]
        end
        subgraph Gq["Gq Pathway"]
            GALPHA --> PLC[Phospholipase C]
            PLC --> IP3[IP3]
            PLC --> DAG[DAG]
            IP3 --> CA[Ca2+ Release]
            DAG --> PKC[PKC]
        end
    end`
};

export const stemCellDifferentiationTemplate: DiagramTemplate = {
  id: 'cell-stem-differentiation',
  name: 'Stem Cell Differentiation',
  description: 'Diagram showing stem cell potency and lineage commitment',
  domain: 'biology',
  promptTemplate: `Create a stem cell differentiation diagram showing:
- Totipotency: {{totipotency}}
- Pluripotency: {{pluripotency}}
- Multipotency: {{multipotency}}
- Lineage commitment: {{lineageCommitment}}
- Transcription factors: {{transcriptionFactors}}

Show self-renewal and differentiation balance.`,
  placeholders: ['totipotency', 'pluripotency', 'multipotency', 'lineageCommitment', 'transcriptionFactors'],
  mermaidExample: `flowchart TB
    subgraph Stem["Stem Cell Hierarchy"]
        TOTI[Totipotent - Zygote] --> PLURI[Pluripotent - ES/iPS]
        PLURI --> |Self-renewal| PLURI
        PLURI --> ECTO[Ectoderm]
        PLURI --> MESO[Mesoderm]
        PLURI --> ENDO[Endoderm]
        MESO --> HSC[Multipotent HSC]
        HSC --> |Lineage commitment| MYELO[Myeloid]
        HSC --> LYMPH[Lymphoid]
        MYELO --> RBC[Erythrocytes]
        MYELO --> WBC[Granulocytes]
    end`
};

// Export all cell biology templates
export const cellbiologyTemplates: DiagramTemplate[] = [
  cellMembraneStructureTemplate,
  mitosisTemplate,
  meiosisTemplate,
  endomembraneSystemTemplate,
  mitochondriaStructureTemplate,
  chloroplastStructureTemplate,
  cellSignalingTemplate,
  cellCycleRegulationTemplate,
  membraneTransportTemplate,
  cytoskeletonTemplate,
  apoptosisPathwayTemplate,
  autophagyTemplate,
  proteinSortingTemplate,
  cellJunctionsTemplate,
  nuclearEnvelopeTemplate,
  ribosomeStructureTemplate,
  lysosomeTemplate,
  dnaReplicationTemplate,
  transcriptionTemplate,
  proteinFoldingTemplate,
  vesicleTraffickingTemplate,
  ecmInteractionsTemplate,
  rtkSignalingTemplate,
  gProteinSignalingTemplate,
  stemCellDifferentiationTemplate
];

export default cellbiologyTemplates;
