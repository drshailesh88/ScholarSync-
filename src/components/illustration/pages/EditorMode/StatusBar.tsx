/**
 * StatusBar Component
 * Bottom status bar showing zoom, selection, coordinates, and tool info
 *
 * @module pages/EditorMode/StatusBar
 */

import { useState } from 'react';
import { useEditorStore, useViewport, useSelection, useActiveTool } from '@/stores/illustration/editorStore';
import { ToolType } from '@/lib/illustration/types';

// ============================================================================
// Types
// ============================================================================

interface MouseCoords {
  x: number;
  y: number;
}

interface StatusBarProps {
  mouseCoords?: MouseCoords;
}

// ============================================================================
// Styles
// ============================================================================

const styles: Record<string, React.CSSProperties> = {
  statusBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 'var(--statusbar-height, 24px)',
    padding: '0 12px',
    backgroundColor: 'var(--bg-secondary)',
    borderTop: '1px solid var(--border-primary)',
    fontSize: '11px',
    color: 'var(--text-secondary)',
    userSelect: 'none',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  statusItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  statusIcon: {
    width: '12px',
    height: '12px',
    opacity: 0.7,
  },
  statusLabel: {
    color: 'var(--text-muted)',
    marginRight: '4px',
  },
  statusValue: {
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
  },
  divider: {
    width: '1px',
    height: '14px',
    backgroundColor: 'var(--border-primary)',
  },
  zoomControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  zoomButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '16px',
    height: '16px',
    padding: 0,
    border: 'none',
    borderRadius: '2px',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'all 100ms ease',
  },
  zoomButtonHover: {
    backgroundColor: 'var(--bg-hover)',
    color: 'var(--text-primary)',
  },
  toolBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 8px',
    backgroundColor: 'var(--bg-tertiary)',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: 500,
    textTransform: 'capitalize',
  },
};

// ============================================================================
// Icons
// ============================================================================

const ZoomInIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const ZoomOutIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const MouseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
  </svg>
);

const SelectionIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" strokeDasharray="4 2" />
  </svg>
);

// ============================================================================
// Tool Display Names
// ============================================================================

const toolDisplayNames: Record<ToolType, string> = {
  [ToolType.SELECT]: 'Select',
  [ToolType.DIRECT_SELECT]: 'Direct Select',
  [ToolType.PEN]: 'Pen',
  [ToolType.PENCIL]: 'Pencil',
  [ToolType.LINE]: 'Line',
  [ToolType.RECTANGLE]: 'Rectangle',
  [ToolType.ELLIPSE]: 'Ellipse',
  [ToolType.POLYGON]: 'Polygon',
  [ToolType.STAR]: 'Star',
  [ToolType.ARROW]: 'Arrow',
  [ToolType.BRACKET]: 'Bracket',
  [ToolType.CALLOUT]: 'Callout',
  [ToolType.DIMENSION]: 'Dimension',
  [ToolType.CONNECTOR]: 'Connector',
  [ToolType.TEXT]: 'Text',
  [ToolType.TEXT_ON_PATH]: 'Text on Path',
  [ToolType.HAND]: 'Hand',
  [ToolType.ZOOM]: 'Zoom',
  [ToolType.EYEDROPPER]: 'Eyedropper',
};

// ============================================================================
// StatusBar Component
// ============================================================================

export function StatusBar({ mouseCoords }: StatusBarProps): JSX.Element {
  const { zoom } = useViewport();
  const { selectionCount, hasSelection } = useSelection();
  const activeTool = useActiveTool();
  const setZoom = useEditorStore((state) => state.setZoom);
  const resetViewport = useEditorStore((state) => state.resetViewport);

  const [zoomMinusHovered, setZoomMinusHovered] = useState(false);
  const [zoomPlusHovered, setZoomPlusHovered] = useState(false);

  // Format zoom percentage
  const zoomPercent = Math.round(zoom * 100);

  // Handle zoom controls
  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.1, 10));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.1, 0.1));
  };

  const handleZoomReset = () => {
    resetViewport();
  };

  return (
    <footer style={styles.statusBar}>
      {/* Left Section - Tool and Selection Info */}
      <div style={styles.leftSection}>
        {/* Current Tool */}
        <div style={styles.toolBadge}>
          {toolDisplayNames[activeTool] || 'Select'}
        </div>

        <div style={styles.divider} />

        {/* Selection Count */}
        <div style={styles.statusItem}>
          <span style={styles.statusIcon}>
            <SelectionIcon />
          </span>
          <span style={styles.statusLabel}>Selected:</span>
          <span style={styles.statusValue}>
            {hasSelection ? `${selectionCount} object${selectionCount !== 1 ? 's' : ''}` : 'None'}
          </span>
        </div>
      </div>

      {/* Right Section - Coordinates and Zoom */}
      <div style={styles.rightSection}>
        {/* Mouse Coordinates */}
        <div style={styles.statusItem}>
          <span style={styles.statusIcon}>
            <MouseIcon />
          </span>
          <span style={styles.statusLabel}>X:</span>
          <span style={styles.statusValue}>{mouseCoords?.x ?? 0}</span>
          <span style={styles.statusLabel}>Y:</span>
          <span style={styles.statusValue}>{mouseCoords?.y ?? 0}</span>
        </div>

        <div style={styles.divider} />

        {/* Zoom Control */}
        <div style={styles.zoomControl}>
          <button
            style={{
              ...styles.zoomButton,
              ...(zoomMinusHovered ? styles.zoomButtonHover : {}),
            }}
            onClick={handleZoomOut}
            onMouseEnter={() => setZoomMinusHovered(true)}
            onMouseLeave={() => setZoomMinusHovered(false)}
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <ZoomOutIcon />
          </button>
          <button
            style={{
              ...styles.statusValue,
              cursor: 'pointer',
              minWidth: '36px',
              textAlign: 'center' as const,
              background: 'none',
              border: 'none',
              padding: '2px 4px',
              borderRadius: '2px',
            }}
            onClick={handleZoomReset}
            title="Reset zoom to 100%"
            aria-label={`Current zoom ${zoomPercent}%. Click to reset zoom to 100%`}
          >
            {zoomPercent}%
          </button>
          <button
            style={{
              ...styles.zoomButton,
              ...(zoomPlusHovered ? styles.zoomButtonHover : {}),
            }}
            onClick={handleZoomIn}
            onMouseEnter={() => setZoomPlusHovered(true)}
            onMouseLeave={() => setZoomPlusHovered(false)}
            title="Zoom In"
            aria-label="Zoom in"
          >
            <ZoomInIcon />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default StatusBar;
