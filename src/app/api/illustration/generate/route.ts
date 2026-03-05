import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { getModel, traceGeneration } from "@/lib/ai/models";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

// Import backends
import { svgBackend } from "@/lib/illustration/ai/backends/SVGBackend";
import type { GenerationRequest } from "@/lib/illustration/ai/types";

// Import new Gemini backend and vectorization
import { generateImage, isGeminiAvailable } from "@/lib/illustration/ai/backends/GeminiImageBackend";
import { pngToEditableSVG } from "@/lib/illustration/ai/vectorize";

// Import prompts
import { buildSystemPrompt, DOMAIN_PROMPTS } from "@/lib/illustration/ai/prompts";

// Import utilities
import { detectBestBackend as utilDetectBestBackend, type Backend } from "@/lib/illustration/ai/utils";

// Re-export for backward compatibility
const detectBestBackend = utilDetectBestBackend;

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

interface MermaidResult {
  content: string;
  backend: string;
  format: string;
}

interface SVGResult {
  content: string;
  backend: string;
  format: string;
}

interface GeminiResult extends SVGResult {
  rasterPreview?: string;
  pathCount?: number;
  colorPalette?: string[];
  vectorized?: true;
}

type GenerationResult = MermaidResult | SVGResult | GeminiResult;

// Type guard for Gemini result
function isGeminiResult(result: GenerationResult): result is GeminiResult {
  return 'rasterPreview' in result || 'pathCount' in result;
}

// ---------------------------------------------------------------------------
// POST /api/illustration/generate
// Multi-backend diagram generation with auto-routing
// ---------------------------------------------------------------------------

const requestSchema = z.object({
  prompt: z.string().min(1).max(4000),
  backend: z.enum(["mermaid", "svg", "gemini", "auto"]).default("auto"),
  domain: z.string().optional(),
  style: z.enum(["flat", "detailed", "schematic", "photorealistic"]).default("flat"),
  geminiModel: z.enum(["pro", "flash"]).default("flash"),
  slideContext: z.string().nullish(),
  existingDiagram: z.string().optional(),
});

// ---------------------------------------------------------------------------
// MERMAID BACKEND HANDLER
// ---------------------------------------------------------------------------

