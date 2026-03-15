/**
 * Scientific Shape Generator Panel Component
 * UI for generating scientific shapes (DNA, membranes, neurons, etc.)
 *
 * @module components/tools/ShapeGeneratorPanel
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  generateDNAHelix,
  generateCellMembrane,
  generateCellLayer,
  generatePathwayArrow,
  generateNeuron,
  generateMitochondria,
  generateNucleus,
  generateRibosome,
  generateVesicle,
  generateVirus,
  generateBacteria,
  generateGolgi,
  generateER,
  generateMicrotubule,
  generateProtein,
  type DNAHelixOptions,
  type CellMembraneOptions,
  type CellLayerOptions,
  type PathwayArrowOptions,
  type NeuronOptions,
  type MitochondriaOptions,
  type NucleusOptions,
  type RibosomeOptions,
  type VesicleOptions,
  type VirusOptions,
  type BacteriaOptions,
  type GolgiOptions,
  type EROptions,
  type MicrotubuleOptions,
  type ProteinOptions,
} from '@/lib/illustration/lib/shapes/scientific-shapes';
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
  | 'mitochondria'
  | 'nucleus'
  | 'ribosome'
  | 'vesicle'
  | 'virus'
  | 'bacteria'
  | 'golgi'
  | 'er'
  | 'microtubule'
  | 'protein';

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

const NucleusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3" />
    <circle cx="6" cy="8" r="1.5" opacity="0.6" />
    <circle cx="18" cy="8" r="1.5" opacity="0.6" />
    <circle cx="12" cy="18" r="1.5" opacity="0.6" />
    <circle cx="12" cy="6" r="1.5" opacity="0.6" />
  </svg>
);

const RibosomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="10" rx="9" ry="4" />
    <ellipse cx="12" cy="10" rx="6" ry="2" />
    <ellipse cx="12" cy="14" rx="9" ry="4" />
    <path d="M 9 10 Q 12 14 15 10" fill="none" stroke="currentColor" strokeWidth="1.5" stroke-dasharray="2 2" />
  </svg>
);

const VesicleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <circle cx="16" cy="8" r="2" opacity="0.5" />
    <circle cx="8" cy="16" r="2" opacity="0.5" />
  </svg>
);

const VirusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="8" />
    <path d="M 12 4 L 12 8 M 12 16 L 12 20 M 4 12 L 8 12 M 16 12 L 20 12" />
    <circle cx="12" cy="4" r="2" />
    <circle cx="12" cy="20" r="2" />
    <circle cx="4" cy="12" r="2" />
    <circle cx="20" cy="12" r="2" />
  </svg>
);

const BacteriaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="12" rx="4" ry="9" />
    <path d="M 16 12 Q 20 8 20 12" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const GolgiIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M 6 6 Q 12 4 18 6" fill="none" />
    <path d="M 6 10 Q 12 8 18 10" fill="none" />
    <path d="M 6 14 Q 12 12 18 14" fill="none" />
    <path d="M 6 18 Q 12 16 18 18" fill="none" />
    <circle cx="4" cy="6" r="2" />
    <circle cx="20" cy="18" r="2" />
  </svg>
);

const ERIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M 4 8 Q 12 4 20 8" fill="none" />
    <path d="M 4 12 Q 12 8 20 12" fill="none" />
    <path d="M 4 16 Q 12 12 20 16" fill="none" />
    <circle cx="6" cy="10" r="1" />
    <circle cx="10" cy="14" r="1" />
    <circle cx="14" cy="10" r="1" />
    <circle cx="18" cy="14" r="1" />
  </svg>
);

const MicrotubuleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <line x1="6" y1="4" x2="6" y2="20" />
    <line x1="10" y1="4" x2="10" y2="20" />
    <line x1="14" y1="4" x2="14" y2="20" />
    <line x1="18" y1="4" x2="18" y2="20" />
  </svg>
);

const ProteinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M 6 16 L 10 8 L 14 16" fill="none" />
    <path d="M 10 8 L 14 16 L 18 8" fill="none" />
    <circle cx="8" cy="12" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="16" cy="12" r="1" />
    <text x="3" y="9" font-size="6" fill="currentColor">N</text>
    <text x="15" y="9" font-size="6" fill="currentColor">C</text>
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
  {
    id: 'nucleus',
    name: 'Nucleus',
    icon: <NucleusIcon />,
    description: 'Generate cell nucleus with nuclear pores and nucleolus.',
  },
  {
    id: 'ribosome',
    name: 'Ribosome',
    icon: <RibosomeIcon />,
    description: 'Create ribosomes with large/small subunits and mRNA.',
  },
  {
    id: 'vesicle',
    name: 'Vesicle',
    icon: <VesicleIcon />,
    description: 'Generate membrane-bound vesicles with cargo.',
  },
  {
    id: 'virus',
    name: 'Virus',
    icon: <VirusIcon />,
    description: 'Create viral particles (icosahedral, envelope, bacteriophage).',
  },
  {
    id: 'bacteria',
    name: 'Bacteria',
    icon: <BacteriaIcon />,
    description: 'Generate bacterial cells (bacillus, coccus, spirillum).',
  },
  {
    id: 'golgi',
    name: 'Golgi',
    icon: <GolgiIcon />,
    description: 'Create Golgi apparatus with stacked cisternae.',
  },
  {
    id: 'er',
    name: 'ER',
    icon: <ERIcon />,
    description: 'Generate endoplasmic reticulum (rough or smooth).',
  },
  {
    id: 'microtubule',
    name: 'Microtubule',
    icon: <MicrotubuleIcon />,
    description: 'Generate microtubules with protofilaments.',
  },
  {
    id: 'protein',
    name: 'Protein',
    icon: <ProteinIcon />,
    description: 'Generate protein structures (alpha helix, beta sheet, tertiary).',
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

const defaultNucleusOptions: NucleusOptions = {
  diameter: 100,
  pores: 8,
  envelopeStyle: 'solid',
  stroke: '#4a5568',
  strokeWidth: 2,
  fill: '#e2e8f0',
};

const defaultRibosomeOptions: RibosomeOptions = {
  size: 60,
  subunits: 'both',
  showRna: true,
  stroke: '#4a5568',
  strokeWidth: 2,
  fill: '#fcd34d',
};

const defaultVesicleOptions: VesicleOptions = {
  diameter: 80,
  cargo: 'dots',
  membraneStyle: 'solid',
  stroke: '#4a5568',
  strokeWidth: 2,
  fill: '#c4b5fd',
};

const defaultVirusOptions: VirusOptions = {
  diameter: 100,
  type: 'icosahedral',
  spikeLength: 15,
  stroke: '#4a5568',
  strokeWidth: 2,
  fill: '#10b981',
};

const defaultBacteriaOptions: BacteriaOptions = {
  type: 'bacillus',
  length: 100,
  width: 40,
  flagella: 2,
  stroke: '#4a5568',
  strokeWidth: 2,
  fill: '#34d399',
};

const defaultGolgiOptions: GolgiOptions = {
  size: 120,
  cisternae: 5,
  stroke: '#4a5568',
  strokeWidth: 2,
  fill: '#f472b6',
};

const defaultEROptions: EROptions = {
  type: 'rough',
  size: 120,
  branches: 5,
  stroke: '#4a5568',
  strokeWidth: 2,
  fill: '#fbbf24',
};

const defaultMicrotubuleOptions: MicrotubuleOptions = {
  length: 200,
  protofilaments: 13,
  showDimer: false,
  stroke: '#4a5568',
  strokeWidth: 2,
};

const defaultProteinOptions: ProteinOptions = {
  type: 'alpha-helix',
  length: 150,
  strands: 3,
  stroke: '#4a5568',
  strokeWidth: 2,
  fill: '#60a5fa',
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
  const [nucleusOptions, setNucleusOptions] = useState<NucleusOptions>(defaultNucleusOptions);
  const [ribosomeOptions, setRibosomeOptions] = useState<RibosomeOptions>(defaultRibosomeOptions);
  const [vesicleOptions, setVesicleOptions] = useState<VesicleOptions>(defaultVesicleOptions);
  const [virusOptions, setVirusOptions] = useState<VirusOptions>(defaultVirusOptions);
  const [bacteriaOptions, setBacteriaOptions] = useState<BacteriaOptions>(defaultBacteriaOptions);
  const [golgiOptions, setGolgiOptions] = useState<GolgiOptions>(defaultGolgiOptions);
  const [erOptions, setErOptions] = useState<EROptions>(defaultEROptions);
  const [microtubuleOptions, setMicrotubuleOptions] = useState<MicrotubuleOptions>(defaultMicrotubuleOptions);
  const [proteinOptions, setProteinOptions] = useState<ProteinOptions>(defaultProteinOptions);
  const [hoveredPreset, setHoveredPreset] = useState<string | null>(null);

  // Canvas context
  const canvasContext = useCanvas();

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
        case 'nucleus':
          return generateNucleus(nucleusOptions);
        case 'ribosome':
          return generateRibosome(ribosomeOptions);
        case 'vesicle':
          return generateVesicle(vesicleOptions);
        case 'virus':
          return generateVirus(virusOptions);
        case 'bacteria':
          return generateBacteria(bacteriaOptions);
        case 'golgi':
          return generateGolgi(golgiOptions);
        case 'er':
          return generateER(erOptions);
        case 'microtubule':
          return generateMicrotubule(microtubuleOptions);
        case 'protein':
          return generateProtein(proteinOptions);
        default:
          return '';
      }
    } catch (error) {
      console.error('Error generating shape preview:', error);
      return '';
    }
  }, [activeCategory, dnaOptions, membraneOptions, cellLayerOptions, arrowOptions, neuronOptions, mitoOptions, nucleusOptions, ribosomeOptions, vesicleOptions, virusOptions, bacteriaOptions, golgiOptions, erOptions, microtubuleOptions, proteinOptions]);

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
      case 'nucleus':
        setNucleusOptions(defaultNucleusOptions);
        break;
      case 'ribosome':
        setRibosomeOptions(defaultRibosomeOptions);
        break;
      case 'vesicle':
        setVesicleOptions(defaultVesicleOptions);
        break;
      case 'virus':
        setVirusOptions(defaultVirusOptions);
        break;
      case 'bacteria':
        setBacteriaOptions(defaultBacteriaOptions);
        break;
      case 'golgi':
        setGolgiOptions(defaultGolgiOptions);
        break;
      case 'er':
        setErOptions(defaultEROptions);
        break;
      case 'microtubule':
        setMicrotubuleOptions(defaultMicrotubuleOptions);
        break;
      case 'protein':
        setProteinOptions(defaultProteinOptions);
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
        <input aria-label="Range slider"
          type="range"
          min="100"
          max="400"
          value={dnaOptions.length}
          onChange={(e) => setDnaOptions((prev) => ({ ...prev, length: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={dnaOptions.length}
          onChange={(e) => setDnaOptions((prev) => ({ ...prev, length: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Base Pairs</label>
        <input aria-label="Range slider"
          type="range"
          min="3"
          max="20"
          value={dnaOptions.basePairs}
          onChange={(e) => setDnaOptions((prev) => ({ ...prev, basePairs: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={dnaOptions.basePairs}
          onChange={(e) => setDnaOptions((prev) => ({ ...prev, basePairs: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Width</label>
        <input aria-label="Range slider"
          type="range"
          min="20"
          max="80"
          value={dnaOptions.width}
          onChange={(e) => setDnaOptions((prev) => ({ ...prev, width: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={dnaOptions.width}
          onChange={(e) => setDnaOptions((prev) => ({ ...prev, width: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Show Base Pairs</label>
        <label style={styles.optionCheckbox}>
          <input aria-label="Checkbox"
            type="checkbox"
            checked={dnaOptions.showBasePairs}
            onChange={(e) => setDnaOptions((prev) => ({ ...prev, showBasePairs: e.target.checked }))}
            style={styles.checkbox}
          />
        </label>
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Stroke Color</label>
        <input aria-label="Color picker"
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
        <input aria-label="Range slider"
          type="range"
          min="150"
          max="500"
          value={membraneOptions.length}
          onChange={(e) => setMembraneOptions((prev) => ({ ...prev, length: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={membraneOptions.length}
          onChange={(e) => setMembraneOptions((prev) => ({ ...prev, length: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Phospholipids</label>
        <input aria-label="Range slider"
          type="range"
          min="5"
          max="30"
          value={membraneOptions.phospholipidCount}
          onChange={(e) => setMembraneOptions((prev) => ({ ...prev, phospholipidCount: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={membraneOptions.phospholipidCount}
          onChange={(e) => setMembraneOptions((prev) => ({ ...prev, phospholipidCount: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Bilayer</label>
        <label style={styles.optionCheckbox}>
          <input aria-label="Checkbox"
            type="checkbox"
            checked={membraneOptions.bilayer}
            onChange={(e) => setMembraneOptions((prev) => ({ ...prev, bilayer: e.target.checked }))}
            style={styles.checkbox}
          />
        </label>
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Head Color</label>
        <input aria-label="Color picker"
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
        <select aria-label="Select option"
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
        <input aria-label="Range slider"
          type="range"
          min="1"
          max="5"
          value={cellLayerOptions.rows}
          onChange={(e) => setCellLayerOptions((prev) => ({ ...prev, rows: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={cellLayerOptions.rows}
          onChange={(e) => setCellLayerOptions((prev) => ({ ...prev, rows: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Columns</label>
        <input aria-label="Range slider"
          type="range"
          min="2"
          max="10"
          value={cellLayerOptions.columns}
          onChange={(e) => setCellLayerOptions((prev) => ({ ...prev, columns: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={cellLayerOptions.columns}
          onChange={(e) => setCellLayerOptions((prev) => ({ ...prev, columns: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Show Nuclei</label>
        <label style={styles.optionCheckbox}>
          <input aria-label="Checkbox"
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
          <input aria-label="Checkbox"
            type="checkbox"
            checked={cellLayerOptions.junctions}
            onChange={(e) => setCellLayerOptions((prev) => ({ ...prev, junctions: e.target.checked }))}
            style={styles.checkbox}
          />
        </label>
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Cell Color</label>
        <input aria-label="Color picker"
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
          <input aria-label="Checkbox"
            type="checkbox"
            checked={arrowOptions.curved}
            onChange={(e) => setArrowOptions((prev) => ({ ...prev, curved: e.target.checked }))}
            style={styles.checkbox}
          />
        </label>
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Label</label>
        <input aria-label="Text input"
          type="text"
          value={arrowOptions.label || ''}
          onChange={(e) => setArrowOptions((prev) => ({ ...prev, label: e.target.value || undefined }))}
          placeholder="e.g., ATP"
          style={styles.optionInput}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Stroke Width</label>
        <input aria-label="Range slider"
          type="range"
          min="1"
          max="5"
          value={arrowOptions.strokeWidth}
          onChange={(e) => setArrowOptions((prev) => ({ ...prev, strokeWidth: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
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
        <input aria-label="Range slider"
          type="range"
          min="2"
          max="8"
          value={neuronOptions.dendrites}
          onChange={(e) => setNeuronOptions((prev) => ({ ...prev, dendrites: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={neuronOptions.dendrites}
          onChange={(e) => setNeuronOptions((prev) => ({ ...prev, dendrites: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Axon Length</label>
        <input aria-label="Range slider"
          type="range"
          min="80"
          max="250"
          value={neuronOptions.axonLength}
          onChange={(e) => setNeuronOptions((prev) => ({ ...prev, axonLength: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={neuronOptions.axonLength}
          onChange={(e) => setNeuronOptions((prev) => ({ ...prev, axonLength: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Show Myelin</label>
        <label style={styles.optionCheckbox}>
          <input aria-label="Checkbox"
            type="checkbox"
            checked={neuronOptions.showMyelin}
            onChange={(e) => setNeuronOptions((prev) => ({ ...prev, showMyelin: e.target.checked }))}
            style={styles.checkbox}
          />
        </label>
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Soma Color</label>
        <input aria-label="Color picker"
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
        <input aria-label="Range slider"
          type="range"
          min="80"
          max="200"
          value={mitoOptions.width}
          onChange={(e) => setMitoOptions((prev) => ({ ...prev, width: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={mitoOptions.width}
          onChange={(e) => setMitoOptions((prev) => ({ ...prev, width: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Height</label>
        <input aria-label="Range slider"
          type="range"
          min="40"
          max="100"
          value={mitoOptions.height}
          onChange={(e) => setMitoOptions((prev) => ({ ...prev, height: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={mitoOptions.height}
          onChange={(e) => setMitoOptions((prev) => ({ ...prev, height: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Cristae</label>
        <input aria-label="Range slider"
          type="range"
          min="2"
          max="10"
          value={mitoOptions.cristaCount}
          onChange={(e) => setMitoOptions((prev) => ({ ...prev, cristaCount: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={mitoOptions.cristaCount}
          onChange={(e) => setMitoOptions((prev) => ({ ...prev, cristaCount: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Show Matrix</label>
        <label style={styles.optionCheckbox}>
          <input aria-label="Checkbox"
            type="checkbox"
            checked={mitoOptions.showMatrix}
            onChange={(e) => setMitoOptions((prev) => ({ ...prev, showMatrix: e.target.checked }))}
            style={styles.checkbox}
          />
        </label>
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Fill Color</label>
        <input aria-label="Color picker"
          type="color"
          value={mitoOptions.fill}
          onChange={(e) => setMitoOptions((prev) => ({ ...prev, fill: e.target.value }))}
          style={styles.colorInput}
        />
      </div>
    </>
  );

  // Render Nucleus options
  const renderNucleusOptions = () => (
    <>
      <div style={styles.sectionTitle}>Parameters</div>
      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Diameter</label>
        <input aria-label="Range slider"
          type="range"
          min="50"
          max="200"
          value={nucleusOptions.diameter}
          onChange={(e) => setNucleusOptions((prev) => ({ ...prev, diameter: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={nucleusOptions.diameter}
          onChange={(e) => setNucleusOptions((prev) => ({ ...prev, diameter: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Pores</label>
        <input aria-label="Range slider"
          type="range"
          min="0"
          max="20"
          value={nucleusOptions.pores}
          onChange={(e) => setNucleusOptions((prev) => ({ ...prev, pores: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={nucleusOptions.pores}
          onChange={(e) => setNucleusOptions((prev) => ({ ...prev, pores: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Envelope</label>
        <select aria-label="Select option"
          value={nucleusOptions.envelopeStyle}
          onChange={(e) =>
            setNucleusOptions((prev) => ({
              ...prev,
              envelopeStyle: e.target.value as 'solid' | 'dotted' | 'double',
            }))
          }
          style={styles.optionSelect}
        >
          <option value="solid">Solid</option>
          <option value="dotted">Dotted</option>
          <option value="double">Double</option>
        </select>
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Fill Color</label>
        <input aria-label="Color picker"
          type="color"
          value={nucleusOptions.fill}
          onChange={(e) => setNucleusOptions((prev) => ({ ...prev, fill: e.target.value }))}
          style={styles.colorInput}
        />
      </div>
    </>
  );

  // Render Ribosome options
  const renderRibosomeOptions = () => (
    <>
      <div style={styles.sectionTitle}>Parameters</div>
      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Size</label>
        <input aria-label="Range slider"
          type="range"
          min="30"
          max="100"
          value={ribosomeOptions.size}
          onChange={(e) => setRibosomeOptions((prev) => ({ ...prev, size: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={ribosomeOptions.size}
          onChange={(e) => setRibosomeOptions((prev) => ({ ...prev, size: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Subunits</label>
        <select aria-label="Select option"
          value={ribosomeOptions.subunits}
          onChange={(e) =>
            setRibosomeOptions((prev) => ({
              ...prev,
              subunits: e.target.value as 'large' | 'small' | 'both',
            }))
          }
          style={styles.optionSelect}
        >
          <option value="both">Both</option>
          <option value="large">Large</option>
          <option value="small">Small</option>
        </select>
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Show mRNA</label>
        <label style={styles.optionCheckbox}>
          <input aria-label="Checkbox"
            type="checkbox"
            checked={ribosomeOptions.showRna}
            onChange={(e) => setRibosomeOptions((prev) => ({ ...prev, showRna: e.target.checked }))}
            style={styles.checkbox}
          />
        </label>
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Fill Color</label>
        <input aria-label="Color picker"
          type="color"
          value={ribosomeOptions.fill}
          onChange={(e) => setRibosomeOptions((prev) => ({ ...prev, fill: e.target.value }))}
          style={styles.colorInput}
        />
      </div>
    </>
  );

  // Render Vesicle options
  const renderVesicleOptions = () => (
    <>
      <div style={styles.sectionTitle}>Parameters</div>
      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Diameter</label>
        <input aria-label="Range slider"
          type="range"
          min="30"
          max="150"
          value={vesicleOptions.diameter}
          onChange={(e) => setVesicleOptions((prev) => ({ ...prev, diameter: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={vesicleOptions.diameter}
          onChange={(e) => setVesicleOptions((prev) => ({ ...prev, diameter: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Cargo</label>
        <select aria-label="Select option"
          value={vesicleOptions.cargo}
          onChange={(e) =>
            setVesicleOptions((prev) => ({
              ...prev,
              cargo: e.target.value as 'none' | 'dots' | 'circle',
            }))
          }
          style={styles.optionSelect}
        >
          <option value="dots">Dots</option>
          <option value="circle">Circle</option>
          <option value="none">None</option>
        </select>
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Membrane</label>
        <select aria-label="Select option"
          value={vesicleOptions.membraneStyle}
          onChange={(e) =>
            setVesicleOptions((prev) => ({
              ...prev,
              membraneStyle: e.target.value as 'solid' | 'studded' | 'coated',
            }))
          }
          style={styles.optionSelect}
        >
          <option value="solid">Solid</option>
          <option value="studded">Studded</option>
          <option value="coated">Coated</option>
        </select>
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Fill Color</label>
        <input aria-label="Color picker"
          type="color"
          value={vesicleOptions.fill}
          onChange={(e) => setVesicleOptions((prev) => ({ ...prev, fill: e.target.value }))}
          style={styles.colorInput}
        />
      </div>
    </>
  );

  // Render Virus options
  const renderVirusOptions = () => (
    <>
      <div style={styles.sectionTitle}>Virus Type</div>
      <div style={styles.presetsContainer}>
        {(['icosahedral', 'envelope', 'bacteriophage'] as const).map((type) => (
          <button
            key={type}
            style={{
              ...styles.presetButton,
              ...(virusOptions.type === type || hoveredPreset === type ? styles.presetButtonHover : {}),
            }}
            onMouseEnter={() => setHoveredPreset(type)}
            onMouseLeave={() => setHoveredPreset(null)}
            onClick={() => setVirusOptions((prev) => ({ ...prev, type }))}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div style={styles.sectionTitle}>Parameters</div>
      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Diameter</label>
        <input aria-label="Range slider"
          type="range"
          min="50"
          max="200"
          value={virusOptions.diameter}
          onChange={(e) => setVirusOptions((prev) => ({ ...prev, diameter: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={virusOptions.diameter}
          onChange={(e) => setVirusOptions((prev) => ({ ...prev, diameter: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Spike Length</label>
        <input aria-label="Range slider"
          type="range"
          min="5"
          max="30"
          value={virusOptions.spikeLength}
          onChange={(e) => setVirusOptions((prev) => ({ ...prev, spikeLength: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={virusOptions.spikeLength}
          onChange={(e) => setVirusOptions((prev) => ({ ...prev, spikeLength: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Fill Color</label>
        <input aria-label="Color picker"
          type="color"
          value={virusOptions.fill}
          onChange={(e) => setVirusOptions((prev) => ({ ...prev, fill: e.target.value }))}
          style={styles.colorInput}
        />
      </div>
    </>
  );

  // Render Bacteria options
  const renderBacteriaOptions = () => (
    <>
      <div style={styles.sectionTitle}>Bacteria Type</div>
      <div style={styles.presetsContainer}>
        {(['bacillus', 'coccus', 'spirillum', 'diplococcus'] as const).map((type) => (
          <button
            key={type}
            style={{
              ...styles.presetButton,
              ...(bacteriaOptions.type === type || hoveredPreset === type ? styles.presetButtonHover : {}),
            }}
            onMouseEnter={() => setHoveredPreset(type)}
            onMouseLeave={() => setHoveredPreset(null)}
            onClick={() => setBacteriaOptions((prev) => ({ ...prev, type }))}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div style={styles.sectionTitle}>Parameters</div>
      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Length</label>
        <input aria-label="Range slider"
          type="range"
          min="50"
          max="200"
          value={bacteriaOptions.length}
          onChange={(e) => setBacteriaOptions((prev) => ({ ...prev, length: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={bacteriaOptions.length}
          onChange={(e) => setBacteriaOptions((prev) => ({ ...prev, length: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Width</label>
        <input aria-label="Range slider"
          type="range"
          min="20"
          max="80"
          value={bacteriaOptions.width}
          onChange={(e) => setBacteriaOptions((prev) => ({ ...prev, width: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={bacteriaOptions.width}
          onChange={(e) => setBacteriaOptions((prev) => ({ ...prev, width: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Flagella</label>
        <input aria-label="Range slider"
          type="range"
          min="0"
          max="6"
          value={bacteriaOptions.flagella}
          onChange={(e) => setBacteriaOptions((prev) => ({ ...prev, flagella: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={bacteriaOptions.flagella}
          onChange={(e) => setBacteriaOptions((prev) => ({ ...prev, flagella: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Fill Color</label>
        <input aria-label="Color picker"
          type="color"
          value={bacteriaOptions.fill}
          onChange={(e) => setBacteriaOptions((prev) => ({ ...prev, fill: e.target.value }))}
          style={styles.colorInput}
        />
      </div>
    </>
  );

  // Render Golgi options
  const renderGolgiOptions = () => (
    <>
      <div style={styles.sectionTitle}>Parameters</div>
      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Size</label>
        <input aria-label="Range slider"
          type="range"
          min="80"
          max="200"
          value={golgiOptions.size}
          onChange={(e) => setGolgiOptions((prev) => ({ ...prev, size: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={golgiOptions.size}
          onChange={(e) => setGolgiOptions((prev) => ({ ...prev, size: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Cisternae</label>
        <input aria-label="Range slider"
          type="range"
          min="3"
          max="8"
          value={golgiOptions.cisternae}
          onChange={(e) => setGolgiOptions((prev) => ({ ...prev, cisternae: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={golgiOptions.cisternae}
          onChange={(e) => setGolgiOptions((prev) => ({ ...prev, cisternae: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Fill Color</label>
        <input aria-label="Color picker"
          type="color"
          value={golgiOptions.fill}
          onChange={(e) => setGolgiOptions((prev) => ({ ...prev, fill: e.target.value }))}
          style={styles.colorInput}
        />
      </div>
    </>
  );

  // Render ER options
  const renderEROptions = () => (
    <>
      <div style={styles.sectionTitle}>ER Type</div>
      <div style={styles.presetsContainer}>
        {(['rough', 'smooth'] as const).map((type) => (
          <button
            key={type}
            style={{
              ...styles.presetButton,
              ...(erOptions.type === type || hoveredPreset === type ? styles.presetButtonHover : {}),
            }}
            onMouseEnter={() => setHoveredPreset(type)}
            onMouseLeave={() => setHoveredPreset(null)}
            onClick={() => setErOptions((prev) => ({ ...prev, type }))}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div style={styles.sectionTitle}>Parameters</div>
      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Size</label>
        <input aria-label="Range slider"
          type="range"
          min="80"
          max="200"
          value={erOptions.size}
          onChange={(e) => setErOptions((prev) => ({ ...prev, size: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={erOptions.size}
          onChange={(e) => setErOptions((prev) => ({ ...prev, size: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Branches</label>
        <input aria-label="Range slider"
          type="range"
          min="3"
          max="10"
          value={erOptions.branches}
          onChange={(e) => setErOptions((prev) => ({ ...prev, branches: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={erOptions.branches}
          onChange={(e) => setErOptions((prev) => ({ ...prev, branches: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Fill Color</label>
        <input aria-label="Color picker"
          type="color"
          value={erOptions.fill}
          onChange={(e) => setErOptions((prev) => ({ ...prev, fill: e.target.value }))}
          style={styles.colorInput}
        />
      </div>
    </>
  );

  // Render Microtubule options
  const renderMicrotubuleOptions = () => (
    <>
      <div style={styles.sectionTitle}>Parameters</div>
      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Length</label>
        <input aria-label="Range slider"
          type="range"
          min="100"
          max="400"
          value={microtubuleOptions.length}
          onChange={(e) => setMicrotubuleOptions((prev) => ({ ...prev, length: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={microtubuleOptions.length}
          onChange={(e) => setMicrotubuleOptions((prev) => ({ ...prev, length: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Protofilaments</label>
        <input aria-label="Range slider"
          type="range"
          min="5"
          max="20"
          value={microtubuleOptions.protofilaments}
          onChange={(e) => setMicrotubuleOptions((prev) => ({ ...prev, protofilaments: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={microtubuleOptions.protofilaments}
          onChange={(e) => setMicrotubuleOptions((prev) => ({ ...prev, protofilaments: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Show Dimers</label>
        <label style={styles.optionCheckbox}>
          <input aria-label="Checkbox"
            type="checkbox"
            checked={microtubuleOptions.showDimer}
            onChange={(e) => setMicrotubuleOptions((prev) => ({ ...prev, showDimer: e.target.checked }))}
            style={styles.checkbox}
          />
        </label>
      </div>
    </>
  );

  // Render Protein options
  const renderProteinOptions = () => (
    <>
      <div style={styles.sectionTitle}>Protein Structure</div>
      <div style={styles.presetsContainer}>
        {(['alpha-helix', 'beta-sheet', 'tertiary'] as const).map((type) => (
          <button
            key={type}
            style={{
              ...styles.presetButton,
              ...(proteinOptions.type === type || hoveredPreset === type ? styles.presetButtonHover : {}),
            }}
            onMouseEnter={() => setHoveredPreset(type)}
            onMouseLeave={() => setHoveredPreset(null)}
            onClick={() => setProteinOptions((prev) => ({ ...prev, type }))}
          >
            {type === 'alpha-helix' ? 'α-Helix' : type === 'beta-sheet' ? 'β-Sheet' : 'Tertiary'}
          </button>
        ))}
      </div>

      <div style={styles.sectionTitle}>Parameters</div>
      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Length</label>
        <input aria-label="Range slider"
          type="range"
          min="50"
          max="300"
          value={proteinOptions.length}
          onChange={(e) => setProteinOptions((prev) => ({ ...prev, length: Number(e.target.value) }))}
          style={styles.optionSlider}
        />
        <input aria-label="Number input"
          type="number"
          value={proteinOptions.length}
          onChange={(e) => setProteinOptions((prev) => ({ ...prev, length: Number(e.target.value) }))}
          style={{ ...styles.optionInput, maxWidth: '60px' }}
        />
      </div>

      {proteinOptions.type === 'beta-sheet' && (
        <div style={styles.optionRow}>
          <label style={styles.optionLabel}>Strands</label>
          <input aria-label="Range slider"
            type="range"
            min="2"
            max="6"
            value={proteinOptions.strands}
            onChange={(e) => setProteinOptions((prev) => ({ ...prev, strands: Number(e.target.value) }))}
            style={styles.optionSlider}
          />
          <input aria-label="Number input"
            type="number"
            value={proteinOptions.strands}
            onChange={(e) => setProteinOptions((prev) => ({ ...prev, strands: Number(e.target.value) }))}
            style={{ ...styles.optionInput, maxWidth: '60px' }}
          />
        </div>
      )}

      <div style={styles.optionRow}>
        <label style={styles.optionLabel}>Fill Color</label>
        <input aria-label="Color picker"
          type="color"
          value={proteinOptions.fill}
          onChange={(e) => setProteinOptions((prev) => ({ ...prev, fill: e.target.value }))}
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
      case 'nucleus':
        return renderNucleusOptions();
      case 'ribosome':
        return renderRibosomeOptions();
      case 'vesicle':
        return renderVesicleOptions();
      case 'virus':
        return renderVirusOptions();
      case 'bacteria':
        return renderBacteriaOptions();
      case 'golgi':
        return renderGolgiOptions();
      case 'er':
        return renderEROptions();
      case 'microtubule':
        return renderMicrotubuleOptions();
      case 'protein':
        return renderProteinOptions();
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
