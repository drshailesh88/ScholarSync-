/**
 * mathematics.ts
 * Mathematics diagram templates for FINNISH
 *
 * Comprehensive templates for mathematical diagrams covering:
 * - Algebraic structures and equations
 * - Calculus concepts (limits, derivatives, integrals)
 * - Geometric constructions and proofs
 * - Trigonometric functions and identities
 * - Statistical analysis and probability
 * - Linear algebra (matrices, vectors, transformations)
 * - Graph theory and networks
 * - Set theory and logic
 * - Number theory and sequences
 * - Coordinate systems and function plots
 *
 * Ralph Loop Iteration 1 - Mathematics COMPLETE
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// ALGEBRA TEMPLATES
// =============================================================================

/**
 * Quadratic Function Analysis template
 */
export const quadraticAnalysis: DiagramTemplate = {
  id: 'math-quadratic-analysis',
  name: 'Quadratic Function Analysis',
  description:
    'Complete analysis of quadratic function including vertex, roots, axis of symmetry, and graph',
  domain: 'physics',
  promptTemplate: `Create a quadratic function analysis diagram:
- Function: {{function}}
- Standard form coefficients (a, b, c): {{coefficients}}
- Vertex: {{vertex}}
- Axis of symmetry: {{axisOfSymmetry}}
- Roots/zeros: {{roots}}
- Y-intercept: {{yIntercept}}
- Direction (opens up/down): {{direction}}
- Domain and range: {{domainRange}}
- Graph sketch: {{graphSketch}}`,
  placeholders: [
    'function',
    'coefficients',
    'vertex',
    'axisOfSymmetry',
    'roots',
    'yIntercept',
    'direction',
    'domainRange',
    'graphSketch',
  ],
  mermaidExample: `flowchart TB
    subgraph function["Quadratic Function: f(x) = x² - 4x + 3"]
        form["Standard Form: ax² + bx + c"]
        coeffs["a = 1, b = -4, c = 3"]
    end

    subgraph properties["Key Properties"]
        vertex["Vertex: (2, -1)"]
        aos["Axis of Symmetry: x = 2"]
        roots["Roots: x = 1, x = 3"]
        yint["Y-intercept: (0, 3)"]
    end

    subgraph analysis["Analysis"]
        direction["Opens: Upward (a > 0)"]
        domain["Domain: (-inf, +inf)"]
        range["Range: [-1, +inf)"]
    end

    function --> properties
    properties --> analysis

    classDef formula fill:#dbeafe,stroke:#2563eb
    classDef point fill:#dcfce7,stroke:#16a34a

    class form,coeffs formula
    class vertex,roots,yint point`,
};

/**
 * Polynomial Factoring template
 */
export const polynomialFactoring: DiagramTemplate = {
  id: 'math-polynomial-factoring',
  name: 'Polynomial Factoring',
  description:
    'Step-by-step polynomial factoring process with multiple methods',
  domain: 'physics',
  promptTemplate: `Create a polynomial factoring diagram:
- Original polynomial: {{originalPolynomial}}
- Degree: {{degree}}
- Method used: {{method}}
- Common factors: {{commonFactors}}
- Intermediate steps: {{intermediateSteps}}
- Factored form: {{factoredForm}}
- Verification: {{verification}}`,
  placeholders: [
    'originalPolynomial',
    'degree',
    'method',
    'commonFactors',
    'intermediateSteps',
    'factoredForm',
    'verification',
  ],
  mermaidExample: `flowchart TB
    subgraph original["Original Polynomial"]
        poly["x³ - 6x² + 11x - 6"]
    end

    subgraph method["Factoring Method"]
        step1["1. Try rational roots: ±1, ±2, ±3, ±6"]
        step2["2. Test x = 1: 1 - 6 + 11 - 6 = 0 check"]
        step3["3. Synthetic division by (x - 1)"]
        step4["4. Result: x² - 5x + 6"]
        step5["5. Factor quadratic: (x - 2)(x - 3)"]
    end

    subgraph result["Factored Form"]
        factored["(x - 1)(x - 2)(x - 3)"]
        roots["Roots: x = 1, 2, 3"]
    end

    original --> method
    step1 --> step2 --> step3 --> step4 --> step5
    method --> result

    classDef step fill:#fef3c7,stroke:#d97706
    class step1,step2,step3,step4,step5 step`,
};

// =============================================================================
// CALCULUS TEMPLATES
// =============================================================================

/**
 * Derivative Rules template
 */
export const derivativeRules: DiagramTemplate = {
  id: 'math-derivative-rules',
  name: 'Derivative Rules',
  description:
    'Comprehensive derivative rules with examples and chain rule applications',
  domain: 'physics',
  promptTemplate: `Create a derivative rules diagram:
- Function type: {{functionType}}
- Basic rule applied: {{basicRule}}
- Function: {{function}}
- Derivative: {{derivative}}
- Chain rule (if applicable): {{chainRule}}
- Step-by-step solution: {{steps}}
- Verification: {{verification}}`,
  placeholders: [
    'functionType',
    'basicRule',
    'function',
    'derivative',
    'chainRule',
    'steps',
    'verification',
  ],
  mermaidExample: `flowchart TB
    subgraph rules["Derivative Rules"]
        power["Power Rule: d/dx[xⁿ] = nxⁿ⁻¹"]
        product["Product Rule: d/dx[fg] = f'g + fg'"]
        quotient["Quotient Rule: d/dx[f/g] = (f'g - fg')/g²"]
        chain["Chain Rule: d/dx[f(g(x))] = f'(g(x))·g'(x)"]
    end

    subgraph example["Example: f(x) = sin(x²)"]
        outer["Outer: sin(u), derivative: cos(u)"]
        inner["Inner: u = x², derivative: 2x"]
        result["Result: f'(x) = cos(x²)·2x = 2x·cos(x²)"]
    end

    chain --> example

    classDef rule fill:#dbeafe,stroke:#2563eb
    classDef example fill:#dcfce7,stroke:#16a34a

    class power,product,quotient,chain rule
    class outer,inner,result example`,
};

