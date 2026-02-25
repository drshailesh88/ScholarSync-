/**
 * Deep Research Engine.
 *
 * Implements a multi-round, citation-traversing, AI-guided research pipeline:
 *   1. Validate topic
 *   2. Generate perspectives (AI-guided research angles)
 *   3. Build exploration tree
 *   4. Round 1: Perspective-based searches across PubMed, Semantic Scholar, OpenAlex
 *   5. Citation graph traversal (forward + backward via S2 API)
 *   6. Round 2: AI-guided follow-up searches based on gaps
 *   7. Round 3: Additional gap-filling (deep/exhaustive modes only)
 *   8. Deduplicate all results
 *   9. Unpaywall lookup for open-access full texts
 *  10. Structured data extraction via AI
 *  11. Convert to EnhancedPaper with perspectiveIds
 *  12. Synthesize findings via multi-pass pipeline
 */

import { generateText } from "ai";
import { getSmallModel } from "@/lib/ai/models";
import { searchPubMed } from "@/lib/search/sources/pubmed";
import { searchSemanticScholar } from "@/lib/search/sources/semantic-scholar";
import { searchOpenAlex } from "@/lib/search/sources/openalex";
import { batchLookupUnpaywall } from "@/lib/search/sources/unpaywall";
import { deduplicateResults } from "@/lib/search/dedup";
import { traverseCitationGraph, selectTopPapers } from "./citation-traversal";
import { extractStructuredData } from "./data-extraction";
import { extractFullTexts } from "./full-text-extractor";
import { generatePerspectives } from "./perspectives";
import { synthesizeFindings } from "./synthesis";
import type { UnifiedSearchResult } from "@/types/search";
import type {
  ResearchConfig,
  ResearchMode,
  Perspective,
  ResearchProgressCallback,
  ExplorationTree,
  ExplorationNode,
  EnhancedPaper,
  ExtractedPaperData,
  DeepResearchResult,
} from "./types";
import { buildConfig } from "./types";

// ── Validation ────────────────────────────────────────────────────────

export function validateTopic(topic: string): { valid: boolean; error?: string } {
  const trimmed = topic.trim();
  if (trimmed.length < 5) {
    return { valid: false, error: "Topic must be at least 5 characters long" };
  }
  if (trimmed.length > 500) {
    return { valid: false, error: "Topic must be 500 characters or fewer" };
  }
  return { valid: true };
}

// ── Exploration Tree ──────────────────────────────────────────────────

/**
 * Build an exploration tree with the topic as root and one node per
 * perspective search query.
 */
export function buildExplorationTree(
  topic: string,
  perspectives: Perspective[]
): ExplorationTree {
  // Create one node per search query, grouped by perspective
  const children: ExplorationNode[] = [];
  let nodeIdx = 0;

  for (const p of perspectives) {
    for (const query of p.searchQueries) {
      children.push({
        id: `node-${++nodeIdx}`,
        query,
        perspectiveId: p.id,
        depth: 1,
        status: "pending" as const,
        results: [],
        children: [],
      });
    }
  }

  const root: ExplorationNode = {
    id: "root",
    query: topic,
    perspectiveId: "",
    depth: 0,
    status: "complete",
    results: [],
    children,
  };

  return {
    topic,
    root,
    totalNodes: 1 + children.length,
  };
}

// ── Multi-Source Search ───────────────────────────────────────────────

/**
 * Search across PubMed, Semantic Scholar, and OpenAlex in parallel.
 */
