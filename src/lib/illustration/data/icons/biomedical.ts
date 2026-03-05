/**
 * Biomedical Engineering Icon Library
 * Comprehensive SVG icons for biomedical engineering
 *
 * Categories:
 * - Prosthetics & Orthotics (limbs, joints, braces)
 * - Medical Imaging (MRI, CT, ultrasound, X-ray)
 * - Implants (cardiac, neural, orthopedic)
 * - Biosensors (glucose, ECG, EEG, pulse ox)
 * - Medical Devices (dialysis, ventilators, pumps)
 * - Tissue Engineering (scaffolds, bioreactors, cells)
 */

import type { IconDefinition } from './index';

export const biomedicalIcons: IconDefinition[] = [
  // ===========================================================================
  // PROSTHETICS & ORTHOTICS
  // ===========================================================================
  {
    id: 'biomed-prosthetic-leg',
    name: 'Prosthetic Leg',
    domain: 'engineering',
    category: 'prosthetics',
    tags: ['prosthetic', 'leg', 'limb', 'amputation', 'mobility'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="12" ry="6"/>
      <path d="M20 12v8c0 4 5.4 8 12 8s12-4 12-8v-8"/>
      <rect x="28" y="28" width="8" height="20" rx="2"/>
      <circle cx="32" cy="52" r="4"/>
      <path d="M28 52h-8c-2 0-4 2-4 4v4h32v-4c0-2-2-4-4-4h-8"/>
      <path d="M30 32h4"/>
      <path d="M30 40h4"/>
    </svg>`
  },
  {
    id: 'biomed-prosthetic-arm',
    name: 'Prosthetic Arm',
    domain: 'engineering',
    category: 'prosthetics',
    tags: ['prosthetic', 'arm', 'limb', 'hand', 'myoelectric'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="12" cy="20" rx="6" ry="10"/>
      <rect x="18" y="14" width="20" height="12" rx="2"/>
      <rect x="38" y="16" width="12" height="8" rx="2"/>
      <path d="M50 18v4"/>
      <path d="M54 16v4c0 2-2 4-4 4"/>
      <path d="M58 18v4c0 2-2 4-4 4"/>
      <path d="M54 28h4c2 0 4 2 4 4v4"/>
      <path d="M22 26v4"/>
      <path d="M30 26v4"/>
      <circle cx="26" cy="20" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'biomed-knee-brace',
    name: 'Knee Brace',
    domain: 'engineering',
    category: 'orthotics',
    tags: ['brace', 'knee', 'orthotic', 'support', 'joint'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v16l-4 8 4 8v16H24v-16l4-8-4-8z"/>
      <path d="M20 12h4"/>
      <path d="M40 12h4"/>
      <path d="M20 52h4"/>
      <path d="M40 52h4"/>
      <circle cx="32" cy="32" r="6"/>
      <path d="M28 32h8"/>
      <path d="M32 28v8"/>
      <path d="M24 24h16" stroke-dasharray="2 2"/>
      <path d="M24 40h16" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'biomed-exoskeleton',
    name: 'Exoskeleton',
    domain: 'engineering',
    category: 'prosthetics',
    tags: ['exoskeleton', 'robotic', 'assistance', 'mobility', 'powered'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v8H24z"/>
      <path d="M20 16h24v12H20z"/>
      <path d="M24 28v8"/>
      <path d="M40 28v8"/>
      <circle cx="24" cy="40" r="4"/>
      <circle cx="40" cy="40" r="4"/>
      <path d="M24 44v8"/>
      <path d="M40 44v8"/>
      <rect x="20" y="52" width="8" height="4"/>
      <rect x="36" y="52" width="8" height="4"/>
      <path d="M28 12h8"/>
      <circle cx="32" cy="22" r="3" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'biomed-hearing-aid',
    name: 'Hearing Aid',
    domain: 'engineering',
    category: 'prosthetics',
    tags: ['hearing', 'aid', 'cochlear', 'audio', 'assistive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 20c8-8 24-8 24 8v16c0 8-8 12-12 12"/>
      <path d="M32 56v4"/>
      <circle cx="32" cy="36" r="8"/>
      <circle cx="32" cy="36" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M44 28c4 0 8 4 8 8"/>
      <path d="M12 28c-4 0-8 4-8 8s4 8 8 8"/>
      <path d="M24 20c4-4 12-4 12 4"/>
    </svg>`
  },

  // ===========================================================================
  // MEDICAL IMAGING
  // ===========================================================================
  {
    id: 'biomed-mri-scanner',
    name: 'MRI Scanner',
    domain: 'engineering',
    category: 'imaging',
    tags: ['MRI', 'scanner', 'magnetic', 'resonance', 'imaging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <ellipse cx="32" cy="32" rx="16" ry="12"/>
      <path d="M4 32h12"/>
      <path d="M48 32h12"/>
      <rect x="20" y="28" width="24" height="8" fill="currentColor" opacity="0.1"/>
      <path d="M16 44v8h32v-8"/>
      <circle cx="24" cy="50" r="2"/>
      <circle cx="40" cy="50" r="2"/>
    </svg>`
  },
  {
    id: 'biomed-ct-scanner',
    name: 'CT Scanner',
    domain: 'engineering',
    category: 'imaging',
    tags: ['CT', 'scanner', 'computed', 'tomography', 'X-ray'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="20"/>
      <circle cx="32" cy="28" r="12"/>
      <path d="M32 8v-4"/>
      <path d="M32 48v8"/>
      <path d="M12 28H8"/>
      <path d="M56 28h-4"/>
      <rect x="24" y="56" width="16" height="4" rx="1"/>
      <path d="M20 24h24v8H20z" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="28" r="4"/>
    </svg>`
  },
  {
    id: 'biomed-ultrasound',
    name: 'Ultrasound Probe',
    domain: 'engineering',
    category: 'imaging',
    tags: ['ultrasound', 'probe', 'sonography', 'transducer', 'imaging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16c4 0 8 4 8 8v32c0 4-4 8-8 8H24c-4 0-8-4-8-8V16c0-4 4-8 8-8z"/>
      <ellipse cx="32" cy="48" rx="8" ry="4" fill="currentColor" opacity="0.3"/>
      <path d="M28 16h8"/>
      <circle cx="32" cy="28" r="6"/>
      <path d="M28 28h8"/>
      <path d="M32 24v8"/>
      <path d="M20 48c4-2 8-2 12 0s8 2 12 0"/>
    </svg>`
  },
  {
    id: 'biomed-xray',
    name: 'X-Ray Machine',
    domain: 'engineering',
    category: 'imaging',
    tags: ['X-ray', 'radiography', 'imaging', 'diagnostic', 'radiation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="16" rx="2"/>
      <path d="M32 24v8"/>
      <path d="M28 32l8 8"/>
      <path d="M36 32l-8 8"/>
      <rect x="12" y="44" width="40" height="16" rx="2"/>
      <circle cx="32" cy="16" r="4"/>
      <path d="M32 12v-4"/>
      <path d="M28 52h8"/>
      <path d="M28 56h8"/>
    </svg>`
  },
  {
    id: 'biomed-endoscope',
    name: 'Endoscope',
    domain: 'engineering',
    category: 'imaging',
    tags: ['endoscope', 'camera', 'minimally invasive', 'scope', 'visualization'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="48" r="8"/>
      <circle cx="16" cy="48" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M24 48h24c4 0 8-4 8-8V16"/>
      <path d="M56 16v-8h-8"/>
      <circle cx="52" cy="8" r="4"/>
      <path d="M36 48v8"/>
      <path d="M32 52h8"/>
      <path d="M56 24l-4 4"/>
    </svg>`
  },

  // ===========================================================================
  // IMPLANTS
  // ===========================================================================
  {
    id: 'biomed-pacemaker',
    name: 'Pacemaker',
    domain: 'engineering',
    category: 'implants',
    tags: ['pacemaker', 'cardiac', 'implant', 'rhythm', 'electrical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="24" rx="4"/>
      <path d="M24 20v-8c4-4 16-4 16 0v8"/>
      <path d="M40 12c4 0 8 4 8 8"/>
      <path d="M24 12c-4 0-8 4-8 8"/>
      <circle cx="32" cy="32" r="6"/>
      <path d="M29 32h6"/>
      <path d="M32 29v6"/>
      <path d="M20 40h8"/>
      <path d="M36 40h8"/>
    </svg>`
  },
  {
    id: 'biomed-cochlear-implant',
    name: 'Cochlear Implant',
    domain: 'engineering',
    category: 'implants',
    tags: ['cochlear', 'implant', 'hearing', 'neural', 'auditory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="24" r="12"/>
      <circle cx="20" cy="24" r="6" fill="currentColor" opacity="0.2"/>
      <path d="M32 24c8 0 12 8 12 16"/>
      <path d="M44 40c0 8-4 16-12 16"/>
      <path d="M32 56c-8 0-16-4-16-12"/>
      <path d="M16 44v-8"/>
      <circle cx="44" cy="40" r="4"/>
      <path d="M20 24h8" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'biomed-hip-implant',
    name: 'Hip Implant',
    domain: 'engineering',
    category: 'implants',
    tags: ['hip', 'implant', 'joint', 'replacement', 'orthopedic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="16" r="8"/>
      <path d="M28 24l-4 32"/>
      <path d="M36 24l4 32"/>
      <path d="M24 56h16"/>
      <ellipse cx="32" cy="16" rx="4" ry="4"/>
      <path d="M28 32h8"/>
      <path d="M27 44h10"/>
    </svg>`
  },
  {
    id: 'biomed-stent',
    name: 'Vascular Stent',
    domain: 'engineering',
    category: 'implants',
    tags: ['stent', 'vascular', 'coronary', 'implant', 'mesh'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="32" rx="4" ry="12"/>
      <ellipse cx="48" cy="32" rx="4" ry="12"/>
      <path d="M16 20h32"/>
      <path d="M16 44h32"/>
      <path d="M20 24l8 8-8 8"/>
      <path d="M28 24l8 8-8 8"/>
      <path d="M36 24l8 8-8 8"/>
      <path d="M20 24l8-4"/>
      <path d="M28 24l8-4"/>
      <path d="M36 24l8-4"/>
    </svg>`
  },
  {
    id: 'biomed-neural-implant',
    name: 'Neural Implant',
    domain: 'engineering',
    category: 'implants',
    tags: ['neural', 'implant', 'brain', 'electrode', 'interface'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="16" rx="2"/>
      <path d="M24 24v8"/>
      <path d="M32 24v12"/>
      <path d="M40 24v8"/>
      <circle cx="24" cy="36" r="2" fill="currentColor"/>
      <circle cx="32" cy="40" r="2" fill="currentColor"/>
      <circle cx="40" cy="36" r="2" fill="currentColor"/>
      <path d="M20 48c12-8 24 0 24 8"/>
      <path d="M16 48c16-12 32 0 32 12"/>
      <path d="M32 8v-4"/>
    </svg>`
  },

  // ===========================================================================
  // BIOSENSORS
  // ===========================================================================
  {
    id: 'biomed-glucose-sensor',
    name: 'Glucose Sensor',
    domain: 'engineering',
    category: 'biosensors',
    tags: ['glucose', 'sensor', 'diabetes', 'CGM', 'monitoring'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="16" ry="8"/>
      <path d="M16 24v16c0 4.4 7.2 8 16 8s16-3.6 16-8V24"/>
      <path d="M32 16v-8"/>
      <circle cx="32" cy="8" r="4"/>
      <path d="M24 32h16"/>
      <path d="M32 28v8"/>
      <text x="24" y="44" font-size="6" fill="currentColor" stroke="none">mg/dL</text>
    </svg>`
  },
  {
    id: 'biomed-ecg-electrode',
    name: 'ECG Electrode',
    domain: 'engineering',
    category: 'biosensors',
    tags: ['ECG', 'electrode', 'cardiac', 'monitoring', 'patch'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.2"/>
      <path d="M32 16v-8"/>
      <path d="M28 8h8"/>
      <path d="M20 28l6 4-3 8 6-4 6 4-3-8 6-4"/>
      <path d="M32 48v8"/>
    </svg>`
  },
  {
    id: 'biomed-pulse-oximeter',
    name: 'Pulse Oximeter',
    domain: 'engineering',
    category: 'biosensors',
    tags: ['pulse', 'oximeter', 'SpO2', 'oxygen', 'saturation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="24" width="32" height="24" rx="4"/>
      <path d="M16 32c-4 0-8 4-8 8s4 8 8 8"/>
      <path d="M48 32c4 0 8 4 8 8s-4 8-8 8"/>
      <rect x="20" y="28" width="24" height="12" rx="2" fill="currentColor" opacity="0.1"/>
      <text x="24" y="38" font-size="8" fill="currentColor" stroke="none">98%</text>
      <path d="M32 44v4"/>
    </svg>`
  },
  {
    id: 'biomed-eeg-cap',
    name: 'EEG Cap',
    domain: 'engineering',
    category: 'biosensors',
    tags: ['EEG', 'cap', 'brain', 'electrodes', 'neural'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 40c0-16 9-28 20-28s20 12 20 28"/>
      <path d="M12 40h40"/>
      <circle cx="20" cy="24" r="2" fill="currentColor"/>
      <circle cx="32" cy="16" r="2" fill="currentColor"/>
      <circle cx="44" cy="24" r="2" fill="currentColor"/>
      <circle cx="24" cy="32" r="2" fill="currentColor"/>
      <circle cx="40" cy="32" r="2" fill="currentColor"/>
      <path d="M20 24v16"/>
      <path d="M32 16v24"/>
      <path d="M44 24v16"/>
      <path d="M32 44v8"/>
    </svg>`
  },
  {
    id: 'biomed-blood-pressure',
    name: 'Blood Pressure Cuff',
    domain: 'engineering',
    category: 'biosensors',
    tags: ['blood pressure', 'cuff', 'sphygmomanometer', 'BP', 'monitoring'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="40" height="24" rx="4"/>
      <path d="M8 28h4"/>
      <path d="M8 36h4"/>
      <path d="M52 28h4"/>
      <path d="M52 36h4"/>
      <rect x="20" y="24" width="24" height="12" rx="2" fill="currentColor" opacity="0.1"/>
      <text x="22" y="34" font-size="6" fill="currentColor" stroke="none">120/80</text>
      <circle cx="32" cy="52" r="6"/>
      <path d="M32 44v2"/>
    </svg>`
  },

  // ===========================================================================
  // MEDICAL DEVICES
  // ===========================================================================
  {
    id: 'biomed-dialysis',
    name: 'Dialysis Machine',
    domain: 'engineering',
    category: 'devices',
    tags: ['dialysis', 'kidney', 'hemodialysis', 'filtration', 'blood'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="48" rx="4"/>
      <rect x="24" y="12" width="16" height="12" rx="2" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="36" r="8"/>
      <path d="M28 36c0-4 4-8 8-4"/>
      <path d="M36 36c0 4-4 8-8 4"/>
      <path d="M8 24h12"/>
      <path d="M44 24h12"/>
      <path d="M8 48h12"/>
      <path d="M44 48h12"/>
      <circle cx="8" cy="24" r="2"/>
      <circle cx="56" cy="48" r="2"/>
    </svg>`
  },
  {
    id: 'biomed-ventilator',
    name: 'Ventilator',
    domain: 'engineering',
    category: 'devices',
    tags: ['ventilator', 'breathing', 'respiratory', 'ICU', 'support'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="40" rx="4"/>
      <rect x="20" y="12" width="24" height="16" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M24 20c2-4 4-4 6 0s4 4 6 0"/>
      <circle cx="24" cy="36" r="4"/>
      <circle cx="40" cy="36" r="4"/>
      <path d="M32 48v8"/>
      <path d="M28 56c4 4 8 0 8 0"/>
      <path d="M8 20h8"/>
      <path d="M48 20h8"/>
    </svg>`
  },
  {
    id: 'biomed-infusion-pump',
    name: 'Infusion Pump',
    domain: 'engineering',
    category: 'devices',
    tags: ['infusion', 'pump', 'IV', 'medication', 'delivery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="12" width="32" height="40" rx="4"/>
      <rect x="20" y="16" width="24" height="12" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M32 8v4"/>
      <path d="M32 52v4"/>
      <rect x="24" y="32" width="16" height="16" rx="2"/>
      <path d="M28 36v8"/>
      <path d="M32 36v8"/>
      <path d="M36 36v8"/>
      <text x="24" y="24" font-size="6" fill="currentColor" stroke="none">mL/h</text>
    </svg>`
  },
  {
    id: 'biomed-defibrillator',
    name: 'Defibrillator',
    domain: 'engineering',
    category: 'devices',
    tags: ['defibrillator', 'AED', 'cardiac', 'shock', 'emergency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="4"/>
      <path d="M20 28l6 8-6 8"/>
      <path d="M44 28l-6 8 6 8"/>
      <path d="M32 24v16"/>
      <path d="M24 32h16"/>
      <circle cx="20" cy="52" r="2"/>
      <circle cx="44" cy="52" r="2"/>
      <path d="M20 54v4"/>
      <path d="M44 54v4"/>
      <rect x="28" y="12" width="8" height="4" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'biomed-surgical-robot',
    name: 'Surgical Robot',
    domain: 'engineering',
    category: 'devices',
    tags: ['surgical', 'robot', 'minimally invasive', 'precision', 'da Vinci'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="12" rx="2"/>
      <path d="M32 20v8"/>
      <circle cx="32" cy="32" r="4"/>
      <path d="M20 32h8"/>
      <path d="M36 32h8"/>
      <path d="M12 28l8 4"/>
      <path d="M52 28l-8 4"/>
      <path d="M12 28v20"/>
      <path d="M52 28v20"/>
      <path d="M8 48h8"/>
      <path d="M48 48h8"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
    </svg>`
  },

  // ===========================================================================
  // TISSUE ENGINEERING
  // ===========================================================================
  {
    id: 'biomed-scaffold',
    name: 'Tissue Scaffold',
    domain: 'engineering',
    category: 'tissue-engineering',
    tags: ['scaffold', 'tissue', 'engineering', 'matrix', '3D'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16h32v32H16z"/>
      <path d="M16 16l8-8h32v32l-8 8"/>
      <path d="M48 8v32"/>
      <path d="M16 48h32"/>
      <path d="M24 16v32"/>
      <path d="M32 16v32"/>
      <path d="M40 16v32"/>
      <path d="M16 24h32"/>
      <path d="M16 32h32"/>
      <path d="M16 40h32"/>
    </svg>`
  },
  {
    id: 'biomed-bioreactor',
    name: 'Bioreactor',
    domain: 'engineering',
    category: 'tissue-engineering',
    tags: ['bioreactor', 'cell culture', 'fermentation', 'growth', 'vessel'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="14" ry="6"/>
      <path d="M18 16v32c0 4 6.3 8 14 8s14-4 14-8V16"/>
      <path d="M32 10v-6"/>
      <path d="M32 16v24"/>
      <path d="M28 32l8-8"/>
      <path d="M36 32l-8-8"/>
      <path d="M10 28h8"/>
      <path d="M46 40h8"/>
      <circle cx="10" cy="28" r="2"/>
      <circle cx="54" cy="40" r="2"/>
      <path d="M22 44h20" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'biomed-cell-culture',
    name: 'Cell Culture Plate',
    domain: 'engineering',
    category: 'tissue-engineering',
    tags: ['cell', 'culture', 'plate', 'wells', 'petri'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4"/>
      <circle cx="20" cy="28" r="4"/>
      <circle cx="32" cy="28" r="4"/>
      <circle cx="44" cy="28" r="4"/>
      <circle cx="20" cy="40" r="4"/>
      <circle cx="32" cy="40" r="4"/>
      <circle cx="44" cy="40" r="4"/>
      <circle cx="20" cy="28" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="40" r="2" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'biomed-3d-bioprinter',
    name: '3D Bioprinter',
    domain: 'engineering',
    category: 'tissue-engineering',
    tags: ['bioprinter', '3D', 'printing', 'tissue', 'additive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <path d="M8 16h48"/>
      <path d="M32 16v-4"/>
      <rect x="24" y="20" width="16" height="8" rx="2"/>
      <path d="M32 28v8"/>
      <path d="M28 36l4 4 4-4"/>
      <rect x="16" y="44" width="32" height="8" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M20 48h24" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'biomed-organ-chip',
    name: 'Organ-on-a-Chip',
    domain: 'engineering',
    category: 'tissue-engineering',
    tags: ['organ', 'chip', 'microfluidic', 'model', 'testing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="40" height="24" rx="2"/>
      <path d="M12 28h8"/>
      <path d="M44 28h8"/>
      <path d="M12 36h8"/>
      <path d="M44 36h8"/>
      <rect x="24" y="24" width="16" height="16" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M20 28h4v8h16v-8h4"/>
      <circle cx="28" cy="32" r="2" fill="currentColor"/>
      <circle cx="36" cy="32" r="2" fill="currentColor"/>
      <path d="M28 32h8"/>
    </svg>`
  },

  // ===========================================================================
  // DRUG DELIVERY SYSTEMS
  // ===========================================================================
  {
    id: 'biomed-drug-pump',
    name: 'Implantable Drug Pump',
    domain: 'engineering',
    category: 'drug-delivery',
    tags: ['drug', 'pump', 'implant', 'infusion', 'delivery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="12" fill="currentColor" opacity="0.1"/>
      <path d="M32 20v-8"/>
      <path d="M28 12h8"/>
      <circle cx="32" cy="32" r="6"/>
      <path d="M32 26v12"/>
      <path d="M26 32h12"/>
      <path d="M24 44l-4 8"/>
      <path d="M40 44l4 8"/>
    </svg>`
  },
  {
    id: 'biomed-transdermal-patch',
    name: 'Transdermal Patch',
    domain: 'engineering',
    category: 'drug-delivery',
    tags: ['transdermal', 'patch', 'drug', 'skin', 'delivery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="40" height="24" rx="8"/>
      <rect x="16" y="24" width="32" height="16" rx="4" fill="currentColor" opacity="0.1"/>
      <path d="M24 32h4"/>
      <path d="M32 32h4"/>
      <path d="M40 32h4"/>
      <path d="M24 28v8"/>
      <path d="M32 26v12"/>
      <path d="M40 28v8"/>
      <path d="M12 48c8-4 16-4 24 0s16 4 24 0"/>
    </svg>`
  },
  {
    id: 'biomed-nanoparticle',
    name: 'Nanoparticle Carrier',
    domain: 'engineering',
    category: 'drug-delivery',
    tags: ['nanoparticle', 'carrier', 'drug', 'targeted', 'delivery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="24" cy="24" r="2" fill="currentColor"/>
      <circle cx="40" cy="24" r="2" fill="currentColor"/>
      <circle cx="24" cy="40" r="2" fill="currentColor"/>
      <circle cx="40" cy="40" r="2" fill="currentColor"/>
      <path d="M32 16v-8"/>
      <path d="M48 32h8"/>
      <path d="M32 48v8"/>
      <path d="M16 32h-8"/>
      <circle cx="32" cy="8" r="2"/>
      <circle cx="56" cy="32" r="2"/>
      <circle cx="32" cy="56" r="2"/>
      <circle cx="8" cy="32" r="2"/>
    </svg>`
  },
  {
    id: 'biomed-microneedle',
    name: 'Microneedle Array',
    domain: 'engineering',
    category: 'drug-delivery',
    tags: ['microneedle', 'array', 'transdermal', 'vaccine', 'delivery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="12" rx="2"/>
      <path d="M16 20v8l4 8"/>
      <path d="M24 20v8l4 8"/>
      <path d="M32 20v8l4 8"/>
      <path d="M40 20v8l4 8"/>
      <path d="M48 20v8l-4 8"/>
      <circle cx="20" cy="40" r="2" fill="currentColor"/>
      <circle cx="28" cy="40" r="2" fill="currentColor"/>
      <circle cx="36" cy="40" r="2" fill="currentColor"/>
      <circle cx="44" cy="40" r="2" fill="currentColor"/>
      <path d="M8 52c12-8 24-8 48 0"/>
    </svg>`
  },
  {
    id: 'biomed-liposome',
    name: 'Liposome',
    domain: 'engineering',
    category: 'drug-delivery',
    tags: ['liposome', 'vesicle', 'drug', 'encapsulation', 'delivery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="16" stroke-dasharray="4 2"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="28" cy="28" r="2"/>
      <circle cx="36" cy="28" r="2"/>
      <circle cx="32" cy="36" r="2"/>
      <path d="M24 20c-2-4 2-8 4-4"/>
      <path d="M40 20c2-4-2-8-4-4"/>
      <path d="M44 36c4 0 4-4 0-4"/>
      <path d="M20 36c-4 0-4-4 0-4"/>
    </svg>`
  },
  {
    id: 'biomed-insulin-pen',
    name: 'Insulin Delivery Pen',
    domain: 'engineering',
    category: 'drug-delivery',
    tags: ['insulin', 'pen', 'injection', 'diabetes', 'delivery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="28" width="40" height="8" rx="2"/>
      <path d="M48 32h8l4 4v-8l-4 4"/>
      <path d="M8 32h-4"/>
      <circle cx="16" cy="32" r="2"/>
      <circle cx="24" cy="32" r="2"/>
      <path d="M32 28v8"/>
      <path d="M40 28v8"/>
      <rect x="12" y="24" width="8" height="4" rx="1"/>
      <text x="14" y="21" font-size="6" fill="currentColor" stroke="none">U</text>
    </svg>`
  },

  // ===========================================================================
  // REHABILITATION ENGINEERING
  // ===========================================================================
  {
    id: 'biomed-wheelchair',
    name: 'Power Wheelchair',
    domain: 'engineering',
    category: 'rehabilitation',
    tags: ['wheelchair', 'power', 'mobility', 'assistive', 'rehab'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="48" r="10"/>
      <circle cx="20" cy="48" r="6"/>
      <circle cx="48" cy="48" r="6"/>
      <path d="M16 20h24v16H16z"/>
      <path d="M40 20v20c0 4 4 8 8 8"/>
      <path d="M16 36h-4v8c0 2 2 4 4 4h4"/>
      <circle cx="26" cy="12" r="6"/>
      <path d="M32 20v-4h8"/>
    </svg>`
  },
  {
    id: 'biomed-walker',
    name: 'Assistive Walker',
    domain: 'engineering',
    category: 'rehabilitation',
    tags: ['walker', 'mobility', 'assistive', 'gait', 'rehab'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8v40"/>
      <path d="M48 8v40"/>
      <path d="M16 8h32"/>
      <path d="M16 24h32"/>
      <circle cx="16" cy="52" r="4"/>
      <circle cx="48" cy="52" r="4"/>
      <path d="M20 16h8"/>
      <path d="M36 16h8"/>
      <path d="M24 24v8"/>
      <path d="M40 24v8"/>
    </svg>`
  },
  {
    id: 'biomed-crutch',
    name: 'Smart Crutch',
    domain: 'engineering',
    category: 'rehabilitation',
    tags: ['crutch', 'mobility', 'smart', 'sensor', 'rehab'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16"/>
      <path d="M28 8v20"/>
      <path d="M36 8v20"/>
      <path d="M24 28h16"/>
      <path d="M32 28v24"/>
      <circle cx="32" cy="56" r="4"/>
      <rect x="28" y="32" width="8" height="8" rx="1" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="36" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'biomed-rehab-robot',
    name: 'Rehabilitation Robot',
    domain: 'engineering',
    category: 'rehabilitation',
    tags: ['robot', 'rehabilitation', 'therapy', 'motor', 'recovery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="20" height="16" rx="2"/>
      <path d="M28 16h8"/>
      <circle cx="44" cy="16" r="8"/>
      <path d="M44 8v16"/>
      <path d="M36 16h-8"/>
      <path d="M44 24v8"/>
      <path d="M40 32h8"/>
      <rect x="36" y="36" width="16" height="20" rx="2"/>
      <path d="M40 44h8"/>
      <path d="M40 52h8"/>
      <circle cx="18" cy="16" r="3" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'biomed-fes-device',
    name: 'FES Device',
    domain: 'engineering',
    category: 'rehabilitation',
    tags: ['FES', 'functional electrical stimulation', 'neuromuscular', 'rehab'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="20" rx="4"/>
      <rect x="20" y="12" width="24" height="8" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M24 28v8"/>
      <path d="M40 28v8"/>
      <circle cx="24" cy="40" r="4"/>
      <circle cx="40" cy="40" r="4"/>
      <path d="M24 44v8"/>
      <path d="M40 44v8"/>
      <path d="M20 52h8"/>
      <path d="M36 52h8"/>
      <path d="M26 16l4-2-4 4 4-2"/>
    </svg>`
  },
  {
    id: 'biomed-ankle-foot-orthosis',
    name: 'Ankle-Foot Orthosis',
    domain: 'engineering',
    category: 'rehabilitation',
    tags: ['AFO', 'ankle', 'foot', 'orthosis', 'brace'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h12v24l-4 8v12H20v-8l4-12z"/>
      <path d="M20 52h24c4 0 8 4 8 8H12c0-4 4-8 8-8z"/>
      <path d="M28 16h4"/>
      <path d="M28 24h4"/>
      <circle cx="30" cy="36" r="4"/>
      <path d="M26 36h8"/>
      <path d="M30 32v8"/>
    </svg>`
  },

  // ===========================================================================
  // WEARABLE DEVICES
  // ===========================================================================
  {
    id: 'biomed-smartwatch-health',
    name: 'Health Smartwatch',
    domain: 'engineering',
    category: 'wearables',
    tags: ['smartwatch', 'health', 'wearable', 'monitoring', 'fitness'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="12" width="24" height="40" rx="4"/>
      <rect x="24" y="20" width="16" height="16" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M28 28l4 4 6-6"/>
      <path d="M24 40h16"/>
      <path d="M28 8h8v4h-8z"/>
      <path d="M28 52h8v4h-8z"/>
      <path d="M28 44l2 2 2-2 2 2 2-2"/>
    </svg>`
  },
  {
    id: 'biomed-fitness-band',
    name: 'Fitness Band',
    domain: 'engineering',
    category: 'wearables',
    tags: ['fitness', 'band', 'activity', 'tracker', 'wearable'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="48" rx="8"/>
      <rect x="28" y="20" width="8" height="12" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M30 24l2 2 4-4"/>
      <circle cx="32" cy="40" r="2" fill="currentColor"/>
      <path d="M28 44h8"/>
      <path d="M28 48h8"/>
    </svg>`
  },
  {
    id: 'biomed-holter-monitor',
    name: 'Holter Monitor',
    domain: 'engineering',
    category: 'wearables',
    tags: ['holter', 'monitor', 'ECG', 'cardiac', 'wearable'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="24" rx="4"/>
      <rect x="20" y="20" width="24" height="12" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M24 26l4-4 4 8 4-4 4 4"/>
      <circle cx="24" cy="36" r="2"/>
      <circle cx="32" cy="36" r="2"/>
      <circle cx="40" cy="36" r="2"/>
      <path d="M24 40v8"/>
      <path d="M32 40v12"/>
      <path d="M40 40v8"/>
      <circle cx="24" cy="52" r="3"/>
      <circle cx="40" cy="52" r="3"/>
    </svg>`
  },
  {
    id: 'biomed-eeg-headband',
    name: 'EEG Headband',
    domain: 'engineering',
    category: 'wearables',
    tags: ['EEG', 'headband', 'brain', 'neural', 'wearable'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-12 10.7-20 24-20s24 8 24 20"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
      <rect x="12" y="28" width="8" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="44" y="28" width="8" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <circle cx="24" cy="20" r="3" fill="currentColor"/>
      <circle cx="32" cy="16" r="3" fill="currentColor"/>
      <circle cx="40" cy="20" r="3" fill="currentColor"/>
      <path d="M24 23v4"/>
      <path d="M32 19v4"/>
      <path d="M40 23v4"/>
    </svg>`
  },
  {
    id: 'biomed-smart-ring',
    name: 'Smart Health Ring',
    domain: 'engineering',
    category: 'wearables',
    tags: ['ring', 'smart', 'health', 'sleep', 'wearable'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="12"/>
      <ellipse cx="32" cy="32" rx="12" ry="6"/>
      <path d="M32 20v-8"/>
      <path d="M28 22l-4-6"/>
      <path d="M36 22l4-6"/>
      <circle cx="24" cy="32" r="2" fill="currentColor"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <circle cx="40" cy="32" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'biomed-sleep-tracker',
    name: 'Sleep Tracker',
    domain: 'engineering',
    category: 'wearables',
    tags: ['sleep', 'tracker', 'monitor', 'rest', 'wearable'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="40" height="24" rx="4"/>
      <rect x="16" y="24" width="20" height="16" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M20 32c2-4 6-4 8 0s6 4 8 0"/>
      <circle cx="44" cy="28" r="4"/>
      <path d="M42 34h4"/>
      <path d="M42 38h4"/>
      <path d="M32 12l4-4 4 4"/>
      <path d="M36 8v4"/>
    </svg>`
  },

  // ===========================================================================
  // BIOMATERIALS
  // ===========================================================================
  {
    id: 'biomed-material-testing',
    name: 'Material Testing',
    domain: 'engineering',
    category: 'biomaterials',
    tags: ['material', 'testing', 'mechanical', 'tensile', 'analysis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="8" rx="2"/>
      <rect x="24" y="48" width="16" height="8" rx="2"/>
      <path d="M28 16v32"/>
      <path d="M36 16v32"/>
      <path d="M32 8v-4"/>
      <path d="M32 56v4"/>
      <path d="M28 4h8"/>
      <path d="M28 60h8"/>
      <path d="M20 24l8-4"/>
      <path d="M36 20l8 4"/>
      <path d="M20 40l8 4"/>
      <path d="M36 44l8-4"/>
    </svg>`
  },
  {
    id: 'biomed-polymer-scaffold',
    name: 'Polymer Scaffold',
    domain: 'engineering',
    category: 'biomaterials',
    tags: ['polymer', 'scaffold', 'biodegradable', 'PLA', 'PLGA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="12" width="40" height="40" rx="4"/>
      <path d="M12 24h40"/>
      <path d="M12 36h40"/>
      <path d="M12 48h40"/>
      <path d="M24 12v40"/>
      <path d="M36 12v40"/>
      <path d="M48 12v4"/>
      <circle cx="18" cy="18" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="42" cy="42" r="2" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'biomed-hydrogel',
    name: 'Hydrogel',
    domain: 'engineering',
    category: 'biomaterials',
    tags: ['hydrogel', 'gel', 'swelling', 'water', 'biomaterial'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="20" ry="12" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="40" rx="20" ry="12"/>
      <path d="M20 32c4-8 12-12 12-12s8 4 12 12"/>
      <circle cx="24" cy="36" r="2"/>
      <circle cx="32" cy="34" r="2"/>
      <circle cx="40" cy="36" r="2"/>
      <circle cx="28" cy="42" r="2"/>
      <circle cx="36" cy="42" r="2"/>
      <path d="M32 16v-8"/>
      <path d="M28 10h8"/>
    </svg>`
  },
  {
    id: 'biomed-ceramic-implant',
    name: 'Ceramic Implant',
    domain: 'engineering',
    category: 'biomaterials',
    tags: ['ceramic', 'implant', 'HAp', 'bone', 'biomaterial'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16l8 16v24l-8 8H24l-8-8V24z"/>
      <path d="M24 8l-8 16"/>
      <path d="M40 8l8 16"/>
      <path d="M16 48l8 8"/>
      <path d="M48 48l-8 8"/>
      <path d="M16 24h32"/>
      <path d="M16 36h32"/>
      <path d="M16 48h32"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.2"/>
    </svg>`
  },
  {
    id: 'biomed-biocompatibility',
    name: 'Biocompatibility Test',
    domain: 'engineering',
    category: 'biomaterials',
    tags: ['biocompatibility', 'test', 'cytocompatibility', 'ISO 10993'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="12"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M32 12v-8"/>
      <path d="M32 56v4"/>
      <path d="M12 32h-8"/>
      <path d="M56 32h4"/>
      <circle cx="24" cy="24" r="3"/>
      <circle cx="40" cy="24" r="3"/>
      <circle cx="24" cy="40" r="3"/>
      <circle cx="40" cy="40" r="3"/>
      <path d="M27 24l10 16"/>
      <path d="M37 24l-10 16"/>
    </svg>`
  },

  // ===========================================================================
  // SURGICAL AND DIAGNOSTIC EQUIPMENT
  // ===========================================================================
  {
    id: 'biomed-surgical-laser',
    name: 'Surgical Laser',
    domain: 'engineering',
    category: 'surgical',
    tags: ['laser', 'surgical', 'cutting', 'ablation', 'precision'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="24" height="16" rx="2"/>
      <path d="M36 28h16"/>
      <circle cx="56" cy="28" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M52 28l8 16"/>
      <path d="M52 28l8-16"/>
      <path d="M56 28l8 8"/>
      <path d="M56 28l8-8"/>
      <circle cx="20" cy="28" r="4"/>
      <path d="M12 40v8"/>
      <path d="M36 40v8"/>
    </svg>`
  },
  {
    id: 'biomed-robotic-surgery',
    name: 'Robotic Surgery System',
    domain: 'engineering',
    category: 'surgical',
    tags: ['robotic', 'surgery', 'minimally invasive', 'da Vinci', 'precision'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="8" rx="2"/>
      <path d="M32 16v8"/>
      <path d="M24 24h16"/>
      <path d="M20 24l-8 16"/>
      <path d="M44 24l8 16"/>
      <path d="M12 40v16"/>
      <path d="M52 40v16"/>
      <circle cx="12" cy="56" r="4"/>
      <circle cx="52" cy="56" r="4"/>
      <rect x="28" y="28" width="8" height="12" rx="1"/>
      <path d="M32 40v8"/>
      <path d="M28 48h8"/>
    </svg>`
  },
  {
    id: 'biomed-electrosurgical',
    name: 'Electrosurgical Unit',
    domain: 'engineering',
    category: 'surgical',
    tags: ['electrosurgical', 'ESU', 'cautery', 'cutting', 'coagulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="4"/>
      <rect x="16" y="20" width="20" height="12" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M40 20v12"/>
      <path d="M44 20v12"/>
      <path d="M48 20v12"/>
      <circle cx="24" cy="40" r="3"/>
      <circle cx="36" cy="40" r="3"/>
      <path d="M24 44v8"/>
      <path d="M36 44v8"/>
      <path d="M20 26l4 2-4 4"/>
    </svg>`
  },
  {
    id: 'biomed-patient-monitor',
    name: 'Multi-Parameter Monitor',
    domain: 'engineering',
    category: 'diagnostic',
    tags: ['monitor', 'vital signs', 'ECG', 'SpO2', 'diagnostic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="36" rx="4"/>
      <rect x="12" y="12" width="40" height="24" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M16 24l6-8 6 16 6-8 6 8 4-8"/>
      <path d="M8 48h48"/>
      <path d="M16 52h8"/>
      <path d="M28 52h8"/>
      <path d="M40 52h8"/>
      <text x="16" y="20" font-size="4" fill="currentColor" stroke="none">ECG</text>
    </svg>`
  },
  {
    id: 'biomed-blood-analyzer',
    name: 'Blood Analyzer',
    domain: 'engineering',
    category: 'diagnostic',
    tags: ['blood', 'analyzer', 'hematology', 'CBC', 'diagnostic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="12" width="40" height="40" rx="4"/>
      <rect x="16" y="16" width="24" height="16" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M44 16v16"/>
      <path d="M48 24h-4"/>
      <path d="M16 36h32"/>
      <circle cx="24" cy="44" r="4"/>
      <circle cx="40" cy="44" r="4"/>
      <path d="M20 44h-4v8"/>
      <path d="M44 44h4v8"/>
      <path d="M24 8v4"/>
      <path d="M32 8v4"/>
      <path d="M40 8v4"/>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL PROSTHETICS
  // ===========================================================================
  {
    id: 'biomed-bionic-hand',
    name: 'Bionic Hand',
    domain: 'engineering',
    category: 'prosthetics',
    tags: ['bionic', 'hand', 'prosthetic', 'myoelectric', 'dexterous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="36" width="16" height="16" rx="2"/>
      <path d="M24 40v-24c0-4 4-8 8-8s8 4 8 8v24"/>
      <path d="M28 24v-8c0-2 2-4 4-4s4 2 4 4v8"/>
      <path d="M16 28c-4 0-4 8 0 8h8"/>
      <path d="M48 28c4 0 4 8 0 8h-8"/>
      <circle cx="32" cy="44" r="4" fill="currentColor" opacity="0.2"/>
      <path d="M24 52v4"/>
      <path d="M40 52v4"/>
    </svg>`
  },
  {
    id: 'biomed-prosthetic-foot',
    name: 'Prosthetic Foot',
    domain: 'engineering',
    category: 'prosthetics',
    tags: ['prosthetic', 'foot', 'carbon fiber', 'running', 'blade'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 8h8v12"/>
      <path d="M28 20c-4 0-8 4-8 8v8c0 8 4 16 12 20"/>
      <path d="M36 20c4 0 8 4 8 8v8c0 8-4 16-12 20"/>
      <path d="M32 56c-8 4-16 4-16-4"/>
      <path d="M32 56c8 4 16 4 16-4"/>
      <circle cx="32" cy="32" r="4"/>
      <path d="M28 32h8"/>
      <path d="M32 28v8"/>
    </svg>`
  },
  {
    id: 'biomed-osseointegrated',
    name: 'Osseointegrated Implant',
    domain: 'engineering',
    category: 'prosthetics',
    tags: ['osseointegration', 'implant', 'bone', 'anchor', 'prosthetic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v8l-4 4v8l4 4v8l-4 4v8H24v-8l4-4v-8l-4-4v-8l4-4v-8z"/>
      <path d="M20 16c-4 4-4 12 0 16"/>
      <path d="M44 16c4 4 4 12 0 16"/>
      <path d="M20 32c-4 4-4 12 0 16"/>
      <path d="M44 32c4 4 4 12 0 16"/>
      <path d="M28 20h8"/>
      <path d="M28 36h8"/>
      <path d="M28 52h8"/>
    </svg>`
  },
  {
    id: 'biomed-eye-prosthesis',
    name: 'Ocular Prosthesis',
    domain: 'engineering',
    category: 'prosthetics',
    tags: ['eye', 'ocular', 'prosthesis', 'artificial', 'vision'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <circle cx="32" cy="32" r="10"/>
      <circle cx="32" cy="32" r="5" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <path d="M12 32c4-8 12-16 20-16s16 8 20 16"/>
      <path d="M12 32c4 8 12 16 20 16s16-8 20-16"/>
      <circle cx="28" cy="28" r="2" fill="currentColor" opacity="0.2"/>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL BIOSENSORS
  // ===========================================================================
  {
    id: 'biomed-lactate-sensor',
    name: 'Lactate Sensor',
    domain: 'engineering',
    category: 'biosensors',
    tags: ['lactate', 'sensor', 'exercise', 'metabolism', 'monitoring'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="4"/>
      <circle cx="32" cy="32" r="10"/>
      <circle cx="32" cy="32" r="5" fill="currentColor" opacity="0.2"/>
      <path d="M32 22v-6"/>
      <path d="M32 42v6"/>
      <path d="M22 32h-6"/>
      <path d="M42 32h6"/>
      <text x="28" y="35" font-size="6" fill="currentColor" stroke="none">La</text>
    </svg>`
  },
  {
    id: 'biomed-sweat-sensor',
    name: 'Sweat Sensor',
    domain: 'engineering',
    category: 'biosensors',
    tags: ['sweat', 'sensor', 'electrolyte', 'wearable', 'monitoring'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="24" width="40" height="24" rx="4"/>
      <path d="M20 24v-8c0-4 4-8 12-8s12 4 12 8v8"/>
      <rect x="16" y="28" width="32" height="12" rx="2" fill="currentColor" opacity="0.1"/>
      <circle cx="24" cy="34" r="3"/>
      <circle cx="32" cy="34" r="3"/>
      <circle cx="40" cy="34" r="3"/>
      <path d="M20 44v4"/>
      <path d="M32 44v4"/>
      <path d="M44 44v4"/>
    </svg>`
  },
  {
    id: 'biomed-temperature-sensor',
    name: 'Body Temperature Sensor',
    domain: 'engineering',
    category: 'biosensors',
    tags: ['temperature', 'sensor', 'thermometer', 'fever', 'monitoring'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 8h8v32c4 4 4 12-4 16s-12-4-8-12z"/>
      <circle cx="32" cy="48" r="8"/>
      <circle cx="32" cy="48" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M32 16v24"/>
      <path d="M40 16h4"/>
      <path d="M40 24h4"/>
      <path d="M40 32h4"/>
    </svg>`
  },
  {
    id: 'biomed-pressure-sensor',
    name: 'Pressure Sensor',
    domain: 'engineering',
    category: 'biosensors',
    tags: ['pressure', 'sensor', 'force', 'tactile', 'monitoring'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="24" width="32" height="24" rx="4"/>
      <rect x="20" y="28" width="24" height="16" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M28 8l4 8 4-8"/>
      <path d="M32 16v8"/>
      <circle cx="32" cy="36" r="6"/>
      <path d="M29 33l6 6"/>
      <path d="M35 33l-6 6"/>
      <path d="M24 52h16"/>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL IMAGING
  // ===========================================================================
  {
    id: 'biomed-pet-scanner',
    name: 'PET Scanner',
    domain: 'engineering',
    category: 'imaging',
    tags: ['PET', 'scanner', 'positron', 'emission', 'nuclear'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="20"/>
      <circle cx="32" cy="28" r="12"/>
      <circle cx="32" cy="28" r="4" fill="currentColor" opacity="0.3"/>
      <rect x="24" y="48" width="16" height="8" rx="2"/>
      <path d="M20 24h24v8H20z" fill="currentColor" opacity="0.1"/>
      <path d="M32 8v-4"/>
      <path d="M48 12l4-4"/>
      <path d="M52 28h4"/>
      <path d="M12 28h-4"/>
      <path d="M16 12l-4-4"/>
    </svg>`
  },
  {
    id: 'biomed-oct-device',
    name: 'OCT Device',
    domain: 'engineering',
    category: 'imaging',
    tags: ['OCT', 'optical coherence', 'tomography', 'imaging', 'retinal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="32" height="24" rx="4"/>
      <rect x="12" y="24" width="24" height="16" rx="2" fill="currentColor" opacity="0.1"/>
      <path d="M40 32h16"/>
      <circle cx="56" cy="32" r="4"/>
      <path d="M56 28v8"/>
      <path d="M52 32h8"/>
      <path d="M16 28l6 4-6 4"/>
      <path d="M28 28l6 4-6 4"/>
    </svg>`
  },
  {
    id: 'biomed-fluoroscopy',
    name: 'Fluoroscopy System',
    domain: 'engineering',
    category: 'imaging',
    tags: ['fluoroscopy', 'X-ray', 'real-time', 'imaging', 'interventional'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="12" rx="2"/>
      <path d="M32 20v8"/>
      <path d="M28 28h8"/>
      <rect x="12" y="36" width="40" height="20" rx="2"/>
      <rect x="16" y="40" width="32" height="12" rx="1" fill="currentColor" opacity="0.1"/>
      <path d="M24 46l8-4 8 4"/>
      <circle cx="32" cy="14" r="4" fill="currentColor" opacity="0.3"/>
    </svg>`
  },

  // ===========================================================================
  // LAB-ON-CHIP AND MICROFLUIDICS
  // ===========================================================================
  {
    id: 'biomed-microfluidic-chip',
    name: 'Microfluidic Chip',
    domain: 'engineering',
    category: 'microfluidics',
    tags: ['microfluidic', 'chip', 'channel', 'mixing', 'lab-on-chip'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4"/>
      <path d="M12 28h8c4 0 4 8 8 8h12c4 0 4-8 8-8h8"/>
      <circle cx="12" cy="28" r="3" fill="currentColor"/>
      <circle cx="52" cy="28" r="3"/>
      <circle cx="32" cy="36" r="4" fill="currentColor" opacity="0.2"/>
      <path d="M24 20v8"/>
      <path d="M40 20v8"/>
      <path d="M24 36v8"/>
      <path d="M40 36v8"/>
    </svg>`
  },
  {
    id: 'biomed-droplet-generator',
    name: 'Droplet Generator',
    domain: 'engineering',
    category: 'microfluidics',
    tags: ['droplet', 'generator', 'microfluidic', 'emulsion', 'encapsulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" rx="2"/>
      <path d="M8 32h12"/>
      <path d="M44 32h12"/>
      <path d="M8 28h8"/>
      <path d="M8 36h8"/>
      <circle cx="28" cy="32" r="4"/>
      <circle cx="36" cy="32" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="44" cy="32" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="50" cy="32" r="2" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'biomed-pcr-chip',
    name: 'PCR Chip',
    domain: 'engineering',
    category: 'microfluidics',
    tags: ['PCR', 'chip', 'DNA', 'amplification', 'diagnostics'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="12" width="40" height="40" rx="4"/>
      <path d="M12 24h40"/>
      <path d="M12 36h40"/>
      <path d="M24 12v40"/>
      <path d="M40 12v40"/>
      <circle cx="18" cy="18" r="3" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="18" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="46" cy="18" r="3" fill="currentColor" opacity="0.2"/>
      <circle cx="18" cy="30" r="3"/>
      <circle cx="32" cy="30" r="3"/>
      <circle cx="46" cy="30" r="3"/>
      <circle cx="18" cy="42" r="3"/>
      <circle cx="32" cy="42" r="3"/>
      <circle cx="46" cy="42" r="3"/>
    </svg>`
  },
  {
    id: 'biomed-cell-sorter',
    name: 'Cell Sorter Chip',
    domain: 'engineering',
    category: 'microfluidics',
    tags: ['cell', 'sorter', 'FACS', 'microfluidic', 'separation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4"/>
      <path d="M8 32h16"/>
      <path d="M24 32v-8h16v16"/>
      <path d="M40 40h16"/>
      <path d="M40 24h16"/>
      <circle cx="20" cy="32" r="2" fill="currentColor"/>
      <circle cx="32" cy="28" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="36" r="2" fill="currentColor"/>
      <circle cx="48" cy="24" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="48" cy="40" r="2" fill="currentColor"/>
    </svg>`
  },

  // ===========================================================================
  // NEURAL AND BRAIN INTERFACES
  // ===========================================================================
  {
    id: 'biomed-electrode-array',
    name: 'Microelectrode Array',
    domain: 'engineering',
    category: 'neural',
    tags: ['electrode', 'array', 'neural', 'recording', 'MEA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="12" width="40" height="40" rx="4"/>
      <circle cx="20" cy="20" r="2" fill="currentColor"/>
      <circle cx="32" cy="20" r="2" fill="currentColor"/>
      <circle cx="44" cy="20" r="2" fill="currentColor"/>
      <circle cx="20" cy="32" r="2" fill="currentColor"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <circle cx="44" cy="32" r="2" fill="currentColor"/>
      <circle cx="20" cy="44" r="2" fill="currentColor"/>
      <circle cx="32" cy="44" r="2" fill="currentColor"/>
      <circle cx="44" cy="44" r="2" fill="currentColor"/>
      <path d="M8 20h4"/>
      <path d="M8 32h4"/>
      <path d="M8 44h4"/>
      <path d="M52 20h4"/>
      <path d="M52 32h4"/>
      <path d="M52 44h4"/>
    </svg>`
  },
  {
    id: 'biomed-utah-array',
    name: 'Utah Array',
    domain: 'engineering',
    category: 'neural',
    tags: ['utah', 'array', 'intracortical', 'electrode', 'BCI'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="32" width="32" height="8" rx="2"/>
      <path d="M20 32v-16"/>
      <path d="M28 32v-20"/>
      <path d="M36 32v-20"/>
      <path d="M44 32v-16"/>
      <circle cx="20" cy="12" r="2" fill="currentColor"/>
      <circle cx="28" cy="8" r="2" fill="currentColor"/>
      <circle cx="36" cy="8" r="2" fill="currentColor"/>
      <circle cx="44" cy="12" r="2" fill="currentColor"/>
      <path d="M16 40h32"/>
      <path d="M24 44v8"/>
      <path d="M40 44v8"/>
      <path d="M20 52h24"/>
    </svg>`
  },
  {
    id: 'biomed-nerve-cuff',
    name: 'Nerve Cuff Electrode',
    domain: 'engineering',
    category: 'neural',
    tags: ['nerve', 'cuff', 'electrode', 'peripheral', 'stimulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="12" ry="20"/>
      <ellipse cx="32" cy="32" rx="8" ry="16" fill="currentColor" opacity="0.1"/>
      <path d="M8 32h12"/>
      <path d="M44 32h12"/>
      <circle cx="28" cy="20" r="2" fill="currentColor"/>
      <circle cx="36" cy="20" r="2" fill="currentColor"/>
      <circle cx="28" cy="44" r="2" fill="currentColor"/>
      <circle cx="36" cy="44" r="2" fill="currentColor"/>
      <path d="M28 22v20"/>
      <path d="M36 22v20"/>
    </svg>`
  },
  {
    id: 'biomed-optogenetic-probe',
    name: 'Optogenetic Probe',
    domain: 'engineering',
    category: 'neural',
    tags: ['optogenetic', 'probe', 'light', 'neural', 'modulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="28" y="8" width="8" height="40" rx="2"/>
      <path d="M28 48l4 8 4-8"/>
      <circle cx="32" cy="52" r="2" fill="currentColor" opacity="0.3"/>
      <path d="M24 16h-8"/>
      <path d="M40 16h8"/>
      <path d="M24 24h-8"/>
      <path d="M40 24h8"/>
      <path d="M24 32h-8"/>
      <path d="M40 32h8"/>
      <circle cx="32" cy="16" r="2" fill="currentColor"/>
      <circle cx="32" cy="24" r="2" fill="currentColor"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL MEDICAL DEVICES
  // ===========================================================================
  {
    id: 'biomed-drug-eluting-stent',
    name: 'Drug-Eluting Stent',
    domain: 'engineering',
    category: 'implants',
    tags: ['stent', 'drug-eluting', 'coronary', 'vascular', 'implant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="12" cy="32" rx="4" ry="12"/>
      <ellipse cx="52" cy="32" rx="4" ry="12"/>
      <path d="M12 20h40"/>
      <path d="M12 44h40"/>
      <path d="M16 24l8 8-8 8"/>
      <path d="M28 24l8 8-8 8"/>
      <path d="M40 24l8 8-8 8"/>
      <circle cx="24" cy="28" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="36" cy="36" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="48" cy="28" r="2" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'biomed-heart-valve',
    name: 'Prosthetic Heart Valve',
    domain: 'engineering',
    category: 'implants',
    tags: ['heart', 'valve', 'prosthetic', 'mechanical', 'bioprosthetic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="12"/>
      <path d="M32 20v24"/>
      <path d="M22 26l10 6-10 6"/>
      <path d="M42 26l-10 6 10 6"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.2"/>
      <path d="M32 8v4"/>
      <path d="M32 52v4"/>
      <path d="M8 32h4"/>
      <path d="M52 32h4"/>
    </svg>`
  },
  {
    id: 'biomed-icd',
    name: 'Implantable Cardioverter Defibrillator',
    domain: 'engineering',
    category: 'implants',
    tags: ['ICD', 'defibrillator', 'cardiac', 'implant', 'arrhythmia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="24" rx="4"/>
      <path d="M24 16v-8c4-4 16-4 16 0v8"/>
      <path d="M40 8c4 0 8 4 8 8"/>
      <path d="M24 8c-4 0-8 4-8 8"/>
      <path d="M24 28l4-4 4 8 4-4 4 4"/>
      <path d="M20 36h8"/>
      <path d="M36 36h8"/>
      <circle cx="32" cy="48" r="4"/>
      <path d="M32 40v4"/>
    </svg>`
  },
  {
    id: 'biomed-bone-cement',
    name: 'Bone Cement Injector',
    domain: 'engineering',
    category: 'surgical',
    tags: ['bone', 'cement', 'PMMA', 'vertebroplasty', 'orthopedic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="32" height="16" rx="2"/>
      <path d="M40 32h16"/>
      <path d="M56 32l4 4v-8z"/>
      <path d="M12 32h24"/>
      <circle cx="16" cy="32" r="4" fill="currentColor" opacity="0.2"/>
      <path d="M8 20h16v4"/>
      <path d="M24 20v4"/>
      <path d="M12 28v8"/>
      <path d="M20 28v8"/>
    </svg>`
  },

  // ===========================================================================
  // QUALITY AND REGULATORY
  // ===========================================================================
  {
    id: 'biomed-sterilization',
    name: 'Sterilization Indicator',
    domain: 'engineering',
    category: 'quality',
    tags: ['sterilization', 'indicator', 'autoclave', 'sterile', 'quality'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="4"/>
      <path d="M20 24l8 8-8 8"/>
      <path d="M36 24l8 8-8 8"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.1"/>
      <path d="M28 32h8"/>
      <path d="M32 28v8"/>
      <path d="M20 12h24"/>
      <path d="M20 52h24"/>
    </svg>`
  },
  {
    id: 'biomed-fda-approval',
    name: 'FDA Approval Process',
    domain: 'engineering',
    category: 'regulatory',
    tags: ['FDA', 'approval', '510k', 'PMA', 'regulatory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4"/>
      <path d="M20 20h24"/>
      <path d="M20 28h24"/>
      <path d="M20 36h16"/>
      <circle cx="32" cy="48" r="4"/>
      <path d="M30 46l2 2 4-4"/>
      <path d="M16 12h4"/>
      <path d="M16 16h4"/>
      <circle cx="18" cy="14" r="2"/>
    </svg>`
  },
  {
    id: 'biomed-iso-13485',
    name: 'ISO 13485 Certification',
    domain: 'engineering',
    category: 'regulatory',
    tags: ['ISO', '13485', 'quality', 'management', 'certification'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="16"/>
      <path d="M24 32l6 6 12-12"/>
      <path d="M32 8v-4"/>
      <path d="M56 32h4"/>
      <path d="M32 56v4"/>
      <path d="M8 32h-4"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.2"/>
    </svg>`
  },
  {
    id: 'biomed-risk-analysis',
    name: 'Risk Analysis',
    domain: 'engineering',
    category: 'regulatory',
    tags: ['risk', 'analysis', 'FMEA', 'hazard', 'safety'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8l24 44H8z"/>
      <path d="M32 24v12"/>
      <circle cx="32" cy="44" r="3" fill="currentColor"/>
      <path d="M24 20l-8-8"/>
      <path d="M40 20l8-8"/>
      <path d="M16 12h4"/>
      <path d="M44 12h4"/>
    </svg>`
  },

  // ===========================================================================
  // ENERGY HARVESTING AND POWER
  // ===========================================================================
  {
    id: 'biomed-wireless-power',
    name: 'Wireless Power Transfer',
    domain: 'engineering',
    category: 'power',
    tags: ['wireless', 'power', 'inductive', 'charging', 'implant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="32" r="12"/>
      <circle cx="44" cy="32" r="12"/>
      <circle cx="20" cy="32" r="6"/>
      <circle cx="44" cy="32" r="6"/>
      <path d="M24 20c4-4 12-4 16 0"/>
      <path d="M24 44c4 4 12 4 16 0"/>
      <path d="M26 24c2-2 6-2 8 0"/>
      <path d="M30 24c2-2 6-2 8 0"/>
      <path d="M26 40c2 2 6 2 8 0"/>
      <path d="M30 40c2 2 6 2 8 0"/>
    </svg>`
  },
  {
    id: 'biomed-bio-battery',
    name: 'Biofuel Cell',
    domain: 'engineering',
    category: 'power',
    tags: ['biofuel', 'cell', 'enzyme', 'power', 'implant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="4"/>
      <path d="M24 16v-8"/>
      <path d="M40 16v-8"/>
      <circle cx="24" cy="8" r="3"/>
      <circle cx="40" cy="8" r="3"/>
      <path d="M28 28l8 8"/>
      <path d="M36 28l-8 8"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.1"/>
      <path d="M24 48v8"/>
      <path d="M40 48v8"/>
    </svg>`
  },
  {
    id: 'biomed-piezoelectric',
    name: 'Piezoelectric Harvester',
    domain: 'engineering',
    category: 'power',
    tags: ['piezoelectric', 'energy', 'harvesting', 'vibration', 'power'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="24" width="40" height="16" rx="2"/>
      <path d="M12 32h40"/>
      <path d="M8 24v16"/>
      <path d="M56 24v16"/>
      <path d="M20 20c4-8 8-8 12 0s8 8 12 0"/>
      <path d="M20 44c4 8 8 8 12 0s8-8 12 0"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.2"/>
      <path d="M32 28v8"/>
    </svg>`
  },

  // ===========================================================================
  // ORGAN-ON-CHIP AND MICROPHYSIOLOGICAL SYSTEMS
  // ===========================================================================
  {
    id: 'biomed-organ-on-chip',
    name: 'Organ-on-Chip',
    domain: 'engineering',
    category: 'microfluidics',
    tags: ['organ-on-chip', 'microphysiological', 'organoid', 'microfluidic', 'tissue model'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" rx="2"/>
      <path d="M16 20v-8"/>
      <path d="M32 20v-8"/>
      <path d="M48 20v-8"/>
      <circle cx="16" cy="8" r="4"/>
      <circle cx="32" cy="8" r="4"/>
      <circle cx="48" cy="8" r="4"/>
      <path d="M16 24h8v8h-8z" fill="currentColor" opacity="0.2"/>
      <path d="M28 24h8v8h-8z" fill="currentColor" opacity="0.3"/>
      <path d="M40 24h8v8h-8z" fill="currentColor" opacity="0.2"/>
      <path d="M20 32c0 4 4 4 8 0"/>
      <path d="M36 32c0 4 4 4 8 0"/>
      <path d="M16 44v8"/>
      <path d="M48 44v8"/>
    </svg>`
  },
  {
    id: 'biomed-force-plate',
    name: 'Force Plate',
    domain: 'engineering',
    category: 'biomechanics',
    tags: ['force plate', 'biomechanics', 'gait', 'kinetics', 'ground reaction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="36" width="48" height="8" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="36" width="48" height="8" rx="2"/>
      <rect x="12" y="44" width="8" height="8"/>
      <rect x="44" y="44" width="8" height="8"/>
      <rect x="12" y="28" width="8" height="8"/>
      <rect x="44" y="28" width="8" height="8"/>
      <path d="M32 20v-8"/>
      <path d="M28 12h8"/>
      <path d="M32 20l-4 8h8z" fill="currentColor"/>
      <path d="M24 40h16" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'biomed-bioprinter-head',
    name: 'Bioprinter Printhead',
    domain: 'engineering',
    category: 'tissue-engineering',
    tags: ['bioprinting', '3D printing', 'extrusion', 'tissue engineering', 'additive manufacturing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="20" rx="2"/>
      <path d="M24 12h16"/>
      <path d="M24 16h16"/>
      <path d="M32 28v8"/>
      <path d="M28 36l4 8 4-8z"/>
      <path d="M32 44v4"/>
      <circle cx="32" cy="52" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M16 52h8"/>
      <path d="M40 52h8"/>
      <path d="M20 56h24"/>
      <path d="M16 8v20"/>
      <path d="M48 8v20"/>
      <circle cx="28" cy="20" r="2" fill="currentColor"/>
      <circle cx="36" cy="20" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'biomed-motion-capture',
    name: 'Motion Capture Marker',
    domain: 'engineering',
    category: 'biomechanics',
    tags: ['motion capture', 'kinematics', 'marker', 'tracking', 'gait analysis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="12"/>
      <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <path d="M32 8v12"/>
      <path d="M32 44v12"/>
      <path d="M8 32h12"/>
      <path d="M44 32h12"/>
      <path d="M16 16l8 8"/>
      <path d="M40 40l8 8"/>
      <path d="M48 16l-8 8"/>
      <path d="M24 40l-8 8"/>
    </svg>`
  }
];

export default biomedicalIcons;
