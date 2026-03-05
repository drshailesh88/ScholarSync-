/**
 * FINNISH Layer Manager Service
 * Manages canvas layers including creation, deletion, reordering, and object assignment
 *
 * @module services/LayerManager
 */

import type { FabricCanvas } from '@/lib/illustration/types/index';

// ============================================================================
// Types
// ============================================================================

/**
 * Layer interface for organizing canvas objects
 */
export interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  objects: string[]; // object IDs
  order: number;
}

/**
 * Layer event types for subscribers
 */
export type LayerEventType =
  | 'layer:created'
  | 'layer:deleted'
  | 'layer:updated'
  | 'layer:reordered'
  | 'layer:visibility'
  | 'layer:locked'
  | 'object:added'
  | 'object:removed';

/**
 * Layer event data
 */
export interface LayerEvent {
  type: LayerEventType;
  layerId: string;
  layer?: Layer;
  objectId?: string;
  layers?: Layer[];
}

/**
 * Layer event subscriber callback
 */
export type LayerEventCallback = (event: LayerEvent) => void;

// ============================================================================
// Errors
// ============================================================================

/**
 * Custom error for layer operations
 */
export class LayerError extends Error {
  constructor(
    message: string,
    public readonly code: LayerErrorCode,
    public readonly layerId?: string
  ) {
    super(message);
    this.name = 'LayerError';
  }
}

/**
 * Error codes for layer operations
 */
export type LayerErrorCode =
  | 'LAYER_NOT_FOUND'
  | 'LAYER_EXISTS'
  | 'CANVAS_NOT_ATTACHED'
  | 'OBJECT_NOT_FOUND'
  | 'INVALID_OPERATION'
  | 'LAYER_LOCKED';

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_LAYER_NAME = 'Layer';
const DEFAULT_LAYER_ID = 'default';

/**
 * Generate a unique layer ID
 */
