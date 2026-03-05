/**
 * pulmonology.ts
 * Pulmonology diagram templates for FINNISH
 *
 * Contains comprehensive templates for pulmonary medicine including:
 * - Clinical decision algorithms (7)
 * - Anatomical diagrams (4)
 * - Procedure illustrations (3)
 * - Data visualization templates (4)
 * - Additional clinical templates (5)
 * - Advanced clinical templates (2)
 *
 * Total: 25 templates
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// CLINICAL DECISION TREES (7 templates)
// =============================================================================

/**
 * Dyspnea Evaluation Algorithm template
 */
export const dyspneaEvaluation: DiagramTemplate = {
  id: 'pulm-dyspnea-evaluation',
  name: 'Dyspnea Evaluation Algorithm',
  description: 'Systematic approach to dyspnea workup including acute vs chronic causes',
  domain: 'medicine',
  promptTemplate: `Create a dyspnea evaluation algorithm flowchart:
- Presentation: {{presentation}}
- Onset (acute vs chronic): {{onset}}
- Vital signs: {{vitalSigns}}
- Initial tests: {{initialTests}}
- Differential diagnosis: {{differentialDx}}
- Red flag symptoms: {{redFlags}}
- Treatment pathways: {{treatmentPathways}}
{{#additionalNotes}}Additional clinical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentation',
    'onset',
    'vitalSigns',
    'initialTests',
    'differentialDx',
    'redFlags',
    'treatmentPathways',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Dyspnea")] --> B{"Acute or\\nChronic?"}
    B -->|"Acute"| C{"Hypoxic?"}
    C -->|"Yes"| D["O2 + ABG"]
    C -->|"No"| E["ECG + CXR"]
    D --> F{"CXR Finding?"}
    F -->|"Infiltrate"| G["Pneumonia/ARDS"]
    F -->|"Clear"| H["PE Protocol"]
    B -->|"Chronic"| I{"PFT Pattern?"}
    I -->|"Obstructive"| J["COPD/Asthma"]
    I -->|"Restrictive"| K["ILD Workup"]
    style G fill:#DC143C,color:#fff
    style H fill:#FFA500,color:#000`,
};

/**
 * COPD Exacerbation Algorithm template
 */
export const copdExacerbation: DiagramTemplate = {
  id: 'pulm-copd-exacerbation',
  name: 'COPD Exacerbation Management',
  description: 'GOLD guideline-based approach to COPD exacerbation management',
  domain: 'medicine',
  promptTemplate: `Create a COPD exacerbation management flowchart:
- Severity assessment: {{severityAssessment}}
- Presenting symptoms: {{symptoms}}
- Triggers identified: {{triggers}}
- Bronchodilator therapy: {{bronchodilators}}
- Steroid regimen: {{steroids}}
- Antibiotic indications: {{antibioticIndications}}
- Escalation criteria: {{escalationCriteria}}
- Discharge planning: {{dischargePlanning}}
{{#additionalNotes}}Additional factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'severityAssessment',
    'symptoms',
    'triggers',
    'bronchodilators',
    'steroids',
    'antibioticIndications',
    'escalationCriteria',
    'dischargePlanning',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("COPD\\nExacerbation")] --> B{"Severity?"}
    B -->|"Mild"| C["Outpatient\\nSABA + Steroids"]
    B -->|"Moderate"| D["ED/Admit"]
    B -->|"Severe"| E["ICU"]
    D --> F["SABA/SAMA Nebs"]
    D --> G["Prednisone 40mg x5d"]
    D --> H{"Purulent\\nSputum?"}
    H -->|"Yes"| I["Antibiotics"]
    H -->|"No"| J["Monitor"]
    E --> K["NIV vs Intubation"]
    style E fill:#DC143C,color:#fff
    style C fill:#228B22,color:#fff`,
};

/**
 * Asthma Management Algorithm template
 */
export const asthmaManagement: DiagramTemplate = {
  id: 'pulm-asthma-management',
  name: 'Asthma Management Algorithm',
  description: 'GINA guideline-based stepwise asthma management approach',
  domain: 'medicine',
  promptTemplate: `Create an asthma management algorithm:
- Severity classification: {{severityClass}}
- Control assessment: {{controlAssessment}}
- Current step: {{currentStep}}
- Controller medications: {{controllers}}
- Reliever medications: {{relievers}}
- Step-up criteria: {{stepUpCriteria}}
- Step-down criteria: {{stepDownCriteria}}
- Biologics eligibility: {{biologicsEligibility}}
{{#additionalNotes}}Additional considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'severityClass',
    'controlAssessment',
    'currentStep',
    'controllers',
    'relievers',
    'stepUpCriteria',
    'stepDownCriteria',
    'biologicsEligibility',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Asthma\\nDiagnosis")] --> B{"Control\\nLevel?"}
    B -->|"Well Controlled"| C["Maintain Step"]
    B -->|"Partly Controlled"| D["Consider Step Up"]
    B -->|"Uncontrolled"| E["Step Up"]
    subgraph Steps["GINA Steps"]
        S1["Step 1: PRN ICS-formoterol"]
        S2["Step 2: Low-dose ICS"]
        S3["Step 3: Low ICS-LABA"]
        S4["Step 4: Med/High ICS-LABA"]
        S5["Step 5: Add-on Biologics"]
    end
    C --> F["Review in 3 months"]
    E --> G{"Step 4-5\\nFailure?"}
    G -->|"Yes"| H["Biologic Workup"]
    style H fill:#4169E1,color:#fff`,
};

