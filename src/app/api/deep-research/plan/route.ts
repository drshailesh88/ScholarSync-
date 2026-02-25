/**
 * Deep Research Plan API Route.
 *
 * POST /api/deep-research/plan
 *
 * Phase 1 of the two-phase deep research flow.
 * Generates research perspectives for a topic via SSE, then closes.
 * The client shows the plan for user editing before executing.
 *
 * SSE events:
 *   - { type: "progress", stage, message }
 *   - { type: "perspectives", perspectives: [...] }
 *   - { type: "done" }
 *   - { type: "error", error: "..." }
 */

import { NextRequest } from "next/server";
import { getCurrentUserId } from "@/lib/auth";
import { validateTopic } from "@/lib/deep-research/engine";
import { generatePerspectives } from "@/lib/deep-research/perspectives";
import { buildConfig } from "@/lib/deep-research/types";
import type { ResearchMode } from "@/lib/deep-research/types";

export const maxDuration = 30; // Perspective generation is fast
export const dynamic = "force-dynamic";

interface PlanRequest {
  topic: string;
  mode?: ResearchMode;
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
  let body: PlanRequest;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { topic, mode = "standard" } = body;

  if (!topic || typeof topic !== "string") {
    return new Response(JSON.stringify({ error: "topic is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // ── SSE stream ──────────────────────────────────────────────────────
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

      try {
        // Validate topic
        const validation = validateTopic(topic);
        if (!validation.valid) {
          sendEvent("error", { error: validation.error || "Invalid topic" });
          return;
        }

        sendEvent("progress", {
          stage: "generating-perspectives",
          message: "Generating research perspectives...",
        });

        // Build config and generate perspectives
        const config = buildConfig(mode);
        const perspectives = await generatePerspectives(topic, config);

        sendEvent("progress", {
          stage: "generating-perspectives",
          message: `Generated ${perspectives.length} perspectives`,
        });

        // Emit the full perspectives with search queries
        sendEvent("perspectives", {
          perspectives: perspectives.map((p) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            queries: p.searchQueries,
            expectedPaperTypes: p.expectedPaperTypes,
          })),
        });

        sendEvent("done");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Plan generation failed";
        console.error("[DeepResearch Plan] Error:", error);
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
