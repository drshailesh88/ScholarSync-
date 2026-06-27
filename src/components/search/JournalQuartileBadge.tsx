import { cn } from "@/lib/utils";

/**
 * Journal-quartile chip (Scimago Q1–Q4). Surfaces the journal-quality signal that
 * already rides on each result (`journalQuartile`) but was previously only used in
 * ranking, never shown. Colours mirror `journal-quality.ts` QUARTILE_COLORS so the
 * badge and any other quartile UI stay consistent. Renders nothing for an unrated
 * journal — absence of a quartile is not a Q4.
 */
const QUARTILE_STYLES: Record<"Q1" | "Q2" | "Q3" | "Q4", string> = {
  Q1: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  Q2: "bg-sky-500/10 text-sky-600 border-sky-500/30",
  Q3: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  Q4: "bg-orange-500/10 text-orange-600 border-orange-500/30",
};

export function JournalQuartileBadge({
  quartile,
  className,
}: {
  quartile?: "Q1" | "Q2" | "Q3" | "Q4" | null;
  className?: string;
}) {
  if (!quartile) return null;
  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded-full text-[10px] font-medium border",
        QUARTILE_STYLES[quartile],
        className
      )}
      title={`${quartile} journal (Scimago quartile)`}
    >
      {quartile} journal
    </span>
  );
}
