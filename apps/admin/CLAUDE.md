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

## Admin Panel

The UI follows the reference admin console screenshots, in low fidelity. **Every page shows mock data**; actions
that need a backend (Add, Save, Delete, …) are visible but disabled, and settings are read-only.

Still **Coming Soon** (no reference screenshots yet): Organization → White Labeling, Other App Settings,
Zia for Mail, Reports. Toolkit and Storage Reports are external tools in the reference.

- **Single source of truth:** `src/navigation/config.ts` (`SECTIONS`, `USER_DETAIL_ITEMS`). The primary
  sidebar, secondary sidebars, routes, page titles and breadcrumbs are all derived from it.
- **Routing:** each built page has its own route folder (`app/<section>/…/page.tsx`). `app/[...slug]/page.tsx`
  catches everything else: unbuilt pages show Coming Soon, section and group URLs redirect to their first item,
  unknown paths return 404. Per-user pages live at `app/users/[userId]/…`; unknown user IDs return 404.
- **Page frame:** wrap pages in `PageFrame` (`src/components/PageFrame.tsx`) with their `path`, so breadcrumbs and
  titles stay in sync with the sidebar. Helpers there: `PlaceholderAction` (disabled action), `EmptyState`,
  `ListTable`.
- **Mock data:** one `data.ts` per section (`src/dashboard`, `src/organization`, `src/mail-settings`, `src/users`,
  `src/domains`, `src/data-migration`, `src/subscription`, `src/security`). Pages only use the exported types and
  functions, so replacing a function body with a real query is enough. Never put real organization, personal or
  mail data in these files.
- **Security & Compliance** is data-driven: page descriptions live in `src/security/specs.ts` and are rendered by
  `src/security/SecurityPage.tsx`. Change a page by editing its spec; the Dashboard and Roles pages are custom.
- **Components:** `src/components/` (`AdminShell`, `PrimarySidebar`, `SecondarySidebar`, `TopBar`, `Dropdown`,
  `ComingSoon`, `Icon`, `PageFrame`, `CopyButton`). These are layout/visual files, so changes need Linus's review.
- **Adding a page:** add one entry to `config.ts`, then a route folder for it (or let it show Coming Soon).
- **Do not add menu items that are not in the reference** without the app lead's approval.
- Top bar placeholders that are not wired: search, Quick Access search scope, notifications, help, sign-out.

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
