/**
 * radiology-prompts.ts
 * Radiology-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for diagnostic radiology including:
 * - Imaging modality selection and appropriateness
 * - CT and MRI interpretation protocols
 * - Interventional radiology procedures
 * - Nuclear medicine and PET imaging
 * - Radiation safety and dose optimization
 * - PACS workflow and reporting
 * - Contrast media management
 * - Incidental findings management
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// RADIOLOGY DOMAIN PROMPT
// =============================================================================

/**
 * Base radiology domain prompt for diagnostic imaging diagrams
 */
export const RADIOLOGY_DOMAIN_PROMPT = `
Radiology diagram requirements:
- Use standard radiology terminology (HU, T1/T2, DWI, ADC, SUV, etc.)
- Follow ACR Appropriateness Criteria conventions
- Reference Fleischner Society guidelines for pulmonary nodules
- Include proper imaging planes (axial, coronal, sagittal, oblique)
- Use standard window/level settings (lung, soft tissue, bone, brain)
- Follow ACR BI-RADS, LI-RADS, PI-RADS, TI-RADS reporting systems
- Include proper anatomical orientation (R/L, anterior/posterior, superior/inferior)
- Use color coding: Normal (Green), Abnormal (Red/Orange), Artifact (Yellow), Critical (Purple)
- Reference ALARA principles for radiation dose optimization
- Include proper contrast phase timing (arterial, portal venous, delayed)`;

// =============================================================================
// RADIOLOGY-SPECIFIC PROMPTS
// =============================================================================

