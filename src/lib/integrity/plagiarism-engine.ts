/**
 * Plagiarism Detection Engine
 *
 * Uses k-shingling (k=5 words) + MinHash (128 hash functions) + Jaccard
 * similarity to detect text overlap against scholarly literature fetched
 * from Crossref and Semantic Scholar APIs.
 */

import { createHash } from "crypto";
import type { PlagiarismMatch, PlagiarismResult } from "./types";

// ── Constants ──────────────────────────────────────────────────────

const SHINGLE_K = 5;
const NUM_HASHES = 128;
const MAX_HASH = 2 ** 32 - 1;

const CROSSREF_API = "https://api.crossref.org/works";
const SEMANTIC_SCHOLAR_API =
  "https://api.semanticscholar.org/graph/v1/paper/search";

const POLITE_MAILTO = "scholarsync@example.com";

/** Common academic stopwords to skip during key phrase extraction. */
const ACADEMIC_STOPWORDS = new Set([
  "the",
  "and",
  "for",
  "that",
  "this",
  "with",
  "from",
  "are",
  "was",
  "were",
  "been",
  "have",
  "has",
  "had",
  "not",
  "but",
  "can",
  "will",
  "may",
  "also",
  "its",
  "our",
  "their",
  "which",
  "these",
  "those",
  "such",
  "than",
  "other",
  "into",
  "more",
  "most",
  "some",
  "each",
  "all",
  "both",
  "between",
  "however",
  "therefore",
  "thus",
  "hence",
  "moreover",
  "furthermore",
  "although",
  "whereas",
  "results",
  "study",
  "studies",
  "research",
  "paper",
  "method",
  "methods",
  "approach",
  "data",
  "analysis",
  "figure",
  "table",
  "section",
  "conclusion",
  "introduction",
  "abstract",
  "based",
  "using",
  "used",
  "show",
  "shown",
  "found",
  "given",
  "present",
  "proposed",
  "various",
  "different",
  "several",
  "within",
  "about",
  "through",
  "during",
  "where",
  "when",
  "while",
  "there",
  "here",
  "they",
  "them",
  "then",
  "what",
  "how",
  "does",
  "did",
  "being",
  "should",
  "would",
  "could",
  "very",
  "only",
  "even",
  "just",
  "over",
  "after",
  "before",
  "above",
  "below",
  "under",
]);

// ── Hash Functions for MinHash ─────────────────────────────────────

/**
 * Pre-generate coefficients for the MinHash family.
 * Each hash function is h(x) = (a * x + b) mod p mod MAX_HASH,
 * where p is a large prime.
 */
const LARGE_PRIME = 4294967311; // next prime above 2^32

interface HashCoefficients {
  a: number;
  b: number;
}

function generateHashCoefficients(count: number): HashCoefficients[] {
  // Use a seeded deterministic sequence so results are reproducible
  const coeffs: HashCoefficients[] = [];
  for (let i = 0; i < count; i++) {
    const seedA = createHash("md5")
      .update(`coeff-a-${i}`)
      .digest()
      .readUInt32BE(0);
    const seedB = createHash("md5")
      .update(`coeff-b-${i}`)
      .digest()
      .readUInt32BE(0);
    coeffs.push({
      a: (seedA % (LARGE_PRIME - 1)) + 1, // a must be >= 1
      b: seedB % LARGE_PRIME,
    });
  }
  return coeffs;
}

const HASH_COEFFICIENTS = generateHashCoefficients(NUM_HASHES);

// ── Text Processing ────────────────────────────────────────────────

/** Normalize text: lowercase, strip punctuation, collapse whitespace. */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Split text into word tokens. */
export function tokenize(text: string): string[] {
  const normalized = normalizeText(text);
  return normalized.split(" ").filter((w) => w.length > 0);
}

/** Create k-shingles (k consecutive words joined by space). */
export function createShingles(tokens: string[], k: number = SHINGLE_K): Set<number> {
  const shingles = new Set<number>();
  if (tokens.length < k) {
    // If text is too short, use what we have as a single shingle
    if (tokens.length > 0) {
      shingles.add(hashShingle(tokens.join(" ")));
    }
    return shingles;
  }
  for (let i = 0; i <= tokens.length - k; i++) {
    const shingle = tokens.slice(i, i + k).join(" ");
    shingles.add(hashShingle(shingle));
  }
  return shingles;
}

/** Hash a shingle string to a 32-bit integer. */
function hashShingle(shingle: string): number {
  const hash = createHash("md5").update(shingle).digest();
  return hash.readUInt32BE(0);
}

// ── MinHash ────────────────────────────────────────────────────────

