/**
 * Type declarations for FINNISH illustration integration
 */

import type * as React from 'react';

// Environment variable types
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_FAL_AI_API_KEY?: string;
      FAL_AI_API_KEY?: string;
      // Add other FINNISH env vars as needed
    }
  }

  // React 19 compatibility shim for legacy `JSX.Element` return annotations.
  namespace JSX {
    type Element = React.JSX.Element;
    interface ElementClass extends React.JSX.ElementClass {}
    interface ElementAttributesProperty extends React.JSX.ElementAttributesProperty {}
    interface ElementChildrenAttribute extends React.JSX.ElementChildrenAttribute {}
    interface IntrinsicAttributes extends React.JSX.IntrinsicAttributes {}
    interface IntrinsicClassAttributes<T> extends React.JSX.IntrinsicClassAttributes<T> {}
    interface IntrinsicElements extends React.JSX.IntrinsicElements {}
  }
}

export {};
