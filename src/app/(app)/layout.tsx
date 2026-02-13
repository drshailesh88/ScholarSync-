import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";

const hasClerkKeys =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (hasClerkKeys) {
    const { auth } = await import("@clerk/nextjs/server");
    const { userId } = await auth();
    if (!userId) {
      redirect("/sign-in");
    }
  }

  return <AppShell>{children}</AppShell>;
}
