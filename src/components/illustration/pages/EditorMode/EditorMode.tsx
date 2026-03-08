"use client";
/**
 * EditorMode Component
 * Full editor layout with all editing tools and panels
 *
 * Layout:
 * - MenuBar at top
 * - Toolbar on left (vertical)
 * - Canvas in center
 * - Right panel with tabs (Layers, Properties, Icons)
 * - StatusBar at bottom
 *
 * @module pages/EditorMode/EditorMode
 */

import React, { Suspense, lazy, useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { ErrorBoundary, IllustrationErrorFallback } from '@/components/illustration/ErrorBoundary';
import { useEditorStore, useGuideState, useViewport } from '@/stores/illustration/editorStore';
import { ToastProvider, useToast } from '@/components/illustration/Toast';
import { Canvas, CanvasProvider, CanvasRef } from '@/components/illustration/Canvas';
import { IllustratorToolbar, type IllustratorTool } from '@/components/illustration/IllustratorToolbar';
import { defaultHandDrawnSettings, type HandDrawnSettings } from '@/components/illustration/StylePanel';
import type { ExportFormat, ExportSettings } from '@/components/illustration/ExportDialog';
import { exportAsPng, exportAsPdf, exportAsSvg, exportAsPptx } from '@/lib/illustration/lib/export';
import type { ShapeType } from '@/components/illustration/tools';
import { LoadingSpinner } from '@/components/illustration/LoadingSpinner';
import { ScientificTextToolbar } from '@/components/illustration/ScientificTextToolbar';
import { useKeyboardShortcuts } from '@/hooks/illustration/useKeyboardShortcuts';
import { useCanvas as useCanvasContext } from '@/components/illustration/Canvas/CanvasContext';
import {
  GuideOverlay,
  HorizontalRuler,
  VerticalRuler,
  RULER_STRIP_SIZE,
  type CreateGuideRequest,
  type RulerUnit,
} from '@/components/illustration/Rulers';
import { MenuBar } from './MenuBar';
import { Toolbar } from './Toolbar';
import { StatusBar } from './StatusBar';
import { ToolType } from '@/lib/illustration/types';
import {
  applyDocumentSettingsToCanvas,
  clampCanvasDimension,
  DEFAULT_CANVAS_BACKGROUND,
  type DocumentSettingsValue,
} from '@/lib/illustration/document-settings';
import {
  importImageToCanvas,
  isSupportedImageFile,
  readImageFileAsDataUrl,
} from '@/lib/illustration/image-import';

const LazyExportDialog = lazy(() =>
  import('@/components/illustration/ExportDialog').then((module) => ({
    default: module.ExportDialog,
  }))
);
const LazyBackgroundRemovalTool = lazy(() =>
  import('@/components/illustration/BackgroundRemoval').then((module) => ({
    default: module.BackgroundRemovalTool,
  }))
);
const LazyAIGenerationTool = lazy(() =>
  import('@/components/illustration/AIGeneration').then((module) => ({
    default: module.AIGenerationTool,
  }))
);
const LazyShapeGeneratorPanel = lazy(() =>
  import('@/components/illustration/tools').then((module) => ({
    default: module.ShapeGeneratorPanel,
  }))
);
const LazyFigurePanelGenerator = lazy(() =>
  import('@/components/illustration/FigurePanelGenerator').then((module) => ({
    default: module.FigurePanelGenerator,
  }))
);
const LazyDocumentSettings = lazy(() =>
  import('@/components/illustration/DocumentSettings').then((module) => ({
    default: module.DocumentSettings,
  }))
);
const LazyRightPanel = lazy(() =>
  import('./RightPanel').then((module) => ({ default: module.RightPanel }))
);

const AGENT_IMPORT_SESSION_KEY = 'scholarsync-illustration-agent-import';

// ============================================================================
// Types
// ============================================================================

interface MouseCoords {
  x: number;
  y: number;
}

interface ScientificToolbarPosition {
  visible: boolean;
  x: number;
  y: number;
}

function ensureCanvasObjectId(object: {
  id?: string;
  get?: (key: string) => unknown;
  set?: (key: string, value: unknown) => unknown;
}): string {
  const existingId =
    object.id ||
    (typeof object.get === 'function' ? object.get('id') : undefined);

  if (typeof existingId === 'string' && existingId.length > 0) {
    if (!object.id) {
      object.id = existingId;
    }
    return existingId;
  }

  const generatedId = `obj-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  object.id = generatedId;
  if (typeof object.set === 'function') {
    object.set('id', generatedId);
  }
  return generatedId;
}

// ============================================================================
// Styles
// ============================================================================

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: 'var(--bg-primary)',
  },
  main: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  canvasArea: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--bg-tertiary)',
    overflow: 'hidden',
    position: 'relative',
  },
  canvasAreaDragActive: {
    boxShadow: 'inset 0 0 0 2px var(--accent-primary)',
  },
  canvasWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    overflow: 'auto',
  },
  canvasShadow: {
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
    borderRadius: '4px',
    overflow: 'hidden',
    position: 'relative',
  },
  rulerFrame: {
    position: 'relative',
  },
  rulerCorner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${RULER_STRIP_SIZE}px`,
    height: `${RULER_STRIP_SIZE}px`,
    border: 'none',
    borderRight: '1px solid var(--border-primary)',
    borderBottom: '1px solid var(--border-primary)',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-muted)',
    fontSize: '10px',
    fontWeight: 600,
    textTransform: 'uppercase',
    cursor: 'pointer',
    zIndex: 15,
  },
  rulerHorizontal: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  rulerVertical: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  canvasWithRulers: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    zIndex: 100,
  },
  loadingText: {
    color: 'var(--text-secondary, #9d9d9d)',
    fontSize: '14px',
    fontWeight: 500,
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
};

