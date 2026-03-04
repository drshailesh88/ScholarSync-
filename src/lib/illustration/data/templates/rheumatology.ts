/**
 * rheumatology.ts
 * Rheumatology diagram templates for FINNISH
 *
 * Contains comprehensive templates for rheumatologic conditions including:
 * - Clinical decision algorithms (joint pain, RA, lupus, gout, vasculitis)
 * - Anatomical diagrams (synovial joint, inflammatory vs degenerative, hand deformities)
 * - Assessment templates (ACR criteria, disease activity scores, joint examination)
 * - Data visualization (autoantibody interpretation, DMARD monitoring, biologic selection)
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// DECISION TREES
// =============================================================================

/**
 * Joint Pain Workup Algorithm template
 */
export const rheumJointPainWorkup: DiagramTemplate = {
  id: 'rheum-joint-pain-workup',
  name: 'Joint Pain Workup Algorithm',
  description: 'Systematic approach to evaluating joint pain including inflammatory vs mechanical differentiation',
  domain: 'medicine',
  promptTemplate: `Create a joint pain evaluation algorithm flowchart:
- Initial presentation: {{presentation}}
- Joint pattern (mono/oligo/poly): {{jointPattern}}
- Inflammatory vs mechanical features: {{inflammatoryFeatures}}
- Duration (acute vs chronic): {{duration}}
- Extra-articular manifestations: {{extraArticular}}
- Initial laboratory workup: {{labWorkup}}
- Imaging approach: {{imagingApproach}}
- Differential diagnosis: {{differentialDiagnosis}}
{{#additionalNotes}}Additional clinical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentation',
    'jointPattern',
    'inflammatoryFeatures',
    'duration',
    'extraArticular',
    'labWorkup',
    'imagingApproach',
    'differentialDiagnosis',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Initial["Initial Assessment"]
        A[("Joint Pain")] --> B{"Inflammatory\\nFeatures?"}
    end
    subgraph Inflammatory["Inflammatory Path"]
        B -->|"Morning stiffness >1hr\\nSwelling, warmth"| C{"Pattern?"}
        C -->|"Monoarticular"| D["Septic? Crystal?"]
        C -->|"Polyarticular"| E["RA? SLE? PsA?"]
    end
    subgraph Mechanical["Mechanical Path"]
        B -->|"No stiffness\\nUsage-related"| F{"Pattern?"}
        F -->|"Weight-bearing"| G["OA likely"]
        F -->|"Specific injury"| H["Trauma workup"]
    end
    D --> I["Arthrocentesis"]
    E --> J["RF, Anti-CCP, ANA"]
    style D fill:#DC143C,color:#fff
    style G fill:#228B22,color:#fff`,
};

/**
 * Rheumatoid Arthritis Treatment Algorithm template
 */
export const raTreatmentAlgorithm: DiagramTemplate = {
  id: 'rheum-ra-treatment',
  name: 'RA Treatment Algorithm',
  description: 'Treat-to-target approach for rheumatoid arthritis following ACR/EULAR guidelines',
  domain: 'medicine',
  promptTemplate: `Create a rheumatoid arthritis treatment algorithm:
- Disease activity level: {{diseaseActivity}}
- Poor prognostic factors: {{poorPrognosticFactors}}
- Initial DMARD choice: {{initialDMARD}}
- Combination therapy options: {{combinationTherapy}}
- Biologic/targeted therapy indications: {{biologicIndications}}
- Treatment target: {{treatmentTarget}}
- Monitoring schedule: {{monitoringSchedule}}
- Flare management: {{flareManagement}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'diseaseActivity',
    'poorPrognosticFactors',
    'initialDMARD',
    'combinationTherapy',
    'biologicIndications',
    'treatmentTarget',
    'monitoringSchedule',
    'flareManagement',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Early RA\\nDiagnosis")] --> B["Start MTX\\n+ Short-term steroids"]
    B --> C{"3-6 month\\nReassess"}
    C -->|"Target achieved\\nLDA/Remission"| D["Continue\\nMonitor q3-6mo"]
    C -->|"Not at target"| E{"Poor Prognostic\\nFactors?"}
    E -->|"Yes"| F["Add bDMARD/tsDMARD"]
    E -->|"No"| G["Add csDMARD\\nor Switch"]
    F --> H{"Response?"}
    H -->|"No"| I["Switch Mechanism"]
    H -->|"Yes"| J["Continue\\nConsider Taper"]
    style A fill:#DC143C,color:#fff
    style D fill:#228B22,color:#fff
    style J fill:#228B22,color:#fff`,
};

/**
 * Lupus Management Algorithm template
 */
export const lupusManagement: DiagramTemplate = {
  id: 'rheum-lupus-management',
  name: 'Lupus Management Algorithm',
  description: 'Comprehensive SLE management including organ involvement and treatment escalation',
  domain: 'medicine',
  promptTemplate: `Create a lupus management algorithm:
- Disease manifestations: {{manifestations}}
- Organ involvement: {{organInvolvement}}
- Disease activity score: {{activityScore}}
- Baseline medications: {{baselineMedications}}
- Flare management: {{flareManagement}}
- Immunosuppressive options: {{immunosuppressives}}
- Biologic therapy: {{biologicOptions}}
- Monitoring parameters: {{monitoringParameters}}
{{#additionalNotes}}Pregnancy considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'manifestations',
    'organInvolvement',
    'activityScore',
    'baselineMedications',
    'flareManagement',
    'immunosuppressives',
    'biologicOptions',
    'monitoringParameters',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("SLE\\nDiagnosis")] --> B["All patients:\\nHCQ + Sunscreen"]
    B --> C{"Organ\\nInvolvement?"}
    C -->|"Skin/Joints"| D["HCQ +/- MTX\\nLow-dose steroids"]
    C -->|"Nephritis"| E["MMF or CYC\\n+ Steroids"]
    C -->|"CNS/Severe"| F["High-dose steroids\\n+ Rituximab/CYC"]
    D --> G{"Response?"}
    E --> G
    G -->|"No"| H["Add Belimumab\\nor Switch IS"]
    G -->|"Yes"| I["Maintain\\nTaper steroids"]
    style E fill:#FFA500,color:#000
    style F fill:#DC143C,color:#fff
    style I fill:#228B22,color:#fff`,
};

/**
 * Gout Treatment Algorithm template
 */
