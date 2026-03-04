/**
 * neurology.ts
 * Neurology diagram templates for FINNISH
 *
 * Contains comprehensive templates for neurological medicine including:
 * - Neural pathway diagrams
 * - Brain anatomy cross-sections
 * - Stroke assessment workflows
 * - Neurological examination flowcharts
 * - Diagnostic algorithms
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// CLINICAL DECISION TREES
// =============================================================================

/**
 * Acute Stroke Assessment Algorithm template
 */
export const strokeAssessment: DiagramTemplate = {
  id: 'neuro-stroke-assessment',
  name: 'Acute Stroke Assessment Algorithm',
  description: 'NIH Stroke Scale assessment and treatment pathway for acute stroke',
  domain: 'medicine',
  promptTemplate: `Create an acute stroke assessment algorithm:
- Time of symptom onset: {{symptomOnset}}
- NIHSS score: {{nihssScore}}
- CT findings: {{ctFindings}}
- tPA eligibility: {{tpaEligibility}}
- Large vessel occlusion: {{lvo}}
- Contraindications: {{contraindications}}
- Treatment pathway: {{treatmentPathway}}
{{#additionalNotes}}Additional clinical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'symptomOnset',
    'nihssScore',
    'ctFindings',
    'tpaEligibility',
    'lvo',
    'contraindications',
    'treatmentPathway',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Acute Stroke\\nSymptoms")] --> B["NIHSS Assessment"]
    B --> C{"Time Since\\nOnset?"}
    C -->|"<4.5h"| D["CT Head STAT"]
    C -->|">4.5h"| E["CT + CTA"]
    D -->|"No Hemorrhage"| F{"tPA\\nEligible?"}
    F -->|"Yes"| G["IV tPA"]
    F -->|"No"| H["Supportive Care"]
    E --> I{"LVO on\\nCTA?"}
    I -->|"Yes"| J["Thrombectomy Eval"]
    I -->|"No"| H
    G --> K{"LVO?"}
    K -->|"Yes"| J
    style A fill:#DC143C,color:#fff
    style G fill:#228B22,color:#fff
    style J fill:#4169E1,color:#fff`,
};

/**
 * Headache Evaluation Algorithm template
 */
export const headacheEvaluation: DiagramTemplate = {
  id: 'neuro-headache-evaluation',
  name: 'Headache Evaluation Algorithm',
  description: 'Diagnostic approach to acute and chronic headache',
  domain: 'medicine',
  promptTemplate: `Create a headache evaluation algorithm:
- Headache characteristics: {{characteristics}}
- Red flag symptoms: {{redFlags}}
- Duration and onset: {{duration}}
- Associated symptoms: {{associatedSymptoms}}
- Primary vs secondary: {{headacheType}}
- Imaging indications: {{imagingIndications}}
- Treatment approach: {{treatment}}
{{#additionalNotes}}Additional factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'characteristics',
    'redFlags',
    'duration',
    'associatedSymptoms',
    'headacheType',
    'imagingIndications',
    'treatment',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Headache\\nPresentation")] --> B{"Red Flags?"}
    B -->|"Thunderclap\\nWorst ever"| C["CT/LP for SAH"]
    B -->|"Fever + Stiff Neck"| D["LP for Meningitis"]
    B -->|"None"| E{"Primary\\nHeadache?"}
    E -->|"Migraine Features"| F["Migraine Tx"]
    E -->|"Cluster Features"| G["Cluster Tx"]
    E -->|"Tension Type"| H["TTH Tx"]
    C -->|"Negative"| I["CTA/MRA"]
    style C fill:#DC143C,color:#fff
    style D fill:#FFA500,color:#000
    style F fill:#228B22,color:#fff`,
};

/**
 * Seizure Management Algorithm template
 */
export const seizureManagement: DiagramTemplate = {
  id: 'neuro-seizure-management',
  name: 'Seizure Management Algorithm',
  description: 'Status epilepticus and new-onset seizure management pathway',
  domain: 'medicine',
  promptTemplate: `Create a seizure management algorithm:
- Seizure type: {{seizureType}}
- Duration: {{duration}}
- First-line treatment: {{firstLine}}
- Second-line treatment: {{secondLine}}
- Status epilepticus criteria: {{statusCriteria}}
- Workup required: {{workup}}
- Maintenance therapy: {{maintenance}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'seizureType',
    'duration',
    'firstLine',
    'secondLine',
    'statusCriteria',
    'workup',
    'maintenance',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Active\\nSeizure")] --> B["ABCs + O2"]
    B --> C{"Duration\\n>5 min?"}
    C -->|"Yes"| D["Benzodiazepine"]
    C -->|"No"| E["Monitor"]
    D --> F{"Seizure\\nContinues?"}
    F -->|"Yes"| G["2nd Line AED"]
    F -->|"No"| H["Load AED"]
    G --> I{"Still Seizing\\n>30 min?"}
    I -->|"Yes"| J["RSI + cEEG"]
    I -->|"No"| H
    H --> K["EEG + MRI"]
    style A fill:#DC143C,color:#fff
    style J fill:#8B0000,color:#fff`,
};

/**
 * Altered Mental Status Workup template
 */
