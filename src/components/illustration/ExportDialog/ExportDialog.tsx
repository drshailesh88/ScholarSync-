/**
 * ExportDialog Component
 * Modal dialog for exporting diagrams in various formats (PNG, SVG, PDF, LaTeX)
 *
 * @module components/ExportDialog
 */

import React, { useState, useCallback, useEffect } from 'react';
import { FormatTabs, ExportFormat } from './FormatTabs';
import { PNGOptions, PNGExportSettings } from './PNGOptions';
import { SVGOptions, SVGExportSettings } from './SVGOptions';
import { PDFOptions, PDFExportSettings } from './PDFOptions';
import { PPTXOptions, PPTXExportSettings } from './PPTXOptions';
import { LaTeXOptions, LaTeXExportSettings } from './LaTeXOptions';
import { LoadingSpinner } from '../LoadingSpinner';

// ============================================================================
// Types
// ============================================================================

export interface ExportDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Callback when dialog is closed */
  onClose: () => void;
  /** Callback when export is triggered (can be async) */
  onExport: (format: ExportFormat, settings: ExportSettings) => void | Promise<void>;
  /** Optional filename for export */
  filename?: string;
  /** Optional TikZ preview content */
  tikzPreview?: string;
  /** Callback for error handling (for toast notifications) */
  onError?: (message: string) => void;
}

export type ExportSettings =
  | PNGExportSettings
  | SVGExportSettings
  | PDFExportSettings
  | PPTXExportSettings
  | LaTeXExportSettings;

// ============================================================================
// Default Settings
// ============================================================================

const defaultPNGSettings: PNGExportSettings = {
  dpi: 300,
  quality: 90,
  background: 'transparent',
};

const defaultSVGSettings: SVGExportSettings = {
  optimize: true,
  minify: false,
  embedFonts: true,
};

const defaultPDFSettings: PDFExportSettings = {
  pageSize: 'a4',
  orientation: 'portrait',
  margins: { top: 20, right: 20, bottom: 20, left: 20 },
};

const defaultPPTXSettings: PPTXExportSettings = {
  layout: '16x9',
  resolution: 2,
  background: 'white',
  centerImage: true,
};

const defaultLaTeXSettings: LaTeXExportSettings = {
  standalone: true,
  includePreamble: true,
};

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
    width: '520px',
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
    padding: '20px',
    overflowY: 'auto' as const,
  },
  filenameSection: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-secondary, #9d9d9d)',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    color: 'var(--text-primary, #ffffff)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 150ms ease',
  },
  optionsSection: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid var(--border-color, #333)',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '16px 20px',
    borderTop: '1px solid var(--border-color, #333)',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
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
  exportButton: {
    backgroundColor: 'var(--accent-primary, #3b82f6)',
    color: '#ffffff',
  },
  disabledButton: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  errorMessage: {
    padding: '12px',
    marginBottom: '12px',
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRadius: '6px',
    border: '1px solid rgba(244, 67, 54, 0.3)',
    color: '#f44336',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
};

// ============================================================================
// Component
// ============================================================================

export function ExportDialog({
  isOpen,
  onClose,
  onExport,
  filename = 'diagram',
  tikzPreview = '',
  onError,
}: ExportDialogProps): JSX.Element | null {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('png');
  const [exportFilename, setExportFilename] = useState(filename);
  const [pngSettings, setPngSettings] = useState<PNGExportSettings>(defaultPNGSettings);
  const [svgSettings, setSvgSettings] = useState<SVGExportSettings>(defaultSVGSettings);
  const [pdfSettings, setPdfSettings] = useState<PDFExportSettings>(defaultPDFSettings);
  const [pptxSettings, setPptxSettings] = useState<PPTXExportSettings>(defaultPPTXSettings);
  const [latexSettings, setLatexSettings] = useState<LaTeXExportSettings>(defaultLaTeXSettings);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  // Reset filename and error when dialog opens
  useEffect(() => {
    if (isOpen) {
      setExportFilename(filename);
      setExportError(null);
    }
  }, [isOpen, filename]);

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

  const handleExport = useCallback(async () => {
    let settings: ExportSettings;

    switch (selectedFormat) {
      case 'png':
        settings = pngSettings;
        break;
      case 'svg':
        settings = svgSettings;
        break;
      case 'pdf':
        settings = pdfSettings;
        break;
      case 'pptx':
        settings = pptxSettings;
        break;
      case 'latex':
        settings = latexSettings;
        break;
      default:
        settings = pngSettings;
    }

    setIsExporting(true);
    setExportError(null);

    try {
      await onExport(selectedFormat, settings);
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Export failed. Please try again.';
      setExportError(errorMessage);
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsExporting(false);
    }
  }, [selectedFormat, pngSettings, svgSettings, pdfSettings, pptxSettings, latexSettings, onExport, onClose, onError]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && !isExporting) {
        onClose();
      }
    },
    [onClose, isExporting]
  );

  const getFileExtension = useCallback((format: ExportFormat): string => {
    const extensions: Record<ExportFormat, string> = {
      png: '.png',
      svg: '.svg',
      pdf: '.pdf',
      pptx: '.pptx',
      latex: '.tex',
    };
    return extensions[format];
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div style={styles.overlay} onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div style={styles.dialog}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Export Diagram</h2>
          <button
            style={{
              ...styles.closeButton,
              ...(isExporting ? styles.disabledButton : {}),
            }}
            onClick={onClose}
            disabled={isExporting}
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
          {/* Format Selection */}
          <FormatTabs selectedFormat={selectedFormat} onFormatChange={setSelectedFormat} />

          {/* Filename Input */}
          <div style={styles.filenameSection}>
            <label style={styles.label}>Filename</label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="text"
                value={exportFilename}
                onChange={(e) => setExportFilename(e.target.value)}
                style={{ ...styles.input, flex: 1 }}
                placeholder="Enter filename"
              />
              <span
                style={{
                  color: 'var(--text-muted, #666)',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                }}
              >
                {getFileExtension(selectedFormat)}
              </span>
            </div>
          </div>

          {/* Format-specific Options */}
          <div style={styles.optionsSection}>
            {selectedFormat === 'png' && (
              <PNGOptions settings={pngSettings} onChange={setPngSettings} />
            )}
            {selectedFormat === 'svg' && (
              <SVGOptions settings={svgSettings} onChange={setSvgSettings} />
            )}
            {selectedFormat === 'pdf' && (
              <PDFOptions settings={pdfSettings} onChange={setPdfSettings} />
            )}
            {selectedFormat === 'pptx' && (
              <PPTXOptions settings={pptxSettings} onChange={setPptxSettings} />
            )}
            {selectedFormat === 'latex' && (
              <LaTeXOptions
                settings={latexSettings}
                onChange={setLatexSettings}
                tikzPreview={tikzPreview}
              />
            )}
          </div>
        </div>

        {/* Error Message */}
        {exportError && (
          <div style={{ padding: '0 20px' }}>
            <div style={styles.errorMessage}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              {exportError}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={styles.footer}>
          <button
            style={{
              ...styles.button,
              ...styles.cancelButton,
              ...(isExporting ? styles.disabledButton : {}),
            }}
            onClick={onClose}
            disabled={isExporting}
          >
            Cancel
          </button>
          <button
            style={{
              ...styles.button,
              ...styles.exportButton,
              ...(isExporting ? styles.disabledButton : {}),
            }}
            onClick={handleExport}
            disabled={isExporting}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isExporting ? (
                <>
                  <LoadingSpinner size="sm" variant="white" />
                  Exporting...
                </>
              ) : (
                <>
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Export
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExportDialog;
