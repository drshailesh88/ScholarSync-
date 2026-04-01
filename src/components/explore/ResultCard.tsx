"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Plus, CircleNotch, ShieldCheck } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { UnifiedSearchResult } from "@/types/search";
import type { ExploreTab } from "./ExploreTabs";
import { ActionsMenu, type ActionsMenuCallbacks } from "./ActionsMenu";
import { SourceInfoPanel } from "./SourceInfoPanel";
import type { DomainPreferenceLevel } from "@/lib/actions/domain-preferences";

type SupportedTab = Exclude<ExploreTab, "more">;

const TRUST_BORDER_COLORS = {
  government: "var(--trust-government)",
  major_journalism: "var(--trust-journalism)",
  community: "var(--trust-community)",
  other: "var(--trust-other)",
} as const;

const EVIDENCE_BORDER_COLORS = {
  I: "var(--trust-government)",
  II: "var(--trust-journalism)",
  III: "var(--trust-community)",
  IV: "#EA580C",
  V: "var(--trust-other)",
} as const;

function buildResultHref(result: UnifiedSearchResult): string | null {
  if (result.url) return result.url;
  if (result.doi) return `https://doi.org/${result.doi}`;
  if (result.pmid) return `https://pubmed.ncbi.nlm.nih.gov/${result.pmid}/`;
  if (result.arxivId) return `https://arxiv.org/abs/${result.arxivId}`;
  if (result.openAccessPdfUrl) return result.openAccessPdfUrl;
  return null;
}

function formatAuthors(result: UnifiedSearchResult): string | null {
  if (!result.authors.length) return null;
  if (result.authors.length === 1) return result.authors[0];
  if (result.authors.length === 2) return `${result.authors[0]} and ${result.authors[1]}`;
  return `${result.authors[0]}, ${result.authors[1]}, et al.`;
}

function formatBreadcrumb(result: UnifiedSearchResult, tab: SupportedTab): string {
  if (tab === "academic") {
    return result.journal || result.domain || "Academic source";
  }

  if (!result.url) {
    return result.domain || result.sourceLabel || result.journal || "Source";
  }

  try {
    const url = new URL(result.url);
    const domain = result.domain || url.hostname.replace(/^www\./, "");
    const segments = url.pathname
      .split("/")
      .filter(Boolean)
      .slice(0, 2)
      .map((segment) => decodeURIComponent(segment).replace(/[-_]/g, " "));

    return segments.length ? `${domain} > ${segments.join(" > ")}` : domain;
  } catch {
    return result.domain || result.sourceLabel || result.journal || "Source";
  }
}

function formatRelativeTime(value?: string): string | null {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const deltaMs = date.getTime() - Date.now();
  const deltaHours = Math.round(deltaMs / (1000 * 60 * 60));
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (Math.abs(deltaHours) < 24) {
    return formatter.format(deltaHours, "hour");
  }

  const deltaDays = Math.round(deltaHours / 24);
  if (Math.abs(deltaDays) < 30) {
    return formatter.format(deltaDays, "day");
  }

  const deltaMonths = Math.round(deltaDays / 30);
  if (Math.abs(deltaMonths) < 12) {
    return formatter.format(deltaMonths, "month");
  }

  const deltaYears = Math.round(deltaMonths / 12);
  return formatter.format(deltaYears, "year");
}

function formatDateLabel(result: UnifiedSearchResult): string | null {
  if (result.publishedAt) {
    const date = new Date(result.publishedAt);
    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(date);
    }
  }

  if (result.year > 0) {
    return String(result.year);
  }

  return null;
}

function buildMetadata(result: UnifiedSearchResult, tab: SupportedTab): string | null {
  if (tab === "academic") {
    const authors = formatAuthors(result);
    const evidence = result.evidenceLevel ? `Evidence ${result.evidenceLevel}` : null;
    return [authors, evidence].filter(Boolean).join(" · ") || null;
  }

  if (tab === "news") {
    const outlet = result.sourceLabel || result.journal || result.domain;
    const relativeTime = formatRelativeTime(result.publishedAt);
    return [outlet, relativeTime].filter(Boolean).join(" · ") || null;
  }

  if (tab === "discussions") {
    return [
      result.platform,
      result.community,
      result.engagement,
    ].filter(Boolean).join(" · ") || null;
  }

  return formatAuthors(result) || result.sourceLabel || result.journal || null;
}

function getBorderColor(result: UnifiedSearchResult, tab: SupportedTab): string {
  if (tab === "academic" && result.evidenceLevel) {
    return EVIDENCE_BORDER_COLORS[result.evidenceLevel];
  }

  return TRUST_BORDER_COLORS[result.trustTier || "other"];
}

