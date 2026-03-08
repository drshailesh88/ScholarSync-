/**
 * emergency-medicine-prompts.ts
 * Emergency Medicine-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for emergency medicine including:
 * - Trauma management and resuscitation
 * - Toxicology and poisoning flowcharts
 * - Environmental emergencies
 * - Shock management workflows
 * - ACLS/PALS algorithms
 * - Triage decision trees
 * - Critical care pathways
 *
 * Total: 22 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// EMERGENCY MEDICINE DOMAIN PROMPT
// =============================================================================

/**
 * Base emergency medicine domain prompt for critical care diagrams
 */
export const EMERGENCY_MEDICINE_DOMAIN_PROMPT = `
Emergency Medicine diagram requirements:
- Use ACLS/PALS/ATLS standardized terminology
- Follow AHA resuscitation guidelines (2020+)
- Include time-critical decision points with specific timeframes
- Use triage color coding (Red/Yellow/Green/Black) where applicable
- Reference NEXUS/Canadian C-spine rules for trauma
- Include GCS scoring and AVPU assessment where relevant
- Follow EMTALA guidelines for stabilization requirements
- Use color coding: Red for critical/life-threatening, Orange for urgent, Yellow for delayed
- Include medication dosing with weight-based calculations where appropriate
- Reference evidence-based scoring systems (HEART, Wells, PERC, Ottawa, etc.)
- Prioritize airway-breathing-circulation sequence in resuscitation workflows`;

// =============================================================================
// EMERGENCY MEDICINE-SPECIFIC PROMPTS
// =============================================================================

