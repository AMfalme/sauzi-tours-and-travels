"use client";

import { dashboardTheme } from "@/app/components/dashboard/theme";

type StatItem = {
  label: string;
  value: string;
  color: string;
  onClick?: () => void;
};

type StatsRowProps = {
  stats: StatItem[];
};

export default function StatsRow({ stats }: StatsRowProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <article
          key={item.label}
          onClick={item.onClick}
          role={item.onClick ? "button" : undefined}
          tabIndex={item.onClick ? 0 : -1}
          onKeyDown={(event) => {
            if (!item.onClick) return;
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              item.onClick();
            }
          }}
          className={`rounded-xl border bg-white p-4 shadow-sm ${item.onClick ? "cursor-pointer hover:shadow-md transition" : ""}`}
          style={{ borderColor: dashboardTheme.border }}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm" style={{ color: dashboardTheme.textMuted }}>{item.label}</p>
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
          </div>
          <p className="mt-3 text-2xl font-bold" style={{ color: dashboardTheme.textDark }}>{item.value}</p>
        </article>
      ))}
    </div>
  );
}
