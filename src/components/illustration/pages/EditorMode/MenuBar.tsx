/**
 * MenuBar Component
 * Top menu bar with File, Edit, View, Help dropdowns
 *
 * @module pages/EditorMode/MenuBar
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { FabricObject, Line, Path as FabricPath } from 'fabric';
import { useEditorStore, useHistoryState, useViewport, useGridState, useGuideState } from '@/stores/illustration/editorStore';
import { useCanvas } from '@/components/illustration/Canvas/CanvasContext';
import { toggleObjectFlip } from '@/components/illustration/PropertiesPanel';
import { useToast } from '@/components/illustration/Toast/useToast';
import {
  applyBooleanOperationToCanvas,
  isEmptyResultError,
  type PathfinderOperation,
} from '@/lib/illustration/canvas/boolean-operations';
import { createOffsetLine, createOffsetPath } from '@/lib/illustration/canvas/path-offset';
import { isClippingMaskGroup } from '@/lib/illustration/canvas/clipping-mask';
import { isCompoundPath } from '@/lib/illustration/canvas/compound-path';
// Note: MenuBar.css was removed - using inline styles instead

// ============================================================================
// Types
// ============================================================================

interface MenuItem {
  id: string;
  label: string;
  shortcut?: string;
  divider?: boolean;
  disabled?: boolean;
  checked?: boolean;
  action?: () => void;
  submenu?: MenuItem[];
}

interface MenuDefinition {
  id: string;
  label: string;
  items: MenuItem[];
}

// ============================================================================
// Props
// ============================================================================

interface MenuBarProps {
  /** Callback to open the export dialog */
  onOpenExportDialog?: () => void;
  /** Callback to open the document settings dialog */
  onOpenDocumentSettings?: () => void;
  /** Callback to import/place an image from file picker */
  onPlaceImage?: () => void;
  /** Callback to open the background removal tool */
  onOpenBackgroundRemoval?: () => void;
  /** Callback to open the AI generation tool */
  onOpenAIGeneration?: () => void;
  /** Callback to open the shape generator panel */
  onOpenShapeGenerator?: (shapeType?: string) => void;
}

// ============================================================================
// Component
// ============================================================================

