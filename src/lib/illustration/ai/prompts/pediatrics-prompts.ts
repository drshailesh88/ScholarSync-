/**
 * pediatrics-prompts.ts
 * Pediatrics-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for pediatric medicine including:
 * - Growth and development assessment
 * - Neonatal resuscitation (NRP)
 * - Newborn care and NICU
 * - Common childhood illnesses
 * - Vaccination protocols
 * - Pediatric emergencies
 * - Congenital conditions
 * - ADHD evaluation and management
 * - Well-child visits
 *
 * Total: 27 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// PEDIATRICS DOMAIN PROMPT
// =============================================================================

/**
 * Base pediatrics domain prompt for child health diagrams
 */
export const PEDIATRICS_DOMAIN_PROMPT = `
Pediatrics diagram requirements:
- Use AAP (American Academy of Pediatrics) guidelines and recommendations
- Follow Bright Futures periodicity schedule for well-child care
- Include age-appropriate vital sign ranges (HR, RR, BP vary significantly by age)
- Reference CDC/WHO growth charts for anthropometric assessment
- Use weight-based medication dosing (mg/kg) for all medications
- Include developmental milestone expectations by age
- Reference ACIP immunization schedules
- Use warm, friendly colors appropriate for pediatric context
- Consider family-centered care approach in all workflows
- Include red flags for concerning presentations requiring urgent evaluation
- Reference pediatric-specific scoring systems (APGAR, Ballard, Denver, ASQ)`;

// =============================================================================
// PEDIATRICS-SPECIFIC PROMPTS
// =============================================================================

