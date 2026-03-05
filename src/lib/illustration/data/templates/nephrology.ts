/**
 * nephrology.ts
 * Nephrology diagram templates for FINNISH
 *
 * Contains comprehensive templates for renal medicine including:
 * - Clinical decision trees (AKI workup, CKD management, electrolytes)
 * - Anatomical diagrams (nephron, glomerulus, electrolyte handling)
 * - Procedure illustrations (biopsy, dialysis access, transplant)
 * - Data visualization templates (CKD staging, urinalysis, protocols)
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// CLINICAL DECISION TREES
// =============================================================================

/**
 * AKI Workup Algorithm template
 */
export const akiWorkupAlgorithm: DiagramTemplate = {
  id: 'nephro-aki-workup',
  name: 'AKI Workup Algorithm',
  description: 'Systematic approach to acute kidney injury evaluation and classification',
  domain: 'medicine',
  promptTemplate: `Create an AKI workup algorithm flowchart:
- Presentation: {{presentation}}
- Baseline creatinine: {{baselineCreatinine}}
- KDIGO stage: {{kdigoStage}}
- Prerenal indicators: {{prerenalIndicators}}
- Intrinsic indicators: {{intrinsicIndicators}}
- Postrenal indicators: {{postrenalIndicators}}
- Urinalysis findings: {{urinalysisFindings}}
- Management priorities: {{managementPriorities}}
{{#additionalNotes}}Additional clinical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentation',
    'baselineCreatinine',
    'kdigoStage',
    'prerenalIndicators',
    'intrinsicIndicators',
    'postrenalIndicators',
    'urinalysisFindings',
    'managementPriorities',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Initial["Initial Assessment"]
        A[("AKI Detected\\nCr rise or UOP")] --> B{"KDIGO Stage?"}
    end
    B -->|"Stage 1"| C["1.5-1.9x baseline"]
    B -->|"Stage 2"| D["2.0-2.9x baseline"]
    B -->|"Stage 3"| E["3x or Cr>4 or RRT"]
    C & D & E --> F{"Etiology?"}
    subgraph Prerenal["Prerenal"]
        F -->|"FeNa<1%\\nBUN/Cr>20"| G["Volume resuscitate"]
    end
    subgraph Intrinsic["Intrinsic"]
        F -->|"FeNa>2%\\nMuddy casts"| H["ATN/AIN workup"]
    end
    subgraph Postrenal["Postrenal"]
        F -->|"Hydronephrosis"| I["Relieve obstruction"]
    end
    style E fill:#DC143C,color:#fff
    style G fill:#228B22,color:#fff`,
};

/**
 * CKD Management Algorithm template
 */
export const ckdManagementAlgorithm: DiagramTemplate = {
  id: 'nephro-ckd-management',
  name: 'CKD Management Algorithm',
  description: 'Comprehensive CKD staging and management pathway following KDIGO guidelines',
  domain: 'medicine',
  promptTemplate: `Create a CKD management algorithm:
- eGFR value: {{egfrValue}}
- CKD stage: {{ckdStage}}
- Albuminuria category: {{albuminuriaCategory}}
- Underlying etiology: {{etiology}}
- Complications present: {{complications}}
- RAAS blockade status: {{raasBlockade}}
- BP target: {{bpTarget}}
- Referral criteria: {{referralCriteria}}
{{#additionalNotes}}Additional considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'egfrValue',
    'ckdStage',
    'albuminuriaCategory',
    'etiology',
    'complications',
    'raasBlockade',
    'bpTarget',
    'referralCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("CKD Confirmed\\neGFR <60 x 3mo")] --> B{"Stage?"}
    B -->|"G3a 45-59"| C["Monitor q6-12mo"]
    B -->|"G3b 30-44"| D["Nephrology referral"]
    B -->|"G4 15-29"| E["Prep for RRT"]
    B -->|"G5 <15"| F["RRT initiation"]
    C & D --> G["Management"]
    G --> G1["BP <130/80"]
    G --> G2["ACEi/ARB if albuminuria"]
    G --> G3["SGLT2i if DKD"]
    G --> G4["Treat anemia, MBD"]
    E --> H["AV fistula creation"]
    F --> I{"Modality?"}
    I --> J["HD"] & K["PD"] & L["Transplant"]
    style F fill:#DC143C,color:#fff
    style L fill:#228B22,color:#fff`,
};

/**
 * Hyponatremia Workup Algorithm template
 */
export const hyponatremiaAlgorithm: DiagramTemplate = {
  id: 'nephro-hyponatremia-workup',
  name: 'Hyponatremia Workup Algorithm',
  description: 'Systematic approach to hyponatremia diagnosis and management',
  domain: 'medicine',
  promptTemplate: `Create a hyponatremia workup flowchart:
- Serum sodium: {{serumSodium}}
- Serum osmolality: {{serumOsm}}
- Urine osmolality: {{urineOsm}}
- Urine sodium: {{urineSodium}}
- Volume status: {{volumeStatus}}
- Symptoms: {{symptoms}}
- Correction rate: {{correctionRate}}
- Treatment approach: {{treatmentApproach}}
{{#additionalNotes}}Additional factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'serumSodium',
    'serumOsm',
    'urineOsm',
    'urineSodium',
    'volumeStatus',
    'symptoms',
    'correctionRate',
    'treatmentApproach',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Hyponatremia\\nNa <135")] --> B{"Serum Osm?"}
    B -->|"<280"| C["Hypotonic"]
    B -->|"280-295"| D["Isotonic\\n(pseudohypoNa)"]
    B -->|">295"| E["Hypertonic\\n(hyperglycemia)"]
    C --> F{"Volume Status?"}
    F -->|"Hypovolemic"| G{"UNa?"}
    G -->|"<20"| H["GI/skin losses"]
    G -->|">20"| I["Diuretics/salt-wasting"]
    F -->|"Euvolemic"| J["SIADH, hypothyroid"]
    F -->|"Hypervolemic"| K["CHF, cirrhosis, nephrotic"]
    style A fill:#FFA500,color:#000
    style J fill:#4169E1,color:#fff`,
};

/**
 * Hyperkalemia Management Algorithm template
 */
