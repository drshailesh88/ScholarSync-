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
