/**
 * pediatrics.ts
 * Pediatrics diagram templates for FINNISH
 *
 * Contains comprehensive templates for pediatric medicine including:
 * - Clinical decision algorithms (7 templates)
 * - Anatomical diagrams (4 templates)
 * - Procedure illustrations (3 templates)
 * - Data visualization templates (4 templates)
 *
 * Total: 18 templates
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// DECISION TREES (7 templates)
// =============================================================================

/**
 * Fever in Neonate/Infant Algorithm template
 */
export const feverInNeonateAlgorithm: DiagramTemplate = {
  id: 'peds-fever-neonate-algorithm',
  name: 'Fever in Neonate/Infant Algorithm',
  description: 'Risk stratification and workup pathway for febrile infants under 90 days using Rochester, Philadelphia, or Boston criteria',
  domain: 'medicine',
  promptTemplate: `Create a fever in neonate/infant evaluation algorithm:
- Age group: {{ageGroup}}
- Temperature threshold: {{temperatureThreshold}}
- Risk stratification criteria: {{riskCriteria}}
- Laboratory workup: {{labWorkup}}
- Lumbar puncture indications: {{lpIndications}}
- Empiric antibiotics: {{empiricAntibiotics}}
- Disposition criteria: {{dispositionCriteria}}
{{#additionalNotes}}Additional clinical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ageGroup',
    'temperatureThreshold',
    'riskCriteria',
    'labWorkup',
    'lpIndications',
    'empiricAntibiotics',
    'dispositionCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("🌡️ Febrile Infant\\n<90 days")] --> B{"Age?"}
    B -->|"<28 days"| C["🚨 Full Sepsis Workup"]
    C --> C1["CBC, CMP, UA, BCx"]
    C --> C2["LP Required"]
    C --> C3["Admit + IV Abx"]
    B -->|"29-60 days"| D{"Well-appearing?"}
    D -->|"No"| C
    D -->|"Yes"| E["Rochester/Boston Criteria"]
    E --> F{"Low Risk?"}
    F -->|"Yes"| G["Consider Outpatient"]
    F -->|"No"| H["Admit"]
    B -->|"61-90 days"| I["Modified Workup"]
    style C fill:#DC143C,color:#fff
    style G fill:#228B22,color:#fff`,
};

/**
 * Pediatric Dehydration Assessment template
 */
export const pediatricDehydrationAlgorithm: DiagramTemplate = {
  id: 'peds-dehydration-algorithm',
  name: 'Pediatric Dehydration Assessment Algorithm',
  description: 'Clinical assessment and rehydration protocol for pediatric dehydration',
  domain: 'medicine',
  promptTemplate: `Create a pediatric dehydration assessment algorithm:
- Clinical signs assessed: {{clinicalSigns}}
- Severity classification: {{severityClassification}}
- Dehydration percentage: {{dehydrationPercentage}}
- Oral rehydration protocol: {{oralRehydration}}
- IV fluid protocol: {{ivFluidProtocol}}
- Monitoring parameters: {{monitoring}}
- Discharge criteria: {{dischargeCriteria}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'clinicalSigns',
    'severityClassification',
    'dehydrationPercentage',
    'oralRehydration',
    'ivFluidProtocol',
    'monitoring',
    'dischargeCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("💧 Assess\\nDehydration")] --> B["Clinical Signs"]
    B --> B1["Skin turgor"]
    B --> B2["Mucous membranes"]
    B --> B3["Tears"]
    B --> B4["Cap refill"]
    B1 & B2 & B3 & B4 --> C{"Severity?"}
    C -->|"Mild <5%"| D["ORS at home"]
    C -->|"Moderate 5-10%"| E["ORS in ED\\n50-100 mL/kg"]
    C -->|"Severe >10%"| F["🚨 IV Fluids"]
    F --> F1["NS 20 mL/kg bolus"]
    F --> F2["Reassess + Repeat"]
    style F fill:#DC143C,color:#fff
    style D fill:#228B22,color:#fff`,
};

/**
 * Failure to Thrive Evaluation template
 */
