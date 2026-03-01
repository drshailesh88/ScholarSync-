import { describe, it, expect } from "vitest";
import type { ContentBlock, SlideLayout } from "@/types/presentation";

// ---------------------------------------------------------------------------
// We test the layout + block resolution logic of SlideRendererV2 indirectly
// since it's a React component. Here we test the data flow is correct by
// verifying computeLayout works correctly for each renderer layout case.
// ---------------------------------------------------------------------------

import { computeLayout } from "../slide-layout-engine";

function makeBlocks(...types: ContentBlock["type"][]): ContentBlock[] {
  return types.map((type) => {
    switch (type) {
      case "text":
        return { type, data: { text: "Hello", style: "body" } };
      case "bullets":
        return { type, data: { items: ["A", "B"], ordered: false } };
      case "chart":
        return { type, data: { chartType: "bar", title: "T", labels: ["X"], datasets: [{ label: "D", data: [1] }] } };
      case "table":
        return { type, data: { headers: ["H1"], rows: [["V1"]] } };
      case "image":
        return { type, data: { alt: "Img" } };
      case "stat_result":
        return { type, data: { label: "P", value: "0.05" } };
      case "quote":
        return { type, data: { text: "Quote", attribution: "Author" } };
      case "callout":
        return { type, data: { text: "Note", type: "finding" } };
      case "timeline":
        return { type, data: { entries: [{ label: "Phase", date: "2024", description: "D", status: "completed" }] } };
      case "bibliography":
        return { type, data: { entries: [], style: "apa" } };
      default:
        return { type, data: {} } as ContentBlock;
    }
  });
}

describe("SlideRendererV2 layout integration", () => {
  const layouts: SlideLayout[] = [
    "title_slide",
    "title_content",
    "two_column",
    "three_column",
    "section_header",
    "image_text",
    "chart_slide",
    "table_slide",
    "quote_slide",
    "comparison",
    "blank",
    "bibliography_slide",
    "methodology",
    "results_summary",
    "key_findings",
    "timeline_slide",
    "stat_overview",
    "big_number",
  ];

  it("all 18 layouts produce valid layout results", () => {
    for (const layout of layouts) {
      const blocks = makeBlocks("text", "bullets");
      const result = computeLayout(layout, blocks);
      expect(result).toBeDefined();
      expect(result).toHaveProperty("hasBuiltInTitle");
      expect(result).toHaveProperty("regions");
      expect(Array.isArray(result.regions)).toBe(true);
    }
  });

  it("image_text layout routes image to correct region", () => {
    const blocks = makeBlocks("image", "text");
    const result = computeLayout("image_text", blocks);
    const imageRegion = result.regions.find((r) => r.id === "image");
    const textRegion = result.regions.find((r) => r.id === "text");
    expect(imageRegion?.blocks.some((b) => b.type === "image")).toBe(true);
    expect(textRegion?.blocks.some((b) => b.type === "text")).toBe(true);
  });

  it("results_summary routes stats and text to correct regions", () => {
    const blocks = makeBlocks("stat_result", "stat_result", "text");
    const result = computeLayout("results_summary", blocks);
    const statsRegion = result.regions.find((r) => r.id === "stats");
    const detailsRegion = result.regions.find((r) => r.id === "details");
    expect(statsRegion).toBeDefined();
    expect(detailsRegion).toBeDefined();
    expect(statsRegion!.blocks.length).toBe(2);
    expect(detailsRegion!.blocks.length).toBe(1);
  });

  it("methodology layout routes diagram and text correctly", () => {
    const blocks: ContentBlock[] = [
      { type: "diagram", data: { syntax: "graph TD\nA-->B", diagramType: "flowchart" as const } },
      { type: "text", data: { text: "Steps", style: "body" } },
    ];
    const result = computeLayout("methodology", blocks);
    const diagramRegion = result.regions.find((r) => r.id === "diagram");
    const detailsRegion = result.regions.find((r) => r.id === "details");
    expect(diagramRegion?.blocks[0].type).toBe("diagram");
    expect(detailsRegion?.blocks[0].type).toBe("text");
  });

  it("big_number layout routes stat to stat region", () => {
    const blocks = makeBlocks("stat_result", "text");
    const result = computeLayout("big_number", blocks);
    const statRegion = result.regions.find((r) => r.id === "stat");
    expect(statRegion?.blocks.some((b) => b.type === "stat_result")).toBe(true);
  });

  it("key_findings routes callout blocks to findings region", () => {
    const blocks = makeBlocks("callout", "bullets");
    const result = computeLayout("key_findings", blocks);
    expect(result.regions).toHaveLength(1);
    expect(result.regions[0].blocks).toHaveLength(2);
  });

  it("handles a realistic 10-slide deck worth of layouts", () => {
    const deckLayouts: [SlideLayout, ContentBlock["type"][]][] = [
      ["title_slide", ["text"]],
      ["section_header", []],
      ["title_content", ["text", "bullets"]],
      ["image_text", ["image", "text"]],
      ["chart_slide", ["chart", "text"]],
      ["two_column", ["bullets", "bullets"]],
      ["results_summary", ["stat_result", "stat_result", "text"]],
      ["table_slide", ["table"]],
      ["key_findings", ["callout", "callout"]],
      ["bibliography_slide", ["bibliography"]],
    ];

    for (const [layout, types] of deckLayouts) {
      const blocks = makeBlocks(...types);
      const result = computeLayout(layout, blocks);
      expect(result).toBeDefined();
      // Total blocks assigned should equal input blocks
      const totalAssigned = result.regions.reduce((sum, r) => sum + r.blocks.length, 0);
      expect(totalAssigned).toBe(blocks.length);
    }
  });
});
