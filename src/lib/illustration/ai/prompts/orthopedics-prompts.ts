/**
 * orthopedics-prompts.ts
 * Orthopedics-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for orthopedic medicine including:
 * - Fracture assessment and classification
 * - Joint pathology and surgical approaches
 * - Spine disorders and management
 * - Sports medicine and rehabilitation
 * - Trauma algorithms and protocols
 * - Implant selection and surgical planning
 * - Pediatric orthopedics
 * - Musculoskeletal imaging interpretation
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// ORTHOPEDICS DOMAIN PROMPT
// =============================================================================

/**
 * Base orthopedics domain prompt for orthopedic medicine diagrams
 */
export const ORTHOPEDICS_DOMAIN_PROMPT = `
Orthopedics diagram requirements:
- Use standard orthopedic terminology (ORIF, IM nail, TKA, THA, etc.)
- Follow AO/OTA fracture classification conventions
- Reference Gustilo-Anderson classification for open fractures
- Include proper anatomical orientation (AP, lateral, oblique views)
- Use standard weight-bearing status terminology (NWB, TTWB, PWB, WBAT, FWB)
- Follow AAOS clinical practice guidelines where applicable
- Include proper bone/joint nomenclature (C1-C7, T1-T12, L1-L5, S1-S5)
- Use color coding: Bone (Ivory), Cartilage (Blue), Fracture (Red), Implant (Gray)
- Include proper fracture pattern descriptions (transverse, oblique, spiral, comminuted)
- Reference standard surgical approach names (anterior, posterior, lateral, medial)`;

// =============================================================================
// ORTHOPEDICS-SPECIFIC PROMPTS
// =============================================================================

