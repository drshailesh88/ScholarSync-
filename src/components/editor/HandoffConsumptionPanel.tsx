"use client";

import { useState, useEffect, useTransition, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CheckCircle,
  BookOpen,
  X,
  Spinner,
  ArrowRight,
} from "@phosphor-icons/react";
import {
  getEditorHandoff,
  consumeEditorHandoff,
  cancelEditorHandoff,
} from "@/lib/library/editor-handoff";
import type { EditorHandoff, HandoffSourcePayload } from "@/lib/library/editor-handoff";

interface HandoffConsumptionPanelProps {
  onImportCitations: (sources: HandoffSourcePayload[]) => void;
  editorReady?: boolean;
}

const HANDOFF_ID_RE = /^\d+$/;

/**
 * Outer wrapper: reads the handoff query param and renders the inner
 * panel with a key. Changing the key auto-resets all inner state (BUG #6).
 */
export function HandoffConsumptionPanel(props: HandoffConsumptionPanelProps) {
  const searchParams = useSearchParams();
  const handoffId = searchParams.get("handoff");

  if (!handoffId || !HANDOFF_ID_RE.test(handoffId)) return null;

  return (
    <HandoffPanelInner
      key={handoffId}
      handoffId={parseInt(handoffId, 10)}
      {...props}
    />
  );
}

/**
 * Inner component: keyed by handoffId so state auto-resets when param changes.
 * No setState in effects — only async callbacks set state.
 */
function HandoffPanelInner({
  handoffId,
  onImportCitations,
  editorReady = false,
}: HandoffConsumptionPanelProps & { handoffId: number }) {
  const router = useRouter();
  const [handoff, setHandoff] = useState<EditorHandoff | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [imported, setImported] = useState(false);
  const [isPending, startTransition] = useTransition();
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch handoff data on mount
  useEffect(() => {
    let cancelled = false;

    getEditorHandoff(handoffId)
      .then((h) => {
        if (!cancelled && h && h.status === "pending") {
          setHandoff(h);
        }
      })
      .catch(() => {
        // Silently ignore — handoff may have been consumed or cancelled
      });

    return () => {
      cancelled = true;
      if (dismissTimerRef.current) {
        clearTimeout(dismissTimerRef.current);
      }
    };
  }, [handoffId]);

  const removeHandoffParam = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete("handoff");
    router.replace(url.pathname + url.search, { scroll: false });
  }, [router]);

  const handleImport = useCallback(() => {
    if (!handoff) return;

    startTransition(async () => {
      // Consume server-side FIRST, then import on success (BUG #2)
      const consumed = await consumeEditorHandoff(handoff.id);
      if (!consumed) return; // Already consumed or cancelled

      onImportCitations(consumed.payload.sources);
      setImported(true);
      removeHandoffParam();

      dismissTimerRef.current = setTimeout(() => setDismissed(true), 3000);
    });
  }, [handoff, onImportCitations, removeHandoffParam]);

  const handleDismiss = useCallback(() => {
    // Cancel the handoff server-side (BUG #5)
    if (handoff) {
      cancelEditorHandoff(handoff.id).catch(() => {});
    }
    setDismissed(true);
    removeHandoffParam();
  }, [handoff, removeHandoffParam]);

  if (dismissed || !handoff) return null;

  const sources = handoff.payload.sources;

  if (imported) {
    return (
      <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 border-b border-emerald-500/20 shrink-0">
        <CheckCircle size={16} className="text-emerald-500" weight="fill" />
        <span className="text-sm text-emerald-700 dark:text-emerald-300">
          {sources.length === 1
            ? `"${sources[0].title}" imported as citation.`
            : `${sources.length} sources imported as citations.`}
        </span>
      </div>
    );
  }

  return (
    <div className="border-b border-[var(--brand)]/20 bg-[var(--brand)]/5 shrink-0">
      <div className="flex items-start justify-between px-4 py-3">
        <div className="flex items-start gap-3">
          <BookOpen size={20} className="text-[var(--brand)] mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-[var(--ink)]">
              {sources.length === 1
                ? "Citation ready to import"
                : `${sources.length} citations ready to import`}
            </p>
            <div className="mt-1.5 space-y-1">
              {sources.slice(0, 5).map((s) => (
                <p key={s.libraryId} className="text-xs text-[var(--ink-muted)] truncate max-w-md">
                  {s.title}
                  {s.authors && s.authors.length > 0 && (
                    <span className="ml-1">
                      — {s.authors[0]}{s.authors.length > 1 ? " et al." : ""}
                    </span>
                  )}
                </p>
              ))}
              {sources.length > 5 && (
                <p className="text-xs text-[var(--ink-muted)]">
                  ...and {sources.length - 5} more
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-4">
          <button
            onClick={handleDismiss}
            className="p-1 rounded text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
            title="Dismiss"
          >
            <X size={14} />
          </button>
          <button
            onClick={handleImport}
            disabled={isPending || !editorReady}
            className="flex items-center gap-1.5 rounded-md bg-[var(--brand)] px-3 py-1.5 text-xs font-medium text-white hover:bg-[var(--brand)]/90 transition-colors disabled:opacity-50"
            title={!editorReady ? "Waiting for editor to load..." : undefined}
          >
            {isPending ? (
              <Spinner size={13} className="animate-spin" />
            ) : (
              <ArrowRight size={13} />
            )}
            Import {sources.length === 1 ? "Citation" : "Citations"}
          </button>
        </div>
      </div>
    </div>
  );
}
