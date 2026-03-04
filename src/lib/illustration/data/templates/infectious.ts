/**
 * infectious.ts
 * Infectious Disease diagram templates for FINNISH
 *
 * Contains comprehensive templates for infectious disease medicine including:
 * - Clinical decision algorithms (7)
 * - Anatomical diagrams (4)
 * - Procedure illustrations (3)
 * - Data visualization templates (4)
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// CLINICAL DECISION TREES (7)
// =============================================================================

/**
 * Fever Workup Algorithm template
 */
export const feverWorkup: DiagramTemplate = {
  id: 'inf-fever-workup',
  name: 'Fever Workup Algorithm',
  description: 'Systematic approach to evaluating fever of unknown origin',
  domain: 'medicine',
  promptTemplate: `Create a fever workup algorithm flowchart:
- Patient presentation: {{presentation}}
- Duration of fever: {{duration}}
- Associated symptoms: {{symptoms}}
- Initial labs to order: {{initialLabs}}
- Imaging considerations: {{imaging}}
- Culture sites: {{cultureSites}}
- Empiric therapy triggers: {{empiricTriggers}}
{{#additionalNotes}}Additional clinical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentation',
    'duration',
    'symptoms',
    'initialLabs',
    'imaging',
    'cultureSites',
    'empiricTriggers',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Initial["Initial Assessment"]
        A[("Fever\\n>38.3C")] --> B{"Hemodynamically\\nStable?"}
    end
    subgraph Unstable["Unstable Patient"]
        B -->|"No"| C["Sepsis Protocol"]
        C --> C1["Blood Cultures x2"]
        C --> C2["Lactate + CBC/CMP"]
        C --> C3["Empiric Broad Abx"]
    end
    subgraph Stable["Stable Workup"]
        B -->|"Yes"| D["History + Exam"]
        D --> E{"Source\\nIdentified?"}
        E -->|"Yes"| F["Targeted Workup"]
        E -->|"No"| G["FUO Protocol"]
    end
    style C fill:#DC143C,color:#fff
    style F fill:#228B22,color:#fff`,
};

/**
 * Sepsis Management Algorithm template
 */
export const sepsisManagement: DiagramTemplate = {
  id: 'inf-sepsis-management',
  name: 'Sepsis Management Algorithm',
  description: 'Hour-1 bundle and sepsis/septic shock management pathway',
  domain: 'medicine',
  promptTemplate: `Create a sepsis management flowchart:
- qSOFA criteria: {{qsofaCriteria}}
- SIRS criteria: {{sirsCriteria}}
- Hour-1 bundle elements: {{hour1Bundle}}
- Fluid resuscitation targets: {{fluidTargets}}
- Vasopressor selection: {{vasopressors}}
- Source control measures: {{sourceControl}}
- De-escalation criteria: {{deescalation}}
{{#additionalNotes}}Additional management: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'qsofaCriteria',
    'sirsCriteria',
    'hour1Bundle',
    'fluidTargets',
    'vasopressors',
    'sourceControl',
    'deescalation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Suspected\\nInfection")] --> B{"qSOFA >=2?"}
    B -->|"Yes"| C["Sepsis Likely"]
    B -->|"No"| D["Monitor Closely"]
    C --> E["Hour-1 Bundle"]
    E --> E1["Lactate"]
    E --> E2["Blood Cultures"]
    E --> E3["Broad Abx"]
    E --> E4["30mL/kg Crystalloid"]
    E1 & E2 & E3 & E4 --> F{"Lactate >2\\nor MAP <65?"}
    F -->|"Yes"| G["Septic Shock"]
    G --> H["Vasopressors"]
    F -->|"No"| I["Continue Monitoring"]
    style G fill:#DC143C,color:#fff
    style I fill:#228B22,color:#fff`,
};

/**
 * Antibiotic Selection Algorithm template
 */
export const antibioticSelection: DiagramTemplate = {
  id: 'inf-antibiotic-selection',
  name: 'Empiric Antibiotic Selection',
  description: 'Guide for selecting appropriate empiric antibiotic therapy by infection site',
  domain: 'medicine',
  promptTemplate: `Create an antibiotic selection algorithm:
- Infection site: {{infectionSite}}
- Suspected pathogens: {{suspectedPathogens}}
- Patient factors: {{patientFactors}}
- Local resistance patterns: {{resistancePatterns}}
- First-line agents: {{firstLineAgents}}
- Alternative agents: {{alternativeAgents}}
- Duration of therapy: {{duration}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'infectionSite',
    'suspectedPathogens',
    'patientFactors',
    'resistancePatterns',
    'firstLineAgents',
    'alternativeAgents',
    'duration',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Infection Site"] --> B{"Community vs\\nHospital?"}
    B -->|"Community"| C["CAP/UTI/SSTI"]
    B -->|"Hospital"| D["HAP/CAUTI/SSI"]
    C --> E{"Risk Factors\\nfor MDR?"}
    E -->|"No"| F["Narrow Spectrum"]
    E -->|"Yes"| G["Broader Coverage"]
    D --> H["Broad Spectrum"]
    H --> I["Pseudomonal Coverage"]
    H --> J["MRSA Coverage"]
    F --> K["De-escalate PRN"]
    style F fill:#228B22,color:#fff
    style H fill:#FFA500,color:#000`,
};

/**
 * HIV Management Algorithm template
 */
