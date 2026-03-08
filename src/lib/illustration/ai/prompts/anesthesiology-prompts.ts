/**
 * anesthesiology-prompts.ts
 * Anesthesiology-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for anesthesiology and perioperative medicine including:
 * - Pre-operative assessment and optimization
 * - Airway management and difficult airway algorithms
 * - Intraoperative monitoring and management
 * - Regional anesthesia and nerve blocks
 * - Pain management strategies
 * - Anesthetic pharmacology
 * - Complications and emergencies
 * - Post-operative care
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// ANESTHESIOLOGY DOMAIN PROMPT
// =============================================================================

/**
 * Base anesthesiology domain prompt for perioperative medicine diagrams
 */
export const ANESTHESIOLOGY_DOMAIN_PROMPT = `
Anesthesiology diagram requirements:
- Use standard anesthesiology terminology (ASA, MAC, TIVA, RSI, CICO)
- Follow ASA difficult airway algorithm guidelines
- Include NPO guidelines and aspiration risk assessment
- Reference standard drug dosing (mg/kg, mcg/kg/min)
- Use proper airway assessment scales (Mallampati, Cormack-Lehane)
- Follow ERAS protocols where applicable
- Include hemodynamic targets and monitoring parameters
- Reference ASA physical status classification
- Use color coding: Monitoring (Green), Warning (Yellow), Emergency (Red)
- Include proper equipment specifications and settings`;

// =============================================================================
// ANESTHESIOLOGY-SPECIFIC PROMPTS
// =============================================================================

