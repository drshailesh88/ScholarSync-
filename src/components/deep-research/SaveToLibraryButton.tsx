"use client";

import { useState, useCallback } from "react";
import { BookmarkPlus, Check, Loader2, AlertCircle } from "lucide-react";
import type { DeepResearchSource } from "./types";

interface SaveToLibraryButtonProps {
  topic: string;
  mode: string;
  markdownReport: string;
  sources: DeepResearchSource[];
  keyFindings: string[];
  gaps: string[];
  isComplete: boolean;
  isLoggedIn?: boolean;
}

export function SaveToLibraryButton({
  topic,
  mode,
  markdownReport,
  sources,
  keyFindings,
  gaps,
  isComplete,
  isLoggedIn = true,
}: SaveToLibraryButtonProps) {
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = useCallback(async () => {
    if (!isComplete || !isLoggedIn) return;

    setState("saving");
    setErrorMessage("");

    try {
      const response = await fetch("/api/deep-research/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          mode,
          markdownReport,
          sources,
          keyFindings,
          gaps,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || `Failed to save (${response.status})`);
      }

      setState("saved");
    } catch (err) {
      setState("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to save");
    }
  }, [topic, mode, markdownReport, sources, keyFindings, gaps, isComplete, isLoggedIn]);

  const isDisabled = !isComplete || !isLoggedIn || state === "saving" || state === "saved";

  return (
    <div className="relative inline-flex">
      <button
        onClick={handleSave}
        disabled={isDisabled}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
          state === "saved"
            ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
            : state === "error"
              ? "bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30"
              : "bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 disabled:cursor-not-allowed"
        }`}
        title={
          !isLoggedIn
            ? "Sign in to save"
            : !isComplete
              ? "Research must be complete to save"
              : state === "saved"
                ? "Saved to library"
                : "Save to library"
        }
      >
        {state === "saving" ? (
          <Loader2 size={16} className="animate-spin" />
        ) : state === "saved" ? (
          <Check size={16} />
        ) : state === "error" ? (
          <AlertCircle size={16} />
        ) : (
          <BookmarkPlus size={16} />
        )}
        <span>
          {state === "saving"
            ? "Saving..."
            : state === "saved"
              ? "Saved"
              : state === "error"
                ? "Retry"
                : "Save to Library"}
        </span>
      </button>

      {/* Error tooltip */}
      {state === "error" && errorMessage && (
        <div className="absolute top-full mt-2 left-0 w-64 p-2 bg-white dark:bg-gray-800 border border-red-500/30 rounded-lg text-xs text-red-400 shadow-lg z-10">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
