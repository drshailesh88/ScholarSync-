import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Hoisted mock variables — accessible inside vi.mock factory closures
// ---------------------------------------------------------------------------

const {
  mockOnConflictDoUpdate,
  mockValues,
  mockInsert,
  _mockGroupBy,
  _mockWhere,
  _mockFrom,
  mockSelect,
} = vi.hoisted(() => {
  const mockOnConflictDoUpdate = vi.fn().mockResolvedValue(undefined);
  const mockValues = vi.fn(() => ({ onConflictDoUpdate: mockOnConflictDoUpdate }));
  const mockInsert = vi.fn(() => ({ values: mockValues }));

  const mockWhere = vi.fn().mockResolvedValue([]);
  const mockGroupBy = vi.fn(() => mockWhere);
  const mockFrom = vi.fn(() => ({
    where: vi.fn(() => ({ groupBy: mockGroupBy })),
  }));
  const mockSelect = vi.fn(() => ({ from: mockFrom }));

  return {
    mockOnConflictDoUpdate,
    mockValues,
    mockInsert,
    _mockGroupBy: mockGroupBy,
    _mockWhere: mockWhere,
    _mockFrom: mockFrom,
    mockSelect,
  };
});

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock("ai", () => ({
  generateObject: vi.fn(),
}));

vi.mock("@/lib/ai/models", () => ({
  getSmallModel: vi.fn(() => "mock-model"),
}));

vi.mock("@/lib/ai/prompts/systematic-review", () => ({
  getScreeningAgentPrompt: vi.fn(
    (agentIndex: number, _criteria: string, title: string, _abstract: string) =>
      `Agent ${agentIndex}: ${title}`
  ),
}));

vi.mock("@/lib/db", () => ({
  db: {
    insert: mockInsert,
    select: mockSelect,
  },
}));

vi.mock("@/lib/db/schema", () => ({
  screeningDecisions: {
    projectId: "projectId",
    paperId: "paperId",
    stage: "stage",
  },
}));

vi.mock("drizzle-orm", () => ({
  eq: vi.fn((col: unknown, val: unknown) => ({ col, val })),
  sql: vi.fn((strings: TemplateStringsArray) => strings[0]),
}));

// ---------------------------------------------------------------------------
// Actual imports (after mocks)
// ---------------------------------------------------------------------------

import { generateObject } from "ai";
import {
  screenPaper,
  batchScreenPapers,
  getScreeningSummary,
  type AgentDecision,
  type ConsensusResult,
  type ScreeningCriterion,
} from "@/lib/systematic-review/screening-engine";

const mockGenerateObject = vi.mocked(generateObject);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const sampleCriteria: ScreeningCriterion[] = [
  { id: 1, type: "inclusion", description: "RCT or cohort study" },
  { id: 2, type: "exclusion", description: "Case reports" },
];

function makeAgentResponse(
  decision: "include" | "exclude" | "uncertain",
  confidence: number
) {
  return {
    object: {
      decision,
      confidence,
      reasoning: `Agent decided to ${decision}`,
      matched_inclusion: decision === "include" ? [1] : [],
      matched_exclusion: decision === "exclude" ? [2] : [],
    },
  };
}

// ---------------------------------------------------------------------------
// screenPaper — consensus logic
// ---------------------------------------------------------------------------

