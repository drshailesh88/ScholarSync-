"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Presentation,
  Trash,
  Clock,
  UploadSimple,
  CircleNotch,
  WarningCircle,
  X,
} from "@phosphor-icons/react";
import { getUserDecks, deleteDeck } from "@/lib/actions/presentations";
import type { PptxPreviewData } from "@/lib/slides/pptx-import";

interface DeckSummary {
  id: number;
  title: string;
  description: string | null;
  theme: string;
  audienceType: string;
  totalSlides: number;
  sourceType: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ImportPreview extends PptxPreviewData {
  file: File;
}

type ImportPhase = "idle" | "parsing" | "ready" | "importing";

export default function SlidesListPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [decks, setDecks] = useState<DeckSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [importPhase, setImportPhase] = useState<ImportPhase>("idle");
  const [importPreview, setImportPreview] = useState<ImportPreview | null>(null);
  const [importError, setImportError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getUserDecks();
        setDecks(
          data.map((deck) => ({
            ...deck,
            description: deck.description ?? null,
            theme: deck.theme ?? "modern",
            audienceType: deck.audienceType ?? "general",
            totalSlides: deck.totalSlides ?? 0,
            sourceType: deck.sourceType ?? "custom",
            createdAt: deck.createdAt ? new Date(deck.createdAt) : new Date(),
            updatedAt: deck.updatedAt ? new Date(deck.updatedAt) : new Date(),
          }))
        );
      } catch {
        // Ignore load errors on the list page.
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  async function handleDelete(deckId: number) {
    if (!confirm("Delete this presentation?")) return;
    try {
      await deleteDeck(deckId);
      setDecks((current) => current.filter((deck) => deck.id !== deckId));
    } catch {
      // Ignore delete errors.
    }
  }

  async function handleSelectImportFile(file: File) {
    setImportPhase("parsing");
    setImportError("");
    setImportPreview(null);

    try {
      const { extractPptxPreview, isPptxFile, PPTX_MAX_FILE_SIZE } = await import("@/lib/slides/pptx-import");

      if (!isPptxFile(file.name, file.type)) {
        throw new Error("Please upload a .pptx file");
      }
      if (file.size > PPTX_MAX_FILE_SIZE) {
        throw new Error("File exceeds 50MB limit");
      }

      const preview = await extractPptxPreview(await file.arrayBuffer(), {
        fileName: file.name,
      });

      setImportPreview({
        file,
        ...preview,
      });
      setImportPhase("ready");
    } catch (err) {
      if (err instanceof Error && err.message === "PASSWORD_PROTECTED_PPTX") {
        setImportError("Password-protected files are not supported");
      } else if (err instanceof Error && (err.message === "Please upload a .pptx file" || err.message === "File exceeds 50MB limit")) {
        setImportError(err.message);
      } else {
        setImportError("Could not read this file. Is it a valid PowerPoint presentation?");
      }
      setImportPhase("idle");
    }
  }

  async function handleImport() {
    if (!importPreview) return;
    setImportPhase("importing");
    setImportError("");

    try {
      const formData = new FormData();
      formData.append("file", importPreview.file);

      const response = await fetch("/api/slides/import-pptx", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Import failed");
      }

      router.push(`/slides/${result.deckId}`);
    } catch (err) {
      setImportPhase("ready");
      setImportError(err instanceof Error ? err.message : "Import failed");
    }
  }

  function resetImportState() {
    setImportPhase("idle");
    setImportPreview(null);
    setImportError("");
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <input aria-label="File upload"
        ref={fileInputRef}
        type="file"
        accept=".pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void handleSelectImportFile(file);
          event.target.value = "";
        }}
      />

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-ink">Presentations</h1>
          <p className="text-sm text-ink-muted mt-1">
            Create, import, and manage your slide decks
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface text-sm font-medium text-ink hover:border-brand/40 transition-colors"
          >
            <UploadSimple size={16} weight="bold" />
            Import Presentation
          </button>
          <Link
            href="/slides/new"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand text-white text-sm font-medium hover:bg-brand/90 transition-colors"
          >
            <Plus size={16} weight="bold" />
            Create New
          </Link>
        </div>
      </div>

