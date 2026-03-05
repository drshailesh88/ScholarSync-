/**
 * radiology.ts
 * Radiology diagram templates for FINNISH
 *
 * Contains comprehensive templates for diagnostic radiology including:
 * - Clinical decision algorithms (imaging selection, nodule management)
 * - Anatomical diagrams (cross-sectional, radiographic)
 * - Procedure illustrations (interventional radiology)
 * - Data visualization templates (appropriateness criteria, doses)
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// DECISION TREES
// =============================================================================

/**
 * Imaging Selection Algorithm template
 */
export const imagingSelectionAlgorithm: DiagramTemplate = {
  id: 'rad-imaging-selection',
  name: 'Imaging Selection Algorithm',
  description: 'ACR Appropriateness Criteria-based imaging modality selection for clinical scenarios',
  domain: 'medicine',
  promptTemplate: `Create an imaging selection algorithm flowchart:
- Clinical indication: {{clinicalIndication}}
- Patient factors: {{patientFactors}}
- Available modalities: {{availableModalities}}
- First-line imaging: {{firstLineImaging}}
- Alternative options: {{alternativeOptions}}
- Contraindications: {{contraindications}}
- Special considerations: {{specialConsiderations}}
{{#additionalNotes}}Additional clinical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'clinicalIndication',
    'patientFactors',
    'availableModalities',
    'firstLineImaging',
    'alternativeOptions',
    'contraindications',
    'specialConsiderations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Clinical Question")] --> B{"Anatomic vs\\nFunctional?"}
    B -->|"Anatomic"| C{"Radiation\\nConcern?"}
    B -->|"Functional"| D["Nuclear Medicine\\nor fMRI"]
    C -->|"Yes"| E["MRI or US"]
    C -->|"No"| F{"Contrast\\nOK?"}
    F -->|"Yes"| G["CT with contrast"]
    F -->|"No"| H["Non-contrast CT"]
    style A fill:#4169E1,color:#fff
    style G fill:#228B22,color:#fff`,
};

/**
 * Pulmonary Nodule Management (Fleischner) template
 */
export const pulmonaryNoduleManagement: DiagramTemplate = {
  id: 'rad-pulmonary-nodule',
  name: 'Pulmonary Nodule Management (Fleischner)',
  description: 'Fleischner Society guidelines for incidental pulmonary nodule follow-up',
  domain: 'medicine',
  promptTemplate: `Create a pulmonary nodule management flowchart:
- Nodule size: {{noduleSize}}
- Nodule type: {{noduleType}}
- Patient risk factors: {{riskFactors}}
- Solid vs subsolid: {{solidVsSubsolid}}
- Follow-up intervals: {{followUpIntervals}}
- When to biopsy/PET: {{interventionCriteria}}
- Documentation: {{documentation}}
{{#additionalNotes}}Clinical considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'noduleSize',
    'noduleType',
    'riskFactors',
    'solidVsSubsolid',
    'followUpIntervals',
    'interventionCriteria',
    'documentation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Incidental\\nPulmonary Nodule")] --> B{"Solid or\\nSubsolid?"}
    B -->|"Solid"| C{"Size?"}
    C -->|"<6mm"| D["No routine follow-up\\n(low risk)"]
    C -->|"6-8mm"| E["CT at 6-12 months"]
    C -->|">8mm"| F["CT at 3 months\\nor PET/biopsy"]
    B -->|"Subsolid"| G{"Pure GGN\\nor Part-solid?"}
    G -->|"GGN <6mm"| H["No follow-up"]
    G -->|"GGN ≥6mm"| I["CT at 6-12 months"]
    G -->|"Part-solid"| J["CT at 3-6 months"]
    style A fill:#FFA500,color:#000
    style F fill:#DC143C,color:#fff`,
};

/**
 * Incidental Findings Management template
 */
export const incidentalFindings: DiagramTemplate = {
  id: 'rad-incidental-findings',
  name: 'Incidental Findings Management',
  description: 'White paper recommendations for managing incidental imaging findings',
  domain: 'medicine',
  promptTemplate: `Create an incidental findings management flowchart:
- Finding type: {{findingType}}
- Location: {{location}}
- Size criteria: {{sizeCriteria}}
- Imaging characteristics: {{characteristics}}
- Follow-up recommendation: {{followUp}}
- Referral criteria: {{referralCriteria}}
- Patient communication: {{patientCommunication}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'findingType',
    'location',
    'sizeCriteria',
    'characteristics',
    'followUp',
    'referralCriteria',
    'patientCommunication',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Incidental\\nFinding")] --> B{"Organ System?"}
    B -->|"Adrenal"| C{"Size & HU?"}
    B -->|"Renal"| D{"Bosniak?"}
    B -->|"Liver"| E{"Enhancement?"}
    C -->|"<1cm or <10HU"| F["Benign - No F/U"]
    C -->|"≥4cm or >10HU"| G["Further workup"]
    D -->|"I-II"| F
    D -->|"IIF-IV"| H["Urology referral"]
    E -->|"Simple cyst"| F
    E -->|"Enhancing"| I["MRI characterization"]
    style G fill:#FFA500,color:#000
    style H fill:#DC143C,color:#fff`,
};

/**
 * Contrast Allergy Protocol template
 */