async function generateWithMermaid(
  prompt: string,
  domain?: string,
  slideContext?: string | null
): Promise<{ content: string; backend: string; format: string }> {
  const systemPrompt = buildSystemPrompt('mermaid', domain);

  let userPrompt = `Create a scientific illustration for: ${prompt}`;
  if (slideContext) {
    userPrompt += `\n\nSlide context:\n${slideContext}`;
  }

  const { text } = await generateText({
    model: getModel(),
    system: systemPrompt,
    prompt: userPrompt.slice(0, 15000),
  });

  // Clean and extract Mermaid syntax
  let mermaidSyntax = text
    .replace(/```mermaid\n?/g, "")
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .trim();

  // Extract just the syntax if it's wrapped in JSON
  const syntaxMatch = mermaidSyntax.match(/"syntax"\s*:\s*"([^"]+)"/);
  if (syntaxMatch) {
    mermaidSyntax = syntaxMatch[1].replace(/\\n/g, "\n");
  }

  return { content: mermaidSyntax, backend: "mermaid", format: "mermaid" };
}

// ---------------------------------------------------------------------------
// SVG BACKEND HANDLER
// ---------------------------------------------------------------------------

async function generateWithSVG(
  prompt: string,
  domain?: string,
  existingDiagram?: string
): Promise<{ content: string; backend: string; format: string }> {
  const request: GenerationRequest = {
    prompt,
    metadata: {
      domain,
      style: { colorScheme: 'scientific' },
    },
    existingDiagram,
  };

  const result = await svgBackend.generate(request);

  return {
    content: result.svg,
    backend: result.backend,
    format: "svg",
  };
}

// ---------------------------------------------------------------------------
// GEMINI BACKEND HANDLER WITH VECTORIZATION
// ---------------------------------------------------------------------------

async function generateWithGemini(
  prompt: string,
  options: {
    domain?: string;
    style?: "flat" | "detailed" | "schematic" | "photorealistic";
    model?: "pro" | "flash";
  } = {}
): Promise<{
  content: string;
  backend: string;
  format: string;
  rasterPreview?: string;
  pathCount?: number;
  colorPalette?: string[];
  vectorized?: true;
}> {
  // Check if Gemini is available
  if (!isGeminiAvailable()) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  // Generate image with Gemini
  const imageResult = await generateImage(prompt, options);

  // Vectorize to SVG
  const vectorizeResult = await pngToEditableSVG(imageResult.pngBuffer, {
    colorCount: options.style === 'flat' ? 16 : options.style === 'detailed' ? 32 : 16,
    minColorRatio: 0.02,
    filterSpeckle: 4,
    simplify: true,
  });

  // Also generate base64 PNG for preview
  const pngBase64 = `data:image/png;base64,${imageResult.pngBuffer.toString('base64')}`;

  return {
    content: vectorizeResult.svg,
    backend: "gemini",
    format: "svg",
    rasterPreview: pngBase64,
    pathCount: vectorizeResult.pathCount,
    colorPalette: vectorizeResult.colorPalette,
    vectorized: true,
  };
}

// ---------------------------------------------------------------------------
// MAIN POST HANDLER
// ---------------------------------------------------------------------------

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

    // Rate limiting
    const rateLimitResponse = await checkRateLimit(userId, "illustrations", RATE_LIMITS.ai);
    if (rateLimitResponse) return rateLimitResponse;

    // Parse request
    const parseResult = requestSchema.safeParse(await req.json());
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { prompt, backend, domain, style, geminiModel, slideContext, existingDiagram } = parseResult.data;

    // Determine which backend to use
    let selectedBackend: Backend;
    if (backend === "auto") {
      selectedBackend = detectBestBackend(prompt, domain);
      log.info(`Auto-selected backend: ${selectedBackend}`, { prompt: prompt.slice(0, 50) });
    } else {
      selectedBackend = backend;
    }

    // Trace generation
    const trace = traceGeneration({
      tier: "standard",
      modelId: selectedBackend === "gemini" ? `gemini-${geminiModel}` : String(getModel()),
      feature: "illustration-generate",
      userId,
    });

    let result;

    // Route to appropriate backend with fallback logic
    try {
      if (selectedBackend === "mermaid") {
        result = await generateWithMermaid(prompt, domain, slideContext);
      } else if (selectedBackend === "gemini") {
        result = await generateWithGemini(prompt, { domain, style, model: geminiModel });
      } else {
        result = await generateWithSVG(prompt, domain, existingDiagram);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);

      // Fallback logic
      if (selectedBackend === "gemini" && errorMessage.includes("GEMINI_API_KEY")) {
        log.warn("Gemini not available, falling back to SVG backend");
        result = await generateWithSVG(prompt, domain, existingDiagram);
      } else if (selectedBackend === "svg") {
        log.warn("SVG backend failed, falling back to Mermaid");
        result = await generateWithMermaid(prompt, domain, slideContext);
      } else {
        throw error;
      }
    }

    trace.end();

    // Build response
    const response: Record<string, unknown> = {
      illustration: {
        content: result.content,
        backend: result.backend,
        format: result.format,
        caption: prompt.slice(0, 100),
        domain: domain || "general",
      },
    };

    // Add Gemini-specific metadata
    if (isGeminiResult(result)) {
      if (result.pathCount !== undefined) {
        (response.illustration as Record<string, unknown>).pathCount = result.pathCount;
      }
      if (result.colorPalette !== undefined) {
        (response.illustration as Record<string, unknown>).colorPalette = result.colorPalette;
      }
      if (result.rasterPreview !== undefined) {
        (response.illustration as Record<string, unknown>).rasterPreview = result.rasterPreview;
      }
      if (result.vectorized !== undefined) {
        (response.illustration as Record<string, unknown>).vectorized = result.vectorized;
      }
    }

    return NextResponse.json(response);

  } catch (error) {
    log.error("Illustration generation error", error);
    return NextResponse.json(
      {
        error: "Illustration generation failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
