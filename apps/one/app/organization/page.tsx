import type { Metadata } from "next";
import { Button, DataTable, MockDataNotice, PageHeader, Placeholder } from "@bishnoi/ui";
import { feature } from "@/features/organization";

export const metadata: Metadata = { title: feature.name };

export default function OrganizationPage() {
  return (
    <>
      <PageHeader title={feature.name} description={feature.description} actions={<Button disabled>Edit (not implemented)</Button>} />
      <MockDataNotice />
      <DataTable caption="Organization details" columns={feature.columns} rows={feature.mockRows} />
      <div className="mt-6">
        <Placeholder title="Organization management">
          Creating organizations, billing details and member invitations are not implemented. User and role
          administration will be provided by the One Admin app.
        </Placeholder>
      </div>
    </>
  );
}
