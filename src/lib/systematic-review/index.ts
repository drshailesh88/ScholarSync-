/**
 * Systematic Review Engine — Public API
 *
 * Re-exports the entire PRISMA-compliant systematic review pipeline:
 *  1. Search Strategy Generation (PICO → MeSH)
 *  2. Triple-Agent AI Screening
 *  3. PRISMA 2020 Flow Diagram
 *  4. RoB 2 Risk of Bias Assessment
 *  5. AI Data Extraction
 */

export {
  generateSearchStrategy,
  formatForCochrane,
  formatForEmbase,
  type PICOInput,
  type SearchStrategy,
  type SearchBlock,
} from "./search-strategy";

export {
  screenPaper,
  batchScreenPapers,
  getScreeningSummary,
  type ScreeningCriterion,
  type ConsensusResult,
  type AgentDecision,
} from "./screening-engine";

export {
  computePRISMAFlow,
  updatePRISMAFlowStage,
  generatePRISMAFlowSVG,
  generatePRISMAChecklist,
  type PRISMAFlowData,
} from "./prisma-flow";

export {
  assessRiskOfBias,
  getProjectRoB2Summary,
  type FullRoB2Assessment,
  type DomainAssessment,
} from "./rob2-assessment";

export {
  extractDataFromPaper,
  batchExtractData,
  getExtractionTable,
  type ExtractionField,
  type ExtractionResult,
  type PaperExtraction,
} from "./data-extraction";

export {
  importFromSearch,
  deduplicateProjectPapers,
  importUploadedPaper,
  getProjectPapersWithDetails,
  type ImportResult,
  type ImportSource,
} from "./paper-import";

export {
  computeScreeningPriority,
  updateScreeningPriorities,
  type PriorityScore,
} from "./active-learning";

export {
  recordHumanDecision,
  getScreeningQueue,
  getScreeningProgress,
  computeInterRaterAgreement,
  type HumanDecisionInput,
  type ConflictInfo,
  type AgreementStats,
} from "./dual-screening";

export {
  computeEffectSize,
  computeFixedEffectsMeta,
  computeRandomEffectsMeta,
  eggerTest,
  trimAndFill,
  runMetaAnalysis,
  getMetaAnalysisResults,
  runSubgroupAnalysis,
  runSensitivityAnalysis,
  type StudyEffect,
  type EffectType,
  type ModelType,
  type MetaAnalysisOutput,
  type SubgroupResult,
  type SubgroupAnalysisOutput,
  type LeaveOneOutResult,
} from "./meta-analysis";

export {
  runSnowballing,
  getSnowballSessions,
  getProjectCitationNetwork,
  type SnowballDirection,
  type SnowballResult,
} from "./snowballing";

export {
  PRISMA_2020_ITEMS,
  verifyPRISMACompliance,
  exportChecklistCSV,
  type PRISMAItem,
  type ComplianceStatus,
  type ChecklistItemResult,
  type ComplianceResult,
} from "./prisma-checklist";

export {
  parseRIS,
  parseBibTeX,
  parseReferences,
  generateRIS,
  generateBibTeX,
  generateEndNoteXML,
  generateCSV,
  type ParsedReference,
  type ExportFormat,
  type ExportablePaper,
} from "./reference-formats";

export {
  createSearchAlert,
  getProjectAlerts,
  updateAlertFrequency,
  pauseAlert,
  resumeAlert,
  deleteAlert,
  checkAlertForNewPapers,
  checkDueAlerts,
  type AlertFrequency,
  type CreateAlertInput,
  type AlertCheckResult,
} from "./living-review";

export {
  generateProtocol,
  loadProjectDataForProtocol,
  exportProtocolText,
  exportProtocolHTML,
  type Protocol,
  type ProtocolSection,
  type ProtocolInput,
} from "./protocol-builder";

export {
  assessGRADE,
  getGRADESummary,
  exportGRADETable,
  type GRADEAssessment,
  type GRADEDomainAssessment,
  type GRADEDomain,
  type CertaintyRating,
  GRADE_DOMAIN_LABELS,
  CERTAINTY_LABELS,
} from "./grade-assessment";

export {
  generateManuscriptSection,
  getProjectDataForManuscript,
  exportManuscriptDraft,
  type ManuscriptSection,
  type ManuscriptSectionOutput,
  type ManuscriptProjectData,
} from "./manuscript-generator";

export {
  inviteCollaborator,
  getProjectCollaborators,
  removeCollaborator,
  updateCollaboratorRole,
  canAccessProject,
  getProjectRole,
  verifyProjectAccess,
  type CollaboratorRole,
  type CollaboratorRecord,
  type ProjectAccessResult,
} from "./collaboration";

export {
  generateEvidenceGapMap,
  type GapMapCell,
  type GapMapData,
  type EffectDirection,
  type CertaintyLevel,
} from "./evidence-gap-map";

export {
  generateRevManExport,
  type RevManExportPackage,
} from "./revman-export";

export {
  validateSearchStrategy,
  PRESS_ELEMENTS,
  PRESS_ASSESSMENT_LABELS,
  PRESS_OVERALL_LABELS,
  type PRESSElement,
  type PRESSValidation,
} from "./press-validation";

export {
  AMSTAR2_ITEMS,
  assessAMSTAR2,
  getAMSTAR2Assessment,
  AMSTAR2_RATING_LABELS,
  CONFIDENCE_LABELS,
  type AMSTAR2Item,
  type AMSTAR2Rating,
  type AMSTAR2ItemResult,
  type AMSTAR2Assessment,
  type OverallConfidence,
} from "./amstar2-checklist";

export {
  retrievePDF,
  batchRetrievePDFs,
  type RetrievalStatus,
  type RetrievalResult,
} from "./pdf-retrieval";

export {
  logAuditEvent,
  getAuditLog,
  exportAuditLog,
  getAuditSummary,
  type AuditEvent,
  type AuditLogEntry,
  type AuditSummary,
} from "./audit-trail";
