/**
 * Type declarations for Vite-like environment variables in Next.js
 * FINNISH uses import.meta.env which is Vite-specific
 * In Next.js, we provide type declarations to avoid errors
 */

declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_VERSION?: string;
    readonly VITE_API_URL?: string;
    readonly VITE_API_TIMEOUT?: string;
    readonly VITE_FAL_AI_API_KEY?: string;
    readonly VITE_CLAUDE_API_KEY?: string;
    readonly VITE_CLAUDE_MODEL?: string;
    readonly VITE_AI_MAX_TOKENS?: string;
    readonly VITE_AI_TEMPERATURE?: string;
    readonly VITE_AI_RPM?: string;
    readonly VITE_AI_RETRY_ATTEMPTS?: string;
    readonly VITE_AI_RETRY_DELAY?: string;
    readonly VITE_FEATURE_AI_GENERATION?: string;
    readonly VITE_FEATURE_COLLABORATION?: string;
    readonly VITE_FEATURE_CLOUD_SYNC?: string;
    readonly VITE_FEATURE_EXPERIMENTAL?: string;
    readonly VITE_FEATURE_DEBUG?: string;
    readonly VITE_FEATURE_ANALYTICS?: string;
    readonly VITE_FEATURE_OFFLINE?: string;
    readonly VITE_FEATURE_AGENT_MODE?: string;
    readonly VITE_EDITOR_WIDTH?: string;
    readonly VITE_EDITOR_HEIGHT?: string;
    readonly VITE_EDITOR_MAX_HISTORY?: string;
    readonly VITE_EDITOR_GRID_SIZE?: string;
    readonly VITE_EDITOR_SNAP_THRESHOLD?: string;
    readonly VITE_EDITOR_AUTOSAVE?: string;
    readonly VITE_EDITOR_AUTOSAVE_INTERVAL?: string;
    readonly VITE_EDITOR_MAX_OBJECTS?: string;
    readonly VITE_EDITOR_RENDER_THROTTLE?: string;
    readonly VITE_EXPORT_DPI?: string;
    readonly VITE_EXPORT_QUALITY?: string;
    readonly VITE_EXPORT_FORMAT?: string;
    readonly VITE_IMPORT_MAX_SIZE?: string;
    readonly MODE?: string;
    readonly DEV?: boolean;
    readonly PROD?: boolean;
    readonly VITE_ENABLE_MOCK?: string;
    readonly VITE_MOCK_DELAY_MS?: string;
    readonly VITE_DEFAULT_DOMAIN?: string;
    readonly VITE_MAX_HISTORY_SIZE?: string;
    readonly VITE_ENABLE_PAPER_JS?: string;
    readonly VITE_ENABLE_BACKGROUND_REMOVAL?: string;
    readonly VITE_ENABLE_AI_IMAGE?: string;
    readonly VITE_OPENAI_API_KEY?: string;
    readonly VITE_ANTHROPIC_API_KEY?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