/**
 * Integration Techniques template
 */
export const integrationTechniques: DiagramTemplate = {
  id: 'math-integration-techniques',
  name: 'Integration Techniques',
  description:
    'Integration methods including substitution, parts, and partial fractions',
  domain: 'physics',
  promptTemplate: `Create an integration techniques diagram:
- Integral: {{integral}}
- Technique used: {{technique}}
- Substitution (if applicable): {{substitution}}
- Integration by parts setup: {{byPartsSetup}}
- Partial fractions decomposition: {{partialFractions}}
- Step-by-step solution: {{steps}}
- Final answer: {{finalAnswer}}
- Verification by differentiation: {{verification}}`,
  placeholders: [
    'integral',
    'technique',
    'substitution',
    'byPartsSetup',
    'partialFractions',
    'steps',
    'finalAnswer',
    'verification',
  ],
  mermaidExample: `flowchart TB
    subgraph problem["Integration Problem"]
        integral["integral of x·eˣ dx"]
    end

    subgraph technique["Integration by Parts"]
        formula["formula: integral u dv = uv - integral v du"]
        choose["Let u = x, dv = eˣdx"]
        derive["Then du = dx, v = eˣ"]
    end

    subgraph solution["Solution Steps"]
        step1["Apply formula: x·eˣ - integral eˣ dx"]
        step2["Integrate: x·eˣ - eˣ + C"]
        step3["Factor: eˣ(x - 1) + C"]
    end

    subgraph verify["Verification"]
        check["d/dx[eˣ(x-1)] = eˣ(x-1) + eˣ = x·eˣ checkmark"]
    end

    problem --> technique --> solution --> verify

    classDef method fill:#fef3c7,stroke:#d97706
    class formula,choose,derive method`,
};

/**
 * Limit Evaluation template
 */
export const limitEvaluation: DiagramTemplate = {
  id: 'math-limit-evaluation',
  name: 'Limit Evaluation',
  description:
    'Systematic limit evaluation with indeterminate forms and L\'Hopital\'s rule',
  domain: 'physics',
  promptTemplate: `Create a limit evaluation diagram:
- Limit expression: {{limitExpression}}
- Point of evaluation: {{evaluationPoint}}
- Initial form: {{initialForm}}
- Indeterminate form (if applicable): {{indeterminateForm}}
- Technique used: {{technique}}
- L'Hopital's application: {{lHopital}}
- Algebraic manipulation: {{algebraicSteps}}
- Final limit value: {{limitValue}}`,
  placeholders: [
    'limitExpression',
    'evaluationPoint',
    'initialForm',
    'indeterminateForm',
    'technique',
    'lHopital',
    'algebraicSteps',
    'limitValue',
  ],
  mermaidExample: `flowchart TB
    subgraph problem["Limit Problem"]
        limit["lim(x->0) (sin x)/x"]
    end

    subgraph analysis["Analysis"]
        direct["Direct substitution: 0/0"]
        form["Indeterminate form!"]
    end

    subgraph method["Method: L'Hopital's Rule"]
        apply["Take derivatives of numerator and denominator"]
        num["d/dx[sin x] = cos x"]
        den["d/dx[x] = 1"]
        newlimit["New limit: lim(x->0) cos x / 1"]
    end

    subgraph result["Result"]
        evaluate["cos(0) = 1"]
        answer["Therefore: lim(x->0) (sin x)/x = 1"]
    end

    problem --> analysis --> method --> result

    classDef indeterminate fill:#fee2e2,stroke:#dc2626
    classDef success fill:#dcfce7,stroke:#16a34a

    class form indeterminate
    class answer success`,
};

/**
 * Riemann Sum template
 */
export const riemannSum: DiagramTemplate = {
  id: 'math-riemann-sum',
  name: 'Riemann Sum',
  description:
    'Riemann sum approximation showing rectangles and convergence to integral',
  domain: 'physics',
  promptTemplate: `Create a Riemann sum diagram:
- Function: {{function}}
- Interval [a, b]: {{interval}}
- Number of subintervals (n): {{subintervals}}
- Width of each rectangle (Delta x): {{deltaX}}
- Sample point method: {{sampleMethod}}
- Sum formula: {{sumFormula}}
- Approximation: {{approximation}}
- Exact integral value: {{exactValue}}`,
  placeholders: [
    'function',
    'interval',
    'subintervals',
    'deltaX',
    'sampleMethod',
    'sumFormula',
    'approximation',
    'exactValue',
  ],
  mermaidExample: `flowchart TB
    subgraph setup["Setup"]
        func["f(x) = x² on [0, 2]"]
        partition["n = 4 subintervals"]
        width["Delta x = (2-0)/4 = 0.5"]
    end

    subgraph method["Right Riemann Sum"]
        points["Sample points: 0.5, 1.0, 1.5, 2.0"]
        heights["Heights: 0.25, 1, 2.25, 4"]
        areas["Areas: 0.125, 0.5, 1.125, 2"]
    end

    subgraph calculation["Calculation"]
        sum["Sum = 0.125 + 0.5 + 1.125 + 2 = 3.75"]
        exact["Exact: integral_0^2 x² dx = 8/3 = 2.67"]
        error["Overestimate (right sum, increasing function)"]
    end

    setup --> method --> calculation

    classDef calc fill:#dbeafe,stroke:#2563eb
    class sum,exact calc`,
};

// =============================================================================
// GEOMETRY TEMPLATES
// =============================================================================

/**
 * Triangle Properties template
 */
