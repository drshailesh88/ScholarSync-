/**
 * Cell Layer Panel Component
 * Advanced controls for generating cell layer/tissue illustrations
 *
 * @module components/shapes/CellLayerPanel
 */

import { useState, useCallback, useMemo } from 'react';
import { generateCellLayer, type CellLayerOptions } from '@/lib/illustration/lib/shapes/scientific-shapes';
import { useCanvas } from '../Canvas/CanvasContext';

// ============================================================================
// Types
// ============================================================================

export interface CellLayerPanelProps {
  /** Callback when shape is inserted */
  onInsert?: () => void;
  /** Whether panel is disabled */
  disabled?: boolean;
}

type CellType = 'epithelial' | 'endothelial' | 'squamous' | 'cuboidal' | 'columnar';

// ============================================================================
// Styles
// ============================================================================

const styles = {
  panel: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    padding: '16px',
    backgroundColor: 'var(--bg-secondary, #1e1e1e)',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '400px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  label: {
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-secondary, #9d9d9d)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  row: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-end',
  },
  column: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  slider: {
    flex: 1,
    height: '4px',
    WebkitAppearance: 'none' as const,
    appearance: 'none' as const,
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    borderRadius: '2px',
    outline: 'none',
    cursor: 'pointer',
  },
  sliderValue: {
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-muted, #666)',
    minWidth: '40px',
    textAlign: 'right' as const,
    fontFamily: 'monospace',
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    color: 'var(--text-primary, #ffffff)',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    outline: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box' as const,
  },
  toggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  toggleTrack: {
    width: '40px',
    height: '20px',
    borderRadius: '10px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    position: 'relative' as const,
    cursor: 'pointer',
    transition: 'background-color 200ms ease',
  },
  toggleTrackActive: {
    backgroundColor: 'var(--accent-primary, #3b82f6)',
  },
  toggleThumb: {
    position: 'absolute' as const,
    top: '2px',
    left: '2px',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
    transition: 'transform 200ms ease',
  },
  toggleThumbActive: {
    transform: 'translateX(20px)',
  },
  toggleLabel: {
    fontSize: '13px',
    color: 'var(--text-primary, #ffffff)',
  },
  colorPickers: {
    display: 'flex',
    gap: '16px',
  },
  colorPickerWrapper: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '4px',
  },
  colorPicker: {
    width: '36px',
    height: '36px',
    padding: '0',
    border: '2px solid var(--border-color, #333)',
    borderRadius: '6px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
  },
  colorLabel: {
    fontSize: '11px',
    color: 'var(--text-muted, #666)',
  },
  previewContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    padding: '12px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    borderRadius: '8px',
    alignItems: 'center',
  },
  previewLabel: {
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-secondary, #9d9d9d)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    alignSelf: 'flex-start',
  },
  previewSvg: {
    maxWidth: '100%',
    maxHeight: '200px',
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    padding: '12px',
    overflow: 'auto' as const,
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: 500,
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    border: 'none',
    backgroundColor: 'var(--accent-primary, #3b82f6)',
    color: '#ffffff',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  infoBox: {
    padding: '12px',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '6px',
    fontSize: '12px',
    color: 'var(--text-secondary, #9d9d9d)',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
  },
};

// ============================================================================
// Icons
// ============================================================================

const InsertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

// ============================================================================
// Component
// ============================================================================