async function searchAllSources(
  query: string,
  config: ResearchConfig,
  perSourceLimit?: number
): Promise<UnifiedSearchResult[]> {
  const limit = perSourceLimit || config.perSourceLimit;

  const [pubmedResult, s2Result, oaResult] = await Promise.allSettled([
    searchPubMed(query, {
      maxResults: limit,
      yearStart: config.yearStart,
      yearEnd: config.yearEnd,
    }),
    searchSemanticScholar(query, {
      limit,
      yearStart: config.yearStart,
      yearEnd: config.yearEnd,
    }),
    searchOpenAlex(query, {
      limit,
      yearStart: config.yearStart,
      yearEnd: config.yearEnd,
    }),
  ]);

  const results: UnifiedSearchResult[] = [];

  if (pubmedResult.status === "fulfilled") {
    results.push(...pubmedResult.value.results);
  }
  if (s2Result.status === "fulfilled") {
    results.push(...s2Result.value.results);
  }
  if (oaResult.status === "fulfilled") {
    results.push(...oaResult.value.results);
  }

  return results;
}

// ── Round 1: Execute Exploration Tree ─────────────────────────────────

/**
 * Execute searches for all pending nodes in the exploration tree.
 * Processes in batches of 3 with 500ms pause between batches.
 */
async function executeResearch(
  tree: ExplorationTree,
  config: ResearchConfig,
  onProgress?: ResearchProgressCallback
): Promise<void> {
  const pendingNodes = tree.root.children.filter((n) => n.status === "pending");

  onProgress?.("searching", `Round 1: Searching ${pendingNodes.length} queries across 3 databases...`);

  const batchSize = 3;

  for (let i = 0; i < pendingNodes.length; i += batchSize) {
    const batch = pendingNodes.slice(i, i + batchSize);

    const batchPromises = batch.map(async (node) => {
      node.status = "searching";
      try {
        node.results = await searchAllSources(node.query, config);
        node.status = "complete";
      } catch (error) {
        console.error(`[DeepResearch] Search failed for node ${node.id}:`, error);
        node.status = "failed";
      }
    });

    await Promise.all(batchPromises);

    const processed = Math.min(i + batchSize, pendingNodes.length);
    const totalResults = pendingNodes
      .filter((n) => n.status === "complete")
      .reduce((sum, n) => sum + n.results.length, 0);

    onProgress?.(
      "searching",
      `Round 1: ${processed}/${pendingNodes.length} queries searched (${totalResults} papers found)`
    );

    if (i + batchSize < pendingNodes.length) {
      await sleep(500);
    }
  }
}

// ── Round 2 & 3: AI-Guided Follow-up Searches ────────────────────────

/**
 * Analyze initial findings and generate follow-up search queries using AI.
 */
async function generateFollowUpQueries(
  topic: string,
  existingResults: UnifiedSearchResult[],
  round: number
): Promise<string[]> {
  const topPapers = existingResults
    .sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0))
    .slice(0, 20)
    .map((p) => `- "${p.title}" (${p.year}) [${p.citationCount} citations] ${p.studyType || ""}`)
    .join("\n");

  try {
    const { text } = await generateText({
      model: getSmallModel(),
      system: `You are a research librarian helping to deepen a literature search. Given a topic and initial findings, identify gaps and generate targeted follow-up search queries.

Focus on:
- Key clinical trials or landmark studies that may be missing
- Specific author names who are leaders in this field
- Drug names, intervention types, or specific methodologies
- Sub-populations or sub-topics that need more coverage
- Recent developments or emerging evidence

Return a JSON array of 3-6 search query strings. Each query should be specific and different from what was already searched.`,
      prompt: `Research topic: "${topic}"

Round ${round} analysis. Current findings (${existingResults.length} papers):
${topPapers}

What specific follow-up searches would deepen this research? Return as JSON array of search query strings.`,
      maxOutputTokens: 1000,
    });

    let jsonStr = text.trim();
    const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      jsonStr = codeBlockMatch[1].trim();
    }

    const queries: string[] = JSON.parse(jsonStr);
    return Array.isArray(queries) ? queries.slice(0, 6) : [];
  } catch (error) {
    console.error(`[DeepResearch] Failed to generate follow-up queries (round ${round}):`, error);
    return [];
  }
}

