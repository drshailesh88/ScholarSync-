"use client";

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import {
  FolderSimple,
  Star,
  Trash,
  BookOpen,
  ClipboardText,
  FilePdf,
  GlobeSimple,
  Plus,
  Upload,
  Eye,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { SearchInput } from "@/components/ui/search-input";
import { Tabs } from "@/components/ui/tabs";
import { Modal } from "@/components/ui/modal";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("@/components/ui/pdf-viewer").then((mod) => mod.PDFViewer),
  { ssr: false }
);
import {
  getUserPapers,
  toggleFavorite as toggleFavoriteAction,
  removePaper as removePaperAction,
} from "@/lib/actions/papers";
import { getAllCitationFormats } from "@/lib/actions/citations";
import type { PaperData, CitationStyle } from "@/lib/citations";

type Paper = {
  id: number;
  title: string;
  authors: string[] | unknown;
  journal: string | null;
  year: number | null;
  doi: string | null;
  abstract: string | null;
  source: string;
  citation_count: number | null;
  refId: number;
  isFavorite: boolean | null;
  collection: string | null;
  notes: string | null;
  tags: unknown;
};

/** Safely coerce authors jsonb to string[] */
function getAuthors(paper: Paper): string[] {
  if (Array.isArray(paper.authors)) {
    return paper.authors.map(String);
  }
  return [];
}

const citationTabs = [
  { key: "apa", label: "APA 7" },
  { key: "mla", label: "MLA 9" },
  { key: "chicago", label: "Chicago" },
  { key: "vancouver", label: "Vancouver" },
  { key: "harvard", label: "Harvard" },
  { key: "bibtex", label: "BibTeX" },
];

/** Convert Paper to PaperData for the citation library */
function toPaperData(paper: Paper): PaperData {
  return {
    title: paper.title,
    authors: getAuthors(paper),
    journal: paper.journal ?? undefined,
    year: paper.year ?? undefined,
    doi: paper.doi ?? undefined,
  };
}

type CitationFormats = {
  apa: { full: string; inText: string };
  mla: { full: string; inText: string };
  chicago: { full: string; inText: string };
  vancouver: { full: string; inText: string };
  harvard: { full: string; inText: string };
  bibtex: string;
};

