import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { getModel } from "@/lib/ai/models";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { db } from "@/lib/db";
import { paperExtractions } from "@/lib/db/schema";

const picoSchema = z.object({
  population: z.string().describe("Study population/participants"),
  intervention: z.string().describe("Intervention or exposure studied"),
  comparison: z.string().describe("Comparator or control group"),
  outcome: z.string().describe("Primary outcome measured"),
  studyDesign: z
    .string()
    .describe("Type of study (RCT, cohort, case-control, etc.)"),
  sampleSize: z
    .number()
    .optional()
    .describe("Number of participants if mentioned"),
  duration: z.string().optional().describe("Study duration if mentioned"),
  keyFindings: z.string().describe("Main findings in one sentence"),
  limitations: z
    .string()
    .optional()
    .describe("Key limitations mentioned"),
  confidence: z
    .enum(["high", "medium", "low"])
    .describe("Confidence in extraction accuracy"),
});

function confidenceToNumber(confidence: "high" | "medium" | "low"): number {
  switch (confidence) {
    case "high":
      return 0.9;
    case "medium":
      return 0.7;
    case "low":
      return 0.4;
  }
}

const extractPicoRequestSchema = z.object({
  paperId: z.number().int().positive().optional(),
  abstract: z.string().min(10, "Abstract must be at least 10 characters").max(10000, "Abstract must not exceed 10000 characters"),
  title: z.string().min(1, "Title is required").max(500, "Title must not exceed 500 characters"),
});

export async function POST(req: Request) {
  try {
    await getCurrentUserId();

    const body = await req.json();
    const parsed = extractPicoRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { paperId, abstract, title } = parsed.data;

    const { object: picoResult } = await generateObject({
      model: getModel(),
      schema: picoSchema,
      system:
        "You are an expert at extracting PICO elements from medical research abstracts. Extract the Population, Intervention, Comparison, and Outcome from the given paper. Be precise and concise.",
      prompt: `Title: ${title}\n\nAbstract: ${abstract}`,
    });

    if (paperId) {
      await db.insert(paperExtractions).values({
        paper_id: paperId,
        population: picoResult.population,
        intervention: picoResult.intervention,
        comparison: picoResult.comparison,
        outcome: picoResult.outcome,
        sample_size: picoResult.sampleSize,
        study_design: picoResult.studyDesign,
        evidence_level: picoResult.studyDesign,
        extraction_model: "claude-sonnet",
        confidence_score: confidenceToNumber(picoResult.confidence),
        custom_extractions: {
          keyFindings: picoResult.keyFindings,
          limitations: picoResult.limitations,
          duration: picoResult.duration,
        },
      });
    }

    return NextResponse.json(picoResult);
  } catch (error) {
    console.error("PICO extraction error:", error);
    return NextResponse.json(
      { error: "PICO extraction failed" },
      { status: 500 }
    );
  }
}