export const hivManagement: DiagramTemplate = {
  id: 'inf-hiv-management',
  name: 'HIV Management Algorithm',
  description: 'Comprehensive HIV diagnosis, staging, and ART initiation pathway',
  domain: 'medicine',
  promptTemplate: `Create an HIV management flowchart:
- Screening indication: {{screeningIndication}}
- Diagnostic testing sequence: {{diagnosticSequence}}
- Baseline labs: {{baselineLabs}}
- CD4 count staging: {{cd4Staging}}
- Opportunistic infection prophylaxis: {{oiProphylaxis}}
- ART regimen selection: {{artRegimen}}
- Monitoring schedule: {{monitoring}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'screeningIndication',
    'diagnosticSequence',
    'baselineLabs',
    'cd4Staging',
    'oiProphylaxis',
    'artRegimen',
    'monitoring',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["HIV Screening"] --> B{"4th Gen\\nAg/Ab+?"}
    B -->|"No"| C["Negative"]
    B -->|"Yes"| D["Confirmatory\\nHIV-1/2 Ab"]
    D -->|"+"| E["HIV Confirmed"]
    D -->|"-"| F["HIV-1 RNA"]
    E --> G["Baseline Labs"]
    G --> G1["CD4 Count"]
    G --> G2["Viral Load"]
    G --> G3["Resistance Testing"]
    G1 --> H{"CD4 <200?"}
    H -->|"Yes"| I["OI Prophylaxis"]
    G3 --> J["Start ART"]
    J --> K["INSTI-based Regimen"]
    style E fill:#DC143C,color:#fff
    style K fill:#228B22,color:#fff`,
};

/**
 * TB Treatment Algorithm template
 */
export const tbTreatment: DiagramTemplate = {
  id: 'inf-tb-treatment',
  name: 'Tuberculosis Treatment Algorithm',
  description: 'TB diagnosis, treatment phases, and LTBI management',
  domain: 'medicine',
  promptTemplate: `Create a TB treatment flowchart:
- Screening method: {{screeningMethod}}
- Diagnostic workup: {{diagnostics}}
- Drug susceptibility: {{susceptibility}}
- Intensive phase regimen: {{intensivePhase}}
- Continuation phase: {{continuationPhase}}
- LTBI treatment options: {{ltbiOptions}}
- DOT requirements: {{dotRequirements}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'screeningMethod',
    'diagnostics',
    'susceptibility',
    'intensivePhase',
    'continuationPhase',
    'ltbiOptions',
    'dotRequirements',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["TB Suspected"] --> B["AFB Smear + Culture\\n+ NAAT"]
    B --> C{"Active TB\\nConfirmed?"}
    C -->|"Yes"| D["RIPE Therapy"]
    C -->|"No"| E{"LTBI?"}
    D --> D1["Intensive: 2mo\\nRIF+INH+PZA+EMB"]
    D1 --> D2["Continuation: 4mo\\nRIF+INH"]
    E -->|"Yes"| F["LTBI Treatment"]
    F --> F1["3HP (12 doses)"]
    F --> F2["4R (4 months)"]
    F --> F3["9H (9 months)"]
    E -->|"No"| G["No Treatment"]
    style D fill:#DC143C,color:#fff
    style F1 fill:#228B22,color:#fff`,
};

/**
 * Pneumonia Pathway template
 */
export const pneumoniaPathway: DiagramTemplate = {
  id: 'inf-pneumonia-pathway',
  name: 'Pneumonia Management Pathway',
  description: 'CAP and HAP/VAP diagnosis and treatment algorithm',
  domain: 'medicine',
  promptTemplate: `Create a pneumonia management flowchart:
- Pneumonia type: {{pneumoniaType}}
- Severity scoring: {{severityScore}}
- Risk stratification: {{riskStratification}}
- Diagnostic workup: {{diagnostics}}
- Empiric therapy: {{empiricTherapy}}
- ICU criteria: {{icuCriteria}}
- Duration of therapy: {{duration}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'pneumoniaType',
    'severityScore',
    'riskStratification',
    'diagnostics',
    'empiricTherapy',
    'icuCriteria',
    'duration',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Pneumonia\\nDiagnosed"] --> B{"CAP vs\\nHAP/VAP?"}
    B -->|"CAP"| C["CURB-65 Score"]
    B -->|"HAP/VAP"| D["Broad Spectrum"]
    C -->|"0-1"| E["Outpatient"]
    C -->|"2"| F["Admit Floor"]
    C -->|"3-5"| G["ICU"]
    E --> H["Amoxicillin or\\nDoxycycline"]
    F --> I["Beta-lactam +\\nMacrolide"]
    G --> J["Beta-lactam +\\nFluoroquinolone"]
    D --> K["Anti-pseudomonal +\\nMRSA coverage"]
    style G fill:#DC143C,color:#fff
    style E fill:#228B22,color:#fff`,
};

/**
 * Skin Infection Approach template
 */
