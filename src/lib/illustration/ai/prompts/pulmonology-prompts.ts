/**
 * pulmonology-prompts.ts
 * Pulmonology-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for respiratory medicine including:
 * - Respiratory anatomy and physiology
 * - Obstructive and restrictive lung diseases
 * - Pulmonary function test interpretation
 * - Ventilator management and weaning
 * - Respiratory procedures
 * - Advanced diagnostic interpretation
 * - Sleep medicine analysis
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// PULMONOLOGY DOMAIN PROMPT
// =============================================================================

/**
 * Base pulmonology domain prompt for respiratory medicine diagrams
 */
export const PULMONOLOGY_DOMAIN_PROMPT = `
Pulmonology diagram requirements:
- Use standard respiratory terminology (FEV1, FVC, TLC, DLCO)
- Follow GOLD guidelines for COPD classification
- Follow GINA guidelines for asthma management
- Include lung zone references (West zones) where applicable
- Use appropriate V/Q relationship notation
- Include ABG interpretation with proper pH, PCO2, PO2 labeling
- Reference ATS/ERS guidelines for pulmonary function testing
- Use color coding: Blue for deoxygenated/venous, Red for oxygenated/arterial
- Include proper ventilator mode annotations (AC, SIMV, PSV, CPAP, BiPAP)
- Follow Fleischner Society guidelines for pulmonary nodule management`;

// =============================================================================
// PULMONOLOGY-SPECIFIC PROMPTS
// =============================================================================

