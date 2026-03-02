import { create } from "zustand";
import type {
  ContentBlock,
  SlideLayout,
  ThemeConfig,
  AudienceType,
  InstitutionKit,
} from "@/types/presentation";
import { PRESET_THEMES } from "@/types/presentation";
import {
  getDeck,
  updateDeck,
  createSlide as createSlideAction,
  updateSlide as updateSlideAction,
  deleteSlide as deleteSlideAction,
  reorderSlides as reorderSlidesAction,
} from "@/lib/actions/presentations";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CardBackground {
  color?: string;
  imageUrl?: string;
  imagePosition?: "none" | "top" | "left" | "right" | "background";
  overlayType?: "none" | "frosted" | "faded" | "clear";
  overlayIntensity?: number; // 0-100
  overlayColor?: string;
}

export interface SlideState {
  id: number;
  sortOrder: number;
  layout: SlideLayout;
  title: string;
  subtitle: string;
  contentBlocks: ContentBlock[];
  speakerNotes: string;
  cardBackground?: CardBackground;
}

export type WorkspaceMode = "slides" | "create";
export type RightPanel =
  | "properties"
  | "agent"
  | "comments"
  | "versions"
  | "analytics"
  | "defense"
  | null;
export type AgentMode = "learn" | "draft" | "visual";
export type SaveStatus = "idle" | "saving" | "saved" | "error";

// ---------------------------------------------------------------------------
// Undo/Redo — snapshot-based history per slide
// ---------------------------------------------------------------------------

interface UndoEntry {
  slideId: number;
  before: Partial<SlideState>;
}

const MAX_UNDO_HISTORY = 50;

export interface SlidesStore {
  // Deck metadata
  deckId: number | null;
  title: string;
  description: string;
  audienceType: AudienceType;
  themeKey: string;
  themeConfig: ThemeConfig;

  // Branding
  institutionKit: Partial<InstitutionKit> | null;
  setInstitutionKit: (kit: Partial<InstitutionKit> | null) => void;

  // Slides
  slides: SlideState[];
  activeSlideId: number | null;

  // Block selection (shared so properties panel can see it)
  selectedBlockIndex: number | null;
  setSelectedBlockIndex: (idx: number | null) => void;

  // Workspace mode
  mode: WorkspaceMode;
  setMode: (mode: WorkspaceMode) => void;

  // Right panel
  rightPanel: RightPanel;
  setRightPanel: (panel: RightPanel) => void;

  // Agent
  agentMode: AgentMode;
  setAgentMode: (mode: AgentMode) => void;

  // Presentation settings
  transition: "none" | "fade" | "slide" | "zoom";
  setTransition: (t: "none" | "fade" | "slide" | "zoom") => void;

  // UI state
  isPresenting: boolean;
  setIsPresenting: (v: boolean) => void;
  showSharePanel: boolean;
  setShowSharePanel: (v: boolean) => void;
  agentPanelOpen: boolean;
  setAgentPanelOpen: (v: boolean) => void;

  // Find & Replace
  showFindReplace: boolean;
  setShowFindReplace: (v: boolean) => void;

  // Slide Sorter
  showSlideSorter: boolean;
  setShowSlideSorter: (v: boolean) => void;

  // Save status
  saveStatus: SaveStatus;

  // Computed
  getActiveSlide: () => SlideState | null;
  getSelectedBlock: () => ContentBlock | null;

  // Deck actions
  loadDeck: (deckId: number) => Promise<boolean>;
  setTitle: (title: string) => void;
  setTheme: (key: string, config: ThemeConfig) => void;
  setAudienceType: (type: AudienceType) => void;

  // Slide actions
  setActiveSlide: (id: number | null) => void;
  updateSlide: (id: number, data: Partial<SlideState>) => void;
  addSlide: (afterId?: number) => Promise<SlideState | null>;
  deleteSlide: (id: number) => Promise<void>;
  duplicateSlide: (id: number) => Promise<void>;
  reorderSlides: (ids: number[]) => Promise<void>;

