/**
 * orthopedics.ts
 * Orthopedics diagram templates for FINNISH
 *
 * Contains comprehensive templates for orthopedic medicine including:
 * - Clinical decision algorithms
 * - Diagnostic flowcharts
 * - Anatomical diagrams
 * - Procedure illustrations
 * - Data visualization templates
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// CLINICAL DECISION TREES
// =============================================================================

/**
 * Fracture Management Algorithm template
 */
export const fractureManagement: DiagramTemplate = {
  id: 'ortho-fracture-management',
  name: 'Fracture Management Algorithm',
  description: 'Decision pathway for fracture evaluation and treatment selection',
  domain: 'medicine',
  promptTemplate: `Create a fracture management algorithm flowchart:
- Fracture location: {{fractureLocation}}
- Fracture type: {{fractureType}}
- Open vs closed: {{openClosed}}
- Displacement: {{displacement}}
- Patient factors: {{patientFactors}}
- Treatment options: {{treatmentOptions}}
- Follow-up protocol: {{followUpProtocol}}
{{#additionalNotes}}Additional considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'fractureLocation',
    'fractureType',
    'openClosed',
    'displacement',
    'patientFactors',
    'treatmentOptions',
    'followUpProtocol',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("🦴 Fracture\\nIdentified")] --> B{"Open or\\nClosed?"}
    B -->|"Open"| C["🚨 Emergent OR"]
    C --> C1["I&D + Fixation"]
    B -->|"Closed"| D{"Displaced?"}
    D -->|"Yes"| E{"Stable\\nPattern?"}
    E -->|"Yes"| F["Closed Reduction"]
    E -->|"No"| G["ORIF"]
    D -->|"No"| H["Immobilization"]
    F --> I["Cast/Splint"]
    G --> J["Plate/Screws/IM Nail"]
    style C fill:#DC143C,color:#fff
    style H fill:#228B22,color:#fff`,
};

/**
 * Low Back Pain Evaluation template
 */
export const lowBackPainEvaluation: DiagramTemplate = {
  id: 'ortho-low-back-pain',
  name: 'Low Back Pain Evaluation Algorithm',
  description: 'Systematic approach to low back pain diagnosis and management',
  domain: 'medicine',
  promptTemplate: `Create a low back pain evaluation flowchart:
- Duration: {{duration}}
- Red flags: {{redFlags}}
- Neurological deficits: {{neurologicalDeficits}}
- Imaging indications: {{imagingIndications}}
- Conservative treatment: {{conservativeTreatment}}
- Referral criteria: {{referralCriteria}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'duration',
    'redFlags',
    'neurologicalDeficits',
    'imagingIndications',
    'conservativeTreatment',
    'referralCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("🩻 Low Back Pain")] --> B{"Red Flags?"}
    B -->|"Yes"| C["🚨 Urgent Imaging"]
    C --> C1["MRI Spine"]
    B -->|"No"| D{"Duration?"}
    D -->|"<6 weeks"| E["Conservative Tx"]
    D -->|">6 weeks"| F["Consider Imaging"]
    E --> E1["NSAIDs + PT"]
    F --> G{"Radiculopathy?"}
    G -->|"Yes"| H["MRI + Specialist"]
    G -->|"No"| I["X-ray First"]
    style C fill:#DC143C,color:#fff
    style E fill:#228B22,color:#fff`,
};

/**
 * Joint Pain Workup template
 */
export const jointPainWorkup: DiagramTemplate = {
  id: 'ortho-joint-pain-workup',
  name: 'Joint Pain Workup Algorithm',
  description: 'Systematic evaluation of joint pain with differential diagnosis',
  domain: 'medicine',
  promptTemplate: `Create a joint pain workup flowchart:
- Joint affected: {{jointAffected}}
- Acute vs chronic: {{acuteChronic}}
- Inflammatory features: {{inflammatoryFeatures}}
- Lab workup: {{labWorkup}}
- Imaging sequence: {{imagingSequence}}
- Differential diagnosis: {{differentialDiagnosis}}
- Treatment pathway: {{treatmentPathway}}
{{#additionalNotes}}Additional findings: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'jointAffected',
    'acuteChronic',
    'inflammatoryFeatures',
    'labWorkup',
    'imagingSequence',
    'differentialDiagnosis',
    'treatmentPathway',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("🦵 Joint Pain")] --> B{"Inflammatory\\nSigns?"}
    B -->|"Yes"| C{"Monoarticular?"}
    C -->|"Yes"| D["⚠️ Rule out Septic"]
    D --> D1["Aspirate Joint"]
    C -->|"No"| E["RA/SLE Workup"]
    B -->|"No"| F{"Trauma?"}
    F -->|"Yes"| G["X-ray + Exam"]
    F -->|"No"| H["Degenerative?"]
    H --> I["OA Workup"]
    style D fill:#FFA500,color:#000
    style I fill:#4169E1,color:#fff`,
};

/**
 * Osteoporosis Screening and Treatment template
 */
