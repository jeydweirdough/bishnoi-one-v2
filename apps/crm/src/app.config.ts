import type { AppId } from "@bishnoi/contracts";
import type { NavItem } from "@bishnoi/ui";
import { features } from "@/features";

export const APP_ID: AppId = "crm";

export const nav: NavItem[] = [{ href: "/", label: "Dashboard" }, ...features.map((feature) => ({ href: `/${feature.id}`, label: feature.name }))];
