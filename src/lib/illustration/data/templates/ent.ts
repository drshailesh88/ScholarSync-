/**
 * ent.ts
 * ENT (Otolaryngology) diagram templates for FINNISH
 *
 * Contains comprehensive templates for ear, nose, and throat medicine including:
 * - Clinical decision algorithms (hearing loss, sinusitis, sore throat, vertigo, hoarseness)
 * - Anatomical diagrams (ear, sinus, larynx, neck)
 * - Procedure illustrations (myringotomy, tonsillectomy, tracheostomy)
 * - Data visualization templates (audiogram, sleep study)
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// CLINICAL DECISION TREES
// =============================================================================

/**
 * Hearing Loss Workup Algorithm template
 */
export const hearingLossWorkup: DiagramTemplate = {
  id: 'ent-hearing-loss-workup',
  name: 'Hearing Loss Workup Algorithm',
  description: 'Systematic evaluation pathway for hearing loss including conductive vs sensorineural differentiation',
  domain: 'medicine',
  promptTemplate: `Create a hearing loss evaluation algorithm flowchart:
- Onset and duration: {{onsetDuration}}
- Associated symptoms: {{associatedSymptoms}}
- Otoscopy findings: {{otoscopyFindings}}
- Weber test result: {{weberTest}}
- Rinne test result: {{rinneTest}}
- Audiometry findings: {{audiometryFindings}}
- Imaging indications: {{imagingIndications}}
- Treatment options: {{treatmentOptions}}
{{#additionalNotes}}Additional clinical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'onsetDuration',
    'associatedSymptoms',
    'otoscopyFindings',
    'weberTest',
    'rinneTest',
    'audiometryFindings',
    'imagingIndications',
    'treatmentOptions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Hearing Loss")] --> B{"Otoscopy"}
    B -->|"Abnormal TM"| C["Conductive Causes"]
    B -->|"Normal TM"| D{"Tuning Fork Tests"}
    D -->|"Weber Lateralizes\\nRinne Negative"| C
    D -->|"Weber to Better Ear\\nRinne Positive"| E["Sensorineural"]
    C --> F["Cerumen\\nOtitis Media\\nEffusion\\nOtosclerosis"]
    E --> G["Audiometry"]
    G -->|"Asymmetric"| H["MRI IAC"]
    G -->|"Symmetric"| I["Age-related\\nNoise-induced"]
    H --> J["Rule out Acoustic Neuroma"]
    style A fill:#4169E1,color:#fff
    style H fill:#FFA500,color:#000`,
};

/**
 * Sinusitis Management Algorithm template
 */
export const sinusitisManagement: DiagramTemplate = {
  id: 'ent-sinusitis-management',
  name: 'Sinusitis Management Algorithm',
  description: 'Evidence-based approach to acute and chronic rhinosinusitis management',
  domain: 'medicine',
  promptTemplate: `Create a sinusitis management flowchart:
- Duration of symptoms: {{symptomDuration}}
- Cardinal symptoms: {{cardinalSymptoms}}
- Red flag symptoms: {{redFlagSymptoms}}
- Acute vs chronic: {{acuteVsChronic}}
- Bacterial vs viral criteria: {{bacterialVsCriteria}}
- First-line treatment: {{firstLineTreatment}}
- When to image: {{imagingCriteria}}
- Surgical indications: {{surgicalIndications}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'symptomDuration',
    'cardinalSymptoms',
    'redFlagSymptoms',
    'acuteVsChronic',
    'bacterialVsCriteria',
    'firstLineTreatment',
    'imagingCriteria',
    'surgicalIndications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Rhinosinusitis\\nSymptoms")] --> B{"Duration?"}
    B -->|"<4 weeks"| C["Acute"]
    B -->|"≥12 weeks"| D["Chronic"]
    C --> E{"Red Flags?"}
    E -->|"Yes"| F["Emergent Imaging\\nENT Referral"]
    E -->|"No"| G{"Bacterial\\nCriteria?"}
    G -->|"Yes"| H["Antibiotics x 5-7d"]
    G -->|"No"| I["Supportive Care\\n10-14 days"]
    D --> J["CT Sinuses"]
    J --> K{"Medical\\nFailure?"}
    K -->|"Yes"| L["FESS Consideration"]
    K -->|"No"| M["Continued Medical Rx"]
    style F fill:#DC143C,color:#fff
    style L fill:#4169E1,color:#fff`,
};

/**
 * Sore Throat Evaluation Algorithm template
 */
export const soreThroatAlgorithm: DiagramTemplate = {
  id: 'ent-sore-throat-algorithm',
  name: 'Sore Throat Evaluation Algorithm',
  description: 'Centor/McIsaac-based approach to pharyngitis evaluation and strep testing',
  domain: 'medicine',
  promptTemplate: `Create a sore throat evaluation flowchart:
- Presenting symptoms: {{presentingSymptoms}}
- Centor criteria present: {{centorCriteria}}
- Modified McIsaac score: {{mcisaacScore}}
- Red flag symptoms: {{redFlagSymptoms}}
- Testing strategy: {{testingStrategy}}
- Treatment approach: {{treatmentApproach}}
- When to refer: {{referralCriteria}}
{{#additionalNotes}}Additional considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentingSymptoms',
    'centorCriteria',
    'mcisaacScore',
    'redFlagSymptoms',
    'testingStrategy',
    'treatmentApproach',
    'referralCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Sore Throat")] --> B{"Airway\\nCompromise?"}
    B -->|"Yes"| C["Emergency Management"]
    B -->|"No"| D{"Centor Criteria"}
    D --> E["Score: 0-1"]
    D --> F["Score: 2-3"]
    D --> G["Score: 4"]
    E --> H["No Testing\\nSymptomatic Rx"]
    F --> I["Rapid Strep Test"]
    G --> J["Treat Empirically\\nor Test"]
    I -->|"Positive"| K["Penicillin x 10d"]
    I -->|"Negative"| L["Culture or\\nSymptomatic Rx"]
    subgraph Centor["Centor Criteria"]
        C1["Fever >38C"]
        C2["Tonsillar Exudate"]
        C3["No Cough"]
        C4["Tender LAD"]
    end
    style C fill:#DC143C,color:#fff
    style K fill:#228B22,color:#fff`,
};

/**
 * Dizziness/Vertigo Evaluation Algorithm template
 */
