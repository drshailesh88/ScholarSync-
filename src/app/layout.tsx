import type { Metadata } from "next";
import { ClerkProviderWrapper } from "@/components/providers/clerk-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { PostHogProvider } from "@/components/providers/posthog-provider";
import { inter, plusJakarta, merriweather } from "@/lib/fonts";
import { BRAND } from "@/lib/config/branding";
import "./globals.css";

export const metadata: Metadata = {
  title: BRAND.name,
  description:
    "Private literature search across PubMed, Semantic Scholar, and OpenAlex — ranked papers for your scientific and clinical questions.",
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
