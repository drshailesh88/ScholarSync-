/**
 * Type declarations for Vite-like environment variables in Next.js
 * FINNISH uses import.meta.env which is Vite-specific
 * In Next.js, we provide type declarations to avoid errors
 */

declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_VERSION?: string;
    readonly VITE_API_URL?: string;
    readonly VITE_FAL_AI_API_KEY?: string;
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
