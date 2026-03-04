/**
 * Forensic Science Icon Library
 * Comprehensive SVG icons for forensic sciences
 *
 * Categories:
 * - Evidence Collection (scene, samples, documentation)
 * - Analysis Methods (DNA, fingerprints, toxicology)
 * - Identification (fingerprints, dental, facial)
 * - Ballistics (firearms, trajectories, wounds)
 * - Digital Forensics (data recovery, cyber, analysis)
 */

import type { IconDefinition } from './index';

export const forensicsIcons: IconDefinition[] = [
  // ===========================================================================
  // EVIDENCE COLLECTION
  // ===========================================================================
  {
    id: 'forensic-crime-scene',
    name: 'Crime Scene',
    domain: 'chemistry',
    category: 'evidence',
    tags: ['crime scene', 'evidence', 'tape', 'investigation', 'scene'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <path d="M8 20h48" stroke-dasharray="8 4"/>
      <path d="M8 44h48" stroke-dasharray="8 4"/>
      <path d="M24 28l8 8 8-8"/>
      <path d="M32 36v12"/>
      <circle cx="20" cy="32" r="2" fill="currentColor"/>
      <circle cx="44" cy="36" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'forensic-evidence-marker',
    name: 'Evidence Marker',
    domain: 'chemistry',
    category: 'evidence',
    tags: ['marker', 'evidence', 'number', 'scene', 'documentation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 56l16-40 16 40H16z" fill="currentColor" opacity="0.3"/>
      <path d="M16 56l16-40 16 40H16z"/>
      <text x="26" y="48" font-size="14" font-weight="bold" fill="currentColor" stroke="none">1</text>
      <circle cx="44" cy="52" r="4"/>
      <path d="M40 52h-8"/>
    </svg>`
  },
  {
    id: 'forensic-swab',
    name: 'Evidence Swab',
    domain: 'chemistry',
    category: 'evidence',
    tags: ['swab', 'sample', 'DNA', 'collection', 'cotton'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="28" y="20" width="8" height="36" rx="1"/>
      <ellipse cx="32" cy="12" rx="8" ry="6" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="12" rx="8" ry="6"/>
      <path d="M28 24h8"/>
      <path d="M28 32h8"/>
      <path d="M28 40h8"/>
    </svg>`
  },
  {
    id: 'forensic-evidence-bag',
    name: 'Evidence Bag',
    domain: 'chemistry',
    category: 'evidence',
    tags: ['bag', 'evidence', 'seal', 'chain of custody', 'container'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="12" y="8" width="40" height="48" rx="2"/>
      <path d="M12 16h40"/>
      <path d="M16 12v4"/>
      <path d="M24 12v4"/>
      <path d="M40 12v4"/>
      <path d="M48 12v4"/>
      <text x="16" y="28" font-size="5" fill="currentColor" stroke="none">EVIDENCE</text>
      <path d="M16 32h32"/>
      <path d="M16 40h24"/>
      <path d="M16 48h16"/>
    </svg>`
  },
  {
    id: 'forensic-camera',
    name: 'Forensic Camera',
    domain: 'chemistry',
    category: 'evidence',
    tags: ['camera', 'photography', 'documentation', 'scene', 'record'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="32" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="20" width="48" height="32" rx="4"/>
      <circle cx="32" cy="36" r="10"/>
      <circle cx="32" cy="36" r="6"/>
      <rect x="24" y="12" width="16" height="8" rx="2"/>
      <circle cx="48" cy="28" r="3"/>
      <path d="M12 28h8"/>
    </svg>`
  },

  // ===========================================================================
  // FINGERPRINT ANALYSIS
  // ===========================================================================
  {
    id: 'forensic-fingerprint',
    name: 'Fingerprint',
    domain: 'chemistry',
    category: 'fingerprints',
    tags: ['fingerprint', 'print', 'ridge', 'identification', 'latent'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 40c0-16 7.2-28 16-28s16 12 16 28"/>
      <path d="M20 40c0-12 5.4-20 12-20s12 8 12 20"/>
      <path d="M24 40c0-8 3.6-14 8-14s8 6 8 14"/>
      <path d="M28 40c0-4 1.8-8 4-8s4 4 4 8"/>
      <path d="M16 40c0 8 7.2 16 16 16s16-8 16-16"/>
      <path d="M20 44c0 6 5.4 12 12 12s12-6 12-12"/>
      <path d="M24 48c0 4 3.6 8 8 8s8-4 8-8"/>
    </svg>`
  },
  {
    id: 'forensic-fingerprint-scan',
    name: 'Fingerprint Scanner',
    domain: 'chemistry',
    category: 'fingerprints',
    tags: ['scanner', 'biometric', 'identification', 'AFIS', 'digital'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <path d="M20 36c0-8 5.4-14 12-14s12 6 12 14"/>
      <path d="M24 36c0-4 3.6-8 8-8s8 4 8 8"/>
      <path d="M28 36c0-2 1.8-4 4-4s4 2 4 4"/>
      <path d="M16 28h32" stroke="red" stroke-dasharray="4 2"/>
      <path d="M20 44c0 4 5.4 8 12 8s12-4 12-8"/>
    </svg>`
  },
  {
    id: 'forensic-dusting',
    name: 'Fingerprint Dusting',
    domain: 'chemistry',
    category: 'fingerprints',
    tags: ['dusting', 'powder', 'latent', 'development', 'brush'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v32"/>
      <path d="M24 8c-4 0-8 4-8 8s4 8 8 8"/>
      <path d="M40 8c4 0 8 4 8 8s-4 8-8 8"/>
      <path d="M20 40c0-4 5.4-8 12-8s12 4 12 8"/>
      <path d="M24 44c0-2 3.6-4 8-4s8 2 8 4"/>
      <ellipse cx="32" cy="52" rx="16" ry="6" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="52" rx="16" ry="6"/>
    </svg>`
  },

  // ===========================================================================
  // DNA ANALYSIS
  // ===========================================================================
  {
    id: 'forensic-dna-helix',
    name: 'DNA Double Helix',
    domain: 'chemistry',
    category: 'dna',
    tags: ['DNA', 'helix', 'genetics', 'profile', 'nucleotide'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8c8 8 8 16 0 24s-8 16 0 24"/>
      <path d="M48 8c-8 8-8 16 0 24s8 16 0 24"/>
      <line x1="20" y1="12" x2="44" y2="12"/>
      <line x1="16" y1="20" x2="48" y2="20"/>
      <line x1="20" y1="28" x2="44" y2="28"/>
      <line x1="16" y1="36" x2="48" y2="36"/>
      <line x1="20" y1="44" x2="44" y2="44"/>
      <line x1="16" y1="52" x2="48" y2="52"/>
    </svg>`
  },
  {
    id: 'forensic-gel-electrophoresis',
    name: 'Gel Electrophoresis',
    domain: 'chemistry',
    category: 'dna',
    tags: ['electrophoresis', 'gel', 'bands', 'separation', 'profile'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <rect x="12" y="16" width="4" height="8" fill="currentColor"/>
      <rect x="12" y="28" width="4" height="4" fill="currentColor"/>
      <rect x="12" y="40" width="4" height="6" fill="currentColor"/>
      <rect x="22" y="16" width="4" height="12" fill="currentColor"/>
      <rect x="22" y="32" width="4" height="6" fill="currentColor"/>
      <rect x="22" y="44" width="4" height="4" fill="currentColor"/>
      <rect x="32" y="16" width="4" height="6" fill="currentColor"/>
      <rect x="32" y="26" width="4" height="8" fill="currentColor"/>
      <rect x="32" y="40" width="4" height="10" fill="currentColor"/>
      <rect x="42" y="16" width="4" height="10" fill="currentColor"/>
      <rect x="42" y="30" width="4" height="4" fill="currentColor"/>
      <rect x="42" y="38" width="4" height="8" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'forensic-pcr',
    name: 'PCR Machine',
    domain: 'chemistry',
    category: 'dna',
    tags: ['PCR', 'amplification', 'thermocycler', 'DNA', 'replication'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="40" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="16" width="48" height="40" rx="4"/>
      <rect x="16" y="24" width="32" height="20" rx="2"/>
      <circle cx="20" cy="32" r="2" fill="currentColor"/>
      <circle cx="28" cy="32" r="2" fill="currentColor"/>
      <circle cx="36" cy="32" r="2" fill="currentColor"/>
      <circle cx="44" cy="32" r="2" fill="currentColor"/>
      <circle cx="20" cy="40" r="2" fill="currentColor"/>
      <circle cx="28" cy="40" r="2" fill="currentColor"/>
      <circle cx="36" cy="40" r="2" fill="currentColor"/>
      <circle cx="44" cy="40" r="2" fill="currentColor"/>
      <path d="M16 8h8v8"/>
      <path d="M40 8h8v8"/>
    </svg>`
  },

  // ===========================================================================
  // BALLISTICS
  // ===========================================================================
  {
    id: 'forensic-bullet',
    name: 'Bullet',
    domain: 'chemistry',
    category: 'ballistics',
    tags: ['bullet', 'projectile', 'ammunition', 'cartridge', 'caliber'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c8 0 12 8 12 16H20c0-8 4-16 12-16z" fill="currentColor" opacity="0.3"/>
      <path d="M32 8c8 0 12 8 12 16H20c0-8 4-16 12-16z"/>
      <rect x="20" y="24" width="24" height="32" fill="currentColor" opacity="0.2"/>
      <rect x="20" y="24" width="24" height="32"/>
      <line x1="20" y1="32" x2="44" y2="32"/>
      <line x1="20" y1="40" x2="44" y2="40"/>
    </svg>`
  },
  {
    id: 'forensic-trajectory',
    name: 'Bullet Trajectory',
    domain: 'chemistry',
    category: 'ballistics',
    tags: ['trajectory', 'path', 'angle', 'reconstruction', 'analysis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="20" r="4" fill="currentColor"/>
      <path d="M16 20l40 24" stroke-dasharray="4 2"/>
      <circle cx="56" cy="44" r="4"/>
      <path d="M24 12v16"/>
      <path d="M20 16l4 4 4-4"/>
      <path d="M48 36v16"/>
      <path d="M44 48l4 4 4-4"/>
      <text x="20" y="10" font-size="4" fill="currentColor" stroke="none">A°</text>
    </svg>`
  },
  {
    id: 'forensic-firearm',
    name: 'Firearm',
    domain: 'chemistry',
    category: 'ballistics',
    tags: ['firearm', 'gun', 'weapon', 'handgun', 'evidence'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24h40v8H8z" fill="currentColor" opacity="0.2"/>
      <path d="M8 24h40v8H8z"/>
      <path d="M48 24l8-4v16l-8-4"/>
      <path d="M32 32v20l8 4V32"/>
      <rect x="24" y="32" width="8" height="4"/>
      <circle cx="12" cy="28" r="2"/>
      <path d="M16 24v-8h24v8"/>
    </svg>`
  },
  {
    id: 'forensic-casing',
    name: 'Shell Casing',
    domain: 'chemistry',
    category: 'ballistics',
    tags: ['casing', 'shell', 'cartridge', 'ejection', 'marks'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="12" ry="4"/>
      <path d="M20 12v36c0 4 5.4 8 12 8s12-4 12-8V12"/>
      <ellipse cx="32" cy="48" rx="12" ry="8"/>
      <circle cx="32" cy="48" r="4"/>
      <line x1="20" y1="20" x2="44" y2="20"/>
      <line x1="20" y1="28" x2="44" y2="28"/>
    </svg>`
  },

  // ===========================================================================
  // TOXICOLOGY
  // ===========================================================================
  {
    id: 'forensic-toxicology',
    name: 'Toxicology Analysis',
    domain: 'chemistry',
    category: 'toxicology',
    tags: ['toxicology', 'poison', 'drugs', 'analysis', 'blood'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v12l8 24c0 8-6.4 12-16 12s-16-4-16-12l8-24V8z" fill="currentColor" opacity="0.1"/>
      <path d="M24 8h16v12l8 24c0 8-6.4 12-16 12s-16-4-16-12l8-24V8z"/>
      <path d="M20 8h24"/>
      <path d="M24 20h16"/>
      <path d="M20 36c8 4 16 4 24 0" fill="currentColor" opacity="0.3"/>
      <path d="M20 36c8 4 16 4 24 0"/>
      <circle cx="28" cy="44" r="2" fill="currentColor"/>
      <circle cx="36" cy="48" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'forensic-blood-sample',
    name: 'Blood Sample',
    domain: 'chemistry',
    category: 'toxicology',
    tags: ['blood', 'sample', 'serology', 'typing', 'analysis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-12 16-20 24-20 36 0 8 9 12 20 12s20-4 20-12c0-12-8-20-20-36z" fill="currentColor" opacity="0.3"/>
      <path d="M32 8c-12 16-20 24-20 36 0 8 9 12 20 12s20-4 20-12c0-12-8-20-20-36z"/>
      <path d="M24 44c4 4 12 4 16 0"/>
    </svg>`
  },
  {
    id: 'forensic-mass-spec',
    name: 'Mass Spectrometer',
    domain: 'chemistry',
    category: 'toxicology',
    tags: ['mass spec', 'spectrometry', 'analysis', 'identification', 'molecular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="16" width="48" height="32" rx="4"/>
      <path d="M16 40l4-8 4 16 4-20 4 12 4-4 4 8 4-12 4 8"/>
      <line x1="16" y1="40" x2="48" y2="40" stroke-dasharray="2 1"/>
      <rect x="12" y="20" width="8" height="4"/>
      <rect x="44" y="20" width="8" height="4"/>
    </svg>`
  },

  // ===========================================================================
  // DIGITAL FORENSICS
  // ===========================================================================
  {
    id: 'forensic-hard-drive',
    name: 'Hard Drive Analysis',
    domain: 'chemistry',
    category: 'digital',
    tags: ['hard drive', 'data', 'recovery', 'digital', 'storage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="16" width="48" height="32" rx="4"/>
      <circle cx="32" cy="32" r="12"/>
      <circle cx="32" cy="32" r="4"/>
      <circle cx="48" cy="40" r="3" fill="currentColor"/>
      <path d="M44 24h8"/>
      <path d="M44 28h8"/>
    </svg>`
  },
  {
    id: 'forensic-mobile-device',
    name: 'Mobile Device Forensics',
    domain: 'chemistry',
    category: 'digital',
    tags: ['mobile', 'phone', 'extraction', 'data', 'digital'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="4" width="32" height="56" rx="4"/>
      <rect x="20" y="12" width="24" height="36" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="20" y="12" width="24" height="36" rx="2"/>
      <circle cx="32" cy="54" r="3"/>
      <path d="M28 8h8"/>
      <path d="M24 20l4 4-4 4"/>
      <path d="M40 28l-4 4 4 4"/>
      <path d="M28 24h8" stroke-dasharray="2 1"/>
      <path d="M28 36h8" stroke-dasharray="2 1"/>
    </svg>`
  },
  {
    id: 'forensic-network',
    name: 'Network Forensics',
    domain: 'chemistry',
    category: 'digital',
    tags: ['network', 'cyber', 'traffic', 'analysis', 'intrusion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8"/>
      <circle cx="12" cy="16" r="6"/>
      <circle cx="52" cy="16" r="6"/>
      <circle cx="12" cy="48" r="6"/>
      <circle cx="52" cy="48" r="6"/>
      <path d="M18 20l8 8"/>
      <path d="M46 20l-8 8"/>
      <path d="M18 44l8-8"/>
      <path d="M46 44l-8-8"/>
      <path d="M12 22v20"/>
      <path d="M52 22v20"/>
    </svg>`
  },
  {
    id: 'forensic-magnifying',
    name: 'Forensic Magnification',
    domain: 'chemistry',
    category: 'analysis',
    tags: ['magnify', 'examine', 'detail', 'investigation', 'analysis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="28" cy="28" r="16"/>
      <circle cx="28" cy="28" r="12" fill="currentColor" opacity="0.1"/>
      <line x1="40" y1="40" x2="56" y2="56" stroke-width="4" stroke-linecap="round"/>
      <path d="M24 24c2-2 6-2 8 0"/>
      <path d="M24 32c2 2 6 2 8 0"/>
      <circle cx="22" cy="28" r="2" fill="currentColor"/>
      <circle cx="34" cy="28" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'forensic-autopsy',
    name: 'Autopsy',
    domain: 'chemistry',
    category: 'pathology',
    tags: ['autopsy', 'post-mortem', 'examination', 'cause of death', 'pathology'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="12" ry="8"/>
      <path d="M20 16v36c0 4 5.4 8 12 8s12-4 12-8V16"/>
      <line x1="32" y1="24" x2="32" y2="48"/>
      <line x1="24" y1="32" x2="40" y2="32"/>
      <circle cx="28" cy="12" r="2" fill="currentColor"/>
      <circle cx="36" cy="12" r="2" fill="currentColor"/>
    </svg>`
  },
];

export default forensicsIcons;
