import type { Metadata } from "next";
import { getApp } from "@bishnoi/contracts";
import { Badge, ButtonLink, Card, CardGrid, MockDataNotice, PageHeader, StatGrid } from "@bishnoi/ui";
import { APP_ID } from "@/app.config";
import { features } from "@/features";

const app = getApp(APP_ID);

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <>
      <PageHeader title={`${app.name} dashboard`} description={app.description} />
      <MockDataNotice />
      <StatGrid items={features.map((feature) => ({ label: `${feature.name} (mock records)`, value: feature.mockRows.length }))} />
      <CardGrid>
        {features.map((feature) => (
          <Card key={feature.id} title={feature.name} footer={<ButtonLink href={`/${feature.id}`}>Open {feature.name}</ButtonLink>}>
            <p>{feature.description}</p>
            <p className="mt-2">
              <Badge>{feature.status}</Badge>
            </p>
          </Card>
        ))}
      </CardGrid>
    </>
  );
}
