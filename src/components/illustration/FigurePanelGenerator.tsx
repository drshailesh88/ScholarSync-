"use client";
/**
 * FigurePanelGenerator Component
 *
 * Creates multi-panel figure layouts with auto-labeling.
 * Supports various grid configurations (2x2, 2x3, 3x3, etc.) with A, B, C labels.
 *
 * @module components/illustration/FigurePanelGenerator
 */

import React, { useState, useCallback, useMemo } from 'react';
import { useEditorStore } from '@/stores/illustration/editorStore';
import { Rect, IText } from 'fabric';

// ============================================================================
// TYPES
// ============================================================================

export interface FigurePanelGeneratorProps {
  /** Whether the panel is visible */
  isOpen?: boolean;
  /** Callback when panel should close */
  onClose?: () => void;
}

interface PanelConfig {
  rows: number;
  cols: number;
  panelWidth: number;
  panelHeight: number;
  gap: number;
  showLabels: boolean;
  labelPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  labelFontSize: number;
  strokeWidth: number;
  strokeColor: string;
  fillColor: string;
}

interface PresetConfig {
  name: string;
  rows: number;
  cols: number;
  description: string;
}

// ============================================================================
// PRESETS
// ============================================================================

const PRESETS: PresetConfig[] = [
  { name: '1x1', rows: 1, cols: 1, description: 'Single panel' },
  { name: '1x2', rows: 1, cols: 2, description: 'Two panels side by side' },
  { name: '2x1', rows: 2, cols: 1, description: 'Two panels stacked' },
  { name: '2x2', rows: 2, cols: 2, description: 'Four panel grid' },
  { name: '2x3', rows: 2, cols: 3, description: 'Six panel grid' },
  { name: '3x2', rows: 3, cols: 2, description: 'Six panel vertical' },
  { name: '3x3', rows: 3, cols: 3, description: 'Nine panel grid' },
  { name: '2x4', rows: 2, cols: 4, description: 'Eight panel grid' },
  { name: '4x2', rows: 4, cols: 2, description: 'Eight panel vertical' },
];

const LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// ============================================================================
// STYLES
// ============================================================================

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  panel: {
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-primary)',
    borderRadius: '8px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    width: '400px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    borderBottom: '1px solid var(--border-primary)',
  },
  headerTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  closeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: 'transparent',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  closeButtonHover: {
    backgroundColor: 'var(--bg-hover)',
    color: 'var(--text-primary)',
  },
  content: {
    padding: '16px',
  },
  section: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '12px',
  },
  presetsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
  },
  presetButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    padding: '12px 8px',
    border: '2px solid var(--border-primary)',
    borderRadius: '6px',
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  presetButtonSelected: {
    borderColor: 'var(--accent-primary)',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  presetButtonHover: {
    borderColor: 'var(--accent-primary)',
  },
  presetName: {
    fontSize: '14px',
    fontWeight: 500,
  },
  presetDescription: {
    fontSize: '10px',
    color: 'var(--text-muted)',
    textAlign: 'center',
  },
  previewGrid: {
    display: 'grid',
    gap: '2px',
    width: '40px',
    height: '40px',
  },
  previewCell: {
    backgroundColor: 'var(--text-muted)',
    borderRadius: '2px',
  },
  controls: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginBottom: '20px',
  },
  controlGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  controlLabel: {
    fontSize: '11px',
    color: 'var(--text-secondary)',
  },
  controlInput: {
    padding: '8px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    fontSize: '13px',
  },
  controlSelect: {
    padding: '8px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    fontSize: '13px',
  },
  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 0',
  },
  toggleLabel: {
    fontSize: '13px',
    color: 'var(--text-primary)',
  },
  footer: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
    paddingTop: '16px',
    borderTop: '1px solid var(--border-primary)',
  },
  button: {
    padding: '10px 16px',
    border: '1px solid var(--border-primary)',
    borderRadius: '6px',
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  buttonPrimary: {
    backgroundColor: 'var(--accent-primary)',
    borderColor: 'var(--accent-primary)',
    color: 'white',
  },
  buttonHover: {
    backgroundColor: 'var(--bg-hover)',
  },
  buttonPrimaryHover: {
    backgroundColor: '#4f46e5',
  },
};

// ============================================================================
// ICONS
// ============================================================================

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ============================================================================
// SUBCOMPONENTS
// ============================================================================

interface PresetButtonProps {
  preset: PresetConfig;
  isSelected: boolean;
  onSelect: () => void;
}