export const skinInfectionApproach: DiagramTemplate = {
  id: 'inf-skin-infection',
  name: 'Skin Infection Approach',
  description: 'Classification and treatment of skin and soft tissue infections',
  domain: 'medicine',
  promptTemplate: `Create a skin infection management flowchart:
- Infection classification: {{classification}}
- Purulent vs non-purulent: {{purulentStatus}}
- Severity assessment: {{severity}}
- MRSA risk factors: {{mrsaRisk}}
- Treatment approach: {{treatment}}
- Surgical consultation criteria: {{surgicalCriteria}}
- Follow-up recommendations: {{followUp}}
{{#additionalNotes}}Special situations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'classification',
    'purulentStatus',
    'severity',
    'mrsaRisk',
    'treatment',
    'surgicalCriteria',
    'followUp',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["SSTI"] --> B{"Purulent?"}
    B -->|"Yes"| C["Abscess/Furuncle"]
    B -->|"No"| D["Cellulitis/Erysipelas"]
    C --> E{"Size?"}
    E -->|"Small"| F["I&D Alone"]
    E -->|"Large"| G["I&D + Antibiotics"]
    D --> H{"Severe?"}
    H -->|"No"| I["PO Beta-lactam"]
    H -->|"Yes"| J["IV Vanc +\\nPip-Tazo"]
    G --> K["TMP-SMX or\\nDoxycycline"]
    style J fill:#DC143C,color:#fff
    style F fill:#228B22,color:#fff`,
};

// =============================================================================
// ANATOMICAL DIAGRAMS (4)
// =============================================================================

/**
 * Infection Sites Overview template
 */
export const infectionSitesOverview: DiagramTemplate = {
  id: 'inf-sites-overview',
  name: 'Common Infection Sites Overview',
  description: 'Anatomical overview of common infection sites and typical pathogens',
  domain: 'medicine',
  promptTemplate: `Create an infection sites anatomical diagram:
- Body regions to include: {{bodyRegions}}
- CNS infections: {{cnsInfections}}
- Respiratory infections: {{respiratoryInfections}}
- Cardiac infections: {{cardiacInfections}}
- Abdominal infections: {{abdominalInfections}}
- Urinary infections: {{urinaryInfections}}
- Skin/soft tissue: {{skinInfections}}
{{#additionalNotes}}Associated pathogens: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'bodyRegions',
    'cnsInfections',
    'respiratoryInfections',
    'cardiacInfections',
    'abdominalInfections',
    'urinaryInfections',
    'skinInfections',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph CNS["CNS"]
        A["Meningitis\\nEncephalitis"]
    end
    subgraph Resp["Respiratory"]
        B["Pneumonia\\nBronchitis"]
    end
    subgraph Cardiac["Cardiac"]
        C["Endocarditis"]
    end
    subgraph Abdom["Abdominal"]
        D["Peritonitis\\nAbscess"]
    end
    subgraph GU["Genitourinary"]
        E["UTI\\nPyelonephritis"]
    end
    subgraph Skin["Skin/Soft Tissue"]
        F["Cellulitis\\nAbscess"]
    end
    A --> B --> C --> D --> E --> F`,
};

/**
 * Immune System Overview template
 */
export const immuneSystemOverview: DiagramTemplate = {
  id: 'inf-immune-system',
  name: 'Immune System Overview',
  description: 'Innate and adaptive immune system components and interactions',
  domain: 'medicine',
  promptTemplate: `Create an immune system diagram:
- Innate immunity components: {{innateComponents}}
- Adaptive immunity components: {{adaptiveComponents}}
- Cellular immunity: {{cellularImmunity}}
- Humoral immunity: {{humoralImmunity}}
- Antigen presentation: {{antigenPresentation}}
- Cytokine networks: {{cytokines}}
{{#additionalNotes}}Immunodeficiency states: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'innateComponents',
    'adaptiveComponents',
    'cellularImmunity',
    'humoralImmunity',
    'antigenPresentation',
    'cytokines',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Innate["Innate Immunity"]
        A["Barriers\\nSkin, Mucosa"]
        B["Phagocytes\\nNeutrophils, Macrophages"]
        C["NK Cells"]
        D["Complement"]
    end
    subgraph Adaptive["Adaptive Immunity"]
        E["T Cells\\nCD4+, CD8+"]
        F["B Cells\\nPlasma Cells"]
        G["Antibodies\\nIgG, IgM, IgA"]
    end
    A --> B --> C --> D
    B -->|"APC"| E
    E -->|"Help"| F --> G
    style E fill:#10B981,color:#fff
    style G fill:#3B82F6,color:#fff`,
};

/**
 * Bacterial Cell Structure template
 */
export const bacterialCellStructure: DiagramTemplate = {
  id: 'inf-bacterial-structure',
  name: 'Bacterial Cell Structure',
  description: 'Detailed bacterial cell anatomy with antibiotic targets',
  domain: 'medicine',
  promptTemplate: `Create a bacterial cell structure diagram:
- Cell wall composition: {{cellWall}}
- Cell membrane: {{membrane}}
- Ribosomes: {{ribosomes}}
- DNA/chromosome: {{dna}}
- Plasmids: {{plasmids}}
- Antibiotic target sites: {{antibioticTargets}}
{{#additionalNotes}}Gram positive vs negative: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'cellWall',
    'membrane',
    'ribosomes',
    'dna',
    'plasmids',
    'antibioticTargets',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Cell["Bacterial Cell"]
        subgraph Wall["Cell Wall"]
            A["Peptidoglycan\\nBeta-lactam target"]
        end
        subgraph Membrane["Membrane"]
            B["Lipid Bilayer\\nPolymyxin target"]
        end
        subgraph Cytoplasm["Cytoplasm"]
            C["30S Ribosome\\nAminoglycoside"]
            D["50S Ribosome\\nMacrolide"]
            E["DNA Gyrase\\nFluoroquinolone"]
            F["Folate Pathway\\nTMP-SMX"]
        end
    end
    style A fill:#10B981
    style C fill:#3B82F6
    style E fill:#F59E0B`,
};

