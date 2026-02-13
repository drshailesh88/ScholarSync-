import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { inter, plusJakarta, merriweather } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScholarSync",
  description:
    "AI-powered academic writing platform for medical students and researchers",
};

const hasClerkKeys =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

function Providers({ children }: { children: React.ReactNode }) {
  if (hasClerkKeys) {
    return (
      <ClerkProvider
        appearance={{
          variables: { colorPrimary: "#6366f1" },
        }}
      >
        {children}
      </ClerkProvider>
    );
  }
  return <>{children}</>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${inter.variable} ${plusJakarta.variable} ${merriweather.variable}`}
      >
        <body className="bg-background text-ink antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}
