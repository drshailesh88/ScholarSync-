/**
 * colors/index.ts
 * Color scheme exports for FINNISH scientific illustration
 *
 * Provides domain-specific color palettes for medical and scientific specialties
 *
 * NOTE: Each specialty exports their own types locally (like FlowchartColors,
 * SeverityGradient, PathologyColors). To avoid conflicts, we export:
 * 1. The default color scheme from each specialty (e.g., pulmonologyColorScheme)
 * 2. Unique color exports from each specialty with prefixes where needed
 * 3. The main ColorScheme type from each specialty
 */

// =============================================================================
// PULMONOLOGY
// =============================================================================

export {
  airwayColors,
  lungTissueColors,
  oxygenationColors,
  pathologyColors as pulmonologyPathologyColors,
  severityGradient as pulmonologySeverityGradient,
  diagnosticColors as pulmonologyDiagnosticColors,
  ventilatorColors,
  sleepStudyColors,
  flowchartColors as pulmonologyFlowchartColors,
  pulmonologyColorScheme,
} from './pulmonology';

export type { PulmonologyColorScheme } from './pulmonology';

// =============================================================================
// EMERGENCY MEDICINE
// =============================================================================

export {
  emergencyMedicineColors,
  getTriageColor,
  getVitalColor,
  getTraumaColor,
  generateCSSVariables as generateEmergencyCSSVariables,
} from './emergency-medicine';

export type { EmergencyMedicineColorScheme, TriageColor, ColorVariant } from './emergency-medicine';

// =============================================================================
// GASTROENTEROLOGY
// =============================================================================

export {
  giTractColors,
  hepatobiliaryColors,
  pancreaticColors,
  mucosalColors,
  pathologyColors as gastroPathologyColors,
  severityGradient as gastroSeverityGradient,
  endoscopyColors,
  scoringColors,
  procedureColors as gastroProcedureColors,
  flowchartColors as gastroFlowchartColors,
  gastroenterologyColorScheme,
} from './gastroenterology';

export type { GastroenterologyColorScheme } from './gastroenterology';

// =============================================================================
// NEPHROLOGY
// =============================================================================

export {
  kidneyAnatomyColors,
  nephronColors,
  glomerularColors,
  urineColors,
  electrolyteColors,
  dialysisColors,
  transplantColors,
  pathologyColors as nephroPathologyColors,
  ckdStagingColors,
  akiStagingColors,
  urinalysisColors,
  severityGradient as nephroSeverityGradient,
  flowchartColors as nephroFlowchartColors,
  nephrologyColorScheme,
} from './nephrology';

export type { NephrologyColorScheme } from './nephrology';

// =============================================================================
// INFECTIOUS DISEASE
// =============================================================================

export {
  bacteriaColors,
  virusColors,
  fungiColors,
  parasiteColors,
  antibioticColors,
  antiviralColors,
  infectionControlColors,
  resistanceColors,
  vaccineColors,
  diagnosticColors as infectiousDiagnosticColors,
  severityGradient as infectiousSeverityGradient,
  flowchartColors as infectiousFlowchartColors,
  infectiousDiseaseColorScheme,
} from './infectious-disease';

export type { InfectiousDiseaseColorScheme } from './infectious-disease';

// =============================================================================
// ENDOCRINOLOGY
// =============================================================================

export {
  glandColors,
  hormoneColors,
  feedbackColors,
  diabetesColors,
  thyroidColors,
  adrenalColors,
  pituitaryColors,
  boneCalciumColors,
  metabolicColors,
  severityGradient as endocrineSeverityGradient,
  flowchartColors as endocrineFlowchartColors,
  endocrinologyColorScheme,
} from './endocrinology';

export type { EndocrinologyColorScheme } from './endocrinology';

// =============================================================================
// HEMATOLOGY-ONCOLOGY
// =============================================================================

