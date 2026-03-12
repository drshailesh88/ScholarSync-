import { describe, expect, it } from "vitest";
import {
  collectCitationReferenceMutations,
  type CitationReferenceMutation,
} from "@/lib/citations/remove-reference";

function createDoc(nodes: Array<{ pos: number; node: { type: { name: string }; attrs: Record<string, unknown>; nodeSize?: number } }>) {
  return {
    descendants(callback: (node: { type: { name: string }; attrs: Record<string, unknown>; nodeSize?: number }, pos: number) => void) {
      for (const entry of nodes) {
        callback(entry.node, entry.pos);
      }
    },
  };
}

describe("collectCitationReferenceMutations", () => {
  it("deletes single-reference citation nodes that only contain the removed reference", () => {
    const doc = createDoc([
      {
        pos: 10,
        node: {
          type: { name: "citation" },
          attrs: { referenceIds: ["ref-1"] },
          nodeSize: 1,
        },
      },
    ]);

    expect(collectCitationReferenceMutations(doc, "ref-1")).toEqual<
      CitationReferenceMutation[]
    >([{ kind: "delete", pos: 10, nodeSize: 1 }]);
  });

  it("updates multi-reference citation nodes and leaves other citations untouched", () => {
    const doc = createDoc([
      {
        pos: 2,
        node: {
          type: { name: "paragraph" },
          attrs: {},
          nodeSize: 4,
        },
      },
      {
        pos: 8,
        node: {
          type: { name: "citation" },
          attrs: { referenceIds: ["ref-1", "ref-2", "ref-3"] },
          nodeSize: 1,
        },
      },
      {
        pos: 14,
        node: {
          type: { name: "citation" },
          attrs: { referenceIds: ["ref-4"] },
          nodeSize: 1,
        },
      },
    ]);

    expect(collectCitationReferenceMutations(doc, "ref-2")).toEqual<
      CitationReferenceMutation[]
    >([
      {
        kind: "update",
        pos: 8,
        attrs: { referenceIds: ["ref-1", "ref-3"] },
      },
    ]);
  });

  it("returns mutations from the end of the document backwards", () => {
    const doc = createDoc([
      {
        pos: 4,
        node: {
          type: { name: "citation" },
          attrs: { referenceIds: ["ref-1"] },
          nodeSize: 1,
        },
      },
      {
        pos: 12,
        node: {
          type: { name: "citation" },
          attrs: { referenceIds: ["ref-1", "ref-2"] },
          nodeSize: 1,
        },
      },
    ]);

    expect(collectCitationReferenceMutations(doc, "ref-1")).toEqual<
      CitationReferenceMutation[]
    >([
      {
        kind: "update",
        pos: 12,
        attrs: { referenceIds: ["ref-2"] },
      },
      {
        kind: "delete",
        pos: 4,
        nodeSize: 1,
      },
    ]);
  });
});