/**
 * Viral Replication Cycle template
 */
export const viralReplicationCycle: DiagramTemplate = {
  id: 'inf-viral-replication',
  name: 'Viral Replication Cycle',
  description: 'Steps of viral replication with antiviral drug targets',
  domain: 'medicine',
  promptTemplate: `Create a viral replication cycle diagram:
- Attachment/entry: {{attachment}}
- Uncoating: {{uncoating}}
- Replication: {{replication}}
- Assembly: {{assembly}}
- Release: {{release}}
- Antiviral targets: {{antiviralTargets}}
{{#additionalNotes}}Virus-specific variations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'attachment',
    'uncoating',
    'replication',
    'assembly',
    'release',
    'antiviralTargets',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["1. Attachment\\nReceptor binding"] --> B["2. Entry\\nFusion/Endocytosis"]
    B --> C["3. Uncoating\\nRelease genome"]
    C --> D["4. Replication\\nRNA/DNA synthesis"]
    D --> E["5. Translation\\nProtein synthesis"]
    E --> F["6. Assembly\\nVirion formation"]
    F --> G["7. Release\\nBudding/Lysis"]
    G -->|"New virions"| A
    B -.->|"Fusion inhibitors"| B1["Enfuvirtide"]
    D -.->|"Polymerase inhib"| D1["Acyclovir"]
    E -.->|"Protease inhib"| E1["Ritonavir"]
    style D fill:#EF4444
    style E fill:#EF4444`,
};

// =============================================================================
// PROCEDURE ILLUSTRATIONS (3)
// =============================================================================

/**
 * Blood Culture Technique template
 */
export const bloodCultureTechnique: DiagramTemplate = {
  id: 'inf-blood-culture-technique',
  name: 'Blood Culture Collection Technique',
  description: 'Step-by-step blood culture collection to minimize contamination',
  domain: 'medicine',
  promptTemplate: `Create a blood culture technique flowchart:
- Indication for cultures: {{indication}}
- Site preparation: {{sitePrep}}
- Collection technique: {{technique}}
- Volume requirements: {{volume}}
- Number of sets: {{numberOfSets}}
- Timing considerations: {{timing}}
- Contamination prevention: {{contaminationPrevention}}
{{#additionalNotes}}Special situations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'indication',
    'sitePrep',
    'technique',
    'volume',
    'numberOfSets',
    'timing',
    'contaminationPrevention',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Indication:\\nSuspected BSI"] --> B["Gather Supplies"]
    B --> C["Hand Hygiene"]
    C --> D["Select Site\\n(Peripheral preferred)"]
    D --> E["Prep with Chlorhexidine\\n(30 sec dry)"]
    E --> F["Prep Bottle Tops\\nwith alcohol"]
    F --> G["Venipuncture\\n(New needle OK)"]
    G --> H["Fill Aerobic First\\n10mL each"]
    H --> I["Fill Anaerobic\\n10mL"]
    I --> J["2 Sets from\\nDifferent Sites"]
    J --> K["Label + Transport\\nRoom Temp"]
    style E fill:#FFA500,color:#000
    style J fill:#228B22,color:#fff`,
};

/**
 * Lumbar Puncture Indications template
 */
export const lpIndications: DiagramTemplate = {
  id: 'inf-lp-indications',
  name: 'Lumbar Puncture Indications',
  description: 'Indications, contraindications, and CSF interpretation for LP',
  domain: 'medicine',
  promptTemplate: `Create a lumbar puncture decision flowchart:
- Clinical indications: {{indications}}
- Contraindications: {{contraindications}}
- Pre-LP imaging criteria: {{imagingCriteria}}
- CSF studies to order: {{csfStudies}}
- Normal CSF values: {{normalValues}}
- Bacterial vs viral patterns: {{csfPatterns}}
- Complications: {{complications}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'indications',
    'contraindications',
    'imagingCriteria',
    'csfStudies',
    'normalValues',
    'csfPatterns',
    'complications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Suspected\\nMeningitis"] --> B{"Focal Neuro\\nDeficit?"}
    B -->|"Yes"| C["CT Head First"]
    B -->|"No"| D{"Papilledema?\\nImmuno?"}
    D -->|"Yes"| C
    D -->|"No"| E["LP Safe"]
    C --> F{"Mass\\nEffect?"}
    F -->|"Yes"| G["Defer LP\\nEmpiric Abx"]
    F -->|"No"| E
    E --> H["CSF Analysis"]
    H --> I["Cell Count\\nProtein/Glucose\\nGram Stain\\nCulture"]
    style G fill:#DC143C,color:#fff
    style E fill:#228B22,color:#fff`,
};

/**
 * Isolation Precautions Protocol template
 */
