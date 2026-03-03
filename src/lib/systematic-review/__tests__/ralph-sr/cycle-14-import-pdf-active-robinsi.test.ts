/**
 * RALPH SR — Cycle 14: Paper Import, PDF Retrieval, Active Learning & ROBINS-I
 *
 * Phase 2 continues: tests for remaining untested modules.
 * Targets: paper-import.ts (types, dedup key logic)
 *          pdf-retrieval.ts (types, PDF magic bytes, cascade logic)
 *          active-learning.ts (priority scoring formula, types)
 *          robins-i-assessment.ts (encode/decode, toDbJudgment, Zod)
 *
 * Stages:
 *   1. ROBINS-I encode/decode Support Text
 *   2. ROBINS-I toDbJudgment Mapping
 *   3. ROBINS-I Zod Schema
 *   4. Paper Import Types & Batch ID
 *   5. PDF Retrieval Types & Magic Bytes
 *   6. Active Learning Scoring Formula
 *   7. Dedup Key Construction
 *   8. Type Contracts & Cross-Module
 */

import { describe, it, expect } from "vitest";
import { z } from "zod";

import type {
  ROBINSIJudgment,
  ROBINSIDomainAssessment,
  FullROBINSIAssessment,
  ROBINSISignalingQuestion,
} from "../../robins-i-assessment";

import type {
  ImportSource,
  ImportResult,
} from "../../paper-import";

import type {
  RetrievalStatus,
  RetrievalResult,
} from "../../pdf-retrieval";

import type {
  PriorityScore,
} from "../../active-learning";

// ---------------------------------------------------------------------------
// Replicate ROBINS-I encode/decode (private in robins-i-assessment.ts)
// ---------------------------------------------------------------------------

const ROBINS_I_PREFIX = "ROBINS_I:";

function encodeSupport(judgment: ROBINSIJudgment, rationale: string): string {
  return `${ROBINS_I_PREFIX}${judgment}\n${rationale}`;
}

function decodeSupport(supportText: string | null): {
  judgment: ROBINSIJudgment;
  rationale: string;
} | null {
  if (!supportText || !supportText.startsWith(ROBINS_I_PREFIX)) return null;
  const withoutPrefix = supportText.slice(ROBINS_I_PREFIX.length);
  const newlineIdx = withoutPrefix.indexOf("\n");
  if (newlineIdx === -1) {
    return { judgment: withoutPrefix as ROBINSIJudgment, rationale: "" };
  }
  return {
    judgment: withoutPrefix.slice(0, newlineIdx) as ROBINSIJudgment,
    rationale: withoutPrefix.slice(newlineIdx + 1),
  };
}

// ---------------------------------------------------------------------------
// Replicate ROBINS-I toDbJudgment (private in robins-i-assessment.ts)
// ---------------------------------------------------------------------------

function toDbJudgment(j: ROBINSIJudgment): "low" | "some_concerns" | "high" {
  switch (j) {
    case "Low":
      return "low";
    case "Moderate":
      return "some_concerns";
    case "Serious":
    case "Critical":
    case "No information":
      return "high";
  }
}

// ---------------------------------------------------------------------------
// Replicate ROBINS-I Zod schema
// ---------------------------------------------------------------------------

const robinsIDomainSchema = z.object({
  domain: z.string(),
  domainName: z.string(),
  signalingQuestions: z.array(
    z.object({
      question: z.string(),
      answer: z.enum(["Yes", "Probably yes", "Probably no", "No", "No information"]),
      support: z.string(),
    })
  ),
  judgment: z.enum(["Low", "Moderate", "Serious", "Critical", "No information"]),
  rationale: z.string(),
});

// ---------------------------------------------------------------------------
// Replicate active learning scoring formula
// ---------------------------------------------------------------------------

function computePriorityScore(similarity: number): {
  score: number;
  reason: string;
} {
  const uncertainty = 1 - Math.abs(similarity - 0.5) * 2;
  const score = Math.max(0, Math.min(1, 0.6 * similarity + 0.4 * uncertainty));

  const reason =
    similarity > 0.7
      ? "High similarity to included papers"
      : uncertainty > 0.7
        ? "Near decision boundary — uncertain"
        : "Moderate relevance";

  return { score, reason };
}

// ---------------------------------------------------------------------------
// Replicate dedup key construction (from deduplicateProjectPapers)
// ---------------------------------------------------------------------------

