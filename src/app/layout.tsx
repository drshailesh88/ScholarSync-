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
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          {/* eslint-disable-next-line @next/next/no-page-custom-font */}
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&display=swap"
            rel="stylesheet"
          />
        </head>
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
