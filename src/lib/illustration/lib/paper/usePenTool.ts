/**
 * React Hook for Paper.js Pen Tool
 *
 * Provides easy integration of the bezier pen tool with React components.
 */

import { useEffect, useRef, useCallback, useState } from 'react';
import paper from 'paper';
import { PenTool, PenToolOptions } from './PenTool';

export interface UsePenToolOptions extends Omit<PenToolOptions, 'onPathComplete' | 'onPathUpdate'> {
  onPathComplete?: (svgData: string, path: paper.Path) => void;
  onPathUpdate?: (path: paper.Path) => void;
  enabled?: boolean;
}

export interface UsePenToolReturn {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isDrawing: boolean;
  isReady: boolean;
  currentPath: paper.Path | null;
  activate: () => void;
  deactivate: () => void;
  setStrokeColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
  setFillColor: (color: string | null) => void;
  clearCanvas: () => void;
  exportSvg: () => string | null;
}

export function usePenTool(options: UsePenToolOptions = {}): UsePenToolReturn {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scopeRef = useRef<paper.PaperScope | null>(null);
  const toolRef = useRef<PenTool | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentPath, setCurrentPath] = useState<paper.Path | null>(null);
  const pathsRef = useRef<paper.Path[]>([]);

  // Initialize Paper.js when canvas is available
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create new Paper.js scope
    const scope = new paper.PaperScope();
    scope.setup(canvas);
    scopeRef.current = scope;

    // Create pen tool
    const penTool = new PenTool(scope, {
      strokeColor: options.strokeColor || '#000000',
      strokeWidth: options.strokeWidth || 2,
      fillColor: options.fillColor ?? null,
      smoothing: options.smoothing,
      onPathComplete: (path, svgData) => {
        pathsRef.current.push(path);
        setIsDrawing(false);
        setCurrentPath(null);
        options.onPathComplete?.(svgData, path);
      },
      onPathUpdate: (path) => {
        setIsDrawing(true);
        setCurrentPath(path);
        options.onPathUpdate?.(path);
      },
    });

    toolRef.current = penTool;
    setIsReady(true);

    // Activate if enabled
    if (options.enabled !== false) {
      penTool.activate();
    }

    return () => {
      penTool.deactivate();
      scope.project.clear();
      setIsReady(false);
      setIsDrawing(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update options when they change
  useEffect(() => {
    if (toolRef.current) {
      toolRef.current.setOptions({
        strokeColor: options.strokeColor,
        strokeWidth: options.strokeWidth,
        fillColor: options.fillColor,
        smoothing: options.smoothing,
      });
    }
  }, [options.strokeColor, options.strokeWidth, options.fillColor, options.smoothing]);

  const activate = useCallback(() => {
    toolRef.current?.activate();
  }, []);

  const deactivate = useCallback(() => {
    toolRef.current?.deactivate();
  }, []);

  const setStrokeColor = useCallback((color: string) => {
    toolRef.current?.setOptions({ strokeColor: color });
  }, []);

  const setStrokeWidth = useCallback((width: number) => {
    toolRef.current?.setOptions({ strokeWidth: width });
  }, []);

  const setFillColor = useCallback((color: string | null) => {
    toolRef.current?.setOptions({ fillColor: color });
  }, []);

  const clearCanvas = useCallback(() => {
    if (scopeRef.current) {
      scopeRef.current.project.activeLayer.removeChildren();
      pathsRef.current = [];
    }
  }, []);

  const exportSvg = useCallback((): string | null => {
    if (!scopeRef.current) return null;

    const project = scopeRef.current.project;
    const svg = project.exportSVG({ asString: true }) as string;
    return svg;
  }, []);

  return {
    canvasRef,
    isDrawing,
    isReady,
    currentPath,
    activate,
    deactivate,
    setStrokeColor,
    setStrokeWidth,
    setFillColor,
    clearCanvas,
    exportSvg,
  };
}

export default usePenTool;
