import type { Metadata } from "next";
import { ListTable, PageFrame, PlaceholderAction } from "@/components/PageFrame";
import { getBulkActivities } from "@/organization/data";

export const metadata: Metadata = { title: "Bulk Activities" };

export default async function BulkActivitiesPage() {
  const activities = await getBulkActivities();

  return (
    <PageFrame
      path={["organization", "bulk-activities"]}
      description="Bulk activities involve operations where an action is performed on multiple entities at the same time."
      toolbar={
        <>
          <PlaceholderAction>+ Schedule new activity</PlaceholderAction>
          <PlaceholderAction>User import history</PlaceholderAction>
        </>
      }
    >
      <ListTable
        caption="Bulk activities"
        columns={["Name", "Operation Type", "Scheduled By", "Scheduled On", "Status"]}
        rows={activities.map((activity) => [activity.name, activity.operationType, activity.scheduledBy, activity.scheduledOn, activity.status])}
      />
    </PageFrame>
  );
}