export const goutTreatment: DiagramTemplate = {
  id: 'rheum-gout-treatment',
  name: 'Gout Treatment Algorithm',
  description: 'Acute gout management and urate-lowering therapy initiation and optimization',
  domain: 'medicine',
  promptTemplate: `Create a gout treatment algorithm:
- Acute presentation: {{acutePresentation}}
- Flare treatment options: {{flareOptions}}
- ULT indications: {{ultIndications}}
- ULT choice: {{ultChoice}}
- Target serum urate: {{targetUrate}}
- Flare prophylaxis: {{flareProphylaxis}}
- Titration strategy: {{titrationStrategy}}
- Refractory gout options: {{refractoryOptions}}
{{#additionalNotes}}Comorbidity considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'acutePresentation',
    'flareOptions',
    'ultIndications',
    'ultChoice',
    'targetUrate',
    'flareProphylaxis',
    'titrationStrategy',
    'refractoryOptions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Gout\\nDiagnosis")] --> B{"Acute\\nFlare?"}
    B -->|"Yes"| C["Colchicine/NSAID\\nor Steroids"]
    B -->|"No"| D{"ULT\\nIndicated?"}
    D -->|"Tophi, >2 flares/yr\\nCKD, Stones"| E["Start ULT\\n+ Prophylaxis"]
    D -->|"First flare"| F["Lifestyle\\nReassess"]
    E --> G["Allopurinol\\nStart low, go slow"]
    G --> H{"sUA\\n<6 mg/dL?"}
    H -->|"No"| I["Titrate up\\nq2-4 weeks"]
    H -->|"Yes"| J["Maintain\\nStop prophylaxis 3-6mo"]
    I --> H
    style C fill:#FFA500,color:#000
    style J fill:#228B22,color:#fff`,
};

/**
 * Vasculitis Evaluation Algorithm template
 */
export const vasculitisEvaluation: DiagramTemplate = {
  id: 'rheum-vasculitis-evaluation',
  name: 'Vasculitis Evaluation Algorithm',
  description: 'Systematic approach to vasculitis classification and workup by vessel size',
  domain: 'medicine',
  promptTemplate: `Create a vasculitis evaluation algorithm:
- Clinical presentation: {{presentation}}
- Vessel size suspected: {{vesselSize}}
- ANCA status: {{ancaStatus}}
- Organ involvement: {{organInvolvement}}
- Biopsy considerations: {{biopsyConsiderations}}
- Imaging modalities: {{imagingModalities}}
- Classification criteria: {{classificationCriteria}}
- Initial treatment: {{initialTreatment}}
{{#additionalNotes}}Mimics to exclude: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentation',
    'vesselSize',
    'ancaStatus',
    'organInvolvement',
    'biopsyConsiderations',
    'imagingModalities',
    'classificationCriteria',
    'initialTreatment',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Suspected\\nVasculitis")] --> B{"Vessel\\nSize?"}
    B -->|"Large"| C["GCA, Takayasu"]
    B -->|"Medium"| D["PAN, Kawasaki"]
    B -->|"Small"| E{"ANCA?"}
    E -->|"Positive"| F["GPA, MPA, EGPA"]
    E -->|"Negative"| G["IgAV, Cryo,\\nHypocomplementemic"]
    C --> H["CTA/MRA\\nPET-CT, Biopsy"]
    D --> I["Angiography\\nSkin/Nerve Bx"]
    F --> J["Lung/Kidney Bx\\nCT Chest"]
    G --> K["Skin Bx\\nComplement, Cryo"]
    style F fill:#DC143C,color:#fff
    style C fill:#FFA500,color:#000`,
};

// =============================================================================
// ANATOMICAL DIAGRAMS
// =============================================================================

/**
 * Synovial Joint Anatomy template
 */
export const synovialJointAnatomy: DiagramTemplate = {
  id: 'rheum-synovial-joint-anatomy',
  name: 'Synovial Joint Anatomy',
  description: 'Detailed anatomical diagram of synovial joint structures',
  domain: 'medicine',
  promptTemplate: `Create a synovial joint anatomy diagram:
- Joint type: {{jointType}}
- Articular surfaces: {{articularSurfaces}}
- Cartilage layers: {{cartilageLayers}}
- Synovial membrane: {{synovialMembrane}}
- Joint capsule: {{jointCapsule}}
- Supporting ligaments: {{ligaments}}
- Bursae locations: {{bursae}}
- Vascular supply: {{vascularSupply}}
{{#additionalNotes}}Clinical correlations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'jointType',
    'articularSurfaces',
    'cartilageLayers',
    'synovialMembrane',
    'jointCapsule',
    'ligaments',
    'bursae',
    'vascularSupply',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Layers["Joint Structure"]
        A["Bone"] --> B["Subchondral Bone"]
        B --> C["Articular Cartilage"]
        C --> D["Synovial Fluid"]
    end
    subgraph Capsule["Capsular Structures"]
        E["Fibrous Capsule"]
        F["Synovial Membrane"]
        G["Ligaments"]
    end
    subgraph Supporting["Supporting"]
        H["Bursae"]
        I["Tendons"]
        J["Entheses"]
    end
    E --- F
    F --> D
    style C fill:#87CEEB,color:#000
    style D fill:#FFE4B5,color:#000`,
};

/**
 * Inflammatory vs Degenerative Changes template
 */
export const inflammatoryVsDegenerative: DiagramTemplate = {
  id: 'rheum-inflammatory-vs-degenerative',
  name: 'Inflammatory vs Degenerative Changes',
  description: 'Side-by-side comparison of inflammatory arthritis vs osteoarthritis pathology',
  domain: 'medicine',
  promptTemplate: `Create a comparison diagram of inflammatory vs degenerative joint changes:
- Inflammatory features: {{inflammatoryFeatures}}
- Degenerative features: {{degenerativeFeatures}}
- Synovial changes: {{synovialChanges}}
- Cartilage patterns: {{cartilagePatterns}}
- Bone changes: {{boneChanges}}
- Lab differences: {{labDifferences}}
- Imaging differences: {{imagingDifferences}}
- Clinical presentation: {{clinicalPresentation}}
{{#additionalNotes}}Overlap syndromes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'inflammatoryFeatures',
    'degenerativeFeatures',
    'synovialChanges',
    'cartilagePatterns',
    'boneChanges',
    'labDifferences',
    'imagingDifferences',
    'clinicalPresentation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph IA["Inflammatory Arthritis"]
        A1["Synovial Hypertrophy"]
        A2["Pannus Formation"]
        A3["Marginal Erosions"]
        A4["Uniform JSN"]
        A5["Periarticular Osteopenia"]
    end
    subgraph OA["Osteoarthritis"]
        B1["Minimal Synovitis"]
        B2["Cartilage Loss"]
        B3["Osteophytes"]
        B4["Asymmetric JSN"]
        B5["Subchondral Sclerosis"]
    end
    A1 --> A2 --> A3
    B1 --> B2 --> B3
    style A3 fill:#DC143C,color:#fff
    style B3 fill:#FFD700,color:#000`,
};

