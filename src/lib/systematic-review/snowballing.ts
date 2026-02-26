/**
 * Citation Snowballing Engine for Systematic Reviews
 *
 * Discovers new papers by traversing forward citations (papers that cite
 * included studies) and backward references (papers cited by included studies)
 * using the Semantic Scholar API via the existing citation-traversal module.
 *
 * Persists sessions to `snowball_sessions` and citation edges to `citation_graph`.
 */

import { db } from "@/lib/db";
import {
  papers,
  projectPapers,
  citationGraph,
  snowballSessions,
} from "@/lib/db/schema";
import { eq, and, inArray } from "drizzle-orm";
import { normalizeTitle } from "@/lib/search/dedup";
import type { UnifiedSearchResult } from "@/types/search";

// Re-use existing S2 traversal helpers (fetchCitations / fetchReferences)
// We re-implement the fetchers here to have control over direction + depth,
// but reuse the same API endpoint and mapping logic.

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type SnowballDirection = "forward" | "backward" | "both";

export interface SnowballResult {
  sessionIds: number[];
  totalDiscovered: number;
  newPapersAdded: number;
  duplicatesSkipped: number;
  papers: Array<{
    paperId: number;
    title: string;
    direction: "forward" | "backward";
    seedPaperTitle: string;
  }>;
}

interface S2CitationPaper {
  paperId: string;
  title: string | null;
  authors: { name: string }[] | null;
  year: number | null;
  abstract: string | null;
  citationCount: number | null;
  journal: { name: string } | null;
  externalIds: { DOI?: string; PubMed?: string } | null;
  isOpenAccess: boolean | null;
}

interface S2CitationEntry {
  citingPaper?: S2CitationPaper;
  citedPaper?: S2CitationPaper;
}

const CITATION_FIELDS =
  "title,authors,year,abstract,citationCount,journal,externalIds,isOpenAccess";

// ---------------------------------------------------------------------------
// S2 API helpers
// ---------------------------------------------------------------------------

