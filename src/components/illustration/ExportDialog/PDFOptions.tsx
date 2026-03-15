/**
 * PDFOptions Component
 * Export options for PDF format including page size, orientation, and margins
 *
 * @module components/ExportDialog/PDFOptions
 */


// ============================================================================
// Types
// ============================================================================

export type PageSize = 'a4' | 'letter' | 'custom';
export type PageOrientation = 'portrait' | 'landscape';

export interface Margins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface PDFExportSettings {
  /** Page size */
  pageSize: PageSize;
  /** Page orientation */
  orientation: PageOrientation;
  /** Page margins in mm */
  margins: Margins;
  /** Custom page width in mm */
  customWidth?: number;
  /** Custom page height in mm */
  customHeight?: number;
}

export interface PDFOptionsProps {
  /** Current settings */
  settings: PDFExportSettings;
  /** Callback when settings change */
  onChange: (settings: PDFExportSettings) => void;
}

// ============================================================================
// Constants
// ============================================================================

const PAGE_SIZE_OPTIONS: { value: PageSize; label: string; dimensions: string }[] = [
  { value: 'a4', label: 'A4', dimensions: '210 x 297 mm' },
  { value: 'letter', label: 'Letter', dimensions: '216 x 279 mm' },
  { value: 'custom', label: 'Custom', dimensions: 'User defined' },
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
  },
  selectOption: {
    flex: 1,
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
  },
  orientationContainer: {
    display: 'flex',
    gap: '12px',
  },
  orientationOption: {
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
  orientationOptionActive: {
    borderColor: 'var(--accent-primary, #3b82f6)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  orientationIcon: {
    color: 'var(--text-secondary, #9d9d9d)',
  },
  orientationIconActive: {
    color: 'var(--accent-primary, #3b82f6)',
  },
  orientationLabel: {
    fontSize: '14px',
    color: 'var(--text-primary, #ffffff)',
  },
  marginsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
  },
  marginInput: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  marginLabel: {
    fontSize: '11px',
    color: 'var(--text-muted, #666)',
    textAlign: 'center' as const,
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
  previewContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    borderRadius: '6px',
  },
  previewPage: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
  },
  previewContent: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    border: '1px dashed var(--accent-primary, #3b82f6)',
  },
};

// ============================================================================
// Icons
// ============================================================================

const PortraitIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="12" y2="14" />
  </svg>
);

const LandscapeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="6" y1="9" x2="18" y2="9" />
    <line x1="6" y1="12" x2="18" y2="12" />
    <line x1="6" y1="15" x2="14" y2="15" />
  </svg>
);

// ============================================================================
// Component
// ============================================================================