export const isolationPrecautions: DiagramTemplate = {
  id: 'inf-isolation-protocol',
  name: 'Isolation Precautions Protocol',
  description: 'Guide for selecting appropriate isolation precautions by pathogen',
  domain: 'medicine',
  promptTemplate: `Create an isolation precautions flowchart:
- Standard precautions: {{standardPrecautions}}
- Contact precautions indications: {{contactIndications}}
- Droplet precautions indications: {{dropletIndications}}
- Airborne precautions indications: {{airborneIndications}}
- PPE requirements: {{ppeRequirements}}
- Room requirements: {{roomRequirements}}
- Duration of isolation: {{duration}}
{{#additionalNotes}}Special pathogens: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'standardPrecautions',
    'contactIndications',
    'dropletIndications',
    'airborneIndications',
    'ppeRequirements',
    'roomRequirements',
    'duration',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Suspected\\nInfection"] --> B{"Transmission\\nRoute?"}
    B -->|"Contact"| C["Contact Precautions"]
    B -->|"Droplet"| D["Droplet Precautions"]
    B -->|"Airborne"| E["Airborne Precautions"]
    C --> C1["Gown + Gloves\\nPrivate Room"]
    C --> C2["MRSA, VRE\\nC. diff, Scabies"]
    D --> D1["Surgical Mask\\nPrivate Room"]
    D --> D2["Influenza\\nMeningococcus"]
    E --> E1["N95 + AIIR\\nNegative Pressure"]
    E --> E2["TB, Measles\\nVZV, COVID"]
    style E fill:#DC143C,color:#fff
    style C fill:#FFA500,color:#000`,
};

// =============================================================================
// DATA VISUALIZATION TEMPLATES (4)
// =============================================================================

/**
 * Antibiotic Spectrum Chart template
 */
export const antibioticSpectrum: DiagramTemplate = {
  id: 'inf-antibiotic-spectrum',
  name: 'Antibiotic Spectrum Chart',
  description: 'Visual representation of antibiotic coverage by organism',
  domain: 'medicine',
  promptTemplate: `Create an antibiotic spectrum chart:
- Gram positive coverage: {{gramPositive}}
- Gram negative coverage: {{gramNegative}}
- Anaerobic coverage: {{anaerobic}}
- Atypical coverage: {{atypical}}
- Pseudomonal activity: {{pseudomonal}}
- MRSA activity: {{mrsa}}
- Key antibiotic classes: {{antibioticClasses}}
{{#additionalNotes}}Local resistance patterns: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'gramPositive',
    'gramNegative',
    'anaerobic',
    'atypical',
    'pseudomonal',
    'mrsa',
    'antibioticClasses',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Narrow["Narrow Spectrum"]
        A["Penicillin\\nStrep only"]
        B["Vancomycin\\nGram + only"]
    end
    subgraph Moderate["Moderate"]
        C["Ceftriaxone\\nNo Pseudomonas"]
        D["Fluoroquinolone\\n+ Atypicals"]
    end
    subgraph Broad["Broad Spectrum"]
        E["Pip-Tazo\\n+ Pseudomonas"]
        F["Carbapenem\\nBroadest"]
    end
    A --> C --> E
    B --> D --> F
    style A fill:#228B22,color:#fff
    style F fill:#DC143C,color:#fff`,
};

/**
 * Vaccination Schedule template
 */
export const vaccinationSchedule: DiagramTemplate = {
  id: 'inf-vaccination-schedule',
  name: 'Adult Vaccination Schedule',
  description: 'Recommended adult immunization schedule overview',
  domain: 'medicine',
  promptTemplate: `Create a vaccination schedule diagram:
- Routine adult vaccines: {{routineVaccines}}
- Age-specific recommendations: {{ageRecommendations}}
- High-risk group vaccines: {{highRiskVaccines}}
- Travel vaccines: {{travelVaccines}}
- Catch-up schedule: {{catchUp}}
- Contraindications: {{contraindications}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'routineVaccines',
    'ageRecommendations',
    'highRiskVaccines',
    'travelVaccines',
    'catchUp',
    'contraindications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Routine["Routine Adult"]
        A["Influenza\\n(Annual)"]
        B["Tdap/Td\\n(q10 years)"]
        C["COVID-19\\n(Per guidelines)"]
    end
    subgraph Age65["Age 65+"]
        D["Pneumococcal\\nPCV20 or PCV15+PPSV23"]
        E["Shingrix\\n(2 doses)"]
        F["RSV\\n(Single dose)"]
    end
    subgraph HighRisk["High Risk"]
        G["Hepatitis B"]
        H["Meningococcal"]
    end
    A --> D
    B --> E
    C --> F
    style D fill:#3B82F6,color:#fff
    style E fill:#3B82F6,color:#fff`,
};

/**
 * Resistance Patterns template
 */
export const resistancePatterns: DiagramTemplate = {
  id: 'inf-resistance-patterns',
  name: 'Antimicrobial Resistance Patterns',
  description: 'Common resistance mechanisms and MDR organism patterns',
  domain: 'medicine',
  promptTemplate: `Create a resistance patterns diagram:
- MRSA mechanisms: {{mrsaMechanisms}}
- ESBL producers: {{esblProducers}}
- CRE organisms: {{creOrganisms}}
- VRE characteristics: {{vreCharacteristics}}
- MDR Pseudomonas: {{mdrPseudomonas}}
- Treatment options: {{treatmentOptions}}
{{#additionalNotes}}Local epidemiology: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'mrsaMechanisms',
    'esblProducers',
    'creOrganisms',
    'vreCharacteristics',
    'mdrPseudomonas',
    'treatmentOptions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Resistance\\nMechanisms"] --> B["Beta-lactamase"]
    A --> C["Efflux Pumps"]
    A --> D["Target Modification"]
    A --> E["Porin Loss"]
    B --> B1["ESBL\\nCephalosporin R"]
    B --> B2["Carbapenemase\\nCRE"]
    D --> D1["mecA\\nMRSA"]
    D --> D2["vanA/vanB\\nVRE"]
    B1 --> F["Tx: Carbapenem"]
    B2 --> G["Tx: Ceftazidime-avibactam"]
    D1 --> H["Tx: Vancomycin"]
    D2 --> I["Tx: Daptomycin"]
    style B2 fill:#DC143C,color:#fff
    style D1 fill:#FFA500,color:#000`,
};

