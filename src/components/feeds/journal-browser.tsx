"use client";

import { useEffect, useMemo, useState } from "react";
import { Check } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { SearchInput } from "@/components/ui/search-input";
import { useFeedStore } from "@/stores/feed-store";
import { Skeleton } from "@/components/ui/skeleton";
import type { JournalDirectoryEntry } from "@/types/feed";

interface DiscoverJournal extends JournalDirectoryEntry {
  isSubscribed: boolean;
  isSuggested: boolean;
}

interface DiscoverResponse {
  feeds: DiscoverJournal[];
  journals?: DiscoverJournal[];
  categories: string[];
  specialties: string[];
  suggestedFeeds: DiscoverJournal[];
  pubmedSuggestion: {
    query: string;
    label: string;
  } | null;
}

export function JournalBrowser() {
  const subscriptions = useFeedStore((s) => s.subscriptions);
  const subscribe = useFeedStore((s) => s.subscribe);
  const subscribePubMed = useFeedStore((s) => s.subscribePubMed);

  const [data, setData] = useState<DiscoverResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [subscribingUrl, setSubscribingUrl] = useState<string | null>(null);
  const [creatingPubMed, setCreatingPubMed] = useState(false);
  const [pubmedMessage, setPubmedMessage] = useState<string | null>(null);
  const [pubmedError, setPubmedError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    const trimmedSearch = search.trim();

    if (category) params.set("category", category);
    if (specialty) params.set("specialty", specialty);
    if (trimmedSearch) params.set("search", trimmedSearch);

    const query = params.toString();
    const endpoint = query ? `/api/feeds/discover?${query}` : "/api/feeds/discover";

    setIsLoading(true);
    setPubmedError(null);
    setPubmedMessage(null);

    fetch(endpoint, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load journal directory");
        }

        return res.json();
      })
      .then((response: DiscoverResponse) => setData(response))
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setData(null);
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [category, search, specialty]);

  const subscribedUrls = useMemo(
    () => new Set(subscriptions.map((subscription) => subscription.feedSource.feedUrl)),
    [subscriptions]
  );

  const trimmedSearch = search.trim();
  const hasSearch = trimmedSearch.length > 0;
  const feeds = data?.feeds ?? data?.journals ?? [];
  const suggestedFeeds = hasSearch ? [] : data?.suggestedFeeds ?? [];
  const browseFeeds = hasSearch ? feeds : feeds.filter((feed) => !feed.isSuggested);

  const handleSubscribe = async (feedUrl: string) => {
    setSubscribingUrl(feedUrl);
    try {
      await subscribe(feedUrl);
    } catch {
      // Errors are surfaced by the store.
    } finally {
      setSubscribingUrl(null);
    }
  };

  const handleCreatePubMedFeed = async (query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setCreatingPubMed(true);
    setPubmedError(null);
    setPubmedMessage(null);

    try {
      await subscribePubMed(trimmedQuery);
      setPubmedMessage(`Live PubMed feed created for "${trimmedQuery}".`);
    } catch (error) {
      setPubmedError(
        error instanceof Error ? error.message : "Failed to create PubMed feed"
      );
    } finally {
      setCreatingPubMed(false);
    }
  };

  const renderJournalList = (items: DiscoverJournal[], emptyState: string) => {
    if (items.length === 0) {
      return (
        <div className="rounded-xl border border-dashed border-border-subtle px-4 py-6 text-center">
          <p className="text-sm text-ink-muted">{emptyState}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
        {items.map((journal) => {
          const isSubscribed =
            journal.isSubscribed || subscribedUrls.has(journal.feedUrl);
          const isSubscribing = subscribingUrl === journal.feedUrl;

          return (
            <div
              key={journal.feedUrl}
              className="flex items-start justify-between gap-3 rounded-xl border border-border-subtle p-3 transition-colors hover:bg-surface-raised/50"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ink">{journal.title}</p>
                <p className="mt-1 text-xs text-ink-muted">
                  {journal.publisher}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-surface-raised px-2 py-0.5 text-[10px] text-ink-muted">
                    {journal.category}
                  </span>
                  <span className="rounded-full bg-surface-raised px-2 py-0.5 text-[10px] text-ink-muted">
                    {journal.specialty}
                  </span>
                  {journal.isSuggested && (
                    <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] text-brand">
                      Suggested for you
                    </span>
                  )}
                </div>
                {journal.description && (
                  <p className="mt-2 text-xs text-ink-muted line-clamp-2">
                    {journal.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => handleSubscribe(journal.feedUrl)}
                disabled={isSubscribed || isSubscribing}
                className={cn(
                  "shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
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
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-3 pt-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by topic, journal, or publisher..."
          className="flex-1"
        />
      </div>

      <div className="flex gap-2">
        <select aria-label="Select option"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="flex-1 rounded-xl border border-border bg-surface-raised px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
        >
          <option value="">All Categories</option>
          {data?.categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select aria-label="Select option"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="flex-1 rounded-xl border border-border bg-surface-raised px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
        >
          <option value="">All Specialties</option>
          {data?.specialties.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {hasSearch ? (
        <div className="space-y-6">
          <section className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-ink">Curated Journals</h3>
              <p className="mt-1 text-xs text-ink-muted">
                Matches from the ScholarSync journal directory for &quot;{trimmedSearch}&quot;.
              </p>
            </div>
            {renderJournalList(
              feeds,
              `No curated journals match "${trimmedSearch}".`
            )}
          </section>

          {trimmedSearch.length >= 3 && data?.pubmedSuggestion && (
            <section className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold text-ink">PubMed Search Feed</h3>
                <p className="mt-1 text-xs text-ink-muted">
                  Turn this topic into a live feed that updates as PubMed indexes new papers.
                </p>
              </div>
              <div className="glass-panel flex items-center justify-between gap-4 rounded-xl p-4">
                <div>
                  <p className="text-sm font-medium text-ink">
                    Create live feed: &quot;{data.pubmedSuggestion.query}&quot;
                  </p>
                  <p className="mt-1 text-xs text-ink-muted">
                    {data.pubmedSuggestion.label} auto-updates when new matching papers are indexed on PubMed.
                  </p>
                </div>
                <button
                  onClick={() => handleCreatePubMedFeed(trimmedSearch)}
                  disabled={creatingPubMed}
                  className="shrink-0 rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-hover disabled:opacity-50"
                >
                  {creatingPubMed ? "Creating..." : "Create Feed"}
                </button>
              </div>
              {pubmedMessage && (
                <p className="text-xs text-green-500">{pubmedMessage}</p>
              )}
              {pubmedError && (
                <p className="text-xs text-red-400">{pubmedError}</p>
              )}
            </section>
          )}

          <section className="rounded-xl border border-dashed border-border-subtle px-4 py-5">
            <h3 className="text-sm font-semibold text-ink">
              Can&apos;t find what you&apos;re looking for?
            </h3>
            <p className="mt-2 text-xs text-ink-muted">
              {feeds.length === 0
                ? "Try the PubMed search feed above, or add a custom RSS URL in the Add URL tab."
                : "Use the PubMed search feed above for broader topic coverage, or add a custom RSS URL in the Add URL tab."}
            </p>
          </section>
        </div>
      ) : (
        <div className="space-y-6">
          {suggestedFeeds.length > 0 && (
            <section className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold text-ink">Suggested for you</h3>
                <p className="mt-1 text-xs text-ink-muted">
                  Personalized from the specialties you selected during onboarding.
                </p>
              </div>
              {renderJournalList(suggestedFeeds, "No personalized suggestions yet.")}
            </section>
          )}

          <section className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-ink">Browse Journals</h3>
              <p className="mt-1 text-xs text-ink-muted">
                Explore the curated directory by category, specialty, or publisher.
              </p>
            </div>
            {renderJournalList(
              browseFeeds,
              "No journals found matching your filters."
            )}
          </section>
        </div>
      )}
    </div>
  );
}