export function CellLayerPanel({
  onInsert,
  disabled = false,
}: CellLayerPanelProps): JSX.Element {
  // State
  const [rows, setRows] = useState(2);
  const [columns, setColumns] = useState(5);
  const [cellWidth, setCellWidth] = useState(40);
  const [cellHeight, setCellHeight] = useState(50);
  const [cellType, setCellType] = useState<CellType>('cuboidal');
  const [showNuclei, setShowNuclei] = useState(true);
  const [showJunctions, setShowJunctions] = useState(true);
  const [fillColor, setFillColor] = useState('#FEF3C7');
  const [strokeColor, setStrokeColor] = useState('#6B7280');

  // Canvas context
  const { importSVG, canvas } = useCanvas();

  // Generate preview SVG
  const previewSvg = useMemo(() => {
    const options: CellLayerOptions = {
      rows,
      columns,
      cellWidth,
      cellHeight,
      cellType,
      showNuclei,
      junctions: showJunctions,
      fill: fillColor,
      stroke: strokeColor,
    };
    return generateCellLayer(options);
  }, [rows, columns, cellWidth, cellHeight, cellType, showNuclei, showJunctions, fillColor, strokeColor]);

  // Handle insert
  const handleInsert = useCallback(async () => {
    if (!canvas) return;

    try {
      await importSVG(previewSvg);
      onInsert?.();
    } catch (error) {
      console.error('Failed to insert cell layer:', error);
    }
  }, [canvas, importSVG, previewSvg, onInsert]);

  const cellTypeOptions: Array<{ value: CellType; label: string; description: string }> = [
    { value: 'squamous', label: 'Squamous', description: 'Flat, scale-like cells' },
    { value: 'cuboidal', label: 'Cuboidal', description: 'Cube-shaped cells' },
    { value: 'columnar', label: 'Columnar', description: 'Tall, column-shaped cells' },
    { value: 'epithelial', label: 'Epithelial', description: 'General epithelial tissue' },
    { value: 'endothelial', label: 'Endothelial', description: 'Blood vessel lining cells' },
  ];

  return (
    <div style={styles.panel}>
      {/* Grid Size */}
      <div style={styles.row}>
        <div style={styles.column}>
          <label style={styles.label}>Rows</label>
          <div style={styles.sliderContainer}>
            <input aria-label="Range slider"
              type="range"
              min="1"
              max="6"
              step="1"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              style={styles.slider}
              disabled={disabled}
            />
            <span style={styles.sliderValue}>{rows}</span>
          </div>
        </div>
        <div style={styles.column}>
          <label style={styles.label}>Columns</label>
          <div style={styles.sliderContainer}>
            <input aria-label="Range slider"
              type="range"
              min="1"
              max="10"
              step="1"
              value={columns}
              onChange={(e) => setColumns(Number(e.target.value))}
              style={styles.slider}
              disabled={disabled}
            />
            <span style={styles.sliderValue}>{columns}</span>
          </div>
        </div>
      </div>

      {/* Cell Dimensions */}
      <div style={styles.row}>
        <div style={styles.column}>
          <label style={styles.label}>Cell Width (px)</label>
          <div style={styles.sliderContainer}>
            <input aria-label="Range slider"
              type="range"
              min="20"
              max="80"
              step="5"
              value={cellWidth}
              onChange={(e) => setCellWidth(Number(e.target.value))}
              style={styles.slider}
              disabled={disabled}
            />
            <span style={styles.sliderValue}>{cellWidth}</span>
          </div>
        </div>
        <div style={styles.column}>
          <label style={styles.label}>Cell Height (px)</label>
          <div style={styles.sliderContainer}>
            <input aria-label="Range slider"
              type="range"
              min="20"
              max="100"
              step="5"
              value={cellHeight}
              onChange={(e) => setCellHeight(Number(e.target.value))}
              style={styles.slider}
              disabled={disabled}
            />
            <span style={styles.sliderValue}>{cellHeight}</span>
          </div>
        </div>
      </div>

      {/* Cell Type */}
      <div style={styles.section}>
        <label style={styles.label}>Cell Type</label>
        <select aria-label="Select option"
          value={cellType}
          onChange={(e) => setCellType(e.target.value as CellType)}
          style={styles.select}
          disabled={disabled}
        >
          {cellTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label} - {option.description}
            </option>
          ))}
        </select>
      </div>

      {/* Toggles */}
      <div style={styles.section}>
        <div style={styles.toggle}>
          <div
            style={{
              ...styles.toggleTrack,
              ...(showNuclei ? styles.toggleTrackActive : {}),
            }}
            onClick={() => !disabled && setShowNuclei(!showNuclei)}
          >
            <div
              style={{
                ...styles.toggleThumb,
                ...(showNuclei ? styles.toggleThumbActive : {}),
              }}
            />
          </div>
          <span style={styles.toggleLabel}>Show Nuclei</span>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.toggle}>
          <div
            style={{
              ...styles.toggleTrack,
              ...(showJunctions ? styles.toggleTrackActive : {}),
            }}
            onClick={() => !disabled && setShowJunctions(!showJunctions)}
          >
            <div
              style={{
                ...styles.toggleThumb,
                ...(showJunctions ? styles.toggleThumbActive : {}),
              }}
            />
          </div>
          <span style={styles.toggleLabel}>Show Tight Junctions</span>
        </div>
      </div>

      {/* Colors */}
      <div style={styles.section}>
        <label style={styles.label}>Colors</label>
        <div style={styles.colorPickers}>
          <div style={styles.colorPickerWrapper}>
            <input aria-label="Color picker"
              type="color"
              value={fillColor}
              onChange={(e) => setFillColor(e.target.value)}
              style={styles.colorPicker}
              disabled={disabled}
            />
            <span style={styles.colorLabel}>Cell Fill</span>
          </div>
          <div style={styles.colorPickerWrapper}>
            <input aria-label="Color picker"
              type="color"
              value={strokeColor}
              onChange={(e) => setStrokeColor(e.target.value)}
              style={styles.colorPicker}
              disabled={disabled}
            />
            <span style={styles.colorLabel}>Outline</span>
          </div>
        </div>
      </div>

      {/* Info about cell type */}
      <div style={styles.infoBox}>
        <InfoIcon />
        <span>
          <strong>{cellTypeOptions.find(c => c.value === cellType)?.label}:</strong>{' '}
          {cellTypeOptions.find(c => c.value === cellType)?.description}.
          {cellType === 'columnar' && ' Includes apical microvilli.'}
        </span>
      </div>

      {/* Preview */}
      <div style={styles.previewContainer}>
        <span style={styles.previewLabel}>Preview</span>
        <div
          style={styles.previewSvg}
          dangerouslySetInnerHTML={{ __html: previewSvg }}
        />
      </div>

      {/* Insert Button */}
      <button
        style={{
          ...styles.button,
          ...(disabled || !canvas ? styles.buttonDisabled : {}),
        }}
        onClick={handleInsert}
        disabled={disabled || !canvas}
      >
        <InsertIcon />
        Insert Cell Layer
      </button>
    </div>
  );
}

export default CellLayerPanel;