describe("screenPaper — consensus logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockOnConflictDoUpdate.mockResolvedValue(undefined);
    mockValues.mockReturnValue({ onConflictDoUpdate: mockOnConflictDoUpdate });
    mockInsert.mockReturnValue({ values: mockValues });
  });

  it("unanimous include → finalDecision is include, no human review", async () => {
    mockGenerateObject
      .mockResolvedValueOnce(makeAgentResponse("include", 0.9) as never)
      .mockResolvedValueOnce(makeAgentResponse("include", 0.85) as never)
      .mockResolvedValueOnce(makeAgentResponse("include", 0.95) as never);

    const result = await screenPaper(
      1,
      10,
      "Aspirin in Heart Failure",
      "A randomized controlled trial...",
      sampleCriteria
    );

    expect(result.finalDecision).toBe("include");
    expect(result.requiresHumanReview).toBe(false);
    expect(result.reason).toContain("All 3 agents voted to include");
    expect(result.agentDecisions).toHaveLength(3);
  });

  it("unanimous include → confidence is the average of all three agents", async () => {
    mockGenerateObject
      .mockResolvedValueOnce(makeAgentResponse("include", 0.9) as never)
      .mockResolvedValueOnce(makeAgentResponse("include", 0.8) as never)
      .mockResolvedValueOnce(makeAgentResponse("include", 1.0) as never);

    const result = await screenPaper(1, 10, "Title", "Abstract", sampleCriteria);

    const expected = (0.9 + 0.8 + 1.0) / 3;
    expect(result.consensusConfidence).toBeCloseTo(expected, 5);
  });

  it("unanimous exclude → finalDecision is exclude, no human review", async () => {
    mockGenerateObject
      .mockResolvedValueOnce(makeAgentResponse("exclude", 0.7) as never)
      .mockResolvedValueOnce(makeAgentResponse("exclude", 0.8) as never)
      .mockResolvedValueOnce(makeAgentResponse("exclude", 0.9) as never);

    const result = await screenPaper(1, 11, "Case Report", "A single case...", sampleCriteria);

    expect(result.finalDecision).toBe("exclude");
    expect(result.requiresHumanReview).toBe(false);
    expect(result.reason).toContain("All 3 agents voted to exclude");
  });

  it("unanimous exclude → confidence is the average of all three agents", async () => {
    mockGenerateObject
      .mockResolvedValueOnce(makeAgentResponse("exclude", 0.7) as never)
      .mockResolvedValueOnce(makeAgentResponse("exclude", 0.8) as never)
      .mockResolvedValueOnce(makeAgentResponse("exclude", 0.9) as never);

    const result = await screenPaper(1, 11, "Case Report", "A single case...", sampleCriteria);

    const expected = (0.7 + 0.8 + 0.9) / 3;
    expect(result.consensusConfidence).toBeCloseTo(expected, 5);
  });

  it("majority include (2 include, 1 exclude) → include with reduced confidence", async () => {
    mockGenerateObject
      .mockResolvedValueOnce(makeAgentResponse("include", 0.8) as never)
      .mockResolvedValueOnce(makeAgentResponse("include", 0.7) as never)
      .mockResolvedValueOnce(makeAgentResponse("exclude", 0.6) as never);

    const result = await screenPaper(1, 12, "Mixed Study", "Abstract...", sampleCriteria);

    expect(result.finalDecision).toBe("include");
    expect(result.requiresHumanReview).toBe(false);
    expect(result.reason).toContain("2/3 agents voted to include");
    // Confidence should be avgConfidence * 0.85
    const avgConf = (0.8 + 0.7 + 0.6) / 3;
    expect(result.consensusConfidence).toBeCloseTo(avgConf * 0.85, 5);
  });

  it("majority include (2 include, 1 uncertain) → include with reduced confidence", async () => {
    mockGenerateObject
      .mockResolvedValueOnce(makeAgentResponse("include", 0.75) as never)
      .mockResolvedValueOnce(makeAgentResponse("include", 0.65) as never)
      .mockResolvedValueOnce(makeAgentResponse("uncertain", 0.5) as never);

    const result = await screenPaper(1, 12, "Study", "Abstract...", sampleCriteria);

    expect(result.finalDecision).toBe("include");
    expect(result.requiresHumanReview).toBe(false);
    expect(result.reason).toContain("2/3 agents voted to include");
  });

  it("majority exclude (2 exclude, 1 include) → exclude with reduced confidence", async () => {
    mockGenerateObject
      .mockResolvedValueOnce(makeAgentResponse("exclude", 0.85) as never)
      .mockResolvedValueOnce(makeAgentResponse("exclude", 0.75) as never)
      .mockResolvedValueOnce(makeAgentResponse("include", 0.65) as never);

    const result = await screenPaper(1, 13, "Borderline Study", "Abstract...", sampleCriteria);

    expect(result.finalDecision).toBe("exclude");
    expect(result.requiresHumanReview).toBe(false);
    expect(result.reason).toContain("2/3 agents voted to exclude");
    const avgConf = (0.85 + 0.75 + 0.65) / 3;
    expect(result.consensusConfidence).toBeCloseTo(avgConf * 0.85, 5);
  });

  it("majority exclude (2 exclude, 1 uncertain) → exclude with reduced confidence", async () => {
    mockGenerateObject
      .mockResolvedValueOnce(makeAgentResponse("exclude", 0.8) as never)
      .mockResolvedValueOnce(makeAgentResponse("exclude", 0.7) as never)
      .mockResolvedValueOnce(makeAgentResponse("uncertain", 0.5) as never);

    const result = await screenPaper(1, 14, "Study", "Abstract...", sampleCriteria);

    expect(result.finalDecision).toBe("exclude");
    expect(result.requiresHumanReview).toBe(false);
    expect(result.reason).toContain("2/3 agents voted to exclude");
  });

  it("no clear majority (1 include, 1 exclude, 1 uncertain) → conflict requiring human review", async () => {
    mockGenerateObject
      .mockResolvedValueOnce(makeAgentResponse("include", 0.6) as never)
      .mockResolvedValueOnce(makeAgentResponse("exclude", 0.6) as never)
      .mockResolvedValueOnce(makeAgentResponse("uncertain", 0.5) as never);

    const result = await screenPaper(1, 15, "Ambiguous Study", "Abstract...", sampleCriteria);

    expect(result.finalDecision).toBe("conflict");
    expect(result.requiresHumanReview).toBe(true);
    expect(result.reason).toContain("No consensus");
    expect(result.reason).toContain("requires human review");
  });

  it("conflict → confidence is avgConfidence * 0.5", async () => {
    mockGenerateObject
      .mockResolvedValueOnce(makeAgentResponse("include", 0.6) as never)
      .mockResolvedValueOnce(makeAgentResponse("exclude", 0.4) as never)
      .mockResolvedValueOnce(makeAgentResponse("uncertain", 0.5) as never);

    const result = await screenPaper(1, 16, "Study", "Abstract...", sampleCriteria);

    const avgConf = (0.6 + 0.4 + 0.5) / 3;
    expect(result.consensusConfidence).toBeCloseTo(avgConf * 0.5, 5);
  });

  it("all-uncertain → conflict with human review required", async () => {
    mockGenerateObject
      .mockResolvedValueOnce(makeAgentResponse("uncertain", 0.5) as never)
      .mockResolvedValueOnce(makeAgentResponse("uncertain", 0.5) as never)
      .mockResolvedValueOnce(makeAgentResponse("uncertain", 0.5) as never);

    const result = await screenPaper(1, 17, "Unclear Study", "Abstract...", sampleCriteria);

    expect(result.finalDecision).toBe("conflict");
    expect(result.requiresHumanReview).toBe(true);
  });

  it("conflict reason includes vote counts", async () => {
    mockGenerateObject
      .mockResolvedValueOnce(makeAgentResponse("include", 0.6) as never)
      .mockResolvedValueOnce(makeAgentResponse("exclude", 0.6) as never)
      .mockResolvedValueOnce(makeAgentResponse("uncertain", 0.5) as never);

    const result = await screenPaper(1, 18, "Study", "Abstract...", sampleCriteria);

    expect(result.reason).toMatch(/1 include/);
    expect(result.reason).toMatch(/1 exclude/);
    expect(result.reason).toMatch(/1 uncertain/);
  });

  it("persists decision to db for non-conflict outcomes (include)", async () => {
    mockGenerateObject
      .mockResolvedValueOnce(makeAgentResponse("include", 0.9) as never)
      .mockResolvedValueOnce(makeAgentResponse("include", 0.9) as never)
      .mockResolvedValueOnce(makeAgentResponse("include", 0.9) as never);

    await screenPaper(1, 20, "Clear Study", "Abstract...", sampleCriteria);

    expect(mockInsert).toHaveBeenCalledOnce();
    expect(mockValues).toHaveBeenCalledWith(
      expect.objectContaining({
        projectId: 1,
        paperId: 20,
        stage: "title_abstract",
        decision: "include",
        decidedBy: "ai",
      })
    );
    expect(mockOnConflictDoUpdate).toHaveBeenCalledOnce();
  });

  it("persists decision to db for non-conflict outcomes (exclude)", async () => {
    mockGenerateObject
      .mockResolvedValueOnce(makeAgentResponse("exclude", 0.9) as never)
      .mockResolvedValueOnce(makeAgentResponse("exclude", 0.9) as never)
      .mockResolvedValueOnce(makeAgentResponse("exclude", 0.9) as never);

    await screenPaper(1, 20, "Case Report", "Abstract...", sampleCriteria);

    expect(mockInsert).toHaveBeenCalledOnce();
    expect(mockValues).toHaveBeenCalledWith(
      expect.objectContaining({
        decision: "exclude",
        decidedBy: "ai",
      })
    );
  });

  it("does NOT persist decision to db for conflict outcomes", async () => {
    mockGenerateObject
      .mockResolvedValueOnce(makeAgentResponse("include", 0.6) as never)
      .mockResolvedValueOnce(makeAgentResponse("exclude", 0.6) as never)
      .mockResolvedValueOnce(makeAgentResponse("uncertain", 0.5) as never);

    await screenPaper(1, 21, "Conflict Study", "Abstract...", sampleCriteria);

    expect(mockInsert).not.toHaveBeenCalled();
  });

  it("returns all three agent decisions with correct indices", async () => {
    mockGenerateObject
      .mockResolvedValueOnce(makeAgentResponse("include", 0.9) as never)
      .mockResolvedValueOnce(makeAgentResponse("include", 0.85) as never)
      .mockResolvedValueOnce(makeAgentResponse("include", 0.8) as never);

    const result = await screenPaper(1, 22, "Study", "Abstract...", sampleCriteria);

    expect(result.agentDecisions).toHaveLength(3);
    expect(result.agentDecisions[0].agentIndex).toBe(0);
    expect(result.agentDecisions[1].agentIndex).toBe(1);
    expect(result.agentDecisions[2].agentIndex).toBe(2);
  });

  it("agent decisions include matched criteria arrays", async () => {
    mockGenerateObject
      .mockResolvedValueOnce(makeAgentResponse("include", 0.9) as never)
      .mockResolvedValueOnce(makeAgentResponse("include", 0.85) as never)
      .mockResolvedValueOnce(makeAgentResponse("include", 0.8) as never);

    const result = await screenPaper(1, 22, "Study", "Abstract...", sampleCriteria);
    const decision = result.agentDecisions[0];

    expect(decision.matchedInclusion).toEqual([1]);
    expect(decision.matchedExclusion).toEqual([]);
  });

  it("calls generateObject exactly 3 times per paper", async () => {
    mockGenerateObject
      .mockResolvedValueOnce(makeAgentResponse("exclude", 0.8) as never)
      .mockResolvedValueOnce(makeAgentResponse("exclude", 0.8) as never)
      .mockResolvedValueOnce(makeAgentResponse("exclude", 0.8) as never);

    await screenPaper(1, 23, "Study", "Abstract...", sampleCriteria);

    expect(mockGenerateObject).toHaveBeenCalledTimes(3);
  });
});