export const contrastAllergyProtocol: DiagramTemplate = {
  id: 'rad-contrast-allergy',
  name: 'Contrast Allergy Protocol',
  description: 'Management of patients with contrast media allergy history',
  domain: 'medicine',
  promptTemplate: `Create a contrast allergy management flowchart:
- Previous reaction type: {{reactionType}}
- Severity classification: {{severity}}
- Contrast type needed: {{contrastType}}
- Premedication protocol: {{premedication}}
- Alternative imaging: {{alternatives}}
- Emergency preparedness: {{emergencyPrep}}
- Documentation requirements: {{documentation}}
{{#additionalNotes}}Special circumstances: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'reactionType',
    'severity',
    'contrastType',
    'premedication',
    'alternatives',
    'emergencyPrep',
    'documentation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Contrast\\nNeeded")] --> B{"Previous\\nReaction?"}
    B -->|"No"| C["Proceed"]
    B -->|"Yes"| D{"Severity?"}
    D -->|"Mild\\n(hives, nausea)"| E["Premedicate"]
    D -->|"Moderate\\n(bronchospasm)"| F["Premedicate +\\nAlternative contrast"]
    D -->|"Severe\\n(anaphylaxis)"| G["Avoid contrast\\nor Alternative imaging"]
    E --> H["Prednisone 50mg\\nat 13h, 7h, 1h\\n+ Diphenhydramine"]
    style C fill:#228B22,color:#fff
    style G fill:#DC143C,color:#fff`,
};

/**
 * MRI Safety Screening template
 */
export const mriSafetyScreening: DiagramTemplate = {
  id: 'rad-mri-safety',
  name: 'MRI Safety Screening',
  description: 'Pre-MRI safety screening algorithm for implants and contraindications',
  domain: 'medicine',
  promptTemplate: `Create an MRI safety screening flowchart:
- Patient history items: {{historyItems}}
- Implant categories: {{implantCategories}}
- MR Conditional criteria: {{mrConditional}}
- Absolute contraindications: {{absoluteContraindications}}
- Relative contraindications: {{relativeContraindications}}
- Alternative imaging: {{alternatives}}
- Documentation: {{documentation}}
{{#additionalNotes}}Institutional policies: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'historyItems',
    'implantCategories',
    'mrConditional',
    'absoluteContraindications',
    'relativeContraindications',
    'alternatives',
    'documentation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("MRI\\nOrdered")] --> B["Safety Screening\\nQuestionnaire"]
    B --> C{"Cardiac\\nDevice?"}
    C -->|"Pacemaker/ICD"| D{"MR Conditional?"}
    D -->|"Yes"| E["Check conditions\\n+ Cardiology"]
    D -->|"No/Unknown"| F["❌ No MRI"]
    C -->|"No"| G{"Other\\nImplants?"}
    G -->|"Cochlear"| H["Check model"]
    G -->|"Aneurysm clip"| I["Check MR status"]
    G -->|"None"| J["✓ Proceed"]
    style F fill:#DC143C,color:#fff
    style J fill:#228B22,color:#fff`,
};

/**
 * Radiation Dose Optimization template
 */
export const radiationDoseOptimization: DiagramTemplate = {
  id: 'rad-dose-optimization',
  name: 'Radiation Dose Optimization',
  description: 'ALARA principles and dose reduction strategies for CT imaging',
  domain: 'medicine',
  promptTemplate: `Create a radiation dose optimization flowchart:
- Patient population: {{patientPopulation}}
- Exam type: {{examType}}
- Current protocol: {{currentProtocol}}
- Optimization strategies: {{strategies}}
- DLP/CTDIvol targets: {{doseTargets}}
- Image quality metrics: {{qualityMetrics}}
- Documentation: {{documentation}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'patientPopulation',
    'examType',
    'currentProtocol',
    'strategies',
    'doseTargets',
    'qualityMetrics',
    'documentation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("CT Protocol\\nOptimization")] --> B["Patient Size\\nAssessment"]
    B --> C{"Pediatric?"}
    C -->|"Yes"| D["Size-based\\nprotocol"]
    C -->|"No"| E{"BMI?"}
    E -->|"<25"| F["Standard dose"]
    E -->|"25-30"| G["Moderate increase"]
    E -->|">30"| H["Large patient protocol"]
    D & F & G & H --> I["Apply ATCM\\nIterative Recon"]
    I --> J["Verify DLP\\nwithin DRL"]
    style A fill:#4169E1,color:#fff
    style J fill:#228B22,color:#fff`,
};

/**
 * Stroke Imaging Protocol template
 */
export const strokeImagingProtocol: DiagramTemplate = {
  id: 'rad-stroke-imaging',
  name: 'Stroke Imaging Protocol',
  description: 'Acute stroke imaging algorithm for thrombolysis and thrombectomy decision-making',
  domain: 'medicine',
  promptTemplate: `Create a stroke imaging protocol flowchart:
- Time from onset: {{timeFromOnset}}
- Initial imaging: {{initialImaging}}
- CTA indications: {{ctaIndications}}
- Perfusion indications: {{perfusionIndications}}
- ASPECTS scoring: {{aspects}}
- LVO criteria: {{lvoCriteria}}
- Treatment decisions: {{treatmentDecisions}}
{{#additionalNotes}}Institutional protocol: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'timeFromOnset',
    'initialImaging',
    'ctaIndications',
    'perfusionIndications',
    'aspects',
    'lvoCriteria',
    'treatmentDecisions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("🚨 Stroke\\nAlert")] --> B["NCCT Head\\nIMMEDIATE"]
    B --> C{"Hemorrhage?"}
    C -->|"Yes"| D["Neuro consult\\nNo tPA"]
    C -->|"No"| E["CTA Head/Neck"]
    E --> F{"LVO?"}
    F -->|"Yes"| G{"Time?"}
    F -->|"No"| H["tPA if eligible"]
    G -->|"<6h"| I["Thrombectomy"]
    G -->|"6-24h"| J["CTP\\nASPECTS"]
    J --> K{"Favorable\\nMismatch?"}
    K -->|"Yes"| I
    K -->|"No"| H
    style A fill:#DC143C,color:#fff
    style I fill:#4169E1,color:#fff`,
};