export const osteoporosisManagement: DiagramTemplate = {
  id: 'ortho-osteoporosis',
  name: 'Osteoporosis Screening and Treatment',
  description: 'FRAX-based screening and treatment algorithm for osteoporosis',
  domain: 'medicine',
  promptTemplate: `Create an osteoporosis management flowchart:
- Screening criteria: {{screeningCriteria}}
- DEXA interpretation: {{dexaInterpretation}}
- FRAX score: {{fraxScore}}
- Treatment thresholds: {{treatmentThresholds}}
- Medication options: {{medicationOptions}}
- Monitoring protocol: {{monitoringProtocol}}
{{#additionalNotes}}Risk factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'screeningCriteria',
    'dexaInterpretation',
    'fraxScore',
    'treatmentThresholds',
    'medicationOptions',
    'monitoringProtocol',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("🦴 Osteoporosis\\nScreening")] --> B{"Age/Risk?"}
    B -->|"F≥65, M≥70"| C["DEXA Scan"]
    B -->|"Younger + RF"| C
    C --> D{"T-Score?"}
    D -->|"≤-2.5"| E["Osteoporosis"]
    D -->|"-1 to -2.5"| F["Osteopenia"]
    D -->|">-1"| G["Normal"]
    E --> H["Treat: Bisphosphonate"]
    F --> I["Calculate FRAX"]
    I -->|"High Risk"| H
    I -->|"Low Risk"| J["Lifestyle + Ca/VitD"]
    style E fill:#DC143C,color:#fff
    style G fill:#228B22,color:#fff`,
};

/**
 * Sports Injury Assessment template
 */
export const sportsInjuryAssessment: DiagramTemplate = {
  id: 'ortho-sports-injury',
  name: 'Sports Injury Assessment Algorithm',
  description: 'Systematic evaluation of acute sports injuries',
  domain: 'medicine',
  promptTemplate: `Create a sports injury assessment flowchart:
- Mechanism of injury: {{mechanism}}
- Anatomic location: {{location}}
- Physical exam findings: {{examFindings}}
- Imaging recommendations: {{imaging}}
- Severity grading: {{severityGrade}}
- Return to play criteria: {{returnToPlay}}
{{#additionalNotes}}Sport-specific considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'mechanism',
    'location',
    'examFindings',
    'imaging',
    'severityGrade',
    'returnToPlay',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("⚽ Sports Injury")] --> B{"Able to\\nBear Weight?"}
    B -->|"No"| C["X-ray Required"]
    B -->|"Yes"| D{"Instability?"}
    C --> E{"Fracture?"}
    E -->|"Yes"| F["Ortho Consult"]
    E -->|"No"| G["Soft Tissue Injury"]
    D -->|"Yes"| H["MRI Ligaments"]
    D -->|"No"| I["Grade Sprain/Strain"]
    I --> J["RICE + Rehab"]
    style F fill:#DC143C,color:#fff
    style J fill:#228B22,color:#fff`,
};

/**
 * Preoperative Orthopedic Evaluation template
 */
export const preopOrthoEval: DiagramTemplate = {
  id: 'ortho-preop-eval',
  name: 'Preoperative Orthopedic Evaluation',
  description: 'Pre-surgical optimization checklist for orthopedic procedures',
  domain: 'medicine',
  promptTemplate: `Create a preoperative evaluation flowchart:
- Procedure planned: {{procedure}}
- Medical comorbidities: {{comorbidities}}
- Anesthesia considerations: {{anesthesia}}
- VTE prophylaxis: {{vteProphylaxis}}
- Antibiotic protocol: {{antibioticProtocol}}
- Blood management: {{bloodManagement}}
- Discharge planning: {{dischargePlanning}}
{{#additionalNotes}}Optimization needs: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'procedure',
    'comorbidities',
    'anesthesia',
    'vteProphylaxis',
    'antibioticProtocol',
    'bloodManagement',
    'dischargePlanning',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("🏥 Pre-Op\\nEvaluation")] --> B["Medical Clearance"]
    B --> B1["Cardiac Risk"]
    B --> B2["Pulmonary"]
    B --> B3["Diabetes/A1c"]
    A --> C["Medication Review"]
    C --> C1["Hold Anticoagulants"]
    C --> C2["Continue Beta-blockers"]
    A --> D["Infection Prevention"]
    D --> D1["Nasal Decolonization"]
    D --> D2["Skin Prep"]
    A --> E["VTE Protocol"]
    E --> E1["Mechanical + Chemical"]
    style A fill:#4169E1,color:#fff`,
};

/**
 * Post-operative Rehabilitation template
 */
