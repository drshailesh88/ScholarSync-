/**
 * Scientific Shape Generator Panel Component
 * UI for generating scientific shapes (DNA, membranes, neurons, etc.)
 *
 * @module components/tools/ShapeGeneratorPanel
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  generateDNAHelix,
  generateCellMembrane,
  generateCellLayer,
  generatePathwayArrow,
  generateNeuron,
  generateMitochondria,
  type DNAHelixOptions,
  type CellMembraneOptions,
  type CellLayerOptions,
  type PathwayArrowOptions,
  type NeuronOptions,
  type MitochondriaOptions,
} from '../../lib/shapes/scientific-shapes';
import { useCanvas } from '../Canvas/CanvasContext';
import { FabricImage } from 'fabric';

// ============================================================================
// Types
// ============================================================================

export interface ShapeGeneratorPanelProps {
  /** Whether the panel is open */
  isOpen?: boolean;
  /** Callback when panel is closed */
  onClose?: () => void;
  /** Initial shape type to show */
  initialShape?: ShapeType;
}

export type ShapeType =
  | 'dna'
  | 'membrane'
  | 'cellLayer'
  | 'arrow'
  | 'neuron'
  | 'mitochondria';

interface ShapeCategory {
  id: ShapeType;
  name: string;
  icon: React.ReactNode;
  description: string;
}

// ============================================================================
// Styles
// ============================================================================

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    padding: '16px',
    backgroundColor: 'var(--bg-secondary, #1e1e1e)',
    borderRadius: '8px',
    maxWidth: '560px',
    width: '100%',
    maxHeight: '85vh',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--border-color, #333)',
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary, #ffffff)',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  closeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    padding: 0,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'var(--text-secondary, #9d9d9d)',
    transition: 'all 150ms ease',
  },
  content: {
    display: 'flex',
    gap: '16px',
    flex: 1,
    overflow: 'hidden',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
    width: '140px',
    flexShrink: 0,
  },
  categoryButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 12px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    color: 'var(--text-secondary, #9d9d9d)',
    fontSize: '13px',
    fontWeight: 500,
    textAlign: 'left' as const,
    transition: 'all 150ms ease',
  },
  categoryButtonActive: {
    backgroundColor: 'var(--accent-primary, #3b82f6)',
    color: '#ffffff',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    flex: 1,
    overflow: 'auto',
  },
  previewContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid var(--border-color, #333)',
    minHeight: '180px',
    overflow: 'hidden',
  },
  previewSvg: {
    maxWidth: '100%',
    maxHeight: '160px',
    objectFit: 'contain' as const,
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    padding: '12px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    borderRadius: '8px',
    maxHeight: '280px',
    overflow: 'auto',
  },
  optionRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
  },
  optionLabel: {
    fontSize: '13px',
    color: 'var(--text-secondary, #9d9d9d)',
    minWidth: '100px',
  },
  optionInput: {
    flex: 1,
    padding: '6px 10px',
    backgroundColor: 'var(--bg-primary, #121212)',
    border: '1px solid var(--border-color, #444)',
    borderRadius: '4px',
    color: 'var(--text-primary, #ffffff)',
    fontSize: '13px',
    maxWidth: '120px',
  },
  optionSlider: {
    flex: 1,
    accentColor: 'var(--accent-primary, #3b82f6)',
  },
  optionSelect: {
    flex: 1,
    padding: '6px 10px',
    backgroundColor: 'var(--bg-primary, #121212)',
    border: '1px solid var(--border-color, #444)',
    borderRadius: '4px',
    color: 'var(--text-primary, #ffffff)',
    fontSize: '13px',
    maxWidth: '150px',
    cursor: 'pointer',
  },
  optionCheckbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  checkbox: {
    width: '16px',
    height: '16px',
    accentColor: 'var(--accent-primary, #3b82f6)',
  },
  colorInput: {
    width: '40px',
    height: '28px',
    padding: '2px',
    backgroundColor: 'var(--bg-primary, #121212)',
    border: '1px solid var(--border-color, #444)',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  presetsContainer: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap' as const,
    padding: '8px 0',
  },
  presetButton: {
    padding: '6px 12px',
    backgroundColor: 'var(--bg-primary, #121212)',
    border: '1px solid var(--border-color, #444)',
    borderRadius: '4px',
    color: 'var(--text-secondary, #9d9d9d)',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  presetButtonHover: {
    backgroundColor: 'var(--accent-primary, #3b82f6)',
    borderColor: 'var(--accent-primary, #3b82f6)',
    color: '#ffffff',
  },
  sectionTitle: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--text-muted, #666)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    marginBottom: '4px',
  },
  buttonRow: {
    display: 'flex',
    gap: '8px',
    paddingTop: '8px',
    borderTop: '1px solid var(--border-color, #333)',
  },
  button: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: 500,
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    border: 'none',
  },
  primaryButton: {
    backgroundColor: 'var(--accent-primary, #3b82f6)',
    color: '#ffffff',
  },
  secondaryButton: {
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    color: 'var(--text-primary, #ffffff)',
    border: '1px solid var(--border-color, #333)',
  },
  description: {
    fontSize: '12px',
    color: 'var(--text-muted, #666)',
    lineHeight: 1.5,
    padding: '8px 0',
  },
};

