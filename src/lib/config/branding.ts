export const BRAND = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME ?? "Slate",
  tagline: process.env.NEXT_PUBLIC_BRAND_TAGLINE ?? "Research desk",
} as const;
