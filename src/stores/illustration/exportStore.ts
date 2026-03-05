/**
 * FINNISH Export Store
 * Zustand store for managing export state and progress
 *
 * @module store/exportStore
 */

import { create } from 'zustand';
import { subscribeWithSelector, devtools } from 'zustand/middleware';
import type {
  ExportState,
  ExportStore,
  ExportFormat,
  ExportDPI,
  ExportStage,
} from '@/lib/illustration/types/index';

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_FORMAT: ExportFormat = 'png';
const DEFAULT_QUALITY = 100;
const DEFAULT_DPI: ExportDPI = 300;

// ============================================================================
// Initial State
// ============================================================================

const initialState: ExportState = {
  format: DEFAULT_FORMAT,
  quality: DEFAULT_QUALITY,
  dpi: DEFAULT_DPI,
  isExporting: false,
  progress: 0,
  stage: 'preparing',
  error: null,
};

// ============================================================================
// Store Implementation
// ============================================================================

/**
 * Export store for managing export settings and progress
 *
 * @example
 * ```tsx
 * import { useExportStore } from '@/store';
 *
 * function ExportPanel() {
 *   const { format, quality, dpi, isExporting, progress } = useExportStore();
 *   const { setFormat, setQuality, setDPI, startExport } = useExportStore();
 *
 *   return (
 *     <div>
 *       <select value={format} onChange={(e) => setFormat(e.target.value)}>
 *         <option value="png">PNG</option>
 *         <option value="svg">SVG</option>
 *         <option value="pdf">PDF</option>
 *         <option value="tikz">TikZ</option>
 *       </select>
 *
 *       <input
 *         type="range"
 *         min={0}
 *         max={100}
 *         value={quality}
 *         onChange={(e) => setQuality(Number(e.target.value))}
 *       />
 *
 *       {isExporting && <ProgressBar value={progress} />}
 *     </div>
 *   );
 * }
 * ```
 */
