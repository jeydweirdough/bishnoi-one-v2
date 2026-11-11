/**
 * Users section data.
 *
 * MOCK DATA: there is no Admin backend yet. These functions return neutral sample users
 * (example.com addresses, documentation IP ranges). Replace their bodies with real queries later;
 * pages only depend on the exported types. Never put real people's names, emails or IPs here.
 */

export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "Super Administrator" | "Administrator" | "User";
  status: "Active" | "Inactive";
  lastSignIn: string;
  contactNumber: string;
  location: string;
  usedStorageMb: number;
  storageLimitGb: number;
  createdAt: string;
  lastPasswordReset: string;
  lastLogin: string;
  timeZone: string;
}

export interface LoginRecord {
  service: string;
  loginTime: string;
  device: string;
  ip: string;
  location: string;
  accessType: string;
  sessionType: string;
}

export interface ActivityRecord {
  kind: "Security" | "Added" | "Deleted";
  description: string;
  performedBy: string;
  eventTime: string;
  clientIp: string;
}

const user = (id: number, firstName: string, lastName: string, role: AdminUser["role"], lastSignIn: string, usedStorageMb: number): AdminUser => ({
  id: `u${1000 + id}`,
  firstName,
  lastName,
  email: `${firstName}.${lastName}`.toLowerCase().replace(/\s+/g, "") + "@example.com",
  role,
  status: "Active",
  lastSignIn,
  contactNumber: "",
  location: "",
  usedStorageMb,
  storageLimitGb: 10,
  createdAt: "07/05/2024 10:15:00 AM",
  lastPasswordReset: "02/09/2026 09:00:00 AM",
  lastLogin: "11/11/2026 08:41:12 AM",
  timeZone: "Asia/Manila",
});

const USERS: AdminUser[] = [
  user(1, "Sample", "Admin", "Super Administrator", "Today 08:41 am", 1520),
  user(2, "Alex", "Rivera", "Administrator", "Yesterday 07:03 pm", 860),
  user(3, "Jordan", "Lee", "User", "2 weeks ago", 412),
  user(4, "Sam", "Cruz", "User", "1 month ago", 91),
  user(5, "Taylor", "Santos", "User", "Last week", 2304),
  user(6, "Morgan", "Reyes", "User", "Never signed in", 0),
  user(7, "Casey", "Garcia", "User", "3 days ago", 640),
  user(8, "Jamie", "Tan", "User", "Today 07:58 am", 1180),
];

export async function getUsers(): Promise<AdminUser[]> {
  return USERS;
}

export async function getUser(id: string): Promise<AdminUser | undefined> {
  return USERS.find((candidate) => candidate.id === id);
}

export function fullName(person: Pick<AdminUser, "firstName" | "lastName">): string {
  return `${person.firstName} ${person.lastName}`;
}

export function initials(person: Pick<AdminUser, "firstName" | "lastName">): string {
  return `${person.firstName.charAt(0)}${person.lastName.charAt(0)}`.toUpperCase();
}

export async function getLoginHistory(_userId: string): Promise<LoginRecord[]> {
  return [
    { service: "Mail", loginTime: "2 weeks ago", device: "Desktop · Windows · Browser", ip: "203.0.113.10", location: "Sample City", accessType: "Web browser", sessionType: "Inactive" },
    { service: "Mail", loginTime: "1 month ago", device: "Desktop · Windows · Browser", ip: "203.0.113.10", location: "Sample City", accessType: "Web browser", sessionType: "Inactive" },
    { service: "Accounts", loginTime: "2 months ago", device: "Mobile · Android · App", ip: "198.51.100.24", location: "Sample Town", accessType: "Mobile app", sessionType: "Inactive" },
  ];
}

export async function getRecentActivity(_userId: string): Promise<ActivityRecord[]> {
  return [
    { kind: "Security", description: "Two-factor authentication (TFA) was disabled for this user.", performedBy: "admin@example.com", eventTime: "10/11/2026 16:20", clientIp: "203.0.113.5" },
    { kind: "Added", description: "This user was added to the organization.", performedBy: "admin@example.com", eventTime: "07/05/2024 10:15", clientIp: "203.0.113.5" },
  ];
}
