/**
 * PPTXOptions Component
 * Export options for PowerPoint format including slide layout, resolution, and metadata
 *
 * @module components/ExportDialog/PPTXOptions
 */


// ============================================================================
// Types
// ============================================================================

export type SlideLayout = '16x9' | '16x10' | '4x3' | 'custom';
export type Resolution = 1 | 2 | 4;

export interface PPTXExportSettings {
  /** Slide layout aspect ratio */
  layout: SlideLayout;
  /** Export resolution multiplier */
  resolution: Resolution;
  /** Custom slide width in inches */
  customWidth?: number;
  /** Custom slide height in inches */
  customHeight?: number;
  /** Slide background color */
  background: 'white' | 'transparent';
  /** Center image on slide */
  centerImage: boolean;
  /** Presentation title */
  title?: string;
  /** Author name */
  author?: string;
}

export interface PPTXOptionsProps {
  /** Current settings */
  settings: PPTXExportSettings;
  /** Callback when settings change */
  onChange: (settings: PPTXExportSettings) => void;
}

// ============================================================================
// Constants
// ============================================================================

const LAYOUT_OPTIONS: { value: SlideLayout; label: string; dimensions: string }[] = [
  { value: '16x9', label: '16:9', dimensions: 'Widescreen (10" x 5.625")' },
  { value: '16x10', label: '16:10', dimensions: 'Wide (10" x 6.25")' },
  { value: '4x3', label: '4:3', dimensions: 'Standard (10" x 7.5")' },
  { value: 'custom', label: 'Custom', dimensions: 'User defined' },
];

const RESOLUTION_OPTIONS: { value: Resolution; label: string; description: string }[] = [
  { value: 1, label: '1x', description: 'Standard' },
  { value: 2, label: '2x', description: 'High quality' },
  { value: 4, label: '4x', description: 'Ultra HD' },
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
  },
  selectContainer: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap' as const,
  },
  selectOption: {
    flex: '1 1 calc(50% - 4px)',
    minWidth: '100px',
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
  selectOptionActive: {
    borderColor: 'var(--accent-primary, #3b82f6)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  selectLabel: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text-primary, #ffffff)',
  },
  selectDescription: {
    fontSize: '10px',
    color: 'var(--text-muted, #666)',
    marginTop: '2px',
    textAlign: 'center' as const,
  },
  resolutionContainer: {
    display: 'flex',
    gap: '8px',
  },
  resolutionOption: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '2px',
    padding: '12px 8px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '2px solid var(--border-color, #333)',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  customDimensionsRow: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    gap: '12px',
    alignItems: 'center',
  },
  dimensionSeparator: {
    color: 'var(--text-muted, #666)',
    fontSize: '14px',
  },
  input: {
    padding: '8px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '4px',
    color: 'var(--text-primary, #ffffff)',
    fontSize: '13px',
    textAlign: 'center' as const,
    outline: 'none',
    width: '100%',
  },
  textInput: {
    padding: '10px 12px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    color: 'var(--text-primary, #ffffff)',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    transition: 'border-color 150ms ease',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    borderRadius: '4px',
    border: '2px solid var(--border-color, #444)',
    backgroundColor: 'var(--bg-secondary, #1e1e1e)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 150ms ease',
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: 'var(--accent-primary, #3b82f6)',
    borderColor: 'var(--accent-primary, #3b82f6)',
  },
  checkboxLabel: {
    fontSize: '14px',
    color: 'var(--text-primary, #ffffff)',
  },
  checkboxDescription: {
    fontSize: '12px',
    color: 'var(--text-muted, #666)',
    marginTop: '2px',
  },
  backgroundContainer: {
    display: 'flex',
    gap: '12px',
  },
  backgroundOption: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '2px solid var(--border-color, #333)',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  backgroundOptionActive: {
    borderColor: 'var(--accent-primary, #3b82f6)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  previewContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    borderRadius: '6px',
  },
  previewSlide: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
    borderRadius: '2px',
  },
  previewContent: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    border: '1px dashed var(--accent-primary, #3b82f6)',
    borderRadius: '2px',
  },
};

// ============================================================================
// Icons
// ============================================================================

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const WhiteBackgroundIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" fill="white" stroke="currentColor" />
  </svg>
);

const TransparentBackgroundIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 3L21 21" strokeDasharray="2 2" />
    <path d="M21 3L3 21" strokeDasharray="2 2" />
  </svg>
);

const SlidesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="14" rx="2" />
    <path d="M8 20h8" />
    <path d="M12 18v2" />
    <circle cx="12" cy="11" r="3" />
  </svg>
);

// ============================================================================
// Component
// ============================================================================

