# Merge Conflicts

Feature-level ownership keeps conflicts rare. When they happen, resolve them **on your feature branch**,
never on `main`.

## Bring `main` into your branch (preferred: merge, no force-push)

```bash
git switch aryan/feat/crm-lead-import
git fetch origin
git merge origin/main
# fix conflicts (below), then:
git add <resolved files>
git commit                      # completes the merge
npm run lint -w @bishnoi/app-crm && npm run typecheck -w @bishnoi/app-crm
git push
```

Merging avoids rewriting history, so you never need `--force`. Since PRs are squash merged, the merge commit
won't appear on `main`.

> If you prefer to rebase your **own, unshared** branch: `git rebase origin/main` then
> `git push --force-with-lease`. Never force-push `main` or a branch someone else is working on.

## Resolving a conflicted file

1. `git status` lists conflicted files ("both modified").
2. Open each one and find the markers:
   ```text
   <<<<<<< HEAD
   your version
   =======
   main's version
   >>>>>>> origin/main
   ```
3. Keep the correct combination, then delete all markers.
4. If the file belongs to **someone else** (another feature, app or a shared package), **take their version**
   (`git checkout --theirs <file>` during a merge) and talk to them. Don't overwrite their work.

## Common cases

### `package-lock.json`

Don't hand-edit it.
```bash
git checkout --theirs package-lock.json   # take main's lockfile
npm install                               # re-apply your dependency changes
git add package-lock.json
```

### `src/features/index.ts` (feature registry)

Two features added at once. Keep **both** imports and **both** entries.

### `.github/CODEOWNERS`

Never resolve by hand. Resolve `.github/ownership.json`, then run `npm run codeowners`.

### Deleted vs. modified

If `main` deleted a file you modified (or vice versa), ask the other author before choosing.
Never resolve by deleting another app's files.

## Avoiding conflicts

- Pull `main` daily and merge it into long-running branches.
- Keep PRs small and short-lived.
- Stay inside your feature folders. Coordinate before touching app-level files (lead) or shared packages.
- Announce in the team channel before refactors that touch many files.

## Abort

```bash
git merge --abort       # back to before the merge
git rebase --abort      # back to before the rebase
```

AI agents must not run `git reset --hard`, `git checkout -- .` or force-push to "fix" a conflict. Stop and ask.
