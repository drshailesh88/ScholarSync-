/**
 * Zoology Icon Library
 * Comprehensive SVG icons for zoology and animal biology
 *
 * Categories:
 * - Animal Anatomy (skeletal, muscular, organ systems)
 * - Classification (taxonomy, phyla, groups)
 * - Behavior (ethology, communication, migration)
 * - Evolution (adaptation, phylogeny, homology)
 */

import type { IconDefinition } from './index';

export const zoologyIcons: IconDefinition[] = [
  // ===========================================================================
  // ANIMAL ANATOMY
  // ===========================================================================
  {
    id: 'zoo-vertebrate-skeleton',
    name: 'Vertebrate Skeleton',
    domain: 'biology',
    category: 'anatomy',
    tags: ['skeleton', 'vertebrate', 'bones', 'axial', 'appendicular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="10" r="8"/>
      <path d="M32 18v28"/>
      <path d="M32 22c-8 4-12 0-16-4"/>
      <path d="M32 22c8 4 12 0 16-4"/>
      <path d="M32 46c-8 8-8 12-4 16"/>
      <path d="M32 46c8 8 8 12 4 16"/>
      <path d="M28 26h8"/>
      <path d="M26 34h12"/>
      <path d="M28 42h8"/>
      <circle cx="28" cy="8" r="2" fill="currentColor"/>
      <circle cx="36" cy="8" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'zoo-heart-chambers',
    name: 'Animal Heart Comparison',
    domain: 'biology',
    category: 'anatomy',
    tags: ['heart', 'chambers', 'circulation', 'fish', 'amphibian', 'mammal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="16" height="20" rx="2" fill="#E74C3C" opacity="0.3"/>
      <line x1="12" y1="8" x2="12" y2="28"/>
      <text x="6" y="36" font-size="3" fill="currentColor" stroke="none">2-chamber</text>
      <text x="8" y="42" font-size="3" fill="currentColor" stroke="none">(Fish)</text>
      <rect x="24" y="8" width="16" height="20" rx="2" fill="#9B59B6" opacity="0.3"/>
      <line x1="32" y1="8" x2="32" y2="28"/>
      <line x1="24" y1="18" x2="40" y2="18"/>
      <text x="26" y="36" font-size="3" fill="currentColor" stroke="none">3-chamber</text>
      <text x="24" y="42" font-size="3" fill="currentColor" stroke="none">(Amphibian)</text>
      <rect x="44" y="8" width="16" height="20" rx="2" fill="#3498DB" opacity="0.3"/>
      <line x1="52" y1="8" x2="52" y2="28"/>
      <line x1="44" y1="18" x2="60" y2="18"/>
      <text x="46" y="36" font-size="3" fill="currentColor" stroke="none">4-chamber</text>
      <text x="46" y="42" font-size="3" fill="currentColor" stroke="none">(Mammal)</text>
    </svg>`
  },
  {
    id: 'zoo-digestive-system',
    name: 'Digestive System',
    domain: 'biology',
    category: 'anatomy',
    tags: ['digestive', 'gut', 'alimentary canal', 'stomach', 'intestine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4v8"/>
      <ellipse cx="32" cy="18" rx="8" ry="6" fill="#F39C12" opacity="0.3"/>
      <path d="M32 24v4"/>
      <path d="M32 28c-8 4-8 12 0 12s8-8 0-12" fill="#E74C3C" opacity="0.3"/>
      <path d="M32 40c8 8 8 16-8 16"/>
      <path d="M24 56h16"/>
      <text x="40" y="20" font-size="3" fill="currentColor" stroke="none">Stomach</text>
      <text x="40" y="36" font-size="3" fill="currentColor" stroke="none">Small Int.</text>
      <text x="8" y="52" font-size="3" fill="currentColor" stroke="none">Large Int.</text>
    </svg>`
  },
  {
    id: 'zoo-nervous-system',
    name: 'Animal Nervous System',
    domain: 'biology',
    category: 'anatomy',
    tags: ['nervous system', 'brain', 'spinal cord', 'nerves', 'CNS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="12" ry="8" fill="#9B59B6" opacity="0.3"/>
      <path d="M32 20v36" stroke-width="3"/>
      <path d="M32 24l-16 8"/>
      <path d="M32 24l16 8"/>
      <path d="M32 36l-12 12"/>
      <path d="M32 36l12 12"/>
      <path d="M32 48l-8 8"/>
      <path d="M32 48l8 8"/>
      <circle cx="32" cy="12" r="4" fill="#9B59B6"/>
      <text x="44" y="12" font-size="4" fill="currentColor" stroke="none">Brain</text>
      <text x="40" y="40" font-size="3" fill="currentColor" stroke="none">Spinal cord</text>
    </svg>`
  },
  {
    id: 'zoo-respiratory',
    name: 'Respiratory Systems',
    domain: 'biology',
    category: 'anatomy',
    tags: ['respiratory', 'gills', 'lungs', 'trachea', 'gas exchange'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16c4 4 8-4 12 0s8-4 12 0" stroke="#3498DB" stroke-width="2"/>
      <path d="M8 24c4 4 8-4 12 0s8-4 12 0" stroke="#3498DB" stroke-width="2"/>
      <path d="M8 32c4 4 8-4 12 0s8-4 12 0" stroke="#3498DB" stroke-width="2"/>
      <text x="8" y="44" font-size="4" fill="currentColor" stroke="none">Gills</text>
      <ellipse cx="48" cy="24" rx="8" ry="12" fill="#E74C3C" opacity="0.3"/>
      <path d="M48 12v-4"/>
      <path d="M44 20c4 4 4 8 0 8"/>
      <path d="M52 20c-4 4-4 8 0 8"/>
      <text x="40" y="44" font-size="4" fill="currentColor" stroke="none">Lungs</text>
    </svg>`
  },

  // ===========================================================================
  // CLASSIFICATION
  // ===========================================================================
  {
    id: 'zoo-vertebrates',
    name: 'Vertebrate Classes',
    domain: 'biology',
    category: 'classification',
    tags: ['vertebrate', 'fish', 'amphibian', 'reptile', 'bird', 'mammal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="12" cy="16" rx="8" ry="4" fill="#3498DB" opacity="0.4"/>
      <path d="M20 16l4-2v4z"/>
      <text x="4" y="28" font-size="3" fill="currentColor" stroke="none">Fish</text>
      <ellipse cx="36" cy="12" rx="6" ry="4" fill="#27AE60" opacity="0.4"/>
      <path d="M30 16l-4 4"/>
      <path d="M42 16l4 4"/>
      <text x="28" y="28" font-size="3" fill="currentColor" stroke="none">Amphibian</text>
      <ellipse cx="56" cy="16" rx="6" ry="4" fill="#F39C12" opacity="0.4"/>
      <path d="M56 20c0 4-4 4-4 0"/>
      <text x="48" y="28" font-size="3" fill="currentColor" stroke="none">Reptile</text>
      <ellipse cx="20" cy="44" rx="6" ry="4" fill="#E74C3C" opacity="0.4"/>
      <path d="M14 40l-4-4 4-2"/>
      <text x="14" y="56" font-size="3" fill="currentColor" stroke="none">Bird</text>
      <ellipse cx="48" cy="44" rx="8" ry="5" fill="#9B59B6" opacity="0.4"/>
      <circle cx="42" cy="42" r="2" fill="currentColor"/>
      <text x="40" y="56" font-size="3" fill="currentColor" stroke="none">Mammal</text>
    </svg>`
  },
  {
    id: 'zoo-invertebrates',
    name: 'Invertebrate Phyla',
    domain: 'biology',
    category: 'classification',
    tags: ['invertebrate', 'arthropod', 'mollusk', 'annelid', 'cnidarian'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="12" cy="12" rx="8" ry="6" fill="#E74C3C" opacity="0.3"/>
      <path d="M4 12l-2-4M20 12l2-4M8 6l0-4M16 6l0-4"/>
      <text x="2" y="26" font-size="3" fill="currentColor" stroke="none">Arthropod</text>
      <path d="M40 8c4 4 8 4 12 0v8c-4 4-8 4-12 0z" fill="#9B59B6" opacity="0.3"/>
      <text x="38" y="26" font-size="3" fill="currentColor" stroke="none">Mollusk</text>
      <path d="M8 40c4 4 8-4 12 0s8-4 12 0" stroke-width="2"/>
      <text x="6" y="54" font-size="3" fill="currentColor" stroke="none">Annelid</text>
      <circle cx="48" cy="44" r="8"/>
      <path d="M48 36v-4M44 40l-4-4M52 40l4-4M44 48l-4 4M52 48l4 4"/>
      <text x="38" y="60" font-size="3" fill="currentColor" stroke="none">Cnidarian</text>
    </svg>`
  },
  {
    id: 'zoo-phylogenetic-tree',
    name: 'Phylogenetic Tree',
    domain: 'biology',
    category: 'classification',
    tags: ['phylogeny', 'cladogram', 'evolution', 'ancestry', 'divergence'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56v-40"/>
      <path d="M8 16h16"/>
      <path d="M24 16v-8"/>
      <path d="M8 28h24"/>
      <path d="M32 28v-20"/>
      <path d="M8 40h32"/>
      <path d="M40 40v-32"/>
      <path d="M8 52h40"/>
      <path d="M48 52v-44"/>
      <circle cx="24" cy="8" r="3" fill="#E74C3C" opacity="0.5"/>
      <circle cx="32" cy="8" r="3" fill="#F39C12" opacity="0.5"/>
      <circle cx="40" cy="8" r="3" fill="#27AE60" opacity="0.5"/>
      <circle cx="48" cy="8" r="3" fill="#3498DB" opacity="0.5"/>
      <text x="52" y="56" font-size="3" fill="currentColor" stroke="none">Time</text>
    </svg>`
  },
  {
    id: 'zoo-taxonomy',
    name: 'Taxonomic Hierarchy',
    domain: 'biology',
    category: 'classification',
    tags: ['taxonomy', 'kingdom', 'phylum', 'class', 'order', 'family', 'genus', 'species'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="8" fill="#E74C3C" opacity="0.2"/>
      <text x="20" y="10" font-size="4" fill="currentColor" stroke="none">Kingdom</text>
      <rect x="8" y="14" width="48" height="6" fill="#F39C12" opacity="0.2"/>
      <text x="22" y="19" font-size="3" fill="currentColor" stroke="none">Phylum</text>
      <rect x="12" y="22" width="40" height="6" fill="#27AE60" opacity="0.2"/>
      <text x="26" y="27" font-size="3" fill="currentColor" stroke="none">Class</text>
      <rect x="16" y="30" width="32" height="6" fill="#3498DB" opacity="0.2"/>
      <text x="26" y="35" font-size="3" fill="currentColor" stroke="none">Order</text>
      <rect x="20" y="38" width="24" height="6" fill="#9B59B6" opacity="0.2"/>
      <text x="26" y="43" font-size="3" fill="currentColor" stroke="none">Family</text>
      <rect x="24" y="46" width="16" height="6" fill="#1ABC9C" opacity="0.2"/>
      <text x="26" y="51" font-size="3" fill="currentColor" stroke="none">Genus</text>
      <rect x="28" y="54" width="8" height="6" fill="#E91E63" opacity="0.2"/>
      <text x="26" y="59" font-size="3" fill="currentColor" stroke="none">Species</text>
    </svg>`
  },

  // ===========================================================================
  // BEHAVIOR
  // ===========================================================================
  {
    id: 'zoo-migration',
    name: 'Animal Migration',
    domain: 'biology',
    category: 'behavior',
    tags: ['migration', 'seasonal', 'navigation', 'movement', 'birds'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 8c16 16 32 32 48 48" stroke-dasharray="4 2"/>
      <ellipse cx="12" cy="12" rx="6" ry="3" fill="#3498DB" opacity="0.4"/>
      <path d="M6 12l-2-4h8z"/>
      <ellipse cx="32" cy="32" rx="6" ry="3" fill="#3498DB" opacity="0.4"/>
      <path d="M26 32l-2-4h8z"/>
      <ellipse cx="52" cy="52" rx="6" ry="3" fill="#3498DB" opacity="0.4"/>
      <path d="M46 52l-2-4h8z"/>
      <circle cx="8" cy="8" r="3" fill="#FFD700"/>
      <text x="4" y="20" font-size="3" fill="currentColor" stroke="none">Summer</text>
      <circle cx="56" cy="56" r="3" fill="#87CEEB"/>
      <text x="44" y="48" font-size="3" fill="currentColor" stroke="none">Winter</text>
    </svg>`
  },
  {
    id: 'zoo-territoriality',
    name: 'Territorial Behavior',
    domain: 'biology',
    category: 'behavior',
    tags: ['territory', 'defense', 'marking', 'aggression', 'resource'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" stroke-dasharray="4 2" fill="#E74C3C" opacity="0.1"/>
      <circle cx="32" cy="32" r="6" fill="#E74C3C" opacity="0.5"/>
      <path d="M32 26v-8"/>
      <path d="M32 38v8"/>
      <path d="M26 32h-8"/>
      <path d="M38 32h8"/>
      <circle cx="12" cy="12" r="4" fill="#3498DB" opacity="0.5"/>
      <circle cx="52" cy="52" r="4" fill="#27AE60" opacity="0.5"/>
      <path d="M16 16l8 8" stroke="#E74C3C"/>
      <path d="M48 48l-8-8" stroke="#E74C3C"/>
      <text x="20" y="60" font-size="4" fill="currentColor" stroke="none">Territory</text>
    </svg>`
  },
  {
    id: 'zoo-communication',
    name: 'Animal Communication',
    domain: 'biology',
    category: 'behavior',
    tags: ['communication', 'signal', 'vocalization', 'pheromone', 'display'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="32" rx="8" ry="6" fill="#9B59B6" opacity="0.4"/>
      <circle cx="12" cy="30" r="2" fill="currentColor"/>
      <path d="M24 28c4-4 8-4 12 0" stroke="#F39C12"/>
      <path d="M24 32c6-4 10-4 16 0" stroke="#F39C12"/>
      <path d="M24 36c8-4 12-4 20 0" stroke="#F39C12"/>
      <ellipse cx="52" cy="32" rx="8" ry="6" fill="#3498DB" opacity="0.4"/>
      <circle cx="48" cy="30" r="2" fill="currentColor"/>
      <text x="8" y="48" font-size="3" fill="currentColor" stroke="none">Sender</text>
      <text x="44" y="48" font-size="3" fill="currentColor" stroke="none">Receiver</text>
      <text x="24" y="56" font-size="3" fill="currentColor" stroke="none">Signal</text>
    </svg>`
  },
  {
    id: 'zoo-courtship',
    name: 'Courtship Display',
    domain: 'biology',
    category: 'behavior',
    tags: ['courtship', 'mating', 'display', 'sexual selection', 'reproduction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="36" rx="10" ry="8" fill="#3498DB" opacity="0.4"/>
      <path d="M10 28c-8-16 8-24 16-16"/>
      <path d="M14 24c-4-12 4-16 8-12"/>
      <path d="M18 20c0-8 4-8 4-4"/>
      <ellipse cx="48" cy="40" rx="8" ry="6" fill="#8B4513" opacity="0.4"/>
      <circle cx="44" cy="38" r="2" fill="currentColor"/>
      <path d="M30 36h10" stroke="#E74C3C" stroke-dasharray="2 2"/>
      <text x="8" y="52" font-size="3" fill="currentColor" stroke="none">Male display</text>
      <text x="40" y="52" font-size="3" fill="currentColor" stroke="none">Female</text>
    </svg>`
  },
  {
    id: 'zoo-social-hierarchy',
    name: 'Social Hierarchy',
    domain: 'biology',
    category: 'behavior',
    tags: ['hierarchy', 'dominance', 'pecking order', 'social', 'rank'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="8" fill="#FFD700" opacity="0.5"/>
      <text x="28" y="16" font-size="5" fill="currentColor" stroke="none">A</text>
      <circle cx="20" cy="32" r="6" fill="#C0C0C0" opacity="0.5"/>
      <text x="17" y="35" font-size="4" fill="currentColor" stroke="none">B</text>
      <circle cx="44" cy="32" r="6" fill="#C0C0C0" opacity="0.5"/>
      <text x="41" y="35" font-size="4" fill="currentColor" stroke="none">B</text>
      <circle cx="12" cy="52" r="5" fill="#CD7F32" opacity="0.5"/>
      <text x="9" y="55" font-size="4" fill="currentColor" stroke="none">C</text>
      <circle cx="32" cy="52" r="5" fill="#CD7F32" opacity="0.5"/>
      <text x="29" y="55" font-size="4" fill="currentColor" stroke="none">C</text>
      <circle cx="52" cy="52" r="5" fill="#CD7F32" opacity="0.5"/>
      <text x="49" y="55" font-size="4" fill="currentColor" stroke="none">C</text>
      <path d="M32 20l-10 8"/>
      <path d="M32 20l10 8"/>
      <path d="M16 38l-2 10"/>
      <path d="M20 38l10 10"/>
      <path d="M48 38l2 10"/>
    </svg>`
  },

  // ===========================================================================
  // EVOLUTION & ADAPTATION
  // ===========================================================================
  {
    id: 'zoo-homologous',
    name: 'Homologous Structures',
    domain: 'biology',
    category: 'evolution',
    tags: ['homologous', 'evolution', 'common ancestor', 'limbs', 'comparative anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 20l8-4 8 12 8-4" stroke-width="2"/>
      <text x="4" y="36" font-size="3" fill="currentColor" stroke="none">Human arm</text>
      <path d="M40 16l4-4 8 8 12 0" stroke-width="2"/>
      <text x="40" y="36" font-size="3" fill="currentColor" stroke="none">Bird wing</text>
      <path d="M8 52l4 0 4 4 8 -4 8 4" stroke-width="2"/>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Whale flipper</text>
      <path d="M40 48l4 -4 8 0 4 8 4-4" stroke-width="2"/>
      <text x="40" y="62" font-size="3" fill="currentColor" stroke="none">Dog leg</text>
      <rect x="8" y="20" width="4" height="4" fill="#E74C3C" opacity="0.5"/>
      <rect x="44" y="16" width="4" height="4" fill="#E74C3C" opacity="0.5"/>
      <rect x="12" y="52" width="4" height="4" fill="#E74C3C" opacity="0.5"/>
      <rect x="48" y="48" width="4" height="4" fill="#E74C3C" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'zoo-analogous',
    name: 'Analogous Structures',
    domain: 'biology',
    category: 'evolution',
    tags: ['analogous', 'convergent evolution', 'similar function', 'wings'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="20" rx="8" ry="4" fill="#3498DB" opacity="0.3"/>
      <path d="M8 16l-4-8 8-2"/>
      <text x="4" y="36" font-size="3" fill="currentColor" stroke="none">Bird wing</text>
      <ellipse cx="48" cy="20" rx="8" ry="4" fill="#9B59B6" opacity="0.3"/>
      <path d="M40 16l-4-8 8-2"/>
      <text x="36" y="36" font-size="3" fill="currentColor" stroke="none">Bat wing</text>
      <ellipse cx="32" cy="52" rx="10" ry="4" fill="#27AE60" opacity="0.3"/>
      <path d="M22 48l-4-8 8-2"/>
      <path d="M42 48l4-8-8-2"/>
      <text x="20" y="64" font-size="3" fill="currentColor" stroke="none">Insect wing</text>
      <text x="24" y="44" font-size="4" fill="#E74C3C" stroke="none">Flight</text>
    </svg>`
  },
  {
    id: 'zoo-adaptation',
    name: 'Adaptations',
    domain: 'biology',
    category: 'evolution',
    tags: ['adaptation', 'natural selection', 'fitness', 'environment', 'survival'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="24" height="24" fill="#87CEEB" opacity="0.2"/>
      <ellipse cx="16" cy="16" rx="8" ry="4" fill="#FFFFFF"/>
      <text x="8" y="34" font-size="3" fill="currentColor" stroke="none">Polar - white</text>
      <rect x="36" y="4" width="24" height="24" fill="#228B22" opacity="0.2"/>
      <ellipse cx="48" cy="16" rx="8" ry="4" fill="#228B22"/>
      <text x="36" y="34" font-size="3" fill="currentColor" stroke="none">Forest - green</text>
      <rect x="4" y="40" width="24" height="20" fill="#F4D03F" opacity="0.2"/>
      <ellipse cx="16" cy="50" rx="8" ry="4" fill="#D4AC0D"/>
      <text x="4" y="64" font-size="3" fill="currentColor" stroke="none">Desert - tan</text>
      <rect x="36" y="40" width="24" height="20" fill="#1A5276" opacity="0.2"/>
      <ellipse cx="48" cy="50" rx="8" ry="4" fill="#1A5276"/>
      <text x="36" y="64" font-size="3" fill="currentColor" stroke="none">Ocean - dark</text>
    </svg>`
  },
  {
    id: 'zoo-speciation',
    name: 'Speciation',
    domain: 'biology',
    category: 'evolution',
    tags: ['speciation', 'divergence', 'isolation', 'allopatric', 'sympatric'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="56" r="8" fill="#9B59B6" opacity="0.4"/>
      <path d="M32 48v-12"/>
      <path d="M32 36l-16-20"/>
      <path d="M32 36l16-20"/>
      <circle cx="16" cy="12" r="6" fill="#E74C3C" opacity="0.4"/>
      <circle cx="48" cy="12" r="6" fill="#3498DB" opacity="0.4"/>
      <rect x="28" y="28" width="8" height="12" fill="#8B4513" opacity="0.3"/>
      <text x="20" y="62" font-size="3" fill="currentColor" stroke="none">Ancestor</text>
      <text x="4" y="24" font-size="3" fill="currentColor" stroke="none">Species A</text>
      <text x="40" y="24" font-size="3" fill="currentColor" stroke="none">Species B</text>
      <text x="22" y="34" font-size="3" fill="currentColor" stroke="none">Barrier</text>
    </svg>`
  },
  {
    id: 'zoo-natural-selection',
    name: 'Natural Selection',
    domain: 'biology',
    category: 'evolution',
    tags: ['natural selection', 'Darwin', 'survival', 'fitness', 'variation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <text x="4" y="12" font-size="4" fill="currentColor" stroke="none">Before</text>
      <circle cx="16" cy="20" r="4" fill="#333"/>
      <circle cx="28" cy="20" r="4" fill="#666"/>
      <circle cx="40" cy="20" r="4" fill="#999"/>
      <circle cx="52" cy="20" r="4" fill="#CCC"/>
      <path d="M4 32h56" stroke-dasharray="4 2"/>
      <text x="20" y="30" font-size="3" fill="currentColor" stroke="none">Selection pressure</text>
      <text x="4" y="44" font-size="4" fill="currentColor" stroke="none">After</text>
      <circle cx="16" cy="52" r="4" fill="#333"/>
      <circle cx="26" cy="52" r="4" fill="#333"/>
      <circle cx="36" cy="52" r="4" fill="#666"/>
      <circle cx="46" cy="52" r="4" fill="#333"/>
      <circle cx="56" cy="52" r="4" fill="#666"/>
    </svg>`
  },
  {
    id: 'zoo-embryology',
    name: 'Comparative Embryology',
    domain: 'biology',
    category: 'evolution',
    tags: ['embryology', 'development', 'pharyngeal arches', 'common ancestry'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="12" cy="32" rx="8" ry="12" fill="#E74C3C" opacity="0.3"/>
      <path d="M8 24c4 0 4 4 0 4"/>
      <text x="4" y="52" font-size="3" fill="currentColor" stroke="none">Fish</text>
      <ellipse cx="28" cy="32" rx="8" ry="12" fill="#F39C12" opacity="0.3"/>
      <path d="M24 24c4 0 4 4 0 4"/>
      <text x="18" y="52" font-size="3" fill="currentColor" stroke="none">Salamander</text>
      <ellipse cx="44" cy="32" rx="8" ry="12" fill="#27AE60" opacity="0.3"/>
      <path d="M40 24c4 0 4 4 0 4"/>
      <text x="38" y="52" font-size="3" fill="currentColor" stroke="none">Chicken</text>
      <ellipse cx="56" cy="32" rx="6" ry="10" fill="#9B59B6" opacity="0.3"/>
      <path d="M52 26c4 0 4 4 0 4"/>
      <text x="50" y="52" font-size="3" fill="currentColor" stroke="none">Human</text>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Pharyngeal arches present in all</text>
    </svg>`
  },
];

export default zoologyIcons;
