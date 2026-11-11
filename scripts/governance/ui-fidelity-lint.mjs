#!/usr/bin/env node
/**
 * Heuristic low-fidelity UI lint. Flags likely high-fidelity patterns in apps/ and packages/ui/.
 * It does NOT decide visual fidelity — Linus does. A clean result is not an approval.
 *
 *   npm run check:ui                       scan everything
 *   npm run check:ui -- --files a.tsx b.css  scan specific files
 */
import fs from "node:fs";
import path from "node:path";
import { isLintable, lintSource } from "./lib/ui-fidelity.mjs";
import { REPO_ROOT } from "./lib/ownership.mjs";

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".next", ".turbo", "dist"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(path.relative(REPO_ROOT, full).split(path.sep).join("/"));
  }
  return out;
}

const filesIndex = process.argv.indexOf("--files");
const candidates = filesIndex === -1 ? [...walk(path.join(REPO_ROOT, "apps")), ...walk(path.join(REPO_ROOT, "packages/ui"))] : process.argv.slice(filesIndex + 1);

const findings = candidates
  .filter(isLintable)
  .filter((file) => fs.existsSync(path.join(REPO_ROOT, file)))
  .flatMap((file) => lintSource(file, fs.readFileSync(path.join(REPO_ROOT, file), "utf8")));

if (findings.length === 0) {
  console.log("UI fidelity lint: no high-fidelity patterns detected (heuristic — Linus still performs visual approval).");
  process.exit(0);
}

console.log(`UI fidelity lint: ${findings.length} possible high-fidelity pattern(s). These need Linus's authorization:\n`);
for (const finding of findings) {
  console.log(`  ${finding.file}:${finding.line}  [${finding.rule}] ${finding.message}\n      ${finding.text}`);
}
process.exit(1);
