/**
 * pharmacology-prompts.ts
 * Pharmacology-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for pharmacology and drug science including:
 * - Drug mechanism diagrams
 * - Pharmacokinetic pathways
 * - Drug interaction charts
 * - Dose-response visualizations
 * - Therapeutic drug monitoring
 * - Adverse drug reactions
 * - Clinical prescribing algorithms
 * - Drug class comparisons
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// PHARMACOLOGY DOMAIN PROMPT
// =============================================================================

/**
 * Base pharmacology domain prompt for drug science diagrams
 */
export const PHARMACOLOGY_DOMAIN_PROMPT = `
Pharmacology diagram requirements:
- Use standard pharmacological terminology (ADME, EC50, Emax, t1/2, Vd, CL)
- Follow FDA labeling and clinical pharmacology guidelines
- Include proper drug class nomenclature (INN/USAN naming)
- Use appropriate PK/PD parameter notation with units
- Reference established drug interaction databases
- Apply color coding: Green for therapeutic, Red for toxic, Orange for caution
- Include clinical relevance annotations
- Distinguish between pharmacokinetic and pharmacodynamic interactions
- Reference therapeutic drug monitoring thresholds where applicable
- Include contraindications and black box warnings when relevant`;

// =============================================================================
// PHARMACOLOGY-SPECIFIC PROMPTS
// =============================================================================