function InlineEditorSkeleton({ label }: { label: string }): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '16px',
        height: '100%',
      }}
      aria-label={`${label} loading`}
    >
      <div
        style={{
          height: '16px',
          width: '40%',
          borderRadius: '999px',
          backgroundColor: 'var(--bg-secondary)',
        }}
      />
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={`${label}-${index}`}
          style={{
            height: index === 0 ? '48px' : '28px',
            width: index === 3 ? '78%' : '100%',
            borderRadius: '8px',
            backgroundColor: 'var(--bg-secondary)',
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
}

// ============================================================================
// EditorMode Component
// ============================================================================

export interface EditorModeProps {
  id?: string;
}

function EditorModeContent({ id }: EditorModeProps): JSX.Element {
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const canvasRef = useRef<CanvasRef>(null);
  const [mouseCoords, setMouseCoords] = useState<MouseCoords>({ x: 0, y: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [canvasBackgroundColor, setCanvasBackgroundColor] = useState(DEFAULT_CANVAS_BACKGROUND);
  const [documentSettingsOpen, setDocumentSettingsOpen] = useState(false);
  const [isCanvasDragActive, setIsCanvasDragActive] = useState(false);
  const [illustratorTool, setIllustratorTool] = useState<IllustratorTool>('select');
  const [handDrawnEnabled, setHandDrawnEnabled] = useState(false);
  const [handDrawnSettings, setHandDrawnSettings] = useState<HandDrawnSettings>(defaultHandDrawnSettings);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [bgRemovalToolOpen, setBgRemovalToolOpen] = useState(false);
  const [aiGenerationToolOpen, setAIGenerationToolOpen] = useState(false);
  const [shapeGeneratorOpen, setShapeGeneratorOpen] = useState(false);
  const [figurePanelGeneratorOpen, setFigurePanelGeneratorOpen] = useState(false);
  const [initialShapeType, setInitialShapeType] = useState<ShapeType>('dna');
  const [rulerUnit, setRulerUnit] = useState<RulerUnit>('px');
  const [createGuideRequest, setCreateGuideRequest] = useState<CreateGuideRequest | null>(null);
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const [scientificToolbar, setScientificToolbar] = useState<ScientificToolbarPosition>({
    visible: false,
    x: 100,
    y: 100,
  });
  const canvasAreaRef = useRef<HTMLDivElement>(null);
  const createGuideRequestIdRef = useRef(0);

  // Store state
  const isLoading = useEditorStore((state) => state.isLoading);
  const setLoading = useEditorStore((state) => state.setLoading);
  const setCanvas = useEditorStore((state) => state.setCanvas);
  const canvas = useEditorStore((state) => state.canvas);
  const setActiveTool = useEditorStore((state) => state.setActiveTool);
  const addGuide = useEditorStore((state) => state.addGuide);
  const updateGuide = useEditorStore((state) => state.updateGuide);
  const removeGuide = useEditorStore((state) => state.removeGuide);
  const { zoom, pan } = useViewport();
  const { showRulers, showGuides, guides, guideSnapIndicator } = useGuideState();

  // Map illustrator tool to editor tool type
  const mapIllustratorToolToEditorTool = useCallback((tool: IllustratorTool): ToolType => {
    switch (tool) {
      case 'select': return ToolType.SELECT;
      case 'pen': return ToolType.PEN;
      case 'brush': return ToolType.BRUSH;
      case 'rectangle': return ToolType.RECTANGLE;
      case 'ellipse': return ToolType.ELLIPSE;
      case 'line': return ToolType.LINE;
      case 'text': return ToolType.TEXT;
      default: return ToolType.SELECT;
    }
  }, []);

  // Handle illustrator tool change
  const handleIllustratorToolChange = useCallback((tool: IllustratorTool) => {
    setIllustratorTool(tool);
    setActiveTool(mapIllustratorToolToEditorTool(tool));
  }, [setActiveTool, mapIllustratorToolToEditorTool]);

  // Handle hand-drawn toggle
  const handleHandDrawnToggle = useCallback((enabled: boolean) => {
    setHandDrawnEnabled(enabled);
    setHandDrawnSettings(prev => ({ ...prev, enabled }));
    if (canvasRef.current) {
      canvasRef.current.setRoughEnabled(enabled);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    canvasRef.current.setRoughSettings({
      preset:
        handDrawnSettings.roughness > 1.5
          ? 'chalkboard'
          : handDrawnSettings.roughness > 0.8
            ? 'whiteboard'
            : handDrawnSettings.bowing < 0.5
              ? 'technical'
              : 'notebook',
      roughness: handDrawnSettings.roughness,
      bowing: handDrawnSettings.bowing,
      strokeWidth: handDrawnSettings.strokeWidth,
      fillStyle: handDrawnSettings.fillStyle,
    });
    canvasRef.current.setRoughEnabled(handDrawnSettings.enabled);
  }, [handDrawnSettings]);

  // Handle opening export dialog
  const handleOpenExportDialog = useCallback(() => {
    setExportDialogOpen(true);
  }, []);

  // Handle opening background removal tool
  const handleOpenBackgroundRemoval = useCallback(() => {
    setBgRemovalToolOpen(true);
  }, []);

  // Handle opening AI generation tool
  const handleOpenAIGeneration = useCallback(() => {
    setAIGenerationToolOpen(true);
  }, []);

  // Handle opening shape generator panel
  const handleOpenShapeGenerator = useCallback((shapeType?: string) => {
    if (shapeType) {
      setInitialShapeType(shapeType as ShapeType);
    }
    setShapeGeneratorOpen(true);
  }, []);

  // Handle opening figure panel generator
  const handleOpenFigurePanelGenerator = useCallback(() => {
    setFigurePanelGeneratorOpen(true);
  }, []);

  const handleOpenDocumentSettings = useCallback(() => {
    setDocumentSettingsOpen(true);
  }, []);

  const handleApplyDocumentSettings = useCallback((settings: DocumentSettingsValue) => {
    const normalized = {
      width: clampCanvasDimension(settings.width, canvasSize.width),
      height: clampCanvasDimension(settings.height, canvasSize.height),
      backgroundColor: settings.backgroundColor || canvasBackgroundColor,
    };

    if (canvas) {
      applyDocumentSettingsToCanvas(canvas, normalized);
    }

    setCanvasSize({ width: normalized.width, height: normalized.height });
    setCanvasBackgroundColor(normalized.backgroundColor);
    setDocumentSettingsOpen(false);

    showToast({
      type: 'success',
      message: `Canvas updated to ${normalized.width}x${normalized.height}`,
    });
  }, [canvas, canvasBackgroundColor, canvasSize.height, canvasSize.width, showToast]);

  const importImageFile = useCallback(async (file: File, source: 'drop' | 'picker' | 'clipboard') => {
    if (!canvas) {
      showToast({ type: 'error', message: 'Canvas not ready' });
      return;
    }

    if (!isSupportedImageFile(file)) {
      showToast({ type: 'error', message: 'Unsupported image file. Use PNG, JPG, or SVG.' });
      return;
    }

    try {
      const dataUrl = await readImageFileAsDataUrl(file);
      await importImageToCanvas(canvas, dataUrl, { maxCanvasWidthRatio: 0.5 });
      showToast({
        type: 'success',
        message: source === 'drop'
          ? `Placed image: ${file.name}`
          : source === 'clipboard'
            ? 'Pasted image from clipboard'
            : `Placed image: ${file.name}`,
      });
    } catch (error) {
      console.error('Image import failed:', error);
      showToast({ type: 'error', message: 'Failed to import image' });
    }
  }, [canvas, showToast]);

  const handlePlaceImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.png,.jpg,.jpeg,.svg,image/png,image/jpeg,image/svg+xml';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        void importImageFile(file, 'picker');
      }
    };
    input.click();
  }, [importImageFile]);

  // ========================================================================
  // File Operation Handlers (for keyboard shortcuts)
  // ========================================================================

  // Get canvas context for file operations
  const {
    clearCanvas,
    exportJSON,
    importJSON,
    importSVG,
    zoomToFit,
  } = useCanvasContext();

  // Handle New (Ctrl+N)
  const handleNew = useCallback(() => {
    if (confirm('Create new document? Unsaved changes will be lost.')) {
      clearCanvas();
      showToast({ type: 'info', message: 'New document created' });
    }
  }, [clearCanvas, showToast]);

  // Handle Open (Ctrl+O)
  const handleOpen = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.finnish,.json,.svg';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const text = await file.text();
        try {
          const json = JSON.parse(text);
          await importJSON(json);
          showToast({ type: 'success', message: `Opened: ${file.name}` });
        } catch {
          showToast({ type: 'error', message: 'Invalid file format' });
        }
      }
    };
    input.click();
  }, [importJSON, showToast]);

  // Handle Save (Ctrl+S)
  const handleSave = useCallback(() => {
    const json = exportJSON();
    const blob = new Blob([JSON.stringify(json, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagram.finnish';
    a.click();
    URL.revokeObjectURL(url);
    showToast({ type: 'success', message: 'Saved: diagram.finnish' });
  }, [exportJSON, showToast]);

  // Handle Save As (Ctrl+Shift+S)
  const handleSaveAs = useCallback(() => {
    const filename = prompt('Enter filename:', 'diagram.finnish');
    if (filename) {
      const json = exportJSON();
      const blob = new Blob([JSON.stringify(json, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename.endsWith('.finnish') ? filename : `${filename}.finnish`;
      a.click();
      URL.revokeObjectURL(url);
      showToast({ type: 'success', message: `Saved: ${filename}` });
    }
  }, [exportJSON, showToast]);

  // ========================================================================
  // Keyboard Shortcuts Hook
  // ========================================================================

  useKeyboardShortcuts({
    enabled: true,
    onNew: handleNew,
    onOpen: handleOpen,
    onSave: handleSave,
    onSaveAs: handleSaveAs,
    onExport: handleOpenExportDialog,
    onOpenBackgroundRemoval: handleOpenBackgroundRemoval,
    onOpenAIGeneration: handleOpenAIGeneration,
    onPlaceImage: handlePlaceImage,
    onZoomToFit: zoomToFit,
  });

  // Handle export from ExportDialog
  const handleExport = useCallback(async (format: ExportFormat, settings: ExportSettings) => {
    if (!canvas) {
      showToast({ type: 'error', message: 'Canvas not ready' });
      return;
    }

    try {
      // Get SVG string from Fabric.js canvas
      const svgString = canvas.toSVG();

      // Create an SVG element from the string
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgString, 'image/svg+xml');
      const svgElement = svgDoc.documentElement as unknown as SVGSVGElement;

      // Append to body temporarily for rendering (required by some export libs)
      document.body.appendChild(svgElement);
      svgElement.style.position = 'absolute';
      svgElement.style.left = '-9999px';

      const filename = 'diagram';

      switch (format) {
        case 'png': {
          const pngSettings = settings as { dpi: number; quality: number; background: string };
          const scale = pngSettings.dpi / 72; // Convert DPI to scale factor
          await exportAsPng(svgElement, `${filename}.png`, {
            scale,
            backgroundColor: pngSettings.background === 'transparent' ? undefined : '#ffffff',
          });
          showToast({ type: 'success', message: 'PNG exported successfully!' });
          break;
        }
        case 'pdf': {
          const pdfSettings = settings as { pageSize: string; orientation: string; margins: { top: number; right: number; bottom: number; left: number } };
          await exportAsPdf(svgElement, `${filename}.pdf`, {
            pageSize: pdfSettings.pageSize as 'a4' | 'letter' | 'a3' | 'custom',
            orientation: pdfSettings.orientation as 'portrait' | 'landscape',
            margins: pdfSettings.margins,
          });
          showToast({ type: 'success', message: 'PDF exported successfully!' });
          break;
        }
        case 'svg': {
          const svgSettings = settings as { optimize: boolean; minify: boolean; embedFonts: boolean };
          exportAsSvg(svgElement, `${filename}.svg`, {
            minify: svgSettings.minify,
            embedFonts: svgSettings.embedFonts,
          });
          showToast({ type: 'success', message: 'SVG exported successfully!' });
          break;
        }
        case 'pptx': {
          const pptxSettings = settings as { layout: string; resolution: number; background: string; centerImage: boolean; title?: string; author?: string };
          await exportAsPptx(canvas, filename, {
            layout: pptxSettings.layout as '16x9' | '16x10' | '4x3' | 'custom',
            multiplier: pptxSettings.resolution,
            slideBackground: pptxSettings.background === 'transparent' ? 'transparent' : 'FFFFFF',
            centerImage: pptxSettings.centerImage,
            title: pptxSettings.title,
            author: pptxSettings.author,
          });
          showToast({ type: 'success', message: 'PowerPoint exported successfully!' });
          break;
        }
        case 'latex': {
          // LaTeX export is handled directly in the LaTeXOptions component
          showToast({ type: 'success', message: 'LaTeX code ready!' });
          break;
        }
      }

      // Clean up
      document.body.removeChild(svgElement);
    } catch (error) {
      console.error('Export failed:', error);
      showToast({ type: 'error', message: 'Export failed. Please try again.' });
    }
  }, [canvas, showToast]);

  const applyHandDrawnToSelection = useCallback(async () => {
    if (!canvasRef.current || !handDrawnSettings.enabled) {
      return;
    }

    canvasRef.current.applyRoughToSelected();
  }, [handDrawnSettings.enabled]);

  // ========================================================================
  // Load Diagram by ID
  // ========================================================================

  const loadDiagram = useCallback(async (diagramId: string) => {
    setLoading(true);

    try {
      // Try to load from localStorage
      const stored = localStorage.getItem(`finnish-diagram-${diagramId}`);

      if (stored) {
        const diagramData = JSON.parse(stored);

        if (canvasRef.current) {
          await canvasRef.current.loadFromJSON(diagramData.canvas);
          showToast({
            type: 'success',
            message: `Loaded diagram: ${diagramData.name || diagramId}`,
          });
        }
      } else {
        showToast({
          type: 'warning',
          message: `Diagram "${diagramId}" not found`,
        });
        // TODO: Navigate to /illustrate/editor (requires router)
        // navigate('/editor', { replace: true });
      }
    } catch (error) {
      console.error('Failed to load diagram:', error);
      showToast({
        type: 'error',
        message: 'Failed to load diagram',
      });
    } finally {
      setLoading(false);
    }
  }, [setLoading, showToast]);

  useEffect(() => {
    if (id) {
      loadDiagram(id);
    }
  }, [id, loadDiagram]);

  useEffect(() => {
    if (!isCanvasReady || searchParams.get('import') !== 'agent') {
      return;
    }

    const pendingSvg = sessionStorage.getItem(AGENT_IMPORT_SESSION_KEY);
    if (!pendingSvg) {
      return;
    }

    let cancelled = false;
    setLoading(true);

    void importSVG(pendingSvg)
      .then(() => {
        if (cancelled) {
          return;
        }
        sessionStorage.removeItem(AGENT_IMPORT_SESSION_KEY);
        showToast({
          type: 'success',
          message: 'Imported diagram from Agent mode',
        });
      })
      .catch((error) => {
        console.error('Failed to import agent diagram:', error);
        if (!cancelled) {
          showToast({
            type: 'error',
            message: 'Failed to import agent diagram',
          });
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [importSVG, isCanvasReady, searchParams, setLoading, showToast]);

  // ========================================================================
  // Canvas Resize Handler
  // ========================================================================

  useEffect(() => {
    // Initialize document size once. After that, user-controlled document settings own the size.
    const toolbar = document.querySelector('[role="toolbar"]');
    const rightPanel = document.querySelector('aside:last-of-type');

    const toolbarWidth = toolbar?.clientWidth || 48;
    const rightPanelWidth = rightPanel?.clientWidth || 280;
    const menuBarHeight = 40;
    const statusBarHeight = 24;

    const availableWidth = window.innerWidth - toolbarWidth - rightPanelWidth - 48;
    const availableHeight = window.innerHeight - menuBarHeight - statusBarHeight - 48;

    const newWidth = Math.max(600, Math.min(1200, availableWidth));
    const newHeight = Math.max(400, Math.min(900, availableHeight));

    setCanvasSize({ width: newWidth, height: newHeight });
  }, []);

  // ========================================================================
  // Event Handlers
  // ========================================================================

  const handleCanvasReady = useCallback((canvas: any) => {
    setCanvas(canvas);
    setIsCanvasReady(true);

    // Show welcome toast only for new documents
    if (!id) {
      showToast({
        type: 'info',
        message: 'Editor ready. Start creating!',
        duration: 3000,
      });
    }
  }, [id, setCanvas, showToast]);

  const handleMouseMove = useCallback((coords: { x: number; y: number }) => {
    setMouseCoords(coords);
  }, []);

  const isTextObject = useCallback((obj: any): boolean => {
    const type = obj?.type;
    return type === 'i-text' || type === 'textbox' || type === 'text';
  }, []);

  const updateScientificToolbarPosition = useCallback((selectedObject: any) => {
    if (!canvasAreaRef.current || !canvas || !selectedObject?.getBoundingRect) return;

    const canvasElement = (canvas as any).lowerCanvasEl as HTMLCanvasElement | undefined;
    if (!canvasElement) return;

    const areaRect = canvasAreaRef.current.getBoundingClientRect();
    const canvasRect = canvasElement.getBoundingClientRect();
    const objectBounds = selectedObject.getBoundingRect();

    const estimatedToolbarWidth = 280;
    const left =
      canvasRect.left - areaRect.left + objectBounds.left + objectBounds.width / 2 - estimatedToolbarWidth / 2;
    const top = canvasRect.top - areaRect.top + objectBounds.top - 12;

    setScientificToolbar({
      visible: true,
      x: Math.max(8, left),
      y: Math.max(8, top),
    });
  }, [canvas]);

  const handleSelectionChange = useCallback((objects: any[]) => {
    const objectIds = objects.map((obj) => ensureCanvasObjectId(obj));
    useEditorStore.getState().selectObjects(objectIds);

    if (objects.length === 1 && isTextObject(objects[0])) {
      updateScientificToolbarPosition(objects[0]);
    } else {
      setScientificToolbar((prev) => ({ ...prev, visible: false }));
    }
  }, [isTextObject, updateScientificToolbarPosition]);

  const handleObjectModified = useCallback((_object: unknown) => {
    // Object was modified, history is automatically updated in Canvas component
  }, []);

  const handleCanvasDragEnter = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsCanvasDragActive(true);
  }, []);

  const handleCanvasDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleCanvasDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
      return;
    }

    setIsCanvasDragActive(false);
  }, []);

  const handleCanvasDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsCanvasDragActive(false);

    const files = Array.from(event.dataTransfer.files);
    const imageFile = files.find((file) => isSupportedImageFile(file));
    if (!imageFile) {
      showToast({ type: 'error', message: 'Drop a PNG, JPG, or SVG image file.' });
      return;
    }

    void importImageFile(imageFile, 'drop');
  }, [importImageFile, showToast]);

  const handleStartHorizontalGuideDrag = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!showGuides) {
      return;
    }

    event.preventDefault();
    createGuideRequestIdRef.current += 1;
    setCreateGuideRequest({
      id: createGuideRequestIdRef.current,
      orientation: 'horizontal',
      clientX: event.clientX,
      clientY: event.clientY,
    });
  }, [showGuides]);

  const handleStartVerticalGuideDrag = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!showGuides) {
      return;
    }

    event.preventDefault();
    createGuideRequestIdRef.current += 1;
    setCreateGuideRequest({
      id: createGuideRequestIdRef.current,
      orientation: 'vertical',
      clientX: event.clientX,
      clientY: event.clientY,
    });
  }, [showGuides]);

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items = Array.from(event.clipboardData?.items ?? []);
      const imageItem = items.find((item) => item.kind === 'file' && item.type.startsWith('image/'));
      if (!imageItem) {
        return;
      }

      const file = imageItem.getAsFile();
      if (!file || !isSupportedImageFile(file)) {
        return;
      }

      event.preventDefault();
      void importImageFile(file, 'clipboard');
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [importImageFile]);

  // ========================================================================
  // Render
  // ========================================================================

  const rulerOffset = showRulers ? RULER_STRIP_SIZE : 0;

  return (
    <ErrorBoundary
      scope="Illustration editor"
      resetKeys={[id, searchParams.toString()]}
      fallback={({ error, reset, scope }) => (
        <IllustrationErrorFallback
          error={error}
          reset={reset}
          scope={scope}
          fullScreen
          description="The illustration editor hit an unexpected error."
        />
      )}
    >
      <div style={styles.container}>
        <MenuBar
          onOpenExportDialog={handleOpenExportDialog}
          onOpenDocumentSettings={handleOpenDocumentSettings}
          onPlaceImage={handlePlaceImage}
          onOpenBackgroundRemoval={handleOpenBackgroundRemoval}
          onOpenAIGeneration={handleOpenAIGeneration}
          onOpenShapeGenerator={handleOpenShapeGenerator}
        />

        <Suspense fallback={null}>
          <LazyDocumentSettings
            isOpen={documentSettingsOpen}
            initialWidth={canvasSize.width}
            initialHeight={canvasSize.height}
            initialBackgroundColor={canvasBackgroundColor}
            onConfirm={handleApplyDocumentSettings}
            onCancel={() => setDocumentSettingsOpen(false)}
          />
        </Suspense>

        <Suspense fallback={null}>
          <LazyExportDialog
            isOpen={exportDialogOpen}
            onClose={() => setExportDialogOpen(false)}
            onExport={handleExport}
            filename="diagram"
            onError={(message) => showToast({ type: 'error', message })}
          />
        </Suspense>

        {bgRemovalToolOpen && (
          <div
            style={styles.modalOverlay}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setBgRemovalToolOpen(false);
              }
            }}
          >
            <Suspense fallback={<InlineEditorSkeleton label="Background removal" />}>
              <LazyBackgroundRemovalTool
                isOpen={bgRemovalToolOpen}
                onClose={() => setBgRemovalToolOpen(false)}
              />
            </Suspense>
          </div>
        )}

        {aiGenerationToolOpen && (
          <div
            style={styles.modalOverlay}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setAIGenerationToolOpen(false);
              }
            }}
          >
            <Suspense fallback={<InlineEditorSkeleton label="AI generation" />}>
              <LazyAIGenerationTool
                isOpen={aiGenerationToolOpen}
                onClose={() => setAIGenerationToolOpen(false)}
              />
            </Suspense>
          </div>
        )}

        {shapeGeneratorOpen && (
          <div
            style={styles.modalOverlay}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShapeGeneratorOpen(false);
              }
            }}
          >
            <Suspense fallback={<InlineEditorSkeleton label="Shape generator" />}>
              <LazyShapeGeneratorPanel
                isOpen={shapeGeneratorOpen}
                onClose={() => setShapeGeneratorOpen(false)}
                initialShape={initialShapeType}
              />
            </Suspense>
          </div>
        )}

        <Suspense fallback={null}>
          <LazyFigurePanelGenerator
            isOpen={figurePanelGeneratorOpen}
            onClose={() => setFigurePanelGeneratorOpen(false)}
          />
        </Suspense>

        <IllustratorToolbar
          canvas={canvas}
          activeTool={illustratorTool}
          onToolChange={handleIllustratorToolChange}
          handDrawnEnabled={handDrawnEnabled}
          onHandDrawnToggle={handleHandDrawnToggle}
          onOpenFigurePanelGenerator={handleOpenFigurePanelGenerator}
        />

        <div style={styles.main}>
          <Toolbar onOpenShapeGenerator={handleOpenShapeGenerator} />

          <div
            ref={canvasAreaRef}
            style={{
              ...styles.canvasArea,
              ...(isCanvasDragActive ? styles.canvasAreaDragActive : {}),
            }}
            onDragEnter={handleCanvasDragEnter}
            onDragOver={handleCanvasDragOver}
            onDragLeave={handleCanvasDragLeave}
            onDrop={handleCanvasDrop}
          >
            {(isLoading || !isCanvasReady) && (
              <div style={styles.loadingOverlay}>
                <LoadingSpinner size="lg" variant="primary" />
                <span style={styles.loadingText}>
                  {isCanvasReady ? 'Loading diagram...' : 'Initializing editor...'}
                </span>
              </div>
            )}

            <div style={styles.canvasWrapper}>
              <div
                style={{
                  ...styles.rulerFrame,
                  width: canvasSize.width + rulerOffset,
                  height: canvasSize.height + rulerOffset,
                }}
              >
                {showRulers && (
                  <>
                    <button
                      type="button"
                      style={styles.rulerCorner}
                      title={`Ruler units: ${rulerUnit.toUpperCase()} (click to toggle)`}
                      aria-label="Toggle ruler units"
                      onClick={() => setRulerUnit((unit) => (unit === 'px' ? 'pt' : 'px'))}
                    >
                      {rulerUnit}
                    </button>

                    <div style={styles.rulerHorizontal}>
                      <HorizontalRuler
                        width={canvasSize.width}
                        zoom={zoom}
                        panX={pan.x}
                        unit={rulerUnit}
                        onStartGuideDrag={handleStartHorizontalGuideDrag}
                      />
                    </div>

                    <div style={styles.rulerVertical}>
                      <VerticalRuler
                        height={canvasSize.height}
                        zoom={zoom}
                        panY={pan.y}
                        unit={rulerUnit}
                        onStartGuideDrag={handleStartVerticalGuideDrag}
                      />
                    </div>
                  </>
                )}

                <div
                  style={{
                    ...styles.canvasShadow,
                    ...styles.canvasWithRulers,
                    width: canvasSize.width,
                    height: canvasSize.height,
                  }}
                >
                  <ErrorBoundary
                    scope="Canvas"
                    fullScreen={false}
                    fallback={({ error, reset, scope }) => (
                      <IllustrationErrorFallback
                        error={error}
                        reset={reset}
                        scope={scope}
                        fullScreen={false}
                      />
                    )}
                  >
                    <Canvas
                      ref={canvasRef}
                      width={canvasSize.width}
                      height={canvasSize.height}
                      backgroundColor={canvasBackgroundColor}
                      onReady={handleCanvasReady}
                      onMouseMove={handleMouseMove}
                      onSelectionChange={handleSelectionChange}
                      onObjectModified={handleObjectModified}
                    />
                  </ErrorBoundary>

                  <GuideOverlay
                    width={canvasSize.width}
                    height={canvasSize.height}
                    zoom={zoom}
                    pan={pan}
                    guides={guides}
                    showGuides={showGuides}
                    snapIndicator={guideSnapIndicator}
                    createGuideRequest={createGuideRequest}
                    onAddGuide={addGuide}
                    onUpdateGuide={updateGuide}
                    onRemoveGuide={removeGuide}
                  />
                </div>
              </div>
            </div>

            <ScientificTextToolbar
              visible={scientificToolbar.visible}
              x={scientificToolbar.x}
              y={scientificToolbar.y}
              onClose={() => setScientificToolbar((prev) => ({ ...prev, visible: false }))}
            />
          </div>

          <Suspense fallback={<InlineEditorSkeleton label="Right panel" />}>
            <LazyRightPanel
              handDrawnSettings={handDrawnSettings}
              onHandDrawnSettingsChange={setHandDrawnSettings}
              onApplyHandDrawnToSelection={applyHandDrawnToSelection}
            />
          </Suspense>
        </div>

        <StatusBar mouseCoords={mouseCoords} canvasSize={canvasSize} />
      </div>
    </ErrorBoundary>
  );
}

export function EditorMode({ id }: EditorModeProps): JSX.Element {
  return (
    <ToastProvider>
      <CanvasProvider>
        <EditorModeContent id={id} />
      </CanvasProvider>
    </ToastProvider>
  );
}

export default EditorMode;
