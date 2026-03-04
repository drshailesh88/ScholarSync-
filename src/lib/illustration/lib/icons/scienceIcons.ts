/**
 * Science Icons Integration Module
 *
 * @scienceicons/react provides icons for open science platforms and tools.
 * Licensed under MIT.
 *
 * @see https://github.com/continuous-foundation/scienceicons
 */

// Import solid variant icons (24px)
import {
  ArxivIcon,
  BinderIcon,
  BlueskyIcon,
  CcByIcon,
  CcIcon,
  CcNcIcon,
  CcNdIcon,
  CcSaIcon,
  CcZeroIcon,
  CurvenoteIcon,
  DiscordIcon,
  DiscourseIcon,
  EmailIcon,
  GithubIcon,
  JupyterBookIcon,
  JupyterIcon,
  JupyterTextIcon,
  LinkedinIcon,
  MastodonIcon,
  MystIcon,
  OpenAccessIcon,
  OrcidIcon,
  OsiIcon,
  RorIcon,
  SlackIcon,
  TwitterIcon,
  WebsiteIcon,
  XIcon,
  YoutubeIcon,
} from '@scienceicons/react/24/solid';

/**
 * Science icon metadata for search and categorization
 */
export interface ScienceIconMeta {
  id: string;
  name: string;
  category: string;
  keywords: string[];
  component: React.ComponentType<{ className?: string; size?: number | string }>;
  variant: 'solid' | 'outline';
}

/**
 * All available science icons with metadata
 */
