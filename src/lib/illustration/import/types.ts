/**
 * Import Service Types
 * Type definitions for importing external SVG files, images, and clipboard content.
 */

import type { Object as FabricObject } from 'fabric';

/** Source of the import operation */
export type ImportSource = 'file' | 'clipboard' | 'url';

/** Supported import file types */
export type ImportType = 'svg' | 'png' | 'jpeg' | 'gif';

/** Result of an import operation */
export interface ImportResult {
  /** The type of content that was imported */
  type: ImportType;
  /** Fabric.js objects created from the import */
  objects: FabricObject[];
  /** Any warnings encountered during import (missing fonts, unsupported features, etc.) */
  warnings: string[];
  /** Original file name if available */
  fileName?: string;
  /** Original file size in bytes */
  fileSize?: number;
  /** Dimensions of the imported content */
  dimensions?: {
    width: number;
    height: number;
  };
}

/** Options for import operations */
export interface ImportOptions {
  /** Preserve group structure from SVG (default: true) */
  preserveGroups?: boolean;
  /** Convert text elements to paths for consistent rendering (default: false) */
  convertTextToPaths?: boolean;
  /** Center the imported content on the canvas (default: true) */
  centerOnCanvas?: boolean;
  /** Scale factor to apply to imported content (default: 1) */
  scale?: number;
  /** Maximum dimension for images (will resize if exceeded) */
  maxDimension?: number;
  /** Target position for the imported content */
  position?: {
    x: number;
    y: number;
  };
}

/** SVG-specific import options */
export interface SVGImportOptions extends ImportOptions {
  /** Map of font replacements for missing fonts */
  fontReplacements?: Record<string, string>;
  /** Whether to attempt to preserve original colors (default: true) */
  preserveColors?: boolean;
  /** Whether to preserve viewBox dimensions */
  preserveViewBox?: boolean;
  /** Flatten all groups into a single level */
  flattenGroups?: boolean;
}

/** Image-specific import options */
export interface ImageImportOptions extends ImportOptions {
  /** Whether to trace the image to vector paths */
  traceToVector?: boolean;
  /** Tracing options when traceToVector is enabled */
  tracingOptions?: TracingOptions;
  /** Quality setting for image processing (0-1) */
  quality?: number;
  /** Whether to preserve transparency */
  preserveTransparency?: boolean;
}

/** Options for image tracing (raster to vector conversion) */
export interface TracingOptions {
  /** Detail level: 'low' | 'medium' | 'high' | 'ultra' */
  detailLevel?: 'low' | 'medium' | 'high' | 'ultra';
  /** Number of colors to extract for multi-color traces */
  colorCount?: number;
  /** Threshold for black/white conversion (0-255) */
  threshold?: number;
  /** Turn policy for path generation */
  turnPolicy?: 'black' | 'white' | 'left' | 'right' | 'minority' | 'majority';
  /** Whether to optimize paths */
  optCurve?: boolean;
  /** Optimization tolerance */
  optTolerance?: number;
  /** Suppress speckles up to this size */
  turdSize?: number;
  /** Corner threshold */
  alphaMax?: number;
}

/** Clipboard content types */
export type ClipboardContentType =
  | 'image/png'
  | 'image/jpeg'
  | 'image/gif'
  | 'image/svg+xml'
  | 'text/html'
  | 'text/plain'
  | 'unknown';

/** Result of clipboard content detection */
export interface ClipboardContent {
  /** Detected content type */
  type: ClipboardContentType;
  /** Raw data (Blob for images, string for text) */
  data: Blob | string;
  /** File name if available from clipboard */
  fileName?: string;
}

/** Progress callback for long-running import operations */
export type ImportProgressCallback = (progress: ImportProgress) => void;

/** Import progress information */
export interface ImportProgress {
  /** Current stage of the import */
  stage: 'reading' | 'parsing' | 'converting' | 'tracing' | 'finalizing';
  /** Progress percentage (0-100) */
  percent: number;
  /** Human-readable status message */
  message: string;
}

/** Import error with additional context */
export class ImportError extends Error {
  /** Error code for programmatic handling */
  code: ImportErrorCode;
  /** Original error if this is a wrapped error */
  cause?: Error;
  /** Additional context about the error */
  context?: Record<string, unknown>;

  constructor(
    message: string,
    code: ImportErrorCode,
    cause?: Error,
    context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ImportError';
    this.code = code;
    this.cause = cause;
    this.context = context;
  }
}

/** Import error codes */
export type ImportErrorCode =
  | 'INVALID_FILE_TYPE'
  | 'FILE_TOO_LARGE'
  | 'PARSE_ERROR'
  | 'CONVERSION_ERROR'
  | 'NETWORK_ERROR'
  | 'CLIPBOARD_ACCESS_DENIED'
  | 'UNSUPPORTED_FORMAT'
  | 'CORRUPT_FILE'
  | 'TRACING_ERROR'
  | 'UNKNOWN_ERROR';

/** Supported file extensions for import */
export const SUPPORTED_EXTENSIONS = {
  svg: ['.svg', '.svgz'],
  image: ['.png', '.jpg', '.jpeg', '.gif'],
} as const;

/** MIME types for supported formats */
export const SUPPORTED_MIME_TYPES = {
  svg: ['image/svg+xml'],
  png: ['image/png'],
  jpeg: ['image/jpeg', 'image/jpg'],
  gif: ['image/gif'],
} as const;

/** Maximum file sizes (in bytes) */
export const MAX_FILE_SIZES = {
  svg: 10 * 1024 * 1024,    // 10 MB
  image: 50 * 1024 * 1024,  // 50 MB
} as const;

/** Default import options */
export const DEFAULT_IMPORT_OPTIONS: Required<ImportOptions> = {
  preserveGroups: true,
  convertTextToPaths: false,
  centerOnCanvas: true,
  scale: 1,
  maxDimension: 4096,
  position: { x: 0, y: 0 },
};

/** Default SVG import options */
export const DEFAULT_SVG_OPTIONS: Required<SVGImportOptions> = {
  ...DEFAULT_IMPORT_OPTIONS,
  fontReplacements: {},
  preserveColors: true,
  preserveViewBox: true,
  flattenGroups: false,
};

/** Default image import options */
export const DEFAULT_IMAGE_OPTIONS: Required<ImageImportOptions> = {
  ...DEFAULT_IMPORT_OPTIONS,
  traceToVector: false,
  tracingOptions: {
    detailLevel: 'medium',
    colorCount: 2,
    threshold: 128,
    turnPolicy: 'minority',
    optCurve: true,
    optTolerance: 0.2,
    turdSize: 2,
    alphaMax: 1,
  },
  quality: 0.9,
  preserveTransparency: true,
};

/** Default tracing options */
export const DEFAULT_TRACING_OPTIONS: Required<TracingOptions> = {
  detailLevel: 'medium',
  colorCount: 2,
  threshold: 128,
  turnPolicy: 'minority',
  optCurve: true,
  optTolerance: 0.2,
  turdSize: 2,
  alphaMax: 1,
};
