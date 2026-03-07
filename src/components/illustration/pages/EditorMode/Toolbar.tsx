/**
 * Toolbar Component
 * Vertical toolbar with drawing and editing tools
 *
 * @module pages/EditorMode/Toolbar
 */

import React, { useState } from 'react';
import { useEditorStore, useActiveTool } from '@/stores/illustration/editorStore';
import { ToolType } from '@/lib/illustration/types';

// ============================================================================
// Types
// ============================================================================

interface ToolbarProps {
  /** Callback to open the shape generator panel */
  onOpenShapeGenerator?: () => void;
}

interface ToolButtonProps {
  tool: ToolType;
  icon: React.ReactNode;
  label: string;
  shortcut?: string;
  isActive: boolean;
  onClick: () => void;
}

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  shortcut?: string;
  onClick: () => void;
}

interface ToolGroup {
  label: string;
  tools: {
    type: ToolType;
    icon: React.ReactNode;
    label: string;
    shortcut?: string;
  }[];
}

// ============================================================================
// Styles
// ============================================================================

const styles: Record<string, React.CSSProperties> = {
  toolbar: {
    display: 'flex',
    flexDirection: 'column',
    width: 'var(--toolbar-width, 48px)',
    backgroundColor: 'var(--bg-secondary)',
    borderRight: '1px solid var(--border-primary)',
    padding: '8px 4px',
    gap: '4px',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  toolGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--border-primary)',
    margin: '8px 4px',
  },
  toolButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
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
  tooltip: {
    position: 'absolute',
    left: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    marginLeft: '8px',
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
  toolButtonWrapper: {
    position: 'relative',
  },
  configPopup: {
    position: 'absolute',
    left: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    marginLeft: '8px',
    width: '136px',
    padding: '8px',
    borderRadius: '6px',
    border: '1px solid var(--border-primary)',
    backgroundColor: 'var(--bg-elevated)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.25)',
    zIndex: 1001,
  },
  configTitle: {
    margin: 0,
    fontSize: '11px',
    color: 'var(--text-secondary)',
  },
  configInput: {
    marginTop: '6px',
    width: '100%',
    border: '1px solid var(--border-primary)',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    padding: '4px 6px',
    fontSize: '12px',
    outline: 'none',
  },
};

// ============================================================================
// Icons
// ============================================================================

const SelectIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
    <path d="M13 13l6 6" />
  </svg>
);

const DirectSelectIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l5.5 14.5 2.2-5 5-2.2L4 4z" />
    <path d="M12 12l6 6" />
  </svg>
);

const HandIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
  </svg>
);

const RectangleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
  </svg>
);

const EllipseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const PolygonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 3 19 7.5 19 16.5 12 21 5 16.5 5 7.5" />
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2.5 14.9 8.8 21.8 9.5 16.6 14.2 18.1 21 12 17.3 5.9 21 7.4 14.2 2.2 9.5 9.1 8.8" />
  </svg>
);

const LineIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="19" x2="19" y2="5" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="19" x2="19" y2="5" />
    <polyline points="9,5 19,5 19,15" />
  </svg>
);

const PenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);

const BrushIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
    <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
  </svg>
);

const TextIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4,7 4,4 20,4 20,7" />
    <line x1="9" y1="20" x2="15" y2="20" />
    <line x1="12" y1="4" x2="12" y2="20" />
  </svg>
);

const ZoomIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const EyedropperIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4.5l5 5" />
    <path d="M7 17l9.5-9.5a2.12 2.12 0 1 0-3-3L4 14v3h3z" />
    <path d="M5 19h6" />
  </svg>
);

const EraserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 20H8" />
    <path d="M5 16l8.5-8.5a2.12 2.12 0 0 1 3 0l2 2a2.12 2.12 0 0 1 0 3L12 19H8z" />
  </svg>
);

const ScissorsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <line x1="20" y1="4" x2="8.12" y2="15.88" />
    <line x1="14.47" y1="14.48" x2="20" y2="20" />
    <line x1="8.12" y1="8.12" x2="12" y2="12" />
  </svg>
);

const MeasureIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7l4-4 14 14-4 4z" />
    <path d="M11 5l2 2" />
    <path d="M8 8l2 2" />
    <path d="M5 11l2 2" />
  </svg>
);

const ScientificShapesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 15c6.667-6 13.333 0 20-6" />
    <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
    <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
    <path d="M17 6l-2.5-2.5" />
    <path d="M7 18l2.5 2.5" />
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

