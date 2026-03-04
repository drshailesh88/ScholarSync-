/**
 * hematology-oncology.ts
 * Hematology/Oncology diagram templates for FINNISH
 *
 * Contains comprehensive templates for blood diseases and cancer medicine including:
 * - Hematopoiesis and blood cell development
 * - Coagulation cascade diagrams
 * - Cancer staging and treatment protocols
 * - Diagnostic algorithms
 * - Treatment flowcharts
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// HEMATOPOIESIS & BLOOD CELL DEVELOPMENT
// =============================================================================

/**
 * Hematopoiesis Diagram template
 */
export const hematopoiesisDiagram: DiagramTemplate = {
  id: 'hemeonc-hematopoiesis',
  name: 'Hematopoiesis Diagram',
  description: 'Complete blood cell development pathway from stem cell to mature cells',
  domain: 'medicine',
  promptTemplate: `Create a hematopoiesis diagram showing:
- Stem cell population: {{stemCells}}
- Myeloid lineage: {{myeloidLineage}}
- Lymphoid lineage: {{lymphoidLineage}}
- Erythroid development: {{erythroidDevelopment}}
- Megakaryocyte pathway: {{megakaryocytePath}}
- Growth factors involved: {{growthFactors}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'stemCells',
    'myeloidLineage',
    'lymphoidLineage',
    'erythroidDevelopment',
    'megakaryocytePath',
    'growthFactors',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    HSC["Hematopoietic Stem Cell"] --> CMP["Common Myeloid Progenitor"]
    HSC --> CLP["Common Lymphoid Progenitor"]
    CMP --> MEP["Megakaryocyte-Erythroid Progenitor"]
    CMP --> GMP["Granulocyte-Monocyte Progenitor"]
    MEP --> RBC["Red Blood Cells"]
    MEP --> PLT["Platelets"]
    GMP --> NEUT["Neutrophils"]
    GMP --> MONO["Monocytes"]
    CLP --> TCELL["T Cells"]
    CLP --> BCELL["B Cells"]
    CLP --> NK["NK Cells"]
    style HSC fill:#FFD700,color:#000
    style RBC fill:#DC143C,color:#fff
    style TCELL fill:#4169E1,color:#fff`,
};

/**
 * Coagulation Cascade template
 */
export const coagulationCascade: DiagramTemplate = {
  id: 'hemeonc-coagulation-cascade',
  name: 'Coagulation Cascade',
  description: 'Complete intrinsic and extrinsic coagulation pathways',
  domain: 'medicine',
  promptTemplate: `Create a coagulation cascade diagram showing:
- Intrinsic pathway factors: {{intrinsicFactors}}
- Extrinsic pathway factors: {{extrinsicFactors}}
- Common pathway: {{commonPathway}}
- Fibrin formation: {{fibrinFormation}}
- Natural anticoagulants: {{anticoagulants}}
- Clinical correlations: {{clinicalCorrelations}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'intrinsicFactors',
    'extrinsicFactors',
    'commonPathway',
    'fibrinFormation',
    'anticoagulants',
    'clinicalCorrelations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Intrinsic["Intrinsic Pathway (PTT)"]
        XII["XII"] --> XIIa["XIIa"]
        XIIa --> XI["XI → XIa"]
        XI --> IX["IX → IXa"]
    end
    subgraph Extrinsic["Extrinsic Pathway (PT)"]
        TF["Tissue Factor"] --> VII["VII → VIIa"]
    end
    IX --> X["X → Xa"]
    VII --> X
    subgraph Common["Common Pathway"]
        X --> PROT["Prothrombin → Thrombin"]
        PROT --> FIB["Fibrinogen → Fibrin"]
        FIB --> CLOT["Stable Clot"]
    end
    style CLOT fill:#DC143C,color:#fff
    style TF fill:#FFA500,color:#000`,
};

/**
 * Blood Smear Interpretation template
 */
export const bloodSmearInterpretation: DiagramTemplate = {
  id: 'hemeonc-blood-smear',
  name: 'Blood Smear Interpretation Guide',
  description: 'Systematic approach to peripheral blood smear analysis',
  domain: 'medicine',
  promptTemplate: `Create a blood smear interpretation guide:
- RBC morphology: {{rbcMorphology}}
- WBC differential: {{wbcDifferential}}
- Platelet assessment: {{plateletAssessment}}
- Abnormal cells present: {{abnormalCells}}
- Inclusions noted: {{inclusions}}
- Clinical interpretation: {{interpretation}}
{{#additionalNotes}}Additional findings: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'rbcMorphology',
    'wbcDifferential',
    'plateletAssessment',
    'abnormalCells',
    'inclusions',
    'interpretation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Blood Smear Analysis"] --> B["RBC Assessment"]
    A --> C["WBC Assessment"]
    A --> D["Platelet Assessment"]
    B --> B1["Size: Micro/Normo/Macro"]
    B --> B2["Color: Hypo/Normo/Hyperchromic"]
    B --> B3["Shape: Poikilocytosis?"]
    C --> C1["Count: High/Normal/Low"]
    C --> C2["Differential"]
    C --> C3["Abnormal cells?"]
    D --> D1["Number adequate?"]
    D --> D2["Size normal?"]
    style A fill:#4169E1,color:#fff`,
};

