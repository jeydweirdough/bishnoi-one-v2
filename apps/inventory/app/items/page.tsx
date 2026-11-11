import type { Metadata } from "next";
import { Button, DataTable, MockDataNotice, PageHeader, Placeholder } from "@bishnoi/ui";
import { feature } from "@/features/items";

export const metadata: Metadata = { title: feature.name };

/** Owner: Aaron. */
export default function ItemsPage() {
  return (
    <>
      <PageHeader title={feature.name} description={feature.description} actions={<Button disabled>New (not implemented)</Button>} />
      <MockDataNotice />
      <DataTable caption={feature.name} columns={feature.columns} rows={feature.mockRows} />
      <div className="mt-6">
        <Placeholder title={`${feature.name} create and edit forms`}>Not implemented yet. API: GET /api/items returns the same mock rows.</Placeholder>
      </div>
    </>
  );
}
