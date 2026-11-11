# Branching Strategy: GitHub Flow

We use **GitHub Flow with direct feature-to-main integration**.

- `main` is the **only permanent branch**. All 13 apps live as folders in `main`.
- There are **no** permanent application branches, developer branches, `develop` or `release` branches.
- Every change goes through a **short-lived branch** created from the latest `main`, and a PR back into `main`.
- PRs are **squash merged**, and the branch is **deleted automatically** after merging.
- Nobody pushes to `main` directly, and nobody force-pushes `main`.
- **Each person keeps one open PR at a time.** The Pull requests tab then shows, at a glance, what everyone is working on.

```text
main ──●──────────────●────────────────●──────────►
        \            / squash         / squash
         aaron/feat/inventory-...   zild/fix/books-...
```

## Branch names

**`<person>/<type>/<app>-<description>`**: who, what kind of change, which app, what it is.

| Example | Meaning |
|---|---|
| `aaron/feat/inventory-stock-adjustment` | Aaron, new feature, Inventory |
| `zild/fix/books-invoice-rounding` | Zild, bug fix, Books |
| `aryan/feat/crm-lead-import` | Aryan, new feature, CRM |
| `jade/feat/admin-users` | Jade, new feature, One Admin |
| `linus/ui/crm-leads-table` | Linus, UI work, CRM |
| `jade/chore/ci-cache` | Jade, maintenance, CI |

Because names start with the person, GitHub's **Branches** page lists each person's branches together.

### The parts

| Part | Allowed values |
|---|---|
| `<person>` | `aaron` `aryan` `zild` `jade` `linus` (the ids in `.github/ownership.json`) |
| `<type>` | `feat` (new functionality), `fix` (bug fix), `ui` (UI work, Linus or authorized by Linus), `chore` (tooling, deps, docs, CI) |
| `<app>` | `one inventory crm books expense payroll people recruit analytics admin desk contracts workdrive` |
| `<description>` | a few words in kebab-case, e.g. `stock-adjustment` |

Rules (checked by `scope-check`):
- Lowercase kebab-case only: `a-z`, `0-9`, `-`.
- `feat` and `fix` may also use a shared package instead of an app: `ui auth permissions database api-client contracts config`.
- `ui` may use `shared` for cross-app UI work: `linus/ui/shared-data-table`.
- `chore` may also use `repo ci deps docs governance shared`.
- A description must follow the app: `aaron/feat/inventory` is invalid.
- Automation branches (`dependabot/*`, `renovate/*`, `gh-readonly-queue/*`) are exempt.
- The old form without a name (`feat/inventory-stock-adjustment`) is still accepted, with a reminder.

**A branch name does not prove who made the change.** Ownership is checked against the verified GitHub
account that opened the PR. If a branch is named for one person but opened by another, `scope-check`
shows a warning so reviewers notice.

## Seeing who is working on what

- **Pull requests** tab: each PR shows its author. Use the **Author** filter to see one person's work.
- **Files changed** tab on a PR: exactly which files that person touched.
- **Overlaps:** if two PRs change the same lines, GitHub shows *"This branch has conflicts"*. If someone edits
  another person's app or feature, `scope-check` flags it and CODEOWNERS asks that owner to review.

## Lifecycle

```bash
git switch main
git pull --ff-only origin main                    # 1. latest main
git switch -c aryan/feat/crm-lead-import          # 2. one task = one branch
# ... small, focused commits ...
git push -u origin aryan/feat/crm-lead-import     # 3. push
gh pr create --base main --fill                   # 4. PR into main
# 5. checks + review → "Squash and merge" → branch deleted automatically
git switch main && git pull --ff-only origin main
git branch -d aryan/feat/crm-lead-import          # 6. clean up locally
```

## Guidelines

- Keep branches short-lived (ideally under 3 days) and PRs small.
- One app per branch. A change spanning apps needs every affected owner's agreement; split it if you can.
- If `main` moves while you work, bring it in with a merge (see [MERGE-CONFLICTS.md](MERGE-CONFLICTS.md)).
- Do not reuse a merged branch. Start a new one from `main`.
- Preserve unrelated application files: never reformat or delete files outside your task.
