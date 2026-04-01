"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Globe,
  Tag,
  CaretDown,
  CaretUp,
  X,
} from "@phosphor-icons/react";
import type { UnifiedSearchResult } from "@/types/search";
import type { DomainPreferenceLevel } from "@/lib/actions/domain-preferences";

const TRUST_TIER_LABELS: Record<string, string> = {
  government: "Government / Institutional",
  major_journalism: "Major Journalism",
  community: "Community",
  other: "Unclassified",
};

const TRUST_TIER_COLORS: Record<string, string> = {
  government: "text-emerald-600 dark:text-emerald-400",
  major_journalism: "text-blue-600 dark:text-blue-400",
  community: "text-amber-600 dark:text-amber-400",
  other: "text-ink-muted",
};

const PREFERENCE_LEVELS: {
  value: DomainPreferenceLevel | "neutral";
  label: string;
  description: string;
}[] = [
  { value: "prefer", label: "Prefer", description: "Always near top" },
  { value: "higher", label: "Higher", description: "Boost in results" },
  { value: "neutral", label: "Neutral", description: "Default ranking" },
  { value: "lower", label: "Lower", description: "Demote in results" },
  { value: "mute", label: "Mute", description: "Never show" },
];

export function SourceInfoPanel({
  result,
  currentPreference,
  onSetPreference,
  onClose,
}: {
  result: UnifiedSearchResult;
  currentPreference: DomainPreferenceLevel | "neutral";
  onSetPreference: (level: DomainPreferenceLevel | "neutral") => void;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const domain = result.domain || "unknown";
  const trustTier = result.trustTier || "other";
  const sourceType = result.sourceLabel || result.platform || null;

  return (
    <div
      className="mt-2 rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] p-4"
      data-testid="source-info-panel"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {/* Domain */}
          <div className="flex items-center gap-2">
            <Globe className="shrink-0 text-ink-muted" size={16} />
            <span className="truncate text-[14px] font-medium text-ink">
              {domain}
            </span>
          </div>

          {/* Trust tier */}
          <div className="mt-2 flex items-center gap-2">
            <ShieldCheck
              className={`shrink-0 ${TRUST_TIER_COLORS[trustTier]}`}
              size={16}
              weight="fill"
            />
            <span
              className={`text-[13px] font-medium ${TRUST_TIER_COLORS[trustTier]}`}
            >
              {TRUST_TIER_LABELS[trustTier]}
            </span>
          </div>

          {/* Source type */}
          {sourceType && (
            <div className="mt-2 flex items-center gap-2">
              <Tag className="shrink-0 text-ink-muted" size={16} />
              <span className="text-[13px] text-ink-muted">{sourceType}</span>
            </div>
          )}
        </div>

        <button
          aria-label="Close source info"
          className="shrink-0 rounded-full p-1 text-ink-muted hover:bg-black/[0.04] hover:text-ink"
          onClick={onClose}
          type="button"
        >
          <X size={16} />
        </button>
      </div>

      {/* Preference controls */}
      <div className="mt-3 border-t border-[var(--border)] pt-3">
        <button
          className="flex w-full items-center justify-between text-[13px] font-medium text-ink"
          onClick={() => setExpanded(!expanded)}
          type="button"
        >
          <span>Domain Preference</span>
          <div className="flex items-center gap-1">
            <span className="text-[12px] text-ink-muted">
              {PREFERENCE_LEVELS.find((l) => l.value === currentPreference)
                ?.label ?? "Neutral"}
            </span>
            {expanded ? (
              <CaretUp size={14} />
            ) : (
              <CaretDown size={14} />
            )}
          </div>
        </button>

        {expanded && (
          <div className="mt-2 space-y-1">
            {PREFERENCE_LEVELS.map((level) => (
              <button
                key={level.value}
                className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-[13px] transition-colors ${
                  currentPreference === level.value
                    ? "bg-brand/10 text-brand font-medium"
                    : "text-ink hover:bg-black/[0.04]"
                }`}
                onClick={() => onSetPreference(level.value)}
                type="button"
              >
                <span>{level.label}</span>
                <span className="text-[11px] text-ink-muted">
                  {level.description}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