export function ResultCard({
  id,
  result,
  tab,
  isSaved = false,
  isHighlighted = false,
  isSelected = false,
  showInfoPanel = false,
  onSave,
  onToggleInfo,
  onBlock,
  onMoreFromSource,
  onCite,
  onCopyLink,
}: {
  id?: string;
  result: UnifiedSearchResult;
  tab: SupportedTab;
  isSaved?: boolean;
  isHighlighted?: boolean;
  isSelected?: boolean;
  showInfoPanel?: boolean;
  onSave?: (result: UnifiedSearchResult) => Promise<void>;
  onToggleInfo?: () => void;
  onBlock?: (domain: string) => void;
  onMoreFromSource?: (domain: string) => void;
  onCite?: () => void;
  onCopyLink?: (url: string) => void;
}) {
  const articleRef = useRef<HTMLElement>(null);

  // Scroll highlighted card into view
  useEffect(() => {
    if (isHighlighted && articleRef.current) {
      articleRef.current.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [isHighlighted]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(isSaved);
  const [domainPref, setDomainPref] = useState<DomainPreferenceLevel | "neutral">(
    result.domainPreferenceLevel === "neutral" || !result.domainPreferenceLevel
      ? "neutral"
      : result.domainPreferenceLevel
  );

  const href = buildResultHref(result);
  const metadata = buildMetadata(result, tab);
  const date = formatDateLabel(result);
  const breadcrumb = formatBreadcrumb(result, tab);
  const snippet = result.abstract || result.tldr || "";
  const domain = result.domain || "";

  const handleSave = async () => {
    if (saved || saving || !onSave) return;
    setSaving(true);
    try {
      await onSave(result);
      setSaved(true);
    } catch {
      // Error is handled by the parent
    } finally {
      setSaving(false);
    }
  };

  const actionsCallbacks: ActionsMenuCallbacks = {
    onSave: handleSave,
    onOpenOriginal: () => {
      if (href) window.open(href, "_blank", "noopener");
    },
    onCite: onCite,
    onBlock: () => {
      if (domain) onBlock?.(domain);
    },
    onMoreFromSource: () => {
      if (domain) onMoreFromSource?.(domain);
    },
    onCopyLink: () => {
      const url = href || result.url;
      if (url) {
        navigator.clipboard.writeText(url).catch(() => {});
        onCopyLink?.(url);
      }
    },
  };

  return (
    <article
      id={id}
      ref={articleRef}
      className={cn(
        "rounded-2xl p-4 transition-colors duration-150",
        isHighlighted
          ? "bg-[var(--surface-raised)] shadow-[0_2px_8px_rgba(0,0,0,0.06)] ring-2 ring-[var(--brand)]/30"
          : "bg-transparent hover:bg-surface-raised hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
        isSelected && "ring-2 ring-[var(--brand)]"
      )}
      data-highlighted={isHighlighted || undefined}
      data-selected={isSelected || undefined}
      style={{ borderLeft: `3px solid ${getBorderColor(result, tab)}` }}
    >
      <div className="flex items-start justify-between gap-4">
        {href ? (
          <a
            className="text-[17px] font-medium leading-[1.3] text-ink underline-offset-4 hover:text-brand hover:underline"
            href={href}
            rel="noreferrer"
            target="_blank"
          >
            {result.title}
          </a>
        ) : (
          <h2 className="text-[17px] font-medium leading-[1.3] text-ink">
            {result.title}
          </h2>
        )}

        <div className="flex shrink-0 items-center gap-1">
          {/* Shield icon for source info */}
          <button
            aria-label="Source info"
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
              showInfoPanel
                ? "bg-brand/10 text-brand"
                : "text-ink-muted hover:bg-black/[0.04] hover:text-ink"
            )}
            data-testid="source-info-trigger"
            onClick={onToggleInfo}
            type="button"
          >
            <ShieldCheck size={16} weight={showInfoPanel ? "fill" : "regular"} />
          </button>

          {/* Save button */}
          <button
            aria-label={saved ? "Saved to Library" : "Save result"}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
              saved
                ? "text-brand"
                : "text-ink-muted hover:bg-black/[0.04] hover:text-brand"
            }`}
            disabled={saving || saved}
            onClick={handleSave}
            type="button"
          >
            {saving ? (
              <CircleNotch className="animate-spin" size={16} weight="bold" />
            ) : saved ? (
              <Check size={16} weight="bold" />
            ) : (
              <Plus size={16} weight="bold" />
            )}
          </button>

          {/* Actions menu */}
          <ActionsMenu
            callbacks={actionsCallbacks}
            isSaved={saved}
          />
        </div>
      </div>

      <p className="mt-2 text-[13px] font-normal text-brand">
        {breadcrumb}
      </p>

      {(metadata || date) ? (
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-[13px] font-normal text-ink-muted">
            {metadata}
          </p>
          {date ? (
            <p className="text-[10px] font-medium text-ink-muted">
              {date}
            </p>
          ) : null}
        </div>
      ) : null}

      {snippet ? (
        <p
          className="mt-3 text-[14px] leading-[1.5] text-ink-muted"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden",
          }}
        >
          {snippet}
        </p>
      ) : null}

      {/* Source Info Panel — inline expansion */}
      {showInfoPanel && (
        <SourceInfoPanel
          currentPreference={domainPref}
          onClose={() => onToggleInfo?.()}
          onSetPreference={setDomainPref}
          result={result}
        />
      )}
    </article>
  );
}
