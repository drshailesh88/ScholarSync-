"use client";
/**
 * CreditsPage Component
 * Displays credits and attributions for all icon libraries and software used
 *
 * @module pages/CreditsPage
 */

import React, { useState } from 'react';
import Link from 'next/link';

// ============================================================================
// Types
// ============================================================================

interface Attribution {
  name: string;
  license: string;
  url: string;
  description?: string;
}

// ============================================================================
// Styles
// ============================================================================

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--bg-primary)',
    display: 'flex',
    flexDirection: 'column',
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
  backLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--text-accent)',
    textDecoration: 'none',
    fontSize: '14px',
    padding: '8px 16px',
    borderRadius: '8px',
    transition: 'background-color 150ms ease',
  },
  main: {
    flex: 1,
    padding: '48px 32px',
    maxWidth: '900px',
    margin: '0 auto',
    width: '100%',
  },
  title: {
    fontSize: '36px',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '16px',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '16px',
    color: 'var(--text-secondary)',
    textAlign: 'center',
    marginBottom: '48px',
    lineHeight: 1.6,
  },
  section: {
    marginBottom: '48px',
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
    paddingBottom: '12px',
    borderBottom: '2px solid var(--border-primary)',
  },
  sectionIcon: {
    width: '24px',
    height: '24px',
    color: 'var(--accent-primary)',
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  attributionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '16px',
  },
  attributionCard: {
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-primary)',
    borderRadius: '12px',
    padding: '20px',
    transition: 'border-color 150ms ease, transform 150ms ease',
  },
  attributionCardHover: {
    borderColor: 'var(--accent-primary)',
    transform: 'translateY(-2px)',
  },
  attributionName: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  licenseBadge: {
    fontSize: '11px',
    fontWeight: 500,
    padding: '2px 8px',
    borderRadius: '4px',
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-secondary)',
  },
  licenseBadgeCCBY: {
    backgroundColor: 'rgba(255, 193, 7, 0.15)',
    color: '#ffc107',
  },
  licenseBadgeMIT: {
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    color: 'var(--color-success)',
  },
  licenseBadgeCC0: {
    backgroundColor: 'rgba(33, 150, 243, 0.15)',
    color: 'var(--color-info)',
  },
  licenseBadgeApache: {
    backgroundColor: 'rgba(156, 39, 176, 0.15)',
    color: '#ab47bc',
  },
  attributionDescription: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    marginBottom: '12px',
    lineHeight: 1.5,
  },
  attributionLink: {
    fontSize: '13px',
    color: 'var(--text-accent)',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    wordBreak: 'break-all',
  },
  footer: {
    padding: '24px 32px',
    borderTop: '1px solid var(--border-primary)',
    backgroundColor: 'var(--bg-secondary)',
    textAlign: 'center',
  },
  footerText: {
    fontSize: '14px',
    color: 'var(--text-muted)',
    marginBottom: '8px',
  },
  footerHeart: {
    color: '#e91e63',
  },
};

// ============================================================================
// Icons
// ============================================================================

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const ImageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const GridIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const CodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// ============================================================================
// Data
// ============================================================================

const scientificIllustrations: Attribution[] = [
  {
    name: 'SciDraw-style Illustrations',
    license: 'CC-BY',
    url: 'https://scidraw.io/',
    description: 'Original work inspired by SciDraw (Federico Claudi & Alex Harston). Scientific illustrations for neuroscience and biology.',
  },
  {
    name: 'Bioicons',
    license: 'CC-BY',
    url: 'https://bioicons.com/',
    description: 'Free, open-source icons for science illustrations. Some icons licensed under CC-BY require attribution.',
  },
  {
    name: 'Servier Medical Art',
    license: 'CC-BY 4.0',
    url: 'https://smart.servier.com/',
    description: 'Medical illustrations provided by Servier, licensed under Creative Commons Attribution 4.0.',
  },
];

const iconLibraries: Attribution[] = [
  {
    name: 'Tabler Icons',
    license: 'MIT',
    url: 'https://tabler.io/icons',
    description: 'Over 4,000 free, high-quality icons for web projects.',
  },
  {
    name: 'Health Icons',
    license: 'CC0',
    url: 'https://healthicons.org/',
    description: 'Free, open-source health icons. Public domain - no attribution required.',
  },
  {
    name: 'Science Icons',
    license: 'MIT',
    url: 'https://github.com/continuous-foundation/scienceicons',
    description: 'Icons for scientific research and academia.',
  },
  {
    name: 'Icon Park',
    license: 'Apache 2.0',
    url: 'https://iconpark.oceanengine.com/',
    description: 'Over 2,400 high-quality icons by ByteDance.',
  },
  {
    name: 'Simple Icons',
    license: 'CC0',
    url: 'https://simpleicons.org/',
    description: 'SVG icons for popular brands. Public domain.',
  },
];

