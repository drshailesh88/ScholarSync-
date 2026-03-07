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
  brandColors: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
  }).nullish(),
});

// ---------------------------------------------------------------------------
// Response validation — filter out malformed LLM outputs instead of crashing
// ---------------------------------------------------------------------------

const VALID_DIAGRAM_TYPES = [
  "flowchart", "sequence", "classDiagram", "stateDiagram",
  "erDiagram", "gantt", "pie", "mindmap", "timeline",
  "journey", "quadrantChart",
] as const;

const VALID_CHART_TYPES = [
  "bar", "line", "pie", "scatter", "area", "radar",
  "funnel", "forest_plot", "donut", "stacked_bar", "waterfall", "gauge", "treemap",
] as const;

const VALID_INFOGRAPHIC_TYPES = [
  "process_flow", "comparison", "hierarchy", "cycle", "funnel",
  "pyramid", "venn", "matrix", "radial", "stats_row", "checklist", "cause_effect",
  "icon_array", "pictograph", "word_cloud",
] as const;

const diagramBlockSchema = z.object({
  type: z.literal("diagram"),
  data: z.object({
    diagramType: z.enum(VALID_DIAGRAM_TYPES),
    syntax: z.string().min(1),
    caption: z.string().optional(),
  }),
});

const chartDatasetSchema = z.object({
  label: z.string().min(1),
  data: z.array(z.number()),
  color: z.string().optional(),
});

const chartBlockSchema = z.object({
  type: z.literal("chart"),
  data: z.object({
    chartType: z.enum(VALID_CHART_TYPES),
    title: z.string().optional(),
    labels: z.array(z.string()).min(1),
    datasets: z.array(chartDatasetSchema).min(1),
    xAxisLabel: z.string().optional(),
    yAxisLabel: z.string().optional(),
    showLegend: z.boolean().optional(),
  }),
});

const infographicItemSchema = z.object({
  label: z.string().min(1),
  description: z.string().optional(),
  value: z.string().optional(),
  icon: z.string().optional(),
  status: z.enum(["done", "active", "pending"]).optional(),
});

const infographicBlockSchema = z.object({
  type: z.literal("infographic"),
  data: z.object({
    infographicType: z.enum(VALID_INFOGRAPHIC_TYPES),
    title: z.string().optional(),
    items: z.array(infographicItemSchema).min(1),
    colorScheme: z.string().optional(),
    caption: z.string().optional(),
  }),
});

const visualOptionSchema = z.object({
  label: z.string().min(1),
  description: z.string().min(1),
  block: z.union([diagramBlockSchema, infographicBlockSchema, chartBlockSchema]),
});

const responseSchema = z.object({
  options: z.array(visualOptionSchema),
});

/** Sanitize Mermaid syntax: fix smart quotes and other LLM artifacts */
function sanitizeMermaidSyntax(syntax: string): string {
  return syntax
    .replace(/[\u201C\u201D]/g, '"') // Smart double quotes → straight
    .replace(/[\u2018\u2019]/g, "'"); // Smart single quotes → straight
}

/** Parse and validate LLM response, returning only valid options */
function validateVisualResponse(raw: unknown): { options: z.infer<typeof visualOptionSchema>[] } {
  // Pre-process: sanitize Mermaid syntax in all diagram options
  if (raw && typeof raw === "object" && "options" in raw && Array.isArray((raw as Record<string, unknown>).options)) {
    for (const opt of (raw as Record<string, unknown>).options as Record<string, unknown>[]) {
      if (opt?.block && typeof opt.block === "object") {
        const block = opt.block as Record<string, unknown>;
        if (block.type === "diagram" && block.data && typeof block.data === "object") {
          const data = block.data as Record<string, unknown>;
          if (typeof data.syntax === "string") {
            data.syntax = sanitizeMermaidSyntax(data.syntax);
          }
        }
      }
    }
  }

  // Try full schema parse first
  const fullParse = responseSchema.safeParse(raw);
  if (fullParse.success) return fullParse.data;

  // Fallback: validate options individually and keep valid ones
  if (raw && typeof raw === "object" && "options" in raw && Array.isArray((raw as Record<string, unknown>).options)) {
    const validOptions: z.infer<typeof visualOptionSchema>[] = [];
    for (const opt of (raw as Record<string, unknown>).options as unknown[]) {
      const parsed = visualOptionSchema.safeParse(opt);
      if (parsed.success) {
        validOptions.push(parsed.data);
      }
    }
    if (validOptions.length > 0) {
      return { options: validOptions };
    }
  }

  throw new Error("No valid visual options in LLM response");
}