/**
 * Run a follow-up search round with AI-generated queries.
 */
async function executeFollowUpRound(
  topic: string,
  existingResults: UnifiedSearchResult[],
  config: ResearchConfig,
  round: number,
  onProgress?: ResearchProgressCallback
): Promise<UnifiedSearchResult[]> {
  const stage = round === 2 ? "search-round-2" as const : "search-round-3" as const;
  onProgress?.(stage, `Analyzing gaps and generating follow-up queries (round ${round})...`);

  const followUpQueries = await generateFollowUpQueries(topic, existingResults, round);

  if (followUpQueries.length === 0) {
    onProgress?.(stage, `Round ${round}: No additional queries needed`);
    return [];
  }

  onProgress?.(stage, `Round ${round}: Running ${followUpQueries.length} follow-up searches...`);

  const allNewResults: UnifiedSearchResult[] = [];
  const batchSize = 3;

  for (let i = 0; i < followUpQueries.length; i += batchSize) {
    const batch = followUpQueries.slice(i, i + batchSize);

    const batchPromises = batch.map((query) =>
      searchAllSources(query, config, Math.min(config.perSourceLimit, 10))
    );

    const batchResults = await Promise.allSettled(batchPromises);
    for (const result of batchResults) {
      if (result.status === "fulfilled") {
        allNewResults.push(...result.value);
      }
    }

    const processed = Math.min(i + batchSize, followUpQueries.length);
    onProgress?.(
      stage,
      `Round ${round}: ${processed}/${followUpQueries.length} queries completed (${allNewResults.length} new papers)`
    );

    if (i + batchSize < followUpQueries.length) {
      await sleep(500);
    }
  }

  return allNewResults;
}

// ── Unpaywall Lookup ──────────────────────────────────────────────────

async function lookupFullTextAccess(
  papers: UnifiedSearchResult[],
  onProgress?: ResearchProgressCallback
): Promise<Map<string, { pdfUrl: string | null; isOpenAccess: boolean }>> {
  const doisToLookup = papers
    .filter((p) => p.doi)
    .map((p) => p.doi!)
    .slice(0, 100);

  if (doisToLookup.length === 0) {
    return new Map();
  }

  onProgress?.("unpaywall-lookup", `Looking up full-text access for ${doisToLookup.length} papers...`);

  try {
    const results = await batchLookupUnpaywall(doisToLookup);
    const oaCount = Array.from(results.values()).filter((r) => r.isOpenAccess).length;
    onProgress?.(
      "unpaywall-lookup",
      `Unpaywall: ${oaCount}/${doisToLookup.length} papers have open access`
    );
    return results;
  } catch (error) {
    console.warn("[DeepResearch] Unpaywall lookup failed:", error);
    return new Map();
  }
}

// ── Paper Enhancement ─────────────────────────────────────────────────

/**
 * Track which perspective found each paper.
 */
function buildPerspectiveMap(
  tree: ExplorationTree
): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>();

  for (const node of tree.root.children) {
    if (!node.perspectiveId) continue;
    for (const result of node.results) {
      const key = result.doi || result.pmid || result.s2Id || result.title;
      if (!map.has(key)) {
        map.set(key, new Set());
      }
      map.get(key)!.add(node.perspectiveId);
    }
  }

  return map;
}

function getPaperKey(paper: UnifiedSearchResult): string {
  return paper.doi || paper.pmid || paper.s2Id || paper.title.slice(0, 50);
}

/**
 * Convert UnifiedSearchResult papers to EnhancedPaper format.
 */
