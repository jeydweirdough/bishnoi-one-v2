import type { Metadata } from "next";
import { MockDataNotice } from "@bishnoi/ui";
import { ListTable, PageFrame, PlaceholderAction } from "@/components/PageFrame";
import { getDomains } from "@/domains/data";

export const metadata: Metadata = { title: "Domains" };

export default async function DomainsPage() {
  const domains = await getDomains();

  return (
    <PageFrame
      path={["domains"]}
      description="The domains added to your organization account. Select a domain to configure MX, SPF, DKIM, DMARC and other domain settings."
      toolbar={
        <div className="flex w-full flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <PlaceholderAction>+ Add</PlaceholderAction>
            <PlaceholderAction>Buy</PlaceholderAction>
            <PlaceholderAction>Filter</PlaceholderAction>
          </div>
          <span className="text-sm">
            Total domains: <strong>{domains.length}</strong>
          </span>
        </div>
      }
    >
      <MockDataNotice />
      <ListTable
        caption="Domains"
        columns={["Domain Name", "Status", "Registrar Info", "Expiry date"]}
        rows={domains.map((domain) => [
          <span key="name">
            {domain.name}
            {domain.primary ? <span className="ml-2 rounded border border-gray-400 px-1.5 py-0.5 text-xs">Primary</span> : null}
          </span>,
          domain.status,
          domain.registrar,
          domain.expiryDate,
        ])}
        emptyMessage="No domains added"
      />
    </PageFrame>
  );
}
