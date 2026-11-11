import type { Metadata } from "next";
import Link from "next/link";
import { MockDataNotice, StatGrid } from "@bishnoi/ui";
import { ListTable, PageFrame } from "@/components/PageFrame";
import { COMPLIANCE_ACTIONS } from "@/security/data";

export const metadata: Metadata = { title: "Security Dashboard" };

const BANDS = ["Low", "Moderate", "Good", "Excellent"];

export default function SecurityDashboardPage() {
  const completed = COMPLIANCE_ACTIONS.filter((action) => action.done).length;
  const total = COMPLIANCE_ACTIONS.length;
  const score = Math.round((completed / total) * 100);
  const band = BANDS[Math.min(BANDS.length - 1, Math.floor(score / 25))];

  return (
    <PageFrame
      path={["security-and-compliance", "dashboard"]}
      heading="Security and Compliance Dashboard"
      description="Your compliance score measures progress on the recommended actions that improve your organization's security."
    >
      <MockDataNotice />
      <section aria-labelledby="score-heading" className="mb-6 rounded border border-gray-300 p-4">
        <h2 id="score-heading" className="font-semibold">
          Your security and compliance score
        </h2>
        <p className="mt-2 text-3xl font-semibold">
          {score}% <span className="text-base font-normal text-gray-600">({band})</span>
        </p>
        <div aria-hidden="true" className="mt-2 h-3 w-full rounded bg-gray-200">
          <div className="h-3 rounded bg-gray-700" style={{ width: `${score}%` }} />
        </div>
        <p className="mt-1 flex justify-between text-xs text-gray-600">
          {BANDS.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </p>
      </section>

      <StatGrid
        items={[
          { label: "All actions", value: total },
          { label: "Completed", value: completed },
          { label: "Incomplete", value: total - completed },
        ]}
      />

      <ListTable
        caption="Recommended security actions"
        columns={["Action", "Threat Type", "Status"]}
        rows={COMPLIANCE_ACTIONS.map((action) => [
          <span key="action" className="block whitespace-normal">
            <span className="block font-semibold">{action.title}</span>
            <span className="block text-gray-600">{action.description}</span>
          </span>,
          action.threat,
          action.done ? (
            "Done"
          ) : (
            <Link key="status" href={action.href} className="underline">
              Configure now
            </Link>
          ),
        ])}
      />
    </PageFrame>
  );
}
