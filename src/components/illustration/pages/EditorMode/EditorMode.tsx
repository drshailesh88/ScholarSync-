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

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEditorStore } from '../../store/editorStore';
import { useToast } from '../../components/Toast';
import { Canvas, CanvasProvider, CanvasRef } from '../../components/Canvas';
import { IllustratorToolbar, type IllustratorTool } from '../../components/IllustratorToolbar';
import { defaultHandDrawnSettings, type HandDrawnSettings } from '../../components/StylePanel';
import { ExportDialog, type ExportFormat, type ExportSettings } from '../../components/ExportDialog';
import { exportAsPng, exportAsPdf, exportAsSvg, exportAsPptx } from '../../lib/export';
import { BackgroundRemovalTool } from '../../components/BackgroundRemoval';
import { AIGenerationTool } from '../../components/AIGeneration';
import { ShapeGeneratorPanel, type ShapeType } from '../../components/tools';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useIllustratorTools } from '../../hooks/useIllustratorTools';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { useCanvas as useCanvasContext } from '../../components/Canvas/CanvasContext';
import { MenuBar } from './MenuBar';
import { Toolbar } from './Toolbar';
import { RightPanel } from './RightPanel';
import { StatusBar } from './StatusBar';
import { ToolType } from '../../types/index';

// ============================================================================
// Types
// ============================================================================

