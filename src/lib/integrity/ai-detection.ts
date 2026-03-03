/**
 * AI Content Detection Engine
 *
 * Two-tier architecture:
 *   Free  → LLM-heuristic (statistical features + Claude Haiku per-paragraph)
 *   Paid  → Binoculars on Replicate (Falcon-7B dual-model, ICML 2024) + LLM-heuristic
 *
 * Binoculars produces a single high-confidence score (90%+ accuracy at 0.01% FPR).
 * The LLM-heuristic provides per-paragraph granularity and actionable suggestions.
 * For paid users, both run in parallel and scores are combined (60% Binoculars, 40% LLM).
 */

import { generateObject } from "ai";
import { getSmallModel } from "@/lib/ai/models";
import { z } from "zod";
import Replicate from "replicate";

import type {
  AIDetectionResult,
  AIParagraphResult,
  TextStatistics,
} from "./types";

// ── Binoculars on Replicate ─────────────────────────────────────────

const BINOCULARS_MODEL = "drshailesh88/binoculars-ai-detection" as const;
const BINOCULARS_FPR_THRESHOLD = 0.8536432310785527;

interface BinocularsResponse {
  score: number;
  prediction: "ai" | "human";
  threshold: number;
  mode: string;
  tokens_processed: number;
}

/**
 * Calls the Binoculars model on Replicate.
 * Returns a human probability score (0-100) derived from the Binoculars ratio.
 */
async function runBinocularsDetection(
  text: string,
): Promise<{ humanScore: number; raw: BinocularsResponse } | null> {
  const apiToken = process.env.REPLICATE_API_TOKEN;
  if (!apiToken) {
    console.warn("[ai-detection] REPLICATE_API_TOKEN not set, skipping Binoculars");
    return null;
  }

  try {
    const replicate = new Replicate({ auth: apiToken });

    const output = await replicate.run(BINOCULARS_MODEL, {
      input: {
        text: text.slice(0, 10000), // Truncate to ~2K tokens worth
        mode: "low-fpr",
        max_length: 512,
      },
    }) as BinocularsResponse;

    // Convert Binoculars score to a 0-100 human probability.
    // Score > threshold = human, score < threshold = AI.
    // We map the score to a 0-100 scale centred on the threshold.
    const ratio = output.score / BINOCULARS_FPR_THRESHOLD;
    // ratio > 1 = human, ratio < 1 = AI
    // Map: 0.5 → 0, 1.0 → 50, 1.5+ → 100
    const humanScore = Math.round(
      Math.min(100, Math.max(0, (ratio - 0.5) * 100)),
    );

    return { humanScore, raw: output };
  } catch (error) {
    console.error("[ai-detection] Binoculars Replicate call failed:", error);
    return null;
  }
}

// ── Constants ────────────────────────────────────────────────────────

/** Abbreviations that should NOT trigger sentence boundaries. */
const ABBREVIATIONS = new Set([
  "dr",
  "mr",
  "mrs",
  "ms",
  "prof",
  "sr",
  "jr",
  "st",
  "vs",
  "fig",
  "figs",
  "eq",
  "eqs",
  "vol",
  "vols",
  "no",
  "nos",
  "al",
  "etc",
  "approx",
  "dept",
  "est",
  "govt",
  "inc",
  "ltd",
  "corp",
  "assn",
  "univ",
  "intl",
  "natl",
  "jan",
  "feb",
  "mar",
  "apr",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
  "op",
  "cit",
  "ibid",
  "ca",
  "viz",
  "cf",
  "ed",
  "eds",
  "trans",
  "rev",
  "gen",
  "sgt",
  "cpl",
  "pvt",
  "capt",
  "maj",
  "col",
  "lt",
]);

