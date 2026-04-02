import { isNewLibraryEnabled } from "@/lib/feature-flags";
import { LibraryShell } from "@/components/library/LibraryShell";
import { getLibraryCounts } from "@/lib/library/home";

export default async function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isNewLibraryEnabled()) {
    // Old library: no shell, just render children directly
    return <>{children}</>;
  }

  const counts = await getLibraryCounts();

  return (
    <LibraryShell counts={counts}>
      {children}
    </LibraryShell>
  );
}
