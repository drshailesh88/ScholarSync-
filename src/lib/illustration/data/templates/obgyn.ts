/**
 * obgyn.ts
 * OB-GYN diagram templates for FINNISH
 *
 * Contains comprehensive templates for obstetrics and gynecology including:
 * - Clinical decision algorithms
 * - Diagnostic flowcharts
 * - Anatomical diagrams
 * - Procedure illustrations
 * - Data visualization templates
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// CLINICAL DECISION TREES (7 templates)
// =============================================================================

/**
 * Abnormal Uterine Bleeding Evaluation Algorithm template
 */
export const aubEvaluation: DiagramTemplate = {
  id: 'obgyn-aub-evaluation',
  name: 'Abnormal Uterine Bleeding Evaluation',
  description: 'PALM-COEIN classification and workup algorithm for abnormal uterine bleeding',
  domain: 'medicine',
  promptTemplate: `Create an abnormal uterine bleeding evaluation algorithm:
- Patient age group: {{ageGroup}}
- Bleeding pattern: {{bleedingPattern}}
- PALM-COEIN classification: {{palmCoein}}
- Initial workup: {{initialWorkup}}
- Imaging studies: {{imaging}}
- Biopsy indications: {{biopsyIndications}}
- Treatment options: {{treatmentOptions}}
{{#additionalNotes}}Additional clinical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ageGroup',
    'bleedingPattern',
    'palmCoein',
    'initialWorkup',
    'imaging',
    'biopsyIndications',
    'treatmentOptions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Initial["Initial Assessment"]
        A[("AUB\\nPresentation")] --> B{"Reproductive\\nAge?"}
    end
    subgraph Workup["Workup"]
        B -->|"Yes"| C["Pregnancy Test"]
        B -->|"Postmenopausal"| D["EMB Required"]
        C -->|"Negative"| E["TSH, CBC, Coags"]
    end
    subgraph Imaging["Imaging"]
        E --> F["TVUS"]
        F --> G{"Structural\\nAbnormality?"}
    end
    subgraph PALM["PALM-COEIN"]
        G -->|"Yes"| H["Polyp/Adenomyosis/\\nLeiomyoma/Malignancy"]
        G -->|"No"| I["Coagulopathy/Ovulatory/\\nEndometrial/Iatrogenic"]
    end
    style D fill:#DC143C,color:#fff
    style H fill:#FFA500,color:#000`,
};

/**
 * Pelvic Pain Evaluation Algorithm template
 */
export const pelvicPainEvaluation: DiagramTemplate = {
  id: 'obgyn-pelvic-pain',
  name: 'Pelvic Pain Evaluation Algorithm',
  description: 'Systematic approach to acute and chronic pelvic pain evaluation',
  domain: 'medicine',
  promptTemplate: `Create a pelvic pain evaluation algorithm:
- Pain characteristics: {{painCharacteristics}}
- Acute vs chronic: {{acuteVsChronic}}
- Associated symptoms: {{associatedSymptoms}}
- Physical exam findings: {{examFindings}}
- Lab workup: {{labWorkup}}
- Imaging approach: {{imagingApproach}}
- Differential diagnosis: {{differentials}}
- Red flags: {{redFlags}}
{{#additionalNotes}}Additional clinical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'painCharacteristics',
    'acuteVsChronic',
    'associatedSymptoms',
    'examFindings',
    'labWorkup',
    'imagingApproach',
    'differentials',
    'redFlags',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Pelvic Pain")] --> B{"Acute or\\nChronic?"}
    B -->|"Acute"| C["Pregnancy Test"]
    B -->|"Chronic"| D["History + Exam"]
    C -->|"Positive"| E{"Location?"}
    E -->|"Adnexal"| F["R/O Ectopic"]
    C -->|"Negative"| G["CBC, UA, STI"]
    G --> H{"Fever?"}
    H -->|"Yes"| I["R/O PID/TOA"]
    H -->|"No"| J["TVUS"]
    J --> K{"Ovarian\\nMass?"}
    K -->|"Yes"| L["Cyst/Torsion?"]
    D --> M["Endometriosis\\nWorkup"]
    style F fill:#DC143C,color:#fff
    style I fill:#FFA500,color:#000`,
};

