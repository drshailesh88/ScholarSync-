/**
 * Gastroenterology Icon Library
 * Comprehensive SVG icons for gastrointestinal medicine
 *
 * Categories:
 * - GI Tract Anatomy (esophagus, stomach, intestines, colon)
 * - Hepatobiliary (liver, gallbladder, bile ducts, pancreas)
 * - Pathology - Upper GI (GERD, PUD, varices)
 * - Pathology - Lower GI (IBD, polyps, cancer)
 * - Pathology - Liver (cirrhosis, hepatitis, tumors)
 * - Pathology - Pancreaticobiliary (pancreatitis, stones)
 * - Equipment (endoscopes, imaging, procedures)
 */

import type { IconDefinition } from './index';

export const gastroenterologyIcons: IconDefinition[] = [
  // ===========================================================================
  // GI TRACT ANATOMY (15 icons)
  // ===========================================================================
  {
    id: 'gi-esophagus',
    name: 'Esophagus',
    domain: 'medicine',
    category: 'gi-tract-anatomy',
    tags: ['esophagus', 'upper GI', 'swallowing', 'food pipe', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16c2 0 4 2 4 4v44c0 2-2 4-4 4H24c-2 0-4-2-4-4V12c0-2 2-4 4-4z"/>
      <path d="M24 8c0-2 4-4 8-4s8 2 8 4"/>
      <path d="M20 20h24" stroke-dasharray="2 2"/>
      <path d="M20 36h24" stroke-dasharray="2 2"/>
      <ellipse cx="32" cy="28" rx="6" ry="3" fill="currentColor" opacity="0.2"/>
      <text x="44" y="14" font-size="4" fill="currentColor" stroke="none">UES</text>
      <text x="44" y="54" font-size="4" fill="currentColor" stroke="none">LES</text>
    </svg>`
  },
  {
    id: 'gi-stomach',
    name: 'Stomach',
    domain: 'medicine',
    category: 'gi-tract-anatomy',
    tags: ['stomach', 'gastric', 'fundus', 'antrum', 'pylorus', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-8 4-12 16-12 24 0 12 8 20 20 24 8-2 16-4 20-12 4-8 4-20-4-28-4-4-8-4-12-4"/>
      <path d="M20 8c0-4 8-4 12 0"/>
      <path d="M44 36c4 4 8 4 12 0"/>
      <ellipse cx="24" cy="28" rx="8" ry="10" fill="currentColor" opacity="0.1"/>
      <text x="16" y="20" font-size="4" fill="currentColor" stroke="none">Fundus</text>
      <text x="30" y="48" font-size="4" fill="currentColor" stroke="none">Antrum</text>
      <text x="48" y="42" font-size="3" fill="currentColor" stroke="none">Pylorus</text>
    </svg>`
  },
  {
    id: 'gi-duodenum',
    name: 'Duodenum',
    domain: 'medicine',
    category: 'gi-tract-anatomy',
    tags: ['duodenum', 'small intestine', 'D1', 'D2', 'D3', 'D4', 'ampulla'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8v12c0 8 8 12 16 12h8c8 0 12 8 12 16v8"/>
      <path d="M8 8h16"/>
      <path d="M52 56h-8"/>
      <circle cx="40" cy="28" r="3" fill="currentColor" opacity="0.3"/>
      <text x="4" y="14" font-size="4" fill="currentColor" stroke="none">D1</text>
      <text x="20" y="28" font-size="4" fill="currentColor" stroke="none">D2</text>
      <text x="28" y="40" font-size="4" fill="currentColor" stroke="none">D3</text>
      <text x="48" y="52" font-size="4" fill="currentColor" stroke="none">D4</text>
      <text x="44" y="24" font-size="3" fill="currentColor" stroke="none">Ampulla</text>
    </svg>`
  },
  {
    id: 'gi-jejunum',
    name: 'Jejunum',
    domain: 'medicine',
    category: 'gi-tract-anatomy',
    tags: ['jejunum', 'small intestine', 'villi', 'absorption', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 12c8 0 12 8 12 16s-4 16-12 16"/>
      <path d="M20 12c8 0 12 8 12 16s-4 16-12 16"/>
      <path d="M32 12c8 0 12 8 12 16s-4 16-12 16"/>
      <path d="M44 12c8 0 12 8 12 16s-4 16-12 16"/>
      <path d="M8 28h48" stroke-dasharray="1 2"/>
      <text x="24" y="58" font-size="5" fill="currentColor" stroke="none">Jejunum</text>
    </svg>`
  },
  {
    id: 'gi-ileum',
    name: 'Ileum',
    domain: 'medicine',
    category: 'gi-tract-anatomy',
    tags: ['ileum', 'small intestine', 'terminal ileum', 'ileocecal', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 8c6 4 10 12 10 20s-4 16-10 20"/>
      <path d="M18 8c6 4 10 12 10 20s-4 16-10 20"/>
      <path d="M28 8c6 4 10 12 10 20"/>
      <path d="M38 28c0 8 8 16 18 16"/>
      <ellipse cx="52" cy="44" rx="6" ry="8"/>
      <text x="46" y="58" font-size="4" fill="currentColor" stroke="none">Cecum</text>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Ileum</text>
    </svg>`
  },
  {
    id: 'gi-ascending-colon',
    name: 'Ascending Colon',
    domain: 'medicine',
    category: 'gi-tract-anatomy',
    tags: ['ascending colon', 'large intestine', 'right colon', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 56V20c0-4 4-8 8-8h8"/>
      <path d="M12 56c0 4 4 4 8 0"/>
      <ellipse cx="16" cy="56" rx="8" ry="4" fill="currentColor" opacity="0.2"/>
      <path d="M20 52c2 0 2-4 0-4s-2 4 0 4z"/>
      <path d="M20 44c2 0 2-4 0-4s-2 4 0 4z"/>
      <path d="M20 36c2 0 2-4 0-4s-2 4 0 4z"/>
      <text x="24" y="40" font-size="4" fill="currentColor" stroke="none">Ascending</text>
      <text x="8" y="52" font-size="3" fill="currentColor" stroke="none">Cecum</text>
    </svg>`
  },
  {
    id: 'gi-transverse-colon',
    name: 'Transverse Colon',
    domain: 'medicine',
    category: 'gi-tract-anatomy',
    tags: ['transverse colon', 'large intestine', 'hepatic flexure', 'splenic flexure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24c0-8 4-12 8-12h32c4 0 8 4 8 12"/>
      <path d="M8 24v8"/>
      <path d="M56 24v8"/>
      <path d="M16 20c2 0 2 4 0 4s-2-4 0-4z"/>
      <path d="M28 20c2 0 2 4 0 4s-2-4 0-4z"/>
      <path d="M40 20c2 0 2 4 0 4s-2-4 0-4z"/>
      <path d="M52 20c2 0 2 4 0 4s-2-4 0-4z"/>
      <text x="4" y="44" font-size="3" fill="currentColor" stroke="none">Hepatic</text>
      <text x="4" y="50" font-size="3" fill="currentColor" stroke="none">Flexure</text>
      <text x="44" y="44" font-size="3" fill="currentColor" stroke="none">Splenic</text>
      <text x="44" y="50" font-size="3" fill="currentColor" stroke="none">Flexure</text>
    </svg>`
  },
  {
    id: 'gi-descending-colon',
    name: 'Descending Colon',
    domain: 'medicine',
    category: 'gi-tract-anatomy',
    tags: ['descending colon', 'large intestine', 'left colon', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 12h8c4 0 8 4 8 8v36"/>
      <path d="M44 56c0 4-4 4-8 0"/>
      <path d="M44 24c-2 0-2 4 0 4s2-4 0-4z"/>
      <path d="M44 32c-2 0-2 4 0 4s2-4 0-4z"/>
      <path d="M44 40c-2 0-2 4 0 4s2-4 0-4z"/>
      <path d="M44 48c-2 0-2 4 0 4s2-4 0-4z"/>
      <text x="16" y="36" font-size="4" fill="currentColor" stroke="none">Descending</text>
    </svg>`
  },
  {
    id: 'gi-sigmoid-colon',
    name: 'Sigmoid Colon',
    domain: 'medicine',
    category: 'gi-tract-anatomy',
    tags: ['sigmoid', 'colon', 'S-shaped', 'large intestine', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8v12c0 8 8 12 16 12s16 4 16 12v12"/>
      <path d="M48 56c0 4-4 4-8 0"/>
      <path d="M16 16c2 0 2 4 0 4s-2-4 0-4z"/>
      <path d="M28 28c2 0 2 4 0 4s-2-4 0-4z"/>
      <path d="M40 36c2 0 2 4 0 4s-2-4 0-4z"/>
      <path d="M48 48c2 0 2 4 0 4s-2-4 0-4z"/>
      <text x="20" y="58" font-size="5" fill="currentColor" stroke="none">Sigmoid</text>
    </svg>`
  },
  {
    id: 'gi-rectum',
    name: 'Rectum',
    domain: 'medicine',
    category: 'gi-tract-anatomy',
    tags: ['rectum', 'rectal', 'lower GI', 'anatomy', 'defecation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16c4 0 8 4 8 8v32c0 4-4 8-8 8H24c-4 0-8-4-8-8V16c0-4 4-8 8-8z"/>
      <path d="M24 56c4 4 8 4 16 0"/>
      <ellipse cx="32" cy="32" rx="10" ry="16" fill="currentColor" opacity="0.1"/>
      <path d="M22 24h20" stroke-dasharray="2 2"/>
      <path d="M22 40h20" stroke-dasharray="2 2"/>
      <text x="42" y="20" font-size="3" fill="currentColor" stroke="none">Upper</text>
      <text x="42" y="32" font-size="3" fill="currentColor" stroke="none">Mid</text>
      <text x="42" y="44" font-size="3" fill="currentColor" stroke="none">Lower</text>
    </svg>`
  },
  {
    id: 'gi-anal-canal',
    name: 'Anal Canal',
    domain: 'medicine',
    category: 'gi-tract-anatomy',
    tags: ['anal canal', 'anus', 'sphincter', 'hemorrhoids', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v24c0 8-4 16-8 24-4-8-8-16-8-24V8z"/>
      <ellipse cx="32" cy="8" rx="8" ry="4"/>
      <path d="M20 24h24" stroke-dasharray="2 2"/>
      <path d="M22 36h20" stroke-dasharray="2 2"/>
      <circle cx="32" cy="56" r="4"/>
      <text x="44" y="18" font-size="3" fill="currentColor" stroke="none">IAS</text>
      <text x="44" y="32" font-size="3" fill="currentColor" stroke="none">EAS</text>
      <text x="44" y="24" font-size="3" fill="currentColor" stroke="none">Dentate</text>
    </svg>`
  },
  {
    id: 'gi-les-sphincter',
    name: 'Lower Esophageal Sphincter',
    domain: 'medicine',
    category: 'gi-tract-anatomy',
    tags: ['LES', 'sphincter', 'esophageal', 'gastroesophageal junction', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v20"/>
      <path d="M24 8v20"/>
      <ellipse cx="32" cy="28" rx="12" ry="4" fill="currentColor" opacity="0.3"/>
      <ellipse cx="32" cy="28" rx="12" ry="4"/>
      <path d="M20 28c-4 4-8 16-8 24 0 4 8 8 20 8s20-4 20-8c0-8-4-20-8-24"/>
      <path d="M28 28v8"/>
      <path d="M36 28v8"/>
      <text x="40" y="20" font-size="4" fill="currentColor" stroke="none">LES</text>
    </svg>`
  },
  {
    id: 'gi-pyloric-sphincter',
    name: 'Pyloric Sphincter',
    domain: 'medicine',
    category: 'gi-tract-anatomy',
    tags: ['pylorus', 'sphincter', 'gastric outlet', 'pyloric canal', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="32" rx="12" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="20" cy="32" rx="12" ry="20"/>
      <ellipse cx="40" cy="32" rx="4" ry="8" fill="currentColor" opacity="0.3"/>
      <ellipse cx="40" cy="32" rx="4" ry="8"/>
      <path d="M44 32h12"/>
      <path d="M56 24v16"/>
      <text x="10" y="58" font-size="4" fill="currentColor" stroke="none">Stomach</text>
      <text x="36" y="48" font-size="3" fill="currentColor" stroke="none">Pylorus</text>
      <text x="48" y="44" font-size="3" fill="currentColor" stroke="none">D1</text>
    </svg>`
  },
  {
    id: 'gi-ileocecal-valve',
    name: 'Ileocecal Valve',
    domain: 'medicine',
    category: 'gi-tract-anatomy',
    tags: ['ileocecal', 'valve', 'terminal ileum', 'cecum', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 20h20"/>
      <ellipse cx="36" cy="32" rx="4" ry="10" fill="currentColor" opacity="0.3"/>
      <path d="M32 22c4 4 4 16 0 20"/>
      <path d="M40 22c-4 4-4 16 0 20"/>
      <ellipse cx="52" cy="40" rx="8" ry="16"/>
      <path d="M44 32h8"/>
      <text x="4" y="16" font-size="4" fill="currentColor" stroke="none">Ileum</text>
      <text x="44" y="60" font-size="4" fill="currentColor" stroke="none">Cecum</text>
      <text x="28" y="48" font-size="3" fill="currentColor" stroke="none">ICV</text>
    </svg>`
  },
  {
    id: 'gi-tract-overview',
    name: 'GI Tract Overview',
    domain: 'medicine',
    category: 'gi-tract-anatomy',
    tags: ['GI tract', 'digestive system', 'overview', 'alimentary canal', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4v8"/>
      <ellipse cx="32" cy="16" rx="8" ry="4"/>
      <path d="M32 20v4"/>
      <ellipse cx="28" cy="28" rx="6" ry="4"/>
      <path d="M28 32c4 4 8 12 8 20"/>
      <path d="M36 52c4 4 8 4 12-4"/>
      <path d="M48 48v-16c0-4-4-8-8-8"/>
      <ellipse cx="36" cy="58" rx="4" ry="2"/>
      <text x="40" y="8" font-size="3" fill="currentColor" stroke="none">Esoph</text>
      <text x="38" y="28" font-size="3" fill="currentColor" stroke="none">Stomach</text>
      <text x="16" y="44" font-size="3" fill="currentColor" stroke="none">SI</text>
      <text x="50" y="40" font-size="3" fill="currentColor" stroke="none">Colon</text>
    </svg>`
  },

  // ===========================================================================
  // HEPATOBILIARY ANATOMY (12 icons)
  // ===========================================================================
  {
    id: 'gi-liver-lobes',
    name: 'Liver Lobes',
    domain: 'medicine',
    category: 'hepatobiliary',
    tags: ['liver', 'lobes', 'right lobe', 'left lobe', 'caudate', 'quadrate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24c0-8 8-16 24-16s24 8 24 16c0 16-12 32-24 32S8 40 8 24z" fill="currentColor" opacity="0.15"/>
      <path d="M8 24c0-8 8-16 24-16s24 8 24 16c0 16-12 32-24 32S8 40 8 24z"/>
      <path d="M32 8v48"/>
      <path d="M32 28l-8-4"/>
      <text x="12" y="28" font-size="4" fill="currentColor" stroke="none">Left</text>
      <text x="40" y="28" font-size="4" fill="currentColor" stroke="none">Right</text>
      <text x="18" y="40" font-size="3" fill="currentColor" stroke="none">Caudate</text>
    </svg>`
  },
  {
    id: 'gi-hepatocyte',
    name: 'Hepatocyte',
    domain: 'medicine',
    category: 'hepatobiliary',
    tags: ['hepatocyte', 'liver cell', 'hepatic', 'cytoplasm', 'nucleus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c0-12 8-20 20-20s20 8 20 20-8 20-20 20-20-8-20-20z" fill="currentColor" opacity="0.1"/>
      <path d="M12 32c0-12 8-20 20-20s20 8 20 20-8 20-20 20-20-8-20-20z"/>
      <circle cx="28" cy="28" r="8" fill="currentColor" opacity="0.3"/>
      <circle cx="28" cy="28" r="8"/>
      <circle cx="26" cy="26" r="2" fill="currentColor"/>
      <ellipse cx="40" cy="36" rx="6" ry="4" stroke-dasharray="2 2"/>
      <text x="36" y="42" font-size="3" fill="currentColor" stroke="none">ER</text>
    </svg>`
  },
  {
    id: 'gi-portal-triad',
    name: 'Portal Triad',
    domain: 'medicine',
    category: 'hepatobiliary',
    tags: ['portal triad', 'hepatic artery', 'portal vein', 'bile duct', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="8" stroke="red"/>
      <circle cx="20" cy="40" r="8" stroke="blue"/>
      <circle cx="44" cy="40" r="8" stroke="green"/>
      <path d="M32 28v4l-8 4"/>
      <path d="M32 32l8 4"/>
      <text x="26" y="12" font-size="3" fill="red" stroke="none">HA</text>
      <text x="10" y="56" font-size="3" fill="blue" stroke="none">PV</text>
      <text x="40" y="56" font-size="3" fill="green" stroke="none">BD</text>
    </svg>`
  },
  {
    id: 'gi-bile-ducts',
    name: 'Bile Ducts',
    domain: 'medicine',
    category: 'hepatobiliary',
    tags: ['bile duct', 'biliary tree', 'intrahepatic', 'extrahepatic', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8l8 16"/>
      <path d="M48 8l-8 16"/>
      <path d="M24 24h16"/>
      <path d="M32 24v16"/>
      <path d="M32 40l8 8"/>
      <ellipse cx="44" cy="52" rx="8" ry="6"/>
      <path d="M32 40v16"/>
      <circle cx="32" cy="60" r="3"/>
      <text x="4" y="10" font-size="3" fill="currentColor" stroke="none">L Hep</text>
      <text x="46" y="10" font-size="3" fill="currentColor" stroke="none">R Hep</text>
      <text x="36" y="32" font-size="3" fill="currentColor" stroke="none">CHD</text>
      <text x="36" y="44" font-size="3" fill="currentColor" stroke="none">CBD</text>
    </svg>`
  },
  {
    id: 'gi-gallbladder',
    name: 'Gallbladder',
    domain: 'medicine',
    category: 'hepatobiliary',
    tags: ['gallbladder', 'bile', 'fundus', 'body', 'neck', 'cystic duct'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c8 0 16 8 16 20s-4 24-16 28c-12-4-16-16-16-28S24 8 32 8z" fill="currentColor" opacity="0.2"/>
      <path d="M32 8c8 0 16 8 16 20s-4 24-16 28c-12-4-16-16-16-28S24 8 32 8z"/>
      <path d="M32 8c-4 0-8-4-4-4h8c4 0 0 4-4 4"/>
      <path d="M20 20h24" stroke-dasharray="2 2"/>
      <text x="44" y="12" font-size="3" fill="currentColor" stroke="none">Neck</text>
      <text x="44" y="28" font-size="3" fill="currentColor" stroke="none">Body</text>
      <text x="44" y="48" font-size="3" fill="currentColor" stroke="none">Fundus</text>
    </svg>`
  },
  {
    id: 'gi-cbd',
    name: 'Common Bile Duct',
    domain: 'medicine',
    category: 'hepatobiliary',
    tags: ['CBD', 'common bile duct', 'choledochus', 'biliary', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8v20" stroke-width="2"/>
      <path d="M40 8v12"/>
      <path d="M40 20c0 4-4 8-8 8"/>
      <path d="M24 28h8"/>
      <path d="M32 28v28" stroke-width="2.5"/>
      <ellipse cx="44" cy="16" rx="6" ry="8"/>
      <circle cx="32" cy="58" r="4"/>
      <text x="8" y="16" font-size="3" fill="currentColor" stroke="none">CHD</text>
      <text x="48" y="20" font-size="3" fill="currentColor" stroke="none">GB</text>
      <text x="8" y="44" font-size="3" fill="currentColor" stroke="none">CBD</text>
      <text x="38" y="60" font-size="3" fill="currentColor" stroke="none">Ampulla</text>
    </svg>`
  },
  {
    id: 'gi-ampulla-vater',
    name: 'Ampulla of Vater',
    domain: 'medicine',
    category: 'hepatobiliary',
    tags: ['ampulla', 'Vater', 'papilla', 'sphincter of Oddi', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8v32"/>
      <path d="M40 8v24l-8 8"/>
      <ellipse cx="32" cy="48" rx="8" ry="4" fill="currentColor" opacity="0.3"/>
      <ellipse cx="32" cy="48" rx="8" ry="4"/>
      <path d="M32 52v8"/>
      <ellipse cx="32" cy="60" rx="12" ry="2"/>
      <text x="8" y="20" font-size="3" fill="currentColor" stroke="none">CBD</text>
      <text x="44" y="20" font-size="3" fill="currentColor" stroke="none">PD</text>
      <text x="44" y="50" font-size="3" fill="currentColor" stroke="none">Ampulla</text>
    </svg>`
  },
  {
    id: 'gi-pancreas',
    name: 'Pancreas',
    domain: 'medicine',
    category: 'hepatobiliary',
    tags: ['pancreas', 'head', 'body', 'tail', 'pancreatic duct', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M48 20c4 0 8 4 8 12s-4 12-8 12H20c-8 0-12-4-12-8s4-8 8-8c-4-4 0-8 4-8h28z" fill="currentColor" opacity="0.15"/>
      <path d="M48 20c4 0 8 4 8 12s-4 12-8 12H20c-8 0-12-4-12-8s4-8 8-8c-4-4 0-8 4-8h28z"/>
      <path d="M20 32h32" stroke-dasharray="2 2"/>
      <text x="50" y="40" font-size="3" fill="currentColor" stroke="none">Head</text>
      <text x="32" y="40" font-size="3" fill="currentColor" stroke="none">Body</text>
      <text x="10" y="40" font-size="3" fill="currentColor" stroke="none">Tail</text>
    </svg>`
  },
  {
    id: 'gi-pancreatic-duct',
    name: 'Pancreatic Duct',
    domain: 'medicine',
    category: 'hepatobiliary',
    tags: ['pancreatic duct', 'Wirsung', 'Santorini', 'main duct', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h40c4 0 8 4 8 8"/>
      <path d="M48 32v-8c0-4 4-8 8-8"/>
      <ellipse cx="56" cy="44" rx="4" ry="6"/>
      <path d="M16 32c0-4 4-8 8-4"/>
      <path d="M28 32c0-4 4-8 8-4"/>
      <path d="M40 32c0-4 4-8 8-4"/>
      <text x="4" y="28" font-size="3" fill="currentColor" stroke="none">Tail</text>
      <text x="4" y="44" font-size="3" fill="currentColor" stroke="none">Main PD</text>
      <text x="48" y="16" font-size="3" fill="currentColor" stroke="none">Accessory</text>
    </svg>`
  },
  {
    id: 'gi-spleen',
    name: 'Spleen',
    domain: 'medicine',
    category: 'hepatobiliary',
    tags: ['spleen', 'splenic', 'red pulp', 'white pulp', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24" fill="currentColor" opacity="0.15"/>
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <path d="M20 24c4 4 8 4 12 0"/>
      <path d="M32 24c4 4 8 4 12 0"/>
      <path d="M12 32h8"/>
      <path d="M12 28l4 4-4 4"/>
      <text x="36" y="44" font-size="4" fill="currentColor" stroke="none">Spleen</text>
      <text x="4" y="44" font-size="3" fill="currentColor" stroke="none">SA</text>
    </svg>`
  },
  {
    id: 'gi-portal-vein',
    name: 'Portal Vein',
    domain: 'medicine',
    category: 'hepatobiliary',
    tags: ['portal vein', 'splenic vein', 'SMV', 'portal system', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v16" stroke-width="3" stroke="blue"/>
      <path d="M32 24l-16 16" stroke-width="2" stroke="blue"/>
      <path d="M32 24l16 16" stroke-width="2" stroke="blue"/>
      <path d="M8 48h16" stroke-width="2" stroke="blue"/>
      <path d="M40 48h16" stroke-width="2" stroke="blue"/>
      <ellipse cx="32" cy="6" rx="12" ry="4" stroke="blue"/>
      <text x="36" y="16" font-size="3" fill="blue" stroke="none">PV</text>
      <text x="4" y="44" font-size="3" fill="blue" stroke="none">SV</text>
      <text x="48" y="44" font-size="3" fill="blue" stroke="none">SMV</text>
    </svg>`
  },
  {
    id: 'gi-hepatic-veins',
    name: 'Hepatic Veins',
    domain: 'medicine',
    category: 'hepatobiliary',
    tags: ['hepatic vein', 'IVC', 'right hepatic', 'middle hepatic', 'left hepatic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v8" stroke-width="4" stroke="blue"/>
      <path d="M32 16l-16 20" stroke-width="2" stroke="blue"/>
      <path d="M32 16v24" stroke-width="2" stroke="blue"/>
      <path d="M32 16l16 20" stroke-width="2" stroke="blue"/>
      <ellipse cx="32" cy="52" rx="20" ry="8" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="52" rx="20" ry="8"/>
      <text x="36" y="10" font-size="3" fill="blue" stroke="none">IVC</text>
      <text x="8" y="32" font-size="3" fill="blue" stroke="none">LHV</text>
      <text x="36" y="32" font-size="3" fill="blue" stroke="none">MHV</text>
      <text x="48" y="32" font-size="3" fill="blue" stroke="none">RHV</text>
    </svg>`
  },

  // ===========================================================================
  // PATHOLOGY - UPPER GI (12 icons)
  // ===========================================================================
  {
    id: 'gi-gerd',
    name: 'GERD',
    domain: 'medicine',
    category: 'pathology-upper-gi',
    tags: ['GERD', 'reflux', 'heartburn', 'esophagitis', 'LES dysfunction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v24"/>
      <path d="M24 8v24"/>
      <path d="M20 32c-4 8-8 16-4 24h32c4-8 0-16-4-24"/>
      <path d="M28 28c2 0 4-4 4-8" stroke="orange"/>
      <path d="M32 20c0 4 2 8 4 8" stroke="orange"/>
      <path d="M30 24l4-8" stroke="red" stroke-width="2"/>
      <path d="M34 24l-4-8" stroke="red" stroke-width="2"/>
      <ellipse cx="32" cy="44" rx="8" ry="4" fill="orange" opacity="0.3"/>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">GERD</text>
    </svg>`
  },
  {
    id: 'gi-barretts',
    name: "Barrett's Esophagus",
    domain: 'medicine',
    category: 'pathology-upper-gi',
    tags: ['Barrett', 'metaplasia', 'intestinal', 'dysplasia', 'esophagus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v48H24V8z"/>
      <rect x="24" y="28" width="16" height="16" fill="salmon" opacity="0.5"/>
      <path d="M24 28h16"/>
      <path d="M24 44h16"/>
      <path d="M28 32v8" stroke="red"/>
      <path d="M32 30v10" stroke="red"/>
      <path d="M36 32v8" stroke="red"/>
      <text x="4" y="20" font-size="3" fill="currentColor" stroke="none">Normal</text>
      <text x="4" y="38" font-size="3" fill="salmon" stroke="none">Barrett's</text>
      <text x="4" y="52" font-size="3" fill="currentColor" stroke="none">Stomach</text>
    </svg>`
  },
  {
    id: 'gi-esophageal-varices',
    name: 'Esophageal Varices',
    domain: 'medicine',
    category: 'pathology-upper-gi',
    tags: ['varices', 'portal hypertension', 'bleeding', 'cirrhosis', 'esophagus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v48H24V8z"/>
      <path d="M24 20c4 4 4 8 0 12s0 8 0 12" stroke="blue" stroke-width="3"/>
      <path d="M40 20c-4 4-4 8 0 12s0 8 0 12" stroke="blue" stroke-width="3"/>
      <path d="M28 24c2 4 2 8 0 12" stroke="blue" stroke-width="2"/>
      <path d="M36 28c-2 4-2 8 0 12" stroke="blue" stroke-width="2"/>
      <circle cx="28" cy="36" r="2" fill="red"/>
      <text x="44" y="36" font-size="4" fill="currentColor" stroke="none">Varices</text>
    </svg>`
  },
  {
    id: 'gi-pud',
    name: 'Peptic Ulcer Disease',
    domain: 'medicine',
    category: 'pathology-upper-gi',
    tags: ['PUD', 'ulcer', 'gastric ulcer', 'duodenal ulcer', 'H. pylori'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <ellipse cx="28" cy="28" rx="8" ry="6" fill="red" opacity="0.3"/>
      <ellipse cx="28" cy="28" rx="8" ry="6" stroke="red"/>
      <ellipse cx="28" cy="28" rx="4" ry="3" fill="darkred" opacity="0.5"/>
      <path d="M24 28h8" stroke="darkred"/>
      <text x="40" y="44" font-size="4" fill="currentColor" stroke="none">PUD</text>
    </svg>`
  },
  {
    id: 'gi-h-pylori',
    name: 'H. pylori',
    domain: 'medicine',
    category: 'pathology-upper-gi',
    tags: ['H. pylori', 'Helicobacter', 'bacteria', 'gastritis', 'ulcer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="12" ry="6"/>
      <path d="M20 32c-4-4-8-4-8 0s4 4 8 0"/>
      <path d="M44 32c4-4 8-4 8 0s-4 4-8 0"/>
      <path d="M14 28c0-4 4-8 4-4"/>
      <path d="M14 36c0 4 4 8 4 4"/>
      <path d="M50 28c0-4-4-8-4-4"/>
      <path d="M50 36c0 4-4 8-4 4"/>
      <ellipse cx="32" cy="52" rx="20" ry="6" fill="currentColor" opacity="0.1"/>
      <text x="16" y="60" font-size="4" fill="currentColor" stroke="none">H. pylori</text>
    </svg>`
  },
  {
    id: 'gi-gastritis',
    name: 'Gastritis',
    domain: 'medicine',
    category: 'pathology-upper-gi',
    tags: ['gastritis', 'inflammation', 'erosive', 'atrophic', 'stomach'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c-8 4-8 20 0 28 8 8 24 8 32 0 8-8 8-20 0-28"/>
      <path d="M16 16c4 4 12 4 16 0s12-4 16 0"/>
      <path d="M20 28h4" stroke="red"/>
      <path d="M28 32h4" stroke="red"/>
      <path d="M36 28h4" stroke="red"/>
      <path d="M24 40h4" stroke="red"/>
      <path d="M32 44h4" stroke="red"/>
      <ellipse cx="32" cy="36" rx="16" ry="12" fill="red" opacity="0.2"/>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">Gastritis</text>
    </svg>`
  },
  {
    id: 'gi-upper-bleeding',
    name: 'Upper GI Bleeding',
    domain: 'medicine',
    category: 'pathology-upper-gi',
    tags: ['UGIB', 'hematemesis', 'melena', 'bleeding', 'GI hemorrhage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <ellipse cx="28" cy="28" rx="6" ry="4" stroke="red" fill="red" opacity="0.3"/>
      <path d="M28 32v8" stroke="red" stroke-width="2"/>
      <path d="M24 40c4 8 8 12 8 16" stroke="red" stroke-width="2"/>
      <path d="M32 40c0 8-4 12-4 16" stroke="red" stroke-width="2"/>
      <circle cx="28" cy="58" r="3" fill="red" opacity="0.5"/>
      <text x="40" y="24" font-size="3" fill="currentColor" stroke="none">UGIB</text>
    </svg>`
  },
  {
    id: 'gi-mallory-weiss',
    name: 'Mallory-Weiss Tear',
    domain: 'medicine',
    category: 'pathology-upper-gi',
    tags: ['Mallory-Weiss', 'tear', 'GEJ', 'vomiting', 'bleeding'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v20"/>
      <path d="M24 8v20"/>
      <ellipse cx="32" cy="28" rx="12" ry="4"/>
      <path d="M20 28c-8 8-12 20-4 28h32c8-8 4-20-4-28"/>
      <path d="M28 24l-2 12" stroke="red" stroke-width="2"/>
      <path d="M36 24l2 12" stroke="red" stroke-width="2"/>
      <path d="M30 30v8" stroke="red"/>
      <text x="40" y="20" font-size="3" fill="currentColor" stroke="none">MW Tear</text>
    </svg>`
  },
  {
    id: 'gi-hiatal-hernia',
    name: 'Hiatal Hernia',
    domain: 'medicine',
    category: 'pathology-upper-gi',
    tags: ['hiatal hernia', 'sliding', 'paraesophageal', 'diaphragm', 'hernia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h48" stroke-width="2"/>
      <path d="M24 8h16v16"/>
      <path d="M24 8v16"/>
      <ellipse cx="32" cy="28" rx="12" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="28" rx="12" ry="8"/>
      <path d="M20 40c-4 8-4 16 4 16h16c8 0 8-8 4-16"/>
      <text x="4" y="36" font-size="3" fill="currentColor" stroke="none">Diaphragm</text>
      <text x="40" y="28" font-size="3" fill="currentColor" stroke="none">Hernia</text>
    </svg>`
  },
  {
    id: 'gi-esophageal-stricture',
    name: 'Esophageal Stricture',
    domain: 'medicine',
    category: 'pathology-upper-gi',
    tags: ['stricture', 'narrowing', 'dysphagia', 'esophagus', 'obstruction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v16c0 4-4 8-8 8s-8-4-8-8V8z"/>
      <path d="M28 32h8c4 0 4 8 4 16v8H24v-8c0-8 0-16 4-16z"/>
      <ellipse cx="32" cy="32" rx="4" ry="2" fill="currentColor" opacity="0.3"/>
      <path d="M28 32h8" stroke-width="2"/>
      <text x="40" y="32" font-size="3" fill="currentColor" stroke="none">Stricture</text>
      <path d="M32 12l0 8" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'gi-esophageal-cancer',
    name: 'Esophageal Cancer',
    domain: 'medicine',
    category: 'pathology-upper-gi',
    tags: ['esophageal cancer', 'SCC', 'adenocarcinoma', 'tumor', 'malignancy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v48H24V8z"/>
      <ellipse cx="32" cy="32" rx="10" ry="8" fill="darkred" opacity="0.4"/>
      <ellipse cx="32" cy="32" rx="10" ry="8" stroke="darkred"/>
      <path d="M26 28c4 4 8 4 12 0" stroke="darkred"/>
      <path d="M26 36c4-4 8-4 12 0" stroke="darkred"/>
      <path d="M22 32h4" stroke="darkred" stroke-width="2"/>
      <path d="M38 32h4" stroke="darkred" stroke-width="2"/>
      <text x="44" y="32" font-size="3" fill="darkred" stroke="none">Tumor</text>
    </svg>`
  },
  {
    id: 'gi-gastric-cancer',
    name: 'Gastric Cancer',
    domain: 'medicine',
    category: 'pathology-upper-gi',
    tags: ['gastric cancer', 'stomach cancer', 'adenocarcinoma', 'tumor', 'malignancy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c-8 4-8 24 0 32 8 8 28 8 36 0 8-8 4-24-4-32"/>
      <path d="M16 16c4 4 16 4 20 0s12-4 16 0"/>
      <ellipse cx="28" cy="36" rx="10" ry="8" fill="darkred" opacity="0.4"/>
      <ellipse cx="28" cy="36" rx="10" ry="8" stroke="darkred"/>
      <path d="M24 32c4 4 8 4 8 0" stroke="darkred"/>
      <path d="M20 38h16" stroke="darkred"/>
      <text x="42" y="40" font-size="3" fill="darkred" stroke="none">Tumor</text>
    </svg>`
  },

  // ===========================================================================
  // PATHOLOGY - LOWER GI (12 icons)
  // ===========================================================================
  {
    id: 'gi-crohns-disease',
    name: "Crohn's Disease",
    domain: 'medicine',
    category: 'pathology-lower-gi',
    tags: ['Crohn', 'IBD', 'skip lesions', 'transmural', 'inflammation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c8-8 16-8 24 0s16 8 24 0"/>
      <path d="M8 32c8 8 16 8 24 0s16-8 24 0"/>
      <ellipse cx="20" cy="32" rx="4" ry="6" fill="red" opacity="0.3"/>
      <ellipse cx="44" cy="32" rx="4" ry="6" fill="red" opacity="0.3"/>
      <path d="M18 28v8" stroke="red"/>
      <path d="M22 28v8" stroke="red"/>
      <path d="M42 28v8" stroke="red"/>
      <path d="M46 28v8" stroke="red"/>
      <text x="4" y="52" font-size="3" fill="currentColor" stroke="none">Skip Lesions</text>
      <text x="24" y="58" font-size="4" fill="currentColor" stroke="none">Crohn's</text>
    </svg>`
  },
  {
    id: 'gi-ulcerative-colitis',
    name: 'Ulcerative Colitis',
    domain: 'medicine',
    category: 'pathology-lower-gi',
    tags: ['UC', 'IBD', 'colitis', 'continuous', 'mucosal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24v16c0 8 8 16 24 16s24-8 24-16V24"/>
      <path d="M8 24c8-8 16-8 24 0s16 8 24 0"/>
      <rect x="12" y="28" width="40" height="20" fill="red" opacity="0.2"/>
      <path d="M16 32h32" stroke="red"/>
      <path d="M16 38h32" stroke="red"/>
      <path d="M16 44h32" stroke="red"/>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">UC - Continuous</text>
    </svg>`
  },
  {
    id: 'gi-diverticulosis',
    name: 'Diverticulosis',
    domain: 'medicine',
    category: 'pathology-lower-gi',
    tags: ['diverticulosis', 'diverticula', 'outpouching', 'colon', 'sigmoid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 16v32c0 4 4 8 8 8h24c4 0 8-4 8-8V16"/>
      <ellipse cx="12" cy="28" rx="6" ry="4"/>
      <ellipse cx="12" cy="44" rx="6" ry="4"/>
      <ellipse cx="52" cy="32" rx="6" ry="4"/>
      <ellipse cx="52" cy="48" rx="6" ry="4"/>
      <text x="20" y="36" font-size="4" fill="currentColor" stroke="none">Diverticula</text>
    </svg>`
  },
  {
    id: 'gi-diverticulitis',
    name: 'Diverticulitis',
    domain: 'medicine',
    category: 'pathology-lower-gi',
    tags: ['diverticulitis', 'inflammation', 'perforation', 'abscess', 'colon'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 16v32c0 4 4 8 8 8h24c4 0 8-4 8-8V16"/>
      <ellipse cx="12" cy="36" rx="8" ry="6" fill="red" opacity="0.3" stroke="red"/>
      <ellipse cx="52" cy="40" rx="6" ry="4"/>
      <path d="M8 32l-4 0" stroke="red"/>
      <path d="M8 40l-4 0" stroke="red"/>
      <circle cx="4" cy="36" r="2" fill="red"/>
      <text x="18" y="36" font-size="3" fill="red" stroke="none">Inflamed</text>
    </svg>`
  },
  {
    id: 'gi-colonic-polyp',
    name: 'Colonic Polyp',
    domain: 'medicine',
    category: 'pathology-lower-gi',
    tags: ['polyp', 'adenoma', 'sessile', 'pedunculated', 'colon'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 40h48"/>
      <path d="M8 24h48"/>
      <ellipse cx="24" cy="32" rx="6" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="24" cy="32" rx="6" ry="8"/>
      <path d="M44 40v-4"/>
      <ellipse cx="44" cy="30" rx="4" ry="6" fill="currentColor" opacity="0.2"/>
      <ellipse cx="44" cy="30" rx="4" ry="6"/>
      <text x="16" y="52" font-size="3" fill="currentColor" stroke="none">Sessile</text>
      <text x="36" y="52" font-size="3" fill="currentColor" stroke="none">Pedunculated</text>
    </svg>`
  },
  {
    id: 'gi-colorectal-cancer',
    name: 'Colorectal Cancer',
    domain: 'medicine',
    category: 'pathology-lower-gi',
    tags: ['CRC', 'colon cancer', 'rectal cancer', 'adenocarcinoma', 'malignancy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 16v32c0 4 4 8 8 8h24c4 0 8-4 8-8V16"/>
      <ellipse cx="32" cy="36" rx="12" ry="10" fill="darkred" opacity="0.4"/>
      <ellipse cx="32" cy="36" rx="12" ry="10" stroke="darkred" stroke-width="2"/>
      <path d="M24 32c4 4 12 4 16 0" stroke="darkred"/>
      <path d="M24 40c4 4 12 4 16 0" stroke="darkred"/>
      <path d="M20 36h4" stroke="darkred"/>
      <path d="M40 36h4" stroke="darkred"/>
      <text x="44" y="52" font-size="3" fill="darkred" stroke="none">CRC</text>
    </svg>`
  },
  {
    id: 'gi-bowel-obstruction',
    name: 'Bowel Obstruction',
    domain: 'medicine',
    category: 'pathology-lower-gi',
    tags: ['obstruction', 'SBO', 'LBO', 'ileus', 'blockage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c8 8 12 8 16 0"/>
      <path d="M24 32c4-8 8-8 12 0"/>
      <ellipse cx="40" cy="32" rx="4" ry="8"/>
      <path d="M44 32h12"/>
      <ellipse cx="16" cy="32" rx="8" ry="12" fill="currentColor" opacity="0.2"/>
      <ellipse cx="30" cy="32" rx="6" ry="10" fill="currentColor" opacity="0.2"/>
      <path d="M40 24v16" stroke="red" stroke-width="2"/>
      <text x="36" y="52" font-size="3" fill="red" stroke="none">Obstruction</text>
      <text x="8" y="52" font-size="3" fill="currentColor" stroke="none">Dilated</text>
    </svg>`
  },
  {
    id: 'gi-volvulus',
    name: 'Volvulus',
    domain: 'medicine',
    category: 'pathology-lower-gi',
    tags: ['volvulus', 'sigmoid', 'cecal', 'twist', 'obstruction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="16" ry="12" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="24" rx="16" ry="12"/>
      <path d="M24 36c4 8 4 16 0 20"/>
      <path d="M40 36c-4 8-4 16 0 20"/>
      <path d="M28 36l8 8-8 8" stroke="red"/>
      <path d="M36 36l-8 8 8 8" stroke="red"/>
      <text x="4" y="24" font-size="3" fill="currentColor" stroke="none">Dilated</text>
      <text x="44" y="48" font-size="3" fill="red" stroke="none">Twist</text>
    </svg>`
  },
  {
    id: 'gi-intussusception',
    name: 'Intussusception',
    domain: 'medicine',
    category: 'pathology-lower-gi',
    tags: ['intussusception', 'telescoping', 'pediatric', 'obstruction', 'ileocolic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28h16"/>
      <path d="M8 36h16"/>
      <ellipse cx="36" cy="32" rx="12" ry="16"/>
      <ellipse cx="36" cy="32" rx="8" ry="12" stroke-dasharray="2 2"/>
      <ellipse cx="36" cy="32" rx="4" ry="8" fill="currentColor" opacity="0.3"/>
      <path d="M48 32h8"/>
      <text x="26" y="56" font-size="3" fill="currentColor" stroke="none">Telescoping</text>
    </svg>`
  },
  {
    id: 'gi-appendicitis',
    name: 'Appendicitis',
    domain: 'medicine',
    category: 'pathology-lower-gi',
    tags: ['appendicitis', 'appendix', 'RLQ pain', 'inflammation', 'acute abdomen'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="24" rx="16" ry="12"/>
      <path d="M32 32c8 4 16 12 16 20"/>
      <ellipse cx="48" cy="52" rx="6" ry="8" fill="red" opacity="0.3" stroke="red"/>
      <path d="M44 48l8 8" stroke="red"/>
      <path d="M52 48l-8 8" stroke="red"/>
      <text x="4" y="24" font-size="3" fill="currentColor" stroke="none">Cecum</text>
      <text x="48" y="44" font-size="3" fill="red" stroke="none">Inflamed</text>
    </svg>`
  },
  {
    id: 'gi-hemorrhoids',
    name: 'Hemorrhoids',
    domain: 'medicine',
    category: 'pathology-lower-gi',
    tags: ['hemorrhoids', 'piles', 'internal', 'external', 'rectal bleeding'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v32c0 8-4 16-8 16s-8-8-8-16V8z"/>
      <path d="M20 36h24" stroke-dasharray="2 2"/>
      <ellipse cx="24" cy="32" rx="4" ry="6" fill="purple" opacity="0.3" stroke="purple"/>
      <ellipse cx="40" cy="32" rx="4" ry="6" fill="purple" opacity="0.3" stroke="purple"/>
      <ellipse cx="28" cy="48" rx="4" ry="4" fill="purple" opacity="0.3" stroke="purple"/>
      <ellipse cx="36" cy="48" rx="4" ry="4" fill="purple" opacity="0.3" stroke="purple"/>
      <text x="44" y="28" font-size="3" fill="purple" stroke="none">Internal</text>
      <text x="44" y="52" font-size="3" fill="purple" stroke="none">External</text>
    </svg>`
  },
  {
    id: 'gi-anal-fissure',
    name: 'Anal Fissure',
    domain: 'medicine',
    category: 'pathology-lower-gi',
    tags: ['fissure', 'anal', 'tear', 'pain', 'bleeding'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="20"/>
      <ellipse cx="32" cy="32" rx="8" ry="12"/>
      <path d="M32 12v8" stroke="red" stroke-width="2"/>
      <path d="M28 14l8 4" stroke="red"/>
      <path d="M36 14l-8 4" stroke="red"/>
      <text x="40" y="20" font-size="3" fill="red" stroke="none">Fissure</text>
      <text x="40" y="44" font-size="3" fill="currentColor" stroke="none">6 o'clock</text>
    </svg>`
  },

  // ===========================================================================
  // PATHOLOGY - LIVER (12 icons)
  // ===========================================================================
  {
    id: 'gi-cirrhosis',
    name: 'Cirrhosis',
    domain: 'medicine',
    category: 'pathology-liver',
    tags: ['cirrhosis', 'fibrosis', 'nodular', 'end-stage liver', 'scarring'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28c0-12 12-20 24-20s24 8 24 20c0 12-8 28-24 28S8 40 8 28z"/>
      <circle cx="20" cy="24" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="20" r="5" fill="currentColor" opacity="0.3"/>
      <circle cx="44" cy="26" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="24" cy="36" r="5" fill="currentColor" opacity="0.3"/>
      <circle cx="38" cy="38" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="28" cy="48" r="3" fill="currentColor" opacity="0.3"/>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">Cirrhosis</text>
    </svg>`
  },
  {
    id: 'gi-hepatitis',
    name: 'Hepatitis',
    domain: 'medicine',
    category: 'pathology-liver',
    tags: ['hepatitis', 'viral', 'inflammation', 'HBV', 'HCV', 'liver'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28c0-12 12-20 24-20s24 8 24 20c0 12-8 28-24 28S8 40 8 28z" fill="yellow" opacity="0.2"/>
      <path d="M8 28c0-12 12-20 24-20s24 8 24 20c0 12-8 28-24 28S8 40 8 28z"/>
      <path d="M20 24l4 4-4 4" stroke="red"/>
      <path d="M36 20l4 4-4 4" stroke="red"/>
      <path d="M28 36l4 4-4 4" stroke="red"/>
      <path d="M44 32l4 4-4 4" stroke="red"/>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Hepatitis</text>
    </svg>`
  },
  {
    id: 'gi-nafld',
    name: 'NAFLD/NASH',
    domain: 'medicine',
    category: 'pathology-liver',
    tags: ['NAFLD', 'NASH', 'fatty liver', 'steatosis', 'metabolic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28c0-12 12-20 24-20s24 8 24 20c0 12-8 28-24 28S8 40 8 28z" fill="yellow" opacity="0.3"/>
      <path d="M8 28c0-12 12-20 24-20s24 8 24 20c0 12-8 28-24 28S8 40 8 28z"/>
      <ellipse cx="20" cy="26" rx="4" ry="3" fill="yellow" stroke="orange"/>
      <ellipse cx="32" cy="22" rx="5" ry="3" fill="yellow" stroke="orange"/>
      <ellipse cx="44" cy="28" rx="4" ry="3" fill="yellow" stroke="orange"/>
      <ellipse cx="26" cy="38" rx="5" ry="3" fill="yellow" stroke="orange"/>
      <ellipse cx="40" cy="40" rx="4" ry="3" fill="yellow" stroke="orange"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">NAFLD/NASH</text>
    </svg>`
  },
  {
    id: 'gi-hcc',
    name: 'Hepatocellular Carcinoma',
    domain: 'medicine',
    category: 'pathology-liver',
    tags: ['HCC', 'liver cancer', 'hepatoma', 'tumor', 'malignancy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28c0-12 12-20 24-20s24 8 24 20c0 12-8 28-24 28S8 40 8 28z"/>
      <ellipse cx="36" cy="32" rx="12" ry="10" fill="darkred" opacity="0.4" stroke="darkred" stroke-width="2"/>
      <path d="M30 28c4 4 8 4 12 0" stroke="darkred"/>
      <path d="M30 36c4 4 8 4 12 0" stroke="darkred"/>
      <circle cx="20" cy="24" r="3" fill="currentColor" opacity="0.2"/>
      <circle cx="24" cy="44" r="3" fill="currentColor" opacity="0.2"/>
      <text x="44" y="48" font-size="4" fill="darkred" stroke="none">HCC</text>
    </svg>`
  },
  {
    id: 'gi-ascites',
    name: 'Ascites',
    domain: 'medicine',
    category: 'pathology-liver',
    tags: ['ascites', 'fluid', 'peritoneal', 'portal hypertension', 'cirrhosis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="24" ry="16" fill="lightblue" opacity="0.4"/>
      <ellipse cx="32" cy="40" rx="24" ry="16"/>
      <path d="M16 20c0-4 8-12 16-12s16 8 16 12" fill="currentColor" opacity="0.1"/>
      <path d="M16 20c0-4 8-12 16-12s16 8 16 12"/>
      <path d="M16 20v12"/>
      <path d="M48 20v12"/>
      <path d="M12 44h40" stroke-dasharray="4 2"/>
      <text x="24" y="58" font-size="4" fill="currentColor" stroke="none">Ascites</text>
    </svg>`
  },
  {
    id: 'gi-portal-hypertension',
    name: 'Portal Hypertension',
    domain: 'medicine',
    category: 'pathology-liver',
    tags: ['portal hypertension', 'varices', 'splenomegaly', 'cirrhosis', 'pressure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="16" ry="8" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="16" rx="16" ry="8"/>
      <path d="M32 24v12" stroke="blue" stroke-width="3"/>
      <path d="M32 36l-12 12" stroke="blue" stroke-width="2"/>
      <path d="M32 36l12 12" stroke="blue" stroke-width="2"/>
      <ellipse cx="20" cy="52" rx="8" ry="6"/>
      <path d="M28 36c4 4 8 8 16 4" stroke="blue" stroke-width="2"/>
      <text x="28" y="32" font-size="3" fill="blue" stroke="none">12mmHg</text>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">Spleen</text>
    </svg>`
  },
  {
    id: 'gi-liver-failure-acute',
    name: 'Acute Liver Failure',
    domain: 'medicine',
    category: 'pathology-liver',
    tags: ['ALF', 'acute liver failure', 'fulminant', 'encephalopathy', 'coagulopathy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28c0-12 12-20 24-20s24 8 24 20c0 12-8 28-24 28S8 40 8 28z" fill="red" opacity="0.2"/>
      <path d="M8 28c0-12 12-20 24-20s24 8 24 20c0 12-8 28-24 28S8 40 8 28z"/>
      <path d="M24 24l16 16" stroke="red" stroke-width="2"/>
      <path d="M40 24l-16 16" stroke="red" stroke-width="2"/>
      <path d="M32 8v-4" stroke="red"/>
      <path d="M28 6h8" stroke="red"/>
      <text x="4" y="56" font-size="3" fill="red" stroke="none">Acute Failure</text>
    </svg>`
  },
  {
    id: 'gi-liver-failure-chronic',
    name: 'Chronic Liver Failure',
    domain: 'medicine',
    category: 'pathology-liver',
    tags: ['ESLD', 'chronic liver failure', 'decompensated', 'cirrhosis', 'end-stage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28c0-12 12-20 24-20s24 8 24 20c0 12-8 28-24 28S8 40 8 28z"/>
      <circle cx="20" cy="24" r="3" fill="currentColor" opacity="0.4"/>
      <circle cx="32" cy="20" r="4" fill="currentColor" opacity="0.4"/>
      <circle cx="44" cy="26" r="3" fill="currentColor" opacity="0.4"/>
      <circle cx="26" cy="36" r="4" fill="currentColor" opacity="0.4"/>
      <circle cx="40" cy="38" r="3" fill="currentColor" opacity="0.4"/>
      <path d="M16 48l4 8"/>
      <path d="M48 48l-4 8"/>
      <text x="20" y="60" font-size="3" fill="currentColor" stroke="none">ESLD</text>
    </svg>`
  },
  {
    id: 'gi-hepatic-encephalopathy',
    name: 'Hepatic Encephalopathy',
    domain: 'medicine',
    category: 'pathology-liver',
    tags: ['HE', 'encephalopathy', 'ammonia', 'confusion', 'asterixis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="12"/>
      <path d="M26 16c2 4 6 4 8 0"/>
      <circle cx="28" cy="18" r="1" fill="currentColor"/>
      <circle cx="36" cy="18" r="1" fill="currentColor"/>
      <path d="M28 24c2 2 4 2 8 0"/>
      <path d="M32 32v8"/>
      <ellipse cx="32" cy="48" rx="12" ry="8" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="48" rx="12" ry="8"/>
      <path d="M24 16l-8-4" stroke="yellow"/>
      <path d="M40 16l8-4" stroke="yellow"/>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">NH3</text>
    </svg>`
  },
  {
    id: 'gi-liver-metastases',
    name: 'Liver Metastases',
    domain: 'medicine',
    category: 'pathology-liver',
    tags: ['metastases', 'liver mets', 'secondary', 'tumor', 'cancer spread'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28c0-12 12-20 24-20s24 8 24 20c0 12-8 28-24 28S8 40 8 28z"/>
      <circle cx="20" cy="24" r="4" fill="darkred" opacity="0.4" stroke="darkred"/>
      <circle cx="36" cy="20" r="5" fill="darkred" opacity="0.4" stroke="darkred"/>
      <circle cx="48" cy="28" r="3" fill="darkred" opacity="0.4" stroke="darkred"/>
      <circle cx="28" cy="38" r="4" fill="darkred" opacity="0.4" stroke="darkred"/>
      <circle cx="44" cy="40" r="3" fill="darkred" opacity="0.4" stroke="darkred"/>
      <text x="20" y="58" font-size="3" fill="darkred" stroke="none">Metastases</text>
    </svg>`
  },
  {
    id: 'gi-hepatomegaly',
    name: 'Hepatomegaly',
    domain: 'medicine',
    category: 'pathology-liver',
    tags: ['hepatomegaly', 'enlarged liver', 'liver size', 'palpable', 'organomegaly'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 24c0-12 12-16 28-16s28 4 28 16c0 16-12 36-28 36S4 40 4 24z" fill="currentColor" opacity="0.15"/>
      <path d="M4 24c0-12 12-16 28-16s28 4 28 16c0 16-12 36-28 36S4 40 4 24z"/>
      <path d="M12 28c-4 0-4-4 0-4" stroke-dasharray="2 2"/>
      <path d="M8 36l-4 4" stroke="red"/>
      <path d="M8 44l-4 4" stroke="red"/>
      <text x="20" y="32" font-size="4" fill="currentColor" stroke="none">Enlarged</text>
    </svg>`
  },
  {
    id: 'gi-jaundice',
    name: 'Jaundice',
    domain: 'medicine',
    category: 'pathology-liver',
    tags: ['jaundice', 'icterus', 'bilirubin', 'yellow', 'hyperbilirubinemia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="12" fill="yellow" opacity="0.4"/>
      <circle cx="32" cy="24" r="12"/>
      <circle cx="28" cy="22" r="2" fill="yellow" stroke="orange"/>
      <circle cx="36" cy="22" r="2" fill="yellow" stroke="orange"/>
      <path d="M28 28c2 2 4 2 8 0"/>
      <path d="M32 36v4"/>
      <ellipse cx="32" cy="48" rx="10" ry="6" fill="yellow" opacity="0.3"/>
      <ellipse cx="32" cy="48" rx="10" ry="6"/>
      <text x="4" y="56" font-size="3" fill="orange" stroke="none">Bilirubin</text>
    </svg>`
  },

  // ===========================================================================
  // PATHOLOGY - PANCREATICOBILIARY (10 icons)
  // ===========================================================================
  {
    id: 'gi-acute-pancreatitis',
    name: 'Acute Pancreatitis',
    domain: 'medicine',
    category: 'pathology-pancreaticobiliary',
    tags: ['pancreatitis', 'acute', 'inflammation', 'necrosis', 'gallstone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M48 20c4 0 8 4 8 12s-4 12-8 12H20c-8 0-12-4-12-8s4-8 8-8c-4-4 0-8 4-8h28z" fill="red" opacity="0.3"/>
      <path d="M48 20c4 0 8 4 8 12s-4 12-8 12H20c-8 0-12-4-12-8s4-8 8-8c-4-4 0-8 4-8h28z" stroke="red"/>
      <path d="M24 28l4 4-4 4" stroke="red"/>
      <path d="M36 26l4 4-4 4" stroke="red"/>
      <path d="M48 28l4 4-4 4" stroke="red"/>
      <text x="20" y="56" font-size="3" fill="red" stroke="none">Acute Pancreatitis</text>
    </svg>`
  },
  {
    id: 'gi-chronic-pancreatitis',
    name: 'Chronic Pancreatitis',
    domain: 'medicine',
    category: 'pathology-pancreaticobiliary',
    tags: ['pancreatitis', 'chronic', 'calcification', 'atrophy', 'fibrosis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M48 24c4 0 6 4 6 8s-2 8-6 8H24c-6 0-10-2-10-6s2-6 6-6c-2-2 0-4 2-4h26z"/>
      <circle cx="24" cy="28" r="2" fill="white" stroke="gray"/>
      <circle cx="32" cy="30" r="2" fill="white" stroke="gray"/>
      <circle cx="40" cy="28" r="2" fill="white" stroke="gray"/>
      <circle cx="48" cy="30" r="2" fill="white" stroke="gray"/>
      <path d="M20 32h32" stroke-dasharray="2 1"/>
      <text x="16" y="52" font-size="3" fill="currentColor" stroke="none">Calcifications</text>
    </svg>`
  },
  {
    id: 'gi-cholelithiasis',
    name: 'Cholelithiasis',
    domain: 'medicine',
    category: 'pathology-pancreaticobiliary',
    tags: ['gallstones', 'cholelithiasis', 'biliary colic', 'cholesterol stones'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c8 0 16 8 16 20s-4 24-16 28c-12-4-16-16-16-28S24 8 32 8z"/>
      <circle cx="28" cy="24" r="4" fill="yellow" stroke="orange"/>
      <circle cx="36" cy="32" r="5" fill="yellow" stroke="orange"/>
      <circle cx="28" cy="40" r="3" fill="yellow" stroke="orange"/>
      <circle cx="36" cy="44" r="2" fill="yellow" stroke="orange"/>
      <text x="4" y="56" font-size="3" fill="orange" stroke="none">Gallstones</text>
    </svg>`
  },
  {
    id: 'gi-cholecystitis',
    name: 'Cholecystitis',
    domain: 'medicine',
    category: 'pathology-pancreaticobiliary',
    tags: ['cholecystitis', 'gallbladder inflammation', 'Murphy sign', 'acute'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c8 0 16 8 16 20s-4 24-16 28c-12-4-16-16-16-28S24 8 32 8z" fill="red" opacity="0.2" stroke="red"/>
      <circle cx="32" cy="20" r="4" fill="yellow" stroke="orange"/>
      <path d="M32 8c-4 0-8-4-4-4h8c4 0 0 4-4 4"/>
      <path d="M24 28l4 4-4 4" stroke="red"/>
      <path d="M36 32l4 4-4 4" stroke="red"/>
      <text x="48" y="20" font-size="3" fill="orange" stroke="none">Stone</text>
      <text x="4" y="48" font-size="3" fill="red" stroke="none">Inflamed</text>
    </svg>`
  },
  {
    id: 'gi-cholangitis',
    name: 'Cholangitis',
    domain: 'medicine',
    category: 'pathology-pancreaticobiliary',
    tags: ['cholangitis', 'ascending', 'Charcot triad', 'biliary infection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8v16"/>
      <path d="M40 8v12l-8 8"/>
      <path d="M32 28v24" stroke="red" stroke-width="2"/>
      <ellipse cx="44" cy="16" rx="6" ry="8"/>
      <circle cx="32" cy="52" r="4" fill="yellow" stroke="orange"/>
      <path d="M28 36l4 4-4 4" stroke="red"/>
      <path d="M36 40l4 4-4 4" stroke="red"/>
      <text x="4" y="40" font-size="3" fill="red" stroke="none">Infected</text>
      <text x="4" y="56" font-size="3" fill="orange" stroke="none">Stone</text>
    </svg>`
  },
  {
    id: 'gi-choledocholithiasis',
    name: 'Choledocholithiasis',
    domain: 'medicine',
    category: 'pathology-pancreaticobiliary',
    tags: ['CBD stone', 'choledocholithiasis', 'biliary obstruction', 'jaundice'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8v20"/>
      <path d="M40 8v12"/>
      <path d="M40 20c0 4-4 8-8 8"/>
      <path d="M24 28h8"/>
      <path d="M32 28v28" stroke-width="2"/>
      <ellipse cx="44" cy="16" rx="6" ry="8"/>
      <circle cx="32" cy="44" r="5" fill="yellow" stroke="orange" stroke-width="2"/>
      <path d="M8 44h16" stroke="red"/>
      <path d="M40 44h16" stroke="red"/>
      <text x="44" y="48" font-size="3" fill="orange" stroke="none">CBD Stone</text>
    </svg>`
  },
  {
    id: 'gi-pancreatic-cancer',
    name: 'Pancreatic Cancer',
    domain: 'medicine',
    category: 'pathology-pancreaticobiliary',
    tags: ['pancreatic cancer', 'adenocarcinoma', 'Whipple', 'jaundice', 'mass'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M48 20c4 0 8 4 8 12s-4 12-8 12H20c-8 0-12-4-12-8s4-8 8-8c-4-4 0-8 4-8h28z"/>
      <ellipse cx="48" cy="32" rx="10" ry="8" fill="darkred" opacity="0.4" stroke="darkred" stroke-width="2"/>
      <path d="M44 28c4 4 8 4 8 0" stroke="darkred"/>
      <path d="M44 36c4 4 8 4 8 0" stroke="darkred"/>
      <text x="4" y="56" font-size="3" fill="darkred" stroke="none">Pancreatic CA</text>
    </svg>`
  },
  {
    id: 'gi-biliary-stricture',
    name: 'Biliary Stricture',
    domain: 'medicine',
    category: 'pathology-pancreaticobiliary',
    tags: ['stricture', 'biliary', 'narrowing', 'PSC', 'cholangiocarcinoma'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 8v16c0 4-4 8 4 8s4 4 4 8v16"/>
      <path d="M36 8v16c0-4 4-8-4-8"/>
      <ellipse cx="32" cy="32" rx="2" ry="4" fill="currentColor" opacity="0.3"/>
      <path d="M24 32h4" stroke="red" stroke-width="2"/>
      <path d="M36 32h4" stroke="red" stroke-width="2"/>
      <text x="40" y="32" font-size="3" fill="red" stroke="none">Stricture</text>
      <path d="M20 16h24" stroke-dasharray="2 2"/>
      <path d="M20 48h24" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'gi-psc',
    name: 'Primary Sclerosing Cholangitis',
    domain: 'medicine',
    category: 'pathology-pancreaticobiliary',
    tags: ['PSC', 'sclerosing cholangitis', 'beading', 'IBD', 'biliary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8l8 12"/>
      <path d="M48 8l-8 12"/>
      <path d="M24 20h16"/>
      <path d="M32 20v8c0 2-2 4 0 4s0 2 0 4v8c0 2-2 4 0 4s0 2 0 4v4"/>
      <circle cx="32" cy="28" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="40" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="52" r="2" fill="currentColor" opacity="0.3"/>
      <text x="40" y="40" font-size="3" fill="currentColor" stroke="none">Beading</text>
      <text x="16" y="60" font-size="4" fill="currentColor" stroke="none">PSC</text>
    </svg>`
  },
  {
    id: 'gi-pancreatic-pseudocyst',
    name: 'Pancreatic Pseudocyst',
    domain: 'medicine',
    category: 'pathology-pancreaticobiliary',
    tags: ['pseudocyst', 'pancreatic', 'fluid collection', 'pancreatitis complication'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M48 16c4 0 8 4 8 8s-4 8-8 8H20c-8 0-10-2-10-4s2-4 6-4c-4-4 0-8 4-8h28z"/>
      <ellipse cx="32" cy="44" rx="16" ry="12" fill="lightblue" opacity="0.4"/>
      <ellipse cx="32" cy="44" rx="16" ry="12"/>
      <path d="M32 24v8"/>
      <text x="24" y="48" font-size="4" fill="currentColor" stroke="none">Cyst</text>
    </svg>`
  },

  // ===========================================================================
  // EQUIPMENT & PROCEDURES (12 icons)
  // ===========================================================================
  {
    id: 'gi-egd-scope',
    name: 'EGD Scope',
    domain: 'medicine',
    category: 'gi-equipment',
    tags: ['EGD', 'esophagogastroduodenoscopy', 'upper endoscopy', 'gastroscope'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 8c0 4 4 8 8 8h24c4 0 8-4 8-8"/>
      <path d="M20 16v8c0 8-4 16 0 24 4 8 4 12 4 12"/>
      <path d="M32 16v32"/>
      <ellipse cx="32" cy="52" rx="4" ry="2" fill="currentColor"/>
      <circle cx="32" cy="52" r="1" fill="white"/>
      <path d="M24 52h-4"/>
      <path d="M40 52h4"/>
      <text x="40" y="40" font-size="4" fill="currentColor" stroke="none">EGD</text>
    </svg>`
  },
  {
    id: 'gi-colonoscope',
    name: 'Colonoscope',
    domain: 'medicine',
    category: 'gi-equipment',
    tags: ['colonoscope', 'colonoscopy', 'lower endoscopy', 'screening'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 12h16c4 0 8 4 8 8"/>
      <path d="M32 20v12c0 8 8 16 16 16h8"/>
      <path d="M56 48c0 4-4 8-8 8"/>
      <ellipse cx="48" cy="56" rx="4" ry="2" fill="currentColor"/>
      <circle cx="48" cy="56" r="1" fill="white"/>
      <path d="M8 8v8"/>
      <path d="M4 12h8"/>
      <text x="4" y="36" font-size="4" fill="currentColor" stroke="none">Scope</text>
    </svg>`
  },
  {
    id: 'gi-ercp',
    name: 'ERCP Scope',
    domain: 'medicine',
    category: 'gi-equipment',
    tags: ['ERCP', 'duodenoscope', 'biliary', 'sphincterotomy', 'stent'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 8v16c0 8 8 16 16 16"/>
      <path d="M24 40h8"/>
      <ellipse cx="36" cy="40" rx="4" ry="2" fill="currentColor"/>
      <path d="M36 38v-16"/>
      <path d="M32 22h8"/>
      <ellipse cx="44" cy="22" rx="4" ry="6"/>
      <path d="M40 40l8 12"/>
      <circle cx="48" cy="54" r="3"/>
      <text x="4" y="44" font-size="3" fill="currentColor" stroke="none">ERCP</text>
      <text x="50" y="56" font-size="3" fill="currentColor" stroke="none">CBD</text>
    </svg>`
  },
  {
    id: 'gi-eus',
    name: 'EUS Scope',
    domain: 'medicine',
    category: 'gi-equipment',
    tags: ['EUS', 'endoscopic ultrasound', 'FNA', 'staging', 'pancreas'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 8c0 4 4 8 8 8h24"/>
      <path d="M20 16v32"/>
      <ellipse cx="20" cy="52" rx="6" ry="4" fill="currentColor" opacity="0.3"/>
      <ellipse cx="20" cy="52" rx="6" ry="4"/>
      <path d="M26 48c4-4 8-8 12-8"/>
      <path d="M26 56c4 4 8 8 12 8"/>
      <path d="M38 40l8-8" stroke-dasharray="2 2"/>
      <path d="M38 64l8 8" stroke-dasharray="2 2"/>
      <text x="44" y="44" font-size="3" fill="currentColor" stroke="none">US waves</text>
    </svg>`
  },
  {
    id: 'gi-capsule-endoscopy',
    name: 'Capsule Endoscopy',
    domain: 'medicine',
    category: 'gi-equipment',
    tags: ['capsule', 'pill camera', 'small bowel', 'video', 'wireless'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="24" width="24" height="16" rx="8" fill="currentColor" opacity="0.1"/>
      <rect x="20" y="24" width="24" height="16" rx="8"/>
      <circle cx="28" cy="32" r="4" fill="lightblue"/>
      <circle cx="28" cy="32" r="2" fill="blue"/>
      <rect x="36" y="28" width="4" height="8" fill="currentColor" opacity="0.3"/>
      <path d="M28 20v-8"/>
      <path d="M28 12l-4-4"/>
      <path d="M28 12l4-4"/>
      <path d="M28 44v8"/>
      <text x="16" y="60" font-size="4" fill="currentColor" stroke="none">Capsule</text>
    </svg>`
  },
  {
    id: 'gi-fibroscan',
    name: 'FibroScan',
    domain: 'medicine',
    category: 'gi-equipment',
    tags: ['FibroScan', 'elastography', 'liver stiffness', 'fibrosis', 'non-invasive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="32" rx="4"/>
      <rect x="24" y="12" width="16" height="12" fill="lightblue" opacity="0.3"/>
      <path d="M32 40v16"/>
      <ellipse cx="32" cy="58" rx="8" ry="4"/>
      <path d="M26 16h12" stroke="green"/>
      <path d="M26 20h8" stroke="yellow"/>
      <text x="38" y="20" font-size="3" fill="currentColor" stroke="none">kPa</text>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">Probe</text>
    </svg>`
  },
  {
    id: 'gi-liver-biopsy',
    name: 'Liver Biopsy',
    domain: 'medicine',
    category: 'gi-equipment',
    tags: ['biopsy', 'liver', 'percutaneous', 'needle', 'histology'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c0-12 12-20 24-20s20 8 20 20c0 12-8 24-20 24s-24-12-24-24z" fill="currentColor" opacity="0.15"/>
      <path d="M12 32c0-12 12-20 24-20s20 8 20 20c0 12-8 24-20 24s-24-12-24-24z"/>
      <path d="M8 8l24 24"/>
      <rect x="4" y="4" width="8" height="12" rx="1"/>
      <path d="M32 32l4 4" stroke-width="2"/>
      <text x="40" y="44" font-size="3" fill="currentColor" stroke="none">Core</text>
    </svg>`
  },
  {
    id: 'gi-paracentesis',
    name: 'Paracentesis',
    domain: 'medicine',
    category: 'gi-equipment',
    tags: ['paracentesis', 'ascites', 'drainage', 'abdominal tap', 'fluid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="24" ry="16" fill="lightblue" opacity="0.3"/>
      <ellipse cx="32" cy="40" rx="24" ry="16"/>
      <path d="M32 8v24"/>
      <rect x="28" y="4" width="8" height="8" rx="1"/>
      <path d="M32 32l0 4" stroke-width="2"/>
      <path d="M20 52l-8 8"/>
      <ellipse cx="10" cy="62" rx="4" ry="2"/>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">Drain</text>
    </svg>`
  },
  {
    id: 'gi-tips',
    name: 'TIPS Procedure',
    domain: 'medicine',
    category: 'gi-equipment',
    tags: ['TIPS', 'transjugular', 'portosystemic shunt', 'portal hypertension'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="16" ry="8" fill="currentColor" opacity="0.15"/>
      <ellipse cx="32" cy="16" rx="16" ry="8"/>
      <path d="M24 24v20" stroke="blue" stroke-width="2"/>
      <path d="M40 24v20" stroke="blue" stroke-width="2"/>
      <path d="M24 36h16" stroke="gray" stroke-width="3"/>
      <ellipse cx="32" cy="36" rx="8" ry="2" fill="gray" opacity="0.5"/>
      <path d="M40 48l8 8"/>
      <text x="4" y="28" font-size="3" fill="blue" stroke="none">HV</text>
      <text x="44" y="28" font-size="3" fill="blue" stroke="none">PV</text>
      <text x="44" y="40" font-size="3" fill="gray" stroke="none">Stent</text>
    </svg>`
  },
  {
    id: 'gi-ph-probe',
    name: 'pH Probe',
    domain: 'medicine',
    category: 'gi-equipment',
    tags: ['pH probe', 'impedance', 'reflux monitoring', 'GERD', '24-hour'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="4" width="24" height="16" rx="2"/>
      <path d="M32 20v32"/>
      <circle cx="32" cy="56" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="56" r="4"/>
      <rect x="24" y="8" width="16" height="8" fill="lightgreen" opacity="0.3"/>
      <text x="26" y="14" font-size="4" fill="currentColor" stroke="none">pH</text>
      <path d="M28 44h8" stroke-dasharray="2 2"/>
      <text x="40" y="48" font-size="3" fill="currentColor" stroke="none">Sensors</text>
    </svg>`
  },
  {
    id: 'gi-manometry',
    name: 'Esophageal Manometry',
    domain: 'medicine',
    category: 'gi-equipment',
    tags: ['manometry', 'motility', 'pressure', 'swallowing', 'achalasia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="4" width="32" height="12" rx="2"/>
      <path d="M32 16v40"/>
      <circle cx="32" cy="24" r="2" fill="currentColor"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <circle cx="32" cy="40" r="2" fill="currentColor"/>
      <circle cx="32" cy="48" r="2" fill="currentColor"/>
      <path d="M34 24c4 0 8 2 12 0"/>
      <path d="M34 32c4 1 8 2 12 0"/>
      <path d="M34 40c4 2 8 2 12 0"/>
      <path d="M34 48c4 1 8 2 12 0"/>
      <text x="48" y="36" font-size="3" fill="currentColor" stroke="none">mmHg</text>
    </svg>`
  },
  {
    id: 'gi-breath-test',
    name: 'Breath Test',
    domain: 'medicine',
    category: 'gi-equipment',
    tags: ['breath test', 'H. pylori', 'urea', 'SIBO', 'lactose'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="24" r="12"/>
      <path d="M20 20c2 2 6 2 8 0"/>
      <circle cx="20" cy="22" r="1" fill="currentColor"/>
      <circle cx="28" cy="22" r="1" fill="currentColor"/>
      <path d="M24 28c2 2 2 2 0 4"/>
      <path d="M36 24h16"/>
      <rect x="44" y="20" width="12" height="24" rx="2"/>
      <path d="M48 28h4"/>
      <path d="M48 32h4"/>
      <path d="M48 36h4"/>
      <text x="44" y="52" font-size="3" fill="currentColor" stroke="none">CO2</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL PATHOLOGY & CONDITIONS (8 icons)
  // ===========================================================================
  {
    id: 'gi-celiac-disease',
    name: 'Celiac Disease',
    domain: 'medicine',
    category: 'pathology-lower-gi',
    tags: ['celiac', 'gluten', 'villous atrophy', 'malabsorption', 'sprue'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c8-8 16-8 24 0s16 8 24 0"/>
      <path d="M8 32c8 8 16 8 24 0s16-8 24 0"/>
      <path d="M12 24v-8" stroke-width="2"/>
      <path d="M20 22v-10" stroke-width="2"/>
      <path d="M28 24v-8" stroke-width="2"/>
      <path d="M36 26v-4" stroke-dasharray="2 2"/>
      <path d="M44 28v-2" stroke-dasharray="2 2"/>
      <path d="M52 30v-2" stroke-dasharray="2 2"/>
      <text x="4" y="20" font-size="3" fill="currentColor" stroke="none">Normal</text>
      <text x="36" y="20" font-size="3" fill="red" stroke="none">Atrophy</text>
      <text x="20" y="56" font-size="4" fill="currentColor" stroke="none">Celiac</text>
    </svg>`
  },
  {
    id: 'gi-achalasia',
    name: 'Achalasia',
    domain: 'medicine',
    category: 'pathology-upper-gi',
    tags: ['achalasia', 'dysphagia', 'LES', 'motility', 'bird beak'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8h24c4 0 8 8 8 16v8c0 8-8 16-16 24-8-8-16-16-16-24v-8c0-8 4-16 8-16z" fill="currentColor" opacity="0.15"/>
      <path d="M20 8h24c4 0 8 8 8 16v8c0 8-8 16-16 24-8-8-16-16-16-24v-8c0-8 4-16 8-16z"/>
      <ellipse cx="36" cy="52" rx="2" ry="4"/>
      <path d="M36 56l0 4"/>
      <text x="4" y="24" font-size="3" fill="currentColor" stroke="none">Dilated</text>
      <text x="40" y="56" font-size="3" fill="currentColor" stroke="none">Bird beak</text>
    </svg>`
  },
  {
    id: 'gi-gastroparesis',
    name: 'Gastroparesis',
    domain: 'medicine',
    category: 'pathology-upper-gi',
    tags: ['gastroparesis', 'delayed emptying', 'nausea', 'diabetes', 'motility'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c-8 4-8 20 0 28 8 8 24 8 32 0 8-8 8-20 0-28"/>
      <path d="M16 16c4 4 12 4 16 0s12-4 16 0"/>
      <ellipse cx="28" cy="36" rx="12" ry="8" fill="currentColor" opacity="0.3"/>
      <circle cx="24" cy="34" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="32" cy="38" r="4" fill="currentColor" opacity="0.5"/>
      <circle cx="28" cy="30" r="2" fill="currentColor" opacity="0.5"/>
      <path d="M44 36l8 8" stroke="red" stroke-width="2"/>
      <path d="M52 36l-8 8" stroke="red" stroke-width="2"/>
      <text x="44" y="52" font-size="3" fill="red" stroke="none">Delayed</text>
    </svg>`
  },
  {
    id: 'gi-sibo',
    name: 'SIBO',
    domain: 'medicine',
    category: 'pathology-lower-gi',
    tags: ['SIBO', 'small intestinal bacterial overgrowth', 'bloating', 'malabsorption'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28c8 0 12 8 12 8s4-8 12-8 12 8 12 8s4-8 12-8"/>
      <path d="M8 36c8 0 12-8 12-8s4 8 12 8 12-8 12-8s4 8 12 8"/>
      <circle cx="16" cy="32" r="2" fill="green"/>
      <circle cx="24" cy="28" r="2" fill="green"/>
      <circle cx="28" cy="36" r="2" fill="green"/>
      <circle cx="36" cy="30" r="2" fill="green"/>
      <circle cx="40" cy="34" r="2" fill="green"/>
      <circle cx="48" cy="32" r="2" fill="green"/>
      <circle cx="20" cy="34" r="1" fill="green"/>
      <circle cx="32" cy="32" r="1" fill="green"/>
      <circle cx="44" cy="30" r="1" fill="green"/>
      <text x="20" y="52" font-size="4" fill="green" stroke="none">SIBO</text>
    </svg>`
  },
  {
    id: 'gi-ischemic-colitis',
    name: 'Ischemic Colitis',
    domain: 'medicine',
    category: 'pathology-lower-gi',
    tags: ['ischemic colitis', 'watershed', 'ischemia', 'bloody diarrhea', 'mesenteric'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 12v40c0 4 4 8 8 8h16c4 0 8-4 8-8V12"/>
      <rect x="24" y="28" width="16" height="16" fill="darkred" opacity="0.3"/>
      <path d="M24 28h16"/>
      <path d="M24 44h16"/>
      <path d="M12 36h4" stroke="red" stroke-dasharray="2 2"/>
      <path d="M48 36h4" stroke="red" stroke-dasharray="2 2"/>
      <text x="4" y="40" font-size="3" fill="red" stroke="none">Ischemia</text>
      <text x="20" y="60" font-size="3" fill="currentColor" stroke="none">Watershed</text>
    </svg>`
  },
  {
    id: 'gi-microscopic-colitis',
    name: 'Microscopic Colitis',
    domain: 'medicine',
    category: 'pathology-lower-gi',
    tags: ['microscopic colitis', 'lymphocytic', 'collagenous', 'watery diarrhea'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <path d="M16 32h32" stroke-dasharray="2 2"/>
      <circle cx="20" cy="28" r="2" fill="purple" opacity="0.5"/>
      <circle cx="28" cy="26" r="2" fill="purple" opacity="0.5"/>
      <circle cx="36" cy="28" r="2" fill="purple" opacity="0.5"/>
      <circle cx="44" cy="26" r="2" fill="purple" opacity="0.5"/>
      <circle cx="24" cy="38" r="2" fill="purple" opacity="0.5"/>
      <circle cx="32" cy="36" r="2" fill="purple" opacity="0.5"/>
      <circle cx="40" cy="38" r="2" fill="purple" opacity="0.5"/>
      <path d="M32 20v-8"/>
      <circle cx="32" cy="8" r="4"/>
      <text x="16" y="56" font-size="3" fill="currentColor" stroke="none">Lymphocytes</text>
    </svg>`
  },
  {
    id: 'gi-zollinger-ellison',
    name: 'Zollinger-Ellison Syndrome',
    domain: 'medicine',
    category: 'pathology-upper-gi',
    tags: ['ZES', 'gastrinoma', 'peptic ulcer', 'hypergastrinemia', 'MEN1'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="28" cy="24" rx="16" ry="12" fill="currentColor" opacity="0.1"/>
      <ellipse cx="28" cy="24" rx="16" ry="12"/>
      <circle cx="24" cy="22" r="3" fill="red" opacity="0.3" stroke="red"/>
      <circle cx="32" cy="26" r="3" fill="red" opacity="0.3" stroke="red"/>
      <circle cx="20" cy="28" r="2" fill="red" opacity="0.3" stroke="red"/>
      <ellipse cx="44" cy="48" rx="10" ry="8"/>
      <circle cx="44" cy="48" r="4" fill="darkred" opacity="0.4" stroke="darkred"/>
      <path d="M36 36l4 8"/>
      <text x="4" y="40" font-size="3" fill="red" stroke="none">Ulcers</text>
      <text x="48" y="60" font-size="3" fill="darkred" stroke="none">Gastrinoma</text>
    </svg>`
  },
  {
    id: 'gi-giist',
    name: 'GIST Tumor',
    domain: 'medicine',
    category: 'pathology-lower-gi',
    tags: ['GIST', 'stromal tumor', 'c-kit', 'imatinib', 'submucosal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24h48"/>
      <path d="M8 40h48"/>
      <ellipse cx="32" cy="32" rx="12" ry="8" fill="darkred" opacity="0.3" stroke="darkred" stroke-width="2"/>
      <path d="M24 28c4 4 12 4 16 0" stroke="darkred"/>
      <path d="M24 36c4-4 12-4 16 0" stroke="darkred"/>
      <path d="M20 32h4" stroke="darkred"/>
      <path d="M40 32h4" stroke="darkred"/>
      <text x="4" y="20" font-size="3" fill="currentColor" stroke="none">Mucosa</text>
      <text x="4" y="48" font-size="3" fill="currentColor" stroke="none">Serosa</text>
      <text x="44" y="36" font-size="3" fill="darkred" stroke="none">GIST</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL EQUIPMENT & INTERVENTIONS (4 icons)
  // ===========================================================================
  {
    id: 'gi-hemostasis-clip',
    name: 'Hemostasis Clip',
    domain: 'medicine',
    category: 'gi-equipment',
    tags: ['clip', 'hemostasis', 'endoscopic', 'bleeding', 'hemoclip'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v24"/>
      <path d="M24 32l8 8 8-8"/>
      <path d="M24 40c-4 0-8 4-8 8"/>
      <path d="M40 40c4 0 8 4 8 8"/>
      <path d="M16 48c0 4 4 8 8 8"/>
      <path d="M48 48c0 4-4 8-8 8"/>
      <path d="M24 56h16"/>
      <ellipse cx="32" cy="52" rx="4" ry="2" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="52" r="2" fill="red"/>
      <text x="4" y="48" font-size="3" fill="currentColor" stroke="none">Clip</text>
    </svg>`
  },
  {
    id: 'gi-variceal-banding',
    name: 'Variceal Banding',
    domain: 'medicine',
    category: 'gi-equipment',
    tags: ['banding', 'varices', 'EVL', 'ligation', 'rubber band'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v40H24V8z"/>
      <ellipse cx="32" cy="24" rx="6" ry="8" fill="blue" opacity="0.3" stroke="blue"/>
      <ellipse cx="32" cy="20" rx="4" ry="2" fill="purple" stroke="purple" stroke-width="2"/>
      <ellipse cx="32" cy="40" rx="6" ry="8" fill="blue" opacity="0.3" stroke="blue"/>
      <ellipse cx="32" cy="36" rx="4" ry="2" fill="purple" stroke="purple" stroke-width="2"/>
      <text x="40" y="24" font-size="3" fill="purple" stroke="none">Band</text>
      <text x="40" y="44" font-size="3" fill="blue" stroke="none">Varix</text>
    </svg>`
  },
  {
    id: 'gi-biliary-stent',
    name: 'Biliary Stent',
    domain: 'medicine',
    category: 'gi-equipment',
    tags: ['stent', 'biliary', 'plastic', 'metal', 'obstruction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8v16"/>
      <path d="M40 8v12"/>
      <path d="M40 20c0 4-4 8-8 8"/>
      <path d="M24 24h8"/>
      <path d="M32 24v32" stroke-width="2"/>
      <rect x="28" y="32" width="8" height="16" rx="1" fill="gray" opacity="0.3"/>
      <path d="M28 32h8" stroke="gray"/>
      <path d="M28 48h8" stroke="gray"/>
      <path d="M30 36h4" stroke="gray"/>
      <path d="M30 40h4" stroke="gray"/>
      <path d="M30 44h4" stroke="gray"/>
      <ellipse cx="44" cy="16" rx="6" ry="8"/>
      <text x="44" y="40" font-size="3" fill="gray" stroke="none">Stent</text>
    </svg>`
  },
  {
    id: 'gi-polypectomy-snare',
    name: 'Polypectomy Snare',
    domain: 'medicine',
    category: 'gi-equipment',
    tags: ['polypectomy', 'snare', 'EMR', 'cold snare', 'hot snare'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v20"/>
      <ellipse cx="32" cy="40" rx="12" ry="8"/>
      <path d="M20 40c0 8 6 16 12 16s12-8 12-16"/>
      <ellipse cx="32" cy="48" rx="8" ry="6" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="48" rx="8" ry="6"/>
      <path d="M32 48v8"/>
      <text x="4" y="44" font-size="3" fill="currentColor" stroke="none">Snare</text>
      <text x="40" y="56" font-size="3" fill="currentColor" stroke="none">Polyp</text>
    </svg>`
  },
];

export default gastroenterologyIcons;