/**
 * Pulmonary Nodule Workup template
 */
export const pulmonaryNoduleWorkup: DiagramTemplate = {
  id: 'pulm-nodule-workup',
  name: 'Pulmonary Nodule Workup',
  description: 'Fleischner Society guideline-based approach to incidental pulmonary nodules',
  domain: 'medicine',
  promptTemplate: `Create a pulmonary nodule workup algorithm:
- Nodule size: {{noduleSize}}
- Nodule characteristics: {{characteristics}}
- Patient risk factors: {{riskFactors}}
- Solid vs subsolid: {{noduleType}}
- Follow-up imaging: {{followUpImaging}}
- PET indication: {{petIndication}}
- Biopsy criteria: {{biopsyCriteria}}
- Malignancy probability: {{malignancyProb}}
{{#additionalNotes}}Clinical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'noduleSize',
    'characteristics',
    'riskFactors',
    'noduleType',
    'followUpImaging',
    'petIndication',
    'biopsyCriteria',
    'malignancyProb',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Pulmonary\\nNodule")] --> B{"Size?"}
    B -->|"<6mm"| C{"High Risk?"}
    C -->|"No"| D["No Routine F/U"]
    C -->|"Yes"| E["CT 12 months"]
    B -->|"6-8mm"| F["CT 6-12 months"]
    B -->|">8mm"| G{"Solid?"}
    G -->|"Yes"| H["CT 3 mo or PET"]
    G -->|"Subsolid"| I["CT 3-6 months"]
    H --> J{"Growing/PET+?"}
    J -->|"Yes"| K["Biopsy/Resect"]
    style K fill:#DC143C,color:#fff
    style D fill:#228B22,color:#fff`,
};

/**
 * Pneumonia Treatment Algorithm template
 */
export const pneumoniaTreatment: DiagramTemplate = {
  id: 'pulm-pneumonia-treatment',
  name: 'Pneumonia Treatment Algorithm',
  description: 'CAP/HAP treatment selection based on severity and risk factors',
  domain: 'medicine',
  promptTemplate: `Create a pneumonia treatment algorithm:
- Setting (CAP vs HAP): {{setting}}
- Severity score: {{severityScore}}
- Risk stratification: {{riskStratification}}
- Empiric antibiotics: {{empiricAntibiotics}}
- Atypical coverage: {{atypicalCoverage}}
- MRSA/Pseudomonas risk: {{resistanceRisk}}
- Duration of therapy: {{duration}}
- De-escalation criteria: {{deescalation}}
{{#additionalNotes}}Additional factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'setting',
    'severityScore',
    'riskStratification',
    'empiricAntibiotics',
    'atypicalCoverage',
    'resistanceRisk',
    'duration',
    'deescalation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Pneumonia")] --> B{"CAP or HAP?"}
    B -->|"CAP"| C{"CURB-65?"}
    C -->|"0-1"| D["Outpatient\\nAmox or Doxy"]
    C -->|"2"| E["Admit Floor\\nFQ or Beta-lactam + Macrolide"]
    C -->|"≥3"| F["ICU\\nBeta-lactam + FQ/Macrolide"]
    B -->|"HAP"| G{"MDR Risk?"}
    G -->|"Low"| H["Pip-tazo or Cefepime"]
    G -->|"High"| I["Dual anti-pseudomonal\\n+/- MRSA coverage"]
    style F fill:#DC143C,color:#fff
    style D fill:#228B22,color:#fff`,
};

/**
 * Pulmonary Embolism Algorithm template
 */
export const peAlgorithm: DiagramTemplate = {
  id: 'pulm-pe-algorithm',
  name: 'Pulmonary Embolism Algorithm',
  description: 'PE diagnosis and risk stratification pathway',
  domain: 'medicine',
  promptTemplate: `Create a PE diagnostic and treatment algorithm:
- Clinical probability: {{clinicalProbability}}
- Wells/Geneva score: {{wellsScore}}
- D-dimer utility: {{ddimerUtility}}
- Imaging choice: {{imagingChoice}}
- Risk stratification: {{riskStratification}}
- Hemodynamic status: {{hemodynamicStatus}}
- Treatment selection: {{treatmentSelection}}
- Thrombolysis criteria: {{thrombolysisCriteria}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'clinicalProbability',
    'wellsScore',
    'ddimerUtility',
    'imagingChoice',
    'riskStratification',
    'hemodynamicStatus',
    'treatmentSelection',
    'thrombolysisCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Suspected PE")] --> B{"Wells Score"}
    B -->|"≤4 Unlikely"| C["D-dimer"]
    B -->|">4 Likely"| D["CTPA"]
    C -->|"Negative"| E["PE Excluded"]
    C -->|"Positive"| D
    D -->|"PE Confirmed"| F{"Hemodynamics?"}
    F -->|"Unstable"| G["Thrombolysis"]
    F -->|"Stable"| H{"sPESI?"}
    H -->|"0"| I["Outpatient DOAC"]
    H -->|"≥1"| J["Admit + Anticoag"]
    style G fill:#DC143C,color:#fff
    style E fill:#228B22,color:#fff
    style I fill:#228B22,color:#fff`,
};

/**
 * Respiratory Failure Algorithm template
 */