export const failureToThriveAlgorithm: DiagramTemplate = {
  id: 'peds-ftt-algorithm',
  name: 'Failure to Thrive Evaluation Algorithm',
  description: 'Systematic approach to evaluating and managing failure to thrive in pediatric patients',
  domain: 'medicine',
  promptTemplate: `Create a failure to thrive evaluation algorithm:
- Growth parameters assessed: {{growthParameters}}
- Organic vs non-organic causes: {{causeClassification}}
- Initial workup: {{initialWorkup}}
- Nutritional assessment: {{nutritionalAssessment}}
- Caloric requirements: {{caloricRequirements}}
- Red flag symptoms: {{redFlags}}
- Referral criteria: {{referralCriteria}}
{{#additionalNotes}}Social considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'growthParameters',
    'causeClassification',
    'initialWorkup',
    'nutritionalAssessment',
    'caloricRequirements',
    'redFlags',
    'referralCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("📉 Weight <3rd\\npercentile")] --> B["Confirm FTT"]
    B --> B1["Plot growth curve"]
    B --> B2["Calculate weight velocity"]
    B --> C{"Pattern?"}
    C -->|"Weight only"| D["Inadequate intake"]
    C -->|"Wt + Length"| E["Chronic illness"]
    C -->|"All parameters"| F["Genetic/Endocrine"]
    D --> G["Feeding assessment"]
    G --> G1["Intake diary"]
    G --> G2["Feeding observation"]
    E --> H["Labs + Workup"]
    H --> H1["CBC, CMP, TFTs"]
    H --> H2["Celiac screen"]
    F --> I["Genetics/Endo referral"]
    style A fill:#FFA500,color:#000`,
};

/**
 * Childhood Rash Evaluation template
 */
export const childhoodRashAlgorithm: DiagramTemplate = {
  id: 'peds-rash-algorithm',
  name: 'Childhood Rash Evaluation Algorithm',
  description: 'Diagnostic approach to common pediatric exanthems and rashes',
  domain: 'medicine',
  promptTemplate: `Create a childhood rash evaluation algorithm:
- Rash characteristics: {{rashCharacteristics}}
- Distribution pattern: {{distribution}}
- Associated symptoms: {{associatedSymptoms}}
- Fever pattern: {{feverPattern}}
- Viral exanthems differentiated: {{viralExanthems}}
- Bacterial causes: {{bacterialCauses}}
- When to refer: {{referralIndications}}
{{#additionalNotes}}Vaccination status considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'rashCharacteristics',
    'distribution',
    'associatedSymptoms',
    'feverPattern',
    'viralExanthems',
    'bacterialCauses',
    'referralIndications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("🔴 Pediatric\\nRash")] --> B{"Fever?"}
    B -->|"Yes"| C{"Rash Type?"}
    B -->|"No"| D["Non-febrile rash"]
    C -->|"Maculopapular"| E["Measles, Rubella,\\nRoseola"]
    C -->|"Vesicular"| F["Varicella, HSV,\\nHFMD"]
    C -->|"Petechial"| G["🚨 Meningococcemia"]
    E --> H{"Cough +\\nConjunctivitis?"}
    H -->|"Yes"| I["Measles"]
    H -->|"No, fever\\nthen rash"| J["Roseola"]
    F --> K{"Distribution?"}
    K -->|"Crops, trunk"| L["Varicella"]
    K -->|"Hands/Feet/Mouth"| M["HFMD"]
    style G fill:#DC143C,color:#fff`,
};

/**
 * Developmental Delay Evaluation template
 */
