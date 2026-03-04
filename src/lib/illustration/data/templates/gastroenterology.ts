/**
 * gastroenterology.ts
 * Gastroenterology diagram templates for FINNISH
 *
 * Contains comprehensive templates for gastrointestinal medicine including:
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
 * GI Bleeding Algorithm template
 */
export const giBleedingAlgorithm: DiagramTemplate = {
  id: 'gi-bleeding-algorithm',
  name: 'GI Bleeding Algorithm',
  description: 'Upper and lower GI bleeding evaluation and management algorithm',
  domain: 'medicine',
  promptTemplate: `Create a GI bleeding evaluation algorithm flowchart:
- Bleeding presentation: {{presentation}}
- Hemodynamic status: {{hemodynamicStatus}}
- Upper vs Lower GI signs: {{bleedingLocation}}
- Risk stratification score: {{riskScore}}
- Resuscitation steps: {{resuscitation}}
- Endoscopy timing: {{endoscopyTiming}}
- Intervention options: {{interventionOptions}}
- Transfusion thresholds: {{transfusionThresholds}}
{{#additionalNotes}}Additional clinical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentation',
    'hemodynamicStatus',
    'bleedingLocation',
    'riskScore',
    'resuscitation',
    'endoscopyTiming',
    'interventionOptions',
    'transfusionThresholds',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("GI Bleeding")] --> B{"Hemodynamically\\nStable?"}
    B -->|"No"| C["Resuscitate"]
    C --> D["Large bore IV x2"]
    C --> E["Type & Cross"]
    B -->|"Yes"| F{"Upper or\\nLower?"}
    F -->|"Hematemesis/Melena"| G["UGIB"]
    F -->|"Hematochezia"| H["LGIB"]
    G --> I["EGD within 24h"]
    H --> J["Colonoscopy"]
    I --> K{"Active\\nBleeding?"}
    K -->|"Yes"| L["Endoscopic Rx"]
    K -->|"No"| M["PPI + Monitor"]
    style C fill:#DC143C,color:#fff
    style L fill:#FFA500,color:#000`,
};

/**
 * Dysphagia Evaluation Algorithm template
 */
export const dysphagiaEvaluation: DiagramTemplate = {
  id: 'gi-dysphagia-evaluation',
  name: 'Dysphagia Evaluation Algorithm',
  description: 'Systematic approach to evaluating dysphagia - oropharyngeal vs esophageal',
  domain: 'medicine',
  promptTemplate: `Create a dysphagia evaluation algorithm:
- Symptom characteristics: {{symptoms}}
- Oropharyngeal vs Esophageal: {{dysphagiaType}}
- Solids vs Liquids: {{foodType}}
- Alarm features: {{alarmFeatures}}
- Initial workup: {{initialWorkup}}
- Imaging studies: {{imaging}}
- Endoscopic findings: {{endoscopicFindings}}
- Treatment approach: {{treatment}}
{{#additionalNotes}}Additional considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'symptoms',
    'dysphagiaType',
    'foodType',
    'alarmFeatures',
    'initialWorkup',
    'imaging',
    'endoscopicFindings',
    'treatment',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Dysphagia")] --> B{"Difficulty\\nInitiating?"}
    B -->|"Yes"| C["Oropharyngeal"]
    B -->|"No"| D["Esophageal"]
    C --> E["Video Swallow Study"]
    D --> F{"Solids Only?"}
    F -->|"Yes"| G["Mechanical\\nObstruction"]
    F -->|"Both"| H["Motility\\nDisorder"]
    G --> I["EGD + Biopsy"]
    H --> J["Manometry"]
    I --> K{"Stricture?\\nMass?"}
    K -->|"Stricture"| L["Dilation"]
    K -->|"Mass"| M["Biopsy + Stage"]
    style M fill:#DC143C,color:#fff`,
};

/**
 * Abnormal LFTs Workup template
 */
export const abnormalLFTsWorkup: DiagramTemplate = {
  id: 'gi-abnormal-lfts',
  name: 'Abnormal LFTs Workup',
  description: 'Systematic evaluation of elevated liver function tests',
  domain: 'medicine',
  promptTemplate: `Create an abnormal LFTs evaluation algorithm:
- Pattern of elevation: {{elevationPattern}}
- Hepatocellular vs Cholestatic: {{pattern}}
- Degree of elevation: {{severity}}
- Acute vs Chronic: {{timeline}}
- Initial workup: {{initialWorkup}}
- Imaging findings: {{imaging}}
- Serologic testing: {{serology}}
- Biopsy indications: {{biopsyIndications}}
{{#additionalNotes}}Risk factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'elevationPattern',
    'pattern',
    'severity',
    'timeline',
    'initialWorkup',
    'imaging',
    'serology',
    'biopsyIndications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Abnormal LFTs")] --> B{"Pattern?"}
    B -->|"AST/ALT > ALP"| C["Hepatocellular"]
    B -->|"ALP > AST/ALT"| D["Cholestatic"]
    C --> E{"Degree?"}
    E -->|">1000"| F["Acute: Viral, Drug, Ischemic"]
    E -->|"<1000"| G["Chronic Workup"]
    G --> H["Viral Serologies"]
    G --> I["Autoimmune Panel"]
    G --> J["Iron/Ceruloplasmin"]
    D --> K["RUQ Ultrasound"]
    K -->|"Dilated Ducts"| L["MRCP"]
    K -->|"Normal"| M["AMA, Drug Review"]
    style F fill:#DC143C,color:#fff`,
};

/**
 * Acute Abdominal Pain Algorithm template
 */
