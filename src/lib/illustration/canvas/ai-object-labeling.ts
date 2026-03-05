/**
 * AI Object Labeling for Vectorized Illustrations
 *
 * Labels SVG regions for AI-powered modifications. Enables:
 * - Region selection and annotation
 * - Natural language references to labeled regions
 * - Partial SVG regeneration with preserved context
 *
 * @module ai-object-labeling
 */

import { FabricObject, Group, Canvas as FabricCanvas } from 'fabric';

// =============================================================================
// TYPES
// =============================================================================

/**
 * Label for a canvas object/region
 */
export interface ObjectLabel {
  id: string;
  objectId: string; // Fabric.js object ID
  label: string; // User-provided or AI-generated label
  description?: string; // Optional detailed description
  category?: LabelCategory; // Optional category for organization
  color?: string; // Visual indicator color
  createdAt: number;
  updatedAt: number;
}

/**
 * Predefined label categories for scientific illustrations
 */
export type LabelCategory =
  | 'cell'
  | 'organelle'
  | 'molecule'
  | 'structure'
  | 'label'
  | 'arrow'
  | 'background'
  | 'annotation'
  | 'custom';

/**
 * Complete labeling state for a canvas
 */
export interface CanvasLabels {
  objects: ObjectLabel[];
  nextId: number;
}

/**
 * Selection for labeling operation
 */
export interface LabelSelection {
  objectId: string;
  bounds: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
}

/**
 * AI prompt builder context
 */
export interface PromptContext {
  /**
   * Labels that should remain unchanged
   */
  preserveLabels: string[];

  /**
   * Labels that should be modified
   */
  modifyLabels: Array<{
    label: string;
    description: string;
    instruction: string;
  }>;

  /**
   * New content to add
   */
  addLabels: Array<{
    label: string;
    description: string;
    position: { x: number; y: number };
  }>;

  /**
   * Overall instruction for the AI
   */
  instruction: string;
}

// =============================================================================
// DEFAULTS
// =============================================================================

/**
 * Default color palette for label categories
 */
export const CATEGORY_COLORS: Record<LabelCategory, string> = {
  cell: '#4ade80', // green
  organelle: '#60a5fa', // blue
  molecule: '#f472b6', // pink
  structure: '#fbbf24', // amber
  label: '#a78bfa', // purple
  arrow: '#fb923c', // orange
  background: '#94a3b8', // slate
  annotation: '#2dd4bf', // teal
  custom: '#f87171', // red
};

/**
 * Default label categories with descriptions
 */
export const CATEGORY_DESCRIPTIONS: Record<LabelCategory, string> = {
  cell: 'Cells or cell components',
  organelle: 'Internal cell structures (nucleus, mitochondria, etc.)',
  molecule: 'Chemical compounds or molecular structures',
  structure: 'Anatomical or structural elements',
  label: 'Text labels or annotations',
  arrow: 'Directional indicators or arrows',
  background: 'Background elements or context',
  annotation: 'Additional explanatory elements',
  custom: 'User-defined category',
};

// =============================================================================
// LABELING MANAGER
// =============================================================================

/**
 * Manages object labels for AI-powered canvas modifications
 */
export class ObjectLabelingManager {
  private canvas: FabricCanvas;
  private labels: Map<string, ObjectLabel> = new Map(); // objectId -> label
  private labelCounter = 1;

  constructor(canvas: FabricCanvas) {
    this.canvas = canvas;
  }

  // ===========================================================================
  // LABEL CRUD
  // ===========================================================================

  /**
   * Add or update a label for an object
   */
  setLabel(
    objectId: string,
    label: string,
    options?: {
      description?: string;
      category?: LabelCategory;
      color?: string;
    }
  ): ObjectLabel {
    const now = Date.now();

    // Check if updating existing label
    const existing = this.labels.get(objectId);

    const labelData: ObjectLabel = {
      id: existing?.id || this.generateLabelId(),
      objectId,
      label,
      description: options?.description,
      category: options?.category,
      color: options?.color || (options?.category ? CATEGORY_COLORS[options.category] : undefined),
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    };

    this.labels.set(objectId, labelData);

    // Store reference on the fabric object
    const obj = this.findObjectById(objectId);
    if (obj) {
      obj.set('ai-label', label);
      obj.set('ai-label-id', labelData.id);
    }

    return labelData;
  }

  /**
   * Remove a label from an object
   */
  removeLabel(objectId: string): void {
    const label = this.labels.get(objectId);
    if (label) {
      this.labels.delete(objectId);

      // Clear from fabric object
      const obj = this.findObjectById(objectId);
      if (obj) {
        obj.set('ai-label', undefined);
        obj.set('ai-label-id', undefined);
      }
    }
  }

  /**
   * Get a label by object ID
   */
  getLabel(objectId: string): ObjectLabel | undefined {
    return this.labels.get(objectId);
  }

