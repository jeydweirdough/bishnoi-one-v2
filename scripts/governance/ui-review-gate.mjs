#!/usr/bin/env node
/**
 * CI gate (pr-validation.yml → ui-governance): if a PR touches protected UI paths or trips the
 * heuristic UI lint, Linus (the UI authority) must have an APPROVED review on the PR.
 * Linus's own PRs pass this gate but still need an independent approval through branch protection.
 *
 *   node ui-review-gate.mjs --repo <pr-checkout>
 */
import fs from "node:fs";
import path from "node:path";
import { changedFiles } from "./lib/git.mjs";
import { latestReviewStates, readEvent, writeSummary } from "./lib/github.mjs";
import { developerForLogin, loadOwnership, matchesAny, REPO_ROOT } from "./lib/ownership.mjs";
import { isLintable, lintSource } from "./lib/ui-fidelity.mjs";

const repoIndex = process.argv.indexOf("--repo");
const repoDir = repoIndex === -1 ? REPO_ROOT : path.resolve(process.argv[repoIndex + 1]);
const ownership = loadOwnership();
const pr = readEvent()?.pull_request;
if (!pr) {
  console.error("ui-review-gate must run on a pull_request or pull_request_review event.");
  process.exit(1);
}

const files = changedFiles(pr.base.sha, pr.head.sha, repoDir).filter((file) => file.status !== "D");
const protectedFiles = files.map((file) => file.path).filter((file) => matchesAny(file, ownership.protectedUiPaths));
// Reading PR file contents is safe: nothing from the PR is executed.
const findings = files
  .map((file) => file.path)
  .filter(isLintable)
  .flatMap((file) => lintSource(file, fs.readFileSync(path.join(repoDir, file), "utf8")));

const uiAuthority = ownership.developers[ownership.uiAuthority];
const author = developerForLogin(pr.user.login, ownership);
const needsApproval = protectedFiles.length > 0 || findings.length > 0;

let ok = true;
let verdict;
if (!needsApproval) {
  verdict = "No protected UI files changed and no high-fidelity patterns detected (heuristic).";
} else if (author === ownership.uiAuthority) {
  verdict = `Author is the UI authority (${uiAuthority.name}). An independent approval is still required by branch protection.`;
} else if (!uiAuthority.github) {
  // Report-only until identities are configured; Linus still reviews via CODEOWNERS/manual request.
  verdict = `REPORT-ONLY: ${uiAuthority.name}'s GitHub handle is not configured in .github/ownership.json, so approval cannot be verified. Request ${uiAuthority.name}'s review manually.`;
} else {
  try {
    const states = await latestReviewStates(process.env.GITHUB_REPOSITORY, pr.number);
    ok = states.get(uiAuthority.github.toLowerCase()) === "APPROVED";
    verdict = ok ? `Approved by ${uiAuthority.name} (@${uiAuthority.github}).` : `Waiting for an approving review from ${uiAuthority.name} (@${uiAuthority.github}).`;
  } catch (error) {
    ok = false;
    verdict = `Could not read PR reviews: ${error instanceof Error ? error.message : error}`;
  }
}

const report = [
  "## UI governance",
  "",
  `**${ok ? "PASS" : "FAIL"}** — ${verdict}`,
  "",
  "_The pattern scan is a heuristic. It cannot prove a UI is low fidelity; Linus performs the final visual approval._",
  "",
  ...(protectedFiles.length ? ["### Protected UI files changed", ...protectedFiles.map((file) => `- \`${file}\``), ""] : []),
  ...(findings.length ? ["### Possible high-fidelity patterns", ...findings.map((f) => `- \`${f.file}:${f.line}\` ${f.message}: \`${f.text}\``)] : []),
].join("\n");

console.log(report);
writeSummary(report);
process.exit(ok ? 0 : 1);
