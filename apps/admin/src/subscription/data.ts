/**
 * Subscription data. MOCK DATA: a neutral sample plan until billing is connected.
 * Replace the function bodies with real queries later.
 */

export interface Subscription {
  plan: string;
  active: boolean;
  expiryDate: string;
  daysLeft: number;
  duration: string;
  totalLicenses: number;
  usedLicenses: number;
  addOns: { name: string; purchased: number; available: number }[];
}

export interface SubscriptionSettings {
  autoAllocation: boolean;
  adminsCanModify: boolean;
}

export async function getSubscription(): Promise<Subscription> {
  return {
    plan: "Sample Plan - 10GB",
    active: true,
    expiryDate: "31/05/2027",
    daysLeft: 202,
    duration: "Yearly",
    totalLicenses: 15,
    usedLicenses: 12,
    addOns: [
      { name: "Extra Storage 50 GB", purchased: 2, available: 1 },
      { name: "Extra Storage 100 GB", purchased: 1, available: 0 },
    ],
  };
}

export async function getSubscriptionSettings(): Promise<SubscriptionSettings> {
  return { autoAllocation: false, adminsCanModify: true };
}
