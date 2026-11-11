# One Admin (`apps/admin`) — AI instructions

Read the root `CLAUDE.md` first. This file adds rules specific to this app.

## Ownership

- **Lead:** Jade (owns app-level files: `app/layout.tsx`, `app/page.tsx`, `src/app.config.ts`, `src/features/index.ts`, `package.json`, configs)
- **Owners:** Jade
- **Independent backup reviewer:** Aryan
- **UI authority:** Linus (layout, styling, shared components — see `docs/UI-GOVERNANCE.md`)

| Feature | Owner | Files |
|---|---|---|
| `users` | Jade | `src/features/users/`, `app/api/users/` |
| `roles` | Jade | `src/features/roles/`, `app/api/roles/` |
| `audit-log` | Jade | `src/features/audit-log/`, `app/api/audit-log/` |

## Admin Panel navigation shell

The UI is a navigation shell modelled on the reference admin console screenshots. Every page currently
renders **Coming Soon**.

- **Single source of truth:** `src/navigation/config.ts` (`SECTIONS`, `USER_DETAIL_ITEMS`). The primary
  sidebar, secondary sidebars, routes, page titles and breadcrumbs are all derived from it.
- **Routing:** `app/[...slug]/page.tsx` resolves every URL through `src/navigation/resolve.ts`. Unknown paths
  return 404; section and group URLs redirect to their first item. Per-user pages live at `/users/<userId>/…`.
- **Components:** `src/components/` (`AdminShell`, `PrimarySidebar`, `SecondarySidebar`, `TopBar`, `Dropdown`,
  `ComingSoon`, `Icon`). These are layout/visual files, so changes need Linus's review.
- **Adding a page:** add one entry to `config.ts`. Do not create per-page route files. When a module is built,
  give it its own route folder (a specific route takes precedence over the catch-all).
- **Do not add menu items that are not in the reference** without the app lead's approval.
- Placeholders that are not wired: search, Quick Access search scope, notifications, help, sign-out, user data.

Before editing, confirm with the developer you are working for that they own the feature you are about to change.
If they do not, stop and ask.

## Boundaries

- Stay inside `apps/admin/`. Do not edit other apps or `packages/*` without explicit permission.
- To use another app's data, call its API through `@bishnoi/api-client` — never import another app's source.
- Feature code lives in `src/features/<feature>/`; API routes in `app/api/<feature>/`; pages come from the navigation config (below).
- New tables (later) must be prefixed `admin_`. Ask before creating any migration.

## UI

Low fidelity only: use `@bishnoi/ui` components and grayscale Tailwind utilities. No new colors, gradients,
animations, fonts, icons libraries, or branding. Visual changes need Linus. When unsure, keep it plain and ask.

## Mock data

Everything under `src/features/*/mock-data.ts` is placeholder data. Keep the `MockDataNotice` on any page that
shows mock data, and keep `mock: true` in API responses until real data is wired.

## Commands (from the repo root)

```bash
npm run dev -w @bishnoi/app-admin         # http://localhost:3009
npm run lint -w @bishnoi/app-admin
npm run typecheck -w @bishnoi/app-admin
npx turbo run build --filter=@bishnoi/app-admin
```

Run lint, typecheck and build for this app before reporting completion.
