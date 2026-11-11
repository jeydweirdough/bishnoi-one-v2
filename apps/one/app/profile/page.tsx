import type { Metadata } from "next";
import { getSession } from "@bishnoi/auth";
import { Button, MockDataNotice, PageHeader, TextField } from "@bishnoi/ui";
import { feature } from "@/features/profile";

export const metadata: Metadata = { title: feature.name };

export default async function ProfilePage() {
  const { user } = await getSession();

  return (
    <>
      <PageHeader title={feature.name} description={feature.description} />
      <MockDataNotice>Profile editing is not implemented. Fields are read-only.</MockDataNotice>
      <form className="grid max-w-md gap-4">
        <TextField id="name" label="Name" defaultValue={user.name} disabled />
        <TextField id="email" label="Email" type="email" defaultValue={user.email} disabled />
        <TextField id="organization" label="Organization ID" defaultValue={user.organizationId} disabled />
        <div>
          <Button disabled>Save (not implemented)</Button>
        </div>
      </form>
    </>
  );
}
