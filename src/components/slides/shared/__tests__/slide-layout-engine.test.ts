import { describe, it, expect } from "vitest";
import { computeLayout, regionToCSS } from "../slide-layout-engine";
import type { ContentBlock } from "@/types/presentation";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function textBlock(text = "hello"): ContentBlock {
  return { type: "text", data: { text, style: "body" } };
}

function chartBlock(): ContentBlock {
  return {
    type: "chart",
    data: {
      chartType: "bar",
      title: "Test",
      labels: ["A", "B"],
      datasets: [{ label: "S1", data: [1, 2] }],
    },
  };
}

function imageBlock(): ContentBlock {
  return { type: "image", data: { alt: "Test image" } };
}

function tableBlock(): ContentBlock {
  return {
    type: "table",
    data: {
      headers: ["Col1", "Col2"],
      rows: [["a", "b"]],
    },
  };
}

function quoteBlock(): ContentBlock {
  return { type: "quote", data: { text: "To be or not to be", attribution: "Shakespeare" } };
}

function statBlock(): ContentBlock {
  return { type: "stat_result", data: { label: "p-value", value: "0.001" } };
}

function timelineBlock(): ContentBlock {
  return {
    type: "timeline",
    data: {
      entries: [{ label: "Phase 1", date: "2024", description: "Start", status: "completed" }],
    },
  };
}