/**
 * Hand Deformities in RA template
 */
export const handDeformitiesRA: DiagramTemplate = {
  id: 'rheum-hand-deformities',
  name: 'Hand Deformities in Rheumatoid Arthritis',
  description: 'Illustrated guide to characteristic hand deformities in RA',
  domain: 'medicine',
  promptTemplate: `Create a hand deformities diagram for RA:
- Swan neck deformity: {{swanNeck}}
- Boutonniere deformity: {{boutonniere}}
- Ulnar deviation: {{ulnarDeviation}}
- Z-thumb deformity: {{zThumb}}
- MCP involvement: {{mcpInvolvement}}
- Tendon rupture patterns: {{tendonRupture}}
- Carpal involvement: {{carpalInvolvement}}
- Functional impact: {{functionalImpact}}
{{#additionalNotes}}Surgical options: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'swanNeck',
    'boutonniere',
    'ulnarDeviation',
    'zThumb',
    'mcpInvolvement',
    'tendonRupture',
    'carpalInvolvement',
    'functionalImpact',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Deformities["RA Hand Deformities"]
        A["Swan Neck\\nPIP hyper, DIP flex"]
        B["Boutonniere\\nPIP flex, DIP hyper"]
        C["Ulnar Deviation\\nMCP subluxation"]
        D["Z-Thumb\\nMCP flex, IP hyper"]
    end
    subgraph Mechanism["Mechanism"]
        E["Synovitis"] --> F["Ligament laxity"]
        F --> G["Tendon imbalance"]
        G --> H["Fixed deformity"]
    end
    A & B & C & D --> E
    style A fill:#FFA500,color:#000
    style B fill:#FFA500,color:#000
    style C fill:#DC143C,color:#fff`,
};

// =============================================================================
// ASSESSMENT TEMPLATES
// =============================================================================

/**
 * ACR/EULAR RA Classification Criteria template
 */
export const acrRACriteria: DiagramTemplate = {
  id: 'rheum-acr-ra-criteria',
  name: 'ACR/EULAR RA Classification Criteria',
  description: '2010 ACR/EULAR classification criteria for rheumatoid arthritis',
  domain: 'medicine',
  promptTemplate: `Create an ACR/EULAR RA classification criteria diagram:
- Joint involvement scoring: {{jointInvolvement}}
- Serology (RF/anti-CCP): {{serology}}
- Acute phase reactants: {{acutePhase}}
- Duration criteria: {{duration}}
- Score thresholds: {{scoreThresholds}}
- Exclusions: {{exclusions}}
- Application guidance: {{applicationGuidance}}
{{#additionalNotes}}Clinical pearls: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'jointInvolvement',
    'serology',
    'acutePhase',
    'duration',
    'scoreThresholds',
    'exclusions',
    'applicationGuidance',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Score["Score Components (need ≥6)"]
        A["Joint Involvement\\n1 large: 0\\n2-10 large: 1\\n1-3 small: 2\\n4-10 small: 3\\n>10 +1 small: 5"]
        B["Serology\\nNeg: 0\\nLow pos: 2\\nHigh pos: 3"]
        C["Acute Phase\\nNormal: 0\\nAbnormal: 1"]
        D["Duration\\n<6 wks: 0\\n≥6 wks: 1"]
    end
    A & B & C & D --> E{"Total\\nScore?"}
    E -->|"≥6"| F["Definite RA"]
    E -->|"<6"| G["Not classified\\nas RA"]
    style F fill:#DC143C,color:#fff`,
};

/**
 * SLICC/ACR Lupus Classification Criteria template
 */
export const sliccLupusCriteria: DiagramTemplate = {
  id: 'rheum-slicc-lupus-criteria',
  name: 'SLICC Lupus Classification Criteria',
  description: 'SLICC 2012 and ACR 1997 classification criteria for SLE',
  domain: 'medicine',
  promptTemplate: `Create a lupus classification criteria diagram:
- Clinical criteria: {{clinicalCriteria}}
- Immunologic criteria: {{immunologicCriteria}}
- Biopsy-proven nephritis: {{biopsyProvenNephritis}}
- Required combinations: {{requiredCombinations}}
- Sensitivity/specificity: {{sensitivity}}
- Comparison to ACR 1997: {{comparisonACR}}
{{#additionalNotes}}Updates and considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'clinicalCriteria',
    'immunologicCriteria',
    'biopsyProvenNephritis',
    'requiredCombinations',
    'sensitivity',
    'comparisonACR',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Clinical["Clinical (11)"]
        A["Acute cutaneous\\nChronic cutaneous"]
        B["Oral/nasal ulcers\\nAlopecia"]
        C["Arthritis\\nSerositis"]
        D["Renal\\nNeurologic"]
        E["Hemolytic anemia\\nLeukopenia\\nThrombocytopenia"]
    end
    subgraph Immuno["Immunologic (6)"]
        F["ANA\\nAnti-dsDNA"]
        G["Anti-Sm\\nAntiphospholipid"]
        H["Low complement\\nDirect Coombs"]
    end
    A & B & C & D & E & F & G & H --> I{"≥4 criteria\\n(1 clinical + 1 immuno)\\nOR Biopsy-proven LN + ANA/dsDNA"}
    I --> J["SLE Classification"]
    style J fill:#9370DB,color:#fff`,
};

/**
 * DAS28 Disease Activity Score template
 */
