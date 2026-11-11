<!--
PR title MUST be a Conventional Commit — it becomes the squash commit message:
  type(scope): subject        e.g.  feat(inventory): add stock adjustment
Types: feat fix ui docs style refactor perf test build ci chore revert
Scopes: an app (inventory, crm, ...), a package (ui, auth, ...), or repo/ci/deps/docs/governance/shared
-->

## Summary

<!-- What changed and why, in 1–3 sentences. Link the issue if there is one. -->

## Application and feature

- App(s):
- Feature(s):
- Mock data or real backend?

## Testing

<!-- Commands you ran and their results. -->

## Required checklist

- [ ] I branched from the latest `main` and this PR targets `main`.
- [ ] I changed only files in applications/features I own (or the owners agreed in this PR).
- [ ] I staged files explicitly and no `.env` files, secrets or credentials are included.
- [ ] `lint`, `typecheck`, `test` and `build` pass locally for the affected app(s).
- [ ] Shared package, database migration or breaking API changes are called out below (or there are none).
- [ ] Mock functionality is clearly labelled as mock.

## UI policy

<!-- Tick ONE. See docs/UI-GOVERNANCE.md. -->

- [ ] No UI changes.
- [ ] Low-fidelity UI only (grayscale, `@bishnoi/ui` components, no new colors/gradients/animation/fonts/branding).
- [ ] Visual / high-fidelity change **authorized by Linus** — Linus is requested as reviewer.

## Shared, cross-app, migration or breaking changes

<!-- "None", or describe and list the owners whose approval is needed. -->

None.
