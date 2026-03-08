/**
 * gastroenterology-prompts.ts
 * Gastroenterology-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for gastrointestinal medicine including:
 * - GI tract anatomy and physiology
 * - Upper and lower GI pathology
 * - Hepatobiliary and pancreatic diseases
 * - Endoscopic procedures
 * - Functional GI disorders
 *
 * Total: 15 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// GASTROENTEROLOGY DOMAIN PROMPT
// =============================================================================

/**
 * Base gastroenterology domain prompt for GI medicine diagrams
 */
export const GASTROENTEROLOGY_DOMAIN_PROMPT = `
Gastroenterology diagram requirements:
- Use standard GI terminology (EGD, colonoscopy, ERCP, MRCP)
- Follow ACG/AGA guidelines for disease management
- Include Child-Pugh and MELD scores for liver disease
- Reference Rome IV criteria for functional GI disorders
- Use appropriate endoscopic findings nomenclature (Paris, Vienna, Forrest)
- Include SAAG calculation for ascites evaluation
- Follow Fleischner Society guidelines for incidental liver lesions
- Use color coding: Pink/Red for inflammation, Yellow for biliary, Brown for stool
- Include proper hepatobiliary anatomy annotations
- Reference ASGE guidelines for endoscopic procedures`;

// =============================================================================
// GASTROENTEROLOGY-SPECIFIC PROMPTS
// =============================================================================