export const triangleProperties: DiagramTemplate = {
  id: 'math-triangle-properties',
  name: 'Triangle Properties',
  description:
    'Triangle analysis including sides, angles, area, and special points',
  domain: 'physics',
  promptTemplate: `Create a triangle properties diagram:
- Triangle type: {{triangleType}}
- Vertices coordinates: {{vertices}}
- Side lengths: {{sideLengths}}
- Angles: {{angles}}
- Perimeter: {{perimeter}}
- Area (formula used): {{area}}
- Special points (centroid, incenter, etc.): {{specialPoints}}
- Altitude, median, bisector: {{specialLines}}`,
  placeholders: [
    'triangleType',
    'vertices',
    'sideLengths',
    'angles',
    'perimeter',
    'area',
    'specialPoints',
    'specialLines',
  ],
  mermaidExample: `flowchart TB
    subgraph triangle["Right Triangle ABC"]
        vertices["A(0,0), B(3,0), C(0,4)"]
        type["Type: Right triangle at A"]
    end

    subgraph sides["Sides"]
        ab["AB = 3 (base)"]
        ac["AC = 4 (height)"]
        bc["BC = 5 (hypotenuse)"]
        ratio["3-4-5 Pythagorean triple"]
    end

    subgraph calculations["Calculations"]
        perimeter["Perimeter = 3 + 4 + 5 = 12"]
        area["Area = (1/2)(3)(4) = 6"]
        angles["Angles: 90deg, ~37deg, ~53deg"]
    end

    subgraph centers["Special Points"]
        centroid["Centroid: (1, 4/3)"]
        circumcenter["Circumcenter: midpoint of hypotenuse"]
    end

    triangle --> sides --> calculations --> centers

    classDef measurement fill:#dcfce7,stroke:#16a34a
    class perimeter,area measurement`,
};

/**
 * Circle Theorems template
 */
export const circleTheorems: DiagramTemplate = {
  id: 'math-circle-theorems',
  name: 'Circle Theorems',
  description:
    'Circle theorems including inscribed angles, tangent properties, and chord relationships',
  domain: 'physics',
  promptTemplate: `Create a circle theorems diagram:
- Circle properties: {{circleProperties}}
- Theorem applied: {{theorem}}
- Given information: {{given}}
- Construction: {{construction}}
- Central angle: {{centralAngle}}
- Inscribed angle: {{inscribedAngle}}
- Tangent/secant: {{tangentSecant}}
- Chord properties: {{chordProperties}}
- Proof or calculation: {{proof}}`,
  placeholders: [
    'circleProperties',
    'theorem',
    'given',
    'construction',
    'centralAngle',
    'inscribedAngle',
    'tangentSecant',
    'chordProperties',
    'proof',
  ],
  mermaidExample: `flowchart TB
    subgraph theorem["Inscribed Angle Theorem"]
        statement["An inscribed angle is half the central angle<br/>subtending the same arc"]
    end

    subgraph setup["Setup"]
        circle["Circle with center O"]
        central["Central angle AOB = 80deg"]
        inscribed["Inscribed angle ACB on same arc"]
    end

    subgraph proof["Proof"]
        step1["Draw radius OC"]
        step2["Triangle AOC is isosceles (OA = OC)"]
        step3["Use exterior angle theorem"]
        step4["inscribed angle = (1/2) central angle"]
    end

    subgraph result["Result"]
        answer["Angle ACB = 40deg"]
    end

    theorem --> setup --> proof --> result

    classDef theorem fill:#f3e8ff,stroke:#9333ea
    class statement theorem`,
};

/**
 * Coordinate Geometry template
 */
export const coordinateGeometry: DiagramTemplate = {
  id: 'math-coordinate-geometry',
  name: 'Coordinate Geometry',
  description:
    'Coordinate geometry problems including distance, midpoint, slope, and equations of lines',
  domain: 'physics',
  promptTemplate: `Create a coordinate geometry diagram:
- Points: {{points}}
- Distance formula application: {{distance}}
- Midpoint: {{midpoint}}
- Slope calculation: {{slope}}
- Line equation (point-slope/slope-intercept): {{lineEquation}}
- Parallel/perpendicular lines: {{parallelPerpendicular}}
- Intersection point: {{intersection}}
- Area of polygon: {{areaPolygon}}`,
  placeholders: [
    'points',
    'distance',
    'midpoint',
    'slope',
    'lineEquation',
    'parallelPerpendicular',
    'intersection',
    'areaPolygon',
  ],
  mermaidExample: `flowchart TB
    subgraph given["Given Points"]
        A["A(1, 2)"]
        B["B(5, 6)"]
    end

    subgraph formulas["Formulas Applied"]
        distForm["Distance: d = sqrt((x2-x1)² + (y2-y1)²)"]
        midForm["Midpoint: M = ((x1+x2)/2, (y1+y2)/2)"]
        slopeForm["Slope: m = (y2-y1)/(x2-x1)"]
    end

    subgraph calculations["Results"]
        dist["Distance AB = sqrt(32) = 4sqrt(2)"]
        mid["Midpoint M = (3, 4)"]
        slope["Slope m = 4/4 = 1"]
        line["Line: y - 2 = 1(x - 1) or y = x + 1"]
    end

    given --> formulas --> calculations

    classDef formula fill:#dbeafe,stroke:#2563eb
    class distForm,midForm,slopeForm formula`,
};

// =============================================================================
// TRIGONOMETRY TEMPLATES
// =============================================================================

/**
 * Trigonometric Identities template
 */
export const trigIdentities: DiagramTemplate = {
  id: 'math-trig-identities',
  name: 'Trigonometric Identities',
  description:
    'Trigonometric identities proof and application',
  domain: 'physics',
  promptTemplate: `Create a trigonometric identities diagram:
- Identity to prove/use: {{identity}}
- Fundamental identities used: {{fundamentalIdentities}}
- Left-hand side: {{lhs}}
- Right-hand side: {{rhs}}
- Step-by-step transformation: {{steps}}
- Verification: {{verification}}`,
  placeholders: [
    'identity',
    'fundamentalIdentities',
    'lhs',
    'rhs',
    'steps',
    'verification',
  ],
  mermaidExample: `flowchart TB
    subgraph identity["Prove: sin²x + cos²x = 1"]
        pythagorean["Pythagorean Identity"]
    end

    subgraph fundamental["Fundamental Identities"]
        sin["sin x = opposite/hypotenuse"]
        cos["cos x = adjacent/hypotenuse"]
    end

    subgraph proof["Proof using Unit Circle"]
        step1["On unit circle: x = cos(theta), y = sin(theta)"]
        step2["Point (x,y) is on circle x² + y² = 1"]
        step3["Therefore: cos²(theta) + sin²(theta) = 1"]
    end

    subgraph derived["Derived Identities"]
        tan["1 + tan²x = sec²x (divide by cos²x)"]
        cot["1 + cot²x = csc²x (divide by sin²x)"]
    end

    identity --> fundamental --> proof --> derived

    classDef identity fill:#f3e8ff,stroke:#9333ea
    class pythagorean identity`,
};