export const acuteAbdominalPain: DiagramTemplate = {
  id: 'gi-acute-abdominal-pain',
  name: 'Acute Abdominal Pain Algorithm',
  description: 'Systematic approach to acute abdominal pain evaluation',
  domain: 'medicine',
  promptTemplate: `Create an acute abdominal pain evaluation flowchart:
- Pain location: {{painLocation}}
- Pain characteristics: {{painCharacteristics}}
- Associated symptoms: {{associatedSymptoms}}
- Vital signs: {{vitalSigns}}
- Physical exam findings: {{physicalExam}}
- Laboratory workup: {{labs}}
- Imaging modality: {{imaging}}
- Surgical vs Medical: {{management}}
{{#additionalNotes}}Red flags: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'painLocation',
    'painCharacteristics',
    'associatedSymptoms',
    'vitalSigns',
    'physicalExam',
    'labs',
    'imaging',
    'management',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Acute Abdominal\\nPain")] --> B{"Peritoneal\\nSigns?"}
    B -->|"Yes"| C["Surgical Consult"]
    B -->|"No"| D{"Location?"}
    D -->|"RUQ"| E["US: Cholecystitis?"]
    D -->|"RLQ"| F["CT: Appendicitis?"]
    D -->|"LLQ"| G["CT: Diverticulitis?"]
    D -->|"Epigastric"| H["Lipase: Pancreatitis?"]
    E -->|"+"| I["Cholecystectomy"]
    F -->|"+"| J["Appendectomy"]
    H -->|"Elevated"| K["NPO, IVF, Pain Control"]
    style C fill:#DC143C,color:#fff
    style I fill:#FFA500,color:#000`,
};

/**
 * Diarrhea Evaluation Algorithm template
 */
export const diarrheaEvaluation: DiagramTemplate = {
  id: 'gi-diarrhea-evaluation',
  name: 'Diarrhea Evaluation Algorithm',
  description: 'Systematic evaluation of acute and chronic diarrhea',
  domain: 'medicine',
  promptTemplate: `Create a diarrhea evaluation algorithm:
- Duration: {{duration}}
- Acute vs Chronic: {{timeline}}
- Bloody vs Non-bloody: {{characteristics}}
- Associated symptoms: {{associatedSymptoms}}
- Travel/Food history: {{exposureHistory}}
- Stool studies: {{stoolStudies}}
- Endoscopic evaluation: {{endoscopy}}
- Treatment approach: {{treatment}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'duration',
    'timeline',
    'characteristics',
    'associatedSymptoms',
    'exposureHistory',
    'stoolStudies',
    'endoscopy',
    'treatment',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Diarrhea")] --> B{"Duration?"}
    B -->|"<4 weeks"| C["Acute"]
    B -->|">4 weeks"| D["Chronic"]
    C --> E{"Bloody?"}
    E -->|"Yes"| F["Stool Cx, C. diff"]
    E -->|"No"| G["Supportive Care"]
    D --> H{"Watery vs\\nFatty?"}
    H -->|"Watery"| I["Secretory vs Osmotic"]
    H -->|"Fatty"| J["Malabsorption"]
    I --> K["Colonoscopy + Bx"]
    J --> L["Celiac Panel, SIBO Test"]
    F -->|"C. diff +"| M["Vancomycin PO"]
    style M fill:#228B22,color:#fff`,
};

/**
 * Cirrhosis Management Algorithm template
 */
export const cirrhosisManagement: DiagramTemplate = {
  id: 'gi-cirrhosis-management',
  name: 'Cirrhosis Management Algorithm',
  description: 'Comprehensive cirrhosis management including complications',
  domain: 'medicine',
  promptTemplate: `Create a cirrhosis management algorithm:
- Etiology: {{etiology}}
- Child-Pugh class: {{childPughClass}}
- MELD score: {{meldScore}}
- Complications present: {{complications}}
- Ascites management: {{ascitesManagement}}
- Variceal screening: {{variceScreening}}
- HCC surveillance: {{hccSurveillance}}
- Transplant evaluation: {{transplantEval}}
{{#additionalNotes}}Additional considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'etiology',
    'childPughClass',
    'meldScore',
    'complications',
    'ascitesManagement',
    'variceScreening',
    'hccSurveillance',
    'transplantEval',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Cirrhosis\\nDiagnosed")] --> B["Determine Etiology"]
    A --> C["Calculate MELD"]
    A --> D["Screen Complications"]
    D --> E["EGD for Varices"]
    D --> F["US q6mo for HCC"]
    D --> G["Assess Ascites"]
    E -->|"Large Varices"| H["NSBB or Banding"]
    G -->|"Present"| I["Diuretics"]
    G -->|"Refractory"| J["TIPS Evaluation"]
    C -->|"MELD ≥15"| K["Transplant Referral"]
    style K fill:#4169E1,color:#fff
    style J fill:#FFA500,color:#000`,
};

/**
 * IBD Treatment Algorithm template
 */
export const ibdTreatment: DiagramTemplate = {
  id: 'gi-ibd-treatment',
  name: 'IBD Treatment Algorithm',
  description: "Treatment algorithm for Crohn's disease and ulcerative colitis",
  domain: 'medicine',
  promptTemplate: `Create an IBD treatment algorithm:
- Disease type: {{diseaseType}}
- Disease severity: {{severity}}
- Disease location: {{location}}
- Current medications: {{currentMedications}}
- Induction therapy: {{inductionTherapy}}
- Maintenance therapy: {{maintenanceTherapy}}
- Biologic options: {{biologics}}
- Surgical indications: {{surgicalIndications}}
{{#additionalNotes}}Monitoring requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'diseaseType',
    'severity',
    'location',
    'currentMedications',
    'inductionTherapy',
    'maintenanceTherapy',
    'biologics',
    'surgicalIndications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("IBD Diagnosed")] --> B{"Crohn's or\\nUC?"}
    B -->|"UC"| C{"Severity?"}
    B -->|"Crohn's"| D{"Location?"}
    C -->|"Mild"| E["5-ASA"]
    C -->|"Moderate"| F["Steroids → Biologic"]
    C -->|"Severe"| G["IV Steroids/Biologic"]
    D -->|"Ileal"| H["Budesonide or Biologic"]
    D -->|"Colonic"| I["5-ASA or Biologic"]
    D -->|"Perianal"| J["Anti-TNF + Abx"]
    F --> K["Maintenance: Anti-TNF\\nor Vedolizumab"]
    G -->|"No Response"| L["Colectomy"]
    style L fill:#DC143C,color:#fff
    style K fill:#228B22,color:#fff`,
};

