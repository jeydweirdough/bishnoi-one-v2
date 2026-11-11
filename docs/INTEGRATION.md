# Integration: Shared Packages and Cross-Application Work

## How apps talk to each other

Apps are independent deployments. They **never import each other's code** (enforced by `check:structure`).

- **Data from another app:** call its API over HTTP.
  ```ts
  import { createApiClient } from "@bishnoi/api-client";
  import { getAppUrl } from "@bishnoi/contracts";

  const inventory = createApiClient({ baseUrl: getAppUrl("inventory") });
  const result = await inventory.get<ItemRow[]>("/api/items");
  if (result.ok) { /* result.data, result.mock */ }
  ```
- **Shared types / registry:** `@bishnoi/contracts` (`APPS`, `AppId`, `ApiResponse`, `FeatureDefinition`).
- **Every API** returns `{ ok: true, data, mock }` or `{ ok: false, error: { code, message } }`.
- **Every app** exposes `GET /api/health`.

Before depending on another app's endpoint, agree it with that app's owner and document it in their app's
`CLAUDE.md` or a shared contract type.

## Shared packages

| Package | What belongs here | Owner |
|---|---|---|
| `ui` | Low-fidelity components used by 2+ apps, the grayscale theme | Linus |
| `auth` | Session/user access (mock today) | Jade |
| `permissions` | Roles, actions, `can()` | Jade |
| `database` | Neon client, connection helpers, migrations | Maintainers |
| `api-client` | HTTP client for app APIs | Maintainers |
| `contracts` | App registry, API envelope, shared types | Maintainers |
| `config` | tsconfig, ESLint, PostCSS, `createNextConfig()` | Maintainers |

Put code in a package only when **two or more apps need it now**. App-specific code stays in the app.

## Changing a shared package

1. **Ask first.** Describe the change to the package owner (and, for AI agents, to the developer you work for).
2. Use a branch scoped to the package: `feat/contracts-add-currency-type`, `fix/auth-session-expiry`.
3. Keep it **backwards compatible** where possible: add, don't rename or remove.
4. Add or update tests in the package (`src/*.test.ts`).
5. Run the full suite locally: `npm run typecheck && npm run test && npm run build` (all apps).
6. The PR gets extra review: package owner via CODEOWNERS. `integration` rebuilds all 13 apps.

## Breaking changes

A breaking change (renamed/removed export, changed API response, changed role behaviour, schema change):

1. Needs **approval before implementation** from the package owner, a maintainer, and the owners of every app
   that uses it.
2. Mark it in the PR title with `!`: `feat(contracts)!: rename FeatureStatus values`, plus a `BREAKING CHANGE:`
   note in the description.
3. Update every consuming app in the same PR (with those owners' approval), or ship a compatible transition first.

## Cross-application changes

A PR touching 2+ apps is a **cross-application change**:
- `scope-check` flags it, and CODEOWNERS requires an owner of **each** app to approve.
- Prefer splitting it: shared package change first, then one PR per app.

## Database (Neon)

- Server-only: `import { getSql } from "@bishnoi/database"` in server components, route handlers or server actions.
- Prefix tables with the app id. Apps must not read or write other apps' tables directly. Go through the
  owning app's API.
- **Migrations require approval** (see `packages/database/migrations/README.md`). AI agents must ask first.

## Replacing mocks

| Mock | Where | Replacing it requires |
|---|---|---|
| Demo session | `packages/auth` | Jade + maintainers + all app owners (cross-app) |
| Feature mock rows | `apps/<app>/src/features/<f>/mock-data.ts` | Feature owner. Remove `MockDataNotice` and `mock: true` when real. |
| Portal org/access data | `apps/one/src/features/*` | Linus (UI) + Jade (One Admin backend) |
