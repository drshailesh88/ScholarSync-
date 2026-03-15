/**
 * Pathway Arrow Panel Component
 * Advanced controls for generating signaling pathway arrows
 *
 * @module components/shapes/PathwayArrowPanel
 */

import { useState, useCallback, useMemo } from 'react';
import { generatePathwayArrow, type PathwayArrowOptions } from '@/lib/illustration/lib/shapes/scientific-shapes';
import { useCanvas } from '../Canvas/CanvasContext';

// ============================================================================
// Types
// ============================================================================

export interface PathwayArrowPanelProps {
  /** Callback when shape is inserted */
  onInsert?: () => void;
  /** Whether panel is disabled */
  disabled?: boolean;
}

type ArrowType = 'activation' | 'inhibition' | 'catalysis' | 'transport' | 'binding';

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
  arrowTypeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '6px',
  },
  arrowTypeOption: {
    padding: '10px 4px',
    fontSize: '10px',
    fontWeight: 500,
    textAlign: 'center' as const,
    color: 'var(--text-secondary, #9d9d9d)',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '6px',
  },
  arrowTypeOptionActive: {
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
  input: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    color: 'var(--text-primary, #ffffff)',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    outline: 'none',
    boxSizing: 'border-box' as const,
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
    width: '100%',
    maxHeight: '120px',
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    borderRadius: '4px',
    marginTop: '8px',
  },
  legendColor: {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
  },
  legendText: {
    fontSize: '12px',
    color: 'var(--text-secondary, #9d9d9d)',
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

// Arrow type icons
const ActivationIcon = () => (
  <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
    <line x1="2" y1="8" x2="20" y2="8" stroke="#22C55E" strokeWidth="2" />
    <polygon points="26,8 18,4 18,12" fill="#22C55E" />
  </svg>
);

const InhibitionIcon = () => (
  <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
    <line x1="2" y1="8" x2="20" y2="8" stroke="#EF4444" strokeWidth="2" />
    <line x1="22" y1="3" x2="22" y2="13" stroke="#EF4444" strokeWidth="3" />
  </svg>
);

const CatalysisIcon = () => (
  <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
    <line x1="2" y1="8" x2="18" y2="8" stroke="#3B82F6" strokeWidth="2" />
    <circle cx="22" cy="8" r="4" stroke="#3B82F6" strokeWidth="2" fill="none" />
  </svg>
);

const TransportIcon = () => (
  <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
    <line x1="2" y1="8" x2="16" y2="8" stroke="#8B5CF6" strokeWidth="2" />
    <polygon points="26,8 18,4 20,8 18,12" fill="#8B5CF6" />
  </svg>
);

const BindingIcon = () => (
  <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
    <line x1="2" y1="8" x2="18" y2="8" stroke="#F59E0B" strokeWidth="2" />
    <polygon points="24,8 20,4 16,8 20,12" fill="#F59E0B" />
  </svg>
);

// ============================================================================
// Component
// ============================================================================

export function PathwayArrowPanel({
  onInsert,
  disabled = false,
}: PathwayArrowPanelProps): JSX.Element {
  // State
  const [arrowType, setArrowType] = useState<ArrowType>('activation');
  const [curved, setCurved] = useState(false);
  const [label, setLabel] = useState('');
  const [arrowLength, setArrowLength] = useState(180);

  // Canvas context
  const { importSVG, canvas } = useCanvas();

  // Generate preview SVG
  const previewSvg = useMemo(() => {
    const options: PathwayArrowOptions = {
      type: arrowType,
      curved,
      label: label || undefined,
      startPoint: { x: 10, y: 50 },
      endPoint: { x: arrowLength, y: curved ? 30 : 50 },
    };
    return generatePathwayArrow(options);
  }, [arrowType, curved, label, arrowLength]);

  // Handle insert
  const handleInsert = useCallback(async () => {
    if (!canvas) return;

    try {
      await importSVG(previewSvg);
      onInsert?.();
    } catch (error) {
      console.error('Failed to insert pathway arrow:', error);
    }
  }, [canvas, importSVG, previewSvg, onInsert]);

  const arrowTypes: Array<{ value: ArrowType; label: string; icon: JSX.Element; description: string; color: string }> = [
    { value: 'activation', label: 'Activate', icon: <ActivationIcon />, description: 'Positive regulation, promotes activity', color: '#22C55E' },
    { value: 'inhibition', label: 'Inhibit', icon: <InhibitionIcon />, description: 'Negative regulation, blocks activity', color: '#EF4444' },
    { value: 'catalysis', label: 'Catalyze', icon: <CatalysisIcon />, description: 'Enzyme catalysis, speeds reaction', color: '#3B82F6' },
    { value: 'transport', label: 'Transport', icon: <TransportIcon />, description: 'Movement across membrane', color: '#8B5CF6' },
    { value: 'binding', label: 'Bind', icon: <BindingIcon />, description: 'Molecular binding/interaction', color: '#F59E0B' },
  ];

  const selectedArrowInfo = arrowTypes.find(a => a.value === arrowType);

  return (
    <div style={styles.panel}>
      {/* Arrow Type Selection */}
      <div style={styles.section}>
        <label style={styles.label}>Arrow Type</label>
        <div style={styles.arrowTypeGrid}>
          {arrowTypes.map((option) => (
            <button
              key={option.value}
              style={{
                ...styles.arrowTypeOption,
                ...(arrowType === option.value ? styles.arrowTypeOptionActive : {}),
              }}
              onClick={() => setArrowType(option.value)}
              disabled={disabled}
              title={option.description}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Arrow Info */}
      <div style={styles.infoBox}>
        <InfoIcon />
        <div>
          <strong style={{ color: selectedArrowInfo?.color }}>{selectedArrowInfo?.label}:</strong>{' '}
          {selectedArrowInfo?.description}
          <div style={styles.legendItem}>
            <div style={{ ...styles.legendColor, backgroundColor: selectedArrowInfo?.color }} />
            <span style={styles.legendText}>Standard pathway diagram color</span>
          </div>
        </div>
      </div>

      {/* Arrow Length */}
      <div style={styles.section}>
        <label style={styles.label}>Arrow Length (px)</label>
        <div style={styles.sliderContainer}>
          <input aria-label="Range slider"
            type="range"
            min="80"
            max="300"
            step="10"
            value={arrowLength}
            onChange={(e) => setArrowLength(Number(e.target.value))}
            style={styles.slider}
            disabled={disabled}
          />
          <span style={styles.sliderValue}>{arrowLength}px</span>
        </div>
      </div>

      {/* Curved Toggle */}
      <div style={styles.section}>
        <div style={styles.toggle}>
          <div
            style={{
              ...styles.toggleTrack,
              ...(curved ? styles.toggleTrackActive : {}),
            }}
            onClick={() => !disabled && setCurved(!curved)}
          >
            <div
              style={{
                ...styles.toggleThumb,
                ...(curved ? styles.toggleThumbActive : {}),
              }}
            />
          </div>
          <span style={styles.toggleLabel}>Curved Arrow</span>
        </div>
      </div>

      {/* Label Input */}
      <div style={styles.section}>
        <label style={styles.label}>Label (optional)</label>
        <input aria-label="Text input"
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          style={styles.input}
          placeholder="e.g., ATP, Ca2+, phosphorylation"
          disabled={disabled}
        />
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
        Insert Pathway Arrow
      </button>
    </div>
  );
}

export default PathwayArrowPanel;
