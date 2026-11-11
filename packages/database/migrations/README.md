# Database migrations

No migrations exist yet. Every app currently uses mock data.

**Approval required.** A migration changes shared Neon state, so before adding one:

1. Describe the schema change, the owning app, and rollback steps in the PR description.
2. Get approval from the owning app's lead and a repository maintainer (CODEOWNERS enforces review of this folder).
3. AI agents must stop and ask the developer before creating or running any migration.

Name tables with an app prefix (e.g. `inventory_items`, `crm_leads`) so apps stay independent.
