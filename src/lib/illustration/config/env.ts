/**
 * Environment Configuration for FINNISH Project
 *
 * Centralized configuration management with type-safe defaults
 * and environment variable overrides via Vite's import.meta.env
 */

// =============================================================================
// ENVIRONMENT HELPERS
// =============================================================================

/**
 * Safely parse a boolean environment variable
 */
function parseBoolean(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined || value === '') return defaultValue;
  return value.toLowerCase() === 'true' || value === '1';
}

/**
 * Safely parse a number environment variable
 */
function parseNumber(value: string | undefined, defaultValue: number): number {
  if (value === undefined || value === '') return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

// =============================================================================
// MAIN CONFIGURATION
// =============================================================================

export const config = {
  // ---------------------------------------------------------------------------
  // Application Metadata
  // ---------------------------------------------------------------------------
  app: {
    name: 'FINNISH',
    version: import.meta.env.VITE_APP_VERSION || '0.1.0',
    description: 'Scientific Illustration Editor',
    environment: (import.meta.env.MODE || 'development') as 'development' | 'production' | 'test',
    isDev: import.meta.env.DEV ?? true,
    isProd: import.meta.env.PROD ?? false,
  },

  // ---------------------------------------------------------------------------
  // API Settings
  // ---------------------------------------------------------------------------
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    timeout: parseNumber(import.meta.env.VITE_API_TIMEOUT, 30000),
  },

  // ---------------------------------------------------------------------------
  // AI Service Configuration
  // ---------------------------------------------------------------------------
  ai: {
    claudeApiKey: import.meta.env.VITE_CLAUDE_API_KEY || '',
    claudeModel: import.meta.env.VITE_CLAUDE_MODEL || 'claude-sonnet-4-20250514',
    openaiApiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
    maxTokens: parseNumber(import.meta.env.VITE_AI_MAX_TOKENS, 4096),
    temperature: parseFloat(import.meta.env.VITE_AI_TEMPERATURE || '0.7'),
    // Rate limiting
    requestsPerMinute: parseNumber(import.meta.env.VITE_AI_RPM, 60),
    retryAttempts: parseNumber(import.meta.env.VITE_AI_RETRY_ATTEMPTS, 3),
    retryDelay: parseNumber(import.meta.env.VITE_AI_RETRY_DELAY, 1000),
  },

  // ---------------------------------------------------------------------------
  // Feature Flags
  // ---------------------------------------------------------------------------
  features: {
    aiGeneration: parseBoolean(import.meta.env.VITE_FEATURE_AI_GENERATION, true),
    collaboration: parseBoolean(import.meta.env.VITE_FEATURE_COLLABORATION, false),
    cloudSync: parseBoolean(import.meta.env.VITE_FEATURE_CLOUD_SYNC, false),
    experimentalTools: parseBoolean(import.meta.env.VITE_FEATURE_EXPERIMENTAL, false),
    debugMode: parseBoolean(import.meta.env.VITE_FEATURE_DEBUG, import.meta.env.DEV ?? false),
    analytics: parseBoolean(import.meta.env.VITE_FEATURE_ANALYTICS, false),
    offlineMode: parseBoolean(import.meta.env.VITE_FEATURE_OFFLINE, true),
    agentMode: parseBoolean(import.meta.env.VITE_FEATURE_AGENT_MODE, true),
  },

  // ---------------------------------------------------------------------------
  // Editor Configuration
  // ---------------------------------------------------------------------------
  editor: {
    // Canvas defaults
    defaultWidth: parseNumber(import.meta.env.VITE_EDITOR_WIDTH, 1920),
    defaultHeight: parseNumber(import.meta.env.VITE_EDITOR_HEIGHT, 1080),

    // History/Undo system
    maxHistoryStates: parseNumber(import.meta.env.VITE_EDITOR_MAX_HISTORY, 50),

    // Grid and snapping
    gridSize: parseNumber(import.meta.env.VITE_EDITOR_GRID_SIZE, 10),
    snapThreshold: parseNumber(import.meta.env.VITE_EDITOR_SNAP_THRESHOLD, 5),
    showGrid: true,
    snapToGrid: true,
    snapToObjects: true,

    // Zoom settings
    minZoom: 0.1,
    maxZoom: 32,
    zoomStep: 0.1,
    defaultZoom: 1,

    // Auto-save
    autoSaveEnabled: parseBoolean(import.meta.env.VITE_EDITOR_AUTOSAVE, true),
    autoSaveInterval: parseNumber(import.meta.env.VITE_EDITOR_AUTOSAVE_INTERVAL, 30000), // 30 seconds

    // Performance
    maxObjects: parseNumber(import.meta.env.VITE_EDITOR_MAX_OBJECTS, 10000),
    renderThrottle: parseNumber(import.meta.env.VITE_EDITOR_RENDER_THROTTLE, 16), // ~60fps
  },

  // ---------------------------------------------------------------------------
  // Export Configuration
  // ---------------------------------------------------------------------------
  export: {
    defaultDPI: parseNumber(import.meta.env.VITE_EXPORT_DPI, 300),
    defaultQuality: parseNumber(import.meta.env.VITE_EXPORT_QUALITY, 90),
    defaultFormat: (import.meta.env.VITE_EXPORT_FORMAT || 'png') as ExportFormat,

    // Format-specific settings
    png: {
      compression: 6,
      interlaced: false,
    },
    jpeg: {
      quality: 90,
      progressive: true,
    },
    svg: {
      minify: true,
      includeMetadata: true,
    },
    pdf: {
      compress: true,
      embedFonts: true,
    },
    tikz: {
      includeComments: true,
      standalone: false,
    },
  },

  // ---------------------------------------------------------------------------
  // Import Configuration
  // ---------------------------------------------------------------------------
  import: {
    maxFileSize: parseNumber(import.meta.env.VITE_IMPORT_MAX_SIZE, 50 * 1024 * 1024), // 50MB
    supportedFormats: ['svg', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'pdf'] as const,

    // Image tracing defaults
    tracing: {
      colorMode: 'color' as const,
      threshold: 128,
      smoothing: 1,
      simplification: 0.5,
    },
  },

  // ---------------------------------------------------------------------------
  // UI Configuration
  // ---------------------------------------------------------------------------
  ui: {
    // Animation
    animationsEnabled: true,
    reducedMotion: false,

    // Theme
    theme: 'dark' as const,

    // Toast notifications
    toast: {
      duration: 5000,
      maxVisible: 5,
      position: 'bottom-right' as const,
    },

    // Panels
    defaultPanelWidth: 280,
    collapsedPanelWidth: 48,

    // Tooltips
    tooltipDelay: 500,
  },

  // ---------------------------------------------------------------------------
  // Storage Configuration
  // ---------------------------------------------------------------------------
  storage: {
    prefix: 'finnish_',
    version: 1,
    // IndexedDB
    dbName: 'FINNISHEditor',
    dbVersion: 1,
  },

  // ---------------------------------------------------------------------------
  // Keyboard Shortcuts Defaults
  // ---------------------------------------------------------------------------
  shortcuts: {
    modifier: navigator.platform.includes('Mac') ? 'Meta' : 'Control',
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type ExportFormat = 'png' | 'jpeg' | 'svg' | 'pdf' | 'tikz';
export type ImportFormat = 'svg' | 'png' | 'jpg' | 'jpeg' | 'gif' | 'webp' | 'pdf';
export type Theme = 'dark' | 'light' | 'system';
export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';

export type Config = typeof config;
export type AppConfig = typeof config.app;
export type ApiConfig = typeof config.api;
export type AIConfig = typeof config.ai;
export type FeatureFlags = typeof config.features;
export type EditorConfig = typeof config.editor;
export type ExportConfig = typeof config.export;
export type ImportConfig = typeof config.import;
export type UIConfig = typeof config.ui;
export type StorageConfig = typeof config.storage;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(feature: keyof typeof config.features): boolean {
  return config.features[feature];
}

/**
 * Get configuration value with type safety
 */
export function getConfig<K extends keyof Config>(key: K): Config[K] {
  return config[key];
}

/**
 * Check if running in development mode
 */
export function isDevelopment(): boolean {
  return config.app.isDev;
}

/**
 * Check if running in production mode
 */
export function isProduction(): boolean {
  return config.app.isProd;
}

/**
 * Get the current environment
 */
export function getEnvironment(): 'development' | 'production' | 'test' {
  return config.app.environment;
}

export default config;
