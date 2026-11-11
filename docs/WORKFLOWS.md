# GitHub Actions Workflows

All workflows live in `.github/workflows/`. Default token permission is **read-only**; no workflow that runs PR
code has access to secrets.

| Workflow | File | Triggers | Required check(s) |
|---|---|---|---|
| CI | `ci.yml` | PR, push to `main`, merge queue | `ci-quality`, `ci-build` |
| Scope Check | `scope-check.yml` | PR (incl. edits/labels), merge queue | `scope-check` |
| Security | `security.yml` | PR, push, merge queue, weekly | `security-secrets`, `security-dependencies` |
| Integration | `integration.yml` | PR, push, merge queue | `integration` |
| PR Validation | `pr-validation.yml` | PR, PR review, merge queue | `pr-title-checklist`, `ui-governance` |
| Deploy | `deploy.yml` | push to `main`, manual | — (gated by environments) |

## What each one does

**CI.** `npm ci`, then structure check, CODEOWNERS sync check, governance tests, and `turbo run lint typecheck test`
and `turbo run build`. On PRs it uses `--affected`, so only changed workspaces and their dependents run.
`main` and the merge queue run everything.

**Scope Check.** Validates the branch name and checks every changed file against `.github/ownership.json`:
- the author owns the app, and inside shared apps owns the feature;
- non-maintainers don't change governance/root files;
- shared-package changes are flagged for owner review;
- deleting an app/package's key files (`package.json`, `next.config.ts`, `app/layout.tsx`, `app/page.tsx`) fails;
- multi-app changes are flagged as cross-application.

Identity is the **PR author's GitHub login** from the event payload, which GitHub verifies. The branch name is
only checked for format. Until handles are configured and `enforce: true` is set, ownership findings are
**report-only** (warnings). Branch-name and deletion checks are always enforced.

**PR Validation.** `pr-title-checklist` checks the Conventional Commit title and the template checklist (bots skip
the checklist). `ui-governance` requires an **APPROVED review from Linus** when protected UI paths change or the
heuristic UI scan flags something. It re-runs on review events, so it turns green when Linus approves.

**Security.** gitleaks (checksum-verified binary) scans the PR's commits, or the full history on `main`/weekly,
and blocks tracked `.env` files. `npm audit --audit-level=high` fails on high/critical advisories.
`dependency-review` is advisory (needs the dependency graph; GitHub Advanced Security on private repos).

**Integration.** Always verifies structure and app independence (no app imports another app). If shared code
changed (`packages/`, root `package.json`/lockfile, `turbo.json`), it typechecks, tests and builds **all 13 apps**.

**Deploy.** See [DEPLOYMENT.md](DEPLOYMENT.md). Disabled until `DEPLOYMENTS_ENABLED=true`.

## Security model

- PR workflows use `pull_request`, **never `pull_request_target`**, so fork PRs get a read-only token and no secrets.
- `scope-check` and `pr-validation` run the governance scripts **from the base commit** (`trusted/`), and only
  diff/read the PR checkout (`pr/`). A PR cannot weaken the rules it's judged by.
- All checkouts use `persist-credentials: false`.
- Changes to `.github/` and `scripts/` require maintainer approval (CODEOWNERS + scope-check).
- Remaining risk: a PR can modify a workflow file itself. Maintainer review of `.github/**` is the control.
  Organisations on GitHub Enterprise can also use *required workflows* in rulesets.
- Deploy secrets are only exposed to `deploy.yml`, which runs on `main`/manual dispatch, inside GitHub Environments.

## Bootstrap note

The first push of this repository to `main` is done by an administrator. `scope-check`/`ui-governance` read their
scripts from the PR's base, so they only work once the scripts exist on `main`.

## Running checks locally

```bash
npm run validate                                 # structure, codeowners, UI scan, lint, typecheck, test, build
npm run check:scope -- --as aaron                # preview scope rules for your branch vs origin/main
node scripts/governance/pr-validation.mjs --title "feat(crm): add lead import" --body-file body.md
npm run check:ui -- --files apps/crm/app/leads/page.tsx
```

## Troubleshooting

| Failing check | Likely cause | Fix |
|---|---|---|
| `ci-quality`: structure | Missing app file, feature folder not in `ownership.json`, app imports another app | Read the listed errors. Add the feature to `ownership.json` (maintainer) or remove the import. |
| `ci-quality`: CODEOWNERS out of date | `ownership.json` edited without regenerating | `npm run codeowners` and commit |
| `ci-quality`: lint/typecheck | Code errors | Run the same command locally for the app |
| `ci-build` | Build error, often a server/client boundary or missing env at build | `npx turbo run build --filter=@bishnoi/app-<app>` locally |
| `scope-check`: branch | Name doesn't match `<person>/<type>/<app>-<description>` | Create a correctly named branch and open a new PR (renaming closes the PR) |
| `scope-check`: ownership | Files outside your app/feature | Revert them, split the PR, or get the owner's agreement + maintainer override label |
| `scope-check`: deleted | Key app/package file deleted | Restore it; deliberate removals need a maintainer |
| `pr-title-checklist` | Title format or unticked boxes | Edit the PR title/description. The check re-runs on edit. |
| `ui-governance` | Protected UI file or flagged pattern | Remove the high-fidelity change, or get Linus's approval |
| `security-secrets` | Secret or `.env` committed | **Rotate the secret first**, then remove it from history with a maintainer |
| `security-dependencies` | High/critical advisory | `npm audit`, update the dependency (`<person>/chore/deps-...` branch) |
| `integration` | Shared package change breaks another app | Fix compatibility, or coordinate with that app's owner |
| Check stuck on "Expected — waiting" | Required check name changed or workflow didn't trigger | Compare with the names above. Re-run from the Actions tab. |