export const postopRehab: DiagramTemplate = {
  id: 'ortho-postop-rehab',
  name: 'Post-operative Rehabilitation Protocol',
  description: 'Staged rehabilitation pathway after orthopedic surgery',
  domain: 'medicine',
  promptTemplate: `Create a post-operative rehabilitation flowchart:
- Procedure type: {{procedureType}}
- Weight bearing status: {{weightBearing}}
- ROM restrictions: {{romRestrictions}}
- Phase 1 goals: {{phase1Goals}}
- Phase 2 goals: {{phase2Goals}}
- Phase 3 goals: {{phase3Goals}}
- Return to activity criteria: {{returnCriteria}}
{{#additionalNotes}}Special precautions: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'procedureType',
    'weightBearing',
    'romRestrictions',
    'phase1Goals',
    'phase2Goals',
    'phase3Goals',
    'returnCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("🦿 Post-Op\\nDay 0")] --> B["Phase 1: Protection"]
    B --> B1["Pain Control"]
    B --> B2["Edema Management"]
    B --> B3["Gentle ROM"]
    B --> C["Phase 2: Early Mobility"]
    C --> C1["Progressive WB"]
    C --> C2["Strength Training"]
    C --> D["Phase 3: Strengthening"]
    D --> D1["Sport-Specific"]
    D --> D2["Proprioception"]
    D --> E["Return to Activity"]
    style A fill:#DC143C,color:#fff
    style E fill:#228B22,color:#fff`,
};

// =============================================================================
// ANATOMICAL DIAGRAMS
// =============================================================================

/**
 * Skeletal System Overview template
 */
export const skeletalSystem: DiagramTemplate = {
  id: 'ortho-skeletal-system',
  name: 'Skeletal System Overview',
  description: 'Complete skeletal anatomy with labeled regions',
  domain: 'medicine',
  promptTemplate: `Create a skeletal system diagram:
- Axial skeleton components: {{axialSkeleton}}
- Appendicular skeleton: {{appendicularSkeleton}}
- Bone types: {{boneTypes}}
- Key landmarks: {{landmarks}}
- Joint types: {{jointTypes}}
- Annotations: {{annotations}}
{{#additionalNotes}}Focus areas: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'axialSkeleton',
    'appendicularSkeleton',
    'boneTypes',
    'landmarks',
    'jointTypes',
    'annotations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Axial["Axial Skeleton (80)"]
        SKULL["Skull (22)"]
        SPINE["Vertebrae (26)"]
        RIBS["Ribs + Sternum (25)"]
        HYOID["Hyoid (1)"]
    end
    subgraph Appendicular["Appendicular (126)"]
        UE["Upper Extremity (64)"]
        LE["Lower Extremity (62)"]
    end
    SKULL --> SPINE --> RIBS
    UE --> SHOULDER["Shoulder Girdle"]
    LE --> PELVIS["Pelvic Girdle"]
    style Axial fill:#4169E1,color:#fff
    style Appendicular fill:#228B22,color:#fff`,
};

/**
 * Joint Anatomy template
 */
export const jointAnatomy: DiagramTemplate = {
  id: 'ortho-joint-anatomy',
  name: 'Synovial Joint Anatomy',
  description: 'Detailed anatomy of synovial joint structures',
  domain: 'medicine',
  promptTemplate: `Create a joint anatomy diagram:
- Joint type: {{jointType}}
- Articular surfaces: {{articularSurfaces}}
- Ligaments: {{ligaments}}
- Cartilage: {{cartilage}}
- Synovial structures: {{synovialStructures}}
- Surrounding muscles: {{muscles}}
{{#additionalNotes}}Pathology to highlight: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'jointType',
    'articularSurfaces',
    'ligaments',
    'cartilage',
    'synovialStructures',
    'muscles',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Joint["Synovial Joint"]
        BONE1["Bone 1"] --> CART1["Articular Cartilage"]
        CART1 --> SPACE["Joint Space"]
        SPACE --> CART2["Articular Cartilage"]
        CART2 --> BONE2["Bone 2"]
    end
    subgraph Structures["Supporting Structures"]
        CAP["Joint Capsule"]
        SYN["Synovial Membrane"]
        LIG["Ligaments"]
        BURSA["Bursae"]
    end
    CAP --> Joint
    SYN --> SPACE`,
};

/**
 * Spine Anatomy template
 */
export const spineAnatomy: DiagramTemplate = {
  id: 'ortho-spine-anatomy',
  name: 'Spinal Column Anatomy',
  description: 'Vertebral column anatomy with segments and structures',
  domain: 'medicine',
  promptTemplate: `Create a spine anatomy diagram:
- Cervical segment: {{cervical}}
- Thoracic segment: {{thoracic}}
- Lumbar segment: {{lumbar}}
- Sacral/coccyx: {{sacral}}
- Intervertebral disc: {{disc}}
- Spinal cord/nerves: {{spinalCord}}
{{#additionalNotes}}Pathology shown: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'cervical',
    'thoracic',
    'lumbar',
    'sacral',
    'disc',
    'spinalCord',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Spine["Vertebral Column"]
        C["Cervical (7)"] --> T["Thoracic (12)"]
        T --> L["Lumbar (5)"]
        L --> S["Sacrum (5 fused)"]
        S --> CX["Coccyx (4 fused)"]
    end
    subgraph Curves["Curvatures"]
        CL["Cervical Lordosis"]
        TK["Thoracic Kyphosis"]
        LL["Lumbar Lordosis"]
    end
    C --> CL
    T --> TK
    L --> LL`,
};

