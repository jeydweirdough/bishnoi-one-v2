// Branch-name, PR-title and PR-checklist rules. See docs/BRANCHING.md and docs/COMMIT-POLICY.md.

export const BRANCH_TYPES = ["feat", "fix", "ui", "chore"];
export const COMMIT_TYPES = ["feat", "fix", "ui", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert"];
export const EXTRA_SCOPES = ["repo", "ci", "deps", "docs", "governance", "shared"];

/** Branches created by automation rather than developers. */
const AUTOMATION_BRANCH = /^(dependabot|renovate|gh-readonly-queue)\//;

export function allScopes(ownership) {
  return [...Object.keys(ownership.apps), ...Object.keys(ownership.packages), ...EXTRA_SCOPES];
}

function scopesFor(type, ownership) {
  const apps = Object.keys(ownership.apps);
  const packages = Object.keys(ownership.packages);
  if (type === "ui") return [...apps, "shared"];
  if (type === "chore") return allScopes(ownership);
  return [...apps, ...packages, "shared"];
}

const SLUG = "[a-z0-9]+(?:-[a-z0-9]+)*";

/** Check `<type>` and `<app>-<description>` (the part after the type). */
function parseTypeAndScope(name, type, rest, ownership) {
  if (!BRANCH_TYPES.includes(type)) {
    return { ok: false, error: `Branch "${name}": "${type}" is not a branch type. Use one of ${BRANCH_TYPES.join(", ")}.` };
  }
  const scope = scopesFor(type, ownership)
    .filter((candidate) => rest.startsWith(`${candidate}-`) && rest.length > candidate.length + 1)
    .sort((a, b) => b.length - a.length)[0];
  if (!scope) {
    return {
      ok: false,
      error: `Branch "${name}": "${rest}" must start with a known ${type} scope followed by a description. Allowed scopes: ${scopesFor(type, ownership).join(", ")}.`,
    };
  }
  return { ok: true, type, scope, description: rest.slice(scope.length + 1) };
}

/**
 * Validate `<person>/<type>/<app>-<description>`, e.g. `aaron/feat/inventory-stock-adjustment`.
 * The older `<type>/<app>-<description>` form is still accepted and marked `legacy`.
 * A valid name does NOT prove who pushed the branch; identity comes from the verified PR author
 * (see scope-check.mjs).
 */
export function checkBranchName(name, ownership) {
  if (AUTOMATION_BRANCH.test(name)) return { ok: true, automation: true };
  const people = Object.keys(ownership.developers);

  const current = new RegExp(`^([a-z0-9]+)/([a-z]+)/(${SLUG})$`).exec(name);
  if (current) {
    const [, person, type, rest] = current;
    if (!people.includes(person)) {
      return { ok: false, error: `Branch "${name}" starts with "${person}", which is not a developer in .github/ownership.json (${people.join(", ")}).` };
    }
    const parsed = parseTypeAndScope(name, type, rest, ownership);
    return parsed.ok ? { ...parsed, person } : parsed;
  }

  const legacy = new RegExp(`^([a-z]+)/(${SLUG})$`).exec(name);
  if (legacy && BRANCH_TYPES.includes(legacy[1])) {
    const parsed = parseTypeAndScope(name, legacy[1], legacy[2], ownership);
    return parsed.ok ? { ...parsed, legacy: true } : parsed;
  }

  return {
    ok: false,
    error: `Branch "${name}" must look like <person>/<type>/<app>-<description> in lowercase kebab-case, e.g. aaron/feat/inventory-stock-adjustment. People: ${people.join(", ")}. Types: ${BRANCH_TYPES.join(", ")}.`,
  };
}

/** Validate a Conventional Commit PR title: `type(scope): subject`. Squash merges use it as the commit message. */
export function checkPrTitle(title, ownership) {
  const match = /^([a-z]+)\(([a-z0-9-]+)\)(!)?: (.+)$/.exec(title.trim());
  if (!match) {
    return { ok: false, error: `PR title "${title}" must follow Conventional Commits: type(scope): subject — e.g. "feat(inventory): add stock adjustment".` };
  }
  const [, type, scope, , subject] = match;
  if (!COMMIT_TYPES.includes(type)) return { ok: false, error: `Unknown type "${type}". Allowed: ${COMMIT_TYPES.join(", ")}.` };
  if (!allScopes(ownership).includes(scope)) return { ok: false, error: `Unknown scope "${scope}". Allowed: ${allScopes(ownership).join(", ")}.` };
  if (subject.length < 3 || subject.length > 100) return { ok: false, error: "Subject must be 3–100 characters." };
  if (/\.$/.test(subject)) return { ok: false, error: "Subject must not end with a period." };
  return { ok: true, type, scope };
}

function section(body, heading) {
  const lines = body.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim().toLowerCase().startsWith(`## ${heading.toLowerCase()}`));
  if (start === -1) return null;
  const end = lines.findIndex((line, index) => index > start && line.startsWith("## "));
  return lines.slice(start + 1, end === -1 ? undefined : end);
}

function checkboxes(lines) {
  return lines
    .map((line) => /^\s*[-*] \[([ xX])\] (.+)$/.exec(line))
    .filter(Boolean)
    .map((match) => ({ checked: match[1] !== " ", text: match[2].trim() }));
}

/** Every box under "## Required checklist" must be ticked; at least one under "## UI policy". */
export function checkPrChecklist(body) {
  const errors = [];
  const required = section(body ?? "", "Required checklist");
  if (!required) {
    errors.push('PR description is missing the "## Required checklist" section from the template.');
  } else {
    const boxes = checkboxes(required);
    if (boxes.length === 0) errors.push('"## Required checklist" has no checkboxes.');
    for (const box of boxes.filter((b) => !b.checked)) errors.push(`Unchecked required item: ${box.text}`);
  }
  const ui = section(body ?? "", "UI policy");
  if (!ui) errors.push('PR description is missing the "## UI policy" section from the template.');
  else if (!checkboxes(ui).some((box) => box.checked)) errors.push('Tick one option under "## UI policy".');
  return { ok: errors.length === 0, errors };
}
