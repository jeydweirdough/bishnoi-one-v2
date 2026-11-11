# Recruitment UI Components

All UI is **low fidelity**: `@bishnoi/ui` components plus grayscale Tailwind. It has no colour, icon library, animation
or branding. Anything beyond that needs Linus (`docs/UI-GOVERNANCE.md`).

## Built (shell)

All of these are in `apps/recruit/src/components/` unless noted.

| Component | File | Notes |
|---|---|---|
| Application shell | `RecruitShell.tsx` | Module rail, top bar, module menu, breadcrumbs, `<main>`, skip link |
| Collapsible module rail | `ModuleRail.tsx` | Collapse state is stored in `localStorage` (`recruit.module-rail.collapsed`); labels hide on small screens |
| Module menu with nested groups | `ModuleMenu.tsx` | Expandable groups; the active group opens automatically; collapses behind a toggle on mobile |
| Top navigation | `TopBar.tsx` | App switcher, page search (`/`), quick create, notifications, settings, user menu |
| Breadcrumbs | `Breadcrumbs.tsx` | Built from the config, so built pages and Coming Soon pages both get them |
| Dropdown | `Dropdown.tsx` | Closes on outside click, Escape, link click and navigation |
| Icons | `Icon.tsx` | Inline SVG outlines; no icon library (Lucide was not added — it is a new dependency, which UI governance bans) |
| Coming Soon page | `ComingSoon.tsx` | Shows the page name, module and group, origin tag, owner and edition |
| Catch-all route | `app/[...slug]/page.tsx` | Serves Coming Soon, redirects and 404s, and pre-renders every registered page |

## Accessibility in the shell

- There is a skip link to `#main`.
- The rail, the module menu and the breadcrumbs are each a `nav` with an `aria-label`.
- The current page has `aria-current="page"`.
- Group toggles have `aria-expanded` and `aria-controls`.
- Icon-only buttons have an `aria-label` and a `title`.
- Search is labelled.

## Planned (not built)

Build these with existing `@bishnoi/ui` parts (`DataTable`, `PageHeader`, `Card`, `Badge`, `MockDataNotice`, `Placeholder`)
wherever possible. New shared components belong in `packages/ui`, which only Linus owns.

| Component | Used by | Behaviour in the reference |
|---|---|---|
| List view with saved views and filters | All list pages | Views dropdown, "Create View", left-side filter, mass actions, Quick View |
| Pagination | Lists | |
| Record detail with tabs | Candidate, Job Opening, Application, Interview, Offer | Overview / Timeline / Status, then Related Lists |
| Candidate card | Pipeline, search results | |
| Pipeline board (Kanban) | Job Opening › Hiring Pipeline | Not seen in the reference; Inferred |
| Status badge | Everywhere | Grayscale text badge |
| Dynamic form | Create and edit pages | Driven by the custom-fields config |
| Resume preview | Candidate | PDF or text preview |
| Interview calendar | Interviews, Activities | |
| Assessment form and scorecard | Interviews | |
| Approval timeline | Requisitions, Offers | |
| Activity feed | Every record | |
| Modal and drawer | Quick create, Quick View | |
| Empty, loading and error states | Every page | Copy the Admin app's `EmptyState` pattern; `loading.tsx` and `error.tsx` per route |

## Responsive behaviour

- **Below `md`:** the rail shows icons only; the module menu becomes a toggled panel above the content; search is
  hidden below `sm` (you can still reach pages through the menu).
- **`md` and up:** the rail shows labels; the module menu is a fixed 16rem column.
