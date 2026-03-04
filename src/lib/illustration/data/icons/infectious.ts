/**
 * Infectious Disease Icon Library
 * Comprehensive SVG icons for infectious disease medicine
 *
 * Categories:
 * - Pathogens: Bacteria (15), Viral (12), Fungal/Parasitic (10)
 * - Infection Sites (15)
 * - Immune Response (10)
 * - Antimicrobials (12)
 * - Equipment/Diagnostics (11)
 */

import type { IconDefinition } from './index';

export const infectiousIcons: IconDefinition[] = [
  // ===========================================================================
  // PATHOGENS - BACTERIA (15)
  // ===========================================================================
  {
    id: 'inf-gram-pos-cocci',
    name: 'Gram Positive Cocci',
    domain: 'medicine',
    category: 'bacteria',
    tags: ['gram positive', 'cocci', 'purple', 'staphylococcus', 'streptococcus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="20" r="6" fill="#8B5CF6" opacity="0.6"/>
      <circle cx="32" cy="18" r="6" fill="#8B5CF6" opacity="0.6"/>
      <circle cx="26" cy="30" r="6" fill="#8B5CF6" opacity="0.6"/>
      <circle cx="38" cy="28" r="6" fill="#8B5CF6" opacity="0.6"/>
      <circle cx="44" cy="40" r="6" fill="#8B5CF6" opacity="0.6"/>
      <circle cx="32" cy="42" r="6" fill="#8B5CF6" opacity="0.6"/>
      <circle cx="20" cy="44" r="6" fill="#8B5CF6" opacity="0.6"/>
      <text x="8" y="60" font-size="5" fill="currentColor" stroke="none">Gram +</text>
    </svg>`
  },
  {
    id: 'inf-gram-neg-rods',
    name: 'Gram Negative Rods',
    domain: 'medicine',
    category: 'bacteria',
    tags: ['gram negative', 'rods', 'bacilli', 'pink', 'E. coli', 'enterobacteriaceae'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="16" height="6" rx="3" fill="#EC4899" opacity="0.6"/>
      <rect x="28" y="12" width="18" height="6" rx="3" fill="#EC4899" opacity="0.6" transform="rotate(15 37 15)"/>
      <rect x="12" y="28" width="14" height="6" rx="3" fill="#EC4899" opacity="0.6" transform="rotate(-10 19 31)"/>
      <rect x="32" y="26" width="16" height="6" rx="3" fill="#EC4899" opacity="0.6"/>
      <rect x="8" y="40" width="18" height="6" rx="3" fill="#EC4899" opacity="0.6" transform="rotate(20 17 43)"/>
      <rect x="36" y="42" width="14" height="6" rx="3" fill="#EC4899" opacity="0.6"/>
      <text x="8" y="60" font-size="5" fill="currentColor" stroke="none">Gram -</text>
    </svg>`
  },
  {
    id: 'inf-spirochete',
    name: 'Spirochete',
    domain: 'medicine',
    category: 'bacteria',
    tags: ['spirochete', 'spiral', 'treponema', 'borrelia', 'leptospira', 'syphilis', 'lyme'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c4-8 8 8 12 0s8 8 12 0 8 8 12 0 8 8 12 0" stroke-width="2.5"/>
      <path d="M12 20c3-6 6 6 9 0s6 6 9 0 6 6 9 0" stroke-width="2" opacity="0.6"/>
      <path d="M12 44c3-6 6 6 9 0s6 6 9 0 6 6 9 0" stroke-width="2" opacity="0.6"/>
      <text x="12" y="58" font-size="5" fill="currentColor" stroke="none">Spirochete</text>
    </svg>`
  },
  {
    id: 'inf-mycobacteria',
    name: 'Mycobacteria',
    domain: 'medicine',
    category: 'bacteria',
    tags: ['mycobacteria', 'acid fast', 'TB', 'tuberculosis', 'AFB', 'red'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="10" y="20" width="18" height="4" rx="2" fill="#DC2626" opacity="0.7"/>
      <rect x="32" y="16" width="20" height="4" rx="2" fill="#DC2626" opacity="0.7" transform="rotate(10 42 18)"/>
      <rect x="14" y="32" width="16" height="4" rx="2" fill="#DC2626" opacity="0.7" transform="rotate(-5 22 34)"/>
      <rect x="36" y="30" width="18" height="4" rx="2" fill="#DC2626" opacity="0.7"/>
      <rect x="12" y="44" width="20" height="4" rx="2" fill="#DC2626" opacity="0.7"/>
      <circle cx="52" cy="44" r="2" fill="#DC2626"/>
      <text x="10" y="58" font-size="4" fill="currentColor" stroke="none">Acid-Fast</text>
    </svg>`
  },
  {
    id: 'inf-anaerobes',
    name: 'Anaerobic Bacteria',
    domain: 'medicine',
    category: 'bacteria',
    tags: ['anaerobes', 'clostridium', 'bacteroides', 'fusobacterium', 'anaerobic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="16" height="5" rx="2.5" fill="#6B7280" opacity="0.6"/>
      <rect x="34" y="14" width="18" height="5" rx="2.5" fill="#6B7280" opacity="0.6"/>
      <circle cx="20" cy="32" r="5" fill="#6B7280" opacity="0.6"/>
      <circle cx="36" cy="30" r="4" fill="#6B7280" opacity="0.6"/>
      <circle cx="48" cy="34" r="5" fill="#6B7280" opacity="0.6"/>
      <rect x="14" y="44" width="14" height="5" rx="2.5" fill="#6B7280" opacity="0.6"/>
      <path d="M54 12l-4 4m4 0l-4-4" stroke-width="2"/>
      <text x="38" y="52" font-size="4" fill="currentColor" stroke="none">No O2</text>
    </svg>`
  },
  {
    id: 'inf-staph-aureus',
    name: 'Staphylococcus aureus',
    domain: 'medicine',
    category: 'bacteria',
    tags: ['staph', 'staphylococcus', 'aureus', 'MRSA', 'MSSA', 'clusters', 'grape'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="5" fill="#F59E0B" opacity="0.7"/>
      <circle cx="24" cy="30" r="5" fill="#F59E0B" opacity="0.7"/>
      <circle cx="40" cy="30" r="5" fill="#F59E0B" opacity="0.7"/>
      <circle cx="28" cy="38" r="5" fill="#F59E0B" opacity="0.7"/>
      <circle cx="36" cy="38" r="5" fill="#F59E0B" opacity="0.7"/>
      <circle cx="32" cy="46" r="5" fill="#F59E0B" opacity="0.7"/>
      <circle cx="20" cy="42" r="4" fill="#F59E0B" opacity="0.5"/>
      <circle cx="44" cy="42" r="4" fill="#F59E0B" opacity="0.5"/>
      <text x="10" y="60" font-size="4" fill="currentColor" stroke="none">S. aureus</text>
    </svg>`
  },
  {
    id: 'inf-streptococcus',
    name: 'Streptococcus',
    domain: 'medicine',
    category: 'bacteria',
    tags: ['strep', 'streptococcus', 'chains', 'GAS', 'GBS', 'pneumoniae'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="32" r="5" fill="#8B5CF6" opacity="0.7"/>
      <circle cx="22" cy="32" r="5" fill="#8B5CF6" opacity="0.7"/>
      <circle cx="32" cy="32" r="5" fill="#8B5CF6" opacity="0.7"/>
      <circle cx="42" cy="32" r="5" fill="#8B5CF6" opacity="0.7"/>
      <circle cx="52" cy="32" r="5" fill="#8B5CF6" opacity="0.7"/>
      <path d="M12 20c5 0 10 4 10 4s5-4 10-4 10 4 10 4s5-4 10-4" stroke-dasharray="2 2" opacity="0.5"/>
      <text x="8" y="54" font-size="4" fill="currentColor" stroke="none">Streptococcus</text>
    </svg>`
  },
  {
    id: 'inf-ecoli',
    name: 'Escherichia coli',
    domain: 'medicine',
    category: 'bacteria',
    tags: ['E. coli', 'escherichia', 'UTI', 'enterobacteriaceae', 'gram negative'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="8" fill="#EC4899" opacity="0.6"/>
      <ellipse cx="32" cy="32" rx="16" ry="8"/>
      <path d="M16 32c-8 0-8-4-8-4" stroke-width="0.5"/>
      <path d="M14 28c-6-2-8-6-8-6" stroke-width="0.5"/>
      <path d="M14 36c-6 2-8 6-8 6" stroke-width="0.5"/>
      <path d="M48 32c8 0 8-4 8-4" stroke-width="0.5"/>
      <path d="M50 28c6-2 8-6 8-6" stroke-width="0.5"/>
      <path d="M50 36c6 2 8 6 8 6" stroke-width="0.5"/>
      <text x="18" y="54" font-size="5" fill="currentColor" stroke="none">E. coli</text>
    </svg>`
  },
  {
    id: 'inf-pseudomonas',
    name: 'Pseudomonas aeruginosa',
    domain: 'medicine',
    category: 'bacteria',
    tags: ['pseudomonas', 'aeruginosa', 'green', 'nosocomial', 'MDR'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="14" ry="7" fill="#10B981" opacity="0.6"/>
      <ellipse cx="32" cy="32" rx="14" ry="7"/>
      <path d="M18 32c-4-8-4-16 0-20" stroke-width="1"/>
      <circle cx="18" cy="12" r="2" fill="#10B981"/>
      <path d="M32 25v-14"/>
      <circle cx="32" cy="10" r="2" fill="#10B981"/>
      <path d="M46 32c4-8 4-16 0-20"/>
      <circle cx="46" cy="12" r="2" fill="#10B981"/>
      <text x="6" y="54" font-size="4" fill="currentColor" stroke="none">Pseudomonas</text>
    </svg>`
  },
  {
    id: 'inf-klebsiella',
    name: 'Klebsiella pneumoniae',
    domain: 'medicine',
    category: 'bacteria',
    tags: ['klebsiella', 'pneumoniae', 'capsule', 'mucoid', 'ESBL', 'CRE'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="18" ry="12" fill="#EC4899" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="18" ry="12" stroke-dasharray="4 2"/>
      <ellipse cx="32" cy="32" rx="12" ry="7" fill="#EC4899" opacity="0.6"/>
      <ellipse cx="32" cy="32" rx="12" ry="7"/>
      <text x="8" y="54" font-size="4" fill="currentColor" stroke="none">Klebsiella</text>
      <text x="12" y="60" font-size="3" fill="currentColor" stroke="none">(capsule)</text>
    </svg>`
  },
  {
    id: 'inf-enterococcus',
    name: 'Enterococcus',
    domain: 'medicine',
    category: 'bacteria',
    tags: ['enterococcus', 'VRE', 'faecalis', 'faecium', 'gram positive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="28" rx="6" ry="8" fill="#8B5CF6" opacity="0.6"/>
      <ellipse cx="32" cy="32" rx="6" ry="8" fill="#8B5CF6" opacity="0.6"/>
      <ellipse cx="44" cy="28" rx="6" ry="8" fill="#8B5CF6" opacity="0.6"/>
      <ellipse cx="26" cy="42" rx="6" ry="8" fill="#8B5CF6" opacity="0.6"/>
      <ellipse cx="38" cy="42" rx="6" ry="8" fill="#8B5CF6" opacity="0.6"/>
      <text x="6" y="60" font-size="4" fill="currentColor" stroke="none">Enterococcus</text>
    </svg>`
  },
  {
    id: 'inf-clostridium',
    name: 'Clostridium difficile',
    domain: 'medicine',
    category: 'bacteria',
    tags: ['clostridium', 'difficile', 'C. diff', 'CDI', 'spores', 'anaerobe'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="16" width="8" height="24" rx="4" fill="#6B7280" opacity="0.6"/>
      <rect x="36" y="20" width="8" height="28" rx="4" fill="#6B7280" opacity="0.6"/>
      <circle cx="24" cy="14" r="3" fill="#F59E0B" stroke="#F59E0B"/>
      <circle cx="40" cy="18" r="3" fill="#F59E0B" stroke="#F59E0B"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">C. diff</text>
      <text x="44" y="12" font-size="3" fill="currentColor" stroke="none">spore</text>
    </svg>`
  },
  {
    id: 'inf-neisseria',
    name: 'Neisseria',
    domain: 'medicine',
    category: 'bacteria',
    tags: ['neisseria', 'meningitidis', 'gonorrhoeae', 'diplococci', 'gram negative'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="26" cy="24" r="6" fill="#EC4899" opacity="0.6"/>
      <circle cx="38" cy="24" r="6" fill="#EC4899" opacity="0.6"/>
      <circle cx="22" cy="40" r="6" fill="#EC4899" opacity="0.6"/>
      <circle cx="34" cy="40" r="6" fill="#EC4899" opacity="0.6"/>
      <circle cx="46" cy="36" r="6" fill="#EC4899" opacity="0.6"/>
      <circle cx="54" cy="44" r="5" fill="#EC4899" opacity="0.4"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Neisseria</text>
      <text x="36" y="58" font-size="3" fill="currentColor" stroke="none">diplococci</text>
    </svg>`
  },
  {
    id: 'inf-haemophilus',
    name: 'Haemophilus influenzae',
    domain: 'medicine',
    category: 'bacteria',
    tags: ['haemophilus', 'influenzae', 'coccobacilli', 'gram negative', 'Hib'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="18" cy="24" rx="6" ry="4" fill="#EC4899" opacity="0.6"/>
      <ellipse cx="34" cy="22" rx="7" ry="4" fill="#EC4899" opacity="0.6"/>
      <ellipse cx="50" cy="26" rx="6" ry="4" fill="#EC4899" opacity="0.6"/>
      <ellipse cx="24" cy="36" rx="6" ry="4" fill="#EC4899" opacity="0.6"/>
      <ellipse cx="42" cy="38" rx="7" ry="4" fill="#EC4899" opacity="0.6"/>
      <ellipse cx="16" cy="48" rx="6" ry="4" fill="#EC4899" opacity="0.6"/>
      <text x="4" y="60" font-size="3" fill="currentColor" stroke="none">H. influenzae</text>
    </svg>`
  },
  {
    id: 'inf-biofilm',
    name: 'Bacterial Biofilm',
    domain: 'medicine',
    category: 'bacteria',
    tags: ['biofilm', 'matrix', 'resistance', 'catheter', 'device'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="48" width="48" height="8" fill="#9CA3AF" opacity="0.5"/>
      <path d="M8 48c0-8 8-12 24-12s24 4 24 12" fill="#3B82F6" opacity="0.2"/>
      <circle cx="20" cy="40" r="3" fill="#8B5CF6" opacity="0.7"/>
      <circle cx="32" cy="38" r="3" fill="#8B5CF6" opacity="0.7"/>
      <circle cx="44" cy="40" r="3" fill="#8B5CF6" opacity="0.7"/>
      <circle cx="26" cy="44" r="2" fill="#8B5CF6" opacity="0.7"/>
      <circle cx="38" cy="44" r="2" fill="#8B5CF6" opacity="0.7"/>
      <path d="M16 36c4 4 8 4 12 0" stroke-dasharray="2 1" opacity="0.5"/>
      <path d="M36 36c4 4 8 4 12 0" stroke-dasharray="2 1" opacity="0.5"/>
      <text x="16" y="62" font-size="5" fill="currentColor" stroke="none">Biofilm</text>
    </svg>`
  },

  // ===========================================================================
  // PATHOGENS - VIRAL (12)
  // ===========================================================================
  {
    id: 'inf-virus-structure',
    name: 'Virus Structure',
    domain: 'medicine',
    category: 'virus',
    tags: ['virus', 'capsid', 'envelope', 'structure', 'general'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#EF4444" opacity="0.2"/>
      <circle cx="32" cy="32" r="16"/>
      <polygon points="32,20 40,28 40,36 32,44 24,36 24,28" fill="#EF4444" opacity="0.4"/>
      <polygon points="32,20 40,28 40,36 32,44 24,36 24,28"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.5"/>
      <path d="M32 16v-8"/>
      <path d="M44 20l6-6"/>
      <path d="M48 32h8"/>
      <path d="M44 44l6 6"/>
      <path d="M32 48v8"/>
      <path d="M20 44l-6 6"/>
      <path d="M16 32h-8"/>
      <path d="M20 20l-6-6"/>
    </svg>`
  },
  {
    id: 'inf-dna-virus',
    name: 'DNA Virus',
    domain: 'medicine',
    category: 'virus',
    tags: ['DNA virus', 'double stranded', 'herpes', 'adenovirus', 'poxvirus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#3B82F6" opacity="0.2"/>
      <circle cx="32" cy="32" r="18"/>
      <path d="M24 20v24" stroke-width="2"/>
      <path d="M40 20v24" stroke-width="2"/>
      <path d="M24 24h16"/>
      <path d="M24 32h16"/>
      <path d="M24 40h16"/>
      <text x="20" y="58" font-size="5" fill="currentColor" stroke="none">DNA</text>
    </svg>`
  },
  {
    id: 'inf-rna-virus',
    name: 'RNA Virus',
    domain: 'medicine',
    category: 'virus',
    tags: ['RNA virus', 'single stranded', 'influenza', 'coronavirus', 'HIV'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#EF4444" opacity="0.2"/>
      <circle cx="32" cy="32" r="18"/>
      <path d="M24 20c4 4 4 8 0 12s0 8 4 12" stroke-width="2"/>
      <path d="M32 20c4 4 4 8 0 12s0 8 4 12" stroke-width="2"/>
      <path d="M40 20c4 4 4 8 0 12s0 8 4 12" stroke-width="2"/>
      <text x="20" y="58" font-size="5" fill="currentColor" stroke="none">RNA</text>
    </svg>`
  },
  {
    id: 'inf-hiv',
    name: 'HIV',
    domain: 'medicine',
    category: 'virus',
    tags: ['HIV', 'AIDS', 'retrovirus', 'CD4', 'gp120', 'gp41'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#DC2626" opacity="0.3"/>
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="8" fill="#DC2626" opacity="0.5"/>
      <path d="M32 16v-6m0 6l-3-4m3 4l3-4"/>
      <path d="M44 20l4-4m-4 4l0-4m0 4l4 0"/>
      <path d="M48 32h6m-6 0l4-3m-4 3l4 3"/>
      <path d="M44 44l4 4m-4-4l0 4m0-4l4 0"/>
      <path d="M32 48v6m0-6l-3 4m3-4l3 4"/>
      <path d="M20 44l-4 4m4-4l0 4m0-4l-4 0"/>
      <path d="M16 32h-6m6 0l-4-3m4 3l-4 3"/>
      <path d="M20 20l-4-4m4 4l0-4m0 4l-4 0"/>
      <text x="22" y="60" font-size="5" fill="currentColor" stroke="none">HIV</text>
    </svg>`
  },
  {
    id: 'inf-influenza',
    name: 'Influenza Virus',
    domain: 'medicine',
    category: 'virus',
    tags: ['influenza', 'flu', 'hemagglutinin', 'neuraminidase', 'H1N1'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="14" fill="#F59E0B" opacity="0.3"/>
      <circle cx="32" cy="32" r="14"/>
      <path d="M32 18v-8l-2 3m2-3l2 3"/>
      <path d="M42 22l6-6l-3 1m3-1l-1 3"/>
      <path d="M46 32h8l-3-2m3 2l-3 2"/>
      <path d="M42 42l6 6l-1-3m1 3l-3-1"/>
      <path d="M32 46v8l-2-3m2 3l2-3"/>
      <path d="M22 42l-6 6l1-3m-1 3l3-1"/>
      <path d="M18 32h-8l3-2m-3 2l3 2"/>
      <path d="M22 22l-6-6l3 1m-3-1l1 3"/>
      <text x="18" y="60" font-size="4" fill="currentColor" stroke="none">Influenza</text>
    </svg>`
  },
  {
    id: 'inf-coronavirus',
    name: 'Coronavirus',
    domain: 'medicine',
    category: 'virus',
    tags: ['coronavirus', 'COVID', 'SARS', 'MERS', 'spike protein', 'corona'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="12" fill="#EF4444" opacity="0.3"/>
      <circle cx="32" cy="32" r="12"/>
      <path d="M32 20v-8"/>
      <circle cx="32" cy="10" r="3"/>
      <path d="M41 23l6-6"/>
      <circle cx="49" cy="15" r="3"/>
      <path d="M44 32h8"/>
      <circle cx="54" cy="32" r="3"/>
      <path d="M41 41l6 6"/>
      <circle cx="49" cy="49" r="3"/>
      <path d="M32 44v8"/>
      <circle cx="32" cy="54" r="3"/>
      <path d="M23 41l-6 6"/>
      <circle cx="15" cy="49" r="3"/>
      <path d="M20 32h-8"/>
      <circle cx="10" cy="32" r="3"/>
      <path d="M23 23l-6-6"/>
      <circle cx="15" cy="15" r="3"/>
    </svg>`
  },
  {
    id: 'inf-hepatitis',
    name: 'Hepatitis Virus',
    domain: 'medicine',
    category: 'virus',
    tags: ['hepatitis', 'HBV', 'HCV', 'HAV', 'liver', 'viral hepatitis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="14" fill="#F59E0B" opacity="0.3"/>
      <circle cx="32" cy="32" r="14"/>
      <circle cx="32" cy="32" r="8" stroke-dasharray="2 2"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
      <path d="M32 18v-6"/>
      <path d="M44 24l4-4"/>
      <path d="M46 32h6"/>
      <path d="M44 40l4 4"/>
      <path d="M32 46v6"/>
      <path d="M20 40l-4 4"/>
      <path d="M18 32h-6"/>
      <path d="M20 24l-4-4"/>
      <text x="20" y="60" font-size="4" fill="currentColor" stroke="none">Hepatitis</text>
    </svg>`
  },
  {
    id: 'inf-herpes',
    name: 'Herpes Virus',
    domain: 'medicine',
    category: 'virus',
    tags: ['herpes', 'HSV', 'VZV', 'CMV', 'EBV', 'herpesviridae'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#8B5CF6" opacity="0.2"/>
      <circle cx="32" cy="32" r="18"/>
      <polygon points="32,18 44,26 44,38 32,46 20,38 20,26" fill="#8B5CF6" opacity="0.4"/>
      <polygon points="32,18 44,26 44,38 32,46 20,38 20,26"/>
      <circle cx="32" cy="32" r="6"/>
      <text x="18" y="60" font-size="4" fill="currentColor" stroke="none">Herpesviridae</text>
    </svg>`
  },
  {
    id: 'inf-rsv',
    name: 'RSV',
    domain: 'medicine',
    category: 'virus',
    tags: ['RSV', 'respiratory syncytial', 'bronchiolitis', 'pediatric'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="18" ry="12" fill="#10B981" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="18" ry="12"/>
      <path d="M14 32c4-4 8 4 12 0s8 4 12 0s8 4 12 0" stroke-width="1"/>
      <path d="M32 20v-8"/>
      <path d="M24 22l-4-6"/>
      <path d="M40 22l4-6"/>
      <path d="M32 44v8"/>
      <path d="M24 42l-4 6"/>
      <path d="M40 42l4 6"/>
      <text x="20" y="60" font-size="5" fill="currentColor" stroke="none">RSV</text>
    </svg>`
  },
  {
    id: 'inf-adenovirus',
    name: 'Adenovirus',
    domain: 'medicine',
    category: 'virus',
    tags: ['adenovirus', 'respiratory', 'conjunctivitis', 'icosahedral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,8 52,20 52,44 32,56 12,44 12,20" fill="#3B82F6" opacity="0.3"/>
      <polygon points="32,8 52,20 52,44 32,56 12,44 12,20"/>
      <circle cx="32" cy="8" r="3"/>
      <circle cx="52" cy="20" r="3"/>
      <circle cx="52" cy="44" r="3"/>
      <circle cx="32" cy="56" r="3"/>
      <circle cx="12" cy="44" r="3"/>
      <circle cx="12" cy="20" r="3"/>
      <circle cx="32" cy="32" r="6"/>
      <text x="14" y="64" font-size="4" fill="currentColor" stroke="none">Adenovirus</text>
    </svg>`
  },
  {
    id: 'inf-norovirus',
    name: 'Norovirus',
    domain: 'medicine',
    category: 'virus',
    tags: ['norovirus', 'gastroenteritis', 'vomiting', 'diarrhea', 'cruise ship'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="14" fill="#F97316" opacity="0.3"/>
      <circle cx="32" cy="32" r="14"/>
      <circle cx="26" cy="28" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="38" cy="28" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="32" cy="38" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="24" cy="36" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="40" cy="36" r="2" fill="currentColor" opacity="0.3"/>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Norovirus</text>
    </svg>`
  },
  {
    id: 'inf-rabies',
    name: 'Rabies Virus',
    domain: 'medicine',
    category: 'virus',
    tags: ['rabies', 'lyssavirus', 'bullet shaped', 'encephalitis', 'zoonotic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 12c0 8 6 14 12 14h0c6 0 12-6 12-14" fill="#6B7280" opacity="0.3"/>
      <path d="M20 12v32c0 6 6 12 12 12s12-6 12-12V12"/>
      <path d="M20 12c0 8 6 14 12 14s12-6 12-14"/>
      <path d="M24 30h16"/>
      <path d="M24 38h16"/>
      <path d="M28 46h8"/>
      <text x="18" y="64" font-size="4" fill="currentColor" stroke="none">Rabies</text>
    </svg>`
  },

  // ===========================================================================
  // PATHOGENS - FUNGAL/PARASITIC (10)
  // ===========================================================================
  {
    id: 'inf-yeast',
    name: 'Yeast',
    domain: 'medicine',
    category: 'fungal',
    tags: ['yeast', 'candida', 'budding', 'fungal', 'unicellular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="32" rx="10" ry="12" fill="#A855F7" opacity="0.4"/>
      <ellipse cx="24" cy="32" rx="10" ry="12"/>
      <ellipse cx="40" cy="24" rx="6" ry="8" fill="#A855F7" opacity="0.4"/>
      <ellipse cx="40" cy="24" rx="6" ry="8"/>
      <ellipse cx="48" cy="40" rx="5" ry="6" fill="#A855F7" opacity="0.4"/>
      <ellipse cx="48" cy="40" rx="5" ry="6"/>
      <path d="M32 28l4-4"/>
      <path d="M44 32l4 4"/>
      <text x="16" y="58" font-size="5" fill="currentColor" stroke="none">Yeast</text>
    </svg>`
  },
  {
    id: 'inf-mold',
    name: 'Mold/Hyphae',
    domain: 'medicine',
    category: 'fungal',
    tags: ['mold', 'hyphae', 'filamentous', 'aspergillus', 'fungal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56l24-40" stroke-width="2"/>
      <path d="M32 16l16 24" stroke-width="2"/>
      <path d="M20 36l20 8" stroke-width="2"/>
      <path d="M32 16l-8 16"/>
      <path d="M40 32l8-8"/>
      <path d="M28 44l-8 8"/>
      <circle cx="32" cy="12" r="4" fill="#A855F7" opacity="0.5"/>
      <circle cx="52" cy="20" r="3" fill="#A855F7" opacity="0.5"/>
      <circle cx="56" cy="44" r="4" fill="#A855F7" opacity="0.5"/>
      <text x="16" y="64" font-size="5" fill="currentColor" stroke="none">Hyphae</text>
    </svg>`
  },
  {
    id: 'inf-candida',
    name: 'Candida',
    domain: 'medicine',
    category: 'fungal',
    tags: ['candida', 'albicans', 'thrush', 'yeast', 'pseudohyphae'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="32" rx="8" ry="10" fill="#A855F7" opacity="0.4"/>
      <ellipse cx="16" cy="32" rx="8" ry="10"/>
      <ellipse cx="32" cy="28" rx="8" ry="10" fill="#A855F7" opacity="0.4"/>
      <ellipse cx="32" cy="28" rx="8" ry="10"/>
      <ellipse cx="48" cy="32" rx="8" ry="10" fill="#A855F7" opacity="0.4"/>
      <ellipse cx="48" cy="32" rx="8" ry="10"/>
      <path d="M24 32h-4"/>
      <path d="M40 30h-4"/>
      <text x="12" y="56" font-size="4" fill="currentColor" stroke="none">Candida</text>
    </svg>`
  },
  {
    id: 'inf-aspergillus',
    name: 'Aspergillus',
    domain: 'medicine',
    category: 'fungal',
    tags: ['aspergillus', 'fumigatus', 'aspergilloma', 'ABPA', 'invasive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 56V24" stroke-width="2"/>
      <path d="M32 24l-12-8"/>
      <path d="M32 24l12-8"/>
      <path d="M32 24v-12"/>
      <circle cx="20" cy="14" r="4" fill="#A855F7" opacity="0.5"/>
      <circle cx="44" cy="14" r="4" fill="#A855F7" opacity="0.5"/>
      <circle cx="32" cy="10" r="4" fill="#A855F7" opacity="0.5"/>
      <circle cx="26" cy="18" r="2" fill="#A855F7"/>
      <circle cx="38" cy="18" r="2" fill="#A855F7"/>
      <text x="8" y="64" font-size="4" fill="currentColor" stroke="none">Aspergillus</text>
    </svg>`
  },
  {
    id: 'inf-cryptococcus',
    name: 'Cryptococcus',
    domain: 'medicine',
    category: 'fungal',
    tags: ['cryptococcus', 'neoformans', 'meningitis', 'capsule', 'AIDS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#A855F7" opacity="0.2" stroke-dasharray="4 2"/>
      <circle cx="32" cy="32" r="12" fill="#A855F7" opacity="0.5"/>
      <circle cx="32" cy="32" r="12"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.5"/>
      <text x="6" y="60" font-size="4" fill="currentColor" stroke="none">Cryptococcus</text>
      <text x="40" y="16" font-size="3" fill="currentColor" stroke="none">capsule</text>
    </svg>`
  },
  {
    id: 'inf-pneumocystis',
    name: 'Pneumocystis jirovecii',
    domain: 'medicine',
    category: 'fungal',
    tags: ['pneumocystis', 'PJP', 'PCP', 'AIDS', 'immunocompromised'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="28" r="8" fill="#A855F7" opacity="0.3"/>
      <circle cx="24" cy="28" r="8"/>
      <circle cx="40" cy="24" r="6" fill="#A855F7" opacity="0.3"/>
      <circle cx="40" cy="24" r="6"/>
      <circle cx="32" cy="40" r="10" fill="#A855F7" opacity="0.3"/>
      <circle cx="32" cy="40" r="10"/>
      <circle cx="28" cy="40" r="2" fill="currentColor"/>
      <circle cx="36" cy="40" r="2" fill="currentColor"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Pneumocystis</text>
    </svg>`
  },
  {
    id: 'inf-malaria',
    name: 'Plasmodium (Malaria)',
    domain: 'medicine',
    category: 'parasitic',
    tags: ['malaria', 'plasmodium', 'falciparum', 'RBC', 'ring form'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#EF4444" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <circle cx="28" cy="28" r="8" fill="#4F46E5" opacity="0.4"/>
      <circle cx="28" cy="28" r="8"/>
      <circle cx="28" cy="28" r="3" fill="#4F46E5"/>
      <circle cx="40" cy="36" r="4" fill="#4F46E5" opacity="0.6"/>
      <text x="16" y="60" font-size="4" fill="currentColor" stroke="none">Malaria</text>
    </svg>`
  },
  {
    id: 'inf-toxoplasma',
    name: 'Toxoplasma gondii',
    domain: 'medicine',
    category: 'parasitic',
    tags: ['toxoplasma', 'gondii', 'toxoplasmosis', 'cat', 'pregnancy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 32c0-12 8-20 16-20s16 8 16 20-8 20-16 20-16-8-16-20z" fill="#10B981" opacity="0.3"/>
      <path d="M16 32c0-12 8-20 16-20s16 8 16 20"/>
      <path d="M48 32c0 12-8 20-16 20s-16-8-16-20"/>
      <circle cx="32" cy="24" r="4" fill="#10B981"/>
      <path d="M28 32c0 4 4 8 4 12"/>
      <path d="M36 32c0 4-4 8-4 12"/>
      <text x="10" y="60" font-size="4" fill="currentColor" stroke="none">Toxoplasma</text>
    </svg>`
  },
  {
    id: 'inf-giardia',
    name: 'Giardia',
    domain: 'medicine',
    category: 'parasitic',
    tags: ['giardia', 'lamblia', 'diarrhea', 'protozoa', 'waterborne'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="20" fill="#10B981" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="16" ry="20"/>
      <circle cx="26" cy="24" r="4" fill="currentColor" opacity="0.5"/>
      <circle cx="38" cy="24" r="4" fill="currentColor" opacity="0.5"/>
      <path d="M32 16v-8"/>
      <path d="M26 16l-4-6"/>
      <path d="M38 16l4-6"/>
      <path d="M32 52v6"/>
      <path d="M26 50l-4 6"/>
      <path d="M38 50l4 6"/>
      <path d="M20 36c8 4 16 4 24 0"/>
      <text x="16" y="64" font-size="5" fill="currentColor" stroke="none">Giardia</text>
    </svg>`
  },
  {
    id: 'inf-cryptosporidium',
    name: 'Cryptosporidium',
    domain: 'medicine',
    category: 'parasitic',
    tags: ['cryptosporidium', 'crypto', 'diarrhea', 'oocyst', 'waterborne'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#10B981" opacity="0.3"/>
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="10" stroke-dasharray="2 2"/>
      <circle cx="28" cy="28" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="36" cy="28" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="28" cy="36" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="36" cy="36" r="3" fill="currentColor" opacity="0.5"/>
      <text x="4" y="60" font-size="3" fill="currentColor" stroke="none">Cryptosporidium</text>
    </svg>`
  },

  // ===========================================================================
  // INFECTION SITES (15)
  // ===========================================================================
  {
    id: 'inf-pneumonia',
    name: 'Pneumonia',
    domain: 'medicine',
    category: 'infection-site',
    tags: ['pneumonia', 'lung', 'respiratory', 'CAP', 'HAP', 'consolidation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v12"/>
      <path d="M32 20c-16 4-20 16-20 28h20"/>
      <path d="M32 20c16 4 20 16 20 28h-20"/>
      <path d="M16 36c4 4 8 4 12 0" fill="#EF4444" opacity="0.5"/>
      <path d="M14 44c6 4 10 4 14 0" fill="#EF4444" opacity="0.5"/>
      <circle cx="20" cy="40" r="3" fill="#EF4444" opacity="0.6"/>
      <circle cx="26" cy="44" r="2" fill="#EF4444" opacity="0.6"/>
      <text x="12" y="60" font-size="4" fill="currentColor" stroke="none">Pneumonia</text>
    </svg>`
  },
  {
    id: 'inf-uti',
    name: 'Urinary Tract Infection',
    domain: 'medicine',
    category: 'infection-site',
    tags: ['UTI', 'urinary', 'cystitis', 'pyelonephritis', 'bladder'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="16" rx="8" ry="10" fill="#F59E0B" opacity="0.3"/>
      <ellipse cx="44" cy="16" rx="8" ry="10" fill="#F59E0B" opacity="0.3"/>
      <path d="M20 26v8"/>
      <path d="M44 26v8"/>
      <path d="M20 34c0 4 4 8 12 8s12-4 12-8"/>
      <ellipse cx="32" cy="48" rx="12" ry="8" fill="#EF4444" opacity="0.4"/>
      <ellipse cx="32" cy="48" rx="12" ry="8"/>
      <path d="M32 56v4"/>
      <text x="18" y="64" font-size="5" fill="currentColor" stroke="none">UTI</text>
    </svg>`
  },
  {
    id: 'inf-skin-soft-tissue',
    name: 'Skin/Soft Tissue Infection',
    domain: 'medicine',
    category: 'infection-site',
    tags: ['SSTI', 'skin', 'soft tissue', 'cellulitis', 'abscess', 'wound'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="8" fill="#FECACA" opacity="0.5"/>
      <rect x="8" y="8" width="48" height="48" rx="8"/>
      <ellipse cx="32" cy="32" rx="16" ry="12" fill="#EF4444" opacity="0.5"/>
      <ellipse cx="32" cy="32" rx="16" ry="12"/>
      <ellipse cx="32" cy="32" rx="8" ry="6" fill="#DC2626" opacity="0.6"/>
      <path d="M24 32c4 2 8 2 16 0" stroke-dasharray="2 2"/>
      <text x="18" y="60" font-size="5" fill="currentColor" stroke="none">SSTI</text>
    </svg>`
  },
  {
    id: 'inf-bacteremia',
    name: 'Bacteremia',
    domain: 'medicine',
    category: 'infection-site',
    tags: ['bacteremia', 'bloodstream', 'BSI', 'sepsis', 'blood'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-8 8-16 16-16 28s8 20 16 20 16-8 16-20-8-20-16-28z" fill="#DC2626" opacity="0.3"/>
      <path d="M32 8c-8 8-16 16-16 28s8 20 16 20 16-8 16-20-8-20-16-28z"/>
      <circle cx="24" cy="32" r="3" fill="#8B5CF6"/>
      <circle cx="36" cy="28" r="2" fill="#8B5CF6"/>
      <circle cx="32" cy="40" r="3" fill="#8B5CF6"/>
      <circle cx="40" cy="36" r="2" fill="#8B5CF6"/>
      <circle cx="28" cy="44" r="2" fill="#8B5CF6"/>
      <text x="10" y="64" font-size="4" fill="currentColor" stroke="none">Bacteremia</text>
    </svg>`
  },
  {
    id: 'inf-meningitis',
    name: 'Meningitis',
    domain: 'medicine',
    category: 'infection-site',
    tags: ['meningitis', 'CNS', 'CSF', 'brain', 'meninges', 'LP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="20" ry="16" fill="#F3F4F6" opacity="0.5"/>
      <ellipse cx="32" cy="28" rx="20" ry="16"/>
      <ellipse cx="32" cy="28" rx="16" ry="12" stroke-dasharray="3 2"/>
      <path d="M16 30c4 4 12 8 16 8s12-4 16-8" fill="#EF4444" opacity="0.4"/>
      <path d="M32 44v12"/>
      <path d="M28 56h8"/>
      <text x="12" y="64" font-size="4" fill="currentColor" stroke="none">Meningitis</text>
    </svg>`
  },
  {
    id: 'inf-endocarditis',
    name: 'Endocarditis',
    domain: 'medicine',
    category: 'infection-site',
    tags: ['endocarditis', 'IE', 'heart', 'valve', 'vegetation', 'Duke'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12c-12 0-20 10-20 22 0 14 20 22 20 22s20-8 20-22c0-12-8-22-20-22z" fill="#EF4444" opacity="0.3"/>
      <path d="M32 12c-12 0-20 10-20 22 0 14 20 22 20 22s20-8 20-22c0-12-8-22-20-22z"/>
      <ellipse cx="32" cy="32" rx="8" ry="4"/>
      <circle cx="36" cy="30" r="4" fill="#F59E0B"/>
      <circle cx="40" cy="32" r="3" fill="#F59E0B"/>
      <circle cx="38" cy="35" r="2" fill="#F59E0B"/>
      <text x="8" y="64" font-size="4" fill="currentColor" stroke="none">Endocarditis</text>
    </svg>`
  },
  {
    id: 'inf-osteomyelitis',
    name: 'Osteomyelitis',
    domain: 'medicine',
    category: 'infection-site',
    tags: ['osteomyelitis', 'bone', 'infection', 'sequestrum', 'involucrum'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="48" rx="4" fill="#F3F4F6" opacity="0.5"/>
      <rect x="20" y="8" width="24" height="48" rx="4"/>
      <rect x="26" y="12" width="12" height="40" rx="2" fill="#FEF3C7"/>
      <ellipse cx="32" cy="32" rx="8" ry="10" fill="#EF4444" opacity="0.5"/>
      <circle cx="30" cy="30" r="2" fill="#8B5CF6"/>
      <circle cx="34" cy="34" r="2" fill="#8B5CF6"/>
      <text x="4" y="64" font-size="4" fill="currentColor" stroke="none">Osteomyelitis</text>
    </svg>`
  },
  {
    id: 'inf-septic-arthritis',
    name: 'Septic Arthritis',
    domain: 'medicine',
    category: 'infection-site',
    tags: ['septic arthritis', 'joint', 'infection', 'synovial', 'effusion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="12" ry="8" fill="#F3F4F6"/>
      <ellipse cx="32" cy="48" rx="12" ry="8" fill="#F3F4F6"/>
      <ellipse cx="32" cy="32" rx="16" ry="12" fill="#EF4444" opacity="0.4"/>
      <ellipse cx="32" cy="32" rx="16" ry="12"/>
      <circle cx="28" cy="30" r="2" fill="#8B5CF6"/>
      <circle cx="36" cy="32" r="2" fill="#8B5CF6"/>
      <circle cx="32" cy="36" r="2" fill="#8B5CF6"/>
      <text x="4" y="64" font-size="3" fill="currentColor" stroke="none">Septic Arthritis</text>
    </svg>`
  },
  {
    id: 'inf-abscess',
    name: 'Abscess',
    domain: 'medicine',
    category: 'infection-site',
    tags: ['abscess', 'pus', 'collection', 'I&D', 'drainage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#FECACA" opacity="0.5"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="12" fill="#FDE68A" opacity="0.8"/>
      <circle cx="32" cy="32" r="12"/>
      <circle cx="32" cy="32" r="6" fill="#F59E0B"/>
      <path d="M20 20l-8-8"/>
      <path d="M44 20l8-8"/>
      <path d="M20 44l-8 8"/>
      <path d="M44 44l8 8"/>
      <text x="16" y="60" font-size="5" fill="currentColor" stroke="none">Abscess</text>
    </svg>`
  },
  {
    id: 'inf-cellulitis',
    name: 'Cellulitis',
    domain: 'medicine',
    category: 'infection-site',
    tags: ['cellulitis', 'skin', 'erythema', 'spreading', 'strep', 'staph'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 56V32c0-12 8-24 16-24s16 12 16 24v24" fill="#FECACA" opacity="0.3"/>
      <path d="M16 56V32c0-12 8-24 16-24s16 12 16 24v24"/>
      <ellipse cx="32" cy="40" rx="12" ry="8" fill="#EF4444" opacity="0.5"/>
      <path d="M24 36c4 4 12 4 16 0" stroke="#DC2626"/>
      <path d="M22 44c6 4 14 4 20 0" stroke="#DC2626"/>
      <path d="M28 48l-4 4"/>
      <path d="M36 48l4 4"/>
      <text x="14" y="64" font-size="4" fill="currentColor" stroke="none">Cellulitis</text>
    </svg>`
  },
  {
    id: 'inf-sinusitis',
    name: 'Sinusitis',
    domain: 'medicine',
    category: 'infection-site',
    tags: ['sinusitis', 'sinus', 'rhinosinusitis', 'maxillary', 'frontal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24" fill="#F3F4F6" opacity="0.5"/>
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <ellipse cx="22" cy="24" rx="6" ry="8" fill="#EF4444" opacity="0.4"/>
      <ellipse cx="42" cy="24" rx="6" ry="8" fill="#EF4444" opacity="0.4"/>
      <ellipse cx="22" cy="40" rx="8" ry="6" fill="#EF4444" opacity="0.4"/>
      <ellipse cx="42" cy="40" rx="8" ry="6" fill="#EF4444" opacity="0.4"/>
      <path d="M32 28v16"/>
      <text x="14" y="62" font-size="4" fill="currentColor" stroke="none">Sinusitis</text>
    </svg>`
  },
  {
    id: 'inf-pharyngitis',
    name: 'Pharyngitis',
    domain: 'medicine',
    category: 'infection-site',
    tags: ['pharyngitis', 'throat', 'strep throat', 'tonsillitis', 'sore throat'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8h24v20c0 8-4 16-12 16s-12-8-12-16V8z" fill="#FECACA" opacity="0.3"/>
      <path d="M20 8h24v20c0 8-4 16-12 16s-12-8-12-16V8z"/>
      <ellipse cx="26" cy="20" rx="4" ry="6" fill="#EF4444" opacity="0.6"/>
      <ellipse cx="38" cy="20" rx="4" ry="6" fill="#EF4444" opacity="0.6"/>
      <path d="M32 32v24"/>
      <path d="M24 56h16"/>
      <text x="10" y="64" font-size="4" fill="currentColor" stroke="none">Pharyngitis</text>
    </svg>`
  },
  {
    id: 'inf-peritonitis',
    name: 'Peritonitis',
    domain: 'medicine',
    category: 'infection-site',
    tags: ['peritonitis', 'abdomen', 'peritoneal', 'SBP', 'secondary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="22" ry="18" fill="#FECACA" opacity="0.3"/>
      <ellipse cx="32" cy="36" rx="22" ry="18"/>
      <ellipse cx="32" cy="36" rx="16" ry="12" fill="#EF4444" opacity="0.3"/>
      <path d="M20 32c4-4 8-4 12 0s8 4 12 0"/>
      <path d="M18 40c5-4 10-4 14 0s10 4 14 0"/>
      <circle cx="24" cy="36" r="2" fill="#8B5CF6"/>
      <circle cx="36" cy="34" r="2" fill="#8B5CF6"/>
      <circle cx="40" cy="40" r="2" fill="#8B5CF6"/>
      <text x="10" y="62" font-size="4" fill="currentColor" stroke="none">Peritonitis</text>
    </svg>`
  },
  {
    id: 'inf-encephalitis',
    name: 'Encephalitis',
    domain: 'medicine',
    category: 'infection-site',
    tags: ['encephalitis', 'brain', 'CNS', 'viral', 'HSV', 'inflammation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="22" ry="18" fill="#FECACA" opacity="0.4"/>
      <ellipse cx="32" cy="28" rx="22" ry="18"/>
      <path d="M16 24c4-4 8 0 12-4s8 0 12-4 8 0 8 4"/>
      <path d="M14 32c6-4 10 0 14-4s8 0 12-4 8 4 10 0"/>
      <circle cx="24" cy="26" r="3" fill="#EF4444" opacity="0.6"/>
      <circle cx="40" cy="30" r="3" fill="#EF4444" opacity="0.6"/>
      <path d="M32 46v10"/>
      <text x="8" y="64" font-size="4" fill="currentColor" stroke="none">Encephalitis</text>
    </svg>`
  },
  {
    id: 'inf-wound-infection',
    name: 'Wound Infection',
    domain: 'medicine',
    category: 'infection-site',
    tags: ['wound', 'surgical site', 'SSI', 'post-op', 'dehiscence'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="4" fill="#FECACA" opacity="0.3"/>
      <rect x="12" y="16" width="40" height="32" rx="4"/>
      <path d="M24 20v24" stroke-width="2"/>
      <path d="M40 20v24" stroke-width="2"/>
      <path d="M24 24h16"/>
      <path d="M24 32h16"/>
      <path d="M24 40h16"/>
      <ellipse cx="32" cy="32" rx="6" ry="8" fill="#EF4444" opacity="0.5"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Wound Inf.</text>
    </svg>`
  },

  // ===========================================================================
  // IMMUNE RESPONSE (10)
  // ===========================================================================
  {
    id: 'inf-antibody',
    name: 'Antibody (IgG)',
    domain: 'medicine',
    category: 'immune',
    tags: ['antibody', 'IgG', 'immunoglobulin', 'humoral', 'B cell'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 32v20"/>
      <path d="M32 32l-16-16"/>
      <path d="M32 32l16-16"/>
      <circle cx="16" cy="16" r="8" fill="#3B82F6" opacity="0.4"/>
      <circle cx="16" cy="16" r="8"/>
      <circle cx="48" cy="16" r="8" fill="#3B82F6" opacity="0.4"/>
      <circle cx="48" cy="16" r="8"/>
      <circle cx="32" cy="52" r="4" fill="#3B82F6" opacity="0.4"/>
      <text x="14" y="62" font-size="4" fill="currentColor" stroke="none">Antibody</text>
    </svg>`
  },
  {
    id: 'inf-t-cell',
    name: 'T Cell (CD4/CD8)',
    domain: 'medicine',
    category: 'immune',
    tags: ['T cell', 'CD4', 'CD8', 'lymphocyte', 'cellular immunity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#10B981" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <circle cx="32" cy="32" r="10" fill="#10B981" opacity="0.5"/>
      <path d="M24 24l16 16"/>
      <path d="M40 24l-16 16"/>
      <text x="20" y="58" font-size="5" fill="currentColor" stroke="none">T Cell</text>
    </svg>`
  },
  {
    id: 'inf-b-cell',
    name: 'B Cell',
    domain: 'medicine',
    category: 'immune',
    tags: ['B cell', 'lymphocyte', 'plasma cell', 'antibody', 'humoral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#3B82F6" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <circle cx="32" cy="32" r="10" fill="#3B82F6" opacity="0.5"/>
      <path d="M32 14v-6l-4 3 4-3 4 3"/>
      <path d="M46 24l4-4-3 1 3-1-1 3"/>
      <path d="M46 40l4 4-1-3 1 3-3-1"/>
      <text x="20" y="58" font-size="5" fill="currentColor" stroke="none">B Cell</text>
    </svg>`
  },
  {
    id: 'inf-macrophage',
    name: 'Macrophage',
    domain: 'medicine',
    category: 'immune',
    tags: ['macrophage', 'phagocyte', 'APC', 'innate', 'monocyte'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12c-16 0-20 12-20 20s4 20 20 20 20-12 20-20-4-20-20-20z" fill="#F59E0B" opacity="0.3"/>
      <path d="M32 12c-16 0-20 12-20 20s4 20 20 20 20-12 20-20-4-20-20-20z"/>
      <path d="M16 28c4-4 8-4 12 0"/>
      <path d="M36 28c4-4 8-4 12 0"/>
      <circle cx="28" cy="36" r="4" fill="#8B5CF6" opacity="0.6"/>
      <circle cx="38" cy="38" r="3" fill="#8B5CF6" opacity="0.6"/>
      <text x="10" y="60" font-size="4" fill="currentColor" stroke="none">Macrophage</text>
    </svg>`
  },
  {
    id: 'inf-neutrophil',
    name: 'Neutrophil',
    domain: 'medicine',
    category: 'immune',
    tags: ['neutrophil', 'PMN', 'granulocyte', 'phagocyte', 'innate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#8B5CF6" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <circle cx="24" cy="28" r="6" fill="#4F46E5" opacity="0.5"/>
      <circle cx="36" cy="26" r="5" fill="#4F46E5" opacity="0.5"/>
      <circle cx="38" cy="38" r="6" fill="#4F46E5" opacity="0.5"/>
      <path d="M28 34l4-2 4 4"/>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Neutrophil</text>
    </svg>`
  },
  {
    id: 'inf-cytokines',
    name: 'Cytokines',
    domain: 'medicine',
    category: 'immune',
    tags: ['cytokines', 'interleukin', 'IL-6', 'TNF', 'interferon', 'inflammation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" fill="#EF4444" opacity="0.4"/>
      <circle cx="32" cy="32" r="8"/>
      <path d="M32 24v-12"/>
      <circle cx="32" cy="10" r="3" fill="#EF4444"/>
      <path d="M40 28l8-8"/>
      <circle cx="50" cy="18" r="3" fill="#EF4444"/>
      <path d="M40 36l8 8"/>
      <circle cx="50" cy="46" r="3" fill="#EF4444"/>
      <path d="M32 40v12"/>
      <circle cx="32" cy="54" r="3" fill="#EF4444"/>
      <path d="M24 36l-8 8"/>
      <circle cx="14" cy="46" r="3" fill="#EF4444"/>
      <path d="M24 28l-8-8"/>
      <circle cx="14" cy="18" r="3" fill="#EF4444"/>
      <text x="12" y="64" font-size="4" fill="currentColor" stroke="none">Cytokines</text>
    </svg>`
  },
  {
    id: 'inf-complement',
    name: 'Complement System',
    domain: 'medicine',
    category: 'immune',
    tags: ['complement', 'MAC', 'C3', 'C5', 'opsonization', 'lysis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#F59E0B" opacity="0.2"/>
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="4" fill="#F59E0B"/>
      <path d="M32 16v-8"/>
      <path d="M44 20l6-6"/>
      <path d="M48 32h8"/>
      <path d="M44 44l6 6"/>
      <path d="M32 48v8"/>
      <path d="M20 44l-6 6"/>
      <path d="M16 32h-8"/>
      <path d="M20 20l-6-6"/>
      <text x="10" y="64" font-size="4" fill="currentColor" stroke="none">Complement</text>
    </svg>`
  },
  {
    id: 'inf-inflammatory',
    name: 'Inflammatory Response',
    domain: 'medicine',
    category: 'immune',
    tags: ['inflammation', 'inflammatory', 'redness', 'swelling', 'heat', 'pain'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#EF4444" opacity="0.3"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="12" fill="#EF4444" opacity="0.4"/>
      <path d="M32 8v8"/>
      <path d="M32 48v8"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <path d="M18 18l6 6"/>
      <path d="M40 40l6 6"/>
      <path d="M40 18l-6 6"/>
      <path d="M24 40l-6 6"/>
      <text x="6" y="64" font-size="4" fill="currentColor" stroke="none">Inflammation</text>
    </svg>`
  },
  {
    id: 'inf-natural-killer',
    name: 'Natural Killer Cell',
    domain: 'medicine',
    category: 'immune',
    tags: ['NK cell', 'natural killer', 'innate', 'cytotoxic', 'lymphocyte'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#DC2626" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <circle cx="32" cy="32" r="10" fill="#DC2626" opacity="0.5"/>
      <polygon points="32,22 35,30 44,30 37,36 40,44 32,39 24,44 27,36 20,30 29,30" fill="#DC2626"/>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">NK Cell</text>
    </svg>`
  },
  {
    id: 'inf-dendritic-cell',
    name: 'Dendritic Cell',
    domain: 'medicine',
    category: 'immune',
    tags: ['dendritic', 'APC', 'antigen presenting', 'DC', 'innate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="10" fill="#F59E0B" opacity="0.4"/>
      <circle cx="32" cy="32" r="10"/>
      <path d="M32 22v-14"/>
      <path d="M40 26l10-10"/>
      <path d="M42 32h14"/>
      <path d="M40 38l10 10"/>
      <path d="M32 42v14"/>
      <path d="M24 38l-10 10"/>
      <path d="M22 32h-14"/>
      <path d="M24 26l-10-10"/>
      <circle cx="32" cy="32" r="4" fill="#F59E0B"/>
      <text x="8" y="64" font-size="3" fill="currentColor" stroke="none">Dendritic Cell</text>
    </svg>`
  },

  // ===========================================================================
  // ANTIMICROBIALS (12)
  // ===========================================================================
  {
    id: 'inf-antibiotic-pill',
    name: 'Antibiotic Pill',
    domain: 'medicine',
    category: 'antimicrobial',
    tags: ['antibiotic', 'pill', 'oral', 'medication', 'capsule'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="24" rx="12" fill="#3B82F6" opacity="0.4"/>
      <rect x="16" y="20" width="32" height="24" rx="12"/>
      <line x1="32" y1="20" x2="32" y2="44"/>
      <rect x="16" y="20" width="16" height="24" rx="12" fill="#3B82F6" opacity="0.6"/>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Antibiotic</text>
    </svg>`
  },
  {
    id: 'inf-iv-antibiotic',
    name: 'IV Antibiotic',
    domain: 'medicine',
    category: 'antimicrobial',
    tags: ['IV', 'intravenous', 'antibiotic', 'infusion', 'drip'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="32" rx="2" fill="#3B82F6" opacity="0.3"/>
      <rect x="20" y="8" width="24" height="32" rx="2"/>
      <path d="M32 40v16"/>
      <path d="M28 56h8"/>
      <path d="M26 16h12"/>
      <path d="M26 24h12"/>
      <path d="M26 32h12"/>
      <circle cx="32" cy="48" r="2" fill="#3B82F6"/>
      <text x="20" y="64" font-size="5" fill="currentColor" stroke="none">IV Abx</text>
    </svg>`
  },
  {
    id: 'inf-beta-lactam',
    name: 'Beta-Lactam Ring',
    domain: 'medicine',
    category: 'antimicrobial',
    tags: ['beta-lactam', 'penicillin', 'cephalosporin', 'carbapenem', 'cell wall'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,16 48,28 48,44 32,56 16,44 16,28" fill="#10B981" opacity="0.3"/>
      <polygon points="32,16 48,28 48,44 32,56 16,44 16,28"/>
      <rect x="26" y="30" width="12" height="12" fill="#10B981" opacity="0.5"/>
      <rect x="26" y="30" width="12" height="12"/>
      <text x="29" y="40" font-size="6" fill="currentColor" stroke="none">B</text>
      <text x="10" y="64" font-size="4" fill="currentColor" stroke="none">Beta-Lactam</text>
    </svg>`
  },
  {
    id: 'inf-antiviral',
    name: 'Antiviral',
    domain: 'medicine',
    category: 'antimicrobial',
    tags: ['antiviral', 'acyclovir', 'oseltamivir', 'viral', 'inhibitor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="16" fill="#EF4444" opacity="0.2"/>
      <circle cx="32" cy="28" r="16"/>
      <path d="M20 28l24 0" stroke-width="3" stroke="#EF4444"/>
      <path d="M32 16v24" stroke-width="3" stroke="#EF4444"/>
      <rect x="24" y="48" width="16" height="8" rx="2" fill="#8B5CF6" opacity="0.5"/>
      <rect x="24" y="48" width="16" height="8" rx="2"/>
      <text x="16" y="64" font-size="4" fill="currentColor" stroke="none">Antiviral</text>
    </svg>`
  },
  {
    id: 'inf-antifungal',
    name: 'Antifungal',
    domain: 'medicine',
    category: 'antimicrobial',
    tags: ['antifungal', 'fluconazole', 'amphotericin', 'azole', 'echinocandin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="12" ry="8" fill="#A855F7" opacity="0.3"/>
      <ellipse cx="32" cy="24" rx="12" ry="8"/>
      <path d="M20 24v20c0 4 6 8 12 8s12-4 12-8V24"/>
      <path d="M24 28l16 0" stroke="#A855F7" stroke-width="2"/>
      <path d="M24 36l16 0" stroke="#A855F7" stroke-width="2"/>
      <path d="M24 44l16 0" stroke="#A855F7" stroke-width="2"/>
      <text x="12" y="64" font-size="4" fill="currentColor" stroke="none">Antifungal</text>
    </svg>`
  },
  {
    id: 'inf-cell-wall-inhibitor',
    name: 'Cell Wall Inhibitor',
    domain: 'medicine',
    category: 'antimicrobial',
    tags: ['cell wall', 'mechanism', 'penicillin', 'vancomycin', 'synthesis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" stroke-dasharray="4 4" fill="#F59E0B" opacity="0.2"/>
      <circle cx="32" cy="32" r="12" fill="#F59E0B" opacity="0.4"/>
      <circle cx="32" cy="32" r="12"/>
      <path d="M32 14v-6"/>
      <path d="M44 20l4-4"/>
      <path d="M50 32h6"/>
      <path d="M44 44l4 4"/>
      <path d="M32 50v6"/>
      <path d="M20 44l-4 4"/>
      <path d="M14 32h-6"/>
      <path d="M20 20l-4-4"/>
      <text x="6" y="64" font-size="3" fill="currentColor" stroke="none">Cell Wall Inhib</text>
    </svg>`
  },
  {
    id: 'inf-protein-synthesis-inhib',
    name: 'Protein Synthesis Inhibitor',
    domain: 'medicine',
    category: 'antimicrobial',
    tags: ['protein synthesis', 'ribosome', 'aminoglycoside', 'macrolide', '30S', '50S'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="16" ry="8" fill="#3B82F6" opacity="0.4"/>
      <ellipse cx="32" cy="24" rx="16" ry="8"/>
      <ellipse cx="32" cy="40" rx="12" ry="6" fill="#10B981" opacity="0.4"/>
      <ellipse cx="32" cy="40" rx="12" ry="6"/>
      <path d="M32 32v-8"/>
      <path d="M24 28l16 0" stroke="#EF4444" stroke-width="2"/>
      <text x="44" y="26" font-size="4" fill="currentColor" stroke="none">50S</text>
      <text x="44" y="42" font-size="4" fill="currentColor" stroke="none">30S</text>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Protein Synth</text>
    </svg>`
  },
  {
    id: 'inf-dna-synthesis-inhib',
    name: 'DNA Synthesis Inhibitor',
    domain: 'medicine',
    category: 'antimicrobial',
    tags: ['DNA synthesis', 'fluoroquinolone', 'gyrase', 'topoisomerase', 'replication'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 12v40" stroke-width="2"/>
      <path d="M44 12v40" stroke-width="2"/>
      <path d="M20 16h24"/>
      <path d="M20 24h24"/>
      <path d="M20 32h24"/>
      <path d="M20 40h24"/>
      <path d="M20 48h24"/>
      <path d="M28 28l8 8" stroke="#EF4444" stroke-width="3"/>
      <path d="M36 28l-8 8" stroke="#EF4444" stroke-width="3"/>
      <text x="6" y="62" font-size="3" fill="currentColor" stroke="none">DNA Synth Inhib</text>
    </svg>`
  },
  {
    id: 'inf-folate-inhibitor',
    name: 'Folate Synthesis Inhibitor',
    domain: 'medicine',
    category: 'antimicrobial',
    tags: ['folate', 'TMP-SMX', 'sulfonamide', 'trimethoprim', 'DHFR'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,12 52,24 52,40 32,52 12,40 12,24" fill="#F59E0B" opacity="0.3"/>
      <polygon points="32,12 52,24 52,40 32,52 12,40 12,24"/>
      <path d="M24 28l16 0"/>
      <path d="M20 36l24 0"/>
      <circle cx="32" cy="32" r="6" fill="#F59E0B" opacity="0.5"/>
      <path d="M26 32l12 0" stroke="#EF4444" stroke-width="2"/>
      <text x="10" y="64" font-size="3" fill="currentColor" stroke="none">Folate Inhib</text>
    </svg>`
  },
  {
    id: 'inf-resistance-mechanism',
    name: 'Resistance Mechanism',
    domain: 'medicine',
    category: 'antimicrobial',
    tags: ['resistance', 'MDR', 'ESBL', 'efflux', 'beta-lactamase'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#EF4444" opacity="0.2"/>
      <circle cx="32" cy="32" r="18"/>
      <path d="M20 20l24 24" stroke-width="3" stroke="#EF4444"/>
      <path d="M44 20l-24 24" stroke-width="3" stroke="#EF4444"/>
      <rect x="24" y="28" width="16" height="8" rx="2" fill="#3B82F6" opacity="0.5"/>
      <text x="10" y="60" font-size="4" fill="currentColor" stroke="none">Resistance</text>
    </svg>`
  },
  {
    id: 'inf-vancomycin',
    name: 'Vancomycin',
    domain: 'medicine',
    category: 'antimicrobial',
    tags: ['vancomycin', 'glycopeptide', 'MRSA', 'gram positive', 'trough'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="12" width="24" height="36" rx="2" fill="#DC2626" opacity="0.3"/>
      <rect x="20" y="12" width="24" height="36" rx="2"/>
      <path d="M32 48v8"/>
      <path d="M28 56h8"/>
      <text x="24" y="28" font-size="6" fill="currentColor" stroke="none">V</text>
      <text x="22" y="40" font-size="4" fill="currentColor" stroke="none">anc</text>
      <text x="18" y="64" font-size="4" fill="currentColor" stroke="none">Vanc</text>
    </svg>`
  },
  {
    id: 'inf-broad-spectrum',
    name: 'Broad Spectrum Antibiotic',
    domain: 'medicine',
    category: 'antimicrobial',
    tags: ['broad spectrum', 'empiric', 'coverage', 'carbapenem', 'piperacillin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#10B981" opacity="0.2"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="12" fill="#10B981" opacity="0.3"/>
      <circle cx="32" cy="32" r="12"/>
      <circle cx="32" cy="32" r="4" fill="#10B981"/>
      <path d="M32 12v-4"/>
      <path d="M48 24l3-3"/>
      <path d="M52 32h4"/>
      <path d="M48 40l3 3"/>
      <path d="M32 52v4"/>
      <path d="M16 40l-3 3"/>
      <path d="M12 32h-4"/>
      <path d="M16 24l-3-3"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Broad Spectrum</text>
    </svg>`
  },

  // ===========================================================================
  // EQUIPMENT/DIAGNOSTICS (11)
  // ===========================================================================
  {
    id: 'inf-culture-plate',
    name: 'Culture Plate',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['culture', 'plate', 'agar', 'petri dish', 'bacterial culture'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="8" fill="#FDE68A" opacity="0.5"/>
      <ellipse cx="32" cy="32" rx="24" ry="8"/>
      <ellipse cx="32" cy="28" rx="24" ry="8"/>
      <path d="M8 28v4"/>
      <path d="M56 28v4"/>
      <circle cx="20" cy="30" r="4" fill="#8B5CF6" opacity="0.6"/>
      <circle cx="36" cy="28" r="5" fill="#8B5CF6" opacity="0.6"/>
      <circle cx="46" cy="32" r="3" fill="#8B5CF6" opacity="0.6"/>
      <text x="10" y="52" font-size="4" fill="currentColor" stroke="none">Culture Plate</text>
    </svg>`
  },
  {
    id: 'inf-gram-stain',
    name: 'Gram Stain',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['gram stain', 'microscopy', 'smear', 'purple', 'pink'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="2" fill="#F3F4F6"/>
      <rect x="12" y="16" width="40" height="32" rx="2"/>
      <circle cx="24" cy="28" r="3" fill="#8B5CF6"/>
      <circle cx="32" cy="26" r="3" fill="#8B5CF6"/>
      <circle cx="28" cy="34" r="3" fill="#8B5CF6"/>
      <ellipse cx="42" cy="30" rx="4" ry="2" fill="#EC4899"/>
      <ellipse cx="38" cy="38" rx="5" ry="2" fill="#EC4899"/>
      <ellipse cx="48" cy="36" rx="4" ry="2" fill="#EC4899"/>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Gram Stain</text>
    </svg>`
  },
  {
    id: 'inf-pcr',
    name: 'PCR Test',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['PCR', 'molecular', 'NAAT', 'amplification', 'DNA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="40" rx="2" fill="#3B82F6" opacity="0.2"/>
      <rect x="20" y="8" width="24" height="40" rx="2"/>
      <path d="M26 16v8c0 2 2 4 6 4s6-2 6-4v-8"/>
      <path d="M26 32v8c0 2 2 4 6 4s6-2 6-4v-8"/>
      <circle cx="32" cy="20" r="2" fill="#3B82F6"/>
      <circle cx="32" cy="36" r="2" fill="#3B82F6"/>
      <path d="M32 48v8"/>
      <text x="20" y="64" font-size="5" fill="currentColor" stroke="none">PCR</text>
    </svg>`
  },
  {
    id: 'inf-blood-culture',
    name: 'Blood Culture Bottle',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['blood culture', 'bacteremia', 'bottle', 'aerobic', 'anaerobic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="8" rx="2" fill="#6B7280"/>
      <path d="M20 16h24v32c0 4-4 8-12 8s-12-4-12-8V16z" fill="#DC2626" opacity="0.3"/>
      <path d="M20 16h24v32c0 4-4 8-12 8s-12-4-12-8V16z"/>
      <path d="M20 24h24"/>
      <path d="M20 36h24" stroke-dasharray="2 2"/>
      <text x="12" y="64" font-size="3" fill="currentColor" stroke="none">Blood Culture</text>
    </svg>`
  },
  {
    id: 'inf-lumbar-puncture',
    name: 'Lumbar Puncture',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['lumbar puncture', 'LP', 'CSF', 'spinal tap', 'meningitis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 16c0 8-8 16-8 32h32c0-16-8-24-8-32" fill="#F3F4F6" opacity="0.5"/>
      <path d="M24 16c0 8-8 16-8 32"/>
      <path d="M40 16c0 8 8 16 8 32"/>
      <path d="M16 48h32"/>
      <path d="M32 8v20" stroke-width="2"/>
      <path d="M32 28v20" stroke-width="2" stroke="#3B82F6"/>
      <circle cx="32" cy="8" r="3"/>
      <path d="M28 32h8"/>
      <path d="M28 40h8"/>
      <text x="20" y="60" font-size="5" fill="currentColor" stroke="none">LP</text>
    </svg>`
  },
  {
    id: 'inf-wound-swab',
    name: 'Wound Swab',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['swab', 'wound', 'culture', 'specimen', 'collection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v40" stroke-width="2"/>
      <ellipse cx="32" cy="52" rx="6" ry="4" fill="#F3F4F6"/>
      <ellipse cx="32" cy="52" rx="6" ry="4"/>
      <circle cx="32" cy="8" r="3"/>
      <rect x="20" y="24" width="24" height="8" rx="2" fill="#FECACA" opacity="0.5"/>
      <rect x="20" y="24" width="24" height="8" rx="2"/>
      <text x="14" y="64" font-size="4" fill="currentColor" stroke="none">Wound Swab</text>
    </svg>`
  },
  {
    id: 'inf-isolation-precautions',
    name: 'Isolation Precautions',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['isolation', 'precautions', 'contact', 'droplet', 'airborne'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="#F59E0B" opacity="0.2"/>
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <circle cx="32" cy="28" r="10"/>
      <path d="M26 26c2 2 4 2 6 0s4-2 6 0"/>
      <circle cx="28" cy="24" r="2" fill="currentColor"/>
      <circle cx="36" cy="24" r="2" fill="currentColor"/>
      <path d="M24 40v8"/>
      <path d="M40 40v8"/>
      <path d="M32 38v12"/>
      <text x="14" y="64" font-size="4" fill="currentColor" stroke="none">Isolation</text>
    </svg>`
  },
  {
    id: 'inf-ppe',
    name: 'Personal Protective Equipment',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['PPE', 'gown', 'gloves', 'mask', 'protection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="10" fill="#3B82F6" opacity="0.3"/>
      <circle cx="32" cy="16" r="10"/>
      <path d="M24 12h16"/>
      <path d="M26 16h12"/>
      <path d="M22 26v24c0 4 4 8 10 8s10-4 10-8V26"/>
      <path d="M22 26c-8 0-10 4-10 8v8"/>
      <path d="M42 26c8 0 10 4 10 8v8"/>
      <path d="M12 42h8"/>
      <path d="M44 42h8"/>
      <text x="18" y="64" font-size="5" fill="currentColor" stroke="none">PPE</text>
    </svg>`
  },
  {
    id: 'inf-microscope',
    name: 'Microscope',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['microscope', 'microscopy', 'lab', 'pathology', 'examination'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v20"/>
      <circle cx="32" cy="8" r="4"/>
      <ellipse cx="32" cy="32" rx="8" ry="4" fill="#3B82F6" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="8" ry="4"/>
      <path d="M32 36v12"/>
      <rect x="24" y="48" width="16" height="4" rx="1"/>
      <rect x="16" y="52" width="32" height="4" rx="1" fill="#6B7280" opacity="0.5"/>
      <path d="M20 32h-8"/>
      <path d="M52 32h-8"/>
      <text x="12" y="64" font-size="4" fill="currentColor" stroke="none">Microscope</text>
    </svg>`
  },
  {
    id: 'inf-sensitivity-test',
    name: 'Sensitivity Testing',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['sensitivity', 'susceptibility', 'MIC', 'antibiogram', 'disc diffusion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="#FDE68A" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <circle cx="20" cy="24" r="4" fill="#F3F4F6"/>
      <circle cx="20" cy="24" r="8" stroke-dasharray="2 2" stroke="#10B981"/>
      <circle cx="40" cy="24" r="4" fill="#F3F4F6"/>
      <circle cx="40" cy="24" r="6" stroke-dasharray="2 2" stroke="#F59E0B"/>
      <circle cx="28" cy="40" r="4" fill="#F3F4F6"/>
      <circle cx="28" cy="40" r="4" stroke="#EF4444"/>
      <circle cx="44" cy="38" r="4" fill="#F3F4F6"/>
      <circle cx="44" cy="38" r="10" stroke-dasharray="2 2" stroke="#10B981"/>
      <text x="10" y="60" font-size="3" fill="currentColor" stroke="none">Sensitivity</text>
    </svg>`
  },
  {
    id: 'inf-rapid-antigen',
    name: 'Rapid Antigen Test',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['rapid test', 'antigen', 'POC', 'lateral flow', 'quick test'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" rx="4" fill="#F3F4F6"/>
      <rect x="8" y="20" width="48" height="24" rx="4"/>
      <rect x="16" y="28" width="32" height="8" rx="2" fill="#FECACA" opacity="0.3"/>
      <rect x="16" y="28" width="32" height="8" rx="2"/>
      <path d="M24 28v8" stroke="#EF4444" stroke-width="2"/>
      <path d="M40 28v8" stroke="#EF4444" stroke-width="2"/>
      <circle cx="12" cy="32" r="2" fill="#3B82F6"/>
      <text x="22" y="26" font-size="3" fill="currentColor" stroke="none">C</text>
      <text x="38" y="26" font-size="3" fill="currentColor" stroke="none">T</text>
      <text x="12" y="52" font-size="3" fill="currentColor" stroke="none">Rapid Antigen</text>
    </svg>`
  },

  // ===========================================================================
  // PPE EQUIPMENT (6)
  // ===========================================================================
  {
    id: 'inf-n95-mask',
    name: 'N95 Respirator',
    domain: 'medicine',
    category: 'ppe',
    tags: ['N95', 'respirator', 'mask', 'PPE', 'airborne', 'protection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 24c0-8 10-16 20-16s20 8 20 16v8c0 12-8 20-20 20s-20-8-20-20v-8z" fill="#F3F4F6"/>
      <path d="M12 24c0-8 10-16 20-16s20 8 20 16v8c0 12-8 20-20 20s-20-8-20-20v-8z"/>
      <path d="M22 28h20"/>
      <path d="M22 36h20"/>
      <circle cx="32" cy="32" r="4" fill="#3B82F6" opacity="0.3"/>
      <path d="M12 24c-4 0-6-2-6-2"/>
      <path d="M52 24c4 0 6-2 6-2"/>
      <text x="20" y="60" font-size="4" fill="currentColor" stroke="none">N95</text>
    </svg>`
  },
  {
    id: 'inf-surgical-mask',
    name: 'Surgical Mask',
    domain: 'medicine',
    category: 'ppe',
    tags: ['surgical mask', 'mask', 'droplet', 'PPE', 'protection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="10" y="20" width="44" height="24" rx="4" fill="#93C5FD" opacity="0.4"/>
      <rect x="10" y="20" width="44" height="24" rx="4"/>
      <path d="M10 28h44"/>
      <path d="M10 36h44"/>
      <path d="M10 24l-4-4"/>
      <path d="M10 40l-4 4"/>
      <path d="M54 24l4-4"/>
      <path d="M54 40l4 4"/>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Surgical Mask</text>
    </svg>`
  },
  {
    id: 'inf-isolation-gown',
    name: 'Isolation Gown',
    domain: 'medicine',
    category: 'ppe',
    tags: ['gown', 'isolation', 'PPE', 'contact', 'protection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8h24l4 12v32c0 4-2 4-6 4H22c-4 0-6 0-6-4V20l4-12z" fill="#FDE68A" opacity="0.4"/>
      <path d="M20 8h24l4 12v32c0 4-2 4-6 4H22c-4 0-6 0-6-4V20l4-12z"/>
      <path d="M14 20l-8 4v20l8 4"/>
      <path d="M50 20l8 4v20l-8 4"/>
      <path d="M28 8v8"/>
      <path d="M36 8v8"/>
      <text x="8" y="64" font-size="4" fill="currentColor" stroke="none">Isolation Gown</text>
    </svg>`
  },
  {
    id: 'inf-gloves',
    name: 'Medical Gloves',
    domain: 'medicine',
    category: 'ppe',
    tags: ['gloves', 'nitrile', 'latex', 'PPE', 'contact', 'protection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 56V32l-4-16v-4c0-2 2-4 4-4h4l4 8 4-8h4c2 0 4 2 4 4v4l-4 16v24c0 2-2 4-4 4H20c-2 0-4-2-4-4z" fill="#A5B4FC" opacity="0.4"/>
      <path d="M16 56V32l-4-16v-4c0-2 2-4 4-4h4l4 8 4-8h4c2 0 4 2 4 4v4l-4 16v24c0 2-2 4-4 4H20c-2 0-4-2-4-4z"/>
      <path d="M40 56V32l4-16v-4c0-2 2-4 4-4h4l4 8 4-8h4c2 0 4 2 4 4v4l-4 16v24c0 2-2 4-4 4H44c-2 0-4-2-4-4z" fill="#A5B4FC" opacity="0.4"/>
      <path d="M40 56V32l4-16v-4c0-2 2-4 4-4h4l4 8 4-8h4c2 0 4 2 4 4v4l-4 16v24c0 2-2 4-4 4H44c-2 0-4-2-4-4z"/>
      <text x="20" y="64" font-size="4" fill="currentColor" stroke="none">Gloves</text>
    </svg>`
  },
  {
    id: 'inf-face-shield',
    name: 'Face Shield',
    domain: 'medicine',
    category: 'ppe',
    tags: ['face shield', 'visor', 'PPE', 'droplet', 'eye protection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="8" rx="2" fill="#6B7280"/>
      <rect x="8" y="8" width="48" height="8" rx="2"/>
      <path d="M8 16c0 24 8 36 24 36s24-12 24-36" fill="#93C5FD" opacity="0.3"/>
      <path d="M8 16c0 24 8 36 24 36s24-12 24-36"/>
      <circle cx="24" cy="32" r="4" fill="#F3F4F6"/>
      <circle cx="40" cy="32" r="4" fill="#F3F4F6"/>
      <text x="8" y="62" font-size="4" fill="currentColor" stroke="none">Face Shield</text>
    </svg>`
  },
  {
    id: 'inf-papr',
    name: 'PAPR Hood',
    domain: 'medicine',
    category: 'ppe',
    tags: ['PAPR', 'powered air', 'respirator', 'hood', 'airborne', 'high-risk'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="18" ry="16" fill="#FDE68A" opacity="0.3"/>
      <ellipse cx="32" cy="24" rx="18" ry="16"/>
      <path d="M14 24v24c0 4 8 8 18 8s18-4 18-8V24"/>
      <rect x="24" y="16" width="16" height="12" rx="2" fill="#93C5FD" opacity="0.5"/>
      <rect x="24" y="16" width="16" height="12" rx="2"/>
      <path d="M32 40v8"/>
      <circle cx="32" cy="52" r="4" fill="#6B7280"/>
      <text x="18" y="64" font-size="4" fill="currentColor" stroke="none">PAPR</text>
    </svg>`
  },

  // ===========================================================================
  // TRANSMISSION VECTORS (6)
  // ===========================================================================
  {
    id: 'inf-mosquito-vector',
    name: 'Mosquito Vector',
    domain: 'medicine',
    category: 'transmission',
    tags: ['mosquito', 'vector', 'malaria', 'dengue', 'zika', 'arbovirus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="10" ry="6" fill="#6B7280" opacity="0.3"/>
      <ellipse cx="32" cy="36" rx="10" ry="6"/>
      <ellipse cx="32" cy="28" rx="6" ry="4" fill="#6B7280" opacity="0.4"/>
      <ellipse cx="32" cy="28" rx="6" ry="4"/>
      <path d="M32 24v-12"/>
      <path d="M30 12h4"/>
      <path d="M22 32l-10-4"/>
      <path d="M42 32l10-4"/>
      <path d="M22 38l-12 8"/>
      <path d="M42 38l12 8"/>
      <path d="M28 42l-4 12"/>
      <path d="M36 42l4 12"/>
      <text x="14" y="64" font-size="4" fill="currentColor" stroke="none">Mosquito</text>
    </svg>`
  },
  {
    id: 'inf-tick-vector',
    name: 'Tick Vector',
    domain: 'medicine',
    category: 'transmission',
    tags: ['tick', 'vector', 'lyme', 'rocky mountain', 'babesia', 'ehrlichia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="12" ry="16" fill="#92400E" opacity="0.4"/>
      <ellipse cx="32" cy="36" rx="12" ry="16"/>
      <ellipse cx="32" cy="20" rx="6" ry="4" fill="#92400E" opacity="0.5"/>
      <ellipse cx="32" cy="20" rx="6" ry="4"/>
      <path d="M20 28l-8-4"/>
      <path d="M44 28l8-4"/>
      <path d="M20 36l-12 0"/>
      <path d="M44 36l12 0"/>
      <path d="M20 44l-8 4"/>
      <path d="M44 44l8 4"/>
      <path d="M24 52l-4 8"/>
      <path d="M40 52l4 8"/>
      <text x="22" y="64" font-size="4" fill="currentColor" stroke="none">Tick</text>
    </svg>`
  },
  {
    id: 'inf-droplet-transmission',
    name: 'Droplet Transmission',
    domain: 'medicine',
    category: 'transmission',
    tags: ['droplet', 'respiratory', 'cough', 'sneeze', 'transmission'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="24" r="12" fill="#F3F4F6"/>
      <circle cx="16" cy="24" r="12"/>
      <path d="M22 20c4 4 4 8 0 8"/>
      <path d="M28 24l8 4"/>
      <path d="M28 20l12-4"/>
      <path d="M28 28l12 4"/>
      <circle cx="44" cy="16" r="3" fill="#3B82F6" opacity="0.5"/>
      <circle cx="48" cy="24" r="2" fill="#3B82F6" opacity="0.5"/>
      <circle cx="52" cy="20" r="2" fill="#3B82F6" opacity="0.5"/>
      <circle cx="46" cy="28" r="3" fill="#3B82F6" opacity="0.5"/>
      <circle cx="56" cy="32" r="2" fill="#3B82F6" opacity="0.5"/>
      <text x="10" y="52" font-size="4" fill="currentColor" stroke="none">Droplet</text>
    </svg>`
  },
  {
    id: 'inf-airborne-transmission',
    name: 'Airborne Transmission',
    domain: 'medicine',
    category: 'transmission',
    tags: ['airborne', 'aerosol', 'TB', 'measles', 'chickenpox', 'COVID'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" stroke-dasharray="4 4" fill="#EF4444" opacity="0.1"/>
      <circle cx="32" cy="32" r="12" stroke-dasharray="4 4" fill="#EF4444" opacity="0.2"/>
      <circle cx="24" cy="28" r="2" fill="#EF4444" opacity="0.6"/>
      <circle cx="36" cy="24" r="1.5" fill="#EF4444" opacity="0.6"/>
      <circle cx="40" cy="32" r="2" fill="#EF4444" opacity="0.6"/>
      <circle cx="28" cy="38" r="1.5" fill="#EF4444" opacity="0.6"/>
      <circle cx="38" cy="40" r="2" fill="#EF4444" opacity="0.6"/>
      <circle cx="20" cy="36" r="1" fill="#EF4444" opacity="0.6"/>
      <circle cx="44" cy="28" r="1" fill="#EF4444" opacity="0.6"/>
      <path d="M16 16c4 4 0 8-4 12"/>
      <path d="M48 16c-4 4 0 8 4 12"/>
      <path d="M16 48c4-4 0-8-4-12"/>
      <path d="M48 48c-4-4 0-8 4-12"/>
      <text x="14" y="60" font-size="4" fill="currentColor" stroke="none">Airborne</text>
    </svg>`
  },
  {
    id: 'inf-fecal-oral',
    name: 'Fecal-Oral Transmission',
    domain: 'medicine',
    category: 'transmission',
    tags: ['fecal-oral', 'enteric', 'waterborne', 'food', 'contamination'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="32" rx="8" ry="12" fill="#92400E" opacity="0.3"/>
      <ellipse cx="16" cy="32" rx="8" ry="12"/>
      <path d="M24 32h8"/>
      <path d="M36 28v8" fill="#3B82F6" opacity="0.3"/>
      <path d="M32 24l8 8-8 8z" fill="#3B82F6" opacity="0.3"/>
      <path d="M32 24l8 8-8 8z"/>
      <path d="M44 32h8"/>
      <circle cx="56" cy="24" r="4" fill="#F3F4F6"/>
      <circle cx="56" cy="24" r="4"/>
      <path d="M56 28v8"/>
      <path d="M52 36h8"/>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Fecal-Oral</text>
    </svg>`
  },
  {
    id: 'inf-bloodborne',
    name: 'Bloodborne Transmission',
    domain: 'medicine',
    category: 'transmission',
    tags: ['bloodborne', 'parenteral', 'needle', 'HIV', 'hepatitis', 'transfusion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8l12 24c4 8 0 16-12 20-12-4-16-12-12-20l12-24z" fill="#DC2626" opacity="0.4"/>
      <path d="M32 8l12 24c4 8 0 16-12 20-12-4-16-12-12-20l12-24z"/>
      <path d="M28 28c2-4 6-4 8 0"/>
      <circle cx="32" cy="36" r="6" fill="#DC2626" opacity="0.6"/>
      <path d="M32 56v4"/>
      <path d="M28 60h8"/>
      <text x="10" y="64" font-size="4" fill="currentColor" stroke="none">Bloodborne</text>
    </svg>`
  },

  // ===========================================================================
  // VACCINATION (4)
  // ===========================================================================
  {
    id: 'inf-vaccine-vial',
    name: 'Vaccine Vial',
    domain: 'medicine',
    category: 'vaccination',
    tags: ['vaccine', 'vial', 'immunization', 'prophylaxis', 'prevention'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="8" rx="2" fill="#6B7280"/>
      <rect x="20" y="8" width="24" height="8" rx="2"/>
      <rect x="24" y="4" width="16" height="4" rx="1" fill="#A5B4FC"/>
      <path d="M20 16v36c0 4 4 8 12 8s12-4 12-8V16"/>
      <path d="M20 16h24"/>
      <rect x="24" y="24" width="16" height="24" rx="2" fill="#93C5FD" opacity="0.4"/>
      <text x="28" y="40" font-size="6" fill="currentColor" stroke="none">V</text>
      <text x="16" y="64" font-size="4" fill="currentColor" stroke="none">Vaccine</text>
    </svg>`
  },
  {
    id: 'inf-syringe',
    name: 'Vaccination Syringe',
    domain: 'medicine',
    category: 'vaccination',
    tags: ['syringe', 'injection', 'vaccine', 'immunization', 'shot'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="24" width="36" height="16" rx="2" fill="#F3F4F6"/>
      <rect x="16" y="24" width="36" height="16" rx="2"/>
      <rect x="20" y="28" width="24" height="8" rx="1" fill="#93C5FD" opacity="0.5"/>
      <path d="M52 32h8"/>
      <path d="M16 32h-8l-4 0"/>
      <path d="M8 28v8"/>
      <path d="M44 24v16"/>
      <text x="14" y="52" font-size="4" fill="currentColor" stroke="none">Syringe</text>
    </svg>`
  },
  {
    id: 'inf-immunization-card',
    name: 'Immunization Record',
    domain: 'medicine',
    category: 'vaccination',
    tags: ['immunization', 'record', 'card', 'vaccination', 'history'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="#FEF3C7"/>
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <rect x="12" y="12" width="12" height="16" rx="2" fill="#E5E7EB"/>
      <path d="M28 16h24"/>
      <path d="M28 24h20"/>
      <path d="M12 36h40"/>
      <path d="M12 44h40"/>
      <path d="M12 52h32"/>
      <circle cx="48" cy="44" r="4" fill="#10B981"/>
      <path d="M46 44l2 2 4-4" stroke="#fff" stroke-width="1.5"/>
      <text x="8" y="64" font-size="3" fill="currentColor" stroke="none">Immunization</text>
    </svg>`
  },
  {
    id: 'inf-herd-immunity',
    name: 'Herd Immunity',
    domain: 'medicine',
    category: 'vaccination',
    tags: ['herd immunity', 'population', 'coverage', 'threshold', 'protection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" stroke-dasharray="4 4"/>
      <circle cx="20" cy="20" r="4" fill="#10B981"/>
      <circle cx="32" cy="16" r="4" fill="#10B981"/>
      <circle cx="44" cy="20" r="4" fill="#10B981"/>
      <circle cx="16" cy="32" r="4" fill="#10B981"/>
      <circle cx="32" cy="32" r="4" fill="#EF4444"/>
      <circle cx="48" cy="32" r="4" fill="#10B981"/>
      <circle cx="20" cy="44" r="4" fill="#10B981"/>
      <circle cx="32" cy="48" r="4" fill="#10B981"/>
      <circle cx="44" cy="44" r="4" fill="#10B981"/>
      <text x="4" y="64" font-size="3" fill="currentColor" stroke="none">Herd Immunity</text>
    </svg>`
  },
];

export default infectiousIcons;
