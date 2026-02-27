import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { getCurrentUserId } from "@/lib/auth";

const hasClerkKeys =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (hasClerkKeys) {
    try {
      await getCurrentUserId();
    } catch {
      redirect("/sign-in");
    }
  }

  return <AppShell>{children}</AppShell>;
}
