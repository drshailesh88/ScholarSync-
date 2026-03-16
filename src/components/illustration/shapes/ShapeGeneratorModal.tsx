/**
 * Shape Generator Modal Component
 * Unified modal with tabs for all scientific shape generators
 *
 * @module components/shapes/ShapeGeneratorModal
 */

import React, { useState, useCallback } from 'react';
import { DNAHelixPanel } from './DNAHelixPanel';
import { CellMembranePanel } from './CellMembranePanel';
import { CellLayerPanel } from './CellLayerPanel';
import { NeuronPanel } from './NeuronPanel';
import { PathwayArrowPanel } from './PathwayArrowPanel';

// ============================================================================
// Types
// ============================================================================

export type ShapeType = 'dna-helix' | 'cell-membrane' | 'cell-layer' | 'neuron' | 'pathway-arrow';

export interface ShapeGeneratorModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal is closed */
  onClose: () => void;
  /** Initial tab to show */
  initialTab?: ShapeType;
  /** Callback when a shape is inserted */
  onInsert?: () => void;
}

interface TabConfig {
  id: ShapeType;
  label: string;
  icon: JSX.Element;
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
    zIndex: 1000,
    backdropFilter: 'blur(4px)',
  },
  modal: {
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: 'var(--bg-primary, #121212)',
    borderRadius: '12px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
    maxWidth: '520px',
    width: '95%',
    maxHeight: '90vh',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderBottom: '1px solid var(--border-color, #333)',
    backgroundColor: 'var(--bg-secondary, #1e1e1e)',
  },
  title: {
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--text-primary, #ffffff)',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  closeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    padding: 0,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    color: 'var(--text-secondary, #9d9d9d)',
    transition: 'all 150ms ease',
  },
  tabs: {
    display: 'flex',
    gap: '4px',
    padding: '12px 16px',
    backgroundColor: 'var(--bg-secondary, #1e1e1e)',
    borderBottom: '1px solid var(--border-color, #333)',
    overflowX: 'auto' as const,
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-secondary, #9d9d9d)',
    backgroundColor: 'transparent',
    border: '1px solid transparent',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    whiteSpace: 'nowrap' as const,
  },
  tabActive: {
    color: 'var(--text-primary, #ffffff)',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    borderColor: 'var(--border-color, #333)',
  },
  tabHover: {
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
  },
  content: {
    flex: 1,
    padding: '16px',
    overflowY: 'auto' as const,
    display: 'flex',
    justifyContent: 'center',
  },
  footer: {
    padding: '12px 16px',
    borderTop: '1px solid var(--border-color, #333)',
    backgroundColor: 'var(--bg-secondary, #1e1e1e)',
    fontSize: '11px',
    color: 'var(--text-muted, #666)',
    textAlign: 'center' as const,
  },
};

// ============================================================================
// Icons
// ============================================================================

const ShapesIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const DNAIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 15c6.667-6 13.333 0 20-6" />
    <path d="M2 9c6.667 6 13.333 0 20 6" />
  </svg>
);

const MembraneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="6" cy="8" rx="2" ry="3" />
    <ellipse cx="12" cy="8" rx="2" ry="3" />
    <ellipse cx="18" cy="8" rx="2" ry="3" />
    <ellipse cx="6" cy="16" rx="2" ry="3" />
    <ellipse cx="12" cy="16" rx="2" ry="3" />
    <ellipse cx="18" cy="16" rx="2" ry="3" />
  </svg>
);

const CellsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="5" height="8" rx="1" />
    <rect x="10" y="3" width="5" height="8" rx="1" />
    <rect x="17" y="3" width="5" height="8" rx="1" />
    <rect x="3" y="13" width="5" height="8" rx="1" />
    <rect x="10" y="13" width="5" height="8" rx="1" />
    <rect x="17" y="13" width="5" height="8" rx="1" />
  </svg>
);

const NeuronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="6" r="3" />
    <line x1="12" y1="9" x2="12" y2="18" />
    <line x1="8" y1="4" x2="5" y2="2" />
    <line x1="16" y1="4" x2="19" y2="2" />
    <line x1="12" y1="18" x2="8" y2="22" />
    <line x1="12" y1="18" x2="16" y2="22" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ============================================================================
// Component
// ============================================================================

export function ShapeGeneratorModal({
  isOpen,
  onClose,
  initialTab = 'dna-helix',
  onInsert,
}: ShapeGeneratorModalProps): JSX.Element | null {
  const [activeTab, setActiveTab] = useState<ShapeType>(initialTab);
  const [hoveredTab, setHoveredTab] = useState<ShapeType | null>(null);

  // Handle close with escape key
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Handle overlay click
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  // Handle shape insertion
  const handleInsert = useCallback(() => {
    onInsert?.();
    onClose();
  }, [onInsert, onClose]);

  // Tab configuration
  const tabs: TabConfig[] = [
    { id: 'dna-helix', label: 'DNA Helix', icon: <DNAIcon /> },
    { id: 'cell-membrane', label: 'Membrane', icon: <MembraneIcon /> },
    { id: 'cell-layer', label: 'Cell Layer', icon: <CellsIcon /> },
    { id: 'neuron', label: 'Neuron', icon: <NeuronIcon /> },
    { id: 'pathway-arrow', label: 'Arrows', icon: <ArrowIcon /> },
  ];

  // Render panel based on active tab
  const renderPanel = () => {
    switch (activeTab) {
      case 'dna-helix':
        return <DNAHelixPanel onInsert={handleInsert} />;
      case 'cell-membrane':
        return <CellMembranePanel onInsert={handleInsert} />;
      case 'cell-layer':
        return <CellLayerPanel onInsert={handleInsert} />;
      case 'neuron':
        return <NeuronPanel onInsert={handleInsert} />;
      case 'pathway-arrow':
        return <PathwayArrowPanel onInsert={handleInsert} />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={styles.overlay}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby="shape-generator-title"
    >
      <div style={styles.modal}>
        {/* Header */}
        <div style={styles.header}>
          <h2 id="shape-generator-title" style={styles.title}>
            <ShapesIcon />
            Scientific Shape Generator
          </h2>
          <button
            style={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          {/* empty state: renders nothing when no data */}
          {tabs.map((tab) => (
            <button
              key={tab.id}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id ? styles.tabActive : {}),
                ...(hoveredTab === tab.id && activeTab !== tab.id ? styles.tabHover : {}),
              }}
              onClick={() => setActiveTab(tab.id)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={styles.content}>
          {renderPanel()}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          Click "Insert" to add the shape to your canvas. Shapes can be resized and styled after insertion.
        </div>
      </div>
    </div>
  );
}

export default ShapeGeneratorModal;
