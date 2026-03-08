/**
 * neurology-prompts.ts
 * Neurology-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for neurological medicine including:
 * - Brain anatomy and neural pathways
 * - Stroke assessment and management
 * - Seizure and epilepsy evaluation
 * - Neurodegenerative disease workup
 * - Neurological examination workflows
 * - Movement disorders and neuroimmunology
 * - Neurocritical care and neurogenetics
 * - Pediatric neurology
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// NEUROLOGY DOMAIN PROMPT
// =============================================================================

/**
 * Base neurology domain prompt for neurological medicine diagrams
 */
export const NEUROLOGY_DOMAIN_PROMPT = `
Neurology diagram requirements:
- Use standard neurological terminology (UMN, LMN, DTR, CN I-XII)
- Follow NIH Stroke Scale (NIHSS) conventions for stroke assessment
- Reference McDonald criteria for MS diagnosis
- Include proper anatomical orientation (rostral/caudal, dorsal/ventral)
- Use standard motor strength grading (0-5 MRC scale)
- Follow ILAE seizure classification guidelines
- Reference AAN practice guidelines where applicable
- Include proper nerve root/dermatome mapping (C1-S5)
- Use color coding: Motor pathways (Red), Sensory pathways (Blue), Mixed (Purple)
- Include proper lesion localization annotations`;

// =============================================================================
// NEUROLOGY-SPECIFIC PROMPTS
// =============================================================================

