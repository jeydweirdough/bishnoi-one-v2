# Recruit (`apps/recruit`) — AI instructions

Read the root `CLAUDE.md` first. This file adds rules specific to this app.

## Ownership

- **Lead:** Aaron (owns app-level files: `app/layout.tsx`, `app/page.tsx`, `src/app.config.ts`, `src/features/index.ts`, `package.json`, configs)
- **Owners:** Aaron, Jade
- **Independent backup reviewer:** Aryan
- **UI authority:** Linus (layout, styling, shared components — see `docs/UI-GOVERNANCE.md`)

This app is **shared**. Each developer edits only the features they own (below) so two people never change
the same files at the same time. Changes to another owner's feature need that owner's agreement first.

| Feature | Owner | Files |
|---|---|---|
| `job-openings` | Aaron | `src/features/job-openings/`, `app/job-openings/`, `app/api/job-openings/` |
| `candidates` | Aaron | `src/features/candidates/`, `app/candidates/`, `app/api/candidates/` |
| `interviews` | Jade | `src/features/interviews/`, `app/interviews/`, `app/api/interviews/` |
| `offers` | Jade | `src/features/offers/`, `app/offers/`, `app/api/offers/` |

Before editing, confirm with the developer you are working for that they own the feature you are about to change.
If they do not, stop and ask.

## Boundaries

- Stay inside `apps/recruit/`. Do not edit other apps or `packages/*` without explicit permission.
- To use another app's data, call its API through `@bishnoi/api-client` — never import another app's source.
- Feature code lives in `src/features/<feature>/`; routes in `app/<feature>/`; API routes in `app/api/<feature>/`.
- New tables (later) must be prefixed `recruit_`. Ask before creating any migration.

## UI

Low fidelity only: use `@bishnoi/ui` components and grayscale Tailwind utilities. No new colors, gradients,
animations, fonts, icons libraries, or branding. Visual changes need Linus. When unsure, keep it plain and ask.

## Mock data

Everything under `src/features/*/mock-data.ts` is placeholder data. Keep the `MockDataNotice` on any page that
shows mock data, and keep `mock: true` in API responses until real data is wired.

## Commands (from the repo root)

```bash
npm run dev -w @bishnoi/app-recruit         # http://localhost:3007
npm run lint -w @bishnoi/app-recruit
npm run typecheck -w @bishnoi/app-recruit
npx turbo run build --filter=@bishnoi/app-recruit
```

Run lint, typecheck and build for this app before reporting completion.