export const useExportStore = create<ExportStore>()(
  devtools(
    subscribeWithSelector((set, _get) => ({
      ...initialState,

      // ========================================================================
      // Format Settings
      // ========================================================================

      /**
       * Set the export format
       * @param format - The export format ('png' | 'svg' | 'pdf' | 'tikz')
       */
      setFormat: (format: ExportFormat) => {
        set({ format }, false, 'setFormat');
      },

      /**
       * Set the export quality (0-100)
       * Only applicable for raster formats (PNG)
       * @param quality - Quality value from 0 to 100
       */
      setQuality: (quality: number) => {
        // Clamp quality between 0 and 100
        const clampedQuality = Math.min(Math.max(quality, 0), 100);
        set({ quality: clampedQuality }, false, 'setQuality');
      },

      /**
       * Set the export DPI
       * Only applicable for raster formats (PNG, PDF)
       * @param dpi - DPI value (72 | 150 | 300 | 600)
       */
      setDPI: (dpi: ExportDPI) => {
        // Validate DPI is one of the allowed values
        const validDPIs: ExportDPI[] = [72, 150, 300, 600];
        if (validDPIs.includes(dpi)) {
          set({ dpi }, false, 'setDPI');
        }
      },

      // ========================================================================
      // Export Operations
      // ========================================================================

      /**
       * Start an export operation
       * Resets progress and sets exporting state
       */
      startExport: () => {
        set(
          {
            isExporting: true,
            progress: 0,
            stage: 'preparing',
            error: null,
          },
          false,
          'startExport'
        );
      },

      /**
       * Update export progress
       * @param progress - Progress percentage (0-100)
       * @param stage - Optional export stage
       */
      updateProgress: (progress: number, stage?: ExportStage) => {
        const clampedProgress = Math.min(Math.max(progress, 0), 100);

        set(
          (state) => ({
            progress: clampedProgress,
            stage: stage ?? state.stage,
          }),
          false,
          'updateProgress'
        );
      },

      /**
       * Finish the export operation
       * @param success - Whether the export succeeded
       * @param error - Optional error message if failed
       */
      finishExport: (success: boolean, error?: string) => {
        set(
          {
            isExporting: false,
            progress: success ? 100 : 0,
            stage: success ? 'complete' : 'error',
            error: success ? null : (error ?? 'Export failed'),
          },
          false,
          'finishExport'
        );
      },

      /**
       * Reset export state to initial values
       */
      resetExport: () => {
        set(
          {
            isExporting: false,
            progress: 0,
            stage: 'preparing',
            error: null,
          },
          false,
          'resetExport'
        );
      },
    })),
    {
      name: 'finnish-export-store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);

// ============================================================================
// Export Configuration Helpers
// ============================================================================

/**
 * Get format-specific configuration
 * @param format - Export format
 * @returns Configuration object for the format
 */
export const getFormatConfig = (format: ExportFormat) => {
  const configs: Record<
    ExportFormat,
    {
      extension: string;
      mimeType: string;
      supportsQuality: boolean;
      supportsDPI: boolean;
      description: string;
    }
  > = {
    png: {
      extension: '.png',
      mimeType: 'image/png',
      supportsQuality: true,
      supportsDPI: true,
      description: 'Portable Network Graphics - Raster image format',
    },
    svg: {
      extension: '.svg',
      mimeType: 'image/svg+xml',
      supportsQuality: false,
      supportsDPI: false,
      description: 'Scalable Vector Graphics - Vector image format',
    },
    pdf: {
      extension: '.pdf',
      mimeType: 'application/pdf',
      supportsQuality: true,
      supportsDPI: true,
      description: 'Portable Document Format - Document format',
    },
    tikz: {
      extension: '.tex',
      mimeType: 'application/x-tex',
      supportsQuality: false,
      supportsDPI: false,
      description: 'TikZ/LaTeX - LaTeX graphics code',
    },
  };

  return configs[format];
};

/**
 * Get available DPI options with descriptions
 * @returns Array of DPI option objects
 */
export const getDPIOptions = (): Array<{
  value: ExportDPI;
  label: string;
  description: string;
}> => [
  { value: 72, label: '72 DPI', description: 'Screen/Web quality' },
  { value: 150, label: '150 DPI', description: 'Draft print quality' },
  { value: 300, label: '300 DPI', description: 'Standard print quality' },
  { value: 600, label: '600 DPI', description: 'High quality print' },
];

/**
 * Get stage description for UI display
 * @param stage - Export stage
 * @returns Human-readable description
 */
export const getStageDescription = (stage: ExportStage): string => {
  const descriptions: Record<ExportStage, string> = {
    preparing: 'Preparing export...',
    rendering: 'Rendering canvas...',
    optimizing: 'Optimizing output...',
    encoding: 'Encoding file...',
    complete: 'Export complete!',
    error: 'Export failed',
  };

  return descriptions[stage];
};

// ============================================================================
// Selector Hooks
// ============================================================================

/**
 * Hook to get export settings
 */
export const useExportSettings = () =>
  useExportStore((state) => ({
    format: state.format,
    quality: state.quality,
    dpi: state.dpi,
  }));

/**
 * Hook to get export progress state
 */
export const useExportProgress = () =>
  useExportStore((state) => ({
    isExporting: state.isExporting,
    progress: state.progress,
    stage: state.stage,
    stageDescription: getStageDescription(state.stage),
  }));

/**
 * Hook to get export error state
 */
export const useExportError = () =>
  useExportStore((state) => ({
    error: state.error,
    hasError: state.error !== null,
  }));

/**
 * Hook to check if format supports quality setting
 */
export const useSupportsQuality = () =>
  useExportStore((state) => {
    const config = getFormatConfig(state.format);
    return config.supportsQuality;
  });

/**
 * Hook to check if format supports DPI setting
 */
export const useSupportsDPI = () =>
  useExportStore((state) => {
    const config = getFormatConfig(state.format);
    return config.supportsDPI;
  });

// ============================================================================
// Store Utilities
// ============================================================================

/**
 * Reset the export store to initial state
 */
export const resetExportStore = () => {
  useExportStore.setState(initialState);
};

/**
 * Get the current store state (for debugging)
 */
export const getExportState = () => useExportStore.getState();

/**
 * Subscribe to store changes
 * @param selector - State selector function
 * @param callback - Callback when selected state changes
 * @returns Unsubscribe function
 */
export const subscribeToExport = <T>(
  selector: (state: ExportStore) => T,
  callback: (value: T, prevValue: T) => void
) => {
  return useExportStore.subscribe(selector, callback);
};

/**
 * Generate a default filename for export
 * @param format - Export format
 * @param prefix - Optional filename prefix
 * @returns Generated filename with extension
 */
export const generateExportFilename = (
  format: ExportFormat,
  prefix: string = 'finnish-export'
): string => {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
  const config = getFormatConfig(format);
  return `${prefix}-${timestamp}${config.extension}`;
};
