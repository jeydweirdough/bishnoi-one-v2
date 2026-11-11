# packages/ui — AI instructions

**Owner: Linus (sole Frontend/UI/UX authority).** Every change in this package needs Linus's approval.

- Read `docs/UI-GOVERNANCE.md` before touching anything here.
- The theme in `src/styles.css` is deliberately grayscale with animations removed. Do not add colors,
  gradients, shadows-as-decoration, custom fonts, glassmorphism, or motion.
- Do not add a component unless at least one app needs it now. Keep components small and unstyled beyond layout.
- If you are not working for Linus: stop and ask before editing. Suggest the change in the PR description instead.
- After changes: `npm run lint -w @bishnoi/ui && npm run typecheck -w @bishnoi/ui && npm run build`
  (all apps consume this package).
