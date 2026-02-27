"use client";

import { useState, useCallback, useRef } from "react";
import {
  FileArrowUp,
  MagnifyingGlass,
  CircleNotch,
  Check,
  Warning,
  X,
  ArrowsClockwise,
  Funnel,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { ParsedReference } from "@/lib/references/types";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface ReferenceImportPanelProps {
  /** Called when user clicks "Use Selected" with the chosen references */
  onReferencesSelected: (refs: ParsedReference[]) => void;
}

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------

type ImportTab = "file" | "zotero" | "doi";

const TABS: { key: ImportTab; label: string }[] = [
  { key: "file", label: "File Upload" },
  { key: "zotero", label: "Zotero" },
  { key: "doi", label: "DOI Lookup" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ReferenceImportPanel({
  onReferencesSelected,
}: ReferenceImportPanelProps) {
  const [activeTab, setActiveTab] = useState<ImportTab>("file");
  const [references, setReferences] = useState<ParsedReference[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // File upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  // Zotero
  const [zoteroApiKey, setZoteroApiKey] = useState("");
  const [zoteroUserId, setZoteroUserId] = useState("");

  // DOI
  const [doiInput, setDoiInput] = useState("");

  // ---------------------------------------------------------------------------
  // File Upload handlers
  // ---------------------------------------------------------------------------

  const handleFileContent = useCallback(async (content: string, filename: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/references/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to parse file");
      }

      const data = await res.json();
      const refs = data.references as ParsedReference[];

      if (refs.length === 0) {
        setError(`No references found in ${filename}. Check the file format.`);
      } else {
        setReferences((prev) => {
          // Deduplicate by DOI or title
          const existing = new Set(prev.map((r) => r.doi || r.title));
          const newRefs = refs.filter((r) => !existing.has(r.doi || r.title));
          return [...prev, ...newRefs];
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Parse failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFileDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          handleFileContent(reader.result, file.name);
        }
      };
      reader.readAsText(file);
    },
    [handleFileContent]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          handleFileContent(reader.result, file.name);
        }
      };
      reader.readAsText(file);
      // Reset so the same file can be re-selected
      e.target.value = "";
    },
    [handleFileContent]
  );

  // ---------------------------------------------------------------------------
  // Zotero
  // ---------------------------------------------------------------------------

  const handleZoteroConnect = useCallback(async () => {
    if (!zoteroApiKey.trim() || !zoteroUserId.trim()) {
      setError("Both API Key and User ID are required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/references/zotero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: zoteroApiKey.trim(),
          userId: zoteroUserId.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Zotero connection failed");
      }

      const data = await res.json();
      const refs = data.references as ParsedReference[];

      if (refs.length === 0) {
        setError("No items found in this Zotero library.");
      } else {
        setReferences((prev) => {
          const existing = new Set(prev.map((r) => r.doi || r.title));
          const newRefs = refs.filter((r) => !existing.has(r.doi || r.title));
          return [...prev, ...newRefs];
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Zotero fetch failed");
    } finally {
      setLoading(false);
    }
  }, [zoteroApiKey, zoteroUserId]);

  // ---------------------------------------------------------------------------
  // DOI Lookup
  // ---------------------------------------------------------------------------

  const handleDoiLookup = useCallback(async () => {
    const doi = doiInput.trim();
    if (!doi) {
      setError("Enter a DOI to look up");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/references/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doi }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "DOI lookup failed");
      }

      const data = await res.json();
      const refs = data.references as ParsedReference[];
      if (refs.length > 0) {
        setReferences((prev) => {
          const existing = new Set(prev.map((r) => r.doi || r.title));
          const newRefs = refs.filter((r) => !existing.has(r.doi || r.title));
          return [...prev, ...newRefs];
        });
        setDoiInput("");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "DOI lookup failed");
    } finally {
      setLoading(false);
    }
  }, [doiInput]);

  // ---------------------------------------------------------------------------
  // Selection
  // ---------------------------------------------------------------------------

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelectedIds(new Set(filteredRefs.map((r) => r.id)));
  };

  const deselectAll = () => {
    setSelectedIds(new Set());
  };

  const removeReference = (id: string) => {
    setReferences((prev) => prev.filter((r) => r.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  // ---------------------------------------------------------------------------
  // Filtering
  // ---------------------------------------------------------------------------

  const filteredRefs = references.filter((ref) => {
    const matchesSearch =
      !searchFilter ||
      ref.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      ref.authors.some((a) =>
        a.toLowerCase().includes(searchFilter.toLowerCase())
      ) ||
      (ref.journal?.toLowerCase().includes(searchFilter.toLowerCase()) ?? false);

    const matchesType = typeFilter === "all" || ref.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const refTypes = Array.from(new Set(references.map((r) => r.type)));

  // ---------------------------------------------------------------------------
  // Submit
  // ---------------------------------------------------------------------------

  const handleUseSelected = () => {
    const selected = references.filter((r) => selectedIds.has(r.id));
    if (selected.length === 0) return;
    onReferencesSelected(selected);
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="space-y-4">
      {/* Tab bar */}
      <div className="flex gap-1 p-1 bg-surface-raised rounded-xl">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setError("");
            }}
            className={cn(
              "flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors",
              activeTab === tab.key
                ? "bg-white text-ink shadow-sm dark:bg-surface dark:text-ink"
                : "text-ink-muted hover:text-ink"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="min-h-[120px]">
        {/* FILE UPLOAD */}
        {activeTab === "file" && (
          <div className="space-y-3">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "flex flex-col items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed cursor-pointer transition-colors",
                dragActive
                  ? "border-brand bg-brand/5"
                  : "border-border hover:border-brand/40"
              )}
            >
              <FileArrowUp
                size={28}
                className={cn(
                  dragActive ? "text-brand" : "text-ink-muted"
                )}
              />
              <p className="text-xs text-ink-muted text-center">
                <span className="font-medium text-ink">
                  Drop a .bib or .ris file here
                </span>
                <br />
                or click to browse
              </p>
              <p className="text-[10px] text-ink-muted">
                Supports BibTeX (.bib), RIS (.ris), and CSL-JSON (.json)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".bib,.ris,.json,.txt"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
            <p className="text-[10px] text-ink-muted">
              Tip: Export your Mendeley library as BibTeX, then upload here.
            </p>
          </div>
        )}

        {/* ZOTERO */}
        {activeTab === "zotero" && (
          <div className="space-y-3">
            <p className="text-xs text-ink-muted">
              Connect to your Zotero library. Get your API key and User ID from{" "}
              <a
                href="https://www.zotero.org/settings/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand underline underline-offset-2"
              >
                zotero.org/settings/keys
              </a>
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-medium text-ink-muted block mb-1">
                  API Key
                </label>
                <input
                  type="password"
                  value={zoteroApiKey}
                  onChange={(e) => setZoteroApiKey(e.target.value)}
                  placeholder="Your Zotero API key"
                  className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-border text-xs text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>
              <div>
                <label className="text-[10px] font-medium text-ink-muted block mb-1">
                  User ID
                </label>
                <input
                  value={zoteroUserId}
                  onChange={(e) => setZoteroUserId(e.target.value)}
                  placeholder="Numeric user ID"
                  className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-border text-xs text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>
            </div>
            <button
              onClick={handleZoteroConnect}
              disabled={loading || !zoteroApiKey.trim() || !zoteroUserId.trim()}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors",
                loading || !zoteroApiKey.trim() || !zoteroUserId.trim()
                  ? "bg-surface-raised text-ink-muted cursor-not-allowed"
                  : "bg-brand text-white hover:bg-brand/90"
              )}
            >
              {loading && activeTab === "zotero" ? (
                <CircleNotch size={14} className="animate-spin" />
              ) : (
                <ArrowsClockwise size={14} />
              )}
              {loading && activeTab === "zotero"
                ? "Fetching..."
                : "Connect & Import"}
            </button>
          </div>
        )}

        {/* DOI LOOKUP */}
        {activeTab === "doi" && (
          <div className="space-y-3">
            <p className="text-xs text-ink-muted">
              Look up a single reference by its DOI.
            </p>
            <div className="flex gap-2">
              <input
                value={doiInput}
                onChange={(e) => setDoiInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleDoiLookup();
                }}
                placeholder="e.g., 10.1038/nature12373"
                className="flex-1 px-3 py-2 rounded-lg bg-surface-raised border border-border text-xs text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
              <button
                onClick={handleDoiLookup}
                disabled={loading || !doiInput.trim()}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors",
                  loading || !doiInput.trim()
                    ? "bg-surface-raised text-ink-muted cursor-not-allowed"
                    : "bg-brand text-white hover:bg-brand/90"
                )}
              >
                {loading && activeTab === "doi" ? (
                  <CircleNotch size={14} className="animate-spin" />
                ) : (
                  <MagnifyingGlass size={14} />
                )}
                Lookup
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs">
          <Warning size={14} />
          <span className="flex-1">{error}</span>
          <button onClick={() => setError("")} className="shrink-0">
            <X size={12} />
          </button>
        </div>
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-brand/5 border border-brand/20 text-brand text-xs">
          <CircleNotch size={14} className="animate-spin" />
          Processing...
        </div>
      )}

      {/* Reference list */}
      {references.length > 0 && (
        <div className="space-y-3">
          {/* Header bar */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-ink">
              {references.length} reference{references.length !== 1 ? "s" : ""} imported
              {selectedIds.size > 0 && (
                <span className="text-brand ml-1">
                  ({selectedIds.size} selected)
                </span>
              )}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1 text-[10px] text-ink-muted hover:text-ink transition-colors"
              >
                <Funnel size={12} />
                {showFilters ? <CaretUp size={10} /> : <CaretDown size={10} />}
              </button>
              <button
                onClick={selectAll}
                className="text-[10px] text-brand hover:underline"
              >
                Select all
              </button>
              <button
                onClick={deselectAll}
                className="text-[10px] text-ink-muted hover:underline"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Filter bar */}
          {showFilters && (
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <MagnifyingGlass
                  size={14}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-muted"
                />
                <input
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search references..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-surface-raised border border-border text-xs text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </div>
              {refTypes.length > 1 && (
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-2 py-1.5 rounded-lg bg-surface-raised border border-border text-xs text-ink focus:outline-none focus:ring-2 focus:ring-brand/30"
                >
                  <option value="all">All types</option>
                  {refTypes.map((t) => (
                    <option key={t} value={t}>
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}

          {/* Reference items */}
          <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1">
            {filteredRefs.map((ref) => (
              <div
                key={ref.id}
                onClick={() => toggleSelect(ref.id)}
                className={cn(
                  "flex items-start gap-2.5 p-2.5 rounded-lg cursor-pointer transition-colors",
                  selectedIds.has(ref.id)
                    ? "bg-brand/5 border border-brand/30"
                    : "bg-surface-raised border border-transparent hover:border-border"
                )}
              >
                {/* Checkbox */}
                <div
                  className={cn(
                    "w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                    selectedIds.has(ref.id)
                      ? "bg-brand border-brand"
                      : "border-border"
                  )}
                >
                  {selectedIds.has(ref.id) && (
                    <Check size={10} className="text-white" weight="bold" />
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-ink leading-snug line-clamp-2">
                    {ref.title}
                  </p>
                  <p className="text-[10px] text-ink-muted mt-0.5 truncate">
                    {ref.authors.length > 0
                      ? ref.authors.slice(0, 3).join(", ")
                      : "Unknown authors"}
                    {ref.authors.length > 3 && " et al."}
                    {ref.year ? ` (${ref.year})` : ""}
                  </p>
                  {ref.journal && (
                    <p className="text-[10px] text-ink-muted italic truncate">
                      {ref.journal}
                    </p>
                  )}
                </div>

                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeReference(ref.id);
                  }}
                  className="shrink-0 p-0.5 text-ink-muted hover:text-red-500 transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            ))}

            {filteredRefs.length === 0 && references.length > 0 && (
              <p className="text-xs text-ink-muted text-center py-4">
                No references match your filter.
              </p>
            )}
          </div>

          {/* Use Selected button */}
          <button
            onClick={handleUseSelected}
            disabled={selectedIds.size === 0}
            className={cn(
              "w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
              selectedIds.size > 0
                ? "bg-brand text-white hover:bg-brand/90"
                : "bg-surface-raised text-ink-muted cursor-not-allowed"
            )}
          >
            <Check size={14} weight="bold" />
            Use {selectedIds.size} Selected Reference{selectedIds.size !== 1 ? "s" : ""}
          </button>
        </div>
      )}
    </div>
  );
}
