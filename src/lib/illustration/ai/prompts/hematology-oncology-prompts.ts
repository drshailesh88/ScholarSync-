/**
 * hematology-oncology-prompts.ts
 * Domain-specific prompts for Hematology/Oncology diagram generation
 *
 * Contains specialized prompts and few-shot examples for:
 * - Blood cell morphology diagrams
 * - Coagulation pathway illustrations
 * - Cancer staging and treatment protocols
 * - Bone marrow and flow cytometry interpretations
 */

// =============================================================================
// DOMAIN-SPECIFIC SYSTEM PROMPTS
// =============================================================================

/**
 * Base hematology/oncology system prompt
 */
export const HEMATOLOGY_ONCOLOGY_SYSTEM_PROMPT = `You are an expert hematology/oncology diagram generator for scientific and medical illustrations.
Your role is to create accurate, publication-quality diagrams for blood diseases and cancer medicine.

Domain Expertise:
- Blood cell morphology and hematopoiesis
- Coagulation cascade and bleeding disorders
- Leukemias, lymphomas, and plasma cell disorders
- Cancer staging systems (Ann Arbor, TNM, ISS)
- Chemotherapy regimens and treatment protocols
- Bone marrow pathology and flow cytometry

Visualization Standards:
- Use standard hematology color conventions (red for RBC, blue for venous, etc.)
- Follow WHO classification nomenclature
- Include relevant lab values and thresholds
- Use proper medical abbreviations
- Ensure accuracy in pathway arrows and relationships

Quality Requirements:
- Diagrams must be scientifically accurate
- Include standard clinical cutoffs and thresholds
- Use appropriate symbols for cell types
- Maintain visual hierarchy for decision trees
- Follow NCCN/ASH guideline recommendations where applicable`;

/**
 * Blood cell morphology prompt
 */
export const BLOOD_CELL_MORPHOLOGY_PROMPT = `When creating blood cell morphology diagrams:

Cell Identification Standards:
- RBCs: Describe size (micro/normo/macrocytic), color (hypo/normo/hyperchromic), shape
- WBCs: Note nuclear features, cytoplasmic characteristics, granules
- Platelets: Assess number, size, granularity
- Inclusions: Identify Howell-Jolly bodies, basophilic stippling, Heinz bodies, etc.

Common Abnormalities to Illustrate:
- Sickle cells, target cells, spherocytes, schistocytes
- Blast cells with high N:C ratio
- Auer rods (pathognomonic for AML)
- Rouleaux formation (myeloma)
- Reed-Sternberg cells (Hodgkin lymphoma)

Color Conventions:
- Normal RBC: Light pink/salmon
- Hypochromic RBC: Very pale pink
- Polychromatic RBC: Bluish tint
- WBC nucleus: Purple/blue
- WBC cytoplasm: Light blue or pink depending on type
- Platelets: Light purple`;

/**
 * Coagulation cascade prompt
 */
export const COAGULATION_CASCADE_PROMPT = `When creating coagulation cascade diagrams:

Pathway Requirements:
- Clearly distinguish intrinsic (PTT) and extrinsic (PT) pathways
- Show the common pathway (Factor X → Thrombin → Fibrin)
- Include natural anticoagulants (Protein C, S, Antithrombin)
- Note fibrinolysis pathway if relevant

Factor Naming Conventions:
- Use Roman numerals for clotting factors (I, II, V, VII, VIII, IX, X, XI, XII, XIII)
- Indicate activated forms with lowercase 'a' (e.g., Xa, IIa)
- Include tissue factor (TF) and calcium ions where relevant

Clinical Correlations:
- Link factors to bleeding disorders (Hemophilia A = Factor VIII, B = Factor IX)
- Show where anticoagulants act (Warfarin = II, VII, IX, X; Heparin = Antithrombin)
- Note laboratory tests that assess each pathway

Visual Layout:
- Intrinsic pathway typically on left
- Extrinsic pathway typically on right
- Common pathway at bottom converging to fibrin clot`;

/**
 * Cancer staging prompt
 */
