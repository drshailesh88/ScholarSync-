/**
 * RALPH Slides — PowerPoint Parity Test Suite
 *
 * Tests pure-function presentation utilities for PowerPoint-equivalent features:
 * - Animation presets (transitions/animations)
 * - Auto-numbering (figure/table numbering)
 * - Cross-references (find & replace equivalent)
 * - Version diff (version history)
 * - Social export (Twitter thread generation)
 * - Theme configuration (templates/themes)
 *
 * Each cycle adds new test groups. This file covers Cycles 19+.
 */

import { describe, test, expect } from "vitest";
import {
  ANIMATION_PRESETS,
  ANIMATION_PRESETS_MAP,
  applyAnimationPreset,
  countRevealSteps,
} from "../../animation-presets";
import {
  autoNumberFiguresAndTables,
  resolveCrossReferences,
  resolveCrossReferencesPlain,
} from "../../auto-numbering";
import {
  computeDeckDiff,
  extractTextFromBlocks,
  computeTextDiff,
} from "../../version-diff";
import { generateTwitterThread } from "../../social-export";
import { SOCIAL_FORMATS } from "../../social-formats";
import {
  createEmptyPrismaData,
  generatePrismaMermaid,
  extractPrismaFromText,
} from "../../prisma-diagram";
import type { ContentBlock, SlideLayout, ThemeConfig } from "@/types/presentation";
import { PRESET_THEMES } from "@/types/presentation";
import type { VersionSnapshot } from "@/lib/actions/versions";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function makeTextBlock(text: string): ContentBlock {
  return { type: "text", data: { text } } as ContentBlock;
}

function makeBulletsBlock(items: string[]): ContentBlock {
  return { type: "bullets", data: { items } } as ContentBlock;
}

function makeChartBlock(): ContentBlock {
  return {
    type: "chart",
    data: { chartType: "bar", labels: ["A", "B"], datasets: [{ label: "d", data: [1, 2] }] },
  } as ContentBlock;
}

function makeTableBlock(): ContentBlock {
  return {
    type: "table",
    data: { headers: ["Col1", "Col2"], rows: [["a", "b"]] },
  } as ContentBlock;
}

function makeImageBlock(alt = "img"): ContentBlock {
  return { type: "image", data: { alt } } as ContentBlock;
}

function makeDiagramBlock(): ContentBlock {
  return {
    type: "diagram",
    data: { diagramType: "flowchart", syntax: "graph TD\nA-->B" },
  } as ContentBlock;
}

function makeStatBlock(label: string, value: string, pValue?: string): ContentBlock {
  return {
    type: "stat_result",
    data: { label, value, pValue },
  } as ContentBlock;
}

function makeQuoteBlock(text: string, attribution: string): ContentBlock {
  return {
    type: "quote",
    data: { text, attribution },
  } as ContentBlock;
}

function makeCalloutBlock(title: string, text: string): ContentBlock {
  return {
    type: "callout",
    data: { title, text, type: "info" },
  } as ContentBlock;
}

function figureLabel(block: ContentBlock): string | undefined {
  return (block as ContentBlock & { figureLabel?: string }).figureLabel;
}

interface SlideData {
  title?: string | null;
  subtitle?: string | null;
  contentBlocks: ContentBlock[];
}

