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

  const [counts, projects, activeProjectId] = await Promise.all([
    getLibraryCounts(),
    getLibraryProjects(),
    getLastActiveProjectId(),
  ]);

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