/**
 * Fracture Classification template
 */
export const fractureClassification: DiagramTemplate = {
  id: 'ortho-fracture-classification',
  name: 'Fracture Classification System',
  description: 'AO/OTA and descriptive fracture classification',
  domain: 'medicine',
  promptTemplate: `Create a fracture classification diagram:
- Bone involved: {{bone}}
- Location (proximal/shaft/distal): {{location}}
- Pattern types: {{patterns}}
- Displacement: {{displacement}}
- Open grading (Gustilo): {{gustiloGrade}}
- Stability assessment: {{stability}}
{{#additionalNotes}}Treatment implications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'bone',
    'location',
    'patterns',
    'displacement',
    'gustiloGrade',
    'stability',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Fracture"] --> B{"Pattern"}
    B --> B1["Transverse"]
    B --> B2["Oblique"]
    B --> B3["Spiral"]
    B --> B4["Comminuted"]
    A --> C{"Displacement"}
    C --> C1["Non-displaced"]
    C --> C2["Minimally displaced"]
    C --> C3["Displaced"]
    A --> D{"Open Grade"}
    D --> D1["I: <1cm"]
    D --> D2["II: 1-10cm"]
    D --> D3["III: >10cm/contaminated"]
    style D3 fill:#DC143C,color:#fff`,
};

/**
 * Muscle Groups template
 */
export const muscleGroups: DiagramTemplate = {
  id: 'ortho-muscle-groups',
  name: 'Muscle Group Anatomy',
  description: 'Major muscle groups with origins, insertions, and actions',
  domain: 'medicine',
  promptTemplate: `Create a muscle group diagram:
- Region: {{region}}
- Superficial muscles: {{superficialMuscles}}
- Deep muscles: {{deepMuscles}}
- Innervation: {{innervation}}
- Blood supply: {{bloodSupply}}
- Primary actions: {{actions}}
{{#additionalNotes}}Clinical correlations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'region',
    'superficialMuscles',
    'deepMuscles',
    'innervation',
    'bloodSupply',
    'actions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Anterior["Anterior Thigh"]
        QUAD["Quadriceps"]
        QUAD --> RF["Rectus Femoris"]
        QUAD --> VL["Vastus Lateralis"]
        QUAD --> VM["Vastus Medialis"]
        QUAD --> VI["Vastus Intermedius"]
    end
    subgraph Posterior["Posterior Thigh"]
        HAM["Hamstrings"]
        HAM --> BF["Biceps Femoris"]
        HAM --> SM["Semimembranosus"]
        HAM --> ST["Semitendinosus"]
    end
    QUAD -->|"Extends"| KNEE["Knee"]
    HAM -->|"Flexes"| KNEE`,
};

// =============================================================================
// PROCEDURE ILLUSTRATIONS
// =============================================================================

/**
 * Fracture Reduction template
 */
export const fractureReduction: DiagramTemplate = {
  id: 'ortho-fracture-reduction',
  name: 'Fracture Reduction Technique',
  description: 'Step-by-step closed and open reduction procedures',
  domain: 'medicine',
  promptTemplate: `Create a fracture reduction flowchart:
- Fracture type: {{fractureType}}
- Anesthesia/analgesia: {{anesthesia}}
- Reduction maneuver: {{reductionManeuver}}
- Assessment of reduction: {{assessment}}
- Immobilization method: {{immobilization}}
- Post-reduction imaging: {{imaging}}
{{#additionalNotes}}Complications to monitor: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'fractureType',
    'anesthesia',
    'reductionManeuver',
    'assessment',
    'immobilization',
    'imaging',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Fracture\\nIdentified"] --> B["Analgesia/Sedation"]
    B --> C["Apply Traction"]
    C --> D["Correct Angulation"]
    D --> E["Correct Rotation"]
    E --> F{"Adequate\\nReduction?"}
    F -->|"Yes"| G["Apply Immobilization"]
    F -->|"No"| H["Consider ORIF"]
    G --> I["Post-Reduction X-ray"]
    I --> J{"Maintained?"}
    J -->|"Yes"| K["Cast Care Instructions"]
    J -->|"No"| L["Revise/OR"]
    style K fill:#228B22,color:#fff
    style H fill:#FFA500,color:#000`,
};

/**
 * Joint Injection template
 */
