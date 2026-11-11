import type { Metadata } from "next";
import { EmptyState, PageFrame, PlaceholderAction } from "@/components/PageFrame";

export const metadata: Metadata = { title: "Incoming Rules" };

export default function IncomingRulesPage() {
  return (
    <PageFrame path={["mail-settings","rules","incoming-rules"]}>
      <EmptyState title="Incoming Rules" action={<PlaceholderAction>Create now</PlaceholderAction>}>
        Incoming rules are used to manage emails sent to users. They can be used to customize spam filtering, route emails to different recipients, or perform other actions. For an incoming email, rules are processed one at a time. Once the conditions of a rule are matched and the rule action is applied, the subsequent rules are not processed.
      </EmptyState>
    </PageFrame>
  );
}
