#!/usr/bin/env node
"use strict";

const path = require("path");
const fs = require("fs");
const { Project, SyntaxKind, ts } = require("ts-morph");

// ── Module → entry files mapping ───────────────────────────────
const MODULE_MAP = {
  editor: [
    "src/app/(app)/editor/[id]/page.tsx",
    "src/app/(app)/studio/page.tsx",
  ],
  research: ["src/app/(app)/research/page.tsx"],
  notebook: ["src/app/(app)/notebook/page.tsx"],
  slides: ["src/app/(app)/slides/page.tsx"],
  compliance: ["src/app/(app)/compliance/page.tsx"],
  dashboard: ["src/app/(app)/dashboard/page.tsx"],
  library: ["src/app/(app)/library/page.tsx"],
  settings: ["src/app/(app)/settings/page.tsx"],
  illustrate: [
    "src/app/(app)/illustrate/page.tsx",
    "src/app/(app)/illustrate/agent/page.tsx",
    "src/app/(app)/illustrate/editor/page.tsx",
  ],
  feeds: ["src/app/(app)/feeds/page.tsx"],
  latex: [
    "src/app/(app)/latex/page.tsx",
    "src/app/(app)/latex/[projectId]/page.tsx",
  ],
  "systematic-review": [
    "src/app/(app)/systematic-review/page.tsx",
    "src/app/(app)/systematic-review/[projectId]/page.tsx",
  ],
  projects: ["src/app/(app)/projects/page.tsx"],
  onboarding: ["src/app/(app)/onboarding/page.tsx"],
  analysis: ["src/app/(app)/analysis/page.tsx"],
  poster: [
    "src/app/(app)/poster/new/page.tsx",
    "src/app/(app)/poster/[posterId]/page.tsx",
  ],
  presentation: [
    "src/app/(app)/presentation/page.tsx",
    "src/app/(app)/presentation/new/page.tsx",
    "src/app/(app)/presentation/[deckId]/page.tsx",
  ],
  "deep-research": ["src/app/(app)/deep-research/page.tsx"],
  "slides-ai": [
    "src/app/(app)/slides/new/page.tsx",
    "src/app/(app)/slides/[deckId]/page.tsx",
  ],
  studio: ["src/app/(app)/studio/page.tsx"],
};

const ROOT = process.cwd();

// ── Helpers ────────────────────────────────────────────────────

function resolveImportPath(fromFile, importSpecifier) {
  let resolved = importSpecifier;
  if (resolved.startsWith("@/")) {
    resolved = path.join(ROOT, "src", resolved.slice(2));
  } else if (resolved.startsWith(".")) {
    resolved = path.resolve(path.dirname(fromFile), resolved);
  } else {
    return null;
  }

  const extensions = [".tsx", ".ts", ".jsx", ".js"];
  for (const ext of extensions) {
    const full = resolved + ext;
    if (fs.existsSync(full)) return full;
  }
  for (const ext of extensions) {
    const full = path.join(resolved, "index" + ext);
    if (fs.existsSync(full)) return full;
  }
  if (fs.existsSync(resolved)) return resolved;
  return null;
}

function relPath(absPath) {
  return path.relative(ROOT, absPath);
}

// ── Import tree builder ────────────────────────────────────────

function buildImportTree(entryFiles, project) {
  const visited = new Set();
  const tree = {};

  function walk(filePath) {
    const abs = path.resolve(ROOT, filePath);
    if (visited.has(abs)) return;
    visited.add(abs);

    let sourceFile = project.getSourceFile(abs);
    if (!sourceFile) {
      try {
        sourceFile = project.addSourceFileAtPath(abs);
      } catch (err) {
        console.warn(`  WARN: Could not parse ${relPath(abs)}: ${err.message}`);
        return;
      }
    }

    const imports = [];
    for (const decl of sourceFile.getImportDeclarations()) {
      const specifier = decl.getModuleSpecifierValue();
      const resolved = resolveImportPath(abs, specifier);
      if (resolved) {
        imports.push(relPath(resolved));
        walk(resolved);
      }
    }

    sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression).forEach((call) => {
      const expr = call.getExpression();
      if (expr.getKind() === SyntaxKind.ImportKeyword) {
        const args = call.getArguments();
        if (args.length > 0 && args[0].getKind() === SyntaxKind.StringLiteral) {
          const specifier = args[0].getLiteralText();
          const resolved = resolveImportPath(abs, specifier);
          if (resolved) {
            imports.push(relPath(resolved));
            walk(resolved);
          }
        }
      }
    });

    tree[relPath(abs)] = imports;
  }

  for (const entry of entryFiles) {
    const abs = path.resolve(ROOT, entry);
    if (fs.existsSync(abs)) {
      walk(entry);
    } else {
      console.warn(`  WARN: Entry file not found: ${entry}`);
    }
  }

  return { tree, visited };
}

