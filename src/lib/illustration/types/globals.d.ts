/**
 * Type declarations for FINNISH illustration integration
 */

// Environment variable types
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_FAL_AI_API_KEY?: string;
      FAL_AI_API_KEY?: string;
      // Add other FINNISH env vars as needed
    }
  }
}

// React 19 compatibility - JSX namespace is available
// These declarations resolve false positives in tscheck for React 18 components
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

export {};
