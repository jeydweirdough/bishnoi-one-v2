# Development Guide

## Prerequisites

| Tool | Version | Notes |
|---|---|---|
| Node.js | 22.12+ (24 recommended) | `.nvmrc` pins 24 |
| npm | 10+ | ships with Node |
| Git | 2.40+ | |
| GitHub CLI (`gh`) | latest | optional, for `gh pr create` |

## Setup on Windows

1. Install **Git for Windows** (includes Git Bash): <https://git-scm.com/download/win>.
   Accept the default "Checkout as-is, commit Unix-style line endings" or run:
   ```powershell
   git config --global core.autocrlf false
   ```
   (`.gitattributes` normalises line endings to LF either way.)
2. Install Node.js 24 with **nvm-windows** (<https://github.com/coreybutler/nvm-windows>) or the official installer:
   ```powershell
   nvm install 24
   nvm use 24
   ```
3. Optional: `winget install GitHub.cli` then `gh auth login`.
4. Clone into a path **without** special characters if possible, then install:
   ```powershell
   git clone <repo-url> bishnoi-one
   cd bishnoi-one
   npm install
   ```
5. Run the portal: `npm run dev -w @bishnoi/app-one` → <http://localhost:3000>.

Windows tips:
- If `npm run dev` for all apps is slow, run only the apps you need (`-w @bishnoi/app-<app>`).
- Windows Defender can slow `node_modules`; consider excluding the repository folder.
- Use Git Bash, PowerShell or Windows Terminal. All npm scripts work in each.

## Setup on Ubuntu

```bash
sudo apt update && sudo apt install -y git curl build-essential
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.bashrc
nvm install 24 && nvm use 24
# optional: GitHub CLI — https://github.com/cli/cli/blob/trunk/docs/install_linux.md
git clone <repo-url> bishnoi-one && cd bishnoi-one
npm install
npm run dev -w @bishnoi/app-one
```

If you hit `ENOSPC: System limit for number of file watchers reached`:
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

## Setup in Zed

1. Install Zed: <https://zed.dev> (macOS/Linux; Windows builds are available from zed.dev).
2. Open the repository folder (`zed .`). The shared `.zed/settings.json` enables format-on-save and the TypeScript,
   ESLint and Tailwind language servers.
3. Zed installs language servers automatically on first open. If Tailwind class completion is missing, open
   any `.tsx` file and wait for "tailwindcss-language-server" to finish downloading.
4. Use Zed's terminal (`ctrl-\``) for npm and git commands.
5. AI assistants in Zed must follow `CLAUDE.md` like any other agent.

VS Code users: install the recommended extensions from `.vscode/extensions.json`.

## Daily commands

```bash
npm run dev -w @bishnoi/app-<app>      # one app
npm run dev                            # all 13 apps (heavy)
npm run lint -w @bishnoi/app-<app>
npm run typecheck -w @bishnoi/app-<app>
npx turbo run build --filter=@bishnoi/app-<app>
npm run test                           # package + governance tests
npm run check:ui                       # heuristic low-fidelity scan
npm run check:scope -- --as <you>      # preview CI ownership rules for your branch
npm run validate                       # everything CI checks
```

## Environment variables

Copy `.env.example` to `apps/<app>/.env.local` **only if you need** a value. Nothing is required today.

| Variable | Used by | Purpose |
|---|---|---|
| `DATABASE_URL` | `@bishnoi/database` | Neon connection string (server only). Unset = mock data. |
| `NEXT_PUBLIC_APP_URL_<APP>` | portal launcher | Public URL of an app, e.g. `NEXT_PUBLIC_APP_URL_CRM`. Read at build time. |

Never commit `.env*` files. CI (`security-secrets`) and `npm run check:structure` fail if one is tracked.

## Working with AI agents

Agents (Claude Code, Zed AI, etc.) read `CLAUDE.md` and `apps/<app>/CLAUDE.md`. Tell the agent **who you are**
and **which app/feature** you are working on. Agents must not commit, push or open PRs unless you explicitly say so.

## Troubleshooting

| Problem | Fix |
|---|---|
| `Port 300x is already in use` | Another app/instance is running. Stop it or `npx kill-port 300x`. |
| Types for `.next/types` missing | Run `npm run typecheck -w @bishnoi/app-<app>` (runs `next typegen`). |
| Styles missing for a shared component | Ensure `app/globals.css` imports `@bishnoi/ui/styles.css` and restart `dev`. |
| `Cannot find module '@bishnoi/...'` | Run `npm install` at the repo root (not inside an app). |
| Lockfile conflicts | See [MERGE-CONFLICTS.md](MERGE-CONFLICTS.md#package-lockjson). |
| Turbo uses stale output | `npm run clean` then rebuild. |
| CI failures | See [WORKFLOWS.md](WORKFLOWS.md#troubleshooting). |
