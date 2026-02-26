import { getCurrentUserId } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { z } from "zod";
import type { IntegrityCheckResult } from "@/lib/integrity/types";

// ── Request validation ─────────────────────────────────────────

const requestSchema = z.object({
  result: z.object({
    tier: z.enum(["free", "paid"]),
    aiDetection: z.object({
      humanScore: z.number(),
      aiScore: z.number(),
      overallRisk: z.enum(["low", "medium", "high"]),
      paragraphs: z.array(z.any()),
      engine: z.string(),
      stats: z.object({
        avgSentenceLength: z.number(),
        sentenceLengthStdDev: z.number(),
        typeTokenRatio: z.number(),
        passiveVoicePercent: z.number(),
        readabilityGrade: z.number(),
        hedgingPhraseCount: z.number(),
      }),
    }),
    plagiarism: z.any().nullable(),
    citationAudit: z.any().nullable(),
    writingQuality: z.object({
      passiveVoiceCount: z.number(),
      averageSentenceLength: z.number(),
      readabilityGrade: z.number(),
      suggestions: z.array(z.string()),
    }),
    checkedAt: z.string(),
  }),
  text: z.string().min(1, "Text is required"),
  documentTitle: z.string().optional(),
});

// ── Helpers ────────────────────────────────────────────────────

function riskBadge(risk: string): string {
  switch (risk) {
    case "low":
      return "Low";
    case "medium":
      return "Medium";
    case "high":
      return "High";
    default:
      return risk;
  }
}

function severityLabel(severity: string): string {
  switch (severity) {
    case "error":
      return "ERROR";
    case "warning":
      return "WARNING";
    case "info":
      return "INFO";
    default:
      return severity.toUpperCase();
  }
}

// ── Report generator ───────────────────────────────────────────