/**
 * Solving Trigonometric Equations template
 */
export const solvingTrigEquations: DiagramTemplate = {
  id: 'math-solving-trig-equations',
  name: 'Solving Trigonometric Equations',
  description:
    'Step-by-step solution of trigonometric equations with all solutions',
  domain: 'physics',
  promptTemplate: `Create a trigonometric equation solving diagram:
- Equation: {{equation}}
- Domain restriction: {{domain}}
- Isolate trig function: {{isolate}}
- Reference angle: {{referenceAngle}}
- Quadrants with solutions: {{quadrants}}
- General solution: {{generalSolution}}
- Solutions in given interval: {{specificSolutions}}`,
  placeholders: [
    'equation',
    'domain',
    'isolate',
    'referenceAngle',
    'quadrants',
    'generalSolution',
    'specificSolutions',
  ],
  mermaidExample: `flowchart TB
    subgraph equation["Equation: 2sin²x - sinx - 1 = 0"]
        domain["Domain: [0, 2pi)"]
    end

    subgraph factor["Factoring"]
        step1["Let u = sin x"]
        step2["2u² - u - 1 = 0"]
        step3["(2u + 1)(u - 1) = 0"]
        step4["u = -1/2 or u = 1"]
    end

    subgraph solve["Solve for x"]
        case1["sin x = 1: x = pi/2"]
        case2["sin x = -1/2: x = 7pi/6 or 11pi/6"]
    end

    subgraph solution["Solution Set"]
        final["x = {pi/2, 7pi/6, 11pi/6}"]
    end

    equation --> factor --> solve --> solution

    classDef answer fill:#dcfce7,stroke:#16a34a
    class final answer`,
};

// =============================================================================
// STATISTICS TEMPLATES
// =============================================================================

/**
 * Descriptive Statistics template
 */
export const descriptiveStatistics: DiagramTemplate = {
  id: 'math-descriptive-statistics',
  name: 'Descriptive Statistics',
  description:
    'Complete descriptive statistics analysis with measures of central tendency and spread',
  domain: 'physics',
  promptTemplate: `Create a descriptive statistics diagram:
- Data set: {{dataSet}}
- Sample size (n): {{sampleSize}}
- Mean: {{mean}}
- Median: {{median}}
- Mode: {{mode}}
- Range: {{range}}
- Variance: {{variance}}
- Standard deviation: {{standardDeviation}}
- Quartiles (Q1, Q2, Q3): {{quartiles}}
- Interquartile range: {{iqr}}
- Outliers: {{outliers}}`,
  placeholders: [
    'dataSet',
    'sampleSize',
    'mean',
    'median',
    'mode',
    'range',
    'variance',
    'standardDeviation',
    'quartiles',
    'iqr',
    'outliers',
  ],
  mermaidExample: `flowchart TB
    subgraph data["Data Set"]
        values["2, 4, 4, 5, 6, 7, 8, 9, 10"]
        sorted["Already sorted, n = 9"]
    end

    subgraph central["Central Tendency"]
        mean["Mean = 55/9 = 6.11"]
        median["Median = 6 (middle value)"]
        mode["Mode = 4 (appears twice)"]
    end

    subgraph spread["Spread Measures"]
        range["Range = 10 - 2 = 8"]
        variance["Variance = 5.88"]
        stdev["Standard Deviation = 2.42"]
    end

    subgraph quartiles["Five Number Summary"]
        min["Min = 2"]
        q1["Q1 = 4"]
        q2["Q2 = 6"]
        q3["Q3 = 8.5"]
        max["Max = 10"]
        iqr["IQR = 8.5 - 4 = 4.5"]
    end

    data --> central --> spread --> quartiles

    classDef measure fill:#dbeafe,stroke:#2563eb
    class mean,median,stdev measure`,
};

/**
 * Normal Distribution template
 */
export const normalDistributionAnalysis: DiagramTemplate = {
  id: 'math-normal-distribution-analysis',
  name: 'Normal Distribution Analysis',
  description:
    'Normal distribution with z-scores, probabilities, and empirical rule',
  domain: 'physics',
  promptTemplate: `Create a normal distribution analysis diagram:
- Mean (mu): {{mean}}
- Standard deviation (sigma): {{standardDeviation}}
- Value of interest (x): {{xValue}}
- Z-score calculation: {{zScore}}
- Probability (area): {{probability}}
- Empirical rule application: {{empiricalRule}}
- Percentile: {{percentile}}
- Inverse normal (given probability): {{inverseNormal}}`,
  placeholders: [
    'mean',
    'standardDeviation',
    'xValue',
    'zScore',
    'probability',
    'empiricalRule',
    'percentile',
    'inverseNormal',
  ],
  mermaidExample: `flowchart TB
    subgraph distribution["Normal Distribution"]
        params["mu = 100, sigma = 15"]
        question["Find P(X < 115)"]
    end

    subgraph zscore["Z-Score Calculation"]
        formula["z = (x - mu)/sigma"]
        calc["z = (115 - 100)/15 = 1.00"]
    end

    subgraph lookup["Standard Normal Table"]
        area["P(Z < 1.00) = 0.8413"]
        interpret["84.13% of values below 115"]
    end

    subgraph empirical["Empirical Rule"]
        rule68["68% within 1 sigma: [85, 115]"]
        rule95["95% within 2 sigma: [70, 130]"]
        rule99["99.7% within 3 sigma: [55, 145]"]
    end

    distribution --> zscore --> lookup
    distribution --> empirical

    classDef prob fill:#dcfce7,stroke:#16a34a
    class area prob`,
};

