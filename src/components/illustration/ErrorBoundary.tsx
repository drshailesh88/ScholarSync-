"use client";

import { Component, ErrorInfo, ReactNode } from 'react';

export interface ErrorBoundaryFallbackProps {
  error: Error | null;
  reset: () => void;
  scope?: string;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((props: ErrorBoundaryFallbackProps) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: unknown[];
  scope?: string;
  title?: string;
  description?: string;
  fullScreen?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

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
  containerInline: {
    minHeight: '280px',
    height: '100%',
    borderRadius: '12px',
    border: '1px solid var(--border-primary)',
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
    justifyContent: 'center',
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
    marginTop: '24px',
    width: '100%',
    textAlign: 'left' as const,
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
    marginTop: '12px',
    padding: '16px',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: '8px',
    border: '1px solid var(--border-primary)',
    maxHeight: '220px',
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

function areResetKeysEqual(previous?: unknown[], next?: unknown[]): boolean {
  if (previous === next) {
    return true;
  }

  if (!previous || !next || previous.length !== next.length) {
    return false;
  }

  return previous.every((value, index) => Object.is(value, next[index]));
}

export function IllustrationErrorFallback({
  error,
  reset,
  scope,
  fullScreen = false,
  title = 'Something went wrong',
  description,
}: ErrorBoundaryFallbackProps & {
  fullScreen?: boolean;
  title?: string;
  description?: string;
}): JSX.Element {
  const resolvedTitle = scope ? `${scope} failed to load` : title;
  const resolvedDescription =
    description ??
    'An unexpected error occurred. Try resetting this section or reload the page.';

  return (
    <div
      style={{
        ...styles.container,
        ...(fullScreen ? {} : styles.containerInline),
      }}
      role="alert"
      aria-live="assertive"
    >
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

        <h1 style={styles.title}>{resolvedTitle}</h1>

        <p style={styles.message}>
          {resolvedDescription}
          {error?.message ? ` (${error.message})` : ''}
        </p>

        <div style={styles.buttonGroup}>
          <button
            type="button"
            style={{ ...styles.button, ...styles.primaryButton }}
            onClick={reset}
          >
            Try Again
          </button>
          {fullScreen && (
            <button
              type="button"
              style={{ ...styles.button, ...styles.secondaryButton }}
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

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
    console.error('[ErrorBoundary] Caught error:', error);
    console.error('[ErrorBoundary] Component stack:', errorInfo.componentStack);
    this.setState({ errorInfo });
    this.props.onError?.(error, errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    if (this.state.hasError && !areResetKeysEqual(prevProps.resetKeys, this.props.resetKeys)) {
      this.handleReset();
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const {
      children,
      fallback,
      scope,
      title,
      description,
      fullScreen = true,
    } = this.props;

    if (hasError) {
      if (fallback) {
        if (typeof fallback === 'function') {
          return fallback({ error, reset: this.handleReset, scope });
        }
        return fallback;
      }

      return (
        <>
          <IllustrationErrorFallback
            error={error}
            reset={this.handleReset}
            scope={scope}
            title={title}
            description={description}
            fullScreen={fullScreen}
          />

          {process.env.NODE_ENV === 'development' && error && (
            <ErrorDetails error={error} errorInfo={errorInfo} />
          )}
        </>
      );
    }

    return children;
  }
}

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
    this.setState((previous) => ({ showDetails: !previous.showDetails }));
  };

  render(): ReactNode {
    const { error, errorInfo } = this.props;
    const { showDetails } = this.state;

    return (
      <div style={styles.detailsContainer}>
        <button type="button" style={styles.detailsToggle} onClick={this.toggleDetails}>
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
              {errorInfo?.componentStack ? (
                <>
                  {'\n\n'}
                  <strong>Component Stack:</strong>
                  {errorInfo.componentStack}
                </>
              ) : null}
            </pre>
          </div>
        )}
      </div>
    );
  }
}

export default ErrorBoundary;
