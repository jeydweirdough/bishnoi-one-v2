import type { Metadata } from "next";
import { EmptyState, PageFrame, PlaceholderAction } from "@/components/PageFrame";

export const metadata: Metadata = { title: "Outgoing Alerts" };

export default function OutgoingAlertsPage() {
  return (
    <PageFrame path={["mail-settings","smart-alerts","outgoing-alerts"]}>
      <EmptyState title="Outgoing Alerts" action={<PlaceholderAction>Create now</PlaceholderAction>}>
        Alerts add a banner with any type of alert or message to the email content. With outgoing alerts, you can configure banners to be added when users send specific emails, for example when a user sends an email with an attachment exceeding 30 MB. Alerts are processed one at a time, and modifications are added for all matching alerts.
      </EmptyState>
    </PageFrame>
  );
}
