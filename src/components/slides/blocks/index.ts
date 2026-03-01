import type { ContentBlock, ThemeConfig } from "@/types/presentation";
import { TextBlock } from "./text-block";
import { BulletsBlock } from "./bullets-block";
import { ChartBlock } from "./chart-block";
import { TableBlock } from "./table-block";
import { ImageBlock } from "./image-block";
import { MathBlock } from "./math-block";
import { DiagramBlock } from "./diagram-block";
import { CodeBlock } from "./code-block";
import { CitationBlock } from "./citation-block";
import { CalloutBlock } from "./callout-block";
import { StatBlock } from "./stat-block";
import { BibliographyBlock } from "./bibliography-block";
import { TimelineBlock } from "./timeline-block";
import { QuoteBlock } from "./quote-block";
import { DividerBlock } from "./divider-block";
import { ToggleBlock } from "../gamma-mode/blocks/toggle-block";

// ---------------------------------------------------------------------------
// Block Registry — maps each content block type to its renderer + metadata
// ---------------------------------------------------------------------------

export interface BlockRegistryEntry {
  /** Display component */
  render: React.ComponentType<{ data: Record<string, unknown>; theme: ThemeConfig; scale?: number }>;
  /** Human-readable label */
  label: string;
  /** Icon name (Phosphor icon) */
  iconName: string;
  /** Factory for creating a new empty block of this type */
  defaultData: () => Record<string, unknown>;
  /** Category for the insert menu */
  category: "content" | "media" | "academic";
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export const BLOCK_REGISTRY: Record<ContentBlock["type"], BlockRegistryEntry> = {
  text: {
    render: TextBlock as any,
    label: "Text",
    iconName: "TextAa",
    defaultData: () => ({ text: "Enter text...", style: "body" }),
    category: "content",
  },
  bullets: {
    render: BulletsBlock as any,
    label: "Bullets",
    iconName: "ListBullets",
    defaultData: () => ({ items: ["Item 1", "Item 2", "Item 3"], ordered: false }),
    category: "content",
  },
  quote: {
    render: QuoteBlock as any,
    label: "Quote",
    iconName: "Quotes",
    defaultData: () => ({ text: "Enter quote...", attribution: "Author" }),
    category: "content",
  },
  citation: {
    render: CitationBlock as any,
    label: "Citation",
    iconName: "BookOpen",
    defaultData: () => ({ text: "Claim text", source: "Author et al., Year" }),
    category: "content",
  },
  image: {
    render: ImageBlock as any,
    label: "Image",
    iconName: "Image",
    defaultData: () => ({ alt: "Image description", suggestion: "Describe the ideal image" }),
    category: "media",
  },
  chart: {
    render: ChartBlock as any,
    label: "Chart",
    iconName: "ChartBar",
    defaultData: () => ({
      chartType: "bar",
      title: "Chart Title",
      labels: ["A", "B", "C"],
      datasets: [{ label: "Series 1", data: [10, 20, 30] }],
    }),
    category: "media",
  },
  table: {
    render: TableBlock as any,
    label: "Table",
    iconName: "Table",
    defaultData: () => ({
      headers: ["Column 1", "Column 2", "Column 3"],
      rows: [["Row 1", "Data", "Data"], ["Row 2", "Data", "Data"]],
    }),
    category: "media",
  },
  math: {
    render: MathBlock as any,
    label: "Equation",
    iconName: "MathOperations",
    defaultData: () => ({ expression: "E = mc^2", displayMode: true }),
    category: "academic",
  },
  diagram: {
    render: DiagramBlock as any,
    label: "Diagram",
    iconName: "TreeStructure",
    defaultData: () => ({ syntax: "graph TD\n  A[Start] --> B[End]", diagramType: "flowchart" }),
    category: "academic",
  },
  code: {
    render: CodeBlock as any,
    label: "Code",
    iconName: "Code",
    defaultData: () => ({ code: "# Your code here\nprint('hello')", language: "python" }),
    category: "academic",
  },
  callout: {
    render: CalloutBlock as any,
    label: "Callout",
    iconName: "Megaphone",
    defaultData: () => ({ text: "Important information here", type: "info" }),
    category: "academic",
  },
  stat_result: {
    render: StatBlock as any,
    label: "Statistic",
    iconName: "ChartBar",
    defaultData: () => ({ label: "Metric", value: "42%", interpretation: "Brief interpretation" }),
    category: "academic",
  },
  bibliography: {
    render: BibliographyBlock as any,
    label: "Bibliography",
    iconName: "BookOpen",
    defaultData: () => ({ entries: [], style: "apa" }),
    category: "academic",
  },
  timeline: {
    render: TimelineBlock as any,
    label: "Timeline",
    iconName: "Clock",
    defaultData: () => ({
      entries: [
        { label: "Phase 1", date: "2024", description: "Description", status: "completed" },
        { label: "Phase 2", date: "2025", description: "Description", status: "in_progress" },
      ],
    }),
    category: "academic",
  },
  divider: {
    render: DividerBlock as any,
    label: "Divider",
    iconName: "Minus",
    defaultData: () => ({ style: "solid" }),
    category: "content",
  },
  toggle: {
    render: ToggleBlock as any,
    label: "Toggle",
    iconName: "CaretCircleDown",
    defaultData: () => ({ title: "Click to expand", content: "Hidden content goes here", defaultOpen: false }),
    category: "content",
  },
};
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Get all block types grouped by category for the insert menu.
 */
export function getBlocksByCategory(): Record<string, { type: ContentBlock["type"]; entry: BlockRegistryEntry }[]> {
  const groups: Record<string, { type: ContentBlock["type"]; entry: BlockRegistryEntry }[]> = {};

  for (const [type, entry] of Object.entries(BLOCK_REGISTRY)) {
    const cat = entry.category;
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push({ type: type as ContentBlock["type"], entry });
  }

  return groups;
}

/**
 * Creates a new ContentBlock with default data for the given type.
 */
export function createDefaultBlock(type: ContentBlock["type"]): ContentBlock {
  const entry = BLOCK_REGISTRY[type];
  return { type, data: entry.defaultData() } as ContentBlock;
}