export const jointInjection: DiagramTemplate = {
  id: 'ortho-joint-injection',
  name: 'Joint Injection Procedure',
  description: 'Technique and indications for joint injections',
  domain: 'medicine',
  promptTemplate: `Create a joint injection procedure flowchart:
- Indication: {{indication}}
- Joint targeted: {{joint}}
- Approach/landmarks: {{approach}}
- Injectate: {{injectate}}
- Volume: {{volume}}
- Contraindications: {{contraindications}}
- Post-procedure: {{postProcedure}}
{{#additionalNotes}}Ultrasound guidance: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'indication',
    'joint',
    'approach',
    'injectate',
    'volume',
    'contraindications',
    'postProcedure',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Joint Injection\\nIndicated"] --> B{"Contraindications?"}
    B -->|"Infection/Coagulopathy"| C["❌ Defer"]
    B -->|"None"| D["Consent + Position"]
    D --> E["Sterile Prep"]
    E --> F["Identify Landmarks"]
    F --> G{"US Guidance?"}
    G -->|"Yes"| H["Visualize Needle"]
    G -->|"No"| I["Anatomic Approach"]
    H --> J["Aspirate + Inject"]
    I --> J
    J --> K["Bandage + Instructions"]
    style C fill:#DC143C,color:#fff
    style K fill:#228B22,color:#fff`,
};

/**
 * Arthroscopy Indications template
 */
export const arthroscopyIndications: DiagramTemplate = {
  id: 'ortho-arthroscopy',
  name: 'Arthroscopy Indications',
  description: 'Decision algorithm for arthroscopic surgery',
  domain: 'medicine',
  promptTemplate: `Create an arthroscopy indications flowchart:
- Joint: {{joint}}
- Diagnostic indications: {{diagnosticIndications}}
- Therapeutic indications: {{therapeuticIndications}}
- Preoperative workup: {{preoperativeWorkup}}
- Expected procedures: {{procedures}}
- Rehabilitation timeline: {{rehabilitation}}
{{#additionalNotes}}Alternative treatments: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'joint',
    'diagnosticIndications',
    'therapeuticIndications',
    'preoperativeWorkup',
    'procedures',
    'rehabilitation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Knee Symptoms"] --> B{"Failed Conservative\\nTreatment?"}
    B -->|"No"| C["Continue PT + NSAIDs"]
    B -->|"Yes"| D["MRI Evaluation"]
    D --> E{"Findings?"}
    E -->|"Meniscus Tear"| F["Arthroscopic Repair/Resection"]
    E -->|"ACL Tear"| G["ACL Reconstruction"]
    E -->|"Loose Body"| H["Arthroscopic Removal"]
    E -->|"Chondral Defect"| I["Microfracture/OATS"]
    F & G & H & I --> J["Post-Op Rehab"]
    style C fill:#228B22,color:#fff
    style J fill:#4169E1,color:#fff`,
};

// =============================================================================
// DATA VISUALIZATION TEMPLATES
// =============================================================================

/**
 * Fracture Healing Timeline template
 */
export const fractureHealingTimeline: DiagramTemplate = {
  id: 'ortho-healing-timeline',
  name: 'Fracture Healing Timeline',
  description: 'Stages and timeline of fracture healing',
  domain: 'medicine',
  promptTemplate: `Create a fracture healing timeline:
- Inflammatory phase: {{inflammatoryPhase}}
- Soft callus phase: {{softCallus}}
- Hard callus phase: {{hardCallus}}
- Remodeling phase: {{remodeling}}
- Expected union time: {{unionTime}}
- Factors affecting healing: {{factors}}
{{#additionalNotes}}Complications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'inflammatoryPhase',
    'softCallus',
    'hardCallus',
    'remodeling',
    'unionTime',
    'factors',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Timeline["Fracture Healing Timeline"]
        A["Day 0-7\\nInflammatory"] --> B["Week 1-3\\nSoft Callus"]
        B --> C["Week 3-12\\nHard Callus"]
        C --> D["Month 3-12+\\nRemodeling"]
    end
    subgraph Process["Biological Process"]
        A1["Hematoma\\nInflammation"] --> B1["Fibrocartilage\\nFormation"]
        B1 --> C1["Woven Bone\\nOssification"]
        C1 --> D1["Lamellar Bone\\nRemodeling"]
    end
    A --- A1
    B --- B1
    C --- C1
    D --- D1`,
};

/**
 * Ottawa Ankle/Knee Rules template
 */
export const ottawaRules: DiagramTemplate = {
  id: 'ortho-ottawa-rules',
  name: 'Ottawa Ankle and Knee Rules',
  description: 'Clinical decision rules for imaging after ankle/knee injury',
  domain: 'medicine',
  promptTemplate: `Create an Ottawa rules decision flowchart:
- Ankle rule criteria: {{ankleRuleCriteria}}
- Foot rule criteria: {{footRuleCriteria}}
- Knee rule criteria: {{kneeRuleCriteria}}
- Sensitivity/specificity: {{accuracy}}
- Exclusion criteria: {{exclusions}}
- Application notes: {{applicationNotes}}
{{#additionalNotes}}Clinical pearls: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ankleRuleCriteria',
    'footRuleCriteria',
    'kneeRuleCriteria',
    'accuracy',
    'exclusions',
    'applicationNotes',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Ankle/Foot Injury"] --> B{"Ottawa Ankle Rules"}
    B --> C{"Bone tenderness\\nposterior 6cm\\nmalleolus?"}
    B --> D{"Unable to\\nbear weight\\n4 steps?"}
    C -->|"Yes"| E["X-ray Indicated"]
    D -->|"Yes"| E
    C -->|"No"| F{"Navicular or\\n5th MT tenderness?"}
    F -->|"Yes"| G["Foot X-ray"]
    F -->|"No"| H["No X-ray Needed"]
    D -->|"No"| H
    style E fill:#FFA500,color:#000
    style H fill:#228B22,color:#fff`,
};

