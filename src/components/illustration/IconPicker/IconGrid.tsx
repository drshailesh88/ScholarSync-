/**
 * IconGrid Component
 *
 * Virtualized grid display of icons for performance with large icon sets.
 * Shows icon name on hover with visual feedback on selection.
 */

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import type { UnifiedIconResult } from '@/lib/illustration/lib/icons';
import { createSimpleIconSvg } from '@/lib/illustration/lib/icons';

// =============================================================================
// TYPES
// =============================================================================

export interface IconGridProps {
  /** Array of icons to display */
  icons: UnifiedIconResult[];
  /** Callback when an icon is clicked */
  onIconClick: (icon: UnifiedIconResult) => void;
  /** Callback when an icon is hovered */
  onIconHover?: (icon: UnifiedIconResult | null) => void;
  /** Currently selected icon ID (optional) */
  selectedIconId?: string;
  /** Number of columns in the grid */
  columns?: number;
  /** Icon card size in pixels */
  iconSize?: number;
  /** Whether to show icon names */
  showNames?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Empty state action button */
  emptyAction?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
  /** Error message to display */
  error?: string | null;
  /** Loading state */
  isLoading?: boolean;
  /** Max items to render for virtualization */
  maxVisibleItems?: number;
  /** Custom class name */
  className?: string;
}

export interface IconCardProps {
  icon: UnifiedIconResult;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isSelected: boolean;
  size: number;
  showName: boolean;
}

// =============================================================================
// LIBRARY COLORS
// =============================================================================

const libraryColors: Record<string, string> = {
  tabler: '#3b82f6',
  health: '#ef4444',
  science: '#22c55e',
  iconpark: '#8b5cf6',
  simple: '#f59e0b',
};

// =============================================================================
// ICON CARD COMPONENT
// =============================================================================

const IconCard: React.FC<IconCardProps> = React.memo(({
  icon,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isSelected,
  size,
  showName,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const libraryColor = libraryColors[icon.library] || '#6b7280';

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    onMouseEnter();
  }, [onMouseEnter]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    onMouseLeave();
  }, [onMouseLeave]);

  const IconComponent = icon.component;

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`icon-grid-card ${isSelected ? 'selected' : ''} ${isHovered ? 'hovered' : ''}`}
      style={{
        width: size,
        minHeight: showName ? size + 24 : size,
        '--library-color': libraryColor,
      } as React.CSSProperties}
      title={`${icon.name} (${icon.library})`}
      aria-label={`Icon: ${icon.name}`}
      type="button"
    >
      <div
        className="icon-grid-card-icon"
        style={{ width: size - 16, height: size - 16 }}
      >
        {IconComponent ? (
          <IconComponent size={size - 24} />
        ) : icon.library === 'simple' && icon.slug ? (
          <div
            dangerouslySetInnerHTML={{
              __html: createSimpleIconSvg(icon.slug, size - 24, 'currentColor') || '',
            }}
          />
        ) : null}
      </div>

      {showName && (
        <span className="icon-grid-card-name" title={icon.name}>
          {icon.name}
        </span>
      )}

      {isSelected && (
        <span
          className="icon-grid-card-indicator"
          style={{ backgroundColor: libraryColor }}
        />
      )}
    </button>
  );
});

IconCard.displayName = 'IconCard';

// =============================================================================
// LOADING SKELETON
// =============================================================================

const LoadingSkeleton: React.FC<{ count: number; size: number }> = ({ count, size }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="icon-grid-skeleton"
        style={{ width: size, height: size }}
      >
        <div className="icon-grid-skeleton-pulse" />
      </div>
    ))}
  </>
);

// =============================================================================
// EMPTY STATE
// =============================================================================

