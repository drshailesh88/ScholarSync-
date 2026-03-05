/**
 * pathology-prompts.ts
 * Pathology-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for pathology and laboratory medicine including:
 * - Tissue diagnosis algorithms
 * - Tumor classification and grading
 * - Inflammatory pattern recognition
 * - Special stain selection
 * - Immunohistochemistry interpretation
 * - Bone marrow evaluation
 * - Autopsy protocols
 * - Molecular pathology workflows
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// PATHOLOGY DOMAIN PROMPT
// =============================================================================

/**
 * Base pathology domain prompt for histopathology diagrams
 */
export const PATHOLOGY_DOMAIN_PROMPT = `
Pathology diagram requirements:
- Use standard histopathological terminology (atypia, dysplasia, neoplasia, etc.)
- Follow WHO classification systems for tumors
- Reference AJCC/TNM staging where applicable
- Include proper cell morphology descriptions (nuclear:cytoplasmic ratio, chromatin pattern)
- Use H&E color scheme: Hematoxylin (purple-blue) for nuclei, Eosin (pink) for cytoplasm
- Include IHC marker patterns with expected staining (nuclear, cytoplasmic, membranous)
- Follow CAP cancer protocol synoptic elements
- Reference grading systems (Gleason, Nottingham, Fuhrman, etc.)
- Use color coding: Benign (green), Atypical (yellow), Malignant (red), Necrosis (gray)
- Include appropriate ancillary testing pathways
- Reference molecular pathology markers when relevant`;

// =============================================================================
// PATHOLOGY-SPECIFIC PROMPTS
// =============================================================================

