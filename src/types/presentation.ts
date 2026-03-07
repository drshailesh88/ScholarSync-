// ============================================================================
// Presentation Types — Content Block union, Theme config, AI interfaces
// V2: Citation-anchored academic engine with KaTeX, Mermaid, advanced layouts
// ============================================================================

// ---------------------------------------------------------------------------
// Content Blocks (stored as jsonb in slides.content_blocks)
// ---------------------------------------------------------------------------

/** Citation with full academic metadata and DOI linking */
export interface CitationData {
  text: string;
  source: string;
  paperId?: number;
  doi?: string;
  authors?: string[];
  year?: number;
  journal?: string;
  url?: string;
}

/** Chart with extended chart types */
export interface ChartData {
  chartType: "bar" | "line" | "pie" | "scatter" | "area" | "radar" | "funnel" | "forest_plot";
  title: string;
  labels: string[];
  datasets: { label: string; data: number[]; color?: string }[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  showLegend?: boolean;
}

/** Math block for KaTeX rendering */
export interface MathData {
  expression: string;
  displayMode: boolean;
  caption?: string;
}

/** Mermaid diagram block */
export interface DiagramData {
  syntax: string;
  diagramType: "flowchart" | "sequence" | "classDiagram" | "stateDiagram" | "erDiagram" | "gantt" | "pie" | "mindmap" | "timeline" | "prisma";
  caption?: string;
}

/** Code block with syntax highlighting */
export interface CodeData {
  code: string;
  language: string;
  caption?: string;
  showLineNumbers?: boolean;
}

/** Callout/highlight block for key findings, warnings, etc. */
export interface CalloutData {
  text: string;
  type: "info" | "warning" | "success" | "finding" | "limitation" | "methodology" | "clinical";
  title?: string;
}

/** Statistical result block for displaying p-values, CIs, etc. */
export interface StatResultData {
  label: string;
  value: string;
  ci?: string;
  pValue?: string;
  interpretation?: string;
}

/** Bibliography entry */
export interface BibliographyData {
  entries: {
    id: number | string;
    formatted: string;
    doi?: string;
    url?: string;
    citedOnSlides?: number[];
  }[];
  style: "apa" | "mla" | "chicago" | "vancouver" | "harvard";
}

/** Timeline entry for study timelines, Gantt-like displays */
export interface TimelineData {
  entries: {
    label: string;
    date?: string;
    description?: string;
    status?: "completed" | "in_progress" | "upcoming";
  }[];
  title?: string;
}

export interface TableCellMeta {
  colspan?: number;
  rowspan?: number;
  backgroundColor?: string;
  textColor?: string;
  textAlign?: "left" | "center" | "right";
  fontWeight?: "normal" | "bold";
  borderTop?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderRight?: string;
}

export interface TableStyleData {
  borderCollapse?: boolean;
  stripedRows?: boolean;
  headerBackground?: string;
  headerTextColor?: string;
  borderMode?: "all" | "horizontal" | "none" | "outer";
}

export interface TableData {
  headers: string[];
  rows: string[][];
  cellMeta?: Record<string, TableCellMeta>;
  tableStyle?: TableStyleData;
}

/** Shape block for geometric callouts and visual elements */
export interface ShapeData {
  shapeType:
    // Basic (existing)
    | "rectangle"
    | "rounded_rectangle"
    | "circle"
    | "ellipse"
    | "triangle"
    | "arrow"
    | "line"
    | "star"
    | "diamond"
    | "pentagon"
    | "hexagon"
    // Flowchart
    | "flowchart_process"
    | "flowchart_decision"
    | "flowchart_data"
    | "flowchart_document"
    | "flowchart_start_end"
    | "flowchart_predefined"
    | "flowchart_manual_input"
    | "flowchart_preparation"
    // Connectors
    | "connector_straight"
    | "connector_elbow"
    | "connector_curved"
    // Callouts
    | "callout_rect"
    | "callout_rounded"
    | "callout_cloud"
    // Arrows
    | "arrow_right"
    | "arrow_left"
    | "arrow_up"
    | "arrow_down"
    | "arrow_double"
    | "arrow_curved"
    | "chevron"
    // Brackets / Braces
    | "bracket_left"
    | "bracket_right"
    | "brace_left"
    | "brace_right";
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  text?: string;
  textAlign?: "left" | "center" | "right";
  textColor?: string;
  opacity?: number;
  rotation?: number;
  // Connector-specific properties
  connectorStart?: { x: number; y: number };
  connectorEnd?: { x: number; y: number };
  arrowStart?: "none" | "arrow" | "circle" | "diamond";
  arrowEnd?: "none" | "arrow" | "circle" | "diamond";
  connectorStyle?: "straight" | "elbow" | "curved";
  connectedToBlock?: { startBlockIndex?: number; endBlockIndex?: number };
}

/** Toggle/accordion block for expandable content sections */
export interface ToggleData {
  title: string;
  content: string; // HTML content inside the toggle
  defaultOpen?: boolean;
}

/** Embed block for embedding external content (YouTube, Figma, Google Sheets, etc.) */
export interface EmbedData {
  url: string;
  embedType?: "youtube" | "vimeo" | "figma" | "google_sheets" | "google_docs" | "twitter" | "generic";
  title?: string;
  aspectRatio?: "16:9" | "4:3" | "1:1";
}

/** Nested card block for drill-down sub-sections within a parent card */
export interface NestedCardData {
  title: string;
  contentBlocks: ContentBlock[];
  collapsed?: boolean;
}

export interface ImageCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ImageFilters {
  brightness?: number;   // 0-200, default 100 (percentage)
  contrast?: number;     // 0-200, default 100
  saturation?: number;   // 0-200, default 100
  blur?: number;         // 0-20, default 0 (px)
  grayscale?: number;    // 0-100, default 0 (percentage)
  sepia?: number;        // 0-100, default 0 (percentage)
  hueRotate?: number;    // 0-360, default 0 (degrees)
  opacity?: number;      // 0-100, default 100
}

export interface ImageData {
  url?: string;
  alt: string;
  caption?: string;
  suggestion?: string;
  lockAspectRatio?: boolean;
  crop?: ImageCrop;
  filters?: ImageFilters;
}

/** SVG infographic block — Napkin-style visual generation */
export type InfographicType =
  | "process_flow"      // sequential steps with arrows
  | "comparison"        // side-by-side columns with icons
  | "hierarchy"         // tree structure top-down
  | "cycle"             // circular/loop process
  | "funnel"            // narrowing stages
  | "pyramid"           // layered triangle
  | "venn"              // overlapping circles (2-3)
  | "matrix"            // 2x2 quadrant grid
  | "radial"            // central node with spokes
  | "stats_row"         // horizontal stat cards with icons
  | "checklist"         // visual checklist with status
  | "cause_effect";     // fishbone/Ishikawa style

export interface InfographicItem {
  label: string;
  description?: string;
  value?: string;
  icon?: string;          // emoji or icon keyword
  color?: string;         // hex color override
  status?: "done" | "active" | "pending";
}

export interface InfographicData {
  infographicType: InfographicType;
  title?: string;
  items: InfographicItem[];
  caption?: string;
  colorScheme?: "theme" | "blue" | "green" | "purple" | "orange" | "rainbow";
}

/** Audio/video media block */
export interface MediaData {
  mediaType: "video" | "audio";
  source: "upload" | "url";
  url?: string;
  mimeType?: string;
  posterUrl?: string;
  title?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  startTime?: number;
  endTime?: number;
}

/** Scientific illustration block from FINNISH integration */
export interface IllustrationData {
  svgContent: string;
  width?: number;
  height?: number;
  caption?: string;
  sourcePrompt?: string;
  sourceBackend?: "mermaid" | "svg" | "ai-image" | "manual";
  domain?: string;
  alt?: string;
}

/** Exit animation types */
export type ExitAnimationType =
  | "fadeOut" | "slideUp" | "slideDown" | "slideLeft" | "slideRight"
  | "scaleOut" | "shrinkOut" | "zoomOut" | "dissolveOut" | "none";

/** Emphasis animation types */
export type EmphasisAnimationType =
  | "pulse" | "bounce" | "shake" | "grow" | "spin" | "none";

/** Trigger type for animation start — matches PowerPoint's model */
export type AnimationTrigger = "onClick" | "withPrevious" | "afterPrevious" | "auto";

/** Animation config for per-block reveal in presenter mode */
export interface BlockAnimation {
  type:
    // Entrance (build-in)
    | "fadeIn" | "slideUp" | "slideDown" | "slideLeft" | "slideRight"
    | "scaleIn" | "scaleUp" | "bounceIn" | "flipInX" | "flipInY"
    | "rotateIn" | "zoomIn" | "dissolve" | "wipeRight" | "wipeDown"
    | "typewriter"
    // None
    | "none";
  delay: number;      // seconds delay before this block animates in
  duration: number;    // seconds for the animation
  order: number;       // sequential order (1, 2, 3...)
  trigger?: AnimationTrigger; // default: "onClick"
  exit?: {
    type: ExitAnimationType;
    delay: number;     // delay after entrance completes
    duration: number;
  };
  emphasis?: {
    type: EmphasisAnimationType;
    delay: number;     // delay after entrance completes
    duration: number;
    repeat?: number;   // how many times to repeat (default 1)
  };
}

export type AnimationPresetKey = "sequential_build" | "fade_all" | "stagger" | "results_reveal" | "slide_cascade" | "zoom_focus" | "dramatic_reveal" | "none";

/** Positioning data for freeform layout blocks */
export interface BlockPosition {
  x: number;      // percentage of slide width (0-100)
  y: number;      // percentage of slide height (0-100)
  width: number;  // percentage of slide width
  height: number; // percentage of slide height
}

export interface GradientStop {
  color: string;
  position: number; // 0-100
}

export interface GradientConfig {
  type: "linear" | "radial";
  angle: number; // degrees, 0-360 (for linear)
  stops: GradientStop[];
}

export interface CardBackground {
  color?: string;
  gradientEnabled?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
  gradientDirection?: "top-to-bottom" | "left-to-right" | "diagonal";
  gradient?: GradientConfig;
  imageUrl?: string;
  imagePosition?:
    | "cover"
    | "contain"
    | "top"
    | "center"
    | "bottom"
    | "none"
    | "left"
    | "right"
    | "background";
  overlayType?: "none" | "frosted" | "faded" | "clear";
  overlayIntensity?: number; // 0-100
  overlayColor?: string;
}

export interface BlockShadow {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread?: number;
  color: string;
}

export interface BlockBorder {
  width: number;
  color: string;
  style: "solid" | "dashed" | "dotted";
  radius: number;
}

type ContentBlockBase = {
  animation?: BlockAnimation;
  /** Optional positioning for freeform layout */
  position?: BlockPosition;
  /** Z-index for layering in freeform layout */
  zIndex?: number;
  /** Placeholder binding when the block was inserted from a slide master placeholder */
  placeholderId?: string;
  /** Optional fixed-key identifier for master-level fixed elements */
  masterFixedKey?: string;
  /** Rotation in degrees (0-360) */
  rotation?: number;
  /** Horizontal transform scale (set to -1 for horizontal flip) */
  scaleX?: number;
  /** Vertical transform scale (set to -1 for vertical flip) */
  scaleY?: number;
  /** Whether the block is locked (prevents move, resize, edit, delete) */
  locked?: boolean;
  /** Opacity 0-100, default 100 */
  opacity?: number;
  /** Box shadow */
  shadow?: BlockShadow;
  /** Border */
  border?: BlockBorder;
};

/** Shared text effect options for text blocks, titles, and subtitles */
export interface TextEffects {
  textShadow?: {
    offsetX: number;   // px
    offsetY: number;   // px
    blur: number;      // px
    color: string;     // hex or rgba
  };
  textOutline?: {
    width: number;     // px (0.5 to 3)
    color: string;     // hex
  };
  textTransform?: "none" | "uppercase" | "lowercase" | "capitalize";
  letterSpacing?: number;  // em units (-0.05 to 0.3)
}

export type ContentBlock =
  | (ContentBlockBase & {
      type: "text";
      data: {
        text: string;
        style?: "title" | "subtitle" | "body" | "caption";
        fontFamily?: string;
        fontSize?: string;
        color?: string;
        lineHeight?: number;
        paragraphSpacing?: number;
        textShadow?: TextEffects["textShadow"];
        textOutline?: TextEffects["textOutline"];
        textTransform?: TextEffects["textTransform"];
        letterSpacing?: TextEffects["letterSpacing"];
      };
    })
  | (ContentBlockBase & { type: "bullets"; data: { items: string[]; ordered?: boolean } })
  | (ContentBlockBase & { type: "image"; data: ImageData; figureLabel?: string })
  | (ContentBlockBase & { type: "chart"; data: ChartData; figureLabel?: string; caption?: string })
  | (ContentBlockBase & { type: "table"; data: TableData; figureLabel?: string; caption?: string })
  | (ContentBlockBase & { type: "citation"; data: CitationData })
  | (ContentBlockBase & { type: "quote"; data: { text: string; attribution: string } })
  // V2: New content block types
  | (ContentBlockBase & { type: "math"; data: MathData })
  | (ContentBlockBase & { type: "diagram"; data: DiagramData; figureLabel?: string })
  | (ContentBlockBase & { type: "code"; data: CodeData })
  | (ContentBlockBase & { type: "callout"; data: CalloutData })
  | (ContentBlockBase & { type: "stat_result"; data: StatResultData })
  | (ContentBlockBase & { type: "bibliography"; data: BibliographyData })
  | (ContentBlockBase & { type: "timeline"; data: TimelineData })
  | (ContentBlockBase & { type: "shape"; data: ShapeData })
  | (ContentBlockBase & { type: "divider"; data: { style?: "solid" | "dashed" | "gradient" } })
  | (ContentBlockBase & { type: "toggle"; data: ToggleData })
  | (ContentBlockBase & { type: "embed"; data: EmbedData })
  | (ContentBlockBase & { type: "nested_card"; data: NestedCardData })
  // V3: Visual generation blocks
  | (ContentBlockBase & { type: "infographic"; data: InfographicData; figureLabel?: string })
  // V4: Scientific illustration blocks (FINNISH integration)
  | (ContentBlockBase & { type: "illustration"; data: IllustrationData; figureLabel?: string })
  // V5: Audio/video media blocks
  | (ContentBlockBase & { type: "media"; data: MediaData });

// ---------------------------------------------------------------------------
// Theme Config (stored as jsonb in slide_decks.theme_config)
// ---------------------------------------------------------------------------
export interface ThemeConfig {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontFamily?: string;
  headingFontFamily?: string;
  // V2: Extended theme properties
  surfaceColor?: string;
  borderColor?: string;
  codeBackground?: string;
  calloutBackground?: string;
  gradientFrom?: string;
  gradientTo?: string;
  slideTransition?: "none" | "fade" | "slide" | "zoom" | "morph";
  // V3: Theme customizer properties
  borderRadius?: "none" | "sm" | "md" | "lg" | "xl";
  borderStyle?: "none" | "subtle" | "strong";
  shadowStyle?: "none" | "subtle" | "medium" | "dramatic";
  cardSpacing?: "compact" | "comfortable" | "spacious";
}

// V2: Institution/Brand Kit
export interface InstitutionKit {
  id: number;
  name: string;
  logoUrl?: string;
  logoPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily?: string;
  headingFontFamily?: string;
  citationStyle: "apa" | "mla" | "chicago" | "vancouver" | "harvard";
  footerText?: string;
}

export const PRESET_THEMES: Record<string, ThemeConfig> = {
  modern: {
    name: "Modern",
    primaryColor: "#4F46E5",
    secondaryColor: "#7C3AED",
    backgroundColor: "#FFFFFF",
    textColor: "#1F2937",
    accentColor: "#06B6D4",
    surfaceColor: "#F8FAFC",
    borderColor: "#E2E8F0",
    codeBackground: "#1E1E2E",
    fontFamily: "Inter, sans-serif",
    headingFontFamily: "Inter, sans-serif",
  },
  dark: {
    name: "Dark",
    primaryColor: "#3B82F6",
    secondaryColor: "#8B5CF6",
    backgroundColor: "#0F172A",
    textColor: "#F8FAFC",
    accentColor: "#22D3EE",
    surfaceColor: "#1E293B",
    borderColor: "#334155",
    codeBackground: "#0D1117",
    fontFamily: "Inter, sans-serif",
    headingFontFamily: "Inter, sans-serif",
  },
  thesis: {
    name: "Thesis",
    primaryColor: "#1E3A5F",
    secondaryColor: "#44403C",
    backgroundColor: "#FAFAF9",
    textColor: "#1C1917",
    accentColor: "#B45309",
    surfaceColor: "#F5F5F4",
    borderColor: "#D6D3D1",
    codeBackground: "#292524",
    fontFamily: "Georgia, serif",
    headingFontFamily: "Georgia, serif",
  },
  vibrant: {
    name: "Vibrant",
    primaryColor: "#0EA5E9",
    secondaryColor: "#F97316",
    backgroundColor: "#FFFFFF",
    textColor: "#0F172A",
    accentColor: "#10B981",
    surfaceColor: "#F0F9FF",
    borderColor: "#BAE6FD",
    codeBackground: "#1E293B",
    fontFamily: "Inter, sans-serif",
    headingFontFamily: "Inter, sans-serif",
    gradientFrom: "#0EA5E9",
    gradientTo: "#8B5CF6",
  },
  academic: {
    name: "Academic",
    primaryColor: "#1D4ED8",
    secondaryColor: "#9333EA",
    backgroundColor: "#FFFFFF",
    textColor: "#111827",
    accentColor: "#DC2626",
    surfaceColor: "#F9FAFB",
    borderColor: "#E5E7EB",
    codeBackground: "#1F2937",
    fontFamily: "Times New Roman, serif",
    headingFontFamily: "Arial, sans-serif",
  },
  minimal: {
    name: "Minimal",
    primaryColor: "#18181B",
    secondaryColor: "#71717A",
    backgroundColor: "#FFFFFF",
    textColor: "#18181B",
    accentColor: "#3B82F6",
    surfaceColor: "#FAFAFA",
    borderColor: "#E4E4E7",
    codeBackground: "#18181B",
    fontFamily: "Inter, sans-serif",
    headingFontFamily: "Inter, sans-serif",
  },
  nature: {
    name: "Nature",
    primaryColor: "#166534",
    secondaryColor: "#15803D",
    backgroundColor: "#F0FDF4",
    textColor: "#14532D",
    accentColor: "#CA8A04",
    surfaceColor: "#ECFDF5",
    borderColor: "#BBF7D0",
    codeBackground: "#14532D",
    fontFamily: "Inter, sans-serif",
    headingFontFamily: "Inter, sans-serif",
  },
  clinical: {
    name: "Clinical",
    primaryColor: "#0369A1",
    secondaryColor: "#0891B2",
    backgroundColor: "#F0F9FF",
    textColor: "#0C4A6E",
    accentColor: "#E11D48",
    surfaceColor: "#E0F2FE",
    borderColor: "#BAE6FD",
    codeBackground: "#0C4A6E",
    fontFamily: "Helvetica, Arial, sans-serif",
    headingFontFamily: "Helvetica, Arial, sans-serif",
  },
  // V2: New premium themes
  lancet: {
    name: "Lancet",
    primaryColor: "#C41E3A",
    secondaryColor: "#1B1B1B",
    backgroundColor: "#FFFFFF",
    textColor: "#1B1B1B",
    accentColor: "#C41E3A",
    surfaceColor: "#FEF2F2",
    borderColor: "#FECACA",
    codeBackground: "#1B1B1B",
    fontFamily: "Georgia, serif",
    headingFontFamily: "Georgia, serif",
  },
  nejm: {
    name: "NEJM",
    primaryColor: "#8B0000",
    secondaryColor: "#2C3E50",
    backgroundColor: "#FFFDF7",
    textColor: "#2C3E50",
    accentColor: "#8B0000",
    surfaceColor: "#FFF8E7",
    borderColor: "#E8E0D0",
    codeBackground: "#2C3E50",
    fontFamily: "Palatino, Georgia, serif",
    headingFontFamily: "Palatino, Georgia, serif",
  },
  nature_journal: {
    name: "Nature Journal",
    primaryColor: "#003366",
    secondaryColor: "#336699",
    backgroundColor: "#FFFFFF",
    textColor: "#333333",
    accentColor: "#CC0000",
    surfaceColor: "#F5F7FA",
    borderColor: "#D1D5DB",
    codeBackground: "#1A1A2E",
    fontFamily: "Helvetica Neue, Arial, sans-serif",
    headingFontFamily: "Helvetica Neue, Arial, sans-serif",
  },
  ieee: {
    name: "IEEE",
    primaryColor: "#00629B",
    secondaryColor: "#4B4B4B",
    backgroundColor: "#FFFFFF",
    textColor: "#333333",
    accentColor: "#00629B",
    surfaceColor: "#F0F4F8",
    borderColor: "#CBD5E0",
    codeBackground: "#1E293B",
    fontFamily: "Times New Roman, serif",
    headingFontFamily: "Arial, sans-serif",
  },
  midnight: {
    name: "Midnight",
    primaryColor: "#818CF8",
    secondaryColor: "#C084FC",
    backgroundColor: "#0F0F23",
    textColor: "#E2E8F0",
    accentColor: "#F472B6",
    surfaceColor: "#1A1A3E",
    borderColor: "#2D2D5E",
    codeBackground: "#0D0D1F",
    gradientFrom: "#818CF8",
    gradientTo: "#C084FC",
    fontFamily: "Inter, sans-serif",
    headingFontFamily: "Inter, sans-serif",
  },
  gradient_blue: {
    name: "Gradient Blue",
    primaryColor: "#2563EB",
    secondaryColor: "#7C3AED",
    backgroundColor: "#EFF6FF",
    textColor: "#1E293B",
    accentColor: "#F59E0B",
    surfaceColor: "#DBEAFE",
    borderColor: "#BFDBFE",
    codeBackground: "#1E3A5F",
    gradientFrom: "#2563EB",
    gradientTo: "#7C3AED",
    fontFamily: "Inter, sans-serif",
    headingFontFamily: "Inter, sans-serif",
  },
  executive: {
    name: "Executive",
    primaryColor: "#1B2A4A",
    secondaryColor: "#C5A572",
    backgroundColor: "#FFFFFF",
    textColor: "#1B2A4A",
    accentColor: "#C5A572",
    surfaceColor: "#F7F5F2",
    borderColor: "#D4CFC7",
    codeBackground: "#1B2A4A",
    calloutBackground: "#F0EDE6",
    gradientFrom: "#1B2A4A",
    gradientTo: "#C5A572",
    fontFamily: "Georgia, serif",
    headingFontFamily: "Garamond, Georgia, serif",
    borderRadius: "sm",
    borderStyle: "subtle",
    shadowStyle: "subtle",
    cardSpacing: "comfortable",
  },
  startup: {
    name: "Startup",
    primaryColor: "#7C3AED",
    secondaryColor: "#FF6B6B",
    backgroundColor: "#FFFFFF",
    textColor: "#1A1A2E",
    accentColor: "#FF6B6B",
    surfaceColor: "#FAF5FF",
    borderColor: "#E9D5FF",
    codeBackground: "#1A1A2E",
    calloutBackground: "#F3E8FF",
    gradientFrom: "#7C3AED",
    gradientTo: "#FF6B6B",
    fontFamily: "Inter, sans-serif",
    headingFontFamily: "Inter, sans-serif",
    borderRadius: "lg",
    borderStyle: "none",
    shadowStyle: "medium",
    cardSpacing: "spacious",
  },
  consulting: {
    name: "Consulting",
    primaryColor: "#003A70",
    secondaryColor: "#5BA4CF",
    backgroundColor: "#FFFFFF",
    textColor: "#1A2332",
    accentColor: "#0077B6",
    surfaceColor: "#F5F8FB",
    borderColor: "#D0DCE8",
    codeBackground: "#1A2332",
    calloutBackground: "#EBF2FA",
    gradientFrom: "#003A70",
    gradientTo: "#5BA4CF",
    fontFamily: "Helvetica, Arial, sans-serif",
    headingFontFamily: "Helvetica, Arial, sans-serif",
    borderRadius: "sm",
    borderStyle: "strong",
    shadowStyle: "none",
    cardSpacing: "compact",
  },
  harvard: {
    name: "Harvard",
    primaryColor: "#A51C30",
    secondaryColor: "#1E1E1E",
    backgroundColor: "#FFF9F0",
    textColor: "#1E1E1E",
    accentColor: "#A51C30",
    surfaceColor: "#FFF3E0",
    borderColor: "#E0D5C5",
    codeBackground: "#1E1E1E",
    calloutBackground: "#FDEBD0",
    gradientFrom: "#A51C30",
    gradientTo: "#1E1E1E",
    fontFamily: "Georgia, serif",
    headingFontFamily: "Georgia, serif",
    borderRadius: "sm",
    borderStyle: "subtle",
    shadowStyle: "subtle",
    cardSpacing: "comfortable",
  },
  oxford: {
    name: "Oxford",
    primaryColor: "#002147",
    secondaryColor: "#B8860B",
    backgroundColor: "#FFFFFF",
    textColor: "#002147",
    accentColor: "#B8860B",
    surfaceColor: "#F5F7FA",
    borderColor: "#C8CED8",
    codeBackground: "#002147",
    calloutBackground: "#EDF0F5",
    gradientFrom: "#002147",
    gradientTo: "#B8860B",
    fontFamily: "Palatino, Georgia, serif",
    headingFontFamily: "Palatino, Georgia, serif",
    borderRadius: "sm",
    borderStyle: "subtle",
    shadowStyle: "subtle",
    cardSpacing: "comfortable",
  },
  medical: {
    name: "Medical",
    primaryColor: "#008080",
    secondaryColor: "#FF6F61",
    backgroundColor: "#FFFFFF",
    textColor: "#1A2332",
    accentColor: "#FF6F61",
    surfaceColor: "#F0FAFA",
    borderColor: "#B2DFDB",
    codeBackground: "#1A2332",
    calloutBackground: "#E0F2F1",
    gradientFrom: "#008080",
    gradientTo: "#FF6F61",
    fontFamily: "Helvetica, Arial, sans-serif",
    headingFontFamily: "Helvetica, Arial, sans-serif",
    borderRadius: "md",
    borderStyle: "subtle",
    shadowStyle: "subtle",
    cardSpacing: "comfortable",
  },
  aurora: {
    name: "Aurora",
    primaryColor: "#A855F7",
    secondaryColor: "#22D3EE",
    backgroundColor: "#1A1033",
    textColor: "#E8E0F0",
    accentColor: "#22D3EE",
    surfaceColor: "#251845",
    borderColor: "#3D2A5E",
    codeBackground: "#120B22",
    calloutBackground: "#2E1F50",
    gradientFrom: "#A855F7",
    gradientTo: "#22D3EE",
    fontFamily: "Inter, sans-serif",
    headingFontFamily: "Inter, sans-serif",
    borderRadius: "lg",
    borderStyle: "subtle",
    shadowStyle: "dramatic",
    cardSpacing: "spacious",
  },
  terracotta: {
    name: "Terracotta",
    primaryColor: "#C2704F",
    secondaryColor: "#8B6F47",
    backgroundColor: "#FDF6EC",
    textColor: "#3D2B1F",
    accentColor: "#C2704F",
    surfaceColor: "#FAF0E0",
    borderColor: "#E0D0B8",
    codeBackground: "#3D2B1F",
    calloutBackground: "#F5E8D4",
    gradientFrom: "#C2704F",
    gradientTo: "#8B6F47",
    fontFamily: "Georgia, serif",
    headingFontFamily: "Playfair Display, Georgia, serif",
    borderRadius: "md",
    borderStyle: "subtle",
    shadowStyle: "subtle",
    cardSpacing: "comfortable",
  },
  ocean_deep: {
    name: "Ocean Deep",
    primaryColor: "#00BCD4",
    secondaryColor: "#0097A7",
    backgroundColor: "#0A1628",
    textColor: "#E0F0FF",
    accentColor: "#00BCD4",
    surfaceColor: "#0F2035",
    borderColor: "#1A3550",
    codeBackground: "#060E1A",
    calloutBackground: "#132840",
    gradientFrom: "#00BCD4",
    gradientTo: "#0097A7",
    fontFamily: "Inter, sans-serif",
    headingFontFamily: "Inter, sans-serif",
    borderRadius: "md",
    borderStyle: "subtle",
    shadowStyle: "medium",
    cardSpacing: "comfortable",
  },
  swiss: {
    name: "Swiss",
    primaryColor: "#000000",
    secondaryColor: "#E30613",
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    accentColor: "#E30613",
    surfaceColor: "#F5F5F5",
    borderColor: "#D4D4D4",
    codeBackground: "#1A1A1A",
    calloutBackground: "#F0F0F0",
    gradientFrom: "#000000",
    gradientTo: "#E30613",
    fontFamily: "Helvetica, Arial, sans-serif",
    headingFontFamily: "Helvetica, Arial, sans-serif",
    borderRadius: "none",
    borderStyle: "strong",
    shadowStyle: "none",
    cardSpacing: "compact",
  },
  paper: {
    name: "Paper",
    primaryColor: "#4A4A4A",
    secondaryColor: "#787878",
    backgroundColor: "#FFFDF5",
    textColor: "#333333",
    accentColor: "#6B6B6B",
    surfaceColor: "#FAF8F0",
    borderColor: "#E0DDD0",
    codeBackground: "#2D2D2D",
    calloutBackground: "#F5F2E8",
    gradientFrom: "#4A4A4A",
    gradientTo: "#787878",
    fontFamily: "Georgia, serif",
    headingFontFamily: "Georgia, serif",
    borderRadius: "sm",
    borderStyle: "subtle",
    shadowStyle: "none",
    cardSpacing: "comfortable",
  },
  ink: {
    name: "Ink",
    primaryColor: "#F5F5F5",
    secondaryColor: "#A0A0A0",
    backgroundColor: "#1A1A1A",
    textColor: "#F5F5F5",
    accentColor: "#C0C0C0",
    surfaceColor: "#252525",
    borderColor: "#3A3A3A",
    codeBackground: "#111111",
    calloutBackground: "#2A2A2A",
    gradientFrom: "#F5F5F5",
    gradientTo: "#A0A0A0",
    fontFamily: "Georgia, serif",
    headingFontFamily: "Georgia, serif",
    borderRadius: "sm",
    borderStyle: "subtle",
    shadowStyle: "subtle",
    cardSpacing: "comfortable",
  },
};

// ---------------------------------------------------------------------------
// Slide Layout definitions
// ---------------------------------------------------------------------------
export type SlideLayout =
  | "title_slide"
  | "title_content"
  | "two_column"
  | "section_header"
  | "image_text"
  | "chart_slide"
  | "table_slide"
  | "quote_slide"
  | "comparison"
  | "blank"
  // V2: New academic layouts
  | "bibliography_slide"
  | "methodology"
  | "results_summary"
  | "key_findings"
  | "timeline_slide"
  | "stat_overview"
  | "three_column"
  | "big_number"
  // V3: Freeform layout — blocks use their position field
  | "freeform";

export interface SlideMaster {
  id: string;
  name: string;
  layout: SlideLayout;
  fixedBlocks: ContentBlock[]; // Blocks that appear on every slide using this master
  placeholders: {
    id: string;
    label: string;
    position: BlockPosition;
    defaultType: ContentBlock["type"];
  }[];
  background?: CardBackground;
  showSlideNumber?: boolean;
  showFooter?: boolean;
}

// V2: Extended audience types
export type AudienceType =
  | "thesis_defense"
  | "conference"
  | "journal_club"
  | "classroom"
  | "general"
  | "grant_presentation"
  | "poster_session"
  | "systematic_review"
  | "patient_case"
  | "grand_rounds";

export type GenerationStatus = "pending" | "processing" | "completed" | "failed";

// ---------------------------------------------------------------------------
// V2: Academic Template Definitions
// ---------------------------------------------------------------------------
export interface AcademicTemplate {
  id: string;
  name: string;
  description: string;
  audienceType: AudienceType;
  defaultSlideCount: number;
  structure: TemplateSlotDefinition[];
  icon: string; // Phosphor icon name
  estimatedDuration?: string;
}

export interface TemplateSlotDefinition {
  layout: SlideLayout;
  role: string;
  title: string;
  guidance: string;
  required: boolean;
  contentHints?: string[];
}

export const ACADEMIC_TEMPLATES: Record<string, AcademicTemplate> = {
  thesis_defense: {
    id: "thesis_defense",
    name: "Thesis Defense",
    description: "Formal defense presentation with committee-ready structure",
    audienceType: "thesis_defense",
    defaultSlideCount: 22,
    estimatedDuration: "45-60 min",
    icon: "GraduationCap",
    structure: [
      { layout: "title_slide", role: "title", title: "Title & Author", guidance: "Include thesis title, author name, institution, committee members, date", required: true },
      { layout: "title_content", role: "committee", title: "Committee Members", guidance: "List committee members with titles and affiliations", required: true },
      { layout: "section_header", role: "background_header", title: "Background", guidance: "Transition to background context", required: true },
      { layout: "title_content", role: "background", title: "Background & Significance", guidance: "Establish the research context and why this matters", required: true },
      { layout: "title_content", role: "literature", title: "Literature Review", guidance: "Key prior work with citations, identify the gap", required: true },
      { layout: "title_content", role: "research_questions", title: "Research Questions / Hypotheses", guidance: "State RQs clearly, with hypotheses if applicable", required: true },
      { layout: "section_header", role: "methods_header", title: "Methodology", guidance: "Transition to methods", required: true },
      { layout: "methodology", role: "study_design", title: "Study Design", guidance: "Diagram of study design, population, setting", required: true },
      { layout: "title_content", role: "data_collection", title: "Data Collection", guidance: "Instruments, measures, procedures", required: true },
      { layout: "title_content", role: "analysis", title: "Statistical Analysis", guidance: "Analysis plan, software, significance levels", required: true },
      { layout: "section_header", role: "results_header", title: "Results", guidance: "Transition to results", required: true },
      { layout: "table_slide", role: "demographics", title: "Sample Characteristics", guidance: "Demographics table, inclusion/exclusion counts", required: true },
      { layout: "chart_slide", role: "primary_results", title: "Primary Outcomes", guidance: "Key findings with visualizations", required: true },
      { layout: "results_summary", role: "secondary_results", title: "Secondary Outcomes", guidance: "Additional findings, subgroup analyses", required: false },
      { layout: "stat_overview", role: "statistical_summary", title: "Statistical Summary", guidance: "Key statistics, p-values, confidence intervals, effect sizes", required: true },
      { layout: "section_header", role: "discussion_header", title: "Discussion", guidance: "Transition to discussion", required: true },
      { layout: "title_content", role: "interpretation", title: "Interpretation", guidance: "What do the results mean? Compare to prior literature", required: true },
      { layout: "two_column", role: "strengths_limitations", title: "Strengths & Limitations", guidance: "Balanced assessment of study quality", required: true },
      { layout: "title_content", role: "implications", title: "Clinical / Practical Implications", guidance: "How findings apply to practice", required: true },
      { layout: "title_content", role: "future_work", title: "Future Directions", guidance: "Next steps for research", required: false },
      { layout: "key_findings", role: "conclusions", title: "Conclusions", guidance: "3-5 key takeaways, answer the research questions", required: true },
      { layout: "bibliography_slide", role: "references", title: "References", guidance: "Auto-generated bibliography from cited sources", required: true },
    ],
  },
  conference_talk: {
    id: "conference_talk",
    name: "Conference Talk",
    description: "Concise, high-impact presentation for academic conferences",
    audienceType: "conference",
    defaultSlideCount: 12,
    estimatedDuration: "15 min",
    icon: "Microphone",
    structure: [
      { layout: "title_slide", role: "title", title: "Title & Authors", guidance: "Title, all authors with affiliations, conference name", required: true },
      { layout: "title_content", role: "hook", title: "The Problem", guidance: "Open with a compelling hook -- a statistic, question, or clinical scenario", required: true },
      { layout: "title_content", role: "background", title: "Background", guidance: "Brief context, what we know, what's missing (2 slides max)", required: true },
      { layout: "title_content", role: "objective", title: "Study Objective", guidance: "One clear research question or aim", required: true },
      { layout: "methodology", role: "methods", title: "Methods", guidance: "Concise study design diagram, key methods", required: true },
      { layout: "chart_slide", role: "main_result", title: "Key Result", guidance: "Primary finding with strong visualization", required: true },
      { layout: "results_summary", role: "additional_results", title: "Additional Findings", guidance: "Secondary outcomes, supporting data", required: false },
      { layout: "table_slide", role: "data_table", title: "Results Table", guidance: "Key data in tabular format", required: false },
      { layout: "title_content", role: "discussion", title: "What This Means", guidance: "Interpretation and clinical significance", required: true },
      { layout: "two_column", role: "context", title: "In Context", guidance: "How findings compare to prior work", required: false },
      { layout: "key_findings", role: "takeaways", title: "Take-Home Messages", guidance: "3-4 key points the audience should remember", required: true },
      { layout: "bibliography_slide", role: "references", title: "References", guidance: "Auto-generated from citations", required: true },
    ],
  },
  journal_club: {
    id: "journal_club",
    name: "Journal Club",
    description: "Critical analysis presentation for reviewing a published paper",
    audienceType: "journal_club",
    defaultSlideCount: 10,
    estimatedDuration: "20-30 min",
    icon: "BookOpen",
    structure: [
      { layout: "title_slide", role: "title", title: "Paper Overview", guidance: "Full paper title, authors, journal, year, DOI", required: true },
      { layout: "title_content", role: "background", title: "Background & Rationale", guidance: "Why was this study done? What gap does it address?", required: true },
      { layout: "title_content", role: "pico", title: "PICO / Research Question", guidance: "Population, Intervention, Comparison, Outcome", required: true },
      { layout: "methodology", role: "methods", title: "Study Design & Methods", guidance: "Design type, sample, setting, key methods", required: true },
      { layout: "chart_slide", role: "results", title: "Key Results", guidance: "Primary and secondary outcomes with data", required: true },
      { layout: "table_slide", role: "results_table", title: "Results Data", guidance: "Key results table from the paper", required: false },
      { layout: "two_column", role: "strengths_weaknesses", title: "Strengths & Weaknesses", guidance: "Critical appraisal: internal/external validity", required: true },
      { layout: "title_content", role: "applicability", title: "Clinical Applicability", guidance: "Does this change practice? For whom?", required: true },
      { layout: "key_findings", role: "bottom_line", title: "Bottom Line", guidance: "Key conclusions and level of evidence", required: true },
      { layout: "title_content", role: "discussion_questions", title: "Discussion Questions", guidance: "Questions for group discussion", required: true },
    ],
  },
  grant_presentation: {
    id: "grant_presentation",
    name: "Grant Presentation",
    description: "Persuasive presentation for funding applications",
    audienceType: "grant_presentation",
    defaultSlideCount: 15,
    estimatedDuration: "20-30 min",
    icon: "CurrencyDollar",
    structure: [
      { layout: "title_slide", role: "title", title: "Project Title", guidance: "Project name, PI name, institution, funding agency", required: true },
      { layout: "big_number", role: "impact", title: "The Problem", guidance: "Start with a compelling statistic showing the scale of the problem", required: true },
      { layout: "title_content", role: "significance", title: "Significance", guidance: "Why does this research matter? What's the burden?", required: true },
      { layout: "title_content", role: "gap", title: "Knowledge Gap", guidance: "What don't we know? Why is current evidence insufficient?", required: true },
      { layout: "title_content", role: "innovation", title: "Innovation", guidance: "What's novel about your approach? How is it different?", required: true },
      { layout: "title_content", role: "objectives", title: "Specific Aims", guidance: "2-3 clear, measurable aims", required: true },
      { layout: "methodology", role: "approach", title: "Research Approach", guidance: "Study design, methods, analysis plan", required: true },
      { layout: "title_content", role: "preliminary", title: "Preliminary Data", guidance: "Evidence of feasibility, pilot data", required: true },
      { layout: "chart_slide", role: "pilot_results", title: "Pilot Results", guidance: "Visualize preliminary findings", required: false },
      { layout: "timeline_slide", role: "timeline", title: "Project Timeline", guidance: "Gantt-style timeline of aims and milestones", required: true },
      { layout: "table_slide", role: "budget", title: "Budget Overview", guidance: "Budget categories and justification", required: true },
      { layout: "title_content", role: "team", title: "Research Team", guidance: "Key personnel and their roles", required: true },
      { layout: "title_content", role: "environment", title: "Environment & Resources", guidance: "Institutional support, facilities, collaborations", required: false },
      { layout: "key_findings", role: "impact_summary", title: "Expected Impact", guidance: "How will this advance the field?", required: true },
      { layout: "bibliography_slide", role: "references", title: "References", guidance: "Key citations from the proposal", required: true },
    ],
  },
  systematic_review: {
    id: "systematic_review",
    name: "Systematic Review",
    description: "Structured presentation for systematic review/meta-analysis results",
    audienceType: "systematic_review",
    defaultSlideCount: 14,
    estimatedDuration: "20-25 min",
    icon: "MagnifyingGlass",
    structure: [
      { layout: "title_slide", role: "title", title: "Review Title", guidance: "Full title, authors, registration number (PROSPERO)", required: true },
      { layout: "title_content", role: "background", title: "Background & Rationale", guidance: "Why was this review needed?", required: true },
      { layout: "title_content", role: "objectives", title: "Review Question", guidance: "PICO-formatted question, primary/secondary outcomes", required: true },
      { layout: "methodology", role: "search_strategy", title: "Search Strategy", guidance: "Databases searched, date range, key terms", required: true },
      { layout: "title_content", role: "prisma", title: "PRISMA Flow Diagram", guidance: "Records identified -> screened -> included", required: true, contentHints: ["diagram:prisma"] },
      { layout: "table_slide", role: "study_characteristics", title: "Study Characteristics", guidance: "Summary table of included studies", required: true },
      { layout: "title_content", role: "rob", title: "Risk of Bias Assessment", guidance: "Traffic light plot or summary figure", required: true },
      { layout: "chart_slide", role: "forest_plot", title: "Forest Plot -- Primary Outcome", guidance: "Main meta-analysis result", required: true, contentHints: ["chart:forest_plot"] },
      { layout: "chart_slide", role: "secondary_forest", title: "Secondary Outcomes", guidance: "Additional forest plots or summary", required: false },
      { layout: "title_content", role: "heterogeneity", title: "Heterogeneity & Subgroup Analyses", guidance: "I-squared, tau-squared, subgroup comparisons", required: true },
      { layout: "title_content", role: "certainty", title: "Certainty of Evidence (GRADE)", guidance: "GRADE summary of findings table", required: true },
      { layout: "two_column", role: "strengths_limitations", title: "Strengths & Limitations", guidance: "Review quality assessment", required: true },
      { layout: "key_findings", role: "conclusions", title: "Conclusions & Implications", guidance: "Key findings, clinical implications, research gaps", required: true },
      { layout: "bibliography_slide", role: "references", title: "References", guidance: "Key references and included studies", required: true },
    ],
  },
  patient_case: {
    id: "patient_case",
    name: "Patient Case Presentation",
    description: "Clinical case presentation for rounds or conferences",
    audienceType: "patient_case",
    defaultSlideCount: 10,
    estimatedDuration: "10-15 min",
    icon: "Stethoscope",
    structure: [
      { layout: "title_slide", role: "title", title: "Case Presentation", guidance: "Brief case title (de-identified), presenter, date", required: true },
      { layout: "title_content", role: "hpi", title: "History of Present Illness", guidance: "Chief complaint, HPI narrative, pertinent ROS", required: true },
      { layout: "two_column", role: "history", title: "Past Medical & Social History", guidance: "PMH, medications, allergies, social/family history", required: true },
      { layout: "title_content", role: "exam", title: "Physical Examination", guidance: "Key positive and negative findings", required: true },
      { layout: "table_slide", role: "labs", title: "Diagnostic Workup", guidance: "Lab results, imaging findings, pathology", required: true },
      { layout: "title_content", role: "differential", title: "Differential Diagnosis", guidance: "Ranked differential with reasoning", required: true },
      { layout: "title_content", role: "assessment", title: "Assessment & Diagnosis", guidance: "Final diagnosis with supporting evidence", required: true },
      { layout: "title_content", role: "management", title: "Management Plan", guidance: "Treatment, follow-up, patient education", required: true },
      { layout: "title_content", role: "discussion", title: "Discussion & Teaching Points", guidance: "Key learning objectives, literature review", required: true },
      { layout: "bibliography_slide", role: "references", title: "References", guidance: "Supporting literature", required: true },
    ],
  },
  grand_rounds: {
    id: "grand_rounds",
    name: "Grand Rounds",
    description: "Comprehensive topic review for departmental grand rounds",
    audienceType: "grand_rounds",
    defaultSlideCount: 25,
    estimatedDuration: "45-60 min",
    icon: "Hospital",
    structure: [
      { layout: "title_slide", role: "title", title: "Grand Rounds Title", guidance: "Topic, presenter, department, date", required: true },
      { layout: "title_content", role: "disclosures", title: "Disclosures", guidance: "COI disclosures, funding sources", required: true },
      { layout: "title_content", role: "objectives", title: "Learning Objectives", guidance: "3-5 specific learning objectives", required: true },
      { layout: "title_content", role: "case_vignette", title: "Opening Case", guidance: "Clinical vignette to frame the topic", required: false },
      { layout: "section_header", role: "epidemiology_header", title: "Epidemiology", guidance: "Transition", required: true },
      { layout: "title_content", role: "epidemiology", title: "Epidemiology & Burden", guidance: "Incidence, prevalence, risk factors", required: true },
      { layout: "section_header", role: "pathophys_header", title: "Pathophysiology", guidance: "Transition", required: true },
      { layout: "title_content", role: "pathophysiology", title: "Pathophysiology", guidance: "Disease mechanisms, relevant biology", required: true },
      { layout: "section_header", role: "diagnosis_header", title: "Diagnosis", guidance: "Transition", required: true },
      { layout: "title_content", role: "presentation", title: "Clinical Presentation", guidance: "Signs, symptoms, typical presentations", required: true },
      { layout: "title_content", role: "diagnostics", title: "Diagnostic Approach", guidance: "Workup, imaging, lab interpretation", required: true },
      { layout: "section_header", role: "treatment_header", title: "Management", guidance: "Transition", required: true },
      { layout: "title_content", role: "treatment", title: "Current Treatment Guidelines", guidance: "Evidence-based management", required: true },
      { layout: "title_content", role: "emerging", title: "Emerging Therapies", guidance: "Novel treatments, ongoing trials", required: false },
      { layout: "title_content", role: "case_resolution", title: "Case Resolution", guidance: "Return to opening case, discuss management", required: false },
      { layout: "key_findings", role: "summary", title: "Key Takeaways", guidance: "Summary points aligned with learning objectives", required: true },
      { layout: "bibliography_slide", role: "references", title: "References", guidance: "Key citations", required: true },
    ],
  },
};

// ---------------------------------------------------------------------------
// Coach Evaluation
// ---------------------------------------------------------------------------
export interface CoachEvaluation {
  structureScore: number;
  evidenceScore: number;
  narrativeScore: number;
  designScore: number;
  audienceFitScore: number;
  overallScore: number;
  slideInsights: SlideInsight[];
  suggestions: CoachSuggestion[];
}

export interface SlideInsight {
  slideIndex: number;
  slideTitle: string;
  issues: string[];
  strengths: string[];
}

export interface CoachSuggestion {
  category: "structure" | "evidence" | "narrative" | "design" | "audience";
  priority: "high" | "medium" | "low";
  text: string;
  slideIndex?: number;
  autoFixAvailable?: boolean;
}

// ---------------------------------------------------------------------------
// AI Generation Interfaces
// ---------------------------------------------------------------------------
export interface GenerateRequest {
  sourceType: "papers" | "document" | "text" | "thesis" | "deep_research";
  paperIds?: number[];
  documentId?: number;
  deepResearchSessionId?: number;
  rawText?: string;
  audienceType: AudienceType;
  slideCount?: number;
  additionalInstructions?: string;
  themeKey?: string;
  templateId?: string;
  citationStyle?: "apa" | "mla" | "chicago" | "vancouver" | "harvard";
  institutionKit?: InstitutionKit;
}

export interface GenerateResponse {
  deckId: number;
  slides: GeneratedSlide[];
}

export interface GeneratedSlide {
  layout: SlideLayout;
  title: string;
  subtitle?: string;
  contentBlocks: ContentBlock[];
  speakerNotes: string;
  role?: string;
  citations?: CitationData[];
}

export interface PreprocessedData {
  title: string;
  sections: PreprocessedSection[];
  keyFindings: string[];
  statistics: { label: string; value: string; ci?: string; pValue?: string }[];
  chartData: ContentBlock[];
  // V2: Citation-anchored metadata
  citations: CitationData[];
  methodology?: {
    studyDesign: string;
    population: string;
    setting: string;
    interventions?: string[];
    outcomes?: string[];
    analysisMethod?: string;
  };
  researchQuestions?: string[];
  // V3: PRISMA flow data for systematic reviews
  prismaData?: {
    databaseRecords?: number;
    registerRecords?: number;
    otherSourceRecords?: number;
    duplicatesRemoved?: number;
    recordsScreened?: number;
    recordsExcluded?: number;
    fullTextAssessed?: number;
    fullTextExcluded?: number;
    fullTextExclusionReasons?: { reason: string; count: number }[];
    studiesIncluded?: number;
    reportsIncluded?: number;
  };
}

export interface PreprocessedSection {
  heading: string;
  summary: string;
  keyPoints: string[];
  citations: string[];
  // V2: Rich citation data
  citationData?: CitationData[];
}

// ---------------------------------------------------------------------------
// Per-Slide AI Edit Actions
// ---------------------------------------------------------------------------
export type SlideEditAction =
  | "shorten"
  | "expand"
  | "rephrase"
  | "suggest_image"
  | "add_citations"
  | "improve_bullets"
  | "regenerate"
  // V2: New AI actions
  | "add_math"
  | "add_diagram"
  | "add_chart"
  | "strengthen_evidence"
  | "simplify_language"
  | "add_speaker_notes"
  | "translate"
  // V3: Academic-aware translation
  | "translate_academic";

export interface SlideEditRequest {
  slideId: number;
  action: SlideEditAction;
  additionalContext?: string;
}

export interface SlideEditResponse {
  contentBlocks: ContentBlock[];
  speakerNotes?: string;
}

// ---------------------------------------------------------------------------
// V2: AI Agent Panel — Deck-wide editing commands
// ---------------------------------------------------------------------------
export type AgentCommand =
  | "restructure"
  | "shorten_all"
  | "add_citations_all"
  | "improve_flow"
  | "add_transitions"
  | "generate_bibliography"
  | "adapt_audience"
  | "add_slide"
  | "remove_slide"
  | "translate_all"
  | "custom";

export interface AgentRequest {
  deckId: number;
  command: AgentCommand;
  prompt?: string;
  targetAudience?: AudienceType;
}

// ---------------------------------------------------------------------------
// V2: Defense Prep Q&A Simulator
// ---------------------------------------------------------------------------
export interface DefensePrepConfig {
  deckId: number;
  audienceType: AudienceType;
  difficulty: "friendly" | "moderate" | "tough" | "adversarial";
  focusAreas?: ("methodology" | "statistics" | "interpretation" | "clinical_relevance" | "limitations" | "theory")[];
}

export interface DefensePrepQuestion {
  question: string;
  category: string;
  difficulty: "easy" | "moderate" | "hard";
  suggestedAnswer?: string;
  relatedSlideIndex?: number;
  followUpQuestions?: string[];
}

// ---------------------------------------------------------------------------
// V2: Presenter Mode
// ---------------------------------------------------------------------------
export interface PresenterConfig {
  showNotes: boolean;
  showTimer: boolean;
  showProgress: boolean;
  transition: "none" | "fade" | "slide" | "zoom";
  autoAdvance?: number; // seconds per slide
  animationPreset?: AnimationPresetKey;
}

// ---------------------------------------------------------------------------
// V2: Viewer Analytics
// ---------------------------------------------------------------------------
export interface ViewerAnalytics {
  deckId: number;
  totalViews: number;
  uniqueViewers: number;
  avgCompletionRate: number;
  slideEngagement: {
    slideIndex: number;
    avgTimeSeconds: number;
    viewCount: number;
  }[];
  viewers: {
    email?: string;
    viewedAt: Date;
    completionRate: number;
    timeSpentSeconds: number;
  }[];
}
