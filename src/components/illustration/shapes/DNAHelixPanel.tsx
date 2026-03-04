/**
 * DNA Helix Panel Component
 * Advanced controls for generating DNA double helix illustrations
 *
 * @module components/shapes/DNAHelixPanel
 */

import { useState, useCallback, useMemo } from 'react';
import { generateDNAHelix, type DNAHelixOptions } from '../../lib/shapes/scientific-shapes';
import { useCanvas } from '../Canvas/CanvasContext';

// ============================================================================
// Types
// ============================================================================

export interface DNAHelixPanelProps {
  /** Callback when shape is inserted */
  onInsert?: () => void;
  /** Whether panel is disabled */
  disabled?: boolean;
}

type DNAStyle = 'simple' | 'detailed' | 'schematic';

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
    alignItems: 'center',
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
  styleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
  },
  styleOption: {
    padding: '10px 8px',
    fontSize: '12px',
    fontWeight: 500,
    textAlign: 'center' as const,
    color: 'var(--text-secondary, #9d9d9d)',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  styleOptionActive: {
    color: 'var(--text-primary, #ffffff)',
    backgroundColor: 'var(--accent-primary, #3b82f6)',
    borderColor: 'var(--accent-primary, #3b82f6)',
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
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
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
    fontWeight: 600,
    color: 'var(--text-secondary, #9d9d9d)',
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

// ============================================================================
// Component
// ============================================================================

export function DNAHelixPanel({
  onInsert,
  disabled = false,
}: DNAHelixPanelProps): JSX.Element {
  // State
  const [length, setLength] = useState(200);
  const [basePairs, setBasePairs] = useState(10);
  const [twistAngle, setTwistAngle] = useState(36);
  const [style, setStyle] = useState<DNAStyle>('simple');
  const [showBasePairs, setShowBasePairs] = useState(true);
  const [baseColors, setBaseColors] = useState({
    a: '#EF4444',
    t: '#22C55E',
    g: '#F59E0B',
    c: '#8B5CF6',
  });
  const [strokeColor, setStrokeColor] = useState('#3B82F6');

  // Canvas context
  const { importSVG, canvas } = useCanvas();

  // Generate preview SVG
  const previewSvg = useMemo(() => {
    const options: DNAHelixOptions = {
      length,
      basePairs,
      twist: twistAngle,
      style,
      showBasePairs,
      baseColors,
      stroke: strokeColor,
      strokeWidth: 2,
    };
    return generateDNAHelix(options);
  }, [length, basePairs, twistAngle, style, showBasePairs, baseColors, strokeColor]);

  // Handle color change
  const handleColorChange = useCallback((base: keyof typeof baseColors, color: string) => {
    setBaseColors(prev => ({ ...prev, [base]: color }));
  }, []);

  // Handle insert
  const handleInsert = useCallback(async () => {
    if (!canvas) return;

    try {
      await importSVG(previewSvg);
      onInsert?.();
    } catch (error) {
      console.error('Failed to insert DNA helix:', error);
    }
  }, [canvas, importSVG, previewSvg, onInsert]);

  const styleOptions: Array<{ value: DNAStyle; label: string }> = [
    { value: 'simple', label: 'Simple' },
    { value: 'detailed', label: 'Detailed' },
    { value: 'schematic', label: 'Schematic' },
  ];

  return (
    <div style={styles.panel}>
      {/* Length Control */}
      <div style={styles.section}>
        <label style={styles.label}>Length (px)</label>
        <div style={styles.sliderContainer}>
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            style={styles.slider}
            disabled={disabled}
          />
          <span style={styles.sliderValue}>{length}px</span>
        </div>
      </div>

      {/* Base Pairs Control */}
      <div style={styles.section}>
        <label style={styles.label}>Base Pairs</label>
        <div style={styles.sliderContainer}>
          <input
            type="range"
            min="5"
            max="50"
            step="1"
            value={basePairs}
            onChange={(e) => setBasePairs(Number(e.target.value))}
            style={styles.slider}
            disabled={disabled}
          />
          <span style={styles.sliderValue}>{basePairs}</span>
        </div>
      </div>

      {/* Twist Angle Control */}
      <div style={styles.section}>
        <label style={styles.label}>Twist Angle (degrees per bp)</label>
        <div style={styles.sliderContainer}>
          <input
            type="range"
            min="20"
            max="60"
            step="2"
            value={twistAngle}
            onChange={(e) => setTwistAngle(Number(e.target.value))}
            style={styles.slider}
            disabled={disabled}
          />
          <span style={styles.sliderValue}>{twistAngle}deg</span>
        </div>
      </div>

      {/* Style Selection */}
      <div style={styles.section}>
        <label style={styles.label}>Style</label>
        <div style={styles.styleGrid}>
          {styleOptions.map((option) => (
            <button
              key={option.value}
              style={{
                ...styles.styleOption,
                ...(style === option.value ? styles.styleOptionActive : {}),
              }}
              onClick={() => setStyle(option.value)}
              disabled={disabled}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Show Base Pairs Toggle */}
      <div style={styles.section}>
        <div style={styles.toggle}>
          <div
            style={{
              ...styles.toggleTrack,
              ...(showBasePairs ? styles.toggleTrackActive : {}),
            }}
            onClick={() => !disabled && setShowBasePairs(!showBasePairs)}
          >
            <div
              style={{
                ...styles.toggleThumb,
                ...(showBasePairs ? styles.toggleThumbActive : {}),
              }}
            />
          </div>
          <span style={styles.toggleLabel}>Show Base Pairs</span>
        </div>
      </div>

      {/* Backbone Color */}
      <div style={styles.section}>
        <label style={styles.label}>Backbone Color</label>
        <div style={styles.colorPickerWrapper}>
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
            style={styles.colorPicker}
            disabled={disabled}
          />
        </div>
      </div>

      {/* Base Pair Colors (visible when showBasePairs is true and style is detailed) */}
      {showBasePairs && style === 'detailed' && (
        <div style={styles.section}>
          <label style={styles.label}>Base Pair Colors</label>
          <div style={styles.colorPickers}>
            {(['a', 't', 'g', 'c'] as const).map((base) => (
              <div key={base} style={styles.colorPickerWrapper}>
                <input
                  type="color"
                  value={baseColors[base]}
                  onChange={(e) => handleColorChange(base, e.target.value)}
                  style={styles.colorPicker}
                  disabled={disabled}
                />
                <span style={styles.colorLabel}>{base.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

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
        Insert DNA Helix
      </button>
    </div>
  );
}

export default DNAHelixPanel;