export const vertigoEvaluation: DiagramTemplate = {
  id: 'ent-vertigo-evaluation',
  name: 'Dizziness/Vertigo Evaluation Algorithm',
  description: 'Systematic approach to peripheral vs central vertigo differentiation',
  domain: 'medicine',
  promptTemplate: `Create a vertigo evaluation algorithm:
- Type of dizziness: {{dizzynessType}}
- Duration of episodes: {{episodeDuration}}
- Triggers: {{triggers}}
- Associated symptoms: {{associatedSymptoms}}
- Dix-Hallpike result: {{dixHallpike}}
- HINTS exam findings: {{hintsExam}}
- Central red flags: {{centralRedFlags}}
- Treatment approach: {{treatment}}
{{#additionalNotes}}Additional workup: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'dizzynessType',
    'episodeDuration',
    'triggers',
    'associatedSymptoms',
    'dixHallpike',
    'hintsExam',
    'centralRedFlags',
    'treatment',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Vertigo/Dizziness")] --> B{"True Vertigo?"}
    B -->|"Spinning"| C{"Episodic or\\nContinuous?"}
    B -->|"Lightheaded"| D["Consider:\\nOrthostatic\\nCardiac\\nAnxiety"]
    C -->|"Episodic"| E{"Duration?"}
    C -->|"Continuous"| F["HINTS Exam"]
    E -->|"Seconds"| G["BPPV"]
    E -->|"Hours"| H["Meniere's"]
    E -->|"Days"| I["Vestibular Neuritis"]
    F -->|"Peripheral"| I
    F -->|"Central"| J["Stroke Workup"]
    G --> K["Epley Maneuver"]
    H --> L["Salt Restriction\\nDiuretics"]
    style J fill:#DC143C,color:#fff
    style K fill:#228B22,color:#fff`,
};

/**
 * Hoarseness Evaluation Algorithm template
 */
export const hoarsenessEvaluation: DiagramTemplate = {
  id: 'ent-hoarseness-evaluation',
  name: 'Hoarseness Evaluation Algorithm',
  description: 'Systematic workup of dysphonia including laryngoscopy indications',
  domain: 'medicine',
  promptTemplate: `Create a hoarseness evaluation flowchart:
- Duration: {{duration}}
- Onset circumstances: {{onsetCircumstances}}
- Associated symptoms: {{associatedSymptoms}}
- Risk factors: {{riskFactors}}
- Voice use patterns: {{voiceUse}}
- When to scope: {{laryngoscopyIndications}}
- Common diagnoses: {{commonDiagnoses}}
- Treatment options: {{treatmentOptions}}
{{#additionalNotes}}Red flags and referral criteria: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'duration',
    'onsetCircumstances',
    'associatedSymptoms',
    'riskFactors',
    'voiceUse',
    'laryngoscopyIndications',
    'commonDiagnoses',
    'treatmentOptions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Hoarseness")] --> B{"Duration\\n>2 weeks?"}
    B -->|"No"| C["Likely Viral\\nVoice Rest"]
    B -->|"Yes"| D{"Risk Factors?\\n(Smoking, EtOH)"}
    D -->|"Yes"| E["Urgent Laryngoscopy"]
    D -->|"No"| F{"Recent Intubation\\nor Surgery?"}
    F -->|"Yes"| G["Laryngoscopy\\nRule out VCP"]
    F -->|"No"| H["Trial of:\\nPPI, Voice Rest"]
    H -->|"No Improvement\\n4-6 weeks"| I["Laryngoscopy"]
    E --> J{"Findings?"}
    J -->|"Mass/Lesion"| K["Biopsy"]
    J -->|"Nodules/Polyp"| L["Voice Therapy"]
    J -->|"Paralysis"| M["CT Neck/Chest"]
    style E fill:#DC143C,color:#fff
    style K fill:#8B5CF6,color:#fff`,
};

// =============================================================================
// ANATOMICAL DIAGRAMS
// =============================================================================

/**
 * Ear Anatomy template
 */
export const earAnatomy: DiagramTemplate = {
  id: 'ent-ear-anatomy',
  name: 'Ear Anatomy Diagram',
  description: 'Comprehensive ear anatomy including outer, middle, and inner ear structures',
  domain: 'medicine',
  promptTemplate: `Create an ear anatomy diagram showing:
- Outer ear structures: {{outerEar}}
- External auditory canal: {{earCanal}}
- Tympanic membrane landmarks: {{tmLandmarks}}
- Ossicles: {{ossicles}}
- Middle ear space: {{middleEar}}
- Inner ear (cochlea/vestibular): {{innerEar}}
- Eustachian tube: {{eustachianTube}}
- Labels and annotations: {{annotations}}
{{#additionalNotes}}Clinical correlations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'outerEar',
    'earCanal',
    'tmLandmarks',
    'ossicles',
    'middleEar',
    'innerEar',
    'eustachianTube',
    'annotations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Outer["Outer Ear"]
        A["Pinna"] --> B["EAC"]
    end
    subgraph Middle["Middle Ear"]
        C["TM"] --> D["Malleus"]
        D --> E["Incus"]
        E --> F["Stapes"]
        G["Eustachian Tube"]
    end
    subgraph Inner["Inner Ear"]
        H["Oval Window"] --> I["Cochlea"]
        H --> J["Vestibule"]
        J --> K["SCCs"]
    end
    B --> C
    F --> H
    style I fill:#22c55e
    style K fill:#3b82f6`,
};

/**
 * Sinus Anatomy template
 */
export const sinusAnatomy: DiagramTemplate = {
  id: 'ent-sinus-anatomy',
  name: 'Paranasal Sinus Anatomy',
  description: 'Paranasal sinus anatomy with drainage pathways and relationships',
  domain: 'medicine',
  promptTemplate: `Create a paranasal sinus anatomy diagram:
- Frontal sinuses: {{frontalSinuses}}
- Maxillary sinuses: {{maxillarySinuses}}
- Ethmoid air cells: {{ethmoidCells}}
- Sphenoid sinus: {{sphenoidSinus}}
- Ostiomeatal complex: {{omComplex}}
- Drainage pathways: {{drainagePathways}}
- Adjacent structures: {{adjacentStructures}}
{{#additionalNotes}}Clinical relevance: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'frontalSinuses',
    'maxillarySinuses',
    'ethmoidCells',
    'sphenoidSinus',
    'omComplex',
    'drainagePathways',
    'adjacentStructures',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Sinuses["Paranasal Sinuses"]
        F["Frontal"] --> OMC["Ostiomeatal\\nComplex"]
        AE["Anterior\\nEthmoid"] --> OMC
        M["Maxillary"] --> OMC
        PE["Posterior\\nEthmoid"] --> SPE["Sphenoethmoidal\\nRecess"]
        S["Sphenoid"] --> SPE
    end
    OMC --> MM["Middle\\nMeatus"]
    SPE --> SM["Superior\\nMeatus"]
    MM --> NC["Nasal\\nCavity"]
    SM --> NC
    style OMC fill:#FFA500
    style NC fill:#22c55e`,
};

