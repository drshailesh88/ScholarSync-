/**
 * biochemistry-prompts.ts
 * Biochemistry-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for biochemistry including:
 * - Metabolic pathways (glycolysis, TCA, ETC)
 * - Enzyme kinetics (Michaelis-Menten, inhibition)
 * - Protein structure and folding
 * - Nucleic acid structure and function
 * - Cell signaling cascades
 * - Laboratory techniques
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// BIOCHEMISTRY DOMAIN PROMPT
// =============================================================================

/**
 * Base biochemistry domain prompt for molecular biology diagrams
 */
export const BIOCHEMISTRY_DOMAIN_PROMPT = `
Biochemistry diagram requirements:
- Use IUPAC nomenclature for molecules and compounds
- Follow standard biochemical pathway conventions (substrates left, products right)
- Include cofactors and coenzymes where relevant (NAD+, FAD, CoA, ATP)
- Show enzyme names with EC numbers when applicable
- Use standard abbreviations (Glc, Pyr, OAA, Succ, etc.)
- Include energy carriers and yields (ATP, NADH, FADH2)
- Mark regulatory steps with appropriate symbols (⊕ activation, ⊖ inhibition)
- Show reversibility with double arrows (⇌) or single arrows (→) appropriately
- Use color coding: Substrates (blue), Products (green), Enzymes (purple), Inhibitors (red)
- Include cellular compartmentalization (cytosol, mitochondria, ER) when relevant`;

// =============================================================================
// BIOCHEMISTRY-SPECIFIC PROMPTS
// =============================================================================

