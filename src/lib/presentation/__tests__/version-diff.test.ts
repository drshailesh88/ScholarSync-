/**
 * Tests for presentation version diff
 *
 * Tests diff computation between presentation versions
 */

import { describe, it, expect } from "vitest";
import {
  computeDeckDiff,
  extractTextFromBlocks,
  computeTextDiff,
} from "../version-diff";
import type { VersionSnapshot } from "@/lib/actions/versions";

// Helper to create a minimal version snapshot
function createVersion(
  slides: Array<{ id: number; sortOrder?: number; title: string | null; subtitle: string | null; layout: string | null; speakerNotes: string | null; contentBlocks: unknown }>,
  deckOverrides: Partial<VersionSnapshot["deck"]> = {}
): VersionSnapshot {
  return {
    deck: {
      title: "Test Deck",
      theme: "default",
      audienceType: "general",
      templateId: null,
      citationStyle: "vancouver",
      themeConfig: {},
      institutionKit: null,
      ...deckOverrides,
    },
    slides: slides.map((s, i) => ({
      ...s,
      sortOrder: s.sortOrder ?? i,
    })),
  };
}

describe("computeDeckDiff", () => {
  it("identical versions → all unchanged, zero diffs", () => {
    const versionA = createVersion([
      {
        id: 1,
        title: "Slide 1",
        subtitle: null,
        layout: "title",
        speakerNotes: null,
        contentBlocks: [],
      },
    ]);
    const versionB = createVersion([
      {
        id: 1,
        title: "Slide 1",
        subtitle: null,
        layout: "title",
        speakerNotes: null,
        contentBlocks: [],
      },
    ]);

    const result = computeDeckDiff(versionA, versionB);

    expect(result.deckMetadataChanged).toBe(false);
    expect(result.deckFieldChanges).toHaveLength(0);
    expect(result.slideDiffs).toHaveLength(1);
    expect(result.slideDiffs[0].status).toBe("unchanged");
    expect(result.stats).toEqual({ added: 0, removed: 0, modified: 0, unchanged: 1 });
  });

  it("detects added slide", () => {
    const versionA = createVersion([
      { id: 1, title: "Slide 1", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
    ]);
    const versionB = createVersion([
      { id: 1, title: "Slide 1", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
      { id: 2, title: "New Slide", subtitle: null, layout: "content", speakerNotes: null, contentBlocks: [] },
    ]);

    const result = computeDeckDiff(versionA, versionB);

    const added = result.slideDiffs.filter((d) => d.status === "added");
    expect(added).toHaveLength(1);
    expect(added[0].slideId).toBe(2);
    expect(added[0].newTitle).toBe("New Slide");
    expect(result.stats.added).toBe(1);
  });

  it("detects removed slide", () => {
    const versionA = createVersion([
      { id: 1, title: "Slide 1", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
      { id: 2, title: "To Remove", subtitle: null, layout: "content", speakerNotes: null, contentBlocks: [] },
    ]);
    const versionB = createVersion([
      { id: 1, title: "Slide 1", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
    ]);

    const result = computeDeckDiff(versionA, versionB);

    const removed = result.slideDiffs.filter((d) => d.status === "removed");
    expect(removed).toHaveLength(1);
    expect(removed[0].slideId).toBe(2);
    expect(removed[0].oldTitle).toBe("To Remove");
    expect(result.stats.removed).toBe(1);
  });

  it("detects modified slide title", () => {
    const versionA = createVersion([
      { id: 1, title: "Old Title", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
    ]);
    const versionB = createVersion([
      { id: 1, title: "New Title", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
    ]);

    const result = computeDeckDiff(versionA, versionB);

    expect(result.slideDiffs).toHaveLength(1);
    expect(result.slideDiffs[0].status).toBe("modified");
    expect(result.slideDiffs[0].titleChanged).toBe(true);
    expect(result.slideDiffs[0].oldTitle).toBe("Old Title");
    expect(result.slideDiffs[0].newTitle).toBe("New Title");
  });

  it("detects layout changes", () => {
    const versionA = createVersion([
      { id: 1, title: "Slide", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
    ]);
    const versionB = createVersion([
      { id: 1, title: "Slide", subtitle: null, layout: "content", speakerNotes: null, contentBlocks: [] },
    ]);

    const result = computeDeckDiff(versionA, versionB);

    expect(result.slideDiffs[0].layoutChanged).toBe(true);
    expect(result.slideDiffs[0].status).toBe("modified");
  });

  it("detects speaker notes changes", () => {
    const versionA = createVersion([
      { id: 1, title: "Slide", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
    ]);
    const versionB = createVersion([
      { id: 1, title: "Slide", subtitle: null, layout: "title", speakerNotes: "New notes", contentBlocks: [] },
    ]);

    const result = computeDeckDiff(versionA, versionB);

    expect(result.slideDiffs[0].speakerNotesChanged).toBe(true);
    expect(result.slideDiffs[0].status).toBe("modified");
  });

  it("detects content block changes", () => {
    const blockA = { type: "text", data: { text: "Old text" } };
    const blockB = { type: "text", data: { text: "New text" } };

    const versionA = createVersion([
      { id: 1, title: "Slide", subtitle: null, layout: "content", speakerNotes: null, contentBlocks: [blockA] },
    ]);
    const versionB = createVersion([
      { id: 1, title: "Slide", subtitle: null, layout: "content", speakerNotes: null, contentBlocks: [blockB] },
    ]);

    const result = computeDeckDiff(versionA, versionB);

    expect(result.slideDiffs[0].contentBlockChanges).toHaveLength(1);
    expect(result.slideDiffs[0].contentBlockChanges[0].status).toBe("modified");
    expect(result.slideDiffs[0].contentBlockChanges[0].fieldChanges).toBeDefined();
  });

  it("detects added content blocks", () => {
    const block = { type: "text", data: { text: "Text" } };

    const versionA = createVersion([
      { id: 1, title: "Slide", subtitle: null, layout: "content", speakerNotes: null, contentBlocks: [] },
    ]);
    const versionB = createVersion([
      { id: 1, title: "Slide", subtitle: null, layout: "content", speakerNotes: null, contentBlocks: [block] },
    ]);

    const result = computeDeckDiff(versionA, versionB);

    expect(result.slideDiffs[0].contentBlockChanges[0].status).toBe("added");
  });

  it("detects removed content blocks", () => {
    const block = { type: "text", data: { text: "Text" } };

    const versionA = createVersion([
      { id: 1, title: "Slide", subtitle: null, layout: "content", speakerNotes: null, contentBlocks: [block] },
    ]);
    const versionB = createVersion([
      { id: 1, title: "Slide", subtitle: null, layout: "content", speakerNotes: null, contentBlocks: [] },
    ]);

    const result = computeDeckDiff(versionA, versionB);

    expect(result.slideDiffs[0].contentBlockChanges[0].status).toBe("removed");
  });

  it("detects deck metadata changes", () => {
    const versionA = createVersion(
      [{ id: 1, title: "Slide", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] }],
      { title: "Old Title" }
    );
    const versionB = createVersion(
      [{ id: 1, title: "Slide", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] }],
      { title: "New Title" }
    );

    const result = computeDeckDiff(versionA, versionB);

    expect(result.deckMetadataChanged).toBe(true);
    expect(result.deckFieldChanges).toHaveLength(1);
    expect(result.deckFieldChanges[0].field).toBe("title");
    expect(result.deckFieldChanges[0].oldValue).toBe("Old Title");
    expect(result.deckFieldChanges[0].newValue).toBe("New Title");
  });

  it("sorts diffs by status: removed, modified, unchanged, added", () => {
    const versionA = createVersion([
      { id: 1, title: "S1", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
      { id: 2, title: "S2", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
      { id: 3, title: "S3", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
    ]);
    const versionB = createVersion([
      { id: 1, title: "S1", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
      { id: 3, title: "S3 Modified", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
      { id: 4, title: "S4 New", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
    ]);

    const result = computeDeckDiff(versionA, versionB);

    const statuses = result.slideDiffs.map((d) => d.status);
    // Order should be: removed, modified, unchanged, added
    expect(statuses).toEqual(["removed", "modified", "unchanged", "added"]);
  });

  it("handles empty decks", () => {
    const versionA = createVersion([]);
    const versionB = createVersion([]);

    const result = computeDeckDiff(versionA, versionB);

    expect(result.stats).toEqual({ added: 0, removed: 0, modified: 0, unchanged: 0 });
    expect(result.slideDiffs).toHaveLength(0);
  });

  it("detects complete reorder (tracks by ID, not position)", () => {
    const versionA = createVersion([
      { id: 1, title: "First", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
      { id: 2, title: "Second", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
      { id: 3, title: "Third", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
    ]);
    const versionB = createVersion([
      { id: 3, title: "Third", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
      { id: 1, title: "First", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
      { id: 2, title: "Second", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
    ]);

    const result = computeDeckDiff(versionA, versionB);

    // All slides still exist, so should all be unchanged
    expect(result.stats.unchanged).toBe(3);
    expect(result.stats.added).toBe(0);
    expect(result.stats.removed).toBe(0);
  });

  it("counts stats correctly", () => {
    const versionA = createVersion([
      { id: 1, title: "S1", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
      { id: 2, title: "S2", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
      { id: 3, title: "S3", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
      { id: 4, title: "S4", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
    ]);
    const versionB = createVersion([
      { id: 1, title: "S1", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
      { id: 3, title: "S3 Modified", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
      { id: 5, title: "S5 New", subtitle: null, layout: "title", speakerNotes: null, contentBlocks: [] },
    ]);

    const result = computeDeckDiff(versionA, versionB);

    expect(result.stats.added).toBe(1); // S5
    expect(result.stats.removed).toBe(2); // S2, S4
    expect(result.stats.modified).toBe(1); // S3
    expect(result.stats.unchanged).toBe(1); // S1
  });

  it("detects subtitle changes", () => {
    const versionA = createVersion([
      { id: 1, title: "Title", subtitle: "Old Subtitle", layout: "title", speakerNotes: null, contentBlocks: [] },
    ]);
    const versionB = createVersion([
      { id: 1, title: "Title", subtitle: "New Subtitle", layout: "title", speakerNotes: null, contentBlocks: [] },
    ]);

    const result = computeDeckDiff(versionA, versionB);

    expect(result.slideDiffs[0].subtitleChanged).toBe(true);
    expect(result.slideDiffs[0].status).toBe("modified");
  });
});

describe("extractTextFromBlocks", () => {
  it("returns empty string for non-array", () => {
    expect(extractTextFromBlocks(null)).toBe("");
    expect(extractTextFromBlocks(undefined)).toBe("");
    expect(extractTextFromBlocks("not an array")).toBe("");
  });

  it("extracts text from text blocks", () => {
    const blocks = [
      { type: "text", data: { text: "Hello world" } },
    ];
    expect(extractTextFromBlocks(blocks)).toBe("Hello world");
  });

  it("extracts items from bullet blocks", () => {
    const blocks = [
      { type: "bullets", data: { items: ["Item 1", "Item 2"] } },
    ];
    expect(extractTextFromBlocks(blocks)).toBe("Item 1\nItem 2");
  });

  it("handles blocks without data property", () => {
    const blocks = [
      { type: "text", data: { text: "Valid" } },
      { type: "unknown", data: null },
    ];
    expect(extractTextFromBlocks(blocks)).toBe("Valid");
  });

  it("filters out empty strings", () => {
    const blocks = [
      { type: "text", data: { text: "" } },
      { type: "text", data: { text: "Valid text" } },
    ];
    expect(extractTextFromBlocks(blocks)).toBe("Valid text");
  });
});

describe("computeTextDiff", () => {
  it("returns single same segment for identical text", () => {
    const result = computeTextDiff("Hello world", "Hello world");
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ type: "same", text: "Hello world" });
  });

  it("detects added text", () => {
    const result = computeTextDiff("Hello", "Hello world");
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ type: "same", text: "Hello" });
    expect(result[1]).toEqual({ type: "added", text: " world" });
  });

  it("detects removed text", () => {
    const result = computeTextDiff("Hello world", "Hello");
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ type: "same", text: "Hello" });
    expect(result[1]).toEqual({ type: "removed", text: " world" });
  });

  it("handles complete replacement", () => {
    const result = computeTextDiff("old text", "new text");
    // LCS finds " text" as common, so: removed(old), added(new), same( text)
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ type: "removed", text: "old" });
    expect(result[1]).toEqual({ type: "added", text: "new" });
    expect(result[2]).toEqual({ type: "same", text: " text" });
  });

  it("merges consecutive segments of same type", () => {
    const result = computeTextDiff("A B C D", "A X Y D");
    // The LCS algorithm produces alternating removed/added segments
    // Result: same(A ), removed(B), added(X), same( ), removed(C), added(Y), same( D)
    expect(result).toHaveLength(7);
    expect(result[0]).toEqual({ type: "same", text: "A " });
    expect(result[1]).toEqual({ type: "removed", text: "B" });
    expect(result[2]).toEqual({ type: "added", text: "X" });
    expect(result[3]).toEqual({ type: "same", text: " " });
    expect(result[4]).toEqual({ type: "removed", text: "C" });
    expect(result[5]).toEqual({ type: "added", text: "Y" });
    expect(result[6]).toEqual({ type: "same", text: " D" });
  });

  it("handles empty strings", () => {
    const result = computeTextDiff("", "");
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ type: "same", text: "" });
  });

  it("handles one empty string", () => {
    const result = computeTextDiff("text", "");
    // Empty string split produces [""] which creates an added segment
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ type: "removed", text: "text" });
    expect(result[1]).toEqual({ type: "added", text: "" });
  });
});
