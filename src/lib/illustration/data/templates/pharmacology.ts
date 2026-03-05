/**
 * pharmacology.ts
 * Pharmacology diagram templates for FINNISH
 *
 * Contains comprehensive templates for pharmacology and drug science including:
 * - Drug mechanism diagrams
 * - Pharmacokinetic workflows
 * - Dose-response visualizations
 * - Drug interaction charts
 * - Therapeutic drug monitoring
 * - Clinical prescribing algorithms
 * - Adverse drug reaction pathways
 * - Pharmacogenomics and precision medicine
 * - Drug development pipeline
 *
 * Total: 25 templates (COMPLETE)
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// PHARMACOKINETICS TEMPLATES
// =============================================================================

/**
 * ADME Pathway template
 */
export const admePathway: DiagramTemplate = {
  id: 'pharma-adme-pathway',
  name: 'ADME Pharmacokinetic Pathway',
  description: 'Drug absorption, distribution, metabolism, and excretion pathway diagram',
  domain: 'medicine',
  promptTemplate: `Create an ADME pharmacokinetic pathway diagram:
- Drug name: {{drugName}}
- Route of administration: {{route}}
- Absorption site: {{absorptionSite}}
- Bioavailability: {{bioavailability}}
- Distribution volume: {{vd}}
- Protein binding: {{proteinBinding}}
- Metabolism (CYP enzymes): {{metabolism}}
- Active metabolites: {{activeMetabolites}}
- Excretion route: {{excretion}}
- Half-life: {{halfLife}}
{{#additionalNotes}}Additional PK notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'drugName',
    'route',
    'absorptionSite',
    'bioavailability',
    'vd',
    'proteinBinding',
    'metabolism',
    'activeMetabolites',
    'excretion',
    'halfLife',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Drug\\nAdministration")] --> B["Absorption"]
    B -->|"F = 60%"| C["Plasma"]
    C --> D{"Protein\\nBound?"}
    D -->|"90%"| E["Bound Drug"]
    D -->|"10%"| F["Free Drug"]
    F --> G["Distribution\\nVd = 1.5 L/kg"]
    F --> H["Liver\\nCYP3A4"]
    H --> I["Metabolites"]
    H --> J["Kidney"]
    J --> K["Urine\\nt½ = 12h"]
    style C fill:#4169E1,color:#fff
    style H fill:#F39C12,color:#000`,
};

/**
 * First-Order Elimination template
 */
export const firstOrderElimination: DiagramTemplate = {
  id: 'pharma-first-order-elimination',
  name: 'First-Order Elimination Kinetics',
  description: 'Drug concentration-time curve showing first-order elimination',
  domain: 'medicine',
  promptTemplate: `Create a first-order elimination diagram:
- Drug name: {{drugName}}
- Initial concentration (C0): {{c0}}
- Half-life (t1/2): {{halfLife}}
- Elimination rate constant (ke): {{ke}}
- Therapeutic range: {{therapeuticRange}}
- Time points to show: {{timePoints}}
- Dosing interval: {{dosingInterval}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'drugName',
    'c0',
    'halfLife',
    'ke',
    'therapeuticRange',
    'timePoints',
    'dosingInterval',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Kinetics["First-Order Kinetics"]
        A["C(t) = C₀ × e^(-ke×t)"]
        B["t½ = 0.693/ke"]
        C["Rate ∝ [Drug]"]
    end
    subgraph Curve["Concentration-Time"]
        D["Peak (Cmax)"]
        E["t½ point (50%)"]
        F["Therapeutic Range"]
        G["Trough (Cmin)"]
    end
    A --> D
    B --> E
    D --> F
    F --> G`,
};

/**
 * Steady-State Dosing template
 */
export const steadyStateDosing: DiagramTemplate = {
  id: 'pharma-steady-state',
  name: 'Steady-State Drug Dosing',
  description: 'Multiple dose pharmacokinetics reaching steady state',
  domain: 'medicine',
  promptTemplate: `Create a steady-state dosing diagram:
- Drug name: {{drugName}}
- Dose: {{dose}}
- Dosing interval: {{interval}}
- Half-life: {{halfLife}}
- Time to steady state: {{timeToSS}}
- Css max: {{cssMax}}
- Css min: {{cssMin}}
- Loading dose consideration: {{loadingDose}}
{{#additionalNotes}}Clinical notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'drugName',
    'dose',
    'interval',
    'halfLife',
    'timeToSS',
    'cssMax',
    'cssMin',
    'loadingDose',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Accumulation["Drug Accumulation"]
        A["Dose 1"] --> B["Dose 2"]
        B --> C["Dose 3"]
        C --> D["Dose 4"]
        D --> E["Dose 5"]
    end
    subgraph SteadyState["Steady State (4-5 t½)"]
        F["Css max"]
        G["Css average"]
        H["Css min"]
    end
    E --> F
    E --> G
    E --> H
    style F fill:#DC143C,color:#fff
    style H fill:#4169E1,color:#fff`,
};

// =============================================================================
// PHARMACODYNAMICS TEMPLATES
// =============================================================================

/**
 * Dose-Response Curve template
 */
