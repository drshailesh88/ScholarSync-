/**
 * RALPH Notebook Test Types
 *
 * Type definitions for the RALPH (Red-team → Attempt → Log → Patch → Harden)
 * test framework for NotebookLM-parity hardening.
 */

export interface MockPaper {
  id: number;
  title: string;
  authors: string[];
  year: number;
}

export interface MockChunk {
  id: number;
  paper_id: number;
  chunk_index: number;
  text: string;
  section_type: string | null;
  page_number: number | null;
  score: number;
}

export interface TestQuery {
  id: string;
  query: string;
  expectedBehavior: string[];
  failurePatterns: string[];
  requiredCitations?: number[];
  forbiddenContent?: string[];
}

export interface TestCaseSetup {
  description: string;
  papers: MockPaper[];
  mockChunks: MockChunk[];
}

export interface TestCase {
  id: string;
  name: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  phase: number;
  cycle: number;
  setup: TestCaseSetup;
  queries: TestQuery[];
  qualityCriteria: string[];
}

export interface ScoreBreakdown {
  grounding: number; // 1-10: Are all claims traceable to source text?
  citationAccuracy: number; // 1-10: Do [N] markers match the correct sources?
  completeness: number; // 1-10: Did it answer the full question using available evidence?
  hallucinationResistance: number; // 1-10: Did it avoid stating anything not in the sources?
  readability: number; // 1-10: Is the response well-structured and clear?
}

export interface QueryResult {
  queryId: string;
  query: string;
  response: string;
  citationsFound: number[];
  scores: ScoreBreakdown;
  weightedScore: number;
  issues: string[];
  passedChecks: string[];
}

export interface PromptAnalysis {
  totalSourceBlocks: number;
  sourceLabelsCorrect: boolean;
  citationRulesPresent: boolean;
  chunksIncluded: number;
  paperTitlesPresent: string[];
  sectionTypesPresent: string[];
  systemPromptLength: number;
}

export interface CaseResult {
  caseId: string;
  caseName: string;
  category: string;
  timestamp: string;
  mode: "mock" | "live";
  promptAnalysis: PromptAnalysis;
  queryResults: QueryResult[];
  overallScore: number;
  pass: boolean;
  regressions: string[];
}

export interface Scorecard {
  lastUpdated: string;
  phase: number;
  currentCycle: number;
  totalCases: number;
  passing: number;
  failing: number;
  averageScore: number;
  gateStatus: {
    phase1_grounding: "not_started" | "in_progress" | "passed" | "blocked";
    phase2_intelligence: "not_started" | "in_progress" | "passed" | "blocked";
    phase3_artifacts: "not_started" | "in_progress" | "passed" | "blocked";
    phase4_audio_polish: "not_started" | "in_progress" | "passed" | "blocked";
  };
  cases: CaseResult[];
}
