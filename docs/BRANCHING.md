# Branching Strategy: GitHub Flow

We use **GitHub Flow with direct feature-to-main integration**.

- `main` is the **only permanent branch**. All 13 apps live as folders in `main`.
- There are **no** permanent application branches, developer branches, `develop` or `release` branches.
- Every change goes through a **short-lived branch** created from the latest `main`, and a PR back into `main`.
- PRs are **squash merged**, and the branch is **deleted** after merging.
- Nobody pushes to `main` directly, and nobody force-pushes `main`.

```text
main ──●──────────●───────────●──────────●──►
        \        / squash     \         / squash
         feat/inventory-...     fix/crm-...
```

## Branch names

| Pattern | Use for | Example |
|---|---|---|
| `feat/<application>-<feature>` | New functionality | `feat/inventory-stock-adjustment` |
| `fix/<application>-<issue>` | Bug fixes | `fix/crm-duplicate-leads` |
| `ui/<application>-<component>` | UI work (Linus, or authorized by Linus) | `ui/books-invoice-table` |
| `chore/<scope>-<task>` | Tooling, deps, docs, CI | `chore/ci-cache-turbo`, `chore/deps-next-16-5` |

Rules (checked by `scope-check`):
- Lowercase kebab-case: `a-z`, `0-9`, `-`.
- `<application>` is an app id: `one inventory crm books expense payroll people recruit analytics admin desk contracts workdrive`.
- `feat/` and `fix/` may also use a package scope: `ui auth permissions database api-client contracts config`.
- `ui/` may use `shared` for cross-app UI work: `ui/shared-data-table`.
- `chore/` may also use `repo ci deps docs governance shared`.
- A description must follow the scope: `feat/inventory` is invalid.
- Automation branches (`dependabot/*`, `renovate/*`, `gh-readonly-queue/*`) are exempt.

**A branch name does not prove who made the change.** Ownership is checked against the verified GitHub
account that opened the PR.

## Lifecycle

```bash
git switch main
git pull --ff-only origin main            # 1. latest main
git switch -c feat/crm-lead-import        # 2. one task = one branch
# ... small, focused commits ...
git push -u origin feat/crm-lead-import   # 3. push
gh pr create --base main --fill           # 4. PR into main
# 5. checks + review → squash merge → branch auto-deleted
git switch main && git pull --ff-only origin main
git branch -d feat/crm-lead-import        # 6. clean up locally
```

## Guidelines

- Keep branches short-lived (ideally under 3 days) and PRs small.
- One app per branch. A change spanning apps needs every affected owner's agreement; split it if you can.
- If `main` moves while you work, bring it in with a merge (see [MERGE-CONFLICTS.md](MERGE-CONFLICTS.md)).
- Do not reuse a merged branch. Start a new one from `main`.
- Preserve unrelated application files: never reformat or delete files outside your task.
