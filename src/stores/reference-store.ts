import { create } from "zustand";
import type {
  Reference,
  CitationStyleId,
  FormattedBibliographyEntry,
} from "@/types/citation";

// ---------------------------------------------------------------------------
// Store types
// ---------------------------------------------------------------------------

interface ReferenceState {
  /** All references for the current document, keyed by id */
  references: Map<string, Reference>;

  /** Current citation style */
  citationStyle: CitationStyleId;

  /** Map of referenceId → assigned citation number (Vancouver/numbered styles) */
  referenceNumberMap: Map<string, number>;

  /** Formatted bibliography entries from the CSL processor */
  bibliographyEntries: FormattedBibliographyEntry[];

  /** Map of citation node key → formatted display text */
  citationDisplayMap: Map<string, string>;

  /** Whether the sidebar is open */
  sidebarOpen: boolean;

  /** Whether the citation dialog is open */
  citationDialogOpen: boolean;

  // Actions
  addReference: (ref: Reference) => void;
  addReferences: (refs: Reference[]) => void;
  updateReference: (id: string, updates: Partial<Reference>) => void;
  removeReference: (id: string) => void;
  setCitationStyle: (styleId: CitationStyleId) => void;
  setReferenceNumberMap: (map: Map<string, number>) => void;
  setBibliographyEntries: (entries: FormattedBibliographyEntry[]) => void;
  setCitationDisplayMap: (map: Map<string, string>) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openCitationDialog: () => void;
  closeCitationDialog: () => void;
  clearReferences: () => void;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useReferenceStore = create<ReferenceState>((set) => ({
  references: new Map(),
  citationStyle: "vancouver",
  referenceNumberMap: new Map(),
  bibliographyEntries: [],
  citationDisplayMap: new Map(),
  sidebarOpen: false,
  citationDialogOpen: false,

  addReference: (ref) =>
    set((state) => {
      const next = new Map(state.references);
      next.set(ref.id, ref);
      return { references: next };
    }),

  addReferences: (refs) =>
    set((state) => {
      const next = new Map(state.references);
      for (const ref of refs) {
        next.set(ref.id, ref);
      }
      return { references: next };
    }),

  updateReference: (id, updates) =>
    set((state) => {
      const existing = state.references.get(id);
      if (!existing) return state;
      const next = new Map(state.references);
      next.set(id, { ...existing, ...updates });
      return { references: next };
    }),

  removeReference: (id) =>
    set((state) => {
      const next = new Map(state.references);
      next.delete(id);
      return { references: next };
    }),

  setCitationStyle: (styleId) => set({ citationStyle: styleId }),

  setReferenceNumberMap: (map) => set({ referenceNumberMap: map }),

  setBibliographyEntries: (entries) =>
    set({ bibliographyEntries: entries }),

  setCitationDisplayMap: (map) => set({ citationDisplayMap: map }),

  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  openCitationDialog: () => set({ citationDialogOpen: true }),

  closeCitationDialog: () => set({ citationDialogOpen: false }),

  clearReferences: () =>
    set({
      references: new Map(),
      referenceNumberMap: new Map(),
      bibliographyEntries: [],
      citationDisplayMap: new Map(),
    }),
}));
