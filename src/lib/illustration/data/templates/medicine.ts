/**
 * medicine.ts
 * Medical diagram templates for FINNISH
 *
 * Contains templates for common medical and clinical research diagrams
 * following established guidelines (CONSORT, PRISMA, etc.)
 */

import type { DiagramTemplate } from './index';

/**
 * CONSORT Flow Diagram template for randomized controlled trials
 */
export const consortFlowDiagram: DiagramTemplate = {
  id: 'med-consort-flow',
  name: 'CONSORT Flow Diagram',
  description:
    'Standard flow diagram for reporting randomized controlled trials following CONSORT 2010 guidelines',
  domain: 'medicine',
  promptTemplate: `Create a CONSORT flow diagram for a randomized controlled trial with the following details:
- Total assessed for eligibility: {{totalAssessed}}
- Exclusion reasons: {{exclusionReasons}}
- Number randomized: {{randomized}}
- Intervention group: {{interventionGroup}}
- Control group: {{controlGroup}}
- Lost to follow-up (intervention): {{lostIntervention}}
- Lost to follow-up (control): {{lostControl}}
- Analyzed (intervention): {{analyzedIntervention}}
- Analyzed (control): {{analyzedControl}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'totalAssessed',
    'exclusionReasons',
    'randomized',
    'interventionGroup',
    'controlGroup',
    'lostIntervention',
    'lostControl',
    'analyzedIntervention',
    'analyzedControl',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph enrollment["Enrollment"]
        assessed["Assessed for eligibility<br/>(n=250)"]
        excluded["Excluded (n=50)<br/>Not meeting criteria (n=30)<br/>Declined (n=15)<br/>Other (n=5)"]
    end

    randomized["Randomized<br/>(n=200)"]

    subgraph allocation["Allocation"]
        intervention["Allocated to intervention (n=100)<br/>Received intervention (n=98)"]
        control["Allocated to control (n=100)<br/>Received control (n=99)"]
    end

    subgraph followup["Follow-up"]
        fuInt["Lost to follow-up (n=5)<br/>Discontinued (n=3)"]
        fuCtrl["Lost to follow-up (n=4)<br/>Discontinued (n=2)"]
    end

    subgraph analysis["Analysis"]
        anaInt["Analyzed (n=92)"]
        anaCtrl["Analyzed (n=94)"]
    end

    assessed --> excluded
    assessed --> randomized
    randomized --> intervention
    randomized --> control
    intervention --> fuInt
    control --> fuCtrl
    fuInt --> anaInt
    fuCtrl --> anaCtrl`,
};

/**
 * PRISMA Flow Diagram template for systematic reviews
 */
export const prismaFlowDiagram: DiagramTemplate = {
  id: 'med-prisma-flow',
  name: 'PRISMA Flow Diagram',
  description:
    'Flow diagram for systematic reviews and meta-analyses following PRISMA 2020 guidelines',
  domain: 'medicine',
  promptTemplate: `Create a PRISMA 2020 flow diagram for a systematic review:
- Records from databases: {{databaseRecords}}
- Records from registers: {{registerRecords}}
- Records from other sources: {{otherRecords}}
- Duplicates removed: {{duplicatesRemoved}}
- Records screened: {{recordsScreened}}
- Records excluded: {{recordsExcluded}}
- Reports sought for retrieval: {{reportsSought}}
- Reports not retrieved: {{reportsNotRetrieved}}
- Reports assessed for eligibility: {{reportsAssessed}}
- Reports excluded with reasons: {{reportsExcludedReasons}}
- Studies included in review: {{studiesIncluded}}
- Studies in meta-analysis: {{studiesInMetaAnalysis}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'databaseRecords',
    'registerRecords',
    'otherRecords',
    'duplicatesRemoved',
    'recordsScreened',
    'recordsExcluded',
    'reportsSought',
    'reportsNotRetrieved',
    'reportsAssessed',
    'reportsExcludedReasons',
    'studiesIncluded',
    'studiesInMetaAnalysis',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph identification["Identification"]
        databases["Records from databases<br/>(n=1,234)"]
        registers["Records from registers<br/>(n=45)"]
        other["Records from other sources<br/>(n=23)"]
        duplicates["Duplicates removed<br/>(n=302)"]
    end

    subgraph screening["Screening"]
        screened["Records screened<br/>(n=1,000)"]
        excluded1["Records excluded<br/>(n=850)"]
    end

    subgraph eligibility["Eligibility"]
        sought["Reports sought<br/>(n=150)"]
        notRetrieved["Reports not retrieved<br/>(n=12)"]
        assessed["Reports assessed<br/>(n=138)"]
        excluded2["Reports excluded (n=98)<br/>Wrong population (n=45)<br/>Wrong intervention (n=30)<br/>Wrong outcome (n=23)"]
    end

    subgraph included["Included"]
        review["Studies in review<br/>(n=40)"]
        meta["Studies in meta-analysis<br/>(n=35)"]
    end

    databases --> duplicates
    registers --> duplicates
    other --> duplicates
    duplicates --> screened
    screened --> excluded1
    screened --> sought
    sought --> notRetrieved
    sought --> assessed
    assessed --> excluded2
    assessed --> review
    review --> meta`,
};

/**
 * Forest Plot template for meta-analysis
 */
export const forestPlot: DiagramTemplate = {
  id: 'med-forest-plot',
  name: 'Forest Plot',
  description:
    'Forest plot for displaying meta-analysis results with effect sizes and confidence intervals',
  domain: 'medicine',
  promptTemplate: `Create a forest plot for a meta-analysis:
- Study names: {{studyNames}}
- Effect sizes (odds ratios/risk ratios/mean differences): {{effectSizes}}
- 95% Confidence intervals: {{confidenceIntervals}}
- Weights: {{weights}}
- Overall effect: {{overallEffect}}
- Heterogeneity (I-squared): {{heterogeneity}}
- Favors labels: {{favorsLeft}} vs {{favorsRight}}
{{#subgroups}}Subgroup analysis: {{subgroups}}{{/subgroups}}`,
  placeholders: [
    'studyNames',
    'effectSizes',
    'confidenceIntervals',
    'weights',
    'overallEffect',
    'heterogeneity',
    'favorsLeft',
    'favorsRight',
    'subgroups',
  ],
};