function getVisualGenerationPrompt(preferredType?: string, brandColors?: { primary: string; secondary: string; accent: string }): string {
  const typeHint = preferredType
    ? `\nThe user specifically wants a "${preferredType}" visual. Generate MOST options as that type with variations, but also include 1-2 alternatives.`
    : "";

  const brandHint = brandColors
    ? `\nIMPORTANT: The user has institutional brand colors. Use these hex colors in your infographic colorScheme (set to "brand") and chart dataset colors: primary=${brandColors.primary}, secondary=${brandColors.secondary}, accent=${brandColors.accent}. For charts, set the "color" field on each dataset to one of these brand colors.`
    : "";

  return `You are an expert visual designer for academic presentations.
Given user text, generate MULTIPLE visual representation options that could appear on a slide.
Return 4-6 options spanning different visual types.${typeHint}${brandHint}

Each option is a ContentBlock — a "diagram" (Mermaid), "infographic" (SVG template), or "chart" (Recharts data).

OPTION TYPES YOU CAN GENERATE:

1. MERMAID DIAGRAMS (type: "diagram"):
   Valid diagramType values: flowchart, sequence, classDiagram, stateDiagram, erDiagram, gantt, pie, mindmap, timeline, journey, quadrantChart

   CRITICAL: Use VALID Mermaid syntax. Examples:

   Flowchart:
   { "type": "diagram", "data": { "diagramType": "flowchart", "syntax": "graph TD\\n  A[Data Collection] --> B[Preprocessing]\\n  B --> C{Quality Check}\\n  C -->|Pass| D[Analysis]\\n  C -->|Fail| B", "caption": "Data pipeline" } }

   Mind Map:
   { "type": "diagram", "data": { "diagramType": "mindmap", "syntax": "mindmap\\n  root((Main Topic))\\n    Branch A\\n      Detail 1\\n      Detail 2\\n    Branch B\\n      Detail 3\\n    Branch C", "caption": "Concept map" } }

   Sequence:
   { "type": "diagram", "data": { "diagramType": "sequence", "syntax": "sequenceDiagram\\n  participant A as Researcher\\n  participant B as Database\\n  A->>B: Query\\n  B-->>A: Results", "caption": "Interaction flow" } }

   Timeline (simple linear):
   { "type": "diagram", "data": { "diagramType": "timeline", "syntax": "timeline\\n  title Project Timeline\\n  2024-Q1 : Planning\\n  2024-Q2 : Data Collection\\n  2024-Q3 : Analysis\\n  2024-Q4 : Publication", "caption": "Project timeline" } }

   Timeline (complex with branching — USE FLOWCHART LR):
   When a timeline involves branching (e.g., clinical trial randomization into Treatment vs Control arms),
   use a flowchart LR instead of Mermaid's linear timeline type. Mermaid timeline does NOT support branching.
   { "type": "diagram", "data": { "diagramType": "flowchart", "syntax": "graph LR\\n  subgraph Screening[\\"Screening Period\\"]\\n    A[Informed Consent<br/>Week -4] --> B[Eligibility<br/>Assessment]\\n    B --> C[Baseline<br/>Measurements]\\n  end\\n  subgraph Treatment[\\"Treatment Period\\"]\\n    C --> D{Randomization<br/>Week 0}\\n    D -->|Treatment Arm| E[Drug X 10mg<br/>Weeks 0-52]\\n    D -->|Control Arm| F[Placebo<br/>Weeks 0-52]\\n    E --> G[Primary Endpoint<br/>Week 52]\\n    F --> G\\n  end\\n  subgraph Extension[\\"Extension Period\\"]\\n    G --> H[Open-Label Extension<br/>Weeks 52-104]\\n  end\\n  style D fill:#f59e0b,stroke:#d97706,color:#000\\n  style E fill:#3b82f6,stroke:#1e40af,color:#fff\\n  style F fill:#ef4444,stroke:#b91c1c,color:#fff\\n  style H fill:#6b7280,stroke:#4b5563,color:#fff,stroke-dasharray: 5 5", "caption": "Phase III Clinical Trial Design" } }

   TIMELINE SELECTION RULE:
   - Simple chronological events (no branching) → use "timeline" diagramType
   - Timelines with branching/forks/parallel paths → use "flowchart" diagramType with graph LR
   - Clinical trials, study designs with arms → ALWAYS use flowchart LR with subgraphs for periods

   Pie:
   { "type": "diagram", "data": { "diagramType": "pie", "syntax": "pie title Distribution\\n  \\"Category A\\" : 40\\n  \\"Category B\\" : 30\\n  \\"Category C\\" : 20\\n  \\"Other\\" : 10", "caption": "Distribution" } }

   Gantt:
   { "type": "diagram", "data": { "diagramType": "gantt", "syntax": "gantt\\n  title Schedule\\n  dateFormat YYYY-MM-DD\\n  section Phase 1\\n    Task A :a1, 2024-01-01, 30d\\n    Task B :after a1, 20d", "caption": "Schedule" } }

   Journey (user experience / emotional journey):
   { "type": "diagram", "data": { "diagramType": "journey", "syntax": "journey\\n  title User Journey\\n  section Onboarding\\n    Sign up: 5: User\\n    Complete profile: 3: User\\n  section Usage\\n    First task: 4: User\\n    Advanced feature: 2: User", "caption": "User experience journey" } }

   JOURNEY RULES:
   - Each task line format: "    Task name: score: Actor" where score is 1-5
   - Sections group tasks into phases with "  section SectionName"
   - Scores represent satisfaction (1=frustrated, 5=happy)
   - Use for patient journeys, user experiences, emotional arcs

   Quadrant Chart (2x2 matrix with data points):
   { "type": "diagram", "data": { "diagramType": "quadrantChart", "syntax": "quadrantChart\\n  title Project Prioritization\\n  x-axis Low Effort --> High Effort\\n  y-axis Low Impact --> High Impact\\n  quadrant-1 Do First\\n  quadrant-2 Schedule\\n  quadrant-3 Delegate\\n  quadrant-4 Eliminate\\n  Project A: [0.3, 0.8]\\n  Project B: [0.7, 0.4]", "caption": "Priority matrix" } }

   QUADRANT CHART RULES:
   - Declare axes with "x-axis Label1 --> Label2" and "y-axis Label1 --> Label2"
   - Label quadrants with "quadrant-1" through "quadrant-4" (1=top-right, 2=top-left, 3=bottom-left, 4=bottom-right)
   - Plot data points with "Label: [x, y]" where x and y are 0.0 to 1.0
   - Use for prioritization matrices, risk assessments, comparison grids

2. INFOGRAPHIC VISUALS (type: "infographic"):
   Valid infographicType values: process_flow, comparison, hierarchy, cycle, funnel, pyramid, venn, matrix, radial, stats_row, checklist, cause_effect, icon_array, pictograph, word_cloud

   { "type": "infographic", "data": {
     "infographicType": "process_flow|comparison|hierarchy|cycle|funnel|pyramid|venn|matrix|radial|stats_row|checklist|cause_effect|icon_array|pictograph|word_cloud",
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

   Icon Array (when showing proportions of a whole, e.g., "7 out of 10 patients responded"):
   { "type": "infographic", "data": { "infographicType": "icon_array", "title": "Treatment Response Rate", "items": [{"label": "Responded", "value": "7", "icon": "●", "color": "#3B82F6"}, {"label": "No Response", "value": "2", "icon": "●", "color": "#94A3B8"}, {"label": "Adverse", "value": "1", "icon": "●", "color": "#EF4444"}], "colorScheme": "blue" } }

   Pictograph (when comparing quantities across categories using repeated icons):
   { "type": "infographic", "data": { "infographicType": "pictograph", "title": "Patient Enrollment by Site", "items": [{"label": "Site A", "value": "5", "icon": "👤"}, {"label": "Site B", "value": "3.5", "icon": "👤"}, {"label": "Site C", "value": "8", "icon": "👤"}], "colorScheme": "green" } }

   Word Cloud (when showing relative frequency or importance of terms/concepts):
   { "type": "infographic", "data": { "infographicType": "word_cloud", "title": "Key Research Themes", "items": [{"label": "Machine Learning", "value": "10"}, {"label": "Neural Networks", "value": "8"}, {"label": "Data Mining", "value": "6"}, {"label": "NLP", "value": "5"}, {"label": "Computer Vision", "value": "4"}, {"label": "Reinforcement Learning", "value": "3"}], "colorScheme": "rainbow" } }

3. CHART VISUALS (type: "chart"):
   Valid chartType values: bar, line, pie, scatter, area, radar, funnel, forest_plot, donut, stacked_bar, waterfall, gauge, treemap

   { "type": "chart", "data": {
     "chartType": "bar|line|pie|donut|scatter|area|radar|stacked_bar|funnel|waterfall|treemap|gauge|forest_plot",
     "title": "Chart title",
     "labels": ["Label1", "Label2", ...],
     "datasets": [{ "label": "Series name", "data": [10, 20, 30] }],
     "xAxisLabel": "Optional X axis label",
     "yAxisLabel": "Optional Y axis label",
     "showLegend": true
   }}

   WHEN TO USE EACH CHART TYPE:
   - donut: proportional data with a key total (e.g., budget allocation, market share)
   - stacked_bar: comparing composition across categories (e.g., survey responses by group)
   - waterfall: sequential additions/subtractions (e.g., revenue breakdown, profit bridge)
   - gauge: KPI/progress visualization (datasets[0].data = [currentValue, maxValue])
   - treemap: hierarchical proportional data (e.g., department budgets, file sizes)
   - forest_plot: meta-analysis results with confidence intervals. datasets[0]=point estimates, datasets[1]=CI lower, datasets[2]=CI upper. Labels=study names.
   - funnel: conversion/filtering stages (e.g., recruitment funnel, sales pipeline)

   Examples:
   { "type": "chart", "data": { "chartType": "donut", "title": "Budget Allocation", "labels": ["R&D", "Marketing", "Operations"], "datasets": [{"label": "Budget", "data": [45, 30, 25]}] } }
   { "type": "chart", "data": { "chartType": "waterfall", "title": "Profit Bridge", "labels": ["Revenue", "COGS", "OpEx", "Tax", "Net Profit"], "datasets": [{"label": "Amount", "data": [100, -40, -25, -10, 25]}] } }
   { "type": "chart", "data": { "chartType": "gauge", "title": "Study Completion", "labels": ["Progress"], "datasets": [{"label": "Completion", "data": [73, 100]}] } }

RESPONSE FORMAT — Return valid JSON only, no markdown fences:
{
  "options": [
    {
      "label": "Short descriptive name for this option (e.g., 'Flowchart', 'Mind Map', 'Process Flow')",
      "description": "One sentence describing what this visual shows",
      "block": { "type": "diagram|infographic|chart", "data": { ... } }
    }
  ]
}

RULES:
- Generate 4-6 diverse options mixing diagram, infographic, and chart types
- Each option should represent the SAME content in a DIFFERENT visual format
- When the content has numerical data, include at least one chart option
- Mermaid syntax MUST be valid (escape newlines as \\n in JSON)
- Infographic items should have 3-8 entries
- Choose visual types that genuinely fit the content (don't force a pie chart on a process)
- Use descriptive labels and captions
- Include at least one Mermaid diagram AND one infographic in every response
- For timelines with branching (clinical trials, study designs with multiple arms): use flowchart LR with subgraphs, NOT the Mermaid timeline type
- Use subgraphs to group related nodes into phases/periods
- Add classDef or style directives for visual distinction between categories (treatment vs control, phases, etc.)
- Include ALL numeric data from the input in node labels (week numbers, sample sizes, counts)
- Use <br/> for multi-line labels in Mermaid nodes
- Diamond shapes {Decision} for branch/decision points like randomization`;
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
    const { prompt, slideContent, preferredType, audienceType, brandColors } = parseResult.data;

    const systemPrompt = getVisualGenerationPrompt(preferredType ?? undefined, brandColors ?? undefined);
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
      .replace(/[\u201C\u201D]/g, '"') // Smart double quotes → straight
      .replace(/[\u2018\u2019]/g, "'") // Smart single quotes → straight
      .trim();

    let parsed: unknown;
    try {
      parsed = JSON.parse(cleanText);
    } catch {
      log.error("LLM returned invalid JSON", { text: cleanText.slice(0, 500) });
      return NextResponse.json(
        { error: "AI returned malformed response. Please try again." },
        { status: 502 }
      );
    }

    const result = validateVisualResponse(parsed);

    return NextResponse.json(result);
  } catch (error) {
    log.error("Generate visual error", error);
    return NextResponse.json(
      { error: "Visual generation failed" },
      { status: 500 }
    );
  }
}