export const developmentalDelayAlgorithm: DiagramTemplate = {
  id: 'peds-developmental-delay-algorithm',
  name: 'Developmental Delay Evaluation Algorithm',
  description: 'Systematic approach to evaluating developmental delays across multiple domains',
  domain: 'medicine',
  promptTemplate: `Create a developmental delay evaluation algorithm:
- Domains assessed: {{domainsAssessed}}
- Screening tools used: {{screeningTools}}
- Red flags by age: {{redFlagsByAge}}
- Initial workup: {{initialWorkup}}
- Specialist referrals: {{specialistReferrals}}
- Early intervention criteria: {{earlyIntervention}}
- Family support resources: {{familySupport}}
{{#additionalNotes}}Genetic considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'domainsAssessed',
    'screeningTools',
    'redFlagsByAge',
    'initialWorkup',
    'specialistReferrals',
    'earlyIntervention',
    'familySupport',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("🧒 Developmental\\nConcern")] --> B["Screening"]
    B --> B1["ASQ-3"]
    B --> B2["M-CHAT if ASD concern"]
    B --> C{"Which Domain?"}
    C -->|"Motor"| D["PT/OT Eval"]
    C -->|"Language"| E["Audiology + SLP"]
    C -->|"Social"| F["ASD Evaluation"]
    C -->|"Global"| G["Full Workup"]
    G --> G1["Genetics"]
    G --> G2["MRI Brain"]
    G --> G3["Metabolic screen"]
    D & E & F --> H["Early Intervention"]
    H --> I["IEP/IFSP"]
    style H fill:#4169E1,color:#fff`,
};

/**
 * Pediatric Asthma Management template
 */
export const pediatricAsthmaAlgorithm: DiagramTemplate = {
  id: 'peds-asthma-algorithm',
  name: 'Pediatric Asthma Management Algorithm',
  description: 'Stepwise approach to asthma management in children following NAEPP guidelines',
  domain: 'medicine',
  promptTemplate: `Create a pediatric asthma management algorithm:
- Severity classification: {{severityClassification}}
- Age-based considerations: {{ageConsiderations}}
- Controller medications: {{controllerMeds}}
- Rescue medications: {{rescueMeds}}
- Step-up criteria: {{stepUpCriteria}}
- Step-down criteria: {{stepDownCriteria}}
- Acute exacerbation management: {{acuteManagement}}
{{#additionalNotes}}Action plan elements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'severityClassification',
    'ageConsiderations',
    'controllerMeds',
    'rescueMeds',
    'stepUpCriteria',
    'stepDownCriteria',
    'acuteManagement',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("🫁 Pediatric\\nAsthma")] --> B{"Severity?"}
    B -->|"Intermittent"| C["Step 1: SABA PRN"]
    B -->|"Mild Persistent"| D["Step 2: Low ICS"]
    B -->|"Moderate"| E["Step 3: Low ICS + LABA"]
    B -->|"Severe"| F["Step 4: Med/High ICS + LABA"]
    C & D & E & F --> G{"Control?"}
    G -->|"Well-controlled\\n3 months"| H["Consider Step Down"]
    G -->|"Not controlled"| I["Step Up"]
    G -->|"Exacerbation"| J["🚨 Acute Protocol"]
    J --> J1["Albuterol q20min x3"]
    J --> J2["Steroids early"]
    style J fill:#DC143C,color:#fff
    style H fill:#228B22,color:#fff`,
};

/**
 * Well-Child Visit template
 */
export const wellChildVisitAlgorithm: DiagramTemplate = {
  id: 'peds-well-child-algorithm',
  name: 'Well-Child Visit Algorithm',
  description: 'Comprehensive well-child visit checklist organized by age with AAP Bright Futures guidelines',
  domain: 'medicine',
  promptTemplate: `Create a well-child visit algorithm:
- Visit age: {{visitAge}}
- Growth assessment: {{growthAssessment}}
- Developmental screening: {{developmentalScreening}}
- Vaccines due: {{vaccinesDue}}
- Anticipatory guidance topics: {{anticipatoryGuidance}}
- Safety screening: {{safetyScreening}}
- Lab screening: {{labScreening}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'visitAge',
    'growthAssessment',
    'developmentalScreening',
    'vaccinesDue',
    'anticipatoryGuidance',
    'safetyScreening',
    'labScreening',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("👶 Well-Child\\nVisit")] --> B["History"]
    B --> B1["Interval history"]
    B --> B2["Feeding/Sleep"]
    B --> B3["Development"]
    A --> C["Exam"]
    C --> C1["Growth parameters"]
    C --> C2["Physical exam"]
    C --> C3["Developmental obs"]
    A --> D["Screening"]
    D --> D1["Vision/Hearing"]
    D --> D2["Lead if indicated"]
    D --> D3["Anemia screen"]
    A --> E["Vaccines"]
    E --> E1["Per schedule"]
    A --> F["Guidance"]
    F --> F1["Safety"]
    F --> F2["Nutrition"]
    F --> F3["Sleep"]
    style A fill:#4169E1,color:#fff`,
};