/** Common LLM hedging phrases (case-insensitive matching). */
const HEDGING_PHRASES: string[] = [
  // Specified phrases
  "it is important to note that",
  "it should be noted that",
  "it is worth mentioning",
  "this suggests that",
  "one could argue",
  "it is widely recognized",
  "in conclusion, it can be said",
  "there is a growing body of evidence",
  "from a broader perspective",
  "it is essential to consider",
  // Additional common LLM hedging phrases
  "it is crucial to understand",
  "it is worth noting that",
  "this highlights the importance of",
  "it is generally accepted that",
  "this underscores the need for",
  "it is imperative to",
  "in light of this",
  "it bears mentioning that",
  "it is reasonable to assume",
  "this raises important questions about",
  "it is commonly understood that",
  "it remains to be seen",
  "this is particularly relevant",
  "taken together, these findings",
  "it is difficult to overstate",
  "it goes without saying",
  "needless to say",
  "it is no exaggeration to say",
  "from this perspective",
  "this is a testament to",
  "it is pivotal to recognize",
  "this serves as a reminder that",
  "it cannot be overstated",
  "it is pertinent to mention",
  "it is fair to say",
];

/** Batch size for LLM paragraph analysis. */
const PARAGRAPH_BATCH_SIZE = 4;

// ── Syllable counting ────────────────────────────────────────────────

/**
 * Estimates the number of syllables in an English word using a heuristic
 * vowel-group approach with common corrections.
 */
function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 2) return 1;

  // Count vowel groups
  const vowelGroups = w.match(/[aeiouy]+/g);
  let count = vowelGroups ? vowelGroups.length : 1;

  // Silent -e at end (but not -le)
  if (w.endsWith("e") && !w.endsWith("le")) {
    count = Math.max(1, count - 1);
  }

  // Common suffixes that add a syllable
  if (w.endsWith("tion") || w.endsWith("sion")) {
    // Already counted as two vowel groups, which is correct
  }

  // -ed ending usually doesn't add a syllable unless preceded by t or d
  if (w.endsWith("ed") && w.length > 3) {
    const beforeEd = w.charAt(w.length - 3);
    if (beforeEd !== "t" && beforeEd !== "d") {
      count = Math.max(1, count - 1);
    }
  }

  return Math.max(1, count);
}

// ── Sentence segmentation ────────────────────────────────────────────

/**
 * Splits text into sentences, handling common abbreviations and edge cases
 * found in academic writing.
 */
function segmentSentences(text: string): string[] {
  // Normalise whitespace
  const normalised = text.replace(/\s+/g, " ").trim();
  if (!normalised) return [];

  const sentences: string[] = [];
  let current = "";

  // Tokenise on potential sentence-ending punctuation
  const tokens = normalised.split(/(?<=[.!?])\s+/);

  for (const token of tokens) {
    current = current ? `${current} ${token}` : token;

    // Check if this token actually ends a sentence
    const trimmed = current.trim();
    if (!trimmed) continue;

    const lastChar = trimmed.charAt(trimmed.length - 1);
    if (lastChar === "!" || lastChar === "?") {
      sentences.push(trimmed);
      current = "";
      continue;
    }

    if (lastChar === ".") {
      // Extract the last word before the period to check if it's an abbreviation
      const match = trimmed.match(/(\w+)\.$/);
      if (match) {
        const lastWord = match[1].toLowerCase();
        if (ABBREVIATIONS.has(lastWord)) {
          // Not a sentence boundary — continue accumulating
          continue;
        }
        // Check for single-letter abbreviations (e.g., "A.", "B.", initials)
        if (lastWord.length === 1) {
          continue;
        }
      }
      // Check for decimal numbers ending the token (e.g., "3.5." is unlikely)
      if (/\d+\.\d+\.$/.test(trimmed)) {
        continue;
      }
      sentences.push(trimmed);
      current = "";
    }
  }

  // Push any remaining text as a final sentence
  if (current.trim()) {
    sentences.push(current.trim());
  }

  return sentences.filter((s) => s.length > 0);
}

// ── Passive voice detection ──────────────────────────────────────────

/**
 * Returns true if a sentence likely contains passive voice.
 * Matches patterns like "was written", "were found", "has been shown",
 * "is being investigated", etc.
 */