// =============================================================================
// CANCER STAGING & CLASSIFICATION
// =============================================================================

/**
 * Lymphoma Staging (Ann Arbor) template
 */
export const lymphomaStagingAnnArbor: DiagramTemplate = {
  id: 'hemeonc-lymphoma-staging',
  name: 'Lymphoma Staging (Ann Arbor)',
  description: 'Ann Arbor staging system for Hodgkin and Non-Hodgkin lymphoma',
  domain: 'medicine',
  promptTemplate: `Create a lymphoma staging diagram:
- Stage I criteria: {{stageI}}
- Stage II criteria: {{stageII}}
- Stage III criteria: {{stageIII}}
- Stage IV criteria: {{stageIV}}
- B symptoms: {{bSymptoms}}
- Bulky disease criteria: {{bulkyDisease}}
{{#additionalNotes}}Additional classification: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'stageI',
    'stageII',
    'stageIII',
    'stageIV',
    'bSymptoms',
    'bulkyDisease',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Stage1["Stage I"]
        S1["Single lymph node region"]
    end
    subgraph Stage2["Stage II"]
        S2["≥2 regions, same side of diaphragm"]
    end
    subgraph Stage3["Stage III"]
        S3["Both sides of diaphragm"]
    end
    subgraph Stage4["Stage IV"]
        S4["Extranodal involvement"]
    end
    S1 --> S2 --> S3 --> S4
    B["B Symptoms: Fever, Night sweats, Weight loss"]
    style Stage4 fill:#DC143C,color:#fff`,
};

/**
 * Leukemia Classification template
 */
export const leukemiaClassification: DiagramTemplate = {
  id: 'hemeonc-leukemia-classification',
  name: 'Leukemia Classification',
  description: 'WHO classification of acute and chronic leukemias',
  domain: 'medicine',
  promptTemplate: `Create a leukemia classification diagram:
- Acute vs chronic: {{acuteVsChronic}}
- Myeloid leukemias: {{myeloidTypes}}
- Lymphoid leukemias: {{lymphoidTypes}}
- Cytogenetic subtypes: {{cytogenetics}}
- Risk stratification: {{riskStratification}}
- Key mutations: {{keyMutations}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'acuteVsChronic',
    'myeloidTypes',
    'lymphoidTypes',
    'cytogenetics',
    'riskStratification',
    'keyMutations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    LEU["Leukemia"] --> ACUTE["Acute"]
    LEU --> CHRONIC["Chronic"]
    ACUTE --> AML["AML"]
    ACUTE --> ALL["ALL"]
    CHRONIC --> CML["CML"]
    CHRONIC --> CLL["CLL"]
    AML --> AML1["t(15;17) - APL"]
    AML --> AML2["t(8;21)"]
    ALL --> ALL1["Ph+ ALL"]
    ALL --> ALL2["T-ALL"]
    style APL fill:#28A745,color:#fff
    style CML fill:#FFA500,color:#000`,
};

/**
 * Multiple Myeloma Staging template
 */
export const myelomaStagingISS: DiagramTemplate = {
  id: 'hemeonc-myeloma-staging',
  name: 'Multiple Myeloma Staging (R-ISS)',
  description: 'Revised International Staging System for multiple myeloma',
  domain: 'medicine',
  promptTemplate: `Create a multiple myeloma staging diagram:
- Stage I criteria: {{stageI}}
- Stage II criteria: {{stageII}}
- Stage III criteria: {{stageIII}}
- Cytogenetic risk: {{cytogeneticRisk}}
- LDH significance: {{ldhSignificance}}
- Prognostic implications: {{prognosis}}
{{#additionalNotes}}Additional factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'stageI',
    'stageII',
    'stageIII',
    'cytogeneticRisk',
    'ldhSignificance',
    'prognosis',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Multiple Myeloma\\nDiagnosis"] --> B{"β2M & Albumin"}
    B -->|"β2M <3.5 & Alb ≥3.5"| C["Stage I"]
    B -->|"Neither I nor III"| D["Stage II"]
    B -->|"β2M ≥5.5"| E["Stage III"]
    C --> F{"High-risk cytogenetics\\nor LDH elevated?"}
    F -->|"Yes"| D
    F -->|"No"| G["R-ISS I\\nMedian OS: NR"]
    E --> H["R-ISS III\\nMedian OS: 29mo"]
    style G fill:#28A745,color:#fff
    style H fill:#DC143C,color:#fff`,
};

// =============================================================================
// TREATMENT PROTOCOLS & ALGORITHMS
// =============================================================================

/**
 * Chemotherapy Regimen template
 */