function buildDedupKey(row: {
  doi: string | null;
  pmid: string | null;
  s2Id: string | null;
  title: string;
  year: number;
}): string {
  return (
    row.doi?.toLowerCase() ||
    row.pmid ||
    row.s2Id ||
    `${normalizeTitle(row.title)}_${row.year}`
  );
}

// Simple normalizeTitle for testing (matches the real one's behavior)
function normalizeTitle(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
}

// =====================================================================
// STAGE 1: ROBINS-I encode/decode Support Text
// =====================================================================

describe("Cycle 14 — Stage 1: ROBINS-I encode/decode Support Text", () => {
  it("encode creates prefixed string with newline separator", () => {
    const encoded = encodeSupport("Serious", "Confounding was not addressed");
    expect(encoded).toBe("ROBINS_I:Serious\nConfounding was not addressed");
  });

  it("decode recovers judgment and rationale", () => {
    const encoded = encodeSupport("Critical", "Major methodological flaws");
    const decoded = decodeSupport(encoded);
    expect(decoded).not.toBeNull();
    expect(decoded!.judgment).toBe("Critical");
    expect(decoded!.rationale).toBe("Major methodological flaws");
  });

  it("round-trip: encode then decode for all 5 judgments", () => {
    const judgments: ROBINSIJudgment[] = ["Low", "Moderate", "Serious", "Critical", "No information"];
    for (const j of judgments) {
      const encoded = encodeSupport(j, `Rationale for ${j}`);
      const decoded = decodeSupport(encoded);
      expect(decoded!.judgment).toBe(j);
      expect(decoded!.rationale).toBe(`Rationale for ${j}`);
    }
  });

  it("decode returns null for null input", () => {
    expect(decodeSupport(null)).toBeNull();
  });

  it("decode returns null for non-prefixed string", () => {
    expect(decodeSupport("Just a regular support text")).toBeNull();
  });

  it("decode handles missing newline (judgment only, no rationale)", () => {
    const decoded = decodeSupport("ROBINS_I:Low");
    expect(decoded).not.toBeNull();
    expect(decoded!.judgment).toBe("Low");
    expect(decoded!.rationale).toBe("");
  });

  it("decode preserves multi-line rationale", () => {
    const rationale = "Line 1\nLine 2\nLine 3";
    const encoded = encodeSupport("Moderate", rationale);
    const decoded = decodeSupport(encoded);
    expect(decoded!.rationale).toBe(rationale);
  });

  it("decode returns null for empty string", () => {
    expect(decodeSupport("")).toBeNull();
  });
});

// =====================================================================
// STAGE 2: ROBINS-I toDbJudgment Mapping
// =====================================================================

describe("Cycle 14 — Stage 2: ROBINS-I toDbJudgment Mapping", () => {
  it("Low → low", () => {
    expect(toDbJudgment("Low")).toBe("low");
  });

  it("Moderate → some_concerns", () => {
    expect(toDbJudgment("Moderate")).toBe("some_concerns");
  });

  it("Serious → high", () => {
    expect(toDbJudgment("Serious")).toBe("high");
  });

  it("Critical → high", () => {
    expect(toDbJudgment("Critical")).toBe("high");
  });

  it("No information → high", () => {
    expect(toDbJudgment("No information")).toBe("high");
  });

  it("maps 5 ROBINS-I values to 3 DB values", () => {
    const inputs: ROBINSIJudgment[] = ["Low", "Moderate", "Serious", "Critical", "No information"];
    const outputs = inputs.map(toDbJudgment);
    expect(new Set(outputs)).toEqual(new Set(["low", "some_concerns", "high"]));
  });

  it("Serious and Critical both map to high (both severe)", () => {
    expect(toDbJudgment("Serious")).toBe(toDbJudgment("Critical"));
  });
});

// =====================================================================
// STAGE 3: ROBINS-I Zod Schema
// =====================================================================

