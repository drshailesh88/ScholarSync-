// ============================================================================
// Social Media Export Formats — Configuration for LinkedIn, Twitter/X, Instagram
// ============================================================================

export interface SocialFormatConfig {
  name: string;
  description: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  maxSlides?: number;
  maxChars?: number;
  fileFormat: "pdf" | "png" | "text";
  icon: string;
}

export const SOCIAL_FORMATS = {
  linkedin_carousel: {
    name: "LinkedIn Carousel",
    description: "Square slides for LinkedIn document posts",
    width: 1080,
    height: 1080,
    aspectRatio: "1:1",
    maxSlides: 20,
    fileFormat: "pdf" as const,
    icon: "LinkedinLogo",
  },
  twitter_thread: {
    name: "Twitter/X Thread",
    description: "Text-based thread extracted from slides",
    maxChars: 280,
    fileFormat: "text" as const,
    icon: "XLogo",
  },
  twitter_images: {
    name: "Twitter/X Images",
    description: "16:9 images for Twitter/X posts",
    width: 1200,
    height: 675,
    aspectRatio: "16:9",
    maxSlides: 4,
    fileFormat: "png" as const,
    icon: "XLogo",
  },
  instagram_story: {
    name: "Instagram Stories",
    description: "Vertical slides for Instagram stories",
    width: 1080,
    height: 1920,
    aspectRatio: "9:16",
    fileFormat: "png" as const,
    icon: "InstagramLogo",
  },
  instagram_carousel: {
    name: "Instagram Carousel",
    description: "Square images for Instagram carousel posts",
    width: 1080,
    height: 1080,
    aspectRatio: "1:1",
    maxSlides: 10,
    fileFormat: "png" as const,
    icon: "InstagramLogo",
  },
} as const;

export type SocialFormatKey = keyof typeof SOCIAL_FORMATS;

export type SocialFormat = (typeof SOCIAL_FORMATS)[SocialFormatKey];