function generateLayerId(): string {
  return `layer_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Generate a unique object ID if not present
 */
function generateObjectId(): string {
  return `obj_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// ============================================================================
// Layer Manager Class
// ============================================================================

/**
 * LayerManager class for managing canvas layers
 *
 * @example
 * ```ts
 * import { LayerManager } from '@/services/LayerManager';
 *
 * const layerManager = new LayerManager();
 * layerManager.attach(canvas);
 *
 * const layer = layerManager.createLayer('Background');
 * layerManager.addObjectToLayer(layer.id, 'rect_1');
 * ```
 */
export class LayerManager {
  private layers: Map<string, Layer>;
  private canvas: FabricCanvas | null;
  private subscribers: Set<LayerEventCallback>;
  private objectLayerMap: Map<string, string>; // objectId -> layerId

  constructor() {
    this.layers = new Map();
    this.canvas = null;
    this.subscribers = new Set();
    this.objectLayerMap = new Map();
  }

  // ==========================================================================
  // Canvas Attachment
  // ==========================================================================

  /**
   * Attach the LayerManager to a Fabric.js canvas
   * Creates a default layer if none exist
   * @param canvas - The Fabric.js canvas instance
   */
  attach(canvas: FabricCanvas): void {
    this.canvas = canvas;

    // Create default layer if no layers exist
    if (this.layers.size === 0) {
      this.createLayer(DEFAULT_LAYER_NAME, DEFAULT_LAYER_ID);
    }

    // Sync existing canvas objects to default layer
    this.syncCanvasObjects();
  }

  /**
   * Detach the LayerManager from the canvas
   */
  detach(): void {
    this.canvas = null;
  }

  /**
   * Check if canvas is attached
   */
  isAttached(): boolean {
    return this.canvas !== null;
  }

  /**
   * Get the attached canvas
   */
  getCanvas(): FabricCanvas | null {
    return this.canvas;
  }

  // ==========================================================================
  // Layer CRUD Operations
  // ==========================================================================

  /**
   * Create a new layer
   * @param name - Layer name
   * @param id - Optional custom layer ID
   * @returns The created layer
   */
  createLayer(name: string, id?: string): Layer {
    const layerId = id || generateLayerId();

    if (this.layers.has(layerId)) {
      throw new LayerError(
        `Layer with ID "${layerId}" already exists`,
        'LAYER_EXISTS',
        layerId
      );
    }

    // Calculate order (new layers go on top)
    const maxOrder = this.getMaxOrder();

    const layer: Layer = {
      id: layerId,
      name,
      visible: true,
      locked: false,
      objects: [],
      order: maxOrder + 1,
    };

    this.layers.set(layerId, layer);
    this.emit({ type: 'layer:created', layerId, layer });

    return layer;
  }

  /**
   * Delete a layer
   * @param id - Layer ID to delete
   * @param moveObjectsToLayer - Optional layer ID to move objects to (default: delete objects)
   */
  deleteLayer(id: string, moveObjectsToLayer?: string): void {
    const layer = this.getLayerById(id);

    if (!layer) {
      throw new LayerError(
        `Layer with ID "${id}" not found`,
        'LAYER_NOT_FOUND',
        id
      );
    }

    // Prevent deleting the last layer
    if (this.layers.size === 1) {
      throw new LayerError(
        'Cannot delete the last remaining layer',
        'INVALID_OPERATION',
        id
      );
    }

    // Handle objects in the layer
    if (layer.objects.length > 0) {
      if (moveObjectsToLayer) {
        const targetLayer = this.getLayerById(moveObjectsToLayer);
        if (!targetLayer) {
          throw new LayerError(
            `Target layer "${moveObjectsToLayer}" not found`,
            'LAYER_NOT_FOUND',
            moveObjectsToLayer
          );
        }

        // Move objects to target layer
        layer.objects.forEach((objectId) => {
          this.objectLayerMap.set(objectId, moveObjectsToLayer);
          targetLayer.objects.push(objectId);
        });
      } else {
        // Remove objects from canvas
        if (this.canvas) {
          layer.objects.forEach((objectId) => {
            const obj = this.getCanvasObject(objectId);
            if (obj) {
              this.canvas!.remove(obj);
            }
            this.objectLayerMap.delete(objectId);
          });
        }
      }
    }

    // Remove the layer
    this.layers.delete(id);

    // Reorder remaining layers
    this.normalizeLayerOrder();

    this.emit({ type: 'layer:deleted', layerId: id });
  }

  /**
   * Rename a layer
   * @param id - Layer ID
   * @param name - New layer name
   */
  renameLayer(id: string, name: string): void {
    const layer = this.getLayerById(id);

    if (!layer) {
      throw new LayerError(
        `Layer with ID "${id}" not found`,
        'LAYER_NOT_FOUND',
        id
      );
    }

    layer.name = name;
    this.emit({ type: 'layer:updated', layerId: id, layer });
  }

  // ==========================================================================
  // Visibility and Lock Management
  // ==========================================================================

  /**
   * Set layer visibility
   * @param id - Layer ID
   * @param visible - Whether the layer should be visible
   */
  setVisibility(id: string, visible: boolean): void {
    const layer = this.getLayerById(id);

    if (!layer) {
      throw new LayerError(
        `Layer with ID "${id}" not found`,
        'LAYER_NOT_FOUND',
        id
      );
    }

    layer.visible = visible;

    // Update canvas objects visibility
    if (this.canvas) {
      layer.objects.forEach((objectId) => {
        const obj = this.getCanvasObject(objectId);
        if (obj) {
          obj.set('visible', visible);
        }
      });
      this.canvas.requestRenderAll();
    }

    this.emit({ type: 'layer:visibility', layerId: id, layer });
  }

  /**
   * Toggle layer visibility
   * @param id - Layer ID
   */
  toggleVisibility(id: string): void {
    const layer = this.getLayerById(id);
    if (layer) {
      this.setVisibility(id, !layer.visible);
    }
  }

  /**
   * Set layer locked state
   * @param id - Layer ID
   * @param locked - Whether the layer should be locked
   */
  setLocked(id: string, locked: boolean): void {
    const layer = this.getLayerById(id);

    if (!layer) {
      throw new LayerError(
        `Layer with ID "${id}" not found`,
        'LAYER_NOT_FOUND',
        id
      );
    }

    layer.locked = locked;

    // Update canvas objects selectable/evented state
    if (this.canvas) {
      layer.objects.forEach((objectId) => {
        const obj = this.getCanvasObject(objectId);
        if (obj) {
          obj.set({
            selectable: !locked,
            evented: !locked,
          });
        }
      });
      this.canvas.requestRenderAll();
    }

    this.emit({ type: 'layer:locked', layerId: id, layer });
  }

  /**
   * Toggle layer locked state
   * @param id - Layer ID
   */
  toggleLocked(id: string): void {
    const layer = this.getLayerById(id);
    if (layer) {
      this.setLocked(id, !layer.locked);
    }
  }

  // ==========================================================================
  // Layer Ordering
  // ==========================================================================

  /**
   * Move a layer in the specified direction
   * @param id - Layer ID
   * @param direction - Direction to move: 'up', 'down', 'top', or 'bottom'
   */
  moveLayer(id: string, direction: 'up' | 'down' | 'top' | 'bottom'): void {
    const layer = this.getLayerById(id);

    if (!layer) {
      throw new LayerError(
        `Layer with ID "${id}" not found`,
        'LAYER_NOT_FOUND',
        id
      );
    }

    const layers = this.getLayersSorted();
    const currentIndex = layers.findIndex((l) => l.id === id);

    if (currentIndex === -1) return;

    let newIndex: number;

    switch (direction) {
      case 'up':
        newIndex = Math.min(currentIndex + 1, layers.length - 1);
        break;
      case 'down':
        newIndex = Math.max(currentIndex - 1, 0);
        break;
      case 'top':
        newIndex = layers.length - 1;
        break;
      case 'bottom':
        newIndex = 0;
        break;
    }

    if (newIndex === currentIndex) return;

    // Reorder layers
    const [movedLayer] = layers.splice(currentIndex, 1);
    layers.splice(newIndex, 0, movedLayer);

    // Update order values
    layers.forEach((l, index) => {
      l.order = index;
    });

    // Update canvas z-indices
    this.syncLayerZIndices();

    this.emit({ type: 'layer:reordered', layerId: id, layers: [...layers] });
  }

  /**
   * Set the order of all layers
   * @param layerIds - Array of layer IDs in desired order (bottom to top)
   */
  setLayerOrder(layerIds: string[]): void {
    // Validate all layer IDs exist
    layerIds.forEach((id) => {
      if (!this.layers.has(id)) {
        throw new LayerError(
          `Layer with ID "${id}" not found`,
          'LAYER_NOT_FOUND',
          id
        );
      }
    });

    // Update order values
    layerIds.forEach((id, index) => {
      const layer = this.layers.get(id);
      if (layer) {
        layer.order = index;
      }
    });

    // Update canvas z-indices
    this.syncLayerZIndices();

    this.emit({
      type: 'layer:reordered',
      layerId: layerIds[0],
      layers: this.getLayersSorted(),
    });
  }

  // ==========================================================================
  // Object Management
  // ==========================================================================

  /**
   * Add an object to a layer
   * @param layerId - Layer ID
   * @param objectId - Object ID to add
   */
  addObjectToLayer(layerId: string, objectId: string): void {
    const layer = this.getLayerById(layerId);

    if (!layer) {
      throw new LayerError(
        `Layer with ID "${layerId}" not found`,
        'LAYER_NOT_FOUND',
        layerId
      );
    }

    // Check if object is already in another layer
    const existingLayerId = this.objectLayerMap.get(objectId);
    if (existingLayerId && existingLayerId !== layerId) {
      this.removeObjectFromLayer(existingLayerId, objectId);
    }

    // Add object to layer if not already present
    if (!layer.objects.includes(objectId)) {
      layer.objects.push(objectId);
      this.objectLayerMap.set(objectId, layerId);

      // Apply layer properties to object
      this.applyLayerPropertiesToObject(layerId, objectId);

      this.emit({ type: 'object:added', layerId, objectId, layer });
    }
  }

  /**
   * Remove an object from a layer
   * @param layerId - Layer ID
   * @param objectId - Object ID to remove
   */
  removeObjectFromLayer(layerId: string, objectId: string): void {
    const layer = this.getLayerById(layerId);

    if (!layer) {
      throw new LayerError(
        `Layer with ID "${layerId}" not found`,
        'LAYER_NOT_FOUND',
        layerId
      );
    }

    const objectIndex = layer.objects.indexOf(objectId);
    if (objectIndex !== -1) {
      layer.objects.splice(objectIndex, 1);
      this.objectLayerMap.delete(objectId);

      this.emit({ type: 'object:removed', layerId, objectId, layer });
    }
  }

  /**
   * Move an object to a different layer
   * @param objectId - Object ID to move
   * @param targetLayerId - Target layer ID
   */
  moveObjectToLayer(objectId: string, targetLayerId: string): void {
    const currentLayerId = this.objectLayerMap.get(objectId);

    if (currentLayerId) {
      this.removeObjectFromLayer(currentLayerId, objectId);
    }

    this.addObjectToLayer(targetLayerId, objectId);
  }

  /**
   * Get objects by layer
   * @param layerId - Layer ID
   * @returns Array of object IDs in the layer
   */
  getObjectsByLayer(layerId: string): string[] {
    const layer = this.getLayerById(layerId);
    return layer ? [...layer.objects] : [];
  }

  /**
   * Get the layer containing a specific object
   * @param objectId - Object ID to find
   * @returns The layer containing the object, or undefined
   */
  getLayerByObject(objectId: string): Layer | undefined {
    const layerId = this.objectLayerMap.get(objectId);
    return layerId ? this.getLayerById(layerId) : undefined;
  }

  // ==========================================================================
  // Layer Getters
  // ==========================================================================

  /**
   * Get all layers sorted by order (bottom to top)
   * @returns Array of layers
   */
  getLayers(): Layer[] {
    return this.getLayersSorted();
  }

  /**
   * Get a layer by ID
   * @param id - Layer ID
   * @returns The layer or undefined
   */
  getLayerById(id: string): Layer | undefined {
    return this.layers.get(id);
  }

  /**
   * Get the default layer
   * @returns The default layer
   */
  getDefaultLayer(): Layer | undefined {
    return this.layers.get(DEFAULT_LAYER_ID) || this.getLayersSorted()[0];
  }

  /**
   * Get layer count
   * @returns Number of layers
   */
  getLayerCount(): number {
    return this.layers.size;
  }

  // ==========================================================================
  // Event Subscription
  // ==========================================================================

  /**
   * Subscribe to layer events
   * @param callback - Event callback function
   * @returns Unsubscribe function
   */
  subscribe(callback: LayerEventCallback): () => void {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  // ==========================================================================
  // Serialization
  // ==========================================================================

  /**
   * Serialize layer state to JSON
   * @returns JSON-compatible layer state
   */
  toJSON(): { layers: Layer[]; objectLayerMap: Record<string, string> } {
    return {
      layers: this.getLayersSorted(),
      objectLayerMap: Object.fromEntries(this.objectLayerMap),
    };
  }

  /**
   * Restore layer state from JSON
   * @param data - Serialized layer state
   */
  fromJSON(data: {
    layers: Layer[];
    objectLayerMap: Record<string, string>;
  }): void {
    this.layers.clear();
    this.objectLayerMap.clear();

    data.layers.forEach((layer) => {
      this.layers.set(layer.id, { ...layer });
    });

    Object.entries(data.objectLayerMap).forEach(([objectId, layerId]) => {
      this.objectLayerMap.set(objectId, layerId);
    });
  }

  /**
   * Clear all layers and reset to default state
   */
  reset(): void {
    this.layers.clear();
    this.objectLayerMap.clear();
    this.createLayer(DEFAULT_LAYER_NAME, DEFAULT_LAYER_ID);
  }

  // ==========================================================================
  // Private Helper Methods
  // ==========================================================================

  /**
   * Get layers sorted by order
   */
  private getLayersSorted(): Layer[] {
    return Array.from(this.layers.values()).sort((a, b) => a.order - b.order);
  }

  /**
   * Get maximum layer order value
   */
  private getMaxOrder(): number {
    let max = -1;
    this.layers.forEach((layer) => {
      if (layer.order > max) {
        max = layer.order;
      }
    });
    return max;
  }

  /**
   * Normalize layer order values (ensure consecutive integers)
   */
  private normalizeLayerOrder(): void {
    const sorted = this.getLayersSorted();
    sorted.forEach((layer, index) => {
      layer.order = index;
    });
  }

  /**
   * Sync canvas z-indices with layer order
   */
  private syncLayerZIndices(): void {
    if (!this.canvas) return;

    const layers = this.getLayersSorted();
    let zIndex = 0;

    layers.forEach((layer) => {
      layer.objects.forEach((objectId) => {
        const obj = this.getCanvasObject(objectId);
        if (obj) {
          this.canvas!.moveTo(obj, zIndex);
          zIndex++;
        }
      });
    });

    this.canvas.requestRenderAll();
  }

  /**
   * Sync existing canvas objects to the default layer
   */
  private syncCanvasObjects(): void {
    if (!this.canvas) return;

    const defaultLayer = this.getDefaultLayer();
    if (!defaultLayer) return;

    const objects = this.canvas.getObjects();
    objects.forEach((obj: FabricCanvas) => {
      // Skip grid objects
      if (obj.isGrid) return;

      let objectId = obj.id;
      if (!objectId) {
        objectId = generateObjectId();
        obj.set('id', objectId);
      }

      // Add to default layer if not already in a layer
      if (!this.objectLayerMap.has(objectId)) {
        defaultLayer.objects.push(objectId);
        this.objectLayerMap.set(objectId, defaultLayer.id);
      }
    });
  }

  /**
   * Get a canvas object by ID
   */
  private getCanvasObject(objectId: string): FabricCanvas | undefined {
    if (!this.canvas) return undefined;

    const objects = this.canvas.getObjects();
    return objects.find((obj: FabricCanvas) => obj.id === objectId);
  }

  /**
   * Apply layer properties (visibility, locked) to an object
   */
  private applyLayerPropertiesToObject(
    layerId: string,
    objectId: string
  ): void {
    const layer = this.getLayerById(layerId);
    if (!layer || !this.canvas) return;

    const obj = this.getCanvasObject(objectId);
    if (!obj) return;

    obj.set({
      visible: layer.visible,
      selectable: !layer.locked,
      evented: !layer.locked,
    });
  }

  /**
   * Emit an event to all subscribers
   */
  private emit(event: LayerEvent): void {
    this.subscribers.forEach((callback) => {
      try {
        callback(event);
      } catch (error) {
        console.error('LayerManager: Error in event subscriber:', error);
      }
    });
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

/**
 * Default LayerManager instance for global use
 */
export const layerManager = new LayerManager();

export default LayerManager;
