"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  MagnifyingGlass,
  X,
  Plus,
  SpinnerGap,
  ArrowSquareOut,
  BookOpen,
  Hash,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useReferenceStore } from "@/stores/reference-store";
import type { Reference } from "@/types/citation";

interface CitationDialogProps {
  open: boolean;
  onClose: () => void;
  onInsert: (referenceIds: string[]) => void;
  documentId?: string;
}

type DialogTab = "search" | "doi" | "manual";

export function CitationDialog({
  open,
  onClose,
  onInsert,
  documentId = "default",
}: CitationDialogProps) {
  const references = useReferenceStore((s) => s.references);
  const addReference = useReferenceStore((s) => s.addReference);
  const referenceNumberMap = useReferenceStore((s) => s.referenceNumberMap);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<DialogTab>("search");
  const [focusedIndex, setFocusedIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // DOI resolver state
  const [doiInput, setDoiInput] = useState("");
  const [doiLoading, setDoiLoading] = useState(false);
  const [doiError, setDoiError] = useState<string | null>(null);
  const [doiPreview, setDoiPreview] = useState<Reference | null>(null);

  // Manual entry state
  const [manualForm, setManualForm] = useState({
    type: "article" as Reference["type"],
    title: "",
    authorInput: "",
    journal: "",
    year: "",
    volume: "",
    issue: "",
    pages: "",
    doi: "",
    pmid: "",
    url: "",
  });

  // Reset state on open
  useEffect(() => {
    if (open) {
      setSearchQuery("");
      setSelectedIds([]);
      setActiveTab("search");
      setFocusedIndex(0);
      setDoiInput("");
      setDoiLoading(false);
      setDoiError(null);
      setDoiPreview(null);
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Filter references based on search query
  const filteredRefs = useMemo(() => {
    const allRefs = Array.from(references.values());
    if (!searchQuery.trim()) return allRefs;

    const q = searchQuery.toLowerCase();
    return allRefs.filter(
      (ref) =>
        ref.title.toLowerCase().includes(q) ||
        ref.authors.some(
          (a) =>
            a.family.toLowerCase().includes(q) ||
            a.given.toLowerCase().includes(q)
        ) ||
        ref.journal?.toLowerCase().includes(q) ||
        ref.year?.toString().includes(q) ||
        ref.doi?.toLowerCase().includes(q) ||
        ref.pmid?.includes(q)
    );
  }, [references, searchQuery]);

  // Detect DOI/PMID in search input
  const detectedIdentifier = useMemo(() => {
    const q = searchQuery.trim();
    if (q.startsWith("10.") || q.includes("doi.org/")) return "doi";
    if (/^\d{1,8}$/.test(q)) return "pmid";
    return null;
  }, [searchQuery]);

  // Toggle reference selection
  const toggleSelection = useCallback((refId: string) => {
    setSelectedIds((prev) =>
      prev.includes(refId)
        ? prev.filter((id) => id !== refId)
        : [...prev, refId]
    );
  }, []);

  // Handle keyboard navigation in reference list
  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((i) =>
          Math.min(i + 1, filteredRefs.length - 1)
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && filteredRefs.length > 0) {
        e.preventDefault();
        if (detectedIdentifier) {
          handleResolveIdentifier(searchQuery.trim());
        } else {
          toggleSelection(filteredRefs[focusedIndex].id);
        }
      }
    },
    [filteredRefs, focusedIndex, toggleSelection, detectedIdentifier, searchQuery]
  );

  // Resolve DOI/PMID
  const handleResolveIdentifier = async (identifier: string) => {
    setDoiLoading(true);
    setDoiError(null);
    setDoiPreview(null);
    setActiveTab("doi");
    setDoiInput(identifier);

    try {
      const res = await fetch("/api/references/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, documentId }),
      });

      const data = await res.json();

      if (data.success && data.reference) {
        setDoiPreview(data.reference);
      } else {
        setDoiError(
          data.error || "Could not resolve identifier."
        );
      }
    } catch {
      setDoiError("Network error. Please try again.");
    } finally {
      setDoiLoading(false);
    }
  };

  // Add resolved reference and select it
  const handleAddResolved = () => {
    if (!doiPreview) return;
    addReference(doiPreview);
    setSelectedIds((prev) => [...prev, doiPreview.id]);
    setDoiPreview(null);
    setDoiInput("");
    setActiveTab("search");
  };

  // Handle manual reference entry
  const handleManualSave = () => {
    const authors = manualForm.authorInput
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean)
      .map((name) => {
        const parts = name.split(/\s+/);
        if (parts.length === 1) return { given: "", family: parts[0] };
        const family = parts[parts.length - 1];
        const given = parts.slice(0, -1).join(" ");
        return { given, family };
      });

    const id = `ref_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const year = parseInt(manualForm.year, 10) || 0;

    const ref: Reference = {
      id,
      documentId,
      type: manualForm.type,
      title: manualForm.title || "Untitled",
      authors,
      year,
      journal: manualForm.journal || undefined,
      volume: manualForm.volume || undefined,
      issue: manualForm.issue || undefined,
      pages: manualForm.pages || undefined,
      doi: manualForm.doi || undefined,
      pmid: manualForm.pmid || undefined,
      url: manualForm.url || undefined,
      dateAdded: new Date().toISOString(),
      cslData: {
        id,
        type:
          manualForm.type === "article"
            ? "article-journal"
            : manualForm.type,
        title: manualForm.title || "Untitled",
        author: authors.map((a) => ({
          given: a.given,
          family: a.family,
        })),
        "container-title": manualForm.journal || undefined,
        volume: manualForm.volume || undefined,
        issue: manualForm.issue || undefined,
        page: manualForm.pages || undefined,
        DOI: manualForm.doi || undefined,
        ...(year ? { issued: { "date-parts": [[year]] } } : {}),
      },
    };

    addReference(ref);
    setSelectedIds((prev) => [...prev, ref.id]);
    setManualForm({
      type: "article",
      title: "",
      authorInput: "",
      journal: "",
      year: "",
      volume: "",
      issue: "",
      pages: "",
      doi: "",
      pmid: "",
      url: "",
    });
    setActiveTab("search");
  };

  // Insert selected citations
  const handleInsert = () => {
    if (selectedIds.length === 0) return;
    onInsert(selectedIds);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className="relative w-full max-w-lg mx-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <BookOpen
              size={18}
              className="text-blue-600 dark:text-blue-400"
            />
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Insert Citation
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 px-4">
          {(
            [
              { key: "search", label: "Your References" },
              { key: "doi", label: "Paste DOI/PMID" },
              { key: "manual", label: "Manual Entry" },
            ] as { key: DialogTab; label: string }[]
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "px-3 py-2 text-xs font-medium border-b-2 transition-colors",
                activeTab === tab.key
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-h-[400px] overflow-y-auto">
          {/* Search tab */}
          {activeTab === "search" && (
            <div>
              {/* Search input */}
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                <div className="relative">
                  <MagnifyingGlass
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setFocusedIndex(0);
                    }}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search references or paste DOI/PMID..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                    autoFocus
                  />
                </div>
              </div>

              {/* Identifier detection banner */}
              {detectedIdentifier && (
                <button
                  onClick={() =>
                    handleResolveIdentifier(searchQuery.trim())
                  }
                  className="w-full flex items-center gap-2 px-4 py-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors border-b border-blue-100 dark:border-blue-800"
                >
                  <ArrowSquareOut size={14} />
                  Resolve {detectedIdentifier.toUpperCase()}:{" "}
                  <span className="font-mono">
                    {searchQuery.trim()}
                  </span>
                </button>
              )}

              {/* Reference list */}
              {filteredRefs.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {references.size === 0
                      ? "No references yet. Add one using DOI/PMID or manual entry."
                      : "No matching references found."}
                  </p>
                </div>
              ) : (
                <div className="py-1">
                  {filteredRefs.map((ref, idx) => {
                    const isSelected = selectedIds.includes(ref.id);
                    const isFocused = idx === focusedIndex;
                    const num = referenceNumberMap.get(ref.id);

                    return (
                      <button
                        key={ref.id}
                        onClick={() => toggleSelection(ref.id)}
                        onMouseEnter={() => setFocusedIndex(idx)}
                        className={cn(
                          "w-full flex items-start gap-3 px-4 py-2.5 text-left transition-colors",
                          isSelected &&
                            "bg-blue-50 dark:bg-blue-900/30",
                          isFocused &&
                            !isSelected &&
                            "bg-gray-50 dark:bg-gray-800/50",
                          !isSelected &&
                            !isFocused &&
                            "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        )}
                      >
                        {/* Checkbox */}
                        <div
                          className={cn(
                            "mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors",
                            isSelected
                              ? "bg-blue-500 border-blue-500"
                              : "border-gray-300 dark:border-gray-600"
                          )}
                        >
                          {isSelected && (
                            <svg
                              width="10"
                              height="8"
                              viewBox="0 0 10 8"
                              fill="none"
                            >
                              <path
                                d="M1 4L3.5 6.5L9 1"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>

                        {/* Reference info */}
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
                            {ref.title}
                          </p>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                            {formatAuthorsShort(ref.authors)}
                            {ref.year ? ` (${ref.year})` : ""}
                            {ref.journal ? ` - ${ref.journal}` : ""}
                          </p>
                        </div>

                        {/* Citation number badge */}
                        {num !== undefined && (
                          <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 mt-0.5">
                            [{num}]
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* DOI/PMID tab */}
          {activeTab === "doi" && (
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Paste DOI or PMID
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={doiInput}
                    onChange={(e) => {
                      setDoiInput(e.target.value);
                      setDoiError(null);
                    }}
                    placeholder="10.1056/NEJMoa2301234 or 37654789"
                    className="flex-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && doiInput.trim()) {
                        handleResolveIdentifier(doiInput.trim());
                      }
                    }}
                    autoFocus
                  />
                  <button
                    onClick={() =>
                      doiInput.trim() &&
                      handleResolveIdentifier(doiInput.trim())
                    }
                    disabled={!doiInput.trim() || doiLoading}
                    className="px-3 py-2 rounded-lg bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {doiLoading ? (
                      <SpinnerGap
                        size={14}
                        className="animate-spin"
                      />
                    ) : (
                      "Resolve"
                    )}
                  </button>
                </div>
              </div>

              {doiError && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs">
                  {doiError}
                  <button
                    onClick={() => setActiveTab("manual")}
                    className="block mt-1 text-red-500 underline hover:no-underline"
                  >
                    Try manual entry
                  </button>
                </div>
              )}

              {doiPreview && (
                <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <p className="text-xs font-medium text-gray-900 dark:text-gray-100">
                    {doiPreview.title}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                    {formatAuthorsShort(doiPreview.authors)}
                    {doiPreview.year
                      ? ` (${doiPreview.year})`
                      : ""}
                    {doiPreview.journal
                      ? ` - ${doiPreview.journal}`
                      : ""}
                  </p>
                  <button
                    onClick={handleAddResolved}
                    className="mt-2 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500 text-white text-xs font-medium hover:bg-green-600 transition-colors"
                  >
                    <Plus size={12} />
                    Add to References
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Manual entry tab */}
          {activeTab === "manual" && (
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                    Type
                  </label>
                  <select
                    value={manualForm.type}
                    onChange={(e) =>
                      setManualForm({
                        ...manualForm,
                        type: e.target.value as Reference["type"],
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-900 dark:text-gray-100 focus:outline-none"
                  >
                    <option value="article">Article</option>
                    <option value="book">Book</option>
                    <option value="chapter">Book Chapter</option>
                    <option value="website">Website</option>
                    <option value="guideline">Guideline</option>
                    <option value="conference">Conference</option>
                    <option value="thesis">Thesis</option>
                    <option value="preprint">Preprint</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={manualForm.title}
                    onChange={(e) =>
                      setManualForm({
                        ...manualForm,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-900 dark:text-gray-100 focus:outline-none"
                    placeholder="Article title"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                    Authors (comma separated)
                  </label>
                  <input
                    type="text"
                    value={manualForm.authorInput}
                    onChange={(e) =>
                      setManualForm({
                        ...manualForm,
                        authorInput: e.target.value,
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-900 dark:text-gray-100 focus:outline-none"
                    placeholder="John Smith, Jane Doe"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                    Journal
                  </label>
                  <input
                    type="text"
                    value={manualForm.journal}
                    onChange={(e) =>
                      setManualForm({
                        ...manualForm,
                        journal: e.target.value,
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-900 dark:text-gray-100 focus:outline-none"
                    placeholder="N Engl J Med"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    value={manualForm.year}
                    onChange={(e) =>
                      setManualForm({
                        ...manualForm,
                        year: e.target.value,
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-900 dark:text-gray-100 focus:outline-none"
                    placeholder="2024"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                    Volume
                  </label>
                  <input
                    type="text"
                    value={manualForm.volume}
                    onChange={(e) =>
                      setManualForm({
                        ...manualForm,
                        volume: e.target.value,
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-900 dark:text-gray-100 focus:outline-none"
                    placeholder="389"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                    Issue
                  </label>
                  <input
                    type="text"
                    value={manualForm.issue}
                    onChange={(e) =>
                      setManualForm({
                        ...manualForm,
                        issue: e.target.value,
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-900 dark:text-gray-100 focus:outline-none"
                    placeholder="4"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                    Pages
                  </label>
                  <input
                    type="text"
                    value={manualForm.pages}
                    onChange={(e) =>
                      setManualForm({
                        ...manualForm,
                        pages: e.target.value,
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-900 dark:text-gray-100 focus:outline-none"
                    placeholder="312-320"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                    DOI
                  </label>
                  <input
                    type="text"
                    value={manualForm.doi}
                    onChange={(e) =>
                      setManualForm({
                        ...manualForm,
                        doi: e.target.value,
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs text-gray-900 dark:text-gray-100 focus:outline-none"
                    placeholder="10.1056/NEJMoa..."
                  />
                </div>
              </div>

              <button
                onClick={handleManualSave}
                disabled={!manualForm.title.trim()}
                className="w-full mt-2 px-3 py-2 rounded-lg bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Save Reference
              </button>
            </div>
          )}
        </div>

        {/* Selected references & Insert button */}
        {selectedIds.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Hash
                size={12}
                className="text-gray-400"
              />
              <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Selected ({selectedIds.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {selectedIds.map((id) => {
                const ref = references.get(id);
                if (!ref) return null;
                return (
                  <span
                    key={id}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-medium"
                  >
                    {ref.authors[0]?.family || "Unknown"}{" "}
                    {ref.year || ""}
                    <button
                      onClick={() =>
                        setSelectedIds((prev) =>
                          prev.filter((i) => i !== id)
                        )
                      }
                      className="ml-0.5 hover:text-red-500 transition-colors"
                    >
                      <X size={10} />
                    </button>
                  </span>
                );
              })}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleInsert}
                className="px-4 py-1.5 rounded-lg bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition-colors"
              >
                Insert Citation
              </button>
            </div>
          </div>
        )}

        {/* Cancel button when nothing selected */}
        {selectedIds.length === 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-end">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function formatAuthorsShort(
  authors: { given: string; family: string }[]
): string {
  if (authors.length === 0) return "";
  if (authors.length === 1) return authors[0].family;
  if (authors.length === 2)
    return `${authors[0].family} & ${authors[1].family}`;
  return `${authors[0].family} et al.`;
}
