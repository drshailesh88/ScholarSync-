import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { getSmallModel, isAIConfigured, traceGeneration } from "@/lib/ai/models";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

/**
 * Generate suggested questions for a paper based on its metadata.
 * Uses the small/cheap model since this is a simple generation task.
 */
export async function POST(request: NextRequest) {
  const userId = await getCurrentUserId();
  const rateLimitResponse = await checkRateLimit(userId, "research", RATE_LIMITS.ai);
  if (rateLimitResponse) return rateLimitResponse;

  if (!isAIConfigured()) {
    return NextResponse.json(
      { error: "AI provider not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { title, abstract, sectionHeadings } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Paper title is required" },
        { status: 400 }
      );
    }

    const prompt = `Based on this medical paper's metadata, suggest exactly 5 questions a medical student would ask while reading it. Focus on:
1. Understanding the primary outcome/finding
2. Understanding the methodology
3. Understanding the clinical significance
4. Identifying limitations
5. Comparing with existing evidence

Paper title: ${title}
${abstract ? `Abstract: ${abstract}` : ""}
${sectionHeadings?.length ? `Section headings: ${sectionHeadings.join(", ")}` : ""}

Return ONLY the 5 questions, one per line, no numbering or bullets.`;

    const trace = traceGeneration({ tier: "small", modelId: "claude-haiku-4-5-20251001", feature: "suggested-questions", userId });
    const { text: rawText, usage } = await generateText({
      model: getSmallModel(),
      prompt,
    });
    trace.end(usage);

    const questions = rawText
      .split("\n")
      .map((q: string) => q.trim())
      .filter((q: string) => q.length > 0 && q.endsWith("?"))
      .slice(0, 5);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Suggested questions error:", error);
    // Return default questions on error
    return NextResponse.json({
      questions: [
        "What was the primary endpoint?",
        "Describe the study population",
        "What were the main findings?",
        "What were the limitations?",
        "How does this compare to prior studies?",
      ],
    });
  }
}
