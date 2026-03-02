/**
 * RALPH SR — Cycle 11: Screening Engine & AI Consensus
 *
 * Phase 2 begins: mock-heavy tests for async modules.
 * Targets: screening-engine.ts (triple-agent consensus) and
 *          dual-screening.ts (Cohen's kappa, conflict classification).
 *
 * Stages:
 *   1. Consensus Resolution Logic (replicate resolveConsensus)
 *   2. Zod Schema Validation (agentDecisionSchema)
 *   3. formatCriteria Helper (replicate)
 *   4. Confidence Clamping
 *   5. Cohen's Kappa Math (replicate formula)
 *   6. Conflict Type Classification
 *   7. Mock-Based screenPaper (vi.mock AI + DB)
 *   8. Type Contracts & Edge Cases
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { z } from "zod";

import type {
  ScreeningCriterion,
  AgentDecision,
  ConsensusResult,
} from "../../screening-engine";

import type {
  HumanDecisionInput,
  ConflictInfo,
  MultiReviewerConflict,
  AgreementStats,
  UnblindedResult,
  ScreeningQueueOptions,
} from "../../dual-screening";

// ---------------------------------------------------------------------------
// Replicate resolveConsensus (private in source — test the algorithm)
// ---------------------------------------------------------------------------

function resolveConsensus(decisions: AgentDecision[]): ConsensusResult {
  const votes = decisions.map((d) => d.decision);
  const includeCount = votes.filter((v) => v === "include").length;
  const excludeCount = votes.filter((v) => v === "exclude").length;
  const uncertainCount = votes.filter((v) => v === "uncertain").length;

  const avgConfidence =
    decisions.reduce((sum, d) => sum + d.confidence, 0) / decisions.length;

  if (includeCount === 3) {
    return {
      finalDecision: "include",
      agentDecisions: decisions,
      consensusConfidence: avgConfidence,
      requiresHumanReview: false,
      reason: "All 3 agents voted to include",
    };
  }

  if (excludeCount === 3) {
    return {
      finalDecision: "exclude",
      agentDecisions: decisions,
      consensusConfidence: avgConfidence,
      requiresHumanReview: false,
      reason: "All 3 agents voted to exclude",
    };
  }

  if (includeCount >= 2) {
    return {
      finalDecision: "include",
      agentDecisions: decisions,
      consensusConfidence: avgConfidence * 0.85,
      requiresHumanReview: false,
      reason: `${includeCount}/3 agents voted to include (majority consensus)`,
    };
  }

  if (excludeCount >= 2) {
    return {
      finalDecision: "exclude",
      agentDecisions: decisions,
      consensusConfidence: avgConfidence * 0.85,
      requiresHumanReview: false,
      reason: `${excludeCount}/3 agents voted to exclude (majority consensus)`,
    };
  }

  return {
    finalDecision: "conflict",
    agentDecisions: decisions,
    consensusConfidence: avgConfidence * 0.5,
    requiresHumanReview: true,
    reason: `No consensus: ${includeCount} include, ${excludeCount} exclude, ${uncertainCount} uncertain — requires human review`,
  };
}

// ---------------------------------------------------------------------------
// Replicate formatCriteria (private in source)
// ---------------------------------------------------------------------------

function formatCriteria(criteria: ScreeningCriterion[]): string {
  const inclusion = criteria
    .filter((c) => c.type === "inclusion")
    .map((c) => `  [ID:${c.id}] ${c.description}`)
    .join("\n");

  const exclusion = criteria
    .filter((c) => c.type === "exclusion")
    .map((c) => `  [ID:${c.id}] ${c.description}`)
    .join("\n");

  return `INCLUSION CRITERIA:\n${inclusion}\n\nEXCLUSION CRITERIA:\n${exclusion}`;
}

// ---------------------------------------------------------------------------
// Replicate Cohen's kappa computation (from dual-screening.ts)
// ---------------------------------------------------------------------------

function computeKappa(
  pairs: Array<[string, string]> // [rater1Decision, rater2Decision]
): { kappa: number; po: number; pe: number; interpretation: string } {
  if (pairs.length === 0) {
    return { kappa: 0, po: 0, pe: 0, interpretation: "No data" };
  }

  const n = pairs.length;
  let agreements = 0;
  let r1Include = 0, r1Exclude = 0;
  let r2Include = 0, r2Exclude = 0;

  for (const [d1, d2] of pairs) {
    const s1 = d1 === "include" ? "include" : "exclude";
    const s2 = d2 === "include" ? "include" : "exclude";

    if (s1 === "include") r1Include++; else r1Exclude++;
    if (s2 === "include") r2Include++; else r2Exclude++;
    if (s1 === s2) agreements++;
  }

  const po = agreements / n;
  const pR1Inc = r1Include / n;
  const pR1Exc = r1Exclude / n;
  const pR2Inc = r2Include / n;
  const pR2Exc = r2Exclude / n;
  const pe = pR1Inc * pR2Inc + pR1Exc * pR2Exc;
  const kappa = pe === 1 ? 1 : (po - pe) / (1 - pe);

  const interpretation =
    kappa >= 0.81 ? "Almost perfect agreement"
      : kappa >= 0.61 ? "Substantial agreement"
        : kappa >= 0.41 ? "Moderate agreement"
          : kappa >= 0.21 ? "Fair agreement"
            : kappa >= 0 ? "Slight agreement"
              : "Poor agreement";

  return { kappa: Math.round(kappa * 100) / 100, po, pe, interpretation };
}

// ---------------------------------------------------------------------------
// Replicate conflict type classification (from getUnblindedResults)
// ---------------------------------------------------------------------------

function classifyConflict(
  aiDecision: string | null,
  humanDecision: string | null
): UnblindedResult["conflictType"] {
  if (!aiDecision || !humanDecision || aiDecision === humanDecision) return "none";
  if (aiDecision === "include" && humanDecision === "exclude") return "ai-include-human-exclude";
  if (aiDecision === "exclude" && humanDecision === "include") return "ai-exclude-human-include";
  if (aiDecision === "include" && humanDecision === "maybe") return "ai-include-human-maybe";
  if (aiDecision === "exclude" && humanDecision === "maybe") return "ai-exclude-human-maybe";
  return "none";
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeAgent(
  index: number,
  decision: "include" | "exclude" | "uncertain",
  confidence: number = 0.9
): AgentDecision {
  return {
    agentIndex: index,
    decision,
    confidence,
    reasoning: `Agent ${index} decided ${decision}`,
    matchedInclusion: decision === "include" ? [1] : [],
    matchedExclusion: decision === "exclude" ? [2] : [],
  };
}

// Zod schema replicated from screening-engine.ts
const agentDecisionSchema = z.object({
  decision: z.enum(["include", "exclude", "uncertain"]),
  confidence: z.number().describe("Confidence score between 0 and 1"),
  reasoning: z.string(),
  matched_inclusion: z.array(z.number()),
  matched_exclusion: z.array(z.number()),
});

// =====================================================================
// STAGE 1: Consensus Resolution Logic
// =====================================================================

describe("Cycle 11 — Stage 1: Consensus Resolution Logic", () => {
  it("unanimous include → include, no human review", () => {
    const result = resolveConsensus([
      makeAgent(0, "include"),
      makeAgent(1, "include"),
      makeAgent(2, "include"),
    ]);
    expect(result.finalDecision).toBe("include");
    expect(result.requiresHumanReview).toBe(false);
    expect(result.reason).toContain("All 3");
  });

  it("unanimous exclude → exclude, no human review", () => {
    const result = resolveConsensus([
      makeAgent(0, "exclude"),
      makeAgent(1, "exclude"),
      makeAgent(2, "exclude"),
    ]);
    expect(result.finalDecision).toBe("exclude");
    expect(result.requiresHumanReview).toBe(false);
  });

  it("2/3 include → include (majority), confidence scaled by 0.85", () => {
    const result = resolveConsensus([
      makeAgent(0, "include", 0.9),
      makeAgent(1, "include", 0.8),
      makeAgent(2, "exclude", 0.7),
    ]);
    expect(result.finalDecision).toBe("include");
    expect(result.requiresHumanReview).toBe(false);
    const avgConf = (0.9 + 0.8 + 0.7) / 3;
    expect(result.consensusConfidence).toBeCloseTo(avgConf * 0.85, 5);
  });

  it("2/3 exclude → exclude (majority), confidence scaled by 0.85", () => {
    const result = resolveConsensus([
      makeAgent(0, "exclude", 0.9),
      makeAgent(1, "exclude", 0.8),
      makeAgent(2, "include", 0.6),
    ]);
    expect(result.finalDecision).toBe("exclude");
    expect(result.consensusConfidence).toBeCloseTo(((0.9 + 0.8 + 0.6) / 3) * 0.85, 5);
  });

  it("2 include + 1 uncertain → include (majority)", () => {
    const result = resolveConsensus([
      makeAgent(0, "include"),
      makeAgent(1, "include"),
      makeAgent(2, "uncertain"),
    ]);
    expect(result.finalDecision).toBe("include");
  });

  it("2 exclude + 1 uncertain → exclude (majority)", () => {
    const result = resolveConsensus([
      makeAgent(0, "exclude"),
      makeAgent(1, "uncertain"),
      makeAgent(2, "exclude"),
    ]);
    expect(result.finalDecision).toBe("exclude");
  });

  it("1 include, 1 exclude, 1 uncertain → conflict, requires human review", () => {
    const result = resolveConsensus([
      makeAgent(0, "include"),
      makeAgent(1, "exclude"),
      makeAgent(2, "uncertain"),
    ]);
    expect(result.finalDecision).toBe("conflict");
    expect(result.requiresHumanReview).toBe(true);
    expect(result.reason).toContain("No consensus");
    expect(result.reason).toContain("requires human review");
  });

  it("3 uncertain → conflict", () => {
    const result = resolveConsensus([
      makeAgent(0, "uncertain"),
      makeAgent(1, "uncertain"),
      makeAgent(2, "uncertain"),
    ]);
    expect(result.finalDecision).toBe("conflict");
    expect(result.requiresHumanReview).toBe(true);
  });

  it("2 uncertain + 1 include → conflict (uncertain doesn't count as include/exclude)", () => {
    const result = resolveConsensus([
      makeAgent(0, "uncertain"),
      makeAgent(1, "uncertain"),
      makeAgent(2, "include"),
    ]);
    // includeCount=1, excludeCount=0, uncertainCount=2 → none >= 2 in include/exclude
    expect(result.finalDecision).toBe("conflict");
    expect(result.requiresHumanReview).toBe(true);
  });

  it("conflict confidence is halved compared to avg", () => {
    const result = resolveConsensus([
      makeAgent(0, "include", 0.8),
      makeAgent(1, "exclude", 0.7),
      makeAgent(2, "uncertain", 0.6),
    ]);
    const avgConf = (0.8 + 0.7 + 0.6) / 3;
    expect(result.consensusConfidence).toBeCloseTo(avgConf * 0.5, 5);
  });

  it("unanimous confidence equals raw average (no scaling)", () => {
    const result = resolveConsensus([
      makeAgent(0, "include", 0.95),
      makeAgent(1, "include", 0.85),
      makeAgent(2, "include", 0.75),
    ]);
    expect(result.consensusConfidence).toBeCloseTo((0.95 + 0.85 + 0.75) / 3, 5);
  });

  it("agentDecisions array is preserved in result", () => {
    const agents = [makeAgent(0, "include"), makeAgent(1, "exclude"), makeAgent(2, "include")];
    const result = resolveConsensus(agents);
    expect(result.agentDecisions).toHaveLength(3);
    expect(result.agentDecisions[0].agentIndex).toBe(0);
    expect(result.agentDecisions[2].agentIndex).toBe(2);
  });
});

// =====================================================================
// STAGE 2: Zod Schema Validation
// =====================================================================

describe("Cycle 11 — Stage 2: Zod Schema Validation", () => {
  it("valid include decision passes", () => {
    const result = agentDecisionSchema.safeParse({
      decision: "include",
      confidence: 0.85,
      reasoning: "Study matches PICO",
      matched_inclusion: [1, 3],
      matched_exclusion: [],
    });
    expect(result.success).toBe(true);
  });

  it("valid exclude decision passes", () => {
    const result = agentDecisionSchema.safeParse({
      decision: "exclude",
      confidence: 0.72,
      reasoning: "Wrong population",
      matched_inclusion: [],
      matched_exclusion: [2],
    });
    expect(result.success).toBe(true);
  });

  it("valid uncertain decision passes", () => {
    const result = agentDecisionSchema.safeParse({
      decision: "uncertain",
      confidence: 0.45,
      reasoning: "Insufficient information",
      matched_inclusion: [],
      matched_exclusion: [],
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid decision value", () => {
    const result = agentDecisionSchema.safeParse({
      decision: "maybe",
      confidence: 0.5,
      reasoning: "test",
      matched_inclusion: [],
      matched_exclusion: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejects non-numeric confidence", () => {
    const result = agentDecisionSchema.safeParse({
      decision: "include",
      confidence: "high",
      reasoning: "test",
      matched_inclusion: [],
      matched_exclusion: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing reasoning", () => {
    const result = agentDecisionSchema.safeParse({
      decision: "include",
      confidence: 0.9,
      matched_inclusion: [],
      matched_exclusion: [],
    });
    expect(result.success).toBe(false);
  });

  it("rejects non-array matched_inclusion", () => {
    const result = agentDecisionSchema.safeParse({
      decision: "include",
      confidence: 0.9,
      reasoning: "test",
      matched_inclusion: "all",
      matched_exclusion: [],
    });
    expect(result.success).toBe(false);
  });

  it("allows negative confidence (schema doesn't constrain range)", () => {
    const result = agentDecisionSchema.safeParse({
      decision: "include",
      confidence: -0.5,
      reasoning: "test",
      matched_inclusion: [],
      matched_exclusion: [],
    });
    // The Zod schema uses z.number() without .min/.max, so this passes at schema level
    // The clamping happens in runScreeningAgent, not in the schema
    expect(result.success).toBe(true);
  });
});

// =====================================================================
// STAGE 3: formatCriteria Helper
// =====================================================================

describe("Cycle 11 — Stage 3: formatCriteria Helper", () => {
  const criteria: ScreeningCriterion[] = [
    { id: 1, type: "inclusion", description: "RCT or quasi-RCT" },
    { id: 2, type: "inclusion", description: "Adult patients ≥18 years" },
    { id: 3, type: "exclusion", description: "Animal studies" },
    { id: 4, type: "exclusion", description: "Case reports" },
  ];

  it("formats inclusion and exclusion criteria into labeled sections", () => {
    const formatted = formatCriteria(criteria);
    expect(formatted).toContain("INCLUSION CRITERIA:");
    expect(formatted).toContain("EXCLUSION CRITERIA:");
  });

  it("prefixes each criterion with [ID:n]", () => {
    const formatted = formatCriteria(criteria);
    expect(formatted).toContain("[ID:1]");
    expect(formatted).toContain("[ID:4]");
  });

  it("separates inclusion from exclusion correctly", () => {
    const formatted = formatCriteria(criteria);
    const parts = formatted.split("EXCLUSION CRITERIA:");
    expect(parts[0]).toContain("RCT");
    expect(parts[0]).toContain("Adult patients");
    expect(parts[0]).not.toContain("Animal studies");
    expect(parts[1]).toContain("Animal studies");
    expect(parts[1]).toContain("Case reports");
  });

  it("handles empty criteria list", () => {
    const formatted = formatCriteria([]);
    expect(formatted).toContain("INCLUSION CRITERIA:");
    expect(formatted).toContain("EXCLUSION CRITERIA:");
  });

  it("handles only inclusion criteria", () => {
    const formatted = formatCriteria([{ id: 1, type: "inclusion", description: "RCT" }]);
    expect(formatted).toContain("[ID:1] RCT");
  });

  it("preserves optional category field without affecting output", () => {
    const withCategory: ScreeningCriterion[] = [
      { id: 5, type: "inclusion", description: "Diabetic patients", category: "population" },
    ];
    const formatted = formatCriteria(withCategory);
    expect(formatted).toContain("[ID:5] Diabetic patients");
  });
});

// =====================================================================
// STAGE 4: Confidence Clamping
// =====================================================================

describe("Cycle 11 — Stage 4: Confidence Clamping", () => {
  // The clamping logic: Math.max(0, Math.min(1, confidence))
  function clampConfidence(raw: number): number {
    return Math.max(0, Math.min(1, raw));
  }

  it("normal value [0,1] passes through unchanged", () => {
    expect(clampConfidence(0.85)).toBe(0.85);
  });

  it("clamps value > 1 to 1", () => {
    expect(clampConfidence(1.5)).toBe(1);
  });

  it("clamps negative value to 0", () => {
    expect(clampConfidence(-0.3)).toBe(0);
  });

  it("preserves boundary 0", () => {
    expect(clampConfidence(0)).toBe(0);
  });

  it("preserves boundary 1", () => {
    expect(clampConfidence(1)).toBe(1);
  });

  it("handles very large values", () => {
    expect(clampConfidence(999)).toBe(1);
  });

  it("handles very negative values", () => {
    expect(clampConfidence(-999)).toBe(0);
  });
});

// =====================================================================
// STAGE 5: Cohen's Kappa Math
// =====================================================================

describe("Cycle 11 — Stage 5: Cohen's Kappa Math", () => {
  it("perfect agreement → kappa = 1.0", () => {
    const pairs: [string, string][] = [
      ["include", "include"],
      ["exclude", "exclude"],
      ["include", "include"],
      ["exclude", "exclude"],
    ];
    const { kappa } = computeKappa(pairs);
    expect(kappa).toBe(1.0);
  });

  it("complete disagreement → kappa < 0", () => {
    const pairs: [string, string][] = [
      ["include", "exclude"],
      ["exclude", "include"],
      ["include", "exclude"],
      ["exclude", "include"],
    ];
    const { kappa } = computeKappa(pairs);
    expect(kappa).toBeLessThan(0);
  });

  it("chance agreement → kappa ≈ 0", () => {
    // Construct a case where observed = expected by chance
    // Both raters include 50% and agree 50%
    const pairs: [string, string][] = [
      ["include", "include"],
      ["include", "exclude"],
      ["exclude", "include"],
      ["exclude", "exclude"],
    ];
    const { kappa } = computeKappa(pairs);
    expect(kappa).toBeCloseTo(0, 1);
  });

  it("known textbook example: substantial agreement", () => {
    // Classic example: 85% observed agreement, moderate base rates
    const pairs: [string, string][] = [];
    // 70 agree-include, 15 agree-exclude, 10 disagree inc-exc, 5 disagree exc-inc
    for (let i = 0; i < 70; i++) pairs.push(["include", "include"]);
    for (let i = 0; i < 15; i++) pairs.push(["exclude", "exclude"]);
    for (let i = 0; i < 10; i++) pairs.push(["include", "exclude"]);
    for (let i = 0; i < 5; i++) pairs.push(["exclude", "include"]);

    const { kappa, po, interpretation } = computeKappa(pairs);
    expect(po).toBe(85 / 100);
    expect(kappa).toBeGreaterThan(0.41);
    expect(kappa).toBeLessThan(1.0);
    expect(["Substantial agreement", "Moderate agreement"]).toContain(interpretation);
  });

  it("empty pairs → kappa = 0", () => {
    const { kappa } = computeKappa([]);
    expect(kappa).toBe(0);
  });

  it("'maybe' is treated as 'exclude' for kappa", () => {
    // The source code collapses maybe → exclude for binary comparison
    const pairs: [string, string][] = [
      ["include", "include"],
      ["maybe", "maybe"],  // both → exclude → agree
      ["include", "maybe"], // include vs exclude → disagree
    ];
    const { po } = computeKappa(pairs);
    expect(po).toBeCloseTo(2 / 3, 2); // 2 agreements out of 3
  });

  it("interpretation thresholds are correct", () => {
    // Build pairs to get specific kappa ranges
    expect(computeKappa([["include", "include"]]).interpretation).toBe("Almost perfect agreement");

    // All disagree
    const poorPairs: [string, string][] = [
      ["include", "exclude"],
      ["exclude", "include"],
    ];
    const poor = computeKappa(poorPairs);
    expect(poor.interpretation).toBe("Poor agreement");
  });

  it("when pe = 1 (degenerate case), kappa = 1", () => {
    // If both raters always choose the same category, pe = 1
    // and the formula special-cases this to kappa = 1
    const pairs: [string, string][] = [
      ["include", "include"],
      ["include", "include"],
    ];
    const { kappa } = computeKappa(pairs);
    expect(kappa).toBe(1);
  });
});

// =====================================================================
// STAGE 6: Conflict Type Classification
// =====================================================================

describe("Cycle 11 — Stage 6: Conflict Type Classification", () => {
  it("ai-include vs human-exclude → ai-include-human-exclude", () => {
    expect(classifyConflict("include", "exclude")).toBe("ai-include-human-exclude");
  });

  it("ai-exclude vs human-include → ai-exclude-human-include", () => {
    expect(classifyConflict("exclude", "include")).toBe("ai-exclude-human-include");
  });

  it("ai-include vs human-maybe → ai-include-human-maybe", () => {
    expect(classifyConflict("include", "maybe")).toBe("ai-include-human-maybe");
  });

  it("ai-exclude vs human-maybe → ai-exclude-human-maybe", () => {
    expect(classifyConflict("exclude", "maybe")).toBe("ai-exclude-human-maybe");
  });

  it("same decision → none", () => {
    expect(classifyConflict("include", "include")).toBe("none");
    expect(classifyConflict("exclude", "exclude")).toBe("none");
  });

  it("null AI decision → none", () => {
    expect(classifyConflict(null, "include")).toBe("none");
  });

  it("null human decision → none", () => {
    expect(classifyConflict("include", null)).toBe("none");
  });

  it("both null → none", () => {
    expect(classifyConflict(null, null)).toBe("none");
  });

  it("exhaustive: all 5 conflict types are representable", () => {
    const types = new Set<UnblindedResult["conflictType"]>([
      "none",
      "ai-include-human-exclude",
      "ai-exclude-human-include",
      "ai-include-human-maybe",
      "ai-exclude-human-maybe",
    ]);
    expect(types.size).toBe(5);
  });
});

// =====================================================================
// STAGE 7: Mock-Based screenPaper
// =====================================================================

// We mock the dependencies at the module level
vi.mock("ai", () => ({
  generateObject: vi.fn(),
}));

vi.mock("@/lib/ai/models", () => ({
  getSmallModel: vi.fn(() => "mock-model"),
}));

vi.mock("@/lib/ai/prompts/systematic-review", () => ({
  getScreeningAgentPrompt: vi.fn(
    (agentIndex: number, _criteria: string, title: string, _abstract: string) =>
      `Agent ${agentIndex}: screen "${title}"`
  ),
}));

vi.mock("@/lib/db", () => ({
  db: {
    insert: vi.fn(() => ({
      values: vi.fn(() => ({
        onConflictDoUpdate: vi.fn(() => Promise.resolve()),
      })),
    })),
    update: vi.fn(() => ({
      set: vi.fn(() => ({
        where: vi.fn(() => Promise.resolve()),
      })),
    })),
  },
}));

vi.mock("@/lib/db/schema", () => ({
  screeningDecisions: {
    projectId: "projectId",
    paperId: "paperId",
    stage: "stage",
    reviewerId: "reviewerId",
  },
  projectPapers: {
    project_id: "project_id",
    paper_id: "paper_id",
  },
}));

describe("Cycle 11 — Stage 7: Mock-Based screenPaper", () => {
  let screenPaper: typeof import("../../screening-engine").screenPaper;
  let generateObjectMock: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    vi.clearAllMocks();

    const aiModule = await import("ai");
    generateObjectMock = aiModule.generateObject as ReturnType<typeof vi.fn>;

    const mod = await import("../../screening-engine");
    screenPaper = mod.screenPaper;
  });

  it("3 agents all include → consensus include", async () => {
    generateObjectMock.mockResolvedValue({
      object: {
        decision: "include",
        confidence: 0.9,
        reasoning: "Matches criteria",
        matched_inclusion: [1],
        matched_exclusion: [],
      },
    });

    const result = await screenPaper(
      1, 100, "Test Study on SGLT2 Inhibitors", "A randomized trial...",
      [{ id: 1, type: "inclusion", description: "RCT" }]
    );

    expect(result.finalDecision).toBe("include");
    expect(result.agentDecisions).toHaveLength(3);
    expect(result.requiresHumanReview).toBe(false);
    // generateObject called 3 times (one per agent)
    expect(generateObjectMock).toHaveBeenCalledTimes(3);
  });

  it("2 exclude + 1 include → consensus exclude", async () => {
    let callCount = 0;
    generateObjectMock.mockImplementation(() => {
      callCount++;
      return Promise.resolve({
        object: {
          decision: callCount <= 2 ? "exclude" : "include",
          confidence: 0.8,
          reasoning: callCount <= 2 ? "Wrong population" : "Seems relevant",
          matched_inclusion: callCount > 2 ? [1] : [],
          matched_exclusion: callCount <= 2 ? [2] : [],
        },
      });
    });

    const result = await screenPaper(
      1, 101, "Animal Model Study", "Mice were...",
      [
        { id: 1, type: "inclusion", description: "Human studies" },
        { id: 2, type: "exclusion", description: "Animal studies" },
      ]
    );

    expect(result.finalDecision).toBe("exclude");
    expect(result.requiresHumanReview).toBe(false);
  });

  it("1 of each decision → conflict requiring human review", async () => {
    const decisions = ["include", "exclude", "uncertain"];
    let callIdx = 0;
    generateObjectMock.mockImplementation(() => {
      const dec = decisions[callIdx % 3];
      callIdx++;
      return Promise.resolve({
        object: {
          decision: dec,
          confidence: 0.5,
          reasoning: `Agent chose ${dec}`,
          matched_inclusion: [],
          matched_exclusion: [],
        },
      });
    });

    const result = await screenPaper(
      1, 102, "Borderline Study", "Methods unclear...",
      [{ id: 1, type: "inclusion", description: "RCT" }]
    );

    expect(result.finalDecision).toBe("conflict");
    expect(result.requiresHumanReview).toBe(true);
  });

  it("confidence values are clamped to [0, 1]", async () => {
    generateObjectMock.mockResolvedValue({
      object: {
        decision: "include",
        confidence: 1.5, // exceeds 1
        reasoning: "Overconfident",
        matched_inclusion: [1],
        matched_exclusion: [],
      },
    });

    const result = await screenPaper(
      1, 103, "Test", "Abstract",
      [{ id: 1, type: "inclusion", description: "Any" }]
    );

    for (const agent of result.agentDecisions) {
      expect(agent.confidence).toBeLessThanOrEqual(1);
      expect(agent.confidence).toBeGreaterThanOrEqual(0);
    }
  });

  it("negative confidence is clamped to 0", async () => {
    generateObjectMock.mockResolvedValue({
      object: {
        decision: "exclude",
        confidence: -0.5,
        reasoning: "Negative",
        matched_inclusion: [],
        matched_exclusion: [1],
      },
    });

    const result = await screenPaper(
      1, 104, "Test", "Abstract",
      [{ id: 1, type: "exclusion", description: "Any" }]
    );

    for (const agent of result.agentDecisions) {
      expect(agent.confidence).toBe(0);
    }
  });
});

// =====================================================================
// STAGE 8: Type Contracts & Edge Cases
// =====================================================================

describe("Cycle 11 — Stage 8: Type Contracts & Edge Cases", () => {
  it("ScreeningCriterion has required fields", () => {
    const c: ScreeningCriterion = {
      id: 1,
      type: "inclusion",
      description: "Human participants",
    };
    expect(c.id).toBe(1);
    expect(c.type).toBe("inclusion");
    expect(c.description).toBeDefined();
  });

  it("ScreeningCriterion supports optional category", () => {
    const c: ScreeningCriterion = {
      id: 2,
      type: "exclusion",
      description: "Animal studies",
      category: "study_type",
    };
    expect(c.category).toBe("study_type");
  });

  it("AgentDecision tracks matched criteria IDs", () => {
    const d: AgentDecision = {
      agentIndex: 0,
      decision: "include",
      confidence: 0.9,
      reasoning: "Matches population criteria",
      matchedInclusion: [1, 3, 5],
      matchedExclusion: [],
    };
    expect(d.matchedInclusion).toHaveLength(3);
    expect(d.matchedExclusion).toHaveLength(0);
  });

  it("ConsensusResult finalDecision is one of 3 values", () => {
    const validDecisions = ["include", "exclude", "conflict"];
    const r: ConsensusResult = {
      finalDecision: "conflict",
      agentDecisions: [],
      consensusConfidence: 0.4,
      requiresHumanReview: true,
      reason: "test",
    };
    expect(validDecisions).toContain(r.finalDecision);
  });

  it("HumanDecisionInput supports 3 decisions", () => {
    const decisions: HumanDecisionInput["decision"][] = ["include", "exclude", "maybe"];
    expect(decisions).toHaveLength(3);
  });

  it("AgreementStats has kappa and interpretation", () => {
    const s: AgreementStats = {
      totalPapers: 100,
      agreements: 85,
      disagreements: 15,
      kappa: 0.68,
      interpretation: "Substantial agreement",
    };
    expect(s.kappa).toBeGreaterThanOrEqual(-1);
    expect(s.kappa).toBeLessThanOrEqual(1);
  });

  it("UnblindedResult conflictType covers all 5 values", () => {
    const types: UnblindedResult["conflictType"][] = [
      "none",
      "ai-include-human-exclude",
      "ai-exclude-human-include",
      "ai-include-human-maybe",
      "ai-exclude-human-maybe",
    ];
    expect(new Set(types).size).toBe(5);
  });

  it("ScreeningQueueOptions filter values", () => {
    const filters: ScreeningQueueOptions["filter"][] = [
      "all", "unscreened", "conflicts", "uncertain",
    ];
    expect(filters).toHaveLength(4);
  });

  it("MultiReviewerConflict tracks per-reviewer decisions", () => {
    const conflict: MultiReviewerConflict = {
      paperId: 42,
      paperTitle: "Test Paper",
      decisions: [
        { reviewerId: "r1", decision: "include", reason: "Relevant" },
        { reviewerId: "r2", decision: "exclude", reason: "Wrong population" },
      ],
    };
    expect(conflict.decisions).toHaveLength(2);
    expect(conflict.decisions[0].reviewerId).toBe("r1");
  });

  it("ConflictInfo tracks AI vs human separately", () => {
    const info: ConflictInfo = {
      paperId: 1,
      title: "Test",
      aiDecision: "include",
      humanDecision: "exclude",
      aiReason: "AI thinks relevant",
      humanReason: "Reviewer disagrees",
    };
    expect(info.aiDecision).not.toBe(info.humanDecision);
  });
});