/**
 * Hypothesis Testing template
 */
export const hypothesisTesting: DiagramTemplate = {
  id: 'math-hypothesis-testing',
  name: 'Hypothesis Testing',
  description:
    'Complete hypothesis test procedure with test statistic and decision',
  domain: 'physics',
  promptTemplate: `Create a hypothesis testing diagram:
- Null hypothesis (H0): {{nullHypothesis}}
- Alternative hypothesis (H1): {{altHypothesis}}
- Significance level (alpha): {{alpha}}
- Sample statistics: {{sampleStats}}
- Test statistic type: {{testType}}
- Test statistic calculation: {{testStatistic}}
- Critical value(s): {{criticalValue}}
- P-value: {{pValue}}
- Decision: {{decision}}
- Conclusion in context: {{conclusion}}`,
  placeholders: [
    'nullHypothesis',
    'altHypothesis',
    'alpha',
    'sampleStats',
    'testType',
    'testStatistic',
    'criticalValue',
    'pValue',
    'decision',
    'conclusion',
  ],
  mermaidExample: `flowchart TB
    subgraph hypotheses["Hypotheses"]
        h0["H0: mu = 100 (population mean)"]
        h1["H1: mu > 100 (right-tailed)"]
        alpha["alpha = 0.05"]
    end

    subgraph data["Sample Data"]
        stats["n = 36, x-bar = 105, s = 15"]
    end

    subgraph test["Test Statistic"]
        formula["t = (x-bar - mu0)/(s/sqrt(n))"]
        calc["t = (105-100)/(15/6) = 2.00"]
    end

    subgraph decision["Decision"]
        critical["Critical value t_0.05,35 = 1.690"]
        compare["2.00 > 1.690"]
        reject["Reject H0"]
    end

    subgraph conclusion["Conclusion"]
        result["Sufficient evidence at alpha=0.05<br/>to conclude mu > 100"]
    end

    hypotheses --> data --> test --> decision --> conclusion

    classDef reject fill:#fee2e2,stroke:#dc2626
    class reject reject`,
};

// =============================================================================
// LINEAR ALGEBRA TEMPLATES
// =============================================================================

/**
 * Matrix Operations template
 */
export const matrixOperations: DiagramTemplate = {
  id: 'math-matrix-operations',
  name: 'Matrix Operations',
  description:
    'Matrix operations including addition, multiplication, and properties',
  domain: 'physics',
  promptTemplate: `Create a matrix operations diagram:
- Matrix A: {{matrixA}}
- Matrix B: {{matrixB}}
- Operation: {{operation}}
- Dimension check: {{dimensionCheck}}
- Step-by-step calculation: {{steps}}
- Result matrix: {{result}}
- Properties verified: {{properties}}`,
  placeholders: [
    'matrixA',
    'matrixB',
    'operation',
    'dimensionCheck',
    'steps',
    'result',
    'properties',
  ],
  mermaidExample: `flowchart TB
    subgraph matrices["Matrices"]
        A["A = [1 2; 3 4] (2x2)"]
        B["B = [5 6; 7 8] (2x2)"]
    end

    subgraph operation["Matrix Multiplication AB"]
        check["Dimensions: (2x2)(2x2) = (2x2) OK"]
        formula["(AB)_ij = sum of row i of A times column j of B"]
    end

    subgraph calculation["Calculation"]
        c11["(AB)_11 = 1(5) + 2(7) = 19"]
        c12["(AB)_12 = 1(6) + 2(8) = 22"]
        c21["(AB)_21 = 3(5) + 4(7) = 43"]
        c22["(AB)_22 = 3(6) + 4(8) = 50"]
    end

    subgraph result["Result"]
        AB["AB = [19 22; 43 50]"]
        note["Note: AB =/= BA (non-commutative)"]
    end

    matrices --> operation --> calculation --> result

    classDef matrix fill:#f3e8ff,stroke:#9333ea
    class A,B,AB matrix`,
};

/**
 * Determinant Calculation template
 */
export const determinantCalculation: DiagramTemplate = {
  id: 'math-determinant-calculation',
  name: 'Determinant Calculation',
  description:
    'Determinant calculation for 2x2 and 3x3 matrices with cofactor expansion',
  domain: 'physics',
  promptTemplate: `Create a determinant calculation diagram:
- Matrix: {{matrix}}
- Dimension: {{dimension}}
- Method (cofactor/row reduction): {{method}}
- Expansion along row/column: {{expansion}}
- Cofactors: {{cofactors}}
- Calculation steps: {{steps}}
- Determinant value: {{determinant}}
- Interpretation: {{interpretation}}`,
  placeholders: [
    'matrix',
    'dimension',
    'method',
    'expansion',
    'cofactors',
    'steps',
    'determinant',
    'interpretation',
  ],
  mermaidExample: `flowchart TB
    subgraph matrix["3x3 Matrix"]
        A["A = [1 2 3; 4 5 6; 7 8 9]"]
    end

    subgraph method["Cofactor Expansion (Row 1)"]
        formula["det(A) = a11*C11 + a12*C12 + a13*C13"]
    end

    subgraph cofactors["Calculate Cofactors"]
        c11["C11 = |5 6; 8 9| = 45-48 = -3"]
        c12["C12 = -|4 6; 7 9| = -(36-42) = 6"]
        c13["C13 = |4 5; 7 8| = 32-35 = -3"]
    end

    subgraph result["Result"]
        calc["det(A) = 1(-3) + 2(6) + 3(-3)"]
        answer["det(A) = -3 + 12 - 9 = 0"]
        meaning["Singular matrix (not invertible)"]
    end

    matrix --> method --> cofactors --> result

    classDef singular fill:#fee2e2,stroke:#dc2626
    class meaning singular`,
};

/**
 * Eigenvalue Problem template
 */
