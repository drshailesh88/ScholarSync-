/**
 * cardiology-prompts.ts
 * Cardiology-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for cardiovascular medicine including:
 * - ECG interpretation and rhythm analysis
 * - Cardiac catheterization procedures
 * - Heart failure management pathways
 * - Arrhythmia decision trees
 * - ACS/STEMI protocols
 * - Valvular heart disease evaluation
 * - Congenital heart disease assessment
 * - Pacemaker/ICD indications
 * - Hypertension management
 * - Lipid management pathways
 * - Cardiac imaging interpretation
 * - Preventive cardiology
 *
 * Total: 24 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// CARDIOLOGY DOMAIN PROMPT
// =============================================================================

/**
 * Base cardiology domain prompt for cardiovascular medicine diagrams
 */
export const CARDIOLOGY_DOMAIN_PROMPT = `
Cardiology diagram requirements:
- Use AHA/ACC guideline-based terminology and classifications
- Follow standard ECG interpretation conventions (rate, rhythm, axis, intervals)
- Include NYHA functional class and ACC/AHA heart failure staging
- Reference appropriate risk stratification scores (HEART, TIMI, GRACE, CHA2DS2-VASc)
- Use color coding: Arterial (Red), Venous (Blue), Conduction system (Yellow), Ischemic (Purple)
- Include hemodynamic parameters with normal ranges where applicable
- Follow door-to-balloon and door-to-needle time standards for ACS
- Reference evidence-based Class I/IIa/IIb/III recommendations
- Include medication dosing with appropriate contraindications
- Use standard cardiac anatomy orientation (anterior, lateral, inferior, septal)
- Reference echocardiographic parameters (EF, GLS, valve areas, gradients)`;

// =============================================================================
// CARDIOLOGY-SPECIFIC PROMPTS
// =============================================================================

