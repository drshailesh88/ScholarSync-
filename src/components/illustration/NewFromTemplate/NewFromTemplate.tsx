/**
 * NewFromTemplate Component
 * Dialog for starting a new diagram from a template
 *
 * @module components/NewFromTemplate
 */

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  allTemplates,
  templatesByDomain,
  domainMetadata,
  DiagramTemplate,
  TemplateDomain,
  getAvailableDomains,
} from '@/lib/illustration/data/templates';

// ============================================================================
// Types
// ============================================================================

export interface NewFromTemplateProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Callback when dialog is closed */
  onClose: () => void;
  /** Callback when template is selected */
  onSelectTemplate: (template: DiagramTemplate) => void;
}

// ============================================================================
// Styles
// ============================================================================

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 'var(--z-modal, 1000)',
    animation: 'fadeIn 150ms ease-out',
  },
  dialog: {
    backgroundColor: 'var(--bg-secondary, #1e1e1e)',
    borderRadius: '12px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    width: '720px',
    maxWidth: '90vw',
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
    border: '1px solid var(--border-color, #333)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderBottom: '1px solid var(--border-color, #333)',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--text-primary, #ffffff)',
    margin: 0,
  },
  closeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    padding: 0,
    background: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    color: 'var(--text-secondary, #9d9d9d)',
    transition: 'all 150ms ease',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row' as const,
    overflow: 'hidden',
  },
  sidebar: {
    width: '200px',
    borderRight: '1px solid var(--border-color, #333)',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    padding: '12px',
    overflowY: 'auto' as const,
  },
  sidebarTitle: {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--text-muted, #666)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    padding: '8px 12px',
    marginBottom: '4px',
  },
  domainItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '10px 12px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    textAlign: 'left' as const,
    color: 'var(--text-secondary, #9d9d9d)',
    fontSize: '14px',
    marginBottom: '4px',
  },
  domainItemActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    color: 'var(--text-primary, #ffffff)',
  },
  domainIcon: {
    width: '24px',
    height: '24px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  domainInfo: {
    flex: 1,
    minWidth: 0,
  },
  domainName: {
    fontSize: '14px',
    fontWeight: 500,
  },
  domainCount: {
    fontSize: '11px',
    color: 'var(--text-muted, #666)',
  },
  main: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto' as const,
  },
  searchContainer: {
    marginBottom: '20px',
  },
  searchInput: {
    width: '100%',
    padding: '10px 12px 10px 40px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    color: 'var(--text-primary, #ffffff)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 150ms ease',
  },
  searchIconWrapper: {
    position: 'absolute' as const,
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-muted, #666)',
    pointerEvents: 'none' as const,
  },
  templateGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '12px',
  },
  templateCard: {
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '16px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '2px solid var(--border-color, #333)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    textAlign: 'left' as const,
  },
  templateCardSelected: {
    borderColor: 'var(--accent-primary, #3b82f6)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  templatePreview: {
    height: '80px',
    backgroundColor: 'var(--bg-secondary, #1e1e1e)',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px',
    color: 'var(--text-muted, #666)',
  },
  templateName: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-primary, #ffffff)',
    marginBottom: '4px',
  },
  templateDescription: {
    fontSize: '12px',
    color: 'var(--text-muted, #666)',
    lineHeight: 1.4,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderTop: '1px solid var(--border-color, #333)',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
  },
  selectedInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: 'var(--text-secondary, #9d9d9d)',
  },
  footerButtons: {
    display: 'flex',
    gap: '12px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 150ms ease',
    border: 'none',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    color: 'var(--text-secondary, #9d9d9d)',
    border: '1px solid var(--border-color, #333)',
  },
  createButton: {
    backgroundColor: 'var(--accent-primary, #3b82f6)',
    color: '#ffffff',
  },
  createButtonDisabled: {
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    color: 'var(--text-muted, #666)',
    cursor: 'not-allowed',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    color: 'var(--text-muted, #666)',
    textAlign: 'center' as const,
  },
};

// ============================================================================
// Domain Icons
// ============================================================================

const DomainIcons: Record<TemplateDomain, React.ReactNode> = {
  medicine: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  biology: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="12" rx="10" ry="8" />
      <circle cx="12" cy="12" r="4" />
      <ellipse cx="8" cy="9" rx="2" ry="1" />
    </svg>
  ),
  chemistry: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 3h6M10 3v7l-5 8.5a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3L14 10V3" />
    </svg>
  ),
  physics: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2a10 10 0 0 1 0 20" />
      <path d="M12 2a10 10 0 0 0 0 20" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
    </svg>
  ),
  engineering: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

// ============================================================================
// Template Preview Icons
// ============================================================================