// =============================================================================
// ANATOMICAL DIAGRAMS
// =============================================================================

/**
 * Cross-sectional Anatomy template
 */
export const crossSectionalAnatomy: DiagramTemplate = {
  id: 'rad-cross-sectional',
  name: 'Cross-Sectional Anatomy',
  description: 'Labeled cross-sectional CT/MRI anatomy at key levels',
  domain: 'medicine',
  promptTemplate: `Create a cross-sectional anatomy diagram:
- Body region: {{bodyRegion}}
- Level/landmark: {{level}}
- Key structures: {{keyStructures}}
- Labeling style: {{labelingStyle}}
- Relationships: {{relationships}}
- Clinical relevance: {{clinicalRelevance}}
{{#additionalNotes}}Teaching points: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'bodyRegion',
    'level',
    'keyStructures',
    'labelingStyle',
    'relationships',
    'clinicalRelevance',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Abdomen["L1 Level - Axial"]
        direction LR
        A["Liver"] --- B["Stomach"]
        B --- C["Spleen"]
        D["R Kidney"] --- E["Aorta/IVC"]
        E --- F["L Kidney"]
        G["Pancreas"]
    end
    subgraph Landmarks["Key Landmarks"]
        H["SMA origin"]
        I["Renal hilum"]
        J["Portal vein"]
    end
    style A fill:#8B4513
    style C fill:#800080
    style E fill:#DC143C`,
};

/**
 * Radiographic Anatomy Chest template
 */
export const radiographicAnatomyChest: DiagramTemplate = {
  id: 'rad-cxr-anatomy',
  name: 'Radiographic Anatomy - Chest',
  description: 'Chest X-ray anatomical structures and lines',
  domain: 'medicine',
  promptTemplate: `Create a chest radiograph anatomy diagram:
- View type: {{viewType}}
- Mediastinal structures: {{mediastinal}}
- Lung zones: {{lungZones}}
- Heart borders: {{heartBorders}}
- Diaphragm: {{diaphragm}}
- Lines and tubes: {{linesAndTubes}}
- Systematic review: {{systematicReview}}
{{#additionalNotes}}Common pathology locations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'viewType',
    'mediastinal',
    'lungZones',
    'heartBorders',
    'diaphragm',
    'linesAndTubes',
    'systematicReview',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph CXR["PA Chest X-ray"]
        subgraph Mediastinum["Mediastinum"]
            A["Trachea"]
            B["Aortic knob"]
            C["Carina"]
        end
        subgraph Heart["Heart"]
            D["RA border"]
            E["LV border"]
        end
        subgraph Lungs["Lung Zones"]
            F["Upper"] --> G["Middle"] --> H["Lower"]
        end
    end
    subgraph Checklist["Systematic Review"]
        I["A - Airways"]
        J["B - Bones"]
        K["C - Cardiac"]
        L["D - Diaphragm"]
    end`,
};

/**
 * CT Windows Comparison template
 */
export const ctWindowsComparison: DiagramTemplate = {
  id: 'rad-ct-windows',
  name: 'CT Windows Comparison',
  description: 'Comparison of different CT window/level settings and their applications',
  domain: 'medicine',
  promptTemplate: `Create a CT windows comparison diagram:
- Window types: {{windowTypes}}
- Width settings: {{widthSettings}}
- Level settings: {{levelSettings}}
- Tissue optimization: {{tissueOptimization}}
- Clinical applications: {{applications}}
- Pathology visualization: {{pathologyVisualization}}
{{#additionalNotes}}Protocol tips: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'windowTypes',
    'widthSettings',
    'levelSettings',
    'tissueOptimization',
    'applications',
    'pathologyVisualization',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Windows["CT Window Settings"]
        A["Lung\\nW:1500 L:-600"]
        B["Soft Tissue\\nW:400 L:40"]
        C["Bone\\nW:2000 L:400"]
        D["Brain\\nW:80 L:40"]
        E["Stroke\\nW:8 L:32"]
        F["Liver\\nW:150 L:30"]
    end
    subgraph Optimized["Best For"]
        A --> A1["Parenchyma\\nNodules"]
        B --> B1["Organs\\nMasses"]
        C --> C1["Fractures\\nCalcification"]
        D --> D1["Gray/White\\nMatter"]
    end`,
};

/**
 * MRI Sequences Comparison template
 */
export const mriSequencesComparison: DiagramTemplate = {
  id: 'rad-mri-sequences',
  name: 'MRI Sequences Comparison',
  description: 'Comparison of MRI pulse sequences and tissue signal characteristics',
  domain: 'medicine',
  promptTemplate: `Create an MRI sequences comparison diagram:
- Sequence types: {{sequenceTypes}}
- Signal characteristics: {{signalCharacteristics}}
- Tissue appearances: {{tissueAppearances}}
- Clinical applications: {{applications}}
- Artifacts: {{artifacts}}
- Protocol optimization: {{protocolOptimization}}
{{#additionalNotes}}Advanced sequences: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'sequenceTypes',
    'signalCharacteristics',
    'tissueAppearances',
    'applications',
    'artifacts',
    'protocolOptimization',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Sequences["MRI Sequences"]
        T1["T1W"] --> T1a["Fat: Bright\\nFluid: Dark"]
        T2["T2W"] --> T2a["Fat: Bright\\nFluid: Bright"]
        FL["FLAIR"] --> FLa["Fluid: Dark\\nEdema: Bright"]
        DW["DWI"] --> DWa["Restricted diffusion:\\nBright"]
    end
    subgraph Applications["Clinical Use"]
        T1 --> U1["Anatomy\\nPost-contrast"]
        T2 --> U2["Pathology\\nEdema"]
        FL --> U3["MS plaques\\nSAH"]
        DW --> U4["Acute stroke\\nAbscess"]
    end
    style T1 fill:#8B4513
    style T2 fill:#4169E1
    style DW fill:#FFD700`,
};