export const doseResponseCurve: DiagramTemplate = {
  id: 'pharma-dose-response',
  name: 'Dose-Response Curve Analysis',
  description: 'Graded dose-response relationship with EC50 and Emax',
  domain: 'medicine',
  promptTemplate: `Create a dose-response curve diagram:
- Drug A: {{drugA}}
- Drug B (comparison): {{drugB}}
- EC50 Drug A: {{ec50A}}
- EC50 Drug B: {{ec50B}}
- Emax Drug A: {{emaxA}}
- Emax Drug B: {{emaxB}}
- Potency comparison: {{potencyComparison}}
- Efficacy comparison: {{efficacyComparison}}
{{#additionalNotes}}Clinical relevance: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'drugA',
    'drugB',
    'ec50A',
    'ec50B',
    'emaxA',
    'emaxB',
    'potencyComparison',
    'efficacyComparison',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Parameters["PD Parameters"]
        A["EC50 = Concentration\\nat 50% Emax"]
        B["Emax = Maximum\\nEffect"]
        C["Potency = Left Shift\\n(Lower EC50)"]
        D["Efficacy = Higher Emax"]
    end
    subgraph Comparison["Drug Comparison"]
        E["Drug A: More Potent\\n(EC50 = 10 nM)"]
        F["Drug B: Higher Efficacy\\n(Emax = 100%)"]
    end
    A --> E
    B --> F`,
};

/**
 * Receptor Binding Mechanisms template
 */
export const receptorBinding: DiagramTemplate = {
  id: 'pharma-receptor-binding',
  name: 'Receptor Binding Mechanisms',
  description: 'Drug-receptor interactions showing agonist, antagonist, and modulator effects',
  domain: 'medicine',
  promptTemplate: `Create a receptor binding mechanism diagram:
- Receptor type: {{receptorType}}
- Endogenous ligand: {{endogenousLigand}}
- Full agonist example: {{fullAgonist}}
- Partial agonist example: {{partialAgonist}}
- Competitive antagonist: {{competitiveAntagonist}}
- Non-competitive antagonist: {{nonCompetitiveAntagonist}}
- Allosteric modulator: {{allostericModulator}}
{{#additionalNotes}}Clinical applications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'receptorType',
    'endogenousLigand',
    'fullAgonist',
    'partialAgonist',
    'competitiveAntagonist',
    'nonCompetitiveAntagonist',
    'allostericModulator',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Receptor["Receptor Site"]
        R[("Receptor")]
    end
    subgraph Ligands["Drug Types"]
        A["Full Agonist\\n100% Activity"]
        B["Partial Agonist\\n30-70% Activity"]
        C["Antagonist\\n0% Activity + Block"]
        D["Inverse Agonist\\nNegative Activity"]
    end
    A -->|"Activate"| R
    B -->|"Partial"| R
    C -->|"Block"| R
    D -->|"Inhibit"| R
    style A fill:#22c55e,color:#fff
    style C fill:#ef4444,color:#fff`,
};

/**
 * Therapeutic Index template
 */
export const therapeuticIndex: DiagramTemplate = {
  id: 'pharma-therapeutic-index',
  name: 'Therapeutic Index Visualization',
  description: 'Drug safety margin showing therapeutic window between ED50 and TD50',
  domain: 'medicine',
  promptTemplate: `Create a therapeutic index diagram:
- Drug name: {{drugName}}
- ED50 (therapeutic): {{ed50}}
- TD50 (toxic): {{td50}}
- Therapeutic Index (TI = TD50/ED50): {{ti}}
- Therapeutic window: {{therapeuticWindow}}
- Safety margin assessment: {{safetyMargin}}
- Clinical monitoring requirements: {{monitoring}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'drugName',
    'ed50',
    'td50',
    'ti',
    'therapeuticWindow',
    'safetyMargin',
    'monitoring',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph TherapeuticWindow["Therapeutic Window"]
        A["ED50\\n(50% therapeutic)"]
        B["Therapeutic\\nRange"]
        C["TD50\\n(50% toxic)"]
    end
    subgraph Safety["Safety Assessment"]
        D["TI = TD50/ED50"]
        E["Wide TI (>10)\\nSafe"]
        F["Narrow TI (<5)\\nMonitoring Required"]
    end
    A --> B
    B --> C
    D --> E
    D --> F
    style B fill:#22c55e,color:#fff
    style F fill:#ef4444,color:#fff`,
};

// =============================================================================
// DRUG INTERACTION TEMPLATES
// =============================================================================

/**
 * Drug-Drug Interaction template
 */
