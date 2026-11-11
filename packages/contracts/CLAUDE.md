# packages/contracts — AI instructions

The app registry (`src/apps.ts`) and shared API/feature types. Every app depends on this, so changes are cross-application changes: they need maintainer review and the affected owners' agreement. Adding a field is fine; renaming/removing one is a breaking change — ask first.

- This is a **shared package**: do not modify it unless the developer you are working for explicitly asked you to.
- PRs touching it get extra review (CODEOWNERS + `integration.yml`).
- After changes run from the repo root: `npm run typecheck && npm run test && npm run build`.