export const hyperkalemiaAlgorithm: DiagramTemplate = {
  id: 'nephro-hyperkalemia-management',
  name: 'Hyperkalemia Management Algorithm',
  description: 'Emergency and chronic management of hyperkalemia',
  domain: 'medicine',
  promptTemplate: `Create a hyperkalemia management flowchart:
- Potassium level: {{potassiumLevel}}
- ECG changes: {{ecgChanges}}
- Underlying cause: {{underlyingCause}}
- Renal function: {{renalFunction}}
- Medications contributing: {{medications}}
- Emergent interventions: {{emergentInterventions}}
- Chronic management: {{chronicManagement}}
- Dialysis indication: {{dialysisIndication}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'potassiumLevel',
    'ecgChanges',
    'underlyingCause',
    'renalFunction',
    'medications',
    'emergentInterventions',
    'chronicManagement',
    'dialysisIndication',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Hyperkalemia\\nK >5.5")] --> B{"ECG Changes?"}
    B -->|"Peaked T, wide QRS"| C["EMERGENCY"]
    C --> C1["Calcium gluconate 1g IV"]
    C --> C2["Insulin 10U + D50"]
    C --> C3["Albuterol nebs"]
    C --> C4["Consider HD"]
    B -->|"Normal ECG"| D{"K level?"}
    D -->|"5.5-6.0"| E["Kayexalate/Lokelma"]
    D -->|"6.0-6.5"| F["IV insulin + binders"]
    D -->|">6.5"| C
    E & F --> G["Address cause"]
    G --> G1["Stop K-sparing meds"]
    G --> G2["Low K diet"]
    G --> G3["Loop diuretic if able"]
    style C fill:#DC143C,color:#fff
    style C1 fill:#FFA500,color:#000`,
};

/**
 * Proteinuria Evaluation Algorithm template
 */
export const proteinuriaEvaluation: DiagramTemplate = {
  id: 'nephro-proteinuria-evaluation',
  name: 'Proteinuria Evaluation Algorithm',
  description: 'Workup and management of proteinuria based on severity and etiology',
  domain: 'medicine',
  promptTemplate: `Create a proteinuria evaluation flowchart:
- Dipstick result: {{dipstickResult}}
- UPCR or 24h protein: {{proteinQuantity}}
- Albumin vs total protein: {{albuminRatio}}
- Underlying conditions: {{underlyingConditions}}
- Glomerular vs tubular: {{proteinType}}
- Indications for biopsy: {{biopsyIndications}}
- Treatment approach: {{treatmentApproach}}
{{#additionalNotes}}Additional workup: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'dipstickResult',
    'proteinQuantity',
    'albuminRatio',
    'underlyingConditions',
    'proteinType',
    'biopsyIndications',
    'treatmentApproach',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Proteinuria\\nDetected")] --> B{"Quantify"}
    B --> C["UPCR or 24h"]
    C --> D{"Amount?"}
    D -->|"<150mg"| E["Normal"]
    D -->|"150-500mg"| F["Moderate"]
    D -->|"500-3500mg"| G["Significant"]
    D -->|">3500mg"| H["Nephrotic range"]
    F --> I["Monitor + ACEi/ARB"]
    G --> J["Nephrology referral"]
    H --> K["Urgent workup"]
    K --> K1["Lipid panel"]
    K --> K2["Albumin"]
    K --> K3["Consider biopsy"]
    J & K --> L{"Biopsy?"}
    L -->|"Yes"| M["Histology-directed Rx"]
    style H fill:#DC143C,color:#fff
    style M fill:#4169E1,color:#fff`,
};

/**
 * Hematuria Workup Algorithm template
 */
export const hematuriaWorkup: DiagramTemplate = {
  id: 'nephro-hematuria-workup',
  name: 'Hematuria Workup Algorithm',
  description: 'Systematic evaluation of microscopic and gross hematuria',
  domain: 'medicine',
  promptTemplate: `Create a hematuria workup flowchart:
- Type of hematuria: {{hematuriaType}}
- RBC morphology: {{rbcMorphology}}
- Presence of casts: {{rbcCasts}}
- Proteinuria present: {{proteinuria}}
- Age and risk factors: {{riskFactors}}
- Imaging findings: {{imagingFindings}}
- Urology vs nephrology referral: {{referralPath}}
{{#additionalNotes}}Additional considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'hematuriaType',
    'rbcMorphology',
    'rbcCasts',
    'proteinuria',
    'riskFactors',
    'imagingFindings',
    'referralPath',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Hematuria\\n>3 RBC/hpf")] --> B{"Gross or\\nMicroscopic?"}
    B -->|"Gross"| C["Urgent evaluation"]
    B -->|"Microscopic"| D{"RBC morphology?"}
    D -->|"Dysmorphic\\n+ RBC casts"| E["Glomerular\\nNephrology"]
    D -->|"Isomorphic\\nNo casts"| F["Non-glomerular\\nUrology workup"]
    F --> G{"Age >35 or\\nRisk factors?"}
    G -->|"Yes"| H["CT urogram + cysto"]
    G -->|"No"| I["Renal US + repeat UA"]
    C --> H
    E --> J["Serologies + biopsy"]
    J --> J1["ANA, C3/C4, ANCA"]
    J --> J2["Anti-GBM, Hep B/C"]
    style C fill:#DC143C,color:#fff
    style E fill:#4169E1,color:#fff`,
};

/**
 * Dialysis Initiation Algorithm template
 */