export const GASTROENTEROLOGY_PROMPTS = {
  // Clinical Decision Support
  giBleedingEvaluation: `
GI Bleeding Evaluation Algorithm requirements:
- Distinguish upper vs lower GI bleeding (hematemesis, melena, hematochezia)
- Include hemodynamic stability assessment
- Reference Glasgow-Blatchford and Rockall scores
- Show timing for endoscopy (emergent, urgent, elective)
- Include resuscitation and transfusion thresholds
- Show intervention options (endoscopic, IR, surgical)
- Include PPI dosing and H. pylori testing pathway`,

  dyspepsiaManagement: `
Dyspepsia Management requirements:
- Distinguish functional dyspepsia from organic causes
- Include alarm features requiring investigation
- Reference H. pylori test-and-treat strategy
- Show PPI trial duration and assessment
- Include endoscopy indications by age and risk
- Reference Rome IV criteria for functional dyspepsia
- Show prokinetic and neuromodulator options`,

  ibdTreatment: `
IBD Treatment Algorithm requirements:
- Differentiate Crohn's disease from ulcerative colitis
- Include disease location and severity assessment
- Show step-up vs top-down therapy approaches
- Reference biologic selection (anti-TNF, vedolizumab, ustekinumab)
- Include monitoring with fecal calprotectin and colonoscopy
- Show surgical indications for both CD and UC
- Include extraintestinal manifestation management`,

  cirrhosisManagement: `
Cirrhosis Management requirements:
- Include Child-Pugh classification (A, B, C)
- Reference MELD/MELD-Na calculation for transplant
- Show variceal screening and prophylaxis protocol
- Include ascites management (diuretics, paracentesis, TIPS)
- Reference HCC surveillance with US every 6 months
- Show hepatic encephalopathy grading and treatment
- Include SBP prophylaxis indications`,

  // Diagnostic Interpretation
  lftInterpretation: `
LFT Interpretation requirements:
- Distinguish hepatocellular vs cholestatic patterns
- Include R-ratio calculation (ALT/ALP)
- Show degree of elevation significance (mild, moderate, severe)
- Reference viral, autoimmune, and metabolic workup
- Include imaging recommendations (US, CT, MRCP)
- Show biopsy indications
- Reference drug-induced liver injury assessment`,

  ascitesWorkup: `
Ascites Workup requirements:
- Include SAAG calculation and interpretation
- Distinguish portal hypertensive vs non-portal causes
- Reference paracentesis technique and cell count interpretation
- Show PMN count threshold for SBP (>250/mm3)
- Include protein level interpretation
- Reference additional studies (cytology, culture, amylase)
- Show albumin replacement guidelines for large volume paracentesis`,

  colonoscopyFindings: `
Colonoscopy Findings Interpretation requirements:
- Use Paris classification for polyp morphology
- Include Boston Bowel Prep Scale scoring
- Reference polyp histology and surveillance intervals
- Show adenoma detection rate quality metrics
- Include IBD activity scoring (Mayo, SES-CD)
- Reference post-polypectomy bleeding risk
- Show incomplete colonoscopy follow-up pathway`,

  // Procedures
  egdProcedure: `
EGD Procedure requirements:
- Include pre-procedure checklist (NPO, anticoagulation)
- Show systematic examination sequence (esophagus, stomach, duodenum)
- Reference biopsy protocols (Seattle for Barrett's)
- Include LA classification for esophagitis
- Show therapeutic intervention options (hemostasis, dilation)
- Reference post-procedure monitoring
- Include sedation and reversal protocols`,

  colonoscopyProcedure: `
Colonoscopy Procedure requirements:
- Include split-dose bowel preparation protocols
- Show cecal intubation landmarks (appendiceal orifice, ileocecal valve)
- Reference polypectomy techniques by polyp size
- Include withdrawal time targets (minimum 6 minutes)
- Show complication recognition and management
- Reference anticoagulation management perioperatively
- Include adenoma surveillance intervals`,

  ercpProcedure: `
ERCP Procedure requirements:
- Include indication-specific cannulation approach
- Show papillotomy vs papillary dilation decision
- Reference stone extraction techniques
- Include stent selection criteria
- Show post-ERCP pancreatitis prevention (rectal NSAIDs, PD stent)
- Reference cholangitis severity grading
- Include biliary brushings and biopsy indications`,

  // Disease-Specific Pathways
  gerdManagement: `
GERD Management requirements:
- Include alarm features requiring investigation
- Show PPI step-down and on-demand therapy
- Reference surgical/endoscopic options (Nissen, TIF, LINX)
- Include Barrett's esophagus surveillance
- Show extraesophageal manifestations
- Reference 24-hour pH/impedance testing indications
- Include breakthrough symptoms management`,

  pepticUlcerDisease: `
Peptic Ulcer Disease requirements:
- Include H. pylori testing and treatment regimens
- Reference Forrest classification for bleeding ulcers
- Show NSAID and aspirin management strategies
- Include refractory ulcer workup (Zollinger-Ellison)
- Reference endoscopic hemostasis techniques
- Show acid suppression duration by indication
- Include eradication confirmation testing`,

  acutePancreatitis: `
Acute Pancreatitis requirements:
- Include diagnostic criteria (2 of 3: pain, lipase, imaging)
- Reference severity scoring (BISAP, Ranson, APACHE II)
- Show fluid resuscitation goals
- Include nutrition pathway (early oral vs enteral)
- Reference imaging timing (CT at 72 hours if severe)
- Show cholecystectomy timing for gallstone pancreatitis
- Include necrotizing pancreatitis intervention criteria`,

  celiacDisease: `
Celiac Disease Workup requirements:
- Include serologic testing algorithm (IgA-TTG, total IgA)
- Reference IgA deficiency alternative testing
- Show duodenal biopsy protocol (bulb and D2)
- Include Marsh classification interpretation
- Reference HLA-DQ2/DQ8 testing role
- Show gluten-free diet initiation and monitoring
- Include refractory celiac evaluation`,

  hepatitisManagement: `
Viral Hepatitis Management requirements:
- Differentiate acute vs chronic hepatitis B and C
- Include HBV serology interpretation panel
- Reference HBV treatment indications (DNA, ALT, fibrosis)
- Show HCV DAA regimen selection by genotype
- Include fibrosis staging (FibroScan, FIB-4)
- Reference HCC surveillance indications
- Show vaccination recommendations for contacts`,

  // Additional prompts for COMPLETE status
  advancedIbdManagement: `
Advanced IBD Management requirements:
- Include treat-to-target approach with objective endpoints
- Reference biologic selection algorithm (anti-TNF, IL-12/23, integrin)
- Show therapeutic drug monitoring (TDM) interpretation
- Include loss of response management
- Reference combination therapy indications
- Show perianal Crohn's multidisciplinary approach
- Include postoperative prophylaxis strategies
- Reference extraintestinal manifestation treatment`,

  cirrhosisComplications: `
Cirrhosis Complications Management requirements:
- Include AASLD guidelines for ascites management
- Reference SBP prophylaxis indications (primary and secondary)
- Show hepatorenal syndrome type 1 vs type 2 management
- Include TIPS indications and contraindications
- Reference variceal hemorrhage acute management
- Show hepatopulmonary syndrome screening
- Include portopulmonary hypertension evaluation
- Reference transplant listing criteria by complication`,

  giBleedingInterventions: `
GI Bleeding Interventional Management requirements:
- Include endoscopic hemostasis technique selection
- Reference Forrest classification and rebleeding risk
- Show angiographic intervention indications
- Include hemostatic powder and clip application
- Reference argon plasma coagulation technique
- Show radiofrequency ablation for GAVE
- Include surgical consultation triggers
- Reference anticoagulation resumption timing`,

  pancreaticDiseaseVisualization: `
Pancreatic Disease Visualization requirements:
- Include pancreatic anatomy with ductal system
- Reference Atlanta classification for acute pancreatitis
- Show pancreatic cyst differential (IPMN, MCN, SCN)
- Include EUS-FNA indication algorithm
- Reference chronic pancreatitis Cambridge classification
- Show pancreatic enzyme replacement dosing
- Include autoimmune pancreatitis type 1 vs 2
- Reference pancreatic cancer staging and resectability`,

  colorectalCancerScreening: `
Colorectal Cancer Screening requirements:
- Include USPSTF age recommendations (45-75)
- Reference colonoscopy quality metrics (ADR, CIR)
- Show polyp surveillance intervals (USMSTF 2020)
- Include high-risk screening (Lynch, FAP, IBD)
- Reference FIT vs colonoscopy screening strategies
- Show sessile serrated polyp management
- Include piecemeal polypectomy follow-up
- Reference hereditary cancer syndrome referral criteria`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Gastroenterology-specific few-shot examples
 */
export const GASTROENTEROLOGY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a flowchart for upper GI bleeding evaluation in the emergency department',
    output: `flowchart TD
    A[("Upper GI Bleeding")] --> B{"Hemodynamically\\nStable?"}
    B -->|No| C["Resuscitate:\\nIV access x2, Fluids"]
    B -->|Yes| D["Risk Stratify"]
    C --> E["Type & Cross\\nLabs, INR"]

    D --> F["Glasgow-Blatchford\\nScore"]
    F -->|"Score 0-1"| G["Consider Outpatient\\nEGD <24h"]
    F -->|"Score >=2"| H["Admit\\nEGD <24h"]
    F -->|"High Risk"| I["ICU\\nEGD <12h"]

    I --> J["IV PPI 80mg bolus\\n+ 8mg/hr infusion"]
    H --> J

    J --> K{"Active Bleeding\\non EGD?"}
    K -->|Yes| L["Endoscopic Therapy:\\nEpinephrine + Clips/Thermal"]
    K -->|No| M["Stigmata Assessment"]

    M -->|"High Risk\\nForrest Ia-IIb"| L
    M -->|"Low Risk\\nForrest IIc-III"| N["Oral PPI\\nEarly Discharge"]

    style C fill:#DC143C,color:#fff
    style L fill:#FFA500,color:#000
    style N fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create an abnormal liver function test evaluation algorithm',
    output: `flowchart TD
    A["Abnormal LFTs"] --> B{"Pattern?"}
    B -->|"ALT/AST > ALP"| C["Hepatocellular"]
    B -->|"ALP > ALT/AST"| D["Cholestatic"]
    B -->|"Both Elevated"| E["Mixed"]

    C --> F{"Degree of\\nElevation?"}
    F -->|">1000 U/L"| G["Acute:\\nViral, Ischemic, Drug"]
    F -->|"<1000 U/L"| H["Chronic Workup"]

    H --> I["Viral: HBsAg, HCV Ab"]
    H --> J["Metabolic: Ferritin, Ceruloplasmin"]
    H --> K["Autoimmune: ANA, ASMA, IgG"]
    H --> L["NAFLD: BMI, Lipids, A1c"]

    D --> M["RUQ Ultrasound"]
    M -->|"Dilated Ducts"| N["MRCP/ERCP"]
    M -->|"Normal Ducts"| O["Check AMA\\nDrug Review"]

    O -->|"AMA+"| P["PBC - Refer Hepatology"]
    O -->|"AMA-"| Q["Consider Biopsy"]

    G --> R["Check Tylenol Level\\nViral Serologies\\nPossible NAC"]

    style G fill:#DC143C,color:#fff
    style P fill:#4169E1,color:#fff
    style R fill:#FFA500,color:#000`,
  },
  {
    prompt: 'Create a cirrhosis complication management flowchart',
    output: `flowchart TD
    A[("Cirrhosis\\nDiagnosed")] --> B["Calculate Child-Pugh\\n& MELD Score"]

    B --> C["Screen for\\nComplications"]

    C --> D["Varices"]
    C --> E["Ascites"]
    C --> F["HCC"]
    C --> G["HE"]

    D --> D1["EGD Screening"]
    D1 -->|"No Varices"| D2["Repeat EGD:\\n2yr (compensated)\\n1yr (decompensated)"]
    D1 -->|"Small Varices"| D3["NSBB if red signs\\nor Child C"]
    D1 -->|"Large Varices"| D4["NSBB or\\nBand Ligation"]

    E --> E1{"New Onset\\nAscites?"}
    E1 -->|Yes| E2["Diagnostic\\nParacentesis"]
    E2 --> E3["Calculate SAAG"]
    E3 -->|">1.1"| E4["Portal HTN:\\nSodium restrict\\nDiuretics"]
    E4 -->|"Refractory"| E5["TIPS Evaluation"]

    F --> F1["US + AFP\\nEvery 6 months"]

    G --> G1["Lactulose +\\nRifaximin if recurrent"]

    B -->|"MELD >= 15"| H["Transplant\\nReferral"]

    style H fill:#4169E1,color:#fff
    style E5 fill:#FFA500,color:#000
    style D4 fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create an inflammatory bowel disease treatment algorithm',
    output: `flowchart TD
    A[("IBD Confirmed")] --> B{"Crohn's or\\nUlcerative Colitis?"}

    B -->|"Ulcerative Colitis"| C{"Disease\\nExtent?"}
    B -->|"Crohn's Disease"| D{"Location &\\nBehavior?"}

    C -->|"Proctitis"| C1["Topical 5-ASA\\n(suppository)"]
    C -->|"Left-sided"| C2["Oral + Topical\\n5-ASA"]
    C -->|"Extensive"| C3["Oral 5-ASA\\n+/- Steroids"]

    C3 -->|"Moderate-Severe"| C4["Anti-TNF or\\nVedolizumab"]

    D -->|"Ileal/Ileocolonic"| D1{"Inflammatory\\nor Stricturing?"}
    D1 -->|"Inflammatory"| D2["Steroids or\\nBiologic"]
    D1 -->|"Stricturing"| D3["Balloon Dilation\\nor Surgery"]

    D -->|"Colonic"| D4["5-ASA if mild\\nBiologic if mod-severe"]
    D -->|"Perianal"| D5["Anti-TNF\\n+ Seton/Antibiotics"]

    D2 --> E["Maintenance"]
    C4 --> E

    E --> F{"Steroid-Free\\nRemission?"}
    F -->|No| G["Optimize/Switch\\nBiologic"]
    F -->|Yes| H["Continue Current\\nMonitor q6-12mo"]

    style C4 fill:#4169E1,color:#fff
    style D5 fill:#FFA500,color:#000
    style H fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a colorectal cancer screening and polyp surveillance flowchart',
    output: `flowchart TD
    A["Average Risk\\nAge >= 45"] --> B["Screening\\nColonoscopy"]

    B --> C{"Findings?"}
    C -->|"Normal"| D["Repeat in\\n10 years"]
    C -->|"Hyperplastic <10mm\\nin sigmoid/rectum"| D

    C -->|"1-2 Tubular Adenomas\\n<10mm"| E["Repeat in\\n7-10 years"]

    C -->|"3-4 Adenomas\\nor any >=10mm\\nor Villous/HGD"| F["Repeat in\\n3 years"]

    C -->|">=10 Adenomas"| G["Repeat in\\n1 year\\nConsider Genetics"]

    C -->|"SSP >= 10mm\\nor with dysplasia"| H["Repeat in\\n3 years"]

    C -->|"Piecemeal EMR\\nof large polyp"| I["Repeat at site\\n6 months"]

    C -->|"CRC Found"| J["Staging\\nSurgery Referral"]

    subgraph HighRisk["High Risk Screening"]
        K["Family Hx CRC\\n1st degree <60"]
        K --> L["Start age 40\\nor 10yr before dx"]
        L --> M["Repeat q5 years"]

        N["Lynch Syndrome"]
        N --> O["Start age 20-25\\nRepeat q1-2 years"]
    end

    style D fill:#228B22,color:#fff
    style F fill:#FFA500,color:#000
    style J fill:#DC143C,color:#fff`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

const gastroenterologyPrompts = {
  GASTROENTEROLOGY_DOMAIN_PROMPT,
  GASTROENTEROLOGY_PROMPTS,
  GASTROENTEROLOGY_FEW_SHOT_EXAMPLES,
};

export default gastroenterologyPrompts;