export const RADIOLOGY_PROMPTS = {
  // Clinical Decision Support
  imagingSelection: `
Imaging Selection Algorithm requirements:
- Reference ACR Appropriateness Criteria ratings (1-9)
- Include clinical indication and patient factors
- Show modality options ranked by appropriateness
- Include radiation dose considerations (RRL rating)
- Consider contrast requirements and contraindications
- Include cost-effectiveness considerations
- Reference alternative imaging if contraindicated`,

  pulmonaryNoduleWorkup: `
Pulmonary Nodule Workup requirements:
- Follow Fleischner Society 2017 guidelines
- Differentiate solid vs subsolid vs ground-glass
- Include size thresholds (<6mm, 6-8mm, >8mm)
- Consider patient risk factors (smoking, age, cancer history)
- Show follow-up interval recommendations
- Include PET-CT and biopsy decision points
- Reference Lung-RADS categories for screening populations`,

  strokeImagingProtocol: `
Stroke Imaging Protocol requirements:
- Include door-to-imaging time targets
- Show NCCT for hemorrhage exclusion
- Reference CTA for LVO detection
- Include CTP for mismatch evaluation
- Show ASPECTS scoring integration
- Reference time windows (0-4.5h, 4.5-6h, 6-24h)
- Include thrombectomy eligibility criteria`,

  mriSafetyScreening: `
MRI Safety Screening requirements:
- Include cardiac device classification (MR Safe, Conditional, Unsafe)
- Reference implant compatibility databases
- Show screening questionnaire flow
- Include claustrophobia and anxiety management
- Reference gadolinium contraindications (NSF risk)
- Include pregnancy screening protocols
- Show zone classification (I-IV) workflow`,

  contrastReactionManagement: `
Contrast Reaction Management requirements:
- Classify reaction severity (mild, moderate, severe)
- Include ACR contrast reaction treatment algorithms
- Show premedication protocols for prior reactors
- Reference eGFR thresholds for iodinated contrast
- Include specific medication treatments (epinephrine, diphenhydramine)
- Show breakthrough reaction management
- Reference post-reaction monitoring and documentation`,

  // Imaging Interpretation
  ctInterpretation: `
CT Interpretation Protocol requirements:
- Include systematic review approach (ABCDEF mnemonic)
- Reference window/level optimization for pathology
- Show multi-phase evaluation for contrast studies
- Include measurement standards (RECIST criteria)
- Reference anatomical variant recognition
- Include artifact identification and mitigation
- Show structured reporting format`,

  mriSequenceSelection: `
MRI Sequence Selection requirements:
- Match sequences to clinical indication
- Include T1W, T2W, FLAIR, DWI, SWI applications
- Reference contrast-enhanced sequence timing
- Show sequence parameters (TE, TR, flip angle)
- Include artifact reduction strategies
- Reference advanced techniques (MRS, perfusion, tractography)
- Show protocol optimization for scan time`,

  ultrasoundEvaluation: `
Ultrasound Evaluation requirements:
- Include transducer selection by application
- Reference standard imaging planes and views
- Show Doppler assessment techniques
- Include image optimization settings
- Reference AIUM practice parameters
- Show elastography and contrast-enhanced US
- Include documentation requirements`,

  nuclearMedicineInterpretation: `
Nuclear Medicine Interpretation requirements:
- Include radiopharmaceutical selection criteria
- Reference SUV measurement and thresholds
- Show Deauville scoring for lymphoma
- Include physiologic uptake patterns
- Reference common artifacts and pitfalls
- Show hybrid imaging (PET/CT, SPECT/CT) protocols
- Include dosimetry considerations`,

  mammographyReporting: `
Mammography Reporting requirements:
- Follow ACR BI-RADS lexicon and categories
- Include mass descriptors (shape, margin, density)
- Reference calcification morphology and distribution
- Show architectural distortion evaluation
- Include associated features and findings
- Reference supplemental screening indications
- Show management recommendations by category`,

  // Interventional Radiology
  biopsyPlanning: `
Image-Guided Biopsy Planning requirements:
- Include target lesion characterization
- Reference guidance modality selection (US, CT, MRI)
- Show access route planning and safety margins
- Include needle selection (gauge, type)
- Reference sample handling protocols
- Show complication prevention strategies
- Include post-procedure monitoring`,

  drainageProcedure: `
Percutaneous Drainage Procedure requirements:
- Include collection characterization and sizing
- Reference Seldinger vs trocar technique selection
- Show catheter sizing and type selection
- Include drain management protocols
- Reference output monitoring thresholds
- Show catheter repositioning and exchange
- Include removal criteria`,

  vascularIntervention: `
Vascular Intervention requirements:
- Include pre-procedure imaging assessment
- Reference access site selection (femoral, radial, brachial)
- Show wire and catheter selection
- Include angioplasty and stent indications
- Reference anticoagulation protocols
- Show embolization techniques and agents
- Include post-procedure care and follow-up`,

  // Radiation Safety
  radiationDoseOptimization: `
Radiation Dose Optimization requirements:
- Follow ALARA principles
- Include patient-specific dose estimation
- Reference diagnostic reference levels (DRLs)
- Show pediatric-specific protocols
- Include dose reduction techniques (ATCM, IR)
- Reference dose tracking and monitoring
- Show patient counseling and consent`,

  contrastDoseCalculation: `
Contrast Dose Calculation requirements:
- Include weight-based dosing protocols
- Reference injection rate optimization
- Show bolus tracking and timing techniques
- Include saline flush protocols
- Reference dose reduction strategies
- Show multi-phase injection protocols
- Include pediatric contrast considerations`,

  // Workflow and Reporting
  pacsWorkflow: `
PACS Workflow requirements:
- Include study acquisition and routing
- Reference image quality assessment
- Show worklist management and prioritization
- Include critical findings communication
- Reference hanging protocol optimization
- Show integration with EMR/RIS
- Include archival and retrieval protocols`,

  structuredReporting: `
Structured Reporting requirements:
- Include indication and clinical history
- Reference comparison studies
- Show technique documentation
- Include findings organization by system
- Reference standardized terminology (RadLex)
- Show impression with recommendations
- Include communication of critical findings`,

  incidentalFindingsManagement: `
Incidental Findings Management requirements:
- Reference ACR incidental findings white papers
- Include organ-specific follow-up recommendations
- Show risk stratification by finding type
- Include size thresholds for follow-up
- Reference patient communication protocols
- Show documentation requirements
- Include tracking system integration`,

  qualityAssurance: `
Radiology QA Requirements:
- Include peer review and discrepancy tracking
- Reference equipment QC protocols
- Show dose monitoring and benchmarking
- Include report turnaround time metrics
- Reference critical value communication audits
- Show continuous improvement processes
- Include accreditation requirements (ACR, TJC)`,

  teleradiologyProtocol: `
Teleradiology Protocol requirements:
- Include image transmission standards (DICOM)
- Reference credentialing and privileging
- Show report turnaround expectations
- Include communication protocols
- Reference emergency coverage workflows
- Show quality assurance measures
- Include regulatory compliance (licensure, HIPAA)`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Radiology-specific few-shot examples
 */
export const RADIOLOGY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a flowchart for acute stroke imaging protocol',
    output: `flowchart TD
    A[("Stroke Alert\\nActivated")] --> B["IMMEDIATE\\nNCCT Head"]
    B --> C{"Hemorrhage?"}

    C -->|"Yes"| D["Neurosurgery\\nConsult"]
    D --> E["Manage per\\nICH Protocol"]

    C -->|"No"| F["CTA Head & Neck"]
    F --> G{"Large Vessel\\nOcclusion?"}

    G -->|"No LVO"| H{"Time from\\nLast Known Well?"}
    H -->|"<4.5 hours"| I["IV tPA\\nEligible"]
    H -->|">4.5 hours"| J["Medical Management"]

    G -->|"LVO Present"| K{"Time from\\nLast Known Well?"}
    K -->|"<6 hours"| L["Direct to\\nThrombectomy"]
    K -->|"6-24 hours"| M["CTP Perfusion"]

    M --> N{"Core/Penumbra\\nMismatch?"}
    N -->|"Favorable"| L
    N -->|"Unfavorable"| J

    I --> O["Consider\\nThrombectomy"]
    L --> P["Interventional\\nNeuroradiology"]

    subgraph Timing["Critical Timing"]
        T1["Door-to-CT: <25 min"]
        T2["Door-to-CTA: <45 min"]
        T3["Door-to-Needle: <60 min"]
    end

    style A fill:#DC143C,color:#fff
    style L fill:#4169E1,color:#fff
    style P fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a pulmonary nodule management algorithm based on Fleischner guidelines',
    output: `flowchart TD
    A[("Incidental\\nPulmonary Nodule")] --> B{"Solid or\\nSubsolid?"}

    B -->|"Solid"| C{"Size?"}
    C -->|"<6mm"| D{"Risk Factors?"}
    D -->|"Low Risk"| E["No Routine\\nFollow-up"]
    D -->|"High Risk"| F["Optional CT\\nat 12 months"]

    C -->|"6-8mm"| G{"Risk Factors?"}
    G -->|"Low Risk"| H["CT at 6-12 mo\\nthen consider 18-24 mo"]
    G -->|"High Risk"| I["CT at 6-12 mo\\nthen at 18-24 mo"]

    C -->|">8mm"| J["CT at 3 months\\nOR PET/CT\\nOR Biopsy"]

    B -->|"Subsolid"| K{"Pure GGN\\nor Part-Solid?"}
    K -->|"Pure GGN <6mm"| L["No Routine\\nFollow-up"]
    K -->|"Pure GGN >=6mm"| M["CT at 6-12 mo\\nto confirm stability"]
    M --> N["Then CT every 2 yrs\\nuntil 5 years"]

    K -->|"Part-Solid"| O{"Solid Component\\n<6mm?"}
    O -->|"Yes"| P["CT at 3-6 months\\nto confirm stability"]
    O -->|"No"| Q["CT at 3-6 months\\nConsider PET/CT or Biopsy"]

    subgraph Legend["Risk Factors"]
        R1["Smoking history"]
        R2["Family history lung CA"]
        R3["Upper lobe location"]
        R4["Spiculated margins"]
    end

    style A fill:#FFA500,color:#000
    style E fill:#228B22,color:#fff
    style J fill:#DC143C,color:#fff
    style Q fill:#DC143C,color:#fff`,
  },
  {
    prompt: 'Create an MRI safety screening flowchart',
    output: `flowchart TD
    A[("MRI Ordered")] --> B["Patient Arrives\\nZone I (Waiting)"]
    B --> C["Complete MRI\\nScreening Form"]

    C --> D{"Cardiac\\nDevice?"}
    D -->|"Pacemaker/ICD"| E{"MR Conditional?"}
    E -->|"Yes"| F["Verify Conditions\\nCardiology Clearance"]
    F --> G{"All Conditions\\nMet?"}
    G -->|"Yes"| H["Proceed with\\nModified Protocol"]
    G -->|"No"| I["MRI Contraindicated\\nAlternative Imaging"]
    E -->|"No/Unknown"| I

    D -->|"No"| J{"Other\\nImplants?"}
    J --> K{"Cochlear\\nImplant?"}
    K -->|"Yes"| L["Check MR Status\\nENT Clearance"]

    J --> M{"Aneurysm\\nClips?"}
    M -->|"Yes"| N["Verify MR-Safe\\nNeurosurgery Records"]

    J --> O{"Metallic\\nForeign Body?"}
    O -->|"Eye/Orbit"| P["Orbital X-ray\\nRequired"]

    J --> Q{"Medication\\nPump?"}
    Q -->|"Insulin Pump"| R["Remove Before\\nEntering Zone III"]

    K & L & M & N & O & P & Q -->|"Cleared"| S["Zone II\\nAdvanced Screening"]
    S --> T["Remove ALL\\nMetallic Objects"]
    T --> U["Zone III\\nMRI Control Room"]
    U --> V["Zone IV\\nMagnet Room"]
    V --> W["Complete MRI\\nExamination"]

    subgraph Zones["MRI Safety Zones"]
        Z1["Zone I: Public Access"]
        Z2["Zone II: Screening"]
        Z3["Zone III: Control Room"]
        Z4["Zone IV: Magnet"]
    end

    style A fill:#4169E1,color:#fff
    style I fill:#DC143C,color:#fff
    style W fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a contrast reaction management algorithm',
    output: `flowchart TD
    A[("Contrast\\nReaction")] --> B{"Severity\\nAssessment"}

    B -->|"MILD"| C["Limited Urticaria\\nPruritus\\nNasal Congestion"]
    C --> D["Observation\\nOral Antihistamine"]
    D --> E["Monitor 30 min\\nDischarge if stable"]

    B -->|"MODERATE"| F["Diffuse Urticaria\\nFacial Edema\\nMild Bronchospasm"]
    F --> G["IV Access\\nDiphenhydramine 25-50mg IV"]
    G --> H{"Bronchospasm?"}
    H -->|"Yes"| I["Albuterol Nebulizer\\nEpinephrine 0.1-0.3mg IM"]
    H -->|"No"| J["Continue Monitoring"]

    B -->|"SEVERE"| K["Laryngeal Edema\\nSevere Bronchospasm\\nHypotension\\nCardiac Arrest"]
    K --> L["CALL CODE\\nEpinephrine 0.1mg IV"]

    L --> M["IV Fluids\\nNormal Saline Bolus"]
    M --> N{"Hypotension\\nPersists?"}
    N -->|"Yes"| O["Repeat Epinephrine\\nVasopressors"]
    N -->|"No"| P["ICU Admission\\nContinued Monitoring"]

    subgraph Medications["Emergency Medications"]
        Med1["Epinephrine 1:1000 IM (0.3mg)"]
        Med2["Epinephrine 1:10000 IV (0.1mg)"]
        Med3["Diphenhydramine 25-50mg IV"]
        Med4["Albuterol 2.5mg nebulized"]
        Med5["Normal Saline 1-2L bolus"]
    end

    subgraph Equipment["Emergency Equipment"]
        Eq1["Crash Cart"]
        Eq2["Oxygen + Mask"]
        Eq3["Suction"]
        Eq4["Airway Kit"]
    end

    style A fill:#FFA500,color:#000
    style K fill:#DC143C,color:#fff
    style L fill:#DC143C,color:#fff
    style E fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a CT window settings comparison diagram',
    output: `flowchart TB
    subgraph CTWindows["CT Window Settings"]
        direction TB

        subgraph Lung["Lung Window"]
            L1["Width: 1500 HU"]
            L2["Level: -600 HU"]
            L3["Best for: Parenchyma\\nNodules, Airways"]
        end

        subgraph Soft["Soft Tissue Window"]
            S1["Width: 350-400 HU"]
            S2["Level: 40-50 HU"]
            S3["Best for: Organs\\nMasses, Lymph nodes"]
        end

        subgraph Bone["Bone Window"]
            B1["Width: 2000-2500 HU"]
            B2["Level: 300-500 HU"]
            B3["Best for: Fractures\\nBone lesions"]
        end

        subgraph Brain["Brain Window"]
            Br1["Width: 80 HU"]
            Br2["Level: 40 HU"]
            Br3["Best for: Gray/White\\nmatter, Infarcts"]
        end

        subgraph Stroke["Stroke Window"]
            St1["Width: 8 HU"]
            St2["Level: 32 HU"]
            St3["Best for: Early\\nischemic changes"]
        end

        subgraph Liver["Liver Window"]
            Lv1["Width: 150 HU"]
            Lv2["Level: 30 HU"]
            Lv3["Best for: Lesion\\ndetection"]
        end
    end

    subgraph HUScale["Hounsfield Scale Reference"]
        direction LR
        Air["-1000 HU\\nAir"] --> Fat["-100 HU\\nFat"]
        Fat --> Water["0 HU\\nWater"]
        Water --> Blood["30-45 HU\\nBlood"]
        Blood --> Soft2["40-80 HU\\nSoft Tissue"]
        Soft2 --> Bone2["+1000 HU\\nBone"]
    end

    style Lung fill:#87CEEB,color:#000
    style Soft fill:#FFA07A,color:#000
    style Bone fill:#F5F5DC,color:#000
    style Brain fill:#DDA0DD,color:#000
    style Stroke fill:#FFD700,color:#000
    style Liver fill:#8B4513,color:#fff`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

export default {
  RADIOLOGY_DOMAIN_PROMPT,
  RADIOLOGY_PROMPTS,
  RADIOLOGY_FEW_SHOT_EXAMPLES,
};