export const drugDrugInteraction: DiagramTemplate = {
  id: 'pharma-ddi',
  name: 'Drug-Drug Interaction Pathway',
  description: 'Mechanism and clinical significance of drug-drug interactions',
  domain: 'medicine',
  promptTemplate: `Create a drug-drug interaction diagram:
- Object drug (affected): {{objectDrug}}
- Precipitant drug (causing): {{precipitantDrug}}
- Interaction mechanism: {{mechanism}}
- CYP enzyme involved: {{cypEnzyme}}
- Clinical effect: {{clinicalEffect}}
- Severity rating: {{severity}}
- Management strategy: {{management}}
{{#additionalNotes}}Monitoring parameters: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'objectDrug',
    'precipitantDrug',
    'mechanism',
    'cypEnzyme',
    'clinicalEffect',
    'severity',
    'management',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Drug A\\n(Object)"] --> B["CYP3A4\\nMetabolism"]
    C["Drug B\\n(Precipitant)"] -->|"Inhibits"| B
    B --> D["⬆️ Drug A Levels"]
    D --> E["⚠️ Toxicity Risk"]
    E --> F{"Management"}
    F -->|"Option 1"| G["Reduce Drug A Dose"]
    F -->|"Option 2"| H["Choose Alternative"]
    F -->|"Option 3"| I["Monitor Levels"]
    style E fill:#ef4444,color:#fff
    style G fill:#22c55e,color:#fff`,
};

/**
 * CYP450 Metabolism Pathway template
 */
export const cyp450Pathway: DiagramTemplate = {
  id: 'pharma-cyp450',
  name: 'CYP450 Metabolism Pathway',
  description: 'Cytochrome P450 enzyme family drug metabolism overview',
  domain: 'medicine',
  promptTemplate: `Create a CYP450 metabolism diagram:
- Primary enzyme: {{primaryCYP}}
- Drug substrates: {{substrates}}
- CYP inhibitors: {{inhibitors}}
- CYP inducers: {{inducers}}
- Genetic polymorphisms: {{polymorphisms}}
- Poor metabolizer implications: {{poorMetabolizer}}
- Ultra-rapid metabolizer implications: {{ultraRapid}}
{{#additionalNotes}}Clinical pearls: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'primaryCYP',
    'substrates',
    'inhibitors',
    'inducers',
    'polymorphisms',
    'poorMetabolizer',
    'ultraRapid',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph CYP3A4["CYP3A4 (50% of Drugs)"]
        A["Substrates:\\nSimvastatin, Amlodipine"]
        B["Inhibitors:\\nKetoconazole, Grapefruit"]
        C["Inducers:\\nRifampin, Carbamazepine"]
    end
    subgraph Effects["Clinical Effects"]
        D["Inhibition →\\n⬆️ Drug Levels"]
        E["Induction →\\n⬇️ Drug Levels"]
    end
    B --> D
    C --> E
    style D fill:#DC143C,color:#fff
    style E fill:#4169E1,color:#fff`,
};

// =============================================================================
// THERAPEUTIC DRUG MONITORING
// =============================================================================

/**
 * TDM Protocol template
 */
export const tdmProtocol: DiagramTemplate = {
  id: 'pharma-tdm-protocol',
  name: 'Therapeutic Drug Monitoring Protocol',
  description: 'TDM workflow for narrow therapeutic index drugs',
  domain: 'medicine',
  promptTemplate: `Create a TDM protocol diagram:
- Drug requiring TDM: {{drugName}}
- Therapeutic range: {{therapeuticRange}}
- Trough timing: {{troughTiming}}
- Peak timing: {{peakTiming}}
- Sample collection: {{sampleCollection}}
- Dose adjustment algorithm: {{doseAdjustment}}
- Recheck interval: {{recheckInterval}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'drugName',
    'therapeuticRange',
    'troughTiming',
    'peakTiming',
    'sampleCollection',
    'doseAdjustment',
    'recheckInterval',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Start TDM")] --> B["Draw Trough\\n(30 min pre-dose)"]
    B --> C["Lab Analysis"]
    C --> D{"Level in\\nRange?"}
    D -->|"<10 mcg/mL"| E["Increase Dose"]
    D -->|"10-20 mcg/mL"| F["✓ Continue"]
    D -->|">20 mcg/mL"| G["Decrease Dose"]
    E --> H["Recheck in 48-72h"]
    G --> H
    F --> I["Recheck Weekly"]
    style F fill:#22c55e,color:#fff
    style G fill:#ef4444,color:#fff`,
};

/**
 * Vancomycin Dosing template
 */
export const vancomycinDosing: DiagramTemplate = {
  id: 'pharma-vancomycin-dosing',
  name: 'Vancomycin Dosing Algorithm',
  description: 'AUC-based vancomycin dosing and monitoring protocol',
  domain: 'medicine',
  promptTemplate: `Create a vancomycin dosing algorithm:
- Patient weight: {{weight}}
- Creatinine clearance: {{crCl}}
- Indication: {{indication}}
- Target AUC/MIC: {{targetAUC}}
- Loading dose: {{loadingDose}}
- Maintenance dose: {{maintenanceDose}}
- Monitoring approach: {{monitoring}}
{{#additionalNotes}}Renal adjustment: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'weight',
    'crCl',
    'indication',
    'targetAUC',
    'loadingDose',
    'maintenanceDose',
    'monitoring',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Vancomycin\\nOrder")] --> B["Calculate CrCl"]
    B --> C{"CrCl?"}
    C -->|">50"| D["1g q12h"]
    C -->|"30-50"| E["1g q24h"]
    C -->|"<30"| F["1g q48h or\\nLevel-guided"]
    D & E & F --> G["Loading: 25 mg/kg"]
    G --> H["AUC Monitoring"]
    H --> I{"AUC 400-600?"}
    I -->|"Low"| J["Increase Dose"]
    I -->|"Target"| K["✓ Continue"]
    I -->|"High"| L["Decrease Dose"]
    style K fill:#22c55e,color:#fff`,
};