function PresetButton({ preset, isSelected, onSelect }: PresetButtonProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  // Generate preview grid
  const previewCells = useMemo(() => {
    const cells = [];
    for (let i = 0; i < preset.rows * preset.cols; i++) {
      cells.push(<div key={i} style={styles.previewCell} />);
    }
    return cells;
  }, [preset.rows, preset.cols]);

  const gridStyle = {
    ...styles.previewGrid,
    gridTemplateColumns: `repeat(${preset.cols}, 1fr)`,
    gridTemplateRows: `repeat(${preset.rows}, 1fr)`,
  };

  return (
    <button
      style={{
        ...styles.presetButton,
        ...(isSelected ? styles.presetButtonSelected : {}),
        ...(isHovered ? styles.presetButtonHover : {}),
      }}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={preset.description}
    >
      <div style={gridStyle}>{previewCells}</div>
      <span style={styles.presetName}>{preset.name}</span>
      <span style={styles.presetDescription}>{preset.description}</span>
    </button>
  );
}

interface NumberInputProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

function NumberInput({ label, value, min = 1, max = 1000, onChange }: NumberInputProps): JSX.Element {
  return (
    <div style={styles.controlGroup}>
      <label style={styles.controlLabel}>{label}</label>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Math.max(min, Math.min(max, parseInt(e.target.value) || min)))}
        style={styles.controlInput}
      />
    </div>
  );
}

interface SelectInputProps {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}

