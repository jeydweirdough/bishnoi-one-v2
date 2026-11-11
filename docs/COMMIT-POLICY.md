# Commit and Push Policy

## Conventional Commits

```text
type(scope): subject

[optional body: what and why]

[optional footer: BREAKING CHANGE: ..., Refs #123]
```

| Type | Use for |
|---|---|
| `feat` | New functionality |
| `fix` | Bug fix |
| `ui` | Low-fidelity UI work or Linus-authorized visual work |
| `docs` | Documentation only |
| `style` | Formatting, no behaviour change |
| `refactor` | Code change without behaviour change |
| `perf` | Performance |
| `test` | Tests only |
| `build` | Build system, dependencies |
| `ci` | Workflows |
| `chore` | Maintenance |
| `revert` | Revert a previous commit |

**Scope** = app id (`inventory`, `crm`, …), package (`ui`, `auth`, `api-client`, …) or
`repo` / `ci` / `deps` / `docs` / `governance` / `shared`.

**Subject:** imperative, lowercase start, no trailing period, 3–100 characters.

Good:
```text
feat(inventory): add stock adjustment form
fix(books): correct invoice total rounding
ui(crm): align leads table columns
chore(deps): bump next to 16.5.0
feat(contracts)!: change approval status values
```

Bad: `update`, `WIP`, `fixed stuff.`, `Feat: Inventory`.

Because PRs are **squash merged**, the **PR title** becomes the commit on `main`. `pr-validation` enforces the
format on PR titles. Individual commits on your branch should follow it too.

## The 10-step workflow

1. **Update local `main`:** `git switch main && git pull --ff-only origin main`
2. **Create a task branch:** `git switch -c feat/inventory-stock-adjustment`
3. **Modify only your assigned files** (your app/feature; see [TEAM.md](TEAM.md)).
4. **Stage explicitly.** Review first:
   ```bash
   git status
   git diff
   git add apps/inventory/src/features/stock-adjustments/ apps/inventory/app/stock-adjustments/
   git diff --staged
   ```
   Never `git add -A` / `git add .`. Never stage `.env*`, build output or unrelated files.
5. **Commit:** `git commit -m "feat(inventory): add stock adjustment"`
6. **Push the branch:** `git push -u origin feat/inventory-stock-adjustment`
7. **Open a PR to `main`:** `gh pr create --base main --fill` (or via github.com). Fill in the template.
8. **Pass checks and independent review.** See [PULL-REQUESTS.md](PULL-REQUESTS.md).
9. **Resolve conflicts and review comments.** See [MERGE-CONFLICTS.md](MERGE-CONFLICTS.md).
10. **Squash merge, then delete the branch** (GitHub deletes the remote branch automatically):
    ```bash
    git switch main && git pull --ff-only origin main
    git branch -d feat/inventory-stock-adjustment
    ```

## Never

- Commit or push directly to `main`.
- `git push --force` to `main` (blocked) or to someone else's branch.
- Commit secrets, credentials, `.env` files, or production data.
- Mix unrelated changes (e.g. two apps, or a refactor plus a feature) in one PR.

## AI agents

AI agents **must not** commit, push, merge, or delete branches without explicit authorization from the developer
for that specific action. When authorized, they follow the same steps, staging files explicitly.