export const das28Score: DiagramTemplate = {
  id: 'rheum-das28-score',
  name: 'DAS28 Disease Activity Score',
  description: 'Disease Activity Score calculation and interpretation for RA',
  domain: 'medicine',
  promptTemplate: `Create a DAS28 disease activity score diagram:
- Tender joint count: {{tenderJoints}}
- Swollen joint count: {{swollenJoints}}
- ESR or CRP value: {{acutePhase}}
- Patient global assessment: {{patientGlobal}}
- Calculation formula: {{formula}}
- Score thresholds: {{thresholds}}
- Clinical interpretation: {{interpretation}}
- Treatment decisions: {{treatmentDecisions}}
{{#additionalNotes}}Limitations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'tenderJoints',
    'swollenJoints',
    'acutePhase',
    'patientGlobal',
    'formula',
    'thresholds',
    'interpretation',
    'treatmentDecisions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Components["DAS28 Components"]
        A["TJC28\\n(0-28 joints)"]
        B["SJC28\\n(0-28 joints)"]
        C["ESR or CRP"]
        D["Patient VAS\\n(0-100mm)"]
    end
    A & B & C & D --> E["DAS28 Score"]
    E --> F{"Score?"}
    F -->|"<2.6"| G["Remission"]
    F -->|"2.6-3.2"| H["Low Activity"]
    F -->|"3.2-5.1"| I["Moderate"]
    F -->|">5.1"| J["High Activity"]
    style G fill:#228B22,color:#fff
    style H fill:#90EE90,color:#000
    style I fill:#FFA500,color:#000
    style J fill:#DC143C,color:#fff`,
};

/**
 * Joint Examination Template template
 */
export const jointExamination: DiagramTemplate = {
  id: 'rheum-joint-examination',
  name: 'Systematic Joint Examination',
  description: 'Comprehensive joint examination template for rheumatologic assessment',
  domain: 'medicine',
  promptTemplate: `Create a systematic joint examination diagram:
- Inspection findings: {{inspectionFindings}}
- Palpation assessment: {{palpation}}
- Range of motion: {{rangeOfMotion}}
- Special tests: {{specialTests}}
- Joint pattern: {{jointPattern}}
- Extra-articular signs: {{extraArticularSigns}}
- Documentation format: {{documentation}}
- Red flags: {{redFlags}}
{{#additionalNotes}}Pediatric considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'inspectionFindings',
    'palpation',
    'rangeOfMotion',
    'specialTests',
    'jointPattern',
    'extraArticularSigns',
    'documentation',
    'redFlags',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph GALS["GALS Screen"]
        A["Gait\\nArms\\nLegs\\nSpine"]
    end
    subgraph Detailed["Regional Exam"]
        B["Hands/Wrists"]
        C["Elbows/Shoulders"]
        D["Hips/Knees"]
        E["Ankles/Feet"]
        F["Spine/SI joints"]
    end
    A -->|"Abnormal"| B & C & D & E & F
    subgraph Each["Each Joint"]
        G["Look: Swelling, erythema, deformity"]
        H["Feel: Warmth, tenderness, effusion"]
        I["Move: Active, passive, crepitus"]
    end
    B & C & D & E & F --> G --> H --> I`,
};

/**
 * SLEDAI Disease Activity Score template
 */
export const sledaiScore: DiagramTemplate = {
  id: 'rheum-sledai-score',
  name: 'SLEDAI Disease Activity Score',
  description: 'Systemic Lupus Erythematosus Disease Activity Index calculation',
  domain: 'medicine',
  promptTemplate: `Create a SLEDAI disease activity score diagram:
- CNS manifestations: {{cnsManifestations}}
- Vascular manifestations: {{vascularManifestations}}
- Renal manifestations: {{renalManifestations}}
- Musculoskeletal: {{musculoskeletal}}
- Mucocutaneous: {{mucocutaneous}}
- Serology changes: {{serologyChanges}}
- Score calculation: {{scoreCalculation}}
- Activity levels: {{activityLevels}}
{{#additionalNotes}}Flare definition: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'cnsManifestations',
    'vascularManifestations',
    'renalManifestations',
    'musculoskeletal',
    'mucocutaneous',
    'serologyChanges',
    'scoreCalculation',
    'activityLevels',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph High["High Weight (8)"]
        A["Seizure\\nPsychosis\\nOrganic brain"]
    end
    subgraph Medium["Medium Weight (4)"]
        B["Vasculitis\\nArthritis\\nMyositis"]
        C["Casts\\nHematuria\\nProteinuria"]
    end
    subgraph Low["Low Weight (1-2)"]
        D["Rash\\nAlopecia\\nMucosal ulcers"]
        E["Pleurisy\\nPericarditis\\nFever"]
    end
    subgraph Serologic["Serologic (2)"]
        F["Low complement\\nAnti-dsDNA"]
    end
    A & B & C & D & E & F --> G["SLEDAI Score"]
    G --> H{"Activity?"}
    H -->|"0"| I["Inactive"]
    H -->|"1-5"| J["Mild"]
    H -->|"6-10"| K["Moderate"]
    H -->|"11-19"| L["High"]
    H -->|"≥20"| M["Very High"]
    style M fill:#DC143C,color:#fff`,
};

// =============================================================================
// DATA VISUALIZATION TEMPLATES
// =============================================================================

/**
 * Autoantibody Interpretation Guide template
 */
export const autoantibodyInterpretation: DiagramTemplate = {
  id: 'rheum-autoantibody-interpretation',
  name: 'Autoantibody Interpretation Guide',
  description: 'Clinical interpretation of common rheumatologic autoantibodies',
  domain: 'medicine',
  promptTemplate: `Create an autoantibody interpretation guide:
- ANA patterns and associations: {{anaPatterns}}
- Anti-dsDNA significance: {{antidsDNA}}
- ENA panel interpretation: {{enaPanel}}
- RA-specific antibodies: {{raAntibodies}}
- Myositis-specific antibodies: {{myositisAntibodies}}
- ANCA patterns: {{ancaPatterns}}
- Sensitivity/specificity data: {{testCharacteristics}}
- Clinical context importance: {{clinicalContext}}
{{#additionalNotes}}Ordering guidance: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'anaPatterns',
    'antidsDNA',
    'enaPanel',
    'raAntibodies',
    'myositisAntibodies',
    'ancaPatterns',
    'testCharacteristics',
    'clinicalContext',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph ANA["ANA Patterns"]
        A["Homogeneous: SLE, Drug-induced"]
        B["Speckled: MCTD, Sjogren, SLE"]
        C["Nucleolar: Scleroderma"]
        D["Centromere: Limited SSc"]
    end
    subgraph Specific["Disease-Specific"]
        E["Anti-dsDNA: SLE (nephritis)"]
        F["Anti-Sm: SLE (specific)"]
        G["Anti-CCP: RA (specific)"]
        H["Anti-Scl70: Diffuse SSc"]
        I["Anti-Jo1: Antisynthetase"]
    end
    subgraph ANCA["ANCA"]
        J["c-ANCA/PR3: GPA"]
        K["p-ANCA/MPO: MPA, EGPA"]
    end
    style E fill:#9370DB,color:#fff
    style G fill:#DC143C,color:#fff
    style J fill:#FFA500,color:#000`,
};

