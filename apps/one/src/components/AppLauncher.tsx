import type { AppDefinition } from "@bishnoi/contracts";
import { getAppUrl } from "@bishnoi/contracts";
import { Badge } from "@bishnoi/ui";

/** Grid of application tiles. Each app is a separate deployment, so links are plain anchors. */
export function AppLauncher({ apps }: { apps: readonly AppDefinition[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {apps.map((app) => (
        <li key={app.id}>
          <a href={getAppUrl(app.id)} className="flex h-full flex-col gap-1 rounded border border-gray-300 p-4 hover:bg-gray-50">
            <span className="flex items-center justify-between gap-2">
              <span className="font-semibold">{app.name}</span>
              <Badge>{app.category}</Badge>
            </span>
            <span className="text-sm text-gray-600">{app.description}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
