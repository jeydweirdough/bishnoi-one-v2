import type { Metadata } from "next";
import { BUSINESS_APPS } from "@bishnoi/contracts";
import { ROLES } from "@bishnoi/permissions";
import { Button, DataTable, MockDataNotice, PageHeader, Placeholder, SelectField } from "@bishnoi/ui";
import { feature } from "@/features/access";

export const metadata: Metadata = { title: feature.name };

export default function AccessPage() {
  return (
    <>
      <PageHeader title={feature.name} description={feature.description} />
      <MockDataNotice />
      <DataTable caption="Application access" columns={feature.columns} rows={feature.mockRows} />
      <div className="mt-6">
        <Placeholder title="Grant access">
          <form className="mt-3 grid max-w-md gap-4">
            <SelectField id="app" label="Application" options={BUSINESS_APPS.map((app) => app.name)} disabled />
            <SelectField id="role" label="Role" options={[...ROLES]} disabled />
            <div>
              <Button disabled>Grant (not implemented)</Button>
            </div>
          </form>
        </Placeholder>
      </div>
    </>
  );
}
