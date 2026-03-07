import { describe, it, expect } from "vitest";
import {
  computeMorphIds,
  findMorphPairs,
  MORPH_TITLE_ID,
  MORPH_SUBTITLE_ID,
} from "../morph-matcher";
import type { ContentBlock } from "@/types/presentation";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function textBlock(text: string): ContentBlock {
  return { type: "text", data: { text } } as ContentBlock;
}

function imageBlock(url: string): ContentBlock {
  return { type: "image", data: { url } } as ContentBlock;
}

function bulletBlock(items: string[]): ContentBlock {
  return { type: "bullets", data: { items } } as ContentBlock;
}

function slide(
  opts: {
    title?: string;
    subtitle?: string;
    contentBlocks?: ContentBlock[];
  } = {}
) {
  return {
    title: opts.title ?? null,
    subtitle: opts.subtitle ?? null,
    contentBlocks: opts.contentBlocks ?? [],
  };
}

// ---------------------------------------------------------------------------
// computeMorphIds
// ---------------------------------------------------------------------------

describe("computeMorphIds", () => {
  it("generates matching morphIds for identical text blocks", () => {
    const block = textBlock("Introduction to machine learning concepts");
    const ids1 = computeMorphIds(slide({ contentBlocks: [block] }));
    const ids2 = computeMorphIds(
      slide({ contentBlocks: [textBlock("Introduction to machine learning concepts")] })
    );

    expect(ids1.get(0)).toBeDefined();
    expect(ids1.get(0)).toBe(ids2.get(0));
  });

  it("generates different morphIds for different text blocks", () => {
    const blocks = [
      textBlock("First paragraph about biology"),
      textBlock("Second paragraph about physics"),
    ];
    const ids = computeMorphIds(slide({ contentBlocks: blocks }));

    expect(ids.get(0)).toBeDefined();
    expect(ids.get(1)).toBeDefined();
    expect(ids.get(0)).not.toBe(ids.get(1));
  });

  it("matches images with the same URL", () => {
    const url = "https://example.com/diagram.png";
    const ids1 = computeMorphIds(slide({ contentBlocks: [imageBlock(url)] }));
    const ids2 = computeMorphIds(slide({ contentBlocks: [imageBlock(url)] }));

    expect(ids1.get(0)).toBe(ids2.get(0));
  });

  it("does not match images with different URLs", () => {
    const ids1 = computeMorphIds(
      slide({ contentBlocks: [imageBlock("https://example.com/a.png")] })
    );
    const ids2 = computeMorphIds(
      slide({ contentBlocks: [imageBlock("https://example.com/b.png")] })
    );

    expect(ids1.get(0)).not.toBe(ids2.get(0));
  });

  it("text blocks match when first 20 chars are identical", () => {
    const ids1 = computeMorphIds(
      slide({
        contentBlocks: [textBlock("The quick brown fox jumps over the lazy dog")],
      })
    );
    const ids2 = computeMorphIds(
      slide({
        contentBlocks: [textBlock("The quick brown fox jumps over a sleeping cat")],
      })
    );

    // First 20 chars: "The quick brown fox " — identical
    expect(ids1.get(0)).toBe(ids2.get(0));
  });

  it("produces stable morphIds (same input always gives same ID)", () => {
    const block = textBlock("Reproducibility in science");
    const results: string[] = [];
    for (let i = 0; i < 5; i++) {
      const ids = computeMorphIds(slide({ contentBlocks: [block] }));
      results.push(ids.get(0)!);
    }
    expect(new Set(results).size).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// findMorphPairs
// ---------------------------------------------------------------------------

describe("findMorphPairs", () => {
  it("finds title-to-title match", () => {
    const from = slide({ title: "Methods" });
    const to = slide({ title: "Results" });
    const pairs = findMorphPairs(from, to);

    const titlePair = pairs.find((p) => p.morphId === MORPH_TITLE_ID);
    expect(titlePair).toBeDefined();
    expect(titlePair!.fromIndex).toBe(-1);
    expect(titlePair!.toIndex).toBe(-1);
  });

  it("finds subtitle-to-subtitle match", () => {
    const from = slide({ title: "A", subtitle: "sub1" });
    const to = slide({ title: "B", subtitle: "sub2" });
    const pairs = findMorphPairs(from, to);

    expect(pairs.find((p) => p.morphId === MORPH_SUBTITLE_ID)).toBeDefined();
  });

  it("does not match title when one side is missing", () => {
    const from = slide({ title: "Hello" });
    const to = slide({});
    const pairs = findMorphPairs(from, to);

    expect(pairs.find((p) => p.morphId === MORPH_TITLE_ID)).toBeUndefined();
  });

  it("matches identical text blocks between slides", () => {
    const text = "Machine learning overview and key concepts explained in detail";
    const from = slide({ contentBlocks: [textBlock(text)] });
    const to = slide({ contentBlocks: [textBlock(text)] });
    const pairs = findMorphPairs(from, to);

    const blockPairs = pairs.filter(
      (p) => p.morphId !== MORPH_TITLE_ID && p.morphId !== MORPH_SUBTITLE_ID
    );
    expect(blockPairs).toHaveLength(1);
    expect(blockPairs[0].fromIndex).toBe(0);
    expect(blockPairs[0].toIndex).toBe(0);
  });

  it("matches images with same URL between slides", () => {
    const url = "https://example.com/chart.png";
    const from = slide({ contentBlocks: [imageBlock(url)] });
    const to = slide({ contentBlocks: [imageBlock(url)] });
    const pairs = findMorphPairs(from, to);

    const blockPairs = pairs.filter(
      (p) => p.morphId !== MORPH_TITLE_ID && p.morphId !== MORPH_SUBTITLE_ID
    );
    expect(blockPairs).toHaveLength(1);
  });

  it("returns empty pairs array when no elements match", () => {
    const from = slide({
      contentBlocks: [textBlock("Alpha block content here")],
    });
    const to = slide({
      contentBlocks: [textBlock("Completely different text")],
    });
    const pairs = findMorphPairs(from, to);

    // No title/subtitle either
    expect(pairs).toHaveLength(0);
  });

  it("handles partial matches (some match, some don't)", () => {
    const sharedUrl = "https://example.com/shared.png";
    const from = slide({
      contentBlocks: [
        textBlock("Unique from-slide paragraph"),
        imageBlock(sharedUrl),
        textBlock("Another unique from paragraph"),
      ],
    });
    const to = slide({
      contentBlocks: [
        textBlock("Unique to-slide paragraph"),
        imageBlock(sharedUrl),
        bulletBlock(["item1", "item2"]),
      ],
    });
    const pairs = findMorphPairs(from, to);

    // Only the image should match
    const blockPairs = pairs.filter(
      (p) => p.morphId !== MORPH_TITLE_ID && p.morphId !== MORPH_SUBTITLE_ID
    );
    expect(blockPairs).toHaveLength(1);
    expect(blockPairs[0].fromIndex).toBe(1);
    expect(blockPairs[0].toIndex).toBe(1);
  });

  it("morphId stability — same input always generates same ID", () => {
    const from = slide({
      title: "Test",
      contentBlocks: [textBlock("Stable input paragraph text")],
    });
    const to = slide({
      title: "Test 2",
      contentBlocks: [textBlock("Stable input paragraph text")],
    });

    const pairs1 = findMorphPairs(from, to);
    const pairs2 = findMorphPairs(from, to);

    expect(pairs1).toEqual(pairs2);
  });
});
