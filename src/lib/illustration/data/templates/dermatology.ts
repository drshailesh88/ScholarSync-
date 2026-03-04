/**
 * Dermatology Templates
 * Comprehensive diagram templates for dermatologic medicine
 *
 * Categories:
 * - Diagnostic Algorithms (lesion assessment, cancer screening)
 * - Anatomical Diagrams (skin layers, structures)
 * - Treatment Pathways (acne, eczema, psoriasis management)
 * - Lesion Documentation (morphology, distribution)
 * - Surgical Planning (Mohs mapping, excision margins)
 * - Skin Cancer Pathways (BCC, SCC, melanoma)
 * - Infectious Disease (fungal, viral, bacterial, parasitic)
 * - Special Populations (pediatric, drug reactions)
 * - Wound Care and Healing (acute, chronic wounds)
 * - Cosmetic Dermatology (lasers, peels, injectables)
 * - Medication Protocols (topical steroids, isotretinoin, biologics)
 * - Hair and Nail Disorders (alopecia, nail abnormalities)
 * - Autoimmune/Blistering Diseases (pemphigus, pemphigoid, CTD)
 * - Photomedicine (phototherapy, sun protection)
 *
 * Total: 40 templates
 */

import type { DiagramTemplate } from './index';

export const dermatologyTemplates: DiagramTemplate[] = [
  // ===========================================================================
  // DIAGNOSTIC ALGORITHMS
  // ===========================================================================
  {
    id: 'derm-lesion-assessment',
    name: 'Skin Lesion Assessment Algorithm',
    description: 'Systematic approach to evaluating skin lesions with differential diagnosis pathway',
    domain: 'medicine',
    promptTemplate: `Create a clinical decision flowchart for skin lesion assessment:

Patient Presentation: {{presentation}}
Key History Points: {{history}}
Lesion Characteristics: {{characteristics}}

The flowchart should include:
1. Initial lesion morphology assessment (flat vs raised, color, texture)
2. Size and border evaluation
3. Distribution pattern analysis
4. Key diagnostic questions (duration, symptoms, evolution)
5. Differential diagnosis branches
6. Recommended workup (dermoscopy, biopsy, labs)
7. Referral criteria

Use dermatology-specific terminology and include ABCDE criteria for pigmented lesions.`,
    placeholders: ['presentation', 'history', 'characteristics'],
    mermaidExample: `flowchart TD
    A[("Skin Lesion\\nPresentation")] --> B{"Morphology?"}
    B -->|"Flat"| C{"Pigmented?"}
    B -->|"Raised"| D{"Solid or\\nFluid-filled?"}
    C -->|"Yes"| E["Evaluate ABCDE"]
    C -->|"No"| F["Consider vitiligo,\\ntinea versicolor"]
    D -->|"Solid"| G{"Size?"}
    D -->|"Fluid"| H{"Clear or\\nPurulent?"}
    E --> I{"Suspicious?"}
    I -->|"Yes"| J["Biopsy"]
    I -->|"No"| K["Monitor + Photo"]`
  },
  {
    id: 'derm-abcde-melanoma-screening',
    name: 'ABCDE Melanoma Screening',
    description: 'Melanoma evaluation using ABCDE criteria with clinical decision support',
    domain: 'medicine',
    promptTemplate: `Create an ABCDE melanoma screening flowchart:

Patient Information: {{patientInfo}}
Lesion Location: {{location}}
Risk Factors: {{riskFactors}}

Include evaluation of:
1. A - Asymmetry assessment
2. B - Border irregularity
3. C - Color variation (multiple colors, blue-black)
4. D - Diameter (>6mm or changing)
5. E - Evolution (recent changes)

Provide scoring guidance and management recommendations based on findings.
Include dermoscopy features and biopsy indications.`,
    placeholders: ['patientInfo', 'location', 'riskFactors'],
  },
  {
    id: 'derm-rash-differential',
    name: 'Rash Differential Diagnosis',
    description: 'Systematic approach to diagnosing cutaneous rashes based on morphology and distribution',
    domain: 'medicine',
    promptTemplate: `Create a rash differential diagnosis flowchart:

Rash Description: {{rashDescription}}
Distribution: {{distribution}}
Associated Symptoms: {{symptoms}}
Patient Demographics: {{demographics}}

The flowchart should categorize by:
1. Primary lesion type (papular, vesicular, pustular, macular)
2. Distribution pattern (localized, generalized, dermatomal)
3. Acute vs chronic presentation
4. Infectious vs inflammatory vs allergic
5. Key differentiating features
6. Recommended workup
7. Treatment pathways`,
    placeholders: ['rashDescription', 'distribution', 'symptoms', 'demographics'],
  },
  {
    id: 'derm-biopsy-selection',
    name: 'Skin Biopsy Technique Selection',
    description: 'Algorithm for selecting appropriate skin biopsy technique based on lesion type',
    domain: 'medicine',
    promptTemplate: `Create a skin biopsy technique selection algorithm:

Lesion Type: {{lesionType}}
Location: {{location}}
Clinical Suspicion: {{suspicion}}

Include decision points for:
1. Shave biopsy (superficial lesions, benign suspected)
2. Punch biopsy (inflammatory, deeper lesions)
3. Excisional biopsy (suspicious for malignancy)
4. Incisional biopsy (large lesions, cosmetically sensitive)

Consider:
- Margin requirements
- Cosmetic outcomes
- Diagnostic adequacy
- Special handling requirements (IF, culture)`,
    placeholders: ['lesionType', 'location', 'suspicion'],
  },

  // ===========================================================================
  // TREATMENT PATHWAYS
  // ===========================================================================
  {
    id: 'derm-acne-management',
    name: 'Acne Vulgaris Management Algorithm',
    description: 'Step-up approach to acne treatment based on severity and response',
    domain: 'medicine',
    promptTemplate: `Create an acne management algorithm:

Acne Severity: {{severity}}
Previous Treatments: {{previousTreatments}}
Patient Factors: {{patientFactors}}

Include treatment ladder:
1. Mild acne: topical retinoids, benzoyl peroxide
2. Moderate acne: add topical antibiotics, combination therapy
3. Moderate-severe: oral antibiotics, hormonal therapy
4. Severe/nodular: isotretinoin consideration
5. Maintenance therapy

Address:
- Antibiotic stewardship
- Pregnancy considerations
- Isotretinoin iPLEDGE requirements
- Scar prevention and treatment`,
    placeholders: ['severity', 'previousTreatments', 'patientFactors'],
    mermaidExample: `flowchart TD
    A["Acne Assessment"] --> B{"Severity?"}
    B -->|"Mild\\nComedonal"| C["Topical Retinoid\\n+ BPO"]
    B -->|"Moderate\\nPapulopustular"| D["Add Topical\\nAntibiotic"]
    B -->|"Severe\\nNodular"| E{"Female?"}
    C --> F{"Response\\n8-12 weeks?"}
    D --> F
    F -->|"No"| G["Step Up"]
    F -->|"Yes"| H["Maintenance"]
    E -->|"Yes"| I["Consider\\nSpironolactone/OCP"]
    E -->|"No"| J["Consider\\nIsotretinoin"]`
  },
  {
    id: 'derm-eczema-management',
    name: 'Atopic Dermatitis Management',
    description: 'Comprehensive eczema treatment algorithm with step-up therapy',
    domain: 'medicine',
    promptTemplate: `Create an atopic dermatitis management flowchart:

Disease Severity: {{severity}}
Age Group: {{ageGroup}}
Affected Areas: {{areas}}
Previous Treatment History: {{history}}

Include:
1. Baseline skincare (emollients, trigger avoidance)
2. Mild disease: low-potency topical steroids, TCIs
3. Moderate disease: medium-potency steroids, wet wraps
4. Severe disease: systemic options (dupilumab, JAK inhibitors)
5. Infection management (S. aureus colonization)
6. Itch control strategies
7. Quality of life assessment (SCORAD, EASI)`,
    placeholders: ['severity', 'ageGroup', 'areas', 'history'],
  },
  {
    id: 'derm-psoriasis-management',
    name: 'Psoriasis Treatment Algorithm',
    description: 'Stepwise approach to psoriasis management including biologics',
    domain: 'medicine',
    promptTemplate: `Create a psoriasis treatment algorithm:

Disease Severity (BSA/PASI): {{severity}}
Affected Sites: {{sites}}
Comorbidities: {{comorbidities}}
Previous Treatments: {{previousTreatments}}

Treatment tiers:
1. Limited disease: topicals (steroids, vitamin D analogs, retinoids)
2. Moderate disease: phototherapy, methotrexate, apremilast
3. Moderate-severe: biologics (TNF-i, IL-17i, IL-23i)
4. Special considerations: nail psoriasis, scalp, inverse

Include:
- Psoriatic arthritis screening
- Cardiovascular risk assessment
- Biologic selection guidance
- Monitoring requirements`,
    placeholders: ['severity', 'sites', 'comorbidities', 'previousTreatments'],
  },
  {
    id: 'derm-urticaria-workup',
    name: 'Chronic Urticaria Workup',
    description: 'Diagnostic and treatment algorithm for chronic urticaria',
    domain: 'medicine',
    promptTemplate: `Create a chronic urticaria workup algorithm:

Duration: {{duration}}
Associated Symptoms: {{symptoms}}
Triggers Identified: {{triggers}}

Include:
1. Acute vs chronic classification (>6 weeks)
2. Physical urticaria screening (pressure, cold, heat, solar)
3. Laboratory workup (CBC, TSH, CRP, ANA)
4. Autoimmune screening if indicated
5. Treatment ladder:
   - First-line: H1 antihistamines (up to 4x dose)
   - Second-line: add H2 blockers, LTRA
   - Third-line: omalizumab, cyclosporine
6. Urticaria activity score (UAS7)`,
    placeholders: ['duration', 'symptoms', 'triggers'],
  },

  // ===========================================================================
  // SKIN CANCER PATHWAYS
  // ===========================================================================
  {
    id: 'derm-bcc-management',
    name: 'Basal Cell Carcinoma Management',
    description: 'Treatment algorithm for BCC based on risk stratification',
    domain: 'medicine',
    promptTemplate: `Create a BCC management algorithm:

Tumor Characteristics: {{tumorCharacteristics}}
Location: {{location}}
Size: {{size}}
Histologic Subtype: {{histology}}

Risk stratification and treatment:
1. Low-risk BCC: ED&C, standard excision (4mm margins)
2. High-risk features: Mohs surgery, wide excision
3. Locally advanced/metastatic: hedgehog inhibitors (vismodegib)
4. Non-surgical options: radiation, topical imiquimod/5-FU

Include:
- H zone facial locations
- Recurrent tumor considerations
- Follow-up schedule
- Sun protection counseling`,
    placeholders: ['tumorCharacteristics', 'location', 'size', 'histology'],
  },
  {
    id: 'derm-scc-management',
    name: 'Squamous Cell Carcinoma Management',
    description: 'Treatment algorithm for SCC with risk-based approach',
    domain: 'medicine',
    promptTemplate: `Create an SCC management algorithm:

Tumor Features: {{tumorFeatures}}
Location: {{location}}
Patient Status: {{patientStatus}}
Immunosuppression: {{immunoStatus}}

Include risk stratification:
1. Low-risk: standard excision, ED&C for superficial
2. High-risk features (>2cm, depth, PNI, poorly differentiated)
3. Mohs surgery indications
4. Lymph node evaluation
5. Adjuvant radiation considerations
6. Systemic therapy for advanced disease (cemiplimab)

Special populations:
- Transplant patients
- CLL/immunosuppression`,
    placeholders: ['tumorFeatures', 'location', 'patientStatus', 'immunoStatus'],
  },
  {
    id: 'derm-melanoma-staging',
    name: 'Melanoma Staging and Management',
    description: 'AJCC staging-based melanoma treatment algorithm',
    domain: 'medicine',
    promptTemplate: `Create a melanoma staging and management flowchart:

Breslow Thickness: {{breslow}}
Ulceration Status: {{ulceration}}
Mitotic Rate: {{mitoticRate}}
Clinical Stage: {{stage}}

Include:
1. Wide local excision margins by depth
2. Sentinel lymph node biopsy criteria
3. Imaging recommendations by stage
4. Adjuvant therapy options (nivolumab, dabrafenib/trametinib)
5. Metastatic treatment (immunotherapy, targeted therapy)
6. Surveillance schedule

AJCC 8th edition staging criteria reference.`,
    placeholders: ['breslow', 'ulceration', 'mitoticRate', 'stage'],
  },
  {
    id: 'derm-actinic-keratosis',
    name: 'Actinic Keratosis Treatment',
    description: 'Management algorithm for actinic keratoses and field cancerization',
    domain: 'medicine',
    promptTemplate: `Create an actinic keratosis treatment algorithm:

Number of Lesions: {{number}}
Location: {{location}}
Field Cancerization: {{fieldCancerization}}

Treatment options:
1. Individual lesion treatment:
   - Cryotherapy
   - ED&C
   - Shave removal
2. Field therapy:
   - Topical 5-fluorouracil
   - Imiquimod
   - PDT (photodynamic therapy)
   - Ingenol mebutate/tirbanibulin
3. Combination approaches
4. Monitoring and prevention`,
    placeholders: ['number', 'location', 'fieldCancerization'],
  },

  // ===========================================================================
  // ANATOMICAL DIAGRAMS
  // ===========================================================================
  {
    id: 'derm-skin-anatomy-diagram',
    name: 'Skin Anatomy Cross-Section',
    description: 'Detailed cross-sectional diagram of skin layers and appendages',
    domain: 'medicine',
    promptTemplate: `Create a detailed skin anatomy cross-section diagram showing:

Focus Areas: {{focusAreas}}
Level of Detail: {{detailLevel}}

Include layers:
1. Epidermis (stratum corneum, lucidum, granulosum, spinosum, basale)
2. Dermis (papillary and reticular)
3. Subcutis/Hypodermis

Include structures:
- Hair follicles with sebaceous glands
- Eccrine and apocrine sweat glands
- Arrector pili muscles
- Blood vessels and nerves
- Meissner and Pacinian corpuscles
- Langerhans cells, melanocytes, keratinocytes

Label all structures with proper anatomical terminology.`,
    placeholders: ['focusAreas', 'detailLevel'],
  },
  {
    id: 'derm-dermatomal-map',
    name: 'Dermatome Distribution Map',
    description: 'Body diagram showing dermatomal sensory distribution',
    domain: 'medicine',
    promptTemplate: `Create a dermatomal distribution map:

View: {{view}}
Specific Levels to Highlight: {{levels}}
Clinical Context: {{context}}

Show dermatome distribution:
- Cervical (C2-C8)
- Thoracic (T1-T12)
- Lumbar (L1-L5)
- Sacral (S1-S5)

Include key landmarks:
- C5: lateral arm
- C6: thumb
- C7: middle finger
- C8: little finger
- T4: nipple line
- T10: umbilicus
- L1: inguinal region
- S1: lateral foot`,
    placeholders: ['view', 'levels', 'context'],
  },
  {
    id: 'derm-body-surface-area',
    name: 'Rule of Nines / BSA Calculator',
    description: 'Body surface area diagram for burn assessment or disease extent',
    domain: 'medicine',
    promptTemplate: `Create a body surface area diagram:

Purpose: {{purpose}}
Age Group: {{ageGroup}}
Areas Affected: {{affectedAreas}}

Show Rule of Nines:
- Head: 9% (18% in infants)
- Each arm: 9%
- Each leg: 18% (14% in infants)
- Anterior trunk: 18%
- Posterior trunk: 18%
- Perineum: 1%

Include Lund-Browder chart modifications for pediatric patients.
Calculate total BSA for: {{calculatedAreas}}`,
    placeholders: ['purpose', 'ageGroup', 'affectedAreas', 'calculatedAreas'],
  },

  // ===========================================================================
  // LESION DOCUMENTATION
  // ===========================================================================
  {
    id: 'derm-lesion-morphology-chart',
    name: 'Primary Lesion Morphology Chart',
    description: 'Visual reference chart for primary skin lesion classification',
    domain: 'medicine',
    promptTemplate: `Create a primary lesion morphology reference chart:

Focus Categories: {{categories}}
Teaching Level: {{level}}

Include primary lesions:
- Flat lesions: macule (<1cm), patch (>1cm)
- Elevated solid: papule (<1cm), plaque (>1cm), nodule, tumor
- Fluid-filled: vesicle (<1cm), bulla (>1cm), pustule
- Other: wheal, cyst, comedone

For each lesion type show:
- Cross-sectional diagram
- Clinical example appearance
- Key characteristics
- Common conditions that present this way`,
    placeholders: ['categories', 'level'],
  },
  {
    id: 'derm-secondary-lesions-chart',
    name: 'Secondary Lesion Changes Chart',
    description: 'Visual reference for secondary skin changes and their significance',
    domain: 'medicine',
    promptTemplate: `Create a secondary lesion reference chart:

Focus Areas: {{focusAreas}}

Include secondary changes:
- Scale (desquamation types)
- Crust (dried exudate)
- Erosion (superficial loss)
- Ulcer (deeper loss)
- Fissure (linear crack)
- Excoriation (scratching)
- Lichenification (thickening)
- Atrophy (thinning)
- Scar (cicatrix)
- Keloid (overgrown scar)

Show progression from primary to secondary lesions where applicable.`,
    placeholders: ['focusAreas'],
  },
  {
    id: 'derm-distribution-patterns',
    name: 'Rash Distribution Patterns',
    description: 'Body diagram showing common distribution patterns and their differential diagnoses',
    domain: 'medicine',
    promptTemplate: `Create a rash distribution pattern reference:

Patterns to Include: {{patterns}}

Show distribution patterns on body diagram:
1. Photodistributed (sun-exposed areas)
2. Dermatomal (herpes zoster)
3. Flexural (atopic dermatitis)
4. Extensor surfaces (psoriasis)
5. Acral (hands/feet)
6. Truncal (pityriasis rosea, drug eruption)
7. Intertriginous (candidiasis)
8. Seborrheic (scalp, face, chest)

Include differential diagnosis for each pattern.`,
    placeholders: ['patterns'],
  },

  // ===========================================================================
  // SURGICAL PLANNING
  // ===========================================================================
  {
    id: 'derm-mohs-mapping',
    name: 'Mohs Surgery Stage Mapping',
    description: 'Template for documenting Mohs micrographic surgery stages',
    domain: 'medicine',
    promptTemplate: `Create a Mohs surgery mapping template:

Tumor Location: {{location}}
Initial Size: {{size}}
Tumor Type: {{tumorType}}

Include:
1. Anatomical location diagram
2. Initial tumor margins marking
3. Stage 1 tissue map with orientation
4. Positive margin locations
5. Subsequent stage documentation
6. Final defect diagram
7. Reconstruction planning options

Orientation markers and specimen processing notes.`,
    placeholders: ['location', 'size', 'tumorType'],
  },
  {
    id: 'derm-excision-margins',
    name: 'Surgical Excision Margin Guide',
    description: 'Reference for recommended surgical margins by tumor type',
    domain: 'medicine',
    promptTemplate: `Create a surgical margin reference guide:

Tumor Types: {{tumorTypes}}
Location Considerations: {{locations}}

Include margin recommendations:
1. Benign lesions: 1-2mm
2. AK: 2-3mm
3. BCC (low-risk): 4mm
4. BCC (high-risk): 5-10mm or Mohs
5. SCC: 4-6mm
6. Melanoma in situ: 5mm
7. Melanoma <1mm: 1cm
8. Melanoma 1-2mm: 1-2cm
9. Melanoma >2mm: 2cm

Include ellipse design principles (3:1 ratio).`,
    placeholders: ['tumorTypes', 'locations'],
  },

  // ===========================================================================
  // INFECTIOUS DISEASE
  // ===========================================================================
  {
    id: 'derm-fungal-infection-workup',
    name: 'Superficial Fungal Infection Algorithm',
    description: 'Diagnostic and treatment algorithm for dermatophyte infections',
    domain: 'medicine',
    promptTemplate: `Create a superficial fungal infection workup:

Suspected Infection: {{infection}}
Location: {{location}}
Duration: {{duration}}

Include:
1. Clinical presentation patterns
   - Tinea corporis (ringworm)
   - Tinea pedis (athlete's foot)
   - Tinea cruris (jock itch)
   - Tinea capitis (scalp)
   - Onychomycosis (nail)
2. Diagnostic workup
   - KOH preparation
   - Fungal culture
   - Wood's lamp (specific species)
3. Treatment selection
   - Topical antifungals
   - Systemic therapy indications
   - Duration guidelines`,
    placeholders: ['infection', 'location', 'duration'],
  },
  {
    id: 'derm-herpes-management',
    name: 'Herpes Virus Infection Management',
    description: 'Treatment algorithm for HSV and VZV cutaneous infections',
    domain: 'medicine',
    promptTemplate: `Create a herpes virus management algorithm:

Infection Type: {{infectionType}}
Episode: {{episode}}
Immunocompromised: {{immunoStatus}}

Include:
1. HSV-1/HSV-2 (orolabial, genital)
   - Primary vs recurrent
   - Episodic vs suppressive therapy
2. Herpes zoster (shingles)
   - Antiviral timing (<72 hours)
   - Pain management
   - PHN prevention
3. Dosing regimens
4. Special populations (pregnancy, HIV)
5. Vaccination recommendations (Shingrix)`,
    placeholders: ['infectionType', 'episode', 'immunoStatus'],
  },

  // ===========================================================================
  // SPECIAL POPULATIONS
  // ===========================================================================
  {
    id: 'derm-pediatric-rash',
    name: 'Pediatric Exanthems',
    description: 'Diagnostic algorithm for common childhood rashes',
    domain: 'medicine',
    promptTemplate: `Create a pediatric exanthem diagnostic algorithm:

Age: {{age}}
Rash Description: {{rashDescription}}
Associated Symptoms: {{symptoms}}
Vaccination Status: {{vaccinations}}

Include classic exanthems:
1. Measles (rubeola)
2. Rubella (German measles)
3. Varicella (chickenpox)
4. Fifth disease (erythema infectiosum)
5. Roseola (exanthem subitum)
6. Scarlet fever
7. Hand-foot-mouth disease

Differentiate from:
- Drug eruptions
- Kawasaki disease
- Bacterial infections`,
    placeholders: ['age', 'rashDescription', 'symptoms', 'vaccinations'],
  },
  {
    id: 'derm-drug-eruption',
    name: 'Drug Eruption Assessment',
    description: 'Algorithm for evaluating and managing cutaneous drug reactions',
    domain: 'medicine',
    promptTemplate: `Create a drug eruption assessment algorithm:

Rash Morphology: {{morphology}}
Timing of Onset: {{timing}}
Suspect Medications: {{medications}}
Systemic Symptoms: {{systemicSymptoms}}

Classification:
1. Morbilliform (exanthematous)
2. Urticarial
3. Fixed drug eruption
4. SJS/TEN (severe)
5. DRESS syndrome
6. AGEP
7. Photosensitivity

Severity assessment:
- ALDEN score for causality
- SCORTEN for TEN prognosis
- Management based on severity`,
    placeholders: ['morphology', 'timing', 'medications', 'systemicSymptoms'],
  },

  // ===========================================================================
  // WOUND CARE AND HEALING
  // ===========================================================================
  {
    id: 'derm-wound-healing-stages',
    name: 'Wound Healing Stages',
    description: 'Visual diagram of the four phases of wound healing with timeline',
    domain: 'medicine',
    promptTemplate: `Create a wound healing stages diagram:

Wound Type: {{woundType}}
Patient Factors: {{patientFactors}}
Complicating Conditions: {{complications}}

Show the four phases:
1. Hemostasis (0-minutes)
   - Vasoconstriction
   - Platelet aggregation
   - Clot formation

2. Inflammation (1-4 days)
   - Neutrophil infiltration
   - Macrophage recruitment
   - Debris removal

3. Proliferation (4-21 days)
   - Granulation tissue
   - Angiogenesis
   - Epithelialization
   - Collagen synthesis

4. Remodeling (21 days - 2 years)
   - Collagen maturation
   - Scar formation
   - Tensile strength increase

Include factors that impair healing at each stage.`,
    placeholders: ['woundType', 'patientFactors', 'complications'],
    mermaidExample: `flowchart LR
    subgraph Phase1["Hemostasis\\n(Minutes)"]
        A1["Vasoconstriction"] --> A2["Platelet Plug"]
        A2 --> A3["Fibrin Clot"]
    end
    subgraph Phase2["Inflammation\\n(Days 1-4)"]
        B1["Neutrophils"] --> B2["Macrophages"]
        B2 --> B3["Cytokine Release"]
    end
    subgraph Phase3["Proliferation\\n(Days 4-21)"]
        C1["Granulation"] --> C2["Angiogenesis"]
        C2 --> C3["Epithelialization"]
    end
    subgraph Phase4["Remodeling\\n(Weeks-Years)"]
        D1["Collagen III→I"] --> D2["Scar Maturation"]
    end
    Phase1 --> Phase2 --> Phase3 --> Phase4`,
  },
  {
    id: 'derm-chronic-wound-management',
    name: 'Chronic Wound Management Algorithm',
    description: 'Assessment and treatment pathway for non-healing wounds',
    domain: 'medicine',
    promptTemplate: `Create a chronic wound management algorithm:

Wound Location: {{location}}
Wound Duration: {{duration}}
Wound Characteristics: {{characteristics}}
Underlying Conditions: {{conditions}}

Include:
1. Initial assessment
   - Wound bed (granulating, slough, necrotic)
   - Edges (rolled, undermined, attached)
   - Surrounding skin (macerated, dry, inflamed)
   - Exudate (amount, type)

2. Etiology workup
   - Venous (CEAP classification)
   - Arterial (ABI measurement)
   - Neuropathic (monofilament testing)
   - Pressure (staging)
   - Mixed etiology

3. Treatment based on etiology
   - Compression for venous
   - Revascularization for arterial
   - Offloading for diabetic foot
   - Repositioning for pressure ulcers

4. Local wound care
   - Debridement options
   - Dressing selection
   - Infection management
   - Advanced therapies (NPWT, skin substitutes)`,
    placeholders: ['location', 'duration', 'characteristics', 'conditions'],
  },

  // ===========================================================================
  // COSMETIC DERMATOLOGY
  // ===========================================================================
  {
    id: 'derm-cosmetic-procedures',
    name: 'Cosmetic Dermatology Procedures',
    description: 'Overview of cosmetic procedures organized by indication and mechanism',
    domain: 'medicine',
    promptTemplate: `Create a cosmetic dermatology procedures reference:

Patient Concerns: {{concerns}}
Fitzpatrick Skin Type: {{skinType}}
Budget/Downtime: {{constraints}}

Organize by concern:

1. Wrinkles/Lines
   - Botulinum toxin (dynamic lines)
   - Fillers (static lines)
   - Resurfacing (lasers, peels)
   - Microneedling

2. Volume Loss
   - Hyaluronic acid fillers
   - Calcium hydroxylapatite
   - Poly-L-lactic acid
   - Fat transfer

3. Pigmentation
   - Chemical peels
   - Laser (Q-switched, picosecond)
   - IPL
   - Topical agents

4. Texture/Scars
   - Ablative laser
   - Non-ablative laser
   - Microneedling + PRP
   - Subcision

5. Skin Tightening
   - Radiofrequency
   - Ultrasound (HIFU)
   - Laser resurfacing

Include safety considerations by skin type.`,
    placeholders: ['concerns', 'skinType', 'constraints'],
    mermaidExample: `flowchart TD
    A["Cosmetic Concern"] --> B{"Primary Issue?"}
    B -->|"Wrinkles"| C{"Dynamic or\\nStatic?"}
    C -->|"Dynamic"| D["Botulinum Toxin"]
    C -->|"Static"| E["Fillers +/- Resurfacing"]
    B -->|"Volume Loss"| F["Filler Selection"]
    B -->|"Pigmentation"| G{"Depth?"}
    G -->|"Epidermal"| H["Topicals/Light Peel"]
    G -->|"Dermal"| I["Laser/Medium Peel"]
    B -->|"Texture"| J["Resurfacing Options"]
    B -->|"Laxity"| K["Energy Devices"]`,
  },
  {
    id: 'derm-chemical-peel-selection',
    name: 'Chemical Peel Selection Algorithm',
    description: 'Guide for selecting appropriate chemical peel depth and agent',
    domain: 'medicine',
    promptTemplate: `Create a chemical peel selection algorithm:

Indication: {{indication}}
Skin Type (Fitzpatrick): {{fitzpatrick}}
Previous Treatments: {{previousTreatments}}
Desired Downtime: {{downtime}}

Peel categories:

1. Superficial (epidermis)
   - Glycolic acid 30-70%
   - Salicylic acid 20-30%
   - Mandelic acid
   - Jessner's solution
   Indications: acne, mild photodamage, melasma

2. Medium (papillary dermis)
   - TCA 35-50%
   - Glycolic + TCA
   - Jessner's + TCA
   Indications: moderate wrinkles, actinic keratoses

3. Deep (reticular dermis)
   - Phenol/croton oil (Baker-Gordon)
   Indications: severe photodamage, deep wrinkles

Include pre-peel prep, contraindications, and post-peel care.`,
    placeholders: ['indication', 'fitzpatrick', 'previousTreatments', 'downtime'],
  },
  {
    id: 'derm-laser-selection',
    name: 'Laser Treatment Selection Guide',
    description: 'Algorithm for selecting appropriate laser modality by indication',
    domain: 'medicine',
    promptTemplate: `Create a laser treatment selection guide:

Target Condition: {{condition}}
Skin Type: {{skinType}}
Previous Laser History: {{history}}

Organize by chromophore target:

1. Melanin (pigmented lesions)
   - Q-switched Nd:YAG (1064nm, 532nm)
   - Q-switched Ruby (694nm)
   - Q-switched Alexandrite (755nm)
   - Picosecond lasers
   - IPL

2. Hemoglobin (vascular lesions)
   - Pulsed dye laser (595nm)
   - KTP (532nm)
   - Nd:YAG (1064nm for deeper vessels)

3. Water (resurfacing)
   - CO2 (10,600nm) - ablative
   - Erbium:YAG (2940nm) - ablative
   - Fractional options

4. Hair removal
   - Alexandrite (755nm)
   - Diode (810nm)
   - Nd:YAG (1064nm - safer for darker skin)

Include safety parameters and expected outcomes.`,
    placeholders: ['condition', 'skinType', 'history'],
  },

  // ===========================================================================
  // MEDICATION PROTOCOLS
  // ===========================================================================
  {
    id: 'derm-topical-steroid-selection',
    name: 'Topical Corticosteroid Selection',
    description: 'Algorithm for selecting appropriate topical steroid potency and vehicle',
    domain: 'medicine',
    promptTemplate: `Create a topical corticosteroid selection algorithm:

Condition: {{condition}}
Body Location: {{location}}
Patient Age: {{age}}
Duration of Use: {{duration}}

Potency classes (I = superpotent, VII = low):
1. Class I (Superpotent)
   - Clobetasol 0.05%
   - Betamethasone dipropionate augmented
   Use: thick plaques, palms/soles (short-term)

2. Class II-III (High-Mid High)
   - Fluocinonide 0.05%
   - Desoximetasone 0.25%
   Use: moderate dermatitis, body trunk

3. Class IV-V (Mid)
   - Triamcinolone 0.1%
   - Fluocinolone 0.025%
   Use: widespread dermatitis, children

4. Class VI-VII (Low)
   - Desonide 0.05%
   - Hydrocortisone 1-2.5%
   Use: face, intertriginous, infants

Vehicle selection:
- Ointment: dry/scaly skin
- Cream: general use
- Lotion/solution: hairy areas
- Foam: scalp

Include steroid-sparing strategies and monitoring for side effects.`,
    placeholders: ['condition', 'location', 'age', 'duration'],
    mermaidExample: `flowchart TD
    A["Select Topical Steroid"] --> B{"Location?"}
    B -->|"Face/Folds"| C["Low Potency\\n(Class VI-VII)"]
    B -->|"Body/Limbs"| D{"Severity?"}
    B -->|"Palms/Soles"| E["High Potency\\n(Class I-II)"]
    D -->|"Mild"| F["Mid Potency\\n(Class IV-V)"]
    D -->|"Moderate-Severe"| G["High Potency\\n(Class II-III)"]
    C & F & G --> H{"Skin Type?"}
    H -->|"Dry/Scaly"| I["Ointment"]
    H -->|"Moist/Weeping"| J["Cream"]
    H -->|"Hairy"| K["Solution/Foam"]`,
  },
  {
    id: 'derm-isotretinoin-protocol',
    name: 'Isotretinoin Treatment Protocol',
    description: 'Complete isotretinoin prescribing and monitoring algorithm',
    domain: 'medicine',
    promptTemplate: `Create an isotretinoin treatment protocol:

Patient Demographics: {{demographics}}
Acne Severity: {{severity}}
Previous Treatments: {{previousTreatments}}

Include:

1. Pre-treatment workup
   - Baseline labs (CBC, LFT, lipids, pregnancy test)
   - Depression screening (PHQ-9)
   - iPLEDGE enrollment

2. Dosing protocol
   - Starting dose (0.5 mg/kg/day)
   - Target dose (0.5-1 mg/kg/day)
   - Cumulative dose goal (120-150 mg/kg total)
   - Duration calculation

3. Monitoring schedule
   - Pregnancy tests (monthly for females)
   - Labs (monthly initially, then q2-3 months)
   - Side effect assessment

4. Side effect management
   - Mucocutaneous (lip balm, moisturizers)
   - Musculoskeletal (activity modification)
   - Laboratory abnormalities (dose adjustment)
   - Mental health monitoring

5. iPLEDGE requirements
   - Two forms of contraception
   - Monthly pregnancy tests
   - 30-day prescription window`,
    placeholders: ['demographics', 'severity', 'previousTreatments'],
  },
  {
    id: 'derm-biologic-selection',
    name: 'Biologic Selection for Inflammatory Skin Disease',
    description: 'Algorithm for selecting biologics in psoriasis, atopic dermatitis, and other conditions',
    domain: 'medicine',
    promptTemplate: `Create a biologic selection algorithm:

Condition: {{condition}}
Disease Severity: {{severity}}
Comorbidities: {{comorbidities}}
Previous Treatments: {{previousTreatments}}

Organize by condition:

1. Psoriasis Biologics
   - TNF inhibitors (adalimumab, etanercept, infliximab)
   - IL-17 inhibitors (secukinumab, ixekizumab, brodalumab)
   - IL-23 inhibitors (guselkumab, risankizumab, tildrakizumab)
   - IL-12/23 inhibitor (ustekinumab)

2. Atopic Dermatitis
   - IL-4/13 inhibitor (dupilumab)
   - IL-13 inhibitor (tralokinumab)
   - JAK inhibitors (upadacitinib, abrocitinib)

3. Hidradenitis Suppurativa
   - Adalimumab
   - Secukinumab

4. Chronic Urticaria
   - Omalizumab

Include pre-treatment screening (TB, hepatitis, vaccines) and monitoring requirements.`,
    placeholders: ['condition', 'severity', 'comorbidities', 'previousTreatments'],
  },

  // ===========================================================================
  // BACTERIAL AND OTHER INFECTIONS
  // ===========================================================================
  {
    id: 'derm-bacterial-infection',
    name: 'Bacterial Skin Infection Management',
    description: 'Algorithm for diagnosing and treating common bacterial skin infections',
    domain: 'medicine',
    promptTemplate: `Create a bacterial skin infection management algorithm:

Infection Type: {{infectionType}}
Severity: {{severity}}
Risk Factors: {{riskFactors}}

Infection categories:

1. Impetigo
   - Non-bullous vs bullous
   - Topical mupirocin (localized)
   - Oral antibiotics (widespread)

2. Folliculitis/Furuncles/Carbuncles
   - Warm compresses
   - I&D for fluctuant lesions
   - Antibiotics for cellulitis

3. Cellulitis
   - Non-purulent (strep): beta-lactam
   - Purulent (staph/MRSA): TMP-SMX, doxycycline
   - Severity assessment (admit vs outpatient)

4. Necrotizing fasciitis
   - Emergency surgical debridement
   - Broad-spectrum antibiotics
   - ICU admission

5. MRSA considerations
   - Risk factors
   - Empiric coverage
   - Decolonization protocols

Include antibiotic dosing and duration.`,
    placeholders: ['infectionType', 'severity', 'riskFactors'],
    mermaidExample: `flowchart TD
    A["Bacterial Skin\\nInfection"] --> B{"Type?"}
    B -->|"Impetigo"| C{"Extent?"}
    C -->|"Localized"| D["Topical Mupirocin"]
    C -->|"Widespread"| E["Oral Antibiotics"]
    B -->|"Cellulitis"| F{"Purulent?"}
    F -->|"No"| G["Beta-lactam\\n(Strep coverage)"]
    F -->|"Yes"| H["MRSA Coverage\\n(TMP-SMX/Doxy)"]
    B -->|"Abscess"| I["I&D +/-\\nAntibiotics"]
    B -->|"Necrotizing"| J["🚨 Emergency\\nSurgery + Abx"]
    style J fill:#DC143C,color:#fff`,
  },
  {
    id: 'derm-scabies-treatment',
    name: 'Scabies Diagnosis and Treatment',
    description: 'Algorithm for diagnosing and treating scabies infestation',
    domain: 'medicine',
    promptTemplate: `Create a scabies diagnosis and treatment algorithm:

Clinical Presentation: {{presentation}}
Distribution: {{distribution}}
Contacts Affected: {{contacts}}

Include:

1. Diagnosis
   - Clinical features (burrows, papules, intense pruritus)
   - Distribution (finger webs, wrists, axillae, genitals)
   - Dermoscopy (jet with contrail sign)
   - Skin scraping with microscopy

2. Treatment options
   - First-line: Permethrin 5% cream
   - Alternative: Ivermectin (oral)
   - Crusted scabies: combination therapy

3. Application instructions
   - Neck to toes (face in infants/elderly)
   - Leave on 8-14 hours
   - Repeat in 7 days

4. Environmental measures
   - Wash bedding/clothing (hot water)
   - Items that can't be washed in sealed bag 72 hours
   - Treat all close contacts simultaneously

5. Post-scabetic itch
   - May persist 2-4 weeks
   - Topical steroids
   - Antihistamines`,
    placeholders: ['presentation', 'distribution', 'contacts'],
  },

  // ===========================================================================
  // HAIR AND NAIL DISORDERS
  // ===========================================================================
  {
    id: 'derm-alopecia-workup',
    name: 'Alopecia Diagnostic Workup',
    description: 'Systematic approach to evaluating hair loss',
    domain: 'medicine',
    promptTemplate: `Create an alopecia workup algorithm:

Hair Loss Pattern: {{pattern}}
Duration: {{duration}}
Associated Symptoms: {{symptoms}}
Medical History: {{history}}

Classification:

1. Scarring vs Non-scarring
   - Scalp exam: follicular ostia present?
   - Pull test
   - Dermoscopy

2. Non-scarring alopecias
   - Androgenetic alopecia (patterned)
   - Alopecia areata (patchy, exclamation point hairs)
   - Telogen effluvium (diffuse shedding)
   - Trichotillomania (irregular patches)
   - Traction alopecia

3. Scarring alopecias
   - Lichen planopilaris
   - Central centrifugal cicatricial alopecia
   - Discoid lupus
   - Folliculitis decalvans

4. Laboratory workup
   - CBC, ferritin, iron
   - TSH
   - ANA (if scarring)
   - Hormonal panel (DHEA-S, testosterone if virilization)

5. Scalp biopsy indications

Include treatment options for each diagnosis.`,
    placeholders: ['pattern', 'duration', 'symptoms', 'history'],
    mermaidExample: `flowchart TD
    A["Hair Loss\\nEvaluation"] --> B{"Scarring?"}
    B -->|"No\\n(Follicles visible)"| C{"Pattern?"}
    B -->|"Yes\\n(Smooth scalp)"| D["Biopsy for\\nSubtype"]
    C -->|"Diffuse"| E{"Pull Test?"}
    C -->|"Patchy"| F{"Exclamation\\nPoint Hairs?"}
    C -->|"Patterned"| G["Androgenetic\\nAlopecia"]
    E -->|"Positive"| H["Telogen Effluvium\\n→ Lab Workup"]
    F -->|"Yes"| I["Alopecia Areata"]
    F -->|"No"| J["Trichotillomania\\nor Traction"]`,
  },
  {
    id: 'derm-nail-disorder-diagnosis',
    name: 'Nail Disorder Diagnosis Algorithm',
    description: 'Systematic approach to evaluating nail abnormalities',
    domain: 'medicine',
    promptTemplate: `Create a nail disorder diagnostic algorithm:

Nail Change: {{nailChange}}
Number of Nails Affected: {{nailsAffected}}
Duration: {{duration}}
Associated Conditions: {{conditions}}

Organize by morphology:

1. Nail plate changes
   - Pitting (psoriasis, alopecia areata)
   - Ridging (aging, lichen planus)
   - Splitting (brittle nails)
   - Thickening (onychomycosis, psoriasis)

2. Nail color changes
   - Yellow (onychomycosis, yellow nail syndrome)
   - White (leukonychia, liver disease)
   - Brown/black (melanonychia, subungual melanoma)
   - Red (subungual hematoma, glomus tumor)

3. Nail shape changes
   - Clubbing (pulmonary, cardiac disease)
   - Koilonychia (iron deficiency)
   - Pincer nails

4. Periungual changes
   - Paronychia (acute vs chronic)
   - Pterygium (lichen planus, scleroderma)

Include biopsy indications (especially for melanonychia).`,
    placeholders: ['nailChange', 'nailsAffected', 'duration', 'conditions'],
  },

  // ===========================================================================
  // AUTOIMMUNE AND BLISTERING DISEASES
  // ===========================================================================
  {
    id: 'derm-autoimmune-blistering',
    name: 'Autoimmune Blistering Disease Workup',
    description: 'Diagnostic algorithm for bullous autoimmune diseases',
    domain: 'medicine',
    promptTemplate: `Create an autoimmune blistering disease workup:

Clinical Presentation: {{presentation}}
Blister Characteristics: {{blisterType}}
Mucosal Involvement: {{mucosalInvolvement}}

Diagnostic approach:

1. Clinical features
   - Tense vs flaccid blisters
   - Nikolsky sign
   - Location (mucosal, skin folds, generalized)
   - Age of onset

2. Histopathology
   - Level of split (subcorneal, intraepidermal, subepidermal)
   - Inflammatory infiltrate

3. Direct immunofluorescence (DIF)
   - Linear IgG at BMZ (bullous pemphigoid)
   - Intercellular IgG (pemphigus vulgaris)
   - Linear IgA (linear IgA disease)

4. Serologic testing
   - BP180/BP230 antibodies
   - Desmoglein 1/3 antibodies

5. Disease categories
   - Pemphigus vulgaris/foliaceus
   - Bullous pemphigoid
   - Mucous membrane pemphigoid
   - Epidermolysis bullosa acquisita
   - Dermatitis herpetiformis

Include treatment algorithms for each condition.`,
    placeholders: ['presentation', 'blisterType', 'mucosalInvolvement'],
    mermaidExample: `flowchart TD
    A["Blistering\\nDisease"] --> B{"Blister Type?"}
    B -->|"Flaccid"| C["Nikolsky +\\n→ Pemphigus"]
    B -->|"Tense"| D["Subepidermal\\nBlistering"]
    C --> E["Biopsy + DIF"]
    D --> E
    E --> F{"DIF Pattern?"}
    F -->|"Intercellular IgG"| G["Pemphigus\\n→ Check Dsg1/3"]
    F -->|"Linear BMZ IgG"| H["Bullous Pemphigoid\\n→ Check BP180/230"]
    F -->|"Granular IgA"| I["Dermatitis\\nHerpetiformis"]`,
  },
  {
    id: 'derm-connective-tissue-skin',
    name: 'Connective Tissue Disease Skin Findings',
    description: 'Cutaneous manifestations of autoimmune connective tissue diseases',
    domain: 'medicine',
    promptTemplate: `Create a connective tissue disease skin findings reference:

Suspected Condition: {{condition}}
Skin Findings: {{skinFindings}}
Systemic Symptoms: {{systemicSymptoms}}

Organize by disease:

1. Lupus Erythematosus
   - Acute: malar rash, photosensitivity
   - Subacute: annular/psoriasiform
   - Chronic/Discoid: scarring plaques
   - Lupus panniculitis

2. Dermatomyositis
   - Heliotrope rash (periorbital)
   - Gottron's papules (MCP, PIP, DIP)
   - V-sign, shawl sign
   - Mechanic's hands
   - Periungual telangiectasia

3. Scleroderma/Systemic Sclerosis
   - Localized: morphea, linear
   - Systemic: Raynaud's, sclerodactyly
   - Calcinosis cutis

4. Vasculitis
   - Palpable purpura
   - Livedo reticularis
   - Ulceration

Include serologic workup and malignancy screening.`,
    placeholders: ['condition', 'skinFindings', 'systemicSymptoms'],
  },

  // ===========================================================================
  // PHOTOMEDICINE AND SUN PROTECTION
  // ===========================================================================
  {
    id: 'derm-phototherapy-protocol',
    name: 'Phototherapy Treatment Protocol',
    description: 'Algorithm for UVB and PUVA phototherapy administration',
    domain: 'medicine',
    promptTemplate: `Create a phototherapy treatment protocol:

Indication: {{indication}}
Skin Type: {{skinType}}
Phototherapy Type: {{phototherapyType}}

Include:

1. Pre-treatment assessment
   - History of photosensitivity
   - Current photosensitizing medications
   - Skin cancer history
   - Fitzpatrick skin type

2. UVB Narrow-band (311-313nm)
   - Starting dose by skin type
   - Increment protocol (10-20%)
   - Frequency (3x/week)
   - Target/maintenance dosing

3. PUVA (Psoralen + UVA)
   - Psoralen dosing (8-MOP)
   - Timing of UVA exposure
   - Eye protection requirements
   - PUVA bath vs oral

4. Targeted phototherapy
   - Excimer laser (308nm)
   - Home phototherapy devices

5. Side effect monitoring
   - Erythema grading
   - Eye exams (PUVA)
   - Skin cancer surveillance

Include treatment frequency and duration guidelines.`,
    placeholders: ['indication', 'skinType', 'phototherapyType'],
  },
  {
    id: 'derm-sun-protection',
    name: 'Sun Protection and Photoprotection',
    description: 'Guide to sunscreen selection and photoprotective measures',
    domain: 'medicine',
    promptTemplate: `Create a sun protection guide:

Patient Risk Factors: {{riskFactors}}
Fitzpatrick Skin Type: {{skinType}}
Activity Type: {{activity}}

Include:

1. Sunscreen basics
   - SPF (UVB protection)
   - Broad spectrum (UVA + UVB)
   - Application amount (1 oz for body)
   - Reapplication (q2 hours, after swimming)

2. Filter types
   - Chemical/organic (avobenzone, octinoxate)
   - Physical/mineral (zinc oxide, titanium dioxide)
   - Hybrid formulations
   - Photostable formulations

3. Special considerations
   - Water resistance (40 vs 80 minutes)
   - Sensitive skin/children
   - Acne-prone skin
   - Darker skin types

4. Beyond sunscreen
   - Protective clothing (UPF rating)
   - Hats and sunglasses
   - Seeking shade (10am-4pm)
   - Window film (UVA penetrates glass)

5. Vitamin D considerations

Include photosensitizing medication list.`,
    placeholders: ['riskFactors', 'skinType', 'activity'],
  },
];

export default dermatologyTemplates;
