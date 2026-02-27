import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { getCurrentUserId } from "@/lib/auth";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await getCurrentUserId();
  } catch {
    redirect("/sign-in");
  }

  return <AppShell>{children}</AppShell>;
}
