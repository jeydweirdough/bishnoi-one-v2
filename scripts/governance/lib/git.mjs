import { execFileSync } from "node:child_process";

export function git(args, cwd) {
  return execFileSync("git", args, { cwd, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }).trim();
}

/**
 * Files changed between `base` and `head` (three-dot: since the merge base).
 * Renames are reported as a deletion of the old path plus an addition of the new one.
 * @returns {{status: "A" | "M" | "D", path: string}[]}
 */
export function changedFiles(base, head, cwd) {
  const output = git(["diff", "--name-status", "--no-renames", `${base}...${head}`], cwd);
  if (!output) return [];
  return output.split("\n").map((line) => {
    const [status, file] = line.split("\t");
    return { status: status.startsWith("D") ? "D" : status.startsWith("A") ? "A" : "M", path: file };
  });
}

export function currentBranch(cwd) {
  return git(["rev-parse", "--abbrev-ref", "HEAD"], cwd);
}