/**
 * Prenatal Care Schedule Algorithm template
 */
export const prenatalCareSchedule: DiagramTemplate = {
  id: 'obgyn-prenatal-care',
  name: 'Prenatal Care Schedule',
  description: 'Comprehensive prenatal visit schedule with recommended testing by trimester',
  domain: 'medicine',
  promptTemplate: `Create a prenatal care schedule flowchart:
- First trimester visits: {{firstTrimester}}
- Second trimester visits: {{secondTrimester}}
- Third trimester visits: {{thirdTrimester}}
- Routine labs: {{routineLabs}}
- Genetic screening options: {{geneticScreening}}
- Ultrasound schedule: {{ultrasoundSchedule}}
- Vaccinations: {{vaccinations}}
- High-risk modifications: {{highRiskMods}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'firstTrimester',
    'secondTrimester',
    'thirdTrimester',
    'routineLabs',
    'geneticScreening',
    'ultrasoundSchedule',
    'vaccinations',
    'highRiskMods',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph T1["First Trimester"]
        A["Initial Visit\\n8-10 weeks"] --> B["Dating US\\nGenetic Counseling"]
        B --> C["First Trimester\\nScreen 11-14wk"]
    end
    subgraph T2["Second Trimester"]
        C --> D["Anatomy Scan\\n18-22 weeks"]
        D --> E["Glucose Screen\\n24-28 weeks"]
    end
    subgraph T3["Third Trimester"]
        E --> F["GBS Culture\\n36 weeks"]
        F --> G["Weekly visits\\n36-40 weeks"]
    end
    style A fill:#228B22,color:#fff
    style D fill:#4169E1,color:#fff
    style G fill:#DC143C,color:#fff`,
};

/**
 * Labor Management Algorithm template
 */
export const laborManagement: DiagramTemplate = {
  id: 'obgyn-labor-management',
  name: 'Labor Management Algorithm',
  description: 'Intrapartum management decision tree for labor progress and interventions',
  domain: 'medicine',
  promptTemplate: `Create a labor management algorithm:
- Admission criteria: {{admissionCriteria}}
- Labor stages assessment: {{laborStages}}
- Fetal monitoring: {{fetalMonitoring}}
- Pain management options: {{painManagement}}
- Augmentation criteria: {{augmentation}}
- Arrest of labor criteria: {{arrestCriteria}}
- Delivery decisions: {{deliveryDecisions}}
{{#additionalNotes}}Special situations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'admissionCriteria',
    'laborStages',
    'fetalMonitoring',
    'painManagement',
    'augmentation',
    'arrestCriteria',
    'deliveryDecisions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Labor\\nAdmission")] --> B{"Active Labor?\\n≥6cm"}
    B -->|"No"| C["Latent Phase\\nManagement"]
    B -->|"Yes"| D["Continuous FHR"]
    D --> E{"Category I\\nTracing?"}
    E -->|"Yes"| F["Continue Labor"]
    E -->|"Cat II/III"| G["Resuscitative\\nMeasures"]
    F --> H{"Progress\\n1cm/hr?"}
    H -->|"No"| I["Augmentation"]
    H -->|"Yes"| J["2nd Stage"]
    I --> K{"Arrest\\n>4hrs?"}
    K -->|"Yes"| L["C-Section"]
    J --> M["Vaginal Delivery"]
    style L fill:#DC143C,color:#fff
    style M fill:#228B22,color:#fff`,
};

/**
 * Postpartum Hemorrhage Management Algorithm template
 */
