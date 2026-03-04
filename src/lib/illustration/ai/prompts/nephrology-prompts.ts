/**
 * nephrology-prompts.ts
 * Nephrology-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for renal medicine including:
 * - Kidney anatomy and physiology
 * - Acute kidney injury (AKI)
 * - Chronic kidney disease (CKD)
 * - Glomerular diseases
 * - Electrolyte and acid-base disorders
 * - Dialysis and transplant
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// NEPHROLOGY DOMAIN PROMPT
// =============================================================================

/**
 * Base nephrology domain prompt for renal medicine diagrams
 */
export const NEPHROLOGY_DOMAIN_PROMPT = `
Nephrology diagram requirements:
- Use standard nephrology terminology (GFR, BUN, Cr, UPCR)
- Follow KDIGO guidelines for CKD and AKI staging
- Include eGFR calculations and interpretation
- Reference electrolyte normal ranges and corrections
- Use color coding: Brown for kidney, Red for glomerulus, Blue for tubules
- Include dialysis access types and modality comparison
- Reference RAAS system and medication targets
- Use appropriate urinalysis interpretation
- Include acid-base compensation formulas
- Reference transplant immunology and rejection types`;

// =============================================================================
// NEPHROLOGY-SPECIFIC PROMPTS
// =============================================================================

