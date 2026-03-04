/**
 * FINNISH Editor Store
 * Zustand store for managing editor state including canvas, tools, viewport, and history
 *
 * @module store/editorStore
 */

import { create } from 'zustand';
import { subscribeWithSelector, devtools } from 'zustand/middleware';
import type {
  FabricCanvas,
  EditorState,
  EditorStore,
  PanPosition,
  ToolType,
} from '../types/index.js';
import { ToolType as Tool } from '../types/index.js';

// ============================================================================
// Constants
// ============================================================================

const MAX_HISTORY_STATES = 50;
const DEFAULT_ZOOM = 1;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 10;
const DEFAULT_GRID_SIZE = 20;

// ============================================================================
// Initial State
// ============================================================================

const initialState: EditorState = {
  // Canvas reference
  canvas: null,

  // Selection state
  selectedObjects: [],

  // Active tool - default to select
  activeTool: Tool.SELECT,

  // Viewport state
  zoom: DEFAULT_ZOOM,
  pan: { x: 0, y: 0 },

  // Grid settings
  gridVisible: true,
  snapToGrid: false,
  gridSize: DEFAULT_GRID_SIZE,

  // History state
  history: {
    past: [],
    future: [],
  },

  // UI state
  isLoading: false,
};

// ============================================================================
// Store Implementation
// ============================================================================

/**
 * Editor store for managing all canvas and tool state
 *
 * @example
 * ```tsx
 * import { useEditorStore } from '@/store';
 *
 * function ToolBar() {
 *   const activeTool = useEditorStore((state) => state.activeTool);
 *   const setActiveTool = useEditorStore((state) => state.setActiveTool);
 *
 *   return (
 *     <button onClick={() => setActiveTool(ToolType.PEN)}>
 *       Pen Tool
 *     </button>
 *   );
 * }
 * ```
 */
