/**
 * IllustratorToolbar Component
 *
 * Unified toolbar for professional illustration tools including:
 * - Selection tool
 * - Pen tool (Bezier curves via Paper.js)
 * - Brush tool (natural strokes via perfect-freehand)
 * - Shape tools (rectangle, ellipse, line)
 * - Hand-drawn style toggle (Rough.js)
 *
 * @module components/IllustratorToolbar
 */

import React, { useState, useCallback } from 'react';
import { Canvas as FabricCanvas } from 'fabric';

// ============================================================================
// Types
// ============================================================================

export type IllustratorTool = 'select' | 'pen' | 'brush' | 'rectangle' | 'ellipse' | 'line' | 'connector' | 'text';

export interface IllustratorToolbarProps {
  canvas: FabricCanvas | null;
  activeTool: IllustratorTool;
  onToolChange: (tool: IllustratorTool) => void;
  handDrawnEnabled?: boolean;
  onHandDrawnToggle?: (enabled: boolean) => void;
  onOpenFigurePanelGenerator?: () => void;
}

interface ToolButtonProps {
  tool: IllustratorTool;
  icon: React.ReactNode;
  label: string;
  shortcut?: string;
  isActive: boolean;
  onClick: () => void;
}

// ============================================================================
// Styles
// ============================================================================

const styles: Record<string, React.CSSProperties> = {
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '4px',
    padding: '8px 12px',
    backgroundColor: 'var(--bg-secondary)',
    borderBottom: '1px solid var(--border-primary)',
  },
  toolGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: '2px',
  },
  divider: {
    width: '1px',
    height: '28px',
    backgroundColor: 'var(--border-primary)',
    margin: '0 8px',
  },
  toolButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    padding: 0,
    border: 'none',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    position: 'relative',
  },
  toolButtonActive: {
    backgroundColor: 'var(--accent-primary)',
    color: 'white',
  },
  toolButtonHover: {
    backgroundColor: 'var(--bg-hover)',
    color: 'var(--text-primary)',
  },
  toggleButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 500,
    transition: 'all 150ms ease',
  },
  toggleButtonActive: {
    backgroundColor: 'var(--accent-secondary)',
    color: 'var(--accent-primary)',
  },
  tooltip: {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginTop: '8px',
    padding: '6px 10px',
    backgroundColor: 'var(--bg-elevated)',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-primary)',
    whiteSpace: 'nowrap',
    zIndex: 1000,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    pointerEvents: 'none',
  },
  tooltipShortcut: {
    marginLeft: '8px',
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
  },
};

// ============================================================================
// Icons
// ============================================================================

const SelectIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
    <path d="M13 13l6 6" />
  </svg>
);

const PenIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);

const BrushIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
    <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
  </svg>
);

const RectangleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
  </svg>
);

const EllipseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const LineIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="19" x2="19" y2="5" />
  </svg>
);

const TextIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4,7 4,4 20,4 20,7" />
    <line x1="9" y1="20" x2="15" y2="20" />
    <line x1="12" y1="4" x2="12" y2="20" />
  </svg>
);

const ConnectorIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5" cy="5" r="2.5" fill="currentColor" />
    <circle cx="19" cy="19" r="2.5" fill="currentColor" />
    <path d="M7.5 5 L12 5 L12 19 L16.5 19" />
  </svg>
);

const SketchyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 17c3.333-3.333 6.667-5 10-5 2 0 4 .5 6 1.5" />
    <path d="M3 12c3.333-2 6.667-2.5 10-1.5 2 .6 4 1.8 6 3.5" />
    <path d="M3 7c3.333-1 6.667-1 10 0 2 .6 4 1.8 6 3.5" />
  </svg>
);

const FigurePanelIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="8" height="8" />
    <rect x="13" y="3" width="8" height="8" />
    <rect x="3" y="13" width="8" height="8" />
    <rect x="13" y="13" width="8" height="8" />
  </svg>
);

// ============================================================================
// Tool Button Component
// ============================================================================

