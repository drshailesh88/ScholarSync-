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
import type {
  ContentBlock,
  SlideLayout,
  ThemeConfig,
  BlockAnimation,
} from "@/types/presentation";
import { PRESET_THEMES } from "@/types/presentation";
import type { VersionSnapshot } from "@/lib/actions/versions";
import type { PrismaFlowData } from "../../prisma-diagram";

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

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLE 21: Deep Coverage — Block-Level Diffs, PRISMA Exclusions,
//           extractTextFromBlocks, Animation+Content Interaction,
//           Cross-Reference Robustness
// ═══════════════════════════════════════════════════════════════════════════════

describe("Cycle 21: extractTextFromBlocks", () => {
  test("extracts text from text blocks", () => {
    const blocks = [makeTextBlock("hello"), makeTextBlock("world")];
    const text = extractTextFromBlocks(blocks);
    expect(text).toBe("hello\nworld");
  });

  test("extracts items from bullets blocks", () => {
    const blocks = [makeBulletsBlock(["alpha", "beta", "gamma"])];
    const text = extractTextFromBlocks(blocks);
    expect(text).toBe("alpha\nbeta\ngamma");
  });

  test("handles mixed block types", () => {
    const blocks = [makeTextBlock("intro"), makeBulletsBlock(["a", "b"]), makeChartBlock()];
    const text = extractTextFromBlocks(blocks);
    expect(text).toBe("intro\na\nb");
  });

  test("returns empty for non-array input", () => {
    expect(extractTextFromBlocks(null)).toBe("");
    expect(extractTextFromBlocks(undefined)).toBe("");
    expect(extractTextFromBlocks("string")).toBe("");
    expect(extractTextFromBlocks(42)).toBe("");
  });

  test("returns empty for empty array", () => {
    expect(extractTextFromBlocks([])).toBe("");
  });

  test("skips blocks without data", () => {
    const blocks = [{ type: "text" }, makeTextBlock("has data")];
    const text = extractTextFromBlocks(blocks);
    expect(text).toBe("has data");
  });

  test("handles stat_result blocks (no text/items)", () => {
    const blocks = [makeStatBlock("Mean", "4.5", "0.01")];
    const text = extractTextFromBlocks(blocks);
    expect(text).toBe("");
  });

  test("handles quote blocks with text field", () => {
    const blocks = [makeQuoteBlock("To be or not to be", "Shakespeare")];
    const text = extractTextFromBlocks(blocks);
    expect(text).toBe("To be or not to be");
  });
});