function ActionButton({ icon, label, shortcut, onClick }: ActionButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      style={{
        ...styles.toolButton,
        ...(isHovered ? styles.toolButtonHover : {}),
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={`${label}${shortcut ? ` (${shortcut})` : ''}`}
      aria-label={label}
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

const toolGroups: ToolGroup[] = [
  {
    label: 'Selection',
    tools: [
      { type: ToolType.SELECT, icon: <SelectIcon />, label: 'Select', shortcut: 'V' },
      { type: ToolType.DIRECT_SELECT, icon: <DirectSelectIcon />, label: 'Direct Select', shortcut: 'A' },
      { type: ToolType.HAND, icon: <HandIcon />, label: 'Hand', shortcut: 'H' },
    ],
  },
  {
    label: 'Shapes',
    tools: [
      { type: ToolType.RECTANGLE, icon: <RectangleIcon />, label: 'Rectangle', shortcut: 'R' },
      { type: ToolType.ELLIPSE, icon: <EllipseIcon />, label: 'Ellipse', shortcut: 'E' },
      { type: ToolType.POLYGON, icon: <PolygonIcon />, label: 'Polygon' },
      { type: ToolType.STAR, icon: <StarIcon />, label: 'Star' },
    ],
  },
  {
    label: 'Lines',
    tools: [
      { type: ToolType.LINE, icon: <LineIcon />, label: 'Line', shortcut: 'L' },
      { type: ToolType.ARROW, icon: <ArrowIcon />, label: 'Arrow' },
    ],
  },
  {
    label: 'Draw',
    tools: [
      { type: ToolType.PEN, icon: <PenIcon />, label: 'Pen', shortcut: 'P' },
      { type: ToolType.BRUSH, icon: <BrushIcon />, label: 'Brush', shortcut: 'B' },
    ],
  },
  {
    label: 'Text',
    tools: [
      { type: ToolType.TEXT, icon: <TextIcon />, label: 'Text', shortcut: 'T' },
    ],
  },
  {
    label: 'Utility',
    tools: [
      { type: ToolType.EYEDROPPER, icon: <EyedropperIcon />, label: 'Eyedropper', shortcut: 'I' },
      { type: ToolType.ERASER, icon: <EraserIcon />, label: 'Eraser', shortcut: 'Shift+E' },
      { type: ToolType.SCISSORS, icon: <ScissorsIcon />, label: 'Scissors', shortcut: 'C' },
      { type: ToolType.MEASURE, icon: <MeasureIcon />, label: 'Measure', shortcut: 'M' },
      { type: ToolType.ZOOM, icon: <ZoomIcon />, label: 'Zoom', shortcut: 'Z' },
    ],
  },
];

// ============================================================================
// Toolbar Component
// ============================================================================

export function Toolbar({ onOpenShapeGenerator }: ToolbarProps): JSX.Element {
  const activeTool = useActiveTool();
  const setActiveTool = useEditorStore((state) => state.setActiveTool);
  const polygonSides = useEditorStore((state) => state.polygonSides);
  const starPoints = useEditorStore((state) => state.starPoints);
  const setPolygonSides = useEditorStore((state) => state.setPolygonSides);
  const setStarPoints = useEditorStore((state) => state.setStarPoints);
  const [openShapeConfig, setOpenShapeConfig] = useState<ToolType.POLYGON | ToolType.STAR | null>(null);

  const handleToolClick = (toolType: ToolType) => {
    if (toolType === ToolType.POLYGON || toolType === ToolType.STAR) {
      if (activeTool === toolType) {
        setOpenShapeConfig((prev) => (prev === toolType ? null : toolType));
      } else {
        setActiveTool(toolType);
        setOpenShapeConfig(null);
      }
      return;
    }

    setOpenShapeConfig(null);
    setActiveTool(toolType);
  };

  return (
    <aside style={styles.toolbar} role="toolbar" aria-label="Drawing tools">
      {toolGroups.map((group, groupIndex) => (
        <React.Fragment key={group.label}>
          {groupIndex > 0 && <div style={styles.divider} />}
          <div style={styles.toolGroup} role="group" aria-label={group.label}>
            {group.tools.map((tool) => (
              <div key={tool.type} style={styles.toolButtonWrapper}>
                <ToolButton
                  tool={tool.type}
                  icon={tool.icon}
                  label={tool.label}
                  shortcut={tool.shortcut}
                  isActive={activeTool === tool.type}
                  onClick={() => handleToolClick(tool.type)}
                />
                {tool.type === ToolType.POLYGON && openShapeConfig === ToolType.POLYGON && (
                  <div style={styles.configPopup}>
                    <p style={styles.configTitle}>Polygon sides</p>
                    <input
                      type="number"
                      min={3}
                      max={24}
                      value={polygonSides}
                      onChange={(event) => {
                        const value = Number.parseInt(event.target.value, 10);
                        if (Number.isFinite(value)) {
                          setPolygonSides(value);
                        }
                      }}
                      style={styles.configInput}
                    />
                  </div>
                )}
                {tool.type === ToolType.STAR && openShapeConfig === ToolType.STAR && (
                  <div style={styles.configPopup}>
                    <p style={styles.configTitle}>Star points</p>
                    <input
                      type="number"
                      min={3}
                      max={24}
                      value={starPoints}
                      onChange={(event) => {
                        const value = Number.parseInt(event.target.value, 10);
                        if (Number.isFinite(value)) {
                          setStarPoints(value);
                        }
                      }}
                      style={styles.configInput}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}

      {/* Scientific Shapes */}
      <div style={styles.divider} />
      <div style={styles.toolGroup} role="group" aria-label="Scientific Shapes">
        <ActionButton
          icon={<ScientificShapesIcon />}
          label="Scientific Shapes"
          shortcut="Ctrl+Shift+S"
          onClick={() => onOpenShapeGenerator?.()}
        />
      </div>
    </aside>
  );
}

export default Toolbar;