export const dialysisInitiation: DiagramTemplate = {
  id: 'nephro-dialysis-initiation',
  name: 'Dialysis Initiation Decision Algorithm',
  description: 'Criteria and timing for initiating renal replacement therapy',
  domain: 'medicine',
  promptTemplate: `Create a dialysis initiation decision flowchart:
- eGFR level: {{egfrLevel}}
- Uremic symptoms: {{uremicSymptoms}}
- Fluid overload status: {{fluidStatus}}
- Electrolyte abnormalities: {{electrolyteIssues}}
- Nutritional status: {{nutritionalStatus}}
- Access readiness: {{accessReadiness}}
- Modality selection factors: {{modalityFactors}}
- Urgent indications: {{urgentIndications}}
{{#additionalNotes}}Patient preferences: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'egfrLevel',
    'uremicSymptoms',
    'fluidStatus',
    'electrolyteIssues',
    'nutritionalStatus',
    'accessReadiness',
    'modalityFactors',
    'urgentIndications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("CKD G5\\neGFR <15")] --> B{"Urgent\\nIndication?"}
    B -->|"Refractory K/acidosis\\nPulmonary edema\\nUremic encephalopathy"| C["Emergent HD"]
    B -->|"No"| D{"Symptoms?"}
    D -->|"Uremic sx\\nAnorexia\\nNausea"| E["Plan elective start"]
    D -->|"Asymptomatic"| F["Continue monitoring"]
    E --> G{"Access ready?"}
    G -->|"AVF mature"| H["Start HD"]
    G -->|"PD catheter"| I["Start PD"]
    G -->|"No access"| J["Temp catheter or\\nurgent access"]
    F --> K{"eGFR <10 or\\ndeclining fast?"}
    K -->|"Yes"| E
    style C fill:#DC143C,color:#fff
    style H fill:#228B22,color:#fff
    style I fill:#228B22,color:#fff`,
};

// =============================================================================
// ANATOMICAL DIAGRAMS
// =============================================================================

/**
 * Nephron Structure template
 */
export const nephronStructure: DiagramTemplate = {
  id: 'nephro-nephron-structure',
  name: 'Nephron Structure Diagram',
  description: 'Detailed nephron anatomy with functional segments labeled',
  domain: 'medicine',
  promptTemplate: `Create a nephron structure diagram showing:
- Glomerulus components: {{glomerulusComponents}}
- Proximal tubule features: {{proximalTubule}}
- Loop of Henle segments: {{loopOfHenle}}
- Distal tubule characteristics: {{distalTubule}}
- Collecting duct details: {{collectingDuct}}
- Blood supply: {{bloodSupply}}
- Transport mechanisms: {{transportMechanisms}}
{{#additionalNotes}}Additional annotations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'glomerulusComponents',
    'proximalTubule',
    'loopOfHenle',
    'distalTubule',
    'collectingDuct',
    'bloodSupply',
    'transportMechanisms',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Cortex["Cortex"]
        A["Glomerulus"] --> B["PCT\\n65% reabsorption"]
        G["DCT"] --> H["Connecting tubule"]
    end
    subgraph Medulla["Medulla"]
        B --> C["Thin descending\\nH2O permeable"]
        C --> D["Thin ascending"]
        D --> E["Thick ascending\\nNa/K/Cl"]
        E --> F["Macula densa"]
        F --> G
    end
    subgraph CD["Collecting System"]
        H --> I["Cortical CD"]
        I --> J["Medullary CD\\nADH-responsive"]
    end
    style A fill:#DC143C,color:#fff
    style E fill:#4169E1,color:#fff`,
};

/**
 * Glomerulus Detailed template
 */
export const glomerulusDetail: DiagramTemplate = {
  id: 'nephro-glomerulus-detail',
  name: 'Glomerulus Detailed Anatomy',
  description: 'Detailed glomerular structure with filtration barrier components',
  domain: 'medicine',
  promptTemplate: `Create a detailed glomerulus diagram:
- Capillary structure: {{capillaryStructure}}
- Podocyte anatomy: {{podocyteAnatomy}}
- Basement membrane layers: {{gbmLayers}}
- Mesangial cells: {{mesangialCells}}
- Bowman's capsule: {{bowmansCapsule}}
- Filtration barrier: {{filtrationBarrier}}
- Afferent/efferent arterioles: {{arterioles}}
{{#additionalNotes}}Pathological changes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'capillaryStructure',
    'podocyteAnatomy',
    'gbmLayers',
    'mesangialCells',
    'bowmansCapsule',
    'filtrationBarrier',
    'arterioles',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Filtration["Filtration Barrier"]
        A["Fenestrated\\nEndothelium\\n70-100nm pores"]
        B["GBM\\nCollagen IV\\nLaminin"]
        C["Podocyte\\nFoot Processes\\nSlit diaphragm"]
    end
    subgraph Support["Support Cells"]
        D["Mesangial cells\\nPhagocytosis\\nMatrix support"]
    end
    subgraph Capsule["Bowman's Capsule"]
        E["Parietal epithelium"]
        F["Urinary space"]
    end
    G["Afferent\\narteriole"] --> A
    A --> B --> C --> F
    C --> H["Efferent\\narteriole"]
    style C fill:#22C55E,color:#fff`,
};

/**
 * Electrolyte Handling template
 */
export const electrolyteHandling: DiagramTemplate = {
  id: 'nephro-electrolyte-handling',
  name: 'Renal Electrolyte Handling',
  description: 'Nephron segment-specific electrolyte transport mechanisms',
  domain: 'medicine',
  promptTemplate: `Create a renal electrolyte handling diagram:
- Sodium handling by segment: {{sodiumHandling}}
- Potassium handling: {{potassiumHandling}}
- Calcium transport: {{calciumTransport}}
- Phosphate regulation: {{phosphateRegulation}}
- Magnesium handling: {{magnesiumHandling}}
- Key transporters: {{keyTransporters}}
- Hormonal regulation: {{hormonalRegulation}}
{{#additionalNotes}}Drug targets: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'sodiumHandling',
    'potassiumHandling',
    'calciumTransport',
    'phosphateRegulation',
    'magnesiumHandling',
    'keyTransporters',
    'hormonalRegulation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph PCT["PCT (65%)"]
        A["Na/H exchanger\\nNa/glucose\\nNa/amino acid"]
    end
    subgraph TAL["TAL (25%)"]
        B["NKCC2\\nNa/K/2Cl\\n(Loop target)"]
    end
    subgraph DCT["DCT (5%)"]
        C["NCC\\nNa/Cl\\n(Thiazide target)"]
    end
    subgraph CD["CD (3%)"]
        D["ENaC\\n(Aldo-sensitive)\\nK secretion"]
    end
    A --> B --> C --> D
    style B fill:#4169E1,color:#fff
    style C fill:#22C55E,color:#fff
    style D fill:#FFA500,color:#000`,
};

/**
 * Acid-Base Regulation template
 */