export const ANESTHESIOLOGY_PROMPTS = {
  // Pre-operative Assessment
  preopAssessment: `
Pre-operative Assessment Algorithm requirements:
- Include ASA physical status classification
- Reference functional capacity (METs) evaluation
- Show cardiac risk assessment (RCRI)
- Include pulmonary risk assessment
- Reference NPO guidelines (clear liquids 2h, light meal 6h, full meal 8h)
- Include medication management (continue/hold)
- Show airway assessment components (Mallampati, TMD, neck mobility)
- Reference preoperative optimization pathways`,

  airwayAssessment: `
Airway Assessment requirements:
- Include Mallampati classification (I-IV)
- Reference thyromental distance measurement
- Show mouth opening assessment (3 fingerbreadths)
- Include neck mobility evaluation
- Reference upper lip bite test
- Show predictors of difficult mask ventilation (MOANS)
- Include predictors of difficult intubation (LEMON)
- Reference Cormack-Lehane grading system`,

  // Airway Management
  difficultAirway: `
Difficult Airway Algorithm requirements:
- Follow ASA difficult airway algorithm structure
- Include awake vs asleep decision pathway
- Reference video laryngoscopy indications
- Show supraglottic airway placement sequence
- Include CICO (Can't Intubate, Can't Oxygenate) pathway
- Reference front of neck access technique
- Include call for help triggers
- Show maximum intubation attempts limit`,

  airwayDeviceSelection: `
Airway Device Selection requirements:
- Include face mask vs supraglottic vs ETT decision tree
- Reference LMA selection criteria
- Show ETT size selection (ID = age/4 + 4 for peds)
- Include video laryngoscope blade selection
- Reference bougie/stylet indications
- Show cuff pressure management
- Include confirmation methods (EtCO2, auscultation)`,

  // Intraoperative Management
  inductionSequence: `
Anesthetic Induction Sequence requirements:
- Include pre-oxygenation standards (3 min or 8 breaths)
- Reference IV induction agent dosing
- Show neuromuscular blocker timing
- Include RSI modifications and indications
- Reference co-induction techniques
- Show hemodynamic response management
- Include aspiration prophylaxis`,

  maintenanceAnesthesia: `
Anesthesia Maintenance requirements:
- Include MAC vs TIVA decision pathway
- Reference volatile anesthetic selection (sevoflurane vs desflurane)
- Show opioid administration strategies
- Include muscle relaxation monitoring (TOF)
- Reference depth of anesthesia monitoring (BIS, entropy)
- Show fluid management algorithms
- Include temperature management`,

  hemodynamicManagement: `
Intraoperative Hemodynamic Management requirements:
- Include hypotension differential diagnosis
- Reference vasopressor selection algorithm
- Show fluid responsiveness assessment (PPV, SVV)
- Include inotrope vs vasopressor decision
- Reference goal-directed therapy targets
- Show blood transfusion triggers
- Include massive transfusion protocol activation`,

  // Regional Anesthesia
  neuraxialAnesthesia: `
Neuraxial Anesthesia requirements:
- Include spinal vs epidural vs CSE selection
- Reference level selection (L3-L4, L4-L5)
- Show needle selection (pencil-point vs cutting)
- Include local anesthetic selection and dosing
- Reference additives (opioids, clonidine)
- Show block level assessment (sensory, motor)
- Include complication recognition and management`,

  peripheralNerveBlock: `
Peripheral Nerve Block requirements:
- Include ultrasound-guided technique standards
- Reference nerve stimulator parameters (0.3-0.5 mA)
- Show local anesthetic volume and concentration
- Include block-specific anatomy (brachial plexus, sciatic, femoral)
- Reference catheter placement technique
- Show success assessment criteria
- Include LAST prevention and treatment`,

  // Pharmacology
  anestheticPharmacology: `
Anesthetic Pharmacology requirements:
- Include induction agent comparison (propofol, etomidate, ketamine)
- Reference context-sensitive half-time
- Show opioid equianalgesic dosing
- Include neuromuscular blocker onset/duration
- Reference reversal agent selection (sugammadex vs neostigmine)
- Show volatile MAC values and factors affecting MAC
- Include drug interactions and contraindications`,

  localAnesthetics: `
Local Anesthetic Pharmacology requirements:
- Include amino-ester vs amino-amide classification
- Reference maximum doses (with/without epinephrine)
- Show onset and duration comparison
- Include factors affecting block quality
- Reference pKa and lipid solubility effects
- Show LAST recognition (CNS, cardiovascular signs)
- Include 20% lipid emulsion protocol`,

  // Pain Management
  acutePainManagement: `
Acute Pain Management requirements:
- Include multimodal analgesia principles
- Reference WHO analgesic ladder adaptation
- Show opioid-sparing techniques
- Include regional analgesia options
- Reference PCA programming (demand dose, lockout, basal)
- Show pain assessment tools (NRS, VAS, FLACC)
- Include special populations (pediatric, elderly, opioid-tolerant)`,

  chronicPainIntervention: `
Chronic Pain Intervention requirements:
- Include interventional procedure selection
- Reference epidural steroid injection technique
- Show facet joint intervention pathway
- Include radiofrequency ablation indications
- Reference spinal cord stimulation criteria
- Show intrathecal pump management
- Include multidisciplinary approach`,

  // Complications and Emergencies
  malignantHyperthermia: `
Malignant Hyperthermia requirements:
- Include early recognition signs (EtCO2 rise, tachycardia, rigidity)
- Reference dantrolene dosing (2.5 mg/kg, repeat to 10 mg/kg)
- Show immediate actions checklist
- Include cooling measures
- Reference laboratory monitoring (CK, myoglobin, K+)
- Show ICU transfer criteria
- Include family counseling and testing`,

  localAnestheticToxicity: `
LAST (Local Anesthetic Systemic Toxicity) requirements:
- Include CNS symptoms progression (tinnitus, seizures)
- Reference cardiovascular collapse signs
- Show immediate management steps
- Include 20% lipid emulsion protocol (1.5 mL/kg bolus, 0.25 mL/kg/min)
- Reference advanced cardiac life support modifications
- Show monitoring duration
- Include prevention strategies`,

  anaphylaxis: `
Perioperative Anaphylaxis requirements:
- Include recognition criteria (cardiovascular collapse, bronchospasm)
- Reference epinephrine dosing (10-100 mcg IV titrated)
- Show secondary treatments (antihistamines, steroids)
- Include common triggers (NMBAs, antibiotics, latex)
- Reference tryptase level timing
- Show allergist referral pathway
- Include documentation requirements`,

  ponvManagement: `
PONV Prevention and Treatment requirements:
- Include Apfel risk score calculation
- Reference multimodal prophylaxis based on risk
- Show antiemetic selection and timing
- Include anesthetic technique modifications
- Reference rescue treatment algorithm
- Show risk factors (female, non-smoker, motion sickness, opioids)
- Include ERAS bundle integration`,

  // Post-operative Care
  emergence: `
Emergence and Extubation requirements:
- Include extubation criteria checklist
- Reference neuromuscular blockade reversal confirmation
- Show smooth vs deep extubation technique
- Include high-risk extubation planning
- Reference post-extubation stridor management
- Show PACU handoff components
- Include delayed emergence workup`,

  pacuManagement: `
PACU Management requirements:
- Include Aldrete scoring system
- Reference pain management in PACU
- Show PONV treatment algorithm
- Include oxygen therapy weaning
- Reference discharge criteria
- Show complication recognition (bleeding, airway)
- Include ICU admission criteria`,

  enhancedRecovery: `
Enhanced Recovery (ERAS) requirements:
- Include preoperative optimization components
- Reference carbohydrate loading protocol
- Show intraoperative fluid management
- Include multimodal opioid-sparing analgesia
- Reference early mobilization protocols
- Show nutrition optimization
- Include outcome metrics tracking`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Anesthesiology-specific few-shot examples
 */
export const ANESTHESIOLOGY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a difficult airway algorithm flowchart',
    output: `flowchart TD
    A[("Anticipated\\nDifficult Airway")] --> B{"Patient\\nCooperative?"}
    B -->|Yes| C["Awake Intubation"]
    B -->|No| D["Asleep Approach"]

    C --> C1["Topicalization"]
    C1 --> C2["Awake FOB/VL"]
    C2 --> C3{"Successful?"}
    C3 -->|Yes| Z["Proceed with Surgery"]
    C3 -->|No| E["Consider Surgical Airway"]

    D --> D1["Pre-oxygenate 3-5 min"]
    D1 --> D2["Induce Anesthesia"]
    D2 --> D3{"Mask Ventilation\\nPossible?"}

    D3 -->|Yes| D4["Video Laryngoscopy"]
    D3 -->|No| F["LMA/SGA"]

    D4 --> D5{"Successful\\n<3 attempts?"}
    D5 -->|Yes| Z
    D5 -->|No| F

    F --> F1{"Ventilation\\nPossible?"}
    F1 -->|Yes| G["Alternative: FOB via SGA"]
    F1 -->|No| H["CICO Emergency"]

    G --> G1{"Successful?"}
    G1 -->|Yes| Z
    G1 -->|No| H

    H --> H1["Call for Help"]
    H1 --> H2["Front of Neck Access"]
    H2 --> H3["Scalpel-Bougie-Tube"]
    H3 --> Z

    style A fill:#FFA500,color:#000
    style H fill:#DC143C,color:#fff
    style H2 fill:#8B0000,color:#fff
    style Z fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a malignant hyperthermia treatment algorithm',
    output: `flowchart TD
    A[("Suspect MH\\nEtCO2 rise + Tachycardia\\n+ Rigidity")] --> B["STOP TRIGGERS"]

    B --> B1["Turn off volatiles"]
    B --> B2["Disconnect vaporizers"]
    B --> B3["Hyperventilate with 100% O2"]

    B1 & B2 & B3 --> C["CALL FOR HELP\\nMH Hotline: 1-800-644-9737"]

    C --> D["DANTROLENE"]
    D --> D1["2.5 mg/kg IV bolus"]
    D1 --> D2{"Response?"}
    D2 -->|No| D3["Repeat q5min"]
    D3 --> D4["Up to 10 mg/kg total"]
    D2 -->|Yes| E["Continue 1 mg/kg q6h x 24h"]

    C --> F["COOLING"]
    F --> F1["Cold IV saline"]
    F --> F2["Ice packs to groin/axillae"]
    F --> F3["Target temp <38.5C"]

    C --> G["TREAT HYPERKALEMIA"]
    G --> G1["Calcium chloride/gluconate"]
    G --> G2["Insulin + Glucose"]
    G --> G3["Bicarbonate PRN"]

    C --> H["LABS q15min"]
    H --> H1["ABG, K+, Lactate"]
    H --> H2["CK, Myoglobin"]
    H --> H3["Coags, Urine output"]

    E & F3 & G3 & H3 --> I["ICU Admission"]
    I --> I1["Monitor 24-72h"]
    I --> I2["Genetic counseling"]

    style A fill:#DC143C,color:#fff
    style B fill:#FF4500,color:#fff
    style D fill:#228B22,color:#fff
    style I fill:#4169E1,color:#fff`,
  },
  {
    prompt: 'Create a pre-operative assessment flowchart',
    output: `flowchart TD
    A[("Pre-op\\nEvaluation")] --> B["History & Physical"]

    B --> C["ASA Classification"]
    C --> C1{"ASA I-II?"}
    C1 -->|Yes| D["Standard Workup"]
    C1 -->|No| E["Extended Evaluation"]

    D --> F["Airway Assessment"]
    E --> E1["Subspecialty Consults"]
    E1 --> E2["Optimization"]
    E2 --> F

    F --> F1["Mallampati Score"]
    F --> F2["TMD, Mouth Opening"]
    F --> F3["Neck Mobility"]
    F --> F4{"Difficult\\nAirway?"}

    F4 -->|Yes| G["Airway Plan"]
    F4 -->|No| H["Standard Plan"]

    G --> G1["Equipment ready"]
    G --> G2["Backup plan"]
    G --> G3["Consider awake technique"]

    H & G3 --> I["Functional Capacity"]
    I --> I1{">= 4 METs?"}
    I1 -->|Yes| J["Proceed"]
    I1 -->|No| K["Cardiac Risk Assessment"]

    K --> K1["RCRI Score"]
    K1 --> K2{"High Risk?"}
    K2 -->|Yes| L["Cardiology Consult"]
    K2 -->|No| J

    L --> L1["Optimize"]
    L1 --> J

    J --> M["NPO Instructions"]
    M --> M1["Clear liquids: 2h"]
    M --> M2["Light meal: 6h"]
    M --> M3["Full meal: 8h"]

    style A fill:#4169E1,color:#fff
    style F4 fill:#FFA500,color:#000
    style J fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create an intraoperative hypotension management algorithm',
    output: `flowchart TD
    A["Hypotension\\nMAP <65 mmHg"] --> B{"Check Monitors"}

    B --> B1["Confirm arterial line\\ntransducer level"]
    B --> B2["Check EtCO2 and SpO2"]
    B --> B3["Review surgical field"]

    B1 & B2 & B3 --> C{"Anesthetic\\nDepth?"}

    C -->|"Too Deep"| D["Reduce Volatile/Propofol"]
    C -->|"Appropriate"| E{"Volume\\nStatus?"}

    D --> D1["Check BIS/MAC"]
    D1 --> E

    E -->|"Hypovolemic"| F["Fluid Challenge"]
    E -->|"Euvolemic"| G{"Assess SVR\\nand CO"}

    F --> F1["250-500 mL crystalloid"]
    F1 --> F2{"Response?"}
    F2 -->|Yes| H["Continue Monitoring"]
    F2 -->|No| G

    G --> G1{"Low SVR?"}
    G1 -->|Yes| I["Phenylephrine\\n50-100 mcg bolus"]
    G1 -->|No| J{"Low CO?"}

    J -->|Yes| K["Ephedrine 5-10mg\\nor Inotrope"]
    J -->|No| L["Reassess\\nDifferential"]

    I & K --> M{"Persistent?"}
    M -->|Yes| N["Vasopressor Infusion"]
    M -->|No| H

    N --> N1["Norepinephrine\\n0.02-0.1 mcg/kg/min"]
    N --> N2["Consider A-line if not placed"]
    N --> N3["Consider CVP/PA catheter"]

    L --> L1["Anaphylaxis?"]
    L --> L2["Cardiac event?"]
    L --> L3["Surgical bleeding?"]
    L --> L4["Tension pneumothorax?"]

    style A fill:#DC143C,color:#fff
    style N fill:#FF4500,color:#fff
    style H fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a LAST (local anesthetic systemic toxicity) treatment flowchart',
    output: `flowchart TD
    A[("Suspect LAST\\nCNS/CV Symptoms")] --> B["STOP LA Injection"]

    B --> C["Call for Help"]
    C --> C1["Get 20% Lipid Emulsion"]
    C --> C2["ACLS cart"]

    C1 & C2 --> D{"Seizures?"}
    D -->|Yes| E["Benzodiazepines"]
    E --> E1["Midazolam 2-4mg IV"]
    E1 --> E2["Avoid propofol if CV unstable"]

    D -->|No| F{"Cardiovascular\\nCollapse?"}
    E2 --> F

    F -->|Yes| G["LIPID EMULSION"]
    F -->|No| H["Monitor Closely"]

    G --> G1["20% Intralipid"]
    G1 --> G2["Bolus: 1.5 mL/kg over 1 min"]
    G2 --> G3["Infusion: 0.25 mL/kg/min"]

    G3 --> G4{"Hemodynamic\\nStability?"}
    G4 -->|No| G5["Repeat bolus x2"]
    G5 --> G6["Increase infusion to 0.5 mL/kg/min"]
    G6 --> G7["Max dose: 12 mL/kg"]
    G4 -->|Yes| I["Continue infusion 10 min"]

    F --> J["Modified ACLS"]
    J --> J1["Epinephrine <1 mcg/kg"]
    J --> J2["Avoid vasopressin"]
    J --> J3["Avoid calcium channel blockers"]
    J --> J4["Avoid beta-blockers"]

    I --> K["Post-event Care"]
    K --> K1["Monitor 4-6 hours minimum"]
    K --> K2["Serial labs"]
    K --> K3["Consider ICU"]
    K --> K4["Report to ASRA registry"]

    style A fill:#DC143C,color:#fff
    style G fill:#228B22,color:#fff
    style J fill:#FFA500,color:#000
    style K fill:#4169E1,color:#fff`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

const anesthesiologyPrompts = {
  ANESTHESIOLOGY_DOMAIN_PROMPT,
  ANESTHESIOLOGY_PROMPTS,
  ANESTHESIOLOGY_FEW_SHOT_EXAMPLES,
};
export default anesthesiologyPrompts;