/**
 * Kaplan-Meier Survival Curve template
 */
export const kaplanMeierCurve: DiagramTemplate = {
  id: 'med-kaplan-meier',
  name: 'Kaplan-Meier Survival Curve',
  description:
    'Survival curve for time-to-event analysis with censoring and risk tables',
  domain: 'medicine',
  promptTemplate: `Create a Kaplan-Meier survival curve:
- Groups to compare: {{groups}}
- Time points: {{timePoints}}
- Events at each time: {{events}}
- Censoring: {{censoring}}
- Median survival times: {{medianSurvival}}
- Hazard ratio: {{hazardRatio}}
- P-value (log-rank): {{pValue}}
- Include number at risk table: {{includeRiskTable}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'groups',
    'timePoints',
    'events',
    'censoring',
    'medianSurvival',
    'hazardRatio',
    'pValue',
    'includeRiskTable',
    'additionalNotes',
  ],
};

/**
 * Treatment Algorithm template
 */
export const treatmentAlgorithm: DiagramTemplate = {
  id: 'med-treatment-algorithm',
  name: 'Treatment Algorithm',
  description:
    'Clinical decision algorithm for treatment selection based on patient characteristics',
  domain: 'medicine',
  promptTemplate: `Create a treatment algorithm flowchart:
- Initial condition/diagnosis: {{initialCondition}}
- Decision points: {{decisionPoints}}
- Treatment options: {{treatmentOptions}}
- Response assessments: {{responseAssessments}}
- Escalation criteria: {{escalationCriteria}}
- Contraindications: {{contraindications}}
- Monitoring parameters: {{monitoring}}
{{#guidelines}}Based on guidelines: {{guidelines}}{{/guidelines}}`,
  placeholders: [
    'initialCondition',
    'decisionPoints',
    'treatmentOptions',
    'responseAssessments',
    'escalationCriteria',
    'contraindications',
    'monitoring',
    'guidelines',
  ],
  mermaidExample: `flowchart TB
    start(["Patient with Type 2 Diabetes"])

    assess{"HbA1c Level?"}

    lifestyle["Lifestyle Modifications<br/>+ Metformin"]

    check1{"HbA1c at target<br/>after 3 months?"}

    add1["Add second agent:<br/>SGLT2i, GLP-1 RA, or DPP-4i"]

    check2{"HbA1c at target<br/>after 3 months?"}

    add2["Add third agent or<br/>consider insulin"]

    monitor["Continue current therapy<br/>Monitor every 3-6 months"]

    start --> assess
    assess -->|"<7%"| lifestyle
    assess -->|">=7%"| lifestyle
    lifestyle --> check1
    check1 -->|No| add1
    check1 -->|Yes| monitor
    add1 --> check2
    check2 -->|No| add2
    check2 -->|Yes| monitor
    add2 --> monitor

    classDef decision fill:#fef3c7,stroke:#d97706
    classDef treatment fill:#d1fae5,stroke:#059669
    classDef monitor fill:#dbeafe,stroke:#2563eb

    class assess,check1,check2 decision
    class lifestyle,add1,add2 treatment
    class monitor monitor`,
};

/**
 * Patient Journey template
 */
export const patientJourney: DiagramTemplate = {
  id: 'med-patient-journey',
  name: 'Patient Journey',
  description:
    'Visual representation of patient experience through healthcare system touchpoints',
  domain: 'medicine',
  promptTemplate: `Create a patient journey map:
- Patient persona: {{patientPersona}}
- Journey phases: {{journeyPhases}}
- Touchpoints: {{touchpoints}}
- Actions at each stage: {{actions}}
- Pain points: {{painPoints}}
- Opportunities for improvement: {{opportunities}}
- Emotional states: {{emotionalStates}}
- Key metrics: {{metrics}}`,
  placeholders: [
    'patientPersona',
    'journeyPhases',
    'touchpoints',
    'actions',
    'painPoints',
    'opportunities',
    'emotionalStates',
    'metrics',
  ],
  mermaidExample: `flowchart LR
    subgraph awareness["Awareness"]
        a1["Symptoms noticed"]
        a2["Online research"]
    end

    subgraph access["Access"]
        b1["Schedule appointment"]
        b2["Insurance verification"]
    end

    subgraph diagnosis["Diagnosis"]
        c1["Initial consultation"]
        c2["Diagnostic tests"]
        c3["Results review"]
    end

    subgraph treatment["Treatment"]
        d1["Treatment plan"]
        d2["Therapy sessions"]
    end

    subgraph followup["Follow-up"]
        e1["Progress monitoring"]
        e2["Lifestyle adjustments"]
    end

    a1 --> a2
    a2 --> b1
    b1 --> b2
    b2 --> c1
    c1 --> c2
    c2 --> c3
    c3 --> d1
    d1 --> d2
    d2 --> e1
    e1 --> e2`,
};

/**
 * Clinical Pathway template
 */
export const clinicalPathway: DiagramTemplate = {
  id: 'med-clinical-pathway',
  name: 'Clinical Pathway',
  description:
    'Standardized care pathway showing timeline of interventions and expected outcomes',
  domain: 'medicine',
  promptTemplate: `Create a clinical pathway diagram:
- Condition/procedure: {{condition}}
- Timeline/phases: {{timeline}}
- Assessment activities: {{assessments}}
- Interventions: {{interventions}}
- Expected outcomes: {{expectedOutcomes}}
- Variance indicators: {{varianceIndicators}}
- Discharge criteria: {{dischargeCriteria}}
- Care team roles: {{careTeamRoles}}`,
  placeholders: [
    'condition',
    'timeline',
    'assessments',
    'interventions',
    'expectedOutcomes',
    'varianceIndicators',
    'dischargeCriteria',
    'careTeamRoles',
  ],
  mermaidExample: `flowchart TB
    subgraph day0["Day 0: Admission"]
        a1["Initial assessment"]
        a2["Baseline labs"]
        a3["Start IV fluids"]
    end

    subgraph day1["Day 1: Treatment"]
        b1["Morning rounds"]
        b2["Administer treatment"]
        b3["Monitor vitals q4h"]
    end

    subgraph day2["Day 2: Assessment"]
        c1["Response evaluation"]
        c2["Adjust therapy"]
        c3["Physical therapy consult"]
    end

    subgraph day3["Day 3: Discharge Planning"]
        d1["Discharge criteria check"]
        d2["Patient education"]
        d3["Follow-up scheduled"]
    end

    a1 --> a2 --> a3
    a3 --> b1
    b1 --> b2 --> b3
    b3 --> c1
    c1 --> c2 --> c3
    c3 --> d1
    d1 --> d2 --> d3`,
};

// =============================================================================
// SEPSIS AND CRITICAL CARE
// =============================================================================

/**
 * Sepsis Bundle Protocol template
 */
export const sepsisBundleProtocol: DiagramTemplate = {
  id: 'med-sepsis-bundle',
  name: 'Sepsis Management Protocol',
  description: 'Sepsis-3 criteria and hour-1 bundle implementation flowchart',
  domain: 'medicine',
  promptTemplate: `Create a sepsis management protocol flowchart:
- Screening criteria: {{screeningCriteria}}
- qSOFA score components: {{qsofaComponents}}
- SOFA score: {{sofaScore}}
- Hour-1 bundle elements: {{hour1Bundle}}
- Fluid resuscitation targets: {{fluidTargets}}
- Vasopressor indications: {{vasopressorIndications}}
- Source control measures: {{sourceControl}}
- Lactate clearance goals: {{lactateGoals}}
{{#additionalNotes}}Additional considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'screeningCriteria',
    'qsofaComponents',
    'sofaScore',
    'hour1Bundle',
    'fluidTargets',
    'vasopressorIndications',
    'sourceControl',
    'lactateGoals',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Suspected Infection"] --> B{"qSOFA ≥2?"}
    B -->|"Yes"| C["SOFA Assessment"]
    B -->|"No"| D["Monitor Closely"]
    C --> E{"SOFA ≥2\\nfrom baseline?"}
    E -->|"Yes"| F["SEPSIS"]
    F --> G["Hour-1 Bundle"]
    G --> G1["Lactate"]
    G --> G2["Blood Cultures"]
    G --> G3["Broad-spectrum Abx"]
    G --> G4["30mL/kg Crystalloid"]
    G1 & G2 & G3 & G4 --> H{"MAP <65 or\\nLactate >2?"}
    H -->|"Yes"| I["Vasopressors"]
    H -->|"No"| J["Reassess q4h"]
    style F fill:#DC143C,color:#fff
    style I fill:#8B0000,color:#fff`,
};

/**
 * Septic Shock Management template
 */
export const septicShockManagement: DiagramTemplate = {
  id: 'med-septic-shock',
  name: 'Septic Shock Management',
  description: 'Advanced management algorithm for refractory septic shock',
  domain: 'medicine',
  promptTemplate: `Create a septic shock management algorithm:
- Initial resuscitation: {{initialResuscitation}}
- Vasopressor escalation: {{vasopressorEscalation}}
- Fluid responsiveness assessment: {{fluidResponsiveness}}
- Adjunctive therapies: {{adjunctiveTherapies}}
- Steroid indications: {{steroidIndications}}
- End-organ monitoring: {{endOrganMonitoring}}
- Refractory shock management: {{refractoryManagement}}
{{#additionalNotes}}ICU considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'initialResuscitation',
    'vasopressorEscalation',
    'fluidResponsiveness',
    'adjunctiveTherapies',
    'steroidIndications',
    'endOrganMonitoring',
    'refractoryManagement',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Septic Shock"] --> B["Norepinephrine\\nFirst-line"]
    B --> C{"MAP ≥65?"}
    C -->|"No"| D["Add Vasopressin\\n0.03 U/min"]
    D --> E{"Still Refractory?"}
    E -->|"Yes"| F["Consider:\\n- Epinephrine\\n- Hydrocortisone"]
    E -->|"No"| G["Optimize"]
    C -->|"Yes"| G
    G --> H["Assess Fluid\\nResponsiveness"]
    H --> I{"PLR or PPV\\nPositive?"}
    I -->|"Yes"| J["More Fluids"]
    I -->|"No"| K["No More Fluids"]
    style A fill:#DC143C,color:#fff
    style F fill:#FFA500,color:#000`,
};

// =============================================================================
// PAIN MANAGEMENT
// =============================================================================

/**
 * Acute Pain Management Algorithm template
 */
export const acutePainManagement: DiagramTemplate = {
  id: 'med-acute-pain',
  name: 'Acute Pain Management Algorithm',
  description: 'WHO analgesic ladder and multimodal pain management approach',
  domain: 'medicine',
  promptTemplate: `Create an acute pain management algorithm:
- Pain assessment scale: {{painScale}}
- Pain severity levels: {{severityLevels}}
- Non-opioid options: {{nonOpioidOptions}}
- Opioid selection criteria: {{opioidCriteria}}
- Adjuvant medications: {{adjuvants}}
- Regional anesthesia indications: {{regionalIndications}}
- Monitoring requirements: {{monitoring}}
- Reassessment intervals: {{reassessmentIntervals}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'painScale',
    'severityLevels',
    'nonOpioidOptions',
    'opioidCriteria',
    'adjuvants',
    'regionalIndications',
    'monitoring',
    'reassessmentIntervals',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Pain Assessment\\nNRS 0-10"] --> B{"Severity?"}
    B -->|"Mild (1-3)"| C["Step 1:\\nNon-opioid"]
    B -->|"Moderate (4-6)"| D["Step 2:\\nWeak Opioid ±\\nNon-opioid"]
    B -->|"Severe (7-10)"| E["Step 3:\\nStrong Opioid ±\\nNon-opioid"]
    C --> C1["Acetaminophen\\nNSAIDs"]
    D --> D1["Tramadol\\nCodeine"]
    E --> E1["Morphine\\nHydromorphone"]
    C1 & D1 & E1 --> F["Add Adjuvants PRN"]
    F --> F1["Gabapentin\\nLidocaine patch\\nMuscle relaxants"]
    F --> G["Reassess q4h"]
    style E fill:#DC143C,color:#fff`,
};

/**
 * Chronic Pain Management template
 */
export const chronicPainManagement: DiagramTemplate = {
  id: 'med-chronic-pain',
  name: 'Chronic Pain Management Pathway',
  description: 'Multimodal approach to chronic non-cancer pain management',
  domain: 'medicine',
  promptTemplate: `Create a chronic pain management pathway:
- Pain etiology: {{painEtiology}}
- Functional assessment: {{functionalAssessment}}
- Non-pharmacologic interventions: {{nonPharmacologic}}
- First-line medications: {{firstLineMeds}}
- Second-line options: {{secondLineOptions}}
- Opioid risk assessment (ORT): {{opioidRisk}}
- Interventional procedures: {{interventional}}
- Goals of therapy: {{goalsOfTherapy}}
{{#additionalNotes}}Monitoring plan: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'painEtiology',
    'functionalAssessment',
    'nonPharmacologic',
    'firstLineMeds',
    'secondLineOptions',
    'opioidRisk',
    'interventional',
    'goalsOfTherapy',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Chronic Pain\\nAssessment"] --> B["Multimodal\\nApproach"]
    B --> C["Non-Pharmacologic"]
    C --> C1["PT/OT"]
    C --> C2["CBT"]
    C --> C3["Exercise"]
    B --> D["Pharmacologic"]
    D --> D1["NSAIDs/Acetaminophen"]
    D --> D2["SNRIs/TCAs"]
    D --> D3["Anticonvulsants"]
    B --> E["Interventional"]
    E --> E1["Nerve blocks"]
    E --> E2["Injections"]
    D --> F{"Opioids\\nConsidered?"}
    F -->|"Yes"| G["ORT Score\\n+ Agreement"]
    G --> H["Start Low\\nGo Slow"]
    style A fill:#4169E1,color:#fff`,
};

// =============================================================================
// MEDICATION MANAGEMENT
// =============================================================================

/**
 * Medication Reconciliation Workflow template
 */
export const medicationReconciliation: DiagramTemplate = {
  id: 'med-medication-reconciliation',
  name: 'Medication Reconciliation Workflow',
  description: 'Systematic medication reconciliation process at transitions of care',
  domain: 'medicine',
  promptTemplate: `Create a medication reconciliation workflow:
- Information sources: {{informationSources}}
- Verification steps: {{verificationSteps}}
- Discrepancy types: {{discrepancyTypes}}
- Resolution process: {{resolutionProcess}}
- Documentation requirements: {{documentation}}
- High-risk medications: {{highRiskMedications}}
- Patient/family involvement: {{patientInvolvement}}
- Handoff communication: {{handoffCommunication}}
{{#additionalNotes}}Quality metrics: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'informationSources',
    'verificationSteps',
    'discrepancyTypes',
    'resolutionProcess',
    'documentation',
    'highRiskMedications',
    'patientInvolvement',
    'handoffCommunication',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Admission/Transfer"] --> B["Gather Medication\\nHistory"]
    B --> B1["Patient Interview"]
    B --> B2["Pharmacy Records"]
    B --> B3["PCP Records"]
    B --> B4["Pill Bottles"]
    B1 & B2 & B3 & B4 --> C["Create BPMH"]
    C --> D["Compare to\\nAdmission Orders"]
    D --> E{"Discrepancies?"}
    E -->|"Yes"| F["Classify Discrepancy"]
    F --> F1["Omission"]
    F --> F2["Commission"]
    F --> F3["Dose/Frequency"]
    F1 & F2 & F3 --> G["Resolve with\\nProvider"]
    E -->|"No"| H["Document\\nReconciliation"]
    G --> H
    style C fill:#4169E1,color:#fff
    style G fill:#FFA500,color:#000`,
};

/**
 * Antimicrobial Stewardship Workflow template
 */
export const antimicrobialStewardshipWorkflow: DiagramTemplate = {
  id: 'med-antimicrobial-stewardship',
  name: 'Antibiotic Stewardship Algorithm',
  description: 'Antimicrobial stewardship decision pathway for empiric therapy optimization',
  domain: 'medicine',
  promptTemplate: `Create an antibiotic stewardship algorithm:
- Indication assessment: {{indicationAssessment}}
- Culture collection: {{cultureCollection}}
- Empiric therapy selection: {{empiricTherapy}}
- Spectrum optimization: {{spectrumOptimization}}
- IV to PO conversion criteria: {{ivToPoCriteria}}
- Duration guidelines: {{durationGuidelines}}
- De-escalation triggers: {{deescalationTriggers}}
- Review timeline: {{reviewTimeline}}
{{#additionalNotes}}Specific pathogens: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'indicationAssessment',
    'cultureCollection',
    'empiricTherapy',
    'spectrumOptimization',
    'ivToPoCriteria',
    'durationGuidelines',
    'deescalationTriggers',
    'reviewTimeline',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Suspected\\nInfection"] --> B["Cultures BEFORE\\nAntibiotics"]
    B --> C["Start Empiric\\nTherapy"]
    C --> D["48-72h Review"]
    D --> E{"Culture\\nResults?"}
    E -->|"Positive"| F["Narrow Spectrum"]
    E -->|"Negative"| G{"Clinically\\nImproved?"}
    G -->|"Yes"| H["Consider Stopping"]
    G -->|"No"| I["Broaden/Change"]
    F --> J{"IV to PO\\nCriteria Met?"}
    J -->|"Yes"| K["Switch to PO"]
    J -->|"No"| L["Continue IV"]
    K & L --> M["Define Duration"]
    style B fill:#228B22,color:#fff
    style F fill:#4169E1,color:#fff`,
};

// =============================================================================
// PATIENT TRIAGE AND EMERGENCY
// =============================================================================

/**
 * Emergency Triage Algorithm template
 */
export const emergencyTriage: DiagramTemplate = {
  id: 'med-emergency-triage',
  name: 'Emergency Triage Algorithm',
  description: 'ESI 5-level triage system for emergency department patient prioritization',
  domain: 'medicine',
  promptTemplate: `Create an emergency triage algorithm:
- Life-threatening criteria: {{lifeThreatening}}
- High-risk presentation features: {{highRiskFeatures}}
- Resource prediction categories: {{resourceCategories}}
- Vital sign parameters: {{vitalSignParams}}
- Pain assessment integration: {{painAssessment}}
- ESI level definitions: {{esiDefinitions}}
- Reassessment triggers: {{reassessmentTriggers}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'lifeThreatening',
    'highRiskFeatures',
    'resourceCategories',
    'vitalSignParams',
    'painAssessment',
    'esiDefinitions',
    'reassessmentTriggers',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Patient Arrival"] --> B{"Immediate\\nLife-Saving\\nIntervention?"}
    B -->|"Yes"| C["ESI 1\\nResuscitation"]
    B -->|"No"| D{"High Risk\\nSituation?"}
    D -->|"Yes"| E["ESI 2\\nEmergent"]
    D -->|"No"| F{"How Many\\nResources?"}
    F -->|"Many (≥2)"| G["ESI 3\\nUrgent"]
    F -->|"One"| H["ESI 4\\nLess Urgent"]
    F -->|"None"| I["ESI 5\\nNon-Urgent"]
    G --> J{"Vital Signs\\nDanger Zone?"}
    J -->|"Yes"| E
    J -->|"No"| G
    style C fill:#DC143C,color:#fff
    style E fill:#FFA500,color:#000
    style I fill:#228B22,color:#fff`,
};

/**
 * Code Blue/Resuscitation Protocol template
 */
export const codeBlueProtocol: DiagramTemplate = {
  id: 'med-code-blue',
  name: 'Code Blue/Resuscitation Protocol',
  description: 'Hospital code blue response and ACLS algorithm integration',
  domain: 'medicine',
  promptTemplate: `Create a code blue response protocol:
- Code activation criteria: {{activationCriteria}}
- Team roles: {{teamRoles}}
- Initial assessment: {{initialAssessment}}
- BLS sequence: {{blsSequence}}
- ACLS integration: {{aclsIntegration}}
- Medication protocols: {{medicationProtocols}}
- Post-ROSC care: {{postRoscCare}}
- Documentation requirements: {{documentation}}
{{#additionalNotes}}Debriefing process: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'activationCriteria',
    'teamRoles',
    'initialAssessment',
    'blsSequence',
    'aclsIntegration',
    'medicationProtocols',
    'postRoscCare',
    'documentation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Unresponsive\\nPatient"] --> B["Call Code\\nStart BLS"]
    B --> C["CAB:\\nCompressions\\nAirway\\nBreathing"]
    C --> D["Attach\\nMonitor/Defib"]
    D --> E{"Shockable\\nRhythm?"}
    E -->|"VF/VT"| F["Shock + CPR"]
    E -->|"Asystole/PEA"| G["CPR + Epi"]
    F --> H["Epi q3-5min\\nAmio if refractory"]
    G --> I["Search Hs and Ts"]
    H & I --> J{"ROSC?"}
    J -->|"Yes"| K["Post-Arrest\\nCare"]
    J -->|"No"| L["Continue ACLS"]
    L --> E
    style A fill:#DC143C,color:#fff
    style K fill:#228B22,color:#fff`,
};

/**
 * Rapid Response Team Activation template
 */
export const rapidResponseActivation: DiagramTemplate = {
  id: 'med-rapid-response',
  name: 'Rapid Response Team Protocol',
  description: 'Early warning score and rapid response team activation criteria',
  domain: 'medicine',
  promptTemplate: `Create a rapid response protocol flowchart:
- Early warning score components: {{ewsComponents}}
- Activation thresholds: {{activationThresholds}}
- Response team composition: {{teamComposition}}
- Assessment priorities: {{assessmentPriorities}}
- Intervention options: {{interventionOptions}}
- Escalation criteria: {{escalationCriteria}}
- Documentation requirements: {{documentation}}
{{#additionalNotes}}Communication tools: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ewsComponents',
    'activationThresholds',
    'teamComposition',
    'assessmentPriorities',
    'interventionOptions',
    'escalationCriteria',
    'documentation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Patient\\nDeteriorating"] --> B["Calculate NEWS"]
    B --> C{"NEWS Score?"}
    C -->|"0-4"| D["Routine Care\\nMonitor q12h"]
    C -->|"5-6"| E["Increase Monitoring\\nNotify RN Lead"]
    C -->|"≥7"| F["Activate RRT"]
    E --> G{"Single Parameter\\n≥3?"}
    G -->|"Yes"| F
    F --> H["RRT Assessment"]
    H --> I{"ICU Level\\nCare Needed?"}
    I -->|"Yes"| J["ICU Transfer"]
    I -->|"No"| K["Interventions\\non Floor"]
    style F fill:#FFA500,color:#000
    style J fill:#DC143C,color:#fff`,
};

// =============================================================================
// DISCHARGE AND TRANSITIONS
// =============================================================================

/**
 * Discharge Planning Workflow template
 */
export const dischargePlanning: DiagramTemplate = {
  id: 'med-discharge-planning',
  name: 'Discharge Planning Workflow',
  description: 'Comprehensive discharge planning process ensuring safe transitions',
  domain: 'medicine',
  promptTemplate: `Create a discharge planning workflow:
- Discharge readiness criteria: {{readinessCriteria}}
- Multidisciplinary team roles: {{teamRoles}}
- Medication reconciliation: {{medReconciliation}}
- Patient education components: {{patientEducation}}
- Follow-up arrangements: {{followUp}}
- DME and home services: {{homeServices}}
- Red flag instructions: {{redFlags}}
- Communication to outpatient providers: {{providerCommunication}}
{{#additionalNotes}}Readmission prevention: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'readinessCriteria',
    'teamRoles',
    'medReconciliation',
    'patientEducation',
    'followUp',
    'homeServices',
    'redFlags',
    'providerCommunication',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Admission Day 1"] --> B["Identify Discharge\\nNeeds"]
    B --> C["Daily Rounds:\\nDischarge Planning"]
    C --> D{"Medically\\nReady?"}
    D -->|"No"| C
    D -->|"Yes"| E["Discharge\\nChecklist"]
    E --> E1["Med Reconciliation"]
    E --> E2["Patient Education"]
    E --> E3["Follow-up Scheduled"]
    E --> E4["Home Services\\nArranged"]
    E1 & E2 & E3 & E4 --> F["Teach-Back\\nConfirmation"]
    F --> G["Discharge\\nSummary to PCP"]
    G --> H["Patient\\nDischarged"]
    style E fill:#4169E1,color:#fff
    style H fill:#228B22,color:#fff`,
};

/**
 * Safe Handoff Communication (SBAR) template
 */
export const sbarHandoff: DiagramTemplate = {
  id: 'med-sbar-handoff',
  name: 'SBAR Handoff Communication',
  description: 'Structured communication tool for safe patient handoffs',
  domain: 'medicine',
  promptTemplate: `Create an SBAR handoff communication template:
- Situation components: {{situationComponents}}
- Background elements: {{backgroundElements}}
- Assessment details: {{assessmentDetails}}
- Recommendation format: {{recommendationFormat}}
- Critical information highlights: {{criticalInfo}}
- Read-back requirements: {{readBack}}
- Documentation: {{documentation}}
{{#additionalNotes}}Common pitfalls: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'situationComponents',
    'backgroundElements',
    'assessmentDetails',
    'recommendationFormat',
    'criticalInfo',
    'readBack',
    'documentation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Initiate Handoff"] --> B["S - Situation"]
    B --> B1["Patient ID\\nCurrent Status\\nConcerns"]
    B1 --> C["B - Background"]
    C --> C1["Admission Reason\\nRelevant Hx\\nHospital Course"]
    C1 --> D["A - Assessment"]
    D --> D1["Current Condition\\nVital Signs\\nRecent Changes"]
    D1 --> E["R - Recommendation"]
    E --> E1["Pending Tasks\\nAnticipated Issues\\nContingency Plans"]
    E1 --> F["Receiver\\nRead-Back"]
    F --> G{"Questions\\nClarified?"}
    G -->|"Yes"| H["Handoff Complete"]
    G -->|"No"| I["Clarify"]
    I --> F
    style A fill:#4169E1,color:#fff
    style H fill:#228B22,color:#fff`,
};

// =============================================================================
// CLINICAL ASSESSMENT
// =============================================================================

/**
 * Physical Exam Documentation template
 */
export const physicalExamDocumentation: DiagramTemplate = {
  id: 'med-physical-exam',
  name: 'Physical Exam Documentation',
  description: 'Systematic approach to comprehensive physical examination documentation',
  domain: 'medicine',
  promptTemplate: `Create a physical exam documentation template:
- General appearance: {{generalAppearance}}
- Vital signs: {{vitalSigns}}
- HEENT examination: {{heent}}
- Cardiovascular exam: {{cardiovascular}}
- Pulmonary exam: {{pulmonary}}
- Abdominal exam: {{abdominal}}
- Neurological exam: {{neurological}}
- Extremities/skin: {{extremitiesSkin}}
- System-specific focus: {{systemFocus}}
{{#additionalNotes}}Documentation tips: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'generalAppearance',
    'vitalSigns',
    'heent',
    'cardiovascular',
    'pulmonary',
    'abdominal',
    'neurological',
    'extremitiesSkin',
    'systemFocus',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Physical Exam"] --> B["General"]
    A --> C["Vitals"]
    A --> D["HEENT"]
    A --> E["CV"]
    A --> F["Pulm"]
    A --> G["Abd"]
    A --> H["Neuro"]
    A --> I["Ext/Skin"]
    B --> B1["Appearance\\nDistress Level\\nNutrition"]
    C --> C1["BP, HR, RR\\nTemp, SpO2"]
    E --> E1["JVP, Heart Sounds\\nMurmurs, Edema"]
    F --> F1["Breath Sounds\\nWork of Breathing"]
    G --> G1["Bowel Sounds\\nTenderness\\nOrganomegaly"]
    H --> H1["Mental Status\\nCranial Nerves\\nMotor/Sensory"]`,
};

/**
 * Medical History Taking template
 */
export const medicalHistoryTaking: DiagramTemplate = {
  id: 'med-history-taking',
  name: 'Medical History Taking',
  description: 'Systematic approach to obtaining a comprehensive medical history',
  domain: 'medicine',
  promptTemplate: `Create a medical history taking template:
- Chief complaint: {{chiefComplaint}}
- HPI framework (OPQRST/OLDCARTS): {{hpiFramework}}
- Past medical history: {{pmh}}
- Medications and allergies: {{medications}}
- Family history: {{familyHistory}}
- Social history: {{socialHistory}}
- Review of systems: {{reviewOfSystems}}
- Red flag symptoms: {{redFlags}}
{{#additionalNotes}}Communication techniques: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'chiefComplaint',
    'hpiFramework',
    'pmh',
    'medications',
    'familyHistory',
    'socialHistory',
    'reviewOfSystems',
    'redFlags',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Patient Interview"] --> B["Chief Complaint"]
    B --> C["HPI - OLDCARTS"]
    C --> C1["Onset"]
    C --> C2["Location"]
    C --> C3["Duration"]
    C --> C4["Character"]
    C --> C5["Aggravating"]
    C --> C6["Relieving"]
    C --> C7["Timing"]
    C --> C8["Severity"]
    C1 & C2 & C3 & C4 & C5 & C6 & C7 & C8 --> D["PMH/PSH"]
    D --> E["Medications\\nAllergies"]
    E --> F["Family Hx"]
    F --> G["Social Hx"]
    G --> H["Review of\\nSystems"]
    style A fill:#4169E1,color:#fff
    style C fill:#228B22,color:#fff`,
};

/**
 * Vital Signs Interpretation template
 */
export const vitalSignsInterpretation: DiagramTemplate = {
  id: 'med-vital-signs',
  name: 'Vital Signs Interpretation',
  description: 'Systematic approach to vital sign interpretation and clinical correlation',
  domain: 'medicine',
  promptTemplate: `Create a vital signs interpretation algorithm:
- Normal ranges: {{normalRanges}}
- Temperature interpretation: {{temperatureInterpretation}}
- Blood pressure categories: {{bpCategories}}
- Heart rate assessment: {{heartRateAssessment}}
- Respiratory rate patterns: {{respiratoryPatterns}}
- Oxygen saturation thresholds: {{oxygenThresholds}}
- Shock index calculation: {{shockIndex}}
- Red flag combinations: {{redFlagCombinations}}
{{#additionalNotes}}Age-specific considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'normalRanges',
    'temperatureInterpretation',
    'bpCategories',
    'heartRateAssessment',
    'respiratoryPatterns',
    'oxygenThresholds',
    'shockIndex',
    'redFlagCombinations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Vital Signs\\nAssessment"] --> B["Temperature"]
    A --> C["Blood Pressure"]
    A --> D["Heart Rate"]
    A --> E["Respiratory Rate"]
    A --> F["SpO2"]
    B --> B1{"<36°C"}
    B1 -->|"Yes"| B2["Hypothermia"]
    B --> B3{">38°C"}
    B3 -->|"Yes"| B4["Fever"]
    C --> C1{"SBP <90"}
    C1 -->|"Yes"| C2["Hypotension"]
    D --> D1{"HR/SBP >1.0"}
    D1 -->|"Yes"| D2["Shock Index\\nElevated"]
    F --> F1{"<94%"}
    F1 -->|"Yes"| F2["Hypoxemia"]
    C2 & D2 --> G["Consider Shock"]
    style G fill:#DC143C,color:#fff
    style B2 fill:#4169E1,color:#fff`,
};

// =============================================================================
// DIAGNOSTIC DECISION MAKING
// =============================================================================

/**
 * Diagnostic Decision Tree template
 */
export const diagnosticDecisionTree: DiagramTemplate = {
  id: 'med-diagnostic-decision',
  name: 'Diagnostic Decision Tree',
  description: 'Systematic approach to differential diagnosis and workup prioritization',
  domain: 'medicine',
  promptTemplate: `Create a diagnostic decision tree:
- Presenting symptom: {{presentingSymptom}}
- Key discriminating features: {{discriminatingFeatures}}
- Must-not-miss diagnoses: {{mustNotMiss}}
- Common diagnoses: {{commonDiagnoses}}
- Initial workup: {{initialWorkup}}
- Second-tier testing: {{secondTierTesting}}
- Specialist referral criteria: {{referralCriteria}}
- Diagnostic timeout: {{diagnosticTimeout}}
{{#additionalNotes}}Clinical pearls: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentingSymptom',
    'discriminatingFeatures',
    'mustNotMiss',
    'commonDiagnoses',
    'initialWorkup',
    'secondTierTesting',
    'referralCriteria',
    'diagnosticTimeout',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Presenting\\nSymptom"] --> B["History &\\nPhysical"]
    B --> C{"Red Flags\\nPresent?"}
    C -->|"Yes"| D["Urgent Workup\\nMust-Not-Miss Dx"]
    C -->|"No"| E["Focused\\nDifferential"]
    D --> F["Imaging\\nLabs\\nSpecialist"]
    E --> G["Initial Testing"]
    G --> H{"Diagnosis\\nMade?"}
    H -->|"Yes"| I["Treat"]
    H -->|"No"| J["Second-Tier\\nTesting"]
    J --> K{"Diagnosis\\nMade?"}
    K -->|"Yes"| I
    K -->|"No"| L["Specialist\\nReferral"]
    style D fill:#DC143C,color:#fff
    style I fill:#228B22,color:#fff`,
};

/**
 * Pretest Probability Assessment template
 */
export const pretestProbability: DiagramTemplate = {
  id: 'med-pretest-probability',
  name: 'Pretest Probability Assessment',
  description: 'Bayesian approach to diagnostic testing and interpretation',
  domain: 'medicine',
  promptTemplate: `Create a pretest probability assessment diagram:
- Clinical decision rule: {{clinicalDecisionRule}}
- Pretest probability categories: {{pretestCategories}}
- Test characteristics: {{testCharacteristics}}
- Sensitivity and specificity: {{sensitivitySpecificity}}
- Likelihood ratios: {{likelihoodRatios}}
- Post-test probability thresholds: {{posttestThresholds}}
- Testing vs treating thresholds: {{thresholds}}
{{#additionalNotes}}Clinical application: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'clinicalDecisionRule',
    'pretestCategories',
    'testCharacteristics',
    'sensitivitySpecificity',
    'likelihoodRatios',
    'posttestThresholds',
    'thresholds',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Clinical\\nAssessment"] --> B["Calculate Pretest\\nProbability"]
    B --> C{"Pretest\\nProbability?"}
    C -->|"Low (<15%)"| D["Low-Risk\\nPathway"]
    C -->|"Intermediate"| E["Diagnostic\\nTesting"]
    C -->|"High (>85%)"| F["Treat Empirically"]
    D --> D1["Rule-out test\\nor Observe"]
    E --> G{"Test\\nResult?"}
    G -->|"Positive"| H["Calculate\\nPost-test Prob"]
    G -->|"Negative"| I["Calculate\\nPost-test Prob"]
    H --> J{"Above Treat\\nThreshold?"}
    J -->|"Yes"| K["Treat"]
    J -->|"No"| L["More Testing"]
    style E fill:#FFA500,color:#000
    style K fill:#228B22,color:#fff`,
};

// =============================================================================
// RESEARCH AND EVIDENCE
// =============================================================================

/**
 * Evidence Appraisal Framework template
 */
export const evidenceAppraisal: DiagramTemplate = {
  id: 'med-evidence-appraisal',
  name: 'Evidence Appraisal Framework',
  description: 'Critical appraisal of medical literature using validated frameworks',
  domain: 'medicine',
  promptTemplate: `Create an evidence appraisal framework diagram:
- Study design identification: {{studyDesign}}
- Validity assessment: {{validityAssessment}}
- Results interpretation: {{resultsInterpretation}}
- Applicability evaluation: {{applicability}}
- Bias assessment: {{biasAssessment}}
- GRADE quality rating: {{gradeRating}}
- Clinical relevance: {{clinicalRelevance}}
{{#additionalNotes}}Limitations to consider: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'studyDesign',
    'validityAssessment',
    'resultsInterpretation',
    'applicability',
    'biasAssessment',
    'gradeRating',
    'clinicalRelevance',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Medical\\nLiterature"] --> B["Identify Study\\nDesign"]
    B --> C["Assess\\nValidity"]
    C --> C1["Randomization?"]
    C --> C2["Blinding?"]
    C --> C3["Complete follow-up?"]
    C1 & C2 & C3 --> D["Interpret\\nResults"]
    D --> D1["Effect Size"]
    D --> D2["Precision (CI)"]
    D --> D3["P-value"]
    D1 & D2 & D3 --> E["Assess\\nApplicability"]
    E --> F{"Similar to\\nMy Patient?"}
    F -->|"Yes"| G["Apply to\\nPractice"]
    F -->|"No"| H["Extrapolate\\nwith Caution"]
    style A fill:#4169E1,color:#fff`,
};

/**
 * Number Needed to Treat/Harm Calculation template
 */
export const nntCalculation: DiagramTemplate = {
  id: 'med-nnt-calculation',
  name: 'NNT/NNH Calculation',
  description: 'Number needed to treat and harm calculations for clinical decision making',
  domain: 'medicine',
  promptTemplate: `Create an NNT/NNH calculation diagram:
- Control event rate (CER): {{controlEventRate}}
- Experimental event rate (EER): {{experimentalEventRate}}
- Absolute risk reduction: {{absoluteRiskReduction}}
- Relative risk reduction: {{relativeRiskReduction}}
- NNT calculation: {{nntCalculation}}
- NNH calculation: {{nnhCalculation}}
- Confidence intervals: {{confidenceIntervals}}
- Clinical interpretation: {{clinicalInterpretation}}
{{#additionalNotes}}Shared decision making: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'controlEventRate',
    'experimentalEventRate',
    'absoluteRiskReduction',
    'relativeRiskReduction',
    'nntCalculation',
    'nnhCalculation',
    'confidenceIntervals',
    'clinicalInterpretation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Treatment\\nEffect Data"] --> B["Control Group"]
    A --> C["Treatment Group"]
    B --> B1["CER = Events/Total"]
    C --> C1["EER = Events/Total"]
    B1 & C1 --> D["ARR = CER - EER"]
    D --> E["NNT = 1/ARR"]
    A --> F["Adverse Events"]
    F --> G["ARI = EER - CER"]
    G --> H["NNH = 1/ARI"]
    E & H --> I["Clinical Decision"]
    I --> J{"NNT < NNH?"}
    J -->|"Yes"| K["Benefit > Harm"]
    J -->|"No"| L["Reconsider"]
    style K fill:#228B22,color:#fff
    style L fill:#FFA500,color:#000`,
};

// =============================================================================
// QUALITY AND SAFETY
// =============================================================================

/**
 * Root Cause Analysis template
 */
export const rootCauseAnalysis: DiagramTemplate = {
  id: 'med-root-cause-analysis',
  name: 'Root Cause Analysis',
  description: 'Systematic approach to analyzing adverse events and near misses',
  domain: 'medicine',
  promptTemplate: `Create a root cause analysis diagram:
- Event description: {{eventDescription}}
- Timeline of events: {{timeline}}
- Contributing factors: {{contributingFactors}}
- Root causes identified: {{rootCauses}}
- System failures: {{systemFailures}}
- Human factors: {{humanFactors}}
- Recommended actions: {{recommendedActions}}
- Outcome measures: {{outcomeMeasures}}
{{#additionalNotes}}Implementation plan: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'eventDescription',
    'timeline',
    'contributingFactors',
    'rootCauses',
    'systemFailures',
    'humanFactors',
    'recommendedActions',
    'outcomeMeasures',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Adverse Event\\nIdentified"] --> B["Assemble\\nRCA Team"]
    B --> C["Create Event\\nTimeline"]
    C --> D["Identify\\nContributing Factors"]
    D --> E["5 Whys\\nAnalysis"]
    E --> F["Root Causes"]
    F --> F1["System Factors"]
    F --> F2["Human Factors"]
    F --> F3["Equipment"]
    F1 & F2 & F3 --> G["Develop\\nAction Plan"]
    G --> H["Strong Actions"]
    G --> I["Medium Actions"]
    G --> J["Weak Actions"]
    H & I & J --> K["Implement &\\nMonitor"]
    style A fill:#DC143C,color:#fff
    style H fill:#228B22,color:#fff`,
};

/**
 * All medicine templates exported as an array
 */
export const medicineTemplates: DiagramTemplate[] = [
  // Clinical Trial and Research
  consortFlowDiagram,
  prismaFlowDiagram,
  forestPlot,
  kaplanMeierCurve,
  evidenceAppraisal,
  nntCalculation,
  // Clinical Pathways
  treatmentAlgorithm,
  patientJourney,
  clinicalPathway,
  // Sepsis and Critical Care
  sepsisBundleProtocol,
  septicShockManagement,
  // Pain Management
  acutePainManagement,
  chronicPainManagement,
  // Medication Management
  medicationReconciliation,
  antimicrobialStewardshipWorkflow,
  // Emergency and Triage
  emergencyTriage,
  codeBlueProtocol,
  rapidResponseActivation,
  // Discharge and Transitions
  dischargePlanning,
  sbarHandoff,
  // Clinical Assessment
  physicalExamDocumentation,
  medicalHistoryTaking,
  vitalSignsInterpretation,
  // Diagnostic Decision Making
  diagnosticDecisionTree,
  pretestProbability,
  // Quality and Safety
  rootCauseAnalysis,
];
