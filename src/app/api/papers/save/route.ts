import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { savePaper } from "@/lib/actions/papers";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

const paperSchema = z.object({
  title: z.string().min(1),
  authors: z.array(z.string()).optional().default([]),
  journal: z.string().nullable().optional(),
  year: z.number().int().nullable().optional(),
  doi: z.string().nullable().optional(),
  pmid: z.string().nullable().optional(),
  s2Id: z.string().nullable().optional(),
  abstract: z.string().nullable().optional(),
  source: z.enum(["semantic_scholar", "pubmed"]),
  citationCount: z.number().int().min(0).optional().default(0),
  influentialCitationCount: z.number().int().min(0).nullable().optional(),
  referenceCount: z.number().int().min(0).nullable().optional(),
  publicationTypes: z.array(z.string()).optional().default([]),
  fieldsOfStudy: z.array(z.string()).optional().default([]),
  studyType: z.string().nullable().optional(),
  evidenceLevel: z.string().nullable().optional(),
  openAccessPdfUrl: z.string().nullable().optional(),
});

const requestSchema = z.object({
  paper: paperSchema,
});

export async function POST(req: NextRequest) {
  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const rateLimitResponse = await checkRateLimit(
      userId,
      "papers-save",
      RATE_LIMITS.write
    );
    if (rateLimitResponse) return rateLimitResponse;

    const parsed = requestSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid paper payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { paper } = parsed.data;
    const paperId = await savePaper({
      title: paper.title,
      authors: paper.authors,
      journal: paper.journal ?? undefined,
      year: paper.year ?? undefined,
      doi: paper.doi ?? undefined,
      abstract: paper.abstract ?? undefined,
      source: paper.source,
      pubmed_id: paper.pmid ?? undefined,
      semantic_scholar_id: paper.s2Id ?? undefined,
      citation_count: paper.citationCount,
      publication_types: paper.publicationTypes,
      fields_of_study: paper.fieldsOfStudy,
      study_type: paper.studyType ?? undefined,
      evidence_level: paper.evidenceLevel ?? undefined,
      open_access_url: paper.openAccessPdfUrl ?? undefined,
      influential_citation_count: paper.influentialCitationCount ?? undefined,
      reference_count: paper.referenceCount ?? undefined,
    });

    return NextResponse.json({ paperId });
  } catch (error) {
    console.error("POST /api/papers/save error", error);
    return NextResponse.json(
      { error: "Failed to save paper" },
      { status: 500 }
    );
  }
}