// =============================================================================
// PROCEDURE ILLUSTRATIONS
// =============================================================================

/**
 * Image-Guided Biopsy template
 */
export const imageGuidedBiopsy: DiagramTemplate = {
  id: 'rad-guided-biopsy',
  name: 'Image-Guided Biopsy',
  description: 'Step-by-step image-guided percutaneous biopsy procedure',
  domain: 'medicine',
  promptTemplate: `Create an image-guided biopsy procedure flowchart:
- Target lesion: {{targetLesion}}
- Guidance modality: {{guidanceModality}}
- Patient positioning: {{positioning}}
- Access route: {{accessRoute}}
- Needle selection: {{needleSelection}}
- Sample handling: {{sampleHandling}}
- Post-procedure care: {{postProcedure}}
{{#additionalNotes}}Complications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'targetLesion',
    'guidanceModality',
    'positioning',
    'accessRoute',
    'needleSelection',
    'sampleHandling',
    'postProcedure',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Patient Prep\\n+ Consent"] --> B["Position Patient"]
    B --> C["Plan trajectory\\non imaging"]
    C --> D["Sterile prep\\n+ Local anesthesia"]
    D --> E["Advance needle\\nunder guidance"]
    E --> F{"At target?"}
    F -->|"No"| G["Adjust\\ntrajectory"]
    G --> E
    F -->|"Yes"| H["Obtain samples"]
    H --> I["Hemostasis check"]
    I --> J["Post-procedure\\nimaging"]
    J --> K["Recovery +\\nDischarge"]
    style A fill:#4169E1,color:#fff
    style H fill:#228B22,color:#fff`,
};

/**
 * Drainage Catheter Placement template
 */
export const drainageCatheterPlacement: DiagramTemplate = {
  id: 'rad-drainage-catheter',
  name: 'Drainage Catheter Placement',
  description: 'Image-guided percutaneous drainage catheter insertion technique',
  domain: 'medicine',
  promptTemplate: `Create a drainage catheter placement flowchart:
- Collection type: {{collectionType}}
- Guidance modality: {{guidanceModality}}
- Access route: {{accessRoute}}
- Catheter selection: {{catheterSelection}}
- Seldinger vs trocar: {{technique}}
- Securing method: {{securingMethod}}
- Output monitoring: {{outputMonitoring}}
{{#additionalNotes}}Management tips: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'collectionType',
    'guidanceModality',
    'accessRoute',
    'catheterSelection',
    'technique',
    'securingMethod',
    'outputMonitoring',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Identify Collection\\non Imaging"] --> B{"Size &\\nAccessibility?"}
    B -->|"<3cm deep"| C["Direct trocar"]
    B -->|"Complex"| D["Seldinger technique"]
    D --> E["Access with needle"]
    E --> F["Wire placement"]
    F --> G["Serial dilation"]
    G --> H["Catheter insertion"]
    C --> H
    H --> I["Confirm position"]
    I --> J["Secure catheter"]
    J --> K["Connect to\\ndrainage system"]
    style A fill:#FFA500,color:#000
    style K fill:#228B22,color:#fff`,
};

/**
 * Angiography Procedure template
 */
export const angiographyProcedure: DiagramTemplate = {
  id: 'rad-angiography-procedure',
  name: 'Angiography Procedure',
  description: 'Diagnostic and interventional angiography workflow',
  domain: 'medicine',
  promptTemplate: `Create an angiography procedure flowchart:
- Indication: {{indication}}
- Access site: {{accessSite}}
- Catheter/wire selection: {{catheterWire}}
- Vessel navigation: {{navigation}}
- Imaging runs: {{imagingRuns}}
- Intervention if needed: {{intervention}}
- Closure method: {{closureMethod}}
{{#additionalNotes}}Safety considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'indication',
    'accessSite',
    'catheterWire',
    'navigation',
    'imagingRuns',
    'intervention',
    'closureMethod',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Vascular Access\\n(Femoral/Radial)"] --> B["Sheath insertion"]
    B --> C["Wire/Catheter\\nadvancement"]
    C --> D["Navigate to\\ntarget vessel"]
    D --> E["DSA runs\\n+ roadmap"]
    E --> F{"Pathology\\nfound?"}
    F -->|"Stenosis"| G["Angioplasty\\n+/- Stent"]
    F -->|"Bleeding"| H["Embolization"]
    F -->|"Normal"| I["Diagnostic\\ncomplete"]
    G & H --> J["Final angiogram"]
    J --> K["Remove catheter"]
    K --> L["Closure device\\nor manual pressure"]
    style A fill:#4169E1,color:#fff
    style G fill:#DC143C,color:#fff`,
};

/**
 * Contrast Administration Protocol template
 */
