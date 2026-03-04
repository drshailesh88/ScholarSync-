/**
 * Agent Chat API Route
 *
 * Multi-turn conversation endpoint for the illustration agent.
 * Maintains conversation context and diagram history.
 *
 * POST /api/illustration/agent/chat
 *
 * Features:
 * - Message history with conversation threading
 * - Diagram context preservation across turns
 * - Slide context integration for presentation mode
 * - Backend auto-routing (Mermaid, SVG, Gemini)
 * - Conversation ID for session tracking
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { generateText } from "ai";
import { getModel } from "@/lib/ai/models";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

// Reuse backend handlers from the generate route
import { svgBackend } from "@/lib/illustration/ai/backends/SVGBackend";
import type { GenerationRequest } from "@/lib/illustration/ai/types";
import {
  generateImage,
  isGeminiAvailable,
} from "@/lib/illustration/ai/backends/GeminiImageBackend";
import { pngToEditableSVG } from "@/lib/illustration/ai/vectorize";
import { buildSystemPrompt } from "@/lib/illustration/ai/prompts";

// ===========================================================================
// TYPES
// ===========================================================================

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  diagram?: string;
  timestamp: string;
  isError?: boolean;
}

export interface ChatRequest {
  messages: ChatMessage[];
  slideContext?: string;
  domain?: string;
  style?: "flat" | "detailed" | "schematic" | "photorealistic";
  geminiModel?: "pro" | "flash";
  conversationId?: string;
}

export interface ChatResponse {
  message: ChatMessage;
  conversationId: string;
  backend?: string;
  format?: string;
  metadata?: Record<string, unknown>;
}

// ===========================================================================
// REQUEST SCHEMA
// ===========================================================================

const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string().min(1).max(8000),
      diagram: z.string().optional(),
      timestamp: z.string(),
      isError: z.boolean().optional(),
    })
  ).min(1).max(50),
  slideContext: z.string().nullish(),
  domain: z.string().optional(),
  style: z.enum(["flat", "detailed", "schematic", "photorealistic"]).default("flat"),
  geminiModel: z.enum(["pro", "flash"]).default("flash"),
  conversationId: z.string().optional(),
});

// ===========================================================================
// DOMAIN DETECTION (shared with AgentMode)
// ===========================================================================

function detectDomainFromPrompt(prompt: string): string | undefined {
  const lower = prompt.toLowerCase();

  const domainPatterns: Record<string, RegExp> = {
    cardiology: /heart|cardiac|coronary|ecg|ekg|arrhythmia|myocardial|ventricular|atrial|cardiovascular/,
    neurology: /brain|neural|neuron|synapse|cortex|dementia|alzheimer|parkinson|stroke/,
    pulmonology: /lung|pulmonary|respiratory|breath|airway|alveol|pneumonia|copd|asthma/,
    gastroenterology: /stomach|intestine|bowel|liver|pancreas|digestive|gi |gastro|esophagus|colon/,
    endocrinology: /hormone|thyroid|diabetes|insulin|glucose|endocrine|pituitary|adrenal|metabolic/,
    nephrology: /kidney|renal|nephron|dialysis|urine|bladder|urology|ureter/,
    "hematology-oncology": /blood|leukemia|cancer|tumor|hemoglobin|anemia|clot|coagulation|lymphoma/,
    "infectious-disease": /virus|bacteria|infection|antibiotic|viral|bacterial|sepsis|pathogen|microbe/,
    orthopedics: /bone|fracture|skeletal|muscle|tendon|ligament|joint|spine|orthopedic/,
    dermatology: /skin|dermal|rash|lesion|epidermis|dermatitis/,
    ophthalmology: /eye|vision|ocular|retina|cornea|glaucoma|cataract/,
    radiology: /x-ray|ct|mri|ultrasound|imaging|radiologic/,
    physiology: /physiology|homeostasis|mechanism|feedback|regulation|physiologic/,
    biochemistry: /protein|enzyme|metabolism|amino acid|biochemical|pathway|reaction/,
    pharmacology: /drug|medication|pharmacokinetic|pharmacodynamic|dose|therapeutic/,
    "cell-biology": /cell|mitochondria|nucleus|organelle|membrane|cytoplasm|cellular/,
    "molecular-biology": /dna|rna|gene|protein|transcription|translation|mutation|genetic/,
    immunology: /immune|antibody|antigen|lymphocyte|inflammation/,
    "emergency-medicine": /emergency|trauma|critical|acute|resuscitation/,
    obgyn: /pregnancy|obstetric|gynecologic|fetal|maternal|uterus/,
    pediatrics: /pediatric|neonatal|infant|child|adolescent/,
    psychiatry: /psychiatric|mental|depression|anxiety|schizophrenia|psychological/,
    surgery: /surgery|surgical|incision|operation|procedure/,
    anesthesiology: /anesthesia|anesthetic|pain management/,
    rheumatology: /arthritis|rheumatoid|lupus|autoimmune|joint pain/,
    ent: /ear|nose|throat|sinus|tonsil|larynx|otolaryngolog/,
    physics: /physics|force|energy|wave|quantum|mechanic|optics|electric|magnetic/,
    chemistry: /chemical|molecule|bond|reaction|organic|inorganic|analytic/,
    "computer-science": /algorithm|data structure|software|programming|network|database|computing/,
    engineering: /engineering|mechanical|electrical|civil|system|control|design/,
    mathematics: /mathematical|equation|calculus|algebra|geometry|statistics|probability/,
    ecology: /ecosystem|environment|climate|habitat|species|population|ecological/,
    zoology: /animal|zoology|insect|entomology|vet|veterinary/,
    botany: /plant|botany|flora|photosynthesis|leaf|root|flower/,
    astronomy: /star|planet|galaxy|solar|astronom|cosmic|space|universe/,
    geology: /geolog|rock|mineral|earth|crust|volcan|earthquake|seismic/,
    meteorology: /weather|climate|meteorolog|atmospheric|forecast|temperature|humidity/,
    oceanography: /ocean|marine|sea|water|oceanograph|nautical|aquatic/,
    agriculture: /agricultur|farm|crop|soil|harvest|livestock|agronom/,
    forensics: /forensic|evidence|crime|legal|autopsy|pathology legal/,
    aerospace: /aerospace|aircraft|rocket|satellite|aviation|flight/,
    "biomedical-engineering": /biomedical|bioengineering|medical device|prosthet|implant|biomaterial/,
  };

  for (const [domain, pattern] of Object.entries(domainPatterns)) {
    if (pattern.test(lower)) {
      return domain;
    }
  }

  return undefined;
}

// ===========================================================================
// BACKEND AUTO-ROUTING (shared with generate route)
// ===========================================================================

type Backend = "mermaid" | "svg" | "gemini";

function detectBestBackend(prompt: string, domain?: string): Backend {
  const lower = prompt.toLowerCase();

  // Mermaid: flowcharts, process diagrams, decision trees
  const mermaidKeywords = [
    "flowchart",
    "flow chart",
    "flow diagram",
    "decision tree",
    "consort",
    "prisma",
    "strobe",
    "pathway",
    "algorithm",
    "sequence diagram",
    "state diagram",
    "gantt",
    "timeline",
    "process",
    "workflow",
    "protocol",
    "steps",
    "sequence",
    "state machine",
    "er diagram",
    "class diagram",
    "entity relationship",
  ];
  if (mermaidKeywords.some((k) => lower.includes(k))) return "mermaid";

  // Gemini: complex biological/anatomical illustrations
  const geminiKeywords = [
    "illustration",
    "illustrate",
    "detailed",
    "anatomy",
    "anatomical",
    "cross-section",
    "cross section",
    "microscopy",
    "photorealistic",
    "realistic",
    "organelle",
    "tissue",
    "organ",
    "structure",
    "cell membrane",
    "mitochondria",
    "neuron",
    "synapse",
    "sarcomere",
    "muscle",
    "blood vessel",
    "artery",
    "vein",
    "protein structure",
    "molecular structure",
    "crystal structure",
    "microscopic",
    "histology",
    "embryology",
    "radiology",
    "mri",
    "ct scan",
    "x-ray",
    "ultrasound",
    "endoscopy",
  ];
  if (geminiKeywords.some((k) => lower.includes(k))) return "gemini";

  // Default: SVG backend (LLM generates SVG code)
  return "svg";
}

// ===========================================================================
// BACKEND HANDLERS (copied from generate route for direct use)
// ===========================================================================

async function generateWithMermaid(
  prompt: string,
  domain?: string,
  slideContext?: string | null
): Promise<{ content: string; backend: string; format: string }> {
  const systemPrompt = buildSystemPrompt("mermaid", domain);

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

async function generateWithSVG(
  prompt: string,
  domain?: string,
  existingDiagram?: string
): Promise<{ content: string; backend: string; format: string }> {
  const request: GenerationRequest = {
    prompt,
    metadata: {
      domain,
      style: { colorScheme: "scientific" },
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
  if (!isGeminiAvailable()) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  const imageResult = await generateImage(prompt, options);

  const vectorizeResult = await pngToEditableSVG(imageResult.pngBuffer, {
    colorCount: options.style === "flat" ? 16 : options.style === "detailed" ? 32 : 16,
    minColorRatio: 0.02,
    filterSpeckle: 4,
    simplify: true,
  });

  const pngBase64 = `data:image/png;base64,${imageResult.pngBuffer.toString("base64")}`;

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

// ===========================================================================
// CONVERSATION CONTEXT BUILDING
// ===========================================================================

interface ConversationContext {
  recentUserPrompts: string[];
  existingDiagrams: string[];
  hasPreviousErrors: boolean;
}

function buildConversationContext(messages: ChatMessage[]): ConversationContext {
  const context: ConversationContext = {
    recentUserPrompts: [],
    existingDiagrams: [],
    hasPreviousErrors: false,
  };

  // Extract recent user prompts (last 3)
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg.role === "user" && context.recentUserPrompts.length < 3) {
      context.recentUserPrompts.unshift(msg.content);
    }
  }

  // Extract existing diagrams from assistant messages
  for (const msg of messages) {
    if (msg.role === "assistant" && msg.diagram) {
      context.existingDiagrams.push(msg.diagram);
    }
    if (msg.isError) {
      context.hasPreviousErrors = true;
    }
  }

  return context;
}

// ===========================================================================
// MAIN POST HANDLER
// ===========================================================================

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
    const parseResult = chatRequestSchema.safeParse(await req.json());
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { messages, slideContext, domain, style, geminiModel, conversationId } = parseResult.data;

    // Get the last user message
    const lastUserMessage = messages.filter((m) => m.role === "user").pop();
    if (!lastUserMessage) {
      return NextResponse.json({ error: "No user message found" }, { status: 400 });
    }

    // Build conversation context
    const convContext = buildConversationContext(messages);

    // Detect or use provided domain
    const detectedDomain = domain || detectDomainFromPrompt(lastUserMessage.content);

    // Determine backend
    const selectedBackend = detectBestBackend(lastUserMessage.content, detectedDomain);

    // Generate conversation ID if not provided
    const newConversationId = conversationId || `chat_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    // Trace generation
    log.info("Agent chat request", {
      userId,
      conversationId: newConversationId,
      messageCount: messages.length,
      backend: selectedBackend,
    });

    let result;
    let responseText = "";

    try {
      // Generate illustration with context awareness
      if (selectedBackend === "mermaid") {
        result = await generateWithMermaid(lastUserMessage.content, detectedDomain, slideContext);
        responseText = `I've created a Mermaid flowchart for your diagram. You can edit the structure in the Editor mode.`;
      } else if (selectedBackend === "gemini") {
        result = await generateWithGemini(lastUserMessage.content, { domain: detectedDomain, style, model: geminiModel });
        responseText = `I've generated a detailed illustration using our AI image generator. The image has been vectorized for easy editing.`;
      } else {
        // Use existing diagram if available for modification
        const existingDiagram = convContext.existingDiagrams.length > 0
          ? convContext.existingDiagrams[convContext.existingDiagrams.length - 1]
          : undefined;
        result = await generateWithSVG(lastUserMessage.content, detectedDomain, existingDiagram);
        responseText = `I've created an SVG diagram based on your description. You can further customize it in the Editor mode.`;
      }

      // Add context-aware response
      if (convContext.recentUserPrompts.length > 1) {
        responseText += " Building on our previous conversation, I've incorporated the context from your earlier requests.";
      }

      // Create response message
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: responseText,
        diagram: result.content,
        timestamp: new Date().toISOString(),
      };

      return NextResponse.json({
        message: assistantMessage,
        conversationId: newConversationId,
        backend: result.backend,
        format: result.format,
        metadata: {
          domain: detectedDomain,
          style,
          hasContext: convContext.existingDiagrams.length > 0,
        },
      } as ChatResponse);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);

      // Fallback logic
      if (selectedBackend === "gemini" && errorMessage.includes("GEMINI_API_KEY")) {
        log.warn("Gemini not available, falling back to SVG backend");
        result = await generateWithSVG(lastUserMessage.content, detectedDomain);
        responseText = "I've created an SVG diagram (image generation unavailable).";
      } else if (selectedBackend === "svg") {
        log.warn("SVG backend failed, falling back to Mermaid");
        result = await generateWithMermaid(lastUserMessage.content, detectedDomain, slideContext);
        responseText = "I've created a Mermaid diagram (SVG generation had issues).";
      } else {
        throw error;
      }

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: responseText + ` (Fallback: ${result.backend} backend)`,
        diagram: result.content,
        timestamp: new Date().toISOString(),
      };

      return NextResponse.json({
        message: assistantMessage,
        conversationId: newConversationId,
        backend: result.backend,
        format: result.format,
        metadata: {
          fallback: true,
          originalBackend: selectedBackend,
        },
      } as ChatResponse);
    }
  } catch (error) {
    log.error("Agent chat error", error);
    return NextResponse.json(
      {
        error: "Agent chat failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
