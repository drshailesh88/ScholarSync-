"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { highlightAbstract } from "@/lib/sr/highlight";
import type { Candidate, ReviewCriteria } from "@/lib/sr/types";

interface ReferenceCardProps {
  candidate: Candidate;
  criteria: ReviewCriteria;
  showCriteria?: boolean;
}

function Abstract({
  text,
  criteria,
}: {
  text: string;
  criteria: ReviewCriteria;
}) {
  const segments = highlightAbstract(text, {
    include: criteria.highlightInclude,
    exclude: criteria.highlightExclude,
  });
  return (
    <div className="absblock">
      {segments.map((segment, index) => {
        if (segment.kind === "include") {
          return (
            <span className="hl-i" key={index}>
              {segment.text}
            </span>
          );
        }
        if (segment.kind === "exclude") {
          return (
            <span className="hl-e" key={index}>
              {segment.text}
            </span>
          );
        }
        return <span key={index}>{segment.text}</span>;
      })}
    </div>
  );
}

/** The work surface: reference identity, abstract, and criteria. */
export function ReferenceCard({
  candidate,
  criteria,
  showCriteria = true,
}: ReferenceCardProps) {
  const [open, setOpen] = useState(true);

  return (
    <article className="refcard">
      <div className="refid">
        #{candidate.refId}
        {candidate.year ? ` · ${candidate.year}` : ""}
      </div>
      <h2 className="reftitle">{candidate.title}</h2>
      <div className="refauth">{candidate.authors.join("; ")}</div>
      <div className="refmeta">
        {candidate.journal}
        {candidate.doi ? (
          <>
            {" · DOI "}
            <a
              href={`https://doi.org/${candidate.doi}`}
              target="_blank"
              rel="noreferrer"
            >
              {candidate.doi}{" "}
              <ExternalLink size={10} aria-hidden style={{ display: "inline" }} />
            </a>
          </>
        ) : null}
      </div>

      {candidate.abstract ? (
        <>
          <button
            type="button"
            className="abstoggle"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <ChevronDown size={13} aria-hidden />
            ) : (
              <ChevronRight size={13} aria-hidden />
            )}
            Abstract
          </button>
          {open ? (
            <Abstract text={candidate.abstract} criteria={criteria} />
          ) : null}
        </>
      ) : null}

      {showCriteria ? (
        <div className="crit">
          <div className="critbox inc">
            <h4>Inclusion criteria</h4>
            <ul>
              {criteria.inclusion.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="critbox exc">
            <h4>Exclusion criteria</h4>
            <ul>
              {criteria.exclusion.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </article>
  );
}
