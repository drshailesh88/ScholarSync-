/**
 * DiagramActions Component
 *
 * Action buttons for generated diagrams:
 * - "Send to Editor" - navigates to EditorMode with diagram
 * - "Download" dropdown (PNG, SVG options)
 * - "Regenerate" - generates new variation
 * - "Copy SVG" - copies to clipboard
 */

import React, { useState, useRef, useEffect } from 'react';

// Icons
const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7,10 12,15 17,10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 4v6h-6" />
    <path d="M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

interface DiagramActionsProps {
  svg: string;
  messageId: string;
  onSendToEditor?: (svg: string) => void;
  onRegenerate?: (messageId: string) => void;
}

export const DiagramActions: React.FC<DiagramActionsProps> = ({
  svg,
  messageId,
  onSendToEditor,
  onRegenerate
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSendToEditor = () => {
    if (onSendToEditor) {
      onSendToEditor(svg);
    }
  };

  const handleDownloadSVG = () => {
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diagram-${messageId}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowDropdown(false);
  };

  const handleDownloadPNG = async () => {
    try {
      // Create a canvas to render the SVG
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Create an image from the SVG
      const img = new Image();
      const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        // Set canvas size (2x for better quality)
        canvas.width = img.width * 2 || 800;
        canvas.height = img.height * 2 || 600;
        ctx.scale(2, 2);

        // Draw white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the SVG
        ctx.drawImage(img, 0, 0);

        // Convert to PNG and download
        canvas.toBlob((blob) => {
          if (blob) {
            const pngUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = pngUrl;
            a.download = `diagram-${messageId}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(pngUrl);
          }
        }, 'image/png');

        URL.revokeObjectURL(url);
      };

      img.src = url;
    } catch (error) {
      console.error('Failed to download PNG:', error);
    }
    setShowDropdown(false);
  };

  const handleCopySVG = async () => {
    try {
      await navigator.clipboard.writeText(svg);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy SVG:', error);
    }
  };

  const handleRegenerate = () => {
    if (onRegenerate) {
      onRegenerate(messageId);
    }
  };

  return (
    <div style={styles.container}>
      <button
        type="button"
        onClick={handleSendToEditor}
        style={styles.button}
        title="Edit in canvas editor"
        aria-label="Edit diagram in editor"
      >
        <span style={styles.icon}><EditIcon /></span>
        <span>Edit</span>
      </button>

      <div style={styles.dropdownWrapper} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          style={styles.button}
          title="Download diagram"
          aria-label="Open export options"
        >
          <span style={styles.icon}><DownloadIcon /></span>
          <span>Export</span>
          <span style={styles.chevron}><ChevronDownIcon /></span>
        </button>
        {showDropdown && (
          <div style={styles.dropdown}>
            <button type="button" onClick={handleDownloadSVG} style={styles.dropdownItem}>
              Export SVG
            </button>
            <button type="button" onClick={handleDownloadPNG} style={styles.dropdownItem}>
              Export PNG
            </button>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleRegenerate}
        style={styles.button}
        title="Generate a new variation"
        aria-label="Regenerate diagram"
      >
        <span style={styles.icon}><RefreshIcon /></span>
        <span>Regenerate</span>
      </button>

      <button
        type="button"
        onClick={handleCopySVG}
        style={{
          ...styles.button,
          ...(copied ? styles.buttonSuccess : {})
        }}
        title="Copy SVG to clipboard"
        aria-label="Copy SVG"
      >
        <span style={styles.icon}>
          {copied ? <CheckIcon /> : <CopyIcon />}
        </span>
        <span>{copied ? 'Copied!' : 'Copy SVG'}</span>
      </button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--spacing-sm)',
    marginTop: 'var(--spacing-md)'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    background: 'var(--bg-hover)',
    border: '1px solid var(--border-color)',
    borderRadius: '4px',
    color: 'var(--text-primary)',
    fontSize: 'var(--font-size-sm)',
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    whiteSpace: 'nowrap'
  },
  buttonSuccess: {
    background: 'var(--accent-success)',
    borderColor: 'var(--accent-success)',
    color: 'white'
  },
  icon: {
    width: '14px',
    height: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chevron: {
    width: '12px',
    height: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '2px'
  },
  dropdownWrapper: {
    position: 'relative'
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    marginTop: '4px',
    minWidth: '150px',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    boxShadow: 'var(--shadow-md)',
    zIndex: 100,
    overflow: 'hidden'
  },
  dropdownItem: {
    display: 'block',
    width: '100%',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    background: 'transparent',
    border: 'none',
    color: 'var(--text-primary)',
    fontSize: 'var(--font-size-sm)',
    fontFamily: 'inherit',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'background var(--transition-fast)'
  }
};

// Add hover styles via stylesheet (SSR-safe)
if (typeof window !== 'undefined') {
  const hoverStyles = document.createElement('style');
  hoverStyles.textContent = `
    .diagram-action-btn:hover {
      background: var(--accent-primary) !important;
      border-color: var(--accent-primary) !important;
    }
    .diagram-dropdown-item:hover {
      background: var(--bg-hover);
    }
  `;
  document.head.appendChild(hoverStyles);
}

export default DiagramActions;
