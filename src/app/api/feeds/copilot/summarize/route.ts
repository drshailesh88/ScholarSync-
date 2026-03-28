/**
 * POST /api/feeds/copilot/summarize
 *
 * Generate a 3-sentence clinical summary of a feed article.
 * Returns the summary + source tier + suggested follow-up questions.
 */
import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import {
  getSmallModel,
  isAIConfigured,
  traceGeneration,
} from "@/lib/ai/models";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import {
  resolveArticleSource,
  type ArticleInput,
} from "@/lib/feeds/copilot-source-resolver";
import { getDomainConfig } from "@/lib/search/domains";
import { z } from "zod";

const inputSchema = z.object({
  title: z.string().min(1),
  authors: z.string().nullable(),
  abstractSnippet: z.string().nullable(),
  doi: z.string().nullable(),
  pubmedId: z.string().nullable(),
  journal: z.string().nullable(),
  volume: z.string().nullable(),
  issue: z.string().nullable(),
  publishedAt: z.string().nullable(),
  link: z.string().nullable(),
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
      "research",
      RATE_LIMITS.ai
    );
    if (rateLimitResponse) return rateLimitResponse;

    if (!isAIConfigured()) {
      return NextResponse.json(
        { error: "AI not configured" },
        { status: 503 }
      );
    }

    const body = await req.json();
    const parsed = inputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const article: ArticleInput = parsed.data;
    const domainParam = req.nextUrl.searchParams.get("domain");
    const domain = domainParam ? getDomainConfig(domainParam) : undefined;
    const summaryPrompt = `${domain?.feedsSummaryPrompt ?? `Generate a clinical summary in exactly 3 sentences:
1. What was studied (population, intervention/exposure)
2. What was found (primary outcome, key statistics)
3. What it means for clinical practice (significance)

Keep language accessible to a medical student. Include key numbers (HR, OR, p-values, NNT).
Do NOT start with "This study..." — lead with the finding.
Then output exactly 3 suggested follow-up questions.`}

Output the follow-up questions on separate lines prefixed with "Q: ".`;

    // Resolve source material
    const source = await resolveArticleSource(article);

    // Generate summary
    const trace = traceGeneration({
      tier: "small",
      modelId: "claude-haiku-4-5-20251001",
      feature: "feed-copilot-summarize",
      userId,
    });

    const { text, usage } = await generateText({
      model: getSmallModel(),
      system: source.systemPrompt,
      prompt: `${source.context}\n\n---\n\n${summaryPrompt}`,
      temperature: 0.2,
    });

    trace.end(usage);

    // Parse suggested questions from the response
    const lines = text.split("\n").filter((l) => l.trim());
    const questionLines = lines.filter((l) => l.trim().startsWith("Q: "));
    const summaryLines = lines.filter((l) => !l.trim().startsWith("Q: "));

    const summary = summaryLines.join("\n").trim();
    const suggestedQuestions = questionLines.map((q) =>
      q.replace(/^Q:\s*/, "").trim()
    );

    return NextResponse.json({
      summary,
      suggestedQuestions,
      sourceTier: source.tier,
      sourceLabel: source.sourceLabel,
      relatedPaperCount: source.relatedPaperCount,
    });
  } catch (error) {
    console.error("Feed copilot summarize error:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}
