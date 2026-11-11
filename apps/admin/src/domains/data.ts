/**
 * Domains data. MOCK DATA: neutral example domains until the Admin backend exists.
 * Replace the function body with a real query later; never put real domains here.
 */

export interface Domain {
  name: string;
  primary: boolean;
  status: "Verified" | "Yet to point MX records";
  registrar: string;
  expiryDate: string;
}

export async function getDomains(): Promise<Domain[]> {
  return [
    { name: "example.com", primary: true, status: "Yet to point MX records", registrar: "External", expiryDate: "—" },
    { name: "example.net", primary: false, status: "Yet to point MX records", registrar: "External", expiryDate: "—" },
    { name: "example.org", primary: false, status: "Verified", registrar: "External", expiryDate: "—" },
  ];
}
