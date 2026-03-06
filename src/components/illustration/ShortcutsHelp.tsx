/**
 * ShortcutsHelp Component
 * Modal displaying all keyboard shortcuts organized by category with search functionality
 *
 * @module components/ShortcutsHelp
 */

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';

// ============================================================================
// Types
// ============================================================================

export interface Shortcut {
  /** Unique identifier for the shortcut */
  id: string;
  /** Display label for the shortcut action */
  label: string;
  /** Key combination(s) */
  keys: string[];
  /** Category the shortcut belongs to */
  category: ShortcutCategory;
  /** Optional description for additional context */
  description?: string;
  /** Whether the shortcut is available on Mac (for platform-specific shortcuts) */
  macOnly?: boolean;
  /** Whether the shortcut is available on Windows/Linux */
  windowsOnly?: boolean;
}

export type ShortcutCategory = 'selection' | 'tools' | 'edit' | 'view' | 'file' | 'general';

export interface ShortcutsHelpProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when the modal should close */
  onClose: () => void;
  /** Optional custom shortcuts to override defaults */
  customShortcuts?: Shortcut[];
  /** Optional callback when a shortcut is clicked (for customization) */
  onShortcutClick?: (shortcut: Shortcut) => void;
}

// ============================================================================
// Default Shortcuts Data
// ============================================================================

