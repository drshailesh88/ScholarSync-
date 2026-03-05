/**
 * engineering.ts
 * Engineering icon definitions for FINNISH Icon Library
 *
 * Contains comprehensive icons for general engineering disciplines including:
 * - Mechanical components (gears, motors, bearings, pistons)
 * - Electrical components (circuits, transformers, sensors)
 * - Civil/structural (beams, bridges, foundations)
 * - Process engineering (pipes, valves, tanks, pumps)
 * - Control systems (sensors, actuators, PLCs, feedback)
 * - CAD/drafting symbols (dimensions, tolerances, annotations)
 * - Automation and robotics
 * - Safety and quality symbols
 */

import type { IconDefinition } from './index';

/**
 * Engineering domain icons collection
 */
export const engineeringIcons: IconDefinition[] = [
  // ===========================================================================
  // MECHANICAL COMPONENTS
  // ===========================================================================
  {
    id: 'eng-gear',
    name: 'Gear',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['cog', 'mechanism', 'rotation', 'transmission', 'machine'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="3"/>
  <path d="M12 1v3"/>
  <path d="M12 20v3"/>
  <path d="M1 12h3"/>
  <path d="M20 12h3"/>
  <path d="M4.22 4.22l2.12 2.12"/>
  <path d="M17.66 17.66l2.12 2.12"/>
  <path d="M4.22 19.78l2.12-2.12"/>
  <path d="M17.66 6.34l2.12-2.12"/>
  <circle cx="12" cy="12" r="7"/>
</svg>`,
  },
  {
    id: 'eng-motor',
    name: 'Electric Motor',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['rotor', 'stator', 'rotation', 'power', 'actuator'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="6"/>
  <path d="M12 2v4"/>
  <path d="M12 18v4"/>
  <path d="M6 12H2"/>
  <path d="M22 12h-4"/>
  <circle cx="12" cy="12" r="2"/>
  <path d="M12 10v-2"/>
</svg>`,
  },
  {
    id: 'eng-bearing',
    name: 'Bearing',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['ball bearing', 'rotation', 'friction', 'shaft', 'support'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <circle cx="12" cy="12" r="4"/>
  <circle cx="12" cy="4" r="1.5"/>
  <circle cx="12" cy="20" r="1.5"/>
  <circle cx="4" cy="12" r="1.5"/>
  <circle cx="20" cy="12" r="1.5"/>
  <circle cx="6.34" cy="6.34" r="1.5"/>
  <circle cx="17.66" cy="17.66" r="1.5"/>
  <circle cx="6.34" cy="17.66" r="1.5"/>
  <circle cx="17.66" cy="6.34" r="1.5"/>
</svg>`,
  },
  {
    id: 'eng-piston',
    name: 'Piston',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['cylinder', 'engine', 'reciprocating', 'combustion', 'stroke'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="6" y="2" width="12" height="8" rx="1"/>
  <path d="M10 10v4"/>
  <path d="M14 10v4"/>
  <circle cx="12" cy="17" r="3"/>
  <path d="M12 20v2"/>
</svg>`,
  },
  {
    id: 'eng-spring',
    name: 'Coil Spring',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['spring', 'coil', 'elastic', 'suspension', 'tension'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M8 3h8"/>
  <path d="M12 3v2"/>
  <path d="M8 5c4 2 4 4 0 6s-4 4 0 6 4 4 0 6"/>
  <path d="M12 19v2"/>
  <path d="M8 21h8"/>
</svg>`,
  },
  {
    id: 'eng-shaft',
    name: 'Drive Shaft',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['shaft', 'axle', 'rotation', 'torque', 'transmission'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="10" width="20" height="4" rx="1"/>
  <ellipse cx="3" cy="12" rx="2" ry="4"/>
  <ellipse cx="21" cy="12" rx="2" ry="4"/>
  <line x1="8" y1="10" x2="8" y2="14" stroke-dasharray="2 2"/>
  <line x1="16" y1="10" x2="16" y2="14" stroke-dasharray="2 2"/>
</svg>`,
  },
  {
    id: 'eng-coupling',
    name: 'Shaft Coupling',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['coupling', 'joint', 'connection', 'flexible', 'torque'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="10" width="6" height="4"/>
  <rect x="16" y="10" width="6" height="4"/>
  <circle cx="12" cy="12" r="4"/>
  <path d="M8 12h-2"/>
  <path d="M18 12h-2"/>
  <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'eng-belt-drive',
    name: 'Belt Drive',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['belt', 'pulley', 'drive', 'transmission', 'power'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="6" cy="12" r="4"/>
  <circle cx="18" cy="12" r="3"/>
  <path d="M6 8c6-2 12-2 12 1"/>
  <path d="M6 16c6 2 12 2 12-1"/>
  <circle cx="6" cy="12" r="1.5" fill="currentColor"/>
  <circle cx="18" cy="12" r="1" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'eng-chain-drive',
    name: 'Chain Drive',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['chain', 'sprocket', 'drive', 'transmission', 'roller'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="6" cy="12" r="4"/>
  <circle cx="18" cy="12" r="3"/>
  <path d="M6 8h12" stroke-dasharray="2 2"/>
  <path d="M6 16h12" stroke-dasharray="2 2"/>
  <path d="M4 9l1 1 1-1"/>
  <path d="M8 9l1 1 1-1"/>
  <path d="M14 9l1 1 1-1"/>
</svg>`,
  },
  {
    id: 'eng-cam',
    name: 'Cam Mechanism',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['cam', 'follower', 'profile', 'motion', 'mechanism'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 18c-4 0-6-3-6-6s2-6 6-4 4-2 4-4"/>
  <circle cx="12" cy="14" r="2"/>
  <rect x="10" y="4" width="4" height="8"/>
  <circle cx="12" cy="4" r="2"/>
</svg>`,
  },

  // ===========================================================================
  // ELECTRICAL COMPONENTS
  // ===========================================================================
  {
    id: 'eng-capacitor',
    name: 'Capacitor',
    domain: 'engineering',
    category: 'electrical',
    tags: ['electronic', 'component', 'charge', 'circuit', 'storage'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12h6"/>
  <path d="M14 12h6"/>
  <path d="M10 6v12"/>
  <path d="M14 8v8" stroke-dasharray="2 2"/>
</svg>`,
  },
  {
    id: 'eng-resistor',
    name: 'Resistor',
    domain: 'engineering',
    category: 'electrical',
    tags: ['ohm', 'component', 'resistance', 'circuit', 'electronic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 12h4"/>
  <path d="M18 12h4"/>
  <path d="M6 12l1-4 2 8 2-8 2 8 2-8 2 8 1-4"/>
</svg>`,
  },
  {
    id: 'eng-transistor',
    name: 'Transistor',
    domain: 'engineering',
    category: 'electrical',
    tags: ['semiconductor', 'amplifier', 'switch', 'BJT', 'MOSFET'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <path d="M8 8v8"/>
  <path d="M8 12l6-4v8l-6-4"/>
  <path d="M14 6v2"/>
  <path d="M14 16v2"/>
  <path d="M4 12h4"/>
</svg>`,
  },
  {
    id: 'eng-transformer',
    name: 'Transformer',
    domain: 'engineering',
    category: 'electrical',
    tags: ['voltage', 'coil', 'power', 'AC', 'induction'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 6v12"/>
  <path d="M22 6v12"/>
  <path d="M6 6c0 2 1 3 2 3s2-1 2-3-1-3-2-3-2 1-2 3"/>
  <path d="M6 12c0 2 1 3 2 3s2-1 2-3-1-3-2-3-2 1-2 3"/>
  <path d="M14 6c0 2 1 3 2 3s2-1 2-3-1-3-2-3-2 1-2 3"/>
  <path d="M14 12c0 2 1 3 2 3s2-1 2-3-1-3-2-3-2 1-2 3"/>
  <path d="M14 18c0 2 1 3 2 3s2-1 2-3-1-3-2-3-2 1-2 3"/>
  <rect x="10" y="4" width="4" height="16"/>
</svg>`,
  },
  {
    id: 'eng-diode',
    name: 'Diode',
    domain: 'engineering',
    category: 'electrical',
    tags: ['semiconductor', 'rectifier', 'LED', 'current', 'one-way'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 12h6"/>
  <path d="M16 12h6"/>
  <polygon points="8,6 16,12 8,18"/>
  <path d="M16 6v12"/>
</svg>`,
  },
  {
    id: 'eng-chip',
    name: 'Microchip',
    domain: 'engineering',
    category: 'electrical',
    tags: ['IC', 'processor', 'integrated circuit', 'CPU', 'semiconductor'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="6" y="6" width="12" height="12" rx="1"/>
  <path d="M9 2v4"/>
  <path d="M15 2v4"/>
  <path d="M9 18v4"/>
  <path d="M15 18v4"/>
  <path d="M2 9h4"/>
  <path d="M2 15h4"/>
  <path d="M18 9h4"/>
  <path d="M18 15h4"/>
  <rect x="9" y="9" width="6" height="6"/>
</svg>`,
  },
  {
    id: 'eng-circuit-board',
    name: 'Circuit Board',
    domain: 'engineering',
    category: 'electrical',
    tags: ['PCB', 'electronic', 'traces', 'components', 'board'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="4" width="20" height="16" rx="2"/>
  <circle cx="6" cy="8" r="1.5"/>
  <circle cx="18" cy="8" r="1.5"/>
  <circle cx="6" cy="16" r="1.5"/>
  <circle cx="18" cy="16" r="1.5"/>
  <rect x="9" y="9" width="6" height="6"/>
  <path d="M6 9.5v3"/>
  <path d="M18 9.5v3"/>
  <path d="M9 12h-1.5"/>
  <path d="M16.5 12h-1.5"/>
</svg>`,
  },
  {
    id: 'eng-battery',
    name: 'Battery',
    domain: 'engineering',
    category: 'electrical',
    tags: ['power', 'cell', 'energy', 'storage', 'DC'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="7" width="18" height="10" rx="2"/>
  <path d="M20 10h2v4h-2"/>
  <path d="M6 10v4"/>
  <path d="M10 10v4"/>
  <path d="M14 10v4"/>
</svg>`,
  },
  {
    id: 'eng-fuse',
    name: 'Fuse',
    domain: 'engineering',
    category: 'electrical',
    tags: ['protection', 'overcurrent', 'safety', 'circuit', 'breaker'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 12h5"/>
  <path d="M17 12h5"/>
  <rect x="7" y="9" width="10" height="6" rx="1"/>
  <path d="M9 12h6"/>
</svg>`,
  },
  {
    id: 'eng-relay',
    name: 'Relay',
    domain: 'engineering',
    category: 'electrical',
    tags: ['switch', 'electromagnetic', 'control', 'coil', 'contact'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="6" width="16" height="12" rx="2" stroke-dasharray="4 2"/>
  <path d="M2 10h4"/>
  <path d="M18 10h4"/>
  <path d="M6 10c0-2 1-2 2-2s2 0 2 2-1 2-2 2"/>
  <path d="M10 10c0-2 1-2 2-2s2 0 2 2"/>
  <path d="M2 14h6"/>
  <path d="M16 14h6"/>
  <circle cx="8" cy="14" r="1"/>
  <circle cx="16" cy="14" r="1"/>
  <path d="M9 13l6-3"/>
</svg>`,
  },

  // ===========================================================================
  // CIVIL/STRUCTURAL
  // ===========================================================================
  {
    id: 'eng-beam',
    name: 'Structural Beam',
    domain: 'engineering',
    category: 'civil',
    tags: ['I-beam', 'structure', 'steel', 'construction', 'load'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 6h16"/>
  <path d="M4 18h16"/>
  <path d="M12 6v12"/>
  <path d="M6 6v2"/>
  <path d="M18 6v2"/>
  <path d="M6 16v2"/>
  <path d="M18 16v2"/>
</svg>`,
  },
  {
    id: 'eng-bridge',
    name: 'Bridge',
    domain: 'engineering',
    category: 'civil',
    tags: ['structure', 'span', 'truss', 'construction', 'infrastructure'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 18h20"/>
  <path d="M4 18v-6"/>
  <path d="M20 18v-6"/>
  <path d="M4 12c4-6 12-6 16 0"/>
  <path d="M8 12v6"/>
  <path d="M12 9v9"/>
  <path d="M16 12v6"/>
</svg>`,
  },
  {
    id: 'eng-column',
    name: 'Column',
    domain: 'engineering',
    category: 'civil',
    tags: ['pillar', 'support', 'vertical', 'structure', 'compression'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="8" y="4" width="8" height="16"/>
  <path d="M6 4h12"/>
  <path d="M6 20h12"/>
  <path d="M10 8v8" stroke-dasharray="2 2"/>
  <path d="M14 8v8" stroke-dasharray="2 2"/>
</svg>`,
  },
  {
    id: 'eng-truss',
    name: 'Truss',
    domain: 'engineering',
    category: 'civil',
    tags: ['frame', 'triangular', 'roof', 'structure', 'support'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 18h20"/>
  <path d="M2 18l10-14 10 14"/>
  <path d="M6 18l6-8"/>
  <path d="M18 18l-6-8"/>
  <path d="M9 10h6"/>
</svg>`,
  },
  {
    id: 'eng-foundation',
    name: 'Foundation',
    domain: 'engineering',
    category: 'civil',
    tags: ['footing', 'base', 'concrete', 'support', 'building'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="8" y="4" width="8" height="10"/>
  <path d="M8 14l-4 4h16l-4-4"/>
  <path d="M4 18v2h16v-2"/>
  <path d="M2 22h20" stroke-dasharray="4 2"/>
</svg>`,
  },

  // ===========================================================================
  // PROCESS ENGINEERING (P&ID)
  // ===========================================================================
  {
    id: 'eng-pipe',
    name: 'Pipe',
    domain: 'engineering',
    category: 'process',
    tags: ['tube', 'conduit', 'flow', 'plumbing', 'piping'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 8h8v8H2z"/>
  <path d="M14 8h8v8h-8z"/>
  <path d="M10 10h4v4h-4z"/>
  <path d="M4 8v-4"/>
  <path d="M8 8v-4"/>
  <path d="M16 16v4"/>
  <path d="M20 16v4"/>
</svg>`,
  },
  {
    id: 'eng-valve',
    name: 'Valve',
    domain: 'engineering',
    category: 'process',
    tags: ['control', 'flow', 'gate', 'regulation', 'fluid'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 12h6l2-4 4 8 2-4h6"/>
  <path d="M12 4v4"/>
  <circle cx="12" cy="3" r="1"/>
  <path d="M10 8h4"/>
</svg>`,
  },
  {
    id: 'eng-pump',
    name: 'Pump',
    domain: 'engineering',
    category: 'process',
    tags: ['fluid', 'pressure', 'flow', 'hydraulic', 'centrifugal'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="6"/>
  <path d="M2 12h4"/>
  <path d="M12 2v4"/>
  <path d="M12 18v4"/>
  <path d="M9 9l6 6"/>
  <path d="M15 9l-6 6"/>
</svg>`,
  },
  {
    id: 'eng-tank',
    name: 'Storage Tank',
    domain: 'engineering',
    category: 'process',
    tags: ['vessel', 'container', 'storage', 'reservoir', 'fluid'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="4" width="16" height="16" rx="2"/>
  <path d="M4 8h16"/>
  <path d="M8 4v4"/>
  <path d="M16 4v4"/>
  <path d="M12 16v4"/>
  <path d="M4 12h16" stroke-dasharray="2 2"/>
</svg>`,
  },
  {
    id: 'eng-heat-exchanger',
    name: 'Heat Exchanger',
    domain: 'engineering',
    category: 'process',
    tags: ['thermal', 'transfer', 'cooling', 'heating', 'shell-tube'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="12" rx="8" ry="4"/>
  <path d="M4 12v-4"/>
  <path d="M20 12v-4"/>
  <path d="M4 8h16"/>
  <path d="M4 12v4"/>
  <path d="M20 12v4"/>
  <path d="M4 16h16"/>
  <path d="M8 8v8"/>
  <path d="M12 8v8"/>
  <path d="M16 8v8"/>
</svg>`,
  },
  {
    id: 'eng-compressor',
    name: 'Compressor',
    domain: 'engineering',
    category: 'process',
    tags: ['gas', 'pressure', 'compression', 'air', 'pneumatic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="4,18 12,4 20,18"/>
  <path d="M4 18h16"/>
  <path d="M12 4v-2"/>
  <path d="M8 14h8"/>
  <path d="M10 10h4"/>
</svg>`,
  },
  {
    id: 'eng-reactor',
    name: 'Reactor Vessel',
    domain: 'engineering',
    category: 'process',
    tags: ['chemical', 'reaction', 'vessel', 'CSTR', 'batch'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="6" y="6" width="12" height="14" rx="2"/>
  <path d="M10 2v4"/>
  <path d="M14 2v4"/>
  <path d="M6 10h12"/>
  <path d="M12 10v6"/>
  <path d="M9 13h6"/>
  <path d="M12 20v2"/>
</svg>`,
  },
  {
    id: 'eng-filter',
    name: 'Filter',
    domain: 'engineering',
    category: 'process',
    tags: ['filtration', 'separation', 'strainer', 'purification', 'screen'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 4h20"/>
  <path d="M4 4l6 8v8l4-2v-6l6-8"/>
  <path d="M8 10h8"/>
  <path d="M9 12h6"/>
</svg>`,
  },
  {
    id: 'eng-mixer',
    name: 'Mixer/Agitator',
    domain: 'engineering',
    category: 'process',
    tags: ['mixing', 'agitation', 'stirrer', 'blending', 'impeller'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="6" y="8" width="12" height="12" rx="2"/>
  <path d="M12 2v6"/>
  <circle cx="12" cy="2" r="1"/>
  <path d="M8 14h8"/>
  <path d="M12 12v4"/>
  <path d="M10 14l4 2"/>
  <path d="M14 14l-4 2"/>
</svg>`,
  },
  {
    id: 'eng-separator',
    name: 'Separator',
    domain: 'engineering',
    category: 'process',
    tags: ['separation', 'cyclone', 'centrifuge', 'phase', 'split'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <path d="M12 4v4"/>
  <path d="M12 16v4"/>
  <path d="M4 12h4"/>
  <path d="M16 12h4"/>
  <circle cx="12" cy="12" r="3"/>
  <path d="M9 9l6 6"/>
</svg>`,
  },

  // ===========================================================================
  // CONTROL SYSTEMS
  // ===========================================================================
  {
    id: 'eng-sensor',
    name: 'Sensor',
    domain: 'engineering',
    category: 'control',
    tags: ['detector', 'measurement', 'transducer', 'signal', 'input'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="6"/>
  <path d="M12 2v4"/>
  <path d="M12 18v4"/>
  <circle cx="12" cy="12" r="2" fill="currentColor"/>
  <path d="M6 12c0-3.3 2.7-6 6-6"/>
  <path d="M18 12c0 3.3-2.7 6-6 6"/>
</svg>`,
  },
  {
    id: 'eng-actuator',
    name: 'Actuator',
    domain: 'engineering',
    category: 'control',
    tags: ['output', 'motor', 'cylinder', 'control', 'action'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="8" width="10" height="8" rx="1"/>
  <path d="M14 12h6"/>
  <path d="M18 9l3 3-3 3"/>
  <path d="M4 10h2"/>
  <path d="M4 14h2"/>
  <circle cx="9" cy="12" r="2"/>
</svg>`,
  },
  {
    id: 'eng-plc',
    name: 'PLC Controller',
    domain: 'engineering',
    category: 'control',
    tags: ['programmable', 'logic', 'controller', 'automation', 'industrial'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="4" width="16" height="16" rx="2"/>
  <path d="M8 2v4"/>
  <path d="M12 2v4"/>
  <path d="M16 2v4"/>
  <path d="M8 18v4"/>
  <path d="M12 18v4"/>
  <path d="M16 18v4"/>
  <rect x="7" y="8" width="4" height="3"/>
  <rect x="13" y="8" width="4" height="3"/>
  <circle cx="9" cy="14" r="1" fill="currentColor"/>
  <circle cx="12" cy="14" r="1" fill="currentColor"/>
  <circle cx="15" cy="14" r="1" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'eng-hmi',
    name: 'HMI Display',
    domain: 'engineering',
    category: 'control',
    tags: ['interface', 'display', 'touchscreen', 'SCADA', 'operator'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="4" width="20" height="14" rx="2"/>
  <rect x="4" y="6" width="16" height="10" rx="1"/>
  <path d="M8 20h8"/>
  <path d="M12 18v2"/>
  <circle cx="8" cy="11" r="2"/>
  <rect x="12" y="9" width="6" height="4"/>
</svg>`,
  },
  {
    id: 'eng-pid-controller',
    name: 'PID Controller',
    domain: 'engineering',
    category: 'control',
    tags: ['proportional', 'integral', 'derivative', 'feedback', 'loop'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="6" width="16" height="12" rx="2"/>
  <path d="M2 12h2"/>
  <path d="M20 12h2"/>
  <text x="7" y="14" font-size="5" fill="currentColor" stroke="none">PID</text>
  <path d="M7 16h10"/>
  <circle cx="8" cy="10" r="1"/>
  <circle cx="12" cy="10" r="1"/>
  <circle cx="16" cy="10" r="1"/>
</svg>`,
  },
  {
    id: 'eng-feedback-loop',
    name: 'Feedback Loop',
    domain: 'engineering',
    category: 'control',
    tags: ['feedback', 'closed-loop', 'control', 'signal', 'system'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12h4"/>
  <rect x="8" y="8" width="8" height="8"/>
  <path d="M16 12h4"/>
  <path d="M20 12v6h-12"/>
  <path d="M8 18v-2"/>
  <path d="M6 15l2 3-2 3"/>
</svg>`,
  },
  {
    id: 'eng-signal-generator',
    name: 'Signal Generator',
    domain: 'engineering',
    category: 'control',
    tags: ['waveform', 'oscillator', 'frequency', 'test', 'signal'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="6" width="20" height="12" rx="2"/>
  <path d="M6 12c0-2 1-2 2-2s2 0 2 2-1 2-2 2"/>
  <path d="M10 12c0-2 1-2 2-2s2 0 2 2-1 2-2 2"/>
  <path d="M14 12c0-2 1-2 2-2s2 0 2 2"/>
</svg>`,
  },
  {
    id: 'eng-thermostat',
    name: 'Thermostat',
    domain: 'engineering',
    category: 'control',
    tags: ['temperature', 'control', 'HVAC', 'setpoint', 'regulation'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <path d="M12 6v2"/>
  <path d="M12 16v2"/>
  <path d="M6 12h2"/>
  <path d="M16 12h2"/>
  <circle cx="12" cy="12" r="3"/>
  <path d="M12 9v3h2"/>
</svg>`,
  },
  {
    id: 'eng-flow-meter',
    name: 'Flow Meter',
    domain: 'engineering',
    category: 'control',
    tags: ['flow', 'measurement', 'rate', 'volume', 'instrumentation'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="6"/>
  <path d="M2 12h4"/>
  <path d="M18 12h4"/>
  <path d="M12 6v2"/>
  <path d="M10 12l3-2v4"/>
  <text x="10" y="18" font-size="4" fill="currentColor" stroke="none">F</text>
</svg>`,
  },
  {
    id: 'eng-pressure-gauge',
    name: 'Pressure Gauge',
    domain: 'engineering',
    category: 'control',
    tags: ['pressure', 'measurement', 'gauge', 'manometer', 'instrumentation'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="10" r="8"/>
  <path d="M12 18v4"/>
  <path d="M8 22h8"/>
  <path d="M12 6v2"/>
  <path d="M8 10h1"/>
  <path d="M15 10h1"/>
  <path d="M12 10l2-3"/>
  <text x="10" y="14" font-size="4" fill="currentColor" stroke="none">P</text>
</svg>`,
  },
  {
    id: 'eng-level-sensor',
    name: 'Level Sensor',
    domain: 'engineering',
    category: 'control',
    tags: ['level', 'measurement', 'tank', 'ultrasonic', 'float'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="6" y="4" width="12" height="16" rx="1"/>
  <path d="M6 12h12" stroke-dasharray="2 2"/>
  <path d="M6 16h12"/>
  <path d="M10 2h4"/>
  <path d="M12 2v2"/>
  <text x="10" y="10" font-size="4" fill="currentColor" stroke="none">L</text>
</svg>`,
  },

  // ===========================================================================
  // CAD/DRAFTING SYMBOLS
  // ===========================================================================
  {
    id: 'eng-dimension',
    name: 'Dimension Line',
    domain: 'engineering',
    category: 'cad',
    tags: ['measurement', 'drawing', 'annotation', 'size', 'drafting'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 18v-12"/>
  <path d="M20 18v-12"/>
  <path d="M4 10h16"/>
  <polygon points="4,10 7,8 7,12" fill="currentColor"/>
  <polygon points="20,10 17,8 17,12" fill="currentColor"/>
  <text x="10" y="8" font-size="5" fill="currentColor" stroke="none">50</text>
</svg>`,
  },
  {
    id: 'eng-centerline',
    name: 'Centerline',
    domain: 'engineering',
    category: 'cad',
    tags: ['center', 'axis', 'symmetry', 'drafting', 'annotation'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 12h20" stroke-dasharray="8 2 2 2"/>
  <path d="M12 2v20" stroke-dasharray="8 2 2 2"/>
</svg>`,
  },
  {
    id: 'eng-section-line',
    name: 'Section Line',
    domain: 'engineering',
    category: 'cad',
    tags: ['section', 'cut', 'view', 'drafting', 'cross-section'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12h16"/>
  <path d="M4 12l4-4"/>
  <path d="M20 12l-4 4"/>
  <text x="2" y="8" font-size="6" fill="currentColor" stroke="none">A</text>
  <text x="18" y="20" font-size="6" fill="currentColor" stroke="none">A</text>
</svg>`,
  },
  {
    id: 'eng-tolerance',
    name: 'Tolerance Symbol',
    domain: 'engineering',
    category: 'cad',
    tags: ['GD&T', 'tolerance', 'precision', 'manufacturing', 'quality'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="8" width="20" height="8"/>
  <path d="M8 8v8"/>
  <path d="M14 8v8"/>
  <circle cx="5" cy="12" r="2"/>
  <text x="9" y="14" font-size="5" fill="currentColor" stroke="none">0.1</text>
  <text x="16" y="14" font-size="5" fill="currentColor" stroke="none">A</text>
</svg>`,
  },
  {
    id: 'eng-surface-finish',
    name: 'Surface Finish',
    domain: 'engineering',
    category: 'cad',
    tags: ['roughness', 'Ra', 'machining', 'finish', 'quality'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 18l6-12 6 12"/>
  <path d="M12 6v-4"/>
  <path d="M6 18h12"/>
  <text x="10" y="14" font-size="4" fill="currentColor" stroke="none">Ra</text>
</svg>`,
  },
  {
    id: 'eng-weld-symbol',
    name: 'Weld Symbol',
    domain: 'engineering',
    category: 'cad',
    tags: ['welding', 'joint', 'fabrication', 'fillet', 'butt'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12h10"/>
  <path d="M14 12l4-6"/>
  <circle cx="20" cy="4" r="2"/>
  <path d="M12 10l3 4"/>
  <path d="M8 14v-4l3 2-3 2"/>
</svg>`,
  },
  {
    id: 'eng-datum',
    name: 'Datum Symbol',
    domain: 'engineering',
    category: 'cad',
    tags: ['reference', 'datum', 'GD&T', 'origin', 'coordinate'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="8" y="8" width="8" height="8"/>
  <path d="M12 16v4"/>
  <path d="M8 20h8"/>
  <path d="M12 8v-4"/>
  <text x="10" y="14" font-size="6" fill="currentColor" stroke="none">A</text>
</svg>`,
  },

  // ===========================================================================
  // AUTOMATION AND ROBOTICS
  // ===========================================================================
  {
    id: 'eng-robot-arm',
    name: 'Robot Arm',
    domain: 'engineering',
    category: 'automation',
    tags: ['robotic', 'manipulator', 'industrial', 'automation', 'arm'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="18" width="8" height="4"/>
  <circle cx="8" cy="16" r="2"/>
  <path d="M8 14l6-8"/>
  <circle cx="14" cy="6" r="2"/>
  <path d="M16 6h4"/>
  <path d="M18 4l2 2-2 2"/>
</svg>`,
  },
  {
    id: 'eng-conveyor',
    name: 'Conveyor Belt',
    domain: 'engineering',
    category: 'automation',
    tags: ['belt', 'transport', 'material handling', 'production', 'line'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="5" cy="14" r="3"/>
  <circle cx="19" cy="14" r="3"/>
  <path d="M5 11h14"/>
  <path d="M5 17h14"/>
  <path d="M8 11v-3h2v3"/>
  <path d="M14 11v-3h2v3"/>
</svg>`,
  },
  {
    id: 'eng-gripper',
    name: 'Gripper',
    domain: 'engineering',
    category: 'automation',
    tags: ['end effector', 'clamp', 'pick', 'robotic', 'tool'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="10" y="2" width="4" height="8"/>
  <path d="M10 10l-4 8 2 2"/>
  <path d="M14 10l4 8-2 2"/>
  <path d="M8 18h8"/>
  <circle cx="12" cy="6" r="1"/>
</svg>`,
  },
  {
    id: 'eng-servo-motor',
    name: 'Servo Motor',
    domain: 'engineering',
    category: 'automation',
    tags: ['servo', 'position', 'encoder', 'precision', 'motion'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="6" width="12" height="12" rx="2"/>
  <path d="M16 12h4"/>
  <circle cx="22" cy="12" r="1"/>
  <circle cx="10" cy="12" r="3"/>
  <path d="M10 9v3h2"/>
  <path d="M4 10h-2"/>
  <path d="M4 14h-2"/>
</svg>`,
  },
  {
    id: 'eng-stepper-motor',
    name: 'Stepper Motor',
    domain: 'engineering',
    category: 'automation',
    tags: ['stepper', 'step', 'discrete', 'position', 'motor'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="6" width="12" height="12" rx="2"/>
  <path d="M16 12h4"/>
  <circle cx="10" cy="12" r="3"/>
  <path d="M10 9l2 3-2 3"/>
  <path d="M4 9h-2v2"/>
  <path d="M4 13h-2v2"/>
</svg>`,
  },
  {
    id: 'eng-encoder',
    name: 'Encoder',
    domain: 'engineering',
    category: 'automation',
    tags: ['rotary', 'position', 'feedback', 'optical', 'incremental'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <circle cx="12" cy="12" r="3"/>
  <path d="M12 4v2"/>
  <path d="M12 18v2"/>
  <path d="M4 12h2"/>
  <path d="M18 12h2"/>
  <path d="M7 7l1.5 1.5"/>
  <path d="M15.5 15.5l1.5 1.5"/>
  <path d="M7 17l1.5-1.5"/>
  <path d="M15.5 8.5l1.5-1.5"/>
</svg>`,
  },
  {
    id: 'eng-limit-switch',
    name: 'Limit Switch',
    domain: 'engineering',
    category: 'automation',
    tags: ['switch', 'position', 'end stop', 'safety', 'interlock'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="8" width="12" height="8" rx="1"/>
  <path d="M16 12h4"/>
  <path d="M4 12h-2"/>
  <path d="M8 16v4"/>
  <circle cx="8" cy="12" r="2"/>
  <path d="M8 8v-4l4 2"/>
</svg>`,
  },
  {
    id: 'eng-proximity-sensor',
    name: 'Proximity Sensor',
    domain: 'engineering',
    category: 'automation',
    tags: ['proximity', 'inductive', 'capacitive', 'detection', 'presence'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="8" width="8" height="8" rx="1"/>
  <circle cx="8" cy="12" r="2"/>
  <path d="M12 12h3"/>
  <path d="M17 12h3"/>
  <path d="M14 10c2 0 2 4 0 4"/>
  <path d="M17 8c3 0 3 8 0 8"/>
</svg>`,
  },
  {
    id: 'eng-photoelectric',
    name: 'Photoelectric Sensor',
    domain: 'engineering',
    category: 'automation',
    tags: ['photoelectric', 'optical', 'beam', 'detection', 'light'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="8" width="6" height="8" rx="1"/>
  <rect x="16" y="8" width="6" height="8" rx="1"/>
  <path d="M8 12h8" stroke-dasharray="2 2"/>
  <path d="M5 10l-1 2 1 2"/>
  <path d="M19 10l1 2-1 2"/>
</svg>`,
  },

  // ===========================================================================
  // SAFETY AND QUALITY
  // ===========================================================================
  {
    id: 'eng-emergency-stop',
    name: 'Emergency Stop',
    domain: 'engineering',
    category: 'safety',
    tags: ['e-stop', 'emergency', 'safety', 'shutdown', 'button'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <circle cx="12" cy="12" r="6" fill="currentColor" opacity="0.3"/>
  <path d="M12 8v4"/>
  <path d="M10 10h4"/>
</svg>`,
  },
  {
    id: 'eng-warning',
    name: 'Warning Symbol',
    domain: 'engineering',
    category: 'safety',
    tags: ['warning', 'caution', 'hazard', 'alert', 'danger'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2l10 18H2z"/>
  <path d="M12 9v4"/>
  <circle cx="12" cy="16" r="1" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'eng-interlock',
    name: 'Safety Interlock',
    domain: 'engineering',
    category: 'safety',
    tags: ['interlock', 'guard', 'safety', 'lock', 'protection'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="6" y="10" width="12" height="10" rx="2"/>
  <path d="M8 10V7a4 4 0 018 0v3"/>
  <circle cx="12" cy="15" r="2"/>
  <path d="M12 17v2"/>
</svg>`,
  },
  {
    id: 'eng-inspection',
    name: 'Inspection Point',
    domain: 'engineering',
    category: 'quality',
    tags: ['inspection', 'quality', 'check', 'QC', 'verification'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="11" cy="11" r="8"/>
  <path d="M21 21l-4.35-4.35"/>
  <path d="M8 11l2 2 4-4"/>
</svg>`,
  },
  {
    id: 'eng-calibration',
    name: 'Calibration',
    domain: 'engineering',
    category: 'quality',
    tags: ['calibration', 'adjustment', 'accuracy', 'standard', 'measurement'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <path d="M12 6v6l4 2"/>
  <path d="M8 3l2 2"/>
  <path d="M16 3l-2 2"/>
</svg>`,
  },

  // ===========================================================================
  // MANUFACTURING & PRODUCTION
  // ===========================================================================
  {
    id: 'eng-cnc-machine',
    name: 'CNC Machine',
    domain: 'engineering',
    category: 'manufacturing',
    tags: ['CNC', 'machining', 'computer numerical control', 'milling', 'automation'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="6" width="20" height="14" rx="2"/>
  <rect x="4" y="8" width="10" height="8"/>
  <path d="M9 8v-4"/>
  <path d="M7 4h4"/>
  <circle cx="9" cy="12" r="2"/>
  <rect x="16" y="9" width="4" height="6" rx="1"/>
  <path d="M17 12h2"/>
  <path d="M18 10v4"/>
</svg>`,
  },
  {
    id: 'eng-3d-printer',
    name: '3D Printer',
    domain: 'engineering',
    category: 'manufacturing',
    tags: ['additive manufacturing', '3D printing', 'FDM', 'rapid prototyping', 'fabrication'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="2" width="16" height="20" rx="2"/>
  <path d="M4 8h16"/>
  <path d="M12 8v-4"/>
  <path d="M10 4h4"/>
  <rect x="8" y="14" width="8" height="4"/>
  <path d="M12 11v3"/>
  <path d="M10 11h4"/>
</svg>`,
  },
  {
    id: 'eng-lathe',
    name: 'Lathe',
    domain: 'engineering',
    category: 'manufacturing',
    tags: ['lathe', 'turning', 'machining', 'spindle', 'rotation'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="10" width="16" height="4"/>
  <circle cx="20" cy="12" r="2"/>
  <ellipse cx="4" cy="12" rx="2" ry="4"/>
  <path d="M10 6l2 4"/>
  <path d="M12 10l2-4"/>
  <path d="M4 6v2"/>
  <path d="M4 14v2"/>
</svg>`,
  },
  {
    id: 'eng-injection-molding',
    name: 'Injection Molding',
    domain: 'engineering',
    category: 'manufacturing',
    tags: ['injection molding', 'plastic', 'mold', 'casting', 'mass production'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="8" width="8" height="8" rx="1"/>
  <rect x="14" y="8" width="8" height="8" rx="1"/>
  <path d="M10 12h4"/>
  <path d="M12 10v4"/>
  <path d="M12 2v6"/>
  <path d="M10 4h4"/>
  <path d="M6 16v4"/>
  <path d="M18 16v4"/>
</svg>`,
  },
  {
    id: 'eng-welding',
    name: 'Welding',
    domain: 'engineering',
    category: 'manufacturing',
    tags: ['welding', 'joining', 'fabrication', 'fusion', 'MIG', 'TIG'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 20l8-8"/>
  <path d="M12 12l8-8"/>
  <circle cx="12" cy="12" r="2" fill="currentColor"/>
  <path d="M10 10l-2-4"/>
  <path d="M14 10l2-4"/>
  <path d="M8 6l2-2"/>
  <path d="M14 4l2 2"/>
  <path d="M2 20h4"/>
  <path d="M18 4h4"/>
</svg>`,
  },
  {
    id: 'eng-assembly-line',
    name: 'Assembly Line',
    domain: 'engineering',
    category: 'manufacturing',
    tags: ['assembly', 'production line', 'manufacturing', 'automation', 'mass production'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 16h20"/>
  <circle cx="5" cy="16" r="2"/>
  <circle cx="19" cy="16" r="2"/>
  <rect x="4" y="10" width="4" height="4"/>
  <rect x="10" y="8" width="4" height="6"/>
  <rect x="16" y="12" width="4" height="2"/>
  <path d="M8 12h2"/>
  <path d="M14 11h2"/>
</svg>`,
  },
  {
    id: 'eng-press',
    name: 'Hydraulic Press',
    domain: 'engineering',
    category: 'manufacturing',
    tags: ['press', 'hydraulic', 'forming', 'stamping', 'forging'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="2" width="16" height="4"/>
  <rect x="10" y="6" width="4" height="8"/>
  <path d="M8 14h8"/>
  <path d="M6 14l-2 6"/>
  <path d="M18 14l2 6"/>
  <path d="M4 20h16"/>
</svg>`,
  },

  // ===========================================================================
  // MATERIALS TESTING
  // ===========================================================================
  {
    id: 'eng-tensile-test',
    name: 'Tensile Testing',
    domain: 'engineering',
    category: 'testing',
    tags: ['tensile', 'stress', 'strain', 'material testing', 'strength'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2v4"/>
  <path d="M12 18v4"/>
  <path d="M8 6h8"/>
  <path d="M8 18h8"/>
  <rect x="10" y="6" width="4" height="12" rx="2"/>
  <path d="M10 12h4"/>
  <path d="M9 4l3-2 3 2"/>
  <path d="M9 20l3 2 3-2"/>
</svg>`,
  },
  {
    id: 'eng-hardness-test',
    name: 'Hardness Testing',
    domain: 'engineering',
    category: 'testing',
    tags: ['hardness', 'Rockwell', 'Brinell', 'Vickers', 'material testing'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2l-2 8 4 2-2 10"/>
  <rect x="4" y="18" width="16" height="4"/>
  <circle cx="12" cy="18" r="2"/>
  <path d="M8 18h-2"/>
  <path d="M18 18h-2"/>
</svg>`,
  },
  {
    id: 'eng-fatigue-test',
    name: 'Fatigue Testing',
    domain: 'engineering',
    category: 'testing',
    tags: ['fatigue', 'cyclic', 'endurance', 'stress cycle', 'material testing'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0 4 4 6 0"/>
  <rect x="4" y="16" width="16" height="4" rx="1"/>
  <path d="M8 16v-2"/>
  <path d="M16 16v-2"/>
  <circle cx="12" cy="8" r="1" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'eng-impact-test',
    name: 'Impact Testing',
    domain: 'engineering',
    category: 'testing',
    tags: ['impact', 'Charpy', 'Izod', 'toughness', 'material testing'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 4l8 8"/>
  <circle cx="4" cy="4" r="2"/>
  <rect x="10" y="10" width="4" height="6" rx="1"/>
  <path d="M6 20h12"/>
  <path d="M8 16v4"/>
  <path d="M16 16v4"/>
  <path d="M14 13l4-4"/>
  <path d="M18 9l2-2"/>
</svg>`,
  },
  {
    id: 'eng-ndt',
    name: 'Non-Destructive Testing',
    domain: 'engineering',
    category: 'testing',
    tags: ['NDT', 'ultrasonic', 'radiographic', 'inspection', 'quality'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="8" width="8" height="10" rx="1"/>
  <path d="M10 13c2 0 2-3 4-3s2 3 4 3"/>
  <path d="M18 10c1 0 1-2 2-2"/>
  <path d="M18 16c1 0 1 2 2 2"/>
  <rect x="6" y="4" width="4" height="4"/>
  <circle cx="8" cy="13" r="2"/>
</svg>`,
  },

  // ===========================================================================
  // METROLOGY & MEASUREMENT
  // ===========================================================================
  {
    id: 'eng-caliper',
    name: 'Caliper',
    domain: 'engineering',
    category: 'metrology',
    tags: ['caliper', 'measurement', 'vernier', 'dimension', 'precision'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 8h20"/>
  <path d="M4 8v8"/>
  <path d="M4 16h4v-4"/>
  <path d="M14 8v8"/>
  <path d="M14 16h4v-4"/>
  <path d="M2 6h6"/>
  <path d="M2 10h18"/>
  <path d="M12 6v2"/>
  <path d="M16 6v2"/>
  <path d="M20 6v2"/>
</svg>`,
  },
  {
    id: 'eng-micrometer',
    name: 'Micrometer',
    domain: 'engineering',
    category: 'metrology',
    tags: ['micrometer', 'measurement', 'precision', 'thickness', 'gauge'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12c0-2 1-4 4-4"/>
  <path d="M8 8v8"/>
  <rect x="8" y="10" width="10" height="4"/>
  <path d="M18 12h4"/>
  <circle cx="20" cy="12" r="2"/>
  <path d="M10 10v4"/>
  <path d="M12 10v4"/>
  <path d="M14 10v4"/>
  <path d="M4 10v4"/>
</svg>`,
  },
  {
    id: 'eng-cmm',
    name: 'CMM Machine',
    domain: 'engineering',
    category: 'metrology',
    tags: ['CMM', 'coordinate measuring', '3D measurement', 'inspection', 'quality'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="16" width="20" height="4"/>
  <path d="M4 16v-6"/>
  <path d="M20 16v-6"/>
  <path d="M4 10h16"/>
  <path d="M12 10v-6"/>
  <path d="M12 4l-2 2"/>
  <path d="M12 4l2 2"/>
  <path d="M12 8v4"/>
  <circle cx="12" cy="14" r="1" fill="currentColor"/>
  <rect x="8" y="18" width="3" height="2"/>
</svg>`,
  },
  {
    id: 'eng-gauge',
    name: 'Dial Gauge',
    domain: 'engineering',
    category: 'metrology',
    tags: ['gauge', 'dial indicator', 'measurement', 'tolerance', 'inspection'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="10" r="8"/>
  <path d="M12 6v4l2 2"/>
  <path d="M8 6l1 1"/>
  <path d="M16 6l-1 1"/>
  <path d="M6 10h1"/>
  <path d="M17 10h1"/>
  <path d="M12 18v4"/>
  <path d="M10 22h4"/>
</svg>`,
  },
  {
    id: 'eng-spirit-level',
    name: 'Spirit Level',
    domain: 'engineering',
    category: 'metrology',
    tags: ['level', 'spirit level', 'alignment', 'horizontal', 'measurement'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="8" width="20" height="8" rx="2"/>
  <rect x="8" y="10" width="8" height="4" rx="1"/>
  <circle cx="12" cy="12" r="1" fill="currentColor"/>
  <path d="M10 12h-1"/>
  <path d="M15 12h-1"/>
  <path d="M4 10v4"/>
  <path d="M20 10v4"/>
</svg>`,
  },

  // ===========================================================================
  // HYDRAULICS & PNEUMATICS
  // ===========================================================================
  {
    id: 'eng-hydraulic-cylinder',
    name: 'Hydraulic Cylinder',
    domain: 'engineering',
    category: 'hydraulics',
    tags: ['hydraulic', 'cylinder', 'actuator', 'piston', 'linear motion'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="8" width="12" height="8" rx="1"/>
  <rect x="14" y="10" width="8" height="4"/>
  <path d="M14 12h-4"/>
  <circle cx="6" cy="12" r="2"/>
  <path d="M6 8v-2"/>
  <path d="M6 16v2"/>
</svg>`,
  },
  {
    id: 'eng-pneumatic-valve',
    name: 'Pneumatic Valve',
    domain: 'engineering',
    category: 'pneumatics',
    tags: ['pneumatic', 'valve', 'air', 'solenoid', 'control'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="8" width="16" height="8" rx="1"/>
  <path d="M2 12h2"/>
  <path d="M20 12h2"/>
  <path d="M8 8v-4"/>
  <path d="M16 8v-4"/>
  <path d="M12 8v-2"/>
  <path d="M6 4h4"/>
  <path d="M14 4h4"/>
  <path d="M9 12l3-2 3 2"/>
</svg>`,
  },
  {
    id: 'eng-accumulator',
    name: 'Accumulator',
    domain: 'engineering',
    category: 'hydraulics',
    tags: ['accumulator', 'pressure vessel', 'energy storage', 'hydraulic', 'bladder'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="6" rx="6" ry="4"/>
  <ellipse cx="12" cy="18" rx="6" ry="4"/>
  <path d="M6 6v12"/>
  <path d="M18 6v12"/>
  <path d="M6 12h12" stroke-dasharray="3 2"/>
  <path d="M12 18v4"/>
</svg>`,
  },
  {
    id: 'eng-air-compressor',
    name: 'Air Compressor',
    domain: 'engineering',
    category: 'pneumatics',
    tags: ['compressor', 'air', 'pneumatic', 'pressure', 'tank'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="8" cy="14" rx="6" ry="4"/>
  <path d="M2 14v4"/>
  <path d="M14 14v4"/>
  <path d="M8 10v-4"/>
  <rect x="6" y="2" width="4" height="4"/>
  <path d="M12 4h4"/>
  <path d="M16 2v4"/>
  <circle cx="8" cy="18" r="2"/>
</svg>`,
  },

  // ===========================================================================
  // PROJECT MANAGEMENT
  // ===========================================================================
  {
    id: 'eng-gantt-chart',
    name: 'Gantt Chart',
    domain: 'engineering',
    category: 'management',
    tags: ['Gantt', 'schedule', 'timeline', 'project management', 'planning'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 4v16"/>
  <path d="M4 8h16"/>
  <rect x="6" y="10" width="8" height="2" fill="currentColor"/>
  <rect x="8" y="14" width="10" height="2" fill="currentColor"/>
  <rect x="6" y="18" width="6" height="2" fill="currentColor"/>
  <path d="M4 12h2"/>
  <path d="M4 16h2"/>
</svg>`,
  },
  {
    id: 'eng-milestone',
    name: 'Milestone',
    domain: 'engineering',
    category: 'management',
    tags: ['milestone', 'checkpoint', 'deliverable', 'project', 'goal'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2l8 10-8 10-8-10z"/>
  <path d="M12 6v12"/>
  <path d="M8 12h8"/>
</svg>`,
  },
  {
    id: 'eng-critical-path',
    name: 'Critical Path',
    domain: 'engineering',
    category: 'management',
    tags: ['critical path', 'network', 'PERT', 'scheduling', 'dependencies'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="4" cy="12" r="2"/>
  <circle cx="12" cy="6" r="2"/>
  <circle cx="12" cy="18" r="2"/>
  <circle cx="20" cy="12" r="2"/>
  <path d="M6 12h4" stroke-width="3"/>
  <path d="M14 12h4" stroke-width="3"/>
  <path d="M12 8v2"/>
  <path d="M12 14v2"/>
  <path d="M6 11l4-4"/>
  <path d="M14 7l4 4"/>
</svg>`,
  },
  {
    id: 'eng-revision',
    name: 'Revision Control',
    domain: 'engineering',
    category: 'management',
    tags: ['revision', 'version', 'change control', 'ECN', 'documentation'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="2" width="12" height="16" rx="1"/>
  <path d="M8 6h4"/>
  <path d="M8 10h4"/>
  <path d="M8 14h2"/>
  <path d="M14 14l4 4"/>
  <path d="M18 14v4h-4"/>
  <circle cx="18" cy="18" r="4"/>
  <text x="16" y="20" font-size="5" fill="currentColor" stroke="none">R</text>
</svg>`,
  },

  // ===========================================================================
  // POWER & ENERGY
  // ===========================================================================
  {
    id: 'eng-turbine',
    name: 'Turbine',
    domain: 'engineering',
    category: 'power',
    tags: ['turbine', 'power generation', 'rotor', 'steam', 'gas'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <circle cx="12" cy="12" r="2"/>
  <path d="M12 4c-2 2-2 4 0 6"/>
  <path d="M12 14c2 2 2 4 0 6"/>
  <path d="M4 12c2-2 4-2 6 0"/>
  <path d="M14 12c2 2 4 2 6 0"/>
</svg>`,
  },
  {
    id: 'eng-generator',
    name: 'Generator',
    domain: 'engineering',
    category: 'power',
    tags: ['generator', 'power', 'electricity', 'alternator', 'dynamo'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <circle cx="12" cy="12" r="3"/>
  <path d="M12 4v2"/>
  <path d="M12 18v2"/>
  <path d="M4 12h2"/>
  <path d="M18 12h2"/>
  <path d="M2 12h2"/>
  <path d="M20 12h2"/>
  <text x="10" y="14" font-size="5" fill="currentColor" stroke="none">G</text>
</svg>`,
  },
  {
    id: 'eng-solar-panel',
    name: 'Solar Panel',
    domain: 'engineering',
    category: 'power',
    tags: ['solar', 'photovoltaic', 'renewable', 'PV', 'energy'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="6" width="20" height="12" rx="1"/>
  <path d="M2 10h20"/>
  <path d="M2 14h20"/>
  <path d="M7 6v12"/>
  <path d="M12 6v12"/>
  <path d="M17 6v12"/>
  <path d="M12 18v4"/>
  <path d="M8 22h8"/>
</svg>`,
  },
  {
    id: 'eng-wind-turbine',
    name: 'Wind Turbine',
    domain: 'engineering',
    category: 'power',
    tags: ['wind', 'turbine', 'renewable', 'energy', 'blade'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="8" r="2"/>
  <path d="M12 10v12"/>
  <path d="M8 22h8"/>
  <path d="M12 6c-1-4 1-4 2-6"/>
  <path d="M10 8c-4 1-4-1-6-2"/>
  <path d="M14 8c4 1 4-1 6-2"/>
</svg>`,
  },

  // ===========================================================================
  // STRUCTURAL ANALYSIS
  // ===========================================================================
  {
    id: 'eng-fea-mesh',
    name: 'FEA Mesh',
    domain: 'engineering',
    category: 'analysis',
    tags: ['FEA', 'finite element', 'mesh', 'simulation', 'analysis'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="2" width="20" height="20"/>
  <path d="M2 7h20"/>
  <path d="M2 12h20"/>
  <path d="M2 17h20"/>
  <path d="M7 2v20"/>
  <path d="M12 2v20"/>
  <path d="M17 2v20"/>
  <path d="M2 2l5 5"/>
  <path d="M7 2l5 5"/>
  <path d="M12 2l5 5"/>
  <path d="M2 7l5 5"/>
  <path d="M7 7l5 5"/>
</svg>`,
  },
  {
    id: 'eng-stress-strain',
    name: 'Stress-Strain',
    domain: 'engineering',
    category: 'analysis',
    tags: ['stress', 'strain', 'deformation', 'mechanics', 'analysis'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 20l4-4 4 2 4-6 4-2"/>
  <path d="M4 20h16"/>
  <path d="M4 20v-16"/>
  <text x="2" y="8" font-size="4" fill="currentColor" stroke="none">σ</text>
  <text x="18" y="22" font-size="4" fill="currentColor" stroke="none">ε</text>
  <circle cx="16" cy="10" r="1" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'eng-moment-diagram',
    name: 'Bending Moment',
    domain: 'engineering',
    category: 'analysis',
    tags: ['moment', 'bending', 'beam', 'structural', 'diagram'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 12h20"/>
  <path d="M4 12v-4"/>
  <path d="M20 12v-4"/>
  <path d="M4 12c4 6 12 6 16 0"/>
  <path d="M12 6v-4"/>
  <path d="M10 4l2-2 2 2"/>
  <circle cx="4" cy="12" r="1" fill="currentColor"/>
  <circle cx="20" cy="12" r="1" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'eng-shear-force',
    name: 'Shear Force',
    domain: 'engineering',
    category: 'analysis',
    tags: ['shear', 'force', 'beam', 'structural', 'diagram'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 12h20"/>
  <path d="M4 12v6h8v-12h8v6"/>
  <path d="M4 18h8"/>
  <path d="M12 6h8"/>
  <circle cx="4" cy="12" r="1" fill="currentColor"/>
  <circle cx="20" cy="12" r="1" fill="currentColor"/>
</svg>`,
  },

  // ===========================================================================
  // ADDITIONAL MECHANICAL
  // ===========================================================================
  {
    id: 'eng-clutch',
    name: 'Clutch',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['clutch', 'friction', 'engagement', 'transmission', 'coupling'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="8" cy="12" r="5"/>
  <circle cx="16" cy="12" r="5"/>
  <circle cx="8" cy="12" r="2"/>
  <circle cx="16" cy="12" r="2"/>
  <path d="M2 12h3"/>
  <path d="M19 12h3"/>
  <path d="M11 12h2" stroke-dasharray="2 1"/>
</svg>`,
  },
  {
    id: 'eng-brake',
    name: 'Disc Brake',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['brake', 'disc', 'caliper', 'friction', 'stopping'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <circle cx="12" cy="12" r="3"/>
  <path d="M12 4v2"/>
  <path d="M12 18v2"/>
  <path d="M4 12h2"/>
  <path d="M18 12h2"/>
  <rect x="18" y="8" width="4" height="8" rx="1"/>
</svg>`,
  },
  {
    id: 'eng-flywheel',
    name: 'Flywheel',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['flywheel', 'inertia', 'energy storage', 'rotation', 'momentum'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <circle cx="12" cy="12" r="6"/>
  <circle cx="12" cy="12" r="2"/>
  <path d="M12 2v4"/>
  <path d="M12 18v4"/>
  <path d="M2 12h4"/>
  <path d="M18 12h4"/>
</svg>`,
  },
  {
    id: 'eng-gearbox',
    name: 'Gearbox',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['gearbox', 'transmission', 'gear train', 'reduction', 'speed'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="4" width="16" height="16" rx="2"/>
  <circle cx="9" cy="9" r="3"/>
  <circle cx="15" cy="15" r="3"/>
  <path d="M11 7l4 4"/>
  <path d="M2 12h2"/>
  <path d="M20 12h2"/>
</svg>`,
  },
  {
    id: 'eng-sprocket',
    name: 'Sprocket',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['sprocket', 'chain', 'teeth', 'drive', 'bicycle'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="6"/>
  <circle cx="12" cy="12" r="2"/>
  <path d="M12 2v4"/>
  <path d="M12 18v4"/>
  <path d="M2 12h4"/>
  <path d="M18 12h4"/>
  <path d="M4.93 4.93l2.83 2.83"/>
  <path d="M16.24 16.24l2.83 2.83"/>
  <path d="M4.93 19.07l2.83-2.83"/>
  <path d="M16.24 7.76l2.83-2.83"/>
</svg>`,
  },
  {
    id: 'eng-pulley',
    name: 'Pulley System',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['pulley', 'rope', 'mechanical advantage', 'lift', 'hoist'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="8" cy="6" r="4"/>
  <circle cx="16" cy="6" r="4"/>
  <circle cx="8" cy="6" r="1"/>
  <circle cx="16" cy="6" r="1"/>
  <path d="M8 10v8"/>
  <path d="M16 10v8"/>
  <path d="M4 6v14"/>
  <path d="M4 6h4"/>
  <path d="M4 18h4"/>
  <path d="M16 18h4l-2 4"/>
</svg>`,
  },

  // ===========================================================================
  // HVAC
  // ===========================================================================
  {
    id: 'eng-hvac-unit',
    name: 'HVAC Unit',
    domain: 'engineering',
    category: 'hvac',
    tags: ['HVAC', 'air conditioning', 'heating', 'ventilation', 'climate'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="2" y="6" width="20" height="12" rx="2"/>
  <path d="M6 10h4"/>
  <path d="M6 14h4"/>
  <circle cx="16" cy="12" r="3"/>
  <path d="M14 12h4"/>
  <path d="M16 10v4"/>
  <path d="M2 18v2"/>
  <path d="M22 18v2"/>
</svg>`,
  },
  {
    id: 'eng-ductwork',
    name: 'Ductwork',
    domain: 'engineering',
    category: 'hvac',
    tags: ['duct', 'air', 'ventilation', 'distribution', 'HVAC'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 8h8v8h8"/>
  <path d="M4 12h8"/>
  <path d="M12 12v4"/>
  <path d="M4 6v8"/>
  <path d="M12 6v2"/>
  <path d="M12 16h8v4"/>
  <path d="M18 20h4"/>
</svg>`,
  },
  {
    id: 'eng-fan',
    name: 'Fan',
    domain: 'engineering',
    category: 'hvac',
    tags: ['fan', 'blower', 'air movement', 'ventilation', 'cooling'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <circle cx="12" cy="12" r="2"/>
  <path d="M12 4c-2 2-1 5 0 6"/>
  <path d="M12 14c2 2 1 5 0 6"/>
  <path d="M6 9c1-2 4-2 6 0"/>
  <path d="M12 12c2 1 5 1 6-2"/>
</svg>`,
  },

  {
    id: 'eng-antenna',
    name: 'Antenna',
    domain: 'engineering',
    category: 'electrical',
    tags: ['radio', 'wireless', 'transmission', 'receiver', 'signal'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 22v-10"/>
  <path d="M12 12l-8-8"/>
  <path d="M12 12l8-8"/>
  <circle cx="12" cy="12" r="2"/>
  <path d="M6 8c-1-1-2-3-2-4"/>
  <path d="M18 8c1-1 2-3 2-4"/>
</svg>`,
  },
  {
    id: 'eng-bolt',
    name: 'Bolt',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['fastener', 'screw', 'thread', 'hardware', 'assembly'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12,2 17,5 17,9 12,12 7,9 7,5"/>
  <path d="M12 12v10"/>
  <path d="M9 14h6"/>
  <path d="M9 17h6"/>
  <path d="M9 20h6"/>
</svg>`,
  },
  {
    id: 'eng-nut',
    name: 'Nut',
    domain: 'engineering',
    category: 'mechanical',
    tags: ['fastener', 'hex', 'thread', 'hardware', 'assembly'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12,2 20,6 20,18 12,22 4,18 4,6"/>
  <circle cx="12" cy="12" r="4"/>
</svg>`,
  },
];

export default engineeringIcons;
