import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getSession } from "@bishnoi/auth";
import { getApp, getAppUrl } from "@bishnoi/contracts";
import { APP_ID } from "@/app.config";
import { AdminShell } from "@/components/AdminShell";
import { ADMIN_TITLE } from "@/navigation/config";
import "./globals.css";

const app = getApp(APP_ID);

export const metadata: Metadata = {
  title: { default: ADMIN_TITLE, template: `%s · ${ADMIN_TITLE}` },
  description: app.description,
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getSession();

  return (
    <html lang="en">
      <body>
        <AdminShell user={{ name: session.user.name, email: session.user.email, mock: session.mock }} portalUrl={getAppUrl("one")}>
          {children}
        </AdminShell>
      </body>
    </html>
  );
}
