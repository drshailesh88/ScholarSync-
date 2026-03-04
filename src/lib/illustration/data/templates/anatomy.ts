/**
 * anatomy.ts
 * Anatomy diagram templates for FINNISH
 *
 * Contains comprehensive templates for human anatomy including:
 * - Body system overviews
 * - Organ cross-sections
 * - Structural comparisons
 * - Developmental anatomy
 * - Clinical anatomy correlations
 *
 * Total: 25 templates
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// SKELETAL SYSTEM TEMPLATES
// =============================================================================

export const skeletalOverview: DiagramTemplate = {
  id: 'anat-skeletal-overview',
  name: 'Skeletal System Overview',
  description: 'Complete overview of the axial and appendicular skeleton with bone counts',
  domain: 'biology',
  promptTemplate: `Create a skeletal system overview diagram:
- Axial skeleton components: {{axialComponents}}
- Appendicular skeleton components: {{appendicularComponents}}
- Total bone count: {{boneCount}}
- Key landmarks to highlight: {{landmarks}}
- View orientation: {{orientation}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['axialComponents', 'appendicularComponents', 'boneCount', 'landmarks', 'orientation', 'additionalNotes'],
  mermaidExample: `flowchart TB
    subgraph Axial["Axial Skeleton (80 bones)"]
        S["Skull (22)"]
        V["Vertebrae (26)"]
        T["Thorax (25)"]
        H["Hyoid (1)"]
        O["Ossicles (6)"]
    end
    subgraph Appendicular["Appendicular Skeleton (126 bones)"]
        PG["Pectoral Girdle (4)"]
        UL["Upper Limbs (60)"]
        PV["Pelvic Girdle (2)"]
        LL["Lower Limbs (60)"]
    end
    style Axial fill:#F5F5DC,color:#000
    style Appendicular fill:#FAEBD7,color:#000`
};

export const vertebralColumnTemplate: DiagramTemplate = {
  id: 'anat-vertebral-column',
  name: 'Vertebral Column Regions',
  description: 'Detailed vertebral column showing cervical, thoracic, lumbar, sacral, and coccygeal regions',
  domain: 'biology',
  promptTemplate: `Create a vertebral column diagram:
- Cervical vertebrae details: {{cervical}}
- Thoracic vertebrae details: {{thoracic}}
- Lumbar vertebrae details: {{lumbar}}
- Sacral and coccygeal: {{sacralCoccygeal}}
- Curvatures to show: {{curvatures}}
- Clinical correlations: {{clinical}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['cervical', 'thoracic', 'lumbar', 'sacralCoccygeal', 'curvatures', 'clinical', 'additionalNotes'],
  mermaidExample: `flowchart TB
    subgraph Cervical["Cervical (C1-C7)"]
        C1["Atlas (C1)"]
        C2["Axis (C2)"]
        C37["C3-C7"]
    end
    subgraph Thoracic["Thoracic (T1-T12)"]
        T["12 vertebrae\\nRib articulations"]
    end
    subgraph Lumbar["Lumbar (L1-L5)"]
        L["5 large vertebrae\\nWeight bearing"]
    end
    subgraph Sacral["Sacrum & Coccyx"]
        S["Sacrum (5 fused)"]
        Co["Coccyx (3-5 fused)"]
    end
    Cervical --> Thoracic --> Lumbar --> Sacral
    style Cervical fill:#87CEEB
    style Thoracic fill:#98FB98
    style Lumbar fill:#DDA0DD`
};

export const jointClassification: DiagramTemplate = {
  id: 'anat-joint-classification',
  name: 'Joint Classification',
  description: 'Classification of joints by structure and function',
  domain: 'biology',
  promptTemplate: `Create a joint classification diagram:
- Fibrous joints: {{fibrousJoints}}
- Cartilaginous joints: {{cartilaginousJoints}}
- Synovial joints: {{synovialJoints}}
- Examples for each type: {{examples}}
- Movement types: {{movements}}
{{#additionalNotes}}Clinical relevance: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['fibrousJoints', 'cartilaginousJoints', 'synovialJoints', 'examples', 'movements', 'additionalNotes'],
  mermaidExample: `flowchart TB
    J["Joint Classification"] --> F["Fibrous"]
    J --> C["Cartilaginous"]
    J --> S["Synovial"]
    F --> F1["Suture"] & F2["Syndesmosis"] & F3["Gomphosis"]
    C --> C1["Synchondrosis"] & C2["Symphysis"]
    S --> S1["Ball & Socket"] & S2["Hinge"] & S3["Pivot"]
    S --> S4["Saddle"] & S5["Condyloid"] & S6["Plane"]
    style S fill:#ADD8E6`
};

// =============================================================================
// MUSCULAR SYSTEM TEMPLATES
// =============================================================================

export const muscleContraction: DiagramTemplate = {
  id: 'anat-muscle-contraction',
  name: 'Muscle Contraction Mechanism',
  description: 'Sliding filament theory and muscle contraction steps',
  domain: 'biology',
  promptTemplate: `Create a muscle contraction mechanism diagram:
- Resting state: {{restingState}}
- Calcium release: {{calciumRelease}}
- Cross-bridge formation: {{crossBridge}}
- Power stroke: {{powerStroke}}
- ATP role: {{atpRole}}
- Relaxation: {{relaxation}}
{{#additionalNotes}}Molecular details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['restingState', 'calciumRelease', 'crossBridge', 'powerStroke', 'atpRole', 'relaxation', 'additionalNotes'],
  mermaidExample: `flowchart LR
    A["Neural Signal"] --> B["Ca²⁺ Release"]
    B --> C["Troponin Shift"]
    C --> D["Actin Exposed"]
    D --> E["Myosin Binds"]
    E --> F["Power Stroke"]
    F --> G["ATP Binding"]
    G --> H["Myosin Release"]
    H -->|"Repeat"| E
    style F fill:#CD5C5C`
};

export const majorMuscleGroups: DiagramTemplate = {
  id: 'anat-major-muscles',
  name: 'Major Muscle Groups',
  description: 'Overview of major skeletal muscle groups and their functions',
  domain: 'biology',
  promptTemplate: `Create a major muscle groups diagram:
- Head and neck muscles: {{headNeck}}
- Upper limb muscles: {{upperLimb}}
- Trunk muscles: {{trunk}}
- Lower limb muscles: {{lowerLimb}}
- Primary actions: {{actions}}
- Innervation summary: {{innervation}}
{{#additionalNotes}}Functional groupings: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['headNeck', 'upperLimb', 'trunk', 'lowerLimb', 'actions', 'innervation', 'additionalNotes'],
  mermaidExample: `flowchart TB
    subgraph Upper["Upper Body"]
        D["Deltoid"] --> ARM["Arm Movement"]
        P["Pectoralis"] --> ARM
        B["Biceps/Triceps"] --> ELBOW["Elbow Flex/Ext"]
    end
    subgraph Core["Core"]
        AB["Abdominals"] --> TRUNK["Trunk Stability"]
        ER["Erector Spinae"] --> TRUNK
    end
    subgraph Lower["Lower Body"]
        Q["Quadriceps"] --> KNEE["Knee Extension"]
        H["Hamstrings"] --> KNEE2["Knee Flexion"]
        G["Gastrocnemius"] --> ANKLE["Plantarflexion"]
    end`
};

// =============================================================================
// CARDIOVASCULAR TEMPLATES
// =============================================================================

export const heartConductionSystem: DiagramTemplate = {
  id: 'anat-cardiac-conduction',
  name: 'Cardiac Conduction System',
  description: 'Electrical conduction pathway of the heart',
  domain: 'biology',
  promptTemplate: `Create a cardiac conduction system diagram:
- SA node characteristics: {{saNode}}
- Internodal pathways: {{internodal}}
- AV node delay: {{avNode}}
- Bundle of His: {{bundleHis}}
- Bundle branches: {{bundleBranches}}
- Purkinje fibers: {{purkinje}}
- ECG correlation: {{ecgCorrelation}}
{{#additionalNotes}}Conduction velocities: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['saNode', 'internodal', 'avNode', 'bundleHis', 'bundleBranches', 'purkinje', 'ecgCorrelation', 'additionalNotes'],
  mermaidExample: `flowchart TD
    SA["SA Node\\n60-100 bpm"] -->|"Internodal"| AV["AV Node\\n40-60 bpm"]
    AV -->|"0.1s delay"| HIS["Bundle of His"]
    HIS --> RBB["Right Bundle Branch"]
    HIS --> LBB["Left Bundle Branch"]
    LBB --> LAF["Left Anterior Fascicle"]
    LBB --> LPF["Left Posterior Fascicle"]
    RBB --> RP["Purkinje (RV)"]
    LAF --> LP1["Purkinje (LV)"]
    LPF --> LP2["Purkinje (LV)"]
    style SA fill:#FFD700
    style AV fill:#FFA500`
};

export const circulatoryPathways: DiagramTemplate = {
  id: 'anat-circulation-pathways',
  name: 'Circulatory System Pathways',
  description: 'Systemic and pulmonary circulation pathways',
  domain: 'biology',
  promptTemplate: `Create a circulatory pathways diagram:
- Pulmonary circulation: {{pulmonary}}
- Systemic circulation: {{systemic}}
- Portal systems: {{portalSystems}}
- Oxygen saturation points: {{oxygenation}}
- Major vessel branches: {{majorVessels}}
{{#additionalNotes}}Clinical correlations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['pulmonary', 'systemic', 'portalSystems', 'oxygenation', 'majorVessels', 'additionalNotes'],
  mermaidExample: `flowchart LR
    subgraph Pulmonary["Pulmonary Circuit"]
        RV["RV"] -->|"Deoxy"| PA["Pulm. Artery"]
        PA --> LUNGS["Lungs"]
        LUNGS -->|"Oxy"| PV["Pulm. Veins"]
        PV --> LA["LA"]
    end
    subgraph Systemic["Systemic Circuit"]
        LV["LV"] --> AO["Aorta"]
        AO --> BODY["Body Tissues"]
        BODY --> VC["Vena Cava"]
        VC --> RA["RA"]
    end
    LA --> LV
    RA --> RV
    style LUNGS fill:#FFB6C1
    style BODY fill:#ADD8E6`
};

// =============================================================================
// NERVOUS SYSTEM TEMPLATES
// =============================================================================

export const brainRegions: DiagramTemplate = {
  id: 'anat-brain-regions',
  name: 'Brain Regions and Functions',
  description: 'Major brain regions with functional localization',
  domain: 'biology',
  promptTemplate: `Create a brain regions diagram:
- Frontal lobe functions: {{frontalLobe}}
- Parietal lobe functions: {{parietalLobe}}
- Temporal lobe functions: {{temporalLobe}}
- Occipital lobe functions: {{occipitalLobe}}
- Subcortical structures: {{subcortical}}
- Brainstem functions: {{brainstem}}
{{#additionalNotes}}Clinical correlations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['frontalLobe', 'parietalLobe', 'temporalLobe', 'occipitalLobe', 'subcortical', 'brainstem', 'additionalNotes'],
  mermaidExample: `flowchart TB
    subgraph Cerebrum["Cerebral Cortex"]
        F["Frontal\\n• Motor\\n• Executive\\n• Speech (Broca)"]
        P["Parietal\\n• Sensory\\n• Spatial\\n• Integration"]
        T["Temporal\\n• Hearing\\n• Memory\\n• Language (Wernicke)"]
        O["Occipital\\n• Vision\\n• Visual Processing"]
    end
    subgraph Deep["Deep Structures"]
        BG["Basal Ganglia\\nMovement"]
        TH["Thalamus\\nRelay"]
        HY["Hypothalamus\\nHomeostasis"]
    end
    subgraph BS["Brainstem"]
        MB["Midbrain"]
        PO["Pons"]
        ME["Medulla"]
    end`
};

export const spinalCordSegments: DiagramTemplate = {
  id: 'anat-spinal-cord-segments',
  name: 'Spinal Cord Segments and Dermatomes',
  description: 'Spinal cord organization with dermatome mapping',
  domain: 'biology',
  promptTemplate: `Create a spinal cord segments diagram:
- Cervical segments: {{cervical}}
- Thoracic segments: {{thoracic}}
- Lumbar segments: {{lumbar}}
- Sacral segments: {{sacral}}
- Key dermatomes: {{dermatomes}}
- Major plexuses: {{plexuses}}
{{#additionalNotes}}Clinical testing points: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['cervical', 'thoracic', 'lumbar', 'sacral', 'dermatomes', 'plexuses', 'additionalNotes'],
  mermaidExample: `flowchart LR
    subgraph Cervical["Cervical (C1-C8)"]
        C["C5-T1: Brachial Plexus\\n→ Upper limb"]
    end
    subgraph Thoracic["Thoracic (T1-T12)"]
        T["Intercostal nerves\\n→ Trunk"]
    end
    subgraph Lumbar["Lumbar (L1-L5)"]
        L["L1-L4: Lumbar Plexus\\n→ Anterior thigh"]
    end
    subgraph Sacral["Sacral (S1-S5)"]
        S["L4-S3: Sacral Plexus\\n→ Posterior leg"]
    end`
};

export const autonomicNervousSystem: DiagramTemplate = {
  id: 'anat-autonomic-ns',
  name: 'Autonomic Nervous System',
  description: 'Sympathetic and parasympathetic divisions comparison',
  domain: 'biology',
  promptTemplate: `Create an autonomic nervous system diagram:
- Sympathetic origins: {{sympatheticOrigins}}
- Parasympathetic origins: {{parasympatheticOrigins}}
- Target organ effects: {{targetEffects}}
- Neurotransmitters: {{neurotransmitters}}
- Ganglia locations: {{ganglia}}
{{#additionalNotes}}Fight-or-flight vs rest-and-digest: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['sympatheticOrigins', 'parasympatheticOrigins', 'targetEffects', 'neurotransmitters', 'ganglia', 'additionalNotes'],
  mermaidExample: `flowchart TB
    CNS["CNS"] --> SYMP["Sympathetic\\n(T1-L2)"]
    CNS --> PARA["Parasympathetic\\n(CN III, VII, IX, X + S2-S4)"]
    SYMP -->|"NE"| S1["↑ Heart Rate"]
    SYMP -->|"NE"| S2["Bronchodilation"]
    SYMP -->|"NE"| S3["↓ Digestion"]
    PARA -->|"ACh"| P1["↓ Heart Rate"]
    PARA -->|"ACh"| P2["Bronchoconstriction"]
    PARA -->|"ACh"| P3["↑ Digestion"]
    style SYMP fill:#FF6347
    style PARA fill:#90EE90`
};

// =============================================================================
// RESPIRATORY SYSTEM TEMPLATES
// =============================================================================

export const respiratoryAnatomy: DiagramTemplate = {
  id: 'anat-respiratory-overview',
  name: 'Respiratory System Overview',
  description: 'Complete respiratory tract anatomy from nose to alveoli',
  domain: 'biology',
  promptTemplate: `Create a respiratory system overview:
- Upper respiratory tract: {{upperTract}}
- Lower respiratory tract: {{lowerTract}}
- Bronchial tree generations: {{bronchialTree}}
- Alveolar structure: {{alveoli}}
- Blood-air barrier: {{bloodAirBarrier}}
{{#additionalNotes}}Gas exchange details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['upperTract', 'lowerTract', 'bronchialTree', 'alveoli', 'bloodAirBarrier', 'additionalNotes'],
  mermaidExample: `flowchart TB
    subgraph Upper["Upper Respiratory"]
        N["Nasal Cavity"] --> PH["Pharynx"]
        PH --> L["Larynx"]
    end
    subgraph Lower["Lower Respiratory"]
        L --> T["Trachea"]
        T --> MB["Main Bronchi"]
        MB --> LB["Lobar Bronchi"]
        LB --> SB["Segmental Bronchi"]
        SB --> BR["Bronchioles"]
        BR --> TB["Terminal Bronchioles"]
        TB --> RB["Respiratory Bronchioles"]
        RB --> AD["Alveolar Ducts"]
        AD --> A["Alveoli"]
    end
    style A fill:#FFB6C1`
};

export const lungLobesSegments: DiagramTemplate = {
  id: 'anat-lung-lobes',
  name: 'Lung Lobes and Segments',
  description: 'Bronchopulmonary segments of both lungs',
  domain: 'biology',
  promptTemplate: `Create a lung lobes and segments diagram:
- Right lung lobes: {{rightLobes}}
- Left lung lobes: {{leftLobes}}
- Right lung segments: {{rightSegments}}
- Left lung segments: {{leftSegments}}
- Fissures: {{fissures}}
{{#additionalNotes}}Clinical significance: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['rightLobes', 'leftLobes', 'rightSegments', 'leftSegments', 'fissures', 'additionalNotes'],
  mermaidExample: `flowchart TB
    subgraph Right["Right Lung (3 lobes, 10 segments)"]
        RU["Upper Lobe\\n3 segments"]
        RM["Middle Lobe\\n2 segments"]
        RL["Lower Lobe\\n5 segments"]
    end
    subgraph Left["Left Lung (2 lobes, 8-10 segments)"]
        LU["Upper Lobe\\n4-5 segments\\n(includes lingula)"]
        LL["Lower Lobe\\n4-5 segments"]
    end`
};

// =============================================================================
// DIGESTIVE SYSTEM TEMPLATES
// =============================================================================

export const giTractOverview: DiagramTemplate = {
  id: 'anat-gi-tract-overview',
  name: 'GI Tract Overview',
  description: 'Complete alimentary canal from mouth to anus',
  domain: 'biology',
  promptTemplate: `Create a GI tract overview diagram:
- Oral cavity structures: {{oralCavity}}
- Esophagus characteristics: {{esophagus}}
- Stomach regions: {{stomach}}
- Small intestine divisions: {{smallIntestine}}
- Large intestine parts: {{largeIntestine}}
- Transit times: {{transitTimes}}
{{#additionalNotes}}Digestive functions: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['oralCavity', 'esophagus', 'stomach', 'smallIntestine', 'largeIntestine', 'transitTimes', 'additionalNotes'],
  mermaidExample: `flowchart TB
    M["Mouth\\nMechanical + Amylase"] --> E["Esophagus\\n25cm"]
    E --> S["Stomach\\nHCl + Pepsin"]
    S --> D["Duodenum\\n25cm"]
    D --> J["Jejunum\\n2.5m"]
    J --> I["Ileum\\n3.5m"]
    I --> C["Cecum"]
    C --> AC["Ascending Colon"]
    AC --> TC["Transverse Colon"]
    TC --> DC["Descending Colon"]
    DC --> SC["Sigmoid Colon"]
    SC --> R["Rectum"]
    R --> AN["Anus"]`
};

export const hepatobiliarySystem: DiagramTemplate = {
  id: 'anat-hepatobiliary',
  name: 'Hepatobiliary System',
  description: 'Liver, gallbladder, and biliary tract anatomy',
  domain: 'biology',
  promptTemplate: `Create a hepatobiliary system diagram:
- Liver lobes and segments: {{liverAnatomy}}
- Biliary tree: {{biliaryTree}}
- Gallbladder anatomy: {{gallbladder}}
- Portal circulation: {{portalCirculation}}
- Sphincter of Oddi: {{sphincterOddi}}
{{#additionalNotes}}Clinical correlations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['liverAnatomy', 'biliaryTree', 'gallbladder', 'portalCirculation', 'sphincterOddi', 'additionalNotes'],
  mermaidExample: `flowchart TB
    subgraph Liver["Liver"]
        RL["Right Lobe"]
        LL["Left Lobe"]
        C["Caudate"]
        Q["Quadrate"]
    end
    RL & LL --> RHD["Right Hepatic Duct"]
    RL & LL --> LHD["Left Hepatic Duct"]
    RHD & LHD --> CHD["Common Hepatic Duct"]
    GB["Gallbladder"] --> CD["Cystic Duct"]
    CHD & CD --> CBD["Common Bile Duct"]
    CBD --> SO["Sphincter of Oddi"]
    SO --> DUO["Duodenum"]
    style GB fill:#90EE90`
};

// =============================================================================
// URINARY SYSTEM TEMPLATES
// =============================================================================

export const nephronStructure: DiagramTemplate = {
  id: 'anat-nephron-structure',
  name: 'Nephron Structure and Function',
  description: 'Detailed nephron anatomy with functional zones',
  domain: 'biology',
  promptTemplate: `Create a nephron structure diagram:
- Renal corpuscle: {{renalCorpuscle}}
- Proximal convoluted tubule: {{pct}}
- Loop of Henle: {{loopHenle}}
- Distal convoluted tubule: {{dct}}
- Collecting duct: {{collectingDuct}}
- Filtration, reabsorption, secretion: {{functions}}
{{#additionalNotes}}Hormonal regulation: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['renalCorpuscle', 'pct', 'loopHenle', 'dct', 'collectingDuct', 'functions', 'additionalNotes'],
  mermaidExample: `flowchart TB
    G["Glomerulus\\nFiltration"] --> BC["Bowman's Capsule"]
    BC --> PCT["PCT\\n65% reabsorption"]
    PCT --> TDL["Thin Descending Limb\\nWater permeable"]
    TDL --> TAL["Thick Ascending Limb\\nNaCl reabsorption"]
    TAL --> DCT["DCT\\nFine-tuning\\nAldosterone"]
    DCT --> CD["Collecting Duct\\nADH = water reabsorption"]
    style G fill:#DC143C,color:#fff
    style CD fill:#FFD700`
};

// =============================================================================
// ENDOCRINE SYSTEM TEMPLATES
// =============================================================================

export const endocrineOverview: DiagramTemplate = {
  id: 'anat-endocrine-overview',
  name: 'Endocrine System Overview',
  description: 'Major endocrine glands and their hormones',
  domain: 'biology',
  promptTemplate: `Create an endocrine system overview:
- Hypothalamic hormones: {{hypothalamus}}
- Pituitary hormones: {{pituitary}}
- Thyroid and parathyroid: {{thyroidParathyroid}}
- Adrenal glands: {{adrenals}}
- Pancreatic islets: {{pancreas}}
- Gonadal hormones: {{gonads}}
{{#additionalNotes}}Feedback loops: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['hypothalamus', 'pituitary', 'thyroidParathyroid', 'adrenals', 'pancreas', 'gonads', 'additionalNotes'],
  mermaidExample: `flowchart TB
    HY["Hypothalamus"] -->|"Releasing hormones"| PIT["Pituitary"]
    PIT -->|"TSH"| TH["Thyroid\\nT3, T4"]
    PIT -->|"ACTH"| AD["Adrenal\\nCortisol"]
    PIT -->|"FSH, LH"| GON["Gonads\\nEstrogen, Testosterone"]
    PIT -->|"GH"| TISSUE["Tissues"]
    PAN["Pancreas\\nInsulin, Glucagon"] --> GLUCOSE["Blood Glucose"]
    PTH["Parathyroid\\nPTH"] --> CA["Calcium"]
    TH & AD & GON -.->|"Negative Feedback"| HY`
};

export const hpaAxis: DiagramTemplate = {
  id: 'anat-hpa-axis',
  name: 'Hypothalamic-Pituitary-Adrenal Axis',
  description: 'HPA axis regulation and cortisol feedback',
  domain: 'biology',
  promptTemplate: `Create an HPA axis diagram:
- Hypothalamic CRH: {{crh}}
- Pituitary ACTH: {{acth}}
- Adrenal cortisol: {{cortisol}}
- Negative feedback: {{negativeFeedback}}
- Stress response: {{stressResponse}}
- Diurnal variation: {{diurnalVariation}}
{{#additionalNotes}}Clinical correlations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['crh', 'acth', 'cortisol', 'negativeFeedback', 'stressResponse', 'diurnalVariation', 'additionalNotes'],
  mermaidExample: `flowchart TB
    STRESS["Stress\\nCircadian Input"] --> HY["Hypothalamus"]
    HY -->|"CRH"| AP["Anterior Pituitary"]
    AP -->|"ACTH"| AC["Adrenal Cortex"]
    AC -->|"Cortisol"| TARGET["Target Tissues"]
    AC -.->|"Negative\\nFeedback"| HY
    AC -.->|"Negative\\nFeedback"| AP
    style STRESS fill:#FF6347
    style AC fill:#FFD700`
};

// =============================================================================
// LYMPHATIC AND IMMUNE TEMPLATES
// =============================================================================

export const lymphaticDrainage: DiagramTemplate = {
  id: 'anat-lymphatic-drainage',
  name: 'Lymphatic Drainage Patterns',
  description: 'Major lymphatic drainage routes and lymph node groups',
  domain: 'biology',
  promptTemplate: `Create a lymphatic drainage diagram:
- Head and neck drainage: {{headNeck}}
- Upper limb drainage: {{upperLimb}}
- Thoracic drainage: {{thoracic}}
- Abdominal drainage: {{abdominal}}
- Lower limb drainage: {{lowerLimb}}
- Thoracic duct vs right lymphatic duct: {{mainDucts}}
{{#additionalNotes}}Clinical significance: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['headNeck', 'upperLimb', 'thoracic', 'abdominal', 'lowerLimb', 'mainDucts', 'additionalNotes'],
  mermaidExample: `flowchart TB
    subgraph Right["Right Side (upper)"]
        RH["Right Head/Neck"]
        RA["Right Arm"]
        RT["Right Thorax"]
    end
    subgraph Left["Rest of Body"]
        LH["Left Head/Neck"]
        LA["Left Arm"]
        LT["Left Thorax"]
        AB["Abdomen"]
        LL["Lower Limbs"]
    end
    RH & RA & RT --> RLD["Right Lymphatic Duct"]
    LH & LA & LT & AB & LL --> TD["Thoracic Duct"]
    RLD --> RSV["Right Subclavian Vein"]
    TD --> LSV["Left Subclavian Vein"]`
};

// =============================================================================
// REPRODUCTIVE SYSTEM TEMPLATES
// =============================================================================

export const femaleReproductive: DiagramTemplate = {
  id: 'anat-female-reproductive',
  name: 'Female Reproductive System',
  description: 'Female reproductive anatomy and menstrual cycle',
  domain: 'biology',
  promptTemplate: `Create a female reproductive system diagram:
- Ovarian anatomy: {{ovaries}}
- Fallopian tubes: {{fallopianTubes}}
- Uterine anatomy: {{uterus}}
- Vaginal anatomy: {{vagina}}
- External genitalia: {{externalGenitalia}}
- Menstrual cycle phases: {{menstrualCycle}}
{{#additionalNotes}}Hormonal regulation: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['ovaries', 'fallopianTubes', 'uterus', 'vagina', 'externalGenitalia', 'menstrualCycle', 'additionalNotes'],
  mermaidExample: `flowchart TB
    subgraph Internal["Internal Structures"]
        O["Ovaries"] --> FT["Fallopian Tubes"]
        FT --> U["Uterus"]
        U --> CX["Cervix"]
        CX --> V["Vagina"]
    end
    subgraph Cycle["Menstrual Cycle"]
        MEN["Menstruation\\nDays 1-5"]
        FOL["Follicular\\nDays 1-13"]
        OV["Ovulation\\nDay 14"]
        LUT["Luteal\\nDays 15-28"]
        MEN --> FOL --> OV --> LUT --> MEN
    end`
};

export const maleReproductive: DiagramTemplate = {
  id: 'anat-male-reproductive',
  name: 'Male Reproductive System',
  description: 'Male reproductive anatomy and spermatogenesis',
  domain: 'biology',
  promptTemplate: `Create a male reproductive system diagram:
- Testicular anatomy: {{testes}}
- Epididymis and vas deferens: {{ductSystem}}
- Accessory glands: {{accessoryGlands}}
- External genitalia: {{externalGenitalia}}
- Spermatogenesis pathway: {{spermatogenesis}}
{{#additionalNotes}}Hormonal regulation: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['testes', 'ductSystem', 'accessoryGlands', 'externalGenitalia', 'spermatogenesis', 'additionalNotes'],
  mermaidExample: `flowchart LR
    subgraph Production["Sperm Production"]
        T["Testes\\nSeminiferous Tubules"]
    end
    subgraph Transport["Transport Path"]
        T --> E["Epididymis"]
        E --> VD["Vas Deferens"]
        VD --> ED["Ejaculatory Duct"]
        ED --> U["Urethra"]
    end
    subgraph Glands["Accessory Glands"]
        SV["Seminal Vesicles\\n60% fluid"]
        P["Prostate\\n30% fluid"]
        BU["Bulbourethral\\nPre-ejaculate"]
    end
    SV & P & BU --> ED`
};

// =============================================================================
// INTEGUMENTARY TEMPLATES
// =============================================================================

export const skinStructure: DiagramTemplate = {
  id: 'anat-skin-structure',
  name: 'Skin Structure and Layers',
  description: 'Detailed skin anatomy with appendages',
  domain: 'biology',
  promptTemplate: `Create a skin structure diagram:
- Epidermis layers: {{epidermis}}
- Dermis components: {{dermis}}
- Hypodermis: {{hypodermis}}
- Hair follicle structure: {{hairFollicle}}
- Glands: {{glands}}
- Sensory receptors: {{receptors}}
{{#additionalNotes}}Clinical correlations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['epidermis', 'dermis', 'hypodermis', 'hairFollicle', 'glands', 'receptors', 'additionalNotes'],
  mermaidExample: `flowchart TB
    subgraph Epidermis["Epidermis"]
        SC["Stratum Corneum"]
        SL["Stratum Lucidum"]
        SG["Stratum Granulosum"]
        SS["Stratum Spinosum"]
        SB["Stratum Basale"]
    end
    subgraph Dermis["Dermis"]
        PD["Papillary Dermis"]
        RD["Reticular Dermis"]
        HF["Hair Follicle"]
        SEB["Sebaceous Gland"]
        SW["Sweat Gland"]
    end
    subgraph Hypo["Hypodermis"]
        FAT["Adipose Tissue"]
    end
    Epidermis --> Dermis --> Hypo`
};

// =============================================================================
// DEVELOPMENTAL ANATOMY TEMPLATES
// =============================================================================

export const embryonicDevelopment: DiagramTemplate = {
  id: 'anat-embryonic-development',
  name: 'Embryonic Development Stages',
  description: 'Key stages of human embryonic development',
  domain: 'biology',
  promptTemplate: `Create an embryonic development diagram:
- Fertilization to implantation: {{earlyDevelopment}}
- Gastrulation and germ layers: {{gastrulation}}
- Organogenesis: {{organogenesis}}
- Critical periods: {{criticalPeriods}}
- Teratogen sensitivity: {{teratogenSensitivity}}
{{#additionalNotes}}Clinical correlations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['earlyDevelopment', 'gastrulation', 'organogenesis', 'criticalPeriods', 'teratogenSensitivity', 'additionalNotes'],
  mermaidExample: `flowchart LR
    F["Fertilization"] --> Z["Zygote"]
    Z --> M["Morula\\nDay 3-4"]
    M --> B["Blastocyst\\nDay 5-6"]
    B --> I["Implantation\\nDay 6-10"]
    I --> G["Gastrulation\\nWeek 3"]
    G --> EC["Ectoderm"] & ME["Mesoderm"] & EN["Endoderm"]
    EC --> NS["Nervous System\\nSkin"]
    ME --> MS["Muscle\\nBone\\nHeart"]
    EN --> GI["GI Tract\\nLungs"]`
};

// =============================================================================
// HISTOLOGY TEMPLATES
// =============================================================================

export const tissueTypesOverview: DiagramTemplate = {
  id: 'anat-tissue-types-overview',
  name: 'Tissue Types Overview',
  description: 'Classification and comparison of the four basic tissue types',
  domain: 'biology',
  promptTemplate: `Create a tissue types overview diagram:
- Epithelial tissue types: {{epithelial}}
- Connective tissue types: {{connective}}
- Muscle tissue types: {{muscle}}
- Nervous tissue: {{nervous}}
- Key characteristics: {{characteristics}}
- Clinical examples: {{clinicalExamples}}
{{#additionalNotes}}Histological features: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['epithelial', 'connective', 'muscle', 'nervous', 'characteristics', 'clinicalExamples', 'additionalNotes'],
  mermaidExample: `flowchart TB
    T["Four Basic Tissue Types"] --> E["Epithelial"]
    T --> C["Connective"]
    T --> M["Muscle"]
    T --> N["Nervous"]
    E --> E1["Simple\\nStratified\\nPseudostratified"]
    C --> C1["Loose\\nDense\\nSpecialized"]
    M --> M1["Skeletal\\nCardiac\\nSmooth"]
    N --> N1["Neurons\\nGlia"]
    style E fill:#FFB6C1
    style C fill:#F5DEB3
    style M fill:#CD5C5C
    style N fill:#FFD700`
};

export const crossSectionalAnatomy: DiagramTemplate = {
  id: 'anat-cross-sectional',
  name: 'Cross-Sectional Anatomy',
  description: 'Template for axial cross-sections at various anatomical levels',
  domain: 'biology',
  promptTemplate: `Create a cross-sectional anatomy diagram:
- Anatomical level: {{level}}
- Anterior structures: {{anterior}}
- Posterior structures: {{posterior}}
- Lateral structures: {{lateral}}
- Vascular structures: {{vascular}}
- Nerve structures: {{nerves}}
- Fascial planes: {{fascia}}
{{#additionalNotes}}CT/MRI correlation: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['level', 'anterior', 'posterior', 'lateral', 'vascular', 'nerves', 'fascia', 'additionalNotes'],
  mermaidExample: `flowchart TB
    subgraph Cross["Cross Section at L3"]
        ANT["Anterior"]
        subgraph Core["Central Structures"]
            AO["Aorta"]
            IVC["IVC"]
            VB["Vertebral Body"]
        end
        POST["Posterior"]
        LAT1["Left"] --- Core --- LAT2["Right"]
        ANT --- Core --- POST
    end
    subgraph Legend["Structures"]
        AB["Abdominal muscles"]
        KID["Kidneys"]
        PS["Psoas"]
        QL["Quadratus Lumborum"]
    end
    style AO fill:#DC143C
    style IVC fill:#4169E1
    style VB fill:#F5F5DC`
};

export const clinicalAnatomyCorrelation: DiagramTemplate = {
  id: 'anat-clinical-correlation',
  name: 'Clinical Anatomy Correlation',
  description: 'Template linking anatomical structures to clinical presentations',
  domain: 'biology',
  promptTemplate: `Create a clinical anatomy correlation diagram:
- Anatomical structure: {{structure}}
- Normal function: {{normalFunction}}
- Clinical condition: {{condition}}
- Signs and symptoms: {{signsSymptoms}}
- Physical exam findings: {{examFindings}}
- Imaging correlation: {{imaging}}
{{#additionalNotes}}Treatment implications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['structure', 'normalFunction', 'condition', 'signsSymptoms', 'examFindings', 'imaging', 'additionalNotes'],
  mermaidExample: `flowchart TB
    subgraph Anatomy["Normal Anatomy"]
        S["Structure:\\nMedian Nerve"]
        F["Function:\\nThenar muscles\\nSensation digits 1-3"]
    end
    subgraph Pathology["Clinical Condition"]
        C["Carpal Tunnel Syndrome"]
        CAUSE["Causes:\\nRepetitive strain\\nPregnancy\\nDiabetes"]
    end
    subgraph Clinical["Clinical Presentation"]
        SX["Symptoms:\\nNumbness\\nTingling\\nWeakness"]
        PE["Exam:\\nTinel sign\\nPhalen test\\nThenar atrophy"]
    end
    S --> C
    CAUSE --> C
    C --> SX
    C --> PE
    style C fill:#FFC107
    style SX fill:#FF6B6B`
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

export const anatomyTemplates: DiagramTemplate[] = [
  // Skeletal System
  skeletalOverview,
  vertebralColumnTemplate,
  jointClassification,
  // Muscular System
  muscleContraction,
  majorMuscleGroups,
  // Cardiovascular System
  heartConductionSystem,
  circulatoryPathways,
  // Nervous System
  brainRegions,
  spinalCordSegments,
  autonomicNervousSystem,
  // Respiratory System
  respiratoryAnatomy,
  lungLobesSegments,
  // Digestive System
  giTractOverview,
  hepatobiliarySystem,
  // Urinary System
  nephronStructure,
  // Endocrine System
  endocrineOverview,
  hpaAxis,
  // Lymphatic System
  lymphaticDrainage,
  // Reproductive System
  femaleReproductive,
  maleReproductive,
  // Integumentary System
  skinStructure,
  // Developmental Anatomy
  embryonicDevelopment,
  // Histology
  tissueTypesOverview,
  // Cross-Sectional Anatomy
  crossSectionalAnatomy,
  // Clinical Anatomy
  clinicalAnatomyCorrelation,
];

export default anatomyTemplates;
