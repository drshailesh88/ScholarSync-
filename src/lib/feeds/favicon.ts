const GOOGLE_FAVICON_URL = "https://www.google.com/s2/favicons?domain=";
const FAVICON_SIZE = 32;

export function getFaviconUrl(siteUrl: string): string | null {
  if (!siteUrl) return null;

  try {
    const domain = new URL(siteUrl).hostname;
    return `${GOOGLE_FAVICON_URL}${encodeURIComponent(domain)}&sz=${FAVICON_SIZE}`;
  } catch {
    return null;
  }
}
