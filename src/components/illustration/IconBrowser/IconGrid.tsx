/**
 * IconGrid Component
 *
 * Grid display of icon cards with hover preview and click to insert functionality.
 * Supports lazy loading and virtualization for large icon sets.
 */

import React, { useState, useCallback, useMemo } from 'react';
import type { IconDefinition, IconDomain } from '@/lib/illustration/data/icons';

// =============================================================================
// TYPES
// =============================================================================

export interface IconGridProps {
  /** Array of icons to display */
  icons: IconDefinition[];
  /** Callback when an icon is clicked */
  onIconClick: (icon: IconDefinition) => void;
  /** Callback when an icon is double-clicked (optional) */
  onIconDoubleClick?: (icon: IconDefinition) => void;
  /** Currently selected icon ID (optional) */
  selectedIconId?: string;
  /** Number of columns in the grid */
  columns?: number;
  /** Icon card size in pixels */
  iconSize?: number;
  /** Whether to show icon names */
  showNames?: boolean;
  /** Whether to show tooltips on hover */
  showTooltips?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Custom class name */
  className?: string;
}

export interface IconCardProps {
  icon: IconDefinition;
  onClick: () => void;
  onDoubleClick?: () => void;
  isSelected: boolean;
  size: number;
  showName: boolean;
  showTooltip: boolean;
}

// =============================================================================
// DOMAIN COLORS
// =============================================================================

const domainColors: Record<IconDomain, string> = {
  medicine: '#ef4444',
  biology: '#22c55e',
  chemistry: '#8b5cf6',
  physics: '#3b82f6',
  engineering: '#f59e0b',
  general: '#6b7280',
};

// =============================================================================
// ICON CARD COMPONENT
// =============================================================================

const IconCard: React.FC<IconCardProps> = ({
  icon,
  onClick,
  onDoubleClick,
  isSelected,
  size,
  showName,
  showTooltip,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onClick();
    },
    [onClick]
  );

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onDoubleClick?.();
    },
    [onDoubleClick]
  );

  const cardStyle: React.CSSProperties = useMemo(
    () => ({
      ...styles.card,
      width: size,
      minHeight: showName ? size + 24 : size,
      borderColor: isSelected
        ? domainColors[icon.domain]
        : isHovered
        ? 'var(--border-hover, #4b5563)'
        : 'var(--border-color, #374151)',
      background: isSelected
        ? `${domainColors[icon.domain]}15`
        : isHovered
        ? 'var(--bg-hover, rgba(255, 255, 255, 0.05))'
        : 'var(--bg-tertiary, #1f2937)',
    }),
    [size, showName, isSelected, isHovered, icon.domain]
  );

  const iconContainerStyle: React.CSSProperties = useMemo(
    () => ({
      ...styles.iconContainer,
      width: size - 16,
      height: size - 16,
    }),
    [size]
  );

  // Create tooltip content
  const tooltipContent = useMemo(() => {
    if (!showTooltip) return undefined;
    return `${icon.name}\n${icon.category} | ${icon.domain}\nTags: ${icon.tags.slice(0, 3).join(', ')}`;
  }, [showTooltip, icon]);

  return (
    <button
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={cardStyle}
      title={tooltipContent}
      aria-label={`Icon: ${icon.name}`}
      type="button"
    >
      <div
        style={iconContainerStyle}
        dangerouslySetInnerHTML={{ __html: icon.svg }}
      />
      {showName && (
        <span style={styles.iconName} title={icon.name}>
          {icon.name}
        </span>
      )}
      {isSelected && (
        <span
          style={{
            ...styles.domainIndicator,
            backgroundColor: domainColors[icon.domain],
          }}
        />
      )}
    </button>
  );
};

// =============================================================================
// LOADING SKELETON
// =============================================================================

const LoadingSkeleton: React.FC<{ count: number; size: number }> = ({
  count,
  size,
}) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        style={{
          ...styles.skeleton,
          width: size,
          height: size,
        }}
      >
        <div style={styles.skeletonPulse} />
      </div>
    ))}
  </>
);

// =============================================================================
// EMPTY STATE
// =============================================================================

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div style={styles.emptyState}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      style={styles.emptyIcon}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
      <path d="M8 11h6" />
    </svg>
    <p style={styles.emptyText}>{message}</p>
  </div>
);

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const IconGrid: React.FC<IconGridProps> = ({
  icons,
  onIconClick,
  onIconDoubleClick,
  selectedIconId,
  columns = 4,
  iconSize = 64,
  showNames = true,
  showTooltips = true,
  emptyMessage = 'No icons found',
  isLoading = false,
  className = '',
}) => {
  // Handle icon click
  const handleIconClick = useCallback(
    (icon: IconDefinition) => {
      onIconClick(icon);
    },
    [onIconClick]
  );

  // Handle icon double-click
  const handleIconDoubleClick = useCallback(
    (icon: IconDefinition) => {
      onIconDoubleClick?.(icon);
    },
    [onIconDoubleClick]
  );

  // Calculate grid template columns
  const gridStyle: React.CSSProperties = useMemo(
    () => ({
      ...styles.grid,
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
    }),
    [columns]
  );

  // Render loading state
  if (isLoading) {
    return (
      <div className={className} style={gridStyle}>
        <LoadingSkeleton count={columns * 3} size={iconSize} />
      </div>
    );
  }

  // Render empty state
  if (icons.length === 0) {
    return (
      <div className={className} style={styles.container}>
        <EmptyState message={emptyMessage} />
      </div>
    );
  }

  // Render icon grid
  return (
    <div className={className} style={gridStyle}>
      {icons.map((icon) => (
        <IconCard
          key={icon.id}
          icon={icon}
          onClick={() => handleIconClick(icon)}
          onDoubleClick={() => handleIconDoubleClick(icon)}
          isSelected={selectedIconId === icon.id}
          size={iconSize}
          showName={showNames}
          showTooltip={showTooltips}
        />
      ))}
    </div>
  );
};

// =============================================================================
// STYLES
// =============================================================================

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    display: 'grid',
    gap: '8px',
    padding: '8px',
    width: '100%',
    alignContent: 'start',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    padding: '8px',
    background: 'var(--bg-tertiary, #1f2937)',
    border: '1px solid var(--border-color, #374151)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-secondary, #d1d5db)',
  },
  iconName: {
    fontSize: '10px',
    color: 'var(--text-muted, #9ca3af)',
    textAlign: 'center',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    padding: '0 2px',
  },
  domainIndicator: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
  },
  skeleton: {
    background: 'var(--bg-tertiary, #1f2937)',
    border: '1px solid var(--border-color, #374151)',
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
  },
  skeletonPulse: {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
    animation: 'skeleton-pulse 1.5s infinite',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '32px',
    color: 'var(--text-muted, #9ca3af)',
  },
  emptyIcon: {
    width: '48px',
    height: '48px',
    opacity: 0.5,
  },
  emptyText: {
    margin: 0,
    fontSize: '14px',
    textAlign: 'center',
  },
};

// Add keyframes for skeleton animation
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes skeleton-pulse {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    .icon-card:hover .icon-container svg {
      color: var(--text-primary, #f3f4f6);
    }
    .icon-card:active {
      transform: scale(0.98);
    }
  `;
  document.head.appendChild(styleSheet);
}

export default IconGrid;