export const acidBaseRegulation: DiagramTemplate = {
  id: 'nephro-acid-base-regulation',
  name: 'Renal Acid-Base Regulation',
  description: 'Nephron mechanisms of acid-base homeostasis',
  domain: 'medicine',
  promptTemplate: `Create a renal acid-base regulation diagram:
- Bicarbonate reabsorption: {{bicarbReabsorption}}
- Acid excretion: {{acidExcretion}}
- Ammonium handling: {{ammoniumHandling}}
- Titratable acid: {{titratableAcid}}
- PCT mechanisms: {{pctMechanisms}}
- Collecting duct role: {{collectingDuct}}
- Compensation mechanisms: {{compensation}}
{{#additionalNotes}}Pathological states: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'bicarbReabsorption',
    'acidExcretion',
    'ammoniumHandling',
    'titratableAcid',
    'pctMechanisms',
    'collectingDuct',
    'compensation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph PCT["PCT - HCO3 Reclamation"]
        A["H+ secretion\\n(Na/H exchanger)"]
        B["HCO3 reabsorption\\n(~85%)"]
        C["Carbonic anhydrase"]
    end
    subgraph CD["Collecting Duct"]
        D["Type A intercalated\\nH+ secretion"]
        E["Type B intercalated\\nHCO3 secretion"]
    end
    subgraph Buffer["Urinary Buffers"]
        F["NH3 + H+ -> NH4+"]
        G["HPO4 + H+ -> H2PO4"]
    end
    A --> C --> B
    D --> F & G
    style D fill:#DC143C,color:#fff
    style F fill:#FFA500,color:#000`,
};

// =============================================================================
// PROCEDURE ILLUSTRATIONS
// =============================================================================

/**
 * Renal Biopsy Procedure template
 */
export const renalBiopsyProcedure: DiagramTemplate = {
  id: 'nephro-renal-biopsy-procedure',
  name: 'Renal Biopsy Procedure Steps',
  description: 'Step-by-step percutaneous renal biopsy procedure',
  domain: 'medicine',
  promptTemplate: `Create a renal biopsy procedure flowchart:
- Pre-procedure preparation: {{prePrep}}
- Positioning: {{positioning}}
- Ultrasound guidance: {{usGuidance}}
- Needle technique: {{needleTechnique}}
- Number of passes: {{numberOfPasses}}
- Post-procedure monitoring: {{postMonitoring}}
- Complications to watch: {{complications}}
{{#additionalNotes}}Contraindications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'prePrep',
    'positioning',
    'usGuidance',
    'needleTechnique',
    'numberOfPasses',
    'postMonitoring',
    'complications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Pre-procedure"] --> A1["Check coags\\nPT/INR, platelets"]
    A --> A2["Hold anticoagulants"]
    A --> A3["Type and screen"]
    A1 & A2 & A3 --> B["Position prone"]
    B --> C["US localization\\nLower pole, cortex"]
    C --> D["Local anesthesia"]
    D --> E["Biopsy gun\\n2-3 passes"]
    E --> F["Check specimen\\n10+ glomeruli"]
    F --> G["Post-procedure"]
    G --> G1["Bed rest 6h"]
    G --> G2["Serial H/H"]
    G --> G3["Watch for hematuria"]
    style E fill:#DC143C,color:#fff
    style G1 fill:#4169E1,color:#fff`,
};

/**
 * Dialysis Access Creation template
 */
export const dialysisAccessCreation: DiagramTemplate = {
  id: 'nephro-dialysis-access-creation',
  name: 'Dialysis Access Creation',
  description: 'Vascular access options and creation procedures for hemodialysis',
  domain: 'medicine',
  promptTemplate: `Create a dialysis access creation flowchart:
- Access type selection: {{accessTypeSelection}}
- Preferred vessel mapping: {{vesselMapping}}
- AVF creation steps: {{avfSteps}}
- AVG placement: {{avgPlacement}}
- Catheter insertion: {{catheterInsertion}}
- Maturation timeline: {{maturationTimeline}}
- Complications: {{complications}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'accessTypeSelection',
    'vesselMapping',
    'avfSteps',
    'avgPlacement',
    'catheterInsertion',
    'maturationTimeline',
    'complications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Dialysis Access\\nNeeded")] --> B{"Timeline?"}
    B -->|"3-6 months"| C["AVF preferred"]
    B -->|"2-4 weeks"| D["AVG"]
    B -->|"Immediate"| E["Tunneled catheter"]
    C --> C1["Vessel mapping"]
    C1 --> C2["Radiocephalic\\n(wrist)"]
    C1 --> C3["Brachiocephalic\\n(elbow)"]
    C1 --> C4["Brachiobasilic\\n(transposition)"]
    C2 & C3 & C4 --> F["Maturation\\n8-12 weeks"]
    D --> D1["PTFE graft\\n2-4 weeks use"]
    E --> E1["IJ preferred\\nImmediate use"]
    style C fill:#228B22,color:#fff
    style E fill:#FFA500,color:#000`,
};

/**
 * Kidney Transplant Evaluation template
 */
export const kidneyTransplantEval: DiagramTemplate = {
  id: 'nephro-transplant-evaluation',
  name: 'Kidney Transplant Evaluation',
  description: 'Pre-transplant evaluation and workup pathway',
  domain: 'medicine',
  promptTemplate: `Create a kidney transplant evaluation flowchart:
- Initial referral criteria: {{referralCriteria}}
- Medical evaluation: {{medicalEval}}
- Cardiac workup: {{cardiacWorkup}}
- Infectious disease screening: {{idScreening}}
- Immunological testing: {{immunoTesting}}
- Psychosocial evaluation: {{psychosocialEval}}
- Surgical evaluation: {{surgicalEval}}
- Listing criteria: {{listingCriteria}}
{{#additionalNotes}}Living donor pathway: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'referralCriteria',
    'medicalEval',
    'cardiacWorkup',
    'idScreening',
    'immunoTesting',
    'psychosocialEval',
    'surgicalEval',
    'listingCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Transplant\\nReferral")] --> B["Initial evaluation"]
    B --> C["Medical workup"]
    C --> C1["Cardiac: Echo, stress"]
    C --> C2["Cancer screening"]
    C --> C3["Infection: Hep, HIV, CMV"]
    B --> D["Immunology"]
    D --> D1["Blood type"]
    D --> D2["HLA typing"]
    D --> D3["PRA/crossmatch"]
    B --> E["Psychosocial"]
    E --> E1["Social work"]
    E --> E2["Psychiatry PRN"]
    C & D & E --> F{"Suitable?"}
    F -->|"Yes"| G["List for transplant"]
    F -->|"Issues"| H["Address/defer"]
    G --> I["Living vs deceased\\ndonor"]
    style G fill:#228B22,color:#fff`,
};

