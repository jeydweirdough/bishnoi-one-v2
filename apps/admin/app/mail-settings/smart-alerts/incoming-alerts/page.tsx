import type { Metadata } from "next";
import { EmptyState, PageFrame, PlaceholderAction } from "@/components/PageFrame";

export const metadata: Metadata = { title: "Incoming Alerts" };

export default function IncomingAlertsPage() {
  return (
    <PageFrame path={["mail-settings","smart-alerts","incoming-alerts"]}>
      <EmptyState title="Incoming Alerts" action={<PlaceholderAction>Create now</PlaceholderAction>}>
        Alerts add a banner with any type of alert or message to the email content. With incoming alerts, you can configure banners to be added when users view specific emails, for instance emails from external senders who are not part of the organization. These alerts can help protect users from phishing or fraudulent emails. Alerts are processed sequentially, and modifications are added for all matching alerts.
      </EmptyState>
    </PageFrame>
  );
}