export const chemotherapyRegimen: DiagramTemplate = {
  id: 'hemeonc-chemo-regimen',
  name: 'Chemotherapy Regimen Flowchart',
  description: 'Treatment protocol with cycle timing and dose modifications',
  domain: 'medicine',
  promptTemplate: `Create a chemotherapy regimen flowchart:
- Regimen name: {{regimenName}}
- Cycle length: {{cycleLength}}
- Day 1 drugs: {{day1Drugs}}
- Other day drugs: {{otherDayDrugs}}
- Premedications: {{premedications}}
- Dose modifications: {{doseModifications}}
- Toxicity monitoring: {{toxicityMonitoring}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'regimenName',
    'cycleLength',
    'day1Drugs',
    'otherDayDrugs',
    'premedications',
    'doseModifications',
    'toxicityMonitoring',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Cycle["Cycle 1-6 (q21 days)"]
        D1["Day 1:\\nRituximab\\nCyclophosphamide\\nDoxorubicin\\nVincristine"]
        D1_5["Days 1-5:\\nPrednisone"]
        D8["Day 8:\\nLabs"]
        D15["Day 15:\\nLabs"]
    end
    D1 --> D1_5 --> D8 --> D15
    D15 --> NEXT["Next Cycle"]
    style D1 fill:#DC143C,color:#fff`,
};

/**
 * Anemia Workup Algorithm template
 */
export const anemiaWorkupAlgorithm: DiagramTemplate = {
  id: 'hemeonc-anemia-workup',
  name: 'Anemia Workup Algorithm',
  description: 'Systematic approach to diagnosing anemia based on MCV',
  domain: 'medicine',
  promptTemplate: `Create an anemia workup algorithm:
- Initial assessment: {{initialAssessment}}
- MCV classification: {{mcvClassification}}
- Microcytic workup: {{microcyticWorkup}}
- Normocytic workup: {{normocyticWorkup}}
- Macrocytic workup: {{macrocyticWorkup}}
- Key lab tests: {{keyLabTests}}
{{#additionalNotes}}Additional considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'initialAssessment',
    'mcvClassification',
    'microcyticWorkup',
    'normocyticWorkup',
    'macrocyticWorkup',
    'keyLabTests',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Anemia\\nHgb <12/13"] --> B{"MCV?"}
    B -->|"<80"| C["Microcytic"]
    B -->|"80-100"| D["Normocytic"]
    B -->|">100"| E["Macrocytic"]
    C --> C1["Iron studies\\nThalassemia screen"]
    D --> D1["Retic count\\nHemolysis labs"]
    E --> E1["B12, Folate\\nSmear"]
    C1 -->|"Low iron"| IDA["Iron Deficiency"]
    D1 -->|"High retic"| HEM["Hemolysis"]
    E1 -->|"Low B12"| B12D["B12 Deficiency"]
    style IDA fill:#FFA500,color:#000
    style HEM fill:#DC143C,color:#fff`,
};

/**
 * Thrombocytopenia Workup template
 */
export const thrombocytopeniaWorkup: DiagramTemplate = {
  id: 'hemeonc-thrombocytopenia-workup',
  name: 'Thrombocytopenia Workup',
  description: 'Algorithm for evaluating low platelet count',
  domain: 'medicine',
  promptTemplate: `Create a thrombocytopenia workup algorithm:
- Severity assessment: {{severityAssessment}}
- Pseudothrombocytopenia rule-out: {{pseudoRuleOut}}
- Production vs destruction: {{productionVsDestruction}}
- Drug-induced causes: {{drugInduced}}
- Immune causes: {{immuneCauses}}
- Microangiopathic workup: {{mahaWorkup}}
{{#additionalNotes}}Emergency management: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'severityAssessment',
    'pseudoRuleOut',
    'productionVsDestruction',
    'drugInduced',
    'immuneCauses',
    'mahaWorkup',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Thrombocytopenia\\nPLT <150k"] --> B["Review smear\\nRule out clumping"]
    B --> C{"True low?"}
    C -->|"No"| D["Pseudothrombocytopenia"]
    C -->|"Yes"| E{"Drug-induced?"}
    E -->|"Yes"| F["Stop offending drug"]
    E -->|"No"| G{"MAHA features?"}
    G -->|"Yes"| H["TTP/HUS workup"]
    G -->|"No"| I["Consider ITP"]
    H --> H1["ADAMTS13\\nDAT, LDH"]
    style H fill:#DC143C,color:#fff
    style I fill:#4169E1,color:#fff`,
};

/**
 * Neutropenic Fever Protocol template
 */
export const neutropenicFeverProtocol: DiagramTemplate = {
  id: 'hemeonc-febrile-neutropenia',
  name: 'Febrile Neutropenia Protocol',
  description: 'Emergency management of fever in neutropenic patients',
  domain: 'medicine',
  promptTemplate: `Create a febrile neutropenia protocol:
- Definition criteria: {{definitionCriteria}}
- Risk stratification: {{riskStratification}}
- Initial workup: {{initialWorkup}}
- Empiric antibiotics: {{empiricAntibiotics}}
- Antifungal criteria: {{antifungalCriteria}}
- G-CSF consideration: {{gcsfConsideration}}
{{#additionalNotes}}Special situations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'definitionCriteria',
    'riskStratification',
    'initialWorkup',
    'empiricAntibiotics',
    'antifungalCriteria',
    'gcsfConsideration',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["🚨 Febrile Neutropenia\\nANC <500 + Temp ≥38.3°C"] --> B["Immediate Assessment"]
    B --> C["Cultures x2\\nUA, CXR\\nLabs"]
    C --> D["Empiric Antibiotics\\n<1 hour"]
    D --> E{"MASCC Score?"}
    E -->|"≥21"| F["Low Risk\\nConsider outpatient"]
    E -->|"<21"| G["High Risk\\nAdmit"]
    G --> H{"Persistent fever\\n4-7 days?"}
    H -->|"Yes"| I["Add antifungal"]
    style A fill:#DC143C,color:#fff
    style D fill:#FFA500,color:#000`,
};

