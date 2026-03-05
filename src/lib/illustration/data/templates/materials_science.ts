/**
 * materials_science.ts
 * Materials Science diagram templates for FINNISH
 *
 * Contains comprehensive templates for materials science including:
 * - Material structure diagrams
 * - Research methodology flowcharts
 * - Classification systems
 * - Processing and characterization flows
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// NATURAL PHENOMENA / STRUCTURE
// =============================================================================

/**
 * Crystal Structure Diagram template
 */
export const crystalStructureDiagram: DiagramTemplate = {
  id: 'mat-crystal-structure',
  name: 'Crystal Structure Diagram',
  description: 'Unit cell and lattice structure visualization for crystalline materials',
  domain: 'engineering',
  promptTemplate: `Create a crystal structure diagram showing:
- Crystal system: {{crystalSystem}}
- Lattice parameters: {{latticeParameters}}
- Atomic positions: {{atomicPositions}}
- Coordination number: {{coordinationNumber}}
- Symmetry elements: {{symmetryElements}}
- Miller indices: {{millerIndices}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'crystalSystem',
    'latticeParameters',
    'atomicPositions',
    'coordinationNumber',
    'symmetryElements',
    'millerIndices',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph UnitCell["Unit Cell Types"]
        SC["Simple Cubic"]
        BCC["Body-Centered Cubic"]
        FCC["Face-Centered Cubic"]
        HCP["Hexagonal Close-Packed"]
    end
    SC --> CN6["CN = 6"]
    BCC --> CN8["CN = 8"]
    FCC --> CN12["CN = 12"]
    HCP --> CN12
    style FCC fill:#FFD700
    style BCC fill:#C0C0C0`,
};

/**
 * Phase Diagram template
 */
export const phaseDiagramTemplate: DiagramTemplate = {
  id: 'mat-phase-diagram',
  name: 'Binary Phase Diagram',
  description: 'Temperature-composition phase diagram for binary alloy systems',
  domain: 'engineering',
  promptTemplate: `Create a phase diagram showing:
- Components: {{components}}
- Phase regions: {{phaseRegions}}
- Invariant reactions: {{invariantReactions}}
- Solidus and liquidus: {{solidusLiquidus}}
- Solvus lines: {{solvusLines}}
- Key compositions: {{keyCompositions}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'components',
    'phaseRegions',
    'invariantReactions',
    'solidusLiquidus',
    'solvusLines',
    'keyCompositions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    LIQ["Liquid"] --> SOL["Solidification"]
    SOL --> ALPHA["α Phase"]
    SOL --> BETA["β Phase"]
    SOL --> EUT["Eutectic"]
    EUT --> ALPHAB["α + β Mixture"]
    style LIQ fill:#DC143C
    style ALPHAB fill:#4169E1`,
};

/**
 * Defect Structure template
 */
export const defectStructureDiagram: DiagramTemplate = {
  id: 'mat-defect-structure',
  name: 'Material Defect Diagram',
  description: 'Point, line, and planar defects in crystalline materials',
  domain: 'engineering',
  promptTemplate: `Create a defect structure diagram:
- Point defects: {{pointDefects}}
- Line defects: {{lineDefects}}
- Planar defects: {{planarDefects}}
- Volume defects: {{volumeDefects}}
- Formation energy: {{formationEnergy}}
- Material properties affected: {{propertiesAffected}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'pointDefects',
    'lineDefects',
    'planarDefects',
    'volumeDefects',
    'formationEnergy',
    'propertiesAffected',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    DEF["Crystal Defects"] --> POINT["Point Defects"]
    DEF --> LINE["Line Defects"]
    DEF --> PLANE["Planar Defects"]
    POINT --> VAC["Vacancies"]
    POINT --> INT["Interstitials"]
    LINE --> EDGE["Edge Dislocations"]
    LINE --> SCREW["Screw Dislocations"]
    PLANE --> GB["Grain Boundaries"]
    style DEF fill:#DC143C
    style GB fill:#4169E1`,
};

/**
 * Microstructure Evolution template
 */
