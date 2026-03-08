/**
 * Keyboard Shortcuts Hook
 * Handles global keyboard shortcuts for the FINNISH editor
 *
 * @module hooks/useKeyboardShortcuts
 */

import { useEffect, useCallback, useMemo, useRef } from 'react';
import { FabricObject } from 'fabric';
import { toggleObjectFlip } from '@/components/illustration/PropertiesPanel';
import { useEditorStore, useHistoryState } from '@/stores/illustration/editorStore';
import { ToolType } from '@/lib/illustration/types/index';
import {
  makeClippingMask as applyClippingMask,
  releaseClippingMask as applyReleaseClippingMask,
} from '@/lib/illustration/canvas/clipping-mask';
import {
  makeCompoundPath as applyCompoundPath,
  releaseCompoundPath as applyReleaseCompoundPath,
} from '@/lib/illustration/canvas/compound-path';

// ============================================================================
// Types
// ============================================================================

export interface ShortcutConfig {
  /** Key to press (case insensitive) */
  key: string;
  /** Requires Ctrl/Cmd modifier */
  ctrlOrCmd?: boolean;
  /** Requires Shift modifier */
  shift?: boolean;
  /** Requires Alt/Option modifier */
  alt?: boolean;
  /** Handler function */
  handler: () => void;
  /** Description for help menu */
  description: string;
  /** Category for grouping in help menu */
  category: 'edit' | 'tool' | 'view' | 'file' | 'object';
  /** Whether to prevent default browser behavior */
  preventDefault?: boolean;
}

export interface UseKeyboardShortcutsOptions {
  /** Whether shortcuts are enabled */
  enabled?: boolean;
  /** Custom shortcuts to add */
  customShortcuts?: ShortcutConfig[];
  /** Callback when hand tool is activated via space */
  onSpaceDown?: () => void;
  /** Callback when space is released */
  onSpaceUp?: () => void;
  // File operation callbacks
  /** Callback for New (Ctrl+N) */
  onNew?: () => void;
  /** Callback for Open (Ctrl+O) */
  onOpen?: () => void;
  /** Callback for Save (Ctrl+S) */
  onSave?: () => void;
  /** Callback for Save As (Ctrl+Shift+S) */
  onSaveAs?: () => void;
  /** Callback for Export (Ctrl+E) */
  onExport?: () => void;
  /** Callback for opening background removal (Ctrl+Shift+B) */
  onOpenBackgroundRemoval?: () => void;
  /** Callback for opening AI generation (Ctrl+Shift+A) */
  onOpenAIGeneration?: () => void;
  /** Callback for placing/importing an image (Ctrl+Shift+P) */
  onPlaceImage?: () => void;
  /** Callback for zoom to fit (Ctrl+1) */
  onZoomToFit?: () => void;
  /** Callback for toggling rulers (Ctrl+R) */
  onToggleRulers?: () => void;
  /** Callback for toggling guides (Ctrl+Shift+R) */
  onToggleGuides?: () => void;
}

// ============================================================================
// Hook
// ============================================================================

