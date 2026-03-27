"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  ClipboardText,
  Download,
  CheckCircle,
  WarningCircle,
  CircleNotch,
  Robot,
  User,
  ArrowSquareOut,
  UploadSimple,
  FileText,
  FileCsv,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PROSPEROField {
  fieldNumber: number;
  fieldName: string;
  value: string;
  source: "auto" | "manual" | "imported";
  required: boolean;
}

interface PROSPEROExportProps {
  projectId: number;
}

// ---------------------------------------------------------------------------
// PROSPERO field names for import parsing
// ---------------------------------------------------------------------------

const PROSPERO_FIELD_NAMES: Record<number, string> = {
  1: "Review title",
  2: "Original language title",
  3: "Anticipated or actual start date",
  4: "Anticipated completion date",
  5: "Stage of review at time of this submission",
  6: "Named contact",
  7: "Named contact email",
  8: "Named contact address",
  9: "Named contact phone number",
  10: "Organisational affiliation of the review",
  11: "Review team members and their organisational affiliations",
  12: "Funding sources/sponsors",
  13: "Conflicts of interest",
  14: "Collaborators",
  15: "Review question",
  16: "Searches",
  17: "URL to search strategy",
  18: "Condition or domain being studied",
  19: "Participants/population",
  20: "Intervention(s), exposure(s)",
  21: "Comparator(s)/control",
  22: "Types of study to be included",
  23: "Context",
  24: "Main outcome(s)",
  25: "Additional outcome(s)",
  26: "Data extraction (selection and coding)",
  27: "Risk of bias (quality) assessment",
  28: "Strategy for data synthesis",
  29: "Analysis of subgroups or subsets",
  30: "Type and method of review",
  31: "Language",
  32: "Country",
  33: "Other registration details",
  34: "Reference and/or URL for published protocol",
  35: "Dissemination plans",
  36: "Keywords",
  37: "Details of any existing review of the same topic by the same authors",
  38: "Current review status",
  39: "Any additional information",
  40: "Details of final published report",
};

// ---------------------------------------------------------------------------
// Import parser — handles PROSPERO text format and common paste formats
// ---------------------------------------------------------------------------

