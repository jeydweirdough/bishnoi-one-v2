import type { Metadata } from "next";
import { EmptyState, PageFrame, PlaceholderAction } from "@/components/PageFrame";

export const metadata: Metadata = { title: "Groups" };

export default function GroupsPage() {
  return (
    <PageFrame path={["groups"]} heading="Groups - Distribution List">
      <EmptyState
        title="Groups"
        action={
          <div className="flex flex-wrap justify-center gap-2">
            <PlaceholderAction>Create a new group</PlaceholderAction>
            <PlaceholderAction>Explore import options</PlaceholderAction>
          </div>
        }
      >
        Groups help organization users streamline their communication both internally and externally, while minimizing email clutter.
      </EmptyState>
    </PageFrame>
  );
}
