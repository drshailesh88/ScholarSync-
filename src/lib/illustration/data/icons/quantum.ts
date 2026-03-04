/**
 * Quantum Physics Icon Library
 * Comprehensive SVG icons for quantum mechanics and quantum field theory
 *
 * Categories:
 * - Wavefunctions (probability, orbitals, superposition)
 * - Operators (Hamiltonian, momentum, spin)
 * - Spin Systems (spin states, magnetic moments)
 * - Entanglement (Bell states, quantum correlations)
 * - Atomic Orbitals (s, p, d, f orbitals)
 * - Quantum States (Dirac notation, Bloch sphere)
 */

import type { IconDefinition } from './index';

export const quantumIcons: IconDefinition[] = [
  // ===========================================================================
  // WAVEFUNCTIONS
  // ===========================================================================
  {
    id: 'quantum-wavefunction',
    name: 'Wavefunction Psi',
    domain: 'physics',
    category: 'wavefunctions',
    tags: ['wavefunction', 'psi', 'probability', 'amplitude', 'quantum state'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c4-16 8-16 12 0s8 16 12 0 8-16 12 0 8 16 12 0"/>
      <text x="28" y="56" font-size="14" font-style="italic" fill="currentColor" stroke="none">ψ</text>
      <path d="M4 32h4" stroke-dasharray="2 2"/>
      <path d="M56 32h4" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'quantum-probability-density',
    name: 'Probability Density',
    domain: 'physics',
    category: 'wavefunctions',
    tags: ['probability', 'density', 'psi squared', 'Born rule', 'measurement'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56c8-8 8-40 24-40s16 32 24 40" fill="currentColor" opacity="0.2"/>
      <path d="M8 56c8-8 8-40 24-40s16 32 24 40"/>
      <line x1="8" y1="56" x2="56" y2="56"/>
      <text x="24" y="48" font-size="10" fill="currentColor" stroke="none">|ψ|²</text>
    </svg>`
  },
  {
    id: 'quantum-superposition',
    name: 'Superposition State',
    domain: 'physics',
    category: 'wavefunctions',
    tags: ['superposition', 'linear combination', 'quantum', 'coherent'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24c4-8 8-8 12 0s8 8 12 0 8-8 12 0 8 8 12 0" stroke="#3B82F6"/>
      <path d="M8 40c4-8 8-8 12 0s8 8 12 0 8-8 12 0 8 8 12 0" stroke="#EF4444"/>
      <text x="4" y="24" font-size="6" fill="currentColor" stroke="none">|0⟩</text>
      <text x="4" y="44" font-size="6" fill="currentColor" stroke="none">|1⟩</text>
      <text x="28" y="58" font-size="8" fill="currentColor" stroke="none">+</text>
    </svg>`
  },
  {
    id: 'quantum-wave-packet',
    name: 'Wave Packet',
    domain: 'physics',
    category: 'wavefunctions',
    tags: ['wave packet', 'localization', 'Gaussian', 'dispersion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c4 0 8-12 12-12s4 12 8 12 4-12 8-12 4 12 8 12 4-12 8-12 4 12 4 12" stroke-opacity="0.5"/>
      <ellipse cx="32" cy="32" rx="16" ry="12" fill="currentColor" opacity="0.1"/>
      <path d="M16 32c2-8 4-8 6 0s4 8 6 0 4-8 6 0 4 8 6 0 4-8 6 0"/>
    </svg>`
  },
  {
    id: 'quantum-tunneling',
    name: 'Quantum Tunneling',
    domain: 'physics',
    category: 'wavefunctions',
    tags: ['tunneling', 'barrier', 'penetration', 'evanescent'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="26" y="16" width="12" height="32" fill="currentColor" opacity="0.3"/>
      <path d="M8 32c2-6 4-6 6 0s4 6 6 0 4-6 6 0"/>
      <path d="M38 32c2-3 4-3 6 0s4 3 6 0 4-3 6 0" stroke-dasharray="3 2"/>
      <text x="28" y="56" font-size="6" fill="currentColor" stroke="none">V₀</text>
      <path d="M8 48h18"/>
      <path d="M38 48h18"/>
    </svg>`
  },

  // ===========================================================================
  // OPERATORS
  // ===========================================================================
  {
    id: 'quantum-hamiltonian',
    name: 'Hamiltonian Operator',
    domain: 'physics',
    category: 'operators',
    tags: ['Hamiltonian', 'energy', 'operator', 'H hat', 'eigenvalue'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <text x="18" y="42" font-size="28" font-weight="bold" fill="currentColor" stroke="none">H</text>
      <path d="M16 16h32"/>
      <path d="M32 8v8"/>
      <circle cx="32" cy="32" r="24" stroke-dasharray="4 2"/>
    </svg>`
  },
  {
    id: 'quantum-momentum-operator',
    name: 'Momentum Operator',
    domain: 'physics',
    category: 'operators',
    tags: ['momentum', 'operator', 'p hat', 'derivative', 'canonical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <text x="20" y="42" font-size="28" font-style="italic" fill="currentColor" stroke="none">p</text>
      <path d="M18 16h28"/>
      <path d="M32 8v8"/>
      <path d="M44 32l12 0"/>
      <path d="M52 28l4 4-4 4"/>
    </svg>`
  },
  {
    id: 'quantum-position-operator',
    name: 'Position Operator',
    domain: 'physics',
    category: 'operators',
    tags: ['position', 'operator', 'x hat', 'coordinate', 'observable'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <text x="22" y="42" font-size="28" font-style="italic" fill="currentColor" stroke="none">x</text>
      <path d="M20" y1="16" x2="44" y2="16"/>
      <path d="M32 8v8"/>
      <line x1="8" y1="56" x2="56" y2="56"/>
      <circle cx="32" cy="56" r="3" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'quantum-ladder-operators',
    name: 'Ladder Operators',
    domain: 'physics',
    category: 'operators',
    tags: ['ladder', 'creation', 'annihilation', 'raising', 'lowering'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <text x="8" y="36" font-size="18" fill="currentColor" stroke="none">a†</text>
      <text x="40" y="36" font-size="18" fill="currentColor" stroke="none">a</text>
      <path d="M8 44l12-24"/>
      <path d="M20 44l-12 0"/>
      <path d="M44 44l12 0"/>
      <path d="M44 44l12-24"/>
    </svg>`
  },

  // ===========================================================================
  // SPIN SYSTEMS
  // ===========================================================================
  {
    id: 'quantum-spin-up',
    name: 'Spin Up State',
    domain: 'physics',
    category: 'spin',
    tags: ['spin', 'up', 'eigenstate', 'Sz', 'plus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M32 20v24"/>
      <path d="M26 26l6-6 6 6"/>
      <ellipse cx="32" cy="32" rx="12" ry="4" stroke-dasharray="3 2"/>
      <text x="8" y="58" font-size="8" fill="currentColor" stroke="none">|↑⟩</text>
    </svg>`
  },
  {
    id: 'quantum-spin-down',
    name: 'Spin Down State',
    domain: 'physics',
    category: 'spin',
    tags: ['spin', 'down', 'eigenstate', 'Sz', 'minus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M32 20v24"/>
      <path d="M26 38l6 6 6-6"/>
      <ellipse cx="32" cy="32" rx="12" ry="4" stroke-dasharray="3 2"/>
      <text x="8" y="58" font-size="8" fill="currentColor" stroke="none">|↓⟩</text>
    </svg>`
  },
  {
    id: 'quantum-bloch-sphere',
    name: 'Bloch Sphere',
    domain: 'physics',
    category: 'spin',
    tags: ['Bloch', 'sphere', 'qubit', 'state', 'visualization'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22"/>
      <ellipse cx="32" cy="32" rx="22" ry="8" stroke-dasharray="3 2"/>
      <line x1="32" y1="10" x2="32" y2="54"/>
      <line x1="10" y1="32" x2="54" y2="32"/>
      <circle cx="32" cy="10" r="3" fill="currentColor"/>
      <circle cx="32" cy="54" r="3"/>
      <path d="M32 32l12-10" stroke="#EF4444" stroke-width="2"/>
      <circle cx="44" cy="22" r="2" fill="#EF4444"/>
      <text x="4" y="12" font-size="6" fill="currentColor" stroke="none">|0⟩</text>
      <text x="4" y="58" font-size="6" fill="currentColor" stroke="none">|1⟩</text>
    </svg>`
  },
  {
    id: 'quantum-pauli-matrices',
    name: 'Pauli Matrices',
    domain: 'physics',
    category: 'spin',
    tags: ['Pauli', 'matrices', 'sigma', 'spin', 'SU2'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <text x="8" y="24" font-size="12" fill="currentColor" stroke="none">σₓ</text>
      <text x="28" y="24" font-size="12" fill="currentColor" stroke="none">σᵧ</text>
      <text x="48" y="24" font-size="12" fill="currentColor" stroke="none">σᵤ</text>
      <rect x="4" y="32" width="16" height="16" rx="2"/>
      <rect x="24" y="32" width="16" height="16" rx="2"/>
      <rect x="44" y="32" width="16" height="16" rx="2"/>
      <text x="8" y="56" font-size="6" fill="currentColor" stroke="none">X</text>
      <text x="28" y="56" font-size="6" fill="currentColor" stroke="none">Y</text>
      <text x="48" y="56" font-size="6" fill="currentColor" stroke="none">Z</text>
    </svg>`
  },

  // ===========================================================================
  // ENTANGLEMENT
  // ===========================================================================
  {
    id: 'quantum-entanglement',
    name: 'Entangled Pair',
    domain: 'physics',
    category: 'entanglement',
    tags: ['entanglement', 'EPR', 'correlation', 'nonlocal', 'Bell'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="32" r="10"/>
      <circle cx="48" cy="32" r="10"/>
      <path d="M26 32c6-8 6 8 12 0"/>
      <path d="M16 22v20"/>
      <path d="M12 26l4-4 4 4"/>
      <path d="M48 22v20"/>
      <path d="M44 38l4 4 4-4"/>
      <text x="6" y="56" font-size="6" fill="currentColor" stroke="none">|↑⟩</text>
      <text x="38" y="56" font-size="6" fill="currentColor" stroke="none">|↓⟩</text>
    </svg>`
  },
  {
    id: 'quantum-bell-state',
    name: 'Bell State',
    domain: 'physics',
    category: 'entanglement',
    tags: ['Bell state', 'maximally entangled', 'EPR pair', 'singlet'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 20h48v24H8z" fill="currentColor" opacity="0.1"/>
      <text x="12" y="36" font-size="10" fill="currentColor" stroke="none">|Φ⁺⟩ = </text>
      <text x="36" y="32" font-size="7" fill="currentColor" stroke="none">|00⟩+|11⟩</text>
      <line x1="36" y1="34" x2="58" y2="34"/>
      <text x="44" y="42" font-size="7" fill="currentColor" stroke="none">√2</text>
      <path d="M8 48c4-4 8 0 12 0s8-4 12 0 8 4 12 0 8-4 8 0" stroke-dasharray="3 2"/>
    </svg>`
  },
  {
    id: 'quantum-epr-paradox',
    name: 'EPR Setup',
    domain: 'physics',
    category: 'entanglement',
    tags: ['EPR', 'Einstein', 'Podolsky', 'Rosen', 'paradox', 'locality'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.3"/>
      <path d="M24 32H8"/>
      <path d="M40 32h16"/>
      <rect x="4" y="26" width="8" height="12" rx="1"/>
      <rect x="52" y="26" width="8" height="12" rx="1"/>
      <path d="M8 20l4-4"/>
      <path d="M8 44l4 4"/>
      <path d="M56 20l-4-4"/>
      <path d="M56 44l-4 4"/>
      <text x="2" y="58" font-size="5" fill="currentColor" stroke="none">Alice</text>
      <text x="50" y="58" font-size="5" fill="currentColor" stroke="none">Bob</text>
    </svg>`
  },

  // ===========================================================================
  // ATOMIC ORBITALS
  // ===========================================================================
  {
    id: 'quantum-s-orbital',
    name: 'S Orbital',
    domain: 'physics',
    category: 'orbitals',
    tags: ['s orbital', 'spherical', 'l=0', 'ground state', 'hydrogen'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <text x="24" y="58" font-size="10" fill="currentColor" stroke="none">1s</text>
    </svg>`
  },
  {
    id: 'quantum-p-orbital',
    name: 'P Orbital',
    domain: 'physics',
    category: 'orbitals',
    tags: ['p orbital', 'dumbbell', 'l=1', 'nodal plane', 'directional'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="18" rx="10" ry="14" fill="#3B82F6" opacity="0.3"/>
      <ellipse cx="32" cy="46" rx="10" ry="14" fill="#EF4444" opacity="0.3"/>
      <ellipse cx="32" cy="18" rx="10" ry="14"/>
      <ellipse cx="32" cy="46" rx="10" ry="14"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
      <text x="24" y="60" font-size="8" fill="currentColor" stroke="none">2p</text>
    </svg>`
  },
  {
    id: 'quantum-d-orbital',
    name: 'D Orbital',
    domain: 'physics',
    category: 'orbitals',
    tags: ['d orbital', 'cloverleaf', 'l=2', 'transition metals'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="20" rx="12" ry="8" transform="rotate(-45 20 20)" fill="currentColor" opacity="0.2"/>
      <ellipse cx="44" cy="20" rx="12" ry="8" transform="rotate(45 44 20)" fill="currentColor" opacity="0.2"/>
      <ellipse cx="20" cy="44" rx="12" ry="8" transform="rotate(45 20 44)" fill="currentColor" opacity="0.2"/>
      <ellipse cx="44" cy="44" rx="12" ry="8" transform="rotate(-45 44 44)" fill="currentColor" opacity="0.2"/>
      <ellipse cx="20" cy="20" rx="12" ry="8" transform="rotate(-45 20 20)"/>
      <ellipse cx="44" cy="20" rx="12" ry="8" transform="rotate(45 44 20)"/>
      <ellipse cx="20" cy="44" rx="12" ry="8" transform="rotate(45 20 44)"/>
      <ellipse cx="44" cy="44" rx="12" ry="8" transform="rotate(-45 44 44)"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'quantum-f-orbital',
    name: 'F Orbital',
    domain: 'physics',
    category: 'orbitals',
    tags: ['f orbital', 'l=3', 'lanthanides', 'actinides', 'complex'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-8 8-8 16 0 24 8-8 8-16 0-24z" fill="currentColor" opacity="0.2"/>
      <path d="M32 56c-8-8-8-16 0-24 8 8 8 16 0 24z" fill="currentColor" opacity="0.2"/>
      <path d="M8 32c8-8 16-8 24 0-8 8-16 8-24 0z" fill="currentColor" opacity="0.2"/>
      <path d="M56 32c-8-8-16-8-24 0 8 8 16 8 24 0z" fill="currentColor" opacity="0.2"/>
      <path d="M32 8c-8 8-8 16 0 24 8-8 8-16 0-24z"/>
      <path d="M32 56c-8-8-8-16 0-24 8 8 8 16 0 24z"/>
      <path d="M8 32c8-8 16-8 24 0-8 8-16 8-24 0z"/>
      <path d="M56 32c-8-8-16-8-24 0 8 8 16 8 24 0z"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'quantum-hybrid-orbital',
    name: 'Hybrid Orbital sp3',
    domain: 'physics',
    category: 'orbitals',
    tags: ['hybrid', 'sp3', 'tetrahedral', 'bonding', 'carbon'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <path d="M32 32l-16-16"/>
      <path d="M32 32l16-12"/>
      <path d="M32 32l-12 16"/>
      <path d="M32 32l14 14"/>
      <ellipse cx="20" cy="20" rx="8" ry="5" transform="rotate(-45 20 20)" fill="currentColor" opacity="0.2"/>
      <ellipse cx="44" cy="24" rx="8" ry="5" transform="rotate(-30 44 24)" fill="currentColor" opacity="0.2"/>
      <ellipse cx="24" cy="44" rx="8" ry="5" transform="rotate(50 24 44)" fill="currentColor" opacity="0.2"/>
      <ellipse cx="42" cy="42" rx="8" ry="5" transform="rotate(45 42 42)" fill="currentColor" opacity="0.2"/>
    </svg>`
  },

  // ===========================================================================
  // QUANTUM STATES & NOTATION
  // ===========================================================================
  {
    id: 'quantum-ket',
    name: 'Ket Vector',
    domain: 'physics',
    category: 'notation',
    tags: ['ket', 'Dirac', 'notation', 'state vector', 'bra-ket'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 12v40"/>
      <text x="22" y="38" font-size="20" font-style="italic" fill="currentColor" stroke="none">ψ</text>
      <path d="M44 12l8 20-8 20"/>
      <circle cx="32" cy="32" r="24" stroke-dasharray="4 2" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'quantum-bra',
    name: 'Bra Vector',
    domain: 'physics',
    category: 'notation',
    tags: ['bra', 'Dirac', 'notation', 'dual vector', 'conjugate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 12l-8 20 8 20"/>
      <text x="26" y="38" font-size="20" font-style="italic" fill="currentColor" stroke="none">ψ</text>
      <path d="M48 12v40"/>
      <circle cx="32" cy="32" r="24" stroke-dasharray="4 2" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'quantum-bracket',
    name: 'Inner Product',
    domain: 'physics',
    category: 'notation',
    tags: ['bracket', 'inner product', 'overlap', 'amplitude', 'Dirac'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 12l-6 20 6 20"/>
      <text x="16" y="36" font-size="14" font-style="italic" fill="currentColor" stroke="none">φ</text>
      <path d="M32 12v40"/>
      <text x="38" y="36" font-size="14" font-style="italic" fill="currentColor" stroke="none">ψ</text>
      <path d="M52 12l6 20-6 20"/>
    </svg>`
  },
  {
    id: 'quantum-commutator',
    name: 'Commutator',
    domain: 'physics',
    category: 'notation',
    tags: ['commutator', 'uncertainty', 'canonical', 'observable'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16h6v32H8"/>
      <text x="18" y="36" font-size="12" fill="currentColor" stroke="none">A,B</text>
      <path d="M50 16h6v32h-6"/>
      <text x="14" y="56" font-size="10" fill="currentColor" stroke="none">= AB - BA</text>
    </svg>`
  },
  {
    id: 'quantum-density-matrix',
    name: 'Density Matrix',
    domain: 'physics',
    category: 'notation',
    tags: ['density matrix', 'rho', 'mixed state', 'statistical', 'ensemble'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <text x="24" y="40" font-size="24" font-style="italic" fill="currentColor" stroke="none">ρ</text>
      <rect x="12" y="12" width="40" height="40" rx="2"/>
      <line x1="32" y1="12" x2="32" y2="52" stroke-dasharray="3 2"/>
      <line x1="12" y1="32" x2="52" y2="32" stroke-dasharray="3 2"/>
    </svg>`
  },
];

export default quantumIcons;
