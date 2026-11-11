# Deployment

Each of the 13 apps deploys **independently**: its own Vercel project or Coolify resource, its own URL,
its own environment variables. Deployments are **disabled** until an administrator enables them.

## Rules

- Nothing deploys unless the repository variable `DEPLOYMENTS_ENABLED` is `true`.
- Pushes to `main` deploy **preview** builds of changed apps only. **Production is never automatic.**
- Production deploys are started manually (*Actions → Deploy → Run workflow*) and run in the `production`
  GitHub Environment, which must require reviewer approval. **That approval is the explicit authorization.**
- Every deployment runs lint + typecheck + build for that app first. If validation fails, nothing deploys.
- Secrets live only in GitHub Environments / repository secrets and in the hosting platform. Never in the repo.

## Option A: Vercel

One Vercel project per app.

1. In Vercel, *Add New → Project*, import the repository, and set:
   - **Root Directory:** `apps/<app>` (e.g. `apps/crm`)
   - Framework: Next.js (auto). Install/build commands: leave default (Vercel detects npm workspaces).
   - Enable "Include files outside the root directory" (default for monorepos).
   - `apps/<app>/vercel.json` sets `ignoreCommand` (`turbo-ignore`) so unchanged apps skip builds.
2. Add environment variables per project (`DATABASE_URL`, `NEXT_PUBLIC_APP_URL_*` for the portal).
3. Choose **one** deployment trigger:
   - **Vercel Git integration** (simplest): Vercel deploys previews per PR and production on `main`.
     If you use this, leave `DEPLOYMENTS_ENABLED` unset and protect production in Vercel instead.
   - **GitHub Actions** (`deploy.yml`, explicit production approval): disable Vercel's Git auto-deploy
     (`git.deploymentEnabled: false` in `vercel.json` or project settings) and configure the secrets below.

GitHub secrets for Actions-driven Vercel deploys:

| Secret | Value |
|---|---|
| `VERCEL_TOKEN` | Vercel access token (scoped to the team) |
| `VERCEL_ORG_ID` | Team/org id (`.vercel/project.json` after `vercel link`) |
| `VERCEL_PROJECT_ID_<APP>` | Project id per app, e.g. `VERCEL_PROJECT_ID_CRM`, `VERCEL_PROJECT_ID_WORKDRIVE` |

## Option B: Coolify (Docker)

The root `Dockerfile` builds any single app as a standalone Next.js server:

```bash
docker build --build-arg APP=crm -t bishnoi-crm .
docker run -p 3000:3000 -e DATABASE_URL=... bishnoi-crm
```

1. In Coolify, create one **Application** per app from this Git repository, build pack **Dockerfile**,
   Dockerfile location `/Dockerfile`, build argument `APP=<app id>`, exposed port `3000`.
2. Set environment variables per resource.
3. Disable Coolify's auto-deploy on push if you want GitHub Actions to control deploys, then copy each resource's
   **Deploy Webhook** URL.

| Secret | Value |
|---|---|
| `COOLIFY_TOKEN` | Coolify API token with deploy permission |
| `COOLIFY_WEBHOOK_<APP>` | Deploy webhook URL per app, e.g. `COOLIFY_WEBHOOK_CRM` |

## Repository variables

| Variable | Values | Purpose |
|---|---|---|
| `DEPLOYMENTS_ENABLED` | `true` / unset | Master switch for `deploy.yml` |
| `DEPLOY_PLATFORM` | `vercel` (default) / `coolify` | Platform for automatic preview deploys on `main` |

App ids in secret names are uppercased: `ONE INVENTORY CRM BOOKS EXPENSE PAYROLL PEOPLE RECRUIT ANALYTICS ADMIN DESK CONTRACTS WORKDRIVE`.

## Deploying to production

1. Confirm `main` is green (CI, Integration, Security).
2. *Actions → Deploy → Run workflow*: app = `crm`, environment = `production`, platform = `vercel`/`coolify`.
3. The run validates the app, then **waits for a `production` environment reviewer to approve**.
4. After approval it deploys. Check `/api/health` on the deployed URL.

## Rollback

- **Vercel:** *Deployments* → previous production deployment → *Promote to Production* (instant).
- **Coolify:** redeploy the previous image/commit from the resource's deployment history.
- Then fix forward with a normal PR. Never force-push `main` to roll back.

## Portal links

The portal links to apps with `NEXT_PUBLIC_APP_URL_<APP>` (read at **build time**). Set all 12 on the portal's
project, e.g. `NEXT_PUBLIC_APP_URL_CRM=https://crm.example.com`, then redeploy the portal.
