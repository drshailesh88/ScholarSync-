/**
 * FINNISH Layer Sync Hook
 * React hook to synchronize LayerManager with Fabric.js canvas and layer store
 *
 * @module hooks/useLayerSync
 */

import { useEffect, useCallback, useRef } from 'react';
import { useEditorStore } from '@/stores/illustration/editorStore';
import {
  useLayerStore,
  useActiveLayerId,
  type StoreLayer,
} from '@/stores/illustration/layerStore';
import {
  LayerManager,
  layerManager,
  type Layer,
  type LayerEvent,
} from '@/lib/illustration/LayerManager';

// ============================================================================
// Internal Types
// ============================================================================

/** Canvas object with optional custom properties used by layers */
interface CanvasObject {
  id?: string;
  isGrid?: boolean;
  set: (key: string, value: unknown) => void;
}

/** Canvas event with target object */
interface CanvasObjectEvent {
  target?: CanvasObject;
}

// ============================================================================
// Types
// ============================================================================

/**
 * Options for useLayerSync hook
 */
export interface UseLayerSyncOptions {
  /** Custom LayerManager instance (defaults to singleton) */
  manager?: LayerManager;
  /** Whether to auto-assign new objects to active layer */
  autoAssignToActiveLayer?: boolean;
  /** Whether to sync layer changes back to store */
  syncToStore?: boolean;
  /** Debounce delay for sync operations (ms) */
  syncDebounce?: number;
  /** Callback when sync error occurs */
  onError?: (error: Error) => void;
}

/**
 * Return type for useLayerSync hook
 */
