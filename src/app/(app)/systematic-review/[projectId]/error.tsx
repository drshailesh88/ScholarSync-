"use client";

import { AlertTriangle } from "lucide-react";

export default function SrStageError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="cv-inner wide">
      <div className="stateblock error" role="alert">
        <AlertTriangle size={18} aria-hidden />
        <h3>This stage could not load</h3>
        <p>
          {error.message ||
            "Something went wrong while loading the review. Your decisions are saved — retry to pick up where you left off."}
        </p>
        <div className="actions">
          <button type="button" className="btn pri" onClick={reset}>
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}
