/**
 * PNGOptions Component
 * Export options for PNG format including DPI, quality, and background settings
 *
 * @module components/ExportDialog/PNGOptions
 */

import React from 'react';

// ============================================================================
// Types
// ============================================================================

export type DPI = 72 | 150 | 300 | 600;
export type BackgroundType = 'transparent' | 'white';

export interface PNGExportSettings {
  /** Resolution in dots per inch */
  dpi: DPI;
  /** Quality setting (1-100) */
  quality: number;
  /** Background type */
  background: BackgroundType;
}

export interface PNGOptionsProps {
  /** Current settings */
  settings: PNGExportSettings;
  /** Callback when settings change */
  onChange: (settings: PNGExportSettings) => void;
}

// ============================================================================
// Constants
// ============================================================================

const DPI_OPTIONS: { value: DPI; label: string; description: string }[] = [
  { value: 72, label: '72 DPI', description: 'Screen/Web' },
  { value: 150, label: '150 DPI', description: 'Standard' },
  { value: 300, label: '300 DPI', description: 'Print Quality' },
  { value: 600, label: '600 DPI', description: 'High Resolution' },
];

// ============================================================================
// Styles
// ============================================================================

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  label: {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-secondary, #9d9d9d)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
  },
  dpiOption: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '10px 8px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '2px solid var(--border-color, #333)',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  dpiOptionActive: {
    borderColor: 'var(--accent-primary, #3b82f6)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  dpiValue: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text-primary, #ffffff)',
  },
  dpiDescription: {
    fontSize: '10px',
    color: 'var(--text-muted, #666)',
    marginTop: '2px',
  },
  slider: {
    width: '100%',
    height: '6px',
    WebkitAppearance: 'none' as const,
    appearance: 'none' as const,
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    borderRadius: '3px',
    outline: 'none',
    cursor: 'pointer',
  },
  qualityValue: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--accent-primary, #3b82f6)',
    minWidth: '40px',
    textAlign: 'right' as const,
  },
  toggleGroup: {
    display: 'flex',
    gap: '8px',
  },
  toggleOption: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '2px solid var(--border-color, #333)',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    fontSize: '14px',
    color: 'var(--text-primary, #ffffff)',
  },
  toggleOptionActive: {
    borderColor: 'var(--accent-primary, #3b82f6)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  preview: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    border: '1px solid var(--border-color, #333)',
  },
};

// ============================================================================
// Component
// ============================================================================

export function PNGOptions({ settings, onChange }: PNGOptionsProps): JSX.Element {
  const handleDPIChange = (dpi: DPI) => {
    onChange({ ...settings, dpi });
  };

  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...settings, quality: parseInt(e.target.value, 10) });
  };

  const handleBackgroundChange = (background: BackgroundType) => {
    onChange({ ...settings, background });
  };

  return (
    <div style={styles.container}>
      {/* DPI Selection */}
      <div style={styles.section}>
        <label style={styles.label}>Resolution (DPI)</label>
        <div style={styles.dpiGrid}>
          {DPI_OPTIONS.map((option) => (
            <button
              key={option.value}
              style={{
                ...styles.dpiOption,
                ...(settings.dpi === option.value ? styles.dpiOptionActive : {}),
              }}
              onClick={() => handleDPIChange(option.value)}
            >
              <span style={styles.dpiValue}>{option.value}</span>
              <span style={styles.dpiDescription}>{option.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quality Slider */}
      <div style={styles.section}>
        <label style={styles.label}>
          <span>Quality</span>
          <span style={styles.qualityValue}>{settings.quality}%</span>
        </label>
        <input aria-label="Range slider"
          type="range"
          min="1"
          max="100"
          value={settings.quality}
          onChange={handleQualityChange}
          style={styles.slider}
/>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: 'var(--text-muted, #666)',
          }}
        >
          <span>Smaller file</span>
          <span>Better quality</span>
        </div>
      </div>

      {/* Background Toggle */}
      <div style={styles.section}>
        <label style={styles.label}>Background</label>
        <div style={styles.toggleGroup}>
          <button
            style={{
              ...styles.toggleOption,
              ...(settings.background === 'transparent' ? styles.toggleOptionActive : {}),
            }}
            onClick={() => handleBackgroundChange('transparent')}
          >
            <span
              style={{
                ...styles.preview,
                background:
                  'repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 8px 8px',
              }}
            />
            <span>Transparent</span>
          </button>
          <button
            style={{
              ...styles.toggleOption,
              ...(settings.background === 'white' ? styles.toggleOptionActive : {}),
            }}
            onClick={() => handleBackgroundChange('white')}
          >
            <span style={{ ...styles.preview, backgroundColor: '#ffffff' }} />
            <span>White</span>
          </button>
        </div>
      </div>

      {/* Size Estimate */}
      <div
        style={{
          padding: '12px',
          backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
          borderRadius: '6px',
          fontSize: '12px',
          color: 'var(--text-muted, #666)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span>Estimated dimensions:</span>
          <span style={{ color: 'var(--text-secondary, #9d9d9d)' }}>
            {Math.round((800 * settings.dpi) / 72)} x {Math.round((600 * settings.dpi) / 72)} px
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Estimated file size:</span>
          <span style={{ color: 'var(--text-secondary, #9d9d9d)' }}>
            ~{Math.round(((settings.dpi / 72) * (settings.quality / 100) * 500))} KB
          </span>
        </div>
      </div>
    </div>
  );
}

export default PNGOptions;