export const pphManagement: DiagramTemplate = {
  id: 'obgyn-pph-management',
  name: 'Postpartum Hemorrhage Management',
  description: 'Stepwise management algorithm for postpartum hemorrhage',
  domain: 'medicine',
  promptTemplate: `Create a postpartum hemorrhage management algorithm:
- Definition and recognition: {{definition}}
- Initial assessment (4 Ts): {{fourTs}}
- First-line interventions: {{firstLine}}
- Uterotonic medications: {{uterotonics}}
- Second-line interventions: {{secondLine}}
- Surgical options: {{surgicalOptions}}
- Transfusion protocol: {{transfusion}}
- Massive hemorrhage protocol: {{massiveHemorrhage}}
{{#additionalNotes}}Team activation: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'definition',
    'fourTs',
    'firstLine',
    'uterotonics',
    'secondLine',
    'surgicalOptions',
    'transfusion',
    'massiveHemorrhage',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["🚨 PPH\\n>1000mL or unstable"] --> B["Call for Help\\nLarge Bore IV"]
    B --> C["4 Ts Assessment"]
    C --> D["Tone - Massage\\nOxytocin"]
    C --> E["Trauma - Repair\\nLacerations"]
    C --> F["Tissue - Remove\\nRetained Products"]
    C --> G["Thrombin - Check\\nCoags"]
    D --> H{"Bleeding\\nControlled?"}
    H -->|"No"| I["2nd Line Uterotonics\\nMethergine/Hemabate"]
    I --> J{"Controlled?"}
    J -->|"No"| K["Tamponade Balloon"]
    K --> L{"Controlled?"}
    L -->|"No"| M["OR: B-Lynch/\\nHysterectomy"]
    style A fill:#DC143C,color:#fff
    style M fill:#8B0000,color:#fff`,
};

/**
 * Cervical Cancer Screening Algorithm template
 */
export const cervicalScreening: DiagramTemplate = {
  id: 'obgyn-cervical-screening',
  name: 'Cervical Cancer Screening Algorithm',
  description: 'ASCCP-based cervical cancer screening and management guidelines',
  domain: 'medicine',
  promptTemplate: `Create a cervical cancer screening algorithm:
- Age-based screening: {{ageBasedScreening}}
- Screening tests: {{screeningTests}}
- HPV co-testing: {{hpvCotest}}
- Abnormal result management: {{abnormalManagement}}
- Colposcopy indications: {{colposcopyIndications}}
- LEEP/CKC criteria: {{leepCriteria}}
- Follow-up intervals: {{followUp}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ageBasedScreening',
    'screeningTests',
    'hpvCotest',
    'abnormalManagement',
    'colposcopyIndications',
    'leepCriteria',
    'followUp',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Cervical Screening"] --> B{"Age?"}
    B -->|"<21"| C["No Screening"]
    B -->|"21-29"| D["Cytology q3yr"]
    B -->|"30-65"| E["Cytology + HPV\\nq5yr (preferred)"]
    D --> F{"Result?"}
    F -->|"NILM"| G["Routine Screening"]
    F -->|"ASCUS"| H["HPV Reflex"]
    F -->|"LSIL/HSIL"| I["Colposcopy"]
    H -->|"HPV+"| I
    I --> J{"Biopsy?"}
    J -->|"CIN 2/3"| K["LEEP/Excision"]
    J -->|"CIN 1"| L["Surveillance"]
    style I fill:#FFA500,color:#000
    style K fill:#DC143C,color:#fff`,
};

/**
 * Menopause Management Algorithm template
 */
