"use client";

import { useState, useCallback, useEffect } from "react";
import {
  ClipboardText,
  Download,
  CheckCircle,
  WarningCircle,
  CircleNotch,
  Robot,
  User,
  ArrowSquareOut,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types (mirrors server types)
// ---------------------------------------------------------------------------

interface PROSPEROField {
  fieldNumber: number;
  fieldName: string;
  value: string;
  source: "auto" | "manual";
  required: boolean;
}

interface PROSPEROExportProps {
  projectId: number;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PROSPEROExport({ projectId }: PROSPEROExportProps) {
  const [fields, setFields] = useState<PROSPEROField[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load fields on mount
  const loadFields = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/systematic-review/prospero?projectId=${projectId}`
      );
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to load PROSPERO fields");
      }
      const data = await res.json();
      setFields(data.fields);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load fields");
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadFields();
  }, [loadFields]);

  // Update a field value locally
  const updateField = (fieldNumber: number, value: string) => {
    setFields((prev) =>
      prev.map((f) =>
        f.fieldNumber === fieldNumber ? { ...f, value } : f
      )
    );
  };

  // Progress metrics
  const filledCount = fields.filter((f) => f.value.trim() !== "").length;
  const totalCount = fields.length;
  const progressPct = totalCount > 0 ? Math.round((filledCount / totalCount) * 100) : 0;

  // Copy all fields to clipboard
  const handleCopyAll = async () => {
    const text = fields
      .map(
        (f) =>
          `${f.fieldNumber}. ${f.fieldName}\n${"─".repeat(f.fieldName.length + 4)}\n${f.value || "[Required — please fill in]"}`
      )
      .join("\n\n");

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      // Fallback for non-secure contexts
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  // Download as TXT
  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      const res = await fetch("/api/systematic-review/prospero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, fields }),
      });

      if (!res.ok) throw new Error("Download failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `prospero-registration-${projectId}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Download failed");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-ink flex items-center gap-2">
          <ArrowSquareOut weight="duotone" className="text-brand" />
          PROSPERO Registration Helper
        </h2>
        <p className="text-sm text-ink-muted mt-1">
          Auto-populate the 22 mandatory PROSPERO fields from your project
          configuration. Review, edit, and export for submission at{" "}
          <a
            href="https://www.crd.york.ac.uk/prospero/login.php"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            crd.york.ac.uk/prospero
          </a>
          .
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400 flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-300 ml-3"
          >
            &#x2715;
          </button>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-ink-muted py-8 justify-center">
          <CircleNotch weight="bold" className="animate-spin" size={18} />
          Loading project data…
        </div>
      )}

      {/* Content */}
      {!isLoading && fields.length > 0 && (
        <>
          {/* Progress bar + action buttons */}
          <div className="p-4 bg-surface border border-border rounded-lg space-y-3">
            {/* Progress */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink font-medium">
                {filledCount}/{totalCount} fields completed
              </span>
              <span
                className={cn(
                  "text-xs font-semibold",
                  progressPct === 100
                    ? "text-green-600 dark:text-green-400"
                    : "text-amber-600 dark:text-amber-400"
                )}
              >
                {progressPct}%
              </span>
            </div>
            <div className="h-2 bg-surface-alt rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  progressPct === 100
                    ? "bg-green-500"
                    : progressPct >= 50
                    ? "bg-amber-500"
                    : "bg-red-500"
                )}
                style={{ width: `${progressPct}%` }}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={handleCopyAll}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-brand text-white rounded-md text-sm font-medium hover:bg-brand/90 transition-colors"
              >
                {isCopied ? (
                  <>
                    <CheckCircle weight="bold" size={14} />
                    Copied!
                  </>
                ) : (
                  <>
                    <ClipboardText weight="bold" size={14} />
                    Copy All
                  </>
                )}
              </button>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-md text-sm text-ink-muted hover:text-ink hover:border-brand transition-colors disabled:opacity-50"
              >
                {isDownloading ? (
                  <>
                    <CircleNotch weight="bold" size={14} className="animate-spin" />
                    Downloading…
                  </>
                ) : (
                  <>
                    <Download weight="bold" size={14} />
                    Download as TXT
                  </>
                )}
              </button>
              <button
                onClick={loadFields}
                className="ml-auto text-xs text-ink-muted hover:text-ink hover:underline transition-colors"
              >
                Refresh from project
              </button>
            </div>
          </div>

          {/* Fields list */}
          <div className="space-y-3">
            {fields.map((field) => {
              const isFilled = field.value.trim() !== "";
              return (
                <div
                  key={field.fieldNumber}
                  className="border border-border rounded-lg overflow-hidden"
                >
                  {/* Field header */}
                  <div className="flex items-center gap-3 px-4 py-2.5 bg-surface">
                    {/* Status indicator */}
                    {isFilled ? (
                      <CheckCircle
                        weight="fill"
                        size={16}
                        className="text-green-500 flex-shrink-0"
                        aria-label="Filled"
                      />
                    ) : (
                      <WarningCircle
                        weight="fill"
                        size={16}
                        className="text-red-500 flex-shrink-0"
                        aria-label="Required — empty"
                      />
                    )}

                    {/* Field number + name */}
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-ink-faint mr-1.5">
                        {field.fieldNumber}.
                      </span>
                      <span className="text-sm text-ink font-medium">
                        {field.fieldName}
                      </span>
                    </div>

                    {/* Source badge */}
                    <span
                      className={cn(
                        "flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0",
                        field.source === "auto"
                          ? "bg-brand/10 text-brand"
                          : "bg-surface-alt text-ink-muted"
                      )}
                    >
                      {field.source === "auto" ? (
                        <>
                          <Robot size={10} />
                          Auto
                        </>
                      ) : (
                        <>
                          <User size={10} />
                          Manual
                        </>
                      )}
                    </span>
                  </div>

                  {/* Textarea input */}
                  <div className="px-4 pb-3 pt-2 border-t border-border bg-surface-alt/30">
                    <textarea
                      value={field.value}
                      onChange={(e) =>
                        updateField(field.fieldNumber, e.target.value)
                      }
                      rows={field.value.length > 120 ? 4 : 2}
                      placeholder={
                        field.source === "auto"
                          ? "Auto-populated — edit if needed"
                          : `Enter ${field.fieldName.toLowerCase()}…`
                      }
                      className={cn(
                        "w-full px-3 py-2 bg-surface border rounded text-sm text-ink placeholder:text-ink-faint resize-y focus:outline-none focus:ring-2 focus:ring-brand/30 transition-colors",
                        isFilled ? "border-border" : "border-red-500/40 focus:ring-red-500/20"
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer hint */}
          <div className="text-xs text-ink-faint p-3 bg-surface-alt rounded-lg border border-border">
            <strong>How to use:</strong> Fill in all 22 fields above, then use
            &ldquo;Copy All&rdquo; or &ldquo;Download as TXT&rdquo; to transfer
            the content to PROSPERO&rsquo;s online form at{" "}
            <a
              href="https://www.crd.york.ac.uk/prospero/login.php"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline"
            >
              crd.york.ac.uk/prospero
            </a>
            . Fields marked <span className="text-brand font-semibold">Auto</span> are
            pre-filled from your PICO, search strategy, and project settings.
          </div>
        </>
      )}
    </div>
  );
}
