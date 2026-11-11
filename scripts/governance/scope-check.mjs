#!/usr/bin/env node
/**
 * Validates branch naming and ownership of changed files.
 *
 * In GitHub Actions (pull_request): identity = the PR author's GitHub login from the event payload,
 * which GitHub verifies. The branch name is checked for format only — it never proves identity.
 *
 * Locally:  npm run check:scope -- [--base origin/main] [--as <developer-id>]
 *   --as previews the rules for a developer; it is NOT identity verification.
 */
import { changedFiles, currentBranch } from "./lib/git.mjs";
import { labelAppliedBy, readEvent, setOutput, writeSummary } from "./lib/github.mjs";
import { checkBranchName } from "./lib/naming.mjs";
import { developerForLogin, identitiesConfigured, isBot, isMaintainer, loadOwnership, REPO_ROOT } from "./lib/ownership.mjs";
import { evaluateScope } from "./lib/scope.mjs";

function arg(name, fallback = undefined) {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? fallback : process.argv[index + 1];
}

const repoDir = arg("repo", REPO_ROOT);
const ownership = loadOwnership(arg("ownership-root", REPO_ROOT));
const event = readEvent();
const pr = event?.pull_request;

const branch = pr?.head.ref ?? arg("branch") ?? currentBranch(repoDir);
const base = pr?.base.sha ?? arg("base", "origin/main");
const head = pr?.head.sha ?? arg("head", "HEAD");
const login = pr?.user.login ?? null;
const previewAs = arg("as");

const privileged = isMaintainer(login, ownership) || isBot(login, ownership);
const author = previewAs ?? developerForLogin(login, ownership);
const enforcing = ownership.enforce === true && identitiesConfigured(ownership) && Boolean(pr);

const errors = [];
const warnings = [];

const branchResult = checkBranchName(branch, ownership);
if (!branchResult.ok) errors.push(branchResult.error);
if (branchResult.legacy) {
  warnings.push(`Branch "${branch}" uses the old naming. Next time start it with your name: <person>/<type>/<app>-<description>, e.g. aaron/feat/inventory-stock-adjustment.`);
}
if (branchResult.person && author && branchResult.person !== author) {
  // A branch name proves nothing; this only helps reviewers notice a mix-up.
  warnings.push(`Branch is named for ${ownership.developers[branchResult.person].name}, but the PR author is ${ownership.developers[author]?.name ?? author}.`);
}

const files = changedFiles(base, head, repoDir);
const scope = evaluateScope({ files, author, privileged, ownership });

if (!pr && !previewAs) {
  warnings.push("Local run without --as: ownership checks show what CI would flag for an unknown author.");
}

// Structural deletions are always enforced; ownership errors only once identities are configured.
let structureErrors = scope.structureErrors;
let ownershipErrors = scope.errors;
if ((ownershipErrors.length > 0 || structureErrors.length > 0) && pr && process.env.GITHUB_TOKEN) {
  const labels = (pr.labels ?? []).map((label) => label.name);
  if (labels.includes(ownership.overrideLabel)) {
    const appliedBy = await labelAppliedBy(process.env.GITHUB_REPOSITORY, pr.number, ownership.overrideLabel);
    if (appliedBy && appliedBy !== login && isMaintainer(appliedBy, ownership)) {
      warnings.push(...[...structureErrors, ...ownershipErrors].map((message) => `(override by @${appliedBy}) ${message}`));
      structureErrors = [];
      ownershipErrors = [];
    } else {
      warnings.push(`Label "${ownership.overrideLabel}" ignored: it must be applied by a maintainer other than the PR author.`);
    }
  }
}

errors.push(...structureErrors);
if (enforcing) {
  errors.push(...ownershipErrors);
} else {
  if (ownershipErrors.length > 0) {
    warnings.push("REPORT-ONLY MODE: ownership enforcement is off until a maintainer sets verified GitHub handles and `enforce: true` in .github/ownership.json.");
  }
  warnings.push(...ownershipErrors.map((message) => `(not enforced) ${message}`));
}
warnings.push(...scope.warnings);

const lines = [
  "## Scope check",
  "",
  `- Branch: \`${branch}\` ${branchResult.ok ? "✅" : "❌"}`,
  `- Author: ${login ? `@${login}` : "(local run)"} → ${author ? ownership.developers[author]?.name ?? author : privileged ? "maintainer/bot" : "unknown"}`,
  `- Files changed: ${files.length}`,
  `- Apps affected: ${scope.affectedApps.join(", ") || "none"}`,
  `- Shared packages affected: ${scope.sharedPackages.join(", ") || "none"}`,
  `- Linus UI review required: ${scope.uiReviewRequired ? "yes" : "no"}`,
  `- Enforcement: ${enforcing ? "on" : "report-only"}`,
  "",
  ...(errors.length ? ["### Errors", ...errors.map((message) => `- ❌ ${message}`), ""] : []),
  ...(warnings.length ? ["### Warnings", ...warnings.map((message) => `- ⚠️ ${message}`), ""] : []),
  ...(scope.notes.length ? ["### Notes", ...scope.notes.map((message) => `- ${message}`)] : []),
];
const report = lines.join("\n");
console.log(report);
writeSummary(report);
setOutput("ui_review_required", String(scope.uiReviewRequired));
setOutput("shared_packages_changed", String(scope.sharedPackages.length > 0));
setOutput("affected_apps", scope.affectedApps.join(","));

process.exit(errors.length > 0 ? 1 : 0);
