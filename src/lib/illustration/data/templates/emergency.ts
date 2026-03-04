/**
 * emergency.ts
 * Emergency Medicine diagram templates for FINNISH
 *
 * Contains comprehensive templates for emergency medicine including:
 * - Clinical decision algorithms (10)
 * - Anatomical diagrams (4)
 * - Procedure illustrations (4)
 * - Data visualization templates (4)
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// DECISION TREES (10 templates)
// =============================================================================

/**
 * Trauma Primary/Secondary Survey Algorithm
 */
export const traumaSurvey: DiagramTemplate = {
  id: 'em-trauma-survey',
  name: 'Trauma Primary/Secondary Survey',
  description: 'ATLS-based trauma assessment algorithm with primary and secondary survey components',
  domain: 'medicine',
  promptTemplate: `Create a trauma survey algorithm flowchart:
- Primary survey components (ABCDE): {{primarySurvey}}
- Airway assessment: {{airwayAssessment}}
- Breathing evaluation: {{breathingEval}}
- Circulation status: {{circulationStatus}}
- Disability assessment: {{disabilityAssessment}}
- Exposure findings: {{exposureFindings}}
- Secondary survey elements: {{secondarySurvey}}
- Adjuncts: {{adjuncts}}
{{#additionalNotes}}Additional considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'primarySurvey',
    'airwayAssessment',
    'breathingEval',
    'circulationStatus',
    'disabilityAssessment',
    'exposureFindings',
    'secondarySurvey',
    'adjuncts',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Primary["Primary Survey - ABCDE"]
        A["A: Airway\\n+ C-spine"] --> B["B: Breathing"]
        B --> C["C: Circulation"]
        C --> D["D: Disability"]
        D --> E["E: Exposure"]
    end
    subgraph Resus["Simultaneous Resuscitation"]
        R1["IV Access"]
        R2["O2/Intubation"]
        R3["Hemorrhage Control"]
    end
    E --> F{"Life-Threatening\\nInjury?"}
    F -->|"Yes"| G["Intervene Immediately"]
    F -->|"No"| H["Secondary Survey"]
    H --> I["Head-to-Toe Exam"]
    I --> J["AMPLE History"]
    style A fill:#DC143C,color:#fff
    style G fill:#DC143C,color:#fff`,
};

/**
 * Airway Algorithm
 */
export const airwayAlgorithm: DiagramTemplate = {
  id: 'em-airway-algorithm',
  name: 'Difficult Airway Algorithm',
  description: 'Emergency airway management algorithm including RSI and rescue techniques',
  domain: 'medicine',
  promptTemplate: `Create an airway management algorithm:
- Initial assessment: {{initialAssessment}}
- Predictors of difficulty: {{difficultyPredictors}}
- RSI medications: {{rsiMedications}}
- Primary technique: {{primaryTechnique}}
- Backup devices: {{backupDevices}}
- Rescue techniques: {{rescueTechniques}}
- Surgical airway criteria: {{surgicalCriteria}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'initialAssessment',
    'difficultyPredictors',
    'rsiMedications',
    'primaryTechnique',
    'backupDevices',
    'rescueTechniques',
    'surgicalCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Airway Assessment"] --> B{"Predicted\\nDifficult?"}
    B -->|"No"| C["RSI"]
    B -->|"Yes"| D["Awake Technique"]
    C --> E{"First Attempt\\nSuccess?"}
    E -->|"Yes"| F["Confirm Placement"]
    E -->|"No"| G["Optimize + Reattempt"]
    G --> H{"Second Attempt?"}
    H -->|"Fail"| I["Supraglottic Device"]
    I --> J{"Ventilation?"}
    J -->|"No"| K["CICO - Surgical Airway"]
    J -->|"Yes"| L["Stabilize"]
    style K fill:#DC143C,color:#fff
    style F fill:#228B22,color:#fff`,
};

/**
 * Shock Evaluation Algorithm
 */
export const shockEvaluation: DiagramTemplate = {
  id: 'em-shock-evaluation',
  name: 'Shock Evaluation Algorithm',
  description: 'Systematic approach to shock classification and initial management',
  domain: 'medicine',
  promptTemplate: `Create a shock evaluation flowchart:
- Presenting signs: {{presentingSigns}}
- Initial vitals: {{initialVitals}}
- Volume status assessment: {{volumeStatus}}
- Cardiac evaluation: {{cardiacEval}}
- Distributive signs: {{distributiveSigns}}
- Obstructive causes: {{obstructiveCauses}}
- Initial resuscitation: {{initialResuscitation}}
- Vasopressor selection: {{vasopressorSelection}}
{{#additionalNotes}}Additional workup: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentingSigns',
    'initialVitals',
    'volumeStatus',
    'cardiacEval',
    'distributiveSigns',
    'obstructiveCauses',
    'initialResuscitation',
    'vasopressorSelection',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Hypotension +\\nPoor Perfusion"] --> B["IV Access + Fluids"]
    B --> C{"JVP/CVP?"}
    C -->|"Low"| D["Hypovolemic"]
    C -->|"High"| E{"Warm or Cold?"}
    E -->|"Cold"| F["Cardiogenic"]
    E -->|"Warm"| G["Distributive"]
    C -->|"High + Muffled"| H["Obstructive"]
    D --> I["Volume Resuscitation"]
    F --> J["Inotropes + Echo"]
    G --> K["Vasopressors + Source"]
    H --> L["Treat Cause\\nPE/Tamponade/Tension"]
    style A fill:#DC143C,color:#fff
    style L fill:#8B0000,color:#fff`,
};

/**
 * ED Chest Pain Algorithm
 */
