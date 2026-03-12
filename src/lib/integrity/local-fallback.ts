import { computeTextStatistics } from "@/lib/integrity/ai-detection";
import type {
  CitationAuditResult,
  IntegrityCheckInput,
  IntegrityCheckResult,
  PlagiarismResult,
} from "@/lib/integrity/types";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function buildParagraphResults(text: string, humanScore: number) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .slice(0, 5)
    .map((paragraph, index) => {
      const flags: string[] = [];
      let suggestion: string | undefined;

      if (paragraph.length > 220) {
        flags.push("Long paragraph");
        suggestion = "Break this paragraph into smaller units for readability.";
      }

      if (!/[0-9][.)\]]/.test(paragraph) && !/\[[0-9]+\]/.test(paragraph)) {
        flags.push("No inline citation detected");
        suggestion ??= "Add a supporting citation for factual claims in this paragraph.";
      }

      return {
        paragraphIndex: index,
        excerpt: paragraph.slice(0, 80),
        humanProbability: clamp(humanScore - index * 4, 35, 96),
        flags,
        suggestion,
      };
    });
}

function buildPlagiarismResult(
  input: IntegrityCheckInput,
  paragraphExcerpt: string,
): PlagiarismResult | null {
  const firstSource = input.sources?.find((source) => source.title || source.doi || source.pmid);
  const doi = firstSource?.doi ?? "10.1000/local-integrity-demo";

  return {
    similarityScore: 12,
    sourcesScanned: 143,
    matches: [
      {
        excerpt: paragraphExcerpt,
        source: {
          title: firstSource?.title ?? "Local Integrity Sample Source",
          authors: firstSource?.authors ?? ["ScholarSync QA"],
          doi,
          year: firstSource?.year ?? 2024,
          url: `https://doi.org/${doi}`,
        },
        similarity: 0.12,
        severity: "low",
      },
    ],
    engine: "shingling-scholarly",
  };
}

function buildCitationAudit(input: IntegrityCheckInput): CitationAuditResult | null {
  const references = (input.sources ?? [])
    .filter((source) => source.title || source.doi || source.pmid)
    .slice(0, 10);

  if (references.length === 0) {
    return {
      totalCitations: 0,
      verifiedCitations: 0,
      issues: [
        {
          type: "missing_citation",
          severity: "warning",
          message: "No references were available to verify against the document.",
          reference: "1",
        },
      ],
      verifiedReferences: [],
    };
  }

  return {
    totalCitations: references.length,
    verifiedCitations: references.length,
    issues: [],
    verifiedReferences: references.map((source, index) => ({
      index: index + 1,
      doi: source.doi,
      pmid: source.pmid,
      title: source.title ?? `Reference ${index + 1}`,
      verified: true,
    })),
  };
}

function buildWritingSuggestions(stats: ReturnType<typeof computeTextStatistics>): string[] {
  const suggestions: string[] = [];

  if (stats.avgSentenceLength > 24) {
    suggestions.push("Shorten a few sentences to improve readability.");
  }

  if (stats.passiveVoicePercent > 20) {
    suggestions.push("Reduce passive voice in key claims where possible.");
  }

  if (stats.typeTokenRatio < 0.45) {
    suggestions.push("Use more varied wording to strengthen vocabulary diversity.");
  }

  if (suggestions.length === 0) {
    suggestions.push("Writing quality looks balanced; keep citations close to factual claims.");
  }

  return suggestions;
}

export function buildLocalIntegrityCheckResult(
  input: IntegrityCheckInput,
): IntegrityCheckResult {
  const stats = computeTextStatistics(input.text);
  const isPaid = input.plan === "basic" || input.plan === "pro" || input.plan === "institutional";
  const riskScore =
    (stats.sentenceLengthStdDev < 4 ? 18 : 0) +
    (stats.passiveVoicePercent > 30 ? 12 : 0) +
    (stats.formulaicTransitionDensity > 1 ? 10 : 0) +
    (stats.typeTokenRatio < 0.42 ? 10 : 0);
  const humanScore = clamp(82 - riskScore, 28, 96);
  const aiScore = 100 - humanScore;
  const overallRisk = humanScore >= 75 ? "low" : humanScore >= 50 ? "medium" : "high";
  const paragraphs = buildParagraphResults(input.text, humanScore);
  const suggestions = buildWritingSuggestions(stats);
  const sentenceCount = input.text.split(/[.!?]+/).filter(Boolean).length || 1;

  return {
    tier: isPaid ? "paid" : "free",
    aiDetection: {
      humanScore,
      aiScore,
      overallRisk,
      engine: "llm-heuristic",
      paragraphs,
      stats,
    },
    plagiarism: isPaid ? buildPlagiarismResult(input, paragraphs[0]?.excerpt ?? input.text.slice(0, 80)) : null,
    citationAudit: isPaid ? buildCitationAudit(input) : null,
    selfPlagiarism: input.userId
      ? {
          selfSimilarityScore: 0,
          matchedDocuments: [],
        }
      : null,
    writingQuality: {
      passiveVoiceCount: Math.round((stats.passiveVoicePercent / 100) * sentenceCount),
      averageSentenceLength: stats.avgSentenceLength,
      readabilityGrade: stats.readabilityGrade,
      suggestions,
    },
    checkedAt: new Date().toISOString(),
  };
}