export const contrastAdministration: DiagramTemplate = {
  id: 'rad-contrast-admin',
  name: 'Contrast Administration Protocol',
  description: 'IV contrast administration workflow for CT and MRI',
  domain: 'medicine',
  promptTemplate: `Create a contrast administration protocol flowchart:
- Contrast agent: {{contrastAgent}}
- Dose calculation: {{doseCalculation}}
- Injection rate: {{injectionRate}}
- Scan timing: {{scanTiming}}
- Bolus tracking: {{bolusTracking}}
- Renal considerations: {{renalConsiderations}}
- Adverse reaction management: {{adverseReactions}}
{{#additionalNotes}}Protocol variations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'contrastAgent',
    'doseCalculation',
    'injectionRate',
    'scanTiming',
    'bolusTracking',
    'renalConsiderations',
    'adverseReactions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Order Review"] --> B{"eGFR\\nCheck?"}
    B -->|"≥30"| C["Proceed"]
    B -->|"<30"| D["Nephrology\\nconsult"]
    C --> E["Calculate dose\\n(1.5-2 mL/kg)"]
    E --> F["Set injection\\nrate (3-5 mL/s)"]
    F --> G["Position\\nbolus trigger"]
    G --> H{"Scan\\nPhase?"}
    H -->|"Arterial"| I["15-25s delay"]
    H -->|"Portal"| J["60-70s delay"]
    H -->|"Delayed"| K["3-5 min delay"]
    I & J & K --> L["Acquire images"]
    style A fill:#4169E1,color:#fff
    style L fill:#228B22,color:#fff`,
};

// =============================================================================
// DATA VISUALIZATION TEMPLATES
// =============================================================================

/**
 * ACR Appropriateness Criteria template
 */
export const acrAppropriateness: DiagramTemplate = {
  id: 'rad-acr-appropriateness',
  name: 'ACR Appropriateness Criteria',
  description: 'Visual summary of ACR appropriateness ratings for imaging selection',
  domain: 'medicine',
  promptTemplate: `Create an ACR Appropriateness Criteria visualization:
- Clinical scenario: {{clinicalScenario}}
- Imaging options: {{imagingOptions}}
- Appropriateness ratings: {{ratings}}
- Usually appropriate: {{usuallyAppropriate}}
- May be appropriate: {{mayBeAppropriate}}
- Usually not appropriate: {{usuallyNotAppropriate}}
- RRL information: {{rrlInfo}}
{{#additionalNotes}}Variant considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'clinicalScenario',
    'imagingOptions',
    'ratings',
    'usuallyAppropriate',
    'mayBeAppropriate',
    'usuallyNotAppropriate',
    'rrlInfo',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Scenario["Acute Low Back Pain - No Red Flags"]
        direction TB
    end
    subgraph Green["Usually Appropriate (7-9)"]
        A["X-ray Lumbar\\n(if >6 weeks)\\nRating: 7"]
    end
    subgraph Yellow["May Be Appropriate (4-6)"]
        B["MRI Lumbar\\nw/o contrast\\nRating: 5"]
    end
    subgraph Red["Usually NOT Appropriate (1-3)"]
        C["CT Lumbar\\nRating: 2"]
        D["Nuclear Medicine\\nRating: 1"]
    end
    style Green fill:#228B22,color:#fff
    style Yellow fill:#FFD700,color:#000
    style Red fill:#DC143C,color:#fff`,
};

/**
 * Radiation Dose Comparison template
 */
export const radiationDoseComparison: DiagramTemplate = {
  id: 'rad-dose-comparison',
  name: 'Radiation Dose Comparison',
  description: 'Visual comparison of radiation doses across imaging modalities',
  domain: 'medicine',
  promptTemplate: `Create a radiation dose comparison chart:
- Exam types: {{examTypes}}
- Effective doses: {{effectiveDoses}}
- Background equivalent: {{backgroundEquivalent}}
- Risk perspective: {{riskPerspective}}
- Dose reduction strategies: {{doseReduction}}
- Patient counseling points: {{counselingPoints}}
{{#additionalNotes}}Regulatory references: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'examTypes',
    'effectiveDoses',
    'backgroundEquivalent',
    'riskPerspective',
    'doseReduction',
    'counselingPoints',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Doses["Effective Dose (mSv)"]
        A["CXR\\n0.02"] --> B["Mammo\\n0.4"]
        B --> C["CT Head\\n2"]
        C --> D["CT Abdomen\\n10"]
        D --> E["CT Chest\\nAbd Pelvis\\n20"]
    end
    subgraph Background["Background Equivalent"]
        A1["2-3 days"]
        B1["7 weeks"]
        C1["8 months"]
        D1["3 years"]
        E1["6 years"]
    end
    A --- A1
    B --- B1
    C --- C1
    D --- D1
    E --- E1
    style A fill:#228B22
    style C fill:#FFD700
    style E fill:#DC143C`,
};

/**
 * Imaging Report Template template
 */
