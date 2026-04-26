"use client";

import type { User } from "@/app/lib/auth";
import type { BookingRecord } from "@/app/lib/bookings";
import { dashboardTheme } from "@/app/components/dashboard/theme";

type OverviewPanelProps = {
  user: User;
  bookings: BookingRecord[];
};

export default function OverviewPanel({ user, bookings }: OverviewPanelProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <article className="xl:col-span-2 rounded-xl border bg-white shadow-sm" style={{ borderColor: dashboardTheme.border }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: dashboardTheme.border }}>
          <h3 className="font-semibold" style={{ color: dashboardTheme.textDark }}>Booking Activity</h3>
          <p className="text-sm" style={{ color: dashboardTheme.textMuted }}>Recent booking requests and statuses</p>
        </div>
        <div className="p-5 space-y-3">
          {bookings.slice(0, 5).map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between rounded-lg border px-4 py-3"
              style={{ borderColor: "#eef2f7" }}
            >
              <div>
                <p className="text-sm font-medium" style={{ color: dashboardTheme.textDark }}>{booking.fullName}</p>
                <p className="text-xs" style={{ color: dashboardTheme.textMuted }}>
                  {booking.packageName} · {booking.travelDate}
                </p>
              </div>
              <span className="text-xs rounded-full px-2 py-1 capitalize" style={{ backgroundColor: dashboardTheme.secondarySoft, color: dashboardTheme.secondary }}>
                {booking.status}
              </span>
            </div>
          ))}

          {bookings.length === 0 ? (
            <p className="text-sm" style={{ color: dashboardTheme.textMuted }}>No booking activity yet.</p>
          ) : null}
        </div>
      </article>

      <article className="rounded-xl border bg-white shadow-sm" style={{ borderColor: dashboardTheme.border }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: dashboardTheme.border }}>
          <h3 className="font-semibold" style={{ color: dashboardTheme.textDark }}>My Profile</h3>
        </div>
        <div className="p-5 text-sm space-y-2" style={{ color: dashboardTheme.textDark }}>
          <p>
            <span style={{ color: dashboardTheme.textMuted }}>Name:</span> {user.name}
          </p>
          <p>
            <span style={{ color: dashboardTheme.textMuted }}>Email:</span> {user.email}
          </p>
          <p>
            <span style={{ color: dashboardTheme.textMuted }}>Role:</span> {user.role}
          </p>
        </div>
      </article>
    </div>
  );
}
