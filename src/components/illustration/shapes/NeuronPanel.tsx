/**
 * Neuron Panel Component
 * Advanced controls for generating neuron illustrations
 *
 * @module components/shapes/NeuronPanel
 */

import { useState, useCallback, useMemo } from 'react';
import { generateNeuron, type NeuronOptions } from '@/lib/illustration/lib/shapes/scientific-shapes';
import { useCanvas } from '../Canvas/CanvasContext';

// ============================================================================
// Types
// ============================================================================

export interface NeuronPanelProps {
  /** Callback when shape is inserted */
  onInsert?: () => void;
  /** Whether panel is disabled */
  disabled?: boolean;
}

type NeuronType = 'pyramidal' | 'interneuron' | 'motor' | 'sensory' | 'purkinje';

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
  neuronTypeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
  },
  neuronTypeOption: {
    padding: '12px 8px',
    fontSize: '11px',
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
    gap: '4px',
  },
  neuronTypeOptionActive: {
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
    maxHeight: '250px',
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

// Mini neuron type icons
const PyramidalIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="12,4 6,14 18,14" />
    <line x1="12" y1="14" x2="12" y2="22" />
    <line x1="8" y1="8" x2="4" y2="4" />
    <line x1="16" y1="8" x2="20" y2="4" />
  </svg>
);

const InterneuronIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="10" r="5" />
    <line x1="12" y1="15" x2="12" y2="22" />
    <line x1="7" y1="8" x2="2" y2="6" />
    <line x1="17" y1="8" x2="22" y2="6" />
    <line x1="9" y1="6" x2="6" y2="2" />
    <line x1="15" y1="6" x2="18" y2="2" />
  </svg>
);

const MotorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="6" r="4" />
    <line x1="12" y1="10" x2="12" y2="22" />
    <line x1="8" y1="3" x2="4" y2="2" />
    <line x1="16" y1="3" x2="20" y2="2" />
    <ellipse cx="12" cy="16" rx="3" ry="2" />
  </svg>
);

const SensoryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="10" r="4" />
    <line x1="12" y1="14" x2="12" y2="22" />
    <path d="M6 6 Q12 2 18 6" />
  </svg>
);

const PurkinjeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="14" r="4" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <path d="M8 10 Q8 2 12 2 Q16 2 16 10" />
    <line x1="6" y1="6" x2="4" y2="4" />
    <line x1="18" y1="6" x2="20" y2="4" />
    <line x1="5" y1="8" x2="2" y2="8" />
    <line x1="19" y1="8" x2="22" y2="8" />
  </svg>
);

// ============================================================================
// Component
// ============================================================================

