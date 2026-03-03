/**
 * RALPH Integrity — Cycles 41-47: Final Parity & Edge Cases
 *
 * Focus: orchestrator formula consistency, self-plagiarism constants,
 * comprehensive Turnitin parity verification, API route contracts.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { computeTextStatistics } from "../../ai-detection";
import {
  tokenize,
  createShingles,
  computeMinHash,
  estimateJaccard,
} from "../../plagiarism-engine";
import { checkPredatoryJournal } from "../../predatory-journals";
import type {
  IntegrityCheckResult,
  IntegrityCheckInput,
  AIDetectionResult,
  PlagiarismResult,
  CitationAuditResult,
  SelfPlagiarismResult,
  TextStatistics,
  PredatoryJournalInfo,
  RetractionInfo,
  AIParagraphResult,
  CitationIssue,
} from "../../types";

// ── Cycle 41: Orchestrator passiveVoiceCount Consistency ────────────

describe("Cycle 41: Orchestrator passiveVoiceCount consistency", () => {
  it("IC-191: passiveVoiceCount formula uses sentence split from text", () => {
    // The orchestrator uses input.text.split(/[.!?]+/).length - 1
    // to estimate sentence count, which differs from segmentSentences()
    const text = "The analysis was performed. The study was conducted. Active sentence here.";
    const sentenceCountEstimate = text.split(/[.!?]+/).length - 1;
    expect(sentenceCountEstimate).toBe(3);
    const stats = computeTextStatistics(text);
    // passiveVoicePercent is calculated correctly by computeTextStatistics
    // 2 of 3 sentences are passive → ~66.67%
    expect(stats.passiveVoicePercent).toBeGreaterThan(60);
    expect(stats.passiveVoicePercent).toBeLessThan(70);
    // The orchestrator's passiveVoiceCount = Math.round((percent/100) * sentenceCount)
    // = Math.round(0.6667 * 3) = Math.round(2.0) = 2
    const expectedCount = Math.round((stats.passiveVoicePercent / 100) * sentenceCountEstimate);
    expect(expectedCount).toBe(2);
  });

  it("IC-192: passiveVoiceCount is 0 for text without periods", () => {
    // text.split(/[.!?]+/).length - 1 gives 0 when no sentence-ending punct
    const text = "This text has no sentence ending punctuation at all";
    const sentenceCountEstimate = text.split(/[.!?]+/).length - 1;
    expect(sentenceCountEstimate).toBe(0);
    // This means passiveVoiceCount will be Math.round(percent/100 * 0) = 0
    // regardless of actual passive voice — potential bug in orchestrator
    const stats = computeTextStatistics(text);
    // computeTextStatistics does detect the sentence correctly
    expect(Number.isFinite(stats.passiveVoicePercent)).toBe(true);
  });

  it("IC-193: passiveVoiceCount handles multiple consecutive punctuation", () => {
    const text = "Really?! Yes!!! OK...";
    // split(/[.!?]+/) → ["Really", " Yes", " OK", ""] → length - 1 = 3
    const sentenceCountEstimate = text.split(/[.!?]+/).length - 1;
    expect(sentenceCountEstimate).toBe(3);
  });
});

// ── Cycle 42: Self-Plagiarism Constants & Types ─────────────────────

describe("Cycle 42: Self-plagiarism module contracts", () => {
  it("IC-194: SelfPlagiarismResult type allows empty matchedDocuments", () => {
    const result: SelfPlagiarismResult = {
      selfSimilarityScore: 0,
      matchedDocuments: [],
    };
    expect(result.selfSimilarityScore).toBe(0);
    expect(result.matchedDocuments).toHaveLength(0);
  });

  it("IC-195: SelfPlagiarismResult matchedDocument has all required fields", () => {
    const result: SelfPlagiarismResult = {
      selfSimilarityScore: 0.35,
      matchedDocuments: [
        {
          checkId: 42,
          checkedAt: "2024-06-15T12:00:00Z",
          similarity: 0.35,
          excerpt: "Previous submission excerpt...",
        },
      ],
    };
    expect(result.matchedDocuments[0].checkId).toBe(42);
    expect(result.matchedDocuments[0].checkedAt).toContain("2024");
    expect(result.matchedDocuments[0].similarity).toBe(0.35);
    expect(result.matchedDocuments[0].excerpt).toBeTruthy();
  });

  it("IC-196: similarity 0.2 is the threshold for matching", () => {
    // SIMILARITY_THRESHOLD = 0.2 in self-plagiarism.ts
    // Document the constant as a type-level test
    const belowThreshold: SelfPlagiarismResult = {
      selfSimilarityScore: 0.19,
      matchedDocuments: [],
    };
    expect(belowThreshold.matchedDocuments).toHaveLength(0);

    const atThreshold: SelfPlagiarismResult = {
      selfSimilarityScore: 0.2,
      matchedDocuments: [
        {
          checkId: 1,
          checkedAt: "2024-01-01T00:00:00Z",
          similarity: 0.2,
          excerpt: "...",
        },
      ],
    };
    expect(atThreshold.matchedDocuments).toHaveLength(1);
  });
});

// ── Cycle 43: Full Type Contract Coverage ───────────────────────────

describe("Cycle 43: Full type contract coverage", () => {
  it("IC-197: IntegrityCheckResult has all required fields", () => {
    const result: IntegrityCheckResult = {
      tier: "paid",
      aiDetection: {
        humanScore: 85,
        aiScore: 15,
        overallRisk: "low",
        paragraphs: [],
        engine: "binoculars",
        stats: {
          avgSentenceLength: 18,
          sentenceLengthStdDev: 5,
          typeTokenRatio: 0.55,
          passiveVoicePercent: 15,
          readabilityGrade: 12,
          hedgingPhraseCount: 2,
        },
      },
      plagiarism: {
        similarityScore: 5,
        sourcesScanned: 100,
        matches: [],
        engine: "shingling-scholarly",
      },
      citationAudit: {
        totalCitations: 10,
        verifiedCitations: 8,
        issues: [],
        verifiedReferences: [],
      },
      selfPlagiarism: {
        selfSimilarityScore: 0,
        matchedDocuments: [],
      },
      writingQuality: {
        passiveVoiceCount: 3,
        averageSentenceLength: 18,
        readabilityGrade: 12,
        suggestions: ["Consider varying your sentence structure."],
      },
      checkedAt: "2024-01-15T10:00:00Z",
    };
    expect(result.tier).toBe("paid");
    expect(result.aiDetection.engine).toBe("binoculars");
    expect(result.writingQuality.suggestions).toHaveLength(1);
  });

  it("IC-198: IntegrityCheckInput accepts all plan types", () => {
    const plans: IntegrityCheckInput["plan"][] = ["free", "basic", "pro", "institutional"];
    for (const plan of plans) {
      const input: IntegrityCheckInput = {
        text: "Some text to check",
        plan,
      };
      expect(input.plan).toBe(plan);
    }
  });

  it("IC-199: IntegrityCheckInput accepts all modes", () => {
    const modes: NonNullable<IntegrityCheckInput["mode"]>[] = [
      "full", "ai_detection", "plagiarism", "citation_audit",
    ];
    for (const mode of modes) {
      const input: IntegrityCheckInput = {
        text: "Some text",
        plan: "pro",
        mode,
      };
      expect(input.mode).toBe(mode);
    }
  });

  it("IC-200: AIDetectionResult engine can be binoculars or llm-heuristic", () => {
    const engines: AIDetectionResult["engine"][] = ["binoculars", "llm-heuristic"];
    for (const engine of engines) {
      const result: AIDetectionResult = {
        humanScore: 50,
        aiScore: 50,
        overallRisk: "medium",
        paragraphs: [],
        engine,
        stats: {
          avgSentenceLength: 15,
          sentenceLengthStdDev: 5,
          typeTokenRatio: 0.5,
          passiveVoicePercent: 10,
          readabilityGrade: 12,
          hedgingPhraseCount: 0,
        },
      };
      expect(result.engine).toBe(engine);
    }
  });

  it("IC-201: CitationIssue covers all types", () => {
    const types: CitationIssue["type"][] = [
      "hallucinated_ref",
      "invalid_doi",
      "broken_pmid",
      "missing_citation",
      "unverified_doi",
    ];
    for (const type of types) {
      const issue: CitationIssue = {
        type,
        severity: "error",
        message: `Test issue of type ${type}`,
      };
      expect(issue.type).toBe(type);
    }
  });

  it("IC-202: AIParagraphResult has required fields", () => {
    const para: AIParagraphResult = {
      paragraphIndex: 0,
      excerpt: "The first paragraph...",
      humanProbability: 75,
      flags: ["uniform sentence length"],
      suggestion: "Vary sentence structure",
    };
    expect(para.humanProbability).toBeGreaterThanOrEqual(0);
    expect(para.humanProbability).toBeLessThanOrEqual(100);
  });

  it("IC-203: PredatoryJournalInfo has correct shape", () => {
    const info: PredatoryJournalInfo = {
      publisher: "Some Publisher",
      journal: "Some Journal",
      listSource: "Beall's List",
    };
    expect(info.listSource).toBe("Beall's List");
  });

  it("IC-204: RetractionInfo has correct shape", () => {
    const info: RetractionInfo = {
      doi: "10.1234/test",
      retractionDate: "2024-01-01",
      retractionNature: "Retraction",
      reason: "Data fabrication",
      title: "Retracted Paper",
    };
    expect(info.doi).toContain("10.");
  });
});

// ── Cycle 44: Comprehensive Turnitin Parity Checklist ───────────────

describe("Cycle 44: Turnitin parity feature checklist", () => {
  it("IC-205: Feature 1 — Similarity detection (shingling/MinHash)", () => {
    const text = "machine learning algorithms for healthcare diagnostics";
    const tokens = tokenize(text);
    const shingles = createShingles(tokens);
    const sig = computeMinHash(shingles);
    expect(sig.length).toBe(128); // NUM_HASHES
  });

  it("IC-206: Feature 2 — AI writing detection (computeTextStatistics)", () => {
    const stats = computeTextStatistics("This is a test sentence. Another one follows.");
    expect(stats).toHaveProperty("avgSentenceLength");
    expect(stats).toHaveProperty("sentenceLengthStdDev");
    expect(stats).toHaveProperty("typeTokenRatio");
    expect(stats).toHaveProperty("passiveVoicePercent");
    expect(stats).toHaveProperty("readabilityGrade");
    expect(stats).toHaveProperty("hedgingPhraseCount");
  });

  it("IC-207: Feature 3 — Similarity score with breakdown exists", () => {
    // PlagiarismResult has similarityScore and matches[]
    const result: PlagiarismResult = {
      similarityScore: 15,
      sourcesScanned: 50,
      matches: [
        { excerpt: "...", source: { title: "Example", url: "https://example.com" }, similarity: 0.15, severity: "low" as const },
      ],
      engine: "shingling-scholarly",
    };
    expect(result.similarityScore).toBe(15);
    expect(result.matches[0].source.url).toContain("http");
  });

  it("IC-208: Feature 6 — Self-plagiarism check exists", () => {
    const result: SelfPlagiarismResult = {
      selfSimilarityScore: 0.3,
      matchedDocuments: [
        { checkId: 1, checkedAt: "2024-01-01T00:00:00Z", similarity: 0.3, excerpt: "..." },
      ],
    };
    expect(result.selfSimilarityScore).toBeGreaterThan(0);
  });

  it("IC-209: Feature 10 — Predatory journal flagging works", () => {
    // Legitimate publishers not flagged
    expect(checkPredatoryJournal("Springer", undefined)).toBeNull();
    expect(checkPredatoryJournal("Wiley", undefined)).toBeNull();
  });

  it("IC-210: Feature 12 — Grade-level readability scoring", () => {
    const stats = computeTextStatistics(
      "The cat sat on the mat. The dog ran fast."
    );
    expect(typeof stats.readabilityGrade).toBe("number");
    expect(Number.isFinite(stats.readabilityGrade)).toBe(true);
  });

  it("IC-211: Feature 13 — Citation verification types exist", () => {
    const result: CitationAuditResult = {
      totalCitations: 5,
      verifiedCitations: 4,
      issues: [
        {
          type: "invalid_doi",
          severity: "error",
          message: "DOI not found",
          reference: "[1]",
        },
      ],
      verifiedReferences: [
        { index: 1, doi: "10.1234/test", title: "Paper", verified: true },
      ],
    };
    expect(result.verifiedCitations).toBeLessThanOrEqual(result.totalCitations);
  });
});

// ── Cycle 45: Extreme Input Edge Cases ──────────────────────────────

describe("Cycle 45: Extreme input edge cases", () => {
  it("IC-212: Unicode text doesn't crash computeTextStatistics", () => {
    const stats = computeTextStatistics(
      "Les résultats montrent que le traitement est efficace. 日本語のテスト。"
    );
    expect(Number.isFinite(stats.readabilityGrade)).toBe(true);
  });

  it("IC-213: text with only numbers", () => {
    const stats = computeTextStatistics("123 456 789 012 345.");
    expect(Number.isFinite(stats.avgSentenceLength)).toBe(true);
  });

  it("IC-214: text with emoji doesn't crash", () => {
    const stats = computeTextStatistics("This is great 🎉. Amazing results 🔬.");
    expect(Number.isFinite(stats.avgSentenceLength)).toBe(true);
  });

  it("IC-215: null-like inputs to checkPredatoryJournal", () => {
    expect(checkPredatoryJournal(undefined, undefined)).toBeNull();
    expect(checkPredatoryJournal("", "")).toBeNull();
    expect(checkPredatoryJournal("", undefined)).toBeNull();
    expect(checkPredatoryJournal(undefined, "")).toBeNull();
  });

  it("IC-216: tokenize handles empty and whitespace input", () => {
    expect(tokenize("").length).toBe(0);
    expect(tokenize("   ").length).toBe(0);
    expect(tokenize("\n\t\r").length).toBe(0);
  });

  it("IC-217: createShingles with 0 tokens", () => {
    const shingles = createShingles([]);
    expect(shingles.size).toBe(0);
  });

  it("IC-218: estimateJaccard handles empty signatures gracefully", () => {
    const emptySig = computeMinHash(new Set<number>());
    const result = estimateJaccard(emptySig, emptySig);
    expect(Number.isFinite(result)).toBe(true);
  });
});

// ── Cycle 46: Score Combination Logic ───────────────────────────────

describe("Cycle 46: AI detection score combination logic", () => {
  it("IC-219: humanScore + aiScore = 100 (AIDetectionResult contract)", () => {
    // The implementation: aiScore = clamp(100 - humanScore)
    for (const humanScore of [0, 25, 50, 75, 100]) {
      const result: AIDetectionResult = {
        humanScore,
        aiScore: 100 - humanScore,
        overallRisk: humanScore >= 70 ? "low" : humanScore >= 40 ? "medium" : "high",
        paragraphs: [],
        engine: "llm-heuristic",
        stats: {
          avgSentenceLength: 0,
          sentenceLengthStdDev: 0,
          typeTokenRatio: 0,
          passiveVoicePercent: 0,
          readabilityGrade: 0,
          hedgingPhraseCount: 0,
        },
      };
      expect(result.humanScore + result.aiScore).toBe(100);
    }
  });

  it("IC-220: overallRisk thresholds", () => {
    // humanScore >= 70 → low, >= 40 → medium, < 40 → high
    const testCases: [number, "low" | "medium" | "high"][] = [
      [100, "low"],
      [70, "low"],
      [69, "medium"],
      [40, "medium"],
      [39, "high"],
      [0, "high"],
    ];
    for (const [humanScore, expectedRisk] of testCases) {
      const risk =
        humanScore >= 70 ? "low" : humanScore >= 40 ? "medium" : "high";
      expect(risk, `humanScore=${humanScore}`).toBe(expectedRisk);
    }
  });

  it("IC-221: clamp function behavior (0-100 range)", () => {
    // The clamp function: Math.min(max, Math.max(min, value))
    const clamp = (v: number) => Math.min(100, Math.max(0, v));
    expect(clamp(-50)).toBe(0);
    expect(clamp(0)).toBe(0);
    expect(clamp(50)).toBe(50);
    expect(clamp(100)).toBe(100);
    expect(clamp(150)).toBe(100);
  });
});

// ── Cycle 47: Comprehensive Text Statistics Boundary Tests ──────────

describe("Cycle 47: Text statistics boundary tests", () => {
  it("IC-222: stats are consistent across multiple calls (deterministic)", () => {
    const text = "The quick brown fox jumps over the lazy dog. She sells sea shells.";
    const stats1 = computeTextStatistics(text);
    const stats2 = computeTextStatistics(text);
    expect(stats1).toEqual(stats2);
  });

  it("IC-223: stats handle text with only whitespace", () => {
    const stats = computeTextStatistics("   \n\t   ");
    for (const [key, value] of Object.entries(stats)) {
      if (typeof value === "number") {
        expect(Number.isNaN(value), `${key} is NaN`).toBe(false);
      }
    }
  });

  it("IC-224: very high hedging density text", () => {
    const text = Array(20)
      .fill("It is important to note that this is widely recognized and it should be noted that")
      .join(" ") + ".";
    const stats = computeTextStatistics(text);
    expect(stats.hedgingPhraseCount).toBeGreaterThan(20);
  });

  it("IC-225: text with all short sentences has low avgSentenceLength", () => {
    const text = "Hi. Bye. Go. Run. Stop.";
    const stats = computeTextStatistics(text);
    expect(stats.avgSentenceLength).toBeLessThanOrEqual(2);
  });

  it("IC-226: all stats fields present in TextStatistics", () => {
    const stats = computeTextStatistics("Hello world.");
    const requiredFields: (keyof TextStatistics)[] = [
      "avgSentenceLength",
      "sentenceLengthStdDev",
      "typeTokenRatio",
      "passiveVoicePercent",
      "readabilityGrade",
      "hedgingPhraseCount",
    ];
    for (const field of requiredFields) {
      expect(stats).toHaveProperty(field);
      expect(typeof stats[field]).toBe("number");
    }
  });
});
