/**
 * Tests for reference Zustand store
 *
 * Tests reference management, citation styles, and sidebar state
 */

import { describe, it, expect, beforeEach } from "vitest";
import { useReferenceStore } from "../reference-store";
import type { Reference, Author, FormattedBibliographyEntry, CSLItem } from "@/types/citation";

// Helper to create a minimal CSLItem
const createCSLItem = (title: string): CSLItem => ({
  type: "article",
  title,
  author: [],
});

describe("useReferenceStore", () => {
  beforeEach(() => {
    useReferenceStore.getState().clearReferences();
  });

  describe("initial state", () => {
    it("has empty references Map", () => {
      const state = useReferenceStore.getState();
      expect(state.references).toBeInstanceOf(Map);
      expect(state.references.size).toBe(0);
    });

    it("has default citation style vancouver", () => {
      const state = useReferenceStore.getState();
      expect(state.citationStyle).toBe("vancouver");
    });

    it("has empty referenceNumberMap", () => {
      const state = useReferenceStore.getState();
      expect(state.referenceNumberMap).toBeInstanceOf(Map);
      expect(state.referenceNumberMap.size).toBe(0);
    });

    it("has empty bibliography entries", () => {
      const state = useReferenceStore.getState();
      expect(state.bibliographyEntries).toEqual([]);
    });

    it("has empty citationDisplayMap", () => {
      const state = useReferenceStore.getState();
      expect(state.citationDisplayMap).toBeInstanceOf(Map);
      expect(state.citationDisplayMap.size).toBe(0);
    });

    it("sidebars and dialogs are closed", () => {
      const state = useReferenceStore.getState();
      expect(state.sidebarOpen).toBe(false);
      expect(state.citationDialogOpen).toBe(false);
    });
  });

  describe("addReference", () => {
    const createAuthor = (name: string): Author => {
      const parts = name.split(" ");
      return { given: parts[0] ?? "", family: parts[1] ?? name };
    };

    it("adds a single reference", () => {
      const store = useReferenceStore.getState();
      const ref: Reference = {
        id: "ref-1",
        documentId: "doc-1",
        type: "article",
        authors: [createAuthor("Smith J")],
        year: 2023,
        title: "Test Paper",
        dateAdded: new Date().toISOString(),
        cslData: createCSLItem("Test Paper"),
      };

      store.addReference(ref);
      const state = useReferenceStore.getState();

      expect(state.references.size).toBe(1);
      expect(state.references.get("ref-1")).toEqual(ref);
    });

    it("replaces existing reference with same id", () => {
      const store = useReferenceStore.getState();
      const ref1: Reference = {
        id: "ref-1",
        documentId: "doc-1",
        type: "article",
        authors: [{ given: "A", family: "B" }],
        year: 2023,
        title: "V1",
        dateAdded: new Date().toISOString(),
        cslData: createCSLItem("V1"),
      };
      const ref2: Reference = {
        id: "ref-1",
        documentId: "doc-1",
        type: "article",
        authors: [{ given: "C", family: "D" }],
        year: 2024,
        title: "V2",
        dateAdded: new Date().toISOString(),
        cslData: createCSLItem("V2"),
      };

      store.addReference(ref1);
      store.addReference(ref2);

      expect(useReferenceStore.getState().references.size).toBe(1);
      expect(useReferenceStore.getState().references.get("ref-1")?.title).toBe("V2");
    });
  });

  describe("addReferences", () => {
    it("adds multiple references at once", () => {
      const store = useReferenceStore.getState();
      const refs: Reference[] = [
        {
          id: "ref-1",
          documentId: "doc-1",
          type: "article",
          authors: [{ given: "A", family: "B" }],
          year: 2023,
          title: "Paper 1",
          dateAdded: new Date().toISOString(),
          cslData: createCSLItem("Paper 1"),
        },
        {
          id: "ref-2",
          documentId: "doc-1",
          type: "article",
          authors: [{ given: "C", family: "D" }],
          year: 2023,
          title: "Paper 2",
          dateAdded: new Date().toISOString(),
          cslData: createCSLItem("Paper 2"),
        },
      ];

      store.addReferences(refs);
      const state = useReferenceStore.getState();

      expect(state.references.size).toBe(2);
    });
  });

  describe("updateReference", () => {
    it("updates existing reference", () => {
      const store = useReferenceStore.getState();
      const ref: Reference = {
        id: "ref-1",
        documentId: "doc-1",
        type: "article",
        authors: [{ given: "Smith", family: "J" }],
        year: 2023,
        title: "Original",
        dateAdded: new Date().toISOString(),
        cslData: createCSLItem("Original"),
      };

      store.addReference(ref);
      store.updateReference("ref-1", { title: "Updated" });

      expect(useReferenceStore.getState().references.get("ref-1")?.title).toBe("Updated");
    });

    it("does nothing for non-existent reference", () => {
      const store = useReferenceStore.getState();
      const originalSize = useReferenceStore.getState().references.size;

      store.updateReference("non-existent", { title: "Updated" });

      expect(useReferenceStore.getState().references.size).toBe(originalSize);
    });
  });

  describe("removeReference", () => {
    it("removes reference by id", () => {
      const store = useReferenceStore.getState();
      const ref: Reference = {
        id: "ref-1",
        documentId: "doc-1",
        type: "article",
        authors: [{ given: "A", family: "B" }],
        year: 2023,
        title: "Paper",
        dateAdded: new Date().toISOString(),
        cslData: createCSLItem("Paper"),
      };

      store.addReference(ref);
      expect(useReferenceStore.getState().references.size).toBe(1);

      store.removeReference("ref-1");
      expect(useReferenceStore.getState().references.size).toBe(0);
    });

    it("handles removing non-existent reference", () => {
      const store = useReferenceStore.getState();
      expect(() => store.removeReference("non-existent")).not.toThrow();
    });
  });

  describe("citation style", () => {
    it("setCitationStyle changes style", () => {
      const store = useReferenceStore.getState();
      store.setCitationStyle("apa");
      expect(useReferenceStore.getState().citationStyle).toBe("apa");
    });
  });

  describe("setReferenceNumberMap", () => {
    it("sets the map", () => {
      const store = useReferenceStore.getState();
      const map = new Map([["ref-1", 1], ["ref-2", 2]]);

      store.setReferenceNumberMap(map);
      expect(useReferenceStore.getState().referenceNumberMap).toEqual(map);
    });
  });

  describe("bibliography", () => {
    it("setBibliographyEntries sets entries", () => {
      const store = useReferenceStore.getState();
      const entries: FormattedBibliographyEntry[] = [
        {
          id: "ref-1",
          html: "<div>Smith J. Paper. 2023.</div>",
          text: "Smith J. Paper. 2023.",
        },
      ];

      store.setBibliographyEntries(entries);
      expect(useReferenceStore.getState().bibliographyEntries).toEqual(entries);
    });
  });

  describe("citationDisplayMap", () => {
    it("setCitationDisplayMap sets map", () => {
      const store = useReferenceStore.getState();
      const map = new Map([["cite-1", "[1]"]]);

      store.setCitationDisplayMap(map);
      expect(useReferenceStore.getState().citationDisplayMap).toEqual(map);
    });
  });

  describe("sidebar", () => {
    it("toggleSidebar flips state", () => {
      const store = useReferenceStore.getState();
      expect(useReferenceStore.getState().sidebarOpen).toBe(false);

      store.toggleSidebar();
      expect(useReferenceStore.getState().sidebarOpen).toBe(true);

      store.toggleSidebar();
      expect(useReferenceStore.getState().sidebarOpen).toBe(false);
    });

    it("setSidebarOpen sets specific value", () => {
      const store = useReferenceStore.getState();
      store.setSidebarOpen(true);
      expect(useReferenceStore.getState().sidebarOpen).toBe(true);

      store.setSidebarOpen(false);
      expect(useReferenceStore.getState().sidebarOpen).toBe(false);
    });
  });

  describe("citation dialog", () => {
    it("openCitationDialog opens dialog", () => {
      const store = useReferenceStore.getState();
      store.openCitationDialog();
      expect(useReferenceStore.getState().citationDialogOpen).toBe(true);
    });

    it("closeCitationDialog closes dialog", () => {
      const store = useReferenceStore.getState();
      store.openCitationDialog();
      store.closeCitationDialog();
      expect(useReferenceStore.getState().citationDialogOpen).toBe(false);
    });
  });

  describe("clearReferences", () => {
    it("clears all references", () => {
      const store = useReferenceStore.getState();
      const ref: Reference = {
        id: "ref-1",
        documentId: "doc-1",
        type: "article",
        authors: [{ given: "A", family: "B" }],
        year: 2023,
        title: "Paper",
        dateAdded: new Date().toISOString(),
        cslData: createCSLItem("Paper"),
      };

      store.addReference(ref);
      expect(useReferenceStore.getState().references.size).toBe(1);

      store.clearReferences();
      expect(useReferenceStore.getState().references.size).toBe(0);
    });
  });
});