      {(importPhase !== "idle" || importPreview || importError) && (
        <div className="mb-8 rounded-3xl border border-border bg-surface p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-ink">Import Presentation</p>
              <p className="text-xs text-ink-muted mt-1">
                {importPhase === "parsing" && "Extracting slide structure and preview content..."}
                {importPhase === "ready" && "Preview the extracted slides before importing them into ScholarSync."}
                {importPhase === "importing" && "Uploading assets and creating the imported deck..."}
                {importPhase === "idle" && importError && "The selected file could not be imported."}
              </p>
            </div>
            <button
              type="button"
              onClick={resetImportState}
              className="rounded-lg p-2 text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
            <StatusChip
              active={importPhase === "parsing"}
              complete={importPhase === "ready" || importPhase === "importing"}
              label="Extracting preview"
            />
            <StatusChip
              active={importPhase === "importing"}
              complete={false}
              label="Creating deck"
            />
          </div>

          {importError && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
              <WarningCircle size={16} />
              {importError}
            </div>
          )}

          {importPhase === "parsing" && (
            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-surface-raised px-4 py-4 text-sm text-ink">
              <CircleNotch size={18} className="animate-spin text-brand" />
              Parsing PowerPoint structure and extracting slide previews...
            </div>
          )}

          {importPreview && (
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-surface-raised px-4 py-4">
                <p className="text-base font-semibold text-ink">{importPreview.title}</p>
                <p className="text-xs text-ink-muted mt-1">
                  {importPreview.slideCount} slides
                  {importPreview.themeName ? ` - Theme: ${importPreview.themeName}` : ""}
                  {` - ${importPreview.file.name}`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {importPreview.slides.slice(0, 6).map((slide) => (
                  <div key={slide.index} className="rounded-2xl border border-border bg-surface-raised p-4">
                    <div className="flex items-center gap-2 text-[11px] text-ink-muted">
                      <span>Slide {slide.index}</span>
                      <span>&middot;</span>
                      <span className="capitalize">{slide.layout.replace(/_/g, " ")}</span>
                      {slide.imageCount > 0 && <span>&middot; {slide.imageCount} image</span>}
                    </div>
                    <p className="mt-2 text-sm font-medium text-ink">{slide.title}</p>
                    {slide.previewText && (
                      <p className="mt-1 text-xs text-ink-muted line-clamp-3">{slide.previewText}</p>
                    )}
                  </div>
                ))}
              </div>

              {importPreview.slides.length > 6 && (
                <p className="text-xs text-ink-muted">
                  Showing 6 of {importPreview.slides.length} extracted slide previews.
                </p>
              )}

              {importPreview.warnings.length > 0 && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
                  <p className="text-xs font-medium text-amber-800">Import warnings</p>
                  <div className="mt-2 space-y-1">
                    {importPreview.warnings.slice(0, 3).map((warning) => (
                      <p key={warning} className="text-xs text-amber-700">
                        {warning}
                      </p>
                    ))}
                    {importPreview.warnings.length > 3 && (
                      <p className="text-xs text-amber-700">
                        +{importPreview.warnings.length - 3} more warnings
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleImport}
                  disabled={importPhase === "importing"}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand text-white text-sm font-medium hover:bg-brand/90 transition-colors disabled:opacity-60"
                >
                  {importPhase === "importing" ? (
                    <>
                      <CircleNotch size={16} className="animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <UploadSimple size={16} weight="bold" />
                      Import into ScholarSync
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={importPhase === "importing"}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface text-sm font-medium text-ink hover:border-brand/40 transition-colors disabled:opacity-60"
                >
                  Choose another file
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
        </div>
      ) : decks.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-border rounded-2xl">
          <Presentation size={48} className="text-ink-muted/40 mx-auto mb-4" />
          <h2 className="text-lg font-medium text-ink mb-2">No presentations yet</h2>
          <p className="text-sm text-ink-muted mb-6">
            Create a new deck or import an existing PowerPoint presentation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface text-sm font-medium text-ink hover:border-brand/40 transition-colors"
            >
              <UploadSimple size={16} weight="bold" />
              Import Presentation
            </button>
            <Link
              href="/slides/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand text-white text-sm font-medium hover:bg-brand/90 transition-colors"
            >
              <Plus size={16} weight="bold" />
              Create New
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {decks.map((deck) => (
            <Link
              key={deck.id}
              href={`/slides/${deck.id}`}
              className="group relative flex flex-col rounded-xl border border-border bg-surface hover:border-brand/40 hover:shadow-md transition-all p-4"
            >
              <div className="aspect-[16/9] rounded-lg bg-surface-raised mb-3 flex items-center justify-center">
                <Presentation
                  size={32}
                  className="text-ink-muted/30 group-hover:text-brand/40 transition-colors"
                />
              </div>

              <h3 className="text-sm font-semibold text-ink truncate group-hover:text-brand transition-colors">
                {deck.title}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-xs text-ink-muted">
                <span>{deck.totalSlides} slides</span>
                <span>&middot;</span>
                <span className="capitalize">{deck.theme}</span>
              </div>
              <div className="flex items-center gap-1 mt-2 text-[10px] text-ink-muted">
                <Clock size={10} />
                <span>{deck.updatedAt.toLocaleDateString()}</span>
              </div>

              <button
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  void handleDelete(deck.id);
                }}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-red-50 text-ink-muted hover:text-red-500 transition-all"
              >
                <Trash size={14} />
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusChip({
  active,
  complete,
  label,
}: {
  active: boolean;
  complete: boolean;
  label: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 ${
        active
          ? "bg-brand/10 text-brand"
          : complete
            ? "bg-emerald-50 text-emerald-700"
            : "bg-surface-raised text-ink-muted"
      }`}
    >
      {active && <CircleNotch size={12} className="animate-spin" />}
      {!active && <div className="h-2 w-2 rounded-full bg-current opacity-60" />}
      <span>{label}</span>
    </div>
  );
}
