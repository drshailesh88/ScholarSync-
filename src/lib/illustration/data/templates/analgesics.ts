/**
 * Analgesics Template Library
 * Diagram templates for pain medication drug classes
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// PAIN MANAGEMENT DIAGRAMS
// =============================================================================

export const painLadder: DiagramTemplate = {
  id: 'analg-who-pain-ladder',
  name: 'WHO Pain Ladder',
  description: 'WHO three-step analgesic ladder for pain management',
  domain: 'medicine',
  promptTemplate: `Create a WHO pain ladder diagram:
- Step 1 medications: {{step1}}
- Step 2 medications: {{step2}}
- Step 3 medications: {{step3}}
- Adjuvant therapies: {{adjuvants}}
- Assessment scales: {{assessmentScales}}
{{#additionalNotes}}Additional guidance: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['step1', 'step2', 'step3', 'adjuvants', 'assessmentScales', 'additionalNotes'],
  mermaidExample: `flowchart BT
    A["Step 1: Non-opioid\\nNSAIDs, Acetaminophen"] --> B["Step 2: Weak Opioid\\nCodeine, Tramadol"]
    B --> C["Step 3: Strong Opioid\\nMorphine, Fentanyl"]
    D["Adjuvants at All Steps"] --> A & B & C
    style C fill:#F44336,color:#fff
    style B fill:#FF9800,color:#fff
    style A fill:#4CAF50,color:#fff`
};

export const opioidConversionChart: DiagramTemplate = {
  id: 'analg-opioid-conversion',
  name: 'Opioid Equianalgesic Conversion',
  description: 'Chart for converting between different opioid medications',
  domain: 'medicine',
  promptTemplate: `Create an opioid conversion chart:
- Starting opioid: {{startingOpioid}}
- Target opioid: {{targetOpioid}}
- Oral morphine equivalent: {{morphineEquivalent}}
- Conversion ratio: {{conversionRatio}}
- Cross-tolerance adjustment: {{crossTolerance}}
- Route conversion factors: {{routeFactors}}
{{#additionalNotes}}Safety considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['startingOpioid', 'targetOpioid', 'morphineEquivalent', 'conversionRatio', 'crossTolerance', 'routeFactors', 'additionalNotes'],
  mermaidExample: `flowchart LR
    A["Oral Morphine\\n30mg"] --> B["Oral Oxycodone\\n20mg"]
    A --> C["Oral Hydromorphone\\n6mg"]
    A --> D["IV Morphine\\n10mg"]
    A --> E["Fentanyl Patch\\n12.5mcg/h"]
    style A fill:#673AB7,color:#fff`
};

export const opioidTaperingProtocol: DiagramTemplate = {
  id: 'analg-opioid-taper',
  name: 'Opioid Tapering Protocol',
  description: 'Guideline for safely tapering opioid medications',
  domain: 'medicine',
  promptTemplate: `Create an opioid tapering protocol:
- Current opioid dose: {{currentDose}}
- Taper rate: {{taperRate}}
- Monitoring frequency: {{monitoringFrequency}}
- Withdrawal management: {{withdrawalManagement}}
- Support resources: {{supportResources}}
{{#additionalNotes}}Individualization factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['currentDose', 'taperRate', 'monitoringFrequency', 'withdrawalManagement', 'supportResources', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Taper Decision"] --> B{"Duration of Use"}
    B -->|"<1 month"| C["10% every 3-7 days"]
    B -->|"1-6 months"| D["10% every 1-2 weeks"]
    B -->|">6 months"| E["10% every 2-4 weeks"]
    C & D & E --> F["Monitor for Withdrawal"]
    F --> G["Adjust Rate as Needed"]`
};

export const nsaidSafetyChart: DiagramTemplate = {
  id: 'analg-nsaid-safety',
  name: 'NSAID Safety Comparison',
  description: 'Chart comparing safety profiles of different NSAIDs',
  domain: 'medicine',
  promptTemplate: `Create an NSAID safety comparison:
- NSAIDs to compare: {{nsaids}}
- GI risk profile: {{giRisk}}
- Cardiovascular risk: {{cvRisk}}
- Renal considerations: {{renalConsiderations}}
- Drug interactions: {{interactions}}
{{#additionalNotes}}Patient selection factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['nsaids', 'giRisk', 'cvRisk', 'renalConsiderations', 'interactions', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["NSAID Selection"] --> B{"CV Risk?"}
    B -->|"High"| C["Avoid NSAIDs\\nor Naproxen"]
    B -->|"Low"| D{"GI Risk?"}
    D -->|"High"| E["COX-2 or\\nNSAID + PPI"]
    D -->|"Low"| F["Standard NSAID"]
    style C fill:#F44336,color:#fff`
};

export const multimodalAnalgesia: DiagramTemplate = {
  id: 'analg-multimodal',
  name: 'Multimodal Analgesia Protocol',
  description: 'Framework for multimodal pain management approach',
  domain: 'medicine',
  promptTemplate: `Create a multimodal analgesia diagram:
- Pharmacological components: {{pharmacological}}
- Non-pharmacological interventions: {{nonPharmacological}}
- Regional techniques: {{regionalTechniques}}
- Opioid-sparing strategies: {{opioidSparing}}
- Patient education: {{patientEducation}}
{{#additionalNotes}}Procedure-specific protocols: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['pharmacological', 'nonPharmacological', 'regionalTechniques', 'opioidSparing', 'patientEducation', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Multimodal Analgesia"] --> B["Acetaminophen"]
    A --> C["NSAIDs"]
    A --> D["Regional Block"]
    A --> E["Gabapentinoids"]
    A --> F["Opioid PRN"]
    B & C & D & E --> G["Reduced Opioid\\nRequirement"]
    style G fill:#4CAF50,color:#fff`
};

export const neuropathicPainAlgorithm: DiagramTemplate = {
  id: 'analg-neuropathic-pain',
  name: 'Neuropathic Pain Treatment Algorithm',
  description: 'Stepwise approach to managing neuropathic pain',
  domain: 'medicine',
  promptTemplate: `Create a neuropathic pain treatment algorithm:
- First-line agents: {{firstLine}}
- Second-line agents: {{secondLine}}
- Third-line agents: {{thirdLine}}
- Topical options: {{topicalOptions}}
- Interventional options: {{interventional}}
{{#additionalNotes}}Specific syndromes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['firstLine', 'secondLine', 'thirdLine', 'topicalOptions', 'interventional', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Neuropathic Pain"] --> B["First Line"]
    B --> B1["Gabapentin/Pregabalin\\nor SNRI"]
    B1 --> C{"Adequate\\nRelief?"}
    C -->|"No"| D["Add Second Agent\\nor Switch Class"]
    D --> E["Third Line:\\nTramadol, Opioids"]
    C -->|"Yes"| F["Maintain Therapy"]`
};

export const pcaProtocol: DiagramTemplate = {
  id: 'analg-pca-protocol',
  name: 'PCA Programming Protocol',
  description: 'Protocol for patient-controlled analgesia setup and monitoring',
  domain: 'medicine',
  promptTemplate: `Create a PCA protocol:
- Medication selection: {{medication}}
- Demand dose: {{demandDose}}
- Lockout interval: {{lockoutInterval}}
- Basal rate considerations: {{basalRate}}
- Maximum doses: {{maxDoses}}
- Monitoring parameters: {{monitoring}}
{{#additionalNotes}}High-risk patient modifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['medication', 'demandDose', 'lockoutInterval', 'basalRate', 'maxDoses', 'monitoring', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["PCA Order"] --> B["Opioid-Naive?"]
    B -->|"Yes"| C["No Basal\\nDemand Only"]
    B -->|"No"| D["Consider Basal\\nConvert from Prior"]
    C & D --> E["Standard Settings"]
    E --> F["Morphine 1mg\\nq6min lockout"]
    E --> G["Hydromorphone 0.2mg\\nq6min lockout"]
    F & G --> H["RN Assessment q4h"]`
};

export const opioidNaiveInitiation: DiagramTemplate = {
  id: 'analg-opioid-initiation',
  name: 'Opioid-Naive Patient Initiation',
  description: 'Safe initiation of opioids in opioid-naive patients',
  domain: 'medicine',
  promptTemplate: `Create an opioid initiation protocol:
- Pain assessment: {{painAssessment}}
- Starting agent: {{startingAgent}}
- Starting dose: {{startingDose}}
- Titration schedule: {{titration}}
- Monitoring requirements: {{monitoring}}
- Rescue medication: {{rescueMed}}
{{#additionalNotes}}Risk mitigation: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['painAssessment', 'startingAgent', 'startingDose', 'titration', 'monitoring', 'rescueMed', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Opioid-Naive Patient"] --> B["Start Low"]
    B --> C["Morphine IR\\n5-10mg PO q4h PRN"]
    C --> D["Assess in 24-48h"]
    D --> E{"Pain Controlled?"}
    E -->|"No"| F["Increase by\\n25-50%"]
    E -->|"Yes"| G["Convert to\\nLong-Acting?"]
    style B fill:#4CAF50,color:#fff`
};

export const opioidOverdoseManagement: DiagramTemplate = {
  id: 'analg-overdose-management',
  name: 'Opioid Overdose Management',
  description: 'Protocol for recognizing and treating opioid overdose',
  domain: 'medicine',
  promptTemplate: `Create an opioid overdose management protocol:
- Recognition signs: {{recognitionSigns}}
- Initial response: {{initialResponse}}
- Naloxone dosing: {{naloxoneDosing}}
- Repeat dosing criteria: {{repeatDosing}}
- Monitoring duration: {{monitoringDuration}}
{{#additionalNotes}}Discharge considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['recognitionSigns', 'initialResponse', 'naloxoneDosing', 'repeatDosing', 'monitoringDuration', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Suspected Overdose"] --> B["Check Responsiveness\\nBreathing"]
    B --> C["Call for Help\\nBegin BLS"]
    C --> D["Naloxone 0.4mg\\nIM/IV/IN"]
    D --> E{"Response?"}
    E -->|"No"| F["Repeat q2-3min\\nup to 10mg"]
    E -->|"Yes"| G["Monitor 2-4h"]
    style A fill:#F44336,color:#fff`
};

export const localAnestheticToxicity: DiagramTemplate = {
  id: 'analg-last-protocol',
  name: 'Local Anesthetic Systemic Toxicity (LAST)',
  description: 'Protocol for recognizing and treating LAST',
  domain: 'medicine',
  promptTemplate: `Create a LAST treatment protocol:
- Warning signs: {{warningSigns}}
- CNS symptoms: {{cnsSymptoms}}
- Cardiovascular symptoms: {{cvSymptoms}}
- Lipid emulsion dosing: {{lipidEmulsion}}
- Supportive care: {{supportiveCare}}
{{#additionalNotes}}Prevention strategies: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['warningSigns', 'cnsSymptoms', 'cvSymptoms', 'lipidEmulsion', 'supportiveCare', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["LAST Suspected"] --> B["Stop Injection\\nCall for Help"]
    B --> C["Airway Management"]
    C --> D["Lipid Emulsion 20%"]
    D --> E["Bolus 1.5 mL/kg"]
    E --> F["Infusion 0.25 mL/kg/min"]
    D --> G["Avoid:\\nVasopressin\\nBB, CCB\\nLidocaine"]
    style A fill:#F44336,color:#fff`
};

export const chronicPainAssessment: DiagramTemplate = {
  id: 'analg-chronic-pain-assessment',
  name: 'Chronic Pain Assessment',
  description: 'Comprehensive assessment framework for chronic pain',
  domain: 'medicine',
  promptTemplate: `Create a chronic pain assessment framework:
- Pain characteristics: {{painCharacteristics}}
- Functional assessment: {{functionalAssessment}}
- Psychological screening: {{psychScreening}}
- Substance use screening: {{substanceScreening}}
- Prior treatments: {{priorTreatments}}
{{#additionalNotes}}Diagnostic workup: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['painCharacteristics', 'functionalAssessment', 'psychScreening', 'substanceScreening', 'priorTreatments', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Chronic Pain\\nAssessment"] --> B["Pain History"]
    A --> C["Functional Status"]
    A --> D["Psychological Screen"]
    A --> E["Risk Assessment"]
    B --> B1["Location, Quality\\nIntensity, Duration"]
    D --> D1["PHQ-9, GAD-7"]
    E --> E1["ORT, SOAPP"]`
};

export const painManagementPlan: DiagramTemplate = {
  id: 'analg-pain-management-plan',
  name: 'Pain Management Plan',
  description: 'Comprehensive pain management treatment plan template',
  domain: 'medicine',
  promptTemplate: `Create a pain management plan:
- Diagnosis: {{diagnosis}}
- Treatment goals: {{treatmentGoals}}
- Pharmacological therapy: {{pharmacological}}
- Non-pharmacological therapy: {{nonPharmacological}}
- Functional goals: {{functionalGoals}}
- Follow-up schedule: {{followUp}}
{{#additionalNotes}}Monitoring parameters: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['diagnosis', 'treatmentGoals', 'pharmacological', 'nonPharmacological', 'functionalGoals', 'followUp', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Treatment Plan"] --> B["Goals"]
    B --> B1["Pain: 4/10"]
    B --> B2["Walk 30 min/day"]
    A --> C["Interventions"]
    C --> C1["Medications"]
    C --> C2["Physical Therapy"]
    C --> C3["CBT"]
    A --> D["Follow-up\\n4 weeks"]`
};

export const ketamineInfusionProtocol: DiagramTemplate = {
  id: 'analg-ketamine-protocol',
  name: 'Low-Dose Ketamine Infusion Protocol',
  description: 'Protocol for ketamine infusion for pain management',
  domain: 'medicine',
  promptTemplate: `Create a ketamine infusion protocol:
- Indications: {{indications}}
- Bolus dose: {{bolusDose}}
- Infusion rate: {{infusionRate}}
- Maximum duration: {{maxDuration}}
- Monitoring requirements: {{monitoring}}
- Contraindications: {{contraindications}}
{{#additionalNotes}}Adverse effect management: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['indications', 'bolusDose', 'infusionRate', 'maxDuration', 'monitoring', 'contraindications', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Low-Dose Ketamine"] --> B["Bolus 0.1-0.5mg/kg"]
    B --> C["Infusion 0.1-0.3mg/kg/h"]
    C --> D["Monitor q1h"]
    D --> E["Assess Pain\\nSide Effects"]
    E --> F{"Effective?"}
    F -->|"Yes"| G["Continue up to 48h"]
    F -->|"No"| H["Titrate or D/C"]`
};

export const postopPainPathway: DiagramTemplate = {
  id: 'analg-postop-pathway',
  name: 'Postoperative Pain Management Pathway',
  description: 'Standardized pathway for postoperative pain management',
  domain: 'medicine',
  promptTemplate: `Create a postoperative pain pathway:
- Procedure type: {{procedureType}}
- Preoperative optimization: {{preoperative}}
- Intraoperative techniques: {{intraoperative}}
- PACU management: {{pacuManagement}}
- Floor management: {{floorManagement}}
- Discharge planning: {{discharge}}
{{#additionalNotes}}ERAS integration: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['procedureType', 'preoperative', 'intraoperative', 'pacuManagement', 'floorManagement', 'discharge', 'additionalNotes'],
  mermaidExample: `flowchart LR
    A["Preop"] --> B["Intraop"] --> C["PACU"] --> D["Floor"] --> E["Discharge"]
    A -->|"Education\\nPremed"| A1["Gabapentin\\nAcetaminophen"]
    B -->|"Block\\nMultimodal"| B1["Regional\\nKetamine"]
    C -->|"Assess\\nTitrate"| C1["PCA\\nMultimodal"]
    D -->|"Transition"| D1["Oral\\nPRN Opioid"]
    E -->|"Prescribe\\nEducate"| E1["Limited Opioid\\nFollow-up"]`
};

export const opioidRiskAssessment: DiagramTemplate = {
  id: 'analg-opioid-risk',
  name: 'Opioid Prescribing Risk Assessment',
  description: 'Risk stratification for chronic opioid therapy',
  domain: 'medicine',
  promptTemplate: `Create an opioid risk assessment tool:
- Risk factors: {{riskFactors}}
- Screening tools: {{screeningTools}}
- Monitoring requirements by risk: {{monitoringByRisk}}
- Risk mitigation strategies: {{riskMitigation}}
- Naloxone co-prescribing: {{naloxoneCriteria}}
{{#additionalNotes}}Documentation requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['riskFactors', 'screeningTools', 'monitoringByRisk', 'riskMitigation', 'naloxoneCriteria', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Risk Assessment"] --> B["ORT/SOAPP Score"]
    B --> C{"Risk Level"}
    C -->|"Low"| D["Standard Monitoring\\nQ3 month visits"]
    C -->|"Moderate"| E["Enhanced Monitoring\\nMonthly UDS"]
    C -->|"High"| F["Consider Alternatives\\nPain Specialist"]
    D & E & F --> G["Naloxone if >50 MME"]`
};

export const migraineAcuteTreatment: DiagramTemplate = {
  id: 'analg-migraine-acute',
  name: 'Acute Migraine Treatment Algorithm',
  description: 'Stepwise approach to acute migraine management',
  domain: 'medicine',
  promptTemplate: `Create an acute migraine treatment algorithm:
- Severity assessment: {{severityAssessment}}
- First-line options: {{firstLineOptions}}
- Triptan selection: {{triptanSelection}}
- Rescue medications: {{rescueMedications}}
- Refractory management: {{refractoryManagement}}
{{#additionalNotes}}Emergency criteria: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['severityAssessment', 'firstLineOptions', 'triptanSelection', 'rescueMedications', 'refractoryManagement', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Acute Migraine"] --> B{"Severity?"}
    B -->|"Mild"| C["NSAIDs\\nAcetaminophen"]
    B -->|"Moderate"| D["Triptan"]
    B -->|"Severe"| E["Triptan +\\nAntiemetic"]
    C --> F{"Relief?"}
    F -->|"No"| D
    D --> G{"Relief?"}
    G -->|"No"| H["Rescue:\\nDHE, Ketorolac"]`
};

export const cancerPainManagement: DiagramTemplate = {
  id: 'analg-cancer-pain',
  name: 'Cancer Pain Management Protocol',
  description: 'Comprehensive approach to cancer pain management',
  domain: 'medicine',
  promptTemplate: `Create a cancer pain management protocol:
- Pain assessment: {{painAssessment}}
- Baseline opioid selection: {{baselineOpioid}}
- Breakthrough dosing: {{breakthroughDosing}}
- Adjuvant medications: {{adjuvants}}
- Interventional options: {{interventional}}
- Palliative considerations: {{palliative}}
{{#additionalNotes}}End-of-life care: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['painAssessment', 'baselineOpioid', 'breakthroughDosing', 'adjuvants', 'interventional', 'palliative', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Cancer Pain"] --> B["Baseline + PRN"]
    B --> C["Long-acting Opioid"]
    B --> D["Breakthrough 10-15%\\nof daily dose"]
    C & D --> E["Adjuvants"]
    E --> F["Gabapentin\\nSteroids\\nNSAIDs"]
    E --> G["Interventional"]
    G --> H["Nerve Blocks\\nIntrathecal Pump"]`
};

export const fibromyalgiaTreatment: DiagramTemplate = {
  id: 'analg-fibromyalgia',
  name: 'Fibromyalgia Treatment Algorithm',
  description: 'Multimodal approach to fibromyalgia management',
  domain: 'medicine',
  promptTemplate: `Create a fibromyalgia treatment algorithm:
- Diagnostic criteria: {{diagnosticCriteria}}
- Non-pharmacological: {{nonPharmacological}}
- First-line medications: {{firstLineMeds}}
- Second-line options: {{secondLineOptions}}
- Combination strategies: {{combinationStrategies}}
{{#additionalNotes}}Comorbidity management: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['diagnosticCriteria', 'nonPharmacological', 'firstLineMeds', 'secondLineOptions', 'combinationStrategies', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Fibromyalgia"] --> B["Non-Pharmacological"]
    B --> C["Exercise\\nCBT\\nSleep Hygiene"]
    A --> D["Pharmacological"]
    D --> E["Duloxetine\\nPregabalin\\nMilnacipran"]
    E --> F{"Response?"}
    F -->|"No"| G["Combine or\\nAdd Cyclobenzaprine"]`
};

export const proceduralSedation: DiagramTemplate = {
  id: 'analg-procedural-sedation',
  name: 'Procedural Sedation Protocol',
  description: 'Protocol for procedural sedation and analgesia',
  domain: 'medicine',
  promptTemplate: `Create a procedural sedation protocol:
- Patient assessment: {{patientAssessment}}
- Fasting requirements: {{fastingRequirements}}
- Medication selection: {{medicationSelection}}
- Monitoring requirements: {{monitoring}}
- Discharge criteria: {{dischargeCriteria}}
{{#additionalNotes}}Emergency equipment: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['patientAssessment', 'fastingRequirements', 'medicationSelection', 'monitoring', 'dischargeCriteria', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Procedure Planned"] --> B["ASA Assessment"]
    B --> C{"ASA 1-2?"}
    C -->|"Yes"| D["Proceed with\\nModerate Sedation"]
    C -->|"No"| E["Anesthesia Consult"]
    D --> F["Propofol or\\nKetamine"]
    F --> G["Continuous Monitoring"]
    G --> H["Discharge Criteria:\\nAwake, Stable Vitals"]`
};

export const epiduralAnalgesia: DiagramTemplate = {
  id: 'analg-epidural',
  name: 'Epidural Analgesia Management',
  description: 'Protocol for epidural analgesia administration and monitoring',
  domain: 'medicine',
  promptTemplate: `Create an epidural analgesia protocol:
- Indications: {{indications}}
- Medication mixture: {{medicationMixture}}
- Rate and bolus settings: {{rateSettings}}
- Monitoring parameters: {{monitoringParameters}}
- Complication management: {{complicationManagement}}
{{#additionalNotes}}Transition to oral: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['indications', 'medicationMixture', 'rateSettings', 'monitoringParameters', 'complicationManagement', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Epidural Placed"] --> B["Standard Infusion"]
    B --> C["Bupivacaine 0.1%\\n+ Fentanyl 2mcg/mL"]
    C --> D["Rate 6-10 mL/h"]
    D --> E["Monitor q4h"]
    E --> F["Motor Function\\nSensory Level\\nBP, Sedation"]
    E --> G{"Complications?"}
    G -->|"Hypotension"| H["Fluid, Ephedrine"]
    G -->|"High Block"| I["Stop Infusion"]`
};

export const peripheralNerveBlock: DiagramTemplate = {
  id: 'analg-nerve-block',
  name: 'Peripheral Nerve Block Selection',
  description: 'Guide for selecting appropriate peripheral nerve blocks',
  domain: 'medicine',
  promptTemplate: `Create a nerve block selection guide:
- Surgical site: {{surgicalSite}}
- Block options: {{blockOptions}}
- Local anesthetic choice: {{localAnesthetic}}
- Duration considerations: {{durationConsiderations}}
- Catheter placement: {{catheterPlacement}}
{{#additionalNotes}}Ultrasound guidance: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['surgicalSite', 'blockOptions', 'localAnesthetic', 'durationConsiderations', 'catheterPlacement', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Surgery Site"] --> B{"Location?"}
    B -->|"Shoulder"| C["Interscalene"]
    B -->|"Hand/Forearm"| D["Supraclavicular\\nAxillary"]
    B -->|"Knee"| E["Adductor Canal\\n+ IPACK"]
    B -->|"Foot/Ankle"| F["Popliteal Sciatic"]
    C & D & E & F --> G["Choose LA"]
    G --> H["Ropivacaine 0.5%\\nor Bupivacaine 0.25%"]`
};

export const opioidInducedHyperalgesia: DiagramTemplate = {
  id: 'analg-oih',
  name: 'Opioid-Induced Hyperalgesia Management',
  description: 'Recognition and management of opioid-induced hyperalgesia',
  domain: 'medicine',
  promptTemplate: `Create an OIH management protocol:
- Recognition criteria: {{recognitionCriteria}}
- Differentiation from tolerance: {{toleranceDiff}}
- Management strategies: {{managementStrategies}}
- Opioid rotation: {{opioidRotation}}
- NMDA antagonists: {{nmdaAntagonists}}
{{#additionalNotes}}Prevention strategies: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['recognitionCriteria', 'toleranceDiff', 'managementStrategies', 'opioidRotation', 'nmdaAntagonists', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Increased Pain\\nDespite Dose Escalation"] --> B{"OIH vs Tolerance?"}
    B -->|"OIH"| C["Reduce Opioid"]
    B -->|"Tolerance"| D["Increase Opioid"]
    C --> E["Add NMDA Antagonist"]
    E --> F["Ketamine\\nMethadone"]
    C --> G["Opioid Rotation"]
    G --> H["Reduce MME by 25-50%"]`
};

export const intrathecalPump: DiagramTemplate = {
  id: 'analg-intrathecal-pump',
  name: 'Intrathecal Drug Delivery System',
  description: 'Protocol for intrathecal pump management in chronic pain',
  domain: 'medicine',
  promptTemplate: `Create an intrathecal pump protocol:
- Patient selection: {{patientSelection}}
- Trial process: {{trialProcess}}
- Medication options: {{medicationOptions}}
- Dosing algorithms: {{dosingAlgorithms}}
- Complication monitoring: {{complicationMonitoring}}
{{#additionalNotes}}Refill schedule: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['patientSelection', 'trialProcess', 'medicationOptions', 'dosingAlgorithms', 'complicationMonitoring', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Refractory Pain\\nOpioid Tolerant"] --> B["Trial"]
    B --> C["IT Morphine\\nBolus or Infusion"]
    C --> D{">50% Relief?"}
    D -->|"Yes"| E["Pump Implant"]
    D -->|"No"| F["Not Candidate"]
    E --> G["Medications"]
    G --> H["Morphine\\nZiconotide\\nBupivacaine"]`
};

export const buprenorphinePrescribing: DiagramTemplate = {
  id: 'analg-buprenorphine',
  name: 'Buprenorphine Prescribing for Pain',
  description: 'Protocol for using buprenorphine in chronic pain management',
  domain: 'medicine',
  promptTemplate: `Create a buprenorphine pain protocol:
- Indications: {{indications}}
- Formulation selection: {{formulationSelection}}
- Conversion from other opioids: {{conversion}}
- Titration schedule: {{titration}}
- Considerations for OUD: {{oudConsiderations}}
{{#additionalNotes}}DEA requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['indications', 'formulationSelection', 'conversion', 'titration', 'oudConsiderations', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Chronic Pain\\nOpioid Candidate"] --> B{"OUD Risk?"}
    B -->|"High"| C["Buprenorphine\\nPreferred"]
    B -->|"Low"| D["Standard Opioid\\nor Buprenorphine"]
    C --> E["Formulation"]
    E --> F["Transdermal\\n(Butrans)"]
    E --> G["Buccal\\n(Belbuca)"]
    E --> H["SL\\n(off-label)"]`
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

export const analgesicsTemplates: DiagramTemplate[] = [
  painLadder,
  opioidConversionChart,
  opioidTaperingProtocol,
  nsaidSafetyChart,
  multimodalAnalgesia,
  neuropathicPainAlgorithm,
  pcaProtocol,
  opioidNaiveInitiation,
  opioidOverdoseManagement,
  localAnestheticToxicity,
  chronicPainAssessment,
  painManagementPlan,
  ketamineInfusionProtocol,
  postopPainPathway,
  opioidRiskAssessment,
  migraineAcuteTreatment,
  cancerPainManagement,
  fibromyalgiaTreatment,
  proceduralSedation,
  epiduralAnalgesia,
  peripheralNerveBlock,
  opioidInducedHyperalgesia,
  intrathecalPump,
  buprenorphinePrescribing,
];

export default analgesicsTemplates;
