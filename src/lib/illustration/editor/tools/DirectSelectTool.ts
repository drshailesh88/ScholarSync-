import { Path as FabricPath } from 'fabric';
import type { FabricCanvas } from '@/lib/illustration/types';
import type { Tool, ToolMouseEvent } from './ToolRegistry';

export interface DirectSelectToolOptions {
  onPathSelected?: (path: FabricPath) => void;
  onExitRequested?: () => void;
}

/**
 * Direct Select tool used for anchor/handle-level editing workflows.
 *
 * The canvas component owns the visual overlay and edit interactions.
 * This class keeps tool-registry integration consistent with other tools.
 */
export class DirectSelectTool implements Tool {
  readonly name = 'directSelect';
  readonly icon = 'direct-select';
  readonly cursor = 'default';
  readonly shortcut = 'a';
  readonly category = 'selection';

  private canvas: FabricCanvas | null = null;
  private options: DirectSelectToolOptions;

  constructor(options: DirectSelectToolOptions = {}) {
    this.options = options;
  }

  activate(canvas: FabricCanvas): void {
    this.canvas = canvas;

    canvas.selection = false;
    canvas.defaultCursor = this.cursor;
    canvas.hoverCursor = this.cursor;

    canvas.forEachObject((object: any) => {
      object.selectable = false;
      object.evented = true;
    });
  }

  deactivate(_canvas: FabricCanvas): void {
    this.canvas = null;
  }

  onMouseDown(event: ToolMouseEvent): void {
    const target = event.target;

    if (target instanceof FabricPath) {
      this.options.onPathSelected?.(target);
    }
  }

  onDoubleClick(event: ToolMouseEvent): void {
    if (!event.target) {
      this.options.onExitRequested?.();
    }
  }
}

export default DirectSelectTool;
