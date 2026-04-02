import { isNewLibraryEnabled } from "@/lib/feature-flags";
import { notFound } from "next/navigation";
import { getTrashSources } from "@/lib/library/service";
import { getLibraryCounts } from "@/lib/library/home";
import { TrashViewClient } from "./TrashViewClient";

export default async function TrashPage() {
  if (!isNewLibraryEnabled()) {
    notFound();
  }

  const [{ sources, deletedAtMap }, counts] = await Promise.all([
    getTrashSources(),
    getLibraryCounts(),
  ]);

  return (
    <TrashViewClient
      initialSources={sources}
      deletedAtMap={deletedAtMap}
      trashCount={counts.trash}
    />
  );
}
