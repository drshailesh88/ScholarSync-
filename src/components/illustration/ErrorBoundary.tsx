"use client";/**
 * ErrorBoundary Component
 * Catches React errors and displays a friendly fallback UI
 *
 * @module components/ErrorBoundary
 */

import { Component, ErrorInfo, ReactNode } from 'react';

// ============================================================================
// Types
// ============================================================================

interface ErrorBoundaryProps {
  /** Child components to render */
  children: ReactNode;
  /** Optional custom fallback component */
  fallback?: ReactNode;
  /** Optional callback when error is caught */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// ============================================================================
// Styles
// ============================================================================

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '32px',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-sans)',
  },
  content: {
    maxWidth: '600px',
    textAlign: 'center' as const,
  },
  icon: {
    fontSize: '64px',
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: '16px',
    color: 'var(--text-primary)',
  },
  message: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    marginBottom: '24px',
    lineHeight: 1.6,
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 500,
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    border: 'none',
  },
  primaryButton: {
    backgroundColor: 'var(--accent-primary)',
    color: 'white',
  },
  secondaryButton: {
    backgroundColor: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-primary)',
  },
  detailsContainer: {
    marginTop: '32px',
    width: '100%',
  },
  detailsToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: 'transparent',
    color: 'var(--text-muted)',
    border: 'none',
    cursor: 'pointer',
    fontSize: '12px',
    margin: '0 auto',
  },
  errorDetails: {
    marginTop: '16px',
    padding: '16px',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '8px',
    border: '1px solid var(--border-primary)',
    textAlign: 'left' as const,
    maxHeight: '200px',
    overflowY: 'auto' as const,
  },
  errorCode: {
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: 'var(--color-error)',
    whiteSpace: 'pre-wrap' as const,
    wordBreak: 'break-word' as const,
  },
};

// ============================================================================
// Component
// ============================================================================

/**
 * Error Boundary component that catches JavaScript errors anywhere in the
 * child component tree and displays a fallback UI instead of crashing.
 *
 * @example
 * ```tsx
 * <ErrorBoundary onError={(error) => logError(error)}>
 *   <App />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error for debugging
    console.error('[ErrorBoundary] Caught error:', error);
    console.error('[ErrorBoundary] Component stack:', errorInfo.componentStack);

    // Update state with error info
    this.setState({ errorInfo });

    // Call optional error callback
    this.props.onError?.(error, errorInfo);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleGoHome = (): void => {
    window.location.href = '/';
  };

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // Render custom fallback if provided
      if (fallback) {
        return fallback;
      }

      // Render default error UI
      return (
        <div style={styles.container}>
          <div style={styles.content}>
            <div style={styles.icon}>
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <h1 style={styles.title}>Something went wrong</h1>

            <p style={styles.message}>
              We encountered an unexpected error. This has been logged for review.
              You can try reloading the page or return to the home page.
            </p>

            <div style={styles.buttonGroup}>
              <button
                style={{ ...styles.button, ...styles.primaryButton }}
                onClick={this.handleReload}
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
                  <path d="M21 12a9 9 0 11-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                </svg>
                Reload Page
              </button>

              <button
                style={{ ...styles.button, ...styles.secondaryButton }}
                onClick={this.handleGoHome}
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
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
                Go Home
              </button>
            </div>

            {/* Error details for development */}
            {process.env.NODE_ENV === 'development' && error && (
              <ErrorDetails error={error} errorInfo={errorInfo} />
            )}
          </div>
        </div>
      );
    }

    return children;
  }
}

// ============================================================================
// Error Details Component (Development Only)
// ============================================================================

interface ErrorDetailsProps {
  error: Error;
  errorInfo: ErrorInfo | null;
}

interface ErrorDetailsState {
  showDetails: boolean;
}

class ErrorDetails extends Component<ErrorDetailsProps, ErrorDetailsState> {
  state: ErrorDetailsState = {
    showDetails: false,
  };

  toggleDetails = (): void => {
    this.setState((prev) => ({ showDetails: !prev.showDetails }));
  };

  render(): ReactNode {
    const { error, errorInfo } = this.props;
    const { showDetails } = this.state;

    return (
      <div style={styles.detailsContainer}>
        <button style={styles.detailsToggle} onClick={this.toggleDetails}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 150ms ease',
            }}
          >
            <polyline points="6,9 12,15 18,9" />
          </svg>
          {showDetails ? 'Hide' : 'Show'} Error Details
        </button>

        {showDetails && (
          <div style={styles.errorDetails}>
            <pre style={styles.errorCode}>
              <strong>Error:</strong> {error.name}: {error.message}
              {'\n\n'}
              <strong>Stack:</strong>
              {'\n'}
              {error.stack}
              {errorInfo && (
                <>
                  {'\n\n'}
                  <strong>Component Stack:</strong>
                  {errorInfo.componentStack}
                </>
              )}
            </pre>
          </div>
        )}
      </div>
    );
  }
}

export default ErrorBoundary;
