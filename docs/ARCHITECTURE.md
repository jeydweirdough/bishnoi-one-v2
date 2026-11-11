# Architecture

## Goals

- **One codebase, independent apps.** 13 Next.js apps live in one repository on one `main` branch, but each builds,
  runs and deploys on its own.
- **Small shared core.** Only genuinely shared concerns live in `packages/`.
- **Few merge conflicts.** Every app, and every feature inside a shared app, has a clear owner and its own folder.

## Repository layout

```text
bishnoi-one/
├── apps/                    # 13 Next.js applications
│   ├── one/                 # central portal (launcher, profile, organization, access)
│   ├── inventory/ crm/ books/ expense/ payroll/ people/ recruit/
│   └── analytics/ admin/ desk/ contracts/ workdrive/
├── packages/
│   ├── ui/                  # low-fidelity shared components + grayscale Tailwind theme (Linus)
│   ├── auth/                # session access — MOCK for now (Jade)
│   ├── permissions/         # roles → allowed actions per app (Jade)
│   ├── database/            # Neon PostgreSQL client, server-only (maintainers)
│   ├── api-client/          # typed fetch client for app-to-app calls (maintainers)
│   ├── contracts/           # app registry + shared API/feature types (maintainers)
│   └── config/              # shared tsconfig, ESLint, PostCSS, Next.js config (maintainers)
├── scripts/governance/      # ownership, naming, UI and structure checks used locally and in CI
├── .github/                 # workflows, CODEOWNERS (generated), ownership.json, PR template
├── docs/                    # this documentation
├── Dockerfile               # builds any one app as a standalone server (Coolify)
├── turbo.json               # task pipeline
└── package.json             # npm workspaces root
```

## Anatomy of an app

Every app in `apps/<app>/` has the same shape:

```text
apps/<app>/
├── app/
│   ├── layout.tsx           # AppShell (header, sidebar, profile placeholder) — app lead + Linus
│   ├── page.tsx             # dashboard — app lead
│   ├── globals.css          # imports @bishnoi/ui/styles.css only — Linus
│   ├── <feature>/page.tsx   # one route per feature — feature owner
│   └── api/
│       ├── health/route.ts  # GET /api/health
│       └── <feature>/route.ts  # GET /api/<feature> (mock data for now) — feature owner
├── src/
│   ├── app.config.ts        # APP_ID + navigation — app lead
│   └── features/
│       ├── index.ts         # feature registry (order = sidebar order) — app lead
│       └── <feature>/
│           ├── index.ts     # FeatureDefinition — feature owner
│           └── mock-data.ts # placeholder rows — feature owner
├── CLAUDE.md                # AI rules + ownership for this app
├── next.config.ts           # createNextConfig() from @bishnoi/config
├── package.json             # @bishnoi/app-<app>, dev port
├── tsconfig.json  eslint.config.mjs  postcss.config.mjs  vercel.json
```

Splitting each feature into its own folders (`src/features/x`, `app/x`, `app/api/x`) is what lets two developers
work in the same app without touching the same files.

## Dependency rules

```text
apps/*  ──►  @bishnoi/ui, auth, permissions, database, api-client, contracts   (runtime)
apps/*  ──►  @bishnoi/config                                                  (build tooling)
auth ──► permissions ──► contracts      api-client ──► contracts      ui ──► next, react
```

- Apps never import other apps (enforced by `npm run check:structure`). They talk over HTTP with `@bishnoi/api-client`.
- Packages never import apps.
- Packages are shipped as TypeScript source and compiled by each app (`transpilePackages`), so there is no
  package build step.
- `@bishnoi/database` is server-only. Never import it from a `"use client"` file.

## Data

- **Today:** all data is mock (`src/features/*/mock-data.ts`). API routes return `{ ok: true, data, mock: true }`.
- **Later:** Neon PostgreSQL via `@bishnoi/database` (`getSql()`), configured with `DATABASE_URL`.
  Tables are prefixed with the app id (`inventory_items`, `crm_leads`) so apps stay independent.
  Migrations need approval — see `packages/database/migrations/README.md`.

## Authentication and permissions

- `@bishnoi/auth` `getSession()` returns a **mock demo user** with `org_admin` on every app.
- `@bishnoi/permissions` `can(subject, action, app)` and `accessibleApps()` already work against that session,
  so the portal launcher filters apps by permission today and will keep working once real auth arrives.

## Build system

- npm workspaces: `apps/*`, `packages/*`.
- Turborepo tasks: `build`, `dev`, `lint`, `typecheck` (`next typegen && tsc --noEmit` for apps), `test` (Vitest
  for packages; `node --test` for governance scripts).
- CI uses `turbo run ... --affected` on PRs so only changed apps (and apps depending on changed packages) run.

## Ports

| App | Port | App | Port |
|---|---|---|---|
| one | 3000 | analytics | 3008 |
| inventory | 3001 | admin | 3009 |
| crm | 3002 | desk | 3010 |
| books | 3003 | contracts | 3011 |
| expense | 3004 | workdrive | 3012 |
| payroll | 3005 | | |
| people | 3006 | | |
| recruit | 3007 | | |

The canonical list is `packages/contracts/src/apps.ts`.