/** Compute a MinHash signature for a set of shingle hashes. */
export function computeMinHash(shingles: Set<number>): Uint32Array {
  const signature = new Uint32Array(NUM_HASHES).fill(MAX_HASH);

  const shingleArr = Array.from(shingles);
  for (const shingle of shingleArr) {
    for (let i = 0; i < NUM_HASHES; i++) {
      const { a, b } = HASH_COEFFICIENTS[i];
      // Use BigInt for the multiplication to avoid overflow
      const hashed = Number(
        (BigInt(a) * BigInt(shingle) + BigInt(b)) % BigInt(LARGE_PRIME)
      );
      if (hashed < signature[i]) {
        signature[i] = hashed;
      }
    }
  }

  return signature;
}

/** Estimate Jaccard similarity from two MinHash signatures. */
export function estimateJaccard(sigA: Uint32Array, sigB: Uint32Array): number {
  let matches = 0;
  for (let i = 0; i < NUM_HASHES; i++) {
    if (sigA[i] === sigB[i]) {
      matches++;
    }
  }
  return matches / NUM_HASHES;
}

// ── Key Phrase Extraction ──────────────────────────────────────────

interface PhraseCandidate {
  phrase: string;
  count: number;
  score: number;
}

/**
 * Extract top 5-8 distinctive multi-word phrases using TF-IDF-like
 * heuristics. Picks bigrams and trigrams that appear 2+ times and
 * contain no stopwords-only compositions.
 */
