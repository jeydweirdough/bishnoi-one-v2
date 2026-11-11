# Bishnoi One — AI Development Governance

These rules apply to **every AI coding agent** (Claude Code or otherwise) working in this repository.
Each app also has its own `apps/<app>/CLAUDE.md`; shared packages have `packages/<pkg>/CLAUDE.md`. Read both.

## 1. Before you change anything

1. Read: `docs/ARCHITECTURE.md`, `docs/TEAM.md`, `docs/BRANCHING.md`, `docs/UI-GOVERNANCE.md`.
2. Run `git branch --show-current` and `git status`.
   - On `main`? Do not edit. Ask the developer which task this is, then propose a branch name
     (`feat|fix|ui|chore/<scope>-<description>`, see `docs/BRANCHING.md`).
3. Identify **which developer you are working for** and **which app + feature** the task touches.
   Look up ownership in `.github/ownership.json` (summarised in `docs/TEAM.md`).
4. If the developer does not own that app/feature, or anything is unclear: **stop and ask**.

## 2. Ownership and file boundaries

- Modify only files inside the assigned app (`apps/<app>/`) and, in shared apps, only the features the developer owns:
  `src/features/<feature>/`, `app/<feature>/`, `app/api/<feature>/`.
- App-level files (`app/layout.tsx`, `app/page.tsx`, `src/app.config.ts`, `src/features/index.ts`, `package.json`, configs) belong to the app lead.
- **Never modify shared packages (`packages/*`) without explicit permission** from the developer you work for. Say so in the PR.
- **Avoid root configuration changes** (`package.json`, `turbo.json`, `.github/`, `scripts/`, root `CLAUDE.md`). These are maintainer-only.
- Never overwrite, reformat or "tidy" unrelated files. Never delete an application or package folder.
- Apps must not import each other's code. Cross-app data goes through HTTP APIs via `@bishnoi/api-client`.

## 3. UI: low fidelity by default

**Default UI = Low Fidelity. High-Fidelity UI = Linus Authorization Only.**

- Use `@bishnoi/ui` components, grayscale Tailwind utilities (`gray-*`, `black`, `white`), basic layouts, tables and forms.
- Do not add colors, gradients, glassmorphism, shadows for decoration, animations, custom fonts, icon/UI libraries, logos or branding.
- Never independently upgrade a low-fidelity screen into a polished design, even if it "looks better".
- Do not edit `packages/ui`, `app/globals.css`, `app/layout.tsx` or design tokens unless working for Linus.
- If UI requirements are ambiguous, keep it low fidelity and ask.
- `npm run check:ui` is a heuristic aid only — passing it does not mean Linus has approved anything.

## 4. Safety

- **Never** read out, print, log or commit secrets. Never create or commit `.env` files (only `.env.example`).
- **Ask for approval before**: database migrations, schema changes, breaking API/contract changes, new dependencies,
  changes to auth/permissions behaviour.
- **Git:** never commit, push, merge, open/close PRs or delete branches without the developer's explicit go-ahead
  for that action. Never run destructive commands automatically (`reset --hard`, `push --force`, `clean -fd`,
  `branch -D`, `checkout -- .`, `rebase` on shared branches). Never push to `main`.
- Stage files explicitly (`git add apps/<app>/...`), never `git add -A` / `git add .`.

## 5. Code patterns

- Next.js App Router, TypeScript strict, server components by default; `"use client"` only when needed.
- Feature definitions: `src/features/<feature>/index.ts` (+ `mock-data.ts` while mocked). API routes return the
  `ApiResponse` envelope from `@bishnoi/contracts` (`success(data, { mock: true })` for mock data).
- Mark mock functionality clearly (`MockDataNotice`, `mock: true`). Never present mock data as real.
- Use the `@/` alias for imports within an app. Follow the existing structure — do not invent new patterns.

## 6. Before you finish

Run, from the repo root, for the affected app(s):

```bash
npm run lint -w @bishnoi/app-<app>
npm run typecheck -w @bishnoi/app-<app>
npx turbo run build --filter=@bishnoi/app-<app>
npm run check:ui
npm run check:scope -- --as <developer-id>   # preview ownership rules for your branch
```

If you touched a shared package also run `npm run test` and `npm run build` (all apps).

Then report: **modified files**, **test/check results (including failures)**, and **`git status`**.
Do not claim something passed if you did not run it.

## Quick reference

| Command | Purpose |
|---|---|
| `npm run dev -w @bishnoi/app-<app>` | Run one app (ports in `docs/APPLICATIONS.md`) |
| `npm run dev` | Run all 13 apps |
| `npm run validate` | Everything CI checks, locally |
| `npm run check:structure` | Apps/packages/docs/ownership consistency |
| `npm run codeowners` | Regenerate `.github/CODEOWNERS` after editing `ownership.json` (maintainers) |