export function useKeyboardShortcuts(options: UseKeyboardShortcutsOptions = {}) {
  const {
    enabled = true,
    customShortcuts = [],
    onSpaceDown,
    onSpaceUp,
    onNew,
    onOpen,
    onSave,
    onSaveAs,
    onExport,
    onOpenBackgroundRemoval,
    onOpenAIGeneration,
    onPlaceImage,
    onZoomToFit: _onZoomToFit,
    onToggleRulers,
    onToggleGuides,
  } = options;
  // Wrap in a stable reference to satisfy TypeScript unused variable check
  const onZoomToFit = _onZoomToFit;

  // Store hooks
  const setActiveTool = useEditorStore((state) => state.setActiveTool);
  const activeTool = useEditorStore((state) => state.activeTool);
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);
  const clearSelection = useEditorStore((state) => state.clearSelection);
  const setZoom = useEditorStore((state) => state.setZoom);
  const zoom = useEditorStore((state) => state.zoom);
  const resetViewport = useEditorStore((state) => state.resetViewport);
  const toggleGrid = useEditorStore((state) => state.toggleGrid);
  const toggleSnap = useEditorStore((state) => state.toggleSnap);
  const toggleRulers = useEditorStore((state) => state.toggleRulers);
  const toggleGuides = useEditorStore((state) => state.toggleGuides);
  const canvas = useEditorStore((state) => state.canvas);

  const { canUndo, canRedo } = useHistoryState();

  // Track space key state for pan tool
  const spaceRef = useRef(false);
  const previousToolRef = useRef<ToolType>(ToolType.SELECT);

  // ========================================================================
  // Canvas Operations
  // ========================================================================

  const deleteSelected = useCallback(() => {
    if (!canvas || activeTool === ToolType.DIRECT_SELECT) return;
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length > 0) {
      activeObjects.forEach((obj: unknown) => canvas.remove(obj as FabricObject));
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  }, [activeTool, canvas]);

  const selectAll = useCallback(() => {
    if (!canvas) return;
    canvas.discardActiveObject();
    const objects = canvas.getObjects().filter((obj: FabricObject) => {
      return !((obj as FabricObject & { isGrid?: boolean }).isGrid);
    });
    if (objects.length > 0) {
      // @ts-expect-error ActiveSelection not in types
      const selection = new window.fabric.ActiveSelection(objects, { canvas });
      canvas.setActiveObject(selection);
      canvas.renderAll();
    }
  }, [canvas]);

  const copySelected = useCallback(() => {
    if (!canvas) return;
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length > 0) {
      // Store in global clipboard
      (window as unknown as { __finnishClipboard: unknown[] }).__finnishClipboard = activeObjects.map((obj: FabricObject) =>
        obj.toObject()
      );
    }
  }, [canvas]);

  const pasteClipboard = useCallback(() => {
    if (!canvas) return;
    const clipboardData = (window as unknown as { __finnishClipboard?: unknown[] }).__finnishClipboard;
    if (!clipboardData || clipboardData.length === 0) return;

    clipboardData.forEach((objData: unknown) => {
      // @ts-expect-error fabric global types
      window.fabric.util.enlivenObjects([objData], (objects: FabricObject[]) => {
        objects.forEach((obj: FabricObject) => {
          obj.set({
            left: (obj.left || 0) + 20,
            top: (obj.top || 0) + 20,
          });
          canvas.add(obj);
        });
        canvas.renderAll();
      });
    });
  }, [canvas]);

  const cutSelected = useCallback(() => {
    copySelected();
    deleteSelected();
  }, [copySelected, deleteSelected]);

  const groupSelected = useCallback(() => {
    if (!canvas) return;
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length < 2) return;

    // @ts-expect-error fabric global types
    const group = new window.fabric.Group(activeObjects, { name: 'Group' });
    activeObjects.forEach((obj: FabricObject) => canvas.remove(obj));
    canvas.add(group);
    canvas.setActiveObject(group);
    canvas.renderAll();
  }, [canvas]);

  const ungroupSelected = useCallback(() => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject || activeObject.type !== 'group') return;

    const items = (activeObject as unknown as { _objects: FabricObject[] })._objects.slice();
    (activeObject as unknown as { _restoreObjectsState: () => void })._restoreObjectsState();
    canvas.remove(activeObject);
    items.forEach((item: FabricObject) => canvas.add(item));
    canvas.discardActiveObject();
    canvas.renderAll();
  }, [canvas]);

  const makeClippingMask = useCallback(() => {
    if (!canvas) return;

    void (async () => {
      const result = await applyClippingMask(canvas);
      if (!result.success || !result.group) return;

      canvas.requestRenderAll();
      canvas.fire('object:modified', { target: result.group });
    })();
  }, [canvas]);

  const releaseClippingMask = useCallback(() => {
    if (!canvas) return;

    void (async () => {
      const result = await applyReleaseClippingMask(canvas);
      if (!result.success) return;

      const historyTarget = result.clipShape ?? result.releasedObjects?.[0];
      canvas.requestRenderAll();
      if (historyTarget) {
        canvas.fire('object:modified', { target: historyTarget });
      }
    })();
  }, [canvas]);

  const makeCompoundPathAction = useCallback(() => {
    if (!canvas) return;

    const result = applyCompoundPath(canvas);
    if (!result.success || !result.compoundPath) return;

    canvas.requestRenderAll();
    canvas.fire('object:modified', { target: result.compoundPath });
  }, [canvas]);

  const releaseCompoundPathAction = useCallback(() => {
    if (!canvas) return;

    const result = applyReleaseCompoundPath(canvas);
    if (!result.success) return;

    const historyTarget = result.releasedPaths?.[0];
    canvas.requestRenderAll();
    if (historyTarget) {
      canvas.fire('object:modified', { target: historyTarget });
    }
  }, [canvas]);

  const flipHorizontal = useCallback(() => {
    if (!canvas) return;
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length === 0) return;

    activeObjects.forEach((object: unknown) => {
      const obj = object as FabricObject & {
        set: (values: Record<string, unknown>) => unknown;
        flipX?: boolean;
        flipY?: boolean;
      };
      toggleObjectFlip(obj, 'horizontal');
      obj.setCoords();
    });

    canvas.requestRenderAll();
    canvas.fire('object:modified', { target: activeObjects[0] as FabricObject });
  }, [canvas]);

  const flipVertical = useCallback(() => {
    if (!canvas) return;
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length === 0) return;

    activeObjects.forEach((object: unknown) => {
      const obj = object as FabricObject & {
        set: (values: Record<string, unknown>) => unknown;
        flipX?: boolean;
        flipY?: boolean;
      };
      toggleObjectFlip(obj, 'vertical');
      obj.setCoords();
    });

    canvas.requestRenderAll();
    canvas.fire('object:modified', { target: activeObjects[0] as FabricObject });
  }, [canvas]);

  // ========================================================================
  // Default Shortcuts
  // ========================================================================

  const defaultShortcuts: ShortcutConfig[] = [
    // File shortcuts
    {
      key: 'n',
      ctrlOrCmd: true,
      handler: () => onNew?.(),
      description: 'New',
      category: 'file',
      preventDefault: true,
    },
    {
      key: 'o',
      ctrlOrCmd: true,
      handler: () => onOpen?.(),
      description: 'Open',
      category: 'file',
      preventDefault: true,
    },
    {
      key: 's',
      ctrlOrCmd: true,
      handler: () => onSave?.(),
      description: 'Save',
      category: 'file',
      preventDefault: true,
    },
    {
      key: 's',
      ctrlOrCmd: true,
      shift: true,
      handler: () => onSaveAs?.(),
      description: 'Save As',
      category: 'file',
      preventDefault: true,
    },
    {
      key: 'e',
      ctrlOrCmd: true,
      handler: () => onExport?.(),
      description: 'Export',
      category: 'file',
      preventDefault: true,
    },
    // Image shortcuts
    {
      key: 'b',
      ctrlOrCmd: true,
      shift: true,
      handler: () => onOpenBackgroundRemoval?.(),
      description: 'Remove Background',
      category: 'edit',
      preventDefault: true,
    },
    {
      key: 'a',
      ctrlOrCmd: true,
      shift: true,
      handler: () => onOpenAIGeneration?.(),
      description: 'AI Generate Image',
      category: 'edit',
      preventDefault: true,
    },
    {
      key: 'p',
      ctrlOrCmd: true,
      shift: true,
      handler: () => onPlaceImage?.(),
      description: 'Place Image',
      category: 'file',
      preventDefault: true,
    },
    // Edit shortcuts
    {
      key: 'z',
      ctrlOrCmd: true,
      handler: () => canUndo && undo(),
      description: 'Undo',
      category: 'edit',
      preventDefault: true,
    },
    {
      key: 'z',
      ctrlOrCmd: true,
      shift: true,
      handler: () => canRedo && redo(),
      description: 'Redo',
      category: 'edit',
      preventDefault: true,
    },
    {
      key: 'y',
      ctrlOrCmd: true,
      handler: () => canRedo && redo(),
      description: 'Redo',
      category: 'edit',
      preventDefault: true,
    },
    {
      key: 'c',
      ctrlOrCmd: true,
      handler: copySelected,
      description: 'Copy',
      category: 'edit',
      preventDefault: true,
    },
    {
      key: 'v',
      ctrlOrCmd: true,
      handler: pasteClipboard,
      description: 'Paste',
      category: 'edit',
      preventDefault: true,
    },
    {
      key: 'x',
      ctrlOrCmd: true,
      handler: cutSelected,
      description: 'Cut',
      category: 'edit',
      preventDefault: true,
    },
    {
      key: 'a',
      ctrlOrCmd: true,
      handler: selectAll,
      description: 'Select All',
      category: 'edit',
      preventDefault: true,
    },
    {
      key: 'Delete',
      handler: deleteSelected,
      description: 'Delete Selected',
      category: 'edit',
    },
    {
      key: 'Backspace',
      handler: deleteSelected,
      description: 'Delete Selected',
      category: 'edit',
    },

    // Tool shortcuts
    {
      key: 'v',
      handler: () => setActiveTool(ToolType.SELECT),
      description: 'Select Tool',
      category: 'tool',
    },
    {
      key: 'h',
      handler: () => setActiveTool(ToolType.HAND),
      description: 'Hand Tool',
      category: 'tool',
    },
    {
      key: 'r',
      handler: () => setActiveTool(ToolType.RECTANGLE),
      description: 'Rectangle Tool',
      category: 'tool',
    },
    {
      key: 'e',
      handler: () => setActiveTool(ToolType.ELLIPSE),
      description: 'Ellipse Tool',
      category: 'tool',
    },
    {
      key: 'e',
      shift: true,
      handler: () => setActiveTool(ToolType.ERASER),
      description: 'Eraser Tool',
      category: 'tool',
    },
    {
      key: 'l',
      handler: () => setActiveTool(ToolType.LINE),
      description: 'Line Tool',
      category: 'tool',
    },
    {
      key: 'a',
      handler: () => setActiveTool(ToolType.DIRECT_SELECT),
      description: 'Direct Select Tool',
      category: 'tool',
    },
    {
      key: 'a',
      shift: true,
      handler: () => setActiveTool(ToolType.ARROW),
      description: 'Arrow Tool',
      category: 'tool',
    },
    {
      key: 'p',
      handler: () => setActiveTool(ToolType.PEN),
      description: 'Pen Tool',
      category: 'tool',
    },
    {
      key: 't',
      handler: () => setActiveTool(ToolType.TEXT),
      description: 'Text Tool',
      category: 'tool',
    },
    {
      key: 'i',
      handler: () => setActiveTool(ToolType.EYEDROPPER),
      description: 'Eyedropper Tool',
      category: 'tool',
    },
    {
      key: 'c',
      handler: () => setActiveTool(ToolType.SCISSORS),
      description: 'Scissors Tool',
      category: 'tool',
    },
    {
      key: 'm',
      handler: () => setActiveTool(ToolType.MEASURE),
      description: 'Measure Tool',
      category: 'tool',
    },
    {
      key: '1',
      handler: () => setActiveTool(ToolType.SELECT),
      description: 'Select Tool',
      category: 'tool',
    },
    {
      key: '2',
      handler: () => setActiveTool(ToolType.HAND),
      description: 'Hand Tool',
      category: 'tool',
    },
    {
      key: '3',
      handler: () => setActiveTool(ToolType.RECTANGLE),
      description: 'Rectangle Tool',
      category: 'tool',
    },
    {
      key: '4',
      handler: () => setActiveTool(ToolType.ELLIPSE),
      description: 'Ellipse Tool',
      category: 'tool',
    },
    {
      key: '5',
      handler: () => setActiveTool(ToolType.LINE),
      description: 'Line Tool',
      category: 'tool',
    },
    {
      key: '6',
      handler: () => setActiveTool(ToolType.ARROW),
      description: 'Arrow Tool',
      category: 'tool',
    },
    {
      key: '7',
      handler: () => setActiveTool(ToolType.PEN),
      description: 'Pen Tool',
      category: 'tool',
    },
    {
      key: '8',
      handler: () => setActiveTool(ToolType.TEXT),
      description: 'Text Tool',
      category: 'tool',
    },

    // View shortcuts
    {
      key: '+',
      handler: () => setZoom(zoom + 0.1),
      description: 'Zoom In',
      category: 'view',
    },
    {
      key: '=',
      handler: () => setZoom(zoom + 0.1),
      description: 'Zoom In',
      category: 'view',
    },
    {
      key: '-',
      handler: () => setZoom(zoom - 0.1),
      description: 'Zoom Out',
      category: 'view',
    },
    {
      key: '0',
      ctrlOrCmd: true,
      handler: resetViewport,
      description: 'Reset Zoom',
      category: 'view',
      preventDefault: true,
    },
    {
      key: '1',
      ctrlOrCmd: true,
      handler: () => onZoomToFit?.(),
      description: 'Fit to Window',
      category: 'view',
      preventDefault: true,
    },
    {
      key: "'",
      ctrlOrCmd: true,
      handler: toggleGrid,
      description: 'Toggle Grid',
      category: 'view',
      preventDefault: true,
    },
    {
      key: ';',
      ctrlOrCmd: true,
      shift: true,
      handler: toggleSnap,
      description: 'Toggle Snap to Grid',
      category: 'view',
      preventDefault: true,
    },
    {
      key: 'r',
      ctrlOrCmd: true,
      handler: () => {
        if (onToggleRulers) {
          onToggleRulers();
          return;
        }
        toggleRulers();
      },
      description: 'Toggle Rulers',
      category: 'view',
      preventDefault: true,
    },
    {
      key: 'r',
      ctrlOrCmd: true,
      shift: true,
      handler: () => {
        if (onToggleGuides) {
          onToggleGuides();
          return;
        }
        toggleGuides();
      },
      description: 'Toggle Guides',
      category: 'view',
      preventDefault: true,
    },

    // Object shortcuts
    {
      key: 'g',
      ctrlOrCmd: true,
      handler: groupSelected,
      description: 'Group',
      category: 'object',
      preventDefault: true,
    },
    {
      key: 'g',
      ctrlOrCmd: true,
      shift: true,
      handler: ungroupSelected,
      description: 'Ungroup',
      category: 'object',
      preventDefault: true,
    },
    {
      key: '7',
      ctrlOrCmd: true,
      handler: makeClippingMask,
      description: 'Make Clipping Mask',
      category: 'object',
      preventDefault: true,
    },
    {
      key: '7',
      ctrlOrCmd: true,
      alt: true,
      handler: releaseClippingMask,
      description: 'Release Clipping Mask',
      category: 'object',
      preventDefault: true,
    },
    {
      key: '8',
      ctrlOrCmd: true,
      handler: makeCompoundPathAction,
      description: 'Make Compound Path',
      category: 'object',
      preventDefault: true,
    },
    {
      key: '8',
      ctrlOrCmd: true,
      alt: true,
      handler: releaseCompoundPathAction,
      description: 'Release Compound Path',
      category: 'object',
      preventDefault: true,
    },
    {
      key: 'h',
      shift: true,
      handler: flipHorizontal,
      description: 'Flip Horizontal',
      category: 'object',
      preventDefault: true,
    },
    {
      key: 'v',
      shift: true,
      handler: flipVertical,
      description: 'Flip Vertical',
      category: 'object',
      preventDefault: true,
    },
    {
      key: 'Escape',
      handler: clearSelection,
      description: 'Deselect',
      category: 'edit',
    },
  ];

  // Combine default and custom shortcuts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allShortcuts = useMemo(() => [...defaultShortcuts, ...customShortcuts], [customShortcuts]);

  // ========================================================================
  // Key Down Handler
  // ========================================================================

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      // Ignore if typing in input/textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      // Handle space key for temporary hand tool
      if (e.code === 'Space' && !e.repeat && !spaceRef.current) {
        e.preventDefault();
        spaceRef.current = true;
        previousToolRef.current = activeTool;
        setActiveTool(ToolType.HAND);
        if (onSpaceDown) onSpaceDown();
        return;
      }

      // Check for matching shortcut
      const key = e.key.toLowerCase();
      const ctrlOrCmd = e.ctrlKey || e.metaKey;
      const shift = e.shiftKey;
      const alt = e.altKey;

      for (const shortcut of allShortcuts) {
        const matchesKey = shortcut.key.toLowerCase() === key;
        const matchesCtrl = (shortcut.ctrlOrCmd || false) === ctrlOrCmd;
        const matchesShift = (shortcut.shift || false) === shift;
        const matchesAlt = (shortcut.alt || false) === alt;

        // For tool shortcuts, don't activate if ctrlOrCmd is pressed
        if (
          shortcut.category === 'tool' &&
          !shortcut.ctrlOrCmd &&
          ctrlOrCmd
        ) {
          continue;
        }

        if (matchesKey && matchesCtrl && matchesShift && matchesAlt) {
          if (shortcut.preventDefault !== false) {
            e.preventDefault();
          }
          shortcut.handler();
          return;
        }
      }
    },
    [enabled, activeTool, setActiveTool, allShortcuts, onSpaceDown]
  );

  // ========================================================================
  // Key Up Handler
  // ========================================================================

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      // Handle space key release - return to previous tool
      if (e.code === 'Space' && spaceRef.current) {
        spaceRef.current = false;
        setActiveTool(previousToolRef.current);
        if (onSpaceUp) onSpaceUp();
      }
    },
    [enabled, setActiveTool, onSpaceUp]
  );

  // ========================================================================
  // Effect
  // ========================================================================

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [enabled, handleKeyDown, handleKeyUp]);

  // ========================================================================
  // Return
  // ========================================================================

  return {
    /** All registered shortcuts */
    shortcuts: allShortcuts,
    /** Whether shortcuts are currently enabled */
    enabled,
    /** Whether space key is currently pressed */
     
    isSpacePressed: spaceRef.current,
  };
}

// ============================================================================
// Utility: Get Shortcut Display String
// ============================================================================

/**
 * Get display string for a shortcut (e.g., "Ctrl+Z" or "Cmd+Z")
 */
export function getShortcutDisplayString(shortcut: ShortcutConfig): string {
  const isMac =
    typeof navigator !== 'undefined' &&
    navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  const parts: string[] = [];

  if (shortcut.ctrlOrCmd) {
    parts.push(isMac ? 'Cmd' : 'Ctrl');
  }
  if (shortcut.alt) {
    parts.push(isMac ? 'Option' : 'Alt');
  }
  if (shortcut.shift) {
    parts.push('Shift');
  }

  // Format key
  let keyDisplay = shortcut.key.toUpperCase();
  if (shortcut.key === ' ') keyDisplay = 'Space';
  if (shortcut.key === 'Delete') keyDisplay = 'Del';
  if (shortcut.key === 'Backspace') keyDisplay = isMac ? 'Delete' : 'Backspace';
  if (shortcut.key === 'Escape') keyDisplay = 'Esc';

  parts.push(keyDisplay);

  return parts.join('+');
}

// ============================================================================
// Export
// ============================================================================

export default useKeyboardShortcuts;