function isPassiveVoice(sentence: string): boolean {
  // Pattern: be-verb (+ optional adverb) + past participle
  // Past participle approximation: word ending in -ed, -en, -wn, -ht, -ne, -ng (sung/hung)
  // or common irregular forms
  const passivePattern =
    /\b(?:am|is|are|was|were|be|been|being)\b(?:\s+\w+ly)?\s+(?:\w+(?:ed|en|wn|ht|ne|lt)\b)/i;

  // Also match "get/got + past participle" passive
  const getPassive =
    /\b(?:get|gets|got|gotten|getting)\b(?:\s+\w+ly)?\s+(?:\w+(?:ed|en|wn|ht|ne|lt)\b)/i;

  return passivePattern.test(sentence) || getPassive.test(sentence);
}

// ── Part 1: Statistical Text Analysis ────────────────────────────────

/**
 * Computes statistical text features for AI detection without any LLM calls.
 * These features serve as heuristic signals for identifying AI-generated text.
 */
export function computeTextStatistics(text: string): TextStatistics {
  const sentences = segmentSentences(text);
  const sentenceCount = sentences.length || 1;

  // Tokenise all words
  const allWords: string[] = [];
  const sentenceLengths: number[] = [];

  for (const sentence of sentences) {
    const words = sentence
      .split(/\s+/)
      .filter((w) => /[a-zA-Z0-9]/.test(w));
    sentenceLengths.push(words.length);
    allWords.push(...words);
  }

  const totalWords = allWords.length || 1;

  // 1. Average sentence length
  const avgSentenceLength =
    sentenceLengths.reduce((a, b) => a + b, 0) / sentenceCount;

  // 2. Sentence length standard deviation
  const variance =
    sentenceLengths.reduce(
      (sum, len) => sum + Math.pow(len - avgSentenceLength, 2),
      0
    ) / sentenceCount;
  const sentenceLengthStdDev = Math.sqrt(variance);

  // 3. Type-token ratio
  const uniqueWords = new Set(allWords.map((w) => w.toLowerCase()));
  const typeTokenRatio = uniqueWords.size / totalWords;

  // 4. Passive voice percentage
  const passiveCount = sentences.filter(isPassiveVoice).length;
  const passiveVoicePercent = (passiveCount / sentenceCount) * 100;

  // 5. Flesch-Kincaid readability grade
  const totalSyllables = allWords.reduce(
    (sum, word) => sum + countSyllables(word),
    0
  );
  const readabilityGrade =
    0.39 * (totalWords / sentenceCount) +
    11.8 * (totalSyllables / totalWords) -
    15.59;

  // 6. Hedging phrase count
  const lowerText = text.toLowerCase();
  let hedgingPhraseCount = 0;
  for (const phrase of HEDGING_PHRASES) {
    // Count all non-overlapping occurrences
    let idx = 0;
    while (true) {
      const found = lowerText.indexOf(phrase, idx);
      if (found === -1) break;
      hedgingPhraseCount++;
      idx = found + phrase.length;
    }
  }

  return {
    avgSentenceLength: Math.round(avgSentenceLength * 100) / 100,
    sentenceLengthStdDev: Math.round(sentenceLengthStdDev * 100) / 100,
    typeTokenRatio: Math.round(typeTokenRatio * 1000) / 1000,
    passiveVoicePercent: Math.round(passiveVoicePercent * 100) / 100,
    readabilityGrade: Math.round(readabilityGrade * 100) / 100,
    hedgingPhraseCount,
  };
}

// ── Part 2: LLM-Powered Per-Paragraph Analysis ──────────────────────

/** Zod schema for a single paragraph assessment. */
const paragraphAssessmentSchema = z.object({
  paragraphs: z.array(
    z.object({
      paragraphIndex: z
        .number()
        .describe("The 0-based index of the paragraph in the batch"),
      humanProbability: z
        .number()
        .describe(
          "0-100 probability the paragraph is human-written (0 = certainly AI, 100 = certainly human)"
        ),
      flags: z
        .array(z.string())
        .describe(
          "Specific patterns that suggest AI generation (e.g. 'uniform sentence length', 'formulaic hedging')"
        ),
      suggestion: z
        .string()
        .describe("Actionable suggestion to improve originality, or empty string if none"),
    })
  ),
});