  // Clipboard (copy/paste slides)
  clipboardSlide: Omit<SlideState, "id" | "sortOrder"> | null;
  copySlide: (id: number) => void;
  pasteSlide: () => Promise<void>;

  // Block-level update (convenience)
  updateBlock: (blockIndex: number, block: ContentBlock) => void;

  // Undo / Redo
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Batch update (for agent/generation)
  replaceAllSlides: (slides: SlideState[]) => void;

  // Internal
  _saveTimer: ReturnType<typeof setTimeout> | null;
  _debouncedSave: (slideId: number, data: Partial<SlideState>) => void;
  _undoStack: UndoEntry[];
  _redoStack: UndoEntry[];
  _pushUndo: (slideId: number, before: Partial<SlideState>) => void;
  _undoTimer: ReturnType<typeof setTimeout> | null;
  _pendingUndoBefore: Partial<SlideState> | null;
  _pendingUndoSlideId: number | null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalizeSlide(raw: Record<string, unknown>): SlideState {
  return {
    id: raw.id as number,
    sortOrder: (raw.sortOrder as number) ?? 0,
    layout: (raw.layout as SlideLayout) ?? "title_content",
    title: (raw.title as string) ?? "",
    subtitle: (raw.subtitle as string) ?? "",
    contentBlocks: (raw.contentBlocks as ContentBlock[]) ?? [],
    speakerNotes: (raw.speakerNotes as string) ?? "",
    cardBackground: raw.cardBackground as CardBackground | undefined,
  };
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useSlidesStore = create<SlidesStore>((set, get) => ({
  // Deck metadata
  deckId: null,
  title: "",
  description: "",
  audienceType: "general",
  themeKey: "modern",
  themeConfig: PRESET_THEMES.modern,

  // Branding
  institutionKit: null,
  setInstitutionKit: (institutionKit) => set({ institutionKit }),

  // Slides
  slides: [],
  activeSlideId: null,

  // Block selection
  selectedBlockIndex: null,
  setSelectedBlockIndex: (idx) => set({ selectedBlockIndex: idx }),

  // Mode
  mode: "slides",
  setMode: (mode) => set({ mode }),

  // Right panel
  rightPanel: "properties",
  setRightPanel: (panel) => set({ rightPanel: panel }),

  // Agent
  agentMode: "draft",
  setAgentMode: (agentMode) => set({ agentMode }),

  // Presentation settings
  transition: "fade",
  setTransition: (transition) => set({ transition }),

  // UI
  isPresenting: false,
  setIsPresenting: (isPresenting) => set({ isPresenting }),
  showSharePanel: false,
  setShowSharePanel: (showSharePanel) => set({ showSharePanel }),
  agentPanelOpen: false,
  setAgentPanelOpen: (agentPanelOpen) => set({ agentPanelOpen }),

  // Find & Replace
  showFindReplace: false,
  setShowFindReplace: (showFindReplace) => set({ showFindReplace }),

  showSlideSorter: false,
  setShowSlideSorter: (showSlideSorter) => set({ showSlideSorter }),

  // Clipboard
  clipboardSlide: null,
  copySlide: (id) => {
    const slide = get().slides.find((s) => s.id === id);
    if (!slide) return;
    const { id: _id, sortOrder: _so, ...rest } = slide;
    set({ clipboardSlide: rest });
  },
  pasteSlide: async () => {
    const { deckId, clipboardSlide, activeSlideId, slides } = get();
    if (!deckId || !clipboardSlide) return;

    const activeSlide = slides.find((s) => s.id === activeSlideId);
    const sortOrder = activeSlide ? activeSlide.sortOrder + 1 : slides.length;

    try {
      const created = await createSlideAction({
        deckId,
        sortOrder,
        layout: clipboardSlide.layout,
        title: clipboardSlide.title,
        contentBlocks: clipboardSlide.contentBlocks,
        speakerNotes: clipboardSlide.speakerNotes,
      });
      const newSlide = normalizeSlide(
        created as unknown as Record<string, unknown>
      );

      set((state) => {
        const updated = [...state.slides];
        updated.splice(sortOrder, 0, newSlide);
        const reordered = updated.map((s, i) => ({
          ...s,
          sortOrder: i,
        }));
        return { slides: reordered, activeSlideId: newSlide.id };
      });
    } catch {
      // ignore
    }
  },

  // Save
  saveStatus: "idle",

  // Undo / Redo stacks
  _undoStack: [],
  _redoStack: [],
  _undoTimer: null,
  _pendingUndoBefore: null,
  _pendingUndoSlideId: null,
  _pushUndo: (slideId, before) => {
    const state = get();

    // If we're already coalescing changes for this slide, keep the
    // *original* before-state (the one captured before the first keystroke)
    // and just extend the debounce window.
    if (state._pendingUndoSlideId === slideId && state._pendingUndoBefore !== null) {
      // Merge any NEW keys from `before` that weren't in the pending snapshot.
      // This handles the case where an earlier call captured `{ title }` and a
      // later call in the same burst also touches `{ subtitle }`.
      const merged = { ...state._pendingUndoBefore };
      for (const key of Object.keys(before) as (keyof SlideState)[]) {
        if (!(key in merged)) {
          (merged as Record<string, unknown>)[key] = (before as Record<string, unknown>)[key];
        }
      }
      set({ _pendingUndoBefore: merged });
    } else {
      // Flush any previous pending entry for a *different* slide
      if (state._pendingUndoBefore !== null && state._pendingUndoSlideId !== null) {
        set((s) => ({
          _undoStack: [
            ...s._undoStack.slice(-(MAX_UNDO_HISTORY - 1)),
            { slideId: state._pendingUndoSlideId!, before: state._pendingUndoBefore! },
          ],
        }));
      }
      // Start a new pending entry
      set({ _pendingUndoBefore: before, _pendingUndoSlideId: slideId });
    }

    // Clear redo on any new action
    set({ _redoStack: [] });

    // Reset the debounce timer — flush after 500ms of inactivity
    const timer = get()._undoTimer;
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => {
      const s = get();
      if (s._pendingUndoBefore !== null && s._pendingUndoSlideId !== null) {
        set((prev) => ({
          _undoStack: [
            ...prev._undoStack.slice(-(MAX_UNDO_HISTORY - 1)),
            { slideId: s._pendingUndoSlideId!, before: s._pendingUndoBefore! },
          ],
          _pendingUndoBefore: null,
          _pendingUndoSlideId: null,
          _undoTimer: null,
        }));
      }
    }, 500);
    set({ _undoTimer: newTimer });
  },

  // Computed
  getActiveSlide: () => {
    const { slides, activeSlideId } = get();
    return slides.find((s) => s.id === activeSlideId) ?? null;
  },

  getSelectedBlock: () => {
    const slide = get().getActiveSlide();
    const idx = get().selectedBlockIndex;
    if (!slide || idx === null || idx < 0 || idx >= slide.contentBlocks.length) return null;
    return slide.contentBlocks[idx];
  },

  // Load deck from server
  loadDeck: async (deckId) => {
    try {
      const data = await getDeck(deckId);
      if (!data) return false;

      const slides = data.slides.map((s) =>
        normalizeSlide(s as unknown as Record<string, unknown>)
      );

      set({
        deckId,
        title: data.title ?? "",
        description: (data as Record<string, unknown>).description as string ?? "",
        audienceType: (data.audienceType as AudienceType) ?? "general",
        themeKey: data.theme ?? "modern",
        themeConfig:
          (data.themeConfig as ThemeConfig) ??
          PRESET_THEMES[data.theme ?? "modern"] ??
          PRESET_THEMES.modern,
        slides,
        activeSlideId: slides.length > 0 ? slides[0].id : null,
        saveStatus: "idle",
      });
      return true;
    } catch {
      return false;
    }
  },

  setTitle: (title) => {
    set({ title });
    const { deckId } = get();
    if (deckId) updateDeck(deckId, { title });
  },

  setTheme: (key, config) => {
    set({ themeKey: key, themeConfig: config });
    const { deckId } = get();
    if (deckId) updateDeck(deckId, { theme: key, themeConfig: config });
  },

  setAudienceType: (audienceType) => {
    set({ audienceType });
    const { deckId } = get();
    if (deckId) updateDeck(deckId, { audienceType });
  },

  // Slide actions
  setActiveSlide: (id) => set({ activeSlideId: id, selectedBlockIndex: null }),

  updateSlide: (id, data) => {
    // Capture before state for undo
    const slide = get().slides.find((s) => s.id === id);
    if (slide) {
      const before: Partial<SlideState> = {};
      for (const key of Object.keys(data) as (keyof SlideState)[]) {
        (before as Record<string, unknown>)[key] = slide[key];
      }
      get()._pushUndo(id, before);
    }

    set((state) => ({
      slides: state.slides.map((s) =>
        s.id === id ? { ...s, ...data } : s
      ),
    }));
    get()._debouncedSave(id, data);
  },

  updateBlock: (blockIndex, block) => {
    const slide = get().getActiveSlide();
    if (!slide) return;
    const newBlocks = [...slide.contentBlocks];
    newBlocks[blockIndex] = block;
    get().updateSlide(slide.id, { contentBlocks: newBlocks });
  },

  addSlide: async (afterId) => {
    const { deckId, slides } = get();
    if (!deckId) return null;

    let sortOrder = slides.length;
    if (afterId) {
      const afterIndex = slides.findIndex((s) => s.id === afterId);
      if (afterIndex >= 0) sortOrder = afterIndex + 1;
    }

    try {
      const created = await createSlideAction({
        deckId,
        sortOrder,
        layout: "title_content",
        title: "New Slide",
        contentBlocks: [
          { type: "text", data: { text: "Click to add content", style: "body" } },
        ],
      });
      const newSlide = normalizeSlide(
        created as unknown as Record<string, unknown>
      );

      set((state) => {
        const updated = [...state.slides];
        updated.splice(sortOrder, 0, newSlide);
        // Fix sort orders
        const reordered = updated.map((s, i) => ({
          ...s,
          sortOrder: i,
        }));
        return { slides: reordered, activeSlideId: newSlide.id };
      });

      return newSlide;
    } catch {
      return null;
    }
  },

  deleteSlide: async (id) => {
    try {
      await deleteSlideAction(id);
      set((state) => {
        const filtered = state.slides.filter((s) => s.id !== id);
        let newActiveId = state.activeSlideId;
        if (state.activeSlideId === id) {
          newActiveId = filtered.length > 0 ? filtered[0].id : null;
        }
        return { slides: filtered, activeSlideId: newActiveId };
      });
    } catch {
      // ignore
    }
  },

  duplicateSlide: async (id) => {
    const { deckId, slides } = get();
    if (!deckId) return;

    const source = slides.find((s) => s.id === id);
    if (!source) return;

    const sortOrder = source.sortOrder + 1;

    try {
      const created = await createSlideAction({
        deckId,
        sortOrder,
        layout: source.layout,
        title: `${source.title} (copy)`,
        contentBlocks: source.contentBlocks,
        speakerNotes: source.speakerNotes,
      });
      const newSlide = normalizeSlide(
        created as unknown as Record<string, unknown>
      );

      set((state) => {
        const updated = [...state.slides];
        updated.splice(sortOrder, 0, newSlide);
        const reordered = updated.map((s, i) => ({
          ...s,
          sortOrder: i,
        }));
        return { slides: reordered, activeSlideId: newSlide.id };
      });
    } catch {
      // ignore
    }
  },

  reorderSlides: async (ids) => {
    const { deckId, slides } = get();
    if (!deckId) return;

    // Optimistic update
    const reordered = ids
      .map((id) => slides.find((s) => s.id === id))
      .filter(Boolean)
      .map((s, i) => ({ ...s!, sortOrder: i }));

    set({ slides: reordered });

    try {
      await reorderSlidesAction(deckId, ids);
    } catch {
      // Revert on failure
      set({ slides });
    }
  },

  // Undo / Redo
  undo: () => {
    // Flush any pending debounced entry first
    const pending = get()._pendingUndoBefore;
    const pendingSlide = get()._pendingUndoSlideId;
    const undoTimer = get()._undoTimer;
    if (pending !== null && pendingSlide !== null) {
      if (undoTimer) clearTimeout(undoTimer);
      set((s) => ({
        _undoStack: [
          ...s._undoStack.slice(-(MAX_UNDO_HISTORY - 1)),
          { slideId: pendingSlide, before: pending },
        ],
        _pendingUndoBefore: null,
        _pendingUndoSlideId: null,
        _undoTimer: null,
      }));
    }

    const stack = get()._undoStack;
    if (stack.length === 0) return;
    const entry = stack[stack.length - 1];
    const currentSlide = get().slides.find((s) => s.id === entry.slideId);
    if (!currentSlide) return;

    // Capture current state for redo
    const redo: Partial<SlideState> = {};
    for (const key of Object.keys(entry.before) as (keyof SlideState)[]) {
      (redo as Record<string, unknown>)[key] = currentSlide[key];
    }

    // Apply undo (without pushing to undo stack again)
    set((state) => ({
      slides: state.slides.map((s) =>
        s.id === entry.slideId ? { ...s, ...entry.before } : s
      ),
      _undoStack: state._undoStack.slice(0, -1),
      _redoStack: [...state._redoStack, { slideId: entry.slideId, before: redo }],
    }));
    get()._debouncedSave(entry.slideId, entry.before);
  },

  redo: () => {
    // Flush any pending debounced entry first
    const pending = get()._pendingUndoBefore;
    const pendingSlide = get()._pendingUndoSlideId;
    const undoTimerR = get()._undoTimer;
    if (pending !== null && pendingSlide !== null) {
      if (undoTimerR) clearTimeout(undoTimerR);
      set((s) => ({
        _undoStack: [
          ...s._undoStack.slice(-(MAX_UNDO_HISTORY - 1)),
          { slideId: pendingSlide, before: pending },
        ],
        _pendingUndoBefore: null,
        _pendingUndoSlideId: null,
        _undoTimer: null,
      }));
    }

    const stack = get()._redoStack;
    if (stack.length === 0) return;
    const entry = stack[stack.length - 1];
    const currentSlide = get().slides.find((s) => s.id === entry.slideId);
    if (!currentSlide) return;

    // Capture current state for undo
    const undo: Partial<SlideState> = {};
    for (const key of Object.keys(entry.before) as (keyof SlideState)[]) {
      (undo as Record<string, unknown>)[key] = currentSlide[key];
    }

    set((state) => ({
      slides: state.slides.map((s) =>
        s.id === entry.slideId ? { ...s, ...entry.before } : s
      ),
      _redoStack: state._redoStack.slice(0, -1),
      _undoStack: [...state._undoStack, { slideId: entry.slideId, before: undo }],
    }));
    get()._debouncedSave(entry.slideId, entry.before);
  },

  canUndo: () => get()._undoStack.length > 0 || get()._pendingUndoBefore !== null,
  canRedo: () => get()._redoStack.length > 0,

  replaceAllSlides: (slides) => {
    set((state) => ({
      slides,
      activeSlideId:
        slides.length > 0
          ? slides.find((s) => s.id === state.activeSlideId)?.id ??
            slides[0].id
          : null,
    }));
  },

  // Internal debounced save
  _saveTimer: null,
  _debouncedSave: (slideId, data) => {
    const timer = get()._saveTimer;
    if (timer) clearTimeout(timer);

    const newTimer = setTimeout(async () => {
      set({ saveStatus: "saving" });
      try {
        await updateSlideAction(slideId, data);
        set({ saveStatus: "saved" });
        // Reset to idle after a moment
        setTimeout(() => set({ saveStatus: "idle" }), 1500);
      } catch {
        set({ saveStatus: "error" });
      }
    }, 800);

    set({ _saveTimer: newTimer });
  },
}));
