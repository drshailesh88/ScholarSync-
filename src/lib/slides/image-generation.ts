import OpenAI from "openai";
import {
  configureFalClient,
  generateImage as generateFalImage,
} from "@/lib/illustration/lib/ai/image-generation";
import { svgBackend } from "@/lib/illustration/ai/backends/SVGBackend";
import { storeImportedSlideAsset } from "@/lib/slides/pptx-asset-storage";

export type SlideImageStyle = "realistic" | "illustration" | "diagram" | "abstract";
export type SlideImageAspectRatio = "16:9" | "4:3" | "1:1" | "3:4";

export interface SlideImageRequest {
  prompt: string;
  style?: SlideImageStyle;
  aspectRatio?: SlideImageAspectRatio;
}

export interface SlideImageResult {
  imageUrl: string;
  attribution?: string;
  provider: "openai" | "fal" | "illustration" | "unsplash" | "pexels";
}

function buildStyledPrompt(prompt: string, style: SlideImageStyle): string {
  const normalized = prompt.trim();
  const prefixMap: Record<SlideImageStyle, string> = {
    realistic:
      "Create a high-quality realistic presentation image with strong subject focus, clear composition, no overlaid text, and publication-grade lighting.",
    illustration:
      "Create a clean editorial illustration for a presentation slide, crisp edges, simplified forms, and no overlaid text.",
    diagram:
      "Create a structured explanatory visual with diagram-like clarity, labeled regions implied by layout only, clean shapes, and no overlaid text.",
    abstract:
      "Create an abstract conceptual visual for a presentation slide, visually striking, symbolic, and without overlaid text.",
  };

  return `${prefixMap[style]}\n\nSubject: ${normalized}`;
}

function mapOpenAISize(aspectRatio: SlideImageAspectRatio) {
  switch (aspectRatio) {
    case "16:9":
    case "4:3":
      return "1536x1024" as const;
    case "3:4":
      return "1024x1536" as const;
    case "1:1":
    default:
      return "1024x1024" as const;
  }
}

function mapFalSize(aspectRatio: SlideImageAspectRatio) {
  switch (aspectRatio) {
    case "16:9":
      return "landscape_16_9" as const;
    case "4:3":
      return "landscape_4_3" as const;
    case "3:4":
      return "portrait_4_3" as const;
    case "1:1":
    default:
      return "square_hd" as const;
  }
}

function mapStockOrientation(aspectRatio: SlideImageAspectRatio) {
  switch (aspectRatio) {
    case "16:9":
    case "4:3":
      return { unsplash: "landscape", pexels: "landscape" } as const;
    case "3:4":
      return { unsplash: "portrait", pexels: "portrait" } as const;
    case "1:1":
    default:
      return { unsplash: "squarish", pexels: "square" } as const;
  }
}

function mapIllustrationStyle(style: SlideImageStyle): string {
  switch (style) {
    case "diagram":
      return "technical diagram";
    case "abstract":
      return "abstract vector artwork";
    case "realistic":
      return "detailed editorial illustration";
    case "illustration":
    default:
      return "clean vector illustration";
  }
}

function mimeTypeToExtension(contentType?: string): string {
  const normalized = (contentType ?? "").toLowerCase();
  if (normalized.includes("svg")) return "svg";
  if (normalized.includes("jpeg") || normalized.includes("jpg")) return "jpg";
  if (normalized.includes("webp")) return "webp";
  return "png";
}

