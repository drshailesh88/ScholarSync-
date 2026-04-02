import { getLibrarySourceById } from "@/lib/library/service";
import { ReaderView } from "@/components/library/reader/reader-view";

interface LibraryItemPageProps {
  params: Promise<{ libraryId: string }>;
}

export default async function LibraryItemPage({ params }: LibraryItemPageProps) {
  const { libraryId } = await params;
  const source = await getLibrarySourceById(decodeURIComponent(libraryId));

  return <ReaderView source={source} />;
}
