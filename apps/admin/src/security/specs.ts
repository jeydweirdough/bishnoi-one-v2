/**
 * Declarative descriptions of the Security & Compliance pages, rendered by SecurityPage.
 * Keys are the page path under /security-and-compliance (must exist in src/navigation/config.ts).
 * Values mirror the reference screens; controls are read-only until the backend exists.
 */
import type { SampleRowsKey } from "./data";

export type Control =
  | { type: "toggle"; label: string; on: boolean }
  | { type: "radio"; legend: string; options: string[]; selected: string }
  | { type: "checkboxes"; items: { label: string; checked: boolean }[] }
  | { type: "select"; label: string; value: string }
  | { type: "number"; label: string; value: number }
  | { type: "text"; label: string; placeholder?: string; multiline?: boolean };

export interface Section {
  heading?: string;
  description?: string;
  controls: Control[];
}

interface Common {
  heading?: string;
  description?: string;
  /** Tabs from the reference; the first is shown, the others are listed but not built yet. */
  tabs?: string[];
  /** A toggle shown next to the page heading (e.g. "Suspicious Login Alerts"). */
  headingToggle?: boolean;
}

export type PageSpec =
  | (Common & { kind: "settings"; sections: Section[]; actions?: string[] })
  | (Common & { kind: "list"; toolbar: string[]; select?: { label: string; value: string }; columns: string[]; rows?: SampleRowsKey; empty: string })
  | { kind: "empty"; title: string; description: string; action: string };

const ACTIONS_4 = ["None", "Temporary reject", "Permanent reject", "Move to quarantine"];

