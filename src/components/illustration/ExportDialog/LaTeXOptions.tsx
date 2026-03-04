/**
 * LaTeXOptions Component
 * Export options for LaTeX/TikZ format including preview and clipboard copy
 *
 * @module components/ExportDialog/LaTeXOptions
 */

import { useState, useCallback } from 'react';

// ============================================================================
// Types
// ============================================================================

export interface LaTeXExportSettings {
  /** Generate standalone compilable .tex file */
  standalone: boolean;
  /** Include TikZ package imports in preamble */
  includePreamble: boolean;
}

export interface LaTeXOptionsProps {
  /** Current settings */
  settings: LaTeXExportSettings;
  /** Callback when settings change */
  onChange: (settings: LaTeXExportSettings) => void;
  /** TikZ preview content */
  tikzPreview?: string;
}

// ============================================================================
// Styles
// ============================================================================

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
  },
  optionRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    borderRadius: '8px',
    border: '1px solid var(--border-color, #333)',
  },
  optionInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2px',
  },
  optionLabel: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-primary, #ffffff)',
  },
  optionDescription: {
    fontSize: '12px',
    color: 'var(--text-muted, #666)',
  },
  toggle: {
    position: 'relative' as const,
    width: '44px',
    height: '24px',
    backgroundColor: 'var(--border-color, #333)',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background-color 150ms ease',
    border: 'none',
    padding: 0,
  },
  toggleActive: {
    backgroundColor: 'var(--accent-primary, #3b82f6)',
  },
  toggleKnob: {
    position: 'absolute' as const,
    top: '2px',
    left: '2px',
    width: '20px',
    height: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    transition: 'transform 150ms ease',
  },
  toggleKnobActive: {
    transform: 'translateX(20px)',
  },
  previewSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  previewLabel: {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-secondary, #9d9d9d)',
  },
  previewTextarea: {
    width: '100%',
    height: '180px',
    padding: '12px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    color: 'var(--text-primary, #ffffff)',
    fontSize: '12px',
    fontFamily: '"Fira Code", "Monaco", "Consolas", monospace',
    lineHeight: 1.5,
    resize: 'vertical' as const,
    outline: 'none',
  },
  actionsRow: {
    display: 'flex',
    gap: '8px',
  },
  actionButton: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    color: 'var(--text-primary, #ffffff)',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  actionButtonSuccess: {
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
    borderColor: 'rgba(34, 197, 94, 0.4)',
    color: '#22c55e',
  },
  helpBox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '12px',
    backgroundColor: 'rgba(156, 163, 175, 0.1)',
    borderRadius: '6px',
    border: '1px solid rgba(156, 163, 175, 0.2)',
  },
  helpIcon: {
    flexShrink: 0,
    color: 'var(--text-muted, #666)',
  },
  helpText: {
    fontSize: '12px',
    color: 'var(--text-secondary, #9d9d9d)',
    lineHeight: 1.5,
  },
  codeSnippet: {
    display: 'inline-block',
    padding: '2px 6px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    borderRadius: '3px',
    fontFamily: 'monospace',
    fontSize: '11px',
  },
};

// ============================================================================
// Default TikZ Preview
// ============================================================================

const DEFAULT_TIKZ_PREVIEW = `\\begin{tikzpicture}[scale=1]
  % Rectangle
  \\draw[fill=blue!20, draw=blue!70, thick] (0,0) rectangle (3,2);

  % Circle
  \\draw[fill=red!20, draw=red!70, thick] (5,1) circle (1);

  % Arrow
  \\draw[->, thick, blue!70] (3.2,1) -- (3.8,1);

  % Text labels
  \\node at (1.5,1) {Box};
  \\node at (5,1) {Circle};
\\end{tikzpicture}`;

// ============================================================================
// Toggle Component
// ============================================================================

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function Toggle({ checked, onChange }: ToggleProps): JSX.Element {
  return (
    <button
      role="switch"
      aria-checked={checked}
      style={{
        ...styles.toggle,
        ...(checked ? styles.toggleActive : {}),
      }}
      onClick={() => onChange(!checked)}
    >
      <span
        style={{
          ...styles.toggleKnob,
          ...(checked ? styles.toggleKnobActive : {}),
        }}
      />
    </button>
  );
}

// ============================================================================
// Icons
// ============================================================================

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// ============================================================================
// Component
// ============================================================================

export function LaTeXOptions({
  settings,
  onChange,
  tikzPreview = DEFAULT_TIKZ_PREVIEW,
}: LaTeXOptionsProps): JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleToggle = (key: keyof LaTeXExportSettings) => {
    onChange({ ...settings, [key]: !settings[key] });
  };

  const getFullTikzCode = useCallback(() => {
    if (!settings.standalone && !settings.includePreamble) {
      return tikzPreview;
    }

    let code = '';

    if (settings.standalone) {
      code += '\\documentclass[tikz,border=10pt]{standalone}\n';
    }

    if (settings.includePreamble) {
      code += '\\usepackage{tikz}\n';
      code += '\\usetikzlibrary{arrows.meta, positioning, shapes.geometric}\n';
      code += '\n';
    }

    if (settings.standalone) {
      code += '\\begin{document}\n';
    }

    code += tikzPreview;

    if (settings.standalone) {
      code += '\n\\end{document}';
    }

    return code;
  }, [settings, tikzPreview]);

  const handleCopyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(getFullTikzCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  }, [getFullTikzCode]);

  const handleDownloadTex = useCallback(() => {
    const code = getFullTikzCode();
    const blob = new Blob([code], { type: 'text/x-tex' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagram.tex';
    a.click();
    URL.revokeObjectURL(url);
  }, [getFullTikzCode]);

  return (
    <div style={styles.container}>
      {/* Standalone Option */}
      <div style={styles.optionRow}>
        <div style={styles.optionInfo}>
          <span style={styles.optionLabel}>Standalone Document</span>
          <span style={styles.optionDescription}>
            Generate complete compilable .tex file
          </span>
        </div>
        <Toggle checked={settings.standalone} onChange={() => handleToggle('standalone')} />
      </div>

      {/* Include Preamble Option */}
      <div style={styles.optionRow}>
        <div style={styles.optionInfo}>
          <span style={styles.optionLabel}>Include Preamble</span>
          <span style={styles.optionDescription}>
            Add TikZ package imports and libraries
          </span>
        </div>
        <Toggle
          checked={settings.includePreamble}
          onChange={() => handleToggle('includePreamble')}
        />
      </div>

      {/* TikZ Preview */}
      <div style={styles.previewSection}>
        <label style={styles.previewLabel}>TikZ Code Preview</label>
        <textarea
          style={styles.previewTextarea}
          value={getFullTikzCode()}
          readOnly
          spellCheck={false}
        />
      </div>

      {/* Action Buttons */}
      <div style={styles.actionsRow}>
        <button
          style={{
            ...styles.actionButton,
            ...(copied ? styles.actionButtonSuccess : {}),
          }}
          onClick={handleCopyToClipboard}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
        <button style={styles.actionButton} onClick={handleDownloadTex}>
          <DownloadIcon />
          Download .tex
        </button>
      </div>

      {/* Help Box */}
      <div style={styles.helpBox}>
        <svg
          style={styles.helpIcon}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <div style={styles.helpText}>
          <p style={{ margin: '0 0 8px 0' }}>
            TikZ is a powerful LaTeX package for creating vector graphics programmatically.
          </p>
          <p style={{ margin: 0 }}>
            Compile with: <code style={styles.codeSnippet}>pdflatex diagram.tex</code>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LaTeXOptions;
