// ---------------------------------------------------------------------------
// PDF Report Generation using @react-pdf/renderer
// Renders integrity check results as a professional PDF document.
// ---------------------------------------------------------------------------

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { BRAND } from "@/lib/config/branding";
import type { IntegrityCheckResult } from "./types";

const colors = {
  brand: "#4F46E5",
  green: "#22C55E",
  amber: "#EAB308",
  orange: "#F97316",
  red: "#EF4444",
  gray: "#6B7280",
  lightGray: "#F3F4F6",
  darkGray: "#374151",
  white: "#FFFFFF",
  black: "#111827",
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: colors.black,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingBottom: 12,
    borderBottom: `2px solid ${colors.brand}`,
  },
  brandName: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: colors.brand,
  },
  brandTagline: {
    fontSize: 8,
    color: colors.gray,
  },
  dateText: {
    fontSize: 9,
    color: colors.gray,
    textAlign: "right",
  },
  title: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    marginBottom: 16,
    color: colors.black,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    marginTop: 20,
    marginBottom: 10,
    color: colors.brand,
    paddingBottom: 4,
    borderBottom: `1px solid ${colors.lightGray}`,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  scoreCard: {
    width: "30%",
    padding: 10,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    alignItems: "center",
  },
  scoreValue: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
  },
  scoreLabel: {
    fontSize: 8,
    color: colors.gray,
    marginTop: 2,
  },
  paragraph: {
    marginBottom: 6,
    padding: 6,
    borderRadius: 3,
  },
  paragraphHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  paragraphLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
  },
  paragraphText: {
    fontSize: 9,
    color: colors.darkGray,
    lineHeight: 1.4,
  },
  flagText: {
    fontSize: 8,
    color: colors.orange,
    marginTop: 2,
  },
  matchCard: {
    padding: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 3,
    marginBottom: 6,
  },
  matchTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: colors.darkGray,
  },
  matchExcerpt: {
    fontSize: 8,
    color: colors.gray,
    fontStyle: "italic",
    marginTop: 3,
  },
  citationEntry: {
    padding: 6,
    marginBottom: 4,
    borderLeft: `2px solid ${colors.brand}`,
    paddingLeft: 8,
  },
  citationVerified: {
    borderLeftColor: colors.green,
  },
  citationRetracted: {
    borderLeftColor: colors.red,
    backgroundColor: "#FEF2F2",
  },
  citationPredatory: {
    borderLeftColor: colors.amber,
    backgroundColor: "#FFFBEB",
  },
  alertBox: {
    padding: 8,
    backgroundColor: "#FEF2F2",
    borderRadius: 3,
    borderLeft: `3px solid ${colors.red}`,
    marginBottom: 6,
  },
  warningBox: {
    padding: 8,
    backgroundColor: "#FFFBEB",
    borderRadius: 3,
    borderLeft: `3px solid ${colors.amber}`,
    marginBottom: 6,
  },
  qualityGrid: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  qualityCard: {
    flex: 1,
    padding: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 3,
    alignItems: "center",
  },
  qualityValue: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: colors.brand,
  },
  qualityLabel: {
    fontSize: 7,
    color: colors.gray,
    marginTop: 2,
  },
  suggestion: {
    fontSize: 9,
    color: colors.darkGray,
    marginBottom: 4,
    paddingLeft: 8,
    borderLeft: `2px solid ${colors.brand}`,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: `1px solid ${colors.lightGray}`,
    paddingTop: 8,
  },
  footerText: {
    fontSize: 7,
    color: colors.gray,
  },
  riskBadge: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    padding: "2 6",
    borderRadius: 3,
    color: colors.white,
  },
});

function getRiskColor(risk: string): string {
  switch (risk) {
    case "high":
      return colors.red;
    case "medium":
      return colors.amber;
    default:
      return colors.green;
  }
}

function getSeverityColor(severity: string): string {
  switch (severity) {
    case "high":
      return colors.red;
    case "medium":
      return colors.orange;
    default:
      return colors.gray;
  }
}

interface IntegrityReportProps {
  result: IntegrityCheckResult;
}

