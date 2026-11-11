# Bishnoi One

One integrated codebase for the **Bishnoi One** portal and its **12 independent business applications**.
Each app is a separate Next.js application that builds and deploys on its own; they share a small set of
internal packages. All UI is deliberately **low fidelity** until Linus authorizes visual work.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Turborepo · npm workspaces ·
Neon PostgreSQL · GitHub Actions · Vercel / Coolify

## Applications

| App | Folder | Port | Lead |
|---|---|---|---|
| Bishnoi One (portal) | `apps/one` | 3000 | Linus |
| Inventory | `apps/inventory` | 3001 | Aaron |
| CRM | `apps/crm` | 3002 | Aryan |
| Books | `apps/books` | 3003 | Zild |
| Expense | `apps/expense` | 3004 | Zild |
| Payroll | `apps/payroll` | 3005 | Zild |
| People | `apps/people` | 3006 | Jade |
| Recruit | `apps/recruit` | 3007 | Aaron |
| Analytics | `apps/analytics` | 3008 | Linus |
| One Admin | `apps/admin` | 3009 | Jade |
| Desk | `apps/desk` | 3010 | Aryan |
| Contracts | `apps/contracts` | 3011 | Aryan |
| WorkDrive | `apps/workdrive` | 3012 | Aryan |

Full ownership: [docs/TEAM.md](docs/TEAM.md) · Details: [docs/APPLICATIONS.md](docs/APPLICATIONS.md)

> **Status:** Phase 1 shells. Every screen and API returns **mock data**. Authentication is a mock demo user.
> No database tables exist yet.

## Quick start

Requires Node.js 22.12+ (24 recommended, see `.nvmrc`) and npm 10+.

```bash
npm install
npm run dev -w @bishnoi/app-one          # portal → http://localhost:3000
npm run dev -w @bishnoi/app-inventory    # one app → http://localhost:3001
npm run dev                              # all 13 apps
```

Full onboarding for Windows, Ubuntu and Zed: [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md).

## Everyday workflow

```bash
git switch main && git pull --ff-only origin main
git switch -c feat/inventory-stock-adjustment
# ...work only inside your app/feature...
git add apps/inventory/
git commit -m "feat(inventory): add stock adjustment"
git push -u origin feat/inventory-stock-adjustment
gh pr create --base main --fill
```

Read [docs/BRANCHING.md](docs/BRANCHING.md), [docs/COMMIT-POLICY.md](docs/COMMIT-POLICY.md) and
[docs/PULL-REQUESTS.md](docs/PULL-REQUESTS.md) before your first PR.

## Scripts

| Command | What it does |
|---|---|
| `npm run build` / `lint` / `typecheck` / `test` | Turborepo tasks across all workspaces |
| `npm run validate` | Everything CI runs, locally |
| `npm run check:structure` | 13 apps, 7 packages, docs, ownership and app independence |
| `npm run check:ui` | Heuristic low-fidelity UI scan (Linus makes the real call) |
| `npm run check:scope -- --as <dev>` | Preview branch/ownership checks for your branch |
| `npm run codeowners` | Regenerate `.github/CODEOWNERS` from `.github/ownership.json` |

## Repository map

```text
apps/        13 Next.js apps (portal + 12)      packages/   ui, auth, permissions, database, api-client, contracts, config
docs/        team, process and architecture docs  scripts/governance/  ownership, naming, UI and structure checks
.github/     workflows, CODEOWNERS, ownership.json, PR template
```

## Documentation

[Architecture](docs/ARCHITECTURE.md) · [Team](docs/TEAM.md) · [Applications](docs/APPLICATIONS.md) ·
[Development](docs/DEVELOPMENT.md) · [Branching](docs/BRANCHING.md) · [Commit policy](docs/COMMIT-POLICY.md) ·
[Pull requests](docs/PULL-REQUESTS.md) · [Reviewers](docs/REVIEWERS.md) · [Merge conflicts](docs/MERGE-CONFLICTS.md) ·
[Workflows](docs/WORKFLOWS.md) · [Integration](docs/INTEGRATION.md) · [UI governance](docs/UI-GOVERNANCE.md) ·
[Deployment](docs/DEPLOYMENT.md)

AI agents: start with [CLAUDE.md](CLAUDE.md).