export const BIOCHEMISTRY_PROMPTS = {
  // Metabolic Pathways
  glycolysisPathway: `
Glycolysis Pathway requirements:
- Show all 10 enzymatic steps from glucose to pyruvate
- Include hexokinase, PFK-1, and pyruvate kinase as key regulatory enzymes
- Mark ATP-consuming (investment) and ATP-producing (payoff) phases
- Show net yield: 2 ATP, 2 NADH, 2 pyruvate per glucose
- Include regulatory mechanisms (allosteric regulation by ATP, AMP, citrate)
- Mark irreversible steps that require bypass enzymes in gluconeogenesis
- Show substrate-level phosphorylation reactions`,

  tcaCycle: `
TCA/Krebs Cycle requirements:
- Show all 8 reactions starting from acetyl-CoA + OAA → citrate
- Include all enzyme names (citrate synthase, aconitase, etc.)
- Mark decarboxylation steps (isocitrate → α-KG, α-KG → succinyl-CoA)
- Show all electron carriers produced (3 NADH, 1 FADH2, 1 GTP)
- Indicate regulatory enzymes (isocitrate DH, α-KG DH, citrate synthase)
- Show anaplerotic reactions feeding into the cycle
- Include mitochondrial localization`,

  electronTransportChain: `
Electron Transport Chain requirements:
- Show Complexes I, II, III, and IV in inner mitochondrial membrane
- Include electron flow from NADH and FADH2 to O2
- Show proton pumping at Complexes I, III, and IV
- Include Q (ubiquinone) and cytochrome c as mobile carriers
- Show ATP synthase (Complex V) and chemiosmotic coupling
- Include P/O ratios (2.5 ATP/NADH, 1.5 ATP/FADH2)
- Mark inhibitor sites (rotenone, antimycin A, cyanide, oligomycin)`,

  betaOxidation: `
Beta-Oxidation requirements:
- Show the four recurring steps: oxidation, hydration, oxidation, thiolysis
- Include FAD-dependent acyl-CoA dehydrogenase
- Show NAD-dependent β-hydroxyacyl-CoA dehydrogenase
- Mark each cycle produces: 1 FADH2, 1 NADH, 1 acetyl-CoA
- Calculate total ATP yield for palmitate (106 ATP from 7 cycles + 8 acetyl-CoA)
- Include carnitine shuttle for fatty acid transport into mitochondria
- Show regulation by malonyl-CoA`,

  gluconeogenesis: `
Gluconeogenesis requirements:
- Show synthesis of glucose from non-carbohydrate precursors
- Include bypass reactions for irreversible glycolysis steps
- Mark pyruvate carboxylase (biotin-dependent) in mitochondria
- Show PEPCK reaction (OAA → PEP)
- Include fructose-1,6-bisphosphatase and glucose-6-phosphatase
- Show energy cost: 6 ATP equivalents per glucose
- Include regulatory hormones (glucagon stimulates, insulin inhibits)`,

  // Enzyme Kinetics
  michaelisMenten: `
Michaelis-Menten Kinetics requirements:
- Show hyperbolic velocity vs substrate concentration curve
- Mark Km (substrate concentration at half Vmax)
- Show Vmax asymptote at high [S]
- Include the equation: v = Vmax[S] / (Km + [S])
- Show enzyme-substrate complex formation (E + S ⇌ ES → E + P)
- Include significance of Km (enzyme affinity) and Vmax (catalytic capacity)
- Reference steady-state assumption`,

  enzymeInhibition: `
Enzyme Inhibition Types requirements:
- Compare competitive, noncompetitive, and uncompetitive inhibition
- Show Lineweaver-Burk plots for each type
- Competitive: increased apparent Km, unchanged Vmax
- Noncompetitive: unchanged Km, decreased Vmax
- Uncompetitive: decreased both Km and Vmax
- Include Ki (inhibition constant) in equations
- Show examples of each type (statins, heavy metals, etc.)`,

  allostericRegulation: `
Allosteric Regulation requirements:
- Show sigmoidal kinetics (vs hyperbolic for Michaelis-Menten)
- Include cooperative binding and Hill coefficient
- Distinguish R (relaxed) and T (tense) states
- Show positive and negative effector binding sites
- Include examples (PFK-1, hemoglobin)
- Reference concerted (MWC) vs sequential models
- Show regulatory molecules (ATP, AMP, citrate, fructose-2,6-BP)`,

  // Protein Structure
  proteinFolding: `
Protein Folding Levels requirements:
- Primary: linear amino acid sequence, peptide bonds
- Secondary: α-helix (hydrogen bonds i to i+4), β-sheet (parallel/antiparallel)
- Tertiary: 3D structure with all interactions (H-bonds, ionic, hydrophobic, disulfide)
- Quaternary: multi-subunit assembly
- Include chaperone proteins (HSP70, chaperonins)
- Show folding funnel energy landscape
- Reference Anfinsen's experiment (RNase A)`,

  proteinSynthesis: `
Protein Synthesis requirements:
- Show transcription: DNA → mRNA (RNA polymerase, promoter, terminator)
- Show translation: mRNA → protein (ribosome, tRNA, codons)
- Include initiation, elongation, termination steps
- Show ribosome structure (30S/50S in prokaryotes, 40S/60S in eukaryotes)
- Include post-translational modifications (phosphorylation, glycosylation)
- Show signal sequences and protein targeting
- Reference genetic code and wobble hypothesis`,

  // Nucleic Acids
  dnaReplication: `
DNA Replication requirements:
- Show replication fork with leading and lagging strands
- Include helicase, primase, DNA polymerase III, ligase
- Show Okazaki fragments on lagging strand
- Include topoisomerase to relieve supercoiling
- Show 5' to 3' synthesis direction
- Include proofreading (3' to 5' exonuclease)
- Mark origin of replication (oriC in E. coli)`,

  transcriptionRegulation: `
Transcription Regulation requirements:
- Show promoter elements (TATA box, -10/-35 in prokaryotes)
- Include enhancers and silencers in eukaryotes
- Show transcription factors (general and specific)
- Include lac operon as model (lacI, lacZ, CAP site)
- Show epigenetic regulation (methylation, acetylation)
- Include alternative splicing
- Reference RNA processing (5' cap, poly-A tail, splicing)`,

  // Cell Signaling
  gProteinSignaling: `
G-Protein Coupled Receptor Signaling requirements:
- Show 7-transmembrane receptor structure
- Include heterotrimeric G protein (α, β, γ subunits)
- Show GDP/GTP exchange upon ligand binding
- Include adenylyl cyclase activation → cAMP production
- Show PKA activation and downstream phosphorylation
- Include phosphodiesterase for signal termination
- Reference examples (β-adrenergic, glucagon receptors)`,

  mapkCascade: `
MAPK Cascade requirements:
- Show three-tiered kinase cascade: MAPKKK → MAPKK → MAPK
- Include specific names: Raf → MEK → ERK
- Show receptor tyrosine kinase activation
- Include Ras GTPase as upstream activator
- Show scaffold proteins for pathway specificity
- Include nuclear translocation and transcription factor activation
- Reference growth factor signaling (EGF, PDGF)`,

  insulinSignaling: `
Insulin Signaling Pathway requirements:
- Show insulin receptor tyrosine kinase activation
- Include IRS-1 phosphorylation and PI3K activation
- Show PIP2 → PIP3 conversion
- Include Akt/PKB activation
- Show GLUT4 translocation to membrane
- Include glycogen synthase activation
- Reference metabolic effects (glucose uptake, lipogenesis)`,

  // Laboratory Techniques
  electrophoresis: `
Gel Electrophoresis requirements:
- Show SDS-PAGE for proteins (denatured, separated by size)
- Include agarose gel for DNA/RNA
- Show loading wells, running direction (- to +)
- Include molecular weight markers/ladder
- Show detection methods (Coomassie, silver stain, EtBr)
- Reference Western blot transfer
- Include native PAGE for activity gels`,

  pcrTechnique: `
PCR (Polymerase Chain Reaction) requirements:
- Show three steps: denaturation (95°C), annealing (55°C), extension (72°C)
- Include primers (forward and reverse)
- Show exponential amplification (2^n copies)
- Include Taq polymerase properties
- Show applications (cloning, diagnostics, forensics)
- Reference real-time qPCR
- Include common problems (primer dimers, nonspecific bands)`,

  chromatography: `
Chromatography Techniques requirements:
- Compare size exclusion (large molecules elute first)
- Show ion exchange (anion/cation exchangers)
- Include affinity chromatography (specific binding)
- Show HPLC setup (pump, column, detector)
- Reference partition coefficients
- Include TLC for quick analysis
- Show protein purification workflow`,

  spectroscopy: `
Spectroscopy Techniques requirements:
- Show UV-Vis absorbance (Beer-Lambert: A = εlc)
- Include fluorescence (excitation/emission spectra)
- Show protein concentration methods (Bradford, BCA)
- Reference wavelengths (280 nm for proteins, 260 nm for nucleic acids)
- Include spectrophotometer components
- Show standard curves for quantification
- Reference molar extinction coefficients`,

  blottingTechniques: `
Blotting Techniques requirements:
- Southern blot: DNA detection with hybridization probes
- Northern blot: RNA detection and analysis
- Western blot: protein detection with antibodies
- Show transfer methods (capillary, electroblotting)
- Include blocking, primary/secondary antibodies
- Show detection (chemiluminescence, fluorescence)
- Reference applications in research and diagnostics`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Biochemistry-specific few-shot examples
 */
export const BIOCHEMISTRY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a flowchart showing the glycolysis pathway with ATP yields',
    output: `flowchart TD
    subgraph Investment["Investment Phase (-2 ATP)"]
        A["Glucose"] -->|"Hexokinase<br/>-1 ATP"| B["Glucose-6-P"]
        B -->|"Phosphoglucose<br/>isomerase"| C["Fructose-6-P"]
        C -->|"PFK-1<br/>-1 ATP"| D["Fructose-1,6-BP"]
        D -->|"Aldolase"| E["DHAP + G3P"]
    end

    subgraph Payoff["Payoff Phase (+4 ATP, +2 NADH)"]
        E -->|"TPI"| F["2 G3P"]
        F -->|"GAPDH<br/>+2 NADH"| G["2 × 1,3-BPG"]
        G -->|"PGK<br/>+2 ATP"| H["2 × 3-PG"]
        H -->|"Mutase"| I["2 × 2-PG"]
        I -->|"Enolase"| J["2 × PEP"]
        J -->|"Pyruvate kinase<br/>+2 ATP"| K["2 × Pyruvate"]
    end

    L["Net: 2 ATP + 2 NADH + 2 Pyruvate"]

    style A fill:#60A5FA,color:#fff
    style K fill:#22C55E,color:#fff
    style C fill:#F59E0B,color:#fff
    style J fill:#F59E0B,color:#fff`,
  },
  {
    prompt: 'Create a diagram of the TCA cycle showing all intermediates',
    output: `flowchart TD
    subgraph Mitochondrial_Matrix["TCA Cycle"]
        A["Acetyl-CoA"] -->|"Citrate synthase"| B["Citrate"]
        B -->|"Aconitase"| C["Isocitrate"]
        C -->|"Isocitrate DH<br/>+NADH, -CO2"| D["α-Ketoglutarate"]
        D -->|"α-KG DH complex<br/>+NADH, -CO2"| E["Succinyl-CoA"]
        E -->|"Succinyl-CoA<br/>synthetase<br/>+GTP"| F["Succinate"]
        F -->|"Succinate DH<br/>+FADH2"| G["Fumarate"]
        G -->|"Fumarase"| H["Malate"]
        H -->|"Malate DH<br/>+NADH"| I["Oxaloacetate"]
        I -->|""| A
    end

    J["Per turn: 3 NADH + 1 FADH2 + 1 GTP"]

    style A fill:#60A5FA,color:#fff
    style C fill:#EF4444,color:#fff
    style D fill:#EF4444,color:#fff
    style I fill:#F59E0B,color:#fff`,
  },
  {
    prompt: 'Create a Michaelis-Menten kinetics curve with annotations',
    output: `flowchart LR
    subgraph Kinetics["Michaelis-Menten Kinetics"]
        direction TB
        A["v = Vmax[S] / (Km + [S])"]
        B["At low [S]: v ≈ (Vmax/Km)[S]"]
        C["At high [S]: v ≈ Vmax"]
        D["At [S] = Km: v = Vmax/2"]
    end

    subgraph Parameters["Key Parameters"]
        E["Km = substrate concentration<br/>at half Vmax"]
        F["Vmax = maximum velocity<br/>(all enzyme saturated)"]
        G["kcat = turnover number<br/>(Vmax/[E]total)"]
        H["kcat/Km = catalytic<br/>efficiency"]
    end

    subgraph Interpretation["Interpretation"]
        I["Low Km = high affinity"]
        J["High Vmax = fast catalysis"]
        K["High kcat/Km = efficient enzyme"]
    end

    style A fill:#3B82F6,color:#fff
    style E fill:#F59E0B,color:#fff
    style F fill:#22C55E,color:#fff`,
  },
  {
    prompt: 'Create a diagram comparing enzyme inhibition types',
    output: `flowchart TD
    subgraph Competitive["Competitive Inhibition"]
        A1["I competes with S<br/>for active site"]
        A2["↑ apparent Km"]
        A3["Unchanged Vmax"]
        A4["Overcome with high [S]"]
    end

    subgraph Noncompetitive["Noncompetitive Inhibition"]
        B1["I binds allosteric site"]
        B2["Unchanged Km"]
        B3["↓ Vmax"]
        B4["Cannot overcome<br/>with high [S]"]
    end

    subgraph Uncompetitive["Uncompetitive Inhibition"]
        C1["I binds only ES complex"]
        C2["↓ apparent Km"]
        C3["↓ Vmax"]
        C4["Both decreased<br/>proportionally"]
    end

    subgraph Examples["Examples"]
        D1["Statins vs HMG-CoA reductase"]
        D2["Heavy metals (Pb, Hg)"]
        D3["Lithium vs GSK-3"]
    end

    Competitive --> D1
    Noncompetitive --> D2
    Uncompetitive --> D3

    style A1 fill:#EF4444,color:#fff
    style B1 fill:#8B5CF6,color:#fff
    style C1 fill:#06B6D4,color:#fff`,
  },
  {
    prompt: 'Create a protein synthesis diagram showing transcription and translation',
    output: `flowchart TD
    subgraph Nucleus["Nucleus - Transcription"]
        A["DNA template strand<br/>3' → 5'"]
        B["RNA polymerase"]
        C["Pre-mRNA<br/>5' → 3'"]
        D["Processing:<br/>5' cap, 3' poly-A,<br/>splicing"]
        E["Mature mRNA"]

        A --> B --> C --> D --> E
    end

    subgraph Cytoplasm["Cytoplasm - Translation"]
        F["mRNA + Ribosome"]
        G["Initiation:<br/>AUG start codon<br/>Met-tRNA"]
        H["Elongation:<br/>tRNA delivery,<br/>peptide bond,<br/>translocation"]
        I["Termination:<br/>Stop codon<br/>(UAA, UAG, UGA)"]
        J["Polypeptide chain"]

        F --> G --> H --> I --> J
    end

    E -->|"Nuclear export"| F

    subgraph PTM["Post-translational"]
        K["Folding (chaperones)"]
        L["Modifications<br/>(phosphorylation,<br/>glycosylation)"]
        M["Targeting<br/>(signal sequences)"]
    end

    J --> K --> L --> M

    style A fill:#3B82F6,color:#fff
    style E fill:#F97316,color:#fff
    style J fill:#22C55E,color:#fff`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

export default {
  BIOCHEMISTRY_DOMAIN_PROMPT,
  BIOCHEMISTRY_PROMPTS,
  BIOCHEMISTRY_FEW_SHOT_EXAMPLES,
};
