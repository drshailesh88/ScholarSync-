"use client";

import { useCallback, useMemo, useState } from "react";
import {
  ArrowSquareOut,
  BookmarkSimple,
  Check,
  Spinner,
} from "@phosphor-icons/react";
import type { RelatedPaper } from "@/lib/feeds/related-papers";

interface RelatedPapersProps {
  articleId: number;
}

interface RelatedPaperCardsProps {
  papers: RelatedPaper[];
  heading?: string;
  dense?: boolean;
}

type SaveState = "idle" | "saving" | "saved" | "error";

function getPaperKey(paper: RelatedPaper, index: number): string {
  return paper.doi || paper.pmid || paper.s2Id || `${paper.title}-${paper.year}-${index}`;
}

function ExternalLinks({ paper }: { paper: RelatedPaper }) {
  return (
    <div className="flex flex-wrap items-center gap-3 pt-1">
      {paper.doi && (
        <a
          href={`https://doi.org/${paper.doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-brand hover:underline"
        >
          <ArrowSquareOut size={12} />
          DOI
        </a>
      )}
      {paper.pmid && (
        <a
          href={`https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-brand hover:underline"
        >
          <ArrowSquareOut size={12} />
          PubMed
        </a>
      )}
      {paper.citationCount > 0 && (
        <span className="text-xs text-ink-muted">
          {paper.citationCount} citations
        </span>
      )}
    </div>
  );
}

function SaveRelatedPaperButton({
  paper,
  paperKey,
}: {
  paper: RelatedPaper;
  paperKey: string;
}) {
  const [saveState, setSaveState] = useState<SaveState>("idle");

  const handleSave = useCallback(async () => {
    if (saveState === "saving" || saveState === "saved") return;

    setSaveState("saving");
    try {
      const response = await fetch("/api/papers/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paper }),
      });

      if (!response.ok) {
        throw new Error("Failed to save paper");
      }

      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  }, [paper, saveState]);

  const label =
    saveState === "saving"
      ? "Saving..."
      : saveState === "saved"
        ? "Saved"
        : saveState === "error"
          ? "Retry Save"
          : "Save to Library";

  return (
    <button
      key={paperKey}
      onClick={handleSave}
      disabled={saveState === "saving" || saveState === "saved"}
      className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface-raised px-2.5 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:text-ink disabled:cursor-default disabled:opacity-70"
    >
      {saveState === "saving" ? (
        <Spinner size={12} className="animate-spin" />
      ) : saveState === "saved" ? (
        <Check size={12} weight="bold" />
      ) : (
        <BookmarkSimple size={12} weight={saveState === "error" ? "fill" : "regular"} />
      )}
      {label}
    </button>
  );
}

export function RelatedPaperCards({
  papers,
  heading,
  dense = false,
}: RelatedPaperCardsProps) {
  const paperList = useMemo(
    () =>
      papers.map((paper, index) => ({
        paper,
        key: getPaperKey(paper, index),
      })),
    [papers]
  );

  if (paperList.length === 0) {
    return (
      <p className="py-3 text-center text-xs text-ink-muted">
        No related papers found.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {heading ? (
        <p className="text-xs font-medium text-ink-muted">{heading}</p>
      ) : null}
      {paperList.map(({ paper, key }) => (
        <div
          key={key}
          className="rounded-xl border border-border-subtle bg-surface-raised/60 p-3"
        >
          <p className="text-sm font-medium leading-snug text-ink">{paper.title}</p>
          <p className="mt-1 text-xs text-ink-muted">
            {paper.authors.slice(0, 3).join(", ") || "Unknown authors"}
            {paper.authors.length > 3 ? " et al." : ""}
            {paper.journal ? ` · ${paper.journal}` : ""}
            {paper.year ? ` · ${paper.year}` : ""}
          </p>
          {!dense && paper.abstract ? (
            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-ink-muted">
              {paper.abstract}
            </p>
          ) : null}
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <ExternalLinks paper={paper} />
            <SaveRelatedPaperButton paper={paper} paperKey={key} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function RelatedPapers({ articleId }: RelatedPapersProps) {
  const [papers, setPapers] = useState<RelatedPaper[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRelated = useCallback(async () => {
    if (loading || loaded) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/feeds/articles/${articleId}/related`);
      if (!response.ok) {
        throw new Error("Failed to load related papers");
      }

      const data = await response.json();
      setPapers(data.papers || []);
      setLoaded(true);
    } catch {
      setError("Could not find related papers");
    } finally {
      setLoading(false);
    }
  }, [articleId, loaded, loading]);

  if (!loaded && !loading) {
    return (
      <button
        onClick={loadRelated}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-border-subtle bg-surface-raised/50 px-4 py-3 text-sm text-ink-muted transition-colors hover:bg-surface-raised hover:text-ink"
      >
        Find Related Papers
      </button>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-6 text-ink-muted">
        <Spinner size={18} className="animate-spin" />
        <span className="text-sm">Finding related papers...</span>
      </div>
    );
  }

  if (error) {
    return <p className="py-3 text-center text-xs text-red-400">{error}</p>;
  }

  return <RelatedPaperCards papers={papers} heading="Related Papers" />;
}