// =============================================================================
// ADVERSE DRUG REACTIONS
// =============================================================================

/**
 * ADR Classification template
 */
export const adrClassification: DiagramTemplate = {
  id: 'pharma-adr-classification',
  name: 'Adverse Drug Reaction Classification',
  description: 'Type A and Type B ADR classification with examples',
  domain: 'medicine',
  promptTemplate: `Create an ADR classification diagram:
- Drug involved: {{drug}}
- Type A reactions: {{typeA}}
- Type B reactions: {{typeB}}
- Dose-dependent effects: {{doseDependentEffects}}
- Idiosyncratic reactions: {{idiosyncratic}}
- Management Type A: {{managementA}}
- Management Type B: {{managementB}}
{{#additionalNotes}}Prevention strategies: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'drug',
    'typeA',
    'typeB',
    'doseDependentEffects',
    'idiosyncratic',
    'managementA',
    'managementB',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Adverse Drug\\nReaction")] --> B{"Type?"}
    B -->|"Type A"| C["Augmented\\n(Predictable)"]
    B -->|"Type B"| D["Bizarre\\n(Unpredictable)"]
    C --> E["Dose-Dependent\\nCommon (>80% ADRs)"]
    C --> F["Management:\\nReduce Dose"]
    D --> G["Immunological\\nRare"]
    D --> H["Management:\\nStop Drug"]
    style F fill:#22c55e,color:#fff
    style H fill:#ef4444,color:#fff`,
};

/**
 * Drug Allergy Workup template
 */
export const drugAllergyWorkup: DiagramTemplate = {
  id: 'pharma-drug-allergy',
  name: 'Drug Allergy Evaluation Algorithm',
  description: 'Assessment pathway for suspected drug allergies',
  domain: 'medicine',
  promptTemplate: `Create a drug allergy workup diagram:
- Suspected drug: {{suspectedDrug}}
- Reaction type: {{reactionType}}
- Timing of reaction: {{timing}}
- Symptoms: {{symptoms}}
- Severity: {{severity}}
- Testing available: {{testing}}
- Desensitization candidacy: {{desensitization}}
{{#additionalNotes}}Documentation requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'suspectedDrug',
    'reactionType',
    'timing',
    'symptoms',
    'severity',
    'testing',
    'desensitization',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Suspected\\nDrug Allergy")] --> B{"Reaction\\nTiming?"}
    B -->|"<1 hour"| C["Immediate\\n(Type I)"]
    B -->|">1 hour"| D["Delayed\\n(Type IV)"]
    C --> E["IgE-Mediated"]
    E --> F{"Severity?"}
    F -->|"Mild"| G["Skin Testing\\nif Available"]
    F -->|"Anaphylaxis"| H["Avoid Drug\\nDocument Allergy"]
    G --> I{"Test Positive?"}
    I -->|"Yes"| H
    I -->|"No"| J["Consider Challenge"]
    D --> K["Consider\\nDelayed Testing"]
    style H fill:#ef4444,color:#fff`,
};

// =============================================================================
// CLINICAL PRESCRIBING
// =============================================================================

/**
 * Antibiotic Selection Algorithm template
 */
export const antibioticSelection: DiagramTemplate = {
  id: 'pharma-antibiotic-selection',
  name: 'Empiric Antibiotic Selection Algorithm',
  description: 'Evidence-based antibiotic selection for common infections',
  domain: 'medicine',
  promptTemplate: `Create an antibiotic selection algorithm:
- Infection site: {{infectionSite}}
- Patient setting: {{setting}}
- Common pathogens: {{commonPathogens}}
- First-line antibiotic: {{firstLine}}
- Alternative options: {{alternatives}}
- Duration of therapy: {{duration}}
- De-escalation criteria: {{deescalation}}
{{#additionalNotes}}Resistance patterns: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'infectionSite',
    'setting',
    'commonPathogens',
    'firstLine',
    'alternatives',
    'duration',
    'deescalation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Community\\nPneumonia")] --> B{"Severity?"}
    B -->|"Outpatient"| C["Amoxicillin\\nor Doxycycline"]
    B -->|"Hospitalized"| D["Ceftriaxone +\\nAzithromycin"]
    B -->|"ICU"| E["Ceftriaxone +\\nAzithromycin +\\nVancomycin PRN"]
    C --> F["5 days"]
    D --> G["5-7 days"]
    E --> H["7+ days"]
    style C fill:#22c55e,color:#fff
    style E fill:#ef4444,color:#fff`,
};

/**
 * Opioid Prescribing Algorithm template
 */
