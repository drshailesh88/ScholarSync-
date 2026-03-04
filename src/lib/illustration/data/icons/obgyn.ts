/**
 * OB-GYN Icon Library
 * Comprehensive SVG icons for obstetrics and gynecology
 *
 * Categories:
 * - Female Anatomy (12 icons)
 * - Pregnancy (15 icons)
 * - Labor/Delivery (12 icons)
 * - Obstetric Pathology (12 icons)
 * - Gynecologic Pathology (12 icons)
 * - Reproductive (10 icons)
 * - Equipment (10 icons)
 * - Contraception (7 icons)
 * - Fetal Monitoring (8 icons)
 * - Gynecologic Procedures (10 icons)
 * - Prenatal Screening (8 icons)
 * - Postpartum (6 icons)
 *
 * Total: 122 icons - COMPLETE checkpoint (90%+)
 */

import type { IconDefinition } from './index';

export const obgynIcons: IconDefinition[] = [
  // ===========================================================================
  // FEMALE ANATOMY (12 icons)
  // ===========================================================================
  {
    id: 'obgyn-uterus',
    name: 'Uterus',
    domain: 'medicine',
    category: 'female-anatomy',
    tags: ['uterus', 'womb', 'reproductive', 'anatomy', 'fundus', 'corpus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 56v-12"/>
      <path d="M20 16c-8 0-12 8-12 16s4 16 12 16h24c8 0 12-8 12-16s-4-16-12-16H20z" fill="currentColor" opacity="0.2"/>
      <path d="M20 16c-8 0-12 8-12 16s4 16 12 16h24c8 0 12-8 12-16s-4-16-12-16H20z"/>
      <path d="M8 20l-4-8"/>
      <path d="M56 20l4-8"/>
      <ellipse cx="4" cy="10" rx="3" ry="4"/>
      <ellipse cx="60" cy="10" rx="3" ry="4"/>
      <text x="22" y="38" font-size="5" fill="currentColor" stroke="none">Fundus</text>
    </svg>`
  },
  {
    id: 'obgyn-ovary',
    name: 'Ovary',
    domain: 'medicine',
    category: 'female-anatomy',
    tags: ['ovary', 'gonad', 'follicle', 'oocyte', 'reproductive', 'endocrine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <circle cx="20" cy="28" r="4"/>
      <circle cx="28" cy="38" r="5"/>
      <circle cx="40" cy="26" r="3"/>
      <circle cx="44" cy="36" r="4"/>
      <circle cx="36" cy="30" r="6" fill="currentColor" opacity="0.3"/>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Follicles</text>
    </svg>`
  },
  {
    id: 'obgyn-fallopian-tube',
    name: 'Fallopian Tube',
    domain: 'medicine',
    category: 'female-anatomy',
    tags: ['fallopian', 'tube', 'oviduct', 'fimbria', 'ampulla', 'isthmus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h20c8 0 12-8 20-8" stroke-width="2"/>
      <path d="M48 24c4 0 8-4 8-8"/>
      <path d="M52 12c2-2 4-2 6-4"/>
      <path d="M52 16c2 0 4-2 6-2"/>
      <path d="M54 20c2 0 6-2 6 0"/>
      <circle cx="8" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <ellipse cx="56" cy="20" rx="6" ry="10"/>
      <text x="4" y="44" font-size="4" fill="currentColor" stroke="none">Isthmus</text>
      <text x="28" y="20" font-size="4" fill="currentColor" stroke="none">Ampulla</text>
      <text x="48" y="36" font-size="4" fill="currentColor" stroke="none">Fimbria</text>
    </svg>`
  },
  {
    id: 'obgyn-cervix',
    name: 'Cervix',
    domain: 'medicine',
    category: 'female-anatomy',
    tags: ['cervix', 'os', 'ectocervix', 'endocervix', 'transformation zone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8h24c4 0 8 8 8 16H12c0-8 4-16 8-16z" fill="currentColor" opacity="0.2"/>
      <path d="M20 8h24c4 0 8 8 8 16H12c0-8 4-16 8-16z"/>
      <ellipse cx="32" cy="32" rx="12" ry="8"/>
      <ellipse cx="32" cy="32" rx="4" ry="2" fill="currentColor"/>
      <path d="M28 56v-16"/>
      <path d="M36 56v-16"/>
      <text x="22" y="50" font-size="4" fill="currentColor" stroke="none">Cervical os</text>
    </svg>`
  },
  {
    id: 'obgyn-vagina',
    name: 'Vagina',
    domain: 'medicine',
    category: 'female-anatomy',
    tags: ['vagina', 'vaginal canal', 'fornix', 'rugae', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8c-4 0-8 8-8 24s4 24 8 24h16c4 0 8-8 8-24s-4-24-8-24H24z" fill="currentColor" opacity="0.1"/>
      <path d="M24 8c-4 0-8 8-8 24s4 24 8 24h16c4 0 8-8 8-24s-4-24-8-24H24z"/>
      <path d="M24 16c2 2 12 2 16 0"/>
      <path d="M22 28c4 2 16 2 20 0"/>
      <path d="M22 40c4 2 16 2 20 0"/>
      <path d="M24 52c4 2 12 2 16 0"/>
      <text x="18" y="32" font-size="4" fill="currentColor" stroke="none">Rugae</text>
    </svg>`
  },
  {
    id: 'obgyn-vulva',
    name: 'Vulva',
    domain: 'medicine',
    category: 'female-anatomy',
    tags: ['vulva', 'labia', 'clitoris', 'vestibule', 'external genitalia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="16" ry="24"/>
      <path d="M32 12v8"/>
      <ellipse cx="32" cy="32" rx="8" ry="16"/>
      <ellipse cx="32" cy="32" rx="3" ry="10" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="14" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'obgyn-pelvic-anatomy',
    name: 'Pelvic Anatomy',
    domain: 'medicine',
    category: 'female-anatomy',
    tags: ['pelvis', 'pelvic', 'anatomy', 'organs', 'sagittal', 'cross-section'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 48c0-16 8-40 24-40s24 24 24 40" fill="currentColor" opacity="0.1"/>
      <path d="M8 48c0-16 8-40 24-40s24 24 24 40"/>
      <ellipse cx="32" cy="24" rx="8" ry="6" fill="#FFB6C1"/>
      <ellipse cx="32" cy="40" rx="6" ry="4" fill="#DEB887"/>
      <ellipse cx="32" cy="52" rx="4" ry="3" fill="#98FB98"/>
      <text x="44" y="26" font-size="3" fill="currentColor" stroke="none">Uterus</text>
      <text x="44" y="42" font-size="3" fill="currentColor" stroke="none">Bladder</text>
      <text x="44" y="54" font-size="3" fill="currentColor" stroke="none">Rectum</text>
    </svg>`
  },
  {
    id: 'obgyn-broad-ligament',
    name: 'Broad Ligament',
    domain: 'medicine',
    category: 'female-anatomy',
    tags: ['ligament', 'broad', 'mesosalpinx', 'mesovarium', 'parametrium'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 40l24-32 24 32" fill="currentColor" opacity="0.2"/>
      <path d="M8 40l24-32 24 32"/>
      <ellipse cx="32" cy="32" rx="8" ry="6"/>
      <ellipse cx="12" cy="36" rx="4" ry="3"/>
      <ellipse cx="52" cy="36" rx="4" ry="3"/>
      <path d="M16 36h8"/>
      <path d="M40 32h8"/>
      <text x="20" y="56" font-size="4" fill="currentColor" stroke="none">Broad Ligament</text>
    </svg>`
  },
  {
    id: 'obgyn-round-ligament',
    name: 'Round Ligament',
    domain: 'medicine',
    category: 'female-anatomy',
    tags: ['ligament', 'round', 'inguinal', 'support', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="12" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="24" rx="12" ry="8"/>
      <path d="M20 24c-8 8-12 24-12 32" stroke-width="2"/>
      <path d="M44 24c8 8 12 24 12 32" stroke-width="2"/>
      <circle cx="8" cy="56" r="3"/>
      <circle cx="56" cy="56" r="3"/>
      <text x="12" y="44" font-size="4" fill="currentColor" stroke="none">Round</text>
      <text x="38" y="44" font-size="4" fill="currentColor" stroke="none">Ligament</text>
    </svg>`
  },
  {
    id: 'obgyn-uterosacral-ligament',
    name: 'Uterosacral Ligament',
    domain: 'medicine',
    category: 'female-anatomy',
    tags: ['ligament', 'uterosacral', 'support', 'sacrum', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="10" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="20" rx="10" ry="8"/>
      <path d="M26 28c-8 4-16 16-16 28" stroke-width="2"/>
      <path d="M38 28c8 4 16 16 16 28" stroke-width="2"/>
      <rect x="6" y="52" width="8" height="8" rx="2"/>
      <rect x="50" y="52" width="8" height="8" rx="2"/>
      <text x="4" y="64" font-size="3" fill="currentColor" stroke="none">Sacrum</text>
    </svg>`
  },
  {
    id: 'obgyn-endometrium',
    name: 'Endometrium',
    domain: 'medicine',
    category: 'female-anatomy',
    tags: ['endometrium', 'lining', 'uterine', 'functional', 'basal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="12" y="8" width="40" height="48" rx="4"/>
      <rect x="16" y="12" width="32" height="16" rx="2" fill="#FFB6C1"/>
      <rect x="16" y="32" width="32" height="8" rx="2" fill="#FF69B4"/>
      <line x1="16" y1="44" x2="48" y2="44" stroke-dasharray="2 2"/>
      <text x="20" y="22" font-size="3" fill="currentColor" stroke="none">Functional</text>
      <text x="24" y="38" font-size="3" fill="currentColor" stroke="none">Basal</text>
      <text x="18" y="52" font-size="3" fill="currentColor" stroke="none">Myometrium</text>
    </svg>`
  },
  {
    id: 'obgyn-myometrium',
    name: 'Myometrium',
    domain: 'medicine',
    category: 'female-anatomy',
    tags: ['myometrium', 'muscle', 'uterine wall', 'smooth muscle', 'layers'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <ellipse cx="32" cy="32" rx="18" ry="14" stroke-dasharray="3 2"/>
      <ellipse cx="32" cy="32" rx="12" ry="8" stroke-dasharray="3 2"/>
      <ellipse cx="32" cy="32" rx="6" ry="4" fill="currentColor" opacity="0.3"/>
      <text x="44" y="20" font-size="3" fill="currentColor" stroke="none">Outer</text>
      <text x="44" y="32" font-size="3" fill="currentColor" stroke="none">Middle</text>
      <text x="44" y="44" font-size="3" fill="currentColor" stroke="none">Inner</text>
    </svg>`
  },

  // ===========================================================================
  // PREGNANCY (15 icons)
  // ===========================================================================
  {
    id: 'obgyn-embryo-week4',
    name: 'Embryo Week 4',
    domain: 'medicine',
    category: 'pregnancy',
    tags: ['embryo', 'week 4', 'development', 'early pregnancy', 'neural tube'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <path d="M32 16c-4 8-4 24 0 32" stroke-width="2" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="20" r="6" fill="currentColor" opacity="0.4"/>
      <text x="16" y="56" font-size="4" fill="currentColor" stroke="none">4 weeks</text>
    </svg>`
  },
  {
    id: 'obgyn-embryo-week8',
    name: 'Embryo Week 8',
    domain: 'medicine',
    category: 'pregnancy',
    tags: ['embryo', 'week 8', 'development', 'organogenesis', 'limb buds'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="18" ry="22" fill="currentColor" opacity="0.1"/>
      <path d="M32 12c-8 4-12 16-12 24s4 16 8 16c4 0 4-4 4-8" fill="currentColor" opacity="0.3"/>
      <circle cx="28" cy="20" r="8"/>
      <circle cx="26" cy="18" r="2" fill="currentColor"/>
      <path d="M18 28l-6 4"/>
      <path d="M38 28l6 4"/>
      <path d="M24 44l-4 8"/>
      <path d="M36 44l4 8"/>
      <text x="16" y="60" font-size="4" fill="currentColor" stroke="none">8 weeks</text>
    </svg>`
  },
  {
    id: 'obgyn-fetus-first-trimester',
    name: 'Fetus First Trimester',
    domain: 'medicine',
    category: 'pregnancy',
    tags: ['fetus', 'first trimester', '12 weeks', 'development', 'crown-rump'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="28" cy="18" r="10" fill="currentColor" opacity="0.2"/>
      <circle cx="28" cy="18" r="10"/>
      <path d="M28 28c0 8-4 16-4 24" stroke-width="2"/>
      <path d="M28 28c8 4 12 12 12 20"/>
      <circle cx="26" cy="16" r="2" fill="currentColor"/>
      <path d="M18 32l-8 4"/>
      <path d="M32 32l8 4"/>
      <path d="M20 48l-4 8"/>
      <path d="M36 48l4 8"/>
      <text x="44" y="20" font-size="3" fill="currentColor" stroke="none">12 wks</text>
    </svg>`
  },
  {
    id: 'obgyn-fetus-second-trimester',
    name: 'Fetus Second Trimester',
    domain: 'medicine',
    category: 'pregnancy',
    tags: ['fetus', 'second trimester', '20 weeks', 'development', 'anatomy scan'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="16" r="12" fill="currentColor" opacity="0.2"/>
      <circle cx="20" cy="16" r="12"/>
      <path d="M20 28c0 4-2 12-2 20" stroke-width="2"/>
      <path d="M22 28c4 4 10 8 14 16" stroke-width="1.5"/>
      <circle cx="18" cy="14" r="2" fill="currentColor"/>
      <path d="M10 32c-4 4-4 8-4 12"/>
      <path d="M28 32c4 4 8 4 12 8"/>
      <path d="M14 48c-2 4-2 8-2 8"/>
      <path d="M32 44c4 4 6 8 8 12"/>
      <text x="40" y="20" font-size="3" fill="currentColor" stroke="none">20 wks</text>
    </svg>`
  },
  {
    id: 'obgyn-fetus-third-trimester',
    name: 'Fetus Third Trimester',
    domain: 'medicine',
    category: 'pregnancy',
    tags: ['fetus', 'third trimester', '36 weeks', 'term', 'vertex'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="28" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="48" r="10"/>
      <path d="M32 38c4-8 8-16 8-24" stroke-width="2"/>
      <path d="M32 38c-4-8-8-16-8-24" stroke-width="2"/>
      <circle cx="30" cy="46" r="2" fill="currentColor"/>
      <path d="M40 28c4-4 8-4 12-2"/>
      <path d="M24 28c-4-4-8-4-12-2"/>
      <path d="M38 16c2-4 4-4 8-4"/>
      <path d="M26 16c-2-4-4-4-8-4"/>
      <text x="46" y="56" font-size="3" fill="currentColor" stroke="none">Term</text>
    </svg>`
  },
  {
    id: 'obgyn-placenta',
    name: 'Placenta',
    domain: 'medicine',
    category: 'pregnancy',
    tags: ['placenta', 'afterbirth', 'villi', 'maternal', 'fetal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16" fill="#DC143C" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="24" ry="16"/>
      <path d="M32 16v-8" stroke-width="3"/>
      <path d="M28 8h8"/>
      <circle cx="20" cy="28" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="32" r="5" fill="currentColor" opacity="0.3"/>
      <circle cx="44" cy="30" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="26" cy="38" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="40" cy="36" r="3" fill="currentColor" opacity="0.3"/>
      <text x="18" y="56" font-size="4" fill="currentColor" stroke="none">Placenta</text>
    </svg>`
  },
  {
    id: 'obgyn-umbilical-cord',
    name: 'Umbilical Cord',
    domain: 'medicine',
    category: 'pregnancy',
    tags: ['umbilical', 'cord', 'arteries', 'vein', 'Wharton jelly'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-8 8-8 16 0 24s0 16-8 24" stroke-width="4" fill="none"/>
      <circle cx="32" cy="8" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="24" cy="56" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="30" cy="32" r="6"/>
      <circle cx="28" cy="30" r="2" fill="blue"/>
      <circle cx="34" cy="30" r="1.5" fill="red"/>
      <circle cx="32" cy="35" r="1.5" fill="red"/>
      <text x="40" y="34" font-size="3" fill="currentColor" stroke="none">2 Art</text>
      <text x="40" y="40" font-size="3" fill="currentColor" stroke="none">1 Vein</text>
    </svg>`
  },
  {
    id: 'obgyn-amniotic-fluid',
    name: 'Amniotic Fluid',
    domain: 'medicine',
    category: 'pregnancy',
    tags: ['amniotic', 'fluid', 'AFI', 'liquor', 'membranes'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="28" fill="#87CEEB" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="24" ry="28"/>
      <path d="M24 44c4-8 4-16 4-24" fill="currentColor" opacity="0.4"/>
      <circle cx="24" cy="48" r="6"/>
      <path d="M18 28l-4-4"/>
      <path d="M30 28l4-4"/>
      <text x="36" y="24" font-size="3" fill="currentColor" stroke="none">AFI</text>
      <text x="36" y="30" font-size="3" fill="currentColor" stroke="none">Normal</text>
      <text x="36" y="36" font-size="3" fill="currentColor" stroke="none">5-25cm</text>
    </svg>`
  },
  {
    id: 'obgyn-vertex-presentation',
    name: 'Vertex Presentation',
    domain: 'medicine',
    category: 'pregnancy',
    tags: ['vertex', 'presentation', 'cephalic', 'head down', 'LOA', 'ROA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="28" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="52" r="8"/>
      <path d="M32 44v-20"/>
      <circle cx="32" cy="16" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M24 28l-8-4"/>
      <path d="M40 28l8-4"/>
      <circle cx="30" cy="50" r="1.5" fill="currentColor"/>
      <text x="44" y="56" font-size="4" fill="currentColor" stroke="none">Vertex</text>
    </svg>`
  },
  {
    id: 'obgyn-breech-presentation',
    name: 'Breech Presentation',
    domain: 'medicine',
    category: 'pregnancy',
    tags: ['breech', 'presentation', 'frank', 'complete', 'footling'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="28" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="12" r="8"/>
      <path d="M32 20v16"/>
      <ellipse cx="32" cy="48" rx="8" ry="6" fill="currentColor" opacity="0.3"/>
      <path d="M24 40l-8 12"/>
      <path d="M40 40l8 12"/>
      <circle cx="30" cy="10" r="1.5" fill="currentColor"/>
      <text x="44" y="56" font-size="4" fill="currentColor" stroke="none">Breech</text>
    </svg>`
  },
  {
    id: 'obgyn-transverse-lie',
    name: 'Transverse Lie',
    domain: 'medicine',
    category: 'pregnancy',
    tags: ['transverse', 'lie', 'shoulder', 'oblique', 'malpresentation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="20" fill="currentColor" opacity="0.1"/>
      <circle cx="12" cy="32" r="8"/>
      <path d="M20 32h24"/>
      <ellipse cx="52" cy="32" rx="6" ry="8" fill="currentColor" opacity="0.3"/>
      <path d="M32 24l4-8"/>
      <path d="M32 40l4 8"/>
      <circle cx="10" cy="30" r="1.5" fill="currentColor"/>
      <text x="22" y="56" font-size="4" fill="currentColor" stroke="none">Transverse</text>
    </svg>`
  },
  {
    id: 'obgyn-twins-diamniotic',
    name: 'Twins Diamniotic',
    domain: 'medicine',
    category: 'pregnancy',
    tags: ['twins', 'diamniotic', 'dichorionic', 'DCDA', 'multiple'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="28" ry="24"/>
      <line x1="32" y1="8" x2="32" y2="56"/>
      <ellipse cx="20" cy="32" rx="10" ry="14" fill="#FFB6C1" opacity="0.3"/>
      <ellipse cx="44" cy="32" rx="10" ry="14" fill="#87CEEB" opacity="0.3"/>
      <circle cx="20" cy="40" r="4"/>
      <circle cx="44" cy="40" r="4"/>
      <text x="6" y="56" font-size="3" fill="currentColor" stroke="none">Twin A</text>
      <text x="42" y="56" font-size="3" fill="currentColor" stroke="none">Twin B</text>
    </svg>`
  },
  {
    id: 'obgyn-twins-monoamniotic',
    name: 'Twins Monoamniotic',
    domain: 'medicine',
    category: 'pregnancy',
    tags: ['twins', 'monoamniotic', 'monochorionic', 'MCMA', 'cord entanglement'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="24" fill="#FFB6C1" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="28" ry="24"/>
      <circle cx="22" cy="38" r="6"/>
      <circle cx="42" cy="38" r="6"/>
      <path d="M22 32v-16c4-4 16-4 20 0v16" stroke-width="2"/>
      <path d="M32 8v-4"/>
      <ellipse cx="32" cy="6" rx="6" ry="3" fill="#DC143C" opacity="0.3"/>
      <text x="14" y="56" font-size="3" fill="currentColor" stroke="none">MCMA Twins</text>
    </svg>`
  },
  {
    id: 'obgyn-gestational-sac',
    name: 'Gestational Sac',
    domain: 'medicine',
    category: 'pregnancy',
    tags: ['gestational sac', 'early pregnancy', 'yolk sac', 'MSD', 'intrauterine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <ellipse cx="32" cy="32" rx="14" ry="10" stroke-dasharray="3 2"/>
      <circle cx="28" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="38" cy="32" r="2"/>
      <path d="M38 32c4 0 8-4 8-4"/>
      <text x="12" y="56" font-size="3" fill="currentColor" stroke="none">Gestational Sac</text>
      <text x="42" y="38" font-size="3" fill="currentColor" stroke="none">Yolk</text>
    </svg>`
  },
  {
    id: 'obgyn-fetal-heart',
    name: 'Fetal Heart',
    domain: 'medicine',
    category: 'pregnancy',
    tags: ['fetal heart', 'FHR', 'cardiac', 'four chamber', 'ultrasound'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-12 0-20 10-20 22 0 14 20 26 20 26s20-12 20-26c0-12-8-22-20-22z" fill="#DC143C" opacity="0.3"/>
      <path d="M32 8c-12 0-20 10-20 22 0 14 20 26 20 26s20-12 20-26c0-12-8-22-20-22z"/>
      <path d="M32 8v48"/>
      <path d="M12 30h40"/>
      <text x="18" y="22" font-size="4" fill="currentColor" stroke="none">RA</text>
      <text x="38" y="22" font-size="4" fill="currentColor" stroke="none">LA</text>
      <text x="18" y="40" font-size="4" fill="currentColor" stroke="none">RV</text>
      <text x="38" y="40" font-size="4" fill="currentColor" stroke="none">LV</text>
      <text x="14" y="56" font-size="3" fill="currentColor" stroke="none">FHR 120-160</text>
    </svg>`
  },

  // ===========================================================================
  // LABOR/DELIVERY (12 icons)
  // ===========================================================================
  {
    id: 'obgyn-labor-stage1',
    name: 'Labor Stage 1',
    domain: 'medicine',
    category: 'labor-delivery',
    tags: ['labor', 'stage 1', 'latent', 'active', 'dilation', 'contractions'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="20" ry="16" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="24" rx="20" ry="16"/>
      <path d="M32 40v16"/>
      <ellipse cx="32" cy="48" rx="8" ry="4"/>
      <circle cx="32" cy="48" r="2" fill="currentColor"/>
      <path d="M16 24c4 4 12 4 16 0"/>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Stage 1: 0-10cm</text>
    </svg>`
  },
  {
    id: 'obgyn-labor-stage2',
    name: 'Labor Stage 2',
    domain: 'medicine',
    category: 'labor-delivery',
    tags: ['labor', 'stage 2', 'pushing', 'descent', 'delivery', 'crowning'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="18" ry="14" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="20" rx="18" ry="14"/>
      <path d="M24 34c0 8-4 16-4 22"/>
      <path d="M40 34c0 8 4 16 4 22"/>
      <circle cx="32" cy="48" r="10"/>
      <circle cx="30" cy="46" r="2" fill="currentColor"/>
      <path d="M28 52c2 2 6 2 8 0"/>
      <text x="6" y="60" font-size="4" fill="currentColor" stroke="none">Stage 2: Pushing</text>
    </svg>`
  },
  {
    id: 'obgyn-labor-stage3',
    name: 'Labor Stage 3',
    domain: 'medicine',
    category: 'labor-delivery',
    tags: ['labor', 'stage 3', 'placenta', 'delivery', 'afterbirth'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="16" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="16" rx="16" ry="10"/>
      <path d="M28 26v20"/>
      <path d="M36 26v20"/>
      <ellipse cx="32" cy="52" rx="14" ry="8" fill="#DC143C" opacity="0.3"/>
      <ellipse cx="32" cy="52" rx="14" ry="8"/>
      <path d="M32 44v-4" stroke-width="2"/>
      <text x="4" y="60" font-size="4" fill="currentColor" stroke="none">Stage 3: Placenta</text>
    </svg>`
  },
  {
    id: 'obgyn-cervical-dilation',
    name: 'Cervical Dilation',
    domain: 'medicine',
    category: 'labor-delivery',
    tags: ['cervix', 'dilation', 'effacement', 'labor', 'centimeters'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="16" r="2"/>
      <circle cx="32" cy="16" r="4"/>
      <circle cx="52" cy="16" r="6"/>
      <circle cx="16" cy="40" r="8"/>
      <circle cx="44" cy="40" r="12"/>
      <text x="14" y="28" font-size="3" fill="currentColor" stroke="none">1cm</text>
      <text x="28" y="28" font-size="3" fill="currentColor" stroke="none">3cm</text>
      <text x="48" y="28" font-size="3" fill="currentColor" stroke="none">5cm</text>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">8cm</text>
      <text x="38" y="60" font-size="3" fill="currentColor" stroke="none">10cm</text>
    </svg>`
  },
  {
    id: 'obgyn-fetal-station',
    name: 'Fetal Station',
    domain: 'medicine',
    category: 'labor-delivery',
    tags: ['station', 'descent', 'ischial spines', 'engagement', 'labor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h48"/>
      <circle cx="32" cy="16" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.4"/>
      <circle cx="32" cy="48" r="8" fill="currentColor" opacity="0.6"/>
      <text x="44" y="18" font-size="4" fill="currentColor" stroke="none">-3</text>
      <text x="44" y="34" font-size="4" fill="currentColor" stroke="none">0</text>
      <text x="44" y="50" font-size="4" fill="currentColor" stroke="none">+3</text>
      <text x="4" y="36" font-size="3" fill="currentColor" stroke="none">Spines</text>
    </svg>`
  },
  {
    id: 'obgyn-delivery-position-lithotomy',
    name: 'Lithotomy Position',
    domain: 'medicine',
    category: 'labor-delivery',
    tags: ['lithotomy', 'position', 'delivery', 'stirrups', 'birth'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="48" rx="16" ry="8" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="16" r="8"/>
      <path d="M32 24v12"/>
      <path d="M32 36l-16 12"/>
      <path d="M32 36l16 12"/>
      <path d="M16 48l-8 8"/>
      <path d="M48 48l8 8"/>
      <path d="M24 32l-12 4"/>
      <path d="M40 32l12 4"/>
    </svg>`
  },
  {
    id: 'obgyn-cesarean-section',
    name: 'Cesarean Section',
    domain: 'medicine',
    category: 'labor-delivery',
    tags: ['cesarean', 'c-section', 'surgical', 'delivery', 'incision'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <path d="M16 40h32" stroke="red" stroke-width="2"/>
      <path d="M24 40c0-8 4-12 8-12s8 4 8 12" stroke-dasharray="3 2"/>
      <circle cx="32" cy="24" r="6" fill="currentColor" opacity="0.3"/>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Pfannenstiel</text>
    </svg>`
  },
  {
    id: 'obgyn-episiotomy',
    name: 'Episiotomy',
    domain: 'medicine',
    category: 'labor-delivery',
    tags: ['episiotomy', 'perineum', 'laceration', 'mediolateral', 'midline'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <circle cx="32" cy="24" r="10"/>
      <path d="M32 34v20" stroke="red" stroke-width="2" stroke-dasharray="3 2"/>
      <path d="M32 34l12 16" stroke="blue" stroke-width="2" stroke-dasharray="3 2"/>
      <text x="36" y="52" font-size="3" fill="red" stroke="none">Midline</text>
      <text x="44" y="44" font-size="3" fill="blue" stroke="none">ML</text>
    </svg>`
  },
  {
    id: 'obgyn-vacuum-extraction',
    name: 'Vacuum Extraction',
    domain: 'medicine',
    category: 'labor-delivery',
    tags: ['vacuum', 'extraction', 'operative', 'delivery', 'ventouse'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="40" r="14" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="40" r="14"/>
      <ellipse cx="32" cy="28" rx="8" ry="4"/>
      <path d="M32 24v-16"/>
      <rect x="28" y="4" width="8" height="4" rx="1"/>
      <path d="M24 8h-8"/>
      <path d="M40 8h8"/>
      <circle cx="30" cy="38" r="2" fill="currentColor"/>
      <text x="12" y="60" font-size="4" fill="currentColor" stroke="none">Vacuum</text>
    </svg>`
  },
  {
    id: 'obgyn-forceps-delivery',
    name: 'Forceps Delivery',
    domain: 'medicine',
    category: 'labor-delivery',
    tags: ['forceps', 'operative', 'delivery', 'Simpson', 'Kielland'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="40" r="12" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="40" r="12"/>
      <path d="M12 8c4 16 4 24 8 32" stroke-width="2"/>
      <path d="M52 8c-4 16-4 24-8 32" stroke-width="2"/>
      <ellipse cx="20" cy="40" rx="4" ry="8"/>
      <ellipse cx="44" cy="40" rx="4" ry="8"/>
      <circle cx="30" cy="38" r="2" fill="currentColor"/>
      <text x="14" y="60" font-size="4" fill="currentColor" stroke="none">Forceps</text>
    </svg>`
  },
  {
    id: 'obgyn-cord-clamping',
    name: 'Cord Clamping',
    domain: 'medicine',
    category: 'labor-delivery',
    tags: ['cord', 'clamping', 'cutting', 'umbilical', 'delayed'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8c8 8 8 24 0 40" stroke-width="4" stroke="#87CEEB"/>
      <rect x="12" y="24" width="12" height="4" fill="currentColor"/>
      <rect x="12" y="36" width="12" height="4" fill="currentColor"/>
      <path d="M32 28h20" stroke-width="2"/>
      <path d="M44 24l8 4-8 4z"/>
      <text x="32" y="44" font-size="3" fill="currentColor" stroke="none">Cut here</text>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">Clamps</text>
    </svg>`
  },
  {
    id: 'obgyn-cardinal-movements',
    name: 'Cardinal Movements',
    domain: 'medicine',
    category: 'labor-delivery',
    tags: ['cardinal', 'movements', 'labor', 'descent', 'rotation', 'extension'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="12" r="6" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="20" r="6" fill="currentColor" opacity="0.4"/>
      <circle cx="48" cy="32" r="6" fill="currentColor" opacity="0.5"/>
      <circle cx="48" cy="48" r="6" fill="currentColor" opacity="0.6"/>
      <path d="M16 18l10 -2" stroke-dasharray="2 2"/>
      <path d="M38 22l6 6" stroke-dasharray="2 2"/>
      <path d="M48 38v6" stroke-dasharray="2 2"/>
      <text x="4" y="16" font-size="3" fill="currentColor" stroke="none">1</text>
      <text x="22" y="24" font-size="3" fill="currentColor" stroke="none">2</text>
      <text x="54" y="36" font-size="3" fill="currentColor" stroke="none">3</text>
      <text x="54" y="52" font-size="3" fill="currentColor" stroke="none">4</text>
    </svg>`
  },

  // ===========================================================================
  // OBSTETRIC PATHOLOGY (12 icons)
  // ===========================================================================
  {
    id: 'obgyn-preeclampsia',
    name: 'Preeclampsia',
    domain: 'medicine',
    category: 'obstetric-pathology',
    tags: ['preeclampsia', 'hypertension', 'proteinuria', 'pregnancy', 'HELLP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="20" ry="20" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="36" rx="20" ry="20"/>
      <circle cx="32" cy="44" r="6"/>
      <path d="M20 20l-4-12"/>
      <path d="M44 20l4-12"/>
      <circle cx="16" cy="6" r="4" fill="red" opacity="0.5"/>
      <circle cx="48" cy="6" r="4" fill="red" opacity="0.5"/>
      <text x="10" y="16" font-size="3" fill="currentColor" stroke="none">HTN</text>
      <text x="42" y="16" font-size="3" fill="currentColor" stroke="none">Protein</text>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Preeclampsia</text>
    </svg>`
  },
  {
    id: 'obgyn-gestational-diabetes',
    name: 'Gestational Diabetes',
    domain: 'medicine',
    category: 'obstetric-pathology',
    tags: ['gestational diabetes', 'GDM', 'glucose', 'macrosomia', 'insulin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="24" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="36" r="12"/>
      <path d="M8 16h12l4 8 8-16 4 8h12"/>
      <circle cx="28" cy="34" r="2" fill="currentColor"/>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">GDM - Macrosomia</text>
    </svg>`
  },
  {
    id: 'obgyn-placenta-previa',
    name: 'Placenta Previa',
    domain: 'medicine',
    category: 'obstetric-pathology',
    tags: ['placenta previa', 'low-lying', 'bleeding', 'marginal', 'complete'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="20" ry="16" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="28" rx="20" ry="16"/>
      <circle cx="32" cy="24" r="6"/>
      <path d="M24 44h16"/>
      <path d="M28 44v12"/>
      <path d="M36 44v12"/>
      <ellipse cx="32" cy="48" rx="12" ry="4" fill="red" opacity="0.5"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Placenta Previa</text>
    </svg>`
  },
  {
    id: 'obgyn-placental-abruption',
    name: 'Placental Abruption',
    domain: 'medicine',
    category: 'obstetric-pathology',
    tags: ['abruption', 'placenta', 'bleeding', 'separation', 'emergency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="22" ry="18" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="22" ry="18"/>
      <circle cx="32" cy="36" r="8"/>
      <ellipse cx="32" cy="14" rx="14" ry="6" fill="#DC143C" opacity="0.5"/>
      <ellipse cx="24" cy="20" rx="8" ry="4" fill="#8B0000" opacity="0.6"/>
      <path d="M32 8v-4"/>
      <text x="6" y="56" font-size="3" fill="currentColor" stroke="none">Placental Abruption</text>
    </svg>`
  },
  {
    id: 'obgyn-ectopic-pregnancy',
    name: 'Ectopic Pregnancy',
    domain: 'medicine',
    category: 'obstetric-pathology',
    tags: ['ectopic', 'tubal', 'pregnancy', 'extrauterine', 'emergency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="44" rx="12" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="44" rx="12" ry="10"/>
      <path d="M20 44l-12-20"/>
      <path d="M44 44l12-20"/>
      <ellipse cx="52" cy="24" rx="6" ry="8"/>
      <circle cx="52" cy="24" r="4" fill="red" opacity="0.5"/>
      <ellipse cx="12" cy="24" rx="4" ry="6"/>
      <text x="44" y="16" font-size="3" fill="currentColor" stroke="none">Ectopic</text>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Tubal Pregnancy</text>
    </svg>`
  },
  {
    id: 'obgyn-miscarriage-threatened',
    name: 'Threatened Miscarriage',
    domain: 'medicine',
    category: 'obstetric-pathology',
    tags: ['miscarriage', 'threatened', 'abortion', 'bleeding', 'viable'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="18" ry="14" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="28" rx="18" ry="14"/>
      <circle cx="32" cy="26" r="6"/>
      <path d="M28 42v12"/>
      <path d="M36 42v12"/>
      <ellipse cx="32" cy="48" rx="6" ry="3"/>
      <circle cx="32" cy="48" r="2" fill="currentColor"/>
      <path d="M32 52v4" stroke="red" stroke-width="2"/>
      <text x="6" y="60" font-size="3" fill="currentColor" stroke="none">Threatened - Closed os</text>
    </svg>`
  },
  {
    id: 'obgyn-miscarriage-inevitable',
    name: 'Inevitable Miscarriage',
    domain: 'medicine',
    category: 'obstetric-pathology',
    tags: ['miscarriage', 'inevitable', 'abortion', 'open os', 'bleeding'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="18" ry="14" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="28" rx="18" ry="14"/>
      <circle cx="32" cy="26" r="6"/>
      <path d="M26 42v12"/>
      <path d="M38 42v12"/>
      <ellipse cx="32" cy="48" rx="8" ry="4"/>
      <ellipse cx="32" cy="48" rx="4" ry="2" fill="red" opacity="0.5"/>
      <path d="M32 54v6" stroke="red" stroke-width="3"/>
      <text x="8" y="64" font-size="3" fill="currentColor" stroke="none">Inevitable - Open os</text>
    </svg>`
  },
  {
    id: 'obgyn-missed-abortion',
    name: 'Missed Abortion',
    domain: 'medicine',
    category: 'obstetric-pathology',
    tags: ['missed', 'abortion', 'miscarriage', 'no heartbeat', 'retained'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="18" ry="14" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="28" rx="18" ry="14"/>
      <circle cx="32" cy="26" r="6" stroke-dasharray="3 2"/>
      <path d="M26 24l12 4"/>
      <path d="M26 28l12-4"/>
      <path d="M28 42v12"/>
      <path d="M36 42v12"/>
      <ellipse cx="32" cy="48" rx="6" ry="3"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Missed - No FHR</text>
    </svg>`
  },
  {
    id: 'obgyn-iugr',
    name: 'IUGR',
    domain: 'medicine',
    category: 'obstetric-pathology',
    tags: ['IUGR', 'FGR', 'growth restriction', 'small for dates', 'doppler'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="22" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="22" ry="24"/>
      <circle cx="32" cy="44" r="4"/>
      <path d="M32 40v-16"/>
      <path d="M28 20l-4-4"/>
      <path d="M36 20l4-4"/>
      <path d="M28 28l-4 4"/>
      <path d="M36 28l4 4"/>
      <text x="10" y="12" font-size="3" fill="currentColor" stroke="none">Expected</text>
      <ellipse cx="32" cy="32" rx="14" ry="16" stroke-dasharray="4 2"/>
      <text x="10" y="60" font-size="3" fill="currentColor" stroke="none">IUGR &lt;10th %ile</text>
    </svg>`
  },
  {
    id: 'obgyn-polyhydramnios',
    name: 'Polyhydramnios',
    domain: 'medicine',
    category: 'obstetric-pathology',
    tags: ['polyhydramnios', 'excess fluid', 'AFI', 'macrosomia', 'diabetes'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="28" fill="#87CEEB" opacity="0.4"/>
      <ellipse cx="32" cy="32" rx="28" ry="28"/>
      <circle cx="32" cy="40" r="8"/>
      <path d="M32 32v-12"/>
      <path d="M26 16l-4-4"/>
      <path d="M38 16l4-4"/>
      <text x="6" y="60" font-size="3" fill="currentColor" stroke="none">AFI &gt;25cm</text>
    </svg>`
  },
  {
    id: 'obgyn-oligohydramnios',
    name: 'Oligohydramnios',
    domain: 'medicine',
    category: 'obstetric-pathology',
    tags: ['oligohydramnios', 'low fluid', 'AFI', 'PPROM', 'renal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="22" fill="#87CEEB" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="20" ry="22"/>
      <circle cx="32" cy="36" r="10"/>
      <path d="M32 26v-8"/>
      <path d="M24 14l-4-4"/>
      <path d="M40 14l4-4"/>
      <path d="M24 44l-6 8"/>
      <path d="M40 44l6 8"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">AFI &lt;5cm</text>
    </svg>`
  },
  {
    id: 'obgyn-cord-prolapse',
    name: 'Cord Prolapse',
    domain: 'medicine',
    category: 'obstetric-pathology',
    tags: ['cord', 'prolapse', 'emergency', 'compression', 'delivery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="18" ry="14" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="24" rx="18" ry="14"/>
      <circle cx="32" cy="20" r="8"/>
      <path d="M28 38v8"/>
      <path d="M36 38v8"/>
      <ellipse cx="32" cy="50" rx="8" ry="4"/>
      <path d="M32 24c-8 8-4 24-4 32" stroke="#DC143C" stroke-width="3"/>
      <text x="6" y="60" font-size="3" fill="currentColor" stroke="none">Cord Prolapse</text>
    </svg>`
  },

  // ===========================================================================
  // GYNECOLOGIC PATHOLOGY (12 icons)
  // ===========================================================================
  {
    id: 'obgyn-uterine-fibroid',
    name: 'Uterine Fibroid',
    domain: 'medicine',
    category: 'gyn-pathology',
    tags: ['fibroid', 'leiomyoma', 'myoma', 'uterine', 'subserosal', 'intramural'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="20" ry="16" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="28" rx="20" ry="16"/>
      <circle cx="20" cy="24" r="6" fill="currentColor" opacity="0.5"/>
      <circle cx="40" cy="32" r="8" fill="currentColor" opacity="0.5"/>
      <circle cx="32" cy="18" r="4" fill="currentColor" opacity="0.5"/>
      <path d="M32 44v12"/>
      <text x="6" y="56" font-size="3" fill="currentColor" stroke="none">Fibroids</text>
    </svg>`
  },
  {
    id: 'obgyn-endometriosis',
    name: 'Endometriosis',
    domain: 'medicine',
    category: 'gyn-pathology',
    tags: ['endometriosis', 'implants', 'chocolate cyst', 'adhesions', 'pelvic pain'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="12" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="24" rx="12" ry="10"/>
      <circle cx="12" cy="32" r="4" fill="#8B4513" opacity="0.6"/>
      <circle cx="52" cy="32" r="4" fill="#8B4513" opacity="0.6"/>
      <circle cx="24" cy="48" r="3" fill="#8B4513" opacity="0.6"/>
      <circle cx="44" cy="44" r="3" fill="#8B4513" opacity="0.6"/>
      <circle cx="32" cy="52" r="2" fill="#8B4513" opacity="0.6"/>
      <path d="M32 34v12"/>
      <text x="4" y="60" font-size="3" fill="currentColor" stroke="none">Endometriosis Implants</text>
    </svg>`
  },
  {
    id: 'obgyn-ovarian-cyst',
    name: 'Ovarian Cyst',
    domain: 'medicine',
    category: 'gyn-pathology',
    tags: ['ovarian cyst', 'functional', 'follicular', 'corpus luteum', 'simple'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="22" ry="18" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="22" ry="18"/>
      <circle cx="32" cy="32" r="14" fill="#87CEEB" opacity="0.4"/>
      <circle cx="32" cy="32" r="14"/>
      <text x="10" y="56" font-size="3" fill="currentColor" stroke="none">Simple Ovarian Cyst</text>
    </svg>`
  },
  {
    id: 'obgyn-pcos',
    name: 'Polycystic Ovary (PCOS)',
    domain: 'medicine',
    category: 'gyn-pathology',
    tags: ['PCOS', 'polycystic', 'ovary', 'anovulation', 'hyperandrogenism'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="18" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="24" ry="18"/>
      <circle cx="16" cy="28" r="3"/>
      <circle cx="24" cy="22" r="3"/>
      <circle cx="32" cy="20" r="3"/>
      <circle cx="40" cy="22" r="3"/>
      <circle cx="48" cy="28" r="3"/>
      <circle cx="20" cy="36" r="3"/>
      <circle cx="28" cy="42" r="3"/>
      <circle cx="36" cy="42" r="3"/>
      <circle cx="44" cy="36" r="3"/>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">String of Pearls</text>
    </svg>`
  },
  {
    id: 'obgyn-cervical-dysplasia',
    name: 'Cervical Dysplasia',
    domain: 'medicine',
    category: 'gyn-pathology',
    tags: ['dysplasia', 'CIN', 'LSIL', 'HSIL', 'cervical', 'HPV'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="20"/>
      <ellipse cx="32" cy="32" rx="12" ry="12" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="6" ry="6" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
      <path d="M40 24l8-8" stroke="red"/>
      <text x="50" y="18" font-size="3" fill="currentColor" stroke="none">Abnormal</text>
      <text x="50" y="24" font-size="3" fill="currentColor" stroke="none">cells</text>
      <text x="6" y="56" font-size="3" fill="currentColor" stroke="none">CIN / SIL</text>
    </svg>`
  },
  {
    id: 'obgyn-cervical-cancer',
    name: 'Cervical Cancer',
    domain: 'medicine',
    category: 'gyn-pathology',
    tags: ['cervical cancer', 'carcinoma', 'squamous', 'adenocarcinoma', 'staging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="16" ry="12" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="24" rx="16" ry="12"/>
      <path d="M28 36v16"/>
      <path d="M36 36v16"/>
      <ellipse cx="32" cy="44" rx="10" ry="6"/>
      <path d="M32 44c-6 0-10 4-14 8" stroke="red" stroke-width="2"/>
      <path d="M32 44c6 0 10 4 14 8" stroke="red" stroke-width="2"/>
      <circle cx="32" cy="44" r="4" fill="red" opacity="0.5"/>
      <text x="4" y="60" font-size="3" fill="currentColor" stroke="none">Cervical Carcinoma</text>
    </svg>`
  },
  {
    id: 'obgyn-endometrial-cancer',
    name: 'Endometrial Cancer',
    domain: 'medicine',
    category: 'gyn-pathology',
    tags: ['endometrial cancer', 'uterine cancer', 'adenocarcinoma', 'AUB', 'postmenopausal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="20" ry="16" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="28" rx="20" ry="16"/>
      <ellipse cx="32" cy="28" rx="14" ry="10" fill="red" opacity="0.4"/>
      <path d="M20 28c4-4 8-4 12 0s8 4 12 0" fill="red" opacity="0.3"/>
      <path d="M32 44v12"/>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">Endometrial Cancer</text>
    </svg>`
  },
  {
    id: 'obgyn-ovarian-cancer',
    name: 'Ovarian Cancer',
    domain: 'medicine',
    category: 'gyn-pathology',
    tags: ['ovarian cancer', 'carcinoma', 'mass', 'CA-125', 'staging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <circle cx="24" cy="28" r="8" fill="red" opacity="0.4"/>
      <circle cx="40" cy="36" r="10" fill="red" opacity="0.4"/>
      <path d="M28 28c4 4 8 4 12 0"/>
      <path d="M32 44c4 4 8 4 12 0"/>
      <text x="6" y="56" font-size="3" fill="currentColor" stroke="none">Ovarian Masses</text>
    </svg>`
  },
  {
    id: 'obgyn-adenomyosis',
    name: 'Adenomyosis',
    domain: 'medicine',
    category: 'gyn-pathology',
    tags: ['adenomyosis', 'uterus', 'enlarged', 'dysmenorrhea', 'AUB'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="22" ry="18" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="28" rx="22" ry="18"/>
      <circle cx="20" cy="24" r="3" fill="#FFB6C1"/>
      <circle cx="28" cy="32" r="3" fill="#FFB6C1"/>
      <circle cx="36" cy="24" r="3" fill="#FFB6C1"/>
      <circle cx="44" cy="30" r="3" fill="#FFB6C1"/>
      <circle cx="32" cy="20" r="2" fill="#FFB6C1"/>
      <circle cx="24" cy="36" r="2" fill="#FFB6C1"/>
      <path d="M32 46v10"/>
      <text x="6" y="60" font-size="3" fill="currentColor" stroke="none">Adenomyosis</text>
    </svg>`
  },
  {
    id: 'obgyn-endometrial-polyp',
    name: 'Endometrial Polyp',
    domain: 'medicine',
    category: 'gyn-pathology',
    tags: ['polyp', 'endometrial', 'AUB', 'hysteroscopy', 'focal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="18" ry="14" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="28" rx="18" ry="14"/>
      <path d="M28 20c0-4 4-8 8-8" stroke-width="2"/>
      <ellipse cx="36" cy="10" rx="4" ry="3" fill="currentColor" opacity="0.4"/>
      <path d="M32 42v14"/>
      <text x="42" y="14" font-size="3" fill="currentColor" stroke="none">Polyp</text>
      <text x="6" y="60" font-size="3" fill="currentColor" stroke="none">Endometrial Polyp</text>
    </svg>`
  },
  {
    id: 'obgyn-bartholin-cyst',
    name: 'Bartholin Cyst',
    domain: 'medicine',
    category: 'gyn-pathology',
    tags: ['Bartholin', 'cyst', 'abscess', 'vulvar', 'gland'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="16" ry="24"/>
      <ellipse cx="32" cy="32" rx="8" ry="16"/>
      <circle cx="44" cy="44" r="8" fill="currentColor" opacity="0.4"/>
      <circle cx="44" cy="44" r="8"/>
      <text x="52" y="48" font-size="3" fill="currentColor" stroke="none">Cyst</text>
      <text x="6" y="60" font-size="3" fill="currentColor" stroke="none">Bartholin</text>
    </svg>`
  },
  {
    id: 'obgyn-pelvic-organ-prolapse',
    name: 'Pelvic Organ Prolapse',
    domain: 'medicine',
    category: 'gyn-pathology',
    tags: ['prolapse', 'cystocele', 'rectocele', 'uterine', 'POP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c0 8 4 16 16 16s16-8 16-16" fill="currentColor" opacity="0.1"/>
      <path d="M16 16c0 8 4 16 16 16s16-8 16-16"/>
      <ellipse cx="32" cy="40" rx="10" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="40" rx="10" ry="8"/>
      <path d="M32 48v8"/>
      <ellipse cx="32" cy="58" rx="6" ry="4" stroke-dasharray="3 2"/>
      <text x="4" y="60" font-size="3" fill="currentColor" stroke="none">Prolapse</text>
    </svg>`
  },

  // ===========================================================================
  // REPRODUCTIVE (10 icons)
  // ===========================================================================
  {
    id: 'obgyn-menstrual-cycle',
    name: 'Menstrual Cycle',
    domain: 'medicine',
    category: 'reproductive',
    tags: ['menstrual', 'cycle', 'phases', 'ovulation', 'hormones'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="24"/>
      <path d="M32 8v8"/>
      <path d="M32 48v8"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <path d="M32 32l16 -12" stroke="red" stroke-width="2"/>
      <text x="50" y="18" font-size="3" fill="currentColor" stroke="none">14</text>
      <text x="28" y="6" font-size="3" fill="currentColor" stroke="none">1</text>
      <text x="54" y="34" font-size="3" fill="currentColor" stroke="none">21</text>
      <text x="28" y="62" font-size="3" fill="currentColor" stroke="none">28</text>
    </svg>`
  },
  {
    id: 'obgyn-ovulation',
    name: 'Ovulation',
    domain: 'medicine',
    category: 'reproductive',
    tags: ['ovulation', 'follicle', 'egg release', 'LH surge', 'fertile'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="28" cy="32" rx="18" ry="14" fill="currentColor" opacity="0.2"/>
      <ellipse cx="28" cy="32" rx="18" ry="14"/>
      <path d="M40 28c4-4 12-8 16-4"/>
      <circle cx="52" cy="20" r="6" fill="#FFD700" opacity="0.5"/>
      <circle cx="52" cy="20" r="6"/>
      <path d="M36 32c4 0 8-4 10-8" stroke-dasharray="2 2"/>
      <circle cx="36" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">Ovulation - Day 14</text>
    </svg>`
  },
  {
    id: 'obgyn-fertilization',
    name: 'Fertilization',
    domain: 'medicine',
    category: 'reproductive',
    tags: ['fertilization', 'conception', 'sperm', 'oocyte', 'zygote'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16" fill="#FFD700" opacity="0.3"/>
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.2"/>
      <path d="M8 32h8"/>
      <circle cx="12" cy="32" r="3"/>
      <path d="M12 32l-8 0"/>
      <path d="M4 28l4 4-4 4"/>
      <text x="10" y="56" font-size="3" fill="currentColor" stroke="none">Fertilization</text>
    </svg>`
  },
  {
    id: 'obgyn-implantation',
    name: 'Implantation',
    domain: 'medicine',
    category: 'reproductive',
    tags: ['implantation', 'blastocyst', 'endometrium', 'day 6-7', 'attachment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="40" width="48" height="16" rx="2" fill="#FFB6C1" opacity="0.4"/>
      <rect x="8" y="40" width="48" height="16" rx="2"/>
      <path d="M12 40c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0 4-2 6 0 4 2 6 0"/>
      <circle cx="32" cy="32" r="8"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M32 40v-8" stroke-dasharray="2 2"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Implantation Day 6-7</text>
    </svg>`
  },
  {
    id: 'obgyn-estrogen',
    name: 'Estrogen',
    domain: 'medicine',
    category: 'reproductive',
    tags: ['estrogen', 'E2', 'hormone', 'follicular', 'ovarian'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="12" fill="#FF69B4" opacity="0.3"/>
      <circle cx="32" cy="24" r="12"/>
      <path d="M32 36v16"/>
      <path d="M24 48h16"/>
      <path d="M8 56l12-8 12 12 8-20 8 16 8-8"/>
      <text x="8" y="12" font-size="4" fill="currentColor" stroke="none">Estrogen</text>
    </svg>`
  },
  {
    id: 'obgyn-progesterone',
    name: 'Progesterone',
    domain: 'medicine',
    category: 'reproductive',
    tags: ['progesterone', 'P4', 'hormone', 'luteal', 'corpus luteum'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="12" fill="#9370DB" opacity="0.3"/>
      <circle cx="32" cy="24" r="12"/>
      <path d="M32 36v16"/>
      <path d="M24 44h16"/>
      <path d="M24 52h16"/>
      <path d="M8 56l8 0 8-4 8 8 8-16 8 8 8 4"/>
      <text x="4" y="12" font-size="4" fill="currentColor" stroke="none">Progesterone</text>
    </svg>`
  },
  {
    id: 'obgyn-fsh',
    name: 'FSH',
    domain: 'medicine',
    category: 'reproductive',
    tags: ['FSH', 'follicle stimulating', 'hormone', 'pituitary', 'gonadotropin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="24" rx="4" fill="#87CEEB" opacity="0.3"/>
      <rect x="16" y="16" width="32" height="24" rx="4"/>
      <text x="22" y="32" font-size="8" fill="currentColor" stroke="none">FSH</text>
      <path d="M16 48l8-8 8 4 8-8 8 12"/>
      <text x="4" y="60" font-size="3" fill="currentColor" stroke="none">Follicle Stimulating</text>
    </svg>`
  },
  {
    id: 'obgyn-lh',
    name: 'LH',
    domain: 'medicine',
    category: 'reproductive',
    tags: ['LH', 'luteinizing', 'hormone', 'surge', 'ovulation trigger'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="24" rx="4" fill="#FFD700" opacity="0.3"/>
      <rect x="16" y="16" width="32" height="24" rx="4"/>
      <text x="24" y="32" font-size="8" fill="currentColor" stroke="none">LH</text>
      <path d="M16 52l8 0 4-16 4 16 8 0"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">LH Surge - Ovulation</text>
    </svg>`
  },
  {
    id: 'obgyn-hcg',
    name: 'hCG',
    domain: 'medicine',
    category: 'reproductive',
    tags: ['hCG', 'pregnancy hormone', 'beta', 'trophoblast', 'detection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="12" width="32" height="24" rx="4" fill="#98FB98" opacity="0.3"/>
      <rect x="16" y="12" width="32" height="24" rx="4"/>
      <text x="20" y="28" font-size="7" fill="currentColor" stroke="none">hCG</text>
      <path d="M8 56l8 0 8-8 8 -16 16-24"/>
      <text x="4" y="48" font-size="3" fill="currentColor" stroke="none">Pregnancy hormone</text>
    </svg>`
  },
  {
    id: 'obgyn-follicular-phase',
    name: 'Follicular Phase',
    domain: 'medicine',
    category: 'reproductive',
    tags: ['follicular', 'phase', 'proliferative', 'estrogen', 'days 1-14'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="20" ry="16" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="28" rx="20" ry="16"/>
      <circle cx="18" cy="24" r="3"/>
      <circle cx="28" cy="20" r="4"/>
      <circle cx="40" cy="24" r="5"/>
      <circle cx="46" cy="28" r="6" fill="#FFD700" opacity="0.4"/>
      <circle cx="46" cy="28" r="6"/>
      <path d="M32 44v12"/>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">Follicular - Days 1-14</text>
    </svg>`
  },

  // ===========================================================================
  // EQUIPMENT (10 icons)
  // ===========================================================================
  {
    id: 'obgyn-speculum',
    name: 'Speculum',
    domain: 'medicine',
    category: 'equipment',
    tags: ['speculum', 'Graves', 'pelvic exam', 'visualization', 'instrument'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8l-8 24v8h8z" fill="currentColor" opacity="0.2"/>
      <path d="M44 8l8 24v8h-8z" fill="currentColor" opacity="0.2"/>
      <path d="M20 8l-8 24v8h8z"/>
      <path d="M44 8l8 24v8h-8z"/>
      <path d="M20 40v16"/>
      <path d="M44 40v16"/>
      <path d="M20 56h24"/>
      <circle cx="32" cy="56" r="4"/>
      <text x="14" y="64" font-size="3" fill="currentColor" stroke="none">Speculum</text>
    </svg>`
  },
  {
    id: 'obgyn-transvaginal-ultrasound',
    name: 'Transvaginal Ultrasound',
    domain: 'medicine',
    category: 'equipment',
    tags: ['transvaginal', 'ultrasound', 'probe', 'TVUS', 'imaging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 8h8v20c0 4-2 8-4 12v16c0 4-4 4-4 0V40c-2-4-4-8-4-12V8z" fill="currentColor" opacity="0.2"/>
      <path d="M28 8h8v20c0 4-2 8-4 12v16c0 4-4 4-4 0V40c-2-4-4-8-4-12V8z"/>
      <ellipse cx="32" cy="12" rx="4" ry="2"/>
      <path d="M36 28l8 4"/>
      <path d="M36 32l8 4"/>
      <path d="M36 36l8 4"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Transvaginal US</text>
    </svg>`
  },
  {
    id: 'obgyn-obstetric-ultrasound',
    name: 'Obstetric Ultrasound',
    domain: 'medicine',
    category: 'equipment',
    tags: ['obstetric', 'ultrasound', 'transabdominal', 'fetal', 'imaging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="32" height="40" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="32" height="40" rx="4"/>
      <ellipse cx="24" cy="28" rx="12" ry="14" fill="#87CEEB" opacity="0.3"/>
      <circle cx="24" cy="32" r="6"/>
      <path d="M40 28h16"/>
      <ellipse cx="52" cy="28" rx="8" ry="4" fill="currentColor" opacity="0.2"/>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">OB Ultrasound</text>
    </svg>`
  },
  {
    id: 'obgyn-fetal-monitor',
    name: 'Fetal Monitor (CTG)',
    domain: 'medicine',
    category: 'equipment',
    tags: ['fetal monitor', 'CTG', 'NST', 'cardiotocography', 'FHR'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="32" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="48" height="32" rx="4"/>
      <path d="M12 28l6 -8 6 16 6 -12 6 8 6 -4 6 0"/>
      <path d="M12 16l8 0 4 4 4 -4 8 0"/>
      <circle cx="20" cy="52" r="6"/>
      <circle cx="44" cy="52" r="6"/>
      <path d="M20 46v-6"/>
      <path d="M44 46v-6"/>
      <text x="14" y="22" font-size="3" fill="currentColor" stroke="none">FHR</text>
      <text x="36" y="22" font-size="3" fill="currentColor" stroke="none">Toco</text>
    </svg>`
  },
  {
    id: 'obgyn-colposcope',
    name: 'Colposcope',
    domain: 'medicine',
    category: 'equipment',
    tags: ['colposcope', 'colposcopy', 'cervix', 'magnification', 'biopsy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="20" r="10"/>
      <circle cx="40" cy="20" r="10"/>
      <circle cx="24" cy="20" r="6" fill="currentColor" opacity="0.3"/>
      <circle cx="40" cy="20" r="6" fill="currentColor" opacity="0.3"/>
      <path d="M32 30v20"/>
      <path d="M24 50h16"/>
      <rect x="20" y="50" width="24" height="8" rx="2"/>
      <text x="8" y="64" font-size="3" fill="currentColor" stroke="none">Colposcope</text>
    </svg>`
  },
  {
    id: 'obgyn-iud-device',
    name: 'IUD Device',
    domain: 'medicine',
    category: 'equipment',
    tags: ['IUD', 'intrauterine device', 'contraception', 'Mirena', 'Paragard'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v40"/>
      <path d="M20 16l12 8 12-8"/>
      <path d="M20 16v24c0 4 4 8 12 8s12-4 12-8V16"/>
      <path d="M28 48v8"/>
      <path d="M36 48v8"/>
      <circle cx="28" cy="58" r="2"/>
      <circle cx="36" cy="58" r="2"/>
      <text x="20" y="64" font-size="4" fill="currentColor" stroke="none">IUD</text>
    </svg>`
  },
  {
    id: 'obgyn-hysteroscope',
    name: 'Hysteroscope',
    domain: 'medicine',
    category: 'equipment',
    tags: ['hysteroscope', 'hysteroscopy', 'intrauterine', 'visualization', 'procedure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="28" y="4" width="8" height="44" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="28" y="4" width="8" height="44" rx="2"/>
      <circle cx="32" cy="8" r="2"/>
      <path d="M28 48l-8 8"/>
      <path d="M36 48l8 8"/>
      <circle cx="20" cy="56" r="4"/>
      <circle cx="44" cy="56" r="4"/>
      <path d="M32 24l8 4"/>
      <path d="M32 32l8 4"/>
      <text x="8" y="64" font-size="3" fill="currentColor" stroke="none">Hysteroscope</text>
    </svg>`
  },
  {
    id: 'obgyn-doppler',
    name: 'Fetal Doppler',
    domain: 'medicine',
    category: 'equipment',
    tags: ['doppler', 'fetal heart', 'FHR', 'handheld', 'prenatal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="40" rx="8" fill="currentColor" opacity="0.1"/>
      <rect x="16" y="8" width="32" height="40" rx="8"/>
      <rect x="20" y="12" width="24" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <text x="24" y="22" font-size="6" fill="currentColor" stroke="none">148</text>
      <circle cx="32" cy="36" r="6"/>
      <path d="M32 48v8"/>
      <ellipse cx="32" cy="58" rx="8" ry="4"/>
      <text x="10" y="64" font-size="3" fill="currentColor" stroke="none">Fetal Doppler</text>
    </svg>`
  },
  {
    id: 'obgyn-amniocentesis-needle',
    name: 'Amniocentesis Needle',
    domain: 'medicine',
    category: 'equipment',
    tags: ['amniocentesis', 'needle', 'amnio', 'genetic testing', 'procedure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="24" ry="16" fill="#87CEEB" opacity="0.2"/>
      <ellipse cx="32" cy="40" rx="24" ry="16"/>
      <circle cx="32" cy="44" r="6"/>
      <path d="M48 8l-16 24" stroke-width="2"/>
      <path d="M48 8l4 -4 4 4"/>
      <rect x="48" y="4" width="8" height="12" rx="2"/>
      <text x="4" y="60" font-size="3" fill="currentColor" stroke="none">Amniocentesis</text>
    </svg>`
  },
  {
    id: 'obgyn-curette',
    name: 'Curette',
    domain: 'medicine',
    category: 'equipment',
    tags: ['curette', 'D&C', 'curettage', 'endometrial', 'instrument'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v40"/>
      <ellipse cx="32" cy="52" rx="8" ry="4"/>
      <path d="M24 52c0 4 4 8 8 8s8-4 8-8"/>
      <rect x="28" y="4" width="8" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <text x="14" y="64" font-size="3" fill="currentColor" stroke="none">Curette</text>
    </svg>`
  },

  // ===========================================================================
  // CONTRACEPTION (7 icons)
  // ===========================================================================
  {
    id: 'obgyn-copper-iud',
    name: 'Copper IUD',
    domain: 'medicine',
    category: 'contraception',
    tags: ['copper IUD', 'Paragard', 'non-hormonal', 'contraception', 'LARC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v36" stroke="#B87333" stroke-width="3"/>
      <path d="M20 14l12 8 12-8" stroke="#B87333" stroke-width="2"/>
      <path d="M20 14v22c0 4 4 8 12 8s12-4 12-8V14" stroke="#B87333" stroke-width="2"/>
      <path d="M28 44v12"/>
      <path d="M36 44v12"/>
      <text x="14" y="64" font-size="3" fill="currentColor" stroke="none">Copper IUD</text>
    </svg>`
  },
  {
    id: 'obgyn-hormonal-iud',
    name: 'Hormonal IUD',
    domain: 'medicine',
    category: 'contraception',
    tags: ['hormonal IUD', 'Mirena', 'levonorgestrel', 'contraception', 'LARC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v36" stroke="#4169E1" stroke-width="3"/>
      <path d="M20 14l12 8 12-8" stroke="#4169E1" stroke-width="2"/>
      <path d="M20 14v22c0 4 4 8 12 8s12-4 12-8V14" stroke="#4169E1" stroke-width="2"/>
      <rect x="28" y="16" width="8" height="20" rx="2" fill="#4169E1" opacity="0.3"/>
      <path d="M28 44v12"/>
      <path d="M36 44v12"/>
      <text x="8" y="64" font-size="3" fill="currentColor" stroke="none">Hormonal IUD</text>
    </svg>`
  },
  {
    id: 'obgyn-implant',
    name: 'Contraceptive Implant',
    domain: 'medicine',
    category: 'contraception',
    tags: ['implant', 'Nexplanon', 'etonogestrel', 'arm', 'LARC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="12" fill="currentColor" opacity="0.1"/>
      <path d="M8 32c8-4 16-4 24 0s16 4 24 0"/>
      <path d="M8 32c8 4 16 4 24 0s16-4 24 0"/>
      <rect x="20" y="28" width="24" height="8" rx="4" fill="#9370DB" opacity="0.5"/>
      <rect x="20" y="28" width="24" height="8" rx="4"/>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">Subdermal Implant</text>
    </svg>`
  },
  {
    id: 'obgyn-oral-contraceptive',
    name: 'Oral Contraceptive',
    domain: 'medicine',
    category: 'contraception',
    tags: ['pill', 'OCP', 'birth control', 'hormonal', 'combined'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <circle cx="20" cy="20" r="4" fill="#FF69B4"/>
      <circle cx="32" cy="20" r="4" fill="#FF69B4"/>
      <circle cx="44" cy="20" r="4" fill="#FF69B4"/>
      <circle cx="20" cy="32" r="4" fill="#FF69B4"/>
      <circle cx="32" cy="32" r="4" fill="#FF69B4"/>
      <circle cx="44" cy="32" r="4" fill="#FF69B4"/>
      <circle cx="20" cy="44" r="4" fill="#FF69B4"/>
      <circle cx="32" cy="44" r="4" fill="white" stroke="currentColor"/>
      <circle cx="44" cy="44" r="4" fill="white" stroke="currentColor"/>
      <text x="14" y="60" font-size="3" fill="currentColor" stroke="none">OCP Pack</text>
    </svg>`
  },
  {
    id: 'obgyn-vaginal-ring',
    name: 'Vaginal Ring',
    domain: 'medicine',
    category: 'contraception',
    tags: ['ring', 'NuvaRing', 'vaginal', 'hormonal', 'contraception'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="none"/>
      <circle cx="32" cy="32" r="20" stroke-width="8" stroke="#87CEEB" opacity="0.5"/>
      <circle cx="32" cy="32" r="20" stroke-width="3"/>
      <circle cx="32" cy="32" r="12"/>
      <text x="12" y="60" font-size="3" fill="currentColor" stroke="none">Vaginal Ring</text>
    </svg>`
  },
  {
    id: 'obgyn-patch',
    name: 'Contraceptive Patch',
    domain: 'medicine',
    category: 'contraception',
    tags: ['patch', 'transdermal', 'hormonal', 'weekly', 'contraception'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="12" width="40" height="40" rx="4" fill="#FFDAB9" opacity="0.5"/>
      <rect x="12" y="12" width="40" height="40" rx="4"/>
      <rect x="20" y="20" width="24" height="24" rx="2" fill="#FFE4C4"/>
      <path d="M24 32h16"/>
      <path d="M32 24v16"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Contraceptive Patch</text>
    </svg>`
  },
  {
    id: 'obgyn-tubal-ligation',
    name: 'Tubal Ligation',
    domain: 'medicine',
    category: 'contraception',
    tags: ['tubal ligation', 'sterilization', 'permanent', 'tubes tied', 'surgical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="12" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="40" rx="12" ry="10"/>
      <path d="M20 40l-12-16"/>
      <path d="M44 40l12-16"/>
      <ellipse cx="8" cy="22" rx="4" ry="6"/>
      <ellipse cx="56" cy="22" rx="4" ry="6"/>
      <path d="M12 28l4-4" stroke="red" stroke-width="3"/>
      <path d="M52 28l-4-4" stroke="red" stroke-width="3"/>
      <path d="M10 24l6 0" stroke="red" stroke-width="2"/>
      <path d="M48 24l6 0" stroke="red" stroke-width="2"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Tubal Ligation</text>
    </svg>`
  },

  // ===========================================================================
  // FETAL MONITORING (8 icons)
  // ===========================================================================
  {
    id: 'obgyn-nst-tracing',
    name: 'NST Tracing',
    domain: 'medicine',
    category: 'fetal-monitoring',
    tags: ['NST', 'non-stress test', 'fetal heart rate', 'tracing', 'reactivity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="56" height="48" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="4" y="8" width="56" height="48" rx="2"/>
      <path d="M8 32h8l2-8 4 16 4-12 4 8 4-4 4 8 4-16 4 12 4-4h8" stroke="#FF1493" stroke-width="2"/>
      <line x1="8" y1="20" x2="56" y2="20" stroke-dasharray="2 2" opacity="0.5"/>
      <line x1="8" y1="44" x2="56" y2="44" stroke-dasharray="2 2" opacity="0.5"/>
      <text x="8" y="18" font-size="3" fill="currentColor" stroke="none">160 bpm</text>
      <text x="8" y="50" font-size="3" fill="currentColor" stroke="none">110 bpm</text>
    </svg>`
  },
  {
    id: 'obgyn-ctg-cardiotocography',
    name: 'CTG Cardiotocography',
    domain: 'medicine',
    category: 'fetal-monitoring',
    tags: ['CTG', 'cardiotocography', 'contraction', 'fetal heart', 'monitoring'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="28" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M8 18h6l2-6 3 12 3-8 3 4 3-2 3 6 3-10 3 8 3-4h6" stroke="#FF69B4" stroke-width="1.5"/>
      <rect x="4" y="34" width="56" height="26" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M8 47h12c4 0 4 8 8 8s4-8 8-8 4 8 8 8h12" stroke="#4169E1" stroke-width="1.5"/>
      <text x="8" y="12" font-size="3" fill="#FF69B4" stroke="none">FHR</text>
      <text x="8" y="42" font-size="3" fill="#4169E1" stroke="none">UC</text>
    </svg>`
  },
  {
    id: 'obgyn-biophysical-profile',
    name: 'Biophysical Profile',
    domain: 'medicine',
    category: 'fetal-monitoring',
    tags: ['BPP', 'biophysical', 'profile', 'score', 'fetal wellbeing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="48" height="56" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="4" width="48" height="56" rx="2"/>
      <text x="14" y="16" font-size="4" fill="currentColor" stroke="none">BPP Score</text>
      <line x1="12" y1="20" x2="52" y2="20"/>
      <text x="12" y="28" font-size="3" fill="currentColor" stroke="none">NST: 2/2</text>
      <text x="12" y="34" font-size="3" fill="currentColor" stroke="none">Breathing: 2/2</text>
      <text x="12" y="40" font-size="3" fill="currentColor" stroke="none">Movement: 2/2</text>
      <text x="12" y="46" font-size="3" fill="currentColor" stroke="none">Tone: 2/2</text>
      <text x="12" y="52" font-size="3" fill="currentColor" stroke="none">AFI: 2/2</text>
      <rect x="38" y="22" width="12" height="32" fill="#90EE90" opacity="0.5"/>
      <text x="40" y="42" font-size="6" fill="#228B22" stroke="none">8/8</text>
    </svg>`
  },
  {
    id: 'obgyn-fhr-variability',
    name: 'FHR Variability',
    domain: 'medicine',
    category: 'fetal-monitoring',
    tags: ['variability', 'heart rate', 'fetal', 'beat-to-beat', 'baseline'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="12" width="56" height="40" rx="2" fill="currentColor" opacity="0.1"/>
      <line x1="8" y1="32" x2="56" y2="32" stroke-dasharray="4 2" opacity="0.5"/>
      <path d="M8 32l2-2 2 4 2-3 2 2 2-4 2 5 2-3 2 2 2-2 2 3 2-4 2 2 2-1 2 3 2-2 2 4 2-3 2 1 2-2 2 3" stroke="#FF1493" stroke-width="2"/>
      <text x="8" y="10" font-size="3" fill="currentColor" stroke="none">Moderate Variability (6-25 bpm)</text>
      <text x="8" y="58" font-size="3" fill="#228B22" stroke="none">Reassuring Pattern</text>
    </svg>`
  },
  {
    id: 'obgyn-fhr-acceleration',
    name: 'FHR Acceleration',
    domain: 'medicine',
    category: 'fetal-monitoring',
    tags: ['acceleration', 'reactive', 'heart rate', 'fetal', 'reassuring'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="12" width="56" height="40" rx="2" fill="currentColor" opacity="0.1"/>
      <line x1="8" y1="36" x2="56" y2="36" stroke-dasharray="4 2" opacity="0.5"/>
      <path d="M8 36h8l4-16c2-4 4-4 6 0l4 16h26" stroke="#FF1493" stroke-width="2"/>
      <path d="M16 36l4-16" stroke="#228B22" stroke-width="1" stroke-dasharray="2 2"/>
      <text x="18" y="16" font-size="3" fill="#228B22" stroke="none">+15 bpm</text>
      <text x="22" y="46" font-size="3" fill="currentColor" stroke="none">15 sec</text>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Acceleration: ≥15 bpm x 15 sec</text>
    </svg>`
  },
  {
    id: 'obgyn-fhr-deceleration',
    name: 'FHR Deceleration',
    domain: 'medicine',
    category: 'fetal-monitoring',
    tags: ['deceleration', 'early', 'late', 'variable', 'heart rate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="56" height="24" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M8 20h8l6 8 6-8h28" stroke="#FF1493" stroke-width="1.5"/>
      <text x="8" y="14" font-size="3" fill="currentColor" stroke="none">Late Decel</text>
      <rect x="4" y="34" width="56" height="12" rx="2" fill="currentColor" opacity="0.05"/>
      <path d="M8 40h12c4 0 4 4 8 4s4-4 8-4h20" stroke="#4169E1" stroke-width="1.5"/>
      <text x="8" y="54" font-size="3" fill="#DC143C" stroke="none">Nadir after contraction peak</text>
    </svg>`
  },
  {
    id: 'obgyn-contraction-pattern',
    name: 'Contraction Pattern',
    domain: 'medicine',
    category: 'fetal-monitoring',
    tags: ['contraction', 'tocometry', 'uterine', 'labor', 'frequency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="12" width="56" height="40" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M8 44c4 0 4-24 8-24s4 24 8 24 4-24 8-24 4 24 8 24 4-24 8-24 4 24 8 24" stroke="#4169E1" stroke-width="2"/>
      <line x1="8" y1="44" x2="56" y2="44" stroke-dasharray="2 2" opacity="0.3"/>
      <text x="10" y="24" font-size="3" fill="currentColor" stroke="none">60 mmHg</text>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">q2-3 min contractions</text>
    </svg>`
  },
  {
    id: 'obgyn-toco-placement',
    name: 'Tocodynamometer Placement',
    domain: 'medicine',
    category: 'fetal-monitoring',
    tags: ['toco', 'tocodynamometer', 'external', 'monitoring', 'belt'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="24" ry="20" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="36" rx="24" ry="20"/>
      <rect x="24" y="20" width="16" height="10" rx="2" fill="#87CEEB" opacity="0.7"/>
      <rect x="24" y="20" width="16" height="10" rx="2"/>
      <path d="M8 36h16"/>
      <path d="M40 36h16"/>
      <circle cx="32" cy="46" r="8" fill="#FFB6C1" opacity="0.5"/>
      <text x="18" y="60" font-size="3" fill="currentColor" stroke="none">Fundal Placement</text>
    </svg>`
  },

  // ===========================================================================
  // GYNECOLOGIC PROCEDURES (10 icons)
  // ===========================================================================
  {
    id: 'obgyn-dnc-procedure',
    name: 'D&C Procedure',
    domain: 'medicine',
    category: 'procedures',
    tags: ['D&C', 'dilation', 'curettage', 'uterine', 'procedure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8h24c6 0 10 8 10 20s-4 20-10 20H20c-6 0-10-8-10-20s4-20 10-20z" fill="currentColor" opacity="0.2"/>
      <path d="M20 8h24c6 0 10 8 10 20s-4 20-10 20H20c-6 0-10-8-10-20s4-20 10-20z"/>
      <path d="M32 48v12" stroke-width="2"/>
      <ellipse cx="32" cy="28" rx="6" ry="4" fill="currentColor" opacity="0.3"/>
      <path d="M26 28c0-12 12-12 12 0" stroke-width="2" stroke="#DC143C"/>
      <text x="12" y="62" font-size="3" fill="currentColor" stroke="none">Curettage</text>
    </svg>`
  },
  {
    id: 'obgyn-leep-procedure',
    name: 'LEEP Procedure',
    domain: 'medicine',
    category: 'procedures',
    tags: ['LEEP', 'LLETZ', 'loop excision', 'cervical', 'dysplasia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="16" ry="12" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="36" rx="16" ry="12"/>
      <ellipse cx="32" cy="36" rx="6" ry="4"/>
      <path d="M32 8v20" stroke="#FFD700" stroke-width="2"/>
      <ellipse cx="32" cy="8" rx="8" ry="4" fill="#C0C0C0"/>
      <path d="M26 36a6 4 0 0 1 12 0" stroke="#FFD700" stroke-width="2"/>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Loop Electrosurgical Excision</text>
    </svg>`
  },
  {
    id: 'obgyn-myomectomy',
    name: 'Myomectomy',
    domain: 'medicine',
    category: 'procedures',
    tags: ['myomectomy', 'fibroid', 'removal', 'uterine', 'surgery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c-4 0-8 8-8 16s4 16 8 16h32c4 0 8-8 8-16s-4-16-8-16H16z" fill="currentColor" opacity="0.2"/>
      <path d="M16 16c-4 0-8 8-8 16s4 16 8 16h32c4 0 8-8 8-16s-4-16-8-16H16z"/>
      <circle cx="24" cy="28" r="6" fill="#DEB887" stroke="#8B4513" stroke-dasharray="2 2"/>
      <circle cx="40" cy="32" r="8" fill="#DEB887" stroke="#8B4513" stroke-dasharray="2 2"/>
      <path d="M18 28l12 0" stroke="#DC143C" stroke-width="1"/>
      <path d="M32 32l16 0" stroke="#DC143C" stroke-width="1"/>
      <text x="16" y="58" font-size="3" fill="currentColor" stroke="none">Fibroid Removal</text>
    </svg>`
  },
  {
    id: 'obgyn-hysterectomy',
    name: 'Hysterectomy',
    domain: 'medicine',
    category: 'procedures',
    tags: ['hysterectomy', 'uterus removal', 'total', 'subtotal', 'surgery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 16c-8 0-12 8-12 16s4 16 12 16h24c8 0 12-8 12-16s-4-16-12-16H20z" fill="currentColor" opacity="0.2" stroke-dasharray="4 4"/>
      <path d="M8 20l-4-8"/>
      <path d="M56 20l4-8"/>
      <ellipse cx="4" cy="10" rx="3" ry="4"/>
      <ellipse cx="60" cy="10" rx="3" ry="4"/>
      <path d="M32 48v8"/>
      <line x1="8" y1="48" x2="56" y2="48" stroke="#DC143C" stroke-width="2"/>
      <text x="14" y="60" font-size="3" fill="currentColor" stroke="none">Total Hysterectomy</text>
    </svg>`
  },
  {
    id: 'obgyn-laparoscopy-gyn',
    name: 'Gynecologic Laparoscopy',
    domain: 'medicine',
    category: 'procedures',
    tags: ['laparoscopy', 'minimally invasive', 'surgery', 'ports', 'camera'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="24" ry="16" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="40" rx="24" ry="16"/>
      <circle cx="32" cy="28" r="4" fill="#C0C0C0"/>
      <path d="M32 24v-16" stroke-width="2"/>
      <circle cx="20" cy="36" r="3" fill="#C0C0C0"/>
      <path d="M20 33v-10" stroke-width="1.5"/>
      <circle cx="44" cy="36" r="3" fill="#C0C0C0"/>
      <path d="M44 33v-10" stroke-width="1.5"/>
      <text x="10" y="60" font-size="3" fill="currentColor" stroke="none">Laparoscopic Ports</text>
    </svg>`
  },
  {
    id: 'obgyn-pap-smear',
    name: 'Pap Smear',
    domain: 'medicine',
    category: 'procedures',
    tags: ['pap', 'smear', 'cytology', 'cervical', 'screening'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="12" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="12" ry="8"/>
      <ellipse cx="32" cy="32" rx="4" ry="2"/>
      <path d="M32 8v16" stroke-width="2"/>
      <path d="M28 8h8" stroke-width="2"/>
      <path d="M30 24c0 4 4 4 4 0"/>
      <rect x="44" y="44" width="12" height="16" rx="1" fill="#E6E6FA"/>
      <rect x="44" y="44" width="12" height="16" rx="1"/>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Cervical Cytology</text>
    </svg>`
  },
  {
    id: 'obgyn-colposcopy-procedure',
    name: 'Colposcopy Procedure',
    domain: 'medicine',
    category: 'procedures',
    tags: ['colposcopy', 'biopsy', 'cervical', 'magnification', 'acetic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="44" rx="14" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="44" rx="14" ry="10"/>
      <ellipse cx="32" cy="44" rx="5" ry="3"/>
      <circle cx="32" cy="16" r="8" fill="#87CEEB" opacity="0.3"/>
      <circle cx="32" cy="16" r="8"/>
      <circle cx="32" cy="16" r="4"/>
      <path d="M32 24v12"/>
      <path d="M24 16h-8"/>
      <path d="M40 16h8"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Colposcopic Exam</text>
    </svg>`
  },
  {
    id: 'obgyn-endometrial-biopsy',
    name: 'Endometrial Biopsy',
    domain: 'medicine',
    category: 'procedures',
    tags: ['endometrial', 'biopsy', 'pipelle', 'sampling', 'uterine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 20c-4 0-8 6-8 12s4 12 8 12h24c4 0 8-6 8-12s-4-12-8-12H20z" fill="currentColor" opacity="0.2"/>
      <path d="M20 20c-4 0-8 6-8 12s4 12 8 12h24c4 0 8-6 8-12s-4-12-8-12H20z"/>
      <path d="M32 44v12" stroke-width="1.5"/>
      <path d="M32 8v28" stroke="#C0C0C0" stroke-width="3"/>
      <circle cx="32" cy="8" r="4" fill="#C0C0C0"/>
      <path d="M30 32l4 4" stroke="#DC143C"/>
      <path d="M34 32l-4 4" stroke="#DC143C"/>
      <text x="14" y="62" font-size="3" fill="currentColor" stroke="none">Pipelle Biopsy</text>
    </svg>`
  },
  {
    id: 'obgyn-saline-sonohysterography',
    name: 'Saline Sonohysterography',
    domain: 'medicine',
    category: 'procedures',
    tags: ['SIS', 'sonohysterography', 'saline', 'infusion', 'ultrasound'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 20c-4 0-8 6-8 12s4 12 8 12h24c4 0 8-6 8-12s-4-12-8-12H20z" fill="#87CEEB" opacity="0.4"/>
      <path d="M20 20c-4 0-8 6-8 12s4 12 8 12h24c4 0 8-6 8-12s-4-12-8-12H20z"/>
      <path d="M32 44v12" stroke-width="1.5"/>
      <path d="M32 56l-4 4h8l-4-4" fill="#C0C0C0"/>
      <circle cx="20" cy="30" r="3" fill="#87CEEB"/>
      <circle cx="44" cy="28" r="4" fill="#87CEEB"/>
      <text x="10" y="10" font-size="3" fill="currentColor" stroke="none">Saline-enhanced US</text>
    </svg>`
  },
  {
    id: 'obgyn-hysterosalpingography',
    name: 'Hysterosalpingography',
    domain: 'medicine',
    category: 'procedures',
    tags: ['HSG', 'hysterosalpingography', 'tubal patency', 'contrast', 'fertility'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 24c-4 0-6 4-6 8s2 8 6 8h16c4 0 6-4 6-8s-2-8-6-8H24z" fill="#FFD700" opacity="0.4"/>
      <path d="M24 24c-4 0-6 4-6 8s2 8 6 8h16c4 0 6-4 6-8s-2-8-6-8H24z"/>
      <path d="M18 28l-10-8" stroke="#FFD700" stroke-width="2"/>
      <path d="M46 28l10-8" stroke="#FFD700" stroke-width="2"/>
      <ellipse cx="8" cy="18" rx="4" ry="5" fill="#FFD700" opacity="0.5"/>
      <ellipse cx="56" cy="18" rx="4" ry="5" fill="#FFD700" opacity="0.5"/>
      <path d="M32 40v16"/>
      <text x="6" y="58" font-size="3" fill="currentColor" stroke="none">Contrast-enhanced Imaging</text>
    </svg>`
  },

  // ===========================================================================
  // PRENATAL SCREENING (8 icons)
  // ===========================================================================
  {
    id: 'obgyn-nuchal-translucency',
    name: 'Nuchal Translucency',
    domain: 'medicine',
    category: 'prenatal-screening',
    tags: ['NT', 'nuchal', 'translucency', 'Down syndrome', 'first trimester'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="28" r="12" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="28" r="12"/>
      <path d="M24 32c0 8 16 8 16 0" fill="#FFB6C1" opacity="0.5"/>
      <rect x="26" y="40" width="12" height="4" fill="#87CEEB" opacity="0.7"/>
      <line x1="26" y1="42" x2="38" y2="42" stroke="#4169E1" stroke-width="2"/>
      <text x="42" y="44" font-size="3" fill="#4169E1" stroke="none">NT</text>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">NT Measurement</text>
    </svg>`
  },
  {
    id: 'obgyn-quad-screen',
    name: 'Quad Screen',
    domain: 'medicine',
    category: 'prenatal-screening',
    tags: ['quad screen', 'AFP', 'hCG', 'estriol', 'inhibin', 'second trimester'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <text x="14" y="20" font-size="4" fill="currentColor" stroke="none">Quad Screen</text>
      <line x1="12" y1="24" x2="52" y2="24"/>
      <circle cx="20" cy="34" r="6" fill="#FF6347"/>
      <circle cx="44" cy="34" r="6" fill="#4169E1"/>
      <circle cx="20" cy="50" r="6" fill="#32CD32"/>
      <circle cx="44" cy="50" r="6" fill="#FFD700"/>
      <text x="17" y="36" font-size="3" fill="white" stroke="none">AFP</text>
      <text x="40" y="36" font-size="3" fill="white" stroke="none">hCG</text>
      <text x="18" y="52" font-size="3" fill="white" stroke="none">E3</text>
      <text x="42" y="52" font-size="3" fill="white" stroke="none">Inh</text>
    </svg>`
  },
  {
    id: 'obgyn-cvs-sampling',
    name: 'Chorionic Villus Sampling',
    domain: 'medicine',
    category: 'prenatal-screening',
    tags: ['CVS', 'chorionic villus', 'sampling', 'genetic', 'first trimester'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="20" ry="16" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="36" rx="20" ry="16"/>
      <circle cx="32" cy="32" r="8" fill="#FFB6C1" opacity="0.5"/>
      <path d="M24 44c4 4 12 4 16 0" fill="#DC143C" opacity="0.4"/>
      <path d="M8 24l16 12" stroke="#C0C0C0" stroke-width="2"/>
      <circle cx="8" cy="22" r="4" fill="#C0C0C0"/>
      <path d="M24 36l-6 4" stroke="#DC143C" stroke-width="1"/>
      <text x="12" y="60" font-size="3" fill="currentColor" stroke="none">Placental Biopsy</text>
    </svg>`
  },
  {
    id: 'obgyn-amniocentesis-procedure',
    name: 'Amniocentesis Procedure',
    domain: 'medicine',
    category: 'prenatal-screening',
    tags: ['amniocentesis', 'amniotic', 'fluid', 'genetic', 'testing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="22" ry="18" fill="#87CEEB" opacity="0.3"/>
      <ellipse cx="32" cy="36" rx="22" ry="18"/>
      <ellipse cx="32" cy="40" rx="10" ry="8" fill="#FFB6C1" opacity="0.5"/>
      <ellipse cx="32" cy="40" rx="10" ry="8"/>
      <path d="M44 16l-8 14" stroke="#C0C0C0" stroke-width="2"/>
      <circle cx="44" cy="14" r="4" fill="#C0C0C0"/>
      <circle cx="36" cy="30" r="2" fill="#87CEEB"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Fluid Aspiration</text>
    </svg>`
  },
  {
    id: 'obgyn-nipt-testing',
    name: 'NIPT Testing',
    domain: 'medicine',
    category: 'prenatal-screening',
    tags: ['NIPT', 'cell-free DNA', 'cfDNA', 'genetic', 'non-invasive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="12" y="8" width="40" height="48" rx="4"/>
      <text x="18" y="20" font-size="4" fill="currentColor" stroke="none">NIPT</text>
      <path d="M20 28c2-4 4-4 6 0s4 4 6 0 4-4 6 0 4 4 6 0" stroke="#FF69B4" stroke-width="2"/>
      <path d="M20 36c2-4 4-4 6 0s4 4 6 0 4-4 6 0 4 4 6 0" stroke="#4169E1" stroke-width="2"/>
      <circle cx="24" cy="48" r="4" fill="#DC143C"/>
      <text x="30" y="50" font-size="3" fill="currentColor" stroke="none">cfDNA</text>
    </svg>`
  },
  {
    id: 'obgyn-glucose-tolerance-test',
    name: 'Glucose Tolerance Test',
    domain: 'medicine',
    category: 'prenatal-screening',
    tags: ['GTT', 'glucose', 'tolerance', 'gestational diabetes', 'screening'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="12" width="48" height="40" rx="2"/>
      <line x1="12" y1="44" x2="52" y2="44" stroke-dasharray="2 2" opacity="0.5"/>
      <path d="M12 36l8-8 8 4 8-12 8 8 8-4" stroke="#FF6347" stroke-width="2"/>
      <circle cx="12" cy="36" r="2" fill="#FF6347"/>
      <circle cx="20" cy="28" r="2" fill="#FF6347"/>
      <circle cx="28" cy="32" r="2" fill="#FF6347"/>
      <circle cx="36" cy="20" r="2" fill="#FF6347"/>
      <circle cx="44" cy="28" r="2" fill="#FF6347"/>
      <circle cx="52" cy="24" r="2" fill="#FF6347"/>
      <text x="12" y="22" font-size="3" fill="currentColor" stroke="none">0h</text>
      <text x="28" y="22" font-size="3" fill="currentColor" stroke="none">1h</text>
      <text x="44" y="22" font-size="3" fill="currentColor" stroke="none">2h</text>
    </svg>`
  },
  {
    id: 'obgyn-anatomy-scan',
    name: 'Anatomy Scan',
    domain: 'medicine',
    category: 'prenatal-screening',
    tags: ['anatomy scan', 'level II', 'ultrasound', 'morphology', '20 week'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="56" height="40" rx="4" fill="#1a1a2e" opacity="0.9"/>
      <rect x="4" y="8" width="56" height="40" rx="4"/>
      <ellipse cx="32" cy="28" rx="18" ry="14" fill="currentColor" opacity="0.2"/>
      <circle cx="28" cy="22" r="6" fill="currentColor" opacity="0.3"/>
      <ellipse cx="36" cy="32" rx="8" ry="6" fill="currentColor" opacity="0.2"/>
      <path d="M24 28c2 4 8 4 10 0"/>
      <circle cx="26" cy="20" r="1" fill="currentColor"/>
      <circle cx="30" cy="20" r="1" fill="currentColor"/>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">20-Week Anatomy Scan</text>
    </svg>`
  },
  {
    id: 'obgyn-doppler-velocimetry',
    name: 'Doppler Velocimetry',
    domain: 'medicine',
    category: 'prenatal-screening',
    tags: ['doppler', 'velocimetry', 'umbilical artery', 'blood flow', 'IUGR'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="56" height="48" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="4" y="8" width="56" height="48" rx="2"/>
      <path d="M8 32h48" stroke-dasharray="2 2" opacity="0.3"/>
      <path d="M8 32l4-12 4 12 4-16 4 16 4-12 4 12 4-16 4 16 4-12 4 12" stroke="#FF1493" stroke-width="2"/>
      <path d="M8 40l4 4 4-4 4 6 4-6 4 4 4-4 4 6 4-6 4 4 4-4" stroke="#4169E1" stroke-width="1.5"/>
      <text x="8" y="18" font-size="3" fill="#FF1493" stroke="none">Systolic</text>
      <text x="8" y="54" font-size="3" fill="#4169E1" stroke="none">Diastolic</text>
    </svg>`
  },

  // ===========================================================================
  // POSTPARTUM (6 icons)
  // ===========================================================================
  {
    id: 'obgyn-breastfeeding',
    name: 'Breastfeeding',
    domain: 'medicine',
    category: 'postpartum',
    tags: ['breastfeeding', 'lactation', 'nursing', 'infant', 'latch'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="16" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="24" cy="16" r="8"/>
      <path d="M16 24c-4 4-8 12-8 20v12h32v-12c0-8-4-16-8-20" fill="currentColor" opacity="0.1"/>
      <path d="M16 24c-4 4-8 12-8 20v12h32v-12c0-8-4-16-8-20"/>
      <circle cx="48" cy="40" r="8" fill="#FFB6C1" opacity="0.5"/>
      <circle cx="48" cy="40" r="8"/>
      <path d="M40 40c4-2 4-4 4-8"/>
      <circle cx="48" cy="38" r="2"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Nursing</text>
    </svg>`
  },
  {
    id: 'obgyn-uterine-involution',
    name: 'Uterine Involution',
    domain: 'medicine',
    category: 'postpartum',
    tags: ['involution', 'postpartum', 'uterus', 'recovery', 'fundal height'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-6 0-10 8-10 16s4 16 10 16h24c6 0 10-8 10-16s-4-16-10-16H20z" fill="currentColor" opacity="0.3" stroke-dasharray="4 4"/>
      <path d="M24 20c-4 0-6 4-6 8s2 8 6 8h16c4 0 6-4 6-8s-2-8-6-8H24z" fill="currentColor" opacity="0.2"/>
      <path d="M24 20c-4 0-6 4-6 8s2 8 6 8h16c4 0 6-4 6-8s-2-8-6-8H24z"/>
      <path d="M10 24l8 4" stroke="#228B22" stroke-width="1" stroke-dasharray="2 2"/>
      <path d="M54 24l-8 4" stroke="#228B22" stroke-width="1" stroke-dasharray="2 2"/>
      <path d="M32 36v20"/>
      <text x="12" y="58" font-size="3" fill="currentColor" stroke="none">Day 1 → Week 6</text>
    </svg>`
  },
  {
    id: 'obgyn-postpartum-hemorrhage',
    name: 'Postpartum Hemorrhage',
    domain: 'medicine',
    category: 'postpartum',
    tags: ['PPH', 'hemorrhage', 'bleeding', 'postpartum', 'emergency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 12c-6 0-10 6-10 12s4 12 10 12h24c6 0 10-6 10-12s-4-12-10-12H20z" fill="currentColor" opacity="0.2"/>
      <path d="M20 12c-6 0-10 6-10 12s4 12 10 12h24c6 0 10-6 10-12s-4-12-10-12H20z"/>
      <path d="M32 36v8"/>
      <path d="M28 44c-4 8-8 12-8 16" stroke="#DC143C" stroke-width="2"/>
      <path d="M32 44c0 8 0 12 0 16" stroke="#DC143C" stroke-width="2"/>
      <path d="M36 44c4 8 8 12 8 16" stroke="#DC143C" stroke-width="2"/>
      <circle cx="20" cy="60" r="3" fill="#DC143C"/>
      <circle cx="32" cy="60" r="3" fill="#DC143C"/>
      <circle cx="44" cy="60" r="3" fill="#DC143C"/>
      <text x="18" y="10" font-size="3" fill="#DC143C" stroke="none">PPH >500ml</text>
    </svg>`
  },
  {
    id: 'obgyn-lochia',
    name: 'Lochia',
    domain: 'medicine',
    category: 'postpartum',
    tags: ['lochia', 'rubra', 'serosa', 'alba', 'postpartum discharge'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="16" height="48" rx="2" fill="#DC143C" opacity="0.6"/>
      <rect x="24" y="8" width="16" height="48" rx="2" fill="#FFA07A" opacity="0.6"/>
      <rect x="40" y="8" width="16" height="48" rx="2" fill="#FFFACD" opacity="0.6"/>
      <rect x="8" y="8" width="16" height="48" rx="2"/>
      <rect x="24" y="8" width="16" height="48" rx="2"/>
      <rect x="40" y="8" width="16" height="48" rx="2"/>
      <text x="10" y="36" font-size="4" fill="white" stroke="none">Rubra</text>
      <text x="26" y="36" font-size="4" fill="currentColor" stroke="none">Serosa</text>
      <text x="44" y="36" font-size="4" fill="currentColor" stroke="none">Alba</text>
      <text x="10" y="62" font-size="3" fill="currentColor" stroke="none">D1-4</text>
      <text x="26" y="62" font-size="3" fill="currentColor" stroke="none">D4-10</text>
      <text x="42" y="62" font-size="3" fill="currentColor" stroke="none">D10+</text>
    </svg>`
  },
  {
    id: 'obgyn-perineal-repair',
    name: 'Perineal Repair',
    domain: 'medicine',
    category: 'postpartum',
    tags: ['perineal', 'laceration', 'repair', 'suture', 'episiotomy repair'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="16" ry="12" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="24" rx="16" ry="12"/>
      <path d="M32 36v20" stroke="#DC143C" stroke-width="2"/>
      <path d="M28 40l8 0" stroke="#4169E1" stroke-width="1"/>
      <path d="M28 44l8 0" stroke="#4169E1" stroke-width="1"/>
      <path d="M28 48l8 0" stroke="#4169E1" stroke-width="1"/>
      <path d="M28 52l8 0" stroke="#4169E1" stroke-width="1"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Suture Repair</text>
    </svg>`
  },
  {
    id: 'obgyn-kangaroo-care',
    name: 'Kangaroo Care',
    domain: 'medicine',
    category: 'postpartum',
    tags: ['kangaroo', 'skin-to-skin', 'bonding', 'newborn', 'thermoregulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="12" r="8"/>
      <path d="M20 20c-4 4-8 12-8 24v12h40v-12c0-12-4-20-8-24" fill="currentColor" opacity="0.1"/>
      <path d="M20 20c-4 4-8 12-8 24v12h40v-12c0-12-4-20-8-24"/>
      <ellipse cx="32" cy="36" rx="8" ry="6" fill="#FFB6C1" opacity="0.5"/>
      <ellipse cx="32" cy="36" rx="8" ry="6"/>
      <circle cx="32" cy="32" r="3"/>
      <path d="M28 38c2 2 6 2 8 0"/>
      <text x="10" y="62" font-size="3" fill="currentColor" stroke="none">Skin-to-Skin</text>
    </svg>`
  }
];

export default obgynIcons;
