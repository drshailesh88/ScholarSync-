/**
 * FINNISH Layer Store
 * Zustand store for managing layer state in the editor
 *
 * @module store/layerStore
 */

import { create } from 'zustand';
import { subscribeWithSelector, devtools, persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';

// ============================================================================
// Types
// ============================================================================

/**
 * Layer interface for store state
 */
export interface StoreLayer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  objects: string[];
  order: number;
}

/**
 * Layer store state interface
 */
export interface LayerState {
  /** Currently active/selected layer ID */
  activeLayerId: string | null;

  /** Array of all layers */
  layers: StoreLayer[];

  /** Whether layer panel is expanded */
  isPanelExpanded: boolean;

  /** Drag state for layer reordering */
  dragState: {
    isDragging: boolean;
    draggedLayerId: string | null;
    dropTargetId: string | null;
  };
}

/**
 * Layer store actions interface
 */
export interface LayerActions {
  // Active layer management
  setActiveLayer: (layerId: string | null) => void;

  // Layer CRUD operations
  addLayer: (layer: StoreLayer) => void;
  removeLayer: (layerId: string) => void;
  updateLayer: (layerId: string, updates: Partial<StoreLayer>) => void;

  // Bulk operations
  setLayers: (layers: StoreLayer[]) => void;
  reorderLayers: (layerIds: string[]) => void;

  // Layer property shortcuts
  toggleLayerVisibility: (layerId: string) => void;
  toggleLayerLock: (layerId: string) => void;
  renameLayer: (layerId: string, name: string) => void;

  // Object management
  addObjectToLayer: (layerId: string, objectId: string) => void;
  removeObjectFromLayer: (layerId: string, objectId: string) => void;
  moveObjectToLayer: (objectId: string, fromLayerId: string, toLayerId: string) => void;

  // UI state
  togglePanel: () => void;
  setPanelExpanded: (expanded: boolean) => void;

  // Drag state
  startDrag: (layerId: string) => void;
  setDropTarget: (layerId: string | null) => void;
  endDrag: () => void;

  // Reset
  resetLayers: () => void;
}

/**
 * Combined layer store type
 */
export type LayerStore = LayerState & LayerActions;

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_LAYER_ID = 'default';
const DEFAULT_LAYER_NAME = 'Layer';

/**
 * Initial state for the layer store
 */
const initialState: LayerState = {
  activeLayerId: DEFAULT_LAYER_ID,
  layers: [
    {
      id: DEFAULT_LAYER_ID,
      name: DEFAULT_LAYER_NAME,
      visible: true,
      locked: false,
      objects: [],
      order: 0,
    },
  ],
  isPanelExpanded: true,
  dragState: {
    isDragging: false,
    draggedLayerId: null,
    dropTargetId: null,
  },
};

// ============================================================================
// Store Implementation
// ============================================================================