/**
 * Range of Motion Assessment template
 */
export const romAssessment: DiagramTemplate = {
  id: 'ortho-rom-assessment',
  name: 'Range of Motion Assessment',
  description: 'Standard ROM measurements for major joints',
  domain: 'medicine',
  promptTemplate: `Create a ROM assessment reference:
- Joint: {{joint}}
- Normal values: {{normalValues}}
- Measurement technique: {{technique}}
- Comparison to contralateral: {{comparison}}
- Functional limitations: {{functionalLimitations}}
- Documentation format: {{documentation}}
{{#additionalNotes}}Pathologic patterns: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'joint',
    'normalValues',
    'technique',
    'comparison',
    'functionalLimitations',
    'documentation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Shoulder["Shoulder ROM"]
        S1["Flexion: 0-180°"]
        S2["Extension: 0-60°"]
        S3["Abduction: 0-180°"]
        S4["IR: 0-70°"]
        S5["ER: 0-90°"]
    end
    subgraph Knee["Knee ROM"]
        K1["Flexion: 0-135°"]
        K2["Extension: 0°"]
    end
    subgraph Hip["Hip ROM"]
        H1["Flexion: 0-120°"]
        H2["Extension: 0-30°"]
        H3["Abduction: 0-45°"]
        H4["IR: 0-35°"]
        H5["ER: 0-45°"]
    end`,
};

// =============================================================================
// ADDITIONAL TEMPLATES - COMPLETE CHECKPOINT
// =============================================================================

/**
 * Hip Fracture Classification template
 */
export const hipFractureClassification: DiagramTemplate = {
  id: 'ortho-hip-fracture-classification',
  name: 'Hip Fracture Classification',
  description: 'Classification system for femoral neck and intertrochanteric fractures',
  domain: 'medicine',
  promptTemplate: `Create a hip fracture classification diagram:
- Fracture location: {{fractureLocation}}
- Garden classification (FN): {{gardenClass}}
- AO/OTA classification: {{aoOta}}
- Stability assessment: {{stability}}
- Treatment implications: {{treatmentImplications}}
- Surgical options: {{surgicalOptions}}
{{#additionalNotes}}Patient factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'fractureLocation',
    'gardenClass',
    'aoOta',
    'stability',
    'treatmentImplications',
    'surgicalOptions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Hip Fracture"] --> B{"Location?"}
    B -->|"Femoral Neck"| C{"Garden Class"}
    B -->|"Intertrochanteric"| D{"Stability"}
    B -->|"Subtrochanteric"| E["IM Nail"]
    C -->|"I-II Non-displaced"| F["Screws vs Arthroplasty"]
    C -->|"III-IV Displaced"| G["Arthroplasty"]
    D -->|"Stable 2-part"| H["Sliding Hip Screw"]
    D -->|"Unstable 3-4 part"| I["IM Nail"]
    G --> G1["THA vs Hemi"]
    style A fill:#DC143C,color:#fff
    style G fill:#4169E1,color:#fff`,
};

/**
 * Shoulder Instability Algorithm template
 */
export const shoulderInstability: DiagramTemplate = {
  id: 'ortho-shoulder-instability',
  name: 'Shoulder Instability Algorithm',
  description: 'Evaluation and management of glenohumeral instability',
  domain: 'medicine',
  promptTemplate: `Create a shoulder instability management flowchart:
- Type of instability: {{instabilityType}}
- Direction (anterior/posterior/multi): {{direction}}
- First episode vs recurrent: {{recurrence}}
- Imaging findings: {{imagingFindings}}
- Bone loss assessment: {{boneLoss}}
- Surgical options: {{surgicalOptions}}
- Rehabilitation protocol: {{rehabilitation}}
{{#additionalNotes}}Sport-specific factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'instabilityType',
    'direction',
    'recurrence',
    'imagingFindings',
    'boneLoss',
    'surgicalOptions',
    'rehabilitation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Shoulder Instability"] --> B{"First Episode\\nor Recurrent?"}
    B -->|"First"| C["Sling + PT"]
    B -->|"Recurrent"| D["MRI Arthrogram"]
    C --> E{"Recurrence?"}
    E -->|"Yes"| D
    E -->|"No"| F["Continue PT"]
    D --> G{"Bone Loss\\n>20%?"}
    G -->|"Yes"| H["Latarjet Procedure"]
    G -->|"No"| I["Arthroscopic Bankart"]
    I --> J["Post-Op Rehab"]
    H --> J
    style A fill:#FFA500,color:#000
    style I fill:#4169E1,color:#fff`,
};

/**
 * ACL Injury Management template
 */