// =============================================================================
// ANATOMICAL DIAGRAMS (4 templates)
// =============================================================================

/**
 * GI Tract Overview template
 */
export const giTractOverview: DiagramTemplate = {
  id: 'gi-tract-overview',
  name: 'GI Tract Overview',
  description: 'Complete gastrointestinal tract anatomy from mouth to anus',
  domain: 'medicine',
  promptTemplate: `Create a GI tract overview diagram:
- Upper GI structures: {{upperGI}}
- Small intestine segments: {{smallIntestine}}
- Large intestine segments: {{largeIntestine}}
- Sphincters: {{sphincters}}
- Transit times: {{transitTimes}}
- Key functions: {{functions}}
- Blood supply: {{bloodSupply}}
{{#additionalNotes}}Clinical correlations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'upperGI',
    'smallIntestine',
    'largeIntestine',
    'sphincters',
    'transitTimes',
    'functions',
    'bloodSupply',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Upper["Upper GI"]
        A["Mouth"] --> B["Esophagus"]
        B -->|"LES"| C["Stomach"]
    end
    subgraph Small["Small Intestine"]
        C -->|"Pylorus"| D["Duodenum"]
        D --> E["Jejunum"]
        E --> F["Ileum"]
    end
    subgraph Large["Large Intestine"]
        F -->|"ICV"| G["Cecum"]
        G --> H["Ascending"]
        H --> I["Transverse"]
        I --> J["Descending"]
        J --> K["Sigmoid"]
        K --> L["Rectum"]
    end
    style C fill:#FFA500
    style D fill:#90EE90`,
};

/**
 * Hepatobiliary System template
 */
export const hepatobiliarySystem: DiagramTemplate = {
  id: 'gi-hepatobiliary-system',
  name: 'Hepatobiliary System',
  description: 'Liver, gallbladder, and biliary tree anatomy',
  domain: 'medicine',
  promptTemplate: `Create a hepatobiliary system diagram:
- Liver segments: {{liverSegments}}
- Biliary tree: {{biliaryTree}}
- Gallbladder anatomy: {{gallbladder}}
- Pancreatic duct: {{pancreaticDuct}}
- Ampulla of Vater: {{ampulla}}
- Vascular supply: {{vascularSupply}}
- Bile flow direction: {{bileFlow}}
{{#additionalNotes}}Surgical anatomy notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'liverSegments',
    'biliaryTree',
    'gallbladder',
    'pancreaticDuct',
    'ampulla',
    'vascularSupply',
    'bileFlow',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Liver["Liver"]
        L1["Left Lobe"]
        L2["Right Lobe"]
        L1 --> LHD["L Hepatic Duct"]
        L2 --> RHD["R Hepatic Duct"]
    end
    subgraph Biliary["Biliary Tree"]
        LHD & RHD --> CHD["Common Hepatic Duct"]
        GB["Gallbladder"] --> CD["Cystic Duct"]
        CHD & CD --> CBD["Common Bile Duct"]
    end
    subgraph Pancreas["Pancreas"]
        PD["Pancreatic Duct"]
    end
    CBD & PD --> AMP["Ampulla of Vater"]
    AMP --> DUO["Duodenum"]
    style GB fill:#90EE90
    style CBD fill:#FFD700`,
};

/**
 * Portal Circulation template
 */
export const portalCirculation: DiagramTemplate = {
  id: 'gi-portal-circulation',
  name: 'Portal Circulation',
  description: 'Portal venous system and portosystemic collaterals',
  domain: 'medicine',
  promptTemplate: `Create a portal circulation diagram:
- Portal vein tributaries: {{portalTributaries}}
- Hepatic vein drainage: {{hepaticVeins}}
- Normal pressures: {{normalPressures}}
- Portosystemic collaterals: {{collaterals}}
- Varices locations: {{varicesLocations}}
- TIPS anatomy: {{tipsAnatomy}}
{{#additionalNotes}}Portal hypertension pathophysiology: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'portalTributaries',
    'hepaticVeins',
    'normalPressures',
    'collaterals',
    'varicesLocations',
    'tipsAnatomy',
    'additionalNotes',
  ],
  mermaidExample: `flowchart BT
    subgraph Visceral["Visceral Drainage"]
        SMV["SMV"]
        SV["Splenic V"]
        IMV["IMV"]
    end
    SMV & SV --> PV["Portal Vein"]
    IMV --> SV
    PV --> LIVER["Liver Sinusoids"]
    LIVER --> HV["Hepatic Veins"]
    HV --> IVC["IVC"]
    subgraph Collaterals["Collaterals in PHT"]
        EV["Esophageal Varices"]
        RV["Rectal Varices"]
        CM["Caput Medusae"]
    end
    style PV fill:#4169E1
    style EV fill:#DC143C`,
};

/**
 * Colon Anatomy template
 */