export const respiratoryFailure: DiagramTemplate = {
  id: 'pulm-respiratory-failure',
  name: 'Respiratory Failure Management',
  description: 'Approach to acute respiratory failure including NIV and mechanical ventilation',
  domain: 'medicine',
  promptTemplate: `Create a respiratory failure management algorithm:
- Type of failure: {{failureType}}
- Underlying cause: {{underlyingCause}}
- ABG values: {{abgValues}}
- Oxygen therapy: {{oxygenTherapy}}
- NIV indications: {{nivIndications}}
- Intubation criteria: {{intubationCriteria}}
- Ventilator strategy: {{ventStrategy}}
- Weaning approach: {{weaningApproach}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'failureType',
    'underlyingCause',
    'abgValues',
    'oxygenTherapy',
    'nivIndications',
    'intubationCriteria',
    'ventStrategy',
    'weaningApproach',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Respiratory\\nFailure")] --> B{"Type?"}
    B -->|"Type I\\nHypoxemic"| C["High-Flow O2"]
    B -->|"Type II\\nHypercapnic"| D["NIV First"]
    C --> E{"Improving?"}
    E -->|"No"| F["Consider NIV"]
    F --> G{"NIV Failure?"}
    D --> G
    G -->|"Yes"| H["Intubation"]
    G -->|"No"| I["Continue NIV"]
    H --> J["Lung Protective\\nVentilation"]
    E -->|"Yes"| K["Wean O2"]
    style H fill:#DC143C,color:#fff
    style K fill:#228B22,color:#fff`,
};

// =============================================================================
// ANATOMICAL DIAGRAMS (4 templates)
// =============================================================================

/**
 * Lung Zones template
 */
export const lungZones: DiagramTemplate = {
  id: 'pulm-lung-zones',
  name: 'Lung Zones Anatomy',
  description: 'West zones of the lung with V/Q relationships',
  domain: 'medicine',
  promptTemplate: `Create a lung zones anatomy diagram:
- Zone 1 characteristics: {{zone1}}
- Zone 2 characteristics: {{zone2}}
- Zone 3 characteristics: {{zone3}}
- Pressure relationships: {{pressureRelationships}}
- V/Q ratios by zone: {{vqRatios}}
- Clinical implications: {{clinicalImplications}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'zone1',
    'zone2',
    'zone3',
    'pressureRelationships',
    'vqRatios',
    'clinicalImplications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Lung["Lung Zones (West)"]
        Z1["Zone 1: PA > Pa > Pv\\nDead Space"]
        Z2["Zone 2: Pa > PA > Pv\\nWaterfall"]
        Z3["Zone 3: Pa > Pv > PA\\nDistension"]
    end
    subgraph VQ["V/Q Relationships"]
        V1["Apex: High V/Q (~3.0)"]
        V2["Middle: V/Q ~1.0"]
        V3["Base: Low V/Q (~0.6)"]
    end
    Z1 --- V1
    Z2 --- V2
    Z3 --- V3
    style Z1 fill:#87CEEB
    style Z3 fill:#DC143C`,
};

/**
 * Bronchial Tree Anatomy template
 */
export const bronchialTreeAnatomy: DiagramTemplate = {
  id: 'pulm-bronchial-tree',
  name: 'Bronchial Tree Anatomy',
  description: 'Complete bronchial tree from trachea to alveoli',
  domain: 'medicine',
  promptTemplate: `Create a bronchial tree anatomy diagram:
- Trachea dimensions: {{trachea}}
- Carina level: {{carina}}
- Main bronchi: {{mainBronchi}}
- Lobar bronchi: {{lobarBronchi}}
- Segmental bronchi: {{segmentalBronchi}}
- Generations: {{generations}}
- Conducting vs respiratory zone: {{zoneTransition}}
{{#additionalNotes}}Clinical correlations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'trachea',
    'carina',
    'mainBronchi',
    'lobarBronchi',
    'segmentalBronchi',
    'generations',
    'zoneTransition',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    T["Trachea"] --> C["Carina (T4-5)"]
    C --> RMB["Right Main\\nBronchus"]
    C --> LMB["Left Main\\nBronchus"]
    RMB --> RUL["RUL"] & RML["RML"] & RLL["RLL"]
    LMB --> LUL["LUL"] & LLL["LLL"]
    RUL --> S1["Apical"] & S2["Post"] & S3["Ant"]
    subgraph Zones["Airway Zones"]
        CZ["Conducting Zone\\n(Gen 0-16)"]
        RZ["Respiratory Zone\\n(Gen 17-23)"]
    end
    style T fill:#4169E1
    style C fill:#FFA500`,
};

/**
 * Alveolar Unit template
 */
export const alveolarUnit: DiagramTemplate = {
  id: 'pulm-alveolar-unit',
  name: 'Alveolar Unit Anatomy',
  description: 'Detailed alveolar structure including gas exchange membrane',
  domain: 'medicine',
  promptTemplate: `Create an alveolar unit anatomy diagram:
- Type I pneumocytes: {{typeI}}
- Type II pneumocytes: {{typeII}}
- Surfactant layer: {{surfactant}}
- Capillary network: {{capillaries}}
- Blood-gas barrier: {{bloodGasBarrier}}
- Gas exchange process: {{gasExchange}}
- Alveolar macrophages: {{macrophages}}
{{#additionalNotes}}Pathologic changes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'typeI',
    'typeII',
    'surfactant',
    'capillaries',
    'bloodGasBarrier',
    'gasExchange',
    'macrophages',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Alveolus["Alveolar Unit"]
        A["Alveolar Space"]
        S["Surfactant Layer"]
        T1["Type I Pneumocyte\\n(95% surface)"]
        T2["Type II Pneumocyte\\n(Surfactant producer)"]
        M["Alveolar Macrophage"]
    end
    subgraph Barrier["Blood-Gas Barrier (0.5μm)"]
        E["Epithelium"]
        BM["Basement Membrane"]
        EN["Endothelium"]
    end
    subgraph Cap["Capillary"]
        RBC["RBC: CO2 → O2"]
    end
    A --> S --> E --> BM --> EN --> RBC
    style RBC fill:#DC143C`,
};

