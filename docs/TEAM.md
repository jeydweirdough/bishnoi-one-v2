# Team and Ownership

The machine-readable source of truth is [`.github/ownership.json`](../.github/ownership.json). This page
summarises it. If they disagree, `ownership.json` wins. Fix this page in the same PR.

## Developers

| Developer | Role | Assigned applications | App lead of |
|---|---|---|---|
| **Aaron** | Application developer | Inventory, Books, People, Recruit, Analytics | Inventory, Recruit |
| **Aryan** | Application developer | CRM, Desk, Contracts, WorkDrive, Analytics | CRM, Desk, Contracts, WorkDrive |
| **Zild** | Application developer | Books, Expense, Payroll, Contracts, Analytics | Books, Expense, Payroll |
| **Jade** | Application developer | One Admin, People, Recruit, Desk, Contracts, WorkDrive, Analytics | One Admin, People |
| **Linus** | **Frontend/UI/UX lead: sole UI authority** | UI of all applications, central portal, shared UI, Analytics | Bishnoi One portal, Analytics |

### GitHub identities

CI maps the **verified GitHub login of the PR author** to a developer. Handles are **not configured yet**.
A repository administrator must fill them in (see [Configuring identities](#configuring-identities)).

| Developer | GitHub handle |
|---|---|
| Aaron | _not configured_ |
| Aryan | _not configured_ |
| Zild | _not configured_ |
| Jade | _not configured_ |
| Linus | _not configured_ |
| Maintainers | _not configured_ |

## Responsibilities

- **App lead:** owns app-level files (`app/layout.tsx` structure, `app/page.tsx`, `src/app.config.ts`,
  `src/features/index.ts`, `package.json`, config files), decides feature priorities, and is the first reviewer for
  co-owners' PRs.
- **Feature owner:** owns `src/features/<feature>/`, `app/<feature>/` and `app/api/<feature>/`. Only they change
  those files. Anyone else first agrees with them.
- **Linus (UI authority):** owns `packages/ui`, the theme, layouts and all visual decisions. May edit UI files
  (`app/**/*.tsx`, `*.css`, `src/components/`) in any app, but not API routes or business logic. Must approve every
  change to protected UI paths and anything flagged as possibly high-fidelity (see [UI-GOVERNANCE.md](UI-GOVERNANCE.md)).
- **Maintainers (repository administrators):** own `.github/`, `scripts/`, root config and the packages without a
  named owner (`database`, `api-client`, `contracts`, `config`). Configure GitHub settings.

## Feature-level ownership in shared applications

Shared apps are split by feature so two developers never edit the same files at the same time.

| Application | Feature | Owner |
|---|---|---|
| Books | `invoices` | Aaron |
| Books | `ledger` | Zild |
| Books | `financial-reports` | Zild |
| People | `employees` | Jade |
| People | `onboarding` | Jade |
| People | `attendance` | Aaron |
| People | `leave` | Aaron |
| Recruit | `job-openings` | Aaron |
| Recruit | `candidates` | Aaron |
| Recruit | `interviews` | Jade |
| Recruit | `offers` | Jade |
| Analytics | `overview` | Linus |
| Analytics | `inventory-reports` | Aaron |
| Analytics | `recruit-reports` | Aaron |
| Analytics | `sales-reports` (CRM + Desk) | Aryan |
| Analytics | `finance-reports` (Books + Expense + Payroll) | Zild |
| Analytics | `hr-reports` (People) | Jade |
| Desk | `tickets` | Aryan |
| Desk | `sla` | Aryan |
| Desk | `knowledge-base` | Jade |
| Contracts | `templates` | Aryan |
| Contracts | `obligations` | Zild |
| Contracts | `approvals` | Jade |
| WorkDrive | `files` | Aryan |
| WorkDrive | `sharing` | Jade |

Single-owner apps: Inventory (Aaron), CRM (Aryan), Expense (Zild), Payroll (Zild), One Admin (Jade),
Bishnoi One portal (Linus).

> The app leads and feature splits above are a **proposed starting point** derived from the assignment table.
> Change them by editing `ownership.json` in a PR approved by a maintainer, then run `npm run codeowners`.

## Shared package owners

| Package | Owner | Backup reviewer |
|---|---|---|
| `packages/ui` | Linus | Jade |
| `packages/auth` | Jade | Aryan |
| `packages/permissions` | Jade | Aryan |
| `packages/database` | Maintainers | — |
| `packages/api-client` | Maintainers | — |
| `packages/contracts` | Maintainers | — |
| `packages/config` | Maintainers | — |

## Adding a feature

1. The feature owner agrees the feature with the app lead.
2. The maintainer adds `"<feature>": "<owner>"` to the app in `ownership.json` and runs `npm run codeowners` (one small PR).
3. The owner creates `src/features/<feature>/`, `app/<feature>/page.tsx`, `app/api/<feature>/route.ts`.
4. The app lead adds one line to `src/features/index.ts`.

## Configuring identities

Only a repository administrator should do this, using handles confirmed by each developer:

1. In `.github/ownership.json`, set each `developers.<id>.github` to the developer's GitHub login and add
   administrator logins to `maintainers`.
2. `npm run codeowners` → commit `.github/CODEOWNERS`.
3. When CI is green with the new handles, set `"enforce": true`. Until then scope checks are **report-only**.
