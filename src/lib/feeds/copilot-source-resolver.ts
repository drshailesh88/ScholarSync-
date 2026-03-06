/**
 * Copilot Source Resolver
 *
 * Determines the source tier for a feed article and assembles the
 * context that will be sent to the AI. Three tiers:
 *
 * Tier 1 — Full paper text (open access PDF fetched + extracted)
 * Tier 2 — Abstract only (paywalled)
 * Tier 3 — Title + metadata only (no abstract available)
 *
 * In all tiers, related PubMed context is fetched to enrich the AI's knowledge.
 */

import { lookupUnpaywall } from "@/lib/search/sources/unpaywall";
import {
  downloadAndExtractPdf,
  extractKeySecions,
} from "@/lib/deep-research/full-text-extractor";
import { searchPubMed } from "@/lib/search/sources/pubmed";
import { parseAuthorsToArray } from "@/lib/feeds/save-to-library";
import { logger } from "@/lib/logger";

// ── Types ───────────────────────────────────────────────────────────

export type SourceTier = "full_paper" | "abstract_only" | "title_only";

export interface ResolvedSource {
  /** The tier of source material available */
  tier: SourceTier;

  /** Human-readable description of the source level */
  sourceLabel: string;

  /** The full AI context string (article + related papers) */
  context: string;

  /** System prompt tailored to the tier */
  systemPrompt: string;

  /** Number of related papers included as context */
  relatedPaperCount: number;
}

export interface ArticleInput {
  title: string;
  authors: string | null;
  abstractSnippet: string | null;
  doi: string | null;
  pubmedId: string | null;
  journal: string | null;
  volume: string | null;
  issue: string | null;
  publishedAt: Date | string | null;
  link: string | null;
}

// ── Constants ───────────────────────────────────────────────────────

const MAX_FULL_TEXT_CHARS = 12_000;
const MAX_RELATED_PAPERS = 3;
const MAX_ABSTRACT_CHARS = 2_000;

// ── System prompts by tier ──────────────────────────────────────────

const SYSTEM_PROMPT_TIER1 = `You are a medical research assistant helping a physician understand a journal article. You have the FULL TEXT of the paper.

Rules:
- Answer from the paper's content. Reference specific sections when possible.
- If the paper doesn't directly answer, then provide context.
- Keep responses concise (2-4 paragraphs) unless asked for detail.
- If asked about something not in this paper, say so and suggest what to search for.
- Related PubMed abstracts are provided for additional context — distinguish between what THIS paper says and what related literature shows.

IMPORTANT: You have the full paper text. Your answers should reflect this depth.`;

const SYSTEM_PROMPT_TIER2 = `You are a medical research assistant helping a physician understand a journal article. You have ONLY the abstract — the full paper is behind a paywall.

Rules:
- Answer based on the abstract and related PubMed literature provided.
- ALWAYS distinguish between what the abstract states and what related papers suggest.
- Do NOT speculate about methods, results, or discussion sections you have not seen.
- When asked about details not in the abstract, say: "The abstract doesn't cover this. Based on related literature: ..."
- For medical jargon: define the term, then explain its significance.
- Related PubMed abstracts are provided — cite them when you use their information.

DISCLAIMER: Your answers are based on the abstract only. The full paper may contain important details, limitations, and nuances not captured in the abstract.`;

const SYSTEM_PROMPT_TIER3 = `You are a medical research assistant. You have ONLY the title and metadata for this article — no abstract is available.

Rules:
- Be transparent that you have NOT read this paper.
- Base your answers on related PubMed literature provided as context.
- ALWAYS prefix substantive claims with "Based on related literature..." or "Related studies suggest..."
- Do NOT fabricate or guess what this specific paper might say.
- When asked for a summary: explain what related papers say about the topic, not this specific paper.
- If asked for specifics about this paper, say: "I don't have the abstract or full text for this paper. Here's what related research shows: ..."

DISCLAIMER: Answers are NOT based on this paper's content. They are based entirely on related PubMed literature about the same topic.`;

// ── Public API ──────────────────────────────────────────────────────

/**
 * Resolve the source material for a feed article.
 *
 * Pipeline:
 * 1. If DOI exists → check Unpaywall for OA PDF → download + extract → Tier 1
 * 2. If abstract exists → Tier 2
 * 3. Otherwise → Tier 3
 * 4. In all tiers → search PubMed for 3 related abstracts
 * 5. Assemble the full context string + system prompt
 *
 * NEVER throws. Returns Tier 3 on any failure.
 */