export const colonAnatomy: DiagramTemplate = {
  id: 'gi-colon-anatomy',
  name: 'Colon Anatomy',
  description: 'Detailed colon anatomy with segments and blood supply',
  domain: 'medicine',
  promptTemplate: `Create a colon anatomy diagram:
- Colon segments: {{colonSegments}}
- Flexures: {{flexures}}
- Arterial supply: {{arterialSupply}}
- Venous drainage: {{venousDrainage}}
- Lymphatic drainage: {{lymphatics}}
- Watershed areas: {{watershedAreas}}
- Appendix location: {{appendix}}
{{#additionalNotes}}Surgical landmarks: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'colonSegments',
    'flexures',
    'arterialSupply',
    'venousDrainage',
    'lymphatics',
    'watershedAreas',
    'appendix',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph RightColon["Right Colon - SMA"]
        CEC["Cecum"] --> ASC["Ascending"]
        ASC --> HF["Hepatic Flexure"]
    end
    subgraph TransverseC["Transverse"]
        HF --> TC["Transverse Colon"]
        TC --> SF["Splenic Flexure"]
    end
    subgraph LeftColon["Left Colon - IMA"]
        SF --> DESC["Descending"]
        DESC --> SIG["Sigmoid"]
        SIG --> REC["Rectum"]
    end
    APP["Appendix"] --> CEC
    style SF fill:#FFA500
    style APP fill:#DC143C`,
};

// =============================================================================
// PROCEDURE ILLUSTRATIONS (3 templates)
// =============================================================================

/**
 * EGD Indications template
 */
export const egdIndications: DiagramTemplate = {
  id: 'gi-egd-indications',
  name: 'EGD Indications and Procedure',
  description: 'Upper endoscopy indications, procedure steps, and findings',
  domain: 'medicine',
  promptTemplate: `Create an EGD indications and procedure flowchart:
- Diagnostic indications: {{diagnosticIndications}}
- Therapeutic indications: {{therapeuticIndications}}
- Contraindications: {{contraindications}}
- Preparation: {{preparation}}
- Sedation options: {{sedation}}
- Procedure steps: {{procedureSteps}}
- Common findings: {{commonFindings}}
- Complications: {{complications}}
{{#additionalNotes}}Post-procedure care: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'diagnosticIndications',
    'therapeuticIndications',
    'contraindications',
    'preparation',
    'sedation',
    'procedureSteps',
    'commonFindings',
    'complications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Indications["EGD Indications"]
        D1["Dysphagia"]
        D2["GERD refractory"]
        D3["GI Bleeding"]
        D4["Anemia workup"]
        T1["Variceal banding"]
        T2["Stricture dilation"]
    end
    subgraph Procedure["Procedure"]
        P1["NPO 6-8hr"] --> P2["Consent"]
        P2 --> P3["Sedation"]
        P3 --> P4["Scope insertion"]
        P4 --> P5["Systematic exam"]
        P5 --> P6["Biopsy PRN"]
    end
    subgraph Findings["Common Findings"]
        F1["Esophagitis"]
        F2["Barrett's"]
        F3["Ulcers"]
        F4["Varices"]
    end
    style D3 fill:#DC143C,color:#fff
    style T1 fill:#FFA500`,
};

/**
 * Colonoscopy Procedure template
 */
export const colonoscopyProcedure: DiagramTemplate = {
  id: 'gi-colonoscopy-procedure',
  name: 'Colonoscopy Preparation and Procedure',
  description: 'Colonoscopy prep, procedure, and quality metrics',
  domain: 'medicine',
  promptTemplate: `Create a colonoscopy procedure flowchart:
- Indications: {{indications}}
- Screening guidelines: {{screeningGuidelines}}
- Prep options: {{prepOptions}}
- Split-dose protocol: {{splitDose}}
- Procedure steps: {{procedureSteps}}
- Quality metrics: {{qualityMetrics}}
- Polyp management: {{polypManagement}}
- Follow-up intervals: {{followUpIntervals}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'indications',
    'screeningGuidelines',
    'prepOptions',
    'splitDose',
    'procedureSteps',
    'qualityMetrics',
    'polypManagement',
    'followUpIntervals',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Prep["Preparation"]
        PR1["Clear liquids 24hr"]
        PR2["Split-dose prep"]
        PR3["Last dose 4-6hr before"]
    end
    subgraph Procedure["Procedure"]
        P1["Sedation"] --> P2["Intubate rectum"]
        P2 --> P3["Advance to cecum"]
        P3 --> P4["Careful withdrawal"]
        P4 --> P5["≥6 min withdrawal"]
    end
    subgraph Quality["Quality Metrics"]
        Q1["ADR ≥25%"]
        Q2["Cecal intubation ≥95%"]
        Q3["Adequate prep"]
    end
    subgraph FollowUp["Follow-up"]
        F1["Normal"] -->|"10 years"| F2["Repeat"]
        F3["1-2 small adenomas"] -->|"7-10 years"| F2
        F4["3-4 adenomas"] -->|"3-5 years"| F2
    end
    style Q1 fill:#228B22,color:#fff`,
};

/**
 * Paracentesis Procedure template
 */
export const paracentesisProcedure: DiagramTemplate = {
  id: 'gi-paracentesis-procedure',
  name: 'Paracentesis Procedure',
  description: 'Diagnostic and therapeutic paracentesis technique and interpretation',
  domain: 'medicine',
  promptTemplate: `Create a paracentesis procedure flowchart:
- Indications: {{indications}}
- Contraindications: {{contraindications}}
- Site selection: {{siteSelection}}
- Technique: {{technique}}
- Fluid analysis: {{fluidAnalysis}}
- SAAG calculation: {{saagCalculation}}
- SBP diagnosis: {{sbpDiagnosis}}
- Albumin replacement: {{albuminReplacement}}
{{#additionalNotes}}Complications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'indications',
    'contraindications',
    'siteSelection',
    'technique',
    'fluidAnalysis',
    'saagCalculation',
    'sbpDiagnosis',
    'albuminReplacement',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Indications["Indications"]
        I1["New ascites"]
        I2["Suspected SBP"]
        I3["Therapeutic drainage"]
    end
    subgraph Technique["Technique"]
        T1["US-guided site"]
        T2["LLQ preferred"]
        T3["Z-track technique"]
    end
    subgraph Analysis["Fluid Analysis"]
        A1["Cell count"] --> B{"PMN ≥250?"}
        B -->|"Yes"| C["SBP - Treat"]
        B -->|"No"| D["No SBP"]
        A2["SAAG"] --> E{">1.1?"}
        E -->|"Yes"| F["Portal HTN"]
        E -->|"No"| G["Non-portal"]
    end
    subgraph Replace["Large Volume"]
        R1[">5L removed"]
        R2["Give albumin 6-8g/L"]
    end
    style C fill:#DC143C,color:#fff`,
};

