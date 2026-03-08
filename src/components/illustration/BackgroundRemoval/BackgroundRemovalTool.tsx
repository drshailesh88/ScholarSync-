/**
 * Background Removal Tool Component
 * Drag-and-drop image upload with background removal preview
 *
 * @module components/BackgroundRemoval/BackgroundRemovalTool
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  removeImageBackground,
  isBackgroundRemovalSupported,
  createPreviewUrl,
  revokePreviewUrl,
  type BackgroundRemovalStage,
  type BackgroundRemovalResult,
  BackgroundRemovalError,
} from '@/lib/illustration/lib/image';
import { useCanvas } from '../Canvas/CanvasContext';
import { FabricImage } from 'fabric';

// ============================================================================
// Types
// ============================================================================

export interface BackgroundRemovalToolProps {
  /** Whether the tool panel is open */
  isOpen?: boolean;
  /** Callback when panel is closed */
  onClose?: () => void;
  /** Callback when image is applied to canvas */
  onApply?: (blob: Blob) => void;
}

interface ProcessingState {
  isProcessing: boolean;
  progress: number;
  stage: BackgroundRemovalStage | null;
  error: string | null;
}

// ============================================================================
// Styles
// ============================================================================

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    padding: '16px',
    backgroundColor: 'var(--bg-secondary, #1e1e1e)',
    borderRadius: '8px',
    maxWidth: '480px',
    width: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--border-color, #333)',
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary, #ffffff)',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  closeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    padding: 0,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'var(--text-secondary, #9d9d9d)',
    transition: 'all 150ms ease',
  },
  dropZone: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '32px 20px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '2px dashed var(--border-color, #444)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    minHeight: '160px',
  },
  dropZoneActive: {
    borderColor: 'var(--accent-primary, #3b82f6)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  dropZoneDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  uploadIcon: {
    color: 'var(--text-muted, #666)',
  },
  uploadText: {
    fontSize: '14px',
    color: 'var(--text-secondary, #9d9d9d)',
    textAlign: 'center' as const,
  },
  browseLink: {
    color: 'var(--accent-primary, #3b82f6)',
    fontWeight: 500,
  },
  supportedFormats: {
    fontSize: '12px',
    color: 'var(--text-muted, #666)',
  },
  previewContainer: {
    display: 'flex',
    gap: '12px',
    padding: '12px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    borderRadius: '8px',
  },
  previewBox: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  previewLabel: {
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-secondary, #9d9d9d)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  previewImage: {
    width: '100%',
    aspectRatio: '1',
    objectFit: 'contain' as const,
    backgroundColor: '#ffffff',
    borderRadius: '6px',
    border: '1px solid var(--border-color, #333)',
  },
  checkerboard: {
    backgroundImage: `
      linear-gradient(45deg, #ccc 25%, transparent 25%),
      linear-gradient(-45deg, #ccc 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #ccc 75%),
      linear-gradient(-45deg, transparent 75%, #ccc 75%)
    `,
    backgroundSize: '16px 16px',
    backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
  },
  progressContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
    padding: '16px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    borderRadius: '8px',
  },
  progressBar: {
    height: '8px',
    backgroundColor: 'var(--bg-primary, #121212)',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'var(--accent-primary, #3b82f6)',
    borderRadius: '4px',
    transition: 'width 150ms ease',
  },
  progressText: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: 'var(--text-secondary, #9d9d9d)',
  },
  buttonRow: {
    display: 'flex',
    gap: '8px',
  },
  button: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: 500,
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    border: 'none',
  },
  primaryButton: {
    backgroundColor: 'var(--accent-primary, #3b82f6)',
    color: '#ffffff',
  },
  secondaryButton: {
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    color: 'var(--text-primary, #ffffff)',
    border: '1px solid var(--border-color, #333)',
  },
  disabledButton: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  error: {
    padding: '12px',
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRadius: '6px',
    border: '1px solid rgba(244, 67, 54, 0.3)',
    color: '#f44336',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
  },
  info: {
    padding: '12px',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '6px',
    fontSize: '12px',
    color: 'var(--text-secondary, #9d9d9d)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  hiddenInput: {
    display: 'none',
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    color: 'var(--text-muted, #666)',
    padding: '8px 0',
  },
};

// ============================================================================
// Icons
// ============================================================================

const UploadIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const MagicWandIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 4V2" />
    <path d="M15 16v-2" />
    <path d="M8 9h2" />
    <path d="M20 9h2" />
    <path d="M17.8 11.8L19 13" />
    <path d="M15 9h.01" />
    <path d="M17.8 6.2L19 5" />
    <path d="m3 21 9-9" />
    <path d="M12.2 6.2L11 5" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ============================================================================
