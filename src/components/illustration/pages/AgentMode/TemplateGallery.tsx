/**
 * TemplateGallery Component
 *
 * Collapsible sidebar with:
 * - Domain tabs (Medicine, Biology, Chemistry, etc.)
 * - Template cards with preview thumbnails
 * - Click to insert template prompt
 * - Search/filter templates
 */

import React, { useState, useMemo } from 'react';
import {
  useAgentStore,
  TEMPLATES,
  CATEGORY_LABELS,
  TemplateCategory,
  Template
} from '../../stores/useAgentStore';

// Template Icons
const TemplateIcons: Record<string, React.FC> = {
  consort: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="4" rx="1" />
      <rect x="3" y="10" width="8" height="4" rx="1" />
      <rect x="13" y="10" width="8" height="4" rx="1" />
      <rect x="3" y="17" width="8" height="4" rx="1" />
      <rect x="13" y="17" width="8" height="4" rx="1" />
    </svg>
  ),
  prisma: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12,2 20,8 20,16 12,22 4,16 4,8" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="4" y1="8" x2="20" y2="8" />
      <line x1="4" y1="16" x2="20" y2="16" />
    </svg>
  ),
  forest: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="3" x2="12" y2="21" />
      <rect x="4" y="5" width="6" height="2" />
      <rect x="14" y="8" width="4" height="2" />
      <rect x="6" y="11" width="8" height="2" />
      <rect x="10" y="14" width="6" height="2" />
      <rect x="8" y="17" width="5" height="2" />
    </svg>
  ),
  pathway: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="4" cy="12" r="2" />
      <circle cx="12" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <circle cx="20" cy="12" r="2" />
      <path d="M6 12h4M14 6l4 4M14 18l4-4" />
    </svg>
  ),
  cell: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="12" rx="10" ry="8" />
      <circle cx="12" cy="12" r="4" />
      <ellipse cx="7" cy="9" rx="2" ry="1" />
      <ellipse cx="17" cy="15" rx="2" ry="1" />
    </svg>
  ),
  phylogeny: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4v16h16" />
      <path d="M4 12h4v-4h4v-4h4" />
      <path d="M8 12v4h4v4" />
    </svg>
  ),
  reaction: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="12" r="3" />
      <path d="M9 12h2m2 0h2" />
      <path d="M11 10l2 2-2 2" />
    </svg>
  ),
  structure: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12,3 20,8 20,16 12,21 4,16 4,8" />
      <line x1="12" y1="3" x2="12" y2="21" />
    </svg>
  ),
  flowchart: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <rect x="8" y="10" width="8" height="4" rx="1" />
      <rect x="8" y="18" width="8" height="4" rx="1" />
      <line x1="12" y1="6" x2="12" y2="10" />
      <line x1="12" y1="14" x2="12" y2="18" />
    </svg>
  ),
  table: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </svg>
  ),
  timeline: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="12" x2="21" y2="12" />
      <circle cx="6" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="18" cy="12" r="2" />
      <line x1="6" y1="10" x2="6" y2="6" />
      <line x1="12" y1="14" x2="12" y2="18" />
      <line x1="18" y1="10" x2="18" y2="6" />
    </svg>
  ),
  venn: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="10" r="6" />
      <circle cx="15" cy="10" r="6" />
      <circle cx="12" cy="16" r="6" />
    </svg>
  )
};

// Search icon
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

// Collapse icon
const CollapseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ExpandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

interface TemplateCardProps {
  template: Template;
  onClick: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onClick }) => {
  const IconComponent = TemplateIcons[template.icon] || TemplateIcons.flowchart;

  return (
    <button
      onClick={onClick}
      style={styles.card}
      title={template.description}
    >
      <div style={styles.cardIcon}>
        <IconComponent />
      </div>
      <span style={styles.cardName}>{template.name}</span>
    </button>
  );
};

interface TemplateGalleryProps {
  onSelectTemplate: (prompt: string) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  onSelectTemplate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const selectedCategory = useAgentStore((state) => state.selectedCategory);
  const setSelectedCategory = useAgentStore((state) => state.setSelectedCategory);
  const isSidebarCollapsed = useAgentStore((state) => state.isSidebarCollapsed);
  const toggleSidebar = useAgentStore((state) => state.toggleSidebar);

  const categories: TemplateCategory[] = ['medicine', 'biology', 'chemistry', 'general'];

