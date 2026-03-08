/**
 * obgyn-prompts.ts
 * OB/GYN-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for obstetrics and gynecology including:
 * - Labor and delivery algorithms
 * - Prenatal care flowcharts
 * - Fetal monitoring interpretation
 * - Gynecologic cancer screening
 * - Menstrual disorders management
 * - Contraception decision trees
 * - Infertility workup pathways
 * - Menopause management
 * - Cesarean section indications
 * - High-risk pregnancy protocols
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// OB/GYN DOMAIN PROMPT
// =============================================================================

/**
 * Base OB/GYN domain prompt for obstetric and gynecologic diagrams
 */
export const OBGYN_DOMAIN_PROMPT = `
OB/GYN diagram requirements:
- Use standard obstetric terminology (G/P notation, EGA, EDD, AFI, BPP)
- Follow ACOG (American College of OB/GYN) guidelines and recommendations
- Reference WHO classifications where applicable
- Include proper gestational age notation (weeks+days format)
- Use standard fetal heart rate patterns (Category I, II, III)
- Follow NICHD nomenclature for FHR interpretation
- Reference Bishop score for cervical assessment
- Include proper staging for gynecologic cancers (FIGO staging)
- Use color coding: Normal findings (Green), Concerning (Yellow), Emergency (Red)
- Include evidence-based intervention thresholds and timing`;

// =============================================================================
// OB/GYN-SPECIFIC PROMPTS
// =============================================================================

