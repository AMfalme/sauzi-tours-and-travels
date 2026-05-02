"use client";

import Image from "next/image";
import Link from "next/link";
import { dashboardTheme } from "@/app/components/dashboard/theme";

export type DashboardNavKey =
  | "overview"
  | "tour-requests"
  | "bookings"
  | "users"
  | "packages"
  | "view-packages";

export type DashboardNavItem = {
  key: DashboardNavKey;
  label: string;
  icon: string;
};

type DashboardSidebarProps = {
  items: DashboardNavItem[];
  activeKey: DashboardNavKey;
  onSelect: (key: DashboardNavKey) => void;
  email: string;
  loggingOut: boolean;
  onLogout: () => void;
  onCloseMobile?: () => void;
};

export default function DashboardSidebar({
  items,
  activeKey,
  onSelect,
  email,
  loggingOut,
  onLogout,
  onCloseMobile,
}: DashboardSidebarProps) {
  return (
    <aside
      className="h-[100dvh] min-h-screen w-full lg:w-72 border-r flex flex-col overflow-y-auto"
      style={{ backgroundColor: dashboardTheme.sidebarBg, borderColor: "#1d4a3b" }}
    >
      <div className="px-5 py-5 border-b" style={{ borderColor: "#1d4a3b" }}>
        <div className="mb-3 flex items-center justify-end lg:hidden">
          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-md px-2 py-1 text-xs font-semibold text-white/90 hover:bg-emerald-900/60"
            aria-label="Close sidebar"
          >
            Close
          </button>
        </div>

        <Link href="/" className="inline-flex items-center gap-3">
          <Image src="/images/sauzi-logo-img.png" alt="Sauzi Tours" width={96} height={40} priority />
          <div>
            <p className="text-[11px] uppercase tracking-widest text-emerald-200/80">Sauzi Tours</p>
            <h1 className="text-base font-semibold text-white">Control Panel</h1>
          </div>
        </Link>

        <p className="mt-3 text-xs rounded-md px-2 py-1 bg-emerald-950/40 text-emerald-100 truncate">
          {email}
        </p>
      </div>

      <nav className="p-3 space-y-1 flex-1">
        {items.map((item) => {
          const active = activeKey === item.key;

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                onSelect(item.key);
                onCloseMobile?.();
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm transition"
              style={{
                backgroundColor: active ? dashboardTheme.primary : "transparent",
                color: "#ffffff",
              }}
            >
              <span className="inline-block w-6">{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t space-y-2" style={{ borderColor: "#1d4a3b" }}>
        <Link
          href="/"
          className="block w-full rounded-lg px-3 py-2 text-sm font-medium text-white"
          style={{ backgroundColor: dashboardTheme.primary }}
        >
          Back to Homepage
        </Link>

        <button
          type="button"
          onClick={onLogout}
          disabled={loggingOut}
          className="w-full rounded-lg px-3 py-2 text-sm font-medium text-white disabled:opacity-70"
          style={{ backgroundColor: dashboardTheme.secondary }}
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </aside>
  );
}
