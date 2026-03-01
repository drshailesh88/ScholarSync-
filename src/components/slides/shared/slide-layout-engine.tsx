import type { ContentBlock, SlideLayout } from "@/types/presentation";

// ---------------------------------------------------------------------------
// Layout Engine — maps SlideLayout + ContentBlock[] to positioned regions
// ---------------------------------------------------------------------------

export interface LayoutRegion {
  /** Unique region identifier */
  id: string;
  /** Position and size as percentages of slide dimensions */
  x: number;
  y: number;
  width: number;
  height: number;
  /** Content blocks assigned to this region */
  blocks: ContentBlock[];
  /** CSS flex/grid hints for the region */
  align?: "start" | "center" | "end";
  justify?: "start" | "center" | "end";
  direction?: "row" | "column";
}

export interface LayoutResult {
  regions: LayoutRegion[];
  /** Whether this layout has a title area handled by the layout itself */
  hasBuiltInTitle: boolean;
}

// ---------------------------------------------------------------------------
// Region definitions per layout
// ---------------------------------------------------------------------------

interface RegionDef {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  align?: LayoutRegion["align"];
  justify?: LayoutRegion["justify"];
  direction?: LayoutRegion["direction"];
  /** Which block types this region preferentially receives */
  preferTypes?: ContentBlock["type"][];
}

