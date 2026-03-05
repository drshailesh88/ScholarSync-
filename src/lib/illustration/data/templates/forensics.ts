/**
 * forensics.ts
 * Forensic Science diagram templates for FINNISH
 *
 * Contains comprehensive templates for forensic sciences including:
 * - Evidence analysis diagrams
 * - Research methodology flowcharts
 * - Classification systems
 * - Forensic process flows
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// NATURAL PHENOMENA / ANALYSIS
// =============================================================================

/**
 * DNA Analysis Workflow template
 */
export const dnaAnalysisWorkflow: DiagramTemplate = {
  id: 'forensic-dna-analysis',
  name: 'DNA Analysis Workflow',
  description: 'Complete forensic DNA profiling process from sample to courtroom',
  domain: 'chemistry',
  promptTemplate: `Create a DNA analysis workflow diagram:
- Sample collection: {{sampleCollection}}
- DNA extraction: {{dnaExtraction}}
- PCR amplification: {{pcrAmplification}}
- STR analysis: {{strAnalysis}}
- Profile interpretation: {{profileInterpretation}}
- Database comparison: {{databaseComparison}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'sampleCollection',
    'dnaExtraction',
    'pcrAmplification',
    'strAnalysis',
    'profileInterpretation',
    'databaseComparison',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    SAMP["Sample Collection"] --> PRES["Preservation"]
    PRES --> EXT["DNA Extraction"]
    EXT --> QUANT["Quantification"]
    QUANT --> PCR["PCR Amplification"]
    PCR --> CE["Capillary Electrophoresis"]
    CE --> PROF["DNA Profile"]
    PROF --> DB["CODIS Database"]
    DB --> MATCH["Match/Exclusion"]
    style SAMP fill:#4169E1
    style MATCH fill:#228B22`,
};

/**
 * Fingerprint Analysis template
 */
export const fingerprintAnalysis: DiagramTemplate = {
  id: 'forensic-fingerprint-analysis',
  name: 'Fingerprint Analysis Process',
  description: 'Latent fingerprint detection, development, and comparison',
  domain: 'chemistry',
  promptTemplate: `Create a fingerprint analysis diagram:
- Detection methods: {{detectionMethods}}
- Development techniques: {{developmentTechniques}}
- Photography: {{photography}}
- Enhancement: {{enhancement}}
- Comparison methodology: {{comparisonMethodology}}
- AFIS search: {{afisSearch}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'detectionMethods',
    'developmentTechniques',
    'photography',
    'enhancement',
    'comparisonMethodology',
    'afisSearch',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    SCENE["Crime Scene"] --> DETECT["Detection"]
    DETECT --> POWDER["Powder Development"]
    DETECT --> CHEM["Chemical Development"]
    POWDER & CHEM --> PHOTO["Photography"]
    PHOTO --> LIFT["Lifting"]
    LIFT --> SCAN["Digital Scanning"]
    SCAN --> AFIS["AFIS Search"]
    AFIS --> COMP["Manual Comparison"]
    COMP --> REPORT["Expert Report"]
    style SCENE fill:#4169E1
    style REPORT fill:#228B22`,
};

/**
 * Toxicology Screening template
 */
export const toxicologyScreening: DiagramTemplate = {
  id: 'forensic-toxicology-screening',
  name: 'Toxicology Screening Process',
  description: 'Drug and poison detection in biological specimens',
  domain: 'chemistry',
  promptTemplate: `Create a toxicology screening diagram:
- Specimen types: {{specimenTypes}}
- Screening methods: {{screeningMethods}}
- Confirmation analysis: {{confirmationAnalysis}}
- Quantitation: {{quantitation}}
- Result interpretation: {{resultInterpretation}}
- Report generation: {{reportGeneration}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'specimenTypes',
    'screeningMethods',
    'confirmationAnalysis',
    'quantitation',
    'resultInterpretation',
    'reportGeneration',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    SPEC["Specimen Receipt"] --> PREP["Sample Preparation"]
    PREP --> SCREEN["Immunoassay Screening"]
    SCREEN -->|"Positive"| CONF["GC-MS Confirmation"]
    SCREEN -->|"Negative"| REP1["Report Negative"]
    CONF --> QUANT["Quantitation"]
    QUANT --> INTERP["Interpretation"]
    INTERP --> REPORT["Final Report"]
    style SPEC fill:#DC143C
    style REPORT fill:#228B22`,
};

/**
 * Ballistics Analysis template
 */