export const aclInjuryManagement: DiagramTemplate = {
  id: 'ortho-acl-management',
  name: 'ACL Injury Management Algorithm',
  description: 'Evaluation and treatment pathway for ACL injuries',
  domain: 'medicine',
  promptTemplate: `Create an ACL injury management flowchart:
- Injury mechanism: {{mechanism}}
- Clinical examination: {{clinicalExam}}
- MRI findings: {{mriFindings}}
- Associated injuries: {{associatedInjuries}}
- Patient factors: {{patientFactors}}
- Graft options: {{graftOptions}}
- Rehabilitation timeline: {{rehabTimeline}}
{{#additionalNotes}}Return to sport criteria: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'mechanism',
    'clinicalExam',
    'mriFindings',
    'associatedInjuries',
    'patientFactors',
    'graftOptions',
    'rehabTimeline',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Suspected ACL Tear"] --> B["Lachman + Pivot Shift"]
    B -->|"Positive"| C["MRI Knee"]
    C --> D{"ACL Tear\\nConfirmed"}
    D --> E{"Activity Level"}
    E -->|"High Demand\\nSports"| F["ACL Reconstruction"]
    E -->|"Low Demand\\nSedentary"| G["Consider Non-Op"]
    F --> H{"Graft Choice"}
    H --> H1["BTB Autograft"]
    H --> H2["Hamstring"]
    H --> H3["Quad Tendon"]
    H --> H4["Allograft"]
    H1 & H2 & H3 & H4 --> I["Rehab 9-12 months"]
    I --> J["RTS Testing"]
    style F fill:#4169E1,color:#fff
    style J fill:#228B22,color:#fff`,
};

/**
 * Spine Surgical Approach Selection template
 */
export const spineSurgicalApproach: DiagramTemplate = {
  id: 'ortho-spine-surgical-approach',
  name: 'Spine Surgical Approach Selection',
  description: 'Decision algorithm for selecting spine surgical approach',
  domain: 'medicine',
  promptTemplate: `Create a spine surgical approach selection flowchart:
- Pathology type: {{pathologyType}}
- Spinal level: {{spinalLevel}}
- Anterior vs posterior pathology: {{apLocation}}
- Deformity considerations: {{deformity}}
- Approach options: {{approachOptions}}
- Instrumentation needs: {{instrumentation}}
- Complications to consider: {{complications}}
{{#additionalNotes}}Patient factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'pathologyType',
    'spinalLevel',
    'apLocation',
    'deformity',
    'approachOptions',
    'instrumentation',
    'complications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Spine Surgery\\nIndicated"] --> B{"Pathology\\nLocation?"}
    B -->|"Anterior\\n(Disc, Body)"| C{"Level?"}
    B -->|"Posterior\\n(Lamina, Facets)"| D["Posterior Approach"]
    B -->|"Circumferential"| E["Combined Approach"]
    C -->|"Cervical"| F["ACDF / Corpectomy"]
    C -->|"Thoracic"| G["Transthoracic"]
    C -->|"Lumbar"| H["ALIF / LLIF / OLIF"]
    D --> I["Laminectomy\\n+ Fusion"]
    E --> J["Staged or\\nSame Day"]
    H --> K{"Fusion Level"}
    K -->|"L5-S1"| L["ALIF"]
    K -->|"L2-L5"| M["LLIF/OLIF"]
    style A fill:#4169E1,color:#fff`,
};

/**
 * Carpal Tunnel Syndrome Management template
 */
export const carpalTunnelManagement: DiagramTemplate = {
  id: 'ortho-carpal-tunnel',
  name: 'Carpal Tunnel Syndrome Management',
  description: 'Evaluation and treatment algorithm for CTS',
  domain: 'medicine',
  promptTemplate: `Create a carpal tunnel syndrome management flowchart:
- Symptom severity: {{severity}}
- Clinical examination: {{clinicalExam}}
- Electrodiagnostic findings: {{emgNcs}}
- Conservative treatment: {{conservativeTreatment}}
- Injection therapy: {{injectionTherapy}}
- Surgical indications: {{surgicalIndications}}
- Surgical technique: {{surgicalTechnique}}
{{#additionalNotes}}Work-related factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'severity',
    'clinicalExam',
    'emgNcs',
    'conservativeTreatment',
    'injectionTherapy',
    'surgicalIndications',
    'surgicalTechnique',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Suspected CTS"] --> B["History + Physical"]
    B --> C{"Phalen's\\nTinel's\\nPositive?"}
    C -->|"Yes"| D{"Severity?"}
    C -->|"Unclear"| E["EMG/NCS"]
    E --> D
    D -->|"Mild"| F["Night Splinting\\nNSAIDs"]
    D -->|"Moderate"| G["Splint + Injection"]
    D -->|"Severe\\nThenar Atrophy"| H["Surgical Release"]
    F --> I{"Improved?"}
    I -->|"No 6-12 wks"| G
    G --> J{"Improved?"}
    J -->|"No"| H
    J -->|"Yes"| K["Continue\\nConservative"]
    H --> L["Open vs Endoscopic"]
    style H fill:#4169E1,color:#fff
    style K fill:#228B22,color:#fff`,
};

