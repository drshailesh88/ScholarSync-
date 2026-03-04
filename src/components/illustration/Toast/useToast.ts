/**
 * useToast Hook
 * Provides easy access to toast notifications from anywhere in the app
 *
 * @module components/Toast/useToast
 */

import { useContext, useCallback } from 'react';
import { ToastContext, ToastContextValue, ToastOptions, ToastType } from './Toast';

// ============================================================================
// Types
// ============================================================================

export interface UseToastReturn extends ToastContextValue {
  /** Show a success toast */
  success: (message: string, duration?: number) => string;
  /** Show an error toast */
  error: (message: string, duration?: number) => string;
  /** Show a warning toast */
  warning: (message: string, duration?: number) => string;
  /** Show an info toast */
  info: (message: string, duration?: number) => string;
}

// ============================================================================
// Hook Implementation
// ============================================================================

/**
 * Hook to show toast notifications from anywhere in the application.
 *
 * Must be used within a ToastProvider.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const toast = useToast();
 *
 *   const handleSuccess = () => {
 *     toast.success('Operation completed!');
 *   };
 *
 *   const handleError = () => {
 *     toast.error('Something went wrong');
 *   };
 *
 *   const handleCustom = () => {
 *     toast.showToast({
 *       type: 'info',
 *       message: 'Custom message with options',
 *       duration: 10000,
 *       dismissible: true,
 *     });
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={handleSuccess}>Success</button>
 *       <button onClick={handleError}>Error</button>
 *       <button onClick={handleCustom}>Custom</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @returns Object with toast methods and state
 * @throws Error if used outside of ToastProvider
 */
export function useToast(): UseToastReturn {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      'useToast must be used within a ToastProvider. ' +
        'Wrap your app with <ToastProvider> to use toast notifications.'
    );
  }

  const { showToast, dismissToast, dismissAll, toasts } = context;

  const success = useCallback(
    (message: string, duration?: number): string => {
      return showToast({ type: 'success', message, duration });
    },
    [showToast]
  );

  const error = useCallback(
    (message: string, duration?: number): string => {
      return showToast({ type: 'error', message, duration });
    },
    [showToast]
  );

  const warning = useCallback(
    (message: string, duration?: number): string => {
      return showToast({ type: 'warning', message, duration });
    },
    [showToast]
  );

  const info = useCallback(
    (message: string, duration?: number): string => {
      return showToast({ type: 'info', message, duration });
    },
    [showToast]
  );

  return {
    toasts,
    showToast,
    dismissToast,
    dismissAll,
    success,
    error,
    warning,
    info,
  };
}

// ============================================================================
// Convenience Export
// ============================================================================

export default useToast;

// Re-export types for convenience
export type { ToastOptions, ToastType, ToastContextValue };