export const microstructureEvolution: DiagramTemplate = {
  id: 'mat-microstructure-evolution',
  name: 'Microstructure Evolution',
  description: 'Changes in microstructure during thermal or mechanical processing',
  domain: 'engineering',
  promptTemplate: `Create a microstructure evolution diagram:
- Initial state: {{initialState}}
- Processing conditions: {{processingConditions}}
- Phase transformations: {{phaseTransformations}}
- Grain growth: {{grainGrowth}}
- Precipitation: {{precipitation}}
- Final microstructure: {{finalMicrostructure}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'initialState',
    'processingConditions',
    'phaseTransformations',
    'grainGrowth',
    'precipitation',
    'finalMicrostructure',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    CAST["As-Cast"] --> HOMO["Homogenization"]
    HOMO --> HOT["Hot Working"]
    HOT --> COLD["Cold Working"]
    COLD --> ANN["Annealing"]
    ANN --> RECOV["Recovery"]
    RECOV --> RECRYST["Recrystallization"]
    RECRYST --> GROWTH["Grain Growth"]
    style CAST fill:#808080
    style GROWTH fill:#228B22`,
};

// =============================================================================
// RESEARCH METHODOLOGIES
// =============================================================================

/**
 * Materials Characterization Workflow template
 */
export const materialsCharacterization: DiagramTemplate = {
  id: 'mat-characterization-workflow',
  name: 'Materials Characterization Workflow',
  description: 'Systematic approach to materials analysis and characterization',
  domain: 'engineering',
  promptTemplate: `Create a characterization workflow:
- Sample preparation: {{samplePreparation}}
- Structural analysis: {{structuralAnalysis}}
- Chemical analysis: {{chemicalAnalysis}}
- Mechanical testing: {{mechanicalTesting}}
- Thermal analysis: {{thermalAnalysis}}
- Surface characterization: {{surfaceCharacterization}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'samplePreparation',
    'structuralAnalysis',
    'chemicalAnalysis',
    'mechanicalTesting',
    'thermalAnalysis',
    'surfaceCharacterization',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    SAMP["Sample"] --> PREP["Preparation"]
    PREP --> STRUCT["Structural: XRD, TEM"]
    PREP --> CHEM["Chemical: EDS, XPS"]
    PREP --> MECH["Mechanical: Tensile, Hardness"]
    PREP --> THERM["Thermal: DSC, TGA"]
    STRUCT & CHEM & MECH & THERM --> DATA["Data Integration"]
    DATA --> PROP["Property Correlation"]
    style SAMP fill:#4169E1
    style PROP fill:#228B22`,
};

/**
 * Nanomaterial Synthesis template
 */
export const nanomaterialSynthesis: DiagramTemplate = {
  id: 'mat-nanomaterial-synthesis',
  name: 'Nanomaterial Synthesis Routes',
  description: 'Top-down and bottom-up approaches to nanomaterial fabrication',
  domain: 'engineering',
  promptTemplate: `Create a nanomaterial synthesis diagram:
- Synthesis approach: {{synthesisApproach}}
- Precursor materials: {{precursorMaterials}}
- Reaction conditions: {{reactionConditions}}
- Size control: {{sizeControl}}
- Surface modification: {{surfaceModification}}
- Product characterization: {{productCharacterization}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'synthesisApproach',
    'precursorMaterials',
    'reactionConditions',
    'sizeControl',
    'surfaceModification',
    'productCharacterization',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    NANO["Nanomaterial Synthesis"] --> TD["Top-Down"]
    NANO --> BU["Bottom-Up"]
    TD --> MILL["Ball Milling"]
    TD --> LITH["Lithography"]
    BU --> CVD["CVD/PVD"]
    BU --> SOL["Sol-Gel"]
    BU --> CHEM["Chemical Reduction"]
    style NANO fill:#9370DB
    style BU fill:#228B22`,
};

/**
 * Failure Analysis Workflow template
 */