/**
 * Larynx Anatomy template
 */
export const larynxAnatomy: DiagramTemplate = {
  id: 'ent-larynx-anatomy',
  name: 'Larynx Anatomy Diagram',
  description: 'Detailed laryngeal anatomy including cartilages, muscles, and vocal cords',
  domain: 'medicine',
  promptTemplate: `Create a larynx anatomy diagram:
- Cartilages: {{cartilages}}
- Vocal cords structure: {{vocalCords}}
- Laryngeal muscles: {{muscles}}
- Supraglottis: {{supraglottis}}
- Glottis: {{glottis}}
- Subglottis: {{subglottis}}
- Innervation: {{innervation}}
- Blood supply: {{bloodSupply}}
{{#additionalNotes}}Functional anatomy: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'cartilages',
    'vocalCords',
    'muscles',
    'supraglottis',
    'glottis',
    'subglottis',
    'innervation',
    'bloodSupply',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Cartilages["Framework"]
        TH["Thyroid"] --- CR["Cricoid"]
        AR["Arytenoids"] --- CR
        EP["Epiglottis"] --- TH
    end
    subgraph Levels["Anatomic Levels"]
        SUP["Supraglottis\\n(Epiglottis, AE folds,\\nFalse cords)"]
        GL["Glottis\\n(True vocal cords,\\nAnterior commissure)"]
        SUB["Subglottis\\n(Below cords to\\ncricoid)"]
    end
    SUP --> GL --> SUB
    subgraph Nerves["Innervation"]
        SLN["Superior Laryngeal\\n(Sensation above cords)"]
        RLN["Recurrent Laryngeal\\n(Motor + sensation\\nbelow cords)"]
    end
    style GL fill:#DC143C`,
};

/**
 * Neck Anatomy template
 */
export const neckAnatomy: DiagramTemplate = {
  id: 'ent-neck-anatomy',
  name: 'Neck Anatomy Diagram',
  description: 'Neck anatomy with triangles, lymph node levels, and major structures',
  domain: 'medicine',
  promptTemplate: `Create a neck anatomy diagram:
- Triangles of the neck: {{triangles}}
- Lymph node levels: {{lymphNodeLevels}}
- Major vessels: {{majorVessels}}
- Nerves: {{nerves}}
- Thyroid and parathyroids: {{thyroidParathyroid}}
- Salivary glands: {{salivaryGlands}}
- Fascial layers: {{fascialLayers}}
{{#additionalNotes}}Surgical considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'triangles',
    'lymphNodeLevels',
    'majorVessels',
    'nerves',
    'thyroidParathyroid',
    'salivaryGlands',
    'fascialLayers',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Levels["Cervical Lymph Node Levels"]
        L1["Level I\\n(Submental/Submandibular)"]
        L2["Level II\\n(Upper Jugular)"]
        L3["Level III\\n(Middle Jugular)"]
        L4["Level IV\\n(Lower Jugular)"]
        L5["Level V\\n(Posterior Triangle)"]
        L6["Level VI\\n(Central Compartment)"]
    end
    L1 --> L2 --> L3 --> L4
    L2 --> L5
    subgraph Triangles["Neck Triangles"]
        ANT["Anterior Triangle"]
        POST["Posterior Triangle"]
    end
    style L2 fill:#DC143C
    style L3 fill:#DC143C`,
};

// =============================================================================
// PROCEDURE ILLUSTRATIONS
// =============================================================================

/**
 * Myringotomy with Tubes template
 */
export const myringotomyProcedure: DiagramTemplate = {
  id: 'ent-myringotomy-procedure',
  name: 'Myringotomy with Tube Placement',
  description: 'Step-by-step myringotomy and pressure equalization tube placement procedure',
  domain: 'medicine',
  promptTemplate: `Create a myringotomy procedure flowchart:
- Indications: {{indications}}
- Anesthesia: {{anesthesia}}
- Patient positioning: {{positioning}}
- Incision location: {{incisionLocation}}
- Tube type selection: {{tubeType}}
- Placement technique: {{technique}}
- Post-procedure care: {{postProcedureCare}}
- Complications: {{complications}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'indications',
    'anesthesia',
    'positioning',
    'incisionLocation',
    'tubeType',
    'technique',
    'postProcedureCare',
    'complications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Patient Prep"] --> B["Microscope\\nVisualization"]
    B --> C["Cerumen Removal\\nif needed"]
    C --> D["Myringotomy\\n(Anteroinferior)"]
    D --> E["Aspirate\\nMiddle Ear Fluid"]
    E --> F["Insert PE Tube"]
    F --> G["Confirm Position"]
    G --> H["Antibiotic Drops"]
    subgraph PostOp["Post-Op Care"]
        P1["Water Precautions"]
        P2["F/U Audiogram"]
        P3["Monitor for\\nExtrusion"]
    end
    H --> PostOp
    style D fill:#4169E1,color:#fff
    style F fill:#22c55e,color:#fff`,
};

/**
 * Tonsillectomy Indications template
 */
