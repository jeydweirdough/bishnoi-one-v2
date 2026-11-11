import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { ModuleMenu } from "./ModuleMenu";
import { ModuleRail } from "./ModuleRail";
import { TopBar, type TopBarUser } from "./TopBar";

/** Recruit frame: module rail, persistent top bar, context-sensitive module menu, breadcrumbs, content. */
export function RecruitShell({ children, user, portalUrl }: { children: ReactNode; user: TopBarUser; portalUrl: string }) {
  return (
    <div className="flex h-dvh overflow-hidden">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-30 focus:bg-white focus:p-2">
        Skip to content
      </a>
      <ModuleRail />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar user={user} portalUrl={portalUrl} />
        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          <ModuleMenu />
          <main id="main" className="min-w-0 flex-1 overflow-y-auto p-4 md:p-6">
            <Breadcrumbs />
            <div className="mt-2">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
