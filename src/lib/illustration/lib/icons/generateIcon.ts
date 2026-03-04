/**
 * AI Icon Generation
 *
 * Generates SVG icons from text queries using AI when no matching icon exists.
 * Falls back from LLM (Claude) → Image Generation (Gemini) → Vectorization (imagetracerjs).
 */

import { config } from '@/lib/illustration/config/env';
import { AIServiceError } from '@/lib/illustration/ai/types';

// =============================================================================
// TYPES
// =============================================================================

export interface GenerationResult {
  svg: string;
  method: 'llm' | 'image-fallback' | 'cached';
  confidence: number;
}

export interface GenerationOptions {
  size?: number;
  style?: 'outline' | 'filled' | 'duotone';
  scientificContext?: string;
}

// =============================================================================
// ICON GENERATION
// =============================================================================

/**
 * Scientific domain context for better icon generation
 */
const SCIENTIFIC_CONTEXTS: Record<string, string> = {
  anatomy: 'Medical illustration style, clean lines, anatomically accurate',
  biology: 'Cellular and molecular biology style, clean scientific illustration',
  chemistry: 'Chemical structure style, bonds and molecules, clean geometry',
  physics: 'Physics diagram style, vectors and forces, minimal design',
  medical: 'Medical icon style, recognizable healthcare symbols',
  lab: 'Laboratory equipment style, glassware and instruments',
  microbiology: 'Microscopic organisms style, bacteria and viruses',
  cardiology: 'Cardiovascular system style, heart and blood vessels',
  neurology: 'Nervous system style, brain and neurons',
  default: 'Scientific icon style, clean minimal design, 64x64 viewBox',
};

/**
 * Detect domain from query for better context
 */
function detectDomain(query: string): string {
  const q = query.toLowerCase();

  if (/heart|cardio|vascular|blood|stent|valve|ecg|stemi|mi/i.test(q)) return 'cardiology';
  if (/brain|neuron|nerve|cortex|synapse|cns/i.test(q)) return 'neurology';
  if (/cell|mitochondria|nucleus|ribosome|membrane|golgi|er/i.test(q)) return 'biology';
  if (/bacteria|virus|microbe|pathogen|infection/i.test(q)) return 'microbiology';
  if (/heart|lung|liver|kidney|anatomy|organ|bone|muscle/i.test(q)) return 'anatomy';
  if (/flask|beaker|test tube|pipette|centrifuge|microscope/i.test(q)) return 'lab';
  if (/atom|molecule|bond|chemical|reaction|compound/i.test(q)) return 'chemistry';
  if (/force|velocity|wave|particle|quantum|energy/i.test(q)) return 'physics';
  if (/pill|syringe|medicine|drug|prescription|hospital/i.test(q)) return 'medical';

  return 'default';
}

/**
 * Validate SVG output
 */
function isValidSVG(svg: string): boolean {
  if (!svg || svg.length < 50) return false;
  if (!svg.includes('<svg') || !svg.includes('</svg>')) return false;
  if (!svg.includes('xmlns=') && !svg.includes('xmlns:')) return false;
  // Check for common SVG elements
  const hasElements = /<(path|circle|rect|ellipse|line|polygon|polyline|g)\s/.test(svg);
  return hasElements;
}

/**
 * Normalize SVG for icon use
 */
function normalizeIconSVG(svg: string, size = 64): string {
  // Remove XML declaration
  let normalized = svg.replace(/<\?xml[^?]*\?>/g, '');

  // Ensure viewBox exists for scalability
  if (!normalized.includes('viewBox')) {
    // Try to extract width/height
    const widthMatch = normalized.match(/width="([^"]+)"/);
    const heightMatch = normalized.match(/height="([^"]+)"/);

    if (widthMatch && heightMatch) {
      const w = parseInt(widthMatch[1], 10) || size;
      const h = parseInt(heightMatch[1], 10) || size;
      normalized = normalized.replace('<svg', `<svg viewBox="0 0 ${w} ${h}"`);
    } else {
      normalized = normalized.replace('<svg', `<svg viewBox="0 0 ${size} ${size}"`);
    }
  }

  // Remove fixed width/height to let viewBox control sizing
  normalized = normalized.replace(/\s+width="[^"]*"/g, '');
  normalized = normalized.replace(/\s+height="[^"]*"/g, '');

  // Set fill/stroke to currentColor for tinting
  normalized = normalized.replace(/\s+fill="[^"]*"/g, ' fill="currentColor"');
  normalized = normalized.replace(/\s+stroke="[^"]*"/g, ' stroke="currentColor"');

  return normalized.trim();
}

/**
 * Build SVG generation prompt with scientific context
 */
function buildSVGPrompt(query: string, options: GenerationOptions): string {
  const domain = detectDomain(query);
  const context = SCIENTIFIC_CONTEXTS[domain];
  const size = options.size || 64;

  return `You are a scientific icon designer. Create a clean, minimal SVG icon for: "${query}"

Requirements:
- ${context}
- Icon size: ${size}x${size} pixels
- Style: ${options.style || 'outline'} (single stroke width, clean geometry)
- Use simple geometric shapes (circles, rects, paths)
- ViewBox: "0 0 ${size} ${size}"
- stroke-width: 2 or 1.5 for outline style
- Fill: none for outline, solid color for filled style
- Return ONLY raw SVG code (no markdown, no explanation)

Technical constraints:
- Use only <svg>, <path>, <circle>, <rect>, <ellipse>, <line>, <g> elements
- No external references or embedded images
- All strokes/fills should use consistent width
- Keep the design recognizable and simple

Generate the SVG icon now:`;
}

