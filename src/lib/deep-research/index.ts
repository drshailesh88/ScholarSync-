/**
 * Deep Research module public API.
 */

export { runDeepResearch, validateTopic, buildExplorationTree } from "./engine";
export { generatePerspectives } from "./perspectives";
export { synthesizeFindings } from "./synthesis";
export { traverseCitationGraph, selectTopPapers } from "./citation-traversal";
export { extractStructuredData } from "./data-extraction";
export type {
  ResearchConfig,
  ResearchMode,
  ResearchModeConfig,
  ResearchStage,
  EnhancedResearchStage,
  ResearchProgressCallback,
  SynthesisProgressCallback,
  Perspective,
  ExplorationTree,
  ExplorationNode,
  ExtractedPaperData,
  EnhancedPaper,
  SynthesisReport,
  EnhancedSynthesisReport,
  PerspectiveSection,
  DeepResearchResult,
  ResearchProgress,
  DeepResearchSession,
} from "./types";
export { RESEARCH_MODES, buildConfig } from "./types";
