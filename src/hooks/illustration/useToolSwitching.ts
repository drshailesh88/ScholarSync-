/**
 * FINNISH Tool Switching Hook
 * React hook for managing tool activation and state
 *
 * Provides integration between:
 * - ToolRegistry for tool lifecycle management
 * - EditorStore for state management
 * - React components for UI updates
 *
 * @module hooks/useToolSwitching
 */

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useEditorStore, useCanvas, useActiveTool } from '@/stores/illustration/editorStore';
import { ToolType } from '@/lib/illustration/types/index';
import {
  ToolRegistry,
  toolRegistry as globalToolRegistry,
  initializeToolRegistry,
  createToolRegistry,
  type Tool,
  type ToolName,
  TOOL_NAMES,
} from '@/lib/illustration/editor/tools/index';

// ============================================================================
// Types
// ============================================================================

/**
 * Tool switching hook options
 */
export interface UseToolSwitchingOptions {
  /**
   * Use a custom registry instead of the global one
   * @default globalToolRegistry
   */
  registry?: ToolRegistry;

  /**
   * Auto-initialize registry with default tools
   * @default true
   */
  autoInitialize?: boolean;

  /**
   * Enable keyboard shortcuts for tool switching
   * @default true
   */
  enableShortcuts?: boolean;

  /**
   * Callback when tool changes
   */
  onToolChange?: (toolName: string, previousTool: string | null) => void;
}

/**
 * Tool information for UI rendering
 */
export interface ToolInfo {
  name: string;
  icon: string;
  cursor: string;
  shortcut?: string;
  category?: string;
  isActive: boolean;
}

/**
 * Hook return value
 */
export interface UseToolSwitchingReturn {
  /** Currently active tool name */
  activeTool: ToolType;

  /** All available tools with their info */
  tools: ToolInfo[];

  /** Switch to a tool by name */
  setTool: (name: string) => void;

  /** Switch to a tool by ToolType enum */
  setToolByType: (type: ToolType) => void;

  /** Get the active tool instance */
  getActiveTool: () => Tool | null;

  /** Get a tool instance by name */
  getTool: (name: string) => Tool | undefined;

  /** Check if a specific tool is active */
  isToolActive: (name: string) => boolean;

  /** Registry instance being used */
  registry: ToolRegistry;

  /** Whether registry is initialized */
  isInitialized: boolean;
}

// ============================================================================
// Hook Implementation
// ============================================================================

/**
 * React hook for tool switching and management
 *
 * Connects the ToolRegistry to React's state management and provides
 * a clean API for tool switching in components.
 *
 * @example
 * ```tsx
 * import { useToolSwitching } from '@/hooks/useToolSwitching';
 *
 * function ToolBar() {
 *   const { activeTool, tools, setTool } = useToolSwitching();
 *
 *   return (
 *     <div className="toolbar">
 *       {tools.map((tool) => (
 *         <button
 *           key={tool.name}
 *           onClick={() => setTool(tool.name)}
 *           className={tool.isActive ? 'active' : ''}
 *           title={tool.shortcut ? `${tool.name} (${tool.shortcut})` : tool.name}
 *         >
 *           <Icon name={tool.icon} />
 *         </button>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useToolSwitching(
  options: UseToolSwitchingOptions = {}
): UseToolSwitchingReturn {
  const {
    registry = globalToolRegistry,
    autoInitialize = true,
    enableShortcuts = true,
    onToolChange,
  } = options;

  // Get store state and actions
  const canvas = useCanvas();
  const activeTool = useActiveTool();
  const setActiveTool = useEditorStore((state) => state.setActiveTool);

  // Track initialization state
  const isInitializedRef = useRef(false);
  const previousToolRef = useRef<string | null>(null);

  // ==========================================================================
  // Initialize Registry
  // ==========================================================================

  useEffect(() => {
    if (autoInitialize && !isInitializedRef.current) {
      // Initialize the registry with default tools
      if (registry === globalToolRegistry) {
        initializeToolRegistry();
      }
      isInitializedRef.current = true;
    }
  }, [autoInitialize, registry]);

  // ==========================================================================
  // Connect Canvas to Registry
  // ==========================================================================

  useEffect(() => {
    if (canvas) {
      registry.setCanvas(canvas);
    }
  }, [canvas, registry]);

  // ==========================================================================
  // Sync Active Tool with Store
  // ==========================================================================

  useEffect(() => {
    if (canvas && activeTool && isInitializedRef.current) {
      // Convert ToolType enum to tool name string
      const toolName = activeTool as string;

      // Only activate if the tool exists in registry
      if (registry.has(toolName)) {
        const wasActivated = registry.setActive(toolName, canvas);

        if (wasActivated && onToolChange) {
          onToolChange(toolName, previousToolRef.current);
        }

        previousToolRef.current = toolName;
      }
    }
  }, [activeTool, canvas, registry, onToolChange]);

  // ==========================================================================
  // Keyboard Shortcuts
  // ==========================================================================

  useEffect(() => {
    if (!enableShortcuts) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Skip if modifier keys are pressed (except shift for some tools)
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      // Check for single-key shortcuts
      const key = e.key.toLowerCase();
      const tool = registry.getByShortcut(key);

      if (tool) {
        e.preventDefault();
        setActiveTool(tool.name as ToolType);
      }

      // Also pass keyboard events to the active tool
      registry.handleKeyEvent(e, 'keydown');
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      registry.handleKeyEvent(e, 'keyup');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [enableShortcuts, registry, setActiveTool]);

  // ==========================================================================
  // Tool Switching Functions
  // ==========================================================================

  /**
   * Switch to a tool by name
   */
  const setTool = useCallback(
    (name: string) => {
      if (registry.has(name)) {
        setActiveTool(name as ToolType);
      } else {
        console.warn(`Tool "${name}" not found in registry`);
      }
    },
    [registry, setActiveTool]
  );

  /**
   * Switch to a tool by ToolType enum
   */
  const setToolByType = useCallback(
    (type: ToolType) => {
      setActiveTool(type);
    },
    [setActiveTool]
  );

  /**
   * Get the active tool instance
   */
  const getActiveTool = useCallback(() => {
    return registry.getActive();
  }, [registry]);

  /**
   * Get a tool instance by name
   */
  const getTool = useCallback(
    (name: string) => {
      return registry.get(name);
    },
    [registry]
  );

  /**
   * Check if a specific tool is active
   */
  const isToolActive = useCallback(
    (name: string) => {
      return activeTool === name;
    },
    [activeTool]
  );

  // ==========================================================================
  // Tool Info for UI
  // ==========================================================================

  /**
   * Get tool info for all registered tools
   */
  const tools = useMemo<ToolInfo[]>(() => {
    return registry.getAll().map((tool) => ({
      name: tool.name,
      icon: tool.icon,
      cursor: tool.cursor,
      shortcut: tool.shortcut,
      category: tool.category,
      isActive: tool.name === activeTool,
    }));
  }, [registry, activeTool]);

  // ==========================================================================
  // Return Value
  // ==========================================================================

  return {
    activeTool,
    tools,
    setTool,
    setToolByType,
    getActiveTool,
    getTool,
    isToolActive,
    registry,
    // eslint-disable-next-line react-hooks/refs -- intentional: exposing init status
    isInitialized: isInitializedRef.current,
  };
}

