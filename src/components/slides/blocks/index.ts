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
import { ShapeBlock } from "./shape-block";
import { ToggleBlock } from "../gamma-mode/blocks/toggle-block";
import { EmbedBlock } from "../gamma-mode/blocks/embed-block";
import { NestedCardBlock } from "../gamma-mode/blocks/nested-card-block";
import { InfographicBlock } from "./infographic-block";
import { IllustrationBlock } from "./illustration-block";
import { MediaBlock } from "./media-block";

// ---------------------------------------------------------------------------
// Block Registry — maps each content block type to its renderer + metadata
// ---------------------------------------------------------------------------

export interface BlockRegistryEntry {
  /**
   * Display component. Uses `any` for the data prop because the registry is a
   * heterogeneous map — each block has its own typed data shape. Type safety is
   * enforced at call sites via the ContentBlock discriminated union.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: React.ComponentType<{ data: any; theme: ThemeConfig; scale?: number }>;
  /** Human-readable label */
  label: string;
  /** Icon name (Phosphor icon) */
  iconName: string;
  /** Factory for creating a new empty block of this type */
  defaultData: () => Record<string, unknown>;
  /** Category for the insert menu */
  category: "content" | "media" | "academic";
}

export const BLOCK_REGISTRY: Record<ContentBlock["type"], BlockRegistryEntry> = {
  text: {
    render: TextBlock,
    label: "Text",
    iconName: "TextAa",
    defaultData: () => ({ text: "Enter text...", style: "body" }),
    category: "content",
  },
  bullets: {
    render: BulletsBlock,
    label: "Bullets",
    iconName: "ListBullets",
    defaultData: () => ({ items: ["Item 1", "Item 2", "Item 3"], ordered: false }),
    category: "content",
  },
  quote: {
    render: QuoteBlock,
    label: "Quote",
    iconName: "Quotes",
    defaultData: () => ({ text: "Enter quote...", attribution: "Author" }),
    category: "content",
  },
  shape: {
    render: ShapeBlock,
    label: "Shape",
    iconName: "Rectangle",
    defaultData: () => ({
      shapeType: "rectangle",
      strokeWidth: 0,
      opacity: 100,
      textAlign: "center",
    }),
    category: "content",
  },
  citation: {
    render: CitationBlock,
    label: "Citation",
    iconName: "BookOpen",
    defaultData: () => ({ text: "Claim text", source: "Author et al., Year" }),
    category: "content",
  },
  image: {
    render: ImageBlock,
    label: "Image",
    iconName: "Image",
    defaultData: () => ({ alt: "Image description", suggestion: "Describe the ideal image" }),
    category: "media",
  },
  chart: {
    render: ChartBlock,
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
    render: TableBlock,
    label: "Table",
    iconName: "Table",
    defaultData: () => ({
      headers: ["Column 1", "Column 2", "Column 3"],
      rows: [["Row 1", "Data", "Data"], ["Row 2", "Data", "Data"]],
    }),
    category: "media",
  },
  math: {
    render: MathBlock,
    label: "Equation",
    iconName: "MathOperations",
    defaultData: () => ({ expression: "E = mc^2", displayMode: true }),
    category: "academic",
  },
  diagram: {
    render: DiagramBlock,
    label: "Diagram",
    iconName: "TreeStructure",
    defaultData: () => ({ syntax: "graph TD\n  A[Start] --> B[End]", diagramType: "flowchart" }),
    category: "academic",
  },
  code: {
    render: CodeBlock,
    label: "Code",
    iconName: "Code",
    defaultData: () => ({ code: "# Your code here\nprint('hello')", language: "python" }),
    category: "academic",
  },
  callout: {
    render: CalloutBlock,
    label: "Callout",
    iconName: "Megaphone",
    defaultData: () => ({ text: "Important information here", type: "info" }),
    category: "academic",
  },
  stat_result: {
    render: StatBlock,
    label: "Statistic",
    iconName: "ChartBar",
    defaultData: () => ({ label: "Metric", value: "42%", interpretation: "Brief interpretation" }),
    category: "academic",
  },
  bibliography: {
    render: BibliographyBlock,
    label: "Bibliography",
    iconName: "BookOpen",
    defaultData: () => ({ entries: [], style: "apa" }),
    category: "academic",
  },
  timeline: {
    render: TimelineBlock,
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
    render: DividerBlock,
    label: "Divider",
    iconName: "Minus",
    defaultData: () => ({ style: "solid" }),
    category: "content",
  },
  toggle: {
    render: ToggleBlock,
    label: "Toggle",
    iconName: "CaretCircleDown",
    defaultData: () => ({ title: "Click to expand", content: "Hidden content goes here", defaultOpen: false }),
    category: "content",
  },
  embed: {
    render: EmbedBlock,
    label: "Embed",
    iconName: "Globe",
    defaultData: () => ({ url: "", embedType: "generic" as const, aspectRatio: "16:9" as const }),
    category: "media",
  },
  nested_card: {
    render: NestedCardBlock,
    label: "Nested Card",
    iconName: "Cards",
    defaultData: () => ({
      title: "Sub-section",
      contentBlocks: [{ type: "text", data: { text: "Nested content", style: "body" } }],
      collapsed: true,
    }),
    category: "content",
  },
  infographic: {
    render: InfographicBlock,
    label: "Infographic",
    iconName: "PaintBrush",
    defaultData: () => ({
      infographicType: "process_flow",
      title: "Process Overview",
      items: [
        { label: "Step 1", description: "First step" },
        { label: "Step 2", description: "Second step" },
        { label: "Step 3", description: "Third step" },
      ],
      colorScheme: "theme",
    }),
    category: "media",
  },
  illustration: {
    render: IllustrationBlock,
    label: "Illustration",
    iconName: "Atom",
    defaultData: () => ({
      svgContent: "",
      caption: "",
      sourcePrompt: "",
      sourceBackend: "svg",
      alt: "Scientific illustration",
    }),
    category: "media",
  },
  media: {
    render: MediaBlock,
    label: "Media",
    iconName: "PlayCircle",
    defaultData: () => ({
      mediaType: "video",
      source: "url",
      url: "",
      autoplay: false,
      loop: false,
      muted: false,
    }),
    category: "media",
  },
};

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
export function createDefaultBlock(type: ContentBlock["type"], dataOverride?: Record<string, unknown>): ContentBlock {
  const entry = BLOCK_REGISTRY[type];
  const baseData = entry.defaultData();
  return { type, data: { ...baseData, ...(dataOverride ?? {}) } } as ContentBlock;
}
