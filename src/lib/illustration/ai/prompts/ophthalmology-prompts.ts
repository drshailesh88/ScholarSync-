/**
 * ophthalmology-prompts.ts
 * Ophthalmology-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for eye and vision medicine including:
 * - Eye anatomy and optical structures
 * - Refractive error evaluation
 * - Glaucoma assessment and management
 * - Diabetic retinopathy screening
 * - Cataract evaluation and surgery
 * - Retinal disease workup
 * - Neuro-ophthalmology
 * - Pediatric ophthalmology
 *
 * Total: 20 specialized prompts
 */

import type { FewShotExample } from './index';

// =============================================================================
// OPHTHALMOLOGY DOMAIN PROMPT
// =============================================================================

/**
 * Base ophthalmology domain prompt for eye and vision diagrams
 */
export const OPHTHALMOLOGY_DOMAIN_PROMPT = `
Ophthalmology diagram requirements:
- Use standard ophthalmic terminology (OD right eye, OS left eye, OU both eyes)
- Follow AAO preferred practice patterns
- Reference visual acuity in Snellen or LogMAR notation
- Include proper IOP measurements in mmHg
- Use ETDRS severity scales for diabetic retinopathy
- Follow ICO guidelines for glaucoma classification
- Include proper anatomical orientation (temporal, nasal, superior, inferior)
- Use color coding: Arteries (Red), Veins (Blue), Optic nerve (Orange)
- Reference OCT/imaging measurements when applicable
- Include CDR (cup-to-disc ratio) for optic nerve assessment`;

// =============================================================================
// OPHTHALMOLOGY-SPECIFIC PROMPTS
// =============================================================================

