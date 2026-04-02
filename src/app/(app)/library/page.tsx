import { isNewLibraryEnabled } from "@/lib/feature-flags";
import OldLibraryPage from "./OldLibraryPage";
import { NewLibraryHome } from "./NewLibraryHome";

export default function LibraryPage() {
  if (!isNewLibraryEnabled()) {
    return <OldLibraryPage />;
  }

  return <NewLibraryHome />;
}