// ── Common utilities ───────────────────────────────────────────

function getLineNum(node) {
  return node.getStartLineNumber();
}

function getText(node) {
  try {
    return node.getText().slice(0, 200);
  } catch {
    return "";
  }
}

function getAttrName(attr) {
  try {
    if (typeof attr.getName === "function") return attr.getName();
    if (typeof attr.getNameNode === "function") return attr.getNameNode().getText();
    const id = attr.getFirstChildByKind(SyntaxKind.Identifier);
    return id ? id.getText() : null;
  } catch {
    return null;
  }
}

function getParentElementName(attr) {
  let element = "unknown";
  const parentEl = attr.getFirstAncestorByKind(SyntaxKind.JsxSelfClosingElement);
  const parentEl2 = attr.getFirstAncestorByKind(SyntaxKind.JsxOpeningElement);
  if (parentEl) element = parentEl.getTagNameNode().getText();
  else if (parentEl2) element = parentEl2.getTagNameNode().getText();
  return element;
}

// ── Master extractor ───────────────────────────────────────────

function extractPatterns(sourceFile, filePath) {
  const patterns = [];
  const rel = relPath(filePath);

  const extractors = [
    // Original 11
    extractJsxConditionals,
    extractAllTernaries,
    extractDisabledStates,
    extractPlaceholders,
    extractStringLiterals,
    extractEventHandlers,
    extractFetchCalls,
    extractUseEffect,
    extractTimers,
    extractTryCatch,
    extractUseState,
    // New extractors
    extractNonJsxStrings,
    extractJsxExpressions,
    extractListRenders,
    extractHrefAttributes,
    extractHookCalls,
    extractComponentUsage,
    extractExportedFunctions,
    extractIfStatements,
    extractAwaitExpressions,
    extractTypeDeclarations,
    extractThrowStatements,
    extractConsoleCalls,
  ];
  for (const fn of extractors) {
    try {
      fn(sourceFile, rel, patterns);
    } catch (err) {
      console.warn(`  WARN: ${fn.name} failed on ${rel}: ${err.message}`);
    }
  }

  return patterns;
}

// ═══════════════════════════════════════════════════════════════
// ORIGINAL EXTRACTORS (fixed/improved)
// ═══════════════════════════════════════════════════════════════

// a. JSX Conditionals: {condition && <Component/>}
function extractJsxConditionals(sf, file, out) {
  sf.getDescendantsOfKind(SyntaxKind.BinaryExpression).forEach((bin) => {
    if (bin.getOperatorToken().getKind() !== SyntaxKind.AmpersandAmpersandToken) return;
    const right = bin.getRight();
    const rightKind = right.getKind();
    if (
      rightKind === SyntaxKind.JsxElement ||
      rightKind === SyntaxKind.JsxSelfClosingElement ||
      rightKind === SyntaxKind.JsxFragment ||
      rightKind === SyntaxKind.ParenthesizedExpression
    ) {
      const condition = getText(bin.getLeft());
      let component = "";
      if (rightKind === SyntaxKind.JsxSelfClosingElement) {
        component = right.getTagNameNode().getText();
      } else if (rightKind === SyntaxKind.JsxElement) {
        component = right.getOpeningElement().getTagNameNode().getText();
      } else if (rightKind === SyntaxKind.ParenthesizedExpression) {
        const inner = right.getExpression();
        if (inner.getKind() === SyntaxKind.JsxElement || inner.getKind() === SyntaxKind.JsxSelfClosingElement) {
          component = inner.getKind() === SyntaxKind.JsxSelfClosingElement
            ? inner.getTagNameNode().getText()
            : inner.getOpeningElement().getTagNameNode().getText();
        } else {
          component = getText(inner).slice(0, 80);
        }
      } else {
        component = getText(right).slice(0, 80);
      }
      out.push({ type: "conditional", file, line: getLineNum(bin), condition, component });
    }
  });
}