function parsePROSPEROImport(text: string): PROSPEROField[] {
  const fields: PROSPEROField[] = [];
  const lines = text.split("\n");

  // Try to detect numbered field format: "1. Review title\n---\nValue"
  // or "1. Review title: Value"
  // or tab-separated "1\tReview title\tValue"
  let currentFieldNumber = 0;
  let currentFieldName = "";
  let currentValue: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Match numbered field header: "1. Review title" or "1) Review title"
    const numberedMatch = line.match(
      /^(\d+)[.)]\s+(.+?)(?:\s*[:]\s*(.*))?$/
    );

    // Match separator line (dashes or equals)
    const isSeparator = /^[─\-=]{3,}$/.test(line.trim());

    if (numberedMatch) {
      // Save previous field
      if (currentFieldNumber > 0) {
        fields.push({
          fieldNumber: currentFieldNumber,
          fieldName: currentFieldName,
          value: currentValue.join("\n").trim(),
          source: "imported",
          required: true,
        });
      }

      currentFieldNumber = parseInt(numberedMatch[1], 10);
      currentFieldName =
        numberedMatch[2].trim() ||
        PROSPERO_FIELD_NAMES[currentFieldNumber] ||
        `Field ${currentFieldNumber}`;
      currentValue = numberedMatch[3] ? [numberedMatch[3].trim()] : [];
    } else if (isSeparator) {
      // Skip separator lines
    } else if (currentFieldNumber > 0) {
      // Content line for the current field
      currentValue.push(line);
    }
  }

  // Save last field
  if (currentFieldNumber > 0) {
    fields.push({
      fieldNumber: currentFieldNumber,
      fieldName: currentFieldName,
      value: currentValue.join("\n").trim(),
      source: "imported",
      required: true,
    });
  }

  // If no numbered fields found, try tab-separated format
  if (fields.length === 0) {
    for (const line of lines) {
      const parts = line.split("\t");
      if (parts.length >= 2) {
        const num = parseInt(parts[0], 10);
        if (!isNaN(num)) {
          fields.push({
            fieldNumber: num,
            fieldName: parts[1] || PROSPERO_FIELD_NAMES[num] || `Field ${num}`,
            value: parts.slice(2).join("\t").trim(),
            source: "imported",
            required: true,
          });
        }
      }
    }
  }

  return fields;
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
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        f.fieldNumber === fieldNumber
          ? { ...f, value, source: "manual" as const }
          : f
      )
    );
  };

  // Progress metrics
  const requiredFields = fields.filter((f) => f.required);
  const filledCount = requiredFields.filter(
    (f) => f.value.trim() !== ""
  ).length;
  const totalCount = requiredFields.length;
  const progressPct =
    totalCount > 0 ? Math.round((filledCount / totalCount) * 100) : 0;

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
  const handleDownloadTxt = async () => {
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

  // Download as CSV
  const handleDownloadCsv = () => {
    const header = "Field Number,Field Name,Value,Source,Required\n";
    const rows = fields
      .map((f) => {
        const escapedValue = `"${f.value.replace(/"/g, '""')}"`;
        const escapedName = `"${f.fieldName.replace(/"/g, '""')}"`;
        return `${f.fieldNumber},${escapedName},${escapedValue},${f.source},${f.required}`;
      })
      .join("\n");

    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prospero-registration-${projectId}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import from text
  const handleImport = () => {
    setImportError(null);

    if (!importText.trim()) {
      setImportError("Please paste your PROSPERO registration content");
      return;
    }

    const imported = parsePROSPEROImport(importText);

    if (imported.length === 0) {
      setImportError(
        "Could not parse any fields. Paste content in numbered format (e.g. '1. Review title\\n---\\nYour title here')"
      );
      return;
    }

    // Merge imported fields into existing ones
    setFields((prev) => {
      const updated = [...prev];
      for (const imp of imported) {
        const idx = updated.findIndex(
          (f) => f.fieldNumber === imp.fieldNumber
        );
        if (idx >= 0) {
          updated[idx] = {
            ...updated[idx],
            value: imp.value || updated[idx].value,
            source: imp.value ? "imported" : updated[idx].source,
          };
        } else {
          updated.push(imp);
        }
      }
      return updated.sort((a, b) => a.fieldNumber - b.fieldNumber);
    });

    setShowImport(false);
    setImportText("");
  };

  // Import from file
  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content) {
        setImportText(content);
      }
    };
    reader.readAsText(file);

    // Reset the input so the same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="sr-content space-y-6">
      {/* Header */}
      <div>
        <h2 className="sr-panel-title flex items-center gap-2">
          <ArrowSquareOut weight="duotone" className="text-brand" size={24} />
          PROSPERO Export & Import
        </h2>
        <p className="text-sm text-ink-muted mt-1">
          Auto-populate PROSPERO fields from your project configuration, import
          from an existing registration, or edit manually. Export for submission
          at{" "}
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
          Loading project data...
        </div>
      )}

      {/* Content */}
      {!isLoading && fields.length > 0 && (
        <>
          {/* Progress bar + action buttons */}
          <div className="sr-panel space-y-3">
            {/* Progress */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink font-medium">
                {filledCount}/{totalCount} required fields completed
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
            <div className="h-2 bg-surface-raised rounded-full overflow-hidden">
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
            <div className="flex flex-wrap gap-2 pt-1">
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
                onClick={handleDownloadTxt}
                disabled={isDownloading}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-md text-sm text-ink-muted hover:text-ink hover:border-brand transition-colors disabled:opacity-50"
              >
                {isDownloading ? (
                  <>
                    <CircleNotch
                      weight="bold"
                      size={14}
                      className="animate-spin"
                    />
                    Downloading...
                  </>
                ) : (
                  <>
                    <FileText weight="bold" size={14} />
                    Download TXT
                  </>
                )}
              </button>
              <button
                onClick={handleDownloadCsv}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-md text-sm text-ink-muted hover:text-ink hover:border-brand transition-colors"
              >
                <FileCsv weight="bold" size={14} />
                Download CSV
              </button>
              <button
                onClick={() => setShowImport(!showImport)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 border rounded-md text-sm transition-colors",
                  showImport
                    ? "border-brand bg-brand/5 text-brand"
                    : "border-border text-ink-muted hover:text-ink hover:border-brand"
                )}
              >
                <UploadSimple weight="bold" size={14} />
                Import
              </button>
              <button
                onClick={loadFields}
                className="ml-auto text-xs text-ink-muted hover:text-ink hover:underline transition-colors"
              >
                Refresh from project
              </button>
            </div>
          </div>

          {/* Import panel */}
          {showImport && (
            <div className="sr-panel space-y-3">
              <h3 className="text-sm font-medium text-ink">
                Import from existing PROSPERO registration
              </h3>
              <p className="text-xs text-ink-muted">
                Paste the content of your existing PROSPERO registration below,
                or upload a text file. Fields will be matched by number and
                merged with your current data.
              </p>
              <textarea
                aria-label="Import text"
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                rows={8}
                placeholder={`Paste PROSPERO registration content here...\n\nExpected format:\n1. Review title\n──────────────\nYour review title here\n\n2. Original language title\n──────────────────────────\n...`}
                className="w-full px-3 py-2 bg-surface-raised border border-border rounded text-sm text-ink placeholder:text-ink-muted resize-y focus:outline-none focus:ring-2 focus:ring-brand/30 font-mono"
              />
              {importError && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <WarningCircle weight="bold" size={12} />
                  {importError}
                </p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleImport}
                  disabled={!importText.trim()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-brand text-white rounded-md text-sm font-medium hover:bg-brand/90 disabled:opacity-50 transition-colors"
                >
                  <Download weight="bold" size={14} />
                  Parse & Import
                </button>
                <label className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-md text-sm text-ink-muted hover:text-ink hover:border-brand transition-colors cursor-pointer">
                  <UploadSimple weight="bold" size={14} />
                  Upload File
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".txt,.csv,.tsv"
                    onChange={handleFileImport}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={() => {
                    setShowImport(false);
                    setImportText("");
                    setImportError(null);
                  }}
                  className="text-xs text-ink-muted hover:text-ink ml-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Fields list */}
          <div className="space-y-3">
            {fields.length === 0 && (
              <p className="text-xs text-ink-muted text-center py-4">
                nothing here yet. get started by generating the protocol.
              </p>
            )}
            {fields.map((field) => {
              const isFilled = field.value.trim() !== "";
              return (
                <div
                  key={field.fieldNumber}
                  className="sr-panel !p-0 overflow-hidden"
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
                    ) : field.required ? (
                      <WarningCircle
                        weight="fill"
                        size={16}
                        className="text-red-500 flex-shrink-0"
                        aria-label="Required — empty"
                      />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-border flex-shrink-0" />
                    )}

                    {/* Field number + name */}
                    <div className="flex-1 min-w-0">
                      <span className="text-xs text-ink-muted font-mono mr-1.5">
                        {field.fieldNumber}.
                      </span>
                      <span className="text-sm text-ink font-medium">
                        {field.fieldName}
                      </span>
                      {field.required && (
                        <span className="text-red-500 text-xs ml-1">*</span>
                      )}
                    </div>

                    {/* Source badge */}
                    <span
                      className={cn(
                        "flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wide flex-shrink-0",
                        field.source === "auto"
                          ? "bg-brand/10 text-brand"
                          : field.source === "imported"
                          ? "bg-green-500/10 text-green-600 dark:text-green-400"
                          : "bg-surface-raised text-ink-muted"
                      )}
                    >
                      {field.source === "auto" ? (
                        <>
                          <Robot size={10} />
                          Auto
                        </>
                      ) : field.source === "imported" ? (
                        <>
                          <UploadSimple size={10} />
                          Imported
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
                  <div className="px-4 pb-3 pt-2 border-t border-border bg-surface-raised/30">
                    <textarea
                      aria-label={field.fieldName}
                      value={field.value}
                      onChange={(e) =>
                        updateField(field.fieldNumber, e.target.value)
                      }
                      rows={field.value.length > 120 ? 4 : 2}
                      placeholder={
                        field.source === "auto"
                          ? "Auto-populated — edit if needed"
                          : field.source === "imported"
                          ? "Imported — edit if needed"
                          : `Enter ${field.fieldName.toLowerCase()}...`
                      }
                      className={cn(
                        "w-full px-3 py-2 bg-surface border rounded text-sm text-ink placeholder:text-ink-muted resize-y focus:outline-none focus:ring-2 focus:ring-brand/30 transition-colors",
                        isFilled
                          ? "border-border"
                          : field.required
                          ? "border-red-500/40 focus:ring-red-500/20"
                          : "border-border"
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer hint */}
          <div className="text-xs text-ink-muted p-3 bg-surface-raised rounded-lg border border-border">
            <strong>How to use:</strong> Fill in all required fields above, then
            use &ldquo;Copy All&rdquo; or download to transfer content to
            PROSPERO&rsquo;s online form at{" "}
            <a
              href="https://www.crd.york.ac.uk/prospero/login.php"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline"
            >
              crd.york.ac.uk/prospero
            </a>
            . Fields marked{" "}
            <span className="text-brand font-semibold">Auto</span> are
            pre-filled from your PICO, search strategy, and project settings.
            Use <span className="font-semibold">Import</span> to load data from
            an existing PROSPERO registration.
          </div>
        </>
      )}
    </div>
  );
}
