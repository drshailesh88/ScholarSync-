"use server";

import { generateFollowUpSuggestions } from "@/lib/ai/prompts/follow-up-suggestions";
import type { FollowUpSuggestion } from "@/lib/ai/prompts/follow-up-suggestions";

export async function getFollowUpSuggestions(params: {
  responseText: string;
  sourceTitles: string[];
  userQuery: string;
  mode: "research" | "learn";
}): Promise<FollowUpSuggestion[]> {
  if (params.responseText.length < 100) {
    return [];
  }

  return generateFollowUpSuggestions(params);
}