export {
  rbcColors,
  wbcColors,
  plateletColors,
  boneMarrowColors,
  coagulationColors,
  malignancyColors,
  anemiaColors,
  hemoncSeverityGradient,
  stagingColors,
  treatmentColors as hemoncoTreatmentColors,
  anticoagulantColors,
  hemoncDiagnosticColors,
  hemoncFlowchartColors,
  hematologyOncologyColorScheme,
} from './hematology-oncology';

export type { HematologyOncologyColorScheme } from './hematology-oncology';

// =============================================================================
// ORTHOPEDICS
// =============================================================================

export {
  boneColors,
  softTissueColors,
  jointColors,
  orthoPathologyColors,
  fractureColors,
  implantColors,
  healingPhaseColors,
  imagingColors,
  gustiloColors,
  rehabPhaseColors,
  weightBearingColors,
  spineColors,
  severityGradient as orthoSeverityGradient,
  flowchartColors as orthoFlowchartColors,
  orthopedicsColorScheme,
} from './orthopedics';

export type { OrthopedicsColorScheme } from './orthopedics';

// =============================================================================
// ANESTHESIOLOGY
// =============================================================================

export {
  airwayColors as anesthesiaAirwayColors,
  monitoringColors,
  anestheticAgentColors,
  regionalColors,
  vascularAccessColors,
  painManagementColors,
  asaStatusColors,
  mallampatiColors,
  sedationDepthColors,
  complicationColors as anesthesiaComplicationColors,
  equipmentColors as anesthesiaEquipmentColors,
  flowchartColors as anesthesiaFlowchartColors,
  anesthesiologyColorScheme,
} from './anesthesiology';

export type { AnesthesiologyColorScheme } from './anesthesiology';

// =============================================================================
// RADIOLOGY
// =============================================================================

export {
  modalityColors,
  ctDensityColors,
  mriSignalColors,
  pathologyColors as radioPathologyColors,
  contrastPhaseColors,
  radiationColors,
  nuclearColors,
  ultrasoundColors,
  anatomyColors as radioAnatomyColors,
  workflowColors,
  reportingColors,
  interventionalColors,
  flowchartColors as radioFlowchartColors,
  severityGradient as radioSeverityGradient,
  radiologyColorScheme,
} from './radiology';

export type { RadiologyColorScheme } from './radiology';

// =============================================================================
// OPHTHALMOLOGY
// =============================================================================

export {
  eyeAnatomyColors,
  anteriorSegmentColors,
  posteriorSegmentColors,
  vasculatureColors as ophthoVasculatureColors,
  pathologyAnteriorColors,
  pathologyPosteriorColors,
  severityColors as ophthoSeverityColors,
  diagnosticsColors as ophthoDiagnosticsColors,
  surgicalColors as ophthoSurgicalColors,
  laserColors,
  ophthalmologyColorScheme,
} from './ophthalmology';

export type { OphthalmologyColorScheme } from './ophthalmology';

// =============================================================================
// ENT (Otolaryngology)
// =============================================================================

export {
  earColors,
  innerEarColors,
  nasalColors,
  throatColors,
  entPathologyColors,
  entSeverityGradient,
  hearingColors,
  equipmentColors as entEquipmentColors,
  entFlowchartColors,
  vestibularColors,
  sleepApneaColors,
  entColorScheme,
} from './ent';

export type { ENTColorScheme } from './ent';

// =============================================================================
// DERMATOLOGY
// =============================================================================

export {
  skinToneColors,
  skinLayerColors,
  lesionColors,
  inflammatoryColors as dermaInflammatoryColors,
  infectiousColors as dermaInfectiousColors,
  malignancyColors as dermaMalignancyColors,
  autoimmuneColors,
  procedureColors as dermaProcedureColors,
  equipmentColors as dermaEquipmentColors,
  woundHealingColors,
  severityGradient as dermaSeverityGradient,
  diagnosticColors as dermaDiagnosticColors,
  flowchartColors as dermaFlowchartColors,
  dermatologyColorScheme,
} from './dermatology';

export type { DermatologyColorScheme } from './dermatology';

