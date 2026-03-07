import { create } from "zustand";
import type {
  ContentBlock,
  SlideLayout,
  ThemeConfig,
  AudienceType,
  InstitutionKit,
  SlideMaster,
  CardBackground as PresentationCardBackground,
  TextEffects,
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
import {
  createBuiltInSlideMasters,
  mergeSlideMasters,
} from "@/components/slides/shared/slide-master-utils";
import type { RegenerateTone } from "@/lib/slides/regenerate";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CardBackground = PresentationCardBackground;

export type SlideTransition = "none" | "fade" | "slide" | "zoom" | "morph";

export interface SlideState {
  id: number;
  sortOrder: number;
  layout: SlideLayout;
  masterId?: string;
  title: string;
  subtitle: string;
  contentBlocks: ContentBlock[];
  speakerNotes: string;
  cardBackground?: CardBackground;
  transition?: SlideTransition;
  hidden?: boolean;
  titleEffects?: TextEffects;
  subtitleEffects?: TextEffects;
}

export type WorkspaceMode = "slides" | "create";
export type RightPanel =
  | "properties"
  | "agent"
  | "comments"
  | "versions"
  | "analytics"
  | "defense"
  | "accessibility"
  | null;
export type AgentMode = "learn" | "draft" | "visual" | "illustrate";
export type SaveStatus = "idle" | "saving" | "saved" | "error";

// ---------------------------------------------------------------------------
// Agent Chat types
// ---------------------------------------------------------------------------

export interface AgentChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  suggestedChanges?: SuggestedChange[];
  /** Whether changes from this message have been applied */
  applied?: boolean;
}

export interface SuggestedChange {
  slideId: number;
  blockIndex?: number;
  changes: Partial<SlideState> | Partial<ContentBlock>;
}