const TemplatePreviewIcon = ({ template }: { template: DiagramTemplate }) => {
  // Simple placeholder icon based on template type
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      {template.id.includes('flow') || template.id.includes('consort') ? (
        <>
          <rect x="3" y="3" width="18" height="4" rx="1" />
          <rect x="3" y="10" width="8" height="4" rx="1" />
          <rect x="13" y="10" width="8" height="4" rx="1" />
          <rect x="3" y="17" width="8" height="4" rx="1" />
          <rect x="13" y="17" width="8" height="4" rx="1" />
        </>
      ) : template.id.includes('pathway') || template.id.includes('signal') ? (
        <>
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="6" r="2" />
          <circle cx="12" cy="18" r="2" />
          <circle cx="19" cy="12" r="2" />
          <path d="M7 12h3M15 12h2M12 8v2M12 14v2" />
        </>
      ) : template.id.includes('cell') ? (
        <>
          <ellipse cx="12" cy="12" rx="9" ry="7" />
          <circle cx="12" cy="12" r="3" />
          <ellipse cx="7" cy="10" rx="1.5" ry="1" />
          <ellipse cx="17" cy="14" rx="1.5" ry="1" />
        </>
      ) : template.id.includes('reaction') || template.id.includes('mechanism') ? (
        <>
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="12" r="3" />
          <path d="M9 12h6" />
          <path d="M13 10l2 2-2 2" />
        </>
      ) : template.id.includes('structure') || template.id.includes('molecule') ? (
        <>
          <polygon points="12,3 20,8 20,16 12,21 4,16 4,8" />
          <line x1="12" y1="3" x2="12" y2="21" />
        </>
      ) : template.id.includes('tree') || template.id.includes('phylo') ? (
        <>
          <path d="M4 4v16h16" />
          <path d="M4 12h4v-4h4v-4h4" />
          <path d="M8 12v4h4v4" />
        </>
      ) : template.id.includes('circuit') ? (
        <>
          <rect x="2" y="10" width="4" height="4" />
          <rect x="18" y="10" width="4" height="4" />
          <path d="M6 12h4M14 12h4" />
          <circle cx="12" cy="12" r="2" />
        </>
      ) : (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 9h6M9 12h6M9 15h4" />
        </>
      )}
    </svg>
  );
};

// ============================================================================
// Component
// ============================================================================

export function NewFromTemplate({
  isOpen,
  onClose,
  onSelectTemplate,
}: NewFromTemplateProps): JSX.Element | null {
  const [selectedDomain, setSelectedDomain] = useState<TemplateDomain | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<DiagramTemplate | null>(null);

  const domains = getAvailableDomains();

  // Reset state when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedTemplate(null);
      setSearchQuery('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const handleCreate = useCallback(() => {
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate);
      onClose();
    }
  }, [selectedTemplate, onSelectTemplate, onClose]);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    let templates = selectedDomain === 'all' ? allTemplates : templatesByDomain[selectedDomain];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      templates = templates.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query)
      );
    }

    return templates;
  }, [selectedDomain, searchQuery]);

  if (!isOpen) {
    return null;
  }

  return (
    <div style={styles.overlay} onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div style={styles.dialog}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>New from Template</h2>
          <button
            style={styles.closeButton}
            onClick={onClose}
            aria-label="Close dialog"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {/* Sidebar - Domain Selector */}
          <div style={styles.sidebar}>
            <div style={styles.sidebarTitle}>Categories</div>

            {/* All Templates Option */}
            <button
              style={{
                ...styles.domainItem,
                ...(selectedDomain === 'all' ? styles.domainItemActive : {}),
              }}
              onClick={() => setSelectedDomain('all')}
            >
              <div
                style={{
                  ...styles.domainIcon,
                  backgroundColor: 'rgba(156, 163, 175, 0.15)',
                  color: 'var(--text-secondary, #9d9d9d)',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                </svg>
              </div>
              <div style={styles.domainInfo}>
                <div style={styles.domainName}>All Templates</div>
                <div style={styles.domainCount}>{allTemplates.length} templates</div>
              </div>
            </button>

            {/* Domain Options */}
            {domains.map((domain) => {
              const meta = domainMetadata[domain];
              const count = templatesByDomain[domain].length;

              return (
                <button
                  key={domain}
                  style={{
                    ...styles.domainItem,
                    ...(selectedDomain === domain ? styles.domainItemActive : {}),
                  }}
                  onClick={() => setSelectedDomain(domain)}
                >
                  <div
                    style={{
                      ...styles.domainIcon,
                      backgroundColor: `${meta.color}20`,
                      color: meta.color,
                    }}
                  >
                    {DomainIcons[domain]}
                  </div>
                  <div style={styles.domainInfo}>
                    <div style={styles.domainName}>{meta.name}</div>
                    <div style={styles.domainCount}>{count} templates</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main - Template Grid */}
          <div style={styles.main}>
            {/* Search */}
            <div style={{ ...styles.searchContainer, position: 'relative' as const }}>
              <span style={styles.searchIconWrapper}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
                placeholder="Search templates..."
              />
            </div>

            {/* Template Grid */}
            {filteredTemplates.length > 0 ? (
              <div style={styles.templateGrid}>
                {filteredTemplates.map((template) => (
                  <button
                    key={template.id}
                    style={{
                      ...styles.templateCard,
                      ...(selectedTemplate?.id === template.id
                        ? styles.templateCardSelected
                        : {}),
                    }}
                    onClick={() => setSelectedTemplate(template)}
                    onDoubleClick={() => {
                      setSelectedTemplate(template);
                      handleCreate();
                    }}
                  >
                    <div style={styles.templatePreview}>
                      <TemplatePreviewIcon template={template} />
                    </div>
                    <div style={styles.templateName}>{template.name}</div>
                    <div style={styles.templateDescription}>{template.description}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div style={styles.emptyState}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  style={{ marginBottom: '16px', opacity: 0.5 }}
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <p style={{ margin: 0, fontSize: '14px' }}>No templates found</p>
                <p style={{ margin: '8px 0 0', fontSize: '12px' }}>
                  Try a different search term or category
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <div style={styles.selectedInfo}>
            {selectedTemplate ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--accent-primary, #3b82f6)"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>
                  Selected: <strong>{selectedTemplate.name}</strong>
                </span>
              </>
            ) : (
              <span>Select a template to continue</span>
            )}
          </div>
          <div style={styles.footerButtons}>
            <button
              style={{ ...styles.button, ...styles.cancelButton }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              style={{
                ...styles.button,
                ...(selectedTemplate ? styles.createButton : styles.createButtonDisabled),
              }}
              onClick={handleCreate}
              disabled={!selectedTemplate}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg
                  width="16"
                  height="16"
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
                Create
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewFromTemplate;
