# packages/permissions — AI instructions

Role → action rules used by every app. Owned by Jade. Changing what a role may do affects every app — ask first and add tests.

- This is a **shared package**: do not modify it unless the developer you are working for explicitly asked you to.
- PRs touching it get extra review (CODEOWNERS + `integration.yml`).
- After changes run from the repo root: `npm run typecheck && npm run test && npm run build`.
