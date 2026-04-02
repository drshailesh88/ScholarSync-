"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { PencilLine, Spinner } from "@phosphor-icons/react";
import { createEditorHandoffFromIds } from "@/lib/library/editor-handoff";

interface SendToEditorButtonProps {
  libraryId: string;
  /** Optional target document ID. If provided, navigates directly to that editor. */
  documentId?: number;
  className?: string;
}

export function SendToEditorButton({
  libraryId,
  documentId,
  className,
}: SendToEditorButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    setError(null);
    startTransition(async () => {
      try {
        const { handoffId } = await createEditorHandoffFromIds([libraryId], documentId);
        // Navigate to editor with handoff query param
        // If no specific documentId, go to editor/new — the handoff panel will show there
        const editorUrl = documentId
          ? `/editor/${documentId}?handoff=${handoffId}`
          : `/editor/new?handoff=${handoffId}`;
        router.push(editorUrl);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to create handoff");
      }
    });
  }

  return (
    <div className={className}>
      <button
        onClick={handleClick}
        disabled={isPending}
        className="flex items-center gap-1.5 rounded-md border border-[var(--border)] px-2.5 py-1.5 text-xs text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-raised)] transition-colors disabled:opacity-50"
        title="Send citation to Editor"
      >
        {isPending ? (
          <Spinner size={13} className="animate-spin" />
        ) : (
          <PencilLine size={13} />
        )}
        Cite in Editor
      </button>
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
