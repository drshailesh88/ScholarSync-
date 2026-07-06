"use client";

import { Copy, Sparkles } from "lucide-react";
import { deriveDupeQueue, deriveImportLedger } from "@/lib/sr/import";
import type { DupeQueueEntry, LedgerBatch } from "@/lib/sr/import";
import { useSrStore } from "@/stores/sr-store";
import { SrStageSkeleton } from "../sr-skeleton";
import { useSrReview } from "../use-sr-review";

function LedgerCard({
  batch,
  onUndo,
}: {
  batch: LedgerBatch;
  onUndo: () => void;
}) {
  const label = batch.ai
    ? "Added via AI search"
    : batch.target === "screen"
      ? "Added to Title & abstract"
      : "Added to Full-text review";

  return (
    <div className="lcard">
      <div className={batch.ai ? "stg ai" : "stg"}>{label}</div>
      <div className="nums">
        <div>
          <div className="nm">{batch.refs}</div>
          <div className="nl">References</div>
        </div>
        <div>
          <div className="nm">{batch.duplicatesRemoved}</div>
          <div className="nl">Duplicates</div>
        </div>
      </div>
      <div className="meta">
        <span>{batch.source}</span>
        <button type="button" onClick={onUndo}>
          Undo import
        </button>
      </div>
    </div>
  );
}

function DupeCard({
  entry,
  onMerge,
  onKeep,
}: {
  entry: DupeQueueEntry;
  onMerge: () => void;
  onKeep: () => void;
}) {
  const { candidate, matchedOn } = entry;
  const firstAuthor = candidate.authors[0]?.split(" ")[0];

  return (
    <div className="dupe">
      <span className="pill con">
        <Copy size={11} aria-hidden /> Possible duplicate
      </span>
      <div>
        <div className="dt">
          {firstAuthor} {candidate.year} · {candidate.title}
        </div>
        <div className="dm">Matched on {matchedOn.join(" + ")}</div>
      </div>
      <div className="btnrow" style={{ marginLeft: "auto" }}>
        <button type="button" className="btn sm" onClick={onKeep}>
          Not a duplicate
        </button>
        <button type="button" className="btn pri sm" onClick={onMerge}>
          Merge
        </button>
      </div>
    </div>
  );
}

/** Screen 2 — the import ledger and the uncertain-duplicate queue. */
export function ImportScreen({ reviewId }: { reviewId: string }) {
  const review = useSrReview(reviewId);
  const mergeDuplicate = useSrStore((state) => state.mergeDuplicate);
  const markNotDuplicate = useSrStore((state) => state.markNotDuplicate);
  const undoImport = useSrStore((state) => state.undoImport);

  if (!review) return <SrStageSkeleton />;

  const ledger = deriveImportLedger(review);
  const queue = deriveDupeQueue(review);

  return (
    <div className="cv-inner wide">
      <div className="eyebrow">Stage 1 · The funnel</div>
      <h1 className="h2stage">Import references</h1>
      <p className="lead">
        You import your own search results (RIS / EndNote / PubMed / CSV) into
        a chosen stage; ScholarSync auto-deduplicates on title · year · volume
        · authors and keeps a reversible ledger. AI discovery can feed this
        queue — but import, dedupe and provenance are the system of record.{" "}
        <b>There is no search-strategy builder</b> — you arrive with your
        results.
      </p>

      <div className="aistrip">
        <span className="tag">
          <span className="srcchip ai">
            <Sparkles size={10} aria-hidden /> AI
          </span>
        </span>
        <span>
          <b>Find papers with AI</b> — ask a research question, AI retrieves
          candidates → they flow into this import queue (deduped like any
          other source).
        </span>
      </div>

      <div className="seclabel">
        Import history <span className="sp" />
        <span>{ledger.totalDuplicatesRemoved} total duplicates removed</span>
      </div>
      {ledger.batches.length === 0 ? (
        <div className="stateblock">
          <h3>Nothing imported yet</h3>
          <p>
            Import search results from PubMed, Embase, EndNote or a RIS/CSV
            file — or let AI discovery feed this queue.
          </p>
        </div>
      ) : (
        <div className="ledger">
          {ledger.batches.map((batch) => (
            <LedgerCard
              key={batch.id}
              batch={batch}
              onUndo={() => undoImport(batch.id)}
            />
          ))}
        </div>
      )}

      <div className="seclabel">
        Duplicate queue <span className="sp" />
      </div>
      {queue.length === 0 ? (
        <p className="queue-empty">
          No uncertain duplicates — everything the matcher was confident about
          was removed automatically.
        </p>
      ) : (
        <div className="dupelist">
          {queue.map((entry) => (
            <DupeCard
              key={entry.candidate.id}
              entry={entry}
              onMerge={() => mergeDuplicate(entry.candidate.id)}
              onKeep={() => markNotDuplicate(entry.candidate.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