export const menopauseManagement: DiagramTemplate = {
  id: 'obgyn-menopause-management',
  name: 'Menopause Management Algorithm',
  description: 'Evidence-based approach to menopause symptom management and HRT decisions',
  domain: 'medicine',
  promptTemplate: `Create a menopause management algorithm:
- Symptom assessment: {{symptoms}}
- Vasomotor symptoms: {{vasomotorSymptoms}}
- Genitourinary syndrome: {{gusm}}
- HRT candidacy: {{hrtCandidacy}}
- HRT contraindications: {{hrtContraindications}}
- Non-hormonal options: {{nonHormonal}}
- Bone health: {{boneHealth}}
- Cardiovascular risk: {{cvRisk}}
{{#additionalNotes}}Individualized approach: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'symptoms',
    'vasomotorSymptoms',
    'gusm',
    'hrtCandidacy',
    'hrtContraindications',
    'nonHormonal',
    'boneHealth',
    'cvRisk',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Menopause\\nSymptoms"] --> B{"Vasomotor\\nSymptoms?"}
    B -->|"Yes"| C{"HRT\\nCandidate?"}
    B -->|"No"| D["GUSM?"]
    C -->|"Yes"| E{"<60yo or\\n<10yr postmeno?"}
    E -->|"Yes"| F["Systemic HRT"]
    E -->|"No"| G["Non-hormonal\\nOptions"]
    C -->|"Contraindications"| G
    D -->|"Yes"| H["Vaginal Estrogen"]
    G --> I["SSRIs/SNRIs\\nGabapentin\\nLifestyle"]
    F --> J["Monitor\\nAnnually"]
    style F fill:#228B22,color:#fff
    style G fill:#4169E1,color:#fff`,
};

// =============================================================================
// ANATOMICAL DIAGRAMS (4 templates)
// =============================================================================

/**
 * Female Reproductive Anatomy template
 */
export const femaleReproductiveAnatomy: DiagramTemplate = {
  id: 'obgyn-female-anatomy',
  name: 'Female Reproductive Anatomy',
  description: 'Comprehensive labeled diagram of female reproductive system',
  domain: 'medicine',
  promptTemplate: `Create a female reproductive anatomy diagram showing:
- External genitalia: {{externalGenitalia}}
- Internal organs: {{internalOrgans}}
- Uterine structures: {{uterineStructures}}
- Ovarian structures: {{ovarianStructures}}
- Supporting ligaments: {{ligaments}}
- Blood supply: {{bloodSupply}}
- Nerve supply: {{nerveSupply}}
{{#additionalNotes}}Additional structures: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'externalGenitalia',
    'internalOrgans',
    'uterineStructures',
    'ovarianStructures',
    'ligaments',
    'bloodSupply',
    'nerveSupply',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph External["External Genitalia"]
        V["Vulva"] --> VE["Vestibule"]
        V --> LM["Labia Majora"]
        V --> Lm["Labia Minora"]
        V --> CL["Clitoris"]
    end
    subgraph Internal["Internal Organs"]
        VAG["Vagina"] --> CX["Cervix"]
        CX --> UT["Uterus"]
        UT --> FT["Fallopian Tubes"]
        FT --> OV["Ovaries"]
    end
    subgraph Support["Ligaments"]
        BL["Broad Ligament"]
        RL["Round Ligament"]
        USL["Uterosacral"]
    end
    style UT fill:#FFB6C1
    style OV fill:#DDA0DD`,
};

/**
 * Fetal Development template
 */
export const fetalDevelopment: DiagramTemplate = {
  id: 'obgyn-fetal-development',
  name: 'Fetal Development Timeline',
  description: 'Gestational development milestones from conception to term',
  domain: 'medicine',
  promptTemplate: `Create a fetal development timeline diagram:
- Embryonic period: {{embryonicPeriod}}
- First trimester milestones: {{firstTrimester}}
- Second trimester milestones: {{secondTrimester}}
- Third trimester milestones: {{thirdTrimester}}
- Organ development: {{organDevelopment}}
- Viability thresholds: {{viability}}
- Size by gestational age: {{sizeByGA}}
{{#additionalNotes}}Clinical correlations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'embryonicPeriod',
    'firstTrimester',
    'secondTrimester',
    'thirdTrimester',
    'organDevelopment',
    'viability',
    'sizeByGA',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph E["Embryonic Period"]
        W4["Week 4\\nNeural Tube"]
        W8["Week 8\\nAll Organs\\nFormed"]
    end
    subgraph T1["1st Trimester"]
        W12["Week 12\\n6cm CRL\\nFHR Doppler"]
    end
    subgraph T2["2nd Trimester"]
        W20["Week 20\\nAnatomy Scan\\nQuickening"]
        W24["Week 24\\nViability\\n500g"]
    end
    subgraph T3["3rd Trimester"]
        W32["Week 32\\n1800g\\nSurfactant"]
        W40["Week 40\\nTerm\\n3400g"]
    end
    W4 --> W8 --> W12 --> W20 --> W24 --> W32 --> W40
    style W24 fill:#FFA500
    style W40 fill:#228B22`,
};

