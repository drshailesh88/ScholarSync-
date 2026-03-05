/**
 * mathematics-prompts.ts
 * Mathematics-specific prompt templates for AI diagram generation
 *
 * Contains specialized prompts for mathematical sciences including:
 * - Algebraic expressions and equations
 * - Calculus (limits, derivatives, integrals)
 * - Geometry and trigonometry
 * - Statistics and probability
 * - Linear algebra and matrices
 * - Graph theory and discrete mathematics
 * - Set theory and logic
 * - Number theory
 * - Mathematical proofs
 * - Function analysis
 *
 * Total: 25+ specialized prompts
 *
 * Ralph Loop Iteration 1 - Mathematics COMPLETE
 */

import type { FewShotExample } from './index';

// =============================================================================
// MATHEMATICS DOMAIN PROMPT
// =============================================================================

/**
 * Base mathematics domain prompt for mathematical diagrams
 */
export const MATHEMATICS_DOMAIN_PROMPT = `
Mathematics diagram requirements:
- Use standard mathematical notation and symbols
- Include proper spacing and alignment in equations
- Use appropriate parentheses and grouping symbols
- Show step-by-step work for derivations and proofs
- Color code: Blue for given/known, Green for derived/answer, Red for important notes
- Include clear labels on graphs (axes, scale, units where applicable)
- Use consistent notation throughout (e.g., don't mix f(x) and y)
- Reference theorems and definitions when used
- Show intermediate steps for complex calculations
- Use standard mathematical fonts and formatting`;

// =============================================================================
// MATHEMATICS-SPECIFIC PROMPTS
// =============================================================================

