"use client";

import { useState, useEffect, useMemo } from "react";
import { Check } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { SearchInput } from "@/components/ui/search-input";
import { useFeedStore } from "@/stores/feed-store";
import { Skeleton } from "@/components/ui/skeleton";
import type { JournalDirectoryEntry } from "@/types/feed";

interface DiscoverResponse {
  journals: JournalDirectoryEntry[];
  categories: string[];
  specialties: string[];
}

export function JournalBrowser() {
  const subscriptions = useFeedStore((s) => s.subscriptions);
  const subscribe = useFeedStore((s) => s.subscribe);

  const [data, setData] = useState<DiscoverResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [subscribingUrl, setSubscribingUrl] = useState<string | null>(null);

  // Fetch directory on mount
  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (specialty) params.set("specialty", specialty);

    setIsLoading(true);
    fetch(`/api/feeds/discover?${params}`)
      .then((res) => res.json())
      .then((d: DiscoverResponse) => setData(d))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [category, specialty]);

  const subscribedUrls = useMemo(
    () => new Set(subscriptions.map((s) => s.feedSource.feedUrl)),
    [subscriptions]
  );

  const filtered = useMemo(() => {
    if (!data) return [];
    if (!search) return data.journals;
    const q = search.toLowerCase();
    return data.journals.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.publisher.toLowerCase().includes(q)
    );
  }, [data, search]);

  const handleSubscribe = async (feedUrl: string) => {
    setSubscribingUrl(feedUrl);
    try {
      await subscribe(feedUrl);
    } catch {
      // error handled by store
    } finally {
      setSubscribingUrl(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3 pt-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Filters */}
      <div className="flex gap-2">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search journals..."
          className="flex-1"
        />
      </div>
      <div className="flex gap-2">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 px-3 py-2 rounded-xl bg-surface-raised border border-border text-ink text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
        >
          <option value="">All Categories</option>
          {data?.categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="flex-1 px-3 py-2 rounded-xl bg-surface-raised border border-border text-ink text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
        >
          <option value="">All Specialties</option>
          {data?.specialties.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Journal grid */}
      <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
        {filtered.map((journal) => {
          const isSubscribed = subscribedUrls.has(journal.feedUrl);
          const isSubscribing = subscribingUrl === journal.feedUrl;

          return (
            <div
              key={journal.feedUrl}
              className="flex items-center justify-between p-3 rounded-xl border border-border-subtle hover:bg-surface-raised/50 transition-colors"
            >
              <div className="min-w-0 flex-1 mr-3">
                <p className="text-sm font-medium text-ink truncate">
                  {journal.title}
                </p>
                <p className="text-xs text-ink-muted truncate">
                  {journal.publisher}
                  {journal.category && (
                    <span className="ml-2 px-1.5 py-0.5 rounded-full bg-surface-raised text-[10px]">
                      {journal.category}
                    </span>
                  )}
                </p>
              </div>
              <button
                onClick={() => handleSubscribe(journal.feedUrl)}
                disabled={isSubscribed || isSubscribing}
                className={cn(
                  "shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                  isSubscribed
                    ? "bg-green-500/10 text-green-500"
                    : "bg-brand text-white hover:bg-brand-hover disabled:opacity-50"
                )}
              >
                {isSubscribed ? (
                  <span className="flex items-center gap-1">
                    <Check size={12} weight="bold" />
                    Subscribed
                  </span>
                ) : isSubscribing ? (
                  "Adding..."
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>
          );
        })}
        {filtered.length === 0 && !isLoading && (
          <p className="text-sm text-ink-muted text-center py-6">
            No journals found matching your filters.
          </p>
        )}
      </div>
    </div>
  );
}