export const edChestPain: DiagramTemplate = {
  id: 'em-ed-chest-pain',
  name: 'ED Chest Pain Approach',
  description: 'Emergency department chest pain evaluation and risk stratification',
  domain: 'medicine',
  promptTemplate: `Create an ED chest pain algorithm:
- Presentation: {{presentation}}
- Initial ECG findings: {{ecgFindings}}
- Troponin strategy: {{troponinStrategy}}
- HEART score components: {{heartScore}}
- ACS pathway: {{acsPathway}}
- Alternative diagnoses: {{alternativeDx}}
- Disposition criteria: {{dispositionCriteria}}
{{#additionalNotes}}Risk factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentation',
    'ecgFindings',
    'troponinStrategy',
    'heartScore',
    'acsPathway',
    'alternativeDx',
    'dispositionCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Chest Pain"] --> B["ECG in 10 min"]
    B --> C{"STEMI?"}
    C -->|"Yes"| D["Activate Cath Lab"]
    C -->|"No"| E["Troponin + HEART Score"]
    E --> F{"HEART 0-3?"}
    F -->|"Yes"| G["Consider Discharge"]
    F -->|"No"| H{"HEART 4-6?"}
    H -->|"Yes"| I["Observation + Serial Troponin"]
    H -->|"No"| J["Admit + Cardiology"]
    I --> K{"Troponin Rise?"}
    K -->|"Yes"| J
    K -->|"No"| G
    style D fill:#DC143C,color:#fff
    style G fill:#228B22,color:#fff`,
};

/**
 * Altered Mental Status Algorithm
 */
export const alteredMentalStatus: DiagramTemplate = {
  id: 'em-altered-mental-status',
  name: 'Altered Mental Status Algorithm',
  description: 'Systematic approach to altered mental status in the emergency department',
  domain: 'medicine',
  promptTemplate: `Create an altered mental status algorithm:
- Initial presentation: {{presentation}}
- Vital sign abnormalities: {{vitalSigns}}
- Glucose check: {{glucoseCheck}}
- Toxicology considerations: {{toxicology}}
- Infectious workup: {{infectiousWorkup}}
- Neurologic exam: {{neuroExam}}
- Imaging criteria: {{imagingCriteria}}
- Empiric treatments: {{empiricTreatments}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentation',
    'vitalSigns',
    'glucoseCheck',
    'toxicology',
    'infectiousWorkup',
    'neuroExam',
    'imagingCriteria',
    'empiricTreatments',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Altered Mental Status"] --> B["ABCs + Glucose"]
    B --> C{"Hypoglycemia?"}
    C -->|"Yes"| D["D50 IV"]
    C -->|"No"| E["Focused H&P"]
    E --> F{"Fever/Neck Stiff?"}
    F -->|"Yes"| G["LP + Abx + CT"]
    F -->|"No"| H{"Focal Neuro?"}
    H -->|"Yes"| I["CT Head STAT"]
    H -->|"No"| J{"Toxidrome?"}
    J -->|"Yes"| K["Specific Antidote"]
    J -->|"No"| L["Broad Workup"]
    L --> M["Labs/CT/LP PRN"]
    style A fill:#FFA500,color:#000
    style G fill:#DC143C,color:#fff`,
};

/**
 * Syncope Workup Algorithm
 */
export const syncopeWorkup: DiagramTemplate = {
  id: 'em-syncope-workup',
  name: 'ED Syncope Workup',
  description: 'Risk stratification and workup for syncope in the emergency department',
  domain: 'medicine',
  promptTemplate: `Create a syncope workup algorithm:
- History features: {{historyFeatures}}
- High-risk criteria: {{highRiskCriteria}}
- ECG findings: {{ecgFindings}}
- San Francisco Syncope Rule: {{sfsyncopeRule}}
- Orthostatic testing: {{orthostaticTest}}
- Cardiac workup: {{cardiacWorkup}}
- Neurologic considerations: {{neurologicConsiderations}}
- Disposition: {{disposition}}
{{#additionalNotes}}Additional factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'historyFeatures',
    'highRiskCriteria',
    'ecgFindings',
    'sfsyncopeRule',
    'orthostaticTest',
    'cardiacWorkup',
    'neurologicConsiderations',
    'disposition',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Syncope"] --> B["H&P + ECG"]
    B --> C{"High-Risk\\nFeatures?"}
    C -->|"Cardiac Hx, Abnl ECG,\\nNo Prodrome"| D["Admit/Obs"]
    C -->|"No"| E{"Vasovagal\\nFeatures?"}
    E -->|"Yes"| F["Reassurance +\\nPrecautions"]
    E -->|"No"| G["Orthostatics"]
    G -->|"Positive"| H["Volume/Meds"]
    G -->|"Negative"| I["Risk Stratify"]
    I -->|"Low Risk"| F
    I -->|"Intermediate"| J["Short Obs + Echo"]
    D --> K["Telemetry + Cards"]
    style D fill:#FFA500,color:#000
    style F fill:#228B22,color:#fff`,
};

/**
 * Toxicology Approach Algorithm
 */
export const toxicologyApproach: DiagramTemplate = {
  id: 'em-toxicology-approach',
  name: 'Toxicology Approach Algorithm',
  description: 'Systematic approach to the poisoned patient in the emergency department',
  domain: 'medicine',
  promptTemplate: `Create a toxicology approach algorithm:
- Toxidrome identification: {{toxidromeID}}
- Vital sign patterns: {{vitalPatterns}}
- Pupil findings: {{pupilFindings}}
- Skin findings: {{skinFindings}}
- GI decontamination criteria: {{giDecontamination}}
- Specific antidotes: {{specificAntidotes}}
- Enhanced elimination: {{enhancedElimination}}
- Supportive care: {{supportiveCare}}
{{#additionalNotes}}Poison control: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'toxidromeID',
    'vitalPatterns',
    'pupilFindings',
    'skinFindings',
    'giDecontamination',
    'specificAntidotes',
    'enhancedElimination',
    'supportiveCare',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Suspected Poisoning"] --> B["ABCs + Decontamination"]
    B --> C{"Toxidrome?"}
    C -->|"Anticholinergic"| D["Supportive\\n+/- Physostigmine"]
    C -->|"Cholinergic"| E["Atropine +\\nPralidoxime"]
    C -->|"Opioid"| F["Naloxone"]
    C -->|"Sympathomimetic"| G["Benzos + Cooling"]
    C -->|"Sedative"| H["Supportive +/-\\nFlumazenil"]
    C -->|"Unknown"| I["Broad Workup"]
    I --> J["ECG + Labs + Levels"]
    J --> K["Poison Control"]
    style A fill:#8B008B,color:#fff
    style K fill:#4169E1,color:#fff`,
};