export default function LibraryPage() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"recent" | "title" | "year">("recent");
  const [citeModal, setCiteModal] = useState<Paper | null>(null);
  const [citationTab, setCitationTab] = useState("apa");
  const [copied, setCopied] = useState<string | null>(null);
  const [citationFormats, setCitationFormats] = useState<CitationFormats | null>(null);
  const [citationLoading, setCitationLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [viewingPaperId, setViewingPaperId] = useState<number | null>(null);

  const fetchPapers = useCallback(async () => {
    try {
      const data = await getUserPapers();
      setPapers(data as Paper[]);
    } catch (err) {
      console.error("Failed to fetch papers:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPapers();
  }, [fetchPapers]);

  const favorites = useMemo(() => papers.filter((p) => p.isFavorite), [papers]);

  /** Derive collections from the distinct `collection` values in the papers */
  const collections = useMemo(() => {
    const collectionMap = new Map<string, number>();
    for (const p of papers) {
      const col = p.collection || "All Papers";
      if (col !== "All Papers") {
        collectionMap.set(col, (collectionMap.get(col) || 0) + 1);
      }
    }
    return Array.from(collectionMap.entries()).map(([name, count]) => ({
      id: name,
      name,
      paperCount: count,
    }));
  }, [papers]);

  const filtered = useMemo(() => {
    let result = papers;
    if (activeCollection === "favorites") {
      result = favorites;
    } else if (activeCollection && activeCollection !== "all") {
      result = papers.filter((p) => p.collection === activeCollection);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          getAuthors(p).some((a) => a.toLowerCase().includes(q))
      );
    }
    return [...result].sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "year") return (b.year ?? 0) - (a.year ?? 0);
      return 0;
    });
  }, [papers, activeCollection, search, sortBy, favorites]);

  const handleToggleFavorite = async (refId: number) => {
    // Optimistic update
    setPapers((prev) =>
      prev.map((p) =>
        p.refId === refId ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
    try {
      await toggleFavoriteAction(refId);
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
      // Revert on error
      setPapers((prev) =>
        prev.map((p) =>
          p.refId === refId ? { ...p, isFavorite: !p.isFavorite } : p
        )
      );
    }
  };

  const handleDeletePaper = async (refId: number) => {
    const previous = papers;
    // Optimistic update
    setPapers((prev) => prev.filter((p) => p.refId !== refId));
    try {
      await removePaperAction(refId);
    } catch (err) {
      console.error("Failed to remove paper:", err);
      // Revert on error
      setPapers(previous);
    }
  };

  const openCiteModal = useCallback(async (paper: Paper) => {
    setCiteModal(paper);
    setCitationTab("apa");
    setCitationLoading(true);
    setCitationFormats(null);
    try {
      const formats = await getAllCitationFormats(toPaperData(paper));
      setCitationFormats(formats);
    } catch (err) {
      console.error("Failed to format citations:", err);
    } finally {
      setCitationLoading(false);
    }
  }, []);

  const handlePdfUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      // Step 1: Extract basic metadata from PDF
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/extract-pdf", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      // Step 2: Save paper record
      const { savePaper } = await import("@/lib/actions/papers");
      const paperId = await savePaper({
        title: data.info?.title || file.name.replace(/\.pdf$/i, ""),
        authors: data.info?.author ? [data.info.author] : [],
        source: "user_upload",
      });

      // Step 3: Upload PDF to GCS + trigger full processing pipeline
      // The POST endpoint now stores in GCS and triggers extract -> chunk -> embed
      const pdfFormData = new FormData();
      pdfFormData.append("file", file);
      const uploadRes = await fetch(`/api/papers/${paperId}/pdf`, {
        method: "POST",
        body: pdfFormData,
      });

      if (!uploadRes.ok) {
        console.error("PDF upload to storage failed");
      }

      fetchPapers();
    } catch (err) {
      console.error("PDF upload failed:", err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [fetchPapers]);

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-7rem)]">
      {/* Collections Sidebar */}
      <aside className="w-64 shrink-0 glass-panel rounded-2xl p-4 flex flex-col">
        <h2 className="text-xs font-medium text-ink-muted uppercase tracking-widest mb-3 px-2">
          Collections
        </h2>
        <nav className="space-y-0.5 flex-1">
          <button
            onClick={() => setActiveCollection(null)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
              activeCollection === null
                ? "bg-surface-raised text-ink font-medium"
                : "text-ink-muted hover:text-ink hover:bg-surface-raised/50"
            )}
          >
            <span>All Papers</span>
            <span className="text-xs text-ink-muted">{papers.length}</span>
          </button>
          <button
            onClick={() => setActiveCollection("favorites")}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
              activeCollection === "favorites"
                ? "bg-surface-raised text-ink font-medium"
                : "text-ink-muted hover:text-ink hover:bg-surface-raised/50"
            )}
          >
            <div className="flex items-center gap-2">
              <Star size={16} weight="fill" className="text-amber-500" />
              <span>Favorites</span>
            </div>
            <span className="text-xs text-ink-muted">{favorites.length}</span>
          </button>

          <div className="border-t border-border-subtle my-2" />

          {collections.map((col) => (
            <button
              key={col.id}
              onClick={() => setActiveCollection(col.id)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                activeCollection === col.id
                  ? "bg-surface-raised text-ink font-medium"
                  : "text-ink-muted hover:text-ink hover:bg-surface-raised/50"
              )}
            >
              <div className="flex items-center gap-2">
                <FolderSimple size={16} />
                <span>{col.name}</span>
              </div>
              <span className="text-xs text-ink-muted">{col.paperCount}</span>
            </button>
          ))}
        </nav>

        <div className="space-y-2 pt-3 border-t border-border-subtle">
          <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={handlePdfUpload} />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-ink-muted hover:text-ink hover:bg-surface-raised/50 transition-colors disabled:opacity-50"
          >
            <Upload size={16} />
            {uploading ? "Uploading..." : "Upload PDF"}
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-ink-muted hover:text-ink hover:bg-surface-raised/50 transition-colors">
            <Plus size={16} />
            New Collection
          </button>
        </div>
      </aside>

      {/* Papers List */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center gap-4 mb-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search papers..."
            className="flex-1"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "recent" | "title" | "year")}
            className="px-3 py-2.5 rounded-xl bg-surface-raised border border-border text-ink text-sm focus:outline-none"
          >
            <option value="recent">Recently Added</option>
            <option value="title">Title A-Z</option>
            <option value="year">Year</option>
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-sm text-ink-muted">Loading papers...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <BookOpen size={40} className="text-ink-muted mb-3" />
            <p className="text-sm text-ink-muted">
              {search
                ? "No papers match your search."
                : "Your library is empty. Add papers from Discover."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((paper) => (
              <div
                key={paper.refId}
                className="glass-panel rounded-xl p-4 hover:bg-surface-raised/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-raised flex items-center justify-center text-ink-muted shrink-0 mt-0.5">
                    {paper.source === "user_upload" ? (
                      <FilePdf size={20} />
                    ) : (
                      <GlobeSimple size={20} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-ink text-sm leading-snug mb-1">
                      {paper.title}
                    </h3>
                    <p className="text-xs text-ink-muted truncate">
                      {getAuthors(paper).join(", ")}
                    </p>
                    <p className="text-xs text-ink-muted mt-0.5">
                      {paper.journal ?? "Unknown journal"} · {paper.year ?? "n.d."}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 ml-14">
                  <button
                    onClick={() => openCiteModal(paper)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-brand bg-brand/10 hover:bg-brand/20 transition-colors"
                  >
                    <BookOpen size={14} />
                    Cite
                  </button>
                  {paper.source === "user_upload" && (
                    <button
                      onClick={() => setViewingPaperId(paper.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-ink-muted bg-surface-raised hover:bg-surface-raised/80 transition-colors"
                    >
                      <Eye size={14} />
                      View PDF
                    </button>
                  )}
                  <button
                    onClick={() => handleToggleFavorite(paper.refId)}
                    className={cn(
                      "p-1.5 rounded-lg transition-colors",
                      paper.isFavorite
                        ? "text-amber-500 hover:bg-amber-500/10"
                        : "text-ink-muted hover:text-amber-500 hover:bg-amber-500/10"
                    )}
                  >
                    <Star size={16} weight={paper.isFavorite ? "fill" : "regular"} />
                  </button>
                  <button
                    onClick={() => handleDeletePaper(paper.refId)}
                    className="p-1.5 rounded-lg text-ink-muted hover:text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Citation Modal */}
      {citeModal && (
        <Modal
          open={!!citeModal}
          onClose={() => setCiteModal(null)}
          title="Cite Source"
        >
          <Tabs
            tabs={citationTabs}
            activeTab={citationTab}
            onChange={setCitationTab}
            className="mb-4"
          />
          <div className="bg-surface-raised rounded-xl p-4 mb-4 min-h-[80px]">
            {citationLoading ? (
              <p className="text-xs text-ink-muted animate-pulse">Formatting citations...</p>
            ) : citationFormats ? (
              <p className="text-sm text-ink font-mono leading-relaxed whitespace-pre-wrap">
                {citationTab === "bibtex"
                  ? citationFormats.bibtex
                  : citationFormats[citationTab as CitationStyle]?.full}
              </p>
            ) : (
              <p className="text-xs text-ink-muted">Failed to load citation formats</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const text = citationTab === "bibtex"
                  ? citationFormats?.bibtex
                  : citationFormats?.[citationTab as CitationStyle]?.full;
                if (text) copyToClipboard(text, "full");
              }}
              disabled={!citationFormats}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors disabled:opacity-50"
            >
              <ClipboardText size={16} />
              {copied === "full" ? "Copied!" : citationTab === "bibtex" ? "Copy BibTeX" : "Copy Citation"}
            </button>
            {citationTab !== "bibtex" && (
              <button
                onClick={() => {
                  const text = citationFormats?.[citationTab as CitationStyle]?.inText;
                  if (text) copyToClipboard(text, "intext");
                }}
                disabled={!citationFormats}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border border-border text-ink text-sm font-medium hover:bg-surface-raised transition-colors disabled:opacity-50"
              >
                <ClipboardText size={16} />
                {copied === "intext" ? "Copied!" : "Copy In-Text"}
              </button>
            )}
          </div>
        </Modal>
      )}

      {/* PDF Viewer Overlay */}
      {viewingPaperId !== null && (
        <PDFViewer
          url={`/api/papers/${viewingPaperId}/pdf`}
          onClose={() => setViewingPaperId(null)}
        />
      )}
    </div>
  );
}