export const opioidPrescribing: DiagramTemplate = {
  id: 'pharma-opioid-prescribing',
  name: 'Opioid Prescribing Algorithm',
  description: 'Safe opioid prescribing pathway with risk assessment',
  domain: 'medicine',
  promptTemplate: `Create an opioid prescribing algorithm:
- Pain type: {{painType}}
- Prior opioid exposure: {{priorExposure}}
- Risk assessment tools: {{riskTools}}
- Starting regimen: {{startingRegimen}}
- Titration plan: {{titration}}
- Monitoring requirements: {{monitoring}}
- Naloxone co-prescribing: {{naloxone}}
{{#additionalNotes}}State regulations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'painType',
    'priorExposure',
    'riskTools',
    'startingRegimen',
    'titration',
    'monitoring',
    'naloxone',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Chronic Pain\\nAssessment")] --> B["Non-Opioid\\nTrials First"]
    B --> C{"Opioid\\nCandidate?"}
    C -->|"Yes"| D["Risk Assessment\\n(ORT, PDMP)"]
    D --> E{"High Risk?"}
    E -->|"Yes"| F["Frequent Monitoring\\n+ Naloxone"]
    E -->|"No"| G["Standard Protocol"]
    F & G --> H["Start Low\\nGo Slow"]
    H --> I["Regular\\nReassessment"]
    style F fill:#FFA500,color:#000
    style H fill:#22c55e,color:#fff`,
};

/**
 * Anticoagulation Selection template
 */
export const anticoagulationSelection: DiagramTemplate = {
  id: 'pharma-anticoagulation-selection',
  name: 'Anticoagulation Agent Selection',
  description: 'Choosing appropriate anticoagulation based on indication',
  domain: 'medicine',
  promptTemplate: `Create an anticoagulation selection diagram:
- Indication: {{indication}}
- Renal function (CrCl): {{renalFunction}}
- Valve status: {{valveStatus}}
- Bleeding risk: {{bleedingRisk}}
- Drug interactions: {{drugInteractions}}
- Agent selected: {{agentSelected}}
- Monitoring plan: {{monitoring}}
{{#additionalNotes}}Reversal agent: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'indication',
    'renalFunction',
    'valveStatus',
    'bleedingRisk',
    'drugInteractions',
    'agentSelected',
    'monitoring',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Anticoagulation\\nIndication")] --> B{"Mechanical\\nValve?"}
    B -->|"Yes"| C["Warfarin\\n(INR 2.5-3.5)"]
    B -->|"No"| D{"CrCl?"}
    D -->|">30"| E["DOAC Preferred"]
    D -->|"15-30"| F["Apixaban or\\nReduced DOAC"]
    D -->|"<15"| G["Warfarin"]
    E --> H{"AFib or VTE?"}
    H -->|"AFib"| I["Apixaban or\\nRivaroxaban"]
    H -->|"VTE"| J["Apixaban or\\nRivaroxaban"]
    style C fill:#FFA500,color:#000
    style E fill:#22c55e,color:#fff`,
};

/**
 * Insulin Initiation Algorithm template
 */
export const insulinInitiation: DiagramTemplate = {
  id: 'pharma-insulin-initiation',
  name: 'Insulin Initiation and Titration',
  description: 'ADA-based insulin initiation algorithm for type 2 diabetes',
  domain: 'medicine',
  promptTemplate: `Create an insulin initiation algorithm:
- Current HbA1c: {{hba1c}}
- Current oral agents: {{oralAgents}}
- Fasting glucose: {{fastingGlucose}}
- Starting regimen: {{startingRegimen}}
- Initial dose calculation: {{initialDose}}
- Titration schedule: {{titration}}
- Hypoglycemia monitoring: {{hypoMonitoring}}
{{#additionalNotes}}Patient education: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'hba1c',
    'oralAgents',
    'fastingGlucose',
    'startingRegimen',
    'initialDose',
    'titration',
    'hypoMonitoring',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("T2DM\\nAdd Insulin")] --> B["Start Basal\\n10 units or\\n0.1-0.2 U/kg"]
    B --> C["Titrate q3 days"]
    C --> D{"Fasting BG?"}
    D -->|">180"| E["+4 units"]
    D -->|"140-180"| F["+2 units"]
    D -->|"80-130"| G["✓ At Goal"]
    D -->|"<70"| H["-2-4 units"]
    E & F --> C
    G --> I["Check HbA1c\\nin 3 months"]
    style G fill:#22c55e,color:#fff
    style H fill:#ef4444,color:#fff`,
};

// =============================================================================
// DRUG MECHANISM TEMPLATES
// =============================================================================

/**
 * GPCR Signaling Pathway template
 */