export const CARDIOLOGY_PROMPTS = {
  // =========================================================================
  // ECG INTERPRETATION
  // =========================================================================
  ecgSystematicApproach: `
ECG Systematic Interpretation requirements:
- Include rate calculation methods (300/150/100/75/60/50 rule)
- Show rhythm assessment (regular vs irregular, P wave morphology)
- Reference axis determination (normal, LAD, RAD, extreme)
- Include interval analysis (PR, QRS, QT/QTc with Bazett formula)
- Show wave morphology assessment (P, QRS, ST, T, U waves)
- Reference chamber enlargement criteria (LAE, RAE, LVH, RVH)
- Include bundle branch block differentiation (RBBB vs LBBB)
- Show ischemia/infarct patterns by coronary territory`,

  stemiRecognition: `
STEMI ECG Recognition requirements:
- Include ST elevation criteria (>1mm limb leads, >2mm precordial)
- Show territory localization (anterior, lateral, inferior, posterior, RV)
- Reference STEMI equivalents (de Winter, Wellens, sgarbossa)
- Include reciprocal changes interpretation
- Show new LBBB with Sgarbossa criteria
- Reference posterior MI recognition (ST depression V1-V3)
- Include RV infarct recognition (ST elevation V4R)
- Show LAD vs LCx vs RCA culprit vessel patterns`,

  arrhythmiaEcg: `
Arrhythmia ECG Interpretation requirements:
- Differentiate narrow vs wide complex tachycardias
- Include SVT types (AVNRT, AVRT, AT, AFL, AF)
- Show VT vs SVT with aberrancy differentiation (Brugada criteria)
- Reference bradyarrhythmia classification (sinus, AV block degrees)
- Include preexcitation pattern recognition (WPW, delta wave)
- Show heart block progression (1st, 2nd type I/II, 3rd degree)
- Reference pause classification (sinus arrest vs SA block)
- Include pacemaker rhythm recognition and malfunction patterns`,

  // =========================================================================
  // ACUTE CORONARY SYNDROMES
  // =========================================================================
  acsAlgorithm: `
ACS Evaluation Algorithm requirements:
- Include HEART score calculation and risk stratification
- Show STEMI vs NSTEMI vs UA differentiation
- Reference troponin interpretation (rise/fall kinetics)
- Include initial antiplatelet/anticoagulation selection
- Show invasive vs conservative strategy decision
- Reference PCI vs CABG selection criteria
- Include timing of catheterization (immediate, early, delayed)
- Show DAPT duration recommendations`,

  stemiManagement: `
STEMI Management Protocol requirements:
- Include door-to-balloon time targets (<90 min, <120 if transfer)
- Show primary PCI pathway with cath lab activation
- Reference fibrinolytic therapy when PCI unavailable (<12h, ideally <2h)
- Include antiplatelet loading (ASA + P2Y12 inhibitor)
- Show anticoagulation selection (UFH, bivalirudin, enoxaparin)
- Reference cardiogenic shock management (IABP, Impella, ECMO)
- Include mechanical complication recognition
- Show post-MI care pathway and secondary prevention`,

  nstemiRiskStratification: `
NSTEMI Risk Stratification requirements:
- Include TIMI and GRACE score calculation
- Show very high-risk criteria (hemodynamic instability, refractory angina)
- Reference high-risk criteria (GRACE >140, troponin rise)
- Include intermediate and low-risk pathway
- Show timing of invasive strategy by risk category
- Reference bleeding risk assessment (CRUSADE, PRECISE-DAPT)
- Include ischemia-guided vs routine invasive approach
- Show discharge planning and follow-up`,

  // =========================================================================
  // HEART FAILURE
  // =========================================================================
  heartFailureClassification: `
Heart Failure Classification requirements:
- Include ACC/AHA stages (A, B, C, D) definitions
- Show NYHA functional class (I-IV) assessment
- Reference HFrEF vs HFmrEF vs HFpEF differentiation (EF cutoffs)
- Include etiology classification (ischemic vs nonischemic)
- Show precipitating factors identification
- Reference biomarker interpretation (BNP, NT-proBNP thresholds)
- Include congestion vs perfusion assessment (warm/cold, wet/dry)
- Show prognosis estimation tools`,

  hfrefManagement: `
HFrEF Management Algorithm requirements:
- Include foundational GDMT (ACEi/ARB/ARNI, beta-blocker, MRA, SGLT2i)
- Show titration to target doses pathway
- Reference device therapy indications (ICD, CRT)
- Include diuretic management for congestion
- Show advanced therapies criteria (LVAD, transplant)
- Reference iron deficiency assessment and treatment
- Include hydralazine/nitrate for specific populations
- Show medication contraindications and alternatives`,

  acuteDecompensatedHf: `
Acute Decompensated Heart Failure requirements:
- Include presentation phenotypes (wet/dry, warm/cold)
- Show diuretic dosing strategy (IV loop diuretics)
- Reference inotrope/vasopressor selection by profile
- Include vasodilator therapy indications
- Show ultrafiltration consideration
- Reference mechanical circulatory support escalation
- Include precipitant identification and treatment
- Show transition to oral therapy and discharge criteria`,

  // =========================================================================
  // ARRHYTHMIA MANAGEMENT
  // =========================================================================
  atrialFibrillation: `
Atrial Fibrillation Management requirements:
- Include CHA2DS2-VASc score calculation and anticoagulation threshold
- Show rate vs rhythm control strategy decision
- Reference cardioversion pathway (pharmacologic vs electrical)
- Include rate control agents by clinical scenario
- Show antiarrhythmic drug selection for rhythm control
- Reference catheter ablation indications
- Include HAS-BLED bleeding risk assessment
- Show DOAC vs warfarin selection`,

  ventricularArrhythmia: `
Ventricular Arrhythmia Management requirements:
- Differentiate stable vs unstable VT
- Include cardioversion/defibrillation energy protocols
- Show antiarrhythmic selection for VT (amiodarone, lidocaine, procainamide)
- Reference ICD indications (primary vs secondary prevention)
- Include PVC burden assessment and treatment threshold
- Show VT ablation indications
- Reference Brugada, ARVC, LQTS management
- Include reversible cause identification`,

  bradyarrhythmia: `
Bradyarrhythmia and Conduction Disease requirements:
- Include symptomatic vs asymptomatic assessment
- Show chronotropic incompetence evaluation
- Reference atropine vs pacing for acute management
- Include pacemaker indication criteria by ACC/AHA
- Show pacemaker mode selection (single vs dual vs CRT)
- Reference medication review (beta-blockers, CCBs, digoxin)
- Include reversible cause identification
- Show temporary pacing bridge approach`,

  // =========================================================================
  // CARDIAC CATHETERIZATION
  // =========================================================================
  diagnosticCath: `
Diagnostic Cardiac Catheterization requirements:
- Include vascular access approach selection (radial vs femoral)
- Show coronary anatomy visualization and dominance
- Reference stenosis severity assessment (visual, FFR, iFR)
- Include hemodynamic measurements (pressures, cardiac output)
- Show ventriculography interpretation (EF, wall motion)
- Reference complication recognition and management
- Include contrast nephropathy prevention
- Show post-procedure care pathway`,

  pciDecision: `
PCI Decision-Making Algorithm requirements:
- Include anatomic complexity assessment (SYNTAX score)
- Show clinical presentation influence on revascularization
- Reference FFR/iFR guidance for intermediate lesions
- Include PCI vs CABG selection criteria
- Show multidisciplinary heart team indications
- Reference high-risk PCI planning (MCS support)
- Include complete vs culprit-only revascularization
- Show antiplatelet therapy duration post-PCI`,

  rightHeartCath: `
Right Heart Catheterization requirements:
- Include hemodynamic parameter measurement sequence
- Show normal values for RA, RV, PA, PCWP pressures
- Reference cardiac output calculation (Fick vs thermodilution)
- Include PVR and SVR calculation
- Show pulmonary hypertension classification by findings
- Reference shunt detection and calculation
- Include constrictive vs restrictive differentiation
- Show vasoreactivity testing protocol`,

  // =========================================================================
  // VALVULAR HEART DISEASE
  // =========================================================================
  aorticStenosis: `
Aortic Stenosis Evaluation requirements:
- Include severity criteria (mild, moderate, severe by AVA, gradient, velocity)
- Show symptom assessment (angina, syncope, heart failure)
- Reference low-flow, low-gradient AS evaluation
- Include dobutamine stress echo role
- Show TAVR vs SAVR selection criteria
- Reference STS/PROM risk score calculation
- Include imaging modalities (TTE, TEE, CT)
- Show follow-up surveillance intervals`,

  mitralRegurgitation: `
Mitral Regurgitation Evaluation requirements:
- Include severity grading (mild, moderate, severe)
- Differentiate primary vs secondary (functional) MR
- Show PISA method and vena contracta measurement
- Reference surgical indications (symptoms, EF, LV dimensions)
- Include MitraClip/TEER candidacy criteria
- Show guideline-based intervention thresholds
- Reference LA and LV size monitoring
- Include atrial fibrillation management with MR`,

  // =========================================================================
  // CONGENITAL HEART DISEASE
  // =========================================================================
  adultCongenitalHeart: `
Adult Congenital Heart Disease requirements:
- Include common lesions in adults (ASD, VSD, TOF repair, coarctation)
- Show Eisenmenger syndrome recognition
- Reference shunt calculation (Qp:Qs)
- Include pregnancy risk stratification (WHO classification)
- Show endocarditis prophylaxis indications
- Reference exercise and activity recommendations
- Include transition of care considerations
- Show specialized ACHD center referral criteria`,

  asdVsdEvaluation: `
Atrial and Ventricular Septal Defect requirements:
- Include anatomic classification (ASD: secundum, primum, sinus venosus; VSD: perimembranous, muscular)
- Show hemodynamic significance assessment
- Reference Qp:Qs calculation and shunt quantification
- Include RV volume overload signs (ASD)
- Show closure indications and contraindications
- Reference device vs surgical closure selection
- Include Eisenmenger syndrome exclusion
- Show follow-up and surveillance`,

  // =========================================================================
  // DEVICE THERAPY
  // =========================================================================
  icdIndications: `
ICD Indication Algorithm requirements:
- Include primary prevention criteria (EF-based)
- Show secondary prevention indications (survived SCD, sustained VT)
- Reference 40-day post-MI waiting period
- Include CRT-D vs ICD selection (QRS duration, LBBB)
- Show subcutaneous vs transvenous ICD selection
- Reference shared decision-making elements
- Include expected benefit and complication discussion
- Show device follow-up schedule`,

  pacemakerIndications: `
Pacemaker Indication Algorithm requirements:
- Include Class I indications by ACC/AHA/HRS
- Show sinus node dysfunction criteria
- Reference AV block indications by type
- Include carotid sinus hypersensitivity
- Show post-ablation pacing needs
- Reference leadless pacemaker candidacy
- Include CRT indication criteria (wide QRS + HF)
- Show mode selection (VVI, DDD, CRT)`,

  // =========================================================================
  // HYPERTENSION & PREVENTION
  // =========================================================================
  hypertensionManagement: `
Hypertension Management Algorithm requirements:
- Include BP classification (normal, elevated, Stage 1, Stage 2)
- Show ASCVD risk-based treatment threshold
- Reference first-line agent selection (ACEi, ARB, CCB, thiazide)
- Include compelling indications for specific drugs
- Show combination therapy approach
- Reference resistant hypertension workup
- Include secondary hypertension screening criteria
- Show BP target selection by comorbidity`,

  lipidManagement: `
Lipid Management Pathway requirements:
- Include ASCVD risk categories (very high, high, intermediate, low)
- Show statin intensity selection by risk
- Reference LDL-C targets by risk category
- Include non-statin therapies (ezetimibe, PCSK9i, bempedoic acid)
- Show statin intolerance management
- Reference triglyceride management (fibrates, omega-3)
- Include familial hypercholesterolemia recognition
- Show monitoring intervals and safety labs`,

  ascvdPrevention: `
ASCVD Prevention Strategy requirements:
- Include 10-year ASCVD risk calculation (PCE)
- Show risk-enhancing factors assessment
- Reference coronary calcium score role in decision-making
- Include lifestyle modification recommendations
- Show aspirin for primary prevention criteria
- Reference diabetes management for CV risk reduction
- Include smoking cessation resources
- Show comprehensive risk factor management`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Cardiology-specific few-shot examples
 */
export const CARDIOLOGY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create an ACS evaluation algorithm with STEMI pathway',
    output: `flowchart TD
    A[("Chest Pain\\nSuspected ACS")] --> B["12-Lead ECG\\n< 10 minutes"]
    B --> C{"ST Elevation\\n>1mm?"}

    C -->|"Yes"| D["STEMI"]
    C -->|"No"| E["Troponin +\\nSerial ECGs"]

    D --> F["Activate Cath Lab"]
    F --> G{"PCI-Capable\\nFacility?"}

    G -->|"Yes"| H["Primary PCI\\nGoal: D2B <90min"]
    G -->|"No"| I{"Transfer Time\\n<120 min?"}

    I -->|"Yes"| J["Transfer for PCI"]
    I -->|"No"| K["Fibrinolysis\\nThen Transfer"]

    E --> L{"Troponin\\nElevated?"}
    L -->|"Yes"| M["NSTEMI"]
    L -->|"No"| N["HEART Score"]

    M --> O["Risk Stratify\\nGRACE/TIMI"]
    O --> P{"Very High\\nRisk?"}

    P -->|"Yes"| Q["Urgent Cath\\n<2 hours"]
    P -->|"No"| R["Early Invasive\\n<24-72 hours"]

    N --> S{"Score\\n0-3?"}
    S -->|"Yes"| T["Discharge\\nOutpatient F/U"]
    S -->|"No"| U["Admit\\nStress Test or Cath"]

    style D fill:#DC143C,color:#fff
    style M fill:#FF4500,color:#fff
    style H fill:#228B22,color:#fff
    style Q fill:#FFA500,color:#000`,
  },
  {
    prompt: 'Create an atrial fibrillation management decision tree',
    output: `flowchart TD
    A[("Atrial\\nFibrillation")] --> B["CHA2DS2-VASc\\nScore"]

    B --> C{"Score\\n>=2 Men\\n>=3 Women"}
    C -->|"Yes"| D["Anticoagulation\\nIndicated"]
    C -->|"No"| E{"Score = 1?"}

    E -->|"Yes"| F["Consider AC\\nShared Decision"]
    E -->|"No"| G["No AC\\nNeeded"]

    D --> H{"DOAC\\nEligible?"}
    H -->|"Yes"| I["DOAC Preferred\\n(Apixaban, Rivaroxaban,\\nDabigatran, Edoxaban)"]
    H -->|"No"| J["Warfarin\\nGoal INR 2-3"]

    A --> K["Rate vs Rhythm\\nControl Decision"]

    K --> L{"Symptoms\\nSevere?"}
    L -->|"Yes"| M["Rhythm Control\\nStrategy"]
    L -->|"No"| N["Rate Control\\nFirst-Line"]

    N --> O{"Heart Failure\\nwith Reduced EF?"}
    O -->|"Yes"| P["Beta-Blocker\\nor Digoxin"]
    O -->|"No"| Q["Beta-Blocker\\nor CCB (diltiazem)"]

    M --> R["Cardioversion\\nor Ablation"]
    R --> S{"Duration\\n>48h or Unknown?"}
    S -->|"Yes"| T["TEE or 3-week\\nAC before CV"]
    S -->|"No"| U["DC Cardioversion\\n+ 4-week AC after"]

    style D fill:#DC143C,color:#fff
    style I fill:#228B22,color:#fff
    style M fill:#4169E1,color:#fff`,
  },
  {
    prompt: 'Create a heart failure with reduced EF treatment algorithm',
    output: `flowchart TD
    A[("HFrEF\\nEF <= 40%")] --> B["Foundational\\nGDMT"]

    subgraph GDMT["Guideline-Directed Medical Therapy"]
        C["ACEi/ARB/ARNI"]
        D["Beta-Blocker\\n(Carvedilol, Metoprolol, Bisoprolol)"]
        E["MRA\\n(Spironolactone, Eplerenone)"]
        F["SGLT2i\\n(Dapagliflozin, Empagliflozin)"]
    end

    B --> C
    B --> D
    B --> E
    B --> F

    C --> G["Titrate to\\nTarget Doses"]
    D --> G
    E --> G
    F --> G

    G --> H{"EF Still\\n<= 35%?"}

    H -->|"Yes"| I{"QRS >= 150ms\\n+ LBBB?"}
    I -->|"Yes"| J["CRT-D"]
    I -->|"No"| K{"NYHA II-III\\n+ EF <= 35%?"}

    K -->|"Yes"| L["ICD\\nPrimary Prevention"]
    K -->|"No"| M["Optimize GDMT\\nReassess"]

    H -->|"No"| N["Continue GDMT\\nMonitor"]

    A --> O{"Volume\\nOverloaded?"}
    O -->|"Yes"| P["Loop Diuretics\\nFluid Restriction"]

    A --> Q{"NYHA III-IV\\nDespite GDMT?"}
    Q -->|"Yes"| R["Advanced HF\\nReferral"]
    R --> S["LVAD or\\nTransplant Evaluation"]

    style A fill:#DC143C,color:#fff
    style J fill:#4169E1,color:#fff
    style L fill:#4169E1,color:#fff
    style S fill:#9932CC,color:#fff`,
  },
  {
    prompt: 'Create a systematic ECG interpretation flowchart',
    output: `flowchart TD
    A["12-Lead ECG"] --> B["1. RATE"]
    A --> C["2. RHYTHM"]
    A --> D["3. AXIS"]
    A --> E["4. INTERVALS"]
    A --> F["5. WAVEFORMS"]
    A --> G["6. ISCHEMIA"]

    B --> B1["Regular: 300/RR boxes\\n(300/150/100/75/60/50)"]
    B --> B2["Irregular: 6-second strip x10"]

    C --> C1["P waves present?"]
    C --> C2["P:QRS relationship"]
    C --> C3["Regular or Irregular?"]

    D --> D1["Lead I +, aVF +\\n= Normal"]
    D --> D2["Lead I +, aVF -\\n= LAD"]
    D --> D3["Lead I -, aVF +\\n= RAD"]

    E --> E1["PR: 120-200ms"]
    E --> E2["QRS: <120ms"]
    E --> E3["QTc: <450ms M, <460ms F"]

    subgraph Intervals["Interval Abnormalities"]
        E4["Long PR = AV Block"]
        E5["Short PR = WPW"]
        E6["Wide QRS = BBB or VT"]
        E7["Long QT = Risk TdP"]
    end

    E1 --> E4
    E1 --> E5
    E2 --> E6
    E3 --> E7

    F --> F1["P wave: <2.5mm, <120ms"]
    F --> F2["QRS: R progression V1-V6"]
    F --> F3["T wave: concordant with QRS"]

    G --> G1{"ST Elevation?"}
    G1 -->|"Yes"| G2["STEMI by Territory"]
    G1 -->|"No"| G3{"ST Depression\\nor T Inversion?"}
    G3 -->|"Yes"| G4["Ischemia/NSTEMI"]
    G3 -->|"No"| G5["Reassess Clinically"]

    subgraph Territory["STEMI Territory"]
        T1["V1-V4 = Anterior (LAD)"]
        T2["I, aVL, V5-V6 = Lateral (LCx)"]
        T3["II, III, aVF = Inferior (RCA)"]
    end

    G2 --> T1
    G2 --> T2
    G2 --> T3

    style G2 fill:#DC143C,color:#fff
    style G4 fill:#FFA500,color:#000`,
  },
  {
    prompt: 'Create a hypertension management algorithm',
    output: `flowchart TD
    A[("Elevated BP\\nConfirmed")] --> B["Classify Severity"]

    B --> C{"SBP 120-129\\nDBP <80"}
    B --> D{"SBP 130-139\\nor DBP 80-89"}
    B --> E{"SBP >= 140\\nor DBP >= 90"}

    C --> F["Elevated BP\\nLifestyle Only"]
    D --> G["Stage 1 HTN"]
    E --> H["Stage 2 HTN"]

    G --> I{"10-yr ASCVD\\nRisk >= 10%?"}
    I -->|"Yes"| J["Start Medication\\n+ Lifestyle"]
    I -->|"No"| K["Lifestyle x3-6 mo\\nThen Reassess"]

    H --> L["Start Medication\\n+ Lifestyle"]

    J --> M["First-Line Agent"]
    L --> M

    subgraph FirstLine["First-Line Options"]
        M1["ACEi or ARB"]
        M2["CCB (Amlodipine)"]
        M3["Thiazide Diuretic"]
    end

    M --> M1
    M --> M2
    M --> M3

    M --> N{"BP at Goal?\\n<130/80 most patients"}
    N -->|"Yes"| O["Maintain Therapy\\nMonitor q3-6mo"]
    N -->|"No"| P["Add 2nd Agent\\nDifferent Class"]

    P --> Q{"BP at Goal?"}
    Q -->|"Yes"| O
    Q -->|"No"| R["Add 3rd Agent\\nConsider MRA"]

    R --> S{"Still Uncontrolled?"}
    S -->|"Yes"| T["Resistant HTN\\nSecondary Workup"]

    subgraph Secondary["Secondary Causes"]
        T1["Primary Aldosteronism"]
        T2["Renal Artery Stenosis"]
        T3["Pheochromocytoma"]
        T4["Cushing Syndrome"]
        T5["OSA"]
    end

    T --> T1
    T --> T2
    T --> T3
    T --> T4
    T --> T5

    style H fill:#DC143C,color:#fff
    style J fill:#228B22,color:#fff
    style T fill:#FFA500,color:#000`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

export default {
  CARDIOLOGY_DOMAIN_PROMPT,
  CARDIOLOGY_PROMPTS,
  CARDIOLOGY_FEW_SHOT_EXAMPLES,
};
