/**
 * Canvas Context
 * React context for sharing canvas instance across components
 *
 * @module components/Canvas/CanvasContext
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import { Canvas as FabricCanvas, FabricObject, loadSVGFromString, util, Point, Group, ActiveSelection } from 'fabric';
import {
  makeClippingMask as applyClippingMask,
  releaseClippingMask as releaseClippingMaskOperation,
} from '@/lib/illustration/canvas/clipping-mask';

// ============================================================================
// Types
// ============================================================================

export interface CanvasContextValue {
  /** The Fabric.js canvas instance */
  canvas: FabricCanvas | null;

  /** Set the canvas instance */
  setCanvas: (canvas: FabricCanvas | null) => void;

  /** Check if canvas is ready */
  isReady: boolean;

  // Common operations
  /** Clear the entire canvas */
  clearCanvas: () => void;

  /** Export canvas as SVG string */
  exportSVG: () => string;

  /** Export canvas as PNG data URL */
  exportPNG: (multiplier?: number) => string;

  /** Export canvas as JSON */
  exportJSON: () => object;

  /** Import canvas from JSON */
  importJSON: (json: object | string) => Promise<void>;

  /** Import SVG content */
  importSVG: (svgString: string) => Promise<void>;

  /** Get all objects on canvas */
  getObjects: () => FabricObject[];

  /** Get selected objects */
  getSelectedObjects: () => FabricObject[];

  /** Subscribe to multiple canvas events; returns an unsubscribe function */
  subscribeToCanvasEvents: (
    eventNames: string[],
    handler: (event?: unknown) => void
  ) => () => void;

  /** Delete selected objects */
  deleteSelected: () => void;

  /** Select all objects */
  selectAll: () => void;

  /** Deselect all objects */
  deselectAll: () => void;

  /** Copy selected objects */
  copy: () => void;

  /** Paste copied objects */
  paste: () => Promise<void>;

  /** Cut selected objects */
  cut: () => void;

  /** Group selected objects */
  groupSelected: () => void;

  /** Ungroup selected group */
  ungroupSelected: () => void;

  /** Create a clipping mask from selected objects */
  makeClippingMask: () => Promise<boolean>;

  /** Release clipping mask from selected clipped group */
  releaseClippingMask: () => Promise<boolean>;

  /** Bring selected object to front */
  bringToFront: () => void;

  /** Send selected object to back */
  sendToBack: () => void;

  /** Bring selected object forward */
  bringForward: () => void;

  /** Send selected object backward */
  sendBackward: () => void;

  /** Zoom to fit all objects */
  zoomToFit: () => void;

  /** Set canvas zoom level */
  setZoom: (zoom: number) => void;

  /** Get current zoom level */
  getZoom: () => number;

  /** Center view on canvas */
  centerView: () => void;
}

// ============================================================================
// Context
// ============================================================================

const CanvasContext = createContext<CanvasContextValue | null>(null);

// ============================================================================
// Provider
// ============================================================================

interface CanvasProviderProps {
  children: ReactNode;
}

