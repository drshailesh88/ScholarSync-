/**
 * AI Generation Tool Component
 * Generate images using fal.ai FLUX models
 *
 * @module components/AIGeneration/AIGenerationTool
 */

import { useState, useCallback, useEffect } from 'react';
import {
  generateScientificDiagram,
  configureFalClient,
  downloadImageAsBlob,
  estimateCost,
  getModelInfo,
  ImageGenerationError,
  type IllustrationStyle,
  type FluxModel,
  type GenerationResult,
  type ImageSize,
} from '@/lib/illustration/lib/ai';
import { useCanvas } from '../Canvas/CanvasContext';
import { FabricImage } from 'fabric';

// ============================================================================
// Types
// ============================================================================

export interface AIGenerationToolProps {
  /** Whether the tool panel is open */
  isOpen?: boolean;
  /** Callback when panel is closed */
  onClose?: () => void;
  /** Callback when image is applied to canvas */
  onApply?: (blob: Blob) => void;
  /** Default API key (optional, for pre-configured usage) */
  defaultApiKey?: string;
}

interface GeneratingState {
  isGenerating: boolean;
  progress: number;
  status: string;
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
    maxWidth: '520px',
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
  section: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px',
  },
  label: {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-secondary, #9d9d9d)',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    color: 'var(--text-primary, #ffffff)',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    outline: 'none',
    transition: 'border-color 150ms ease',
    boxSizing: 'border-box' as const,
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    color: 'var(--text-primary, #ffffff)',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    outline: 'none',
    transition: 'border-color 150ms ease',
    resize: 'vertical' as const,
    minHeight: '80px',
    fontFamily: 'inherit',
    boxSizing: 'border-box' as const,
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    fontSize: '14px',
    color: 'var(--text-primary, #ffffff)',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    outline: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box' as const,
  },
  row: {
    display: 'flex',
    gap: '12px',
  },
  column: {
    flex: 1,
  },
  styleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
  },
  styleOption: {
    padding: '10px 8px',
    fontSize: '12px',
    fontWeight: 500,
    textAlign: 'center' as const,
    color: 'var(--text-secondary, #9d9d9d)',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  styleOptionActive: {
    color: 'var(--text-primary, #ffffff)',
    backgroundColor: 'var(--accent-primary, #3b82f6)',
    borderColor: 'var(--accent-primary, #3b82f6)',
  },
  previewContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    padding: '12px',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
    borderRadius: '8px',
  },
  previewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px',
  },
  previewImage: {
    width: '100%',
    aspectRatio: '1',
    objectFit: 'cover' as const,
    borderRadius: '6px',
    border: '1px solid var(--border-color, #333)',
    cursor: 'pointer',
    transition: 'transform 150ms ease, border-color 150ms ease',
  },
  previewImageSelected: {
    borderColor: 'var(--accent-primary, #3b82f6)',
    borderWidth: '2px',
  },
  singlePreview: {
    width: '100%',
    maxHeight: '300px',
    objectFit: 'contain' as const,
    borderRadius: '6px',
    border: '1px solid var(--border-color, #333)',
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
  costBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    fontSize: '11px',
    fontWeight: 500,
    color: 'var(--text-muted, #666)',
    backgroundColor: 'var(--bg-primary, #121212)',
    borderRadius: '4px',
  },
  apiKeyInput: {
    display: 'flex',
    gap: '8px',
    alignItems: 'flex-start',
  },
  apiKeyHint: {
    fontSize: '11px',
    color: 'var(--text-muted, #666)',
    marginTop: '4px',
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

const SparklesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    <path d="M20 3v4" />
    <path d="M22 5h-4" />
    <path d="M4 17v2" />
    <path d="M5 18H3" />
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

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const KeyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="m21 2-9.6 9.6" />
    <path d="m15.5 7.5 3 3L22 7l-3-3" />
  </svg>
);

// ============================================================================
// Constants
// ============================================================================

const STYLE_OPTIONS: Array<{ value: IllustrationStyle; label: string }> = [
  { value: 'clean', label: 'Clean Vector' },
  { value: 'detailed', label: 'Detailed' },
  { value: 'sketch', label: 'Sketch' },
  { value: 'diagram', label: 'Diagram' },
  { value: 'photorealistic', label: 'Realistic' },
];

const SIZE_OPTIONS: Array<{ value: ImageSize; label: string }> = [
  { value: 'square_hd', label: 'Square (1024x1024)' },
  { value: 'landscape_4_3', label: 'Landscape 4:3' },
  { value: 'portrait_4_3', label: 'Portrait 4:3' },
  { value: 'landscape_16_9', label: 'Landscape 16:9' },
  { value: 'portrait_16_9', label: 'Portrait 16:9' },
];