// ---------------------------------------------------------------------------
// batchScreenPapers
// ---------------------------------------------------------------------------

describe("batchScreenPapers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockOnConflictDoUpdate.mockResolvedValue(undefined);
    mockValues.mockReturnValue({ onConflictDoUpdate: mockOnConflictDoUpdate });
    mockInsert.mockReturnValue({ values: mockValues });
  });

  it("returns one ConsensusResult per paper", async () => {
    mockGenerateObject.mockResolvedValue(makeAgentResponse("include", 0.9) as never);

    const papers = [
      { paperId: 1, title: "Paper A", abstract: "Abstract A" },
      { paperId: 2, title: "Paper B", abstract: "Abstract B" },
    ];

    const results = await batchScreenPapers(1, papers, sampleCriteria);

    expect(results).toHaveLength(2);
    expect(results[0].finalDecision).toBe("include");
    expect(results[1].finalDecision).toBe("include");
  });

  it("calls onProgress callback after each batch of 5", async () => {
    mockGenerateObject.mockResolvedValue(makeAgentResponse("exclude", 0.8) as never);

    const papers = Array.from({ length: 6 }, (_, i) => ({
      paperId: i + 1,
      title: `Paper ${i + 1}`,
      abstract: "Abstract",
    }));

    const onProgress = vi.fn();
    await batchScreenPapers(1, papers, sampleCriteria, onProgress);

    // 6 papers with batchSize=5 → 2 batches → 2 progress calls
    expect(onProgress).toHaveBeenCalledTimes(2);
    expect(onProgress).toHaveBeenNthCalledWith(1, 5, 6);
    expect(onProgress).toHaveBeenNthCalledWith(2, 6, 6);
  });

  it("returns empty array for empty papers input", async () => {
    const results = await batchScreenPapers(1, [], sampleCriteria);
    expect(results).toEqual([]);
    expect(mockGenerateObject).not.toHaveBeenCalled();
  });

  it("works without an optional onProgress callback", async () => {
    mockGenerateObject.mockResolvedValue(makeAgentResponse("include", 0.9) as never);

    const papers = [{ paperId: 1, title: "Paper A", abstract: "Abstract A" }];
    const results = await batchScreenPapers(1, papers, sampleCriteria);

    expect(results).toHaveLength(1);
  });

  it("processes exactly 5 papers per batch", async () => {
    mockGenerateObject.mockResolvedValue(makeAgentResponse("include", 0.9) as never);

    // 5 papers = 1 batch
    const papers = Array.from({ length: 5 }, (_, i) => ({
      paperId: i + 1,
      title: `Paper ${i + 1}`,
      abstract: "Abstract",
    }));

    const onProgress = vi.fn();
    await batchScreenPapers(1, papers, sampleCriteria, onProgress);

    expect(onProgress).toHaveBeenCalledTimes(1);
    expect(onProgress).toHaveBeenCalledWith(5, 5);
  });
});