export const tonsillectomyIndications: DiagramTemplate = {
  id: 'ent-tonsillectomy-indications',
  name: 'Tonsillectomy Indications Algorithm',
  description: 'Evidence-based indications for tonsillectomy in children and adults',
  domain: 'medicine',
  promptTemplate: `Create a tonsillectomy indications flowchart:
- Recurrent infection criteria (Paradise): {{paradiseCriteria}}
- Sleep-disordered breathing: {{sleepDisorderedBreathing}}
- Peritonsillar abscess history: {{ptaHistory}}
- Asymmetric tonsils: {{asymmetry}}
- Other indications: {{otherIndications}}
- Contraindications: {{contraindications}}
- Pre-operative workup: {{preOpWorkup}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'paradiseCriteria',
    'sleepDisorderedBreathing',
    'ptaHistory',
    'asymmetry',
    'otherIndications',
    'contraindications',
    'preOpWorkup',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Consider\\nTonsillectomy")] --> B{"Recurrent\\nInfections?"}
    B -->|"Paradise Criteria\\nMet"| C["Indication"]
    B -->|"No"| D{"Sleep\\nDisordered\\nBreathing?"}
    D -->|"OSA + Adenotonsillar\\nHypertrophy"| C
    D -->|"No"| E{"Other\\nIndications?"}
    E -->|"Peritonsillar Abscess\\nAsymmetry/Malignancy\\nPFAPA"| C
    E -->|"No"| F["Not Indicated"]
    subgraph Paradise["Paradise Criteria"]
        P1["≥7 episodes in 1 year OR"]
        P2["≥5/year for 2 years OR"]
        P3["≥3/year for 3 years"]
    end
    style C fill:#22c55e,color:#fff
    style F fill:#ef4444,color:#fff`,
};

/**
 * Tracheostomy Procedure template
 */
export const tracheostomyProcedure: DiagramTemplate = {
  id: 'ent-tracheostomy-procedure',
  name: 'Tracheostomy Procedure',
  description: 'Surgical and percutaneous tracheostomy procedure steps and considerations',
  domain: 'medicine',
  promptTemplate: `Create a tracheostomy procedure flowchart:
- Indications: {{indications}}
- Surgical vs percutaneous: {{surgicalVsPerc}}
- Patient positioning: {{positioning}}
- Anatomic landmarks: {{landmarks}}
- Incision and dissection: {{incision}}
- Tracheal entry: {{trachealEntry}}
- Tube selection and placement: {{tubePlacement}}
- Post-procedure care: {{postProcedure}}
{{#additionalNotes}}Emergency considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'indications',
    'surgicalVsPerc',
    'positioning',
    'landmarks',
    'incision',
    'trachealEntry',
    'tubePlacement',
    'postProcedure',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Indication for\\nTracheostomy"] --> B{"Emergent or\\nElective?"}
    B -->|"Emergent"| C["Surgical\\nTracheostomy"]
    B -->|"Elective"| D{"Location?"}
    D -->|"ICU, Intubated"| E["Percutaneous\\nTracheostomy"]
    D -->|"OR"| C
    C --> F["Position:\\nNeck Extension"]
    F --> G["Horizontal Skin\\nIncision"]
    G --> H["Dissect to\\nTrachea"]
    H --> I["Enter Between\\nRings 2-3 or 3-4"]
    I --> J["Insert\\nTracheostomy Tube"]
    J --> K["Confirm Position\\nSecure Tube"]
    subgraph PostOp["Post-Op"]
        K1["CXR"]
        K2["Cuff Pressure"]
        K3["Suture/Ties"]
    end
    K --> PostOp
    style C fill:#DC143C,color:#fff
    style J fill:#22c55e,color:#fff`,
};

// =============================================================================
// DATA VISUALIZATION TEMPLATES
// =============================================================================

/**
 * Audiogram Interpretation template
 */
export const audiogramInterpretation: DiagramTemplate = {
  id: 'ent-audiogram-interpretation',
  name: 'Audiogram Interpretation Template',
  description: 'Systematic audiogram reading and interpretation guide',
  domain: 'medicine',
  promptTemplate: `Create an audiogram interpretation template:
- Frequency range: {{frequencyRange}}
- Air conduction thresholds: {{airConduction}}
- Bone conduction thresholds: {{boneConduction}}
- Air-bone gap significance: {{airBoneGap}}
- Speech discrimination: {{speechDiscrimination}}
- Pattern recognition: {{patterns}}
- Hearing loss classification: {{classification}}
- Recommendations: {{recommendations}}
{{#additionalNotes}}Clinical correlation: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'frequencyRange',
    'airConduction',
    'boneConduction',
    'airBoneGap',
    'speechDiscrimination',
    'patterns',
    'classification',
    'recommendations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Reading["Audiogram Reading"]
        A["Check Frequencies\\n250-8000 Hz"]
        B["Plot Air Conduction\\nO=Right, X=Left"]
        C["Plot Bone Conduction\\n<=Right, >=Left"]
        D["Calculate Air-Bone Gap"]
    end
    A --> B --> C --> D
    D --> E{"Gap >10 dB?"}
    E -->|"Yes"| F["Conductive\\nComponent"]
    E -->|"No"| G["Pure\\nSensorineural"]
    subgraph Severity["Hearing Loss Severity"]
        S1["Normal: 0-25 dB"]
        S2["Mild: 26-40 dB"]
        S3["Moderate: 41-55 dB"]
        S4["Mod-Severe: 56-70 dB"]
        S5["Severe: 71-90 dB"]
        S6["Profound: >90 dB"]
    end
    style F fill:#FFA500
    style G fill:#4169E1`,
};

/**
 * Sleep Study Results template
 */
export const sleepStudyResults: DiagramTemplate = {
  id: 'ent-sleep-study-results',
  name: 'Sleep Study (PSG) Results Template',
  description: 'Polysomnography interpretation and OSA severity classification',
  domain: 'medicine',
  promptTemplate: `Create a sleep study interpretation template:
- AHI calculation: {{ahiCalculation}}
- OSA severity classification: {{osaSeverity}}
- RDI interpretation: {{rdiInterpretation}}
- Oxygen desaturation index: {{odiValues}}
- Sleep architecture: {{sleepArchitecture}}
- Body position effects: {{positionEffects}}
- Treatment recommendations: {{treatmentRecs}}
- CPAP titration results: {{cpapTitration}}
{{#additionalNotes}}Follow-up planning: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ahiCalculation',
    'osaSeverity',
    'rdiInterpretation',
    'odiValues',
    'sleepArchitecture',
    'positionEffects',
    'treatmentRecs',
    'cpapTitration',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Polysomnography\\nResults"] --> B["Calculate AHI"]
    B --> C{"AHI Value"}
    C -->|"<5"| D["Normal"]
    C -->|"5-15"| E["Mild OSA"]
    C -->|"15-30"| F["Moderate OSA"]
    C -->|">30"| G["Severe OSA"]
    D --> H["No Treatment\\nNeeded"]
    E --> I["Lifestyle\\nPositional\\nOral Appliance"]
    F --> J["CPAP Recommended"]
    G --> J
    J --> K["CPAP Titration"]
    K --> L["Optimal Pressure\\nDetermined"]
    subgraph Metrics["Key Metrics"]
        M1["AHI: Apnea-Hypopnea Index"]
        M2["ODI: O2 Desaturation Index"]
        M3["Nadir SpO2"]
        M4["REM AHI"]
    end
    style G fill:#DC143C,color:#fff
    style L fill:#22c55e,color:#fff`,
};