const DEFAULT_SHORTCUTS: Shortcut[] = [
  // Selection
  { id: 'select-all', label: 'Select All', keys: ['Ctrl', 'A'], category: 'selection' },
  { id: 'deselect', label: 'Deselect All', keys: ['Esc'], category: 'selection' },
  { id: 'select-next', label: 'Select Next Object', keys: ['Tab'], category: 'selection' },
  { id: 'select-prev', label: 'Select Previous Object', keys: ['Shift', 'Tab'], category: 'selection' },
  { id: 'add-to-selection', label: 'Add to Selection', keys: ['Shift', 'Click'], category: 'selection' },
  { id: 'toggle-selection', label: 'Toggle in Selection', keys: ['Ctrl', 'Click'], category: 'selection' },

  // Tools
  { id: 'tool-select', label: 'Selection Tool', keys: ['V'], category: 'tools' },
  { id: 'tool-direct', label: 'Direct Selection', keys: ['A'], category: 'tools' },
  { id: 'tool-pen', label: 'Pen Tool', keys: ['P'], category: 'tools' },
  { id: 'tool-pencil', label: 'Pencil Tool', keys: ['N'], category: 'tools' },
  { id: 'tool-rectangle', label: 'Rectangle Tool', keys: ['R'], category: 'tools' },
  { id: 'tool-ellipse', label: 'Ellipse Tool', keys: ['E'], category: 'tools' },
  { id: 'tool-line', label: 'Line Tool', keys: ['L'], category: 'tools' },
  { id: 'tool-text', label: 'Text Tool', keys: ['T'], category: 'tools' },
  { id: 'tool-hand', label: 'Hand Tool', keys: ['H'], category: 'tools' },
  { id: 'tool-zoom', label: 'Zoom Tool', keys: ['Z'], category: 'tools' },
  { id: 'tool-eyedropper', label: 'Eyedropper', keys: ['I'], category: 'tools' },
  { id: 'tool-eraser', label: 'Eraser Tool', keys: ['Shift', 'E'], category: 'tools' },
  { id: 'tool-scissors', label: 'Scissors Tool', keys: ['C'], category: 'tools' },
  { id: 'tool-measure', label: 'Measure Tool', keys: ['M'], category: 'tools' },

  // Edit
  { id: 'undo', label: 'Undo', keys: ['Ctrl', 'Z'], category: 'edit' },
  { id: 'redo', label: 'Redo', keys: ['Ctrl', 'Shift', 'Z'], category: 'edit' },
  { id: 'redo-alt', label: 'Redo (Alt)', keys: ['Ctrl', 'Y'], category: 'edit' },
  { id: 'cut', label: 'Cut', keys: ['Ctrl', 'X'], category: 'edit' },
  { id: 'copy', label: 'Copy', keys: ['Ctrl', 'C'], category: 'edit' },
  { id: 'paste', label: 'Paste', keys: ['Ctrl', 'V'], category: 'edit' },
  { id: 'paste-in-place', label: 'Paste in Place', keys: ['Ctrl', 'Shift', 'V'], category: 'edit' },
  { id: 'duplicate', label: 'Duplicate', keys: ['Ctrl', 'D'], category: 'edit' },
  { id: 'delete', label: 'Delete', keys: ['Delete'], category: 'edit' },
  { id: 'delete-alt', label: 'Delete (Alt)', keys: ['Backspace'], category: 'edit' },
  { id: 'group', label: 'Group', keys: ['Ctrl', 'G'], category: 'edit' },
  { id: 'ungroup', label: 'Ungroup', keys: ['Ctrl', 'Shift', 'G'], category: 'edit' },
  { id: 'bring-front', label: 'Bring to Front', keys: ['Ctrl', 'Shift', ']'], category: 'edit' },
  { id: 'send-back', label: 'Send to Back', keys: ['Ctrl', 'Shift', '['], category: 'edit' },
  { id: 'bring-forward', label: 'Bring Forward', keys: ['Ctrl', ']'], category: 'edit' },
  { id: 'send-backward', label: 'Send Backward', keys: ['Ctrl', '['], category: 'edit' },
  { id: 'lock', label: 'Lock Object', keys: ['Ctrl', 'L'], category: 'edit' },
  { id: 'hide', label: 'Hide Object', keys: ['Ctrl', 'H'], category: 'edit' },

  // View
  { id: 'zoom-in', label: 'Zoom In', keys: ['Ctrl', '+'], category: 'view' },
  { id: 'zoom-out', label: 'Zoom Out', keys: ['Ctrl', '-'], category: 'view' },
  { id: 'zoom-fit', label: 'Fit to Window', keys: ['Ctrl', '0'], category: 'view' },
  { id: 'zoom-100', label: 'Zoom to 100%', keys: ['Ctrl', '1'], category: 'view' },
  { id: 'toggle-grid', label: 'Toggle Grid', keys: ['Ctrl', "'"], category: 'view' },
  { id: 'toggle-snap', label: 'Toggle Snap to Grid', keys: ['Ctrl', 'Shift', "'"], category: 'view' },
  { id: 'toggle-rulers', label: 'Toggle Rulers', keys: ['Ctrl', 'R'], category: 'view' },
  { id: 'toggle-guides', label: 'Toggle Guides', keys: ['Ctrl', ';'], category: 'view' },
  { id: 'pan-left', label: 'Pan Left', keys: ['Arrow Left'], category: 'view', description: 'Hold Shift for larger steps' },
  { id: 'pan-right', label: 'Pan Right', keys: ['Arrow Right'], category: 'view', description: 'Hold Shift for larger steps' },
  { id: 'pan-up', label: 'Pan Up', keys: ['Arrow Up'], category: 'view', description: 'Hold Shift for larger steps' },
  { id: 'pan-down', label: 'Pan Down', keys: ['Arrow Down'], category: 'view', description: 'Hold Shift for larger steps' },

  // File
  { id: 'new', label: 'New Document', keys: ['Ctrl', 'N'], category: 'file' },
  { id: 'open', label: 'Open', keys: ['Ctrl', 'O'], category: 'file' },
  { id: 'save', label: 'Save', keys: ['Ctrl', 'S'], category: 'file' },
  { id: 'save-as', label: 'Save As', keys: ['Ctrl', 'Shift', 'S'], category: 'file' },
  { id: 'export', label: 'Export', keys: ['Ctrl', 'E'], category: 'file' },
  { id: 'export-png', label: 'Quick Export PNG', keys: ['Ctrl', 'Shift', 'E'], category: 'file' },
  { id: 'print', label: 'Print', keys: ['Ctrl', 'P'], category: 'file' },

  // General
  { id: 'help', label: 'Show Help', keys: ['F1'], category: 'general' },
  { id: 'shortcuts', label: 'Keyboard Shortcuts', keys: ['Ctrl', '/'], category: 'general' },
  { id: 'preferences', label: 'Preferences', keys: ['Ctrl', ','], category: 'general' },
  { id: 'command-palette', label: 'Command Palette', keys: ['Ctrl', 'Shift', 'P'], category: 'general' },
  { id: 'search', label: 'Search', keys: ['Ctrl', 'F'], category: 'general' },
];

const CATEGORY_INFO: Record<ShortcutCategory, { label: string; icon: string }> = {
  selection: { label: 'Selection', icon: 'cursor' },
  tools: { label: 'Tools', icon: 'tools' },
  edit: { label: 'Edit', icon: 'edit' },
  view: { label: 'View', icon: 'eye' },
  file: { label: 'File', icon: 'file' },
  general: { label: 'General', icon: 'settings' },
};

