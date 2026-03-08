/**
 * dermatology-prompts.ts
 * Dermatology-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for dermatologic medicine including:
 * - Skin lesion assessment and classification
 * - Cancer screening and staging
 * - Inflammatory skin disease management
 * - Infectious disease evaluation
 * - Procedural guidance
 * - Wound healing and reconstruction
 * - Pediatric dermatology
 * - Drug eruption assessment
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// DERMATOLOGY DOMAIN PROMPT
// =============================================================================

/**
 * Base dermatology domain prompt for skin disease diagrams
 */
export const DERMATOLOGY_DOMAIN_PROMPT = `
Dermatology diagram requirements:
- Use standard dermatologic terminology (macule, papule, vesicle, etc.)
- Follow ABCDE criteria for pigmented lesion evaluation
- Reference Fitzpatrick skin types where relevant
- Include primary and secondary lesion morphology
- Use anatomical distribution patterns (dermatomal, photodistributed, etc.)
- Follow AAD clinical guidelines where applicable
- Include proper histopathologic descriptions when relevant
- Reference staging systems (AJCC for melanoma, Clark levels)
- Use color coding: Epidermis (tan), Dermis (pink), Inflammation (red), Malignancy (purple)
- Include visual scale references (mm, cm)
- Reference topical steroid potency classes (I-VII)`;

// =============================================================================
// DERMATOLOGY-SPECIFIC PROMPTS
// =============================================================================

