import writeGood from "write-good";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface WritingIssue {
  index: number;
  offset: number;
  reason: string;
  type: "passive" | "weasel" | "adverb" | "complex" | "readability";
  severity: "info" | "warning" | "error";
  suggestion?: string;
}

export interface WritingMetrics {
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  avgWordsPerSentence: number;
  avgSentenceLength: number;
  fleschReadingEase: number;
  fleschKincaidGrade: number;
  gunningFogIndex: number;
  passiveVoiceCount: number;
  weaselWordCount: number;
  adverbCount: number;
  complexSentenceCount: number;
  readabilityLabel: string;
}

// ---------------------------------------------------------------------------
// Syllable counting heuristic
// ---------------------------------------------------------------------------

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (w.length <= 2) return 1;

  // Count vowel groups
  const vowelGroups = w.match(/[aeiouy]+/g);
  let count = vowelGroups ? vowelGroups.length : 1;

  // Silent-e at the end: subtract 1 if word ends with "e" and is not solely a
  // vowel group (e.g. "the" stays 1)
  if (w.endsWith("e") && count > 1) {
    count -= 1;
  }

  // Common suffixes that add a syllable
  if (/(?:le|les)$/.test(w) && w.length > 3 && !/[aeiouy]le$/.test(w)) {
    count += 1;
  }

  // Ensure at least 1 syllable
  return Math.max(count, 1);
}

// ---------------------------------------------------------------------------
// Text splitting helpers
// ---------------------------------------------------------------------------

function splitSentences(text: string): string[] {
  // Split on sentence-ending punctuation followed by whitespace or end of string
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function splitWords(text: string): string[] {
  return text.split(/\s+/).filter((w) => w.length > 0);
}

// ---------------------------------------------------------------------------
// Classify write-good reasons into issue types
// ---------------------------------------------------------------------------

function classifyReason(reason: string): {
  type: WritingIssue["type"];
  severity: WritingIssue["severity"];
} {
  const lower = reason.toLowerCase();

  if (lower.includes("passive voice")) {
    return { type: "passive", severity: "warning" };
  }
  if (lower.includes("weasel")) {
    return { type: "weasel", severity: "warning" };
  }
  if (lower.includes("adverb")) {
    return { type: "adverb", severity: "info" };
  }

  // Default: treat everything else as a readability-level issue
  return { type: "readability", severity: "info" };
}

// ---------------------------------------------------------------------------
// Complex word detection for Gunning Fog
// ---------------------------------------------------------------------------

function isComplexWord(word: string): boolean {
  const syllables = countSyllables(word);
  if (syllables < 3) return false;
  // Exclude common suffixes that inflate syllable count
  const lower = word.toLowerCase();
  if (lower.endsWith("ed") || lower.endsWith("es") || lower.endsWith("ing")) {
    return false;
  }
  return true;
}

// ---------------------------------------------------------------------------
// Readability label from Flesch Reading Ease score
// ---------------------------------------------------------------------------

function getReadabilityLabel(score: number): string {
  if (score >= 60) return "Easy";
  if (score >= 40) return "Standard";
  if (score >= 20) return "Difficult";
  return "Very Difficult";
}

// ---------------------------------------------------------------------------
// Main analysis function
// ---------------------------------------------------------------------------

export function analyzeWriting(text: string): {
  issues: WritingIssue[];
  metrics: WritingMetrics;
} {
  // ---- Metrics ----
  const words = splitWords(text);
  const wordCount = words.length;

  const sentences = splitSentences(text);
  const sentenceCount = Math.max(sentences.length, 1);

  const paragraphs = text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  const paragraphCount = Math.max(paragraphs.length, 1);

  const avgWordsPerSentence = wordCount / sentenceCount;

  const totalSyllables = words.reduce(
    (sum, w) => sum + countSyllables(w),
    0
  );
  const syllablesPerWord = wordCount > 0 ? totalSyllables / wordCount : 0;

  // Flesch Reading Ease: 206.835 - 1.015 * (words/sentences) - 84.6 * (syllables/words)
  const fleschReadingEase = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        206.835 - 1.015 * avgWordsPerSentence - 84.6 * syllablesPerWord
      )
    )
  );

  // Flesch-Kincaid Grade Level: 0.39 * (words/sentences) + 11.8 * (syllables/words) - 15.59
  const rawGrade =
    0.39 * avgWordsPerSentence + 11.8 * syllablesPerWord - 15.59;
  const fleschKincaidGrade = Math.max(
    0,
    Math.round(rawGrade * 10) / 10
  );

  // ---- Gunning Fog Index: 0.4 * ((words/sentences) + 100 * (complexWords/words)) ----
  const complexWords = words.filter((w) => isComplexWord(w));
  const complexWordRatio = wordCount > 0 ? complexWords.length / wordCount : 0;
  const gunningFogIndex = Math.max(
    0,
    Math.round(
      (0.4 * (avgWordsPerSentence + 100 * complexWordRatio)) * 10
    ) / 10
  );

  // ---- Issues from write-good ----
  const issues: WritingIssue[] = [];
  let passiveVoiceCount = 0;
  let weaselWordCount = 0;
  let adverbCount = 0;

  if (text.trim().length > 0) {
    const writeGoodResults = writeGood(text);

    for (const r of writeGoodResults) {
      const { type, severity } = classifyReason(r.reason);

      if (type === "passive") {
        passiveVoiceCount += 1;
      }
      if (type === "weasel") {
        weaselWordCount += 1;
      }
      if (type === "adverb") {
        adverbCount += 1;
      }

      issues.push({
        index: r.index,
        offset: r.offset,
        reason: r.reason,
        type,
        severity,
        suggestion: undefined,
      });
    }
  }

  // ---- Flag complex sentences (> 35 words) ----
  let complexSentenceCount = 0;
  let offset = 0;
  for (const sentence of sentences) {
    const sentenceWordCount = splitWords(sentence).length;
    const sentenceStart = text.indexOf(sentence, offset);
    if (sentenceWordCount > 35) {
      complexSentenceCount += 1;
      if (sentenceStart !== -1) {
        issues.push({
          index: sentenceStart,
          offset: sentence.length,
          reason: `This sentence has ${sentenceWordCount} words. Consider breaking it up for clarity.`,
          type: "complex",
          severity: "warning",
          suggestion: "Break this into shorter sentences for better readability.",
        });
      }
    }
    if (sentenceStart !== -1) {
      offset = sentenceStart + sentence.length;
    }
  }

  // ---- Assemble metrics ----
  const metrics: WritingMetrics = {
    wordCount,
    sentenceCount,
    paragraphCount,
    avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
    avgSentenceLength: Math.round(avgWordsPerSentence * 10) / 10,
    fleschReadingEase,
    fleschKincaidGrade,
    gunningFogIndex,
    passiveVoiceCount,
    weaselWordCount,
    adverbCount,
    complexSentenceCount,
    readabilityLabel: getReadabilityLabel(fleschReadingEase),
  };

  return { issues, metrics };
}
