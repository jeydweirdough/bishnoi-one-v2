import type { Metadata } from "next";
import type { ReactNode } from "react";
import { MockDataNotice } from "@bishnoi/ui";
import { PageFrame, PlaceholderAction } from "@/components/PageFrame";
import { CopyButton } from "@/components/CopyButton";
import { getOrganizationProfile } from "@/organization/data";

export const metadata: Metadata = { title: "Profile" };

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 py-2 sm:grid-cols-[16rem_1fr] sm:gap-4">
      <dt className="text-sm text-gray-600">{label}</dt>
      <dd className="flex flex-wrap items-center gap-2 text-sm">{children}</dd>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-6">
      <h2 className="mb-1 font-semibold">{title}</h2>
      <dl className="divide-y divide-gray-200">{children}</dl>
    </section>
  );
}

export default async function OrganizationProfilePage() {
  const profile = await getOrganizationProfile();

  return (
    <PageFrame path={["organization", "profile"]}>
      <MockDataNotice />
      <div className="flex flex-col-reverse gap-6 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <Section title="Organization Info">
            <Row label="Name">
              {profile.name} <PlaceholderAction>Edit</PlaceholderAction>
            </Row>
            <Row label="Created Time">{profile.createdTime}</Row>
            <Row label="Organization ID">
              {profile.organizationId} <CopyButton value={profile.organizationId} label="organization ID" />
            </Row>
          </Section>
          <Section title="Contact Details">
            <Row label="Super Administrator Name">
              {profile.superAdminName} <PlaceholderAction>Edit</PlaceholderAction>
            </Row>
            <Row label="Super Administrator Email Address">
              {profile.superAdminEmail} <CopyButton value={profile.superAdminEmail} label="super administrator email address" />
            </Row>
          </Section>
          <Section title="Subscription Info">
            <Row label="Plan">{profile.plan}</Row>
            <Row label="Subscription Duration">{profile.subscriptionDuration}</Row>
            <Row label="Expiry Date">{profile.expiryDate}</Row>
          </Section>
        </div>
        <div className="flex flex-col items-start gap-2">
          <div aria-hidden="true" className="flex size-40 items-center justify-center rounded border border-dashed border-gray-400 text-sm text-gray-600">
            Logo
          </div>
          <PlaceholderAction>Change logo</PlaceholderAction>
        </div>
      </div>
    </PageFrame>
  );
}
