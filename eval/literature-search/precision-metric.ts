/**
 * Off-topic PRECISION metric for the literature-search eval harness.
 *
 * WHY THIS EXISTS (the failure class it makes un-hideable)
 * -------------------------------------------------------
 * Prior councils measured set-based landmark RECALL on known-item queries —
 * "did the famous high-citation paper appear in the top-10?". On those queries
 * the blockbuster IS the answer, so a citation-dominant ranking scored great.
 * But on NICHE / BROAD "management of X" queries the on-topic papers are NOT
 * famous, and the generic mega-cited papers (PRISMA, broad ESC/KDIGO/ACC-AHA
 * guidelines, methods papers, wrong-but-lexically-similar conditions) are
 * tempting-but-WRONG. Recall can't see that failure; it only checks whether the
 * known landmark is present, never whether the TOP of the list is on-topic or
 * polluted by intruders.
 *
 * This module is the missing instrument: a PURE function (no I/O) that scores a
 * ranked list against a query's on-topic / off-topic spec, producing
 * precision@k and an off-topic-intrusion rate. It is deliberately DISTINCT from
 * the recall metric in `@/lib/search/eval/metrics` (which it reuses only for
 * text normalization), so the two measure orthogonal failure modes.
 *
 * Classification is heuristic and conservative:
 *   - off_topic  — matches a CURATED intruder pattern (takes precedence: a
 *                  generic paper that merely grazes the topic lexically is still
 *                  an intrusion).
 *   - on_topic   — does not match an intruder AND matches an on-topic signal.
 *   - unknown    — matches neither (NOT credited as on-topic; it cannot inflate
 *                  precision, and it is not counted as an intrusion either).
 *
 * The LLM council still supplies true semantic relevance; this metric supplies
 * the cheap, deterministic, regression-proof signal that intruders are creeping
 * to the top.
 */

import { normalizeTitle, type EvalResultItem } from "@/lib/search/eval/metrics";

export type TopicLabel = "on_topic" | "off_topic" | "unknown";

/** A named class of tempting-but-wrong intruder (e.g. "PRISMA reporting guideline"). */
export interface OffTopicPattern {
  /** Human-readable intruder class, surfaced in reports. */
  label: string;
  /**
   * Phrases identifying this intruder. A phrase matches when ALL of its tokens
   * appear in the result's title+abstract; the pattern matches if ANY phrase does.
   */
  phrases: string[];
}

/** The on-topic / off-topic acceptance spec for one query. */
export interface PrecisionSpec {
  /**
   * Phrases identifying a genuinely on-topic paper. OR across phrases; AND across
   * the tokens within a phrase (so `"empagliflozin preserved"` needs both words).
   */
  onTopic: string[];
  /** Known intruder classes for this query (the tempting-but-wrong papers). */
  offTopic: OffTopicPattern[];
}

const haystack = (item: EvalResultItem): string =>
  `${normalizeTitle(item.title)} ${normalizeTitle(item.abstract ?? "")}`.trim();

/**
 * A phrase matches when every token (length >= 2 after normalization) appears as
 * a substring of the haystack. Length-1 tokens are dropped so a stray initial
 * (e.g. the "n" in "n-acetylcysteine") cannot match everything; a phrase with no
 * surviving token never matches.
 */
function phraseMatches(hay: string, phrase: string): boolean {
  const tokens = normalizeTitle(phrase)
    .split(" ")
    .filter((t) => t.length >= 2);
  return tokens.length > 0 && tokens.every((t) => hay.includes(t));
}

const anyPhrase = (hay: string, phrases: string[]): boolean =>
  phrases.some((p) => phraseMatches(hay, p));

/** The first intruder pattern this result matches, or null. */
export function matchedIntruder(
  item: EvalResultItem,
  spec: PrecisionSpec
): OffTopicPattern | null {
  const hay = haystack(item);
  for (const pat of spec.offTopic) {
    if (anyPhrase(hay, pat.phrases)) return pat;
  }
  return null;
}

