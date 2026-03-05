/**
 * mathematics.ts
 * Mathematics icon definitions for FINNISH Icon Library
 *
 * Comprehensive mathematics icons covering:
 * - Algebra (equations, variables, polynomials)
 * - Calculus (derivatives, integrals, limits)
 * - Geometry (shapes, angles, transformations)
 * - Trigonometry (functions, unit circle, identities)
 * - Statistics & Probability (distributions, data)
 * - Linear Algebra (matrices, vectors, transforms)
 * - Graph Theory (nodes, edges, networks)
 * - Set Theory (sets, operations, Venn diagrams)
 * - Number Theory (primes, sequences, series)
 * - Mathematical Functions (plots, curves)
 * - Coordinate Systems (Cartesian, polar, 3D)
 * - Logic & Proofs (symbols, quantifiers)
 *
 * Ralph Loop Iteration 1 - Mathematics COMPLETE
 */

import type { IconDefinition } from './index';

/**
 * Mathematics domain icons collection
 */
export const mathematicsIcons: IconDefinition[] = [
  // ===========================================================================
  // ALGEBRA & EQUATIONS
  // ===========================================================================
  {
    id: 'math-equals',
    name: 'Equals Sign',
    domain: 'physics',
    category: 'algebra',
    tags: ['equals', 'equality', 'equation', 'balance', 'math'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="4" y1="9" x2="20" y2="9"/>
  <line x1="4" y1="15" x2="20" y2="15"/>
</svg>`,
  },
  {
    id: 'math-plus-minus',
    name: 'Plus Minus',
    domain: 'physics',
    category: 'algebra',
    tags: ['plus', 'minus', 'plus-minus', 'operations', 'arithmetic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="4" y1="7" x2="20" y2="7"/>
  <line x1="12" y1="3" x2="12" y2="11"/>
  <line x1="4" y1="17" x2="20" y2="17"/>
</svg>`,
  },
  {
    id: 'math-variable-x',
    name: 'Variable X',
    domain: 'physics',
    category: 'algebra',
    tags: ['variable', 'unknown', 'x', 'algebra', 'symbol'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 4l16 16"/>
  <path d="M20 4L4 20"/>
</svg>`,
  },
  {
    id: 'math-polynomial',
    name: 'Polynomial',
    domain: 'physics',
    category: 'algebra',
    tags: ['polynomial', 'equation', 'degree', 'coefficient', 'terms'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <text x="4" y="24" font-size="14" fill="currentColor" stroke="none">x</text>
  <text x="14" y="18" font-size="10" fill="currentColor" stroke="none">3</text>
  <text x="24" y="24" font-size="14" fill="currentColor" stroke="none">+</text>
  <text x="34" y="24" font-size="14" fill="currentColor" stroke="none">2x</text>
  <text x="52" y="18" font-size="10" fill="currentColor" stroke="none">2</text>
  <text x="4" y="48" font-size="14" fill="currentColor" stroke="none">- 3x + 1</text>
</svg>`,
  },
  {
    id: 'math-quadratic',
    name: 'Quadratic Formula',
    domain: 'physics',
    category: 'algebra',
    tags: ['quadratic', 'formula', 'roots', 'parabola', 'discriminant'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <text x="8" y="24" font-size="12" fill="currentColor" stroke="none">x =</text>
  <line x1="28" y1="28" x2="56" y2="28"/>
  <text x="28" y="24" font-size="10" fill="currentColor" stroke="none">-b +/- sqrt</text>
  <text x="32" y="40" font-size="10" fill="currentColor" stroke="none">2a</text>
</svg>`,
  },
  {
    id: 'math-absolute-value',
    name: 'Absolute Value',
    domain: 'physics',
    category: 'algebra',
    tags: ['absolute', 'value', 'magnitude', 'modulus', 'distance'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="6" y1="4" x2="6" y2="20"/>
  <text x="9" y="15" font-size="10" fill="currentColor" stroke="none">x</text>
  <line x1="18" y1="4" x2="18" y2="20"/>
</svg>`,
  },
  {
    id: 'math-factorial',
    name: 'Factorial',
    domain: 'physics',
    category: 'algebra',
    tags: ['factorial', 'permutation', 'combination', 'n!', 'product'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <text x="4" y="17" font-size="16" fill="currentColor" stroke="none">n!</text>
</svg>`,
  },
  {
    id: 'math-exponent',
    name: 'Exponent',
    domain: 'physics',
    category: 'algebra',
    tags: ['exponent', 'power', 'superscript', 'exponential', 'index'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <text x="4" y="18" font-size="16" fill="currentColor" stroke="none">x</text>
  <text x="14" y="10" font-size="10" fill="currentColor" stroke="none">n</text>
</svg>`,
  },
  {
    id: 'math-radical',
    name: 'Square Root',
    domain: 'physics',
    category: 'algebra',
    tags: ['radical', 'root', 'square root', 'sqrt', 'nth root'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12l3 8l6-16h7"/>
  <line x1="13" y1="4" x2="20" y2="4"/>
</svg>`,
  },
  {
    id: 'math-logarithm',
    name: 'Logarithm',
    domain: 'physics',
    category: 'algebra',
    tags: ['logarithm', 'log', 'ln', 'natural log', 'base'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <text x="2" y="16" font-size="12" fill="currentColor" stroke="none">log</text>
  <text x="18" y="18" font-size="8" fill="currentColor" stroke="none">b</text>
</svg>`,
  },

  // ===========================================================================
  // CALCULUS
  // ===========================================================================
  {
    id: 'math-integral',
    name: 'Integral',
    domain: 'physics',
    category: 'calculus',
    tags: ['integral', 'integration', 'antiderivative', 'area', 'calculus'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M8 4c-2 0-3 2-3 4v8c0 2-1 4-3 4"/>
  <line x1="12" y1="4" x2="12" y2="20"/>
  <text x="14" y="14" font-size="10" fill="currentColor" stroke="none">f(x)dx</text>
</svg>`,
  },
  {
    id: 'math-definite-integral',
    name: 'Definite Integral',
    domain: 'physics',
    category: 'calculus',
    tags: ['definite', 'integral', 'bounds', 'area', 'limits'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M16 8c-4 0-6 4-6 8v24c0 4-2 8-6 8"/>
  <text x="6" y="12" font-size="10" fill="currentColor" stroke="none">b</text>
  <text x="6" y="58" font-size="10" fill="currentColor" stroke="none">a</text>
  <text x="20" y="36" font-size="12" fill="currentColor" stroke="none">f(x)dx</text>
</svg>`,
  },
  {
    id: 'math-derivative',
    name: 'Derivative',
    domain: 'physics',
    category: 'calculus',
    tags: ['derivative', 'differentiation', 'slope', 'rate', 'tangent'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <text x="4" y="10" font-size="10" fill="currentColor" stroke="none">dy</text>
  <line x1="4" y1="12" x2="16" y2="12"/>
  <text x="4" y="22" font-size="10" fill="currentColor" stroke="none">dx</text>
</svg>`,
  },
  {
    id: 'math-partial-derivative',
    name: 'Partial Derivative',
    domain: 'physics',
    category: 'calculus',
    tags: ['partial', 'derivative', 'multivariable', 'gradient', 'del'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <text x="8" y="24" font-size="20" fill="currentColor" stroke="none">d</text>
  <text x="28" y="24" font-size="14" fill="currentColor" stroke="none">f</text>
  <line x1="8" y1="32" x2="48" y2="32"/>
  <text x="8" y="48" font-size="20" fill="currentColor" stroke="none">d</text>
  <text x="28" y="48" font-size="14" fill="currentColor" stroke="none">x</text>
</svg>`,
  },
  {
    id: 'math-limit',
    name: 'Limit',
    domain: 'physics',
    category: 'calculus',
    tags: ['limit', 'approach', 'convergence', 'infinity', 'calculus'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <text x="4" y="28" font-size="12" fill="currentColor" stroke="none">lim</text>
  <text x="4" y="44" font-size="10" fill="currentColor" stroke="none">x->a</text>
  <text x="32" y="32" font-size="14" fill="currentColor" stroke="none">f(x)</text>
</svg>`,
  },
  {
    id: 'math-sigma-summation',
    name: 'Summation',
    domain: 'physics',
    category: 'calculus',
    tags: ['summation', 'sigma', 'sum', 'series', 'discrete'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 4h12l-8 8l8 8H4"/>
</svg>`,
  },
  {
    id: 'math-product',
    name: 'Product (Pi)',
    domain: 'physics',
    category: 'calculus',
    tags: ['product', 'pi', 'multiplication', 'series', 'sequence'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="4" y1="6" x2="20" y2="6"/>
  <line x1="8" y1="6" x2="8" y2="20"/>
  <line x1="16" y1="6" x2="16" y2="20"/>
</svg>`,
  },
  {
    id: 'math-infinity',
    name: 'Infinity',
    domain: 'physics',
    category: 'calculus',
    tags: ['infinity', 'infinite', 'unbounded', 'limit', 'endless'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 12c-2-3-5-3-7 0s-5 3-7 0"/>
  <path d="M12 12c2 3 5 3 7 0s5-3 7 0" transform="translate(-12,0)"/>
  <path d="M4 12a4 4 0 0 1 8 0a4 4 0 0 0 8 0a4 4 0 0 1-8 0a4 4 0 0 0-8 0z"/>
</svg>`,
  },
  {
    id: 'math-delta',
    name: 'Delta',
    domain: 'physics',
    category: 'calculus',
    tags: ['delta', 'change', 'difference', 'triangle', 'variation'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12,4 4,20 20,20"/>
</svg>`,
  },
  {
    id: 'math-gradient',
    name: 'Gradient (Nabla)',
    domain: 'physics',
    category: 'calculus',
    tags: ['gradient', 'nabla', 'del', 'vector', 'differentiation'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12,20 4,4 20,4"/>
</svg>`,
  },

  // ===========================================================================
  // GEOMETRY
  // ===========================================================================
  {
    id: 'math-triangle',
    name: 'Triangle',
    domain: 'physics',
    category: 'geometry',
    tags: ['triangle', 'polygon', 'shape', 'three-sided', 'geometry'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12,3 3,20 21,20"/>
</svg>`,
  },
  {
    id: 'math-square',
    name: 'Square',
    domain: 'physics',
    category: 'geometry',
    tags: ['square', 'rectangle', 'quadrilateral', 'polygon', 'shape'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="4" width="16" height="16"/>
</svg>`,
  },
  {
    id: 'math-circle',
    name: 'Circle',
    domain: 'physics',
    category: 'geometry',
    tags: ['circle', 'round', 'ellipse', 'shape', 'radius'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="9"/>
</svg>`,
  },
  {
    id: 'math-pentagon',
    name: 'Pentagon',
    domain: 'physics',
    category: 'geometry',
    tags: ['pentagon', 'polygon', 'five-sided', 'shape', 'geometry'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12,2 22,9 19,21 5,21 2,9"/>
</svg>`,
  },
  {
    id: 'math-hexagon',
    name: 'Hexagon',
    domain: 'physics',
    category: 'geometry',
    tags: ['hexagon', 'polygon', 'six-sided', 'shape', 'geometry'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12,2 21,7 21,17 12,22 3,17 3,7"/>
</svg>`,
  },
  {
    id: 'math-angle',
    name: 'Angle',
    domain: 'physics',
    category: 'geometry',
    tags: ['angle', 'degree', 'radian', 'measurement', 'vertex'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 20h16"/>
  <path d="M4 20L16 4"/>
  <path d="M4 20a8 8 0 0 1 4-3"/>
</svg>`,
  },
  {
    id: 'math-right-angle',
    name: 'Right Angle',
    domain: 'physics',
    category: 'geometry',
    tags: ['right angle', '90 degrees', 'perpendicular', 'orthogonal'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 20h16"/>
  <path d="M4 20V4"/>
  <rect x="4" y="14" width="6" height="6"/>
</svg>`,
  },
  {
    id: 'math-parallel',
    name: 'Parallel Lines',
    domain: 'physics',
    category: 'geometry',
    tags: ['parallel', 'lines', 'equidistant', 'geometry', 'congruent'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="4" y1="8" x2="20" y2="8"/>
  <line x1="4" y1="16" x2="20" y2="16"/>
</svg>`,
  },
  {
    id: 'math-perpendicular',
    name: 'Perpendicular',
    domain: 'physics',
    category: 'geometry',
    tags: ['perpendicular', 'orthogonal', 'right angle', 'intersection'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="4" y1="12" x2="20" y2="12"/>
  <line x1="12" y1="4" x2="12" y2="20"/>
  <rect x="12" y="12" width="4" height="4"/>
</svg>`,
  },
  {
    id: 'math-sphere',
    name: 'Sphere',
    domain: 'physics',
    category: 'geometry',
    tags: ['sphere', '3D', 'ball', 'solid', 'surface'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="9"/>
  <ellipse cx="12" cy="12" rx="9" ry="3"/>
  <path d="M12 3c-2 3-2 15 0 18" stroke-dasharray="2 2"/>
</svg>`,
  },
  {
    id: 'math-cube',
    name: 'Cube',
    domain: 'physics',
    category: 'geometry',
    tags: ['cube', '3D', 'box', 'solid', 'hexahedron'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2l9 5v10l-9 5l-9-5V7z"/>
  <path d="M12 22V12"/>
  <path d="M12 12L3 7"/>
  <path d="M12 12l9-5"/>
</svg>`,
  },
  {
    id: 'math-cone',
    name: 'Cone',
    domain: 'physics',
    category: 'geometry',
    tags: ['cone', '3D', 'solid', 'surface', 'apex'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="18" rx="8" ry="3"/>
  <path d="M4 18L12 4l8 14"/>
</svg>`,
  },
  {
    id: 'math-cylinder',
    name: 'Cylinder',
    domain: 'physics',
    category: 'geometry',
    tags: ['cylinder', '3D', 'solid', 'circular', 'prism'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="5" rx="8" ry="3"/>
  <path d="M4 5v14"/>
  <path d="M20 5v14"/>
  <ellipse cx="12" cy="19" rx="8" ry="3"/>
</svg>`,
  },
  {
    id: 'math-pyramid',
    name: 'Pyramid',
    domain: 'physics',
    category: 'geometry',
    tags: ['pyramid', '3D', 'solid', 'tetrahedron', 'apex'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2L4 20h16z"/>
  <path d="M12 2l8 18"/>
  <path d="M4 20l8-8"/>
  <path d="M12 12l8 8" stroke-dasharray="2 2"/>
</svg>`,
  },

  // ===========================================================================
  // TRIGONOMETRY
  // ===========================================================================
  {
    id: 'math-sine-wave',
    name: 'Sine Wave',
    domain: 'physics',
    category: 'trigonometry',
    tags: ['sine', 'wave', 'oscillation', 'periodic', 'function'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0 4 4 6 0"/>
</svg>`,
  },
  {
    id: 'math-cosine-wave',
    name: 'Cosine Wave',
    domain: 'physics',
    category: 'trigonometry',
    tags: ['cosine', 'wave', 'oscillation', 'periodic', 'function'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 8c2 4 4 4 6 0s4-4 6 0 4 4 6 0 4-4 6 0"/>
</svg>`,
  },
  {
    id: 'math-unit-circle',
    name: 'Unit Circle',
    domain: 'physics',
    category: 'trigonometry',
    tags: ['unit circle', 'radian', 'angle', 'trigonometry', 'sin cos'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <line x1="8" y1="32" x2="56" y2="32"/>
  <line x1="32" y1="8" x2="32" y2="56"/>
  <circle cx="32" cy="32" r="20"/>
  <line x1="32" y1="32" x2="46" y2="20"/>
  <circle cx="46" cy="20" r="2" fill="currentColor"/>
  <path d="M38 32a6 6 0 0 1 1-4"/>
  <text x="40" y="28" font-size="6" fill="currentColor" stroke="none">theta</text>
</svg>`,
  },
  {
    id: 'math-tangent',
    name: 'Tangent',
    domain: 'physics',
    category: 'trigonometry',
    tags: ['tangent', 'tan', 'slope', 'angle', 'trigonometry'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <line x1="8" y1="56" x2="56" y2="56"/>
  <line x1="32" y1="8" x2="32" y2="56"/>
  <path d="M8 48c8-8 16-32 24-36s16 0 24 36"/>
  <line x1="32" y1="56" x2="32" y2="12" stroke-dasharray="3 2"/>
</svg>`,
  },
  {
    id: 'math-pythagorean',
    name: 'Pythagorean Theorem',
    domain: 'physics',
    category: 'trigonometry',
    tags: ['pythagorean', 'theorem', 'right triangle', 'hypotenuse', 'a^2+b^2=c^2'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="8,48 48,48 8,16"/>
  <rect x="8" y="40" width="8" height="8"/>
  <text x="24" y="56" font-size="8" fill="currentColor" stroke="none">a</text>
  <text x="2" y="34" font-size="8" fill="currentColor" stroke="none">b</text>
  <text x="30" y="28" font-size="8" fill="currentColor" stroke="none">c</text>
</svg>`,
  },

  // ===========================================================================
  // STATISTICS & PROBABILITY
  // ===========================================================================
  {
    id: 'math-normal-distribution',
    name: 'Normal Distribution',
    domain: 'physics',
    category: 'statistics',
    tags: ['normal', 'distribution', 'Gaussian', 'bell curve', 'probability'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <line x1="8" y1="48" x2="56" y2="48"/>
  <line x1="32" y1="8" x2="32" y2="48" stroke-dasharray="3 2"/>
  <path d="M8 48c4 0 8-4 12-12s6-20 12-20s8 12 12 20s8 12 12 12" fill="currentColor" opacity="0.1"/>
  <path d="M8 48c4 0 8-4 12-12s6-20 12-20s8 12 12 20s8 12 12 12"/>
  <text x="30" y="58" font-size="6" fill="currentColor" stroke="none">mu</text>
</svg>`,
  },
  {
    id: 'math-bar-chart',
    name: 'Bar Chart',
    domain: 'physics',
    category: 'statistics',
    tags: ['bar chart', 'histogram', 'frequency', 'data', 'visualization'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="4" y1="20" x2="20" y2="20"/>
  <rect x="6" y="10" width="3" height="10" fill="currentColor" opacity="0.3"/>
  <rect x="10" y="6" width="3" height="14" fill="currentColor" opacity="0.3"/>
  <rect x="14" y="12" width="3" height="8" fill="currentColor" opacity="0.3"/>
</svg>`,
  },
  {
    id: 'math-pie-chart',
    name: 'Pie Chart',
    domain: 'physics',
    category: 'statistics',
    tags: ['pie chart', 'proportion', 'percentage', 'data', 'circular'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="9"/>
  <path d="M12 12L12 3"/>
  <path d="M12 12L19 17"/>
  <path d="M12 12L5 17"/>
</svg>`,
  },
  {
    id: 'math-scatter-plot',
    name: 'Scatter Plot',
    domain: 'physics',
    category: 'statistics',
    tags: ['scatter', 'plot', 'correlation', 'data points', 'regression'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <line x1="4" y1="20" x2="4" y2="4"/>
  <line x1="4" y1="20" x2="20" y2="20"/>
  <circle cx="8" cy="16" r="1.5" fill="currentColor"/>
  <circle cx="10" cy="12" r="1.5" fill="currentColor"/>
  <circle cx="14" cy="10" r="1.5" fill="currentColor"/>
  <circle cx="16" cy="8" r="1.5" fill="currentColor"/>
  <circle cx="18" cy="6" r="1.5" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'math-box-plot',
    name: 'Box Plot',
    domain: 'physics',
    category: 'statistics',
    tags: ['box plot', 'whisker', 'quartile', 'median', 'distribution'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <line x1="8" y1="32" x2="20" y2="32"/>
  <rect x="20" y="20" width="24" height="24"/>
  <line x1="32" y1="20" x2="32" y2="44" stroke-width="2"/>
  <line x1="44" y1="32" x2="56" y2="32"/>
  <line x1="8" y1="28" x2="8" y2="36"/>
  <line x1="56" y1="28" x2="56" y2="36"/>
</svg>`,
  },
  {
    id: 'math-probability',
    name: 'Probability',
    domain: 'physics',
    category: 'statistics',
    tags: ['probability', 'P', 'chance', 'likelihood', 'event'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <text x="4" y="18" font-size="16" fill="currentColor" stroke="none">P(A)</text>
</svg>`,
  },
  {
    id: 'math-dice',
    name: 'Dice',
    domain: 'physics',
    category: 'statistics',
    tags: ['dice', 'random', 'probability', 'chance', 'experiment'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="4" width="16" height="16" rx="2"/>
  <circle cx="8" cy="8" r="1" fill="currentColor"/>
  <circle cx="16" cy="8" r="1" fill="currentColor"/>
  <circle cx="8" cy="16" r="1" fill="currentColor"/>
  <circle cx="16" cy="16" r="1" fill="currentColor"/>
  <circle cx="12" cy="12" r="1" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'math-expected-value',
    name: 'Expected Value',
    domain: 'physics',
    category: 'statistics',
    tags: ['expected', 'value', 'mean', 'average', 'E[X]'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <text x="2" y="18" font-size="14" fill="currentColor" stroke="none">E[X]</text>
</svg>`,
  },
  {
    id: 'math-variance',
    name: 'Variance',
    domain: 'physics',
    category: 'statistics',
    tags: ['variance', 'spread', 'dispersion', 'sigma squared', 'standard deviation'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <text x="4" y="18" font-size="14" fill="currentColor" stroke="none">sigma</text>
  <text x="16" y="12" font-size="10" fill="currentColor" stroke="none">2</text>
</svg>`,
  },

  // ===========================================================================
  // LINEAR ALGEBRA (MATRICES & VECTORS)
  // ===========================================================================
  {
    id: 'math-matrix',
    name: 'Matrix',
    domain: 'physics',
    category: 'linear-algebra',
    tags: ['matrix', 'array', 'linear algebra', 'rows', 'columns'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 8v48"/>
  <path d="M8 8h8"/>
  <path d="M8 56h8"/>
  <path d="M52 8v48"/>
  <path d="M48 8h8"/>
  <path d="M48 56h8"/>
  <text x="20" y="24" font-size="10" fill="currentColor" stroke="none">a b</text>
  <text x="20" y="40" font-size="10" fill="currentColor" stroke="none">c d</text>
</svg>`,
  },
  {
    id: 'math-determinant',
    name: 'Determinant',
    domain: 'physics',
    category: 'linear-algebra',
    tags: ['determinant', 'matrix', 'det', 'linear algebra', 'volume'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <line x1="16" y1="8" x2="16" y2="56"/>
  <line x1="48" y1="8" x2="48" y2="56"/>
  <text x="24" y="28" font-size="10" fill="currentColor" stroke="none">a b</text>
  <text x="24" y="44" font-size="10" fill="currentColor" stroke="none">c d</text>
</svg>`,
  },
  {
    id: 'math-vector',
    name: 'Vector',
    domain: 'physics',
    category: 'linear-algebra',
    tags: ['vector', 'arrow', 'direction', 'magnitude', 'linear algebra'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="4" y1="20" x2="20" y2="4"/>
  <polyline points="14,4 20,4 20,10"/>
</svg>`,
  },
  {
    id: 'math-dot-product',
    name: 'Dot Product',
    domain: 'physics',
    category: 'linear-algebra',
    tags: ['dot product', 'scalar product', 'inner product', 'projection'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <text x="2" y="16" font-size="12" fill="currentColor" stroke="none">a</text>
  <circle cx="12" cy="12" r="2" fill="currentColor"/>
  <text x="16" y="16" font-size="12" fill="currentColor" stroke="none">b</text>
</svg>`,
  },
  {
    id: 'math-cross-product',
    name: 'Cross Product',
    domain: 'physics',
    category: 'linear-algebra',
    tags: ['cross product', 'vector product', 'perpendicular', '3D'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <text x="2" y="16" font-size="12" fill="currentColor" stroke="none">a</text>
  <path d="M10 8l4 8"/>
  <path d="M14 8l-4 8"/>
  <text x="18" y="16" font-size="12" fill="currentColor" stroke="none">b</text>
</svg>`,
  },
  {
    id: 'math-eigenvalue',
    name: 'Eigenvalue',
    domain: 'physics',
    category: 'linear-algebra',
    tags: ['eigenvalue', 'eigenvector', 'lambda', 'characteristic', 'spectrum'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <text x="4" y="18" font-size="16" fill="currentColor" stroke="none">lambda</text>
</svg>`,
  },
  {
    id: 'math-transpose',
    name: 'Transpose',
    domain: 'physics',
    category: 'linear-algebra',
    tags: ['transpose', 'matrix', 'flip', 'rows columns', 'superscript T'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <text x="4" y="16" font-size="14" fill="currentColor" stroke="none">A</text>
  <text x="14" y="10" font-size="10" fill="currentColor" stroke="none">T</text>
</svg>`,
  },
  {
    id: 'math-inverse',
    name: 'Inverse Matrix',
    domain: 'physics',
    category: 'linear-algebra',
    tags: ['inverse', 'matrix', 'reciprocal', 'A^-1', 'linear algebra'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <text x="4" y="16" font-size="14" fill="currentColor" stroke="none">A</text>
  <text x="14" y="10" font-size="10" fill="currentColor" stroke="none">-1</text>
</svg>`,
  },

  // ===========================================================================
  // GRAPH THEORY
  // ===========================================================================
  {
    id: 'math-graph-node',
    name: 'Graph Node',
    domain: 'physics',
    category: 'graph-theory',
    tags: ['node', 'vertex', 'graph', 'network', 'point'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="6" fill="currentColor" opacity="0.3"/>
  <circle cx="12" cy="12" r="6"/>
</svg>`,
  },
  {
    id: 'math-graph-edge',
    name: 'Graph Edge',
    domain: 'physics',
    category: 'graph-theory',
    tags: ['edge', 'connection', 'link', 'graph', 'line'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="6" cy="12" r="3" fill="currentColor" opacity="0.3"/>
  <circle cx="18" cy="12" r="3" fill="currentColor" opacity="0.3"/>
  <line x1="9" y1="12" x2="15" y2="12"/>
</svg>`,
  },
  {
    id: 'math-directed-graph',
    name: 'Directed Graph',
    domain: 'physics',
    category: 'graph-theory',
    tags: ['directed', 'graph', 'digraph', 'arrow', 'network'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="6" cy="12" r="3"/>
  <circle cx="18" cy="12" r="3"/>
  <line x1="9" y1="12" x2="13" y2="12"/>
  <polyline points="13,9 15,12 13,15"/>
</svg>`,
  },
  {
    id: 'math-tree',
    name: 'Tree',
    domain: 'physics',
    category: 'graph-theory',
    tags: ['tree', 'hierarchy', 'acyclic', 'graph', 'root'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="32" cy="12" r="6"/>
  <circle cx="16" cy="32" r="6"/>
  <circle cx="48" cy="32" r="6"/>
  <circle cx="8" cy="52" r="5"/>
  <circle cx="24" cy="52" r="5"/>
  <circle cx="40" cy="52" r="5"/>
  <circle cx="56" cy="52" r="5"/>
  <line x1="32" y1="18" x2="16" y2="26"/>
  <line x1="32" y1="18" x2="48" y2="26"/>
  <line x1="16" y1="38" x2="8" y2="47"/>
  <line x1="16" y1="38" x2="24" y2="47"/>
  <line x1="48" y1="38" x2="40" y2="47"/>
  <line x1="48" y1="38" x2="56" y2="47"/>
</svg>`,
  },
  {
    id: 'math-cycle',
    name: 'Cycle Graph',
    domain: 'physics',
    category: 'graph-theory',
    tags: ['cycle', 'loop', 'circuit', 'graph', 'closed'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="32" cy="12" r="6"/>
  <circle cx="52" cy="32" r="6"/>
  <circle cx="44" cy="52" r="6"/>
  <circle cx="20" cy="52" r="6"/>
  <circle cx="12" cy="32" r="6"/>
  <line x1="36" y1="16" x2="48" y2="28"/>
  <line x1="52" y1="38" x2="48" y2="48"/>
  <line x1="40" y1="54" x2="26" y2="54"/>
  <line x1="16" y1="48" x2="14" y2="38"/>
  <line x1="16" y1="28" x2="28" y2="16"/>
</svg>`,
  },
  {
    id: 'math-complete-graph',
    name: 'Complete Graph',
    domain: 'physics',
    category: 'graph-theory',
    tags: ['complete', 'clique', 'fully connected', 'K_n', 'graph'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="32" cy="8" r="5"/>
  <circle cx="56" cy="32" r="5"/>
  <circle cx="44" cy="56" r="5"/>
  <circle cx="20" cy="56" r="5"/>
  <circle cx="8" cy="32" r="5"/>
  <line x1="32" y1="13" x2="51" y2="28"/>
  <line x1="32" y1="13" x2="13" y2="28"/>
  <line x1="32" y1="13" x2="44" y2="51"/>
  <line x1="32" y1="13" x2="20" y2="51"/>
  <line x1="51" y1="36" x2="44" y2="51"/>
  <line x1="13" y1="36" x2="20" y2="51"/>
  <line x1="51" y1="36" x2="13" y2="36"/>
  <line x1="44" y1="56" x2="20" y2="56"/>
  <line x1="51" y1="36" x2="20" y2="51"/>
  <line x1="13" y1="36" x2="44" y2="51"/>
</svg>`,
  },

  // ===========================================================================
  // SET THEORY
  // ===========================================================================
  {
    id: 'math-set',
    name: 'Set',
    domain: 'physics',
    category: 'set-theory',
    tags: ['set', 'collection', 'elements', 'braces', 'membership'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M8 4c-3 0-4 2-4 4v8c0 2 1 4 4 4"/>
  <path d="M16 4c3 0 4 2 4 4v8c0 2-1 4-4 4"/>
</svg>`,
  },
  {
    id: 'math-venn-diagram',
    name: 'Venn Diagram',
    domain: 'physics',
    category: 'set-theory',
    tags: ['venn', 'diagram', 'intersection', 'union', 'sets'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="24" cy="32" r="18" fill="currentColor" opacity="0.1"/>
  <circle cx="40" cy="32" r="18" fill="currentColor" opacity="0.1"/>
  <circle cx="24" cy="32" r="18"/>
  <circle cx="40" cy="32" r="18"/>
  <text x="12" y="34" font-size="10" fill="currentColor" stroke="none">A</text>
  <text x="46" y="34" font-size="10" fill="currentColor" stroke="none">B</text>
</svg>`,
  },
  {
    id: 'math-union',
    name: 'Union',
    domain: 'physics',
    category: 'set-theory',
    tags: ['union', 'or', 'combine', 'sets', 'cup'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 4v8a8 8 0 0 0 16 0V4"/>
</svg>`,
  },
  {
    id: 'math-intersection',
    name: 'Intersection',
    domain: 'physics',
    category: 'set-theory',
    tags: ['intersection', 'and', 'common', 'sets', 'cap'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 20v-8a8 8 0 0 1 16 0v8"/>
</svg>`,
  },
  {
    id: 'math-subset',
    name: 'Subset',
    domain: 'physics',
    category: 'set-theory',
    tags: ['subset', 'contained', 'part of', 'inclusion', 'proper'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M16 4c-6 0-12 4-12 8s6 8 12 8"/>
  <line x1="4" y1="16" x2="20" y2="16"/>
</svg>`,
  },
  {
    id: 'math-element-of',
    name: 'Element Of',
    domain: 'physics',
    category: 'set-theory',
    tags: ['element', 'member', 'belongs to', 'in', 'epsilon'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M20 6c-8 0-14 3-14 6s6 6 14 6"/>
  <line x1="6" y1="12" x2="16" y2="12"/>
</svg>`,
  },
  {
    id: 'math-empty-set',
    name: 'Empty Set',
    domain: 'physics',
    category: 'set-theory',
    tags: ['empty', 'null', 'void', 'zero', 'phi'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <line x1="6" y1="6" x2="18" y2="18"/>
</svg>`,
  },

  // ===========================================================================
  // NUMBER THEORY
  // ===========================================================================
  {
    id: 'math-prime',
    name: 'Prime Number',
    domain: 'physics',
    category: 'number-theory',
    tags: ['prime', 'number', 'divisor', 'factor', 'indivisible'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <text x="2" y="18" font-size="14" fill="currentColor" stroke="none">P</text>
</svg>`,
  },
  {
    id: 'math-natural-numbers',
    name: 'Natural Numbers',
    domain: 'physics',
    category: 'number-theory',
    tags: ['natural', 'numbers', 'counting', 'positive integers', 'N'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <text x="6" y="18" font-size="16" font-weight="bold" fill="currentColor" stroke="none">N</text>
  <line x1="6" y1="6" x2="6" y2="20"/>
</svg>`,
  },
  {
    id: 'math-integers',
    name: 'Integers',
    domain: 'physics',
    category: 'number-theory',
    tags: ['integers', 'whole numbers', 'Z', 'negative', 'positive'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <text x="6" y="18" font-size="16" font-weight="bold" fill="currentColor" stroke="none">Z</text>
  <line x1="6" y1="6" x2="16" y2="20"/>
</svg>`,
  },
  {
    id: 'math-rationals',
    name: 'Rational Numbers',
    domain: 'physics',
    category: 'number-theory',
    tags: ['rational', 'fraction', 'Q', 'quotient', 'ratio'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <text x="5" y="18" font-size="16" font-weight="bold" fill="currentColor" stroke="none">Q</text>
  <line x1="14" y1="6" x2="14" y2="20"/>
</svg>`,
  },
  {
    id: 'math-reals',
    name: 'Real Numbers',
    domain: 'physics',
    category: 'number-theory',
    tags: ['real', 'numbers', 'R', 'continuous', 'line'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <text x="5" y="18" font-size="16" font-weight="bold" fill="currentColor" stroke="none">R</text>
  <line x1="14" y1="6" x2="14" y2="20"/>
</svg>`,
  },
  {
    id: 'math-complex',
    name: 'Complex Numbers',
    domain: 'physics',
    category: 'number-theory',
    tags: ['complex', 'imaginary', 'C', 'i', 'plane'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <text x="5" y="18" font-size="16" font-weight="bold" fill="currentColor" stroke="none">C</text>
  <line x1="14" y1="6" x2="14" y2="20"/>
</svg>`,
  },
  {
    id: 'math-fibonacci',
    name: 'Fibonacci Sequence',
    domain: 'physics',
    category: 'number-theory',
    tags: ['fibonacci', 'sequence', 'golden ratio', 'recursive', 'pattern'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="24" width="8" height="8"/>
  <rect x="12" y="24" width="8" height="8"/>
  <rect x="12" y="16" width="8" height="8" fill="currentColor" opacity="0.2"/>
  <rect x="4" y="8" width="16" height="16"/>
  <rect x="20" y="8" width="24" height="24"/>
</svg>`,
  },
  {
    id: 'math-gcd',
    name: 'GCD',
    domain: 'physics',
    category: 'number-theory',
    tags: ['gcd', 'greatest common divisor', 'hcf', 'factor', 'divisibility'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <text x="1" y="16" font-size="10" fill="currentColor" stroke="none">gcd</text>
</svg>`,
  },
  {
    id: 'math-lcm',
    name: 'LCM',
    domain: 'physics',
    category: 'number-theory',
    tags: ['lcm', 'least common multiple', 'multiple', 'divisibility'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <text x="2" y="16" font-size="10" fill="currentColor" stroke="none">lcm</text>
</svg>`,
  },

  // ===========================================================================
  // COORDINATE SYSTEMS
  // ===========================================================================
  {
    id: 'math-cartesian-axes',
    name: 'Cartesian Axes',
    domain: 'physics',
    category: 'coordinates',
    tags: ['cartesian', 'axes', 'x-y', 'coordinate', 'grid'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="4" y1="12" x2="20" y2="12"/>
  <line x1="12" y1="4" x2="12" y2="20"/>
  <polyline points="18,10 20,12 18,14"/>
  <polyline points="10,6 12,4 14,6"/>
</svg>`,
  },
  {
    id: 'math-polar-coordinates',
    name: 'Polar Coordinates',
    domain: 'physics',
    category: 'coordinates',
    tags: ['polar', 'coordinates', 'r-theta', 'angle', 'radius'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="32" cy="32" r="8" stroke-dasharray="2 2"/>
  <circle cx="32" cy="32" r="16" stroke-dasharray="2 2"/>
  <circle cx="32" cy="32" r="24" stroke-dasharray="2 2"/>
  <line x1="32" y1="32" x2="56" y2="32"/>
  <line x1="32" y1="32" x2="48" y2="18"/>
  <circle cx="48" cy="18" r="3" fill="currentColor"/>
  <path d="M40 32a8 8 0 0 1 2-5"/>
  <text x="44" y="30" font-size="6" fill="currentColor" stroke="none">r</text>
</svg>`,
  },
  {
    id: 'math-3d-axes',
    name: '3D Axes',
    domain: 'physics',
    category: 'coordinates',
    tags: ['3D', 'axes', 'x-y-z', 'three dimensional', 'space'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <line x1="32" y1="56" x2="32" y2="16"/>
  <line x1="32" y1="36" x2="56" y2="48"/>
  <line x1="32" y1="36" x2="8" y2="48"/>
  <polyline points="30,20 32,16 34,20"/>
  <polyline points="52,46 56,48 52,50"/>
  <polyline points="12,50 8,48 12,46"/>
  <text x="28" y="12" font-size="6" fill="currentColor" stroke="none">z</text>
  <text x="56" y="52" font-size="6" fill="currentColor" stroke="none">x</text>
  <text x="2" y="52" font-size="6" fill="currentColor" stroke="none">y</text>
</svg>`,
  },
  {
    id: 'math-number-line',
    name: 'Number Line',
    domain: 'physics',
    category: 'coordinates',
    tags: ['number line', 'real line', 'axis', 'integers', 'scale'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <line x1="4" y1="32" x2="60" y2="32"/>
  <polyline points="56,28 60,32 56,36"/>
  <line x1="12" y1="28" x2="12" y2="36"/>
  <line x1="24" y1="28" x2="24" y2="36"/>
  <line x1="36" y1="28" x2="36" y2="36"/>
  <line x1="48" y1="28" x2="48" y2="36"/>
  <text x="10" y="44" font-size="8" fill="currentColor" stroke="none">-2</text>
  <text x="22" y="44" font-size="8" fill="currentColor" stroke="none">-1</text>
  <text x="34" y="44" font-size="8" fill="currentColor" stroke="none">0</text>
  <text x="46" y="44" font-size="8" fill="currentColor" stroke="none">1</text>
</svg>`,
  },

  // ===========================================================================
  // LOGIC & PROOFS
  // ===========================================================================
  {
    id: 'math-implies',
    name: 'Implies',
    domain: 'physics',
    category: 'logic',
    tags: ['implies', 'if-then', 'implication', 'conditional', 'arrow'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="4" y1="12" x2="18" y2="12"/>
  <polyline points="14,8 18,12 14,16"/>
</svg>`,
  },
  {
    id: 'math-iff',
    name: 'If and Only If',
    domain: 'physics',
    category: 'logic',
    tags: ['iff', 'biconditional', 'equivalent', 'double arrow'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="4" y1="12" x2="20" y2="12"/>
  <polyline points="8,8 4,12 8,16"/>
  <polyline points="16,8 20,12 16,16"/>
</svg>`,
  },
  {
    id: 'math-for-all',
    name: 'For All',
    domain: 'physics',
    category: 'logic',
    tags: ['forall', 'universal', 'quantifier', 'every', 'all'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 4l8 16l8-16"/>
  <line x1="6" y1="8" x2="18" y2="8"/>
</svg>`,
  },
  {
    id: 'math-exists',
    name: 'There Exists',
    domain: 'physics',
    category: 'logic',
    tags: ['exists', 'existential', 'quantifier', 'some', 'there is'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M16 4H8v16h8"/>
  <line x1="8" y1="12" x2="14" y2="12"/>
</svg>`,
  },
  {
    id: 'math-not',
    name: 'Negation',
    domain: 'physics',
    category: 'logic',
    tags: ['not', 'negation', 'complement', 'tilde', 'bang'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 4l16 0v8h-16"/>
</svg>`,
  },
  {
    id: 'math-and',
    name: 'Logical And',
    domain: 'physics',
    category: 'logic',
    tags: ['and', 'conjunction', 'wedge', 'both', 'logic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 20l8-16l8 16"/>
</svg>`,
  },
  {
    id: 'math-or',
    name: 'Logical Or',
    domain: 'physics',
    category: 'logic',
    tags: ['or', 'disjunction', 'vee', 'either', 'logic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 4l8 16l8-16"/>
</svg>`,
  },
  {
    id: 'math-therefore',
    name: 'Therefore',
    domain: 'physics',
    category: 'logic',
    tags: ['therefore', 'conclusion', 'proof', 'hence', 'dots'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="8" r="2" fill="currentColor"/>
  <circle cx="8" cy="16" r="2" fill="currentColor"/>
  <circle cx="16" cy="16" r="2" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'math-qed',
    name: 'QED Box',
    domain: 'physics',
    category: 'logic',
    tags: ['qed', 'proof', 'end', 'tombstone', 'halmos'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="6" y="6" width="12" height="12" fill="currentColor"/>
</svg>`,
  },

  // ===========================================================================
  // MATHEMATICAL FUNCTIONS & CURVES
  // ===========================================================================
  {
    id: 'math-parabola',
    name: 'Parabola',
    domain: 'physics',
    category: 'functions',
    tags: ['parabola', 'quadratic', 'curve', 'function', 'vertex'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <line x1="8" y1="32" x2="56" y2="32" stroke-dasharray="2 2"/>
  <line x1="32" y1="8" x2="32" y2="56" stroke-dasharray="2 2"/>
  <path d="M8 8c12 24 16 40 24 40s12-16 24-40"/>
</svg>`,
  },
  {
    id: 'math-hyperbola',
    name: 'Hyperbola',
    domain: 'physics',
    category: 'functions',
    tags: ['hyperbola', 'conic', 'asymptote', 'curve', 'branches'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <line x1="8" y1="32" x2="56" y2="32" stroke-dasharray="2 2"/>
  <line x1="32" y1="8" x2="32" y2="56" stroke-dasharray="2 2"/>
  <path d="M8 56c16-16 8-24 8-24s8-8 8-24"/>
  <path d="M56 8c-16 16-8 24-8 24s-8 8-8 24"/>
</svg>`,
  },
  {
    id: 'math-ellipse',
    name: 'Ellipse',
    domain: 'physics',
    category: 'functions',
    tags: ['ellipse', 'conic', 'oval', 'foci', 'eccentricity'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="12" rx="9" ry="5"/>
</svg>`,
  },
  {
    id: 'math-exponential',
    name: 'Exponential Function',
    domain: 'physics',
    category: 'functions',
    tags: ['exponential', 'growth', 'e^x', 'curve', 'function'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <line x1="8" y1="48" x2="56" y2="48" stroke-dasharray="2 2"/>
  <line x1="16" y1="8" x2="16" y2="56" stroke-dasharray="2 2"/>
  <path d="M8 46c8 0 16-2 24-12s16-24 24-26"/>
</svg>`,
  },
  {
    id: 'math-logarithmic-curve',
    name: 'Logarithmic Curve',
    domain: 'physics',
    category: 'functions',
    tags: ['logarithm', 'log', 'curve', 'function', 'inverse'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <line x1="8" y1="32" x2="56" y2="32" stroke-dasharray="2 2"/>
  <line x1="16" y1="8" x2="16" y2="56" stroke-dasharray="2 2"/>
  <path d="M18 56c2-24 12-24 16-24s12 0 22-8"/>
</svg>`,
  },
  {
    id: 'math-step-function',
    name: 'Step Function',
    domain: 'physics',
    category: 'functions',
    tags: ['step', 'heaviside', 'discontinuous', 'piecewise', 'unit'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <line x1="8" y1="32" x2="56" y2="32" stroke-dasharray="2 2"/>
  <line x1="32" y1="8" x2="32" y2="56" stroke-dasharray="2 2"/>
  <path d="M8 44h16v-24h16v-8h16"/>
</svg>`,
  },
  {
    id: 'math-asymptote',
    name: 'Asymptote',
    domain: 'physics',
    category: 'functions',
    tags: ['asymptote', 'limit', 'approach', 'boundary', 'infinite'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <line x1="32" y1="8" x2="32" y2="56" stroke-dasharray="4 2"/>
  <path d="M8 52c8-4 16-12 20-24"/>
  <path d="M56 8c-8 4-16 12-20 24"/>
</svg>`,
  },
  {
    id: 'math-function-f',
    name: 'Function f(x)',
    domain: 'physics',
    category: 'functions',
    tags: ['function', 'f', 'mapping', 'input output', 'transformation'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <text x="2" y="18" font-size="14" font-style="italic" fill="currentColor" stroke="none">f(x)</text>
</svg>`,
  },

  // ===========================================================================
  // MISCELLANEOUS MATHEMATICAL SYMBOLS
  // ===========================================================================
  {
    id: 'math-pi',
    name: 'Pi',
    domain: 'physics',
    category: 'constants',
    tags: ['pi', 'circle', 'ratio', 'irrational', '3.14159'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="4" y1="8" x2="20" y2="8"/>
  <line x1="8" y1="8" x2="8" y2="20"/>
  <line x1="16" y1="8" x2="16" y2="20"/>
</svg>`,
  },
  {
    id: 'math-euler-e',
    name: 'Euler Number e',
    domain: 'physics',
    category: 'constants',
    tags: ['euler', 'e', 'natural', 'exponential', '2.71828'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <text x="6" y="18" font-size="16" font-style="italic" fill="currentColor" stroke="none">e</text>
</svg>`,
  },
  {
    id: 'math-golden-ratio',
    name: 'Golden Ratio',
    domain: 'physics',
    category: 'constants',
    tags: ['golden ratio', 'phi', 'fibonacci', '1.618', 'divine proportion'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="8"/>
  <line x1="12" y1="4" x2="12" y2="20"/>
  <path d="M12 12l-6 6"/>
</svg>`,
  },
  {
    id: 'math-imaginary-i',
    name: 'Imaginary Unit i',
    domain: 'physics',
    category: 'constants',
    tags: ['imaginary', 'i', 'complex', 'sqrt -1', 'unit'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <text x="8" y="18" font-size="16" font-style="italic" fill="currentColor" stroke="none">i</text>
</svg>`,
  },
  {
    id: 'math-approximately',
    name: 'Approximately Equal',
    domain: 'physics',
    category: 'relations',
    tags: ['approximately', 'about', 'roughly', 'tilde', 'estimate'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>
  <path d="M4 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>
</svg>`,
  },
  {
    id: 'math-not-equal',
    name: 'Not Equal',
    domain: 'physics',
    category: 'relations',
    tags: ['not equal', 'inequality', 'different', 'slash equals'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="4" y1="9" x2="20" y2="9"/>
  <line x1="4" y1="15" x2="20" y2="15"/>
  <line x1="16" y1="4" x2="8" y2="20"/>
</svg>`,
  },
  {
    id: 'math-less-than',
    name: 'Less Than',
    domain: 'physics',
    category: 'relations',
    tags: ['less', 'smaller', 'inequality', 'comparison', 'order'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="18,4 6,12 18,20"/>
</svg>`,
  },
  {
    id: 'math-greater-than',
    name: 'Greater Than',
    domain: 'physics',
    category: 'relations',
    tags: ['greater', 'larger', 'inequality', 'comparison', 'order'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="6,4 18,12 6,20"/>
</svg>`,
  },
  {
    id: 'math-proportional',
    name: 'Proportional To',
    domain: 'physics',
    category: 'relations',
    tags: ['proportional', 'varies', 'ratio', 'relationship', 'propto'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 12a4 4 0 0 1 8 0a4 4 0 0 1-8 0"/>
  <path d="M12 12a4 4 0 0 1 8 0a4 4 0 0 1-8 0"/>
</svg>`,
  },
  {
    id: 'math-congruent',
    name: 'Congruent',
    domain: 'physics',
    category: 'relations',
    tags: ['congruent', 'identical', 'same', 'geometry', 'modular'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="4" y1="7" x2="20" y2="7"/>
  <line x1="4" y1="12" x2="20" y2="12"/>
  <line x1="4" y1="17" x2="20" y2="17"/>
</svg>`,
  },
];

export default mathematicsIcons;