// Helper Functions
// ============================================================================

function getStageLabel(stage: BackgroundRemovalStage | null): string {
  switch (stage) {
    case 'loading-model':
      return 'Loading AI model...';
    case 'processing':
      return 'Removing background...';
    case 'encoding':
      return 'Encoding result...';
    case 'complete':
      return 'Complete!';
    default:
      return 'Processing...';
  }
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatTime(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

// ============================================================================
// Component
// ============================================================================

export function BackgroundRemovalTool({
  isOpen = true,
  onClose,
  onApply,
}: BackgroundRemovalToolProps): JSX.Element | null {
  // State
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [result, setResult] = useState<BackgroundRemovalResult | null>(null);
  const [resultPreview, setResultPreview] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [processingState, setProcessingState] = useState<ProcessingState>({
    isProcessing: false,
    progress: 0,
    stage: null,
    error: null,
  });

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Canvas context for applying to canvas
  const canvasContext = useCanvas();

  // Check browser support
  const isSupported = isBackgroundRemovalSupported();

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      if (originalPreview) revokePreviewUrl(originalPreview);
      if (resultPreview) revokePreviewUrl(resultPreview);
    };
  }, [originalPreview, resultPreview]);

  // Handle file selection
  const handleFileSelect = useCallback(async (file: File) => {
    // Cleanup previous previews
    if (originalPreview) revokePreviewUrl(originalPreview);
    if (resultPreview) revokePreviewUrl(resultPreview);

    // Reset state
    setResult(null);
    setResultPreview(null);
    setProcessingState({
      isProcessing: false,
      progress: 0,
      stage: null,
      error: null,
    });

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setProcessingState((prev) => ({
        ...prev,
        error: 'Please select an image file (PNG, JPG, WebP)',
      }));
      return;
    }

    // Create preview
    const preview = URL.createObjectURL(file);
    setOriginalFile(file);
    setOriginalPreview(preview);
  }, [originalPreview, resultPreview]);

  // Process image
  const processImage = useCallback(async () => {
    if (!originalFile) return;

    setProcessingState({
      isProcessing: true,
      progress: 0,
      stage: 'loading-model',
      error: null,
    });

    try {
      const processedResult = await removeImageBackground(originalFile, {
        onProgress: (progress, stage) => {
          setProcessingState((prev) => ({
            ...prev,
            progress,
            stage: stage || prev.stage,
          }));
        },
      });

      // Create preview URL
      const preview = createPreviewUrl(processedResult);
      setResult(processedResult);
      setResultPreview(preview);

      setProcessingState({
        isProcessing: false,
        progress: 1,
        stage: 'complete',
        error: null,
      });
    } catch (error) {
      const message =
        error instanceof BackgroundRemovalError
          ? error.message
          : 'Failed to remove background. Please try again.';

      setProcessingState({
        isProcessing: false,
        progress: 0,
        stage: null,
        error: message,
      });
    }
  }, [originalFile]);

  // Apply to canvas
  const handleApplyToCanvas = useCallback(async () => {
    if (!result || !canvasContext.canvas) return;

    try {
      // Create image URL from blob
      const imageUrl = createPreviewUrl(result);

      // Load as Fabric image
      const img = await FabricImage.fromURL(imageUrl);

      // Scale to fit canvas
      const canvas = canvasContext.canvas;
      const canvasWidth = canvas.width || 800;
      const canvasHeight = canvas.height || 600;
      const maxWidth = canvasWidth * 0.8;
      const maxHeight = canvasHeight * 0.8;

      const scaleX = maxWidth / (img.width || 1);
      const scaleY = maxHeight / (img.height || 1);
      const scale = Math.min(scaleX, scaleY, 1);

      img.scale(scale);
      img.set({
        left: (canvasWidth - (img.width || 0) * scale) / 2,
        top: (canvasHeight - (img.height || 0) * scale) / 2,
      });

      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();

      // Cleanup
      revokePreviewUrl(imageUrl);

      // Call onApply callback
      if (onApply) {
        onApply(result.blob);
      }

      // Close panel
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Failed to apply image to canvas:', error);
      setProcessingState((prev) => ({
        ...prev,
        error: 'Failed to add image to canvas. Please try again.',
      }));
    }
  }, [result, canvasContext, onApply, onClose]);

  // Reset state
  const handleReset = useCallback(() => {
    if (originalPreview) revokePreviewUrl(originalPreview);
    if (resultPreview) revokePreviewUrl(resultPreview);

    setOriginalFile(null);
    setOriginalPreview(null);
    setResult(null);
    setResultPreview(null);
    setProcessingState({
      isProcessing: false,
      progress: 0,
      stage: null,
      error: null,
    });
  }, [originalPreview, resultPreview]);

  // Drag and drop handlers
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
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  const handleClick = useCallback(() => {
    if (!processingState.isProcessing) {
      fileInputRef.current?.click();
    }
  }, [processingState.isProcessing]);

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFileSelect(files[0]);
      }
      e.target.value = '';
    },
    [handleFileSelect]
  );

  // Don't render if not open
  if (!isOpen) return null;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h3 style={styles.title}>
          <MagicWandIcon />
          Background Removal
        </h3>
        {onClose && (
          <button
            style={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {/* Browser support warning */}
      {!isSupported && (
        <div style={styles.error}>
          <ErrorIcon />
          <span>
            Background removal is not supported in this browser. Please use a
            modern browser with WebAssembly support.
          </span>
        </div>
      )}

      {/* Drop zone (shown when no file selected) */}
      {!originalFile && isSupported && (
        <>
          <div
            style={{
              ...styles.dropZone,
              ...(isDragActive ? styles.dropZoneActive : {}),
              ...(processingState.isProcessing ? styles.dropZoneDisabled : {}),
            }}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            aria-label="Drop zone for image upload"
          >
            <span style={styles.uploadIcon}>
              <UploadIcon />
            </span>
            <div style={styles.uploadText}>
              {isDragActive ? (
                <span>Drop your image here</span>
              ) : (
                <>
                  <span>Drag & drop an image, or </span>
                  <span style={styles.browseLink}>browse</span>
                </>
              )}
            </div>
            <span style={styles.supportedFormats}>PNG, JPG, WebP up to 10MB</span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            style={styles.hiddenInput}
            onChange={handleFileInputChange}
          />

          <div style={styles.info}>
            <InfoIcon />
            <span>
              AI-powered background removal runs entirely in your browser. No
              data is sent to any server.
            </span>
          </div>
        </>
      )}

      {/* Preview (shown when file selected) */}
      {originalFile && (
        <>
          <div style={styles.previewContainer}>
            <div style={styles.previewBox}>
              <span style={styles.previewLabel}>Original</span>
              {originalPreview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={originalPreview}
                  alt="Original"
                  style={styles.previewImage}
                />
              )}
            </div>
            <div style={styles.previewBox}>
              <span style={styles.previewLabel}>Result</span>
              {resultPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={resultPreview}
                  alt="Background removed"
                  style={{ ...styles.previewImage, ...styles.checkerboard }}
                />
              ) : (
                <div
                  style={{
                    ...styles.previewImage,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted, #666)',
                    fontSize: '12px',
                  }}
                >
                  {processingState.isProcessing ? 'Processing...' : 'Click "Remove Background"'}
                </div>
              )}
            </div>
          </div>

          {/* Processing progress */}
          {processingState.isProcessing && (
            <div style={styles.progressContainer}>
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${processingState.progress * 100}%`,
                  }}
                />
              </div>
              <div style={styles.progressText}>
                <span>{getStageLabel(processingState.stage)}</span>
                <span>{Math.round(processingState.progress * 100)}%</span>
              </div>
            </div>
          )}

          {/* Error message */}
          {processingState.error && (
            <div style={styles.error}>
              <ErrorIcon />
              <span>{processingState.error}</span>
            </div>
          )}

          {/* Stats (shown after processing) */}
          {result && (
            <div style={styles.stats}>
              <span>
                Size: {result.width} x {result.height}px
              </span>
              <span>Processed in {formatTime(result.processingTime)}</span>
              <span>Output: {formatFileSize(result.blob.size)}</span>
            </div>
          )}

          {/* Action buttons */}
          <div style={styles.buttonRow}>
            <button
              style={{
                ...styles.button,
                ...styles.secondaryButton,
                ...(processingState.isProcessing ? styles.disabledButton : {}),
              }}
              onClick={handleReset}
              disabled={processingState.isProcessing}
            >
              Reset
            </button>

            {!result ? (
              <button
                style={{
                  ...styles.button,
                  ...styles.primaryButton,
                  ...(processingState.isProcessing ? styles.disabledButton : {}),
                }}
                onClick={processImage}
                disabled={processingState.isProcessing}
              >
                <MagicWandIcon />
                {processingState.isProcessing ? 'Processing...' : 'Remove Background'}
              </button>
            ) : (
              <button
                style={{
                  ...styles.button,
                  ...styles.primaryButton,
                }}
                onClick={handleApplyToCanvas}
              >
                <CheckIcon />
                Apply to Canvas
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default BackgroundRemovalTool;
