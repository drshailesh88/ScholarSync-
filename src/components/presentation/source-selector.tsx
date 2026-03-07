"use client";

import { useState } from "react";
import { FileText, TextT, BookOpen, BookBookmark, Globe, CircleNotch, Trash, Plus } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { ReferenceImportPanel } from "./reference-import-panel";
import type { ParsedReference } from "@/lib/references/types";

export type SourceType = "papers" | "document" | "text" | "deep_research" | "references" | "url";

export interface UrlSource {
  url: string;
  title?: string;
  excerpt?: string;
  wordCount?: number;
  fetched: boolean;
  fetching: boolean;
  error?: string;
}

interface SourceSelectorProps {
  sourceType: SourceType;
  onSourceTypeChange: (type: SourceType) => void;
  selectedPaperIds: number[];
  onPaperIdsChange: (ids: number[]) => void;
  selectedDocumentId: number | null;
  onDocumentIdChange: (id: number | null) => void;
  rawText: string;
  onRawTextChange: (text: string) => void;
  /** Callback when references are selected from the import panel */
  onReferencesSelected?: (refs: ParsedReference[]) => void;
  /** Currently selected imported references */
  selectedReferences?: ParsedReference[];
  /** URL sources for "url" source type */
  urlSources?: UrlSource[];
  onUrlSourcesChange?: (sources: UrlSource[]) => void;
}

const SOURCE_OPTIONS: { key: SourceType; label: string; description: string; icon: React.ReactNode }[] = [
  {
    key: "papers",
    label: "From Papers",
    description: "Select papers from your library",
    icon: <BookOpen size={20} />,
  },
  {
    key: "document",
    label: "From Document",
    description: "Use a synthesis document",
    icon: <FileText size={20} />,
  },
  {
    key: "text",
    label: "From Text",
    description: "Paste content directly",
    icon: <TextT size={20} />,
  },
  {
    key: "references",
    label: "Reference Library",
    description: "Import from Zotero, BibTeX, DOI",
    icon: <BookBookmark size={20} />,
  },
  {
    key: "url",
    label: "From URL",
    description: "Paste a link to any web page",
    icon: <Globe size={20} />,
  },
];

