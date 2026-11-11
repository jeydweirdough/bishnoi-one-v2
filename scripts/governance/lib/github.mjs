// Read-only GitHub REST helpers used inside Actions. Needs GITHUB_TOKEN with pull-requests/issues: read.
import fs from "node:fs";

export function readEvent() {
  const file = process.env.GITHUB_EVENT_PATH;
  return file && fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : null;
}

async function getAll(path) {
  const token = process.env.GITHUB_TOKEN;
  const api = process.env.GITHUB_API_URL ?? "https://api.github.com";
  if (!token) throw new Error("GITHUB_TOKEN is required to query GitHub.");
  const results = [];
  for (let page = 1; page <= 20; page++) {
    const response = await fetch(`${api}${path}${path.includes("?") ? "&" : "?"}per_page=100&page=${page}`, {
      headers: { authorization: `Bearer ${token}`, accept: "application/vnd.github+json", "x-github-api-version": "2022-11-28" },
    });
    if (!response.ok) throw new Error(`GitHub API ${path} failed: ${response.status} ${await response.text()}`);
    const batch = await response.json();
    results.push(...batch);
    if (batch.length < 100) break;
  }
  return results;
}

/** Who applied `label` to the PR most recently (verified GitHub login), or null. */
export async function labelAppliedBy(repo, number, label) {
  const events = await getAll(`/repos/${repo}/issues/${number}/events`);
  const applied = events.filter((event) => event.event === "labeled" && event.label?.name === label);
  return applied.at(-1)?.actor?.login ?? null;
}

/** Latest effective review state per reviewer login (COMMENTED reviews don't override). */
export async function latestReviewStates(repo, number) {
  const reviews = await getAll(`/repos/${repo}/pulls/${number}/reviews`);
  const states = new Map();
  for (const review of reviews) {
    if (!review.user?.login || review.state === "COMMENTED") continue;
    states.set(review.user.login.toLowerCase(), review.state);
  }
  return states;
}

export function writeSummary(markdown) {
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${markdown}\n`);
}

export function setOutput(name, value) {
  if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`);
}