// =============================================================================
// ANATOMICAL DIAGRAMS (4 templates)
// =============================================================================

/**
 * Pediatric Airway Differences template
 */
export const pediatricAirwayAnatomy: DiagramTemplate = {
  id: 'peds-airway-anatomy',
  name: 'Pediatric Airway Differences',
  description: 'Anatomical comparison of pediatric vs adult airway with clinical implications',
  domain: 'medicine',
  promptTemplate: `Create a pediatric airway anatomy diagram:
- Larynx position: {{larynxPosition}}
- Epiglottis shape: {{epiglottisShape}}
- Narrowest point: {{narrowestPoint}}
- Tongue size relative to oral cavity: {{tongueSize}}
- Trachea dimensions: {{tracheaDimensions}}
- Clinical implications: {{clinicalImplications}}
- Intubation considerations: {{intubationConsiderations}}
{{#additionalNotes}}Age-specific variations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'larynxPosition',
    'epiglottisShape',
    'narrowestPoint',
    'tongueSize',
    'tracheaDimensions',
    'clinicalImplications',
    'intubationConsiderations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Pediatric["Pediatric Airway"]
        P1["Larynx: C3-C4\\n(higher)"]
        P2["Epiglottis: Omega\\nshaped"]
        P3["Narrowest: Cricoid\\n(subglottic)"]
        P4["Large tongue"]
        P5["Funnel-shaped"]
    end
    subgraph Adult["Adult Airway"]
        A1["Larynx: C4-C5"]
        A2["Epiglottis: Flat"]
        A3["Narrowest: Glottis\\n(vocal cords)"]
        A4["Proportionate tongue"]
        A5["Cylindrical"]
    end
    subgraph Implications["Clinical Implications"]
        I1["Use uncuffed ETT <8y"]
        I2["Straight blade preferred"]
        I3["More prone to obstruction"]
    end
    style P3 fill:#FFA500,color:#000`,
};

/**
 * Fontanelle Closure Timeline template
 */
export const fontanelleClosureAnatomy: DiagramTemplate = {
  id: 'peds-fontanelle-anatomy',
  name: 'Fontanelle Closure Timeline',
  description: 'Diagram showing fontanelle locations, normal closure times, and clinical significance',
  domain: 'medicine',
  promptTemplate: `Create a fontanelle anatomy diagram:
- Anterior fontanelle location: {{anteriorLocation}}
- Posterior fontanelle location: {{posteriorLocation}}
- Normal closure times: {{closureTimes}}
- Assessment technique: {{assessmentTechnique}}
- Abnormal findings: {{abnormalFindings}}
- Clinical significance: {{clinicalSignificance}}
{{#additionalNotes}}Associated conditions: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'anteriorLocation',
    'posteriorLocation',
    'closureTimes',
    'assessmentTechnique',
    'abnormalFindings',
    'clinicalSignificance',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Skull["Infant Skull - Superior View"]
        AF["Anterior Fontanelle\\n(Diamond shaped)\\n2.5 x 4 cm"]
        PF["Posterior Fontanelle\\n(Triangular)\\n0.5-1 cm"]
        CS["Coronal Suture"]
        SS["Sagittal Suture"]
        LS["Lambdoid Suture"]
    end
    subgraph Closure["Closure Timeline"]
        AF --> C1["Closes: 12-18 months"]
        PF --> C2["Closes: 2-3 months"]
    end
    subgraph Abnormal["Abnormal Findings"]
        B1["Bulging: ↑ICP, Meningitis"]
        B2["Sunken: Dehydration"]
        B3["Early closure: Craniosynostosis"]
        B4["Delayed: Rickets, Hypothyroid"]
    end
    style AF fill:#3b82f6,color:#fff
    style PF fill:#22c55e,color:#fff`,
};

/**
 * Pediatric Growth Charts template
 */
