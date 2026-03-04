/**
 * Icon Generation API Route
 *
 * On-demand icon generation for scientific and medical diagrams.
 *
 * POST /api/illustration/icons/generate
 *
 * Features:
 * - Simple icon generation with optimized vectorization
 * - Fewer colors and more filtering for clean icons
 * - Supports common icon types: scientific, medical, UI, arrows, shapes
 * - Returns both SVG and PNG preview
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { getModel, traceGeneration } from "@/lib/ai/models";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

// Import vectorization with icon-optimized options
import { pngToEditableSVG, getIconOptions } from "@/lib/illustration/ai/vectorize";
import {
  generateImage,
  isGeminiAvailable,
} from "@/lib/illustration/ai/backends/GeminiImageBackend";

// =============================================================================
// TYPES
// =============================================================================

export interface IconGenerateRequest {
  name: string;
  style?: "flat" | "outline" | "filled" | "minimal";
  category?: "scientific" | "medical" | "ui" | "arrows" | "shapes";
  color?: string;
  size?: number;
  useGemini?: boolean;
}

export interface IconGenerateResponse {
  svg: string;
  png?: string;
  metadata: {
    name: string;
    pathCount: number;
    palette: string[];
    style: string;
    category: string;
  };
}

// =============================================================================
// REQUEST SCHEMA
// =============================================================================

const iconRequestSchema = z.object({
  name: z.string().min(1).max(100),
  style: z.enum(["flat", "outline", "filled", "minimal"]).default("flat"),
  category: z.enum(["scientific", "medical", "ui", "arrows", "shapes"]).default("ui"),
  color: z.string().optional(),
  size: z.number().min(16).max(512).default(64),
  useGemini: z.boolean().default(false),
});

// =============================================================================
// ICON PROMPT TEMPLATES
// =============================================================================

const CATEGORY_PROMPTS: Record<string, string> = {
  scientific: "Create a clean, simple scientific icon for use in diagrams. Use minimal geometric shapes with clear outlines.",
  medical: "Create a medical icon using standard medical symbol conventions. Simple, recognizable shapes.",
  ui: "Create a clean UI icon with simple geometric shapes. Minimal detail, high clarity at small sizes.",
  arrows: "Create a directional arrow icon. Clean lines, clear direction indicator.",
  shapes: "Create a simple geometric shape icon. Perfect circles, squares, or triangles with clean edges.",
};

const STYLE_PROMPTS: Record<string, string> = {
  flat: "Flat design with solid colors, no gradients, no shadows. Simple geometric shapes.",
  outline: "Outline style with stroke only, no fill. Clean, consistent stroke width.",
  filled: "Filled design with solid color throughout. Simple shapes, no gradients.",
  minimal: "Minimalist design with the fewest elements needed to convey the concept. High abstraction.",
};

// =============================================================================
// SVG ICON GENERATION (LLM-based)
// =============================================================================

async function generateSVGIcon(
  name: string,
  style: string,
  category: string,
  color?: string,
  size = 64
): Promise<{ svg: string; pathCount: number; palette: string[] }> {
  const systemPrompt = `You are an expert icon designer. Generate clean, simple SVG icons optimized for use in scientific and medical diagrams.

SVG Icon Guidelines:
- Use a viewBox of "0 0 24 24" or "0 0 64 64"
- Include proper xmlns attribute
- Use simple geometric shapes (circle, rect, path)
- Keep path data clean and minimal
- ${STYLE_PROMPTS[style] || STYLE_PROMPTS.flat}
- Use consistent stroke width (usually 2px for 24x24, 4px for 64x64)
- Ensure the icon is centered and balanced

Output only the SVG code, no explanation.`;

  const categoryPrompt = CATEGORY_PROMPTS[category] || CATEGORY_PROMPTS.ui;
  const colorHint = color ? `Use the color ${color} as the primary color.` : "Use black or a dark gray (#333) as the primary color.";
  const sizeHint = `The icon will be displayed at ${size}px, so ensure it remains clear at that size.`;

  const userPrompt = `Create a ${style} ${category} icon for: ${name}

${categoryPrompt}
${colorHint}
${sizeHint}

Generate the SVG code:`;

  const { text } = await generateText({
    model: getModel(),
    system: systemPrompt,
    prompt: userPrompt.slice(0, 5000),
  });

  // Extract SVG from response
  let svg = extractSVG(text);

  if (!svg) {
    throw new Error("Failed to generate valid SVG");
  }

  // Clean and validate SVG
  svg = cleanSVG(svg);

  // Count paths and extract palette
  const pathCount = (svg.match(/<path/g) || []).length;
  const palette = extractColors(svg);

  return { svg, pathCount, palette };
}

// =============================================================================
// GEMINI ICON GENERATION (with optimized vectorization)
// =============================================================================

async function generateGeminiIcon(
  name: string,
  style: string,
  category: string,
  color?: string,
  size = 64
): Promise<{ svg: string; png: string; pathCount: number; palette: string[] }> {
  if (!isGeminiAvailable()) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  // Build icon-optimized prompt
  const styleHints = STYLE_PROMPTS[style] || STYLE_PROMPTS.flat;
  const categoryHints = CATEGORY_PROMPTS[category] || CATEGORY_PROMPTS.ui;
  const colorHint = color ? `Primary color: ${color}.` : "Use black or dark gray.";

  const prompt = `Create a simple ${size}x${size}px icon for: ${name}

${categoryHints}
${styleHints}
${colorHint}

Requirements:
- White background
- Minimal detail
- Clean edges
- No text
- Icon centered in the frame`;

  // Generate image with Gemini
  const imageResult = await generateImage(prompt, {
    style: "flat", // Icons should always be flat
    model: "flash", // Use flash for icons (faster, simpler icons)
  });

  // Vectorize with icon-optimized options
  const vectorizeResult = await pngToEditableSVG(imageResult.pngBuffer, getIconOptions());

  // Create base64 PNG
  const pngBase64 = `data:image/png;base64,${imageResult.pngBuffer.toString("base64")}`;

  return {
    svg: vectorizeResult.svg,
    png: pngBase64,
    pathCount: vectorizeResult.pathCount,
    palette: vectorizeResult.colorPalette,
  };
}

// =============================================================================
// SVG EXTRACTION AND CLEANING
// =============================================================================

function extractSVG(text: string): string | null {
  // Try to extract from code blocks
  const codeBlockMatch = text.match(/```(?:xml|svg)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    const svg = codeBlockMatch[1].trim();
    if (svg.startsWith("<svg")) return svg;
  }

  // Try to find SVG directly
  const svgMatch = text.match(/<svg[\s\S]*?<\/svg>/);
  if (svgMatch) {
    return svgMatch[0];
  }

  return null;
}

function cleanSVG(svg: string): string {
  // Add xmlns if missing
  if (!svg.includes('xmlns=')) {
    svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  // Add viewBox if missing and width/height present
  if (!svg.includes('viewBox=') && svg.includes('width=') && svg.includes('height=')) {
    const widthMatch = svg.match(/width="(\d+)"/);
    const heightMatch = svg.match(/height="(\d+)"/);
    if (widthMatch && heightMatch) {
      svg = svg.replace('<svg', `<svg viewBox="0 0 ${widthMatch[1]} ${heightMatch[1]}"`);
    }
  }

  // Ensure proper closing
  if (!svg.endsWith("</svg>")) {
    svg = svg.trim() + "</svg>";
  }

  return svg;
}

function extractColors(svg: string): string[] {
  const colors = new Set<string>();
  const fillMatches = svg.matchAll(/fill="([^"]+)"/g);
  for (const match of fillMatches) {
    const color = match[1];
    if (color && color !== "none" && !color.startsWith("url(")) {
      colors.add(color);
    }
  }
  const strokeMatches = svg.matchAll(/stroke="([^"]+)"/g);
  for (const match of strokeMatches) {
    const color = match[1];
    if (color && color !== "none" && !color.startsWith("url(")) {
      colors.add(color);
    }
  }
  return Array.from(colors).sort();
}

// =============================================================================
// MAIN POST HANDLER
// =============================================================================

export async function POST(req: Request) {
  const log = logger.withRequestId();

  try {
    // Authentication
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limiting (icons have higher allowance)
    const rateLimitResponse = await checkRateLimit(
      userId,
      "illustrations",
      RATE_LIMITS.ai
    );
    if (rateLimitResponse) return rateLimitResponse;

    // Parse request
    const parseResult = iconRequestSchema.safeParse(await req.json());
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, style, category, color, size, useGemini } = parseResult.data;

    // Trace generation
    const trace = traceGeneration({
      tier: "standard",
      modelId: useGemini ? "gemini-flash" : String(getModel()),
      feature: "icon-generate",
      userId,
    });

    let result: {
      svg: string;
      png?: string;
      pathCount: number;
      palette: string[];
    };

    try {
      if (useGemini && isGeminiAvailable()) {
        // Use Gemini for icon generation
        result = await generateGeminiIcon(name, style, category, color, size);
        log.info("Icon generated with Gemini", { name, category, pathCount: result.pathCount });
      } else {
        // Use LLM-based SVG generation
        const svgResult = await generateSVGIcon(name, style, category, color, size);
        result = { svg: svgResult.svg, pathCount: svgResult.pathCount, palette: svgResult.palette };
        log.info("Icon generated with LLM", { name, category, pathCount: result.pathCount });
      }

      trace.end();

      const response: IconGenerateResponse = {
        svg: result.svg,
        png: result.png,
        metadata: {
          name,
          pathCount: result.pathCount,
          palette: result.palette,
          style,
          category,
        },
      };

      return NextResponse.json(response);
    } catch (error) {
      trace.end();

      // Fallback to LLM if Gemini fails
      if (useGemini) {
        log.warn("Gemini icon generation failed, falling back to LLM", {
          error: error instanceof Error ? error.message : String(error),
        });
        const svgResult = await generateSVGIcon(name, style, category, color, size);
        result = { svg: svgResult.svg, pathCount: svgResult.pathCount, palette: svgResult.palette };

        const response: IconGenerateResponse = {
          svg: result.svg,
          metadata: {
            name,
            pathCount: result.pathCount,
            palette: result.palette,
            style,
            category,
          },
        };

        return NextResponse.json(response);
      }

      throw error;
    }
  } catch (error) {
    log.error("Icon generation error", error);
    return NextResponse.json(
      {
        error: "Icon generation failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