export const imagingReportTemplate: DiagramTemplate = {
  id: 'rad-report-template',
  name: 'Imaging Report Template',
  description: 'Structured radiology report format and components',
  domain: 'medicine',
  promptTemplate: `Create an imaging report structure template:
- Exam type: {{examType}}
- Clinical history: {{clinicalHistory}}
- Technique section: {{technique}}
- Comparison studies: {{comparison}}
- Findings organization: {{findingsOrganization}}
- Impression format: {{impressionFormat}}
- Recommendations: {{recommendations}}
{{#additionalNotes}}Reporting standards: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'examType',
    'clinicalHistory',
    'technique',
    'comparison',
    'findingsOrganization',
    'impressionFormat',
    'recommendations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Report["Structured Radiology Report"]
        A["EXAM: CT Chest with Contrast"]
        B["HISTORY: R/O PE"]
        C["TECHNIQUE: 64-slice MDCT,\\n100mL Omnipaque 350"]
        D["COMPARISON: CXR 1/1/24"]
        subgraph Findings["FINDINGS"]
            E["Pulmonary Arteries: Patent"]
            F["Lungs: Clear"]
            G["Heart: Normal size"]
            H["Incidental: 4mm adrenal nodule"]
        end
        subgraph Impression["IMPRESSION"]
            I["1. No PE"]
            J["2. Incidental adrenal nodule -\\nbenign by density"]
        end
    end
    A --> B --> C --> D --> Findings --> Impression`,
};

// =============================================================================
// ADDITIONAL CLINICAL TEMPLATES
// =============================================================================

/**
 * Liver Lesion Characterization template
 */
export const liverLesionCharacterization: DiagramTemplate = {
  id: 'rad-liver-lesion',
  name: 'Liver Lesion Characterization',
  description: 'LI-RADS based liver lesion characterization algorithm',
  domain: 'medicine',
  promptTemplate: `Create a liver lesion characterization flowchart:
- Lesion size: {{lesionSize}}
- Enhancement pattern: {{enhancementPattern}}
- Washout characteristics: {{washout}}
- Capsule appearance: {{capsule}}
- Threshold growth: {{thresholdGrowth}}
- LI-RADS category: {{liradsCategory}}
- Management recommendation: {{management}}
{{#additionalNotes}}Additional features: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'lesionSize',
    'enhancementPattern',
    'washout',
    'capsule',
    'thresholdGrowth',
    'liradsCategory',
    'management',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Liver Observation\\nin At-Risk Patient")] --> B{"Arterial Phase\\nHyperenhancement?"}
    B -->|"Yes"| C{"Size?"}
    B -->|"No"| D["LR-3 or LR-4\\n(Intermediate)"]
    C -->|"<10mm"| E["LR-3\\nIntermediate"]
    C -->|"10-19mm"| F{"Washout OR\\nCapsule?"}
    C -->|"≥20mm"| G{"Washout AND\\nCapsule?"}
    F -->|"Neither"| H["LR-4\\nProbably HCC"]
    F -->|"One"| I["LR-5\\nDefinite HCC"]
    G -->|"Neither"| H
    G -->|"One or Both"| I
    style I fill:#DC143C,color:#fff
    style H fill:#FFA500,color:#000
    style E fill:#FFD700,color:#000`,
};

/**
 * Breast Imaging Assessment template
 */
export const breastImagingAssessment: DiagramTemplate = {
  id: 'rad-breast-birads',
  name: 'Breast Imaging Assessment (BI-RADS)',
  description: 'ACR BI-RADS assessment and management algorithm',
  domain: 'medicine',
  promptTemplate: `Create a breast imaging assessment flowchart:
- Finding type: {{findingType}}
- Mass characteristics: {{massCharacteristics}}
- Calcification morphology: {{calcifications}}
- Associated features: {{associatedFeatures}}
- BI-RADS category: {{biradsCategory}}
- Management: {{management}}
- Follow-up interval: {{followUp}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'findingType',
    'massCharacteristics',
    'calcifications',
    'associatedFeatures',
    'biradsCategory',
    'management',
    'followUp',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Mammographic\\nFinding")] --> B{"Finding Type?"}
    B -->|"Mass"| C{"Shape &\\nMargins?"}
    B -->|"Calcifications"| D{"Morphology?"}
    B -->|"Asymmetry"| E{"Focal or\\nGlobal?"}
    C -->|"Oval, Circumscribed"| F["BI-RADS 2-3"]
    C -->|"Irregular, Spiculated"| G["BI-RADS 4-5"]
    D -->|"Punctate, Round"| H["BI-RADS 2"]
    D -->|"Amorphous"| I["BI-RADS 4A"]
    D -->|"Fine Linear"| J["BI-RADS 4C-5"]
    E -->|"Global"| K["BI-RADS 2"]
    E -->|"Focal/Developing"| L["BI-RADS 3-4"]
    F --> M["Routine F/U\\nor Short-term"]
    G --> N["Biopsy\\nRecommended"]
    style N fill:#DC143C,color:#fff
    style F fill:#228B22,color:#fff`,
};

/**
 * Renal Mass Evaluation template
 */
export const renalMassEvaluation: DiagramTemplate = {
  id: 'rad-renal-mass',
  name: 'Renal Mass Evaluation (Bosniak)',
  description: 'Bosniak classification for cystic renal masses',
  domain: 'medicine',
  promptTemplate: `Create a renal mass evaluation flowchart:
- Mass type: {{massType}}
- Wall characteristics: {{wallCharacteristics}}
- Septations: {{septations}}
- Enhancement: {{enhancement}}
- Bosniak category: {{bosniakCategory}}
- Malignancy risk: {{malignancyRisk}}
- Management: {{management}}
{{#additionalNotes}}Size and location: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'massType',
    'wallCharacteristics',
    'septations',
    'enhancement',
    'bosniakCategory',
    'malignancyRisk',
    'management',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Renal Cystic\\nMass")] --> B{"Simple Cyst\\nCriteria?"}
    B -->|"Yes\\nWater density\\nNo enhancement"| C["Bosniak I\\n0% malignancy"]
    C --> D["No Follow-up"]
    B -->|"No"| E{"Septa or\\nCalcification?"}
    E -->|"Thin septa\\nFine calcification"| F["Bosniak II\\n0% malignancy"]
    F --> D
    E -->|"Minimal complexity"| G["Bosniak IIF\\n5% malignancy"]
    G --> H["6-month F/U CT"]
    E -->|"Thick septa\\nIrregular wall"| I["Bosniak III\\n50% malignancy"]
    I --> J["Surgery or\\nActive Surveillance"]
    E -->|"Enhancing\\nSoft tissue"| K["Bosniak IV\\n90% malignancy"]
    K --> L["Surgical Resection"]
    style D fill:#228B22,color:#fff
    style L fill:#DC143C,color:#fff`,
};

