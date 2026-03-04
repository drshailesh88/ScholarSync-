/**
 * endocrinology-prompts.ts
 * Endocrinology-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for endocrine medicine including:
 * - Diabetes management algorithms
 * - Thyroid disorder workups
 * - Adrenal function testing
 * - Pituitary tumor evaluation
 * - Bone/calcium metabolism
 * - Hormone feedback loops
 * - Obesity management
 * - Insulin/glucose physiology
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// ENDOCRINOLOGY DOMAIN PROMPT
// =============================================================================

/**
 * Base endocrinology domain prompt for metabolic and hormonal diagrams
 */
export const ENDOCRINOLOGY_DOMAIN_PROMPT = `
Endocrinology diagram requirements:
- Use standard endocrine terminology (HbA1c, TSH, T4, T3, cortisol, ACTH)
- Follow ADA guidelines for diabetes management
- Follow ATA guidelines for thyroid nodule evaluation
- Include hormone feedback loops with stimulatory/inhibitory notation
- Use appropriate axis representation (HPA, HPT, HPG)
- Reference Endocrine Society clinical practice guidelines
- Use color coding: Warm colors for stimulatory, Cool colors for inhibitory
- Include proper lab value references with units
- Distinguish primary vs secondary vs tertiary disorders
- Include Bethesda classification for thyroid cytology`;

// =============================================================================
// ENDOCRINOLOGY-SPECIFIC PROMPTS
// =============================================================================