export const ballisticsAnalysis: DiagramTemplate = {
  id: 'forensic-ballistics-analysis',
  name: 'Ballistics Analysis Process',
  description: 'Firearm and ammunition examination workflow',
  domain: 'chemistry',
  promptTemplate: `Create a ballistics analysis diagram:
- Evidence collection: {{evidenceCollection}}
- Firearm examination: {{firearmExamination}}
- Bullet comparison: {{bulletComparison}}
- Cartridge case analysis: {{cartridgeCaseAnalysis}}
- Test firing: {{testFiring}}
- NIBIN entry: {{nibinEntry}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'evidenceCollection',
    'firearmExamination',
    'bulletComparison',
    'cartridgeCaseAnalysis',
    'testFiring',
    'nibinEntry',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    EVID["Evidence Receipt"] --> EXAM["Firearm Examination"]
    EVID --> BULL["Bullet Recovery"]
    EVID --> CASE["Casing Recovery"]
    EXAM --> TEST["Test Firing"]
    TEST --> COMP["Microscopic Comparison"]
    BULL --> COMP
    CASE --> COMP
    COMP --> NIBIN["NIBIN Database"]
    NIBIN --> MATCH["Match/No Match"]
    style EVID fill:#808080
    style MATCH fill:#228B22`,
};

// =============================================================================
// RESEARCH METHODOLOGIES
// =============================================================================

/**
 * Crime Scene Investigation template
 */
export const crimeSceneInvestigation: DiagramTemplate = {
  id: 'forensic-csi-workflow',
  name: 'Crime Scene Investigation',
  description: 'Systematic crime scene processing methodology',
  domain: 'chemistry',
  promptTemplate: `Create a crime scene investigation workflow:
- Scene security: {{sceneSecurity}}
- Documentation: {{documentation}}
- Evidence search: {{evidenceSearch}}
- Evidence collection: {{evidenceCollection}}
- Chain of custody: {{chainOfCustody}}
- Scene release: {{sceneRelease}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'sceneSecurity',
    'documentation',
    'evidenceSearch',
    'evidenceCollection',
    'chainOfCustody',
    'sceneRelease',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    ARRIVE["Scene Arrival"] --> SECURE["Secure Perimeter"]
    SECURE --> WALK["Initial Walk-Through"]
    WALK --> DOC["Documentation"]
    DOC --> PHOTO["Photography"]
    DOC --> SKETCH["Sketching"]
    PHOTO & SKETCH --> SEARCH["Evidence Search"]
    SEARCH --> COLL["Collection"]
    COLL --> PACK["Packaging"]
    PACK --> COC["Chain of Custody"]
    COC --> LAB["Laboratory"]
    style ARRIVE fill:#DC143C
    style LAB fill:#228B22`,
};

/**
 * Digital Forensics Workflow template
 */
export const digitalForensicsWorkflow: DiagramTemplate = {
  id: 'forensic-digital-workflow',
  name: 'Digital Forensics Workflow',
  description: 'Computer and mobile device forensic examination process',
  domain: 'chemistry',
  promptTemplate: `Create a digital forensics workflow:
- Evidence seizure: {{evidenceSeizure}}
- Device imaging: {{deviceImaging}}
- Data recovery: {{dataRecovery}}
- Artifact analysis: {{artifactAnalysis}}
- Timeline reconstruction: {{timelineReconstruction}}
- Report documentation: {{reportDocumentation}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'evidenceSeizure',
    'deviceImaging',
    'dataRecovery',
    'artifactAnalysis',
    'timelineReconstruction',
    'reportDocumentation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    SEIZE["Evidence Seizure"] --> DOC["Documentation"]
    DOC --> WRITE["Write Block"]
    WRITE --> IMAGE["Forensic Image"]
    IMAGE --> HASH["Hash Verification"]
    HASH --> ANAL["Analysis"]
    ANAL --> FILES["File System"]
    ANAL --> REG["Registry"]
    ANAL --> NET["Network Artifacts"]
    FILES & REG & NET --> TIME["Timeline"]
    TIME --> REPORT["Report"]
    style SEIZE fill:#4169E1
    style REPORT fill:#228B22`,
};

/**
 * Forensic Pathology Examination template
 */
