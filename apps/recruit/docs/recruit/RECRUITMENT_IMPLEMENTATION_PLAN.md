# Recruitment Implementation Plan

## Status

| Phase | Scope | Status |
|---|---|---|
| 1. Research | Public Zoho Recruit pages, with origin tags | Done (gaps listed in `ZOHO_RECRUIT_RESEARCH.md`) |
| 2. Architecture and docs | Navigation registry, resolver, these docs | Done |
| 3. Shell and Coming Soon | Rail, top bar, module menu, breadcrumbs, 105 routes | Done |
| 4. Validation | Lint, typecheck, build, route smoke test, `check:ui`, `check:structure` | Done |
| 5. Feature build-out | Real screens and data | Not started; gated below |

## How routing works

- `src/navigation/config.ts` is the only place pages are declared. Adding a page takes one `leaf(...)` line.
- `src/navigation/resolve.ts` flattens the config into `PAGES` and resolves URLs to a page, a redirect or a 404.
- `app/[...slug]/page.tsx` renders Coming Soon for any registered page that has no folder of its own.
- **To build a page:** create `app/<path>/page.tsx` (in your own feature folder). It overrides the catch-all automatically,
  and keeps its breadcrumbs, active state and title, because those come from the config.
- The existing pages at `/`, `/job-openings`, `/candidates`, `/interviews` and `/offers` were not changed. They now render
  inside the new shell.

## Changes to app-level files (agreed with Aaron)

- `app/layout.tsx`: uses `RecruitShell` instead of `@bishnoi/ui`'s `AppShell`. This is a protected UI file, so it
  **needs Linus's review**.
- `src/app.config.ts`'s `nav` export is no longer used by the layout. It was left in place so the change stays small;
  the app lead can remove it.

## Gates before Phase 5

1. **Linus:** approve the shell layout (low fidelity), or redesign it.
2. **Maintainer:** add the unassigned modules to `.github/ownership.json` (proposed: `applications`, `talent`,
   `activities`, `staffing`, `reports`, `administration`).
3. **Approval for the data model** (`RECRUITMENT_DATA_MODELS.md`) before any `recruit_` migration.
4. **The People API contract** for the HRMS handover, agreed with Jade.
5. **Someone with a Zoho Recruit trial** checks the menu labels and order, then updates the origin tags.

## Suggested build order

1. Job Openings and Candidates: list, create and detail, using mock data and `MockDataNotice` (Aaron)
2. Applications and pipeline stages; this unblocks everything after it
3. Interviews: scheduling, feedback and scorecards (Jade)
4. Offers: approvals, templates and the HRMS handover (Jade)
5. Activities and Home widgets
6. Reports (with Analytics), then Administration configuration
7. Talent Acquisition portals; Staffing last, and only if it is needed

## Advanced (after Linus authorizes higher-fidelity UI)

These are ideas only and need Linus's go-ahead:

- Kanban drag-and-drop
- A rich calendar
- A resume viewer
- A visual approval timeline
- A dashboard widget composer ("Add Component")
- Charts in Reports
- Career site theming