// ============================================================================
// Icons
// ============================================================================

const DNAIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 15c6.667-6 13.333 0 20-6" />
    <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
    <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
    <path d="M17 6l-2.5-2.5" />
    <path d="M14 8l-1-1" />
    <path d="M7 18l2.5 2.5" />
    <path d="M3.5 14.5l.5.5" />
    <path d="M20 9l.5.5" />
    <path d="M6.5 12.5l1 1" />
    <path d="M16.5 10.5l1 1" />
    <path d="M10 16l-1-1" />
  </svg>
);

const MembraneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="4" cy="6" r="2" />
    <circle cx="8" cy="6" r="2" />
    <circle cx="12" cy="6" r="2" />
    <circle cx="16" cy="6" r="2" />
    <circle cx="20" cy="6" r="2" />
    <line x1="4" y1="8" x2="4" y2="12" />
    <line x1="8" y1="8" x2="8" y2="12" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="16" y1="8" x2="16" y2="12" />
    <line x1="20" y1="8" x2="20" y2="12" />
    <line x1="4" y1="12" x2="4" y2="16" />
    <line x1="8" y1="12" x2="8" y2="16" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="16" y1="12" x2="16" y2="16" />
    <line x1="20" y1="12" x2="20" y2="16" />
    <circle cx="4" cy="18" r="2" />
    <circle cx="8" cy="18" r="2" />
    <circle cx="12" cy="18" r="2" />
    <circle cx="16" cy="18" r="2" />
    <circle cx="20" cy="18" r="2" />
  </svg>
);

const CellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

const NeuronIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4" />
    <path d="M12 12v8" />
    <path d="M8 4l-2-2" />
    <path d="M16 4l2-2" />
    <path d="M6 8H4" />
    <path d="M20 8h-2" />
    <path d="M10 20l-2 2" />
    <path d="M14 20l2 2" />
  </svg>
);

const MitoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="12" rx="9" ry="5" />
    <path d="M6 12c0-1 1-2 2-2s2 1 2 2" />
    <path d="M14 12c0 1 1 2 2 2s2-1 2-2" />
    <path d="M10 10v4" />
    <path d="M14 10v4" />
  </svg>
);

const ShapesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2l9 21H3l9-21z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const InsertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

// ============================================================================
// Shape Categories
// ============================================================================

const shapeCategories: ShapeCategory[] = [
  {
    id: 'dna',
    name: 'DNA Helix',
    icon: <DNAIcon />,
    description: 'Generate DNA/RNA double helix with customizable base pairs, twist, and style.',
  },
  {
    id: 'membrane',
    name: 'Membrane',
    icon: <MembraneIcon />,
    description: 'Create phospholipid bilayer membranes with optional proteins.',
  },
  {
    id: 'cellLayer',
    name: 'Cell Layer',
    icon: <CellIcon />,
    description: 'Generate tissue cell layers (epithelial, squamous, columnar, etc.).',
  },
  {
    id: 'arrow',
    name: 'Pathway Arrow',
    icon: <ArrowIcon />,
    description: 'Create signaling pathway arrows (activation, inhibition, catalysis).',
  },
  {
    id: 'neuron',
    name: 'Neuron',
    icon: <NeuronIcon />,
    description: 'Generate neuron illustrations with dendrites, axon, and myelin.',
  },
  {
    id: 'mitochondria',
    name: 'Mitochondria',
    icon: <MitoIcon />,
    description: 'Create mitochondria with cristae and matrix details.',
  },
];

