/**
 * Antibiotics Template Library
 * Diagram templates for antibiotic drug classes
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// DRUG MECHANISM DIAGRAMS
// =============================================================================

export const antibioticMechanismDiagram: DiagramTemplate = {
  id: 'abx-mechanism-diagram',
  name: 'Antibiotic Mechanism of Action',
  description: 'Diagram showing how antibiotics target bacterial structures',
  domain: 'medicine',
  promptTemplate: `Create an antibiotic mechanism diagram:
- Drug class: {{drugClass}}
- Target site: {{targetSite}}
- Mechanism: {{mechanism}}
- Effect on bacteria: {{bacterialEffect}}
- Resistance mechanisms: {{resistanceMechanisms}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['drugClass', 'targetSite', 'mechanism', 'bacterialEffect', 'resistanceMechanisms', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Antibiotic"] --> B{"Target Site"}
    B -->|"Cell Wall"| C["Beta-lactams\\nVancomycin"]
    B -->|"Ribosome 30S"| D["Aminoglycosides\\nTetracyclines"]
    B -->|"Ribosome 50S"| E["Macrolides\\nClindamycin"]
    B -->|"DNA Gyrase"| F["Fluoroquinolones"]
    B -->|"Folate"| G["TMP-SMX"]
    style A fill:#4CAF50,color:#fff`
};

export const antibioticSpectrumChart: DiagramTemplate = {
  id: 'abx-spectrum-chart',
  name: 'Antibiotic Spectrum of Activity',
  description: 'Chart showing coverage of different antibiotic classes',
  domain: 'medicine',
  promptTemplate: `Create an antibiotic spectrum chart:
- Antibiotics to compare: {{antibiotics}}
- Gram-positive coverage: {{gramPositive}}
- Gram-negative coverage: {{gramNegative}}
- Atypical coverage: {{atypicalCoverage}}
- Anaerobic coverage: {{anaerobicCoverage}}
- Special organisms: {{specialOrganisms}}
{{#additionalNotes}}Notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['antibiotics', 'gramPositive', 'gramNegative', 'atypicalCoverage', 'anaerobicCoverage', 'specialOrganisms', 'additionalNotes'],
  mermaidExample: `flowchart LR
    subgraph GP["Gram Positive"]
        MSSA & MRSA & Strep & Enterococcus
    end
    subgraph GN["Gram Negative"]
        Ecoli & Pseudomonas & Klebsiella
    end
    Vancomycin --> MSSA & MRSA & Strep
    Ceftriaxone --> MSSA & Strep & Ecoli & Klebsiella
    PipTazo --> MSSA & Ecoli & Pseudomonas & Klebsiella`
};

export const antibioticDosingAlgorithm: DiagramTemplate = {
  id: 'abx-dosing-algorithm',
  name: 'Antibiotic Dosing Algorithm',
  description: 'Algorithm for antibiotic dose adjustments based on patient factors',
  domain: 'medicine',
  promptTemplate: `Create an antibiotic dosing algorithm:
- Drug: {{drug}}
- Standard dose: {{standardDose}}
- Renal adjustment: {{renalAdjustment}}
- Hepatic adjustment: {{hepaticAdjustment}}
- Weight-based dosing: {{weightBased}}
- Therapeutic monitoring: {{therapeuticMonitoring}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['drug', 'standardDose', 'renalAdjustment', 'hepaticAdjustment', 'weightBased', 'therapeuticMonitoring', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Vancomycin Dosing"] --> B{"Renal Function"}
    B -->|"CrCl >50"| C["15-20 mg/kg q8-12h"]
    B -->|"CrCl 20-50"| D["15 mg/kg q24h"]
    B -->|"CrCl <20"| E["15 mg/kg q48-72h"]
    C & D & E --> F["Check Trough"]
    F --> G{"Trough Level"}
    G -->|"<10"| H["Increase Dose"]
    G -->|"10-20"| I["Maintain"]
    G -->|">20"| J["Decrease Dose"]`
};

export const empiricAntibioticSelection: DiagramTemplate = {
  id: 'abx-empiric-selection',
  name: 'Empiric Antibiotic Selection',
  description: 'Decision tree for empiric antibiotic therapy by infection site',
  domain: 'medicine',
  promptTemplate: `Create an empiric antibiotic selection flowchart:
- Infection site: {{infectionSite}}
- Common pathogens: {{commonPathogens}}
- Risk factors for resistance: {{resistanceRiskFactors}}
- First-line options: {{firstLineOptions}}
- Alternative options: {{alternativeOptions}}
- Duration of therapy: {{duration}}
{{#additionalNotes}}Additional considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['infectionSite', 'commonPathogens', 'resistanceRiskFactors', 'firstLineOptions', 'alternativeOptions', 'duration', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Community-Acquired\\nPneumonia"] --> B{"Severity?"}
    B -->|"Outpatient"| C["Amoxicillin or\\nDoxycycline"]
    B -->|"Inpatient"| D{"ICU?"}
    D -->|"No"| E["Ceftriaxone +\\nAzithromycin"]
    D -->|"Yes"| F["Ceftriaxone +\\nAzithromycin +\\nVanc if MRSA risk"]
    style A fill:#F44336,color:#fff`
};

export const antibioticResistanceMechanisms: DiagramTemplate = {
  id: 'abx-resistance-mechanisms',
  name: 'Antibiotic Resistance Mechanisms',
  description: 'Diagram showing mechanisms of antibiotic resistance',
  domain: 'medicine',
  promptTemplate: `Create an antibiotic resistance mechanism diagram:
- Drug class: {{drugClass}}
- Resistance mechanism: {{resistanceMechanism}}
- Genetic basis: {{geneticBasis}}
- Prevalence: {{prevalence}}
- Clinical implications: {{clinicalImplications}}
{{#additionalNotes}}Detection methods: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['drugClass', 'resistanceMechanism', 'geneticBasis', 'prevalence', 'clinicalImplications', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Resistance Mechanisms"] --> B["Enzymatic\\nInactivation"]
    A --> C["Target\\nModification"]
    A --> D["Efflux\\nPumps"]
    A --> E["Decreased\\nPermeability"]
    B --> B1["Beta-lactamases\\nESBL, CRE"]
    C --> C1["PBP changes\\nMRSA"]
    D --> D1["Multiple drug\\nresistance"]`
};

export const antibioticDeEscalation: DiagramTemplate = {
  id: 'abx-de-escalation',
  name: 'Antibiotic De-escalation Protocol',
  description: 'Protocol for de-escalating broad-spectrum antibiotics',
  domain: 'medicine',
  promptTemplate: `Create an antibiotic de-escalation protocol:
- Initial broad-spectrum therapy: {{broadSpectrum}}
- Culture results: {{cultureResults}}
- Narrow-spectrum options: {{narrowSpectrum}}
- Timeline for de-escalation: {{timeline}}
- Criteria for continuation: {{continuationCriteria}}
{{#additionalNotes}}Stewardship considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['broadSpectrum', 'cultureResults', 'narrowSpectrum', 'timeline', 'continuationCriteria', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Start Broad Spectrum"] --> B["48-72h Culture Review"]
    B --> C{"Cultures\\nPositive?"}
    C -->|"Yes"| D["Target Therapy\\nto Pathogen"]
    C -->|"No"| E{"Clinical\\nImprovement?"}
    E -->|"Yes"| F["Consider\\nDiscontinuation"]
    E -->|"No"| G["Broaden Coverage\\nor Workup"]
    style D fill:#4CAF50,color:#fff`
};

export const penicillinAllergyWorkup: DiagramTemplate = {
  id: 'abx-pcn-allergy',
  name: 'Penicillin Allergy Workup',
  description: 'Algorithm for evaluating and managing penicillin allergy',
  domain: 'medicine',
  promptTemplate: `Create a penicillin allergy evaluation flowchart:
- Reported reaction: {{reportedReaction}}
- Reaction severity: {{reactionSeverity}}
- Time since reaction: {{timeSinceReaction}}
- Cross-reactivity risk: {{crossReactivity}}
- Testing options: {{testingOptions}}
- Alternative antibiotics: {{alternatives}}
{{#additionalNotes}}Desensitization criteria: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['reportedReaction', 'reactionSeverity', 'timeSinceReaction', 'crossReactivity', 'testingOptions', 'alternatives', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["PCN Allergy History"] --> B{"Type of Reaction?"}
    B -->|"Anaphylaxis"| C["High Risk"]
    B -->|"Rash"| D["Low Risk"]
    B -->|"Unknown"| E["Evaluate"]
    C --> F["Skin Testing\\nor Avoid"]
    D --> G["Consider Cephalosporin"]
    E --> H["Detailed History"]
    G --> I{"Tolerated?"}
    I -->|"Yes"| J["Update Allergy"]`
};

export const antibioticPK: DiagramTemplate = {
  id: 'abx-pharmacokinetics',
  name: 'Antibiotic Pharmacokinetics',
  description: 'Pharmacokinetic curves and dosing principles for antibiotics',
  domain: 'medicine',
  promptTemplate: `Create an antibiotic pharmacokinetics diagram:
- Drug: {{drug}}
- PK/PD parameter: {{pkpdParameter}}
- Half-life: {{halfLife}}
- Volume of distribution: {{volumeDistribution}}
- Protein binding: {{proteinBinding}}
- Tissue penetration: {{tissuePenetration}}
{{#additionalNotes}}Dosing implications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['drug', 'pkpdParameter', 'halfLife', 'volumeDistribution', 'proteinBinding', 'tissuePenetration', 'additionalNotes'],
  mermaidExample: `flowchart LR
    subgraph TimeDependent["Time-Dependent"]
        A["Beta-lactams"] --> A1["Goal: T>MIC"]
    end
    subgraph ConcDependent["Concentration-Dependent"]
        B["Aminoglycosides"] --> B1["Goal: Cmax/MIC"]
    end
    subgraph AUCDependent["AUC-Dependent"]
        C["Vancomycin"] --> C1["Goal: AUC/MIC"]
    end`
};

export const sepsisAntibioticProtocol: DiagramTemplate = {
  id: 'abx-sepsis-protocol',
  name: 'Sepsis Antibiotic Protocol',
  description: 'Protocol for antibiotic administration in sepsis',
  domain: 'medicine',
  promptTemplate: `Create a sepsis antibiotic protocol:
- Time to antibiotics goal: {{timeGoal}}
- Empiric regimen: {{empiricRegimen}}
- Source considerations: {{sourceConsiderations}}
- Blood cultures: {{bloodCultures}}
- Dosing in shock: {{shockDosing}}
- Reassessment timeline: {{reassessment}}
{{#additionalNotes}}Bundle compliance: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['timeGoal', 'empiricRegimen', 'sourceConsiderations', 'bloodCultures', 'shockDosing', 'reassessment', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Sepsis Suspected"] --> B["Blood Cultures x2"]
    B --> C["Antibiotics Within 1h"]
    C --> D["Broad Spectrum\\nPipTazo + Vanc"]
    D --> E["Reassess at 48h"]
    E --> F{"Culture Results"}
    F -->|"Positive"| G["Narrow Therapy"]
    F -->|"Negative"| H["Reassess Need"]
    style C fill:#F44336,color:#fff`
};

export const antibioticInteractions: DiagramTemplate = {
  id: 'abx-drug-interactions',
  name: 'Antibiotic Drug Interactions',
  description: 'Chart of significant antibiotic drug interactions',
  domain: 'medicine',
  promptTemplate: `Create an antibiotic drug interaction chart:
- Antibiotic: {{antibiotic}}
- Interacting drugs: {{interactingDrugs}}
- Mechanism of interaction: {{interactionMechanism}}
- Clinical significance: {{clinicalSignificance}}
- Management strategy: {{management}}
{{#additionalNotes}}Monitoring parameters: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['antibiotic', 'interactingDrugs', 'interactionMechanism', 'clinicalSignificance', 'management', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Fluoroquinolone"] --> B["Interactions"]
    B --> C["Cations\\nAl, Mg, Ca, Fe"]
    B --> D["QTc Drugs"]
    B --> E["Warfarin"]
    C --> C1["Separate by 2h"]
    D --> D1["Avoid Combination"]
    E --> E1["Monitor INR"]`
};

export const antibioticSideEffects: DiagramTemplate = {
  id: 'abx-side-effects',
  name: 'Antibiotic Side Effect Profiles',
  description: 'Comparison of side effect profiles across antibiotic classes',
  domain: 'medicine',
  promptTemplate: `Create an antibiotic side effect profile:
- Drug class: {{drugClass}}
- Common side effects: {{commonSideEffects}}
- Serious adverse effects: {{seriousEffects}}
- Monitoring required: {{monitoring}}
- Risk factors: {{riskFactors}}
{{#additionalNotes}}Prevention strategies: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['drugClass', 'commonSideEffects', 'seriousEffects', 'monitoring', 'riskFactors', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Aminoglycosides"] --> B["Side Effects"]
    B --> C["Nephrotoxicity"]
    B --> D["Ototoxicity"]
    B --> E["Neuromuscular Blockade"]
    C --> C1["Monitor Cr, BUN"]
    D --> D1["Monitor Hearing"]
    E --> E1["Avoid in MG"]
    style C fill:#F44336,color:#fff`
};

export const cdiffManagement: DiagramTemplate = {
  id: 'abx-cdiff-management',
  name: 'C. diff Infection Management',
  description: 'Algorithm for managing Clostridioides difficile infection',
  domain: 'medicine',
  promptTemplate: `Create a C. diff management algorithm:
- Episode type: {{episodeType}}
- Severity assessment: {{severityAssessment}}
- Initial treatment: {{initialTreatment}}
- Fulminant disease management: {{fulminantManagement}}
- Recurrence management: {{recurrenceManagement}}
{{#additionalNotes}}Prevention measures: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['episodeType', 'severityAssessment', 'initialTreatment', 'fulminantManagement', 'recurrenceManagement', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["C. diff Confirmed"] --> B{"Severity?"}
    B -->|"Non-severe"| C["Vancomycin PO\\nor Fidaxomicin"]
    B -->|"Severe"| D["Vancomycin PO\\nHigher Dose"]
    B -->|"Fulminant"| E["Vancomycin PO/PR\\n+ Metronidazole IV"]
    E --> F["Surgery Consult"]
    style E fill:#F44336,color:#fff`
};

export const surgicalProphylaxis: DiagramTemplate = {
  id: 'abx-surgical-prophylaxis',
  name: 'Surgical Antibiotic Prophylaxis',
  description: 'Protocol for surgical antibiotic prophylaxis by procedure type',
  domain: 'medicine',
  promptTemplate: `Create a surgical prophylaxis protocol:
- Surgery type: {{surgeryType}}
- Recommended antibiotic: {{recommendedAntibiotic}}
- Timing: {{timing}}
- Redosing criteria: {{redosingCriteria}}
- Duration: {{duration}}
- Allergy alternatives: {{allergyAlternatives}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['surgeryType', 'recommendedAntibiotic', 'timing', 'redosingCriteria', 'duration', 'allergyAlternatives', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Surgical Prophylaxis"] --> B{"Procedure Type"}
    B -->|"Cardiac"| C["Cefazolin 2g"]
    B -->|"Colorectal"| D["Cefazolin + Metro"]
    B -->|"GU"| E["Cefazolin"]
    C & D & E --> F["Within 60 min\\nof Incision"]
    F --> G["Redose if >3h\\nor Blood Loss"]`
};

export const ivToPoConversion: DiagramTemplate = {
  id: 'abx-iv-to-po',
  name: 'IV to PO Antibiotic Conversion',
  description: 'Guidelines for converting IV antibiotics to oral',
  domain: 'medicine',
  promptTemplate: `Create an IV to PO conversion guide:
- IV antibiotic: {{ivAntibiotic}}
- PO equivalent: {{poEquivalent}}
- Bioavailability: {{bioavailability}}
- Conversion criteria: {{conversionCriteria}}
- Monitoring after conversion: {{monitoring}}
{{#additionalNotes}}Contraindications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['ivAntibiotic', 'poEquivalent', 'bioavailability', 'conversionCriteria', 'monitoring', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["IV to PO Conversion"] --> B{"Criteria Met?"}
    B -->|"Afebrile 24h"| C{"GI Function"}
    C -->|"Intact"| D{"High Bioavail\\nOption?"}
    D -->|"Yes"| E["Convert to PO"]
    D -->|"No"| F["Continue IV"]
    C -->|"Impaired"| F
    style E fill:#4CAF50,color:#fff`
};

export const endocarditisProphylaxis: DiagramTemplate = {
  id: 'abx-endocarditis-prophylaxis',
  name: 'Endocarditis Prophylaxis',
  description: 'Guidelines for antibiotic prophylaxis before dental procedures',
  domain: 'medicine',
  promptTemplate: `Create an endocarditis prophylaxis guide:
- Cardiac conditions requiring prophylaxis: {{cardiacConditions}}
- Procedures requiring prophylaxis: {{procedures}}
- Standard regimen: {{standardRegimen}}
- Penicillin allergy regimen: {{allergyRegimen}}
- Timing: {{timing}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['cardiacConditions', 'procedures', 'standardRegimen', 'allergyRegimen', 'timing', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Dental Procedure"] --> B{"High-Risk\\nCardiac Condition?"}
    B -->|"Yes"| C{"Procedure\\nType?"}
    C -->|"Gingival\\nManipulation"| D["Prophylaxis\\nRequired"]
    D --> E{"PCN Allergy?"}
    E -->|"No"| F["Amoxicillin 2g"]
    E -->|"Yes"| G["Clindamycin or\\nAzithromycin"]
    B -->|"No"| H["No Prophylaxis"]`
};

export const antibioticStewardship: DiagramTemplate = {
  id: 'abx-stewardship-program',
  name: 'Antibiotic Stewardship Program',
  description: 'Framework for antibiotic stewardship interventions',
  domain: 'medicine',
  promptTemplate: `Create an antibiotic stewardship framework:
- Core strategies: {{coreStrategies}}
- Prospective audit: {{prospectiveAudit}}
- Preauthorization: {{preauthorization}}
- Metrics tracked: {{metrics}}
- Education initiatives: {{education}}
{{#additionalNotes}}Implementation barriers: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['coreStrategies', 'prospectiveAudit', 'preauthorization', 'metrics', 'education', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Stewardship Program"] --> B["Prospective Audit\\n& Feedback"]
    A --> C["Formulary\\nRestrictions"]
    A --> D["Guidelines\\nDevelopment"]
    A --> E["Education"]
    B --> F["Metrics"]
    F --> G["DOT/1000 PD"]
    F --> H["De-escalation\\nRate"]
    F --> I["Resistance\\nTrends"]`
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

export const antibioticsTemplates: DiagramTemplate[] = [
  antibioticMechanismDiagram,
  antibioticSpectrumChart,
  antibioticDosingAlgorithm,
  empiricAntibioticSelection,
  antibioticResistanceMechanisms,
  antibioticDeEscalation,
  penicillinAllergyWorkup,
  antibioticPK,
  sepsisAntibioticProtocol,
  antibioticInteractions,
  antibioticSideEffects,
  cdiffManagement,
  surgicalProphylaxis,
  ivToPoConversion,
  endocarditisProphylaxis,
  antibioticStewardship,
];

export default antibioticsTemplates;
