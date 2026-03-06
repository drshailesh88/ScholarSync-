"use client";

import { useState, useEffect, useCallback } from "react";
import { ClipboardText } from "@phosphor-icons/react";
import { Modal } from "@/components/ui/modal";
import { Tabs } from "@/components/ui/tabs";
import { getAllCitationFormats } from "@/lib/actions/citations";
import { articleToPaperData } from "@/lib/feeds/article-to-citation";
import type { FeedArticleWithStatus } from "@/types/feed";
import type { CitationStyle } from "@/lib/citations";

// ── Types ───────────────────────────────────────────────────────────

interface CitationFormats {
  apa: { full: string; inText: string };
  mla: { full: string; inText: string };
  chicago: { full: string; inText: string };
  vancouver: { full: string; inText: string };
  harvard: { full: string; inText: string };
  bibtex: string;
}

interface CitationModalProps {
  article: FeedArticleWithStatus | null;
  onClose: () => void;
}

// ── Constants ───────────────────────────────────────────────────────

const CITATION_TABS = [
  { key: "apa", label: "APA 7" },
  { key: "mla", label: "MLA 9" },
  { key: "chicago", label: "Chicago" },
  { key: "vancouver", label: "Vancouver" },
  { key: "harvard", label: "Harvard" },
  { key: "bibtex", label: "BibTeX" },
];

// ── Component ───────────────────────────────────────────────────────

export function CitationModal({ article, onClose }: CitationModalProps) {
  const [tab, setTab] = useState("apa");
  const [formats, setFormats] = useState<CitationFormats | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [prevArticleId, setPrevArticleId] = useState<number | null>(null);

  // React-recommended pattern: adjust state during render when prop changes
  const articleId = article?.id ?? null;
  if (articleId !== prevArticleId) {
    setPrevArticleId(articleId);
    setFormats(null);
    setLoading(!!article);
    setCopied(null);
  }

  // Fetch citation formats when article changes
  useEffect(() => {
    if (!article) return;

    let cancelled = false;
    const paperData = articleToPaperData(article);
    getAllCitationFormats(paperData)
      .then((result) => { if (!cancelled) setFormats(result); })
      .catch(() => { if (!cancelled) setFormats(null); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [article]);

  const copyToClipboard = useCallback(async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // Fallback for environments without clipboard API
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    }
  }, []);

  if (!article) return null;

  return (
    <Modal open={!!article} onClose={onClose} title="Cite Article">
      <Tabs
        tabs={CITATION_TABS}
        activeTab={tab}
        onChange={setTab}
        className="mb-4"
      />

      {/* Citation display */}
      <div className="bg-surface-raised rounded-xl p-4 mb-4 min-h-[80px]">
        {loading ? (
          <p className="text-xs text-ink-muted animate-pulse">
            Formatting citations...
          </p>
        ) : formats ? (
          <p className="text-sm text-ink font-mono leading-relaxed whitespace-pre-wrap">
            {tab === "bibtex"
              ? formats.bibtex
              : formats[tab as CitationStyle]?.full}
          </p>
        ) : (
          <p className="text-xs text-ink-muted">
            Failed to load citation formats
          </p>
        )}
      </div>

      {/* Copy buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => {
            const text =
              tab === "bibtex"
                ? formats?.bibtex
                : formats?.[tab as CitationStyle]?.full;
            if (text) copyToClipboard(text, "full");
          }}
          disabled={!formats}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors disabled:opacity-50"
        >
          <ClipboardText size={16} />
          {copied === "full"
            ? "Copied!"
            : tab === "bibtex"
              ? "Copy BibTeX"
              : "Copy Citation"}
        </button>
        {tab !== "bibtex" && (
          <button
            onClick={() => {
              const text = formats?.[tab as CitationStyle]?.inText;
              if (text) copyToClipboard(text, "intext");
            }}
            disabled={!formats}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border border-border text-ink text-sm font-medium hover:bg-surface-raised transition-colors disabled:opacity-50"
          >
            <ClipboardText size={16} />
            {copied === "intext" ? "Copied!" : "Copy In-Text"}
          </button>
        )}
      </div>

      {/* DOI link */}
      {article.doi && (
        <p className="mt-3 text-xs text-ink-muted text-center">
          DOI:{" "}
          <a
            href={`https://doi.org/${article.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            {article.doi}
          </a>
        </p>
      )}
    </Modal>
  );
}