export const eigenvalueProblem: DiagramTemplate = {
  id: 'math-eigenvalue-problem',
  name: 'Eigenvalue Problem',
  description:
    'Finding eigenvalues and eigenvectors of a matrix',
  domain: 'physics',
  promptTemplate: `Create an eigenvalue problem diagram:
- Matrix A: {{matrixA}}
- Characteristic equation: {{characteristicEquation}}
- Eigenvalues (lambda): {{eigenvalues}}
- For each eigenvalue, eigenvector: {{eigenvectors}}
- Verification (Av = lambda*v): {{verification}}
- Diagonalization (if possible): {{diagonalization}}`,
  placeholders: [
    'matrixA',
    'characteristicEquation',
    'eigenvalues',
    'eigenvectors',
    'verification',
    'diagonalization',
  ],
  mermaidExample: `flowchart TB
    subgraph matrix["Matrix"]
        A["A = [4 1; 2 3]"]
    end

    subgraph characteristic["Characteristic Equation"]
        det["det(A - lambda*I) = 0"]
        expand["(4-lambda)(3-lambda) - 2 = 0"]
        simplify["lambda² - 7*lambda + 10 = 0"]
        factor["(lambda - 5)(lambda - 2) = 0"]
    end

    subgraph eigenvalues["Eigenvalues"]
        l1["lambda_1 = 5"]
        l2["lambda_2 = 2"]
    end

    subgraph eigenvectors["Eigenvectors"]
        v1["For lambda=5: (A-5I)v=0 -> v1 = [1; 1]"]
        v2["For lambda=2: (A-2I)v=0 -> v2 = [1; -2]"]
    end

    matrix --> characteristic --> eigenvalues --> eigenvectors

    classDef eigen fill:#dcfce7,stroke:#16a34a
    class l1,l2,v1,v2 eigen`,
};

// =============================================================================
// GRAPH THEORY TEMPLATES
// =============================================================================

/**
 * Graph Properties template
 */
export const graphProperties: DiagramTemplate = {
  id: 'math-graph-properties',
  name: 'Graph Properties',
  description:
    'Analysis of graph properties including vertices, edges, degree, and connectivity',
  domain: 'physics',
  promptTemplate: `Create a graph properties diagram:
- Graph representation: {{graphRepresentation}}
- Number of vertices (V): {{vertices}}
- Number of edges (E): {{edges}}
- Degree sequence: {{degreeSequence}}
- Is connected: {{connected}}
- Is bipartite: {{bipartite}}
- Contains cycles: {{cycles}}
- Adjacency matrix: {{adjacencyMatrix}}
- Special properties: {{specialProperties}}`,
  placeholders: [
    'graphRepresentation',
    'vertices',
    'edges',
    'degreeSequence',
    'connected',
    'bipartite',
    'cycles',
    'adjacencyMatrix',
    'specialProperties',
  ],
  mermaidExample: `flowchart TB
    subgraph graph["Graph G"]
        structure["V = {A, B, C, D}"]
        edges["E = {AB, BC, CD, DA, AC}"]
    end

    subgraph properties["Properties"]
        vcount["|V| = 4"]
        ecount["|E| = 5"]
        degrees["Degrees: A=3, B=2, C=3, D=2"]
        sum["Sum of degrees = 10 = 2|E|"]
    end

    subgraph analysis["Analysis"]
        connected["Connected: Yes"]
        complete["Complete: No (missing BD)"]
        cycles["Contains cycles: Yes (ABCDA)"]
        euler["Eulerian: No (odd degrees exist)"]
    end

    graph --> properties --> analysis

    classDef property fill:#dbeafe,stroke:#2563eb
    class degrees,sum property`,
};

// =============================================================================
// SET THEORY TEMPLATES
// =============================================================================

/**
 * Set Operations template
 */
export const setOperations: DiagramTemplate = {
  id: 'math-set-operations',
  name: 'Set Operations',
  description:
    'Set operations with Venn diagrams including union, intersection, and complement',
  domain: 'physics',
  promptTemplate: `Create a set operations diagram:
- Universal set U: {{universalSet}}
- Set A: {{setA}}
- Set B: {{setB}}
- Union (A union B): {{union}}
- Intersection (A intersect B): {{intersection}}
- Complement of A: {{complementA}}
- Difference (A - B): {{difference}}
- Symmetric difference: {{symmetricDifference}}
- Cardinality of each: {{cardinalities}}`,
  placeholders: [
    'universalSet',
    'setA',
    'setB',
    'union',
    'intersection',
    'complementA',
    'difference',
    'symmetricDifference',
    'cardinalities',
  ],
  mermaidExample: `flowchart TB
    subgraph sets["Given Sets"]
        U["U = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}"]
        A["A = {1, 2, 3, 4, 5}"]
        B["B = {3, 4, 5, 6, 7}"]
    end

    subgraph operations["Set Operations"]
        union["A union B = {1, 2, 3, 4, 5, 6, 7}"]
        intersect["A intersect B = {3, 4, 5}"]
        compA["A' = {6, 7, 8, 9, 10}"]
        diff["A - B = {1, 2}"]
        symm["A delta B = {1, 2, 6, 7}"]
    end

    subgraph cardinality["Cardinalities"]
        nA["|A| = 5"]
        nB["|B| = 5"]
        nUnion["|A union B| = 7"]
        nIntersect["|A intersect B| = 3"]
        formula["|A union B| = |A| + |B| - |A intersect B|"]
    end

    sets --> operations --> cardinality

    classDef operation fill:#f3e8ff,stroke:#9333ea
    class union,intersect,diff operation`,
};

// =============================================================================
// NUMBER THEORY TEMPLATES
// =============================================================================

/**
 * Prime Factorization template
 */
