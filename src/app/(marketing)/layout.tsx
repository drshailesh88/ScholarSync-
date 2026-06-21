import type { Metadata } from "next";
import { BRAND } from "@/lib/config/branding";

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.tagline}`,
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="light"
      style={{
        colorScheme: "light",
        fontFamily: '"DM Sans", system-ui, sans-serif',
      }}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,580;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
        rel="stylesheet"
      />
      {children}
    </div>
  );
}
