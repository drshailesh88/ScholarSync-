import React from 'react';

export const BLEND_MODES = [
  { value: 'source-over', label: 'Normal' },
  { value: 'multiply', label: 'Multiply' },
  { value: 'screen', label: 'Screen' },
  { value: 'overlay', label: 'Overlay' },
  { value: 'darken', label: 'Darken' },
  { value: 'lighten', label: 'Lighten' },
  { value: 'color-dodge', label: 'Color-Dodge' },
  { value: 'color-burn', label: 'Color-Burn' },
  { value: 'hard-light', label: 'Hard-Light' },
  { value: 'soft-light', label: 'Soft-Light' },
  { value: 'difference', label: 'Difference' },
  { value: 'exclusion', label: 'Exclusion' },
] as const;

export type BlendModeValue = (typeof BLEND_MODES)[number]['value'];

export const DEFAULT_BLEND_MODE: BlendModeValue = 'source-over';

interface BlendModeSelectProps {
  value: BlendModeValue;
  onChange: (mode: BlendModeValue) => void;
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
    fontSize: '12px',
    color: 'var(--text-primary)',
    fontWeight: 500,
  },
  select: {
    width: '100%',
    padding: '4px 6px',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    fontSize: '12px',
  },
};

export default function BlendModeSelect({
  value,
  onChange,
}: BlendModeSelectProps): JSX.Element {
  return (
    <div style={styles.container}>
      <span style={styles.header}>Blend Mode</span>
      <select aria-label="Select option"
        value={value}
        onChange={(event) => onChange(event.target.value as BlendModeValue)}
        style={styles.select}
      >
        {/* empty state: renders nothing when no data */}
        {BLEND_MODES.map((mode) => (
          <option key={mode.value} value={mode.value}>
            {mode.label}
          </option>
        ))}
      </select>
    </div>
  );
}