export const OPHTHALMOLOGY_PROMPTS = {
  // Clinical Decision Support
  redEyeEvaluation: `
Red Eye Evaluation Algorithm requirements:
- Differentiate vision-threatening vs non-threatening conditions
- Include pain assessment (severe vs mild/none)
- Evaluate discharge characteristics (purulent, watery, mucoid)
- Check pupil reactivity and shape
- Measure intraocular pressure if indicated
- Assess for corneal involvement (staining, infiltrate)
- Differentiate: conjunctivitis, keratitis, uveitis, acute glaucoma, scleritis
- Include emergency referral criteria`,

  visionLossWorkup: `
Acute Vision Loss Workup requirements:
- Determine onset (sudden vs gradual)
- Assess laterality (unilateral vs bilateral)
- Evaluate for APD (afferent pupillary defect)
- Include red reflex assessment
- Reference visual field pattern
- Differentiate: CRAO, CRVO, RD, optic neuritis, GCA
- Include fundoscopic examination findings
- Reference urgent vs emergent referral criteria`,

  glaucomaAssessment: `
Glaucoma Assessment Algorithm requirements:
- Measure baseline and target IOP
- Calculate cup-to-disc ratio (CDR)
- Assess RNFL thickness on OCT
- Reference visual field pattern (arcuate, nasal step)
- Classify severity (mild, moderate, severe, end-stage)
- Differentiate open-angle vs angle-closure
- Include pachymetry (CCT) adjustment
- Reference medication escalation pathway`,

  diabeticEyeScreening: `
Diabetic Eye Screening Protocol requirements:
- Reference ETDRS classification system
- Differentiate NPDR stages (mild, moderate, severe)
- Identify PDR features (NVD, NVE, VH, TRD)
- Assess for DME (CSME criteria)
- Include 4-2-1 rule for severe NPDR
- Reference anti-VEGF treatment criteria
- Include PRP indications
- Show screening interval based on severity`,

  cataractEvaluation: `
Cataract Evaluation requirements:
- Grade nuclear sclerosis (NS 1-4)
- Assess cortical opacities
- Evaluate posterior subcapsular cataract (PSC)
- Calculate IOL power (SRK-T, Haigis, Barrett)
- Reference biometry measurements (AL, K readings)
- Assess visual function impact (BCVA, glare testing)
- Include surgical risk factors (PXF, small pupil, zonular weakness)
- Reference IOL selection criteria (monofocal, multifocal, toric)`,

  // Anatomical and Pathway Diagrams
  eyeAnatomyCrossSection: `
Eye Anatomy Cross-Section requirements:
- Show anterior segment structures (cornea, AC, iris, lens)
- Include posterior segment (vitreous, retina, choroid, sclera)
- Label refractive elements with proper orientation
- Include aqueous humor flow pathway
- Show uveal tract components
- Reference optical pathway from cornea to retina
- Include extraocular muscle insertions
- Label vascular supply (central retinal artery/vein, ciliary arteries)`,

  retinalLayersDiagram: `
Retinal Layers Diagram requirements:
- Show all 10 retinal layers from ILM to RPE
- Include photoreceptor layer detail (rods vs cones)
- Reference OCT correlation for each layer
- Show blood-retina barrier components
- Include foveal anatomy (FAZ, foveal pit)
- Reference pathological correlation for each layer
- Show Bruch's membrane and choriocapillaris
- Include Mueller cell spanning pattern`,

  visualPathwayNeuroanatomy: `
Visual Pathway Neuroanatomy requirements:
- Trace pathway from retina to visual cortex
- Show optic chiasm hemidecussation
- Include LGN (lateral geniculate nucleus)
- Reference optic radiations (Meyer's loop, superior radiations)
- Map visual field defects to lesion location
- Include pupillary light reflex pathway
- Reference homonymous vs heteronymous defects
- Show cortical magnification at V1`,

  aqueousOutflowDynamics: `
Aqueous Outflow Dynamics requirements:
- Show ciliary body production
- Reference posterior-to-anterior chamber flow
- Include trabecular outflow pathway (90%)
- Show uveoscleral outflow (10%)
- Reference Schlemm's canal drainage
- Include episcleral venous system
- Show IOP equilibrium factors
- Reference glaucoma pathophysiology correlation`,

  // Diagnostic Interpretation
  octInterpretation: `
OCT Interpretation Guide requirements:
- Show normal RNFL thickness values by sector
- Reference GCC (ganglion cell complex) analysis
- Include macular thickness mapping
- Show AMD findings (drusen, RPE changes, SRF, IRF)
- Reference glaucoma progression patterns
- Include DME classification on OCT
- Show vitreoretinal interface abnormalities
- Reference OCT-A findings when applicable`,

  visualFieldInterpretation: `
Visual Field Interpretation requirements:
- Assess reliability indices (FP, FN, FL)
- Reference MD (mean deviation) significance
- Include PSD (pattern standard deviation) analysis
- Show GHT (glaucoma hemifield test) interpretation
- Classify defect patterns (arcuate, nasal step, altitudinal)
- Reference progression analysis (GPA, VFI trend)
- Include neurological vs glaucomatous patterns
- Show artifact recognition`,

  fundusFindings: `
Fundus Examination Findings requirements:
- Describe optic disc appearance (color, margins, CDR)
- Reference vessel caliber (A/V ratio)
- Include macular findings (foveal reflex, pigmentary changes)
- Show peripheral retina assessment
- Reference hemorrhage patterns (dot-blot, flame, preretinal)
- Include exudate patterns (hard vs soft/CWS)
- Show neovascularization features
- Reference fundus photography correlation`,

  // Disease-Specific Pathways
  amdManagement: `
AMD Management Algorithm requirements:
- Differentiate dry vs wet AMD
- Classify drusen (soft, hard, confluent)
- Reference AREDS2 supplementation criteria
- Include CNV detection and classification
- Show anti-VEGF treatment protocol (load then PRN vs T&E)
- Reference OCT monitoring schedule
- Include conversion risk assessment
- Show low vision rehabilitation referral criteria`,

  retinaDetachmentManagement: `
Retinal Detachment Management requirements:
- Classify RD type (rhegmatogenous, tractional, exudative)
- Assess macula status (on vs off)
- Reference surgical approach selection (PPV, SB, pneumatic)
- Include break localization (U-tear, round hole, dialysis)
- Show PVR grading if present
- Reference tamponade selection (gas, oil)
- Include postoperative positioning
- Show prognosis based on presenting features`,

  uveitisWorkup: `
Uveitis Workup Algorithm requirements:
- Classify anatomically (anterior, intermediate, posterior, panuveitis)
- Reference SUN grading for cells and flare
- Include HLA-B27 associated conditions
- Show infectious workup (syphilis, TB, toxo, HSV, CMV)
- Reference autoimmune screening panel
- Include imaging indications (FA, ICG, OCT)
- Show treatment escalation (topical, periocular, systemic)
- Reference biologics indication criteria`,

  neuroOphthalmologyWorkup: `
Neuro-Ophthalmology Workup requirements:
- Assess pupillary responses (APD, Horner's, tonic pupil)
- Include optic disc evaluation (edema vs pallor)
- Reference diplopia evaluation (comitant vs incomitant)
- Show cranial nerve localization (III, IV, VI)
- Include VF pattern for lesion localization
- Reference neuroimaging indications
- Show optic neuritis workup (MS, NMO, MOG)
- Include GCA screening protocol (ESR, CRP, temporal biopsy)`,

  // Procedures and Surgery
  cataractSurgerySteps: `
Cataract Surgery Procedure Steps requirements:
- Show anesthesia approach (topical, intracameral, peribulbar)
- Reference incision creation (clear corneal, scleral tunnel)
- Include capsulorhexis technique
- Show hydrodissection and hydrodelineation
- Reference phaco settings and technique
- Include I/A (irrigation/aspiration) of cortex
- Show IOL implantation (in-the-bag vs sulcus)
- Reference wound closure and IOP check`,

  glaucomaSurgeryOptions: `
Glaucoma Surgery Options requirements:
- Classify by mechanism (filtration, tube, MIGS, cyclodestructive)
- Reference trabeculectomy technique and MMC use
- Include tube shunt indications (Ahmed, Baerveldt)
- Show MIGS device options (iStent, Hydrus, XEN, Kahook)
- Reference cyclophotocoagulation indications
- Include SLT for angle treatment
- Show surgical decision tree based on severity
- Reference postoperative management`,

  refractiveSurgerySelection: `
Refractive Surgery Selection requirements:
- Assess candidacy criteria (age, stability, pregnancy)
- Reference corneal thickness and topography requirements
- Include ectasia risk assessment (corneal tomography)
- Differentiate LASIK vs PRK vs SMILE
- Show ICL indications (high myopia, thin cornea)
- Reference contraindications (keratoconus, severe dry eye)
- Include refractive lens exchange criteria
- Show enhancement/retreatment considerations`,

  pediatricEyeExam: `
Pediatric Eye Examination requirements:
- Age-appropriate visual acuity testing (fixation, Allen cards, HOTV)
- Reference cycloplegic refraction protocol
- Include strabismus assessment (cover test, prism)
- Show amblyopia screening and treatment
- Reference red reflex examination (Bruckner test)
- Include ROP screening criteria (gestational age, birth weight)
- Show nasolacrimal duct obstruction management
- Reference pediatric cataract evaluation`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

export const OPHTHALMOLOGY_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a diabetic retinopathy screening flowchart',
    output: `flowchart TD
    subgraph Screening["Annual Diabetic Eye Screening"]
        A[("Diabetic Patient")] --> B{"Dilated Fundus Exam"}
    end

    subgraph Classification["DR Classification"]
        B --> C{"Retinopathy Present?"}
        C -->|"No"| D["No DR - Annual Screen"]
        C -->|"Yes"| E{"NPDR Stage?"}
        E -->|"Mild"| F["Mild NPDR\\nMA only"]
        E -->|"Moderate"| G["Moderate NPDR\\nHemorrhages + Exudates"]
        E -->|"Severe"| H["Severe NPDR\\n4-2-1 Rule"]
        E -->|"PDR"| I["Proliferative DR\\nNVD/NVE"]
    end

    subgraph Management["Management"]
        D --> J["Screen q12mo"]
        F --> K["Screen q9-12mo"]
        G --> L["Screen q6mo"]
        H --> M["Retina Referral"]
        I --> N["Urgent Referral"]
        M --> O["Consider PRP"]
        N --> P["PRP + Anti-VEGF"]
    end

    subgraph DME["DME Assessment"]
        B --> Q{"DME Present?"}
        Q -->|"Yes"| R["CI-DME: Anti-VEGF"]
        Q -->|"No"| S["Monitor"]
    end

    style I fill:#DC143C,color:#fff
    style H fill:#FFA500,color:#000
    style N fill:#DC143C,color:#fff`,
    reasoning: 'The diagram follows ETDRS classification, includes the 4-2-1 rule for severe NPDR, shows DME assessment pathway, and includes appropriate screening intervals.',
  },
  {
    prompt: 'Create a glaucoma management algorithm',
    output: `flowchart TD
    subgraph Diagnosis["Glaucoma Diagnosis"]
        A[("Elevated IOP or\\nSuspicious Disc")] --> B["Full Glaucoma Workup"]
        B --> C["IOP + Pachymetry"]
        B --> D["Gonioscopy"]
        B --> E["OCT RNFL/GCC"]
        B --> F["Visual Field 24-2"]
    end

    subgraph Classification["Classification"]
        D --> G{"Angle Status?"}
        G -->|"Open"| H["POAG"]
        G -->|"Narrow/Closed"| I["Angle Closure"]
        I --> J["LPI if Needed"]
    end

    subgraph Treatment["Stepwise Treatment"]
        H --> K["Set Target IOP\\n(20-40% reduction)"]
        K --> L["1st Line: PGA"]
        L --> M{"At Target?"}
        M -->|"No"| N["Add Beta Blocker"]
        N --> O{"At Target?"}
        O -->|"No"| P["Add CAI/Alpha Agonist"]
        P --> Q{"Progression?"}
        Q -->|"Yes"| R["SLT or Surgery"]
        M -->|"Yes"| S["Monitor q3-6mo"]
        O -->|"Yes"| S
    end

    subgraph Surgery["Surgical Options"]
        R --> T{"Severity?"}
        T -->|"Mild-Mod"| U["MIGS"]
        T -->|"Moderate"| V["SLT/Trab"]
        T -->|"Severe"| W["Trab + MMC/Tube"]
    end

    style I fill:#FFA500,color:#000
    style W fill:#DC143C,color:#fff
    style S fill:#228B22,color:#fff`,
    reasoning: 'The diagram includes gonioscopy classification, target IOP setting, stepwise medication approach, and surgical escalation based on severity.',
  },
  {
    prompt: 'Create an acute vision loss evaluation flowchart',
    output: `flowchart TD
    subgraph Presentation["Acute Vision Loss"]
        A[("Sudden Vision Loss")] --> B{"Painful?"}
    end

    subgraph Painful["Painful Vision Loss"]
        B -->|"Yes"| C{"Red Eye?"}
        C -->|"Yes + High IOP"| D["Acute Angle Closure"]
        C -->|"Yes + Infiltrate"| E["Corneal Ulcer"]
        C -->|"Eye Movement Pain"| F["Optic Neuritis"]
        D --> G["Stat IOP Lowering + LPI"]
    end

    subgraph Painless["Painless Vision Loss"]
        B -->|"No"| H{"APD Present?"}
        H -->|"Yes"| I["Optic Nerve/Retinal"]
        H -->|"No"| J["Media Opacity/Macular"]
        I --> K{"Fundus Exam"}
        K -->|"Pale Retina + Cherry Red"| L["CRAO - Stroke Alert"]
        K -->|"Blood + Thunder"| M["CRVO"]
        K -->|"Disc Edema + Pallor"| N["AION/GCA"]
        K -->|"Elevated Retina"| O["Retinal Detachment"]
        J --> P["VH/Cataract/Macular"]
    end

    subgraph Urgent["Urgent Actions"]
        L --> Q["Immediate: Massage, AC Tap\\nStroke Workup"]
        N --> R["ESR/CRP/Plt\\nConsider Temporal Bx"]
        O --> S["Urgent Surgical Repair"]
    end

    style L fill:#DC143C,color:#fff
    style D fill:#DC143C,color:#fff
    style Q fill:#DC143C,color:#fff
    style R fill:#FFA500,color:#000`,
    reasoning: 'The diagram differentiates painful vs painless vision loss, includes APD assessment, shows fundoscopic findings, and highlights emergent conditions.',
  },
];

// =============================================================================
// EXPORT
// =============================================================================

export default {
  OPHTHALMOLOGY_DOMAIN_PROMPT,
  OPHTHALMOLOGY_PROMPTS,
  OPHTHALMOLOGY_FEW_SHOT_EXAMPLES,
};
