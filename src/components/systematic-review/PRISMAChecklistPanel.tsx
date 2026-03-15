"use client";

import { useState, useCallback } from "react";
import {
  CheckCircle,
  WarningCircle,
  XCircle,
  MinusCircle,
  CircleNotch,
  CaretDown,
  CaretRight,
  ClipboardText,
  Download,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types (mirrors server types)
// ---------------------------------------------------------------------------

type ComplianceStatus =
  | "reported"
  | "partially_reported"
  | "not_reported"
  | "not_applicable";

interface ChecklistItemResult {
  itemNumber: number;
  section: string;
  topic: string;
  description: string;
  status: ComplianceStatus;
  location: string;
  suggestion: string;
}

interface ComplianceResult {
  items: ChecklistItemResult[];
  summary: {
    reported: number;
    partiallyReported: number;
    notReported: number;
    notApplicable: number;
    compliancePercentage: number;
  };
}

interface PRISMAChecklistPanelProps {
  projectId: number;
}

// ---------------------------------------------------------------------------
// Checklist variants
// ---------------------------------------------------------------------------

type ChecklistVariant = "prisma2020" | "prismaS" | "prismaNMA";

interface VariantConfig {
  label: string;
  shortLabel: string;
  description: string;
  itemCount: number;
  apiEndpoint: string;
  apiVariant: string;
  csvFilename: string;
  verifyingText: string;
}

const VARIANT_CONFIG: Record<ChecklistVariant, VariantConfig> = {
  prisma2020: {
    label: "PRISMA 2020",
    shortLabel: "PRISMA 2020",
    description:
      "Verify your manuscript against all 27 PRISMA 2020 checklist items. Paste your manuscript text below and click verify.",
    itemCount: 27,
    apiEndpoint: "/api/systematic-review/prisma-checklist",
    apiVariant: "prisma2020",
    csvFilename: "prisma-2020-checklist.csv",
    verifyingText: "Verifying 27 items...",
  },
  prismaS: {
    label: "PRISMA-S (Search)",
    shortLabel: "PRISMA-S",
    description:
      "Verify your search reporting against all 16 PRISMA-S checklist items for literature search documentation.",
    itemCount: 16,
    apiEndpoint: "/api/systematic-review/prisma-checklist",
    apiVariant: "prismaS",
    csvFilename: "prisma-s-checklist.csv",
    verifyingText: "Verifying 16 items...",
  },
  prismaNMA: {
    label: "PRISMA-NMA (Network MA)",
    shortLabel: "PRISMA-NMA",
    description:
      "Verify your network meta-analysis against all 5 PRISMA-NMA extension items for reporting network geometry and inconsistency.",
    itemCount: 5,
    apiEndpoint: "/api/systematic-review/prisma-checklist",
    apiVariant: "prismaNMA",
    csvFilename: "prisma-nma-checklist.csv",
    verifyingText: "Verifying 5 items...",
  },
};

// ---------------------------------------------------------------------------
// Status config
// ---------------------------------------------------------------------------

const STATUS_CONFIG: Record<
  ComplianceStatus,
  { icon: typeof CheckCircle; color: string; bg: string; label: string }
> = {
  reported: {
    icon: CheckCircle,
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-100 dark:bg-green-900/30",
    label: "Reported",
  },
  partially_reported: {
    icon: WarningCircle,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    label: "Partial",
  },
  not_reported: {
    icon: XCircle,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-100 dark:bg-red-900/30",
    label: "Missing",
  },
  not_applicable: {
    icon: MinusCircle,
    color: "text-gray-400",
    bg: "bg-gray-100 dark:bg-gray-800",
    label: "N/A",
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PRISMAChecklistPanel({ projectId }: PRISMAChecklistPanelProps) {
  const [activeVariant, setActiveVariant] =
    useState<ChecklistVariant>("prisma2020");
  const [manuscriptText, setManuscriptText] = useState("");
  const [results, setResults] = useState<
    Partial<Record<ChecklistVariant, ComplianceResult>>
  >({});
  const [isVerifying, setIsVerifying] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<ComplianceStatus | "all">("all");
  const [error, setError] = useState<string | null>(null);

  const variantCfg = VARIANT_CONFIG[activeVariant];
  const result = results[activeVariant] ?? null;

  const switchVariant = (variant: ChecklistVariant) => {
    setActiveVariant(variant);
    setFilter("all");
    setExpandedItems(new Set());
    setError(null);
  };

  const verify = useCallback(async () => {
    if (manuscriptText.length < 100) return;
    setIsVerifying(true);
    setError(null);

    try {
      const res = await fetch(variantCfg.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          manuscriptText,
          variant: variantCfg.apiVariant,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Verification failed");
      }

      const data = await res.json();
      setResults((prev) => ({ ...prev, [activeVariant]: data.result }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setIsVerifying(false);
    }
  }, [projectId, manuscriptText, activeVariant, variantCfg]);

  const toggleItem = (itemNumber: number) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemNumber)) next.delete(itemNumber);
      else next.add(itemNumber);
      return next;
    });
  };

  const expandAll = () =>
    {/* empty state: renders nothing when no data */}
    setExpandedItems(new Set(result?.items.map((i) => i.itemNumber) || []));
  const collapseAll = () => setExpandedItems(new Set());

  const downloadCSV = async () => {
    try {
      const res = await fetch(variantCfg.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          manuscriptText,
          variant: variantCfg.apiVariant,
          exportFormat: "csv",
        }),
      });
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = variantCfg.csvFilename;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Failed to export checklist. Please try again.");
    }
  };

  const filteredItems = result?.items.filter(
    (item) => filter === "all" || item.status === filter
  );

  // Group by section
  const sections = filteredItems
    ? Array.from(
        filteredItems.reduce((map, item) => {
          const existing = map.get(item.section) || [];
          existing.push(item);
          map.set(item.section, existing);
          return map;
        }, new Map<string, ChecklistItemResult[]>())
      )
    : [];

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-ink flex items-center gap-2">
          <ClipboardText weight="duotone" className="text-brand" />
          PRISMA Compliance Checker
        </h2>
        <p className="text-sm text-ink-muted mt-1">
          {variantCfg.description}
        </p>
      </div>

      {/* Variant tab selector */}
      <div className="flex gap-1 p-1 bg-surface-alt rounded-lg border border-border w-fit">
        {(Object.keys(VARIANT_CONFIG) as ChecklistVariant[]).map((variant) => (
          <button
            key={variant}
            onClick={() => switchVariant(variant)}
            className={cn(
              "px-3 py-1.5 rounded text-sm font-medium transition-colors whitespace-nowrap",
              activeVariant === variant
                ? "bg-brand text-white shadow-sm"
                : "text-ink-muted hover:text-ink hover:bg-surface"
            )}
          >
            {VARIANT_CONFIG[variant].label}
          </button>
        ))}
      </div>

      {/* Manuscript input */}
      <div className="space-y-3">
        <textarea aria-label="Text area"
          value={manuscriptText}
          onChange={(e) => setManuscriptText(e.target.value)}
          placeholder="Paste your manuscript text here (minimum 100 characters)..."
          className="w-full h-48 px-4 py-3 bg-surface border border-border rounded-lg text-sm text-ink placeholder:text-ink-faint resize-y focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-ink-muted">
            {manuscriptText.length.toLocaleString()} characters
          </span>
          <button
            onClick={verify}
            disabled={isVerifying || manuscriptText.length < 100}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand text-white rounded-md text-sm font-medium hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isVerifying ? (
              <>
                <CircleNotch
                  weight="bold"
                  className="animate-spin"
                  size={16}
                />
                {variantCfg.verifyingText}
              </>
            ) : (
              <>
                <MagnifyingGlass weight="bold" size={16} />
                Verify {variantCfg.shortLabel} Compliance
              </>
            )}
          </button>
        </div>
        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400 flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-300"
            >
              &#x2715;
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <>
          {/* Summary ring + stats */}
          <div className="flex items-center gap-6 p-5 bg-surface border border-border rounded-lg">
            {/* Compliance ring */}
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-border"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke={
                    result.summary.compliancePercentage >= 80
                      ? "#22c55e"
                      : result.summary.compliancePercentage >= 50
                        ? "#f59e0b"
                        : "#ef4444"
                  }
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${result.summary.compliancePercentage * 2.64} 264`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-ink">
                  {result.summary.compliancePercentage}%
                </span>
              </div>
            </div>

            {/* Stat cards */}
            <div className="flex-1 grid grid-cols-4 gap-3">
              {(
                [
                  ["reported", result.summary.reported],
                  ["partially_reported", result.summary.partiallyReported],
                  ["not_reported", result.summary.notReported],
                  ["not_applicable", result.summary.notApplicable],
                ] as [ComplianceStatus, number][]
              ).map(([status, count]) => {
                const cfg = STATUS_CONFIG[status];
                const Icon = cfg.icon;
                return (
                  <button
                    key={status}
                    onClick={() =>
                      setFilter(filter === status ? "all" : status)
                    }
                    className={cn(
                      "flex flex-col items-center gap-1 p-3 rounded-lg border transition-colors",
                      filter === status
                        ? "border-brand bg-brand/5"
                        : "border-border hover:bg-surface-alt"
                    )}
                  >
                    <Icon weight="fill" size={18} className={cfg.color} />
                    <span className="text-lg font-bold text-ink">{count}</span>
                    <span className="text-[10px] text-ink-muted">
                      {cfg.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={expandAll}
                className="text-xs text-brand hover:underline"
              >
                Expand all
              </button>
              <span className="text-xs text-ink-muted">·</span>
              <button
                onClick={collapseAll}
                className="text-xs text-brand hover:underline"
              >
                Collapse all
              </button>
              {filter !== "all" && (
                <>
                  <span className="text-xs text-ink-muted">·</span>
                  <button
                    onClick={() => setFilter("all")}
                    className="text-xs text-ink-muted hover:underline"
                  >
                    Clear filter
                  </button>
                </>
              )}
            </div>
            <button
              onClick={downloadCSV}
              className="flex items-center gap-1 px-3 py-1.5 border border-border rounded text-xs text-ink-muted hover:text-ink transition-colors"
            >
              <Download size={12} />
              Export CSV
            </button>
          </div>

          {/* Checklist items grouped by section */}
          <div className="space-y-4">
            {sections.map(([section, items]) => (
              <div key={section}>
                <h3 className="text-xs font-semibold text-brand uppercase tracking-wide mb-2">
                  {section}
                </h3>
                <div className="space-y-1">
                  {items.map((item) => {
                    const cfg = STATUS_CONFIG[item.status];
                    const Icon = cfg.icon;
                    const expanded = expandedItems.has(item.itemNumber);

                    return (
                      <div
                        key={item.itemNumber}
                        className="border border-border rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(item.itemNumber)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-surface-alt transition-colors"
                        >
                          <Icon
                            weight="fill"
                            size={16}
                            className={cn(cfg.color, "flex-shrink-0")}
                          />
                          <span className="text-xs text-ink-muted w-6 flex-shrink-0">
                            #{item.itemNumber}
                          </span>
                          <span className="text-sm text-ink font-medium flex-1">
                            {item.topic}
                          </span>
                          <span
                            className={cn(
                              "text-[10px] px-1.5 py-0.5 rounded font-medium flex-shrink-0",
                              cfg.bg,
                              cfg.color
                            )}
                          >
                            {cfg.label}
                          </span>
                          {expanded ? (
                            <CaretDown
                              size={14}
                              className="text-ink-muted flex-shrink-0"
                            />
                          ) : (
                            <CaretRight
                              size={14}
                              className="text-ink-muted flex-shrink-0"
                            />
                          )}
                        </button>

                        {expanded && (
                          <div className="px-4 pb-3 pt-1 space-y-2 border-t border-border bg-surface-alt/50">
                            <p className="text-xs text-ink-muted">
                              {item.description}
                            </p>
                            {item.location && (
                              <div className="text-xs">
                                <span className="font-medium text-ink">
                                  Found:{" "}
                                </span>
                                <span className="text-ink-muted italic">
                                  &quot;{item.location}&quot;
                                </span>
                              </div>
                            )}
                            {item.suggestion && (
                              <div className="text-xs">
                                <span className="font-medium text-ink">
                                  Suggestion:{" "}
                                </span>
                                <span className="text-ink-muted">
                                  {item.suggestion}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