// =============================================================================
// DATA VISUALIZATION TEMPLATES
// =============================================================================

/**
 * CKD Staging Reference template
 */
export const ckdStagingReference: DiagramTemplate = {
  id: 'nephro-ckd-staging',
  name: 'CKD Staging Reference',
  description: 'KDIGO CKD staging by GFR and albuminuria categories',
  domain: 'medicine',
  promptTemplate: `Create a CKD staging reference diagram:
- GFR categories (G1-G5): {{gfrCategories}}
- Albuminuria categories (A1-A3): {{albuminuriaCategories}}
- Risk stratification: {{riskStratification}}
- Monitoring frequency: {{monitoringFrequency}}
- Management by stage: {{managementByStage}}
- Referral thresholds: {{referralThresholds}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'gfrCategories',
    'albuminuriaCategories',
    'riskStratification',
    'monitoringFrequency',
    'managementByStage',
    'referralThresholds',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph GFR["GFR Categories"]
        G1["G1: >=90\\nNormal/high"]
        G2["G2: 60-89\\nMild decrease"]
        G3a["G3a: 45-59\\nMild-moderate"]
        G3b["G3b: 30-44\\nModerate-severe"]
        G4["G4: 15-29\\nSevere"]
        G5["G5: <15\\nKidney failure"]
    end
    subgraph Album["Albuminuria"]
        A1["A1: <30 mg/g\\nNormal"]
        A2["A2: 30-300\\nModerately increased"]
        A3["A3: >300\\nSeverely increased"]
    end
    subgraph Risk["Risk"]
        R1["Low"]
        R2["Moderate"]
        R3["High"]
        R4["Very high"]
    end
    style G5 fill:#DC143C,color:#fff
    style A3 fill:#FFA500,color:#000`,
};

/**
 * Urinalysis Interpretation template
 */
export const urinalysisInterpretation: DiagramTemplate = {
  id: 'nephro-urinalysis-interpretation',
  name: 'Urinalysis Interpretation Guide',
  description: 'Systematic interpretation of urinalysis findings',
  domain: 'medicine',
  promptTemplate: `Create a urinalysis interpretation guide:
- Dipstick components: {{dipstickComponents}}
- Microscopy findings: {{microscopyFindings}}
- Specific gravity interpretation: {{specificGravity}}
- pH significance: {{phSignificance}}
- Cast types and meanings: {{castTypes}}
- Crystal identification: {{crystalTypes}}
- Clinical correlations: {{clinicalCorrelations}}
{{#additionalNotes}}Limitations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'dipstickComponents',
    'microscopyFindings',
    'specificGravity',
    'phSignificance',
    'castTypes',
    'crystalTypes',
    'clinicalCorrelations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Dipstick["Dipstick"]
        D1["Protein: Glomerular dz"]
        D2["Blood: Hematuria"]
        D3["LE/Nitrite: UTI"]
        D4["Glucose: DM, Fanconi"]
    end
    subgraph Micro["Microscopy"]
        M1["RBC: >3/hpf abnormal"]
        M2["WBC: >5/hpf = pyuria"]
        M3["Bacteria: Infection"]
        M4["Epithelial: Contamination"]
    end
    subgraph Casts["Casts"]
        C1["Hyaline: Concentrated urine"]
        C2["RBC: Glomerulonephritis"]
        C3["WBC: Pyelonephritis/AIN"]
        C4["Muddy brown: ATN"]
        C5["Waxy: CKD"]
    end
    style C2 fill:#DC143C,color:#fff
    style C4 fill:#8B4513,color:#fff`,
};

/**
 * Electrolyte Replacement Protocol template
 */
export const electrolyteReplacement: DiagramTemplate = {
  id: 'nephro-electrolyte-replacement',
  name: 'Electrolyte Replacement Protocols',
  description: 'IV and oral electrolyte replacement dosing guidelines',
  domain: 'medicine',
  promptTemplate: `Create electrolyte replacement protocol diagram:
- Potassium replacement: {{potassiumReplacement}}
- Magnesium replacement: {{magnesiumReplacement}}
- Phosphorus replacement: {{phosphorusReplacement}}
- Calcium replacement: {{calciumReplacement}}
- Sodium correction: {{sodiumCorrection}}
- Monitoring parameters: {{monitoringParameters}}
- Renal dose adjustments: {{renalAdjustments}}
{{#additionalNotes}}Special situations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'potassiumReplacement',
    'magnesiumReplacement',
    'phosphorusReplacement',
    'calciumReplacement',
    'sodiumCorrection',
    'monitoringParameters',
    'renalAdjustments',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph K["Potassium"]
        K1["K 3.0-3.5: 40 mEq PO"]
        K2["K 2.5-3.0: 60-80 mEq"]
        K3["K <2.5: IV 10-20 mEq/hr"]
        K4["Max peripheral: 10 mEq/hr"]
    end
    subgraph Mg["Magnesium"]
        M1["Mg 1.0-1.5: 2-4g IV"]
        M2["Mg <1.0: 4-8g IV"]
        M3["Replete before K"]
    end
    subgraph Phos["Phosphorus"]
        P1["Phos 1.0-2.0: Neutra-Phos"]
        P2["Phos <1.0: IV K-Phos"]
        P3["15-30 mmol over 6h"]
    end
    subgraph Ca["Calcium"]
        C1["Symptomatic: Ca gluconate 1-2g"]
        C2["Asymptomatic: oral Ca + Vit D"]
    end
    style K3 fill:#DC143C,color:#fff
    style C1 fill:#FFA500,color:#000`,
};

// =============================================================================
// ADDITIONAL CLINICAL DECISION TREES - ITERATION 2
// =============================================================================

/**
 * Metabolic Acidosis Workup template
 */
