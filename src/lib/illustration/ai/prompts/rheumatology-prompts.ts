/**
 * rheumatology-prompts.ts
 * Rheumatology-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for rheumatologic conditions including:
 * - Inflammatory arthritis workups (RA, SLE, gout, spondyloarthritis)
 * - Autoantibody interpretation
 * - Disease activity scoring (DAS28, SLEDAI, CDAI)
 * - DMARD and biologic selection
 * - Joint examination protocols
 * - Vasculitis evaluation
 * - Connective tissue diseases
 * - Crystal arthropathies
 *
 * Total: 25 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// RHEUMATOLOGY DOMAIN PROMPT
// =============================================================================

/**
 * Base rheumatology domain prompt for musculoskeletal and autoimmune diagrams
 */
export const RHEUMATOLOGY_DOMAIN_PROMPT = `
Rheumatology diagram requirements:
- Use standard rheumatologic terminology (synovitis, erosion, pannus, enthesitis)
- Follow ACR/EULAR classification criteria for RA, SLE, and other conditions
- Include autoantibody patterns with clinical correlations
- Use appropriate disease activity scoring systems (DAS28, SLEDAI, CDAI, BASDAI)
- Reference treat-to-target strategies for inflammatory arthritis
- Include joint distribution patterns (symmetric vs asymmetric, small vs large)
- Distinguish inflammatory vs mechanical/degenerative pathology
- Use color coding: Red for inflammation, Blue for immune/antibodies, Yellow for crystals
- Include proper lab value references with units
- Reference current ACR/EULAR treatment guidelines`;

// =============================================================================
// RHEUMATOLOGY-SPECIFIC PROMPTS
// =============================================================================

