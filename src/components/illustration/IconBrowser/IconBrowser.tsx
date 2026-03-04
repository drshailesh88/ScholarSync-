/**
 * IconBrowser Component
 *
 * Main panel component to browse scientific icons organized by domain.
 * Features domain tabs, grid display, search functionality, and click-to-insert.
 */

import React, { useState, useCallback, useMemo } from 'react';
import { IconSearch } from './IconSearch';
import { IconGrid } from './IconGrid';
import {
  type IconDefinition,
  type IconDomain,
  searchIcons,
  getIconsByDomain,
  getAvailableDomains,
  domainMetadata,
} from '../../data/icons';

// =============================================================================
// TYPES
// =============================================================================

export interface IconBrowserProps {
  /** Callback when an icon is selected for insertion */
  onInsertIcon: (icon: IconDefinition) => void;
  /** Initial domain to display */
  initialDomain?: IconDomain;
  /** Whether the browser is collapsed */
  isCollapsed?: boolean;
  /** Callback when collapse state changes */
  onToggleCollapse?: () => void;
  /** Custom width for the panel */
  width?: number | string;
  /** Custom class name */
  className?: string;
}

// =============================================================================
// ICONS
// =============================================================================

const CollapseIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ExpandIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const InsertIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// =============================================================================
// DOMAIN TABS COMPONENT
// =============================================================================

interface DomainTabsProps {
  domains: Array<{ id: IconDomain; name: string; color: string; iconCount: number }>;
  selectedDomain: IconDomain;
  onSelectDomain: (domain: IconDomain) => void;
}

const DomainTabs: React.FC<DomainTabsProps> = ({
  domains,
  selectedDomain,
  onSelectDomain,
}) => {
  return (
    <div style={styles.tabs}>
      {domains.map((domain) => (
        <button
          key={domain.id}
          onClick={() => onSelectDomain(domain.id)}
          style={{
            ...styles.tab,
            ...(selectedDomain === domain.id ? styles.tabActive : {}),
            ...(selectedDomain === domain.id
              ? {
                  borderBottomColor: domain.color,
                  color: domain.color,
                }
              : {}),
          }}
          title={`${domain.name} (${domain.iconCount} icons)`}
        >
          {domain.name}
        </button>
      ))}
    </div>
  );
};

// =============================================================================
// PREVIEW PANEL COMPONENT
// =============================================================================

interface IconPreviewProps {
  icon: IconDefinition | null;
  onInsert: () => void;
}