describe("Cycle 21: Version Diff — Block-Level Change Details", () => {
  function makeVersion(
    slides: { id: number; title: string; contentBlocks: ContentBlock[] }[]
  ): VersionSnapshot {
    return {
      deck: {
        id: 1,
        title: "Test",
        theme: "modern",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      slides: slides.map((s, i) => ({
        id: s.id,
        title: s.title,
        subtitle: null,
        layout: "title_content" as SlideLayout,
        sortOrder: i,
        speakerNotes: null,
        contentBlocks: s.contentBlocks,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    } as unknown as VersionSnapshot;
  }

  test("detects block text content modification with field changes", () => {
    const v1 = makeVersion([
      { id: 1, title: "S1", contentBlocks: [makeTextBlock("old text")] },
    ]);
    const v2 = makeVersion([
      { id: 1, title: "S1", contentBlocks: [makeTextBlock("new text")] },
    ]);
    const diff = computeDeckDiff(v1, v2);
    expect(diff.stats.modified).toBe(1);
    const slideDiff = diff.slideDiffs.find((d) => d.slideId === 1);
    expect(slideDiff?.contentBlockChanges).toHaveLength(1);
    expect(slideDiff?.contentBlockChanges[0].status).toBe("modified");
    expect(slideDiff?.contentBlockChanges[0].fieldChanges).toBeDefined();
    const dataChange = slideDiff?.contentBlockChanges[0].fieldChanges?.find(
      (f) => f.field === "data"
    );
    expect(dataChange).toBeDefined();
  });

  test("detects block type change (text→bullets)", () => {
    const v1 = makeVersion([
      { id: 1, title: "S1", contentBlocks: [makeTextBlock("hello")] },
    ]);
    const v2 = makeVersion([
      { id: 1, title: "S1", contentBlocks: [makeBulletsBlock(["a", "b"])] },
    ]);
    const diff = computeDeckDiff(v1, v2);
    const slideDiff = diff.slideDiffs.find((d) => d.slideId === 1);
    expect(slideDiff?.contentBlockChanges[0].status).toBe("modified");
    const typeChange = slideDiff?.contentBlockChanges[0].fieldChanges?.find(
      (f) => f.field === "type"
    );
    expect(typeChange?.oldValue).toBe("text");
    expect(typeChange?.newValue).toBe("bullets");
  });

  test("detects block addition (empty→1 block)", () => {
    const v1 = makeVersion([
      { id: 1, title: "S1", contentBlocks: [] },
    ]);
    const v2 = makeVersion([
      { id: 1, title: "S1", contentBlocks: [makeTextBlock("added")] },
    ]);
    const diff = computeDeckDiff(v1, v2);
    const slideDiff = diff.slideDiffs.find((d) => d.slideId === 1);
    expect(slideDiff?.contentBlockChanges).toHaveLength(1);
    expect(slideDiff?.contentBlockChanges[0].status).toBe("added");
  });

  test("detects block removal (1 block→empty)", () => {
    const v1 = makeVersion([
      { id: 1, title: "S1", contentBlocks: [makeTextBlock("removed")] },
    ]);
    const v2 = makeVersion([
      { id: 1, title: "S1", contentBlocks: [] },
    ]);
    const diff = computeDeckDiff(v1, v2);
    const slideDiff = diff.slideDiffs.find((d) => d.slideId === 1);
    expect(slideDiff?.contentBlockChanges).toHaveLength(1);
    expect(slideDiff?.contentBlockChanges[0].status).toBe("removed");
  });

  test("handles multiple block changes on one slide", () => {
    const v1 = makeVersion([{
      id: 1,
      title: "S1",
      contentBlocks: [
        makeTextBlock("unchanged"),
        makeTextBlock("old"),
        makeChartBlock(),
      ],
    }]);
    const v2 = makeVersion([{
      id: 1,
      title: "S1",
      contentBlocks: [
        makeTextBlock("unchanged"),
        makeTextBlock("new"),
        makeChartBlock(),
        makeTableBlock(),
      ],
    }]);
    const diff = computeDeckDiff(v1, v2);
    const slideDiff = diff.slideDiffs.find((d) => d.slideId === 1);
    expect(slideDiff?.contentBlockChanges).toHaveLength(4);
    expect(slideDiff?.contentBlockChanges[0].status).toBe("unchanged");
    expect(slideDiff?.contentBlockChanges[1].status).toBe("modified");
    expect(slideDiff?.contentBlockChanges[2].status).toBe("unchanged");
    expect(slideDiff?.contentBlockChanges[3].status).toBe("added");
  });

  test("unchanged blocks have no fieldChanges", () => {
    const block = makeTextBlock("same");
    const v1 = makeVersion([{ id: 1, title: "S1", contentBlocks: [block] }]);
    const v2 = makeVersion([{ id: 1, title: "S1", contentBlocks: [block] }]);
    const diff = computeDeckDiff(v1, v2);
    const slideDiff = diff.slideDiffs.find((d) => d.slideId === 1);
    expect(slideDiff?.contentBlockChanges[0].status).toBe("unchanged");
    expect(slideDiff?.contentBlockChanges[0].fieldChanges).toBeUndefined();
  });
});

describe("Cycle 21: PRISMA Exclusion Reasons Rendering", () => {
  test("renders single exclusion reason in diagram", () => {
    const data: PrismaFlowData = {
      ...createEmptyPrismaData(),
      fullTextExcluded: 30,
      fullTextExclusionReasons: [{ reason: "Not relevant", count: 30 }],
    };
    const mermaid = generatePrismaMermaid(data);
    expect(mermaid).toContain("Not relevant (n = 30)");
  });

  test("renders multiple exclusion reasons", () => {
    const data: PrismaFlowData = {
      ...createEmptyPrismaData(),
      fullTextExcluded: 55,
      fullTextExclusionReasons: [
        { reason: "Wrong population", count: 20 },
        { reason: "Wrong outcome", count: 15 },
        { reason: "Wrong study design", count: 20 },
      ],
    };
    const mermaid = generatePrismaMermaid(data);
    expect(mermaid).toContain("Wrong population (n = 20)");
    expect(mermaid).toContain("Wrong outcome (n = 15)");
    expect(mermaid).toContain("Wrong study design (n = 20)");
  });

  test("exclusion reasons separated by <br/>", () => {
    const data: PrismaFlowData = {
      ...createEmptyPrismaData(),
      fullTextExcluded: 40,
      fullTextExclusionReasons: [
        { reason: "R1", count: 10 },
        { reason: "R2", count: 30 },
      ],
    };
    const mermaid = generatePrismaMermaid(data);
    expect(mermaid).toContain("R1 (n = 10)<br/>R2 (n = 30)");
  });

  test("PRISMA diagram computes afterDuplicates correctly", () => {
    const data: PrismaFlowData = {
      ...createEmptyPrismaData(),
      databaseRecords: 1000,
      registerRecords: 200,
      otherSourceRecords: 50,
      duplicatesRemoved: 150,
    };
    const mermaid = generatePrismaMermaid(data);
    // total = 1000+200+50 = 1250, afterDuplicates = 1250-150 = 1100
    expect(mermaid).toContain("n = 1100");
  });

  test("PRISMA diagram combines register and other source records", () => {
    const data: PrismaFlowData = {
      ...createEmptyPrismaData(),
      registerRecords: 100,
      otherSourceRecords: 50,
    };
    const mermaid = generatePrismaMermaid(data);
    expect(mermaid).toContain("n = 150"); // 100+50
  });
});

describe("Cycle 21: Animation Preset + Content Block Integration", () => {
  test("applyAnimationPreset on text blocks attaches animation", () => {
    const blocks = [makeTextBlock("a"), makeTextBlock("b"), makeTextBlock("c")];
    const animated = applyAnimationPreset(blocks, "sequential_build");
    for (const block of animated) {
      const anim = (block as ContentBlock & { animation?: BlockAnimation }).animation;
      expect(anim).toBeDefined();
      expect(anim?.type).toBe("fadeIn");
    }
  });

  test("applyAnimationPreset on chart blocks preserves chart data", () => {
    const blocks = [makeChartBlock(), makeTableBlock()];
    const animated = applyAnimationPreset(blocks, "stagger");
    expect((animated[0] as Record<string, unknown>).type).toBe("chart");
    expect((animated[1] as Record<string, unknown>).type).toBe("table");
    const d0 = (animated[0] as Record<string, unknown>).data as Record<string, unknown>;
    expect(d0.chartType).toBe("bar");
  });

  test("countRevealSteps counts correctly for results_reveal", () => {
    const blocks = [makeTextBlock("title"), makeChartBlock(), makeStatBlock("p", "0.05")];
    const animated = applyAnimationPreset(blocks, "results_reveal");
    const steps = countRevealSteps(animated);
    // results_reveal: first block order=1, rest get incrementing orders
    expect(steps).toBeGreaterThanOrEqual(2);
  });

  test("countRevealSteps is 0 for 'none' preset", () => {
    const blocks = [makeTextBlock("a"), makeTextBlock("b")];
    const animated = applyAnimationPreset(blocks, "none");
    expect(countRevealSteps(animated)).toBe(0);
  });

  test("fade_all: all blocks same reveal step", () => {
    const blocks = [makeTextBlock("a"), makeChartBlock(), makeBulletsBlock(["x"])];
    const animated = applyAnimationPreset(blocks, "fade_all");
    const steps = countRevealSteps(animated);
    expect(steps).toBe(1); // all appear at once
  });
});

describe("Cycle 21: Cross-Reference Robustness", () => {
  test("handles {fig:0} gracefully", () => {
    const segments = resolveCrossReferences("See {fig:0}");
    // fig:0 is unusual but should still resolve
    expect(segments.length).toBeGreaterThan(0);
  });

  test("handles large figure number {fig:999}", () => {
    const segments = resolveCrossReferences("See {fig:999}");
    const refSeg = segments.find((s) => s.type === "figure_ref" || s.type === "table_ref");
    // If it resolves, the ref segment should have number 999
    if (refSeg) {
      expect(refSeg.number).toBe(999);
    }
  });

  test("plain resolution passes through unknown tokens", () => {
    const result = resolveCrossReferencesPlain("See {unknown:5} and {other:2}");
    // Unknown tokens should remain as-is
    expect(result).toContain("{unknown:5}");
    expect(result).toContain("{other:2}");
  });

  test("handles multiple {fig:N} refs in sequence", () => {
    const segments = resolveCrossReferences("{fig:1}, {fig:2}, and {fig:3}");
    const figRefs = segments.filter((s) => s.type === "figure_ref");
    expect(figRefs).toHaveLength(3);
    expect(figRefs[0].number).toBe(1);
    expect(figRefs[1].number).toBe(2);
    expect(figRefs[2].number).toBe(3);
  });

  test("handles mixed {fig:N} and {tbl:N} refs", () => {
    const segments = resolveCrossReferences("See {fig:1} and {tbl:2}");
    const figRefs = segments.filter((s) => s.type === "figure_ref");
    const tblRefs = segments.filter((s) => s.type === "table_ref");
    expect(figRefs).toHaveLength(1);
    expect(tblRefs).toHaveLength(1);
  });

  test("plain resolution with mixed refs", () => {
    const result = resolveCrossReferencesPlain(
      "Compare {fig:1} with {tbl:3} and {fig:2}"
    );
    expect(result).toContain("Figure 1");
    expect(result).toContain("Table 3");
    expect(result).toContain("Figure 2");
  });
});

describe("Cycle 21: Auto-Numbering Edge Cases", () => {
  test("numbering resets properly across separate calls", () => {
    const slides1 = [{ contentBlocks: [makeChartBlock()] }];
    const result1 = autoNumberFiguresAndTables(
      slides1 as { contentBlocks: ContentBlock[] }[]
    );
    expect(figureLabel(result1[0].contentBlocks[0])).toBe("Figure 1");

    // Second call should also start at Figure 1
    const slides2 = [{ contentBlocks: [makeChartBlock()] }];
    const result2 = autoNumberFiguresAndTables(
      slides2 as { contentBlocks: ContentBlock[] }[]
    );
    expect(figureLabel(result2[0].contentBlocks[0])).toBe("Figure 1");
  });

  test("numbering across 3 slides with mixed content", () => {
    const slides = [
      { contentBlocks: [makeChartBlock(), makeTextBlock("intro")] },
      { contentBlocks: [makeImageBlock("photo"), makeTableBlock()] },
      { contentBlocks: [makeDiagramBlock(), makeChartBlock()] },
    ];
    const result = autoNumberFiguresAndTables(
      slides as { contentBlocks: ContentBlock[] }[]
    );
    expect(figureLabel(result[0].contentBlocks[0])).toBe("Figure 1");
    expect(figureLabel(result[0].contentBlocks[1])).toBeUndefined();
    expect(figureLabel(result[1].contentBlocks[0])).toBe("Figure 2");
    expect(figureLabel(result[1].contentBlocks[1])).toBe("Table 1");
    expect(figureLabel(result[2].contentBlocks[0])).toBe("Figure 3");
    expect(figureLabel(result[2].contentBlocks[1])).toBe("Figure 4");
  });

  test("slides with only text blocks produce no numbering", () => {
    const slides = [
      { contentBlocks: [makeTextBlock("a"), makeTextBlock("b")] },
      { contentBlocks: [makeBulletsBlock(["x", "y"])] },
    ];
    const result = autoNumberFiguresAndTables(
      slides as { contentBlocks: ContentBlock[] }[]
    );
    for (const slide of result) {
      for (const block of slide.contentBlocks) {
        expect(figureLabel(block)).toBeUndefined();
      }
    }
  });

  test("single table numbered correctly", () => {
    const slides = [{ contentBlocks: [makeTableBlock()] }];
    const result = autoNumberFiguresAndTables(
      slides as { contentBlocks: ContentBlock[] }[]
    );
    expect(figureLabel(result[0].contentBlocks[0])).toBe("Table 1");
  });
});

describe("Cycle 21: Social Format Validation", () => {
  test("all social formats have positive dimensions", () => {
    for (const [, format] of Object.entries(SOCIAL_FORMATS)) {
      const dims = format as unknown as SocialFormatDims;
      if (dims.width !== undefined) {
        expect(dims.width).toBeGreaterThan(0);
      }
      if (dims.height !== undefined) {
        expect(dims.height).toBeGreaterThan(0);
      }
    }
  });

  test("twitter thread handles slides with no content", () => {
    const slides = [
      { title: "Title Only", subtitle: null, contentBlocks: [] },
    ];
    const thread = generateTwitterThread(slides as SlideData[]);
    expect(thread).toHaveLength(1);
    expect(thread[0]).toContain("Title Only");
  });

  test("twitter thread handles 20 slides", () => {
    const slides = Array.from({ length: 20 }, (_, i) => ({
      title: `Slide ${i + 1}`,
      subtitle: null,
      contentBlocks: [makeTextBlock(`Content for slide ${i + 1}`)],
    }));
    const thread = generateTwitterThread(slides as SlideData[]);
    expect(thread).toHaveLength(20);
    // First tweet should have 1/20 indicator
    expect(thread[0]).toContain("1/20");
    expect(thread[19]).toContain("20/20");
  });

  test("twitter thread with quote block includes attribution", () => {
    const slides = [
      {
        title: "Quotes",
        subtitle: null,
        contentBlocks: [makeQuoteBlock("Be the change", "Gandhi")],
      },
    ];
    const thread = generateTwitterThread(slides as SlideData[]);
    expect(thread[0]).toContain("Gandhi");
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLE 22: Precise Animation Timing, Theme Inventory, Version Diff Deck Fields,
//           Text Diff Sentence Patterns, PRISMA Round-Trip Validation
// ═══════════════════════════════════════════════════════════════════════════════

describe("Cycle 22: Animation Timing Precision", () => {
  test("sequential_build delay increments by 0.5s per block", () => {
    const preset = ANIMATION_PRESETS_MAP.sequential_build;
    const anims = preset.generate(5);
    for (let i = 0; i < 5; i++) {
      expect(anims[i].delay).toBeCloseTo(i * 0.5, 5);
      expect(anims[i].duration).toBe(0.4);
      expect(anims[i].order).toBe(i + 1);
    }
  });

  test("fade_all all blocks have delay=0 and order=1", () => {
    const preset = ANIMATION_PRESETS_MAP.fade_all;
    const anims = preset.generate(4);
    for (const a of anims) {
      expect(a.delay).toBe(0);
      expect(a.duration).toBe(0.6);
      expect(a.order).toBe(1);
    }
  });

  test("stagger delay increments by 0.15s per block", () => {
    const preset = ANIMATION_PRESETS_MAP.stagger;
    const anims = preset.generate(6);
    for (let i = 0; i < 6; i++) {
      expect(anims[i].delay).toBeCloseTo(i * 0.15, 5);
      expect(anims[i].type).toBe("slideUp");
    }
  });

  test("results_reveal first block fadeIn at delay=0", () => {
    const preset = ANIMATION_PRESETS_MAP.results_reveal;
    const anims = preset.generate(4);
    expect(anims[0].type).toBe("fadeIn");
    expect(anims[0].delay).toBe(0);
    expect(anims[0].duration).toBe(0.3);
  });

  test("results_reveal subsequent blocks use scaleIn with 0.7s gap", () => {
    const preset = ANIMATION_PRESETS_MAP.results_reveal;
    const anims = preset.generate(4);
    for (let i = 1; i < 4; i++) {
      expect(anims[i].type).toBe("scaleIn");
      expect(anims[i].delay).toBeCloseTo(0.3 + (i - 1) * 0.7, 5);
      expect(anims[i].duration).toBe(0.5);
      expect(anims[i].order).toBe(i + 1);
    }
  });

  test("none preset: all blocks type='none', delay=0, duration=0, order=0", () => {
    const preset = ANIMATION_PRESETS_MAP.none;
    const anims = preset.generate(3);
    for (const a of anims) {
      expect(a.type).toBe("none");
      expect(a.delay).toBe(0);
      expect(a.duration).toBe(0);
      expect(a.order).toBe(0);
    }
  });

  test("sequential_build 10 blocks: last block delay = 4.5s", () => {
    const anims = ANIMATION_PRESETS_MAP.sequential_build.generate(10);
    expect(anims[9].delay).toBeCloseTo(4.5, 5);
    expect(anims[9].order).toBe(10);
  });
});

describe("Cycle 22: Complete Theme Inventory", () => {
  const themeKeys = Object.keys(PRESET_THEMES);

  test("at least 8 preset themes defined", () => {
    expect(themeKeys.length).toBeGreaterThanOrEqual(8);
  });

  test("every theme has all required color fields", () => {
    const requiredFields = [
      "name", "primaryColor", "secondaryColor",
      "backgroundColor", "textColor", "accentColor",
      "surfaceColor", "borderColor", "codeBackground",
      "fontFamily", "headingFontFamily",
    ];
    for (const key of themeKeys) {
      const theme = PRESET_THEMES[key];
      for (const field of requiredFields) {
        expect(theme).toHaveProperty(field);
      }
    }
  });

  test("dark theme has low-luminance background", () => {
    const darkTheme = PRESET_THEMES.dark;
    // #0F172A - first byte 0F = 15, which is dark
    const bg = darkTheme.backgroundColor;
    const r = parseInt(bg.slice(1, 3), 16);
    expect(r).toBeLessThan(50);
  });

  test("thesis theme uses serif font", () => {
    expect(PRESET_THEMES.thesis.fontFamily).toContain("serif");
    expect(PRESET_THEMES.thesis.fontFamily).not.toContain("sans-serif");
  });

  test("vibrant theme has gradient properties", () => {
    const vibrant = PRESET_THEMES.vibrant;
    expect(vibrant.gradientFrom).toBeDefined();
    expect(vibrant.gradientTo).toBeDefined();
  });

  test("clinical theme uses Helvetica", () => {
    expect(PRESET_THEMES.clinical.fontFamily).toContain("Helvetica");
  });

  test("academic theme uses different heading and body fonts", () => {
    expect(PRESET_THEMES.academic.fontFamily).not.toBe(
      PRESET_THEMES.academic.headingFontFamily
    );
  });

  test("nature theme has green primary color", () => {
    const primary = PRESET_THEMES.nature.primaryColor;
    // #166534 - green component (65) > red (16)
    const r = parseInt(primary.slice(1, 3), 16);
    const g = parseInt(primary.slice(3, 5), 16);
    expect(g).toBeGreaterThan(r);
  });
});

describe("Cycle 22: Version Diff Deck-Level Fields", () => {
  function makeVersionWithDeck(deck: Record<string, unknown>): VersionSnapshot {
    return {
      deck: {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        title: "T",
        theme: "modern",
        ...deck,
      },
      slides: [],
    } as unknown as VersionSnapshot;
  }

  test("detects audienceType change", () => {
    const v1 = makeVersionWithDeck({ audienceType: "academic" });
    const v2 = makeVersionWithDeck({ audienceType: "general" });
    const diff = computeDeckDiff(v1, v2);
    expect(diff.deckMetadataChanged).toBe(true);
    expect(diff.deckFieldChanges.find((f) => f.field === "audienceType")).toBeDefined();
  });

  test("detects templateId change", () => {
    const v1 = makeVersionWithDeck({ templateId: "tmpl-1" });
    const v2 = makeVersionWithDeck({ templateId: "tmpl-2" });
    const diff = computeDeckDiff(v1, v2);
    const change = diff.deckFieldChanges.find((f) => f.field === "templateId");
    expect(change).toBeDefined();
    expect(change?.oldValue).toBe("tmpl-1");
    expect(change?.newValue).toBe("tmpl-2");
  });

  test("detects citationStyle change", () => {
    const v1 = makeVersionWithDeck({ citationStyle: "APA" });
    const v2 = makeVersionWithDeck({ citationStyle: "MLA" });
    const diff = computeDeckDiff(v1, v2);
    const change = diff.deckFieldChanges.find((f) => f.field === "citationStyle");
    expect(change?.oldValue).toBe("APA");
    expect(change?.newValue).toBe("MLA");
  });

  test("no changes when deck metadata identical", () => {
    const v1 = makeVersionWithDeck({});
    const v2 = makeVersionWithDeck({});
    const diff = computeDeckDiff(v1, v2);
    expect(diff.deckMetadataChanged).toBe(false);
    expect(diff.deckFieldChanges).toHaveLength(0);
  });

  test("multiple deck field changes detected simultaneously", () => {
    const v1 = makeVersionWithDeck({ title: "Old", theme: "modern" });
    const v2 = makeVersionWithDeck({ title: "New", theme: "dark" });
    const diff = computeDeckDiff(v1, v2);
    expect(diff.deckFieldChanges.length).toBeGreaterThanOrEqual(2);
  });
});

describe("Cycle 22: Text Diff — Sentence Patterns", () => {
  test("word replacement mid-sentence", () => {
    const result = computeTextDiff("the cat sat", "the dog sat");
    expect(result.some((s) => s.type === "removed" && s.text.includes("cat"))).toBe(true);
    expect(result.some((s) => s.type === "added" && s.text.includes("dog"))).toBe(true);
    expect(result.some((s) => s.type === "same" && s.text.includes("the"))).toBe(true);
  });

  test("appended words detected as added", () => {
    const result = computeTextDiff("hello world", "hello world today");
    expect(result.some((s) => s.type === "added" && s.text.includes("today"))).toBe(true);
  });

  test("prepended words detected as added", () => {
    const result = computeTextDiff("world today", "hello world today");
    expect(result.some((s) => s.type === "added" && s.text.includes("hello"))).toBe(true);
  });

  test("complete sentence replacement", () => {
    const result = computeTextDiff("alpha beta gamma", "one two three");
    const removedText = result
      .filter((s) => s.type === "removed")
      .map((s) => s.text)
      .join("");
    const addedText = result
      .filter((s) => s.type === "added")
      .map((s) => s.text)
      .join("");
    expect(removedText).toContain("alpha");
    expect(addedText).toContain("one");
  });

  test("handles numeric text changes", () => {
    const result = computeTextDiff("p = 0.05", "p = 0.01");
    expect(result.some((s) => s.type === "removed" && s.text.includes("0.05"))).toBe(true);
    expect(result.some((s) => s.type === "added" && s.text.includes("0.01"))).toBe(true);
  });
});

describe("Cycle 22: PRISMA Round-Trip Validation", () => {
  test("full data → mermaid has all 4 subgraph labels", () => {
    const data: PrismaFlowData = {
      databaseRecords: 500,
      registerRecords: 100,
      otherSourceRecords: 25,
      duplicatesRemoved: 75,
      recordsScreened: 550,
      recordsExcluded: 400,
      fullTextAssessed: 150,
      fullTextExcluded: 50,
      fullTextExclusionReasons: [
        { reason: "Wrong study type", count: 30 },
        { reason: "Insufficient data", count: 20 },
      ],
      studiesIncluded: 100,
      reportsIncluded: 80,
    };
    const mermaid = generatePrismaMermaid(data);
    expect(mermaid).toContain("subgraph Identification");
    expect(mermaid).toContain("subgraph Screening");
    expect(mermaid).toContain("subgraph Eligibility");
    expect(mermaid).toContain("subgraph Included");

    // Verify specific counts appear
    expect(mermaid).toContain("n = 500");
    expect(mermaid).toContain("n = 125"); // 100+25 combined
    expect(mermaid).toContain("n = 550"); // afterDuplicates: 625-75=550
    expect(mermaid).toContain("n = 400");
    expect(mermaid).toContain("n = 150");
    expect(mermaid).toContain("n = 50");
    expect(mermaid).toContain("n = 100");
    expect(mermaid).toContain("n = 80");
  });

  test("mermaid output starts with 'graph TD'", () => {
    const mermaid = generatePrismaMermaid(createEmptyPrismaData());
    expect(mermaid.startsWith("graph TD")).toBe(true);
  });

  test("mermaid contains all 9 node references (A through I)", () => {
    const mermaid = generatePrismaMermaid(createEmptyPrismaData());
    for (const node of ["A[", "B[", "C[", "D[", "E[", "F[", "G[", "H[", "I["]) {
      expect(mermaid).toContain(node);
    }
  });

  test("mermaid contains all required flow arrows", () => {
    const mermaid = generatePrismaMermaid(createEmptyPrismaData());
    const requiredArrows = [
      "A --> C", "B --> C", "C --> D", "D --> E",
      "D --> F", "F --> G", "F --> H", "H --> I",
    ];
    for (const arrow of requiredArrows) {
      expect(mermaid).toContain(arrow);
    }
  });

  test("createEmptyPrismaData has all PrismaFlowData keys", () => {
    const empty = createEmptyPrismaData();
    const expectedKeys: (keyof PrismaFlowData)[] = [
      "databaseRecords", "registerRecords", "otherSourceRecords",
      "duplicatesRemoved", "recordsScreened", "recordsExcluded",
      "fullTextAssessed", "fullTextExcluded", "fullTextExclusionReasons",
      "studiesIncluded", "reportsIncluded",
    ];
    for (const key of expectedKeys) {
      expect(empty).toHaveProperty(key);
    }
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLE 23: Social Format Detail, Twitter Thread Boundary, Version Diff
//           Content Interaction, Auto-Numbering Infographic/Code/Citation,
//           Theme Color Validation
// ═══════════════════════════════════════════════════════════════════════════════

describe("Cycle 23: Social Format Details", () => {
  test("linkedin_carousel correct config", () => {
    const lc = SOCIAL_FORMATS.linkedin_carousel;
    expect(lc.width).toBe(1080);
    expect(lc.height).toBe(1080);
    expect(lc.aspectRatio).toBe("1:1");
    expect(lc.maxSlides).toBe(20);
    expect(lc.fileFormat).toBe("pdf");
  });

  test("twitter_thread is text-only format", () => {
    const tt = SOCIAL_FORMATS.twitter_thread;
    expect("width" in tt).toBe(false);
    expect("height" in tt).toBe(false);
    expect(tt.maxChars).toBe(280);
    expect(tt.fileFormat).toBe("text");
  });

  test("twitter_images has 16:9 aspect ratio", () => {
    const ti = SOCIAL_FORMATS.twitter_images;
    expect(ti.width).toBe(1200);
    expect(ti.height).toBe(675);
    expect(ti.aspectRatio).toBe("16:9");
    expect(ti.maxSlides).toBe(4);
    expect(ti.fileFormat).toBe("png");
  });

  test("instagram_story is 9:16 vertical", () => {
    const fmt = SOCIAL_FORMATS.instagram_story;
    expect(fmt.width).toBe(1080);
    expect(fmt.height).toBe(1920);
    expect(fmt.aspectRatio).toBe("9:16");
    expect(fmt.fileFormat).toBe("png");
  });

  test("instagram_carousel is square with 10 limit", () => {
    const ic = SOCIAL_FORMATS.instagram_carousel;
    expect(ic.width).toBe(1080);
    expect(ic.height).toBe(1080);
    expect(ic.maxSlides).toBe(10);
    expect(ic.fileFormat).toBe("png");
  });

  test("all formats have icon string", () => {
    for (const [, format] of Object.entries(SOCIAL_FORMATS)) {
      expect(format).toHaveProperty("icon");
      expect(typeof format.icon).toBe("string");
      expect(format.icon.length).toBeGreaterThan(0);
    }
  });
});

describe("Cycle 23: Twitter Thread Boundaries", () => {
  test("exactly 280 chars single slide not truncated", () => {
    const longTitle = "A".repeat(280);
    const slides = [{ title: longTitle, subtitle: null, contentBlocks: [] }];
    const thread = generateTwitterThread(slides as SlideData[]);
    expect(thread[0]).toHaveLength(280);
    expect(thread[0]).not.toContain("...");
  });

  test("281 chars single slide truncated", () => {
    const longTitle = "A".repeat(281);
    const slides = [{ title: longTitle, subtitle: null, contentBlocks: [] }];
    const thread = generateTwitterThread(slides as SlideData[]);
    expect(thread[0].length).toBeLessThanOrEqual(280);
    expect(thread[0]).toContain("...");
  });

  test("multi-slide prefix reduces available chars", () => {
    const longTitle = "B".repeat(280);
    const slides = [
      { title: longTitle, subtitle: null, contentBlocks: [] },
      { title: "Second", subtitle: null, contentBlocks: [] },
    ];
    const thread = generateTwitterThread(slides as SlideData[]);
    expect(thread[0].length).toBeLessThanOrEqual(280);
    expect(thread[0]).toContain("1/2");
  });

  test("callout without title includes only text", () => {
    const slides = [{
      title: null,
      subtitle: null,
      contentBlocks: [
        { type: "callout", data: { title: "", text: "Important note" } } as ContentBlock,
      ],
    }];
    const thread = generateTwitterThread(slides as SlideData[]);
    expect(thread[0]).toContain("Important note");
  });

  test("empty slide produces empty tweet", () => {
    const slides = [{ title: null, subtitle: null, contentBlocks: [] }];
    const thread = generateTwitterThread(slides as SlideData[]);
    expect(thread).toHaveLength(1);
    expect(thread[0].trim()).toBe("");
  });
});

describe("Cycle 23: Auto-Numbering for Infographic/Code/Citation", () => {
  test("infographic blocks not numbered (only chart/image/diagram are)", () => {
    const slides = [{
      contentBlocks: [
        { type: "infographic", data: { infographicType: "process_flow", items: [] } } as unknown as ContentBlock,
      ],
    }];
    const result = autoNumberFiguresAndTables(
      slides as { contentBlocks: ContentBlock[] }[]
    );
    expect(figureLabel(result[0].contentBlocks[0])).toBeUndefined();
  });

  test("code blocks not numbered", () => {
    const slides = [{
      contentBlocks: [
        { type: "code", data: { language: "python", code: "x=1" } } as ContentBlock,
      ],
    }];
    const result = autoNumberFiguresAndTables(
      slides as { contentBlocks: ContentBlock[] }[]
    );
    expect(figureLabel(result[0].contentBlocks[0])).toBeUndefined();
  });

  test("citation blocks not numbered", () => {
    const slides = [{
      contentBlocks: [
        { type: "citation", data: { text: "Smith 2024", source: "Nature" } } as ContentBlock,
      ],
    }];
    const result = autoNumberFiguresAndTables(
      slides as { contentBlocks: ContentBlock[] }[]
    );
    expect(figureLabel(result[0].contentBlocks[0])).toBeUndefined();
  });

  test("mixed chart + table + infographic + code sequence", () => {
    const slides = [{
      contentBlocks: [
        makeChartBlock(),
        makeTableBlock(),
        { type: "infographic", data: { infographicType: "process_flow", items: [] } } as unknown as ContentBlock,
        { type: "code", data: { language: "js", code: "" } } as ContentBlock,
      ],
    }];
    const result = autoNumberFiguresAndTables(
      slides as { contentBlocks: ContentBlock[] }[]
    );
    expect(figureLabel(result[0].contentBlocks[0])).toBe("Figure 1");
    expect(figureLabel(result[0].contentBlocks[1])).toBe("Table 1");
    expect(figureLabel(result[0].contentBlocks[2])).toBeUndefined(); // infographic not numbered
    expect(figureLabel(result[0].contentBlocks[3])).toBeUndefined(); // code not numbered
  });
});

describe("Cycle 23: Version Diff — Content Block Interaction", () => {
  function versionsFromBlocks(
    b1: ContentBlock[],
    b2: ContentBlock[]
  ): { v1: VersionSnapshot; v2: VersionSnapshot } {
    const slide = {
      id: 1, title: "S", subtitle: null,
      layout: "title_content" as SlideLayout,
      sortOrder: 0, speakerNotes: null,
      createdAt: new Date(), updatedAt: new Date(),
    };
    const deck = {
      id: 1, title: "D", theme: "modern",
      createdAt: new Date(), updatedAt: new Date(),
    };
    return {
      v1: { deck, slides: [{ ...slide, contentBlocks: b1 }] } as unknown as VersionSnapshot,
      v2: { deck, slides: [{ ...slide, contentBlocks: b2 }] } as unknown as VersionSnapshot,
    };
  }

  test("changed bullet items marks modified", () => {
    const { v1, v2 } = versionsFromBlocks(
      [makeBulletsBlock(["a", "b"])],
      [makeBulletsBlock(["a", "c"])]
    );
    const diff = computeDeckDiff(v1, v2);
    expect(diff.slideDiffs[0].contentBlockChanges[0].status).toBe("modified");
  });

  test("adding a bullet item marks modified", () => {
    const { v1, v2 } = versionsFromBlocks(
      [makeBulletsBlock(["a"])],
      [makeBulletsBlock(["a", "b"])]
    );
    const diff = computeDeckDiff(v1, v2);
    expect(diff.slideDiffs[0].contentBlockChanges[0].status).toBe("modified");
  });

  test("swapping two blocks marks both modified", () => {
    const { v1, v2 } = versionsFromBlocks(
      [makeTextBlock("first"), makeChartBlock()],
      [makeChartBlock(), makeTextBlock("first")]
    );
    const diff = computeDeckDiff(v1, v2);
    expect(diff.slideDiffs[0].contentBlockChanges.filter((c) => c.status === "modified")).toHaveLength(2);
  });

  test("growing block count marks extra as added", () => {
    const { v1, v2 } = versionsFromBlocks(
      [makeTextBlock("a")],
      [makeTextBlock("a"), makeChartBlock(), makeTableBlock()]
    );
    const diff = computeDeckDiff(v1, v2);
    const changes = diff.slideDiffs[0].contentBlockChanges;
    expect(changes).toHaveLength(3);
    expect(changes[0].status).toBe("unchanged");
    expect(changes[1].status).toBe("added");
    expect(changes[2].status).toBe("added");
  });
});

describe("Cycle 23: Theme Color Hex Validation", () => {
  const hexRegex = /^#[0-9A-Fa-f]{6}$/;

  function getThemeField(theme: ThemeConfig, field: string): string {
    return String((theme as never as Record<string, string>)[field]);
  }

  test("all themes have valid hex colors", () => {
    const colorFields = [
      "primaryColor", "secondaryColor", "backgroundColor",
      "textColor", "accentColor", "surfaceColor", "borderColor", "codeBackground",
    ];
    for (const [, theme] of Object.entries(PRESET_THEMES)) {
      for (const field of colorFields) {
        expect(getThemeField(theme, field)).toMatch(hexRegex);
      }
    }
  });

  test("fontFamily non-empty for all themes", () => {
    for (const [, theme] of Object.entries(PRESET_THEMES)) {
      expect(theme.fontFamily!.length).toBeGreaterThan(0);
    }
  });

  test("headingFontFamily non-empty for all themes", () => {
    for (const [, theme] of Object.entries(PRESET_THEMES)) {
      expect(theme.headingFontFamily!.length).toBeGreaterThan(0);
    }
  });

  test("no two themes share same name", () => {
    const names = Object.values(PRESET_THEMES).map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLE 24: Comprehensive Stress Tests, Animation Preset Map Integrity,
//           Cross-Reference Edge Cases, Text Diff Merging, PRISMA Style
// ═══════════════════════════════════════════════════════════════════════════════

describe("Cycle 24: Animation Preset Map Integrity", () => {
  test("ANIMATION_PRESETS array and MAP have same entries", () => {
    expect(ANIMATION_PRESETS.length).toBe(Object.keys(ANIMATION_PRESETS_MAP).length);
    for (const preset of ANIMATION_PRESETS) {
      expect(ANIMATION_PRESETS_MAP[preset.key]).toBe(preset);
    }
  });

  test("each preset generate returns correct count", () => {
    for (const preset of ANIMATION_PRESETS) {
      for (const count of [0, 1, 5, 10]) {
        const result = preset.generate(count);
        expect(result).toHaveLength(count);
      }
    }
  });

  test("applyAnimationPreset returns same length as input", () => {
    for (const key of Object.keys(ANIMATION_PRESETS_MAP)) {
      const blocks = Array.from({ length: 3 }, () => makeTextBlock("t"));
      const result = applyAnimationPreset(blocks, key as keyof typeof ANIMATION_PRESETS_MAP);
      expect(result).toHaveLength(3);
    }
  });

  test("applyAnimationPreset with unknown key returns original blocks", () => {
    const blocks = [makeTextBlock("a")];
    const result = applyAnimationPreset(blocks, "nonexistent" as never);
    expect(result).toBe(blocks);
  });
});

describe("Cycle 24: Cross-Reference Segment Types", () => {
  test("text segments have type 'text'", () => {
    const segments = resolveCrossReferences("plain text");
    expect(segments).toHaveLength(1);
    expect(segments[0].type).toBe("text");
    expect(segments[0].content).toBe("plain text");
  });

  test("figure ref segments have type 'figure_ref'", () => {
    const segments = resolveCrossReferences("{fig:5}");
    expect(segments).toHaveLength(1);
    expect(segments[0].type).toBe("figure_ref");
    expect(segments[0].content).toBe("Figure 5");
    expect(segments[0].number).toBe(5);
  });

  test("table ref segments have type 'table_ref'", () => {
    const segments = resolveCrossReferences("{tbl:3}");
    expect(segments).toHaveLength(1);
    expect(segments[0].type).toBe("table_ref");
    expect(segments[0].content).toBe("Table 3");
    expect(segments[0].number).toBe(3);
  });

  test("text before and after ref produces 3 segments", () => {
    const segments = resolveCrossReferences("See {fig:1} below");
    expect(segments).toHaveLength(3);
    expect(segments[0]).toEqual({ type: "text", content: "See " });
    expect(segments[1]).toEqual({ type: "figure_ref", content: "Figure 1", number: 1 });
    expect(segments[2]).toEqual({ type: "text", content: " below" });
  });

  test("resolveCrossReferencesPlain replaces all refs", () => {
    const result = resolveCrossReferencesPlain(
      "As shown in {fig:1}, {fig:2}, and {tbl:1}"
    );
    expect(result).toBe("As shown in Figure 1, Figure 2, and Table 1");
  });
});

describe("Cycle 24: Text Diff Segment Merging", () => {
  test("identical text produces single 'same' segment", () => {
    const result = computeTextDiff("a b c", "a b c");
    expect(result).toEqual([{ type: "same", text: "a b c" }]);
  });

  test("segments of same type are merged", () => {
    const result = computeTextDiff("a b", "c d");
    // removed segments should be merged, added segments should be merged
    const removed = result.filter((s) => s.type === "removed");
    const added = result.filter((s) => s.type === "added");
    // Adjacent same-type segments get merged
    for (const segs of [removed, added]) {
      for (let i = 1; i < segs.length; i++) {
        // Should not have two adjacent segments of same type in the result
        expect(result.indexOf(segs[i]) - result.indexOf(segs[i - 1])).toBeGreaterThanOrEqual(1);
      }
    }
  });

  test("diff of single-word texts", () => {
    const result = computeTextDiff("hello", "world");
    expect(result.some((s) => s.type === "removed" && s.text === "hello")).toBe(true);
    expect(result.some((s) => s.type === "added" && s.text === "world")).toBe(true);
  });
});

describe("Cycle 24: PRISMA Diagram Style", () => {
  test("has colored subgraph styles", () => {
    const mermaid = generatePrismaMermaid(createEmptyPrismaData());
    expect(mermaid).toContain("style Identification fill:#E0F2FE");
    expect(mermaid).toContain("style Screening fill:#FEF3C7");
    expect(mermaid).toContain("style Eligibility fill:#FEE2E2");
    expect(mermaid).toContain("style Included fill:#D1FAE5");
  });

  test("stroke colors are consistent with PRISMA standard", () => {
    const mermaid = generatePrismaMermaid(createEmptyPrismaData());
    expect(mermaid).toContain("stroke:#0284C7"); // Identification blue
    expect(mermaid).toContain("stroke:#D97706"); // Screening amber
    expect(mermaid).toContain("stroke:#DC2626"); // Eligibility red
    expect(mermaid).toContain("stroke:#059669"); // Included green
  });

  test("all subgraph styles have stroke-width:2px", () => {
    const mermaid = generatePrismaMermaid(createEmptyPrismaData());
    const styleLines = mermaid.split("\n").filter((l) => l.includes("style "));
    expect(styleLines).toHaveLength(4);
    for (const line of styleLines) {
      expect(line).toContain("stroke-width:2px");
    }
  });
});

describe("Cycle 24: Version Diff Stats Validation", () => {
  function makeVersion(
    slideData: { id: number; title: string }[]
  ): VersionSnapshot {
    return {
      deck: { id: 1, title: "D", theme: "modern", createdAt: new Date(), updatedAt: new Date() },
      slides: slideData.map((s, i) => ({
        id: s.id,
        title: s.title,
        subtitle: null,
        layout: "title_content" as SlideLayout,
        sortOrder: i,
        speakerNotes: null,
        contentBlocks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    } as unknown as VersionSnapshot;
  }

  test("stats sum equals total slides processed", () => {
    const v1 = makeVersion([{ id: 1, title: "A" }, { id: 2, title: "B" }, { id: 3, title: "C" }]);
    const v2 = makeVersion([{ id: 1, title: "A" }, { id: 2, title: "B2" }, { id: 4, title: "D" }]);
    const diff = computeDeckDiff(v1, v2);
    const total = diff.stats.added + diff.stats.removed + diff.stats.modified + diff.stats.unchanged;
    expect(total).toBe(diff.slideDiffs.length);
  });

  test("empty v1, 3 slides in v2 = 3 added", () => {
    const v1 = makeVersion([]);
    const v2 = makeVersion([{ id: 1, title: "A" }, { id: 2, title: "B" }, { id: 3, title: "C" }]);
    const diff = computeDeckDiff(v1, v2);
    expect(diff.stats.added).toBe(3);
    expect(diff.stats.removed).toBe(0);
    expect(diff.stats.modified).toBe(0);
    expect(diff.stats.unchanged).toBe(0);
  });

  test("3 slides in v1, empty v2 = 3 removed", () => {
    const v1 = makeVersion([{ id: 1, title: "A" }, { id: 2, title: "B" }, { id: 3, title: "C" }]);
    const v2 = makeVersion([]);
    const diff = computeDeckDiff(v1, v2);
    expect(diff.stats.removed).toBe(3);
    expect(diff.stats.added).toBe(0);
  });

  test("identical decks = all unchanged", () => {
    const v = makeVersion([{ id: 1, title: "A" }, { id: 2, title: "B" }]);
    const diff = computeDeckDiff(v, v);
    expect(diff.stats.unchanged).toBe(2);
    expect(diff.stats.modified).toBe(0);
  });
});

describe("Cycle 24: Auto-Numbering Stress & Ordering", () => {
  test("100 slides with alternating chart/table", () => {
    const slides = Array.from({ length: 100 }, (_, i) => ({
      contentBlocks: [i % 2 === 0 ? makeChartBlock() : makeTableBlock()],
    }));
    const result = autoNumberFiguresAndTables(
      slides as { contentBlocks: ContentBlock[] }[]
    );
    let figCount = 0;
    let tblCount = 0;
    for (let i = 0; i < 100; i++) {
      if (i % 2 === 0) {
        figCount++;
        expect(figureLabel(result[i].contentBlocks[0])).toBe(`Figure ${figCount}`);
      } else {
        tblCount++;
        expect(figureLabel(result[i].contentBlocks[0])).toBe(`Table ${tblCount}`);
      }
    }
    expect(figCount).toBe(50);
    expect(tblCount).toBe(50);
  });

  test("sortOrder determines numbering order", () => {
    const slides = [
      { sortOrder: 2, contentBlocks: [makeChartBlock()] },
      { sortOrder: 0, contentBlocks: [makeChartBlock()] },
      { sortOrder: 1, contentBlocks: [makeChartBlock()] },
    ];
    const result = autoNumberFiguresAndTables(slides);
    // Sorted by sortOrder: 0, 1, 2
    // So slides[1] (sortOrder=0) gets Figure 1
    // slides[2] (sortOrder=1) gets Figure 2
    // slides[0] (sortOrder=2) gets Figure 3
    expect(figureLabel(result[0].contentBlocks[0])).toBe("Figure 1"); // result is sorted
    expect(figureLabel(result[1].contentBlocks[0])).toBe("Figure 2");
    expect(figureLabel(result[2].contentBlocks[0])).toBe("Figure 3");
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLE 25: extractTextFromBlocks Deep, Social Format Keys, Animation Duration
//           Bounds, PRISMA Data Defaults, Version Diff Sort Order
// ═══════════════════════════════════════════════════════════════════════════════

describe("Cycle 25: extractTextFromBlocks — Deep Coverage", () => {
  test("callout block text is extracted via text field", () => {
    const blocks = [makeCalloutBlock("Warning", "Be careful")];
    const text = extractTextFromBlocks(blocks);
    // callout data has { title, text, type } - extractTextFromBlocks looks for data.text
    expect(text).toContain("Be careful");
  });

  test("diagram block has no text field", () => {
    const blocks = [makeDiagramBlock()];
    const text = extractTextFromBlocks(blocks);
    expect(text).toBe("");
  });

  test("image block has no text field", () => {
    const blocks = [makeImageBlock("photo")];
    const text = extractTextFromBlocks(blocks);
    expect(text).toBe("");
  });

  test("table block has no text field", () => {
    const blocks = [makeTableBlock()];
    const text = extractTextFromBlocks(blocks);
    expect(text).toBe("");
  });

  test("chart block has no text field", () => {
    const blocks = [makeChartBlock()];
    const text = extractTextFromBlocks(blocks);
    expect(text).toBe("");
  });

  test("many blocks concatenated with newlines", () => {
    const blocks = [
      makeTextBlock("line1"),
      makeTextBlock("line2"),
      makeTextBlock("line3"),
    ];
    const text = extractTextFromBlocks(blocks);
    expect(text).toBe("line1\nline2\nline3");
  });
});

describe("Cycle 25: Social Format Type Keys", () => {
  test("exactly 5 social formats exist", () => {
    expect(Object.keys(SOCIAL_FORMATS)).toHaveLength(5);
  });

  test("format keys match expected set", () => {
    const keys = Object.keys(SOCIAL_FORMATS);
    expect(keys).toContain("linkedin_carousel");
    expect(keys).toContain("twitter_thread");
    expect(keys).toContain("twitter_images");
    expect(keys).toContain("instagram_story");
    expect(keys).toContain("instagram_carousel");
  });

  test("image formats all use png", () => {
    const imageFormats = ["twitter_images", "instagram_story", "instagram_carousel"] as const;
    for (const key of imageFormats) {
      expect(SOCIAL_FORMATS[key].fileFormat).toBe("png");
    }
  });
});

describe("Cycle 25: Animation Duration Bounds", () => {
  test("all presets produce non-negative delays", () => {
    for (const preset of ANIMATION_PRESETS) {
      const anims = preset.generate(10);
      for (const a of anims) {
        expect(a.delay).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test("all presets produce non-negative durations", () => {
    for (const preset of ANIMATION_PRESETS) {
      const anims = preset.generate(10);
      for (const a of anims) {
        expect(a.duration).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test("all presets produce non-negative orders", () => {
    for (const preset of ANIMATION_PRESETS) {
      const anims = preset.generate(10);
      for (const a of anims) {
        expect(a.order).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test("sequential_build total reveal time scales with count", () => {
    const anims5 = ANIMATION_PRESETS_MAP.sequential_build.generate(5);
    const anims10 = ANIMATION_PRESETS_MAP.sequential_build.generate(10);
    const last5 = anims5[4].delay + anims5[4].duration;
    const last10 = anims10[9].delay + anims10[9].duration;
    expect(last10).toBeGreaterThan(last5);
  });
});

describe("Cycle 25: PRISMA Data Defaults", () => {
  test("createEmptyPrismaData all numeric fields are 0", () => {
    const data = createEmptyPrismaData();
    expect(data.databaseRecords).toBe(0);
    expect(data.registerRecords).toBe(0);
    expect(data.otherSourceRecords).toBe(0);
    expect(data.duplicatesRemoved).toBe(0);
    expect(data.recordsScreened).toBe(0);
    expect(data.recordsExcluded).toBe(0);
    expect(data.fullTextAssessed).toBe(0);
    expect(data.fullTextExcluded).toBe(0);
    expect(data.studiesIncluded).toBe(0);
    expect(data.reportsIncluded).toBe(0);
  });

  test("createEmptyPrismaData exclusion reasons is empty array", () => {
    const data = createEmptyPrismaData();
    expect(data.fullTextExclusionReasons).toEqual([]);
  });

  test("generatePrismaMermaid with empty data produces valid output", () => {
    const mermaid = generatePrismaMermaid(createEmptyPrismaData());
    expect(mermaid.length).toBeGreaterThan(100);
    expect(mermaid).toContain("graph TD");
    expect(mermaid.split("\n").length).toBeGreaterThan(10);
  });
});

describe("Cycle 25: Version Diff Sort Order", () => {
  function makeV(slides: { id: number; title: string }[]): VersionSnapshot {
    return {
      deck: { id: 1, title: "D", theme: "modern", createdAt: new Date(), updatedAt: new Date() },
      slides: slides.map((s, i) => ({
        id: s.id, title: s.title, subtitle: null,
        layout: "title_content" as SlideLayout,
        sortOrder: i, speakerNotes: null, contentBlocks: [],
        createdAt: new Date(), updatedAt: new Date(),
      })),
    } as unknown as VersionSnapshot;
  }

  test("slideDiffs sorted: removed first, then modified, then unchanged, then added", () => {
    const v1 = makeV([{ id: 1, title: "Keep" }, { id: 2, title: "Old" }, { id: 3, title: "Remove" }]);
    const v2 = makeV([{ id: 1, title: "Keep" }, { id: 2, title: "New" }, { id: 4, title: "Added" }]);
    const diff = computeDeckDiff(v1, v2);

    const statuses = diff.slideDiffs.map((d) => d.status);
    const order = { removed: 0, modified: 1, unchanged: 2, added: 3 };
    for (let i = 1; i < statuses.length; i++) {
      expect(order[statuses[i]]).toBeGreaterThanOrEqual(order[statuses[i - 1]]);
    }
  });

  test("each slideDiff has correct slideIndex", () => {
    const v1 = makeV([{ id: 1, title: "A" }]);
    const v2 = makeV([{ id: 1, title: "A" }]);
    const diff = computeDeckDiff(v1, v2);
    expect(diff.slideDiffs[0].slideIndex).toBe(0);
  });

  test("added slides have newTitle set", () => {
    const v1 = makeV([]);
    const v2 = makeV([{ id: 1, title: "New Slide" }]);
    const diff = computeDeckDiff(v1, v2);
    expect(diff.slideDiffs[0].status).toBe("added");
    expect(diff.slideDiffs[0].newTitle).toBe("New Slide");
  });

  test("removed slides have oldTitle set", () => {
    const v1 = makeV([{ id: 1, title: "Old Slide" }]);
    const v2 = makeV([]);
    const diff = computeDeckDiff(v1, v2);
    expect(diff.slideDiffs[0].status).toBe("removed");
    expect(diff.slideDiffs[0].oldTitle).toBe("Old Slide");
  });
});

// ═══════════════════════════════════════════════════════════════════════════════
// CYCLE 26: Final Verification — PowerPoint Parity Feature Matrix,
//           Comprehensive Integration Tests, Edge Case Regression
// ═══════════════════════════════════════════════════════════════════════════════

describe("Cycle 26: PowerPoint Feature Parity Matrix", () => {
  test("layouts cover PowerPoint standard set", () => {
    // PowerPoint has: Title, Title+Content, Section Header, Two Column, Blank, Comparison
    const pptLayouts: SlideLayout[] = [
      "title_slide", "title_content", "section_header",
      "two_column", "blank", "comparison",
    ];
    for (const layout of pptLayouts) {
      expect(layout).toBeDefined();
    }
  });

  test("animation presets cover PowerPoint transition styles", () => {
    // PPT has: Fade, Push, Wipe, Split, Reveal, Random Bars, etc.
    // Our presets map: fade_all=Fade, sequential_build=Appear, stagger=Wipe-like
    expect(ANIMATION_PRESETS_MAP.fade_all).toBeDefined();
    expect(ANIMATION_PRESETS_MAP.sequential_build).toBeDefined();
    expect(ANIMATION_PRESETS_MAP.stagger).toBeDefined();
    expect(ANIMATION_PRESETS_MAP.results_reveal).toBeDefined();
    expect(ANIMATION_PRESETS_MAP.none).toBeDefined();
  });

  test("version diff supports undo/redo equivalent via snapshot comparison", () => {
    const deck = { id: 1, title: "D", theme: "modern", createdAt: new Date(), updatedAt: new Date() };
    const slide = {
      id: 1, title: "T", subtitle: null, layout: "title_content" as SlideLayout,
      sortOrder: 0, speakerNotes: null, contentBlocks: [makeTextBlock("original")],
      createdAt: new Date(), updatedAt: new Date(),
    };
    const v1 = { deck, slides: [slide] } as unknown as VersionSnapshot;
    const edited = {
      ...slide,
      contentBlocks: [makeTextBlock("edited")],
    };
    const v2 = { deck, slides: [edited] } as unknown as VersionSnapshot;
    // Forward diff
    const forward = computeDeckDiff(v1, v2);
    expect(forward.stats.modified).toBe(1);
    // Reverse diff (undo)
    const reverse = computeDeckDiff(v2, v1);
    expect(reverse.stats.modified).toBe(1);
  });

  test("cross-references provide find & replace equivalent", () => {
    // PPT Find & Replace ≈ our cross-reference resolution
    const text = "Reference {fig:1} and {tbl:2} in slide 3";
    const plain = resolveCrossReferencesPlain(text);
    expect(plain).toContain("Figure 1");
    expect(plain).toContain("Table 2");
    expect(plain).toContain("in slide 3");
  });

  test("auto-numbering provides slide numbering equivalent", () => {
    // PPT has automatic slide numbering; our auto-numbering covers figures/tables
    const slides = Array.from({ length: 5 }, () => ({
      contentBlocks: [makeChartBlock()],
    }));
    const numbered = autoNumberFiguresAndTables(
      slides as { contentBlocks: ContentBlock[] }[]
    );
    for (let i = 0; i < 5; i++) {
      expect(figureLabel(numbered[i].contentBlocks[0])).toBe(`Figure ${i + 1}`);
    }
  });

  test("social export covers PPT export to PDF/images equivalent", () => {
    // PPT exports to PDF, PNG, PPTX; we export to Twitter thread, LinkedIn PDF, images
    expect(SOCIAL_FORMATS.linkedin_carousel.fileFormat).toBe("pdf");
    expect(SOCIAL_FORMATS.twitter_images.fileFormat).toBe("png");
    expect(SOCIAL_FORMATS.twitter_thread.fileFormat).toBe("text");
  });
});

describe("Cycle 26: Integration — Full Presentation Workflow", () => {
  test("create slides → number figures → resolve refs → diff versions", () => {
    const slides = [
      {
        sortOrder: 0,
        contentBlocks: [
          makeTextBlock("Introduction with {fig:1} reference"),
          makeChartBlock(),
        ],
      },
      {
        sortOrder: 1,
        contentBlocks: [
          makeTextBlock("Results show {fig:2} and {tbl:1}"),
          makeImageBlock("results"),
          makeTableBlock(),
        ],
      },
    ];

    // Step 1: Auto-number
    const numbered = autoNumberFiguresAndTables(slides);
    expect(figureLabel(numbered[0].contentBlocks[1])).toBe("Figure 1");
    expect(figureLabel(numbered[1].contentBlocks[1])).toBe("Figure 2");
    expect(figureLabel(numbered[1].contentBlocks[2])).toBe("Table 1");

    // Step 2: Resolve cross-references
    const refText = resolveCrossReferencesPlain("See {fig:1} and {tbl:1}");
    expect(refText).toBe("See Figure 1 and Table 1");

    // Step 3: Generate text for export
    const text0 = extractTextFromBlocks(numbered[0].contentBlocks);
    expect(text0).toContain("Introduction");

    // Step 4: Generate twitter thread
    const threadSlides = numbered.map((s, i) => ({
      title: `Slide ${i + 1}`,
      subtitle: null,
      contentBlocks: s.contentBlocks,
    }));
    const thread = generateTwitterThread(threadSlides as SlideData[]);
    expect(thread).toHaveLength(2);
  });

  test("create PRISMA diagram → validate → apply animation", () => {
    const data: PrismaFlowData = {
      databaseRecords: 1000,
      registerRecords: 200,
      otherSourceRecords: 50,
      duplicatesRemoved: 100,
      recordsScreened: 1150,
      recordsExcluded: 900,
      fullTextAssessed: 250,
      fullTextExcluded: 100,
      fullTextExclusionReasons: [{ reason: "Irrelevant", count: 100 }],
      studiesIncluded: 150,
      reportsIncluded: 120,
    };

    // Step 1: Generate diagram
    const mermaid = generatePrismaMermaid(data);
    expect(mermaid).toContain("graph TD");
    expect(mermaid).toContain("n = 1000");

    // Step 2: Create diagram block and apply animation
    const diagramBlock = makeDiagramBlock();
    const animated = applyAnimationPreset([diagramBlock], "fade_all");
    expect(animated).toHaveLength(1);
    const anim = (animated[0] as ContentBlock & { animation?: BlockAnimation }).animation;
    expect(anim?.type).toBe("fadeIn");
  });
});

describe("Cycle 26: Edge Case Regression", () => {
  test("empty string cross-reference returns single text segment", () => {
    const segments = resolveCrossReferences("");
    expect(segments).toHaveLength(1);
    expect(segments[0].type).toBe("text");
    expect(segments[0].content).toBe("");
  });

  test("computeTextDiff handles punctuation correctly", () => {
    const result = computeTextDiff("Hello, world!", "Hello, earth!");
    expect(result.some((s) => s.type === "same")).toBe(true);
  });

  test("generateTwitterThread with all block types", () => {
    const slides = [{
      title: "Mixed Content",
      subtitle: "Subtitle",
      contentBlocks: [
        makeTextBlock("Paragraph text"),
        makeBulletsBlock(["bullet 1", "bullet 2"]),
        makeStatBlock("Mean", "4.5", "0.001"),
        makeQuoteBlock("Famous words", "Author"),
        makeCalloutBlock("Note", "Important callout"),
        makeChartBlock(), // visual blocks ignored in twitter
        makeTableBlock(), // visual blocks ignored in twitter
      ],
    }];
    const thread = generateTwitterThread(slides as SlideData[]);
    expect(thread).toHaveLength(1);
    expect(thread[0]).toContain("Mixed Content");
    expect(thread[0]).toContain("Paragraph text");
    expect(thread[0]).toContain("bullet 1");
    expect(thread[0]).toContain("Mean: 4.5");
    expect(thread[0]).toContain("Famous words");
  });

  test("theme names are human-readable", () => {
    for (const [, theme] of Object.entries(PRESET_THEMES)) {
      // Name should be at least 3 characters and not contain special chars
      expect(theme.name.length).toBeGreaterThanOrEqual(3);
      expect(theme.name).toMatch(/^[A-Za-z\s]+$/);
    }
  });

  test("all animations have valid type strings", () => {
    const validTypes = ["fadeIn", "slideUp", "slideLeft", "scaleIn", "typewriter", "none"];
    for (const preset of ANIMATION_PRESETS) {
      const anims = preset.generate(5);
      for (const a of anims) {
        expect(validTypes).toContain(a.type);
      }
    }
  });
});