function generateReport(
  result: IntegrityCheckResult,
  documentTitle: string,
  text: string,
): string {
  const date = new Date(result.checkedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const wordCount = text.split(/\s+/).filter(Boolean).length;

  const lines: string[] = [];

  // ── Header ─────────────────────────────────────────────────
  lines.push(`# Integrity Report: ${documentTitle}`);
  lines.push("");
  lines.push(`**Date:** ${date}`);
  lines.push(`**Word Count:** ${wordCount.toLocaleString()}`);
  lines.push(`**Tier:** ${result.tier === "paid" ? "Premium" : "Free"}`);
  lines.push("");
  lines.push("## Overall Scores");
  lines.push("");
  lines.push(`| Metric | Score |`);
  lines.push(`| --- | --- |`);
  lines.push(
    `| Human-Written Score | ${result.aiDetection.humanScore}% |`,
  );
  lines.push(
    `| AI Risk Level | ${riskBadge(result.aiDetection.overallRisk)} |`,
  );
  if (result.plagiarism) {
    lines.push(
      `| Plagiarism Similarity | ${result.plagiarism.similarityScore}% |`,
    );
  }
  if (result.citationAudit) {
    lines.push(
      `| Citations Verified | ${result.citationAudit.verifiedCitations}/${result.citationAudit.totalCitations} |`,
    );
  }
  lines.push(
    `| Readability Grade | ${result.writingQuality.readabilityGrade} |`,
  );
  lines.push("");

  // ── AI Detection ───────────────────────────────────────────
  lines.push("---");
  lines.push("");
  lines.push("## AI Detection");
  lines.push("");
  lines.push(
    `**Human-Written Score:** ${result.aiDetection.humanScore}% &nbsp;|&nbsp; **AI Score:** ${result.aiDetection.aiScore}% &nbsp;|&nbsp; **Risk:** ${riskBadge(result.aiDetection.overallRisk)}`,
  );
  lines.push(`**Engine:** ${result.aiDetection.engine}`);
  lines.push("");

  if (result.aiDetection.paragraphs.length > 0) {
    lines.push("### Per-Paragraph Breakdown");
    lines.push("");
    lines.push(
      "| # | Excerpt | Human Prob. | Flags | Suggestion |",
    );
    lines.push("| --- | --- | --- | --- | --- |");

    for (const p of result.aiDetection.paragraphs) {
      const excerpt = p.excerpt.replace(/\|/g, "\\|").replace(/\n/g, " ");
      const flags =
        p.flags.length > 0
          ? p.flags.map((f) => f.replace(/\|/g, "\\|")).join("; ")
          : "None";
      const suggestion = p.suggestion
        ? p.suggestion.replace(/\|/g, "\\|").replace(/\n/g, " ")
        : "-";
      lines.push(
        `| ${p.paragraphIndex + 1} | ${excerpt} | ${p.humanProbability}% | ${flags} | ${suggestion} |`,
      );
    }
    lines.push("");
  }

  // ── Plagiarism ─────────────────────────────────────────────
  if (result.plagiarism) {
    lines.push("---");
    lines.push("");
    lines.push("## Plagiarism Detection");
    lines.push("");
    lines.push(
      `**Similarity Score:** ${result.plagiarism.similarityScore}% &nbsp;|&nbsp; **Sources Scanned:** ${result.plagiarism.sourcesScanned}`,
    );
    lines.push("");

    if (result.plagiarism.matches.length > 0) {
      lines.push("### Matched Sources");
      lines.push("");
      lines.push(
        "| Excerpt | Source | Year | Similarity | Severity | DOI |",
      );
      lines.push("| --- | --- | --- | --- | --- | --- |");

      for (const m of result.plagiarism.matches) {
        const excerpt = m.excerpt.replace(/\|/g, "\\|").replace(/\n/g, " ");
        const title = m.source.title.replace(/\|/g, "\\|");
        const year = m.source.year ?? "-";
        const similarity = `${Math.round(m.similarity * 100)}%`;
        const severity = m.severity.toUpperCase();
        const doi = m.source.doi
          ? `[${m.source.doi}](https://doi.org/${m.source.doi})`
          : "-";
        lines.push(
          `| ${excerpt} | ${title} | ${year} | ${similarity} | ${severity} | ${doi} |`,
        );
      }
      lines.push("");
    } else {
      lines.push("No plagiarism matches found.");
      lines.push("");
    }
  }

  // ── Citation Audit ─────────────────────────────────────────
  if (result.citationAudit) {
    lines.push("---");
    lines.push("");
    lines.push("## Citation Audit");
    lines.push("");
    lines.push(
      `**Verified:** ${result.citationAudit.verifiedCitations}/${result.citationAudit.totalCitations} citations`,
    );
    lines.push("");

    if (result.citationAudit.issues.length > 0) {
      lines.push("### Issues");
      lines.push("");

      for (const issue of result.citationAudit.issues) {
        const ref = issue.reference ? ` (ref: ${issue.reference})` : "";
        lines.push(
          `- **[${severityLabel(issue.severity)}]** ${issue.message}${ref}`,
        );
      }
      lines.push("");
    } else {
      lines.push("No citation issues found.");
      lines.push("");
    }
  }

  // ── Writing Quality ────────────────────────────────────────
  lines.push("---");
  lines.push("");
  lines.push("## Writing Quality");
  lines.push("");
  lines.push(
    `| Metric | Value |`,
  );
  lines.push(`| --- | --- |`);
  lines.push(
    `| Readability Grade | ${result.writingQuality.readabilityGrade} |`,
  );
  lines.push(
    `| Passive Voice Count | ${result.writingQuality.passiveVoiceCount} |`,
  );
  lines.push(
    `| Average Sentence Length | ${result.writingQuality.averageSentenceLength} words |`,
  );
  lines.push("");

  if (result.writingQuality.suggestions.length > 0) {
    lines.push("### Suggestions");
    lines.push("");
    for (const s of result.writingQuality.suggestions) {
      lines.push(`- ${s}`);
    }
    lines.push("");
  }

  // ── Footer ─────────────────────────────────────────────────
  lines.push("---");
  lines.push("");
  lines.push(
    `*Generated by ScholarSync Integrity Check on ${date}.*`,
  );
  lines.push("");

  return lines.join("\n");
}

// ── POST handler ───────────────────────────────────────────────

export async function POST(req: Request) {
  const log = logger.withRequestId();

  try {
    // Authentication
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return new Response(
        JSON.stringify({ error: "Not authenticated" }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      );
    }

    // Parse and validate request body
    const body = await req.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          error: "Invalid request",
          details: parsed.error.flatten().fieldErrors,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const { result, text, documentTitle } = parsed.data;
    const title = documentTitle || "Untitled";

    log.info("Generating integrity report", { userId, title });

    // Generate the Markdown report
    const markdown = generateReport(
      result as IntegrityCheckResult,
      title,
      text,
    );

    // Format filename date as YYYY-MM-DD
    const fileDate = new Date(result.checkedAt)
      .toISOString()
      .split("T")[0];

    return new Response(markdown, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown",
        "Content-Disposition": `attachment; filename="integrity-report-${fileDate}.md"`,
      },
    });
  } catch (error) {
    log.error("Failed to generate integrity report", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate report" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