export function PDFOptions({ settings, onChange }: PDFOptionsProps): JSX.Element {
  const handlePageSizeChange = (pageSize: PageSize) => {
    onChange({ ...settings, pageSize });
  };

  const handleOrientationChange = (orientation: PageOrientation) => {
    onChange({ ...settings, orientation });
  };

  const handleMarginChange = (key: keyof Margins, value: string) => {
    const numValue = parseInt(value, 10) || 0;
    onChange({
      ...settings,
      margins: { ...settings.margins, [key]: Math.max(0, Math.min(100, numValue)) },
    });
  };

  const handleCustomDimensionChange = (key: 'customWidth' | 'customHeight', value: string) => {
    const numValue = parseInt(value, 10) || 0;
    onChange({ ...settings, [key]: Math.max(50, Math.min(1000, numValue)) });
  };

  const getPageDimensions = () => {
    if (settings.pageSize === 'custom') {
      return {
        width: settings.customWidth || 210,
        height: settings.customHeight || 297,
      };
    }
    const sizes = {
      a4: { width: 210, height: 297 },
      letter: { width: 216, height: 279 },
    };
    return sizes[settings.pageSize];
  };

  const dimensions = getPageDimensions();
  const isLandscape = settings.orientation === 'landscape';
  const displayWidth = isLandscape ? dimensions.height : dimensions.width;
  const displayHeight = isLandscape ? dimensions.width : dimensions.height;

  // Preview scale
  const scale = 0.3;
  const previewWidth = displayWidth * scale;
  const previewHeight = displayHeight * scale;

  return (
    <div style={styles.container}>
      {/* Page Size Selection */}
      <div style={styles.section}>
        <label style={styles.label}>Page Size</label>
        <div style={styles.selectContainer}>
          {PAGE_SIZE_OPTIONS.map((option) => (
            <button
              key={option.value}
              style={{
                ...styles.selectOption,
                ...(settings.pageSize === option.value ? styles.selectOptionActive : {}),
              }}
              onClick={() => handlePageSizeChange(option.value)}
            >
              <span style={styles.selectLabel}>{option.label}</span>
              <span style={styles.selectDescription}>{option.dimensions}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Dimensions */}
      {settings.pageSize === 'custom' && (
        <div style={styles.section}>
          <label style={styles.label}>Custom Dimensions (mm)</label>
          <div style={styles.customDimensionsRow}>
            <input aria-label="Number input"
              type="number"
              value={settings.customWidth || 210}
              onChange={(e) => handleCustomDimensionChange('customWidth', e.target.value)}
              style={styles.input}
              placeholder="Width"
              min="50"
              max="1000"
            />
            <span style={styles.dimensionSeparator}>x</span>
            <input aria-label="Number input"
              type="number"
              value={settings.customHeight || 297}
              onChange={(e) => handleCustomDimensionChange('customHeight', e.target.value)}
              style={styles.input}
              placeholder="Height"
              min="50"
              max="1000"
            />
          </div>
        </div>
      )}

      {/* Orientation */}
      <div style={styles.section}>
        <label style={styles.label}>Orientation</label>
        <div style={styles.orientationContainer}>
          <button
            style={{
              ...styles.orientationOption,
              ...(settings.orientation === 'portrait' ? styles.orientationOptionActive : {}),
            }}
            onClick={() => handleOrientationChange('portrait')}
          >
            <span
              style={{
                ...styles.orientationIcon,
                ...(settings.orientation === 'portrait' ? styles.orientationIconActive : {}),
              }}
            >
              <PortraitIcon />
            </span>
            <span style={styles.orientationLabel}>Portrait</span>
          </button>
          <button
            style={{
              ...styles.orientationOption,
              ...(settings.orientation === 'landscape' ? styles.orientationOptionActive : {}),
            }}
            onClick={() => handleOrientationChange('landscape')}
          >
            <span
              style={{
                ...styles.orientationIcon,
                ...(settings.orientation === 'landscape' ? styles.orientationIconActive : {}),
              }}
            >
              <LandscapeIcon />
            </span>
            <span style={styles.orientationLabel}>Landscape</span>
          </button>
        </div>
      </div>

      {/* Margins */}
      <div style={styles.section}>
        <label style={styles.label}>Margins (mm)</label>
        <div style={styles.marginsGrid}>
          <div style={styles.marginInput}>
            <span style={styles.marginLabel}>Top</span>
            <input aria-label="Number input"
              type="number"
              value={settings.margins.top}
              onChange={(e) => handleMarginChange('top', e.target.value)}
              style={styles.input}
              min="0"
              max="100"
            />
          </div>
          <div style={styles.marginInput}>
            <span style={styles.marginLabel}>Right</span>
            <input aria-label="Number input"
              type="number"
              value={settings.margins.right}
              onChange={(e) => handleMarginChange('right', e.target.value)}
              style={styles.input}
              min="0"
              max="100"
            />
          </div>
          <div style={styles.marginInput}>
            <span style={styles.marginLabel}>Bottom</span>
            <input aria-label="Number input"
              type="number"
              value={settings.margins.bottom}
              onChange={(e) => handleMarginChange('bottom', e.target.value)}
              style={styles.input}
              min="0"
              max="100"
            />
          </div>
          <div style={styles.marginInput}>
            <span style={styles.marginLabel}>Left</span>
            <input aria-label="Number input"
              type="number"
              value={settings.margins.left}
              onChange={(e) => handleMarginChange('left', e.target.value)}
              style={styles.input}
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div style={styles.previewContainer}>
        <div
          style={{
            ...styles.previewPage,
            width: `${previewWidth}px`,
            height: `${previewHeight}px`,
          }}
        >
          <div
            style={{
              ...styles.previewContent,
              width: `calc(100% - ${(settings.margins.left + settings.margins.right) * scale}px)`,
              height: `calc(100% - ${(settings.margins.top + settings.margins.bottom) * scale}px)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PDFOptions;
