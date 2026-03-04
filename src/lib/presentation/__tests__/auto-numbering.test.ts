/**
 * Tests for auto-numbering figures and tables
 *
 * Tests sequential numbering, cross-reference resolution, and reordering
 */

import { describe, it, expect } from "vitest";
import {
  autoNumberFiguresAndTables,
  resolveCrossReferences,
  resolveCrossReferencesPlain,
  type NumberableSlide,
} from "../auto-numbering";
import type { ContentBlock } from "@/types/presentation";

describe("autoNumberFiguresAndTables", () => {
  it("assigns sequential Figure numbers to chart blocks", () => {
    const slides: NumberableSlide[] = [
      {
        contentBlocks: [
          { type: "chart", data: { chartType: "bar", title: "Chart 1", labels: [], datasets: [] } },
        ],
      },
      {
        contentBlocks: [
          { type: "chart", data: { chartType: "line", title: "Chart 2", labels: [], datasets: [] } },
        ],
      },
    ];

    const result = autoNumberFiguresAndTables(slides);

    expect((result[0].contentBlocks[0] as ContentBlock & { figureLabel?: string }).figureLabel).toBe("Figure 1");
    expect((result[1].contentBlocks[0] as ContentBlock & { figureLabel?: string }).figureLabel).toBe("Figure 2");
  });

  it("assigns sequential Figure numbers to image blocks", () => {
    const slides: NumberableSlide[] = [
      {
        contentBlocks: [{ type: "image", data: { alt: "Image 1" } }],
      },
      {
        contentBlocks: [{ type: "image", data: { alt: "Image 2" } }],
      },
    ];

    const result = autoNumberFiguresAndTables(slides);

    expect((result[0].contentBlocks[0] as ContentBlock & { figureLabel?: string }).figureLabel).toBe("Figure 1");
    expect((result[1].contentBlocks[0] as ContentBlock & { figureLabel?: string }).figureLabel).toBe("Figure 2");
  });

  it("assigns sequential Figure numbers to diagram blocks", () => {
    const slides: NumberableSlide[] = [
      {
        contentBlocks: [
          { type: "diagram", data: { syntax: "graph TD", diagramType: "flowchart" } },
        ],
      },
    ];

    const result = autoNumberFiguresAndTables(slides);

    expect((result[0].contentBlocks[0] as ContentBlock & { figureLabel?: string }).figureLabel).toBe("Figure 1");
  });

  it("assigns sequential Table numbers to table blocks", () => {
    const slides: NumberableSlide[] = [
      {
        contentBlocks: [{ type: "table", data: { headers: ["A"], rows: [["1"]] } }],
      },
      {
        contentBlocks: [{ type: "table", data: { headers: ["B"], rows: [["2"]] } }],
      },
    ];

    const result = autoNumberFiguresAndTables(slides);

    expect((result[0].contentBlocks[0] as ContentBlock & { figureLabel?: string }).figureLabel).toBe("Table 1");
    expect((result[1].contentBlocks[0] as ContentBlock & { figureLabel?: string }).figureLabel).toBe("Table 2");
  });

  it("counts Figures and Tables separately", () => {
    const slides: NumberableSlide[] = [
      {
        contentBlocks: [
          { type: "chart", data: { chartType: "bar", title: "C1", labels: [], datasets: [] } },
          { type: "table", data: { headers: ["X"], rows: [["y"]] } },
        ],
      },
      {
        contentBlocks: [
          { type: "chart", data: { chartType: "line", title: "C2", labels: [], datasets: [] } },
        ],
      },
    ];

    const result = autoNumberFiguresAndTables(slides);

    expect((result[0].contentBlocks[0] as ContentBlock & { figureLabel?: string }).figureLabel).toBe("Figure 1");
    expect((result[0].contentBlocks[1] as ContentBlock & { figureLabel?: string }).figureLabel).toBe("Table 1");
    expect((result[1].contentBlocks[0] as ContentBlock & { figureLabel?: string }).figureLabel).toBe("Figure 2");
  });

  it("updates numbering when slides are reordered", () => {
    const slides: NumberableSlide[] = [
      { sortOrder: 2, contentBlocks: [{ type: "chart", data: { chartType: "bar", title: "C2", labels: [], datasets: [] } }] },
      { sortOrder: 1, contentBlocks: [{ type: "chart", data: { chartType: "line", title: "C1", labels: [], datasets: [] } }] },
    ];

    const result = autoNumberFiguresAndTables(slides);

    // Result is sorted by sortOrder, so result[0] is sortOrder=1 (Figure 1)
    expect((result[0].contentBlocks[0] as ContentBlock & { figureLabel?: string }).figureLabel).toBe("Figure 1");
    expect((result[1].contentBlocks[0] as ContentBlock & { figureLabel?: string }).figureLabel).toBe("Figure 2");
  });

  it("handles slides without sortOrder (preserves array order)", () => {
    const slides: NumberableSlide[] = [
      { contentBlocks: [{ type: "chart", data: { chartType: "bar", title: "C1", labels: [], datasets: [] } }] },
      { contentBlocks: [{ type: "chart", data: { chartType: "line", title: "C2", labels: [], datasets: [] } }] },
    ];

    const result = autoNumberFiguresAndTables(slides);

    expect((result[0].contentBlocks[0] as ContentBlock & { figureLabel?: string }).figureLabel).toBe("Figure 1");
    expect((result[1].contentBlocks[0] as ContentBlock & { figureLabel?: string }).figureLabel).toBe("Figure 2");
  });

  it("does not mutate original input", () => {
    const slides: NumberableSlide[] = [
      { contentBlocks: [{ type: "chart", data: { chartType: "bar", title: "C1", labels: [], datasets: [] } }] },
    ];

    const originalBlocks = slides[0].contentBlocks;
    autoNumberFiguresAndTables(slides);

    expect(slides[0].contentBlocks).toBe(originalBlocks);
    expect((slides[0].contentBlocks[0] as ContentBlock & { figureLabel?: string }).figureLabel).toBeUndefined();
  });

  it("handles single slide", () => {
    const slides: NumberableSlide[] = [
      { contentBlocks: [{ type: "chart", data: { chartType: "bar", title: "C1", labels: [], datasets: [] } }] },
    ];

    const result = autoNumberFiguresAndTables(slides);

    expect((result[0].contentBlocks[0] as ContentBlock & { figureLabel?: string }).figureLabel).toBe("Figure 1");
  });

  it("handles empty deck", () => {
    const result = autoNumberFiguresAndTables([]);

    expect(result).toHaveLength(0);
  });

  it("leaves non-figure/table blocks unchanged", () => {
    const slides: NumberableSlide[] = [
      {
        contentBlocks: [
          { type: "text", data: { text: "Hello" } },
          { type: "chart", data: { chartType: "bar", title: "C1", labels: [], datasets: [] } },
          { type: "bullets", data: { items: ["A"] } },
        ],
      },
    ];

    const result = autoNumberFiguresAndTables(slides);

    expect((result[0].contentBlocks[0] as ContentBlock & { figureLabel?: string }).figureLabel).toBeUndefined();
    expect((result[0].contentBlocks[1] as ContentBlock & { figureLabel?: string }).figureLabel).toBe("Figure 1");
    expect((result[0].contentBlocks[2] as ContentBlock & { figureLabel?: string }).figureLabel).toBeUndefined();
  });
});