export const SECURITY_PAGES: Record<string, PageSpec> = {
  // ---- Security ----
  "security/tfa": {
    kind: "settings",
    heading: "Two-factor Authentication",
    headingToggle: false,
    description: "Two-factor authentication secures organization accounts with a combination of a password and a mobile device. You can enable or disable TFA for your organization.",
    sections: [],
  },
  "security/allowed-ip-addresses": {
    kind: "list",
    description: "IP restrictions let administrators control access to Mail from specific IP ranges, based on the user's role.",
    tabs: ["All", "Super Administrator", "Admin", "User"],
    toolbar: ["+ Add"],
    columns: ["From IP Address", "To IP Address"],
    empty: "No allowed IP addresses have been added for organization users",
  },
  "security/password-policy": {
    kind: "settings",
    description: "A password policy is a set of rules that increases account security and encourages users to set strong passwords.",
    sections: [
      {
        controls: [
          { type: "number", label: "Minimum password length", value: 8 },
          { type: "number", label: "Minimum no. of passwords in history", value: 1 },
          { type: "number", label: "Minimum no. of special characters", value: 1 },
          { type: "number", label: "Minimum no. of numeric characters", value: 1 },
          { type: "checkboxes", items: [{ label: "Set password expiry period", checked: false }] },
        ],
      },
    ],
    actions: ["Update", "Reset", "Reset to default"],
  },
  "security/saml-authentication": {
    kind: "settings",
    description: "SAML is an XML-based framework for exchanging user authentication, entitlement and attribute information. To configure it, you need the SAML login URL and the certificate file from your identity provider (IdP).",
    sections: [
      {
        controls: [
          { type: "text", label: "Login URL *" },
          { type: "text", label: "Logout URL *" },
          { type: "text", label: "Change password URL *" },
          { type: "text", label: "Public Key *", multiline: true },
          { type: "select", label: "Algorithm", value: "RSA" },
        ],
      },
    ],
    actions: ["Save"],
  },
  "security/suspicious-login": {
    kind: "list",
    heading: "Suspicious Login Alerts",
    headingToggle: false,
    description: "You can choose to email users an alert about unusual sign-ins to their accounts.",
    toolbar: ["Filter"],
    columns: ["Username/Email Address", "Login Time", "Location", "Login Source", "IP Address"],
    rows: "suspiciousLogins",
    empty: "No suspicious logins",
  },
  "security/s-mime": {
    kind: "settings",
    headingToggle: false,
    description: "Secure/Multipurpose Internet Mail Extensions (S/MIME) encrypts the content of your organization's emails using keys, so that only authorized people can read them. You can enable or disable S/MIME for your organization.",
    sections: [],
  },
  "security/idle-session-timeout": {
    kind: "settings",
    headingToggle: false,
    description: "With an idle session timeout, administrators must sign in to the Admin Console again after it has been idle for the specified period.",
    sections: [],
  },

  // ---- Roles and Privileges (Roles is a custom page) ----
  "roles-and-privileges/privileges": {
    kind: "settings",
    sections: [
      {
        heading: "Organization Group Privileges",
        controls: [
          { type: "toggle", label: "Allow organization group creation", on: true },
          { type: "radio", legend: "Who can create organization groups?", options: ["Super Administrator only", "Administrator only", "All users"], selected: "All users" },
        ],
      },
      {
        heading: "Personal Group Privileges",
        controls: [
          { type: "toggle", label: "Allow personal group creation", on: true },
          { type: "toggle", label: "Allow personal groups with external users", on: true },
          { type: "radio", legend: "Who can create personal groups?", options: ["Super Administrator only", "Administrator only", "All users"], selected: "All users" },
        ],
      },
    ],
  },

  // ---- Spam Control ----
  "spam-control/spam-processing": {
    kind: "settings",
    sections: [
      {
        heading: "Spam Process Type",
        description: "Spam filters analyze emails at various levels. Choose the level of spam filtering for the entire organization.",
        controls: [
          { type: "radio", legend: "Spam process type", options: ["Complete", "Content only", "Sender only", "Sender and header only", "Configured spam settings", "Off"], selected: "Complete" },
          { type: "toggle", label: "Enable system-level spam rejection", on: true },
        ],
      },
      {
        heading: "Sender-based Alerts",
        description: "Alert users based on the sender of the email. Choose the kind of sender to show this alert for.",
        controls: [{ type: "radio", legend: "Show alerts for", options: ["Disable", "Unauthenticated emails", "External emails", "Non-contact emails"], selected: "Unauthenticated emails" }],
      },
      {
        heading: "Post-delivery Spam Checks",
        description: "Background spam checks run even after emails are delivered, and can move emails to spam. Choose which emails these checks apply to.",
        controls: [{ type: "radio", legend: "Post-delivery checks", options: ["Disable", "Move unread emails to spam", "Move all emails to spam"], selected: "Move all emails to spam" }],
      },
      {
        heading: "Organization Rules",
        description: "Organization rules filter emails at the authentication level, based on content, or route them to other email servers.",
        controls: [{ type: "toggle", label: "Organization rules", on: false }],
      },
    ],
  },
  "spam-control/allowed-list": {
    kind: "list",
    heading: "Allowed Emails",
    tabs: ["Emails", "Domains", "IP Addresses"],
    description: "Allow emails from certain addresses to be delivered to users' mailboxes. Unauthenticated emails (SPF/DKIM failure) still follow the spam verification rules.",
    toolbar: ["+ Add", "Import"],
    columns: ["Email Address"],
    empty: "No data available",
  },
  "spam-control/blocked-list": {
    kind: "list",
    heading: "Blocked Emails",
    tabs: ["Emails", "Domains", "IP Addresses", "TLDs", "Recipient Emails"],
    description: "Block emails from certain email addresses. The administrator decides the action taken on such emails.",
    toolbar: ["+ Add", "Import", "Filter"],
    columns: ["Email Address", "Delivery Action"],
    empty: "No data available",
  },
  "spam-control/blocked-patterns": {
    kind: "list",
    heading: "Blocked Sender Patterns",
    tabs: ["Sender Patterns", "Subject Patterns", "Content Patterns"],
    description: "Add text or regular-expression patterns so that emails whose sender address matches them are marked as spam.",
    select: { label: "Email Delivery Action", value: "None" },
    toolbar: ["+ Add", "Filter"],
    columns: ["Pattern", "Type", "Expiry Time"],
    empty: "No patterns available",
  },
  "spam-control/trusted-list": {
    kind: "list",
    heading: "Trusted Email Addresses",
    tabs: ["Emails", "Domains"],
    description: "Emails from trusted addresses are delivered without any spam, SPF, DKIM or block-list checks. Add addresses with great care: a trusted address can be abused for spam or phishing.",
    toolbar: ["+ Add", "Import"],
    columns: ["Email Address"],
    empty: "No data available",
  },
  "spam-control/spam-verification": {
    kind: "settings",
    sections: [
      {
        heading: "SPF Verification",
        description: "SPF is a text record on the domain that lists the servers allowed to send emails for it. Choose the action taken on emails that fail it.",
        controls: [
          { type: "radio", legend: "Action on SPF failure", options: ACTIONS_4, selected: "None" },
          { type: "radio", legend: "Action on SPF Soft failure", options: ACTIONS_4, selected: "None" },
        ],
      },
      {
        heading: "DKIM Verification",
        description: "DKIM uses encryption to validate that an email comes from systems authorized by the domain's administrator. Choose the action taken on emails that fail it.",
        controls: [{ type: "radio", legend: "Action on DKIM failure", options: ACTIONS_4, selected: "None" }],
      },
      {
        heading: "DMARC Verification",
        description: "DMARC builds on SPF and DKIM. When authentication fails and the sender's policy is quarantine, choose how such emails are handled.",
        controls: [{ type: "radio", legend: "Action on DMARC failure", options: ["None", "Move to spam", "Move to quarantine"], selected: "Move to quarantine" }],
      },
      {
        heading: "DNSBL Verification",
        description: "DNSBL is a consolidated block list. Emails whose sending domain, address or IP is on it are detected as spam. Choose the action taken on them.",
        controls: [{ type: "radio", legend: "Action on DNSBL failure", options: ["Move to spam", "Temporary reject", "Permanent reject", "Move to quarantine"], selected: "Permanent reject" }],
      },
    ],
  },
  "spam-control/internationalized-spam": {
    kind: "settings",
    heading: "Language-based Spam Processing",
    tabs: ["Language", "Country"],
    description: "Allow or move emails to spam based on their language. Allowing languages moves all other emails to spam; blocking languages moves only those emails to spam.",
    sections: [{ controls: [{ type: "select", label: "Spam processing action", value: "None" }] }],
  },

  // ---- Phishing & Malware ----
  "phishing-and-malware/cousin-domains": {
    kind: "settings",
    heading: "Cousin Domain Verification",
    headingToggle: false,
    description: "Cousin (look-alike) domains are spoofed domains whose names resemble valid domains, but are not the actual domains.",
    sections: [],
  },
  "phishing-and-malware/display-name-spoofing": {
    kind: "list",
    description: "Associate a display name with one or more email addresses. Emails that use this display name from other addresses are treated as spoofed.",
    select: { label: "Email Delivery Action", value: "None" },
    toolbar: ["+ Add"],
    columns: ["Display Name", "Email Addresses"],
    empty: "No names added",
  },
  "phishing-and-malware/malware-processing": {
    kind: "settings",
    sections: [
      {
        heading: "Content-based Spam Settings",
        description: "Move emails containing certain types of content to the spam folder.",
        controls: [
          {
            type: "checkboxes",
            items: [
              { label: "Web Bugs", checked: false },
              { label: "Bulk emails", checked: false },
              { label: "JavaScript", checked: false },
              { label: "Macros", checked: false },
            ],
          },
        ],
      },
      {
        heading: "HTML Tags-based Spam Check",
        description: "Move emails containing certain HTML tags to the spam folder.",
        controls: [
          {
            type: "checkboxes",
            items: [
              { label: "Frame", checked: false },
              { label: "Object", checked: false },
              { label: "Embed", checked: false },
              { label: "Form", checked: false },
            ],
          },
        ],
      },
    ],
  },

  // ---- Quarantine ----
  "quarantine/incoming": {
    kind: "list",
    heading: "Quarantined Emails",
    tabs: ["Quarantined Emails", "My Quarantined Emails", "Delivered Emails", "Denied Emails", "Exports"],
    description: "Incoming emails quarantined by organization spam settings. They stay here for 60 days from receipt and are cleaned up if no action is taken. Preview them, then deliver or deny.",
    toolbar: ["Deliver", "Deny", "Export", "Refresh", "Filter"],
    columns: ["Sender", "Recipient", "Subject", "Reason", "Date"],
    rows: "quarantineIncoming",
    empty: "No quarantine messages are available",
  },
  "quarantine/outgoing": {
    kind: "list",
    heading: "Quarantined Emails",
    tabs: ["Quarantined Emails", "Delivered Emails", "Denied Emails", "Exports"],
    description: "Outgoing emails quarantined by organization mail transport rules. They stay here for 60 days from receipt and are cleaned up if no action is taken. Preview them, then deliver or deny.",
    toolbar: ["Refresh"],
    columns: ["Sender", "Recipient", "Subject", "Reason", "Date"],
    empty: "No quarantine messages are available",
  },
  "quarantine/settings": {
    kind: "settings",
    heading: "Email Preview Type",
    tabs: ["General", "Notifications", "Self Moderators"],
    description: "Choose the format for previewing quarantined emails. This applies to all users in your organization.",
    sections: [{ controls: [{ type: "radio", legend: "Preview format", options: ["Original", "Rich Text", "Plain Text"], selected: "Original" }] }],
  },

  // ---- Single pages ----
  "data-subject-requests": {
    kind: "empty",
    title: "Data Subject Requests (DSR)",
    description: "For legal or compliance purposes, you can export the necessary user data based on Data Subject Requests, to help clarify issues that have been raised.",
    action: "Create a new DSR",
  },
  "blocked-accounts/blocked-users": {
    kind: "list",
    heading: "Permanently Blocked",
    tabs: ["Permanently Blocked", "Temporarily Blocked"],
    description: "Users blocked because of applied restrictions. You can unblock these users or block additional users.",
    toolbar: ["Block new users", "Refresh"],
    columns: ["Email address", "Category", "Blocked on", "Reason"],
    rows: "blockedUsers",
    empty: "No accounts blocked",
  },
  "blocked-accounts/blocked-groups": {
    kind: "list",
    heading: "Permanently Blocked",
    tabs: ["Permanently Blocked", "Temporarily Blocked"],
    description: "Groups blocked because of applied restrictions. You can unblock these groups or block additional groups.",
    toolbar: ["Block new groups", "Refresh"],
    columns: ["Email address", "Category", "Blocked on", "Reason"],
    empty: "No accounts blocked",
  },
  "deleted-email-recovery": {
    kind: "empty",
    title: "Email Recovery",
    description: "Recover emails that users have previously deleted from their email accounts.",
    action: "Add Recovery",
  },
  "email-recall": {
    kind: "settings",
    description: "Administrators can recall emails sent by organization users within 24 hours of sending. Emails forwarded by recipients, or sent outside the organization or to third-party email services, cannot be recalled.",
    sections: [
      {
        controls: [
          { type: "select", label: "Search by", value: "Sender" },
          { type: "text", label: "Sender's email address", placeholder: "Enter sender's email address" },
        ],
      },
    ],
    actions: ["Search"],
  },
  "email-journaling": {
    kind: "empty",
    title: "Email Journaling",
    description: "Email journaling automatically captures and retains a complete, unaltered copy of every email sent and received, mainly for legal and compliance purposes.",
    action: "Create Email Journal",
  },
};