// b. ALL Ternaries (JSX and non-JSX)
function extractAllTernaries(sf, file, out) {
  sf.getDescendantsOfKind(SyntaxKind.ConditionalExpression).forEach((cond) => {
    const whenTrue = cond.getWhenTrue();
    const whenFalse = cond.getWhenFalse();

    function getJsxName(node) {
      const k = node.getKind();
      if (k === SyntaxKind.JsxSelfClosingElement) return node.getTagNameNode().getText();
      if (k === SyntaxKind.JsxElement) return node.getOpeningElement().getTagNameNode().getText();
      if (k === SyntaxKind.ParenthesizedExpression) return getJsxName(node.getExpression());
      return getText(node).slice(0, 60);
    }

    out.push({
      type: "ternary",
      file,
      line: getLineNum(cond),
      condition: getText(cond.getCondition()),
      trueComponent: getJsxName(whenTrue),
      falseComponent: getJsxName(whenFalse),
    });
  });
}

// c. Disabled states
function extractDisabledStates(sf, file, out) {
  for (const attr of sf.getDescendantsOfKind(SyntaxKind.JsxAttribute)) {
    if (getAttrName(attr) !== "disabled") continue;
    const init = attr.getInitializer();
    let condition = "true";
    if (init) {
      if (init.getKind() === SyntaxKind.JsxExpression) {
        const expr = init.getExpression();
        condition = expr ? getText(expr) : "true";
      } else {
        condition = getText(init);
      }
    }
    out.push({ type: "disabled", file, line: getLineNum(attr), element: getParentElementName(attr), condition });
  }
}

// d. Placeholder strings
function extractPlaceholders(sf, file, out) {
  for (const attr of sf.getDescendantsOfKind(SyntaxKind.JsxAttribute)) {
    if (getAttrName(attr) !== "placeholder") continue;
    const init = attr.getInitializer();
    if (!init) continue;
    let value = "";
    if (init.getKind() === SyntaxKind.StringLiteral) {
      value = init.getLiteralText();
    } else if (init.getKind() === SyntaxKind.JsxExpression) {
      const expr = init.getExpression();
      value = expr ? getText(expr) : "";
    } else {
      value = getText(init);
    }
    if (value) out.push({ type: "placeholder", file, line: getLineNum(attr), value });
  }
}

// e. String literals in JSX (visible text, title, aria-label)
function extractStringLiterals(sf, file, out) {
  // JSX text content
  sf.getDescendantsOfKind(SyntaxKind.JsxText).forEach((node) => {
    const text = node.getText().trim();
    if (text && text.length > 1 && !/^\s*$/.test(text)) {
      out.push({ type: "string", file, line: getLineNum(node), attribute: "text", value: text.slice(0, 200) });
    }
  });

  // Title, aria-label, alt attributes
  const attrNames = ["title", "aria-label", "aria-placeholder", "alt"];
  for (const attr of sf.getDescendantsOfKind(SyntaxKind.JsxAttribute)) {
    const name = getAttrName(attr);
    if (!name || !attrNames.includes(name)) continue;
    const init = attr.getInitializer();
    if (init && init.getKind() === SyntaxKind.StringLiteral) {
      out.push({ type: "string", file, line: getLineNum(attr), attribute: name, value: init.getLiteralText() });
    }
  }
}

// f. Event handlers
function extractEventHandlers(sf, file, out) {
  const events = [
    "onClick", "onSubmit", "onKeyDown", "onChange", "onKeyUp", "onKeyPress",
    "onBlur", "onFocus", "onInput", "onMouseDown", "onMouseUp",
    "onDragStart", "onDragEnd", "onDrop", "onScroll", "onWheel", "onPointerDown",
    "onDoubleClick", "onContextMenu", "onMouseEnter", "onMouseLeave",
    "onTouchStart", "onTouchEnd", "onPaste", "onCopy",
  ];
  for (const attr of sf.getDescendantsOfKind(SyntaxKind.JsxAttribute)) {
    const name = getAttrName(attr);
    if (!name || !events.includes(name)) continue;
    const element = getParentElementName(attr);
    const init = attr.getInitializer();
    let handlerName = "";
    if (init && init.getKind() === SyntaxKind.JsxExpression) {
      const expr = init.getExpression();
      handlerName = expr ? getText(expr).slice(0, 100) : "";
    }
    out.push({ type: "handler", file, line: getLineNum(attr), event: name, element, handlerName });
  }
}