export interface UseLayerSyncReturn {
  /** The LayerManager instance being used */
  manager: LayerManager;
  /** Whether the manager is attached to a canvas */
  isAttached: boolean;
  /** Manually sync canvas to layers */
  syncCanvasToLayers: () => void;
  /** Manually sync layers to canvas */
  syncLayersToCanvas: () => void;
  /** Create a new layer and add to both manager and store */
  createNewLayer: (name: string) => Layer | null;
  /** Delete a layer from both manager and store */
  deleteLayer: (layerId: string, moveObjectsTo?: string) => void;
  /** Get the layer for a canvas object */
  getObjectLayer: (objectId: string) => Layer | undefined;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Generate object ID if not present on Fabric object
 */
function ensureObjectId(obj: CanvasObject): string {
  if (!obj.id) {
    obj.id = `obj_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    obj.set('id', obj.id);
  }
  return obj.id;
}

/**
 * Convert LayerManager Layer to StoreLayer
 */
function toStoreLayer(layer: Layer): StoreLayer {
  return {
    id: layer.id,
    name: layer.name,
    visible: layer.visible,
    locked: layer.locked,
    objects: [...layer.objects],
    order: layer.order,
  };
}

/**
 * Debounce function
 */
function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): T & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debouncedFn = ((...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  }) as T & { cancel: () => void };

  debouncedFn.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debouncedFn;
}

// ============================================================================
// Hook Implementation
// ============================================================================

/**
 * Hook to synchronize LayerManager with canvas and store
 *
 * @example
 * ```tsx
 * import { useLayerSync } from '@/hooks/useLayerSync';
 *
 * function CanvasWithLayers() {
 *   const { manager, createNewLayer, deleteLayer } = useLayerSync({
 *     autoAssignToActiveLayer: true,
 *     syncToStore: true,
 *   });
 *
 *   const handleAddLayer = () => {
 *     createNewLayer('New Layer');
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={handleAddLayer}>Add Layer</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useLayerSync(
  options: UseLayerSyncOptions = {}
): UseLayerSyncReturn {
  const {
    manager = layerManager,
    autoAssignToActiveLayer = true,
    syncToStore = true,
    syncDebounce = 100,
    onError,
  } = options;

  // Store hooks
  const canvas = useEditorStore((state) => state.canvas);
  const activeLayerId = useActiveLayerId();

  const setLayers = useLayerStore((state) => state.setLayers);
  const addLayer = useLayerStore((state) => state.addLayer);
  const removeLayer = useLayerStore((state) => state.removeLayer);
  const updateLayer = useLayerStore((state) => state.updateLayer);
  const addObjectToLayer = useLayerStore((state) => state.addObjectToLayer);
  const removeObjectFromLayer = useLayerStore((state) => state.removeObjectFromLayer);
  const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

  // Track attachment state
  const isAttachedRef = useRef(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  // ========================================================================
  // Sync Functions
  // ========================================================================

  /**
   * Sync canvas objects to layers
   */
  const syncCanvasToLayers = useCallback(() => {
    if (!canvas || !manager.isAttached()) return;

    try {
      const layers = manager.getLayers();
      const storeLayers = layers.map(toStoreLayer);
      setLayers(storeLayers);
    } catch (error) {
      console.error('useLayerSync: Error syncing canvas to layers', error);
      onError?.(error as Error);
    }
  }, [canvas, manager, setLayers, onError]);

  /**
   * Sync layers to canvas (apply visibility, locked states)
   */
  const syncLayersToCanvas = useCallback(() => {
    if (!canvas || !manager.isAttached()) return;

    try {
      const layers = manager.getLayers();

      layers.forEach((layer) => {
        layer.objects.forEach((objectId) => {
          const objects = canvas.getObjects();
          const obj = objects.find((o) => (o as unknown as CanvasObject).id === objectId);

          if (obj) {
            obj.set({
              visible: layer.visible,
              selectable: !layer.locked,
              evented: !layer.locked,
            });
          }
        });
      });

      canvas.requestRenderAll();
    } catch (error) {
      console.error('useLayerSync: Error syncing layers to canvas', error);
      onError?.(error as Error);
    }
  }, [canvas, manager, onError]);

  // Create debounced versions
  const debouncedSyncToStore = useRef(
    debounce(() => {
      if (syncToStore) {
        syncCanvasToLayers();
      }
    }, syncDebounce)
  );

  // ========================================================================
  // Layer Operations
  // ========================================================================

  /**
   * Create a new layer in both manager and store
   */
  const createNewLayer = useCallback(
    (name: string): Layer | null => {
      try {
        const layer = manager.createLayer(name);

        if (syncToStore) {
          addLayer(toStoreLayer(layer));
        }

        // Set as active layer
        setActiveLayer(layer.id);

        return layer;
      } catch (error) {
        console.error('useLayerSync: Error creating layer', error);
        onError?.(error as Error);
        return null;
      }
    },
    [manager, syncToStore, addLayer, setActiveLayer, onError]
  );

  /**
   * Delete a layer from both manager and store
   */
  const deleteLayer = useCallback(
    (layerId: string, moveObjectsTo?: string): void => {
      try {
        manager.deleteLayer(layerId, moveObjectsTo);

        if (syncToStore) {
          removeLayer(layerId);

          // If objects were moved, update target layer
          if (moveObjectsTo) {
            const targetLayer = manager.getLayerById(moveObjectsTo);
            if (targetLayer) {
              updateLayer(moveObjectsTo, { objects: [...targetLayer.objects] });
            }
          }
        }
      } catch (error) {
        console.error('useLayerSync: Error deleting layer', error);
        onError?.(error as Error);
      }
    },
    [manager, syncToStore, removeLayer, updateLayer, onError]
  );

  /**
   * Get the layer for a canvas object
   */
  const getObjectLayer = useCallback(
    (objectId: string): Layer | undefined => {
      return manager.getLayerByObject(objectId);
    },
    [manager]
  );

  // ========================================================================
  // Canvas Event Handlers
  // ========================================================================

  /**
   * Handle object added to canvas
   */
  const handleObjectAdded = useCallback(
    (e: CanvasObjectEvent) => {
      const obj = e.target;
      if (!obj || obj.isGrid) return;

      const objectId = ensureObjectId(obj);

      // Auto-assign to active layer if enabled
      if (autoAssignToActiveLayer && activeLayerId) {
        try {
          manager.addObjectToLayer(activeLayerId, objectId);

          if (syncToStore) {
            addObjectToLayer(activeLayerId, objectId);
          }
        } catch {
          // If active layer doesn't exist, try default layer
          const defaultLayer = manager.getDefaultLayer();
          if (defaultLayer) {
            manager.addObjectToLayer(defaultLayer.id, objectId);
            if (syncToStore) {
              addObjectToLayer(defaultLayer.id, objectId);
            }
          }
        }
      } else {
        // Assign to default layer
        const defaultLayer = manager.getDefaultLayer();
        if (defaultLayer) {
          manager.addObjectToLayer(defaultLayer.id, objectId);
          if (syncToStore) {
            addObjectToLayer(defaultLayer.id, objectId);
          }
        }
      }

      debouncedSyncToStore.current();
    },
    [
      manager,
      activeLayerId,
      autoAssignToActiveLayer,
      syncToStore,
      addObjectToLayer,
    ]
  );

  /**
   * Handle object removed from canvas
   */
  const handleObjectRemoved = useCallback(
    (e: CanvasObjectEvent) => {
      const obj = e.target;
      if (!obj || obj.isGrid || !obj.id) return;

      const objectId = obj.id;
      const layer = manager.getLayerByObject(objectId);

      if (layer) {
        try {
          manager.removeObjectFromLayer(layer.id, objectId);

          if (syncToStore) {
            removeObjectFromLayer(layer.id, objectId);
          }
        } catch (error) {
          console.error('useLayerSync: Error handling object removed', error);
        }
      }

      debouncedSyncToStore.current();
    },
    [manager, syncToStore, removeObjectFromLayer]
  );

  // ========================================================================
  // Layer Manager Event Handler
  // ========================================================================

  /**
   * Handle layer manager events
   */
  const handleLayerEvent = useCallback(
    (event: LayerEvent) => {
      if (!syncToStore) return;

      switch (event.type) {
        case 'layer:created':
          if (event.layer) {
            addLayer(toStoreLayer(event.layer));
          }
          break;

        case 'layer:deleted':
          removeLayer(event.layerId);
          break;

        case 'layer:updated':
        case 'layer:visibility':
        case 'layer:locked':
          if (event.layer) {
            updateLayer(event.layerId, toStoreLayer(event.layer));
          }
          break;

        case 'layer:reordered':
          if (event.layers) {
            setLayers(event.layers.map(toStoreLayer));
          }
          break;

        case 'object:added':
          if (event.objectId) {
            addObjectToLayer(event.layerId, event.objectId);
          }
          break;

        case 'object:removed':
          if (event.objectId) {
            removeObjectFromLayer(event.layerId, event.objectId);
          }
          break;
      }
    },
    [
      syncToStore,
      addLayer,
      removeLayer,
      updateLayer,
      setLayers,
      addObjectToLayer,
      removeObjectFromLayer,
    ]
  );

  // ========================================================================
  // Effects
  // ========================================================================

  /**
   * Attach/detach manager when canvas changes
   */
  useEffect(() => {
    if (canvas && !isAttachedRef.current) {
      manager.attach(canvas);
      isAttachedRef.current = true;

      // Initial sync
      if (syncToStore) {
        syncCanvasToLayers();
      }

      // Set up canvas event listeners
      canvas.on('object:added', handleObjectAdded);
      canvas.on('object:removed', handleObjectRemoved);

      // Subscribe to layer manager events
      const unsubscribe = manager.subscribe(handleLayerEvent);

      // Store cleanup function
      cleanupRef.current = () => {
        canvas.off('object:added', handleObjectAdded);
        canvas.off('object:removed', handleObjectRemoved);
        unsubscribe();
        debouncedSyncToStore.current.cancel();
      };
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }

      if (isAttachedRef.current) {
        manager.detach();
        isAttachedRef.current = false;
      }
    };
  }, [
    canvas,
    manager,
    syncToStore,
    syncCanvasToLayers,
    handleObjectAdded,
    handleObjectRemoved,
    handleLayerEvent,
  ]);

  /**
   * Re-attach event handlers when they change
   */
  useEffect(() => {
    if (!canvas || !isAttachedRef.current) return;

    // Update event handlers
    canvas.off('object:added', handleObjectAdded);
    canvas.off('object:removed', handleObjectRemoved);
    canvas.on('object:added', handleObjectAdded);
    canvas.on('object:removed', handleObjectRemoved);

    return () => {
      canvas.off('object:added', handleObjectAdded);
      canvas.off('object:removed', handleObjectRemoved);
    };
  }, [canvas, handleObjectAdded, handleObjectRemoved]);

  // ========================================================================
  // Return
  // ========================================================================

  return {
    manager,
    isAttached: manager.isAttached(),
    syncCanvasToLayers,
    syncLayersToCanvas,
    createNewLayer,
    deleteLayer,
    getObjectLayer,
  };
}

// ============================================================================
// Additional Hooks
// ============================================================================

/**
 * Hook to get layer visibility state for a specific layer
 */
export function useLayerVisibility(layerId: string) {
  const layer = useLayerStore((state) =>
    state.layers.find((l) => l.id === layerId)
  );

  return {
    visible: layer?.visible ?? true,
    toggle: () => {
      const store = useLayerStore.getState();
      store.toggleLayerVisibility(layerId);
      layerManager.setVisibility(layerId, !layer?.visible);
    },
  };
}

/**
 * Hook to get layer lock state for a specific layer
 */
export function useLayerLock(layerId: string) {
  const layer = useLayerStore((state) =>
    state.layers.find((l) => l.id === layerId)
  );

  return {
    locked: layer?.locked ?? false,
    toggle: () => {
      const store = useLayerStore.getState();
      store.toggleLayerLock(layerId);
      layerManager.setLocked(layerId, !layer?.locked);
    },
  };
}

/**
 * Hook to check if an object is in the active layer
 */
export function useIsObjectInActiveLayer(objectId: string) {
  const activeLayerId = useActiveLayerId();
  const layer = useLayerStore((state) =>
    state.layers.find((l) => l.id === activeLayerId)
  );

  return layer?.objects.includes(objectId) ?? false;
}

export default useLayerSync;
