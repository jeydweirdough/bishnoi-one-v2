# packages/config — AI instructions

Shared build tooling consumed by **every** app and package. A change here can break all 13 builds.

- Owner: repository maintainers (see `.github/ownership.json` → `packages.config`). Changes need maintainer review.
- Do not modify without explicit permission from the developer you are working for **and** a note in the PR.
- Never loosen `strict` TypeScript settings or disable lint rules to make a single app pass — fix the app.
- After any change run from the repo root: `npm run lint && npm run typecheck && npm run build`.