/**
 * Pleural Anatomy template
 */
export const pleuralAnatomy: DiagramTemplate = {
  id: 'pulm-pleural-anatomy',
  name: 'Pleural Anatomy',
  description: 'Pleural space anatomy and physiology',
  domain: 'medicine',
  promptTemplate: `Create a pleural anatomy diagram:
- Visceral pleura: {{visceralPleura}}
- Parietal pleura: {{parietalPleura}}
- Pleural space: {{pleuralSpace}}
- Pleural fluid dynamics: {{fluidDynamics}}
- Recesses: {{recesses}}
- Innervation: {{innervation}}
- Clinical relevance: {{clinicalRelevance}}
{{#additionalNotes}}Pathologic conditions: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'visceralPleura',
    'parietalPleura',
    'pleuralSpace',
    'fluidDynamics',
    'recesses',
    'innervation',
    'clinicalRelevance',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Chest["Chest Wall"]
        PP["Parietal Pleura"]
    end
    subgraph Space["Pleural Space"]
        F["Fluid 10-20mL\\nNegative Pressure"]
    end
    subgraph Lung["Lung"]
        VP["Visceral Pleura"]
        L["Lung Parenchyma"]
    end
    PP --> F --> VP --> L
    subgraph Recesses["Recesses"]
        CP["Costodiaphragmatic"]
        CM["Costomediastinal"]
    end
    style F fill:#87CEEB
    style PP fill:#FFA500
    style VP fill:#228B22`,
};

// =============================================================================
// PROCEDURE ILLUSTRATIONS (3 templates)
// =============================================================================

/**
 * Chest Tube Insertion template
 */
export const pulmonologyChestTubeInsertion: DiagramTemplate = {
  id: 'pulm-chest-tube',
  name: 'Chest Tube Insertion',
  description: 'Step-by-step thoracostomy tube placement procedure',
  domain: 'medicine',
  promptTemplate: `Create a chest tube insertion procedure flowchart:
- Indication: {{indication}}
- Patient positioning: {{positioning}}
- Insertion site: {{insertionSite}}
- Local anesthesia: {{anesthesia}}
- Incision technique: {{incisionTechnique}}
- Tube advancement: {{tubeAdvancement}}
- Securing method: {{securingMethod}}
- Post-procedure care: {{postProcedure}}
{{#additionalNotes}}Complications to monitor: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'indication',
    'positioning',
    'insertionSite',
    'anesthesia',
    'incisionTechnique',
    'tubeAdvancement',
    'securingMethod',
    'postProcedure',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Indication:\\nPTX/Effusion"] --> B["Position: Semi-recumbent\\nArm above head"]
    B --> C["Site: 4-5th ICS\\nMid-axillary line"]
    C --> D["Prep + Drape\\nLocal anesthesia"]
    D --> E["Incision 2-3cm\\nAbove rib"]
    E --> F["Blunt dissection\\nFinger sweep"]
    F --> G["Insert tube\\nDirect posteriorly"]
    G --> H["Secure + Connect\\nto drainage"]
    H --> I["CXR confirmation"]
    style A fill:#FFA500
    style I fill:#228B22`,
};

/**
 * Bronchoscopy Procedure template
 */
export const bronchoscopyProcedure: DiagramTemplate = {
  id: 'pulm-bronchoscopy',
  name: 'Bronchoscopy Procedure',
  description: 'Flexible bronchoscopy procedure steps and findings',
  domain: 'medicine',
  promptTemplate: `Create a bronchoscopy procedure flowchart:
- Indication: {{indication}}
- Pre-procedure preparation: {{preparation}}
- Sedation/anesthesia: {{sedation}}
- Airway approach: {{airwayApproach}}
- Systematic examination: {{systematicExam}}
- Sampling techniques: {{samplingTechniques}}
- Post-procedure care: {{postCare}}
- Specimen handling: {{specimenHandling}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'indication',
    'preparation',
    'sedation',
    'airwayApproach',
    'systematicExam',
    'samplingTechniques',
    'postCare',
    'specimenHandling',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Pre-procedure"] --> B["NPO + Consent\\nLabs: Plt, Coags"]
    B --> C["Moderate Sedation\\nTopical lidocaine"]
    C --> D["Insert via\\nnose or mouth"]
    D --> E["Systematic Exam"]
    subgraph Exam["Inspection"]
        E1["Vocal cords"]
        E2["Trachea + Carina"]
        E3["R bronchial tree"]
        E4["L bronchial tree"]
    end
    E --> E1 --> E2 --> E3 --> E4
    E4 --> F{"Abnormality?"}
    F -->|"Yes"| G["BAL/Brush/Biopsy"]
    F -->|"No"| H["Complete + Recover"]
    style G fill:#4169E1`,
};

/**
 * Mechanical Ventilation Settings template
 */