/**
 * Sepsis Bundle Algorithm
 */
export const sepsisBundle: DiagramTemplate = {
  id: 'em-sepsis-bundle',
  name: 'Sepsis Bundle Algorithm',
  description: 'Hour-1 and hour-3 sepsis bundle implementation algorithm',
  domain: 'medicine',
  promptTemplate: `Create a sepsis bundle algorithm:
- Sepsis criteria: {{sepsisCriteria}}
- qSOFA components: {{qsofaComponents}}
- Hour-1 bundle elements: {{hour1Bundle}}
- Lactate measurement: {{lactateMeasurement}}
- Fluid resuscitation: {{fluidResuscitation}}
- Antibiotic selection: {{antibioticSelection}}
- Vasopressor initiation: {{vasopressorInitiation}}
- Source control: {{sourceControl}}
{{#additionalNotes}}Reassessment criteria: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'sepsisCriteria',
    'qsofaComponents',
    'hour1Bundle',
    'lactateMeasurement',
    'fluidResuscitation',
    'antibioticSelection',
    'vasopressorInitiation',
    'sourceControl',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Suspected Infection"] --> B{"qSOFA >=2?"}
    B -->|"Yes"| C["SEPSIS ALERT"]
    C --> D["Hour-1 Bundle"]
    D --> D1["Lactate"]
    D --> D2["Blood Cultures"]
    D --> D3["Broad-Spectrum Abx"]
    D --> D4["30mL/kg Crystalloid"]
    D1 & D2 & D3 & D4 --> E{"Lactate >2 or\\nHypotension?"}
    E -->|"Yes"| F["Repeat Lactate"]
    E -->|"Yes"| G["Vasopressors if\\nMAP <65"]
    E -->|"No"| H["Reassess q4h"]
    style C fill:#DC143C,color:#fff
    style D fill:#FFA500,color:#000`,
};

/**
 * Anaphylaxis Algorithm
 */
export const anaphylaxisAlgorithm: DiagramTemplate = {
  id: 'em-anaphylaxis-algorithm',
  name: 'Anaphylaxis Management Algorithm',
  description: 'Emergency management of anaphylaxis with epinephrine dosing',
  domain: 'medicine',
  promptTemplate: `Create an anaphylaxis management algorithm:
- Diagnostic criteria: {{diagnosticCriteria}}
- Immediate interventions: {{immediateInterventions}}
- Epinephrine dosing: {{epinephrineDosing}}
- Adjunctive medications: {{adjunctiveMeds}}
- Refractory treatment: {{refractoryTreatment}}
- Biphasic reaction monitoring: {{biphasicMonitoring}}
- Discharge instructions: {{dischargeInstructions}}
{{#additionalNotes}}Trigger identification: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'diagnosticCriteria',
    'immediateInterventions',
    'epinephrineDosing',
    'adjunctiveMeds',
    'refractoryTreatment',
    'biphasicMonitoring',
    'dischargeInstructions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Anaphylaxis\\nSuspected"] --> B["Remove Trigger"]
    B --> C["IM Epinephrine\\n0.3-0.5mg"]
    C --> D["Call for Help"]
    D --> E["Position + O2 + IV"]
    E --> F{"Response?"}
    F -->|"No"| G["Repeat Epi q5-15min"]
    G --> H{"Still Refractory?"}
    H -->|"Yes"| I["Epi Drip + Glucagon"]
    F -->|"Yes"| J["Observe 4-6h"]
    J --> K["H1/H2 Blockers\\nSteroids"]
    K --> L["Discharge with\\nEpiPen + Plan"]
    style C fill:#DC143C,color:#fff
    style L fill:#228B22,color:#fff`,
};

/**
 * Pediatric Fever Algorithm
 */
export const pediatricFever: DiagramTemplate = {
  id: 'em-pediatric-fever',
  name: 'Pediatric Fever Algorithm',
  description: 'Age-based approach to fever in pediatric patients',
  domain: 'medicine',
  promptTemplate: `Create a pediatric fever algorithm:
- Age category: {{ageCategory}}
- Temperature threshold: {{tempThreshold}}
- Appearance assessment: {{appearanceAssessment}}
- Well-appearing criteria: {{wellAppearingCriteria}}
- Laboratory workup: {{labWorkup}}
- Lumbar puncture criteria: {{lpCriteria}}
- Empiric antibiotics: {{empiricAntibiotics}}
- Disposition: {{disposition}}
{{#additionalNotes}}Vaccination status: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ageCategory',
    'tempThreshold',
    'appearanceAssessment',
    'wellAppearingCriteria',
    'labWorkup',
    'lpCriteria',
    'empiricAntibiotics',
    'disposition',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Febrile Child"] --> B{"Age?"}
    B -->|"<28 days"| C["Full Sepsis Workup\\n+ Admit + Abx"]
    B -->|"29-60 days"| D{"Ill-Appearing?"}
    D -->|"Yes"| C
    D -->|"No"| E["Rochester/Boston\\nCriteria"]
    E -->|"Low Risk"| F["Close Follow-up"]
    E -->|"Not Low Risk"| G["Labs + LP +/-Admit"]
    B -->|"3-36 months"| H{"Toxic?"}
    H -->|"Yes"| I["Full Workup + Admit"]
    H -->|"No"| J["UA + Consider Labs"]
    B -->|">36 months"| K["Focused Evaluation"]
    style C fill:#DC143C,color:#fff
    style F fill:#228B22,color:#fff`,
};

// =============================================================================
// ANATOMICAL DIAGRAMS (4 templates)
// =============================================================================

