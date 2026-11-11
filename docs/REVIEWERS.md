# Reviewers and Approvals

## Principles

- **Nobody approves their own PR.** GitHub ignores self-approval; branch protection requires one other approval.
- Every application has an **independent backup reviewer** who is not its sole owner.
- **Linus must approve** shared UI, themes, layouts, design tokens and any visual/high-fidelity change.
- **Cross-application changes** need approval from an owner of **each** affected app.
- **Shared packages** need their owner (or a maintainer, for maintainer-owned packages).

## Application reviewers

| Application | Primary reviewer(s) | Independent backup |
|---|---|---|
| Bishnoi One portal | Linus | Jade |
| Inventory | Aaron | Zild |
| CRM | Aryan | Jade |
| Books | Zild (lead), Aaron | Aryan |
| Expense | Zild | Aaron |
| Payroll | Zild | Aaron |
| People | Jade (lead), Aaron | Zild |
| Recruit | Aaron (lead), Jade | Aryan |
| Analytics | Linus (lead), feature owners | Jade |
| One Admin | Jade | Aryan |
| Desk | Aryan (lead), Jade | Zild |
| Contracts | Aryan (lead), Zild, Jade | Aaron |
| WorkDrive | Aryan (lead), Jade | Zild |

**Who reviews whom, in practice:**
- In a **single-owner app**, the owner writes and the **backup** reviews (e.g. Aaron's Inventory PR → Zild).
- In a **shared app**, the **lead** reviews co-owners' feature PRs. When the lead authors, the **backup** reviews
  (e.g. Zild's Books ledger PR → Aryan; Aaron's Books invoices PR → Zild).
- Feature folders list the feature owner and app lead (or backup) in CODEOWNERS, so a qualified independent
  reviewer always exists.

## Shared packages

| Package | Required reviewer | Backup |
|---|---|---|
| `ui` | **Linus** (CI requires Linus specifically for non-Linus authors) | Jade (for Linus's own PRs) |
| `auth`, `permissions` | Jade | Aryan |
| `database`, `api-client`, `contracts`, `config` | Maintainers | — |
| `database/migrations` | Maintainers + owning app lead (by agreement) | — |

## Special cases

| Change | Required approvals |
|---|---|
| Protected UI paths (`packages/ui/**`, `apps/*/app/layout.tsx`, `apps/*/app/globals.css`, `apps/*/public/**`, `docs/UI-GOVERNANCE.md`) | Linus (enforced by `ui-governance`) |
| Linus's own UI PRs | One independent reviewer (backup: Jade) |
| Cross-app (2+ apps) | One owner of each app |
| `.github/`, `scripts/`, root config, `ownership.json` | Maintainer |
| Database migration / breaking API change | Owning lead + maintainer, agreed **before** implementation |
| Override of a scope-check failure | Maintainer applies `scope-override-approved` (must not be the author) |

## Reviewer expectations

- First response within **1 working day**. If you can't, hand off to the backup.
- Review against [PULL-REQUESTS.md](PULL-REQUESTS.md#review-guidelines) and [UI-GOVERNANCE.md](UI-GOVERNANCE.md).
- Approve only what you reviewed. Re-review after new commits (stale approvals are dismissed).

## How this is enforced

`.github/CODEOWNERS` is **generated** from `.github/ownership.json` (`npm run codeowners`). CODEOWNERS lines are
inactive (commented out) until verified GitHub handles are configured. See [TEAM.md](TEAM.md#configuring-identities).