export const gpcrSignaling: DiagramTemplate = {
  id: 'pharma-gpcr-signaling',
  name: 'GPCR Drug Signaling Pathway',
  description: 'G-protein coupled receptor signaling mechanism',
  domain: 'medicine',
  promptTemplate: `Create a GPCR signaling pathway diagram:
- Receptor name: {{receptorName}}
- Endogenous ligand: {{endogenousLigand}}
- G-protein type (Gs, Gi, Gq): {{gProteinType}}
- Second messenger: {{secondMessenger}}
- Downstream effects: {{downstreamEffects}}
- Drug agonists: {{agonists}}
- Drug antagonists: {{antagonists}}
{{#additionalNotes}}Clinical applications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'receptorName',
    'endogenousLigand',
    'gProteinType',
    'secondMessenger',
    'downstreamEffects',
    'agonists',
    'antagonists',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Ligand"] --> B[("GPCR")]
    B --> C["G-Protein\\n(Gs/Gi/Gq)"]
    C -->|"Gs"| D["⬆️ cAMP"]
    C -->|"Gi"| E["⬇️ cAMP"]
    C -->|"Gq"| F["⬆️ IP3/DAG"]
    D --> G["PKA\\nActivation"]
    F --> H["Ca²⁺\\nRelease"]
    G & H --> I["Cellular\\nResponse"]
    style D fill:#22c55e,color:#fff
    style E fill:#ef4444,color:#fff`,
};

/**
 * Ion Channel Drug Effects template
 */
export const ionChannelDrugs: DiagramTemplate = {
  id: 'pharma-ion-channel',
  name: 'Ion Channel Drug Mechanisms',
  description: 'Drug effects on voltage-gated and ligand-gated ion channels',
  domain: 'medicine',
  promptTemplate: `Create an ion channel drug mechanism diagram:
- Channel type: {{channelType}}
- Ion conducted: {{ionType}}
- Channel state (open/closed/inactivated): {{channelState}}
- Blocking mechanism: {{blockingMechanism}}
- Drug examples: {{drugExamples}}
- Clinical effects: {{clinicalEffects}}
- Adverse effects: {{adverseEffects}}
{{#additionalNotes}}Drug-disease interactions: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'channelType',
    'ionType',
    'channelState',
    'blockingMechanism',
    'drugExamples',
    'clinicalEffects',
    'adverseEffects',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Channel["Na⁺ Channel States"]
        A["Resting\\n(Closed)"]
        B["Open"]
        C["Inactivated"]
    end
    subgraph Drugs["Local Anesthetics"]
        D["Lidocaine"]
        E["Block Inactivated\\nState"]
    end
    A -->|"Depolarization"| B
    B -->|"Fast"| C
    C -->|"Repolarization"| A
    D --> E
    E -->|"Use-Dependent"| C
    style E fill:#ef4444,color:#fff`,
};

/**
 * Enzyme Inhibitor Mechanism template
 */
export const enzymeInhibitor: DiagramTemplate = {
  id: 'pharma-enzyme-inhibitor',
  name: 'Enzyme Inhibition Mechanisms',
  description: 'Competitive, non-competitive, and irreversible enzyme inhibition',
  domain: 'medicine',
  promptTemplate: `Create an enzyme inhibition mechanism diagram:
- Enzyme target: {{enzyme}}
- Endogenous substrate: {{substrate}}
- Inhibitor type: {{inhibitorType}}
- Drug example: {{drugExample}}
- Ki (inhibition constant): {{ki}}
- Clinical application: {{clinicalApplication}}
- Recovery mechanism: {{recovery}}
{{#additionalNotes}}Resistance mechanisms: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'enzyme',
    'substrate',
    'inhibitorType',
    'drugExample',
    'ki',
    'clinicalApplication',
    'recovery',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Types["Inhibition Types"]
        A["Competitive\\n(Reversible)"]
        B["Non-Competitive\\n(Reversible)"]
        C["Irreversible\\n(Covalent)"]
    end
    subgraph Effects["Kinetic Effects"]
        D["⬆️ Km, Same Vmax"]
        E["Same Km, ⬇️ Vmax"]
        F["Permanent Inactivation"]
    end
    A --> D
    B --> E
    C --> F
    style A fill:#22c55e,color:#fff
    style C fill:#ef4444,color:#fff`,
};

// =============================================================================
// SPECIAL POPULATION TEMPLATES
// =============================================================================

/**
 * Renal Dosing Adjustment template
 */
export const renalDosing: DiagramTemplate = {
  id: 'pharma-renal-dosing',
  name: 'Renal Dosing Adjustment',
  description: 'Drug dosing modifications based on kidney function',
  domain: 'medicine',
  promptTemplate: `Create a renal dosing adjustment diagram:
- Drug name: {{drugName}}
- Normal dose: {{normalDose}}
- GFR >60 dose: {{gfr60Dose}}
- GFR 30-60 dose: {{gfr30Dose}}
- GFR 15-30 dose: {{gfr15Dose}}
- GFR <15 dose: {{gfr15BelowDose}}
- Hemodialysis dosing: {{hdDosing}}
{{#additionalNotes}}Monitoring parameters: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'drugName',
    'normalDose',
    'gfr60Dose',
    'gfr30Dose',
    'gfr15Dose',
    'gfr15BelowDose',
    'hdDosing',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Drug Rx")] --> B["Calculate GFR\\n(CKD-EPI)"]
    B --> C{"GFR?"}
    C -->|">60"| D["100% Dose"]
    C -->|"30-60"| E["75% Dose"]
    C -->|"15-30"| F["50% Dose"]
    C -->|"<15"| G["25% or Avoid"]
    G --> H{"On HD?"}
    H -->|"Yes"| I["Dose Post-HD"]
    H -->|"No"| J["Extended Interval"]
    style G fill:#ef4444,color:#fff`,
};