export const neuroAlteredMentalStatus: DiagramTemplate = {
  id: 'neuro-ams-workup',
  name: 'Altered Mental Status Workup',
  description: 'Systematic approach to altered mental status evaluation',
  domain: 'medicine',
  promptTemplate: `Create an altered mental status workup:
- Baseline mental status: {{baseline}}
- GCS score: {{gcsScore}}
- Vital signs: {{vitals}}
- Toxic/metabolic causes: {{toxicMetabolic}}
- Infectious workup: {{infectiousWorkup}}
- Structural causes: {{structural}}
- Treatment approach: {{treatment}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'baseline',
    'gcsScore',
    'vitals',
    'toxicMetabolic',
    'infectiousWorkup',
    'structural',
    'treatment',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Altered Mental\\nStatus")] --> B["ABCs + Glucose"]
    B --> C{"Hypoglycemia?"}
    C -->|"Yes"| D["D50 IV"]
    C -->|"No"| E["Labs + CT"]
    E --> F{"Fever?"}
    F -->|"Yes"| G["LP if Safe"]
    F -->|"No"| H{"Focal\\nDeficit?"}
    H -->|"Yes"| I["Stroke Protocol"]
    H -->|"No"| J["Tox Screen"]
    J --> K{"Overdose?"}
    K -->|"Opioid"| L["Naloxone"]
    K -->|"Benzo"| M["Flumazenil?"]
    style A fill:#FFA500,color:#000
    style D fill:#228B22,color:#fff`,
};

/**
 * Multiple Sclerosis Diagnostic Criteria template
 */
export const msDiagnostic: DiagramTemplate = {
  id: 'neuro-ms-diagnostic',
  name: 'MS Diagnostic Criteria',
  description: 'McDonald criteria for multiple sclerosis diagnosis',
  domain: 'medicine',
  promptTemplate: `Create an MS diagnostic algorithm:
- Clinical attacks: {{clinicalAttacks}}
- Objective lesions: {{objectiveLesions}}
- MRI criteria: {{mriCriteria}}
- CSF findings: {{csfFindings}}
- DIS criteria: {{disCriteria}}
- DIT criteria: {{ditCriteria}}
- Differential diagnosis: {{differential}}
{{#additionalNotes}}Additional workup: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'clinicalAttacks',
    'objectiveLesions',
    'mriCriteria',
    'csfFindings',
    'disCriteria',
    'ditCriteria',
    'differential',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Suspected\\nMS")] --> B{"Clinical\\nAttacks?"}
    B -->|">=2"| C{"Objective\\nLesions >=2?"}
    B -->|"1"| D["MRI + CSF"]
    C -->|"Yes"| E["MS Confirmed"]
    C -->|"1 Lesion"| F["DIS Criteria"]
    D --> G{"DIS + DIT\\nMet?"}
    G -->|"Yes"| E
    G -->|"No"| H["Follow-up MRI"]
    F --> I{"Additional\\nMRI Lesions?"}
    I -->|"Yes"| E
    style E fill:#DC143C,color:#fff
    style H fill:#FFA500,color:#000`,
};

// =============================================================================
// ANATOMICAL DIAGRAMS
// =============================================================================

/**
 * Neural Pathway Diagram template
 */
export const neuralPathway: DiagramTemplate = {
  id: 'neuro-neural-pathway',
  name: 'Neural Pathway Diagram',
  description: 'Motor or sensory neural pathway illustration',
  domain: 'medicine',
  promptTemplate: `Create a neural pathway diagram:
- Pathway type: {{pathwayType}}
- Origin: {{origin}}
- Decussation level: {{decussation}}
- Relay nuclei: {{relayNuclei}}
- Termination: {{termination}}
- Key structures: {{keyStructures}}
- Clinical correlates: {{clinicalCorrelates}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'pathwayType',
    'origin',
    'decussation',
    'relayNuclei',
    'termination',
    'keyStructures',
    'clinicalCorrelates',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Cortex["Motor Cortex"]
        A["Primary Motor\\nCortex (M1)"]
    end
    subgraph Internal["Internal Capsule"]
        B["Posterior Limb"]
    end
    subgraph Brainstem["Brainstem"]
        C["Cerebral Peduncle"]
        D["Pyramidal\\nDecussation"]
    end
    subgraph Spinal["Spinal Cord"]
        E["Lateral\\nCorticospinal"]
        F["Alpha Motor\\nNeuron"]
    end
    A --> B --> C --> D
    D -->|"85%"| E --> F
    style D fill:#FFA500,color:#000`,
};

/**
 * Brain Anatomy Cross Section template
 */
export const brainCrossSection: DiagramTemplate = {
  id: 'neuro-brain-cross-section',
  name: 'Brain Anatomy Cross Section',
  description: 'Labeled cross-sectional brain anatomy',
  domain: 'medicine',
  promptTemplate: `Create a brain cross-section diagram:
- Section level: {{sectionLevel}}
- Structures to label: {{structures}}
- Gray matter regions: {{grayMatter}}
- White matter tracts: {{whiteMatter}}
- Ventricles: {{ventricles}}
- Blood supply: {{bloodSupply}}
{{#additionalNotes}}Clinical annotations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'sectionLevel',
    'structures',
    'grayMatter',
    'whiteMatter',
    'ventricles',
    'bloodSupply',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Cortex["Cerebral Cortex"]
        A["Frontal Lobe"]
        B["Parietal Lobe"]
    end
    subgraph Deep["Deep Structures"]
        C["Basal Ganglia"]
        D["Thalamus"]
        E["Internal Capsule"]
    end
    subgraph Ventricle["Ventricular System"]
        F["Lateral Ventricle"]
        G["Third Ventricle"]
    end
    A --- E
    B --- E
    C --- D
    D --- G
    F --- G
    style C fill:#FFD700,color:#000
    style D fill:#87CEEB,color:#000`,
};