  /**
   * Get all labels
   */
  getAllLabels(): ObjectLabel[] {
    return Array.from(this.labels.values());
  }

  /**
   * Get labels by category
   */
  getLabelsByCategory(category: LabelCategory): ObjectLabel[] {
    return this.getAllLabels().filter(l => l.category === category);
  }

  /**
   * Find objects by label text (partial match)
   */
  findByLabel(searchTerm: string): ObjectLabel[] {
    const term = searchTerm.toLowerCase();
    return this.getAllLabels().filter(l =>
      l.label.toLowerCase().includes(term) ||
      l.description?.toLowerCase().includes(term)
    );
  }

  // ===========================================================================
  // BATCH OPERATIONS
  // ===========================================================================

  /**
   * Label multiple objects at once
   */
  batchLabel(
    items: Array<{
      objectId: string;
      label: string;
      description?: string;
      category?: LabelCategory;
    }>
  ): ObjectLabel[] {
    return items.map(item =>
      this.setLabel(item.objectId, item.label, {
        description: item.description,
        category: item.category,
      })
    );
  }

  /**
   * Auto-label selected objects with AI suggestions
   * This is a placeholder for future AI integration
   */
  async autoLabelSelected(objectIds: string[]): Promise<ObjectLabel[]> {
    // For now, use generic labels
    // In the future, this would call an AI model to analyze the objects
    const results: ObjectLabel[] = [];

    for (let i = 0; i < objectIds.length; i++) {
      const obj = this.findObjectById(objectIds[i]);
      if (obj) {
        const type = obj.type;
        const label = this.generateGenericLabel(type, i);
        results.push(this.setLabel(objectIds[i], label));
      }
    }

    return results;
  }

  /**
   * Clear all labels
   */
  clearAllLabels(): void {
    for (const objectId of this.labels.keys()) {
      const obj = this.findObjectById(objectId);
      if (obj) {
        obj.set('ai-label', undefined);
        obj.set('ai-label-id', undefined);
      }
    }
    this.labels.clear();
    this.labelCounter = 1;
  }

  // ===========================================================================
  // AI PROMPT BUILDING
  // ===========================================================================

  /**
   * Build an AI prompt context for canvas modification
   */
  buildPromptContext(selection: PromptContext['instruction']): PromptContext {
    const allLabels = this.getAllLabels();

    return {
      preserveLabels: allLabels.map(l => l.label),
      modifyLabels: [],
      addLabels: [],
      instruction: selection,
    };
  }

  /**
   * Build a detailed prompt describing the labeled canvas
   */
  buildCanvasDescription(): string {
    const labels = this.getAllLabels();

    if (labels.length === 0) {
      return 'The canvas contains no labeled objects.';
    }

    const sections: string[] = [];

    // Group by category
    const byCategory = new Map<LabelCategory, ObjectLabel[]>();
    for (const label of labels) {
      const cat = label.category || 'custom';
      if (!byCategory.has(cat)) {
        byCategory.set(cat, []);
      }
      byCategory.get(cat)!.push(label);
    }

    // Build description
    sections.push('The illustration contains the following labeled elements:');

    for (const [category, items] of byCategory) {
      const categoryDesc = CATEGORY_DESCRIPTIONS[category];
      sections.push(`\n${category.charAt(0).toUpperCase() + category.slice(1)} (${categoryDesc}):`);

      for (const item of items) {
        const obj = this.findObjectById(item.objectId);
        let position = '';
        if (obj) {
          const bounds = obj.getBoundingRect();
          position = ` at (${Math.round(bounds.left)}, ${Math.round(bounds.top)})`;
        }

        sections.push(`  - "${item.label}"${item.description ? `: ${item.description}` : ''}${position}`);
      }
    }

    return sections.join('\n');
  }

  /**
   * Get SVG snippet with labeled regions highlighted
   * Useful for showing users what will be modified
   */
  getLabeledRegionsSVG(): string {
    const labels = this.getAllLabels();
    if (labels.length === 0) {
      return '';
    }

    const rects: string[] = [];

    for (const label of labels) {
      const obj = this.findObjectById(label.objectId);
      if (obj) {
        const bounds = obj.getBoundingRect();
        const color = label.color || '#6366f1';

        rects.push(`
          <rect
            x="${bounds.left}"
            y="${bounds.top}"
            width="${bounds.width}"
            height="${bounds.height}"
            fill="none"
            stroke="${color}"
            stroke-width="2"
            stroke-dasharray="5,5"
            opacity="0.7"
          />
          <text
            x="${bounds.left}"
            y="${bounds.top - 5}"
            fill="${color}"
            font-size="12"
            font-family="sans-serif"
          >${label.label}</text>
        `);
      }
    }

    return `<g xmlns="http://www.w3.org/2000/svg">${rects.join('')}</g>`;
  }

  // ===========================================================================
  // SERIALIZATION
  // ===========================================================================

