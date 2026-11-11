#!/usr/bin/env node
/**
 * Generates .github/CODEOWNERS from .github/ownership.json.
 *   npm run codeowners          write the file
 *   npm run check:codeowners    fail if the committed file is out of date (CI)
 *
 * Developers without a verified GitHub handle are skipped; a line with no known owners is
 * emitted as a comment so the gap is visible instead of silently wrong.
 */
import fs from "node:fs";
import path from "node:path";
import { buildCodeowners } from "./lib/codeowners.mjs";
import { loadOwnership, REPO_ROOT } from "./lib/ownership.mjs";

const target = path.join(REPO_ROOT, ".github/CODEOWNERS");
const generated = buildCodeowners(loadOwnership());
if (process.argv.includes("--check")) {
  const current = fs.existsSync(target) ? fs.readFileSync(target, "utf8").replace(/\r\n/g, "\n") : "";
  if (current !== generated) {
    console.error("CODEOWNERS is out of date with .github/ownership.json. Run `npm run codeowners` and commit the result.");
    process.exit(1);
  }
  console.log("CODEOWNERS is up to date.");
} else {
  fs.writeFileSync(target, generated);
  console.log(`Wrote ${path.relative(REPO_ROOT, target)}`);
}