export const metabolicAcidosisWorkup: DiagramTemplate = {
  id: 'nephro-metabolic-acidosis-workup',
  name: 'Metabolic Acidosis Workup Algorithm',
  description: 'Systematic approach to metabolic acidosis with anion gap calculation',
  domain: 'medicine',
  promptTemplate: `Create a metabolic acidosis workup flowchart:
- Arterial blood gas: {{abgValues}}
- Anion gap calculated: {{anionGap}}
- Delta-delta ratio: {{deltaDelta}}
- Urine anion gap: {{urineAnionGap}}
- HAGMA causes: {{hagmaCauses}}
- NAGMA causes: {{nagmaCauses}}
- Compensation assessment: {{compensation}}
- Treatment approach: {{treatment}}
{{#additionalNotes}}Clinical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'abgValues',
    'anionGap',
    'deltaDelta',
    'urineAnionGap',
    'hagmaCauses',
    'nagmaCauses',
    'compensation',
    'treatment',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Metabolic Acidosis\\npH <7.35, HCO3 <22")] --> B["Calculate Anion Gap\\nAG = Na - (Cl + HCO3)"]
    B --> C{"AG > 12?"}
    C -->|"Yes"| D["HAGMA\\nMUDPILES"]
    C -->|"No"| E["NAGMA\\nCheck Urine AG"]
    D --> D1["Methanol, Uremia, DKA"]
    D --> D2["Propylene glycol, INH"]
    D --> D3["Lactic acidosis, Ethylene glycol"]
    D --> D4["Salicylates"]
    E --> F{"Urine AG?"}
    F -->|"Negative\\n(UAG <0)"| G["GI HCO3 loss\\nDiarrhea"]
    F -->|"Positive\\n(UAG >0)"| H["RTA\\nType 1, 2, or 4"]
    subgraph Compensation["Check Compensation"]
        I["Expected pCO2 =\\n1.5(HCO3) + 8 ± 2"]
    end
    style D fill:#DC143C,color:#fff
    style H fill:#4169E1,color:#fff`,
};

/**
 * Renal Tubular Acidosis template
 */
export const renalTubularAcidosis: DiagramTemplate = {
  id: 'nephro-rta-workup',
  name: 'Renal Tubular Acidosis Classification',
  description: 'Differentiation and management of RTA types 1, 2, and 4',
  domain: 'medicine',
  promptTemplate: `Create an RTA classification flowchart:
- Urine pH: {{urinePH}}
- Serum potassium: {{serumPotassium}}
- Serum bicarbonate: {{serumBicarb}}
- Urine anion gap: {{urineAnionGap}}
- Associated conditions: {{associatedConditions}}
- Type 1 features: {{type1Features}}
- Type 2 features: {{type2Features}}
- Type 4 features: {{type4Features}}
{{#additionalNotes}}Treatment considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'urinePH',
    'serumPotassium',
    'serumBicarb',
    'urineAnionGap',
    'associatedConditions',
    'type1Features',
    'type2Features',
    'type4Features',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("NAGMA with\\nPositive UAG")] --> B{"Serum K+?"}
    B -->|"Low/Normal"| C{"Urine pH?"}
    B -->|"High"| D["Type 4 RTA"]
    C -->|">5.5"| E["Type 1 - Distal"]
    C -->|"<5.5"| F["Type 2 - Proximal"]
    subgraph Type1["Type 1 - Distal RTA"]
        E1["Cannot secrete H+"]
        E2["Severe acidosis (HCO3 <10)"]
        E3["Nephrocalcinosis, stones"]
        E4["Sjögren's, SLE, drugs"]
    end
    subgraph Type2["Type 2 - Proximal RTA"]
        F1["Cannot reabsorb HCO3"]
        F2["Moderate acidosis (HCO3 12-20)"]
        F3["Fanconi syndrome"]
        F4["Multiple myeloma, drugs"]
    end
    subgraph Type4["Type 4 RTA"]
        D1["Low aldosterone/resistance"]
        D2["Hyperkalemia"]
        D3["Diabetes, ACEi/ARB"]
    end
    E --> Type1
    F --> Type2
    D --> Type4
    style E fill:#4169E1,color:#fff
    style F fill:#228B22,color:#fff
    style D fill:#FFA500,color:#000`,
};

/**
 * Diabetic Kidney Disease Management template
 */
export const diabeticKidneyDisease: DiagramTemplate = {
  id: 'nephro-dkd-management',
  name: 'Diabetic Kidney Disease Management',
  description: 'Comprehensive DKD screening, staging, and treatment pathway',
  domain: 'medicine',
  promptTemplate: `Create a diabetic kidney disease management flowchart:
- Diabetes type and duration: {{diabetesType}}
- Current eGFR: {{currentEGFR}}
- Albuminuria level: {{albuminuriaLevel}}
- HbA1c target: {{hba1cTarget}}
- Blood pressure target: {{bpTarget}}
- RAAS blockade: {{raasBlockade}}
- SGLT2i indication: {{sglt2iIndication}}
- Additional therapies: {{additionalTherapies}}
{{#additionalNotes}}Monitoring schedule: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'diabetesType',
    'currentEGFR',
    'albuminuriaLevel',
    'hba1cTarget',
    'bpTarget',
    'raasBlockade',
    'sglt2iIndication',
    'additionalTherapies',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Diabetes Mellitus")] --> B["Screen annually\\nUACR + eGFR"]
    B --> C{"Albuminuria?"}
    C -->|"A1: <30 mg/g"| D["Continue annual screening"]
    C -->|"A2: 30-300 mg/g"| E["Start RAAS blockade"]
    C -->|"A3: >300 mg/g"| F["Nephrology referral"]
    E & F --> G["Optimize Therapy"]
    G --> G1["ACEi or ARB\\nTitrate to max"]
    G --> G2["SGLT2i\\n(empagliflozin, dapa)"]
    G --> G3["BP <130/80"]
    G --> G4["HbA1c individualized"]
    G --> G5["Finerenone if persistent albuminuria"]
    G --> G6["GLP-1 RA consideration"]
    subgraph Monitoring["Monitoring"]
        M1["eGFR + UACR q3-6mo"]
        M2["K+ 1-2wk after RAAS change"]
        M3["Allow 30% Cr rise with SGLT2i"]
    end
    style G2 fill:#228B22,color:#fff
    style G5 fill:#9370DB,color:#fff`,
};