export const EMERGENCY_MEDICINE_PROMPTS = {
  // =========================================================================
  // TRAUMA MANAGEMENT
  // =========================================================================
  traumaSurvey: `
Trauma Primary/Secondary Survey requirements:
- Follow ATLS primary survey sequence (ABCDE)
- Include cervical spine precautions throughout
- Show life-threatening injury identification
- Reference FAST exam in circulation assessment
- Include GCS calculation and pupil assessment
- Show secondary survey head-to-toe approach
- Include LOG ROLL for posterior examination
- Reference adjuncts: ECG, foley, NG tube indications`,

  massivTransfusion: `
Massive Transfusion Protocol requirements:
- Include activation criteria (ABC score, SI, clinical judgment)
- Show 1:1:1 ratio for PRBC:FFP:Platelets
- Include TXA administration within 3 hours
- Reference TEG/ROTEM-guided resuscitation
- Include calcium replacement for citrate toxicity
- Show temperature management (hypothermia prevention)
- Include coagulation factor replacement criteria
- Reference MTP deactivation criteria`,

  traumaticBrainInjury: `
Traumatic Brain Injury Management requirements:
- Include GCS assessment and classification
- Show ICP management algorithm (CPP goals)
- Reference herniation syndrome recognition
- Include hyperosmolar therapy (mannitol vs hypertonic)
- Show surgical decompression indications
- Include seizure prophylaxis criteria
- Reference blood pressure targets (avoid hypotension)
- Show neurosurgical consultation triggers`,

  penetratingTrauma: `
Penetrating Trauma Algorithm requirements:
- Differentiate thoracic vs abdominal penetration
- Include box/zone assessment for neck injuries
- Show CXR and FAST in initial workup
- Reference OR vs angio vs observation criteria
- Include serial exam importance
- Show wound exploration indications
- Reference projectile trajectory assessment
- Include damage control surgery principles`,

  // =========================================================================
  // RESUSCITATION
  // =========================================================================
  cardiacArrest: `
Cardiac Arrest Management (ACLS) requirements:
- Follow AHA ACLS algorithm structure
- Include shockable vs non-shockable rhythm branch
- Show high-quality CPR metrics (rate, depth, recoil)
- Reference drug timing (Epi q3-5min, Amio for VF)
- Include H's and T's for reversible causes
- Show ROSC recognition and post-arrest care
- Reference ETCO2 for CPR quality monitoring
- Include team dynamics and pit crew model`,

  pediatricArrest: `
Pediatric Cardiac Arrest (PALS) requirements:
- Follow AHA PALS algorithm structure
- Include weight-based drug dosing (Broselow)
- Show pediatric shockable rhythm management
- Reference defibrillation energy: 2-4 J/kg
- Include IO access for vascular access
- Show bradycardia vs tachycardia pathways
- Reference neonatal-specific considerations
- Include family presence considerations`,

  sepsisSirs: `
Sepsis/Septic Shock Management requirements:
- Include qSOFA and SOFA scoring criteria
- Show 1-hour bundle: cultures, lactate, fluid, abx
- Reference 30 mL/kg crystalloid target
- Include vasopressor initiation (MAP <65)
- Show norepinephrine as first-line pressor
- Include source control timing
- Reference lactate clearance monitoring
- Show ICU disposition criteria`,

  anaphylaxis: `
Anaphylaxis Management requirements:
- Include recognition criteria (skin + respiratory/CV)
- Show epinephrine IM as first-line (0.3-0.5mg)
- Reference repeat epi dosing q5-15min
- Include positioning (supine, legs elevated)
- Show adjunct therapy (antihistamines, steroids)
- Include observation period (4-6h, biphasic risk)
- Reference glucagon for beta-blocker patients
- Show discharge planning with EpiPen prescription`,

  // =========================================================================
  // TOXICOLOGY
  // =========================================================================
  poisonedPatient: `
Poisoned Patient General Approach requirements:
- Include toxidrome recognition chart
- Show decontamination decision tree
- Reference activated charcoal indications/contraindications
- Include specific antidote administration
- Show enhanced elimination techniques
- Reference Poison Control consultation (1-800-222-1222)
- Include supportive care priorities
- Show disposition based on toxin half-life`,

  opioidOverdose: `
Opioid Overdose Management requirements:
- Include recognition (pinpoint pupils, RR depression)
- Show naloxone dosing pathway (0.4-2mg, repeat q2-3min)
- Reference high-dose naloxone for fentanyl
- Include airway management decision tree
- Show observation period (renarcotization risk)
- Reference harm reduction counseling
- Include MOUD (buprenorphine) initiation consideration
- Show discharge planning and Narcan prescription`,

  toxicAlcohol: `
Toxic Alcohol Ingestion requirements:
- Differentiate methanol vs ethylene glycol
- Include osmolar gap calculation
- Show anion gap metabolic acidosis workup
- Reference fomepizole vs ethanol antidote
- Include hemodialysis indications
- Show visual symptoms (methanol) vs renal (EG)
- Reference co-ingestion assessment
- Include supportive care (folate for methanol)`,

  acetaminophenOverdose: `
Acetaminophen Overdose requirements:
- Include Rumack-Matthew nomogram use
- Show NAC dosing protocol (IV vs PO)
- Reference time since ingestion importance
- Include LFT and INR monitoring
- Show King's College Criteria for transplant
- Reference extended-release product considerations
- Include repeat APAP level timing
- Show hepatology consultation triggers`,

  // =========================================================================
  // ENVIRONMENTAL EMERGENCIES
  // =========================================================================
  hypothermia: `
Hypothermia Management requirements:
- Include temperature classification (mild/moderate/severe)
- Show passive vs active rewarming selection
- Reference cardiac dysrhythmia management
- Include CPR modifications for severe hypothermia
- Show ECMO/bypass indications
- Reference avoid rough handling and vasopressors
- Include core temp monitoring locations
- Show "not dead until warm and dead" principle`,

  heatStroke: `
Heat Stroke Management requirements:
- Differentiate exertional vs classic heat stroke
- Include rapid cooling methods (ice immersion)
- Show target temp <39C within 30 minutes
- Reference coagulopathy and rhabdomyolysis
- Include neuro status monitoring
- Show cooling cessation at 38-38.5C
- Reference antipyretics NOT effective
- Include disposition and observation period`,

  drowning: `
Drowning Resuscitation requirements:
- Include rescue and removal from water safely
- Show airway/ventilation prioritization
- Reference 5 rescue breaths before CPR
- Include hypothermia co-management
- Show cervical spine considerations
- Reference aspiration pneumonitis management
- Include ECMO consideration for refractory arrest
- Show observation period for pulmonary edema`,

  envenomation: `
Envenomation Management requirements:
- Differentiate snake vs spider vs marine
- Include severity grading systems
- Show antivenom indications and administration
- Reference local wound care principles
- Include coagulopathy assessment
- Show pain management approach
- Reference Poison Control consultation
- Include observation and discharge criteria`,

  // =========================================================================
  // SHOCK STATES
  // =========================================================================
  undifferentiatedShock: `
Undifferentiated Shock Approach requirements:
- Include RUSH exam (rapid ultrasound for shock)
- Show four shock categories differentiation
- Reference lactate and ScvO2 interpretation
- Include fluid responsiveness assessment
- Show vasopressor selection by shock type
- Reference cardiogenic vs distributive findings
- Include POCUS findings for each type
- Show disposition and monitoring goals`,

  cardiogenicShock: `
Cardiogenic Shock Management requirements:
- Include SCAI staging for severity
- Show inotrope vs vasopressor selection
- Reference mechanical support indications (IABP, Impella)
- Include volume status optimization
- Show coronary reperfusion if STEMI
- Reference transfer to CS capable center
- Include hemodynamic monitoring targets
- Show diuresis approach in congested patient`,

  hemorrhagicShock: `
Hemorrhagic Shock Management requirements:
- Include shock class I-IV classification
- Show permissive hypotension target (SBP 80-90)
- Reference damage control resuscitation
- Include source identification and control
- Show blood product administration sequence
- Reference TXA within 3 hours
- Include OR vs IR decision pathway
- Show monitoring and resuscitation endpoints`,

  // =========================================================================
  // TRIAGE AND WORKFLOWS
  // =========================================================================
  triageDecision: `
Emergency Triage Decision Tree requirements:
- Include ESI (Emergency Severity Index) 5-level system
- Show resource prediction component
- Reference vital sign thresholds for each level
- Include pediatric-specific considerations
- Show mental health crisis assessment
- Reference under-triage dangers
- Include super-utilizer identification
- Show appropriate area assignment`,

  strokeAlert: `
Acute Stroke Alert requirements:
- Include NIHSS rapid assessment
- Show LKW (last known well) determination
- Reference CT head to tPA decision (<4.5h)
- Include blood pressure parameters
- Show EVT eligibility criteria (LVO)
- Reference door-to-needle time targets (<60min)
- Include hemorrhage exclusion
- Show post-tPA monitoring protocol`,

  stemiAlert: `
STEMI Alert Activation requirements:
- Include ECG STEMI recognition criteria
- Show door-to-balloon time targets (<90min)
- Reference PCI vs fibrinolysis decision
- Include antiplatelet loading protocol
- Show cath lab activation process
- Reference cardiogenic shock recognition
- Include mechanical complication assessment
- Show post-PCI care pathway`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Emergency Medicine-specific few-shot examples
 */
export const EMERGENCY_MEDICINE_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create an ACLS algorithm flowchart for cardiac arrest',
    output: `flowchart TD
    A[("Cardiac Arrest")] --> B["Start CPR\\n100-120/min, 2in depth"]
    B --> C["Attach Defibrillator"]
    C --> D{"Rhythm\\nCheck"}

    D -->|"VF/pVT"| E["SHOCK"]
    D -->|"Asystole/PEA"| F["Continue CPR"]

    E --> G["CPR 2 min"]
    G --> H["Epinephrine\\nq3-5 min"]
    H --> I{"Rhythm\\nCheck"}

    I -->|"VF/pVT"| J["SHOCK"]
    I -->|"Asystole/PEA"| K["CPR + Epi"]
    I -->|"Organized"| L{"Pulse?"}

    J --> M["CPR 2 min"]
    M --> N["Amiodarone\\n300mg then 150mg"]

    F --> O["Epinephrine\\nq3-5 min"]
    O --> P["CPR 2 min"]
    P --> Q{"Rhythm\\nCheck"}

    L -->|"Yes"| R["ROSC!\\nPost-Arrest Care"]
    L -->|"No"| D

    style E fill:#DC143C,color:#fff
    style J fill:#DC143C,color:#fff
    style R fill:#228B22,color:#fff
    style A fill:#8B0000,color:#fff`,
  },
  {
    prompt: 'Create a trauma primary survey flowchart',
    output: `flowchart TD
    A[("Trauma Patient")] --> B["A: Airway\\n+ C-spine"]

    B --> C{"Airway\\nPatent?"}
    C -->|"No"| D["Jaw thrust\\nSuction\\nIntubation"]
    C -->|"Yes"| E["B: Breathing"]

    D --> E
    E --> F{"Breath Sounds\\nSymmetric?"}
    F -->|"No/Decreased"| G["Needle Decompression\\nor Chest Tube"]
    F -->|"Yes"| H["C: Circulation"]

    G --> H
    H --> I["2 Large Bore IVs\\nFAST Exam"]
    I --> J{"Hemodynamically\\nStable?"}

    J -->|"No"| K["Massive Transfusion\\nOR if indicated"]
    J -->|"Yes"| L["D: Disability"]

    K --> L
    L --> M["GCS + Pupils"]
    M --> N{"GCS < 8?"}
    N -->|"Yes"| O["Intubate for\\nAirway Protection"]
    N -->|"No"| P["E: Exposure"]

    O --> P
    P --> Q["Log Roll\\nPrevent Hypothermia"]
    Q --> R["Secondary Survey"]

    style A fill:#DC143C,color:#fff
    style D fill:#FFA500,color:#000
    style G fill:#FFA500,color:#000
    style K fill:#DC143C,color:#fff`,
  },
  {
    prompt: 'Create a sepsis management flowchart',
    output: `flowchart TD
    A[("Suspected Sepsis")] --> B["qSOFA Score"]

    B --> C{"qSOFA >= 2?\\nRR>22, SBP<100, AMS"}
    C -->|"Yes"| D["Sepsis Likely"]
    C -->|"No"| E["Monitor\\nReassess"]

    D --> F["Hour-1 Bundle"]

    subgraph Bundle["1-Hour Bundle"]
        G["Lactate"]
        H["Blood Cultures"]
        I["Broad Abx"]
        J["30mL/kg Crystalloid"]
    end

    F --> G
    F --> H
    F --> I
    F --> J

    G --> K{"Lactate > 4\\nor MAP < 65?"}
    K -->|"Yes"| L["Septic Shock"]
    K -->|"No"| M["Reassess q4h"]

    L --> N["Vasopressors\\nNorepinephrine 1st"]
    N --> O{"MAP\\n>= 65?"}

    O -->|"No"| P["Add Vasopressin\\nor Epinephrine"]
    O -->|"Yes"| Q["ICU Admission"]

    P --> Q
    M --> R["Ward vs ICU\\nbased on response"]

    style A fill:#FFA500,color:#000
    style L fill:#DC143C,color:#fff
    style Q fill:#4169E1,color:#fff
    style I fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create an opioid overdose management flowchart',
    output: `flowchart TD
    A[("Opioid Overdose\\nSuspected")] --> B{"Responsive?"}

    B -->|"No"| C["Check Breathing\\n+ Pulse"]
    B -->|"Yes"| D["Supportive Care\\nMonitor"]

    C --> E{"Breathing\\nAdequately?"}
    E -->|"No"| F["Open Airway\\nBag-Mask Ventilate"]
    E -->|"Yes"| G["Recovery Position"]

    F --> H["Naloxone 0.4-2mg\\nIM/IV/IN"]
    G --> H

    H --> I{"Response\\nin 2-3 min?"}
    I -->|"No"| J["Repeat Naloxone\\nUp to 10mg total"]
    I -->|"Yes"| K["Monitor for\\nRenarcotization"]

    J --> L{"Still No\\nResponse?"}
    L -->|"Yes"| M["Consider:\\nOther Causes\\nHigher Doses\\nIntubation"]
    L -->|"No"| K

    K --> N["Observe 4-6h\\nmin"]
    N --> O{"Stable?"}
    O -->|"Yes"| P["Discharge with:\\n- Narcan Rx\\n- Resources\\n- Harm Reduction"]
    O -->|"No"| Q["Extended Observation\\nor Admission"]

    style A fill:#DC143C,color:#fff
    style H fill:#228B22,color:#fff
    style J fill:#FFA500,color:#000
    style P fill:#4169E1,color:#fff`,
  },
  {
    prompt: 'Create an emergency triage decision tree',
    output: `flowchart TD
    A[("Patient\\nArrival")] --> B{"Requires\\nImmediate\\nIntervention?"}

    B -->|"Yes"| C["ESI Level 1\\nImmediate"]
    B -->|"No"| D{"High-Risk\\nSituation?"}

    D -->|"Yes"| E["ESI Level 2\\nEmergent"]
    D -->|"No"| F{"Resources\\nNeeded?"}

    F -->|"None"| G["ESI Level 5\\nNon-Urgent"]
    F -->|"One"| H["ESI Level 4\\nLess Urgent"]
    F -->|"Many"| I{"Vital Signs\\nDanger Zone?"}

    I -->|"Yes"| E
    I -->|"No"| J["ESI Level 3\\nUrgent"]

    subgraph Examples["Examples"]
        C1["Cardiac Arrest\\nSevere Respiratory Distress"]
        C2["Chest Pain\\nStroke Symptoms\\nSepsis"]
        C3["Abdominal Pain\\nLacerations"]
        C4["Sore Throat\\nSimple Injury"]
        C5["Rx Refill\\nStable Recheck"]
    end

    C --- C1
    E --- C2
    J --- C3
    H --- C4
    G --- C5

    style C fill:#DC143C,color:#fff
    style E fill:#FF4500,color:#fff
    style J fill:#FFD700,color:#000
    style H fill:#228B22,color:#fff
    style G fill:#4169E1,color:#fff`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

const emergencyMedicinePrompts = {
  EMERGENCY_MEDICINE_DOMAIN_PROMPT,
  EMERGENCY_MEDICINE_PROMPTS,
  EMERGENCY_MEDICINE_FEW_SHOT_EXAMPLES,
};
export default emergencyMedicinePrompts;
