import type { Metadata } from "next";
import { MockDataNotice } from "@bishnoi/ui";
import { ListTable, PageFrame, PlaceholderAction } from "@/components/PageFrame";
import { getSavedSettings } from "@/data-migration/data";

export const metadata: Metadata = { title: "Saved Settings" };

export default async function SavedSettingsPage() {
  const settings = await getSavedSettings();

  return (
    <PageFrame
      path={["data-migration", "saved-settings"]}
      description="Configure multiple settings (folder options, date range, etc.) and assign the relevant settings to each saved server configuration."
      toolbar={<PlaceholderAction>+ Add</PlaceholderAction>}
    >
      <MockDataNotice />
      <ListTable
        caption="Saved settings"
        columns={["Name", "Assigned server detail", "Protocol/ Application", "Actions"]}
        rows={settings.map((setting) => [
          setting.name,
          setting.assignedServer,
          setting.protocol,
          <PlaceholderAction key="delete">Delete</PlaceholderAction>,
        ])}
        emptyMessage="No settings saved"
      />
    </PageFrame>
  );
}