function getS2Headers(): Record<string, string> {
  const headers: Record<string, string> = {};
  if (process.env.SEMANTIC_SCHOLAR_API_KEY) {
    headers["x-api-key"] = process.env.SEMANTIC_SCHOLAR_API_KEY;
  }
  return headers;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function mapS2Paper(paper: S2CitationPaper): UnifiedSearchResult | null {
  if (!paper.title || !paper.paperId) return null;
  return {
    title: paper.title,
    authors: paper.authors?.map((a) => a.name) || [],
    journal: paper.journal?.name || "",
    year: paper.year || 0,
    doi: paper.externalIds?.DOI || undefined,
    pmid: paper.externalIds?.PubMed || undefined,
    s2Id: paper.paperId,
    abstract: paper.abstract || undefined,
    citationCount: paper.citationCount || 0,
    isOpenAccess: paper.isOpenAccess || false,
    publicationTypes: [],
    sources: ["semantic_scholar"],
  };
}

async function fetchForwardCitations(
  s2Id: string,
  limit: number = 50
): Promise<UnifiedSearchResult[]> {
  const url = `https://api.semanticscholar.org/graph/v1/paper/${encodeURIComponent(s2Id)}/citations?fields=${CITATION_FIELDS}&limit=${limit}`;
  try {
    const res = await fetch(url, {
      headers: getS2Headers(),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return [];
    const data: { data: S2CitationEntry[] } = await res.json();
    return (data.data || [])
      .map((e) => (e.citingPaper ? mapS2Paper(e.citingPaper) : null))
      .filter((r): r is UnifiedSearchResult => r !== null);
  } catch {
    return [];
  }
}

async function fetchBackwardReferences(
  s2Id: string,
  limit: number = 50
): Promise<UnifiedSearchResult[]> {
  const url = `https://api.semanticscholar.org/graph/v1/paper/${encodeURIComponent(s2Id)}/references?fields=${CITATION_FIELDS}&limit=${limit}`;
  try {
    const res = await fetch(url, {
      headers: getS2Headers(),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return [];
    const data: { data: S2CitationEntry[] } = await res.json();
    return (data.data || [])
      .map((e) => (e.citedPaper ? mapS2Paper(e.citedPaper) : null))
      .filter((r): r is UnifiedSearchResult => r !== null);
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Core snowball engine
// ---------------------------------------------------------------------------

/**
 * Run citation snowballing for a set of seed papers within a project.
 *
 * For each seed paper:
 * 1. Creates a snowball session record
 * 2. Fetches citations/references from Semantic Scholar
 * 3. Deduplicates against existing project papers
 * 4. Creates new paper records and links them to the project
 * 5. Records citation edges in the citation_graph table
 */
export async function runSnowballing(
  projectId: number,
  seedPaperIds: number[],
  direction: SnowballDirection = "both",
  depth: number = 1
): Promise<SnowballResult> {
  // 1. Load seed papers to get S2 IDs
  const seedPapers = await db
    .select({
      id: papers.id,
      title: papers.title,
      s2Id: papers.semantic_scholar_id,
      doi: papers.doi,
    })
    .from(papers)
    .where(inArray(papers.id, seedPaperIds));

  // 2. Get existing project papers to avoid duplicates
  const existingPPs = await db
    .select({ paperId: projectPapers.paper_id })
    .from(projectPapers)
    .where(eq(projectPapers.project_id, projectId));
  const existingPaperIds = new Set(existingPPs.map((pp) => pp.paperId));

  const result: SnowballResult = {
    sessionIds: [],
    totalDiscovered: 0,
    newPapersAdded: 0,
    duplicatesSkipped: 0,
    papers: [],
  };

  // 3. Process each seed paper
  for (const seed of seedPapers) {
    // Need an S2 ID to query the API; try DOI fallback
    const s2Identifier = seed.s2Id || (seed.doi ? `DOI:${seed.doi}` : null);
    if (!s2Identifier) continue;

    // Create snowball session
    const [session] = await db
      .insert(snowballSessions)
      .values({
        project_id: projectId,
        seed_paper_id: seed.id,
        direction,
        depth,
        status: "running",
      })
      .returning();

    result.sessionIds.push(session.id);

    let discovered: Array<{
      paper: UnifiedSearchResult;
      dir: "forward" | "backward";
    }> = [];

    // Depth-1 traversal (depth-2 would recurse, kept simple for now)
    for (let d = 0; d < depth; d++) {
      const papersToTraverse =
        d === 0
          ? [s2Identifier]
          : discovered
              .filter((p) => p.paper.s2Id)
              .slice(0, 10) // limit depth-2 to top 10
              .map((p) => p.paper.s2Id!);

      for (const traverseId of papersToTraverse) {
        if (direction === "forward" || direction === "both") {
          const citations = await fetchForwardCitations(traverseId);
          discovered.push(
            ...citations.map((p) => ({
              paper: p,
              dir: "forward" as const,
            }))
          );
        }

        if (direction === "backward" || direction === "both") {
          const references = await fetchBackwardReferences(traverseId);
          discovered.push(
            ...references.map((p) => ({
              paper: p,
              dir: "backward" as const,
            }))
          );
        }

        // Rate limiting between papers
        await sleep(300);
      }
    }

    result.totalDiscovered += discovered.length;

    // 4. Dedup discovered papers and import new ones
    const seenS2Ids = new Set<string>();
    let sessionPapersFound = 0;

    for (const { paper, dir } of discovered) {
      // Skip duplicates within this batch
      if (paper.s2Id && seenS2Ids.has(paper.s2Id)) continue;
      if (paper.s2Id) seenS2Ids.add(paper.s2Id);

      const paperId = await findOrCreatePaperForSnowball(paper);

      // Record citation edge
      const citingId = dir === "forward" ? paperId : seed.id;
      const citedId = dir === "forward" ? seed.id : paperId;
      await db
        .insert(citationGraph)
        .values({
          citing_paper_id: citingId,
          cited_paper_id: citedId,
          discovered_via:
            dir === "forward" ? "forward_snowball" : "backward_snowball",
        })
        .onConflictDoNothing();

      // Skip if already in project
      if (existingPaperIds.has(paperId)) {
        result.duplicatesSkipped++;
        continue;
      }

      // Link to project
      await db
        .insert(projectPapers)
        .values({
          project_id: projectId,
          paper_id: paperId,
          added_by: "snowball",
          status: "saved",
        })
        .onConflictDoNothing();

      existingPaperIds.add(paperId);
      sessionPapersFound++;

      result.newPapersAdded++;
      result.papers.push({
        paperId,
        title: paper.title,
        direction: dir,
        seedPaperTitle: seed.title,
      });
    }

    // 5. Update session
    await db
      .update(snowballSessions)
      .set({
        papers_found: sessionPapersFound,
        status: "completed",
        completed_at: new Date(),
      })
      .where(eq(snowballSessions.id, session.id));
  }

  return result;
}

// ---------------------------------------------------------------------------
// Find or create paper (same logic as paper-import.ts)
// ---------------------------------------------------------------------------

async function findOrCreatePaperForSnowball(
  result: UnifiedSearchResult
): Promise<number> {
  // Check by DOI
  if (result.doi) {
    const [existing] = await db
      .select({ id: papers.id })
      .from(papers)
      .where(eq(papers.doi, result.doi));
    if (existing) return existing.id;
  }

  // Check by PMID
  if (result.pmid) {
    const [existing] = await db
      .select({ id: papers.id })
      .from(papers)
      .where(eq(papers.pubmed_id, result.pmid));
    if (existing) return existing.id;
  }

  // Check by S2 ID
  if (result.s2Id) {
    const [existing] = await db
      .select({ id: papers.id })
      .from(papers)
      .where(eq(papers.semantic_scholar_id, result.s2Id));
    if (existing) return existing.id;
  }

  // Check by normalized title + year
  if (result.title && result.year) {
    const normalized = normalizeTitle(result.title);
    const candidates = await db
      .select({ id: papers.id, title: papers.title })
      .from(papers)
      .where(eq(papers.year, result.year))
      .limit(100);

    for (const candidate of candidates) {
      if (normalizeTitle(candidate.title) === normalized) {
        return candidate.id;
      }
    }
  }

  // Create new paper
  const [newPaper] = await db
    .insert(papers)
    .values({
      title: result.title,
      authors: result.authors || [],
      journal: result.journal,
      year: result.year,
      doi: result.doi || undefined,
      pubmed_id: result.pmid || undefined,
      semantic_scholar_id: result.s2Id || undefined,
      abstract: result.abstract,
      source: "semantic_scholar",
      citation_count: result.citationCount || 0,
      open_access: result.isOpenAccess,
      publication_types: result.publicationTypes || [],
    })
    .returning();

  return newPaper.id;
}

// ---------------------------------------------------------------------------
// Get snowball sessions for a project
// ---------------------------------------------------------------------------

export async function getSnowballSessions(projectId: number) {
  return db
    .select({
      id: snowballSessions.id,
      seedPaperId: snowballSessions.seed_paper_id,
      seedPaperTitle: papers.title,
      direction: snowballSessions.direction,
      depth: snowballSessions.depth,
      papersFound: snowballSessions.papers_found,
      status: snowballSessions.status,
      startedAt: snowballSessions.started_at,
      completedAt: snowballSessions.completed_at,
    })
    .from(snowballSessions)
    .innerJoin(papers, eq(snowballSessions.seed_paper_id, papers.id))
    .where(eq(snowballSessions.project_id, projectId))
    .orderBy(snowballSessions.started_at);
}

// ---------------------------------------------------------------------------
// Get citation network edges for project papers
// ---------------------------------------------------------------------------

export async function getProjectCitationNetwork(projectId: number) {
  // Get all paper IDs in the project
  const ppRows = await db
    .select({ paperId: projectPapers.paper_id })
    .from(projectPapers)
    .where(eq(projectPapers.project_id, projectId));

  const paperIds = ppRows.map((r) => r.paperId);
  if (paperIds.length === 0) return { nodes: [], edges: [] };

  // Get citation edges where both papers are in the project
  const edges = await db
    .select({
      citingId: citationGraph.citing_paper_id,
      citedId: citationGraph.cited_paper_id,
      discoveredVia: citationGraph.discovered_via,
    })
    .from(citationGraph)
    .where(
      and(
        inArray(citationGraph.citing_paper_id, paperIds),
        inArray(citationGraph.cited_paper_id, paperIds)
      )
    );

  // Get paper details for nodes
  const nodes = await db
    .select({
      id: papers.id,
      title: papers.title,
      year: papers.year,
      citationCount: papers.citation_count,
      authors: papers.authors,
      addedBy: projectPapers.added_by,
      screeningDecision: projectPapers.screening_decision,
    })
    .from(projectPapers)
    .innerJoin(papers, eq(projectPapers.paper_id, papers.id))
    .where(eq(projectPapers.project_id, projectId));

  return { nodes, edges };
}
