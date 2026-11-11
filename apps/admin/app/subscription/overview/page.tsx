import type { Metadata } from "next";
import { MockDataNotice } from "@bishnoi/ui";
import { ListTable, PageFrame, PlaceholderAction } from "@/components/PageFrame";
import { getSubscription } from "@/subscription/data";

export const metadata: Metadata = { title: "Subscription Overview" };

export default async function SubscriptionOverviewPage() {
  const subscription = await getSubscription();
  const availableLicenses = subscription.totalLicenses - subscription.usedLicenses;

  return (
    <PageFrame path={["subscription", "overview"]}>
      <MockDataNotice />
      <section className="mx-auto max-w-2xl rounded border border-gray-300">
        <div className="flex flex-wrap items-start justify-between gap-2 border-b border-gray-300 bg-gray-50 p-4">
          <div>
            <h2 className="text-lg font-semibold uppercase">{subscription.plan}</h2>
            <p className="text-sm">Expiry date: {subscription.expiryDate}</p>
            <p className="text-sm text-gray-600">Expires in {subscription.daysLeft} days</p>
          </div>
          <span className="rounded border border-gray-700 px-2 py-0.5 text-xs font-semibold">{subscription.active ? "ACTIVE" : "INACTIVE"}</span>
        </div>

        <dl className="grid grid-cols-2 gap-4 p-4 text-center sm:grid-cols-4">
          {[
            ["Duration", subscription.duration],
            ["Total Licenses", subscription.totalLicenses],
            ["Used Licenses", subscription.usedLicenses],
            ["Available Licenses", availableLicenses],
          ].map(([label, value]) => (
            <div key={label} className="flex flex-col-reverse">
              <dt className="text-xs text-gray-600">{label}</dt>
              <dd className="text-lg font-semibold">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="border-t border-gray-300 p-4">
          <h3 className="mb-2 text-sm font-semibold">Add-ons</h3>
          <ListTable
            caption="Add-ons"
            columns={["Add-on", "Purchased", "Available"]}
            rows={subscription.addOns.map((addOn) => [addOn.name, addOn.purchased, addOn.available])}
            emptyMessage="No add-ons purchased"
          />
          <div className="mt-4 text-center">
            <PlaceholderAction>Manage Subscription</PlaceholderAction>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
