import type { Metadata } from "next";
import { MockDataNotice } from "@bishnoi/ui";
import { ListTable, PageFrame, PlaceholderAction } from "@/components/PageFrame";
import { getMigrations } from "@/data-migration/data";

export const metadata: Metadata = { title: "Migrations" };

export default async function MigrationsPage() {
  const migrations = await getMigrations();

  return (
    <PageFrame
      path={["data-migration", "migrations"]}
      description="Data migration moves existing emails, contacts and other data from your previous email server. Data can be migrated over POP and IMAP, or from other email providers."
      toolbar={
        <>
          <PlaceholderAction>+ Create</PlaceholderAction>
          <PlaceholderAction>Filter</PlaceholderAction>
        </>
      }
    >
      <MockDataNotice />
      <ListTable
        caption="Migrations"
        columns={["Migration Name", "Total", "Completed", "In Progress", "Failed", "Status"]}
        rows={migrations.map((migration) => [
          migration.name,
          migration.total,
          migration.completed,
          migration.inProgress,
          migration.failed,
          migration.status,
        ])}
        emptyMessage="No migrations created"
      />
    </PageFrame>
  );
}
