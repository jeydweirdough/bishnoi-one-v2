import type { Metadata } from "next";
import { MockDataNotice } from "@bishnoi/ui";
import { PageFrame, PlaceholderAction } from "@/components/PageFrame";
import { getMigrationSources } from "@/data-migration/data";

export const metadata: Metadata = { title: "Applications" };

export default async function MigrationApplicationsPage() {
  const sources = await getMigrationSources();

  return (
    <PageFrame
      path={["data-migration", "applications"]}
      description="Configure your source accounts to migrate data to Mail. You can start new migration tasks, follow their progress, and manage configurations."
    >
      <MockDataNotice />
      <ul className="grid gap-4 md:grid-cols-3">
        {sources.map((source) => (
          <li key={source.name} className="rounded border border-gray-300">
            <div className="flex items-center justify-between gap-2 border-b border-gray-300 bg-gray-50 px-4 py-2">
              <h2 className="font-semibold">{source.name}</h2>
              {source.configured ? (
                <span className="rounded border border-gray-500 px-1.5 py-0.5 text-xs">Configured</span>
              ) : (
                <PlaceholderAction>Configure</PlaceholderAction>
              )}
            </div>
            <p className="p-4 text-sm text-gray-700">Connect securely to {source.name} to start migrating its data to Mail.</p>
          </li>
        ))}
      </ul>
    </PageFrame>
  );
}
