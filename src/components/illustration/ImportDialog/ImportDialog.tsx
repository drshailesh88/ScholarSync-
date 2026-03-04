/**
 * ImportDialog Component
 * Modal dialog for importing files via drag-and-drop, file selection, or URL
 *
 * @module components/ImportDialog
 */

import React, { useState, useCallback, useEffect } from 'react';
import { DropZone } from './DropZone';

// ============================================================================
// Types
// ============================================================================

export type ImportSource = 'file' | 'url';
export type ImportFileType = 'svg' | 'png' | 'jpeg' | 'gif';

export interface ImportDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Callback when dialog is closed */
  onClose: () => void;
  /** Callback when import is triggered */
  onImport: (file: File | string, type: ImportFileType) => void;
}

export interface DetectedFile {
  name: string;
  type: ImportFileType;
  size: number;
  preview?: string;
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
  sourceTabs: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
  },
  sourceTab: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '2px solid var(--border-color, #333)',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    color: 'var(--text-primary, #ffffff)',
    fontSize: '14px',
    fontWeight: 500,
  },
  sourceTabActive: {
    borderColor: 'var(--accent-primary, #3b82f6)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  urlSection: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  urlInput: {
    width: '100%',
    padding: '12px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    color: 'var(--text-primary, #ffffff)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 150ms ease',
  },
  fetchButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    color: 'var(--text-primary, #ffffff)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  formatInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    borderRadius: '6px',
    marginTop: '16px',
  },
  formatBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--accent-primary, #3b82f6)',
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
  importButton: {
    backgroundColor: 'var(--accent-primary, #3b82f6)',
    color: '#ffffff',
  },
  importButtonDisabled: {
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    color: 'var(--text-muted, #666)',
    cursor: 'not-allowed',
  },
};

// ============================================================================
// Icons
// ============================================================================

const FileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
    <polyline points="13 2 13 9 20 9" />
  </svg>
);

const LinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

// ============================================================================
// Utility Functions
// ============================================================================

function detectFileType(filename: string, mimeType?: string): ImportFileType | null {
  const extension = filename.toLowerCase().split('.').pop();

  const typeMap: Record<string, ImportFileType> = {
    svg: 'svg',
    png: 'png',
    jpg: 'jpeg',
    jpeg: 'jpeg',
    gif: 'gif',
  };

  if (extension && typeMap[extension]) {
    return typeMap[extension];
  }

  if (mimeType) {
    const mimeTypeMap: Record<string, ImportFileType> = {
      'image/svg+xml': 'svg',
      'image/png': 'png',
      'image/jpeg': 'jpeg',
      'image/gif': 'gif',
    };
    return mimeTypeMap[mimeType] || null;
  }

  return null;
}

// ============================================================================
// Component
// ============================================================================

export function ImportDialog({
  isOpen,
  onClose,
  onImport,
}: ImportDialogProps): JSX.Element | null {
  const [source, setSource] = useState<ImportSource>('file');
  const [url, setUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [detectedFile, setDetectedFile] = useState<DetectedFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset state when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null);
      setDetectedFile(null);
      setUrl('');
      setError(null);
      setIsLoading(false);
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

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setError(null);

    const type = detectFileType(file.name, file.type);
    if (!type) {
      setError('Unsupported file type. Please select SVG, PNG, JPEG, or GIF.');
      return;
    }

    // Create preview for images
    const reader = new FileReader();
    reader.onload = (e) => {
      setDetectedFile({
        name: file.name,
        type,
        size: file.size,
        preview: e.target?.result as string,
      });
    };
    reader.readAsDataURL(file);
  }, []);

  const handleUrlFetch = useCallback(async () => {
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Extract filename from URL
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const filename = pathname.split('/').pop() || 'imported-file';

      const type = detectFileType(filename);
      if (!type) {
        setError('Could not detect file type from URL. Supported types: SVG, PNG, JPEG, GIF');
        setIsLoading(false);
        return;
      }

      // For URL imports, we'll pass the URL directly
      setDetectedFile({
        name: filename,
        type,
        size: 0, // Unknown for URLs
        preview: url,
      });
    } catch (err) {
      setError('Invalid URL format');
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  const handleImport = useCallback(() => {
    if (source === 'file' && selectedFile && detectedFile) {
      onImport(selectedFile, detectedFile.type);
    } else if (source === 'url' && detectedFile) {
      onImport(url, detectedFile.type);
    }
    onClose();
  }, [source, selectedFile, detectedFile, url, onImport, onClose]);

  const canImport = detectedFile !== null && !error;

  if (!isOpen) {
    return null;
  }

  return (
    <div style={styles.overlay} onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div style={styles.dialog}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Import File</h2>
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
          {/* Source Tabs */}
          <div style={styles.sourceTabs}>
            <button
              style={{
                ...styles.sourceTab,
                ...(source === 'file' ? styles.sourceTabActive : {}),
              }}
              onClick={() => {
                setSource('file');
                setDetectedFile(null);
                setError(null);
              }}
            >
              <FileIcon />
              File Upload
            </button>
            <button
              style={{
                ...styles.sourceTab,
                ...(source === 'url' ? styles.sourceTabActive : {}),
              }}
              onClick={() => {
                setSource('url');
                setDetectedFile(null);
                setError(null);
              }}
            >
              <LinkIcon />
              URL Import
            </button>
          </div>

          {/* File Upload Section */}
          {source === 'file' && (
            <DropZone
              onFileSelect={handleFileSelect}
              selectedFile={detectedFile}
              error={error}
            />
          )}

          {/* URL Import Section */}
          {source === 'url' && (
            <div style={styles.urlSection}>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={styles.urlInput}
                placeholder="https://example.com/image.svg"
                onKeyDown={(e) => e.key === 'Enter' && handleUrlFetch()}
              />
              <button
                style={styles.fetchButton}
                onClick={handleUrlFetch}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ animation: 'spin 1s linear infinite' }}
                    >
                      <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
                    </svg>
                    Fetching...
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
                    >
                      <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    Fetch from URL
                  </>
                )}
              </button>

              {/* URL Preview */}
              {detectedFile && source === 'url' && (
                <div
                  style={{
                    padding: '12px',
                    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color, #333)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={detectedFile.preview}
                      alt="Preview"
                      style={{
                        width: '48px',
                        height: '48px',
                        objectFit: 'contain',
                        backgroundColor: '#ffffff',
                        borderRadius: '4px',
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                          color: 'var(--text-primary, #ffffff)',
                        }}
                      >
                        {detectedFile.name}
                      </div>
                      <span style={styles.formatBadge}>
                        {detectedFile.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div
                  style={{
                    padding: '12px',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    borderRadius: '6px',
                    border: '1px solid rgba(244, 67, 54, 0.3)',
                    color: '#f44336',
                    fontSize: '13px',
                  }}
                >
                  {error}
                </div>
              )}
            </div>
          )}

          {/* Supported Formats Info */}
          <div style={styles.formatInfo}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted, #666)' }}>
              Supported formats:
            </span>
            <span style={styles.formatBadge}>SVG</span>
            <span style={styles.formatBadge}>PNG</span>
            <span style={styles.formatBadge}>JPEG</span>
            <span style={styles.formatBadge}>GIF</span>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <button
            style={{ ...styles.button, ...styles.cancelButton }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            style={{
              ...styles.button,
              ...(canImport ? styles.importButton : styles.importButtonDisabled),
            }}
            onClick={handleImport}
            disabled={!canImport}
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Import
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImportDialog;