/**
 * Stages of Labor template
 */
export const stagesOfLabor: DiagramTemplate = {
  id: 'obgyn-stages-labor',
  name: 'Stages of Labor Diagram',
  description: 'Visual representation of the three stages of labor with phases',
  domain: 'medicine',
  promptTemplate: `Create a stages of labor diagram showing:
- First stage latent phase: {{latentPhase}}
- First stage active phase: {{activePhase}}
- Transition: {{transition}}
- Second stage: {{secondStage}}
- Third stage: {{thirdStage}}
- Cervical changes: {{cervicalChanges}}
- Duration expectations: {{durations}}
{{#additionalNotes}}Interventions at each stage: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'latentPhase',
    'activePhase',
    'transition',
    'secondStage',
    'thirdStage',
    'cervicalChanges',
    'durations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph S1["Stage 1: Dilation"]
        L["Latent Phase\\n0-6cm\\nIrregular ctx"]
        A["Active Phase\\n6-10cm\\nRegular ctx"]
        T["Transition\\n8-10cm\\nIntense"]
    end
    subgraph S2["Stage 2: Pushing"]
        P["Full Dilation\\nto Delivery"]
        CR["Crowning"]
        DEL["Delivery of\\nBaby"]
    end
    subgraph S3["Stage 3: Placenta"]
        PL["Placental\\nSeparation"]
        EXP["Expulsion\\n5-30 min"]
    end
    L --> A --> T --> P --> CR --> DEL --> PL --> EXP
    style DEL fill:#228B22,color:#fff
    style EXP fill:#DC143C,color:#fff`,
};

/**
 * Menstrual Cycle Diagram template
 */
export const menstrualCycleDiagram: DiagramTemplate = {
  id: 'obgyn-menstrual-cycle',
  name: 'Menstrual Cycle Diagram',
  description: 'Hormonal and physiological changes throughout the menstrual cycle',
  domain: 'medicine',
  promptTemplate: `Create a menstrual cycle diagram showing:
- Follicular phase: {{follicularPhase}}
- Ovulation: {{ovulation}}
- Luteal phase: {{lutealPhase}}
- Hormone levels (FSH, LH, E2, P4): {{hormones}}
- Endometrial changes: {{endometrialChanges}}
- Ovarian changes: {{ovarianChanges}}
- Cycle timing: {{timing}}
{{#additionalNotes}}Clinical correlations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'follicularPhase',
    'ovulation',
    'lutealPhase',
    'hormones',
    'endometrialChanges',
    'ovarianChanges',
    'timing',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Ovarian["Ovarian Cycle"]
        FP["Follicular Phase\\nDays 1-14"] --> OV["Ovulation\\nDay 14"]
        OV --> LP["Luteal Phase\\nDays 14-28"]
    end
    subgraph Hormones["Hormone Changes"]
        FSH["FSH Rise"] --> E2["Estrogen Peak"]
        E2 --> LH["LH Surge"]
        LH --> P4["Progesterone\\nDominance"]
    end
    subgraph Uterine["Endometrial Cycle"]
        M["Menses\\nDays 1-5"]
        PR["Proliferative\\nDays 5-14"]
        SE["Secretory\\nDays 14-28"]
    end
    FP --> FSH
    OV --> LH
    LP --> P4
    M --> PR --> SE --> M
    style OV fill:#FFD700
    style LH fill:#FF69B4`,
};

// =============================================================================
// PROCEDURE ILLUSTRATIONS (4 templates)
// =============================================================================

/**
 * Cesarean Section Procedure template
 */
