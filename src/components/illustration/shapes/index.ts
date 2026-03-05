/**
 * Scientific Shape Generator Components
 *
 * Export all shape generator panels and the unified modal component.
 *
 * @module components/shapes
 */

// Individual Panel Exports
export { DNAHelixPanel, type DNAHelixPanelProps } from './DNAHelixPanel';
export { CellMembranePanel, type CellMembranePanelProps } from './CellMembranePanel';
export { CellLayerPanel, type CellLayerPanelProps } from './CellLayerPanel';
export { NeuronPanel, type NeuronPanelProps } from './NeuronPanel';
export { PathwayArrowPanel, type PathwayArrowPanelProps } from './PathwayArrowPanel';

// Unified Modal Export
export { ShapeGeneratorModal, type ShapeGeneratorModalProps, type ShapeType } from './ShapeGeneratorModal';

// Default export for convenience
export { ShapeGeneratorModal as default } from './ShapeGeneratorModal';
