import { NextRequest, NextResponse } from "next/server";

interface S2Paper {
  paperId: string;
  title: string;
  year?: number;
  citationCount?: number;
  authors?: { name: string }[];
}

interface CitationNode {
  id: string;
  title: string;
  year: number | null;
  citationCount: number;
  authors: string[];
  type: "seed" | "reference" | "citation";
}

interface CitationEdge {
  source: string;
  target: string;
}

/**
 * Fetch citation network for a given paper from Semantic Scholar API.
 * Returns nodes (papers) and edges (citation relationships).
 */
export async function POST(req: NextRequest) {
  try {
    const { paperId, depth = 1 } = await req.json();

    if (!paperId) {
      return NextResponse.json({ error: "paperId is required" }, { status: 400 });
    }

    const fields = "paperId,title,year,citationCount,authors";
    const S2_BASE = "https://api.semanticscholar.org/graph/v1/paper";
    const headers: Record<string, string> = {};
    if (process.env.SEMANTIC_SCHOLAR_API_KEY) {
      headers["x-api-key"] = process.env.SEMANTIC_SCHOLAR_API_KEY;
    }

    // Fetch the seed paper details
    const seedRes = await fetch(`${S2_BASE}/${paperId}?fields=${fields}`, { headers });
    if (!seedRes.ok) {
      return NextResponse.json({ error: "Paper not found" }, { status: 404 });
    }
    const seedPaper: S2Paper = await seedRes.json();

    const nodes: CitationNode[] = [
      {
        id: seedPaper.paperId,
        title: seedPaper.title,
        year: seedPaper.year ?? null,
        citationCount: seedPaper.citationCount ?? 0,
        authors: seedPaper.authors?.map((a) => a.name) ?? [],
        type: "seed",
      },
    ];
    const edges: CitationEdge[] = [];
    const seen = new Set([seedPaper.paperId]);

    // Fetch references (papers this paper cites)
    const refsRes = await fetch(
      `${S2_BASE}/${paperId}/references?fields=${fields}&limit=20`,
      { headers }
    );
    if (refsRes.ok) {
      const refsData = await refsRes.json();
      for (const ref of refsData.data || []) {
        const p = ref.citedPaper;
        if (!p?.paperId || seen.has(p.paperId)) continue;
        seen.add(p.paperId);
        nodes.push({
          id: p.paperId,
          title: p.title || "Untitled",
          year: p.year ?? null,
          citationCount: p.citationCount ?? 0,
          authors: p.authors?.map((a: { name: string }) => a.name) ?? [],
          type: "reference",
        });
        edges.push({ source: seedPaper.paperId, target: p.paperId });
      }
    }

    // Fetch citations (papers that cite this paper)
    const citsRes = await fetch(
      `${S2_BASE}/${paperId}/citations?fields=${fields}&limit=20`,
      { headers }
    );
    if (citsRes.ok) {
      const citsData = await citsRes.json();
      for (const cit of citsData.data || []) {
        const p = cit.citingPaper;
        if (!p?.paperId || seen.has(p.paperId)) continue;
        seen.add(p.paperId);
        nodes.push({
          id: p.paperId,
          title: p.title || "Untitled",
          year: p.year ?? null,
          citationCount: p.citationCount ?? 0,
          authors: p.authors?.map((a: { name: string }) => a.name) ?? [],
          type: "citation",
        });
        edges.push({ source: p.paperId, target: seedPaper.paperId });
      }
    }

    return NextResponse.json({ nodes, edges, seedId: seedPaper.paperId });
  } catch (error) {
    console.error("Citation network error:", error);
    return NextResponse.json(
      { error: "Failed to fetch citation network" },
      { status: 500 }
    );
  }
}