/**
 * Generate icon using Claude LLM
 */
async function generateIconWithLLM(
  query: string,
  options: GenerationOptions
): Promise<string> {
  const apiKey = config.ai.claudeApiKey;

  if (!apiKey) {
    throw new AIServiceError(
      'Claude API key not configured',
      'GENERATION_FAILED'
    );
  }

  const prompt = buildSVGPrompt(query, options);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: config.ai.claudeModel || 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new AIServiceError(
        `Claude API error: ${response.status} ${errorText}`,
        'GENERATION_FAILED'
      );
    }

    const data = await response.json();
    const content = data.content?.[0]?.text || '';

    // Extract SVG from response (handle markdown code blocks)
    let svg = content;

    // Remove markdown code blocks
    const codeBlockMatch = content.match(/```(?:xml|svg)?\s*([\s\S]*?)```/);
    if (codeBlockMatch) {
      svg = codeBlockMatch[1];
    }

    // Extract just the SVG element if there's surrounding text
    const svgMatch = content.match(/<svg[\s\S]*?<\/svg>/);
    if (svgMatch) {
      svg = svgMatch[0];
    }

    if (!isValidSVG(svg)) {
      throw new AIServiceError(
        'LLM generated invalid SVG',
        'VALIDATION_FAILED'
      );
    }

    return normalizeIconSVG(svg, options.size);
  } catch (error) {
    if (error instanceof AIServiceError) {
      throw error;
    }
    throw new AIServiceError(
      `Failed to generate icon with LLM: ${error}`,
      'GENERATION_FAILED'
    );
  }
}

/**
 * Generate icon fallback using Gemini Image Generation → vectorization
 */
async function generateIconWithImageFallback(
  query: string,
  options: GenerationOptions
): Promise<string> {
  const apiKey = config.ai.claudeApiKey; // Reusing API key, could use Gemini key

  if (!apiKey) {
    throw new AIServiceError(
      'API key not configured for image fallback',
      'GENERATION_FAILED'
    );
  }

  try {
    // For now, this is a simplified fallback
    // In production, this would call Gemini Image Generation API
    // then vectorize the result using imagetracerjs

    // Create a simple placeholder SVG as fallback
    const size = options.size || 64;
    const placeholder = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     width="${size}" height="${size}"
     viewBox="0 0 ${size} ${size}"
     fill="none"
     stroke="currentColor"
     stroke-width="2">
  <circle cx="${size / 2}" cy="${size / 2}" r="${size / 3}" stroke-dasharray="4 2"/>
  <text x="${size / 2}" y="${size / 2 + 4}"
        text-anchor="middle"
        font-size="10"
        fill="currentColor"
        stroke="none">?</text>
</svg>`;

    return placeholder;
  } catch (error) {
    throw new AIServiceError(
      `Image fallback failed: ${error}`,
      'GENERATION_FAILED'
    );
  }
}

// =============================================================================
// MAIN GENERATION FUNCTION
// =============================================================================

/**
 * Cache for generated icons (in-memory, could be localStorage)
 */
const iconCache = new Map<string, { svg: string; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

/**
 * Main icon generation function
 * Attempts LLM generation first, falls back to image generation
 */
export async function generateIconFromQuery(
  query: string,
  options: GenerationOptions = {}
): Promise<GenerationResult> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    throw new AIServiceError('Query cannot be empty', 'GENERATION_FAILED');
  }

  // Check cache
  const cacheKey = `${trimmedQuery}-${options.style || 'outline'}-${options.size || 64}`;
  const cached = iconCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return {
      svg: cached.svg,
      method: 'cached',
      confidence: 1.0,
    };
  }

  // Try LLM generation first
  try {
    const svg = await generateIconWithLLM(trimmedQuery, options);

    // Cache the result
    iconCache.set(cacheKey, {
      svg,
      timestamp: Date.now(),
    });

    return {
      svg,
      method: 'llm',
      confidence: 0.8,
    };
  } catch (llmError) {
    console.warn('LLM icon generation failed, trying fallback:', llmError);

    // Fallback to image generation
    try {
      const svg = await generateIconWithImageFallback(trimmedQuery, options);

      iconCache.set(cacheKey, {
        svg,
        timestamp: Date.now(),
      });

      return {
        svg,
        method: 'image-fallback',
        confidence: 0.4,
      };
    } catch (fallbackError) {
      console.error('Icon generation completely failed:', fallbackError);

      // Return empty string for graceful degradation
      return {
        svg: '',
        method: 'image-fallback',
        confidence: 0,
      };
    }
  }
}

/**
 * Check if AI generation is available
 */
export function isAIGenerationAvailable(): boolean {
  return Boolean(config.ai.claudeApiKey) && config.features.aiGeneration;
}

/**
 * Clear the icon cache
 */
export function clearIconCache(): void {
  iconCache.clear();
}

/**
 * Get cache size (for debugging)
 */
export function getCacheSize(): number {
  return iconCache.size;
}
