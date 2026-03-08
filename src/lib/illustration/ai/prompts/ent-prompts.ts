/**
 * ent-prompts.ts
 * ENT (Otolaryngology)-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for ear, nose, and throat medicine including:
 * - Hearing evaluation and audiogram interpretation
 * - Vertigo and vestibular disorder workup
 * - Sinusitis and rhinitis management
 * - Head and neck cancer staging
 * - Airway management and sleep apnea
 * - ENT surgical procedures
 * - Diagnostic laryngoscopy and endoscopy
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// ENT DOMAIN PROMPT
// =============================================================================

/**
 * Base ENT domain prompt for otolaryngology diagrams
 */
export const ENT_DOMAIN_PROMPT = `
ENT (Otolaryngology) diagram requirements:
- Use standard otologic terminology (TM, EAC, OME, SNHL, CHL)
- Follow AAO-HNS guidelines for clinical pathways
- Include proper audiogram notation (O for right air, X for left air)
- Use Weber/Rinne test interpretation standards
- Reference House-Brackmann scale for facial nerve grading
- Include TNM staging for head and neck malignancies
- Follow GOLD standards for sleep apnea (AHI classification)
- Use appropriate sinus CT terminology (OMC, ostiomeatal complex)
- Color coding: Pink for mucosa, Blue for fluid, Purple for masses
- Include Paradise criteria for tonsillectomy indications`;

// =============================================================================
// ENT-SPECIFIC PROMPTS
// =============================================================================