export const mechVentSettings: DiagramTemplate = {
  id: 'pulm-mech-vent-settings',
  name: 'Mechanical Ventilation Settings',
  description: 'Initial ventilator setup and adjustment algorithms',
  domain: 'medicine',
  promptTemplate: `Create a mechanical ventilation settings flowchart:
- Mode selection: {{modeSelection}}
- Tidal volume: {{tidalVolume}}
- Respiratory rate: {{respiratoryRate}}
- PEEP strategy: {{peepStrategy}}
- FiO2 titration: {{fio2Titration}}
- I:E ratio: {{ieRatio}}
- Alarm settings: {{alarmSettings}}
- Troubleshooting: {{troubleshooting}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'modeSelection',
    'tidalVolume',
    'respiratoryRate',
    'peepStrategy',
    'fio2Titration',
    'ieRatio',
    'alarmSettings',
    'troubleshooting',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Initiate Ventilation"] --> B{"ARDS?"}
    B -->|"Yes"| C["Low Vt Strategy\\n4-6 mL/kg IBW"]
    B -->|"No"| D["Standard\\n6-8 mL/kg IBW"]
    C --> E["PEEP per\\nARDS Net Table"]
    D --> F["PEEP 5-8"]
    E & F --> G["Set RR\\n12-20"]
    G --> H["FiO2 for\\nSpO2 88-95%"]
    H --> I{"Pplat >30?"}
    I -->|"Yes"| J["Reduce Vt"]
    I -->|"No"| K["Monitor"]
    style C fill:#DC143C,color:#fff
    style K fill:#228B22`,
};

// =============================================================================
// DATA VISUALIZATION TEMPLATES (4 templates)
// =============================================================================

/**
 * PFT Interpretation template
 */
export const pftInterpretation: DiagramTemplate = {
  id: 'pulm-pft-interpretation',
  name: 'PFT Interpretation Template',
  description: 'Systematic pulmonary function test interpretation',
  domain: 'medicine',
  promptTemplate: `Create a PFT interpretation flowchart:
- FEV1/FVC ratio: {{fev1FvcRatio}}
- FVC value: {{fvcValue}}
- FEV1 value: {{fev1Value}}
- TLC measurement: {{tlcMeasurement}}
- DLCO value: {{dlcoValue}}
- Bronchodilator response: {{bronchodilatorResponse}}
- Pattern classification: {{patternClassification}}
- Severity grading: {{severityGrading}}
{{#additionalNotes}}Clinical correlation: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'fev1FvcRatio',
    'fvcValue',
    'fev1Value',
    'tlcMeasurement',
    'dlcoValue',
    'bronchodilatorResponse',
    'patternClassification',
    'severityGrading',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["PFT Results"] --> B{"FEV1/FVC\\n<0.70?"}
    B -->|"Yes"| C["Obstruction"]
    B -->|"No"| D{"FVC <80%?"}
    D -->|"Yes"| E["Check TLC"]
    D -->|"No"| F["Normal"]
    E -->|"TLC <80%"| G["Restriction"]
    E -->|"TLC Normal"| H["Pseudorestriction"]
    C --> I{"FEV1 %pred?"}
    I -->|">80%"| J["Mild"]
    I -->|"50-80%"| K["Moderate"]
    I -->|"30-50%"| L["Severe"]
    I -->|"<30%"| M["Very Severe"]
    style C fill:#FFA500
    style G fill:#4169E1
    style F fill:#228B22`,
};

/**
 * ABG Analysis template
 */
export const abgAnalysis: DiagramTemplate = {
  id: 'pulm-abg-analysis',
  name: 'ABG Analysis Template',
  description: 'Systematic arterial blood gas interpretation',
  domain: 'medicine',
  promptTemplate: `Create an ABG analysis flowchart:
- pH value: {{phValue}}
- PaCO2 value: {{paco2Value}}
- HCO3 value: {{hco3Value}}
- PaO2 value: {{pao2Value}}
- A-a gradient: {{aaGradient}}
- Primary disorder: {{primaryDisorder}}
- Compensation status: {{compensationStatus}}
- Clinical interpretation: {{clinicalInterpretation}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'phValue',
    'paco2Value',
    'hco3Value',
    'pao2Value',
    'aaGradient',
    'primaryDisorder',
    'compensationStatus',
    'clinicalInterpretation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["ABG Values"] --> B{"pH?"}
    B -->|"<7.35"| C["Acidemia"]
    B -->|"7.35-7.45"| D["Normal/Compensated"]
    B -->|">7.45"| E["Alkalemia"]
    C --> F{"PaCO2?"}
    F -->|"High"| G["Respiratory\\nAcidosis"]
    F -->|"Low/Normal"| H["Metabolic\\nAcidosis"]
    E --> I{"PaCO2?"}
    I -->|"Low"| J["Respiratory\\nAlkalosis"]
    I -->|"High/Normal"| K["Metabolic\\nAlkalosis"]
    G & H & J & K --> L["Check Compensation"]
    L --> M["Calculate A-a\\nGradient"]
    style C fill:#DC143C
    style E fill:#4169E1`,
};

/**
 * CURB-65/PSI Scoring template
 */
export const pneumoniaSeverity: DiagramTemplate = {
  id: 'pulm-pneumonia-severity',
  name: 'Pneumonia Severity Scoring',
  description: 'CURB-65 and PSI scoring systems for pneumonia',
  domain: 'medicine',
  promptTemplate: `Create a pneumonia severity scoring diagram:
- CURB-65 components: {{curb65Components}}
- CURB-65 interpretation: {{curb65Interpretation}}
- PSI components: {{psiComponents}}
- PSI risk classes: {{psiRiskClasses}}
- Disposition recommendations: {{dispositionRecs}}
- Mortality predictions: {{mortalityPredictions}}
{{#additionalNotes}}Clinical judgment factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'curb65Components',
    'curb65Interpretation',
    'psiComponents',
    'psiRiskClasses',
    'dispositionRecs',
    'mortalityPredictions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph CURB65["CURB-65 Score"]
        C["C: Confusion"]
        U["U: Urea >7 mmol/L"]
        R["R: RR ≥30"]
        B["B: BP <90/60"]
        A["65: Age ≥65"]
    end
    CURB65 --> S{"Score?"}
    S -->|"0-1"| D["Outpatient\\nMortality 1.5%"]
    S -->|"2"| E["Consider Admit\\nMortality 9%"]
    S -->|"3-5"| F["ICU Consider\\nMortality 22%"]
    style D fill:#228B22
    style E fill:#FFA500
    style F fill:#DC143C`,
};

