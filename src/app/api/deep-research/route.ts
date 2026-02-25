/**
 * Deep Research API — SSE streaming endpoint.
 *
 * POST /api/deep-research
 * Body: { topic: string, mode?: ResearchMode, config?: Partial<ResearchConfig> }
 *
 * Returns a Server-Sent Events stream with real-time research progress,
 * culminating in a full synthesis report.
 */

import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { runDeepResearch } from "@/lib/deep-research/engine";
import { buildConfig } from "@/lib/deep-research/types";
import type { ResearchMode, ResearchConfig, ResearchProgress } from "@/lib/deep-research/types";

interface RequestBody {
  topic: string;
  mode?: ResearchMode;
  config?: Partial<ResearchConfig>;
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: RequestBody = await request.json();
    const { topic, mode = "standard" } = body;

    if (!topic?.trim()) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    if (topic.trim().length < 5) {
      return NextResponse.json(
        { error: "Topic must be at least 5 characters" },
        { status: 400 }
      );
    }

    const config = buildConfig(mode, body.config);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const sendEvent = (event: string, data: unknown) => {
          const message = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(encoder.encode(message));
        };

        try {
          const report = await runDeepResearch(
            topic.trim(),
            config,
            (progress: ResearchProgress) => {
              sendEvent("progress", progress);
            }
          );

          // Send the final report
          sendEvent("report", {
            topic: report.topic,
            mode: report.mode,
            summary: report.summary,
            keyFindings: report.keyFindings,
            perspectives: report.perspectives,
            gaps: report.gaps,
            contradictions: report.contradictions,
            totalSources: report.totalSources,
            sources: report.sources.slice(0, 50).map((s) => ({
              title: s.title,
              authors: s.authors.slice(0, 5),
              journal: s.journal,
              year: s.year,
              doi: s.doi,
              pmid: s.pmid,
              citationCount: s.citationCount,
              evidenceLevel: s.evidenceLevel,
              isOpenAccess: s.isOpenAccess,
              abstract: s.abstract?.slice(0, 300),
            })),
          });

          sendEvent("done", { success: true });
        } catch (error) {
          const message =
            error instanceof Error ? error.message : "Research failed";
          console.error("Deep research error:", error);
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
  } catch (error) {
    console.error("Deep research API error:", error);
    return NextResponse.json(
      { error: "Failed to start research" },
      { status: 500 }
    );
  }
}
