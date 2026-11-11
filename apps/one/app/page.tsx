import type { Metadata } from "next";
import { getSession } from "@bishnoi/auth";
import { APPS, BUSINESS_APPS } from "@bishnoi/contracts";
import { accessibleApps } from "@bishnoi/permissions";
import { ButtonLink, Card, CardGrid, MockDataNotice, PageHeader, StatGrid } from "@bishnoi/ui";
import { AppLauncher } from "@/components/AppLauncher";

export const metadata: Metadata = { title: "Dashboard" };

export default async function PortalDashboardPage() {
  const session = await getSession();
  const allowedIds = accessibleApps(session, BUSINESS_APPS.map((app) => app.id));
  const allowedApps = APPS.filter((app) => allowedIds.includes(app.id));

  return (
    <>
      <PageHeader title={`Welcome, ${session.user.name}`} description="Your Bishnoi One workspace." />
      {session.mock ? <MockDataNotice>You are signed in as a demo user. Authentication is not implemented yet.</MockDataNotice> : null}
      <StatGrid
        items={[
          { label: "Applications available", value: allowedApps.length },
          { label: "Organization", value: "Demo Organization" },
          { label: "Members (mock)", value: 5 },
          { label: "Pending invites (mock)", value: 1 },
        ]}
      />
      <h2 className="mb-3 font-semibold">Applications</h2>
      <AppLauncher apps={allowedApps} />
      <div className="mt-8">
        <CardGrid>
          <Card title="Organization" footer={<ButtonLink href="/organization">Manage organization</ButtonLink>}>
            Organization settings placeholder.
          </Card>
          <Card title="Application access" footer={<ButtonLink href="/access">Manage access</ButtonLink>}>
            Control which users can open which applications.
          </Card>
          <Card title="Profile" footer={<ButtonLink href="/profile">View profile</ButtonLink>}>
            Your account details.
          </Card>
        </CardGrid>
      </div>
    </>
  );
}