/**
 * DMARD Monitoring Protocol template
 */
export const dmardMonitoring: DiagramTemplate = {
  id: 'rheum-dmard-monitoring',
  name: 'DMARD Monitoring Protocol',
  description: 'Laboratory and clinical monitoring schedule for DMARDs',
  domain: 'medicine',
  promptTemplate: `Create a DMARD monitoring protocol:
- Methotrexate monitoring: {{mtxMonitoring}}
- Leflunomide monitoring: {{lefMonitoring}}
- Sulfasalazine monitoring: {{ssaMonitoring}}
- Hydroxychloroquine monitoring: {{hcqMonitoring}}
- Biologic monitoring: {{biologicMonitoring}}
- JAK inhibitor monitoring: {{jakMonitoring}}
- Baseline requirements: {{baselineRequirements}}
- Frequency schedule: {{frequencySchedule}}
{{#additionalNotes}}Action thresholds: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'mtxMonitoring',
    'lefMonitoring',
    'ssaMonitoring',
    'hcqMonitoring',
    'biologicMonitoring',
    'jakMonitoring',
    'baselineRequirements',
    'frequencySchedule',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Baseline["Baseline Labs"]
        A["CBC, CMP, LFTs"]
        B["Hepatitis B/C"]
        C["TB screening"]
        D["Pregnancy test"]
    end
    subgraph MTX["Methotrexate"]
        E["CBC, CMP q2-4wk x3mo"]
        F["Then q8-12wk"]
        G["Add Folic acid 1mg"]
    end
    subgraph Bio["Biologics"]
        H["Infection screening"]
        I["Monitor for infections"]
        J["Periodic labs"]
    end
    subgraph JAK["JAK Inhibitors"]
        K["CBC q4wk initially"]
        L["Lipids at 4-8wk"]
        M["VTE risk assess"]
    end
    A & B & C & D --> E & H & K
    style E fill:#4169E1,color:#fff
    style M fill:#DC143C,color:#fff`,
};

/**
 * Biologic Selection Guide template
 */
export const biologicSelection: DiagramTemplate = {
  id: 'rheum-biologic-selection',
  name: 'Biologic Selection Guide',
  description: 'Evidence-based guide for selecting biologic therapy in rheumatic diseases',
  domain: 'medicine',
  promptTemplate: `Create a biologic selection guide:
- Disease indication: {{diseaseIndication}}
- Mechanism options: {{mechanismOptions}}
- TNF inhibitors: {{tnfInhibitors}}
- IL-6 inhibitors: {{il6Inhibitors}}
- T-cell costimulation: {{tcellCostim}}
- B-cell depletion: {{bcellDepletion}}
- JAK inhibitors: {{jakInhibitors}}
- Patient factors: {{patientFactors}}
- Contraindications: {{contraindications}}
{{#additionalNotes}}Cost considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'diseaseIndication',
    'mechanismOptions',
    'tnfInhibitors',
    'il6Inhibitors',
    'tcellCostim',
    'bcellDepletion',
    'jakInhibitors',
    'patientFactors',
    'contraindications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("MTX\\nInadequate")] --> B{"Considerations?"}
    B -->|"Standard"| C["TNF Inhibitor"]
    B -->|"CHF concern"| D["Avoid TNFi\\n→ Abatacept, Tocilizumab"]
    B -->|"Prior TB"| E["Prefer Abatacept"]
    B -->|"MS history"| F["Avoid TNFi"]
    B -->|"Oral preferred"| G["JAK inhibitor\\n(assess VTE risk)"]
    C --> H{"Response?"}
    H -->|"No"| I["Switch mechanism\\nor 2nd TNFi"]
    H -->|"Yes"| J["Continue\\nMonitor"]
    subgraph Mechanisms["Available Mechanisms"]
        K["TNFi: Ada, Eta, Inf, Gol, Cer"]
        L["IL-6i: Toci, Sari"]
        M["Abatacept (CTLA4-Ig)"]
        N["Rituximab (anti-CD20)"]
        O["JAKi: Tofa, Bari, Upa"]
    end
    style C fill:#4169E1,color:#fff
    style J fill:#228B22,color:#fff`,
};

// =============================================================================
// ADDITIONAL DECISION TREES
// =============================================================================

/**
 * Spondyloarthropathy Treatment Algorithm template
 */
export const spondyloarthropathyTreatment: DiagramTemplate = {
  id: 'rheum-spondyloarthropathy-treatment',
  name: 'Spondyloarthropathy Treatment Algorithm',
  description: 'Treatment approach for axial and peripheral spondyloarthritis following ASAS/EULAR guidelines',
  domain: 'medicine',
  promptTemplate: `Create a spondyloarthropathy treatment algorithm:
- Disease phenotype (axial vs peripheral): {{phenotype}}
- Disease activity measures: {{activityMeasures}}
- Initial NSAID trial: {{nsaidTrial}}
- TNF inhibitor indications: {{tnfIndicatons}}
- IL-17 inhibitor options: {{il17Options}}
- JAK inhibitor considerations: {{jakConsiderations}}
- Physical therapy role: {{physicalTherapy}}
- Monitoring approach: {{monitoring}}
{{#additionalNotes}}Extra-articular considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'phenotype',
    'activityMeasures',
    'nsaidTrial',
    'tnfIndicatons',
    'il17Options',
    'jakConsiderations',
    'physicalTherapy',
    'monitoring',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Spondyloarthropathy\\nDiagnosis")] --> B{"Axial or\\nPeripheral?"}
    B -->|"Axial SpA"| C["NSAIDs\\n+ Physical therapy"]
    B -->|"Peripheral SpA"| D["NSAIDs +/- DMARD\\n(SSZ, MTX)"]
    C --> E{"BASDAI/ASDAS\\nResponse?"}
    E -->|"Inadequate"| F["TNF inhibitor"]
    E -->|"Good"| G["Continue\\nMonitor"]
    F --> H{"Response?"}
    H -->|"No"| I["IL-17i or JAKi"]
    H -->|"Yes"| J["Continue\\nAssess tapering"]
    D --> K{"Peripheral\\nResponse?"}
    K -->|"No"| L["TNFi/IL-17i"]
    K -->|"Yes"| M["Continue DMARDs"]
    style F fill:#4169E1,color:#fff
    style J fill:#228B22,color:#fff`,
};

