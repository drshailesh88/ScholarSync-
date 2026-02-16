/**
 * POST /api/research/synthesize
 *
 * Generate a multi-paper synthesis report.
 * Streams the response for progressive rendering.
 */

import { NextRequest } from "next/server";
import { streamText, generateText } from "ai";
import { getModel, getSmallModel, isAIConfigured } from "@/lib/ai/models";
import { buildSynthesisPrompt, buildSynthesisPlanPrompt } from "@/lib/research/synthesis";
import type { SynthesisReportType } from "@/lib/research/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { papers, reportType, customInstructions, targetWordCount, mode } = body;

    if (!papers || !Array.isArray(papers) || papers.length === 0) {
      return new Response(
        JSON.stringify({ error: "Missing required field: papers" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!isAIConfigured()) {
      return new Response(
        JSON.stringify({ error: "AI not configured" }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    // Mode: "plan" generates a synthesis plan (non-streaming)
    if (mode === "plan") {
      const { system, user } = buildSynthesisPlanPrompt({
        papers,
        reportType: (reportType || "literature_review") as SynthesisReportType,
        customInstructions,
      });

      const { text } = await generateText({
        model: getSmallModel(),
        system,
        prompt: user,
        temperature: 0.3,
      });

      // Parse plan JSON
      let jsonStr = text.trim();
      const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (codeBlockMatch) jsonStr = codeBlockMatch[1].trim();

      try {
        const plan = JSON.parse(jsonStr);
        return new Response(JSON.stringify({ plan }), {
          headers: { "Content-Type": "application/json" },
        });
      } catch {
        return new Response(
          JSON.stringify({ plan: { sections: [], estimatedWordCount: 0 } }),
          { headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // Mode: "generate" streams the synthesis report
    const { system, user } = buildSynthesisPrompt({
      papers,
      reportType: (reportType || "literature_review") as SynthesisReportType,
      customInstructions,
      targetWordCount,
    });

    const result = streamText({
      model: getModel(),
      system,
      prompt: user,
      temperature: 0.4,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Synthesis error:", error);
    return new Response(
      JSON.stringify({ error: "Synthesis failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
