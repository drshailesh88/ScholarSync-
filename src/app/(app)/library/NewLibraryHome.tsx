import { getLibraryHome } from "@/lib/library/home";
import { LibraryHomeClient } from "./LibraryHomeClient";

export async function NewLibraryHome() {
  const data = await getLibraryHome();
  return <LibraryHomeClient data={data} />;
}