/**
 * Airway Anatomy Template
 */
export const emergencyAirwayAnatomy: DiagramTemplate = {
  id: 'em-airway-anatomy',
  name: 'Airway Anatomy for Intubation',
  description: 'Upper airway anatomy relevant to emergency airway management',
  domain: 'medicine',
  promptTemplate: `Create an airway anatomy diagram:
- Oral cavity structures: {{oralStructures}}
- Pharyngeal anatomy: {{pharyngealAnatomy}}
- Laryngeal landmarks: {{laryngealLandmarks}}
- Glottic structures: {{glotticStructures}}
- Tracheal anatomy: {{trachealAnatomy}}
- Cricothyroid membrane: {{cricothyroidMembrane}}
- Relevant measurements: {{measurements}}
{{#additionalNotes}}Anatomical variations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'oralStructures',
    'pharyngealAnatomy',
    'laryngealLandmarks',
    'glotticStructures',
    'trachealAnatomy',
    'cricothyroidMembrane',
    'measurements',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Upper["Upper Airway"]
        A["Oral Cavity"] --> B["Oropharynx"]
        B --> C["Hypopharynx"]
    end
    subgraph Larynx["Larynx"]
        D["Epiglottis"]
        E["Vocal Cords"]
        F["Arytenoids"]
        G["Cricoid"]
    end
    subgraph Lower["Lower Airway"]
        H["Trachea"]
        I["Carina"]
    end
    C --> D --> E --> H --> I
    G -->|"Cricothyroid\\nMembrane"| CTM["Surgical\\nAirway Site"]
    style E fill:#DC143C,color:#fff
    style CTM fill:#FFA500,color:#000`,
};

/**
 * Central Line Landmarks Template
 */
export const centralLineLandmarks: DiagramTemplate = {
  id: 'em-central-line-landmarks',
  name: 'Central Line Anatomical Landmarks',
  description: 'Anatomical landmarks for IJ, subclavian, and femoral central line placement',
  domain: 'medicine',
  promptTemplate: `Create a central line landmarks diagram:
- IJ landmarks: {{ijLandmarks}}
- IJ ultrasound view: {{ijUltrasound}}
- Subclavian landmarks: {{subclavianLandmarks}}
- Femoral landmarks: {{femoralLandmarks}}
- Danger zones: {{dangerZones}}
- Vessel relationships: {{vesselRelationships}}
- Needle angles: {{needleAngles}}
{{#additionalNotes}}Complications by site: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ijLandmarks',
    'ijUltrasound',
    'subclavianLandmarks',
    'femoralLandmarks',
    'dangerZones',
    'vesselRelationships',
    'needleAngles',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph IJ["Internal Jugular"]
        IJ1["Triangle: SCM heads + Clavicle"]
        IJ2["Lateral to Carotid"]
        IJ3["US: Compressible, no pulse"]
    end
    subgraph SC["Subclavian"]
        SC1["Infraclavicular"]
        SC2["Junction middle/medial third"]
        SC3["Aim toward sternal notch"]
    end
    subgraph Fem["Femoral"]
        F1["Below inguinal ligament"]
        F2["NAVEL: Nerve-Artery-Vein-Empty-Lymph"]
        F3["Medial to arterial pulse"]
    end
    style IJ fill:#4169E1,color:#fff
    style SC fill:#228B22,color:#fff
    style Fem fill:#FFA500,color:#000`,
};

/**
 * FAST Exam Positions Template
 */
export const fastExamPositions: DiagramTemplate = {
  id: 'em-fast-exam-positions',
  name: 'FAST Exam Positions',
  description: 'Four standard FAST exam probe positions and views',
  domain: 'medicine',
  promptTemplate: `Create a FAST exam positions diagram:
- RUQ view (Morison): {{ruqView}}
- LUQ view (Splenorenal): {{luqView}}
- Suprapubic view: {{suprapubicView}}
- Subxiphoid view: {{subxiphoidView}}
- Positive findings: {{positiveFindings}}
- Extended FAST additions: {{efastAdditions}}
- Probe orientation: {{probeOrientation}}
{{#additionalNotes}}Limitations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ruqView',
    'luqView',
    'suprapubicView',
    'subxiphoidView',
    'positiveFindings',
    'efastAdditions',
    'probeOrientation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph FAST["FAST Exam Views"]
        A["1. RUQ\\nMorison's Pouch"]
        B["2. LUQ\\nSplenorenal"]
        C["3. Suprapubic\\nBladder Window"]
        D["4. Subxiphoid\\nPericardial"]
    end
    subgraph eFAST["Extended FAST"]
        E["5. Bilateral\\nHemithorax"]
    end
    A -->|"Free Fluid"| F["Positive"]
    B -->|"Free Fluid"| F
    C -->|"Free Fluid"| F
    D -->|"Effusion"| G["Tamponade?"]
    E -->|"No Sliding"| H["Pneumothorax"]
    style F fill:#DC143C,color:#fff
    style G fill:#FFA500,color:#000`,
};

/**
 * Burn Assessment (Rule of 9s) Template
 */
export const burnAssessment: DiagramTemplate = {
  id: 'em-burn-assessment',
  name: 'Burn Assessment - Rule of 9s',
  description: 'Wallace Rule of 9s for burn surface area estimation in adults and children',
  domain: 'medicine',
  promptTemplate: `Create a burn assessment diagram:
- Adult percentages: {{adultPercentages}}
- Pediatric modifications: {{pediatricMods}}
- Head percentage: {{headPercentage}}
- Trunk percentage: {{trunkPercentage}}
- Extremity percentages: {{extremityPercentages}}
- Perineum: {{perineum}}
- Palm method: {{palmMethod}}
- Lund-Browder reference: {{lundBrowder}}
{{#additionalNotes}}Burn depth assessment: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'adultPercentages',
    'pediatricMods',
    'headPercentage',
    'trunkPercentage',
    'extremityPercentages',
    'perineum',
    'palmMethod',
    'lundBrowder',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Adult["Adult Rule of 9s"]
        H["Head: 9%"]
        T1["Anterior Trunk: 18%"]
        T2["Posterior Trunk: 18%"]
        A["Each Arm: 9%"]
        L["Each Leg: 18%"]
        P["Perineum: 1%"]
    end
    subgraph Peds["Pediatric Modifications"]
        PH["Head: 18% (infant)"]
        PL["Each Leg: 14% (infant)"]
    end
    subgraph Fluid["Parkland Formula"]
        F["4mL x kg x %TBSA"]
        F1["Half in first 8h"]
        F2["Half in next 16h"]
    end
    style H fill:#FFA500,color:#000
    style PH fill:#DC143C,color:#fff`,
};

