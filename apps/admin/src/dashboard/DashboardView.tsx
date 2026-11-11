import Link from "next/link";
import { Card, DataTable, MockDataNotice, StatGrid } from "@bishnoi/ui";
import type { DashboardData } from "./data";

const formatNumber = (value: number) => value.toLocaleString("en-US");

/** Plain grayscale proportion bar. The visible text next to it carries the value for screen readers. */
function Bar({ value, max }: { value: number; max: number }) {
  const percent = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div aria-hidden="true" className="h-2 w-full rounded bg-gray-200">
      <div className="h-2 rounded bg-gray-700" style={{ width: `${percent}%` }} />
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-gray-600">{label}</dt>
      <dd className="font-semibold break-words">{value}</dd>
    </div>
  );
}

function OrganizationSummary({ organization }: { organization: DashboardData["organization"] }) {
  return (
    <section aria-labelledby="org-heading" className="mb-6 flex flex-col gap-4 rounded border border-gray-300 p-4 md:flex-row md:items-start">
      <div className="flex items-center gap-4 md:w-1/3">
        <div aria-hidden="true" className="flex size-16 shrink-0 items-center justify-center rounded border border-dashed border-gray-400 text-xs text-gray-600">
          Logo
        </div>
        <div className="min-w-0">
          <h2 id="org-heading" className="truncate text-lg font-semibold">
            {organization.name}
          </h2>
          <p className="truncate text-sm text-gray-600">{organization.website}</p>
        </div>
      </div>
      <dl className="grid flex-1 grid-cols-1 gap-3 text-sm sm:grid-cols-2">
        <Field label="Super Administrator Email Address" value={organization.superAdminEmail} />
        <Field label="Plan" value={organization.plan} />
        <Field label="Subscription Duration" value={organization.subscriptionDuration} />
        <Field label="Renewal Date" value={organization.renewalDate} />
      </dl>
      <Link href="/organization/profile" className="self-start rounded border border-gray-400 px-3 py-1.5 text-sm hover:bg-gray-100">
        Edit<span className="sr-only"> organization profile</span>
      </Link>
    </section>
  );
}

function EmailTraffic({ traffic }: { traffic: DashboardData["emailTraffic"] }) {
  const incoming = traffic.days.reduce((sum, day) => sum + day.incoming, 0);
  const outgoing = traffic.days.reduce((sum, day) => sum + day.outgoing, 0);
  const spam = traffic.days.reduce((sum, day) => sum + day.spam, 0);

  return (
    <Card
      title="Email Traffic Stats"
      footer={
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="flex min-w-0 max-w-full flex-wrap items-center gap-2">
            <span className="text-gray-600">Date range</span>
            <select disabled className="min-w-0 max-w-full rounded border border-gray-400 px-2 py-1 disabled:bg-gray-100">
              <option>{traffic.rangeLabel}</option>
            </select>
          </label>
          <Link href="/reports" className="underline">
            View all reports
          </Link>
        </div>
      }
    >
      <dl className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["Total emails", incoming + outgoing],
          ["Incoming emails", incoming],
          ["Outgoing emails", outgoing],
          ["Incoming spam", spam],
        ].map(([label, value]) => (
          <div key={label} className="flex flex-col-reverse text-center">
            <dt className="text-xs text-gray-600">{label}</dt>
            <dd className="text-lg font-semibold">{formatNumber(value as number)}</dd>
          </div>
        ))}
      </dl>
      <DataTable
        caption="Daily email traffic"
        columns={[
          { key: "date", label: "Date" },
          { key: "incoming", label: "Incoming" },
          { key: "outgoing", label: "Outgoing" },
          { key: "spam", label: "Spam" },
        ]}
        rows={traffic.days.map((day) => ({ ...day }))}
      />
    </Card>
  );
}

