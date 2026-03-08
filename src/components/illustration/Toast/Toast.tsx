"use client";/**
 * Toast Notification System
 * Provides context-based toast notifications with multiple variants
 *
 * @module components/Toast
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';

// ============================================================================
// Types
// ============================================================================

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  dismissible?: boolean;
}

export interface ToastOptions {
  type: ToastType;
  message: string;
  duration?: number;
  dismissible?: boolean;
}

export interface ToastContextValue {
  toasts: Toast[];
  showToast: (options: ToastOptions) => string;
  dismissToast: (id: string) => void;
  dismissAll: () => void;
}

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_DURATION = 5000;
const MAX_TOASTS = 5;

// ============================================================================
// Context
// ============================================================================

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

// ============================================================================
// Styles
// ============================================================================

const styles = {
  container: {
    position: 'fixed' as const,
    bottom: '24px',
    right: '24px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    zIndex: 'var(--z-toast, 800)',
    maxWidth: '400px',
    width: '100%',
    pointerEvents: 'none' as const,
  },
  toast: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '14px 16px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
    pointerEvents: 'auto' as const,
    animation: 'slideInUp 250ms ease-out',
    maxWidth: '100%',
  },
  toastSuccess: {
    backgroundColor: 'var(--color-success-bg, rgba(76, 175, 80, 0.15))',
    border: '1px solid var(--color-success-border, rgba(76, 175, 80, 0.4))',
    color: 'var(--color-success, #4caf50)',
  },
  toastError: {
    backgroundColor: 'var(--color-error-bg, rgba(244, 67, 54, 0.15))',
    border: '1px solid var(--color-error-border, rgba(244, 67, 54, 0.4))',
    color: 'var(--color-error, #f44336)',
  },
  toastWarning: {
    backgroundColor: 'var(--color-warning-bg, rgba(255, 152, 0, 0.15))',
    border: '1px solid var(--color-warning-border, rgba(255, 152, 0, 0.4))',
    color: 'var(--color-warning, #ff9800)',
  },
  toastInfo: {
    backgroundColor: 'var(--color-info-bg, rgba(33, 150, 243, 0.15))',
    border: '1px solid var(--color-info-border, rgba(33, 150, 243, 0.4))',
    color: 'var(--color-info, #2196f3)',
  },
  icon: {
    flexShrink: 0,
    width: '20px',
    height: '20px',
  },
  content: {
    flex: 1,
    minWidth: 0,
  },
  message: {
    fontSize: '14px',
    lineHeight: 1.5,
    color: 'var(--text-primary, #cccccc)',
    wordBreak: 'break-word' as const,
  },
  closeButton: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    padding: 0,
    background: 'transparent',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: 'var(--text-secondary, #9d9d9d)',
    transition: 'all 150ms ease',
    marginLeft: '4px',
    marginTop: '-2px',
  },
  closeButtonHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'var(--text-primary, #cccccc)',
  },
};

// ============================================================================
// Icons
// ============================================================================

const icons: Record<ToastType, ReactNode> = {
  success: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  error: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  warning: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  info: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

// ============================================================================
// Toast Item Component
// ============================================================================

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(toast.id);
    }, 200);
  }, [toast.id, onDismiss]);

  useEffect(() => {
    if (toast.duration === 0) return;

    const timeout = setTimeout(() => {
      handleDismiss();
    }, toast.duration || DEFAULT_DURATION);

    return () => clearTimeout(timeout);
  }, [toast.id, toast.duration, handleDismiss]);

  const typeStyles: Record<ToastType, React.CSSProperties> = {
    success: styles.toastSuccess,
    error: styles.toastError,
    warning: styles.toastWarning,
    info: styles.toastInfo,
  };

  return (
    <div
      style={{
        ...styles.toast,
        ...typeStyles[toast.type],
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'translateX(100%)' : 'translateX(0)',
        transition: 'opacity 200ms ease, transform 200ms ease',
      }}
      role="alert"
      aria-live="polite"
    >
      <div style={styles.icon}>{icons[toast.type]}</div>

      <div style={styles.content}>
        <p style={styles.message}>{toast.message}</p>
      </div>

      {toast.dismissible !== false && (
        <button
          style={{
            ...styles.closeButton,
            ...(isHovered ? styles.closeButtonHover : {}),
          }}
          onClick={handleDismiss}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Dismiss notification"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ============================================================================
// Toast Container Component
// ============================================================================

function ToastContainer(): JSX.Element | null {
  const context = useContext(ToastContext);

  if (!context || context.toasts.length === 0) {
    return null;
  }

  return (
    <div style={styles.container} aria-label="Notifications">
      {context.toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={context.dismissToast}
        />
      ))}
    </div>
  );
}

// ============================================================================
// Toast Provider Component
// ============================================================================

interface ToastProviderProps {
  children: ReactNode;
  maxToasts?: number;
}

export function ToastProvider({
  children,
  maxToasts = MAX_TOASTS,
}: ToastProviderProps): JSX.Element {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const generateId = useCallback((): string => {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const showToast = useCallback(
    (options: ToastOptions): string => {
      const id = generateId();
      const newToast: Toast = {
        id,
        type: options.type,
        message: options.message,
        duration: options.duration ?? DEFAULT_DURATION,
        dismissible: options.dismissible ?? true,
      };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        // Limit number of toasts
        if (updated.length > maxToasts) {
          return updated.slice(-maxToasts);
        }
        return updated;
      });

      return id;
    },
    [generateId, maxToasts]
  );

  const dismissToast = useCallback((id: string): void => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const dismissAll = useCallback((): void => {
    setToasts([]);
  }, []);

  const value: ToastContextValue = {
    toasts,
    showToast,
    dismissToast,
    dismissAll,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

// ============================================================================
// Hook
// ============================================================================

/**
 * Hook to access toast functionality
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { showToast } = useToast();
 *
 *   const handleSave = () => {
 *     showToast({ type: 'success', message: 'Saved successfully!' });
 *   };
 *
 *   return <button onClick={handleSave}>Save</button>;
 * }
 * ```
 */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

// ============================================================================
// Exports
// ============================================================================

export { ToastContext, ToastContainer };
export default ToastProvider;