export const ENDOCRINOLOGY_PROMPTS = {
  // Diabetes Management
  diabetesManagement: `
Diabetes Management Algorithm requirements:
- Follow ADA Standards of Medical Care
- Include HbA1c targets (individualized approach)
- Show stepwise medication escalation
- Include GDMT with SGLT2i, GLP-1 RA considerations
- Reference cardiovascular and renal protection
- Include hypoglycemia risk assessment
- Show insulin initiation and intensification pathways`,

  type2DiabetesInitiation: `
Type 2 Diabetes Treatment Initiation requirements:
- Start with lifestyle modification
- Include metformin as first-line therapy
- Show cardiorenal risk assessment
- Include weight considerations (GLP-1 RA, tirzepatide)
- Reference combination therapy indications
- Include monitoring schedule (HbA1c q3 months)
- Show goal-directed therapy approach`,

  insulinTitration: `
Insulin Titration Protocol requirements:
- Include basal insulin initiation (10 units or 0.1-0.2 U/kg)
- Show FBG-based titration algorithm
- Include prandial insulin addition criteria
- Reference hypoglycemia prevention
- Show insulin-to-carb ratio calculation
- Include correction factor determination
- Reference pump therapy transition criteria`,

  hypoglycemiaManagement: `
Hypoglycemia Evaluation and Management requirements:
- Define Whipple's triad
- Include 72-hour fast protocol
- Show insulin, C-peptide, sulfonylurea screen interpretation
- Distinguish insulinoma from exogenous insulin
- Include critical sample collection
- Reference glucagon emergency protocol
- Show CGM alarm settings for prevention`,

  dkaHhsManagement: `
DKA/HHS Management Protocol requirements:
- Include diagnostic criteria (glucose, pH, ketones, osmolarity)
- Show fluid resuscitation protocol
- Include potassium monitoring and replacement
- Reference insulin infusion protocol
- Show bicarbonate administration criteria
- Include transition to subcutaneous insulin
- Reference precipitating factor evaluation`,

  // Thyroid Disorders
  thyroidNoduleWorkup: `
Thyroid Nodule Workup requirements:
- Follow ATA risk stratification
- Include TSH-first approach
- Show TI-RADS scoring system
- Reference FNA indication criteria by size
- Include Bethesda classification (I-VI)
- Show molecular testing indications
- Reference surgical vs surveillance criteria`,

  hypothyroidismManagement: `
Hypothyroidism Management requirements:
- Include primary vs secondary differentiation
- Show levothyroxine dosing (1.6 mcg/kg)
- Reference monitoring with TSH (q6-8 weeks initially)
- Include drug interactions (calcium, iron, PPI)
- Show pregnancy-specific management
- Reference subclinical hypothyroidism criteria
- Include myxedema coma emergency protocol`,

  hyperthyroidismManagement: `
Hyperthyroidism Management requirements:
- Differentiate Graves' vs toxic nodule vs thyroiditis
- Include TRAb, radioactive iodine uptake
- Show antithyroid drug therapy (methimazole, PTU)
- Reference beta-blocker symptomatic control
- Include RAI vs surgery decision algorithm
- Show Graves' ophthalmopathy management
- Reference thyroid storm emergency protocol`,

  thyroidCancerFollowup: `
Differentiated Thyroid Cancer Follow-up requirements:
- Include risk stratification (ATA low/intermediate/high)
- Show TSH suppression targets by risk
- Reference thyroglobulin monitoring protocol
- Include RAI remnant ablation criteria
- Show surveillance imaging schedule
- Reference recurrence detection algorithm
- Include molecular testing for indeterminate nodules`,

  // Adrenal Disorders
  adrenalIncidentalomaWorkup: `
Adrenal Incidentaloma Workup requirements:
- Include size criteria (1cm, 4cm, 6cm thresholds)
- Show hormonal workup panel (1mg DST, metanephrines, ARR)
- Reference imaging characteristics (HU, washout)
- Include subclinical hypercortisolism screening
- Show adrenal protocol CT interpretation
- Reference surgical indication criteria
- Include surveillance imaging schedule`,

  cushingsSyndromeWorkup: `
Cushing's Syndrome Workup requirements:
- Include screening tests (1mg DST, UFC, late-night salivary)
- Show ACTH-dependent vs independent differentiation
- Reference high-dose DST, CRH stimulation
- Include inferior petrosal sinus sampling indications
- Show pituitary vs ectopic ACTH differentiation
- Reference imaging (MRI, CT chest/abdomen)
- Include surgical and medical management options`,

  adrenalInsufficiencyManagement: `
Adrenal Insufficiency Management requirements:
- Differentiate primary vs secondary vs tertiary
- Include morning cortisol interpretation
- Show ACTH stimulation test protocol
- Reference physiologic glucocorticoid replacement
- Include mineralocorticoid replacement (primary AI)
- Show sick day rules and stress dosing
- Reference adrenal crisis emergency protocol`,

  pheochromocytomaWorkup: `
Pheochromocytoma Workup requirements:
- Include biochemical testing (plasma metanephrines, 24h urine)
- Show functional imaging (MIBG, DOTATATE)
- Reference genetic testing indications (SDH, VHL, RET, NF1)
- Include alpha-blockade protocol preoperatively
- Show surgical approach considerations
- Reference malignant pheochromocytoma criteria
- Include paraganglioma screening`,

  // Pituitary Disorders
  pituitaryMassWorkup: `
Pituitary Mass Workup requirements:
- Include hormone hypersecretion screening panel
- Show visual field testing indications
- Reference prolactinoma vs non-functioning adenoma
- Include cabergoline trial for prolactinoma
- Show surgical indications (vision loss, mass effect)
- Reference hypopituitarism screening
- Include apoplexy emergency recognition`,

  acromegalyManagement: `
Acromegaly Management requirements:
- Include IGF-1 and GH nadir testing
- Show transsphenoidal surgery as first-line
- Reference somatostatin analog therapy
- Include GH receptor antagonist (pegvisomant)
- Show complication screening (sleep apnea, cardiomyopathy)
- Reference radiation therapy indications
- Include mortality and comorbidity management`,

  hypopituitarismReplacement: `
Hypopituitarism Hormone Replacement requirements:
- Include priority order (cortisol first)
- Show glucocorticoid replacement dosing
- Reference thyroid hormone replacement timing
- Include sex steroid replacement options
- Show growth hormone replacement criteria
- Reference DDAVP for central DI
- Include fertility preservation considerations`,

  // Bone/Calcium Metabolism
  osteoporosisManagement: `
Osteoporosis Management requirements:
- Include FRAX risk assessment
- Show T-score classification (-1.0, -2.5)
- Reference bisphosphonate vs denosumab selection
- Include anabolic therapy indications (teriparatide, romosozumab)
- Show drug holiday considerations
- Reference atypical femur fracture monitoring
- Include secondary osteoporosis workup`,

  hypercalcemiaWorkup: `
Hypercalcemia Workup requirements:
- Include PTH-mediated vs non-PTH-mediated
- Show primary hyperparathyroidism workup
- Reference malignancy-associated hypercalcemia (PTHrP)
- Include vitamin D toxicity evaluation
- Show milk-alkali syndrome recognition
- Reference acute hypercalcemia treatment
- Include surgical indications for hyperparathyroidism`,

  hypocalcemiaManagement: `
Hypocalcemia Management requirements:
- Include corrected calcium calculation
- Show PTH-based differential diagnosis
- Reference vitamin D deficiency evaluation
- Include IV calcium protocol for severe cases
- Show oral calcium and vitamin D dosing
- Reference hypoparathyroidism management
- Include Chvostek and Trousseau signs recognition`,

  // Obesity and Metabolic
  obesityManagement: `
Obesity Management Algorithm requirements:
- Include BMI classification and assessment
- Show lifestyle intervention as foundation
- Reference pharmacotherapy options (GLP-1 RA, tirzepatide)
- Include bariatric surgery criteria (BMI >40 or >35 with comorbid)
- Show metabolic surgery outcomes
- Reference weight regain prevention
- Include multidisciplinary team approach`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Endocrinology-specific few-shot examples
 */
export const ENDOCRINOLOGY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a flowchart for Type 2 diabetes initial management',
    output: `flowchart TD
    A[("Type 2 DM\\nDiagnosis")] --> B{"HbA1c Level?"}
    B -->|"<9%"| C["Lifestyle + Metformin"]
    B -->|"9-10%"| D["Metformin + Second Agent"]
    B -->|">10% or Symptoms"| E["Consider Insulin"]
    C --> F{"ASCVD, HF,\\nor CKD?"}
    F -->|"ASCVD"| G["Add GLP-1 RA"]
    F -->|"HF/CKD"| H["Add SGLT2i"]
    F -->|"None"| I{"Weight Priority?"}
    I -->|"Yes"| G
    I -->|"No"| J["DPP-4i or Other"]
    D --> F
    G & H & J --> K{"HbA1c at Goal\\nin 3 months?"}
    K -->|"No"| L["Intensify Therapy"]
    K -->|"Yes"| M["Continue + Monitor"]
    style E fill:#DC143C,color:#fff
    style G fill:#228B22,color:#fff
    style H fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a thyroid nodule evaluation algorithm',
    output: `flowchart TD
    A[("Thyroid Nodule\\nDiscovered")] --> B["Check TSH"]
    B -->|"Low TSH"| C["Thyroid Uptake Scan"]
    C -->|"Hot Nodule"| D["Likely Benign\\nFollow"]
    C -->|"Cold Nodule"| E["Ultrasound + FNA"]
    B -->|"Normal/High TSH"| F["Thyroid Ultrasound"]
    F --> G{"TI-RADS Score?"}
    G -->|"TR1-2"| H["No FNA Needed"]
    G -->|"TR3 + >2.5cm"| I["FNA Biopsy"]
    G -->|"TR4 + >1.5cm"| I
    G -->|"TR5 + >1cm"| I
    I --> J{"Bethesda\\nCategory?"}
    J -->|"I - Nondiagnostic"| K["Repeat FNA"]
    J -->|"II - Benign"| L["Follow with US"]
    J -->|"III - AUS"| M["Repeat FNA or\\nMolecular Testing"]
    J -->|"IV - FN"| N["Diagnostic Lobectomy"]
    J -->|"V-VI - Suspicious/Malignant"| O["Surgery"]
    style D fill:#228B22,color:#fff
    style O fill:#DC143C,color:#fff`,
  },
  {
    prompt: 'Create a Cushing syndrome diagnostic algorithm',
    output: `flowchart TD
    A[("Suspected\\nCushing Syndrome")] --> B["Screen with:\\n1mg DST or UFC or\\nLate-night Salivary"]
    B -->|"Normal"| C["Cushing's Unlikely"]
    B -->|"Abnormal"| D["Confirm with\\n2nd Test"]
    D -->|"Normal"| C
    D -->|"Abnormal"| E["Check ACTH"]
    E -->|"Low/Suppressed"| F["ACTH-Independent"]
    F --> G["Adrenal CT"]
    G -->|"Unilateral Mass"| H["Adrenal Adenoma\\nor Carcinoma"]
    G -->|"Bilateral"| I["Bilateral Hyperplasia\\nor PPNAD"]
    E -->|"Normal/High"| J["ACTH-Dependent"]
    J --> K["Pituitary MRI +\\nHigh-Dose DST"]
    K -->|"Pituitary Lesion\\n+ Suppression"| L["Cushing's Disease"]
    K -->|"No Lesion or\\nNo Suppression"| M["IPSS"]
    M -->|"Central Gradient"| L
    M -->|"No Gradient"| N["Ectopic ACTH\\nCT Chest/Abdomen"]
    style C fill:#228B22,color:#fff
    style H fill:#FFA500,color:#000
    style L fill:#DC143C,color:#fff
    style N fill:#DC143C,color:#fff`,
  },
  {
    prompt: 'Create an adrenal insufficiency evaluation flowchart',
    output: `flowchart TD
    A[("Suspected\\nAdrenal Insufficiency")] --> B["Morning Cortisol\\n(8 AM)"]
    B -->|"<3 mcg/dL"| C["AI Confirmed"]
    B -->|"3-15 mcg/dL"| D["ACTH Stim Test"]
    B -->|">15 mcg/dL"| E["AI Unlikely"]
    D -->|"Peak <18 mcg/dL"| C
    D -->|"Peak >18 mcg/dL"| E
    C --> F{"Check ACTH"}
    F -->|"High ACTH"| G["Primary AI\\n(Addison's)"]
    F -->|"Low/Normal ACTH"| H["Secondary AI\\n(Pituitary)"]
    G --> I["Autoimmune?\\nCheck 21-OH Ab"]
    G --> J["Start Hydrocortisone\\n+ Fludrocortisone"]
    H --> K["Pituitary MRI"]
    H --> L["Start Hydrocortisone\\n(No Fludro needed)"]
    J --> M["Sick Day Rules\\nMedic Alert"]
    L --> M
    style C fill:#DC143C,color:#fff
    style E fill:#228B22,color:#fff
    style J fill:#4169E1,color:#fff
    style L fill:#4169E1,color:#fff`,
  },
  {
    prompt: 'Create a hypoglycemia workup algorithm',
    output: `flowchart TD
    A[("Hypoglycemia\\nSuspected")] --> B{"Whipple's Triad?\\nSymptoms + BG<70 + Relief"}
    B -->|"No"| C["Unlikely True\\nHypoglycemia"]
    B -->|"Yes"| D{"On Diabetes\\nMedications?"}
    D -->|"Yes"| E["Medication-Induced\\nAdjust Regimen"]
    D -->|"No"| F["72-Hour Fast"]
    F --> G{"Symptoms +\\nBG <50?"}
    G -->|"No"| H["No Hypoglycemic\\nDisorder"]
    G -->|"Yes"| I["Measure:\\nInsulin, C-peptide\\nProinsulin, SU Screen"]
    I --> J{"Results?"}
    J -->|"High Insulin\\nHigh C-peptide\\nSU Negative"| K["Insulinoma"]
    J -->|"High Insulin\\nHigh C-peptide\\nSU Positive"| L["Sulfonylurea-\\nInduced"]
    J -->|"High Insulin\\nLow C-peptide"| M["Exogenous\\nInsulin"]
    J -->|"Low Insulin\\nLow C-peptide"| N["Non-Islet Cell\\nTumor (IGF-2)"]
    K --> O["Localization:\\nCT, EUS, Angio"]
    style K fill:#DC143C,color:#fff
    style M fill:#FFA500,color:#000
    style E fill:#4169E1,color:#fff`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

export default {
  ENDOCRINOLOGY_DOMAIN_PROMPT,
  ENDOCRINOLOGY_PROMPTS,
  ENDOCRINOLOGY_FEW_SHOT_EXAMPLES,
};
