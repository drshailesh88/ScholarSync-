import { notFound } from "next/navigation";
import { isNewLibraryEnabled } from "@/lib/feature-flags";
import { getProject } from "@/lib/actions/projects";
import { getLibrarySources } from "@/lib/library/service";
import { getLibrarySourceCount } from "@/lib/library/home";
import { StateViewClient } from "../../[state]/StateViewClient";

const PAGE_SIZE = 25;

export default async function ProjectLibraryPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  if (!isNewLibraryEnabled()) {
    notFound();
  }

  const { projectId: pidStr } = await params;
  const projectId = parseInt(pidStr, 10);
  if (isNaN(projectId)) notFound();

  const project = await getProject(projectId);
  if (!project) notFound();

  const filters = {
    projectId,
    sortBy: "date_added" as const,
    sortDir: "desc" as const,
    limit: PAGE_SIZE,
    offset: 0,
  };

  const [sources, totalCount] = await Promise.all([
    getLibrarySources(filters),
    getLibrarySourceCount(undefined, projectId),
  ]);

  return (
    <StateViewClient
      title={project.title}
      initialSources={sources}
      totalCount={totalCount}
      filters={filters}
      showStateBadge={true}
    />
  );
}
