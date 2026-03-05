/**
 * PenToolOverlay Component
 *
 * Provides Paper.js pen tool overlay that integrates with Fabric.js canvas.
 * Completed bezier paths are converted to Fabric.js paths and added to the main canvas.
 *
 * @module components/Canvas/PenToolOverlay
 */

import { useEffect, useRef, useCallback, useState } from 'react';
import { Canvas as FabricCanvas, Path as FabricPath, FabricObject } from 'fabric';
import paper from 'paper';
import { PenTool } from '@/lib/illustration/lib/paper/PenTool';

// ============================================================================
// Types
// ============================================================================

export interface PenToolOverlayProps {
  /** Fabric.js canvas instance */
  fabricCanvas: FabricCanvas | null;
  /** Whether the pen tool is active */
  isActive: boolean;
  /** Stroke color for paths */
  strokeColor?: string;
  /** Stroke width for paths */
  strokeWidth?: number;
  /** Fill color for paths (null for no fill) */
  fillColor?: string | null;
  /** Enable smoothing on path completion */
  smoothing?: boolean;
  /** Callback when path is completed */
  onPathComplete?: (fabricPath: FabricObject) => void;
  /** Width of the overlay canvas */
  width: number;
  /** Height of the overlay canvas */
  height: number;
}

// ============================================================================
// Styles
// ============================================================================

const overlayStyles: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  pointerEvents: 'auto',
  zIndex: 10,
};

const hiddenStyles: React.CSSProperties = {
  ...overlayStyles,
  pointerEvents: 'none',
  opacity: 0,
};

// ============================================================================
// Component
// ============================================================================

export function PenToolOverlay({
  fabricCanvas,
  isActive,
  strokeColor = '#000000',
  strokeWidth = 2,
  fillColor = null,
  smoothing = false,
  onPathComplete,
  width,
  height,
}: PenToolOverlayProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scopeRef = useRef<paper.PaperScope | null>(null);
  const toolRef = useRef<PenTool | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Convert Paper.js path to Fabric.js path
  const paperPathToFabric = useCallback(
    (paperPath: paper.Path): FabricPath | null => {
      try {
        // Get SVG path data string
        const pathData = paperPath.pathData;

        // Get bounds for positioning
        const bounds = paperPath.bounds;

        // Create Fabric.js path
        const fabricPath = new FabricPath(pathData, {
          left: bounds.x,
          top: bounds.y,
          stroke: paperPath.strokeColor?.toCSS(true) || strokeColor,
          strokeWidth: paperPath.strokeWidth || strokeWidth,
          fill: paperPath.fillColor?.toCSS(true) || fillColor || 'transparent',
          selectable: true,
          evented: true,
          originX: 'left',
          originY: 'top',
        });

        return fabricPath;
      } catch (error) {
        console.error('Failed to convert Paper.js path to Fabric.js:', error);
        return null;
      }
    },
    [strokeColor, strokeWidth, fillColor]
  );

  // Handle path completion
  const handlePathComplete = useCallback(
    (paperPath: paper.Path, _svgData: string) => {
      if (!fabricCanvas) return;

      // Convert to Fabric.js path
      const fabricPath = paperPathToFabric(paperPath);

      if (fabricPath) {
        // Add to Fabric.js canvas
        fabricCanvas.add(fabricPath);
        fabricCanvas.setActiveObject(fabricPath);
        fabricCanvas.renderAll();

        // Notify parent
        onPathComplete?.(fabricPath);
      }

      // Remove the path from Paper.js canvas (it's now in Fabric.js)
      paperPath.remove();

      // Clear Paper.js canvas for next drawing
      if (scopeRef.current) {
        scopeRef.current.project.activeLayer.removeChildren();
        scopeRef.current.view.update();
      }
    },
    [fabricCanvas, paperPathToFabric, onPathComplete]
  );

  // Initialize Paper.js
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create new Paper.js scope
    const scope = new paper.PaperScope();
    scope.setup(canvas);
    scopeRef.current = scope;

    // Create pen tool with callbacks
    const penTool = new PenTool(scope, {
      strokeColor,
      strokeWidth,
      fillColor,
      smoothing,
      onPathComplete: handlePathComplete,
      onPathUpdate: () => {
        // Path is being drawn - Paper.js handles visualization
      },
    });

    toolRef.current = penTool;
    setIsReady(true);

    return () => {
      penTool.deactivate();
      scope.project.clear();
      scopeRef.current = null;
      toolRef.current = null;
      setIsReady(false);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update tool options when props change
  useEffect(() => {
    if (toolRef.current) {
      toolRef.current.setOptions({
        strokeColor,
        strokeWidth,
        fillColor,
        smoothing,
      });
    }
  }, [strokeColor, strokeWidth, fillColor, smoothing]);

  // Handle activation/deactivation
  useEffect(() => {
    if (!isReady || !toolRef.current) return;

    if (isActive) {
      toolRef.current.activate();
    } else {
      toolRef.current.deactivate();
    }
  }, [isActive, isReady]);

  // Update canvas size
  useEffect(() => {
    if (scopeRef.current && scopeRef.current.view) {
      scopeRef.current.view.viewSize = new paper.Size(width, height);
    }
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={isActive ? overlayStyles : hiddenStyles}
      data-pen-tool-overlay
    />
  );
}

export default PenToolOverlay;