// =============================================================================
// ADDITIONAL TEMPLATES
// =============================================================================

/**
 * Epistaxis Management template
 */
export const epistaxisManagement: DiagramTemplate = {
  id: 'ent-epistaxis-management',
  name: 'Epistaxis Management Algorithm',
  description: 'Stepwise approach to anterior and posterior nosebleed management',
  domain: 'medicine',
  promptTemplate: `Create an epistaxis management flowchart:
- Initial assessment: {{initialAssessment}}
- First aid measures: {{firstAid}}
- Anterior vs posterior: {{anteriorVsPosterior}}
- Cautery technique: {{cauteryTechnique}}
- Packing options: {{packingOptions}}
- When to consult ENT: {{entConsult}}
- Surgical intervention criteria: {{surgicalCriteria}}
- Prevention strategies: {{prevention}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'initialAssessment',
    'firstAid',
    'anteriorVsPosterior',
    'cauteryTechnique',
    'packingOptions',
    'entConsult',
    'surgicalCriteria',
    'prevention',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Epistaxis")] --> B["Direct Pressure\\n15-20 min"]
    B --> C{"Bleeding\\nControlled?"}
    C -->|"Yes"| D["Discharge with\\nPrecautions"]
    C -->|"No"| E["Anterior\\nRhinoscopy"]
    E --> F{"Source\\nIdentified?"}
    F -->|"Anterior"| G["Chemical or\\nElectric Cautery"]
    F -->|"Posterior/\\nNot seen"| H["Nasal Packing"]
    G --> I{"Controlled?"}
    I -->|"No"| H
    I -->|"Yes"| D
    H --> J{"Posterior?"}
    J -->|"Yes"| K["Posterior Pack\\nor Balloon"]
    J -->|"No"| L["Anterior Pack"]
    K --> M["Admit\\nENT Consult"]
    style M fill:#DC143C,color:#fff
    style D fill:#22c55e,color:#fff`,
};

/**
 * Neck Mass Evaluation template
 */
export const neckMassEvaluation: DiagramTemplate = {
  id: 'ent-neck-mass-evaluation',
  name: 'Neck Mass Evaluation Algorithm',
  description: 'Systematic approach to pediatric and adult neck mass workup',
  domain: 'medicine',
  promptTemplate: `Create a neck mass evaluation flowchart:
- Patient age: {{patientAge}}
- Duration and growth: {{duration}}
- Location and characteristics: {{characteristics}}
- Associated symptoms: {{associatedSymptoms}}
- Infectious workup: {{infectiousWorkup}}
- Imaging approach: {{imaging}}
- Biopsy indications: {{biopsyIndications}}
- Malignancy red flags: {{malignancyFlags}}
{{#additionalNotes}}Differential by location: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'patientAge',
    'duration',
    'characteristics',
    'associatedSymptoms',
    'infectiousWorkup',
    'imaging',
    'biopsyIndications',
    'malignancyFlags',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Neck Mass")] --> B{"Age?"}
    B -->|"Pediatric"| C["Likely:\\nReactive LAD\\nCongenital"]
    B -->|"Adult >40"| D["Higher Suspicion\\nfor Malignancy"]
    C --> E{"Duration?"}
    E -->|"<2 weeks"| F["Observe\\nAntibiotics"]
    E -->|">2 weeks"| G["Imaging"]
    D --> H["Imaging + Labs"]
    G --> I{"Resolution?"}
    I -->|"Yes"| J["Follow-up"]
    I -->|"No"| K["FNA or Biopsy"]
    H --> K
    K --> L{"Diagnosis"}
    L -->|"Benign"| M["Manage per\\nPathology"]
    L -->|"Malignant"| N["Staging\\nTreatment"]
    style D fill:#FFA500
    style N fill:#DC143C,color:#fff`,
};

// =============================================================================
// ADDITIONAL CLINICAL TEMPLATES
// =============================================================================

/**
 * Facial Nerve Paralysis Evaluation template
 */
export const facialNerveParalysis: DiagramTemplate = {
  id: 'ent-facial-nerve-paralysis',
  name: 'Facial Nerve Paralysis Algorithm',
  description: 'House-Brackmann grading and Bell palsy workup',
  domain: 'medicine',
  promptTemplate: `Create a facial nerve paralysis evaluation flowchart:
- Onset and duration: {{onsetDuration}}
- Complete vs incomplete: {{severity}}
- House-Brackmann grade: {{hbGrade}}
- Associated symptoms: {{associatedSymptoms}}
- Ramsay Hunt syndrome signs: {{ramsayHunt}}
- Imaging indications: {{imagingIndications}}
- Medical treatment: {{medicalTreatment}}
- Eye protection: {{eyeProtection}}
{{#additionalNotes}}Surgical considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'onsetDuration',
    'severity',
    'hbGrade',
    'associatedSymptoms',
    'ramsayHunt',
    'imagingIndications',
    'medicalTreatment',
    'eyeProtection',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Facial\\nWeakness")] --> B{"Complete\\nor Partial?"}
    B -->|"Partial"| C["Favorable\\nPrognosis"]
    B -->|"Complete"| D{"Vesicles?"}
    D -->|"Yes"| E["Ramsay Hunt\\nValacyclovir + Steroids"]
    D -->|"No"| F["Bell's Palsy\\nSteroids +/- Antivirals"]
    F --> G{"HB Grade?"}
    G -->|"I-III"| H["Observe\\nPT"]
    G -->|"IV-VI"| I["Aggressive Rx\\nConsider Decompression"]
    subgraph HB["House-Brackmann"]
        H1["I: Normal"]
        H2["II: Slight"]
        H3["III: Moderate"]
        H4["IV: Mod-Severe"]
        H5["V: Severe"]
        H6["VI: Total"]
    end
    style E fill:#DC143C,color:#fff
    style I fill:#FFA500,color:#000`,
};

/**
 * Tinnitus Evaluation template
 */
