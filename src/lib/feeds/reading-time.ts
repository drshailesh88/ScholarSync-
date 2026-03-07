const WORDS_PER_MINUTE = 200;

export function estimateReadingTime(text: string | null | undefined): string {
  if (!text) return "< 1 min";

  const trimmed = text.trim();
  if (!trimmed) return "< 1 min";

  const words = trimmed.split(/\s+/).length;
  const minutes = Math.ceil(words / WORDS_PER_MINUTE);

  return minutes <= 0 ? "< 1 min" : `${minutes} min read`;
}
