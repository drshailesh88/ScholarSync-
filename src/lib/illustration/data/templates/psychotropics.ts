/**
 * Psychotropics Template Library
 * Diagram templates for psychiatric medication drug classes
 */

import type { DiagramTemplate } from './index';

export const antidepressantSelection: DiagramTemplate = {
  id: 'psych-antidepressant-selection',
  name: 'Antidepressant Selection Algorithm',
  description: 'Algorithm for selecting antidepressant medications',
  domain: 'medicine',
  promptTemplate: `Create an antidepressant selection algorithm:
- Patient presentation: {{presentation}}
- Comorbidities: {{comorbidities}}
- First-line options: {{firstLine}}
- Augmentation strategies: {{augmentation}}
- Switch strategies: {{switchStrategies}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['presentation', 'comorbidities', 'firstLine', 'augmentation', 'switchStrategies', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["MDD Diagnosis"] --> B{"Anxiety\\nComorbid?"}
    B -->|"Yes"| C["SSRI\\n(Sertraline, Escitalopram)"]
    B -->|"No"| D["SSRI or\\nBupropion"]
    C & D --> E{"Response\\nat 4-6 weeks?"}
    E -->|"No"| F["Optimize Dose\\nor Switch"]`
};

export const antidepressantMechanisms: DiagramTemplate = {
  id: 'psych-ad-mechanisms',
  name: 'Antidepressant Mechanisms Comparison',
  description: 'Diagram comparing mechanisms of different antidepressant classes',
  domain: 'medicine',
  promptTemplate: `Create an antidepressant mechanism comparison:
- SSRI mechanism: {{ssriMechanism}}
- SNRI mechanism: {{snriMechanism}}
- TCA mechanism: {{tcaMechanism}}
- Atypical mechanisms: {{atypicalMechanisms}}
- Clinical correlates: {{clinicalCorrelates}}
{{#additionalNotes}}Receptor profiles: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['ssriMechanism', 'snriMechanism', 'tcaMechanism', 'atypicalMechanisms', 'clinicalCorrelates', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Antidepressant Classes"] --> B["SSRI"]
    A --> C["SNRI"]
    A --> D["TCA"]
    A --> E["Atypical"]
    B --> B1["5-HT Reuptake Block"]
    C --> C1["5-HT + NE Block"]
    D --> D1["Multiple Receptors"]
    E --> E1["Bupropion: DA/NE"]`
};

export const antipsychoticSelection: DiagramTemplate = {
  id: 'psych-antipsychotic-selection',
  name: 'Antipsychotic Selection Algorithm',
  description: 'Algorithm for selecting antipsychotic medications',
  domain: 'medicine',
  promptTemplate: `Create an antipsychotic selection algorithm:
- Indication: {{indication}}
- Positive symptoms: {{positiveSymptoms}}
- Negative symptoms: {{negativeSymptoms}}
- Metabolic risk: {{metabolicRisk}}
- Side effect priorities: {{sideEffectPriorities}}
{{#additionalNotes}}Clozapine criteria: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['indication', 'positiveSymptoms', 'negativeSymptoms', 'metabolicRisk', 'sideEffectPriorities', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Psychosis"] --> B{"Treatment\\nResistant?"}
    B -->|"No"| C["Second Generation AP"]
    B -->|"Yes"| D["Clozapine"]
    C --> E{"Metabolic\\nRisk?"}
    E -->|"High"| F["Aripiprazole\\nZiprasidone"]
    E -->|"Low"| G["Risperidone\\nQuetiapine"]`
};

export const moodStabilizerComparison: DiagramTemplate = {
  id: 'psych-mood-stabilizer',
  name: 'Mood Stabilizer Comparison',
  description: 'Comparison chart for mood stabilizer medications',
  domain: 'medicine',
  promptTemplate: `Create a mood stabilizer comparison:
- Lithium: {{lithium}}
- Valproate: {{valproate}}
- Lamotrigine: {{lamotrigine}}
- Carbamazepine: {{carbamazepine}}
- Monitoring requirements: {{monitoring}}
{{#additionalNotes}}Pregnancy considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['lithium', 'valproate', 'lamotrigine', 'carbamazepine', 'monitoring', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Bipolar Disorder"] --> B{"Mania or\\nDepression?"}
    B -->|"Mania"| C["Lithium\\nValproate"]
    B -->|"Depression"| D["Lamotrigine\\nQuetiapine"]
    B -->|"Mixed"| E["Valproate\\nAtypical AP"]
    C --> F["Monitor Levels"]`
};