export const tinnitusEvaluation: DiagramTemplate = {
  id: 'ent-tinnitus-evaluation',
  name: 'Tinnitus Evaluation Algorithm',
  description: 'Systematic workup of subjective and objective tinnitus',
  domain: 'medicine',
  promptTemplate: `Create a tinnitus evaluation flowchart:
- Type (subjective/objective): {{tinnitusType}}
- Pulsatile vs non-pulsatile: {{pulsatile}}
- Associated hearing loss: {{hearingLoss}}
- Unilateral vs bilateral: {{laterality}}
- Red flag symptoms: {{redFlags}}
- Audiogram findings: {{audiogramFindings}}
- Imaging indications: {{imagingIndications}}
- Treatment options: {{treatmentOptions}}
{{#additionalNotes}}Additional workup: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'tinnitusType',
    'pulsatile',
    'hearingLoss',
    'laterality',
    'redFlags',
    'audiogramFindings',
    'imagingIndications',
    'treatmentOptions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Tinnitus")] --> B{"Pulsatile?"}
    B -->|"Yes"| C["Vascular Workup\\nCT/MRA"]
    B -->|"No"| D{"Unilateral?"}
    D -->|"Yes"| E["Audiogram"]
    D -->|"Bilateral"| F["Audiogram\\nSymmetric SNHL"]
    E --> G{"Asymmetric\\nHearing?"}
    G -->|"Yes"| H["MRI IAC\\nR/O Schwannoma"]
    G -->|"No"| I["Age-related\\nNoise-induced"]
    C --> J{"Source?"}
    J -->|"Arterial"| K["Dural Fistula\\nParaganglioma"]
    J -->|"Venous"| L["Benign IH\\nPosition-dependent"]
    subgraph Treatment["Management"]
        T1["Sound Therapy"]
        T2["CBT"]
        T3["Hearing Aids"]
        T4["Avoid Ototoxins"]
    end
    style H fill:#FFA500,color:#000
    style K fill:#DC143C,color:#fff`,
};

/**
 * Thyroid Nodule Evaluation template
 */
export const entThyroidNoduleEvaluation: DiagramTemplate = {
  id: 'ent-thyroid-nodule-evaluation',
  name: 'Thyroid Nodule Evaluation Algorithm',
  description: 'TI-RADS based approach to thyroid nodule workup',
  domain: 'medicine',
  promptTemplate: `Create a thyroid nodule evaluation flowchart:
- Nodule size: {{noduleSize}}
- TSH level: {{tshLevel}}
- Ultrasound features: {{usFeatures}}
- TI-RADS category: {{tirads}}
- FNA indications: {{fnaIndications}}
- Bethesda classification: {{bethesda}}
- Molecular testing: {{molecularTesting}}
- Surgical indications: {{surgicalIndications}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'noduleSize',
    'tshLevel',
    'usFeatures',
    'tirads',
    'fnaIndications',
    'bethesda',
    'molecularTesting',
    'surgicalIndications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Thyroid\\nNodule")] --> B["Check TSH"]
    B -->|"Low TSH"| C["Thyroid Scan\\nHot Nodule"]
    B -->|"Normal/High"| D["Ultrasound\\nTI-RADS"]
    D --> E{"TI-RADS?"}
    E -->|"TR1-2"| F["No FNA\\nFollow US"]
    E -->|"TR3 >2.5cm"| G["FNA"]
    E -->|"TR4 >1.5cm"| G
    E -->|"TR5 >1cm"| G
    G --> H{"Bethesda?"}
    H -->|"I"| I["Repeat FNA"]
    H -->|"II"| J["Follow"]
    H -->|"III-IV"| K["Molecular Test\\nor Lobectomy"]
    H -->|"V-VI"| L["Surgery"]
    C -->|"Hot"| M["Likely Benign\\nTreat Hyperthyroidism"]
    style L fill:#DC143C,color:#fff
    style K fill:#FFA500,color:#000`,
};

/**
 * Pediatric Stridor Evaluation template
 */
export const pediatricStridorEvaluation: DiagramTemplate = {
  id: 'ent-pediatric-stridor',
  name: 'Pediatric Stridor Evaluation Algorithm',
  description: 'Systematic approach to stridor in children',
  domain: 'medicine',
  promptTemplate: `Create a pediatric stridor evaluation flowchart:
- Age of onset: {{ageOnset}}
- Inspiratory vs expiratory: {{stridorPhase}}
- Feeding difficulties: {{feedingIssues}}
- Position dependency: {{positionDependent}}
- Severity and distress: {{severity}}
- Red flag symptoms: {{redFlags}}
- Imaging findings: {{imaging}}
- Laryngoscopy indications: {{laryngoscopy}}
{{#additionalNotes}}Differential diagnosis: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ageOnset',
    'stridorPhase',
    'feedingIssues',
    'positionDependent',
    'severity',
    'redFlags',
    'imaging',
    'laryngoscopy',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Pediatric\\nStridor")] --> B{"Acute or\\nChronic?"}
    B -->|"Acute"| C{"Fever?\\nDrooling?"}
    C -->|"Yes"| D["Epiglottitis\\nEmergency"]
    C -->|"Barking Cough"| E["Croup\\nDexamethasone"]
    C -->|"Choking Hx"| F["Foreign Body\\nEmergent Bronch"]
    B -->|"Chronic"| G{"Age?"}
    G -->|"<6 months"| H["Laryngomalacia\\nMost Common"]
    G -->|">6 months"| I["Subglottic Stenosis\\nVocal Cord Paralysis"]
    H --> J{"Severe?"}
    J -->|"Mild"| K["Observe\\nOutgrow by 18mo"]
    J -->|"Severe"| L["Supraglottoplasty"]
    subgraph Emergency["Red Flags"]
        E1["Cyanosis"]
        E2["Altered LOC"]
        E3["Complete Obstruction"]
    end
    style D fill:#DC143C,color:#fff
    style F fill:#DC143C,color:#fff`,
};

/**
 * Otitis Externa Management template
 */