export const PULMONOLOGY_PROMPTS = {
  // Clinical Decision Support
  dyspneaEvaluation: `
Dyspnea Evaluation Algorithm requirements:
- Distinguish acute vs chronic dyspnea presentation
- Include vital sign thresholds (RR, SpO2, HR)
- Differentiate hypoxic vs hypercapnic respiratory failure
- Include ABG interpretation pathway
- Reference CXR and CT findings
- Include Wells/Geneva scores for PE workup
- Show escalation pathway from room air to intubation`,

  copdManagement: `
COPD Management requirements:
- Follow GOLD ABCD classification system
- Include FEV1 thresholds for severity grading
- Show stepwise bronchodilator escalation
- Include exacerbation management pathway
- Reference Anthonisen criteria for antibiotic use
- Include NIV indications for acute exacerbation
- Show maintenance therapy optimization steps`,

  asthmaStepTherapy: `
Asthma Step Therapy requirements:
- Follow GINA step 1-5 treatment approach
- Include ICS dose equivalency references
- Show step-up and step-down criteria
- Include biologic eligibility criteria (IgE, eosinophils)
- Reference ACT/ACQ control assessment
- Include exacerbation action plan pathway
- Show reliever vs controller distinctions`,

  ventilatorManagement: `
Ventilator Management requirements:
- Include mode selection algorithm (AC vs SIMV vs PSV)
- Show ARDSNet low tidal volume protocol
- Include PEEP/FiO2 titration tables
- Reference plateau pressure targets (<30 cmH2O)
- Include driving pressure calculations
- Show troubleshooting for high peak pressures
- Include auto-PEEP detection and management`,

  // Diagnostic Interpretation
  pftInterpretation: `
PFT Interpretation requirements:
- Follow ATS/ERS interpretation algorithm
- Include FEV1/FVC ratio thresholds (0.70, LLN)
- Differentiate obstructive vs restrictive vs mixed patterns
- Include bronchodilator response criteria (>12% and >200mL)
- Reference DLCO interpretation
- Include severity grading by FEV1 % predicted
- Show flow-volume loop patterns`,

  abgAnalysis: `
ABG Analysis requirements:
- Include systematic interpretation approach
- Show pH, PCO2, HCO3 relationships
- Include Winter's formula for compensation
- Calculate A-a gradient (PAO2 - PaO2)
- Differentiate acute vs chronic respiratory acidosis
- Include anion gap calculation pathway
- Reference expected compensation formulas`,

  chestImagingInterpretation: `
Chest Imaging Interpretation requirements:
- Include systematic CXR review approach
- Reference silhouette sign for localization
- Include HRCT patterns (UIP, NSIP, OP)
- Show pulmonary nodule Fleischner guidelines
- Include consolidation vs ground glass differentiation
- Reference pleural effusion characterization
- Include mediastinal compartment anatomy`,

  // Procedures
  bronchoscopyApproach: `
Bronchoscopy Approach requirements:
- Include pre-procedure checklist (NPO, consent, labs)
- Show systematic airway examination sequence
- Include sampling technique selection (BAL, brush, biopsy)
- Reference specimen handling protocols
- Include complication monitoring
- Show post-procedure care pathway
- Include EBUS indications and approach`,

  thoracentesisProtocol: `
Thoracentesis Protocol requirements:
- Include ultrasound guidance requirements
- Show Light's criteria for exudate vs transudate
- Include fluid analysis interpretation
- Reference cell count, protein, LDH, pH, glucose
- Include complication rates and management
- Show therapeutic vs diagnostic thresholds
- Include post-procedure imaging indications`,

  chestTubeManagement: `
Chest Tube Management requirements:
- Include insertion site selection (triangle of safety)
- Show drainage system setup
- Include air leak assessment
- Reference suction vs water seal indications
- Include removal criteria
- Show complication recognition
- Include tube size selection guidelines`,

  // Disease-Specific Pathways
  peWorkup: `
Pulmonary Embolism Workup requirements:
- Include Wells score calculation
- Show PERC rule application
- Reference age-adjusted D-dimer
- Include CTPA vs V/Q scan selection
- Show sPESI risk stratification
- Include anticoagulation selection pathway
- Reference thrombolysis indications`,

  pneumoniaTreatment: `
Pneumonia Treatment requirements:
- Differentiate CAP vs HAP vs VAP
- Include CURB-65/PSI severity scoring
- Show empiric antibiotic selection
- Reference de-escalation criteria
- Include atypical pathogen coverage indications
- Show treatment duration guidelines
- Include procalcitonin-guided therapy`,

  ildApproach: `
Interstitial Lung Disease Approach requirements:
- Include MDD (multidisciplinary discussion) pathway
- Show HRCT pattern recognition
- Reference serology workup panel
- Include BAL differential interpretation
- Show surgical lung biopsy indications
- Include IPF-specific antifibrotic pathway
- Reference CTD-ILD screening`,

  sleepApneaManagement: `
Sleep Apnea Management requirements:
- Include STOP-BANG screening
- Show AHI severity classification
- Reference HST vs PSG selection
- Include PAP therapy initiation
- Show auto-titration vs manual titration
- Include alternative therapy pathways (MAD, surgery)
- Reference cardiovascular risk assessment`,

  ventilatorWeaning: `
Ventilator Weaning Protocol requirements:
- Include daily SAT/SBT protocol
- Show readiness criteria (FiO2 ≤40%, PEEP ≤8)
- Reference RSBI calculation and thresholds (<105)
- Include SBT failure criteria
- Show extubation checklist
- Include post-extubation monitoring
- Reference high-risk patient considerations`,

  // Additional prompts for complete coverage
  lungFunctionTestingDiagrams: `
Lung Function Testing Diagram requirements:
- Include spirometry flow-volume loop visualization
- Show normal vs obstructive vs restrictive patterns
- Include body plethysmography interpretation
- Reference DLCO and its clinical significance
- Include bronchial challenge testing pathways
- Show pre/post bronchodilator comparisons
- Include 6-minute walk test interpretation`,

  bronchoscopyProcedureIllustration: `
Bronchoscopy Procedure Illustration requirements:
- Show complete airway anatomy visualization
- Include flexible vs rigid bronchoscopy indications
- Reference standard bronchial segment nomenclature
- Include biopsy and sampling site illustrations
- Show EBUS-TBNA technique and landmarks
- Include navigation bronchoscopy concepts
- Reference complication prevention strategies`,

  ventilatorWaveformAnalysis: `
Ventilator Waveform Analysis requirements:
- Include pressure-time, flow-time, volume-time curves
- Show auto-PEEP detection on flow waveform
- Reference patient-ventilator asynchrony patterns
- Include compliance and resistance calculations from waveforms
- Show troubleshooting algorithm for abnormal waveforms
- Include optimal PEEP titration using waveforms
- Reference esophageal pressure monitoring concepts`,

  chestImagingPatternRecognition: `
Chest Imaging Pattern Recognition requirements:
- Include systematic CXR review approach (ABCDEFGHI)
- Show HRCT patterns: UIP, NSIP, OP, HP, DAD
- Reference distribution patterns (upper vs lower, central vs peripheral)
- Include nodule characterization (solid, subsolid, ground-glass)
- Show mediastinal compartment anatomy and masses
- Include pleural disease patterns and loculations
- Reference COVID-19 and post-COVID imaging findings`,

  polysomnographyInterpretation: `
Polysomnography Interpretation requirements:
- Include sleep architecture visualization (N1, N2, N3, REM)
- Show AHI calculation and severity grading
- Reference respiratory event classification (apnea, hypopnea, RERA)
- Include oxygen desaturation index interpretation
- Show arousal patterns and sleep fragmentation
- Include periodic limb movement analysis
- Reference split-night study indications and interpretation`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Pulmonology-specific few-shot examples
 */
export const PULMONOLOGY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a flowchart for acute dyspnea evaluation in the emergency department',
    output: `flowchart TD
    A[("Acute Dyspnea")] --> B{"SpO2 <90%?"}
    B -->|Yes| C["Immediate O2\\nABG"]
    B -->|No| D["ECG + CXR"]
    C --> E{"CXR Finding?"}
    E -->|Infiltrate| F["Pneumonia/ARDS\\nWorkup"]
    E -->|Clear| G{"D-dimer\\nWells Score"}
    G -->|PE Likely| H["CTPA"]
    G -->|PE Unlikely| I{"BNP Elevated?"}
    I -->|Yes| J["CHF Exacerbation"]
    I -->|No| K["Consider:\\nAsthma/COPD\\nAnxiety"]
    D --> E

    style C fill:#DC143C,color:#fff
    style F fill:#FFA500,color:#000
    style J fill:#4169E1,color:#fff`,
  },
  {
    prompt: 'Create a COPD exacerbation management algorithm',
    output: `flowchart TD
    A[("COPD\\nExacerbation")] --> B{"Severity\\nAssessment"}
    B -->|Mild| C["Outpatient:\\nSABA PRN\\nPrednisone 40mg x5d"]
    B -->|Moderate| D["ED/Hospital"]
    B -->|Severe| E["ICU Admission"]

    D --> F["Albuterol/Ipratropium\\nNebs q4h"]
    D --> G["Systemic Steroids"]
    D --> H{"Purulent\\nSputum?"}
    H -->|Yes| I["Antibiotics x5-7d"]
    H -->|No| J["Monitor"]

    E --> K{"pH <7.35\\nPCO2 >45?"}
    K -->|Yes| L["NIV Trial"]
    L --> M{"Improving\\nin 1-2h?"}
    M -->|No| N["Intubation"]
    M -->|Yes| O["Continue NIV"]
    K -->|No| P["High-Flow O2"]

    style E fill:#DC143C,color:#fff
    style N fill:#DC143C,color:#fff
    style C fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a pulmonary function test interpretation flowchart',
    output: `flowchart TD
    A["PFT Results"] --> B{"FEV1/FVC\\n<0.70?"}
    B -->|Yes| C["OBSTRUCTION"]
    B -->|No| D{"FVC\\n<80%?"}

    D -->|Yes| E["Check TLC"]
    D -->|No| F["NORMAL"]

    E -->|"TLC <80%"| G["RESTRICTION"]
    E -->|"TLC Normal"| H["Pseudorestriction\\nor Mixed"]

    C --> I{"Bronchodilator\\nResponse?"}
    I -->|"+12% & +200mL"| J["Reversible\\n(Asthma likely)"]
    I -->|Negative| K["Fixed\\n(COPD likely)"]

    C --> L{"FEV1 %pred\\nSeverity"}
    L -->|">80%"| M["Mild"]
    L -->|"50-79%"| N["Moderate"]
    L -->|"30-49%"| O["Severe"]
    L -->|"<30%"| P["Very Severe"]

    style C fill:#FFA500,color:#000
    style G fill:#4169E1,color:#fff
    style F fill:#228B22,color:#fff
    style P fill:#DC143C,color:#fff`,
  },
  {
    prompt: 'Create a ventilator weaning protocol flowchart',
    output: `flowchart TD
    A["Daily Screening"] --> B{"Ready to\\nWean?"}
    B -->|"FiO2 ≤40%\\nPEEP ≤8\\nStable"| C["SAT:\\nStop Sedation"]
    B -->|No| D["Continue Vent\\nReassess Tomorrow"]

    C --> E{"Awake?\\nFollows Commands?"}
    E -->|Yes| F["SBT:\\nPS 5-8 or T-piece\\n30-120 min"]
    E -->|No| G["Resume Sedation\\nReassess Tomorrow"]

    F --> H{"Tolerates SBT?"}
    H -->|"HR <120\\nRR <35\\nSpO2 >90%\\nNo distress"| I["EXTUBATE"]
    H -->|Fails| J["Resume Vent\\nIdentify Cause"]

    I --> K["Post-Extubation\\nMonitoring"]
    K --> L{"Stridor or\\nDistress?"}
    L -->|Yes| M["Racemic Epi\\nConsider Reintubation"]
    L -->|No| N["Wean O2\\nPulmonary Toilet"]

    style I fill:#228B22,color:#fff
    style J fill:#FFA500,color:#000
    style M fill:#DC143C,color:#fff`,
  },
  {
    prompt: 'Create a pulmonary embolism diagnostic algorithm',
    output: `flowchart TD
    A[("Suspected PE")] --> B["Calculate\\nWells Score"]

    B --> C{"Score?"}
    C -->|"≤4 (Unlikely)"| D["Check D-dimer"]
    C -->|">4 (Likely)"| E["CTPA"]

    D -->|"Negative\\n(age-adjusted)"| F["PE Excluded"]
    D -->|Positive| E

    E -->|"PE Confirmed"| G{"Hemodynamically\\nStable?"}
    G -->|Unstable| H["Thrombolysis\\nor Embolectomy"]
    G -->|Stable| I["Risk Stratify\\nsPESI + RV Function"]

    I -->|"Low Risk\\nsPESI 0"| J["Outpatient\\nDOAC"]
    I -->|"Intermediate"| K["Admit\\nAnticoagulation"]
    I -->|"High Risk"| L["ICU\\nConsider Lytics"]

    style F fill:#228B22,color:#fff
    style H fill:#DC143C,color:#fff
    style L fill:#FFA500,color:#000`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

export default {
  PULMONOLOGY_DOMAIN_PROMPT,
  PULMONOLOGY_PROMPTS,
  PULMONOLOGY_FEW_SHOT_EXAMPLES,
};