const LAYOUT_DEFS: Record<SlideLayout, { regions: RegionDef[]; hasBuiltInTitle: boolean }> = {
  title_slide: {
    hasBuiltInTitle: true,
    regions: [
      { id: "center", x: 10, y: 55, width: 80, height: 35, align: "center", justify: "center" },
    ],
  },
  title_content: {
    hasBuiltInTitle: false,
    regions: [
      { id: "content", x: 0, y: 0, width: 100, height: 100, direction: "column" },
    ],
  },
  two_column: {
    hasBuiltInTitle: false,
    regions: [
      { id: "left", x: 0, y: 0, width: 48, height: 100, direction: "column" },
      { id: "right", x: 52, y: 0, width: 48, height: 100, direction: "column" },
    ],
  },
  three_column: {
    hasBuiltInTitle: false,
    regions: [
      { id: "col1", x: 0, y: 0, width: 31, height: 100, direction: "column" },
      { id: "col2", x: 34, y: 0, width: 32, height: 100, direction: "column" },
      { id: "col3", x: 68, y: 0, width: 32, height: 100, direction: "column" },
    ],
  },
  section_header: {
    hasBuiltInTitle: true,
    regions: [],
  },
  image_text: {
    hasBuiltInTitle: false,
    regions: [
      { id: "image", x: 0, y: 0, width: 48, height: 100, align: "center", justify: "center", preferTypes: ["image"] },
      { id: "text", x: 52, y: 0, width: 48, height: 100, direction: "column" },
    ],
  },
  chart_slide: {
    hasBuiltInTitle: false,
    regions: [
      { id: "chart", x: 5, y: 0, width: 90, height: 75, align: "center", justify: "center", preferTypes: ["chart"] },
      { id: "caption", x: 5, y: 78, width: 90, height: 22, direction: "column" },
    ],
  },
  table_slide: {
    hasBuiltInTitle: false,
    regions: [
      { id: "table", x: 0, y: 0, width: 100, height: 100, align: "center", preferTypes: ["table"] },
    ],
  },
  quote_slide: {
    hasBuiltInTitle: true,
    regions: [
      { id: "quote", x: 10, y: 20, width: 80, height: 60, align: "center", justify: "center", preferTypes: ["quote"] },
    ],
  },
  comparison: {
    hasBuiltInTitle: false,
    regions: [
      { id: "left", x: 0, y: 0, width: 48, height: 100, direction: "column" },
      { id: "right", x: 52, y: 0, width: 48, height: 100, direction: "column" },
    ],
  },
  blank: {
    hasBuiltInTitle: false,
    regions: [
      { id: "content", x: 0, y: 0, width: 100, height: 100, direction: "column" },
    ],
  },
  bibliography_slide: {
    hasBuiltInTitle: false,
    regions: [
      { id: "refs", x: 0, y: 0, width: 100, height: 100, direction: "column", preferTypes: ["bibliography"] },
    ],
  },
  methodology: {
    hasBuiltInTitle: false,
    regions: [
      { id: "diagram", x: 0, y: 0, width: 55, height: 100, align: "center", justify: "center", preferTypes: ["diagram", "image"] },
      { id: "details", x: 58, y: 0, width: 42, height: 100, direction: "column" },
    ],
  },
  results_summary: {
    hasBuiltInTitle: false,
    regions: [
      { id: "stats", x: 0, y: 0, width: 100, height: 40, direction: "row", preferTypes: ["stat_result"] },
      { id: "details", x: 0, y: 45, width: 100, height: 55, direction: "column" },
    ],
  },
  key_findings: {
    hasBuiltInTitle: false,
    regions: [
      { id: "findings", x: 0, y: 0, width: 100, height: 100, direction: "column", preferTypes: ["callout", "bullets"] },
    ],
  },
  timeline_slide: {
    hasBuiltInTitle: false,
    regions: [
      { id: "timeline", x: 0, y: 0, width: 100, height: 100, align: "center", preferTypes: ["timeline"] },
    ],
  },
  stat_overview: {
    hasBuiltInTitle: false,
    regions: [
      { id: "stats", x: 0, y: 0, width: 100, height: 100, direction: "row", preferTypes: ["stat_result"] },
    ],
  },
  big_number: {
    hasBuiltInTitle: false,
    regions: [
      { id: "stat", x: 10, y: 10, width: 80, height: 50, align: "center", justify: "center", preferTypes: ["stat_result", "text"] },
      { id: "context", x: 10, y: 65, width: 80, height: 30, direction: "column" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Layout computation
// ---------------------------------------------------------------------------

/**
 * Given a slide layout and content blocks, assigns blocks to layout regions.
 *
 * Strategy:
 * 1. If a region has preferTypes, blocks matching those types go there first.
 * 2. Remaining blocks fill regions in order.
 * 3. For single-region layouts, all blocks go to that region.
 */
export function computeLayout(
  layout: SlideLayout,
  blocks: ContentBlock[]
): LayoutResult {
  const def = LAYOUT_DEFS[layout] ?? LAYOUT_DEFS.title_content;

  if (def.regions.length === 0) {
    return { regions: [], hasBuiltInTitle: def.hasBuiltInTitle };
  }

  if (def.regions.length === 1) {
    return {
      regions: [{ ...def.regions[0], blocks }],
      hasBuiltInTitle: def.hasBuiltInTitle,
    };
  }

  // Multiple regions: distribute blocks
  const assigned = new Set<number>();
  const regionBlocks: ContentBlock[][] = def.regions.map(() => []);

  // First pass: assign blocks to regions with matching preferTypes
  def.regions.forEach((region, ri) => {
    if (!region.preferTypes) return;
    blocks.forEach((block, bi) => {
      if (assigned.has(bi)) return;
      if (region.preferTypes!.includes(block.type)) {
        regionBlocks[ri].push(block);
        assigned.add(bi);
      }
    });
  });

  // Second pass: distribute remaining blocks evenly across regions without preferTypes (or all if none)
  const remaining = blocks.filter((_, i) => !assigned.has(i));
  const targetRegions = def.regions
    .map((r, i) => ({ index: i, hasPrefer: !!r.preferTypes }))
    .filter((r) => !r.hasPrefer || regionBlocks[r.index].length === 0);

  if (targetRegions.length > 0) {
    remaining.forEach((block, i) => {
      const target = targetRegions[i % targetRegions.length];
      regionBlocks[target.index].push(block);
    });
  } else {
    // Fallback: put remaining in last region
    remaining.forEach((block) => {
      regionBlocks[regionBlocks.length - 1].push(block);
    });
  }

  return {
    regions: def.regions.map((region, i) => ({
      ...region,
      blocks: regionBlocks[i],
    })),
    hasBuiltInTitle: def.hasBuiltInTitle,
  };
}

/**
 * Converts a LayoutRegion to CSS positioning styles for absolute placement.
 */
export function regionToCSS(region: LayoutRegion): React.CSSProperties {
  return {
    position: "absolute" as const,
    left: `${region.x}%`,
    top: `${region.y}%`,
    width: `${region.width}%`,
    height: `${region.height}%`,
    display: "flex",
    flexDirection: region.direction === "row" ? "row" : "column",
    alignItems: region.align ?? "start",
    justifyContent: region.justify ?? "start",
    gap: "0.5em",
    overflow: "hidden",
  };
}