export async function resolveArticleSource(
  article: ArticleInput
): Promise<ResolvedSource> {
  const log = logger.withRequestId();
  let tier: SourceTier = "title_only";
  let articleText = "";

  // ── Step 1: Try to get full text (Tier 1) ──────────────────────

  if (article.doi) {
    try {
      log.info("Copilot: checking Unpaywall for OA PDF", {
        doi: article.doi,
      });
      const unpaywall = await lookupUnpaywall(article.doi);

      if (unpaywall.pdfUrl) {
        log.info("Copilot: downloading OA PDF", { url: unpaywall.pdfUrl });
        const rawText = await downloadAndExtractPdf(unpaywall.pdfUrl);

        if (rawText && rawText.length > 200) {
          const keyText = extractKeySecions(rawText);
          articleText = keyText.slice(0, MAX_FULL_TEXT_CHARS);
          tier = "full_paper";
          log.info("Copilot: Tier 1 — full paper extracted", {
            chars: articleText.length,
          });
        }
      }
    } catch (err) {
      log.warn("Copilot: full text extraction failed, falling back", {
        doi: article.doi,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  // ── Step 2: Fall back to abstract (Tier 2) ─────────────────────

  if (tier !== "full_paper" && article.abstractSnippet) {
    articleText = article.abstractSnippet.slice(0, MAX_ABSTRACT_CHARS);
    tier = "abstract_only";
    log.info("Copilot: Tier 2 — abstract only", {
      chars: articleText.length,
    });
  }

  // ── Step 3: Title only (Tier 3) ────────────────────────────────

  if (tier === "title_only") {
    log.info("Copilot: Tier 3 — title + metadata only");
  }

  // ── Step 4: Fetch related PubMed context ───────────────────────

  let relatedContext = "";
  let relatedPaperCount = 0;

  try {
    // Build a search query from the article's title (first 100 chars)
    const searchTerms = article.title.slice(0, 100);
    const { results } = await searchPubMed(searchTerms, {
      maxResults: MAX_RELATED_PAPERS,
    });

    // Filter out the article itself (by PMID or DOI match)
    const related = results.filter((r) => {
      if (article.pubmedId && r.pmid === article.pubmedId) return false;
      if (article.doi && r.doi === article.doi) return false;
      return true;
    });

    if (related.length > 0) {
      relatedContext =
        "\n\nRELATED PUBMED LITERATURE:\n" +
        related
          .map((r, i) => {
            const authors =
              r.authors.length > 0 ? r.authors.slice(0, 3).join(", ") : "Unknown";
            const etAl = r.authors.length > 3 ? " et al." : "";
            return `[Related ${i + 1}] "${r.title}"
Authors: ${authors}${etAl}
Journal: ${r.journal || "Unknown"} (${r.year || "Unknown"})
PMID: ${r.pmid || "N/A"}
Abstract: ${r.abstract || "No abstract available"}`;
          })
          .join("\n\n---\n\n");

      relatedPaperCount = related.length;
    }
  } catch (err) {
    log.warn("Copilot: related papers fetch failed", {
      error: err instanceof Error ? err.message : String(err),
    });
  }

  // ── Step 5: Assemble context ───────────────────────────────────

  const authorsList = parseAuthorsToArray(article.authors);
  const authorsStr =
    authorsList.length > 0
      ? authorsList.slice(0, 5).join(", ") +
        (authorsList.length > 5 ? " et al." : "")
      : "Unknown";

  const year = article.publishedAt
    ? new Date(article.publishedAt).getFullYear()
    : null;

  const metadata = [
    `Title: ${article.title}`,
    `Authors: ${authorsStr}`,
    article.journal
      ? `Journal: ${article.journal}${article.volume ? ` ${article.volume}` : ""}${article.issue ? `(${article.issue})` : ""}`
      : null,
    year ? `Year: ${year}` : null,
    article.doi ? `DOI: ${article.doi}` : null,
    article.pubmedId ? `PMID: ${article.pubmedId}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  let context = `ARTICLE METADATA:\n${metadata}`;

  if (tier === "full_paper") {
    context += `\n\nFULL PAPER TEXT (Results & Discussion):\n${articleText}`;
  } else if (tier === "abstract_only") {
    context += `\n\nABSTRACT:\n${articleText}`;
  }

  context += relatedContext;

  // ── Step 6: Select system prompt ───────────────────────────────

  const systemPrompt =
    tier === "full_paper"
      ? SYSTEM_PROMPT_TIER1
      : tier === "abstract_only"
        ? SYSTEM_PROMPT_TIER2
        : SYSTEM_PROMPT_TIER3;

  const sourceLabel =
    tier === "full_paper"
      ? "Working from: Full paper (open access)"
      : tier === "abstract_only"
        ? "Working from: Abstract only — full paper is paywalled"
        : "Working from: Title + metadata only — no abstract available";

  return {
    tier,
    sourceLabel,
    context,
    systemPrompt,
    relatedPaperCount,
  };
}
