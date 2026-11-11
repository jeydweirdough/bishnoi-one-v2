# packages/auth — AI instructions

Session access. **Currently a mock** (`getSession()` returns a demo user). Owned by Jade. Replacing the mock with a real identity provider is a cross-application change — ask first.

- This is a **shared package**: do not modify it unless the developer you are working for explicitly asked you to.
- PRs touching it get extra review (CODEOWNERS + `integration.yml`).
- After changes run from the repo root: `npm run typecheck && npm run test && npm run build`.