  /**
   * Export labels for persistence
   */
  exportLabels(): CanvasLabels {
    return {
      objects: this.getAllLabels(),
      nextId: this.labelCounter,
    };
  }

  /**
   * Import labels from saved state
   */
  importLabels(data: CanvasLabels): void {
    this.clearAllLabels();

    for (const label of data.objects) {
      this.labels.set(label.objectId, label);
    }

    this.labelCounter = data.nextId;

    // Restore labels on fabric objects
    for (const label of this.labels.values()) {
      const obj = this.findObjectById(label.objectId);
      if (obj) {
        obj.set('ai-label', label.label);
        obj.set('ai-label-id', label.id);
      }
    }
  }

  // ===========================================================================
  // UTILITY METHODS
  // ===========================================================================

  /**
   * Find an object on the canvas by its ID
   */
  private findObjectById(id: string): FabricObject | undefined {
    return this.canvas.getObjects().find(obj => {
      // Check direct ID
      if (obj.get('id') === id) return true;

      // Check for group member IDs
      if (obj instanceof Group) {
        return obj.getObjects().some(child => child.get('id') === id);
      }

      return false;
    });
  }

  /**
   * Generate a unique label ID
   */
  private generateLabelId(): string {
    return `label_${this.labelCounter++}_${Date.now()}`;
  }

  /**
   * Generate a generic label based on object type
   */
  private generateGenericLabel(type: string, index: number): string {
    const typeLabels: Record<string, string> = {
      rect: 'rectangle',
      circle: 'circle',
      ellipse: 'ellipse',
      triangle: 'triangle',
      polygon: 'polygon',
      line: 'line',
      path: 'path',
      text: 'text',
      group: 'group',
      iText: 'text',
    };

    const baseLabel = typeLabels[type] || 'object';
    return `${baseLabel}_${index + 1}`;
  }

  /**
   * Get the canvas instance
   */
  getCanvas(): FabricCanvas {
    return this.canvas;
  }
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Create an ObjectLabelingManager for a canvas
 */
export function createLabelingManager(canvas: FabricCanvas): ObjectLabelingManager {
  return new ObjectLabelingManager(canvas);
}

/**
 * Check if an object has a label
 */
export function isObjectLabeled(obj: FabricObject): boolean {
  return obj.get('ai-label') !== undefined;
}

/**
 * Get the label from an object
 */
export function getObjectLabel(obj: FabricObject): string | undefined {
  return obj.get('ai-label') as string | undefined;
}

/**
 * Get the label ID from an object
 */
export function getObjectLabelId(obj: FabricObject): string | undefined {
  return obj.get('ai-label-id') as string | undefined;
}

/**
 * Highlight labeled objects on the canvas
 * Adds visual indicators to show which objects are labeled
 */
export function highlightLabeledObjects(
  canvas: FabricCanvas,
  duration: number = 2000
): (() => void) {
  const objects = canvas.getObjects();
  const highlights: Array<{ obj: FabricObject; original: any }> = [];

  for (const obj of objects) {
    if (isObjectLabeled(obj)) {
      const label = getObjectLabel(obj);
      const labelId = getObjectLabelId(obj);
      const color = labelId ? '#6366f1' : '#fbbf24';

      // Store original state
      highlights.push({
        obj,
        original: {
          stroke: obj.stroke,
          strokeWidth: obj.strokeWidth,
          shadow: obj.shadow,
        },
      });

      // Apply highlight
      obj.set({
        stroke: color,
        strokeWidth: 3,
        shadow: {
          color: color,
          blur: 10,
          offsetX: 0,
          offsetY: 0,
        },
      });
    }
  }

  canvas.renderAll();

  // Return function to remove highlights
  return () => {
    for (const { obj, original } of highlights) {
      obj.set({
        stroke: original.stroke,
        strokeWidth: original.strokeWidth,
        shadow: original.shadow,
      });
    }
    canvas.renderAll();
  };
}

/**
 * Find all labeled objects within a bounds
 */
export function findLabeledObjectsInBounds(
  manager: ObjectLabelingManager,
  bounds: { left: number; top: number; width: number; height: number }
): ObjectLabel[] {
  const allLabels = manager.getAllLabels();
  const found: ObjectLabel[] = [];

  for (const label of allLabels) {
    const obj = manager.getCanvas().getObjects().find(o => {
      if (o.get('id') === label.objectId) return true;
      if (o instanceof Group) {
        return o.getObjects().some(child => child.get('id') === label.objectId);
      }
      return false;
    });

    if (obj) {
      const objBounds = obj.getBoundingRect();

      // Check if objects intersect
      if (
        objBounds.left < bounds.left + bounds.width &&
        objBounds.left + objBounds.width > bounds.left &&
        objBounds.top < bounds.top + bounds.height &&
        objBounds.top + objBounds.height > bounds.top
      ) {
        found.push(label);
      }
    }
  }

  return found;
}