const CATEGORY_ORDER: ShortcutCategory[] = ['selection', 'tools', 'edit', 'view', 'file', 'general'];

// ============================================================================
// Styles
// ============================================================================

const styles = {
  overlay: {
    position: 'fixed' as const,
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)',
  },
  modal: {
    backgroundColor: 'var(--bg-primary, #ffffff)',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '720px',
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column' as const,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    border: '1px solid var(--border-primary, #e2e8f0)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px',
    borderBottom: '1px solid var(--border-primary, #e2e8f0)',
  },
  title: {
    margin: 0,
    fontSize: '18px',
    fontWeight: 600,
    color: 'var(--text-primary, #1a202c)',
  },
  closeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary, #718096)',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  searchContainer: {
    padding: '16px 24px',
    borderBottom: '1px solid var(--border-primary, #e2e8f0)',
  },
  searchInput: {
    width: '100%',
    padding: '10px 14px 10px 40px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid var(--border-primary, #e2e8f0)',
    backgroundColor: 'var(--bg-secondary, #f7fafc)',
    color: 'var(--text-primary, #1a202c)',
    outline: 'none',
    transition: 'all 150ms ease',
  },
  searchIcon: {
    position: 'absolute' as const,
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-muted, #a0aec0)',
    pointerEvents: 'none' as const,
  },
  content: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '16px 24px 24px',
  },
  categorySection: {
    marginBottom: '24px',
  },
  categoryHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-secondary, #718096)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
  },
  shortcutList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '8px',
  },
  shortcutItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    borderRadius: '6px',
    backgroundColor: 'var(--bg-secondary, #f7fafc)',
    transition: 'all 150ms ease',
  },
  shortcutLabel: {
    fontSize: '13px',
    color: 'var(--text-primary, #1a202c)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2px',
  },
  shortcutDescription: {
    fontSize: '11px',
    color: 'var(--text-muted, #a0aec0)',
  },
  keysContainer: {
    display: 'flex',
    gap: '4px',
    flexWrap: 'wrap' as const,
    justifyContent: 'flex-end',
  },
  keyBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '24px',
    height: '24px',
    padding: '0 6px',
    fontSize: '11px',
    fontWeight: 500,
    fontFamily: 'var(--font-mono, monospace)',
    color: 'var(--text-primary, #1a202c)',
    backgroundColor: 'var(--bg-primary, #ffffff)',
    border: '1px solid var(--border-primary, #e2e8f0)',
    borderRadius: '4px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  noResults: {
    textAlign: 'center' as const,
    padding: '48px 24px',
    color: 'var(--text-muted, #a0aec0)',
  },
  noResultsIcon: {
    fontSize: '48px',
    marginBottom: '16px',
    opacity: 0.5,
  },
  noResultsText: {
    fontSize: '14px',
    margin: 0,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 24px',
    borderTop: '1px solid var(--border-primary, #e2e8f0)',
    fontSize: '12px',
    color: 'var(--text-muted, #a0aec0)',
  },
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Detect if running on Mac
 */
const isMac = (): boolean => {
  if (typeof navigator !== 'undefined') {
    return /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  }
  return false;
};

/**
 * Format key for display (e.g., Ctrl -> Cmd on Mac)
 */
const formatKey = (key: string): string => {
  const mac = isMac();

  const keyMap: Record<string, string> = {
    Ctrl: mac ? 'Cmd' : 'Ctrl',
    Alt: mac ? 'Option' : 'Alt',
    Delete: mac ? 'Delete' : 'Del',
    Backspace: mac ? 'Delete' : 'Backspace',
    'Arrow Left': 'Left',
    'Arrow Right': 'Right',
    'Arrow Up': 'Up',
    'Arrow Down': 'Down',
  };

  return keyMap[key] || key;
};

// ============================================================================
// Component
// ============================================================================

