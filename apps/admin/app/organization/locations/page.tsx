import type { Metadata } from "next";
import { MockDataNotice } from "@bishnoi/ui";
import { ListTable, PageFrame, PlaceholderAction } from "@/components/PageFrame";
import { getLocations } from "@/organization/data";

export const metadata: Metadata = { title: "Locations" };

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <PageFrame
      path={["organization", "locations"]}
      description="Add/edit the locations of your organization's branches here. This can be used to identify the different locations from where your employees are working."
      toolbar={<PlaceholderAction>+ Add</PlaceholderAction>}
    >
      <MockDataNotice />
      <ListTable
        caption="Locations"
        columns={["Name", "Address", "Time Zone", "Actions"]}
        rows={locations.map((location) => [
          location.name,
          location.address || "—",
          location.timeZone,
          <span key="actions" className="flex gap-2">
            <PlaceholderAction>Edit</PlaceholderAction>
            <PlaceholderAction>Delete</PlaceholderAction>
          </span>,
        ])}
      />
    </PageFrame>
  );
}