// ---------------------------------------------------------------------------
// getScreeningSummary
// ---------------------------------------------------------------------------

function setupSelectMock(rows: Array<{ stage: string; decision: string; count: number }>) {
  // Build a minimal drizzle-like chain: select().from().where().groupBy() → Promise
  const groupBy = vi.fn().mockResolvedValue(rows);
  const where = vi.fn(() => ({ groupBy }));
  const from = vi.fn(() => ({ where }));
  mockSelect.mockReturnValue({ from });
}

describe("getScreeningSummary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns zeroed summary when no decisions exist", async () => {
    setupSelectMock([]);

    const summary = await getScreeningSummary(1);

    expect(summary.titleAbstract.include).toBe(0);
    expect(summary.titleAbstract.exclude).toBe(0);
    expect(summary.titleAbstract.maybe).toBe(0);
    expect(summary.fullText.include).toBe(0);
    expect(summary.fullText.exclude).toBe(0);
    expect(summary.fullText.maybe).toBe(0);
  });

  it("correctly maps title_abstract stage decisions", async () => {
    setupSelectMock([
      { stage: "title_abstract", decision: "include", count: 10 },
      { stage: "title_abstract", decision: "exclude", count: 5 },
    ]);

    const summary = await getScreeningSummary(1);

    expect(summary.titleAbstract.include).toBe(10);
    expect(summary.titleAbstract.exclude).toBe(5);
    expect(summary.titleAbstract.maybe).toBe(0);
  });

  it("correctly maps full_text stage decisions", async () => {
    setupSelectMock([
      { stage: "full_text", decision: "include", count: 7 },
      { stage: "full_text", decision: "exclude", count: 3 },
    ]);

    const summary = await getScreeningSummary(2);

    expect(summary.fullText.include).toBe(7);
    expect(summary.fullText.exclude).toBe(3);
    expect(summary.fullText.maybe).toBe(0);
  });

  it("correctly maps decisions from both stages simultaneously", async () => {
    setupSelectMock([
      { stage: "title_abstract", decision: "include", count: 20 },
      { stage: "title_abstract", decision: "exclude", count: 15 },
      { stage: "full_text", decision: "include", count: 12 },
      { stage: "full_text", decision: "exclude", count: 8 },
    ]);

    const summary = await getScreeningSummary(1);

    expect(summary.titleAbstract.include).toBe(20);
    expect(summary.titleAbstract.exclude).toBe(15);
    expect(summary.fullText.include).toBe(12);
    expect(summary.fullText.exclude).toBe(8);
  });
});