export const PEDIATRICS_PROMPTS = {
  // =========================================================================
  // GROWTH AND DEVELOPMENT
  // =========================================================================
  growthAssessment: `
Growth Assessment requirements:
- Plot weight, length/height, head circumference on appropriate charts
- Use WHO charts for 0-2 years, CDC for 2+ years
- Calculate weight-for-length/BMI percentiles
- Identify crossing of major percentile lines (2+ lines = concern)
- Include growth velocity calculations
- Reference failure to thrive criteria (<3rd percentile or crossing)
- Consider genetic potential (mid-parental height)
- Flag disproportionate growth patterns`,

  developmentalScreening: `
Developmental Screening requirements:
- Use validated screening tools (ASQ-3, PEDS, Denver II)
- Assess all domains: gross motor, fine motor, language, social, cognitive
- Include age-specific milestone expectations
- Reference M-CHAT-R/F for autism screening at 18 and 24 months
- Identify red flags requiring immediate referral
- Include early intervention referral criteria
- Document developmental quotient if applicable
- Consider adjusted age for premature infants`,

  failureToThrive: `
Failure to Thrive Evaluation requirements:
- Define FTT criteria (weight <3rd percentile or crossing 2 major lines)
- Differentiate organic vs non-organic causes
- Include detailed feeding assessment (intake diary, feeding observation)
- Reference caloric requirements by age (typically 100-120 kcal/kg/day)
- Workup: CBC, CMP, TFTs, celiac screen, UA
- Assess for red flags suggesting organic cause
- Include social work assessment when indicated
- Plan for close follow-up and growth monitoring`,

  // =========================================================================
  // NEWBORN AND NICU
  // =========================================================================
  neonatalResuscitation: `
Neonatal Resuscitation (NRP) Algorithm requirements:
- Follow current NRP guidelines and systematic approach
- Include initial steps: warm, dry, position, stimulate, clear airway
- Reference 30-second intervals for reassessment
- Show MR. SOPA for ventilation troubleshooting (Mask adjustment, Reposition, Suction, Open mouth, Pressure increase, Alternative airway)
- Include heart rate targets: <100 bpm = PPV, <60 bpm = compressions
- Reference compression-to-ventilation ratio 3:1
- Include epinephrine indications and dosing (0.01-0.03 mg/kg IV/IO)
- Show UVC placement for medication/volume administration
- Reference post-resuscitation monitoring and therapeutic hypothermia criteria`,

  newbornAssessment: `
Newborn Assessment requirements:
- Include APGAR scoring at 1 and 5 minutes
- Document Ballard score for gestational age assessment
- Reference normal newborn vital signs (HR 100-160, RR 30-60)
- Include newborn physical exam findings
- Document birth weight classification (SGA, AGA, LGA)
- Screen for congenital anomalies
- Include newborn metabolic screening timeline
- Reference critical congenital heart disease screening (pulse ox)`,

  neonatalJaundice: `
Neonatal Jaundice Management requirements:
- Reference Bhutani nomogram for risk stratification
- Include hour-specific bilirubin interpretation
- Differentiate physiologic vs pathologic jaundice
- Consider risk factors (ABO/Rh incompatibility, G6PD, prematurity)
- Include phototherapy thresholds by gestational age
- Reference exchange transfusion criteria
- Document rebound bilirubin monitoring
- Include breastfeeding support and hydration assessment`,

  nicuCommonConditions: `
NICU Common Conditions requirements:
- Include respiratory distress syndrome (RDS) management
- Reference surfactant administration criteria
- Necrotizing enterocolitis (NEC) staging and management
- Intraventricular hemorrhage (IVH) grading
- Retinopathy of prematurity (ROP) screening schedule
- Bronchopulmonary dysplasia (BPD) criteria
- Feeding advancement protocols
- Temperature and glucose management in premature infants`,

  // =========================================================================
  // COMMON CHILDHOOD ILLNESSES
  // =========================================================================
  febrileInfant: `
Febrile Infant Evaluation requirements:
- Age-stratified approach (<28 days, 29-60 days, 61-90 days)
- Include Rochester/Philadelphia/Boston criteria for low-risk
- Reference step-by-step workup (CBC, CMP, UA, LP, BCx)
- Empiric antibiotic selection by age (ampicillin + gentamicin or cefotaxime)
- Include viral testing panel when appropriate
- Disposition criteria (admit vs outpatient observation)
- Close follow-up plan for low-risk infants
- Red flags requiring immediate full sepsis workup`,

  croupManagement: `
Croup Management requirements:
- Include Westley croup score for severity assessment
- Differentiate mild, moderate, severe croup
- Treatment algorithm: nebulized epinephrine, dexamethasone
- Reference dose: dexamethasone 0.6 mg/kg (max 10 mg) single dose
- Observation period after epinephrine (2-4 hours)
- Admission criteria (persistent stridor at rest, hypoxia)
- Distinguish from epiglottitis (drooling, toxic, tripod position)
- Parent education for home management`,

  bronchiolitisRSV: `
Bronchiolitis/RSV Management requirements:
- Reference AAP bronchiolitis guidelines
- Include clinical severity assessment
- Supportive care focus: suctioning, hydration, oxygen PRN
- Avoid routine chest x-ray, bronchodilators, steroids
- Indications for RSV testing (cohorting, palivizumab decisions)
- Admission criteria (hypoxia, poor feeding, high-risk patient)
- High-risk populations (premature, CHD, chronic lung disease)
- Palivizumab prophylaxis criteria`,

  pediatricAsthma: `
Pediatric Asthma Management requirements:
- Follow NAEPP/GINA stepwise approach
- Age-appropriate medication delivery devices
- Controller medication selection by severity
- Include SABA dosing for acute exacerbation
- Reference Pediatric Respiratory Assessment Measure (PRAM)
- Systemic steroid criteria and dosing (prednisolone 1-2 mg/kg)
- Asthma action plan creation
- Trigger identification and avoidance counseling`,

  // =========================================================================
  // VACCINATION
  // =========================================================================
  immunizationSchedule: `
Immunization Schedule requirements:
- Reference current CDC/ACIP recommended schedule
- Include birth dose vaccines (HepB)
- Primary series: DTaP, IPV, Hib, PCV13, RV, HepB
- 12-month vaccines: MMR, Varicella, HepA
- Boosters and school-entry doses
- Catch-up schedule for delayed immunizations
- Minimum intervals between doses
- Contraindications and precautions for each vaccine`,

  vaccineAdverseEvents: `
Vaccine Adverse Events requirements:
- Differentiate common reactions from severe adverse events
- Include local reaction management (ice, acetaminophen)
- Reference VAERS reporting criteria
- Anaphylaxis recognition and management
- Contraindications for future doses
- Egg allergy and influenza/MMR considerations
- Live vaccine precautions in immunocompromised
- Vaccine Information Statement (VIS) documentation`,

  // =========================================================================
  // CONGENITAL CONDITIONS
  // =========================================================================
  congenitalHeartDisease: `
Congenital Heart Disease requirements:
- Classify as acyanotic vs cyanotic
- Common lesions: VSD, ASD, PDA, ToF, TGA, coarctation
- Critical CHD screening with pulse oximetry
- Include murmur characteristics and timing
- Signs of heart failure in infants
- When to refer for echocardiogram
- Ductal-dependent lesions requiring prostaglandin
- Long-term follow-up and endocarditis prophylaxis`,

  neonatalHypoglycemia: `
Neonatal Hypoglycemia Management requirements:
- Reference operational threshold (<45-50 mg/dL)
- Risk factors: SGA, LGA, IDM, prematurity, stress
- Screening protocol for at-risk infants
- Management algorithm: feed, recheck, IV dextrose if needed
- IV dextrose dosing: D10W 2 mL/kg bolus, then 5-8 mg/kg/min
- Monitoring frequency
- When to obtain further workup (persistent hypoglycemia)
- Discharge criteria`,

  // =========================================================================
  // PEDIATRIC EMERGENCIES
  // =========================================================================
  pediatricChoking: `
Pediatric Choking Management requirements:
- Age-specific techniques: <1 year vs >1 year
- Infant: 5 back blows + 5 chest thrusts
- Child: abdominal thrusts (Heimlich)
- Differentiate mild vs severe obstruction
- When to attempt blind finger sweep (never in infants)
- Transition to CPR if becomes unresponsive
- Direct laryngoscopy and Magill forceps if visible object
- Prevention counseling (food size, small objects)`,

  febrileSeizures: `
Febrile Seizure Management requirements:
- Differentiate simple vs complex febrile seizures
- Simple: <15 min, generalized, single episode, no postictal deficits
- Complex: >15 min, focal features, recurrence within 24 hours
- Evaluation: focus on source of fever
- LP indications (age <12 months, meningeal signs, complex features)
- Typically no routine labs, EEG, or imaging for simple
- Recurrence risk counseling (30% within 1 year)
- Rescue medication (diazepam) for prolonged seizure history`,

  dehydrationAssessment: `
Pediatric Dehydration Assessment requirements:
- Clinical signs: skin turgor, mucous membranes, tears, cap refill
- Classify severity: mild (<5%), moderate (5-10%), severe (>10%)
- Weight-based deficit calculation
- Oral rehydration therapy: ORS 50-100 mL/kg over 3-4 hours
- IV fluid protocol for severe: NS 20 mL/kg bolus, repeat PRN
- Maintenance fluid calculation (Holliday-Segar)
- Monitoring: urine output, heart rate, cap refill
- Discharge criteria and home management`,

  pediatricPoisoning: `
Pediatric Poisoning/Ingestion requirements:
- Contact Poison Control (1-800-222-1222)
- Initial assessment: ABCs, mental status
- Attempt to identify substance and amount
- GI decontamination decision (activated charcoal rarely indicated)
- Common pediatric ingestions: acetaminophen, iron, button batteries
- Specific antidotes: NAC, deferoxamine
- Button battery in esophagus = emergency
- Prevention counseling and poison-proofing`,

  // =========================================================================
  // WELL-CHILD CARE
  // =========================================================================
  wellChildVisit: `
Well-Child Visit requirements:
- Follow AAP Bright Futures periodicity schedule
- Growth assessment (plot on appropriate charts)
- Developmental surveillance and screening
- Age-appropriate physical examination
- Immunization review and administration
- Vision and hearing screening by age
- Lead and anemia screening when indicated
- Anticipatory guidance (safety, nutrition, sleep, development)
- Screen for social determinants of health`,

  anticipatoryGuidance: `
Anticipatory Guidance requirements:
- Age-appropriate safety counseling (car seats, water, falls, burns)
- Nutrition guidance (breastfeeding, introduction of solids, healthy eating)
- Sleep recommendations (safe sleep, sleep hygiene)
- Developmental promotion activities
- Screen time guidelines by age
- Dental care and fluoride
- Injury prevention
- School readiness and learning`,

  // =========================================================================
  // SPECIAL POPULATIONS
  // =========================================================================
  prematureInfantFollowUp: `
Premature Infant Follow-up requirements:
- Use corrected/adjusted age until 2-3 years
- Growth chart selection (Fenton for preterm, transition to WHO)
- RSV prophylaxis eligibility assessment
- Ophthalmology follow-up for ROP screening graduates
- Developmental monitoring (higher risk for delays)
- Immunization on chronologic age schedule
- Iron supplementation in preterm infants
- Early intervention referral criteria`,

  adolescentHealth: `
Adolescent Health Screening requirements:
- HEEADSSS assessment framework
- Depression screening (PHQ-A, PHQ-9)
- Substance use screening (CRAFFT)
- Sexual health assessment and STI screening
- Confidentiality and consent considerations
- Immunizations: Tdap, MCV4, HPV series
- Anticipatory guidance: sleep, nutrition, exercise, safety
- Mental health resources and crisis intervention`,

  adhdEvaluation: `
ADHD Evaluation and Management requirements:
- Include DSM-5 criteria for inattentive, hyperactive/impulsive, and combined types
- Reference multi-source assessment (parent, teacher, clinician observations)
- Include validated rating scales (Vanderbilt, Conners, SNAP-IV)
- Show symptom duration criteria (>6 months, onset before age 12)
- Include functional impairment assessment across settings
- Rule out differential diagnoses (anxiety, depression, learning disorders, sleep disorders)
- Reference AAP guidelines for stimulant medication initiation (typically age 6+)
- Include behavioral therapy indications (first-line for ages 4-5)
- Show medication options: methylphenidate vs amphetamine classes
- Include monitoring protocol (height, weight, BP, HR, side effects)
- Reference classroom accommodations and 504/IEP considerations`,

  // =========================================================================
  // PROCEDURES
  // =========================================================================
  pediatricIVAccess: `
Pediatric IV Access requirements:
- Site selection by age (scalp, hand, foot for infants)
- Catheter sizing: 24G infant, 22G child, 20G adolescent
- EMLA/LMX cream if time allows (30-60 min)
- Child life specialist and distraction techniques
- Proper immobilization and securing
- Alternative: IO access in emergent situations
- Escalation: PICC, central line considerations
- Parent presence and comfort positioning`,

  lumbarPuncture: `
Pediatric Lumbar Puncture requirements:
- Indications: suspected meningitis, fever workup in young infant
- Positioning: lateral decubitus preferred (flex spine, NOT neck)
- Landmark: L3-L4 or L4-L5 (iliac crest = L4)
- Needle: 22G spinal needle, stylet
- CSF studies: cell count, protein, glucose, culture, Gram stain
- Normal CSF values vary by age
- Contraindications: signs of increased ICP, coagulopathy
- Monitor for apnea during procedure in infants`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Pediatrics-specific few-shot examples
 */
export const PEDIATRICS_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a neonatal resuscitation (NRP) algorithm flowchart',
    output: `flowchart TD
    A[("Newborn Delivery")] --> B{"Term?\\nBreathing/Crying?\\nGood Tone?"}

    B -->|"All Yes"| C["Routine Care\\nWarm, Dry\\nSkin-to-Skin\\nOngoing Evaluation"]
    B -->|"Any No"| D["Initial Steps\\n30 seconds"]

    D --> D1["Warm, dry, stimulate"]
    D --> D2["Position airway"]
    D --> D3["Clear secretions PRN"]
    D1 & D2 & D3 --> E{"HR? Breathing?"}

    E -->|"HR >100\\nBreathing"| F["Position\\nMonitor SpO2"]
    E -->|"HR <100\\nor Apnea"| G["PPV with 21-30% O2\\n40-60 breaths/min"]

    G --> H{"HR after\\n30 sec PPV?"}
    H -->|">100"| I["Post-Resuscitation Care"]
    H -->|"60-100"| J["Check Ventilation\\nMR. SOPA"]
    H -->|"<60"| K["Chest Compressions\\n3:1 ratio + 100% O2"]

    J --> L{"HR still\\n<100?"}
    L -->|"Yes"| K
    L -->|"No"| I

    K --> M{"HR after\\n60 sec?"}
    M -->|">60"| N["Stop compressions\\nContinue PPV"]
    M -->|"<60"| O["IV Epinephrine\\n0.01-0.03 mg/kg"]

    O --> P["Consider:\\nHypovolemia (NS 10mL/kg)\\nPneumothorax\\nUVC access"]

    subgraph MRSOPA["MR. SOPA"]
        S1["Mask adjustment"]
        S2["Reposition head"]
        S3["Suction mouth/nose"]
        S4["Open mouth"]
        S5["Pressure increase"]
        S6["Alternative airway"]
    end

    J --> MRSOPA

    style A fill:#87CEEB,color:#000
    style G fill:#FFD700,color:#000
    style K fill:#FF6347,color:#fff
    style O fill:#DC143C,color:#fff
    style C fill:#228B22,color:#fff
    style I fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a fever evaluation algorithm for infants under 90 days',
    output: `flowchart TD
    A[("Febrile Infant\\n<90 days, T>38C")] --> B{"Age?"}

    B -->|"<28 days"| C["Full Sepsis Workup"]
    C --> C1["CBC, CMP, UA, BCx"]
    C --> C2["LP Required"]
    C --> C3["CXR if respiratory sx"]
    C --> D["Admit + IV Abx"]
    D --> D1["Ampicillin + Gentamicin\\nor Cefotaxime"]

    B -->|"29-60 days"| E{"Well-appearing?"}
    E -->|"No"| C
    E -->|"Yes"| F["Rochester Criteria"]
    F --> G{"Low Risk?"}
    G -->|"No"| H["Full Workup + Admit"]
    G -->|"Yes"| I["Limited Workup"]
    I --> I1["CBC, UA +/- LP"]
    I --> J{"Results?"}
    J -->|"Normal"| K["Outpt with 24h f/u"]
    J -->|"Abnormal"| H

    B -->|"61-90 days"| L{"Well-appearing?"}
    L -->|"No"| M["Full Workup"]
    L -->|"Yes"| N["UA + Consider viral panel"]
    N --> O{"UTI?"}
    O -->|"Yes"| P["Treat UTI"]
    O -->|"No"| Q["Viral syndrome likely"]

    style C fill:#DC143C,color:#fff
    style D fill:#DC143C,color:#fff
    style K fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a developmental milestones timeline for the first year',
    output: `flowchart LR
    subgraph TwoMo["2 Months"]
        T1["Lifts head prone"]
        T2["Social smile"]
        T3["Coos"]
        T4["Tracks past midline"]
    end

    subgraph FourMo["4 Months"]
        F1["Rolls front to back"]
        F2["Reaches for objects"]
        F3["Laughs"]
        F4["Turns to voice"]
    end

    subgraph SixMo["6 Months"]
        S1["Sits with support"]
        S2["Transfers objects"]
        S3["Babbles (consonants)"]
        S4["Stranger anxiety begins"]
    end

    subgraph NineMo["9 Months"]
        N1["Sits independently"]
        N2["Pincer grasp emerging"]
        N3["Says mama/dada nonspecific"]
        N4["Waves bye-bye"]
    end

    subgraph TwelveMo["12 Months"]
        M1["Stands alone"]
        M2["1-3 words"]
        M3["Points to indicate wants"]
        M4["Imitates activities"]
    end

    TwoMo --> FourMo --> SixMo --> NineMo --> TwelveMo

    subgraph RedFlags["Red Flags"]
        R1["No social smile by 3mo"]
        R2["No reaching by 5mo"]
        R3["No babbling by 9mo"]
        R4["No words by 15mo"]
    end

    style RedFlags fill:#FEE2E2,color:#000
    style TwelveMo fill:#D1FAE5,color:#000`,
  },
  {
    prompt: 'Create a croup severity assessment and treatment algorithm',
    output: `flowchart TD
    A[("Croup\\nBarking cough, stridor")] --> B["Westley Score"]

    B --> C["Assess Components"]
    C --> C1["Stridor (0-2)"]
    C --> C2["Retractions (0-3)"]
    C --> C3["Air entry (0-2)"]
    C --> C4["Cyanosis (0-5)"]
    C --> C5["LOC (0-5)"]

    C --> D{"Total Score?"}

    D -->|"0-2: Mild"| E["Outpatient Management"]
    E --> E1["Dexamethasone 0.6mg/kg PO"]
    E --> E2["Supportive care"]
    E --> E3["Return precautions"]

    D -->|"3-7: Moderate"| F["ED Management"]
    F --> F1["Dexamethasone 0.6mg/kg"]
    F --> F2["Nebulized epinephrine\\nif stridor at rest"]
    F --> F3["Observe 2-4 hours"]
    F --> G{"Improved?"}
    G -->|"Yes"| H["Discharge with f/u"]
    G -->|"No"| I["Admit"]

    D -->|">7: Severe"| J["Emergent Management"]
    J --> J1["Nebulized epinephrine"]
    J --> J2["Dexamethasone 0.6mg/kg"]
    J --> J3["Supplemental O2"]
    J --> K["Admit to monitored bed"]
    K --> L{"Worsening?"}
    L -->|"Yes"| M["ICU/Intubation"]

    style J fill:#DC143C,color:#fff
    style M fill:#8B0000,color:#fff
    style E fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a pediatric immunization schedule flowchart',
    output: `flowchart TD
    subgraph Birth["Birth"]
        B1["HepB #1"]
    end

    subgraph TwoMo["2 Months"]
        T1["DTaP #1"]
        T2["IPV #1"]
        T3["Hib #1"]
        T4["PCV13 #1"]
        T5["RV #1"]
        T6["HepB #2"]
    end

    subgraph FourMo["4 Months"]
        F1["DTaP #2"]
        F2["IPV #2"]
        F3["Hib #2"]
        F4["PCV13 #2"]
        F5["RV #2"]
    end

    subgraph SixMo["6 Months"]
        S1["DTaP #3"]
        S2["PCV13 #3"]
        S3["RV #3 (if Rotateq)"]
        S4["HepB #3"]
        S5["Influenza annually"]
    end

    subgraph TwelveMo["12-15 Months"]
        M1["MMR #1"]
        M2["Varicella #1"]
        M3["HepA #1"]
        M4["PCV13 #4"]
        M5["Hib booster"]
    end

    subgraph FourYr["4-6 Years"]
        Y1["DTaP #5"]
        Y2["IPV #4"]
        Y3["MMR #2"]
        Y4["Varicella #2"]
    end

    subgraph Adolescent["11-12 Years"]
        A1["Tdap"]
        A2["MCV4 #1"]
        A3["HPV series"]
    end

    Birth --> TwoMo --> FourMo --> SixMo --> TwelveMo --> FourYr --> Adolescent

    style Birth fill:#22C55E,color:#fff
    style TwoMo fill:#60A5FA,color:#fff
    style TwelveMo fill:#F472B6,color:#fff`,
  },
  {
    prompt: 'Create a dehydration assessment and treatment algorithm for pediatrics',
    output: `flowchart TD
    A[("Assess Dehydration")] --> B["Clinical Signs"]

    B --> C["Mental status"]
    B --> D["Eyes (sunken?)"]
    B --> E["Tears present?"]
    B --> F["Mucous membranes"]
    B --> G["Skin turgor"]
    B --> H["Cap refill"]
    B --> I["Urine output"]

    C & D & E & F & G & H & I --> J{"Severity?"}

    J -->|"Mild <5%"| K["Oral Rehydration"]
    K --> K1["ORS 50mL/kg over 4h"]
    K --> K2["Replace ongoing losses"]
    K --> K3["Home management OK"]

    J -->|"Moderate 5-10%"| L["ED Rehydration"]
    L --> L1["ORS trial 50-100mL/kg"]
    L --> L2["If not tolerating PO:"]
    L --> L3["NS 20mL/kg IV bolus"]
    L --> M{"Improved?"}
    M -->|"Yes"| N["Transition to PO"]
    M -->|"No"| O["Repeat bolus\\nConsider admission"]

    J -->|"Severe >10%"| P["Emergency Management"]
    P --> P1["NS 20mL/kg bolus"]
    P --> P2["Repeat x2-3 PRN"]
    P --> P3["Labs: BMP, glucose"]
    P --> Q["Admit for IV fluids"]
    Q --> R["Maintenance + Deficit\\nover 24-48h"]

    style P fill:#DC143C,color:#fff
    style K fill:#228B22,color:#fff`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

export default {
  PEDIATRICS_DOMAIN_PROMPT,
  PEDIATRICS_PROMPTS,
  PEDIATRICS_FEW_SHOT_EXAMPLES,
};
