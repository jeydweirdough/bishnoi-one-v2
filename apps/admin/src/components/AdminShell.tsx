import type { ReactNode } from "react";
import { PrimarySidebar } from "./PrimarySidebar";
import { SecondarySidebar } from "./SecondarySidebar";
import { TopBar, type TopBarUser } from "./TopBar";

/** Admin Panel frame: primary icon rail, top bar, context-sensitive secondary sidebar, content. */
export function AdminShell({ children, user, portalUrl }: { children: ReactNode; user: TopBarUser; portalUrl: string }) {
  return (
    <div className="flex h-dvh overflow-hidden">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-30 focus:bg-white focus:p-2">
        Skip to content
      </a>
      <PrimarySidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar user={user} portalUrl={portalUrl} />
        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          <SecondarySidebar />
          <main id="main" className="min-w-0 flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