// ---------------------------------------------------------------------------
// Type shape validation
// ---------------------------------------------------------------------------

describe("ConsensusResult and AgentDecision shape", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockOnConflictDoUpdate.mockResolvedValue(undefined);
    mockValues.mockReturnValue({ onConflictDoUpdate: mockOnConflictDoUpdate });
    mockInsert.mockReturnValue({ values: mockValues });
  });

  it("result has all required ConsensusResult fields with correct types", async () => {
    mockGenerateObject.mockResolvedValue(makeAgentResponse("include", 0.9) as never);

    const result: ConsensusResult = await screenPaper(
      1,
      30,
      "Title",
      "Abstract",
      sampleCriteria
    );

    expect(typeof result.finalDecision).toBe("string");
    expect(typeof result.consensusConfidence).toBe("number");
    expect(typeof result.requiresHumanReview).toBe("boolean");
    expect(typeof result.reason).toBe("string");
    expect(Array.isArray(result.agentDecisions)).toBe(true);
  });

  it("each AgentDecision has all required fields", async () => {
    mockGenerateObject.mockResolvedValue(makeAgentResponse("include", 0.9) as never);

    const result = await screenPaper(1, 31, "Title", "Abstract", sampleCriteria);
    const decision: AgentDecision = result.agentDecisions[0];

    expect(Array.isArray(decision.matchedInclusion)).toBe(true);
    expect(Array.isArray(decision.matchedExclusion)).toBe(true);
    expect(typeof decision.confidence).toBe("number");
    expect(typeof decision.reasoning).toBe("string");
    expect(typeof decision.agentIndex).toBe("number");
    expect(typeof decision.decision).toBe("string");
  });

  it("confidence score is always between 0 and 1 for unanimous include", async () => {
    mockGenerateObject
      .mockResolvedValueOnce(makeAgentResponse("include", 1.0) as never)
      .mockResolvedValueOnce(makeAgentResponse("include", 1.0) as never)
      .mockResolvedValueOnce(makeAgentResponse("include", 1.0) as never);

    const result = await screenPaper(1, 32, "Title", "Abstract", sampleCriteria);

    expect(result.consensusConfidence).toBeGreaterThanOrEqual(0);
    expect(result.consensusConfidence).toBeLessThanOrEqual(1);
  });

  it("confidence score for conflict is lower than for unanimous agree", async () => {
    // unanimous include with confidence 0.8
    mockGenerateObject
      .mockResolvedValueOnce(makeAgentResponse("include", 0.8) as never)
      .mockResolvedValueOnce(makeAgentResponse("include", 0.8) as never)
      .mockResolvedValueOnce(makeAgentResponse("include", 0.8) as never);

    const unanimousResult = await screenPaper(1, 33, "Title", "Abstract", sampleCriteria);

    vi.clearAllMocks();
    mockInsert.mockReturnValue({ values: mockValues });
    mockValues.mockReturnValue({ onConflictDoUpdate: mockOnConflictDoUpdate });

    // conflict with same per-agent confidence 0.8
    mockGenerateObject
      .mockResolvedValueOnce(makeAgentResponse("include", 0.8) as never)
      .mockResolvedValueOnce(makeAgentResponse("exclude", 0.8) as never)
      .mockResolvedValueOnce(makeAgentResponse("uncertain", 0.8) as never);

    const conflictResult = await screenPaper(1, 34, "Title", "Abstract", sampleCriteria);

    expect(conflictResult.consensusConfidence).toBeLessThan(unanimousResult.consensusConfidence);
  });
});
