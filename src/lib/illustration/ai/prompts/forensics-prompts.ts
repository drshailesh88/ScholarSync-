/**
 * forensics-prompts.ts
 * Forensics-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for forensic science including:
 * - Crime scene analysis (documentation, evidence collection)
 * - DNA analysis (PCR, STR profiling, CODIS)
 * - Fingerprint analysis (patterns, AFIS, comparison)
 * - Ballistics (trajectory, striations, GSR)
 * - Toxicology (drug metabolism, sampling, interpretation)
 * - Digital forensics (chain of custody, data recovery)
 *
 * Total: 18 specialized prompts
 *
 * Ralph Loop - COMPLETE checkpoint
 */

import type { FewShotExample } from './index';

// =============================================================================
// FORENSICS DOMAIN PROMPT
// =============================================================================

/**
 * Base forensics domain prompt for forensic science diagrams
 */
export const FORENSICS_DOMAIN_PROMPT = `
Forensics diagram requirements:
- Follow chain of custody documentation standards
- Use standard evidence labeling conventions (item numbers, dates)
- Include scale markers in all physical evidence diagrams
- Show directional indicators (North arrow for scene diagrams)
- Use color coding: Evidence (yellow), Reference samples (blue), Controls (green)
- Mark collection methods and preservation requirements
- Include quality assurance checkpoints
- Show analytical workflow with decision points
- Include statistical interpretation where applicable
- Mark admissibility considerations for court presentation`;

// =============================================================================
// FORENSICS-SPECIFIC PROMPTS
// =============================================================================