export const growthChartsAnatomy: DiagramTemplate = {
  id: 'peds-growth-charts',
  name: 'Pediatric Growth Charts',
  description: 'Growth chart interpretation with percentile curves and clinical applications',
  domain: 'medicine',
  promptTemplate: `Create a growth chart interpretation diagram:
- Chart types used: {{chartTypes}}
- Percentile lines: {{percentileLines}}
- WHO vs CDC curves: {{whoVsCdc}}
- Growth velocity assessment: {{growthVelocity}}
- Concerning patterns: {{concerningPatterns}}
- When to worry: {{whenToWorry}}
- Intervention thresholds: {{interventionThresholds}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'chartTypes',
    'percentileLines',
    'whoVsCdc',
    'growthVelocity',
    'concerningPatterns',
    'whenToWorry',
    'interventionThresholds',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Charts["Growth Charts"]
        C1["Weight-for-age"]
        C2["Length/Height-for-age"]
        C3["Weight-for-length"]
        C4["Head circumference"]
        C5["BMI (≥2 years)"]
    end
    subgraph Percentiles["Percentile Lines"]
        P1["97th - Overweight concern"]
        P2["50th - Average"]
        P3["3rd - Underweight concern"]
    end
    subgraph Patterns["Concerning Patterns"]
        R1["Crossing 2+ major lines"]
        R2["<3rd or >97th"]
        R3["Discordant parameters"]
    end
    C1 --> Percentiles
    Percentiles --> R1
    style R1 fill:#DC143C,color:#fff`,
};

/**
 * Congenital Heart Defects Overview template
 */
export const congenitalHeartDefectsAnatomy: DiagramTemplate = {
  id: 'peds-chd-anatomy',
  name: 'Congenital Heart Defects Overview',
  description: 'Visual overview of common congenital heart defects with hemodynamic classification',
  domain: 'medicine',
  promptTemplate: `Create a congenital heart defects overview:
- Acyanotic defects: {{acyanoticDefects}}
- Cyanotic defects: {{cyanoticDefects}}
- Left-to-right shunts: {{leftToRightShunts}}
- Right-to-left shunts: {{rightToLeftShunts}}
- Obstructive lesions: {{obstructiveLesions}}
- Clinical presentations: {{clinicalPresentations}}
- Initial workup: {{initialWorkup}}
{{#additionalNotes}}Critical CHD screening: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'acyanoticDefects',
    'cyanoticDefects',
    'leftToRightShunts',
    'rightToLeftShunts',
    'obstructiveLesions',
    'clinicalPresentations',
    'initialWorkup',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Acyanotic["Acyanotic (Pink)"]
        A1["VSD - Most common"]
        A2["ASD"]
        A3["PDA"]
        A4["Coarctation"]
    end
    subgraph Cyanotic["Cyanotic (Blue)"]
        C1["Tetralogy of Fallot"]
        C2["TGA"]
        C3["Truncus Arteriosus"]
        C4["Tricuspid Atresia"]
        C5["TAPVR"]
    end
    subgraph Presentation["Clinical Clues"]
        P1["Murmur"]
        P2["CHF symptoms"]
        P3["Cyanosis"]
        P4["Failure to thrive"]
    end
    A1 & A2 & A3 --> P1
    C1 & C2 --> P3
    style Acyanotic fill:#fca5a5,color:#000
    style Cyanotic fill:#93c5fd,color:#000`,
};

// =============================================================================
// PROCEDURE ILLUSTRATIONS (3 templates)
// =============================================================================

/**
 * Pediatric IV Access template
 */
export const pediatricIVAccessProcedure: DiagramTemplate = {
  id: 'peds-iv-access-procedure',
  name: 'Pediatric IV Access Procedure',
  description: 'Step-by-step guide to peripheral IV placement in pediatric patients',
  domain: 'medicine',
  promptTemplate: `Create a pediatric IV access procedure diagram:
- Preferred sites by age: {{preferredSites}}
- Catheter size selection: {{catheterSize}}
- Preparation steps: {{preparation}}
- Technique modifications for children: {{techniqueModifications}}
- Securing the IV: {{securingIV}}
- Troubleshooting: {{troubleshooting}}
- When to escalate: {{whenToEscalate}}
{{#additionalNotes}}Distraction techniques: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'preferredSites',
    'catheterSize',
    'preparation',
    'techniqueModifications',
    'securingIV',
    'troubleshooting',
    'whenToEscalate',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Pediatric IV Access"] --> B["Preparation"]
    B --> B1["EMLA/LMX if time"]
    B --> B2["Child Life if available"]
    B --> B3["Parent positioning"]
    B --> C["Site Selection"]
    C --> C1["Infant: Scalp, Hand, Foot"]
    C --> C2["Toddler: Hand, Forearm"]
    C --> C3["Older: AC fossa, Forearm"]
    C --> D["Catheter Size"]
    D --> D1["Infant: 24G"]
    D --> D2["Child: 22-24G"]
    D --> D3["Adolescent: 20-22G"]
    D --> E["Secure Well"]
    E --> E1["Arm board PRN"]
    E --> E2["Tape/Tegaderm"]
    style B1 fill:#22c55e,color:#fff`,
};