export const useEditorStore = create<EditorStore>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      ...initialState,

      // ========================================================================
      // Canvas Management
      // ========================================================================

      /**
       * Set the Fabric.js canvas reference
       * @param canvas - The Fabric.js canvas instance or null
       */
      setCanvas: (canvas: FabricCanvas | null) => {
        set({ canvas }, false, 'setCanvas');
      },

      // ========================================================================
      // Tool Management
      // ========================================================================

      /**
       * Set the currently active tool
       * @param tool - The tool type to activate
       */
      setActiveTool: (tool: ToolType) => {
        set({ activeTool: tool }, false, 'setActiveTool');
      },

      // ========================================================================
      // Viewport Management
      // ========================================================================

      /**
       * Set the canvas zoom level
       * Clamps value between MIN_ZOOM and MAX_ZOOM
       * @param zoom - The zoom level (1 = 100%)
       */
      setZoom: (zoom: number) => {
        const clampedZoom = Math.min(Math.max(zoom, MIN_ZOOM), MAX_ZOOM);
        set({ zoom: clampedZoom }, false, 'setZoom');

        // Apply zoom to canvas if available
        const { canvas } = get();
        if (canvas) {
          canvas.setZoom(clampedZoom);
          canvas.requestRenderAll();
        }
      },

      /**
       * Set the canvas pan position
       * @param pan - The pan position { x, y }
       */
      setPan: (pan: PanPosition) => {
        set({ pan }, false, 'setPan');

        // Apply pan to canvas viewport transform if available
        const { canvas } = get();
        if (canvas) {
          const vpt = canvas.viewportTransform;
          if (vpt) {
            vpt[4] = pan.x;
            vpt[5] = pan.y;
            canvas.setViewportTransform(vpt);
            canvas.requestRenderAll();
          }
        }
      },

      /**
       * Reset viewport to default zoom and pan
       */
      resetViewport: () => {
        set(
          {
            zoom: DEFAULT_ZOOM,
            pan: { x: 0, y: 0 },
          },
          false,
          'resetViewport'
        );

        const { canvas } = get();
        if (canvas) {
          canvas.setZoom(DEFAULT_ZOOM);
          canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
          canvas.requestRenderAll();
        }
      },

      // ========================================================================
      // Selection Management
      // ========================================================================

      /**
       * Set the selected objects (replaces current selection)
       * @param objectIds - Array of object IDs to select
       */
      selectObjects: (objectIds: string[]) => {
        set({ selectedObjects: objectIds }, false, 'selectObjects');
      },

      /**
       * Add an object to the current selection
       * @param objectId - The object ID to add
       */
      addToSelection: (objectId: string) => {
        const { selectedObjects } = get();
        if (!selectedObjects.includes(objectId)) {
          set(
            { selectedObjects: [...selectedObjects, objectId] },
            false,
            'addToSelection'
          );
        }
      },

      /**
       * Remove an object from the current selection
       * @param objectId - The object ID to remove
       */
      removeFromSelection: (objectId: string) => {
        const { selectedObjects } = get();
        set(
          {
            selectedObjects: selectedObjects.filter((id) => id !== objectId),
          },
          false,
          'removeFromSelection'
        );
      },

      /**
       * Clear all selected objects
       */
      clearSelection: () => {
        set({ selectedObjects: [] }, false, 'clearSelection');

        const { canvas } = get();
        if (canvas) {
          canvas.discardActiveObject();
          canvas.requestRenderAll();
        }
      },

      // ========================================================================
      // Grid Management
      // ========================================================================

      /**
       * Toggle grid visibility
       */
      toggleGrid: () => {
        set(
          (state) => ({ gridVisible: !state.gridVisible }),
          false,
          'toggleGrid'
        );
      },

      /**
       * Toggle snap-to-grid functionality
       */
      toggleSnap: () => {
        set(
          (state) => ({ snapToGrid: !state.snapToGrid }),
          false,
          'toggleSnap'
        );
      },

      /**
       * Set the grid size in pixels
       * @param size - The grid size in pixels
       */
      setGridSize: (size: number) => {
        if (size > 0) {
          set({ gridSize: size }, false, 'setGridSize');
        }
      },

      // ========================================================================
      // History Management
      // ========================================================================

      /**
       * Undo the last action
       * Moves the current state to future and restores previous state
       */
      undo: async () => {
        const { history, canvas } = get();
        const { past, future } = history;

        if (past.length === 0 || !canvas) return;

        // Get current state to move to future
        const currentState = JSON.stringify(canvas.toJSON());

        // Pop the most recent past state
        const previousState = past[past.length - 1];
        const newPast = past.slice(0, -1);

        // Update history
        set(
          {
            history: {
              past: newPast,
              future: [currentState, ...future],
            },
          },
          false,
          'undo'
        );

        // Restore canvas state (Fabric.js 6 uses Promise)
        try {
          await canvas.loadFromJSON(JSON.parse(previousState));
          canvas.requestRenderAll();
        } catch (error) {
          console.error('Failed to undo:', error);
        }
      },

      /**
       * Redo the last undone action
       * Moves the current state to past and restores future state
       */
      redo: async () => {
        const { history, canvas } = get();
        const { past, future } = history;

        if (future.length === 0 || !canvas) return;

        // Get current state to move to past
        const currentState = JSON.stringify(canvas.toJSON());

        // Pop the most recent future state
        const nextState = future[0];
        const newFuture = future.slice(1);

        // Update history
        set(
          {
            history: {
              past: [...past, currentState],
              future: newFuture,
            },
          },
          false,
          'redo'
        );

        // Restore canvas state (Fabric.js 6 uses Promise)
        try {
          await canvas.loadFromJSON(JSON.parse(nextState));
          canvas.requestRenderAll();
        } catch (error) {
          console.error('Failed to redo:', error);
        }
      },

      /**
       * Push a new state to history
       * Clears future history (no redo after new action)
       * @param state - The serialized canvas state
       */
      pushHistory: (state: string) => {
        const { history } = get();
        let newPast = [...history.past, state];

        // Trim history if it exceeds max states
        if (newPast.length > MAX_HISTORY_STATES) {
          newPast = newPast.slice(-MAX_HISTORY_STATES);
        }

        set(
          {
            history: {
              past: newPast,
              future: [], // Clear future on new action
            },
          },
          false,
          'pushHistory'
        );
      },

      /**
       * Clear all history states
       */
      clearHistory: () => {
        set(
          {
            history: {
              past: [],
              future: [],
            },
          },
          false,
          'clearHistory'
        );
      },

      // ========================================================================
      // UI State Management
      // ========================================================================

      /**
       * Set the loading state
       * @param loading - Whether the editor is loading
       */
      setLoading: (loading: boolean) => {
        set({ isLoading: loading }, false, 'setLoading');
      },
    })),
    {
      name: 'finnish-editor-store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);

// ============================================================================
// Selector Hooks
// ============================================================================

/**
 * Hook to get canvas state
 */
export const useCanvas = () => useEditorStore((state) => state.canvas);

/**
 * Hook to get active tool
 */
export const useActiveTool = () => useEditorStore((state) => state.activeTool);

/**
 * Hook to get viewport state
 */
export const useViewport = () =>
  useEditorStore((state) => ({
    zoom: state.zoom,
    pan: state.pan,
  }));

/**
 * Hook to get selection state
 */
export const useSelection = () =>
  useEditorStore((state) => ({
    selectedObjects: state.selectedObjects,
    hasSelection: state.selectedObjects.length > 0,
    selectionCount: state.selectedObjects.length,
  }));

/**
 * Hook to get grid state
 */
export const useGridState = () =>
  useEditorStore((state) => ({
    gridVisible: state.gridVisible,
    snapToGrid: state.snapToGrid,
    gridSize: state.gridSize,
  }));

/**
 * Hook to get history state
 */
export const useHistoryState = () =>
  useEditorStore((state) => ({
    canUndo: state.history.past.length > 0,
    canRedo: state.history.future.length > 0,
    undoCount: state.history.past.length,
    redoCount: state.history.future.length,
  }));

// ============================================================================
// Store Utilities
// ============================================================================

/**
 * Reset the editor store to initial state
 */
export const resetEditorStore = () => {
  useEditorStore.setState(initialState);
};

/**
 * Get the current store state (for debugging)
 */
export const getEditorState = () => useEditorStore.getState();

/**
 * Subscribe to store changes
 * @param selector - State selector function
 * @param callback - Callback when selected state changes
 * @returns Unsubscribe function
 */
export const subscribeToEditor = <T>(
  selector: (state: EditorStore) => T,
  callback: (value: T, prevValue: T) => void
) => {
  return useEditorStore.subscribe(selector, callback);
};
