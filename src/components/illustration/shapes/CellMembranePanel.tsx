/**
 * Cell Membrane Panel Component
 * Advanced controls for generating phospholipid bilayer illustrations
 *
 * @module components/shapes/CellMembranePanel
 */

import { useState, useCallback, useMemo } from 'react';
import { generateCellMembrane, type CellMembraneOptions, type MembraneProtein } from '@/lib/illustration/lib/shapes/scientific-shapes';
import { useCanvas } from '../Canvas/CanvasContext';

// ============================================================================
// Types
// ============================================================================

export interface CellMembranePanelProps {
  /** Callback when shape is inserted */
  onInsert?: () => void;
  /** Whether panel is disabled */
  disabled?: boolean;
}

type ProteinType = 'channel' | 'receptor' | 'pump' | 'transporter';

interface ProteinItem {
  id: string;
  type: ProteinType;
  position: number;
  label: string;
}

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
    maxWidth: '420px',
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
  proteinSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    padding: '12px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    borderRadius: '6px',
  },
  proteinHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  proteinList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    maxHeight: '150px',
    overflowY: 'auto' as const,
  },
  proteinItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px',
    backgroundColor: 'var(--bg-secondary, #1e1e1e)',
    borderRadius: '4px',
  },
  proteinSelect: {
    flex: 1,
    padding: '6px 8px',
    fontSize: '12px',
    color: 'var(--text-primary, #ffffff)',
    backgroundColor: 'var(--bg-primary, #121212)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '4px',
    outline: 'none',
    cursor: 'pointer',
  },
  proteinInput: {
    width: '60px',
    padding: '6px 8px',
    fontSize: '12px',
    color: 'var(--text-primary, #ffffff)',
    backgroundColor: 'var(--bg-primary, #121212)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '4px',
    outline: 'none',
  },
  proteinLabelInput: {
    flex: 1,
    padding: '6px 8px',
    fontSize: '12px',
    color: 'var(--text-primary, #ffffff)',
    backgroundColor: 'var(--bg-primary, #121212)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '4px',
    outline: 'none',
  },
  smallButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px 10px',
    fontSize: '12px',
    fontWeight: 500,
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    border: 'none',
  },
  addButton: {
    backgroundColor: 'var(--accent-primary, #3b82f6)',
    color: '#ffffff',
  },
  removeButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    color: '#ef4444',
    padding: '4px 8px',
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
    maxHeight: '150px',
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
  colorPicker: {
    width: '36px',
    height: '36px',
    padding: '0',
    border: '2px solid var(--border-color, #333)',
    borderRadius: '6px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
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

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const TrashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

// ============================================================================
// Component
// ============================================================================

export function CellMembranePanel({
  onInsert,
  disabled = false,
}: CellMembranePanelProps): JSX.Element {
  // State
  const [length, setLength] = useState(300);
  const [phospholipidCount, setPhospholipidCount] = useState(15);
  const [bilayer, setBilayer] = useState(true);
  const [curvature, setCurvature] = useState(0);
  const [fillColor, setFillColor] = useState('#FEF3C7');
  const [strokeColor, setStrokeColor] = useState('#6B7280');
  const [proteins, setProteins] = useState<ProteinItem[]>([]);

  // Canvas context
  const { importSVG, canvas } = useCanvas();

  // Generate preview SVG
  const previewSvg = useMemo(() => {
    const membraneProteins: MembraneProtein[] = proteins.map(p => ({
      position: p.position,
      type: p.type,
      label: p.label || undefined,
    }));

    const options: CellMembraneOptions = {
      length,
      phospholipidCount,
      bilayer,
      curvature,
      fill: fillColor,
      stroke: strokeColor,
      proteins: membraneProteins,
    };
    return generateCellMembrane(options);
  }, [length, phospholipidCount, bilayer, curvature, fillColor, strokeColor, proteins]);

  // Add protein
  const handleAddProtein = useCallback(() => {
    const newProtein: ProteinItem = {
      id: `protein-${Date.now()}`,
      type: 'channel',
      position: 0.5,
      label: '',
    };
    setProteins(prev => [...prev, newProtein]);
  }, []);

  // Remove protein
  const handleRemoveProtein = useCallback((id: string) => {
    setProteins(prev => prev.filter(p => p.id !== id));
  }, []);

  // Update protein
  const handleUpdateProtein = useCallback((id: string, updates: Partial<ProteinItem>) => {
    setProteins(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  // Handle insert
  const handleInsert = useCallback(async () => {
    if (!canvas) return;

    try {
      await importSVG(previewSvg);
      onInsert?.();
    } catch (error) {
      console.error('Failed to insert cell membrane:', error);
    }
  }, [canvas, importSVG, previewSvg, onInsert]);

  const proteinTypes: Array<{ value: ProteinType; label: string }> = [
    { value: 'channel', label: 'Ion Channel' },
    { value: 'receptor', label: 'Receptor' },
    { value: 'pump', label: 'Pump' },
    { value: 'transporter', label: 'Transporter' },
  ];

  return (
    <div style={styles.panel}>
      {/* Length Control */}
      <div style={styles.section}>
        <label style={styles.label}>Length (px)</label>
        <div style={styles.sliderContainer}>
          <input aria-label="Range slider"
            type="range"
            min="100"
            max="600"
            step="20"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            style={styles.slider}
            disabled={disabled}
          />
          <span style={styles.sliderValue}>{length}px</span>
        </div>
      </div>

      {/* Phospholipid Count */}
      <div style={styles.section}>
        <label style={styles.label}>Phospholipid Count</label>
        <div style={styles.sliderContainer}>
          <input aria-label="Range slider"
            type="range"
            min="5"
            max="40"
            step="1"
            value={phospholipidCount}
            onChange={(e) => setPhospholipidCount(Number(e.target.value))}
            style={styles.slider}
            disabled={disabled}
          />
          <span style={styles.sliderValue}>{phospholipidCount}</span>
        </div>
      </div>

      {/* Bilayer Toggle */}
      <div style={styles.section}>
        <div style={styles.toggle}>
          <div
            style={{
              ...styles.toggleTrack,
              ...(bilayer ? styles.toggleTrackActive : {}),
            }}
            onClick={() => !disabled && setBilayer(!bilayer)}
          >
            <div
              style={{
                ...styles.toggleThumb,
                ...(bilayer ? styles.toggleThumbActive : {}),
              }}
            />
          </div>
          <span style={styles.toggleLabel}>Bilayer (double layer)</span>
        </div>
      </div>

      {/* Curvature Control */}
      <div style={styles.section}>
        <label style={styles.label}>Curvature</label>
        <div style={styles.sliderContainer}>
          <input aria-label="Range slider"
            type="range"
            min="-1"
            max="1"
            step="0.1"
            value={curvature}
            onChange={(e) => setCurvature(Number(e.target.value))}
            style={styles.slider}
            disabled={disabled}
          />
          <span style={styles.sliderValue}>{curvature.toFixed(1)}</span>
        </div>
      </div>

      {/* Colors */}
      <div style={styles.section}>
        <label style={styles.label}>Colors</label>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <input aria-label="Color picker"
              type="color"
              value={fillColor}
              onChange={(e) => setFillColor(e.target.value)}
              style={styles.colorPicker}
              disabled={disabled}
            />
            <span style={{ fontSize: '11px', color: 'var(--text-muted, #666)' }}>Head</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <input aria-label="Color picker"
              type="color"
              value={strokeColor}
              onChange={(e) => setStrokeColor(e.target.value)}
              style={styles.colorPicker}
              disabled={disabled}
            />
            <span style={{ fontSize: '11px', color: 'var(--text-muted, #666)' }}>Tail</span>
          </div>
        </div>
      </div>

      {/* Membrane Proteins */}
      <div style={styles.proteinSection}>
        <div style={styles.proteinHeader}>
          <label style={styles.label}>Membrane Proteins</label>
          <button
            style={{ ...styles.smallButton, ...styles.addButton }}
            onClick={handleAddProtein}
            disabled={disabled}
          >
            <PlusIcon /> Add
          </button>
        </div>

        {proteins.length > 0 && (
          <div style={styles.proteinList}>
            {proteins.map((protein) => (
              <div key={protein.id} style={styles.proteinItem}>
                <select aria-label="Select option"
                  value={protein.type}
                  onChange={(e) => handleUpdateProtein(protein.id, { type: e.target.value as ProteinType })}
                  style={styles.proteinSelect}
                  disabled={disabled}
                >
                  {proteinTypes.map(pt => (
                    <option key={pt.value} value={pt.value}>{pt.label}</option>
                  ))}
                </select>
                <input aria-label="Number input"
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                  value={protein.position}
                  onChange={(e) => handleUpdateProtein(protein.id, { position: Number(e.target.value) })}
                  style={styles.proteinInput}
                  placeholder="Pos"
                  disabled={disabled}
                />
                <input aria-label="Text input"
                  type="text"
                  value={protein.label}
                  onChange={(e) => handleUpdateProtein(protein.id, { label: e.target.value })}
                  style={styles.proteinLabelInput}
                  placeholder="Label"
                  disabled={disabled}
                />
                <button
                  style={{ ...styles.smallButton, ...styles.removeButton }}
                  onClick={() => handleRemoveProtein(protein.id)}
                  disabled={disabled}
                >
                  <TrashIcon />
                </button>
              </div>
            ))}
          </div>
        )}

        {proteins.length === 0 && (
          <div style={{ fontSize: '12px', color: 'var(--text-muted, #666)', textAlign: 'center', padding: '8px' }}>
            No proteins added. Click "Add" to add membrane proteins.
          </div>
        )}
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
        Insert Cell Membrane
      </button>
    </div>
  );
}

export default CellMembranePanel;