export const NEUROLOGY_PROMPTS = {
  // Clinical Decision Support
  strokeAssessment: `
Stroke Assessment Algorithm requirements:
- Calculate time from last known well (LKW)
- Include NIHSS score thresholds
- Differentiate ischemic vs hemorrhagic stroke
- Include tPA eligibility criteria (within 4.5 hours)
- Reference thrombectomy window (up to 24 hours with imaging selection)
- Show ASPECTS score for anterior circulation
- Include contraindications checklist`,

  headacheEvaluation: `
Headache Evaluation requirements:
- Include SNOOP4 red flags screening
- Differentiate primary vs secondary headache
- Reference ICHD-3 diagnostic criteria
- Include thunderclap headache pathway (SAH workup)
- Show migraine vs tension-type vs cluster differentiation
- Include medication overuse headache consideration
- Reference imaging indications`,

  seizureManagement: `
Seizure Management requirements:
- Follow status epilepticus timeline (5 min definition)
- Include first-line benzodiazepine dosing
- Show second-line AED selection pathway
- Reference refractory status escalation
- Include post-ictal monitoring checklist
- Show new-onset seizure workup
- Include EEG timing recommendations`,

  alteredMentalStatus: `
Altered Mental Status Workup requirements:
- Use AEIOU-TIPS mnemonic coverage
- Include GCS scoring
- Reference metabolic workup panel
- Differentiate delirium vs dementia vs psychiatric
- Include infection screening pathway
- Show toxic/drug screen considerations
- Reference imaging decision points`,

  msDiagnosis: `
MS Diagnostic Criteria requirements:
- Follow McDonald 2017 criteria
- Include DIS (dissemination in space) requirements
- Include DIT (dissemination in time) requirements
- Show MRI lesion criteria (periventricular, juxtacortical, infratentorial, spinal)
- Reference CSF oligoclonal bands interpretation
- Include differential diagnosis exclusion
- Show relapse definition criteria`,

  // Anatomical and Pathway Diagrams
  motorPathway: `
Motor Pathway Diagram requirements:
- Show corticospinal tract from motor cortex to muscle
- Include internal capsule localization
- Mark pyramidal decussation at medullary level
- Differentiate UMN vs LMN lesion patterns
- Include lateral vs anterior corticospinal tracts
- Show alpha motor neuron termination
- Reference homunculus motor representation`,

  sensoryPathway: `
Sensory Pathway Diagram requirements:
- Differentiate dorsal column-medial lemniscus pathway
- Show spinothalamic tract organization
- Include proper decussation levels
- Reference thalamic relay (VPL nucleus)
- Show primary sensory cortex termination
- Include dermatomal organization
- Differentiate pain/temp vs proprioception/vibration`,

  cranialNerves: `
Cranial Nerve Diagram requirements:
- Include all 12 cranial nerves (I-XII)
- Show brainstem nuclei locations (midbrain, pons, medulla)
- Reference foramen exit points
- Include motor vs sensory vs mixed classification
- Show parasympathetic components (III, VII, IX, X)
- Include clinical testing methods
- Reference common lesion presentations`,

  // Diagnostic Interpretation
  eegInterpretation: `
EEG Interpretation requirements:
- Include montage orientation (bipolar, referential)
- Reference normal background rhythms (alpha, beta, theta, delta)
- Show epileptiform discharge recognition
- Include seizure pattern classification
- Reference artifact identification
- Show encephalopathy patterns
- Include status epilepticus EEG criteria`,

  csfAnalysis: `
CSF Analysis requirements:
- Include opening pressure interpretation
- Reference cell count differential (RBC, WBC, lymphs, PMNs)
- Show protein and glucose interpretation
- Include infectious workup pathway (bacterial, viral, fungal, TB)
- Reference oligoclonal bands and IgG index
- Show cytology indications
- Include special tests (VDRL, cryptococcal, HSV PCR)`,

  neuroimaging: `
Neuroimaging Interpretation requirements:
- Differentiate CT vs MRI indications
- Include stroke protocol sequences (DWI, ADC, FLAIR, GRE)
- Reference hemorrhage evolution on CT
- Show white matter lesion patterns
- Include vascular territory mapping
- Reference tumor imaging characteristics
- Show contrast enhancement patterns`,

  // Disease-Specific Pathways
  parkinsonManagement: `
Parkinson Disease Management requirements:
- Reference UK Brain Bank diagnostic criteria
- Include motor symptom staging (Hoehn & Yahr)
- Show levodopa initiation pathway
- Reference dopamine agonist selection
- Include motor fluctuation management
- Show non-motor symptom screening
- Reference surgical therapy indications (DBS)`,

  dementiaWorkup: `
Dementia Workup requirements:
- Include cognitive screening tools (MMSE, MoCA)
- Reference reversible causes checklist
- Show neuroimaging indications
- Include laboratory workup panel
- Differentiate AD vs vascular vs Lewy body vs FTD
- Reference biomarker testing (CSF, PET)
- Show functional assessment tools`,

  neuropathyEvaluation: `
Neuropathy Evaluation requirements:
- Differentiate axonal vs demyelinating patterns
- Include EMG/NCS interpretation pathway
- Reference distribution patterns (length-dependent, multifocal)
- Show laboratory workup for etiology
- Include autonomic neuropathy screening
- Reference treatment decision points
- Show CIDP diagnostic criteria`,

  neuroExamination: `
Neurological Examination requirements:
- Include mental status components (orientation, attention, memory, language)
- Show cranial nerve testing sequence
- Reference motor examination grading (0-5)
- Include sensory modality testing
- Show deep tendon reflex grading (0-4+)
- Include cerebellar function tests
- Reference gait assessment components`,

  // Advanced Clinical Topics (COMPLETE checkpoint additions)
  movementDisorders: `
Movement Disorder Evaluation requirements:
- Classify hypokinetic (parkinsonism) vs hyperkinetic (tremor, chorea, dystonia, myoclonus, tics)
- Differentiate idiopathic PD from atypical parkinsonism (PSP, MSA, CBD, DLB)
- Characterize tremor: rest vs postural vs intention, frequency analysis
- Include red flags for atypical parkinsonism (early falls, autonomic, gaze palsy)
- Reference MDS-UPDRS for PD staging
- Show DaTscan indications and interpretation
- Include medication-induced movement disorders (tardive, drug-induced parkinsonism)`,

  neurocriticalCare: `
Neurocritical Care requirements:
- Reference ICP management tiers (Tier 1: positioning, sedation, osmotherapy; Tier 2: decompression)
- Include CPP target calculation (MAP - ICP, goal >60)
- Show EVD management and CSF drainage protocols
- Include status epilepticus escalation in ICU setting
- Reference neuroprognostication after cardiac arrest (72 hours, multimodal)
- Show brain death determination criteria (prerequisites, clinical exam, ancillary tests)
- Include targeted temperature management protocols`,

  neuroimmunology: `
Neuroimmunology requirements:
- Reference McDonald 2017 criteria for MS diagnosis
- Include autoimmune encephalitis workup (anti-NMDAR, LGI1, CASPR2)
- Differentiate NMOSD from MS (AQP4-IgG, LETM, optic neuritis)
- Show DMT selection for MS (platform vs high-efficacy)
- Include acute relapse management (IV methylprednisolone, PLEX)
- Reference paraneoplastic syndromes and antibody associations
- Show MOGAD diagnostic criteria and management`,

  neurogenetics: `
Neurogenetics requirements:
- Include indications for genetic testing (early-onset, family history, atypical)
- Reference hereditary neuropathy classification (CMT1A, CMT2, HNPP)
- Show hereditary ataxia workup (Friedreich, SCAs, AOA)
- Include muscular dystrophy genetic testing pathway (DMD, FSHD, myotonic)
- Reference genetic counseling principles and anticipation
- Show trinucleotide repeat disorders (Huntington, SCAs, myotonic)
- Include mitochondrial disease manifestations and genetic testing`,

  pediatricNeuro: `
Pediatric Neurology requirements:
- Include developmental milestone screening and red flags
- Reference pediatric epilepsy syndromes (infantile spasms, Lennox-Gastaut, CAE, JME)
- Show febrile seizure management and counseling
- Include cerebral palsy classification (spastic, dyskinetic, ataxic)
- Reference neurocutaneous syndromes (NF1, TSC, Sturge-Weber)
- Show neonatal seizure workup and etiology
- Include pediatric headache evaluation (migraine variants, secondary causes)`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Neurology-specific few-shot examples
 */
export const NEUROLOGY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a flowchart for acute stroke assessment and tPA decision-making',
    output: `flowchart TD
    A[("Acute Neurological\\nDeficit")] --> B["Time from LKW?"]
    B --> C{"<4.5 hours?"}
    C -->|Yes| D["NIHSS + CT Head"]
    C -->|No| E["Extended Window\\nCT/CTA/CTP"]

    D -->|"No Hemorrhage"| F{"tPA\\nContraindications?"}
    F -->|No| G["IV tPA"]
    F -->|Yes| H["Consider EVT Only"]

    E --> I{"LVO on CTA?"}
    I -->|Yes| J{"Favorable\\nPerfusion?"}
    J -->|Yes| K["Thrombectomy"]
    J -->|No| L["Medical Management"]
    I -->|No| L

    G --> M{"LVO Present?"}
    M -->|Yes| K
    M -->|No| N["Monitor + Stroke Unit"]

    style A fill:#DC143C,color:#fff
    style G fill:#228B22,color:#fff
    style K fill:#4169E1,color:#fff`,
  },
  {
    prompt: 'Create a seizure management algorithm for status epilepticus',
    output: `flowchart TD
    A[("Active Seizure\\n>5 min")] --> B["ABCs + O2\\nGlucose Check"]
    B --> C["Lorazepam 4mg IV\\nor Midazolam 10mg IM"]

    C --> D{"Seizure\\nStopped?"}
    D -->|No 5-10 min| E["Repeat Benzo x1"]
    D -->|Yes| F["Load AED\\nMonitor"]

    E --> G{"Still Seizing\\n10-20 min?"}
    G -->|Yes| H["2nd Line AED"]
    G -->|No| F

    H --> H1["Fosphenytoin 20 PE/kg\\nOR Valproate 40 mg/kg\\nOR Levetiracetam 60 mg/kg"]

    H1 --> I{"Seizure\\nContinues?"}
    I -->|Yes >30 min| J["Refractory SE"]
    I -->|No| K["ICU + cEEG"]

    J --> L["RSI + Intubation"]
    L --> M["Propofol or\\nMidazolam gtt"]
    M --> N["cEEG Monitoring\\nBurst Suppression"]

    style A fill:#DC143C,color:#fff
    style J fill:#8B0000,color:#fff
    style F fill:#228B22,color:#fff`,
  },
  {
    prompt: 'Create a diagram showing the corticospinal motor pathway',
    output: `flowchart TD
    subgraph Cortex["Motor Cortex"]
        A["Primary Motor Cortex\\n(Precentral Gyrus)"]
    end

    subgraph Corona["Corona Radiata"]
        B["Upper Motor Neuron\\nDescending Fibers"]
    end

    subgraph IC["Internal Capsule"]
        C["Posterior Limb"]
    end

    subgraph Brainstem["Brainstem"]
        D["Cerebral Peduncle\\n(Midbrain)"]
        E["Basis Pontis\\n(Pons)"]
        F["Medullary Pyramid"]
        G["Pyramidal Decussation\\n(85% cross)"]
    end

    subgraph SC["Spinal Cord"]
        H["Lateral Corticospinal\\nTract"]
        I["Anterior Corticospinal\\nTract (15%)"]
        J["Alpha Motor Neuron\\n(LMN)"]
    end

    subgraph Target["Target"]
        K["Skeletal Muscle"]
    end

    A --> B --> C --> D --> E --> F --> G
    G -->|"85%"| H --> J --> K
    G -->|"15%"| I --> J

    style G fill:#FFA500,color:#000
    style H fill:#DC143C,color:#fff
    style J fill:#4169E1,color:#fff`,
  },
  {
    prompt: 'Create a headache evaluation flowchart with red flags',
    output: `flowchart TD
    A[("Headache\\nPresentation")] --> B{"SNOOP4\\nRed Flags?"}

    B -->|"Systemic symptoms\\nNeuro deficits\\nOnset sudden\\nOlder age\\nPattern change\\nPapilledema\\nPositional\\nPrecipitated"| C["EMERGENT WORKUP"]

    C --> D{"Thunderclap\\nOnset?"}
    D -->|Yes| E["CT Head STAT"]
    E -->|Negative| F["LP for SAH"]
    D -->|No| G["CT/MRI + Labs"]

    B -->|No Red Flags| H{"Primary\\nHeadache?"}

    H --> I{"Features?"}
    I -->|"Unilateral\\nPulsating\\nNausea/Vomiting\\nPhoto/Phonophobia"| J["MIGRAINE"]
    I -->|"Bilateral\\nPressing\\nNo nausea\\nMild-moderate"| K["TENSION-TYPE"]
    I -->|"Unilateral orbital\\nAutonomic features\\n15-180 min attacks"| L["CLUSTER"]

    J --> M["Acute: Triptans\\nPreventive if frequent"]
    K --> N["NSAIDs\\nAmitriptyline PRN"]
    L --> O["O2 + Sumatriptan\\nVerapamil prevention"]

    style C fill:#DC143C,color:#fff
    style E fill:#FFA500,color:#000
    style J fill:#9932CC,color:#fff`,
  },
  {
    prompt: 'Create a neurological examination systematic approach diagram',
    output: `flowchart TD
    A["Neuro Exam"] --> B["1. Mental Status"]
    A --> C["2. Cranial Nerves"]
    A --> D["3. Motor"]
    A --> E["4. Sensory"]
    A --> F["5. Reflexes"]
    A --> G["6. Coordination"]
    A --> H["7. Gait"]

    B --> B1["Orientation x4"]
    B --> B2["Attention (serial 7s)"]
    B --> B3["Memory (3 words)"]
    B --> B4["Language/Speech"]

    C --> C1["II: Visual acuity, fields, fundus"]
    C --> C2["III, IV, VI: EOM, pupils"]
    C --> C3["V: Facial sensation, masseter"]
    C --> C4["VII: Facial strength"]
    C --> C5["VIII: Hearing, Rinne/Weber"]
    C --> C6["IX, X: Palate, gag"]
    C --> C7["XI: SCM, trapezius"]
    C --> C8["XII: Tongue"]

    D --> D1["Bulk/Tone"]
    D --> D2["Strength 0-5"]
    D --> D3["Pronator Drift"]

    E --> E1["Light Touch"]
    E --> E2["Pin/Temperature"]
    E --> E3["Vibration"]
    E --> E4["Proprioception"]

    F --> F1["Biceps (C5-6)"]
    F --> F2["Triceps (C7-8)"]
    F --> F3["Patellar (L3-4)"]
    F --> F4["Achilles (S1)"]
    F --> F5["Babinski"]

    G --> G1["Finger-Nose-Finger"]
    G --> G2["Heel-Shin"]
    G --> G3["Rapid Alternating"]

    H --> H1["Casual Gait"]
    H --> H2["Tandem"]
    H --> H3["Romberg"]`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

const neurologyPrompts = {
  NEUROLOGY_DOMAIN_PROMPT,
  NEUROLOGY_PROMPTS,
  NEUROLOGY_FEW_SHOT_EXAMPLES,
};
export default neurologyPrompts;
