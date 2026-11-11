// Ownership model shared by every governance script. Source of truth: .github/ownership.json.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

export function loadOwnership(root = REPO_ROOT) {
  return JSON.parse(fs.readFileSync(path.join(root, ".github/ownership.json"), "utf8"));
}

/** Minimal glob → RegExp: `**` any depth, `*` one segment, `?` one char. */
export function globToRegExp(glob) {
  let out = "";
  for (let i = 0; i < glob.length; i++) {
    const char = glob[i];
    if (char === "*" && glob[i + 1] === "*") {
      out += ".*";
      i++;
      if (glob[i + 1] === "/") i++;
    } else if (char === "*") {
      out += "[^/]*";
    } else if (char === "?") {
      out += "[^/]";
    } else {
      out += char.replace(/[.+^${}()|[\]\\]/g, "\\$&");
    }
  }
  return new RegExp(`^${out}$`);
}

export function matchesAny(file, globs = []) {
  return globs.some((glob) => globToRegExp(glob).test(file));
}

/**
 * Classify a repo-relative path (forward slashes).
 * @returns {{kind: "governance"} | {kind: "app", app: string, feature: string | null} | {kind: "package", pkg: string} | {kind: "docs"} | {kind: "other"}}
 */
export function classifyPath(file, ownership) {
  if (matchesAny(file, ownership.governancePaths)) return { kind: "governance" };

  const parts = file.split("/");
  if (parts[0] === "apps" && parts.length > 2) {
    const app = parts[1];
    const features = Object.keys(ownership.apps[app]?.features ?? {});
    let candidate = null;
    if (parts[2] === "src" && parts[3] === "features" && parts.length > 5) candidate = parts[4];
    else if (parts[2] === "app" && parts[3] === "api" && parts.length > 5) candidate = parts[4];
    else if (parts[2] === "app" && parts.length > 4) candidate = parts[3];
    return { kind: "app", app, feature: candidate && features.includes(candidate) ? candidate : null };
  }
  if (parts[0] === "packages" && parts.length > 2) return { kind: "package", pkg: parts[1] };
  if (parts[0] === "docs") return { kind: "docs" };
  return { kind: "other" };
}

/** Map a GitHub login to a developer id using VERIFIED handles from ownership.json. */
export function developerForLogin(login, ownership) {
  if (!login) return null;
  const needle = login.toLowerCase();
  for (const [id, dev] of Object.entries(ownership.developers)) {
    if (dev.github && dev.github.toLowerCase() === needle) return id;
  }
  return null;
}

export function isMaintainer(login, ownership) {
  return Boolean(login) && ownership.maintainers.some((handle) => handle.toLowerCase() === login.toLowerCase());
}

export function isBot(login, ownership) {
  return Boolean(login) && ownership.bots.includes(login);
}

/** True once every developer has a GitHub handle and at least one maintainer exists. */
export function identitiesConfigured(ownership) {
  return ownership.maintainers.length > 0 && Object.values(ownership.developers).every((dev) => Boolean(dev.github));
}

/** Files whose deletion would remove an application or package. */
export function isStructuralFile(file) {
  return (
    /^apps\/[^/]+\/(package\.json|next\.config\.ts|app\/layout\.tsx|app\/page\.tsx)$/.test(file) ||
    /^packages\/[^/]+\/package\.json$/.test(file)
  );
}
