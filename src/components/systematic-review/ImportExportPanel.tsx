"use client";

import { useState, useCallback } from "react";
import {
  Upload,
  Download,
  FileText,
  FileCsv,
  CheckCircle,
  CircleNotch,
  WarningCircle,
  X,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ImportExportPanelProps {
  projectId: number;
}

type ExportFormat = "ris" | "bibtex" | "endnote" | "csv";
type PaperFilter = "all" | "included" | "excluded";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ImportExportPanel({ projectId }: ImportExportPanelProps) {
  // Import state
  const [importContent, setImportContent] = useState("");
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<{
    format: string;
    totalParsed: number;
    imported: number;
    duplicatesSkipped: number;
  } | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // Export state
  const [exportFormat, setExportFormat] = useState<ExportFormat>("ris");
  const [exportFilter, setExportFilter] = useState<PaperFilter>("all");
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  // File drop handler
  const handleFileDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);

      const file = e.dataTransfer.files[0];
      if (!file) return;

      const text = await file.text();
      setImportContent(text);
    },
    []
  );

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const text = await file.text();
      setImportContent(text);
    },
    []
  );

  // Import
  const handleImport = async () => {
    if (!importContent.trim()) return;
    setIsImporting(true);
    setImportError(null);
    setImportResult(null);

    try {
      const res = await fetch("/api/systematic-review/import-references", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          content: importContent,
          format: "auto",
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Import failed");
      }

      const data = await res.json();
      setImportResult(data);
      setImportContent("");
    } catch (err) {
      setImportError(err instanceof Error ? err.message : "Import failed");
    } finally {
      setIsImporting(false);
    }
  };

  // Export
  const handleExport = async () => {
    setIsExporting(true);
    setExportError(null);
    try {
      const res = await fetch(
        `/api/systematic-review/export-references?projectId=${projectId}&format=${exportFormat}&filter=${exportFilter}`
      );

      if (!res.ok) throw new Error("Export failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      const ext =
        exportFormat === "bibtex"
          ? "bib"
          : exportFormat === "endnote"
            ? "xml"
            : exportFormat;
      a.download = `references.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setExportError("Failed to export references. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-ink">
          Import & Export References
        </h2>
        <p className="text-sm text-ink-muted mt-1">
          Import references from RIS or BibTeX files, or export your project
          papers for use in reference managers.
        </p>
      </div>

      {/* ─── Import Section ─── */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink flex items-center gap-2">
          <Upload weight="bold" size={16} className="text-brand" />
          Import References
        </h3>

        {/* Drop zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleFileDrop}
          className={cn(
            "relative border-2 border-dashed rounded-lg p-6 text-center transition-colors",
            dragOver
              ? "border-brand bg-brand/5"
              : "border-border hover:border-brand/50"
          )}
        >
          <FileText
            weight="duotone"
            size={32}
            className="mx-auto mb-2 text-ink-muted"
          />
          <p className="text-sm text-ink-muted mb-2">
            Drag & drop a RIS or BibTeX file, or{" "}
            <label className="text-brand cursor-pointer hover:underline">
              browse
              <input
                type="file"
                accept=".ris,.bib,.bibtex,.txt,.nbib"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </p>
          <p className="text-xs text-ink-faint">
            Supports .ris, .bib, .bibtex, .nbib, .txt
          </p>
        </div>

        {/* Or paste */}
        {!importContent && (
          <div className="text-center text-xs text-ink-muted">
            — or paste reference text below —
          </div>
        )}

        {/* Content textarea */}
        <div className="relative">
          <textarea
            value={importContent}
            onChange={(e) => setImportContent(e.target.value)}
            placeholder="Paste RIS or BibTeX content here..."
            className="w-full h-32 px-4 py-3 bg-surface border border-border rounded-lg text-xs text-ink font-mono placeholder:text-ink-faint resize-y focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
          {importContent && (
            <button
              onClick={() => setImportContent("")}
              className="absolute top-2 right-2 p-1 rounded hover:bg-surface-alt text-ink-muted"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleImport}
            disabled={isImporting || !importContent.trim()}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand text-white rounded-md text-sm font-medium hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isImporting ? (
              <>
                <CircleNotch
                  weight="bold"
                  className="animate-spin"
                  size={14}
                />
                Importing...
              </>
            ) : (
              <>
                <Upload weight="bold" size={14} />
                Import References
              </>
            )}
          </button>

          {importContent && (
            <span className="text-xs text-ink-muted">
              {importContent.length.toLocaleString()} characters
            </span>
          )}
        </div>

        {/* Import result */}
        {importResult && (
          <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
            <CheckCircle weight="fill" className="text-green-600" size={20} />
            <div className="text-sm">
              <span className="font-medium text-green-700 dark:text-green-400">
                Import complete.
              </span>{" "}
              <span className="text-green-600 dark:text-green-500">
                Detected {importResult.format.toUpperCase()} format.{" "}
                {importResult.totalParsed} references parsed,{" "}
                {importResult.imported} imported,{" "}
                {importResult.duplicatesSkipped} duplicates skipped.
              </span>
            </div>
          </div>
        )}

        {importError && (
          <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
            <WarningCircle weight="fill" className="text-red-600" size={20} />
            <p className="text-sm text-red-600 dark:text-red-400">
              {importError}
            </p>
          </div>
        )}
      </div>

      {/* Divider */}
      <hr className="border-border" />

      {/* ─── Export Section ─── */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-ink flex items-center gap-2">
          <Download weight="bold" size={16} className="text-brand" />
          Export References
        </h3>

        <div className="flex flex-wrap items-end gap-4 p-4 bg-surface-alt rounded-lg border border-border">
          {/* Format selector */}
          <div>
            <label className="text-xs text-ink-muted font-medium block mb-1.5">
              Format
            </label>
            <div className="flex gap-1">
              {(
                [
                  { val: "ris" as const, label: "RIS" },
                  { val: "bibtex" as const, label: "BibTeX" },
                  { val: "endnote" as const, label: "EndNote XML" },
                  { val: "csv" as const, label: "CSV" },
                ] as const
              ).map(({ val, label }) => (
                <button
                  key={val}
                  onClick={() => setExportFormat(val)}
                  className={cn(
                    "px-2.5 py-1 rounded text-xs font-medium transition-colors",
                    exportFormat === val
                      ? "bg-brand text-white"
                      : "bg-surface text-ink-muted hover:text-ink border border-border"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Filter selector */}
          <div>
            <label className="text-xs text-ink-muted font-medium block mb-1.5">
              Papers
            </label>
            <div className="flex gap-1">
              {(
                [
                  { val: "all" as const, label: "All" },
                  { val: "included" as const, label: "Included" },
                  { val: "excluded" as const, label: "Excluded" },
                ] as const
              ).map(({ val, label }) => (
                <button
                  key={val}
                  onClick={() => setExportFilter(val)}
                  className={cn(
                    "px-2.5 py-1 rounded text-xs font-medium transition-colors",
                    exportFilter === val
                      ? "bg-brand text-white"
                      : "bg-surface text-ink-muted hover:text-ink border border-border"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Export button */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-brand text-white rounded-md text-sm font-medium hover:bg-brand/90 disabled:opacity-50 transition-colors ml-auto"
          >
            {isExporting ? (
              <>
                <CircleNotch
                  weight="bold"
                  className="animate-spin"
                  size={14}
                />
                Exporting...
              </>
            ) : (
              <>
                {exportFormat === "csv" ? (
                  <FileCsv weight="bold" size={14} />
                ) : (
                  <Download weight="bold" size={14} />
                )}
                Download {exportFormat.toUpperCase()}
              </>
            )}
          </button>
        </div>

        {exportError && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400 flex items-center justify-between">
            <span>{exportError}</span>
            <button onClick={() => setExportError(null)} className="text-red-400 hover:text-red-300">&#x2715;</button>
          </div>
        )}

        {/* Format info */}
        <div className="text-xs text-ink-faint space-y-1">
          <p>
            <strong>RIS</strong> — Compatible with Zotero, Mendeley, EndNote,
            RefWorks, and most reference managers.
          </p>
          <p>
            <strong>BibTeX</strong> — For LaTeX workflows and Overleaf.
          </p>
          <p>
            <strong>EndNote XML</strong> — Native format for EndNote desktop.
          </p>
          <p>
            <strong>CSV</strong> — Spreadsheet-friendly format for custom
            analysis.
          </p>
        </div>
      </div>
    </div>
  );
}