function ToolButton({ tool: _tool, icon, label, shortcut, isActive, onClick }: ToolButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      style={{
        ...styles.toolButton,
        ...(isActive ? styles.toolButtonActive : {}),
        ...(!isActive && isHovered ? styles.toolButtonHover : {}),
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={`${label}${shortcut ? ` (${shortcut})` : ''}`}
      aria-label={label}
      aria-pressed={isActive}
    >
      {icon}
      {isHovered && (
        <div style={styles.tooltip}>
          {label}
          {shortcut && <span style={styles.tooltipShortcut}>{shortcut}</span>}
        </div>
      )}
    </button>
  );
}

// ============================================================================
// Tool Groups Configuration
// ============================================================================

const toolConfig: Array<{
  tool: IllustratorTool;
  icon: React.ReactNode;
  label: string;
  shortcut: string;
  group: 'selection' | 'draw' | 'shapes' | 'text';
}> = [
  { tool: 'select', icon: <SelectIcon />, label: 'Select', shortcut: 'V', group: 'selection' },
  { tool: 'pen', icon: <PenIcon />, label: 'Pen Tool (Bezier)', shortcut: 'P', group: 'draw' },
  { tool: 'brush', icon: <BrushIcon />, label: 'Brush Tool', shortcut: 'B', group: 'draw' },
  { tool: 'rectangle', icon: <RectangleIcon />, label: 'Rectangle', shortcut: 'R', group: 'shapes' },
  { tool: 'ellipse', icon: <EllipseIcon />, label: 'Ellipse', shortcut: 'E', group: 'shapes' },
  { tool: 'line', icon: <LineIcon />, label: 'Line', shortcut: 'L', group: 'shapes' },
  { tool: 'connector', icon: <ConnectorIcon />, label: 'Smart Connector', shortcut: 'C', group: 'shapes' },
  { tool: 'text', icon: <TextIcon />, label: 'Text', shortcut: 'T', group: 'text' },
];

// ============================================================================
// IllustratorToolbar Component
// ============================================================================

export function IllustratorToolbar({
  canvas: _canvas,
  activeTool,
  onToolChange,
  handDrawnEnabled = false,
  onHandDrawnToggle,
  onOpenFigurePanelGenerator,
}: IllustratorToolbarProps): JSX.Element {
  const [toggleHovered, setToggleHovered] = useState(false);

  const handleToolClick = useCallback((tool: IllustratorTool) => {
    onToolChange(tool);
  }, [onToolChange]);

  const handleHandDrawnToggle = useCallback(() => {
    onHandDrawnToggle?.(!handDrawnEnabled);
  }, [handDrawnEnabled, onHandDrawnToggle]);

  // Group tools
  const selectionTools = toolConfig.filter(t => t.group === 'selection');
  const drawTools = toolConfig.filter(t => t.group === 'draw');
  const shapeTools = toolConfig.filter(t => t.group === 'shapes');
  const textTools = toolConfig.filter(t => t.group === 'text');

  return (
    <div style={styles.toolbar} role="toolbar" aria-label="Illustration tools">
      {/* Selection tools */}
      <div style={styles.toolGroup}>
        {selectionTools.map(tool => (
          <ToolButton
            key={tool.tool}
            tool={tool.tool}
            icon={tool.icon}
            label={tool.label}
            shortcut={tool.shortcut}
            isActive={activeTool === tool.tool}
            onClick={() => handleToolClick(tool.tool)}
          />
        ))}
      </div>

      <div style={styles.divider} />

      {/* Drawing tools */}
      <div style={styles.toolGroup}>
        {drawTools.map(tool => (
          <ToolButton
            key={tool.tool}
            tool={tool.tool}
            icon={tool.icon}
            label={tool.label}
            shortcut={tool.shortcut}
            isActive={activeTool === tool.tool}
            onClick={() => handleToolClick(tool.tool)}
          />
        ))}
      </div>

      <div style={styles.divider} />

      {/* Shape tools */}
      <div style={styles.toolGroup}>
        {shapeTools.map(tool => (
          <ToolButton
            key={tool.tool}
            tool={tool.tool}
            icon={tool.icon}
            label={tool.label}
            shortcut={tool.shortcut}
            isActive={activeTool === tool.tool}
            onClick={() => handleToolClick(tool.tool)}
          />
        ))}
      </div>

      <div style={styles.divider} />

      {/* Text tools */}
      <div style={styles.toolGroup}>
        {textTools.map(tool => (
          <ToolButton
            key={tool.tool}
            tool={tool.tool}
            icon={tool.icon}
            label={tool.label}
            shortcut={tool.shortcut}
            isActive={activeTool === tool.tool}
            onClick={() => handleToolClick(tool.tool)}
          />
        ))}
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Figure panels generator */}
      <button
        style={styles.toggleButton}
        onClick={onOpenFigurePanelGenerator}
        title="Generate multi-panel figure layout"
        type="button"
      >
        <FigurePanelIcon />
        <span>Figure Panels</span>
      </button>

      {/* Hand-drawn style toggle */}
      <button
        style={{
          ...styles.toggleButton,
          ...(handDrawnEnabled ? styles.toggleButtonActive : {}),
          ...(toggleHovered && !handDrawnEnabled ? styles.toolButtonHover : {}),
        }}
        onClick={handleHandDrawnToggle}
        onMouseEnter={() => setToggleHovered(true)}
        onMouseLeave={() => setToggleHovered(false)}
        title="Toggle hand-drawn style (applies Rough.js sketchy effect)"
        aria-pressed={handDrawnEnabled}
      >
        <SketchyIcon />
        <span>Sketchy</span>
      </button>
    </div>
  );
}

export default IllustratorToolbar;
