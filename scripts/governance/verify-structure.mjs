#!/usr/bin/env node
/**
 * Verifies the monorepo structure: all 13 apps and 7 packages exist, ownership.json matches the
 * app registry and feature folders, required docs/workflows exist, and no .env file would be committed.
 *   npm run check:structure  [-- --root <dir>]
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { loadOwnership, REPO_ROOT } from "./lib/ownership.mjs";

const rootIndex = process.argv.indexOf("--root");
const root = rootIndex === -1 ? REPO_ROOT : path.resolve(process.argv[rootIndex + 1]);
const ownership = loadOwnership(root);
const errors = [];
const exists = (rel) => fs.existsSync(path.join(root, rel));
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), "utf8"));
const listDirs = (rel) =>
  exists(rel) ? fs.readdirSync(path.join(root, rel), { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name).sort() : [];

export const REQUIRED_PACKAGES = ["ui", "auth", "permissions", "database", "api-client", "contracts", "config"];
export const REQUIRED_DOCS = [
  "ARCHITECTURE", "TEAM", "APPLICATIONS", "DEVELOPMENT", "BRANCHING", "COMMIT-POLICY", "PULL-REQUESTS",
  "REVIEWERS", "MERGE-CONFLICTS", "WORKFLOWS", "INTEGRATION", "UI-GOVERNANCE", "DEPLOYMENT",
];
export const REQUIRED_WORKFLOWS = ["ci", "scope-check", "security", "integration", "pr-validation", "deploy"];
const APP_FILES = ["package.json", "next.config.ts", "tsconfig.json", "CLAUDE.md", "app/layout.tsx", "app/page.tsx", "app/globals.css", "app/api/health/route.ts", "src/app.config.ts", "src/features/index.ts"];

// 1. App registry ↔ ownership ↔ folders
const registrySource = fs.readFileSync(path.join(root, "packages/contracts/src/apps.ts"), "utf8");
const registry = [...registrySource.matchAll(/\{ id: "([a-z]+)",.*?port: (\d+) \}/g)].map((m) => ({ id: m[1], port: Number(m[2]) }));
const registryIds = registry.map((app) => app.id).sort();
const ownedIds = Object.keys(ownership.apps).sort();
const folderIds = listDirs("apps");

if (registry.length !== 13) errors.push(`App registry should list 13 apps (portal + 12), found ${registry.length}.`);
if (JSON.stringify(registryIds) !== JSON.stringify(ownedIds)) errors.push(`Registry apps [${registryIds}] differ from ownership.json apps [${ownedIds}].`);
if (JSON.stringify(folderIds) !== JSON.stringify(ownedIds)) errors.push(`apps/ folders [${folderIds}] differ from ownership.json apps [${ownedIds}].`);

// 2. Each app is complete and consistent
for (const { id, port } of registry) {
  const dir = `apps/${id}`;
  for (const file of APP_FILES) if (!exists(`${dir}/${file}`)) errors.push(`Missing ${dir}/${file}`);
  if (exists(`${dir}/package.json`)) {
    const pkg = readJson(`${dir}/package.json`);
    if (pkg.name !== `@bishnoi/app-${id}`) errors.push(`${dir}/package.json name should be @bishnoi/app-${id}.`);
    if (!pkg.scripts?.dev?.includes(`--port ${port}`)) errors.push(`${dir} dev script should use port ${port} (from the registry).`);
    for (const script of ["build", "lint", "typecheck"]) if (!pkg.scripts?.[script]) errors.push(`${dir}/package.json is missing the "${script}" script.`);
  }
  const app = ownership.apps[id];
  if (!app) continue;
  const declared = Object.keys(app.features).sort();
  const onDisk = listDirs(`${dir}/src/features`);
  if (JSON.stringify(declared) !== JSON.stringify(onDisk)) errors.push(`${dir}: features in ownership.json [${declared}] differ from src/features [${onDisk}].`);
}

// 3. Ownership references are valid
const devs = Object.keys(ownership.developers);
for (const [id, app] of Object.entries(ownership.apps)) {
  for (const dev of [app.lead, app.backupReviewer, ...app.owners, ...Object.values(app.features)]) {
    if (!devs.includes(dev)) errors.push(`ownership.json apps.${id} references unknown developer "${dev}".`);
  }
  if (!app.owners.includes(app.lead)) errors.push(`ownership.json apps.${id}: lead must be one of the owners.`);
  if (app.owners.includes(app.backupReviewer) && app.owners.length === 1) errors.push(`ownership.json apps.${id}: backup reviewer must be independent of the sole owner.`);
  for (const [feature, owner] of Object.entries(app.features)) {
    if (!app.owners.includes(owner)) errors.push(`ownership.json apps.${id}.features.${feature}: owner "${owner}" is not an app owner.`);
  }
}
if (!devs.includes(ownership.uiAuthority)) errors.push(`uiAuthority "${ownership.uiAuthority}" is not a developer.`);

// 4. Packages
for (const pkg of REQUIRED_PACKAGES) {
  if (!exists(`packages/${pkg}/package.json`)) errors.push(`Missing packages/${pkg}/package.json`);
  if (!ownership.packages[pkg]) errors.push(`packages/${pkg} is not listed in ownership.json.`);
}
for (const pkg of listDirs("packages")) if (!REQUIRED_PACKAGES.includes(pkg)) errors.push(`Unexpected package packages/${pkg}: add it to ownership.json and this script.`);

// 5. Docs, workflows, governance files
for (const doc of REQUIRED_DOCS) if (!exists(`docs/${doc}.md`)) errors.push(`Missing docs/${doc}.md`);
for (const wf of REQUIRED_WORKFLOWS) if (!exists(`.github/workflows/${wf}.yml`)) errors.push(`Missing .github/workflows/${wf}.yml`);
for (const file of ["CLAUDE.md", "README.md", ".github/CODEOWNERS", ".github/pull_request_template.md"]) if (!exists(file)) errors.push(`Missing ${file}`);

// 6. Apps stay independent: no app imports another app's source or depends on another app
const IMPORT_SPECIFIER = /(?:from\s+|import\s*\(\s*)["']([^"']+)["']/g;
function sourceFiles(rel) {
  const dir = path.join(root, rel);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (["node_modules", ".next", ".turbo"].includes(entry.name)) return [];
    const child = `${rel}/${entry.name}`;
    return entry.isDirectory() ? sourceFiles(child) : /\.(ts|tsx|mjs)$/.test(entry.name) ? [child] : [];
  });
}
for (const id of folderIds) {
  const pkg = exists(`apps/${id}/package.json`) ? readJson(`apps/${id}/package.json`) : {};
  const deps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
  for (const dep of deps.filter((name) => name.startsWith("@bishnoi/app-"))) errors.push(`apps/${id} depends on another app (${dep}). Use its API via @bishnoi/api-client.`);
  for (const file of sourceFiles(`apps/${id}`)) {
    for (const [, specifier] of fs.readFileSync(path.join(root, file), "utf8").matchAll(IMPORT_SPECIFIER)) {
      const target = specifier.startsWith(".") ? path.posix.normalize(path.posix.join(path.posix.dirname(file), specifier)) : null;
      if (specifier.startsWith("@bishnoi/app-") || (target && !target.startsWith(`apps/${id}/`))) {
        errors.push(`${file} imports code outside its application ("${specifier}"). Use @bishnoi/api-client or a shared package.`);
      }
    }
  }
}

// 7. No environment files staged or committable
try {
  const tracked = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard"], { cwd: root, encoding: "utf8" }).split("\n");
  const envFiles = tracked.filter((file) => /(^|\/)\.env(\..+)?$/.test(file) && !file.endsWith(".env.example"));
  for (const file of envFiles) errors.push(`Environment file would be committed: ${file}`);
} catch {
  console.warn("git not available — skipped .env check.");
}

if (errors.length > 0) {
  console.error(`Structure check failed (${errors.length}):\n${errors.map((e) => `  - ${e}`).join("\n")}`);
  process.exit(1);
}
console.log(`Structure OK: ${registry.length} apps, ${REQUIRED_PACKAGES.length} packages, ${REQUIRED_DOCS.length} docs, ${REQUIRED_WORKFLOWS.length} workflows.`);
