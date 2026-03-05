/**
 * Genetics Icon Library
 * Comprehensive SVG icons for genetics and heredity
 *
 * Categories:
 * - Chromosomes (karyotypes, abnormalities, structure)
 * - Inheritance Patterns (Mendelian, non-Mendelian)
 * - Mutations (types, effects, repair)
 * - Genetic Analysis (pedigrees, Punnett squares, mapping)
 */

import type { IconDefinition } from './index';

export const geneticsIcons: IconDefinition[] = [
  // ===========================================================================
  // CHROMOSOMES & KARYOTYPES
  // ===========================================================================
  {
    id: 'gen-karyotype',
    name: 'Human Karyotype',
    domain: 'biology',
    category: 'chromosomes',
    tags: ['karyotype', 'chromosomes', '46', 'XX', 'XY', 'diploid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="2" fill="currentColor" opacity="0.05"/>
      <g transform="translate(8,8)">
        <path d="M2 0v8M4 0v8M2 4h2"/>
        <path d="M8 0v8M10 0v8M8 4h2"/>
        <path d="M14 0v8M16 0v8M14 4h2"/>
      </g>
      <g transform="translate(8,20)">
        <path d="M2 0v6M4 0v6M2 3h2"/>
        <path d="M8 0v6M10 0v6M8 3h2"/>
        <path d="M14 0v6M16 0v6M14 3h2"/>
      </g>
      <g transform="translate(8,32)">
        <path d="M2 0v5M4 0v5M2 2.5h2"/>
        <path d="M8 0v5M10 0v5M8 2.5h2"/>
      </g>
      <g transform="translate(40,40)">
        <path d="M2 0v8M4 0v8M2 4h2"/>
        <path d="M10 0v4M12 0v4M10 2h2"/>
      </g>
      <text x="40" y="56" font-size="4" fill="currentColor" stroke="none">X  Y</text>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">1-22</text>
    </svg>`
  },
  {
    id: 'gen-homologous',
    name: 'Homologous Chromosomes',
    domain: 'biology',
    category: 'chromosomes',
    tags: ['homologous', 'pair', 'bivalent', 'synapsis', 'crossing over'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8c-4 0-6 4-6 8v12c0 4 2 4 6 4"/>
      <path d="M16 32c-4 0-6 0-6 4v12c0 4 2 8 6 8"/>
      <path d="M24 8c4 0 6 4 6 8v12c0 4-2 4-6 4"/>
      <path d="M24 32c4 0 6 0 6 4v12c0 4-2 8-6 8"/>
      <ellipse cx="20" cy="32" rx="8" ry="3" fill="currentColor" opacity="0.3"/>
      <path d="M40 8c-4 0-6 4-6 8v12c0 4 2 4 6 4" stroke="#FF6B6B"/>
      <path d="M40 32c-4 0-6 0-6 4v12c0 4 2 8 6 8" stroke="#FF6B6B"/>
      <path d="M48 8c4 0 6 4 6 8v12c0 4-2 4-6 4" stroke="#4ECDC4"/>
      <path d="M48 32c4 0 6 0 6 4v12c0 4-2 8-6 8" stroke="#4ECDC4"/>
      <ellipse cx="44" cy="32" rx="8" ry="3" fill="currentColor" opacity="0.3"/>
      <text x="12" y="60" font-size="4" fill="currentColor" stroke="none">Maternal</text>
      <text x="36" y="60" font-size="4" fill="currentColor" stroke="none">Paternal</text>
    </svg>`
  },
  {
    id: 'gen-crossing-over',
    name: 'Crossing Over',
    domain: 'biology',
    category: 'chromosomes',
    tags: ['crossing over', 'recombination', 'chiasma', 'genetic exchange'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 8v48" stroke="#FF6B6B" stroke-width="2"/>
      <path d="M20 8v48" stroke="#4ECDC4" stroke-width="2"/>
      <path d="M12 24c4 4 4 8 8 8" stroke="#FF6B6B" stroke-width="2"/>
      <path d="M20 24c-4 4-4 8-8 8" stroke="#4ECDC4" stroke-width="2"/>
      <circle cx="16" cy="28" r="6" stroke-dasharray="2 2" fill="none"/>
      <text x="28" y="32" font-size="4" fill="currentColor" stroke="none">Chiasma</text>
      <path d="M40 8v16" stroke="#FF6B6B" stroke-width="2"/>
      <path d="M40 24v32" stroke="#4ECDC4" stroke-width="2"/>
      <path d="M48 8v16" stroke="#4ECDC4" stroke-width="2"/>
      <path d="M48 24v32" stroke="#FF6B6B" stroke-width="2"/>
      <text x="36" y="60" font-size="4" fill="currentColor" stroke="none">Recombinant</text>
    </svg>`
  },
  {
    id: 'gen-trisomy',
    name: 'Trisomy (Aneuploidy)',
    domain: 'biology',
    category: 'chromosomes',
    tags: ['trisomy', 'aneuploidy', 'nondisjunction', 'Down syndrome', 'extra chromosome'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 8c-3 0-5 3-5 6v10c0 3 2 3 5 3"/>
      <path d="M12 27c-3 0-5 0-5 3v10c0 3 2 6 5 6"/>
      <path d="M20 8c3 0 5 3 5 6v10c0 3-2 3-5 3"/>
      <path d="M20 27c3 0 5 0 5 3v10c0 3-2 6-5 6"/>
      <path d="M32 8c-3 0-5 3-5 6v10c0 3 2 3 5 3" stroke="#FF6B6B"/>
      <path d="M32 27c-3 0-5 0-5 3v10c0 3 2 6 5 6" stroke="#FF6B6B"/>
      <path d="M40 8c3 0 5 3 5 6v10c0 3-2 3-5 3"/>
      <path d="M40 27c3 0 5 0 5 3v10c0 3-2 6-5 6"/>
      <path d="M52 8c3 0 5 3 5 6v10c0 3-2 3-5 3" stroke="#FF6B6B"/>
      <path d="M52 27c3 0 5 0 5 3v10c0 3-2 6-5 6" stroke="#FF6B6B"/>
      <text x="20" y="56" font-size="4" fill="currentColor" stroke="none">Trisomy 21</text>
    </svg>`
  },
  {
    id: 'gen-sex-chromosomes',
    name: 'Sex Chromosomes',
    domain: 'biology',
    category: 'chromosomes',
    tags: ['sex chromosomes', 'X chromosome', 'Y chromosome', 'XX', 'XY'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 8c-4 0-6 6-6 12v8c0 6 2 6 6 6"/>
      <path d="M12 34c-4 0-6 0-6 6v8c0 6 2 12 6 12"/>
      <path d="M20 8c4 0 6 6 6 12v8c0 6-2 6-6 6"/>
      <path d="M20 34c4 0 6 0 6 6v8c0 6-2 12-6 12"/>
      <ellipse cx="16" cy="34" rx="8" ry="3" fill="currentColor" opacity="0.3"/>
      <path d="M44 8c-4 0-6 4-6 8v4c0 4 2 4 6 4"/>
      <path d="M44 24c-4 0-6 0-6 4v4c0 4 2 8 6 8"/>
      <path d="M52 8c4 0 6 4 6 8v4c0 4-2 4-6 4"/>
      <path d="M52 24c4 0 6 0 6 4v4c0 4-2 8-6 8"/>
      <ellipse cx="48" cy="24" rx="8" ry="3" fill="currentColor" opacity="0.3"/>
      <text x="12" y="60" font-size="6" fill="currentColor" stroke="none">X</text>
      <text x="44" y="48" font-size="6" fill="currentColor" stroke="none">Y</text>
    </svg>`
  },

  // ===========================================================================
  // INHERITANCE PATTERNS
  // ===========================================================================
  {
    id: 'gen-dominant',
    name: 'Autosomal Dominant',
    domain: 'biology',
    category: 'inheritance',
    tags: ['dominant', 'autosomal', 'inheritance', 'heterozygous', 'Aa'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="20" height="20" rx="2" fill="#FF6B6B" opacity="0.5"/>
      <rect x="36" y="8" width="20" height="20" rx="2"/>
      <text x="14" y="22" font-size="8" fill="currentColor" stroke="none">A</text>
      <text x="42" y="22" font-size="8" fill="currentColor" stroke="none">a</text>
      <line x1="18" y1="28" x2="18" y2="36"/>
      <line x1="46" y1="28" x2="46" y2="36"/>
      <line x1="18" y1="36" x2="46" y2="36"/>
      <line x1="32" y1="36" x2="32" y2="44"/>
      <rect x="22" y="44" width="20" height="12" rx="2" fill="#FF6B6B" opacity="0.3"/>
      <text x="26" y="54" font-size="6" fill="currentColor" stroke="none">Aa</text>
      <text x="8" y="62" font-size="4" fill="currentColor" stroke="none">Affected</text>
    </svg>`
  },
  {
    id: 'gen-recessive',
    name: 'Autosomal Recessive',
    domain: 'biology',
    category: 'inheritance',
    tags: ['recessive', 'autosomal', 'inheritance', 'homozygous', 'carrier'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="20" height="16" rx="2"/>
      <rect x="36" y="8" width="20" height="16" rx="2"/>
      <text x="12" y="20" font-size="6" fill="currentColor" stroke="none">Aa</text>
      <text x="40" y="20" font-size="6" fill="currentColor" stroke="none">Aa</text>
      <line x1="18" y1="24" x2="18" y2="32"/>
      <line x1="46" y1="24" x2="46" y2="32"/>
      <line x1="18" y1="32" x2="46" y2="32"/>
      <rect x="4" y="40" width="12" height="12" rx="2"/>
      <rect x="18" y="40" width="12" height="12" rx="2"/>
      <rect x="34" y="40" width="12" height="12" rx="2"/>
      <rect x="48" y="40" width="12" height="12" rx="2" fill="#FF6B6B" opacity="0.5"/>
      <text x="6" y="50" font-size="5" fill="currentColor" stroke="none">AA</text>
      <text x="20" y="50" font-size="5" fill="currentColor" stroke="none">Aa</text>
      <text x="36" y="50" font-size="5" fill="currentColor" stroke="none">Aa</text>
      <text x="50" y="50" font-size="5" fill="currentColor" stroke="none">aa</text>
      <text x="20" y="60" font-size="4" fill="currentColor" stroke="none">25% affected</text>
    </svg>`
  },
  {
    id: 'gen-x-linked',
    name: 'X-Linked Inheritance',
    domain: 'biology',
    category: 'inheritance',
    tags: ['X-linked', 'sex-linked', 'hemophilia', 'color blindness', 'carrier'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="18" cy="16" r="10"/>
      <rect x="36" y="6" width="20" height="20" rx="2"/>
      <text x="10" y="20" font-size="5" fill="currentColor" stroke="none">XᴬXᵃ</text>
      <text x="40" y="20" font-size="5" fill="currentColor" stroke="none">XᴬY</text>
      <line x1="18" y1="26" x2="18" y2="34"/>
      <line x1="46" y1="26" x2="46" y2="34"/>
      <line x1="18" y1="34" x2="46" y2="34"/>
      <circle cx="12" cy="48" r="8"/>
      <circle cx="28" cy="48" r="8"/>
      <rect x="38" y="40" width="10" height="16" rx="2"/>
      <rect x="52" y="40" width="10" height="16" rx="2" fill="#FF6B6B" opacity="0.5"/>
      <text x="46" y="62" font-size="3" fill="currentColor" stroke="none">Affected male</text>
    </svg>`
  },
  {
    id: 'gen-codominance',
    name: 'Codominance',
    domain: 'biology',
    category: 'inheritance',
    tags: ['codominance', 'ABO', 'blood type', 'both alleles expressed'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="16" r="10" fill="#FF6B6B" opacity="0.5"/>
      <circle cx="48" cy="16" r="10" fill="#4ECDC4" opacity="0.5"/>
      <text x="12" y="20" font-size="6" fill="currentColor" stroke="none">Iᴬ</text>
      <text x="44" y="20" font-size="6" fill="currentColor" stroke="none">Iᴮ</text>
      <line x1="16" y1="26" x2="16" y2="34"/>
      <line x1="48" y1="26" x2="48" y2="34"/>
      <line x1="16" y1="34" x2="48" y2="34"/>
      <line x1="32" y1="34" x2="32" y2="40"/>
      <circle cx="32" cy="50" r="10">
        <defs>
          <linearGradient id="codom" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" style="stop-color:#FF6B6B;stop-opacity:0.5"/>
            <stop offset="50%" style="stop-color:#4ECDC4;stop-opacity:0.5"/>
          </linearGradient>
        </defs>
      </circle>
      <path d="M22 50a10 10 0 0 1 20 0" fill="#FF6B6B" opacity="0.5"/>
      <path d="M42 50a10 10 0 0 1-20 0" fill="#4ECDC4" opacity="0.5"/>
      <text x="26" y="54" font-size="5" fill="currentColor" stroke="none">AB</text>
    </svg>`
  },
  {
    id: 'gen-incomplete-dominance',
    name: 'Incomplete Dominance',
    domain: 'biology',
    category: 'inheritance',
    tags: ['incomplete dominance', 'blending', 'intermediate', 'snapdragon'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="16" r="10" fill="#FF0000" opacity="0.6"/>
      <circle cx="48" cy="16" r="10" fill="#FFFFFF" stroke-width="2"/>
      <text x="11" y="20" font-size="5" fill="white" stroke="none">RR</text>
      <text x="43" y="20" font-size="5" fill="currentColor" stroke="none">WW</text>
      <line x1="16" y1="26" x2="16" y2="34"/>
      <line x1="48" y1="26" x2="48" y2="34"/>
      <line x1="16" y1="34" x2="48" y2="34"/>
      <line x1="32" y1="34" x2="32" y2="40"/>
      <circle cx="32" cy="50" r="10" fill="#FFB6C1" opacity="0.8"/>
      <text x="26" y="54" font-size="5" fill="currentColor" stroke="none">RW</text>
      <text x="20" y="62" font-size="3" fill="currentColor" stroke="none">Pink (blended)</text>
    </svg>`
  },

  // ===========================================================================
  // MUTATIONS
  // ===========================================================================
  {
    id: 'gen-point-mutation',
    name: 'Point Mutation',
    domain: 'biology',
    category: 'mutations',
    tags: ['point mutation', 'substitution', 'missense', 'nonsense', 'silent'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <text x="4" y="20" font-size="6" fill="currentColor" stroke="none">A T G C A T</text>
      <text x="4" y="32" font-size="6" fill="currentColor" stroke="none">T A C G T A</text>
      <rect x="22" y="10" width="10" height="14" fill="none" stroke="#FF6B6B" stroke-width="2"/>
      <path d="M27 36v8"/>
      <path d="M24 44l6 0"/>
      <text x="4" y="56" font-size="6" fill="currentColor" stroke="none">A T <tspan fill="#FF6B6B">T</tspan> C A T</text>
      <text x="40" y="44" font-size="4" fill="currentColor" stroke="none">G to T</text>
    </svg>`
  },
  {
    id: 'gen-frameshift',
    name: 'Frameshift Mutation',
    domain: 'biology',
    category: 'mutations',
    tags: ['frameshift', 'insertion', 'deletion', 'reading frame', 'indel'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <text x="4" y="16" font-size="5" fill="currentColor" stroke="none">ATG|GCA|TTA|GCT</text>
      <text x="4" y="28" font-size="5" fill="currentColor" stroke="none">Met|Ala|Leu|Ala</text>
      <path d="M32 32v4"/>
      <path d="M28 36h8"/>
      <text x="4" y="48" font-size="5" fill="currentColor" stroke="none">ATG|<tspan fill="#FF6B6B">A</tspan>GC|ATT|AGC|T</text>
      <text x="4" y="60" font-size="5" fill="currentColor" stroke="none">Met|<tspan fill="#FF6B6B">Ser|Ile|Ser</tspan></text>
      <text x="44" y="42" font-size="4" fill="currentColor" stroke="none">+1 insert</text>
    </svg>`
  },
  {
    id: 'gen-deletion',
    name: 'Chromosomal Deletion',
    domain: 'biology',
    category: 'mutations',
    tags: ['deletion', 'chromosomal', 'loss', 'segment', 'structural'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8v48"/>
      <rect x="12" y="16" width="8" height="8" fill="#FF6B6B" opacity="0.5"/>
      <rect x="12" y="28" width="8" height="8" fill="#4ECDC4" opacity="0.5"/>
      <rect x="12" y="40" width="8" height="8" fill="#96CEB4" opacity="0.5"/>
      <path d="M48 8v48"/>
      <rect x="44" y="16" width="8" height="8" fill="#FF6B6B" opacity="0.5"/>
      <rect x="44" y="28" width="8" height="8" stroke-dasharray="2 2" fill="none"/>
      <rect x="44" y="40" width="8" height="8" fill="#96CEB4" opacity="0.5"/>
      <path d="M28 32l12 0"/>
      <path d="M40 28l4 4-4 4"/>
      <text x="28" y="56" font-size="4" fill="currentColor" stroke="none">Deletion</text>
    </svg>`
  },
  {
    id: 'gen-translocation',
    name: 'Chromosomal Translocation',
    domain: 'biology',
    category: 'mutations',
    tags: ['translocation', 'reciprocal', 'Robertsonian', 'chromosome exchange'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 8v24" stroke="#FF6B6B"/>
      <path d="M12 32v24" stroke="#4ECDC4"/>
      <path d="M24 8v24" stroke="#96CEB4"/>
      <path d="M24 32v24" stroke="#FFEAA7"/>
      <path d="M32 24c4 0 4 8 0 8"/>
      <path d="M44 8v24" stroke="#FF6B6B"/>
      <path d="M44 32v24" stroke="#FFEAA7"/>
      <path d="M56 8v24" stroke="#96CEB4"/>
      <path d="M56 32v24" stroke="#4ECDC4"/>
      <text x="8" y="62" font-size="4" fill="currentColor" stroke="none">Before</text>
      <text x="44" y="62" font-size="4" fill="currentColor" stroke="none">After</text>
    </svg>`
  },
  {
    id: 'gen-inversion',
    name: 'Chromosomal Inversion',
    domain: 'biology',
    category: 'mutations',
    tags: ['inversion', 'pericentric', 'paracentric', 'reversed segment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8v48"/>
      <rect x="12" y="12" width="8" height="6" fill="#FF6B6B" opacity="0.5"/>
      <rect x="12" y="22" width="8" height="6" fill="#4ECDC4" opacity="0.5"/>
      <rect x="12" y="32" width="8" height="6" fill="#96CEB4" opacity="0.5"/>
      <rect x="12" y="42" width="8" height="6" fill="#FFEAA7" opacity="0.5"/>
      <path d="M48 8v48"/>
      <rect x="44" y="12" width="8" height="6" fill="#FF6B6B" opacity="0.5"/>
      <rect x="44" y="22" width="8" height="6" fill="#96CEB4" opacity="0.5"/>
      <rect x="44" y="32" width="8" height="6" fill="#4ECDC4" opacity="0.5"/>
      <rect x="44" y="42" width="8" height="6" fill="#FFEAA7" opacity="0.5"/>
      <path d="M28 27c4-8 8 8 12 0" stroke-dasharray="2 2"/>
      <text x="24" y="58" font-size="4" fill="currentColor" stroke="none">Inversion</text>
    </svg>`
  },

  // ===========================================================================
  // GENETIC ANALYSIS
  // ===========================================================================
  {
    id: 'gen-pedigree',
    name: 'Pedigree Chart',
    domain: 'biology',
    category: 'genetic-analysis',
    tags: ['pedigree', 'family tree', 'inheritance', 'genealogy', 'trait'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="12" height="12" rx="1"/>
      <circle cx="36" cy="14" r="6"/>
      <line x1="20" y1="14" x2="30" y2="14"/>
      <line x1="28" y1="14" x2="28" y2="28"/>
      <rect x="12" y="36" width="10" height="10" rx="1" fill="currentColor"/>
      <circle cx="36" cy="41" r="5"/>
      <rect x="48" y="36" width="10" height="10" rx="1"/>
      <line x1="28" y1="28" x2="17" y2="36"/>
      <line x1="28" y1="28" x2="36" y2="36"/>
      <line x1="28" y1="28" x2="53" y2="36"/>
      <text x="4" y="60" font-size="4" fill="currentColor" stroke="none">Affected male</text>
    </svg>`
  },
  {
    id: 'gen-punnett-square',
    name: 'Punnett Square',
    domain: 'biology',
    category: 'genetic-analysis',
    tags: ['Punnett square', 'cross', 'genotype', 'phenotype', 'probability'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="40" height="40"/>
      <line x1="36" y1="16" x2="36" y2="56"/>
      <line x1="16" y1="36" x2="56" y2="36"/>
      <text x="24" y="8" font-size="6" fill="currentColor" stroke="none">A</text>
      <text x="44" y="8" font-size="6" fill="currentColor" stroke="none">a</text>
      <text x="6" y="30" font-size="6" fill="currentColor" stroke="none">A</text>
      <text x="6" y="50" font-size="6" fill="currentColor" stroke="none">a</text>
      <text x="20" y="30" font-size="5" fill="currentColor" stroke="none">AA</text>
      <text x="40" y="30" font-size="5" fill="currentColor" stroke="none">Aa</text>
      <text x="20" y="50" font-size="5" fill="currentColor" stroke="none">Aa</text>
      <text x="40" y="50" font-size="5" fill="currentColor" stroke="none">aa</text>
    </svg>`
  },
  {
    id: 'gen-dihybrid-cross',
    name: 'Dihybrid Cross',
    domain: 'biology',
    category: 'genetic-analysis',
    tags: ['dihybrid', 'two traits', 'independent assortment', '9:3:3:1'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <line x1="20" y1="8" x2="20" y2="56"/>
      <line x1="32" y1="8" x2="32" y2="56"/>
      <line x1="44" y1="8" x2="44" y2="56"/>
      <line x1="8" y1="20" x2="56" y2="20"/>
      <line x1="8" y1="32" x2="56" y2="32"/>
      <line x1="8" y1="44" x2="56" y2="44"/>
      <text x="10" y="18" font-size="4" fill="#FF6B6B" stroke="none">9</text>
      <text x="22" y="18" font-size="4" fill="#FF6B6B" stroke="none">9</text>
      <text x="34" y="18" font-size="4" fill="#FF6B6B" stroke="none">9</text>
      <text x="46" y="18" font-size="4" fill="#4ECDC4" stroke="none">3</text>
      <text x="10" y="30" font-size="4" fill="#FF6B6B" stroke="none">9</text>
      <text x="22" y="30" font-size="4" fill="#FF6B6B" stroke="none">9</text>
      <text x="34" y="30" font-size="4" fill="#4ECDC4" stroke="none">3</text>
      <text x="46" y="30" font-size="4" fill="#96CEB4" stroke="none">3</text>
      <text x="20" y="60" font-size="4" fill="currentColor" stroke="none">9:3:3:1</text>
    </svg>`
  },
  {
    id: 'gen-linkage-map',
    name: 'Genetic Linkage Map',
    domain: 'biology',
    category: 'genetic-analysis',
    tags: ['linkage', 'map', 'centimorgan', 'recombination frequency', 'chromosome mapping'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="56" y2="32" stroke-width="3"/>
      <circle cx="12" cy="32" r="4" fill="#FF6B6B"/>
      <circle cx="28" cy="32" r="4" fill="#4ECDC4"/>
      <circle cx="40" cy="32" r="4" fill="#96CEB4"/>
      <circle cx="52" cy="32" r="4" fill="#FFEAA7"/>
      <text x="10" y="24" font-size="4" fill="currentColor" stroke="none">A</text>
      <text x="26" y="24" font-size="4" fill="currentColor" stroke="none">B</text>
      <text x="38" y="24" font-size="4" fill="currentColor" stroke="none">C</text>
      <text x="50" y="24" font-size="4" fill="currentColor" stroke="none">D</text>
      <text x="8" y="44" font-size="3" fill="currentColor" stroke="none">0</text>
      <text x="24" y="44" font-size="3" fill="currentColor" stroke="none">15</text>
      <text x="36" y="44" font-size="3" fill="currentColor" stroke="none">25</text>
      <text x="48" y="44" font-size="3" fill="currentColor" stroke="none">40</text>
      <text x="20" y="56" font-size="4" fill="currentColor" stroke="none">cM (centimorgans)</text>
    </svg>`
  },
  {
    id: 'gen-hardy-weinberg',
    name: 'Hardy-Weinberg Equilibrium',
    domain: 'biology',
    category: 'genetic-analysis',
    tags: ['Hardy-Weinberg', 'equilibrium', 'allele frequency', 'population genetics', 'p2 + 2pq + q2'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="2" fill="currentColor" opacity="0.05"/>
      <text x="8" y="20" font-size="5" fill="currentColor" stroke="none">p + q = 1</text>
      <text x="8" y="36" font-size="4" fill="currentColor" stroke="none">p² + 2pq + q² = 1</text>
      <rect x="8" y="44" width="12" height="12" fill="#FF6B6B" opacity="0.5"/>
      <rect x="24" y="44" width="16" height="12" fill="#DDA0DD" opacity="0.5"/>
      <rect x="44" y="44" width="12" height="12" fill="#4ECDC4" opacity="0.5"/>
      <text x="10" y="54" font-size="4" fill="currentColor" stroke="none">AA</text>
      <text x="28" y="54" font-size="4" fill="currentColor" stroke="none">Aa</text>
      <text x="46" y="54" font-size="4" fill="currentColor" stroke="none">aa</text>
      <text x="10" y="62" font-size="3" fill="currentColor" stroke="none">p²</text>
      <text x="28" y="62" font-size="3" fill="currentColor" stroke="none">2pq</text>
      <text x="46" y="62" font-size="3" fill="currentColor" stroke="none">q²</text>
    </svg>`
  },
  {
    id: 'gen-gel-fingerprint',
    name: 'DNA Fingerprint',
    domain: 'biology',
    category: 'genetic-analysis',
    tags: ['DNA fingerprint', 'VNTR', 'STR', 'forensics', 'paternity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="2"/>
      <rect x="8" y="8" width="8" height="2" fill="currentColor"/>
      <rect x="20" y="8" width="8" height="2" fill="currentColor"/>
      <rect x="32" y="8" width="8" height="2" fill="currentColor"/>
      <rect x="44" y="8" width="8" height="2" fill="currentColor"/>
      <rect x="8" y="16" width="8" height="2" fill="currentColor"/>
      <rect x="20" y="20" width="8" height="2" fill="currentColor"/>
      <rect x="32" y="16" width="8" height="2" fill="currentColor"/>
      <rect x="44" y="20" width="8" height="2" fill="currentColor"/>
      <rect x="8" y="28" width="8" height="2" fill="currentColor"/>
      <rect x="20" y="32" width="8" height="2" fill="currentColor"/>
      <rect x="32" y="28" width="8" height="2" fill="currentColor"/>
      <rect x="44" y="32" width="8" height="2" fill="currentColor"/>
      <rect x="8" y="40" width="8" height="2" fill="currentColor"/>
      <rect x="20" y="44" width="8" height="2" fill="currentColor"/>
      <rect x="32" y="40" width="8" height="2" fill="currentColor"/>
      <rect x="44" y="44" width="8" height="2" fill="currentColor"/>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">M</text>
      <text x="20" y="56" font-size="4" fill="currentColor" stroke="none">C</text>
      <text x="32" y="56" font-size="4" fill="currentColor" stroke="none">F</text>
      <text x="44" y="56" font-size="4" fill="currentColor" stroke="none">S</text>
    </svg>`
  },
  {
    id: 'gen-carrier-testing',
    name: 'Carrier Testing',
    domain: 'biology',
    category: 'genetic-analysis',
    tags: ['carrier', 'testing', 'heterozygote', 'genetic screening', 'counseling'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="20" r="10"/>
      <rect x="38" y="10" width="20" height="20" rx="2"/>
      <path d="M16 10v20" stroke-dasharray="2 2" stroke="#FF6B6B"/>
      <path d="M48 10v20" stroke-dasharray="2 2" stroke="#FF6B6B"/>
      <text x="10" y="38" font-size="4" fill="currentColor" stroke="none">Carrier</text>
      <text x="42" y="38" font-size="4" fill="currentColor" stroke="none">Carrier</text>
      <line x1="16" y1="40" x2="48" y2="40"/>
      <line x1="32" y1="40" x2="32" y2="48"/>
      <circle cx="20" cy="54" r="5" fill="#96CEB4" opacity="0.5"/>
      <circle cx="32" cy="54" r="5" stroke-dasharray="2 2"/>
      <circle cx="44" cy="54" r="5" fill="#FF6B6B" opacity="0.5"/>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">25%:50%:25%</text>
    </svg>`
  },
];

export default geneticsIcons;
