# UI Governance: Low-Fidelity Policy

> **Default UI = Low Fidelity. High-Fidelity UI = Linus Authorization Only.**

This policy applies to **every application** (including the Bishnoi One portal), **every developer**, and
**every AI coding agent**. Owner of this policy: **Linus**. Changes to this file require Linus's approval.

## Why

Phase 1 is about working functionality and stable structure. Visual design will be done once, consistently,
by one person. Until then, plain screens keep reviews fast and avoid 12 apps drifting into 12 different styles.

## Rules

1. Use grayscale, basic layouts, simple navigation, tables, forms and functional placeholder components.
2. Prioritise functionality, accessibility and responsiveness over visual polish.
3. Do not introduce branding, custom color palettes, gradients, glassmorphism, elaborate animations, decorative
   elements or high-fidelity designs.
4. Aaron, Aryan, Zild and Jade may build the basic interfaces their features need, using `@bishnoi/ui` and
   grayscale utilities, but must not redesign application UI.
5. **Linus is the sole Frontend/UI/UX authority.**
6. Only Linus may initiate or authorize high-fidelity UI/UX improvements.
7. Changes to shared UI components, themes, layouts, design tokens and visual styling require Linus's review.
8. Any unauthorized high-fidelity UI change is rejected in PR review.
9. AI coding agents must never independently upgrade low-fidelity interfaces into polished designs.
10. When UI requirements are ambiguous, preserve low fidelity and request clarification.

## Allowed vs. not allowed (without Linus)

| Allowed | Not allowed |
|---|---|
| `@bishnoi/ui` components: `AppShell`, `PageHeader`, `Card`, `DataTable`, `StatGrid`, `Button`, `TextField`, `SelectField`, `Badge`, `Placeholder`, `MockDataNotice` | New shared components or changes to existing ones |
| Tailwind layout utilities: `flex`, `grid`, `gap-*`, `p-*`, `m-*`, `w-*`, responsive prefixes | Colors other than `gray-*`, `black`, `white` |
| `gray-*` / `black` / `white` text, border and background | Gradients, `backdrop-blur`, glass effects |
| `rounded`, `border`, `border-dashed` | Large/decorative shadows, `drop-shadow` |
| Semantic HTML, labels, focus states, `sr-only` | Animations, `@keyframes`, motion libraries |
| Plain text headings | Custom fonts (`next/font`, Google Fonts), icon/UI kits (Radix, MUI, lucide…) |
| | Logos, illustrations, images in `public/`, brand names or assets of other companies |

## How it is enforced

| Mechanism | What it does | Limits |
|---|---|---|
| **Theme** (`packages/ui/src/styles.css`) | Removes Tailwind's color palette and animations. `bg-blue-500` or `animate-spin` produce no CSS. | Arbitrary values or raw CSS can still bypass it. |
| **CODEOWNERS** | Linus (backup: Jade) owns `packages/ui/**`, `apps/*/app/globals.css`, `apps/*/app/layout.tsx`, `apps/*/public/**`, this file. | One approval from any listed owner satisfies GitHub. |
| **`ui-governance` CI check** | If a PR changes protected UI paths **or** the heuristic scan flags something, it requires an **APPROVED review from Linus himself**. | Needs Linus's GitHub handle in `ownership.json`. |
| **`npm run check:ui`** | Heuristic scan for colors, gradients, blur, animation, heavy shadows, fonts, UI kits, inline colors, hex colors in CSS. | **Heuristic.** It cannot judge visual fidelity. A clean result is not an approval. |
| **PR checklist** | Author declares: no UI change / low-fidelity only / Linus-authorized change. | Self-declared. |
| **AI rules** | Root and per-app `CLAUDE.md` forbid unrequested visual upgrades. | Agents can still make mistakes, so review applies. |

**Automated checks do not determine visual fidelity. Linus performs final visual approval.**

## Requesting a visual change

1. Open an issue or ask Linus directly, describing the screen and why.
2. Linus either does the work (`linus/ui/<app>-<component>` branch) or authorizes it in writing on the PR.
3. The PR ticks "Visual / high-fidelity change authorized by Linus" and requests Linus as reviewer.
4. `ui-governance` passes only after Linus approves.

## Reviewing (for everyone)

Reject or request changes when a PR, without Linus's authorization:
- adds color, gradients, effects, motion, fonts, icons, imagery or branding;
- restyles shared components or layouts;
- "polishes" a screen beyond what the feature needs.