/**
 * DVT/PE Anticoagulation template
 */
export const vteAnticoagulation: DiagramTemplate = {
  id: 'hemeonc-vte-anticoagulation',
  name: 'VTE Anticoagulation Selection',
  description: 'Algorithm for selecting anticoagulation in cancer-associated VTE',
  domain: 'medicine',
  promptTemplate: `Create a VTE anticoagulation algorithm:
- VTE type and location: {{vteType}}
- Cancer type and status: {{cancerStatus}}
- Bleeding risk assessment: {{bleedingRisk}}
- Renal function: {{renalFunction}}
- Drug interactions: {{drugInteractions}}
- Duration of therapy: {{therapyDuration}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'vteType',
    'cancerStatus',
    'bleedingRisk',
    'renalFunction',
    'drugInteractions',
    'therapyDuration',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Cancer-Associated VTE"] --> B{"Active Cancer?"}
    B -->|"Yes"| C{"High Bleeding Risk?"}
    C -->|"Yes"| D["LMWH preferred"]
    C -->|"No"| E{"GI/GU Cancer?"}
    E -->|"Yes"| D
    E -->|"No"| F["DOAC acceptable"]
    B -->|"Remission"| G["Standard DOAC"]
    F --> H["Duration: 6mo minimum\\nor while on treatment"]
    style D fill:#4169E1,color:#fff
    style F fill:#28A745,color:#fff`,
};

/**
 * Stem Cell Transplant Pathway template
 */
export const stemCellTransplantPathway: DiagramTemplate = {
  id: 'hemeonc-sct-pathway',
  name: 'Stem Cell Transplant Pathway',
  description: 'Timeline and phases of hematopoietic stem cell transplantation',
  domain: 'medicine',
  promptTemplate: `Create a stem cell transplant pathway:
- Transplant type: {{transplantType}}
- Pre-transplant workup: {{pretransplantWorkup}}
- Conditioning regimen: {{conditioningRegimen}}
- Day 0 infusion: {{day0Infusion}}
- Engraftment monitoring: {{engraftmentMonitoring}}
- Post-transplant complications: {{complications}}
{{#additionalNotes}}Long-term follow-up: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'transplantType',
    'pretransplantWorkup',
    'conditioningRegimen',
    'day0Infusion',
    'engraftmentMonitoring',
    'complications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Pre["Pre-Transplant"]
        A["Donor Selection"] --> B["Conditioning\\nDays -7 to -1"]
    end
    subgraph Trans["Transplant"]
        B --> C["Day 0\\nStem Cell Infusion"]
    end
    subgraph Post["Post-Transplant"]
        C --> D["Aplasia\\nDays +1-14"]
        D --> E["Engraftment\\nDays +14-30"]
        E --> F["Recovery\\nDays +30-100"]
    end
    F --> G["Long-term F/U"]
    style C fill:#FFD700,color:#000
    style E fill:#28A745,color:#fff`,
};

/**
 * Transfusion Therapy template
 */
export const transfusionTherapy: DiagramTemplate = {
  id: 'hemeonc-transfusion',
  name: 'Transfusion Therapy Guidelines',
  description: 'Indications and thresholds for blood product transfusion',
  domain: 'medicine',
  promptTemplate: `Create a transfusion therapy guideline:
- PRBC thresholds: {{prbcThresholds}}
- Platelet thresholds: {{plateletThresholds}}
- FFP indications: {{ffpIndications}}
- Cryoprecipitate use: {{cryoUse}}
- Special modifications: {{specialModifications}}
- Transfusion reactions: {{reactions}}
{{#additionalNotes}}Emergency protocols: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'prbcThresholds',
    'plateletThresholds',
    'ffpIndications',
    'cryoUse',
    'specialModifications',
    'reactions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Transfusion Needed?"] --> B{"Product Type?"}
    B -->|"RBC"| C{"Hgb Level?"}
    C -->|"<7"| D["Transfuse"]
    C -->|"7-8"| E["Symptomatic?"]
    E -->|"Yes"| D
    B -->|"Platelets"| F{"PLT Level?"}
    F -->|"<10k"| G["Prophylactic"]
    F -->|"<50k + Procedure"| G
    B -->|"Plasma"| H{"INR >1.5 +\\nBleeding?"}
    H -->|"Yes"| I["FFP"]
    style D fill:#DC143C,color:#fff
    style G fill:#FFA500,color:#000`,
};

// =============================================================================
// DIAGNOSTIC ALGORITHMS
// =============================================================================

/**
 * Flow Cytometry Interpretation template
 */