// ============================================================================
// Default Options
// ============================================================================

const defaultDNAOptions: DNAHelixOptions = {
  length: 200,
  basePairs: 10,
  twist: 36,
  width: 40,
  style: 'simple',
  showBasePairs: true,
  stroke: '#3B82F6',
  strokeWidth: 2,
};

const defaultMembraneOptions: CellMembraneOptions = {
  length: 300,
  phospholipidCount: 15,
  bilayer: true,
  showHeadGroups: true,
  showTails: true,
  stroke: '#6B7280',
  fill: '#FEF3C7',
};

const defaultCellLayerOptions: CellLayerOptions = {
  rows: 2,
  columns: 5,
  cellWidth: 40,
  cellHeight: 50,
  cellType: 'cuboidal',
  showNuclei: true,
  junctions: true,
  stroke: '#6B7280',
  fill: '#FEF3C7',
};

const defaultArrowOptions: PathwayArrowOptions = {
  type: 'activation',
  curved: false,
  startPoint: { x: 10, y: 50 },
  endPoint: { x: 190, y: 50 },
  stroke: '#374151',
  strokeWidth: 2,
};

const defaultNeuronOptions: NeuronOptions = {
  type: 'pyramidal',
  dendrites: 5,
  axonLength: 150,
  showMyelin: true,
  stroke: '#374151',
  fill: '#FEF3C7',
};

const defaultMitoOptions: MitochondriaOptions = {
  width: 120,
  height: 60,
  cristaCount: 5,
  showMatrix: true,
  stroke: '#374151',
  fill: '#FEF3C7',
};

// ============================================================================
// Component
// ============================================================================