async function downloadRemoteAsset(url: string): Promise<{ buffer: Buffer; contentType?: string }> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Remote image download failed (${response.status})`);
  }

  const contentType = response.headers.get("content-type") ?? undefined;
  const arrayBuffer = await response.arrayBuffer();
  return {
    buffer: Buffer.from(arrayBuffer),
    contentType,
  };
}

export async function generateWithOpenAIProvider(
  request: Required<SlideImageRequest>
): Promise<SlideImageResult> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.images.generate({
    model: "gpt-image-1",
    prompt: buildStyledPrompt(request.prompt, request.style),
    size: mapOpenAISize(request.aspectRatio),
    output_format: "png",
    quality: request.style === "realistic" ? "high" : "medium",
    background: "opaque",
  });

  const image = response.data?.[0];
  const base64Image = image?.b64_json;
  if (!base64Image) {
    throw new Error("OpenAI did not return image data");
  }

  const buffer = Buffer.from(base64Image, "base64");
  const stored = await storeImportedSlideAsset(buffer, "png", "image/png");
  return {
    imageUrl: stored.url,
    attribution: "AI-generated via OpenAI",
    provider: "openai",
  };
}

export async function generateWithFalProvider(
  request: Required<SlideImageRequest>
): Promise<SlideImageResult> {
  if (!process.env.FAL_API_KEY) {
    throw new Error("FAL_API_KEY is not configured");
  }

  configureFalClient(process.env.FAL_API_KEY);
  const result = await generateFalImage({
    prompt: buildStyledPrompt(request.prompt, request.style),
    imageSize: mapFalSize(request.aspectRatio),
    numImages: 1,
  });

  const image = result.images[0];
  if (!image?.url) {
    throw new Error("fal.ai did not return an image URL");
  }

  const downloaded = await downloadRemoteAsset(image.url);
  const stored = await storeImportedSlideAsset(
    downloaded.buffer,
    mimeTypeToExtension(downloaded.contentType),
    downloaded.contentType ?? "image/png"
  );

  return {
    imageUrl: stored.url,
    attribution: "AI-generated via FLUX",
    provider: "fal",
  };
}

export async function generateWithIllustrationProvider(
  request: Required<SlideImageRequest>
): Promise<SlideImageResult> {
  const result = await svgBackend.generate({
    prompt: `${request.prompt}\n\nRender this as a ${mapIllustrationStyle(request.style)} suitable for a slide. Aspect ratio: ${request.aspectRatio}.`,
  });

  const stored = await storeImportedSlideAsset(
    Buffer.from(result.svg, "utf8"),
    "svg",
    "image/svg+xml"
  );

  return {
    imageUrl: stored.url,
    attribution: "AI-generated vector illustration",
    provider: "illustration",
  };
}

export async function searchStockPhotoProvider(
  request: Required<SlideImageRequest>
): Promise<SlideImageResult> {
  const orientation = mapStockOrientation(request.aspectRatio);

  if (process.env.UNSPLASH_ACCESS_KEY) {
    const url = new URL("https://api.unsplash.com/search/photos");
    url.searchParams.set("query", request.prompt);
    url.searchParams.set("per_page", "1");
    url.searchParams.set("orientation", orientation.unsplash);

    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });

    if (response.ok) {
      const payload = (await response.json()) as {
        results?: Array<{
          urls?: { regular?: string };
          user?: { name?: string };
          links?: { html?: string };
        }>;
      };
      const photo = payload.results?.[0];
      if (photo?.urls?.regular) {
        const downloaded = await downloadRemoteAsset(photo.urls.regular);
        const stored = await storeImportedSlideAsset(
          downloaded.buffer,
          mimeTypeToExtension(downloaded.contentType),
          downloaded.contentType ?? "image/jpeg"
        );
        return {
          imageUrl: stored.url,
          attribution: `Photo by ${photo.user?.name ?? "Unknown"} on Unsplash${photo.links?.html ? ` (${photo.links.html})` : ""}`,
          provider: "unsplash",
        };
      }
    }
  }

  if (process.env.PEXELS_API_KEY) {
    const url = new URL("https://api.pexels.com/v1/search");
    url.searchParams.set("query", request.prompt);
    url.searchParams.set("per_page", "1");
    url.searchParams.set("orientation", orientation.pexels);

    const response = await fetch(url, {
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
    });

    if (response.ok) {
      const payload = (await response.json()) as {
        photos?: Array<{
          src?: { large?: string };
          photographer?: string;
          url?: string;
        }>;
      };
      const photo = payload.photos?.[0];
      if (photo?.src?.large) {
        const downloaded = await downloadRemoteAsset(photo.src.large);
        const stored = await storeImportedSlideAsset(
          downloaded.buffer,
          mimeTypeToExtension(downloaded.contentType),
          downloaded.contentType ?? "image/jpeg"
        );
        return {
          imageUrl: stored.url,
          attribution: `Photo by ${photo.photographer ?? "Unknown"} on Pexels${photo.url ? ` (${photo.url})` : ""}`,
          provider: "pexels",
        };
      }
    }
  }

  throw new Error("No stock photo providers are configured or returned a match");
}

export const slideImageProviders = {
  fal: generateWithFalProvider,
  openai: generateWithOpenAIProvider,
  illustration: generateWithIllustrationProvider,
  stock: searchStockPhotoProvider,
};

export async function generateSlideImage(
  request: SlideImageRequest
): Promise<SlideImageResult> {
  const normalized: Required<SlideImageRequest> = {
    prompt: request.prompt.trim(),
    style: request.style ?? "illustration",
    aspectRatio: request.aspectRatio ?? "16:9",
  };

  if (!normalized.prompt) {
    throw new Error("Prompt is required");
  }

  const externalProviders = [
    process.env.FAL_API_KEY ? slideImageProviders.fal : null,
    process.env.OPENAI_API_KEY ? slideImageProviders.openai : null,
  ].filter(
    (
      provider
    ): provider is (request: Required<SlideImageRequest>) => Promise<SlideImageResult> =>
      provider !== null
  );

  for (const provider of externalProviders) {
    try {
      return await provider(normalized);
    } catch {
      // Continue down the fallback chain.
    }
  }

  try {
    return await slideImageProviders.illustration(normalized);
  } catch {
    return slideImageProviders.stock(normalized);
  }
}
