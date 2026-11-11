/**
 * Admin Panel navigation — the single source of truth for the primary sidebar, secondary sidebars,
 * routes, page titles and breadcrumbs. Structure follows the reference admin-console screenshots.
 *
 * URL scheme:
 *   section without items      /<section>                 (dashboard is "/")
 *   section leaf               /<section>/<item>
 *   leaf inside a group        /<section>/<group>/<item>
 *   per-user pages             /users/<userId>/<item> or /users/<userId>/<group>/<item>
 * Section and group URLs without a leaf redirect to their first leaf.
 */

export type IconName =
  | "dashboard"
  | "organization"
  | "mail-settings"
  | "users"
  | "domains"
  | "groups"
  | "data-migration"
  | "security"
  | "transactional-emails"
  | "subscription"
  | "other-app-settings"
  | "zia"
  | "reports";

export interface NavLeaf {
  slug: string;
  label: string;
  /** Opens an external tool in the reference. Here it routes to a Coming Soon page. */
  external?: boolean;
}

export interface NavGroup {
  slug: string;
  label: string;
  children: NavLeaf[];
}

export type NavItem = NavLeaf | NavGroup;

export interface NavSection {
  /** URL segment; "" for the dashboard at "/". */
  slug: string;
  label: string;
  /** Top bar title when it differs from the label. */
  title?: string;
  icon: IconName;
  /** Secondary sidebar. Omitted = full-width page without a secondary sidebar. */
  items?: NavItem[];
}

export function isGroup(item: NavItem): item is NavGroup {
  return "children" in item;
}

const leaf = (slug: string, label: string, external?: boolean): NavLeaf => (external ? { slug, label, external } : { slug, label });
const group = (slug: string, label: string, children: NavLeaf[]): NavGroup => ({ slug, label, children });

export const ADMIN_TITLE = "Admin Panel";

