"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Presentation, Trash, Clock } from "@phosphor-icons/react";
import { getUserDecks, deleteDeck } from "@/lib/actions/presentations";

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

export default function SlidesListPage() {
  const [decks, setDecks] = useState<DeckSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getUserDecks();
        setDecks(
          data.map((d) => ({
            ...d,
            description: d.description ?? null,
            theme: d.theme ?? "modern",
            audienceType: d.audienceType ?? "general",
            totalSlides: d.totalSlides ?? 0,
            sourceType: d.sourceType ?? "custom",
            createdAt: d.createdAt ? new Date(d.createdAt) : new Date(),
            updatedAt: d.updatedAt ? new Date(d.updatedAt) : new Date(),
          }))
        );
      } catch {
        // Silently handle error
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleDelete(deckId: number) {
    if (!confirm("Delete this presentation?")) return;
    try {
      await deleteDeck(deckId);
      setDecks((prev) => prev.filter((d) => d.id !== deckId));
    } catch {
      // ignore
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-ink">Presentations</h1>
          <p className="text-sm text-ink-muted mt-1">
            Create and manage your slide decks
          </p>
        </div>
        <Link
          href="/slides/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand text-white text-sm font-medium hover:bg-brand/90 transition-colors"
        >
          <Plus size={16} weight="bold" />
          New Presentation
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
        </div>
      ) : decks.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-border rounded-2xl">
          <Presentation size={48} className="text-ink-muted/40 mx-auto mb-4" />
          <h2 className="text-lg font-medium text-ink mb-2">
            No presentations yet
          </h2>
          <p className="text-sm text-ink-muted mb-6">
            Create your first presentation to get started
          </p>
          <Link
            href="/slides/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand text-white text-sm font-medium hover:bg-brand/90 transition-colors"
          >
            <Plus size={16} weight="bold" />
            Create Presentation
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {decks.map((deck) => (
            <Link
              key={deck.id}
              href={`/slides/${deck.id}`}
              className="group relative flex flex-col rounded-xl border border-border bg-surface hover:border-brand/40 hover:shadow-md transition-all p-4"
            >
              {/* Thumbnail placeholder */}
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
                <span>
                  {deck.updatedAt.toLocaleDateString()}
                </span>
              </div>

              {/* Delete button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDelete(deck.id);
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