export const forensicPathologyExamination: DiagramTemplate = {
  id: 'forensic-pathology-exam',
  name: 'Forensic Pathology Examination',
  description: 'Medicolegal autopsy and death investigation',
  domain: 'chemistry',
  promptTemplate: `Create a forensic pathology examination diagram:
- External examination: {{externalExamination}}
- Internal examination: {{internalExamination}}
- Specimen collection: {{specimenCollection}}
- Ancillary studies: {{ancillaryStudies}}
- Cause of death: {{causeOfDeath}}
- Manner of death: {{mannerOfDeath}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'externalExamination',
    'internalExamination',
    'specimenCollection',
    'ancillaryStudies',
    'causeOfDeath',
    'mannerOfDeath',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    CASE["Case Receipt"] --> HIST["History Review"]
    HIST --> EXT["External Exam"]
    EXT --> PHOTO["Photography"]
    PHOTO --> INT["Internal Exam"]
    INT --> SPEC["Specimen Collection"]
    SPEC --> TOX["Toxicology"]
    SPEC --> HISTO["Histology"]
    TOX & HISTO --> INTERP["Interpretation"]
    INTERP --> COD["Cause of Death"]
    COD --> MOD["Manner of Death"]
    style CASE fill:#DC143C
    style MOD fill:#228B22`,
};

// =============================================================================
// CLASSIFICATION SYSTEMS
// =============================================================================

/**
 * Evidence Classification template
 */
export const evidenceClassification: DiagramTemplate = {
  id: 'forensic-evidence-classification',
  name: 'Evidence Classification System',
  description: 'Types of forensic evidence and their characteristics',
  domain: 'chemistry',
  promptTemplate: `Create an evidence classification diagram:
- Physical evidence: {{physicalEvidence}}
- Biological evidence: {{biologicalEvidence}}
- Trace evidence: {{traceEvidence}}
- Digital evidence: {{digitalEvidence}}
- Documentary evidence: {{documentaryEvidence}}
- Testimonial evidence: {{testimonialEvidence}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'physicalEvidence',
    'biologicalEvidence',
    'traceEvidence',
    'digitalEvidence',
    'documentaryEvidence',
    'testimonialEvidence',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    EVID["Evidence Types"] --> PHYS["Physical"]
    EVID --> BIO["Biological"]
    EVID --> TRACE["Trace"]
    EVID --> DIG["Digital"]
    PHYS --> WEAPON["Weapons"]
    PHYS --> TOOL["Tool Marks"]
    BIO --> DNA["DNA"]
    BIO --> BLOOD["Blood"]
    TRACE --> FIBER["Fibers"]
    TRACE --> PRINT["Fingerprints"]
    style EVID fill:#4169E1
    style DNA fill:#DC143C`,
};

/**
 * Wound Classification template
 */
export const woundClassification: DiagramTemplate = {
  id: 'forensic-wound-classification',
  name: 'Wound Classification System',
  description: 'Medicolegal classification of injuries and wounds',
  domain: 'chemistry',
  promptTemplate: `Create a wound classification diagram:
- Blunt force injuries: {{bluntForceInjuries}}
- Sharp force injuries: {{sharpForceInjuries}}
- Gunshot wounds: {{gunshotWounds}}
- Asphyxial injuries: {{asphyxialInjuries}}
- Thermal injuries: {{thermalInjuries}}
- Defense wounds: {{defenseWounds}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'bluntForceInjuries',
    'sharpForceInjuries',
    'gunshotWounds',
    'asphyxialInjuries',
    'thermalInjuries',
    'defenseWounds',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    WOUND["Wound Types"] --> BLUNT["Blunt Force"]
    WOUND --> SHARP["Sharp Force"]
    WOUND --> GSW["Gunshot"]
    WOUND --> ASPH["Asphyxia"]
    BLUNT --> ABRAS["Abrasions"]
    BLUNT --> CONT["Contusions"]
    BLUNT --> LAC["Lacerations"]
    SHARP --> INCIS["Incised"]
    SHARP --> STAB["Stab"]
    GSW --> ENT["Entrance"]
    GSW --> EXIT["Exit"]
    style WOUND fill:#DC143C
    style GSW fill:#808080`,
};

/**
 * Drug Classification template
 */
export const drugClassificationForensic: DiagramTemplate = {
  id: 'forensic-drug-classification',
  name: 'Controlled Substance Classification',
  description: 'DEA scheduling and forensic drug categories',
  domain: 'chemistry',
  promptTemplate: `Create a drug classification diagram:
- Schedule I substances: {{scheduleI}}
- Schedule II substances: {{scheduleII}}
- Depressants: {{depressants}}
- Stimulants: {{stimulants}}
- Hallucinogens: {{hallucinogens}}
- Designer drugs: {{designerDrugs}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'scheduleI',
    'scheduleII',
    'depressants',
    'stimulants',
    'hallucinogens',
    'designerDrugs',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    DRUG["Controlled Substances"] --> SCH1["Schedule I"]
    DRUG --> SCH2["Schedule II"]
    DRUG --> SCH35["Schedule III-V"]
    SCH1 --> HERO["Heroin"]
    SCH1 --> LSD["LSD"]
    SCH2 --> COKE["Cocaine"]
    SCH2 --> METH["Methamphetamine"]
    SCH2 --> OXY["Oxycodone"]
    style SCH1 fill:#DC143C
    style SCH2 fill:#FF4500`,
};