export const SECTIONS: NavSection[] = [
  { slug: "", label: "Dashboard", icon: "dashboard" },
  {
    slug: "organization",
    label: "Organization",
    icon: "organization",
    items: [
      leaf("profile", "Profile"),
      leaf("welcome-email-template", "Welcome Email Template"),
      leaf("signature-template", "Signature Template"),
      leaf("locations", "Locations"),
      leaf("display-name-format", "Display Name Format"),
      leaf("email-address-format", "Email Address Format"),
      leaf("white-labeling", "White Labeling"),
      leaf("bulk-activities", "Bulk Activities"),
      leaf("announcements", "Announcements"),
      leaf("delete-organization", "Delete Organization"),
    ],
  },
  {
    slug: "mail-settings",
    label: "Mail Settings",
    icon: "mail-settings",
    items: [
      group("email-policy", "Email Policy", [
        leaf("policies", "Policies"),
        leaf("email-restrictions", "Email Restrictions"),
        leaf("account-restrictions", "Account Restrictions"),
        leaf("access-restrictions", "Access Restrictions"),
        leaf("forward-restrictions", "Forward Restrictions"),
      ]),
      group("rules", "Rules", [leaf("incoming-rules", "Incoming Rules"), leaf("outgoing-rules", "Outgoing Rules")]),
      group("smart-alerts", "Smart Alerts", [leaf("incoming-alerts", "Incoming Alerts"), leaf("outgoing-alerts", "Outgoing Alerts")]),
      group("email-routing", "Email Routing", [
        leaf("configuration", "Configuration"),
        leaf("inbound-gateway", "Inbound Gateway"),
        leaf("outbound-gateway", "Outbound Gateway"),
      ]),
      leaf("export-mail-account", "Export Mail Account"),
      leaf("retry-emails", "Retry Emails"),
      group("tools-and-configurations", "Tools & Configurations", [leaf("configurations", "Configurations"), leaf("toolkit", "Toolkit", true)]),
    ],
  },
  { slug: "users", label: "Users", icon: "users" },
  { slug: "domains", label: "Domains", icon: "domains" },
  { slug: "groups", label: "Groups", title: "Groups - Distribution List", icon: "groups" },
  {
    slug: "data-migration",
    label: "Data Migration",
    icon: "data-migration",
    items: [
      leaf("migrations", "Migrations"),
      leaf("saved-server-details", "Saved Server Details"),
      leaf("saved-settings", "Saved Settings"),
      leaf("applications", "Applications"),
    ],
  },
  {
    slug: "security-and-compliance",
    label: "Security & Compliance",
    icon: "security",
    items: [
      leaf("dashboard", "Dashboard"),
      group("security", "Security", [
        leaf("tfa", "TFA"),
        leaf("allowed-ip-addresses", "Allowed IP Addresses"),
        leaf("password-policy", "Password Policy"),
        leaf("saml-authentication", "SAML Authentication"),
        leaf("suspicious-login", "Suspicious Login"),
        leaf("s-mime", "S/MIME"),
        leaf("idle-session-timeout", "Idle Session Timeout"),
      ]),
      group("roles-and-privileges", "Roles and Privileges", [leaf("roles", "Roles"), leaf("privileges", "Privileges")]),
      group("spam-control", "Spam Control", [
        leaf("spam-processing", "Spam Processing"),
        leaf("allowed-list", "Allowed List"),
        leaf("blocked-list", "Blocked List"),
        leaf("blocked-patterns", "Blocked Patterns"),
        leaf("trusted-list", "Trusted List"),
        leaf("spam-verification", "Spam Verification"),
        leaf("internationalized-spam", "Internationalized Spam"),
      ]),
      group("phishing-and-malware", "Phishing & Malware", [
        leaf("cousin-domains", "Cousin Domains"),
        leaf("display-name-spoofing", "Display Name Spoofing"),
        leaf("malware-processing", "Malware Processing"),
      ]),
      group("quarantine", "Quarantine", [leaf("incoming", "Incoming"), leaf("outgoing", "Outgoing"), leaf("settings", "Settings")]),
      leaf("data-subject-requests", "Data Subject Requests"),
      group("blocked-accounts", "Blocked Accounts", [leaf("blocked-users", "Blocked Users"), leaf("blocked-groups", "Blocked Groups")]),
      leaf("deleted-email-recovery", "Deleted Email Recovery"),
      leaf("email-recall", "Email Recall"),
      leaf("email-journaling", "Email Journaling"),
    ],
  },
  { slug: "transactional-emails", label: "Transactional Emails", icon: "transactional-emails" },
  {
    slug: "subscription",
    label: "Subscription",
    icon: "subscription",
    items: [leaf("overview", "Overview"), leaf("settings", "Settings"), leaf("storage-reports", "Storage Reports", true)],
  },
  { slug: "other-app-settings", label: "Other App Settings", icon: "other-app-settings" },
  { slug: "zia-for-mail", label: "Zia for Mail", icon: "zia" },
  { slug: "reports", label: "Reports", icon: "reports" },
];

/** Secondary sidebar shown on /users/<userId>/... (per-user settings). */
export const USER_DETAIL_ITEMS: NavItem[] = [
  leaf("personal-information", "Personal Information"),
  leaf("groups", "Groups"),
  group("mailbox-settings", "Mailbox Settings", [
    leaf("email-alias", "Email Alias"),
    leaf("email-forwarding", "Email Forwarding"),
    leaf("email-policy", "Email Policy"),
    leaf("delegated-to", "Delegated to"),
    leaf("mailbox-actions", "Mailbox Actions"),
    leaf("out-of-office", "Out of Office"),
    leaf("signature", "Signature"),
  ]),
  group("incoming-email-settings", "Incoming Email Settings", [
    leaf("email-addresses", "Email Addresses"),
    leaf("domains", "Domains"),
    leaf("rules", "Rules"),
  ]),
  leaf("outgoing-email-settings", "Outgoing Email Settings"),
  leaf("storage", "Storage"),
  group("security", "Security", [
    leaf("allowed-ip-addresses", "Allowed IP Addresses"),
    leaf("change-password", "Change password"),
    leaf("login-email-address", "Login Email Address"),
    leaf("s-mime", "S/MIME"),
    leaf("tfa", "TFA"),
  ]),
  group("account-activity", "Account Activity", [
    leaf("login-history", "Login History"),
    leaf("session-history", "Session History"),
    leaf("recent-activity", "Recent Activity"),
  ]),
];