export const ShortcutsHelp: React.FC<ShortcutsHelpProps> = ({
  isOpen,
  onClose,
  customShortcuts,
  onShortcutClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Use custom shortcuts if provided, otherwise use defaults
  const shortcuts = customShortcuts || DEFAULT_SHORTCUTS;

  // Filter shortcuts based on search query
  const filteredShortcuts = useMemo(() => {
    if (!searchQuery.trim()) {
      return shortcuts;
    }

    const query = searchQuery.toLowerCase();
    return shortcuts.filter(
      (shortcut) =>
        shortcut.label.toLowerCase().includes(query) ||
        shortcut.keys.some((key) => key.toLowerCase().includes(query)) ||
        shortcut.category.toLowerCase().includes(query) ||
        (shortcut.description && shortcut.description.toLowerCase().includes(query))
    );
  }, [shortcuts, searchQuery]);

  // Group filtered shortcuts by category
  const groupedShortcuts = useMemo(() => {
    const groups: Record<ShortcutCategory, Shortcut[]> = {
      selection: [],
      tools: [],
      edit: [],
      view: [],
      file: [],
      general: [],
    };

    filteredShortcuts.forEach((shortcut) => {
      groups[shortcut.category].push(shortcut);
    });

    return groups;
  }, [filteredShortcuts]);

  // Handle escape key to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  // Handle click outside to close
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure modal is rendered
      const timeoutId = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, handleKeyDown]);

  // Reset search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const hasResults = filteredShortcuts.length > 0;

  return (
    <div
      style={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
    >
      <div style={styles.modal} ref={modalRef}>
        {/* Header */}
        <div style={styles.header}>
          <h2 id="shortcuts-title" style={styles.title}>
            Keyboard Shortcuts
          </h2>
          <button
            style={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
            title="Close (Esc)"
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

        {/* Search */}
        <div style={styles.searchContainer}>
          <div style={{ position: 'relative' }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={styles.searchIcon}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search shortcuts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
              aria-label="Search shortcuts"
            />
          </div>
        </div>

        {/* Content */}
        <div style={styles.content}>
          {hasResults ? (
            CATEGORY_ORDER.map((category) => {
              const categoryShortcuts = groupedShortcuts[category];
              if (categoryShortcuts.length === 0) return null;

              return (
                <div key={category} style={styles.categorySection}>
                  <div style={styles.categoryHeader}>
                    <CategoryIcon category={category} />
                    {CATEGORY_INFO[category].label}
                    <span style={{ opacity: 0.6, fontWeight: 400 }}>
                      ({categoryShortcuts.length})
                    </span>
                  </div>
                  <div style={styles.shortcutList}>
                    {categoryShortcuts.map((shortcut) => (
                      <div
                        key={shortcut.id}
                        style={styles.shortcutItem}
                        onClick={() => onShortcutClick?.(shortcut)}
                        role={onShortcutClick ? 'button' : undefined}
                        tabIndex={onShortcutClick ? 0 : undefined}
                      >
                        <div style={styles.shortcutLabel}>
                          <span>{shortcut.label}</span>
                          {shortcut.description && (
                            <span style={styles.shortcutDescription}>
                              {shortcut.description}
                            </span>
                          )}
                        </div>
                        <div style={styles.keysContainer}>
                          {shortcut.keys.map((key, index) => (
                            <span key={index} style={styles.keyBadge}>
                              {formatKey(key)}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div style={styles.noResults}>
              <div style={styles.noResultsIcon}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <p style={styles.noResultsText}>
                No shortcuts found for "{searchQuery}"
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <span>
            {isMac() ? 'Cmd' : 'Ctrl'} = {isMac() ? 'Command' : 'Control'} key
          </span>
          <span>Press Esc to close</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// Category Icon Component
// ============================================================================

const CategoryIcon: React.FC<{ category: ShortcutCategory }> = ({ category }) => {
  const iconProps = {
    width: 14,
    height: 14,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (category) {
    case 'selection':
      return (
        <svg {...iconProps}>
          <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
          <path d="M13 13l6 6" />
        </svg>
      );
    case 'tools':
      return (
        <svg {...iconProps}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case 'edit':
      return (
        <svg {...iconProps}>
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      );
    case 'view':
      return (
        <svg {...iconProps}>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'file':
      return (
        <svg {...iconProps}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      );
    case 'general':
      return (
        <svg {...iconProps}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    default:
      return null;
  }
};

// ============================================================================
// Hook for accessing shortcuts
// ============================================================================

/**
 * Hook to get shortcuts by category
 */
export const useShortcuts = (customShortcuts?: Shortcut[]) => {
  const shortcuts = customShortcuts || DEFAULT_SHORTCUTS;

  return {
    shortcuts,
    getByCategory: (category: ShortcutCategory) =>
      shortcuts.filter((s) => s.category === category),
    getById: (id: string) => shortcuts.find((s) => s.id === id),
    search: (query: string) =>
      shortcuts.filter(
        (s) =>
          s.label.toLowerCase().includes(query.toLowerCase()) ||
          s.keys.some((k) => k.toLowerCase().includes(query.toLowerCase()))
      ),
  };
};

export default ShortcutsHelp;