export const flowCytometryInterpretation: DiagramTemplate = {
  id: 'hemeonc-flow-cytometry',
  name: 'Flow Cytometry Panel Interpretation',
  description: 'Guide to immunophenotyping for hematologic malignancies',
  domain: 'medicine',
  promptTemplate: `Create a flow cytometry interpretation guide:
- Lineage markers: {{lineageMarkers}}
- Myeloid panel: {{myeloidPanel}}
- Lymphoid panel: {{lymphoidPanel}}
- Blast markers: {{blastMarkers}}
- Aberrant patterns: {{aberrantPatterns}}
- Diagnostic conclusions: {{diagnosticConclusions}}
{{#additionalNotes}}MRD assessment: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'lineageMarkers',
    'myeloidPanel',
    'lymphoidPanel',
    'blastMarkers',
    'aberrantPatterns',
    'diagnosticConclusions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Flow Cytometry\\nAnalysis"] --> B{"CD45 Gating"}
    B --> C{"Blasts Present?"}
    C -->|"Yes"| D{"Lineage?"}
    D -->|"CD13+CD33+MPO+"| E["Myeloid - AML"]
    D -->|"CD19+CD10+TdT+"| F["B-ALL"]
    D -->|"CD3+CD7+TdT+"| G["T-ALL"]
    C -->|"No"| H["Mature Population"]
    H --> I{"B vs T"}
    style E fill:#FFA500,color:#000
    style F fill:#4169E1,color:#fff`,
};

/**
 * Bone Marrow Biopsy Interpretation template
 */
export const boneMarrowInterpretation: DiagramTemplate = {
  id: 'hemeonc-bm-interpretation',
  name: 'Bone Marrow Biopsy Interpretation',
  description: 'Systematic approach to bone marrow evaluation',
  domain: 'medicine',
  promptTemplate: `Create a bone marrow interpretation guide:
- Cellularity assessment: {{cellularity}}
- Trilineage evaluation: {{trilineage}}
- Blast percentage: {{blastPercentage}}
- Fibrosis grading: {{fibrosisGrading}}
- Special stains: {{specialStains}}
- Cytogenetics/FISH: {{cytogenetics}}
{{#additionalNotes}}Molecular findings: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'cellularity',
    'trilineage',
    'blastPercentage',
    'fibrosisGrading',
    'specialStains',
    'cytogenetics',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["BM Biopsy\\nReview"] --> B["Cellularity\\n(age-adjusted)"]
    A --> C["Trilineage\\nHematopoiesis"]
    A --> D["Blast Count"]
    A --> E["Special Stains"]
    B --> B1["Hyper/Normo/Hypocellular"]
    D --> D1{"≥20%?"}
    D1 -->|"Yes"| D2["Acute Leukemia"]
    D1 -->|"No"| D3["MDS/MPN if 5-19%"]
    E --> E1["Reticulin\\nIron\\nCD34 IHC"]
    style D2 fill:#DC143C,color:#fff`,
};

/**
 * MGUS/Myeloma Workup template
 */
export const mgusWorkup: DiagramTemplate = {
  id: 'hemeonc-mgus-workup',
  name: 'MGUS to Myeloma Evaluation',
  description: 'Risk stratification and monitoring for plasma cell disorders',
  domain: 'medicine',
  promptTemplate: `Create a MGUS/Myeloma workup algorithm:
- MGUS criteria: {{mgusCriteria}}
- Smoldering myeloma: {{smolderingCriteria}}
- Active myeloma CRAB: {{crabCriteria}}
- SLiM criteria: {{slimCriteria}}
- Risk stratification: {{riskStratification}}
- Monitoring schedule: {{monitoring}}
{{#additionalNotes}}Treatment triggers: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'mgusCriteria',
    'smolderingCriteria',
    'crabCriteria',
    'slimCriteria',
    'riskStratification',
    'monitoring',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["M-protein Detected"] --> B{"M-spike <3g/dL?"}
    B -->|"Yes"| C{"BM Plasma Cells?"}
    C -->|"<10%"| D["MGUS"]
    C -->|"10-60%"| E["Smoldering MM"]
    B -->|"No"| F{"CRAB or SLiM?"}
    F -->|"Yes"| G["Active Myeloma\\n→ Treat"]
    F -->|"No"| E
    D --> H["Monitor q3-6mo"]
    E --> I["Monitor q3mo"]
    style G fill:#DC143C,color:#fff
    style D fill:#28A745,color:#fff`,
};

/**
 * Lymphocytosis Evaluation template
 */