export const CANCER_STAGING_PROMPT = `When creating cancer staging diagrams:

Staging Systems to Use:
- Lymphoma: Ann Arbor staging (I-IV) with A/B designation
- Multiple Myeloma: R-ISS staging (I-III)
- Leukemia: Risk stratification (favorable/intermediate/adverse)
- Solid tumors: TNM staging where applicable

Key Elements to Include:
- Clear criteria for each stage
- Prognostic implications (survival data)
- Treatment implications based on stage
- B symptoms definition for lymphoma (fever, night sweats, >10% weight loss)

Visual Recommendations:
- Use progressive colors (green → yellow → red) for worsening prognosis
- Include median survival or 5-year OS where available
- Show decision points that change management
- Indicate when to start treatment vs. observe`;

/**
 * Treatment protocol prompt
 */
export const TREATMENT_PROTOCOL_PROMPT = `When creating chemotherapy and treatment protocol diagrams:

Regimen Documentation:
- Include full regimen name and acronym (e.g., R-CHOP, ABVD, VRd)
- Specify cycle length and number of cycles
- List drugs with timing (Day 1, Days 1-5, etc.)
- Include premedications and supportive care

Dose Modification Guidance:
- Show criteria for dose reductions
- Include toxicity management algorithms
- Note G-CSF support indications
- Specify monitoring requirements

Treatment Response Assessment:
- Define response criteria (CR, PR, SD, PD)
- Indicate restaging timepoints
- Show maintenance therapy transitions
- Include relapse/refractory management

Safety Alerts:
- Highlight tumor lysis syndrome risk and prevention
- Include neutropenic fever thresholds (ANC <500 + fever)
- Note transfusion thresholds
- Identify high-risk for DIC or bleeding`;

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Hematology/Oncology few-shot examples
 */
