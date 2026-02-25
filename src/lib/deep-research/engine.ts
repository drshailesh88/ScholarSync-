/**
 * Deep Research Engine — core orchestration.
 *
 * Adapted from CursorWriter2. Uses ScholarSync's existing search
 * infrastructure (PubMed, Semantic Scholar, OpenAlex) and dedup logic.
 *
 * Pipeline:
 *   1. Validate topic
 *   2. Generate expert perspectives (AI)
 *   3. Build exploration tree
 *   4. Execute parallel searches per perspective node
 *   5. Deduplicate across all sources
 *   6. Synthesize findings into a report (AI)
 */

import { randomUUID } from "crypto";
import { searchPubMed } from "@/lib/search/sources/pubmed";
import { searchSemanticScholar } from "@/lib/search/sources/semantic-scholar";
import { searchOpenAlex } from "@/lib/search/sources/openalex";
import { deduplicateResults } from "@/lib/search/dedup";
import type { UnifiedSearchResult } from "@/types/search";
import { generatePerspectives } from "./perspectives";
import { synthesizeFindings } from "./synthesis";
import type {
  ResearchConfig,
  ResearchProgress,
  ExplorationTree,
  ExplorationNode,
  Perspective,
  SynthesisReport,
} from "./types";

// ── Topic validation ────────────────────────────────────────────────

export function validateTopic(topic: string): { valid: boolean; reason?: string } {
  const trimmed = topic.trim();
  if (trimmed.length < 5) {
    return { valid: false, reason: "Topic must be at least 5 characters." };
  }
  if (trimmed.length > 500) {
    return { valid: false, reason: "Topic must be under 500 characters." };
  }
  return { valid: true };
}

// ── Exploration tree ────────────────────────────────────────────────

export function buildExplorationTree(
  topic: string,
  perspectives: Perspective[]
): ExplorationTree {
  const nodes = new Map<string, ExplorationNode>();
  const rootId = `root-${randomUUID().slice(0, 8)}`;

  // Root node
  nodes.set(rootId, {
    id: rootId,
    query: topic,
    perspectiveId: "root",
    depth: 0,
    status: "done",
    results: [],
    followUpQueries: [],
  });

  // One node per perspective search query
  for (const perspective of perspectives) {
    for (const query of perspective.searchQueries) {
      const nodeId = `node-${randomUUID().slice(0, 8)}`;
      nodes.set(nodeId, {
        id: nodeId,
        query,
        perspectiveId: perspective.id,
        depth: 1,
        status: "pending",
        results: [],
        followUpQueries: [],
      });
    }
  }

  return {
    rootId,
    topic,
    nodes,
    totalNodes: nodes.size,
    completedNodes: 1, // root is "done"
  };
}

// ── Search execution ────────────────────────────────────────────────

async function searchAllSources(
  query: string,
  config: ResearchConfig,
  perSourceLimit: number
): Promise<UnifiedSearchResult[]> {
  const params = {
    query,
    limit: perSourceLimit,
    yearStart: config.yearStart,
    yearEnd: config.yearEnd,
  };

  const results = await Promise.allSettled([
    searchPubMed(params.query, {
      maxResults: params.limit,
      yearStart: params.yearStart,
      yearEnd: params.yearEnd,
    }),
    searchSemanticScholar(params.query, {
      limit: params.limit,
      yearStart: params.yearStart,
      yearEnd: params.yearEnd,
    }),
    searchOpenAlex(params.query, {
      limit: params.limit,
      yearStart: params.yearStart,
      yearEnd: params.yearEnd,
    }),
  ]);

  const all: UnifiedSearchResult[] = [];
  for (const result of results) {
    if (result.status === "fulfilled" && result.value?.results) {
      all.push(...result.value.results);
    }
  }
  return all;
}

// ── Main execution ──────────────────────────────────────────────────

export async function executeResearch(
  tree: ExplorationTree,
  config: ResearchConfig,
  onProgress?: (progress: ResearchProgress) => void
): Promise<UnifiedSearchResult[]> {
  const allResults: UnifiedSearchResult[] = [];
  const perSourceLimit = Math.max(5, Math.ceil(config.maxSources / 6));
  const pendingNodes = [...tree.nodes.values()].filter(
    (n) => n.status === "pending"
  );

  // Process nodes in batches of 3 (to respect rate limits)
  const batchSize = 3;
  for (let i = 0; i < pendingNodes.length; i += batchSize) {
    const batch = pendingNodes.slice(i, i + batchSize);

    const batchResults = await Promise.allSettled(
      batch.map(async (node) => {
        node.status = "searching";
        try {
          const results = await searchAllSources(node.query, config, perSourceLimit);
          node.results = results;
          node.status = "done";
          tree.completedNodes++;
          return results;
        } catch {
          node.status = "failed";
          tree.completedNodes++;
          return [] as UnifiedSearchResult[];
        }
      })
    );

    for (const result of batchResults) {
      if (result.status === "fulfilled") {
        allResults.push(...result.value);
      }
    }

    // Report progress
    onProgress?.({
      stage: "research",
      message: `Searched ${Math.min(i + batchSize, pendingNodes.length)} of ${pendingNodes.length} queries...`,
      progress: 30 + Math.round(((i + batchSize) / pendingNodes.length) * 50),
      nodesExplored: tree.completedNodes,
      sourcesFound: allResults.length,
    });

    // Brief pause between batches for rate limits
    if (i + batchSize < pendingNodes.length) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  return allResults;
}

// ── Full pipeline ───────────────────────────────────────────────────

export async function runDeepResearch(
  topic: string,
  config: ResearchConfig,
  onProgress?: (progress: ResearchProgress) => void
): Promise<SynthesisReport> {
  // 1. Validate
  const validation = validateTopic(topic);
  if (!validation.valid) {
    throw new Error(validation.reason);
  }

  onProgress?.({
    stage: "initialization",
    message: "Starting deep research session...",
    progress: 0,
  });

  // 2. Generate perspectives
  onProgress?.({
    stage: "perspective-generation",
    message: "Generating expert perspectives...",
    progress: 5,
  });

  const perspectives = await generatePerspectives(topic, config);

  onProgress?.({
    stage: "perspective-generation",
    message: `Generated ${perspectives.length} research perspectives.`,
    progress: 15,
    perspectivesGenerated: perspectives.length,
  });

  // 3. Build exploration tree
  const tree = buildExplorationTree(topic, perspectives);

  onProgress?.({
    stage: "research",
    message: `Exploring ${tree.totalNodes - 1} search queries across databases...`,
    progress: 20,
  });

  // 4. Execute searches
  const allResults = await executeResearch(tree, config, onProgress);

  // 5. Deduplicate
  onProgress?.({
    stage: "deduplication",
    message: `Deduplicating ${allResults.length} results...`,
    progress: 82,
    sourcesFound: allResults.length,
  });

  const deduplicated = deduplicateResults(allResults);

  onProgress?.({
    stage: "deduplication",
    message: `${deduplicated.length} unique papers (${allResults.length - deduplicated.length} duplicates removed).`,
    progress: 85,
    sourcesFound: deduplicated.length,
  });

  // 6. Synthesize
  onProgress?.({
    stage: "synthesis",
    message: "Synthesizing findings into a report...",
    progress: 88,
  });

  const report = await synthesizeFindings(topic, config, perspectives, deduplicated);

  onProgress?.({
    stage: "complete",
    message: "Research complete!",
    progress: 100,
    sourcesFound: deduplicated.length,
    perspectivesGenerated: perspectives.length,
    nodesExplored: tree.completedNodes,
  });

  return report;
}