// =============================================================================
// PROCEDURES (4 templates)
// =============================================================================

/**
 * RSI Checklist Template
 */
export const rsiChecklist: DiagramTemplate = {
  id: 'em-rsi-checklist',
  name: 'RSI Checklist',
  description: 'Rapid Sequence Intubation preparation and execution checklist',
  domain: 'medicine',
  promptTemplate: `Create an RSI checklist:
- Preparation phase: {{preparationPhase}}
- Equipment check: {{equipmentCheck}}
- Preoxygenation: {{preoxygenation}}
- Pretreatment medications: {{pretreatmentMeds}}
- Induction agents: {{inductionAgents}}
- Paralytic selection: {{paralyticSelection}}
- Backup plan: {{backupPlan}}
- Post-intubation: {{postIntubation}}
{{#additionalNotes}}Special situations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'preparationPhase',
    'equipmentCheck',
    'preoxygenation',
    'pretreatmentMeds',
    'inductionAgents',
    'paralyticSelection',
    'backupPlan',
    'postIntubation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Prep["Preparation"]
        P1["SOAP-ME"]
        P2["Suction-O2-Airway-Pharmacy-Monitoring-Equipment"]
    end
    subgraph PreOx["Preoxygenation"]
        O1["NRB 3-5 min"]
        O2["Apneic O2"]
    end
    subgraph Meds["Medications"]
        M1["Induction:\\nEtomidate 0.3mg/kg\\nor Ketamine 1-2mg/kg"]
        M2["Paralytic:\\nSucc 1.5mg/kg\\nor Roc 1.2mg/kg"]
    end
    subgraph Intubate["Intubation"]
        I1["Wait 45-60s"]
        I2["Direct/Video Laryngoscopy"]
        I3["Confirm: ETCO2, Auscultation, CXR"]
    end
    Prep --> PreOx --> Meds --> Intubate
    style I3 fill:#228B22,color:#fff`,
};

/**
 * Chest Tube Insertion Template
 */
export const chestTubeInsertion: DiagramTemplate = {
  id: 'em-chest-tube-insertion',
  name: 'Chest Tube Insertion Steps',
  description: 'Step-by-step chest tube thoracostomy procedure',
  domain: 'medicine',
  promptTemplate: `Create a chest tube insertion guide:
- Indications: {{indications}}
- Patient positioning: {{patientPositioning}}
- Landmark identification: {{landmarkID}}
- Anesthesia technique: {{anesthesia}}
- Incision and dissection: {{incisionDissection}}
- Tube insertion: {{tubeInsertion}}
- Securing and connection: {{securingConnection}}
- Confirmation: {{confirmation}}
{{#additionalNotes}}Complications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'indications',
    'patientPositioning',
    'landmarkID',
    'anesthesia',
    'incisionDissection',
    'tubeInsertion',
    'securingConnection',
    'confirmation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Position: Arm above head"] --> B["Landmark: 4th-5th ICS\\nAnterior to mid-axillary"]
    B --> C["Prep + Drape + Anesthetize"]
    C --> D["2-3cm Incision over rib"]
    D --> E["Blunt dissect over rib\\nto avoid neurovascular bundle"]
    E --> F["Enter pleura with finger"]
    F --> G["Sweep finger - confirm cavity"]
    G --> H["Insert tube posteriorly\\nand superiorly"]
    H --> I["Connect to drainage system"]
    I --> J["Secure with suture"]
    J --> K["CXR confirmation"]
    style F fill:#FFA500,color:#000
    style K fill:#228B22,color:#fff`,
};

/**
 * Code Medications Template
 */
export const codeMedications: DiagramTemplate = {
  id: 'em-code-medications',
  name: 'Code Medications Reference',
  description: 'ACLS cardiac arrest medication dosing and timing',
  domain: 'medicine',
  promptTemplate: `Create a code medications reference:
- Epinephrine dosing: {{epinephrineDosing}}
- Amiodarone dosing: {{amiodaroneDosing}}
- Lidocaine alternative: {{lidocaineAlt}}
- Calcium indications: {{calciumIndications}}
- Bicarbonate indications: {{bicarbIndications}}
- Magnesium dosing: {{magnesiumDosing}}
- Vasopressin consideration: {{vasopressin}}
- Timing intervals: {{timingIntervals}}
{{#additionalNotes}}Special circumstances: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'epinephrineDosing',
    'amiodaroneDosing',
    'lidocaineAlt',
    'calciumIndications',
    'bicarbIndications',
    'magnesiumDosing',
    'vasopressin',
    'timingIntervals',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Epi["Epinephrine"]
        E1["1mg IV/IO q3-5min"]
        E2["All rhythms"]
    end
    subgraph Anti["Antiarrhythmics"]
        A1["Amiodarone 300mg first\\n150mg second"]
        A2["OR Lidocaine 1-1.5mg/kg"]
        A3["For refractory VF/pVT"]
    end
    subgraph Other["Other Agents"]
        O1["Calcium: Hyperkalemia, Ca blocker OD"]
        O2["Bicarb: Hyperkalemia, TCA OD"]
        O3["Magnesium: Torsades"]
    end
    subgraph Hs["H's and T's"]
        H["Hypovolemia, Hypoxia,\\nH+, Hypo/Hyperkalemia,\\nHypothermia"]
        T["Tension PTX, Tamponade,\\nToxins, Thrombosis\\n(PE/MI)"]
    end
    style E1 fill:#DC143C,color:#fff`,
};

