/**
 * Security & Compliance data.
 *
 * MOCK DATA: there is no Admin backend yet. These values are neutral placeholders (example.com
 * addresses, documentation IP ranges). Replace them with real queries later; never put real
 * people's names, emails, IPs or quarantined messages here.
 */

export interface ComplianceAction {
  title: string;
  description: string;
  threat: "Spoofing" | "Data Leak" | "Malware" | "Account Breach" | "Data Exfiltration";
  done: boolean;
  /** Where the action is configured. */
  href: string;
}

const S = "/security-and-compliance";

export const COMPLIANCE_ACTIONS: ComplianceAction[] = [
  { title: "Cousin Domain Verification", description: "Detect look-alike domains used to impersonate your organization.", threat: "Spoofing", done: false, href: `${S}/phishing-and-malware/cousin-domains` },
  { title: "Display Name Verification", description: "Flag emails that misuse the display names of your users.", threat: "Spoofing", done: false, href: `${S}/phishing-and-malware/display-name-spoofing` },
  { title: "DKIM Configuration", description: "Configuring DKIM increases your domain's legitimacy so its emails do not end up in spam.", threat: "Spoofing", done: true, href: "/domains" },
  { title: "DKIM Verification", description: "Act on incoming emails that fail DKIM checks.", threat: "Spoofing", done: false, href: `${S}/spam-control/spam-verification` },
  { title: "DMARC Policy", description: "Tell receiving servers how to handle emails that fail authentication.", threat: "Spoofing", done: false, href: "/domains" },
  { title: "DMARC Verification", description: "Act on incoming emails that fail DMARC checks.", threat: "Spoofing", done: true, href: `${S}/spam-control/spam-verification` },
  { title: "DNSBL Verification", description: "Reject emails from senders on known block lists.", threat: "Spoofing", done: true, href: `${S}/spam-control/spam-verification` },
  { title: "Group Privilege Settings", description: "Limit who can create groups to reduce the risk of data leaks.", threat: "Data Leak", done: false, href: `${S}/roles-and-privileges/privileges` },
  { title: "MX Record Configuration", description: "Point MX records correctly so incoming email is filtered for malware.", threat: "Malware", done: true, href: "/domains" },
  { title: "No presence of own domain in Trusted Domains", description: "Your own domain should not bypass spam checks.", threat: "Spoofing", done: true, href: `${S}/spam-control/trusted-list` },
  { title: "No Trusted Senders", description: "Trusted senders skip spam checks; keep the list empty where possible.", threat: "Spoofing", done: true, href: `${S}/spam-control/trusted-list` },
  { title: "Organization-wide TFA", description: "Require two-factor authentication for every account.", threat: "Account Breach", done: false, href: `${S}/security/tfa` },
  { title: "S/MIME Configuration", description: "Encrypt email content so only intended recipients can read it.", threat: "Data Exfiltration", done: false, href: `${S}/security/s-mime` },
  { title: "SPF Record Configuration", description: "Publish an SPF record listing the servers allowed to send for your domain.", threat: "Spoofing", done: true, href: "/domains" },
  { title: "SPF Verification", description: "Act on incoming emails that fail SPF checks.", threat: "Spoofing", done: false, href: `${S}/spam-control/spam-verification` },
  { title: "Suspicious Login Alerts", description: "Alert users about unusual sign-ins to their accounts.", threat: "Account Breach", done: false, href: `${S}/security/suspicious-login` },
];

export const ROLES: { name: string; description: string }[] = [
  { name: "Super Administrator", description: "Full access to all features across the organization." },
  { name: "Administrator", description: "Access to almost all features, except some critical organization-level operations." },
  { name: "User Management Admin", description: "Privileges to manage organization users." },
  { name: "Group Management Admin", description: "Privileges to manage organization groups." },
  { name: "Spam Control Admin", description: "Privileges to manage anti-spam, anti-phishing and quarantine settings." },
  { name: "Helpdesk Admin", description: "Privileges to manage audit logs, mail logs, blocked accounts, retry emails and email recovery." },
  { name: "Quarantine Admin", description: "Privileges to manage quarantined emails." },
  { name: "Marketplace Developers", description: "Privileges to build applications, slash commands and client scripts." },
  { name: "Client Script Admin", description: "Privileges to perform actions on mandatory client scripts." },
];

export const SUPER_ADMIN = { name: "Sample Admin", email: "admin@example.com" };

/** Sample rows for list pages, keyed by the spec's `rows` name. */
export const SAMPLE_ROWS = {
  suspiciousLogins: [
    ["Jordan Lee · jordan.lee@example.com", "10/11/2026 07:12 AM", "Sample City, Sample Country", "WEB", "203.0.113.42"],
    ["Sam Cruz · sam.cruz@example.com", "08/11/2026 11:40 PM", "Sample Town, Sample Country", "WEB", "198.51.100.7"],
  ],
  quarantineIncoming: [
    ["advisory@example.org", "finance@example.com", "Payment advisory", "DMARC Fail", "10/11/2026 07:37 PM"],
    ["news@example.net", "sales@example.com", "Branch schedule update", "DMARC Fail", "10/11/2026 11:01 AM"],
    ["promo@example.org", "support@example.com", "Special offer", "DMARC Fail", "09/11/2026 08:26 PM"],
  ],
  blockedUsers: [
    ["former.staff@example.com", "Mail Incoming block", "2 weeks ago", "Organization administrator has blocked mailbox access"],
    ["former.staff@example.com", "Mail Outgoing block", "2 weeks ago", "Organization administrator has blocked mailbox access"],
  ],
} as const;

export type SampleRowsKey = keyof typeof SAMPLE_ROWS;