export const OBGYN_PROMPTS = {
  // Labor and Delivery
  laborManagement: `
Labor Management Algorithm requirements:
- Include admission criteria and assessment
- Reference Friedman curve and labor progress expectations
- Differentiate latent phase (<6cm) from active phase (6-10cm)
- Include protraction and arrest disorder definitions
- Show oxytocin augmentation indications
- Reference ACOG labor dystocia criteria
- Include maternal and fetal monitoring parameters
- Show decision points for operative delivery`,

  deliveryDecision: `
Delivery Decision Algorithm requirements:
- Include fetal presentation assessment
- Reference Bishop score interpretation
- Show induction vs expectant management decision points
- Include gestational age thresholds for intervention
- Reference ARRIVE trial findings (39-week induction)
- Show spontaneous vs indicated delivery pathways
- Include contraindications to vaginal delivery
- Reference timing for various pregnancy complications`,

  shoulderDystocia: `
Shoulder Dystocia Management requirements:
- Use HELPERR mnemonic pathway
- Include time-critical documentation
- Show McRoberts maneuver as first-line
- Include suprapubic pressure technique
- Reference rotational maneuvers (Woods, Rubin)
- Show delivery of posterior arm technique
- Include Zavanelli maneuver as last resort
- Reference neonatal assessment and documentation`,

  postpartumHemorrhage: `
Postpartum Hemorrhage Management requirements:
- Use 4 T's framework (Tone, Trauma, Tissue, Thrombin)
- Include quantified blood loss thresholds (>500ml vaginal, >1000ml cesarean)
- Show staged intervention approach
- Reference uterotonic medication dosing
- Include surgical intervention indications
- Show massive transfusion protocol activation criteria
- Reference balloon tamponade indications
- Include hysterectomy decision threshold`,

  // Prenatal Care
  prenatalCareTimeline: `
Prenatal Care Timeline requirements:
- Include visit schedule by trimester
- Show first trimester screening (11-14 weeks)
- Reference anatomy scan timing (18-22 weeks)
- Include GBS screening (36-37 weeks)
- Show growth ultrasound indications
- Reference ACOG recommended testing schedule
- Include patient education milestones
- Show warning signs education timing`,

  prenatalScreening: `
Prenatal Screening Algorithm requirements:
- Differentiate screening from diagnostic testing
- Include cfDNA/NIPT indications and limitations
- Reference first trimester combined screening
- Show quad screen interpretation
- Include nuchal translucency measurement criteria
- Reference diagnostic options (CVS, amniocentesis)
- Show counseling decision points
- Include follow-up testing pathways`,

  gestationalDiabetes: `
Gestational Diabetes Management requirements:
- Include screening criteria (24-28 weeks)
- Reference diagnostic thresholds (Carpenter-Coustan or IADPSG)
- Show diet and exercise first-line management
- Include glucose monitoring targets
- Reference insulin initiation criteria
- Show fetal surveillance schedule
- Include delivery timing recommendations
- Reference postpartum glucose testing`,

  preeclampsia: `
Preeclampsia Management requirements:
- Include diagnostic criteria (BP >140/90 + proteinuria or end-organ)
- Reference severe features checklist
- Show expectant management criteria (without severe features)
- Include magnesium sulfate indications
- Reference antihypertensive thresholds (BP >160/110)
- Show delivery timing by gestational age
- Include postpartum monitoring requirements
- Reference HELLP syndrome criteria`,

  // Fetal Monitoring
  fetalHeartRateInterpretation: `
Fetal Heart Rate Interpretation requirements:
- Use NICHD three-tier classification system
- Include Category I (Normal) criteria
- Show Category II (Indeterminate) features
- Reference Category III (Abnormal) patterns
- Include baseline, variability, accelerations, decelerations
- Show deceleration types (early, variable, late, prolonged)
- Reference intrauterine resuscitation measures
- Include escalation pathway for non-reassuring patterns`,

  biophysicalProfile: `
Biophysical Profile Scoring requirements:
- Include all 5 components (NST, AFI, movement, tone, breathing)
- Reference scoring criteria (0 or 2 for each)
- Show interpretation by total score
- Include modified BPP option
- Reference testing frequency by indication
- Show intervention thresholds by score
- Include gestational age considerations
- Reference amniotic fluid index interpretation`,

  // Gynecologic Cancer Screening
  cervicalCancerScreening: `
Cervical Cancer Screening requirements:
- Reference ASCCP 2019 guidelines
- Include age-based screening initiation (21 years)
- Show Pap alone vs co-testing intervals
- Reference HPV primary screening option
- Include abnormal result management algorithms
- Show colposcopy indications
- Reference CIN management pathways
- Include post-treatment surveillance`,

  endometrialCancerWorkup: `
Endometrial Cancer Workup requirements:
- Include abnormal uterine bleeding evaluation pathway
- Reference endometrial biopsy indications
- Show postmenopausal bleeding algorithm
- Include ultrasound endometrial thickness thresholds
- Reference FIGO staging criteria
- Show surgical staging components
- Include adjuvant therapy decision points
- Reference surveillance protocols`,

  ovarianMassEvaluation: `
Ovarian Mass Evaluation requirements:
- Include premenopausal vs postmenopausal pathways
- Reference IOTA rules for mass characterization
- Show tumor marker interpretation (CA-125, HE4, AFP, hCG)
- Include ROMA score calculation
- Reference surgical management approach
- Show fertility-sparing options criteria
- Include malignancy risk stratification
- Reference imaging follow-up protocols`,

  // Reproductive Health
  menstrualDisorders: `
Menstrual Disorder Management requirements:
- Include PALM-COEIN classification for AUB
- Reference hormonal vs structural causes
- Show diagnostic workup algorithm
- Include medical management options
- Reference surgical intervention indications
- Show PCOS diagnostic criteria (Rotterdam)
- Include endometriosis evaluation pathway
- Reference primary amenorrhea workup`,

  contraceptionCounseling: `
Contraception Decision Tree requirements:
- Include effectiveness tier classification
- Reference medical eligibility criteria (US MEC)
- Show LARC vs short-acting method selection
- Include postpartum contraception timing
- Reference emergency contraception options
- Show method switching protocols
- Include special populations (breastfeeding, medical conditions)
- Reference continuation and satisfaction factors`,

  infertilityWorkup: `
Infertility Workup requirements:
- Include definition (12 months <35yo, 6 months >35yo)
- Reference basic workup components (HSG, SA, ovulation)
- Show female factor evaluation pathway
- Include male factor assessment
- Reference ovulation induction protocols
- Show IUI vs IVF decision points
- Include diminished ovarian reserve evaluation
- Reference PCOS treatment pathway`,

  menopauseManagement: `
Menopause Management requirements:
- Include vasomotor symptom assessment
- Reference GSM (genitourinary syndrome) evaluation
- Show hormone therapy eligibility algorithm
- Include contraindications to systemic HT
- Reference non-hormonal options
- Show bone health assessment
- Include cardiovascular risk consideration
- Reference treatment duration recommendations`,

  // Cesarean Section
  cesareanIndications: `
Cesarean Section Indications requirements:
- Differentiate scheduled vs unscheduled cesarean
- Include absolute indications (placenta previa, vasa previa)
- Reference relative indications and counseling points
- Show failed induction criteria
- Include arrest of labor definitions
- Reference non-reassuring fetal status decision pathway
- Show malpresentation management
- Include prior cesarean counseling (TOLAC vs ERCS)`,

  vbacCounseling: `
VBAC Counseling requirements:
- Include TOLAC success prediction factors
- Reference absolute contraindications
- Show risk-benefit comparison table
- Include uterine rupture risk by prior incision type
- Reference labor management differences
- Show continuous monitoring requirements
- Include emergency cesarean readiness criteria
- Reference MFMU VBAC calculator components`,

  // High-Risk Pregnancy
  highRiskSurveillance: `
High-Risk Pregnancy Surveillance requirements:
- Include risk stratification criteria
- Reference increased surveillance indications
- Show fetal growth monitoring protocol
- Include antenatal testing schedule by condition
- Reference Doppler surveillance indications
- Show preterm birth prevention strategies
- Include maternal condition monitoring
- Reference delivery timing by specific conditions`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * OB/GYN-specific few-shot examples
 */
export const OBGYN_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a flowchart for labor management and delivery decision-making',
    output: `flowchart TD
    A[("Patient in Labor\\nAdmission")] --> B["Assess Cervical Status"]
    B --> C{"Cervix >= 6cm?"}

    C -->|No| D["LATENT PHASE"]
    C -->|Yes| E["ACTIVE PHASE"]

    D --> D1{"Adequate\\nContractions?"}
    D1 -->|No| D2["Consider Oxytocin\\nAugmentation"]
    D1 -->|Yes| D3["Expectant Management\\nReassess q2-4h"]
    D2 --> D3
    D3 --> C

    E --> E1{"Cervical Change\\n>= 1cm/2h?"}
    E1 -->|Yes| F["NORMAL PROGRESS"]
    E1 -->|No| G{"Adequate\\nContractions?"}

    G -->|No| H["Oxytocin\\nAugmentation"]
    G -->|Yes| I["ARREST OF DILATION"]

    H --> H1{"Progress after\\n4-6 hours?"}
    H1 -->|Yes| F
    H1 -->|No| I

    I --> J{"Category III FHR\\nor Maternal\\nIndication?"}
    J -->|Yes| K["CESAREAN DELIVERY"]
    J -->|No| L["Continue Trial\\nwith Close Monitoring"]

    F --> M["Second Stage"]
    M --> M1{"Adequate\\nDescent?"}
    M1 -->|Yes| N["VAGINAL DELIVERY"]
    M1 -->|No| O{"> 3h nullip\\nor > 2h multip?"}
    O -->|Yes| P["Operative Delivery\\nor Cesarean"]
    O -->|No| M

    style A fill:#4169E1,color:#fff
    style K fill:#DC143C,color:#fff
    style N fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a fetal heart rate interpretation algorithm using NICHD categories',
    output: `flowchart TD
    A[("Fetal Heart Rate\\nAssessment")] --> B["Evaluate Components"]

    B --> C["Baseline: 110-160 bpm"]
    B --> D["Variability: Moderate"]
    B --> E["Accelerations Present"]
    B --> F["Decelerations Type"]

    C & D & E & F --> G{"All Normal\\nCriteria Met?"}

    G -->|Yes| H["CATEGORY I\\n(Normal)"]
    H --> H1["Continue Routine\\nMonitoring"]

    G -->|No| I{"Absent Variability\\nAND Recurrent\\nLate/Variable Decels?"}

    I -->|Yes| J["CATEGORY III\\n(Abnormal)"]
    J --> J1["URGENT EVALUATION"]
    J1 --> J2["Intrauterine Resuscitation"]
    J2 --> J3{"FHR Improves?"}
    J3 -->|No| J4["EXPEDITED DELIVERY"]
    J3 -->|Yes| K

    I -->|No| K["CATEGORY II\\n(Indeterminate)"]
    K --> K1["Continued Surveillance"]
    K --> K2["Intrauterine Resuscitation"]
    K2 --> K3["Position Change\\nIV Fluids\\nO2 if indicated\\nReduce Oxytocin"]
    K3 --> K4["Reassess in 30 min"]
    K4 --> G

    subgraph Resuscitation["Intrauterine Resuscitation"]
        R1["Left Lateral Position"]
        R2["IV Fluid Bolus"]
        R3["Discontinue Oxytocin"]
        R4["Oxygen PRN"]
        R5["Correct Hypotension"]
    end

    style H fill:#228B22,color:#fff
    style K fill:#FFA500,color:#000
    style J fill:#DC143C,color:#fff
    style J4 fill:#8B0000,color:#fff`,
  },
  {
    prompt: 'Create a postpartum hemorrhage management flowchart',
    output: `flowchart TD
    A[("Postpartum Hemorrhage\\nQBL > 500ml vaginal\\n> 1000ml cesarean")] --> B["Identify Cause: 4 T's"]

    B --> C["TONE\\n(70-80%)"]
    B --> D["TRAUMA\\n(20%)"]
    B --> E["TISSUE\\n(10%)"]
    B --> F["THROMBIN\\n(1%)"]

    C --> C1["Uterine Massage"]
    C1 --> C2["Oxytocin 10-40 units IV"]
    C2 --> C3["Methylergonovine 0.2mg IM"]
    C3 --> C4["Carboprost 250mcg IM"]
    C4 --> C5["Misoprostol 800-1000mcg"]

    D --> D1["Examine Genital Tract"]
    D1 --> D2["Repair Lacerations"]
    D2 --> D3["Assess for Hematoma"]

    E --> E1["Manual Exploration"]
    E1 --> E2["Remove Retained\\nPlacenta/Clots"]

    F --> F1["Coagulation Studies"]
    F1 --> F2["Replace Factors\\nFFP, Cryo, Platelets"]

    C5 --> G{"Bleeding\\nControlled?"}
    D3 --> G
    E2 --> G
    F2 --> G

    G -->|No| H["Second-Line Interventions"]
    H --> H1["Bakri Balloon\\nTamponade"]
    H1 --> H2["Uterine Compression\\nSutures (B-Lynch)"]
    H2 --> H3["Uterine Artery\\nLigation/Embolization"]
    H3 --> H4{"Still Bleeding?"}

    H4 -->|Yes| I["HYSTERECTOMY"]
    H4 -->|No| J["ICU Monitoring"]
    G -->|Yes| K["Close Monitoring\\nReplace Blood Loss"]

    subgraph MTP["Massive Transfusion Protocol"]
        M1["Activate if EBL > 1500ml"]
        M2["1:1:1 RBC:FFP:Platelets"]
        M3["TXA 1g IV"]
    end

    style A fill:#DC143C,color:#fff
    style I fill:#8B0000,color:#fff
    style K fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a cervical cancer screening algorithm based on ASCCP guidelines',
    output: `flowchart TD
    A["Cervical Cancer\\nScreening"] --> B{"Patient Age?"}

    B -->|"< 21"| C["No Screening"]
    B -->|"21-29"| D["Pap Alone\\nq3 years"]
    B -->|"30-65"| E["Co-testing (Pap + HPV)\\nq5 years\\nOR Pap alone q3y"]
    B -->|"> 65"| F{"Adequate Prior\\nScreening?"}
    F -->|Yes| G["Discontinue Screening"]
    F -->|No| H["Continue until\\nCriteria Met"]

    D --> I{"Result?"}
    E --> I

    I -->|NILM, HPV-| J["Routine Screening"]
    I -->|ASCUS| K{"HPV Test"}
    I -->|LSIL| L["Colposcopy if\\n>= 25yo"]
    I -->|HSIL| M["Colposcopy\\nor Excision"]
    I -->|ASC-H| M
    I -->|AGC| N["Colposcopy +\\nECC + EMB"]

    K -->|HPV-| J
    K -->|HPV+| L

    L --> O["Colposcopy"]
    M --> O
    O --> P{"Biopsy Result?"}

    P -->|"Normal/CIN1"| Q["Surveillance\\nper ASCCP"]
    P -->|"CIN2/3"| R["Treatment:\\nLEEP/Cone/Ablation"]

    R --> S["Follow-up Testing\\nq6 months x2"]
    S --> T{"Negative?"}
    T -->|Yes| U["Return to\\nRoutine Screening"]
    T -->|No| V["Additional\\nEvaluation"]

    subgraph Risk["Risk-Based Management"]
        RB1["ASCCP Risk Tables"]
        RB2["5-year CIN3+ Risk"]
        RB3["Guides Management"]
    end

    style C fill:#808080,color:#fff
    style M fill:#DC143C,color:#fff
    style R fill:#FFA500,color:#000
    style J fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a contraception decision tree based on medical eligibility',
    output: `flowchart TD
    A["Contraception\\nCounseling"] --> B{"Patient\\nPreference?"}

    B -->|"Most Effective"| C["LARC Options"]
    B -->|"Short-Acting"| D["Short-Acting Methods"]
    B -->|"Non-Hormonal"| E["Non-Hormonal Options"]
    B -->|"Permanent"| F["Sterilization"]

    C --> C1["Copper IUD\\n(Paragard)"]
    C --> C2["LNG-IUD\\n(Mirena/Kyleena/Liletta)"]
    C --> C3["Implant\\n(Nexplanon)"]

    D --> D1["Combined OCP"]
    D --> D2["Patch/Ring"]
    D --> D3["DMPA Injection"]
    D --> D4["POP (Mini-pill)"]

    E --> E1["Copper IUD"]
    E --> E2["Barrier Methods"]
    E --> E3["Fertility Awareness"]

    C1 --> G{"US MEC\\nCategory?"}
    C2 --> G
    C3 --> G
    D1 --> H{"Estrogen\\nContraindications?"}
    D3 --> I{"Progestin\\nContraindications?"}

    H -->|"Age >35 + Smoking\\nMigraine w/Aura\\nVTE History\\nBreast Cancer\\nHTN >= 160/100"| J["AVOID ESTROGEN\\n(MEC Category 4)"]
    H -->|"None"| K["Appropriate"]

    I -->|"Current Breast CA"| L["AVOID\\n(MEC Category 4)"]
    I -->|"None"| K

    J --> M["Use Progestin-Only\\nor Non-Hormonal"]

    G -->|"Category 1-2"| N["Safe to Use"]
    G -->|"Category 3"| O["Caution:\\nRisks May Outweigh"]
    G -->|"Category 4"| P["Contraindicated"]

    subgraph Effectiveness["Typical Use Failure Rates"]
        E_1["LARC: <1%"]
        E_2["Pill/Patch/Ring: 7%"]
        E_3["DMPA: 4%"]
        E_4["Condom: 13%"]
    end

    subgraph PostpartumTiming["Postpartum Timing"]
        PP1["IUD: Immediate or 4-6 wks"]
        PP2["Implant: Immediate"]
        PP3["CHC: 3-6 wks if not BF"]
    end

    style C fill:#228B22,color:#fff
    style J fill:#DC143C,color:#fff
    style P fill:#DC143C,color:#fff`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

const obgynPrompts = {
  OBGYN_DOMAIN_PROMPT,
  OBGYN_PROMPTS,
  OBGYN_FEW_SHOT_EXAMPLES,
};
export default obgynPrompts;