export const primeFactorization: DiagramTemplate = {
  id: 'math-prime-factorization',
  name: 'Prime Factorization',
  description:
    'Prime factorization with factor tree and applications to GCD/LCM',
  domain: 'physics',
  promptTemplate: `Create a prime factorization diagram:
- Number: {{number}}
- Factor tree: {{factorTree}}
- Prime factorization: {{primeFactorization}}
- Number of divisors: {{numberOfDivisors}}
- Sum of divisors: {{sumOfDivisors}}
- GCD with another number: {{gcdCalculation}}
- LCM with another number: {{lcmCalculation}}`,
  placeholders: [
    'number',
    'factorTree',
    'primeFactorization',
    'numberOfDivisors',
    'sumOfDivisors',
    'gcdCalculation',
    'lcmCalculation',
  ],
  mermaidExample: `flowchart TB
    subgraph number["Factor 360"]
        n360["360"]
    end

    subgraph tree["Factor Tree"]
        f1["360 = 2 x 180"]
        f2["180 = 2 x 90"]
        f3["90 = 2 x 45"]
        f4["45 = 3 x 15"]
        f5["15 = 3 x 5"]
    end

    subgraph result["Prime Factorization"]
        pf["360 = 2³ x 3² x 5"]
    end

    subgraph applications["Applications"]
        divisors["Number of divisors = (3+1)(2+1)(1+1) = 24"]
        gcd["GCD(360, 150) = 2 x 3 x 5 = 30"]
        lcm["LCM(360, 150) = 2³ x 3² x 5² = 1800"]
    end

    number --> tree --> result --> applications

    classDef prime fill:#dcfce7,stroke:#16a34a
    class pf prime`,
};

/**
 * Modular Arithmetic template
 */
export const modularArithmetic: DiagramTemplate = {
  id: 'math-modular-arithmetic',
  name: 'Modular Arithmetic',
  description:
    'Modular arithmetic operations and congruence relations',
  domain: 'physics',
  promptTemplate: `Create a modular arithmetic diagram:
- Modulus (n): {{modulus}}
- Congruence relation: {{congruence}}
- Addition mod n: {{addition}}
- Multiplication mod n: {{multiplication}}
- Multiplicative inverse: {{inverse}}
- Solving linear congruence: {{linearCongruence}}
- Chinese Remainder Theorem: {{crt}}`,
  placeholders: [
    'modulus',
    'congruence',
    'addition',
    'multiplication',
    'inverse',
    'linearCongruence',
    'crt',
  ],
  mermaidExample: `flowchart TB
    subgraph modular["Modular Arithmetic (mod 7)"]
        mod["Working in Z_7 = {0, 1, 2, 3, 4, 5, 6}"]
    end

    subgraph operations["Operations"]
        add["5 + 4 = 9 equiv 2 (mod 7)"]
        mult["5 x 4 = 20 equiv 6 (mod 7)"]
        power["3⁴ = 81 equiv 4 (mod 7)"]
    end

    subgraph inverse["Multiplicative Inverse"]
        find["Find x: 3x equiv 1 (mod 7)"]
        solution["x = 5 (since 3 x 5 = 15 equiv 1)"]
    end

    subgraph solve["Solve: 3x equiv 5 (mod 7)"]
        step1["Multiply by 3⁻¹ = 5"]
        step2["x equiv 5 x 5 equiv 25 equiv 4 (mod 7)"]
    end

    modular --> operations --> inverse --> solve

    classDef modop fill:#fef3c7,stroke:#d97706
    class add,mult,power modop`,
};

// =============================================================================
// DIFFERENTIAL EQUATIONS TEMPLATES
// =============================================================================

/**
 * Differential Equation Solution template
 */
export const differentialEquationSolution: DiagramTemplate = {
  id: 'math-differential-equation',
  name: 'Differential Equation Solution',
  description:
    'Step-by-step solution of ordinary differential equations with initial conditions',
  domain: 'physics',
  promptTemplate: `Create a differential equation solution diagram:
- Differential equation: {{equation}}
- Order and type: {{orderType}}
- Solution method: {{method}}
- Homogeneous solution: {{homogeneousSolution}}
- Particular solution (if applicable): {{particularSolution}}
- General solution: {{generalSolution}}
- Initial conditions: {{initialConditions}}
- Specific solution: {{specificSolution}}
- Phase portrait (if applicable): {{phasePortrait}}`,
  placeholders: [
    'equation',
    'orderType',
    'method',
    'homogeneousSolution',
    'particularSolution',
    'generalSolution',
    'initialConditions',
    'specificSolution',
    'phasePortrait',
  ],
  mermaidExample: `flowchart TB
    subgraph problem["Problem: y'' + 4y = 0, y(0)=1, y'(0)=0"]
        type["Type: 2nd order linear homogeneous"]
    end

    subgraph characteristic["Characteristic Equation"]
        charEq["r² + 4 = 0"]
        roots["r = ±2i (complex roots)"]
    end

    subgraph general["General Solution"]
        form["y = e^(alpha*x)(C1*cos(beta*x) + C2*sin(beta*x))"]
        values["alpha = 0, beta = 2"]
        genSol["y = C1*cos(2x) + C2*sin(2x)"]
    end

    subgraph specific["Apply Initial Conditions"]
        ic1["y(0) = 1: C1 = 1"]
        ic2["y'(0) = 0: 2C2 = 0, C2 = 0"]
        final["y = cos(2x)"]
    end

    problem --> characteristic --> general --> specific

    classDef solution fill:#dcfce7,stroke:#16a34a
    class final solution`,
};

/**
 * Sequences and Series template
 */
export const sequencesAndSeries: DiagramTemplate = {
  id: 'math-sequences-series',
  name: 'Sequences and Series',
  description:
    'Analysis of sequences and infinite series including convergence tests',
  domain: 'physics',
  promptTemplate: `Create a sequences and series diagram:
- Sequence/series expression: {{expression}}
- Type: {{type}}
- First few terms: {{firstTerms}}
- Pattern identification: {{pattern}}
- Convergence test applied: {{convergenceTest}}
- Test result: {{testResult}}
- Sum formula (if convergent): {{sumFormula}}
- Interval of convergence (power series): {{intervalOfConvergence}}`,
  placeholders: [
    'expression',
    'type',
    'firstTerms',
    'pattern',
    'convergenceTest',
    'testResult',
    'sumFormula',
    'intervalOfConvergence',
  ],
  mermaidExample: `flowchart TB
    subgraph series["Series: sum(n=1 to inf) 1/n²"]
        type["Type: p-series with p = 2"]
        terms["Terms: 1 + 1/4 + 1/9 + 1/16 + ..."]
    end

    subgraph test["Convergence Test"]
        ptest["p-series test: converges if p > 1"]
        check["p = 2 > 1 check"]
        result["Series CONVERGES"]
    end

    subgraph sum["Sum Calculation"]
        famous["Famous result: Basel Problem"]
        value["sum(1/n²) = pi²/6 approx 1.6449"]
    end

    subgraph partial["Partial Sums"]
        s1["S1 = 1"]
        s2["S2 = 1.25"]
        s3["S3 approx 1.361"]
        s4["S4 approx 1.424"]
    end

    series --> test --> sum
    series --> partial

    classDef converge fill:#dcfce7,stroke:#16a34a
    class result converge`,
};

