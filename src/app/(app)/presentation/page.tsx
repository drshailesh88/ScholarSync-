"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Presentation,
  Trash,
  DotsThree,
  Sparkle,
  Clock,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { getUserDecks, deleteDeck } from "@/lib/actions/presentations";
import { PRESET_THEMES } from "@/types/presentation";

export default function PresentationListPage() {
  const router = useRouter();
  const [decks, setDecks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDecks();
  }, []);

  async function loadDecks() {
    try {
      const data = await getUserDecks();
      setDecks(data);
    } catch (err) {
      console.error("Failed to load decks:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(e: React.MouseEvent, deckId: number) {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Delete this presentation?")) return;
    await deleteDeck(deckId);
    setDecks((prev) => prev.filter((d) => d.id !== deckId));
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-ink">Presentations</h1>
          <p className="text-sm text-ink-muted mt-1">
            Create AI-powered slide decks from your research
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/presentation/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand/90 transition-colors"
          >
            <Plus size={16} />
            New Presentation
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-video rounded-xl border border-border bg-surface-raised animate-pulse"
            />
          ))}
        </div>
      ) : decks.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-4">
            <Presentation size={32} className="text-brand" />
          </div>
          <h2 className="text-lg font-semibold text-ink mb-2">
            No presentations yet
          </h2>
          <p className="text-sm text-ink-muted mb-6 max-w-md mx-auto">
            Create your first AI-powered presentation from papers, documents, or
            start from scratch.
          </p>
          <Link
            href="/presentation/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand/90 transition-colors"
          >
            <Sparkle size={16} />
            Create Presentation
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {decks.map((deck) => {
            const theme =
              PRESET_THEMES[deck.theme ?? "modern"] ?? PRESET_THEMES.modern;
            return (
              <Link
                key={deck.id}
                href={`/presentation/${deck.id}`}
                className="group rounded-xl border border-border overflow-hidden hover:border-brand/40 hover:shadow-md transition-all"
              >
                {/* Mini preview */}
                <div
                  className="aspect-video flex items-center justify-center p-6 relative"
                  style={{ backgroundColor: theme.backgroundColor }}
                >
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: theme.primaryColor }} />
                  <p
                    className="text-sm font-bold text-center truncate px-4"
                    style={{ color: theme.primaryColor }}
                  >
                    {deck.title}
                  </p>

                  {/* Delete button */}
                  <button
                    onClick={(e) => handleDelete(e, deck.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/20 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                  >
                    <Trash size={14} />
                  </button>
                </div>

                {/* Info */}
                <div className="px-4 py-3 bg-surface">
                  <h3 className="text-sm font-medium text-ink truncate">
                    {deck.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] text-ink-muted">
                      {deck.totalSlides ?? 0} slides
                    </span>
                    <span className="text-[10px] text-ink-muted flex items-center gap-1">
                      <Clock size={10} />
                      {deck.updatedAt
                        ? new Date(deck.updatedAt).toLocaleDateString()
                        : "—"}
                    </span>
                    {deck.generationStatus === "completed" && (
                      <span className="text-[10px] text-brand flex items-center gap-0.5">
                        <Sparkle size={10} /> AI
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
