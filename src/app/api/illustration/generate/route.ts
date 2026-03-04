import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { getModel, traceGeneration } from "@/lib/ai/models";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

// ---------------------------------------------------------------------------
// POST /api/illustration/generate
// Takes a prompt → generates SVG diagram using FINNISH AI services
// ---------------------------------------------------------------------------

const requestSchema = z.object({
  prompt: z.string().min(1).max(4000),
  backend: z.enum(["mermaid", "svg", "auto"]).default("auto"),
  domain: z.string().optional(),
  slideContext: z.string().nullish(),
});

function getIllustrationPrompt(domain?: string): string {
  const domainHint = domain
    ? `\nFocus on the ${domain} domain. Use appropriate terminology and visual conventions.`
    : "";

  return `You are a scientific illustration AI assistant.
Generate Mermaid diagram syntax from user descriptions.${domainHint}

Return ONLY valid Mermaid syntax that will render correctly. Do NOT include markdown fences.

Supported diagram types:
- flowchart: For processes, flows, decision trees
- sequence: For interactions between entities
- classDiagram: For class structures and relationships
- stateDiagram: For state machines
- erDiagram: For entity relationships
- gantt: For timelines and schedules
- pie: For proportional data
- mindmap: For hierarchical concepts
- timeline: For chronological events

Guidelines:
- Use simple, clear syntax
- Label nodes and edges appropriately
- For flowcharts: Use graph TD (top-down) or graph LR (left-right)
- For sequences: Define participants clearly
- Include brief, descriptive labels
- Escape special characters in JSON: \\n for newlines, \\" for quotes

Example output:
graph TD
  A[Input Signal] --> B[Sensor Processing]
  B --> C{Threshold Check}
  C -->|Above| D[Activation Signal]
  C -->|Below| E[No Action]
  D --> F[Response Generation]
`;
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

    const rateLimitResponse = await checkRateLimit(userId, "illustrations", RATE_LIMITS.ai);
    if (rateLimitResponse) return rateLimitResponse;

    const parseResult = requestSchema.safeParse(await req.json());
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { prompt, backend, domain, slideContext } = parseResult.data;

    const systemPrompt = getIllustrationPrompt(domain);
    let userPrompt = `Create a scientific illustration for: ${prompt}`;
    if (slideContext) {
      userPrompt += `\n\nSlide context:\n${slideContext}`;
    }

    const trace = traceGeneration({
      tier: "standard",
      modelId: "claude-sonnet-4-20250514",
      feature: "illustration-generate",
      userId,
    });

    const { text, usage } = await generateText({
      model: getModel(),
      system: systemPrompt,
      prompt: userPrompt.slice(0, 15000),
    });
    trace.end(usage);

    // Clean and extract Mermaid syntax
    let mermaidSyntax = text
      .replace(/```mermaid\n?/g, "")
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[\u2018\u2019]/g, "'")
      .trim();

    // Extract just the syntax if it's wrapped in JSON
    const syntaxMatch = mermaidSyntax.match(/"syntax"\s*:\s*"([^"]+)"/);
    if (syntaxMatch) {
      // Re-escape newlines from JSON encoding
      mermaidSyntax = syntaxMatch[1].replace(/\\n/g, "\n");
    }

    return NextResponse.json({
      illustration: {
        svgContent: mermaidSyntax,
        backend: "mermaid",
        domain: domain || "general",
        caption: prompt.slice(0, 100),
      },
    });
  } catch (error) {
    log.error("Illustration generation error", error);
    return NextResponse.json(
      { error: "Illustration generation failed" },
      { status: 500 }
    );
  }
}