export function NeuronPanel({
  onInsert,
  disabled = false,
}: NeuronPanelProps): JSX.Element {
  // State
  const [neuronType, setNeuronType] = useState<NeuronType>('pyramidal');
  const [dendrites, setDendrites] = useState(5);
  const [axonLength, setAxonLength] = useState(150);
  const [showMyelin, setShowMyelin] = useState(true);
  const [showSynapses, setShowSynapses] = useState(true);
  const [fillColor, setFillColor] = useState('#FEF3C7');
  const [strokeColor, setStrokeColor] = useState('#374151');

  // Canvas context
  const { importSVG, canvas } = useCanvas();

  // Generate preview SVG
  const previewSvg = useMemo(() => {
    const options: NeuronOptions = {
      type: neuronType,
      dendrites,
      axonLength,
      showMyelin,
      showSynapses,
      fill: fillColor,
      stroke: strokeColor,
    };
    return generateNeuron(options);
  }, [neuronType, dendrites, axonLength, showMyelin, showSynapses, fillColor, strokeColor]);

  // Handle insert
  const handleInsert = useCallback(async () => {
    if (!canvas) return;

    try {
      await importSVG(previewSvg);
      onInsert?.();
    } catch (error) {
      console.error('Failed to insert neuron:', error);
    }
  }, [canvas, importSVG, previewSvg, onInsert]);

  const neuronTypes: Array<{ value: NeuronType; label: string; icon: JSX.Element; description: string }> = [
    { value: 'pyramidal', label: 'Pyramidal', icon: <PyramidalIcon />, description: 'Triangular soma, found in cortex' },
    { value: 'interneuron', label: 'Interneuron', icon: <InterneuronIcon />, description: 'Local circuit neurons' },
    { value: 'motor', label: 'Motor', icon: <MotorIcon />, description: 'Innervate muscles' },
    { value: 'sensory', label: 'Sensory', icon: <SensoryIcon />, description: 'Detect stimuli' },
    { value: 'purkinje', label: 'Purkinje', icon: <PurkinjeIcon />, description: 'Cerebellum, elaborate dendrites' },
  ];

  const selectedNeuronInfo = neuronTypes.find(n => n.value === neuronType);

  return (
    <div style={styles.panel}>
      {/* Neuron Type Selection */}
      <div style={styles.section}>
        <label style={styles.label}>Neuron Type</label>
        <div style={styles.neuronTypeGrid}>
          {/* empty state: renders nothing when no data */}
          {neuronTypes.map((option) => (
            <button
              key={option.value}
              style={{
                ...styles.neuronTypeOption,
                ...(neuronType === option.value ? styles.neuronTypeOptionActive : {}),
              }}
              onClick={() => setNeuronType(option.value)}
              disabled={disabled}
              title={option.description}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Neuron Info */}
      <div style={styles.infoBox}>
        <InfoIcon />
        <span>
          <strong>{selectedNeuronInfo?.label}:</strong> {selectedNeuronInfo?.description}
        </span>
      </div>

      {/* Dendrite Count */}
      <div style={styles.section}>
        <label style={styles.label}>Dendrite Count</label>
        <div style={styles.sliderContainer}>
          <input aria-label="Range slider"
            type="range"
            min="2"
            max="10"
            step="1"
            value={dendrites}
            onChange={(e) => setDendrites(Number(e.target.value))}
            style={styles.slider}
            disabled={disabled}
          />
          <span style={styles.sliderValue}>{dendrites}</span>
        </div>
      </div>

      {/* Axon Length */}
      <div style={styles.section}>
        <label style={styles.label}>Axon Length (px)</label>
        <div style={styles.sliderContainer}>
          <input aria-label="Range slider"
            type="range"
            min="50"
            max="300"
            step="10"
            value={axonLength}
            onChange={(e) => setAxonLength(Number(e.target.value))}
            style={styles.slider}
            disabled={disabled}
          />
          <span style={styles.sliderValue}>{axonLength}px</span>
        </div>
      </div>

      {/* Toggles */}
      <div style={styles.section}>
        <div style={styles.toggle}>
          <div
            style={{
              ...styles.toggleTrack,
              ...(showMyelin ? styles.toggleTrackActive : {}),
            }}
            onClick={() => !disabled && setShowMyelin(!showMyelin)}
          >
            <div
              style={{
                ...styles.toggleThumb,
                ...(showMyelin ? styles.toggleThumbActive : {}),
              }}
            />
          </div>
          <span style={styles.toggleLabel}>Show Myelin Sheath</span>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.toggle}>
          <div
            style={{
              ...styles.toggleTrack,
              ...(showSynapses ? styles.toggleTrackActive : {}),
            }}
            onClick={() => !disabled && setShowSynapses(!showSynapses)}
          >
            <div
              style={{
                ...styles.toggleThumb,
                ...(showSynapses ? styles.toggleThumbActive : {}),
              }}
            />
          </div>
          <span style={styles.toggleLabel}>Show Synaptic Boutons</span>
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
            <span style={styles.colorLabel}>Cell Body</span>
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
        Insert Neuron
      </button>
    </div>
  );
}

export default NeuronPanel;