export const otitisExternaManagement: DiagramTemplate = {
  id: 'ent-otitis-externa-management',
  name: 'Otitis Externa Management Algorithm',
  description: 'Systematic approach to swimmer ear and external ear infections',
  domain: 'medicine',
  promptTemplate: `Create an otitis externa management flowchart:
- Symptom duration: {{symptomDuration}}
- Pain severity: {{painSeverity}}
- Canal edema: {{canalEdema}}
- Discharge type: {{dischargeType}}
- Diabetic/immunocompromised: {{riskFactors}}
- Treatment selection: {{treatment}}
- Wick placement indications: {{wickIndications}}
- Follow-up criteria: {{followUp}}
{{#additionalNotes}}Malignant OE considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'symptomDuration',
    'painSeverity',
    'canalEdema',
    'dischargeType',
    'riskFactors',
    'treatment',
    'wickIndications',
    'followUp',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Otitis\\nExterna")] --> B{"Risk Factors?\\nDM, Immunocomp"}
    B -->|"Yes"| C["Rule Out\\nMalignant OE"]
    B -->|"No"| D{"Canal\\nOpen?"}
    C --> E["CT Temporal\\nBone + ESR"]
    E -->|"Skull Base Erosion"| F["IV Antibiotics\\nENT Urgent"]
    D -->|"Yes"| G["Topical Drops\\nCipro-Dex"]
    D -->|"No (Edema)"| H["Place Wick\\nThen Drops"]
    G --> I["Water Precautions\\nPain Control"]
    H --> I
    I --> J{"Better in\\n48-72h?"}
    J -->|"No"| K["Reculture\\nOral Abx"]
    J -->|"Yes"| L["Complete\\n7-10d Course"]
    style F fill:#DC143C,color:#fff
    style C fill:#FFA500,color:#000`,
};

/**
 * BPPV Management template
 */
export const bppvManagement: DiagramTemplate = {
  id: 'ent-bppv-management',
  name: 'BPPV Diagnosis and Treatment Algorithm',
  description: 'Canal-specific approach to benign paroxysmal positional vertigo',
  domain: 'medicine',
  promptTemplate: `Create a BPPV management flowchart:
- Symptom characteristics: {{symptoms}}
- Dix-Hallpike result: {{dixHallpike}}
- Affected canal: {{affectedCanal}}
- Nystagmus direction: {{nystagmusDirection}}
- Treatment maneuver: {{treatmentManeuver}}
- Post-treatment instructions: {{postTreatment}}
- Recurrence management: {{recurrenceManagement}}
- Refractory cases: {{refractoryCases}}
{{#additionalNotes}}Variant BPPV: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'symptoms',
    'dixHallpike',
    'affectedCanal',
    'nystagmusDirection',
    'treatmentManeuver',
    'postTreatment',
    'recurrenceManagement',
    'refractoryCases',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Positional\\nVertigo")] --> B["Dix-Hallpike\\nTest"]
    B --> C{"Positive?"}
    C -->|"No"| D["Supine Roll Test\\n(Horizontal Canal)"]
    C -->|"Yes"| E{"Which\\nSide?"}
    D -->|"Positive"| F["Horizontal\\nCanal BPPV"]
    E -->|"Right"| G["Right Posterior\\nCanal BPPV"]
    E -->|"Left"| H["Left Posterior\\nCanal BPPV"]
    G --> I["Epley Maneuver\\n(Right)"]
    H --> J["Epley Maneuver\\n(Left)"]
    F --> K["BBQ Roll or\\nLempert Maneuver"]
    I --> L{"Resolution?"}
    L -->|"Yes"| M["Post-Maneuver\\nInstructions"]
    L -->|"No"| N["Repeat x3\\nor Semont"]
    N -->|"Still Refractory"| O["Brandt-Daroff\\nVestibular PT"]
    style I fill:#22C55E,color:#fff
    style J fill:#22C55E,color:#fff`,
};

/**
 * Allergic Rhinitis Management template
 */
export const allergicRhinitisManagement: DiagramTemplate = {
  id: 'ent-allergic-rhinitis-management',
  name: 'Allergic Rhinitis Management Algorithm',
  description: 'ARIA guideline-based approach to allergic rhinitis treatment',
  domain: 'medicine',
  promptTemplate: `Create an allergic rhinitis management flowchart:
- Symptom pattern: {{symptomPattern}}
- Severity classification: {{severity}}
- Trigger identification: {{triggers}}
- First-line treatment: {{firstLine}}
- Step-up therapy: {{stepUp}}
- Immunotherapy criteria: {{immunotherapy}}
- Comorbidity assessment: {{comorbidities}}
- Environmental controls: {{environmentalControls}}
{{#additionalNotes}}Pediatric considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'symptomPattern',
    'severity',
    'triggers',
    'firstLine',
    'stepUp',
    'immunotherapy',
    'comorbidities',
    'environmentalControls',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Allergic\\nRhinitis")] --> B{"ARIA\\nClassification"}
    B -->|"Intermittent\\nMild"| C["2nd Gen Antihistamine\\nPRN"]
    B -->|"Persistent or\\nModerate-Severe"| D["Intranasal\\nCorticosteroid"]
    D --> E{"Controlled?"}
    E -->|"Yes"| F["Continue\\nStep Down"]
    E -->|"No"| G["Add INAH\\nor Antileukotriene"]
    G --> H{"Controlled?"}
    H -->|"No"| I["Allergy Testing"]
    I --> J{"Candidate for\\nImmunotherapy?"}
    J -->|"Yes"| K["SCIT or SLIT\\n3-5 years"]
    J -->|"No"| L["Maximize Medical\\nConsider Surgery"]
    subgraph Comorbid["Check Comorbidities"]
        CO1["Asthma"]
        CO2["Sinusitis"]
        CO3["Conjunctivitis"]
    end
    style D fill:#4169E1,color:#fff
    style K fill:#22C55E,color:#fff`,
};

/**
 * Dysphagia Evaluation template
 */
