"use client";
/**
 * Welcome Page
 * Landing page with navigation to AI Agent mode and Editor mode
 *
 * @module pages/Welcome
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// ============================================================================
// Types
// ============================================================================

interface RecentDiagram {
  id: string;
  name: string;
  thumbnail?: string;
  updatedAt: number;
}

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: 'flowchart' | 'diagram' | 'scientific' | 'annotation';
}

// ============================================================================
// Styles
// ============================================================================

// Focus outline style for accessibility
const focusOutlineStyle = '2px solid var(--accent-primary)';
const focusOutlineOffset = '2px';

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--bg-primary)',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 32px',
    borderBottom: '1px solid var(--border-primary)',
    backgroundColor: 'var(--bg-secondary)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    backgroundColor: 'var(--accent-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    letterSpacing: '0.5px',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '48px 32px',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  },
  hero: {
    textAlign: 'center' as const,
    marginBottom: '48px',
  },
  title: {
    fontSize: '40px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '16px',
    background: 'linear-gradient(135deg, var(--text-primary), var(--accent-primary))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  tagline: {
    fontSize: '18px',
    color: 'var(--text-secondary)',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: 1.6,
  },
  actions: {
    display: 'flex',
    gap: '24px',
    marginBottom: '64px',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
  },
  actionCard: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '16px',
    padding: '32px 48px',
    backgroundColor: 'var(--bg-secondary)',
    border: '2px solid var(--border-primary)',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 200ms ease',
    textDecoration: 'none',
    minWidth: '280px',
  },
  actionCardHover: {
    borderColor: 'var(--accent-primary)',
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 120, 212, 0.2)',
  },
  actionIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIconAI: {
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    color: 'var(--color-success)',
  },
  actionIconEditor: {
    backgroundColor: 'rgba(33, 150, 243, 0.15)',
    color: 'var(--color-info)',
  },
  actionTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  actionDescription: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    textAlign: 'center' as const,
    maxWidth: '200px',
  },
  section: {
    width: '100%',
    marginBottom: '48px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  sectionLink: {
    fontSize: '14px',
    color: 'var(--text-accent)',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  recentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
  },
  recentCard: {
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-primary)',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  recentCardHover: {
    borderColor: 'var(--accent-primary)',
  },
  recentThumbnail: {
    height: '120px',
    backgroundColor: 'var(--bg-tertiary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-muted)',
  },
  recentInfo: {
    padding: '12px',
  },
  recentName: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-primary)',
    marginBottom: '4px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  recentDate: {
    fontSize: '12px',
    color: 'var(--text-muted)',
  },
  templateGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '16px',
  },
  templateCard: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '12px',
    padding: '24px 16px',
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-primary)',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  templateCardHover: {
    borderColor: 'var(--accent-primary)',
    backgroundColor: 'var(--bg-tertiary)',
  },
  templateIcon: {
    width: '48px',
    height: '48px',
    color: 'var(--text-accent)',
  },
  templateName: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-primary)',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px',
    color: 'var(--text-muted)',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '12px',
    border: '1px dashed var(--border-primary)',
  },
  emptyIcon: {
    marginBottom: '16px',
    opacity: 0.5,
  },
  emptyText: {
    fontSize: '14px',
  },
};

// ============================================================================
// Icons
// ============================================================================

const SparklesIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
  </svg>
);

const PenToolIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);

const FlowchartIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="6" height="6" rx="1" />
    <rect x="15" y="3" width="6" height="6" rx="1" />
    <rect x="9" y="15" width="6" height="6" rx="1" />
    <path d="M6 9v3a1 1 0 0 0 1 1h4" />
    <path d="M18 9v3a1 1 0 0 1-1 1h-4" />
    <path d="M12 13v2" />
  </svg>
);

const SequenceIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="4" x2="6" y2="20" />
    <line x1="18" y1="4" x2="18" y2="20" />
    <polyline points="6,8 18,8" />
    <polyline points="18,12 6,12" />
    <polyline points="6,16 18,16" />
  </svg>
);

const MoleculeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <circle cx="19" cy="5" r="2" />
    <circle cx="5" cy="5" r="2" />
    <circle cx="5" cy="19" r="2" />
    <circle cx="19" cy="19" r="2" />
    <line x1="14.5" y1="9.5" x2="17.5" y2="6.5" />
    <line x1="9.5" y1="9.5" x2="6.5" y2="6.5" />
    <line x1="6.5" y1="17.5" x2="9.5" y2="14.5" />
    <line x1="17.5" y1="17.5" x2="14.5" y2="14.5" />
  </svg>
);

const AnnotationIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <line x1="9" y1="9" x2="15" y2="9" />
    <line x1="9" y1="13" x2="13" y2="13" />
  </svg>
);

const FileIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="13,2 13,9 20,9" />
  </svg>
);

// ============================================================================
// Templates Data
// ============================================================================

const templates: Template[] = [
  {
    id: 'flowchart',
    name: 'Flowchart',
    description: 'Process and workflow diagrams',
    icon: <FlowchartIcon />,
    category: 'flowchart',
  },
  {
    id: 'sequence',
    name: 'Sequence',
    description: 'Interaction diagrams',
    icon: <SequenceIcon />,
    category: 'diagram',
  },
  {
    id: 'scientific',
    name: 'Scientific',
    description: 'Lab and research diagrams',
    icon: <MoleculeIcon />,
    category: 'scientific',
  },
  {
    id: 'annotation',
    name: 'Annotation',
    description: 'Image labels and callouts',
    icon: <AnnotationIcon />,
    category: 'annotation',
  },
];

// ============================================================================
// Component
// ============================================================================

// Keyboard handler for accessible interactive elements
const handleKeyboardActivation = (
  event: React.KeyboardEvent,
  callback: () => void
) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    callback();
  }
};

export function Welcome(): JSX.Element {
  const router = useRouter();
  const [recentDiagrams, setRecentDiagrams] = useState<RecentDiagram[]>([]);
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);
  const [hoveredRecent, setHoveredRecent] = useState<string | null>(null);
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  const [focusedRecent, setFocusedRecent] = useState<string | null>(null);
  const [focusedTemplate, setFocusedTemplate] = useState<string | null>(null);

  // Load recent diagrams from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('finnish-recent-diagrams');
      if (stored) {
        const parsed = JSON.parse(stored) as RecentDiagram[];
        setRecentDiagrams(parsed.slice(0, 6));
      }
    } catch (error) {
      console.error('Failed to load recent diagrams:', error);
    }
  }, []);

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleTemplateClick = (templateId: string) => {
    router.push(`/illustrate/agent?template=${templateId}`);
  };

  const handleRecentClick = (diagramId: string) => {
    router.push(`/illustrate/editor/${diagramId}`);
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span style={styles.logoText}>FINNISH</span>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Hero Section */}
        <section style={styles.hero}>
          <h1 style={styles.title}>Scientific Illustration Made Simple</h1>
          <p style={styles.tagline}>
            Create professional diagrams, flowcharts, and scientific illustrations
            with AI assistance or precision manual tools.
          </p>
        </section>

        {/* Action Cards */}
        <section style={styles.actions}>
          <Link
            to="/agent"
            style={{
              ...styles.actionCard,
              ...(hoveredAction === 'agent' ? styles.actionCardHover : {}),
            }}
            onMouseEnter={() => setHoveredAction('agent')}
            onMouseLeave={() => setHoveredAction(null)}
          >
            <div style={{ ...styles.actionIcon, ...styles.actionIconAI }}>
              <SparklesIcon />
            </div>
            <span style={styles.actionTitle}>Create with AI</span>
            <span style={styles.actionDescription}>
              Describe what you want and let AI generate it for you
            </span>
          </Link>

          <Link
            to="/editor"
            style={{
              ...styles.actionCard,
              ...(hoveredAction === 'editor' ? styles.actionCardHover : {}),
            }}
            onMouseEnter={() => setHoveredAction('editor')}
            onMouseLeave={() => setHoveredAction(null)}
          >
            <div style={{ ...styles.actionIcon, ...styles.actionIconEditor }}>
              <PenToolIcon />
            </div>
            <span style={styles.actionTitle}>Open Editor</span>
            <span style={styles.actionDescription}>
              Use professional tools for precise manual editing
            </span>
          </Link>
        </section>

        {/* Recent Diagrams Section */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Recent Diagrams</h2>
            {recentDiagrams.length > 0 && (
              <Link href="/illustrate/editor" style={styles.sectionLink}>
                View all
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6" />
                </svg>
              </Link>
            )}
          </div>

          {recentDiagrams.length > 0 ? (
            <div style={styles.recentGrid} role="list" aria-label="Recent diagrams">
              {recentDiagrams.map((diagram) => (
                <div
                  key={diagram.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${diagram.name}, last edited ${formatDate(diagram.updatedAt)}`}
                  style={{
                    ...styles.recentCard,
                    ...(hoveredRecent === diagram.id || focusedRecent === diagram.id ? styles.recentCardHover : {}),
                    outline: focusedRecent === diagram.id ? focusOutlineStyle : 'none',
                    outlineOffset: focusOutlineOffset,
                  }}
                  onClick={() => handleRecentClick(diagram.id)}
                  onKeyDown={(e) => handleKeyboardActivation(e, () => handleRecentClick(diagram.id))}
                  onMouseEnter={() => setHoveredRecent(diagram.id)}
                  onMouseLeave={() => setHoveredRecent(null)}
                  onFocus={() => setFocusedRecent(diagram.id)}
                  onBlur={() => setFocusedRecent(null)}
                >
                  <div style={styles.recentThumbnail}>
                    {diagram.thumbnail ? (
                      <img
                        src={diagram.thumbnail}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        aria-hidden="true"
                      />
                    ) : (
                      <FileIcon />
                    )}
                  </div>
                  <div style={styles.recentInfo}>
                    <div style={styles.recentName}>{diagram.name}</div>
                    <div style={styles.recentDate}>{formatDate(diagram.updatedAt)}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>
                <FileIcon />
              </div>
              <p style={styles.emptyText}>No recent diagrams. Create your first one!</p>
            </div>
          )}
        </section>

        {/* Templates Section */}
        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Quick Templates</h2>
          </div>

          <div style={styles.templateGrid} role="list" aria-label="Quick templates">
            {templates.map((template) => (
              <div
                key={template.id}
                role="button"
                tabIndex={0}
                aria-label={`Create ${template.name} template: ${template.description}`}
                style={{
                  ...styles.templateCard,
                  ...(hoveredTemplate === template.id || focusedTemplate === template.id ? styles.templateCardHover : {}),
                  outline: focusedTemplate === template.id ? focusOutlineStyle : 'none',
                  outlineOffset: focusOutlineOffset,
                }}
                onClick={() => handleTemplateClick(template.id)}
                onKeyDown={(e) => handleKeyboardActivation(e, () => handleTemplateClick(template.id))}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
                onFocus={() => setFocusedTemplate(template.id)}
                onBlur={() => setFocusedTemplate(null)}
              >
                <div style={styles.templateIcon} aria-hidden="true">{template.icon}</div>
                <span style={styles.templateName}>{template.name}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Welcome;
