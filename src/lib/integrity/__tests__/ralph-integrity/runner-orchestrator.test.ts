/**
 * RALPH Integrity — Cycle 5: Orchestrator Tier Gating
 * Separate file to isolate vi.mock calls from other tests.
 */
import { describe, it, expect, vi, afterEach } from "vitest";

vi.mock("../../ai-detection", () => ({
  runAIDetection: vi.fn().mockResolvedValue({
    humanScore: 75,
    aiScore: 25,
    overallRisk: "low",
    paragraphs: [],
    engine: "llm-heuristic",
    stats: {
      avgSentenceLength: 15,
      sentenceLengthStdDev: 5,
      typeTokenRatio: 0.5,
      passiveVoicePercent: 10,
      readabilityGrade: 12,
      hedgingPhraseCount: 1,
    },
  }),
}));

vi.mock("../../plagiarism-engine", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../plagiarism-engine")>();
  return {
    ...actual,
    runPlagiarismCheck: vi.fn().mockResolvedValue({
      similarityScore: 5,
      sourcesScanned: 10,
      matches: [],
      engine: "shingling-scholarly",
    }),
  };
});

vi.mock("../../citation-audit", () => ({
  runCitationAudit: vi.fn().mockResolvedValue({
    totalCitations: 3,
    verifiedCitations: 2,
    issues: [],
    verifiedReferences: [],
  }),
}));

vi.mock("../../self-plagiarism", () => ({
  runSelfPlagiarismCheck: vi.fn().mockResolvedValue({
    selfSimilarityScore: 0,
    matchedDocuments: [],
  }),
}));

describe("Cycle 5: Orchestrator tier gating", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("IC-027: free tier only runs AI detection", async () => {
    const { runIntegrityCheck } = await import("../../index");
    const result = await runIntegrityCheck({
      text: "A".repeat(100),
      plan: "free",
    });

    expect(result.tier).toBe("free");
    expect(result.aiDetection).toBeDefined();
    expect(result.plagiarism).toBeNull();
    expect(result.citationAudit).toBeNull();
  });

  it("IC-028: paid tier runs all engines", async () => {
    const { runIntegrityCheck } = await import("../../index");
    const result = await runIntegrityCheck({
      text: "A".repeat(100),
      plan: "pro",
      userId: "user-1",
    });

    expect(result.tier).toBe("paid");
    expect(result.aiDetection).toBeDefined();
    expect(result.plagiarism).not.toBeNull();
    expect(result.citationAudit).not.toBeNull();
  });

  it("IC-029: mode=ai_detection only runs AI detection even for paid", async () => {
    const { runIntegrityCheck } = await import("../../index");
    const result = await runIntegrityCheck({
      text: "A".repeat(100),
      plan: "pro",
      mode: "ai_detection",
    });

    expect(result.aiDetection).toBeDefined();
    expect(result.plagiarism).toBeNull();
    expect(result.citationAudit).toBeNull();
  });

  it("IC-030: result includes writingQuality section", async () => {
    const { runIntegrityCheck } = await import("../../index");
    const result = await runIntegrityCheck({
      text: "A".repeat(100),
      plan: "free",
    });

    expect(result.writingQuality).toBeDefined();
    expect(typeof result.writingQuality.readabilityGrade).toBe("number");
    expect(typeof result.writingQuality.passiveVoiceCount).toBe("number");
    expect(typeof result.writingQuality.averageSentenceLength).toBe("number");
    expect(Array.isArray(result.writingQuality.suggestions)).toBe(true);
  });

  it("IC-031: result includes checkedAt timestamp", async () => {
    const { runIntegrityCheck } = await import("../../index");
    const result = await runIntegrityCheck({
      text: "A".repeat(100),
      plan: "free",
    });

    expect(result.checkedAt).toBeDefined();
    expect(() => new Date(result.checkedAt)).not.toThrow();
  });

  it("IC-054: self-plagiarism runs when userId provided in full mode", async () => {
    const { runIntegrityCheck } = await import("../../index");
    const result = await runIntegrityCheck({
      text: "A".repeat(100),
      plan: "pro",
      userId: "user-123",
      mode: "full",
    });

    expect(result.selfPlagiarism).toBeDefined();
  });

  it("IC-055: basic plan is treated as paid", async () => {
    const { runIntegrityCheck } = await import("../../index");
    const result = await runIntegrityCheck({
      text: "A".repeat(100),
      plan: "basic",
    });

    expect(result.tier).toBe("paid");
    expect(result.plagiarism).not.toBeNull();
  });

  it("IC-056: institutional plan is treated as paid", async () => {
    const { runIntegrityCheck } = await import("../../index");
    const result = await runIntegrityCheck({
      text: "A".repeat(100),
      plan: "institutional",
    });

    expect(result.tier).toBe("paid");
  });
});