// ============================================================================
// Additional Hooks
// ============================================================================

/**
 * Hook to get just the active tool info
 *
 * @example
 * ```tsx
 * const { name, icon, cursor } = useActiveToolInfo();
 * ```
 */
export function useActiveToolInfo(): ToolInfo | null {
  const { tools, activeTool } = useToolSwitching({ enableShortcuts: false });

  return useMemo(() => {
    return tools.find((t) => t.name === activeTool) || null;
  }, [tools, activeTool]);
}

/**
 * Hook to get tools by category
 *
 * @example
 * ```tsx
 * const shapeTools = useToolsByCategory('shapes');
 * ```
 */
export function useToolsByCategory(category: string): ToolInfo[] {
  const { tools } = useToolSwitching({ enableShortcuts: false });

  return useMemo(() => {
    return tools.filter((t) => t.category === category);
  }, [tools, category]);
}

/**
 * Hook for creating an isolated tool registry
 *
 * Useful for testing or having multiple independent tool contexts
 *
 * @example
 * ```tsx
 * const { registry, ...tooling } = useIsolatedToolRegistry();
 * ```
 */
export function useIsolatedToolRegistry(
  options: Omit<UseToolSwitchingOptions, 'registry'> = {}
): UseToolSwitchingReturn {
  const registryRef = useRef<ToolRegistry | null>(null);

   
  if (registryRef.current == null) {
    registryRef.current = createToolRegistry();
  }

  return useToolSwitching({
    ...options,
    // eslint-disable-next-line react-hooks/refs -- stable ref value after init
    registry: registryRef.current,
    autoInitialize: false, // Already initialized via createToolRegistry
  });
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Map ToolType enum to tool names for the registry
 */
export function toolTypeToName(toolType: ToolType): ToolName | string {
  const mapping: Record<ToolType, string> = {
    [ToolType.SELECT]: TOOL_NAMES.SELECT,
    [ToolType.DIRECT_SELECT]: 'directSelect',
    [ToolType.PEN]: TOOL_NAMES.PEN,
    [ToolType.PENCIL]: 'pencil',
    [ToolType.BRUSH]: 'brush',
    [ToolType.LINE]: TOOL_NAMES.LINE,
    [ToolType.RECTANGLE]: TOOL_NAMES.RECTANGLE,
    [ToolType.ELLIPSE]: TOOL_NAMES.ELLIPSE,
    [ToolType.POLYGON]: 'polygon',
    [ToolType.STAR]: 'star',
    [ToolType.ARROW]: TOOL_NAMES.ARROW,
    [ToolType.BRACKET]: 'bracket',
    [ToolType.CALLOUT]: 'callout',
    [ToolType.DIMENSION]: 'dimension',
    [ToolType.CONNECTOR]: 'connector',
    [ToolType.TEXT]: TOOL_NAMES.TEXT,
    [ToolType.TEXT_ON_PATH]: 'textOnPath',
    [ToolType.HAND]: 'hand',
    [ToolType.ZOOM]: 'zoom',
    [ToolType.EYEDROPPER]: 'eyedropper',
    [ToolType.ERASER]: 'eraser',
    [ToolType.SCISSORS]: 'scissors',
    [ToolType.MEASURE]: 'measure',
  };

  return mapping[toolType] || toolType;
}

/**
 * Get shortcut key for a ToolType
 */
export function getToolShortcut(toolType: ToolType): string | undefined {
  const shortcuts: Partial<Record<ToolType, string>> = {
    [ToolType.SELECT]: 'V',
    [ToolType.DIRECT_SELECT]: 'A',
    [ToolType.PEN]: 'P',
    [ToolType.LINE]: 'L',
    [ToolType.RECTANGLE]: 'R',
    [ToolType.ELLIPSE]: 'E',
    [ToolType.TEXT]: 'T',
    [ToolType.HAND]: 'H',
    [ToolType.ZOOM]: 'Z',
    [ToolType.ERASER]: 'Shift+E',
    [ToolType.SCISSORS]: 'C',
    [ToolType.MEASURE]: 'M',
  };

  return shortcuts[toolType];
}

// ============================================================================
// Exports
// ============================================================================

export default useToolSwitching;
