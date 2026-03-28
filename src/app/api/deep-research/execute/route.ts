/**
 * Deep Research Execute API Route.
 *
 * POST /api/deep-research/execute
 *
 * Phase 2 of the two-phase deep research flow.
 * Accepts user-confirmed (and possibly edited) perspectives along with
 * topic and mode, then runs the full search + synthesis pipeline.
 *
 * SSE events: same as the main /api/deep-research route
 *   - { type: "progress", stage, message }
 *   - { type: "report", report: {...} }
 *   - { type: "done" }
 *   - { type: "error", error: "..." }
 */

import { NextRequest } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { runDeepResearch } from "@/lib/deep-research/engine";
import { getDomainConfig } from "@/lib/search/domains";
import type {
  ResearchConfig,
  ResearchStage,
  Perspective,
} from "@/lib/deep-research/types";

export const maxDuration = 300; // 5 minutes max for deep research
export const dynamic = "force-dynamic";

// ── Map engine stage IDs to frontend stage IDs ─────────────────────
const STAGE_MAP: Partial<Record<ResearchStage, string>> = {
  validating: "search-round-1",
  "generating-perspectives": "search-round-1",
  "building-tree": "search-round-1",
  searching: "search-round-1",
  "search-round-2": "search-round-2",
  "search-round-3": "search-round-2",
  deduplicating: "full-text-extraction",
  "unpaywall-lookup": "full-text-extraction",
  synthesizing: "synthesis-perspectives",
  complete: "synthesis-critique",
};

function mapStageId(stage: ResearchStage): string {
  return STAGE_MAP[stage] || stage;
}

const planPerspectiveSchema = z.object({
  id: z.string().trim().min(1).optional(),
  name: z.string().trim().min(1, "Perspective name is required"),
  description: z.string().trim().min(1).optional(),
  queries: z.array(z.string().trim().min(1)).min(1, "At least one query is required"),
  expectedPaperTypes: z.array(z.string().trim().min(1)).optional(),
});

const executeRequestSchema = z.object({
  topic: z.string().trim().min(1, "topic is required"),
  mode: z.enum(["quick", "standard", "deep", "exhaustive"]).optional(),
  perspectives: z.array(planPerspectiveSchema).min(1, "perspectives array is required"),
  config: z.record(z.string(), z.unknown()).optional(),
});

type ExecuteRequest = z.infer<typeof executeRequestSchema>;

export async function POST(req: NextRequest) {
  // ── Auth ────────────────────────────────────────────────────────────
  try {
    await getCurrentUserId();
  } catch {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ── parse and validate request ──────────────────────────────────────
  let body: ExecuteRequest;
  try {
    const parseResult = executeRequestSchema.safeParse(await req.json());
    if (!parseResult.success) {
      return new Response(
        JSON.stringify({
          error: "Invalid request body",
          issues: parseResult.error.flatten(),
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    body = parseResult.data;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { topic, mode, perspectives: planPerspectives, config } = body;
  const domainParam = req.nextUrl.searchParams.get("domain");
  const domain = domainParam ? getDomainConfig(domainParam) : undefined;

  // Convert PlanPerspective[] to engine Perspective[] format
  const enginePerspectives: Perspective[] = planPerspectives.map((p, idx) => ({
    id: p.id || `perspective-${idx + 1}`,
    name: p.name,
    description: p.description || p.name,
    searchQueries: p.queries.filter((q) => q.trim().length > 0),
    expectedPaperTypes: p.expectedPaperTypes || [],
  }));

  // ── SSE stream setup ───────────────────────────────────────────────
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      function sendEvent(type: string, data: Record<string, unknown> = {}) {
        try {
          const payload = `data: ${JSON.stringify({ type, ...data })}\n\n`;
          controller.enqueue(encoder.encode(payload));
        } catch {
          // Controller may be closed if client disconnected
        }
      }

      const onProgress = (stage: ResearchStage, message: string) => {
        sendEvent("progress", { stage: mapStageId(stage), message });
      };

      try {
        const resolvedConfig: Partial<ResearchConfig> = {
          ...(config as Partial<ResearchConfig> | undefined),
          ...(mode ? { mode } : {}),
        };

        // Run with pre-supplied perspectives — skips AI perspective generation
        const result = await runDeepResearch(
          topic,
          resolvedConfig,
          onProgress,
          undefined, // no onPerspectives callback needed
          enginePerspectives,
          domain
        );

        // Send the full report
        sendEvent("report", {
          report: {
            markdownReport: result.report.markdownReport,
            topic: result.report.topic,
            mode: result.report.mode,
            summary: result.report.summary,
            keyFindings: result.report.keyFindings,
            gaps: result.report.gaps,
            contradictions: result.report.contradictions,
            totalSources: result.report.totalSources,
            searchRounds: result.searchRounds,
            citationTraversalPapers: result.citationTraversalPapers,
            extractedDataCount: result.extractedDataCount,
            durationMs: result.durationMs,
            perspectives: result.report.perspectives,
            perspectiveSections: result.report.perspectiveSections,
            sources: result.sources.map((paper) => ({
              title: paper.title,
              authors: paper.authors,
              journal: paper.journal,
              year: paper.year,
              doi: paper.doi,
              pmid: paper.pmid,
              s2Id: paper.s2Id,
              abstract: paper.abstract,
              citationCount: paper.citationCount,
              studyType: paper.studyType,
              evidenceLevel: paper.evidenceLevel,
              isOpenAccess: paper.isOpenAccess,
              openAccessPdfUrl: paper.openAccessPdfUrl,
              fullTextUrl: paper.fullTextUrl,
              perspectiveIds: paper.perspectiveIds,
              extractedData: paper.extractedData,
              sources: paper.sources,
            })),
          },
        });

        sendEvent("done");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Deep research failed";
        console.error("[DeepResearch Execute] Error:", error);
        sendEvent("error", { error: message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