/**
 * Lumbar Puncture Positioning template
 */
export const lumbarPuncturePositioning: DiagramTemplate = {
  id: 'peds-lp-positioning',
  name: 'Pediatric Lumbar Puncture Positioning',
  description: 'Proper positioning techniques for pediatric lumbar puncture',
  domain: 'medicine',
  promptTemplate: `Create a pediatric LP positioning diagram:
- Lateral decubitus position: {{lateralPosition}}
- Sitting position considerations: {{sittingPosition}}
- Landmark identification: {{landmarks}}
- Holder technique: {{holderTechnique}}
- Monitoring during procedure: {{monitoring}}
- Needle selection: {{needleSelection}}
- Post-procedure care: {{postProcedure}}
{{#additionalNotes}}Contraindications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'lateralPosition',
    'sittingPosition',
    'landmarks',
    'holderTechnique',
    'monitoring',
    'needleSelection',
    'postProcedure',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Pediatric LP"] --> B{"Position?"}
    B -->|"Lateral"| C["Preferred for infants"]
    B -->|"Sitting"| D["Alternative option"]
    C --> E["Positioning Steps"]
    E --> E1["Fetal position"]
    E --> E2["Flex spine, NOT neck"]
    E --> E3["Align shoulders/hips"]
    E --> E4["Monitor breathing"]
    D --> F["Sitting Steps"]
    F --> F1["Support head forward"]
    F --> F2["Flex spine"]
    E & F --> G["Landmarks"]
    G --> G1["L3-L4 or L4-L5"]
    G --> G2["Iliac crest = L4"]
    G --> H["Needle: 22G spinal"]
    style E4 fill:#FFA500,color:#000`,
};

/**
 * Immunization Schedule template
 */
export const immunizationScheduleProcedure: DiagramTemplate = {
  id: 'peds-immunization-schedule',
  name: 'Pediatric Immunization Schedule',
  description: 'Visual representation of CDC/AAP recommended immunization schedule',
  domain: 'medicine',
  promptTemplate: `Create an immunization schedule diagram:
- Birth vaccines: {{birthVaccines}}
- 2-month vaccines: {{twoMonthVaccines}}
- 4-month vaccines: {{fourMonthVaccines}}
- 6-month vaccines: {{sixMonthVaccines}}
- 12-month vaccines: {{twelveMonthVaccines}}
- 4-6 year vaccines: {{fourToSixYearVaccines}}
- Catch-up guidance: {{catchUpGuidance}}
{{#additionalNotes}}Special circumstances: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'birthVaccines',
    'twoMonthVaccines',
    'fourMonthVaccines',
    'sixMonthVaccines',
    'twelveMonthVaccines',
    'fourToSixYearVaccines',
    'catchUpGuidance',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Birth["Birth"]
        B1["HepB #1"]
    end
    subgraph TwoMo["2 Months"]
        T1["DTaP #1"]
        T2["IPV #1"]
        T3["Hib #1"]
        T4["PCV13 #1"]
        T5["RV #1"]
        T6["HepB #2"]
    end
    subgraph FourMo["4 Months"]
        F1["DTaP #2"]
        F2["IPV #2"]
        F3["Hib #2"]
        F4["PCV13 #2"]
        F5["RV #2"]
    end
    subgraph TwelveMo["12 Months"]
        M1["MMR #1"]
        M2["Varicella #1"]
        M3["HepA #1"]
    end
    Birth --> TwoMo --> FourMo --> TwelveMo
    style Birth fill:#22c55e,color:#fff`,
};

