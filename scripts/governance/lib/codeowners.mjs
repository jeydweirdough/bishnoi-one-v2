// Builds .github/CODEOWNERS content from ownership.json. See generate-codeowners.mjs.

export function buildCodeowners(ownership) {
  const handle = (id) => ownership.developers[id]?.github;
  const maintainers = ownership.maintainers.map((login) => `@${login.replace(/^@/, "")}`);
  const unique = (values) => [...new Set(values)];

  const out = [
    "# GENERATED from .github/ownership.json by scripts/governance/generate-codeowners.mjs — do not edit by hand.",
    "# GitHub uses the LAST matching pattern. One approval from any listed owner satisfies a pattern;",
    "# extra rules (Linus approval for UI, ownership boundaries) are enforced by CI. See docs/REVIEWERS.md.",
    "",
  ];

  function line(pattern, devIds, { withMaintainers = false, label } = {}) {
    const ids = unique(devIds.filter(Boolean));
    const known = ids.map(handle).filter(Boolean).map((login) => `@${login}`);
    const owners = unique([...known, ...(withMaintainers || known.length === 0 ? maintainers : [])]);
    const missing = ids.filter((id) => !handle(id)).map((id) => ownership.developers[id]?.name ?? id);
    const note = missing.length ? `  # handle not configured: ${missing.join(", ")}` : "";
    if (owners.length === 0) {
      out.push(`# ${pattern} ${ids.map((id) => `<${ownership.developers[id]?.name ?? id}>`).join(" ") || "<maintainers>"}${label ? `  # ${label}` : ""} — no verified GitHub handles yet`);
    } else {
      out.push(`${pattern} ${owners.join(" ")}${note}`);
    }
  }

  out.push("# Default: maintainers");
  line("*", [], { withMaintainers: true });
  out.push("");

  out.push("# Documentation");
  line("/docs/", [], { withMaintainers: true });
  out.push("");

  for (const [appId, app] of Object.entries(ownership.apps)) {
    out.push(`# apps/${appId} — lead: ${ownership.developers[app.lead].name}`);
    line(`/apps/${appId}/`, [...app.owners, app.backupReviewer]);
    for (const [feature, owner] of Object.entries(app.features)) {
      const reviewers = [owner, app.lead === owner ? app.backupReviewer : app.lead];
      line(`/apps/${appId}/src/features/${feature}/`, reviewers);
      line(`/apps/${appId}/app/${feature}/`, reviewers);
      line(`/apps/${appId}/app/api/${feature}/`, reviewers);
    }
    out.push("");
  }

  out.push("# Shared packages — owners plus maintainers");
  for (const [pkg, info] of Object.entries(ownership.packages)) {
    line(`/packages/${pkg}/`, [...info.owners, info.backupReviewer], { withMaintainers: true });
  }
  line("/packages/database/migrations/", [], { withMaintainers: true });
  out.push("");

  const ui = ownership.uiAuthority;
  const uiBackup = ownership.packages.ui?.backupReviewer;
  out.push(`# Protected UI paths — ${ownership.developers[ui].name} (CI additionally requires ${ownership.developers[ui].name}'s own approval)`);
  for (const pattern of ownership.protectedUiPaths) {
    line(`/${pattern.replace(/\/\*\*$/, "/")}`, [ui, uiBackup]);
  }
  out.push("");

  out.push("# Governance — maintainers only (listed last so nothing above overrides it)");
  for (const pattern of ownership.governancePaths) {
    line(`/${pattern.replace(/\/\*\*$/, "/")}`, [], { withMaintainers: true });
  }

  return `${out.join("\n")}\n`;
}