/**
 * Thyroid Nodule Evaluation template
 */
export const thyroidNoduleEvaluation: DiagramTemplate = {
  id: 'rad-thyroid-tirads',
  name: 'Thyroid Nodule Evaluation (TI-RADS)',
  description: 'ACR TI-RADS thyroid nodule assessment algorithm',
  domain: 'medicine',
  promptTemplate: `Create a thyroid nodule evaluation flowchart:
- Composition: {{composition}}
- Echogenicity: {{echogenicity}}
- Shape: {{shape}}
- Margins: {{margins}}
- Echogenic foci: {{echogenicFoci}}
- TI-RADS score: {{tiradsScore}}
- FNA threshold: {{fnaThreshold}}
{{#additionalNotes}}Nodule size: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'composition',
    'echogenicity',
    'shape',
    'margins',
    'echogenicFoci',
    'tiradsScore',
    'fnaThreshold',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Thyroid\\nNodule")] --> B["Calculate\\nTI-RADS Score"]
    B --> C{"Total\\nPoints?"}
    C -->|"0 points"| D["TR1 Benign\\nNo FNA"]
    C -->|"2 points"| E["TR2 Not Suspicious\\nNo FNA"]
    C -->|"3 points"| F["TR3 Mildly Suspicious\\nFNA if ≥2.5cm"]
    C -->|"4-6 points"| G["TR4 Moderately Suspicious\\nFNA if ≥1.5cm"]
    C -->|"≥7 points"| H["TR5 Highly Suspicious\\nFNA if ≥1cm"]
    subgraph Points["Scoring System"]
        P1["Composition: 0-2 pts"]
        P2["Echogenicity: 0-3 pts"]
        P3["Shape: 0-3 pts"]
        P4["Margin: 0-3 pts"]
        P5["Echogenic foci: 0-3 pts"]
    end
    style D fill:#228B22,color:#fff
    style H fill:#DC143C,color:#fff`,
};

/**
 * Prostate MRI Evaluation template
 */
export const prostateMriEvaluation: DiagramTemplate = {
  id: 'rad-prostate-pirads',
  name: 'Prostate MRI Evaluation (PI-RADS)',
  description: 'PI-RADS v2.1 prostate lesion assessment algorithm',
  domain: 'medicine',
  promptTemplate: `Create a prostate MRI evaluation flowchart:
- Lesion location: {{lesionLocation}}
- T2W signal: {{t2Signal}}
- DWI/ADC findings: {{dwiFindings}}
- DCE enhancement: {{dceEnhancement}}
- PI-RADS category: {{piradsCategory}}
- Biopsy recommendation: {{biopsyRecommendation}}
{{#additionalNotes}}PSA and clinical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'lesionLocation',
    't2Signal',
    'dwiFindings',
    'dceEnhancement',
    'piradsCategory',
    'biopsyRecommendation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Prostate MRI\\nLesion")] --> B{"Lesion\\nLocation?"}
    B -->|"Peripheral Zone"| C["DWI is\\nDominant"]
    B -->|"Transition Zone"| D["T2W is\\nDominant"]
    C --> E{"DWI Score?"}
    E -->|"1-2"| F["PI-RADS 1-2"]
    E -->|"3"| G{"DCE+?"}
    E -->|"4-5"| H["PI-RADS 4-5"]
    G -->|"No"| I["PI-RADS 3"]
    G -->|"Yes"| J["PI-RADS 4"]
    D --> K{"T2 Score?"}
    K -->|"1-2"| F
    K -->|"3"| L{"DWI Score?"}
    K -->|"4-5"| H
    L -->|"≤4"| I
    L -->|"5"| J
    style F fill:#228B22,color:#fff
    style H fill:#DC143C,color:#fff`,
};

/**
 * Abdominal Aortic Aneurysm Surveillance template
 */
export const aaaaSurveillance: DiagramTemplate = {
  id: 'rad-aaa-surveillance',
  name: 'AAA Surveillance Protocol',
  description: 'Abdominal aortic aneurysm surveillance and intervention guidelines',
  domain: 'medicine',
  promptTemplate: `Create an AAA surveillance flowchart:
- Aortic diameter: {{aorticDiameter}}
- Growth rate: {{growthRate}}
- Patient symptoms: {{symptoms}}
- Surgical risk: {{surgicalRisk}}
- Surveillance interval: {{surveillanceInterval}}
- Intervention threshold: {{interventionThreshold}}
{{#additionalNotes}}Patient factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'aorticDiameter',
    'growthRate',
    'symptoms',
    'surgicalRisk',
    'surveillanceInterval',
    'interventionThreshold',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Abdominal Aortic\\nAneurysm")] --> B{"Symptomatic?"}
    B -->|"Yes\\n(Pain, rupture)"| C["EMERGENT\\nRepair"]
    B -->|"No"| D{"Diameter?"}
    D -->|"<3.0 cm"| E["No surveillance\\nneeded"]
    D -->|"3.0-3.9 cm"| F["Surveillance\\nq3 years"]
    D -->|"4.0-4.9 cm"| G["Surveillance\\nq12 months"]
    D -->|"5.0-5.4 cm"| H["Surveillance\\nq6 months"]
    D -->|"≥5.5 cm (M)\\n≥5.0 cm (F)"| I["Elective\\nRepair"]
    H --> J{"Growth\\n>1cm/year?"}
    J -->|"Yes"| I
    J -->|"No"| H
    I --> K{"EVAR\\nCandidate?"}
    K -->|"Yes"| L["Endovascular\\nRepair"]
    K -->|"No"| M["Open Surgical\\nRepair"]
    style C fill:#DC143C,color:#fff
    style I fill:#FFA500,color:#000`,
};

