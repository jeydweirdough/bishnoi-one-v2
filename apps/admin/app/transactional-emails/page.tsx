import type { Metadata } from "next";
import { EmptyState, PageFrame, PlaceholderAction } from "@/components/PageFrame";

export const metadata: Metadata = { title: "Transactional Emails" };

export default function TransactionalEmailsPage() {
  return (
    <PageFrame path={["transactional-emails"]}>
      <EmptyState title="Transactional Emails" action={<PlaceholderAction>Get Started</PlaceholderAction>}>
        Transactional emails are a dedicated service for sending high-volume emails such as OTPs, order confirmations and password
        resets. Whether you run an app or a storefront, your critical messages are delivered instantly and securely.
      </EmptyState>
    </PageFrame>
  );
}