export const lymphocytosisEvaluation: DiagramTemplate = {
  id: 'hemeonc-lymphocytosis',
  name: 'Lymphocytosis Evaluation',
  description: 'Workup algorithm for elevated lymphocyte count',
  domain: 'medicine',
  promptTemplate: `Create a lymphocytosis evaluation algorithm:
- Degree of elevation: {{degreeElevation}}
- Reactive vs clonal: {{reactiveVsClonal}}
- Flow cytometry indications: {{flowIndications}}
- CLL criteria: {{cllCriteria}}
- Other lymphoproliferative disorders: {{otherLPD}}
- Monitoring approach: {{monitoring}}
{{#additionalNotes}}Prognostic factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'degreeElevation',
    'reactiveVsClonal',
    'flowIndications',
    'cllCriteria',
    'otherLPD',
    'monitoring',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Lymphocytosis\\n>4000/μL"] --> B{"Duration?"}
    B -->|"Acute"| C["Viral infection\\nStress response"]
    B -->|"Persistent"| D["Flow Cytometry"]
    D --> E{"Clonal?"}
    E -->|"Yes"| F{"Phenotype?"}
    F -->|"CD5+CD19+CD23+"| G["CLL\\n(if ALC >5000)"]
    F -->|"Other"| H["Other LPD"]
    E -->|"No"| I["Reactive\\nMonitor"]
    style G fill:#4169E1,color:#fff`,
};

// =============================================================================
// ADDITIONAL TEMPLATES
// =============================================================================

/**
 * Tumor Lysis Syndrome Prevention template
 */
export const tumorLysisPrevention: DiagramTemplate = {
  id: 'hemeonc-tls-prevention',
  name: 'Tumor Lysis Syndrome Prevention',
  description: 'Risk stratification and prophylaxis for TLS',
  domain: 'medicine',
  promptTemplate: `Create a TLS prevention protocol:
- Risk stratification: {{riskStratification}}
- High-risk criteria: {{highRiskCriteria}}
- Hydration protocol: {{hydrationProtocol}}
- Allopurinol dosing: {{allopurinolDosing}}
- Rasburicase indications: {{rasburicaseIndications}}
- Monitoring parameters: {{monitoringParameters}}
{{#additionalNotes}}Emergency management: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'riskStratification',
    'highRiskCriteria',
    'hydrationProtocol',
    'allopurinolDosing',
    'rasburicaseIndications',
    'monitoringParameters',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Starting Chemo\\nfor Heme Malignancy"] --> B{"TLS Risk?"}
    B -->|"Low"| C["Hydration\\nAllopurinol"]
    B -->|"Intermediate"| D["IV Hydration\\nAllopurinol\\nClose monitoring"]
    B -->|"High"| E["🚨 Rasburicase\\nAggressive hydration\\nICU monitoring"]
    C --> F["Monitor BMP q12h"]
    D --> F
    E --> G["Monitor BMP q6h"]
    style E fill:#DC143C,color:#fff`,
};

/**
 * Sickle Cell Crisis Management template
 */
export const sickleCellCrisis: DiagramTemplate = {
  id: 'hemeonc-sickle-crisis',
  name: 'Sickle Cell Vaso-Occlusive Crisis',
  description: 'Management protocol for acute sickle cell pain crisis',
  domain: 'medicine',
  promptTemplate: `Create a sickle cell crisis management flowchart:
- Pain assessment: {{painAssessment}}
- IV fluid protocol: {{ivFluidProtocol}}
- Analgesic ladder: {{analgesicLadder}}
- Oxygen criteria: {{oxygenCriteria}}
- Transfusion indications: {{transfusionIndications}}
- ACS monitoring: {{acsMonitoring}}
{{#additionalNotes}}Discharge criteria: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'painAssessment',
    'ivFluidProtocol',
    'analgesicLadder',
    'oxygenCriteria',
    'transfusionIndications',
    'acsMonitoring',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["VOC Crisis\\nPresentation"] --> B["Pain Score\\nVital Signs"]
    B --> C["IV Access\\nFluids at 1.5x maintenance"]
    C --> D["Analgesia within 30min"]
    D --> E{"Mild/Moderate?"}
    E -->|"Yes"| F["PO opioids\\nNSAIDs"]
    E -->|"No"| G["IV opioids\\nPCA"]
    B --> H{"Hypoxic?"}
    H -->|"Yes"| I["O2 + CXR\\nRule out ACS"]
    style A fill:#DC143C,color:#fff
    style I fill:#FFA500,color:#000`,
};

/**
 * Anticoagulation Reversal template
 */
export const anticoagulationReversal: DiagramTemplate = {
  id: 'hemeonc-anticoag-reversal',
  name: 'Anticoagulation Reversal',
  description: 'Emergency reversal of anticoagulants for major bleeding',
  domain: 'medicine',
  promptTemplate: `Create an anticoagulation reversal protocol:
- Warfarin reversal: {{warfarinReversal}}
- Heparin reversal: {{heparinReversal}}
- DOAC reversal: {{doacReversal}}
- PCC dosing: {{pccDosing}}
- Specific antidotes: {{specificAntidotes}}
- Monitoring after reversal: {{monitoring}}
{{#additionalNotes}}Procedure-specific guidance: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'warfarinReversal',
    'heparinReversal',
    'doacReversal',
    'pccDosing',
    'specificAntidotes',
    'monitoring',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Major Bleeding\\non Anticoagulation"] --> B{"Which Agent?"}
    B -->|"Warfarin"| C["4-Factor PCC\\n+ Vitamin K 10mg IV"]
    B -->|"UFH"| D["Protamine\\n1mg per 100u heparin"]
    B -->|"LMWH"| E["Protamine\\n(partial reversal)"]
    B -->|"Dabigatran"| F["Idarucizumab"]
    B -->|"Xa inhibitor"| G["Andexanet alfa\\nor 4F-PCC"]
    C --> H["Recheck INR 15min"]
    style A fill:#DC143C,color:#fff
    style F fill:#28A745,color:#fff`,
};