// =============================================================================
// PROCESS FLOWS
// =============================================================================

/**
 * Chain of Custody template
 */
export const chainOfCustody: DiagramTemplate = {
  id: 'forensic-chain-custody',
  name: 'Chain of Custody Process',
  description: 'Evidence handling and documentation from scene to court',
  domain: 'chemistry',
  promptTemplate: `Create a chain of custody diagram:
- Collection documentation: {{collectionDocumentation}}
- Packaging requirements: {{packagingRequirements}}
- Transfer protocols: {{transferProtocols}}
- Storage conditions: {{storageConditions}}
- Laboratory handling: {{laboratoryHandling}}
- Court presentation: {{courtPresentation}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'collectionDocumentation',
    'packagingRequirements',
    'transferProtocols',
    'storageConditions',
    'laboratoryHandling',
    'courtPresentation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    COLL["Collection"] --> DOC["Documentation"]
    DOC --> PACK["Packaging"]
    PACK --> SEAL["Sealing"]
    SEAL --> LOG["Evidence Log"]
    LOG --> TRANS["Transport"]
    TRANS --> LAB["Laboratory"]
    LAB --> STOR["Storage"]
    STOR --> COURT["Court"]
    style COLL fill:#4169E1
    style COURT fill:#228B22`,
};

/**
 * Trace Evidence Analysis template
 */
export const traceEvidenceAnalysis: DiagramTemplate = {
  id: 'forensic-trace-analysis',
  name: 'Trace Evidence Analysis',
  description: 'Microscopic and instrumental analysis of trace materials',
  domain: 'chemistry',
  promptTemplate: `Create a trace evidence analysis diagram:
- Collection methods: {{collectionMethods}}
- Visual examination: {{visualExamination}}
- Microscopic analysis: {{microscopicAnalysis}}
- Instrumental methods: {{instrumentalMethods}}
- Comparison analysis: {{comparisonAnalysis}}
- Result interpretation: {{resultInterpretation}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'collectionMethods',
    'visualExamination',
    'microscopicAnalysis',
    'instrumentalMethods',
    'comparisonAnalysis',
    'resultInterpretation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    EVID["Trace Evidence"] --> VIS["Visual Exam"]
    VIS --> STEREO["Stereomicroscopy"]
    STEREO --> CLASS["Classification"]
    CLASS --> FIBER["Fiber"]
    CLASS --> HAIR["Hair"]
    CLASS --> GLASS["Glass"]
    FIBER --> MICR["Microscopy"]
    FIBER --> FTIR["FTIR"]
    GLASS --> RI["Refractive Index"]
    GLASS --> SEM["SEM-EDS"]
    style EVID fill:#4169E1
    style FTIR fill:#228B22`,
};

/**
 * Bloodstain Pattern Analysis template
 */
export const bloodstainPatternAnalysis: DiagramTemplate = {
  id: 'forensic-bloodstain-analysis',
  name: 'Bloodstain Pattern Analysis',
  description: 'Interpretation of blood evidence and crime reconstruction',
  domain: 'chemistry',
  promptTemplate: `Create a bloodstain pattern analysis diagram:
- Pattern recognition: {{patternRecognition}}
- Stain classification: {{stainClassification}}
- Directionality: {{directionality}}
- Point of origin: {{pointOfOrigin}}
- Event sequencing: {{eventSequencing}}
- Scene reconstruction: {{sceneReconstruction}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'patternRecognition',
    'stainClassification',
    'directionality',
    'pointOfOrigin',
    'eventSequencing',
    'sceneReconstruction',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    BLOOD["Bloodstain Evidence"] --> DOC["Documentation"]
    DOC --> CLASS["Classification"]
    CLASS --> SPAT["Spatter"]
    CLASS --> TRANS["Transfer"]
    CLASS --> POOL["Pooling"]
    SPAT --> DIR["Directionality"]
    DIR --> ANGLE["Impact Angle"]
    ANGLE --> ORIGIN["Area of Origin"]
    ORIGIN --> RECON["Reconstruction"]
    style BLOOD fill:#DC143C
    style RECON fill:#228B22`,
};

/**
 * Document Examination template
 */