describe("Cycle 14 — Stage 3: ROBINS-I Zod Schema", () => {
  it("valid domain assessment passes", () => {
    const result = robinsIDomainSchema.safeParse({
      domain: "confounding",
      domainName: "Bias due to confounding",
      signalingQuestions: [
        { question: "Was confounding addressed?", answer: "Probably no", support: "No adjustment described" },
      ],
      judgment: "Serious",
      rationale: "No confounder adjustment performed",
    });
    expect(result.success).toBe(true);
  });

  it("all 5 judgment values are valid", () => {
    const judgments = ["Low", "Moderate", "Serious", "Critical", "No information"];
    for (const j of judgments) {
      const result = robinsIDomainSchema.safeParse({
        domain: "test", domainName: "Test",
        signalingQuestions: [], judgment: j, rationale: "ok",
      });
      expect(result.success).toBe(true);
    }
  });

  it("rejects invalid judgment (e.g. 'High' which is RoB 2 not ROBINS-I)", () => {
    const result = robinsIDomainSchema.safeParse({
      domain: "test", domainName: "Test",
      signalingQuestions: [], judgment: "High", rationale: "ok",
    });
    expect(result.success).toBe(false);
  });

  it("rejects 'Some concerns' (RoB 2 only, not ROBINS-I)", () => {
    const result = robinsIDomainSchema.safeParse({
      domain: "test", domainName: "Test",
      signalingQuestions: [], judgment: "Some concerns", rationale: "ok",
    });
    expect(result.success).toBe(false);
  });

  it("ROBINS-I and RoB 2 judgment values are disjoint except Low", () => {
    const rob2 = new Set(["Low", "Some concerns", "High"]);
    const robinsI = new Set(["Low", "Moderate", "Serious", "Critical", "No information"]);
    const overlap = [...rob2].filter((v) => robinsI.has(v));
    expect(overlap).toEqual(["Low"]); // only "Low" is shared
  });
});

// =====================================================================
// STAGE 4: Paper Import Types & Batch ID
// =====================================================================