/**
 * Hepatic Dosing Adjustment template
 */
export const hepaticDosing: DiagramTemplate = {
  id: 'pharma-hepatic-dosing',
  name: 'Hepatic Dosing Adjustment',
  description: 'Drug dosing modifications for liver impairment',
  domain: 'medicine',
  promptTemplate: `Create a hepatic dosing adjustment diagram:
- Drug name: {{drugName}}
- Hepatic extraction ratio: {{extractionRatio}}
- Child-Pugh A dose: {{childPughA}}
- Child-Pugh B dose: {{childPughB}}
- Child-Pugh C dose: {{childPughC}}
- Protein binding changes: {{proteinBinding}}
- Alternative drugs: {{alternatives}}
{{#additionalNotes}}Monitoring recommendations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'drugName',
    'extractionRatio',
    'childPughA',
    'childPughB',
    'childPughC',
    'proteinBinding',
    'alternatives',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Drug Rx")] --> B["Assess Liver\\nFunction"]
    B --> C{"Child-Pugh?"}
    C -->|"A (5-6)"| D["100% Dose"]
    C -->|"B (7-9)"| E["50-75% Dose"]
    C -->|"C (10-15)"| F["Avoid if Possible"]
    D --> G["Standard Monitoring"]
    E --> H["Enhanced Monitoring"]
    F --> I["Consider Alternative"]
    style F fill:#ef4444,color:#fff
    style E fill:#FFA500,color:#000`,
};

/**
 * Pregnancy Drug Safety template
 */
export const pregnancyDrugSafety: DiagramTemplate = {
  id: 'pharma-pregnancy-safety',
  name: 'Pregnancy Drug Safety Assessment',
  description: 'Drug risk assessment and alternatives during pregnancy',
  domain: 'medicine',
  promptTemplate: `Create a pregnancy drug safety diagram:
- Drug in question: {{drug}}
- FDA pregnancy category/label: {{fdaCategory}}
- Trimester concerns: {{trimesterConcerns}}
- Known teratogenic effects: {{teratogenicEffects}}
- Safer alternatives: {{saferAlternatives}}
- Lactation safety: {{lactationSafety}}
- Counseling points: {{counselingPoints}}
{{#additionalNotes}}Risk-benefit discussion: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'drug',
    'fdaCategory',
    'trimesterConcerns',
    'teratogenicEffects',
    'saferAlternatives',
    'lactationSafety',
    'counselingPoints',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Drug in\\nPregnancy")] --> B{"Category?"}
    B -->|"Compatible"| C["✓ Use with\\nStandard Care"]
    B -->|"Caution"| D["Weigh\\nRisk/Benefit"]
    B -->|"Contraindicated"| E["❌ Avoid\\nFind Alternative"]
    D --> F{"Safer\\nAlternative?"}
    F -->|"Yes"| G["Switch Drug"]
    F -->|"No"| H["Use Lowest\\nEffective Dose"]
    E --> I["Document\\nContraindication"]
    style C fill:#22c55e,color:#fff
    style E fill:#ef4444,color:#fff`,
};

// =============================================================================
// PHARMACOGENOMICS & PRECISION MEDICINE
// =============================================================================

/**
 * Pharmacogenomics Dosing template
 */
export const pharmacogenomicsDosing: DiagramTemplate = {
  id: 'pharma-pharmacogenomics-dosing',
  name: 'Pharmacogenomics Dosing Algorithm',
  description: 'Genotype-guided drug dosing based on CYP450 and other pharmacogenomic variants',
  domain: 'medicine',
  promptTemplate: `Create a pharmacogenomics dosing algorithm diagram:
- Drug name: {{drugName}}
- Gene(s) tested: {{genes}}
- Metabolizer phenotypes: {{phenotypes}}
- Normal metabolizer dose: {{normalDose}}
- Poor metabolizer adjustment: {{poorMetabolizer}}
- Intermediate metabolizer adjustment: {{intermediateMetabolizer}}
- Ultra-rapid metabolizer adjustment: {{ultraRapidMetabolizer}}
- CPIC guideline reference: {{cpicGuideline}}
{{#additionalNotes}}Implementation notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'drugName',
    'genes',
    'phenotypes',
    'normalDose',
    'poorMetabolizer',
    'intermediateMetabolizer',
    'ultraRapidMetabolizer',
    'cpicGuideline',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Prescribe\\nCodeine")] --> B["Order CYP2D6\\nGenotyping"]
    B --> C{"Metabolizer\\nPhenotype?"}
    C -->|"Normal (EM)"| D["Standard Dose\\n30-60mg q4-6h"]
    C -->|"Poor (PM)"| E["⚠️ AVOID\\nNo Conversion to Morphine"]
    C -->|"Intermediate (IM)"| F["Use Alternative\\nor Reduce Dose"]
    C -->|"Ultra-rapid (UM)"| G["⚠️ AVOID\\nToxicity Risk"]
    D --> H["Monitor Response"]
    E --> I["Use Alternative\\n(Morphine, Hydromorphone)"]
    G --> I
    style E fill:#ef4444,color:#fff
    style G fill:#ef4444,color:#fff
    style D fill:#22c55e,color:#fff`,
};