/**
 * Cranial Nerves Overview template
 */
export const cranialNerves: DiagramTemplate = {
  id: 'neuro-cranial-nerves',
  name: 'Cranial Nerves Overview',
  description: 'All 12 cranial nerves with functions and pathways',
  domain: 'medicine',
  promptTemplate: `Create a cranial nerves diagram:
- Nerves to include: {{nervesToInclude}}
- Origin/exit points: {{originPoints}}
- Functions: {{functions}}
- Motor vs sensory: {{motorSensory}}
- Clinical testing: {{clinicalTesting}}
- Common pathologies: {{pathologies}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'nervesToInclude',
    'originPoints',
    'functions',
    'motorSensory',
    'clinicalTesting',
    'pathologies',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Brainstem["Brainstem Origin"]
        M["Midbrain"]
        P["Pons"]
        Med["Medulla"]
    end
    subgraph CNs["Cranial Nerves"]
        CN3["III: Oculomotor"]
        CN5["V: Trigeminal"]
        CN7["VII: Facial"]
        CN10["X: Vagus"]
        CN12["XII: Hypoglossal"]
    end
    M --> CN3
    P --> CN5
    P --> CN7
    Med --> CN10
    Med --> CN12
    style CN3 fill:#4169E1,color:#fff
    style CN7 fill:#228B22,color:#fff`,
};

/**
 * Spinal Cord Tract Diagram template
 */
export const spinalCordTracts: DiagramTemplate = {
  id: 'neuro-spinal-cord-tracts',
  name: 'Spinal Cord Tracts',
  description: 'Ascending and descending spinal cord tract organization',
  domain: 'medicine',
  promptTemplate: `Create a spinal cord tract diagram:
- Ascending tracts: {{ascendingTracts}}
- Descending tracts: {{descendingTracts}}
- Cross-section level: {{sectionLevel}}
- Tract locations: {{tractLocations}}
- Functions: {{functions}}
- Clinical syndromes: {{clinicalSyndromes}}
{{#additionalNotes}}Additional annotations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ascendingTracts',
    'descendingTracts',
    'sectionLevel',
    'tractLocations',
    'functions',
    'clinicalSyndromes',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Posterior["Posterior Columns"]
        DC["Dorsal Column\\n(Proprioception)"]
    end
    subgraph Lateral["Lateral"]
        LST["Lateral\\nSpinothalamic\\n(Pain/Temp)"]
        LCS["Lateral\\nCorticospinal\\n(Motor)"]
    end
    subgraph Anterior["Anterior"]
        AST["Anterior\\nSpinothalamic\\n(Light Touch)"]
        ACS["Anterior\\nCorticospinal"]
    end
    DC --- LCS
    LST --- AST
    style DC fill:#4169E1,color:#fff
    style LCS fill:#DC143C,color:#fff`,
};

// =============================================================================
// PROCEDURE & EXAMINATION TEMPLATES
// =============================================================================

/**
 * Neurological Examination Flowchart template
 */
export const neuroExam: DiagramTemplate = {
  id: 'neuro-examination-flowchart',
  name: 'Neurological Examination Flowchart',
  description: 'Systematic neurological examination checklist',
  domain: 'medicine',
  promptTemplate: `Create a neurological examination flowchart:
- Mental status assessment: {{mentalStatus}}
- Cranial nerve exam: {{cranialNerves}}
- Motor exam: {{motorExam}}
- Sensory exam: {{sensoryExam}}
- Reflexes: {{reflexes}}
- Coordination: {{coordination}}
- Gait assessment: {{gait}}
{{#additionalNotes}}Special tests: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'mentalStatus',
    'cranialNerves',
    'motorExam',
    'sensoryExam',
    'reflexes',
    'coordination',
    'gait',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Neuro Exam"] --> B["Mental Status"]
    B --> B1["Orientation"]
    B --> B2["Attention"]
    B --> B3["Memory"]
    A --> C["Cranial Nerves"]
    C --> C1["II-XII Testing"]
    A --> D["Motor"]
    D --> D1["Strength 0-5"]
    D --> D2["Tone"]
    A --> E["Sensory"]
    E --> E1["Light Touch"]
    E --> E2["Pin/Temp"]
    E --> E3["Proprioception"]
    A --> F["Reflexes"]
    F --> F1["DTRs 0-4+"]
    A --> G["Coordination"]
    G --> G1["FNF"]
    G --> G2["HTS"]
    A --> H["Gait"]`,
};

/**
 * Lumbar Puncture Procedure template
 */
