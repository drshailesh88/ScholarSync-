/**
 * DropZone Component
 * Drag and drop area for file imports with preview thumbnail
 *
 * @module components/ImportDialog/DropZone
 */

import React, { useState, useCallback, useRef } from 'react';

// ============================================================================
// Types
// ============================================================================

export interface DetectedFile {
  name: string;
  type: string;
  size: number;
  preview?: string;
}

export interface DropZoneProps {
  /** Callback when a file is selected */
  onFileSelect: (file: File) => void;
  /** Currently selected file info */
  selectedFile: DetectedFile | null;
  /** Error message to display */
  error: string | null;
}

// ============================================================================
// Constants
// ============================================================================

const ACCEPTED_TYPES = [
  'image/svg+xml',
  'image/png',
  'image/jpeg',
  'image/gif',
];

const ACCEPTED_EXTENSIONS = ['.svg', '.png', '.jpg', '.jpeg', '.gif'];

// ============================================================================
// Styles
// ============================================================================

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  dropZone: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    padding: '40px 20px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '2px dashed var(--border-color, #444)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    minHeight: '180px',
  },
  dropZoneActive: {
    borderColor: 'var(--accent-primary, #3b82f6)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  dropZoneError: {
    borderColor: '#f44336',
    backgroundColor: 'rgba(244, 67, 54, 0.05)',
  },
  icon: {
    color: 'var(--text-muted, #666)',
    transition: 'color 150ms ease',
  },
  iconActive: {
    color: 'var(--accent-primary, #3b82f6)',
  },
  text: {
    fontSize: '14px',
    color: 'var(--text-secondary, #9d9d9d)',
    textAlign: 'center' as const,
  },
  browseLink: {
    color: 'var(--accent-primary, #3b82f6)',
    fontWeight: 500,
    cursor: 'pointer',
  },
  hint: {
    fontSize: '12px',
    color: 'var(--text-muted, #666)',
  },
  hiddenInput: {
    display: 'none',
  },
  preview: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '8px',
  },
  thumbnail: {
    width: '64px',
    height: '64px',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    border: '1px solid var(--border-color, #333)',
  },
  thumbnailImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain' as const,
  },
  fileInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  fileName: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-primary, #ffffff)',
    wordBreak: 'break-all' as const,
  },
  fileDetails: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: 'var(--text-muted, #666)',
  },
  typeBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 6px',
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 500,
    color: 'var(--accent-primary, #3b82f6)',
    textTransform: 'uppercase' as const,
  },
  removeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    padding: 0,
    backgroundColor: 'transparent',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    cursor: 'pointer',
    color: 'var(--text-secondary, #9d9d9d)',
    transition: 'all 150ms ease',
  },
  error: {
    padding: '12px',
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
// Utility Functions
// ============================================================================

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ============================================================================
// Icons
// ============================================================================

const UploadIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const FileImageIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

// ============================================================================
// Component
// ============================================================================

export function DropZone({
  onFileSelect,
  selectedFile,
  error,
}: DropZoneProps): JSX.Element {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragActive(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (ACCEPTED_TYPES.includes(file.type) || isValidExtension(file.name)) {
          onFileSelect(file);
        }
      }
    },
    [onFileSelect]
  );

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onFileSelect(files[0]);
      }
      // Reset input so the same file can be selected again
      e.target.value = '';
    },
    [onFileSelect]
  );

  function isValidExtension(filename: string): boolean {
    const ext = '.' + filename.toLowerCase().split('.').pop();
    return ACCEPTED_EXTENSIONS.includes(ext);
  }

  return (
    <div style={styles.container}>
      {/* File Preview (when file is selected) */}
      {selectedFile && !error && (
        <div style={styles.preview}>
          <div style={styles.thumbnail}>
            {selectedFile.preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt="Preview"
                src={selectedFile.preview}
                style={styles.thumbnailImage}
              />
            ) : (
              <FileImageIcon />
            )}
          </div>
          <div style={styles.fileInfo}>
            <span style={styles.fileName}>{selectedFile.name}</span>
            <div style={styles.fileDetails}>
              <span style={styles.typeBadge}>{selectedFile.type}</span>
              {selectedFile.size > 0 && (
                <span>{formatFileSize(selectedFile.size)}</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Drop Zone */}
      <div
        style={{
          ...styles.dropZone,
          ...(isDragActive ? styles.dropZoneActive : {}),
          ...(error ? styles.dropZoneError : {}),
        }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Drop zone for file upload"
      >
        <span
          style={{
            ...styles.icon,
            ...(isDragActive ? styles.iconActive : {}),
          }}
        >
          <UploadIcon />
        </span>

        <div style={styles.text}>
          {isDragActive ? (
            <span>Drop your file here</span>
          ) : (
            <>
              <span>Drag & drop your file here, or </span>
              <span style={styles.browseLink}>browse</span>
            </>
          )}
        </div>

        <span style={styles.hint}>SVG, PNG, JPEG, or GIF up to 50MB</span>

        <input aria-label="File upload"
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS.join(',')}
          style={styles.hiddenInput}
          onChange={handleFileInputChange}
/>
      </div>

      {/* Error Message */}
      {error && (
        <div style={styles.error}>
          <ErrorIcon />
          {error}
        </div>
      )}

      {/* Drag & Drop Tip */}
      {!selectedFile && !error && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '6px',
            fontSize: '12px',
            color: 'var(--text-secondary, #9d9d9d)',
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span>
            <strong>Tip:</strong> You can also paste images directly with Ctrl+V
          </span>
        </div>
      )}
    </div>
  );
}

export default DropZone;