export function ShapeGeneratorPanel({
  isOpen = true,
  onClose,
  initialShape = 'dna',
}: ShapeGeneratorPanelProps): JSX.Element | null {
  // State
  const [activeCategory, setActiveCategory] = useState<ShapeType>(initialShape);
  const [dnaOptions, setDnaOptions] = useState<DNAHelixOptions>(defaultDNAOptions);
  const [membraneOptions, setMembraneOptions] = useState<CellMembraneOptions>(defaultMembraneOptions);
  const [cellLayerOptions, setCellLayerOptions] = useState<CellLayerOptions>(defaultCellLayerOptions);
  const [arrowOptions, setArrowOptions] = useState<PathwayArrowOptions>(defaultArrowOptions);
  const [neuronOptions, setNeuronOptions] = useState<NeuronOptions>(defaultNeuronOptions);
  const [mitoOptions, setMitoOptions] = useState<MitochondriaOptions>(defaultMitoOptions);
  const [hoveredPreset, setHoveredPreset] = useState<string | null>(null);

  // Canvas context
  const canvasContext = useCanvas();

  // Update active category when initialShape changes
  useEffect(() => {
    if (initialShape) {
      setActiveCategory(initialShape);
    }
  }, [initialShape]);

  // Generate preview SVG
  const previewSvg = useMemo(() => {
    try {
      switch (activeCategory) {
        case 'dna':
          return generateDNAHelix(dnaOptions);
        case 'membrane':
          return generateCellMembrane(membraneOptions);
        case 'cellLayer':
          return generateCellLayer(cellLayerOptions);
        case 'arrow':
          return generatePathwayArrow(arrowOptions);
        case 'neuron':
          return generateNeuron(neuronOptions);
        case 'mitochondria':
          return generateMitochondria(mitoOptions);
        default:
          return '';
      }
    } catch (error) {
      console.error('Error generating shape preview:', error);
      return '';
    }
  }, [activeCategory, dnaOptions, membraneOptions, cellLayerOptions, arrowOptions, neuronOptions, mitoOptions]);

  // Insert shape to canvas
  const handleInsert = useCallback(async () => {
    if (!canvasContext.canvas || !previewSvg) return;

    try {
      // Create a blob from SVG
      const blob = new Blob([previewSvg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);

      // Load as Fabric image
      const img = await FabricImage.fromURL(url);

      // Center on canvas
      const canvas = canvasContext.canvas;
      const canvasWidth = canvas.width || 800;
      const canvasHeight = canvas.height || 600;

      // Scale if needed
      const maxWidth = canvasWidth * 0.6;
      const maxHeight = canvasHeight * 0.6;
      const scaleX = maxWidth / (img.width || 1);
      const scaleY = maxHeight / (img.height || 1);
      const scale = Math.min(scaleX, scaleY, 1);

      img.scale(scale);
      img.set({
        left: (canvasWidth - (img.width || 0) * scale) / 2,
        top: (canvasHeight - (img.height || 0) * scale) / 2,
      });

      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();

      // Cleanup
      URL.revokeObjectURL(url);

      // Close panel
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Failed to insert shape:', error);
    }
  }, [canvasContext, previewSvg, onClose]);

  // Reset options
  const handleReset = useCallback(() => {
    switch (activeCategory) {
      case 'dna':
        setDnaOptions(defaultDNAOptions);
        break;
      case 'membrane':
        setMembraneOptions(defaultMembraneOptions);
        break;
      case 'cellLayer':
        setCellLayerOptions(defaultCellLayerOptions);
        break;
      case 'arrow':
        setArrowOptions(defaultArrowOptions);
        break;
      case 'neuron':
        setNeuronOptions(defaultNeuronOptions);
        break;
      case 'mitochondria':
        setMitoOptions(defaultMitoOptions);
        break;
    }
  }, [activeCategory]);

  // Get category description
  const categoryInfo = shapeCategories.find((c) => c.id === activeCategory);

  // Don't render if not open
  if (!isOpen) return null;

  // Render DNA options
  const renderDNAOptions = () => (
    <>
      <div style={styles.sectionTitle}>Presets</div>
      <div style={styles.presetsContainer}>
        {['Simple', 'Detailed', 'Schematic'].map((preset) => (
          <button
            key={preset}
            style={{
              ...styles.presetButton,
              ...(hoveredPreset === preset ? styles.presetButtonHover : {}),
            }}
            onMouseEnter={() => setHoveredPreset(preset)}
            onMouseLeave={() => setHoveredPreset(null)}
            onClick={() =>
              setDnaOptions((prev) => ({
                ...prev,
                style: preset.toLowerCase() as 'simple' | 'detailed' | 'schematic',
              }))
            }
          >
            {preset}
          </button>
        ))}
      </div>

      <div style={styles.sectionTitle}>Parameters</div>
      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Length</label>
        <input
          type="range"
          min="100"
          max="400"
          value={dnaOptions.length}
          onChange={(e) => setDnaOptions((prev) => ({ ...prev, length: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input
          type="number"
          value={dnaOptions.length}
          onChange={(e) => setDnaOptions((prev) => ({ ...prev, length: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Base Pairs</label>
        <input
          type="range"
          min="3"
          max="20"
          value={dnaOptions.basePairs}
          onChange={(e) => setDnaOptions((prev) => ({ ...prev, basePairs: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input
          type="number"
          value={dnaOptions.basePairs}
          onChange={(e) => setDnaOptions((prev) => ({ ...prev, basePairs: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Width</label>
        <input
          type="range"
          min="20"
          max="80"
          value={dnaOptions.width}
          onChange={(e) => setDnaOptions((prev) => ({ ...prev, width: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input
          type="number"
          value={dnaOptions.width}
          onChange={(e) => setDnaOptions((prev) => ({ ...prev, width: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Show Base Pairs</label>
        <label style={styles.optionCheckbox}>
          <input
            type="checkbox"
            checked={dnaOptions.showBasePairs}
            onChange={(e) => setDnaOptions((prev) => ({ ...prev, showBasePairs: e.target.checked }))}
            style={styles.checkbox}
          />
        </label>
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Stroke Color</label>
        <input
          type="color"
          value={dnaOptions.stroke}
          onChange={(e) => setDnaOptions((prev) => ({ ...prev, stroke: e.target.value }))}
          style={styles.colorInput}
        />
      </div>
    </>
  );

  // Render Membrane options
  const renderMembraneOptions = () => (
    <>
      <div style={styles.sectionTitle}>Presets</div>
      <div style={styles.presetsContainer}>
        {['Simple', 'Bilayer', 'With Proteins'].map((preset) => (
          <button
            key={preset}
            style={{
              ...styles.presetButton,
              ...(hoveredPreset === preset ? styles.presetButtonHover : {}),
            }}
            onMouseEnter={() => setHoveredPreset(preset)}
            onMouseLeave={() => setHoveredPreset(null)}
            onClick={() => {
              if (preset === 'Simple') {
                setMembraneOptions((prev) => ({ ...prev, bilayer: false, proteins: [] }));
              } else if (preset === 'Bilayer') {
                setMembraneOptions((prev) => ({ ...prev, bilayer: true, proteins: [] }));
              } else {
                setMembraneOptions((prev) => ({
                  ...prev,
                  bilayer: true,
                  proteins: [
                    { position: 0.3, type: 'channel' },
                    { position: 0.7, type: 'receptor' },
                  ],
                }));
              }
            }}
          >
            {preset}
          </button>
        ))}
      </div>

      <div style={styles.sectionTitle}>Parameters</div>
      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Length</label>
        <input
          type="range"
          min="150"
          max="500"
          value={membraneOptions.length}
          onChange={(e) => setMembraneOptions((prev) => ({ ...prev, length: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input
          type="number"
          value={membraneOptions.length}
          onChange={(e) => setMembraneOptions((prev) => ({ ...prev, length: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Phospholipids</label>
        <input
          type="range"
          min="5"
          max="30"
          value={membraneOptions.phospholipidCount}
          onChange={(e) => setMembraneOptions((prev) => ({ ...prev, phospholipidCount: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input
          type="number"
          value={membraneOptions.phospholipidCount}
          onChange={(e) => setMembraneOptions((prev) => ({ ...prev, phospholipidCount: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Bilayer</label>
        <label style={styles.optionCheckbox}>
          <input
            type="checkbox"
            checked={membraneOptions.bilayer}
            onChange={(e) => setMembraneOptions((prev) => ({ ...prev, bilayer: e.target.checked }))}
            style={styles.checkbox}
          />
        </label>
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Head Color</label>
        <input
          type="color"
          value={membraneOptions.fill}
          onChange={(e) => setMembraneOptions((prev) => ({ ...prev, fill: e.target.value }))}
          style={styles.colorInput}
        />
      </div>
    </>
  );

  // Render Cell Layer options
  const renderCellLayerOptions = () => (
    <>
      <div style={styles.sectionTitle}>Cell Type</div>
      <div style={styles.optionRow}>
        <select
          value={cellLayerOptions.cellType}
          onChange={(e) =>
            setCellLayerOptions((prev) => ({
              ...prev,
              cellType: e.target.value as 'epithelial' | 'endothelial' | 'squamous' | 'cuboidal' | 'columnar',
            }))
          }
          style={styles.optionSelect}
        >
          <option value="cuboidal">Cuboidal</option>
          <option value="columnar">Columnar</option>
          <option value="squamous">Squamous</option>
        </select>
      </div>

      <div style={styles.sectionTitle}>Parameters</div>
      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Rows</label>
        <input
          type="range"
          min="1"
          max="5"
          value={cellLayerOptions.rows}
          onChange={(e) => setCellLayerOptions((prev) => ({ ...prev, rows: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input
          type="number"
          value={cellLayerOptions.rows}
          onChange={(e) => setCellLayerOptions((prev) => ({ ...prev, rows: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Columns</label>
        <input
          type="range"
          min="2"
          max="10"
          value={cellLayerOptions.columns}
          onChange={(e) => setCellLayerOptions((prev) => ({ ...prev, columns: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input
          type="number"
          value={cellLayerOptions.columns}
          onChange={(e) => setCellLayerOptions((prev) => ({ ...prev, columns: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Show Nuclei</label>
        <label style={styles.optionCheckbox}>
          <input
            type="checkbox"
            checked={cellLayerOptions.showNuclei}
            onChange={(e) => setCellLayerOptions((prev) => ({ ...prev, showNuclei: e.target.checked }))}
            style={styles.checkbox}
          />
        </label>
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Tight Junctions</label>
        <label style={styles.optionCheckbox}>
          <input
            type="checkbox"
            checked={cellLayerOptions.junctions}
            onChange={(e) => setCellLayerOptions((prev) => ({ ...prev, junctions: e.target.checked }))}
            style={styles.checkbox}
          />
        </label>
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Cell Color</label>
        <input
          type="color"
          value={cellLayerOptions.fill}
          onChange={(e) => setCellLayerOptions((prev) => ({ ...prev, fill: e.target.value }))}
          style={styles.colorInput}
        />
      </div>
    </>
  );

  // Render Pathway Arrow options
  const renderArrowOptions = () => (
    <>
      <div style={styles.sectionTitle}>Arrow Type</div>
      <div style={styles.presetsContainer}>
        {(['activation', 'inhibition', 'catalysis', 'transport', 'binding'] as const).map((type) => (
          <button
            key={type}
            style={{
              ...styles.presetButton,
              ...(arrowOptions.type === type || hoveredPreset === type ? styles.presetButtonHover : {}),
            }}
            onMouseEnter={() => setHoveredPreset(type)}
            onMouseLeave={() => setHoveredPreset(null)}
            onClick={() => setArrowOptions((prev) => ({ ...prev, type }))}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div style={styles.sectionTitle}>Parameters</div>
      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Curved</label>
        <label style={styles.optionCheckbox}>
          <input
            type="checkbox"
            checked={arrowOptions.curved}
            onChange={(e) => setArrowOptions((prev) => ({ ...prev, curved: e.target.checked }))}
            style={styles.checkbox}
          />
        </label>
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Label</label>
        <input
          type="text"
          value={arrowOptions.label || ''}
          onChange={(e) => setArrowOptions((prev) => ({ ...prev, label: e.target.value || undefined }))}
          placeholder="e.g., ATP"
          style={styles.optionInput}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Stroke Width</label>
        <input
          type="range"
          min="1"
          max="5"
          value={arrowOptions.strokeWidth}
          onChange={(e) => setArrowOptions((prev) => ({ ...prev, strokeWidth: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input
          type="number"
          value={arrowOptions.strokeWidth}
          onChange={(e) => setArrowOptions((prev) => ({ ...prev, strokeWidth: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>
    </>
  );

  // Render Neuron options
  const renderNeuronOptions = () => (
    <>
      <div style={styles.sectionTitle}>Neuron Type</div>
      <div style={styles.presetsContainer}>
        {(['pyramidal', 'interneuron', 'motor', 'sensory'] as const).map((type) => (
          <button
            key={type}
            style={{
              ...styles.presetButton,
              ...(neuronOptions.type === type || hoveredPreset === type ? styles.presetButtonHover : {}),
            }}
            onMouseEnter={() => setHoveredPreset(type)}
            onMouseLeave={() => setHoveredPreset(null)}
            onClick={() => setNeuronOptions((prev) => ({ ...prev, type }))}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div style={styles.sectionTitle}>Parameters</div>
      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Dendrites</label>
        <input
          type="range"
          min="2"
          max="8"
          value={neuronOptions.dendrites}
          onChange={(e) => setNeuronOptions((prev) => ({ ...prev, dendrites: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input
          type="number"
          value={neuronOptions.dendrites}
          onChange={(e) => setNeuronOptions((prev) => ({ ...prev, dendrites: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Axon Length</label>
        <input
          type="range"
          min="80"
          max="250"
          value={neuronOptions.axonLength}
          onChange={(e) => setNeuronOptions((prev) => ({ ...prev, axonLength: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input
          type="number"
          value={neuronOptions.axonLength}
          onChange={(e) => setNeuronOptions((prev) => ({ ...prev, axonLength: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Show Myelin</label>
        <label style={styles.optionCheckbox}>
          <input
            type="checkbox"
            checked={neuronOptions.showMyelin}
            onChange={(e) => setNeuronOptions((prev) => ({ ...prev, showMyelin: e.target.checked }))}
            style={styles.checkbox}
          />
        </label>
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Soma Color</label>
        <input
          type="color"
          value={neuronOptions.fill}
          onChange={(e) => setNeuronOptions((prev) => ({ ...prev, fill: e.target.value }))}
          style={styles.colorInput}
        />
      </div>
    </>
  );

  // Render Mitochondria options
  const renderMitoOptions = () => (
    <>
      <div style={styles.sectionTitle}>Parameters</div>
      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Width</label>
        <input
          type="range"
          min="80"
          max="200"
          value={mitoOptions.width}
          onChange={(e) => setMitoOptions((prev) => ({ ...prev, width: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input
          type="number"
          value={mitoOptions.width}
          onChange={(e) => setMitoOptions((prev) => ({ ...prev, width: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Height</label>
        <input
          type="range"
          min="40"
          max="100"
          value={mitoOptions.height}
          onChange={(e) => setMitoOptions((prev) => ({ ...prev, height: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input
          type="number"
          value={mitoOptions.height}
          onChange={(e) => setMitoOptions((prev) => ({ ...prev, height: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Cristae</label>
        <input
          type="range"
          min="2"
          max="10"
          value={mitoOptions.cristaCount}
          onChange={(e) => setMitoOptions((prev) => ({ ...prev, cristaCount: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input
          type="number"
          value={mitoOptions.cristaCount}
          onChange={(e) => setMitoOptions((prev) => ({ ...prev, cristaCount: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Show Matrix</label>
        <label style={styles.optionCheckbox}>
          <input
            type="checkbox"
            checked={mitoOptions.showMatrix}
            onChange={(e) => setMitoOptions((prev) => ({ ...prev, showMatrix: e.target.checked }))}
            style={styles.checkbox}
          />
        </label>
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Fill Color</label>
        <input
          type="color"
          value={mitoOptions.fill}
          onChange={(e) => setMitoOptions((prev) => ({ ...prev, fill: e.target.value }))}
          style={styles.colorInput}
        />
      </div>
    </>
  );

  // Render options based on category
  const renderOptions = () => {
    switch (activeCategory) {
      case 'dna':
        return renderDNAOptions();
      case 'membrane':
        return renderMembraneOptions();
      case 'cellLayer':
        return renderCellLayerOptions();
      case 'arrow':
        return renderArrowOptions();
      case 'neuron':
        return renderNeuronOptions();
      case 'mitochondria':
        return renderMitoOptions();
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h3 style={styles.title}>
          <ShapesIcon />
          Scientific Shapes
        </h3>
        {onClose && (
          <button style={styles.closeButton} onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        )}
      </div>

      {/* Content */}
      <div style={styles.content}>
        {/* Category Sidebar */}
        <div style={styles.sidebar}>
          {shapeCategories.map((category) => (
            <button
              key={category.id}
              style={{
                ...styles.categoryButton,
                ...(activeCategory === category.id ? styles.categoryButtonActive : {}),
              }}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          {/* Description */}
          <p style={styles.description}>{categoryInfo?.description}</p>

          {/* Preview */}
          <div style={styles.previewContainer}>
            {previewSvg && (
              <div
                style={styles.previewSvg}
                dangerouslySetInnerHTML={{ __html: previewSvg }}
              />
            )}
          </div>

          {/* Options */}
          <div style={styles.optionsContainer}>{renderOptions()}</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={styles.buttonRow}>
        <button style={{ ...styles.button, ...styles.secondaryButton }} onClick={handleReset}>
          Reset
        </button>
        <button style={{ ...styles.button, ...styles.primaryButton }} onClick={handleInsert}>
          <InsertIcon />
          Insert to Canvas
        </button>
      </div>
    </div>
  );
}

export default ShapeGeneratorPanel;
