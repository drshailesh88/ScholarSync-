/**
 * Endocrine Drugs Template Library
 * Diagram templates for endocrine medication drug classes
 */

import type { DiagramTemplate } from './index';

export const insulinTypesComparison: DiagramTemplate = {
  id: 'endo-insulin-types',
  name: 'Insulin Types Comparison',
  description: 'Comparison of different insulin formulations by onset and duration',
  domain: 'medicine',
  promptTemplate: `Create an insulin comparison chart:
- Rapid-acting insulins: {{rapidActing}}
- Short-acting: {{shortActing}}
- Intermediate-acting: {{intermediate}}
- Long-acting: {{longActing}}
- Action profiles: {{actionProfiles}}
{{#additionalNotes}}Mixing compatibility: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['rapidActing', 'shortActing', 'intermediate', 'longActing', 'actionProfiles', 'additionalNotes'],
  mermaidExample: `flowchart LR
    subgraph Rapid["Rapid-Acting (10-15min)"]
        A["Lispro, Aspart, Glulisine"]
    end
    subgraph Short["Short-Acting (30min)"]
        B["Regular"]
    end
    subgraph Int["Intermediate (1-2h)"]
        C["NPH"]
    end
    subgraph Long["Long-Acting (1-2h)"]
        D["Glargine, Detemir, Degludec"]
    end`
};

export const diabetesOralAgentSelection: DiagramTemplate = {
  id: 'endo-dm-oral-agents',
  name: 'Oral Diabetes Agent Selection',
  description: 'Algorithm for selecting oral diabetes medications',
  domain: 'medicine',
  promptTemplate: `Create a diabetes oral agent selection algorithm:
- First-line therapy: {{firstLine}}
- Add-on options: {{addOnOptions}}
- CV benefit considerations: {{cvBenefit}}
- CKD considerations: {{ckdConsiderations}}
- Weight considerations: {{weightConsiderations}}
{{#additionalNotes}}A1c targets: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['firstLine', 'addOnOptions', 'cvBenefit', 'ckdConsiderations', 'weightConsiderations', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["T2DM Diagnosis"] --> B["Metformin"]
    B --> C{"A1c at Goal?"}
    C -->|"No"| D{"ASCVD or HF?"}
    D -->|"ASCVD"| E["Add GLP-1 RA"]
    D -->|"HF/CKD"| F["Add SGLT2i"]
    D -->|"Neither"| G["Add Based on\\nPatient Factors"]`
};

export const insulinTitrationProtocol: DiagramTemplate = {
  id: 'endo-insulin-titration',
  name: 'Insulin Titration Protocol',
  description: 'Protocol for titrating basal and bolus insulin',
  domain: 'medicine',
  promptTemplate: `Create an insulin titration protocol:
- Starting basal dose: {{startingBasal}}
- Basal titration algorithm: {{basalTitration}}
- Bolus initiation criteria: {{bolusInitiation}}
- Bolus dosing: {{bolusDosing}}
- Hypoglycemia management: {{hypoManagement}}
{{#additionalNotes}}ICU protocols: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['startingBasal', 'basalTitration', 'bolusInitiation', 'bolusDosing', 'hypoManagement', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Start Basal\\n10 units or 0.1-0.2U/kg"] --> B["Check FBG"]
    B --> C{"FBG Target\\n80-130?"}
    C -->|">180"| D["Increase 4 units"]
    C -->|"130-180"| E["Increase 2 units"]
    C -->|"<70"| F["Decrease 4 units"]
    C -->|"At goal"| G["Maintain"]`
};

export const dkaManagement: DiagramTemplate = {
  id: 'endo-dka-management',
  name: 'DKA Management Protocol',
  description: 'Protocol for managing diabetic ketoacidosis',
  domain: 'medicine',
  promptTemplate: `Create a DKA management protocol:
- Diagnosis criteria: {{diagnosisCriteria}}
- Fluid resuscitation: {{fluidResuscitation}}
- Insulin therapy: {{insulinTherapy}}
- Potassium replacement: {{potassiumReplacement}}
- Bicarbonate criteria: {{bicarbonateCriteria}}
- Transition to SC insulin: {{transitionCriteria}}
{{#additionalNotes}}Monitoring frequency: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['diagnosisCriteria', 'fluidResuscitation', 'insulinTherapy', 'potassiumReplacement', 'bicarbonateCriteria', 'transitionCriteria', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["DKA Confirmed"] --> B["NS 1-1.5L/h"]
    B --> C["Insulin Drip\\n0.1 U/kg/h"]
    B --> D{"K+ Level?"}
    D -->|"<3.3"| E["Hold Insulin\\nReplace K+"]
    D -->|"3.3-5.3"| F["Add 20-30 mEq/L"]
    D -->|">5.3"| G["Monitor"]
    C --> H{"BG <200?"}
    H -->|"Yes"| I["Add D5, ↓Insulin"]`
};

export const thyroidReplacementDosing: DiagramTemplate = {
  id: 'endo-thyroid-dosing',
  name: 'Thyroid Hormone Replacement Dosing',
  description: 'Algorithm for thyroid hormone replacement therapy',
  domain: 'medicine',
  promptTemplate: `Create a thyroid replacement dosing algorithm:
- Initial dosing: {{initialDosing}}
- Elderly/cardiac considerations: {{elderlyCardiac}}
- Monitoring TSH: {{tshMonitoring}}
- Dose adjustments: {{doseAdjustments}}
- Drug interactions: {{interactions}}
{{#additionalNotes}}Absorption factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['initialDosing', 'elderlyCardiac', 'tshMonitoring', 'doseAdjustments', 'interactions', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Hypothyroidism"] --> B{"Age/Cardiac\\nStatus?"}
    B -->|"Young, Healthy"| C["1.6 mcg/kg/day"]
    B -->|"Elderly/CAD"| D["Start 25-50 mcg"]
    C & D --> E["Check TSH 6 weeks"]
    E --> F{"At Goal?"}
    F -->|"No"| G["Adjust by 12.5-25 mcg"]
    F -->|"Yes"| H["Annual TSH"]`
};

export const steroidEquivalence: DiagramTemplate = {
  id: 'endo-steroid-equivalence',
  name: 'Corticosteroid Equivalence Chart',
  description: 'Conversion chart for corticosteroid medications',
  domain: 'medicine',
  promptTemplate: `Create a steroid equivalence chart:
- Glucocorticoid potency: {{glucocorticoidPotency}}
- Mineralocorticoid potency: {{mineralocorticoidPotency}}
- Duration of action: {{durationAction}}
- Equivalent doses: {{equivalentDoses}}
- Clinical considerations: {{clinicalConsiderations}}
{{#additionalNotes}}Tapering guidelines: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['glucocorticoidPotency', 'mineralocorticoidPotency', 'durationAction', 'equivalentDoses', 'clinicalConsiderations', 'additionalNotes'],
  mermaidExample: `flowchart LR
    A["Hydrocortisone 20mg"] --> B["Prednisone 5mg"]
    B --> C["Methylprednisolone 4mg"]
    C --> D["Dexamethasone 0.75mg"]
    subgraph Potency["Relative Potency"]
        H["HC: 1x"] --> P["Pred: 4x"] --> M["MP: 5x"] --> Dex["Dex: 25x"]
    end`
};

export const adrenalInsufficiencyManagement: DiagramTemplate = {
  id: 'endo-adrenal-insufficiency',
  name: 'Adrenal Insufficiency Management',
  description: 'Protocol for managing adrenal insufficiency and stress dosing',
  domain: 'medicine',
  promptTemplate: `Create an adrenal insufficiency protocol:
- Daily replacement: {{dailyReplacement}}
- Stress dosing: {{stressDosing}}
- Sick day rules: {{sickDayRules}}
- Adrenal crisis treatment: {{adrenalCrisis}}
- Monitoring: {{monitoring}}
{{#additionalNotes}}Patient education: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['dailyReplacement', 'stressDosing', 'sickDayRules', 'adrenalCrisis', 'monitoring', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Adrenal Insufficiency"] --> B["Daily Replacement"]
    B --> B1["HC 15-25mg\\nor Prednisone 5mg"]
    A --> C["Stress Dosing"]
    C --> C1["Minor: Double dose"]
    C --> C2["Major: HC 100mg IV"]
    C --> D["Adrenal Crisis"]
    D --> D1["HC 100mg IV push\\nNS bolus"]`
};

export const hyperthyroidismTreatment: DiagramTemplate = {
  id: 'endo-hyperthyroidism',
  name: 'Hyperthyroidism Treatment Algorithm',
  description: 'Algorithm for treating hyperthyroidism including Graves disease',
  domain: 'medicine',
  promptTemplate: `Create a hyperthyroidism treatment algorithm:
- Diagnosis workup: {{diagnosisWorkup}}
- Antithyroid drugs: {{antithyroidDrugs}}
- Beta-blocker symptomatic control: {{betaBlocker}}
- Radioactive iodine: {{rai}}
- Surgery indications: {{surgeryIndications}}
{{#additionalNotes}}Thyroid storm management: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['diagnosisWorkup', 'antithyroidDrugs', 'betaBlocker', 'rai', 'surgeryIndications', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Hyperthyroidism\\nConfirmed"] --> B["Beta-Blocker\\nfor Symptoms"]
    B --> C{"Definitive\\nTherapy?"}
    C -->|"Medical"| D["Methimazole\\n(PTU if pregnant)"]
    C -->|"Ablative"| E["RAI or\\nSurgery"]
    D --> F{"Remission?"}
    F -->|"No"| E`
};

export const glp1Protocol: DiagramTemplate = {
  id: 'endo-glp1-protocol',
  name: 'GLP-1 Receptor Agonist Protocol',
  description: 'Protocol for initiating and titrating GLP-1 receptor agonists',
  domain: 'medicine',
  promptTemplate: `Create a GLP-1 RA protocol:
- Indications: {{indications}}
- Starting dose: {{startingDose}}
- Titration schedule: {{titrationSchedule}}
- GI side effect management: {{giManagement}}
- Contraindications: {{contraindications}}
{{#additionalNotes}}Cardiovascular benefits: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['indications', 'startingDose', 'titrationSchedule', 'giManagement', 'contraindications', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["GLP-1 RA Initiation"] --> B["Start Low Dose"]
    B --> C["Semaglutide 0.25mg\\nweekly x 4 weeks"]
    C --> D["Increase to 0.5mg"]
    D --> E["Target 1-2mg"]
    B --> F["GI Tolerance"]
    F -->|"Nausea"| G["Slow Titration\\nSmall Meals"]`
};

export const sglt2Protocol: DiagramTemplate = {
  id: 'endo-sglt2-protocol',
  name: 'SGLT2 Inhibitor Protocol',
  description: 'Protocol for SGLT2 inhibitor therapy including monitoring',
  domain: 'medicine',
  promptTemplate: `Create an SGLT2i protocol:
- Indications: {{indications}}
- Dosing: {{dosing}}
- Renal function monitoring: {{renalMonitoring}}
- DKA prevention: {{dkaPrevention}}
- Sick day rules: {{sickDayRules}}
{{#additionalNotes}}Cardiorenal benefits: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['indications', 'dosing', 'renalMonitoring', 'dkaPrevention', 'sickDayRules', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["SGLT2i Initiation"] --> B{"eGFR Check"}
    B -->|">45"| C["Full Dose"]
    B -->|"25-45"| D["Reduced Dose\\n(Some Agents)"]
    B -->|"<25"| E["Hold or Avoid"]
    C & D --> F["Monitor"]
    F --> G["Euglycemic DKA\\nAwareness"]
    G --> H["Sick Day Rules"]`
};

export const hypoglycemiaManagement: DiagramTemplate = {
  id: 'endo-hypoglycemia',
  name: 'Hypoglycemia Management Protocol',
  description: 'Protocol for treating hypoglycemia in diabetes patients',
  domain: 'medicine',
  promptTemplate: `Create a hypoglycemia management protocol:
- Recognition signs: {{recognitionSigns}}
- Mild hypoglycemia: {{mildManagement}}
- Severe hypoglycemia: {{severeManagement}}
- Glucagon administration: {{glucagon}}
- Prevention strategies: {{prevention}}
{{#additionalNotes}}Patient education: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['recognitionSigns', 'mildManagement', 'severeManagement', 'glucagon', 'prevention', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["BG <70"] --> B{"Conscious?"}
    B -->|"Yes"| C["15g Fast Carbs"]
    C --> D["Recheck 15 min"]
    D --> E{"Still <70?"}
    E -->|"Yes"| C
    B -->|"No"| F["Glucagon IM/SC\\nor D50 IV"]
    F --> G["Monitor closely"]`
};

export const osteoporosisTherapy: DiagramTemplate = {
  id: 'endo-osteoporosis',
  name: 'Osteoporosis Treatment Algorithm',
  description: 'Algorithm for selecting osteoporosis therapy',
  domain: 'medicine',
  promptTemplate: `Create an osteoporosis treatment algorithm:
- Risk assessment: {{riskAssessment}}
- First-line therapy: {{firstLine}}
- Second-line options: {{secondLine}}
- Anabolic therapy criteria: {{anabolicCriteria}}
- Monitoring: {{monitoring}}
{{#additionalNotes}}Drug holidays: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['riskAssessment', 'firstLine', 'secondLine', 'anabolicCriteria', 'monitoring', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Osteoporosis\\nDiagnosed"] --> B["Calcium + Vitamin D"]
    B --> C{"Fracture Risk"}
    C -->|"High"| D["Bisphosphonate"]
    C -->|"Very High"| E["Anabolic First\\n(Teriparatide)"]
    D --> F["5 Years\\nReassess"]
    E --> G["2 Years\\nTransition to BP"]`
};

export const thyroidNoduleWorkup: DiagramTemplate = {
  id: 'endo-thyroid-nodule',
  name: 'Thyroid Nodule Workup',
  description: 'Algorithm for evaluating thyroid nodules',
  domain: 'medicine',
  promptTemplate: `Create a thyroid nodule workup algorithm:
- Initial evaluation: {{initialEval}}
- TSH interpretation: {{tshInterpretation}}
- Ultrasound findings: {{usFindingsg}}
- FNA criteria: {{fnaCriteria}}
- Bethesda classification: {{bethesda}}
{{#additionalNotes}}Surveillance protocols: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['initialEval', 'tshInterpretation', 'usFindings', 'fnaCriteria', 'bethesda', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Thyroid Nodule"] --> B["TSH + US"]
    B --> C{"TSH Low?"}
    C -->|"Yes"| D["Thyroid Scan"]
    C -->|"No"| E{"US Features"}
    E -->|"Suspicious"| F["FNA"]
    E -->|"Benign"| G["Surveillance"]
    F --> H["Bethesda Class"]`
};

export const pituitaryInsufficiency: DiagramTemplate = {
  id: 'endo-pituitary-insufficiency',
  name: 'Pituitary Insufficiency Replacement',
  description: 'Protocol for hormone replacement in hypopituitarism',
  domain: 'medicine',
  promptTemplate: `Create a pituitary hormone replacement protocol:
- Cortisol replacement: {{cortisolReplacement}}
- Thyroid replacement: {{thyroidReplacement}}
- Gonadal replacement: {{gonadalReplacement}}
- Growth hormone: {{growthHormone}}
- Monitoring: {{monitoring}}
{{#additionalNotes}}Order of replacement: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['cortisolReplacement', 'thyroidReplacement', 'gonadalReplacement', 'growthHormone', 'monitoring', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Hypopituitarism"] --> B["Replace Cortisol FIRST"]
    B --> C["Then Thyroid"]
    C --> D["Then Gonadal"]
    D --> E["Consider GH"]
    B1["Hydrocortisone\\n15-25mg/day"]
    C1["Levothyroxine\\nby fT4"]
    D1["Testosterone or\\nEstrogen/Progest"]`
};

export const hhsManagement: DiagramTemplate = {
  id: 'endo-hhs-management',
  name: 'HHS Management Protocol',
  description: 'Protocol for managing hyperosmolar hyperglycemic state',
  domain: 'medicine',
  promptTemplate: `Create an HHS management protocol:
- Diagnosis criteria: {{diagnosisCriteria}}
- Fluid resuscitation: {{fluidResuscitation}}
- Insulin therapy: {{insulinTherapy}}
- Electrolyte management: {{electrolyteManagement}}
- Osmolality monitoring: {{osmolalityMonitoring}}
- Transition criteria: {{transitionCriteria}}
{{#additionalNotes}}Thromboprophylaxis: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['diagnosisCriteria', 'fluidResuscitation', 'insulinTherapy', 'electrolyteManagement', 'osmolalityMonitoring', 'transitionCriteria', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["HHS Confirmed\\nGlc >600, Osm >320"] --> B["Aggressive Fluids\\nNS 1-1.5L/h"]
    B --> C["Once Replete:\\nInsulin 0.1 U/kg/h"]
    C --> D{"Glucose <300?"}
    D -->|"Yes"| E["Add D5, ↓Insulin"]
    B --> F["Monitor Osm\\nq2-4h"]
    F --> G["Correct Na+\\nfor glucose"]`
};

export const cushingSyndromeWorkup: DiagramTemplate = {
  id: 'endo-cushing-workup',
  name: 'Cushing Syndrome Workup',
  description: 'Algorithm for diagnosing and localizing Cushing syndrome',
  domain: 'medicine',
  promptTemplate: `Create a Cushing syndrome workup algorithm:
- Screening tests: {{screeningTests}}
- Confirmatory tests: {{confirmatoryTests}}
- ACTH-dependent vs independent: {{acthStatus}}
- Localization studies: {{localizationStudies}}
- Treatment options: {{treatmentOptions}}
{{#additionalNotes}}Pseudo-Cushing: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['screeningTests', 'confirmatoryTests', 'acthStatus', 'localizationStudies', 'treatmentOptions', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Suspected Cushing"] --> B["24h UFC\\n1mg DST\\nLate Night Salivary"]
    B --> C{">2 Abnormal?"}
    C -->|"Yes"| D["Check ACTH"]
    D -->|"Low"| E["CT Adrenals"]
    D -->|"Normal/High"| F["Pituitary MRI\\nIPSS"]
    E --> G["Adrenal Tumor"]
    F --> H["Pituitary vs Ectopic"]`
};

export const pheochromocytomaManagement: DiagramTemplate = {
  id: 'endo-pheochromocytoma',
  name: 'Pheochromocytoma Management',
  description: 'Protocol for diagnosing and managing pheochromocytoma',
  domain: 'medicine',
  promptTemplate: `Create a pheochromocytoma management protocol:
- Biochemical testing: {{biochemicalTesting}}
- Imaging studies: {{imagingStudies}}
- Preoperative blockade: {{preoperativeBlockade}}
- Alpha before beta: {{alphaBetaSequence}}
- Surgical considerations: {{surgicalConsiderations}}
{{#additionalNotes}}Genetic testing: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['biochemicalTesting', 'imagingStudies', 'preoperativeBlockade', 'alphaBetaSequence', 'surgicalConsiderations', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Suspected Pheo"] --> B["Plasma/Urine\\nMetanephrines"]
    B -->|"Elevated"| C["CT/MRI Adrenals"]
    C -->|"Mass Found"| D["Alpha Blockade FIRST"]
    D --> E["Phenoxybenzamine\\nor Doxazosin"]
    E --> F["Then Beta Blocker\\nif Tachycardic"]
    F --> G["Surgery"]`
};

export const primaryAldosteronismWorkup: DiagramTemplate = {
  id: 'endo-primary-aldo',
  name: 'Primary Aldosteronism Workup',
  description: 'Algorithm for diagnosing primary aldosteronism',
  domain: 'medicine',
  promptTemplate: `Create a primary aldosteronism workup algorithm:
- Screening indications: {{screeningIndications}}
- ARR interpretation: {{arrInterpretation}}
- Confirmatory tests: {{confirmatoryTests}}
- Subtype differentiation: {{subtypeDifferentiation}}
- Treatment selection: {{treatmentSelection}}
{{#additionalNotes}}AVS interpretation: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['screeningIndications', 'arrInterpretation', 'confirmatoryTests', 'subtypeDifferentiation', 'treatmentSelection', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Resistant HTN\\nor Hypokalemia"] --> B["ARR Screen"]
    B -->|"ARR >30"| C["Confirmatory Test\\nSaline Suppression"]
    C -->|"Positive"| D["CT Adrenals"]
    D --> E{"Unilateral\\nor Bilateral?"}
    E -->|"Unclear"| F["AVS"]
    E -->|"Unilateral"| G["Surgery"]
    E -->|"Bilateral"| H["Spironolactone"]`
};

export const hyponatremiaManagement: DiagramTemplate = {
  id: 'endo-hyponatremia',
  name: 'Hyponatremia Management Algorithm',
  description: 'Algorithm for evaluating and treating hyponatremia',
  domain: 'medicine',
  promptTemplate: `Create a hyponatremia management algorithm:
- Volume status assessment: {{volumeStatus}}
- Urine studies: {{urineStudies}}
- Etiology identification: {{etiologyIdentification}}
- Correction rate: {{correctionRate}}
- ODS prevention: {{odsPrevention}}
- SIADH management: {{siadhManagement}}
{{#additionalNotes}}Acute vs chronic: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['volumeStatus', 'urineStudies', 'etiologyIdentification', 'correctionRate', 'odsPrevention', 'siadhManagement', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Na <135"] --> B{"Serum Osm?"}
    B -->|"Low"| C{"Volume Status?"}
    C -->|"Low"| D["NS Resuscitation"]
    C -->|"Normal"| E["SIADH: Restrict\\nVaptans"]
    C -->|"High"| F["Diuresis"]
    D & E & F --> G["Correct ≤8-10 mEq/24h"]`
};

export const hypercalcemiaWorkup: DiagramTemplate = {
  id: 'endo-hypercalcemia',
  name: 'Hypercalcemia Workup and Management',
  description: 'Algorithm for diagnosing and treating hypercalcemia',
  domain: 'medicine',
  promptTemplate: `Create a hypercalcemia workup algorithm:
- PTH interpretation: {{pthInterpretation}}
- PTHrP testing: {{pthrpTesting}}
- Vitamin D metabolites: {{vitaminDMetabolites}}
- Malignancy workup: {{malignancyWorkup}}
- Acute management: {{acuteManagement}}
- Surgery indications: {{surgeryIndications}}
{{#additionalNotes}}FHH vs PHPT: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['pthInterpretation', 'pthrpTesting', 'vitaminDMetabolites', 'malignancyWorkup', 'acuteManagement', 'surgeryIndications', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Ca >10.5"] --> B["Check PTH"]
    B -->|"High/Normal"| C["Primary Hyperparathyroidism"]
    B -->|"Low"| D["Non-PTH Mediated"]
    D --> E["PTHrP, Vit D\\nMalignancy W/U"]
    C --> F{"Surgery\\nIndications?"}
    F -->|"Yes"| G["Parathyroidectomy"]
    F -->|"No"| H["Monitor or\\nCinacalcet"]`
};

export const diabetesInPregnancy: DiagramTemplate = {
  id: 'endo-diabetes-pregnancy',
  name: 'Diabetes in Pregnancy Management',
  description: 'Protocol for managing diabetes during pregnancy',
  domain: 'medicine',
  promptTemplate: `Create a diabetes in pregnancy protocol:
- GDM screening: {{gdmScreening}}
- Glycemic targets: {{glycemicTargets}}
- Medication options: {{medicationOptions}}
- Fetal monitoring: {{fetalMonitoring}}
- Delivery timing: {{deliveryTiming}}
- Postpartum management: {{postpartumManagement}}
{{#additionalNotes}}Type 1/2 preconception: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['gdmScreening', 'glycemicTargets', 'medicationOptions', 'fetalMonitoring', 'deliveryTiming', 'postpartumManagement', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Pregnancy + Diabetes"] --> B["Targets:\\nFasting <95\\n1h <140\\n2h <120"]
    B --> C{"Diet Controlled?"}
    C -->|"No"| D["Insulin"]
    C -->|"Yes"| E["Continue Diet"]
    D --> F["Fetal Surveillance\\nGrowth Scans"]
    F --> G["Deliver 39-40 wk\\nunless complications"]`
};

export const testosteroneReplacement: DiagramTemplate = {
  id: 'endo-testosterone',
  name: 'Testosterone Replacement Therapy',
  description: 'Protocol for testosterone replacement in hypogonadism',
  domain: 'medicine',
  promptTemplate: `Create a testosterone replacement protocol:
- Diagnosis criteria: {{diagnosisCriteria}}
- Formulation selection: {{formulationSelection}}
- Dosing: {{dosing}}
- Monitoring parameters: {{monitoringParameters}}
- Contraindications: {{contraindications}}
- Side effect management: {{sideEffectManagement}}
{{#additionalNotes}}Fertility considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['diagnosisCriteria', 'formulationSelection', 'dosing', 'monitoringParameters', 'contraindications', 'sideEffectManagement', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Low T Symptoms\\n+ Low AM T x2"] --> B["Confirm Hypogonadism"]
    B --> C{"Contraindications?"}
    C -->|"No"| D["Select Formulation"]
    D --> E["Gel, Injection\\nor Patch"]
    E --> F["Monitor:\\nT, Hct, PSA"]
    F --> G["Adjust to\\nMid-Normal T"]`
};

export const menopauseHRT: DiagramTemplate = {
  id: 'endo-menopause-hrt',
  name: 'Menopause Hormone Therapy',
  description: 'Algorithm for hormone therapy in menopause',
  domain: 'medicine',
  promptTemplate: `Create a menopause HRT algorithm:
- Indication assessment: {{indicationAssessment}}
- Risk stratification: {{riskStratification}}
- Regimen selection: {{regimenSelection}}
- Duration of therapy: {{durationTherapy}}
- Monitoring: {{monitoring}}
- Alternatives: {{alternatives}}
{{#additionalNotes}}Timing hypothesis: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['indicationAssessment', 'riskStratification', 'regimenSelection', 'durationTherapy', 'monitoring', 'alternatives', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Vasomotor Symptoms"] --> B{"Age <60 or\\n<10y Postmenopause?"}
    B -->|"Yes"| C{"Uterus?"}
    C -->|"Yes"| D["E + P"]
    C -->|"No"| E["E alone"]
    B -->|"No"| F["Non-Hormonal:\\nSSRI, Gabapentin"]
    D & E --> G["Lowest Dose\\nShortest Duration"]`
};

export const thyroidStormManagement: DiagramTemplate = {
  id: 'endo-thyroid-storm',
  name: 'Thyroid Storm Management',
  description: 'Emergency protocol for thyroid storm',
  domain: 'medicine',
  promptTemplate: `Create a thyroid storm management protocol:
- Recognition criteria: {{recognitionCriteria}}
- Burch-Wartofsky score: {{burchWartofskyScore}}
- Immediate interventions: {{immediateInterventions}}
- Medication sequence: {{medicationSequence}}
- Supportive care: {{supportiveCare}}
- Precipitant identification: {{precipitantIdentification}}
{{#additionalNotes}}ICU management: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['recognitionCriteria', 'burchWartofskyScore', 'immediateInterventions', 'medicationSequence', 'supportiveCare', 'precipitantIdentification', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Thyroid Storm\\nBW Score ≥45"] --> B["Block Synthesis:\\nPTU 200mg q4h"]
    B --> C["Block Release:\\nIodine AFTER PTU"]
    C --> D["Block Conversion:\\nPropranolol\\nSteroids"]
    D --> E["Supportive:\\nCooling\\nIV Fluids"]
    E --> F["Identify Trigger"]`
};

export const endocrineDrugsTemplates: DiagramTemplate[] = [
  insulinTypesComparison,
  diabetesOralAgentSelection,
  insulinTitrationProtocol,
  dkaManagement,
  thyroidReplacementDosing,
  steroidEquivalence,
  adrenalInsufficiencyManagement,
  hyperthyroidismTreatment,
  glp1Protocol,
  sglt2Protocol,
  hypoglycemiaManagement,
  osteoporosisTherapy,
  thyroidNoduleWorkup,
  pituitaryInsufficiency,
  hhsManagement,
  cushingSyndromeWorkup,
  pheochromocytomaManagement,
  primaryAldosteronismWorkup,
  hyponatremiaManagement,
  hypercalcemiaWorkup,
  diabetesInPregnancy,
  testosteroneReplacement,
  menopauseHRT,
  thyroidStormManagement,
];

export default endocrineDrugsTemplates;