const MAX_CHAT_HISTORY = 50;

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

  // Custom themes (per-deck, persisted via updateDeck)
  customThemes: Record<string, ThemeConfig>;
  addCustomTheme: (key: string, config: ThemeConfig) => void;
  deleteCustomTheme: (key: string) => void;

  // Branding
  institutionKit: Partial<InstitutionKit> | null;
  setInstitutionKit: (kit: Partial<InstitutionKit> | null) => void;

  // Slides
  slides: SlideState[];
  masters: SlideMaster[];
  activeSlideId: number | null;
  selectedSlideIds: Set<number>;
  selectSingleSlide: (id: number) => void;
  toggleSlideSelection: (id: number) => void;
  clearSlideSelection: () => void;
  isSlideSelected: (id: number) => boolean;
  regeneratingSlideIds: Set<number>;

  // Block selection (shared so properties panel can see it)
  selectedBlockIndices: Set<number>;
  selectBlock: (index: number, addToSelection?: boolean) => void;
  selectAllBlocks: () => void;
  deselectAll: () => void;
  isBlockSelected: (index: number) => boolean;
  allBlocksSelected: boolean;
  setAllBlocksSelected: (v: boolean) => void;
  editingBlockIndex: number | null;
  setEditingBlockIndex: (idx: number | null) => void;

  // Workspace mode
  mode: WorkspaceMode;
  setMode: (mode: WorkspaceMode) => void;

  // Right panel
  rightPanel: RightPanel;
  setRightPanel: (panel: RightPanel) => void;

  // Agent
  agentMode: AgentMode;
  setAgentMode: (mode: AgentMode) => void;

  // Agent chat
  agentChatHistory: AgentChatMessage[];
  addAgentChatMessage: (msg: AgentChatMessage) => void;
  markChatMessageApplied: (msgId: string) => void;
  clearAgentChatHistory: () => void;

  // Presentation settings
  transition: SlideTransition;
  setTransition: (t: SlideTransition) => void;
  getEffectiveTransition: (slideId: number) => SlideTransition;
  applyTransitionToAllSlides: (transition: SlideTransition) => void;

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

  // Visualize popover
  showVisualizePopover: boolean;
  setShowVisualizePopover: (v: boolean) => void;

  // Slide Sorter
  showSlideSorter: boolean;
  setShowSlideSorter: (v: boolean) => void;
  showRulers: boolean;
  setShowRulers: (v: boolean) => void;
  showGrid: boolean;
  setShowGrid: (v: boolean) => void;
  gridSize: number;
  setGridSize: (v: number) => void;
  snapToGrid: boolean;
  setSnapToGrid: (v: boolean) => void;

  // Save status
  saveStatus: SaveStatus;

  // Computed
  getActiveSlide: () => SlideState | null;
  getSelectedBlock: () => ContentBlock | null;
  getSelectedBlocks: () => ContentBlock[];
  getPrimarySelectedBlockIndex: () => number | null;

  // Deck actions
  loadDeck: (deckId: number) => Promise<boolean>;
  setTitle: (title: string) => void;
  setTheme: (key: string, config: ThemeConfig) => void;
  setAudienceType: (type: AudienceType) => void;
  addMaster: (master: SlideMaster) => void;
  updateMaster: (id: string, updates: Partial<SlideMaster>) => void;
  deleteMaster: (id: string) => void;

  // Slide actions
  setActiveSlide: (id: number | null) => void;
  updateSlide: (id: number, data: Partial<SlideState>) => void;
  addSlide: (afterId?: number) => Promise<SlideState | null>;
  deleteSlide: (id: number) => Promise<void>;
  duplicateSlide: (id: number) => Promise<void>;
  reorderSlides: (ids: number[]) => Promise<void>;
  regenerateSlide: (
    slideId: number,
    instruction: string,
    tone: RegenerateTone
  ) => Promise<boolean>;

  // Clipboard (copy/paste slides)
  clipboardSlide: Omit<SlideState, "id" | "sortOrder"> | null;
  copySlide: (id: number) => void;
  pasteSlide: () => Promise<void>;
  clipboardBlocks: ContentBlock[];
  copyBlock: () => void;
  cutBlock: () => void;
  pasteBlock: () => void;
  deleteSelectedBlocks: () => void;

  // Block-level update (convenience)
  updateBlock: (blockIndex: number, block: ContentBlock) => void;
  lockBlock: (blockIndex: number) => void;
  unlockBlock: (blockIndex: number) => void;
  toggleBlockLock: (blockIndex: number) => void;
  bringToFront: (blockIndex: number) => void;
  sendToBack: (blockIndex: number) => void;
  bringForward: (blockIndex: number) => void;
  sendBackward: (blockIndex: number) => void;

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
  const hiddenRaw = raw.hidden;
  return {
    id: raw.id as number,
    sortOrder: (raw.sortOrder as number) ?? 0,
    layout: (raw.layout as SlideLayout) ?? "title_content",
    masterId: (raw.masterId as string) ?? undefined,
    title: (raw.title as string) ?? "",
    subtitle: (raw.subtitle as string) ?? "",
    contentBlocks: (raw.contentBlocks as ContentBlock[]) ?? [],
    speakerNotes: (raw.speakerNotes as string) ?? "",
    cardBackground: raw.cardBackground as CardBackground | undefined,
    transition: raw.transition as SlideTransition | undefined,
    hidden: typeof hiddenRaw === "boolean" ? hiddenRaw : undefined,
  };
}