/**
 * Massive Transfusion Protocol Template
 */
export const massiveTransfusionProtocol: DiagramTemplate = {
  id: 'em-mtp',
  name: 'Massive Transfusion Protocol',
  description: 'Massive transfusion protocol activation and product delivery',
  domain: 'medicine',
  promptTemplate: `Create a massive transfusion protocol:
- Activation criteria: {{activationCriteria}}
- Initial products: {{initialProducts}}
- Product ratios: {{productRatios}}
- Calcium supplementation: {{calciumSupplementation}}
- TXA administration: {{txaAdministration}}
- Lab monitoring: {{labMonitoring}}
- Goal parameters: {{goalParameters}}
- Termination criteria: {{terminationCriteria}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'activationCriteria',
    'initialProducts',
    'productRatios',
    'calciumSupplementation',
    'txaAdministration',
    'labMonitoring',
    'goalParameters',
    'terminationCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["MTP Activation\\nABC Score >=2"] --> B["Notify Blood Bank"]
    B --> C["Round 1:\\n6 RBC : 6 FFP : 1 Plt"]
    C --> D["TXA 1g over 10min\\nthen 1g over 8h"]
    D --> E["Calcium 1g per 4 units"]
    E --> F["Labs q30-60min"]
    F --> G{"Goals Met?\\nHb>7, Plt>50,\\nFib>150, INR<1.5"}
    G -->|"No"| H["Continue MTP"]
    G -->|"Yes"| I["Deactivate MTP"]
    H --> C
    style A fill:#DC143C,color:#fff
    style I fill:#228B22,color:#fff`,
};

// =============================================================================
// DATA VISUALIZATION (4 templates)
// =============================================================================

/**
 * ESI Triage Algorithm Template
 */
export const esiTriageAlgorithm: DiagramTemplate = {
  id: 'em-esi-triage',
  name: 'ESI Triage Algorithm',
  description: 'Emergency Severity Index 5-level triage decision support',
  domain: 'medicine',
  promptTemplate: `Create an ESI triage algorithm:
- Level 1 criteria: {{level1Criteria}}
- Level 2 criteria: {{level2Criteria}}
- Resource prediction: {{resourcePrediction}}
- Vital sign considerations: {{vitalConsiderations}}
- Level 3 criteria: {{level3Criteria}}
- Level 4 criteria: {{level4Criteria}}
- Level 5 criteria: {{level5Criteria}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'level1Criteria',
    'level2Criteria',
    'resourcePrediction',
    'vitalConsiderations',
    'level3Criteria',
    'level4Criteria',
    'level5Criteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Patient Arrives"] --> B{"Dying?\\nRequires immediate\\nintervention?"}
    B -->|"Yes"| C["ESI 1"]
    B -->|"No"| D{"High Risk?\\nConfused/Lethargic?\\nSevere Pain?"}
    D -->|"Yes"| E["ESI 2"]
    D -->|"No"| F{"How Many\\nResources?"}
    F -->|">=2"| G["ESI 3"]
    F -->|"1"| H["ESI 4"]
    F -->|"0"| I["ESI 5"]
    G --> J{"Danger Zone\\nVitals?"}
    J -->|"Yes"| E
    J -->|"No"| G
    style C fill:#DC143C,color:#fff
    style E fill:#FFA500,color:#000
    style G fill:#FFD700,color:#000
    style H fill:#90EE90,color:#000
    style I fill:#87CEEB,color:#000`,
};

/**
 * qSOFA/SOFA Scoring Template
 */
export const qsofaSofaScoring: DiagramTemplate = {
  id: 'em-qsofa-sofa',
  name: 'qSOFA/SOFA Scoring',
  description: 'Quick SOFA screening and full SOFA organ dysfunction scoring',
  domain: 'medicine',
  promptTemplate: `Create a qSOFA/SOFA scoring template:
- qSOFA components: {{qsofaComponents}}
- qSOFA interpretation: {{qsofaInterpretation}}
- SOFA respiratory: {{sofaRespiratory}}
- SOFA coagulation: {{sofaCoagulation}}
- SOFA liver: {{sofaLiver}}
- SOFA cardiovascular: {{sofaCardiovascular}}
- SOFA CNS: {{sofaCNS}}
- SOFA renal: {{sofaRenal}}
{{#additionalNotes}}Clinical application: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'qsofaComponents',
    'qsofaInterpretation',
    'sofaRespiratory',
    'sofaCoagulation',
    'sofaLiver',
    'sofaCardiovascular',
    'sofaCNS',
    'sofaRenal',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph qSOFA["qSOFA (>=2 = High Risk)"]
        Q1["RR >= 22"]
        Q2["SBP <= 100"]
        Q3["Altered Mental Status"]
    end
    subgraph SOFA["SOFA Components (0-4 each)"]
        S1["Respiratory: PaO2/FiO2"]
        S2["Coagulation: Platelets"]
        S3["Liver: Bilirubin"]
        S4["Cardiovascular: MAP/Pressors"]
        S5["CNS: GCS"]
        S6["Renal: Creatinine/UOP"]
    end
    qSOFA --> A{"Score >= 2?"}
    A -->|"Yes"| B["High Risk - Full SOFA"]
    A -->|"No"| C["Reassess Clinically"]
    B --> D{"SOFA >= 2\\nfrom baseline?"}
    D -->|"Yes"| E["SEPSIS"]
    style E fill:#DC143C,color:#fff`,
};

/**
 * NEWS Scoring Template
 */