/**
 * Contrast-Induced AKI Prevention template
 */
export const contrastAKIPrevention: DiagramTemplate = {
  id: 'nephro-ci-aki-prevention',
  name: 'Contrast-Induced AKI Prevention',
  description: 'Risk stratification and prevention protocol for contrast nephropathy',
  domain: 'medicine',
  promptTemplate: `Create a contrast-induced AKI prevention flowchart:
- Baseline eGFR: {{baselineEGFR}}
- Risk factors: {{riskFactors}}
- Mehran score: {{mehranScore}}
- Hydration protocol: {{hydrationProtocol}}
- Contrast volume limit: {{contrastLimit}}
- Nephrotoxin hold: {{nephrotoxinHold}}
- NAC consideration: {{nacConsideration}}
- Post-procedure monitoring: {{postMonitoring}}
{{#additionalNotes}}Alternative imaging: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'baselineEGFR',
    'riskFactors',
    'mehranScore',
    'hydrationProtocol',
    'contrastLimit',
    'nephrotoxinHold',
    'nacConsideration',
    'postMonitoring',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Contrast Procedure\\nPlanned")] --> B{"eGFR?"}
    B -->|"≥60"| C["Low risk\\nStandard care"]
    B -->|"30-59"| D["Moderate risk"]
    B -->|"<30 or AKI"| E["High risk"]
    D & E --> F["Risk Assessment"]
    F --> F1["DM, CHF, age >75"]
    F --> F2["Hypotension, IABP"]
    F --> F3["Anemia, contrast volume"]
    F --> G["Prevention Protocol"]
    G --> G1["IV NS 1-1.5 mL/kg/hr\\n3-12h pre + 6-24h post"]
    G --> G2["Limit contrast volume\\n<100mL or <3x eGFR"]
    G --> G3["Hold nephrotoxins\\n(NSAIDs, metformin)"]
    G --> G4["Use iso-osmolar contrast"]
    G --> G5["Consider NAC 1200mg BID\\n(benefit unclear)"]
    subgraph PostProc["Post-Procedure"]
        P1["Cr at 48-72 hours"]
        P2["Resume metformin if Cr stable"]
    end
    style E fill:#DC143C,color:#fff
    style G1 fill:#4169E1,color:#fff`,
};

/**
 * Glomerulonephritis Workup template
 */
export const glomerulonephritisWorkup: DiagramTemplate = {
  id: 'nephro-gn-workup',
  name: 'Glomerulonephritis Workup Algorithm',
  description: 'Systematic evaluation of nephritic syndrome and glomerulonephritis',
  domain: 'medicine',
  promptTemplate: `Create a glomerulonephritis workup flowchart:
- Clinical presentation: {{presentation}}
- Urinalysis findings: {{urinalysis}}
- Complement levels: {{complementLevels}}
- Serologic markers: {{serologies}}
- ANCA status: {{ancaStatus}}
- Hepatitis/HIV screening: {{infectionScreen}}
- Biopsy indications: {{biopsyIndications}}
- Histologic patterns: {{histologicPatterns}}
{{#additionalNotes}}Urgent considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentation',
    'urinalysis',
    'complementLevels',
    'serologies',
    'ancaStatus',
    'infectionScreen',
    'biopsyIndications',
    'histologicPatterns',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Nephritic Syndrome\\nHematuria + RBC casts\\n± Proteinuria, HTN, AKI")] --> B["Serologic Workup"]
    B --> B1["C3, C4 complement"]
    B --> B2["ANA, dsDNA, anti-GBM"]
    B --> B3["ANCA (PR3, MPO)"]
    B --> B4["Hep B/C, HIV"]
    B --> B5["SPEP/UPEP, free light chains"]
    B --> C{"Complement?"}
    C -->|"Low C3/C4"| D["Post-infectious GN\\nLupus nephritis\\nMPGN, Cryo"]
    C -->|"Normal"| E["IgA nephropathy\\nANCA vasculitis\\nAnti-GBM disease"]
    D & E --> F{"ANCA?"}
    F -->|"Positive"| G["RPGN - urgent biopsy"]
    F -->|"Negative"| H["Schedule biopsy"]
    G --> I["Pulse steroids + rituximab\\nor cyclophosphamide"]
    subgraph Biopsy["Biopsy Findings"]
        J["Light: crescents, proliferation"]
        K["IF: IgG linear vs granular"]
        L["EM: deposits, podocyte injury"]
    end
    style G fill:#DC143C,color:#fff
    style I fill:#FFA500,color:#000`,
};

/**
 * Polycystic Kidney Disease Management template
 */
export const polycysticKidneyDisease: DiagramTemplate = {
  id: 'nephro-pkd-management',
  name: 'Polycystic Kidney Disease Management',
  description: 'ADPKD diagnosis, monitoring, and treatment with tolvaptan',
  domain: 'medicine',
  promptTemplate: `Create a PKD management flowchart:
- Age of diagnosis: {{ageOfDiagnosis}}
- Family history: {{familyHistory}}
- Diagnostic criteria: {{diagnosticCriteria}}
- Total kidney volume: {{kidneyVolume}}
- Mayo classification: {{mayoClassification}}
- Tolvaptan eligibility: {{tolvaptanEligibility}}
- Blood pressure management: {{bpManagement}}
- Extrarenal manifestations: {{extrarenalManifestations}}
{{#additionalNotes}}Genetic counseling: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ageOfDiagnosis',
    'familyHistory',
    'diagnosticCriteria',
    'kidneyVolume',
    'mayoClassification',
    'tolvaptanEligibility',
    'bpManagement',
    'extrarenalManifestations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Suspected ADPKD")] --> B{"Family Hx\\n+ Imaging?"}
    B -->|"FHx +"| C["US criteria by age"]
    B -->|"FHx -"| D["≥10 cysts bilateral"]
    C --> C1["15-39yo: ≥3 cysts"]
    C --> C2["40-59yo: ≥2 cysts/kidney"]
    C --> C3["≥60yo: ≥4 cysts/kidney"]
    C & D --> E["Confirmed ADPKD"]
    E --> F["Risk Stratification"]
    F --> F1["MRI: Total Kidney Volume"]
    F --> F2["htTKV = TKV/height"]
    F --> F3["Mayo Classification 1A-1E"]
    F --> G{"Tolvaptan Candidate?"}
    G -->|"CKD 1-4, age <55\\nRapid progression"| H["Start Tolvaptan"]
    G -->|"Low risk"| I["Conservative management"]
    H --> H1["Monitor LFTs monthly x18mo"]
    H --> H2["Ensure water intake"]
    subgraph Management["General Management"]
        M1["BP <110/75 if tolerated"]
        M2["Avoid caffeine, high sodium"]
        M3["Screen: brain aneurysm if FHx"]
        M4["Screen: liver cysts, valves"]
    end
    style H fill:#228B22,color:#fff`,
};

