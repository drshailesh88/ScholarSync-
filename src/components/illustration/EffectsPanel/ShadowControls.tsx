import React from 'react';

interface ShadowControlsProps {
  enabled: boolean;
  color: string;
  pickerColor: string;
  blur: number;
  offsetX: number;
  offsetY: number;
  onToggle: (enabled: boolean) => void;
  onColorChange: (color: string) => void;
  onBlurChange: (blur: number) => void;
  onOffsetXChange: (offsetX: number) => void;
  onOffsetYChange: (offsetY: number) => void;
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '8px',
    border: '1px solid var(--border-primary)',
    borderRadius: '6px',
    backgroundColor: 'var(--bg-tertiary)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
  },
  title: {
    fontSize: '12px',
    color: 'var(--text-primary)',
    fontWeight: 500,
  },
  toggleInput: {
    width: '14px',
    height: '14px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  rowLabel: {
    fontSize: '12px',
    color: 'var(--text-secondary)',
    minWidth: '54px',
    flexShrink: 0,
  },
  slider: {
    flex: 1,
    height: '4px',
  },
  numberInput: {
    width: '58px',
    padding: '4px 6px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '12px',
    textAlign: 'center',
  },
  colorInput: {
    width: '34px',
    height: '26px',
    padding: 0,
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    background: 'transparent',
    cursor: 'pointer',
  },
  colorTextInput: {
    flex: 1,
    padding: '4px 6px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '12px',
  },
};

function parseNumeric(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function ShadowControls({
  enabled,
  color,
  pickerColor,
  blur,
  offsetX,
  offsetY,
  onToggle,
  onColorChange,
  onBlurChange,
  onOffsetXChange,
  onOffsetYChange,
}: ShadowControlsProps): JSX.Element {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.title}>Drop Shadow</span>
        <input aria-label="Checkbox"
          type="checkbox"
          checked={enabled}
          onChange={(event) => onToggle(event.target.checked)}
          style={styles.toggleInput}
        />
      </div>

      <div style={styles.row}>
        <span style={styles.rowLabel}>Color</span>
        <input aria-label="Color picker"
          type="color"
          value={pickerColor}
          disabled={!enabled}
          onChange={(event) => onColorChange(event.target.value)}
          style={styles.colorInput}
        />
        <input aria-label="Text input"
          type="text"
          value={color}
          disabled={!enabled}
          onChange={(event) => onColorChange(event.target.value)}
          style={styles.colorTextInput}
        />
      </div>

      <div style={styles.row}>
        <span style={styles.rowLabel}>Blur</span>
        <input aria-label="Range slider"
          type="range"
          min={0}
          max={50}
          step={1}
          value={blur}
          disabled={!enabled}
          onChange={(event) => onBlurChange(parseNumeric(event.target.value))}
          style={styles.slider}
        />
        <input aria-label="Number input"
          type="number"
          min={0}
          max={50}
          step={1}
          value={blur}
          disabled={!enabled}
          onChange={(event) => onBlurChange(parseNumeric(event.target.value))}
          style={styles.numberInput}
        />
      </div>

      <div style={styles.row}>
        <span style={styles.rowLabel}>Offset X</span>
        <input aria-label="Range slider"
          type="range"
          min={-50}
          max={50}
          step={1}
          value={offsetX}
          disabled={!enabled}
          onChange={(event) => onOffsetXChange(parseNumeric(event.target.value))}
          style={styles.slider}
        />
        <input aria-label="Number input"
          type="number"
          min={-50}
          max={50}
          step={1}
          value={offsetX}
          disabled={!enabled}
          onChange={(event) => onOffsetXChange(parseNumeric(event.target.value))}
          style={styles.numberInput}
        />
      </div>

      <div style={styles.row}>
        <span style={styles.rowLabel}>Offset Y</span>
        <input aria-label="Range slider"
          type="range"
          min={-50}
          max={50}
          step={1}
          value={offsetY}
          disabled={!enabled}
          onChange={(event) => onOffsetYChange(parseNumeric(event.target.value))}
          style={styles.slider}
        />
        <input aria-label="Number input"
          type="number"
          min={-50}
          max={50}
          step={1}
          value={offsetY}
          disabled={!enabled}
          onChange={(event) => onOffsetYChange(parseNumeric(event.target.value))}
          style={styles.numberInput}
        />
      </div>
    </div>
  );
}
