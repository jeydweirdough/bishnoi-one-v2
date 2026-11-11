import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getSession } from "@bishnoi/auth";
import { getApp, getAppUrl } from "@bishnoi/contracts";
import { AppShell } from "@bishnoi/ui";
import { APP_ID, nav } from "@/app.config";
import "./globals.css";

const app = getApp(APP_ID);

export const metadata: Metadata = {
  title: { default: app.name, template: `%s · ${app.name}` },
  description: app.description,
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getSession();

  return (
    <html lang="en">
      <body>
        <AppShell appName={app.name} nav={nav} userName={session.user.name} portalUrl={getAppUrl("one")}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