/**
 * Analyses a batch of paragraphs using an LLM to assess the probability
 * of AI-generated content.
 */
async function analyseParagraphBatch(
  paragraphs: string[],
  globalIndex: number,
  stats: TextStatistics
): Promise<AIParagraphResult[]> {
  const numberedParagraphs = paragraphs
    .map((p, i) => `[Paragraph ${i}]\n${p}`)
    .join("\n\n");

  const systemPrompt = `You are an expert AI content detection analyst specializing in academic writing.
Your task is to assess whether each paragraph was written by a human or generated by an AI.

STATISTICAL CONTEXT for the full document:
- Average sentence length: ${stats.avgSentenceLength} words
- Sentence length std dev: ${stats.sentenceLengthStdDev} (low = uniform/AI-like; high = varied/human-like)
- Type-token ratio: ${stats.typeTokenRatio} (vocabulary richness; low in long AI text)
- Passive voice: ${stats.passiveVoicePercent}%
- Readability grade: ${stats.readabilityGrade} (Flesch-Kincaid)
- Hedging phrases detected: ${stats.hedgingPhraseCount}

DETECTION GUIDELINES:
- AI text tends to have uniform sentence lengths, generic hedging, and formulaic transitions.
- Human academic writing has natural variation in rhythm, domain-specific jargon, and personal voice.
- Consider whether the paragraph shows genuine analytical depth or surface-level summaries.
- Low sentence-length std dev (< 3) combined with high hedging is a strong AI signal.
- Look for "list-like" structures, excessive qualification, and repetitive connective phrases.

Be calibrated: not all polished writing is AI-generated. Academic writing naturally uses some passive voice and hedging.`;

  const { object } = await generateObject({
    model: getSmallModel(),
    schema: paragraphAssessmentSchema,
    system: systemPrompt,
    prompt: `Assess the following ${paragraphs.length} paragraph(s) for AI-generated content:\n\n${numberedParagraphs}`,
  });

  return object.paragraphs.map((p, i) => ({
    paragraphIndex: globalIndex + (p.paragraphIndex ?? i),
    excerpt: paragraphs[p.paragraphIndex ?? i]?.slice(0, 80) ?? "",
    humanProbability: Math.round(p.humanProbability),
    flags: p.flags,
    suggestion: p.suggestion,
  }));
}

// ── Sentence splitting for compliance highlighting ───────────────────

/**
 * Splits paragraph text into individual sentences with character offsets.
 * Used to provide sentence-level data for the compliance page highlighting.
 */
function splitIntoSentences(text: string): Array<{ text: string; startOffset: number; endOffset: number }> {
  const sentences: Array<{ text: string; startOffset: number; endOffset: number }> = [];
  const regex = /[^.!?]+[.!?]+[\s]*/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    sentences.push({
      text: match[0].trim(),
      startOffset: match.index,
      endOffset: match.index + match[0].trimEnd().length,
    });
  }
  // Handle remaining text without terminal punctuation
  const lastEnd = sentences.length > 0 ? sentences[sentences.length - 1].endOffset : 0;
  const remaining = text.slice(lastEnd).trim();
  if (remaining) {
    sentences.push({ text: remaining, startOffset: lastEnd, endOffset: text.length });
  }
  return sentences;
}

// ── Part 3: Combined Detection ───────────────────────────────────────

/**
 * Clamps a number to the range [0, 100].
 */
