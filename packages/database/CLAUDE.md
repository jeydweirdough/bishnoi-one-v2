# packages/database — AI instructions

Neon PostgreSQL client. Server-side only. Owned by maintainers. Never create or run migrations without approval (see `migrations/README.md`). Never log or commit `DATABASE_URL`.

- This is a **shared package**: do not modify it unless the developer you are working for explicitly asked you to.
- PRs touching it get extra review (CODEOWNERS + `integration.yml`).
- After changes run from the repo root: `npm run typecheck && npm run test && npm run build`.
