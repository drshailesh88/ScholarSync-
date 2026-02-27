/**
 * POST /api/research/plan
 *
 * Generate a structured PubMed search plan from a natural language question.
 */

import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { getSmallModel, isAIConfigured, traceGeneration } from "@/lib/ai/models";
import { buildPlanPrompt, parsePlanResponse } from "@/lib/research/plan-generator";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    const rateLimitResponse = await checkRateLimit(userId, "research", RATE_LIMITS.ai);
    if (rateLimitResponse) return rateLimitResponse;

    const body = await req.json();
    const { question, currentFilters, documentContext } = body;

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Missing required field: question" },
        { status: 400 }
      );
    }

    if (!isAIConfigured()) {
      // Return a basic plan without AI
      return NextResponse.json({
        plan: {
          originalQuery: question,
          pubmedQuery: question,
          meshTerms: [],
          synonyms: {},
          suggestedFilters: {},
          estimatedResults: "Unknown",
          rationale: "AI not configured. Using direct query.",
        },
      });
    }

    const { system, user } = buildPlanPrompt({
      question,
      currentFilters,
      documentContext,
    });

    const trace = traceGeneration({ tier: "small", modelId: "claude-haiku-4-5-20251001", feature: "research-plan", userId });
    const { text, usage } = await generateText({
      model: getSmallModel(),
      system,
      prompt: user,
      temperature: 0.3,
    });
    trace.end(usage);

    const plan = parsePlanResponse(question, text);

    return NextResponse.json({ plan });
  } catch (error) {
    console.error("Plan generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate search plan" },
      { status: 500 }
    );
  }
}