export const FORENSICS_PROMPTS = {
  // Crime Scene Analysis
  crimeSceneProcessing: `
Crime Scene Processing requirements:
- Show systematic approach (perimeter, documentation, collection)
- Include scene security and access control
- Mark photography positions (overview, mid-range, close-up)
- Show search patterns (grid, spiral, strip, quadrant)
- Include evidence marker placement
- Mark fragile evidence priorities
- Show witness/suspect separation areas
- Include scene sketch requirements`,

  evidenceCollection: `
Evidence Collection Protocol requirements:
- Show proper collection techniques per evidence type
- Include packaging requirements (paper vs plastic)
- Mark contamination prevention measures
- Show labeling requirements (case, item, collector, date)
- Include chain of custody initiation
- Mark preservation conditions (temperature, humidity)
- Show transportation considerations
- Include laboratory submission forms`,

  bloodstainPatterns: `
Bloodstain Pattern Analysis requirements:
- Show pattern types (passive, projected, transfer)
- Include spatter pattern characteristics
- Mark directionality from stain shape (elliptical analysis)
- Show angle of impact calculation
- Include area of origin determination (stringing)
- Mark void patterns indicating object position
- Show cast-off patterns from weapons
- Include transfer and contact patterns`,

  // DNA Analysis
  dnaExtractionWorkflow: `
DNA Extraction Workflow requirements:
- Show sample types (blood, saliva, touch DNA)
- Include lysis and protein digestion steps
- Mark purification method (organic, solid phase)
- Show quantification checkpoint
- Include quality metrics (260/280 ratio)
- Mark degradation assessment
- Show inhibitor removal steps
- Include sample tracking throughout`,

  pcrAmplification: `
PCR Amplification for Forensics requirements:
- Show STR loci selection (CODIS core loci)
- Include thermal cycling profile (denature, anneal, extend)
- Mark multiplex primer design
- Show fluorescent labeling scheme
- Include positive and negative controls
- Mark cycle number optimization
- Show plateau effect and stochastic threshold
- Include contamination prevention measures`,

  strProfileInterpretation: `
STR Profile Interpretation requirements:
- Show electropherogram with peaks at loci
- Include allele calling thresholds
- Mark stutter peak identification
- Show mixture deconvolution principles
- Include statistical analysis (RMP, LR)
- Mark artifacts (pull-up, -A peaks)
- Show comparison to reference profiles
- Include database search (CODIS) workflow`,

  // Fingerprint Analysis
  fingerprintClassification: `
Fingerprint Classification requirements:
- Show three main pattern types (loop, whorl, arch)
- Include subclassifications (radial/ulnar loop, plain/tented arch)
- Mark core and delta points
- Show ridge counting methods
- Include Henry classification system
- Mark NCIC FPC codes
- Show pattern frequency in population
- Include filing and retrieval systems`,

  fingerprintComparison: `
Fingerprint Comparison (ACE-V) requirements:
- Show Analysis phase (pattern, quality, features)
- Include Comparison phase (side-by-side)
- Mark Evaluation phase (identification, exclusion, inconclusive)
- Show Verification phase (independent examiner)
- Include minutiae types (ending, bifurcation, dot)
- Mark Level 1, 2, 3 details
- Show sufficient agreement determination
- Include documentation requirements`,

  afisSearch: `
AFIS Search Process requirements:
- Show image capture and enhancement
- Include minutiae extraction algorithm
- Mark search parameters setting
- Show candidate list generation
- Include score threshold determination
- Mark examiner review of candidates
- Show hit confirmation process
- Include lights-out vs examiner-assisted searches`,

  // Ballistics
  bulletTrajectory: `
Bullet Trajectory Analysis requirements:
- Show trajectory rod/laser placement
- Include entry and exit wound characteristics
- Mark impact angles and ricochet patterns
- Show trajectory reconstruction methods
- Include height and distance calculations
- Mark intermediate targets
- Show shooting position determination
- Include environmental factors (wind, gravity)`,

  firearmIdentification: `
Firearm Identification requirements:
- Show class characteristics (caliber, rifling)
- Include individual characteristics (striations)
- Mark comparison microscopy setup
- Show lands and grooves measurement
- Include twist direction and rate
- Mark breech face impressions
- Show firing pin impressions
- Include ejector and extractor marks`,

  gunshowResidueAnalysis: `
Gunshot Residue (GSR) Analysis requirements:
- Show particle composition (Pb, Ba, Sb)
- Include collection methods (tape lift, swab)
- Mark SEM-EDS analysis workflow
- Show characteristic particle morphology
- Include distribution patterns on hands
- Mark persistence and transfer considerations
- Show interpretation guidelines
- Include contamination sources`,

  // Toxicology
  drugMetabolismPathway: `
Drug Metabolism Pathway requirements:
- Show Phase I metabolism (oxidation, reduction, hydrolysis)
- Include Phase II conjugation reactions
- Mark CYP450 enzyme involvement
- Show parent drug to metabolite conversion
- Include detection windows per matrix
- Mark active vs inactive metabolites
- Show individual variation factors
- Include drug-drug interactions`,

  toxicologySampling: `
Toxicology Sample Collection requirements:
- Show appropriate matrices (blood, urine, hair, vitreous)
- Include collection timing considerations
- Mark preservatives and anticoagulants
- Show storage requirements
- Include postmortem redistribution effects
- Mark specimen priority for autopsy
- Show chain of custody for samples
- Include volume requirements per test`,

  toxicologyInterpretation: `
Toxicology Interpretation requirements:
- Show reference ranges and therapeutic levels
- Include lethal concentration data
- Mark tolerance and polydrug effects
- Show postmortem vs antemortem differences
- Include pharmacokinetic considerations
- Mark cause vs manner of death contribution
- Show reporting conventions
- Include expert testimony preparation`,

  // Digital Forensics
  digitalChainOfCustody: `
Digital Evidence Chain of Custody requirements:
- Show acquisition documentation (date, time, examiner)
- Include write-blocker usage verification
- Mark hash value calculation (MD5, SHA-256)
- Show evidence storage and handling
- Include access log maintenance
- Mark imaging vs live acquisition decisions
- Show verification of forensic copies
- Include cloud evidence considerations`,

  dataRecoveryProcess: `
Data Recovery Process requirements:
- Show file system analysis (FAT, NTFS, ext4)
- Include deleted file recovery methods
- Mark slack space examination
- Show carving techniques for fragments
- Include metadata extraction
- Mark timeline reconstruction
- Show encrypted data handling
- Include mobile device acquisition`,

  networkForensics: `
Network Forensics requirements:
- Show packet capture and analysis
- Include log file correlation
- Mark IP address tracing methods
- Show intrusion detection evidence
- Include malware traffic patterns
- Mark attribution challenges
- Show legal authority requirements
- Include ISP record requests`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

export const FORENSICS_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a DNA analysis workflow diagram from crime scene to court',
    output: `flowchart TB
    subgraph scene["Crime Scene"]
        collect["Evidence Collection<br/>Proper handling & packaging"]
        document["Documentation<br/>Photos, notes, chain of custody"]
    end

    subgraph lab["Laboratory Analysis"]
        extract["DNA Extraction<br/>Lysis, purification"]
        quant["Quantification<br/>Real-time PCR"]
        amp["PCR Amplification<br/>STR multiplex"]
        sep["Capillary Electrophoresis<br/>Fragment separation"]
        profile["Profile Generation<br/>Allele calling"]
    end

    subgraph interpret["Interpretation"]
        compare["Profile Comparison<br/>Reference vs evidence"]
        stats["Statistical Analysis<br/>Random match probability"]
        codis["CODIS Search<br/>Database comparison"]
    end

    subgraph court["Court"]
        report["Technical Report<br/>Methods & results"]
        testimony["Expert Testimony<br/>Interpretation for jury"]
    end

    collect --> document
    document --> extract
    extract --> quant
    quant --> amp
    amp --> sep
    sep --> profile
    profile --> compare
    compare --> stats
    stats --> codis
    codis --> report
    report --> testimony

    classDef scene fill:#fef3c7,stroke:#d97706
    classDef lab fill:#dbeafe,stroke:#2563eb
    classDef interpret fill:#dcfce7,stroke:#16a34a
    classDef court fill:#e0e7ff,stroke:#6366f1

    class collect,document scene
    class extract,quant,amp,sep,profile lab
    class compare,stats,codis interpret
    class report,testimony court`,
    reasoning: 'Shows complete DNA evidence workflow from collection to court presentation',
  },
  {
    prompt: 'Create a fingerprint ACE-V methodology diagram',
    output: `flowchart TB
    subgraph acev["ACE-V Methodology"]
        subgraph analysis["A - Analysis"]
            assess["Assess print quality"]
            pattern["Determine pattern type"]
            minutiae["Mark minutiae"]
        end

        subgraph comparison["C - Comparison"]
            sidebyside["Side-by-side examination"]
            target["Target group analysis"]
            tolerance["Account for distortion"]
        end

        subgraph evaluation["E - Evaluation"]
            ident["IDENTIFICATION<br/>Sufficient agreement"]
            excl["EXCLUSION<br/>Unexplained differences"]
            incon["INCONCLUSIVE<br/>Insufficient quality/quantity"]
        end

        subgraph verification["V - Verification"]
            blind["Blind verification<br/>Independent examiner"]
            document_v["Document conclusions"]
        end
    end

    assess --> pattern
    pattern --> minutiae
    minutiae --> sidebyside
    sidebyside --> target
    target --> tolerance
    tolerance --> ident
    tolerance --> excl
    tolerance --> incon
    ident --> blind
    excl --> blind
    incon --> blind
    blind --> document_v

    classDef analysis fill:#dbeafe,stroke:#2563eb
    classDef comparison fill:#fef3c7,stroke:#d97706
    classDef ident fill:#dcfce7,stroke:#16a34a
    classDef excl fill:#fecaca,stroke:#dc2626
    classDef incon fill:#e5e7eb,stroke:#6b7280

    class assess,pattern,minutiae analysis
    class sidebyside,target,tolerance comparison
    class ident ident
    class excl excl
    class incon incon`,
    reasoning: 'Illustrates the standard fingerprint examination methodology used in forensic labs',
  },
  {
    prompt: 'Create a bloodstain pattern analysis diagram',
    output: `flowchart TB
    subgraph patterns["Bloodstain Pattern Types"]
        subgraph passive["Passive Patterns"]
            drop["Drop patterns<br/>Gravity only"]
            pool["Blood pools<br/>Accumulation"]
            flow["Flow patterns<br/>Gravity influenced"]
        end

        subgraph projected["Projected Patterns"]
            impact["Impact spatter<br/>Force applied"]
            castoff["Cast-off<br/>Swinging object"]
            arterial["Arterial spurts<br/>Blood pressure"]
        end

        subgraph transfer["Transfer Patterns"]
            wipe["Wipe<br/>Movement through blood"]
            swipe["Swipe<br/>Bloody object moved"]
            contact["Contact<br/>Direct transfer"]
        end
    end

    subgraph analysis["Pattern Analysis"]
        direction["Directionality<br/>Stain elongation"]
        angle["Impact Angle<br/>Width/length ratio"]
        origin["Area of Origin<br/>String method"]
    end

    impact --> direction
    direction --> angle
    angle --> origin

    note["sin(angle) = width / length<br/>Used for trajectory reconstruction"]

    classDef passive fill:#dbeafe,stroke:#2563eb
    classDef projected fill:#fecaca,stroke:#dc2626
    classDef transfer fill:#fef3c7,stroke:#d97706
    classDef analysis fill:#dcfce7,stroke:#16a34a

    class drop,pool,flow passive
    class impact,castoff,arterial projected
    class wipe,swipe,contact transfer
    class direction,angle,origin analysis`,
    reasoning: 'Shows classification of bloodstain patterns and basic analysis principles',
  },
];