  // Filter templates by category and search
  const filteredTemplates = useMemo(() => {
    let templates = TEMPLATES.filter((t) => t.category === selectedCategory);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      templates = TEMPLATES.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query)
      );
    }

    return templates;
  }, [selectedCategory, searchQuery]);

  const handleTemplateClick = (template: Template) => {
    onSelectTemplate(template.prompt);
  };

  if (isSidebarCollapsed) {
    return (
      <div style={styles.collapsed}>
        <button
          onClick={toggleSidebar}
          style={styles.expandBtn}
          title="Expand sidebar"
        >
          <ExpandIcon />
        </button>
      </div>
    );
  }

  return (
    <aside style={styles.sidebar}>
      <div style={styles.header}>
        <h3 style={styles.title}>Templates</h3>
        <button
          onClick={toggleSidebar}
          style={styles.collapseBtn}
          title="Collapse sidebar"
        >
          <CollapseIcon />
        </button>
      </div>

      {/* Search */}
      <div style={styles.searchWrapper}>
        <span style={styles.searchIcon}><SearchIcon /></span>
        <input
          type="text"
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Category Tabs */}
      {!searchQuery && (
        <div style={styles.tabs}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                ...styles.tab,
                ...(selectedCategory === category ? styles.tabActive : {})
              }}
            >
              {CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>
      )}

      {/* Template Grid */}
      <div style={styles.grid}>
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onClick={() => handleTemplateClick(template)}
            />
          ))
        ) : (
          <div style={styles.empty}>
            <p>No templates found</p>
          </div>
        )}
      </div>

      {/* Help text */}
      <div style={styles.helpText}>
        Click a template to populate the prompt
      </div>
    </aside>
  );
};

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    width: 'var(--sidebar-width)',
    background: 'var(--bg-secondary)',
    borderRight: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  collapsed: {
    width: '48px',
    background: 'var(--bg-secondary)',
    borderRight: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 'var(--spacing-md)'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--spacing-md)',
    borderBottom: '1px solid var(--border-color)'
  },
  title: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 500,
    color: 'var(--text-primary)',
    margin: 0
  },
  collapseBtn: {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'all var(--transition-fast)'
  },
  expandBtn: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    borderRadius: '6px',
    transition: 'all var(--transition-fast)'
  },
  searchWrapper: {
    position: 'relative',
    padding: 'var(--spacing-sm) var(--spacing-md)'
  },
  searchIcon: {
    position: 'absolute',
    left: 'calc(var(--spacing-md) + 8px)',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '16px',
    height: '16px',
    color: 'var(--text-muted)',
    pointerEvents: 'none'
  },
  searchInput: {
    width: '100%',
    padding: 'var(--spacing-xs) var(--spacing-sm) var(--spacing-xs) 32px',
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    color: 'var(--text-primary)',
    fontSize: 'var(--font-size-sm)',
    outline: 'none',
    transition: 'border-color var(--transition-fast)'
  },
  tabs: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
    padding: '0 var(--spacing-md)',
    marginBottom: 'var(--spacing-sm)'
  },
  tab: {
    padding: '4px 8px',
    background: 'transparent',
    border: '1px solid var(--border-color)',
    borderRadius: '4px',
    color: 'var(--text-secondary)',
    fontSize: 'var(--font-size-xs)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)'
  },
  tabActive: {
    background: 'var(--accent-primary)',
    borderColor: 'var(--accent-primary)',
    color: 'white'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 'var(--spacing-sm)',
    padding: 'var(--spacing-md)',
    overflowY: 'auto',
    flex: 1
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
    padding: 'var(--spacing-md)',
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    textAlign: 'center'
  },
  cardIcon: {
    width: '32px',
    height: '32px',
    color: 'var(--text-accent)'
  },
  cardName: {
    fontSize: 'var(--font-size-xs)',
    color: 'var(--text-secondary)'
  },
  empty: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: 'var(--spacing-lg)',
    color: 'var(--text-muted)'
  },
  helpText: {
    padding: 'var(--spacing-sm) var(--spacing-md)',
    fontSize: 'var(--font-size-xs)',
    color: 'var(--text-muted)',
    textAlign: 'center',
    borderTop: '1px solid var(--border-color)'
  }
};

// Add hover styles
const hoverStyleSheet = document.createElement('style');
hoverStyleSheet.textContent = `
  .template-card:hover {
    border-color: var(--accent-primary);
    background: var(--bg-hover);
  }
  .template-tab:hover {
    color: var(--text-primary);
  }
  .collapse-btn:hover, .expand-btn:hover {
    color: var(--text-primary);
    background: var(--bg-hover);
  }
  .search-input:focus {
    border-color: var(--accent-primary);
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(hoverStyleSheet);
}

export default TemplateGallery;