export const cesareanProcedure: DiagramTemplate = {
  id: 'obgyn-cesarean-procedure',
  name: 'Cesarean Section Procedure',
  description: 'Step-by-step illustration of cesarean section technique',
  domain: 'medicine',
  promptTemplate: `Create a cesarean section procedure flowchart:
- Indications: {{indications}}
- Anesthesia: {{anesthesia}}
- Patient positioning: {{positioning}}
- Incision types: {{incisionTypes}}
- Uterine entry technique: {{uterineEntry}}
- Delivery steps: {{deliverySteps}}
- Closure technique: {{closure}}
- Complications to monitor: {{complications}}
{{#additionalNotes}}Special techniques: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'indications',
    'anesthesia',
    'positioning',
    'incisionTypes',
    'uterineEntry',
    'deliverySteps',
    'closure',
    'complications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Prep + Anesthesia"] --> B["Pfannenstiel\\nIncision"]
    B --> C["Fascia Division"]
    C --> D["Rectus Separation"]
    D --> E["Peritoneum Entry"]
    E --> F["Bladder Flap"]
    F --> G["Low Transverse\\nHysterotomy"]
    G --> H["Deliver Baby"]
    H --> I["Deliver Placenta"]
    I --> J["Uterine Closure\\n2-layer"]
    J --> K["Layer-by-layer\\nClosure"]
    style H fill:#228B22,color:#fff
    style G fill:#DC143C,color:#fff`,
};

/**
 * Hysterectomy Procedure template
 */
export const hysterectomyProcedure: DiagramTemplate = {
  id: 'obgyn-hysterectomy',
  name: 'Hysterectomy Procedure Steps',
  description: 'Types and surgical steps for hysterectomy procedures',
  domain: 'medicine',
  promptTemplate: `Create a hysterectomy procedure flowchart:
- Indications: {{indications}}
- Type selection: {{typeSelection}}
- Approach (vaginal/abdominal/laparoscopic): {{approach}}
- Surgical steps: {{surgicalSteps}}
- Pedicle management: {{pedicles}}
- Vaginal cuff: {{vaginalCuff}}
- Specimen removal: {{specimenRemoval}}
- Post-op considerations: {{postOp}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'indications',
    'typeSelection',
    'approach',
    'surgicalSteps',
    'pedicles',
    'vaginalCuff',
    'specimenRemoval',
    'postOp',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Indication\\nAssessment"] --> B{"Approach?"}
    B -->|"Vaginal"| C["VH"]
    B -->|"Laparoscopic"| D["TLH/LAVH"]
    B -->|"Abdominal"| E["TAH"]
    C & D & E --> F["Round Ligament"]
    F --> G["Adnexal Pedicles"]
    G --> H["Uterine Arteries"]
    H --> I["Cardinal/Uterosacral"]
    I --> J["Vaginal Cuff"]
    J --> K["Cuff Closure"]
    K --> L["Hemostasis Check"]
    style K fill:#228B22,color:#fff`,
};

/**
 * Colposcopy Procedure template
 */
export const colposcopyProcedure: DiagramTemplate = {
  id: 'obgyn-colposcopy',
  name: 'Colposcopy Procedure',
  description: 'Step-by-step colposcopy examination and biopsy technique',
  domain: 'medicine',
  promptTemplate: `Create a colposcopy procedure flowchart:
- Indications: {{indications}}
- Patient preparation: {{preparation}}
- Initial visualization: {{visualization}}
- Acetic acid application: {{aceticAcid}}
- Lesion identification: {{lesionIdentification}}
- Biopsy technique: {{biopsyTechnique}}
- ECC indications: {{eccIndications}}
- Documentation: {{documentation}}
{{#additionalNotes}}Follow-up planning: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'indications',
    'preparation',
    'visualization',
    'aceticAcid',
    'lesionIdentification',
    'biopsyTechnique',
    'eccIndications',
    'documentation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Position Patient\\nSpeculum Insertion"] --> B["Visualize Cervix\\nSaline Wash"]
    B --> C["Apply 3-5%\\nAcetic Acid"]
    C --> D{"Acetowhite\\nChanges?"}
    D -->|"Yes"| E["Identify TZ\\nand Lesion"]
    D -->|"No"| F["Apply Lugol's\\nIodine"]
    E --> G["Assess Borders\\nVessels, Contour"]
    G --> H["Biopsy at\\n12, 3, 6, 9 o'clock"]
    H --> I{"SCJ\\nVisible?"}
    I -->|"No"| J["ECC Required"]
    I -->|"Yes"| K["Document\\nFindings"]
    J --> K
    style H fill:#DC143C,color:#fff
    style J fill:#FFA500,color:#000`,
};

