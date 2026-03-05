/**
 * SVGOptions Component
 * Export options for SVG format including optimization and font embedding
 *
 * @module components/ExportDialog/SVGOptions
 */


// ============================================================================
// Types
// ============================================================================

export interface SVGExportSettings {
  /** Optimize SVG output */
  optimize: boolean;
  /** Minify SVG output */
  minify: boolean;
  /** Embed fonts in SVG */
  embedFonts: boolean;
}

export interface SVGOptionsProps {
  /** Current settings */
  settings: SVGExportSettings;
  /** Callback when settings change */
  onChange: (settings: SVGExportSettings) => void;
}

// ============================================================================
// Styles
// ============================================================================

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  optionRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    borderRadius: '8px',
    border: '1px solid var(--border-color, #333)',
  },
  optionInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2px',
  },
  optionLabel: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-primary, #ffffff)',
  },
  optionDescription: {
    fontSize: '12px',
    color: 'var(--text-muted, #666)',
  },
  toggle: {
    position: 'relative' as const,
    width: '44px',
    height: '24px',
    backgroundColor: 'var(--border-color, #333)',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background-color 150ms ease',
    border: 'none',
    padding: 0,
  },
  toggleActive: {
    backgroundColor: 'var(--accent-primary, #3b82f6)',
  },
  toggleKnob: {
    position: 'absolute' as const,
    top: '2px',
    left: '2px',
    width: '20px',
    height: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    transition: 'transform 150ms ease',
  },
  toggleKnobActive: {
    transform: 'translateX(20px)',
  },
  infoBox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '12px',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '6px',
    border: '1px solid rgba(59, 130, 246, 0.3)',
  },
  infoIcon: {
    flexShrink: 0,
    color: 'var(--accent-primary, #3b82f6)',
  },
  infoText: {
    fontSize: '12px',
    color: 'var(--text-secondary, #9d9d9d)',
    lineHeight: 1.5,
  },
};

// ============================================================================
// Toggle Component
// ============================================================================

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function Toggle({ checked, onChange }: ToggleProps): JSX.Element {
  return (
    <button
      role="switch"
      aria-checked={checked}
      style={{
        ...styles.toggle,
        ...(checked ? styles.toggleActive : {}),
      }}
      onClick={() => onChange(!checked)}
    >
      <span
        style={{
          ...styles.toggleKnob,
          ...(checked ? styles.toggleKnobActive : {}),
        }}
      />
    </button>
  );
}

// ============================================================================
// Component
// ============================================================================

export function SVGOptions({ settings, onChange }: SVGOptionsProps): JSX.Element {
  const handleToggle = (key: keyof SVGExportSettings) => {
    onChange({ ...settings, [key]: !settings[key] });
  };

  return (
    <div style={styles.container}>
      {/* Optimize Option */}
      <div style={styles.optionRow}>
        <div style={styles.optionInfo}>
          <span style={styles.optionLabel}>Optimize SVG</span>
          <span style={styles.optionDescription}>
            Remove unnecessary elements and attributes
          </span>
        </div>
        <Toggle checked={settings.optimize} onChange={() => handleToggle('optimize')} />
      </div>

      {/* Minify Option */}
      <div style={styles.optionRow}>
        <div style={styles.optionInfo}>
          <span style={styles.optionLabel}>Minify Output</span>
          <span style={styles.optionDescription}>
            Remove whitespace for smaller file size
          </span>
        </div>
        <Toggle checked={settings.minify} onChange={() => handleToggle('minify')} />
      </div>

      {/* Embed Fonts Option */}
      <div style={styles.optionRow}>
        <div style={styles.optionInfo}>
          <span style={styles.optionLabel}>Embed Fonts</span>
          <span style={styles.optionDescription}>
            Convert text to paths for consistent display
          </span>
        </div>
        <Toggle checked={settings.embedFonts} onChange={() => handleToggle('embedFonts')} />
      </div>

      {/* Info Box */}
      <div style={styles.infoBox}>
        <svg
          style={styles.infoIcon}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span style={styles.infoText}>
          SVG files are scalable and ideal for web use, presentations, and further editing.
          Enable &quot;Embed Fonts&quot; to ensure text displays correctly on all devices.
        </span>
      </div>

      {/* Feature Summary */}
      <div
        style={{
          padding: '12px',
          backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
          borderRadius: '6px',
        }}
      >
        <div
          style={{
            fontSize: '12px',
            color: 'var(--text-muted, #666)',
            marginBottom: '8px',
          }}
        >
          SVG Features:
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap' as const,
            gap: '8px',
          }}
        >
          <FeatureTag label="Scalable" active />
          <FeatureTag label="Editable" active={!settings.embedFonts} />
          <FeatureTag label="Optimized" active={settings.optimize} />
          <FeatureTag label="Minified" active={settings.minify} />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Feature Tag Component
// ============================================================================

interface FeatureTagProps {
  label: string;
  active: boolean;
}

function FeatureTag({ label, active }: FeatureTagProps): JSX.Element {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 8px',
        backgroundColor: active
          ? 'rgba(34, 197, 94, 0.15)'
          : 'rgba(156, 163, 175, 0.15)',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: 500,
        color: active ? '#22c55e' : 'var(--text-muted, #666)',
      }}
    >
      {active ? (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      )}
      {label}
    </span>
  );
}

export default SVGOptions;