// =============================================================================
// DATA VISUALIZATION TEMPLATES (4 templates)
// =============================================================================

/**
 * Child-Pugh Scoring template
 */
export const childPughScoring: DiagramTemplate = {
  id: 'gi-child-pugh-scoring',
  name: 'Child-Pugh Scoring System',
  description: 'Child-Pugh classification for cirrhosis severity',
  domain: 'medicine',
  promptTemplate: `Create a Child-Pugh scoring template:
- Bilirubin ranges: {{bilirubinRanges}}
- Albumin ranges: {{albuminRanges}}
- INR ranges: {{inrRanges}}
- Ascites grading: {{ascitesGrading}}
- Encephalopathy grading: {{encephalopathyGrading}}
- Class A criteria: {{classA}}
- Class B criteria: {{classB}}
- Class C criteria: {{classC}}
- Survival data: {{survivalData}}
{{#additionalNotes}}Clinical applications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'bilirubinRanges',
    'albuminRanges',
    'inrRanges',
    'ascitesGrading',
    'encephalopathyGrading',
    'classA',
    'classB',
    'classC',
    'survivalData',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Parameters["Parameters (1-3 points each)"]
        P1["Bilirubin: <2 / 2-3 / >3"]
        P2["Albumin: >3.5 / 2.8-3.5 / <2.8"]
        P3["INR: <1.7 / 1.7-2.3 / >2.3"]
        P4["Ascites: None / Mild / Mod-Severe"]
        P5["HE: None / Grade 1-2 / Grade 3-4"]
    end
    subgraph Classification["Classification"]
        A["Class A: 5-6 pts\\n1-yr survival 100%"]
        B["Class B: 7-9 pts\\n1-yr survival 80%"]
        C["Class C: 10-15 pts\\n1-yr survival 45%"]
    end
    P1 & P2 & P3 & P4 & P5 --> SUM["Sum Points"]
    SUM --> A & B & C
    style A fill:#228B22,color:#fff
    style B fill:#FFA500,color:#000
    style C fill:#DC143C,color:#fff`,
};

/**
 * MELD Score Calculator template
 */
export const meldCalculator: DiagramTemplate = {
  id: 'gi-meld-calculator',
  name: 'MELD Score Calculator',
  description: 'MELD and MELD-Na scoring for liver transplant prioritization',
  domain: 'medicine',
  promptTemplate: `Create a MELD score calculator template:
- MELD formula: {{meldFormula}}
- MELD-Na modification: {{meldNaFormula}}
- Bilirubin input: {{bilirubin}}
- INR input: {{inr}}
- Creatinine input: {{creatinine}}
- Sodium input: {{sodium}}
- Score interpretation: {{interpretation}}
- Transplant thresholds: {{transplantThresholds}}
{{#additionalNotes}}Exception points: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'meldFormula',
    'meldNaFormula',
    'bilirubin',
    'inr',
    'creatinine',
    'sodium',
    'interpretation',
    'transplantThresholds',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Inputs["MELD Inputs"]
        I1["Bilirubin (mg/dL)"]
        I2["INR"]
        I3["Creatinine (mg/dL)"]
        I4["Sodium (mEq/L)"]
    end
    subgraph Formula["MELD-Na Formula"]
        F1["MELD = 10 × (0.957×ln(Cr)\\n+ 0.378×ln(Bili)\\n+ 1.12×ln(INR) + 0.643)"]
        F2["MELD-Na = MELD + 1.32×(137-Na)\\n- 0.033×MELD×(137-Na)"]
    end
    subgraph Interpretation["3-month Mortality"]
        M1["MELD <10: 2%"]
        M2["MELD 10-19: 6%"]
        M3["MELD 20-29: 20%"]
        M4["MELD 30-39: 53%"]
        M5["MELD ≥40: 71%"]
    end
    I1 & I2 & I3 --> F1
    F1 & I4 --> F2
    style M4 fill:#FFA500
    style M5 fill:#DC143C,color:#fff`,
};

/**
 * Rome IV Criteria template
 */
export const romeIVCriteria: DiagramTemplate = {
  id: 'gi-rome-iv-criteria',
  name: 'Rome IV Diagnostic Criteria',
  description: 'Rome IV criteria for functional GI disorders including IBS',
  domain: 'medicine',
  promptTemplate: `Create a Rome IV criteria template:
- IBS criteria: {{ibsCriteria}}
- IBS subtypes: {{ibsSubtypes}}
- Functional dyspepsia: {{functionalDyspepsia}}
- Functional constipation: {{functionalConstipation}}
- Functional diarrhea: {{functionalDiarrhea}}
- Symptom duration: {{symptomDuration}}
- Alarm features to exclude: {{alarmFeatures}}
{{#additionalNotes}}Management approach: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ibsCriteria',
    'ibsSubtypes',
    'functionalDyspepsia',
    'functionalConstipation',
    'functionalDiarrhea',
    'symptomDuration',
    'alarmFeatures',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph IBS["IBS Criteria"]
        C1["Recurrent abdominal pain"]
        C2["≥1 day/week × 3 months"]
        C3["Onset ≥6 months ago"]
        R1["Related to defecation"]
        R2["Change in frequency"]
        R3["Change in form"]
    end
    subgraph Subtypes["IBS Subtypes"]
        S1["IBS-C: >25% hard\\n<25% loose"]
        S2["IBS-D: >25% loose\\n<25% hard"]
        S3["IBS-M: >25% both"]
        S4["IBS-U: Neither criteria"]
    end
    C1 --> D{"≥2 of 3\\nRelated to:"}
    D --> R1 & R2 & R3
    R1 & R2 & R3 --> Subtypes
    style C1 fill:#4169E1,color:#fff`,
};