/**
 * IUD Insertion Procedure template
 */
export const iudInsertion: DiagramTemplate = {
  id: 'obgyn-iud-insertion',
  name: 'IUD Insertion Procedure',
  description: 'Step-by-step IUD insertion technique with safety checkpoints',
  domain: 'medicine',
  promptTemplate: `Create an IUD insertion procedure flowchart:
- Pre-insertion counseling: {{counseling}}
- Contraindications: {{contraindications}}
- Required equipment: {{equipment}}
- Uterine sounding: {{sounding}}
- Insertion technique: {{insertionTechnique}}
- String trimming: {{stringTrimming}}
- Post-insertion care: {{postCare}}
- Follow-up schedule: {{followUp}}
{{#additionalNotes}}Troubleshooting: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'counseling',
    'contraindications',
    'equipment',
    'sounding',
    'insertionTechnique',
    'stringTrimming',
    'postCare',
    'followUp',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Counseling\\n+ Consent"] --> B["R/O Pregnancy\\nR/O Infection"]
    B --> C["Speculum\\nVisualize Cervix"]
    C --> D["Tenaculum\\nAnterior Lip"]
    D --> E["Sound Uterus\\n6-9cm"]
    E --> F{"Sound\\nDepth OK?"}
    F -->|"<6cm"| G["Consider\\nAlternative"]
    F -->|"6-9cm"| H["Load IUD\\nin Inserter"]
    H --> I["Insert to\\nFundus"]
    I --> J["Deploy Arms\\nWithdraw Inserter"]
    J --> K["Trim Strings\\n3-4cm"]
    K --> L["Confirm\\nPlacement"]
    style J fill:#228B22,color:#fff
    style G fill:#FFA500,color:#000`,
};

// =============================================================================
// DATA VISUALIZATION (3 templates)
// =============================================================================

/**
 * Bishop Score template
 */
export const bishopScore: DiagramTemplate = {
  id: 'obgyn-bishop-score',
  name: 'Bishop Score Assessment',
  description: 'Bishop score calculation for cervical ripeness and induction favorability',
  domain: 'medicine',
  promptTemplate: `Create a Bishop score assessment template:
- Cervical dilation: {{dilation}}
- Cervical effacement: {{effacement}}
- Fetal station: {{station}}
- Cervical consistency: {{consistency}}
- Cervical position: {{position}}
- Score interpretation: {{interpretation}}
- Induction recommendations: {{recommendations}}
{{#additionalNotes}}Clinical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'dilation',
    'effacement',
    'station',
    'consistency',
    'position',
    'interpretation',
    'recommendations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Score["Bishop Score Components"]
        A["Dilation\\n0-3 points"]
        B["Effacement\\n0-3 points"]
        C["Station\\n0-3 points"]
        D["Consistency\\n0-2 points"]
        E["Position\\n0-2 points"]
    end
    subgraph Interp["Interpretation"]
        F{"Total\\nScore?"}
        F -->|"≤5"| G["Unfavorable\\nRipen First"]
        F -->|"6-7"| H["Intermediate"]
        F -->|"≥8"| I["Favorable\\nInduce"]
    end
    A & B & C & D & E --> F
    style G fill:#DC143C,color:#fff
    style I fill:#228B22,color:#fff`,
};

/**
 * Prenatal Testing Timeline template
 */