export const newsScoring: DiagramTemplate = {
  id: 'em-news-scoring',
  name: 'NEWS Scoring System',
  description: 'National Early Warning Score for detecting clinical deterioration',
  domain: 'medicine',
  promptTemplate: `Create a NEWS scoring template:
- Respiratory rate scoring: {{rrScoring}}
- SpO2 scoring: {{spo2Scoring}}
- Supplemental O2: {{supplementalO2}}
- Temperature scoring: {{tempScoring}}
- Systolic BP scoring: {{sbpScoring}}
- Heart rate scoring: {{hrScoring}}
- Consciousness level: {{consciousness}}
- Aggregate score interpretation: {{scoreInterpretation}}
{{#additionalNotes}}Escalation protocol: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'rrScoring',
    'spo2Scoring',
    'supplementalO2',
    'tempScoring',
    'sbpScoring',
    'hrScoring',
    'consciousness',
    'scoreInterpretation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Parameters["NEWS Parameters"]
        P1["RR: 12-20 = 0"]
        P2["SpO2: >=96 = 0"]
        P3["Supp O2: No = 0"]
        P4["Temp: 36.1-38.0 = 0"]
        P5["SBP: 111-219 = 0"]
        P6["HR: 51-90 = 0"]
        P7["AVPU: Alert = 0"]
    end
    subgraph Risk["Risk Stratification"]
        R1["0-4: Low Risk"]
        R2["5-6: Medium Risk"]
        R3[">=7: High Risk"]
        R4["3 in single: Urgent"]
    end
    R1 --> A1["Routine Monitoring"]
    R2 --> A2["Urgent Response"]
    R3 --> A3["Emergency Response"]
    R4 --> A2
    style R3 fill:#DC143C,color:#fff
    style R2 fill:#FFA500,color:#000
    style R1 fill:#228B22,color:#fff`,
};

/**
 * Pediatric Assessment Triangle Template
 */
export const pediatricAssessmentTriangle: DiagramTemplate = {
  id: 'em-pat',
  name: 'Pediatric Assessment Triangle',
  description: 'PAT for rapid pediatric assessment - Appearance, Work of Breathing, Circulation',
  domain: 'medicine',
  promptTemplate: `Create a Pediatric Assessment Triangle:
- Appearance (TICLS): {{appearance}}
- Work of breathing: {{workOfBreathing}}
- Circulation to skin: {{circulationToSkin}}
- Normal PAT interpretation: {{normalPAT}}
- Respiratory distress pattern: {{respiratoryDistress}}
- Respiratory failure pattern: {{respiratoryFailure}}
- Shock pattern: {{shockPattern}}
- CNS dysfunction pattern: {{cnsDysfunction}}
{{#additionalNotes}}Clinical correlations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'appearance',
    'workOfBreathing',
    'circulationToSkin',
    'normalPAT',
    'respiratoryDistress',
    'respiratoryFailure',
    'shockPattern',
    'cnsDysfunction',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph PAT["Pediatric Assessment Triangle"]
        A["Appearance\\n(TICLS)"]
        W["Work of\\nBreathing"]
        C["Circulation\\nto Skin"]
    end
    subgraph TICLS["TICLS"]
        T1["Tone"]
        T2["Interactiveness"]
        T3["Consolability"]
        T4["Look/Gaze"]
        T5["Speech/Cry"]
    end
    subgraph Patterns["Clinical Patterns"]
        P1["All Normal = Stable"]
        P2["Abnl WOB only = Resp Distress"]
        P3["Abnl A + WOB = Resp Failure"]
        P4["Abnl C only = Compensated Shock"]
        P5["Abnl A + C = Decompensated Shock"]
        P6["Abnl A only = CNS/Metabolic"]
    end
    style P3 fill:#DC143C,color:#fff
    style P5 fill:#DC143C,color:#fff`,
};

// =============================================================================
// ADDITIONAL DECISION TREES (4 templates)
// =============================================================================

/**
 * Acute Stroke Algorithm
 */
export const acuteStrokeAlgorithm: DiagramTemplate = {
  id: 'em-acute-stroke',
  name: 'Acute Stroke Algorithm',
  description: 'Time-critical stroke evaluation and treatment algorithm including tPA and thrombectomy criteria',
  domain: 'medicine',
  promptTemplate: `Create an acute stroke algorithm:
- Time of symptom onset: {{symptomOnset}}
- NIHSS score: {{nihssScore}}
- CT findings: {{ctFindings}}
- tPA eligibility: {{tpaEligibility}}
- Large vessel occlusion: {{lvo}}
- Thrombectomy criteria: {{thrombectomyCriteria}}
- Blood pressure management: {{bpManagement}}
{{#additionalNotes}}Contraindications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'symptomOnset',
    'nihssScore',
    'ctFindings',
    'tpaEligibility',
    'lvo',
    'thrombectomyCriteria',
    'bpManagement',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Suspected Stroke"] --> B["STAT CT Head"]
    B --> C{"Hemorrhage?"}
    C -->|"Yes"| D["Neurosurgery Consult"]
    C -->|"No"| E{"Time from LKW?"}
    E -->|"<4.5h"| F["tPA Eligible?"]
    F -->|"Yes"| G["Administer tPA"]
    F -->|"No"| H["Check Exclusions"]
    E -->|">4.5h"| I{"LVO on CTA?"}
    I -->|"Yes"| J["Thrombectomy <24h"]
    I -->|"No"| K["Supportive Care"]
    G --> L{"LVO?"}
    L -->|"Yes"| J
    style G fill:#DC143C,color:#fff
    style J fill:#4169E1,color:#fff`,
};

/**
 * GI Bleeding Algorithm
 */