// =============================================================================
// PEDIATRICS
// =============================================================================

export {
  ageGroupColors,
  growthColors,
  developmentColors,
  anatomyColors as pedsAnatomyColors,
  respiratoryColors as pedsRespiratoryColors,
  infectiousColors as pedsInfectiousColors,
  giNutritionColors,
  congenitalColors,
  nicuColors,
  neonatalConditionColors,
  vaccinationColors,
  wellChildColors,
  emergencyColors as pedsEmergencyColors,
  severityGradient as pedsSeverityGradient,
  dehydrationGradient,
  apgarColors,
  flowchartColors as pedsFlowchartColors,
  pediatricsColorScheme,
} from './pediatrics';

export type { PediatricsColorScheme } from './pediatrics';

// =============================================================================
// PATHOLOGY
// =============================================================================

export {
  heStainColors,
  specialStainColors,
  ihcColors,
  normalCellColors,
  abnormalCellColors,
  inflammatoryCellColors,
  inflammationPatternColors,
  tumorClassificationColors,
  tumorTypeColors,
  laboratoryColors,
  microscopyColors,
  autopsyColors,
  hematopathologyColors,
  flowchartColors as pathologyFlowchartColors,
  gradingColors,
  pathologyColorScheme,
} from './pathology';

export type { PathologyColorScheme } from './pathology';

// =============================================================================
// PHYSIOLOGY
// =============================================================================

export {
  cardiovascularColors,
  respiratoryColors as physiologyRespiratoryColors,
  renalColors,
  neurophysiologyColors,
  muscleColors,
  endocrineColors as physiologyEndocrineColors,
  giPhysiologyColors,
  metabolismColors,
  fluidElectrolyteColors,
  acidBaseColors,
  thermoregulationColors,
  diagramElementColors,
  flowchartColors as physiologyFlowchartColors,
  severityGradient as physiologySeverityGradient,
  physiologyColorScheme,
} from './physiology';

export type { PhysiologyColorScheme } from './physiology';

// =============================================================================
// PHARMACOLOGY
// =============================================================================

export {
  drugClassColors,
  admeColors,
  receptorColors,
  interactionColors as pharmacologyInteractionColors,
  cyp450Colors,
  tdmColors,
  adrColors,
  doseResponseColors,
  deliveryRouteColors,
  severityGradient as pharmacologySeverityGradient,
  flowchartColors as pharmacologyFlowchartColors,
  pharmacologyColorScheme,
} from './pharmacology';

export type { PharmacologyColorScheme } from './pharmacology';

// =============================================================================
// BIOCHEMISTRY
// =============================================================================

export {
  proteinColors,
  nucleicAcidColors,
  carbohydrateColors,
  lipidColors,
  metabolismColors as biochemMetabolismColors,
  pathwayFlowColors,
  enzymeKineticsColors,
  kineticsGraphColors,
  cofactorColors,
  signalingColors,
  labTechniqueColors,
  concentrationGradient,
  activityGradient,
  phGradient,
  flowchartColors as biochemFlowchartColors,
  biochemistryColorScheme,
} from './biochemistry';

export type { BiochemistryColorScheme } from './biochemistry';

// =============================================================================
// CELL BIOLOGY
// =============================================================================

export {
  organelleColors,
  membraneColors,
  cellCycleColors,
  mitosisColors,
  chromosomeColors,
  signalingColors as cellBioSignalingColors,
  transportColors,
  cellDeathColors,
  cytoskeletonColors,
  junctionColors,
  cellTypeColors,
  severityGradient as cellBioSeverityGradient,
  flowchartColors as cellBioFlowchartColors,
  cellBiologyColorScheme,
} from './cell-biology';

export type { CellBiologyColorScheme } from './cell-biology';

// =============================================================================
// RHEUMATOLOGY
// =============================================================================

