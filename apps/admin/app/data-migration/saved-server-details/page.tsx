import type { Metadata } from "next";
import { MockDataNotice } from "@bishnoi/ui";
import { ListTable, PageFrame, PlaceholderAction } from "@/components/PageFrame";
import { getSavedServers } from "@/data-migration/data";

export const metadata: Metadata = { title: "Saved Server Details" };

export default async function SavedServerDetailsPage() {
  const servers = await getSavedServers();

  return (
    <PageFrame
      path={["data-migration", "saved-server-details"]}
      description="Saved server details are the configuration of the server you are migrating from. Save them to reuse in future migrations."
      toolbar={<PlaceholderAction>+ Add</PlaceholderAction>}
    >
      <MockDataNotice />
      <ListTable
        caption="Saved server details"
        columns={["Server Configuration Name", "Protocol/ Application"]}
        rows={servers.map((server) => [server.name, server.protocol])}
        emptyMessage="No server details saved"
      />
    </PageFrame>
  );
}