/**
 * Hemophilia Bleed Management template
 */
export const hemophiliaBleed: DiagramTemplate = {
  id: 'hemeonc-hemophilia-bleed',
  name: 'Hemophilia Bleed Management',
  description: 'Factor replacement protocol for hemophilia bleeding episodes',
  domain: 'medicine',
  promptTemplate: `Create a hemophilia bleed management protocol:
- Bleed type and location: {{bleedType}}
- Severity classification: {{severityClassification}}
- Factor type: {{factorType}}
- Dosing calculation: {{dosingCalculation}}
- Target levels: {{targetLevels}}
- Monitoring: {{monitoring}}
{{#additionalNotes}}Inhibitor management: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'bleedType',
    'severityClassification',
    'factorType',
    'dosingCalculation',
    'targetLevels',
    'monitoring',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Hemophilia A/B\\nBleeding Episode"] --> B{"Severity?"}
    B -->|"Minor"| C["Target 30-50%"]
    B -->|"Major"| D["Target 80-100%"]
    B -->|"Life-threatening"| E["🚨 Target 100%\\nICU"]
    C --> F["Single dose\\nmay suffice"]
    D --> G["Multiple doses\\n24-48h"]
    E --> H["Continuous or\\nq8-12h dosing"]
    A --> I{"Inhibitor?"}
    I -->|"Yes"| J["Bypassing agent\\nFEIBA or rVIIa"]
    style E fill:#DC143C,color:#fff`,
};

/**
 * CAR-T Cell Therapy Pathway template
 */
export const carTCellTherapy: DiagramTemplate = {
  id: 'hemeonc-car-t-therapy',
  name: 'CAR-T Cell Therapy Pathway',
  description: 'Complete CAR-T cell therapy timeline from collection to monitoring',
  domain: 'medicine',
  promptTemplate: `Create a CAR-T cell therapy pathway:
- Indication and eligibility: {{indication}}
- Leukapheresis process: {{leukapheresis}}
- Manufacturing timeline: {{manufacturing}}
- Lymphodepleting chemotherapy: {{lymphodepletion}}
- CAR-T infusion: {{infusion}}
- CRS/ICANS monitoring: {{toxicityMonitoring}}
- Response assessment: {{responseAssessment}}
{{#additionalNotes}}Long-term follow-up: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'indication',
    'leukapheresis',
    'manufacturing',
    'lymphodepletion',
    'infusion',
    'toxicityMonitoring',
    'responseAssessment',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Prep["Preparation"]
        A["Patient Selection\\n& Eligibility"] --> B["Leukapheresis\\nT-cell collection"]
    end
    subgraph Mfg["Manufacturing"]
        B --> C["CAR-T Manufacturing\\n(3-4 weeks)"]
    end
    subgraph Tx["Treatment"]
        C --> D["Bridging Therapy\\n(if needed)"]
        D --> E["Lymphodepletion\\nFlu/Cy D-5 to D-3"]
        E --> F["CAR-T Infusion\\nDay 0"]
    end
    subgraph Monitor["Monitoring"]
        F --> G["CRS Watch\\nDays 1-14"]
        G --> H["ICANS Watch\\nDays 5-21"]
        H --> I["Response\\nDay +28"]
    end
    style F fill:#9B59B6,color:#fff
    style G fill:#E74C3C,color:#fff
    style I fill:#28A745,color:#fff`,
};

/**
 * DIC Management Algorithm template
 */
export const dicManagement: DiagramTemplate = {
  id: 'hemeonc-dic-management',
  name: 'DIC Management Algorithm',
  description: 'Diagnosis and treatment of disseminated intravascular coagulation',
  domain: 'medicine',
  promptTemplate: `Create a DIC management algorithm:
- Diagnostic criteria (ISTH): {{diagnosticCriteria}}
- Underlying cause identification: {{underlyingCause}}
- Laboratory monitoring: {{labMonitoring}}
- Blood product replacement: {{bloodProducts}}
- Anticoagulation role: {{anticoagulation}}
- Treatment of underlying cause: {{treatCause}}
{{#additionalNotes}}Special situations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'diagnosticCriteria',
    'underlyingCause',
    'labMonitoring',
    'bloodProducts',
    'anticoagulation',
    'treatCause',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Suspected DIC"] --> B["ISTH DIC Score"]
    B --> C{"Score ≥5?"}
    C -->|"Yes"| D["Overt DIC"]
    C -->|"No"| E["Non-overt\\nRepeat in 24h"]
    D --> F["Identify & Treat\\nUnderlying Cause"]
    F --> G["Sepsis\\nMalignancy\\nTrauma\\nObstetric"]
    D --> H{"Active Bleeding?"}
    H -->|"Yes"| I["Transfuse:\\nPLT if <50k\\nFFP if INR >1.5\\nCryo if Fib <100"]
    H -->|"No, Thrombosis"| J["Consider\\nHeparin"]
    D --> K["Monitor q6-12h:\\nPLT, PT, Fib, D-dimer"]
    style D fill:#DC143C,color:#fff
    style I fill:#FFA500,color:#000`,
};