interface MouseCoords {
  x: number;
  y: number;
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

// ============================================================================
// EditorMode Component
// ============================================================================

export function EditorMode(): JSX.Element {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const canvasRef = useRef<CanvasRef>(null);
  const paperCanvasRef = useRef<HTMLCanvasElement>(null);
  const [mouseCoords, setMouseCoords] = useState<MouseCoords>({ x: 0, y: 0 });
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [illustratorTool, setIllustratorTool] = useState<IllustratorTool>('select');
  const [handDrawnEnabled, setHandDrawnEnabled] = useState(false);
  const [handDrawnSettings, setHandDrawnSettings] = useState<HandDrawnSettings>(defaultHandDrawnSettings);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [bgRemovalToolOpen, setBgRemovalToolOpen] = useState(false);
  const [aiGenerationToolOpen, setAIGenerationToolOpen] = useState(false);
  const [shapeGeneratorOpen, setShapeGeneratorOpen] = useState(false);
  const [initialShapeType, setInitialShapeType] = useState<ShapeType>('dna');

  // Store state
  const isLoading = useEditorStore((state) => state.isLoading);
  const setLoading = useEditorStore((state) => state.setLoading);
  const setCanvas = useEditorStore((state) => state.setCanvas);
  const canvas = useEditorStore((state) => state.canvas);
  const setActiveTool = useEditorStore((state) => state.setActiveTool);

  // Map illustrator tool to editor tool type
  const mapIllustratorToolToEditorTool = useCallback((tool: IllustratorTool): ToolType => {
    switch (tool) {
      case 'select': return ToolType.SELECT;
      case 'pen': return ToolType.PEN;
      case 'brush': return ToolType.PENCIL;
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
  }, []);

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

  // ========================================================================
  // File Operation Handlers (for keyboard shortcuts)
  // ========================================================================

  // Get canvas context for file operations
  const {
    clearCanvas,
    exportJSON,
    importJSON,
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

  // Initialize illustrator tools hook
  // The hook sets up event handlers and manages Paper.js integration
  const { applyHandDrawnToSelection } = useIllustratorTools({
    canvas: canvas,
    activeTool: illustratorTool,
    handDrawnSettings: handDrawnSettings,
    strokeColor: '#000000',
    strokeWidth: 2,
    paperCanvasRef: paperCanvasRef,
  });

  // ========================================================================
  // Load Diagram by ID
  // ========================================================================

  useEffect(() => {
    if (id) {
      loadDiagram(id);
    }
  }, [id]);

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
        // Redirect to editor without ID
        navigate('/editor', { replace: true });
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
  }, [navigate, setLoading, showToast]);

  // ========================================================================
  // Canvas Resize Handler
  // ========================================================================

  useEffect(() => {
    const updateCanvasSize = () => {
      const toolbar = document.querySelector('[role="toolbar"]');
      const rightPanel = document.querySelector('aside:last-of-type');

      const toolbarWidth = toolbar?.clientWidth || 48;
      const rightPanelWidth = rightPanel?.clientWidth || 280;
      const menuBarHeight = 40;
      const statusBarHeight = 24;

      const availableWidth = window.innerWidth - toolbarWidth - rightPanelWidth - 48; // padding
      const availableHeight = window.innerHeight - menuBarHeight - statusBarHeight - 48; // padding

      // Set canvas to a reasonable default size
      const newWidth = Math.max(600, Math.min(1200, availableWidth));
      const newHeight = Math.max(400, Math.min(900, availableHeight));

      setCanvasSize({ width: newWidth, height: newHeight });
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  // ========================================================================
  // Event Handlers
  // ========================================================================

  const handleCanvasReady = useCallback((canvas: any) => {
    setCanvas(canvas);

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

  const handleSelectionChange = useCallback((objects: any[]) => {
    const objectIds = objects.map((obj) => obj.id || `obj-${Math.random().toString(36).substr(2, 9)}`);
    useEditorStore.getState().selectObjects(objectIds);
  }, []);

  const handleObjectModified = useCallback((_object: unknown) => {
    // Object was modified, history is automatically updated in Canvas component
  }, []);

  // ========================================================================
  // Render
  // ========================================================================

  return (
    <CanvasProvider>
      <div style={styles.container}>
        {/* Top Menu Bar */}
        <MenuBar
          onOpenExportDialog={handleOpenExportDialog}
          onOpenBackgroundRemoval={handleOpenBackgroundRemoval}
          onOpenAIGeneration={handleOpenAIGeneration}
          onOpenShapeGenerator={handleOpenShapeGenerator}
        />

        {/* Export Dialog */}
        <ExportDialog
          isOpen={exportDialogOpen}
          onClose={() => setExportDialogOpen(false)}
          onExport={handleExport}
          filename="diagram"
          onError={(message) => showToast({ type: 'error', message })}
        />

        {/* Background Removal Tool Modal */}
        {bgRemovalToolOpen && (
          <div
            style={styles.modalOverlay}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setBgRemovalToolOpen(false);
              }
            }}
          >
            <BackgroundRemovalTool
              isOpen={bgRemovalToolOpen}
              onClose={() => setBgRemovalToolOpen(false)}
            />
          </div>
        )}

        {/* AI Generation Tool Modal */}
        {aiGenerationToolOpen && (
          <div
            style={styles.modalOverlay}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setAIGenerationToolOpen(false);
              }
            }}
          >
            <AIGenerationTool
              isOpen={aiGenerationToolOpen}
              onClose={() => setAIGenerationToolOpen(false)}
            />
          </div>
        )}

        {/* Shape Generator Panel Modal */}
        {shapeGeneratorOpen && (
          <div
            style={styles.modalOverlay}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShapeGeneratorOpen(false);
              }
            }}
          >
            <ShapeGeneratorPanel
              isOpen={shapeGeneratorOpen}
              onClose={() => setShapeGeneratorOpen(false)}
              initialShape={initialShapeType}
            />
          </div>
        )}

        {/* Illustrator Toolbar (Pen, Brush, Shapes, Hand-drawn toggle) */}
        <IllustratorToolbar
          canvas={canvas}
          activeTool={illustratorTool}
          onToolChange={handleIllustratorToolChange}
          handDrawnEnabled={handDrawnEnabled}
          onHandDrawnToggle={handleHandDrawnToggle}
        />

        {/* Main Content Area */}
        <div style={styles.main}>
          {/* Left Toolbar */}
          <Toolbar onOpenShapeGenerator={handleOpenShapeGenerator} />

          {/* Center Canvas Area */}
          <div style={styles.canvasArea}>
            {isLoading && (
              <div style={styles.loadingOverlay}>
                <LoadingSpinner size="lg" variant="primary" />
                <span style={styles.loadingText}>Loading diagram...</span>
              </div>
            )}

            <div style={styles.canvasWrapper}>
              <div style={styles.canvasShadow}>
                <Canvas
                  ref={canvasRef}
                  width={canvasSize.width}
                  height={canvasSize.height}
                  backgroundColor="#ffffff"
                  onReady={handleCanvasReady}
                  onMouseMove={handleMouseMove}
                  onSelectionChange={handleSelectionChange}
                  onObjectModified={handleObjectModified}
                />
                {/* Paper.js overlay canvas for Pen Tool - always rendered for ref availability */}
                <canvas
                  ref={paperCanvasRef}
                  width={canvasSize.width}
                  height={canvasSize.height}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    pointerEvents: illustratorTool === 'pen' ? 'auto' : 'none',
                    zIndex: illustratorTool === 'pen' ? 10 : -1,
                    visibility: illustratorTool === 'pen' ? 'visible' : 'hidden',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <RightPanel
            handDrawnSettings={handDrawnSettings}
            onHandDrawnSettingsChange={setHandDrawnSettings}
            onApplyHandDrawnToSelection={applyHandDrawnToSelection}
          />
        </div>

        {/* Bottom Status Bar */}
        <StatusBar mouseCoords={mouseCoords} />
      </div>
    </CanvasProvider>
  );
}

export default EditorMode;
