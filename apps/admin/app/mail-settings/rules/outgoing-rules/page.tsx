import type { Metadata } from "next";
import { EmptyState, PageFrame, PlaceholderAction } from "@/components/PageFrame";

export const metadata: Metadata = { title: "Outgoing Rules" };

export default function OutgoingRulesPage() {
  return (
    <PageFrame path={["mail-settings","rules","outgoing-rules"]}>
      <EmptyState title="Outgoing Rules" action={<PlaceholderAction>Create now</PlaceholderAction>}>
        Outgoing rules are used to manage emails sent by users. They can be used to review outgoing user emails, route emails to different recipients, or perform other actions. For an outgoing email, rules are processed one at a time. Once the conditions of a rule are matched and the rule action is applied, the subsequent rules are not processed.
      </EmptyState>
    </PageFrame>
  );
}