/**
 * GI Bleeding Scores template
 */
export const giBleedingScores: DiagramTemplate = {
  id: 'gi-bleeding-scores',
  name: 'GI Bleeding Risk Scores',
  description: 'Glasgow-Blatchford and Rockall scores for GI bleeding risk stratification',
  domain: 'medicine',
  promptTemplate: `Create a GI bleeding scores template:
- Glasgow-Blatchford components: {{blatchfordComponents}}
- Glasgow-Blatchford interpretation: {{blatchfordInterpretation}}
- Pre-endoscopy Rockall: {{preEndoscopyRockall}}
- Post-endoscopy Rockall: {{postEndoscopyRockall}}
- Rockall interpretation: {{rockallInterpretation}}
- Outpatient criteria: {{outpatientCriteria}}
- Intervention thresholds: {{interventionThresholds}}
{{#additionalNotes}}Clinical application: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'blatchfordComponents',
    'blatchfordInterpretation',
    'preEndoscopyRockall',
    'postEndoscopyRockall',
    'rockallInterpretation',
    'outpatientCriteria',
    'interventionThresholds',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph GBS["Glasgow-Blatchford Score"]
        B1["BUN: 0-6 pts"]
        B2["Hemoglobin: 0-6 pts"]
        B3["SBP: 0-3 pts"]
        B4["Pulse ≥100: 1 pt"]
        B5["Melena: 1 pt"]
        B6["Syncope: 2 pts"]
        B7["Liver disease: 2 pts"]
        B8["Heart failure: 2 pts"]
    end
    subgraph GBSInt["GBS Interpretation"]
        G1["Score 0: Very low risk\\nOutpatient management"]
        G2["Score 1-2: Low risk"]
        G3["Score ≥6: High risk\\nIntervention likely"]
    end
    subgraph Rockall["Rockall Score"]
        R1["Age: 0-2 pts"]
        R2["Shock: 0-2 pts"]
        R3["Comorbidity: 0-3 pts"]
        R4["Diagnosis: 0-2 pts"]
        R5["Stigmata: 0-2 pts"]
    end
    style G1 fill:#228B22,color:#fff
    style G3 fill:#DC143C,color:#fff`,
};

// =============================================================================
// BARRETT'S ESOPHAGUS & SPECIALIZED TEMPLATES (3 templates)
// =============================================================================

/**
 * Barrett's Esophagus Surveillance Algorithm template
 */
export const barrettsEsophagusSurveillance: DiagramTemplate = {
  id: 'gi-barretts-surveillance',
  name: "Barrett's Esophagus Surveillance Algorithm",
  description:
    "Surveillance and management algorithm for Barrett's esophagus based on dysplasia status",
  domain: 'medicine',
  promptTemplate: `Create a Barrett's esophagus surveillance algorithm:
- Initial diagnosis confirmation: {{diagnosisConfirmation}}
- Segment length (Prague classification): {{pragueClassification}}
- Dysplasia status: {{dysplasiaStatus}}
- Surveillance intervals: {{surveillanceIntervals}}
- Endoscopic therapy options: {{endoscopicTherapy}}
- Ablation techniques: {{ablationTechniques}}
- Surgical indications: {{surgicalIndications}}
- Cancer risk stratification: {{cancerRisk}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'diagnosisConfirmation',
    'pragueClassification',
    'dysplasiaStatus',
    'surveillanceIntervals',
    'endoscopicTherapy',
    'ablationTechniques',
    'surgicalIndications',
    'cancerRisk',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Barrett's Esophagus\\nConfirmed")] --> B["Prague Classification\\nC & M extent"]
    B --> C{"Dysplasia\\nStatus?"}
    C -->|"No Dysplasia"| D["Surveillance EGD\\nq3-5 years"]
    C -->|"Indefinite"| E["Optimize PPI\\nRepeat 3-6 months"]
    C -->|"Low-grade\\nDysplasia"| F["Expert Pathology\\nReview"]
    C -->|"High-grade\\nDysplasia"| G["Endoscopic\\nEradication Therapy"]
    F -->|"Confirmed LGD"| H["EET or\\nSurveillance q6-12mo"]
    G --> I["EMR visible lesions\\n+ RFA ablation"]
    I --> J["Follow-up q3mo x1yr\\nthen q6mo x1yr"]
    J --> K{"Complete\\nEradication?"}
    K -->|"Yes"| L["Surveillance q1yr"]
    K -->|"No"| M["Additional ablation\\nor surgery"]
    style G fill:#DC143C,color:#fff
    style L fill:#228B22,color:#fff`,
};

/**
 * Hepatic Encephalopathy Grading Diagram template
 */
