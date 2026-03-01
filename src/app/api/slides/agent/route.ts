import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { getModel, traceGeneration } from "@/lib/ai/models";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const agentSchema = z.object({
  mode: z.enum(["learn", "draft"]),
  prompt: z.string().min(1).max(4000),
  deckId: z.number().int().positive().optional(),
  slideContent: z.string().optional(),
  audienceType: z.string().optional(),
});

function getLearnSystemPrompt(audienceType: string): string {
  return `You are an academic research advisor helping a scholar find relevant papers and resources for their presentation.
Target audience: ${audienceType}

The user is working on a slide presentation and needs help finding research to strengthen their content.
You should:
1. Analyze the current slide content if provided
2. Suggest specific types of papers, studies, or data sources that would strengthen the slide
3. Recommend search queries for academic databases (PubMed, Google Scholar, Scopus)
4. When suggesting papers, include realistic metadata (title, authors, year, journal) based on the topic

RESPONSE FORMAT — Return valid JSON only, no markdown fences:
{
  "text": "<your advice and explanation>",
  "papers": [
    {
      "title": "Paper title",
      "authors": "Author et al.",
      "year": 2024,
      "journal": "Journal Name",
      "relevance": "Why this paper is relevant to the slide"
    }
  ],
  "searchQueries": ["suggested search query 1", "suggested search query 2"]
}`;
}

function getDraftSystemPrompt(audienceType: string): string {
  return `You are an expert slide content generator for academic presentations.
Target audience: ${audienceType}

Generate presentation-ready content blocks that can be directly inserted into slides.
You must return valid, structured content blocks matching the ScholarSync type system.

VALID BLOCK TYPES AND THEIR DATA SHAPES:
- text: { "text": "...", "style": "title" | "subtitle" | "body" | "caption" }
- bullets: { "items": ["item1", "item2"], "ordered": false }
- chart: { "chartType": "bar" | "line" | "pie" | "scatter" | "area" | "radar", "title": "...", "labels": ["a","b"], "datasets": [{"label": "X", "data": [1,2]}] }
- table: { "headers": ["col1","col2"], "rows": [["a","b"]], "caption": "..." }
- citation: { "text": "quoted text", "source": "Author et al., Year", "doi": "10.xxx/xxx" }
- math: { "expression": "LaTeX string", "displayMode": true }
- callout: { "type": "finding" | "limitation" | "methodology" | "clinical" | "warning" | "important" | "note", "text": "...", "title": "..." }
- stat_result: { "label": "...", "value": "...", "ci": "95% CI [x, y]", "pValue": "p < 0.05", "interpretation": "..." }
- timeline: { "entries": [{"label": "Phase 1", "description": "...", "date": "2024", "status": "completed"}] }
- quote: { "text": "...", "attribution": "Author Name" }

RESPONSE FORMAT — Return valid JSON only, no markdown fences:
{
  "text": "<brief explanation of what was generated>",
  "contentBlocks": [
    { "type": "<block_type>", "data": { ... } }
  ]
}`;
}

export async function POST(req: Request) {
  const log = logger.withRequestId();

  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rateLimitResponse = await checkRateLimit(userId, "presentations", RATE_LIMITS.ai);
    if (rateLimitResponse) return rateLimitResponse;

    const parseResult = agentSchema.safeParse(await req.json());
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const body = parseResult.data;

    const systemPrompt =
      body.mode === "learn"
        ? getLearnSystemPrompt(body.audienceType ?? "general")
        : getDraftSystemPrompt(body.audienceType ?? "general");

    let userPrompt = body.prompt;
    if (body.slideContent) {
      userPrompt += `\n\nCurrent slide content:\n${body.slideContent}`;
    }

    const trace = traceGeneration({
      tier: "standard",
      modelId: "claude-sonnet-4-20250514",
      feature: `slides-agent-${body.mode}`,
      userId,
    });

    const { text, usage } = await generateText({
      model: getModel(),
      system: systemPrompt,
      prompt: userPrompt.slice(0, 30000),
    });
    trace.end(usage);

    const cleanText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const result = JSON.parse(cleanText);

    return NextResponse.json(result);
  } catch (error) {
    log.error("Slides agent error", error);
    return NextResponse.json(
      { error: "Agent operation failed" },
      { status: 500 }
    );
  }
}