/**
 * Antiphospholipid Syndrome Management template
 */
export const apsSyndromeManagement: DiagramTemplate = {
  id: 'rheum-aps-management',
  name: 'Antiphospholipid Syndrome Management',
  description: 'Management approach for APS including thrombosis prevention and pregnancy considerations',
  domain: 'medicine',
  promptTemplate: `Create an antiphospholipid syndrome management algorithm:
- Classification criteria: {{classificationCriteria}}
- Antibody profile: {{antibodyProfile}}
- Thrombosis history: {{thrombosisHistory}}
- Anticoagulation approach: {{anticoagulation}}
- Pregnancy management: {{pregnancyManagement}}
- Catastrophic APS recognition: {{catastrophicAPS}}
- Risk stratification: {{riskStratification}}
- Monitoring: {{monitoring}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'classificationCriteria',
    'antibodyProfile',
    'thrombosisHistory',
    'anticoagulation',
    'pregnancyManagement',
    'catastrophicAPS',
    'riskStratification',
    'monitoring',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("APS\\nDiagnosis")] --> B{"Thrombosis\\nType?"}
    B -->|"Arterial"| C["Warfarin INR 2-3\\nor 3-4 if recurrent"]
    B -->|"Venous"| D["Warfarin INR 2-3\\nLifelong"]
    B -->|"Obstetric only"| E["LMWH + ASA\\nduring pregnancy"]
    C --> F{"Triple\\nPositive?"}
    D --> F
    F -->|"Yes"| G["Higher intensity\\nAvoid DOACs"]
    F -->|"No"| H["Standard\\nanticoagulation"]
    subgraph CAPS["Catastrophic APS"]
        I["Anticoagulation\\n+ Steroids\\n+ PLEX/IVIG"]
    end
    style G fill:#DC143C,color:#fff
    style I fill:#8B0000,color:#fff`,
};

/**
 * Systemic Sclerosis Management template
 */
export const systemicSclerosisManagement: DiagramTemplate = {
  id: 'rheum-ssc-management',
  name: 'Systemic Sclerosis Management',
  description: 'Organ-based management approach for systemic sclerosis/scleroderma',
  domain: 'medicine',
  promptTemplate: `Create a systemic sclerosis management algorithm:
- Disease subtype (limited vs diffuse): {{subtype}}
- Skin involvement: {{skinInvolvement}}
- ILD screening and treatment: {{ildManagement}}
- PAH screening and treatment: {{pahManagement}}
- GI manifestations: {{giManifestations}}
- Raynaud's/digital ulcers: {{raynaudsManagement}}
- Renal crisis prevention: {{renalCrisis}}
- Autoantibody associations: {{antibodies}}
{{#additionalNotes}}Emerging therapies: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'subtype',
    'skinInvolvement',
    'ildManagement',
    'pahManagement',
    'giManifestations',
    'raynaudsManagement',
    'renalCrisis',
    'antibodies',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Systemic\\nSclerosis")] --> B{"Subtype?"}
    B -->|"Limited (lcSSc)"| C["Anti-centromere Ab\\nPAH risk high"]
    B -->|"Diffuse (dcSSc)"| D["Anti-Scl70\\nILD, renal crisis risk"]
    C --> E["Annual Echo\\nfor PAH screen"]
    D --> F["PFTs q6-12mo\\nfor ILD screen"]
    subgraph Organ["Organ Management"]
        G["ILD: Nintedanib/MMF"]
        H["PAH: ERA, PDE5i, prostacyclin"]
        I["GI: PPI, prokinetics"]
        J["Raynaud: CCB, PDE5i"]
        K["Skin: MTX, MMF"]
    end
    E --> H
    F --> G
    subgraph Emergency["Emergency"]
        L["Renal Crisis:\\nACEi urgently"]
    end
    style L fill:#DC143C,color:#fff
    style H fill:#FFA500,color:#000`,
};

/**
 * Inflammatory Myopathy Workup template
 */
export const myopathyWorkup: DiagramTemplate = {
  id: 'rheum-myopathy-workup',
  name: 'Inflammatory Myopathy Workup',
  description: 'Diagnostic approach for dermatomyositis, polymyositis, and other inflammatory myopathies',
  domain: 'medicine',
  promptTemplate: `Create an inflammatory myopathy workup algorithm:
- Clinical presentation: {{presentation}}
- Muscle enzymes (CK, aldolase): {{muscleEnzymes}}
- Myositis-specific antibodies: {{myositisAntibodies}}
- Myositis-associated antibodies: {{associatedAntibodies}}
- EMG findings: {{emgFindings}}
- MRI indications: {{mriIndications}}
- Muscle biopsy: {{muscleBiopsy}}
- Malignancy screening: {{malignancyScreening}}
{{#additionalNotes}}ILD evaluation: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentation',
    'muscleEnzymes',
    'myositisAntibodies',
    'associatedAntibodies',
    'emgFindings',
    'mriIndications',
    'muscleBiopsy',
    'malignancyScreening',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Proximal Weakness\\n+ Elevated CK")] --> B["MSA/MAA Panel"]
    B --> C{"Specific\\nAntibody?"}
    C -->|"Anti-Jo1, PL-7, PL-12"| D["Antisynthetase\\nSyndrome"]
    C -->|"Anti-Mi2"| E["Classic DM\\nGood prognosis"]
    C -->|"Anti-MDA5"| F["Amyopathic DM\\nRapid ILD risk"]
    C -->|"Anti-SRP, HMGCR"| G["Necrotizing\\nMyopathy"]
    D --> H["High-dose steroids\\n+ Steroid-sparing"]
    E --> H
    F --> I["Aggressive IS\\nILD monitoring"]
    G --> J["IVIG +/- IS"]
    subgraph Workup["Full Workup"]
        K["MRI muscle"]
        L["EMG"]
        M["Biopsy if needed"]
        N["Cancer screen (DM)"]
    end
    style F fill:#DC143C,color:#fff
    style I fill:#FFA500,color:#000`,
};

/**
 * Sjogren's Syndrome Management template
 */