export const PATHOLOGY_PROMPTS = {
  // Diagnostic Algorithms
  tissueDiagnosis: `
Tissue Diagnosis Algorithm requirements:
- Begin with specimen adequacy assessment
- Evaluate gross examination findings (size, color, texture)
- Apply systematic microscopic approach
  - Low power: architecture, pattern, borders
  - High power: cytology, mitoses, nuclear features
- Classify by pattern recognition:
  - Epithelial vs mesenchymal vs lymphoid
  - Glandular vs solid vs nested vs diffuse
- List differential diagnoses ranked by likelihood
- Indicate ancillary studies needed (IHC, special stains, molecular)
- Provide diagnostic criteria for each entity`,

  tumorClassification: `
Tumor Classification requirements:
- Apply WHO classification nomenclature
- Distinguish benign vs borderline vs malignant
- Evaluate key features:
  - Encapsulation vs invasion
  - Growth pattern (expansile vs infiltrative)
  - Cytologic atypia (mild, moderate, severe)
  - Mitotic count per 10 HPF
  - Necrosis (present/absent, type)
- Determine histologic grade (differentiation)
- Apply site-specific grading systems
- Document prognostic factors
- Include molecular/genetic classification when relevant`,

  inflammatoryPattern: `
Inflammatory Pattern Recognition requirements:
- Identify predominant cell type:
  - Neutrophils: acute inflammation
  - Lymphocytes: chronic inflammation
  - Eosinophils: allergic, parasitic, drug reaction
  - Plasma cells: chronic infection, autoimmune
  - Granulomas: TB, fungal, sarcoid, foreign body
- Assess distribution pattern:
  - Diffuse vs focal
  - Perivascular vs interstitial
  - Interface pattern
- Evaluate for granulomas (necrotizing vs non-necrotizing)
- Order appropriate special stains (GMS, AFB, etc.)
- Consider infectious vs non-infectious etiologies`,

  specialStainSelection: `
Special Stain Selection requirements:
- Match stain to diagnostic question:
  - Organisms: GMS (fungi), AFB (mycobacteria), Warthin-Starry (spirochetes)
  - Connective tissue: Trichrome (collagen), Reticulin (fibers), EVG (elastic)
  - Carbohydrates: PAS (glycogen, mucin), Alcian blue (acid mucins)
  - Pigments: Prussian blue (iron), Fontana-Masson (melanin)
  - Amyloid: Congo red (apple-green birefringence)
- Include positive and negative controls
- Describe expected staining pattern
- Provide interpretation guidelines
- Note limitations and pitfalls`,

  ihcInterpretation: `
Immunohistochemistry Interpretation requirements:
- Select panel based on morphologic differential:
  - Undifferentiated: pan-CK, CD45, S100, vimentin
  - Carcinoma: CK7/CK20, TTF1, CDX2, PAX8
  - Lymphoma: CD20, CD3, CD10, BCL2, Ki67
  - Sarcoma: desmin, SMA, CD34, S100
  - Melanoma: S100, SOX10, Melan-A, HMB45
- Assess staining pattern:
  - Location: nuclear, cytoplasmic, membranous
  - Intensity: negative, weak, moderate, strong
  - Percentage of positive cells
- Apply diagnostic algorithms
- Note aberrant expression patterns
- Integrate with morphology for final diagnosis`,

  lymphNodeEvaluation: `
Lymph Node Evaluation requirements:
- Assess architecture:
  - Preserved vs effaced
  - Follicular vs paracortical vs sinus pattern
- Evaluate for reactive changes:
  - Follicular hyperplasia (germinal centers)
  - Paracortical expansion (T-cell areas)
  - Sinus histiocytosis
- Screen for metastatic carcinoma:
  - Subcapsular sinus involvement
  - Pan-CK immunostain
- Lymphoma workup:
  - Architectural pattern
  - Cell size and morphology
  - IHC panel (CD20, CD3, CD10, BCL2, BCL6, Ki67)
  - Flow cytometry correlation
- Determine need for molecular studies`,

  boneMarrowEvaluation: `
Bone Marrow Evaluation requirements:
- Assess specimen adequacy (length, cellularity)
- Evaluate cellularity for age
- Examine trilineage hematopoiesis:
  - Erythroid: M:E ratio, maturation
  - Myeloid: maturation, dysplasia
  - Megakaryocytic: number, morphology
- Count blasts (aspirate smear, CD34 IHC)
- Assess for dysplastic features:
  - Erythroid: megaloblastoid change, nuclear budding
  - Myeloid: hypogranulation, pseudo-Pelger-Huet
  - Megakaryocyte: micromegakaryocytes, hypolobation
- Grade fibrosis (MF scale 0-3)
- Correlate with peripheral blood and flow cytometry
- Integrate cytogenetics and molecular studies`,

  // Organ-Specific Pathology
  liverPathology: `
Liver Pathology Assessment requirements:
- Evaluate portal triads:
  - Inflammation type and grade
  - Bile duct damage
  - Portal fibrosis
- Assess lobular changes:
  - Hepatocyte injury pattern
  - Steatosis grade (<5%, 5-33%, 33-66%, >66%)
  - Steatohepatitis features (ballooning, Mallory-Denk)
- Grade and stage using standard systems:
  - HAI/Ishak for hepatitis
  - NASH CRN for fatty liver
- Identify fibrosis pattern:
  - Portal, periportal, bridging, cirrhosis
- Evaluate for hepatocellular carcinoma features
- Order special stains: Trichrome, Iron, PAS-D, Reticulin`,

  kidneyPathology: `
Kidney Pathology Assessment requirements:
- Evaluate glomeruli:
  - Number adequate (>10 for native)
  - Pattern: proliferative, membranous, sclerosing
  - Segmental vs global involvement
- Assess tubulointerstitium:
  - Tubular injury (ATN, cast nephropathy)
  - Interstitial inflammation and fibrosis
- Examine vessels:
  - Arteriosclerosis
  - Thrombotic microangiopathy
- Apply immunofluorescence findings:
  - IgG, IgA, IgM, C3, C1q, kappa, lambda
  - Pattern: granular, linear, mesangial
- Correlate with electron microscopy:
  - Deposits: subepithelial, subendothelial, mesangial
  - Foot process effacement
- Classify using standard nomenclature`,

  lungPathology: `
Lung Pathology Assessment requirements:
- For lung cancer:
  - Classify histologic type (adeno, squamous, small cell, etc.)
  - Grade differentiation
  - Assess invasion pattern
  - Document margins, pleural involvement
  - Report lymphovascular and perineural invasion
  - Include molecular markers (PD-L1, ALK, EGFR, ROS1)
- For interstitial lung disease:
  - Pattern recognition (UIP, NSIP, OP, DAD)
  - Distribution (upper vs lower, peripheral vs central)
  - Fibroblast foci
  - Honeycomb change
- For infections:
  - Special stains (GMS, AFB)
  - Viral inclusions
- Document stage using TNM criteria`,

  giPathology: `
GI Pathology Assessment requirements:
- For neoplasia:
  - Apply WHO classification
  - Assess dysplasia grade (low vs high)
  - Document invasion depth (pT stage)
  - Evaluate margins (proximal, distal, radial)
  - Lymph node count and metastases
  - Include molecular markers (MSI, MMR, KRAS, BRAF)
- For inflammatory conditions:
  - Activity grade (acute inflammation)
  - Chronicity features
  - Crypt architecture distortion
  - Helicobacter pylori evaluation
- For Barrett's esophagus:
  - Goblet cell presence
  - Dysplasia assessment
- Apply synoptic reporting (CAP protocols)`,

  // Laboratory Workflows
  grossExamination: `
Gross Examination requirements:
- Document specimen identification and labeling
- Measure and weigh specimen
- Describe external surface:
  - Color, texture, capsule integrity
  - Lesion characteristics
- Section specimen appropriately:
  - Perpendicular to margins
  - Representative sampling
- Describe cut surface:
  - Lesion size, shape, borders
  - Color, consistency
  - Relationship to margins
- Ink margins with color coding
- Photograph key findings
- Submit appropriate sections:
  - Margins, lesion, background tissue
  - Lymph nodes`,

  frozenSection: `
Frozen Section Interpretation requirements:
- Verify clinical question with surgeon
- Assess specimen adequacy
- Prioritize diagnostic accuracy:
  - Benign vs malignant
  - Margin status
  - Lymph node metastasis
- Recognize limitations:
  - Artifact from freezing
  - Sampling error
  - Need for permanent sections
- Communicate results clearly:
  - Positive/negative/indeterminate
  - Defer if uncertain
- Correlation with permanent sections
- Discrepancy tracking and review`,

  molecularPathology: `
Molecular Pathology Workflow requirements:
- Assess specimen adequacy:
  - Tumor content percentage
  - Fixation quality
  - Tissue quantity
- Select appropriate testing:
  - Single gene vs panel vs comprehensive genomic profiling
  - Tissue vs liquid biopsy
- Interpret results in context:
  - Pathogenic vs likely pathogenic vs VUS
  - Actionable vs non-actionable
- Integrate with morphology and IHC
- Report targetable alterations:
  - EGFR, ALK, ROS1, BRAF, NTRK, etc.
  - Microsatellite instability (MSI)
  - Tumor mutational burden (TMB)
- Include therapeutic implications`,

  cytologyInterpretation: `
Cytology Interpretation requirements:
- Assess specimen adequacy:
  - Cellularity
  - Preservation quality
  - Obscuring factors
- Evaluate for malignant features:
  - Nuclear:cytoplasmic ratio
  - Nuclear hyperchromasia
  - Irregular nuclear contours
  - Prominent nucleoli
  - Mitotic figures
- Apply site-specific systems:
  - Bethesda (gynecologic, thyroid)
  - Paris (urine)
- Recommend follow-up:
  - Repeat cytology
  - HPV testing
  - Core biopsy
- Correlate with clinical/imaging findings`,

  autopsyProtocol: `
Autopsy Protocol requirements:
- External examination:
  - Identifying features
  - Evidence of medical intervention
  - Injuries and lesions
- Internal examination (Virchow or Rokitansky method):
  - Body cavities
  - Organ systems sequentially
- Organ examination:
  - Weight, size, appearance
  - Serial sectioning
  - Lesion documentation
- Microscopic sampling:
  - All major organs
  - Any lesions
- Ancillary studies:
  - Toxicology
  - Microbiology cultures
  - Molecular studies if indicated
- Cause and manner of death determination
- Final autopsy report generation`,

  // Quality and Safety
  qualityAssurance: `
Pathology Quality Assurance requirements:
- Pre-analytical phase:
  - Specimen labeling verification
  - Requisition completeness
  - Fixation adequacy
- Analytical phase:
  - Staining quality control
  - IHC positive/negative controls
  - Technical review
- Post-analytical phase:
  - Report accuracy review
  - Critical value communication
  - Amended report tracking
- Metrics monitoring:
  - Turnaround time
  - Frozen section correlation
  - Amended report rate
  - Proficiency testing`,

  tumorBoard: `
Tumor Board Presentation requirements:
- Case summary:
  - Demographics and clinical history
  - Imaging findings
  - Prior pathology results
- Current pathology findings:
  - Diagnosis and grade
  - Stage (TNM)
  - Margin status
  - Prognostic factors
- Molecular results:
  - Biomarkers tested
  - Actionable mutations
  - MSI/TMB status
- Treatment implications:
  - Surgery options
  - Chemotherapy eligibility
  - Targeted therapy candidates
  - Immunotherapy biomarkers
- Multidisciplinary recommendations`,

  consultationService: `
Pathology Consultation requirements:
- Review clinical history and imaging
- Examine submitted materials:
  - Glass slides
  - Paraffin blocks
  - Digital images
- Assess technical quality
- Evaluate diagnostic features
- Consider differential diagnoses
- Recommend additional studies:
  - Deeper levels
  - Special stains
  - IHC panel
  - Molecular testing
- Provide written consultation report
- Communicate urgent findings
- Follow-up for final diagnosis`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Pathology-specific few-shot examples
 */
export const PATHOLOGY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a flowchart for undifferentiated malignant tumor workup',
    output: `flowchart TD
    A[("Undifferentiated\\nMalignancy")] --> B["Initial IHC Panel"]

    B --> C{"Pan-CK?"}
    C -->|"Positive"| D["CARCINOMA"]
    C -->|"Negative"| E{"CD45/LCA?"}

    D --> D1["CK7/CK20 Profile"]
    D1 -->|"CK7+/CK20-"| D2["Lung, Breast,\\nOvary, Thyroid"]
    D1 -->|"CK7-/CK20+"| D3["Colorectal,\\nMerkel"]
    D1 -->|"CK7+/CK20+"| D4["Urothelial,\\nPancreas, Ovary"]
    D1 -->|"CK7-/CK20-"| D5["RCC, HCC,\\nProstate, Adrenal"]

    D2 --> D6["TTF1, Napsin-A\\nGATA3, ER/PR\\nPAX8, WT1"]
    D3 --> D7["CDX2, SATB2\\nCK20"]
    D4 --> D8["GATA3, Uroplakin\\nPAX8"]
    D5 --> D9["PAX8, Hep-Par1\\nNKX3.1, SF1"]

    E -->|"Positive"| F["LYMPHOMA"]
    E -->|"Negative"| G{"S100?"}

    F --> F1["CD20 vs CD3"]
    F1 -->|"CD20+"| F2["B-cell Lymphoma\\nPanel"]
    F1 -->|"CD3+"| F3["T-cell Lymphoma\\nPanel"]

    G -->|"Positive"| H{"Melan-A/HMB45?"}
    G -->|"Negative"| I{"Desmin/SMA?"}

    H -->|"Positive"| J["MELANOMA"]
    H -->|"Negative"| K["Neural Tumor\\nor Sarcoma"]

    I -->|"Positive"| L["SARCOMA"]
    I -->|"Negative"| M["Expand Panel"]

    L --> L1["SMA, Desmin, MyoD1\\nCD34, S100, CD99"]

    style A fill:#8B0000,color:#fff
    style D fill:#FFB6C1,color:#000
    style F fill:#9370DB,color:#fff
    style J fill:#2F2F2F,color:#fff
    style L fill:#87CEEB,color:#000`,
  },
  {
    prompt: 'Create a bone marrow evaluation algorithm for pancytopenia',
    output: `flowchart TD
    A[("Pancytopenia\\nBone Marrow")] --> B["Assess Cellularity"]

    B --> C{"Cellularity?"}
    C -->|"Hypocellular\\n<25%"| D["Hypoplastic\\nProcess"]
    C -->|"Normocellular"| E["Evaluate\\nTrilineage"]
    C -->|"Hypercellular\\n>75%"| F["Infiltrative or\\nMyeloproliferative"]

    D --> D1{"Residual\\nHematopoiesis?"}
    D1 -->|"Trilineage,\\nNo Dysplasia"| D2["Aplastic Anemia\\nWorkup"]
    D1 -->|"Dysplastic\\nChanges"| D3["Hypoplastic MDS"]
    D1 -->|"PNH Clone\\nPresent"| D4["AA-PNH\\nSyndrome"]

    E --> E1{"Blast Count?"}
    E1 -->|"<5%"| E2["MDS vs\\nReactive"]
    E1 -->|"5-9%"| E3["MDS-EB1"]
    E1 -->|"10-19%"| E4["MDS-EB2"]
    E1 -->|">=20%"| E5["Acute\\nLeukemia"]

    E2 --> E6{"Dysplasia?"}
    E6 -->|"Yes"| E7["Ring Sideroblasts?\\nCytogenetics"]
    E6 -->|"No"| E8["B12/Folate\\nCopper, Zinc"]

    F --> F1{"Blast Count?"}
    F1 -->|">=20%"| F2["Acute Leukemia"]
    F1 -->|"<20%"| F3{"Architecture?"}

    F3 -->|"Diffuse\\nInfiltrate"| F4["Lymphoma,\\nMyeloma, Mets"]
    F3 -->|"Megakaryocyte\\nClustering"| F5["MPN Workup"]

    F2 --> F6{"Lineage?"}
    F6 -->|"MPO+/CD13+\\nCD33+/CD117+"| F7["AML\\nSubtype"]
    F6 -->|"TdT+/CD10+\\nCD19+ or CD3+"| F8["ALL\\nSubtype"]

    F7 --> F9["WHO Classification\\nCytogenetics\\nMolecular"]
    F8 --> F10["Immunophenotype\\nCytogenetics\\nMolecular"]

    style A fill:#FFA500,color:#000
    style D2 fill:#DC143C,color:#fff
    style E5 fill:#8B0000,color:#fff
    style F2 fill:#8B0000,color:#fff
    style E7 fill:#FFD700,color:#000`,
  },
  {
    prompt: 'Create a liver biopsy interpretation flowchart',
    output: `flowchart TD
    A[("Liver\\nBiopsy")] --> B["Adequacy Check\\n>10 portal tracts"]

    B --> C["Portal Tract\\nExamination"]
    B --> D["Lobular\\nExamination"]

    C --> C1{"Portal\\nInflammation?"}
    C1 -->|"Yes"| C2{"Cell Type?"}
    C1 -->|"No"| C3["Evaluate\\nOther Features"]

    C2 -->|"Lymphocytes\\n± Plasma cells"| C4["Chronic Hepatitis\\nPattern"]
    C2 -->|"Neutrophils"| C5["Biliary or\\nAcute Process"]
    C2 -->|"Granulomas"| C6["Sarcoid, TB,\\nPBC, Drug"]

    C4 --> C7{"Interface\\nActivity?"}
    C7 -->|"Present"| C8["Grade Activity\\n(HAI/Ishak)"]
    C7 -->|"Absent"| C9["Minimal\\nActivity"]

    C8 --> C10["Viral Markers:\\nHBsAg IHC\\nPer/Post Tx"]

    D --> D1{"Steatosis?"}
    D1 -->|"Yes"| D2["Grade:\\n<5%, 5-33%\\n33-66%, >66%"]
    D1 -->|"No"| D3["Hepatocyte\\nInjury Pattern"]

    D2 --> D4{"Ballooning/\\nMallory-Denk?"}
    D4 -->|"Yes"| D5["Steatohepatitis\\nNAS Score"]
    D4 -->|"No"| D6["Simple\\nSteatosis"]

    D3 --> D7{"Pattern?"}
    D7 -->|"Zone 3"| D8["Drug, Ischemia\\nCongestion"]
    D7 -->|"Zone 1"| D9["Toxin,\\nEclampsia"]
    D7 -->|"Random"| D10["Viral, Drug"]

    C8 & D5 --> E["Fibrosis\\nAssessment"]
    E --> E1["Trichrome Stain"]
    E1 --> E2{"Stage?"}
    E2 -->|"Portal"| E3["Stage 1"]
    E2 -->|"Periportal"| E4["Stage 2"]
    E2 -->|"Bridging"| E5["Stage 3"]
    E2 -->|"Cirrhosis"| E6["Stage 4"]

    E6 --> E7["Evaluate for\\nDysplasia/HCC"]

    style A fill:#8B4513,color:#fff
    style D5 fill:#FFD700,color:#000
    style E6 fill:#DC143C,color:#fff
    style E7 fill:#8B0000,color:#fff`,
  },
  {
    prompt: 'Create a TNM staging diagram for colorectal cancer',
    output: `flowchart TD
    subgraph T["T Stage - Depth of Invasion"]
        T0["Tis: Carcinoma\\nin situ"]
        T1["T1: Submucosa"]
        T2["T2: Muscularis\\npropria"]
        T3["T3: Through MP\\ninto subserosa"]
        T4["T4a: Visceral\\nperitoneum"]
        T4b["T4b: Adjacent\\norgans"]
    end

    subgraph N["N Stage - Lymph Nodes"]
        N0["N0: No nodes"]
        N1a["N1a: 1 node"]
        N1b["N1b: 2-3 nodes"]
        N1c["N1c: Tumor\\ndeposits only"]
        N2a["N2a: 4-6 nodes"]
        N2b["N2b: >=7 nodes"]
    end

    subgraph M["M Stage - Metastasis"]
        M0["M0: No distant\\nmetastasis"]
        M1a["M1a: One organ\\n(liver, lung)"]
        M1b["M1b: Multiple\\norgans"]
        M1c["M1c: Peritoneal\\nmetastasis"]
    end

    subgraph Stage["Stage Groups"]
        S0["Stage 0\\nTis N0 M0"]
        S1["Stage I\\nT1-2 N0 M0"]
        S2A["Stage IIA\\nT3 N0 M0"]
        S2B["Stage IIB\\nT4a N0 M0"]
        S2C["Stage IIC\\nT4b N0 M0"]
        S3A["Stage IIIA\\nT1-2 N1 M0"]
        S3B["Stage IIIB\\nT3-4a N1 M0"]
        S3C["Stage IIIC\\nT any N2 M0"]
        S4["Stage IV\\nAny T/N M1"]
    end

    T0 --> S0
    T1 --> S1
    T2 --> S1
    T3 --> S2A
    T4 --> S2B
    T4b --> S2C

    N1a --> S3A
    N1b --> S3B
    N2a --> S3C
    N2b --> S3C

    M1a --> S4
    M1b --> S4
    M1c --> S4

    subgraph Prognostic["Prognostic Factors"]
        P1["MMR/MSI Status"]
        P2["KRAS/NRAS/BRAF"]
        P3["Grade"]
        P4["LVI/PNI"]
        P5["Tumor Deposits"]
    end

    style S0 fill:#228B22,color:#fff
    style S1 fill:#90EE90,color:#000
    style S2A fill:#FFD700,color:#000
    style S3B fill:#FFA500,color:#000
    style S4 fill:#DC143C,color:#fff`,
  },
  {
    prompt: 'Create an IHC panel selection guide for lung tumors',
    output: `flowchart TD
    A[("Lung Mass\\nBiopsy")] --> B{"Morphology?"}

    B -->|"Glandular\\nAcinar, Papillary"| C["Adenocarcinoma\\nPanel"]
    B -->|"Squamous\\nKeratinization"| D["Squamous\\nPanel"]
    B -->|"Small cells\\nHigh N:C"| E["Small Cell\\nWorkup"]
    B -->|"Large cells\\nUndifferentiated"| F["Extended\\nPanel"]
    B -->|"Carcinoid\\nFeatures"| G["Neuroendocrine\\nPanel"]

    C --> C1["TTF1, Napsin-A"]
    C1 --> C2{"Positive?"}
    C2 -->|"Yes"| C3["Primary Lung\\nAdenocarcinoma"]
    C2 -->|"Negative"| C4["Rule out\\nMetastasis"]

    C4 --> C5["CK7/CK20\\nPAX8, CDX2\\nGATA3, ER"]

    D --> D1["p40, CK5/6"]
    D1 --> D2{"Positive?"}
    D2 -->|"Yes"| D3["Squamous Cell\\nCarcinoma"]
    D2 -->|"Negative"| D4["Consider Poorly\\nDiff Carcinoma"]

    E --> E1["Synaptophysin\\nChromogranin\\nCD56"]
    E --> E2["Ki67 Index"]
    E1 --> E3{"Pattern?"}
    E3 -->|"NE+, Ki67>50%\\nCD56+"| E4["Small Cell\\nCarcinoma"]
    E3 -->|"NE+, Ki67<20%"| E5["Carcinoid\\nTumor"]

    F --> F1["Pan-CK, TTF1\\np40, NE markers"]
    F1 --> F2{"TTF1+ p40-?"}
    F2 -->|"Yes"| F3["Solid Adeno"]
    F2 -->|"No"| F4{"TTF1- p40+?"}
    F4 -->|"Yes"| F5["Poorly Diff\\nSquamous"]
    F4 -->|"No"| F6["Large Cell\\nCarcinoma NOS"]

    G --> G1["Synaptophysin\\nChromogranin"]
    G --> G2["Ki67 Count"]
    G2 -->|"<3%"| G3["Typical\\nCarcinoid"]
    G2 -->|"3-20%"| G4["Atypical\\nCarcinoid"]
    G2 -->|">20%"| G5["Large Cell NE\\nCarcinoma"]

    C3 --> H["Molecular Testing"]
    H --> H1["EGFR, ALK\\nROS1, BRAF\\nKRAS, MET\\nRET, NTRK\\nPD-L1"]

    style A fill:#4169E1,color:#fff
    style C3 fill:#228B22,color:#fff
    style D3 fill:#228B22,color:#fff
    style E4 fill:#DC143C,color:#fff
    style H fill:#9370DB,color:#fff`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

export default {
  PATHOLOGY_DOMAIN_PROMPT,
  PATHOLOGY_PROMPTS,
  PATHOLOGY_FEW_SHOT_EXAMPLES,
};
