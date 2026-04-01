"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Trash, MagnifyingGlass } from "@phosphor-icons/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  getDomainPreferences,
  setDomainPreference,
  removeDomainPreference,
  type DomainPreferenceLevel,
  type DomainPreferenceRecord,
} from "@/lib/actions/domain-preferences";

const LEVEL_LABELS: Record<DomainPreferenceLevel, string> = {
  prefer: "Preferred",
  higher: "Higher",
  lower: "Lower",
  mute: "Muted",
};

const LEVEL_STYLES: Record<DomainPreferenceLevel, string> = {
  prefer:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  higher:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  lower:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  mute: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const ALL_LEVELS: DomainPreferenceLevel[] = [
  "prefer",
  "higher",
  "lower",
  "mute",
];

export default function MySourcesPage() {
  const [preferences, setPreferences] = useState<DomainPreferenceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [filterLevel, setFilterLevel] = useState<
    DomainPreferenceLevel | "all"
  >("all");

  const loadPreferences = useCallback(async () => {
    try {
      const data = await getDomainPreferences();
      setPreferences(data);
    } catch {
      // Table may not exist yet
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPreferences();
  }, [loadPreferences]);

  const handleChangeLevel = async (
    domain: string,
    newLevel: DomainPreferenceLevel
  ) => {
    await setDomainPreference(domain, newLevel);
    await loadPreferences();
  };

  const handleRemove = async (domain: string) => {
    await removeDomainPreference(domain);
    await loadPreferences();
  };

  const filtered = preferences.filter((pref) => {
    if (filterLevel !== "all" && pref.level !== filterLevel) return false;
    if (filterText && !pref.domain.includes(filterText.toLowerCase()))
      return false;
    return true;
  });

  const counts = {
    all: preferences.length,
    prefer: preferences.filter((p) => p.level === "prefer").length,
    higher: preferences.filter((p) => p.level === "higher").length,
    lower: preferences.filter((p) => p.level === "lower").length,
    mute: preferences.filter((p) => p.level === "mute").length,
  };

  return (
    <div className="mx-auto w-full max-w-[780px] px-4 py-8 md:py-10">
      <div className="mb-6 flex items-center gap-3">
        <Link
          className="rounded-full p-1.5 text-ink-muted hover:bg-[var(--surface-raised)] hover:text-ink"
          href="/explore"
        >
          <ArrowLeft size={18} weight="bold" />
        </Link>
        <h1 className="text-[20px] font-semibold text-ink">My Sources</h1>
        <span className="ml-auto text-[13px] text-ink-muted">
          {preferences.length} / 1,000
        </span>
      </div>

      <p className="mb-6 text-[14px] text-ink-muted">
        Manage how domains are ranked in your search results. Preferred sources
        appear near the top; muted sources are hidden entirely.
      </p>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <MagnifyingGlass
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
            size={16}
          />
          <input
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] py-2 pl-9 pr-3 text-[13px] text-ink"
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Filter domains..."
            value={filterText}
          />
        </div>
        <div className="flex gap-1">
          {(["all", ...ALL_LEVELS] as const).map((level) => (
            <button
              key={level}
              className={cn(
                "rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors",
                filterLevel === level
                  ? "bg-brand/10 text-brand"
                  : "text-ink-muted hover:bg-black/[0.04]"
              )}
              onClick={() => setFilterLevel(level)}
              type="button"
            >
              {level === "all" ? "All" : LEVEL_LABELS[level]}{" "}
              <span className="opacity-60">
                ({counts[level]})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Preference list */}
      {loading ? (
        <p className="text-[14px] text-ink-muted">Loading preferences...</p>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)] px-4 py-8 text-center text-[14px] text-ink-muted">
          {preferences.length === 0
            ? "No domain preferences yet. Use the shield icon on search results to set preferences."
            : "No matches for your filter."}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((pref) => (
            <div
              key={pref.domain}
              className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3"
              data-testid="domain-preference-row"
            >
              <span className="min-w-0 flex-1 truncate text-[14px] font-medium text-ink">
                {pref.domain}
              </span>

              <div className="ml-3 flex items-center gap-2">
                <select
                  aria-label={`Preference level for ${pref.domain}`}
                  className={cn(
                    "rounded-lg px-2 py-1 text-[12px] font-medium",
                    LEVEL_STYLES[pref.level]
                  )}
                  onChange={(e) =>
                    handleChangeLevel(
                      pref.domain,
                      e.target.value as DomainPreferenceLevel
                    )
                  }
                  value={pref.level}
                >
                  {ALL_LEVELS.map((l) => (
                    <option key={l} value={l}>
                      {LEVEL_LABELS[l]}
                    </option>
                  ))}
                </select>

                <button
                  aria-label={`Remove preference for ${pref.domain}`}
                  className="rounded-lg p-1.5 text-ink-muted hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                  onClick={() => handleRemove(pref.domain)}
                  type="button"
                >
                  <Trash size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
