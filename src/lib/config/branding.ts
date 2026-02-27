export const BRAND = {
  name: process.env.NEXT_PUBLIC_BRAND_NAME ?? "ScholarSync",
  tagline:
    process.env.NEXT_PUBLIC_BRAND_TAGLINE ?? "Academic Integrity Platform",
} as const;