export const ORTHOPEDICS_PROMPTS = {
  // Clinical Decision Support
  fractureAssessment: `
Fracture Assessment Algorithm requirements:
- Evaluate mechanism of injury (high vs low energy)
- Classify fracture pattern (simple vs comminuted, transverse vs oblique vs spiral)
- Determine open vs closed status using Gustilo-Anderson classification
- Assess neurovascular status (pulses, sensation, motor function)
- Identify fracture stability (stable vs unstable pattern)
- Determine treatment pathway (operative vs non-operative)
- Include imaging requirements (AP/lateral X-ray, CT if needed)`,

  hipFractureManagement: `
Hip Fracture Management requirements:
- Classify fracture type (femoral neck vs intertrochanteric vs subtrochanteric)
- Reference Garden classification for femoral neck fractures
- Determine surgical timing (within 24-48 hours)
- Select fixation method based on fracture type and patient factors
- Include DVT prophylaxis protocol
- Reference AAOS hip fracture guidelines
- Show disposition pathway (rehabilitation, SNF, home)`,

  lowBackPainWorkup: `
Low Back Pain Workup requirements:
- Screen for red flags (cauda equina, infection, malignancy, fracture)
- Differentiate mechanical vs inflammatory back pain
- Include neurological examination findings (radiculopathy, myelopathy)
- Reference imaging indications (X-ray, MRI timing)
- Show conservative treatment pathway
- Include referral criteria for specialist consultation
- Reference ACP/APS guidelines for LBP`,

  jointReplacementPathway: `
Joint Replacement Pathway requirements:
- Include preoperative optimization checklist
- Reference indications (OA severity, failed conservative treatment)
- Show component selection considerations
- Include VTE prophylaxis protocol (AAOS guidelines)
- Reference antibiotic prophylaxis timing
- Show rehabilitation milestones
- Include discharge criteria and follow-up schedule`,

  sportsInjuryEvaluation: `
Sports Injury Evaluation requirements:
- Apply Ottawa ankle/knee rules for imaging decisions
- Classify injury severity (Grade I, II, III)
- Include RICE protocol timing
- Reference return-to-play criteria
- Differentiate acute vs overuse injury
- Include sport-specific considerations
- Show rehabilitation progression phases`,

  // Anatomical and Classification Systems
  aoFractureClassification: `
AO/OTA Fracture Classification requirements:
- Include bone segment identification (1-9)
- Show location coding (proximal, diaphysis, distal = 1, 2, 3)
- Reference fracture type (A, B, C with complexity)
- Include subgroup classifications
- Show morphology descriptors
- Provide treatment implications for each class
- Reference stability and prognosis by classification`,

  spineAnatomyLevels: `
Spine Anatomy and Pathology requirements:
- Include all spinal segments (C1-C7, T1-T12, L1-L5, S1-S5)
- Reference dermatomal distributions
- Show myotomal innervation
- Include disc nomenclature (L4-L5, L5-S1, etc.)
- Reference spinal cord termination level
- Show nerve root exit patterns
- Include common pathology locations`,

  shoulderPathology: `
Shoulder Pathology requirements:
- Include rotator cuff anatomy (supraspinatus, infraspinatus, teres minor, subscapularis)
- Reference impingement syndrome classification
- Show instability patterns (anterior, posterior, multidirectional)
- Include labral tear types (SLAP, Bankart)
- Reference surgical approach options
- Show rehabilitation protocol phases
- Include return to activity criteria`,

  // Diagnostic Interpretation
  fractureCTInterpretation: `
Fracture CT Interpretation requirements:
- Identify fracture lines in multiple planes
- Assess articular surface involvement
- Measure displacement and angulation
- Identify comminution and fragment count
- Reference preoperative planning measurements
- Include 3D reconstruction indications
- Show surgical approach planning based on CT`,

  mriJointInterpretation: `
MRI Joint Interpretation requirements:
- Identify ligament integrity (ACL, PCL, collaterals)
- Assess cartilage status (Outerbridge classification)
- Evaluate meniscal tears (classification and location)
- Identify bone marrow edema patterns
- Reference fluid collections and effusions
- Show tendon pathology (tendinosis, partial/complete tear)
- Include interpretation systematic approach`,

  dexaInterpretation: `
DEXA Interpretation requirements:
- Reference T-score and Z-score meanings
- Include WHO osteoporosis classification
- Show FRAX calculation inputs
- Reference treatment thresholds
- Include monitoring intervals
- Show vertebral fracture assessment indications
- Reference medication selection by T-score`,

  // Surgical Planning
  fractureFixationSelection: `
Fracture Fixation Selection requirements:
- Match fixation type to fracture pattern
- Reference plate vs IM nail indications
- Include external fixation criteria
- Show arthroplasty vs fixation decision points
- Reference patient factors (age, activity, bone quality)
- Include implant selection considerations
- Show contraindications for each method`,

  spinalFusionIndications: `
Spinal Fusion Indications requirements:
- Reference instability criteria
- Include deformity correction indications
- Show level selection principles
- Reference approach selection (anterior, posterior, combined)
- Include instrumentation options
- Show adjacent segment disease considerations
- Reference fusion alternatives (disc replacement)`,

  arthroscopyDecisionTree: `
Arthroscopy Decision Tree requirements:
- Include diagnostic vs therapeutic indications
- Reference preoperative imaging requirements
- Show joint-specific portal placement
- Include expected findings and treatments
- Reference rehabilitation protocol by procedure
- Show contraindications and complications
- Include conversion to open surgery criteria`,

  // Disease-Specific Pathways
  osteoarthritisManagement: `
Osteoarthritis Management requirements:
- Reference KL (Kellgren-Lawrence) grading system
- Include conservative treatment ladder
- Show injection therapy options (corticosteroid, HA, PRP)
- Reference surgical indications
- Include weight management and exercise recommendations
- Show joint-specific considerations
- Reference AAOS OA treatment guidelines`,

  traumaAlgorithm: `
Orthopedic Trauma Algorithm requirements:
- Follow ATLS primary and secondary survey
- Include damage control orthopedics principles
- Reference open fracture management timeline
- Show compartment syndrome monitoring
- Include polytrauma prioritization
- Reference definitive fixation timing
- Show transfusion protocol integration`,

  pediatricFractureManagement: `
Pediatric Fracture Management requirements:
- Reference Salter-Harris physeal injury classification
- Include growth plate considerations
- Show remodeling potential by age and location
- Reference acceptable angulation by location
- Include child abuse screening (NAT workup)
- Show pediatric-specific fixation options
- Reference follow-up and monitoring protocols`,

  // Advanced Clinical Topics
  periprostheticFracture: `
Periprosthetic Fracture requirements:
- Reference Vancouver classification for hip
- Include implant stability assessment
- Show fixation options by classification
- Reference revision vs ORIF decision points
- Include bone quality assessment
- Show infection workup protocol
- Reference rehabilitation modifications`,

  infectionManagement: `
Orthopedic Infection Management requirements:
- Include acute vs chronic osteomyelitis criteria
- Reference periprosthetic joint infection (PJI) criteria
- Show culture and biopsy protocols
- Include antibiotic selection principles
- Reference surgical debridement indications
- Show DAIR vs revision decision tree
- Include suppression therapy criteria`,

  musculoskeletalOncology: `
Musculoskeletal Oncology requirements:
- Include staging workup (imaging, biopsy)
- Reference Enneking staging system
- Show biopsy principles (percutaneous vs open)
- Include limb salvage vs amputation criteria
- Reference wide excision margins
- Show reconstruction options
- Include adjuvant therapy integration`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Orthopedics-specific few-shot examples
 */
export const ORTHOPEDICS_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a flowchart for distal radius fracture management',
    output: `flowchart TD
    A[("Distal Radius\\nFracture")] --> B["X-ray AP + Lateral"]
    B --> C{"Acceptable\\nAlignment?"}

    C -->|"Yes\\nNon-displaced"| D["Sugar Tong Splint"]
    D --> E["Follow-up 1 week"]
    E --> F{"Maintained\\nReduction?"}
    F -->|"Yes"| G["Short Arm Cast 4-6 wks"]
    F -->|"No"| H["Consider Surgery"]

    C -->|"No\\nDisplaced"| I{"Reducible?"}
    I -->|"Yes"| J["Closed Reduction"]
    J --> K["Post-Reduction X-ray"]
    K --> L{"Acceptable?"}
    L -->|"Yes"| D
    L -->|"No"| H
    I -->|"No"| H

    H --> M{"Fracture Pattern"}
    M -->|"Intra-articular"| N["Volar Plate Fixation"]
    M -->|"Extra-articular"| O["Plate vs Pins"]
    M -->|"Highly Comminuted"| P["Ex-Fix + Adjunct"]

    G --> Q["ROM Exercises"]
    N & O & P --> Q

    style A fill:#DC143C,color:#fff
    style G fill:#228B22,color:#fff
    style N fill:#4169E1,color:#fff`,
  },
  {
    prompt: 'Create an ACL tear evaluation and treatment algorithm',
    output: `flowchart TD
    A[("Knee Injury\\nSuspected ACL")] --> B["History + Physical Exam"]
    B --> C{"Lachman Test\\nPivot Shift?"}

    C -->|"Positive"| D["MRI Knee"]
    C -->|"Negative"| E["Consider Other Dx"]

    D --> F{"ACL Tear\\nConfirmed?"}
    F -->|"Yes"| G{"Associated\\nInjuries?"}
    F -->|"No"| E

    G -->|"Meniscus Tear"| H["Plan Meniscal Repair"]
    G -->|"MCL/LCL"| I["Brace + Staged Surgery"]
    G -->|"Isolated ACL"| J{"Patient Factors"}

    J --> K{"Activity Level\\nAge?"}
    K -->|"Young, Active\\nHigh-demand Sport"| L["ACL Reconstruction"]
    K -->|"Older, Low Demand\\nSedentary"| M["Consider Non-Op"]

    L --> N{"Graft Selection"}
    N --> N1["BTB Autograft"]
    N --> N2["Hamstring Autograft"]
    N --> N3["Quad Tendon"]
    N --> N4["Allograft"]

    M --> O["PT + Bracing"]
    O --> P{"Instability\\nPersists?"}
    P -->|"Yes"| L
    P -->|"No"| Q["Continue Non-Op"]

    N1 & N2 & N3 & N4 --> R["Post-Op Rehab\\n9-12 months"]
    R --> S["Return to Sport Testing"]

    style A fill:#FFA500,color:#000
    style L fill:#4169E1,color:#fff
    style R fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a hip fracture classification and treatment decision tree',
    output: `flowchart TD
    A[("Hip Fracture")] --> B["AP + Lateral X-ray"]
    B --> C{"Fracture\\nLocation?"}

    C -->|"Femoral Neck"| D{"Displacement?\\nGarden Class"}
    C -->|"Intertrochanteric"| E{"Stability?"}
    C -->|"Subtrochanteric"| F["IM Nail\\n(Cephalomedullary)"]

    D -->|"Garden I-II\\nNon-displaced"| G{"Patient Age?"}
    D -->|"Garden III-IV\\nDisplaced"| H{"Age + Function?"}

    G -->|"<65 years"| I["Cannulated Screws"]
    G -->|">65 years"| J["Consider Arthroplasty"]

    H -->|"<65, Active"| K["Open Reduction\\nInternal Fixation"]
    H -->|"65-80, Active"| L["Total Hip Arthroplasty"]
    H -->|">80 or Low Demand"| M["Hemiarthroplasty"]

    E -->|"Stable\\n(2-part)"| N["Sliding Hip Screw"]
    E -->|"Unstable\\n(3-4 part)"| O["IM Nail"]
    E -->|"Reverse Oblique"| O

    subgraph PreOp["Pre-Op Optimization"]
        P1["DVT Prophylaxis"]
        P2["Optimize Comorbidities"]
        P3["Surgery <24-48hrs"]
    end

    I & J & K & L & M & N & O --> PreOp
    PreOp --> Q["Post-Op Mobilization"]
    Q --> R["PT + Weight Bearing Protocol"]

    style A fill:#DC143C,color:#fff
    style L fill:#4169E1,color:#fff
    style M fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a spine red flags screening flowchart for back pain',
    output: `flowchart TD
    A[("Low Back Pain\\nPresentation")] --> B{"RED FLAGS\\nScreening"}

    B --> C{"Cauda Equina\\nSyndrome?"}
    C -->|"Saddle anesthesia\\nBladder dysfunction\\nBilateral weakness"| D["EMERGENCY MRI\\nUrgent Decompression"]

    B --> E{"Infection?"}
    E -->|"Fever, IVDU\\nImmunocompromised\\nRecent procedure"| F["Labs + MRI\\nAntibiotics"]

    B --> G{"Malignancy?"}
    G -->|"History of cancer\\nUnexplained weight loss\\nAge >50 with new pain"| H["Imaging + Labs\\nOncology Referral"]

    B --> H1{"Fracture?"}
    H1 -->|"Trauma\\nOsteoporosis\\nSteroid use"| I["X-ray ± CT\\nBracing vs Surgery"]

    C & E & G & H1 -->|"No Red Flags"| J{"Duration?"}

    J -->|"<4 weeks\\nAcute"| K["Conservative Tx"]
    K --> K1["NSAIDs"]
    K --> K2["Activity Modification"]
    K --> K3["PT"]

    J -->|"4-12 weeks\\nSubacute"| L["Consider Imaging"]
    L --> M["X-ray Lumbar Spine"]

    J -->|">12 weeks\\nChronic"| N["MRI if Radiculopathy"]
    N --> O{"Surgical\\nCandidate?"}
    O -->|"Yes"| P["Spine Surgery Referral"]
    O -->|"No"| Q["Pain Management\\nMultidisciplinary"]

    style D fill:#DC143C,color:#fff
    style F fill:#FFA500,color:#000
    style K fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create an Ottawa Ankle Rules decision flowchart',
    output: `flowchart TD
    A[("Ankle/Foot\\nInjury")] --> B["Apply Ottawa Rules"]

    B --> C{"Ankle X-ray\\nIndicated?"}

    C --> D{"Pain in\\nMalleolar Zone?"}
    D -->|"Yes"| E{"Bone Tenderness\\nPosterior Edge\\nDistal 6cm?"}
    E -->|"Yes"| F["ANKLE X-RAY"]
    E -->|"No"| G{"Unable to\\nBear Weight\\n4 Steps?"}
    G -->|"Yes"| F
    G -->|"No"| H["No Ankle X-ray Needed"]

    D -->|"No"| I{"Pain in\\nMidfoot Zone?"}

    I --> J{"Foot X-ray\\nIndicated?"}
    J --> K{"Bone Tenderness\\nBase 5th MT?"}
    K -->|"Yes"| L["FOOT X-RAY"]
    K -->|"No"| M{"Bone Tenderness\\nNavicular?"}
    M -->|"Yes"| L
    M -->|"No"| N{"Unable to\\nBear Weight\\n4 Steps?"}
    N -->|"Yes"| L
    N -->|"No"| O["No Foot X-ray Needed"]

    F --> P{"Fracture?"}
    P -->|"Yes"| Q["Ortho Consult\\nImmobilize"]
    P -->|"No"| R["Soft Tissue Injury"]

    L --> S{"Fracture?"}
    S -->|"Yes"| Q
    S -->|"No"| R

    H & O --> R
    R --> T["RICE\\nWeight Bear as Tolerated"]

    style F fill:#FFA500,color:#000
    style L fill:#FFA500,color:#000
    style H fill:#228B22,color:#fff
    style O fill:#228B22,color:#fff`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

export default {
  ORTHOPEDICS_DOMAIN_PROMPT,
  ORTHOPEDICS_PROMPTS,
  ORTHOPEDICS_FEW_SHOT_EXAMPLES,
};