// =============================================================================
// PROMPT CATEGORIES
// =============================================================================

/**
 * Organized forensics prompt categories for UI grouping
 */
export const FORENSICS_PROMPT_CATEGORIES = {
  crimeScene: {
    name: 'Crime Scene Analysis',
    prompts: ['crimeSceneProcessing', 'evidenceCollection', 'bloodstainPatterns'],
  },
  dnaAnalysis: {
    name: 'DNA Analysis',
    prompts: ['dnaExtractionWorkflow', 'pcrAmplification', 'strProfileInterpretation'],
  },
  fingerprints: {
    name: 'Fingerprint Analysis',
    prompts: ['fingerprintClassification', 'fingerprintComparison', 'afisSearch'],
  },
  ballistics: {
    name: 'Ballistics & Firearms',
    prompts: ['bulletTrajectory', 'firearmIdentification', 'gunshowResidueAnalysis'],
  },
  toxicology: {
    name: 'Forensic Toxicology',
    prompts: ['drugMetabolismPathway', 'toxicologySampling', 'toxicologyInterpretation'],
  },
  digital: {
    name: 'Digital Forensics',
    prompts: ['digitalChainOfCustody', 'dataRecoveryProcess', 'networkForensics'],
  },
};

/**
 * Get a specific forensics prompt by key
 */
export function getForensicsPrompt(key: keyof typeof FORENSICS_PROMPTS): string {
  return FORENSICS_PROMPTS[key];
}

/**
 * Get all forensics prompts as an array
 */
export function getAllForensicsPrompts(): { key: string; prompt: string }[] {
  return Object.entries(FORENSICS_PROMPTS).map(([key, prompt]) => ({
    key,
    prompt,
  }));
}

/**
 * Get prompts by category
 */
export function getForensicsPromptsByCategory(category: keyof typeof FORENSICS_PROMPT_CATEGORIES): string[] {
  const categoryData = FORENSICS_PROMPT_CATEGORIES[category];
  return categoryData.prompts.map((key) => FORENSICS_PROMPTS[key as keyof typeof FORENSICS_PROMPTS]);
}

const forensicsPrompts = {
  FORENSICS_DOMAIN_PROMPT,
  FORENSICS_PROMPTS,
  FORENSICS_FEW_SHOT_EXAMPLES,
  FORENSICS_PROMPT_CATEGORIES,
  getForensicsPrompt,
  getAllForensicsPrompts,
  getForensicsPromptsByCategory,
};
export default forensicsPrompts;
