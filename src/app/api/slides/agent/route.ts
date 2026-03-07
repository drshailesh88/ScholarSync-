import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { getModel, traceGeneration } from "@/lib/ai/models";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const agentSchema = z.object({
  mode: z.enum(["learn", "draft", "chat"]),
  prompt: z.string().min(1).max(4000),
  deckId: z.number().int().positive().optional(),
  slideContent: z.string().optional(),
  audienceType: z.string().optional(),
  // Chat mode fields
  slides: z
    .array(
      z.object({
        id: z.number().int(),
        title: z.string().nullish(),
        contentBlocks: z.array(z.any()).optional(),
        speakerNotes: z.string().nullish(),
      })
    )
    .max(100)
    .optional(),
  activeSlideId: z.number().int().nullish(),
  selectedBlockIndex: z.number().int().min(0).nullish(),
  selectedBlockType: z.string().nullish(),
  selectedBlockContent: z.string().nullish(),
  chatHistory: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })
    )
    .max(20)
    .optional(),
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
- diagram: { "syntax": "graph TD\\n  A-->B", "diagramType": "flowchart|sequence|mindmap|pie|gantt|timeline|erDiagram|stateDiagram|classDiagram", "caption": "..." }
- infographic: { "infographicType": "process_flow|comparison|hierarchy|cycle|funnel|pyramid|venn|matrix|radial|stats_row|checklist|cause_effect", "title": "...", "items": [{"label": "...", "description": "...", "value": "...", "icon": "emoji"}], "colorScheme": "theme|blue|green|purple|orange|rainbow" }

WHEN TO USE VISUAL BLOCKS:
- Use "diagram" for processes, flows, sequences, relationships, structures (Mermaid syntax)
- Use "infographic" for comparisons, metrics, hierarchies, cycles, checklists
- Proactively generate visuals when the user describes a process, comparison, or structure
- For methodology or pipeline requests, always include a diagram or infographic

RESPONSE FORMAT — Return valid JSON only, no markdown fences:
{
  "text": "<brief explanation of what was generated>",
  "contentBlocks": [
    { "type": "<block_type>", "data": { ... } }
  ]
}`;
}

function getChatSystemPrompt(audienceType: string): string {
  return `You are an expert AI presentation assistant for academic and scientific presentations, operating in chat mode.
Target audience: ${audienceType}

The user can ask you to modify individual blocks, entire slides, or the whole deck.
When the user has selected a specific block, focus your changes on that block unless they ask for broader changes.

VALID CONTENT BLOCK TYPES:
- text: { "text": "...", "style": "title" | "subtitle" | "body" | "caption" }
- bullets: { "items": ["..."], "ordered": false }
- chart: { "chartType": "bar"|"line"|"pie"|"scatter"|"area"|"radar", "title": "...", "labels": [...], "datasets": [{"label":"...","data":[...]}] }
- table: { "headers": [...], "rows": [[...]], "caption": "..." }
- citation: { "text": "...", "source": "Author et al., Year", "doi": "..." }
- math: { "expression": "LaTeX", "displayMode": true }
- callout: { "type": "finding"|"limitation"|"methodology"|"clinical"|"warning"|"important"|"note", "text": "...", "title": "..." }
- stat_result: { "label": "...", "value": "...", "ci": "...", "pValue": "...", "interpretation": "..." }
- timeline: { "entries": [{"label":"...","description":"...","date":"...","status":"completed"|"in_progress"|"upcoming"}] }
- quote: { "text": "...", "attribution": "..." }
- image: { "url": "", "alt": "...", "caption": "..." }
- code: { "code": "...", "language": "python" }
- divider: { "style": "solid"|"dashed"|"gradient" }
- diagram: { "syntax": "graph TD\\n  A-->B", "diagramType": "flowchart", "caption": "..." }
- infographic: { "infographicType": "process_flow", "title": "...", "items": [...], "colorScheme": "theme" }

VALID LAYOUTS: title_slide, title_content, two_column, three_column, section_header, image_text, chart_slide, table_slide, quote_slide, comparison, blank, bibliography_slide, methodology, results_summary, key_findings, timeline_slide, stat_overview, big_number

RESPONSE FORMAT — Return valid JSON only, no markdown fences:
{
  "message": "<conversational explanation of what you did or suggest>",
  "suggestedChanges": [
    {
      "slideId": <slide ID to modify>,
      "blockIndex": <optional: specific block index to modify>,
      "changes": { <Partial slide or block fields> }
    }
  ]
}

RULES:
1. "message" is always required — explain what you're suggesting.
2. "suggestedChanges" is optional — omit it for purely conversational responses.
3. When modifying a specific block, include "blockIndex" and put block fields in "changes" (e.g., {"type": "text", "data": {...}}).
4. When modifying a slide, omit "blockIndex" and put slide fields in "changes" (e.g., {"title": "...", "contentBlocks": [...]}).
5. Only include changes for things that actually need to change.
6. Prefer specific, data-rich content over vague placeholders.
7. For commands like /learn, /draft, /visual, /illustrate, adapt your behavior accordingly.`;
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

    if (body.mode === "chat") {
      // Chat mode — structured response with suggested changes
      const systemPrompt = getChatSystemPrompt(body.audienceType ?? "general");

      const slideSummary = (body.slides ?? [])
        .map(
          (s) =>
            `Slide ID ${s.id}: "${s.title ?? "Untitled"}"\nContent: ${JSON.stringify(s.contentBlocks ?? [])}\nSpeaker Notes: ${s.speakerNotes ?? "None"}`
        )
        .join("\n\n");

      let contextNote = "";
      if (body.activeSlideId) {
        contextNote += `\nThe user is currently viewing slide ID ${body.activeSlideId}.`;
      }
      if (body.selectedBlockIndex != null && body.selectedBlockType) {
        contextNote += `\nThe user has selected block index ${body.selectedBlockIndex} (type: ${body.selectedBlockType}).`;
        if (body.selectedBlockContent) {
          contextNote += `\nSelected block content: ${body.selectedBlockContent}`;
        }
      }

      // Build conversation messages from history
      const conversationMessages = (body.chatHistory ?? []).map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

      const fullPrompt = `User message: ${body.prompt}${contextNote}\n\nCurrent deck (${(body.slides ?? []).length} slides):\n\n${slideSummary}`.slice(
        0,
        60000
      );

      const trace = traceGeneration({
        tier: "standard",
        modelId: "claude-sonnet-4-20250514",
        feature: "slides-agent-chat",
        userId,
      });

      const { text, usage } = await generateText({
        model: getModel(),
        system: systemPrompt,
        messages: [
          ...conversationMessages,
          { role: "user", content: fullPrompt },
        ],
      });
      trace.end(usage);

      const cleanText = text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      const result = JSON.parse(cleanText);

      return NextResponse.json(result);
    }

    // Legacy learn/draft modes
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