/**
 * MDS Classification and Risk Stratification template
 */
export const mdsClassification: DiagramTemplate = {
  id: 'hemeonc-mds-classification',
  name: 'MDS Classification and Risk Stratification',
  description: 'WHO classification and IPSS-R risk stratification for MDS',
  domain: 'medicine',
  promptTemplate: `Create an MDS classification and risk stratification diagram:
- WHO classification: {{whoClassification}}
- Cytogenetic findings: {{cytogenetics}}
- Blast percentage: {{blastPercentage}}
- IPSS-R scoring: {{ipssR}}
- Cytopenias: {{cytopenias}}
- Treatment implications: {{treatmentImplications}}
{{#additionalNotes}}Molecular markers: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'whoClassification',
    'cytogenetics',
    'blastPercentage',
    'ipssR',
    'cytopenias',
    'treatmentImplications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["MDS Diagnosis"] --> B["WHO Classification"]
    B --> C["MDS-SLD\\n(single lineage)"]
    B --> D["MDS-MLD\\n(multilineage)"]
    B --> E["MDS-RS\\n(ring sideroblasts)"]
    B --> F["MDS-EB\\n(excess blasts)"]
    A --> G["IPSS-R Score"]
    G --> H{"Risk Category?"}
    H -->|"Very Low/Low"| I["Watch & Wait\\nor ESA/Luspatercept"]
    H -->|"Intermediate"| J["HMA (Aza/Dac)\\nor Clinical Trial"]
    H -->|"High/Very High"| K["Allo-SCT evaluation\\n+ HMA"]
    F --> L{"Blasts?"}
    L -->|"5-9%"| F1["EB-1"]
    L -->|"10-19%"| F2["EB-2"]
    style K fill:#DC143C,color:#fff
    style I fill:#28A745,color:#fff`,
};

/**
 * Myeloproliferative Neoplasm Management template
 */
export const mpnManagement: DiagramTemplate = {
  id: 'hemeonc-mpn-management',
  name: 'Myeloproliferative Neoplasm Management',
  description: 'Diagnosis and treatment algorithm for PV, ET, and myelofibrosis',
  domain: 'medicine',
  promptTemplate: `Create an MPN management algorithm:
- MPN subtype diagnosis: {{mpnSubtype}}
- JAK2/CALR/MPL mutations: {{mutations}}
- Risk stratification: {{riskStratification}}
- Thrombosis prevention: {{thrombosisPrevention}}
- Cytoreductive therapy: {{cytoreduction}}
- Disease transformation monitoring: {{transformationMonitoring}}
{{#additionalNotes}}Symptom management: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'mpnSubtype',
    'mutations',
    'riskStratification',
    'thrombosisPrevention',
    'cytoreduction',
    'transformationMonitoring',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Suspected MPN"] --> B["CBC + Smear\\nJAK2 V617F"]
    B --> C{"Mutation?"}
    C -->|"JAK2+"| D["Check EPO level"]
    D -->|"Low EPO"| E["Polycythemia Vera"]
    D -->|"Normal EPO"| F["ET or MF"]
    C -->|"JAK2-"| G["Check CALR/MPL"]
    G --> F
    E --> H{"High Risk?\\n(Age >60 or prior Thrombosis)"}
    H -->|"Yes"| I["Phlebotomy +\\nHydroxyurea +\\nAspirin"]
    H -->|"No"| J["Phlebotomy +\\nAspirin"]
    F --> K{"Myelofibrosis?"}
    K -->|"Yes"| L["DIPSS Score\\nRuxolitinib/Fedratinib"]
    K -->|"No - ET"| M["IPSET Score\\n± Hydroxyurea"]
    style E fill:#DC143C,color:#fff
    style L fill:#9B59B6,color:#fff`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All hematology/oncology templates
 */
export const hematologyOncologyTemplates: DiagramTemplate[] = [
  // Hematopoiesis & Blood Cell Development
  hematopoiesisDiagram,
  coagulationCascade,
  bloodSmearInterpretation,
  // Cancer Staging & Classification
  lymphomaStagingAnnArbor,
  leukemiaClassification,
  myelomaStagingISS,
  // Treatment Protocols
  chemotherapyRegimen,
  anemiaWorkupAlgorithm,
  thrombocytopeniaWorkup,
  neutropenicFeverProtocol,
  vteAnticoagulation,
  stemCellTransplantPathway,
  transfusionTherapy,
  // Diagnostic Algorithms
  flowCytometryInterpretation,
  boneMarrowInterpretation,
  mgusWorkup,
  lymphocytosisEvaluation,
  // Additional Templates
  tumorLysisPrevention,
  sickleCellCrisis,
  anticoagulationReversal,
  hemophiliaBleed,
  // Advanced Therapies & Complex Disorders
  carTCellTherapy,
  dicManagement,
  mdsClassification,
  mpnManagement,
];

export default hematologyOncologyTemplates;