export const ENT_PROMPTS = {
  // Hearing and Ear Disorders
  hearingLossEvaluation: `
Hearing Loss Evaluation Algorithm requirements:
- Differentiate conductive vs sensorineural hearing loss
- Include Weber and Rinne test interpretation
- Show audiogram pattern recognition
- Reference asymmetric SNHL red flags (>15 dB difference)
- Include MRI IAC indications for acoustic neuroma
- Show hearing aid vs cochlear implant candidacy
- Include sudden SNHL emergency workup`,

  otitisMediaManagement: `
Otitis Media Management requirements:
- Differentiate AOM vs OME vs CSOM
- Follow AAP/AAFP acute otitis media guidelines
- Include antibiotic selection (amoxicillin first-line)
- Show watchful waiting criteria
- Reference tympanostomy tube indications
- Include complication recognition (mastoiditis, cholesteatoma)
- Show recurrent otitis media prevention strategies`,

  audiogramInterpretation: `
Audiogram Interpretation requirements:
- Include air and bone conduction plotting
- Show degree of hearing loss classification (mild to profound)
- Calculate air-bone gap significance (>10 dB)
- Identify configuration patterns (flat, sloping, notched)
- Include word recognition score interpretation
- Show tympanogram type classification (A, B, C)
- Reference acoustic reflex patterns`,

  // Vestibular Disorders
  vertigoWorkup: `
Vertigo Workup Algorithm requirements:
- Distinguish peripheral vs central vertigo
- Include HINTS exam interpretation
- Show Dix-Hallpike test for BPPV
- Reference red flags for stroke (INFARCT mnemonic)
- Include Epley maneuver for posterior canal BPPV
- Show Meniere's disease diagnostic criteria
- Include vestibular neuritis management`,

  dizzinessEvaluation: `
Dizziness Evaluation requirements:
- Categorize dizziness types (vertigo, presyncope, disequilibrium)
- Include timing and triggers assessment
- Show medication-induced dizziness workup
- Reference orthostatic hypotension testing
- Include vestibular function testing indications
- Show cardiac workup for presyncope
- Include anxiety/hyperventilation consideration`,

  // Nose and Sinus Disorders
  sinusitisManagement: `
Sinusitis Management requirements:
- Differentiate acute vs chronic rhinosinusitis
- Follow IDSA guidelines for bacterial sinusitis
- Include symptom duration criteria (>10 days)
- Show antibiotic selection for ABRS
- Reference CT sinus indications
- Include FESS (functional endoscopic sinus surgery) criteria
- Show nasal polyp management pathway`,

  epistaxisManagement: `
Epistaxis Management requirements:
- Differentiate anterior vs posterior bleed
- Include Kiesselbach plexus anatomy
- Show stepwise management (pressure, cautery, packing)
- Reference posterior packing indications
- Include interventional radiology referral criteria
- Show anticoagulation management considerations
- Include HHT (Osler-Weber-Rendu) workup`,

  allergicRhinitisManagement: `
Allergic Rhinitis Management requirements:
- Include ARIA classification (intermittent vs persistent)
- Show stepwise pharmacotherapy approach
- Reference intranasal corticosteroid first-line
- Include allergen testing indications
- Show immunotherapy candidacy criteria
- Include comorbidity assessment (asthma, sinusitis)
- Reference environmental control measures`,

  // Throat and Larynx Disorders
  soreThroatEvaluation: `
Sore Throat Evaluation requirements:
- Include Centor/McIsaac criteria calculation
- Show rapid strep testing algorithm
- Reference Group A Strep treatment (penicillin first-line)
- Include peritonsillar abscess recognition
- Show tonsillectomy indications (Paradise criteria)
- Include mononucleosis consideration
- Reference stridor/airway emergency recognition`,

  hoarsenessWorkup: `
Hoarseness Workup requirements:
- Include >2-week duration red flag
- Show laryngoscopy indications
- Reference smoking/alcohol risk factors
- Include GERD-related laryngitis pathway
- Show vocal cord paralysis workup (CT chest/neck)
- Include voice therapy referral criteria
- Reference malignancy screening approach`,

  dysphagiaeEvaluation: `
Dysphagia Evaluation requirements:
- Differentiate oropharyngeal vs esophageal dysphagia
- Include modified barium swallow study (MBSS) indications
- Show FEES (fiberoptic endoscopic evaluation) role
- Reference aspiration risk assessment
- Include Zenker diverticulum recognition
- Show neurological workup for oropharyngeal dysphagia
- Include esophageal dysphagia workup pathway`,

  // Head and Neck Cancer
  headNeckCancerStaging: `
Head and Neck Cancer Staging requirements:
- Include TNM staging system
- Show primary site classification (oral, oropharynx, larynx, hypopharynx)
- Reference HPV status importance in oropharyngeal SCC
- Include imaging workup (CT, MRI, PET)
- Show multidisciplinary team approach
- Include treatment modality selection
- Reference surveillance protocols`,

  neckMassEvaluation: `
Neck Mass Evaluation requirements:
- Include "rule of 80s" for adults (80% neoplastic, 80% malignant, 80% metastatic)
- Show location-based differential diagnosis
- Reference fine-needle aspiration (FNA) indications
- Include imaging modality selection (US, CT, MRI)
- Show infectious vs neoplastic differentiation
- Include thyroid nodule workup pathway
- Reference lymphoma workup approach`,

  // Sleep and Airway
  sleepApneaManagement: `
Sleep Apnea Management requirements:
- Include AHI severity classification (mild 5-15, moderate 15-30, severe >30)
- Show STOP-BANG screening tool
- Reference home sleep study vs PSG indications
- Include CPAP initiation and titration
- Show surgical options (UPPP, MMA, hypoglossal nerve stimulator)
- Include weight loss and positional therapy
- Reference cardiovascular risk assessment`,

  pediatricAirway: `
Pediatric Airway Management requirements:
- Include stridor differential (croup, epiglottitis, foreign body)
- Show "hot potato voice" and drooling red flags
- Reference lateral neck X-ray interpretation (thumb sign, steeple sign)
- Include croup management (dexamethasone, nebulized epinephrine)
- Show tracheostomy indications
- Include subglottic stenosis grading
- Reference laryngomalacia management`,

  // Surgical Procedures
  tympanoplastyApproach: `
Tympanoplasty Approach requirements:
- Include perforation size and location assessment
- Show graft material selection (temporalis fascia, tragal perichondrium)
- Reference underlay vs overlay technique
- Include ossicular chain assessment
- Show mastoidectomy indications
- Include cholesteatoma surgical approach
- Reference hearing outcome expectations`,

  fessPlanning: `
FESS (Functional Endoscopic Sinus Surgery) Planning requirements:
- Include CT sinus anatomy review
- Show ostiomeatal complex evaluation
- Reference Lund-Mackay scoring system
- Include surgical extent determination
- Show powered instrumentation vs traditional
- Include image-guided surgery indications
- Reference post-operative care protocol`,

  // Additional Clinical Scenarios
  facialNerveParalysis: `
Facial Nerve Paralysis requirements:
- Include House-Brackmann grading system
- Show Bell's palsy vs other causes differentiation
- Reference steroid treatment protocol
- Include Ramsay Hunt syndrome recognition
- Show imaging indications (MRI temporal bone)
- Include eye protection measures
- Reference surgical decompression indications`,

  tinnitusEvaluation: `
Tinnitus Evaluation requirements:
- Differentiate subjective vs objective tinnitus
- Include pulsatile tinnitus vascular workup
- Show audiogram and associated hearing loss patterns
- Reference MRI indications (asymmetric tinnitus)
- Include cognitive behavioral therapy role
- Show sound therapy options
- Include medication review (ototoxic agents)`,

  thyroidNoduleWorkup: `
Thyroid Nodule Workup requirements:
- Include TSH first-line testing
- Show ultrasound TI-RADS classification
- Reference FNA biopsy indications (>1cm suspicious features)
- Include Bethesda cytology classification
- Show molecular testing indications
- Include surgical vs observation decision tree
- Reference RAI therapy considerations`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * ENT-specific few-shot examples
 */
export const ENT_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a flowchart for hearing loss evaluation',
    output: `flowchart TD
    A[("Hearing Loss")] --> B{"History &\\nOtoscopy"}
    B -->|"Abnormal TM"| C["Conductive\\nCauses"]
    B -->|"Normal TM"| D{"Tuning Fork\\nTests"}

    D -->|"Weber Lateralizes\\nRinne Negative"| C
    D -->|"Weber to Better\\nRinne Positive"| E["Sensorineural"]

    C --> F["Cerumen\\nOtitis Media\\nOtosclerosis\\nTM Perforation"]
    F --> G["Audiogram"]

    E --> H["Audiogram"]
    H --> I{"Symmetric?"}
    I -->|"No (>15dB)"| J["MRI IAC\\nR/O Acoustic Neuroma"]
    I -->|"Yes"| K["Age-related\\nNoise-induced\\nOtotoxic"]

    G --> L{"Air-Bone Gap?"}
    L -->|">10 dB"| M["Conductive\\nComponent"]
    L -->|"<10 dB"| N["Pure\\nSensorineural"]

    style A fill:#4169E1,color:#fff
    style J fill:#DC143C,color:#fff
    style E fill:#8B5CF6,color:#fff`,
  },
  {
    prompt: 'Create a vertigo workup algorithm',
    output: `flowchart TD
    A[("Vertigo")] --> B{"True Spinning\\nSensation?"}
    B -->|"No"| C["Consider:\\nPresyncope\\nDisequilibrium\\nAnxiety"]
    B -->|"Yes"| D{"HINTS Exam"}

    D -->|"Peripheral\\nPattern"| E{"Duration?"}
    D -->|"Central\\nPattern"| F["STROKE ALERT\\nEmergent MRI/MRA"]

    E -->|"Seconds\\n(positional)"| G["Dix-Hallpike\\nTest"]
    E -->|"Hours"| H["Consider\\nMeniere's"]
    E -->|"Days\\n(continuous)"| I["Vestibular\\nNeuritis"]

    G -->|"Positive"| J["BPPV\\nEpley Maneuver"]
    G -->|"Negative"| K["Other BPPV\\nVariants"]

    H --> L["Low-Salt Diet\\nDiuretics\\nHearing Test"]
    I --> M["Steroids\\nVestibular Rehab"]

    subgraph HINTS["HINTS Exam"]
        H1["Head Impulse"]
        H2["Nystagmus"]
        H3["Test of Skew"]
    end

    style F fill:#DC143C,color:#fff
    style J fill:#22C55E,color:#fff
    style A fill:#4169E1,color:#fff`,
  },
  {
    prompt: 'Create a sinusitis management flowchart',
    output: `flowchart TD
    A[("Rhinosinusitis\\nSymptoms")] --> B{"Duration?"}
    B -->|"<10 days"| C["Viral URI\\nSupportive Care"]
    B -->|"≥10 days OR\\nWorsening"| D{"Severe\\nSymptoms?"}

    D -->|"Fever >39°C\\nFacial Pain\\nPurulent Discharge"| E["Bacterial:\\nAmoxicillin-Clav\\nx 5-7 days"]
    D -->|"Mild-Moderate"| F["Continued\\nSymptomatic Rx"]

    F --> G{"Improvement\\nin 7 days?"}
    G -->|"No"| E
    G -->|"Yes"| H["Continue\\nResolves"]

    subgraph Chronic["Chronic (>12 weeks)"]
        CR1["CT Sinuses"]
        CR2["Nasal Endoscopy"]
        CR3["Allergy Testing"]
    end

    B -->|"≥12 weeks"| Chronic
    Chronic --> I{"Medical\\nFailure?"}
    I -->|"Yes"| J["FESS\\nConsideration"]
    I -->|"No"| K["Continue\\nMedical Rx"]

    subgraph RedFlags["Red Flags"]
        RF1["Orbital Symptoms"]
        RF2["Altered Mental Status"]
        RF3["Frontal Swelling"]
    end

    RedFlags --> L["Emergency\\nCT + ENT"]

    style E fill:#4169E1,color:#fff
    style L fill:#DC143C,color:#fff
    style J fill:#8B5CF6,color:#fff`,
  },
  {
    prompt: 'Create an audiogram interpretation flowchart',
    output: `flowchart TD
    A["Audiogram\\nResults"] --> B{"FVC/FVC\\nRatio"}

    B --> C["Plot Air\\nConduction"]
    C --> D["Plot Bone\\nConduction"]
    D --> E{"Air-Bone\\nGap?"}

    E -->|">10 dB\\nBone Better"| F["CONDUCTIVE\\nComponent"]
    E -->|"≤10 dB\\nOverlapping"| G["SENSORINEURAL"]

    F --> H{"Bone Normal?"}
    H -->|"Yes"| I["Pure\\nConductive"]
    H -->|"No"| J["Mixed"]

    subgraph Severity["Hearing Loss Severity"]
        S1["Normal: 0-25 dB"]
        S2["Mild: 26-40 dB"]
        S3["Moderate: 41-55 dB"]
        S4["Mod-Severe: 56-70 dB"]
        S5["Severe: 71-90 dB"]
        S6["Profound: >90 dB"]
    end

    G --> K{"Pattern?"}
    K -->|"Flat"| L["Genetic\\nOtotoxic"]
    K -->|"Sloping"| M["Presbycusis\\nNoise-induced"]
    K -->|"Low-freq"| N["Meniere's"]
    K -->|"Notch 4kHz"| O["Noise-induced"]

    style I fill:#4169E1,color:#fff
    style G fill:#8B5CF6,color:#fff
    style J fill:#FFA500,color:#000`,
  },
  {
    prompt: 'Create a sleep apnea management algorithm',
    output: `flowchart TD
    A[("Suspected\\nOSA")] --> B["STOP-BANG\\nScreening"]

    B --> C{"Score?"}
    C -->|"0-2 Low"| D["Low Risk\\nObserve"]
    C -->|"3-4 Intermediate"| E["Consider\\nSleep Study"]
    C -->|"5-8 High"| F["Sleep Study\\nRecommended"]

    E --> G{"Comorbidities?"}
    G -->|"Yes"| F
    G -->|"No"| H["Home Sleep\\nTest (HST)"]

    F --> I["PSG or HST"]
    I --> J{"AHI Result"}

    J -->|"<5"| K["No OSA"]
    J -->|"5-15"| L["Mild OSA"]
    J -->|"15-30"| M["Moderate OSA"]
    J -->|">30"| N["Severe OSA"]

    L --> O["Lifestyle\\nPositional Rx\\nOral Appliance"]
    M --> P["CPAP Trial"]
    N --> P

    P --> Q{"CPAP\\nTolerant?"}
    Q -->|"No"| R["Alternatives:\\nBiPAP\\nASV\\nSurgery\\nHNS"]
    Q -->|"Yes"| S["Continue CPAP\\nFollow-up"]

    subgraph STOPBANG["STOP-BANG"]
        SB1["Snoring"]
        SB2["Tired"]
        SB3["Observed Apnea"]
        SB4["Pressure (HTN)"]
        SB5["BMI >35"]
        SB6["Age >50"]
        SB7["Neck >40cm"]
        SB8["Gender (Male)"]
    end

    style N fill:#DC143C,color:#fff
    style S fill:#22C55E,color:#fff
    style P fill:#4169E1,color:#fff`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

const entPrompts = {
  ENT_DOMAIN_PROMPT,
  ENT_PROMPTS,
  ENT_FEW_SHOT_EXAMPLES,
};
export default entPrompts;
