/**
 * Organization section data.
 *
 * MOCK DATA: there is no Admin backend yet. These functions return neutral placeholder values.
 * Replace their bodies with real queries later; pages only depend on the exported types.
 * Never put real organization, user or email data here.
 */

export interface OrganizationProfile {
  name: string;
  createdTime: string;
  organizationId: string;
  superAdminName: string;
  superAdminEmail: string;
  plan: string;
  subscriptionDuration: string;
  expiryDate: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  timeZone: string;
}

export interface BulkActivity {
  name: string;
  operationType: string;
  scheduledBy: string;
  scheduledOn: string;
  status: string;
}

export interface Announcement {
  content: string;
  applyTo: string;
  expiryDate: string;
}

/** Domain used in format examples until real domains are connected. */
export const SAMPLE_DOMAIN = "example.com";

export async function getOrganizationProfile(): Promise<OrganizationProfile> {
  return {
    name: "Sample Organization",
    createdTime: "07/05/2024",
    organizationId: "000000000",
    superAdminName: "Sample Admin",
    superAdminEmail: "admin@example.com",
    plan: "Sample Plan",
    subscriptionDuration: "Yearly",
    expiryDate: "31/05/2027",
  };
}

export async function getLocations(): Promise<Location[]> {
  return [{ id: "default", name: "default", address: "", timeZone: "Asia/Manila" }];
}

export async function getBulkActivities(): Promise<BulkActivity[]> {
  return [];
}

export async function getAnnouncements(): Promise<Announcement[]> {
  return [];
}