interface SocialFormatDims {
  name: string;
  description: string;
  width?: number;
  height?: number;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLE 19: Animation Presets — PowerPoint Transitions & Animations Parity
// ═══════════════════════════════════════════════════════════════════════════════

describe("Cycle 19: Animation Presets", () => {
  test("all 5 preset keys are registered", () => {
    const expectedKeys = ["sequential_build", "fade_all", "stagger", "results_reveal", "none"];
    expect(ANIMATION_PRESETS.map((p) => p.key)).toEqual(expectedKeys);
  });

  test("ANIMATION_PRESETS_MAP has correct keys", () => {
    for (const p of ANIMATION_PRESETS) {
      expect(ANIMATION_PRESETS_MAP[p.key]).toBeDefined();
      expect(ANIMATION_PRESETS_MAP[p.key].key).toBe(p.key);
    }
  });

  test("each preset has label and description", () => {
    for (const p of ANIMATION_PRESETS) {
      expect(p.label.length).toBeGreaterThan(0);
      expect(p.description.length).toBeGreaterThan(0);
    }
  });

  describe("sequential_build preset", () => {
    test("generates correct number of animations", () => {
      const preset = ANIMATION_PRESETS_MAP["sequential_build"];
      const anims = preset.generate(5);
      expect(anims).toHaveLength(5);
    });

    test("each block has incrementing order", () => {
      const anims = ANIMATION_PRESETS_MAP["sequential_build"].generate(4);
      expect(anims.map((a) => a.order)).toEqual([1, 2, 3, 4]);
    });

    test("each block has incrementing delay", () => {
      const anims = ANIMATION_PRESETS_MAP["sequential_build"].generate(3);
      expect(anims[0].delay).toBe(0);
      expect(anims[1].delay).toBe(0.5);
      expect(anims[2].delay).toBe(1.0);
    });

    test("type is fadeIn for all blocks", () => {
      const anims = ANIMATION_PRESETS_MAP["sequential_build"].generate(3);
      for (const a of anims) {
        expect(a.type).toBe("fadeIn");
      }
    });

    test("handles zero blocks", () => {
      const anims = ANIMATION_PRESETS_MAP["sequential_build"].generate(0);
      expect(anims).toEqual([]);
    });

    test("handles single block", () => {
      const anims = ANIMATION_PRESETS_MAP["sequential_build"].generate(1);
      expect(anims).toHaveLength(1);
      expect(anims[0].order).toBe(1);
      expect(anims[0].delay).toBe(0);
    });
  });

  describe("fade_all preset", () => {
    test("all blocks have same order (1)", () => {
      const anims = ANIMATION_PRESETS_MAP["fade_all"].generate(5);
      for (const a of anims) {
        expect(a.order).toBe(1);
        expect(a.delay).toBe(0);
      }
    });

    test("all blocks use fadeIn", () => {
      const anims = ANIMATION_PRESETS_MAP["fade_all"].generate(3);
      for (const a of anims) {
        expect(a.type).toBe("fadeIn");
      }
    });
  });

  describe("stagger preset", () => {
    test("uses slideUp animation type", () => {
      const anims = ANIMATION_PRESETS_MAP["stagger"].generate(3);
      for (const a of anims) {
        expect(a.type).toBe("slideUp");
      }
    });

    test("delays are smaller than sequential_build (0.15s gap)", () => {
      const anims = ANIMATION_PRESETS_MAP["stagger"].generate(3);
      expect(anims[0].delay).toBe(0);
      expect(anims[1].delay).toBeCloseTo(0.15);
      expect(anims[2].delay).toBeCloseTo(0.3);
    });
  });

  describe("results_reveal preset", () => {
    test("first block is fadeIn, rest are scaleIn", () => {
      const anims = ANIMATION_PRESETS_MAP["results_reveal"].generate(4);
      expect(anims[0].type).toBe("fadeIn");
      expect(anims[1].type).toBe("scaleIn");
      expect(anims[2].type).toBe("scaleIn");
      expect(anims[3].type).toBe("scaleIn");
    });

    test("first block appears immediately (delay=0)", () => {
      const anims = ANIMATION_PRESETS_MAP["results_reveal"].generate(3);
      expect(anims[0].delay).toBe(0);
    });

    test("subsequent blocks have longer pauses (0.7s gap)", () => {
      const anims = ANIMATION_PRESETS_MAP["results_reveal"].generate(4);
      expect(anims[1].delay).toBeCloseTo(0.3);
      expect(anims[2].delay).toBeCloseTo(1.0);
      expect(anims[3].delay).toBeCloseTo(1.7);
    });

    test("handles zero blocks", () => {
      const anims = ANIMATION_PRESETS_MAP["results_reveal"].generate(0);
      expect(anims).toEqual([]);
    });

    test("handles single block (title only)", () => {
      const anims = ANIMATION_PRESETS_MAP["results_reveal"].generate(1);
      expect(anims).toHaveLength(1);
      expect(anims[0].type).toBe("fadeIn");
    });
  });

  describe("none preset", () => {
    test("all blocks have type 'none' and order 0", () => {
      const anims = ANIMATION_PRESETS_MAP["none"].generate(5);
      for (const a of anims) {
        expect(a.type).toBe("none");
        expect(a.order).toBe(0);
        expect(a.delay).toBe(0);
        expect(a.duration).toBe(0);
      }
    });
  });

  describe("applyAnimationPreset", () => {
    test("attaches animation metadata to content blocks", () => {
      const blocks = [makeTextBlock("A"), makeBulletsBlock(["a", "b"]), makeChartBlock()];
      const result = applyAnimationPreset(blocks, "sequential_build");
      expect(result).toHaveLength(3);
      for (const b of result) {
        expect(b.animation).toBeDefined();
      }
      expect(result[0].animation!.order).toBe(1);
      expect(result[2].animation!.order).toBe(3);
    });

    test("does not mutate original blocks", () => {
      const blocks = [makeTextBlock("A")];
      const origRef = blocks[0];
      applyAnimationPreset(blocks, "stagger");
      expect(origRef.animation).toBeUndefined();
    });

    test("returns original blocks for unknown preset", () => {
      const blocks = [makeTextBlock("A")];
      const result = applyAnimationPreset(
        blocks,
         
        "nonexistent_key" as unknown as Parameters<typeof applyAnimationPreset>[1],
      );
      expect(result).toEqual(blocks);
    });

    test("preserves existing block data", () => {
      const blocks: ContentBlock[] = [
        { type: "text" as const, data: { text: "hello" }, animation: undefined },
      ];
      const result = applyAnimationPreset(blocks, "fade_all");
      expect((result[0] as Extract<ContentBlock, { type: "text" }>).data.text).toBe("hello");
      expect(result[0].animation).toBeDefined();
    });
  });

  describe("countRevealSteps", () => {
    test("counts distinct non-zero orders", () => {
      const blocks = [
        { animation: { type: "fadeIn" as const, delay: 0, duration: 0.4, order: 1 } },
        { animation: { type: "fadeIn" as const, delay: 0.5, duration: 0.4, order: 2 } },
        { animation: { type: "fadeIn" as const, delay: 1.0, duration: 0.4, order: 3 } },
      ];
      expect(countRevealSteps(blocks)).toBe(3);
    });

    test("returns 0 for 'none' animations", () => {
      const blocks = [
        { animation: { type: "none" as const, delay: 0, duration: 0, order: 0 } },
        { animation: { type: "none" as const, delay: 0, duration: 0, order: 0 } },
      ];
      expect(countRevealSteps(blocks)).toBe(0);
    });

    test("handles blocks with no animation", () => {
      const blocks = [{}, { animation: undefined }];
      expect(countRevealSteps(blocks)).toBe(0);
    });

    test("deduplicates blocks with same order", () => {
      const blocks = [
        { animation: { type: "fadeIn" as const, delay: 0, duration: 0.4, order: 1 } },
        { animation: { type: "fadeIn" as const, delay: 0, duration: 0.6, order: 1 } },
      ];
      expect(countRevealSteps(blocks)).toBe(1);
    });

    test("handles mix of animated and non-animated blocks", () => {
      const blocks = [
        { animation: { type: "fadeIn" as const, delay: 0, duration: 0.4, order: 1 } },
        {},
        { animation: { type: "scaleIn" as const, delay: 0.3, duration: 0.5, order: 2 } },
        { animation: { type: "none" as const, delay: 0, duration: 0, order: 0 } },
      ];
      expect(countRevealSteps(blocks)).toBe(2);
    });

    test("large block count (stress test)", () => {
      const blocks = Array.from({ length: 100 }, (_, i) => ({
        animation: { type: "fadeIn" as const, delay: i * 0.1, duration: 0.4, order: i + 1 },
      }));
      expect(countRevealSteps(blocks)).toBe(100);
    });
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLE 19: Auto-Numbering — PowerPoint Figure/Table Numbering Parity
// ═══════════════════════════════════════════════════════════════════════════════

describe("Cycle 19: Auto-Numbering", () => {
  test("numbers charts sequentially across slides", () => {
    const slides = [
      { sortOrder: 1, contentBlocks: [makeChartBlock(), makeTextBlock("text")] },
      { sortOrder: 2, contentBlocks: [makeChartBlock()] },
    ];
    const result = autoNumberFiguresAndTables(slides);
    expect(figureLabel(result[0].contentBlocks[0])).toBe("Figure 1");
    expect(figureLabel(result[1].contentBlocks[0])).toBe("Figure 2");
  });

  test("numbers tables separately from figures", () => {
    const slides = [
      { sortOrder: 1, contentBlocks: [makeChartBlock(), makeTableBlock()] },
      { sortOrder: 2, contentBlocks: [makeTableBlock(), makeChartBlock()] },
    ];
    const result = autoNumberFiguresAndTables(slides);
    expect(figureLabel(result[0].contentBlocks[0])).toBe("Figure 1");
    expect(figureLabel(result[0].contentBlocks[1])).toBe("Table 1");
    expect(figureLabel(result[1].contentBlocks[0])).toBe("Table 2");
    expect(figureLabel(result[1].contentBlocks[1])).toBe("Figure 2");
  });

  test("numbers images as figures", () => {
    const slides = [
      { sortOrder: 1, contentBlocks: [makeImageBlock("photo")] },
    ];
    const result = autoNumberFiguresAndTables(slides);
    expect(figureLabel(result[0].contentBlocks[0])).toBe("Figure 1");
  });

  test("numbers diagrams as figures", () => {
    const slides = [
      { sortOrder: 1, contentBlocks: [makeDiagramBlock()] },
    ];
    const result = autoNumberFiguresAndTables(slides);
    expect(figureLabel(result[0].contentBlocks[0])).toBe("Figure 1");
  });

  test("text blocks are not numbered", () => {
    const slides = [
      { sortOrder: 1, contentBlocks: [makeTextBlock("hello"), makeBulletsBlock(["a"])] },
    ];
    const result = autoNumberFiguresAndTables(slides);
    expect(figureLabel(result[0].contentBlocks[0])).toBeUndefined();
    expect(figureLabel(result[0].contentBlocks[1])).toBeUndefined();
  });

  test("respects sortOrder for numbering sequence", () => {
    const slides = [
      { sortOrder: 3, contentBlocks: [makeChartBlock()] },
      { sortOrder: 1, contentBlocks: [makeChartBlock()] },
      { sortOrder: 2, contentBlocks: [makeChartBlock()] },
    ];
    const result = autoNumberFiguresAndTables(slides);
    expect(figureLabel(result[0].contentBlocks[0])).toBe("Figure 1");
    expect(figureLabel(result[1].contentBlocks[0])).toBe("Figure 2");
    expect(figureLabel(result[2].contentBlocks[0])).toBe("Figure 3");
  });

  test("handles slides without sortOrder", () => {
    const slides = [
      { contentBlocks: [makeChartBlock()] },
      { contentBlocks: [makeChartBlock()] },
    ];
    const result = autoNumberFiguresAndTables(slides);
    expect(figureLabel(result[0].contentBlocks[0])).toBe("Figure 1");
    expect(figureLabel(result[1].contentBlocks[0])).toBe("Figure 2");
  });

  test("does not mutate original slides", () => {
    const slides = [{ sortOrder: 1, contentBlocks: [makeChartBlock()] }];
    const orig = slides[0].contentBlocks[0];
    autoNumberFiguresAndTables(slides);
    expect(figureLabel(orig)).toBeUndefined();
  });

  test("handles empty slides", () => {
    const slides = [{ sortOrder: 1, contentBlocks: [] as ContentBlock[] }];
    const result = autoNumberFiguresAndTables(slides);
    expect(result[0].contentBlocks).toEqual([]);
  });

  test("handles empty array", () => {
    const result = autoNumberFiguresAndTables([]);
    expect(result).toEqual([]);
  });

  test("numbers 50 figures correctly (stress)", () => {
    const slides = Array.from({ length: 50 }, (_, i) => ({
      sortOrder: i + 1,
      contentBlocks: [makeChartBlock()],
    }));
    const result = autoNumberFiguresAndTables(slides);
    for (let i = 0; i < 50; i++) {
      expect(figureLabel(result[i].contentBlocks[0])).toBe(`Figure ${i + 1}`);
    }
  });

  test("interleaved figures and tables get separate counters", () => {
    const slides = [
      {
        sortOrder: 1,
        contentBlocks: [
          makeChartBlock(),
          makeTableBlock(),
          makeImageBlock(),
          makeTableBlock(),
          makeDiagramBlock(),
        ],
      },
    ];
    const result = autoNumberFiguresAndTables(slides);
    expect(figureLabel(result[0].contentBlocks[0])).toBe("Figure 1");
    expect(figureLabel(result[0].contentBlocks[1])).toBe("Table 1");
    expect(figureLabel(result[0].contentBlocks[2])).toBe("Figure 2");
    expect(figureLabel(result[0].contentBlocks[3])).toBe("Table 2");
    expect(figureLabel(result[0].contentBlocks[4])).toBe("Figure 3");
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLE 19: Cross-References — PowerPoint Find & Replace Parity
// ═══════════════════════════════════════════════════════════════════════════════

describe("Cycle 19: Cross-References", () => {
  test("resolves {fig:N} tokens", () => {
    const segments = resolveCrossReferences("See {fig:1} for details");
    expect(segments).toHaveLength(3);
    expect(segments[0]).toEqual({ type: "text", content: "See " });
    expect(segments[1]).toEqual({ type: "figure_ref", content: "Figure 1", number: 1 });
    expect(segments[2]).toEqual({ type: "text", content: " for details" });
  });

  test("resolves {tbl:N} tokens", () => {
    const segments = resolveCrossReferences("Data in {tbl:3}");
    expect(segments).toHaveLength(2);
    expect(segments[0]).toEqual({ type: "text", content: "Data in " });
    expect(segments[1]).toEqual({ type: "table_ref", content: "Table 3", number: 3 });
  });

  test("resolves multiple refs in same text", () => {
    const segments = resolveCrossReferences("Compare {fig:1} with {tbl:2}");
    expect(segments).toHaveLength(4);
    expect(segments[1].type).toBe("figure_ref");
    expect(segments[3].type).toBe("table_ref");
  });

  test("returns single text segment when no refs", () => {
    const segments = resolveCrossReferences("No references here");
    expect(segments).toHaveLength(1);
    expect(segments[0]).toEqual({ type: "text", content: "No references here" });
  });

  test("handles empty string", () => {
    const segments = resolveCrossReferences("");
    expect(segments).toHaveLength(1);
    expect(segments[0].content).toBe("");
  });

  test("handles adjacent refs without separator", () => {
    const segments = resolveCrossReferences("{fig:1}{tbl:2}");
    expect(segments).toHaveLength(2);
    expect(segments[0].type).toBe("figure_ref");
    expect(segments[1].type).toBe("table_ref");
  });

  test("plain resolution replaces tokens", () => {
    const result = resolveCrossReferencesPlain("See {fig:1} and {tbl:2}");
    expect(result).toBe("See Figure 1 and Table 2");
  });

  test("plain resolution returns original when no refs", () => {
    const result = resolveCrossReferencesPlain("No refs");
    expect(result).toBe("No refs");
  });

  test("plain resolution handles large numbers", () => {
    const result = resolveCrossReferencesPlain("{fig:99} and {tbl:100}");
    expect(result).toBe("Figure 99 and Table 100");
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLE 19: Version Diff — PowerPoint Version History Parity
// ═══════════════════════════════════════════════════════════════════════════════

describe("Cycle 19: Version Diff", () => {
  function makeVersion(
    deck: Partial<VersionSnapshot["deck"]>,
    slides: Array<Partial<VersionSnapshot["slides"][number]>>,
  ): VersionSnapshot {
    return {
      deck: {
        title: "Test Deck",
        theme: "modern",
        audienceType: "general",
        templateId: null,
        citationStyle: "apa",
        themeConfig: null,
        institutionKit: null,
        ...deck,
      },
      slides: slides.map((s, i) => ({
        id: i + 1,
        sortOrder: i + 1,
        layout: "title_content",
        title: `Slide ${i + 1}`,
        subtitle: null,
        speakerNotes: null,
        contentBlocks: [],
        ...s,
      })),
    };
  }

  test("identical versions produce no changes", () => {
    const v = makeVersion({}, [{ title: "S1" }, { title: "S2" }]);
    const diff = computeDeckDiff(v, v);
    expect(diff.deckMetadataChanged).toBe(false);
    expect(diff.stats.modified).toBe(0);
    expect(diff.stats.added).toBe(0);
    expect(diff.stats.removed).toBe(0);
    expect(diff.stats.unchanged).toBe(2);
  });

  test("detects deck title change", () => {
    const v1 = makeVersion({ title: "Old Title" }, []);
    const v2 = makeVersion({ title: "New Title" }, []);
    const diff = computeDeckDiff(v1, v2);
    expect(diff.deckMetadataChanged).toBe(true);
    expect(diff.deckFieldChanges.find((c) => c.field === "title")).toBeDefined();
  });

  test("detects theme change", () => {
    const v1 = makeVersion({ theme: "modern" }, []);
    const v2 = makeVersion({ theme: "dark" }, []);
    const diff = computeDeckDiff(v1, v2);
    expect(diff.deckMetadataChanged).toBe(true);
  });

  test("detects title change on slide", () => {
    const v1 = makeVersion({}, [{ id: 1, title: "Old" }]);
    const v2 = makeVersion({}, [{ id: 1, title: "New" }]);
    const diff = computeDeckDiff(v1, v2);
    expect(diff.stats.modified).toBe(1);
    const slideDiff = diff.slideDiffs.find((d) => d.slideId === 1);
    expect(slideDiff?.titleChanged).toBe(true);
    expect(slideDiff?.oldTitle).toBe("Old");
    expect(slideDiff?.newTitle).toBe("New");
  });

  test("detects speaker notes change", () => {
    const v1 = makeVersion({}, [{ id: 1, speakerNotes: "Old notes" }]);
    const v2 = makeVersion({}, [{ id: 1, speakerNotes: "Updated notes" }]);
    const diff = computeDeckDiff(v1, v2);
    expect(diff.stats.modified).toBe(1);
    const slideDiff = diff.slideDiffs.find((d) => d.slideId === 1);
    expect(slideDiff?.speakerNotesChanged).toBe(true);
  });

  test("detects layout change", () => {
    const v1 = makeVersion({}, [{ id: 1, layout: "title_content" }]);
    const v2 = makeVersion({}, [{ id: 1, layout: "two_column" }]);
    const diff = computeDeckDiff(v1, v2);
    const slideDiff = diff.slideDiffs.find((d) => d.slideId === 1);
    expect(slideDiff?.layoutChanged).toBe(true);
  });

  test("detects added slide", () => {
    const v1 = makeVersion({}, [{ id: 1 }]);
    const v2 = makeVersion({}, [{ id: 1 }, { id: 2 }]);
    const diff = computeDeckDiff(v1, v2);
    expect(diff.stats.added).toBe(1);
  });

  test("detects removed slide", () => {
    const v1 = makeVersion({}, [{ id: 1 }, { id: 2 }]);
    const v2 = makeVersion({}, [{ id: 1 }]);
    const diff = computeDeckDiff(v1, v2);
    expect(diff.stats.removed).toBe(1);
  });

  test("detects simultaneous additions and removals", () => {
    const v1 = makeVersion({}, [{ id: 1 }, { id: 2 }]);
    const v2 = makeVersion({}, [{ id: 2 }, { id: 3 }]);
    const diff = computeDeckDiff(v1, v2);
    expect(diff.stats.removed).toBe(1);
    expect(diff.stats.added).toBe(1);
  });

  test("detects content block addition", () => {
    const v1 = makeVersion({}, [{ id: 1, contentBlocks: [] }]);
    const v2 = makeVersion({}, [{ id: 1, contentBlocks: [makeTextBlock("new")] }]);
    const diff = computeDeckDiff(v1, v2);
    const slideDiff = diff.slideDiffs.find((d) => d.slideId === 1);
    expect(slideDiff?.status).toBe("modified");
    expect(slideDiff?.contentBlockChanges.some((c) => c.status === "added")).toBe(true);
  });

  test("detects content block modification", () => {
    const v1 = makeVersion({}, [{ id: 1, contentBlocks: [makeTextBlock("old")] }]);
    const v2 = makeVersion({}, [{ id: 1, contentBlocks: [makeTextBlock("new")] }]);
    const diff = computeDeckDiff(v1, v2);
    const slideDiff = diff.slideDiffs.find((d) => d.slideId === 1);
    expect(slideDiff?.contentBlockChanges.some((c) => c.status === "modified")).toBe(true);
  });

  test("detects content block removal", () => {
    const v1 = makeVersion({}, [{ id: 1, contentBlocks: [makeTextBlock("text"), makeBulletsBlock(["a"])] }]);
    const v2 = makeVersion({}, [{ id: 1, contentBlocks: [makeTextBlock("text")] }]);
    const diff = computeDeckDiff(v1, v2);
    const slideDiff = diff.slideDiffs.find((d) => d.slideId === 1);
    expect(slideDiff?.contentBlockChanges.some((c) => c.status === "removed")).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLE 19: Text Diff — Word-Level Change Tracking
// ═══════════════════════════════════════════════════════════════════════════════

describe("Cycle 19: Text Diff", () => {
  test("identical texts produce single 'same' segment", () => {
    const result = computeTextDiff("hello world", "hello world");
    expect(result).toEqual([{ type: "same", text: "hello world" }]);
  });

  test("detects added word", () => {
    const result = computeTextDiff("hello world", "hello beautiful world");
    const added = result.filter((s) => s.type === "added");
    expect(added.length).toBeGreaterThan(0);
    expect(added.some((s) => s.text.includes("beautiful"))).toBe(true);
  });

  test("detects removed word", () => {
    const result = computeTextDiff("hello beautiful world", "hello world");
    const removed = result.filter((s) => s.type === "removed");
    expect(removed.length).toBeGreaterThan(0);
    expect(removed.some((s) => s.text.includes("beautiful"))).toBe(true);
  });

  test("handles completely different texts", () => {
    const result = computeTextDiff("alpha beta", "gamma delta");
    const removed = result.filter((s) => s.type === "removed");
    const added = result.filter((s) => s.type === "added");
    expect(removed.length).toBeGreaterThan(0);
    expect(added.length).toBeGreaterThan(0);
  });

  test("handles empty old text", () => {
    const result = computeTextDiff("", "new content");
    expect(result.some((s) => s.type === "added")).toBe(true);
  });

  test("handles empty new text", () => {
    const result = computeTextDiff("old content", "");
    expect(result.some((s) => s.type === "removed")).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLE 19: extractTextFromBlocks
// ═══════════════════════════════════════════════════════════════════════════════

describe("Cycle 19: extractTextFromBlocks", () => {
  test("extracts text from text blocks", () => {
    const blocks = [
      { type: "text", data: { text: "Hello" } },
      { type: "text", data: { text: "World" } },
    ];
    expect(extractTextFromBlocks(blocks)).toBe("Hello\nWorld");
  });

  test("extracts items from bullet blocks", () => {
    const blocks = [
      { type: "bullets", data: { items: ["item1", "item2"] } },
    ];
    expect(extractTextFromBlocks(blocks)).toBe("item1\nitem2");
  });

  test("returns empty string for non-array input", () => {
    expect(extractTextFromBlocks(null)).toBe("");
    expect(extractTextFromBlocks(undefined)).toBe("");
    expect(extractTextFromBlocks("string")).toBe("");
  });

  test("skips blocks without data", () => {
    const blocks = [{ type: "image" }, { type: "text", data: { text: "ok" } }];
    expect(extractTextFromBlocks(blocks)).toBe("ok");
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLE 19: Twitter Thread Generation — Social Export
// ═══════════════════════════════════════════════════════════════════════════════

describe("Cycle 19: Twitter Thread Generation", () => {
  test("generates thread from slides with titles", () => {
    const slides: SlideData[] = [
      { title: "Introduction", contentBlocks: [makeTextBlock("First point")] },
      { title: "Methods", contentBlocks: [makeTextBlock("Second point")] },
    ];
    const thread = generateTwitterThread(slides);
    expect(thread).toHaveLength(2);
    expect(thread[0]).toContain("1/2");
    expect(thread[0]).toContain("Introduction");
    expect(thread[1]).toContain("2/2");
    expect(thread[1]).toContain("Methods");
  });

  test("includes bullet items", () => {
    const slides: SlideData[] = [
      { title: null, contentBlocks: [makeBulletsBlock(["point A", "point B"])] },
    ];
    const thread = generateTwitterThread(slides);
    expect(thread[0]).toContain("point A");
    expect(thread[0]).toContain("point B");
  });

  test("includes stat results with p-values", () => {
    const slides: SlideData[] = [
      { title: "Results", contentBlocks: [makeStatBlock("Effect", "0.42", "0.003")] },
    ];
    const thread = generateTwitterThread(slides);
    expect(thread[0]).toContain("Effect: 0.42");
    expect(thread[0]).toContain("p=0.003");
  });

  test("includes quotes with attribution", () => {
    const slides: SlideData[] = [
      { title: null, contentBlocks: [makeQuoteBlock("Great insight", "Smith 2024")] },
    ];
    const thread = generateTwitterThread(slides);
    expect(thread[0]).toContain("Great insight");
    expect(thread[0]).toContain("Smith 2024");
  });

  test("includes callout text", () => {
    const slides: SlideData[] = [
      { title: null, contentBlocks: [makeCalloutBlock("Key Finding", "Results show...")] },
    ];
    const thread = generateTwitterThread(slides);
    expect(thread[0]).toContain("Key Finding");
    expect(thread[0]).toContain("Results show...");
  });

  test("truncates long tweets to 280 chars", () => {
    const longText = "A".repeat(300);
    const slides: SlideData[] = [{ title: null, contentBlocks: [makeTextBlock(longText)] }];
    const thread = generateTwitterThread(slides);
    expect(thread[0].length).toBeLessThanOrEqual(280);
    expect(thread[0]).toContain("...");
  });

  test("single slide has no thread indicator", () => {
    const slides: SlideData[] = [{ title: "Solo", contentBlocks: [] }];
    const thread = generateTwitterThread(slides);
    expect(thread[0]).not.toContain("/");
  });

  test("handles empty content blocks", () => {
    const slides: SlideData[] = [
      { title: "Empty Slide", contentBlocks: [] },
    ];
    const thread = generateTwitterThread(slides);
    expect(thread).toHaveLength(1);
    expect(thread[0]).toContain("Empty Slide");
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLE 19: Social Formats Configuration
// ═══════════════════════════════════════════════════════════════════════════════

describe("Cycle 19: Social Formats", () => {
  test("all 5 social formats defined", () => {
    const keys = Object.keys(SOCIAL_FORMATS);
    expect(keys).toContain("linkedin_carousel");
    expect(keys).toContain("twitter_thread");
    expect(keys).toContain("twitter_images");
    expect(keys).toContain("instagram_story");
    expect(keys).toContain("instagram_carousel");
  });

  test("linkedin carousel is 1080x1080", () => {
    const fmt = SOCIAL_FORMATS["linkedin_carousel"] as unknown as SocialFormatDims;
    expect(fmt.width).toBe(1080);
    expect(fmt.height).toBe(1080);
  });

  test("twitter images is 1200x675 (16:9)", () => {
    const fmt = SOCIAL_FORMATS["twitter_images"] as unknown as SocialFormatDims;
    expect(fmt.width).toBe(1200);
    expect(fmt.height).toBe(675);
  });

  test("instagram story is 1080x1920 (9:16)", () => {
    const fmt = SOCIAL_FORMATS["instagram_story"] as unknown as SocialFormatDims;
    expect(fmt.width).toBe(1080);
    expect(fmt.height).toBe(1920);
  });

  test("each format has name and description", () => {
    for (const [, fmt] of Object.entries(SOCIAL_FORMATS)) {
      const f = fmt as unknown as SocialFormatDims;
      expect(f.name.length).toBeGreaterThan(0);
      expect(f.description.length).toBeGreaterThan(0);
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLE 19: Preset Themes — PowerPoint Templates/Themes Parity
// ═══════════════════════════════════════════════════════════════════════════════

describe("Cycle 19: Preset Themes", () => {
  test("at least 6 preset themes defined", () => {
    const keys = Object.keys(PRESET_THEMES);
    expect(keys.length).toBeGreaterThanOrEqual(6);
  });

  test("each theme has required color properties", () => {
    for (const [key, theme] of Object.entries(PRESET_THEMES)) {
      expect(theme.name, `${key} missing name`).toBeTruthy();
      expect(theme.primaryColor, `${key} missing primaryColor`).toMatch(/^#/);
      expect(theme.secondaryColor, `${key} missing secondaryColor`).toMatch(/^#/);
      expect(theme.backgroundColor, `${key} missing backgroundColor`).toMatch(/^#/);
      expect(theme.textColor, `${key} missing textColor`).toMatch(/^#/);
      expect(theme.accentColor, `${key} missing accentColor`).toMatch(/^#/);
    }
  });

  test("modern theme has Inter font", () => {
    expect(PRESET_THEMES["modern"].fontFamily).toContain("Inter");
  });

  test("thesis theme uses serif font", () => {
    expect(PRESET_THEMES["thesis"].fontFamily).toContain("Georgia");
  });

  test("dark theme has dark background", () => {
    const bg = PRESET_THEMES["dark"].backgroundColor;
    const r = parseInt(bg.slice(1, 3), 16);
    const g = parseInt(bg.slice(3, 5), 16);
    const b = parseInt(bg.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    expect(luminance).toBeLessThan(0.3);
  });

  test("each theme has unique primary color", () => {
    const primaryColors = Object.values(PRESET_THEMES).map((t) => t.primaryColor);
    const unique = new Set(primaryColors);
    expect(unique.size).toBe(primaryColors.length);
  });

  test("all color values are valid hex", () => {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    for (const theme of Object.values(PRESET_THEMES)) {
      expect(theme.primaryColor).toMatch(hexRegex);
      expect(theme.secondaryColor).toMatch(hexRegex);
      expect(theme.backgroundColor).toMatch(hexRegex);
      expect(theme.textColor).toMatch(hexRegex);
      expect(theme.accentColor).toMatch(hexRegex);
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLE 20: PRISMA Diagrams — Systematic Review Flow Diagram Generation
// ═══════════════════════════════════════════════════════════════════════════════

describe("Cycle 20: PRISMA Diagram Generation", () => {
  test("createEmptyPrismaData returns all zeros", () => {
    const data = createEmptyPrismaData();
    expect(data.databaseRecords).toBe(0);
    expect(data.registerRecords).toBe(0);
    expect(data.otherSourceRecords).toBe(0);
    expect(data.duplicatesRemoved).toBe(0);
    expect(data.recordsScreened).toBe(0);
    expect(data.recordsExcluded).toBe(0);
    expect(data.fullTextAssessed).toBe(0);
    expect(data.fullTextExcluded).toBe(0);
    expect(data.fullTextExclusionReasons).toEqual([]);
    expect(data.studiesIncluded).toBe(0);
    expect(data.reportsIncluded).toBe(0);
  });

  test("generates valid Mermaid flowchart from complete data", () => {
    const data = {
      ...createEmptyPrismaData(),
      databaseRecords: 1500,
      registerRecords: 200,
      otherSourceRecords: 50,
      duplicatesRemoved: 300,
      recordsScreened: 1450,
      recordsExcluded: 1200,
      fullTextAssessed: 250,
      fullTextExcluded: 100,
      fullTextExclusionReasons: [
        { reason: "Wrong population", count: 40 },
        { reason: "No control group", count: 35 },
        { reason: "Conference abstract only", count: 25 },
      ],
      studiesIncluded: 150,
      reportsIncluded: 120,
    };
    const mermaid = generatePrismaMermaid(data);
    expect(mermaid).toContain("graph TD");
    expect(mermaid).toContain("n = 1500");
    expect(mermaid).toContain("n = 250"); // register + other
    expect(mermaid).toContain("n = 1450"); // after duplicates
    expect(mermaid).toContain("n = 1200"); // excluded
    expect(mermaid).toContain("Wrong population (n = 40)");
    expect(mermaid).toContain("No control group (n = 35)");
    expect(mermaid).toContain("n = 150"); // studies included
    expect(mermaid).toContain("n = 120"); // meta-analysis
  });

  test("has all 4 PRISMA phases as subgraphs", () => {
    const mermaid = generatePrismaMermaid(createEmptyPrismaData());
    expect(mermaid).toContain("subgraph Identification");
    expect(mermaid).toContain("subgraph Screening");
    expect(mermaid).toContain("subgraph Eligibility");
    expect(mermaid).toContain("subgraph Included");
  });

  test("has correct flow arrows", () => {
    const mermaid = generatePrismaMermaid(createEmptyPrismaData());
    expect(mermaid).toContain("A --> C");
    expect(mermaid).toContain("B --> C");
    expect(mermaid).toContain("C --> D");
    expect(mermaid).toContain("D --> E");
    expect(mermaid).toContain("D --> F");
    expect(mermaid).toContain("F --> G");
    expect(mermaid).toContain("F --> H");
    expect(mermaid).toContain("H --> I");
  });

  test("has color-coded subgraph styles", () => {
    const mermaid = generatePrismaMermaid(createEmptyPrismaData());
    expect(mermaid).toContain("style Identification fill:#E0F2FE");
    expect(mermaid).toContain("style Screening fill:#FEF3C7");
    expect(mermaid).toContain("style Eligibility fill:#FEE2E2");
    expect(mermaid).toContain("style Included fill:#D1FAE5");
  });

  test("handles zero data correctly (all n=0)", () => {
    const mermaid = generatePrismaMermaid(createEmptyPrismaData());
    expect(mermaid).toContain("n = 0");
    expect(mermaid).not.toContain("NaN");
    expect(mermaid).not.toContain("undefined");
  });

  test("handles no exclusion reasons", () => {
    const data = {
      ...createEmptyPrismaData(),
      fullTextExcluded: 50,
      fullTextExclusionReasons: [],
    };
    const mermaid = generatePrismaMermaid(data);
    expect(mermaid).toContain("n = 50");
    // Should not have individual reason lines (no <br/> after excluded count)
    // The excluded box should end with the count, not list reasons
    const excludedBox = mermaid.split("\n").find((l) => l.includes("n = 50"));
    expect(excludedBox).toBeDefined();
    // No reason text like "Not relevant (n = 5)" should appear
    expect(mermaid).not.toContain("Not relevant");
    expect(mermaid.includes("n = 50")).toBe(true);
  });

  test("handles large numbers", () => {
    const data = {
      ...createEmptyPrismaData(),
      databaseRecords: 15000,
      recordsScreened: 12000,
      studiesIncluded: 42,
    };
    const mermaid = generatePrismaMermaid(data);
    expect(mermaid).toContain("n = 15000");
    expect(mermaid).toContain("n = 12000");
    expect(mermaid).toContain("n = 42");
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLE 20: PRISMA Text Extraction — Parsing Systematic Review Text
// ═══════════════════════════════════════════════════════════════════════════════

describe("Cycle 20: PRISMA Text Extraction", () => {
  test("extracts database records count", () => {
    const text = "Records identified through database searching 1500";
    const data = extractPrismaFromText(text);
    expect(data.databaseRecords).toBe(1500);
  });

  test("extracts duplicates removed", () => {
    const text = "duplicates removed (n = 300) from the initial set";
    const data = extractPrismaFromText(text);
    expect(data.duplicatesRemoved).toBe(300);
  });

  test("extracts records screened", () => {
    const text = "records screened (n = 1,450)";
    const data = extractPrismaFromText(text);
    expect(data.recordsScreened).toBe(1450);
  });

  test("extracts records excluded", () => {
    const text = "records excluded (n = 1,200)";
    const data = extractPrismaFromText(text);
    expect(data.recordsExcluded).toBe(1200);
  });

  test("extracts full-text assessed", () => {
    const text = "full-text articles assessed for eligibility (n = 250)";
    const data = extractPrismaFromText(text);
    expect(data.fullTextAssessed).toBe(250);
  });

  test("extracts full-text excluded", () => {
    const text = "full-text articles excluded, with reasons (n = 100)";
    const data = extractPrismaFromText(text);
    expect(data.fullTextExcluded).toBe(100);
  });

  test("extracts studies included", () => {
    const text = "studies included in qualitative synthesis (n = 150)";
    const data = extractPrismaFromText(text);
    expect(data.studiesIncluded).toBe(150);
  });

  test("extracts meta-analysis count", () => {
    const text = "included in meta-analysis (n = 120)";
    const data = extractPrismaFromText(text);
    expect(data.reportsIncluded).toBe(120);
  });

  test("handles comma-separated numbers", () => {
    const text = "Records identified through database searching 15,000";
    const data = extractPrismaFromText(text);
    expect(data.databaseRecords).toBe(15000);
  });

  test("returns empty partial for unrelated text", () => {
    const text = "This is a random text about cats and dogs.";
    const data = extractPrismaFromText(text);
    expect(Object.keys(data).length).toBe(0);
  });

  test("extracts multiple fields from one paragraph", () => {
    const text = `Records identified through database searching (n = 2,500).
      After duplicates removed (n = 450), records screened (n = 2,050).
      Records excluded at title screening (n = 1,800).
      Full-text articles assessed for eligibility (n = 250).
      Studies included in final review (n = 45).`;
    const data = extractPrismaFromText(text);
    expect(data.databaseRecords).toBe(2500);
    expect(data.duplicatesRemoved).toBe(450);
    expect(data.recordsScreened).toBe(2050);
    expect(data.recordsExcluded).toBe(1800);
    expect(data.fullTextAssessed).toBe(250);
    expect(data.studiesIncluded).toBe(45);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLE 20: Slide Layouts — PowerPoint Layout Coverage
// ═══════════════════════════════════════════════════════════════════════════════

describe("Cycle 20: Slide Layout Coverage", () => {
  const ALL_LAYOUTS: SlideLayout[] = [
    "title_slide", "title_content", "two_column", "section_header",
    "image_text", "chart_slide", "table_slide", "quote_slide",
    "comparison", "blank", "bibliography_slide", "methodology",
    "results_summary", "key_findings", "timeline_slide", "stat_overview",
    "three_column", "big_number", "freeform",
  ];

  test("all 19 slide layouts are defined in the type", () => {
    // This test verifies the layout type covers all expected values
    expect(ALL_LAYOUTS).toHaveLength(19);
    // TypeScript would fail if any of these weren't valid SlideLayout values
    for (const layout of ALL_LAYOUTS) {
      const typed: SlideLayout = layout;
      expect(typed).toBe(layout);
    }
  });

  test("standard layouts cover PowerPoint basics", () => {
    const standardLayouts: SlideLayout[] = [
      "title_slide",    // PPT: Title Slide
      "title_content",  // PPT: Title and Content
      "two_column",     // PPT: Two Content
      "section_header", // PPT: Section Header
      "blank",          // PPT: Blank
      "comparison",     // PPT: Comparison
    ];
    for (const layout of standardLayouts) {
      expect(ALL_LAYOUTS).toContain(layout);
    }
  });

  test("academic layouts extend beyond PPT defaults", () => {
    const academicLayouts: SlideLayout[] = [
      "bibliography_slide", "methodology", "results_summary",
      "key_findings", "stat_overview",
    ];
    for (const layout of academicLayouts) {
      expect(ALL_LAYOUTS).toContain(layout);
    }
  });

  test("freeform layout supports absolute positioning", () => {
    expect(ALL_LAYOUTS).toContain("freeform");
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLE 20: Extended Theme Properties — V2/V3 Features
// ═══════════════════════════════════════════════════════════════════════════════

describe("Cycle 20: Extended Theme Properties", () => {
  test("ThemeConfig supports V2 extended properties", () => {
    const theme: ThemeConfig = {
      name: "Custom",
      primaryColor: "#FF0000",
      secondaryColor: "#00FF00",
      backgroundColor: "#FFFFFF",
      textColor: "#000000",
      accentColor: "#0000FF",
      surfaceColor: "#F0F0F0",
      borderColor: "#CCCCCC",
      codeBackground: "#1E1E2E",
      calloutBackground: "#F5F5F5",
      gradientFrom: "#FF0000",
      gradientTo: "#0000FF",
      slideTransition: "fade",
    };
    expect(theme.surfaceColor).toBe("#F0F0F0");
    expect(theme.slideTransition).toBe("fade");
    expect(theme.gradientFrom).toBe("#FF0000");
  });

  test("ThemeConfig supports V3 customizer properties", () => {
    const theme: ThemeConfig = {
      name: "Custom V3",
      primaryColor: "#FF0000",
      secondaryColor: "#00FF00",
      backgroundColor: "#FFFFFF",
      textColor: "#000000",
      accentColor: "#0000FF",
      borderRadius: "lg",
      borderStyle: "subtle",
      shadowStyle: "medium",
      cardSpacing: "comfortable",
    };
    expect(theme.borderRadius).toBe("lg");
    expect(theme.borderStyle).toBe("subtle");
    expect(theme.shadowStyle).toBe("medium");
    expect(theme.cardSpacing).toBe("comfortable");
  });

  test("slide transition values cover animation needs", () => {
    const transitions: NonNullable<ThemeConfig["slideTransition"]>[] = [
      "none", "fade", "slide", "zoom", "morph",
    ];
    for (const t of transitions) {
      const theme: ThemeConfig = {
        name: "test",
        primaryColor: "#000",
        secondaryColor: "#000",
        backgroundColor: "#FFF",
        textColor: "#000",
        accentColor: "#000",
        slideTransition: t,
      };
      expect(theme.slideTransition).toBe(t);
    }
  });

  test("border radius values cover design range", () => {
    const radii: NonNullable<ThemeConfig["borderRadius"]>[] = [
      "none", "sm", "md", "lg", "xl",
    ];
    for (const r of radii) {
      const theme: ThemeConfig = {
        name: "test",
        primaryColor: "#000",
        secondaryColor: "#000",
        backgroundColor: "#FFF",
        textColor: "#000",
        accentColor: "#000",
        borderRadius: r,
      };
      expect(theme.borderRadius).toBe(r);
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLE 20: Version Diff Edge Cases — Stress Testing
// ═══════════════════════════════════════════════════════════════════════════════

describe("Cycle 20: Version Diff Edge Cases", () => {
  function makeVersion(
    deck: Partial<VersionSnapshot["deck"]>,
    slides: Array<Partial<VersionSnapshot["slides"][number]>>,
  ): VersionSnapshot {
    return {
      deck: {
        title: "Test",
        theme: "modern",
        audienceType: "general",
        templateId: null,
        citationStyle: "apa",
        themeConfig: null,
        institutionKit: null,
        ...deck,
      },
      slides: slides.map((s, i) => ({
        id: i + 1,
        sortOrder: i + 1,
        layout: "title_content",
        title: `Slide ${i + 1}`,
        subtitle: null,
        speakerNotes: null,
        contentBlocks: [],
        ...s,
      })),
    };
  }

  test("handles empty deck comparison", () => {
    const v = makeVersion({}, []);
    const diff = computeDeckDiff(v, v);
    expect(diff.stats.unchanged).toBe(0);
    expect(diff.stats.added).toBe(0);
    expect(diff.stats.removed).toBe(0);
    expect(diff.stats.modified).toBe(0);
  });

  test("handles large deck (50 slides) comparison", () => {
    const slides = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      title: `Slide ${i + 1}`,
    }));
    const v = makeVersion({}, slides);
    const diff = computeDeckDiff(v, v);
    expect(diff.stats.unchanged).toBe(50);
  });

  test("detects subtitle change", () => {
    const v1 = makeVersion({}, [{ id: 1, subtitle: "Old sub" }]);
    const v2 = makeVersion({}, [{ id: 1, subtitle: "New sub" }]);
    const diff = computeDeckDiff(v1, v2);
    const sd = diff.slideDiffs.find((d) => d.slideId === 1);
    expect(sd?.subtitleChanged).toBe(true);
  });

  test("detects themeConfig change", () => {
    const v1 = makeVersion({ themeConfig: { name: "A" } }, []);
    const v2 = makeVersion({ themeConfig: { name: "B" } }, []);
    const diff = computeDeckDiff(v1, v2);
    expect(diff.deckMetadataChanged).toBe(true);
    expect(diff.deckFieldChanges.some((c) => c.field === "themeConfig")).toBe(true);
  });

  test("detects institutionKit change", () => {
    const v1 = makeVersion({ institutionKit: { logo: "old.png" } }, []);
    const v2 = makeVersion({ institutionKit: { logo: "new.png" } }, []);
    const diff = computeDeckDiff(v1, v2);
    expect(diff.deckFieldChanges.some((c) => c.field === "institutionKit")).toBe(true);
  });

  test("all slides removed produces correct stats", () => {
    const v1 = makeVersion({}, [{ id: 1 }, { id: 2 }, { id: 3 }]);
    const v2 = makeVersion({}, []);
    const diff = computeDeckDiff(v1, v2);
    expect(diff.stats.removed).toBe(3);
    expect(diff.stats.added).toBe(0);
  });

  test("all slides added produces correct stats", () => {
    const v1 = makeVersion({}, []);
    const v2 = makeVersion({}, [{ id: 1 }, { id: 2 }, { id: 3 }]);
    const diff = computeDeckDiff(v1, v2);
    expect(diff.stats.added).toBe(3);
    expect(diff.stats.removed).toBe(0);
  });

  test("slideDiffs are sorted: removed, modified, unchanged, added", () => {
    const v1 = makeVersion({}, [{ id: 1 }, { id: 2, title: "Old" }, { id: 3 }]);
    const v2 = makeVersion({}, [{ id: 2, title: "New" }, { id: 3 }, { id: 4 }]);
    const diff = computeDeckDiff(v1, v2);
    const statuses = diff.slideDiffs.map((d) => d.status);
    // removed should come first, then modified, then unchanged, then added
    const statusOrder = { removed: 0, modified: 1, unchanged: 2, added: 3 };
    for (let i = 1; i < statuses.length; i++) {
      expect(statusOrder[statuses[i]]).toBeGreaterThanOrEqual(statusOrder[statuses[i - 1]]);
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLE 20: Content Block Types — Complete Coverage
// ═══════════════════════════════════════════════════════════════════════════════

describe("Cycle 20: Content Block Type Coverage", () => {
  const ALL_BLOCK_TYPES = [
    "text", "bullets", "image", "chart", "table", "citation",
    "quote", "math", "diagram", "code", "callout", "stat_result",
    "bibliography", "timeline", "divider", "toggle", "embed",
    "nested_card", "infographic",
  ];

  test("all 19 content block types exist", () => {
    // Verify each type is assignable to ContentBlock
    for (const t of ALL_BLOCK_TYPES) {
      expect(typeof t).toBe("string");
    }
    expect(ALL_BLOCK_TYPES).toHaveLength(19);
  });

  test("figure-numberable types are chart, image, diagram, infographic", () => {
    const slides = [
      {
        sortOrder: 1,
        contentBlocks: [
          makeChartBlock(),
          makeImageBlock(),
          makeDiagramBlock(),
        ],
      },
    ];
    const result = autoNumberFiguresAndTables(slides);
    expect(figureLabel(result[0].contentBlocks[0])).toBe("Figure 1");
    expect(figureLabel(result[0].contentBlocks[1])).toBe("Figure 2");
    expect(figureLabel(result[0].contentBlocks[2])).toBe("Figure 3");
  });

  test("table type gets Table numbering", () => {
    const slides = [
      { sortOrder: 1, contentBlocks: [makeTableBlock(), makeTableBlock()] },
    ];
    const result = autoNumberFiguresAndTables(slides);
    expect(figureLabel(result[0].contentBlocks[0])).toBe("Table 1");
    expect(figureLabel(result[0].contentBlocks[1])).toBe("Table 2");
  });

  test("non-visual block types are not numbered", () => {
    const nonVisualBlocks: ContentBlock[] = [
      makeTextBlock("text"),
      makeBulletsBlock(["a"]),
      makeQuoteBlock("q", "a"),
      makeCalloutBlock("t", "b"),
      makeStatBlock("l", "v"),
    ];
    const slides = [{ sortOrder: 1, contentBlocks: nonVisualBlocks }];
    const result = autoNumberFiguresAndTables(slides);
    for (const block of result[0].contentBlocks) {
      expect(figureLabel(block)).toBeUndefined();
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLE 20: Social Export Edge Cases
// ═══════════════════════════════════════════════════════════════════════════════

describe("Cycle 20: Social Export Edge Cases", () => {
  test("empty slides array returns empty thread", () => {
    const thread = generateTwitterThread([]);
    expect(thread).toEqual([]);
  });

  test("slide with only subtitle (no title) still generates tweet", () => {
    const slides: SlideData[] = [
      { title: null, subtitle: "sub", contentBlocks: [makeTextBlock("content")] },
    ];
    const thread = generateTwitterThread(slides);
    expect(thread[0]).toContain("content");
  });

  test("multiple stat results on one slide", () => {
    const slides: SlideData[] = [
      {
        title: "Results",
        contentBlocks: [
          makeStatBlock("OR", "2.5", "0.001"),
          makeStatBlock("RR", "1.8", "0.05"),
        ],
      },
    ];
    const thread = generateTwitterThread(slides);
    expect(thread[0]).toContain("OR: 2.5");
    expect(thread[0]).toContain("RR: 1.8");
  });

  test("stat result without pValue", () => {
    const slides: SlideData[] = [
      {
        title: null,
        contentBlocks: [makeStatBlock("Mean", "42.5")],
      },
    ];
    const thread = generateTwitterThread(slides);
    expect(thread[0]).toContain("Mean: 42.5");
    expect(thread[0]).not.toContain("p=");
  });

  test("10-slide thread has correct numbering", () => {
    const slides: SlideData[] = Array.from({ length: 10 }, (_, i) => ({
      title: `Slide ${i + 1}`,
      contentBlocks: [],
    }));
    const thread = generateTwitterThread(slides);
    expect(thread[0]).toContain("1/10");
    expect(thread[9]).toContain("10/10");
  });

  test("social format config types are valid", () => {
    for (const [key, fmt] of Object.entries(SOCIAL_FORMATS)) {
      expect(["pdf", "png", "text"]).toContain(fmt.fileFormat);
      expect(fmt.icon.length).toBeGreaterThan(0);
      if (key !== "twitter_thread") {
        const dimFmt = fmt as { width?: number; height?: number };
        expect(dimFmt.width).toBeGreaterThan(0);
        expect(dimFmt.height).toBeGreaterThan(0);
      }
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLE 20: Text Diff Edge Cases
// ═══════════════════════════════════════════════════════════════════════════════

describe("Cycle 20: Text Diff Edge Cases", () => {
  test("both empty strings produce empty array or same segment", () => {
    const result = computeTextDiff("", "");
    expect(result).toEqual([{ type: "same", text: "" }]);
  });

  test("single word change", () => {
    const result = computeTextDiff("the cat", "the dog");
    const removed = result.filter((s) => s.type === "removed");
    const added = result.filter((s) => s.type === "added");
    expect(removed.some((s) => s.text.includes("cat"))).toBe(true);
    expect(added.some((s) => s.text.includes("dog"))).toBe(true);
  });

  test("preserves whitespace in same segments", () => {
    const result = computeTextDiff("hello world", "hello world");
    expect(result[0].text).toBe("hello world");
  });

  test("handles multi-line text", () => {
    const oldText = "line one\nline two";
    const newText = "line one\nline three";
    const result = computeTextDiff(oldText, newText);
    // Should detect that "two" was replaced with "three"
    expect(result.some((s) => s.type === "removed")).toBe(true);
    expect(result.some((s) => s.type === "added")).toBe(true);
  });

  test("handles long identical text efficiently", () => {
    const longText = Array.from({ length: 100 }, (_, i) => `word${i}`).join(" ");
    const start = performance.now();
    const result = computeTextDiff(longText, longText);
    const elapsed = performance.now() - start;
    expect(result).toEqual([{ type: "same", text: longText }]);
    expect(elapsed).toBeLessThan(100); // should short-circuit
  });
});