export const HEMATOLOGY_ONCOLOGY_EXAMPLES = {
  hematopoiesis: {
    prompt: 'Create a diagram showing normal hematopoiesis from stem cell to mature blood cells',
    output: `flowchart TB
    HSC["Hematopoietic\\nStem Cell\\n(CD34+)"] --> MPP["Multipotent\\nProgenitor"]
    MPP --> CMP["Common Myeloid\\nProgenitor"]
    MPP --> CLP["Common Lymphoid\\nProgenitor"]
    CMP --> MEP["Megakaryocyte-\\nErythroid Progenitor"]
    CMP --> GMP["Granulocyte-\\nMonocyte Progenitor"]
    MEP -->|"EPO"| ERY["Erythrocytes\\n(RBC)"]
    MEP -->|"TPO"| PLT["Platelets"]
    GMP -->|"G-CSF"| NEUT["Neutrophils"]
    GMP -->|"M-CSF"| MONO["Monocytes"]
    GMP --> EOS["Eosinophils"]
    GMP --> BASO["Basophils"]
    CLP --> TCELL["T Lymphocytes"]
    CLP --> BCELL["B Lymphocytes"]
    CLP --> NK["NK Cells"]
    style HSC fill:#FFD700
    style ERY fill:#DC143C,color:#fff
    style PLT fill:#DDA0DD
    style NEUT fill:#87CEEB`,
  },

  anemiaWorkup: {
    prompt: 'Create a diagnostic algorithm for evaluating anemia based on MCV',
    output: `flowchart TD
    A["Anemia Detected\\nHgb <12 (F) or <13 (M)"] --> B["Obtain MCV"]
    B --> C{"MCV Value?"}
    C -->|"<80 fL"| D["Microcytic Anemia"]
    C -->|"80-100 fL"| E["Normocytic Anemia"]
    C -->|">100 fL"| F["Macrocytic Anemia"]
    D --> D1["Check Iron Studies"]
    D1 --> D2{"Low Ferritin?"}
    D2 -->|"Yes"| D3["Iron Deficiency"]
    D2 -->|"No"| D4["Thalassemia\\nor ACD"]
    E --> E1["Check Reticulocyte\\nCount"]
    E1 --> E2{"Elevated?"}
    E2 -->|"Yes"| E3["Hemolysis or\\nBlood Loss"]
    E2 -->|"No"| E4["Marrow Failure\\nor ACD"]
    F --> F1["Check B12, Folate"]
    F1 --> F2{"Deficient?"}
    F2 -->|"Yes"| F3["B12/Folate\\nDeficiency"]
    F2 -->|"No"| F4["MDS, Drugs,\\nor Liver Disease"]
    style D3 fill:#FFA500,color:#000
    style E3 fill:#DC143C,color:#fff
    style F3 fill:#4169E1,color:#fff`,
  },

  coagulation: {
    prompt: 'Create a diagram of the coagulation cascade showing intrinsic and extrinsic pathways',
    output: `flowchart TB
    subgraph INT["Intrinsic Pathway (PTT)"]
        XII["Factor XII"] -->|"Contact activation"| XIIa["XIIa"]
        XIIa --> XI["Factor XI → XIa"]
        XI --> IX["Factor IX → IXa"]
        IX --> VIII["+ Factor VIIIa"]
    end
    subgraph EXT["Extrinsic Pathway (PT/INR)"]
        TF["Tissue Factor"] --> VII["Factor VII → VIIa"]
    end
    VIII --> X["Factor X → Xa"]
    VII --> X
    subgraph COM["Common Pathway"]
        X --> V["+ Factor Va"]
        V --> II["Prothrombin (II) → Thrombin (IIa)"]
        II --> I["Fibrinogen (I) → Fibrin"]
        I --> XIII["XIIIa Cross-links"]
        XIII --> CLOT["Stable Fibrin Clot"]
    end
    style CLOT fill:#DC143C,color:#fff
    style TF fill:#FFA500,color:#000
    style II fill:#FFD700,color:#000`,
  },

  febrileNeutropenia: {
    prompt: 'Create a management algorithm for febrile neutropenia in oncology patients',
    output: `flowchart TD
    A["🚨 Febrile Neutropenia\\nANC <500 + Temp ≥38.3°C"] --> B["Immediate Actions\\n<30 minutes"]
    B --> C["Blood cultures x2\\nUA, CXR\\nCMP, LFTs"]
    B --> D["Start empiric antibiotics\\nwithin 1 hour"]
    D --> E{"Risk Assessment\\n(MASCC Score)"}
    E -->|"Low Risk\\n(≥21)"| F["Consider outpatient\\nwith fluoroquinolone"]
    E -->|"High Risk\\n(<21)"| G["Admit for\\nIV antibiotics"]
    G --> H["Cefepime or\\nPiperacillin-Tazobactam"]
    H --> I{"Hemodynamically\\nUnstable?"}
    I -->|"Yes"| J["Add Vancomycin\\n+ Consider antifungal"]
    I -->|"No"| K["Monitor closely"]
    K --> L{"Fever persists\\n>4-7 days?"}
    L -->|"Yes"| M["Add empiric\\nantifungal"]
    L -->|"No"| N["Continue until\\nANC recovery"]
    style A fill:#DC143C,color:#fff
    style D fill:#FFA500,color:#000
    style J fill:#8B0000,color:#fff`,
  },

  lymphomaStaging: {
    prompt: 'Create an Ann Arbor staging diagram for lymphoma',
    output: `flowchart LR
    subgraph S1["Stage I"]
        I["Single lymph node region\\nOR single extranodal site (IE)"]
    end
    subgraph S2["Stage II"]
        II["≥2 lymph node regions\\nSAME side of diaphragm\\n± localized extranodal (IIE)"]
    end
    subgraph S3["Stage III"]
        III["Lymph nodes on\\nBOTH sides of diaphragm\\n± spleen (IIIS)"]
    end
    subgraph S4["Stage IV"]
        IV["Diffuse extranodal\\ninvolvement\\n(liver, bone marrow, lung)"]
    end
    I --> II --> III --> IV
    BS["B Symptoms:\\n- Fever >38°C\\n- Night sweats\\n- Weight loss >10%"]
    style S1 fill:#28A745,color:#fff
    style S2 fill:#FFC107,color:#000
    style S3 fill:#FD7E14,color:#fff
    style S4 fill:#DC3545,color:#fff`,
  },
};