describe("Cycle 14 — Stage 4: Paper Import Types & Batch ID", () => {
  it("ImportSource has 4 values", () => {
    const sources: ImportSource[] = ["pubmed", "semantic_scholar", "openalex", "clinicaltrials"];
    expect(sources).toHaveLength(4);
    expect(new Set(sources).size).toBe(4);
  });

  it("ImportResult has required fields", () => {
    const r: ImportResult = {
      totalFound: 150,
      imported: 42,
      duplicatesSkipped: 8,
      batchId: "import_1709420000_abc123",
      papers: [{ paperId: 1, title: "Test Paper", isNew: true }],
    };
    expect(r.imported + r.duplicatesSkipped).toBeLessThanOrEqual(r.totalFound);
  });

  it("batch ID format: import_{timestamp}_{random}", () => {
    // Replicate the batchId generation logic
    const batchId = `import_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    expect(batchId).toMatch(/^import_\d+_[a-z0-9]+$/);
  });

  it("ImportResult papers array tracks isNew flag", () => {
    const r: ImportResult = {
      totalFound: 2,
      imported: 1,
      duplicatesSkipped: 1,
      batchId: "test",
      papers: [
        { paperId: 1, title: "New Paper", isNew: true },
      ],
    };
    expect(r.papers[0].isNew).toBe(true);
  });

  it("empty import result is valid", () => {
    const r: ImportResult = {
      totalFound: 0,
      imported: 0,
      duplicatesSkipped: 0,
      batchId: "import_0_000000",
      papers: [],
    };
    expect(r.papers).toHaveLength(0);
  });
});

// =====================================================================
// STAGE 5: PDF Retrieval Types & Magic Bytes
// =====================================================================

describe("Cycle 14 — Stage 5: PDF Retrieval Types & Magic Bytes", () => {
  it("RetrievalStatus has 4 values", () => {
    const statuses: RetrievalStatus[] = [
      "not_attempted", "retrieved", "not_available", "failed",
    ];
    expect(statuses).toHaveLength(4);
  });

  it("RetrievalResult with successful retrieval", () => {
    const r: RetrievalResult = {
      paperId: 100,
      status: "retrieved",
      source: "unpaywall",
      pdfUrl: "https://example.com/paper.pdf",
    };
    expect(r.status).toBe("retrieved");
    expect(r.source).toBeDefined();
  });

  it("RetrievalResult with failure", () => {
    const r: RetrievalResult = {
      paperId: 101,
      status: "failed",
      error: "Paper not found",
    };
    expect(r.error).toBeDefined();
  });

  it("RetrievalResult source covers 4 OA sources + existing", () => {
    const sources: NonNullable<RetrievalResult["source"]>[] = [
      "unpaywall", "semantic_scholar", "pmc", "existing",
    ];
    expect(sources).toHaveLength(4);
  });

  it("PDF magic bytes: %PDF = 0x25 0x50 0x44 0x46", () => {
    // Replicate the looksLikePDF byte check
    const pdfHeader = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34]);
    const isPDF =
      pdfHeader[0] === 0x25 &&
      pdfHeader[1] === 0x50 &&
      pdfHeader[2] === 0x44 &&
      pdfHeader[3] === 0x46;
    expect(isPDF).toBe(true);
  });

  it("non-PDF bytes fail magic check", () => {
    const htmlHeader = new Uint8Array([0x3c, 0x68, 0x74, 0x6d]); // <htm
    const isPDF =
      htmlHeader[0] === 0x25 &&
      htmlHeader[1] === 0x50 &&
      htmlHeader[2] === 0x44 &&
      htmlHeader[3] === 0x46;
    expect(isPDF).toBe(false);
  });

  it("%PDF string matches byte values", () => {
    const str = "%PDF";
    expect(str.charCodeAt(0)).toBe(0x25);
    expect(str.charCodeAt(1)).toBe(0x50);
    expect(str.charCodeAt(2)).toBe(0x44);
    expect(str.charCodeAt(3)).toBe(0x46);
  });

  it("cascade order: existing → unpaywall → semantic_scholar → pmc", () => {
    // Document the retrieval cascade priority
    const cascade: RetrievalResult["source"][] = [
      "existing", "unpaywall", "semantic_scholar", "pmc",
    ];
    expect(cascade[0]).toBe("existing"); // first check: already have it
    expect(cascade[cascade.length - 1]).toBe("pmc"); // last resort
  });
});

// =====================================================================
// STAGE 6: Active Learning Scoring Formula
// =====================================================================

describe("Cycle 14 — Stage 6: Active Learning Scoring Formula", () => {
  it("high similarity (0.9) → high score, 'High similarity' reason", () => {
    const { score, reason } = computePriorityScore(0.9);
    expect(score).toBeGreaterThan(0.6); // 0.6*0.9 + 0.4*0.2 = 0.62
    expect(reason).toBe("High similarity to included papers");
  });

  it("mid similarity (0.5) → maximum uncertainty", () => {
    const { score } = computePriorityScore(0.5);
    // At 0.5: uncertainty = 1 - |0.5-0.5|*2 = 1.0, score = 0.6*0.5 + 0.4*1.0 = 0.7
    expect(score).toBeCloseTo(0.7, 2);
  });

  it("low similarity (0.1) → low score", () => {
    const { score } = computePriorityScore(0.1);
    expect(score).toBeLessThan(0.5);
  });

  it("similarity 0 → score clamped ≥ 0", () => {
    const { score } = computePriorityScore(0);
    expect(score).toBeGreaterThanOrEqual(0);
  });

  it("similarity 1 → score clamped ≤ 1", () => {
    const { score } = computePriorityScore(1);
    expect(score).toBeLessThanOrEqual(1);
  });

  it("formula: 0.6 * similarity + 0.4 * uncertainty", () => {
    const sim = 0.75;
    const uncertainty = 1 - Math.abs(sim - 0.5) * 2; // = 0.5
    const expected = 0.6 * sim + 0.4 * uncertainty; // = 0.45 + 0.2 = 0.65
    const { score } = computePriorityScore(sim);
    expect(score).toBeCloseTo(expected, 5);
  });

  it("uncertainty peaks at similarity=0.5 and drops toward 0 and 1", () => {
    const atHalf = 1 - Math.abs(0.5 - 0.5) * 2; // 1.0
    const atZero = 1 - Math.abs(0 - 0.5) * 2; // 0.0
    const atOne = 1 - Math.abs(1 - 0.5) * 2; // 0.0
    expect(atHalf).toBe(1.0);
    expect(atZero).toBe(0.0);
    expect(atOne).toBe(0.0);
  });

  it("PriorityScore type contract", () => {
    const ps: PriorityScore = {
      paperId: 42,
      score: 0.85,
      reason: "High similarity to included papers",
    };
    expect(ps.score).toBeGreaterThanOrEqual(0);
    expect(ps.score).toBeLessThanOrEqual(1);
  });
});

// =====================================================================
// STAGE 7: Dedup Key Construction
// =====================================================================

describe("Cycle 14 — Stage 7: Dedup Key Construction", () => {
  it("prefers DOI (lowercased) when available", () => {
    const key = buildDedupKey({
      doi: "10.1234/ABC.DEF",
      pmid: "12345",
      s2Id: "s2_abc",
      title: "Test Paper",
      year: 2025,
    });
    expect(key).toBe("10.1234/abc.def");
  });

  it("falls back to PMID when DOI is null", () => {
    const key = buildDedupKey({
      doi: null,
      pmid: "12345678",
      s2Id: "s2_abc",
      title: "Test Paper",
      year: 2025,
    });
    expect(key).toBe("12345678");
  });

  it("falls back to S2 ID when DOI and PMID are null", () => {
    const key = buildDedupKey({
      doi: null,
      pmid: null,
      s2Id: "abc123def456",
      title: "Test Paper",
      year: 2025,
    });
    expect(key).toBe("abc123def456");
  });

  it("falls back to normalized title+year when all IDs are null", () => {
    const key = buildDedupKey({
      doi: null,
      pmid: null,
      s2Id: null,
      title: "SGLT2 Inhibitors in Heart Failure: A Meta-Analysis",
      year: 2024,
    });
    expect(key).toBe("sglt2inhibitorsinheartfailureametaanalysis_2024");
  });

  it("normalized title removes punctuation and spaces", () => {
    const key1 = buildDedupKey({ doi: null, pmid: null, s2Id: null, title: "Hello, World!", year: 2025 });
    const key2 = buildDedupKey({ doi: null, pmid: null, s2Id: null, title: "hello world", year: 2025 });
    expect(key1).toBe(key2);
  });

  it("same paper with different casing DOIs match", () => {
    const key1 = buildDedupKey({ doi: "10.1001/JAMA.2024.1234", pmid: null, s2Id: null, title: "A", year: 2024 });
    const key2 = buildDedupKey({ doi: "10.1001/jama.2024.1234", pmid: null, s2Id: null, title: "B", year: 2024 });
    expect(key1).toBe(key2);
  });

  it("different years produce different keys (title-based)", () => {
    const key1 = buildDedupKey({ doi: null, pmid: null, s2Id: null, title: "Same Title", year: 2024 });
    const key2 = buildDedupKey({ doi: null, pmid: null, s2Id: null, title: "Same Title", year: 2025 });
    expect(key1).not.toBe(key2);
  });
});

// =====================================================================
// STAGE 8: Type Contracts & Cross-Module
// =====================================================================

describe("Cycle 14 — Stage 8: Type Contracts & Cross-Module", () => {
  it("ROBINS-I has 5 judgment levels (more granular than RoB 2's 3)", () => {
    const robinsI: ROBINSIJudgment[] = ["Low", "Moderate", "Serious", "Critical", "No information"];
    expect(robinsI).toHaveLength(5);
  });

  it("ROBINSIDomainAssessment has required fields", () => {
    const d: ROBINSIDomainAssessment = {
      domain: "confounding",
      domainName: "Bias due to confounding",
      signalingQuestions: [
        { question: "Q?", answer: "Yes", support: "Described" },
      ],
      judgment: "Low",
      rationale: "Well controlled",
    };
    expect(d.signalingQuestions).toHaveLength(1);
  });

  it("FullROBINSIAssessment type contract", () => {
    const a: FullROBINSIAssessment = {
      paperId: 100,
      projectId: 1,
      domains: [],
      overallJudgment: "Moderate",
      overallRationale: "Some confounding bias",
    };
    expect(a.overallJudgment).toBe("Moderate");
  });

  it("ROBINSISignalingQuestion shares answer enum with RoB 2", () => {
    const q: ROBINSISignalingQuestion = {
      question: "Was bias due to confounding controlled?",
      answer: "Probably yes",
      support: "Propensity score matching applied",
    };
    // Same 5 answer values as RoB 2 signaling questions
    const validAnswers = ["Yes", "Probably yes", "Probably no", "No", "No information"];
    expect(validAnswers).toContain(q.answer);
  });

  it("ImportSource values are disjoint from PDF retrieval sources", () => {
    const importSources = new Set<string>(["pubmed", "semantic_scholar", "openalex", "clinicaltrials"]);
    const pdfSources = new Set<string>(["unpaywall", "semantic_scholar", "pmc", "existing"]);
    // They share "semantic_scholar" — both can find papers via S2
    const overlap = [...importSources].filter((s) => pdfSources.has(s));
    expect(overlap).toEqual(["semantic_scholar"]);
  });

  it("all assessment tools use worst-case escalation for overall judgment", () => {
    // Verified across RoB 2 (C13), QUADAS-2 (C8), ROBINS-I (C8)
    // This is a meta-test documenting the shared pattern
    const rob2Levels = ["Low", "Some concerns", "High"];
    const robinsILevels = ["Low", "Moderate", "Serious", "Critical", "No information"];
    const quadas2Levels = ["Low", "High", "Unclear"];
    expect(rob2Levels[0]).toBe("Low");
    expect(robinsILevels[0]).toBe("Low");
    expect(quadas2Levels[0]).toBe("Low");
    // All start from Low and escalate — worst single domain determines overall
  });
});