export const MATHEMATICS_PROMPTS = {
  // Algebra
  polynomialEquation: `
Polynomial Equation diagram requirements:
- Display the equation in standard form
- Identify degree, leading coefficient, constant term
- List all terms with their powers
- Show factored form if factorable
- Find all real and complex roots
- Graph the polynomial showing intercepts and behavior
- Include end behavior arrows
- Mark turning points if applicable`,

  systemOfEquations: `
System of Equations diagram requirements:
- Write both/all equations clearly
- Choose method: substitution, elimination, or matrix
- Show step-by-step solution
- Verify solution in all original equations
- If graphing: show intersection point(s)
- Handle cases: one solution, no solution, infinite solutions
- For 3 variables: show 3D interpretation if helpful
- Include matrix form Ax = b representation`,

  inequalities: `
Inequalities diagram requirements:
- Write the inequality in standard form
- Solve algebraically showing all steps
- Number line representation with correct notation
- Open/closed circles for strict/non-strict inequalities
- For systems: shade the solution region
- Test points to verify regions
- Write solution in interval notation
- For absolute value: handle both cases`,

  // Calculus
  limitProblem: `
Limit Problem diagram requirements:
- Write the limit expression clearly with lim notation
- Check direct substitution first
- Identify indeterminate forms (0/0, inf/inf, etc.)
- Apply appropriate technique (factoring, L'Hopital's, rationalization)
- Show algebraic simplification steps
- For one-sided limits: specify direction
- Graph the function near the point of interest
- Verify the limit exists (left = right for two-sided)`,

  derivativeApplication: `
Derivative Application diagram requirements:
- State the problem context clearly
- Define variables and their meanings
- Set up the equation relating variables
- Differentiate using appropriate rules
- For related rates: use implicit differentiation with respect to t
- Substitute known values
- Include units in the final answer
- Verify answer makes physical sense`,

  integrationProblem: `
Integration Problem diagram requirements:
- Identify the type of integral (indefinite/definite)
- Choose the appropriate technique
- For substitution: clearly define u and du
- For parts: show the table or LIATE choice
- For partial fractions: show decomposition
- Include +C for indefinite integrals
- Evaluate bounds for definite integrals
- Show the anti-derivative before evaluating bounds`,

  seriesConvergence: `
Series Convergence diagram requirements:
- Write the series in sigma notation
- Identify the type: geometric, p-series, alternating, etc.
- State the convergence test being used
- Apply the test showing all conditions
- For conditionally convergent: test both absolute and regular
- Find the sum if convergent (when possible)
- For power series: find radius and interval of convergence
- Show sequence of partial sums if helpful`,

  // Geometry
  geometricProof: `
Geometric Proof diagram requirements:
- Draw an accurate diagram with all given information
- Mark congruent sides/angles with proper notation
- List Given and Prove statements clearly
- Use two-column or paragraph proof format
- State each statement and reason
- Reference postulates, theorems, definitions by name
- Mark each step logically with transitions
- QED or concluding statement at the end`,

  coordinateProof: `
Coordinate Proof diagram requirements:
- Place figure strategically on coordinate plane
- Assign coordinates to vertices (use 0, a, b for simplicity)
- Apply distance, midpoint, slope formulas as needed
- Show algebraic calculations clearly
- State the property being proved
- Generalize the result (works for any values of a, b)
- Verify with specific example if helpful
- Connect geometric result to algebraic verification`,

  transformations: `
Geometric Transformations diagram requirements:
- Show the original figure (pre-image)
- Identify the transformation type
- For reflection: draw and label line of reflection
- For rotation: mark center and angle of rotation
- For translation: show the vector
- For dilation: indicate center and scale factor
- Draw the image with prime notation (A -> A')
- Show how key points map to their images`,

  // Trigonometry
  trigApplication: `
Trigonometry Application diagram requirements:
- Draw a clear diagram of the situation
- Label all known sides and angles
- Choose appropriate trig function(s)
- Set up the equation with the unknown
- Solve step by step
- Check if angle is in correct quadrant
- Consider ambiguous case for Law of Sines
- Include units in final answer`,

  trigGraph: `
Trigonometric Graph diagram requirements:
- Identify amplitude, period, phase shift, vertical shift
- Write the function in standard form
- Calculate key points (max, min, intercepts)
- Draw at least one complete period
- Label the axes with scale (especially x-axis in terms of pi)
- Show asymptotes for tan/cot/sec/csc
- Mark critical points clearly
- Show the parent function for comparison if helpful`,

  // Statistics
  probabilityProblem: `
Probability Problem diagram requirements:
- Define the sample space clearly
- Identify the event(s) of interest
- Determine if events are independent/dependent
- Use appropriate formula (addition, multiplication rule)
- For conditional: show P(A|B) = P(A and B)/P(B)
- For combinations/permutations: show which to use and why
- Create tree diagram or table if helpful
- Express final probability as fraction, decimal, and percent`,

  statisticalAnalysis: `
Statistical Analysis diagram requirements:
- Display the data set or summary statistics
- Calculate measures of center (mean, median, mode)
- Calculate measures of spread (range, IQR, std dev)
- Create appropriate visual (histogram, box plot, etc.)
- Identify outliers using IQR rule
- Describe the distribution shape
- Calculate z-scores for standardized comparisons
- Draw conclusions about the data`,

  confidenceInterval: `
Confidence Interval diagram requirements:
- State the confidence level (90%, 95%, 99%)
- Identify the parameter being estimated
- Check conditions for the interval type
- Calculate sample statistic (mean or proportion)
- Find the critical value (z* or t*)
- Calculate standard error
- Construct interval: point estimate +/- margin of error
- Interpret in context: We are __% confident that...`,

  regressionAnalysis: `
Regression Analysis diagram requirements:
- Create a scatter plot of the data
- Calculate correlation coefficient r
- Determine if linear model is appropriate
- Find equation of least squares line: y-hat = a + bx
- Calculate and interpret slope and y-intercept
- Find coefficient of determination r²
- Show residual plot to check assumptions
- Make predictions and state limitations`,

  // Linear Algebra
  linearSystem: `
Linear System (Matrix Form) diagram requirements:
- Write the augmented matrix [A|b]
- Perform row reduction to RREF
- Identify pivot positions
- Determine solution type (unique, none, infinite)
- Express solution set properly
- For infinite solutions: use parameters
- Verify solution in original system
- Discuss the geometry (intersection of planes)`,

  vectorOperations: `
Vector Operations diagram requirements:
- Draw vectors in appropriate coordinate system
- Show vector addition using head-to-tail method
- Calculate magnitude using ||v|| = sqrt(sum of squares)
- Find unit vectors using v/||v||
- Compute dot product and interpret angle
- Compute cross product (3D) and find area/volume
- Show orthogonal projection if relevant
- Include both algebraic and geometric representations`,

  linearTransformation: `
Linear Transformation diagram requirements:
- Define the transformation T: R^n -> R^m
- Find the standard matrix [T]
- Show action on standard basis vectors
- Illustrate geometric effect (rotation, reflection, etc.)
- Calculate determinant for square matrices
- Determine if one-to-one and/or onto
- Find kernel (null space) and range (column space)
- Show composition if multiple transformations`,

  // Number Theory
  divisibility: `
Divisibility Problem diagram requirements:
- State the divisibility rule being used
- Show the division algorithm: a = bq + r
- For GCD: use Euclidean algorithm
- For LCM: use prime factorization or formula
- Show factor trees if helpful
- List all divisors when asked
- Check divisibility by multiple numbers systematically
- State results with proper mathematical notation`,

  primeNumbers: `
Prime Numbers diagram requirements:
- Define prime and composite clearly
- Use Sieve of Eratosthenes for finding primes
- Show prime factorization using factor trees
- Verify primality using trial division up to sqrt(n)
- Apply Fundamental Theorem of Arithmetic
- Find number of prime factors
- Discuss distribution of primes if relevant
- Use proper exponent notation for prime factorization`,

  // Graph Theory
  graphAnalysis: `
Graph Theory Analysis diagram requirements:
- Draw the graph with vertices labeled
- Create adjacency matrix or list
- Calculate degree of each vertex
- Check if graph is connected
- Look for Euler paths/circuits (all edges once)
- Look for Hamiltonian paths/circuits (all vertices once)
- Determine if graph is bipartite
- Find chromatic number (minimum colors for proper coloring)`,

  treeStructure: `
Tree Structure diagram requirements:
- Draw tree with root at top
- Label vertices and edges if needed
- Calculate number of edges (n-1 for n vertices)
- Identify leaves (degree 1 vertices)
- Find height/depth of the tree
- Perform traversals (pre-order, in-order, post-order)
- Show binary search tree properties if BST
- Calculate path lengths if relevant`,

  // Logic and Proofs
  logicalProof: `
Logical Proof diagram requirements:
- State the proposition to be proved
- Identify the proof technique (direct, contrapositive, contradiction)
- List all given/assumptions
- Show logical chain of implications
- Reference logical rules used (modus ponens, etc.)
- Use proper logical symbols (and, or, implies, iff, forall, exists)
- Handle quantifiers correctly
- Conclude with clear statement of what was proved`,

  truthTable: `
Truth Table diagram requirements:
- List all variables in the leftmost columns
- Show all 2^n possible combinations
- Build up compound statements column by column
- Use proper notation (and, or, not, implies, iff)
- Identify tautologies (all T), contradictions (all F)
- Check logical equivalence by comparing columns
- Verify arguments by checking if premises imply conclusion
- Format table clearly with headers`,

  // Mathematical Modeling
  optimization: `
Optimization Problem diagram requirements:
- Define the objective function to maximize/minimize
- Identify all constraint equations/inequalities
- State the domain of the variables
- For calculus: find critical points using derivatives
- For linear programming: graph feasible region
- Check boundary points and corners
- Apply second derivative test if applicable
- State the optimal solution with units and context`,

  mathematicalModel: `
Mathematical Model diagram requirements:
- Clearly define all variables and their units
- State assumptions made
- Develop equations/functions relating variables
- Identify parameters vs. variables
- Show how model fits the data/situation
- Include initial conditions for differential equations
- Discuss limitations of the model
- Make predictions and verify reasonableness`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Mathematics-specific few-shot examples
 */
export const MATHEMATICS_FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    prompt: 'Create a diagram showing the steps to solve a quadratic equation',
    output: `flowchart TB
    subgraph problem["Problem: x² - 5x + 6 = 0"]
        equation["Standard Form: ax² + bx + c = 0"]
        coeffs["a = 1, b = -5, c = 6"]
    end

    subgraph method["Method 1: Factoring"]
        factor1["Find two numbers that:"]
        conditions["Multiply to ac = 6"]
        conditions2["Add to b = -5"]
        numbers["Numbers: -2 and -3"]
        factored["(x - 2)(x - 3) = 0"]
    end

    subgraph zpp["Zero Product Property"]
        eq1["x - 2 = 0 or x - 3 = 0"]
        sol1["x = 2 or x = 3"]
    end

    subgraph verify["Verification"]
        check1["x=2: 4 - 10 + 6 = 0 check"]
        check2["x=3: 9 - 15 + 6 = 0 check"]
    end

    subgraph method2["Method 2: Quadratic Formula"]
        formula["x = (-b +/- sqrt(b²-4ac)) / 2a"]
        sub["x = (5 +/- sqrt(25-24)) / 2"]
        simplify["x = (5 +/- 1) / 2"]
        result["x = 3 or x = 2"]
    end

    problem --> method --> zpp --> verify
    problem --> method2

    style factored fill:#dcfce7,stroke:#16a34a
    style sol1 fill:#dcfce7,stroke:#16a34a`,
  },
  {
    prompt: 'Create a flowchart for finding the derivative using the chain rule',
    output: `flowchart TB
    subgraph function["Function: f(x) = sin(3x² + 1)"]
        identify["Identify composition: f(g(x))"]
    end

    subgraph outer["Outer Function"]
        outerF["f(u) = sin(u)"]
        outerD["f'(u) = cos(u)"]
    end

    subgraph inner["Inner Function"]
        innerG["g(x) = 3x² + 1"]
        innerD["g'(x) = 6x"]
    end

    subgraph chainRule["Chain Rule Application"]
        formula["d/dx[f(g(x))] = f'(g(x)) * g'(x)"]
        step1["= cos(3x² + 1) * 6x"]
        final["= 6x * cos(3x² + 1)"]
    end

    function --> outer
    function --> inner
    outer --> chainRule
    inner --> chainRule

    style final fill:#dcfce7,stroke:#16a34a`,
  },
  {
    prompt: 'Create a diagram showing hypothesis testing procedure',
    output: `flowchart TB
    subgraph step1["Step 1: State Hypotheses"]
        h0["H₀: mu = 50 (null hypothesis)"]
        ha["Hₐ: mu =/= 50 (two-tailed)"]
    end

    subgraph step2["Step 2: Set Significance Level"]
        alpha["alpha = 0.05"]
        critical["Critical values: z = +/-1.96"]
    end

    subgraph step3["Step 3: Collect Data & Calculate"]
        data["Sample: n=36, x-bar=53, s=12"]
        testStat["z = (x-bar - mu₀)/(s/sqrt(n))"]
        calc["z = (53-50)/(12/6) = 1.5"]
    end

    subgraph step4["Step 4: Make Decision"]
        compare{"Is |1.5| > 1.96?"}
        compare -->|No| fail["Fail to reject H₀"]
        compare -->|Yes| reject["Reject H₀"]
    end

    subgraph step5["Step 5: Conclusion"]
        conclusion["At alpha=0.05, insufficient evidence<br/>to conclude mu =/= 50"]
    end

    step1 --> step2 --> step3 --> step4 --> step5

    style fail fill:#fef3c7,stroke:#d97706
    style conclusion fill:#dbeafe,stroke:#2563eb`,
  },
  {
    prompt: 'Create a diagram showing matrix multiplication',
    output: `flowchart TB
    subgraph matrices["Given Matrices"]
        A["A = [1 2; 3 4] (2x2)"]
        B["B = [5 6; 7 8] (2x2)"]
    end

    subgraph check["Dimension Check"]
        dims["A(2x2) * B(2x2) = C(2x2)"]
        ok["Inner dimensions match check"]
    end

    subgraph formula["Formula: (AB)ᵢⱼ = Σ aᵢₖ * bₖⱼ"]
        row1["Row i of A"]
        col1["Column j of B"]
        dot["Dot product"]
    end

    subgraph calc["Calculation"]
        c11["C₁₁ = 1(5) + 2(7) = 19"]
        c12["C₁₂ = 1(6) + 2(8) = 22"]
        c21["C₂₁ = 3(5) + 4(7) = 43"]
        c22["C₂₂ = 3(6) + 4(8) = 50"]
    end

    subgraph result["Result"]
        C["C = AB = [19 22; 43 50]"]
    end

    matrices --> check --> formula --> calc --> result

    style C fill:#dcfce7,stroke:#16a34a`,
  },
  {
    prompt: 'Create a diagram for integration by parts',
    output: `flowchart TB
    subgraph problem["Integral: integral of x * e^x dx"]
        form["Form: integral u dv = uv - integral v du"]
    end

    subgraph liate["LIATE Selection Rule"]
        rule["L: Logarithmic"]
        rule2["I: Inverse trig"]
        rule3["A: Algebraic <- choose u = x"]
        rule4["T: Trigonometric"]
        rule5["E: Exponential <- choose dv = e^x dx"]
    end

    subgraph setup["Setup"]
        u["u = x -> du = dx"]
        dv["dv = e^x dx -> v = e^x"]
    end

    subgraph apply["Apply Formula"]
        step1["integral x*e^x dx = x*e^x - integral e^x dx"]
        step2["= x*e^x - e^x + C"]
        step3["= e^x(x - 1) + C"]
    end

    subgraph verify["Verification"]
        deriv["d/dx[e^x(x-1)] = e^x(x-1) + e^x*1"]
        check["= e^x*x - e^x + e^x = x*e^x check"]
    end

    problem --> liate --> setup --> apply --> verify

    style step3 fill:#dcfce7,stroke:#16a34a`,
  },
  {
    prompt: 'Create a diagram showing the unit circle with key angles',
    output: `flowchart TB
    subgraph unitCircle["Unit Circle: x² + y² = 1"]
        definition["Point (cos(theta), sin(theta)) on circle"]
    end

    subgraph quadrant1["Quadrant I (0 to pi/2)"]
        a0["0deg: (1, 0)"]
        a30["30deg = pi/6: (sqrt(3)/2, 1/2)"]
        a45["45deg = pi/4: (sqrt(2)/2, sqrt(2)/2)"]
        a60["60deg = pi/3: (1/2, sqrt(3)/2)"]
        a90["90deg = pi/2: (0, 1)"]
    end

    subgraph quadrant2["Quadrant II (pi/2 to pi)"]
        signs2["(-, +)"]
        a120["120deg = 2pi/3: (-1/2, sqrt(3)/2)"]
        a180["180deg = pi: (-1, 0)"]
    end

    subgraph quadrant3["Quadrant III (pi to 3pi/2)"]
        signs3["(-, -)"]
        a270["270deg = 3pi/2: (0, -1)"]
    end

    subgraph quadrant4["Quadrant IV (3pi/2 to 2pi)"]
        signs4["(+, -)"]
        a360["360deg = 2pi: (1, 0)"]
    end

    subgraph reference["Reference Angle Pattern"]
        pattern["Same |sin| and |cos| values<br/>Only signs change by quadrant"]
    end

    unitCircle --> quadrant1
    unitCircle --> quadrant2
    unitCircle --> quadrant3
    unitCircle --> quadrant4

    style a30 fill:#dbeafe,stroke:#2563eb
    style a45 fill:#dcfce7,stroke:#16a34a
    style a60 fill:#f3e8ff,stroke:#9333ea`,
  },
  {
    prompt: 'Create a diagram showing the normal distribution and empirical rule',
    output: `flowchart TB
    subgraph distribution["Normal Distribution N(mu, sigma)"]
        params["Mean mu = center, SD sigma = spread"]
        shape["Symmetric, bell-shaped, unimodal"]
    end

    subgraph empirical["Empirical Rule (68-95-99.7)"]
        rule1["68% within 1 SD: (mu - sigma, mu + sigma)"]
        rule2["95% within 2 SD: (mu - 2sigma, mu + 2sigma)"]
        rule3["99.7% within 3 SD: (mu - 3sigma, mu + 3sigma)"]
    end

    subgraph zscore["Z-Score Standardization"]
        formula["z = (x - mu) / sigma"]
        meaning["z tells how many SDs from mean"]
        standard["Standard normal: N(0, 1)"]
    end

    subgraph probabilities["Key Probabilities"]
        left["P(Z < 0) = 0.5"]
        oneSD["P(-1 < Z < 1) = 0.68"]
        twoSD["P(-2 < Z < 2) = 0.95"]
        tail["P(Z > 2) = 0.025"]
    end

    distribution --> empirical --> zscore --> probabilities

    style rule2 fill:#fef3c7,stroke:#d97706`,
  },
  {
    prompt: 'Create a proof diagram for the Pythagorean theorem',
    output: `flowchart TB
    subgraph given["Given"]
        triangle["Right triangle with legs a, b and hypotenuse c"]
        rightAngle["Right angle at C"]
    end

    subgraph prove["Prove: a² + b² = c²"]
        goal["Pythagorean Theorem"]
    end

    subgraph proof["Proof by Areas"]
        step1["Construct square with side (a+b)"]
        step2["Area of large square = (a+b)²"]
        step3["Place 4 copies of the triangle inside"]
        step4["Remaining shape is square with side c"]
    end

    subgraph calculation["Area Calculation"]
        eq1["(a+b)² = 4 * (1/2 * a * b) + c²"]
        eq2["a² + 2ab + b² = 2ab + c²"]
        eq3["a² + b² = c²"]
    end

    subgraph qed["Q.E.D."]
        conclude["The Pythagorean theorem is proved"]
    end

    given --> prove --> proof --> calculation --> qed

    style eq3 fill:#dcfce7,stroke:#16a34a
    style qed fill:#f3e8ff,stroke:#9333ea`,
  },
];

// =============================================================================
// EXPORT
// =============================================================================

export default {
  MATHEMATICS_DOMAIN_PROMPT,
  MATHEMATICS_PROMPTS,
  MATHEMATICS_FEW_SHOT_EXAMPLES,
};