function bibliographyBlock(): ContentBlock {
  return {
    type: "bibliography",
    data: { entries: [], style: "apa" },
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("slide-layout-engine", () => {
  // -----------------------------------------------------------------------
  // computeLayout
  // -----------------------------------------------------------------------
  describe("computeLayout", () => {
    it("title_slide has built-in title and one center region", () => {
      const result = computeLayout("title_slide", [textBlock()]);
      expect(result.hasBuiltInTitle).toBe(true);
      expect(result.regions).toHaveLength(1);
      expect(result.regions[0].id).toBe("center");
      expect(result.regions[0].blocks).toHaveLength(1);
    });

    it("section_header has no regions and built-in title", () => {
      const result = computeLayout("section_header", [textBlock()]);
      expect(result.hasBuiltInTitle).toBe(true);
      expect(result.regions).toHaveLength(0);
    });

    it("title_content puts all blocks in one region", () => {
      const blocks = [textBlock("a"), textBlock("b"), chartBlock()];
      const result = computeLayout("title_content", blocks);
      expect(result.hasBuiltInTitle).toBe(false);
      expect(result.regions).toHaveLength(1);
      expect(result.regions[0].blocks).toHaveLength(3);
    });

    it("two_column distributes blocks evenly", () => {
      const blocks = [textBlock("a"), textBlock("b"), textBlock("c"), textBlock("d")];
      const result = computeLayout("two_column", blocks);
      expect(result.regions).toHaveLength(2);
      expect(result.regions[0].id).toBe("left");
      expect(result.regions[1].id).toBe("right");
      // 4 blocks across 2 regions
      const total = result.regions[0].blocks.length + result.regions[1].blocks.length;
      expect(total).toBe(4);
    });

    it("three_column distributes blocks across three regions", () => {
      const blocks = [textBlock("a"), textBlock("b"), textBlock("c")];
      const result = computeLayout("three_column", blocks);
      expect(result.regions).toHaveLength(3);
      expect(result.regions[0].blocks).toHaveLength(1);
      expect(result.regions[1].blocks).toHaveLength(1);
      expect(result.regions[2].blocks).toHaveLength(1);
    });

    it("image_text puts images in image region via preferTypes", () => {
      const blocks = [imageBlock(), textBlock("description")];
      const result = computeLayout("image_text", blocks);
      expect(result.regions).toHaveLength(2);
      // Image should go to the image region
      const imageRegion = result.regions.find((r) => r.id === "image");
      expect(imageRegion).toBeDefined();
      expect(imageRegion!.blocks.some((b) => b.type === "image")).toBe(true);
    });

    it("chart_slide puts chart in chart region via preferTypes", () => {
      const blocks = [chartBlock(), textBlock("Caption text")];
      const result = computeLayout("chart_slide", blocks);
      const chartRegion = result.regions.find((r) => r.id === "chart");
      expect(chartRegion).toBeDefined();
      expect(chartRegion!.blocks.some((b) => b.type === "chart")).toBe(true);
    });

    it("table_slide puts table in table region", () => {
      const blocks = [tableBlock()];
      const result = computeLayout("table_slide", blocks);
      expect(result.regions).toHaveLength(1);
      expect(result.regions[0].blocks[0].type).toBe("table");
    });

    it("quote_slide puts quote in quote region", () => {
      const blocks = [quoteBlock()];
      const result = computeLayout("quote_slide", blocks);
      expect(result.hasBuiltInTitle).toBe(true);
      const quoteRegion = result.regions.find((r) => r.id === "quote");
      expect(quoteRegion).toBeDefined();
      expect(quoteRegion!.blocks[0].type).toBe("quote");
    });

    it("results_summary puts stats in stats region", () => {
      const blocks = [statBlock(), statBlock(), textBlock("details")];
      const result = computeLayout("results_summary", blocks);
      const statsRegion = result.regions.find((r) => r.id === "stats");
      expect(statsRegion).toBeDefined();
      expect(statsRegion!.blocks.every((b) => b.type === "stat_result")).toBe(true);
    });

    it("bibliography_slide prefers bibliography blocks", () => {
      const blocks = [bibliographyBlock()];
      const result = computeLayout("bibliography_slide", blocks);
      expect(result.regions[0].blocks[0].type).toBe("bibliography");
    });

    it("timeline_slide prefers timeline blocks", () => {
      const blocks = [timelineBlock()];
      const result = computeLayout("timeline_slide", blocks);
      expect(result.regions[0].blocks[0].type).toBe("timeline");
    });

    it("handles empty blocks gracefully", () => {
      const result = computeLayout("title_content", []);
      expect(result.regions).toHaveLength(1);
      expect(result.regions[0].blocks).toHaveLength(0);
    });

    it("falls back to title_content for unknown layout", () => {
      const result = computeLayout("nonexistent_layout" as never, [textBlock()]);
      expect(result.regions).toHaveLength(1);
      expect(result.regions[0].blocks).toHaveLength(1);
    });

    it("stat_overview uses row direction for stats", () => {
      const blocks = [statBlock(), statBlock(), statBlock()];
      const result = computeLayout("stat_overview", blocks);
      expect(result.regions).toHaveLength(1);
      expect(result.regions[0].blocks).toHaveLength(3);
    });

    it("big_number distributes between stat and context regions", () => {
      const blocks = [statBlock(), textBlock("context")];
      const result = computeLayout("big_number", blocks);
      expect(result.regions).toHaveLength(2);
      const statRegion = result.regions.find((r) => r.id === "stat");
      expect(statRegion).toBeDefined();
      expect(statRegion!.blocks.some((b) => b.type === "stat_result")).toBe(true);
    });

    it("methodology puts diagram in diagram region", () => {
      const blocks = [
        { type: "diagram" as const, data: { syntax: "graph TD\nA-->B", diagramType: "flowchart" as const } },
        textBlock("details"),
      ];
      const result = computeLayout("methodology", blocks);
      const diagramRegion = result.regions.find((r) => r.id === "diagram");
      expect(diagramRegion).toBeDefined();
      expect(diagramRegion!.blocks.some((b) => b.type === "diagram")).toBe(true);
    });
  });

  // -----------------------------------------------------------------------
  // regionToCSS
  // -----------------------------------------------------------------------
  describe("regionToCSS", () => {
    it("converts region to absolute positioned CSS", () => {
      const css = regionToCSS({
        id: "test",
        x: 10,
        y: 20,
        width: 80,
        height: 60,
        blocks: [],
      });

      expect(css.position).toBe("absolute");
      expect(css.left).toBe("10%");
      expect(css.top).toBe("20%");
      expect(css.width).toBe("80%");
      expect(css.height).toBe("60%");
      expect(css.display).toBe("flex");
    });

    it("uses column direction by default", () => {
      const css = regionToCSS({
        id: "test",
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        blocks: [],
      });
      expect(css.flexDirection).toBe("column");
    });

    it("uses row direction when specified", () => {
      const css = regionToCSS({
        id: "test",
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        blocks: [],
        direction: "row",
      });
      expect(css.flexDirection).toBe("row");
    });

    it("applies align and justify", () => {
      const css = regionToCSS({
        id: "test",
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        blocks: [],
        align: "center",
        justify: "end",
      });
      expect(css.alignItems).toBe("center");
      expect(css.justifyContent).toBe("end");
    });

    it("defaults align and justify to start", () => {
      const css = regionToCSS({
        id: "test",
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        blocks: [],
      });
      expect(css.alignItems).toBe("start");
      expect(css.justifyContent).toBe("start");
    });
  });
});
