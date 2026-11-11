# Applications

Bishnoi One is one central portal plus 12 business applications. All are Phase 1 **shells**: navigation,
dashboards, feature pages and API routes exist, but every value is **mock data**.

| Application | Folder | Workspace | Port | Lead | Owners | Backup reviewer |
|---|---|---|---|---|---|---|
| Bishnoi One (portal) | `apps/one` | `@bishnoi/app-one` | 3000 | Linus | Linus | Jade |
| Inventory | `apps/inventory` | `@bishnoi/app-inventory` | 3001 | Aaron | Aaron | Zild |
| CRM | `apps/crm` | `@bishnoi/app-crm` | 3002 | Aryan | Aryan | Jade |
| Books | `apps/books` | `@bishnoi/app-books` | 3003 | Zild | Aaron, Zild | Aryan |
| Expense | `apps/expense` | `@bishnoi/app-expense` | 3004 | Zild | Zild | Aaron |
| Payroll | `apps/payroll` | `@bishnoi/app-payroll` | 3005 | Zild | Zild | Aaron |
| People | `apps/people` | `@bishnoi/app-people` | 3006 | Jade | Aaron, Jade | Zild |
| Recruit | `apps/recruit` | `@bishnoi/app-recruit` | 3007 | Aaron | Aaron, Jade | Aryan |
| Analytics | `apps/analytics` | `@bishnoi/app-analytics` | 3008 | Linus | Aaron, Aryan, Zild, Jade, Linus | Jade |
| One Admin | `apps/admin` | `@bishnoi/app-admin` | 3009 | Jade | Jade | Aryan |
| Desk | `apps/desk` | `@bishnoi/app-desk` | 3010 | Aryan | Aryan, Jade | Zild |
| Contracts | `apps/contracts` | `@bishnoi/app-contracts` | 3011 | Aryan | Aryan, Zild, Jade | Aaron |
| WorkDrive | `apps/workdrive` | `@bishnoi/app-workdrive` | 3012 | Aryan | Aryan, Jade | Zild |

## Per-application features

| Application | Features (owner) |
|---|---|
| Bishnoi One | launcher, profile, organization, access (all Linus) |
| Inventory | items, stock-adjustments, warehouses (Aaron) |
| CRM | leads, contacts, deals (Aryan) |
| Books | invoices (Aaron) · ledger, financial-reports (Zild) |
| Expense | claims, expense-reports, policies (Zild) |
| Payroll | pay-runs, salary-components, payslips (Zild) |
| People | employees, onboarding (Jade) · attendance, leave (Aaron) |
| Recruit | job-openings, candidates (Aaron) · interviews, offers (Jade) |
| Analytics | overview (Linus) · inventory-reports, recruit-reports (Aaron) · sales-reports (Aryan) · finance-reports (Zild) · hr-reports (Jade) |
| One Admin | users, roles, audit-log (Jade) |
| Desk | tickets, sla (Aryan) · knowledge-base (Jade) |
| Contracts | templates (Aryan) · obligations (Zild) · approvals (Jade) |
| WorkDrive | files (Aryan) · sharing (Jade) |

## What each app has today

| Route | What it is | Real or mock |
|---|---|---|
| `/` | Dashboard: mock record counts and a card per feature | Mock |
| `/<feature>` | Table of mock rows, disabled "New" button, placeholder for forms | Mock |
| `/api/health` | `{ app, status, database: "configured" \| "not-configured" }` | Real (no DB query) |
| `/api/<feature>` | Same rows as the page, with `mock: true` | Mock |

### Portal (`apps/one`)

| Route | Content |
|---|---|
| `/` | Welcome, stats, application launcher (filtered by permissions), org/access/profile cards |
| `/launcher` | Launcher for all 12 apps (links use `NEXT_PUBLIC_APP_URL_<APP>` or `localhost:<port>`) |
| `/profile` | Read-only profile form (mock session) |
| `/organization` | Organization details placeholder |
| `/access` | Application access table + disabled grant form (placeholder) |

Organization and user/role management will be **implemented in One Admin** (Jade). The portal shows placeholders.

## Running one application

```bash
npm run dev -w @bishnoi/app-crm            # http://localhost:3002
npx turbo run build --filter=@bishnoi/app-crm
```
