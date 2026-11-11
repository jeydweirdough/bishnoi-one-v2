# Pull Requests

## Opening a PR

- Base branch: **`main`**, always.
- Title: Conventional Commit, e.g. `feat(inventory): add stock adjustment`. It becomes the squash commit.
- Description: fill in `.github/pull_request_template.md`. Every box under **Required checklist** must be ticked,
  and exactly one option under **UI policy**.
- Request reviewers from [REVIEWERS.md](REVIEWERS.md). CODEOWNERS adds required owners automatically.
- Open as **draft** while work is in progress.

## Merge requirements

A PR can merge only when **all** of the following hold:

1. **Required checks pass:**

   | Check | Workflow | Purpose |
   |---|---|---|
   | `ci-quality` | CI | structure, CODEOWNERS sync, lint, typecheck, tests |
   | `ci-build` | CI | builds affected apps |
   | `scope-check` | Scope Check | branch name, ownership, app deletion |
   | `pr-title-checklist` | PR Validation | title format, template checklist |
   | `ui-governance` | PR Validation | Linus approval when UI is affected |
   | `security-secrets` | Security | no secrets / `.env` committed |
   | `security-dependencies` | Security | no high/critical npm advisories |
   | `integration` | Integration | all apps still build when shared code changes |

2. **At least one approval from someone other than the author.** You can never approve your own PR.
3. **Code owner approval** for every owned path changed (CODEOWNERS).
4. **Linus's approval** if protected UI paths change or the UI scan flags something.
5. **Approval from each affected application owner** for cross-application changes.
6. **All review conversations resolved.**
7. **Up to date with `main`** (or passes the merge queue).

New commits **dismiss stale approvals**, so re-request review after pushing changes.

## Merging

- **Squash merge only.** Merge commits and rebase merges are disabled.
- The remote branch is deleted automatically after merge.
- Use the merge queue when enabled; otherwise click "Update branch" first if prompted.

## Review guidelines

Reviewers check:
- The change stays inside the author's app/feature (or the owners agreed).
- UI is low fidelity unless Linus authorized it ([UI-GOVERNANCE.md](UI-GOVERNANCE.md)).
- Mock data is labelled as mock.
- No secrets, no `.env`, no unexpected root/config/package changes.
- Migrations and breaking API changes were approved beforehand.

Use "Request changes" for policy violations. Use comments for suggestions.

## Repository settings (administrator action required)

These settings are **not active until an administrator configures them on GitHub**. Do not assume they are
enforced until verified under *Settings*.

**Settings → General → Pull Requests**
- [ ] Allow squash merging only (disable merge commits and rebase merging)
- [ ] Default squash commit message: "Pull request title"
- [ ] Automatically delete head branches
- [ ] Always suggest updating pull request branches

**Settings → Rules → Rulesets → New branch ruleset** (target: `main`; or classic branch protection)
- [ ] Restrict deletions
- [ ] Block force pushes
- [ ] Require a pull request before merging
  - [ ] Required approvals: **1** (minimum)
  - [ ] Dismiss stale pull request approvals when new commits are pushed
  - [ ] Require review from Code Owners
  - [ ] Require approval of the most recent reviewable push (prevents self-approval of last-minute pushes)
  - [ ] Require conversation resolution before merging
  - [ ] Allowed merge methods: Squash
- [ ] Require status checks to pass; add the 8 checks above; require branches to be up to date
- [ ] Require merge queue (if available on your plan; then keep `merge_group` triggers in workflows)
- [ ] Bypass list: empty (or administrators only, for emergencies)

**Settings → Environments**
- [ ] `preview`: no reviewers
- [ ] `production`: required reviewers (who may authorize production), deployment branch = `main` only

**Settings → Secrets and variables → Actions** — see [DEPLOYMENT.md](DEPLOYMENT.md).

**Identities** — fill `.github/ownership.json` with verified GitHub handles, regenerate CODEOWNERS, then set
`enforce: true` ([TEAM.md](TEAM.md#configuring-identities)).

**Labels** — create `scope-override-approved` (only effective when applied by a maintainer who is not the PR author).
