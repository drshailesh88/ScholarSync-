/**
 * POST /api/feeds/copilot/related
 *
 * Find papers related to a feed article using Semantic Scholar
 * recommendations with PubMed fallback.
 */
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { findRelatedPapers } from "@/lib/feeds/find-related";
import { z } from "zod";

const inputSchema = z.object({
  title: z.string().min(1),
  doi: z.string().nullable(),
  pubmedId: z.string().nullable(),
  limit: z.number().int().min(1).max(20).optional().default(8),
});

export async function POST(req: NextRequest) {
  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const rateLimitResponse = await checkRateLimit(userId, "research", RATE_LIMITS.ai);
    if (rateLimitResponse) return rateLimitResponse;

    const body = await req.json();
    const parsed = inputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await findRelatedPapers(
      { title: parsed.data.title, doi: parsed.data.doi, pubmedId: parsed.data.pubmedId },
      parsed.data.limit
    );

    return NextResponse.json({
      papers: result.papers.map((p) => ({
        title: p.title,
        authors: p.authors,
        journal: p.journal,
        year: p.year,
        doi: p.doi || null,
        pmid: p.pmid || null,
        abstract: p.abstract || null,
        citationCount: p.citationCount,
        isOpenAccess: p.isOpenAccess,
        openAccessPdfUrl: p.openAccessPdfUrl || null,
      })),
      source: result.source,
      sourceMessage: result.sourceMessage,
    });
  } catch (error) {
    console.error("Find related papers error:", error);
    return NextResponse.json(
      { error: "Failed to find related papers" },
      { status: 500 }
    );
  }
}