function SelectInput({ label, value, options, onChange }: SelectInputProps): JSX.Element {
  return (
    <div style={styles.controlGroup}>
      <label style={styles.controlLabel}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={styles.controlSelect}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function FigurePanelGenerator({
  isOpen = true,
  onClose
}: FigurePanelGeneratorProps): JSX.Element | null {
  const canvas = useEditorStore((state) => state.canvas);

  const [config, setConfig] = useState<PanelConfig>({
    rows: 2,
    cols: 2,
    panelWidth: 150,
    panelHeight: 150,
    gap: 20,
    showLabels: true,
    labelPosition: 'top-left',
    labelFontSize: 24,
    strokeWidth: 2,
    strokeColor: '#000000',
    fillColor: '#ffffff',
  });

  const selectedPreset = useMemo(() => {
    return PRESETS.find(p => p.rows === config.rows && p.cols === config.cols);
  }, [config.rows, config.cols]);

  // Select a preset
  const handleSelectPreset = useCallback((preset: PresetConfig) => {
    setConfig(prev => ({
      ...prev,
      rows: preset.rows,
      cols: preset.cols,
    }));
  }, []);

  // Update config value
  const updateConfig = useCallback(<K extends keyof PanelConfig>(key: K, value: PanelConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  }, []);

  // Generate the panel layout
  const handleGenerate = useCallback(() => {
    if (!canvas) return;

    const {
      rows,
      cols,
      panelWidth,
      panelHeight,
      gap,
      showLabels,
      labelPosition,
      labelFontSize,
      strokeWidth,
      strokeColor,
      fillColor,
    } = config;

    // Calculate total dimensions
    const totalWidth = cols * panelWidth + (cols - 1) * gap;
    const totalHeight = rows * panelHeight + (rows - 1) * gap;

    // Starting position (center in canvas)
    const startX = (canvas.width || 800) / 2 - totalWidth / 2;
    const startY = (canvas.height || 600) / 2 - totalHeight / 2;

    const allObjects: Array<Rect | IText> = [];

    // Create panels
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const index = row * cols + col;
        const label = LABELS[index] || '';

        // Panel rectangle
        const panelX = startX + col * (panelWidth + gap);
        const panelY = startY + row * (panelHeight + gap);

        const rect = new Rect({
          left: panelX,
          top: panelY,
          width: panelWidth,
          height: panelHeight,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth,
          selectable: true,
        });
        allObjects.push(rect);

        // Panel label
        if (showLabels && label) {
          let labelX = panelX;
          let labelY = panelY;
          const padding = 10;

          switch (labelPosition) {
            case 'top-left':
              labelX += padding;
              labelY += padding + labelFontSize;
              break;
            case 'top-right':
              labelX += panelWidth - padding;
              labelY += padding + labelFontSize;
              break;
            case 'bottom-left':
              labelX += padding;
              labelY += panelHeight - padding;
              break;
            case 'bottom-right':
              labelX += panelWidth - padding;
              labelY += panelHeight - padding;
              break;
            case 'center':
              labelX += panelWidth / 2;
              labelY += panelHeight / 2;
              break;
          }

          const text = new IText(label, {
            left: labelX,
            top: labelY,
            fontSize: labelFontSize,
            fontFamily: 'Arial',
            fill: strokeColor,
            fontWeight: 'bold',
          });

          // Align text based on position
          if (labelPosition === 'top-right' || labelPosition === 'bottom-right') {
            text.set('textAlign', 'right');
          } else if (labelPosition === 'center') {
            text.set('textAlign', 'center');
          } else {
            text.set('textAlign', 'left');
          }

          if (labelPosition === 'center') {
            text.set('textBaseline', 'middle');
          } else if (labelPosition.includes('bottom')) {
            text.set('textBaseline', 'bottom');
          } else {
            text.set('textBaseline', 'top');
          }

          allObjects.push(text);
        }
      }
    }

    // Group all objects and add to canvas
    if (allObjects.length > 0) {
      canvas.add(...allObjects);
      canvas.requestRenderAll();
    }

    if (onClose) {
      onClose();
    }
  }, [canvas, config, onClose]);

  if (!isOpen) return null;

  const labelPositionOptions = [
    { value: 'top-left', label: 'Top Left' },
    { value: 'top-right', label: 'Top Right' },
    { value: 'bottom-left', label: 'Bottom Left' },
    { value: 'bottom-right', label: 'Bottom Right' },
    { value: 'center', label: 'Center' },
  ];

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.panel} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={styles.header}>
          <span style={styles.headerTitle}>Figure Panel Layout</span>
          <button
            style={styles.closeButton}
            onClick={onClose}
            title="Close"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {/* Presets */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Layout Preset</div>
            <div style={styles.presetsGrid}>
              {PRESETS.map((preset) => (
                <PresetButton
                  key={preset.name}
                  preset={preset}
                  isSelected={selectedPreset?.name === preset.name}
                  onSelect={() => handleSelectPreset(preset)}
                />
              ))}
            </div>
          </div>

          {/* Dimensions */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Panel Dimensions</div>
            <div style={styles.controls}>
              <NumberInput
                label="Panel Width"
                value={config.panelWidth}
                min={50}
                max={500}
                onChange={(v) => updateConfig('panelWidth', v)}
              />
              <NumberInput
                label="Panel Height"
                value={config.panelHeight}
                min={50}
                max={500}
                onChange={(v) => updateConfig('panelHeight', v)}
              />
              <NumberInput
                label="Gap Between Panels"
                value={config.gap}
                min={0}
                max={100}
                onChange={(v) => updateConfig('gap', v)}
              />
              <NumberInput
                label="Label Font Size"
                value={config.labelFontSize}
                min={8}
                max={72}
                onChange={(v) => updateConfig('labelFontSize', v)}
              />
            </div>
          </div>

          {/* Appearance */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Appearance</div>
            <div style={styles.controls}>
              <div style={styles.controlGroup}>
                <label style={styles.controlLabel}>Stroke Width</label>
                <input
                  type="number"
                  value={config.strokeWidth}
                  min={0}
                  max={10}
                  step={0.5}
                  onChange={(e) => updateConfig('strokeWidth', parseFloat(e.target.value) || 0)}
                  style={styles.controlInput}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.controlLabel}>Stroke Color</label>
                <input
                  type="color"
                  value={config.strokeColor}
                  onChange={(e) => updateConfig('strokeColor', e.target.value)}
                  style={{ ...styles.controlInput, height: '38px', padding: '4px' }}
                />
              </div>
              <div style={styles.controlGroup}>
                <label style={styles.controlLabel}>Fill Color</label>
                <input
                  type="color"
                  value={config.fillColor}
                  onChange={(e) => updateConfig('fillColor', e.target.value)}
                  style={{ ...styles.controlInput, height: '38px', padding: '4px' }}
                />
              </div>
              <SelectInput
                label="Label Position"
                value={config.labelPosition}
                options={labelPositionOptions}
                onChange={(v) => updateConfig('labelPosition', v as PanelConfig['labelPosition'])}
              />
            </div>
            <div style={styles.toggleRow}>
              <span style={styles.toggleLabel}>Show Labels</span>
              <button
                style={{
                  ...styles.button,
                  padding: '6px 12px',
                  backgroundColor: config.showLabels ? 'var(--accent-primary)' : undefined,
                  borderColor: config.showLabels ? 'var(--accent-primary)' : undefined,
                  color: config.showLabels ? 'white' : undefined,
                }}
                onClick={() => updateConfig('showLabels', !config.showLabels)}
              >
                {config.showLabels ? 'On' : 'Off'}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div style={styles.footer}>
            <button style={styles.button} onClick={onClose}>
              Cancel
            </button>
            <button
              style={{ ...styles.button, ...styles.buttonPrimary }}
              onClick={handleGenerate}
            >
              Generate Panels
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FigurePanelGenerator;