/** Classify one result. Intruders take precedence over on-topic lexical overlap. */
export function classifyResult(item: EvalResultItem, spec: PrecisionSpec): TopicLabel {
  if (matchedIntruder(item, spec)) return "off_topic";
  if (anyPhrase(haystack(item), spec.onTopic)) return "on_topic";
  return "unknown";
}

export interface ClassifiedResult {
  rank: number;
  title: string;
  label: TopicLabel;
  /** Set only when label === "off_topic": which intruder class matched. */
  intruder?: string;
}

/** Per-result labels for the top-k, in rank order. */
export function classifyResults(
  results: EvalResultItem[],
  spec: PrecisionSpec,
  k = 10
): ClassifiedResult[] {
  return results.slice(0, k).map((item, i) => {
    const intruder = matchedIntruder(item, spec);
    const label: TopicLabel = intruder
      ? "off_topic"
      : anyPhrase(haystack(item), spec.onTopic)
        ? "on_topic"
        : "unknown";
    return {
      rank: i + 1,
      title: item.title,
      label,
      ...(intruder ? { intruder: intruder.label } : {}),
    };
  });
}

export interface PrecisionMetrics {
  /** Results considered (min(k, list length)). */
  count: number;
  onTopic: number;
  offTopic: number;
  unknown: number;
  /** on_topic / count. `unknown` counts against precision (conservative). */
  precisionAtK: number;
  /** on_topic / min(3, count) — the top-of-list precision the council can't fake. */
  precisionAt3: number;
  /** off_topic / count — the headline intrusion signal for this failure class. */
  offTopicIntrusionRate: number;
  /** on_topic / (on_topic + off_topic): purity among confidently-labeled results, or null. */
  labeledPrecision: number | null;
  /** 1-based rank of the first intruder, or null. A small rank = a top-of-list intrusion. */
  firstIntruderRank: number | null;
  /** The intruders that reached the top-k, with rank and matched class. */
  intruders: Array<{ rank: number; title: string; label: string }>;
}

/**
 * Score a ranked list against a query's on-topic / off-topic spec.
 *
 * Conventions for an empty list: every rate is 0 (no on-topic delivered, no
 * intrusion) and `labeledPrecision` / `firstIntruderRank` are null. Callers that
 * care about retrieval failure should read `count`.
 */
export function computePrecisionMetrics(
  results: EvalResultItem[],
  spec: PrecisionSpec,
  k = 10
): PrecisionMetrics {
  const classified = classifyResults(results, spec, k);
  const count = classified.length;
  const onTopic = classified.filter((c) => c.label === "on_topic").length;
  const offTopic = classified.filter((c) => c.label === "off_topic").length;
  const unknown = classified.filter((c) => c.label === "unknown").length;

  const top3 = classified.slice(0, 3);
  const onTop3 = top3.filter((c) => c.label === "on_topic").length;

  const firstIntruder = classified.find((c) => c.label === "off_topic");

  return {
    count,
    onTopic,
    offTopic,
    unknown,
    precisionAtK: count === 0 ? 0 : onTopic / count,
    precisionAt3: top3.length === 0 ? 0 : onTop3 / top3.length,
    offTopicIntrusionRate: count === 0 ? 0 : offTopic / count,
    labeledPrecision: onTopic + offTopic === 0 ? null : onTopic / (onTopic + offTopic),
    firstIntruderRank: firstIntruder ? firstIntruder.rank : null,
    intruders: classified
      .filter((c) => c.label === "off_topic")
      .map((c) => ({ rank: c.rank, title: c.title, label: c.intruder ?? "intruder" })),
  };
}

/** Mean of a numeric field across precision-metric rows, ignoring nulls. */
export function meanPrecision(
  rows: PrecisionMetrics[],
  pick: (m: PrecisionMetrics) => number | null
): number | null {
  const vals = rows
    .map(pick)
    .filter((v): v is number => v !== null && v !== undefined && !Number.isNaN(v));
  if (vals.length === 0) return null;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}
