"use client";

import { Component, ReactNode } from "react";
import { Bug, ArrowClockwise, Folder } from "@phosphor-icons/react";

interface Props {
  children: ReactNode;
  documentId?: string;
  onRecovery?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: string;
}

export class EditorErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: "",
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Editor crash:", error, info);
    this.setState({ errorInfo: info.componentStack || "" });
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: "" });
    if (this.props.onRecovery) {
      this.props.onRecovery();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] bg-surface px-4">
          <div className="max-w-md w-full">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                <Bug size={32} weight="fill" />
              </div>
            </div>

            {/* Error Message */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-ink mb-2">
                The editor encountered an error
              </h2>
              <p className="text-sm text-ink-muted">
                Don&apos;t worry — your work has been saved automatically
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <button
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors"
              >
                <ArrowClockwise size={16} weight="bold" />
                Reload Editor
              </button>
              <a
                href="/projects"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-surface-raised border border-border text-ink text-sm font-medium hover:bg-surface-raised/80 transition-colors"
              >
                <Folder size={16} weight="bold" />
                Go to Projects
              </a>
            </div>

            {/* Technical Details (Collapsible) */}
            {this.state.error && (
              <details className="mt-4">
                <summary className="text-xs text-ink-muted cursor-pointer hover:text-ink transition-colors select-none">
                  Technical details
                </summary>
                <div className="mt-3 p-3 rounded-lg bg-surface-raised border border-border">
                  <p className="text-xs font-mono text-red-600 mb-2 break-words">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <pre className="text-xs font-mono text-ink-muted overflow-x-auto whitespace-pre-wrap">
                      {this.state.errorInfo}
                    </pre>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