/**
 * Polypharmacy Management template
 */
export const polypharmacyManagement: DiagramTemplate = {
  id: 'pharma-polypharmacy-management',
  name: 'Polypharmacy Assessment and Deprescribing',
  description: 'Algorithm for managing multiple medications and deprescribing',
  domain: 'medicine',
  promptTemplate: `Create a polypharmacy management algorithm:
- Patient age: {{patientAge}}
- Number of medications: {{medicationCount}}
- Conditions being treated: {{conditions}}
- High-risk medications: {{highRiskMeds}}
- Potentially inappropriate medications (Beers): {{beersListMeds}}
- Drug-drug interactions identified: {{interactions}}
- Deprescribing candidates: {{deprescribingCandidates}}
- Monitoring plan: {{monitoringPlan}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'patientAge',
    'medicationCount',
    'conditions',
    'highRiskMeds',
    'beersListMeds',
    'interactions',
    'deprescribingCandidates',
    'monitoringPlan',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Medication\\nReview")] --> B["List All\\nMedications"]
    B --> C{"≥5 Meds?\\n(Polypharmacy)"}
    C -->|"Yes"| D["Screen for:\\n• Beers List\\n• Interactions\\n• Duplications"]
    C -->|"No"| E["Standard Review"]
    D --> F{"Issues\\nFound?"}
    F -->|"PIMs"| G["Deprescribing\\nCandidates"]
    F -->|"Interactions"| H["Adjust or\\nSubstitute"]
    F -->|"Duplications"| I["Consolidate\\nTherapy"]
    G --> J["Taper Plan\\n+ Monitoring"]
    H --> K["Optimize\\nRegimen"]
    I --> K
    J --> L["Follow-up\\n2-4 weeks"]
    style D fill:#f59e0b,color:#000
    style G fill:#22c55e,color:#fff`,
};

/**
 * Drug Development Pipeline template
 */
export const drugDevelopmentPipeline: DiagramTemplate = {
  id: 'pharma-drug-development-pipeline',
  name: 'Drug Development Pipeline',
  description: 'Complete drug development process from discovery to market approval',
  domain: 'medicine',
  promptTemplate: `Create a drug development pipeline diagram:
- Compound/drug name: {{compoundName}}
- Target indication: {{indication}}
- Discovery phase findings: {{discoveryFindings}}
- Preclinical results: {{preclinicalResults}}
- Phase I design: {{phase1Design}}
- Phase II design: {{phase2Design}}
- Phase III design: {{phase3Design}}
- Regulatory pathway: {{regulatoryPathway}}
- Estimated timeline: {{timeline}}
{{#additionalNotes}}Development challenges: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'compoundName',
    'indication',
    'discoveryFindings',
    'preclinicalResults',
    'phase1Design',
    'phase2Design',
    'phase3Design',
    'regulatoryPathway',
    'timeline',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Discovery["Discovery (2-4 years)"]
        A["Target ID"] --> B["Lead Optimization"]
        B --> C["Candidate Selection"]
    end
    subgraph Preclinical["Preclinical (1-2 years)"]
        D["Safety Studies"] --> E["PK/PD Studies"]
        E --> F["IND Application"]
    end
    subgraph Clinical["Clinical Trials (6-7 years)"]
        G["Phase I\\n(Safety, n=20-100)"]
        H["Phase II\\n(Efficacy, n=100-500)"]
        I["Phase III\\n(Confirmatory, n=1000+)"]
    end
    subgraph Approval["Approval (1-2 years)"]
        J["NDA/BLA\\nSubmission"]
        K["FDA Review"]
        L["✓ Market\\nApproval"]
    end
    C --> D
    F --> G
    G --> H
    H --> I
    I --> J
    J --> K
    K --> L
    style L fill:#22c55e,color:#fff
    style G fill:#3b82f6,color:#fff
    style H fill:#f59e0b,color:#000
    style I fill:#ef4444,color:#fff`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All pharmacology templates
 */
export const pharmacologyTemplates: DiagramTemplate[] = [
  // Pharmacokinetics
  admePathway,
  firstOrderElimination,
  steadyStateDosing,
  // Pharmacodynamics
  doseResponseCurve,
  receptorBinding,
  therapeuticIndex,
  // Drug Interactions
  drugDrugInteraction,
  cyp450Pathway,
  // TDM
  tdmProtocol,
  vancomycinDosing,
  // ADR
  adrClassification,
  drugAllergyWorkup,
  // Clinical Prescribing
  antibioticSelection,
  opioidPrescribing,
  anticoagulationSelection,
  insulinInitiation,
  // Drug Mechanisms
  gpcrSignaling,
  ionChannelDrugs,
  enzymeInhibitor,
  // Special Populations
  renalDosing,
  hepaticDosing,
  pregnancyDrugSafety,
  // Pharmacogenomics & Advanced
  pharmacogenomicsDosing,
  polypharmacyManagement,
  drugDevelopmentPipeline,
];

export default pharmacologyTemplates;