export const hepaticEncephalopathyGrading: DiagramTemplate = {
  id: 'gi-hepatic-encephalopathy-grading',
  name: 'Hepatic Encephalopathy Grading Diagram',
  description:
    'West Haven criteria and management algorithm for hepatic encephalopathy',
  domain: 'medicine',
  promptTemplate: `Create a hepatic encephalopathy grading and management diagram:
- West Haven classification: {{westHavenCriteria}}
- Minimal HE detection: {{minimalHEDetection}}
- Precipitating factors: {{precipitatingFactors}}
- Ammonia levels: {{ammoniaLevels}}
- First-line treatment: {{firstLineTreatment}}
- Second-line options: {{secondLineOptions}}
- Prevention strategies: {{prevention}}
- ICU criteria: {{icuCriteria}}
{{#additionalNotes}}Transplant considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'westHavenCriteria',
    'minimalHEDetection',
    'precipitatingFactors',
    'ammoniaLevels',
    'firstLineTreatment',
    'secondLineOptions',
    'prevention',
    'icuCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Grading["West Haven Criteria"]
        G0["Grade 0 (Covert)\\nMinimal HE - Psychometric testing only"]
        G1["Grade 1\\nTrivial lack of awareness\\nShortened attention span"]
        G2["Grade 2\\nLethargy, disorientation\\nAsterixis present"]
        G3["Grade 3\\nSomnolence, confusion\\nGross disorientation"]
        G4["Grade 4\\nComa - Unresponsive"]
    end
    A[("Hepatic\\nEncephalopathy")] --> B{"Grade?"}
    B --> G0 & G1 & G2 & G3 & G4
    G0 --> T1["Lactulose PRN\\nRifaximin if recurrent"]
    G1 --> T1
    G2 --> T2["Lactulose 20-30g q1-2h\\nuntil 2-3 BM/day"]
    G3 --> T3["ICU consideration\\nAirway protection"]
    G4 --> T4["🚨 ICU: Intubate\\nRule out other causes"]
    T2 --> P["Identify Precipitant:\\nGI bleed, Infection\\nConstipation, Meds"]
    T3 --> P
    style G4 fill:#DC143C,color:#fff
    style T4 fill:#DC143C,color:#fff
    style G0 fill:#228B22,color:#fff`,
};

/**
 * NAFLD/NASH Management Algorithm template
 */
