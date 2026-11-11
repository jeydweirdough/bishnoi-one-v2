import type { Metadata } from "next";
import { MockDataNotice } from "@bishnoi/ui";
import { ListTable, PageFrame, PlaceholderAction } from "@/components/PageFrame";
import { getEmailPolicies } from "@/mail-settings/data";

export const metadata: Metadata = { title: "Policies" };

export default async function PoliciesPage() {
  const policies = await getEmailPolicies();

  return (
    <PageFrame
      path={["mail-settings", "email-policy", "policies"]}
      heading="Email Policy"
      description="Email policies help administrators control the organization's email sending and receiving parameters. You can define multiple email, account, access and forward restrictions, associate them with policies, and apply the policies to users and groups."
      toolbar={
        <div className="flex w-full items-center justify-between gap-2">
          <PlaceholderAction>+ Create</PlaceholderAction>
          <span className="text-sm">
            Total policies: <strong>{policies.length}</strong>
          </span>
        </div>
      }
    >
      <MockDataNotice />
      <ListTable
        caption="Email policies"
        columns={["Name", "Associated Users", "Associated Groups"]}
        rows={policies.map((policy) => [
          <span key="name">
            {policy.name}
            {policy.isDefault ? <span className="ml-2 rounded border border-gray-400 px-1.5 py-0.5 text-xs">Default</span> : null}
          </span>,
          policy.associatedUsers,
          policy.associatedGroups,
        ])}
      />
    </PageFrame>
  );
}
