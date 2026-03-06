"use client";

import { useState } from "react";
import { Rss, MagnifyingGlass } from "@phosphor-icons/react";
import { Modal } from "@/components/ui/modal";
import { Tabs } from "@/components/ui/tabs";
import { useFeedStore } from "@/stores/feed-store";
import { JournalBrowser } from "@/components/feeds/journal-browser";

interface AddFeedModalProps {
  open: boolean;
  onClose: () => void;
}

const tabs = [
  { key: "url", label: "Add URL" },
  { key: "browse", label: "Browse Journals" },
];

export function AddFeedModal({ open, onClose }: AddFeedModalProps) {
  const [activeTab, setActiveTab] = useState("url");
  const [feedUrl, setFeedUrl] = useState("");
  const [pubmedQuery, setPubmedQuery] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = useFeedStore((s) => s.subscribe);
  const subscribePubMed = useFeedStore((s) => s.subscribePubMed);

  const handleAddUrl = async () => {
    if (!feedUrl.trim()) return;
    setIsSubscribing(true);
    setError(null);
    try {
      await subscribe(feedUrl.trim());
      setFeedUrl("");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add feed");
    } finally {
      setIsSubscribing(false);
    }
  };

  const handlePubMed = async () => {
    if (!pubmedQuery.trim()) return;
    setIsSubscribing(true);
    setError(null);
    try {
      await subscribePubMed(pubmedQuery.trim());
      setPubmedQuery("");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create PubMed feed");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Add Feed" className="max-w-xl">
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-4" />

      {activeTab === "url" ? (
        <div className="space-y-4">
          {/* RSS/Atom URL */}
          <div>
            <label className="block text-xs font-medium text-ink-muted mb-1.5">
              RSS / Atom Feed URL
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Rss
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
                />
                <input
                  type="url"
                  value={feedUrl}
                  onChange={(e) => setFeedUrl(e.target.value)}
                  placeholder="https://example.com/feed.xml"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface-raised border border-border text-ink placeholder:text-ink-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 transition-all"
                  onKeyDown={(e) => e.key === "Enter" && handleAddUrl()}
                />
              </div>
              <button
                onClick={handleAddUrl}
                disabled={!feedUrl.trim() || isSubscribing}
                className="px-4 py-2.5 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors disabled:opacity-50"
              >
                {isSubscribing ? "Adding..." : "Add"}
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t border-border-subtle" />
            <span className="text-xs text-ink-muted">or</span>
            <div className="flex-1 border-t border-border-subtle" />
          </div>

          {/* PubMed search */}
          <div>
            <label className="block text-xs font-medium text-ink-muted mb-1.5">
              PubMed Search Query
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MagnifyingGlass
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
                />
                <input
                  type="text"
                  value={pubmedQuery}
                  onChange={(e) => setPubmedQuery(e.target.value)}
                  placeholder='e.g. "machine learning" AND radiology'
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface-raised border border-border text-ink placeholder:text-ink-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 transition-all"
                  onKeyDown={(e) => e.key === "Enter" && handlePubMed()}
                />
              </div>
              <button
                onClick={handlePubMed}
                disabled={!pubmedQuery.trim() || isSubscribing}
                className="px-4 py-2.5 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {isSubscribing ? "Creating..." : "Create Feed"}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 px-3 py-2 rounded-xl">
              {error}
            </p>
          )}
        </div>
      ) : (
        <JournalBrowser />
      )}
    </Modal>
  );
}