export const nafldNashManagement: DiagramTemplate = {
  id: 'gi-nafld-nash-management',
  name: 'NAFLD/NASH Management Algorithm',
  description:
    'Non-alcoholic fatty liver disease evaluation and treatment algorithm',
  domain: 'medicine',
  promptTemplate: `Create a NAFLD/NASH management algorithm:
- Risk factor assessment: {{riskFactors}}
- Diagnostic workup: {{diagnosticWorkup}}
- Fibrosis staging: {{fibrosisStaging}}
- FIB-4 and NFS scores: {{noninvasiveScores}}
- Lifestyle interventions: {{lifestyleInterventions}}
- Pharmacotherapy options: {{pharmacotherapy}}
- Monitoring strategy: {{monitoring}}
- Liver transplant criteria: {{transplantCriteria}}
{{#additionalNotes}}Emerging therapies: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'riskFactors',
    'diagnosticWorkup',
    'fibrosisStaging',
    'noninvasiveScores',
    'lifestyleInterventions',
    'pharmacotherapy',
    'monitoring',
    'transplantCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Suspected\\nNAFLD")] --> B["Exclude other causes:\\nAlcohol, Viral, Autoimmune"]
    B --> C["Calculate FIB-4"]
    C --> D{"FIB-4 Score?"}
    D -->|"<1.3"| E["Low Risk\\nLifestyle modification"]
    D -->|"1.3-2.67"| F["Indeterminate\\nFibroScan or ELF"]
    D -->|">2.67"| G["High Risk\\nRefer Hepatology"]
    F --> H{"Fibrosis\\nF0-F2?"}
    H -->|"Yes"| E
    H -->|"F3-F4"| G
    G --> I["Consider Liver Biopsy"]
    I --> J{"NASH with\\nSignificant Fibrosis?"}
    J -->|"Yes"| K["Lifestyle + Consider:\\nVitamin E or Pioglitazone"]
    J -->|"Cirrhosis"| L["HCC surveillance\\nVarices screening"]
    E --> M["7-10% weight loss goal\\nExercise 150min/week"]
    style G fill:#FFA500,color:#000
    style L fill:#DC143C,color:#fff
    style M fill:#228B22,color:#fff`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

// =============================================================================
// ADDITIONAL CLINICAL TEMPLATES (4 templates)
// =============================================================================

/**
 * H. pylori Treatment Algorithm template
 */
export const hPyloriTreatment: DiagramTemplate = {
  id: 'gi-h-pylori-treatment',
  name: 'H. pylori Treatment Algorithm',
  description: 'Evidence-based H. pylori eradication therapy selection and follow-up',
  domain: 'medicine',
  promptTemplate: `Create an H. pylori treatment algorithm:
- Testing method: {{testingMethod}}
- First-line therapy: {{firstLineTherapy}}
- Allergies/contraindications: {{allergies}}
- Prior antibiotic exposure: {{priorExposure}}
- Treatment duration: {{duration}}
- Confirmation of eradication: {{confirmationTest}}
- Second-line therapy: {{secondLineTherapy}}
- Refractory management: {{refractoryManagement}}
{{#additionalNotes}}Local resistance patterns: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'testingMethod',
    'firstLineTherapy',
    'allergies',
    'priorExposure',
    'duration',
    'confirmationTest',
    'secondLineTherapy',
    'refractoryManagement',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("H. pylori\\nConfirmed")] --> B{"PCN Allergy?"}
    B -->|"No"| C["Bismuth Quadruple\\nor PPI Triple"]
    B -->|"Yes"| D["Bismuth Quadruple\\nor Levo-based"]
    C --> E["14 days therapy"]
    D --> E
    E --> F["Wait 4 weeks\\nStop PPI 2 weeks"]
    F --> G["Confirm Eradication\\nUrea Breath Test"]
    G -->|"Negative"| H["✓ Cured"]
    G -->|"Positive"| I["Second-line Rx"]
    I --> J["Different regimen"]
    style H fill:#228B22,color:#fff
    style I fill:#FFA500,color:#000`,
};

/**
 * Celiac Disease Workup template
 */
export const celiacWorkup: DiagramTemplate = {
  id: 'gi-celiac-workup',
  name: 'Celiac Disease Workup',
  description: 'Systematic approach to diagnosing and managing celiac disease',
  domain: 'medicine',
  promptTemplate: `Create a celiac disease workup algorithm:
- Clinical presentation: {{presentation}}
- Serologic testing: {{serology}}
- IgA level assessment: {{igaAssessment}}
- Endoscopy indications: {{endoscopyIndications}}
- Histologic findings: {{histology}}
- Genetic testing: {{geneticTesting}}
- Dietary management: {{dietaryManagement}}
- Follow-up monitoring: {{followUp}}
{{#additionalNotes}}Refractory celiac considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentation',
    'serology',
    'igaAssessment',
    'endoscopyIndications',
    'histology',
    'geneticTesting',
    'dietaryManagement',
    'followUp',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Suspected\\nCeliac")] --> B["Check Total IgA"]
    B --> C{"IgA Deficient?"}
    C -->|"No"| D["TTG-IgA"]
    C -->|"Yes"| E["TTG-IgG + DGP-IgG"]
    D -->|"Positive"| F["EGD with Duodenal Bx"]
    E -->|"Positive"| F
    D -->|"Negative"| G["Celiac Unlikely"]
    F --> H{"Marsh 2-3?"}
    H -->|"Yes"| I["Celiac Confirmed"]
    H -->|"No"| J["Consider HLA-DQ2/8"]
    I --> K["Gluten-Free Diet"]
    K --> L["Dietitian Referral"]
    K --> M["Repeat TTG in 6-12mo"]
    style I fill:#DC143C,color:#fff
    style K fill:#228B22,color:#fff`,
};

/**
 * Acute Pancreatitis Management template
 */
export const acutePancreatitisManagement: DiagramTemplate = {
  id: 'gi-acute-pancreatitis',
  name: 'Acute Pancreatitis Management',
  description: 'Severity assessment and management algorithm for acute pancreatitis',
  domain: 'medicine',
  promptTemplate: `Create an acute pancreatitis management algorithm:
- Etiology assessment: {{etiology}}
- Severity scoring: {{severityScoring}}
- Initial resuscitation: {{resuscitation}}
- Nutrition approach: {{nutrition}}
- Imaging timing: {{imaging}}
- Intervention criteria: {{interventionCriteria}}
- Complications monitoring: {{complications}}
- Cholecystectomy timing: {{cholecystectomyTiming}}
{{#additionalNotes}}ICU criteria: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'etiology',
    'severityScoring',
    'resuscitation',
    'nutrition',
    'imaging',
    'interventionCriteria',
    'complications',
    'cholecystectomyTiming',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Acute\\nPancreatitis")] --> B["Confirm Dx:\\n2 of 3 criteria"]
    B --> C["Lipase >3x\\nAbdominal Pain\\nImaging"]
    C --> D["Assess Severity"]
    D --> E{"BISAP ≥3?\\nOrgan Failure?"}
    E -->|"Yes"| F["🚨 Severe - ICU"]
    E -->|"No"| G["Mild - Floor"]
    F --> H["Aggressive IVF\\nGoal-directed"]
    G --> H
    H --> I{"Gallstone\\nEtiology?"}
    I -->|"Yes"| J["ERCP if Cholangitis"]
    I -->|"Yes"| K["CCY same admission\\nif mild"]
    H --> L["Early Oral Feeding\\nwhen tolerated"]
    style F fill:#DC143C,color:#fff
    style L fill:#228B22,color:#fff`,
};

/**
 * Hepatitis B Management template
 */
export const hepatitisBManagement: DiagramTemplate = {
  id: 'gi-hepatitis-b-management',
  name: 'Hepatitis B Management',
  description: 'Chronic hepatitis B treatment initiation and monitoring algorithm',
  domain: 'medicine',
  promptTemplate: `Create a hepatitis B management algorithm:
- HBV serology interpretation: {{serologyInterpretation}}
- Phase determination: {{phaseAssessment}}
- Treatment indications: {{treatmentIndications}}
- Medication options: {{medications}}
- Monitoring parameters: {{monitoring}}
- HCC surveillance: {{hccSurveillance}}
- Special populations: {{specialPopulations}}
- Treatment endpoints: {{endpoints}}
{{#additionalNotes}}Resistance considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'serologyInterpretation',
    'phaseAssessment',
    'treatmentIndications',
    'medications',
    'monitoring',
    'hccSurveillance',
    'specialPopulations',
    'endpoints',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Chronic HBV\\nHBsAg+ >6mo")] --> B{"HBeAg Status?"}
    B -->|"Positive"| C["Check HBV DNA\\n& ALT"]
    B -->|"Negative"| D["Check HBV DNA\\n& ALT"]
    C --> E{"DNA >20K\\nALT >2x ULN?"}
    D --> F{"DNA >2K\\nALT >2x ULN?"}
    E -->|"Yes"| G["Treat: TDF or TAF\\nor Entecavir"]
    F -->|"Yes"| G
    E -->|"No"| H["Monitor q3-6mo"]
    F -->|"No"| H
    G --> I["Check DNA q3-6mo\\nuntil undetectable"]
    A --> J["HCC Surveillance\\nUS q6mo if cirrhosis"]
    style G fill:#4169E1,color:#fff
    style J fill:#FFA500,color:#000`,
};

/**
 * All gastroenterology templates
 */
export const gastroenterologyTemplates: DiagramTemplate[] = [
  // Clinical Decision Trees
  giBleedingAlgorithm,
  dysphagiaEvaluation,
  abnormalLFTsWorkup,
  acuteAbdominalPain,
  diarrheaEvaluation,
  cirrhosisManagement,
  ibdTreatment,
  hPyloriTreatment,
  celiacWorkup,
  acutePancreatitisManagement,
  hepatitisBManagement,
  // Barrett's Esophagus & Specialized
  barrettsEsophagusSurveillance,
  hepaticEncephalopathyGrading,
  nafldNashManagement,
  // Anatomical Diagrams
  giTractOverview,
  hepatobiliarySystem,
  portalCirculation,
  colonAnatomy,
  // Procedure Illustrations
  egdIndications,
  colonoscopyProcedure,
  paracentesisProcedure,
  // Data Visualization
  childPughScoring,
  meldCalculator,
  romeIVCriteria,
  giBleedingScores,
];

export default gastroenterologyTemplates;
