"use client";

import type {
  SlideImageAspectRatio,
  SlideImageStyle,
} from "@/lib/slides/image-generation";

export interface GenerateImageClientRequest {
  prompt: string;
  style?: SlideImageStyle;
  aspectRatio?: SlideImageAspectRatio;
}

export interface GenerateImageClientResponse {
  imageUrl: string;
  attribution?: string;
}

export async function requestGeneratedSlideImage(
  input: GenerateImageClientRequest
): Promise<GenerateImageClientResponse> {
  const response = await fetch("/api/slides/generate-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(payload.error ?? "Image generation failed");
  }

  return response.json() as Promise<GenerateImageClientResponse>;
}
