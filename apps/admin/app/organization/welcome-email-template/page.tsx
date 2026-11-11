import type { Metadata } from "next";
import { EmptyState, PageFrame, PlaceholderAction } from "@/components/PageFrame";

export const metadata: Metadata = { title: "Welcome Email Template" };

export default function WelcomeEmailTemplatePage() {
  return (
    <PageFrame path={["organization", "welcome-email-template"]}>
      <EmptyState title="Welcome Email Template" action={<PlaceholderAction>Configure template</PlaceholderAction>}>
        Create a welcome email that will be sent to users once an account is created for them in your organization.
      </EmptyState>
    </PageFrame>
  );
}
