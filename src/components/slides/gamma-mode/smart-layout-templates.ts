import type { ContentBlock } from "@/types/presentation";

// ---------------------------------------------------------------------------
// Smart Layout Templates — pre-built block arrangements for common slide types
// ---------------------------------------------------------------------------

export interface SmartLayoutTemplate {
  id: string;
  label: string;
  description: string;
  /** Phosphor icon component name */
  icon: string;
  /** Returns a fresh set of ContentBlocks each time */
  generate: () => ContentBlock[];
}

export const SMART_LAYOUTS: SmartLayoutTemplate[] = [
  {
    id: "bullets_with_header",
    label: "Bullets",
    description: "Header with formatted bullet list",
    icon: "ListBullets",
    generate: () => [
      { type: "text", data: { text: "Key Points", style: "title" } },
      {
        type: "bullets",
        data: {
          items: [
            "First key point \u2014 describe the main idea",
            "Second key point \u2014 supporting evidence",
            "Third key point \u2014 implications",
          ],
          ordered: false,
        },
      },
    ],
  },
  {
    id: "two_column",
    label: "Two Columns",
    description: "Side-by-side comparison",
    icon: "Columns",
    generate: () => [
      { type: "text", data: { text: "Comparison", style: "title" } },
      {
        type: "table",
        data: {
          headers: ["Option A", "Option B"],
          rows: [
            ["Feature 1", "Feature 1"],
            ["Advantage", "Advantage"],
            ["Limitation", "Limitation"],
          ],
        },
      },
    ],
  },
  {
    id: "timeline",
    label: "Timeline",
    description: "Chronological sequence of events",
    icon: "Clock",
    generate: () => [
      { type: "text", data: { text: "Timeline", style: "title" } },
      {
        type: "timeline",
        data: {
          entries: [
            {
              label: "Phase 1",
              date: "Q1 2025",
              description: "Initial research and planning",
              status: "completed" as const,
            },
            {
              label: "Phase 2",
              date: "Q2 2025",
              description: "Development and testing",
              status: "in_progress" as const,
            },
            {
              label: "Phase 3",
              date: "Q3 2025",
              description: "Deployment and evaluation",
              status: "upcoming" as const,
            },
          ],
          title: "Project Timeline",
        },
      },
    ],
  },
  {
    id: "steps",
    label: "Steps",
    description: "Numbered step-by-step process",
    icon: "NumberCircleOne",
    generate: () => [
      { type: "text", data: { text: "Process", style: "title" } },
      {
        type: "bullets",
        data: {
          items: [
            "Step 1: Define the problem and objectives",
            "Step 2: Gather data and requirements",
            "Step 3: Analyze and synthesize findings",
            "Step 4: Implement solution and validate",
          ],
          ordered: true,
        },
      },
    ],
  },
  {
    id: "big_number",
    label: "Big Number",
    description: "Large statistic with context",
    icon: "ChartBar",
    generate: () => [
      {
        type: "stat_result",
        data: {
          label: "Key Metric",
          value: "92%",
          ci: "95% CI: 88-96%",
          pValue: "p < 0.001",
          interpretation:
            "Statistically significant improvement over baseline",
        },
      },
      {
        type: "text",
        data: {
          text: "This represents a significant finding that demonstrates the effectiveness of the intervention.",
          style: "body",
        },
      },
    ],
  },
  {
    id: "chart_with_caption",
    label: "Chart",
    description: "Data visualization with caption",
    icon: "ChartLine",
    generate: () => [
      { type: "text", data: { text: "Results Overview", style: "title" } },
      {
        type: "chart",
        data: {
          chartType: "bar",
          title: "Performance Comparison",
          labels: ["Group A", "Group B", "Group C"],
          datasets: [{ label: "Score", data: [78, 85, 92] }],
        },
      },
      {
        type: "text",
        data: {
          text: "Figure 1: Performance scores across experimental groups.",
          style: "caption",
        },
      },
    ],
  },
  {
    id: "quote_highlight",
    label: "Quote",
    description: "Featured quote with attribution",
    icon: "Quotes",
    generate: () => [
      {
        type: "quote",
        data: {
          text: "The greatest challenge in science is not discovering new facts, but understanding what they mean.",
          attribution: "Author Name, Year",
        },
      },
      {
        type: "text",
        data: {
          text: "This perspective highlights the importance of interpretation in our analysis.",
          style: "body",
        },
      },
    ],
  },
  {
    id: "callout_key_finding",
    label: "Key Finding",
    description: "Highlighted finding with context",
    icon: "Megaphone",
    generate: () => [
      { type: "text", data: { text: "Key Finding", style: "title" } },
      {
        type: "callout",
        data: {
          type: "finding",
          title: "Primary Result",
          text: "The intervention group showed a 35% improvement in outcomes compared to the control group.",
        },
      },
      {
        type: "text",
        data: {
          text: "This finding is consistent with previous studies and supports our hypothesis.",
          style: "body",
        },
      },
    ],
  },
  {
    id: "methodology",
    label: "Methodology",
    description: "Methods description with diagram",
    icon: "TreeStructure",
    generate: () => [
      { type: "text", data: { text: "Methodology", style: "title" } },
      {
        type: "diagram",
        data: {
          syntax:
            "graph TD\n  A[Data Collection] --> B[Preprocessing]\n  B --> C[Analysis]\n  C --> D[Validation]\n  D --> E[Results]",
          diagramType: "flowchart",
          caption: "Study workflow",
        },
      },
      {
        type: "text",
        data: {
          text: "Our methodology follows a systematic approach to ensure reproducibility.",
          style: "body",
        },
      },
    ],
  },
  {
    id: "image_with_text",
    label: "Image + Text",
    description: "Visual with accompanying description",
    icon: "Image",
    generate: () => [
      { type: "text", data: { text: "Visual Overview", style: "title" } },
      {
        type: "image",
        data: {
          alt: "Descriptive image",
          caption: "Figure: Add your image here",
          suggestion: "Upload or describe the image you want",
        },
      },
      {
        type: "text",
        data: {
          text: "Description of the visual content and its relevance to the presentation.",
          style: "body",
        },
      },
    ],
  },
];