/**
 * qSOFA and Sepsis Criteria template
 */
export const sepsisGrading: DiagramTemplate = {
  id: 'inf-sepsis-criteria',
  name: 'qSOFA and Sepsis Criteria',
  description: 'Quick SOFA scoring and sepsis diagnostic criteria visualization',
  domain: 'medicine',
  promptTemplate: `Create a sepsis criteria diagram:
- qSOFA components: {{qsofaComponents}}
- SOFA score components: {{sofaComponents}}
- Sepsis definition: {{sepsisDefinition}}
- Septic shock criteria: {{shockCriteria}}
- Lactate thresholds: {{lactateThresholds}}
- Mortality correlation: {{mortality}}
{{#additionalNotes}}Clinical application: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'qsofaComponents',
    'sofaComponents',
    'sepsisDefinition',
    'shockCriteria',
    'lactateThresholds',
    'mortality',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph qSOFA["qSOFA (>=2 = High Risk)"]
        A["RR >= 22"]
        B["SBP <= 100"]
        C["Altered Mental Status"]
    end
    subgraph Sepsis["Sepsis Definition"]
        D["Infection + SOFA >= 2"]
    end
    subgraph Shock["Septic Shock"]
        E["Sepsis +\\nVasopressors for MAP >= 65"]
        F["Lactate > 2 despite fluids"]
    end
    A & B & C --> G{"Score >= 2?"}
    G -->|"Yes"| D
    D --> H{"Refractory\\nHypotension?"}
    H -->|"Yes"| E
    E --> F
    style E fill:#DC143C,color:#fff
    style G fill:#FFA500,color:#000`,
};

// =============================================================================
// ADDITIONAL CLINICAL TEMPLATES (7)
// =============================================================================

/**
 * Meningitis Workup Algorithm template
 */
export const meningitisWorkup: DiagramTemplate = {
  id: 'inf-meningitis-workup',
  name: 'Meningitis Workup Algorithm',
  description: 'Diagnostic approach to suspected meningitis including CSF analysis',
  domain: 'medicine',
  promptTemplate: `Create a meningitis workup flowchart:
- Clinical presentation: {{clinicalPresentation}}
- Pre-LP considerations: {{preLPConsiderations}}
- CSF analysis parameters: {{csfParameters}}
- Bacterial vs viral patterns: {{bacterialVsViral}}
- Empiric therapy: {{empiricTherapy}}
- Steroid adjunct criteria: {{steroidCriteria}}
- Culture and PCR testing: {{diagnosticTests}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'clinicalPresentation',
    'preLPConsiderations',
    'csfParameters',
    'bacterialVsViral',
    'empiricTherapy',
    'steroidCriteria',
    'diagnosticTests',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Suspected\\nMeningitis")] --> B{"Focal Neuro\\nDeficit?"}
    B -->|"Yes"| C["CT Head First"]
    B -->|"No"| D["LP Safe"]
    C --> E{"Mass Effect?"}
    E -->|"Yes"| F["Defer LP\\nEmpiric Abx + Dex"]
    E -->|"No"| D
    D --> G["CSF Analysis"]
    G --> H{"WBC >1000\\nGlucose <40\\nProtein >200?"}
    H -->|"Yes"| I["Bacterial\\nLikely"]
    H -->|"No"| J["Viral\\nLikely"]
    I --> K["Ceftriaxone +\\nVanc + Dex"]
    J --> L["Supportive Care\\nConsider HSV"]
    style I fill:#DC143C,color:#fff
    style J fill:#228B22,color:#fff`,
};

/**
 * Opportunistic Infections in HIV template
 */
export const hivOpportunisticInfections: DiagramTemplate = {
  id: 'inf-hiv-oi',
  name: 'HIV Opportunistic Infections',
  description: 'CD4-based opportunistic infection risks and prophylaxis',
  domain: 'medicine',
  promptTemplate: `Create an HIV opportunistic infections diagram:
- CD4 thresholds: {{cd4Thresholds}}
- Primary prophylaxis: {{primaryProphylaxis}}
- Treatment of active OIs: {{oiTreatment}}
- Secondary prophylaxis: {{secondaryProphylaxis}}
- Discontinuation criteria: {{discontinuationCriteria}}
- IRIS considerations: {{irisConsiderations}}
{{#additionalNotes}}ART timing: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'cd4Thresholds',
    'primaryProphylaxis',
    'oiTreatment',
    'secondaryProphylaxis',
    'discontinuationCriteria',
    'irisConsiderations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph CD4_200["CD4 < 200"]
        A["PCP Prophylaxis\\nTMP-SMX DS daily"]
        B["Toxoplasma (if IgG+)\\nTMP-SMX DS daily"]
    end
    subgraph CD4_100["CD4 < 100"]
        C["Histoplasma/Cocci\\n(endemic areas)"]
    end
    subgraph CD4_50["CD4 < 50"]
        D["MAC Prophylaxis\\nAzithromycin 1200 weekly"]
        E["CMV monitoring"]
    end
    F["Start ART"] --> G{"CD4 Response?"}
    G -->|"CD4 > 200 x 3mo"| H["Stop PCP/Toxo\\nProphylaxis"]
    G -->|"CD4 > 100 x 3mo"| I["Stop MAC\\nProphylaxis"]
    style A fill:#FFA500,color:#000
    style D fill:#DC143C,color:#fff`,
};

