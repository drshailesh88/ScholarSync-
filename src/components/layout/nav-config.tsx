import { Rss } from "@phosphor-icons/react";

// Icon type: either SVG inline or PNG from /sidebar-icons/
export type NavIcon =
  | { type: "svg"; element: React.ReactNode }
  | { type: "png"; src: string; size?: number };

export interface NavItem {
  label: string;
  href: string;
  icon: NavIcon;
}

export interface NavSection {
  label: string;
  category: string; // CREATE, RESEARCH, AUDIT
  items: NavItem[];
}

// SVG icons (matching prototype exactly)
export const svgIcons = {
  projects: (
    <svg viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="6" height="6" rx="1.5" fill="#fff" />
      <rect x="10" y="2" width="6" height="6" rx="1.5" fill="#fff" />
      <rect x="2" y="10" width="6" height="6" rx="1.5" fill="#fff" />
      <rect x="10" y="10" width="6" height="6" rx="1.5" fill="#fff" />
    </svg>
  ),
  latex: (
    <svg viewBox="0 0 18 18" fill="none">
      <path d="M6 3.5L2 9l4 5.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 3.5l4 5.5-4 5.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 2.5l-3 13" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  discover: (
    <svg viewBox="0 0 18 18" fill="none">
      <circle cx="8" cy="8" r="5.5" stroke="#fff" strokeWidth="1.5" />
      <path d="M12.5 12.5l3 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  pulse: (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1.5" fill="#fff" stroke="none" />
    </svg>
  ),
  library: (
    <svg viewBox="0 0 18 18" fill="none">
      <rect x="3" y="3" width="3" height="12" rx="0.8" fill="#fff" stroke="#fff" strokeWidth="1" />
      <rect x="7.5" y="2" width="3" height="13" rx="0.8" fill="#fff" stroke="#fff" strokeWidth="1" opacity="0.7" />
      <rect x="12" y="4" width="3" height="11" rx="0.8" fill="#fff" stroke="#fff" strokeWidth="1" opacity="0.45" />
    </svg>
  ),
  systematicReview: (
    <svg viewBox="0 0 18 18" fill="none">
      <path d="M3 2h12v3H3z" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M5 8h8v2.5H5z" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M7 13.5h4v2.5H7z" fill="#fff" fillOpacity="0.3" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M9 5v3M9 10.5v3" stroke="#fff" strokeWidth="1.2" />
    </svg>
  ),
  audit: (
    <svg viewBox="0 0 18 18" fill="none">
      <path d="M9 2L3 4.5v4.5c0 4 2.5 6 6 7.5 3.5-1.5 6-3.5 6-7.5V4.5L9 2z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M6.5 9l2 2 3.5-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

/** Full v2 navigation — restored when v2 modules are enabled. */
export const fullNavSections: NavSection[] = [
  {
    label: "Create",
    category: "create",
    items: [
      { label: "Draft", href: "/studio", icon: { type: "png", src: "/sidebar-icons/edit.png" } },
      { label: "LaTeX", href: "/latex", icon: { type: "svg", element: svgIcons.latex } },
      { label: "Canvas", href: "/illustrate", icon: { type: "png", src: "/sidebar-icons/pen-tool.png" } },
      { label: "Poster", href: "/poster", icon: { type: "png", src: "/sidebar-icons/poster.png" } },
      { label: "Stage", href: "/presentation", icon: { type: "png", src: "/sidebar-icons/business-analyst.png", size: 20 } },
    ],
  },
  {
    label: "Research",
    category: "research",
    items: [
      { label: "Explore", href: "/explore", icon: { type: "svg", element: svgIcons.discover } },
      { label: "Reading Room", href: "/notebook", icon: { type: "png", src: "/sidebar-icons/reading-room.png" } },
      { label: "Journal Feed", href: "/feeds", icon: { type: "svg", element: <Rss size={16} weight="bold" /> } },
      { label: "Deep Research", href: "/deep-research", icon: { type: "png", src: "/sidebar-icons/creativity.png", size: 20 } },
      { label: "Library", href: "/library", icon: { type: "svg", element: svgIcons.library } },
      { label: "Systematic Review", href: "/systematic-review", icon: { type: "svg", element: svgIcons.systematicReview } },
    ],
  },
  {
    label: "Audit",
    category: "audit",
    items: [
      { label: "Integrity Check", href: "/compliance", icon: { type: "svg", element: svgIcons.audit } },
    ],
  },
];

/** Focused v1 navigation — literature search only. */
export const v1NavSections: NavSection[] = [
  {
    label: "Research",
    category: "research",
    items: [
      { label: "Search", href: "/research", icon: { type: "svg", element: svgIcons.discover } },
    ],
  },
];

interface VisibleNavOptions {
  searchOnly: boolean;
  systematicReviewEnabled?: boolean;
}

/**
 * Compute the navigation sections to render. In v1 search-only mode this is the
 * focused search navigation; otherwise it is the full v2 surface with the
 * systematic-review item gated by the active domain.
 */
export function getVisibleNavSections({
  searchOnly,
  systematicReviewEnabled = true,
}: VisibleNavOptions): NavSection[] {
  const sections = searchOnly ? v1NavSections : fullNavSections;
  return sections.map((section) => ({
    ...section,
    items: section.items.filter((item) => {
      if (item.href === "/systematic-review") {
        return systematicReviewEnabled;
      }
      return true;
    }),
  }));
}
