/**
 * Integrity Check orchestrator.
 *
 * Dispatches to the three engines based on user plan:
 *   Free  → AI detection (LLM-heuristic) only
 *   Paid  → AI detection + plagiarism (shingling) + citation audit
 */

import type {
  IntegrityCheckInput,
  IntegrityCheckResult,
  AIDetectionResult,
  PlagiarismResult,
  CitationAuditResult,
} from "./types";
import { runAIDetection } from "./ai-detection";
import { runPlagiarismCheck } from "./plagiarism-engine";
import { runCitationAudit } from "./citation-audit";

const PAID_PLANS = new Set(["basic", "pro", "institutional"]);

/**
 * Run a unified integrity check on the given text.
 *
 * Free users get AI detection only.
 * Paid users get all three engines in parallel.
 */
export async function runIntegrityCheck(
  input: IntegrityCheckInput,
): Promise<IntegrityCheckResult> {
  const isPaid = PAID_PLANS.has(input.plan);
  const mode = input.mode ?? "full";

  // Determine which engines to run
  const runAI = mode === "full" || mode === "ai_detection";
  const runPlagiarism = isPaid && (mode === "full" || mode === "plagiarism");
  const runCitations = isPaid && (mode === "full" || mode === "citation_audit");

  // Launch engines in parallel
  // Paid users get Binoculars (Replicate GPU) in addition to LLM-heuristic
  const useBinoculars = isPaid;
  const [aiResult, plagiarismResult, citationResult] = await Promise.all([
    runAI
      ? runAIDetection(input.text, useBinoculars)
      : Promise.resolve(null),
    runPlagiarism
      ? runPlagiarismCheck(input.text).catch((err): PlagiarismResult => {
          console.error("[integrity] Plagiarism engine error:", err);
          return {
            similarityScore: 0,
            sourcesScanned: 0,
            matches: [],
            engine: "shingling-scholarly",
          };
        })
      : Promise.resolve(null),
    runCitations
      ? runCitationAudit(input.text, input.sources).catch(
          (err): CitationAuditResult => {
            console.error("[integrity] Citation audit error:", err);
            return {
              totalCitations: 0,
              verifiedCitations: 0,
              issues: [],
              verifiedReferences: [],
            };
          },
        )
      : Promise.resolve(null),
  ]);

  // Build a default AI result if AI detection was skipped
  const ai: AIDetectionResult = aiResult ?? {
    humanScore: 0,
    aiScore: 0,
    overallRisk: "low",
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

  return {
    tier: isPaid ? "paid" : "free",
    aiDetection: ai,
    plagiarism: plagiarismResult,
    citationAudit: citationResult,
    writingQuality: {
      passiveVoiceCount: Math.round(
        (ai.stats.passiveVoicePercent / 100) *
          (input.text.split(/[.!?]+/).length - 1),
      ),
      averageSentenceLength: ai.stats.avgSentenceLength,
      readabilityGrade: ai.stats.readabilityGrade,
      suggestions: buildWritingSuggestions(ai),
    },
    checkedAt: new Date().toISOString(),
  };
}

/** Generate actionable writing suggestions based on stats. */
function buildWritingSuggestions(ai: AIDetectionResult): string[] {
  const suggestions: string[] = [];
  const s = ai.stats;

  if (s.avgSentenceLength > 28) {
    suggestions.push(
      "Your average sentence length is high. Consider breaking long sentences for readability.",
    );
  }
  if (s.sentenceLengthStdDev < 3) {
    suggestions.push(
      "Your sentence lengths are very uniform — this is a common AI writing pattern. Vary your sentence structure.",
    );
  }
  if (s.passiveVoicePercent > 30) {
    suggestions.push(
      `${Math.round(s.passiveVoicePercent)}% of sentences use passive voice. Consider using more active voice.`,
    );
  }
  if (s.typeTokenRatio < 0.35 && s.typeTokenRatio > 0) {
    suggestions.push(
      "Vocabulary diversity is low. Use more varied word choices to strengthen your writing.",
    );
  }
  if (s.hedgingPhraseCount > 5) {
    suggestions.push(
      `Found ${s.hedgingPhraseCount} hedging phrases (e.g. "It is important to note"). These are common in AI-generated text — consider being more direct.`,
    );
  }
  if (s.readabilityGrade > 16) {
    suggestions.push(
      "Readability grade is above 16 (postgraduate level). Consider simplifying for broader accessibility.",
    );
  }

  return suggestions;
}