export const sjogrenManagement: DiagramTemplate = {
  id: 'rheum-sjogren-management',
  name: 'Sjogren Syndrome Management',
  description: 'Management approach for primary and secondary Sjogren syndrome',
  domain: 'medicine',
  promptTemplate: `Create a Sjogren syndrome management algorithm:
- Sicca symptoms management: {{siccaManagement}}
- Salivary gland assessment: {{salivaryAssessment}}
- Extraglandular manifestations: {{extraglandular}}
- Systemic treatment indications: {{systemicTreatment}}
- Lymphoma surveillance: {{lymphomaSurveillance}}
- Fatigue management: {{fatigueManagement}}
- Dental care: {{dentalCare}}
- Ophthalmologic follow-up: {{ophthalmology}}
{{#additionalNotes}}Quality of life: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'siccaManagement',
    'salivaryAssessment',
    'extraglandular',
    'systemicTreatment',
    'lymphomaSurveillance',
    'fatigueManagement',
    'dentalCare',
    'ophthalmology',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Sjogren\\nSyndrome")] --> B["All patients:\\nArtificial tears/saliva"]
    B --> C{"Extraglandular\\nManifestations?"}
    C -->|"Sicca only"| D["Topical therapy\\nPilocarpine/Cevimeline"]
    C -->|"Arthritis"| E["HCQ +/- MTX"]
    C -->|"Vasculitis/Neuro"| F["Steroids + IS\\n(RTX, AZA, CYC)"]
    B --> G["Monitor for Lymphoma"]
    G --> H["Annual: Salivary US\\nMonitor IgM, cryos"]
    subgraph Support["Supportive Care"]
        I["Frequent dental visits"]
        J["Ophthalmology q6-12mo"]
        K["Punctal plugs if severe"]
    end
    style F fill:#DC143C,color:#fff
    style G fill:#FFA500,color:#000`,
};

/**
 * Septic Arthritis Emergency template
 */
export const septicArthritisEmergency: DiagramTemplate = {
  id: 'rheum-septic-arthritis-emergency',
  name: 'Septic Arthritis Emergency Management',
  description: 'Emergency approach to suspected septic arthritis',
  domain: 'medicine',
  promptTemplate: `Create a septic arthritis emergency algorithm:
- Clinical presentation: {{presentation}}
- Risk factors: {{riskFactors}}
- Arthrocentesis urgency: {{arthrocentesisUrgency}}
- Synovial fluid analysis: {{synovialAnalysis}}
- Empiric antibiotics: {{empiricAntibiotics}}
- Surgical drainage indications: {{surgicalIndications}}
- Native vs prosthetic joint: {{jointType}}
- Response assessment: {{responseAssessment}}
{{#additionalNotes}}Gonococcal considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentation',
    'riskFactors',
    'arthrocentesisUrgency',
    'synovialAnalysis',
    'empiricAntibiotics',
    'surgicalIndications',
    'jointType',
    'responseAssessment',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Hot, Swollen\\nJoint")] --> B["URGENT\\nArthrocentesis"]
    B --> C{"WBC\\n>50,000?"}
    C -->|"Yes + purulent"| D["Empiric Abx:\\nVanc + Ceftriaxone"]
    C -->|"Borderline"| E["Gram stain\\nCulture pending"]
    D --> F{"Native or\\nProsthetic?"}
    F -->|"Native"| G["Serial drainage\\nIV Abx 2-4 weeks"]
    F -->|"Prosthetic"| H["Ortho consult\\nSurgical debridement"]
    G --> I{"Improving?"}
    I -->|"No"| J["Surgical washout"]
    I -->|"Yes"| K["Complete Abx\\nPT/rehab"]
    style A fill:#DC143C,color:#fff
    style B fill:#DC143C,color:#fff
    style H fill:#FFA500,color:#000`,
};

/**
 * Osteoporosis Screening and Treatment template
 */
export const rheumOsteoporosisManagement: DiagramTemplate = {
  id: 'rheum-osteoporosis-management',
  name: 'Osteoporosis Screening and Treatment',
  description: 'Comprehensive osteoporosis evaluation and treatment algorithm',
  domain: 'medicine',
  promptTemplate: `Create an osteoporosis management algorithm:
- Screening indications: {{screeningIndications}}
- DEXA interpretation: {{dexaInterpretation}}
- FRAX assessment: {{fraxAssessment}}
- Secondary causes workup: {{secondaryCauses}}
- First-line therapy: {{firstLineTherapy}}
- Bisphosphonate selection: {{bisphosphonateSelection}}
- Anabolic therapy indications: {{anabolicIndications}}
- Monitoring and duration: {{monitoring}}
{{#additionalNotes}}Drug holidays: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'screeningIndications',
    'dexaInterpretation',
    'fraxAssessment',
    'secondaryCauses',
    'firstLineTherapy',
    'bisphosphonateSelection',
    'anabolicIndications',
    'monitoring',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Osteoporosis\\nScreening")] --> B{"Who to\\nScreen?"}
    B -->|"Women ≥65\\nMen ≥70"| C["DEXA scan"]
    B -->|"Younger + RF"| C
    C --> D{"T-score?"}
    D -->|"≤-2.5"| E["Osteoporosis\\nTreat"]
    D -->|"-1 to -2.5"| F["Osteopenia\\nFRAX score"]
    D -->|">-1"| G["Normal\\nRescreen later"]
    F --> H{"FRAX Hip\\n≥3% or Major\\n≥20%?"}
    H -->|"Yes"| E
    H -->|"No"| I["Lifestyle\\nCalcium/Vit D"]
    E --> J{"Very high risk?\\n(T≤-3, fracture)"}
    J -->|"Yes"| K["Anabolic first\\n(Teriparatide, Romosozumab)"]
    J -->|"No"| L["Bisphosphonate\\n(Alendronate, Zoledronic)"]
    style E fill:#DC143C,color:#fff
    style K fill:#FFA500,color:#000`,
};

/**
 * Juvenile Idiopathic Arthritis Management template
 */
