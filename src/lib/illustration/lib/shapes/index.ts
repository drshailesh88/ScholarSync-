/**
 * Scientific Shape Generators
 *
 * This module provides specialized shape generators for scientific illustrations.
 * These are the "drawing tools" that match BioRender's membrane, DNA, and cell layer tools.
 *
 * Usage:
 * ```typescript
 * import { generateDNAHelix, generateCellMembrane } from '@/lib/shapes';
 *
 * // Create a DNA helix
 * const dnaSvg = generateDNAHelix({ basePairs: 10, style: 'detailed' });
 *
 * // Create a cell membrane with proteins
 * const membraneSvg = generateCellMembrane({
 *   phospholipidCount: 20,
 *   proteins: [{ position: 0.5, type: 'channel' }]
 * });
 * ```
 */

export {
  // DNA/RNA
  generateDNAHelix,
  type DNAHelixOptions,

  // Cell Membrane
  generateCellMembrane,
  type CellMembraneOptions,
  type MembraneProtein,

  // Cell Layer/Tissue
  generateCellLayer,
  type CellLayerOptions,

  // Pathway Arrows
  generatePathwayArrow,
  type PathwayArrowOptions,

  // Neurons
  generateNeuron,
  type NeuronOptions,

  // Organelles
  generateMitochondria,
  type MitochondriaOptions,

  // Base types
  type ShapeOptions,

  // Combined export
  scientificShapeGenerators
} from './scientific-shapes';

// ============================================================================
// Shape Categories for UI
// ============================================================================

export const shapeCategories = {
  'molecular': {
    name: 'Molecular Biology',
    shapes: ['dnaHelix', 'rnaStrand', 'protein']
  },
  'cellular': {
    name: 'Cell Biology',
    shapes: ['cellMembrane', 'cellLayer', 'mitochondria', 'nucleus']
  },
  'neuroscience': {
    name: 'Neuroscience',
    shapes: ['neuron', 'synapse', 'actionPotential']
  },
  'pathways': {
    name: 'Signaling Pathways',
    shapes: ['pathwayArrow', 'receptor', 'enzyme']
  }
} as const;

// ============================================================================
// Preset Configurations
// ============================================================================

export const shapePresets = {
  dnaHelix: {
    simple: { basePairs: 5, style: 'simple' as const, showBasePairs: false },
    standard: { basePairs: 10, style: 'simple' as const, showBasePairs: true },
    detailed: { basePairs: 15, style: 'detailed' as const, showBasePairs: true }
  },
  cellMembrane: {
    simple: { phospholipidCount: 10, bilayer: true },
    withChannel: {
      phospholipidCount: 15,
      bilayer: true,
      proteins: [{ position: 0.5, type: 'channel' as const }]
    },
    complex: {
      phospholipidCount: 20,
      bilayer: true,
      proteins: [
        { position: 0.25, type: 'receptor' as const },
        { position: 0.5, type: 'channel' as const },
        { position: 0.75, type: 'pump' as const }
      ]
    }
  },
  cellLayer: {
    epithelial: { rows: 1, columns: 5, cellType: 'columnar' as const, showNuclei: true },
    tissue: { rows: 3, columns: 6, cellType: 'cuboidal' as const, showNuclei: true }
  },
  neuron: {
    simple: { dendrites: 3, showMyelin: false },
    detailed: { dendrites: 5, showMyelin: true }
  }
};

// ============================================================================
// TODO: Additional shape generators to implement
// ============================================================================

/**
 * Planned shape generators:
 *
 * 1. RNA structure (secondary structure with stem-loops)
 * 2. Protein secondary structure (alpha helix, beta sheet)
 * 3. Action potential waveform
 * 4. Synapse detail view
 * 5. Blood vessel cross-section
 * 6. Chromosome (during cell division)
 * 7. Cell cycle diagram
 * 8. Gradient generator (for expression levels)
 * 9. Scale bar generator
 * 10. Figure panel dividers
 */