export const scienceIconsList: ScienceIconMeta[] = [
  // Academic Platforms
  { id: 'arxiv', name: 'arXiv', category: 'platforms', keywords: ['preprint', 'paper', 'academic', 'physics', 'math', 'research'], component: ArxivIcon, variant: 'solid' },
  { id: 'binder', name: 'Binder', category: 'platforms', keywords: ['jupyter', 'notebook', 'interactive', 'reproducible'], component: BinderIcon, variant: 'solid' },
  { id: 'curvenote', name: 'Curvenote', category: 'platforms', keywords: ['writing', 'publishing', 'academic'], component: CurvenoteIcon, variant: 'solid' },
  { id: 'myst', name: 'MyST', category: 'platforms', keywords: ['markdown', 'documentation', 'jupyter'], component: MystIcon, variant: 'solid' },
  { id: 'orcid', name: 'ORCID', category: 'platforms', keywords: ['researcher', 'id', 'identifier', 'author'], component: OrcidIcon, variant: 'solid' },
  { id: 'ror', name: 'ROR', category: 'platforms', keywords: ['research', 'organization', 'registry'], component: RorIcon, variant: 'solid' },

  // Jupyter Ecosystem
  { id: 'jupyter', name: 'Jupyter', category: 'jupyter', keywords: ['notebook', 'python', 'data science', 'interactive'], component: JupyterIcon, variant: 'solid' },
  { id: 'jupyter-book', name: 'Jupyter Book', category: 'jupyter', keywords: ['documentation', 'publishing', 'notebook'], component: JupyterBookIcon, variant: 'solid' },
  { id: 'jupyter-text', name: 'Jupyter Text', category: 'jupyter', keywords: ['notebook', 'logo', 'text'], component: JupyterTextIcon, variant: 'solid' },

  // Open Access & Licensing
  { id: 'open-access', name: 'Open Access', category: 'licensing', keywords: ['open', 'free', 'publishing', 'oa'], component: OpenAccessIcon, variant: 'solid' },
  { id: 'osi', name: 'Open Source', category: 'licensing', keywords: ['open source', 'initiative', 'software'], component: OsiIcon, variant: 'solid' },
  { id: 'cc', name: 'Creative Commons', category: 'licensing', keywords: ['license', 'copyright', 'open'], component: CcIcon, variant: 'solid' },
  { id: 'cc-by', name: 'CC BY', category: 'licensing', keywords: ['attribution', 'license', 'creative commons'], component: CcByIcon, variant: 'solid' },
  { id: 'cc-nc', name: 'CC NC', category: 'licensing', keywords: ['non-commercial', 'license', 'creative commons'], component: CcNcIcon, variant: 'solid' },
  { id: 'cc-nd', name: 'CC ND', category: 'licensing', keywords: ['no derivatives', 'license', 'creative commons'], component: CcNdIcon, variant: 'solid' },
  { id: 'cc-sa', name: 'CC SA', category: 'licensing', keywords: ['share alike', 'license', 'creative commons'], component: CcSaIcon, variant: 'solid' },
  { id: 'cc-zero', name: 'CC0', category: 'licensing', keywords: ['public domain', 'license', 'creative commons'], component: CcZeroIcon, variant: 'solid' },

  // Social & Communication
  { id: 'github', name: 'GitHub', category: 'social', keywords: ['code', 'repository', 'git', 'version control'], component: GithubIcon, variant: 'solid' },
  { id: 'discord', name: 'Discord', category: 'social', keywords: ['chat', 'community', 'messaging'], component: DiscordIcon, variant: 'solid' },
  { id: 'discourse', name: 'Discourse', category: 'social', keywords: ['forum', 'discussion', 'community'], component: DiscourseIcon, variant: 'solid' },
  { id: 'email', name: 'Email', category: 'social', keywords: ['mail', 'contact', 'communication'], component: EmailIcon, variant: 'solid' },
  { id: 'linkedin', name: 'LinkedIn', category: 'social', keywords: ['professional', 'network', 'career'], component: LinkedinIcon, variant: 'solid' },
  { id: 'mastodon', name: 'Mastodon', category: 'social', keywords: ['social', 'fediverse', 'microblog'], component: MastodonIcon, variant: 'solid' },
  { id: 'bluesky', name: 'Bluesky', category: 'social', keywords: ['social', 'microblog', 'twitter'], component: BlueskyIcon, variant: 'solid' },
  { id: 'slack', name: 'Slack', category: 'social', keywords: ['chat', 'team', 'messaging'], component: SlackIcon, variant: 'solid' },
  { id: 'twitter', name: 'Twitter', category: 'social', keywords: ['social', 'microblog', 'x'], component: TwitterIcon, variant: 'solid' },
  { id: 'x', name: 'X', category: 'social', keywords: ['social', 'twitter', 'microblog'], component: XIcon, variant: 'solid' },
  { id: 'youtube', name: 'YouTube', category: 'social', keywords: ['video', 'streaming', 'media'], component: YoutubeIcon, variant: 'solid' },
  { id: 'website', name: 'Website', category: 'social', keywords: ['web', 'link', 'url', 'homepage'], component: WebsiteIcon, variant: 'solid' },
];

/**
 * Science icon categories
 */
export const scienceIconCategories = {
  platforms: { name: 'Academic Platforms', description: 'Research and publishing platforms' },
  jupyter: { name: 'Jupyter Ecosystem', description: 'Jupyter notebooks and tools' },
  licensing: { name: 'Licensing', description: 'Open access and licensing icons' },
  social: { name: 'Social & Communication', description: 'Community and communication tools' },
};

/**
 * Search science icons by query
 */
export function searchScienceIcons(query: string): ScienceIconMeta[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return scienceIconsList;

  return scienceIconsList.filter(icon => {
    const searchText = [icon.name, icon.category, ...icon.keywords].join(' ').toLowerCase();
    return searchText.includes(normalizedQuery);
  });
}

/**
 * Get icons by category
 */
export function getScienceIconsByCategory(category: string): ScienceIconMeta[] {
  return scienceIconsList.filter(icon => icon.category === category);
}

// Re-export commonly used icons
export {
  ArxivIcon,
  JupyterIcon,
  OrcidIcon,
  OpenAccessIcon,
  GithubIcon,
  CcIcon,
  CcByIcon,
};
