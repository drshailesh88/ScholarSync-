import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { getModel, traceGeneration } from "@/lib/ai/models";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

// ---------------------------------------------------------------------------
// POST /api/slides/generate-visual
// Takes a text prompt → returns multiple visual options (diagram + infographic)
// for the user to choose from (Napkin-style palette).
// ---------------------------------------------------------------------------

const requestSchema = z.object({
  prompt: z.string().min(1).max(4000),
  slideContent: z.string().nullish(),
  preferredType: z.string().nullish(), // "flowchart", "comparison", etc.
  audienceType: z.string().nullish(),
});

function getVisualGenerationPrompt(preferredType?: string): string {
  const typeHint = preferredType
    ? `\nThe user specifically wants a "${preferredType}" visual. Generate MOST options as that type with variations, but also include 1-2 alternatives.`
    : "";

  return `You are an expert visual designer for academic presentations.
Given user text, generate MULTIPLE visual representation options that could appear on a slide.
Return 4-6 options spanning different visual types.${typeHint}

Each option is a ContentBlock — either a "diagram" (Mermaid) or "infographic" (SVG template).

OPTION TYPES YOU CAN GENERATE:

1. MERMAID DIAGRAMS (type: "diagram"):
   Valid diagramType values: flowchart, sequence, classDiagram, stateDiagram, erDiagram, gantt, pie, mindmap, timeline

   CRITICAL: Use VALID Mermaid syntax. Examples:

   Flowchart:
   { "type": "diagram", "data": { "diagramType": "flowchart", "syntax": "graph TD\\n  A[Data Collection] --> B[Preprocessing]\\n  B --> C{Quality Check}\\n  C -->|Pass| D[Analysis]\\n  C -->|Fail| B", "caption": "Data pipeline" } }

   Mind Map:
   { "type": "diagram", "data": { "diagramType": "mindmap", "syntax": "mindmap\\n  root((Main Topic))\\n    Branch A\\n      Detail 1\\n      Detail 2\\n    Branch B\\n      Detail 3\\n    Branch C", "caption": "Concept map" } }

   Sequence:
   { "type": "diagram", "data": { "diagramType": "sequence", "syntax": "sequenceDiagram\\n  participant A as Researcher\\n  participant B as Database\\n  A->>B: Query\\n  B-->>A: Results", "caption": "Interaction flow" } }

   Timeline:
   { "type": "diagram", "data": { "diagramType": "timeline", "syntax": "timeline\\n  title Project Timeline\\n  2024-Q1 : Planning\\n  2024-Q2 : Data Collection\\n  2024-Q3 : Analysis\\n  2024-Q4 : Publication", "caption": "Project timeline" } }

   Pie:
   { "type": "diagram", "data": { "diagramType": "pie", "syntax": "pie title Distribution\\n  \\"Category A\\" : 40\\n  \\"Category B\\" : 30\\n  \\"Category C\\" : 20\\n  \\"Other\\" : 10", "caption": "Distribution" } }

   Gantt:
   { "type": "diagram", "data": { "diagramType": "gantt", "syntax": "gantt\\n  title Schedule\\n  dateFormat YYYY-MM-DD\\n  section Phase 1\\n    Task A :a1, 2024-01-01, 30d\\n    Task B :after a1, 20d", "caption": "Schedule" } }

2. INFOGRAPHIC VISUALS (type: "infographic"):
   Valid infographicType values: process_flow, comparison, hierarchy, cycle, funnel, pyramid, venn, matrix, radial, stats_row, checklist, cause_effect

   { "type": "infographic", "data": {
     "infographicType": "process_flow|comparison|hierarchy|cycle|funnel|pyramid|venn|matrix|radial|stats_row|checklist|cause_effect",
     "title": "Visual title",
     "items": [
       { "label": "Item name", "description": "Brief description", "value": "Optional metric", "icon": "emoji", "status": "done|active|pending" }
     ],
     "colorScheme": "theme|blue|green|purple|orange|rainbow",
     "caption": "Optional caption"
   }}

   Examples:

   Process Flow:
   { "type": "infographic", "data": { "infographicType": "process_flow", "title": "Research Pipeline", "items": [{"label": "Collect", "description": "Gather samples", "icon": "📊"}, {"label": "Process", "description": "Clean data", "icon": "⚙️"}, {"label": "Analyze", "description": "Run stats", "icon": "📈"}, {"label": "Publish", "description": "Write paper", "icon": "📝"}], "colorScheme": "blue" } }

   Comparison:
   { "type": "infographic", "data": { "infographicType": "comparison", "title": "Method Comparison", "items": [{"label": "Method A", "description": "Fast, less accurate", "value": "85%"}, {"label": "Method B", "description": "Slower, more precise", "value": "97%"}], "colorScheme": "purple" } }

   Stats Row:
   { "type": "infographic", "data": { "infographicType": "stats_row", "title": "Key Metrics", "items": [{"label": "Participants", "value": "1,200"}, {"label": "Accuracy", "value": "94.2%"}, {"label": "P-value", "value": "<0.001"}], "colorScheme": "green" } }

RESPONSE FORMAT — Return valid JSON only, no markdown fences:
{
  "options": [
    {
      "label": "Short descriptive name for this option (e.g., 'Flowchart', 'Mind Map', 'Process Flow')",
      "description": "One sentence describing what this visual shows",
      "block": { "type": "diagram|infographic", "data": { ... } }
    }
  ]
}

RULES:
- Generate 4-6 diverse options mixing diagram and infographic types
- Each option should represent the SAME content in a DIFFERENT visual format
- Mermaid syntax MUST be valid (escape newlines as \\n in JSON)
- Infographic items should have 3-8 entries
- Choose visual types that genuinely fit the content (don't force a pie chart on a process)
- Use descriptive labels and captions
- Include at least one Mermaid diagram AND one infographic in every response`;
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

    const parseResult = requestSchema.safeParse(await req.json());
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { prompt, slideContent, preferredType, audienceType } = parseResult.data;

    const systemPrompt = getVisualGenerationPrompt(preferredType ?? undefined);
    let userPrompt = prompt;
    if (slideContent) {
      userPrompt += `\n\nCurrent slide content for context:\n${slideContent}`;
    }
    if (audienceType) {
      userPrompt += `\n\nTarget audience: ${audienceType}`;
    }

    const trace = traceGeneration({
      tier: "standard",
      modelId: "claude-sonnet-4-20250514",
      feature: "slides-generate-visual",
      userId,
    });

    const { text, usage } = await generateText({
      model: getModel(),
      system: systemPrompt,
      prompt: userPrompt.slice(0, 15000),
    });
    trace.end(usage);

    const cleanText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const result = JSON.parse(cleanText);

    return NextResponse.json(result);
  } catch (error) {
    log.error("Generate visual error", error);
    return NextResponse.json(
      { error: "Visual generation failed" },
      { status: 500 }
    );
  }
}