/**
 * Ventilator Waveforms template
 */
export const ventilatorWaveforms: DiagramTemplate = {
  id: 'pulm-vent-waveforms',
  name: 'Ventilator Waveforms',
  description: 'Interpretation of ventilator pressure, flow, and volume waveforms',
  domain: 'medicine',
  promptTemplate: `Create a ventilator waveforms interpretation guide:
- Pressure waveform: {{pressureWaveform}}
- Flow waveform: {{flowWaveform}}
- Volume waveform: {{volumeWaveform}}
- Normal patterns: {{normalPatterns}}
- Abnormal patterns: {{abnormalPatterns}}
- Auto-PEEP detection: {{autoPeep}}
- Asynchrony types: {{asynchronyTypes}}
- Troubleshooting: {{troubleshooting}}
{{#additionalNotes}}Clinical correlations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'pressureWaveform',
    'flowWaveform',
    'volumeWaveform',
    'normalPatterns',
    'abnormalPatterns',
    'autoPeep',
    'asynchronyTypes',
    'troubleshooting',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Waveforms["Ventilator Waveforms"]
        P["Pressure vs Time"]
        F["Flow vs Time"]
        V["Volume vs Time"]
    end
    subgraph Findings["Key Findings"]
        F1["Peak - Plateau Gap\\n= Airway Resistance"]
        F2["Flow not reaching zero\\n= Auto-PEEP"]
        F3["Scooped flow\\n= Obstruction"]
        F4["Double triggering\\n= Asynchrony"]
    end
    P --> F1
    F --> F2 & F3
    V --> F4
    style F2 fill:#FFA500
    style F3 fill:#DC143C`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

// =============================================================================
// ADDITIONAL CLINICAL TEMPLATES (5 templates)
// =============================================================================

/**
 * Oxygen Therapy Titration template
 */
export const oxygenTherapyTitration: DiagramTemplate = {
  id: 'pulm-oxygen-titration',
  name: 'Oxygen Therapy Titration',
  description: 'Algorithm for oxygen therapy selection and titration based on clinical needs',
  domain: 'medicine',
  promptTemplate: `Create an oxygen therapy titration algorithm:
- Baseline SpO2: {{baselineSpO2}}
- Target SpO2 range: {{targetSpO2}}
- Delivery devices: {{deliveryDevices}}
- Flow rate adjustments: {{flowRates}}
- Escalation criteria: {{escalationCriteria}}
- Weaning protocol: {{weaningProtocol}}
- Special considerations (COPD): {{specialConsiderations}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'baselineSpO2',
    'targetSpO2',
    'deliveryDevices',
    'flowRates',
    'escalationCriteria',
    'weaningProtocol',
    'specialConsiderations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Hypoxemia")] --> B{"SpO2 Level?"}
    B -->|"88-92%"| C["Nasal Cannula\\n1-6 L/min"]
    B -->|"<88%"| D["Face Mask\\n6-10 L/min"]
    C --> E{"Still Hypoxic?"}
    E -->|"Yes"| D
    D --> F{"Still Hypoxic?"}
    F -->|"Yes"| G["Non-rebreather\\n15 L/min"]
    G --> H{"Still Hypoxic?"}
    H -->|"Yes"| I["High-Flow NC\\nor NIV"]
    E -->|"No"| J["Maintain + Wean"]
    style I fill:#DC143C,color:#fff
    style J fill:#228B22,color:#fff`,
};

/**
 * Thoracentesis Procedure template
 */
export const thoracentesisProcedure: DiagramTemplate = {
  id: 'pulm-thoracentesis-procedure',
  name: 'Thoracentesis Procedure',
  description: 'Step-by-step thoracentesis procedure with ultrasound guidance',
  domain: 'medicine',
  promptTemplate: `Create a thoracentesis procedure flowchart:
- Indication: {{indication}}
- Pre-procedure checklist: {{preProceChecklist}}
- Ultrasound landmarks: {{ultrasoundLandmarks}}
- Patient positioning: {{positioning}}
- Sterile technique: {{sterileTechnique}}
- Insertion technique: {{insertionTechnique}}
- Fluid analysis: {{fluidAnalysis}}
- Post-procedure care: {{postProcedure}}
{{#additionalNotes}}Complications to monitor: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'indication',
    'preProceChecklist',
    'ultrasoundLandmarks',
    'positioning',
    'sterileTechnique',
    'insertionTechnique',
    'fluidAnalysis',
    'postProcedure',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Indication:\\nEffusion/Diagnosis"] --> B["Pre-procedure"]
    B --> B1["Consent + Labs"]
    B --> B2["US: Mark site"]
    B2 --> C["Position: Upright\\nArms forward"]
    C --> D["Prep + Drape\\nLidocaine"]
    D --> E["Insert needle\\nAbove rib"]
    E --> F["Aspirate fluid"]
    F --> G{"Diagnostic\\nor Therapeutic?"}
    G -->|"Diagnostic"| H["50-100mL\\nSend labs"]
    G -->|"Therapeutic"| I["Drain max 1.5L"]
    H & I --> J["Post-CXR if symptoms"]
    style F fill:#4169E1,color:#fff
    style J fill:#228B22,color:#fff`,
};

/**
 * Sleep Apnea Management template
 */
export const sleepApneaManagement: DiagramTemplate = {
  id: 'pulm-sleep-apnea-management',
  name: 'Sleep Apnea Management',
  description: 'OSA/CSA diagnosis and treatment pathway',
  domain: 'medicine',
  promptTemplate: `Create a sleep apnea management algorithm:
- Presenting symptoms: {{symptoms}}
- Risk factors: {{riskFactors}}
- Sleep study results: {{sleepStudy}}
- AHI severity: {{ahiSeverity}}
- OSA vs CSA differentiation: {{osaCsaDiff}}
- PAP therapy options: {{papTherapy}}
- Alternative treatments: {{alternativeTx}}
- Follow-up plan: {{followUp}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'symptoms',
    'riskFactors',
    'sleepStudy',
    'ahiSeverity',
    'osaCsaDiff',
    'papTherapy',
    'alternativeTx',
    'followUp',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Suspected OSA")] --> B["STOP-BANG Score"]
    B -->|"≥3"| C["Sleep Study"]
    B -->|"<3"| D["Monitor/Rescreen"]
    C --> E{"AHI Result?"}
    E -->|"5-15\\nMild"| F["Lifestyle + Position"]
    E -->|"15-30\\nModerate"| G["CPAP Trial"]
    E -->|">30\\nSevere"| H["CPAP Required"]
    G --> I{"Tolerating?"}
    I -->|"No"| J["Dental Appliance\\nor Surgery"]
    I -->|"Yes"| K["Continue + F/U"]
    H --> K
    style H fill:#DC143C,color:#fff
    style K fill:#228B22,color:#fff`,
};

/**
 * Interstitial Lung Disease Workup template
 */
export const ildWorkup: DiagramTemplate = {
  id: 'pulm-ild-workup',
  name: 'Interstitial Lung Disease Workup',
  description: 'Systematic approach to ILD diagnosis including IPF',
  domain: 'medicine',
  promptTemplate: `Create an ILD workup algorithm:
- Clinical presentation: {{presentation}}
- Exposure history: {{exposureHistory}}
- HRCT pattern: {{hrctPattern}}
- PFT findings: {{pftFindings}}
- Serologic workup: {{serology}}
- BAL analysis: {{balAnalysis}}
- Lung biopsy indications: {{biopsyIndications}}
- Multidisciplinary discussion: {{mdd}}
{{#additionalNotes}}Treatment considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentation',
    'exposureHistory',
    'hrctPattern',
    'pftFindings',
    'serology',
    'balAnalysis',
    'biopsyIndications',
    'mdd',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("ILD Suspected")] --> B["History + Exam"]
    B --> C["HRCT Chest"]
    C --> D{"Pattern?"}
    D -->|"Definite UIP"| E["IPF Likely"]
    D -->|"Probable UIP"| F["MDD Review"]
    D -->|"Other"| G["Extended Workup"]
    G --> H["Serology\\nANA, RF, CCP"]
    G --> I["BAL"]
    H & I --> J{"Diagnosis?"}
    J -->|"No"| K["Surgical Biopsy"]
    J -->|"Yes"| L["Treat Underlying"]
    E --> M["Antifibrotic Rx"]
    style E fill:#FFA500,color:#000
    style M fill:#4169E1,color:#fff`,
};

/**
 * Ventilator Weaning Protocol template
 */
export const ventilatorWeaning: DiagramTemplate = {
  id: 'pulm-vent-weaning',
  name: 'Ventilator Weaning Protocol',
  description: 'Evidence-based approach to liberation from mechanical ventilation',
  domain: 'medicine',
  promptTemplate: `Create a ventilator weaning protocol:
- Readiness criteria: {{readinessCriteria}}
- Daily awakening trial: {{awakening}}
- Spontaneous breathing trial: {{sbtProtocol}}
- SBT duration: {{sbtDuration}}
- Success criteria: {{successCriteria}}
- Failure criteria: {{failureCriteria}}
- Extubation checklist: {{extubationChecklist}}
- Post-extubation plan: {{postExtubation}}
{{#additionalNotes}}High-risk considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'readinessCriteria',
    'awakening',
    'sbtProtocol',
    'sbtDuration',
    'successCriteria',
    'failureCriteria',
    'extubationChecklist',
    'postExtubation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Daily Screen"] --> B{"Ready?"}
    B -->|"FiO2 ≤40%\\nPEEP ≤8\\nStable"| C["SAT: Stop Sedation"]
    B -->|"No"| D["Continue Vent\\nReassess Tomorrow"]
    C --> E{"Awakens?\\nFollows?"}
    E -->|"Yes"| F["SBT: PS 5-8\\nor T-piece"]
    E -->|"No"| D
    F --> G{"Tolerates\\n30-120 min?"}
    G -->|"Yes"| H["Extubate"]
    G -->|"No"| I["Resume Vent\\nIdentify Cause"]
    H --> J["Post-extub\\nMonitor"]
    style H fill:#228B22,color:#fff
    style I fill:#FFA500,color:#000`,
};

/**
 * Ventilator Waveform Troubleshooting template
 */
export const ventilatorWaveformTroubleshooting: DiagramTemplate = {
  id: 'pulm-vent-waveform-troubleshooting',
  name: 'Ventilator Waveform Troubleshooting',
  description: 'Systematic approach to identifying and correcting ventilator waveform abnormalities',
  domain: 'medicine',
  promptTemplate: `Create a ventilator waveform troubleshooting flowchart:
- Waveform abnormality: {{waveformAbnormality}}
- Pressure waveform findings: {{pressureFindings}}
- Flow waveform findings: {{flowFindings}}
- Volume waveform findings: {{volumeFindings}}
- Asynchrony type: {{asynchronyType}}
- Patient factors: {{patientFactors}}
- Ventilator adjustments: {{ventAdjustments}}
- Clinical response: {{clinicalResponse}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'waveformAbnormality',
    'pressureFindings',
    'flowFindings',
    'volumeFindings',
    'asynchronyType',
    'patientFactors',
    'ventAdjustments',
    'clinicalResponse',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Waveform\\nAbnormality")] --> B{"Type?"}
    B -->|"High Peak\\nPressure"| C{"Pplat?"}
    C -->|"Pplat High"| D["Low Compliance\\n• ARDS\\n• Effusion\\n• Pneumothorax"]
    C -->|"Pplat Normal"| E["High Resistance\\n• Secretions\\n• Bronchospasm\\n• Kinked tube"]
    B -->|"Auto-PEEP"| F["Flow not\\nreaching zero"]
    F --> G["Increase I:E\\nBronchodilators\\nDecrease RR"]
    B -->|"Double\\nTriggering"| H["Vt too low\\nor Ti too short"]
    H --> I["Increase Vt\\nor Increase Ti"]
    B -->|"Ineffective\\nTrigger"| J["Trigger too\\ninsensitive"]
    J --> K["Increase trigger\\nsensitivity"]
    D --> L["Address cause\\nConsider prone"]
    E --> M["Suction\\nBronchodilators"]
    style D fill:#DC143C,color:#fff
    style E fill:#FFA500,color:#000
    style G fill:#4169E1,color:#fff`,
};

/**
 * ABG Mixed Acid-Base Disorders template
 */
export const abgMixedDisorders: DiagramTemplate = {
  id: 'pulm-abg-mixed-disorders',
  name: 'ABG Mixed Acid-Base Disorders',
  description: 'Systematic interpretation of complex mixed acid-base disturbances',
  domain: 'medicine',
  promptTemplate: `Create an ABG mixed disorders interpretation flowchart:
- Initial pH: {{initialPH}}
- Primary disorder: {{primaryDisorder}}
- Expected compensation: {{expectedCompensation}}
- Actual compensation: {{actualCompensation}}
- Anion gap: {{anionGap}}
- Delta-delta ratio: {{deltaDelta}}
- Secondary disorder: {{secondaryDisorder}}
- Clinical correlation: {{clinicalCorrelation}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'initialPH',
    'primaryDisorder',
    'expectedCompensation',
    'actualCompensation',
    'anionGap',
    'deltaDelta',
    'secondaryDisorder',
    'clinicalCorrelation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["ABG + BMP"] --> B{"Anion Gap?"}
    B -->|"AG >12"| C["HAGMA Present"]
    B -->|"AG Normal"| D["NAGMA or\\nNo Met Acidosis"]
    C --> E["Calculate Delta Gap\\nΔAG = AG - 12"]
    E --> F["Calculate Delta-Delta\\nΔAG / ΔHCO3"]
    F --> G{"Ratio?"}
    G -->|"<1"| H["HAGMA +\\nNAGMA"]
    G -->|"1-2"| I["Pure HAGMA"]
    G -->|">2"| J["HAGMA +\\nMet Alkalosis"]
    D --> K{"pH?"}
    K -->|"<7.35"| L["Check Urine AG"]
    K -->|">7.45"| M["Met Alkalosis"]
    L -->|"Positive"| N["RTA Type 1 or 4"]
    L -->|"Negative"| O["GI losses\\nDiarrhea"]
    subgraph Mixed["Common Mixed Disorders"]
        X1["DKA + Vomiting:\\nHAGMA + Met Alk"]
        X2["Sepsis + Renal:\\nHAGMA + NAGMA"]
        X3["COPD + Diuretic:\\nResp Acid + Met Alk"]
    end
    style H fill:#DC143C,color:#fff
    style J fill:#FFA500,color:#000
    style I fill:#228B22,color:#fff`,
};

/**
 * All pulmonology templates
 */
export const pulmonologyTemplates: DiagramTemplate[] = [
  // Clinical Decision Trees (7)
  dyspneaEvaluation,
  copdExacerbation,
  asthmaManagement,
  pulmonaryNoduleWorkup,
  pneumoniaTreatment,
  peAlgorithm,
  respiratoryFailure,
  // Anatomical Diagrams (4)
  lungZones,
  bronchialTreeAnatomy,
  alveolarUnit,
  pleuralAnatomy,
  // Procedure Illustrations (3)
  pulmonologyChestTubeInsertion,
  bronchoscopyProcedure,
  mechVentSettings,
  // Data Visualization (4)
  pftInterpretation,
  abgAnalysis,
  pneumoniaSeverity,
  ventilatorWaveforms,
  // Additional Clinical Templates (5)
  oxygenTherapyTitration,
  thoracentesisProcedure,
  sleepApneaManagement,
  ildWorkup,
  ventilatorWeaning,
  // Advanced Clinical Templates (2)
  ventilatorWaveformTroubleshooting,
  abgMixedDisorders,
];

export default pulmonologyTemplates;