function clamp(value: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Runs the LLM-heuristic detection pipeline (used for all users):
 *   1. Compute statistical text features (pure computation)
 *   2. Run LLM-powered per-paragraph analysis (batched API calls)
 *   3. Combine signals into a final score with heuristic adjustments
 */
async function runLLMHeuristicDetection(
  text: string,
  stats: TextStatistics,
): Promise<{ humanScore: number; paragraphs: AIParagraphResult[] }> {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 20);

  if (paragraphs.length === 0) {
    return { humanScore: 50, paragraphs: [] };
  }

  // Batch LLM analysis
  const batches: string[][] = [];
  for (let i = 0; i < paragraphs.length; i += PARAGRAPH_BATCH_SIZE) {
    batches.push(paragraphs.slice(i, i + PARAGRAPH_BATCH_SIZE));
  }

  const batchPromises = batches.map((batch, batchIdx) =>
    analyseParagraphBatch(
      batch,
      batchIdx * PARAGRAPH_BATCH_SIZE,
      stats,
    ).catch((error): AIParagraphResult[] => {
      console.error(
        `AI detection batch ${batchIdx} failed, using heuristic fallback:`,
        error,
      );
      return batch.map((p, i) => ({
        paragraphIndex: batchIdx * PARAGRAPH_BATCH_SIZE + i,
        excerpt: p.slice(0, 80),
        humanProbability: 50,
        flags: ["llm-analysis-unavailable"],
        suggestion: undefined,
      }));
    }),
  );

  const batchResults = await Promise.all(batchPromises);
  const allParagraphResults = batchResults.flat();

  // Attach sentence-level data to each paragraph result for compliance highlighting
  for (const result of allParagraphResults) {
    const paragraphText = paragraphs[result.paragraphIndex];
    if (paragraphText) {
      result.sentences = splitIntoSentences(paragraphText);
    }
  }

  const avgHumanProbability =
    allParagraphResults.reduce((sum, p) => sum + p.humanProbability, 0) /
    (allParagraphResults.length || 1);

  let humanScore = Math.round(avgHumanProbability);

  // Heuristic adjustments from statistical features
  if (stats.sentenceLengthStdDev < 3.0) {
    humanScore -= 10;
  }

  const totalWords = text.split(/\s+/).filter((w) => w.length > 0).length;
  if (stats.typeTokenRatio < 0.35 && totalWords > 500) {
    humanScore -= 5;
  }

  const hedgingDensity = (stats.hedgingPhraseCount / totalWords) * 500;
  if (hedgingDensity > 2) {
    humanScore -= 10;
  }

  humanScore = clamp(humanScore);

  return { humanScore, paragraphs: allParagraphResults };
}

/**
 * Runs the full AI detection pipeline.
 *
 * @param text - The document text to analyse
 * @param useBinoculars - If true, also runs Binoculars on Replicate (paid users)
 * @returns A combined AI detection result with per-paragraph breakdowns
 */
export async function runAIDetection(
  text: string,
  useBinoculars = false,
): Promise<AIDetectionResult> {
  // Step 1: Statistical analysis (always runs — pure computation)
  const stats = computeTextStatistics(text);

  // Step 2: Run engines in parallel
  const [llmResult, binocularsResult] = await Promise.all([
    runLLMHeuristicDetection(text, stats),
    useBinoculars ? runBinocularsDetection(text) : Promise.resolve(null),
  ]);

  // Step 3: Combine scores
  let humanScore: number;
  let engine: AIDetectionResult["engine"];

  if (binocularsResult) {
    // Paid tier: 60% Binoculars (research-grade) + 40% LLM-heuristic (granular)
    humanScore = Math.round(
      binocularsResult.humanScore * 0.6 + llmResult.humanScore * 0.4,
    );
    engine = "binoculars";
    console.log(
      `[ai-detection] Binoculars: ${binocularsResult.humanScore}% human (raw score: ${binocularsResult.raw.score}), LLM: ${llmResult.humanScore}% → combined: ${humanScore}%`,
    );
  } else {
    humanScore = llmResult.humanScore;
    engine = "llm-heuristic";
  }

  humanScore = clamp(humanScore);
  const aiScore = clamp(100 - humanScore);

  let overallRisk: "low" | "medium" | "high";
  if (humanScore >= 70) {
    overallRisk = "low";
  } else if (humanScore >= 40) {
    overallRisk = "medium";
  } else {
    overallRisk = "high";
  }

  return {
    humanScore,
    aiScore,
    overallRisk,
    paragraphs: llmResult.paragraphs,
    engine,
    stats,
  };
}