export const emergencyGiBleedAlgorithm: DiagramTemplate = {
  id: 'em-gi-bleeding',
  name: 'GI Bleeding Algorithm',
  description: 'Upper and lower GI bleeding evaluation and management algorithm',
  domain: 'medicine',
  promptTemplate: `Create a GI bleeding algorithm:
- Presentation type: {{presentationType}}
- Hemodynamic status: {{hemodynamicStatus}}
- Glasgow-Blatchford score: {{gbScore}}
- Resuscitation priorities: {{resuscitation}}
- Transfusion thresholds: {{transfusionThresholds}}
- PPI therapy: {{ppiTherapy}}
- Endoscopy timing: {{endoscopyTiming}}
- Surgical consultation: {{surgicalConsult}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentationType',
    'hemodynamicStatus',
    'gbScore',
    'resuscitation',
    'transfusionThresholds',
    'ppiTherapy',
    'endoscopyTiming',
    'surgicalConsult',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["GI Bleeding"] --> B{"Hemodynamically\\nStable?"}
    B -->|"No"| C["Resuscitate"]
    C --> C1["2 Large Bore IVs"]
    C --> C2["Transfuse PRBCs"]
    C --> C3["Consider MTP"]
    B -->|"Yes"| D{"Upper or\\nLower?"}
    D -->|"Upper\\n(Hematemesis)"| E["IV PPI"]
    D -->|"Lower\\n(Hematochezia)"| F["GI Consult"]
    E --> G["EGD <24h"]
    F --> H{"Brisk\\nBleeding?"}
    H -->|"Yes"| I["EGD or\\nAngio"]
    H -->|"No"| J["Colonoscopy\\nafter Prep"]
    C --> K{"Ongoing\\nBleed?"}
    K -->|"Yes"| L["IR/Surgery"]
    style C fill:#DC143C,color:#fff
    style L fill:#8B0000,color:#fff`,
};

/**
 * Pediatric Resuscitation (PALS) Algorithm
 */
export const palsAlgorithm: DiagramTemplate = {
  id: 'em-pals-algorithm',
  name: 'PALS Cardiac Arrest Algorithm',
  description: 'Pediatric Advanced Life Support algorithm for cardiac arrest',
  domain: 'medicine',
  promptTemplate: `Create a PALS cardiac arrest algorithm:
- Initial rhythm: {{initialRhythm}}
- Shockable vs non-shockable: {{rhythmType}}
- CPR quality metrics: {{cprMetrics}}
- Weight-based dosing: {{weightDosing}}
- Epinephrine dose: {{epinephrineDose}}
- Defibrillation energy: {{defibEnergy}}
- Reversible causes: {{reversibleCauses}}
{{#additionalNotes}}Post-arrest care: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'initialRhythm',
    'rhythmType',
    'cprMetrics',
    'weightDosing',
    'epinephrineDose',
    'defibEnergy',
    'reversibleCauses',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Pediatric Arrest"] --> B["Start CPR"]
    B --> C["Attach Monitor"]
    C --> D{"Shockable?"}
    D -->|"VF/pVT"| E["Shock 2J/kg"]
    D -->|"Asystole/PEA"| F["CPR 2 min"]
    E --> G["CPR 2 min"]
    G --> H["Epi 0.01mg/kg\\nq3-5min"]
    F --> H
    H --> I{"Rhythm Check"}
    I -->|"Shockable"| J["Shock 4J/kg"]
    I -->|"Non-shockable"| F
    I -->|"ROSC"| K["Post-Arrest Care"]
    J --> L["Consider Amio\\n5mg/kg"]
    L --> G
    style A fill:#DC143C,color:#fff
    style K fill:#228B22,color:#fff`,
};

/**
 * Trauma Activation Criteria
 */
export const traumaActivation: DiagramTemplate = {
  id: 'em-trauma-activation',
  name: 'Trauma Activation Criteria',
  description: 'Tiered trauma activation criteria for emergency department',
  domain: 'medicine',
  promptTemplate: `Create a trauma activation criteria template:
- Level 1 criteria: {{level1Criteria}}
- Level 2 criteria: {{level2Criteria}}
- Mechanism criteria: {{mechanismCriteria}}
- Physiologic criteria: {{physiologicCriteria}}
- Anatomic criteria: {{anatomicCriteria}}
- Special populations: {{specialPopulations}}
- Team composition: {{teamComposition}}
{{#additionalNotes}}Activation process: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'level1Criteria',
    'level2Criteria',
    'mechanismCriteria',
    'physiologicCriteria',
    'anatomicCriteria',
    'specialPopulations',
    'teamComposition',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Trauma Patient"] --> B{"Physiologic\\nCriteria?"}
    B -->|"GCS <8, SBP <90,\\nRR <10 or >29"| C["LEVEL 1"]
    B -->|"No"| D{"Anatomic\\nCriteria?"}
    D -->|"Penetrating, Flail,\\n2+ Long Bone Fx"| C
    D -->|"No"| E{"Mechanism?"}
    E -->|"Ejection, >20ft Fall,\\nPed vs Auto"| F["LEVEL 2"]
    E -->|"No"| G{"Special\\nPopulation?"}
    G -->|"Age >65,\\nAnticoag, Pregnancy"| F
    G -->|"No"| H["Standard Eval"]
    C --> I["Full Trauma Team\\n+ Attending"]
    F --> J["Trauma Team\\n+ Resident"]
    style C fill:#DC143C,color:#fff
    style F fill:#FFA500,color:#000`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All emergency medicine templates
 */
export const emergencyTemplates: DiagramTemplate[] = [
  // Decision Trees (10)
  traumaSurvey,
  airwayAlgorithm,
  shockEvaluation,
  edChestPain,
  alteredMentalStatus,
  syncopeWorkup,
  toxicologyApproach,
  sepsisBundle,
  anaphylaxisAlgorithm,
  pediatricFever,
  // Anatomical Diagrams (4)
  emergencyAirwayAnatomy,
  centralLineLandmarks,
  fastExamPositions,
  burnAssessment,
  // Procedures (4)
  rsiChecklist,
  chestTubeInsertion,
  codeMedications,
  massiveTransfusionProtocol,
  // Data Visualization (4)
  esiTriageAlgorithm,
  qsofaSofaScoring,
  newsScoring,
  pediatricAssessmentTriangle,
  // Additional Decision Trees (4)
  acuteStrokeAlgorithm,
  emergencyGiBleedAlgorithm,
  palsAlgorithm,
  traumaActivation,
];

export default emergencyTemplates;