export const failureAnalysisWorkflow: DiagramTemplate = {
  id: 'mat-failure-analysis',
  name: 'Failure Analysis Workflow',
  description: 'Systematic investigation of material and component failures',
  domain: 'engineering',
  promptTemplate: `Create a failure analysis workflow:
- Initial assessment: {{initialAssessment}}
- Visual examination: {{visualExamination}}
- Non-destructive testing: {{nonDestructiveTesting}}
- Fractography: {{fractography}}
- Metallography: {{metallography}}
- Root cause determination: {{rootCause}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'initialAssessment',
    'visualExamination',
    'nonDestructiveTesting',
    'fractography',
    'metallography',
    'rootCause',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    FAIL["Failed Component"] --> DOC["Documentation"]
    DOC --> VIS["Visual Exam"]
    VIS --> NDT["NDT Inspection"]
    NDT --> FRACT["Fractography"]
    FRACT --> MET["Metallography"]
    MET --> CHEM["Chemical Analysis"]
    CHEM --> ROOT["Root Cause"]
    ROOT --> REC["Recommendations"]
    style FAIL fill:#DC143C
    style ROOT fill:#228B22`,
};

// =============================================================================
// CLASSIFICATION SYSTEMS
// =============================================================================

/**
 * Material Classification template
 */
export const materialClassification: DiagramTemplate = {
  id: 'mat-material-classification',
  name: 'Material Classification System',
  description: 'Hierarchical classification of engineering materials',
  domain: 'engineering',
  promptTemplate: `Create a material classification diagram:
- Material families: {{materialFamilies}}
- Metals and alloys: {{metalsAlloys}}
- Ceramics: {{ceramics}}
- Polymers: {{polymers}}
- Composites: {{composites}}
- Selection criteria: {{selectionCriteria}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'materialFamilies',
    'metalsAlloys',
    'ceramics',
    'polymers',
    'composites',
    'selectionCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    MAT["Engineering Materials"] --> MET["Metals"]
    MAT --> CER["Ceramics"]
    MAT --> POL["Polymers"]
    MAT --> COMP["Composites"]
    MET --> FE["Ferrous"]
    MET --> NF["Non-ferrous"]
    CER --> OX["Oxides"]
    CER --> CARB["Carbides"]
    style MAT fill:#4169E1
    style MET fill:#C0C0C0`,
};

/**
 * Steel Classification template
 */
export const steelClassification: DiagramTemplate = {
  id: 'mat-steel-classification',
  name: 'Steel Classification System',
  description: 'Classification of steels by composition, processing, and application',
  domain: 'engineering',
  promptTemplate: `Create a steel classification diagram:
- Carbon content: {{carbonContent}}
- Alloying elements: {{alloyingElements}}
- Heat treatment: {{heatTreatment}}
- Microstructure: {{microstructure}}
- Properties: {{properties}}
- Applications: {{applications}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'carbonContent',
    'alloyingElements',
    'heatTreatment',
    'microstructure',
    'properties',
    'applications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    STEEL["Steels"] --> LOW["Low Carbon <0.3%"]
    STEEL --> MED["Medium Carbon 0.3-0.6%"]
    STEEL --> HIGH["High Carbon >0.6%"]
    STEEL --> ALLOY["Alloy Steels"]
    ALLOY --> SS["Stainless Steel"]
    ALLOY --> TOOL["Tool Steel"]
    ALLOY --> HSLA["HSLA Steel"]
    style STEEL fill:#808080
    style SS fill:#C0C0C0`,
};

/**
 * Polymer Classification template
 */
export const polymerClassification: DiagramTemplate = {
  id: 'mat-polymer-classification',
  name: 'Polymer Classification System',
  description: 'Classification of polymers by structure, synthesis, and behavior',
  domain: 'engineering',
  promptTemplate: `Create a polymer classification diagram:
- Polymer types: {{polymerTypes}}
- Synthesis methods: {{synthesisMethods}}
- Thermal behavior: {{thermalBehavior}}
- Chain structure: {{chainStructure}}
- Applications: {{applications}}
- Degradation behavior: {{degradationBehavior}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'polymerTypes',
    'synthesisMethods',
    'thermalBehavior',
    'chainStructure',
    'applications',
    'degradationBehavior',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    POLY["Polymers"] --> THERMO["Thermoplastics"]
    POLY --> THSET["Thermosets"]
    POLY --> ELAST["Elastomers"]
    THERMO --> PE["Polyethylene"]
    THERMO --> PP["Polypropylene"]
    THERMO --> PS["Polystyrene"]
    THSET --> EPOXY["Epoxy"]
    THSET --> PHENOL["Phenolic"]
    style POLY fill:#4169E1
    style THERMO fill:#228B22`,
};