export function CanvasProvider({ children }: CanvasProviderProps) {
  const [canvas, setCanvasState] = useState<FabricCanvas | null>(null);
  const [clipboard, setClipboard] = useState<FabricObject[]>([]);

  // Set canvas instance
  const setCanvas = useCallback((newCanvas: FabricCanvas | null) => {
    setCanvasState(newCanvas);
  }, []);

  // Clear canvas
  const clearCanvas = useCallback(() => {
    if (!canvas) return;
    canvas.clear();
    canvas.backgroundColor = '#ffffff';
    canvas.renderAll();
  }, [canvas]);

  // Export as SVG
  const exportSVG = useCallback(() => {
    if (!canvas) return '';
    return canvas.toSVG();
  }, [canvas]);

  // Export as PNG
  const exportPNG = useCallback(
    (multiplier = 2) => {
      if (!canvas) return '';
      return canvas.toDataURL({
        format: 'png',
        multiplier,
      });
    },
    [canvas]
  );

  // Export as JSON
  const exportJSON = useCallback(() => {
    if (!canvas) return {};
    return canvas.toJSON();
  }, [canvas]);

  // Import from JSON
  const importJSON = useCallback(
    async (json: object | string) => {
      if (!canvas) return;
      const jsonData = typeof json === 'string' ? JSON.parse(json) : json;
      await canvas.loadFromJSON(jsonData);
      canvas.renderAll();
    },
    [canvas]
  );

  // Import SVG
  const importSVG = useCallback(
    async (svgString: string) => {
      if (!canvas) return;

      return new Promise<void>((resolve, reject) => {
        loadSVGFromString(svgString).then(({ objects, options }) => {
          const filteredObjects = objects.filter((obj): obj is FabricObject => obj !== null);
          const group = util.groupSVGElements(filteredObjects, options);

          // Scale to fit canvas
          const canvasWidth = canvas.width || 800;
          const canvasHeight = canvas.height || 600;
          const maxWidth = canvasWidth * 0.9;
          const maxHeight = canvasHeight * 0.9;

          const scaleX = maxWidth / (group.width || 1);
          const scaleY = maxHeight / (group.height || 1);
          const scale = Math.min(scaleX, scaleY, 1);

          group.scale(scale);
          group.set({
            left: (canvasWidth - (group.width || 0) * scale) / 2,
            top: (canvasHeight - (group.height || 0) * scale) / 2,
          });

          canvas.add(group);
          canvas.setActiveObject(group);
          canvas.renderAll();
          resolve();
        }).catch(reject);
      });
    },
    [canvas]
  );

  // Get all objects
  const getObjects = useCallback(() => {
    if (!canvas) return [];
    return canvas.getObjects().filter((obj) => !(obj as FabricObject & { isGrid?: boolean }).isGrid);
  }, [canvas]);

  // Get selected objects
  const getSelectedObjects = useCallback(() => {
    if (!canvas) return [];
    return canvas.getActiveObjects();
  }, [canvas]);

  const subscribeToCanvasEvents = useCallback(
    (eventNames: string[], handler: (event?: unknown) => void) => {
      if (!canvas) {
        return () => {};
      }

      eventNames.forEach((eventName) => {
        canvas.on(eventName as never, handler as never);
      });

      return () => {
        eventNames.forEach((eventName) => {
          canvas.off(eventName as never, handler as never);
        });
      };
    },
    [canvas]
  );

  // Delete selected
  const deleteSelected = useCallback(() => {
    if (!canvas) return;
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length > 0) {
      activeObjects.forEach((obj) => canvas.remove(obj));
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  }, [canvas]);

  // Select all
  const selectAll = useCallback(() => {
    if (!canvas) return;
    canvas.discardActiveObject();
    const objects = canvas
      .getObjects()
      .filter((obj) => !(obj as FabricObject & { isGrid?: boolean }).isGrid);
    if (objects.length > 0) {
      const selection = new ActiveSelection(objects, { canvas });
      canvas.setActiveObject(selection);
      canvas.renderAll();
    }
  }, [canvas]);

  // Deselect all
  const deselectAll = useCallback(() => {
    if (!canvas) return;
    canvas.discardActiveObject();
    canvas.renderAll();
  }, [canvas]);

  // Copy
  const copy = useCallback(() => {
    if (!canvas) return;
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length > 0) {
      const cloned = activeObjects.map((obj) => obj.toObject());
      setClipboard(cloned as unknown as FabricObject[]);
    }
  }, [canvas]);

  // Paste
  const paste = useCallback(async () => {
    if (!canvas || clipboard.length === 0) return;

    for (const objData of clipboard) {
      try {
        const objects = await util.enlivenObjects([objData]);
        // Filter to only FabricObject instances
        const fabricObjects = objects.filter(
          (obj): obj is FabricObject => obj !== null && typeof obj === 'object' && 'set' in obj
        );
        fabricObjects.forEach((obj) => {
          obj.set({
            left: (obj.left || 0) + 20,
            top: (obj.top || 0) + 20,
          });
          canvas.add(obj);
        });
        canvas.renderAll();
      } catch (error) {
        console.error('Failed to paste object:', error);
      }
    }
  }, [canvas, clipboard]);

  // Cut
  const cut = useCallback(() => {
    copy();
    deleteSelected();
  }, [copy, deleteSelected]);

  // Group selected
  const groupSelected = useCallback(() => {
    if (!canvas) return;
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length < 2) return;

    const group = new Group(activeObjects);

    activeObjects.forEach((obj) => canvas.remove(obj));
    canvas.add(group);
    canvas.setActiveObject(group);
    canvas.renderAll();
  }, [canvas]);

  // Ungroup selected
  const ungroupSelected = useCallback(() => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject || activeObject.type !== 'group') return;

    const group = activeObject as Group;
    const items = group.getObjects();

    // Get transform of group to apply to items
    const groupCenter = group.getCenterPoint();
    const groupAngle = group.angle || 0;
    const groupScaleX = group.scaleX || 1;
    const groupScaleY = group.scaleY || 1;

    canvas.remove(group);

    items.forEach((item: FabricObject) => {
      // Apply group transforms to item
      const itemCenter = item.getCenterPoint();
      const angle = (item.angle || 0) + groupAngle;
      const scaleX = (item.scaleX || 1) * groupScaleX;
      const scaleY = (item.scaleY || 1) * groupScaleY;

      item.set({
        left: groupCenter.x + (itemCenter.x - groupCenter.x) * groupScaleX,
        top: groupCenter.y + (itemCenter.y - groupCenter.y) * groupScaleY,
        angle,
        scaleX,
        scaleY,
      });
      item.setCoords();
      canvas.add(item);
    });

    canvas.discardActiveObject();
    canvas.renderAll();
  }, [canvas]);

  // Make clipping mask
  const makeClippingMask = useCallback(async () => {
    if (!canvas) return false;

    const result = await applyClippingMask(canvas);
    if (!result.success || !result.group) {
      return false;
    }

    canvas.requestRenderAll();
    canvas.fire('object:modified', { target: result.group });
    return true;
  }, [canvas]);

  // Release clipping mask
  const releaseClippingMask = useCallback(async () => {
    if (!canvas) return false;

    const result = await releaseClippingMaskOperation(canvas);
    if (!result.success) {
      return false;
    }

    canvas.requestRenderAll();
    const historyTarget = result.clipShape ?? result.releasedObjects?.[0];
    if (historyTarget) {
      canvas.fire('object:modified', { target: historyTarget });
    }
    return true;
  }, [canvas]);

  // Bring to front
  const bringToFront = useCallback(() => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.bringObjectToFront(activeObject);
      canvas.renderAll();
    }
  }, [canvas]);

  // Send to back
  const sendToBack = useCallback(() => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.sendObjectToBack(activeObject);
      canvas.renderAll();
    }
  }, [canvas]);

  // Bring forward
  const bringForward = useCallback(() => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.bringObjectForward(activeObject);
      canvas.renderAll();
    }
  }, [canvas]);

  // Send backward
  const sendBackward = useCallback(() => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.sendObjectBackwards(activeObject);
      canvas.renderAll();
    }
  }, [canvas]);

  // Zoom to fit
  const zoomToFit = useCallback(() => {
    if (!canvas) return;
    const objects = canvas.getObjects().filter((obj) => !(obj as FabricObject & { isGrid?: boolean }).isGrid);
    if (objects.length === 0) return;

    // Calculate bounding box of all objects
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    objects.forEach((obj) => {
      const bounds = obj.getBoundingRect();
      minX = Math.min(minX, bounds.left);
      minY = Math.min(minY, bounds.top);
      maxX = Math.max(maxX, bounds.left + bounds.width);
      maxY = Math.max(maxY, bounds.top + bounds.height);
    });

    const contentWidth = maxX - minX;
    const contentHeight = maxY - minY;
    const canvasWidth = canvas.width || 800;
    const canvasHeight = canvas.height || 600;

    const zoom = Math.min(
      (canvasWidth * 0.9) / contentWidth,
      (canvasHeight * 0.9) / contentHeight,
      2
    );

    canvas.setZoom(zoom);
    canvas.absolutePan(new Point(
      minX - (canvasWidth / zoom - contentWidth) / 2,
      minY - (canvasHeight / zoom - contentHeight) / 2
    ));
    canvas.renderAll();
  }, [canvas]);

  // Set zoom
  const setZoom = useCallback(
    (zoom: number) => {
      if (!canvas) return;
      const clampedZoom = Math.max(0.1, Math.min(10, zoom));
      canvas.setZoom(clampedZoom);
      canvas.renderAll();
    },
    [canvas]
  );

  // Get zoom
  const getZoom = useCallback(() => {
    if (!canvas) return 1;
    return canvas.getZoom();
  }, [canvas]);

  // Center view
  const centerView = useCallback(() => {
    if (!canvas) return;
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    canvas.renderAll();
  }, [canvas]);

  // Context value
  const value = useMemo<CanvasContextValue>(
    () => ({
      canvas,
      setCanvas,
      isReady: canvas !== null,
      clearCanvas,
      exportSVG,
      exportPNG,
      exportJSON,
      importJSON,
      importSVG,
      getObjects,
      getSelectedObjects,
      subscribeToCanvasEvents,
      deleteSelected,
      selectAll,
      deselectAll,
      copy,
      paste,
      cut,
      groupSelected,
      ungroupSelected,
      makeClippingMask,
      releaseClippingMask,
      bringToFront,
      sendToBack,
      bringForward,
      sendBackward,
      zoomToFit,
      setZoom,
      getZoom,
      centerView,
    }),
    [
      canvas,
      setCanvas,
      clearCanvas,
      exportSVG,
      exportPNG,
      exportJSON,
      importJSON,
      importSVG,
      getObjects,
      getSelectedObjects,
      subscribeToCanvasEvents,
      deleteSelected,
      selectAll,
      deselectAll,
      copy,
      paste,
      cut,
      groupSelected,
      ungroupSelected,
      makeClippingMask,
      releaseClippingMask,
      bringToFront,
      sendToBack,
      bringForward,
      sendBackward,
      zoomToFit,
      setZoom,
      getZoom,
      centerView,
    ]
  );

  return (
    <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
  );
}

// ============================================================================
// Hook
// ============================================================================

/**
 * Hook to access canvas context
 * @returns Canvas context value
 * @throws Error if used outside CanvasProvider
 */
export function useCanvas(): CanvasContextValue {
  const context = useContext(CanvasContext);

  if (!context) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }

  return context;
}

// ============================================================================
// Export
// ============================================================================

export default CanvasContext;
