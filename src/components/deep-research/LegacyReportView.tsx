"use client";

import { ExternalLink } from "lucide-react";
import type { SynthesisReport } from "./types";

interface LegacyReportViewProps {
  report: SynthesisReport;
}

export function LegacyReportView({ report }: LegacyReportViewProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Summary */}
      <section className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Summary</h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px]">{report.summary}</p>
      </section>

      {/* Key Findings */}
      {report.keyFindings.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Key Findings</h2>
          <ul className="space-y-2">
            {/* empty state: renders nothing when no data */}
            {report.keyFindings.map((finding, idx) => (
              <li key={idx} className="flex gap-3 text-gray-600 dark:text-gray-300 text-[15px]">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center justify-center font-semibold mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{finding}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Perspectives */}
      {report.perspectives.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Perspectives</h2>
          <div className="space-y-4">
            {report.perspectives.map((perspective, idx) => (
              <div key={idx} className="border-l-2 border-purple-500/40 pl-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  {perspective.name}
                  <span className="ml-2 text-gray-500 font-normal text-xs">
                    ({perspective.sourceCount} sources)
                  </span>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{perspective.findings}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gaps & Contradictions */}
      {(report.gaps.length > 0 || report.contradictions.length > 0) && (
        <section className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-6">
          {report.gaps.length > 0 && (
            <>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Research Gaps</h2>
              <ul className="list-disc list-outside ml-5 space-y-1.5 text-gray-600 dark:text-gray-300 text-sm mb-6">
                {report.gaps.map((gap, idx) => (
                  <li key={idx} className="leading-relaxed">{gap}</li>
                ))}
              </ul>
            </>
          )}
          {report.contradictions.length > 0 && (
            <>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Contradictions</h2>
              <ul className="list-disc list-outside ml-5 space-y-1.5 text-gray-600 dark:text-gray-300 text-sm">
                {report.contradictions.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}

      {/* Sources */}
      {report.sources.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Sources ({report.totalSources})
          </h2>
          <div className="space-y-3">
            {report.sources.slice(0, 50).map((source, idx) => {
              const authorsText =
                source.authors.length > 3
                  ? `${source.authors.slice(0, 3).join(", ")} et al.`
                  : source.authors.join(", ");

              return (
                <div key={source.id || idx} className="flex gap-3 text-sm">
                  <span className="flex-shrink-0 text-gray-500 font-mono text-xs mt-0.5 w-6 text-right">
                    {idx + 1}.
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-700 dark:text-gray-200 font-medium leading-snug line-clamp-1">
                      {source.title}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                      {authorsText} &middot; {source.journal} ({source.year})
                    </p>
                    {source.doi && (
                      <a
                        href={`https://doi.org/${source.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs mt-0.5"
                      >
                        <ExternalLink size={10} />
                        DOI
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
