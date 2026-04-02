import { notFound } from "next/navigation";
import { isNewLibraryEnabled } from "@/lib/feature-flags";
import { getLibrarySources } from "@/lib/library/service";
import { StateViewClient } from "./StateViewClient";
import type { WorkflowState, LibrarySourceFilters } from "@/lib/library";

const VALID_STATES = ["inbox", "core", "background", "archived", "all"] as const;
type ValidState = (typeof VALID_STATES)[number];

const STATE_TITLES: Record<ValidState, string> = {
  inbox: "Inbox",
  core: "Core",
  background: "Background",
  archived: "Archived",
  all: "All Sources",
};

const PAGE_SIZE = 25;

export default async function LibraryStateView({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  if (!isNewLibraryEnabled()) {
    notFound();
  }

  const { state } = await params;

  if (!VALID_STATES.includes(state as ValidState)) {
    notFound();
  }

  const validState = state as ValidState;
  const filters: LibrarySourceFilters = {
    workflowState: validState === "all" ? undefined : (validState as WorkflowState),
    sortBy: "date_added",
    sortDir: "desc",
    limit: PAGE_SIZE,
    offset: 0,
  };

  const sources = await getLibrarySources(filters);

  // Get total count for pagination (fetch one extra page to detect "has more")
  const allSources = await getLibrarySources({
    ...filters,
    limit: 500,
    offset: 0,
  });
  const totalCount = allSources.length;

  return (
    <StateViewClient
      title={STATE_TITLES[validState]}
      initialSources={sources}
      totalCount={totalCount}
      filters={filters}
      showStateBadge={validState === "all"}
    />
  );
}