export const lumbarPunctureProcedure: DiagramTemplate = {
  id: 'neuro-lumbar-puncture',
  name: 'Lumbar Puncture Procedure',
  description: 'Step-by-step lumbar puncture technique and interpretation',
  domain: 'medicine',
  promptTemplate: `Create a lumbar puncture procedure diagram:
- Patient positioning: {{positioning}}
- Landmark identification: {{landmarks}}
- Needle insertion: {{needleInsertion}}
- Opening pressure: {{openingPressure}}
- CSF collection: {{csfCollection}}
- Studies to send: {{studies}}
- Interpretation: {{interpretation}}
{{#additionalNotes}}Complications to monitor: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'positioning',
    'landmarks',
    'needleInsertion',
    'openingPressure',
    'csfCollection',
    'studies',
    'interpretation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Position Patient"] --> B["Identify L3-L4"]
    B --> C["Prep + Drape"]
    C --> D["Local Anesthesia"]
    D --> E["Insert Needle"]
    E --> F["Check Opening\\nPressure"]
    F --> G["Collect CSF\\n4 Tubes"]
    G --> H["Send Studies"]
    H --> H1["Cell Count"]
    H --> H2["Glucose/Protein"]
    H --> H3["Gram Stain/Cx"]
    H --> H4["Special Tests"]
    style F fill:#FFA500,color:#000`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

// =============================================================================
// ADDITIONAL CLINICAL PATHWAYS - CLINICAL_75
// =============================================================================

/**
 * Stroke Pathway Decision Tree template
 */
export const strokePathwayDecision: DiagramTemplate = {
  id: 'neuro-stroke-pathway-decision',
  name: 'Stroke Pathway Decision Tree',
  description: 'Comprehensive stroke treatment pathway with imaging and intervention decisions',
  domain: 'medicine',
  promptTemplate: `Create a detailed stroke pathway decision tree:
- Symptom onset time: {{onsetTime}}
- NIHSS threshold for intervention: {{nihssThreshold}}
- Imaging protocol: {{imagingProtocol}}
- tPA criteria: {{tpaCriteria}}
- Thrombectomy criteria: {{thrombectomyCriteria}}
- Post-treatment monitoring: {{postTreatment}}
- Secondary prevention: {{secondaryPrevention}}
{{#additionalNotes}}Additional pathway details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'onsetTime',
    'nihssThreshold',
    'imagingProtocol',
    'tpaCriteria',
    'thrombectomyCriteria',
    'postTreatment',
    'secondaryPrevention',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Stroke Alert\\nActivated")] --> B["NIHSS Assessment"]
    B --> C{"NIHSS\\nScore?"}
    C -->|"0-5"| D["Minor Stroke Protocol"]
    C -->|"6-15"| E["Moderate Protocol"]
    C -->|">15"| F["Severe Protocol"]
    E --> G{"Time from\\nLKW?"}
    F --> G
    G -->|"<4.5h"| H["CT Head"]
    G -->|"4.5-24h"| I["CT + CTA + CTP"]
    H -->|"No bleed"| J{"tPA\\nEligible?"}
    J -->|"Yes"| K["IV Alteplase"]
    J -->|"No"| L["CTA for LVO"]
    I --> M{"Salvageable\\nPenumbra?"}
    M -->|"Yes"| N["Thrombectomy"]
    M -->|"No"| O["Medical Mgmt"]
    K --> L
    L -->|"LVO+"| N
    style A fill:#DC143C,color:#fff
    style K fill:#228B22,color:#fff
    style N fill:#4169E1,color:#fff`,
};

/**
 * Seizure Classification Diagram template
 */
export const seizureClassification: DiagramTemplate = {
  id: 'neuro-seizure-classification',
  name: 'ILAE Seizure Classification',
  description: 'ILAE 2017 seizure classification hierarchy',
  domain: 'medicine',
  promptTemplate: `Create an ILAE seizure classification diagram:
- Onset type: {{onsetType}}
- Focal seizure subtypes: {{focalSubtypes}}
- Generalized subtypes: {{generalizedSubtypes}}
- Unknown onset types: {{unknownOnset}}
- Awareness level: {{awarenessLevel}}
- Motor/non-motor features: {{motorFeatures}}
- Epilepsy syndrome: {{epilepsySyndrome}}
{{#additionalNotes}}Classification notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'onsetType',
    'focalSubtypes',
    'generalizedSubtypes',
    'unknownOnset',
    'awarenessLevel',
    'motorFeatures',
    'epilepsySyndrome',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Seizure Classification\\nILAE 2017"] --> B["Focal Onset"]
    A --> C["Generalized Onset"]
    A --> D["Unknown Onset"]

    B --> B1["Aware"]
    B --> B2["Impaired Awareness"]
    B1 --> B3["Motor"]
    B1 --> B4["Non-Motor"]
    B3 --> B5["Automatisms\\nAtonic\\nClonic\\nTonic"]
    B4 --> B6["Sensory\\nCognitive\\nEmotional\\nAutonomic"]

    C --> C1["Motor"]
    C --> C2["Non-Motor\\n(Absence)"]
    C1 --> C3["Tonic-Clonic\\nClonic\\nTonic\\nMyoclonic\\nAtonic"]
    C2 --> C4["Typical\\nAtypical\\nMyoclonic\\nEyelid Myoclonia"]

    D --> D1["Motor"]
    D --> D2["Non-Motor"]

    style A fill:#4169E1,color:#fff
    style B fill:#228B22,color:#fff
    style C fill:#DC143C,color:#fff`,
};

/**
 * Dermatome Map template
 */
export const dermatomeMap: DiagramTemplate = {
  id: 'neuro-dermatome-map',
  name: 'Dermatome and Myotome Map',
  description: 'Sensory dermatome and motor myotome distribution chart',
  domain: 'medicine',
  promptTemplate: `Create a dermatome/myotome map:
- Body region: {{bodyRegion}}
- Cervical levels: {{cervicalLevels}}
- Thoracic levels: {{thoracicLevels}}
- Lumbar levels: {{lumbarLevels}}
- Sacral levels: {{sacralLevels}}
- Key sensory points: {{keySensoryPoints}}
- Key motor groups: {{keyMotorGroups}}
{{#additionalNotes}}Clinical correlates: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'bodyRegion',
    'cervicalLevels',
    'thoracicLevels',
    'lumbarLevels',
    'sacralLevels',
    'keySensoryPoints',
    'keyMotorGroups',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Cervical["Cervical C1-C8"]
        C4["C4: Shoulder"]
        C5["C5: Lateral arm\\nDeltoid"]
        C6["C6: Thumb\\nBiceps, Wrist ext"]
        C7["C7: Middle finger\\nTriceps"]
        C8["C8: Little finger\\nFinger flex"]
    end

    subgraph Thoracic["Thoracic T1-T12"]
        T1["T1: Medial arm"]
        T4["T4: Nipple line"]
        T10["T10: Umbilicus"]
    end

    subgraph Lumbar["Lumbar L1-L5"]
        L1["L1: Inguinal"]
        L3["L3: Anterior thigh\\nQuadriceps"]
        L4["L4: Medial leg\\nAnkle DF"]
        L5["L5: Great toe\\nEHL"]
    end

    subgraph Sacral["Sacral S1-S5"]
        S1["S1: Lateral foot\\nAnkle PF"]
        S2["S2: Posterior thigh"]
    end

    style C5 fill:#87CEEB
    style L4 fill:#90EE90
    style S1 fill:#FFB6C1`,
};

/**
 * CSF Analysis Flowchart template
 */
export const csfAnalysisFlowchart: DiagramTemplate = {
  id: 'neuro-csf-analysis',
  name: 'CSF Analysis Interpretation',
  description: 'Cerebrospinal fluid analysis interpretation algorithm',
  domain: 'medicine',
  promptTemplate: `Create a CSF analysis interpretation flowchart:
- Opening pressure: {{openingPressure}}
- Cell count: {{cellCount}}
- Protein level: {{proteinLevel}}
- Glucose level: {{glucoseLevel}}
- Gram stain/culture: {{gramStain}}
- Special tests: {{specialTests}}
- Differential diagnosis: {{differential}}
{{#additionalNotes}}Interpretation notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'openingPressure',
    'cellCount',
    'proteinLevel',
    'glucoseLevel',
    'gramStain',
    'specialTests',
    'differential',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["CSF Analysis"] --> B{"Opening\\nPressure?"}
    B -->|">25 cmH2O"| C["Elevated ICP"]
    B -->|"Normal"| D{"WBC\\nCount?"}

    D -->|">1000\\nPMN predominant"| E["Bacterial\\nMeningitis"]
    D -->|"100-500\\nLymph predominant"| F["Viral/TB/Fungal"]
    D -->|"<10"| G["Non-infectious"]

    E --> H{"Glucose?"}
    H -->|"<40 or\\n<50% serum"| I["Confirm bacterial"]

    F --> J{"Protein?"}
    J -->|">100"| K["TB/Fungal likely"]
    J -->|"50-100"| L["Viral likely"]

    G --> M{"OCB/IgG\\nIndex?"}
    M -->|"Positive"| N["MS/Inflammatory"]
    M -->|"Negative"| O["Other causes"]

    E --> P["Gram stain\\nCulture\\nPCR"]

    style E fill:#DC143C,color:#fff
    style N fill:#FFA500
    style L fill:#228B22,color:#fff`,
};

/**
 * Neurodegenerative Disease Comparison template
 */
export const neurodegenerativeComparison: DiagramTemplate = {
  id: 'neuro-neurodegenerative-comparison',
  name: 'Neurodegenerative Disease Comparison',
  description: 'Comparative features of major neurodegenerative diseases',
  domain: 'medicine',
  promptTemplate: `Create a neurodegenerative disease comparison:
- Diseases to compare: {{diseasesToCompare}}
- Clinical features: {{clinicalFeatures}}
- Pathology: {{pathology}}
- Imaging findings: {{imagingFindings}}
- Biomarkers: {{biomarkers}}
- Genetics: {{genetics}}
- Treatment options: {{treatment}}
{{#additionalNotes}}Distinguishing features: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'diseasesToCompare',
    'clinicalFeatures',
    'pathology',
    'imagingFindings',
    'biomarkers',
    'genetics',
    'treatment',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph AD["Alzheimer Disease"]
        AD1["Memory loss\\nLanguage\\nVisuospatial"]
        AD2["Amyloid plaques\\nTau tangles"]
        AD3["Hippocampal\\natrophy"]
    end

    subgraph PD["Parkinson Disease"]
        PD1["Tremor\\nBradykinesia\\nRigidity"]
        PD2["Lewy bodies\\nα-synuclein"]
        PD3["SN\\ndegeneration"]
    end

    subgraph HD["Huntington Disease"]
        HD1["Chorea\\nPsychiatric\\nCognitive"]
        HD2["Huntingtin\\naggregates"]
        HD3["Caudate\\natrophy"]
    end

    subgraph ALS["ALS"]
        ALS1["UMN + LMN signs\\nWeakness\\nFasciculations"]
        ALS2["TDP-43\\ninclusions"]
        ALS3["Motor cortex\\nSC atrophy"]
    end

    style AD fill:#8B4513,color:#fff
    style PD fill:#4169E1,color:#fff
    style HD fill:#9932CC,color:#fff
    style ALS fill:#DC143C,color:#fff`,
};

/**
 * Myotome Testing Chart template
 */
export const myotomeTesting: DiagramTemplate = {
  id: 'neuro-myotome-testing',
  name: 'Myotome Testing Chart',
  description: 'Motor nerve root testing reference chart',
  domain: 'medicine',
  promptTemplate: `Create a myotome testing reference:
- Root levels: {{rootLevels}}
- Key muscles: {{keyMuscles}}
- Movements tested: {{movements}}
- Reflex associations: {{reflexes}}
- Clinical testing method: {{testingMethod}}
- Grading scale: {{gradingScale}}
{{#additionalNotes}}Testing notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'rootLevels',
    'keyMuscles',
    'movements',
    'reflexes',
    'testingMethod',
    'gradingScale',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Upper["Upper Limb"]
        C5["C5\\nDeltoid\\nShoulder Abd"]
        C6["C6\\nBiceps\\nElbow Flex"]
        C7["C7\\nTriceps\\nElbow Ext"]
        C8["C8\\nFDP\\nFinger Flex"]
        T1["T1\\nInterossei\\nFinger Abd"]
    end

    subgraph Lower["Lower Limb"]
        L2["L2\\nIliopsoas\\nHip Flex"]
        L3["L3\\nQuads\\nKnee Ext"]
        L4["L4\\nTib Ant\\nAnkle DF"]
        L5["L5\\nEHL\\nGreat toe Ext"]
        S1["S1\\nGastroc\\nAnkle PF"]
    end

    C5 --> C6 --> C7 --> C8 --> T1
    L2 --> L3 --> L4 --> L5 --> S1

    style C5 fill:#4169E1,color:#fff
    style L4 fill:#228B22,color:#fff`,
};

/**
 * Parkinson Disease Management template
 */
export const parkinsonManagement: DiagramTemplate = {
  id: 'neuro-parkinson-management',
  name: 'Parkinson Disease Management',
  description: 'Treatment algorithm for Parkinson disease across stages',
  domain: 'medicine',
  promptTemplate: `Create a Parkinson disease management algorithm:
- Disease stage: {{diseaseStage}}
- Motor symptoms: {{motorSymptoms}}
- Non-motor symptoms: {{nonMotorSymptoms}}
- First-line treatment: {{firstLine}}
- Adjunctive therapy: {{adjunctive}}
- Motor fluctuations: {{motorFluctuations}}
- Surgical options: {{surgicalOptions}}
{{#additionalNotes}}Treatment considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'diseaseStage',
    'motorSymptoms',
    'nonMotorSymptoms',
    'firstLine',
    'adjunctive',
    'motorFluctuations',
    'surgicalOptions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Parkinson Disease\\nDiagnosis"] --> B{"Age &\\nFunctional Status"}

    B -->|"Younger\\n<65 years"| C["MAO-B Inhibitor\\nor\\nDopamine Agonist"]
    B -->|"Older\\n>65 years"| D["Levodopa/Carbidopa"]

    C --> E{"Inadequate\\nControl?"}
    E -->|"Yes"| D

    D --> F{"Motor\\nFluctuations?"}
    F -->|"Wearing off"| G["Add MAO-B-I\\nor COMT-I"]
    F -->|"Dyskinesia"| H["Amantadine\\nDose adjustment"]
    F -->|"Severe"| I{"DBS\\nCandidate?"}

    I -->|"Yes"| J["DBS Evaluation"]
    I -->|"No"| K["Duopa\\nApomorphine"]

    A --> L["Non-Motor Tx"]
    L --> L1["Depression: SSRI"]
    L --> L2["Psychosis: Quetiapine"]
    L --> L3["Dementia: Rivastigmine"]

    style A fill:#4169E1,color:#fff
    style J fill:#9932CC,color:#fff`,
};

/**
 * Dementia Differential Diagnosis template
 */
export const dementiaDifferential: DiagramTemplate = {
  id: 'neuro-dementia-differential',
  name: 'Dementia Differential Diagnosis',
  description: 'Systematic approach to dementia classification and workup',
  domain: 'medicine',
  promptTemplate: `Create a dementia differential diagnosis pathway:
- Cognitive domains affected: {{cognitiveDomains}}
- Onset pattern: {{onsetPattern}}
- Reversible causes: {{reversibleCauses}}
- Neurodegenerative types: {{neurodegenerative}}
- Vascular features: {{vascularFeatures}}
- Laboratory workup: {{labWorkup}}
- Imaging findings: {{imaging}}
{{#additionalNotes}}Diagnostic pearls: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'cognitiveDomains',
    'onsetPattern',
    'reversibleCauses',
    'neurodegenerative',
    'vascularFeatures',
    'labWorkup',
    'imaging',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Cognitive\\nDecline"] --> B["History &\\nMoCA/MMSE"]
    B --> C{"Reversible\\nCauses?"}

    C -->|"Check"| D["Labs: TSH, B12\\nRPR, HIV"]
    C -->|"Excluded"| E{"Onset\\nPattern?"}

    E -->|"Gradual\\nMemory first"| F["Alzheimer\\nDisease"]
    E -->|"Stepwise\\nFocal signs"| G["Vascular\\nDementia"]
    E -->|"Fluctuating\\nHallucinations"| H["Lewy Body\\nDementia"]
    E -->|"Behavior\\nPersonality first"| I["Frontotemporal\\nDementia"]

    F --> J["MRI: MTL atrophy\\nAmyloid PET"]
    G --> K["MRI: Lacunes\\nWMH"]
    H --> L["DaTscan\\nPSG"]
    I --> M["MRI: Frontal\\natrophy"]

    style A fill:#8B4513,color:#fff
    style F fill:#DC143C,color:#fff
    style G fill:#4169E1,color:#fff
    style H fill:#9932CC,color:#fff`,
};

/**
 * Vertigo and Dizziness Algorithm template
 */
export const vertigoAlgorithm: DiagramTemplate = {
  id: 'neuro-vertigo-algorithm',
  name: 'Vertigo and Dizziness Algorithm',
  description: 'Diagnostic approach to vertigo differentiating central from peripheral causes',
  domain: 'medicine',
  promptTemplate: `Create a vertigo evaluation algorithm:
- Symptom characteristics: {{symptoms}}
- Duration of episodes: {{duration}}
- Associated symptoms: {{associatedSymptoms}}
- Physical examination: {{physicalExam}}
- HINTS exam: {{hintsExam}}
- Peripheral causes: {{peripheralCauses}}
- Central causes: {{centralCauses}}
{{#additionalNotes}}Red flags: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'symptoms',
    'duration',
    'associatedSymptoms',
    'physicalExam',
    'hintsExam',
    'peripheralCauses',
    'centralCauses',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Acute Vertigo"] --> B{"HINTS Exam"}

    B --> C["Head Impulse"]
    B --> D["Nystagmus"]
    B --> E["Test of Skew"]

    C -->|"Abnormal\\n(Corrective saccade)"| F["Peripheral"]
    C -->|"Normal"| G["CENTRAL\\nSTROKE"]

    D -->|"Unidirectional\\nHorizontal"| F
    D -->|"Direction-changing\\nor Vertical"| G

    E -->|"Absent"| F
    E -->|"Present"| G

    F --> H["Vestibular\\nNeuritis"]
    F --> I["BPPV"]
    F --> J["Meniere"]

    G --> K["MRI Brain\\nSTAT"]

    style G fill:#DC143C,color:#fff
    style K fill:#FFA500,color:#000
    style F fill:#228B22,color:#fff`,
};

/**
 * EEG Interpretation Guide template
 */
export const eegInterpretation: DiagramTemplate = {
  id: 'neuro-eeg-interpretation',
  name: 'EEG Interpretation Guide',
  description: 'Systematic approach to EEG waveform interpretation',
  domain: 'medicine',
  promptTemplate: `Create an EEG interpretation guide:
- Background rhythm: {{backgroundRhythm}}
- Frequency bands: {{frequencyBands}}
- Normal variants: {{normalVariants}}
- Epileptiform patterns: {{epileptiform}}
- Encephalopathy patterns: {{encephalopathy}}
- Status epilepticus: {{statusPatterns}}
- Artifact recognition: {{artifacts}}
{{#additionalNotes}}Interpretation tips: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'backgroundRhythm',
    'frequencyBands',
    'normalVariants',
    'epileptiform',
    'encephalopathy',
    'statusPatterns',
    'artifacts',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["EEG Analysis"] --> B["Background\\nRhythm"]
    A --> C["Abnormal\\nPatterns"]

    B --> B1["Alpha: 8-13 Hz\\nPosterior, eyes closed"]
    B --> B2["Beta: >13 Hz\\nAnterior, active"]
    B --> B3["Theta: 4-8 Hz\\nDrowsiness"]
    B --> B4["Delta: <4 Hz\\nSleep, pathology"]

    C --> C1["Epileptiform"]
    C --> C2["Encephalopathy"]

    C1 --> D["Spikes <70ms"]
    C1 --> E["Sharp waves 70-200ms"]
    C1 --> F["Spike-wave 3Hz\\nAbsence"]

    C2 --> G["Diffuse slowing"]
    C2 --> H["Triphasic waves\\nMetabolic"]
    C2 --> I["Burst suppression\\nAnoxic"]

    style B1 fill:#228B22,color:#fff
    style C1 fill:#DC143C,color:#fff
    style H fill:#FFA500,color:#000`,
};

/**
 * Neuromuscular Junction Disorders template
 */
export const nmjDisorders: DiagramTemplate = {
  id: 'neuro-nmj-disorders',
  name: 'Neuromuscular Junction Disorders',
  description: 'Comparison of myasthenia gravis and Lambert-Eaton syndrome',
  domain: 'medicine',
  promptTemplate: `Create a NMJ disorder comparison:
- Presynaptic disorders: {{presynaptic}}
- Postsynaptic disorders: {{postsynaptic}}
- Clinical features: {{clinicalFeatures}}
- Antibody testing: {{antibodies}}
- EMG findings: {{emgFindings}}
- Treatment approach: {{treatment}}
- Prognosis: {{prognosis}}
{{#additionalNotes}}Key distinctions: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presynaptic',
    'postsynaptic',
    'clinicalFeatures',
    'antibodies',
    'emgFindings',
    'treatment',
    'prognosis',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph MG["Myasthenia Gravis"]
        MG1["Postsynaptic\\nAChR antibodies"]
        MG2["Ocular > Bulbar\\nFatigability\\nWorse with use"]
        MG3["RNS: Decrement\\nSF-EMG: Jitter"]
        MG4["AChE-I\\nImmunotherapy\\nThymectomy"]
    end

    subgraph LEMS["Lambert-Eaton"]
        LEMS1["Presynaptic\\nVGCC antibodies"]
        LEMS2["Proximal weakness\\nAutonomic\\nImproves with use"]
        LEMS3["RNS: Increment\\nPost-exercise"]
        LEMS4["3,4-DAP\\nTreat malignancy\\nIVIg"]
    end

    MG1 --> MG2 --> MG3 --> MG4
    LEMS1 --> LEMS2 --> LEMS3 --> LEMS4

    style MG fill:#4169E1,color:#fff
    style LEMS fill:#DC143C,color:#fff`,
};

/**
 * Traumatic Brain Injury Classification template
 */
export const tbiClassification: DiagramTemplate = {
  id: 'neuro-tbi-classification',
  name: 'TBI Classification and Management',
  description: 'Traumatic brain injury severity classification and treatment pathway',
  domain: 'medicine',
  promptTemplate: `Create a TBI classification diagram:
- GCS scoring: {{gcsScoring}}
- Severity classification: {{severityClass}}
- Primary injury types: {{primaryInjury}}
- Secondary injury prevention: {{secondaryInjury}}
- Imaging indications: {{imaging}}
- ICP management: {{icpManagement}}
- Prognosis indicators: {{prognosis}}
{{#additionalNotes}}Management pearls: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'gcsScoring',
    'severityClass',
    'primaryInjury',
    'secondaryInjury',
    'imaging',
    'icpManagement',
    'prognosis',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Traumatic Brain\\nInjury"] --> B{"GCS Score"}

    B -->|"13-15"| C["Mild TBI"]
    B -->|"9-12"| D["Moderate TBI"]
    B -->|"3-8"| E["Severe TBI"]

    C --> C1["CT if:\\nLOC >5 min\\nAmnesia\\nVomiting\\nAnticoag"]

    D --> D1["CT Head\\nAdmit for obs\\nSerial neuro exam"]

    E --> E1["Intubate\\nICP monitoring\\nICU"]

    E1 --> F{"ICP\\n>20 mmHg?"}
    F -->|"Yes"| G["Tier 1: HOB\\nSedation\\nOsmotherapy"]
    G --> H{"Refractory?"}
    H -->|"Yes"| I["Tier 2: CSF drain\\nDecompressive\\ncraniectomy"]

    style E fill:#DC143C,color:#fff
    style E1 fill:#8B0000,color:#fff
    style C fill:#228B22,color:#fff`,
};

/**
 * Peripheral Neuropathy Workup template
 */
export const neuropathyWorkup: DiagramTemplate = {
  id: 'neuro-neuropathy-workup',
  name: 'Peripheral Neuropathy Workup',
  description: 'Systematic evaluation of peripheral neuropathy etiology',
  domain: 'medicine',
  promptTemplate: `Create a neuropathy workup algorithm:
- Distribution pattern: {{distribution}}
- Fiber type: {{fiberType}}
- Temporal course: {{temporalCourse}}
- EMG/NCS findings: {{emgNcs}}
- Laboratory panel: {{labPanel}}
- Common etiologies: {{etiologies}}
- Treatment approach: {{treatment}}
{{#additionalNotes}}Diagnostic approach: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'distribution',
    'fiberType',
    'temporalCourse',
    'emgNcs',
    'labPanel',
    'etiologies',
    'treatment',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Peripheral\\nNeuropathy"] --> B{"Distribution"}

    B -->|"Length-dependent\\nStocking-glove"| C["Polyneuropathy"]
    B -->|"Non-length\\nMultifocal"| D["Mononeuropathy\\nMultiplex"]
    B -->|"Single nerve"| E["Mononeuropathy"]

    C --> F["Basic Labs:\\nGlucose, HbA1c\\nB12, TSH\\nSPEP/UPEP"]

    F --> G{"EMG/NCS"}
    G -->|"Axonal"| H["DM, Alcohol\\nB12, Uremia"]
    G -->|"Demyelinating"| I["CIDP, CMT\\nGBS"]

    D --> J["Vasculitis panel\\nHIV, Lyme\\nSarcoid"]

    E --> K["Carpal tunnel\\nUlnar\\nPeroneal"]

    style C fill:#4169E1,color:#fff
    style H fill:#FFA500,color:#000
    style I fill:#9932CC,color:#fff`,
};

/**
 * All neurology templates
 */
export const neurologyTemplates: DiagramTemplate[] = [
  // Clinical Decision Trees
  strokeAssessment,
  headacheEvaluation,
  seizureManagement,
  neuroAlteredMentalStatus,
  msDiagnostic,
  // Anatomical Diagrams
  neuralPathway,
  brainCrossSection,
  cranialNerves,
  spinalCordTracts,
  // Procedure & Examination
  neuroExam,
  lumbarPunctureProcedure,
  // Additional Clinical Pathways
  strokePathwayDecision,
  seizureClassification,
  dermatomeMap,
  csfAnalysisFlowchart,
  neurodegenerativeComparison,
  myotomeTesting,
  parkinsonManagement,
  dementiaDifferential,
  vertigoAlgorithm,
  eegInterpretation,
  nmjDisorders,
  tbiClassification,
  neuropathyWorkup,
];

export default neurologyTemplates;
