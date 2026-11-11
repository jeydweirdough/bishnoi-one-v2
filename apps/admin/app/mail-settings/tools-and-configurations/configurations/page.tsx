import type { Metadata } from "next";
import type { ReactNode } from "react";
import { MockDataNotice } from "@bishnoi/ui";
import { CopyButton } from "@/components/CopyButton";
import { ListTable, PageFrame, PlaceholderAction } from "@/components/PageFrame";
import { getServerSettings } from "@/mail-settings/data";

export const metadata: Metadata = { title: "Configurations" };

function ServerCard({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <section className="rounded border border-gray-300">
      <h2 className="border-b border-gray-300 bg-gray-50 px-4 py-2 font-semibold">{title}</h2>
      <dl className="flex flex-col gap-3 p-4 text-sm">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-gray-600">{label}</dt>
            <dd className="font-semibold break-all">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function DnsSection({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <section className="mt-6 rounded border border-gray-300">
      <h2 className="border-b border-gray-300 bg-gray-50 px-4 py-2 font-semibold">{title}</h2>
      <div className="p-4">
        <p className="mb-3 text-sm">{description}</p>
        {children}
      </div>
    </section>
  );
}

export default async function ConfigurationsPage() {
  const settings = await getServerSettings();

  return (
    <PageFrame
      path={["mail-settings", "tools-and-configurations", "configurations"]}
      description="IMAP, POP and SMTP configuration details, MX records for domain verification, and the SPF record for email validation."
      toolbar={<PlaceholderAction>Send to DNS admin</PlaceholderAction>}
    >
      <MockDataNotice />
      <div className="grid gap-4 md:grid-cols-3">
        <ServerCard
          title="IMAP"
          rows={[
            ["Incoming Server Name", settings.imap.server],
            ["Port", settings.imap.port],
            ["Require SSL", settings.imap.ssl],
            ["Username", settings.imap.username],
          ]}
        />
        <ServerCard
          title="POP"
          rows={[
            ["Incoming Server Name", settings.pop.server],
            ["Port", settings.pop.port],
            ["Require SSL", settings.pop.ssl],
            ["Username", settings.pop.username],
          ]}
        />
        <ServerCard
          title="Outgoing / SMTP"
          rows={[
            ["Outgoing Server Name", settings.smtp.server],
            ["Port", settings.smtp.port],
            ["Require Authentication", settings.smtp.authentication],
          ]}
        />
      </div>

      <DnsSection
        title="MX"
        description="MX records must be configured and verified for your domain to receive emails. In your domain registrar's DNS manager, add the MX records listed below."
      >
        <ListTable
          caption="MX records"
          columns={["Record Type", "Host", "Priority", "Value"]}
          rows={settings.mx.map((record) => [
            "MX",
            record.host,
            record.priority,
            <span key="value" className="flex items-center gap-2">
              {record.value} <CopyButton value={record.value} label={`MX value ${record.value}`} />
            </span>,
          ])}
        />
      </DnsSection>

      <DnsSection
        title="SPF"
        description="The SPF record helps recipient servers identify which servers may send email using your domain name. In your domain registrar's DNS manager, add the SPF record below."
      >
        <ListTable
          caption="SPF record"
          columns={["Record Type", "Host", "Value"]}
          rows={[
            [
              "TXT",
              settings.spf.host,
              <span key="value" className="flex items-center gap-2">
                {settings.spf.value} <CopyButton value={settings.spf.value} label="SPF value" />
              </span>,
            ],
          ]}
        />
      </DnsSection>
    </PageFrame>
  );
}
