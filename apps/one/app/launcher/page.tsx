import type { Metadata } from "next";
import { getSession } from "@bishnoi/auth";
import { BUSINESS_APPS } from "@bishnoi/contracts";
import { accessibleApps } from "@bishnoi/permissions";
import { PageHeader } from "@bishnoi/ui";
import { AppLauncher } from "@/components/AppLauncher";
import { feature } from "@/features/launcher";

export const metadata: Metadata = { title: feature.name };

export default async function LauncherPage() {
  const session = await getSession();
  const allowedIds = accessibleApps(session, BUSINESS_APPS.map((app) => app.id));

  return (
    <>
      <PageHeader title={feature.name} description={feature.description} />
      <AppLauncher apps={BUSINESS_APPS.filter((app) => allowedIds.includes(app.id))} />
      <p className="mt-6 text-sm text-gray-600">
        Each application is deployed independently. Links point to http://localhost:&lt;port&gt; unless
        NEXT_PUBLIC_APP_URL_&lt;APP&gt; is set at build time.
      </p>
    </>
  );
}
