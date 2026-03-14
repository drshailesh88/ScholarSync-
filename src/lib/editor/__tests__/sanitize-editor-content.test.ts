import { describe, expect, it } from "vitest";
import { sanitizeEditorContent } from "../sanitize-editor-content";

describe("sanitizeEditorContent", () => {
  it("removes malformed citations with no reference ids", () => {
    const content = {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "citation", attrs: { referenceIds: [], referenceSnapshots: [] } },
            {
              type: "citation",
              attrs: {
                referenceIds: ["ref-1"],
                referenceSnapshots: [{ id: "ref-1", title: "Ref 1" }],
              },
            },
          ],
        },
      ],
    };

    expect(sanitizeEditorContent(content)).toEqual({
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "citation",
              attrs: {
                referenceIds: ["ref-1"],
                referenceSnapshots: [{ id: "ref-1", title: "Ref 1" }],
              },
            },
          ],
        },
      ],
    });
  });

  it("keeps citation snapshots aligned with live reference ids", () => {
    const content = {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "citation",
              attrs: {
                referenceIds: ["ref-1"],
                referenceSnapshots: [
                  { id: "ref-1", title: "Keep me" },
                  { id: "ref-2", title: "Drop me" },
                ],
                overrides: null,
              },
            },
          ],
        },
      ],
    };

    expect(sanitizeEditorContent(content)).toEqual({
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "citation",
              attrs: {
                referenceIds: ["ref-1"],
                referenceSnapshots: [{ id: "ref-1", title: "Keep me" }],
                overrides: null,
              },
            },
          ],
        },
      ],
    });
  });

  it("deduplicates bibliography nodes", () => {
    const content = {
      type: "doc",
      content: [{ type: "bibliography" }, { type: "bibliography" }],
    };

    expect(sanitizeEditorContent(content)).toEqual({
      type: "doc",
      content: [{ type: "bibliography" }],
    });
  });
});