function UserSummary({ summary }: { summary: DashboardData["userSummary"] }) {
  const total = summary.active + summary.inactive;
  return (
    <Card title="Organization Users Summary">
      <dl className="grid grid-cols-2 gap-3 text-center">
        <div className="flex flex-col-reverse">
          <dt className="text-xs text-gray-600">Active users</dt>
          <dd className="text-2xl font-semibold">{formatNumber(summary.active)}</dd>
        </div>
        <div className="flex flex-col-reverse">
          <dt className="text-xs text-gray-600">Inactive users</dt>
          <dd className="text-2xl font-semibold">{formatNumber(summary.inactive)}</dd>
        </div>
      </dl>
      <div className="mt-4">
        <Bar value={summary.active} max={total} />
        <p className="mt-1 text-xs text-gray-600">{total > 0 ? Math.round((summary.active / total) * 100) : 0}% active</p>
      </div>
    </Card>
  );
}

function StorageReport({ storage }: { storage: DashboardData["storage"] }) {
  const max = Math.max(0, ...storage.map((entry) => entry.usedGb));
  return (
    <Card
      title="Storage Reports"
      footer={
        <Link href="/subscription/storage-reports" className="underline">
          View detailed report
        </Link>
      }
    >
      <p className="mb-3 text-xs text-gray-600">Mail storage used, top {storage.length} users</p>
      <ul className="flex flex-col gap-2">
        {storage.map((entry) => (
          <li key={entry.user} className="grid grid-cols-[6rem_1fr_4rem] items-center gap-2">
            <span className="truncate">{entry.user}</span>
            <Bar value={entry.usedGb} max={max} />
            <span className="text-right tabular-nums">{entry.usedGb.toFixed(1)} GB</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function SecurityStatus({ security }: { security: DashboardData["security"] }) {
  const checks: [string, number][] = [
    ["Domains with MX", security.withMx],
    ["Domains with SPF", security.withSpf],
    ["Domains with DKIM", security.withDkim],
  ];
  return (
    <Card title="Security">
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <span>Suspicious Logins (Last 7 days)</span>
        <span className="text-lg font-semibold">{formatNumber(security.suspiciousLogins)}</span>
      </div>
      <ul className="mt-3 flex flex-col gap-4">
        {checks.map(([label, value]) => (
          <li key={label}>
            <div className="mb-1 flex items-center justify-between">
              <span>{label}</span>
              <span className="font-semibold tabular-nums">
                {value}/{security.domains}
              </span>
            </div>
            <Bar value={value} max={security.domains} />
          </li>
        ))}
      </ul>
    </Card>
  );
}

function Resources({ resources }: { resources: DashboardData["resources"] }) {
  return (
    <Card title="Resources">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="font-semibold">Training &amp; Guides</h3>
          <ul className="mt-2 list-disc pl-5 text-gray-700">
            {resources.guides.map((guide) => (
              <li key={guide}>{guide}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">FAQs</h3>
          <ul className="mt-2 list-disc pl-5 text-gray-700">
            {resources.faqs.map((faq) => (
              <li key={faq}>{faq}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-3 text-xs text-gray-600">Placeholder — help articles are not linked yet.</p>
    </Card>
  );
}

export function DashboardView({ data }: { data: DashboardData }) {
  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="sr-only">Dashboard</h1>
      {data.mock ? <MockDataNotice>The dashboard shows placeholder values. No Admin backend is connected yet.</MockDataNotice> : null}
      <OrganizationSummary organization={data.organization} />
      <StatGrid
        items={[
          { label: "Domains", value: formatNumber(data.counts.domains) },
          { label: "Organization Users", value: formatNumber(data.counts.users) },
          { label: "Groups", value: formatNumber(data.counts.groups) },
          { label: "Total Licenses", value: formatNumber(data.counts.licenses) },
        ]}
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <EmailTraffic traffic={data.emailTraffic} />
        </div>
        <UserSummary summary={data.userSummary} />
        <div className="min-w-0 lg:col-span-2">
          <StorageReport storage={data.storage} />
        </div>
        <SecurityStatus security={data.security} />
        <div className="min-w-0 lg:col-span-2">
          <Resources resources={data.resources} />
        </div>
      </div>
    </div>
  );
}