export function MenuBar({
  onOpenExportDialog,
  onOpenDocumentSettings,
  onPlaceImage,
  onOpenBackgroundRemoval,
  onOpenAIGeneration,
  onOpenShapeGenerator,
}: MenuBarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [_isLoading, setIsLoading] = useState(false); // Used for async operations
  const menuBarRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  // Store hooks
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);
  const toggleGrid = useEditorStore((state) => state.toggleGrid);
  const toggleSnap = useEditorStore((state) => state.toggleSnap);
  const toggleRulers = useEditorStore((state) => state.toggleRulers);
  const toggleGuides = useEditorStore((state) => state.toggleGuides);
  const setZoom = useEditorStore((state) => state.setZoom);
  const resetViewport = useEditorStore((state) => state.resetViewport);
  const clearSelection = useEditorStore((state) => state.clearSelection);
  const canvas = useEditorStore((state) => state.canvas);

  const { canUndo, canRedo } = useHistoryState();
  const { zoom } = useViewport();
  const { gridVisible, snapToGrid } = useGridState();
  const { showRulers, showGuides } = useGuideState();

  // Canvas context
  const {
    clearCanvas,
    exportSVG,
    exportPNG,
    exportJSON,
    selectAll,
    deleteSelected,
    copy,
    paste,
    cut,
    groupSelected,
    ungroupSelected,
    makeClippingMask,
    releaseClippingMask,
    makeCompoundPath,
    releaseCompoundPath,
    bringToFront,
    sendToBack,
    bringForward,
    sendBackward,
    zoomToFit,
  } = useCanvas();

  const activeSelection = (canvas?.getActiveObjects() || []) as FabricObject[];
  const canMakeClippingMask = activeSelection.length >= 2;
  const canReleaseClippingMask =
    activeSelection.length === 1 && isClippingMaskGroup(activeSelection[0]);
  const canMakeCompoundPath = activeSelection.length >= 2;
  const canReleaseCompoundPath =
    activeSelection.length === 1 && isCompoundPath(activeSelection[0]);

  // ========================================================================
  // Menu Definitions
  // ========================================================================

  const menus: MenuDefinition[] = [
    {
      id: 'file',
      label: 'File',
      items: [
        {
          id: 'new',
          label: 'New',
          shortcut: 'Ctrl+N',
          action: () => {
            if (confirm('Create new document? Unsaved changes will be lost.')) {
              clearCanvas();
            }
          },
        },
        {
          id: 'open',
          label: 'Open...',
          shortcut: 'Ctrl+O',
          action: () => handleOpen(),
        },
        {
          id: 'place-image',
          label: 'Place Image...',
          shortcut: 'Ctrl+Shift+P',
          action: () => onPlaceImage?.(),
        },
        {
          id: 'document-settings',
          label: 'Canvas Size...',
          action: () => onOpenDocumentSettings?.(),
        },
        { id: 'divider1', label: '', divider: true },
        {
          id: 'save',
          label: 'Save',
          shortcut: 'Ctrl+S',
          action: () => handleSave(),
        },
        {
          id: 'save-as',
          label: 'Save As...',
          shortcut: 'Ctrl+Shift+S',
          action: () => handleSaveAs(),
        },
        { id: 'divider2', label: '', divider: true },
        {
          id: 'export-dialog',
          label: 'Export...',
          shortcut: 'Ctrl+E',
          action: () => onOpenExportDialog?.(),
        },
        {
          id: 'export',
          label: 'Quick Export',
          submenu: [
            {
              id: 'export-svg',
              label: 'Export as SVG',
              action: () => handleExport('svg'),
            },
            {
              id: 'export-png',
              label: 'Export as PNG',
              action: () => handleExport('png'),
            },
            {
              id: 'export-png-2x',
              label: 'Export as PNG @2x',
              action: () => handleExport('png-2x'),
            },
          ],
        },
        { id: 'divider3', label: '', divider: true },
        {
          id: 'recent',
          label: 'Recent Files',
          submenu: [
            { id: 'recent-1', label: 'diagram-1.finnish', disabled: true },
            { id: 'recent-2', label: 'flowchart.finnish', disabled: true },
            { id: 'recent-3', label: 'No recent files', disabled: true },
          ],
        },
      ],
    },
    {
      id: 'edit',
      label: 'Edit',
      items: [
        {
          id: 'undo',
          label: 'Undo',
          shortcut: 'Ctrl+Z',
          disabled: !canUndo,
          action: () => undo(),
        },
        {
          id: 'redo',
          label: 'Redo',
          shortcut: 'Ctrl+Y',
          disabled: !canRedo,
          action: () => redo(),
        },
        { id: 'divider1', label: '', divider: true },
        {
          id: 'cut',
          label: 'Cut',
          shortcut: 'Ctrl+X',
          action: () => cut(),
        },
        {
          id: 'copy',
          label: 'Copy',
          shortcut: 'Ctrl+C',
          action: () => copy(),
        },
        {
          id: 'paste',
          label: 'Paste',
          shortcut: 'Ctrl+V',
          action: () => paste(),
        },
        {
          id: 'delete',
          label: 'Delete',
          shortcut: 'Del',
          action: () => deleteSelected(),
        },
        { id: 'divider2', label: '', divider: true },
        {
          id: 'select-all',
          label: 'Select All',
          shortcut: 'Ctrl+A',
          action: () => selectAll(),
        },
        {
          id: 'deselect',
          label: 'Deselect',
          shortcut: 'Esc',
          action: () => clearSelection(),
        },
        { id: 'divider3', label: '', divider: true },
        {
          id: 'group',
          label: 'Group',
          shortcut: 'Ctrl+G',
          action: () => groupSelected(),
        },
        {
          id: 'ungroup',
          label: 'Ungroup',
          shortcut: 'Ctrl+Shift+G',
          action: () => ungroupSelected(),
        },
      ],
    },
    {
      id: 'view',
      label: 'View',
      items: [
        {
          id: 'zoom-in',
          label: 'Zoom In',
          shortcut: '+',
          action: () => setZoom(zoom + 0.1),
        },
        {
          id: 'zoom-out',
          label: 'Zoom Out',
          shortcut: '-',
          action: () => setZoom(zoom - 0.1),
        },
        {
          id: 'zoom-100',
          label: 'Zoom to 100%',
          shortcut: 'Ctrl+0',
          action: () => resetViewport(),
        },
        {
          id: 'zoom-fit',
          label: 'Fit to Window',
          shortcut: 'Ctrl+1',
          action: () => zoomToFit(),
        },
        { id: 'divider1', label: '', divider: true },
        {
          id: 'zoom-50',
          label: '50%',
          action: () => setZoom(0.5),
        },
        {
          id: 'zoom-100-option',
          label: '100%',
          action: () => setZoom(1),
        },
        {
          id: 'zoom-150',
          label: '150%',
          action: () => setZoom(1.5),
        },
        {
          id: 'zoom-200',
          label: '200%',
          action: () => setZoom(2),
        },
        { id: 'divider2', label: '', divider: true },
        {
          id: 'show-grid',
          label: 'Show Grid',
          shortcut: "Ctrl+'",
          checked: gridVisible,
          action: () => toggleGrid(),
        },
        {
          id: 'snap-to-grid',
          label: 'Snap to Grid',
          shortcut: 'Ctrl+Shift+;',
          checked: snapToGrid,
          action: () => toggleSnap(),
        },
        {
          id: 'show-rulers',
          label: 'Show Rulers',
          shortcut: 'Ctrl+R',
          checked: showRulers,
          action: () => toggleRulers(),
        },
        {
          id: 'show-guides',
          label: 'Show Guides',
          shortcut: 'Ctrl+Shift+R',
          checked: showGuides,
          action: () => toggleGuides(),
        },
      ],
    },
    {
      id: 'object',
      label: 'Object',
      items: [
        {
          id: 'bring-to-front',
          label: 'Bring to Front',
          shortcut: 'Ctrl+Shift+]',
          action: () => bringToFront(),
        },
        {
          id: 'bring-forward',
          label: 'Bring Forward',
          shortcut: 'Ctrl+]',
          action: () => bringForward(),
        },
        {
          id: 'send-backward',
          label: 'Send Backward',
          shortcut: 'Ctrl+[',
          action: () => sendBackward(),
        },
        {
          id: 'send-to-back',
          label: 'Send to Back',
          shortcut: 'Ctrl+Shift+[',
          action: () => sendToBack(),
        },
        { id: 'divider1', label: '', divider: true },
        {
          id: 'flip-horizontal',
          label: 'Flip Horizontal',
          shortcut: 'Shift+H',
          action: () => handleFlipSelection('horizontal'),
        },
        {
          id: 'flip-vertical',
          label: 'Flip Vertical',
          shortcut: 'Shift+V',
          action: () => handleFlipSelection('vertical'),
        },
        { id: 'divider-flip', label: '', divider: true },
        {
          id: 'group',
          label: 'Group',
          shortcut: 'Ctrl+G',
          action: () => groupSelected(),
        },
        {
          id: 'ungroup',
          label: 'Ungroup',
          shortcut: 'Ctrl+Shift+G',
          action: () => ungroupSelected(),
        },
        {
          id: 'make-clipping-mask',
          label: 'Make Clipping Mask',
          shortcut: 'Ctrl+7',
          disabled: !canMakeClippingMask,
          action: () => handleMakeClippingMask(),
        },
        {
          id: 'release-clipping-mask',
          label: 'Release Clipping Mask',
          shortcut: 'Ctrl+Alt+7',
          disabled: !canReleaseClippingMask,
          action: () => handleReleaseClippingMask(),
        },
        {
          id: 'make-compound-path',
          label: 'Make Compound Path',
          shortcut: 'Ctrl+8',
          disabled: !canMakeCompoundPath,
          action: () => handleMakeCompoundPath(),
        },
        {
          id: 'release-compound-path',
          label: 'Release Compound Path',
          shortcut: 'Ctrl+Alt+8',
          disabled: !canReleaseCompoundPath,
          action: () => handleReleaseCompoundPath(),
        },
        { id: 'divider-path', label: '', divider: true },
        {
          id: 'path',
          label: 'Path',
          submenu: [
            {
              id: 'offset-path',
              label: 'Offset Path...',
              action: () => handleOffsetPath(),
            },
          ],
        },
        { id: 'divider2', label: '', divider: true },
        {
          id: 'pathfinder',
          label: 'Pathfinder',
          submenu: [
            {
              id: 'pathfinder-unite',
              label: 'Unite',
              action: () => handlePathfinderOperation('unite'),
            },
            {
              id: 'pathfinder-subtract',
              label: 'Subtract',
              action: () => handlePathfinderOperation('subtract'),
            },
            {
              id: 'pathfinder-intersect',
              label: 'Intersect',
              action: () => handlePathfinderOperation('intersect'),
            },
            {
              id: 'pathfinder-exclude',
              label: 'Exclude',
              action: () => handlePathfinderOperation('exclude'),
            },
          ],
        },
      ],
    },
    {
      id: 'insert',
      label: 'Insert',
      items: [
        {
          id: 'scientific-shapes',
          label: 'Scientific Shapes',
          submenu: [
            {
              id: 'shape-dna',
              label: 'DNA Helix',
              shortcut: 'Ctrl+Shift+D',
              action: () => onOpenShapeGenerator?.('dna'),
            },
            {
              id: 'shape-membrane',
              label: 'Cell Membrane',
              shortcut: 'Ctrl+Shift+M',
              action: () => onOpenShapeGenerator?.('membrane'),
            },
            {
              id: 'shape-cell-layer',
              label: 'Cell Layer / Tissue',
              action: () => onOpenShapeGenerator?.('cellLayer'),
            },
            {
              id: 'shape-neuron',
              label: 'Neuron',
              action: () => onOpenShapeGenerator?.('neuron'),
            },
            {
              id: 'shape-mitochondria',
              label: 'Mitochondria',
              action: () => onOpenShapeGenerator?.('mitochondria'),
            },
            { id: 'divider1', label: '', divider: true },
            {
              id: 'shape-pathway-arrow',
              label: 'Pathway Arrows',
              action: () => onOpenShapeGenerator?.('arrow'),
            },
          ],
        },
        { id: 'divider1', label: '', divider: true },
        {
          id: 'all-shapes',
          label: 'All Scientific Shapes...',
          shortcut: 'Ctrl+Shift+S',
          action: () => onOpenShapeGenerator?.(),
        },
      ],
    },
    {
      id: 'image',
      label: 'Image',
      items: [
        {
          id: 'ai-generate',
          label: 'AI Generate Image...',
          shortcut: 'Ctrl+Shift+A',
          action: () => onOpenAIGeneration?.(),
        },
        {
          id: 'remove-background',
          label: 'Remove Background...',
          shortcut: 'Ctrl+Shift+B',
          action: () => onOpenBackgroundRemoval?.(),
        },
        { id: 'divider1', label: '', divider: true },
        {
          id: 'crop',
          label: 'Crop Image',
          disabled: true,
        },
        {
          id: 'resize',
          label: 'Resize Image',
          disabled: true,
        },
        { id: 'divider2', label: '', divider: true },
        {
          id: 'adjustments',
          label: 'Adjustments',
          submenu: [
            { id: 'brightness', label: 'Brightness/Contrast', disabled: true },
            { id: 'hue-saturation', label: 'Hue/Saturation', disabled: true },
            { id: 'levels', label: 'Levels', disabled: true },
          ],
        },
        {
          id: 'filters',
          label: 'Filters',
          submenu: [
            { id: 'blur', label: 'Blur', disabled: true },
            { id: 'sharpen', label: 'Sharpen', disabled: true },
            { id: 'noise', label: 'Add Noise', disabled: true },
          ],
        },
      ],
    },
    {
      id: 'help',
      label: 'Help',
      items: [
        {
          id: 'keyboard-shortcuts',
          label: 'Keyboard Shortcuts',
          shortcut: 'Ctrl+/',
          action: () => handleShowShortcuts(),
        },
        {
          id: 'documentation',
          label: 'Documentation',
          action: () => window.open('https://finnish.dev/docs', '_blank'),
        },
        { id: 'divider1', label: '', divider: true },
        {
          id: 'about',
          label: 'About FINNISH',
          action: () => handleShowAbout(),
        },
      ],
    },
  ];

  // ========================================================================
  // Handlers
  // ========================================================================

  const handleOpen = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.finnish,.json,.svg';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setIsLoading(true);
        toast.info(`Loading "${file.name}"...`);
        try {
          const text = await file.text();
          const json = JSON.parse(text);
          if (canvas) {
            canvas.loadFromJSON(json, () => {
              canvas.renderAll();
              setIsLoading(false);
              toast.success(`Opened "${file.name}" successfully`);
            });
          } else {
            setIsLoading(false);
            toast.error('Canvas not ready. Please try again.');
          }
        } catch {
          setIsLoading(false);
          toast.error('Invalid file format. Please select a valid .finnish, .json, or .svg file.');
        }
      }
    };
    input.click();
  }, [canvas, toast]);

  const handleSave = useCallback(() => {
    try {
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
      toast.success('Diagram saved as "diagram.finnish"');
    } catch (error) {
      console.error('Save failed:', error);
      toast.error('Failed to save diagram. Please try again.');
    }
  }, [exportJSON, toast]);

  const handleSaveAs = useCallback(() => {
    const filename = prompt('Enter filename:', 'diagram.finnish');
    if (filename) {
      try {
        const json = exportJSON();
        const blob = new Blob([JSON.stringify(json, null, 2)], {
          type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const finalFilename = filename.endsWith('.finnish') ? filename : `${filename}.finnish`;
        a.download = finalFilename;
        a.click();
        URL.revokeObjectURL(url);
        toast.success(`Saved as "${finalFilename}"`);
      } catch (error) {
        console.error('Save As failed:', error);
        toast.error('Failed to save diagram. Please try again.');
      }
    }
  }, [exportJSON, toast]);

  const handleExport = useCallback(
    (format: 'svg' | 'png' | 'png-2x') => {
      try {
        if (format === 'svg') {
          const svg = exportSVG();
          const blob = new Blob([svg], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'diagram.svg';
          a.click();
          URL.revokeObjectURL(url);
          toast.success('Exported as SVG');
        } else if (format === 'png' || format === 'png-2x') {
          const multiplier = format === 'png-2x' ? 2 : 1;
          const dataUrl = exportPNG(multiplier);
          const a = document.createElement('a');
          a.href = dataUrl;
          const filename = `diagram${format === 'png-2x' ? '@2x' : ''}.png`;
          a.download = filename;
          a.click();
          toast.success(`Exported as ${format === 'png-2x' ? 'PNG @2x' : 'PNG'}`);
        }
      } catch (error) {
        console.error('Export failed:', error);
        toast.error('Export failed. Please try again.');
      }
    },
    [exportSVG, exportPNG, toast]
  );

  const handleShowShortcuts = useCallback(() => {
    toast.info(
      'Shortcuts: V=Select, H=Hand, R=Rect, E=Ellipse, Shift+E=Eraser, C=Scissors, M=Measure, L=Line, T=Text | ' +
        'Ctrl+Z=Undo, Ctrl+Y=Redo, Ctrl+C/V/X=Copy/Paste/Cut | ' +
        'Ctrl+G=Group, Shift+H/V=Flip H/V, +/-=Zoom, Space+Drag=Pan',
      10000 // Show for 10 seconds
    );
  }, [toast]);

  const handleShowAbout = useCallback(() => {
    toast.info(
      'FINNISH v0.1.0 - AI-Powered Scientific Illustration Tool. ' +
        'Built with React, Fabric.js, and Zustand.',
      8000 // Show for 8 seconds
    );
  }, [toast]);

  const handleFlipSelection = useCallback(
    (direction: 'horizontal' | 'vertical') => {
      if (!canvas) {
        toast.error('Canvas not ready');
        return;
      }

      const activeObjects = canvas.getActiveObjects() as FabricObject[];
      if (activeObjects.length === 0) {
        toast.warning('Select at least 1 object to flip');
        return;
      }

      activeObjects.forEach((object) => {
        toggleObjectFlip(
          object as FabricObject & { set: (values: Record<string, unknown>) => unknown; flipX?: boolean; flipY?: boolean },
          direction
        );
        object.setCoords();
      });

      canvas.requestRenderAll();
      canvas.fire('object:modified', { target: activeObjects[0] });
    },
    [canvas, toast]
  );

  const handlePathfinderOperation = useCallback(
    (operation: PathfinderOperation) => {
      if (!canvas) {
        toast.error('Canvas not ready');
        return;
      }

      const selectedObjects = canvas.getActiveObjects() as FabricObject[];
      if (selectedObjects.length < 2) {
        toast.warning('Select at least 2 objects for pathfinder operations');
        return;
      }

      try {
        applyBooleanOperationToCanvas(canvas, selectedObjects, operation);
      } catch (error) {
        if (isEmptyResultError(error)) {
          toast.error('Operation produced no result');
          return;
        }

        const message = error instanceof Error ? error.message : '';
        if (/convert|unsupported object type|path-compatible children|invalid radius/i.test(message)) {
          toast.error('Unable to convert one or more selected objects for pathfinder');
          return;
        }

        toast.error(message || 'Pathfinder operation failed');
      }
    },
    [canvas, toast]
  );

  const handleOffsetPath = useCallback(() => {
    if (!canvas) {
      toast.error('Canvas not ready');
      return;
    }

    const selected = canvas.getActiveObjects() as FabricObject[];
    if (selected.length !== 1) {
      toast.warning('Select exactly 1 path or line');
      return;
    }

    const rawValue = prompt('Offset distance in pixels (positive = outward, negative = inward):', '10');
    if (rawValue === null) {
      return;
    }

    const distance = Number.parseFloat(rawValue);
    if (!Number.isFinite(distance)) {
      toast.error('Enter a valid numeric offset distance');
      return;
    }

    const source = selected[0];
    let offsetObject: FabricObject | null = null;

    if (source instanceof FabricPath) {
      offsetObject = createOffsetPath(source, distance) as FabricObject | null;
    } else if (source instanceof Line) {
      offsetObject = createOffsetLine(source, distance) as FabricObject | null;
    } else {
      toast.warning('Offset Path currently supports Path and Line objects');
      return;
    }

    if (!offsetObject) {
      toast.error('Failed to generate offset path');
      return;
    }

    canvas.add(offsetObject);
    canvas.setActiveObject(offsetObject);
    canvas.requestRenderAll();
    canvas.fire('object:modified', { target: offsetObject });
    toast.success(`Offset path created (${distance}px)`);
  }, [canvas, toast]);

  const handleMakeClippingMask = useCallback(() => {
    void (async () => {
      if (!canvas) {
        toast.error('Canvas not ready');
        return;
      }

      const success = await makeClippingMask();
      if (!success) {
        toast.warning('Select at least 2 objects. Topmost object will be used as clip shape.');
        return;
      }

      toast.success('Clipping mask created');
    })();
  }, [canvas, makeClippingMask, toast]);

  const handleReleaseClippingMask = useCallback(() => {
    void (async () => {
      if (!canvas) {
        toast.error('Canvas not ready');
        return;
      }

      const success = await releaseClippingMask();
      if (!success) {
        toast.warning('Select a clipped group to release its clipping mask.');
        return;
      }

      toast.success('Clipping mask released');
    })();
  }, [canvas, releaseClippingMask, toast]);

  const handleMakeCompoundPath = useCallback(() => {
    if (!canvas) {
      toast.error('Canvas not ready');
      return;
    }

    const success = makeCompoundPath();
    if (!success) {
      toast.warning('Select at least 2 paths to create a compound path.');
      return;
    }

    toast.success('Compound path created');
  }, [canvas, makeCompoundPath, toast]);

  const handleReleaseCompoundPath = useCallback(() => {
    if (!canvas) {
      toast.error('Canvas not ready');
      return;
    }

    const success = releaseCompoundPath();
    if (!success) {
      toast.warning('Select a compound path to release it.');
      return;
    }

    toast.success('Compound path released');
  }, [canvas, releaseCompoundPath, toast]);

  // ========================================================================
  // Click Outside Handler
  // ========================================================================

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuBarRef.current &&
        !menuBarRef.current.contains(e.target as Node)
      ) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ========================================================================
  // Render Menu Item
  // ========================================================================

  const renderMenuItem = (item: MenuItem) => {
    if (item.divider) {
      return <div key={item.id} className="menu-divider" />;
    }

    if (item.submenu) {
      return (
        <div key={item.id} className="menu-item has-submenu">
          <span className="menu-item-label">{item.label}</span>
          <span className="menu-item-arrow">
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path
                d="M4 2L8 6L4 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </span>
          <div className="submenu">
            {item.submenu.map((subItem) => renderMenuItem(subItem))}
          </div>
        </div>
      );
    }

    return (
      <button
        key={item.id}
        className={`menu-item ${item.disabled ? 'disabled' : ''} ${
          item.checked ? 'checked' : ''
        }`}
        onClick={() => {
          if (!item.disabled && item.action) {
            item.action();
            setActiveMenu(null);
          }
        }}
        disabled={item.disabled}
      >
        {item.checked !== undefined && (
          <span className="menu-item-check">
            {item.checked && (
              <svg width="12" height="12" viewBox="0 0 12 12">
                <path
                  d="M2 6L5 9L10 3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            )}
          </span>
        )}
        <span className="menu-item-label">{item.label}</span>
        {item.shortcut && (
          <span className="menu-item-shortcut">{item.shortcut}</span>
        )}
      </button>
    );
  };

  // ========================================================================
  // Render
  // ========================================================================

  return (
    <div className="menu-bar" ref={menuBarRef}>
      {menus.map((menu) => (
        <div
          key={menu.id}
          className={`menu-trigger ${activeMenu === menu.id ? 'active' : ''}`}
          onMouseEnter={() => activeMenu && setActiveMenu(menu.id)}
          onClick={() =>
            setActiveMenu(activeMenu === menu.id ? null : menu.id)
          }
        >
          <span>{menu.label}</span>
          {activeMenu === menu.id && (
            <div className="menu-dropdown">
              {menu.items.map((item) => renderMenuItem(item))}
            </div>
          )}
        </div>
      ))}

      <div className="menu-bar-spacer" />

      {/* Quick action buttons */}
      <button
        className="menu-action-btn"
        onClick={() => canUndo && undo()}
        disabled={!canUndo}
        title="Undo (Ctrl+Z)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 7v6h6" />
          <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
        </svg>
      </button>
      <button
        className="menu-action-btn"
        onClick={() => canRedo && redo()}
        disabled={!canRedo}
        title="Redo (Ctrl+Y)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 7v6h-6" />
          <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
        </svg>
      </button>
    </div>
  );
}

export default MenuBar;