/**
 * Layer store for managing layer state
 *
 * @example
 * ```tsx
 * import { useLayerStore } from '@/store/layerStore';
 *
 * function LayerPanel() {
 *   const layers = useLayerStore((state) => state.layers);
 *   const activeLayerId = useLayerStore((state) => state.activeLayerId);
 *   const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
 *
 *   return (
 *     <div>
 *       {layers.map(layer => (
 *         <div
 *           key={layer.id}
 *           onClick={() => setActiveLayer(layer.id)}
 *           className={layer.id === activeLayerId ? 'active' : ''}
 *         >
 *           {layer.name}
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export const useLayerStore = create<LayerStore>()(
  devtools(
    subscribeWithSelector(
      persist(
        (set, get) => ({
          ...initialState,

          // ====================================================================
          // Active Layer Management
          // ====================================================================

          /**
           * Set the currently active layer
           * @param layerId - Layer ID to activate, or null to deselect
           */
          setActiveLayer: (layerId: string | null) => {
            // Validate layer exists if provided
            if (layerId !== null) {
              const { layers } = get();
              const layerExists = layers.some((l) => l.id === layerId);
              if (!layerExists) {
                console.warn(`LayerStore: Layer "${layerId}" not found`);
                return;
              }
            }
            set({ activeLayerId: layerId }, false, 'setActiveLayer');
          },

          // ====================================================================
          // Layer CRUD Operations
          // ====================================================================

          /**
           * Add a new layer to the store
           * @param layer - Layer to add
           */
          addLayer: (layer: StoreLayer) => {
            const { layers } = get();

            // Check for duplicate ID
            if (layers.some((l) => l.id === layer.id)) {
              console.warn(`LayerStore: Layer with ID "${layer.id}" already exists`);
              return;
            }

            // Ensure order is set correctly
            const maxOrder = Math.max(...layers.map((l) => l.order), -1);
            const newLayer = {
              ...layer,
              order: layer.order ?? maxOrder + 1,
            };

            set(
              { layers: [...layers, newLayer] },
              false,
              'addLayer'
            );
          },

          /**
           * Remove a layer from the store
           * @param layerId - Layer ID to remove
           */
          removeLayer: (layerId: string) => {
            const { layers, activeLayerId } = get();

            // Prevent removing the last layer
            if (layers.length <= 1) {
              console.warn('LayerStore: Cannot remove the last layer');
              return;
            }

            const newLayers = layers.filter((l) => l.id !== layerId);

            // Update active layer if needed
            let newActiveLayerId = activeLayerId;
            if (activeLayerId === layerId) {
              // Select the next layer or the first available
              const removedIndex = layers.findIndex((l) => l.id === layerId);
              const nextLayer = newLayers[Math.min(removedIndex, newLayers.length - 1)];
              newActiveLayerId = nextLayer?.id || null;
            }

            // Normalize order values
            const sortedLayers = [...newLayers].sort((a, b) => a.order - b.order);
            sortedLayers.forEach((layer, index) => {
              layer.order = index;
            });

            set(
              {
                layers: sortedLayers,
                activeLayerId: newActiveLayerId,
              },
              false,
              'removeLayer'
            );
          },

          /**
           * Update a layer's properties
           * @param layerId - Layer ID to update
           * @param updates - Partial layer updates
           */
          updateLayer: (layerId: string, updates: Partial<StoreLayer>) => {
            const { layers } = get();
            const layerIndex = layers.findIndex((l) => l.id === layerId);

            if (layerIndex === -1) {
              console.warn(`LayerStore: Layer "${layerId}" not found`);
              return;
            }

            const newLayers = [...layers];
            newLayers[layerIndex] = {
              ...newLayers[layerIndex],
              ...updates,
              id: layerId, // Prevent ID modification
            };

            set({ layers: newLayers }, false, 'updateLayer');
          },

          // ====================================================================
          // Bulk Operations
          // ====================================================================

          /**
           * Replace all layers
           * @param layers - New layers array
           */
          setLayers: (layers: StoreLayer[]) => {
            const { activeLayerId } = get();

            // Validate active layer still exists
            let newActiveLayerId = activeLayerId;
            if (activeLayerId && !layers.some((l) => l.id === activeLayerId)) {
              newActiveLayerId = layers[0]?.id || null;
            }

            set(
              {
                layers: [...layers],
                activeLayerId: newActiveLayerId,
              },
              false,
              'setLayers'
            );
          },

          /**
           * Reorder layers by providing new order of layer IDs
           * @param layerIds - Array of layer IDs in new order (bottom to top)
           */
          reorderLayers: (layerIds: string[]) => {
            const { layers } = get();
            const layerMap = new Map(layers.map((l) => [l.id, l]));

            // Validate all IDs exist
            const allExist = layerIds.every((id) => layerMap.has(id));
            if (!allExist) {
              console.warn('LayerStore: Invalid layer IDs in reorder');
              return;
            }

            // Create new ordered array
            const newLayers = layerIds.map((id, index) => ({
              ...layerMap.get(id)!,
              order: index,
            }));

            set({ layers: newLayers }, false, 'reorderLayers');
          },

          // ====================================================================
          // Layer Property Shortcuts
          // ====================================================================

          /**
           * Toggle layer visibility
           * @param layerId - Layer ID
           */
          toggleLayerVisibility: (layerId: string) => {
            const { layers } = get();
            const layer = layers.find((l) => l.id === layerId);

            if (layer) {
              get().updateLayer(layerId, { visible: !layer.visible });
            }
          },

          /**
           * Toggle layer lock state
           * @param layerId - Layer ID
           */
          toggleLayerLock: (layerId: string) => {
            const { layers } = get();
            const layer = layers.find((l) => l.id === layerId);

            if (layer) {
              get().updateLayer(layerId, { locked: !layer.locked });
            }
          },

          /**
           * Rename a layer
           * @param layerId - Layer ID
           * @param name - New layer name
           */
          renameLayer: (layerId: string, name: string) => {
            get().updateLayer(layerId, { name });
          },

          // ====================================================================
          // Object Management
          // ====================================================================

          /**
           * Add an object ID to a layer
           * @param layerId - Layer ID
           * @param objectId - Object ID to add
           */
          addObjectToLayer: (layerId: string, objectId: string) => {
            const { layers } = get();
            const layer = layers.find((l) => l.id === layerId);

            if (!layer) {
              console.warn(`LayerStore: Layer "${layerId}" not found`);
              return;
            }

            if (layer.objects.includes(objectId)) {
              return; // Already in layer
            }

            get().updateLayer(layerId, {
              objects: [...layer.objects, objectId],
            });
          },

          /**
           * Remove an object ID from a layer
           * @param layerId - Layer ID
           * @param objectId - Object ID to remove
           */
          removeObjectFromLayer: (layerId: string, objectId: string) => {
            const { layers } = get();
            const layer = layers.find((l) => l.id === layerId);

            if (!layer) {
              console.warn(`LayerStore: Layer "${layerId}" not found`);
              return;
            }

            get().updateLayer(layerId, {
              objects: layer.objects.filter((id) => id !== objectId),
            });
          },

          /**
           * Move an object from one layer to another
           * @param objectId - Object ID to move
           * @param fromLayerId - Source layer ID
           * @param toLayerId - Target layer ID
           */
          moveObjectToLayer: (objectId: string, fromLayerId: string, toLayerId: string) => {
            const { layers } = get();
            const fromLayer = layers.find((l) => l.id === fromLayerId);
            const toLayer = layers.find((l) => l.id === toLayerId);

            if (!fromLayer || !toLayer) {
              console.warn('LayerStore: Source or target layer not found');
              return;
            }

            // Remove from source and add to target
            const newLayers = layers.map((layer) => {
              if (layer.id === fromLayerId) {
                return {
                  ...layer,
                  objects: layer.objects.filter((id) => id !== objectId),
                };
              }
              if (layer.id === toLayerId) {
                if (!layer.objects.includes(objectId)) {
                  return {
                    ...layer,
                    objects: [...layer.objects, objectId],
                  };
                }
              }
              return layer;
            });

            set({ layers: newLayers }, false, 'moveObjectToLayer');
          },

          // ====================================================================
          // UI State
          // ====================================================================

          /**
           * Toggle layer panel expanded state
           */
          togglePanel: () => {
            set(
              (state) => ({ isPanelExpanded: !state.isPanelExpanded }),
              false,
              'togglePanel'
            );
          },

          /**
           * Set layer panel expanded state
           * @param expanded - Whether panel should be expanded
           */
          setPanelExpanded: (expanded: boolean) => {
            set({ isPanelExpanded: expanded }, false, 'setPanelExpanded');
          },

          // ====================================================================
          // Drag State
          // ====================================================================

          /**
           * Start dragging a layer
           * @param layerId - Layer ID being dragged
           */
          startDrag: (layerId: string) => {
            set(
              {
                dragState: {
                  isDragging: true,
                  draggedLayerId: layerId,
                  dropTargetId: null,
                },
              },
              false,
              'startDrag'
            );
          },

          /**
           * Set the current drop target layer
           * @param layerId - Target layer ID or null
           */
          setDropTarget: (layerId: string | null) => {
            set(
              (state) => ({
                dragState: {
                  ...state.dragState,
                  dropTargetId: layerId,
                },
              }),
              false,
              'setDropTarget'
            );
          },

          /**
           * End the drag operation
           */
          endDrag: () => {
            set(
              {
                dragState: {
                  isDragging: false,
                  draggedLayerId: null,
                  dropTargetId: null,
                },
              },
              false,
              'endDrag'
            );
          },

          // ====================================================================
          // Reset
          // ====================================================================

          /**
           * Reset layers to initial state
           */
          resetLayers: () => {
            set(initialState, false, 'resetLayers');
          },
        }),
        {
          name: 'finnish-layer-store',
          partialize: (state) => ({
            // Only persist these fields
            layers: state.layers,
            activeLayerId: state.activeLayerId,
            isPanelExpanded: state.isPanelExpanded,
          }),
        }
      )
    ),
    {
      name: 'finnish-layer-store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);

// ============================================================================
// Selector Hooks
// ============================================================================

/**
 * Hook to get all layers sorted by order
 */
export const useLayers = () =>
  useLayerStore(
    useShallow((state) =>
      [...state.layers].sort((a, b) => a.order - b.order)
    )
  );

/**
 * Hook to get the active layer
 */
export const useActiveLayer = () =>
  useLayerStore((state) => {
    if (!state.activeLayerId) return null;
    return state.layers.find((l) => l.id === state.activeLayerId) || null;
  });

/**
 * Hook to get the active layer ID
 */
export const useActiveLayerId = () =>
  useLayerStore((state) => state.activeLayerId);

/**
 * Hook to get layer count
 */
export const useLayerCount = () =>
  useLayerStore((state) => state.layers.length);

/**
 * Hook to get a specific layer by ID
 */
export const useLayerById = (layerId: string) =>
  useLayerStore((state) => state.layers.find((l) => l.id === layerId));

/**
 * Hook to get visible layers only
 */
export const useVisibleLayers = () =>
  useLayerStore(
    useShallow((state) =>
      state.layers.filter((l) => l.visible).sort((a, b) => a.order - b.order)
    )
  );

/**
 * Hook to get unlocked layers only
 */
export const useUnlockedLayers = () =>
  useLayerStore(
    useShallow((state) =>
      state.layers.filter((l) => !l.locked).sort((a, b) => a.order - b.order)
    )
  );

/**
 * Hook to check if a layer is active
 */
export const useIsLayerActive = (layerId: string) =>
  useLayerStore((state) => state.activeLayerId === layerId);

/**
 * Hook to get layer panel state
 */
export const useLayerPanelState = () =>
  useLayerStore(
    useShallow((state) => ({
      isPanelExpanded: state.isPanelExpanded,
      dragState: state.dragState,
    }))
  );

/**
 * Hook to get objects in the active layer
 */
export const useActiveLayerObjects = () =>
  useLayerStore((state) => {
    if (!state.activeLayerId) return [];
    const activeLayer = state.layers.find((l) => l.id === state.activeLayerId);
    return activeLayer?.objects || [];
  });

// ============================================================================
// Store Utilities
// ============================================================================

/**
 * Reset the layer store to initial state
 */
export const resetLayerStore = () => {
  useLayerStore.setState(initialState);
};

/**
 * Get the current store state (for debugging)
 */
export const getLayerState = () => useLayerStore.getState();

/**
 * Subscribe to store changes
 * @param selector - State selector function
 * @param callback - Callback when selected state changes
 * @returns Unsubscribe function
 */
export const subscribeToLayers = <T>(
  selector: (state: LayerStore) => T,
  callback: (value: T, prevValue: T) => void
) => {
  return useLayerStore.subscribe(selector, callback);
};

/**
 * Create a new layer with defaults
 * @param name - Layer name
 * @param order - Optional order value
 * @returns New layer object
 */
export const createLayer = (name: string, order?: number): StoreLayer => {
  return {
    id: `layer_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    name,
    visible: true,
    locked: false,
    objects: [],
    order: order ?? 0,
  };
};

/**
 * Clear persisted layer data from storage
 */
export const clearPersistedLayers = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('finnish-layer-store');
  }
};

export default useLayerStore;