export const documentExamination: DiagramTemplate = {
  id: 'forensic-document-examination',
  name: 'Document Examination Process',
  description: 'Handwriting analysis and document authentication',
  domain: 'chemistry',
  promptTemplate: `Create a document examination diagram:
- Document intake: {{documentIntake}}
- Physical examination: {{physicalExamination}}
- Handwriting comparison: {{handwritingComparison}}
- Ink analysis: {{inkAnalysis}}
- Paper analysis: {{paperAnalysis}}
- Alteration detection: {{alterationDetection}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'documentIntake',
    'physicalExamination',
    'handwritingComparison',
    'inkAnalysis',
    'paperAnalysis',
    'alterationDetection',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    DOC["Questioned Document"] --> EXAM["Physical Examination"]
    EXAM --> PHOTO["Photography"]
    PHOTO --> HAND["Handwriting Analysis"]
    PHOTO --> INK["Ink Examination"]
    PHOTO --> PAPER["Paper Analysis"]
    HAND --> KNOWN["Known Samples"]
    KNOWN --> COMP["Comparison"]
    INK --> CHEM["Chemical Analysis"]
    COMP & CHEM --> OPIN["Expert Opinion"]
    style DOC fill:#4169E1
    style OPIN fill:#228B22`,
};

/**
 * Forensic Entomology template
 */
export const forensicEntomology: DiagramTemplate = {
  id: 'forensic-entomology',
  name: 'Forensic Entomology Process',
  description: 'Insect evidence for post-mortem interval estimation',
  domain: 'chemistry',
  promptTemplate: `Create a forensic entomology diagram:
- Insect collection: {{insectCollection}}
- Species identification: {{speciesIdentification}}
- Life stage determination: {{lifeStageDetermination}}
- Temperature data: {{temperatureData}}
- PMI calculation: {{pmiCalculation}}
- Report generation: {{reportGeneration}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'insectCollection',
    'speciesIdentification',
    'lifeStageDetermination',
    'temperatureData',
    'pmiCalculation',
    'reportGeneration',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    BODY["Remains"] --> COLL["Insect Collection"]
    COLL --> ADULT["Adult Specimens"]
    COLL --> LARV["Larvae Specimens"]
    ADULT --> ID["Species ID"]
    LARV --> STAGE["Life Stage"]
    STAGE --> REAR["Rearing"]
    ID & STAGE --> TEMP["Temperature Data"]
    TEMP --> ADD["ADD Calculation"]
    ADD --> PMI["PMI Estimate"]
    style BODY fill:#808080
    style PMI fill:#228B22`,
};

/**
 * Expert Witness Process template
 */
export const expertWitnessProcess: DiagramTemplate = {
  id: 'forensic-expert-witness',
  name: 'Expert Witness Process',
  description: 'Forensic expert testimony preparation and delivery',
  domain: 'chemistry',
  promptTemplate: `Create an expert witness process diagram:
- Case review: {{caseReview}}
- Analysis completion: {{analysisCompletion}}
- Report writing: {{reportWriting}}
- Deposition preparation: {{depositionPreparation}}
- Courtroom testimony: {{courtroomTestimony}}
- Cross-examination: {{crossExamination}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'caseReview',
    'analysisCompletion',
    'reportWriting',
    'depositionPreparation',
    'courtroomTestimony',
    'crossExamination',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    CASE["Case Assignment"] --> ANAL["Analysis"]
    ANAL --> REPORT["Report Writing"]
    REPORT --> REV["Attorney Review"]
    REV --> DEP["Deposition"]
    DEP --> PREP["Trial Preparation"]
    PREP --> DIRECT["Direct Examination"]
    DIRECT --> CROSS["Cross-Examination"]
    CROSS --> REDIRECT["Redirect"]
    style CASE fill:#4169E1
    style DIRECT fill:#228B22`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All forensics templates
 */
export const forensicsTemplates: DiagramTemplate[] = [
  // Natural Phenomena / Analysis
  dnaAnalysisWorkflow,
  fingerprintAnalysis,
  toxicologyScreening,
  ballisticsAnalysis,
  // Research Methodologies
  crimeSceneInvestigation,
  digitalForensicsWorkflow,
  forensicPathologyExamination,
  // Classification Systems
  evidenceClassification,
  woundClassification,
  drugClassificationForensic,
  // Process Flows
  chainOfCustody,
  traceEvidenceAnalysis,
  bloodstainPatternAnalysis,
  documentExamination,
  forensicEntomology,
  expertWitnessProcess,
];

export default forensicsTemplates;
