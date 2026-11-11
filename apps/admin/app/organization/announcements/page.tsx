import type { Metadata } from "next";
import { ListTable, PageFrame, PlaceholderAction } from "@/components/PageFrame";
import { getAnnouncements } from "@/organization/data";

export const metadata: Metadata = { title: "Announcements" };

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <PageFrame
      path={["organization", "announcements"]}
      description="Announcements are brief, informative messages displayed at the top of the app for organization users. They can be shown for a specified range, either to all users in your organization or to selected groups."
      toolbar={
        <>
          <PlaceholderAction>+ Add</PlaceholderAction>
          <PlaceholderAction>Settings</PlaceholderAction>
        </>
      }
    >
      <ListTable
        caption="Announcements"
        columns={["Content", "Apply To", "Expiry Date"]}
        rows={announcements.map((announcement) => [announcement.content, announcement.applyTo, announcement.expiryDate])}
      />
    </PageFrame>
  );
}
