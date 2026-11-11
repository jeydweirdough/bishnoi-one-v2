import type { Metadata } from "next";
import { MockDataNotice } from "@bishnoi/ui";
import { ListTable, PageFrame, PlaceholderAction } from "@/components/PageFrame";
import { getRetryQueue } from "@/mail-settings/data";

export const metadata: Metadata = { title: "Retry Emails" };

export default async function RetryEmailsPage() {
  const queue = await getRetryQueue();

  return (
    <PageFrame
      path={["mail-settings", "retry-emails"]}
      description="Outbound emails may bounce because of temporary errors on recipient servers. Such emails move to a retry queue and delivery is retried automatically at intervals. Administrators can also retry delivery from this list. If delivery fails, the sender is notified with the reason."
      toolbar={<PlaceholderAction>Refresh</PlaceholderAction>}
    >
      <MockDataNotice />
      <ListTable
        caption="Retry queue"
        columns={["Sender", "Recipient", "Last tried", "Pending retries", "Failure Reason"]}
        rows={queue.map((item) => [item.sender, item.recipient, item.lastTried, item.pendingRetries, item.failureReason])}
        emptyMessage="No emails waiting to be retried"
      />
    </PageFrame>
  );
}