const softwareLibraries: Attribution[] = [
  {
    name: 'Fabric.js',
    license: 'MIT',
    url: 'https://fabricjs.com/',
    description: 'Powerful HTML5 canvas library for interactive graphics.',
  },
  {
    name: 'Paper.js',
    license: 'MIT',
    url: 'http://paperjs.org/',
    description: 'Vector graphics scripting framework for bezier curves and paths.',
  },
  {
    name: 'Rough.js',
    license: 'MIT',
    url: 'https://roughjs.com/',
    description: 'Library for creating hand-drawn, sketchy graphics.',
  },
  {
    name: 'KaTeX',
    license: 'MIT',
    url: 'https://katex.org/',
    description: 'Fast math typesetting library for the web.',
  },
  {
    name: 'Mermaid',
    license: 'MIT',
    url: 'https://mermaid.js.org/',
    description: 'JavaScript library for creating diagrams from text.',
  },
  {
    name: 'jsPDF',
    license: 'MIT',
    url: 'https://github.com/parallax/jsPDF',
    description: 'Client-side PDF generation library.',
  },
  {
    name: 'pptxgenjs',
    license: 'MIT',
    url: 'https://github.com/gitbrent/PptxGenJS',
    description: 'JavaScript library for creating PowerPoint presentations.',
  },
  {
    name: 'MediaPipe',
    license: 'Apache 2.0',
    url: 'https://developers.google.com/mediapipe',
    description: 'Google\'s ML solutions for background removal and image processing.',
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

function getLicenseBadgeStyle(license: string): React.CSSProperties {
  const baseStyle = styles.licenseBadge;

  if (license.includes('CC-BY') || license.includes('CC BY')) {
    return { ...baseStyle, ...styles.licenseBadgeCCBY };
  }
  if (license === 'MIT') {
    return { ...baseStyle, ...styles.licenseBadgeMIT };
  }
  if (license === 'CC0') {
    return { ...baseStyle, ...styles.licenseBadgeCC0 };
  }
  if (license.includes('Apache')) {
    return { ...baseStyle, ...styles.licenseBadgeApache };
  }

  return baseStyle;
}

// ============================================================================
// Attribution Card Component
// ============================================================================

interface AttributionCardProps {
  attribution: Attribution;
}

function AttributionCard({ attribution }: AttributionCardProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.attributionCard,
        ...(isHovered ? styles.attributionCardHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.attributionName}>
        {attribution.name}
        <span style={getLicenseBadgeStyle(attribution.license)}>
          {attribution.license}
        </span>
      </div>
      {attribution.description && (
        <p style={styles.attributionDescription}>{attribution.description}</p>
      )}
      <a
        href={attribution.url}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.attributionLink}
      >
        {attribution.url}
        <ExternalLinkIcon />
      </a>
    </div>
  );
}

// ============================================================================
// Credits Section Component
// ============================================================================

interface CreditsSectionProps {
  title: string;
  icon: React.ReactNode;
  attributions: Attribution[];
}

function CreditsSection({ title, icon, attributions }: CreditsSectionProps): JSX.Element {
  return (
    <section style={styles.section}>
      <div style={styles.sectionHeader}>
        <div style={styles.sectionIcon}>{icon}</div>
        <h2 style={styles.sectionTitle}>{title}</h2>
      </div>
      <div style={styles.attributionGrid}>
        {attributions.map((attribution) => (
          <AttributionCard key={attribution.name} attribution={attribution} />
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function CreditsPage(): JSX.Element {
  const [backLinkHovered, setBackLinkHovered] = useState(false);

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <Link to="/" style={styles.logo}>
          <div style={styles.logoIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span style={styles.logoText}>FINNISH</span>
        </Link>
        <Link
          to="/"
          style={{
            ...styles.backLink,
            backgroundColor: backLinkHovered ? 'var(--bg-tertiary)' : 'transparent',
          }}
          onMouseEnter={() => setBackLinkHovered(true)}
          onMouseLeave={() => setBackLinkHovered(false)}
        >
          <ArrowLeftIcon />
          Back to Home
        </Link>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <h1 style={styles.title}>Credits & Attribution</h1>
        <p style={styles.subtitle}>
          FINNISH is built on the shoulders of giants. We gratefully acknowledge
          the following open-source projects and creative works that make this
          application possible.
        </p>

        {/* Scientific Illustrations Section */}
        <CreditsSection
          title="Scientific Illustrations (CC-BY - Attribution Required)"
          icon={<ImageIcon />}
          attributions={scientificIllustrations}
        />

        {/* Icon Libraries Section */}
        <CreditsSection
          title="Icon Libraries"
          icon={<GridIcon />}
          attributions={iconLibraries}
        />

        {/* Software Libraries Section */}
        <CreditsSection
          title="Software Libraries"
          icon={<CodeIcon />}
          attributions={softwareLibraries}
        />
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Built with <span style={styles.footerHeart}>&#9829;</span> for the scientific community
        </p>
        <p style={styles.footerText}>
          FINNISH - Scientific Illustration Made Simple
        </p>
      </footer>
    </div>
  );
}

export default CreditsPage;
