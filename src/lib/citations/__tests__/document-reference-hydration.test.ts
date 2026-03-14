import { describe, expect, it } from "vitest";
import {
  cloneReference,
  extractReferencesFromContent,
} from "../document-reference-hydration";
import type { Reference } from "@/types/citation";

function makeReference(overrides: Partial<Reference> = {}): Reference {
  return {
    id: "ref-manual-1",
    documentId: "doc-1",
    type: "article",
    title: "Persisted citation",
    authors: [{ given: "Jane", family: "Doe" }],
    year: 2024,
    journal: "J Testing",
    dateAdded: "2026-03-11T00:00:00.000Z",
    cslData: {
      id: "ref-manual-1",
      type: "article-journal",
      title: "Persisted citation",
      author: [{ given: "Jane", family: "Doe" }],
      issued: { "date-parts": [[2024]] },
      "container-title": "J Testing",
    },
    ...overrides,
  };
}

describe("cloneReference", () => {
  it("returns a detached copy of a reference", () => {
    const original = makeReference();
    const cloned = cloneReference(original);

    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned.authors).not.toBe(original.authors);
    expect(cloned.cslData).not.toBe(original.cslData);
  });
});

describe("extractReferencesFromContent", () => {
  it("collects embedded reference snapshots from citation nodes", () => {
    const first = makeReference();
    const second = makeReference({
      id: "ref-manual-2",
      title: "Second citation",
      cslData: {
        id: "ref-manual-2",
        type: "article-journal",
        title: "Second citation",
      },
    });

    const content = {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "citation",
              attrs: {
                referenceIds: [first.id, second.id],
                referenceSnapshots: [first, second],
              },
            },
          ],
        },
      ],
    };

    expect(extractReferencesFromContent(content, "doc-fallback")).toEqual([
      first,
      second,
    ]);
  });

  it("ignores citation nodes that do not carry snapshots", () => {
    const content = {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "citation", attrs: { referenceIds: ["ref-1"] } }],
        },
      ],
    };

    expect(extractReferencesFromContent(content, "doc-fallback")).toEqual([]);
  });
});