const MODEL_OPTIONS: Array<{ value: FluxModel; label: string }> = [
  { value: 'fal-ai/flux/schnell', label: 'Fast (~$0.008)' },
  { value: 'fal-ai/flux/dev', label: 'Quality (~$0.012)' },
  { value: 'fal-ai/flux-pro', label: 'Pro (~$0.03)' },
];

// Local storage key for API key
const API_KEY_STORAGE_KEY = 'finnish_fal_api_key';

// ============================================================================
// Component
// ============================================================================

export function AIGenerationTool({
  isOpen = true,
  onClose,
  onApply,
  defaultApiKey,
}: AIGenerationToolProps): JSX.Element | null {
  // State
  const [apiKey, setApiKey] = useState<string>(() => {
    // Try to load from localStorage
    if (typeof window !== 'undefined') {
      return localStorage.getItem(API_KEY_STORAGE_KEY) || defaultApiKey || '';
    }
    return defaultApiKey || '';
  });
  const [isApiKeyConfigured, setIsApiKeyConfigured] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<IllustrationStyle>('clean');
  const [imageSize, setImageSize] = useState<ImageSize>('square_hd');
  const [model, setModel] = useState<FluxModel>('fal-ai/flux/schnell');
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [generatingState, setGeneratingState] = useState<GeneratingState>({
    isGenerating: false,
    progress: 0,
    status: '',
    error: null,
  });

  // Canvas context
  const canvasContext = useCanvas();

  // Configure API key on mount or when it changes
  useEffect(() => {
    if (apiKey) {
      try {
        configureFalClient(apiKey);
        setIsApiKeyConfigured(true);
        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
        }
      } catch {
        setIsApiKeyConfigured(false);
      }
    } else {
      setIsApiKeyConfigured(false);
    }
  }, [apiKey]);

  // Handle generation
  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setGeneratingState((prev) => ({ ...prev, error: 'Please enter a prompt' }));
      return;
    }

    if (!isApiKeyConfigured) {
      setGeneratingState((prev) => ({ ...prev, error: 'Please enter your fal.ai API key' }));
      return;
    }

    setGeneratingState({
      isGenerating: true,
      progress: 0,
      status: 'Starting...',
      error: null,
    });
    setResult(null);

    try {
      const generationResult = await generateScientificDiagram(
        prompt,
        style,
        undefined,
        (progress, status) => {
          setGeneratingState((prev) => ({
            ...prev,
            progress,
            status,
          }));
        }
      );

      setResult(generationResult);
      setSelectedImageIndex(0);
      setGeneratingState({
        isGenerating: false,
        progress: 1,
        status: 'Complete!',
        error: null,
      });
    } catch (error) {
      const message =
        error instanceof ImageGenerationError
          ? error.message
          : 'Failed to generate image. Please try again.';

      setGeneratingState({
        isGenerating: false,
        progress: 0,
        status: '',
        error: message,
      });
    }
  }, [prompt, style, isApiKeyConfigured]);

  // Handle apply to canvas
  const handleApplyToCanvas = useCallback(async () => {
    if (!result || !canvasContext.canvas) return;

    const selectedImage = result.images[selectedImageIndex];
    if (!selectedImage) return;

    try {
      // Download the image as blob
      const blob = await downloadImageAsBlob(selectedImage.url);

      // Create object URL
      const imageUrl = URL.createObjectURL(blob);

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
      URL.revokeObjectURL(imageUrl);

      // Call onApply callback
      if (onApply) {
        onApply(blob);
      }

      // Close panel
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Failed to apply image to canvas:', error);
      setGeneratingState((prev) => ({
        ...prev,
        error: 'Failed to add image to canvas. Please try again.',
      }));
    }
  }, [result, selectedImageIndex, canvasContext, onApply, onClose]);

  // Reset state
  const handleReset = useCallback(() => {
    setPrompt('');
    setResult(null);
    setSelectedImageIndex(0);
    setGeneratingState({
      isGenerating: false,
      progress: 0,
      status: '',
      error: null,
    });
  }, []);

  // Don't render if not open
  if (!isOpen) return null;

  const modelInfo = getModelInfo(model);
  const estimatedCost = estimateCost(model, 1);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h3 style={styles.title}>
          <SparklesIcon />
          AI Image Generation
        </h3>
        {onClose && (
          <button style={styles.closeButton} onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        )}
      </div>

      {/* API Key Input (only if not configured) */}
      {!isApiKeyConfigured && (
        <div style={styles.section}>
          <label style={styles.label}>
            <KeyIcon /> fal.ai API Key
          </label>
          <div style={styles.apiKeyInput}>
            <input
              type="password"
              style={{ ...styles.input, flex: 1 }}
              placeholder="Enter your fal.ai API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
          <div style={styles.apiKeyHint}>
            Get your API key at{' '}
            <a
              href="https://fal.ai/dashboard/keys"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent-primary, #3b82f6)' }}
            >
              fal.ai/dashboard/keys
            </a>
          </div>
        </div>
      )}

      {/* Prompt Input */}
      <div style={styles.section}>
        <label style={styles.label}>Describe your illustration</label>
        <textarea
          style={styles.textarea}
          placeholder="e.g., Human heart anatomy with labeled chambers and valves, detailed cross-section view"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={generatingState.isGenerating}
        />
      </div>

      {/* Style Selection */}
      <div style={styles.section}>
        <label style={styles.label}>Style</label>
        <div style={styles.styleGrid}>
          {STYLE_OPTIONS.map((option) => (
            <button
              key={option.value}
              style={{
                ...styles.styleOption,
                ...(style === option.value ? styles.styleOptionActive : {}),
              }}
              onClick={() => setStyle(option.value)}
              disabled={generatingState.isGenerating}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Size and Model Selection */}
      <div style={styles.row}>
        <div style={{ ...styles.inputGroup, ...styles.column }}>
          <label style={styles.label}>Size</label>
          <select
            style={styles.select}
            value={imageSize}
            onChange={(e) => setImageSize(e.target.value as ImageSize)}
            disabled={generatingState.isGenerating}
          >
            {SIZE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ ...styles.inputGroup, ...styles.column }}>
          <label style={styles.label}>Model</label>
          <select
            style={styles.select}
            value={model}
            onChange={(e) => setModel(e.target.value as FluxModel)}
            disabled={generatingState.isGenerating}
          >
            {MODEL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cost Estimate */}
      <div style={styles.info}>
        <InfoIcon />
        <span>
          Estimated cost: <strong>${estimatedCost.toFixed(3)}</strong> per image ({modelInfo.averageTime})
        </span>
      </div>

      {/* Error Display */}
      {generatingState.error && (
        <div style={styles.error}>
          <ErrorIcon />
          <span>{generatingState.error}</span>
        </div>
      )}

      {/* Progress */}
      {generatingState.isGenerating && (
        <div style={styles.progressContainer}>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${generatingState.progress * 100}%`,
              }}
            />
          </div>
          <div style={styles.progressText}>
            <span>{generatingState.status}</span>
            <span>{Math.round(generatingState.progress * 100)}%</span>
          </div>
        </div>
      )}

      {/* Result Preview */}
      {result && result.images.length > 0 && (
        <div style={styles.previewContainer}>
          {result.images.length === 1 ? (
            <img
              src={result.images[0].url}
              alt="Generated illustration"
              style={styles.singlePreview}
            />
          ) : (
            <div style={styles.previewGrid}>
              {result.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Generated illustration ${index + 1}`}
                  style={{
                    ...styles.previewImage,
                    ...(selectedImageIndex === index ? styles.previewImageSelected : {}),
                  }}
                  onClick={() => setSelectedImageIndex(index)}
                />
              ))}
            </div>
          )}
          <div style={styles.stats}>
            <span>
              {result.images[selectedImageIndex].width} x {result.images[selectedImageIndex].height}px
            </span>
            <span>Seed: {result.seed}</span>
            <span>Generated in {result.timings.inference.toFixed(1)}s</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={styles.buttonRow}>
        {result ? (
          <>
            <button
              style={{
                ...styles.button,
                ...styles.secondaryButton,
              }}
              onClick={handleReset}
            >
              New Generation
            </button>
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
          </>
        ) : (
          <button
            style={{
              ...styles.button,
              ...styles.primaryButton,
              ...(generatingState.isGenerating || !prompt.trim() || !isApiKeyConfigured
                ? styles.disabledButton
                : {}),
            }}
            onClick={handleGenerate}
            disabled={generatingState.isGenerating || !prompt.trim() || !isApiKeyConfigured}
          >
            <SparklesIcon />
            {generatingState.isGenerating ? 'Generating...' : 'Generate Image'}
          </button>
        )}
      </div>
    </div>
  );
}

export default AIGenerationTool;