export const jiaManagement: DiagramTemplate = {
  id: 'rheum-jia-management',
  name: 'JIA Management Algorithm',
  description: 'Treatment approach for juvenile idiopathic arthritis by subtype',
  domain: 'medicine',
  promptTemplate: `Create a JIA management algorithm:
- JIA subtype classification: {{subtypeClassification}}
- Initial treatment approach: {{initialTreatment}}
- DMARD selection: {{dmardSelection}}
- Biologic therapy: {{biologicTherapy}}
- Uveitis screening: {{uveitisScreening}}
- Growth monitoring: {{growthMonitoring}}
- MAS recognition: {{masRecognition}}
- Transition to adult care: {{transitionCare}}
{{#additionalNotes}}Psychosocial support: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'subtypeClassification',
    'initialTreatment',
    'dmardSelection',
    'biologicTherapy',
    'uveitisScreening',
    'growthMonitoring',
    'masRecognition',
    'transitionCare',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("JIA\\nDiagnosis")] --> B{"ILAR\\nSubtype?"}
    B -->|"Oligoarticular"| C["Intra-articular steroid\\n+/- MTX"]
    B -->|"Polyarticular\\nRF-/RF+"| D["MTX first-line"]
    B -->|"Systemic (sJIA)"| E["Anakinra/Tocilizumab\\n+ Steroids"]
    B -->|"Enthesitis-related"| F["NSAIDs\\n→ SSZ → TNFi"]
    C --> G["Uveitis Screen:\\nANA+: q3mo\\nANA-: q6mo"]
    D --> H{"Response\\n3-6mo?"}
    H -->|"No"| I["Add biologic\\n(TNFi, Abatacept)"]
    H -->|"Yes"| J["Continue MTX\\nMonitor growth"]
    subgraph Emergency["Emergency"]
        K["MAS: High ferritin\\nDIC, hepatitis"]
    end
    E --> K
    style E fill:#FFA500,color:#000
    style K fill:#DC143C,color:#fff`,
};

/**
 * Fibromyalgia Assessment template
 */
export const fibromyalgiaAssessment: DiagramTemplate = {
  id: 'rheum-fibromyalgia-assessment',
  name: 'Fibromyalgia Assessment and Management',
  description: 'Diagnostic and management approach for fibromyalgia',
  domain: 'medicine',
  promptTemplate: `Create a fibromyalgia assessment algorithm:
- Diagnostic criteria (2016 ACR): {{diagnosticCriteria}}
- Widespread pain index: {{painIndex}}
- Symptom severity scale: {{severityScale}}
- Differential diagnosis: {{differentialDiagnosis}}
- Non-pharmacologic treatment: {{nonPharmacologic}}
- Pharmacologic options: {{pharmacologicOptions}}
- Comorbidity management: {{comorbidities}}
- Follow-up approach: {{followUp}}
{{#additionalNotes}}Patient education: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'diagnosticCriteria',
    'painIndex',
    'severityScale',
    'differentialDiagnosis',
    'nonPharmacologic',
    'pharmacologicOptions',
    'comorbidities',
    'followUp',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Chronic Widespread\\nPain")] --> B["2016 ACR Criteria:\\nWPI + SSS"]
    B --> C{"WPI ≥7 + SSS ≥5\\nOR WPI 4-6 + SSS ≥9?"}
    C -->|"Yes"| D["Fibromyalgia\\nDiagnosis"]
    C -->|"No"| E["Consider other\\ndiagnoses"]
    D --> F["Non-pharm first:\\nExercise, CBT, Sleep hygiene"]
    F --> G{"Adequate\\nRelief?"}
    G -->|"No"| H["Add medication"]
    G -->|"Yes"| I["Continue\\nReinforce"]
    H --> J["Options:\\nDuloxetine\\nPregabalin\\nAmitriptyline"]
    subgraph Comorbid["Address Comorbidities"]
        K["Sleep disorders"]
        L["Depression/Anxiety"]
        M["Deconditioning"]
    end
    D --> K & L & M
    style F fill:#228B22,color:#fff`,
};

/**
 * Reactive Arthritis Management template
 */
export const reactiveArthritisManagement: DiagramTemplate = {
  id: 'rheum-reactive-arthritis',
  name: 'Reactive Arthritis Management',
  description: 'Management approach for post-infectious reactive arthritis',
  domain: 'medicine',
  promptTemplate: `Create a reactive arthritis management algorithm:
- Triggering infection: {{triggeringInfection}}
- Clinical triad: {{clinicalTriad}}
- HLA-B27 status: {{hlaB27}}
- Joint involvement: {{jointInvolvement}}
- Extra-articular features: {{extraArticular}}
- Antibiotic role: {{antibioticRole}}
- NSAID and DMARD therapy: {{nsaidDmard}}
- Prognosis: {{prognosis}}
{{#additionalNotes}}Chronic course management: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'triggeringInfection',
    'clinicalTriad',
    'hlaB27',
    'jointInvolvement',
    'extraArticular',
    'antibioticRole',
    'nsaidDmard',
    'prognosis',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Post-infectious\\nArthritis")] --> B{"Triggering\\nInfection?"}
    B -->|"GI: Salmonella,\\nShigella, Yersinia"| C["Stool studies"]
    B -->|"GU: Chlamydia"| D["Urine NAAT"]
    C & D --> E["Treat active\\ninfection"]
    E --> F["NSAIDs\\n+ PT"]
    F --> G{"Response in\\n4-6 weeks?"}
    G -->|"No"| H["Intra-articular steroid\\nor Sulfasalazine"]
    G -->|"Yes"| I["Continue\\nTaper"]
    H --> J{"Chronic\\ncourse?"}
    J -->|"Yes"| K["MTX or TNFi\\nif HLA-B27+"]
    J -->|"No"| L["Taper therapy"]
    subgraph Triad["Classic Triad"]
        M["Arthritis"]
        N["Urethritis"]
        O["Conjunctivitis"]
    end
    style K fill:#4169E1,color:#fff`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All rheumatology templates
 */
export const rheumatologyTemplates: DiagramTemplate[] = [
  // Decision Trees
  rheumJointPainWorkup,
  raTreatmentAlgorithm,
  lupusManagement,
  goutTreatment,
  vasculitisEvaluation,
  spondyloarthropathyTreatment,
  apsSyndromeManagement,
  systemicSclerosisManagement,
  myopathyWorkup,
  sjogrenManagement,
  septicArthritisEmergency,
  rheumOsteoporosisManagement,
  jiaManagement,
  fibromyalgiaAssessment,
  reactiveArthritisManagement,
  // Anatomical Diagrams
  synovialJointAnatomy,
  inflammatoryVsDegenerative,
  handDeformitiesRA,
  // Assessment Templates
  acrRACriteria,
  sliccLupusCriteria,
  das28Score,
  jointExamination,
  sledaiScore,
  // Data Visualization
  autoantibodyInterpretation,
  dmardMonitoring,
  biologicSelection,
];

export default rheumatologyTemplates;