// g. Fetch calls / API calls
function extractFetchCalls(sf, file, out) {
  sf.getDescendantsOfKind(SyntaxKind.CallExpression).forEach((call) => {
    const exprText = call.getExpression().getText();
    const isFetch = exprText === "fetch";
    const isAxios = /^(axios|api)\.(get|post|put|patch|delete)$/.test(exprText);
    if (!isFetch && !isAxios) return;

    const args = call.getArguments();
    let url = "";
    let method = "GET";

    if (isFetch && args.length > 0) {
      url = getText(args[0]).replace(/['"`]/g, "").slice(0, 200);
      if (args.length > 1) {
        const optText = getText(args[1]);
        const methodMatch = optText.match(/method:\s*["'](\w+)["']/);
        if (methodMatch) method = methodMatch[1].toUpperCase();
      }
    } else if (isAxios && args.length > 0) {
      method = exprText.split(".").pop().toUpperCase();
      url = getText(args[0]).replace(/['"`]/g, "").slice(0, 200);
    }
    out.push({ type: "api_call", file, line: getLineNum(call), url, method });
  });
}

// h. useEffect
function extractUseEffect(sf, file, out) {
  sf.getDescendantsOfKind(SyntaxKind.CallExpression).forEach((call) => {
    if (call.getExpression().getText() !== "useEffect") return;
    const args = call.getArguments();
    let deps = "none";
    let hasCleanup = false;
    if (args.length >= 2) deps = getText(args[1]);
    if (args.length >= 1) hasCleanup = /return\s/.test(getText(args[0]));
    out.push({ type: "effect", file, line: getLineNum(call), deps, hasCleanup });
  });
}

// i. setTimeout / setInterval
function extractTimers(sf, file, out) {
  sf.getDescendantsOfKind(SyntaxKind.CallExpression).forEach((call) => {
    const name = call.getExpression().getText();
    if (name !== "setTimeout" && name !== "setInterval") return;
    const args = call.getArguments();
    let delay = "unknown";
    let functionName = "";
    if (args.length >= 2) delay = getText(args[1]);
    if (args.length >= 1) {
      const fn = args[0];
      functionName = fn.getKind() === SyntaxKind.Identifier ? fn.getText() : name + "_callback";
    }
    out.push({ type: "timer", file, line: getLineNum(call), timerType: name, delay, functionName });
  });
}

// j. try/catch
function extractTryCatch(sf, file, out) {
  sf.getDescendantsOfKind(SyntaxKind.TryStatement).forEach((tryStmt) => {
    const catchClause = tryStmt.getCatchClause();
    let catchAction = "empty";
    if (catchClause) {
      const block = catchClause.getBlock();
      const stmts = block.getStatements();
      if (stmts.length > 0) {
        catchAction = stmts.map((s) => getText(s)).join("; ").slice(0, 200);
      }
    }
    out.push({ type: "error_handler", file, line: getLineNum(tryStmt), catchAction });
  });
}

// k. useState
function extractUseState(sf, file, out) {
  sf.getDescendantsOfKind(SyntaxKind.CallExpression).forEach((call) => {
    if (call.getExpression().getText() !== "useState") return;
    const args = call.getArguments();
    let initialValue = "undefined";
    if (args.length > 0) initialValue = getText(args[0]).slice(0, 100);
    let name = "unknown";
    const parent = call.getParent();
    if (parent && parent.getKind() === SyntaxKind.VariableDeclaration) {
      const nameNode = parent.getNameNode();
      if (nameNode.getKind() === SyntaxKind.ArrayBindingPattern) {
        const elements = nameNode.getElements();
        if (elements.length > 0) name = elements[0].getText();
      }
    }
    out.push({ type: "state", file, line: getLineNum(call), name, initialValue });
  });
}

// ═══════════════════════════════════════════════════════════════
// NEW EXTRACTORS
// ═══════════════════════════════════════════════════════════════

// l. Non-JSX string literals: object properties, return values, function args, variable assignments
function extractNonJsxStrings(sf, file, out) {
  // Collect all StringLiteral nodes
  sf.getDescendantsOfKind(SyntaxKind.StringLiteral).forEach((node) => {
    const value = node.getLiteralText();
    // Skip very short strings, CSS classes, empty strings, import specifiers
    if (value.length < 2) return;
    if (/^(bg-|text-|border-|hover:|flex|grid|rounded|p-|m-|w-|h-|gap-|items-|justify-|transition|cursor-)/.test(value)) return;

    // Skip if this is an import module specifier
    const parent = node.getParent();
    if (!parent) return;
    const pk = parent.getKind();
    if (pk === SyntaxKind.ImportDeclaration || pk === SyntaxKind.ImportSpecifier) return;
    // Skip ExternalModuleReference or import calls
    if (pk === SyntaxKind.CallExpression && parent.getExpression().getKind() === SyntaxKind.ImportKeyword) return;

    // Skip if this is already inside a JsxText or JsxAttribute (covered by extractStringLiterals)
    let ancestor = parent;
    let isJsxContext = false;
    for (let i = 0; i < 3 && ancestor; i++) {
      const ak = ancestor.getKind();
      if (ak === SyntaxKind.JsxAttribute || ak === SyntaxKind.JsxText) {
        isJsxContext = true;
        break;
      }
      ancestor = ancestor.getParent();
    }
    if (isJsxContext) return;

    // Determine context
    let context = "assignment";
    if (pk === SyntaxKind.PropertyAssignment) {
      const propName = parent.getFirstChildByKind(SyntaxKind.Identifier);
      context = propName ? `property:${propName.getText()}` : "property";
    } else if (pk === SyntaxKind.ReturnStatement) {
      context = "return";
    } else if (pk === SyntaxKind.CallExpression || pk === SyntaxKind.NewExpression) {
      context = "argument";
    } else if (pk === SyntaxKind.VariableDeclaration) {
      context = "variable";
    } else if (pk === SyntaxKind.BinaryExpression) {
      context = "expression";
    } else if (pk === SyntaxKind.ThrowStatement) {
      return; // covered by extractThrowStatements
    }

    out.push({ type: "config_string", file, line: getLineNum(node), value: value.slice(0, 120), context });
  });

  // Also catch template literals (NoSubstitutionTemplateLiteral and TemplateExpression)
  sf.getDescendantsOfKind(SyntaxKind.TemplateExpression).forEach((node) => {
    // Skip if inside JSX (already captured)
    const parent = node.getParent();
    if (parent && parent.getKind() === SyntaxKind.JsxExpression) return;
    const text = getText(node).slice(0, 120);
    if (text.length > 3) {
      out.push({ type: "config_string", file, line: getLineNum(node), value: text, context: "template" });
    }
  });
}

// m. JSX dynamic expressions: {variable}, {fn()}, {obj.prop} inside JSX
function extractJsxExpressions(sf, file, out) {
  sf.getDescendantsOfKind(SyntaxKind.JsxExpression).forEach((jsxExpr) => {
    const expr = jsxExpr.getExpression();
    if (!expr) return;
    const ek = expr.getKind();

    // Skip ternaries and && (covered by other extractors)
    if (ek === SyntaxKind.ConditionalExpression) return;
    if (ek === SyntaxKind.BinaryExpression) return;
    // Skip arrow functions (event handlers covered separately)
    if (ek === SyntaxKind.ArrowFunction) return;

    // Skip if this is an attribute value for className/key/style/ref (low signal)
    const parent = jsxExpr.getParent();
    if (parent && parent.getKind() === SyntaxKind.JsxAttribute) {
      const aName = getAttrName(parent);
      if (aName && ["className", "key", "style", "ref", "dangerouslySetInnerHTML"].includes(aName)) return;
      // If it's an event handler attr, skip (already captured)
      if (aName && aName.startsWith("on") && aName[2] && aName[2] === aName[2].toUpperCase()) return;
    }

    // This is a dynamic value rendered in JSX
    const text = getText(expr).slice(0, 100);
    if (text.length < 2) return;

    let exprType = "variable";
    if (ek === SyntaxKind.CallExpression) exprType = "function_call";
    else if (ek === SyntaxKind.PropertyAccessExpression) exprType = "property";
    else if (ek === SyntaxKind.Identifier) exprType = "variable";
    else if (ek === SyntaxKind.TemplateExpression || ek === SyntaxKind.NoSubstitutionTemplateLiteral) exprType = "template";

    out.push({ type: "jsx_expression", file, line: getLineNum(jsxExpr), expression: text, exprType });
  });
}

// n. .map() list renders in JSX
function extractListRenders(sf, file, out) {
  sf.getDescendantsOfKind(SyntaxKind.CallExpression).forEach((call) => {
    const expr = call.getExpression();
    if (expr.getKind() !== SyntaxKind.PropertyAccessExpression) return;
    const propAccess = expr;
    const methodName = propAccess.getLastChild();
    if (!methodName || methodName.getText() !== "map") return;

    // Check if this is inside a JSX expression
    let inJsx = false;
    let ancestor = call.getParent();
    for (let i = 0; i < 5 && ancestor; i++) {
      if (ancestor.getKind() === SyntaxKind.JsxExpression) {
        inJsx = true;
        break;
      }
      ancestor = ancestor.getParent();
    }
    if (!inJsx) return;

    const arrayName = propAccess.getExpression().getText();
    out.push({ type: "list_render", file, line: getLineNum(call), arrayName: arrayName.slice(0, 80) });
  });
}

// o. href attributes (navigation links)
function extractHrefAttributes(sf, file, out) {
  for (const attr of sf.getDescendantsOfKind(SyntaxKind.JsxAttribute)) {
    const name = getAttrName(attr);
    if (name !== "href") continue;
    const init = attr.getInitializer();
    if (!init) continue;
    let value = "";
    let isDynamic = false;
    if (init.getKind() === SyntaxKind.StringLiteral) {
      value = init.getLiteralText();
    } else if (init.getKind() === SyntaxKind.JsxExpression) {
      const expr = init.getExpression();
      value = expr ? getText(expr).slice(0, 100) : "";
      isDynamic = true;
    }
    if (value) {
      const element = getParentElementName(attr);
      out.push({ type: "link", file, line: getLineNum(attr), element, href: value, isDynamic });
    }
  }
}

// p. All hook calls (useRouter, useCallback, useMemo, useRef, useContext, useReducer, custom hooks)
function extractHookCalls(sf, file, out) {
  sf.getDescendantsOfKind(SyntaxKind.CallExpression).forEach((call) => {
    const name = call.getExpression().getText();
    // Hooks start with "use" and have a capital letter after
    if (!/^use[A-Z]/.test(name)) return;
    // Skip useState and useEffect (already handled)
    if (name === "useState" || name === "useEffect") return;

    const args = call.getArguments();
    const argsSummary = args.length > 0
      ? args.map((a) => getText(a).slice(0, 40)).join(", ").slice(0, 100)
      : "none";

    out.push({ type: "hook", file, line: getLineNum(call), hookName: name, args: argsSummary });
  });
}

// q. Component instantiation (which JSX elements are rendered)
function extractComponentUsage(sf, file, out) {
  const seen = new Set(); // deduplicate per file
  // Self-closing elements: <Component />
  sf.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement).forEach((el) => {
    const tagName = el.getTagNameNode().getText();
    // Skip intrinsic HTML elements (lowercase)
    if (tagName[0] === tagName[0].toLowerCase() && !tagName.includes(".")) return;
    const key = `${tagName}:${getLineNum(el)}`;
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ type: "component", file, line: getLineNum(el), name: tagName });
  });
  // Opening elements: <Component>...</Component>
  sf.getDescendantsOfKind(SyntaxKind.JsxOpeningElement).forEach((el) => {
    const tagName = el.getTagNameNode().getText();
    if (tagName[0] === tagName[0].toLowerCase() && !tagName.includes(".")) return;
    const key = `${tagName}:${getLineNum(el)}`;
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ type: "component", file, line: getLineNum(el), name: tagName });
  });
}

// r. Exported function declarations
function extractExportedFunctions(sf, file, out) {
  // Named function declarations
  sf.getFunctions().forEach((fn) => {
    const name = fn.getName() || "anonymous";
    const isExported = fn.isExported();
    const isAsync = fn.isAsync();
    const params = fn.getParameters().map((p) => p.getName()).join(", ");
    const returnType = fn.getReturnTypeNode() ? fn.getReturnTypeNode().getText().slice(0, 60) : "inferred";
    out.push({
      type: "function_decl",
      file,
      line: getLineNum(fn),
      name,
      isExported,
      isAsync,
      params: params.slice(0, 100),
      returnType,
    });
  });

  // Arrow functions assigned to exported const
  sf.getVariableDeclarations().forEach((decl) => {
    const init = decl.getInitializer();
    if (!init) return;
    if (init.getKind() !== SyntaxKind.ArrowFunction && init.getKind() !== SyntaxKind.FunctionExpression) return;
    const varStmt = decl.getFirstAncestorByKind(SyntaxKind.VariableStatement);
    if (!varStmt) return;
    const isExported = varStmt.isExported();
    const name = decl.getName();
    out.push({
      type: "function_decl",
      file,
      line: getLineNum(decl),
      name,
      isExported,
      isAsync: getText(init).startsWith("async"),
      params: "",
      returnType: "inferred",
    });
  });
}

// s. If statements (non-JSX conditional logic)
function extractIfStatements(sf, file, out) {
  sf.getDescendantsOfKind(SyntaxKind.IfStatement).forEach((ifStmt) => {
    const condition = getText(ifStmt.getExpression());
    const thenBlock = ifStmt.getThenStatement();
    const elseBlock = ifStmt.getElseStatement();

    // Get a short summary of the then-branch
    let thenAction = "";
    const thenText = getText(thenBlock);
    if (thenText.includes("return")) thenAction = "return";
    else if (thenText.includes("throw")) thenAction = "throw";
    else if (thenText.includes("continue")) thenAction = "continue";
    else if (thenText.includes("break")) thenAction = "break";
    else thenAction = thenText.slice(0, 60);

    out.push({
      type: "if_statement",
      file,
      line: getLineNum(ifStmt),
      condition: condition.slice(0, 100),
      thenAction,
      hasElse: !!elseBlock,
    });
  });
}

// t. Await expressions (async call sites)
function extractAwaitExpressions(sf, file, out) {
  sf.getDescendantsOfKind(SyntaxKind.AwaitExpression).forEach((awaitExpr) => {
    const expr = awaitExpr.getExpression();
    const text = getText(expr).slice(0, 120);
    // Extract the function name being awaited
    let callee = text;
    if (expr.getKind() === SyntaxKind.CallExpression) {
      callee = expr.getExpression().getText().slice(0, 80);
    }
    out.push({ type: "async_call", file, line: getLineNum(awaitExpr), callee, expression: text });
  });
}

// u. Type and interface declarations
function extractTypeDeclarations(sf, file, out) {
  // Type aliases
  sf.getTypeAliases().forEach((ta) => {
    const name = ta.getName();
    const isExported = ta.isExported();
    // Count members if it's an object type
    const typeNode = ta.getTypeNode();
    let memberCount = 0;
    if (typeNode && typeNode.getKind() === SyntaxKind.TypeLiteral) {
      memberCount = typeNode.getMembers().length;
    }
    out.push({ type: "type_decl", file, line: getLineNum(ta), name, isExported, memberCount });
  });

  // Interfaces
  sf.getInterfaces().forEach((iface) => {
    const name = iface.getName();
    const isExported = iface.isExported();
    const memberCount = iface.getMembers().length;
    out.push({ type: "type_decl", file, line: getLineNum(iface), name, isExported, memberCount });
  });
}

// v. Throw statements
function extractThrowStatements(sf, file, out) {
  sf.getDescendantsOfKind(SyntaxKind.ThrowStatement).forEach((throwStmt) => {
    const expr = throwStmt.getExpression();
    let message = "";
    if (expr) {
      // new Error("message")
      if (expr.getKind() === SyntaxKind.NewExpression) {
        const args = expr.getArguments();
        if (args.length > 0) message = getText(args[0]).slice(0, 120);
      } else {
        message = getText(expr).slice(0, 120);
      }
    }
    out.push({ type: "throw", file, line: getLineNum(throwStmt), message });
  });
}

// w. Console calls (console.log, console.error, console.warn)
function extractConsoleCalls(sf, file, out) {
  sf.getDescendantsOfKind(SyntaxKind.CallExpression).forEach((call) => {
    const exprText = call.getExpression().getText();
    const match = exprText.match(/^console\.(log|error|warn|info|debug)$/);
    if (!match) return;
    const method = match[1];
    const args = call.getArguments();
    const firstArg = args.length > 0 ? getText(args[0]).slice(0, 100) : "";
    out.push({ type: "console_call", file, line: getLineNum(call), method, message: firstArg });
  });
}

// ── Main ───────────────────────────────────────────────────────

function main() {
  const moduleName = process.argv[2];
  if (!moduleName) {
    console.error("Usage: node e2e/pipeline/extract-features.cjs <module-name>");
    console.error("Available modules:", Object.keys(MODULE_MAP).join(", "));
    process.exit(1);
  }

  const entries = MODULE_MAP[moduleName];
  if (!entries) {
    console.error(`Unknown module: "${moduleName}"`);
    console.error("Available modules:", Object.keys(MODULE_MAP).join(", "));
    process.exit(1);
  }

  console.log(`\n  EXTRACT FEATURES: ${moduleName}`);
  console.log("  " + "=".repeat(50));

  const tsConfigPath = path.join(ROOT, "tsconfig.json");
  const project = new Project({
    tsConfigFilePath: fs.existsSync(tsConfigPath) ? tsConfigPath : undefined,
    skipAddingFilesFromTsConfig: true,
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      allowJs: true,
      esModuleInterop: true,
    },
  });

  console.log("\n  Stage 1: Building import tree...");
  const { tree, visited } = buildImportTree(entries, project);
  console.log(`  Found ${visited.size} files in component tree`);

  console.log("\n  Stage 2: Extracting patterns...");
  const allPatterns = [];
  const typeCounts = {};

  for (const absPath of visited) {
    const sourceFile = project.getSourceFile(absPath);
    if (!sourceFile) continue;
    const patterns = extractPatterns(sourceFile, absPath);
    for (const p of patterns) {
      typeCounts[p.type] = (typeCounts[p.type] || 0) + 1;
    }
    allPatterns.push(...patterns);
  }

  const outDir = path.join(ROOT, "e2e", "extracted", moduleName);
  fs.mkdirSync(outDir, { recursive: true });

  const rawPath = path.join(outDir, "raw-extraction.json");
  fs.writeFileSync(rawPath, JSON.stringify(allPatterns, null, 2));

  const treePath = path.join(outDir, "import-tree.json");
  fs.writeFileSync(treePath, JSON.stringify(tree, null, 2));

  // ── Filter: user-facing patterns only ──────────────────────────
  const USER_FACING_TYPES = new Set([
    "string",        // visible text, labels, headings, aria-labels
    "handler",       // clickable elements — buttons, inputs, forms
    "placeholder",   // input placeholder text
    "conditional",   // UI that shows/hides based on state
    "disabled",      // buttons/inputs that become disabled
    "api_call",      // network requests triggered by user actions
    "state",         // useState — tracks what the page manages
    "list_render",   // .map() lists — repeated UI elements
    "link",          // href navigation links
    "component",     // rendered React components
    "error_handler", // try/catch — what user sees on failure
    "ternary",       // conditional rendering — show A or B
  ]);

  const userFacing = allPatterns.filter((p) => {
    if (!USER_FACING_TYPES.has(p.type)) return false;

    // Filter noise within user-facing types
    if (p.type === "string") {
      // Skip very short text (single chars, punctuation)
      if (p.value && p.value.trim().length <= 1) return false;
      // Skip text that looks like CSS or code artifacts
      if (p.value && /^[{}\[\]()=><|&!]/.test(p.value.trim())) return false;
    }

    if (p.type === "ternary") {
      // Keep ternaries only if they involve JSX rendering (component names start uppercase or are HTML tags)
      const t = p.trueComponent || "";
      const f = p.falseComponent || "";
      const isJsxTernary =
        /^[A-Z]/.test(t) || /^[A-Z]/.test(f) ||  // React component
        /^</.test(t) || /^</.test(f) ||            // JSX element
        /^"[^"]{2,}"$/.test(t) || /^"[^"]{2,}"$/.test(f) || // string content
        /null|undefined|false/.test(f);            // show-or-hide pattern
      if (!isJsxTernary) return false;
    }

    if (p.type === "component") {
      // Skip low-level layout/utility components that aren't testable features
      const skipComponents = new Set([
        "Suspense", "ErrorBoundary", "Provider", "Fragment",
        "Head", "Script", "NextScript", "Main",
      ]);
      if (skipComponents.has(p.name)) return false;
    }

    if (p.type === "handler") {
      // Skip internal framework handlers (ref callbacks, etc.)
      if (p.handlerName && /^ref$|^innerRef$/.test(p.handlerName)) return false;
    }

    return true;
  });

  const userFacingPath = path.join(outDir, "user-facing.json");
  fs.writeFileSync(userFacingPath, JSON.stringify(userFacing, null, 2));

  const noise = allPatterns.length - userFacing.length;

  // User-facing type counts
  const ufCounts = {};
  for (const p of userFacing) {
    ufCounts[p.type] = (ufCounts[p.type] || 0) + 1;
  }

  // Summary
  console.log("\n  ── Summary ──");
  console.log(`  Files scanned: ${visited.size}`);
  console.log(`  Total raw patterns: ${allPatterns.length}`);
  console.log(`  User-facing patterns: ${userFacing.length}`);
  console.log(`  Noise filtered out: ${noise}`);
  console.log("\n  User-facing breakdown:");
  const ufOrder = [
    "string", "handler", "component", "ternary", "conditional",
    "state", "list_render", "link", "placeholder", "disabled",
    "api_call", "error_handler",
  ];
  for (const t of ufOrder) {
    if (ufCounts[t]) {
      console.log(`    ${t.padEnd(18)} ${ufCounts[t]}`);
    }
  }
  console.log(`\n  Output (raw):        ${relPath(rawPath)}`);
  console.log(`  Output (user-facing): ${relPath(userFacingPath)}`);
  console.log(`  Tree:                 ${relPath(treePath)}\n`);
}

main();
