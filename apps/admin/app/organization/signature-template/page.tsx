import type { Metadata } from "next";
import { EmptyState, PageFrame, PlaceholderAction } from "@/components/PageFrame";

export const metadata: Metadata = { title: "Signature Template" };

export default function SignatureTemplatePage() {
  return (
    <PageFrame path={["organization", "signature-template"]}>
      <EmptyState title="Organization Signature Template" action={<PlaceholderAction>Configure template</PlaceholderAction>}>
        A signature based on the template configured here will be added to the default email address of all the users in the organization.
      </EmptyState>
    </PageFrame>
  );
}
