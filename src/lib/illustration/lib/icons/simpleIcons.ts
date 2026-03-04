/**
 * Simple Icons Integration Module
 *
 * simple-icons provides SVG icons for popular brands.
 * Licensed under CC0 1.0.
 *
 * This module focuses on science, research, and technology tool brands.
 *
 * @see https://simpleicons.org/
 */

// Simple-icons provides raw SVG data, not React components
// We create React-compatible wrappers for commonly used science brands
import * as simpleIcons from 'simple-icons';

/**
 * Simple Icon interface from the package
 */
export interface SimpleIconData {
  title: string;
  slug: string;
  hex: string;
  source: string;
  svg: string;
  path: string;
  guidelines?: string;
  license?: {
    type: string;
    url?: string;
  };
}

/**
 * Get a simple icon by its slug
 */
export function getSimpleIcon(slug: string): SimpleIconData | undefined {
  const iconKey = `si${slug.charAt(0).toUpperCase()}${slug.slice(1).replace(/-/g, '')}`;
  return (simpleIcons as Record<string, SimpleIconData>)[iconKey];
}

/**
 * Simple icon metadata for search and categorization
 */
export interface SimpleIconMeta {
  id: string;
  name: string;
  category: string;
  keywords: string[];
  slug: string;
  hex: string;
}

/**
 * Science and research tool brand icons
 */
export const scienceBrandsList: SimpleIconMeta[] = [
  // Programming & Data Science
  { id: 'python', name: 'Python', category: 'programming', keywords: ['language', 'data science', 'ml', 'ai'], slug: 'python', hex: '3776AB' },
  { id: 'r', name: 'R', category: 'programming', keywords: ['statistics', 'data science', 'language', 'analysis'], slug: 'r', hex: '276DC3' },
  { id: 'julia', name: 'Julia', category: 'programming', keywords: ['language', 'scientific computing', 'numerical'], slug: 'julia', hex: '9558B2' },
  { id: 'matlab', name: 'MATLAB', category: 'programming', keywords: ['matrix', 'engineering', 'simulation', 'mathworks'], slug: 'mathworks', hex: '0076A8' },

  // Notebooks & IDEs
  { id: 'jupyter', name: 'Jupyter', category: 'notebooks', keywords: ['notebook', 'python', 'data science', 'interactive'], slug: 'jupyter', hex: 'F37626' },
  { id: 'anaconda', name: 'Anaconda', category: 'notebooks', keywords: ['python', 'distribution', 'data science', 'conda'], slug: 'anaconda', hex: '44A833' },
  { id: 'vscode', name: 'VS Code', category: 'notebooks', keywords: ['editor', 'ide', 'microsoft', 'development'], slug: 'visualstudiocode', hex: '007ACC' },

  // Machine Learning & AI
  { id: 'tensorflow', name: 'TensorFlow', category: 'ml', keywords: ['machine learning', 'deep learning', 'google', 'ai'], slug: 'tensorflow', hex: 'FF6F00' },
  { id: 'pytorch', name: 'PyTorch', category: 'ml', keywords: ['machine learning', 'deep learning', 'facebook', 'ai'], slug: 'pytorch', hex: 'EE4C2C' },
  { id: 'keras', name: 'Keras', category: 'ml', keywords: ['deep learning', 'neural network', 'python', 'ai'], slug: 'keras', hex: 'D00000' },
  { id: 'scikitlearn', name: 'scikit-learn', category: 'ml', keywords: ['machine learning', 'python', 'classification', 'regression'], slug: 'scikitlearn', hex: 'F7931E' },
  { id: 'opencv', name: 'OpenCV', category: 'ml', keywords: ['computer vision', 'image processing', 'ml'], slug: 'opencv', hex: '5C3EE8' },

  // Data Visualization
  { id: 'plotly', name: 'Plotly', category: 'visualization', keywords: ['charts', 'graphs', 'interactive', 'dashboard'], slug: 'plotly', hex: '3F4F75' },
  { id: 'd3', name: 'D3.js', category: 'visualization', keywords: ['data', 'visualization', 'charts', 'javascript'], slug: 'd3dotjs', hex: 'F9A03C' },

  // Cloud & Computing
  { id: 'aws', name: 'AWS', category: 'cloud', keywords: ['amazon', 'cloud', 'computing', 'infrastructure'], slug: 'amazonaws', hex: '232F3E' },
  { id: 'googlecloud', name: 'Google Cloud', category: 'cloud', keywords: ['gcp', 'cloud', 'computing', 'google'], slug: 'googlecloud', hex: '4285F4' },
  { id: 'azure', name: 'Azure', category: 'cloud', keywords: ['microsoft', 'cloud', 'computing'], slug: 'microsoftazure', hex: '0078D4' },

  // Databases
  { id: 'postgresql', name: 'PostgreSQL', category: 'database', keywords: ['sql', 'database', 'relational', 'postgres'], slug: 'postgresql', hex: '4169E1' },
  { id: 'mongodb', name: 'MongoDB', category: 'database', keywords: ['nosql', 'database', 'document', 'json'], slug: 'mongodb', hex: '47A248' },
  { id: 'elasticsearch', name: 'Elasticsearch', category: 'database', keywords: ['search', 'analytics', 'database', 'elastic'], slug: 'elasticsearch', hex: '005571' },

  // Version Control & Collaboration
  { id: 'git', name: 'Git', category: 'vcs', keywords: ['version control', 'code', 'repository', 'source'], slug: 'git', hex: 'F05032' },
  { id: 'github', name: 'GitHub', category: 'vcs', keywords: ['repository', 'code', 'collaboration', 'git'], slug: 'github', hex: '181717' },
  { id: 'gitlab', name: 'GitLab', category: 'vcs', keywords: ['repository', 'devops', 'ci/cd', 'git'], slug: 'gitlab', hex: 'FC6D26' },

  // Scientific Software
  { id: 'latex', name: 'LaTeX', category: 'scientific', keywords: ['typesetting', 'document', 'publishing', 'academic'], slug: 'latex', hex: '008080' },
  { id: 'overleaf', name: 'Overleaf', category: 'scientific', keywords: ['latex', 'editor', 'academic', 'publishing'], slug: 'overleaf', hex: '47A141' },
  { id: 'zotero', name: 'Zotero', category: 'scientific', keywords: ['citation', 'reference', 'bibliography', 'research'], slug: 'zotero', hex: 'CC2936' },

  // Bioinformatics
  { id: 'bioconductor', name: 'Bioconductor', category: 'bioinformatics', keywords: ['r', 'genomics', 'bioinformatics', 'biology'], slug: 'bioconductor', hex: '94BE3F' },

  // Containers & DevOps
  { id: 'docker', name: 'Docker', category: 'devops', keywords: ['container', 'deployment', 'virtualization'], slug: 'docker', hex: '2496ED' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'devops', keywords: ['container', 'orchestration', 'k8s', 'cloud native'], slug: 'kubernetes', hex: '326CE5' },
];