export {
  jointAnatomyColors,
  inflammatoryColors as rheumInflammatoryColors,
  autoimmuneColors as rheumAutoimmuneColors,
  crystalColors,
  ctdColors,
  osteoarthritisColors,
  diseaseActivityColors,
  severityGradient as rheumSeverityGradient,
  treatmentColors as rheumTreatmentColors,
  imagingColors as rheumImagingColors,
  anaPatternColors,
  flowchartColors as rheumFlowchartColors,
  vasculitisColors,
  rheumatologyColorScheme,
} from './rheumatology';

export type { RheumatologyColorScheme } from './rheumatology';

// =============================================================================
// GENERAL BIOLOGY
// =============================================================================

export {
  trophicLevelColors,
  ecosystemColors,
  biomeColors,
  evolutionColors,
  taxonomyColors,
  kingdomColors,
  populationColors,
  interactionColors as biologyInteractionColors,
  lifeCycleColors,
  nutrientCycleColors,
  conservationColors,
  geologicalColors,
  flowchartColors as biologyFlowchartColors,
  severityGradient as biologySeverityGradient,
  biologyColorScheme,
} from './biology';

export type { BiologyColorScheme } from './biology';

// =============================================================================
// ANATOMY
// =============================================================================

export {
  anatomyColorScheme,
} from './anatomy';

export type { AnatomyColorScheme } from './anatomy';

// =============================================================================
// PSYCHIATRY
// =============================================================================

export {
  moodStateColors,
  anxietyColors as psychAnxietyColors,
  psychosisColors,
  neurotransmitterColors,
  brainRegionColors,
  medicationClassColors,
  therapyModalityColors,
  assessmentColors as psychAssessmentColors,
  severityGradient as psychSeverityGradient,
  riskLevelColors,
  substanceColors,
  personalityClusterColors,
  sleepColors as psychSleepColors,
  flowchartColors as psychFlowchartColors,
  psychiatryColorScheme,
} from './psychiatry';

export type { PsychiatryColorScheme } from './psychiatry';

// =============================================================================
// COMPUTER SCIENCE
// =============================================================================

export {
  dataStructureColors,
  algorithmColors,
  cloudColors,
  databaseColors,
  aiMlColors,
  securityColors,
  osColors,
  programmingColors,
  architectureColors,
  severityGradient as csSeverityGradient,
  statusColors,
  complexityColors,
  flowchartColors as csFlowchartColors,
  computerScienceColorScheme,
} from './computer-science';

export type { ComputerScienceColorScheme } from './computer-science';

// =============================================================================
// ENGINEERING
// =============================================================================

export {
  mechanicalColors,
  gearColors,
  bearingColors,
  electricalColors,
  electronicColors,
  controlColors,
  hydraulicColors as engineeringHydraulicColors,
  pneumaticColors,
  manufacturingColors,
  machiningColors,
  spcColors,
  qualityStatusColors,
  stressColors,
  loadColors,
  ganttColors,
  resourceColors,
  cadLayerColors,
  gdtColors,
  fmeaColors,
  safetyColors,
  flowchartColors as engineeringFlowchartColors,
  engineeringSeverityGradient,
  engineeringColorScheme,
} from './engineering';

export type { EngineeringColorScheme } from './engineering';

// =============================================================================
// MOLECULAR BIOLOGY
// =============================================================================

export {
  dnaColors,
  nucleotideColors,
  rnaColors,
  proteinColors as molBioProteinColors,
  aminoAcidColors,
  enzymeColors,
  replicationColors,
  transcriptionColors,
  translationColors,
  regulationColors,
  crisprColors,
  epigeneticsColors,
  histoneColors,
  labTechniqueColors as molBioLabTechniqueColors,
  sequencingColors,
  blottingColors,
  expressionGradient,
  activityGradient as molBioActivityGradient,
  severityGradient as molBioSeverityGradient,
  flowchartColors as molBioFlowchartColors,
  molecularBiologyColorScheme,
} from './molecular-biology';

export type { MolecularBiologyColorScheme } from './molecular-biology';

// =============================================================================
// BIOMEDICAL ENGINEERING
// =============================================================================