// =============================================================================
// DATA VISUALIZATION (4 templates)
// =============================================================================

/**
 * APGAR Scoring template
 */
export const apgarScoringVisualization: DiagramTemplate = {
  id: 'peds-apgar-scoring',
  name: 'APGAR Scoring Template',
  description: 'Visual guide to APGAR score assessment at 1 and 5 minutes of life',
  domain: 'medicine',
  promptTemplate: `Create an APGAR scoring visualization:
- Appearance scoring: {{appearanceScoring}}
- Pulse scoring: {{pulseScoring}}
- Grimace scoring: {{grimaceScoring}}
- Activity scoring: {{activityScoring}}
- Respiration scoring: {{respirationScoring}}
- Score interpretation: {{scoreInterpretation}}
- Resuscitation triggers: {{resuscitationTriggers}}
{{#additionalNotes}}Extended APGAR: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'appearanceScoring',
    'pulseScoring',
    'grimaceScoring',
    'activityScoring',
    'respirationScoring',
    'scoreInterpretation',
    'resuscitationTriggers',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph APGAR["APGAR Score Components"]
        A["A - Appearance\\n0: Blue\\n1: Acrocyanosis\\n2: Pink"]
        P["P - Pulse\\n0: Absent\\n1: <100\\n2: >100"]
        G["G - Grimace\\n0: None\\n1: Grimace\\n2: Cry/Cough"]
        AC["A - Activity\\n0: Limp\\n1: Some flexion\\n2: Active"]
        R["R - Respiration\\n0: Absent\\n1: Weak cry\\n2: Strong cry"]
    end
    subgraph Scoring["Interpretation"]
        S1["7-10: Normal"]
        S2["4-6: Moderately depressed"]
        S3["0-3: Severely depressed"]
    end
    A & P & G & AC & R --> Score["Total 0-10"]
    Score --> Scoring
    style S3 fill:#DC143C,color:#fff
    style S1 fill:#228B22,color:#fff`,
};

/**
 * Growth Percentiles Visualization template
 */
export const growthPercentilesVisualization: DiagramTemplate = {
  id: 'peds-growth-percentiles',
  name: 'Growth Percentiles Visualization',
  description: 'Visual representation of growth percentile interpretation and clinical significance',
  domain: 'medicine',
  promptTemplate: `Create a growth percentiles visualization:
- Percentile meaning: {{percentileMeaning}}
- Normal range: {{normalRange}}
- Tracking over time: {{trackingOverTime}}
- When to investigate: {{whenToInvestigate}}
- Catch-up growth: {{catchUpGrowth}}
- Catch-down growth: {{catchDownGrowth}}
- BMI interpretation: {{bmiInterpretation}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'percentileMeaning',
    'normalRange',
    'trackingOverTime',
    'whenToInvestigate',
    'catchUpGrowth',
    'catchDownGrowth',
    'bmiInterpretation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Percentiles["Percentile Meaning"]
        P97["97th - 3% above"]
        P85["85th - Overweight screen"]
        P50["50th - Median"]
        P15["15th"]
        P5["5th"]
        P3["3rd - 3% below"]
    end
    subgraph Interpretation["Clinical Interpretation"]
        I1["Track TREND not single point"]
        I2["Crossing 2 lines = Concern"]
        I3["Premature: Use corrected age"]
    end
    subgraph Action["Action Thresholds"]
        A1["<3rd → FTT workup"]
        A2[">97th → Obesity evaluation"]
        A3["Crossing → Investigate"]
    end
    Percentiles --> Interpretation
    Interpretation --> Action
    style A1 fill:#FFA500,color:#000
    style A2 fill:#FFA500,color:#000`,
};

/**
 * Developmental Milestones Visualization template
 */