/**
 * Simple icon categories
 */
export const simpleIconCategories = {
  programming: { name: 'Programming Languages', description: 'Scientific programming languages' },
  notebooks: { name: 'Notebooks & IDEs', description: 'Development environments' },
  ml: { name: 'Machine Learning', description: 'ML and AI frameworks' },
  visualization: { name: 'Data Visualization', description: 'Charting and graphing tools' },
  cloud: { name: 'Cloud Computing', description: 'Cloud platforms and services' },
  database: { name: 'Databases', description: 'Data storage solutions' },
  vcs: { name: 'Version Control', description: 'Code collaboration tools' },
  scientific: { name: 'Scientific Software', description: 'Academic and research tools' },
  bioinformatics: { name: 'Bioinformatics', description: 'Biological data analysis tools' },
  devops: { name: 'DevOps', description: 'Deployment and infrastructure' },
};

/**
 * Search simple icons by query
 */
export function searchSimpleIcons(query: string): SimpleIconMeta[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return scienceBrandsList;

  return scienceBrandsList.filter(icon => {
    const searchText = [icon.name, icon.category, ...icon.keywords].join(' ').toLowerCase();
    return searchText.includes(normalizedQuery);
  });
}

/**
 * Get icons by category
 */
export function getSimpleIconsByCategory(category: string): SimpleIconMeta[] {
  return scienceBrandsList.filter(icon => icon.category === category);
}

/**
 * Create an SVG element from simple-icons data
 */
export function createSimpleIconSvg(slug: string, size: number = 24, color?: string): string | null {
  const icon = getSimpleIcon(slug);
  if (!icon) return null;

  const fillColor = color || `#${icon.hex}`;
  return `<svg role="img" viewBox="0 0 24 24" width="${size}" height="${size}" fill="${fillColor}" xmlns="http://www.w3.org/2000/svg"><title>${icon.title}</title><path d="${icon.path}"/></svg>`;
}

/**
 * Get simple icon path data for custom rendering
 */
export function getSimpleIconPath(slug: string): string | null {
  const icon = getSimpleIcon(slug);
  return icon ? icon.path : null;
}

// Types are already exported above via interface/type declarations
