/**
 * useIllustratorTools Hook
 *
 * Unified hook for integrating professional illustration tools:
 * - Pen Tool (Paper.js Bezier curves) -> converts to Fabric.js paths
 * - Brush Tool (perfect-freehand) -> converts to Fabric.js paths
 * - Hand-drawn styles (Rough.js) -> applies to Fabric.js objects
 *
 * @module hooks/useIllustratorTools
 */

import { useRef, useCallback, useEffect, useState } from 'react';
import paper from 'paper';
import { Canvas as FabricCanvas, Path as FabricPath, FabricObject, loadSVGFromString, util } from 'fabric';
import { PenTool } from '../lib/paper/PenTool';
import { getStrokePath, strokePresets, InputPoint } from '../lib/freehand/index';
import {
  convertToHandDrawn,
  StylePreset,
} from '../lib/rough/index';
import type { HandDrawnSettings } from '../components/StylePanel';
import type { IllustratorTool } from '../components/IllustratorToolbar';

// ============================================================================
// Types
// ============================================================================

export interface UseIllustratorToolsOptions {
  canvas: FabricCanvas | null;
  activeTool: IllustratorTool;
  strokeColor?: string;
  strokeWidth?: number;
  fillColor?: string | null;
  handDrawnSettings?: HandDrawnSettings;
  onPathComplete?: (path: FabricPath) => void;
  /** External Paper.js canvas ref for pen tool overlay */
  paperCanvasRef?: React.RefObject<HTMLCanvasElement | null>;
}

export interface UseIllustratorToolsReturn {
  // Pen tool state
  isPenToolActive: boolean;
  isPenToolDrawing: boolean;
  activatePenTool: () => void;
  deactivatePenTool: () => void;

  // Brush tool state
  isBrushToolActive: boolean;
  isBrushToolDrawing: boolean;

  // Hand-drawn style
  applyHandDrawnStyle: (object: FabricObject) => Promise<FabricObject | null>;
  applyHandDrawnToSelection: () => Promise<void>;

  // Paper.js canvas ref (for overlay)
  paperCanvasRef: React.RefObject<HTMLCanvasElement | null>;

  // Internal refs for cleanup
  cleanup: () => void;
}

// ============================================================================
// Hook Implementation
// ============================================================================

