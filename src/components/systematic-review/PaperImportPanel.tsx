"use client";

import { useState, useCallback } from "react";
import {
  DownloadSimple,
  CircleNotch,
  CheckCircle,
  Database,
  FileArrowUp,
  Trash,
  Eye,
  FilePdf,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import { useSystematicReviewStore } from "@/stores/systematic-review-store";

interface PaperImportPanelProps {
  projectId: number;
}

type ImportSource = "pubmed" | "semantic_scholar" | "openalex";

interface ProjectPaper {
  ppId: number;
  paperId: number;
  title: string;
  authors: unknown;
  journal: string | null;
  year: number | null;
  doi: string | null;
  pmid: string | null;
  abstract: string | null;
  citationCount: number | null;
  studyType: string | null;
  evidenceLevel: string | null;
  pdfStoragePath: string | null;
  fullTextAvailable: boolean | null;
  status: string | null;
  screeningDecision: string | null;
}

export function PaperImportPanel({ projectId }: PaperImportPanelProps) {
  const { generatedStrategy } = useSystematicReviewStore();

  const [isImporting, setIsImporting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [importResult, setImportResult] = useState<{
    imported: number;
    duplicatesSkipped: number;
    totalFound: number;
  } | null>(null);

  const [papers, setPapers] = useState<ProjectPaper[]>([]);
  const [isLoadingPapers, setIsLoadingPapers] = useState(false);
  const [selectedSources, setSelectedSources] = useState<ImportSource[]>([
    "pubmed",
  ]);
  const [maxResults, setMaxResults] = useState(100);
  const [customSearch, setCustomSearch] = useState("");
  const [expandedPaper, setExpandedPaper] = useState<number | null>(null);

  // Load papers for this project
  const loadPapers = useCallback(async () => {
    setIsLoadingPapers(true);
    try {
      const res = await fetch(
        `/api/systematic-review/import?projectId=${projectId}`
      );
      if (res.ok) {
        const data = await res.json();
        setPapers(data.papers ?? []);
      }
    } catch {
      // Non-critical
    } finally {
      setIsLoadingPapers(false);
    }
  }, [projectId]);

  // Import from search
  const handleImport = useCallback(async () => {
    const searchString =
      customSearch.trim() || generatedStrategy?.fullSearchString;
    if (!searchString) return;

    setIsImporting(true);
    setImportResult(null);
    try {
      const res = await fetch("/api/systematic-review/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          searchString,
          sources: selectedSources,
          maxResults,
        }),
      });

      if (!res.ok) throw new Error("Import failed");
      const result = await res.json();
      setImportResult(result);

      // Reload papers
      await loadPapers();
    } catch {
      // Error state
    } finally {
      setIsImporting(false);
    }
  }, [
    projectId,
    customSearch,
    generatedStrategy,
    selectedSources,
    maxResults,
    loadPapers,
  ]);

  // Upload PDF
  const handleFileUpload = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      setIsUploading(true);
      try {
        for (const file of Array.from(files)) {
          if (file.type !== "application/pdf") continue;

          const formData = new FormData();
          formData.append("projectId", String(projectId));
          formData.append("file", file);

          await fetch("/api/systematic-review/upload", {
            method: "POST",
            body: formData,
          });
        }

        await loadPapers();
      } catch {
        // Error state
      } finally {
        setIsUploading(false);
      }
    },
    [projectId, loadPapers]
  );

  const toggleSource = (source: ImportSource) => {
    setSelectedSources((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source]
    );
  };

  // Load papers on first render
  useState(() => {
    loadPapers();
  });

  return (
    <div className="space-y-6">
      {/* Database Import */}
      <GlassPanel className="p-6">
        <h3 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
          <Database weight="duotone" className="text-brand" />
          Import from Databases
        </h3>

        {/* Search string — use generated strategy or custom */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-ink mb-1">
            Search Query
          </label>
          {generatedStrategy?.fullSearchString ? (
            <div className="space-y-2">
              <div className="px-3 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded text-xs text-emerald-700">
                Using generated PICO search strategy (
                {generatedStrategy.estimatedResults?.toLocaleString() ?? "?"}{" "}
                estimated results)
              </div>
              <input
                type="text"
                value={customSearch}
                onChange={(e) => setCustomSearch(e.target.value)}
                placeholder="Or override with custom search string..."
                className="w-full px-3 py-2 bg-surface-raised border border-border rounded text-sm text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-brand/40 outline-none"
              />
            </div>
          ) : (
            <input
              type="text"
              value={customSearch}
              onChange={(e) => setCustomSearch(e.target.value)}
              placeholder="Enter PubMed search string (generate one in Search Strategy tab first)"
              className="w-full px-3 py-2 bg-surface-raised border border-border rounded text-sm text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-brand/40 outline-none"
            />
          )}
        </div>

        {/* Source selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-ink mb-2">
            Databases
          </label>
          <div className="flex gap-2">
            {(
              [
                ["pubmed", "PubMed"],
                ["semantic_scholar", "Semantic Scholar"],
                ["openalex", "OpenAlex"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                onClick={() => toggleSource(key)}
                className={cn(
                  "px-3 py-1.5 rounded text-sm border transition-colors",
                  selectedSources.includes(key)
                    ? "bg-brand/10 border-brand/30 text-brand font-medium"
                    : "bg-surface-raised border-border text-ink-muted hover:border-brand/20"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Max results */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-ink mb-1">
            Max Results Per Source
          </label>
          <select
            value={maxResults}
            onChange={(e) => setMaxResults(parseInt(e.target.value, 10))}
            className="px-3 py-2 bg-surface-raised border border-border rounded text-sm text-ink"
          >
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={500}>500</option>
          </select>
        </div>

        {/* Import button */}
        <button
          onClick={handleImport}
          disabled={
            isImporting ||
            (!customSearch.trim() && !generatedStrategy?.fullSearchString) ||
            selectedSources.length === 0
          }
          className="px-4 py-2 bg-brand text-white rounded text-sm font-medium hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isImporting ? (
            <CircleNotch weight="bold" className="animate-spin" size={16} />
          ) : (
            <DownloadSimple weight="bold" size={16} />
          )}
          {isImporting ? "Importing..." : "Import Papers"}
        </button>

        {/* Import result */}
        {importResult && (
          <div className="mt-4 p-3 bg-emerald-500/5 border border-emerald-500/20 rounded">
            <div className="flex items-center gap-2 text-sm text-emerald-700">
              <CheckCircle weight="fill" size={18} />
              <span>
                Imported <strong>{importResult.imported}</strong> papers from{" "}
                {importResult.totalFound} results.
                {importResult.duplicatesSkipped > 0 && (
                  <span className="text-ink-muted ml-1">
                    ({importResult.duplicatesSkipped} duplicates skipped)
                  </span>
                )}
              </span>
            </div>
          </div>
        )}
      </GlassPanel>

      {/* PDF Upload */}
      <GlassPanel className="p-6">
        <h3 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
          <FileArrowUp weight="duotone" className="text-brand" />
          Upload PDFs
        </h3>

        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            isUploading
              ? "border-brand/40 bg-brand/5"
              : "border-border hover:border-brand/30"
          )}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleFileUpload(e.dataTransfer.files);
          }}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <CircleNotch
                weight="bold"
                className="animate-spin text-brand"
                size={24}
              />
              <span className="text-sm text-ink-muted">Uploading...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <FilePdf weight="duotone" className="text-ink-muted" size={32} />
              <p className="text-sm text-ink-muted">
                Drag & drop PDF files here, or{" "}
                <label className="text-brand cursor-pointer hover:underline">
                  browse
                  <input
                    type="file"
                    accept=".pdf"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                </label>
              </p>
              <p className="text-xs text-ink-muted">
                PDFs will be processed for full-text extraction and embedding
              </p>
            </div>
          )}
        </div>
      </GlassPanel>

      {/* Papers List */}
      {papers.length > 0 && (
        <GlassPanel className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-ink">
              Project Papers ({papers.length})
            </h3>
            <button
              onClick={loadPapers}
              disabled={isLoadingPapers}
              className="text-xs text-brand hover:underline"
            >
              {isLoadingPapers ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {papers.map((paper) => (
              <div
                key={paper.ppId}
                className="border border-border rounded p-3 hover:border-brand/20 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-sm font-medium text-ink cursor-pointer hover:text-brand"
                      onClick={() =>
                        setExpandedPaper(
                          expandedPaper === paper.paperId
                            ? null
                            : paper.paperId
                        )
                      }
                    >
                      {paper.title}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-ink-muted">
                      {paper.journal && <span>{paper.journal}</span>}
                      {paper.year && <span>({paper.year})</span>}
                      {paper.citationCount != null &&
                        paper.citationCount > 0 && (
                          <span>{paper.citationCount} citations</span>
                        )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    {paper.pdfStoragePath && (
                      <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-600 text-xs rounded">
                        PDF
                      </span>
                    )}
                    {paper.screeningDecision && (
                      <span
                        className={cn(
                          "px-1.5 py-0.5 text-xs rounded",
                          paper.screeningDecision === "include"
                            ? "bg-emerald-500/10 text-emerald-600"
                            : paper.screeningDecision === "exclude"
                              ? "bg-red-500/10 text-red-600"
                              : "bg-amber-500/10 text-amber-600"
                        )}
                      >
                        {paper.screeningDecision}
                      </span>
                    )}
                  </div>
                </div>

                {/* Expanded view */}
                {expandedPaper === paper.paperId && (
                  <div className="mt-3 pt-3 border-t border-border/50">
                    {paper.abstract && (
                      <p className="text-xs text-ink-muted mb-2 line-clamp-4">
                        {paper.abstract}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-xs">
                      {paper.doi && (
                        <a
                          href={`https://doi.org/${paper.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:underline"
                        >
                          DOI
                        </a>
                      )}
                      {paper.pmid && (
                        <a
                          href={`https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand hover:underline"
                        >
                          PubMed
                        </a>
                      )}
                      {paper.studyType && (
                        <span className="px-1.5 py-0.5 bg-surface-raised rounded text-ink-muted">
                          {paper.studyType}
                        </span>
                      )}
                      {paper.evidenceLevel && (
                        <span className="px-1.5 py-0.5 bg-brand/10 text-brand rounded">
                          Level {paper.evidenceLevel}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </GlassPanel>
      )}
    </div>
  );
}