function enhancePapers(
  papers: UnifiedSearchResult[],
  perspectiveMap: Map<string, Set<string>>,
  extractedData: Map<string, ExtractedPaperData>,
  unpaywallData: Map<string, { pdfUrl: string | null; isOpenAccess: boolean }>,
  fullTextMap?: Map<string, string>
): EnhancedPaper[] {
  return papers.map((paper) => {
    const key = getPaperKey(paper);
    const perspectiveIds = perspectiveMap.has(key)
      ? Array.from(perspectiveMap.get(key)!)
      : [];

    const extraction = extractedData.get(key);
    const unpaywall = paper.doi ? unpaywallData.get(paper.doi) : undefined;

    return {
      ...paper,
      perspectiveIds,
      extractedData: extraction,
      fullText: fullTextMap?.get(key),
      fullTextUrl: unpaywall?.pdfUrl || paper.openAccessPdfUrl || undefined,
      isOpenAccess: unpaywall?.isOpenAccess || paper.isOpenAccess,
    };
  });
}

// ── Utility ───────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Main Pipeline ─────────────────────────────────────────────────────

/**
 * Run the full deep research pipeline.
 */
export async function runDeepResearch(
  topic: string,
  modeOrConfig?: ResearchMode | Partial<ResearchConfig>,
  onProgress?: ResearchProgressCallback,
  onPerspectives?: (perspectives: Perspective[]) => void,
  suppliedPerspectives?: Perspective[]
): Promise<DeepResearchResult> {
  const startTime = Date.now();

  // ── Step 1: Validate ──────────────────────────────────────────────
  onProgress?.("validating", "Validating research topic...");
  const validation = validateTopic(topic);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // ── Resolve config ────────────────────────────────────────────────
  let resolvedConfig: ResearchConfig;
  if (typeof modeOrConfig === "string") {
    resolvedConfig = buildConfig(modeOrConfig);
  } else {
    const mode: ResearchMode = modeOrConfig?.mode || "standard";
    resolvedConfig = buildConfig(mode, modeOrConfig);
  }

  // ── Step 2: Generate or use supplied perspectives ─────────────────
  let perspectives: Perspective[];
  if (suppliedPerspectives && suppliedPerspectives.length > 0) {
    perspectives = suppliedPerspectives;
    onProgress?.("generating-perspectives", `Using ${perspectives.length} user-confirmed perspectives`);
  } else {
    onProgress?.("generating-perspectives", "Generating research perspectives...");
    perspectives = await generatePerspectives(topic, resolvedConfig);
    onProgress?.("generating-perspectives", `Generated ${perspectives.length} perspectives`);
  }

  // Emit perspectives to the client (useful for the legacy single-endpoint flow)
  onPerspectives?.(perspectives);

  // ── Step 3: Build exploration tree ────────────────────────────────
  onProgress?.("building-tree", "Building exploration tree...");
  const tree = buildExplorationTree(topic, perspectives);

  // ── Step 4: Round 1 search ────────────────────────────────────────
  await executeResearch(tree, resolvedConfig, onProgress);

  // Collect Round 1 results
  let allResults: UnifiedSearchResult[] = [];
  const perspectiveMap = buildPerspectiveMap(tree);

  for (const node of tree.root.children) {
    allResults.push(...node.results);
  }

  let searchRounds = 1;

  // ── Step 5: Citation graph traversal ──────────────────────────────
  let citationTraversalCount = 0;
  try {
    const dedupedRound1 = deduplicateResults(allResults);
    const seedPapers = selectTopPapers(
      dedupedRound1,
      resolvedConfig.mode === "quick" ? 5 : 10
    );

    if (seedPapers.length > 0) {
      const citationResults = await traverseCitationGraph(seedPapers, onProgress);
      citationTraversalCount = citationResults.length;
      allResults.push(...citationResults);
    }
  } catch (error) {
    console.warn("[DeepResearch] Citation traversal failed, continuing:", error);
    onProgress?.("citation-traversal", "Citation traversal failed — continuing without it");
  }

  // ── Step 6: Round 2 search (AI-guided follow-up) ──────────────────
  if (resolvedConfig.depth >= 2) {
    const round2Results = await executeFollowUpRound(
      topic,
      deduplicateResults(allResults),
      resolvedConfig,
      2,
      onProgress
    );
    allResults.push(...round2Results);
    searchRounds = 2;
  }

  // ── Step 7: Round 3 search (deep/exhaustive only) ─────────────────
  if (resolvedConfig.depth >= 3) {
    const round3Results = await executeFollowUpRound(
      topic,
      deduplicateResults(allResults),
      resolvedConfig,
      3,
      onProgress
    );
    allResults.push(...round3Results);
    searchRounds = 3;
  }

  // ── Step 8: Deduplicate ───────────────────────────────────────────
  onProgress?.("deduplicating", `Deduplicating ${allResults.length} results...`);
  const deduplicated = deduplicateResults(allResults);
  onProgress?.(
    "deduplicating",
    `Deduplication: ${allResults.length} → ${deduplicated.length} unique papers`
  );

  // ── Step 9: Unpaywall lookup ──────────────────────────────────────
  const unpaywallData = await lookupFullTextAccess(deduplicated, onProgress);

  // ── Step 9.5: Full-text extraction (before data extraction) ──────
  // Build temporary enhanced papers with fullTextUrl so the extractor can fetch PDFs.
  // We do this before full enhancePapers() because we need fullText populated first.
  const papersWithUrls: EnhancedPaper[] = deduplicated.map((paper) => {
    const unpaywall = paper.doi ? unpaywallData.get(paper.doi) : undefined;
    return {
      ...paper,
      perspectiveIds: [],
      fullTextUrl: unpaywall?.pdfUrl || paper.openAccessPdfUrl || undefined,
      isOpenAccess: unpaywall?.isOpenAccess || paper.isOpenAccess,
    };
  });

  const fullTextTopN = resolvedConfig.mode === "quick" ? 5 :
    resolvedConfig.mode === "standard" ? 10 : 20;
  const fullTextResults = await extractFullTexts(papersWithUrls, onProgress, fullTextTopN);

  // Build a map of DOI/title → fullText so enhancePapers can pick it up
  const fullTextMap = new Map<string, string>();
  for (const paper of papersWithUrls) {
    if (paper.fullText) {
      const key = paper.doi || paper.pmid || paper.s2Id || paper.title.slice(0, 50);
      fullTextMap.set(key, paper.fullText);
    }
  }

  // ── Step 10: Structured data extraction ───────────────────────────
  const papersForExtraction = deduplicated
    .filter((p) => p.abstract)
    .sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0))
    .slice(0, resolvedConfig.mode === "quick" ? 10 : resolvedConfig.mode === "standard" ? 20 : 40);

  const extractedData = await extractStructuredData(papersForExtraction, onProgress);

  // ── Step 11: Enhance papers ───────────────────────────────────────
  const enhancedPapers = enhancePapers(
    deduplicated,
    perspectiveMap,
    extractedData,
    unpaywallData,
    fullTextMap
  );

  // ── Step 12: Synthesize via multi-pass pipeline ───────────────────
  onProgress?.("synthesizing", `Synthesizing findings from ${enhancedPapers.length} papers...`);

  const synthesisProgress: import("./types").SynthesisProgressCallback = (stage, message) => {
    // Bridge synthesis progress to research progress
    onProgress?.(stage as import("./types").ResearchStage, message);
  };

  const report = await synthesizeFindings(
    topic,
    resolvedConfig,
    perspectives,
    enhancedPapers,
    synthesisProgress
  );

  // ── Build result ──────────────────────────────────────────────────
  const durationMs = Date.now() - startTime;

  onProgress?.("complete", `Research complete: ${enhancedPapers.length} papers, ${searchRounds} rounds, ${Math.round(durationMs / 1000)}s`);

  return {
    report,
    sources: enhancedPapers,
    searchRounds,
    citationTraversalPapers: citationTraversalCount,
    extractedDataCount: extractedData.size,
    durationMs,
  };
}