export const entDysphagiaEvaluation: DiagramTemplate = {
  id: 'ent-dysphagia-evaluation',
  name: 'Dysphagia Evaluation Algorithm',
  description: 'Systematic approach to oropharyngeal and esophageal dysphagia',
  domain: 'medicine',
  promptTemplate: `Create a dysphagia evaluation flowchart:
- Dysphagia type: {{dysphagiaType}}
- Solids vs liquids: {{solidVsLiquid}}
- Progressive vs intermittent: {{progression}}
- Associated symptoms: {{associatedSymptoms}}
- Red flag symptoms: {{redFlags}}
- MBSS vs FEES: {{swallowStudy}}
- Treatment approach: {{treatment}}
- Diet modifications: {{dietModifications}}
{{#additionalNotes}}Neurological workup: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'dysphagiaType',
    'solidVsLiquid',
    'progression',
    'associatedSymptoms',
    'redFlags',
    'swallowStudy',
    'treatment',
    'dietModifications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Dysphagia")] --> B{"Location?"}
    B -->|"Throat/Transfer"| C["Oropharyngeal"]
    B -->|"Chest/Sticking"| D["Esophageal"]
    C --> E["MBSS or FEES"]
    E --> F{"Aspiration?"}
    F -->|"Yes"| G["Speech Therapy\\nDiet Modification"]
    F -->|"No"| H["Structural Cause?"]
    H -->|"Zenker's"| I["Surgery"]
    H -->|"Neurological"| J["Treat Underlying"]
    D --> K{"Solids Only?"}
    K -->|"Yes"| L["EGD\\nMechanical Cause"]
    K -->|"Both"| M["Motility Study\\nEsophageal Dysmotility"]
    L -->|"Stricture"| N["Dilation"]
    L -->|"Mass"| O["Biopsy"]
    subgraph RedFlags["Red Flags"]
        R1["Weight Loss"]
        R2["Odynophagia"]
        R3["Regurgitation"]
    end
    style O fill:#DC143C,color:#fff
    style G fill:#FFA500,color:#000`,
};

/**
 * Head and Neck Cancer Staging template
 */
export const headNeckCancerStaging: DiagramTemplate = {
  id: 'ent-head-neck-cancer-staging',
  name: 'Head and Neck Cancer Staging Algorithm',
  description: 'TNM staging and treatment pathway for head and neck SCC',
  domain: 'medicine',
  promptTemplate: `Create a head and neck cancer staging flowchart:
- Primary site: {{primarySite}}
- T stage criteria: {{tStage}}
- N stage criteria: {{nStage}}
- M stage: {{mStage}}
- HPV status: {{hpvStatus}}
- Imaging workup: {{imaging}}
- Treatment modalities: {{treatment}}
- Surveillance protocol: {{surveillance}}
{{#additionalNotes}}Multidisciplinary approach: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'primarySite',
    'tStage',
    'nStage',
    'mStage',
    'hpvStatus',
    'imaging',
    'treatment',
    'surveillance',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Head & Neck\\nMass")] --> B["Biopsy\\nConfirm SCC"]
    B --> C["Staging Workup\\nCT/MRI + PET"]
    C --> D{"HPV Status?\\n(Oropharynx)"}
    D -->|"HPV+"| E["Better Prognosis\\nDeintensification Trials"]
    D -->|"HPV-"| F["Standard Staging"]
    F --> G{"Stage?"}
    G -->|"I-II"| H["Single Modality\\nSurgery OR RT"]
    G -->|"III-IVA"| I["Combined\\nSurgery + RT/CRT"]
    G -->|"IVB-IVC"| J["Palliative\\nSystemic Therapy"]
    I --> K["Neck Dissection\\nif N+"]
    subgraph MDT["Tumor Board"]
        M1["ENT Surgery"]
        M2["Radiation Oncology"]
        M3["Medical Oncology"]
        M4["Pathology"]
    end
    H --> MDT
    I --> MDT
    style J fill:#DC143C,color:#fff
    style E fill:#22C55E,color:#fff`,
};

/**
 * Obstructive Sleep Apnea Treatment template
 */
export const osatreatmentPathway: DiagramTemplate = {
  id: 'ent-osa-treatment-pathway',
  name: 'OSA Treatment Pathway Algorithm',
  description: 'Comprehensive approach to obstructive sleep apnea management',
  domain: 'medicine',
  promptTemplate: `Create an OSA treatment pathway flowchart:
- AHI severity: {{ahiSeverity}}
- BMI and anatomy: {{anatomy}}
- Symptoms: {{symptoms}}
- CPAP trial outcome: {{cpapTrial}}
- Alternative therapies: {{alternatives}}
- Surgical options: {{surgicalOptions}}
- Follow-up monitoring: {{followUp}}
- Cardiovascular risk: {{cvRisk}}
{{#additionalNotes}}Pediatric OSA: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ahiSeverity',
    'anatomy',
    'symptoms',
    'cpapTrial',
    'alternatives',
    'surgicalOptions',
    'followUp',
    'cvRisk',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Confirmed OSA\\nPSG/HST")] --> B{"AHI?"}
    B -->|"5-15 Mild"| C["Lifestyle\\nWeight Loss\\nPositional"]
    B -->|"15-30 Moderate"| D["CPAP Trial"]
    B -->|">30 Severe"| E["CPAP\\nFirst Line"]
    D --> F{"Tolerant?"}
    E --> F
    F -->|"Yes"| G["Continue CPAP\\nF/U in 3mo"]
    F -->|"No"| H["CPAP Alternatives"]
    H --> I{"Anatomic\\nObstruction?"}
    I -->|"Palate"| J["UPPP"]
    I -->|"Tongue Base"| K["TORS/HNS"]
    I -->|"Multilevel"| L["MMA Surgery"]
    C --> M["Oral Appliance\\nMAD"]
    subgraph HNS["Hypoglossal Nerve Stim"]
        HN1["AHI 15-65"]
        HN2["CPAP Intolerant"]
        HN3["BMI <32"]
        HN4["No CCC"]
    end
    K --> HNS
    style E fill:#4169E1,color:#fff
    style L fill:#8B5CF6,color:#fff`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All ENT templates
 */
export const entTemplates: DiagramTemplate[] = [
  // Clinical Decision Trees (5)
  hearingLossWorkup,
  sinusitisManagement,
  soreThroatAlgorithm,
  vertigoEvaluation,
  hoarsenessEvaluation,
  // Anatomical Diagrams (4)
  earAnatomy,
  sinusAnatomy,
  larynxAnatomy,
  neckAnatomy,
  // Procedure Illustrations (3)
  myringotomyProcedure,
  tonsillectomyIndications,
  tracheostomyProcedure,
  // Data Visualization (2)
  audiogramInterpretation,
  sleepStudyResults,
  // Additional Clinical (2)
  epistaxisManagement,
  neckMassEvaluation,
  // New Templates (10)
  facialNerveParalysis,
  tinnitusEvaluation,
  entThyroidNoduleEvaluation,
  pediatricStridorEvaluation,
  otitisExternaManagement,
  bppvManagement,
  allergicRhinitisManagement,
  entDysphagiaEvaluation,
  headNeckCancerStaging,
  osatreatmentPathway,
];

export default entTemplates;
