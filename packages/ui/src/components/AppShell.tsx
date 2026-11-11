import type { ReactNode } from "react";
import { NavLinks, type NavItem } from "./NavLinks";

export interface AppShellProps {
  appName: string;
  nav: NavItem[];
  children: ReactNode;
  /** Shown in the header as a profile placeholder. */
  userName?: string;
  /** Link back to the Bishnoi One portal. Omit inside the portal itself. */
  portalUrl?: string;
}

/** Header + sidebar + content layout shared by every app. Sidebar stacks above content on small screens. */
export function AppShell({ appName, nav, children, userName, portalUrl }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:p-2">
        Skip to content
      </a>
      <header className="flex items-center justify-between gap-4 border-b border-gray-300 px-4 py-3">
        <div className="flex items-center gap-3">
          {portalUrl ? (
            <a href={portalUrl} className="text-sm underline">
              Bishnoi One
            </a>
          ) : null}
          {portalUrl ? <span aria-hidden="true">/</span> : null}
          <span className="font-semibold">{appName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm" aria-label="User profile (placeholder)">
          <span className="flex size-8 items-center justify-center rounded-full border border-gray-400" aria-hidden="true">
            {userName ? userName.charAt(0) : "?"}
          </span>
          <span className="hidden sm:inline">{userName ?? "Signed out"}</span>
        </div>
      </header>
      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="border-b border-gray-300 md:w-56 md:shrink-0 md:border-r md:border-b-0">
          <NavLinks items={nav} />
        </aside>
        <main id="main" className="min-w-0 flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
