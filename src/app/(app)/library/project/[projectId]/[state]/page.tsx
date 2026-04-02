import { notFound } from "next/navigation";
import { isNewLibraryEnabled } from "@/lib/feature-flags";
import { getProject } from "@/lib/actions/projects";
import { getLibrarySources } from "@/lib/library/service";
import { StateViewClient } from "../../../[state]/StateViewClient";
import type { WorkflowState, LibrarySourceFilters } from "@/lib/library";

const VALID_STATES = ["inbox", "core", "background", "archived"] as const;
type ValidState = (typeof VALID_STATES)[number];

const STATE_TITLES: Record<ValidState, string> = {
  inbox: "Inbox",
  core: "Core",
  background: "Background",
  archived: "Archived",
};

const PAGE_SIZE = 25;

export default async function ProjectStateView({
  params,
}: {
  params: Promise<{ projectId: string; state: string }>;
}) {
  if (!isNewLibraryEnabled()) {
    notFound();
  }

  const { projectId: pidStr, state } = await params;
  const projectId = parseInt(pidStr, 10);
  if (isNaN(projectId)) notFound();

  if (!VALID_STATES.includes(state as ValidState)) {
    notFound();
  }

  const project = await getProject(projectId);
  if (!project) notFound();

  const validState = state as ValidState;
  const filters: LibrarySourceFilters = {
    projectId,
    workflowState: validState as WorkflowState,
    sortBy: "date_added",
    sortDir: "desc",
    limit: PAGE_SIZE,
    offset: 0,
  };

  const sources = await getLibrarySources(filters);

  return (
    <StateViewClient
      title={`${project.title} — ${STATE_TITLES[validState]}`}
      initialSources={sources}
      totalCount={sources.length < PAGE_SIZE ? sources.length : PAGE_SIZE * 2}
      filters={filters}
      showStateBadge={false}
    />
  );
}