export const developmentalMilestonesVisualization: DiagramTemplate = {
  id: 'peds-developmental-milestones',
  name: 'Developmental Milestones Visualization',
  description: 'Age-based developmental milestone timeline across all domains',
  domain: 'medicine',
  promptTemplate: `Create a developmental milestones visualization:
- Gross motor milestones: {{grossMotor}}
- Fine motor milestones: {{fineMotor}}
- Language milestones: {{language}}
- Social milestones: {{social}}
- Cognitive milestones: {{cognitive}}
- Red flags by age: {{redFlags}}
- Screening recommendations: {{screeningRecs}}
{{#additionalNotes}}Variation ranges: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'grossMotor',
    'fineMotor',
    'language',
    'social',
    'cognitive',
    'redFlags',
    'screeningRecs',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph TwoMo["2 Months"]
        T1["Lifts head prone"]
        T2["Social smile"]
        T3["Coos"]
    end
    subgraph FourMo["4 Months"]
        F1["Rolls over"]
        F2["Reaches for objects"]
        F3["Laughs"]
    end
    subgraph SixMo["6 Months"]
        S1["Sits with support"]
        S2["Transfers objects"]
        S3["Babbles"]
    end
    subgraph NineMo["9 Months"]
        N1["Sits alone"]
        N2["Pincer grasp emerging"]
        N3["Responds to name"]
    end
    subgraph TwelveMo["12 Months"]
        M1["Stands alone"]
        M2["1-2 words"]
        M3["Points"]
    end
    TwoMo --> FourMo --> SixMo --> NineMo --> TwelveMo
    style TwelveMo fill:#22c55e,color:#fff`,
};

/**
 * Pediatric Vital Signs by Age template
 */
export const pediatricVitalSignsVisualization: DiagramTemplate = {
  id: 'peds-vital-signs-by-age',
  name: 'Pediatric Vital Signs by Age',
  description: 'Age-appropriate normal ranges for vital signs in pediatric patients',
  domain: 'medicine',
  promptTemplate: `Create a pediatric vital signs reference:
- Heart rate ranges: {{heartRateRanges}}
- Respiratory rate ranges: {{respiratoryRateRanges}}
- Blood pressure ranges: {{bloodPressureRanges}}
- Temperature norms: {{temperatureNorms}}
- SpO2 targets: {{spo2Targets}}
- Age group categories: {{ageGroupCategories}}
- Clinical significance: {{clinicalSignificance}}
{{#additionalNotes}}Situational variations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'heartRateRanges',
    'respiratoryRateRanges',
    'bloodPressureRanges',
    'temperatureNorms',
    'spo2Targets',
    'ageGroupCategories',
    'clinicalSignificance',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Neonate["Neonate (0-28d)"]
        N1["HR: 100-180"]
        N2["RR: 30-60"]
        N3["SBP: 60-90"]
    end
    subgraph Infant["Infant (1-12mo)"]
        I1["HR: 100-160"]
        I2["RR: 24-38"]
        I3["SBP: 70-100"]
    end
    subgraph Toddler["Toddler (1-3y)"]
        T1["HR: 90-150"]
        T2["RR: 22-30"]
        T3["SBP: 80-110"]
    end
    subgraph Child["Child (4-12y)"]
        C1["HR: 70-120"]
        C2["RR: 18-25"]
        C3["SBP: 90-120"]
    end
    subgraph Adolescent["Adolescent"]
        A1["HR: 60-100"]
        A2["RR: 12-20"]
        A3["SBP: 100-130"]
    end
    Neonate --> Infant --> Toddler --> Child --> Adolescent`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All pediatrics templates
 */
export const pediatricsTemplates: DiagramTemplate[] = [
  // Decision Trees (7)
  feverInNeonateAlgorithm,
  pediatricDehydrationAlgorithm,
  failureToThriveAlgorithm,
  childhoodRashAlgorithm,
  developmentalDelayAlgorithm,
  pediatricAsthmaAlgorithm,
  wellChildVisitAlgorithm,
  // Anatomical Diagrams (4)
  pediatricAirwayAnatomy,
  fontanelleClosureAnatomy,
  growthChartsAnatomy,
  congenitalHeartDefectsAnatomy,
  // Procedure Illustrations (3)
  pediatricIVAccessProcedure,
  lumbarPuncturePositioning,
  immunizationScheduleProcedure,
  // Data Visualization (4)
  apgarScoringVisualization,
  growthPercentilesVisualization,
  developmentalMilestonesVisualization,
  pediatricVitalSignsVisualization,
];

export default pediatricsTemplates;