export {
  deviceColors,
  implantColors as biomedImplantColors,
  prostheticColors as biomedProstheticColors,
  orthoticColors,
  biosensorColors,
  signalColors,
  scaffoldColors,
  cellTissueColors,
  bioreactorColors,
  neuralInterfaceColors,
  bciColors,
  biomechanicsColors as biomedBiomechanicsColors,
  motionColors,
  drugDeliveryColors,
  microfluidicsColors,
  imagingColors as biomedImagingColors,
  regulatoryColors,
  riskColors,
  biomedicalSeverityGradient,
  biomedicalFlowchartColors,
  biomedicalColorScheme,
} from './biomedical';

export type { BiomedicalColorScheme } from './biomedical';

// =============================================================================
// MATHEMATICS
// =============================================================================

export {
  algebraColors,
  calculusColors,
  geometryColors,
  trigonometryColors,
  statisticsColors,
  probabilityColors,
  linearAlgebraColors,
  graphTheoryColors,
  setTheoryColors,
  numberTheoryColors,
  logicColors,
  coordinateColors,
  diagramElementColors as mathDiagramElementColors,
  flowchartColors as mathFlowchartColors,
  importanceGradient,
  difficultyGradient,
  mathematicsColorScheme,
} from './mathematics';

export type { MathematicsColorScheme } from './mathematics';

// =============================================================================
// NEUROSCIENCE RESEARCH
// =============================================================================

export {
  neuralActivityColors,
  brainRegionColors as neuroBrainRegionColors,
  neuroimagingColors,
  electrophysiologyColors,
  optogeneticsColors,
  connectomicsColors,
  behavioralColors,
  plasticityColors,
  cellTypeColors as neuroCellTypeColors,
  significanceGradient,
  flowchartColors as neuroscienceFlowchartColors,
  neuroscienceColorScheme,
} from './neuroscience';

export type { NeuroscienceColorScheme } from './neuroscience';

// =============================================================================
// CHEMISTRY
// =============================================================================

export {
  elementCategoryColors,
  elementColors,
  orbitalColors,
  shellColors,
  bondColors,
  polarityColors,
  geometryColors as chemGeometryColors,
  stereochemistryColors,
  mechanismColors,
  reactionTypeColors,
  energyDiagramColors,
  kineticsColors as chemKineticsColors,
  equilibriumColors,
  spectroscopyColors,
  chromatographyColors,
  titrationColors,
  labEquipmentColors,
  safetyColors as chemSafetyColors,
  electrochemColors,
  flowchartColors as chemistryFlowchartColors,
  severityGradient as chemistrySeverityGradient,
  concentrationGradient as chemConcentrationGradient,
  chemistryColorScheme,
} from './chemistry';

export type { ChemistryColorScheme } from './chemistry';

// =============================================================================
// PHYSICS
// =============================================================================

export {
  mechanicsColors,
  electromagnetismColors,
  thermodynamicsColors,
  wavesOpticsColors,
  quantumColors,
  particleColors,
  astrophysicsColors,
  solidStateColors,
  laboratoryColors as physicsLaboratoryColors,
  magnitudeGradient,
  flowchartColors as physicsFlowchartColors,
  physicsColorScheme,
} from './physics';

export type { PhysicsColorScheme } from './physics';

// =============================================================================
// MICROBIOLOGY
// =============================================================================

export {
  gramStainColors,
  bacterialStructureColors,
  bacterialShapeColors,
  viralStructureColors,
  baltimoreClassColors,
  fungalColors,
  parasiteColors as microParasiteColors,
  cultureMediaColors,
  hemolysisColors,
  specialStainColors as microSpecialStainColors,
  susceptibilityColors,
  resistanceMechanismColors,
  biosafetyColors,
  molecularColors,
  elisaColors,
  microbiologyFlowchartColors,
  microbiologyColorScheme,
} from './microbiology';

export type { MicrobiologyColorScheme } from './microbiology';