export function useIllustratorTools(options: UseIllustratorToolsOptions): UseIllustratorToolsReturn {
  const {
    canvas,
    activeTool,
    strokeColor = '#000000',
    strokeWidth = 2,
    fillColor = null,
    handDrawnSettings,
    onPathComplete,
    paperCanvasRef: externalPaperCanvasRef,
  } = options;

  // Refs - use external ref if provided, otherwise create internal one
  const internalPaperCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const paperCanvasRef = externalPaperCanvasRef || internalPaperCanvasRef;
  const paperScopeRef = useRef<paper.PaperScope | null>(null);
  const penToolRef = useRef<PenTool | null>(null);
  const brushPointsRef = useRef<InputPoint[]>([]);
  const isBrushDrawingRef = useRef(false);

  // State
  const [isPenToolDrawing, setIsPenToolDrawing] = useState(false);
  const [isBrushToolDrawing, setIsBrushToolDrawing] = useState(false);

  // Derived state
  const isPenToolActive = activeTool === 'pen';
  const isBrushToolActive = activeTool === 'brush';

  // ========================================================================
  // Paper.js -> Fabric.js Conversion
  // ========================================================================

  const convertPaperPathToFabric = useCallback(
    (paperPath: paper.Path): FabricPath | null => {
      if (!canvas) return null;

      const pathData = paperPath.pathData;
      const pathStroke = paperPath.strokeColor?.toCSS(true) || strokeColor;
      const pathFill = paperPath.fillColor?.toCSS(true) || fillColor || 'transparent';

      try {
        const fabricPath = new FabricPath(pathData, {
          stroke: pathStroke,
          strokeWidth: paperPath.strokeWidth || strokeWidth,
          fill: pathFill,
          strokeLineCap: 'round',
          strokeLineJoin: 'round',
          selectable: true,
          evented: true,
        });

        return fabricPath;
      } catch (error) {
        console.error('Failed to convert Paper.js path to Fabric.js:', error);
        return null;
      }
    },
    [canvas, strokeColor, strokeWidth, fillColor]
  );

  // ========================================================================
  // Pen Tool Setup
  // ========================================================================

  const initializePenTool = useCallback(() => {
    const paperCanvas = paperCanvasRef.current;
    if (!paperCanvas || !canvas) return;

    // Create Paper.js scope
    const scope = new paper.PaperScope();
    scope.setup(paperCanvas);
    paperScopeRef.current = scope;

    // Resize Paper.js canvas to match Fabric.js canvas
    const fabricCanvasEl = canvas.getElement();
    if (fabricCanvasEl) {
      paperCanvas.width = fabricCanvasEl.width;
      paperCanvas.height = fabricCanvasEl.height;
      scope.view.viewSize = new paper.Size(fabricCanvasEl.width, fabricCanvasEl.height);
    }

    // Create pen tool
    const penTool = new PenTool(scope, {
      strokeColor,
      strokeWidth,
      fillColor,
      smoothing: false,
      onPathComplete: (path, _svgData) => {
        // Convert Paper.js path to Fabric.js
        const fabricPath = convertPaperPathToFabric(path);
        if (fabricPath && canvas) {
          canvas.add(fabricPath);
          canvas.setActiveObject(fabricPath);
          canvas.renderAll();
          onPathComplete?.(fabricPath);
        }

        // Clear Paper.js canvas
        scope.project.activeLayer.removeChildren();
        setIsPenToolDrawing(false);
      },
      onPathUpdate: () => {
        setIsPenToolDrawing(true);
      },
    });

    penToolRef.current = penTool;
  }, [canvas, strokeColor, strokeWidth, fillColor, convertPaperPathToFabric, onPathComplete]);

  const activatePenTool = useCallback(() => {
    if (!penToolRef.current) {
      initializePenTool();
    }
    penToolRef.current?.activate();
  }, [initializePenTool]);

  const deactivatePenTool = useCallback(() => {
    penToolRef.current?.deactivate();
    setIsPenToolDrawing(false);
  }, []);

  // ========================================================================
  // Brush Tool (perfect-freehand)
  // ========================================================================

  const startBrushStroke = useCallback(
    (x: number, y: number, pressure?: number) => {
      if (!canvas || !isBrushToolActive) return;

      brushPointsRef.current = [{ x, y, pressure: pressure ?? 0.5 }];
      isBrushDrawingRef.current = true;
      setIsBrushToolDrawing(true);
    },
    [canvas, isBrushToolActive]
  );

  const continueBrushStroke = useCallback(
    (x: number, y: number, pressure?: number) => {
      if (!isBrushDrawingRef.current) return;

      brushPointsRef.current.push({ x, y, pressure: pressure ?? 0.5 });

      // Render preview (could be optimized with a temporary canvas)
      // For now, we'll render on mouse up
    },
    []
  );

  const finishBrushStroke = useCallback(() => {
    if (!canvas || !isBrushDrawingRef.current) return;

    const points = brushPointsRef.current;
    if (points.length < 2) {
      brushPointsRef.current = [];
      isBrushDrawingRef.current = false;
      setIsBrushToolDrawing(false);
      return;
    }

    // Generate stroke path using perfect-freehand
    const pathData = getStrokePath(points, {
      ...strokePresets.pen,
      size: strokeWidth * 2,
    });

    if (pathData) {
      try {
        const fabricPath = new FabricPath(pathData, {
          stroke: 'none',
          fill: strokeColor,
          strokeLineCap: 'round',
          strokeLineJoin: 'round',
          selectable: true,
          evented: true,
        });

        canvas.add(fabricPath);
        canvas.setActiveObject(fabricPath);
        canvas.renderAll();
        onPathComplete?.(fabricPath);
      } catch (error) {
        console.error('Failed to create brush stroke:', error);
      }
    }

    brushPointsRef.current = [];
    isBrushDrawingRef.current = false;
    setIsBrushToolDrawing(false);
  }, [canvas, strokeColor, strokeWidth, onPathComplete]);

  // ========================================================================
  // Brush Tool Event Handlers
  // ========================================================================

  useEffect(() => {
    if (!canvas || !isBrushToolActive) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMouseDown = (e: any) => {
      if (e.pointer) {
        startBrushStroke(e.pointer.x, e.pointer.y);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMouseMove = (e: any) => {
      if (e.pointer) {
        continueBrushStroke(e.pointer.x, e.pointer.y);
      }
    };

    const handleMouseUp = () => {
      finishBrushStroke();
    };

    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:move', handleMouseMove);
    canvas.on('mouse:up', handleMouseUp);

    // Configure canvas for brush mode
    canvas.selection = false;
    canvas.defaultCursor = 'crosshair';
    canvas.forEachObject((obj) => {
      obj.selectable = false;
      obj.evented = false;
    });

    return () => {
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('mouse:move', handleMouseMove);
      canvas.off('mouse:up', handleMouseUp);

      // Restore canvas settings
      canvas.selection = true;
      canvas.defaultCursor = 'default';
      canvas.forEachObject((obj) => {
        obj.selectable = true;
        obj.evented = true;
      });
    };
  }, [canvas, isBrushToolActive, startBrushStroke, continueBrushStroke, finishBrushStroke]);

  // ========================================================================
  // Hand-drawn Style (Rough.js)
  // ========================================================================

  const applyHandDrawnStyle = useCallback(
    async (object: FabricObject): Promise<FabricObject | null> => {
      if (!canvas || !handDrawnSettings?.enabled) return null;

      // Get object bounds for positioning
      const bounds = object.getBoundingRect();
      const left = object.left || 0;
      const top = object.top || 0;

      // Get object's SVG representation
      const svg = object.toSVG();
      if (!svg) return null;

      // Create temporary SVG element with proper dimensions
      const parser = new DOMParser();
      const svgWidth = bounds.width + 20;
      const svgHeight = bounds.height + 20;
      const doc = parser.parseFromString(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">${svg}</svg>`,
        'image/svg+xml'
      );
      const svgElement = doc.documentElement as unknown as SVGSVGElement;

      // Apply hand-drawn style using Rough.js
      const roughSvg = convertToHandDrawn(svgElement, {
        preset: getPresetFromSettings(handDrawnSettings),
        customOptions: {
          roughness: handDrawnSettings.roughness,
          bowing: handDrawnSettings.bowing,
          strokeWidth: handDrawnSettings.strokeWidth,
          fillStyle: handDrawnSettings.fillStyle as any,
        },
      });

      // Serialize back to string
      const serializer = new XMLSerializer();
      const roughSvgString = serializer.serializeToString(roughSvg);

      // Use Fabric.js loadSVGFromString to convert back
      try {
        const { objects, options } = await loadSVGFromString(roughSvgString);
        const filteredObjects = objects.filter((obj): obj is FabricObject => obj !== null);

        if (filteredObjects.length === 0) {
          return null;
        }

        // Group all objects if multiple
        let result: FabricObject;
        if (filteredObjects.length === 1) {
          result = filteredObjects[0];
        } else {
          result = util.groupSVGElements(filteredObjects, options);
        }

        // Position at original location
        result.set({
          left: left,
          top: top,
          selectable: true,
          evented: true,
        });

        return result;
      } catch (error) {
        console.error('Failed to convert hand-drawn SVG to Fabric.js:', error);
        return null;
      }
    },
    [canvas, handDrawnSettings]
  );

  const applyHandDrawnToSelection = useCallback(async () => {
    if (!canvas || !handDrawnSettings?.enabled) return;

    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length === 0) return;

    // Process each object and collect replacements
    const replacements: Array<{ original: FabricObject; replacement: FabricObject; index: number }> = [];

    for (const obj of activeObjects) {
      const index = canvas.getObjects().indexOf(obj);
      const roughObj = await applyHandDrawnStyle(obj);
      if (roughObj) {
        replacements.push({ original: obj, replacement: roughObj, index });
      }
    }

    // Apply replacements
    for (const { original, replacement, index } of replacements) {
      canvas.remove(original);
      canvas.insertAt(index, replacement);
    }

    canvas.discardActiveObject();
    canvas.renderAll();
  }, [canvas, handDrawnSettings, applyHandDrawnStyle]);

  // ========================================================================
  // Tool Activation Effect
  // ========================================================================

  useEffect(() => {
    if (isPenToolActive) {
      activatePenTool();
    } else {
      deactivatePenTool();
    }
  }, [isPenToolActive, activatePenTool, deactivatePenTool]);

  // ========================================================================
  // Cleanup
  // ========================================================================

  const cleanup = useCallback(() => {
    penToolRef.current?.deactivate();
    paperScopeRef.current?.project.clear();
    brushPointsRef.current = [];
    isBrushDrawingRef.current = false;
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  // ========================================================================
  // Return
  // ========================================================================

  return {
    isPenToolActive,
    isPenToolDrawing,
    activatePenTool,
    deactivatePenTool,
    isBrushToolActive,
    isBrushToolDrawing,
    applyHandDrawnStyle,
    applyHandDrawnToSelection,
    paperCanvasRef,
    cleanup,
  };
}

// ============================================================================
// Helpers
// ============================================================================

function getPresetFromSettings(settings: HandDrawnSettings): StylePreset {
  if (settings.roughness < 0.5 && settings.bowing < 0.5) {
    return 'technical';
  } else if (settings.roughness > 1.5) {
    return 'chalkboard';
  } else if (settings.roughness > 0.8) {
    return 'whiteboard';
  }
  return 'notebook';
}

export default useIllustratorTools;
