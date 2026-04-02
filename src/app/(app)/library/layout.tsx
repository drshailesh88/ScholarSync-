import { isNewLibraryEnabled } from "@/lib/feature-flags";
import { LibraryShell } from "@/components/library/LibraryShell";
import { getLibraryCounts } from "@/lib/library/home";
import {
  getLibraryProjects,
  getLastActiveProjectId,
} from "@/lib/library/project-context";

export default async function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isNewLibraryEnabled()) {
    // Old library: no shell, just render children directly
    return <>{children}</>;
  }

  const [counts, projects, rawActiveProjectId] = await Promise.all([
    getLibraryCounts(),
    getLibraryProjects(),
    getLastActiveProjectId(),
  ]);

  // Clear stale/deleted project ID — only pass if the project still exists
  const activeProjectId =
    rawActiveProjectId && projects.some((p) => p.id === rawActiveProjectId)
      ? rawActiveProjectId
      : null;

  return (
    <LibraryShell
      counts={counts}
      projects={projects}
      activeProjectId={activeProjectId}
    >
      {children}
    </LibraryShell>
  );
}
