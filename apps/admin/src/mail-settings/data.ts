/**
 * Mail Settings data.
 *
 * MOCK DATA: there is no Admin backend yet. These functions return neutral placeholder values
 * (example.com addresses and reserved documentation IP ranges). Replace their bodies with real
 * queries later; pages only depend on the exported types. Never put real mail logs, addresses or
 * server IPs here.
 */

export interface EmailPolicy {
  name: string;
  isDefault: boolean;
  associatedUsers: number;
  associatedGroups: number;
}

export type RestrictionKind = "email" | "account" | "access" | "forward";

export interface Restriction {
  name: string;
  associatedPolicies: string[];
}

export interface RoutingConfiguration {
  sourceDomain: string;
  destinationAddress: string;
  deliveryType: string;
  enabled: boolean;
}

export interface RetryEmail {
  sender: string;
  recipient: string;
  lastTried: string;
  pendingRetries: number;
  failureReason: string;
}

export interface ServerSettings {
  imap: { server: string; port: string; ssl: string; username: string };
  pop: { server: string; port: string; ssl: string; username: string };
  smtp: { server: string; port: string; authentication: string };
  mx: { host: string; priority: number; value: string }[];
  spf: { host: string; value: string };
}

export async function getEmailPolicies(): Promise<EmailPolicy[]> {
  return [{ name: "Default Policy", isDefault: true, associatedUsers: 12, associatedGroups: 0 }];
}

export async function getRestrictions(_kind: RestrictionKind): Promise<Restriction[]> {
  return [];
}

export async function getRoutingConfigurations(): Promise<RoutingConfiguration[]> {
  return [{ sourceDomain: "example.com", destinationAddress: "mx.example.net", deliveryType: "Split Delivery", enabled: true }];
}

/** Reserved documentation ranges (RFC 5737 / RFC 3849), never real gateways. */
export async function getInboundGatewayIps(): Promise<string[]> {
  return ["192.0.2.0 / 24", "198.51.100.0 / 24", "203.0.113.0 / 24", "2001:db8::0 / 126"];
}

export async function getRetryQueue(): Promise<RetryEmail[]> {
  return [
    { sender: "sales@example.com", recipient: "someone@example.org", lastTried: "Today 09:26 am", pendingRetries: 18, failureReason: "4.4.3 Domain not resolved" },
    { sender: "support@example.com", recipient: "info@example.net", lastTried: "Today 09:16 am", pendingRetries: 18, failureReason: "4.4.1 Host not reachable" },
    { sender: "team@example.com", recipient: "contact@example.org", lastTried: "Today 09:06 am", pendingRetries: 2, failureReason: "4.2.2 The recipient's inbox is full" },
  ];
}

export async function getServerSettings(): Promise<ServerSettings> {
  return {
    imap: { server: "imap.example.com", port: "993", ssl: "Yes", username: "you@yourdomain.com" },
    pop: { server: "pop.example.com", port: "995", ssl: "Yes", username: "you@yourdomain.com" },
    smtp: { server: "smtp.example.com", port: "465 with SSL or 587 with TLS", authentication: "Yes" },
    mx: [
      { host: "@ / Blank / Domain name", priority: 10, value: "mx.example.com" },
      { host: "@ / Blank / Domain name", priority: 20, value: "mx2.example.com" },
      { host: "@ / Blank / Domain name", priority: 50, value: "mx3.example.com" },
    ],
    spf: { host: "@ / Blank / Domain name", value: "v=spf1 include:spf.example.com ~all" },
  };
}