export const prenatalTestingTimeline: DiagramTemplate = {
  id: 'obgyn-prenatal-testing',
  name: 'Prenatal Testing Timeline',
  description: 'Comprehensive timeline of recommended prenatal screening and diagnostic tests',
  domain: 'medicine',
  promptTemplate: `Create a prenatal testing timeline:
- First trimester screening: {{firstTrimesterScreen}}
- cfDNA/NIPT: {{cfDNA}}
- Second trimester screening: {{secondTrimesterScreen}}
- Diagnostic testing options: {{diagnosticTests}}
- Carrier screening: {{carrierScreening}}
- Ultrasound schedule: {{ultrasoundSchedule}}
- Third trimester testing: {{thirdTrimesterTests}}
{{#additionalNotes}}High-risk modifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'firstTrimesterScreen',
    'cfDNA',
    'secondTrimesterScreen',
    'diagnosticTests',
    'carrierScreening',
    'ultrasoundSchedule',
    'thirdTrimesterTests',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph W10["10-14 weeks"]
        A["First Trimester\\nScreen"]
        B["cfDNA/NIPT"]
        C["CVS if indicated"]
    end
    subgraph W15["15-20 weeks"]
        D["Quad Screen\\n(if no FTS)"]
        E["Amniocentesis\\nif indicated"]
    end
    subgraph W18["18-22 weeks"]
        F["Anatomy\\nUltrasound"]
    end
    subgraph W24["24-28 weeks"]
        G["Glucose\\nChallenge"]
        H["Rh Antibody\\nScreen"]
    end
    subgraph W36["35-37 weeks"]
        I["GBS Culture"]
    end
    A --> D --> F --> G --> I
    B --> E
    style B fill:#4169E1,color:#fff
    style F fill:#228B22,color:#fff`,
};

/**
 * Contraceptive Effectiveness Chart template
 */
export const contraceptiveEffectiveness: DiagramTemplate = {
  id: 'obgyn-contraceptive-effectiveness',
  name: 'Contraceptive Effectiveness Chart',
  description: 'Visual comparison of contraceptive method effectiveness rates',
  domain: 'medicine',
  promptTemplate: `Create a contraceptive effectiveness chart:
- Most effective methods: {{mostEffective}}
- Highly effective methods: {{highlyEffective}}
- Moderately effective methods: {{moderatelyEffective}}
- Less effective methods: {{lessEffective}}
- Perfect use rates: {{perfectUse}}
- Typical use rates: {{typicalUse}}
- LARC options: {{larc}}
{{#additionalNotes}}Counseling points: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'mostEffective',
    'highlyEffective',
    'moderatelyEffective',
    'lessEffective',
    'perfectUse',
    'typicalUse',
    'larc',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Tier1["Most Effective <1%"]
        A["Implant\\n0.05%"]
        B["IUD\\n0.2-0.8%"]
        C["Sterilization\\n0.5%"]
    end
    subgraph Tier2["Very Effective 4-7%"]
        D["Injectable\\n6%"]
        E["Pill/Patch/Ring\\n9%"]
    end
    subgraph Tier3["Moderately Effective 12-24%"]
        F["Condom\\n18%"]
        G["Diaphragm\\n12%"]
        H["Withdrawal\\n22%"]
    end
    subgraph Tier4["Less Effective >24%"]
        I["Spermicide\\n28%"]
        J["Fertility\\nAwareness 24%"]
    end
    style A fill:#228B22,color:#fff
    style B fill:#228B22,color:#fff
    style I fill:#DC143C,color:#fff`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All OB-GYN templates
 */
export const obgynTemplates: DiagramTemplate[] = [
  // Clinical Decision Trees (7)
  aubEvaluation,
  pelvicPainEvaluation,
  prenatalCareSchedule,
  laborManagement,
  pphManagement,
  cervicalScreening,
  menopauseManagement,
  // Anatomical Diagrams (4)
  femaleReproductiveAnatomy,
  fetalDevelopment,
  stagesOfLabor,
  menstrualCycleDiagram,
  // Procedure Illustrations (4)
  cesareanProcedure,
  hysterectomyProcedure,
  colposcopyProcedure,
  iudInsertion,
  // Data Visualization (3)
  bishopScore,
  prenatalTestingTimeline,
  contraceptiveEffectiveness,
];

export default obgynTemplates;