// =============================================================================
// PROCESS FLOWS
// =============================================================================

/**
 * Heat Treatment Process template
 */
export const heatTreatmentProcess: DiagramTemplate = {
  id: 'mat-heat-treatment',
  name: 'Heat Treatment Process',
  description: 'Thermal processing cycles for metals and alloys',
  domain: 'engineering',
  promptTemplate: `Create a heat treatment process diagram:
- Material: {{material}}
- Treatment type: {{treatmentType}}
- Temperature profile: {{temperatureProfile}}
- Holding time: {{holdingTime}}
- Cooling method: {{coolingMethod}}
- Resulting microstructure: {{resultingMicrostructure}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'material',
    'treatmentType',
    'temperatureProfile',
    'holdingTime',
    'coolingMethod',
    'resultingMicrostructure',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    START["Room Temp"] --> HEAT["Heating"]
    HEAT --> AUST["Austenitizing"]
    AUST --> HOLD["Hold Time"]
    HOLD --> QUENCH["Quenching"]
    QUENCH --> MART["Martensite"]
    MART --> TEMPER["Tempering"]
    TEMPER --> FINAL["Tempered Martensite"]
    style AUST fill:#DC143C
    style FINAL fill:#228B22`,
};

/**
 * Casting Process template
 */
export const castingProcess: DiagramTemplate = {
  id: 'mat-casting-process',
  name: 'Metal Casting Process',
  description: 'Steps in metal casting from pattern making to finishing',
  domain: 'engineering',
  promptTemplate: `Create a casting process diagram:
- Casting method: {{castingMethod}}
- Pattern design: {{patternDesign}}
- Mold preparation: {{moldPreparation}}
- Melting and pouring: {{meltingPouring}}
- Solidification: {{solidification}}
- Post-processing: {{postProcessing}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'castingMethod',
    'patternDesign',
    'moldPreparation',
    'meltingPouring',
    'solidification',
    'postProcessing',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    PAT["Pattern Making"] --> MOLD["Mold Preparation"]
    MOLD --> MELT["Melting"]
    MELT --> POUR["Pouring"]
    POUR --> SOLID["Solidification"]
    SOLID --> SHAKE["Shakeout"]
    SHAKE --> CLEAN["Cleaning"]
    CLEAN --> INSP["Inspection"]
    style POUR fill:#DC143C
    style INSP fill:#228B22`,
};

/**
 * Additive Manufacturing template
 */
export const additiveManufacturing: DiagramTemplate = {
  id: 'mat-additive-manufacturing',
  name: 'Additive Manufacturing Process',
  description: '3D printing process flow for metals and polymers',
  domain: 'engineering',
  promptTemplate: `Create an additive manufacturing diagram:
- AM technology: {{amTechnology}}
- Material type: {{materialType}}
- CAD design: {{cadDesign}}
- Build parameters: {{buildParameters}}
- Post-processing: {{postProcessing}}
- Quality control: {{qualityControl}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'amTechnology',
    'materialType',
    'cadDesign',
    'buildParameters',
    'postProcessing',
    'qualityControl',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    CAD["CAD Model"] --> STL["STL File"]
    STL --> SLICE["Slicing"]
    SLICE --> BUILD["Layer-by-Layer Build"]
    BUILD --> POWDER["SLM/SLS"]
    BUILD --> WIRE["DED"]
    BUILD --> POLYMER["FDM/SLA"]
    POWDER & WIRE & POLYMER --> POST["Post-Processing"]
    POST --> QC["Quality Control"]
    style CAD fill:#4169E1
    style QC fill:#228B22`,
};

/**
 * Composite Manufacturing template
 */