function extractKeyPhrases(text: string): string[] {
  const tokens = tokenize(text);
  const totalTokens = tokens.length;

  if (totalTokens < 3) {
    return [normalizeText(text).slice(0, 100)];
  }

  // Count bigrams and trigrams
  const phraseCounts = new Map<string, number>();

  for (let n = 2; n <= 3; n++) {
    for (let i = 0; i <= tokens.length - n; i++) {
      const ngram = tokens.slice(i, i + n);

      // Skip if all words are stopwords
      const nonStopCount = ngram.filter(
        (w) => !ACADEMIC_STOPWORDS.has(w) && w.length > 2
      ).length;
      if (nonStopCount < Math.ceil(n / 2)) continue;

      const phrase = ngram.join(" ");
      phraseCounts.set(phrase, (phraseCounts.get(phrase) || 0) + 1);
    }
  }

  // Filter to phrases appearing 2+ times
  const candidates: PhraseCandidate[] = [];
  for (const [phrase, count] of Array.from(phraseCounts.entries())) {
    if (count < 2) continue;

    // Score: count * inverse document frequency proxy (longer, rarer words score higher)
    const words = phrase.split(" ");
    const avgWordLen =
      words.reduce((sum, w) => sum + w.length, 0) / words.length;
    const specificity = avgWordLen / 5; // Normalize around average word length
    const score = count * specificity * words.length;

    candidates.push({ phrase, count, score });
  }

  // Sort by score descending and take top 8
  candidates.sort((a, b) => b.score - a.score);
  const topPhrases = candidates.slice(0, 8).map((c) => c.phrase);

  // If we got fewer than 5 phrases from ngrams, supplement with
  // high-frequency single distinctive words
  if (topPhrases.length < 5) {
    const wordFreq = new Map<string, number>();
    for (const token of tokens) {
      if (ACADEMIC_STOPWORDS.has(token) || token.length <= 3) continue;
      wordFreq.set(token, (wordFreq.get(token) || 0) + 1);
    }
    const sortedWords = Array.from(wordFreq.entries())
      .filter(([, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1]);

    for (const [word] of sortedWords) {
      if (topPhrases.length >= 5) break;
      if (!topPhrases.some((p) => p.includes(word))) {
        topPhrases.push(word);
      }
    }
  }

  return topPhrases.length > 0
    ? topPhrases
    : [normalizeText(text).slice(0, 60)];
}

// ── Scholarly API Queries ──────────────────────────────────────────

interface ScholarlyPaper {
  title: string;
  authors: string[];
  doi?: string;
  url?: string;
  year?: number;
  abstract?: string;
}

/** Query Crossref for papers matching a search query. */
async function queryCrossref(
  query: string,
  signal?: AbortSignal
): Promise<ScholarlyPaper[]> {
  const params = new URLSearchParams({
    query,
    rows: "5",
    select: "title,author,DOI,URL,published-print,abstract",
  });

  try {
    const res = await fetch(`${CROSSREF_API}?${params.toString()}`, {
      headers: {
        "User-Agent": `ScholarSync/1.0 (mailto:${POLITE_MAILTO})`,
        Accept: "application/json",
      },
      signal,
    });

    if (!res.ok) return [];

    const data = await res.json();
    const items = data?.message?.items;
    if (!Array.isArray(items)) return [];

    return items.map(
      (item: Record<string, unknown>): ScholarlyPaper => ({
        title: Array.isArray(item.title)
          ? (item.title as string[])[0]
          : String(item.title || ""),
        authors: Array.isArray(item.author)
          ? (item.author as Array<{ given?: string; family?: string }>).map(
              (a) => [a.given, a.family].filter(Boolean).join(" ")
            )
          : [],
        doi: item.DOI ? String(item.DOI) : undefined,
        url: item.URL ? String(item.URL) : undefined,
        year: extractCrossrefYear(item),
        abstract: item.abstract ? stripHtml(String(item.abstract)) : undefined,
      })
    );
  } catch {
    return [];
  }
}

function extractCrossrefYear(item: Record<string, unknown>): number | undefined {
  const published = item["published-print"] as
    | { "date-parts"?: number[][] }
    | undefined;
  const parts = published?.["date-parts"];
  if (Array.isArray(parts) && Array.isArray(parts[0]) && parts[0][0]) {
    return parts[0][0];
  }
  return undefined;
}

/** Strip HTML tags from Crossref abstracts. */
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

/** Query Semantic Scholar for papers matching a search query. */
async function querySemanticScholar(
  query: string,
  signal?: AbortSignal
): Promise<ScholarlyPaper[]> {
  const params = new URLSearchParams({
    query,
    limit: "5",
    fields: "title,authors,externalIds,url,year,abstract",
  });

  try {
    const res = await fetch(`${SEMANTIC_SCHOLAR_API}?${params.toString()}`, {
      headers: { Accept: "application/json" },
      signal,
    });

    if (!res.ok) return [];

    const data = await res.json();
    const papers = data?.data;
    if (!Array.isArray(papers)) return [];

    return papers.map(
      (p: Record<string, unknown>): ScholarlyPaper => ({
        title: String(p.title || ""),
        authors: Array.isArray(p.authors)
          ? (p.authors as Array<{ name?: string }>).map((a) =>
              String(a.name || "")
            )
          : [],
        doi: (p.externalIds as Record<string, string> | undefined)?.DOI,
        url: p.url ? String(p.url) : undefined,
        year: typeof p.year === "number" ? p.year : undefined,
        abstract: p.abstract ? String(p.abstract) : undefined,
      })
    );
  } catch {
    return [];
  }
}

// ── Paragraph Splitting ────────────────────────────────────────────

/** Split text into meaningful paragraphs (min 30 words each). */
function splitIntoParagraphs(text: string): string[] {
  const raw = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  // Merge short paragraphs
  const paragraphs: string[] = [];
  let buffer = "";

  for (const para of raw) {
    if (buffer) {
      buffer += " " + para;
    } else {
      buffer = para;
    }

    const wordCount = buffer.split(/\s+/).length;
    if (wordCount >= 30) {
      paragraphs.push(buffer);
      buffer = "";
    }
  }

  if (buffer) {
    if (paragraphs.length > 0) {
      paragraphs[paragraphs.length - 1] += " " + buffer;
    } else {
      paragraphs.push(buffer);
    }
  }

  return paragraphs;
}

// ── Deduplication ──────────────────────────────────────────────────

/** Deduplicate papers by DOI or title. */
function deduplicatePapers(papers: ScholarlyPaper[]): ScholarlyPaper[] {
  const seen = new Set<string>();
  const unique: ScholarlyPaper[] = [];

  for (const paper of papers) {
    const key = paper.doi
      ? `doi:${paper.doi.toLowerCase()}`
      : `title:${normalizeText(paper.title)}`;

    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(paper);
  }

  return unique;
}

// ── Severity Classification ────────────────────────────────────────

function classifySeverity(similarity: number): "low" | "medium" | "high" {
  if (similarity >= 0.4) return "high";
  if (similarity >= 0.2) return "medium";
  return "low";
}

// ── Main Engine ────────────────────────────────────────────────────

/**
 * Run plagiarism detection on the provided text.
 *
 * Pipeline:
 * 1. Extract key phrases from the text
 * 2. Query Crossref and Semantic Scholar in parallel
 * 3. Deduplicate matched papers
 * 4. For each paper with an abstract, compute shingle-based similarity
 *    against each paragraph of the input text
 * 5. Return scored matches
 */
export async function runPlagiarismCheck(
  text: string
): Promise<PlagiarismResult> {
  if (!text || text.trim().length < 50) {
    return {
      similarityScore: 0,
      sourcesScanned: 0,
      matches: [],
      engine: "shingling-scholarly",
    };
  }

  // Step 1: Extract key phrases
  const keyPhrases = extractKeyPhrases(text);

  // Step 2: Split text into paragraphs and precompute their shingles/signatures
  const paragraphs = splitIntoParagraphs(text);
  const paragraphData = paragraphs.map((para) => {
    const tokens = tokenize(para);
    const shingles = createShingles(tokens);
    const signature = computeMinHash(shingles);
    const excerpt =
      para.length > 120 ? para.slice(0, 117) + "..." : para;
    return { text: para, tokens, shingles, signature, excerpt };
  });

  // Step 3: Query both APIs in parallel for all key phrases
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  const allPapers: ScholarlyPaper[] = [];

  try {
    // Fire all API calls in parallel — one per key phrase per API
    const crossrefPromises = keyPhrases.map((phrase) =>
      queryCrossref(phrase, controller.signal)
    );
    const semanticPromises = keyPhrases.map((phrase) =>
      querySemanticScholar(phrase, controller.signal)
    );

    const results = await Promise.allSettled([
      ...crossrefPromises,
      ...semanticPromises,
    ]);

    for (const result of results) {
      if (result.status === "fulfilled") {
        allPapers.push(...result.value);
      }
    }
  } finally {
    clearTimeout(timeout);
  }

  // Step 4: Deduplicate
  const uniquePapers = deduplicatePapers(allPapers);
  const papersWithAbstracts = uniquePapers.filter(
    (p) => p.abstract && p.abstract.length >= 30
  );

  // Step 5: Compare each paper's abstract against each paragraph
  const matches: PlagiarismMatch[] = [];
  const seenMatchKeys = new Set<string>();

  for (const paper of papersWithAbstracts) {
    const abstractTokens = tokenize(paper.abstract!);
    const abstractShingles = createShingles(abstractTokens);

    // Skip papers with too few shingles
    if (abstractShingles.size === 0) continue;

    const abstractSignature = computeMinHash(abstractShingles);

    for (const para of paragraphData) {
      if (para.shingles.size === 0) continue;

      const similarity = estimateJaccard(para.signature, abstractSignature);

      // Only report matches with meaningful overlap
      if (similarity < 0.08) continue;

      // Deduplicate: same paragraph + same paper
      const matchKey = `${para.excerpt.slice(0, 40)}||${paper.doi || paper.title}`;
      if (seenMatchKeys.has(matchKey)) continue;
      seenMatchKeys.add(matchKey);

      matches.push({
        excerpt: para.excerpt,
        source: {
          title: paper.title,
          authors:
            paper.authors.length > 0 ? paper.authors : undefined,
          doi: paper.doi,
          url: paper.doi
            ? `https://doi.org/${paper.doi}`
            : paper.url || undefined,
          year: paper.year,
        },
        similarity: Math.round(similarity * 1000) / 1000,
        severity: classifySeverity(similarity),
      });
    }
  }

  // Sort matches by similarity descending
  matches.sort((a, b) => b.similarity - a.similarity);

  // Step 6: Compute overall similarity score (0-100)
  // Use the maximum paragraph-level similarity as the base, weighted by
  // how many paragraphs have notable overlap.
  const overallScore = computeOverallScore(matches, paragraphs.length);

  return {
    similarityScore: overallScore,
    sourcesScanned: uniquePapers.length,
    matches,
    engine: "shingling-scholarly",
  };
}

/**
 * Compute an overall similarity score (0-100) from individual matches.
 *
 * Strategy: weight the top match heavily, then add diminishing
 * contributions from additional matches, normalized by paragraph count.
 */
function computeOverallScore(
  matches: PlagiarismMatch[],
  paragraphCount: number
): number {
  if (matches.length === 0 || paragraphCount === 0) return 0;

  // Collect the highest similarity per unique paragraph excerpt
  const perParagraph = new Map<string, number>();
  for (const match of matches) {
    const key = match.excerpt.slice(0, 60);
    const existing = perParagraph.get(key) || 0;
    if (match.similarity > existing) {
      perParagraph.set(key, match.similarity);
    }
  }

  // Average of per-paragraph max similarities, scaled to 0-100
  const similarities = Array.from(perParagraph.values());
  const sum = similarities.reduce((acc, s) => acc + s, 0);

  // Weight: proportion of paragraphs that have matches * average similarity
  const coverageRatio = similarities.length / paragraphCount;
  const avgSimilarity = sum / similarities.length;

  // Blend: 60% average similarity, 40% coverage
  const blended = avgSimilarity * 0.6 + coverageRatio * avgSimilarity * 0.4;

  const score = Math.round(blended * 100);
  return Math.min(100, Math.max(0, score));
}