function getBlockLayerOrder(block: ContentBlock, index: number): number {
  return block.zIndex ?? index;
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

  // Custom themes
  customThemes: {},
  addCustomTheme: (key, config) => {
    set((state) => ({
      customThemes: { ...state.customThemes, [key]: config },
    }));
    const { deckId, themeConfig, customThemes } = get();
    if (deckId) {
      const merged = { ...customThemes, [key]: config };
      updateDeck(deckId, {
        themeConfig: { ...themeConfig, _customThemes: merged } as unknown as ThemeConfig,
      });
    }
  },
  deleteCustomTheme: (key) => {
    set((state) => {
      const next = { ...state.customThemes };
      delete next[key];
      return { customThemes: next };
    });
    const { deckId, themeConfig } = get();
    const updated = { ...get().customThemes };
    if (deckId) {
      updateDeck(deckId, {
        themeConfig: { ...themeConfig, _customThemes: updated } as unknown as ThemeConfig,
      });
    }
  },

  // Branding
  institutionKit: null,
  setInstitutionKit: (institutionKit) => set({ institutionKit }),

  // Slides
  slides: [],
  masters: createBuiltInSlideMasters(),
  activeSlideId: null,
  selectedSlideIds: new Set<number>(),
  selectSingleSlide: (id) => set({ selectedSlideIds: new Set([id]) }),
  toggleSlideSelection: (id) =>
    set((state) => {
      const next = new Set(state.selectedSlideIds);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { selectedSlideIds: next };
    }),
  clearSlideSelection: () => set({ selectedSlideIds: new Set<number>() }),
  isSlideSelected: (id) => get().selectedSlideIds.has(id),
  regeneratingSlideIds: new Set<number>(),

  // Block selection
  selectedBlockIndices: new Set<number>(),
  selectBlock: (index, addToSelection = false) => {
    const slide = get().getActiveSlide();
    if (!slide || index < 0 || index >= slide.contentBlocks.length) return;

    set((state) => {
      const next = addToSelection
        ? new Set(state.selectedBlockIndices)
        : new Set<number>();

      if (addToSelection) {
        if (next.has(index)) next.delete(index);
        else next.add(index);
      } else {
        next.add(index);
      }

      return {
        selectedBlockIndices: next,
        allBlocksSelected:
          slide.contentBlocks.length > 0 &&
          next.size === slide.contentBlocks.length,
      };
    });
  },
  selectAllBlocks: () => {
    const slide = get().getActiveSlide();
    if (!slide || slide.contentBlocks.length === 0) {
      set({
        selectedBlockIndices: new Set<number>(),
        allBlocksSelected: false,
      });
      return;
    }

    set({
      selectedBlockIndices: new Set(
        slide.contentBlocks.map((_block, index) => index)
      ),
      allBlocksSelected: true,
    });
  },
  deselectAll: () =>
    set({
      selectedBlockIndices: new Set<number>(),
      allBlocksSelected: false,
    }),
  isBlockSelected: (index) => get().selectedBlockIndices.has(index),
  allBlocksSelected: false,
  setAllBlocksSelected: (allBlocksSelected) => {
    if (allBlocksSelected) {
      get().selectAllBlocks();
      return;
    }
    get().deselectAll();
  },
  editingBlockIndex: null,
  setEditingBlockIndex: (editingBlockIndex) => set({ editingBlockIndex }),

  // Mode
  mode: "slides",
  setMode: (mode) => set({ mode }),

  // Right panel
  rightPanel: "properties",
  setRightPanel: (panel) => set({ rightPanel: panel }),

  // Agent
  agentMode: "draft",
  setAgentMode: (agentMode) => set({ agentMode }),

  // Agent chat
  agentChatHistory: [],
  addAgentChatMessage: (msg) =>
    set((state) => ({
      agentChatHistory: [...state.agentChatHistory, msg].slice(-MAX_CHAT_HISTORY),
    })),
  markChatMessageApplied: (msgId) =>
    set((state) => ({
      agentChatHistory: state.agentChatHistory.map((m) =>
        m.id === msgId ? { ...m, applied: true } : m
      ),
    })),
  clearAgentChatHistory: () => set({ agentChatHistory: [] }),

  // Presentation settings
  transition: "fade",
  setTransition: (transition) => set({ transition }),
  getEffectiveTransition: (slideId) => {
    const state = get();
    const slide = state.slides.find((s) => s.id === slideId);
    return slide?.transition ?? state.transition;
  },
  applyTransitionToAllSlides: (transition) =>
    set((state) => ({
      slides: state.slides.map((slide) => ({ ...slide, transition })),
    })),

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

  // Visualize popover
  showVisualizePopover: false,
  setShowVisualizePopover: (showVisualizePopover) => set({ showVisualizePopover }),

  showSlideSorter: false,
  setShowSlideSorter: (showSlideSorter) => set({ showSlideSorter }),
  showRulers: false,
  setShowRulers: (showRulers) => set({ showRulers }),
  showGrid: false,
  setShowGrid: (showGrid) => set({ showGrid }),
  gridSize: 5,
  setGridSize: (gridSize) =>
    set({ gridSize: Math.min(Math.max(Number.isFinite(gridSize) ? gridSize : 5, 1), 100) }),
  snapToGrid: false,
  setSnapToGrid: (snapToGrid) => set({ snapToGrid }),

  // Clipboard
  clipboardSlide: null,
  clipboardBlocks: [],
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
      const newSlideRaw = normalizeSlide(
        created as unknown as Record<string, unknown>
      );
      const mergedSlide: SlideState = {
        ...newSlideRaw,
        ...(clipboardSlide.transition
          ? { transition: clipboardSlide.transition }
          : {}),
        ...(typeof clipboardSlide.hidden === "boolean"
          ? { hidden: clipboardSlide.hidden }
          : {}),
        ...(clipboardSlide.cardBackground
          ? { cardBackground: clipboardSlide.cardBackground }
          : {}),
        ...(clipboardSlide.masterId
          ? { masterId: clipboardSlide.masterId }
          : {}),
      };

      set((state) => {
        const updated = [...state.slides];
        updated.splice(sortOrder, 0, mergedSlide);
        const reordered = updated.map((s, i) => ({
          ...s,
          sortOrder: i,
        }));
        return {
          slides: reordered,
          activeSlideId: mergedSlide.id,
          selectedSlideIds: new Set([mergedSlide.id]),
        };
      });
    } catch (e) {
      console.error("pasteSlide failed", e);
      set({ saveStatus: "error" });
    }
  },

  copyBlock: () => {
    const selectedBlocks = get().getSelectedBlocks();
    if (selectedBlocks.length === 0) return;
    set({
      clipboardBlocks: selectedBlocks.map(
        (block) => JSON.parse(JSON.stringify(block)) as ContentBlock
      ),
    });
  },

  deleteSelectedBlocks: () => {
    const slide = get().getActiveSlide();
    if (!slide) return;

    const selectedIndices = [...get().selectedBlockIndices]
      .filter((idx) => idx >= 0 && idx < slide.contentBlocks.length)
      .sort((a, b) => a - b);

    if (selectedIndices.length === 0) return;

    const selectedIndexSet = new Set(selectedIndices);
    const newBlocks = slide.contentBlocks.filter(
      (_block, idx) => !selectedIndexSet.has(idx)
    );
    get().updateSlide(slide.id, { contentBlocks: newBlocks });
    set({
      selectedBlockIndices: new Set<number>(),
      allBlocksSelected: false,
      editingBlockIndex: null,
    });
  },

  cutBlock: () => {
    if (get().getSelectedBlocks().length === 0) return;
    get().copyBlock();
    get().deleteSelectedBlocks();
  },

  pasteBlock: () => {
    const slide = get().getActiveSlide();
    const clipboardBlocks = get().clipboardBlocks;
    if (!slide || clipboardBlocks.length === 0) return;

    const selectedIndices = [...get().selectedBlockIndices]
      .filter((idx) => idx >= 0 && idx < slide.contentBlocks.length)
      .sort((a, b) => a - b);

    const insertIndex =
      selectedIndices.length > 0
        ? selectedIndices[selectedIndices.length - 1] + 1
        : slide.contentBlocks.length;

    const newBlocks = [...slide.contentBlocks];
    const clonedBlocks = clipboardBlocks.map(
      (block) => JSON.parse(JSON.stringify(block)) as ContentBlock
    );
    newBlocks.splice(
      insertIndex,
      0,
      ...clonedBlocks
    );
    get().updateSlide(slide.id, { contentBlocks: newBlocks });
    const nextSelection = new Set<number>(
      clonedBlocks.map((_block, offset) => insertIndex + offset)
    );
    set({
      selectedBlockIndices: nextSelection,
      allBlocksSelected:
        newBlocks.length > 0 && nextSelection.size === newBlocks.length,
    });
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
    const selectedBlocks = get().getSelectedBlocks();
    return selectedBlocks.length > 0 ? selectedBlocks[0] : null;
  },

  getSelectedBlocks: () => {
    const slide = get().getActiveSlide();
    if (!slide) return [];

    const validIndices = [...get().selectedBlockIndices]
      .filter((idx) => idx >= 0 && idx < slide.contentBlocks.length)
      .sort((a, b) => a - b);

    return validIndices.map((idx) => slide.contentBlocks[idx]);
  },

  getPrimarySelectedBlockIndex: () => {
    const slide = get().getActiveSlide();
    if (!slide) return null;

    const validIndices = [...get().selectedBlockIndices]
      .filter((idx) => idx >= 0 && idx < slide.contentBlocks.length)
      .sort((a, b) => a - b);

    return validIndices.length > 0 ? validIndices[0] : null;
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
        customThemes:
          ((data.themeConfig as Record<string, unknown> | null)?._customThemes as Record<string, ThemeConfig>) ?? {},
        masters: mergeSlideMasters(
          (data as Record<string, unknown>).masters
        ),
        slides,
        activeSlideId: slides.length > 0 ? slides[0].id : null,
        selectedSlideIds: slides.length > 0 ? new Set([slides[0].id]) : new Set<number>(),
        selectedBlockIndices: new Set<number>(),
        allBlocksSelected: false,
        editingBlockIndex: null,
        saveStatus: "idle",
        agentChatHistory: [],
      });
      return true;
    } catch (e) {
      console.error("loadDeck failed", e);
      set({ saveStatus: "error" });
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

  addMaster: (master) => {
    const clonedMaster = JSON.parse(JSON.stringify(master)) as SlideMaster;
    set((state) => ({ masters: [...state.masters, clonedMaster] }));
  },

  updateMaster: (id, updates) => {
    set((state) => ({
      masters: state.masters.map((master) =>
        master.id === id ? { ...master, ...updates } : master
      ),
    }));
  },

  deleteMaster: (id) => {
    set((state) => ({
      masters: state.masters.filter((master) => master.id !== id),
      slides: state.slides.map((slide) =>
        slide.masterId === id ? { ...slide, masterId: undefined } : slide
      ),
    }));
  },

  // Slide actions
  setActiveSlide: (id) =>
    set({
      activeSlideId: id,
      selectedBlockIndices: new Set<number>(),
      allBlocksSelected: false,
      editingBlockIndex: null,
    }),

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

  lockBlock: (blockIndex) => {
    const slide = get().getActiveSlide();
    if (!slide || blockIndex < 0 || blockIndex >= slide.contentBlocks.length) return;
    const newBlocks = [...slide.contentBlocks];
    newBlocks[blockIndex] = { ...newBlocks[blockIndex], locked: true };
    get().updateSlide(slide.id, { contentBlocks: newBlocks });
  },

  unlockBlock: (blockIndex) => {
    const slide = get().getActiveSlide();
    if (!slide || blockIndex < 0 || blockIndex >= slide.contentBlocks.length) return;
    const newBlocks = [...slide.contentBlocks];
    newBlocks[blockIndex] = { ...newBlocks[blockIndex], locked: false };
    get().updateSlide(slide.id, { contentBlocks: newBlocks });
  },

  toggleBlockLock: (blockIndex) => {
    const slide = get().getActiveSlide();
    if (!slide || blockIndex < 0 || blockIndex >= slide.contentBlocks.length) return;
    const block = slide.contentBlocks[blockIndex];
    const newBlocks = [...slide.contentBlocks];
    newBlocks[blockIndex] = { ...block, locked: !block.locked };
    get().updateSlide(slide.id, { contentBlocks: newBlocks });
  },

  bringToFront: (blockIndex) => {
    const slide = get().getActiveSlide();
    if (!slide || blockIndex < 0 || blockIndex >= slide.contentBlocks.length) return;

    const block = slide.contentBlocks[blockIndex];
    const maxLayer = slide.contentBlocks.reduce(
      (max, candidate, index) => Math.max(max, getBlockLayerOrder(candidate, index)),
      Number.NEGATIVE_INFINITY
    );

    const newBlocks = [...slide.contentBlocks];
    newBlocks[blockIndex] = { ...block, zIndex: maxLayer + 1 };
    get().updateSlide(slide.id, { contentBlocks: newBlocks });
  },

  sendToBack: (blockIndex) => {
    const slide = get().getActiveSlide();
    if (!slide || blockIndex < 0 || blockIndex >= slide.contentBlocks.length) return;

    const block = slide.contentBlocks[blockIndex];
    const minLayer = slide.contentBlocks.reduce(
      (min, candidate, index) => Math.min(min, getBlockLayerOrder(candidate, index)),
      Number.POSITIVE_INFINITY
    );

    const newBlocks = [...slide.contentBlocks];
    newBlocks[blockIndex] = { ...block, zIndex: minLayer - 1 };
    get().updateSlide(slide.id, { contentBlocks: newBlocks });
  },

  bringForward: (blockIndex) => {
    const slide = get().getActiveSlide();
    if (!slide || blockIndex < 0 || blockIndex >= slide.contentBlocks.length) return;

    const currentLayer = getBlockLayerOrder(
      slide.contentBlocks[blockIndex],
      blockIndex
    );
    let nextHigher: { index: number; layer: number } | null = null;

    for (let index = 0; index < slide.contentBlocks.length; index += 1) {
      if (index === blockIndex) continue;
      const layer = getBlockLayerOrder(slide.contentBlocks[index], index);
      if (layer <= currentLayer) continue;

      if (
        !nextHigher ||
        layer < nextHigher.layer ||
        (layer === nextHigher.layer && index < nextHigher.index)
      ) {
        nextHigher = { index, layer };
      }
    }

    const nextHigherTarget = nextHigher;
    if (!nextHigherTarget) return;

    const newBlocks = [...slide.contentBlocks];
    const currentBlock = newBlocks[blockIndex];
    const swapBlock = newBlocks[nextHigherTarget.index];
    newBlocks[blockIndex] = { ...currentBlock, zIndex: nextHigherTarget.layer };
    newBlocks[nextHigherTarget.index] = { ...swapBlock, zIndex: currentLayer };
    get().updateSlide(slide.id, { contentBlocks: newBlocks });
  },

  sendBackward: (blockIndex) => {
    const slide = get().getActiveSlide();
    if (!slide || blockIndex < 0 || blockIndex >= slide.contentBlocks.length) return;

    const currentLayer = getBlockLayerOrder(
      slide.contentBlocks[blockIndex],
      blockIndex
    );
    let nextLower: { index: number; layer: number } | null = null;

    for (let index = 0; index < slide.contentBlocks.length; index += 1) {
      if (index === blockIndex) continue;
      const layer = getBlockLayerOrder(slide.contentBlocks[index], index);
      if (layer >= currentLayer) continue;

      if (
        !nextLower ||
        layer > nextLower.layer ||
        (layer === nextLower.layer && index > nextLower.index)
      ) {
        nextLower = { index, layer };
      }
    }

    const nextLowerTarget = nextLower;
    if (!nextLowerTarget) return;

    const newBlocks = [...slide.contentBlocks];
    const currentBlock = newBlocks[blockIndex];
    const swapBlock = newBlocks[nextLowerTarget.index];
    newBlocks[blockIndex] = { ...currentBlock, zIndex: nextLowerTarget.layer };
    newBlocks[nextLowerTarget.index] = { ...swapBlock, zIndex: currentLayer };
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
        return {
          slides: reordered,
          activeSlideId: newSlide.id,
          selectedSlideIds: new Set([newSlide.id]),
        };
      });

      return newSlide;
    } catch (e) {
      console.error("addSlide failed", e);
      set({ saveStatus: "error" });
      return null;
    }
  },

  deleteSlide: async (id) => {
    const previousSlides = get().slides;
    const previousActiveSlideId = get().activeSlideId;
    const previousSelectedSlideIds = get().selectedSlideIds;

    // Optimistic update
    set((state) => {
      const filtered = state.slides.filter((s) => s.id !== id);
      let newActiveId = state.activeSlideId;
      if (state.activeSlideId === id) {
        newActiveId = filtered.length > 0 ? filtered[0].id : null;
      }
      const selectedSlideIds = new Set(
        [...state.selectedSlideIds].filter((slideId) => slideId !== id)
      );
      if (selectedSlideIds.size === 0 && newActiveId !== null) {
        selectedSlideIds.add(newActiveId);
      }
      return { slides: filtered, activeSlideId: newActiveId, selectedSlideIds };
    });

    try {
      await deleteSlideAction(id);
    } catch (e) {
      console.error("deleteSlide failed", e);
      set({
        slides: previousSlides,
        activeSlideId: previousActiveSlideId,
        selectedSlideIds: previousSelectedSlideIds,
        saveStatus: "error",
      });
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
      const newSlideRaw = normalizeSlide(
        created as unknown as Record<string, unknown>
      );
      const mergedSlide: SlideState = {
        ...newSlideRaw,
        ...(source.transition ? { transition: source.transition } : {}),
        ...(typeof source.hidden === "boolean"
          ? { hidden: source.hidden }
          : {}),
        ...(source.cardBackground
          ? { cardBackground: source.cardBackground }
          : {}),
        ...(source.masterId ? { masterId: source.masterId } : {}),
      };

      set((state) => {
        const updated = [...state.slides];
        updated.splice(sortOrder, 0, mergedSlide);
        const reordered = updated.map((s, i) => ({
          ...s,
          sortOrder: i,
        }));
        return {
          slides: reordered,
          activeSlideId: mergedSlide.id,
          selectedSlideIds: new Set([mergedSlide.id]),
        };
      });
    } catch (e) {
      console.error("duplicateSlide failed", e);
      set({ saveStatus: "error" });
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
    } catch (e) {
      console.error("reorderSlides failed", e);
      // Revert on failure
      set({ slides, saveStatus: "error" });
    }
  },

  regenerateSlide: async (slideId, instruction, tone) => {
    const state = get();
    if (!state.deckId) return false;

    const sortedSlides = [...state.slides].sort((a, b) => a.sortOrder - b.sortOrder);
    const targetIndex = sortedSlides.findIndex((slide) => slide.id === slideId);
    if (targetIndex === -1) return false;

    set((current) => ({
      regeneratingSlideIds: new Set(current.regeneratingSlideIds).add(slideId),
    }));

    try {
      const response = await fetch("/api/slides/regenerate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deckId: state.deckId,
          slideId,
          instruction,
          tone,
          context: {
            prevSlideTitle: sortedSlides[targetIndex - 1]?.title,
            nextSlideTitle: sortedSlides[targetIndex + 1]?.title,
            deckTitle: state.title,
            audienceType: state.audienceType,
          },
        }),
      });

      if (!response.ok) {
        set({ saveStatus: "error" });
        return false;
      }

      const generated = (await response.json()) as Partial<SlideState>;
      get().updateSlide(slideId, {
        title: generated.title ?? "",
        subtitle: generated.subtitle ?? "",
        layout: generated.layout ?? "title_content",
        contentBlocks: generated.contentBlocks ?? [],
        speakerNotes: generated.speakerNotes ?? "",
      });
      return true;
    } catch (error) {
      console.error("regenerateSlide failed", error);
      set({ saveStatus: "error" });
      return false;
    } finally {
      set((current) => {
        const next = new Set(current.regeneratingSlideIds);
        next.delete(slideId);
        return { regeneratingSlideIds: next };
      });
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
      selectedSlideIds:
        slides.length > 0
          ? new Set([
              slides.find((s) => s.id === state.activeSlideId)?.id ??
                slides[0].id,
            ])
          : new Set<number>(),
      selectedBlockIndices: new Set<number>(),
      allBlocksSelected: false,
      editingBlockIndex: null,
    }));
  },

  // Internal debounced save
  _saveTimer: null,
  _debouncedSave: (slideId, data) => {
    const timer = get()._saveTimer;
    if (timer) clearTimeout(timer);

    const newTimer = setTimeout(async () => {
      // Guard: skip save if the slide no longer exists in state (e.g. deleted during debounce window)
      const slideStillExists = get().slides.some((s) => s.id === slideId);
      if (!slideStillExists) return;

      set({ saveStatus: "saving" });
      try {
        await updateSlideAction(slideId, data);
        set({ saveStatus: "saved" });
        // Reset to idle after a moment
        setTimeout(() => set({ saveStatus: "idle" }), 1500);
      } catch (e) {
        console.error("_debouncedSave failed", e);
        set({ saveStatus: "error" });
      }
    }, 800);

    set({ _saveTimer: newTimer });
  },
}));