export const benzodiazepineEquivalence: DiagramTemplate = {
  id: 'psych-benzo-equivalence',
  name: 'Benzodiazepine Equivalence Chart',
  description: 'Conversion chart for benzodiazepine medications',
  domain: 'medicine',
  promptTemplate: `Create a benzodiazepine equivalence chart:
- Diazepam equivalents: {{diazepamEquiv}}
- Half-life comparison: {{halfLifeComparison}}
- Onset of action: {{onsetAction}}
- Tapering considerations: {{taperingConsiderations}}
- High-risk combinations: {{highRiskCombinations}}
{{#additionalNotes}}Withdrawal management: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['diazepamEquiv', 'halfLifeComparison', 'onsetAction', 'taperingConsiderations', 'highRiskCombinations', 'additionalNotes'],
  mermaidExample: `flowchart LR
    A["Diazepam 10mg"] --> B["Lorazepam 1mg"]
    A --> C["Alprazolam 0.5mg"]
    A --> D["Clonazepam 0.5mg"]
    B --> E["Short T1/2"]
    D --> F["Long T1/2"]`
};

export const lithiumMonitoring: DiagramTemplate = {
  id: 'psych-lithium-monitoring',
  name: 'Lithium Monitoring Protocol',
  description: 'Protocol for monitoring lithium therapy',
  domain: 'medicine',
  promptTemplate: `Create a lithium monitoring protocol:
- Target levels: {{targetLevels}}
- Baseline labs: {{baselineLabs}}
- Ongoing monitoring: {{ongoingMonitoring}}
- Toxicity signs: {{toxicitySigns}}
- Drug interactions: {{drugInteractions}}
{{#additionalNotes}}Dose adjustment: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['targetLevels', 'baselineLabs', 'ongoingMonitoring', 'toxicitySigns', 'drugInteractions', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Lithium Started"] --> B["Baseline"]
    B --> B1["BMP, TSH, Ca\\nECG, Pregnancy"]
    B --> C["Week 1"]
    C --> D["Steady State Level"]
    D --> E{"Level 0.6-1.2?"}
    E -->|"Yes"| F["Monitor q3-6mo"]
    E -->|"No"| G["Adjust Dose"]`
};

export const antidepressantDiscontinuation: DiagramTemplate = {
  id: 'psych-ad-discontinuation',
  name: 'Antidepressant Discontinuation Syndrome',
  description: 'Protocol for managing antidepressant discontinuation',
  domain: 'medicine',
  promptTemplate: `Create an antidepressant discontinuation protocol:
- High-risk medications: {{highRiskMeds}}
- Symptoms: {{symptoms}}
- Prevention: {{prevention}}
- Management: {{management}}
- Reinstatement criteria: {{reinstatement}}
{{#additionalNotes}}Timeline: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['highRiskMeds', 'symptoms', 'prevention', 'management', 'reinstatement', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Discontinue AD"] --> B{"Taper\\nGradually?"}
    B -->|"Yes"| C["Lower Risk"]
    B -->|"No"| D["Discontinuation\\nSyndrome"]
    D --> E["FINISH Symptoms"]
    E --> F["Flu-like, Insomnia\\nNausea, Imbalance\\nSensory, Hyperarousal"]
    F --> G["Restart AD\\nor Slow Taper"]`
};

export const serotoninSyndrome: DiagramTemplate = {
  id: 'psych-serotonin-syndrome',
  name: 'Serotonin Syndrome Recognition and Management',
  description: 'Algorithm for identifying and treating serotonin syndrome',
  domain: 'medicine',
  promptTemplate: `Create a serotonin syndrome algorithm:
- Common drug combinations: {{drugCombinations}}
- Clinical features: {{clinicalFeatures}}
- Hunter criteria: {{hunterCriteria}}
- Severity grading: {{severityGrading}}
- Treatment approach: {{treatment}}
{{#additionalNotes}}Differential diagnosis: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['drugCombinations', 'clinicalFeatures', 'hunterCriteria', 'severityGrading', 'treatment', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Serotonergic Drug\\n+ Symptoms"] --> B["Hunter Criteria"]
    B --> C["Clonus"]
    B --> D["Tremor + Hyperreflexia"]
    B --> E["Agitation + Diaphoresis"]
    C & D & E --> F["Serotonin Syndrome"]
    F --> G["Stop Offending Agent\\nSupportive Care"]
    G --> H["Cyproheptadine if Severe"]`
};

export const adhdMedicationSelection: DiagramTemplate = {
  id: 'psych-adhd-selection',
  name: 'ADHD Medication Selection',
  description: 'Algorithm for selecting ADHD medications',
  domain: 'medicine',
  promptTemplate: `Create an ADHD medication selection algorithm:
- Age group: {{ageGroup}}
- First-line stimulants: {{firstLineStimulants}}
- Non-stimulant options: {{nonStimulants}}
- Monitoring requirements: {{monitoring}}
- Abuse risk assessment: {{abuseRisk}}
{{#additionalNotes}}Comorbidity considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['ageGroup', 'firstLineStimulants', 'nonStimulants', 'monitoring', 'abuseRisk', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["ADHD Diagnosis"] --> B{"Substance\\nUse History?"}
    B -->|"No"| C["Stimulant"]
    B -->|"Yes"| D["Non-Stimulant"]
    C --> E["Methylphenidate\\nor Amphetamine"]
    D --> F["Atomoxetine\\nor Guanfacine"]
    E --> G["Monitor: HR, BP\\nWeight, Height"]`
};

export const antipsychoticSideEffects: DiagramTemplate = {
  id: 'psych-ap-side-effects',
  name: 'Antipsychotic Side Effect Comparison',
  description: 'Comparison of side effect profiles across antipsychotics',
  domain: 'medicine',
  promptTemplate: `Create an antipsychotic side effect comparison:
- EPS risk by drug: {{epsRisk}}
- Metabolic risk: {{metabolicRisk}}
- QTc prolongation: {{qtcRisk}}
- Sedation: {{sedation}}
- Prolactin elevation: {{prolactin}}
{{#additionalNotes}}Monitoring protocols: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['epsRisk', 'metabolicRisk', 'qtcRisk', 'sedation', 'prolactin', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph High["High Metabolic Risk"]
        A["Olanzapine"] & B["Clozapine"]
    end
    subgraph Medium["Medium Risk"]
        C["Quetiapine"] & D["Risperidone"]
    end
    subgraph Low["Low Risk"]
        E["Aripiprazole"] & F["Ziprasidone"]
    end`
};

export const clozapineProtocol: DiagramTemplate = {
  id: 'psych-clozapine-protocol',
  name: 'Clozapine Initiation and Monitoring',
  description: 'Protocol for clozapine therapy initiation and monitoring',
  domain: 'medicine',
  promptTemplate: `Create a clozapine protocol:
- Indications: {{indications}}
- REMS requirements: {{remsRequirements}}
- ANC monitoring: {{ancMonitoring}}
- Titration schedule: {{titration}}
- Side effect management: {{sideEffectManagement}}
{{#additionalNotes}}Emergency protocols: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['indications', 'remsRequirements', 'ancMonitoring', 'titration', 'sideEffectManagement', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Clozapine Initiation"] --> B["REMS Enrollment"]
    B --> C["Baseline ANC"]
    C --> D["Start 12.5mg"]
    D --> E["Weekly ANC\\nx 6 months"]
    E --> F["Biweekly ANC\\nx 6 months"]
    F --> G["Monthly ANC\\nOngoing"]
    E --> H{"ANC <1500?"}
    H -->|"Yes"| I["Hold/Discontinue"]`
};

export const psychiatricEmergencies: DiagramTemplate = {
  id: 'psych-emergencies',
  name: 'Psychiatric Emergency Medication Protocols',
  description: 'Protocols for pharmacological management of psychiatric emergencies',
  domain: 'medicine',
  promptTemplate: `Create a psychiatric emergency protocol:
- Agitation management: {{agitationManagement}}
- Verbal de-escalation: {{verbalDeescalation}}
- Medication options: {{medicationOptions}}
- Route considerations: {{routeConsiderations}}
- Monitoring: {{monitoring}}
{{#additionalNotes}}Restraint guidelines: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['agitationManagement', 'verbalDeescalation', 'medicationOptions', 'routeConsiderations', 'monitoring', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Acute Agitation"] --> B["Verbal De-escalation"]
    B --> C{"Cooperative?"}
    C -->|"Yes"| D["PO Medication"]
    C -->|"No"| E["IM Medication"]
    D --> F["Olanzapine ODT\\nor Lorazepam"]
    E --> G["Haloperidol +\\nLorazepam +\\nDiphenhydramine"]`
};

export const maoiDietRestrictions: DiagramTemplate = {
  id: 'psych-maoi-diet',
  name: 'MAOI Diet and Drug Restrictions',
  description: 'Guide to dietary and medication restrictions with MAOIs',
  domain: 'medicine',
  promptTemplate: `Create an MAOI restriction guide:
- Foods to avoid: {{foodsToAvoid}}
- Medications to avoid: {{medsToAvoid}}
- Tyramine reaction symptoms: {{tyramineReaction}}
- Treatment of hypertensive crisis: {{hypertensiveCrisis}}
- Washout periods: {{washoutPeriods}}
{{#additionalNotes}}Safe alternatives: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['foodsToAvoid', 'medsToAvoid', 'tyramineReaction', 'hypertensiveCrisis', 'washoutPeriods', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["MAOI Therapy"] --> B["Avoid Tyramine"]
    B --> C["Aged Cheese"]
    B --> D["Cured Meats"]
    B --> E["Tap Beer"]
    A --> F["Avoid Drugs"]
    F --> G["Sympathomimetics"]
    F --> H["Serotonergics"]`
};

export const depressionTreatmentResistant: DiagramTemplate = {
  id: 'psych-trd',
  name: 'Treatment-Resistant Depression Algorithm',
  description: 'Stepwise approach to treatment-resistant depression',
  domain: 'medicine',
  promptTemplate: `Create a TRD treatment algorithm:
- Definition of TRD: {{trdDefinition}}
- Optimization strategies: {{optimization}}
- Augmentation options: {{augmentation}}
- Switch strategies: {{switchStrategies}}
- Neuromodulation: {{neuromodulation}}
{{#additionalNotes}}Esketamine criteria: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['trdDefinition', 'optimization', 'augmentation', 'switchStrategies', 'neuromodulation', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Inadequate Response\\nto 2+ ADs"] --> B["Optimize Current"]
    B --> C["Augment"]
    C --> C1["Lithium"] & C2["Atypical AP"] & C3["Thyroid"]
    C --> D["Switch Class"]
    D --> E["Neuromodulation"]
    E --> E1["TMS"] & E2["ECT"]
    E --> F["Esketamine"]`
};

export const psychotropicPregnancy: DiagramTemplate = {
  id: 'psych-pregnancy',
  name: 'Psychotropic Medications in Pregnancy',
  description: 'Guide for psychotropic medication use during pregnancy',
  domain: 'medicine',
  promptTemplate: `Create a pregnancy psychotropic guide:
- Risk-benefit discussion: {{riskBenefit}}
- Antidepressants: {{antidepressants}}
- Mood stabilizers: {{moodStabilizers}}
- Antipsychotics: {{antipsychotics}}
- Breastfeeding considerations: {{breastfeeding}}
{{#additionalNotes}}Postpartum planning: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['riskBenefit', 'antidepressants', 'moodStabilizers', 'antipsychotics', 'breastfeeding', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Pregnancy Planning"] --> B["Risk-Benefit Discussion"]
    B --> C{"Medication Class"}
    C -->|"AD"| D["Sertraline Preferred"]
    C -->|"Mood Stabilizer"| E["Avoid Valproate\\nLamotrigine OK"]
    C -->|"AP"| F["Monitor for GDM"]
    D & E & F --> G["Monitor Neonate"]`
};

export const anxietyTreatment: DiagramTemplate = {
  id: 'psych-anxiety-treatment',
  name: 'Anxiety Disorder Treatment Algorithm',
  description: 'Evidence-based approach to treating anxiety disorders',
  domain: 'medicine',
  promptTemplate: `Create an anxiety treatment algorithm:
- Disorder type: {{disorderType}}
- First-line pharmacotherapy: {{firstLinePharmaco}}
- Psychotherapy options: {{psychotherapy}}
- Augmentation strategies: {{augmentation}}
- Treatment duration: {{treatmentDuration}}
{{#additionalNotes}}Benzodiazepine cautions: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['disorderType', 'firstLinePharmaco', 'psychotherapy', 'augmentation', 'treatmentDuration', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Anxiety Disorder"] --> B["SSRI/SNRI\\n+ CBT"]
    B --> C{"Response at\\n8-12 weeks?"}
    C -->|"Yes"| D["Continue 12+ months"]
    C -->|"No"| E["Switch Agent\\nor Augment"]
    E --> F["Buspirone\\nGabapentin\\nPregabalin"]
    A --> G["Short-term BZD\\nPRN only"]`
};

export const ptsdTreatment: DiagramTemplate = {
  id: 'psych-ptsd-treatment',
  name: 'PTSD Treatment Algorithm',
  description: 'Treatment approach for post-traumatic stress disorder',
  domain: 'medicine',
  promptTemplate: `Create a PTSD treatment algorithm:
- Trauma-focused therapy: {{traumaFocusedTherapy}}
- Pharmacotherapy options: {{pharmacotherapy}}
- Nightmare management: {{nightmareManagement}}
- Comorbidity treatment: {{comorbidityTreatment}}
- Treatment resistance: {{treatmentResistance}}
{{#additionalNotes}}Prazosin dosing: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['traumaFocusedTherapy', 'pharmacotherapy', 'nightmareManagement', 'comorbidityTreatment', 'treatmentResistance', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["PTSD Diagnosis"] --> B["Trauma-Focused\\nTherapy First"]
    B --> C["CPT or\\nProlonged Exposure"]
    A --> D["Pharmacotherapy"]
    D --> E["Sertraline or\\nParoxetine"]
    D --> F["Nightmares:\\nPrazosin"]
    B & E --> G["Continue\\n6-12 months"]`
};

export const ocdTreatment: DiagramTemplate = {
  id: 'psych-ocd-treatment',
  name: 'OCD Treatment Algorithm',
  description: 'Treatment approach for obsessive-compulsive disorder',
  domain: 'medicine',
  promptTemplate: `Create an OCD treatment algorithm:
- First-line medications: {{firstLineMeds}}
- ERP therapy: {{erpTherapy}}
- High-dose SSRI: {{highDoseSsri}}
- Augmentation options: {{augmentation}}
- Refractory treatment: {{refractoryTreatment}}
{{#additionalNotes}}Clomipramine considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['firstLineMeds', 'erpTherapy', 'highDoseSsri', 'augmentation', 'refractoryTreatment', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["OCD Diagnosis"] --> B["SSRI + ERP"]
    B --> C{"Response\\nat 12 weeks?"}
    C -->|"No"| D["Maximize SSRI\\n(High Dose OK)"]
    D --> E{"Still No\\nResponse?"}
    E -->|"Yes"| F["Add Antipsychotic\\nor Switch to CMI"]
    C -->|"Yes"| G["Continue\\nLong-term"]`
};

export const insomniaManagement: DiagramTemplate = {
  id: 'psych-insomnia',
  name: 'Insomnia Management Algorithm',
  description: 'Stepwise approach to treating insomnia',
  domain: 'medicine',
  promptTemplate: `Create an insomnia management algorithm:
- Sleep hygiene: {{sleepHygiene}}
- CBT-I: {{cbti}}
- Pharmacotherapy options: {{pharmacotherapy}}
- Short-term medications: {{shortTermMeds}}
- Chronic insomnia approach: {{chronicApproach}}
{{#additionalNotes}}Benzodiazepine alternatives: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['sleepHygiene', 'cbti', 'pharmacotherapy', 'shortTermMeds', 'chronicApproach', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Insomnia"] --> B["Sleep Hygiene\\nEducation"]
    B --> C["CBT-I"]
    C --> D{"Persistent?"}
    D -->|"Yes"| E["Medication"]
    E --> F["Short-acting Z-drug\\nor Doxepin\\nor Lemborexant"]
    D -->|"No"| G["Maintain CBT-I"]`
};

export const suicideRiskAssessment: DiagramTemplate = {
  id: 'psych-suicide-risk',
  name: 'Suicide Risk Assessment',
  description: 'Framework for assessing and managing suicide risk',
  domain: 'medicine',
  promptTemplate: `Create a suicide risk assessment framework:
- Risk factors: {{riskFactors}}
- Protective factors: {{protectiveFactors}}
- Warning signs: {{warningSigns}}
- Risk stratification: {{riskStratification}}
- Safety planning: {{safetyPlanning}}
- Disposition: {{disposition}}
{{#additionalNotes}}Lethal means counseling: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['riskFactors', 'protectiveFactors', 'warningSigns', 'riskStratification', 'safetyPlanning', 'disposition', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Suicidal Ideation\\nIdentified"] --> B["Assess Risk Factors"]
    B --> C["Intent, Plan\\nMeans, Timeline"]
    C --> D{"Risk Level?"}
    D -->|"High"| E["Inpatient\\nPsychiatric"]
    D -->|"Moderate"| F["Safety Plan\\nClose Follow-up"]
    D -->|"Low"| G["Outpatient\\nSafety Plan"]
    F & G --> H["Lethal Means\\nCounseling"]`
};

export const substanceUseDisorder: DiagramTemplate = {
  id: 'psych-sud-treatment',
  name: 'Substance Use Disorder Treatment',
  description: 'Medication-assisted treatment for substance use disorders',
  domain: 'medicine',
  promptTemplate: `Create a SUD treatment protocol:
- Substance type: {{substanceType}}
- Detoxification: {{detoxification}}
- MAT options: {{matOptions}}
- Psychosocial interventions: {{psychosocialInterventions}}
- Relapse prevention: {{relapsePrevention}}
{{#additionalNotes}}Harm reduction: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['substanceType', 'detoxification', 'matOptions', 'psychosocialInterventions', 'relapsePrevention', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Opioid Use\\nDisorder"] --> B["MAT Options"]
    B --> C["Buprenorphine"]
    B --> D["Methadone"]
    B --> E["Naltrexone"]
    A --> F["Alcohol Use\\nDisorder"]
    F --> G["Naltrexone\\nAcamprosate\\nDisulfiram"]
    C & D & E & G --> H["+ Counseling\\n+ Support Groups"]`
};

export const neurolepticMalignantSyndrome: DiagramTemplate = {
  id: 'psych-nms',
  name: 'Neuroleptic Malignant Syndrome',
  description: 'Recognition and management of NMS',
  domain: 'medicine',
  promptTemplate: `Create an NMS management protocol:
- Clinical features: {{clinicalFeatures}}
- Diagnostic criteria: {{diagnosticCriteria}}
- Immediate management: {{immediateManagement}}
- Pharmacologic treatment: {{pharmacologicTreatment}}
- Supportive care: {{supportiveCare}}
{{#additionalNotes}}Rechallenge considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['clinicalFeatures', 'diagnosticCriteria', 'immediateManagement', 'pharmacologicTreatment', 'supportiveCare', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["NMS Suspected"] --> B["Stop Antipsychotic"]
    B --> C["ICU Admission"]
    C --> D["Supportive Care\\nCooling, IV Fluids"]
    D --> E{"Severe?"}
    E -->|"Yes"| F["Dantrolene\\nBromocriptine"]
    E -->|"No"| G["Monitor CK\\nRenal Function"]
    F --> H["May take 7-10 days\\nto resolve"]`
};

export const bipolarMaintenanceTherapy: DiagramTemplate = {
  id: 'psych-bipolar-maintenance',
  name: 'Bipolar Maintenance Therapy',
  description: 'Long-term management of bipolar disorder',
  domain: 'medicine',
  promptTemplate: `Create a bipolar maintenance protocol:
- Mood stabilizer selection: {{moodStabilizerSelection}}
- Adjunctive therapy: {{adjunctiveTherapy}}
- Episode prevention: {{episodePrevention}}
- Monitoring requirements: {{monitoringRequirements}}
- Adherence strategies: {{adherenceStrategies}}
{{#additionalNotes}}Rapid cycling considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['moodStabilizerSelection', 'adjunctiveTherapy', 'episodePrevention', 'monitoringRequirements', 'adherenceStrategies', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Bipolar Disorder\\nMaintenance"] --> B{"Predominant\\nPolarity?"}
    B -->|"Manic"| C["Lithium\\nValproate\\nAtypical AP"]
    B -->|"Depressive"| D["Lamotrigine\\nQuetiapine\\nLurasidone"]
    C & D --> E["Long-term\\nMonitoring"]
    E --> F["Lithium: Renal, Thyroid\\nValproate: LFTs\\nAP: Metabolic"]`
};

export const psychotropicsTemplates: DiagramTemplate[] = [
  antidepressantSelection,
  antidepressantMechanisms,
  antipsychoticSelection,
  moodStabilizerComparison,
  benzodiazepineEquivalence,
  lithiumMonitoring,
  antidepressantDiscontinuation,
  serotoninSyndrome,
  adhdMedicationSelection,
  antipsychoticSideEffects,
  clozapineProtocol,
  psychiatricEmergencies,
  maoiDietRestrictions,
  depressionTreatmentResistant,
  psychotropicPregnancy,
  anxietyTreatment,
  ptsdTreatment,
  ocdTreatment,
  insomniaManagement,
  suicideRiskAssessment,
  substanceUseDisorder,
  neurolepticMalignantSyndrome,
  bipolarMaintenanceTherapy,
];

export default psychotropicsTemplates;
