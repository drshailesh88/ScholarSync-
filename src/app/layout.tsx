import type { Metadata } from "next";
import { ClerkProviderWrapper } from "@/components/providers/clerk-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { PostHogProvider } from "@/components/providers/posthog-provider";
import { inter, plusJakarta, merriweather } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScholarSync",
  description:
    "AI-powered academic writing platform for medical students and researchers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProviderWrapper>
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
            <PostHogProvider>{children}</PostHogProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProviderWrapper>
  );
}