export function SourceSelector({
  sourceType,
  onSourceTypeChange,
  selectedPaperIds,
  onPaperIdsChange,
  selectedDocumentId,
  onDocumentIdChange,
  rawText,
  onRawTextChange,
  onReferencesSelected,
  selectedReferences,
  urlSources,
  onUrlSourcesChange,
}: SourceSelectorProps) {
  return (
    <div className="space-y-4">
      {/* Source type selector */}
      <div className="grid grid-cols-5 gap-3">
        {SOURCE_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            onClick={() => onSourceTypeChange(opt.key)}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors text-center",
              sourceType === opt.key
                ? "border-brand bg-brand/5 text-brand"
                : "border-border text-ink-muted hover:border-brand/40"
            )}
          >
            {opt.icon}
            <span className="text-xs font-medium">{opt.label}</span>
            <span className="text-[10px] opacity-60">{opt.description}</span>
          </button>
        ))}
      </div>

      {/* Source-specific input */}
      {sourceType === "papers" && (
        <div>
          <label className="text-sm font-medium text-ink block mb-2">
            Paper IDs{" "}
            <span className="text-ink-muted font-normal">
              (comma-separated)
            </span>
          </label>
          <input
            value={selectedPaperIds.join(", ")}
            onChange={(e) => {
              const ids = e.target.value
                .split(",")
                .map((s) => parseInt(s.trim(), 10))
                .filter((n) => !isNaN(n));
              onPaperIdsChange(ids);
            }}
            placeholder="e.g., 1, 2, 3"
            className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
          <p className="text-[10px] text-ink-muted mt-1">
            Enter the IDs of papers from your library to generate slides from
          </p>
        </div>
      )}

      {sourceType === "document" && (
        <div>
          <label className="text-sm font-medium text-ink block mb-2">
            Document ID
          </label>
          <input
            type="number"
            value={selectedDocumentId ?? ""}
            onChange={(e) =>
              onDocumentIdChange(e.target.value ? parseInt(e.target.value, 10) : null)
            }
            placeholder="Enter document ID"
            className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
          <p className="text-[10px] text-ink-muted mt-1">
            Enter the ID of a synthesis document to generate slides from
          </p>
        </div>
      )}

      {sourceType === "text" && (
        <div>
          <label className="text-sm font-medium text-ink block mb-2">
            Content
          </label>
          <textarea
            value={rawText}
            onChange={(e) => onRawTextChange(e.target.value)}
            placeholder="Paste your research content, abstract, or notes here..."
            rows={8}
            className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30 resize-none"
          />
          <p className="text-[10px] text-ink-muted mt-1">
            {rawText.length} characters
          </p>
        </div>
      )}

      {sourceType === "url" && onUrlSourcesChange && (
        <UrlSourceInput
          sources={urlSources ?? []}
          onChange={onUrlSourcesChange}
        />
      )}

      {sourceType === "references" && onReferencesSelected && (
        <div>
          {selectedReferences && selectedReferences.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-ink">
                  {selectedReferences.length} reference{selectedReferences.length !== 1 ? "s" : ""} selected
                </p>
                <button
                  onClick={() => onReferencesSelected([])}
                  className="text-xs text-ink-muted hover:text-ink transition-colors"
                >
                  Clear & re-import
                </button>
              </div>
              <div className="max-h-48 overflow-y-auto space-y-1.5">
                {selectedReferences.map((ref) => (
                  <div
                    key={ref.id}
                    className="flex items-start gap-2 p-2 rounded-lg bg-surface-raised text-xs"
                  >
                    <BookBookmark size={14} className="text-brand shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="font-medium text-ink line-clamp-1">{ref.title}</p>
                      <p className="text-[10px] text-ink-muted truncate">
                        {ref.authors.slice(0, 2).join(", ")}
                        {ref.authors.length > 2 && " et al."}
                        {ref.year ? ` (${ref.year})` : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <ReferenceImportPanel onReferencesSelected={onReferencesSelected} />
          )}
        </div>
      )}
    </div>
  );
}

function isValidUrl(str: string): boolean {
  try {
    const u = new URL(str);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function UrlSourceInput({
  sources,
  onChange,
}: {
  sources: UrlSource[];
  onChange: (sources: UrlSource[]) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  async function fetchPreview(index: number) {
    const source = sources[index];
    const updated = [...sources];
    updated[index] = { ...source, fetching: true, error: undefined };
    onChange(updated);

    try {
      const res = await fetch("/api/slides/fetch-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: source.url }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to fetch");
      }

      const data = await res.json();
      updated[index] = {
        ...source,
        title: data.title,
        excerpt: data.excerpt,
        wordCount: data.wordCount,
        fetched: true,
        fetching: false,
      };
      onChange([...updated]);
    } catch (err) {
      updated[index] = {
        ...source,
        fetching: false,
        error: err instanceof Error ? err.message : "Failed to fetch",
      };
      onChange([...updated]);
    }
  }

  function addUrl() {
    if (!isValidUrl(inputValue) || sources.length >= 3) return;
    onChange([...sources, { url: inputValue, fetched: false, fetching: false }]);
    setInputValue("");
  }

  function removeUrl(index: number) {
    onChange(sources.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-ink-muted">
        Paste a URL to any article, blog post, or documentation page
      </p>

      {sources.map((source, i) => (
        <div
          key={i}
          className="flex items-start gap-2 p-3 rounded-xl bg-surface-raised border border-border"
        >
          <Globe size={16} className="text-brand shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0 space-y-1">
            <p className="text-xs text-ink truncate">{source.url}</p>
            {source.fetched && source.title && (
              <div>
                <p className="text-xs font-medium text-ink">{source.title}</p>
                <p className="text-[10px] text-ink-muted line-clamp-2">{source.excerpt}</p>
                <p className="text-[10px] text-ink-muted mt-0.5">{source.wordCount?.toLocaleString()} words</p>
              </div>
            )}
            {source.error && (
              <p className="text-[10px] text-red-500">{source.error}</p>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {!source.fetched && !source.fetching && (
              <button
                onClick={() => fetchPreview(i)}
                className="px-2 py-1 rounded-lg bg-brand/10 text-brand text-[10px] font-medium hover:bg-brand/20 transition-colors"
              >
                Fetch Preview
              </button>
            )}
            {source.fetching && (
              <CircleNotch size={14} className="text-brand animate-spin" />
            )}
            <button
              onClick={() => removeUrl(i)}
              className="p-1 rounded-lg text-ink-muted hover:text-red-500 transition-colors"
            >
              <Trash size={14} />
            </button>
          </div>
        </div>
      ))}

      {sources.length < 3 && (
        <div className="flex gap-2">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addUrl();
              }
            }}
            placeholder="https://example.com/article"
            className="flex-1 px-4 py-3 rounded-xl bg-surface-raised border border-border text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
          <button
            onClick={addUrl}
            disabled={!isValidUrl(inputValue)}
            className={cn(
              "flex items-center gap-1 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
              isValidUrl(inputValue)
                ? "bg-brand/10 text-brand hover:bg-brand/20"
                : "bg-surface-raised text-ink-muted cursor-not-allowed"
            )}
          >
            <Plus size={14} /> Add
          </button>
        </div>
      )}

      {sources.length >= 3 && (
        <p className="text-[10px] text-ink-muted">Maximum of 3 URLs reached</p>
      )}
    </div>
  );
}