/**
 * Pediatric Fracture Salter-Harris template
 */
export const salterHarrisClassification: DiagramTemplate = {
  id: 'ortho-salter-harris',
  name: 'Salter-Harris Classification',
  description: 'Classification and management of pediatric physeal fractures',
  domain: 'medicine',
  promptTemplate: `Create a Salter-Harris classification diagram:
- Fracture type (I-V): {{type}}
- Location: {{location}}
- Mechanism: {{mechanism}}
- Growth plate involvement: {{physealInvolvement}}
- Prognosis: {{prognosis}}
- Treatment approach: {{treatment}}
- Follow-up protocol: {{followUp}}
{{#additionalNotes}}Growth disturbance risk: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'type',
    'location',
    'mechanism',
    'physealInvolvement',
    'prognosis',
    'treatment',
    'followUp',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Pediatric Fracture\\nInvolving Physis"] --> B{"Salter-Harris\\nType?"}
    B -->|"Type I"| C["Through Physis\\nOnly"]
    B -->|"Type II"| D["Physis +\\nMetaphysis"]
    B -->|"Type III"| E["Physis +\\nEpiphysis"]
    B -->|"Type IV"| F["Metaphysis +\\nPhysis + Epiphysis"]
    B -->|"Type V"| G["Crush Injury\\nto Physis"]
    C --> H["Cast\\nGood Prognosis"]
    D --> H
    E --> I["ORIF if Displaced\\nFair Prognosis"]
    F --> I
    G --> J["Poor Prognosis\\nGrowth Arrest Risk"]
    subgraph Risk["Growth Arrest Risk"]
        R1["I-II: Low"]
        R2["III-IV: Moderate"]
        R3["V: High"]
    end
    style G fill:#DC143C,color:#fff
    style H fill:#228B22,color:#fff`,
};

/**
 * Total Knee Arthroplasty Pathway template
 */
export const tkrPathway: DiagramTemplate = {
  id: 'ortho-tkr-pathway',
  name: 'Total Knee Replacement Pathway',
  description: 'Comprehensive pathway for TKA from indication to recovery',
  domain: 'medicine',
  promptTemplate: `Create a total knee replacement pathway flowchart:
- Indications: {{indications}}
- Preoperative optimization: {{preopOptimization}}
- Implant selection: {{implantSelection}}
- Surgical approach: {{surgicalApproach}}
- VTE prophylaxis: {{vteProphylaxis}}
- Rehabilitation protocol: {{rehabProtocol}}
- Milestones and discharge: {{milestones}}
{{#additionalNotes}}Complications to monitor: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'indications',
    'preopOptimization',
    'implantSelection',
    'surgicalApproach',
    'vteProphylaxis',
    'rehabProtocol',
    'milestones',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Knee OA\\nFailed Conservative Tx"] --> B["Preop Evaluation"]
    B --> B1["Medical Clearance"]
    B --> B2["Dental Clearance"]
    B --> B3["MRSA Screening"]
    B --> B4["PT Prehab"]
    B1 & B2 & B3 & B4 --> C["Surgery Day"]
    C --> D["TKA Performed"]
    D --> E["Post-Op Day 0"]
    E --> E1["Pain Management"]
    E --> E2["DVT Prophylaxis"]
    E --> E3["PT: Ambulation"]
    E1 & E2 & E3 --> F["POD 1-2"]
    F --> G{"Discharge\\nCriteria Met?"}
    G -->|"Yes"| H["Home vs SNF"]
    G -->|"No"| I["Continue Inpatient"]
    H --> J["Outpatient PT\\n6-12 weeks"]
    J --> K["ROM Goal: 0-120°"]
    K --> L["Return to Activities\\n3-6 months"]
    style D fill:#4169E1,color:#fff
    style L fill:#228B22,color:#fff`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All orthopedics templates
 */
export const orthopedicsTemplates: DiagramTemplate[] = [
  // Clinical Decision Trees (7)
  fractureManagement,
  lowBackPainEvaluation,
  jointPainWorkup,
  osteoporosisManagement,
  sportsInjuryAssessment,
  preopOrthoEval,
  postopRehab,
  // Anatomical Diagrams (5)
  skeletalSystem,
  jointAnatomy,
  spineAnatomy,
  fractureClassification,
  muscleGroups,
  // Procedure Illustrations (3)
  fractureReduction,
  jointInjection,
  arthroscopyIndications,
  // Data Visualization (3)
  fractureHealingTimeline,
  ottawaRules,
  romAssessment,
  // Additional Templates - COMPLETE Checkpoint (7)
  hipFractureClassification,
  shoulderInstability,
  aclInjuryManagement,
  spineSurgicalApproach,
  carpalTunnelManagement,
  salterHarrisClassification,
  tkrPathway,
];

export default orthopedicsTemplates;
