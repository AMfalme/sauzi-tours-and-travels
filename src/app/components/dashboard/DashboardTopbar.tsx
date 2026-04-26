"use client";

import { dashboardTheme } from "@/app/components/dashboard/theme";

type DashboardTopbarProps = {
  status: string;
  email: string;
  loggingOut: boolean;
  onLogout: () => void;
};

export default function DashboardTopbar({
  status,
  email,
  loggingOut,
  onLogout,
}: DashboardTopbarProps) {
  return (
    <header className="bg-white border-b px-4 md:px-8 py-4 flex items-center justify-between gap-3" style={{ borderColor: dashboardTheme.border }}>
      <div>
        <h2 className="text-xl font-semibold" style={{ color: dashboardTheme.textDark }}>Dashboard</h2>
        <p className="text-sm" style={{ color: dashboardTheme.textMuted }}>{status}</p>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden md:inline rounded-full px-3 py-1 text-sm" style={{ backgroundColor: dashboardTheme.primarySoft, color: dashboardTheme.primary }}>
          {email}
        </span>
        <button
          type="button"
          onClick={onLogout}
          disabled={loggingOut}
          className="rounded-lg px-4 py-2 text-sm font-medium text-white disabled:opacity-70"
          style={{ backgroundColor: dashboardTheme.secondary }}
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </header>
  );
}
