import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { DomainProvider } from "@/components/providers/domain-provider";
import { getCurrentUserId } from "@/lib/auth";
import { getCurrentUserDomainConfig } from "@/lib/search/domains/user-domain";

// Every authenticated route is per-user and must render dynamically — never
// statically prerendered at build time (auth context is unavailable then).
export const dynamic = "force-dynamic";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userId: string;
  try {
    userId = await getCurrentUserId();
  } catch {
    redirect("/sign-in");
  }

  const domain = await getCurrentUserDomainConfig(userId);

  return (
    <DomainProvider domain={domain}>
      <AppShell>{children}</AppShell>
    </DomainProvider>
  );
}