export function IntegrityReportDocument({ result }: IntegrityReportProps) {
  const now = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandName}>{BRAND.name}</Text>
            <Text style={styles.brandTagline}>{BRAND.tagline}</Text>
          </View>
          <View>
            <Text style={styles.dateText}>Integrity Report</Text>
            <Text style={styles.dateText}>{now}</Text>
          </View>
        </View>

        <Text style={styles.title}>Academic Integrity Report</Text>

        {/* Overall Scores */}
        <View style={styles.scoreRow}>
          <View style={styles.scoreCard}>
            <Text
              style={{
                ...styles.scoreValue,
                color: getRiskColor(result.aiDetection.overallRisk),
              }}
            >
              {result.aiDetection.aiScore}%
            </Text>
            <Text style={styles.scoreLabel}>AI Content</Text>
          </View>
          <View style={styles.scoreCard}>
            <Text
              style={{
                ...styles.scoreValue,
                color:
                  (result.plagiarism?.similarityScore ?? 0) > 30
                    ? colors.red
                    : (result.plagiarism?.similarityScore ?? 0) > 10
                      ? colors.amber
                      : colors.green,
              }}
            >
              {result.plagiarism?.similarityScore ?? 0}%
            </Text>
            <Text style={styles.scoreLabel}>Plagiarism Score</Text>
          </View>
          <View style={styles.scoreCard}>
            <Text
              style={{
                ...styles.scoreValue,
                color:
                  (result.citationAudit?.totalCitations ?? 0) > 0
                    ? colors.brand
                    : colors.gray,
              }}
            >
              {result.citationAudit?.verifiedCitations ?? 0}/
              {result.citationAudit?.totalCitations ?? 0}
            </Text>
            <Text style={styles.scoreLabel}>Citations Verified</Text>
          </View>
        </View>

        {/* AI Detection */}
        <Text style={styles.sectionTitle}>AI Content Detection</Text>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
          <Text style={{ fontSize: 9 }}>
            Overall Risk:{" "}
          </Text>
          <Text
            style={{
              ...styles.riskBadge,
              backgroundColor: getRiskColor(result.aiDetection.overallRisk),
            }}
          >
            {result.aiDetection.overallRisk.toUpperCase()}
          </Text>
          <Text style={{ fontSize: 9, marginLeft: 10 }}>
            Human: {result.aiDetection.humanScore}% | AI:{" "}
            {result.aiDetection.aiScore}%
          </Text>
        </View>

        {result.aiDetection.paragraphs.map((p) => {
          const aiProbability = 100 - p.humanProbability;
          return (
            <View
              key={p.paragraphIndex}
              style={{
                ...styles.paragraph,
                backgroundColor:
                  aiProbability > 60
                    ? "#FEF3C7"
                    : aiProbability > 30
                      ? "#FEF9C3"
                      : "#ECFDF5",
              }}
            >
              <View style={styles.paragraphHeader}>
                <Text style={styles.paragraphLabel}>
                  Paragraph {p.paragraphIndex + 1}
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    fontFamily: "Helvetica-Bold",
                    color:
                      p.humanProbability < 40
                        ? colors.orange
                        : p.humanProbability < 70
                          ? colors.amber
                          : colors.green,
                  }}
                >
                  {p.humanProbability}% human
                </Text>
              </View>
              <Text style={styles.paragraphText}>
                {p.excerpt.slice(0, 300)}
                {p.excerpt.length > 300 ? "..." : ""}
              </Text>
              {p.flags.length > 0 && (
                <Text style={styles.flagText}>
                  Flags: {p.flags.join(", ")}
                </Text>
              )}
            </View>
          );
        })}

        {/* Plagiarism */}
        {(result.plagiarism?.matches.length ?? 0) > 0 && (
          <>
            <Text style={styles.sectionTitle}>Plagiarism Matches</Text>
            {result.plagiarism!.matches.map((m, i) => (
              <View key={i} style={styles.matchCard}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.matchTitle}>{m.source.title}</Text>
                  <Text
                    style={{
                      fontSize: 8,
                      fontFamily: "Helvetica-Bold",
                      color: getSeverityColor(m.severity),
                    }}
                  >
                    {Math.round(m.similarity * 100)}% match
                  </Text>
                </View>
                {m.source.doi && (
                  <Text style={{ fontSize: 8, color: colors.gray }}>
                    DOI: {m.source.doi}
                  </Text>
                )}
                <Text style={styles.matchExcerpt}>
                  &ldquo;{m.excerpt.slice(0, 200)}&rdquo;
                </Text>
              </View>
            ))}
          </>
        )}
      </Page>

      {/* Page 2: Citation Audit, Self-Plagiarism, Writing Quality */}
      <Page size="A4" style={styles.page}>
        {/* Citation Audit */}
        <Text style={styles.sectionTitle}>Citation Audit</Text>
        <Text style={{ fontSize: 9, marginBottom: 8 }}>
          {result.citationAudit?.totalCitations ?? 0} citations found |{" "}
          {result.citationAudit?.verifiedCitations ?? 0} verified |{" "}
          {(result.citationAudit?.totalCitations ?? 0) -
            (result.citationAudit?.verifiedCitations ?? 0)}{" "}
          unverified
        </Text>

        {result.citationAudit?.verifiedReferences.map((ref, i) => (
          <View
            key={i}
            style={{
              ...styles.citationEntry,
              ...(ref.verified ? styles.citationVerified : {}),
            }}
          >
            <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold" }}>
              {ref.title}
            </Text>
            {ref.doi && (
              <Text style={{ fontSize: 8, color: colors.gray }}>
                DOI: {ref.doi}
              </Text>
            )}
            {ref.pmid && (
              <Text style={{ fontSize: 8, color: colors.gray }}>
                PMID: {ref.pmid}
              </Text>
            )}
          </View>
        ))}

        {/* Citation Issues */}
        {(result.citationAudit?.issues.filter((iss) => iss.severity === "error").length ?? 0) > 0 && (
          <View style={styles.alertBox}>
            <Text
              style={{
                fontSize: 10,
                fontFamily: "Helvetica-Bold",
                color: colors.red,
                marginBottom: 3,
              }}
            >
              Citation Errors Detected
            </Text>
            {result.citationAudit!.issues
              .filter((iss) => iss.severity === "error")
              .map((iss, j) => (
                <Text key={j} style={{ fontSize: 8, color: colors.darkGray, marginTop: 2 }}>
                  {iss.message}
                </Text>
              ))}
          </View>
        )}

        {(result.citationAudit?.issues.filter((iss) => iss.severity === "warning").length ?? 0) > 0 && (
          <View style={styles.warningBox}>
            <Text
              style={{
                fontSize: 10,
                fontFamily: "Helvetica-Bold",
                color: colors.amber,
                marginBottom: 3,
              }}
            >
              Citation Warnings
            </Text>
            {result.citationAudit!.issues
              .filter((iss) => iss.severity === "warning")
              .map((iss, j) => (
                <Text key={j} style={{ fontSize: 8, color: colors.darkGray, marginTop: 2 }}>
                  {iss.message}
                </Text>
              ))}
          </View>
        )}

        {/* Self-Plagiarism */}
        {(result.selfPlagiarism?.matchedDocuments.length ?? 0) > 0 && (
          <>
            <Text style={styles.sectionTitle}>Self-Plagiarism</Text>
            {result.selfPlagiarism!.matchedDocuments.map((m, i) => (
              <View key={i} style={styles.matchCard}>
                <Text style={styles.matchTitle}>
                  {Math.round(m.similarity * 100)}% similar to previous
                  submission (Check #{m.checkId})
                </Text>
                <Text style={{ fontSize: 8, color: colors.gray }}>
                  Checked: {m.checkedAt}
                </Text>
                <Text style={styles.matchExcerpt}>
                  {m.excerpt}
                </Text>
              </View>
            ))}
          </>
        )}

        {/* Writing Quality */}
        <Text style={styles.sectionTitle}>Writing Quality</Text>
        <View style={styles.qualityGrid}>
          <View style={styles.qualityCard}>
            <Text style={styles.qualityValue}>
              {result.writingQuality.passiveVoiceCount}
            </Text>
            <Text style={styles.qualityLabel}>Passive Voice</Text>
          </View>
          <View style={styles.qualityCard}>
            <Text style={styles.qualityValue}>
              {result.writingQuality.averageSentenceLength}
            </Text>
            <Text style={styles.qualityLabel}>Avg Words/Sentence</Text>
          </View>
          <View style={styles.qualityCard}>
            <Text style={styles.qualityValue}>
              Grade {result.writingQuality.readabilityGrade}
            </Text>
            <Text style={styles.qualityLabel}>Readability Level</Text>
          </View>
        </View>

        {result.writingQuality.suggestions.length > 0 && (
          <>
            <Text
              style={{
                fontSize: 9,
                fontFamily: "Helvetica-Bold",
                marginBottom: 6,
              }}
            >
              Suggestions
            </Text>
            {result.writingQuality.suggestions.map((s, i) => (
              <Text key={i} style={styles.suggestion}>
                {s}
              </Text>
            ))}
          </>
        )}

        {/* Analyzed At */}
        <View
          style={{
            marginTop: 16,
            padding: 8,
            backgroundColor: colors.lightGray,
            borderRadius: 3,
          }}
        >
          <Text style={{ fontSize: 9 }}>
            Analyzed at: {result.checkedAt}
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Generated by {BRAND.name} — {BRAND.tagline}
          </Text>
          <Text style={styles.footerText}>
            {new Date().toISOString()}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