/**
 * Pediatric Imaging Selection template
 */
export const pediatricImagingSelection: DiagramTemplate = {
  id: 'rad-pediatric-imaging',
  name: 'Pediatric Imaging Selection',
  description: 'Age-appropriate imaging modality selection for pediatric patients',
  domain: 'medicine',
  promptTemplate: `Create a pediatric imaging selection flowchart:
- Clinical indication: {{clinicalIndication}}
- Patient age: {{patientAge}}
- Radiation considerations: {{radiationConsiderations}}
- Sedation requirements: {{sedationRequirements}}
- Preferred modality: {{preferredModality}}
- Alternative options: {{alternativeOptions}}
{{#additionalNotes}}ALARA principles: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'clinicalIndication',
    'patientAge',
    'radiationConsiderations',
    'sedationRequirements',
    'preferredModality',
    'alternativeOptions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Pediatric\\nImaging Need")] --> B{"Clinical\\nQuestion?"}
    B -->|"Appendicitis"| C["US First-line"]
    C --> D{"Equivocal?"}
    D -->|"Yes"| E["MRI or\\nLow-dose CT"]
    D -->|"No"| F["Diagnosis\\nMade"]
    B -->|"Intussusception"| G["US Diagnostic\\n+ Therapeutic"]
    B -->|"Pyloric Stenosis"| H["US Preferred"]
    B -->|"Head Trauma"| I{"Age?"}
    I -->|"<2 years"| J["Apply PECARN\\nCT if indicated"]
    I -->|"≥2 years"| K["Clinical criteria\\nfor CT"]
    B -->|"Musculoskeletal"| L["X-ray First\\nMRI if needed"]
    subgraph ALARA["ALARA Principles"]
        A1["Size-based protocols"]
        A2["Limit radiation dose"]
        A3["Consider US/MRI first"]
    end
    style C fill:#228B22,color:#fff
    style E fill:#9370DB,color:#fff`,
};

/**
 * Trauma Imaging Protocol template
 */
export const traumaImagingProtocol: DiagramTemplate = {
  id: 'rad-trauma-imaging',
  name: 'Trauma Imaging Protocol',
  description: 'ATLS-based trauma imaging algorithm',
  domain: 'medicine',
  promptTemplate: `Create a trauma imaging protocol flowchart:
- Mechanism of injury: {{mechanism}}
- Primary survey findings: {{primarySurvey}}
- Hemodynamic status: {{hemodynamicStatus}}
- Initial imaging: {{initialImaging}}
- Secondary imaging: {{secondaryImaging}}
- CT indications: {{ctIndications}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'mechanism',
    'primarySurvey',
    'hemodynamicStatus',
    'initialImaging',
    'secondaryImaging',
    'ctIndications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Trauma\\nPatient")] --> B["Primary Survey\\nABCDE"]
    B --> C{"Hemodynamically\\nStable?"}
    C -->|"No"| D["Resuscitation\\neFAST"]
    D --> E{"eFAST\\nPositive?"}
    E -->|"Yes"| F["OR for\\nExploratory Lap"]
    E -->|"No"| G["Continue\\nResuscitation"]
    C -->|"Yes"| H["Pan-Scan CT"]
    H --> I["CT Head"]
    H --> J["CT C-Spine"]
    H --> K["CT Chest/Abd/Pelvis"]
    subgraph Secondary["Secondary Survey Imaging"]
        L["Extremity X-rays"]
        M["Focused CT cuts"]
        N["CTA if vascular injury"]
    end
    I & J & K --> Secondary
    style D fill:#DC143C,color:#fff
    style H fill:#4169E1,color:#fff`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All radiology templates
 */
export const radiologyTemplates: DiagramTemplate[] = [
  // Decision Trees (7)
  imagingSelectionAlgorithm,
  pulmonaryNoduleManagement,
  incidentalFindings,
  contrastAllergyProtocol,
  mriSafetyScreening,
  radiationDoseOptimization,
  strokeImagingProtocol,
  // Anatomical Diagrams (4)
  crossSectionalAnatomy,
  radiographicAnatomyChest,
  ctWindowsComparison,
  mriSequencesComparison,
  // Procedure Illustrations (4)
  imageGuidedBiopsy,
  drainageCatheterPlacement,
  angiographyProcedure,
  contrastAdministration,
  // Data Visualization (3)
  acrAppropriateness,
  radiationDoseComparison,
  imagingReportTemplate,
  // Additional Clinical Templates (8)
  liverLesionCharacterization,
  breastImagingAssessment,
  renalMassEvaluation,
  thyroidNoduleEvaluation,
  prostateMriEvaluation,
  aaaaSurveillance,
  pediatricImagingSelection,
  traumaImagingProtocol,
];

export default radiologyTemplates;
