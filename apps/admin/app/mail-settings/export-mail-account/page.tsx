import type { Metadata } from "next";
import { EmptyState, PageFrame, PlaceholderAction } from "@/components/PageFrame";

export const metadata: Metadata = { title: "Export Mail Account" };

export default function ExportMailAccountPage() {
  return (
    <PageFrame path={["mail-settings","export-mail-account"]}>
      <EmptyState title="Export Mail Account" action={<PlaceholderAction>Schedule new export</PlaceholderAction>}>
        You can export the email accounts of users in your organization. The exported files will be deleted after 30 days. If you are exporting account data before deleting a user's account, download the files before deleting the account. Once the account is deleted, its exported files are also deleted and will not be available for download.
      </EmptyState>
    </PageFrame>
  );
}
