"use client";

import { ClerkProvider as BaseClerkProvider } from "@clerk/nextjs";

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const hasClerkKeys =
  publishableKey && !publishableKey.includes("placeholder");

export function ClerkProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!hasClerkKeys) {
    return <>{children}</>;
  }

  return (
    <BaseClerkProvider
      publishableKey={publishableKey!}
      appearance={{
        variables: { colorPrimary: "#6366f1" },
      }}
    >
      {children}
    </BaseClerkProvider>
  );
}