describe("resolveCrossReferences", () => {
  it("returns original text as single segment when no refs", () => {
    const result = resolveCrossReferences("No references here");
    expect(result).toHaveLength(1);
    expect(result).toEqual([{ type: "text", content: "No references here" }]);
  });

  it("extracts figure reference {fig:N}", () => {
    const result = resolveCrossReferences("See {fig:1} for details");
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ type: "text", content: "See " });
    expect(result[1]).toEqual({ type: "figure_ref", content: "Figure 1", number: 1 });
    expect(result[2]).toEqual({ type: "text", content: " for details" });
  });

  it("extracts table reference {tbl:N}", () => {
    const result = resolveCrossReferences("As shown in {tbl:2}");
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ type: "text", content: "As shown in " });
    expect(result[1]).toEqual({ type: "table_ref", content: "Table 2", number: 2 });
  });

  it("extracts multiple references in one text", () => {
    const result = resolveCrossReferences("See {fig:1} and {tbl:2}");
    expect(result).toHaveLength(4);
    expect(result[1].type).toBe("figure_ref");
    expect(result[3].type).toBe("table_ref");
  });

  it("handles text after reference", () => {
    const result = resolveCrossReferences("{fig:1} shows data");
    expect(result).toHaveLength(2);
    expect(result[1]).toEqual({ type: "text", content: " shows data" });
  });

  it("handles text before reference", () => {
    const result = resolveCrossReferences("As per {fig:1}");
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ type: "text", content: "As per " });
  });

  it("handles consecutive references", () => {
    const result = resolveCrossReferences("{fig:1}{tbl:1}");
    expect(result).toHaveLength(2);
    expect(result[0].type).toBe("figure_ref");
    expect(result[1].type).toBe("table_ref");
  });
});

describe("resolveCrossReferencesPlain", () => {
  it("returns original text when no refs", () => {
    const result = resolveCrossReferencesPlain("No references");
    expect(result).toBe("No references");
  });

  it("replaces {fig:N} with Figure N", () => {
    const result = resolveCrossReferencesPlain("See {fig:5}");
    expect(result).toBe("See Figure 5");
  });

  it("replaces {tbl:N} with Table N", () => {
    const result = resolveCrossReferencesPlain("See {tbl:3}");
    expect(result).toBe("See Table 3");
  });

  it("handles multiple references", () => {
    const result = resolveCrossReferencesPlain("See {fig:1} and {tbl:2}");
    expect(result).toBe("See Figure 1 and Table 2");
  });

  it("handles mixed content", () => {
    const result = resolveCrossReferencesPlain("As shown in {fig:1}, the data indicates {tbl:2} is significant");
    expect(result).toBe("As shown in Figure 1, the data indicates Table 2 is significant");
  });
});
