import type { Metadata } from "next";
import { MockDataNotice } from "@bishnoi/ui";
import { ListTable, PageFrame, PlaceholderAction } from "@/components/PageFrame";
import { getRoutingConfigurations } from "@/mail-settings/data";

export const metadata: Metadata = { title: "Email Routing Configuration" };

export default async function EmailRoutingConfigurationPage() {
  const configurations = await getRoutingConfigurations();

  return (
    <PageFrame
      path={["mail-settings", "email-routing", "configuration"]}
      heading="Email Routing"
      description="Email routing sends emails to other recipients in addition to the original recipient, or routes them to a different destination. Configure advanced delivery options to change the default email delivery behaviour."
      toolbar={<PlaceholderAction>+ Add</PlaceholderAction>}
    >
      <MockDataNotice />
      <ListTable
        caption="Email routing configurations"
        columns={["Source domain", "Destination address", "Email Delivery Type", "Status"]}
        rows={configurations.map((configuration) => [
          configuration.sourceDomain,
          configuration.destinationAddress,
          configuration.deliveryType,
          <label key="status" className="flex items-center gap-2">
            <input type="checkbox" checked={configuration.enabled} disabled readOnly />
            {configuration.enabled ? "Enabled" : "Disabled"}
          </label>,
        ])}
      />
    </PageFrame>
  );
}