/**
 * Complex Numbers Analysis template
 */
export const complexNumbersAnalysis: DiagramTemplate = {
  id: 'math-complex-analysis',
  name: 'Complex Numbers Analysis',
  description:
    'Complex number operations, polar form, and geometric interpretation',
  domain: 'physics',
  promptTemplate: `Create a complex numbers analysis diagram:
- Complex number(s): {{complexNumbers}}
- Rectangular form: {{rectangularForm}}
- Polar form: {{polarForm}}
- Modulus: {{modulus}}
- Argument: {{argument}}
- Operation performed: {{operation}}
- Result: {{result}}
- Geometric interpretation: {{geometricInterpretation}}
- Euler form: {{eulerForm}}`,
  placeholders: [
    'complexNumbers',
    'rectangularForm',
    'polarForm',
    'modulus',
    'argument',
    'operation',
    'result',
    'geometricInterpretation',
    'eulerForm',
  ],
  mermaidExample: `flowchart TB
    subgraph number["Complex Number: z = 3 + 4i"]
        rect["Rectangular: a = 3, b = 4"]
    end

    subgraph calculations["Calculations"]
        mod["Modulus: |z| = sqrt(3² + 4²) = 5"]
        arg["Argument: theta = arctan(4/3) approx 53.13 deg"]
    end

    subgraph forms["Different Forms"]
        polar["Polar: 5(cos(53.13 deg) + i*sin(53.13 deg))"]
        euler["Euler: 5*e^(i*0.9273)"]
    end

    subgraph operations["Operations"]
        conj["Conjugate: z* = 3 - 4i"]
        power["z² = -7 + 24i"]
        recip["1/z = (3 - 4i)/25"]
    end

    subgraph geometric["Geometric View"]
        point["Point (3, 4) in complex plane"]
        distance["Distance from origin = 5"]
        angle["Angle from positive real axis approx 53 deg"]
    end

    number --> calculations --> forms
    number --> operations
    calculations --> geometric

    classDef calc fill:#dbeafe,stroke:#2563eb
    class mod,arg calc`,
};

// =============================================================================
// FUNCTION ANALYSIS TEMPLATES
// =============================================================================

/**
 * Function Analysis template
 */
export const functionAnalysis: DiagramTemplate = {
  id: 'math-function-analysis',
  name: 'Function Analysis',
  description:
    'Complete function analysis including domain, range, intercepts, asymptotes, and graph',
  domain: 'physics',
  promptTemplate: `Create a function analysis diagram:
- Function: {{function}}
- Domain: {{domain}}
- Range: {{range}}
- X-intercepts: {{xIntercepts}}
- Y-intercept: {{yIntercept}}
- Vertical asymptotes: {{verticalAsymptotes}}
- Horizontal asymptotes: {{horizontalAsymptotes}}
- Increasing/decreasing intervals: {{monotonicity}}
- Local maxima/minima: {{extrema}}
- Concavity and inflection points: {{concavity}}`,
  placeholders: [
    'function',
    'domain',
    'range',
    'xIntercepts',
    'yIntercept',
    'verticalAsymptotes',
    'horizontalAsymptotes',
    'monotonicity',
    'extrema',
    'concavity',
  ],
  mermaidExample: `flowchart TB
    subgraph function["Function: f(x) = (x² - 1)/(x - 2)"]
        simplified["Rational function"]
    end

    subgraph domain["Domain and Range"]
        dom["Domain: x =/= 2, or (-inf, 2) union (2, +inf)"]
        ran["Range: All reals (verify with calculus)"]
    end

    subgraph intercepts["Intercepts"]
        xint["X-intercepts: x = +-1 (set numerator = 0)"]
        yint["Y-intercept: f(0) = -1/(-2) = 1/2"]
    end

    subgraph asymptotes["Asymptotes"]
        vert["Vertical: x = 2"]
        horiz["No horizontal (degree num > degree den)"]
        oblique["Oblique: y = x + 2 (long division)"]
    end

    function --> domain --> intercepts --> asymptotes

    classDef asymp fill:#fee2e2,stroke:#dc2626
    class vert asymp`,
};

// =============================================================================
// ALL MATHEMATICS TEMPLATES EXPORT
// =============================================================================

/**
 * All mathematics templates exported as an array
 */
export const mathematicsTemplates: DiagramTemplate[] = [
  // Algebra
  quadraticAnalysis,
  polynomialFactoring,
  // Calculus
  derivativeRules,
  integrationTechniques,
  limitEvaluation,
  riemannSum,
  // Geometry
  triangleProperties,
  circleTheorems,
  coordinateGeometry,
  // Trigonometry
  trigIdentities,
  solvingTrigEquations,
  // Statistics
  descriptiveStatistics,
  normalDistributionAnalysis,
  hypothesisTesting,
  // Linear Algebra
  matrixOperations,
  determinantCalculation,
  eigenvalueProblem,
  // Graph Theory
  graphProperties,
  // Set Theory
  setOperations,
  // Number Theory
  primeFactorization,
  modularArithmetic,
  // Differential Equations
  differentialEquationSolution,
  // Sequences and Series
  sequencesAndSeries,
  // Complex Analysis
  complexNumbersAnalysis,
  // Function Analysis
  functionAnalysis,
];

export default mathematicsTemplates;