export const NEPHROLOGY_PROMPTS = {
  // Clinical Decision Support
  akiEvaluation: `
AKI Evaluation Algorithm requirements:
- Include KDIGO AKI staging (Stage 1, 2, 3)
- Distinguish prerenal, intrinsic, and postrenal causes
- Reference FeNa and FeUrea calculations
- Show urinalysis interpretation (casts, sediment)
- Include BUN/Cr ratio interpretation
- Reference fluid resuscitation targets
- Show nephrotoxin identification and discontinuation
- Include renal replacement therapy indications`,

  ckdManagement: `
CKD Management Algorithm requirements:
- Include KDIGO GFR and albuminuria categories (G1-G5, A1-A3)
- Reference cardiovascular risk stratification
- Show RAAS blockade initiation and monitoring
- Include anemia management with ESA and iron
- Reference mineral bone disease (CKD-Mite bone disease) treatment
- Show SGLT2 inhibitor indications for DKD
- Include dietary modifications (sodium, potassium, phosphorus)
- Reference nephrology referral criteria`,

  hyponatremiaWorkup: `
Hyponatremia Workup requirements:
- Include serum and urine osmolality interpretation
- Reference volume status assessment
- Show ADH-dependent vs ADH-independent causes
- Include SIADH diagnostic criteria
- Reference correction rate limits (< 8-10 mEq/L per 24h)
- Show osmotic demyelination syndrome prevention
- Include treatment by volume status and severity
- Reference hypotonic vs isotonic vs hypertonic causes`,

  hyperkalemiaManagement: `
Hyperkalemia Management requirements:
- Include ECG changes progression
- Reference membrane stabilization with calcium
- Show transcellular shift treatments (insulin, beta-agonists)
- Include potassium elimination methods
- Reference dose adjustments for renal function
- Show dialysis indications for severe hyperkalemia
- Include medication review (ACEi, ARB, K-sparing diuretics)
- Reference dietary potassium restriction`,

  // Diagnostic Interpretation
  glomerularDiseaseWorkup: `
Glomerular Disease Workup requirements:
- Distinguish nephrotic vs nephritic syndrome
- Include complement levels interpretation (C3, C4)
- Reference autoimmune serologies (ANA, ANCA, anti-GBM)
- Show protein electrophoresis indications
- Include hepatitis B/C and HIV screening
- Reference renal biopsy indications
- Show light, immunofluorescence, and EM findings
- Include specific glomerular disease features`,

  proteinuriaEvaluation: `
Proteinuria Evaluation requirements:
- Include spot UPCR vs 24-hour collection
- Reference transient vs persistent proteinuria
- Show albumin vs total protein interpretation
- Include orthostatic proteinuria workup
- Reference nephrotic range definition (>3.5g/day)
- Show FSGS, membranous, minimal change differentiation
- Include secondary causes evaluation
- Reference ACEi/ARB initiation for proteinuria`,

  hematuriaEvaluation: `
Hematuria Evaluation requirements:
- Distinguish glomerular vs non-glomerular hematuria
- Include RBC morphology (dysmorphic vs isomorphic)
- Reference RBC cast significance
- Show urological workup for non-glomerular causes
- Include age-based cancer screening
- Reference imaging selection (US, CT urogram)
- Show cystoscopy indications
- Include glomerulonephritis serologic workup`,

  // Electrolyte Disorders
  metabolicAcidosisWorkup: `
Metabolic Acidosis Workup requirements:
- Include anion gap calculation and interpretation
- Reference HAGMA vs NAGMA differentiation
- Show MUDPILES mnemonic for elevated AG
- Include urine anion gap for RTA diagnosis
- Reference RTA type differentiation (Type 1, 2, 4)
- Show bicarbonate replacement calculations
- Include underlying cause treatment
- Reference compensation assessment (Winter's formula)`,

  hypocalcemiaManagement: `
Hypocalcemia Management requirements:
- Include ionized vs total calcium correction
- Reference PTH-dependent vs PTH-independent causes
- Show acute symptomatic treatment (IV calcium)
- Include chronic management with vitamin D
- Reference magnesium correction importance
- Show hungry bone syndrome post-parathyroidectomy
- Include CKD-MBD related hypocalcemia
- Reference citrate toxicity in massive transfusion`,

  phosphorusDisorders: `
Phosphorus Disorder Management requirements:
- Include hypophosphatemia severity grading
- Reference refeeding syndrome recognition
- Show IV vs oral replacement protocols
- Include hyperphosphatemia in CKD management
- Reference phosphate binder selection
- Show dietary phosphorus restriction
- Include FGF23 and vitamin D physiology
- Reference calciphylaxis risk factors`,

  // Dialysis and Transplant
  dialysisInitiation: `
Dialysis Initiation requirements:
- Include absolute indications (AEIOU)
- Reference GFR threshold considerations
- Show modality selection (HD vs PD vs HHD)
- Include access planning timeline
- Reference AVF vs AVG vs catheter selection
- Show pre-dialysis education components
- Include conservative care discussion
- Reference transplant referral timing`,

  hemodialysisComplications: `
Hemodialysis Complications requirements:
- Include intradialytic hypotension management
- Reference access complications (stenosis, infection, thrombosis)
- Show adequacy targets (Kt/V, URR)
- Include dialysis disequilibrium syndrome
- Reference muscle cramps treatment
- Show anticoagulation protocols
- Include volume assessment and dry weight
- Reference catheter-related bloodstream infections`,

  peritonealDialysis: `
Peritoneal Dialysis Management requirements:
- Include PD catheter types and placement
- Reference prescription components (dwell time, volume, exchanges)
- Show adequacy targets (Kt/V, creatinine clearance)
- Include peritonitis diagnosis and treatment
- Reference exit site infection management
- Show membrane failure and ultrafiltration loss
- Include encapsulating peritoneal sclerosis
- Reference icodextrin and glucose-sparing strategies`,

  kidneyTransplant: `
Kidney Transplant requirements:
- Include pre-transplant evaluation components
- Reference immunologic compatibility (HLA, crossmatch, PRA)
- Show induction immunosuppression protocols
- Include maintenance regimen (CNI, antimetabolite, steroid)
- Reference rejection types (hyperacute, acute, chronic)
- Show post-transplant complications
- Include infection prophylaxis protocols
- Reference malignancy surveillance`,

  transplantRejection: `
Transplant Rejection requirements:
- Include clinical presentation of rejection
- Reference biopsy interpretation (Banff classification)
- Show T-cell mediated vs antibody-mediated rejection
- Include DSA monitoring and interpretation
- Reference treatment protocols for each type
- Show chronic allograft nephropathy
- Include BK nephropathy differentiation
- Reference de novo DSA and non-compliance`,

  // Specialized Conditions
  diabeticKidneyDisease: `
Diabetic Kidney Disease requirements:
- Include screening recommendations
- Reference albuminuria staging progression
- Show glycemic control targets in CKD
- Include RAAS blockade optimization
- Reference SGLT2 inhibitor benefits
- Show GLP-1 RA renoprotective effects
- Include finerenone indication
- Reference blood pressure targets`,

  polycysticKidneyDisease: `
Polycystic Kidney Disease requirements:
- Include ADPKD diagnostic criteria
- Reference screening recommendations
- Show tolvaptan eligibility assessment
- Include Mayo imaging classification
- Reference blood pressure management
- Show cyst complications (infection, hemorrhage)
- Include extrarenal manifestations
- Reference genetic counseling`,

  contrastNephropathy: `
Contrast-Induced Nephropathy requirements:
- Include risk factor assessment
- Reference prevention strategies (hydration, NAC)
- Show contrast volume limitation
- Include staging and prognosis
- Reference eGFR thresholds for concern
- Show metformin holding recommendations
- Include alternative imaging options
- Reference gadolinium in CKD`,

  renalArteryStenosis: `
Renal Artery Stenosis requirements:
- Include atherosclerotic vs FMD differentiation
- Reference screening indications
- Show diagnostic imaging selection
- Include medical management optimization
- Reference revascularization indications
- Show stenting vs angioplasty selection
- Include post-intervention monitoring
- Reference resistant hypertension workup`,

  tumorLysisSyndrome: `
Tumor Lysis Syndrome requirements:
- Include Cairo-Bishop criteria
- Reference risk stratification (high, intermediate, low)
- Show prevention with allopurinol vs rasburicase
- Include hydration protocols
- Reference electrolyte monitoring frequency
- Show dialysis indications
- Include phosphorus and uric acid management
- Reference calcium and potassium correction`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Nephrology-specific few-shot examples
 */
export const NEPHROLOGY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a flowchart for AKI evaluation and management',
    output: `flowchart TD
    A[("AKI Detected\\nCr rise or UOP")] --> B{"KDIGO Stage?"}

    B -->|"Stage 1\\n1.5-1.9x or +0.3"| C["Mild - Monitor closely"]
    B -->|"Stage 2\\n2.0-2.9x"| D["Moderate - Aggressive management"]
    B -->|"Stage 3\\n3.0x or RRT"| E["Severe - Consider RRT"]

    C & D & E --> F{"Etiology?"}

    F --> G["Check FeNa/FeUrea"]
    G -->|"FeNa <1%\\nBUN/Cr >20"| H["Prerenal"]
    G -->|"FeNa >2%\\nMuddy casts"| I["Intrinsic/ATN"]
    G -->|"Ultrasound shows\\nhydronephrosis"| J["Postrenal"]

    H --> K["Volume Resuscitation\\nHold nephrotoxins\\nOptimize perfusion"]
    I --> L["Supportive care\\nAvoid further injury\\nConsider biopsy"]
    J --> M["Urology consult\\nDecompress"]

    E --> N{"RRT Criteria?"}
    N -->|"Refractory hyperK\\nAcidosis, Fluid"| O["Initiate Dialysis"]
    N -->|"No absolute\\nindication"| P["Continue monitoring"]

    style E fill:#DC143C,color:#fff
    style O fill:#4169E1,color:#fff
    style K fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a CKD staging and management algorithm',
    output: `flowchart TD
    A[("CKD Confirmed\\neGFR <60 x 3mo")] --> B["Calculate eGFR\\nQuantify albuminuria"]

    B --> C{"GFR Category"}
    C -->|"G1-G2\\n>60"| D["Primary care management"]
    C -->|"G3a\\n45-59"| E["Monitor q6-12mo\\nAddress CVD risk"]
    C -->|"G3b\\n30-44"| F["Nephrology referral\\nMBD management"]
    C -->|"G4\\n15-29"| G["Access planning\\nRRT education"]
    C -->|"G5\\n<15"| H["Active RRT prep\\nor Conservative"]

    subgraph Management["Universal CKD Management"]
        M1["BP <130/80\\nACEi/ARB if proteinuria"]
        M2["SGLT2i if diabetic"]
        M3["Statin for CVD risk"]
        M4["Avoid nephrotoxins"]
    end

    D & E & F --> Management

    F --> I["CKD-MBD:\\nCheck PTH, Ca, Phos\\nVitamin D if deficient"]

    G --> J["Anemia management\\nESA if Hgb <10"]
    G --> K["Create AV fistula\\n6 months ahead"]

    H --> L{"Patient choice?"}
    L -->|"HD"| N["Mature fistula\\nStart when symptomatic"]
    L -->|"PD"| O["Catheter placement\\nTraining"]
    L -->|"Transplant"| P["Evaluation\\nListing"]
    L -->|"Conservative"| Q["Symptom management\\nPalliative care"]

    style H fill:#DC143C,color:#fff
    style P fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a hyponatremia diagnostic algorithm',
    output: `flowchart TD
    A[("Hyponatremia\\nNa <135")] --> B{"Serum Osm?"}

    B -->|"<275\\nHypotonic"| C["True Hyponatremia"]
    B -->|"275-295\\nIsotonic"| D["Pseudohyponatremia\\nLipids, Protein"]
    B -->|">295\\nHypertonic"| E["Dilutional\\nHyperglycemia"]

    C --> F{"Volume Status?"}

    F -->|"Hypovolemic\\nDry, orthostatic"| G{"Urine Na?"}
    G -->|"<20"| H["Extrarenal loss\\nGI, Skin, Third space"]
    G -->|">20"| I["Renal loss\\nDiuretics, Salt-wasting"]

    F -->|"Euvolemic\\nNormal exam"| J{"Urine Osm?"}
    J -->|"<100\\nDilute"| K["Primary polydipsia"]
    J -->|">100\\nConcentrated"| L["SIADH\\nHypothyroid\\nAdrenal insufficiency"]

    F -->|"Hypervolemic\\nEdema, ascites"| M["Heart failure\\nCirrhosis\\nNephrotic syndrome"]

    H --> N["Isotonic saline\\nTreat underlying cause"]
    I --> N
    L --> O["Fluid restriction\\n<1L/day"]
    M --> P["Fluid + sodium restriction\\nDiuretics, treat underlying"]

    subgraph Correction["Safe Correction"]
        R["Goal: <8-10 mEq/L per 24h"]
        S["Risk: Osmotic demyelination"]
    end

    style A fill:#FFA500,color:#000
    style L fill:#4169E1,color:#fff
    style R fill:#DC143C,color:#fff`,
  },
  {
    prompt: 'Create a dialysis modality comparison diagram',
    output: `flowchart TD
    A[("ESRD - RRT Decision")] --> B{"Patient factors"}

    B --> C["Lifestyle preferences"]
    B --> D["Medical factors"]
    B --> E["Access feasibility"]

    subgraph HD["Hemodialysis"]
        HD1["In-center HD"]
        HD1 --> HD1a["3x/week, 4 hours"]
        HD1 --> HD1b["Staff supervised"]
        HD1 --> HD1c["Transportation needed"]

        HD2["Home HD"]
        HD2 --> HD2a["Flexible schedule"]
        HD2 --> HD2b["Training required"]
        HD2 --> HD2c["Partner/space needed"]
    end

    subgraph PD["Peritoneal Dialysis"]
        PD1["CAPD"]
        PD1 --> PD1a["4 exchanges/day"]
        PD1 --> PD1b["No machine"]
        PD1 --> PD1c["Manual exchanges"]

        PD2["APD/CCPD"]
        PD2 --> PD2a["Cycler overnight"]
        PD2 --> PD2b["Days free"]
        PD2 --> PD2c["More independence"]
    end

    subgraph TX["Transplant"]
        TX1["Living donor"]
        TX1 --> TX1a["Best outcomes"]
        TX1 --> TX1b["Pre-emptive possible"]

        TX2["Deceased donor"]
        TX2 --> TX2a["Waitlist varies"]
        TX2 --> TX2b["5-7 year average"]
    end

    C --> HD2
    C --> PD2
    C --> TX

    D -->|"Cardiac instability"| PD
    D -->|"Abdominal surgery"| HD
    D -->|"Suitable candidate"| TX

    E -->|"Poor vessels"| PD
    E -->|"Intact peritoneum"| PD
    E -->|"Good access"| HD

    style TX1 fill:#228B22,color:#fff
    style HD1 fill:#4169E1,color:#fff
    style PD2 fill:#9370DB,color:#fff`,
  },
  {
    prompt: 'Create a hyperkalemia emergency management flowchart',
    output: `flowchart TD
    A[("Hyperkalemia\\nK >5.5")] --> B{"ECG Changes?"}

    B -->|"Peaked T waves\\nWidened QRS\\nSine wave"| C["EMERGENCY"]
    B -->|"Normal ECG"| D{"K Level?"}

    C --> E["Cardiac Monitor\\nCrash Cart Ready"]
    E --> F["Step 1: Stabilize Membrane"]
    F --> F1["Calcium gluconate 1-2g IV\\nover 2-3 min"]

    F1 --> G["Step 2: Shift K Intracellular"]
    G --> G1["Regular insulin 10U IV"]
    G --> G2["+ D50 25-50g (if not hyperglycemic)"]
    G --> G3["Albuterol 10-20mg nebulized"]
    G --> G4["Sodium bicarbonate if acidotic"]

    G1 & G2 & G3 & G4 --> H["Step 3: Eliminate K"]
    H --> H1["Loop diuretic if making urine"]
    H --> H2["GI binders: Kayexalate/Lokelma"]
    H --> H3["Consider emergent HD"]

    D -->|"5.5-6.0"| I["Mild"]
    D -->|"6.0-6.5"| J["Moderate"]
    D -->|">6.5"| C

    I --> K["Dietary restriction\\nStop offending meds\\nGI binder"]
    J --> L["Insulin + glucose\\nGI binder\\nClose monitoring"]

    subgraph Causes["Address Underlying Cause"]
        M1["Stop ACEi/ARB/K-sparing"]
        M2["Treat acidosis"]
        M3["Address tissue breakdown"]
        M4["Optimize renal function"]
    end

    H & K & L --> Causes

    style C fill:#DC143C,color:#fff
    style F1 fill:#FFA500,color:#000
    style H3 fill:#4169E1,color:#fff`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

export default {
  NEPHROLOGY_DOMAIN_PROMPT,
  NEPHROLOGY_PROMPTS,
  NEPHROLOGY_FEW_SHOT_EXAMPLES,
};