export const DERMATOLOGY_PROMPTS = {
  // Clinical Decision Support
  lesionAssessment: `
Skin Lesion Assessment requirements:
- Evaluate primary morphology (flat, raised, fluid-filled)
- Assess color, size, shape, and border characteristics
- Apply ABCDE criteria for pigmented lesions
- Include dermoscopic features if applicable
- Consider distribution pattern (localized, generalized, dermatomal)
- Assess secondary changes (scale, crust, erosion, ulceration)
- Include palpation findings (texture, consistency, tenderness)
- Provide differential diagnosis ranked by likelihood`,

  melanomScreening: `
Melanoma Screening requirements:
- Apply ABCDE criteria systematically
  A: Asymmetry (divide lesion into halves)
  B: Border irregularity (notched, scalloped)
  C: Color variation (multiple colors, blue-black)
  D: Diameter (>6mm or changing size)
  E: Evolution (changing over time)
- Include "ugly duckling" sign assessment
- Reference personal and family risk factors
- Include dermoscopic pattern analysis
- Determine biopsy urgency
- Document photographic comparison if available`,

  rashDifferential: `
Rash Differential Diagnosis requirements:
- Categorize by primary lesion morphology
- Map distribution pattern on body diagram
- Assess acute vs chronic timeline
- Differentiate: infectious, inflammatory, allergic, autoimmune
- Include systemic symptoms review
- Consider drug reaction timeline
- Reference Koebner phenomenon if applicable
- Include appropriate workup recommendations`,

  biopsyTechnique: `
Skin Biopsy Technique Selection requirements:
- Match technique to lesion type and clinical suspicion
- Shave biopsy: superficial lesions, raised benign-appearing
- Punch biopsy: inflammatory conditions, deeper lesions, 3-8mm
- Excisional biopsy: suspicious for melanoma, complete removal
- Incisional biopsy: large lesions, sampling
- Include margin requirements for malignancy
- Specify specimen handling (formalin, Michel's medium, culture)
- Address cosmetic site considerations`,

  // Treatment Algorithms
  acneManagement: `
Acne Management requirements:
- Grade severity (comedonal, papulopustular, nodular, conglobata)
- Match treatment intensity to severity
- First-line: topical retinoids, benzoyl peroxide
- Moderate: combination therapy, topical/oral antibiotics
- Severe: isotretinoin (iPLEDGE requirements)
- Include antibiotic stewardship principles
- Address hormonal options for females (spironolactone, OCPs)
- Include maintenance therapy to prevent relapse
- Address acne scarring prevention and treatment`,

  eczemaManagement: `
Atopic Dermatitis Management requirements:
- Assess disease severity (mild, moderate, severe)
- Use validated scoring (SCORAD, EASI, IGA)
- Baseline: emollients, trigger avoidance, bathing practices
- Mild: low-potency topical corticosteroids, TCIs
- Moderate: mid-potency steroids, wet wrap therapy
- Severe: systemic options (dupilumab, JAK inhibitors, cyclosporine)
- Address secondary infection (S. aureus colonization)
- Include itch management strategies
- Reference step-up/step-down approach`,

  psoriasisManagement: `
Psoriasis Treatment Algorithm requirements:
- Calculate BSA or PASI for severity assessment
- Limited (<5% BSA): topicals (steroids, vitamin D, retinoids)
- Moderate: phototherapy (NB-UVB, PUVA)
- Moderate-severe: systemic agents
  - Traditional: methotrexate, cyclosporine, acitretin
  - Biologics: TNF-i, IL-17i, IL-23i, IL-12/23i
- Screen for psoriatic arthritis (PEST questionnaire)
- Monitor for cardiovascular comorbidities
- Include special site management (scalp, nail, inverse)`,

  urticariaWorkup: `
Chronic Urticaria Evaluation requirements:
- Define chronicity (>6 weeks = chronic)
- Screen for physical urticarias (dermographism, cold, pressure)
- Laboratory workup: CBC, CRP/ESR, TSH, ANA if indicated
- Apply Urticaria Activity Score (UAS7)
- Treatment ladder:
  1. H1 antihistamines (up to 4x standard dose)
  2. Add H2 blocker, LTRA
  3. Omalizumab
  4. Cyclosporine (refractory)
- Assess autoimmune urticaria (autologous serum skin test)
- Include angioedema assessment`,

  // Skin Cancer Management
  bccManagement: `
Basal Cell Carcinoma Management requirements:
- Document tumor characteristics (size, location, subtype)
- Risk stratify based on:
  - Size and location (H zone: central face, ears, temples)
  - Histologic subtype (nodular, superficial, morpheaform)
  - Primary vs recurrent
  - Immunosuppression
- Treatment selection:
  - Low-risk: ED&C, standard excision (4mm margins)
  - High-risk: Mohs surgery, wide excision with margin check
  - Non-surgical: radiation, topical (imiquimod, 5-FU), PDT
  - Advanced: vismodegib, sonidegib
- Follow-up schedule recommendations`,

  sccManagement: `
Squamous Cell Carcinoma Management requirements:
- Document high-risk features:
  - Size >2cm, depth >2mm or beyond subcutis
  - Location (ear, lip, temple, non-sun-exposed)
  - Perineural invasion, poor differentiation
  - Immunosuppression, recurrence
- Treatment by risk:
  - Low-risk: standard excision, ED&C if superficial
  - High-risk: wide excision or Mohs, margin assessment
  - Consider SLNB for very high-risk
- Adjuvant radiation indications
- Systemic therapy: cemiplimab for advanced/metastatic
- Enhanced surveillance for immunosuppressed patients`,

  melanomaStaging: `
Melanoma Staging and Treatment requirements:
- Document Breslow thickness, ulceration, mitotic rate
- Apply AJCC 8th edition staging
- Wide local excision margins by depth:
  - In situ: 5mm
  - <1mm: 1cm
  - 1-2mm: 1-2cm
  - >2mm: 2cm
- SLNB criteria (typically >0.8mm or other high-risk features)
- Imaging by stage (CT, PET/CT, MRI brain)
- Adjuvant therapy options (nivolumab, pembrolizumab, targeted therapy)
- Metastatic treatment (immunotherapy combinations, BRAF/MEK inhibitors)
- Surveillance schedule by stage`,

  aktTreatment: `
Actinic Keratosis Management requirements:
- Assess number and distribution of lesions
- Individual lesion treatment:
  - Cryotherapy (most common)
  - ED&C, shave removal
- Field therapy for multiple/confluent lesions:
  - 5-fluorouracil (Efudex) - various regimens
  - Imiquimod (Aldara, Zyclara)
  - PDT with ALA or MAL
  - Tirbanibulin, ingenol mebutate
- Combination approaches
- Sun protection and prevention counseling
- Monitoring for SCC progression`,

  // Procedural Guidance
  mohsMapping: `
Mohs Surgery Mapping requirements:
- Document precise anatomical location
- Mark initial clinical tumor margins
- Orientation system (hash marks, sutures)
- Stage-by-stage tissue map
- Color-code positive margins by quadrant
- Track tissue layers (epidermis, dermis, fat)
- Final defect dimensions
- Reconstruction options documentation
- Include tissue processing notes`,

  woundHealing: `
Wound Healing and Reconstruction requirements:
- Assess wound characteristics (size, depth, location)
- Consider healing by intention:
  - Primary: direct closure
  - Secondary: granulation
  - Tertiary: delayed closure
- Graft options:
  - STSG (split-thickness) vs FTSG (full-thickness)
  - Donor site selection
- Flap options:
  - Advancement, rotation, transposition
  - Pedicle identification
- Post-operative care and monitoring
- Complication prevention (hematoma, infection, necrosis)`,

  // Infectious Disease
  fungalInfection: `
Superficial Fungal Infection requirements:
- Identify infection pattern:
  - Tinea corporis, capitis, cruris, pedis, unguium
- Diagnostic workup:
  - KOH preparation technique
  - Fungal culture (DTM, Sabouraud's)
  - Wood's lamp (M. canis, C. minutissimum)
- Treatment selection:
  - Topical: azoles, allylamines, ciclopirox
  - Systemic: terbinafine, itraconazole, fluconazole
- Duration by location (skin vs nail)
- Recurrence prevention
- Household contact management for tinea capitis`,

  herpesManagement: `
Cutaneous Herpes Virus Management requirements:
- Distinguish HSV-1/HSV-2 vs VZV
- Primary vs recurrent episode assessment
- Antiviral dosing:
  - HSV: acyclovir, valacyclovir, famciclovir
  - VZV: higher doses, treat within 72 hours
- Episodic vs suppressive therapy indications
- Pain management for zoster
- PHN prevention (antivirals, vaccination)
- Special populations (immunocompromised, pregnancy)
- Vaccination recommendations (Shingrix)`,

  // Special Populations
  pediatricExanthem: `
Pediatric Exanthem Evaluation requirements:
- Distinguish classic childhood exanthems:
  - Measles (Koplik spots, cephalocaudal spread)
  - Rubella (post-auricular LAD, arthralgia)
  - Varicella (crops, vesicular)
  - Erythema infectiosum (slapped cheek)
  - Roseola (high fever then rash)
  - Scarlet fever (sandpaper texture, pastia lines)
- Check vaccination status
- Identify red flags for serious disease:
  - Petechiae (meningococcemia)
  - Mucosal involvement (Kawasaki, SJS)
  - Systemic toxicity
- Appropriate isolation and reporting`,

  drugEruption: `
Cutaneous Drug Reaction Assessment requirements:
- Timeline correlation with medication
- Morphology classification:
  - Morbilliform (most common)
  - Urticarial
  - Fixed drug eruption
  - Vesiculobullous
- Severe reaction screening:
  - SJS/TEN (epidermal detachment, mucosal involvement)
  - DRESS (eosinophilia, organ involvement, LAD)
  - AGEP (pustules, neutrophilia)
- Calculate ALDEN score for causality
- SCORTEN for TEN prognosis
- Culprit drug identification and documentation
- Cross-reactivity considerations`,

  // Additional Specialties
  connectiveTissueSkin: `
Cutaneous Connective Tissue Disease requirements:
- Identify specific skin findings:
  - Lupus: malar rash, discoid lesions, photosensitivity
  - Dermatomyositis: heliotrope, Gottron's papules
  - Scleroderma: sclerodactyly, morphea, calcinosis
- Correlate with systemic involvement
- Include appropriate serologic workup
- Reference malignancy screening for dermatomyositis
- Treatment options (topical, systemic, photoprotection)
- Multidisciplinary collaboration`,

  autoimmuneBlistering: `
Autoimmune Blistering Disease requirements:
- Distinguish by blister level:
  - Intraepidermal: pemphigus (vulgaris, foliaceus)
  - Subepidermal: bullous pemphigoid, MMP, EBA
- Clinical presentation mapping
- Diagnostic workup:
  - Histopathology (routine + DIF)
  - Serologic testing (anti-desmoglein, BP180/230)
- Nikolsky sign assessment
- Treatment ladder:
  - Topical/intralesional steroids
  - Systemic steroids
  - Steroid-sparing agents (azathioprine, MMF, rituximab)
- Wound care and infection prevention`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Dermatology-specific few-shot examples
 */
export const DERMATOLOGY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a flowchart for evaluating a suspicious pigmented lesion',
    output: `flowchart TD
    A[("Pigmented Lesion\\nPresentation")] --> B["ABCDE Assessment"]

    B --> C{"A: Asymmetric?"}
    C -->|"Yes"| D["Risk +1"]
    C -->|"No"| E["Risk +0"]

    D --> F{"B: Border\\nIrregular?"}
    E --> F

    F -->|"Yes"| G["Risk +1"]
    F -->|"No"| H["Risk +0"]

    G --> I{"C: Color\\nVariation?"}
    H --> I

    I -->|"Multiple colors\\nor blue-black"| J["Risk +1"]
    I -->|"Uniform"| K["Risk +0"]

    J --> L{"D: Diameter\\n>6mm?"}
    K --> L

    L -->|"Yes or\\ngrowing"| M["Risk +1"]
    L -->|"<6mm, stable"| N["Risk +0"]

    M --> O{"E: Evolving?"}
    N --> O

    O -->|"Changing"| P["Risk +1"]
    O -->|"Stable"| Q["Risk +0"]

    P --> R{"Total Risk\\nScore?"}
    Q --> R

    R -->|">=2 or\\nany high-risk"| S["Dermoscopy +\\nBiopsy"]
    R -->|"0-1 and\\nlow concern"| T["Photo Document\\nMonitor 3 months"]

    S --> U{"Pathology?"}
    U -->|"Melanoma"| V["Wide Excision\\nStaging Workup"]
    U -->|"Dysplastic"| W["Close Surveillance"]
    U -->|"Benign"| X["Routine F/U"]

    style A fill:#FFA500,color:#000
    style S fill:#DC143C,color:#fff
    style V fill:#4B0082,color:#fff
    style T fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create an acne treatment algorithm based on severity',
    output: `flowchart TD
    A[("Acne Vulgaris\\nAssessment")] --> B{"Severity?"}

    B -->|"Mild\\nComedonal"| C["Topical Retinoid\\n(tretinoin/adapalene)"]
    B -->|"Mild\\nPapulopustular"| D["Retinoid + BPO\\nor BPO/antibiotic"]
    B -->|"Moderate"| E["Combo Topicals +\\nOral Antibiotic"]
    B -->|"Severe/Nodular"| F{"Gender?"}

    C --> G{"Response\\n8-12 weeks?"}
    D --> G
    E --> G

    G -->|"Yes"| H["Continue\\nMaintenance"]
    G -->|"No"| I["Step Up Therapy"]

    I --> E

    F -->|"Female"| J{"Hormonal\\nCandidate?"}
    F -->|"Male"| K["Isotretinoin\\nEvaluation"]

    J -->|"Yes"| L["Spironolactone\\nor OCP"]
    J -->|"No"| K

    L --> M{"Response\\n3 months?"}
    M -->|"Yes"| N["Continue"]
    M -->|"No"| K

    K --> O["iPLEDGE\\nEnrollment"]
    O --> P["Isotretinoin\\n0.5-1mg/kg/day"]
    P --> Q{"Cumulative Dose\\n120-150mg/kg?"}
    Q -->|"Yes"| R["Complete Course"]
    Q -->|"No"| P

    H --> S["Topical Retinoid\\nMaintenance"]

    style A fill:#CD5C5C,color:#fff
    style K fill:#DC143C,color:#fff
    style P fill:#4169E1,color:#fff
    style H fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a basal cell carcinoma treatment decision tree',
    output: `flowchart TD
    A[("BCC\\nDiagnosis")] --> B["Risk Assessment"]

    B --> C{"Location?"}
    C -->|"H Zone\\n(eyes, nose, lips, ears)"| D["HIGH RISK"]
    C -->|"M Zone\\n(cheeks, forehead)"| E["MODERATE"]
    C -->|"L Zone\\n(trunk, extremities)"| F["LOW RISK"]

    D --> G{"Size + Type?"}
    E --> G
    F --> G

    G --> H{"Histologic\\nSubtype?"}
    H -->|"Nodular\\nSuperficial"| I["Lower Risk"]
    H -->|"Morpheaform\\nInfiltrative\\nMicronodular"| J["Higher Risk"]

    I --> K{"Primary or\\nRecurrent?"}
    J --> K

    K -->|"Primary +\\nLow-risk zone\\n+ Favorable type"| L["Standard Excision\\n4mm margins"]
    K -->|"Primary +\\nL zone +\\nSuperficial"| M["ED&C or\\nTopical Tx"]
    K -->|"Recurrent OR\\nHigh-risk zone OR\\nAggressive type"| N["Mohs Surgery"]

    L --> O{"Clear\\nMargins?"}
    M --> P["Follow-up\\n6-12 months"]
    N --> Q["Clear\\nby Mohs"]

    O -->|"Yes"| P
    O -->|"No"| R["Re-excision or\\nMohs"]

    Q --> S["Reconstruction"]
    S --> P

    subgraph NonSurgical["Non-Surgical Options"]
        T["Radiation"]
        U["Topical 5-FU\\nImiquimod"]
        V["PDT"]
    end

    style A fill:#F5DEB3,color:#000
    style D fill:#DC143C,color:#fff
    style N fill:#4169E1,color:#fff
    style P fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a psoriasis treatment algorithm with biologics',
    output: `flowchart TD
    A[("Psoriasis\\nDiagnosis")] --> B["Assess Severity"]

    B --> C{"BSA / PASI?"}
    C -->|"Mild\\n<3% BSA"| D["Topical Therapy"]
    C -->|"Moderate\\n3-10% BSA"| E["Topicals +\\nPhototherapy"]
    C -->|"Severe\\n>10% BSA\\nor Refractory"| F["Systemic Therapy"]

    D --> D1["Topical Steroids"]
    D --> D2["Vitamin D Analogs"]
    D --> D3["Topical Retinoids"]
    D --> D4["Calcineurin Inhibitors\\n(face, folds)"]

    D1 & D2 & D3 & D4 --> G{"Response\\n8 weeks?"}
    G -->|"Yes"| H["Maintenance"]
    G -->|"No"| E

    E --> E1["NB-UVB 2-3x/week"]
    E --> E2["Excimer Laser\\n(localized)"]

    E1 & E2 --> I{"Response\\n12 weeks?"}
    I -->|"Yes"| H
    I -->|"No"| F

    F --> J{"PsA?"}
    J -->|"Yes"| K["Prioritize:\\nTNFi, IL-17i,\\nJAKi"]
    J -->|"No"| L["Options by Profile"]

    L --> M["Methotrexate"]
    L --> N["Apremilast"]
    L --> O["Biologics"]

    O --> P{"Selection?"}
    P --> P1["TNF-i\\n(adalimumab, etc)"]
    P --> P2["IL-17i\\n(secukinumab,\\nixekizumab)"]
    P --> P3["IL-23i\\n(guselkumab,\\nrisankizumab)"]
    P --> P4["IL-12/23i\\n(ustekinumab)"]

    subgraph Screening["Pre-Biologic Screening"]
        S1["TB: IGRA/PPD"]
        S2["Hepatitis B/C"]
        S3["CBC, LFTs"]
        S4["Vaccines"]
    end

    style A fill:#BC8F8F,color:#000
    style O fill:#4169E1,color:#fff
    style P3 fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a chronic urticaria workup and treatment algorithm',
    output: `flowchart TD
    A[("Urticaria\\nPresentation")] --> B{"Duration?"}

    B -->|"<6 weeks"| C["Acute Urticaria"]
    B -->|">6 weeks"| D["Chronic Urticaria"]

    C --> C1["Identify Trigger\\n(infection, drug, food)"]
    C1 --> C2["H1 Antihistamine\\n+ Remove Trigger"]

    D --> E["Evaluate for\\nPhysical Triggers"]
    E --> E1["Dermographism"]
    E --> E2["Cold urticaria"]
    E --> E3["Pressure urticaria"]
    E --> E4["Solar/Aquagenic"]

    E1 & E2 & E3 & E4 --> F{"Physical\\nUrticaria?"}
    F -->|"Yes"| G["Trigger Avoidance\\n+ Antihistamines"]
    F -->|"No"| H["CSU Workup"]

    H --> I["Labs: CBC, CRP/ESR\\nTSH, ± ANA"]
    I --> J["UAS7 Scoring\\n(0-42/week)"]

    J --> K{"Treatment\\nStep 1"}
    K --> L["2nd-gen H1\\nAntihistamine\\n(standard dose)"]

    L --> M{"Response\\n2-4 weeks?"}
    M -->|"Yes"| N["Continue\\nAssess PRN"]
    M -->|"No"| O["Step 2:\\nIncrease to 4x dose"]

    O --> P{"Response?"}
    P -->|"Yes"| N
    P -->|"No"| Q["Step 3: Add\\nH2 blocker or LTRA"]

    Q --> R{"Response?"}
    R -->|"Yes"| N
    R -->|"No"| S["Step 4:\\nOmalizumab 300mg q4w"]

    S --> T{"Response\\n12 weeks?"}
    T -->|"Yes"| U["Continue\\nOmalizumab"]
    T -->|"No"| V["Step 5:\\nCyclosporine"]

    style A fill:#FFB6C1,color:#000
    style D fill:#FFA500,color:#000
    style S fill:#4169E1,color:#fff
    style N fill:#228B22,color:#fff`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

const dermatologyPrompts = {
  DERMATOLOGY_DOMAIN_PROMPT,
  DERMATOLOGY_PROMPTS,
  DERMATOLOGY_FEW_SHOT_EXAMPLES,
};

export default dermatologyPrompts;
