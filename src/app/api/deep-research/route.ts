/**
 * Deep Research API Route.
 *
 * POST /api/deep-research
 *
 * Accepts a research topic and optional configuration, runs the full
 * deep research pipeline, and streams progress events via SSE.
 *
 * SSE event types:
 *   - progress: { stage, message }
 *   - report:   { markdownReport, sources, ...metadata }
 *   - error:    { message }
 *   - done:     {}
 */

import { NextRequest } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { runDeepResearch } from "@/lib/deep-research/engine";
import type { ResearchConfig, ResearchStage } from "@/lib/deep-research/types";

export const maxDuration = 300; // 5 minutes max for deep research
export const dynamic = "force-dynamic";

interface DeepResearchRequest {
  topic: string;
  mode?: "quick" | "standard" | "deep" | "exhaustive";
  config?: Partial<ResearchConfig>;
}

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

  // ── Parse request ───────────────────────────────────────────────────
  let body: DeepResearchRequest;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { topic, mode, config } = body;

  if (!topic || typeof topic !== "string") {
    return new Response(JSON.stringify({ error: "topic is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ── SSE stream setup ───────────────────────────────────────────────
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      function sendEvent(event: string, data: unknown) {
        try {
          const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(encoder.encode(payload));
        } catch {
          // Controller may be closed if client disconnected
        }
      }

      // Progress callback for the research engine
      const onProgress = (stage: ResearchStage, message: string) => {
        sendEvent("progress", { stage, message });
      };

      try {
        // Merge mode into config
        const resolvedConfig: Partial<ResearchConfig> = {
          ...config,
          ...(mode ? { mode } : {}),
        };

        // Run the full research pipeline
        const result = await runDeepResearch(topic, resolvedConfig, onProgress);

        // Send the full report — no truncation of sources, abstracts, or authors
        sendEvent("report", {
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
        });

        sendEvent("done", {});
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Deep research failed";
        console.error("[DeepResearch API] Error:", error);
        sendEvent("error", { message });
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
