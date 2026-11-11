#!/usr/bin/env node
/**
 * Validates the PR title (Conventional Commits, used as the squash commit message) and the
 * PR template checklist. Runs in pr-validation.yml; locally:
 *   node scripts/governance/pr-validation.mjs --title "feat(crm): add lead import" --body-file body.md
 */
import fs from "node:fs";
import { readEvent, writeSummary } from "./lib/github.mjs";
import { checkPrChecklist, checkPrTitle } from "./lib/naming.mjs";
import { loadOwnership } from "./lib/ownership.mjs";

function arg(name) {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? undefined : process.argv[index + 1];
}

const ownership = loadOwnership();
const pr = readEvent()?.pull_request;
const title = pr?.title ?? arg("title") ?? "";
const bodyFile = arg("body-file");
const body = pr?.body ?? (bodyFile ? fs.readFileSync(bodyFile, "utf8") : "");

const errors = [];
const titleResult = checkPrTitle(title, ownership);
if (!titleResult.ok) errors.push(titleResult.error);
// Automation (e.g. Dependabot) cannot tick a human checklist; its PRs still need human approval.
if (!ownership.bots.includes(pr?.user.login)) errors.push(...checkPrChecklist(body).errors);

const report = ["## PR validation", "", `- Title: \`${title}\` ${titleResult.ok ? "✅" : "❌"}`, "", ...errors.map((error) => `- ❌ ${error}`)].join("\n");
console.log(report);
writeSummary(report);
process.exit(errors.length > 0 ? 1 : 0);
