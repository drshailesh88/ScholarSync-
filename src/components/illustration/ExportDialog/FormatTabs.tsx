/**
 * FormatTabs Component
 * Tab component for selecting export format with icons
 *
 * @module components/ExportDialog/FormatTabs
 */

import React from 'react';

// ============================================================================
// Types
// ============================================================================

export type ExportFormat = 'png' | 'svg' | 'pdf' | 'pptx' | 'latex';

export interface FormatTabsProps {
  /** Currently selected format */
  selectedFormat: ExportFormat;
  /** Callback when format changes */
  onFormatChange: (format: ExportFormat) => void;
}

interface FormatOption {
  id: ExportFormat;
  label: string;
  description: string;
  icon: React.ReactNode;
}

// ============================================================================
// Icons
// ============================================================================

const PNGIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);

const SVGIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 8L3 12L7 16" />
    <path d="M17 8L21 12L17 16" />
    <path d="M14 4L10 20" />
  </svg>
);

const PDFIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M9 15h6" />
    <path d="M9 11h6" />
  </svg>
);

const LaTeXIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 7V4h16v3" />
    <path d="M9 20h6" />
    <path d="M12 4v16" />
    <path d="M8 12l4 4 4-4" />
  </svg>
);

const PPTXIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="14" rx="2" />
    <path d="M8 18v2" />
    <path d="M16 18v2" />
    <path d="M6 20h12" />
    <circle cx="12" cy="11" r="3" />
  </svg>
);

// ============================================================================
// Format Options
// ============================================================================

const formatOptions: FormatOption[] = [
  {
    id: 'png',
    label: 'PNG',
    description: 'Raster image',
    icon: <PNGIcon />,
  },
  {
    id: 'svg',
    label: 'SVG',
    description: 'Vector graphic',
    icon: <SVGIcon />,
  },
  {
    id: 'pdf',
    label: 'PDF',
    description: 'Document',
    icon: <PDFIcon />,
  },
  {
    id: 'pptx',
    label: 'PPTX',
    description: 'PowerPoint',
    icon: <PPTXIcon />,
  },
  {
    id: 'latex',
    label: 'LaTeX',
    description: 'TikZ code',
    icon: <LaTeXIcon />,
  },
];

// ============================================================================
// Styles
// ============================================================================

const styles = {
  container: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
  },
  tab: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '4px',
    padding: '12px 8px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '2px solid var(--border-color, #333)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  tabActive: {
    borderColor: 'var(--accent-primary, #3b82f6)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  tabIcon: {
    color: 'var(--text-secondary, #9d9d9d)',
    transition: 'color 150ms ease',
  },
  tabIconActive: {
    color: 'var(--accent-primary, #3b82f6)',
  },
  tabLabel: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-primary, #ffffff)',
    margin: 0,
  },
  tabDescription: {
    fontSize: '11px',
    color: 'var(--text-muted, #666)',
    margin: 0,
  },
};

// ============================================================================
// Component
// ============================================================================

export function FormatTabs({
  selectedFormat,
  onFormatChange,
}: FormatTabsProps): JSX.Element {
  return (
    <div style={styles.container} role="tablist" aria-label="Export format selection">
      {/* empty state: renders nothing when no data */}
      {formatOptions.map((option) => {
        const isActive = selectedFormat === option.id;

        return (
          <button
            key={option.id}
            role="tab"
            aria-selected={isActive}
            style={{
              ...styles.tab,
              ...(isActive ? styles.tabActive : {}),
            }}
            onClick={() => onFormatChange(option.id)}
          >
            <span
              style={{
                ...styles.tabIcon,
                ...(isActive ? styles.tabIconActive : {}),
              }}
            >
              {option.icon}
            </span>
            <span style={styles.tabLabel}>{option.label}</span>
            <span style={styles.tabDescription}>{option.description}</span>
          </button>
        );
      })}
    </div>
  );
}

export default FormatTabs;