const IconPreview: React.FC<IconPreviewProps> = ({ icon, onInsert }) => {
  if (!icon) {
    return (
      <div style={styles.previewEmpty}>
        <p style={styles.previewEmptyText}>Select an icon to preview</p>
      </div>
    );
  }

  const domainColor = domainMetadata[icon.domain]?.color || '#6b7280';

  return (
    <div style={styles.preview}>
      <div style={styles.previewHeader}>
        <h4 style={styles.previewTitle}>{icon.name}</h4>
        <span
          style={{
            ...styles.previewDomain,
            backgroundColor: `${domainColor}20`,
            color: domainColor,
          }}
        >
          {icon.domain}
        </span>
      </div>

      <div
        style={styles.previewIcon}
        dangerouslySetInnerHTML={{ __html: icon.svg }}
      />

      <div style={styles.previewMeta}>
        <span style={styles.previewCategory}>{icon.category}</span>
        <div style={styles.previewTags}>
          {icon.tags.slice(0, 4).map((tag) => (
            <span key={tag} style={styles.previewTag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <button onClick={onInsert} style={styles.insertButton} type="button">
        <span style={styles.insertIcon}>
          <InsertIcon />
        </span>
        Insert on Canvas
      </button>
    </div>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export const IconBrowser: React.FC<IconBrowserProps> = ({
  onInsertIcon,
  initialDomain = 'medicine',
  isCollapsed = false,
  onToggleCollapse,
  width = 320,
  className = '',
}) => {
  // State
  const [selectedDomain, setSelectedDomain] = useState<IconDomain>(initialDomain);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<IconDefinition | null>(null);

  // Get available domains with metadata
  const domains = useMemo(() => getAvailableDomains(), []);

  // Get icons based on search and domain
  const displayedIcons = useMemo(() => {
    if (searchQuery.trim()) {
      // Search across all domains when there's a query
      return searchIcons(searchQuery, { limit: 50 });
    }
    // Otherwise show icons from selected domain
    return getIconsByDomain(selectedDomain);
  }, [searchQuery, selectedDomain]);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    // Clear selection when searching
    if (query.trim()) {
      setSelectedIcon(null);
    }
  }, []);

  // Handle domain change
  const handleDomainChange = useCallback((domain: IconDomain) => {
    setSelectedDomain(domain);
    setSearchQuery('');
    setSelectedIcon(null);
  }, []);

  // Handle icon click (select)
  const handleIconClick = useCallback((icon: IconDefinition) => {
    setSelectedIcon(icon);
  }, []);

  // Handle icon double-click (insert)
  const handleIconDoubleClick = useCallback(
    (icon: IconDefinition) => {
      onInsertIcon(icon);
    },
    [onInsertIcon]
  );

  // Handle insert button click
  const handleInsert = useCallback(() => {
    if (selectedIcon) {
      onInsertIcon(selectedIcon);
    }
  }, [selectedIcon, onInsertIcon]);

  // Collapsed state
  if (isCollapsed) {
    return (
      <div className={className} style={styles.collapsed}>
        <button
          onClick={onToggleCollapse}
          style={styles.expandButton}
          title="Expand Icon Browser"
        >
          <ExpandIcon />
        </button>
        <span style={styles.collapsedLabel}>Icons</span>
      </div>
    );
  }

  return (
    <aside
      className={className}
      style={{
        ...styles.container,
        width: typeof width === 'number' ? `${width}px` : width,
      }}
    >
      {/* Header */}
      <div style={styles.header}>
        <h3 style={styles.title}>Icon Library</h3>
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            style={styles.collapseButton}
            title="Collapse"
          >
            <CollapseIcon />
          </button>
        )}
      </div>

      {/* Search */}
      <div style={styles.searchContainer}>
        <IconSearch
          onSearch={handleSearch}
          placeholder="Search icons..."
          debounceMs={250}
        />
      </div>

      {/* Domain Tabs (hidden when searching) */}
      {!searchQuery && (
        <DomainTabs
          domains={domains}
          selectedDomain={selectedDomain}
          onSelectDomain={handleDomainChange}
        />
      )}

      {/* Search Results Info */}
      {searchQuery && (
        <div style={styles.searchInfo}>
          <span style={styles.searchCount}>
            {displayedIcons.length} result{displayedIcons.length !== 1 ? 's' : ''} for "{searchQuery}"
          </span>
        </div>
      )}

      {/* Icon Grid */}
      <div style={styles.gridContainer}>
        <IconGrid
          icons={displayedIcons}
          onIconClick={handleIconClick}
          onIconDoubleClick={handleIconDoubleClick}
          selectedIconId={selectedIcon?.id}
          columns={3}
          iconSize={72}
          showNames={true}
          showTooltips={true}
          emptyMessage={
            searchQuery
              ? `No icons matching "${searchQuery}"`
              : 'No icons in this category'
          }
        />
      </div>

      {/* Preview Panel */}
      <div style={styles.previewContainer}>
        <IconPreview icon={selectedIcon} onInsert={handleInsert} />
      </div>

      {/* Help Text */}
      <div style={styles.helpText}>
        Click to select, double-click to insert
      </div>
    </aside>
  );
};

// =============================================================================
// STYLES
// =============================================================================

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--bg-secondary, #111827)',
    borderRight: '1px solid var(--border-color, #374151)',
    height: '100%',
    overflow: 'hidden',
  },
  collapsed: {
    width: '48px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '12px 0',
    gap: '8px',
    background: 'var(--bg-secondary, #111827)',
    borderRight: '1px solid var(--border-color, #374151)',
  },
  collapsedLabel: {
    writingMode: 'vertical-rl',
    textOrientation: 'mixed',
    fontSize: '12px',
    color: 'var(--text-muted, #9ca3af)',
    letterSpacing: '1px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    borderBottom: '1px solid var(--border-color, #374151)',
  },
  title: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary, #f3f4f6)',
  },
  collapseButton: {
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    borderRadius: '6px',
    color: 'var(--text-muted, #9ca3af)',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  expandButton: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg-tertiary, #1f2937)',
    border: '1px solid var(--border-color, #374151)',
    borderRadius: '6px',
    color: 'var(--text-secondary, #d1d5db)',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  searchContainer: {
    padding: '12px 16px',
  },
  tabs: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
    padding: '0 16px 12px',
    borderBottom: '1px solid var(--border-color, #374151)',
  },
  tab: {
    padding: '6px 10px',
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-secondary, #d1d5db)',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    borderRadius: '4px 4px 0 0',
  },
  tabActive: {
    background: 'var(--bg-tertiary, #1f2937)',
  },
  searchInfo: {
    padding: '8px 16px',
    borderBottom: '1px solid var(--border-color, #374151)',
  },
  searchCount: {
    fontSize: '12px',
    color: 'var(--text-muted, #9ca3af)',
  },
  gridContainer: {
    flex: 1,
    overflow: 'auto',
    minHeight: 0,
  },
  previewContainer: {
    borderTop: '1px solid var(--border-color, #374151)',
    minHeight: '160px',
  },
  preview: {
    padding: '12px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  previewEmpty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    minHeight: '120px',
  },
  previewEmptyText: {
    margin: 0,
    fontSize: '13px',
    color: 'var(--text-muted, #9ca3af)',
  },
  previewHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
  },
  previewTitle: {
    margin: 0,
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text-primary, #f3f4f6)',
  },
  previewDomain: {
    fontSize: '10px',
    fontWeight: 500,
    padding: '2px 6px',
    borderRadius: '4px',
    textTransform: 'uppercase',
  },
  previewIcon: {
    width: '48px',
    height: '48px',
    margin: '0 auto',
    color: 'var(--text-secondary, #d1d5db)',
  },
  previewMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  previewCategory: {
    fontSize: '11px',
    color: 'var(--text-muted, #9ca3af)',
    textTransform: 'capitalize',
  },
  previewTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
  },
  previewTag: {
    fontSize: '10px',
    color: 'var(--text-muted, #9ca3af)',
    background: 'var(--bg-tertiary, #1f2937)',
    padding: '2px 6px',
    borderRadius: '4px',
  },
  insertButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 16px',
    background: 'var(--accent-primary, #3b82f6)',
    border: 'none',
    borderRadius: '6px',
    color: 'white',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
  },
  insertIcon: {
    width: '16px',
    height: '16px',
  },
  helpText: {
    padding: '8px 16px',
    fontSize: '11px',
    color: 'var(--text-muted, #9ca3af)',
    textAlign: 'center',
    borderTop: '1px solid var(--border-color, #374151)',
  },
};

// Add hover styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    .icon-browser-collapse:hover,
    .icon-browser-expand:hover {
      color: var(--text-primary, #f3f4f6);
      background: var(--bg-hover, rgba(255, 255, 255, 0.1));
    }
    .icon-browser-tab:hover {
      color: var(--text-primary, #f3f4f6);
    }
    .icon-browser-insert:hover {
      background: var(--accent-hover, #2563eb);
    }
    .icon-browser-insert:active {
      transform: scale(0.98);
    }
  `;
  document.head.appendChild(styleSheet);
}

export default IconBrowser;
