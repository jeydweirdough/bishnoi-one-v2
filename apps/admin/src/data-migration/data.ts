/**
 * Data Migration data. MOCK DATA: neutral sample migrations until the Admin backend exists.
 * Replace the function bodies with real queries later; never put real people's names here.
 */

export interface Migration {
  name: string;
  total: number;
  completed: number;
  inProgress: number;
  failed: number;
  status: "Completed" | "In progress" | "Yet to start";
}

export interface SavedServer {
  name: string;
  protocol: string;
}

export interface SavedSetting {
  name: string;
  assignedServer: string;
  protocol: string;
}

export interface MigrationSource {
  name: string;
  configured: boolean;
}

export async function getMigrations(): Promise<Migration[]> {
  return [
    { name: "Sample migration 1", total: 1, completed: 1, inProgress: 0, failed: 0, status: "Completed" },
    { name: "Sample migration 2", total: 1, completed: 0, inProgress: 0, failed: 1, status: "Completed" },
    { name: "Sample migration 3", total: 0, completed: 0, inProgress: 0, failed: 0, status: "Yet to start" },
  ];
}

export async function getSavedServers(): Promise<SavedServer[]> {
  return [
    { name: "Sample migration 1 - Server details", protocol: "Google Workspace" },
    { name: "Sample migration 2 - Server details", protocol: "Google Workspace" },
  ];
}

export async function getSavedSettings(): Promise<SavedSetting[]> {
  return [
    { name: "Sample migration 1 - Settings", assignedServer: "Sample migration 1 - Server details", protocol: "Google Workspace" },
    { name: "Sample migration 2 - Settings", assignedServer: "Sample migration 2 - Server details", protocol: "Google Workspace" },
  ];
}

export async function getMigrationSources(): Promise<MigrationSource[]> {
  return [
    { name: "Google Workspace", configured: true },
    { name: "Microsoft 365", configured: false },
    { name: "Amazon WorkMail", configured: false },
  ];
}
