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
import { Canvas as FabricCanvas, FabricObject, Rect, Ellipse, Line, IText, Triangle, Group } from 'fabric';
import { useEditorStore, useActiveTool, useViewport, useGridState } from '../../store/editorStore';
import { ToolType } from '../../types/index';
import { PenToolOverlay } from './PenToolOverlay';
import './Canvas.css';

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
}

// ============================================================================
// Drawing State
// ============================================================================

interface DrawingState {
  isDrawing: boolean;
  startX: number;
  startY: number;
  tempObject: FabricObject | null;
}

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
    const drawingStateRef = useRef<DrawingState>({
      isDrawing: false,
      startX: 0,
      startY: 0,
      tempObject: null,
    });

    // Pen tool state
    const [penToolActive, setPenToolActive] = useState(false);

    // Store hooks
    const setCanvas = useEditorStore((state) => state.setCanvas);
    const pushHistory = useEditorStore((state) => state.pushHistory);
    const activeTool = useActiveTool();
    const { zoom } = useViewport();
    const { gridVisible, gridSize, snapToGrid } = useGridState();

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
      setCanvas(canvas);

      // Save initial state
      pushHistory(JSON.stringify(canvas.toJSON()));

      // Notify parent that canvas is ready
      if (onReady) {
        onReady(canvas);
      }

      // Cleanup
      return () => {
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
        if (e.target) {
          // Save state for undo
          pushHistory(JSON.stringify(canvas.toJSON()));
          if (onObjectModified) {
            onObjectModified(e.target);
          }
        }
      };

      // Object added/removed
      const handleObjectAdded = () => {
        pushHistory(JSON.stringify(canvas.toJSON()));
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
      canvas.on('object:added', handleObjectAdded);
      canvas.on('mouse:move', handleMouseMove);

      // Cleanup
      return () => {
        canvas.off('selection:created', handleSelectionCreated);
        canvas.off('selection:updated', handleSelectionUpdated);
        canvas.off('selection:cleared', handleSelectionCleared);
        canvas.off('object:modified', handleObjectModified);
        canvas.off('object:added', handleObjectAdded);
        canvas.off('mouse:move', handleMouseMove);
      };
    }, [onSelectionChange, onObjectModified, onMouseMove, pushHistory]);

    // ========================================================================
    // Tool-specific Behavior
    // ========================================================================

    useEffect(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;

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
      } else if (activeTool === ToolType.HAND) {
        canvas.selection = false;
        canvas.defaultCursor = 'grab';
        canvas.hoverCursor = 'grab';
        canvas.forEachObject((obj) => {
          obj.selectable = false;
          obj.evented = false;
        });
        setPenToolActive(false);
      } else if (activeTool === ToolType.TEXT) {
        canvas.selection = false;
        canvas.defaultCursor = 'text';
        canvas.hoverCursor = 'text';
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
      }

      canvas.renderAll();
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
          state.isDrawing = true;
          const mouseEvent = e.e as MouseEvent;
          state.startX = mouseEvent.clientX;
          state.startY = mouseEvent.clientY;
          canvas.defaultCursor = 'grabbing';
          return;
        }

        // Handle text tool
        if (activeTool === ToolType.TEXT) {
          const text = new IText('Double-click to edit', {
            left: pointer.x,
            top: pointer.y,
            fontFamily: 'Arial',
            fontSize: 16,
            fill: '#333333',
          });
          canvas.add(text);
          canvas.setActiveObject(text);
          text.enterEditing();
          text.selectAll();
          canvas.renderAll();
          return;
        }

        // Handle shape drawing
        if (
          activeTool === ToolType.RECTANGLE ||
          activeTool === ToolType.ELLIPSE ||
          activeTool === ToolType.LINE ||
          activeTool === ToolType.ARROW
        ) {
          state.isDrawing = true;
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
          }

          if (state.tempObject) {
            canvas.add(state.tempObject);
            canvas.renderAll();
          }
        }
      },
      [activeTool]
    );

    const handleMouseMove = useCallback(
      (e: { e: MouseEvent | TouchEvent; pointer?: { x: number; y: number } }) => {
        const canvas = fabricRef.current;
        if (!canvas || !e.pointer) return;

        const pointer = e.pointer;
        const state = drawingStateRef.current;

        if (!state.isDrawing) return;

        // Handle hand tool panning
        if (activeTool === ToolType.HAND) {
          const vpt = canvas.viewportTransform;
          if (vpt) {
            const mouseEvent = e.e as MouseEvent;
            vpt[4] += mouseEvent.clientX - state.startX;
            vpt[5] += mouseEvent.clientY - state.startY;
            state.startX = mouseEvent.clientX;
            state.startY = mouseEvent.clientY;
            canvas.setViewportTransform(vpt);
            canvas.requestRenderAll();
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
          }

          canvas.renderAll();
        }
      },
      [activeTool]
    );

    const handleMouseUp = useCallback(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      const state = drawingStateRef.current;

      // Reset hand tool
      if (activeTool === ToolType.HAND) {
        state.isDrawing = false;
        canvas.defaultCursor = 'grab';
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
        pushHistory(JSON.stringify(canvas.toJSON()));
      }

      state.isDrawing = false;
      state.tempObject = null;
    }, [activeTool, pushHistory]);

    // Register drawing event handlers
    useEffect(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      canvas.on('mouse:down', handleMouseDown);
      canvas.on('mouse:move', handleMouseMove);
      canvas.on('mouse:up', handleMouseUp);

      return () => {
        canvas.off('mouse:down', handleMouseDown);
        canvas.off('mouse:move', handleMouseMove);
        canvas.off('mouse:up', handleMouseUp);
      };
    }, [handleMouseDown, handleMouseMove, handleMouseUp]);

    // ========================================================================
    // Zoom Effect
    // ========================================================================

    useEffect(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      canvas.setZoom(zoom);
      canvas.renderAll();
    }, [zoom]);

    // ========================================================================
    // Grid Drawing
    // ========================================================================

    useEffect(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      // Remove existing grid
      const existingGrid = canvas.getObjects().filter((obj) => (obj as FabricObject & { isGrid?: boolean }).isGrid);
      existingGrid.forEach((obj) => canvas.remove(obj));

      if (gridVisible) {
        // Draw grid lines
        const gridColor = 'rgba(200, 200, 200, 0.3)';

        for (let i = 0; i <= width / gridSize; i++) {
          const line = new Line([i * gridSize, 0, i * gridSize, height], {
            stroke: gridColor,
            strokeWidth: 1,
            selectable: false,
            evented: false,
          });
          (line as unknown as FabricObject & { isGrid: boolean }).isGrid = true;
          canvas.add(line);
          canvas.sendObjectToBack(line);
        }

        for (let i = 0; i <= height / gridSize; i++) {
          const line = new Line([0, i * gridSize, width, i * gridSize], {
            stroke: gridColor,
            strokeWidth: 1,
            selectable: false,
            evented: false,
          });
          (line as unknown as FabricObject & { isGrid: boolean }).isGrid = true;
          canvas.add(line);
          canvas.sendObjectToBack(line);
        }
      }

      canvas.renderAll();
    }, [gridVisible, gridSize, width, height]);

    // ========================================================================
    // Snap to Grid
    // ========================================================================

    useEffect(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      const handleObjectMoving = (e: { target?: FabricObject }) => {
        if (!snapToGrid || !e.target) return;

        const obj = e.target;
        const left = Math.round((obj.left || 0) / gridSize) * gridSize;
        const top = Math.round((obj.top || 0) / gridSize) * gridSize;
        obj.set({ left, top });
      };

      canvas.on('object:moving', handleObjectMoving);

      return () => {
        canvas.off('object:moving', handleObjectMoving);
      };
    }, [snapToGrid, gridSize]);

    // ========================================================================
    // Resize Handler
    // ========================================================================

    useEffect(() => {
      const canvas = fabricRef.current;
      if (!canvas) return;

      canvas.setDimensions({ width, height });
      canvas.renderAll();
    }, [width, height]);

    // ========================================================================
    // Imperative Handle
    // ========================================================================

    useImperativeHandle(
      ref,
      () => ({
        getCanvas: () => fabricRef.current,
        toSVG: () => {
          const canvas = fabricRef.current;
          return canvas ? canvas.toSVG() : '';
        },
        toPNG: (multiplier = 2) => {
          const canvas = fabricRef.current;
          return canvas
            ? canvas.toDataURL({
                format: 'png',
                multiplier,
              })
            : '';
        },
        toJSON: () => {
          const canvas = fabricRef.current;
          return canvas ? canvas.toJSON() : {};
        },
        loadFromJSON: async (json: object | string) => {
          const canvas = fabricRef.current;
          if (!canvas) return;

          const jsonData = typeof json === 'string' ? JSON.parse(json) : json;
          await canvas.loadFromJSON(jsonData);
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
          pushHistory(JSON.stringify(canvas.toJSON()));
        }
        if (onObjectModified) {
          onObjectModified(fabricPath);
        }
      },
      [pushHistory, onObjectModified]
    );

    return (
      <div ref={containerRef} className={`canvas-container ${className}`}>
        <div
          className="canvas-wrapper"
          style={{
            width,
            height,
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
            position: 'relative',
          }}
        >
          <canvas ref={canvasRef} id="finnish-canvas" />
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