export const PHARMACOLOGY_PROMPTS = {
  // Pharmacokinetics
  admePathway: `
ADME Pharmacokinetic Pathway requirements:
- Show drug journey: Absorption → Distribution → Metabolism → Excretion
- Include bioavailability (F) calculation
- Show volume of distribution (Vd) concept
- Reference hepatic CYP450 enzymes involved
- Include protein binding percentage
- Show half-life and clearance relationship
- Reference first-pass metabolism when applicable
- Include renal and hepatic elimination routes`,

  drugHalfLife: `
Drug Half-Life and Elimination requirements:
- Show first-order elimination kinetics
- Include t1/2 = 0.693/ke formula
- Reference time to steady state (4-5 half-lives)
- Show concentration-time curve
- Include therapeutic and toxic thresholds
- Reference dosing interval implications
- Show accumulation with multiple dosing
- Include loading dose concept when appropriate`,

  steadyStateKinetics: `
Steady-State Pharmacokinetics requirements:
- Show drug accumulation to steady state
- Include Css = (F × Dose)/(CL × τ) relationship
- Reference peak (Cmax) and trough (Cmin) levels
- Show fluctuation within dosing interval
- Include therapeutic window visualization
- Reference loading dose calculation
- Show extended vs immediate release differences
- Include clinical monitoring timing`,

  bioavailability: `
Drug Bioavailability Comparison requirements:
- Compare oral vs IV administration
- Show AUC calculation concept
- Reference F = AUC(oral)/AUC(IV) formula
- Include first-pass effect visualization
- Show absorption phase differences
- Reference formulation effects (salt form, excipients)
- Include food-drug interactions on absorption
- Show generic vs brand bioequivalence`,

  // Pharmacodynamics
  doseResponse: `
Dose-Response Relationship requirements:
- Show graded dose-response curve (sigmoid)
- Include EC50 and Emax labeling
- Reference potency vs efficacy distinction
- Show therapeutic index visualization
- Include ED50 and TD50 comparison
- Reference log-dose transformation
- Show receptor occupancy relationship
- Include clinical relevance annotations`,

  receptorMechanisms: `
Receptor Pharmacology Diagram requirements:
- Distinguish agonist vs antagonist effects
- Show competitive vs non-competitive inhibition
- Include receptor binding affinity (Kd)
- Reference spare receptor concept
- Show dose-response curve shifts
- Include allosteric modulation
- Reference desensitization/tachyphylaxis
- Show clinical drug examples for each type`,

  therapeuticIndex: `
Therapeutic Index Visualization requirements:
- Show TD50/ED50 ratio graphically
- Reference safety margin concept
- Include narrow therapeutic index drugs list
- Show therapeutic window visualization
- Reference TDM requirements for NTI drugs
- Include population variability considerations
- Show dosing implications
- Reference FDA narrow therapeutic index criteria`,

  // Drug Interactions
  drugDrugInteraction: `
Drug-Drug Interaction Algorithm requirements:
- Classify interaction mechanism (PK vs PD)
- Show CYP450 inhibition/induction effects
- Include severity rating (minor/moderate/major)
- Reference clinical management strategies
- Show plasma level changes expected
- Include timing of interaction onset
- Reference monitoring parameters
- Show alternative drug options`,

  cyp450Metabolism: `
CYP450 Metabolism Pathway requirements:
- Show major CYP isoforms (3A4, 2D6, 2C9, etc.)
- Include substrate, inhibitor, inducer examples
- Reference pharmacogenomic variants
- Show enzyme abundance in liver
- Include drug interaction potential
- Reference prodrug activation pathways
- Show metabolic pathway diagrams
- Include clinical phenotype implications`,

  pharmacogenomics: `
Pharmacogenomic Dosing Algorithm requirements:
- Reference CPIC guidelines
- Include gene-drug pairs (CYP2D6, CYP2C19, etc.)
- Show metabolizer phenotype categories
- Include dosing recommendations by phenotype
- Reference FDA pharmacogenomic labeling
- Show genotype testing indications
- Include actionable gene variants
- Reference clinical implementation strategies`,

  // Therapeutic Drug Monitoring
  tdmProtocol: `
TDM Protocol Algorithm requirements:
- Include sample timing (peak vs trough)
- Show therapeutic range for drug
- Reference dose adjustment calculations
- Include renal function considerations
- Show steady-state achievement timing
- Reference assay methodology
- Include frequency of monitoring
- Show clinical decision points`,

  narrowTherapeuticIndex: `
Narrow Therapeutic Index Drug Management requirements:
- List NTI drugs (warfarin, digoxin, lithium, etc.)
- Show TDM monitoring schedules
- Include therapeutic ranges with units
- Reference signs/symptoms of toxicity
- Show dose adjustment algorithms
- Include generic substitution cautions
- Reference patient counseling points
- Show emergency reversal protocols`,

  // Adverse Drug Reactions
  adrClassification: `
ADR Classification Diagram requirements:
- Distinguish Type A (augmented) vs Type B (bizarre)
- Include dose-dependency assessment
- Show predictability characteristics
- Reference Naranjo causality scale
- Include severity grading (mild/moderate/severe)
- Show management approach by type
- Reference reporting requirements (FDA MedWatch)
- Include preventability assessment`,

  drugAllergy: `
Drug Allergy Evaluation Algorithm requirements:
- Differentiate true allergy vs intolerance
- Show timing-based classification
- Include IgE-mediated vs T-cell reactions
- Reference cross-reactivity patterns
- Show diagnostic testing options
- Include desensitization protocols
- Reference documentation requirements
- Show alternative drug selection`,

  hepatotoxicity: `
Drug-Induced Liver Injury (DILI) Algorithm requirements:
- Include Hy's Law criteria
- Show R-value calculation
- Reference causality assessment (RUCAM)
- Include monitoring parameters (LFTs)
- Show high-risk drug classes
- Reference patterns (hepatocellular/cholestatic/mixed)
- Include management and rechallenge
- Show severity grading criteria`,

  // Clinical Prescribing
  antibioticStewardship: `
Antibiotic Stewardship Algorithm requirements:
- Include spectrum-appropriate selection
- Show de-escalation decision points
- Reference culture-guided therapy
- Include duration of therapy guidance
- Show IV-to-PO conversion criteria
- Reference local antibiogram data
- Include allergy assessment
- Show resistance prevention strategies`,

  opioidSafety: `
Opioid Prescribing Safety Algorithm requirements:
- Include risk assessment tools (ORT)
- Show MME calculation reference
- Reference CDC opioid guidelines
- Include PDMP check requirements
- Show naloxone co-prescribing criteria
- Reference taper protocols
- Include urine drug screening
- Show alternative pain strategies`,

  anticoagulationManagement: `
Anticoagulation Selection Algorithm requirements:
- Distinguish DOAC vs warfarin indications
- Include renal function considerations
- Show drug interaction assessment
- Reference reversal agent availability
- Include bridging therapy guidelines
- Show bleeding risk assessment
- Reference INR or drug level monitoring
- Include perioperative management`,

  renalDosing: `
Renal Dosing Adjustment Algorithm requirements:
- Show GFR-based dosing tiers
- Include Cockcroft-Gault vs CKD-EPI
- Reference dialyzability characteristics
- Show post-dialysis dosing
- Include nephrotoxic drug avoidance
- Reference drug accumulation risks
- Show supplemental dosing protocols
- Include monitoring parameters`,

  hepaticDosing: `
Hepatic Impairment Dosing Algorithm requirements:
- Reference Child-Pugh classification
- Show dose reduction recommendations
- Include hepatically cleared drugs
- Reference protein binding changes
- Show prodrug activation concerns
- Include hepatotoxic drug avoidance
- Reference monitoring parameters
- Show alternative drug selection`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Pharmacology-specific few-shot examples
 */
export const PHARMACOLOGY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create an ADME pharmacokinetic pathway for oral medication',
    output: `flowchart TD
    A[("Oral Drug\\nAdministration")] --> B["GI Absorption"]
    B -->|"Bioavailability F"| C["Portal Circulation"]
    C --> D["Liver\\n(First-Pass)"]
    D -->|"CYP450"| E["Metabolites"]
    D --> F["Systemic\\nCirculation"]
    F --> G{"Protein\\nBound?"}
    G -->|"Bound"| H["Albumin Complex"]
    G -->|"Free"| I["Target Tissues\\n(Vd)"]
    I --> J["Pharmacological\\nEffect"]
    F --> K["Kidney"]
    K --> L["Urinary\\nExcretion"]
    E --> L
    D --> M["Bile"]
    M --> N["Fecal\\nExcretion"]
    style D fill:#F39C12,color:#000
    style J fill:#22c55e,color:#fff
    style L fill:#b45309,color:#fff`,
  },
  {
    prompt: 'Create a dose-response curve comparison diagram',
    output: `flowchart TD
    subgraph Curve["Dose-Response Curves"]
        A["Drug A:\\nMore Potent\\n(Lower EC50)"]
        B["Drug B:\\nHigher Efficacy\\n(Higher Emax)"]
        C["Drug C:\\nPartial Agonist\\n(Lower Emax)"]
    end
    subgraph Parameters["Key Parameters"]
        D["EC50 = Dose at\\n50% Emax"]
        E["Emax = Maximum\\nEffect"]
        F["Potency = 1/EC50"]
        G["Efficacy = Emax"]
    end
    subgraph Clinical["Clinical Implications"]
        H["Potency →\\nDose Selection"]
        I["Efficacy →\\nTherapeutic Effect"]
    end
    D --> H
    G --> I
    style A fill:#22c55e,color:#fff
    style B fill:#3b82f6,color:#fff
    style C fill:#f59e0b,color:#000`,
  },
  {
    prompt: 'Create a CYP450 drug interaction diagram',
    output: `flowchart TD
    A[("Drug A\\nSubstrate")] --> B["CYP3A4"]
    C[("Drug B\\nInhibitor")] -->|"Inhibits"| B
    D[("Drug C\\nInducer")] -->|"Induces"| B
    B --> E{"Effect on\\nDrug A?"}
    E -->|"With Inhibitor"| F["⬆️ Drug A Levels\\n(Toxicity Risk)"]
    E -->|"With Inducer"| G["⬇️ Drug A Levels\\n(Subtherapeutic)"]
    E -->|"Alone"| H["Normal Metabolism"]
    F --> I["Reduce Dose\\nor Avoid"]
    G --> J["Increase Dose\\nor Alternative"]
    H --> K["Standard Dosing"]
    style F fill:#ef4444,color:#fff
    style G fill:#3b82f6,color:#fff
    style K fill:#22c55e,color:#fff`,
  },
  {
    prompt: 'Create a therapeutic drug monitoring protocol',
    output: `flowchart TD
    A[("Start TDM")] --> B["Steady State?\\n(4-5 half-lives)"]
    B -->|"No"| C["Wait for\\nSteady State"]
    B -->|"Yes"| D["Draw Trough\\n(30 min pre-dose)"]
    D --> E["Lab Analysis"]
    E --> F{"Level in\\nTherapeutic Range?"}
    F -->|"Below Range"| G["⬆️ Increase Dose"]
    F -->|"In Range"| H["✓ Continue\\nCurrent Dose"]
    F -->|"Above Range"| I["⬇️ Decrease Dose\\nor Hold"]
    G --> J["Recheck Level\\nin 48-72h"]
    I --> J
    H --> K["Routine\\nMonitoring"]
    J --> F
    style H fill:#22c55e,color:#fff
    style I fill:#ef4444,color:#fff
    style G fill:#f59e0b,color:#000`,
  },
  {
    prompt: 'Create an adverse drug reaction classification algorithm',
    output: `flowchart TD
    A[("Suspected\\nADR")] --> B{"Predictable from\\nPharmacology?"}
    B -->|"Yes"| C["Type A:\\nAugmented"]
    B -->|"No"| D["Type B:\\nBizarre"]
    C --> E["Dose-Dependent\\n(~80% of ADRs)"]
    E --> F["Management:\\nReduce Dose"]
    D --> G["Not Dose-Dependent\\nIdiosyncratic"]
    G --> H["Management:\\nStop Drug"]
    A --> I{"Timing?"}
    I -->|"<1 hour"| J["Immediate\\n(Type I)"]
    I -->|">1 hour"| K["Delayed\\n(Type IV)"]
    J --> L["IgE-Mediated\\nAnaphylaxis Risk"]
    K --> M["T-Cell Mediated\\nRash, DRESS"]
    style C fill:#f59e0b,color:#000
    style D fill:#ef4444,color:#fff
    style L fill:#7f1d1d,color:#fff`,
  },
  {
    prompt: 'Create a renal dosing adjustment algorithm',
    output: `flowchart TD
    A[("Prescribe\\nRenally-Cleared Drug")] --> B["Calculate GFR\\n(CKD-EPI)"]
    B --> C{"GFR\\n(mL/min)?"}
    C -->|"≥60"| D["Normal Dose\\n100%"]
    C -->|"30-59"| E["Moderate CKD\\n75% Dose"]
    C -->|"15-29"| F["Severe CKD\\n50% Dose"]
    C -->|"<15"| G["ESKD\\n25% or Avoid"]
    G --> H{"On\\nDialysis?"}
    H -->|"Yes"| I["Dose Post-HD\\nif Dialyzable"]
    H -->|"No"| J["Extended Interval\\nor Alternative"]
    D --> K["Standard\\nMonitoring"]
    E & F --> L["Enhanced\\nMonitoring"]
    I & J --> M["Close\\nMonitoring + Levels"]
    style D fill:#22c55e,color:#fff
    style G fill:#ef4444,color:#fff
    style F fill:#f59e0b,color:#000`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

export default {
  PHARMACOLOGY_DOMAIN_PROMPT,
  PHARMACOLOGY_PROMPTS,
  PHARMACOLOGY_FEW_SHOT_EXAMPLES,
};