export const compositeManufacturing: DiagramTemplate = {
  id: 'mat-composite-manufacturing',
  name: 'Composite Manufacturing Process',
  description: 'Fabrication methods for fiber-reinforced composites',
  domain: 'engineering',
  promptTemplate: `Create a composite manufacturing diagram:
- Fiber type: {{fiberType}}
- Matrix material: {{matrixMaterial}}
- Layup method: {{layupMethod}}
- Curing process: {{curingProcess}}
- Quality inspection: {{qualityInspection}}
- Performance testing: {{performanceTesting}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'fiberType',
    'matrixMaterial',
    'layupMethod',
    'curingProcess',
    'qualityInspection',
    'performanceTesting',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    FIBER["Fiber Preform"] --> LAYUP["Layup"]
    RESIN["Resin System"] --> INFUSE["Infusion"]
    LAYUP & INFUSE --> MOLD["Molding"]
    MOLD --> CURE["Curing"]
    CURE --> DEMOLD["Demolding"]
    DEMOLD --> TRIM["Trimming"]
    TRIM --> NDT["NDT Inspection"]
    style FIBER fill:#4169E1
    style NDT fill:#228B22`,
};

/**
 * Thin Film Deposition template
 */
export const thinFilmDeposition: DiagramTemplate = {
  id: 'mat-thin-film-deposition',
  name: 'Thin Film Deposition Process',
  description: 'PVD and CVD thin film coating processes',
  domain: 'engineering',
  promptTemplate: `Create a thin film deposition diagram:
- Deposition method: {{depositionMethod}}
- Substrate preparation: {{substratePreparation}}
- Process parameters: {{processParameters}}
- Film composition: {{filmComposition}}
- Thickness control: {{thicknessControl}}
- Film properties: {{filmProperties}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'depositionMethod',
    'substratePreparation',
    'processParameters',
    'filmComposition',
    'thicknessControl',
    'filmProperties',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    SUB["Substrate"] --> CLEAN["Cleaning"]
    CLEAN --> LOAD["Chamber Loading"]
    LOAD --> VAC["Vacuum"]
    VAC --> DEP["Deposition"]
    DEP --> PVD["PVD: Sputtering/Evap"]
    DEP --> CVD["CVD: PECVD/MOCVD"]
    PVD & CVD --> CHAR["Characterization"]
    style SUB fill:#4169E1
    style CHAR fill:#228B22`,
};

/**
 * Surface Treatment template
 */
export const surfaceTreatment: DiagramTemplate = {
  id: 'mat-surface-treatment',
  name: 'Surface Treatment Process',
  description: 'Surface modification techniques for improved properties',
  domain: 'engineering',
  promptTemplate: `Create a surface treatment diagram:
- Treatment type: {{treatmentType}}
- Surface preparation: {{surfacePreparation}}
- Treatment parameters: {{treatmentParameters}}
- Property improvements: {{propertyImprovements}}
- Quality control: {{qualityControl}}
- Applications: {{applications}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'treatmentType',
    'surfacePreparation',
    'treatmentParameters',
    'propertyImprovements',
    'qualityControl',
    'applications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    SURF["Surface Treatment"] --> MECH["Mechanical"]
    SURF --> THERM["Thermal"]
    SURF --> CHEM["Chemical"]
    MECH --> SHOT["Shot Peening"]
    THERM --> CARB["Carburizing"]
    THERM --> NITRID["Nitriding"]
    CHEM --> ANOD["Anodizing"]
    CHEM --> PLATE["Electroplating"]
    style SURF fill:#4169E1
    style CARB fill:#DC143C`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All materials science templates
 */
export const materialsScienceTemplates: DiagramTemplate[] = [
  // Natural Phenomena / Structure
  crystalStructureDiagram,
  phaseDiagramTemplate,
  defectStructureDiagram,
  microstructureEvolution,
  // Research Methodologies
  materialsCharacterization,
  nanomaterialSynthesis,
  failureAnalysisWorkflow,
  // Classification Systems
  materialClassification,
  steelClassification,
  polymerClassification,
  // Process Flows
  heatTreatmentProcess,
  castingProcess,
  additiveManufacturing,
  compositeManufacturing,
  thinFilmDeposition,
  surfaceTreatment,
];

export default materialsScienceTemplates;