/**
 * Peritoneal Dialysis Management template
 */
export const peritonealDialysisManagement: DiagramTemplate = {
  id: 'nephro-pd-management',
  name: 'Peritoneal Dialysis Management',
  description: 'PD prescription, adequacy monitoring, and complication management',
  domain: 'medicine',
  promptTemplate: `Create a peritoneal dialysis management flowchart:
- PD modality: {{pdModality}}
- Prescription details: {{prescriptionDetails}}
- Adequacy targets: {{adequacyTargets}}
- PET category: {{petCategory}}
- Fluid management: {{fluidManagement}}
- Exit site care: {{exitSiteCare}}
- Peritonitis protocol: {{peritonitisProtocol}}
- Membrane assessment: {{membraneAssessment}}
{{#additionalNotes}}Patient training: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'pdModality',
    'prescriptionDetails',
    'adequacyTargets',
    'petCategory',
    'fluidManagement',
    'exitSiteCare',
    'peritonitisProtocol',
    'membraneAssessment',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Peritoneal Dialysis")] --> B{"Modality?"}
    B -->|"CAPD"| C["4 exchanges/day\\n2L each, 4-6h dwell"]
    B -->|"APD/CCPD"| D["Cycler overnight\\n8-10h, ± day dwell"]
    C & D --> E["Adequacy Assessment"]
    E --> E1["Weekly Kt/V ≥1.7"]
    E --> E2["Weekly CrCl ≥50 L/1.73m²"]
    E --> E3["Fluid removal adequate"]
    A --> F["PET Testing"]
    F --> F1["High transporter: short dwells"]
    F --> F2["Low transporter: long dwells"]
    F --> F3["Adjust prescription"]
    A --> G{"Cloudy Effluent?"}
    G -->|"Yes"| H["Peritonitis Protocol"]
    H --> H1["Cell count >100, >50% PMN"]
    H --> H2["Gram stain, culture"]
    H --> H3["IP vanc + aminoglycoside\\nor ceftazidime"]
    H --> I{"Response?"}
    I -->|"No improvement 5d"| J["Catheter removal"]
    I -->|"Resolving"| K["Complete 14-21d"]
    style H fill:#DC143C,color:#fff
    style J fill:#8B0000,color:#fff`,
};

/**
 * Hemodialysis Adequacy Assessment template
 */
export const hemodialysisAdequacy: DiagramTemplate = {
  id: 'nephro-hd-adequacy',
  name: 'Hemodialysis Adequacy Assessment',
  description: 'Kt/V measurement and optimization strategies for hemodialysis',
  domain: 'medicine',
  promptTemplate: `Create a hemodialysis adequacy assessment flowchart:
- Current prescription: {{currentPrescription}}
- Kt/V measurement: {{ktv}}
- URR calculation: {{urr}}
- Access blood flow: {{accessFlow}}
- Treatment time: {{treatmentTime}}
- Intradialytic weight gain: {{idwg}}
- Dry weight assessment: {{dryWeight}}
- Optimization strategies: {{optimizationStrategies}}
{{#additionalNotes}}Frequent/nocturnal options: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'currentPrescription',
    'ktv',
    'urr',
    'accessFlow',
    'treatmentTime',
    'idwg',
    'dryWeight',
    'optimizationStrategies',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("HD Adequacy\\nAssessment")] --> B["Monthly Labs"]
    B --> B1["Pre/Post BUN"]
    B --> B2["Calculate Kt/V"]
    B --> B3["Calculate URR"]
    B --> C{"Kt/V ≥1.4?\\nURR ≥70%?"}
    C -->|"Yes"| D["Adequate - Continue"]
    C -->|"No"| E["Optimize"]
    E --> E1["Increase time\\n4h minimum"]
    E --> E2["Increase blood flow\\n350-450 mL/min"]
    E --> E3["Increase dialyzer size\\nKoA"]
    E --> E4["Check access function"]
    E4 --> F{"Access Flow\\nAdequate?"}
    F -->|"<600 mL/min"| G["Fistulaogram\\nIntervention"]
    F -->|"Adequate"| H["Consider frequent\\nor nocturnal HD"]
    subgraph FluidMgmt["Fluid Management"]
        I["IDWG <4% dry weight"]
        J["UF rate <13 mL/kg/hr"]
        K["Monthly dry weight review"]
    end
    A --> FluidMgmt
    style E fill:#FFA500,color:#000
    style G fill:#DC143C,color:#fff`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All nephrology templates
 */
export const nephrologyTemplates: DiagramTemplate[] = [
  // Clinical Decision Trees (7)
  akiWorkupAlgorithm,
  ckdManagementAlgorithm,
  hyponatremiaAlgorithm,
  hyperkalemiaAlgorithm,
  proteinuriaEvaluation,
  hematuriaWorkup,
  dialysisInitiation,
  // Additional Clinical Decision Trees (8)
  metabolicAcidosisWorkup,
  renalTubularAcidosis,
  diabeticKidneyDisease,
  contrastAKIPrevention,
  glomerulonephritisWorkup,
  polycysticKidneyDisease,
  peritonealDialysisManagement,
  hemodialysisAdequacy,
  // Anatomical Diagrams (4)
  nephronStructure,
  glomerulusDetail,
  electrolyteHandling,
  acidBaseRegulation,
  // Procedure Illustrations (3)
  renalBiopsyProcedure,
  dialysisAccessCreation,
  kidneyTransplantEval,
  // Data Visualization (3)
  ckdStagingReference,
  urinalysisInterpretation,
  electrolyteReplacement,
];

export default nephrologyTemplates;