/**
 * Travel Medicine Pre-departure template
 */
export const travelMedicine: DiagramTemplate = {
  id: 'inf-travel-medicine',
  name: 'Travel Medicine Pre-departure',
  description: 'Pre-travel consultation and vaccine/prophylaxis recommendations',
  domain: 'medicine',
  promptTemplate: `Create a travel medicine consultation flowchart:
- Destination assessment: {{destinationAssessment}}
- Routine vaccines: {{routineVaccines}}
- Required vaccines: {{requiredVaccines}}
- Recommended vaccines: {{recommendedVaccines}}
- Malaria prophylaxis: {{malariaProphylaxis}}
- Traveler's diarrhea prevention: {{diarrheaPrevention}}
- Post-travel evaluation: {{postTravelEval}}
{{#additionalNotes}}Special travelers: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'destinationAssessment',
    'routineVaccines',
    'requiredVaccines',
    'recommendedVaccines',
    'malariaProphylaxis',
    'diarrheaPrevention',
    'postTravelEval',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Travel Consult"] --> B["Assess Destination\\n& Itinerary"]
    B --> C{"Malaria\\nEndemic?"}
    C -->|"Yes"| D["Prophylaxis:\\nAtovaquone-proguanil\\nDoxycycline\\nMefloquine"]
    B --> E{"Yellow Fever\\nRequired?"}
    E -->|"Yes"| F["YF Vaccine\\n(IHR Certificate)"]
    B --> G["Routine Vaccines"]
    G --> G1["Tdap"]
    G --> G2["MMR"]
    G --> G3["Influenza"]
    B --> H["Travel Vaccines"]
    H --> H1["Hepatitis A/B"]
    H --> H2["Typhoid"]
    H --> H3["Rabies (if indicated)"]
    style F fill:#FFA500,color:#000
    style D fill:#10B981,color:#fff`,
};

/**
 * Antimicrobial Stewardship Protocol template
 */
export const stewardshipProtocol: DiagramTemplate = {
  id: 'inf-stewardship-protocol',
  name: 'Antimicrobial Stewardship Protocol',
  description: 'ASP interventions and antibiotic optimization strategies',
  domain: 'medicine',
  promptTemplate: `Create an antimicrobial stewardship flowchart:
- Prospective audit: {{prospectiveAudit}}
- Formulary restrictions: {{formularyRestrictions}}
- De-escalation criteria: {{deescalationCriteria}}
- IV-to-PO conversion: {{ivToPoConversion}}
- Duration optimization: {{durationOptimization}}
- Antibiotic timeout: {{antibioticTimeout}}
- Outcome metrics: {{outcomeMetrics}}
{{#additionalNotes}}Implementation strategies: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'prospectiveAudit',
    'formularyRestrictions',
    'deescalationCriteria',
    'ivToPoConversion',
    'durationOptimization',
    'antibioticTimeout',
    'outcomeMetrics',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Antibiotic\\nInitiated"] --> B["72h Review"]
    B --> C{"Culture\\nResults?"}
    C -->|"Positive"| D["De-escalate\\nto Targeted"]
    C -->|"Negative"| E{"Clinical\\nImprovement?"}
    E -->|"Yes"| F["Consider\\nStopping"]
    E -->|"No"| G["Reassess\\nDiagnosis"]
    D --> H{"IV to PO\\nCriteria Met?"}
    H -->|"Yes"| I["Convert to PO"]
    B --> J["Duration\\nAssessment"]
    J --> K["Follow IDSA\\nGuidelines"]
    K --> L["Shortest Effective\\nDuration"]
    style D fill:#228B22,color:#fff
    style F fill:#10B981,color:#fff
    style I fill:#3B82F6,color:#fff`,
};

/**
 * Fungal Infection Diagnosis template
 */
export const fungalDiagnosis: DiagramTemplate = {
  id: 'inf-fungal-diagnosis',
  name: 'Fungal Infection Diagnosis',
  description: 'Diagnostic approach to invasive fungal infections',
  domain: 'medicine',
  promptTemplate: `Create a fungal infection diagnosis flowchart:
- Risk factors: {{riskFactors}}
- Clinical syndromes: {{clinicalSyndromes}}
- Diagnostic tests: {{diagnosticTests}}
- Biomarkers: {{biomarkers}}
- Imaging findings: {{imagingFindings}}
- Species identification: {{speciesID}}
- Antifungal selection: {{antifungalSelection}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'riskFactors',
    'clinicalSyndromes',
    'diagnosticTests',
    'biomarkers',
    'imagingFindings',
    'speciesID',
    'antifungalSelection',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Suspected IFI")] --> B{"Host\\nFactors?"}
    B -->|"Neutropenic"| C["Invasive\\nAspergillosis"]
    B -->|"ICU/Lines"| D["Invasive\\nCandidiasis"]
    B -->|"Endemic Exposure"| E["Histo/Blasto\\nCocci"]
    C --> F["Galactomannan\\nBeta-D-Glucan\\nCT Chest"]
    F --> G{"Halo Sign?"}
    G -->|"Yes"| H["Start\\nVoriconazole"]
    D --> I["Blood Cultures\\nBeta-D-Glucan"]
    I --> J{"Candida\\nSpecies?"}
    J -->|"C. albicans"| K["Fluconazole"]
    J -->|"C. glabrata"| L["Echinocandin"]
    E --> M["Urine/Serum Ag\\nCulture"]
    style C fill:#556B2F,color:#fff
    style D fill:#CD853F,color:#fff`,
};

