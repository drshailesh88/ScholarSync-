/**
 * Canvas Component
 * React wrapper for Fabric.js canvas with FINNISH editor integration
 *
 * @module components/Canvas/Canvas
 */

import {
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { Canvas as FabricCanvas, FabricObject, Rect, Ellipse, Line, Textbox, Triangle, Group, Polygon, Path as FabricPath, util } from 'fabric';
import { useEditorStore, useActiveTool, useViewport, useGridState, useShapeToolSettings } from '@/stores/illustration/editorStore';
import { ToolType } from '@/lib/illustration/types';
import { useToast } from '@/components/illustration/Toast/useToast';
import { PenToolOverlay } from './PenToolOverlay';
import { PointEditingOverlay } from './PointEditingOverlay';
import { ConnectorManager, ensureObjectId } from '@/lib/illustration/canvas/ConnectorManager';
import { DEFAULT_CONNECTOR_STYLE } from '@/lib/illustration/canvas/SmartConnector';
import { generatePolygonPoints, generateStarPoints } from '@/lib/illustration/canvas/shape-generators';
import { sampleCanvasBackgroundColor, sampleObjectFillColor, type Point2D } from '@/lib/illustration/canvas/eyedropper-utils';
import { snapAxisToGuides } from '@/components/illustration/Rulers/GuideOverlay';
import {
  isGridObject,
  filterGridFromSerializedState,
  getCanvasWrapperStyle,
  getConnectorPointer,
  registerGridOverlay,
  removeGridObjects,
  shouldPushHistoryForEvent,
  type SerializedCanvasState,
} from '@/lib/illustration/canvas/editorBugfixUtils';
import { EraserTool } from '@/lib/illustration/editor/tools/EraserTool';
import { ScissorsTool } from '@/lib/illustration/editor/tools/ScissorsTool';
import { MeasureTool, type Measurement } from '@/lib/illustration/editor/tools/MeasureTool';
// Note: Canvas.css was removed - using inline styles instead

// ============================================================================
// Types
// ============================================================================

export interface CanvasProps {
  /** Canvas width in pixels */
  width?: number;
  /** Canvas height in pixels */
  height?: number;
  /** Background color */
  backgroundColor?: string;
  /** Callback when selection changes */
  onSelectionChange?: (objects: FabricObject[]) => void;
  /** Callback when object is modified */
  onObjectModified?: (object: FabricObject) => void;
  /** Callback when mouse moves on canvas */
  onMouseMove?: (coords: { x: number; y: number }) => void;
  /** Callback when canvas is ready */
  onReady?: (canvas: FabricCanvas) => void;
  /** Class name for wrapper */
  className?: string;
}

export interface CanvasRef {
  /** Get the Fabric.js canvas instance */
  getCanvas: () => FabricCanvas | null;
  /** Export canvas as SVG */
  toSVG: () => string;
  /** Export canvas as PNG data URL */
  toPNG: (multiplier?: number) => string;
  /** Export canvas as JSON */
  toJSON: () => object;
  /** Load canvas from JSON */
  loadFromJSON: (json: object | string) => Promise<void>;
  /** Clear the canvas */
  clear: () => void;
  /** Add object to canvas */
  addObject: (object: FabricObject) => void;
  /** Remove object from canvas */
  removeObject: (object: FabricObject) => void;
  /** Get the connector manager instance */
  getConnectorManager: () => ConnectorManager | null;
}

// ============================================================================
// Drawing State
// ============================================================================

interface DrawingState {
  isDrawing: boolean;
  startX: number;
  startY: number;
  tempObject: FabricObject | null;
  connectorSource: string | null;
}

type DrawingFlagCanvas = FabricCanvas & {
  _isDrawing?: boolean;
};

type SelectionCarrier = FabricObject & {
  type?: string;
  getObjects?: () => FabricObject[];
};

function getSelectionTargets(activeObject: FabricObject | null): FabricObject[] {
  if (!activeObject) {
    return [];
  }

  const candidate = activeObject as SelectionCarrier;
  if (candidate.type === 'activeSelection' && typeof candidate.getObjects === 'function') {
    return candidate.getObjects();
  }

  return [activeObject];
}

function getClientCoordinates(event: MouseEvent | TouchEvent): Point2D | null {
  if ('clientX' in event && 'clientY' in event) {
    return { x: event.clientX, y: event.clientY };
  }

  if ('touches' in event && event.touches.length > 0) {
    return {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }

  if ('changedTouches' in event && event.changedTouches.length > 0) {
    return {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY,
    };
  }

  return null;
}

function mapScenePointToScreen(canvas: FabricCanvas, point: Point2D): Point2D {
  const viewportTransform = canvas.viewportTransform ?? [1, 0, 0, 1, 0, 0];
  const transformed = util.transformPoint(point, viewportTransform);
  return { x: transformed.x, y: transformed.y };
}

const withGridExcludedFromExport = <T,>(canvas: FabricCanvas, exporter: () => T): T => {
  const gridObjects = canvas.getObjects().filter((obj) => isGridObject(obj as FabricObject));
  if (gridObjects.length === 0) {
    return exporter();
  }

  const previousExcludeFlags = new Map<FabricObject, boolean | undefined>();
  gridObjects.forEach((obj) => {
    previousExcludeFlags.set(obj as FabricObject, (obj as FabricObject).excludeFromExport);
    obj.set('excludeFromExport', true);
  });

  try {
    return exporter();
  } finally {
    gridObjects.forEach((obj) => {
      obj.set('excludeFromExport', previousExcludeFlags.get(obj as FabricObject));
    });
  }
};

// ============================================================================
// Component
// ============================================================================

export const Canvas = forwardRef<CanvasRef, CanvasProps>(
  (
    {
      width = 800,
      height = 600,
      backgroundColor = '#ffffff',
      onSelectionChange,
      onObjectModified,
      onMouseMove,
      onReady,
      className = '',
    },
    ref
  ) => {
    // Refs
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricRef = useRef<FabricCanvas | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const connectorManagerRef = useRef<ConnectorManager | null>(null);
    const drawingStateRef = useRef<DrawingState>({
      isDrawing: false,
      startX: 0,
      startY: 0,
      tempObject: null,
      connectorSource: null,
    });
    const eraserToolRef = useRef(new EraserTool({ initialSize: 24, minSize: 4, maxSize: 256, step: 2 }));
    const scissorsToolRef = useRef(new ScissorsTool({ hitThreshold: 8 }));
    const measureToolRef = useRef(new MeasureTool());
    const eraserObjectCountAtDownRef = useRef<number | null>(null);

    // Pen tool state
    const [penToolActive, setPenToolActive] = useState(false);
    const [pointEditingPath, setPointEditingPath] = useState<FabricPath | null>(null);
    const [measurementOverlay, setMeasurementOverlay] = useState<Measurement | null>(null);
    const [measureDismissArmed, setMeasureDismissArmed] = useState(false);
    const [eraserCursor, setEraserCursor] = useState({
      visible: false,
      x: 0,
      y: 0,
      size: eraserToolRef.current.getSize(),
    });
    const [eyedropperPreview, setEyedropperPreview] = useState({
      visible: false,
      x: 0,
      y: 0,
      color: '#ffffff',
    });
    const previousSelectionRef = useRef<FabricObject[] | null>(null);
    const toast = useToast();

    // Store hooks
    const setCanvas = useEditorStore((state) => state.setCanvas);
    const setActiveTool = useEditorStore((state) => state.setActiveTool);
    const setLastSampledColor = useEditorStore((state) => state.setLastSampledColor);
    const setPan = useEditorStore((state) => state.setPan);
    const setGuideSnapIndicator = useEditorStore((state) => state.setGuideSnapIndicator);
    const showGuides = useEditorStore((state) => state.showGuides);
    const guides = useEditorStore((state) => state.guides);
    const pushHistory = useEditorStore((state) => state.pushHistory);
    const activeTool = useActiveTool();
    const { zoom } = useViewport();
    const { gridVisible, gridSize, snapToGrid } = useGridState();
    const { polygonSides, starPoints } = useShapeToolSettings();

    const serializeCanvasState = useCallback((canvas: FabricCanvas): string => {
      const state = filterGridFromSerializedState(canvas.toJSON() as SerializedCanvasState);
      return JSON.stringify(state);
    }, []);

    const setCanvasDrawingFlag = useCallback((isDrawing: boolean) => {
      drawingStateRef.current.isDrawing = isDrawing;
      const canvas = fabricRef.current as DrawingFlagCanvas | null;
      if (canvas) {
        canvas._isDrawing = isDrawing;
      }
    }, []);

    const exitPointEditingMode = useCallback(() => {
      const canvas = fabricRef.current;
      setPointEditingPath(null);
      if (canvas) {
        canvas.discardActiveObject();
        canvas.requestRenderAll();
      }
    }, []);

    const sampleColorAtPointer = useCallback(
      (canvas: FabricCanvas, pointer: Point2D, event: MouseEvent | TouchEvent): string => {
        const target = canvas.findTarget(event);
        if (target && !isGridObject(target as FabricObject)) {
          const sampledObjectColor = sampleObjectFillColor(target as FabricObject, pointer);
          if (sampledObjectColor) {
            return sampledObjectColor;
          }
        }

        return sampleCanvasBackgroundColor(
          canvas.backgroundColor,
          pointer,
          {
            width: canvas.getWidth(),
            height: canvas.getHeight(),
          },
          '#ffffff'
        );
      },
      []
    );

    // ========================================================================
    // Canvas Initialization
    // ========================================================================

    useEffect(() => {
      if (!canvasRef.current) return;

      // Initialize Fabric.js canvas
      const canvas = new FabricCanvas(canvasRef.current, {
        width,
        height,
        backgroundColor,
        selection: true,
        preserveObjectStacking: true,
        renderOnAddRemove: true,
        stopContextMenu: true,
        fireRightClick: true,
      });

      fabricRef.current = canvas;
      (canvas as DrawingFlagCanvas)._isDrawing = false;
      setCanvas(canvas);

      // Initialize ConnectorManager
      connectorManagerRef.current = new ConnectorManager(canvas);
      connectorManagerRef.current.startListening();

      // Save initial state
      pushHistory(serializeCanvasState(canvas));

      // Notify parent that canvas is ready
      if (onReady) {
        onReady(canvas);
      }

      // Cleanup
      return () => {
        connectorManagerRef.current?.stopListening();
        connectorManagerRef.current = null;
        canvas.dispose();
        fabricRef.current = null;
        setCanvas(null);
      };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ========================================================================
    // Event Handlers Setup
    // ========================================================================

    useEffect(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      // Selection events
      const handleSelectionCreated = (e: { selected?: FabricObject[] }) => {
        if (onSelectionChange && e.selected) {
          onSelectionChange(e.selected);
        }
      };

      const handleSelectionUpdated = (e: { selected?: FabricObject[] }) => {
        if (onSelectionChange && e.selected) {
          onSelectionChange(e.selected);
        }
      };

      const handleSelectionCleared = () => {
        if (onSelectionChange) {
          onSelectionChange([]);
        }
      };

      // Object modification
      const handleObjectModified = (e: { target?: FabricObject }) => {
        if (!shouldPushHistoryForEvent('object:modified', (canvas as DrawingFlagCanvas)._isDrawing === true)) {
          return;
        }

        if (e.target) {
          // Save state for undo
          pushHistory(serializeCanvasState(canvas));
          if (onObjectModified) {
            onObjectModified(e.target);
          }
        }
      };

      // Mouse events
      const handleMouseMove = (e: { e: MouseEvent | TouchEvent; pointer?: { x: number; y: number } }) => {
        if (onMouseMove && e.pointer) {
          onMouseMove({ x: Math.round(e.pointer.x), y: Math.round(e.pointer.y) });
        }
      };

      // Register events
      canvas.on('selection:created', handleSelectionCreated);
      canvas.on('selection:updated', handleSelectionUpdated);
      canvas.on('selection:cleared', handleSelectionCleared);
      canvas.on('object:modified', handleObjectModified);
      canvas.on('mouse:move', handleMouseMove);

      // Cleanup
      return () => {
        canvas.off('selection:created', handleSelectionCreated);
        canvas.off('selection:updated', handleSelectionUpdated);
        canvas.off('selection:cleared', handleSelectionCleared);
        canvas.off('object:modified', handleObjectModified);
        canvas.off('mouse:move', handleMouseMove);
      };
    }, [onSelectionChange, onObjectModified, onMouseMove, pushHistory, serializeCanvasState]);

    // ========================================================================
    // Tool-specific Behavior
    // ========================================================================

    useEffect(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      if (activeTool !== ToolType.DIRECT_SELECT) {
        setPointEditingPath(null);
      }

      if (activeTool !== ToolType.MEASURE) {
        setMeasurementOverlay(null);
        setMeasureDismissArmed(false);
      }

      if (activeTool !== ToolType.ERASER) {
        setEraserCursor((previous) => ({ ...previous, visible: false }));
      }

      if (activeTool === ToolType.ERASER) {
        eraserToolRef.current.activate(canvas);
      } else {
        eraserToolRef.current.deactivate(canvas);
      }

      if (activeTool === ToolType.SCISSORS) {
        scissorsToolRef.current.activate(canvas);
      } else {
        scissorsToolRef.current.deactivate(canvas);
      }

      if (activeTool === ToolType.MEASURE) {
        measureToolRef.current.activate(canvas);
      } else {
        measureToolRef.current.deactivate(canvas);
      }

      // Configure canvas based on active tool
      if (activeTool === ToolType.SELECT) {
        canvas.selection = true;
        canvas.defaultCursor = 'default';
        canvas.hoverCursor = 'move';
        canvas.forEachObject((obj) => {
          obj.selectable = true;
          obj.evented = true;
        });
        setPenToolActive(false);
        setEyedropperPreview((prev) => ({ ...prev, visible: false }));
      } else if (activeTool === ToolType.ERASER) {
        canvas.selection = false;
        canvas.defaultCursor = 'none';
        canvas.hoverCursor = 'none';
        canvas.forEachObject((obj) => {
          obj.selectable = false;
          obj.evented = true;
        });
        setPenToolActive(false);
        setEyedropperPreview((prev) => ({ ...prev, visible: false }));
      } else if (activeTool === ToolType.SCISSORS) {
        canvas.selection = false;
        canvas.defaultCursor = 'crosshair';
        canvas.hoverCursor = 'crosshair';
        canvas.forEachObject((obj) => {
          obj.selectable = false;
          obj.evented = true;
        });
        setPenToolActive(false);
        setEyedropperPreview((prev) => ({ ...prev, visible: false }));
      } else if (activeTool === ToolType.MEASURE) {
        canvas.selection = false;
        canvas.defaultCursor = 'crosshair';
        canvas.hoverCursor = 'crosshair';
        canvas.forEachObject((obj) => {
          obj.selectable = false;
          obj.evented = false;
        });
        setPenToolActive(false);
        setEyedropperPreview((prev) => ({ ...prev, visible: false }));
      } else if (activeTool === ToolType.HAND) {
        canvas.selection = false;
        canvas.defaultCursor = 'grab';
        canvas.hoverCursor = 'grab';
        canvas.forEachObject((obj) => {
          obj.selectable = false;
          obj.evented = false;
        });
        setPenToolActive(false);
        setEyedropperPreview((prev) => ({ ...prev, visible: false }));
      } else if (activeTool === ToolType.TEXT) {
        canvas.selection = false;
        canvas.defaultCursor = 'text';
        canvas.hoverCursor = 'text';
        setPenToolActive(false);
        setEyedropperPreview((prev) => ({ ...prev, visible: false }));
      } else if (activeTool === ToolType.EYEDROPPER) {
        previousSelectionRef.current = getSelectionTargets(canvas.getActiveObject() as FabricObject | null);
        canvas.discardActiveObject();
        canvas.selection = false;
        canvas.defaultCursor = 'crosshair';
        canvas.hoverCursor = 'crosshair';
        canvas.forEachObject((obj) => {
          obj.selectable = false;
          obj.evented = true;
        });
        setPenToolActive(false);
      } else if (activeTool === ToolType.PEN) {
        // Pen tool - use Paper.js overlay
        canvas.selection = false;
        canvas.defaultCursor = 'crosshair';
        canvas.hoverCursor = 'crosshair';
        canvas.forEachObject((obj) => {
          obj.selectable = false;
          obj.evented = false;
        });
        setPenToolActive(true);
        setEyedropperPreview((prev) => ({ ...prev, visible: false }));
      } else if (activeTool === ToolType.DIRECT_SELECT) {
        canvas.selection = false;
        canvas.defaultCursor = 'default';
        canvas.hoverCursor = 'default';
        canvas.forEachObject((obj) => {
          obj.selectable = false;
          obj.evented = true;
        });
        setPenToolActive(false);
        setEyedropperPreview((prev) => ({ ...prev, visible: false }));
      } else if (activeTool === ToolType.POLYGON || activeTool === ToolType.STAR) {
        canvas.selection = false;
        canvas.defaultCursor = 'crosshair';
        canvas.hoverCursor = 'crosshair';
        canvas.forEachObject((obj) => {
          obj.selectable = false;
          obj.evented = false;
        });
        setPenToolActive(false);
        setEyedropperPreview((prev) => ({ ...prev, visible: false }));
      } else {
        // Drawing tools (shapes)
        canvas.selection = false;
        canvas.defaultCursor = 'crosshair';
        canvas.hoverCursor = 'crosshair';
        canvas.forEachObject((obj) => {
          obj.selectable = false;
          obj.evented = false;
        });
        setPenToolActive(false);
        setEyedropperPreview((prev) => ({ ...prev, visible: false }));
      }

      canvas.renderAll();
    }, [activeTool]);

    useEffect(() => {
      if (activeTool !== ToolType.ERASER) {
        return;
      }

      const handleEraserSizeKeys = (event: KeyboardEvent) => {
        const target = event.target as HTMLElement | null;
        if (
          target &&
          (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
        ) {
          return;
        }

        if (event.key === '[') {
          const nextSize = eraserToolRef.current.decreaseSize();
          setEraserCursor((previous) => ({ ...previous, size: nextSize }));
          event.preventDefault();
        } else if (event.key === ']') {
          const nextSize = eraserToolRef.current.increaseSize();
          setEraserCursor((previous) => ({ ...previous, size: nextSize }));
          event.preventDefault();
        }
      };

      window.addEventListener('keydown', handleEraserSizeKeys);
      return () => window.removeEventListener('keydown', handleEraserSizeKeys);
    }, [activeTool]);

    // ========================================================================
    // Drawing Tool Handlers
    // ========================================================================

    const handleMouseDown = useCallback(
      (e: { e: MouseEvent | TouchEvent; pointer?: { x: number; y: number } }) => {
        const canvas = fabricRef.current;
        if (!canvas || !e.pointer) return;

        const pointer = e.pointer;
        const state = drawingStateRef.current;

        // Handle hand tool panning
        if (activeTool === ToolType.HAND) {
          setCanvasDrawingFlag(true);
          const mouseEvent = e.e as MouseEvent;
          state.startX = mouseEvent.clientX;
          state.startY = mouseEvent.clientY;
          canvas.defaultCursor = 'grabbing';
          return;
        }

        if (activeTool === ToolType.ERASER) {
          eraserObjectCountAtDownRef.current = canvas.getObjects().length;
          eraserToolRef.current.onMouseDown({
            e: e.e as MouseEvent,
            target: canvas.findTarget(e.e),
            pointer,
          });

          const client = getClientCoordinates(e.e);
          if (client) {
            setEraserCursor({
              visible: true,
              x: client.x,
              y: client.y,
              size: eraserToolRef.current.getSize(),
            });
          }
          return;
        }

        if (activeTool === ToolType.SCISSORS) {
          const objectCountBefore = canvas.getObjects().length;
          scissorsToolRef.current.onMouseDown({
            e: e.e as MouseEvent,
            target: canvas.findTarget(e.e),
            pointer,
          });

          if (canvas.getObjects().length !== objectCountBefore) {
            pushHistory(serializeCanvasState(canvas));
          }
          return;
        }

        if (activeTool === ToolType.MEASURE) {
          if (measureDismissArmed && measurementOverlay) {
            measureToolRef.current.clear();
            setMeasurementOverlay(null);
            setMeasureDismissArmed(false);
            return;
          }

          setCanvasDrawingFlag(true);
          measureToolRef.current.onMouseDown({
            e: e.e as MouseEvent,
            pointer,
            target: canvas.findTarget(e.e),
          });
          setMeasurementOverlay(measureToolRef.current.getMeasurement());
          return;
        }

        if (activeTool === ToolType.DIRECT_SELECT) {
          const target = canvas.findTarget(e.e);
          if (target instanceof FabricPath) {
            setPointEditingPath(target);
            canvas.setActiveObject(target);
            canvas.requestRenderAll();
          }
          return;
        }

        if (activeTool === ToolType.EYEDROPPER) {
          const sampledColor = sampleColorAtPointer(canvas, pointer, e.e);
          setLastSampledColor(sampledColor);

          const previousSelection = previousSelectionRef.current ?? [];
          if (previousSelection.length > 0) {
            const canvasObjects = new Set(canvas.getObjects());
            previousSelection.forEach((obj) => {
              if (canvasObjects.has(obj)) {
                obj.set('fill', sampledColor);
              }
            });
            canvas.requestRenderAll();
            pushHistory(serializeCanvasState(canvas));
          }

          toast.info(`Color sampled: ${sampledColor.toUpperCase()}`);
          previousSelectionRef.current = null;
          setEyedropperPreview((prev) => ({ ...prev, visible: false, color: sampledColor }));
          setActiveTool(ToolType.SELECT);
          return;
        }

        // Handle text tool
        if (activeTool === ToolType.TEXT) {
          const text = new Textbox('Type here', {
            left: pointer.x,
            top: pointer.y,
            width: 200,
            fontFamily: 'Arial',
            fontSize: 16,
            fill: '#333333',
            lineHeight: 1.16,
            charSpacing: 0,
          });
          canvas.add(text);
          canvas.setActiveObject(text);
          text.enterEditing();
          text.selectAll();
          canvas.renderAll();
          pushHistory(serializeCanvasState(canvas));
          return;
        }

        // Handle connector tool
        if (activeTool === ToolType.CONNECTOR) {
          // Find the object under the cursor
          const target = canvas.findTarget(e.e);
          if (target && target.get('data-type') !== 'connector') {
            const sourceId = ensureObjectId(target);
            // Store source object ID in drawing state
            setCanvasDrawingFlag(true);
            state.connectorSource = sourceId;

            // Get source object center point
            const sourceCenter = target.getCenterPoint();

            // Show a visual indicator line from source center to cursor
            state.tempObject = new Line(
              [sourceCenter.x, sourceCenter.y, sourceCenter.x, sourceCenter.y],
              {
                stroke: '#6366f1',
                strokeWidth: 2,
                strokeDashArray: [6, 4],
                selectable: false,
                evented: false,
              }
            );
            canvas.add(state.tempObject);
            canvas.renderAll();
          }
          return;
        }

        // Handle shape drawing
        if (
          activeTool === ToolType.RECTANGLE ||
          activeTool === ToolType.ELLIPSE ||
          activeTool === ToolType.LINE ||
          activeTool === ToolType.ARROW ||
          activeTool === ToolType.POLYGON ||
          activeTool === ToolType.STAR
        ) {
          setCanvasDrawingFlag(true);
          state.startX = pointer.x;
          state.startY = pointer.y;

          const commonOptions = {
            left: pointer.x,
            top: pointer.y,
            fill: 'rgba(0, 120, 212, 0.1)',
            stroke: '#0078d4',
            strokeWidth: 2,
            selectable: false,
            evented: false,
          };

          if (activeTool === ToolType.RECTANGLE) {
            state.tempObject = new Rect({
              ...commonOptions,
              width: 0,
              height: 0,
            });
          } else if (activeTool === ToolType.ELLIPSE) {
            state.tempObject = new Ellipse({
              ...commonOptions,
              rx: 0,
              ry: 0,
            });
          } else if (activeTool === ToolType.LINE || activeTool === ToolType.ARROW) {
            state.tempObject = new Line([pointer.x, pointer.y, pointer.x, pointer.y], {
              ...commonOptions,
              fill: undefined,
            });
          } else if (activeTool === ToolType.POLYGON) {
            state.tempObject = new Polygon(generatePolygonPoints(0, 0, 0, polygonSides), {
              ...commonOptions,
              left: pointer.x,
              top: pointer.y,
              originX: 'center',
              originY: 'center',
            });
          } else if (activeTool === ToolType.STAR) {
            state.tempObject = new Polygon(generateStarPoints(0, 0, 0, 0, starPoints), {
              ...commonOptions,
              left: pointer.x,
              top: pointer.y,
              originX: 'center',
              originY: 'center',
            });
          }

          if (state.tempObject) {
            canvas.add(state.tempObject);
            canvas.renderAll();
          }
        }
      },
      [
        activeTool,
        measureDismissArmed,
        measurementOverlay,
        polygonSides,
        pushHistory,
        sampleColorAtPointer,
        serializeCanvasState,
        setActiveTool,
        setCanvasDrawingFlag,
        setLastSampledColor,
        starPoints,
        toast,
      ]
    );

    const handleMouseMove = useCallback(
      (e: { e: MouseEvent | TouchEvent; pointer?: { x: number; y: number } }) => {
        const canvas = fabricRef.current;
        if (!canvas || !e.pointer) return;

        const pointer = e.pointer;
        const state = drawingStateRef.current;

        if (activeTool === ToolType.EYEDROPPER) {
          const sampledColor = sampleColorAtPointer(canvas, pointer, e.e);
          const clientPosition = getClientCoordinates(e.e);

          if (clientPosition) {
            setEyedropperPreview({
              visible: true,
              x: clientPosition.x + 12,
              y: clientPosition.y + 12,
              color: sampledColor,
            });
          }
          return;
        }

        if (activeTool === ToolType.ERASER) {
          eraserToolRef.current.onMouseMove({
            e: e.e as MouseEvent,
            target: canvas.findTarget(e.e),
            pointer,
          });

          const client = getClientCoordinates(e.e);
          if (client) {
            setEraserCursor({
              visible: true,
              x: client.x,
              y: client.y,
              size: eraserToolRef.current.getSize(),
            });
          }
          return;
        }

        if (activeTool === ToolType.MEASURE && measureToolRef.current.isMeasuring()) {
          measureToolRef.current.onMouseMove({
            e: e.e as MouseEvent,
            pointer,
          });
          setMeasurementOverlay(measureToolRef.current.getMeasurement());
          return;
        }

        if (!state.isDrawing) return;

        // Handle connector tool - update temp line
        if (activeTool === ToolType.CONNECTOR && state.connectorSource && state.tempObject) {
          (state.tempObject as Line).set({
            x2: pointer.x,
            y2: pointer.y,
          });
          canvas.renderAll();
          return;
        }

        // Handle hand tool panning
        if (activeTool === ToolType.HAND) {
          const vpt = canvas.viewportTransform;
          if (vpt) {
            const mouseEvent = e.e as MouseEvent;
            const deltaX = mouseEvent.clientX - state.startX;
            const deltaY = mouseEvent.clientY - state.startY;
            const nextPan = {
              x: vpt[4] + deltaX,
              y: vpt[5] + deltaY,
            };
            state.startX = mouseEvent.clientX;
            state.startY = mouseEvent.clientY;
            setPan(nextPan);
          }
          return;
        }

        // Handle shape drawing
        if (state.tempObject) {
          const width = pointer.x - state.startX;
          const height = pointer.y - state.startY;

          if (activeTool === ToolType.RECTANGLE) {
            state.tempObject.set({
              left: width > 0 ? state.startX : pointer.x,
              top: height > 0 ? state.startY : pointer.y,
              width: Math.abs(width),
              height: Math.abs(height),
            });
          } else if (activeTool === ToolType.ELLIPSE) {
            (state.tempObject as Ellipse).set({
              left: width > 0 ? state.startX : pointer.x,
              top: height > 0 ? state.startY : pointer.y,
              rx: Math.abs(width) / 2,
              ry: Math.abs(height) / 2,
            });
          } else if (activeTool === ToolType.LINE || activeTool === ToolType.ARROW) {
            (state.tempObject as Line).set({
              x2: pointer.x,
              y2: pointer.y,
            });
          } else if (
            (activeTool === ToolType.POLYGON || activeTool === ToolType.STAR) &&
            state.tempObject instanceof Polygon
          ) {
            const deltaX = pointer.x - state.startX;
            const deltaY = pointer.y - state.startY;
            const isShiftConstrained = 'shiftKey' in e.e && Boolean((e.e as MouseEvent).shiftKey);
            const radius = isShiftConstrained
              ? Math.max(Math.abs(deltaX), Math.abs(deltaY))
              : Math.hypot(deltaX, deltaY);

            const points = activeTool === ToolType.POLYGON
              ? generatePolygonPoints(0, 0, radius, polygonSides)
              : generateStarPoints(0, 0, radius, radius * 0.5, starPoints);

            state.tempObject.set({
              points,
              left: state.startX,
              top: state.startY,
            });
          }

          canvas.renderAll();
        }
      },
      [activeTool, polygonSides, sampleColorAtPointer, setPan, starPoints]
    );

    const handleMouseOut = useCallback(() => {
      setEyedropperPreview((prev) => ({ ...prev, visible: false }));
      if (activeTool === ToolType.ERASER) {
        setEraserCursor((previous) => ({ ...previous, visible: false }));
      }
    }, [activeTool]);

    const handleMouseUp = useCallback((e?: { e: MouseEvent | TouchEvent }) => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      const state = drawingStateRef.current;

      // Reset hand tool
      if (activeTool === ToolType.HAND) {
        setCanvasDrawingFlag(false);
        canvas.defaultCursor = 'grab';
        return;
      }

      if (activeTool === ToolType.ERASER) {
        eraserToolRef.current.onMouseUp({
          e: (e?.e ?? ({ clientX: 0, clientY: 0 } as unknown as MouseEvent)) as MouseEvent,
        });
        setCanvasDrawingFlag(false);

        const countAtDown = eraserObjectCountAtDownRef.current;
        const countNow = canvas.getObjects().length;
        if (countAtDown !== null && countNow < countAtDown) {
          pushHistory(serializeCanvasState(canvas));
        }
        eraserObjectCountAtDownRef.current = null;
        return;
      }

      if (activeTool === ToolType.MEASURE) {
        measureToolRef.current.onMouseUp({
          e: (e?.e ?? ({ clientX: 0, clientY: 0 } as unknown as MouseEvent)) as MouseEvent,
          pointer: e?.e ? canvas.getPointer(e.e as MouseEvent) : undefined,
        });
        setMeasurementOverlay(measureToolRef.current.getMeasurement());
        setMeasureDismissArmed(true);
        setCanvasDrawingFlag(false);
        return;
      }

      // Finalize connector drawing
      if (activeTool === ToolType.CONNECTOR && state.isDrawing && state.connectorSource) {
        // Remove temp line
        if (state.tempObject) {
          canvas.remove(state.tempObject);
        }

        const pointer = e?.e ? getConnectorPointer(canvas, e.e) : null;
        const targets = pointer
          ? canvas.getObjects().filter((obj: FabricObject) => {
              if (obj.get('data-type') === 'connector' || obj === state.tempObject) {
                return false;
              }
              const bound = obj.getBoundingRect();
              return (
                pointer.x >= bound.left &&
                pointer.x <= bound.left + bound.width &&
                pointer.y >= bound.top &&
                pointer.y <= bound.top + bound.height
              );
            })
          : [];

        // Use the topmost target
        const target = targets[targets.length - 1];

        let connectorCreated = false;
        if (target) {
          const targetId = ensureObjectId(target);

          // Don't connect to self
          if (targetId !== state.connectorSource) {
            connectorManagerRef.current?.addConnector(
              state.connectorSource,
              targetId,
              DEFAULT_CONNECTOR_STYLE
            );
            connectorCreated = true;
          }
        }

        setCanvasDrawingFlag(false);
        state.connectorSource = null;
        state.tempObject = null;
        canvas.renderAll();
        if (connectorCreated) {
          pushHistory(serializeCanvasState(canvas));
        }
        return;
      }

      // Finalize drawing
      if (state.isDrawing && state.tempObject) {
        state.tempObject.set({
          selectable: true,
          evented: true,
        });

        // Handle arrow tool - add arrowhead
        if (activeTool === ToolType.ARROW && state.tempObject instanceof Line) {
          const line = state.tempObject;
          const x1 = line.x1 || 0;
          const y1 = line.y1 || 0;
          const x2 = line.x2 || 0;
          const y2 = line.y2 || 0;

          const angle = Math.atan2(y2 - y1, x2 - x1);
          const headLength = 15;

          const arrowHead = new Triangle({
            left: x2,
            top: y2,
            width: headLength,
            height: headLength,
            fill: '#0078d4',
            angle: (angle * 180) / Math.PI + 90,
            originX: 'center',
            originY: 'center',
          });

          const group = new Group([line, arrowHead], {
            selectable: true,
          });

          canvas.remove(line);
          canvas.add(group);
          canvas.setActiveObject(group);
        } else {
          canvas.setActiveObject(state.tempObject);
        }

        canvas.renderAll();
        pushHistory(serializeCanvasState(canvas));
      }

      setCanvasDrawingFlag(false);
      state.tempObject = null;
    }, [activeTool, pushHistory, serializeCanvasState, setCanvasDrawingFlag]);

    // Register drawing event handlers
    useEffect(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      canvas.on('mouse:down', handleMouseDown);
      canvas.on('mouse:move', handleMouseMove);
      canvas.on('mouse:up', handleMouseUp);
      canvas.on('mouse:out', handleMouseOut);

      return () => {
        canvas.off('mouse:down', handleMouseDown);
        canvas.off('mouse:move', handleMouseMove);
        canvas.off('mouse:up', handleMouseUp);
        canvas.off('mouse:out', handleMouseOut);
      };
    }, [handleMouseDown, handleMouseMove, handleMouseOut, handleMouseUp]);

    useEffect(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      const handleDoubleClick = (event: { target?: FabricObject }) => {
        if (activeTool !== ToolType.DIRECT_SELECT) {
          return;
        }

        if (!event.target) {
          exitPointEditingMode();
        }
      };

      canvas.on('mouse:dblclick', handleDoubleClick);

      return () => {
        canvas.off('mouse:dblclick', handleDoubleClick);
      };
    }, [activeTool, exitPointEditingMode]);

    useEffect(() => {
      const canvas = fabricRef.current;
      if (!canvas || !pointEditingPath) return;

      const objects = canvas.getObjects();
      if (!objects.includes(pointEditingPath)) {
        setPointEditingPath(null);
      }
    }, [pointEditingPath]);

    // ========================================================================
    // Zoom Effect
    // ========================================================================

    useEffect(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      canvas.setZoom(zoom);
      const vpt = canvas.viewportTransform;
      if (vpt) {
        setPan({ x: vpt[4], y: vpt[5] });
      }
      canvas.renderAll();
    }, [setPan, zoom]);

    // ========================================================================
    // Grid Drawing
    // ========================================================================

    useEffect(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      return registerGridOverlay(canvas, {
        enabled: gridVisible,
        gridSize,
      });
    }, [gridVisible, gridSize, width, height]);

    // ========================================================================
    // Snap to Grid
    // ========================================================================

    useEffect(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      const clearIndicator = () => {
        setGuideSnapIndicator({ horizontal: null, vertical: null });
      };

      const handleObjectMoving = (e: { target?: FabricObject }) => {
        if (!e.target) return;

        const obj = e.target;
        let left = obj.left || 0;
        let top = obj.top || 0;
        let snappedHorizontal: number | null = null;
        let snappedVertical: number | null = null;

        if (snapToGrid) {
          left = Math.round(left / gridSize) * gridSize;
          top = Math.round(top / gridSize) * gridSize;
          obj.set({ left, top });
          obj.setCoords();
        }

        if (showGuides) {
          const bounds = obj.getBoundingRect();

          const verticalSnap = snapAxisToGuides({
            position: bounds.left,
            size: bounds.width,
            guides: guides.vertical,
            threshold: 5,
          });

          if (verticalSnap.snappedGuide !== null) {
            left += verticalSnap.snappedPosition - bounds.left;
            obj.set({ left });
            obj.setCoords();
            snappedVertical = verticalSnap.snappedGuide;
          }

          const updatedBounds = obj.getBoundingRect();
          const horizontalSnap = snapAxisToGuides({
            position: updatedBounds.top,
            size: updatedBounds.height,
            guides: guides.horizontal,
            threshold: 5,
          });

          if (horizontalSnap.snappedGuide !== null) {
            top += horizontalSnap.snappedPosition - updatedBounds.top;
            obj.set({ top });
            obj.setCoords();
            snappedHorizontal = horizontalSnap.snappedGuide;
          }
        }

        if (snappedHorizontal !== null || snappedVertical !== null) {
          setGuideSnapIndicator({
            horizontal: snappedHorizontal,
            vertical: snappedVertical,
          });
          return;
        }

        clearIndicator();
      };

      const handleObjectModified = () => {
        clearIndicator();
      };

      const handleMouseUp = () => {
        clearIndicator();
      };

      canvas.on('object:moving', handleObjectMoving);
      canvas.on('object:modified', handleObjectModified);
      canvas.on('mouse:up', handleMouseUp);

      return () => {
        canvas.off('object:moving', handleObjectMoving);
        canvas.off('object:modified', handleObjectModified);
        canvas.off('mouse:up', handleMouseUp);
        clearIndicator();
      };
    }, [
      gridSize,
      guides.horizontal,
      guides.vertical,
      setGuideSnapIndicator,
      showGuides,
      snapToGrid,
    ]);

    // ========================================================================
    // Resize Handler
    // ========================================================================

    useEffect(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      canvas.setDimensions({ width, height });
      canvas.renderAll();
    }, [width, height]);

    useEffect(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      canvas.backgroundColor = backgroundColor;
      canvas.renderAll();
    }, [backgroundColor]);

    // ========================================================================
    // Imperative Handle
    // ========================================================================

    useImperativeHandle(
      ref,
      () => ({
        getCanvas: () => fabricRef.current,
        toSVG: () => {
          const canvas = fabricRef.current;
          return canvas ? withGridExcludedFromExport(canvas, () => canvas.toSVG()) : '';
        },
        toPNG: (multiplier = 2) => {
          const canvas = fabricRef.current;
          return canvas
            ? withGridExcludedFromExport(canvas, () =>
                canvas.toDataURL({
                  format: 'png',
                  multiplier,
                  filter: (obj) => !isGridObject(obj as FabricObject),
                })
              )
            : '';
        },
        toJSON: () => {
          const canvas = fabricRef.current;
          return canvas ? filterGridFromSerializedState(canvas.toJSON() as SerializedCanvasState) : {};
        },
        loadFromJSON: async (json: object | string) => {
          const canvas = fabricRef.current;
          if (!canvas) return;

          const jsonData = typeof json === 'string' ? JSON.parse(json) : json;
          await canvas.loadFromJSON(jsonData);
          removeGridObjects(canvas);
          canvas.renderAll();
        },
        clear: () => {
          const canvas = fabricRef.current;
          if (canvas) {
            canvas.clear();
            canvas.backgroundColor = backgroundColor;
            canvas.renderAll();
          }
        },
        addObject: (object: FabricObject) => {
          const canvas = fabricRef.current;
          if (canvas) {
            canvas.add(object);
            canvas.renderAll();
          }
        },
        removeObject: (object: FabricObject) => {
          const canvas = fabricRef.current;
          if (canvas) {
            canvas.remove(object);
            canvas.renderAll();
          }
        },
        getConnectorManager: () => connectorManagerRef.current,
      }),
      [backgroundColor]
    );

    // ========================================================================
    // Render
    // ========================================================================

    // Handle pen tool path completion
    const handlePenToolPathComplete = useCallback(
      (fabricPath: FabricObject) => {
        // Path has been added to canvas, save history
        const canvas = fabricRef.current;
        if (canvas) {
          pushHistory(serializeCanvasState(canvas));
        }
        if (onObjectModified) {
          onObjectModified(fabricPath);
        }
      },
      [onObjectModified, pushHistory, serializeCanvasState]
    );

    return (
      <div ref={containerRef} className={`canvas-container ${className}`}>
        <div
          className="canvas-wrapper"
          style={getCanvasWrapperStyle(width, height)}
        >
          <canvas ref={canvasRef} id="finnish-canvas" />
          {activeTool === ToolType.MEASURE && measurementOverlay && (() => {
            const canvas = fabricRef.current;
            if (!canvas) return null;

            const start = mapScenePointToScreen(canvas, measurementOverlay.start);
            const end = mapScenePointToScreen(canvas, measurementOverlay.end);
            const midpoint = {
              x: (start.x + end.x) / 2,
              y: (start.y + end.y) / 2,
            };

            return (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  zIndex: 1100,
                }}
              >
                <svg width={width} height={height} style={{ position: 'absolute', inset: 0 }}>
                  <line
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke="#0ea5e9"
                    strokeWidth={1.5}
                    strokeDasharray="4 3"
                  />
                  <circle cx={start.x} cy={start.y} r={3} fill="#0ea5e9" />
                  <circle cx={end.x} cy={end.y} r={3} fill="#0ea5e9" />
                </svg>
                <div
                  style={{
                    position: 'absolute',
                    left: `${midpoint.x + 10}px`,
                    top: `${midpoint.y + 10}px`,
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    color: '#f8fafc',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono, monospace)',
                    borderRadius: '4px',
                    padding: '6px 8px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.35)',
                  }}
                >
                  <div>{measurementOverlay.displayLabel}</div>
                  <div>
                    ΔX: {measurementOverlay.deltaX.toFixed(1)} px | ΔY: {measurementOverlay.deltaY.toFixed(1)} px
                  </div>
                </div>
              </div>
            );
          })()}
          {activeTool === ToolType.EYEDROPPER && eyedropperPreview.visible && (
            <div
              style={{
                position: 'fixed',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 0, 0, 0.45)',
                boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.85)',
                pointerEvents: 'none',
                zIndex: 1200,
                left: `${eyedropperPreview.x}px`,
                top: `${eyedropperPreview.y}px`,
                backgroundColor: eyedropperPreview.color,
              }}
            />
          )}
          {activeTool === ToolType.ERASER && eraserCursor.visible && (
            <div
              style={{
                position: 'fixed',
                width: `${eraserCursor.size}px`,
                height: `${eraserCursor.size}px`,
                borderRadius: '50%',
                border: '1px solid rgba(15, 23, 42, 0.75)',
                backgroundColor: 'rgba(148, 163, 184, 0.18)',
                boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.65)',
                pointerEvents: 'none',
                zIndex: 1200,
                left: `${eraserCursor.x - eraserCursor.size / 2}px`,
                top: `${eraserCursor.y - eraserCursor.size / 2}px`,
              }}
            />
          )}
          <PointEditingOverlay
            fabricCanvas={fabricRef.current}
            pathObject={pointEditingPath}
            isActive={activeTool === ToolType.DIRECT_SELECT && pointEditingPath !== null}
            width={width}
            height={height}
            onExit={exitPointEditingMode}
          />
          {/* Paper.js Pen Tool Overlay */}
          <PenToolOverlay
            fabricCanvas={fabricRef.current}
            isActive={penToolActive}
            strokeColor="#0078d4"
            strokeWidth={2}
            width={width}
            height={height}
            onPathComplete={handlePenToolPathComplete}
          />
        </div>
      </div>
    );
  }
);

Canvas.displayName = 'Canvas';

export default Canvas;