export function PPTXOptions({ settings, onChange }: PPTXOptionsProps): JSX.Element {
  const handleLayoutChange = (layout: SlideLayout) => {
    onChange({ ...settings, layout });
  };

  const handleResolutionChange = (resolution: Resolution) => {
    onChange({ ...settings, resolution });
  };

  const handleCustomDimensionChange = (key: 'customWidth' | 'customHeight', value: string) => {
    const numValue = parseFloat(value) || 0;
    onChange({ ...settings, [key]: Math.max(1, Math.min(20, numValue)) });
  };

  const handleBackgroundChange = (background: 'white' | 'transparent') => {
    onChange({ ...settings, background });
  };

  const handleCenterImageChange = () => {
    onChange({ ...settings, centerImage: !settings.centerImage });
  };

  const handleTextChange = (key: 'title' | 'author', value: string) => {
    onChange({ ...settings, [key]: value });
  };

  // Calculate preview dimensions
  const getPreviewDimensions = () => {
    const baseWidth = 120;
    let aspectRatio: number;

    switch (settings.layout) {
      case '16x9':
        aspectRatio = 16 / 9;
        break;
      case '16x10':
        aspectRatio = 16 / 10;
        break;
      case '4x3':
        aspectRatio = 4 / 3;
        break;
      case 'custom':
        aspectRatio = (settings.customWidth || 10) / (settings.customHeight || 5.625);
        break;
      default:
        aspectRatio = 16 / 9;
    }

    return {
      width: baseWidth,
      height: baseWidth / aspectRatio,
    };
  };

  const previewDimensions = getPreviewDimensions();

  return (
    <div style={styles.container}>
      {/* Slide Layout Selection */}
      <div style={styles.section}>
        <label style={styles.label}>Slide Layout</label>
        <div style={styles.selectContainer}>
          {LAYOUT_OPTIONS.map((option) => (
            <button
              key={option.value}
              style={{
                ...styles.selectOption,
                ...(settings.layout === option.value ? styles.selectOptionActive : {}),
              }}
              onClick={() => handleLayoutChange(option.value)}
            >
              <span style={styles.selectLabel}>{option.label}</span>
              <span style={styles.selectDescription}>{option.dimensions}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Dimensions */}
      {settings.layout === 'custom' && (
        <div style={styles.section}>
          <label style={styles.label}>Custom Dimensions (inches)</label>
          <div style={styles.customDimensionsRow}>
            <input
              type="number"
              value={settings.customWidth || 10}
              onChange={(e) => handleCustomDimensionChange('customWidth', e.target.value)}
              style={styles.input}
              placeholder="Width"
              min="1"
              max="20"
              step="0.5"
            />
            <span style={styles.dimensionSeparator}>x</span>
            <input
              type="number"
              value={settings.customHeight || 5.625}
              onChange={(e) => handleCustomDimensionChange('customHeight', e.target.value)}
              style={styles.input}
              placeholder="Height"
              min="1"
              max="20"
              step="0.5"
            />
          </div>
        </div>
      )}

      {/* Resolution */}
      <div style={styles.section}>
        <label style={styles.label}>Resolution</label>
        <div style={styles.resolutionContainer}>
          {RESOLUTION_OPTIONS.map((option) => (
            <button
              key={option.value}
              style={{
                ...styles.resolutionOption,
                ...(settings.resolution === option.value ? styles.selectOptionActive : {}),
              }}
              onClick={() => handleResolutionChange(option.value)}
            >
              <span style={styles.selectLabel}>{option.label}</span>
              <span style={styles.selectDescription}>{option.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Background */}
      <div style={styles.section}>
        <label style={styles.label}>Slide Background</label>
        <div style={styles.backgroundContainer}>
          <button
            style={{
              ...styles.backgroundOption,
              ...(settings.background === 'white' ? styles.backgroundOptionActive : {}),
            }}
            onClick={() => handleBackgroundChange('white')}
          >
            <WhiteBackgroundIcon />
            <span style={{ fontSize: '14px', color: 'var(--text-primary, #ffffff)' }}>White</span>
          </button>
          <button
            style={{
              ...styles.backgroundOption,
              ...(settings.background === 'transparent' ? styles.backgroundOptionActive : {}),
            }}
            onClick={() => handleBackgroundChange('transparent')}
          >
            <TransparentBackgroundIcon />
            <span style={{ fontSize: '14px', color: 'var(--text-primary, #ffffff)' }}>Transparent</span>
          </button>
        </div>
      </div>

      {/* Center Image */}
      <div
        style={styles.checkboxContainer}
        onClick={handleCenterImageChange}
        role="checkbox"
        aria-checked={settings.centerImage}
      >
        <div
          style={{
            ...styles.checkbox,
            ...(settings.centerImage ? styles.checkboxChecked : {}),
          }}
        >
          {settings.centerImage && <CheckIcon />}
        </div>
        <div>
          <div style={styles.checkboxLabel}>Center image on slide</div>
          <div style={styles.checkboxDescription}>
            Automatically center the illustration with padding
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div style={styles.section}>
        <label style={styles.label}>Presentation Title (optional)</label>
        <input
          type="text"
          value={settings.title || ''}
          onChange={(e) => handleTextChange('title', e.target.value)}
          style={styles.textInput}
          placeholder="e.g., Cell Biology Diagrams"
        />
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Author (optional)</label>
        <input
          type="text"
          value={settings.author || ''}
          onChange={(e) => handleTextChange('author', e.target.value)}
          style={styles.textInput}
          placeholder="e.g., Dr. Jane Smith"
        />
      </div>

      {/* Preview */}
      <div style={styles.previewContainer}>
        <div
          style={{
            ...styles.previewSlide,
            width: `${previewDimensions.width}px`,
            height: `${previewDimensions.height}px`,
            backgroundColor: settings.background === 'white' ? '#ffffff' : '#e5e5e5',
            backgroundImage:
              settings.background === 'transparent'
                ? 'repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%)'
                : 'none',
            backgroundSize: '8px 8px',
          }}
        >
          <div
            style={{
              ...styles.previewContent,
              width: settings.centerImage ? '70%' : '90%',
              height: settings.centerImage ? '70%' : '90%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'var(--accent-primary, #3b82f6)',
                opacity: 0.5,
              }}
            >
              <SlidesIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PPTXOptions;
