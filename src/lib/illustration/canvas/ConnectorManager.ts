/**
 * Connector Manager
 *
 * Manages smart connectors between canvas objects. Tracks connectors,
 * listens for object movement, and updates connector visuals in real time.
 *
 * @module ConnectorManager
 */

import {
  Canvas as FabricCanvas,
  FabricObject,
  Group,
  ActiveSelection,
} from 'fabric';
import {
  SmartConnectorData,
  ConnectorStyle,
  ConnectorPort as _ConnectorPort,
  DEFAULT_CONNECTOR_STYLE,
  createConnectorVisual,
  updateConnectorVisual as updateVisual,
  generateConnectorId,
} from './SmartConnector';

// =============================================================================
// TYPES
// =============================================================================

/**
 * Index mapping object IDs to their connected connector IDs
 */
type ObjectToConnectorsMap = Map<string, Set<string>>;

// =============================================================================
// UTILITIES
// =============================================================================

/**
 * Ensure a Fabric object has a unique ID
 * Assigns a new ID if the object doesn't already have one
 */
export function ensureObjectId(obj: FabricObject): string {
  let id = obj.get('id') as string;
  if (!id) {
    id = `obj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    obj.set('id', id);
  }
  return id;
}

/**
 * Find an object on the canvas by its ID
 */
function findObjectById(canvas: FabricCanvas, id: string): FabricObject | undefined {
  return canvas.getObjects().find(obj => obj.get('id') === id);
}

/**
 * Check if an object is a connector (not a node)
 */
function _isConnector(obj: FabricObject): boolean {
  return obj.get('data-type') === 'connector';
}

// =============================================================================
// CONNECTOR MANAGER CLASS
// =============================================================================

export class ConnectorManager {
  private canvas: FabricCanvas;
  private connectors: Map<string, SmartConnectorData> = new Map();
  private connectorVisuals: Map<string, Group> = new Map();

  // Index: objectId → Set of connectorIds that reference it
  private objectToConnectors: ObjectToConnectorsMap = new Map();

  private isListening = false;
  private eventHandlers: {
    objectMoving: (e: { target: FabricObject | null }) => void;
    objectModified: (e: { target: FabricObject | null }) => void;
    objectRemoved: (e: { target: FabricObject | null }) => void;
  };

  constructor(canvas: FabricCanvas) {
    this.canvas = canvas;

    // Bind event handlers once
    this.eventHandlers = {
      objectMoving: this.handleObjectMoving.bind(this),
      objectModified: this.handleObjectModified.bind(this),
      objectRemoved: this.handleObjectRemoved.bind(this),
    };
  }

  // ===========================================================================
  // EVENT LISTENING
  // ===========================================================================

  /**
   * Start listening for object movement events
   */
  startListening(): void {
    if (this.isListening) return;

    this.canvas.on('object:moving', this.eventHandlers.objectMoving);
    this.canvas.on('object:modified', this.eventHandlers.objectModified);
    this.canvas.on('object:removed', this.eventHandlers.objectRemoved);

    this.isListening = true;
  }

  /**
   * Stop listening for events
   */
  stopListening(): void {
    if (!this.isListening) return;

    this.canvas.off('object:moving', this.eventHandlers.objectMoving);
    this.canvas.off('object:modified', this.eventHandlers.objectModified);
    this.canvas.off('object:removed', this.eventHandlers.objectRemoved);

    this.isListening = false;
  }

  // ===========================================================================
  // EVENT HANDLERS
  // ===========================================================================

  /**
   * Handle object:moving event - update connectors in real-time
   */
  private handleObjectMoving(e: { target: FabricObject | null }): void {
    const obj = e.target;
    if (!obj) return;

    const id = obj.get('id') as string;
    if (id) {
      this.onObjectMoving(id);
    }
  }

  /**
   * Handle object:modified event - update connectors after modification
   * Also handles ActiveSelection (multiple objects selected/modified)
   */
  private handleObjectModified(e: { target: FabricObject | null }): void {
    const obj = e.target;
    if (!obj) return;

    // Handle ActiveSelection (multiple objects)
    if (obj.type === 'activeSelection') {
      const selection = obj as ActiveSelection;
      const objects = selection.getObjects();
      objects.forEach((child: FabricObject) => {
        const id = child.get('id') as string;
        if (id) this.onObjectMoving(id);
      });
    } else {
      const id = obj.get('id') as string;
      if (id) this.onObjectMoving(id);
    }
  }

  /**
   * Handle object:removed event - cleanup connectors
   */
  private handleObjectRemoved(e: { target: FabricObject | null }): void {
    const obj = e.target;
    if (!obj) return;

    const id = obj.get('id') as string;
    if (id) {
      this.onObjectRemoved(id);
    }
  }

  // ===========================================================================
  // CONNECTOR CRUD
  // ===========================================================================

  /**
   * Add a connector between two objects
   *
   * @param sourceObjectId - ID of the source object
   * @param targetObjectId - ID of the target object
   * @param style - Optional style overrides
   * @returns The connector ID, or null if failed
   */
  addConnector(
    sourceObjectId: string,
    targetObjectId: string,
    style?: Partial<ConnectorStyle>
  ): string | null {
    // Validate objects exist on canvas
    const sourceObj = findObjectById(this.canvas, sourceObjectId);
    const targetObj = findObjectById(this.canvas, targetObjectId);

    if (!sourceObj || !targetObj) {
      console.warn('[ConnectorManager] Cannot create connector: source or target not found');
      return null;
    }

    // Prevent self-connection
    if (sourceObjectId === targetObjectId) {
      console.warn('[ConnectorManager] Cannot create connector: source and target are the same');
      return null;
    }

    // Create connector data
    const connectorId = generateConnectorId();
    const connectorStyle: ConnectorStyle = {
      ...DEFAULT_CONNECTOR_STYLE,
      ...style,
    };

    const connectorData: SmartConnectorData = {
      id: connectorId,
      source: { objectId: sourceObjectId, side: 'auto' },
      target: { objectId: targetObjectId, side: 'auto' },
      style: connectorStyle,
    };

    // Store connector data
    this.connectors.set(connectorId, connectorData);

    // Update object-to-connectors index
    this.addToIndex(sourceObjectId, connectorId);
    this.addToIndex(targetObjectId, connectorId);

    // Create and add visual
    const visual = createConnectorVisual(connectorData, sourceObj, targetObj);
    this.connectorVisuals.set(connectorId, visual);

    // Add to canvas and send to back
    this.canvas.add(visual);
    this.sendConnectorToBack(visual);
    this.canvas.requestRenderAll();

    return connectorId;
  }

  /**
   * Remove a connector by ID
   */
  removeConnector(connectorId: string): void {
    const connectorData = this.connectors.get(connectorId);
    if (!connectorData) return;

    // Remove visual from canvas
    const visual = this.connectorVisuals.get(connectorId);
    if (visual) {
      this.canvas.remove(visual);
      this.connectorVisuals.delete(connectorId);
    }

    // Update index
    this.removeFromIndex(connectorData.source.objectId, connectorId);
    this.removeFromIndex(connectorData.target.objectId, connectorId);

    // Remove connector data
    this.connectors.delete(connectorId);

    this.canvas.requestRenderAll();
  }

  /**
   * Update a connector's style
   */
  updateConnectorStyle(connectorId: string, style: Partial<ConnectorStyle>): void {
    const connectorData = this.connectors.get(connectorId);
    if (!connectorData) return;

    // Update style
    const newStyle: ConnectorStyle = {
      ...connectorData.style,
      ...style,
    };
    connectorData.style = newStyle;
    this.connectors.set(connectorId, { ...connectorData, style: newStyle });

    // Recreate visual
    this.updateConnectorVisual(connectorId);
  }

  /**
   * Get all connector IDs attached to an object
   */
  getConnectorsForObject(objectId: string): string[] {
    const connectorSet = this.objectToConnectors.get(objectId);
    return connectorSet ? Array.from(connectorSet) : [];
  }

  // ===========================================================================
  // INTERNAL UPDATE METHODS
  // ===========================================================================

  /**
   * Called when an object moves - update all attached connectors
   */
  private onObjectMoving(objectId: string): void {
    const connectorIds = this.getConnectorsForObject(objectId);

    for (const connectorId of connectorIds) {
      this.updateConnectorVisual(connectorId);
    }
  }

  /**
   * Called when an object is removed - cleanup all attached connectors
   */
  onObjectRemoved(objectId: string): void {
    const connectorIds = this.getConnectorsForObject(objectId);

    // Remove all connectors attached to this object
    for (const connectorId of connectorIds) {
      this.removeConnector(connectorId);
    }
  }

  /**
   * Rebuild the visual for a single connector
   */
  private updateConnectorVisual(connectorId: string): void {
    const connectorData = this.connectors.get(connectorId);
    if (!connectorData) return;

    const sourceObj = findObjectById(this.canvas, connectorData.source.objectId);
    const targetObj = findObjectById(this.canvas, connectorData.target.objectId);

    // If either object is gone, remove the connector
    if (!sourceObj || !targetObj) {
      this.removeConnector(connectorId);
      return;
    }

    // Get old visual
    const oldVisual = this.connectorVisuals.get(connectorId);

    // Create new visual
    const newVisual = updateVisual(oldVisual || this.createPlaceholderGroup(connectorId), sourceObj, targetObj, connectorData.style);

    // Replace old visual with new one
    if (oldVisual) {
      this.canvas.remove(oldVisual);
    }

    this.connectorVisuals.set(connectorId, newVisual);
    this.canvas.add(newVisual);
    this.sendConnectorToBack(newVisual);
    this.canvas.requestRenderAll();
  }

  // ===========================================================================
  // INDEX MANAGEMENT
  // ===========================================================================

  /**
   * Add a connector to the object-to-connectors index
   */
  private addToIndex(objectId: string, connectorId: string): void {
    if (!this.objectToConnectors.has(objectId)) {
      this.objectToConnectors.set(objectId, new Set());
    }
    this.objectToConnectors.get(objectId)!.add(connectorId);
  }

  /**
   * Remove a connector from the object-to-connectors index
   */
  private removeFromIndex(objectId: string, connectorId: string): void {
    const connectorSet = this.objectToConnectors.get(objectId);
    if (connectorSet) {
      connectorSet.delete(connectorId);
      if (connectorSet.size === 0) {
        this.objectToConnectors.delete(objectId);
      }
    }
  }

  // ===========================================================================
  // CANVAS HELPERS
  // ===========================================================================

  /**
   * Send connector to back of canvas (behind nodes)
   */
  private sendConnectorToBack(visual: Group): void {
    this.canvas.sendObjectToBack(visual);
  }

  /**
   * Create a placeholder group for a connector
   * Used when updating a visual that doesn't exist yet
   */
  private createPlaceholderGroup(connectorId: string): Group {
    const group = new Group([], {
      selectable: true,
      evented: true,
    });
    group.set('data-connector-id', connectorId);
    group.set('data-type', 'connector');
    return group;
  }

  // ===========================================================================
  // SERIALIZATION
  // ===========================================================================

  /**
   * Export all connector data for serialization
   */
  exportConnectors(): SmartConnectorData[] {
    return Array.from(this.connectors.values());
  }

  /**
   * Import connectors from saved data
   * Recreates visuals by finding objects on canvas by their IDs
   */
  importConnectors(data: SmartConnectorData[]): void {
    for (const connectorData of data) {
      const sourceObj = findObjectById(this.canvas, connectorData.source.objectId);
      const targetObj = findObjectById(this.canvas, connectorData.target.objectId);

      if (sourceObj && targetObj) {
        // Recreate connector
        const connectorId = connectorData.id;
        this.connectors.set(connectorId, connectorData);

        // Update index
        this.addToIndex(connectorData.source.objectId, connectorId);
        this.addToIndex(connectorData.target.objectId, connectorId);

        // Create visual
        const visual = createConnectorVisual(connectorData, sourceObj, targetObj);
        this.connectorVisuals.set(connectorId, visual);
        this.canvas.add(visual);
        this.sendConnectorToBack(visual);
      }
    }

    this.canvas.requestRenderAll();
  }

  // ===========================================================================
  // CLEANUP
  // ===========================================================================

  /**
   * Remove all connectors and clean up
   */
  clear(): void {
    // Remove all visuals from canvas
    for (const visual of this.connectorVisuals.values()) {
      this.canvas.remove(visual);
    }

    // Clear all maps
    this.connectors.clear();
    this.connectorVisuals.clear();
    this.objectToConnectors.clear();

    this.canvas.requestRenderAll();
  }

  /**
   * Get the canvas instance
   */
  getCanvas(): FabricCanvas {
    return this.canvas;
  }

  /**
   * Get connector data by ID
   */
  getConnectorData(connectorId: string): SmartConnectorData | undefined {
    return this.connectors.get(connectorId);
  }

  /**
   * Get all connector IDs
   */
  getAllConnectorIds(): string[] {
    return Array.from(this.connectors.keys());
  }
}