export const RHEUMATOLOGY_PROMPTS = {
  // Inflammatory Arthritis
  jointPainWorkup: `
Joint Pain Evaluation Algorithm requirements:
- Differentiate inflammatory vs mechanical features
- Assess joint pattern (mono/oligo/polyarticular)
- Consider symmetric vs asymmetric distribution
- Include morning stiffness duration assessment
- Reference initial lab panel (CBC, CMP, ESR, CRP, RF, anti-CCP, ANA)
- Show imaging approach (X-ray first, then US or MRI)
- Include arthrocentesis indications`,

  raClassificationCriteria: `
ACR/EULAR RA Classification Criteria (2010) requirements:
- Include joint involvement scoring (large vs small joints)
- Show serology interpretation (RF, anti-CCP)
- Include acute phase reactant assessment (ESR, CRP)
- Reference duration criteria (>6 weeks)
- Calculate total score threshold (>=6 for definite RA)
- Include exclusions (better explained by other diagnosis)
- Reference early RA window of opportunity`,

  raTreatmentAlgorithm: `
RA Treat-to-Target Algorithm requirements:
- Follow ACR/EULAR treatment recommendations
- Start with methotrexate as anchor drug
- Include disease activity assessment (DAS28, CDAI, SDAI)
- Show treatment target (remission or low disease activity)
- Include escalation to combination csDMARDs
- Reference biologic/targeted synthetic DMARD addition criteria
- Include poor prognostic factor assessment
- Show tapering strategy when sustained remission achieved`,

  dmardMonitoring: `
DMARD Monitoring Protocol requirements:
- Include methotrexate monitoring (CBC, LFTs q2-4 weeks initially)
- Show leflunomide specific monitoring
- Reference hydroxychloroquine eye screening (baseline, 5 years)
- Include sulfasalazine monitoring
- Reference biologic-specific monitoring (TNFi, JAKi)
- Include infection screening (TB, hepatitis) before biologics
- Show JAK inhibitor cardiovascular/VTE risk assessment`,

  // Lupus
  lupusClassificationCriteria: `
SLICC/EULAR-ACR Lupus Classification Criteria requirements:
- Include clinical criteria (skin, joints, serositis, renal, neuro, hematologic)
- Show immunologic criteria (ANA, anti-dsDNA, anti-Sm, antiphospholipid)
- Reference biopsy-proven nephritis pathway
- Include sensitivity/specificity comparison
- Show weighted scoring system (EULAR/ACR 2019)
- Reference entry criterion (ANA >= 1:80)`,

  lupusManagement: `
Lupus Management Algorithm requirements:
- Include hydroxychloroquine for all patients
- Show organ-specific treatment approaches
- Reference lupus nephritis classification and treatment
- Include immunosuppressive options (MMF, AZA, CYC)
- Show belimumab and voclosporin indications
- Reference steroid-sparing strategies
- Include cardiovascular risk management
- Show pregnancy planning considerations`,

  lupusNephritis: `
Lupus Nephritis Management requirements:
- Include ISN/RPS classification (Class I-VI)
- Show induction therapy by class (MMF vs CYC)
- Reference maintenance therapy selection
- Include repeat biopsy indications
- Show treatment failure criteria
- Reference calcineurin inhibitor use
- Include monitoring (proteinuria, creatinine, complement)`,

  // Crystal Arthropathies
  goutManagement: `
Gout Management Algorithm requirements:
- Include acute flare treatment options (colchicine, NSAIDs, steroids)
- Show urate-lowering therapy indications
- Reference target serum urate (<6 mg/dL, <5 for tophaceous)
- Include allopurinol initiation and titration
- Show febuxostat indications and cardiovascular warnings
- Reference flare prophylaxis during ULT initiation
- Include pegloticase for refractory gout`,

  pseudogoutManagement: `
CPPD Disease Management requirements:
- Include crystal identification (rhomboid, weakly positive birefringent)
- Show chondrocalcinosis imaging findings
- Reference acute CPP crystal arthritis treatment
- Include secondary causes workup (hemochromatosis, hyperPTH)
- Show chronic CPPD management
- Reference crowned dens syndrome recognition`,

  // Spondyloarthropathies
  spondyloarthritisWorkup: `
Spondyloarthritis Evaluation requirements:
- Include ASAS classification criteria (axial vs peripheral)
- Show HLA-B27 testing approach
- Reference sacroiliitis imaging (X-ray vs MRI)
- Include extra-articular manifestations (uveitis, IBD, psoriasis)
- Show enthesitis and dactylitis assessment
- Reference family history importance`,

  ankylosingSpondylitisTreatment: `
Ankylosing Spondylitis Treatment Algorithm requirements:
- Include NSAIDs as first-line
- Show TNF inhibitor indications
- Reference IL-17 inhibitor options
- Include JAK inhibitor use
- Show disease activity monitoring (BASDAI, ASDAS)
- Reference physical therapy importance
- Include syndesmophyte progression monitoring`,

  psoriaticArthritisTreatment: `
Psoriatic Arthritis Treatment Algorithm requirements:
- Include domain-based treatment approach
- Show peripheral arthritis management
- Reference axial disease treatment
- Include enthesitis-specific therapy
- Show dactylitis management
- Reference skin disease coordination
- Include IL-17, IL-23, TNFi, JAKi selection`,

  // Vasculitis
  vasculitisClassification: `
Vasculitis Classification Algorithm requirements:
- Classify by vessel size (large, medium, small)
- Include Chapel Hill nomenclature
- Show ANCA-associated vasculitis differentiation (GPA, MPA, EGPA)
- Reference immune-complex small vessel vasculitis
- Include secondary vasculitis exclusion
- Show organ involvement patterns`,

  ancaVasculitisManagement: `
ANCA-Associated Vasculitis Management requirements:
- Include induction therapy (rituximab vs cyclophosphamide)
- Show glucocorticoid tapering protocol
- Reference plasma exchange indications (severe renal, DAH)
- Include maintenance therapy (rituximab vs azathioprine)
- Show relapse management
- Reference avacopan use for glucocorticoid reduction`,

  giantCellArteritisManagement: `
Giant Cell Arteritis Management requirements:
- Include immediate high-dose glucocorticoid initiation
- Show tocilizumab steroid-sparing indication
- Reference temporal artery biopsy timing
- Include visual loss emergency management
- Show large vessel GCA evaluation (PET, CTA)
- Reference PMR overlap management`,

  // Connective Tissue Diseases
  sclerodermaManagement: `
Systemic Sclerosis Management requirements:
- Differentiate limited vs diffuse cutaneous SSc
- Include organ-specific screening protocols
- Show ILD management (nintedanib, MMF)
- Reference PAH screening and treatment
- Include Raynaud's and digital ulcer management
- Show scleroderma renal crisis recognition
- Reference GI dysmotility treatment`,

  myositisWorkup: `
Inflammatory Myopathy Evaluation requirements:
- Include CK and aldolase assessment
- Show myositis-specific antibody panel
- Reference MRI muscle findings
- Include EMG role in diagnosis
- Show muscle biopsy indications
- Reference malignancy screening (especially dermatomyositis)
- Include ILD screening with myositis antibodies`,

  sjogrensSyndromeManagement: `
Sjogren's Syndrome Management requirements:
- Include sicca symptom management
- Show salivary gland assessment (ultrasound, biopsy)
- Reference extraglandular manifestations
- Include systemic treatment indications
- Show lymphoma surveillance
- Reference dental and ophthalmologic care`,

  // Autoantibody Interpretation
  autoantibodyInterpretation: `
Autoantibody Interpretation Guide requirements:
- Include ANA pattern clinical correlations
- Show anti-ENA specificities (Sm, RNP, SSA, SSB, Scl-70, Jo-1)
- Reference RA-specific antibodies (RF, anti-CCP)
- Include myositis-specific antibodies
- Show ANCA interpretation (MPO vs PR3)
- Reference antiphospholipid antibody panel
- Include complement assessment`,

  // Disease Activity Scoring
  diseaseActivityScoring: `
Disease Activity Assessment requirements:
- Include DAS28 calculation (ESR vs CRP versions)
- Show CDAI and SDAI for RA
- Reference SLEDAI-2K for lupus
- Include BASDAI/ASDAS for axial SpA
- Show ACR response criteria
- Reference remission definitions
- Include treatment target thresholds`,

  // Biologic Selection
  biologicSelectionGuide: `
Biologic Selection Algorithm requirements:
- Include mechanism-based selection
- Show TNF inhibitor options and differences
- Reference IL-6 inhibitor indications
- Include T-cell costimulation blocker use
- Show B-cell depletion therapy indications
- Reference JAK inhibitor selection and risks
- Include biosimilar considerations`,

  // Joint Examination
  jointExaminationProtocol: `
Systematic Joint Examination requirements:
- Include GALS screening approach
- Show detailed regional examination
- Reference synovitis vs effusion vs bony swelling
- Include tender and swollen joint count
- Show enthesitis examination points
- Reference nail and skin examination for PsA
- Include spine mobility assessment`,

  // Osteoarthritis
  osteoarthritisManagement: `
Osteoarthritis Management Algorithm requirements:
- Include non-pharmacologic interventions first
- Show weight management importance
- Reference exercise prescription
- Include topical vs oral NSAID selection
- Show intra-articular injection options (corticosteroid, HA)
- Reference duloxetine for chronic OA pain
- Include surgical referral criteria`,

  // Antiphospholipid Syndrome
  apsManagement: `
Antiphospholipid Syndrome Management requirements:
- Include classification criteria (clinical + laboratory)
- Show thrombosis type-specific anticoagulation
- Reference pregnancy management
- Include catastrophic APS recognition
- Show triple-positive high-risk management
- Reference primary vs secondary APS distinction`,

  // Pediatric Rheumatology
  juvenileIdiopathicArthritis: `
Juvenile Idiopathic Arthritis Management requirements:
- Include ILAR classification subtypes
- Show treatment by subtype
- Reference uveitis screening protocols
- Include growth and development monitoring
- Show transition to adult care considerations
- Reference macrophage activation syndrome recognition`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Rheumatology-specific few-shot examples
 */
export const RHEUMATOLOGY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a flowchart for joint pain evaluation',
    output: `flowchart TD
    A[("Joint Pain\\nPresentation")] --> B{"Inflammatory\\nFeatures?"}
    B -->|"Morning stiffness >1hr\\nSwelling, warmth"| C{"Joint\\nPattern?"}
    B -->|"No stiffness\\nMechanical pain"| D["Consider OA\\nTrauma"]
    C -->|"Monoarticular"| E["Acute:\\nSeptic? Crystal?"]
    C -->|"Oligoarticular\\n(2-4 joints)"| F["SpA? ReA?\\nPsA?"]
    C -->|"Polyarticular\\n(>4 joints)"| G{"Symmetric?"}
    G -->|"Yes"| H["RA? SLE?\\nViral?"]
    G -->|"No"| I["PsA? SpA?"]
    E --> J["Arthrocentesis\\nUrgent"]
    H --> K["Labs: RF, CCP\\nANA, CBC, CMP"]
    D --> L["X-ray\\nConservative Tx"]
    style E fill:#DC143C,color:#fff
    style J fill:#DC143C,color:#fff
    style K fill:#4169E1,color:#fff`,
  },
  {
    prompt: 'Create a rheumatoid arthritis treatment algorithm',
    output: `flowchart TD
    A[("Early RA\\nDiagnosis")] --> B["Start MTX\\n15-25mg/week"]
    B --> C["Add Folic Acid\\n+ Bridge Steroids"]
    C --> D{"12-week\\nReassess"}
    D -->|"DAS28 <2.6\\nRemission"| E["Continue MTX\\nMonitor q3mo"]
    D -->|"DAS28 2.6-3.2\\nLDA"| F["Consider\\nContinue vs Escalate"]
    D -->|"DAS28 >3.2\\nModerate-High"| G{"Poor Prognostic\\nFactors?"}
    G -->|"RF+, CCP+, erosions\\nearly damage"| H["Add bDMARD\\nor tsDMARD"]
    G -->|"No"| I["Add csDMARD\\n(HCQ, SSZ, LEF)"]
    H --> J{"Mechanism?"}
    J --> K["TNFi: Ada, Eta, Inf"]
    J --> L["IL-6i: Toci, Sari"]
    J --> M["JAKi: Tofa, Bari, Upa"]
    J --> N["Other: Aba, RTX"]
    K & L & M & N --> O{"Response\\nat 12-24wk?"}
    O -->|"No"| P["Switch mechanism"]
    O -->|"Yes"| Q["Continue\\nConsider taper if sustained"]
    style A fill:#DC143C,color:#fff
    style E fill:#228B22,color:#fff
    style Q fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a lupus management algorithm',
    output: `flowchart TD
    A[("SLE\\nDiagnosis")] --> B["All Patients:\\nHCQ 200-400mg/day"]
    B --> C["+ Vitamin D\\n+ Sunscreen"]
    C --> D{"Organ\\nInvolvement?"}
    D -->|"Mild: Skin,\\nJoints"| E["Low-dose steroids\\n+/- MTX or AZA"]
    D -->|"Nephritis\\nClass III-V"| F["Induction:\\nMMF or CYC\\n+ Steroids"]
    D -->|"Severe: CNS,\\nDAH, TTP"| G["High-dose steroids\\n+ CYC or RTX"]
    F --> H["Add Voclosporin\\nif proteinuric"]
    F --> I{"6-month\\nResponse?"}
    I -->|"Complete"| J["Maintenance:\\nMMF or AZA"]
    I -->|"Partial/None"| K["Switch induction\\nor add Belimumab"]
    E --> L{"Disease\\nActivity?"}
    L -->|"Flares"| M["Add Belimumab\\nor Anifrolumab"]
    L -->|"Controlled"| N["Taper steroids\\nto <7.5mg"]
    J --> O["Goal: Steroid-free\\nLDAC or Remission"]
    style G fill:#DC143C,color:#fff
    style F fill:#FFA500,color:#000
    style O fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a gout treatment flowchart',
    output: `flowchart TD
    A[("Gout\\nDiagnosis")] --> B{"Acute\\nFlare?"}
    B -->|"Yes"| C{"Timing?"}
    C -->|"<12-24hr"| D["Colchicine\\n1.2mg then 0.6mg"]
    C -->|">24hr or\\nCI to colch"| E["NSAID or\\nSteroid"]
    B -->|"No"| F{"ULT\\nIndicated?"}
    F -->|"Tophi, >2 flares/yr,\\nCKD, urate stones"| G["Start ULT"]
    F -->|"First flare,\\nno tophi"| H["Lifestyle\\nReassess in 1yr"]
    G --> I["Allopurinol 100mg\\n(50mg if CKD)"]
    I --> J["Titrate q2-4wk\\nto sUA <6"]
    J --> K["Continue\\nFlare prophylaxis\\n3-6 months"]
    D & E --> L["Can start ULT\\nduring flare if needed"]
    K --> M{"Target\\nAchieved?"}
    M -->|"sUA <6, no flares"| N["Continue ULT\\nlifelong"]
    M -->|"sUA not at goal\\non max allo"| O["Febuxostat or\\nAdd Probenecid"]
    O -->|"Refractory"| P["Consider\\nPegloticase"]
    style D fill:#FFA500,color:#000
    style E fill:#FFA500,color:#000
    style N fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create an ANCA vasculitis management algorithm',
    output: `flowchart TD
    A[("ANCA+\\nVasculitis")] --> B{"Severity?"}
    B -->|"Severe: DAH,\\nRapid GN"| C["Pulse steroids\\n+ PLEX consider"]
    B -->|"Non-severe"| D["High-dose\\nsteroids"]
    C --> E{"Induction\\nChoice?"}
    D --> E
    E -->|"First-line"| F["Rituximab\\n375mg/m2 x4"]
    E -->|"Alternative"| G["CYC IV\\nq2-4 weeks"]
    F & G --> H["Add Avacopan\\nfor steroid reduction"]
    H --> I{"3-6 month\\nResponse?"}
    I -->|"Remission"| J["Maintenance:\\nRTX 500mg q6mo\\nor AZA"]
    I -->|"Refractory"| K["Switch induction\\nagent"]
    J --> L{"Duration?"}
    L -->|"GPA/MPA"| M["Minimum 2 years\\nConsider longer if PR3+"]
    L -->|"Relapse"| N["Re-induce\\nExtend maintenance"]
    style C fill:#DC143C,color:#fff
    style F fill:#4169E1,color:#fff
    style J fill:#228B22,color:#fff`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

export default {
  RHEUMATOLOGY_DOMAIN_PROMPT,
  RHEUMATOLOGY_PROMPTS,
  RHEUMATOLOGY_FEW_SHOT_EXAMPLES,
};