interface EmptyStateProps {
  message: string;
  action?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
  error?: string | null;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, action, error }) => (
  <div className="icon-grid-empty">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="icon-grid-empty-icon"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
      <path d="M8 11h6" />
    </svg>
    <p className="icon-grid-empty-text">{message}</p>
    {action && (
      <button
        onClick={action.onClick}
        disabled={action.disabled}
        className="icon-grid-empty-action"
      >
        {action.disabled ? (
          <>
            <svg
              className="icon-grid-empty-spinner"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" opacity="0.25" />
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
            {action.label}
          </>
        ) : (
          <>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="icon-grid-empty-action-icon"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            {action.label}
          </>
        )}
      </button>
    )}
    {error && (
      <p className="icon-grid-empty-error">{error}</p>
    )}
  </div>
);

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const IconGrid: React.FC<IconGridProps> = ({
  icons,
  onIconClick,
  onIconHover,
  selectedIconId,
  columns = 6,
  iconSize = 72,
  showNames = true,
  emptyMessage,
  emptyAction,
  error,
  isLoading = false,
  maxVisibleItems = 200,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: maxVisibleItems });

  // Simple virtualization: only render visible items
  const visibleIcons = useMemo(() => {
    return icons.slice(visibleRange.start, visibleRange.end);
  }, [icons, visibleRange]);

  // Handle scroll for virtualization
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, clientHeight } = container;
      const rowHeight = showNames ? iconSize + 32 : iconSize + 8;
      const startRow = Math.floor(scrollTop / rowHeight);
      const visibleRows = Math.ceil(clientHeight / rowHeight) + 2;
      const start = Math.max(0, startRow * columns - columns);
      const end = Math.min(icons.length, (startRow + visibleRows) * columns + columns);

      setVisibleRange({ start, end });
    };

    container.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, [icons.length, columns, iconSize, showNames]);

  // Handle icon click
  const handleIconClick = useCallback(
    (icon: UnifiedIconResult) => {
      onIconClick(icon);
    },
    [onIconClick]
  );

  // Handle icon hover
  const handleIconHover = useCallback(
    (icon: UnifiedIconResult | null) => {
      onIconHover?.(icon);
    },
    [onIconHover]
  );

  // Render loading state
  if (isLoading) {
    return (
      <div
        className={`icon-grid ${className}`}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        <LoadingSkeleton count={columns * 3} size={iconSize} />
      </div>
    );
  }

  // Render empty state
  if (icons.length === 0) {
    return (
      <div className={`icon-grid-container ${className}`}>
        <EmptyState message={emptyMessage || 'No icons found'} action={emptyAction} error={error} />
      </div>
    );
  }

  // Calculate spacer heights for virtualization
  const rowHeight = showNames ? iconSize + 32 : iconSize + 8;
  const spacerTopHeight = Math.floor(visibleRange.start / columns) * rowHeight;
  const spacerBottomRows = Math.ceil((icons.length - visibleRange.end) / columns);
  const spacerBottomHeight = Math.max(0, spacerBottomRows * rowHeight);

  return (
    <div
      ref={containerRef}
      className={`icon-grid-container ${className}`}
    >
      {/* Top spacer for virtualization */}
      {spacerTopHeight > 0 && (
        <div style={{ height: spacerTopHeight, gridColumn: '1 / -1' }} />
      )}

      <div
        className="icon-grid"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {visibleIcons.map((icon) => (
          <IconCard
            key={icon.id}
            icon={icon}
            onClick={() => handleIconClick(icon)}
            onMouseEnter={() => handleIconHover(icon)}
            onMouseLeave={() => handleIconHover(null)}
            isSelected={selectedIconId === icon.id}
            size={iconSize}
            showName={showNames}
          />
        ))}
      </div>

      {/* Bottom spacer for virtualization */}
      {spacerBottomHeight > 0 && (
        <div style={{ height: spacerBottomHeight, gridColumn: '1 / -1' }} />
      )}

      {/* Show total count if truncated */}
      {icons.length > maxVisibleItems && visibleRange.end < icons.length && (
        <div className="icon-grid-more">
          Showing {visibleRange.end} of {icons.length} icons. Scroll to load more.
        </div>
      )}
    </div>
  );
};

export default IconGrid;
