import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getSession } from "@bishnoi/auth";
import { getApp, getAppUrl } from "@bishnoi/contracts";
import { APP_ID } from "@/app.config";
import { RecruitShell } from "@/components/RecruitShell";
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
        <RecruitShell user={{ name: session.user.name, email: session.user.email, mock: session.mock }} portalUrl={getAppUrl("one")}>
          {children}
        </RecruitShell>
      </body>
    </html>
  );
}
