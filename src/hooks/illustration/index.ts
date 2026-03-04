/**
 * Hooks Module
 * Re-exports all custom hooks
 */

export {
  useKeyboardShortcuts,
  getShortcutDisplayString,
} from './useKeyboardShortcuts';
export type {
  ShortcutConfig,
  UseKeyboardShortcutsOptions,
} from './useKeyboardShortcuts';

export { useDiagramGenerator } from './useDiagramGenerator';
export type {
  GenerationState,
  HistoryEntry,
  UseDiagramGeneratorOptions,
  UseDiagramGeneratorReturn,
} from './useDiagramGenerator';

export {
  useLayerSync,
  useLayerVisibility,
  useLayerLock,
  useIsObjectInActiveLayer,
} from './useLayerSync';
export type {
  UseLayerSyncOptions,
  UseLayerSyncReturn,
} from './useLayerSync';

export {
  useToolSwitching,
  useActiveToolInfo,
  useToolsByCategory,
  useIsolatedToolRegistry,
  toolTypeToName,
  getToolShortcut,
} from './useToolSwitching';
export type {
  UseToolSwitchingOptions,
  UseToolSwitchingReturn,
  ToolInfo,
} from './useToolSwitching';

export { useIllustratorTools } from './useIllustratorTools';
export type {
  UseIllustratorToolsOptions,
  UseIllustratorToolsReturn,
} from './useIllustratorTools';