// =============================================================================
// DIAGRAM TYPE SPECIFIC PROMPTS
// =============================================================================

/**
 * Type-specific prompts for hematology/oncology diagrams
 */
export const HEMATOLOGY_ONCOLOGY_TYPE_PROMPTS: Record<string, string> = {
  'blood-smear': BLOOD_CELL_MORPHOLOGY_PROMPT,
  'coagulation': COAGULATION_CASCADE_PROMPT,
  'cancer-staging': CANCER_STAGING_PROMPT,
  'treatment-protocol': TREATMENT_PROTOCOL_PROMPT,
  'hematopoiesis': `When illustrating hematopoiesis:
- Start with HSC (CD34+ CD38-)
- Show clear branching to myeloid and lymphoid lineages
- Include key growth factors (EPO, TPO, G-CSF, M-CSF)
- Show all mature cell types
- Use color coding for different lineages`,
  'bone-marrow': `When illustrating bone marrow findings:
- Note cellularity as percentage (normal: 100 - age)
- Describe M:E ratio (normal 2-4:1)
- Identify blast percentage (≥20% = acute leukemia)
- Grade fibrosis if present (MF-0 to MF-3)
- Include special stains and IHC findings`,
  'flow-cytometry': `When illustrating flow cytometry results:
- Use standard CD marker nomenclature
- Show gating strategy (CD45 vs SSC)
- Identify lineage-specific markers
- Note aberrant expression patterns
- Include MRD assessment if relevant`,
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Build complete prompt for hematology/oncology diagrams
 */
export function buildHematologyOncologyPrompt(params: {
  userPrompt: string;
  diagramType?: string;
  includeExamples?: boolean;
}): string {
  const { userPrompt, diagramType, includeExamples = true } = params;

  const parts: string[] = [HEMATOLOGY_ONCOLOGY_SYSTEM_PROMPT];

  // Add type-specific guidance
  if (diagramType && HEMATOLOGY_ONCOLOGY_TYPE_PROMPTS[diagramType]) {
    parts.push(HEMATOLOGY_ONCOLOGY_TYPE_PROMPTS[diagramType]);
  }

  // Add few-shot examples if requested
  if (includeExamples) {
    const relevantExamples = Object.entries(HEMATOLOGY_ONCOLOGY_EXAMPLES)
      .slice(0, 2)
      .map(([, ex]) => `User: ${ex.prompt}\nAssistant:\n\`\`\`mermaid\n${ex.output}\n\`\`\``)
      .join('\n\n');
    parts.push(`\nExamples:\n${relevantExamples}`);
  }

  parts.push(`\nUser request: ${userPrompt}`);
  parts.push('\nGenerate the diagram code:');

  return parts.join('\n');
}

/**
 * Get domain prompt for hematology/oncology
 */
export function getHematologyOncologyDomainPrompt(): string {
  return `
Hematology/Oncology diagram requirements:
- Use standard WHO/NCCN classification systems
- Include relevant lab values and thresholds
- Follow evidence-based treatment guidelines
- Use proper hematology/oncology terminology
- Include prognostic information where relevant
- Show clear decision points in algorithms
- Use standard cell morphology descriptions
- Reference MASCC, ISS, Ann Arbor staging as appropriate`;
}

// =============================================================================
// EXPORTS
// =============================================================================

export const hematologyOncologyPrompts = {
  system: HEMATOLOGY_ONCOLOGY_SYSTEM_PROMPT,
  bloodCellMorphology: BLOOD_CELL_MORPHOLOGY_PROMPT,
  coagulationCascade: COAGULATION_CASCADE_PROMPT,
  cancerStaging: CANCER_STAGING_PROMPT,
  treatmentProtocol: TREATMENT_PROTOCOL_PROMPT,
  examples: HEMATOLOGY_ONCOLOGY_EXAMPLES,
  typePrompts: HEMATOLOGY_ONCOLOGY_TYPE_PROMPTS,
  buildPrompt: buildHematologyOncologyPrompt,
  getDomainPrompt: getHematologyOncologyDomainPrompt,
};

export default hematologyOncologyPrompts;