/**
 * Outbreak Investigation Flowchart template
 */
export const outbreakInvestigation: DiagramTemplate = {
  id: 'inf-outbreak-investigation',
  name: 'Outbreak Investigation Flowchart',
  description: 'Systematic approach to outbreak investigation and control',
  domain: 'medicine',
  promptTemplate: `Create an outbreak investigation flowchart:
- Case identification: {{caseIdentification}}
- Case definition: {{caseDefinition}}
- Epidemiologic curve: {{epiCurve}}
- Hypothesis generation: {{hypothesisGeneration}}
- Analytic studies: {{analyticStudies}}
- Control measures: {{controlMeasures}}
- Communication: {{communication}}
{{#additionalNotes}}Reporting requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'caseIdentification',
    'caseDefinition',
    'epiCurve',
    'hypothesisGeneration',
    'analyticStudies',
    'controlMeasures',
    'communication',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Outbreak\\nSuspected"] --> B["Verify\\nDiagnosis"]
    B --> C["Establish\\nCase Definition"]
    C --> D["Case\\nFinding"]
    D --> E["Describe by\\nTime/Place/Person"]
    E --> F["Construct\\nEpi Curve"]
    F --> G["Generate\\nHypotheses"]
    G --> H["Test Hypotheses\\n(Case-Control)"]
    H --> I["Identify\\nSource"]
    I --> J["Implement\\nControl Measures"]
    J --> J1["Isolation"]
    J --> J2["Prophylaxis"]
    J --> J3["Source Removal"]
    J --> K["Communication\\n& Reporting"]
    K --> L["Post-Outbreak\\nEvaluation"]
    style A fill:#DC143C,color:#fff
    style J fill:#228B22,color:#fff`,
};

/**
 * Healthcare-Associated Infection Prevention Bundle template
 */
export const haiPreventionBundle: DiagramTemplate = {
  id: 'inf-hai-prevention',
  name: 'HAI Prevention Bundle',
  description: 'Evidence-based bundles for preventing healthcare-associated infections',
  domain: 'medicine',
  promptTemplate: `Create an HAI prevention bundle diagram:
- CLABSI bundle: {{clabsiBundle}}
- CAUTI bundle: {{cautiBundle}}
- VAP bundle: {{vapBundle}}
- SSI prevention: {{ssiPrevention}}
- Hand hygiene: {{handHygiene}}
- Monitoring metrics: {{monitoringMetrics}}
- Compliance tracking: {{complianceTracking}}
{{#additionalNotes}}Quality improvement: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'clabsiBundle',
    'cautiBundle',
    'vapBundle',
    'ssiPrevention',
    'handHygiene',
    'monitoringMetrics',
    'complianceTracking',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph CLABSI["CLABSI Prevention"]
        A1["Hand Hygiene"]
        A2["Maximal Barrier"]
        A3["Chlorhexidine Prep"]
        A4["Optimal Site"]
        A5["Daily Line Review"]
    end
    subgraph CAUTI["CAUTI Prevention"]
        B1["Avoid Unnecessary\\nCatheters"]
        B2["Aseptic Insertion"]
        B3["Daily Need Review"]
        B4["Prompt Removal"]
    end
    subgraph VAP["VAP Prevention"]
        C1["HOB Elevation 30-45"]
        C2["Daily Sedation Wake"]
        C3["Oral Care CHG"]
        C4["DVT Prophylaxis"]
        C5["Peptic Ulcer Prophylaxis"]
    end
    D["Compliance\\nMonitoring"] --> E["Infection\\nRate Tracking"]
    E --> F["Feedback to\\nClinicians"]
    style A1 fill:#228B22,color:#fff
    style B1 fill:#3B82F6,color:#fff
    style C1 fill:#8B5CF6,color:#fff`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All infectious disease templates
 */
export const infectiousTemplates: DiagramTemplate[] = [
  // Clinical Decision Trees
  feverWorkup,
  sepsisManagement,
  antibioticSelection,
  hivManagement,
  tbTreatment,
  pneumoniaPathway,
  skinInfectionApproach,
  // Anatomical Diagrams
  infectionSitesOverview,
  immuneSystemOverview,
  bacterialCellStructure,
  viralReplicationCycle,
  // Procedure Illustrations
  bloodCultureTechnique,
  lpIndications,
  isolationPrecautions,
  // Data Visualization
  antibioticSpectrum,
  vaccinationSchedule,
  resistancePatterns,
  sepsisGrading,
  // Additional Clinical Templates
  meningitisWorkup,
  hivOpportunisticInfections,
  travelMedicine,
  stewardshipProtocol,
  fungalDiagnosis,
  outbreakInvestigation,
  haiPreventionBundle,
];

export default infectiousTemplates;
